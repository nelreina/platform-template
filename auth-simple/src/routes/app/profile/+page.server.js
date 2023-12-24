import { deleteSession } from '$lib/server/sessions';
import { addToSessionStream } from '$lib/server/sessions';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies, locals }) => {
		const entry = Object.fromEntries(await request.formData());
		const { browserSessionToken } = entry;
		addToSessionStream('logout', browserSessionToken, {
			appUserId: locals.user?.id
		});
		await deleteSession(cookies);
	}
};
