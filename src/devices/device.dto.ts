import { IsString, IsBoolean } from 'class-validator';

export class DeviceDto {
	readonly id?: string;

	@IsString()
	readonly name?: string;

	@IsBoolean()
	readonly isVerified?: boolean;

	@IsBoolean()
	readonly isActive?: boolean;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
