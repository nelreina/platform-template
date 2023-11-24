import { client as redis } from './redis-client.js';
import { redirect } from '@sveltejs/kit';

import { authenticator } from 'otplib';
import QRCode from 'qrcode';

import { base } from '$app/paths';
import { getToken, saveSession } from './sessions.js';
const OTP_ENABLED = process.env['OTP_ENABLED'];
const OTP_APP_NAME = process.env['OTP_APP_NAME'];

export const checkOtp = async (user) => {
	if (OTP_ENABLED) {
		if (await redis.exists(`user:${user.id}:otp`)) {
			if (!user.otp) {
				throw redirect(303, `${base}/auth/otp`);
			}
		} else {
			throw redirect(303, `${base}/auth/otp-settings`);
		}
	}
};

export const generateQrCode = async (user) => {
	const secret = authenticator.generateSecret();
	// Temporary store secret in redis
	await redis.set(`user:${user.id}:otp-settings`, secret);
	// 5 minutes
	await redis.expire(`user:${user.id}:otp-settings`, 300);

	// Generate authKey for the user
	const authKey = authenticator.keyuri(user.email, OTP_APP_NAME, secret);
	const qrcode = await QRCode.toDataURL(authKey);

	return qrcode;
};

export const saveSecret = async (user, secret) => {
	// Store secret in redis

	await redis.set(`user:${user.id}:otp`, secret);
	await redis.del(`user:${user.id}:otp-settings`);
};

export const checkAuthCode = async ({ locals, request, cookies }) => {
	const { user } = locals;
	const token = getToken(cookies);
	const data = Object.fromEntries(await request.formData());
	const { authCode, page } = data;

	const secret = await redis.get(`user:${user.id}:${page || 'otp'}`);

	const isValid = authenticator.check(authCode, secret);
	if (isValid) {
		await saveSecret(user, secret);
		await saveSession(token, { ...user, otp: true });
		throw redirect(303, `${base}/app/dashboard`);
	} else {
		return {
			error: 'Invalid code! Please try again.'
		};
	}
};
