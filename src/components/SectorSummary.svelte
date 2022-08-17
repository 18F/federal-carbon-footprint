<script lang="ts">
import type { SectorSummaryStore } from "$lib/view-state/sector-summary";

export let sectorSummary: SectorSummaryStore['sectorSummary'];
</script>

<div>{JSON.stringify(sectorSummary)}</div>