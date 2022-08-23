import { error } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';
import type { ImpactData } from '$lib/services/spending-impact/spending-impact';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const result = await getImpactData(params['agency']);
  if (result.ok == false) {
    throw error(500, result.error.message);
  }
  return new Response(JSON.stringify(result.value), { status: 200 });
};

export type Data = ImpactData;
