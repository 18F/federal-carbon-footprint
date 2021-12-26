import { derived, writable } from 'svelte/store';

import type { AgencySectorImpacts } from '$lib/services/spending-impact';
import { filterAgencyImpacts, groupAgencyImpactsByThreshold } from '$lib/services/spending-impact';

type StoreData = {
  allAgencySectorImpacts: AgencySectorImpacts[];
  filterOptions: {
    kgCO2Threshold: number;
    filterText: string;
  };
};

const store = writable<StoreData>({
  allAgencySectorImpacts: [],
  filterOptions: {
    kgCO2Threshold: 1000,
    filterText: '',
  },
});

export const setAllAgencySectorImpacts = (allAgencySectorImpacts: AgencySectorImpacts[]) => {
  store.update((existing) => {
    return {
      ...existing,
      allAgencySectorImpacts,
    };
  });
};

export const visibleAgencySectorImpacts = derived([store], ([current]) => {
  return groupAgencyImpactsByThreshold(
    filterAgencyImpacts(current.allAgencySectorImpacts, current.filterOptions.filterText),
    current.filterOptions.kgCO2Threshold,
  );
});

export const setFilterText = (filterText: string) => {
  store.update((existing) => {
    return {
      ...existing,
      filterOptions: {
        ...existing.filterOptions,
        filterText,
      },
    };
  });
};
