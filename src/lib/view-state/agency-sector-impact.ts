import { derived, writable } from 'svelte/store';

import type { NaicsSectorMap } from '$lib/domain/naics';
import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { getSankeyFlows } from '$lib/services/spending-impact';

import { getUrl } from '$context/frontend';

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
    init: async ({ fetch }: { fetch: typeof window.fetch }) => {
      const response = await fetch(getUrl('/api/v1/spending-impact.json'));
      if (response.ok) {
        impactData.set(await response.json());
      }
      return response.ok;
    },
    filterOptions,
    visibleAgencySectorImpacts,
  };
};

export type AgencySectorImpactStore = ReturnType<typeof createAgencySectorImpactStore>;
