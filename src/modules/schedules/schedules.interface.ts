import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

import { IQuery, ICount, IId } from '../../common/common.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule, SchedulesConnection } from '../../graphql.schema';

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
