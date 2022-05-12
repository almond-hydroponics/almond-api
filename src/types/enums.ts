import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
	USER = 'User',
	DEVELOPER = 'Developer',
	ADMIN = 'Admin',
}

registerEnumType(Roles, {
	name: 'Roles',
});
