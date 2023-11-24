import { deleteSession } from '$lib/server/sessions';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies }) => {
		await deleteSession(cookies);
	}
};
