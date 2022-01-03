import { createAgencySectorImpactStore } from '$lib/view-state/stores/agency-sector-impact';

export const createViewState = () => {
  const agencySectorImpact = createAgencySectorImpactStore();

  return {
    agencySectorImpact,
  };
};
