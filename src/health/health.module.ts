import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controllers';
import { HealthService } from './services';

@Module({
	imports: [TerminusModule, ConfigModule],
	controllers: [HealthController],
	providers: [HealthService],
})
export class HealthModule {}
