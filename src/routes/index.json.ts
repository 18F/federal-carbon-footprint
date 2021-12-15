import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpact } from '$data/transforms/spending-impact';
import * as ctx from './_context';

export const get: RequestHandler = async ({ params }) => {
  const spendingImpact = await getSpendingImpact({ ...ctx, fetch });
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
