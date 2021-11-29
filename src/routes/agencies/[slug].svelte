<script lang="ts">
  export let agencyDetails;
</script>

<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  export const prerender = true;

  export const load = async ({ page, fetch }: LoadInput) => {
    return {
      props: {
        agencyDetails: {
          name: page.params.slug,
          emissionData: {}
        }
      }
    }
  }
</script>

<div class="grid-container">
  <h1>{agencyDetails.name}</h1>
</div>
