<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import PieChart from '$components/PieChart.svelte';
  import Sankey from '$components/Sankey.svelte';
  import type { Data } from './index.json';

  export const prerender = true;

  import { writable } from 'svelte/store';
  export const spendingImpact = writable<Data>({ agencies: [] });

  export const load = async ({ fetch }: LoadInput) => {
    const response = await fetch('index.json');

    if (response.ok) {
      spendingImpact.set(await response.json());
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
  <h1>Sample Sankey Diagram</h1>
  <Sankey data={$spendingImpact} />
  <h1>Federal Government Total Energy Consumption by Fuel Type (Trillion Btu)</h1>
  <PieChart />
  <h1>Agengies</h1>
  <ul>
    <li><a href={getUrl('/agencies/usgs')}>USGS Agency Page</a></li>
    <li><a href={getUrl('/agencies/cms')}>CMS Agency Page</a></li>
  </ul>
</div>
