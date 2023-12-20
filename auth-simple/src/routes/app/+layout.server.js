import { pbAdmin } from '$lib/server/pb-admin';
import { serializePOJO } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const records = await pbAdmin.collection('app_sessions').getList(1, 50, {
		sort: '-created'
	});
	const sessions = serializePOJO(records.items);

	return {
		user: locals.user,
		sessions
	};
}
