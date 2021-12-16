import type { RequestHandler } from '@sveltejs/kit';

import { getSpendingImpactByAgency } from '$data/transforms/spending-impact';

import ctx from './_context';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export const get: RequestHandler = async ({ params }) => {
  const body = await getSpendingImpactByAgency(ctx);
  if (body) {
    return {
      body,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getSpendingImpactByAgency>>;
