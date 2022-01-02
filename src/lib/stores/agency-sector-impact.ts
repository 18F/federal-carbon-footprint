import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';
import type { NaicsSectorMap } from '$lib/domain/naics';

type FilterOptions = {
  agencyName: string;
  kgCO2Threshold: number;
  sectorDepth: number;
};

export const createAgencySectorImpactStore = () => {
  const impactData = writable<{
    agencySectorImpacts: AgencySectorImpacts[];
    naics: NaicsSectorMap;
  }>({
    agencySectorImpacts: [],
    naics: {},
  });
  const filterOptions = writable<FilterOptions>({
    agencyName: 'treasury',
    kgCO2Threshold: 0,
    sectorDepth: 5,
  });

  const visibleAgencySectorImpacts = derived(
    [impactData, filterOptions],
    ([impactData, filterOptions]) => {
      return getSankeyFlows(impactData.agencySectorImpacts, impactData.naics, filterOptions);
    },
  );

  return {
    filterOptions,
    impactData,
    visibleAgencySectorImpacts,
  };
};

export type AgencySectorImpactStore = ReturnType<typeof createAgencySectorImpactStore>;
