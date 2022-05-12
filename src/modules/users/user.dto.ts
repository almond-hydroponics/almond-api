import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';
import { Roles } from '../../graphql.schema';

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
	readonly avatar?: string;

	@IsString()
	readonly googleId?: string;

	readonly role?: Roles;

	@IsBoolean()
	readonly verified?: boolean;

	@IsBoolean()
	readonly active?: boolean;

	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly version?: number;
}
