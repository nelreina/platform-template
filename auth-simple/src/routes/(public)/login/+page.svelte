<script>
	/** @type {import('./$types').PageData} */
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="card variant-glass-tertiary p-10 rounded-md shadow-md w-full sm:w-96 space-y-5">
	<h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">Enter Credentials</h2>

	{#if form?.error}
		<div class="alert variant-filled-error rounded-md">
			<div class="alert-message">
				{form?.error}
			</div>
		</div>
	{/if}

	<form method="post" use:enhance>
		<div class="mb-4">
			<input
				type="text"
				id="username"
				name="username"
				placeholder="Username"
				value={form?.username ?? ''}
				class="w-full input px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="mb-4">
			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				class="w-full input px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="flex items-center justify-between">
			<button type="submit" class="btn variant-filled-primary px-4 py-2 w-full rounded-md"
				>Login</button
			>
		</div>
	</form>
</div>
