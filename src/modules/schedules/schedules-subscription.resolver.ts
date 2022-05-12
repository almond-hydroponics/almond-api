import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';

import { PinoLogger } from 'nestjs-pino';
import { PubSub } from 'graphql-subscriptions';
import { Schedule } from '../../graphql.schema';

@Resolver('Schedule')
export class SchedulesSubscriptionResolver {
	constructor(
		@Inject('PUB_SUB')
		private readonly pubSubService: PubSub,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesSubscriptionResolver.name);
	}

	@Subscription('scheduleAdded', {
		resolve: (value: Schedule) => value,
	})
	deviceAdded(): AsyncIterator<unknown, any, undefined> {
		this.logger.info('ScheduleSubscriptionResolver#scheduleAdded');
		return this.pubSubService.asyncIterator('scheduleAdded');
	}
}
