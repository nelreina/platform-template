import { deleteSession } from '$lib/server/sessions';
import { addToSessionStream } from '$lib/server/sessions';
import { fail } from '@sveltejs/kit';
import { pbAdmin } from '$lib/server/pb-admin';

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ request, cookies, locals }) => {
		const entry = Object.fromEntries(await request.formData());
		const { browserSessionToken } = entry;
		addToSessionStream('logout', browserSessionToken, {
			appUserId: locals.user?.id
		});
		await deleteSession(cookies);
	},
	changePassword: async ({ request, locals }) => {
		const { user } = locals;
		const entry = Object.fromEntries(await request.formData());
		const { browserSessionToken } = entry;

		try {
			await pbAdmin.collection('users').requestPasswordReset(user.email);
			addToSessionStream('password-change-request', browserSessionToken, {
				appUserId: user.id
			});
		} catch (error) {
			addToSessionStream('password-change-request-error', browserSessionToken, {
				appUserId: user.id,
				error: error.message
			});
			return fail(400, { error: error.message });
		}

		return { success: 'Check your email to continue' };
	}
};
