import type { RequestHandler } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';

export const get: RequestHandler = async () => {
  const spendingImpact = await getImpactData();
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
