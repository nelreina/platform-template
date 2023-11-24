<script>
	export let data;
	export let form;
</script>

<div class="card p-10 variant-glass-tertiary">
	<section class="flex flex-col items-center justify-center gap-5">
		<h3 class="h3">Please Setup 2nd Factor Authentication</h3>

		<p>Download Authenticator app from App Stores and scan this qrcode with your phone</p>

		<img src={data.qrcode} alt="qrcode" />
		{#if form?.error}
			<div class="alert variant-filled-error rounded-md">
				<div class="alert-message">
					{form?.error}
				</div>
			</div>
		{/if}
		<form action="" method="post">
			<input type="hidden" name="page" value="otp-settings" />
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="input"
				name="authCode"
				type="number"
				autofocus
				placeholder="Enter Authenticator Code"
			/>
		</form>
	</section>
</div>
