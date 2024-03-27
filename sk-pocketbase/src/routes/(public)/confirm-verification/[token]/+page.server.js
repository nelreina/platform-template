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
		const { browserSessionToken } = entry;
		const { token } = params;

		// reset password
		try {
			const res = await pbAdmin.collection('users').confirmVerification(token);
			addToSessionStream('email-confirm', browserSessionToken, {});
			return { success: 'Email confirmed successfully' };
		} catch (error) {
			console.log('LOG:  ~ : ~ error:', error);
			addToSessionStream('email-confirm-error', browserSessionToken, {
				error: error.message
			});
			return fail(400, { error: 'Error confirming email' });
		}
		// throw redirect(303, `${base}/login`);
	}
};
