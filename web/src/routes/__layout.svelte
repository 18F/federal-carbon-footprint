<script lang="ts">
  import '../styles/app.scss';
  import BetaBanner from '$lib/components/BetaBanner.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<BetaBanner />
<Banner />
<Header />
<main>
  <slot />
</main>
<Footer />

<style>
</style>
