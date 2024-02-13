<script>
	export let action = 'create';
	export let postAction = () => {};
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
</script>

<form
	action="?/{action}"
	method="post"
	class="flex flex-col gap-5"
	use:enhance={() => {
		return async ({ result }) => {
			if (result) {
				await postAction(result);
				await invalidateAll();
			}
		};
	}}
>
	<slot />
</form>
