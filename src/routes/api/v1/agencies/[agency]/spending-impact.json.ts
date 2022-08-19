import type { RequestHandler } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';
import type { ImpactData } from '$lib/services/spending-impact/spending-impact';

export const GET: RequestHandler = async ({ params }) => {
  const result = await getImpactData(params['agency']);
  if (result.ok) {
    return {
      body: result.value,
    };
  }
};

export type Data = ImpactData;
