import { error } from '@sveltejs/kit';

import { getUrl } from '$context/frontend';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const sectorCode = params['sectorCode'];
  const url = getUrl(`/api/v1/sectors/${sectorCode}/`);
  const response = await fetch(url);
  if (response.ok) {
    const sectorSummary = await response.json();
    return {
      sectorSummary,
    };
  }
  throw error(404, `Could not load data`);
};
