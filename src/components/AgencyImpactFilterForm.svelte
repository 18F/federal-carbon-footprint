<script lang="ts">
  import type { AgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';
  import spriteImg from '../../node_modules/uswds/src/img/sprite.svg';

  export let filterOptions: AgencySectorImpactStore['filterOptions'];

  const onSubmit = (e: Event) => {
    console.log(e.target);
  };
</script>

<form class="usa-form padding-top-1" on:submit|preventDefault={onSubmit}>
  <fieldset class="usa-fieldset">
    <legend class="usa-legend text-base font-sans-md">Filter agency name</legend>
    <div class="usa-search usa-search--small margin-top-1" role="search">
      <div class="usa-input-group">
        <div class="usa-input-prefix" aria-hidden="true">
          <svg aria-hidden="true" role="img" focusable="false" class="usa-icon"
            ><use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href={`${spriteImg}#search`}
            /></svg
          >
        </div>
        <input
          id="search-field"
          type="search"
          class="usa-input"
          autocomplete="off"
          placeholder="Search text..."
          bind:value={$filterOptions.agencyName}
        />
      </div>
    </div>
    <legend class="usa-legend text-base font-sans-md">Minimum kg CO<sup>2</sup> per-sector</legend>
    <div class="usa-input-group">
      <input
        class="usa-input"
        id="kg-co2-threshold"
        name="kg-co2-threshold"
        type="number"
        bind:value={$filterOptions.kgCO2Threshold}
      />
    </div>
    <legend class="usa-legend text-base font-sans-md">Sector depth</legend>
    <div class="usa-input-group">
      <input
        class="usa-input"
        id="sector-depth"
        name="sector-depth"
        type="number"
        bind:value={$filterOptions.sectorDepth}
      />
    </div>
  </fieldset>
</form>
