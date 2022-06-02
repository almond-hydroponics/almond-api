import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisCache } from 'apollo-server-cache-redis';
import {
	DateTimeResolver,
	EmailAddressResolver,
	UnsignedIntResolver,
} from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

import { CommonModule } from './common/common.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { HealthModule } from './health/health.module';
import { MicroservicesModules } from './modules';

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
				logger,
				debug: configService.get<string>('NODE_ENV') !== 'development',
				typePaths: ['./**/*.graphql'],
				transformSchema: (schema) =>
					upperDirectiveTransformer(schema, 'upper'),
				subscriptions: {
					'graphql-ws': true,
				},
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
		CommonModule,
		HealthModule,
		...MicroservicesModules,
	],
})
export class AppModule {}
