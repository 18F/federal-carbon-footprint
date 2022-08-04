<script context="module">
  import { env, getUrl } from '$context/frontend';

  export const hydrate = env.dev;
  export const router = env.browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>API endpoints</title>
</svelte:head>

<div class="grid-container">
  <div class="grid-row">
    <div class="grid-col-auto">
      <table class="usa-table usa-table--borderless">
        <caption>
          The data visualized on this site is available for download. <em>These links are samples to demonstrate the concept, but do not reflect the actual data used on this prototype.</em>
        </caption>
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Download</th>
            <th scope="col">Update frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spending impact by agency</td>
            <td>
              <a href={getUrl('/api/v1/spending-impact.json')} target="_blank"
                ><span class="usa-tag bg-primary">JSON</span></a
              >
            </td>
            <td>Annual</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
