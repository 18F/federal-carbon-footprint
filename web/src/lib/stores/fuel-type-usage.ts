import { writable } from 'svelte/store';

import { getFuelUsageData } from '$lib/services';
import type { FuelTypeUsageSet } from '$lib/data';

export const fuelUsageData = writable<FuelTypeUsageSet>([]);

export const initFuelTypeUsageData = () => {
  console.log('loading...');
  getFuelUsageData().then((data) => fuelUsageData.set(data));
};
