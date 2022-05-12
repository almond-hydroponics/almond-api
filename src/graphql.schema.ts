
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Roles {
    USER = "USER",
    DEVELOPER = "DEVELOPER",
    ADMIN = "ADMIN"
}

export class CreateDeviceInput {
    name: string;
}

export class UpdateDeviceInput {
    name?: Nullable<string>;
    user?: Nullable<string>;
    verified?: Nullable<boolean>;
    active?: Nullable<boolean>;
}

export class CreateScheduleInput {
    schedule: string;
    device: string;
}

export class UpdateScheduleInput {
    schedule?: Nullable<string>;
    active?: Nullable<boolean>;
}

export class SocialAuthInput {
    code: string;
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
    avatar?: Nullable<string>;
    verified?: Nullable<boolean>;
    active?: Nullable<boolean>;
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

    abstract createSchedule(data: CreateScheduleInput): SchedulePayload | Promise<SchedulePayload>;

    abstract updateSchedule(id: string, data: UpdateScheduleInput): SchedulePayload | Promise<SchedulePayload>;

    abstract deleteSchedule(id: string): DeleteSchedulePayload | Promise<DeleteSchedulePayload>;
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

    abstract getGoogleAuthURL(): string | Promise<string>;

    abstract googleAuth(input?: Nullable<SocialAuthInput>): UserPayload | Promise<UserPayload>;

    abstract schedule(id: string): Schedule | Promise<Schedule>;

    abstract schedules(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<SchedulesConnection> | Promise<Nullable<SchedulesConnection>>;

    abstract schedulesCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
}

export abstract class ISubscription {
    abstract deviceAdded(): Device | Promise<Device>;

    abstract scheduleAdded(): Device | Promise<Device>;
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
    verified: boolean;
    active: boolean;
    user?: Nullable<User>;
    schedules?: Nullable<SchedulesConnection>;
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

export class Schedule {
    id: string;
    schedule: string;
    device: Device;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export class SchedulesConnection {
    edges: ScheduleEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export class ScheduleEdge {
    node: Schedule;
    cursor: string;
}

export class SchedulePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    schedule?: Nullable<Schedule>;
}

export class DeleteSchedulePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: EmailAddress;
    password: string;
    avatar: string;
    googleId: string;
    role: Roles;
    verified: boolean;
    active: boolean;
    devices?: Nullable<DevicesConnection>;
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
