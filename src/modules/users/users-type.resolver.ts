import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import { DevicesConnection, User } from '../../graphql.schema';
import { QueryUtils } from '../../utils/query.utils';
import { IDevicesService } from '../devices/devices.interface';

@Resolver('User')
export class UsersTypeResolver implements OnModuleInit {
	constructor(
		@Inject('DevicesServiceClient')
		private readonly devicesServiceClient: ClientGrpcProxy,
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(UsersTypeResolver.name);
	}

	private devicesService: IDevicesService;

	onModuleInit(): void {
		this.devicesService =
			this.devicesServiceClient.getService<IDevicesService>('DevicesService');
	}

	@ResolveField('devices')
	async getDevices(
		@Parent() user: User,
		@Args('q') q: string,
		@Args('first') first: number,
		@Args('last') last: number,
		@Args('before') before: string,
		@Args('after') after: string,
		@Args('filterBy') filterBy: any,
		@Args('orderBy') orderBy: string,
	): Promise<DevicesConnection> {
		const query = { where: { user: user.id } };

		if (!isEmpty(q)) merge(query, { where: { title: { _iLike: q } } });

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

	// @ResolveField('role')
	// async getRole(
	// 	@Parent() user: User,
	// 	// @Args('q') q: string,
	// 	// @Args('first') first: number,
	// 	// @Args('last') last: number,
	// 	// @Args('before') before: string,
	// 	// @Args('after') after: string,
	// 	// @Args('filterBy') filterBy: any,
	// 	// @Args('orderBy') orderBy: string,
	// ): Promise<RolesConnection> {
	// 	const query = { where: { role: 'User' } };
	//
	// 	// if (!isEmpty(q)) merge(query, { where: { text: { _iLike: q } } });
	//
	// 	// merge(query, await this.queryUtils.buildQuery());
	//
	// 	return lastValueFrom(
	// 		this.roleService.find({
	// 			...query,
	// 			where: JSON.stringify(query.where),
	// 		}),
	// 	);
	// }
}
