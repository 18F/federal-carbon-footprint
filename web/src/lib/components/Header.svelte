<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
</script>

<header
  class="grid-container usa-header usa-header--basic usa-header--megamenu"
>
  <div class="usa-nav-container">
    <div class="usa-navbar" />
  </div>
  <ul>
    <li class:active={$page.path === '/'}>
      <a sveltekit:prefetch href={`${base}/`}>Home</a>
    </li>
    <li class:active={$page.path === '/about'}>
      <a sveltekit:prefetch href={`${base}/about`}>About</a>
    </li>
  </ul>
</header>

<style>
</style>
