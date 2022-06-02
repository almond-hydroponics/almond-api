import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../graphql.schema';
import { IUsersService } from '../users/users.interface';

@Injectable()
export class JwtRefreshStrategy
	extends PassportStrategy(Strategy, 'jwt-refresh')
	implements OnModuleInit
{
	constructor(
		@Inject('UsersServiceClient')
		private readonly usersServiceClient: ClientGrpcProxy,

		private readonly configService: ConfigService,

		private readonly logger: PinoLogger,
	) {
		super({
			secretOrKey: configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
			issuer: configService.get<string>('JWT_ISSUER'),
			audience: configService.get<string>('JWT_AUDIENCE'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => get(req, 'cookies.refresh-token'),
			]),
		});

		logger.setContext(JwtRefreshStrategy.name);
	}

	private usersService: IUsersService;

	onModuleInit(): void {
		this.usersService =
			this.usersServiceClient.getService<IUsersService>('UsersService');
	}

	async validate(payload: any): Promise<User> {
		return this.usersService
			.findById({
				id: payload.sub,
			})
			.toPromise();
	}
}
