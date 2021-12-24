import type { RequestHandler } from '@sveltejs/kit';

import { getAgencySectorImpacts } from '$context/backend';

export const get: RequestHandler = async () => {
  const spendingImpact = await getAgencySectorImpacts();
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
