<script>
  import { getUserState } from "$lib/stores/user.js";
  //  export let data;
  const user = getUserState();
</script>

<h1>Welcome to SvelteKit {$user.name}</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
