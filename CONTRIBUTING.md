# Developer Notes

This project is built with [SvelteKit](https://kit.svelte.dev/).

## Project overview

- [src/components](./src/components) - This package includes the Svelte components for the project.
- [src/data](./src/data) - This package includes routines to work with source data.
- [src/lib](./src/lib) - This package contains implementation details used by the frontend.
- [src/routes](./src/routes) - This package includes the http routes for the application. These routes are managed by and organized according to the conventions of the [SvelteKit router](https://kit.svelte.dev/docs#routing).
- [src/styles](./src/styles) - This package includes the Sass styles used in the project, with USWDS theming. See [postcss.config.cjs](./postcss.config.cjs) for details on how these are compiled.

## Developing

Install dependencies:

```bash
npm install
```

Next, start a development server:

```bash
npm run dev

# ... or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To produce a production build:

```bash
npm run build
```

You can also preview the production build locally:

```bash
npm run preview
```

## Using notebooks

Jupyter notebooks are available in the [./notebooks](./notebooks) directory. To use, you must install the Python dependencies and the [tslab](https://github.com/yunabe/tslab) Jupyter kernel.

Install Python dependencies using [Poetry](https://python-poetry.org/):

```bash
poetry install
```

To register the tslab kernel with Jupyter:

```bash
npx tslab install --python=`poetry run which python`

# To confirm that tslab is available, run:
poetry run jupyter kernelspec list
```

Finally, to run a local Jupyter server:

```bash
poetry run jupyter notebook
```
