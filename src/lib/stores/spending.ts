import { writable } from 'svelte/store';

import { getSpendingImpact } from '$data/transforms/spending';

export const spendingImpact = writable<any>([]);

export const initFuelTypeUsageData = (ctx) => {
  getSpendingImpact(ctx).then((data) => spendingImpact.set(data));
};
