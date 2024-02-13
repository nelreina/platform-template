<script>
	export let action = 'create';
	export let postAction = async () => {};
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
				const ret = await postAction(result);
				if (ret) {
					await invalidateAll();
				}
			}
		};
	}}
>
	<slot />
</form>
