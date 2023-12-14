/** @type {import('./$types').Actions} */

import { sendMail } from '$lib/server/mailer';
import { fail } from '@sveltejs/kit';
import { render } from 'svelte-email';

import Sample from './templates/Sample.svelte';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const entry = Object.fromEntries(formData);

		// message is required
		if (!entry.message) {
			return fail(400, { error: 'Message is required.' });
		}

		const emailHtml = render({
			template: Sample,
			props: {
				message: entry.message
			}
		});
		const send = await sendMail(entry.email, entry.subject, emailHtml);
		if (send.error) {
			return fail(400, { error: send.message });
		} else {
			return {
				success: 'Email sent successfully.'
			};
		}
	}
};
