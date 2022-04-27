
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateDeviceInput {
    name: string;
}

export class UpdateDeviceInput {
    name?: Nullable<string>;
    isVerified?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
}

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
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    photo?: Nullable<string>;
    isVerified?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
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

    abstract createDevice(data: CreateDeviceInput): DevicePayload | Promise<DevicePayload>;

    abstract updateDevice(id: string, data: UpdateDeviceInput): DevicePayload | Promise<DevicePayload>;

    abstract deleteDevice(id: string): DeleteDevicePayload | Promise<DeleteDevicePayload>;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;

    abstract users(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<UsersConnection> | Promise<Nullable<UsersConnection>>;

    abstract userCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;

    abstract me(): User | Promise<User>;

    abstract device(id: string): Device | Promise<Device>;

    abstract devices(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<DevicesConnection> | Promise<Nullable<DevicesConnection>>;

    abstract deviceCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;

    abstract myDevice(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<DevicesConnection> | Promise<Nullable<DevicesConnection>>;
}

export abstract class ISubscription {
    abstract deviceAdded(): Device | Promise<Device>;
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

export class Device {
    id: string;
    name: string;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export class DevicesConnection {
    edges: DeviceEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export class DeviceEdge {
    node: Device;
    cursor: string;
}

export class DevicePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    device?: Nullable<Device>;
}

export class DeleteDevicePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
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
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export class UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
    totalCount: number;
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

export type DateTime = Date;
export type EmailAddress = unknown;
export type UnsignedInt = unknown;
export type JSONObject = unknown;
type Nullable<T> = T | null;
