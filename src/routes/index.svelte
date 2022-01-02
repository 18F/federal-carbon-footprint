<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import AgencyImpactFilterForm from '$components/AgencyImpactFilterForm.svelte';
  import Sankey from '$components/Sankey.svelte';
  import { impactData } from '$lib/stores/agency-sector-impact';

  export const prerender = true;

  export const load = async ({ fetch }: LoadInput) => {
    const response = await fetch('/api/v1/spending-impact.json');

    if (response.ok) {
      impactData.set(await response.json());
      return {
        props: {
          status: 'loaded',
        },
      };
    }

    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  };
</script>

<script lang="ts">
  import { getUrl } from '$context/frontend';
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
      <AgencyImpactFilterForm />
    </div>
    <div class="tablet:grid-col-9">
      <Sankey />
    </div>
  </div>
  <h1>Agengies</h1>
  <ul>
    <li><a href={getUrl('/agencies/usgs')}>USGS Agency Page</a></li>
    <li><a href={getUrl('/agencies/cms')}>CMS Agency Page</a></li>
  </ul>
</div>
