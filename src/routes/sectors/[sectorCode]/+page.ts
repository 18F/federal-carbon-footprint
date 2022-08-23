import { getUrl } from '$context/frontend';
import { createSectorSummaryStore } from '$lib/view-state/sector-summary';
import type { PageLoad } from './$types';

const sectorSummaryStore = createSectorSummaryStore();

export const load: PageLoad = async ({ params, fetch }) => {
  const sectorCode = params['sectorCode'];
  const url = getUrl(`/api/v1/sectors/${sectorCode}/`);
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    sectorSummaryStore.init({ data });
    return sectorSummaryStore;
  }
  return sectorSummaryStore;
};
