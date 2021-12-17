<script context="module">
  import { browser, dev } from '$app/env';
  import { base } from '$app/paths';
  export const hydrate = dev;
  export const router = browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>Fuel Type Usage</title>
</svelte:head>

<div class="grid-container">
</div>
