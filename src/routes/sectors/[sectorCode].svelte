<script context="module" lang="ts">
  import { getUrl } from '$context/frontend';
  import SectorSummary from '$components/SectorSummary.svelte';
  import { createSectorSummaryStore } from '$lib/view-state/sector-summary';

  export const prerender = true;

  const sectorSummaryStore = createSectorSummaryStore();

  /** @type {import('./[sectorCode]').Load} */
  export const load = async ({ params, fetch }) => {
    const sectorCode = params['sectorCode'];
    const url = getUrl(`/api/v1/sectors/${sectorCode}.json`);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      sectorSummaryStore.init({ data });

      return {
        status: 200,
        props: {},
      };
    }
    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  };
</script>

<script lang="ts">
</script>

<div class="grid-container">
  <SectorSummary sectorSummary={sectorSummaryStore.sectorSummary} />
</div>
