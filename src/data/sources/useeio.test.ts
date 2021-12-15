import * as useeio from './useeio';

const USEEIO_API_KEY = process.env.VITE_USEEIO_API_KEY;

describe('useeio service integration', () => {
  /*it('getModelSectors returns data', async () => {
    const sectors = await useeio.getModelSectors({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    expect(sectors).not.toBe(null);
  });*/

  it('getGhgImpact returns data', async () => {
    const kgCO2ByNaics = await useeio.getGhgImpactBySectorId({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    expect(kgCO2ByNaics).not.toBe(null);
  });
});
