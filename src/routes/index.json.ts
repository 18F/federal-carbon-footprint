import type { RequestHandler } from '@sveltejs/kit';

import type { SpendingImpactByAgency } from '$lib/services/spending-impact';

import { getSpendingImpactByAgency } from '$context/backend';

export const get: RequestHandler = async () => {
  const body = await getSpendingImpactByAgency();
  if (body) {
    return {
      body,
    };
  }
};

export type Data = SpendingImpactByAgency;
