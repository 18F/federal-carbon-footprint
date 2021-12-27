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
  width: 1300,
  height: 2000,
  marginTop: 5,
  marginRight: 1,
  marginBottom: 5,
  marginLeft: 1,
  nodeLabelPadding: 6,
  linkStrokeOpacity: 0.5,
};

/**
 * Using the D3 constructor, create a Sankey layout.
 * @param links
 * @returns
 */
const createD3SankeyLayout = (links: SLink[]) => {
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

const linkHorizontal = d3Sankey.sankeyLinkHorizontal();
const format = d3.format(',');

/**
 * Wrap the D3-created Sankey layout with extra attributes needed to render the SVG.
 */
export const sankeyLayout = derived([visibleAgencySectorImpacts], ([agencySectorImpacts]) => {
  const layout =
    agencySectorImpacts.length > 0
      ? createD3SankeyLayout(agencySectorImpacts)
      : { nodes: [], links: [] };

  const colorForNodeId = d3.scaleOrdinal(
    d3.map(layout.nodes, (n) => n.id),
    d3.schemeTableau10,
  );
  return {
    nodes: d3.map(layout.nodes, (node) => {
      return {
        ...node,
        color: colorForNodeId(node.id),
        title: `${node.id}\n${format(node.value)}`,
      };
    }),
    links: d3.map(layout.links, (link) => {
      return {
        ...link,
        colors: {
          start: colorForNodeId(castSankeyNode(link.source).id),
          end: colorForNodeId(castSankeyNode(link.target).id),
        },
        linkHorizontal: linkHorizontal(link),
        title: `${castSankeyNode(link.source).id} → ${castSankeyNode(link.target).id}\n${format(
          link.value,
        )} kg CO2 equivalent`,
      };
    }),
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
