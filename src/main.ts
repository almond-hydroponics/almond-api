import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function main() {
	const app: NestExpressApplication =
		await NestFactory.create<NestExpressApplication>(
			AppModule,
			new ExpressAdapter(),
		);
	const configService: ConfigService = app.get(ConfigService);

	app.enableCors({
		origin: '*',
		credentials: true,
	});

	app.use(cookieParser());
	process.env.NODE_ENV === "production" && app.use(helmet());
	// app.use(csurf());

	app.useLogger(app.get(Logger));

	return app.listen(configService.get<number>('GRAPHQL_PORT'));
}

main();
