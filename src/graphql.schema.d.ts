
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

export interface CreateDeviceInput {
    name: string;
}

export interface UpdateDeviceInput {
    name?: Nullable<string>;
    user?: Nullable<string>;
    verified?: Nullable<boolean>;
    active?: Nullable<boolean>;
}

export interface CreateScheduleInput {
    schedule: string;
    device: string;
}

export interface UpdateScheduleInput {
    schedule?: Nullable<string>;
    active?: Nullable<boolean>;
}

export interface SocialAuthInput {
    code: string;
}

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
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    avatar?: Nullable<string>;
    verified?: Nullable<boolean>;
    active?: Nullable<boolean>;
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
    updateEmail(data?: Nullable<UpdateEmailInput>): UserPayload | Promise<UserPayload>;
    updatePassword(data?: Nullable<UpdatePasswordInput>): UserPayload | Promise<UserPayload>;
    deleteAccount(): DeleteAccountPayload | Promise<DeleteAccountPayload>;
    createDevice(data: CreateDeviceInput): DevicePayload | Promise<DevicePayload>;
    updateDevice(id: string, data: UpdateDeviceInput): DevicePayload | Promise<DevicePayload>;
    deleteDevice(id: string): DeleteDevicePayload | Promise<DeleteDevicePayload>;
    createSchedule(data: CreateScheduleInput): SchedulePayload | Promise<SchedulePayload>;
    updateSchedule(id: string, data: UpdateScheduleInput): SchedulePayload | Promise<SchedulePayload>;
    deleteSchedule(id: string): DeleteSchedulePayload | Promise<DeleteSchedulePayload>;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    users(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<UsersConnection> | Promise<Nullable<UsersConnection>>;
    userCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
    me(): User | Promise<User>;
    device(id: string): Device | Promise<Device>;
    devices(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<DevicesConnection> | Promise<Nullable<DevicesConnection>>;
    deviceCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
    myDevice(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<DevicesConnection> | Promise<Nullable<DevicesConnection>>;
    getGoogleAuthURL(): string | Promise<string>;
    googleAuth(input?: Nullable<SocialAuthInput>): UserPayload | Promise<UserPayload>;
    schedule(id: string): Schedule | Promise<Schedule>;
    schedules(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<SchedulesConnection> | Promise<Nullable<SchedulesConnection>>;
    schedulesCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
}

export interface ISubscription {
    deviceAdded(): Device | Promise<Device>;
    scheduleAdded(): Device | Promise<Device>;
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

export interface Device {
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

export interface DevicesConnection {
    edges: DeviceEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface DeviceEdge {
    node: Device;
    cursor: string;
}

export interface DevicePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    device?: Nullable<Device>;
}

export interface DeleteDevicePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export interface Schedule {
    id: string;
    schedule: string;
    device: Device;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export interface SchedulesConnection {
    edges: ScheduleEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface ScheduleEdge {
    node: Schedule;
    cursor: string;
}

export interface SchedulePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    schedule?: Nullable<Schedule>;
}

export interface DeleteSchedulePayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export interface User {
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

export interface UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
    totalCount: number;
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
