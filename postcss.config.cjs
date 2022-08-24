const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
  plugins: [
    postcssImport,
    postcssUrl({
      copy: {
        useHash: true,
      },
    }),
    autoprefixer(),
    !dev &&
      purgecss({
        content: ['src/**/*.svelte', 'src/app.html'],
        safelist: ['body', 'svelte-announcer'],
        keyframes: true,
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        },
        // rejected: true,
      }),
    !dev &&
      cssnano({
        preset: 'default',
      }),
  ],
};

module.exports = config;
