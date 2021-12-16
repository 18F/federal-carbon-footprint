import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpact } from '$data/transforms/spending-impact';

import ctx from '../../../_context';

export const get: RequestHandler = async () => {
  const spendingImpact = await getSpendingImpact(ctx);
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
