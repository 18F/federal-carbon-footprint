<script context="module">
  import { env } from '$context/frontend';

  export const hydrate = env.dev;
  export const router = env.browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>API endpoints</title>
</svelte:head>

<div class="grid-container" />
