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

		if (
			!entry.username ||
			!entry.password ||
			!entry.email ||
			!entry.password ||
			!entry.passwordConfirm
		) {
			const error = 'All fields are required!';
			addToSessionStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			return fail(400, {
				error,
				username: entry.username
			});
		}
		if (entry.password !== entry.passwordConfirm) {
			const error = 'Password and Confirm Password must be equal!';
			addToSessionStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			return fail(400, {
				error,
				username: entry.username
			});
		}

		const { username, password, email, passwordConfirm } = entry;
		let authData;
		// Login the user
		try {
			logger.info(`🔑 Register ${entry.username} ...`);
			// example create data
			const data = {
				username,
				email,
				emailVisibility: true,
				password,
				passwordConfirm,
				name: username,
				role: 'ADMIN'
			};

			const record = await pbAdmin.collection('users').create(data);

			// (optional) send an email verification request
			await pbAdmin.collection('users').requestVerification(email);

			authData = { ...record, browserSessionToken };
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

		await createSession({ email }, cookies, true);
		addToSessionStream('login-success', browserSessionToken, {
			appUserId: authData.id
		});
		logger.info(`✅ User registered: ${entry.username}`);

		// Generate random token

		const message = { type: 'success', message: 'Register successful!' };
		throw redirect(303, `${base}/verify-email`, message, event);
	}
};
