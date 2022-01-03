<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import Sankey from '$components/Sankey.svelte';
  import { viewState } from '$context/frontend';

  export const prerender = true;

  export const load = async ({ page, fetch }: LoadInput) => {
    const loaded = await viewState.agencySectorImpact.init({ fetch });
    if (!loaded) {
      return {
        status: 404,
        error: new Error(`Could not load data`),
      };
    }

    const agencyName = page.params.slug;
    viewState.agencySectorImpact.filterOptions.set({
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
      <Sankey agencySectorImpacts={viewState.agencySectorImpact.visibleAgencySectorImpacts} />
    </div>
  </div>
</div>
