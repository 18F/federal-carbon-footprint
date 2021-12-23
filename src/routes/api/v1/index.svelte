<script context="module">;
  import { env } from '$context/frontend';

  export const hydrate = env.dev;
  export const router = env.browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>Fuel Type Usage</title>
</svelte:head>

<div class="grid-container">
</div>
