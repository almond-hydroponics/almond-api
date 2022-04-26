import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { LoggerModule, PinoLogger } from 'nestjs-pino';

import {
	DateTimeResolver,
	EmailAddressResolver,
	UnsignedIntResolver,
} from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { RedisCache } from 'apollo-server-cache-redis';

@Module({
	imports: [
		ConfigModule.forRoot(),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				pinoHttp: {
					safe: true,
					transport:
						configService.get<string>('NODE_ENV') !== 'production'
							? {
									target: 'pino-pretty',
									options: {
										colorize: true,
									},
							  }
							: undefined,
					useLevelLabels: true,
				},
			}),
			inject: [ConfigService],
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [ConfigModule, LoggerModule],
			useFactory: async (
				configService: ConfigService,
				logger: PinoLogger,
			) => ({
				debug: configService.get<string>('NODE_ENV') !== 'development',
				typePaths: ['./**/*.graphql'],
				transformSchema: (schema) =>
					upperDirectiveTransformer(schema, 'upper'),
				installSubscriptionHandlers: true,
				logger,
				persistedQueries: configService.get<string>('NODE_ENV') ===
					'development' && {
					ttl: 1000,
					cache: new RedisCache({
						host: configService.get<string>('REDIS_HOST'),
						port: configService.get<number>('REDIS_PORT'),
					}),
				},
				cors: false,
				resolvers: {
					DateTime: DateTimeResolver,
					EmailAddress: EmailAddressResolver,
					UnsignedInt: UnsignedIntResolver,
					JSONObject: GraphQLJSONObject,
				},
				formatResponse: (response) => response,
				formatError: (error) => error,
				introspection: true,
				playground: configService.get<string>('NODE_ENV') === 'development',
				definitions: {
					path: join(process.cwd(), 'src/graphql.schema.d.ts'),
				},
				context: ({ req, res }) => ({ req, res }),
			}),
			inject: [ConfigService, PinoLogger],
		}),
		// GraphQLModule.forRootAsync<ApolloDriverConfig>({
		// 	driver: ApolloDriver,
		// 	imports: [LoggerModule],
		// 	useFactory: async (logger: PinoLogger) => ({
		// 		path: '/',
		//     transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
		//     // installSubscriptionHandlers: true,
		// 		// subscriptions: '/',
		// 		typePaths: ['./**/*.graphql'],
		// 		resolvers: {
		// 			DateTime: DateTimeResolver,
		// 			EmailAddress: EmailAddressResolver,
		// 			UnsignedInt: UnsignedIntResolver,
		// 			JSONObject: GraphQLJSONObject,
		// 		},
		// 		definitions: {
		// 			path: join(__dirname, 'graphql.ts'),
		// 		},
		// 		logger,
		// 		debug: true,
		// 		cors: false,
		// 		installSubscriptionHandlers: true,
		// 		playground: {
		// 			// endpoint: '/',
		// 			// subscriptionEndpoint: '/',
		// 			settings: {
		// 				'request.credentials': 'include',
		//         codeTheme: 'light'
		// 			},
		// 			// tabs: [
		// 			//   {
		// 			//     name: 'GraphQL API',
		// 			//     endpoint: '/',
		// 			//     query: playgroundQuery
		// 			//   }
		// 			// ]
		// 		},
		// 		context: ({ req, res }): any => ({ req, res }),
		// 	}),
		// 	inject: [PinoLogger],
		// }),
		AuthModule,
		UsersModule,
		CommonModule,
	],
})
export class AppModule {}
