import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsage } from '$data/transformed/fuel-usage';

export const get: RequestHandler = async ({ params }) => {
  const fuelUsage = await getFuelUsage();
  if (fuelUsage) {
    return {
      body: fuelUsage,
    };
  }
};
