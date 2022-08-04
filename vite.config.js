import path from 'path';

import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve('./src/components'),
      $context: path.resolve('./src/context'),
      $lib: path.resolve('./src/lib'),
      $routes: path.resolve('./src/routes'),
      $styles: path.resolve('./src/styles'),
    },
  },
};

export default config;
