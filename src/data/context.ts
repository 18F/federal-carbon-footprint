import path from 'path';
import { fileURLToPath } from 'url';
//import makeFetchHappen from 'make-fetch-happen';
//import nodeFetch from 'node-fetch';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

// Local filesystem path to cache source data files.
export const DATA_DIR = path.join(DIRNAME, '../../../.cache');

// Caching fetch implementation.
// export const fetch = makeFetchHappen.defaults({
//   cachePath: DATA_DIR,
// });

export const fetch: typeof global.fetch = (
  ...args: Parameters<typeof global.fetch>
) => {
  return global.fetch(...args).then((response) => {
    return response;
  });
};
