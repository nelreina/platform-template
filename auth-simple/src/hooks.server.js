/** @type {import('./$types').ParamMatcher */
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

import { getSessionUser } from './lib/server/sessions';
import { checkOtp } from './lib/server/otp';

export const handle = async ({ event, resolve }) => {
	const user = await getSessionUser(event.cookies);
	event.locals.user = user;

	if (
		event.url.pathname.startsWith(`${base}/app`)
		// ||
		// event.url.pathname.startsWith(`${base}/auth`)
	) {
		if (!user) {
			throw redirect(303, `${base}/login`);
		} else {
			await checkOtp(user);
		}
	}

	const response = await resolve(event);

	// response.headers = {
	//   ...response.headers,
	//   'Access-Control-Allow-Origin': '*'
	// };
	return response;
};
