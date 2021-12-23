import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsageDataFrame } from '$data/services/fuel-usage';

export const get: RequestHandler = async () => {
  const fuelUsage = await getFuelUsageDataFrame();
  if (fuelUsage) {
    return {
      body: fuelUsage.toCSV(),
    };
  }
};
