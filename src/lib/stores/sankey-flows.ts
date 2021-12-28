/**
 * This module exposes a reactive Sankey diagram that may be used to render to svg..
 */
import * as sankeyService from '$lib/services/sankey-layout';
import { visibleAgencySectorImpacts } from '$lib/stores/agency-sector-impact';
import { derived } from 'svelte/store';

/**
 * Wrap the D3-created Sankey layout with extra attributes needed to render the SVG.
 */
export const sankeyLayout = derived([visibleAgencySectorImpacts], ([agencySectorImpacts]) => {
  return sankeyService.sankeyLayout(agencySectorImpacts);
});
