/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignupUserInput {
	firstName: string;
	lastName: string;
	email: EmailAddress;
	password: string;
}

export interface LoginUserInput {
	email: EmailAddress;
	password: string;
}

export interface UpdateProfileInput {
	firstName: string;
	lastName: string;
	email: EmailAddress;
	photo: string;
	isVerified: boolean;
	isActive: boolean;
}

export interface UpdateEmailInput {
	email: EmailAddress;
	currentPassword: string;
}

export interface UpdatePasswordInput {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface IMutation {
	signup(data: SignupUserInput): UserPayload | Promise<UserPayload>;
	login(data: LoginUserInput): UserPayload | Promise<UserPayload>;
	refreshToken(): UserPayload | Promise<UserPayload>;
	logout(): boolean | Promise<boolean>;
	updateProfile(data: UpdateProfileInput): UserPayload | Promise<UserPayload>;
	updateEmail(
		data?: Nullable<UpdateEmailInput>,
	): UserPayload | Promise<UserPayload>;
	updatePassword(
		data?: Nullable<UpdatePasswordInput>,
	): UserPayload | Promise<UserPayload>;
	deleteAccount(): DeleteAccountPayload | Promise<DeleteAccountPayload>;
}

export interface IQuery {
	user(id: string): User | Promise<User>;
	users(
		q?: Nullable<string>,
		first?: Nullable<number>,
		last?: Nullable<number>,
		before?: Nullable<string>,
		after?: Nullable<string>,
		filterBy?: Nullable<JSONObject>,
		orderBy?: Nullable<string>,
	): Nullable<UsersConnection> | Promise<Nullable<UsersConnection>>;
	userCount(
		q?: Nullable<string>,
		filterBy?: Nullable<JSONObject>,
	): number | Promise<number>;
	me(): User | Promise<User>;
}

export interface ErrorPayload {
	field?: Nullable<string>;
	message?: Nullable<Nullable<string>[]>;
}

export interface PageInfo {
	startCursor: string;
	endCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: EmailAddress;
	password: string;
	photo: string;
	isVerified: boolean;
	isActive: boolean;
	createdAt: DateTime;
	updatedAt: DateTime;
	version: number;
}

export interface UsersConnection {
	edges: UserEdge[];
	pageInfo: PageInfo;
}

export interface UserEdge {
	node: User;
	cursor: string;
}

export interface UserPayload {
	errors?: Nullable<Nullable<ErrorPayload>[]>;
	user?: Nullable<User>;
}

export interface DeleteAccountPayload {
	errors?: Nullable<Nullable<ErrorPayload>[]>;
	count?: Nullable<number>;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;
type Nullable<T> = T | null;
