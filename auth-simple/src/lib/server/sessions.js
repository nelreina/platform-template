import { client as redis } from './redis-client.js';
import { redirect } from '@sveltejs/kit';
import { addToEventLog } from '@nelreina/redis-stream-consumer';

import { base } from '$app/paths';

const STREAM = process.env['STREAM'];
const SERVICE = process.env['SERVICE_NAME'] || 'unknown';

const SESSION_EXPIRED = process.env['SESSION_EXPIRED'] || 604800;
const cookieName = 'auth';

export const saveSession = async (token, authUser, temporarily = false) => {
	if (temporarily) {
		const { email } = authUser;
		await redis.set(token, JSON.stringify({ email })); // 1 day
	} else {
		await redis.set(token, JSON.stringify(authUser)); // 1 week
	}

	await redis.expire(token, SESSION_EXPIRED);
};

export const createSession = async (authUser, cookies, temporarily = false) => {
	// Use node crypto to generate a random token
	const token = crypto.randomUUID();
	await saveSession(token, authUser, temporarily);
	// const token = Math.random().toString(36).slice(2);
	cookies.set(cookieName, token, {
		httponly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 86400, // 1 day
		// Secure when in production

		secure: import.meta.env.PROD ? true : false
	});
};

export const getToken = (cookies) => {
	return cookies.get(cookieName);
};

export const deleteSession = async (cookies) => {
	// Delete token from redis
	const token = getToken(cookies);
	await redis.del(token);
	// Delete cookie
	cookies.set(cookieName, '', {
		httponly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
		// Secure when in production

		secure: import.meta.env.PROD ? true : false
	});
	throw redirect(303, `${base}/login`);
};

export const getSessionUser = async (cookies) => {
	const token = getToken(cookies);
	if (!token) return;
	const user = await redis.get(token);
	if (!user) {
		await deleteSession(cookies);
		return;
	}
	return { token, user: JSON.parse(user) };
};

export const addToSessionStream = async (event, aggregateId, payload) => {
	const streamData = {
		streamKeyName: `${STREAM}:sessions`,
		aggregateId,
		payload,
		event: `${event}`,
		serviceName: SERVICE
	};
	await addToEventLog(redis, streamData);
};
