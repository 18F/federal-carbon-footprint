<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import Sankey from '$components/Sankey.svelte';
  import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';

  export const prerender = true;

  const agencySectorImpact = createAgencySectorImpactStore();

  /** @type {import('./[slug]').Load} */
  export const load = async ({ params, fetch }) => {
    const loaded = await agencySectorImpact.init({ fetch });
    if (!loaded) {
      return {
        status: 404,
        error: new Error(`Could not load data`),
      };
    }

    const agencyName = params.slug;
    agencySectorImpact.filterOptions.set({
      agencyName,
      kgCO2Threshold: 0,
      sectorDepth: 5,
    });

    return {
      status: 200,
      props: {
        agencyName,
      },
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
