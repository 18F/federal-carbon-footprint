import { createAgencySectorImpactStore } from '$lib/view-state/stores/agency-sector-impact';
import { createSankeyFlowsStore } from '$lib/view-state/stores/sankey-flows';

export const createViewState = () => {
  const agencySectorImpact = createAgencySectorImpactStore();
  const sankeyFlows = createSankeyFlowsStore(agencySectorImpact.visibleAgencySectorImpacts);

  return {
    agencySectorImpact,
    sankeyFlows,
  };
};
