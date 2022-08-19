<script lang="ts">
  import { getAgencyUrl } from '$context/frontend';
  import type { SectorSummaryStore } from '$lib/view-state/sector-summary';
  import Breadcrumb from './Breadcrumb.svelte';

  export let sectorSummary: SectorSummaryStore['sectorSummary'];
</script>

<div>
  <Breadcrumb breadcrumbs={$sectorSummary.breadcrumbs} />

  <h1>{$sectorSummary.description}</h1>
  <table class="usa-table usa-table--borderless">
    <thead>
      <th scope="col">Agency Name</th>
      <th scope="col">kg CO<sup>2</sup></th>
    </thead>
    <tbody>      
      {#each $sectorSummary.agencyImpactBySector as impactForAgency}
        <tr>
          <td>
            <a href={getAgencyUrl(impactForAgency.name)}>{impactForAgency.name}</a>
          </td>
          <td>{impactForAgency.sector.kgC02Eq}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
