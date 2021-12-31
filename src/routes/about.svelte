<script context="module">
  import { env } from '$context/frontend';

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = env.dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = env.browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="grid-container">
  <div class="usa-prose padding-top-3">
    <h1>Visualizing the Federal Carbon Footprint</h1>
    <p>
      Funded by <a href="https://10x.gsa.gov/">10x</a>, this repository is home to the
      <a href="https://trello.com/c/1N9dESH2/162-visualizing-the-federal-carbon-footprint">
        Visualizing the Federal Carbon Footprint
      </a> project.
    </p>
    <p>
      Currently in <a href="https://10x.gsa.gov/process/">phase two (discovery)</a>, we are focused
      on exploring this idea:
    </p>
    <p>
      We have observed that the federal government emits huge amounts of greenhouse gases (GHG)
      every year, including more than 37 million tons from federal facility operations in 2019
      alone. The public lacks a window into how federal agencies are doing their part to reduce the
      effects of climate change. 10x will investigate how user-centered design and savvy data
      analysis could create a clear picture of the government’s efforts to kick its carbon habit,
      resulting in more transparency and accountability and ensuring that we, as civil servants, are
      doing our best to reduce the impact of climate change on our country.
    </p>
  </div>
</div>
