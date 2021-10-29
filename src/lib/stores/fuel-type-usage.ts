import { writable } from 'svelte/store';

import { getFuelUsageData } from '$lib/services';
import type { FuelTypeUsageSet } from '$data';

export const fuelUsageData = writable<FuelTypeUsageSet>([]);

export const initFuelTypeUsageData = () => {
  getFuelUsageData().then((data) => fuelUsageData.set(data));
};