import type { RequestHandler } from '@sveltejs/kit';

import ctx from '$context/backend';

export const get: RequestHandler = async () => {
  const spendingImpact = await ctx.getSpendingImpactByAgency();
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
