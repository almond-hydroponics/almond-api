import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { SchedulesModule } from './schedules/schedules.module';
import { UsersModule } from './users/users.module';

export const MicroservicesModules = [
	AuthModule,
	UsersModule,
	DevicesModule,
	SchedulesModule,
];
