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
  <div class="usa-prose padding-top-3">
    Fuel type usage data is available here: <a
      href={`${base}/api/v1/fuel-type-usage.json`}>fuel-type-usage.json</a
    >
  </div>
</div>
