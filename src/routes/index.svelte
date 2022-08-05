<script context="module" lang="ts">
  import AgencyImpactFilterForm from '$components/AgencyImpactFilterForm.svelte';
  import Sankey from '$components/Sankey.svelte';
import { getUrl } from '$context/frontend';
  import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';

  export const prerender = true;

  const agencySectorImpact = createAgencySectorImpactStore();

  /** @type {import('./[slug]').Load} */
  export const load = async ({ fetch }) => {
    const url = getUrl(`/api/v1/spending-impact.json`);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      await agencySectorImpact.init({ data });
      return {
        status: 200
      };
    }
    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  }
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
      <AgencyImpactFilterForm filterOptions={agencySectorImpact.filterOptions} />
    </div>
    <div class="tablet:grid-col-9">
      <Sankey agencySectorImpacts={agencySectorImpact.visibleAgencySectorImpacts} />
    </div>
  </div>
</div>
