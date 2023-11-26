/** @type {import('./$types').PageLoad} */
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ locals }) => {
	const browserSessionToken = crypto.randomUUID();
	return {
		browserSessionToken,
		...locals
	};
});
