<script>
	/** @type {import('./$types').PageData} */
	import { enhance } from '$app/forms';
	export let form;
	import { i18n } from '$lib/stores/i18next.js';
	import { base } from '$app/paths';
	import LanguagesButtons from '$lib/components/LanguagesButtons.svelte';

	export let data;
	const browserSessionToken = data.browserSessionToken;

	let username = form?.username ?? '';
	let usernameAvailable;
	let usernameRef;

	let email = form?.email ?? '';
	let emailAvailable;

	const checkReg = async (field, value) => {
		const res = await fetch(`${base}/api/check-reg`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ field, value })
		});
		const json = await res.json();
		return json;
	};

	const checkUsername = async () => {
		const res = await checkReg('username', username);
		usernameAvailable = res.available;
		if (!usernameAvailable) {
			usernameRef.focus();
		}
	};

	const checkEmail = async () => {
		const res = await checkReg('email', email);
		emailAvailable = res.available;
	};

	$: isNotValidReg = usernameAvailable && emailAvailable;
</script>

<div class="card variant-glass-surface p-10 rounded-md shadow-md w-full sm:w-96 space-y-3">
	<div class="flex justify-center">
		<a href="/">
			<img src="{base}/logo.png" alt="" class="w-44 h-44 rounded" />
		</a>
	</div>

	<h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">
		{$i18n.t('Register as a new user')}
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
				on:blur={checkEmail}
				bind:value={email}
				required
				class="w-full input px-3 py-2 border border-gray-300 rounded-md"
			/>
			{#if emailAvailable === false}
				<div class="alert variant-filled-error rounded-none py-1">
					{$i18n.t(
						'There is already an account with this email address. Please login or reset your password.'
					)}
				</div>
			{/if}
		</div>
		<div>
			<input
				bind:this={usernameRef}
				type="text"
				id="username"
				name="username"
				placeholder={$i18n.t('Username')}
				on:blur={checkUsername}
				bind:value={username}
				class="w-full input px-3 py-2 border border-gray-300 rounded-md"
				required
			/>
			{#if usernameAvailable === false}
				<div class="alert variant-filled-error rounded-none py-1">
					{$i18n.t('This username is already taken. Please choose another.')}
				</div>
			{/if}
		</div>

		<input
			type="password"
			id="password"
			name="password"
			placeholder={$i18n.t('Password')}
			class="w-full input px-3 py-2 border border-gray-300 rounded-md"
		/>
		<input
			type="password"
			id="passwordConfirm"
			name="passwordConfirm"
			placeholder={$i18n.t('Confirm Password')}
			class="w-full input px-3 py-2 border border-gray-300 rounded-md"
		/>

		<div class="flex items-center justify-between">
			<button
				type="submit"
				class:disabled={!isNotValidReg}
				disabled={!isNotValidReg}
				class="btn variant-filled-primary px-4 py-2 w-full rounded-md"
			>
				{$i18n.t('Register')}
			</button>
		</div>
	</form>
	<div>
		<a href="{base}/login" class="btn variant-ringed-secondary rounded-md w-full"
			>{$i18n.t('I do have account already')}</a
		>
	</div>
</div>
