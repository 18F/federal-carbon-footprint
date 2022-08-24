import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import sass from 'sass';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      scss: {
        renderSync: true, // faster with dart-sass
        implementation: sass,
        includePaths: ['./src/styles'],
      },
    }),
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
    }),
    browser: {
      hydrate: true,
      router: true,
    },
    outDir: '.svelte-kit',

    paths: {
      //assets: process.env.BASEURL || '',
      base: process.env.BASEURL || '',
    },
    prerender: {
      /*
      crawl: true,
      enabled: true,
      onError: 'continue',
      default: true,
      */
      concurrency: 1,
      crawl: true,
      default: true,
      enabled: true,
      entries: ['*'],
      onError: 'fail',
      origin: 'http://sveltekit-prerender',
    },
    paths: {
      base: process.env.BASEURL || '',
      //assets: process.env.BASEURL || '',
    },
    trailingSlash: 'always',
    version: {
      name: Date.now().toString(),
      pollInterval: 0,
    },
  },
};

export default config;
