import { error } from '@sveltejs/kit';

import { getUrl } from '$context/frontend';
import type { PageLoad } from './$types';
import type { ImpactData } from '$lib/services/spending-impact/spending-impact';

export const load: PageLoad = async ({ fetch }) => {
  const url = getUrl(`/api/v1/spending-impact/`);
  const response = await fetch(url);
  if (response.ok) {
    const spendingImpact = (await response.json()) as ImpactData;
    return {
      spendingImpact,
    };
  }
  throw error(500, response.statusText);
};
