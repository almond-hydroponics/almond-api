import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Mutation, Context, Query } from '@nestjs/graphql';

import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { AuthService } from './auth.service';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { CurrentUser } from './user.decorator';

import { IUsersService } from '../users/users.interface';

import { PasswordUtils } from '../../utils/password.utils';
import { lastValueFrom } from 'rxjs';
import {
	LoginUserInput,
	SignupUserInput,
	SocialAuthInput,
	User,
	UserPayload,
} from '../../graphql.schema';
import deepClean from '../../utils/deep-clean';
import { ConfigService } from '@nestjs/config';

@Resolver()
export class AuthResolver implements OnModuleInit {
	constructor(
		@Inject('UsersServiceClient')
		private readonly usersServiceClient: ClientGrpcProxy,
		private readonly authService: AuthService,
		private readonly passwordUtils: PasswordUtils,
		private readonly logger: PinoLogger,
		private readonly configService: ConfigService,
	) {
		logger.setContext(AuthResolver.name);
	}

	private usersService: IUsersService;

	onModuleInit(): void {
		this.usersService =
			this.usersServiceClient.getService<IUsersService>('UsersService');
	}

	@Query(() => String)
	async getGoogleAuthURL(): Promise<string> {
		return this.authService.getGoogleAuthURL();
	}

	@Query(() => User)
	async googleAuth(
		@Args('input') input: SocialAuthInput,
		@Context('context') context: any,
	): Promise<UserPayload> {
		const googleUser = await this.authService.getGoogleUser({
			code: input.code,
		});

		const user = await lastValueFrom(
			this.usersService.findOne({
				where: JSON.stringify({ googleId: String(googleUser.id) }),
			}),
		);

		if (isEmpty(user)) {
			this.usersService.create({
				...deepClean(googleUser),
				firstName: googleUser.first_name,
			});
		}

		const { res } = context;
		res.cookie(
			'access-token',
			await this.authService.generateAccessToken(user),
			{
				httpOnly: true,
				maxAge: 1.8e6,
				sameSite: 'lax',
			},
		);

		res.cookie(
			'refresh-token',
			await this.authService.generateRefreshToken(user),
			{
				httpOnly: true,
				maxAge: 1.728e8,
			},
		);

		return { user };
	}

	@Mutation()
	async signup(@Args('data') data: SignupUserInput): Promise<UserPayload> {
		const { count } = await lastValueFrom(
			this.usersService.count({
				where: JSON.stringify({ email: data.email }),
			}),
		);

		if (count >= 1) throw new Error('Email taken');

		const user: User = await lastValueFrom(
			this.usersService.create({
				...data,
				password: await this.passwordUtils.hash(data.password),
			}),
		);

		return { user };
	}

	@Mutation()
	async login(
		@Context() context: any,
		@Args('data') data: LoginUserInput,
	): Promise<UserPayload> {
		const { res } = context;

		const user: any = await lastValueFrom(
			this.usersService.findOne({
				where: JSON.stringify({ email: data.email }),
			}),
		);

		if (isEmpty(user)) throw new Error('User is not found. Kindly signup');

		const isValidPassword: boolean = await this.passwordUtils.compare(
			data.password,
			user.password,
		);

		if (!isValidPassword) throw new Error('Password is incorrect');

		res.cookie(
			'access-token',
			await this.authService.generateAccessToken(user),
			{
				httpOnly: true,
				maxAge: 1.8e6,
				sameSite: 'lax',
				// path: '/',
				domain: this.configService.get<string>('COOKIES_DOMAIN'),
			},
		);

		res.cookie(
			'refresh-token',
			await this.authService.generateRefreshToken(user),
			{
				httpOnly: true,
				maxAge: 1.728e8,
				// path: '/',
				domain: this.configService.get<string>('COOKIES_DOMAIN'),
			},
		);

		return { user };
	}

	@Mutation()
	@UseGuards(RefreshAuthGuard)
	async refreshToken(
		@Context() context: any,
		@CurrentUser() user: User,
	): Promise<UserPayload> {
		const { res } = context;

		res.cookie(
			'access-token',
			await this.authService.generateAccessToken(user),
			{
				httpOnly: true,
				maxAge: 1.8e6,
			},
		);
		res.cookie(
			'refresh-token',
			await this.authService.generateRefreshToken(user),
			{
				httpOnly: true,
				maxAge: 1.728e8,
			},
		);

		return { user };
	}

	@Mutation()
	async logout(@Context() context: any): Promise<boolean> {
		const { res } = context;

		res.cookie('access-token', '', {
			httpOnly: true,
			maxAge: 0,
		});
		res.cookie('refresh-token', '', {
			httpOnly: true,
			maxAge: 0,
		});

		return true;
	}
}
