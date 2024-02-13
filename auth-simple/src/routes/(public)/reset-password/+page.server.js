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
		const { request } = event;
		const formData = await request.formData();
		const entry = Object.fromEntries(formData);
		const { browserSessionToken } = entry;

		const { email } = entry;

		addToSessionStream('reset-password', browserSessionToken, {
			email
		});
		logger.info(`✅ User registered: ${entry.username}`);

		// Generate random token
		await pbAdmin.collection('users').requestPasswordReset(email);

		const message = { type: 'success', message: 'Register successful!' };
		throw redirect(303, `${base}/login`, message, event);
	}
};
