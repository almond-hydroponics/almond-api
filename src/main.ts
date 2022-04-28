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

import { ExceptionFilter } from './_helpers';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor, TimeoutInterceptor } from './interceptors';
import { csurfConfigOptions } from './security/configs';
import { csrfMiddleware } from './security/middlewares';
import { FrontendCookieGuard } from './security/guards';

(async function main() {
	const app: NestExpressApplication =
		await NestFactory.create<NestExpressApplication>(
			AppModule,
			new ExpressAdapter(),
		);
	const configService: ConfigService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
	app.useGlobalInterceptors(
		new ExcludeNullInterceptor(),
		new TimeoutInterceptor(),
	);
	app.useGlobalFilters(new ExceptionFilter());

	const csrf = csurf(csurfConfigOptions);
	app.use((req, res, next) => {
		csrfMiddleware(req, res, next, csrf);
	});
	app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));

	app.enableCors({
		origin: '*',
		credentials: true,
	});

	if (process.env.ENVIRONMENT === 'production') {
		app.use(helmet());
		app.useGlobalGuards(new FrontendCookieGuard());
	}

	app.useLogger(app.get(Logger));

	return app.listen(configService.get<number>('GRAPHQL_PORT'));
})();
