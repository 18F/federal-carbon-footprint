<script context="module" lang="ts">
  import { getUrl } from '$context/frontend';

  export const prerender = true;


  /** @type {import('./[slug]').Load} */
  export const load = async ({ params, fetch }) => {
    const sectorSlug = params['slug'];
    const url = getUrl(`/api/v1/sectors/${sectorSlug}.json`);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
 
      return {
        status: 200,
        props: { sectorSlug },
      };
    }
    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  };
</script>

<script lang="ts">
  export let sectorSlug: string;
</script>

<div class="grid-container">
  { sectorSlug }
</div>
