import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsage } from '$data/transformed/fuel-usage';

export const get: RequestHandler = async ({ params }) => {
  const dummy = await getFuelUsage();
  if (dummy) {
    return {
      body: dummy,
    };
  }
};
