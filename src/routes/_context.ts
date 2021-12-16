import makeFetchHappen from 'make-fetch-happen';

export default {
  fetch: makeFetchHappen.defaults({
    cachePath: './fetch-cache',
  }) as unknown as typeof global.fetch,
  USEEIO_API_KEY: import.meta.env.VITE_USEEIO_API_KEY.toString(),
};
