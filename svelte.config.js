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
    trailingSlash: 'always',
    prerender: {
      crawl: true,
      enabled: true,
      onError: 'continue',
      default: true,
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
    }),
    paths: {
      base: process.env.BASEURL || '',
      //assets: process.env.BASEURL || '',
    },
  },
};

export default config;
