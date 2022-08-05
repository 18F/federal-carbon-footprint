import type { RequestHandler } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';

export const GET: RequestHandler = async ({ params }) => {
  const body = await getImpactData(params['agency']);
  if (body) {
    return {
      body,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getImpactData>>;
