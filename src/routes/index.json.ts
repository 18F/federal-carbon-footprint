import type { RequestHandler } from '@sveltejs/kit';

import type { SpendingImpactByAgency } from '$data/services/spending-impact';

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
