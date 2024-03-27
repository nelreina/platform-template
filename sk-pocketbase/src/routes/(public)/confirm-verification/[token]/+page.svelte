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
			<img src="{base}/logo.png" alt="" class="h-44 rounded" />
		</a>
	</div>

	<h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">
		{$i18n.t('Confirm your email address')}
	</h2>

	<LanguagesButtons />
	{#if form?.error}
		<div class="alert variant-filled-error rounded-md">
			<div class="alert-message">
				{$i18n.t(form?.error)}
			</div>
		</div>
	{/if}
	{#if form?.success}
		<div class="alert variant-filled-success rounded-md">
			<div class="alert-message">
				{$i18n.t(form?.success)}
			</div>
		</div>
		<div>
			<a href="{base}/login" class="btn variant-filled-tertiary rounded-md w-full"
				>{$i18n.t('Back to login')}</a
			>
		</div>
	{:else}
		<form method="post" use:enhance class="space-y-2">
			<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
			<div class="flex items-center justify-between">
				<button type="submit" class="btn variant-filled-primary px-4 py-2 w-full rounded-md">
					{$i18n.t('Confirm Email')}
				</button>
			</div>
		</form>
	{/if}
</div>
