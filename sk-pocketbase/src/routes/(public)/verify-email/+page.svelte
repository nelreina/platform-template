<script>
	export let data;
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';

	$: email = data.user?.email;
</script>

<div class="card variant-glass-surface p-10 rounded-md shadow-md w-full sm:w-96 space-y-3">
	<div class="flex justify-center">
		<a href="/">
			<img src="{base}/logo.png" alt="" class="w-44 h-44 rounded" />
		</a>
	</div>

	<h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">Verify Your Email</h2>

	<div class="alert">
		<p class="text-center card variant-outline-success p-5">
			We have sent an email to <strong class="text-primary-500">{email}</strong>. Please click the
			link in the email to verify your email address.
		</p>
	</div>

	<div>
		<form action="" method="post" class="flex justify-center" use:enhance>
			<input type="hidden" name="email" value={email} />
			<button class="btn variant-filled-tertiary px-4 py-2 w-full rounded-md">Resend Email</button>
		</form>
	</div>
	<a class="btn variant-filled-secondary w-full rounded-md" href="{base}/login">Go login Page </a>

	{@debug data}
</div>
