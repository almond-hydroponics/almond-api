import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PinoLogger } from 'nestjs-pino';

import { Device } from '../../graphql.schema';

@Resolver('Device')
export class DevicesSubscriptionResolver {
	constructor(
		@Inject('PUB_SUB')
		private readonly pubSubService: PubSub,

		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesSubscriptionResolver.name);
	}

	@Subscription('deviceAdded', {
		resolve: (value: Device) => value,
	})
	deviceAdded(): AsyncIterator<unknown, any, undefined> {
		this.logger.info('DevicesSubscriptionResolver#deviceAdded');
		return this.pubSubService.asyncIterator('deviceAdded');
	}
}
