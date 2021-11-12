import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpact } from '$data/transforms/spending';

export const get: RequestHandler = async ({ params }) => {
  const spendingImpact = await getSpendingImpact();
  if (spendingImpact) {
    return {
      body: spendingImpact,
    };
  }
};
