import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { filterAgencyImpacts, groupAgencyImpactsByThreshold } from '$lib/services/spending-impact';

type FilterOptions = {
  kgCO2Threshold: number;
  filterText: string;
};
export const allAgencySectorImpacts = writable<AgencySectorImpacts[]>([]);
export const filterOptions = writable<FilterOptions>({
  kgCO2Threshold: 1000,
  filterText: 'defense',
});

export const visibleAgencySectorImpacts = derived(
  [allAgencySectorImpacts, filterOptions],
  ([allAgencySectorImpacts, filterOptions]) => {
    return groupAgencyImpactsByThreshold(
      filterAgencyImpacts(allAgencySectorImpacts, filterOptions.filterText),
      filterOptions.kgCO2Threshold,
    );
  },
);
