import { describe, expect, it } from 'vitest';

import { GetUseeioGhgImpactBySectorId } from '.';

describe('useeio api calls', () => {
  it('GetUseeioGhgImpactBySectorId', async () => {
    /*const sectors = await useeio.getGhgImpactBySectorId({
      fetch,
      USEEIO_API_KEY,
    });*/
    expect(GetUseeioGhgImpactBySectorId).not.toBe(null);
  });
});
