<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import PieChart from '$components/PieChart.svelte';
  import {
    initFuelTypeUsageData,
    fuelUsageData,
  } from '$lib/stores/fuel-type-usage';
  import { getTestData } from '../data/transforms/spending';

  onMount(async () => {
    const ghgImpact = await getTestData();
    console.log(ghgImpact);
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
    <PieChart />
    {#each $fuelUsageData as row}
      <li>
        {row.fuelType}: {row.percentage}% - {row.trillionBTU} trillion BTU
      </li>
    {/each}
  </ul>
</div>
