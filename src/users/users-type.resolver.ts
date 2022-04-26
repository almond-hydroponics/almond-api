import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Parent, ResolveField } from '@nestjs/graphql';

import { isEmpty, merge } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { QueryUtils } from '../utils/query.utils';

@Resolver('User')
export class UsersTypeResolver implements OnModuleInit {
	constructor(
		private readonly queryUtils: QueryUtils,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(UsersTypeResolver.name);
	}

	onModuleInit(): void {}

	// @ResolveField('posts')
	// async getPosts(
	// 	@Parent() user: User,
	// 	@Args('q') q: string,
	// 	@Args('first') first: number,
	// 	@Args('last') last: number,
	// 	@Args('before') before: string,
	// 	@Args('after') after: string,
	// 	@Args('filterBy') filterBy: any,
	// 	@Args('orderBy') orderBy: string,
	// ): Promise<PostsConnection> {
	// 	const query = { where: { author: user.id } };
	//
	// 	if (!isEmpty(q)) merge(query, { where: { title: { _iLike: q } } });
	//
	// 	merge(
	// 		query,
	// 		await this.queryUtils.buildQuery(
	// 			filterBy,
	// 			orderBy,
	// 			first,
	// 			last,
	// 			before,
	// 			after,
	// 		),
	// 	);
	//
	// 	return this.postsService
	// 		.find({
	// 			...query,
	// 			where: JSON.stringify(query.where),
	// 		})
	// 		.toPromise();
	// }

	// @ResolveField('comments')
	// async getComments(
	// 	@Parent() user: User,
	// 	@Args('q') q: string,
	// 	@Args('first') first: number,
	// 	@Args('last') last: number,
	// 	@Args('before') before: string,
	// 	@Args('after') after: string,
	// 	@Args('filterBy') filterBy: any,
	// 	@Args('orderBy') orderBy: string,
	// ): Promise<CommentsConnection> {
	// 	const query = { where: { author: user.id } };
	//
	// 	if (!isEmpty(q)) merge(query, { where: { text: { _iLike: q } } });
	//
	// 	merge(
	// 		query,
	// 		await this.queryUtils.buildQuery(
	// 			filterBy,
	// 			orderBy,
	// 			first,
	// 			last,
	// 			before,
	// 			after,
	// 		),
	// 	);
	//
	// 	return this.commentsService
	// 		.find({
	// 			...query,
	// 			where: JSON.stringify(query.where),
	// 		})
	// 		.toPromise();
	// }
}
