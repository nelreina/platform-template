<script>
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import GatherInfoMation from '../lib/components/GatherInfoMation.svelte';
	export let data;
	const browserSessionToken = data.browserSessionToken;
	const userId = data.user?.id;
	// console.log('LOG:  ~ file: +layout.svelte:7 ~ data:', data);
	initializeStores();
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<GatherInfoMation {userId} token={browserSessionToken} />
<slot><!-- optional fallback --></slot>
