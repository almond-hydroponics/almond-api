import { Metadata } from 'grpc';
import { Observable } from 'rxjs';

import { ICount, IId, IQuery } from '../../common/common.interface';
import { Schedule, SchedulesConnection } from '../../graphql.schema';
import { ScheduleDto } from './schedule.dto';

interface UpdateScheduleInput {
	id: string;
	data: ScheduleDto;
}

export interface ISchedulesService {
	find(query: IQuery, metadata?: Metadata): Observable<SchedulesConnection>;

	findById(id: IId, metadata?: Metadata): Observable<Schedule>;

	findOne(query: IQuery, metadata?: Metadata): Observable<Schedule>;

	count(query: IQuery, metadata?: Metadata): Observable<ICount>;

	create(input: ScheduleDto, metadata?: Metadata): Observable<Schedule>;

	update(input: UpdateScheduleInput): Observable<Schedule>;

	destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
