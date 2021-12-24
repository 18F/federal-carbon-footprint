import type { RequestHandler } from '@sveltejs/kit';

import { getAgencySectorImpacts } from '$context/backend';

export const get: RequestHandler = async () => {
  const body = await getAgencySectorImpacts();
  if (body) {
    return {
      body,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getAgencySectorImpacts>>;
