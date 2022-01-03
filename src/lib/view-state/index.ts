import { createAgencySectorImpactStore } from '$lib/view-state/agency-sector-impact';

export const createViewState = () => {
  const agencySectorImpact = createAgencySectorImpactStore();

  return {
    agencySectorImpact,
  };
};
