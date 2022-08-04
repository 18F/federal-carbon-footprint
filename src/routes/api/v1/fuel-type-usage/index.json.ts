import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsage } from '$lib/services/fuel-usage';

export const GET: RequestHandler = async () => {
  const fuelUsage = await getFuelUsage();
  if (fuelUsage) {
    return {
      body: fuelUsage,
    };
  }
};
