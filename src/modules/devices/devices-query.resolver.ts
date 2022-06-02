import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import { Device, DevicesConnection } from '../../graphql.schema';
import { QueryUtils } from '../../utils/query.utils';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IDevicesService } from './devices.interface';

@Resolver('Device')
export class DevicesQueryResolver implements OnModuleInit {
	constructor(
		@Inject('DevicesServiceClient')
		private readonly devicesServiceClient: ClientGrpcProxy,
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesQueryResolver.name);
	}
	private devicesService: IDevicesService;

	onModuleInit(): void {
		this.devicesService =
			this.devicesServiceClient.getService<IDevicesService>('DevicesService');
	}

	@Query('devices')
	@UseGuards(GqlAuthGuard)
	async getDevices(
		@Args('q') q: string,
		@Args('first') first: number,
		@Args('last') last: number,
		@Args('before') before: string,
		@Args('after') after: string,
		@Args('filterBy') filterBy: any,
		@Args('orderBy') orderBy: string,
	): Promise<DevicesConnection> {
		const query = { where: {} };

		// if (!isEmpty(q)) merge(query, { where: { name: { _iLike: q } } });

		merge(
			query,
			await this.queryUtils.buildQuery(
				filterBy,
				orderBy,
				first,
				last,
				before,
				after,
			),
		);

		return lastValueFrom(
			this.devicesService.find({
				...query,
				where: JSON.stringify(query.where),
			}),
		);
	}

	@Query('device')
	@UseGuards(GqlAuthGuard)
	async getDevice(@Args('id') id: string): Promise<Device> {
		return lastValueFrom(this.devicesService.findById({ id }));
	}

	@Query('deviceCount')
	@UseGuards(GqlAuthGuard)
	async getDeviceCount(
		@Args('q') q: string,
		@Args('filterBy') filterBy: any,
	): Promise<number> {
		const query = { where: {} };

		if (!isEmpty(q)) merge(query, { where: { email: { _iLike: q } } });

		merge(query, await this.queryUtils.getFilters(filterBy));

		const { count } = await lastValueFrom(
			this.devicesService.count({
				...query,
				where: JSON.stringify(query.where),
			}),
		);

		return count;
	}
}
