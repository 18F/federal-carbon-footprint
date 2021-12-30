import type { RequestHandler } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';

export const get: RequestHandler = async () => {
  const body = await getImpactData();
  if (body) {
    return {
      body,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getImpactData>>;
