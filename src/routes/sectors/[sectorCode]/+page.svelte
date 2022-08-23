<script context="module" lang="ts">
  import SectorSummary from '$components/SectorSummary.svelte';
</script>

<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="grid-container">
  <SectorSummary sectorSummary={data.sectorSummaryStore.sectorSummary} />
</div>
