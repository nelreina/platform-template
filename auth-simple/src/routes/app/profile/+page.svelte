<script>
	export let data;
	const browserSessionToken = data.browserSessionToken;
</script>

<div>
	<pre>{JSON.stringify(data, null, 2)}</pre>

	<form action="" method="post">
		<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
		<button class="btn variant-filled-primary"> Logout </button>
	</form>
</div>
