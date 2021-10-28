import type { RequestHandler } from '@sveltejs/kit';

import { getFuelUsageDataFrame } from '$data/transforms/fuel-usage';

export const get: RequestHandler = async ({ params }) => {
  const fuelUsage = await getFuelUsageDataFrame();
  if (fuelUsage) {
    return {
      body: fuelUsage.toCSV(),
    };
  }
};
