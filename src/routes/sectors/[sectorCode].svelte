<script context="module" lang="ts">
  import { getUrl } from '$context/frontend';

  export const prerender = true;


  /** @type {import('./[sectorCode]').Load} */
  export const load = async ({ params, fetch }) => {
    const sectorCode = params['sectorCode'];
    const url = getUrl(`/api/v1/sectors/${sectorCode}.json`);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
 
      return {
        status: 200,
        props: { sectorSummary: data },
      };
    }
    return {
      status: 404,
      error: new Error(`Could not load data`),
    };
  };
</script>

<script lang="ts">
  export let sectorSummary: string;
</script>

<div class="grid-container">
  { sectorSummary }
</div>
