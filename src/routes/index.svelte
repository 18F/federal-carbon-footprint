<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';

  import PieChart from '$components/PieChart.svelte';
  import Sankey from '$components/Sankey.svelte';
  import type { get as getData } from './index.json';

  export const prerender = true;

  export const load = async ({ page, fetch }: LoadInput) => {
    const data = await fetch('index.json')
      .then(response => response.json());
		if (data) {
			return {
				props: {
          data
				}
			};
		}

		return {
			status: 404,
			error: new Error(`Could not load spending impact`)
		};
  };
</script>

<script lang="ts">
  export let data: ReturnType<typeof getData>;
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="grid-container">
  <h1>
    Sample Sankey Diagram
  </h1>
  <Sankey />
  <h1>
    Federal Government Total Energy Consumption by Fuel Type (Trillion Btu)
  </h1>
  <PieChart />
  <h1>Agengies</h1>
  <ul>
    <li><a href="{base}/agencies/usgs">USGS Agency Page</a></li>
    <li><a href="{base}/agencies/cms">CMS Agency Page</a></li>
  </ul>
</div>
