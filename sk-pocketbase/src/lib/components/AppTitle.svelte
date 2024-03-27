<script>
	import { base } from '$app/paths';
	import { PUBLIC_APP_TITLE } from '$env/static/public';

	//  export let data;
</script>

<a href={base} class="flex items-center gap-3">
	<img src="{base}/logo.png" alt="" class="w-12 h-12 rounded" />

	<strong class="text-xl uppercase">{PUBLIC_APP_TITLE}</strong>
</a>
