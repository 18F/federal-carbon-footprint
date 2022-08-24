import { error } from '@sveltejs/kit';

import { getSectorSummary } from '$context/backend';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const result = await getSectorSummary(params.sectorCode);
  if (result.ok == false) {
    throw error(500, result.error.message);
  }
  return new Response(JSON.stringify(result.value), { status: 200 });
};
