import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import { IUsersService } from './users.interface';

import { PasswordUtils } from '../../utils/password.utils';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import {
	DeleteAccountPayload,
	UpdateEmailInput,
	UpdatePasswordInput,
	UpdateProfileInput,
	User,
	UserPayload,
} from '../../graphql.schema';

@Resolver()
export class UsersMutationResolver implements OnModuleInit {
	constructor(
		@Inject('UsersServiceClient')
		private readonly usersServiceClient: ClientGrpcProxy,
		private readonly passwordUtils: PasswordUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(UsersMutationResolver.name);
	}

	private usersService: IUsersService;

	onModuleInit(): void {
		this.usersService =
			this.usersServiceClient.getService<IUsersService>('UsersService');
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async updateProfile(
		@CurrentUser() user: User,
		@Args('data') data: Partial<UpdateProfileInput>,
	): Promise<UserPayload> {
		const updatedUser: User = await lastValueFrom(
			this.usersService.update({
				id: user.id,
				data: {
					...data,
				},
			}),
		);

		return { user: updatedUser };
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async updateEmail(
		@CurrentUser() user: any,
		@Args('data') data: UpdateEmailInput,
	): Promise<UserPayload> {
		const { count } = await lastValueFrom(
			this.usersService.count({
				where: JSON.stringify({ email: data.email }),
			}),
		);

		if (count >= 1) throw new Error('Email taken');

		const isSame: boolean = await this.passwordUtils.compare(
			data.currentPassword,
			user.password,
		);

		if (!isSame)
			throw new Error(
				'Error updating email. Kindly check the email or password provided',
			);

		const updatedUser: User = await lastValueFrom(
			this.usersService.update({
				id: user.id,
				data: {
					...data,
				},
			}),
		);

		return { user: updatedUser };
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async updatePassword(
		@CurrentUser() user: any,
		@Args('data') data: UpdatePasswordInput,
	): Promise<UserPayload> {
		const isSame: boolean = await this.passwordUtils.compare(
			data.currentPassword,
			user.password,
		);
		const isConfirmed: boolean = data.newPassword === data.confirmPassword;

		if (!isSame || !isConfirmed) {
			throw new Error('Error updating password. Kindly check your passwords.');
		}

		const password: string = await this.passwordUtils.hash(data.newPassword);

		const updatedUser: any = await this.usersService.update({
			id: user.id,
			data: {
				password,
			},
		});

		return { user: updatedUser };
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async deleteAccount(
		@CurrentUser() user: User,
	): Promise<DeleteAccountPayload> {
		return lastValueFrom(
			this.usersService.destroy({
				where: JSON.stringify({
					id: user.id,
				}),
			}),
		);
	}
}
