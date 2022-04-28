import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';

export class UserDto {
	readonly id?: string;

	@IsString()
	readonly firstName?: string;

	@IsString()
	readonly lastName?: string;

	@IsEmail()
	readonly email?: string | unknown;

	@IsString()
	@MinLength(8)
	readonly password?: string;

	@IsString()
	readonly photo?: string;

	@IsBoolean()
	readonly isVerified?: boolean;

	@IsBoolean()
	readonly isActive?: boolean;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
