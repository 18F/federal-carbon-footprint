<script lang="ts">
  import Sankey from '$components/Sankey.svelte';
  import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';
  import type { PageData } from './$types';

  export let data: PageData;
  
  const agencySectorImpact = createAgencySectorImpactStore();
  agencySectorImpact.init({
    spendingImpact: data.spendingImpact,
    filter: data.filter,
  });
</script>

<div class="grid-container">
  <h1>{data.agencyName}</h1>
  <div class="grid-row grid-gap-lg">
    <div class="tablet:grid-col-12">
      <Sankey agencySectorImpacts={agencySectorImpact.visibleAgencySectorImpacts} />
    </div>
  </div>
</div>
