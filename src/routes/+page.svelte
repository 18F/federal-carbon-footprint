<script lang="ts">
  import AgencyImpactFilterForm from '$components/AgencyImpactFilterForm.svelte';
  import Sankey from '$components/Sankey.svelte';
  import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  const agencySectorImpact = createAgencySectorImpactStore();
  $: agencySectorImpact.init({
    spendingImpact: data.spendingImpact,
    filter: {},
  });
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
