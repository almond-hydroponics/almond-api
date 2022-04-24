
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignupUserInput {
    firstName: string;
    lastName: string;
    email: EmailAddress;
    password: string;
}

export class LoginUserInput {
    email: EmailAddress;
    password: string;
}

export class UpdateProfileInput {
    firstName: string;
    lastName: string;
    email: EmailAddress;
    photo: string;
    isVerified: boolean;
    isActive: boolean;
}

export class UpdateEmailInput {
    email: EmailAddress;
    currentPassword: string;
}

export class UpdatePasswordInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export abstract class IMutation {
    abstract signup(data: SignupUserInput): UserPayload | Promise<UserPayload>;

    abstract login(data: LoginUserInput): UserPayload | Promise<UserPayload>;

    abstract refreshToken(): UserPayload | Promise<UserPayload>;

    abstract logout(): boolean | Promise<boolean>;

    abstract updateProfile(data: UpdateProfileInput): UserPayload | Promise<UserPayload>;

    abstract updateEmail(data?: Nullable<UpdateEmailInput>): UserPayload | Promise<UserPayload>;

    abstract updatePassword(data?: Nullable<UpdatePasswordInput>): UserPayload | Promise<UserPayload>;

    abstract deleteAccount(): DeleteAccountPayload | Promise<DeleteAccountPayload>;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;

    abstract users(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<UsersConnection> | Promise<Nullable<UsersConnection>>;

    abstract userCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;

    abstract me(): User | Promise<User>;
}

export class ErrorPayload {
    field?: Nullable<string>;
    message?: Nullable<Nullable<string>[]>;
}

export class PageInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export class User {
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

export class UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export class UserEdge {
    node: User;
    cursor: string;
}

export class UserPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    user?: Nullable<User>;
}

export class DeleteAccountPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;
type Nullable<T> = T | null;
