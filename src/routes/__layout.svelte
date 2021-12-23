<script lang="ts">
  import '$styles/app.scss';
  import BetaBanner from '$components/BetaBanner.svelte';
  import Banner from '$components/Banner.svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';

  import { getUrl, githubBranchTreeUrl } from '$context/frontend';
</script>

<svelte:head>
  <link rel="icon" href={getUrl('/favicon.ico')} />
</svelte:head>

<BetaBanner />
<Banner />
<Header />
<main>
  <slot />
</main>
<Footer githubBranchTreeUrl={githubBranchTreeUrl} />
