import { getSectorUrl } from '$context/frontend';
import type { SectorSummary } from '$lib/domain/naics';
import { writable } from 'svelte/store';

export const createSectorSummaryStore = () => {
  const sectorSummary = writable<SectorSummary>(null);
  return {
    init: ({ data }: { data: SectorSummary }) => {
      data.breadcrumbs = formatBreadcrumbs(data.sectorHierarchy);

      sectorSummary.set(data);
    },
    sectorSummary,
  };
};

const formatBreadcrumbs = (sectorHierarchy: {
  code: string;
  description: string;
  parentCode: string;
}[]) => {
  return sectorHierarchy.reverse().map(item => {
    const link = getSectorUrl(item.code);
    return {
      label: item.description,
      link
    };
  });
}

export type SectorSummaryStore = ReturnType<typeof createSectorSummaryStore>;
