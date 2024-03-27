import { redirect } from 'sveltekit-flash-message/server';
import { createSession } from '$lib/server/sessions';
import { base } from '$app/paths';
import { pbAdmin } from '$lib/server/pb-admin';
import logger from '$lib/server/logger';
import { fail } from '@sveltejs/kit';
import 'dotenv/config';
import { addToSessionStream } from '$lib/server/sessions';
import { client as redis } from '$lib/server/redis-client';

const ALLOWED_ROLES = process.env['ALLOWED_ROLES'];

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	if (event.locals.user && event.locals.user.verified)
		throw redirect(
			303,
			`${base}/app/dashboard`,
			{ message: 'Already Logged in!', type: 'success' },
			event
		);
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		// Get form data
		const { request, cookies, locals } = event;
		const formData = await request.formData();
		const entry = Object.fromEntries(formData);
		const { browserSessionToken } = entry;
		if (!entry.username || !entry.password) {
			const error = 'Username and Password are required!';
			addToSessionStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			return fail(400, {
				error,
				username: entry.username
			});
		}

		const { username, password } = entry;
		let authData;
		// Login the user
		try {
			logger.info(`🔑 Authenticating ${entry.username} ...`);
			const user = await pbAdmin.collection('users').authWithPassword(username, password);
			authData = { ...user.record, token: user.token, browserSessionToken };
		} catch (error) {
			logger.error(`❗️ User authentication failed: ${entry.username}`);
			addToSessionStream('login-error', browserSessionToken, {
				error: error.message,
				username: entry.username
			});
			return fail(400, {
				error: error.message,
				username: entry.username
			});
		}

		// Check if user is allowed
		if (!ALLOWED_ROLES.includes(authData.role)) {
			const error = 'User not allowed!';
			addToSessionStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			return fail(400, {
				error: 'Failed to authenticate.',
				username: entry.username
			});
		}

		// Check if user has verified their email
		if (!authData.verified) {
			const error = 'Email not verified!';
			// save email temporarily in redis
			await redis.set(`unverified-email:${authData.id}`, authData.email);
			event.locals.unverifiedUser = authData.id;

			addToSessionStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			await createSession(authData, cookies, true);
			throw redirect(303, `${base}/verify-email`, null, event);
		}

		await createSession(authData, cookies);
		addToSessionStream('login-success', browserSessionToken, {
			appUserId: authData.id
		});
		logger.info(`✅ User authenticated: ${entry.username}`);

		// Generate random token

		const message = { type: 'success', message: 'Sign in successful!' };
		throw redirect(303, `${base}/app/dashboard`, message, event);
	}
};
