import { join } from 'path';

import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	ClientGrpcProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { LoggerModule } from 'nestjs-pino';

import { UtilsModule } from '../../utils/utils.module';
import { DevicesModule } from '../devices/devices.module';
import { SchedulesMutationResolver } from './schedules-mutation.resolver';
import { SchedulesQueryResolver } from './schedules-query.resolver';
import { SchedulesSubscriptionResolver } from './schedules-subscription.resolver';
import { SchedulesTypeResolver } from './schedules-type.resolver';

@Module({
	imports: [
		ConfigModule,
		LoggerModule,
		UtilsModule,
		forwardRef(() => DevicesModule),
	],
	providers: [
		SchedulesTypeResolver,
		SchedulesQueryResolver,
		SchedulesMutationResolver,
		SchedulesSubscriptionResolver,
		{
			provide: 'SchedulesServiceClient',
			useFactory: (configService: ConfigService): ClientGrpcProxy => {
				return ClientProxyFactory.create({
					transport: Transport.GRPC,
					options: {
						url: configService.get<string>('ALMOND_SCHEDULE_URL'),
						package: 'schedule',
						protoPath: join(__dirname, '../../_proto/schedule.proto'),
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
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
	exports: ['SchedulesServiceClient'],
})
export class SchedulesModule {}
