<script>
	export let form;
	import { enhance } from '$app/forms';
	import Hello from './templates/Sample.svelte';
	import { i18n } from '$lib/stores/i18next.js';

	let message = '';

	// export let data;
</script>

<div class="grid lg:grid-cols-12 gap-3">
	<!-- Form -->
	<div class="card p-10 col-span-4">
		<form action="" method="post" class="flex flex-col gap-3" use:enhance>
			{#if form?.error}
				<div class="alert variant-filled-error col-span-12">
					<div class="alert-message">{$i18n.t(form?.error)}</div>
				</div>
				<!-- content here -->
			{/if}

			{#if form?.success}
				<div class="alert variant-filled-success col-span-12">
					<div class="alert-message">{$i18n.t(form?.success)}</div>
				</div>
				<!-- content here -->
			{/if}
			<div class="form-group">
				<!-- <label for="email">Email</label> -->
				<input type="email" name="email" id="email" class="input" placeholder="Email" />
			</div>

			<div class="form-group">
				<!-- <label for="subject">Subject</label> -->
				<input type="text" name="subject" id="subject" class="input" placeholder="Subject" />
			</div>

			<div class="form-group">
				<!-- <label for="message">Message</label> -->
				<textarea
					name="message"
					id="message"
					class="input"
					placeholder="Message"
					rows="5"
					bind:value={message}
				/>
			</div>

			<div class="form-group">
				<button type="submit" class="btn btn-primary">Send</button>
			</div>
		</form>
	</div>
	<!-- Preview -->
	<div class="card p-10 lg:col-span-8">
		<h3 class="text-2xl">Preview</h3>
		<Hello {message} />
	</div>
</div>
