<script context="module">;
  import ctx from '$context/frontend';

  const { browser, dev } = ctx.env;
  export const hydrate = dev;
  export const router = browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>Fuel Type Usage</title>
</svelte:head>

<div class="grid-container">
</div>
