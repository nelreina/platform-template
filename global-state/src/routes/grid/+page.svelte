<script>
  import { getUserState } from "$lib/stores/user.js";
  /** @type {import('./$types').PageData} */
  const user = getUserState();
</script>

<h3>Profile</h3>

<p>This is a profile page.</p>

<article>
  <h4>Profile</h4>
  <p>Username: {$user.name}</p>
  <p>Email: {$user.email}</p>
  <br />
  <input type="text" placeholder="Change username" bind:value={$user.name} />
</article>
