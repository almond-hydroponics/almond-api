import { IsString, IsBoolean } from 'class-validator';

export class ScheduleDto {
	readonly id?: string;

	@IsString()
	readonly schedule?: string;

	@IsString()
	readonly device?: string;

	@IsBoolean()
	readonly active?: boolean;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
