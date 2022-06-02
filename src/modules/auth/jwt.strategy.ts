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
export class JwtStrategy
	extends PassportStrategy(Strategy, 'jwt')
	implements OnModuleInit
{
	constructor(
		@Inject('UsersServiceClient')
		private readonly usersServiceClient: ClientGrpcProxy,

		private readonly configService: ConfigService,

		private readonly logger: PinoLogger,
	) {
		super({
			secretOrKey: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
			issuer: configService.get<string>('JWT_ISSUER'),
			audience: configService.get<string>('JWT_AUDIENCE'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => get(req, 'cookies.access-token'),
			]),
		});

		logger.setContext(JwtStrategy.name);
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
