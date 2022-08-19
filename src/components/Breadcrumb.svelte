<script lang="ts">
  export let breadcrumbs: string[];
</script>

<nav class="usa-breadcrumb" aria-label="Breadcrumbs,,">
  <ol class="usa-breadcrumb__list">
    {#each breadcrumbs as breadcrumb}
      <li class="usa-breadcrumb__list-item">
        <a href="" class="usa-breadcrumb__link"><span>{breadcrumb}</span></a>
      </li>
    {/each}
  </ol>
</nav>
