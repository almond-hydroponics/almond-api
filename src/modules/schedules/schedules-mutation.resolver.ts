import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import {
	DeleteSchedulePayload,
	SchedulePayload,
	UpdateDeviceInput,
} from '../../graphql.schema';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ScheduleDto } from './schedule.dto';
import { ISchedulesService } from './schedules.interface';

@Resolver('Schedule')
export class SchedulesMutationResolver implements OnModuleInit {
	constructor(
		@Inject('SchedulesServiceClient')
		private readonly schedulesServiceClient: ClientGrpcProxy,
		@Inject('PUB_SUB')
		private readonly pubSubService: PubSub,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesMutationResolver.name);
	}

	private schedulesService: ISchedulesService;

	onModuleInit(): void {
		this.schedulesService =
			this.schedulesServiceClient.getService<ISchedulesService>(
				'SchedulesService',
			);
	}

	@Mutation('createSchedule')
	@UseGuards(GqlAuthGuard)
	async createSchedule(
		@Args('data') data: ScheduleDto,
	): Promise<SchedulePayload> {
		this.logger.info('SchedulesMutationResolver#createDevice.data %o', data);
		const schedule = await lastValueFrom(
			this.schedulesService.create({
				...data,
			}),
		);

		await this.pubSubService.publish('scheduleAdded', schedule);

		return { schedule };
	}

	@Mutation('updateSchedule')
	@UseGuards(GqlAuthGuard)
	async updateSchedule(
		@Args('id') id: string,
		@Args('data') data: UpdateDeviceInput,
	): Promise<SchedulePayload> {
		const schedule = await lastValueFrom(
			this.schedulesService.update({
				id,
				data: {
					...data,
				},
			}),
		);

		return { schedule };
	}

	@Mutation('deleteSchedule')
	@UseGuards(GqlAuthGuard)
	async deleteSchedule(
		@Args('id') id: string,
	): Promise<DeleteSchedulePayload> {
		return lastValueFrom(
			this.schedulesService.destroy({
				where: JSON.stringify({ id }),
			}),
		);
	}
}
