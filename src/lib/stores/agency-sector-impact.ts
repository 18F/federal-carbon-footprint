import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';

type FilterOptions = {
  kgCO2Threshold: number;
  filterText: string;
};
export const agencySectorImpacts = writable<AgencySectorImpacts[]>([]);
export const filterOptions = writable<FilterOptions>({
  kgCO2Threshold: 1000,
  filterText: 'defense',
});

export const visibleAgencySectorImpacts = derived(
  [agencySectorImpacts, filterOptions],
  ([agencySectorImpacts, filterOptions]) => {
    return getSankeyFlows(agencySectorImpacts, filterOptions);
  },
);
