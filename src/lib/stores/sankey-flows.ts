/**
 * This module exposes a reactive Sankey diagram that may be used to render to svg..
 */
import { derived, writable } from 'svelte/store';

import * as sankeyService from '$lib/services/sankey-layout';
import { visibleAgencySectorImpacts } from '$lib/stores/agency-sector-impact';
import { getFlowsForLink, linkInFlow } from '$lib/services/spending-impact/spending-impact';

const hoverLinkIndexStore = writable<number | null>(null);
const hoverLinks = derived(
  [visibleAgencySectorImpacts, hoverLinkIndexStore],
  ([agencySectorImpacts, hoverLinkIndex]) => {
    if (hoverLinkIndex === null) {
      return [];
    }
    const hoverLink = agencySectorImpacts[hoverLinkIndex];
    return getFlowsForLink(agencySectorImpacts, hoverLink);
  },
);
export const linkActiveStates = derived(
  [visibleAgencySectorImpacts, hoverLinks],
  ([agencySectorImpacts, hoverLinks]) =>
    agencySectorImpacts.map((link) => linkInFlow(link, hoverLinks)),
);
export const hoverLink = {
  setHover: (index: number) => hoverLinkIndexStore.set(index),
  clear: () => hoverLinkIndexStore.set(null),
};

/**
 * Wrap the D3-created Sankey layout with extra attributes needed to render the SVG.
 */
export const sankeyLayout = derived([visibleAgencySectorImpacts], ([agencySectorImpacts]) => {
  return sankeyService.sankeyLayout(agencySectorImpacts);
});
