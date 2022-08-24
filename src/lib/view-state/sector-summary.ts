import type { SectorSummary } from '$lib/domain/naics';
import { writable } from 'svelte/store';

export const createSectorSummaryStore = () => {
  const sectorSummary = writable<SectorSummary>(null);
  return {
    init: ({ data }: { data: SectorSummary }) => {
      sectorSummary.set(data);
    },
    sectorSummary,
  };
};

export type SectorSummaryStore = ReturnType<typeof createSectorSummaryStore>;
