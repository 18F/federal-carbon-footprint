import type { RequestHandler } from '@sveltejs/kit';

import type { SpendingImpactByAgency } from '$data/services/spending-impact';

import ctx from './_context';

export const get: RequestHandler = async () => {
  const body = await ctx.getSpendingImpactByAgency();
  if (body) {
    return {
      body,
    };
  }
};

export type Data = SpendingImpactByAgency;
