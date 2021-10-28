<script context="module">
  import { browser, dev } from '$app/env';
  import { base } from '$app/paths';
  export const hydrate = dev;
  export const router = browser;
  export const prerender = true;
</script>

<svelte:head>
  <title>Fuel Type Usage</title>
</svelte:head>

<div class="grid-container">
  <div class="grid-row">
    <div class="grid-col-auto">
      <table class="usa-table usa-table--borderless">
        <caption>
          The data visualized on this site is available for download.
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Download</th>
            <th scope="col">Update frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Total aggregate fuel usage
            </td>
            <td><a href={`${base}/api/v1/fuel-type-usage.json`} target="_blank"><span class="usa-tag bg-primary">JSON</span></a></td>
            <td>Annual</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
