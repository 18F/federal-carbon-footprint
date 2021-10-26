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
    paths: {
      base: process.env.BASEURL || '',
      //assets: process.env.BASEURL || '',
    },

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#app',
  },
  vite: {
    assetsInclude: [
      './node_modules/uswds/dist/img',
      './node_modules/uswds/dist/fonts',
    ],
  },
};

export default config;
