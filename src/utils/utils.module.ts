import { Module } from '@nestjs/common';

import { QueryUtils } from './query.utils';
import { PasswordUtils } from './password.utils';
import { FancyIdUtils } from './fancy-id.utils';

@Module({
	exports: [QueryUtils, PasswordUtils, FancyIdUtils],
	providers: [QueryUtils, PasswordUtils, FancyIdUtils],
})
export class UtilsModule {}
