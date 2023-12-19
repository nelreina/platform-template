<script>
  import { setUserState } from "$lib/stores/user.js";
  import "@picocss/pico/css/pico.css";
  export let data;
  const user = setUserState(data.user);
</script>

<div class="container">
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/galerie">Galerie</a></li>
      <li><a href="/grid">Profile</a></li>
    </ul>
    <ul>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <li>{$user.name}</li>
    </ul>
  </nav>
  <slot><!-- optional fallback --></slot>
</div>

<style>
</style>
