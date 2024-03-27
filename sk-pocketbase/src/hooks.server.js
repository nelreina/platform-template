/** @type {import('./$types').ParamMatcher */
import { redirect } from '@sveltejs/kit';

import { base } from '$app/paths';
const OTP_ENABLED = process.env['OTP_ENABLED'];

import { addToSessionStream, getSessionUser } from './lib/server/sessions';
import { checkOtp } from './lib/server/otp';

export const handle = async ({ event, resolve }) => {
	const session = await getSessionUser(event.cookies);
	const { user, token } = session || {};
	event.locals.user = user;
	if (event.url.pathname.startsWith(`${base}/app`)) {
		if (!user || !user.verified) {
			throw redirect(303, `${base}/login`);
		} else {
			if (user.browserSessionToken) {
				// addToSessionStream('navigate-to', user.browserSessionToken, {
				// 	path: event.url.pathname,
				// 	ts: Date.now(),
				// 	appUserId: user.id
				// });
			}
			await checkOtp(user, token, event);
		}
	}

	const response = await resolve(event);
	return response;
};
