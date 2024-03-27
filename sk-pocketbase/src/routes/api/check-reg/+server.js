import { pbAdmin } from '$lib/server/pb-admin';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
	const { field, value } = await request.json();
	const resp = { available: true };
	// console.log('LOG:  ~ file: +server.js:11 ~ POST ~ body', body);
	try {
		const filter = `${field}="${value}"`;
		const record = await pbAdmin.collection('users').getFirstListItem(filter);
		if (record) {
			resp.available = false;
			resp.message = `User with ${field} ${value} already exists`;
		}
	} catch (error) {}

	return json(resp);
}
