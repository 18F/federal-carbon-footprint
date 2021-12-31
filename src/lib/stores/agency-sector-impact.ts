import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';
import type { NaicsSectorMap } from '$lib/domain/naics';
import type { number } from 'fp-ts';

type FilterOptions = {
  filterText: string;
  kgCO2Threshold: number;
  sectorDepth: number;
};
export const impactData = writable<{
  agencySectorImpacts: AgencySectorImpacts[];
  naics: NaicsSectorMap;
}>({
  agencySectorImpacts: [],
  naics: {},
});
export const filterOptions = writable<FilterOptions>({
  filterText: '',
  kgCO2Threshold: 1000,
  sectorDepth: 3,
});

export const visibleAgencySectorImpacts = derived(
  [impactData, filterOptions],
  ([impactData, filterOptions]) => {
    return getSankeyFlows(impactData.agencySectorImpacts, impactData.naics, filterOptions);
  },
);
