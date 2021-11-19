<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import PieChart from '$components/PieChart.svelte';
  import {
    fuelUsageData,
  } from '$lib/stores/fuel-type-usage';
  import {
    initFuelTypeUsageData,
    spendingImpact,
  } from '$lib/stores/spending';
  import { USEEIO_API_KEY } from './_context';

  onMount(async () => {
    await initFuelTypeUsageData({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY
    })
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="grid-container">
  <h1>
    Federal Government Total Energy Consumption by Fuel Type (Trillion Btu)
  </h1>
  <ul>
    <code><pre>{JSON.stringify($spendingImpact, null, 4)}</pre></code>
    <PieChart />
    {#each $fuelUsageData as row}
      <li>
        {row.fuelType}: {row.percentage}% - {row.trillionBTU} trillion BTU
      </li>
    {/each}
  </ul>
</div>
