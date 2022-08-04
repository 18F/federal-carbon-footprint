import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsageDataFrame } from '$lib/services/fuel-usage';

export const GET: RequestHandler = async () => {
  const fuelUsage = await getFuelUsageDataFrame();
  if (fuelUsage) {
    return {
      body: fuelUsage.toCSV(),
    };
  }
};
