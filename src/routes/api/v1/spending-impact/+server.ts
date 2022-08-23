import { error } from '@sveltejs/kit';

import { getImpactData } from '$context/backend';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const result = await getImpactData();
  if (result.ok == false) {
    throw error(500, result.error.message);
  }
  return new Response(JSON.stringify(result.value), { status: 200 });
};
