<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import AgencyImpactFilterForm from '$components/AgencyImpactFilterForm.svelte';
  import Sankey from '$components/Sankey.svelte';
  import { getUrl, viewState } from '$context/frontend';

  export const prerender = true;

  export const load = async ({ fetch }: LoadInput) => {
    const loaded = await viewState.agencySectorImpact.init({ fetch });
    if (!loaded) {
      return {
        status: 404,
        error: new Error(`Could not load data`),
      };
    }
    return {
      status: 200,
    };
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="grid-container">
  <div class="text-italic margin-top-1">
    NOTE: All data in these visualizations are for test purposes only.
  </div>
  <h1>Federal Product and Services Greenhouse Gas Impact (kg CO<sup>2</sup> equivalent)</h1>
  <div class="grid-row grid-gap-lg">
    <div class="tablet:grid-col-3">
      <AgencyImpactFilterForm filterOptions={viewState.agencySectorImpact.filterOptions} />
    </div>
    <div class="tablet:grid-col-9">
      <Sankey agencySectorImpacts={viewState.agencySectorImpact.visibleAgencySectorImpacts} />
    </div>
  </div>
  <h1>Test Pages</h1>
  <ul>
    <li><a href={getUrl('/agencies/defense')}>Defense Dept. Page</a></li>
    <li><a href={getUrl('/agencies/treasury')}>Treasury Page</a></li>
  </ul>
</div>
