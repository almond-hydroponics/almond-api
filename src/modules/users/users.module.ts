import { join } from 'path';

import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	ClientGrpcProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';

import { UtilsModule } from '../../utils/utils.module';
import { DevicesModule } from '../devices/devices.module';
import { UsersMutationResolver } from './users-mutation.resolver';
import { UsersQueryResolver } from './users-query.resolver';
import { UsersTypeResolver } from './users-type.resolver';

@Module({
	imports: [
		ConfigModule,
		LoggerModule,
		UtilsModule,
		forwardRef(() => DevicesModule),
	],
	providers: [
		UsersTypeResolver,
		UsersQueryResolver,
		UsersMutationResolver,
		{
			provide: 'UsersServiceClient',
			useFactory: (configService: ConfigService): ClientGrpcProxy => {
				return ClientProxyFactory.create({
					transport: Transport.GRPC,
					options: {
						url: configService.get<string>('ALMOND_USER_URL'),
						package: 'user',
						protoPath: join(__dirname, '../../_proto/user.proto'),
						loader: {
							keepCase: true,
							enums: String,
							oneofs: true,
							arrays: true,
						},
					},
				});
			},
			inject: [ConfigService],
		},
	],
	exports: ['UsersServiceClient'],
})
export class UsersModule {}
