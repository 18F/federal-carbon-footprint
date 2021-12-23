import * as useeio from './useeio';

describe('useeio', () => {
  it('getGhgImpactBySectorId', async () => {
    /*const sectors = await useeio.getGhgImpactBySectorId({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });*/
    expect(useeio.GetGhgImpactBySectorId).not.toBe(null);
  });
});
