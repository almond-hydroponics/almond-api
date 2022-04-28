import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';

export const MicroservicesModules = [AuthModule, UsersModule, DevicesModule];
