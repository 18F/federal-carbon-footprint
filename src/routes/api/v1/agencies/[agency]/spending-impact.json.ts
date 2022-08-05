import type { RequestHandler } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';

export const GET: RequestHandler = async ({ params }) => {
  const result = await getImpactData(params['agency']);
  if (result.ok) {
    return {
      body: result.value,
    };
  }
};

export type Data = Awaited<ReturnType<typeof getImpactData>>;
