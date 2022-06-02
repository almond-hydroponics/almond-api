import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';

import { Schedule, SchedulesConnection } from '../../graphql.schema';
import { QueryUtils } from '../../utils/query.utils';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ISchedulesService } from './schedules.interface';

@Resolver('Schedule')
export class SchedulesQueryResolver implements OnModuleInit {
	constructor(
		@Inject('SchedulesServiceClient')
		private readonly schedulesServiceClient: ClientGrpcProxy,
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesQueryResolver.name);
	}

	private schedulesService: ISchedulesService;

	onModuleInit(): void {
		this.schedulesService =
			this.schedulesServiceClient.getService<ISchedulesService>(
				'SchedulesService',
			);
	}

	@Query('schedules')
	@UseGuards(GqlAuthGuard)
	async getSchedules(
		@Args('q') q: string,
		@Args('first') first: number,
		@Args('last') last: number,
		@Args('before') before: string,
		@Args('after') after: string,
		@Args('filterBy') filterBy: any,
		@Args('orderBy') orderBy: string,
	): Promise<SchedulesConnection> {
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
			this.schedulesService.find({
				...query,
				where: JSON.stringify(query.where),
			}),
		);
	}

	@Query('schedule')
	@UseGuards(GqlAuthGuard)
	async getSchedule(@Args('id') id: string): Promise<Schedule> {
		return lastValueFrom(this.schedulesService.findById({ id }));
	}

	@Query('schedulesCount')
	@UseGuards(GqlAuthGuard)
	async getSchedulesCount(
		@Args('q') q: string,
		@Args('filterBy') filterBy: any,
	): Promise<number> {
		const query = { where: {} };

		if (!isEmpty(q)) merge(query, { where: { email: { _iLike: q } } });

		merge(query, await this.queryUtils.getFilters(filterBy));

		const { count } = await lastValueFrom(
			this.schedulesService.count({
				...query,
				where: JSON.stringify(query.where),
			}),
		);

		return count;
	}
}
