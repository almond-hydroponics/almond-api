import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Auth, google } from 'googleapis';
import { PinoLogger } from 'nestjs-pino';

import { User } from '../../graphql.schema';

@Injectable()
export class AuthService {
	oauth2Client: Auth.OAuth2Client;

	constructor(
		@Inject('JwtAccessTokenService')
		private readonly accessTokenService: JwtService,
		@Inject('JwtRefreshTokenService')
		private readonly refreshTokenService: JwtService,
		private readonly logger: PinoLogger,
		private readonly configService: ConfigService,
	) {
		logger.setContext(AuthService.name);
		const clientID = this.configService.get('GOOGLE_CLIENT_ID');
		const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
		const corsOrigin = this.configService.get('CORS_ORIGIN');

		this.oauth2Client = new google.auth.OAuth2(
			clientID,
			clientSecret,
			`${corsOrigin}/auth/google`,
		);
	}

	async generateAccessToken(user: User): Promise<string> {
		return this.accessTokenService.sign(
			{
				user: user.id,
			},
			{
				subject: user.id,
			},
		);
	}

	async generateRefreshToken(user: User): Promise<string> {
		return this.refreshTokenService.sign(
			{
				user: user.email,
			},
			{
				subject: user.id,
			},
		);
	}

	getGoogleAuthURL() {
		const scopes = [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		];

		return this.oauth2Client.generateAuthUrl({
			access_type: 'offline',
			prompt: 'consent',
			scope: scopes,
		});
	}

	async getGoogleUser({ code }) {
		const { tokens } = await this.oauth2Client.getToken(code);
		this.oauth2Client.setCredentials(tokens);

		return axios
			.get(
				`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${tokens.id_token}`,
					},
				},
			)
			.then((res) => res.data)
			.catch((error) => {
				throw new Error(error.message);
			});
	}
}
