import { base } from '$app/paths';

import type { FuelTypeUsageSet } from '$lib/data';

export const getFuelUsageData = async () => {
  return fetch(`${base}/api/v1/fuel-type-usage.json`).then((response) =>
    response.json(),
  ) as Promise<FuelTypeUsageSet>;
};
