<script context="module" lang="ts">
</script>

<script lang="ts">
  import SectorSummary from '$components/SectorSummary.svelte';
  import { createSectorSummaryStore } from '$lib/view-state/sector-summary';
  import type { PageData } from './$types';
  
  export let data: PageData;
  const sectorSummaryStore = createSectorSummaryStore();
  sectorSummaryStore.init({ data: data.sectorSummary })
</script>

<div class="grid-container">
  <SectorSummary sectorSummary={sectorSummaryStore.sectorSummary} />
</div>
