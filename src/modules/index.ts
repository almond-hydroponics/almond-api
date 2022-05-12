import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { SchedulesModule } from './schedules/schedules.module';

export const MicroservicesModules = [
	AuthModule,
	UsersModule,
	DevicesModule,
	SchedulesModule,
];
