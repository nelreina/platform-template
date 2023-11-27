/** @type {import('./$types').ParamMatcher */
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { createInstance } from '$lib/pocketbase.js';

import { getSessionUser } from './lib/server/sessions';
import { checkOtp } from './lib/server/otp';

export const handle = async ({ event, resolve }) => {
	const pb = createInstance();
	const session = await getSessionUser(event.cookies);
	const { user, token } = session || {};
	event.locals.user = user;

	if (
		event.url.pathname.startsWith(`${base}/app`)
		// ||
		// event.url.pathname.startsWith(`${base}/auth`)
	) {
		if (!user) {
			throw redirect(303, `${base}/login`);
		} else {
			await checkOtp(user, token, event);
		}
	}

	const response = await resolve(event);
	return response;
};
