import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from 'nestjs-pino';

import { UtilsModule } from '../../utils/utils.module';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		ConfigModule,
		LoggerModule,
		UtilsModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		forwardRef(() => UsersModule),
	],
	providers: [
		AuthService,
		JwtStrategy,
		JwtRefreshStrategy,
		AuthResolver,
		{
			provide: 'JwtAccessTokenService',
			inject: [ConfigService],
			useFactory: (configService: ConfigService): JwtService => {
				return new JwtService({
					secret: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
					signOptions: {
						audience: configService.get<string>('JWT_AUDIENCE'),
						issuer: configService.get<string>('JWT_ISSUER'),
						expiresIn: '30min',
					},
				});
			},
		},
		{
			provide: 'JwtRefreshTokenService',
			inject: [ConfigService],
			useFactory: (configService: ConfigService): JwtService => {
				return new JwtService({
					secret: configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
					signOptions: {
						audience: configService.get<string>('JWT_AUDIENCE'),
						issuer: configService.get<string>('JWT_ISSUER'),
						expiresIn: '30min',
					},
				});
			},
		},
	],
	exports: [AuthService],
})
export class AuthModule {}
