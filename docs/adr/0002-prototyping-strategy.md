# 2. Prototyping strategy - frontend

Created: 2021-10-20
Updated: 2021-10-27

## Status

Accepted

## Context

In order to incrementally prototype while conducting research, a strategy for how to explore available datasets and rapidly test new features is required. In the interest of producing a functional prototype that may be the basis for future work, the general design strategy should be flexible. Additionally, the prototyping work should be of value to those who are interested in understanding how to visualize federal carbon emissions themselves.

## Decision

### View layer
https://www.nytimes.com/interactive/2021/us/dane-wisconsin-covid-cases.html
The project will start with a SvelteKit-managed frontend codebase. For this project, the primary benefits of Svelte with SvelteKit are:

- SvelteKit's [static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) will render a complete static bundle for its routes, with minimal configuration.
- Svelte produces highly optimized Javascript with less weight than other alternatives, improving initial time to render.
- Svelte includes animation routines that will be useful for visualizations.

To minimize the initial time to render, visualizations will be rendered at build-time to the extent possible. Where dynamic visualizations are required, client-side rendering will be utilized.

### Visualizations

[D3.js](https://d3js.org/) will be used to create visualizations. However, unlike traditional D3 usage, this project will use Svelte-managed DOM manipulation and data-binding rather than the [d3-selection](https://www.npmjs.com/package/d3-selection) package.

This approach saves about 12kb of minimized Javascript from the application bundle, and testing has shown it renders client-side noticeably faster, when compared side-by-side on the same page, to the traditional d3 approach. Options are maintained to use `d3-selection` if this approach proves deficient in any notable way.

### Data access

Both client-side and build-time rendering will acquire the raw data required for visualization by the data transformation step(s) outlined in [ADR 2003](./0003-data-management.md). Build-time rendered views will directly call the appropriate routines, while client-side rendered views will retrieve pre-built JSON files deployed to CDN.

The frontend will provide a browsable UI with links to the JSON urls (and, optionally, CSV or other formats). [analytics.usa.gov](https://analytics.usa.gov/data/) provides a good example of such an approach.

## Source references

All data visualizations will display inline links to the underlying source data. The source data links may point to the project's Github repository, where the data source is documented, or to another .gov page where the data source is described.

## Consequences

- Pre-rendering of static SVG will be possible.
- No server backend is required to host visualization - both raw data and pre-rendered html will be served via CDN.
- Bundle sizes will be minimal.
- D3's extensive collection of community examples may be leveraged for visualization inspiration.
- Data reuse is facilitated with a documented API and source references.
