<script lang="ts">
  import type { SectorSummaryStore } from '$lib/view-state/sector-summary';

  export let sectorSummary: SectorSummaryStore['sectorSummary'];
</script>

<div>
  <h1>{$sectorSummary.description}</h1>
</div>
