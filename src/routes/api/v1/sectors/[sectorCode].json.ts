import type { RequestHandler } from '@sveltejs/kit';
import { getSectorSummary } from '$context/backend';

export const GET: RequestHandler = async ({ params }) => {
  const result = await getSectorSummary(params.sectorCode);
  if(result.ok) {
    return {
      body: { data: result.value },
    };
  }
};
