import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';
import type { NaicsSectorMap } from '$lib/domain/naics';

type FilterOptions = {
  kgCO2Threshold: number;
  filterText: string;
};
export const impactData = writable<{
  agencySectorImpacts: AgencySectorImpacts[];
  naics: NaicsSectorMap;
}>({
  agencySectorImpacts: [],
  naics: {},
});
export const filterOptions = writable<FilterOptions>({
  kgCO2Threshold: 1000,
  filterText: 'defense',
});

export const visibleAgencySectorImpacts = derived(
  [impactData, filterOptions],
  ([impactData, filterOptions]) => {
    return getSankeyFlows(impactData.agencySectorImpacts, impactData.naics, filterOptions);
  },
);
