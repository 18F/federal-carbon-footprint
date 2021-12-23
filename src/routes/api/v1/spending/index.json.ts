import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpactByAgency } from '$context/backend';

export const get: RequestHandler = async () => {
  const spendingImpact = await getSpendingImpactByAgency();
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
