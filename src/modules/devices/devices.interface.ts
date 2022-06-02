import { Metadata } from 'grpc';
import { Observable } from 'rxjs';

import { ICount, IId, IQuery } from '../../common/common.interface';
import { Device, DevicesConnection } from '../../graphql.schema';
import { DeviceDto } from './device.dto';

interface UpdateDeviceInput {
	id: string;
	data: DeviceDto;
}

export interface IDevicesService {
	find(query: IQuery, metadata?: Metadata): Observable<DevicesConnection>;
	findById(id: IId, metadata?: Metadata): Observable<Device>;
	findOne(query: IQuery, metadata?: Metadata): Observable<Device>;
	count(query: IQuery, metadata?: Metadata): Observable<ICount>;
	create(input: DeviceDto, metadata?: Metadata): Observable<Device>;
	update(input: UpdateDeviceInput): Observable<Device>;
	destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
