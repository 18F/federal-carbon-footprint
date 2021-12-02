import * as useeio from './useeio';

const USEEIO_API_KEY = process.env.VITE_USEEIO_API_KEY;

describe('useeio service integration', () => {
  it('getModelSectors works', async () => {
    const sectors = await useeio.getModelSectors({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    expect(sectors).not.toBe(null);
  });
});
