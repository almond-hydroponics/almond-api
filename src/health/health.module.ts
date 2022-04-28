import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

import { HealthController } from './controllers';
import { HealthService } from './services';

@Module({
	imports: [TerminusModule, ConfigModule],
	controllers: [HealthController],
	providers: [HealthService],
})
export class HealthModule {}
