import { Inject, OnModuleInit } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { PinoLogger } from 'nestjs-pino';

import { QueryUtils } from '../../utils/query.utils';
import { Device } from '../../graphql.schema';
import { lastValueFrom } from 'rxjs';
import { ScheduleDto } from './schedule.dto';
import { IDevicesService } from '../devices/devices.interface';

@Resolver('Schedule')
export class SchedulesTypeResolver implements OnModuleInit {
	constructor(
		@Inject('DevicesServiceClient')
		private readonly devicesServiceClient: ClientGrpcProxy,
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesTypeResolver.name);
	}

	private devicesService: IDevicesService;

	onModuleInit(): void {
		this.devicesService =
			this.devicesServiceClient.getService<IDevicesService>('DevicesService');
	}

	@ResolveField('device')
	async getDevice(@Parent() schedule: ScheduleDto): Promise<Device> {
		return lastValueFrom(
			this.devicesService.findById({
				id: schedule.device,
			}),
		);
	}
}
