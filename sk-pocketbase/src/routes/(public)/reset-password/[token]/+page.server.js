/** @type {import('./$types').PageLoad} */

import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { addToSessionStream } from '$lib/server/sessions';
import { pbAdmin } from '$lib/server/pb-admin';

export async function load({ params }) {
	return {
		token: params.token
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const entry = Object.fromEntries(await request.formData());

		console.log('LOG:  ~ : ~ params:', params);
		const { password, confirmPassword } = entry;
		const { browserSessionToken } = entry;
		const { token } = params;

		// check password and confirmPassword are not empty
		if (!password || !confirmPassword || password === '' || confirmPassword === '') {
			addToSessionStream('password-reset-error', browserSessionToken, {
				error: 'Password and confirmPassword are required'
			});

			return fail(400, { error: 'Password and confirmPassword are required' });
		}

		// check password and confirmPassword match
		if (password !== confirmPassword) {
			addToSessionStream('password-reset-error', browserSessionToken, {
				error: 'Passwords do not match'
			});
			return fail(400, { error: 'Passwords do not match' });
		}

		// reset password
		try {
			const res = await pbAdmin
				.collection('users')
				.confirmPasswordReset(token, password, confirmPassword);
			console.log('LOG:  ~ default: ~ res:', res);
			addToSessionStream('password-reset', browserSessionToken, {});
		} catch (error) {
			console.log('LOG:  ~ : ~ error:', error);
			addToSessionStream('password-reset-error', browserSessionToken, {
				error: error.message
			});
		}
		throw redirect(303, `${base}/login`);
	}
};
