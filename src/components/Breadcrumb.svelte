<script lang="ts">
  export let breadcrumbs: { label: string; link: string; }[];
</script>

<nav class="usa-breadcrumb" aria-label="Sector hierarchy breadcrumbs">
  <ol class="usa-breadcrumb__list">
    {#each breadcrumbs as breadcrumb}
      <li class="usa-breadcrumb__list-item">
        <a href={breadcrumb.link} class="usa-breadcrumb__link"><span>{breadcrumb.label}</span></a>
      </li>
    {/each}
  </ol>
</nav>
