import { addToSessionStream } from '$lib/server/sessions.js';

/** @type {import('./$types').RequestHandler} */
const SERVICE_NAME = process.env['SERVICE_NAME'];

export async function POST({ request, params }) {
	const body = await request.json();
	// console.log('LOG:  ~ file: +server.js:11 ~ POST ~ body', body);
	await addToSessionStream(params.event, body.token, body);
	return new Response();
}
