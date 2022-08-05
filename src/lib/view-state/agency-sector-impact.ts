import { derived, writable } from 'svelte/store';

import type { NaicsSectorMap } from '$lib/domain/naics';
import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';

import type { ImpactData } from '$lib/services/spending-impact/spending-impact';

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
    agencyName: '',
    kgCO2Threshold: 100000000,
    sectorDepth: 5,
  });

  const visibleAgencySectorImpacts = derived(
    [impactData, filterOptions],
    ([impactData, filterOptions]) => {
      return getSankeyFlows(impactData.agencySectorImpacts, impactData.naics, filterOptions);
    },
  );

  return {
    init: async ({ data, filter }: { data: ImpactData; filter: Partial<FilterOptions> }) => {
      impactData.set(data);
      filterOptions.update((current) => ({
        ...current,
        ...filter,
      }));
    },
    filterOptions,
    visibleAgencySectorImpacts,
  };
};

export type AgencySectorImpactStore = ReturnType<typeof createAgencySectorImpactStore>;
