<script>
	import { i18n } from '$lib/stores/i18next.js';
	import EnhancedForm from '$lib/components/EnhancedForm.svelte';

	export let user = {};
	export let browserSessionToken = '';
	export let changingPassword = false;
	let form;

	const postAction = async (result) => {
		if (result.type === 'failure') {
			form = { error: result.data.error };
			// return false;
		} else {
			form = { success: result.data.success };
			changingPassword = false;
			// return true;
		}
	};
</script>

<main>
	<div
		class="profile-card card p-5 variant-glass-tertiary flex flex-col gap-3 justify-center items-center"
	>
		<div class="avatar">
			<!-- Placeholder avatar (you can replace this with an actual image) -->
			<img src="https://via.placeholder.com/100" alt="Avatar Placeholder" />
		</div>
		<h2 class="text-3xl font-bold">{user.name}</h2>
		<p class="text-primary-500 text-sm">@{user.username}</p>
		<p class="text-secondary-500 text-sm">{user.email}</p>
		<EnhancedForm action="changePassword" {postAction}>
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
			{:else}
				<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
				<button class="btn rounded-md variant-filled-secondary">{$i18n.t('Change Password')}</button
				>
			{/if}
		</EnhancedForm>
		<form action="?/logout" method="post" class="">
			<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
			<button class="btn rounded-md variant-filled-primary"> {$i18n.t('Logout')} </button>
		</form>
		<!-- content here -->
	</div>
</main>

<style>
	/* Center content on the page */
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
	}

	/* Profile card styling */
	.profile-card {
		max-width: 400px;
		padding: 3em;
		/* border: 1px solid #ddd; */
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	/* Avatar styling */
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 20px;
	}
</style>
