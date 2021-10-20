# 2. Prototyping strategy

Date: 2021-10-20

## Status

Accepted

## Context

In order to incrementally prototype while conducting research, a strategy for how to explore available datasets and rapidly test new features is required. In the interest of producing a functional prototype that may be the basis for future work, the general design strategy should be flexible. Additionally, the prototyping work should be of value to those who are interested in understanding how to visualize federal carbon emissions themselves.

There are four key components of the prototype:

- Data extraction: Acquire data from public federal government sources
- Data analysis: Analyze data for exploratory and/or documentary purposes
- Data transformation: Transform data into a format to be used for visualization
- Data visualization: Display collected data in a user-friendly manner

## Decision

### Data extraction

Due to the diversity of Python-based data analytical tooling, data extraction will be handled by a Python package. The responsibilities of the package include:

- Acquiring data from sources, when possible. When data is not available via the public internet, manual accomodations will be made.
- Storing the data in a format suitable for analysis and transformation.
- Providing a Python interface for accessing the data.

### Data analysis

Jupyter notebooks will be utilized as a method of exploring and analyzing the aquired raw data. The notebooks will serve as documentation of the data sources that were explored, and as functional examples for other users.

### Data transformation

In the interest of providing precise data to the visualization tool, the source data will be transformed at build time to an appropriate transformed dataset. The format of the transformed dataset will be written to the filesystem as JSON files. The JSON files will be structured so as to be efficient for use by the visualization tool.

Options will be maintained as to choice of Python library for individual data transformations. The Python package will be responsible for exposing an interface to produce the transformed dataset, as well as a command-line interface to be used as part of a build process.

### Data visualizations

The project will start with a React-based single-paged application. Options will be maintained with regard to method of visualization, including potential use of a view layer other than React.

Visualizations will be rendered client-side, but options will be maintained to allow for pre-rendering at build-time as well as server-side rendering.

Client-side rendering will acquire the raw data required for visualization via the JSON files produced by the data transformation step.

## Consequences

- Data processing will be handled by the best-available Python package
- Separation of concerns and Jupyter notebook usage will serve documentary use-cases.
- Web-based visualizations will be performant, with raw data served via CDN
- Post-discovery, prototype may be extended incrementally without significant design changes
