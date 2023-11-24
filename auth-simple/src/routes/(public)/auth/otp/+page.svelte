<script>
	export let form;
</script>

<div class="card p-10 variant-glass-tertiary">
	<div class="flex flex-col gap-5">
		<h3 class="h3">Please Enter Authentication Code</h3>
		{#if form?.error}
			<div class="alert variant-filled-error rounded-md">
				<div class="alert-message">
					{form?.error}
				</div>
			</div>
		{/if}
		<form action="" method="post">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="input"
				name="authCode"
				type="number"
				autofocus
				placeholder="Enter Authenticator Code"
			/>
		</form>
	</div>
</div>
