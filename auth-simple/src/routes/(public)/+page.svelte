<script>
	export let data;
	import { base } from '$app/paths';
</script>

<div class="card variant-ghost-tertiary space-y-10 p-5 text-center flex flex-col items-center">
	{#if data.user}
		<h2 class="h2">Welcome back {data.user.username} to Auth Simple App.</h2>
		<div class="flex justify-center space-x-2">
			<a class="btn variant-filled-primary btn-xl" href="{base}/app/dashboard">
				To the Dashboard
			</a>
		</div>
	{:else}
		<!-- else content here -->
		<h2 class="h2">Welcome to Auth Simple App.</h2>
		<div class="flex justify-center space-x-2">
			<a class="btn variant-filled-primary btn-xl" href="/login"> Please Login to Continue </a>
		</div>
	{/if}
</div>
