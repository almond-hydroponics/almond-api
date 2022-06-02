import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import {
	DeleteDevicePayload,
	DevicePayload,
	UpdateDeviceInput,
} from '../../graphql.schema';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { DeviceDto } from './device.dto';
import { IDevicesService } from './devices.interface';

@Resolver('Device')
export class DevicesMutationResolver implements OnModuleInit {
	constructor(
		@Inject('DevicesServiceClient')
		private readonly devicesServiceClient: ClientGrpcProxy,

		@Inject('PUB_SUB')
		private readonly pubSubService: PubSub,

		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesMutationResolver.name);
	}

	private devicesService: IDevicesService;

	onModuleInit(): void {
		this.devicesService =
			this.devicesServiceClient.getService<IDevicesService>('DevicesService');
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async createDevice(@Args('data') data: DeviceDto): Promise<DevicePayload> {
		this.logger.info('DevicesMutationResolver#createDevice.data %o', data);
		const device = await lastValueFrom(
			this.devicesService.create({
				...data,
			}),
		);

		await this.pubSubService.publish('deviceAdded', device);

		return { device };
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async updateDevice(
		@Args('id') id: string,
		@Args('data') data: UpdateDeviceInput,
	): Promise<DevicePayload> {
		const device = await lastValueFrom(
			this.devicesService.update({
				id,
				data: {
					...data,
				},
			}),
		);

		return { device };
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async deleteDevice(@Args('id') id: string): Promise<DeleteDevicePayload> {
		return lastValueFrom(
			this.devicesService.destroy({
				where: JSON.stringify({ id }),
			}),
		);
	}
}
