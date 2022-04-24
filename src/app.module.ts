import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { LoggerModule, PinoLogger } from 'nestjs-pino';

import {
	DateTimeResolver,
	EmailAddressResolver,
	UnsignedIntResolver,
} from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';

import { playgroundQuery } from './graphql/playground-query';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { upperDirectiveTransformer } from './commons/directives/upper-case.directive';

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
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: ['./**/*.graphql'],
			transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
			installSubscriptionHandlers: true,
			resolvers: {
				DateTime: DateTimeResolver,
				EmailAddress: EmailAddressResolver,
				UnsignedInt: UnsignedIntResolver,
				JSONObject: GraphQLJSONObject,
			},
			cors: false,
			playground: {
				// endpoint: '/',
				// subscriptionEndpoint: '/',
				settings: {
					'request.credentials': 'include',
				},
			},
			context: ({ req, res }) => ({ req, res }),
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
	],
})
export class AppModule {}
