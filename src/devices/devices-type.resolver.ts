import { OnModuleInit } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { PinoLogger } from 'nestjs-pino';

import { QueryUtils } from '../utils/query.utils';

@Resolver('Device')
export class DevicesTypeResolver implements OnModuleInit {
	constructor(
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(DevicesTypeResolver.name);
	}

	onModuleInit(): void {}
}
