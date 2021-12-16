import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsage } from '$data/transforms/fuel-usage';

export const get: RequestHandler = async () => {
  const fuelUsage = await getFuelUsage();
  if (fuelUsage) {
    return {
      body: fuelUsage,
    };
  }
};
