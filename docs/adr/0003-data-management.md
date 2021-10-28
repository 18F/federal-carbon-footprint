# 2. Data management

Created: 2021-10-27

## Status

Proposed

## Context

A strategy for managing source data is required. General goals of data management are:

- Data extraction: Acquire data from public federal government sources
- Data analysis: Analyze data for exploratory and/or documentary purposes
- Data transformation: Transform data into a format to be used for visualization

## Considerations

Due to the diversity of Python-based data analytical tooling, integrating flexible Python-based tooling would be advantageous, at the modest cost of a bit extra complexity on the project's codebase.

The web codebase needs easy access to the underlying data, so it may include JSON (and perhaps CSV, TSV, etc) versions in its static-compiled, CDN-deployable build. In the interest of removing mismatches between the frontend expectations and the data management ones, producing JSON and other formats with the same Typescript typings used by the frontend would be helpful.

node.js also has a Pandas-like dataframe libraries. If data processing and exploration is limited to something that can easily be managed with dataframes, usage of such a library would simplify the codebase by removing Python usage and the need for Python/Typescript data sharing.

## Decision

Data extraction, analysis, and transformation will be preferably performed via Typescript.

### Data extraction

A Typescript interface will be provided for accessing the underlying raw data.

The data extraction package will acquire raw data from public sources, when possible. When data is not available via the public internet, manual accomodations will be made.

The data extraction module will store local copies of source data in format suitable to analysis and transformation. A lazy-loaded, cachable approach to data storage will be utilized for each data source.

### Data analysis

Jupyter notebooks will be utilized as a method of exploring and analyzing the aquired raw data. The notebooks will serve as documentation of the data sources that were explored, and as functional examples for other users.

A dataframe library will be utilized for any exploration or aggregate calculations, if necessary.

### Data transformation

In the interest of providing precise data to the visualization tool, the source data will be transformed at build time to an appropriate transformed dataset. The transformed dataset will be servable via CDN as JSON (or other formatted) files. The JSON files will be structured so as to be efficient for use by the visualization tool.

The Typescript data transformation package will be responsible for exposing an interface to produce the transformed dataset, as well as a hook to the build system. Consistent with the usage of SvelteKit, as described in [ADR 0002](./0002-prototyping-strategy.md), the hook will be an API route served under `/api/v1` and linked to via an API index page.

## Consequences

Maintainability of data processes will be served by each step of the data handling pipeline being implemented as simple Typescript functions.

Optionality will be maintained to handle more complex processes in an alternate manner at a later point, if necessary.

Documentary use-cases will be served by Juypter notebook usage.

Data reuse use-cases will be served by providing indexed links to the frontend's source data.
