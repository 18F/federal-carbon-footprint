import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpactByAgency } from '$data/transforms/spending-impact';

import ctx from './_context';

export const get: RequestHandler = async () => {
  const body = await getSpendingImpactByAgency(ctx);
  if (body) {
    return {
      body,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getSpendingImpactByAgency>>;
