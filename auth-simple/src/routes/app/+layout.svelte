<script>
	import '../../app.postcss';
	import {
		AppShell,
		AppBar,
		Toast,
		Drawer,
		getDrawerStore,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import AppTitle from '../../lib/components/AppTitle.svelte';
	import { createPbRealtimeDataStore } from '$lib/stores/pb-store-context.js';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	const drawerStore = getDrawerStore();
	export let data;

	const drawerOpen = () => {
		drawerStore.open({});
	};
	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const user = data.user;
	const sessions = data.sessions;

	const toastMessages = {
		create: {
			message: 'New event logged in session:',
			field: 'event'
		}
	};

	const logs = createPbRealtimeDataStore(sessions, 'app_sessions', user, toastStore, toastMessages);

	const mainNav = [
		{
			name: 'Dashboard',
			href: `${base}/app/dashboard`,
			icon: 'home'
		},
		{
			name: 'Report',
			href: `${base}/app/report`,
			icon: 'home'
		},
		{
			name: 'Email',
			href: `${base}/app/email`,
			icon: 'email'
		}
	];
</script>

<Toast position="t" />

<Drawer>
	<div class="flex justify-between items-center p-4">
		<AppTitle />
	</div>
	<hr />
	<!-- <DrawNavigation /> -->
	<div class="flex flex-col justify-around gap-2 items-center p-4">
		{#each mainNav as nav}
			<a
				class="btn btn-lg variant-outline-secondary dark:variant-ghost-surface w-full"
				href={nav.href}
				on:click={() => drawerStore.close()}
			>
				{nav.name}
			</a>
		{/each}
		<div class="relative inline-block w-full">
			<span class="hidden badge-icon variant-filled-primary absolute -right-0 z-10"
				>{$logs.length}</span
			>
			<a
				class="btn btn-lg variant-outline-secondary dark:variant-ghost-surface w-full"
				href="{base}/app/session-logs"
				on:click={() => drawerStore.close()}
			>
				Logs &nbsp; <span class="badge variant-filled-primary">{$logs.length}</span>
			</a>
		</div>

		<a
			class="btn btn-lg variant-ghost-tertiary rounded-none w-full"
			href="{base}/app/profile"
			on:click={() => drawerStore.close()}
		>
			{data.user?.name}
		</a>
		<hr />
		<div class=" flex flex-col justify-around gap-2 items-center p-4">
			<LightSwitch />
		</div>
		<hr />
	</div></Drawer
>

<!-- App Shell -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<AppTitle />
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="hidden md:block">
					<div class="flex items-center gap-1">
						{#each mainNav as nav}
							<a
								class="btn btn-sm variant-outline-secondary dark:variant-ghost-surface"
								href={nav.href}
							>
								{nav.name}
							</a>
						{/each}
						<div class="relative inline-block">
							<span class="badge-icon variant-filled-primary absolute -top-2 -right-0 z-10"
								>{$logs.length}</span
							>
							<a
								class="btn btn-sm variant-outline-secondary dark:variant-ghost-surface"
								href="{base}/app/session-logs"
							>
								Logs
							</a>
						</div>

						<a class="btn btn-sm rounded-none variant-ghost-tertiary" href="{base}/app/profile">
							{data.user?.name}
						</a>
						<LightSwitch />
					</div>
				</div>
				<div class="md:hidden">
					<button class="btn rounded-full variant-glass-surface" on:click={drawerOpen} on:keypress>
						<svg
							width="20"
							height="15"
							viewBox="0 0 28 23"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H27"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M1 11.1111H27"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M1 21.2222H27"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="flex flex-col justify-center items-center">
		<div class="w-full lg:w-4/5 xl:w-4/5 p-5">
			<slot />
		</div>
	</div>
</AppShell>
