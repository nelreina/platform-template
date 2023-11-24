import { redirect, fail } from '@sveltejs/kit';
import { createSession } from '$lib/server/sessions';
import { base } from '$app/paths';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(303, `${base}/app/dashboard`);
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		// Get form data
		const formData = await request.formData();
		const entries = Object.fromEntries(formData);
		// useranem and password are required
		if (!entries.username || !entries.password) {
			return fail(400, {
				error: 'Username and Password are required!',
				username: entries.username
			});
		}
		// fake login
		if (entries.username !== 'admin' || entries.password !== 'polka123')
			return fail(400, { error: 'Username or Password incorrect!', username: entries.username });

		// Generate random token
		await createSession(
			{
				id: 1,
				username: entries.username,
				role: 'ADMIN',
				otp: false,
				email: 'admin@nelreina.tech'
			},
			cookies
		);
		throw redirect(303, `${base}/app/dashboard`);
	}
};
