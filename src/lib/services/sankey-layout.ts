/**
 * This module exposes a constuctor that can render a Sankey diagram to svg.
 */
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

import type { AgenctSectorImpactLink } from './spending-impact';
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

const SIZING = {
  width: 1300,
  height: 2000,
  margin: {
    top: 5,
    right: 1,
    bottom: 5,
    left: 1,
  },
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
      [SIZING.margin.left, SIZING.margin.top],
      [SIZING.width - SIZING.margin.right, SIZING.height - SIZING.margin.bottom],
    ]);
  return sankeyLayout({ nodes, links });
};

const linkHorizontal = d3Sankey.sankeyLinkHorizontal();
const format = d3.format(',');

// The Typescript type of link nodes is:
//  `string & (string | number | d3Sankey.SankeyNode<NodeExtra, LinkExtra>`
// This comes from the source and target types in `LinkExtra`, which are
// set as string IDs for convenience. This casts to the node
// type in a manner that can be used inside the Svelte markup.
const castSankeyNode = (node: unknown) => {
  return node as d3Sankey.SankeyNode<NodeExtra, LinkExtra>;
};

/**
 * Wrap the D3-created Sankey layout with extra attributes needed to render the SVG.
 */
export const sankeyLayout = (agencySectorImpactLinks: AgenctSectorImpactLink[]) => {
  const layout =
    agencySectorImpactLinks.length > 0
      ? createD3SankeyLayout(agencySectorImpactLinks)
      : { nodes: [], links: [] };

  const colorForNodeId = d3.scaleOrdinal(
    d3.map(layout.nodes, (n) => n.id),
    d3.schemeTableau10,
  );
  return {
    svg: {
      width: SIZING.width,
      height: SIZING.height,
      viewBox: `0 0 ${SIZING.width}, ${SIZING.height}`,
    },
    nodes: d3.map(layout.nodes, (node) => {
      return {
        label: {
          x:
            node.x0 < SIZING.width / 2
              ? node.x1 + SIZING.nodeLabelPadding
              : node.x0 - SIZING.nodeLabelPadding,
          y: (node.y1 + node.y0) / 2,
          dy: '0.35em',
          text: `${node.id}\n${format(node.value)}`,
          textAnchor: node.x0 < SIZING.width / 2 ? 'start' : 'end',
        },
        rect: {
          x: node.x0,
          y: node.y0,
          height: node.y1 - node.y0,
          width: node.x1 - node.x0,
          fill: colorForNodeId(node.id),
          title: `${node.id}\n${format(node.value)}`,
        },
      };
    }),
    linkStrokeOpacity: SIZING.linkStrokeOpacity,
    links: d3.map(layout.links, (link, index) => {
      return {
        gradient: {
          id: `link-${link.index}`,
          start: {
            x: castSankeyNode(link.source).x1,
            color: colorForNodeId(castSankeyNode(link.source).id),
          },
          end: {
            x: castSankeyNode(link.target).x0,
            color: colorForNodeId(castSankeyNode(link.target).id),
          },
        },
        path: {
          d: linkHorizontal(link),
          stroke: `url(#link-${index})`,
          strokeWidth: Math.max(1, link.width),
        },
        title: `${castSankeyNode(link.source).id} → ${castSankeyNode(link.target).id}\n${format(
          link.value,
        )} kg CO2 equivalent`,
      };
    }),
  };
};
