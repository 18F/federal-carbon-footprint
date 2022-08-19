<script context="module" lang="ts">
  import Sankey from '$components/Sankey.svelte';
  import { getUrl } from '$context/frontend';
  import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';

  export const prerender = true;

  const agencySectorImpact = createAgencySectorImpactStore();

  /** @type {import('./[slug]').Load} */
  export const load = async ({ params, fetch }) => {
    const agencyName = params['slug'];
    const url = getUrl(`/api/v1/agencies/${agencyName}/spending-impact.json`);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      await agencySectorImpact.init({
        data,
        filter: {
          agencyName,
          kgCO2Threshold: 0,
          sectorDepth: 5,
        },
      });
      return {
        status: 200,
        props: { agencyName },
      };
    }
    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  };
</script>

<script lang="ts">
  export let agencyName: string;
</script>

<div class="grid-container">
  <h1>{agencyName}</h1>
  <div class="grid-row grid-gap-lg">
    <div class="tablet:grid-col-12">
      <Sankey agencySectorImpacts={agencySectorImpact.visibleAgencySectorImpacts} />
    </div>
  </div>
</div>
