import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

import { IId, IQuery, ICount } from '../../common/common.interface';
import { DeviceDto } from './device.dto';
import { DevicesConnection, Device } from '../../graphql.schema';

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
