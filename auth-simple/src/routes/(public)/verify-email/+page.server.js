/** @type {import('./$types').PageLoad} */
import { base } from '$app/paths';
import { pbAdmin } from '$lib/server/pb-admin';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const { user } = locals;
	if (!user) {
		throw redirect(303, `${base}/login`);
	}

	// Show first and last part of email address

	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals }) => {
		const { user } = locals;
		await pbAdmin.collection('users').requestVerification(user.email);
		throw redirect(303, `${base}/login`);
	}
};
