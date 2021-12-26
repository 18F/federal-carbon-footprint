/**
 * This module exposes all reactive state necessary to render a Sankey diagram to svg.
 */
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

import { visibleAgencySectorImpacts } from '$lib/stores/agency-sector-impact';
import { derived } from 'svelte/store';

interface NodeExtra {
  id: string;
}
interface LinkExtra {
  source: string;
  target: string;
  value: number;
}

type SNode = d3Sankey.SankeyNode<NodeExtra, LinkExtra>;
type SLink = d3Sankey.SankeyLink<NodeExtra, LinkExtra>;
interface DAG {
  nodes: SNode[];
  links: SLink[];
}

export const SIZING = {
  width: 800,
  height: 2000,
  marginTop: 5,
  marginRight: 1,
  marginBottom: 5,
  marginLeft: 1,
};

const createSankeyLayout = (links: SLink[]) => {
  let sankeyLayout: d3Sankey.SankeyLayout<DAG, NodeExtra, LinkExtra> = d3Sankey.sankey<
    DAG,
    NodeExtra,
    LinkExtra
  >();

  const linkSources = d3.map(links, ({ source }) => source);
  const linkTargets = d3.map(links, ({ target }) => target);
  let nodes: NodeExtra[] = Array.from(d3.union(linkSources, linkTargets), (id) => ({ id }));

  sankeyLayout
    .nodeId((node) => node.id)
    .nodeAlign(d3Sankey.sankeyJustify)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([
      [SIZING.marginLeft, SIZING.marginTop],
      [SIZING.width - SIZING.marginRight, SIZING.height - SIZING.marginBottom],
    ]);
  return sankeyLayout({ nodes, links });
};

export const sankeyLayout = derived([visibleAgencySectorImpacts], ([agencySectorImpacts]) => {
  const layout = createSankeyLayout(agencySectorImpacts);
  const nodeGroups = d3.map(layout.nodes, (n) => n.id);
  const format = d3.format(',');
  return {
    layout,
    nodeIds: layout.nodes.map((n) => n.id),
    linkHorizontal: d3Sankey.sankeyLinkHorizontal(),
    format,
    nodeGroups,
    color: d3.scaleOrdinal(nodeGroups, d3.schemeTableau10),
    nodeTitles: d3.map(layout.nodes, (d) => `${d.id}\n${format(d.value)}`),
    linkTitles: d3.map(layout.links, (d) => `${d.source} → ${d.target}\n${format(d.value)}`),
    nodeLabelPadding: 6,
    linkStrokeOpacity: 0.5,
    linkColor: 'source-target',
  };
});

// The Typescript type of link nodes is:
//  `string & (string | number | d3Sankey.SankeyNode<NodeExtra, LinkExtra>`
// This comes from the source and target types in `LinkExtra`, which are
// set as string IDs for convenience. This casts to the node
// type in a manner that can be used inside the Svelte markup.
export const castSankeyNode = (node: unknown) => {
  return node as d3Sankey.SankeyNode<NodeExtra, LinkExtra>;
};
