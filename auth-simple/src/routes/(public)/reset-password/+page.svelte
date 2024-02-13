<script>
	/** @type {import('./$types').PageData} */
	import { enhance } from '$app/forms';
	export let form;
	import { i18n } from '$lib/stores/i18next.js';
	import { base } from '$app/paths';
	import LanguagesButtons from '$lib/components/LanguagesButtons.svelte';

	export let data;
	const browserSessionToken = data.browserSessionToken;
</script>

<div class="card variant-glass-surface p-10 rounded-md shadow-md w-full sm:w-96 space-y-3">
	<div class="flex justify-center">
		<a href="/">
			<img src="{base}/logo.png" alt="" class="w-44 h-44 rounded" />
		</a>
	</div>

	<h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">
		{$i18n.t('Reset your password')}
	</h2>

	{#if form?.error}
		<div class="alert variant-filled-error rounded-md">
			<div class="alert-message">
				{$i18n.t(form?.error)}
			</div>
		</div>
	{/if}
	<LanguagesButtons />
	<form method="post" use:enhance class="space-y-2">
		<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
		<div>
			<input
				type="email"
				id="email"
				name="email"
				placeholder={$i18n.t('email')}
				required
				class="w-full input px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="flex items-center justify-between">
			<button type="submit" class="btn variant-filled-primary px-4 py-2 w-full rounded-md">
				{$i18n.t('Reset Password')}
			</button>
		</div>
	</form>
	<div>
		<a href="{base}/login" class="btn variant-ringed-secondary rounded-md w-full"
			>{$i18n.t('I remember now :)')}</a
		>
	</div>
</div>
