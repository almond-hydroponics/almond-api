import { Module } from '@nestjs/common';

import { FancyIdUtils } from './fancy-id.utils';
import { PasswordUtils } from './password.utils';
import { QueryUtils } from './query.utils';

@Module({
	exports: [QueryUtils, PasswordUtils, FancyIdUtils],
	providers: [QueryUtils, PasswordUtils, FancyIdUtils],
})
export class UtilsModule {}
