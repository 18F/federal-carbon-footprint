/**
 * This module exposes a constuctor that can render a Sankey diagram to svg.
 */
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

import { getUrl } from '$context/frontend';
import type { AgencySectorImpactLink } from '$lib/services/spending-impact';

interface NodeData {
  id: string;
  url: string;
}

type SankeyNode = d3Sankey.SankeyNode<NodeData, AgencySectorImpactLink>;
type SankeyLink = d3Sankey.SankeyLink<NodeData, AgencySectorImpactLink>;
interface DAG {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const SIZING = {
  width: 1300,
  height: 1000,
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
const createD3SankeyLayout = (links: SankeyLink[]) => {
  let sankeyLayout = d3Sankey.sankey<DAG, NodeData, AgencySectorImpactLink>();

  const linkSources = d3.map(links, ({ source }) => source);
  const linkTargets = d3.map(links, ({ target }) => target);
  let nodes: NodeData[] = Array.from(d3.union(linkSources, linkTargets), (id) => ({
    id,
    url: getUrl(`/agencies/${id as string}/`),
  }));

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

/**
 * Wrap the D3-created Sankey layout with extra attributes needed to render the SVG.
 */
export const sankeyLayout = (agencySectorImpactLinks: AgencySectorImpactLink[]) => {
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
        url: node.url,
        label: {
          x:
            node.x0 < SIZING.width / 2
              ? node.x1 + SIZING.nodeLabelPadding
              : node.x0 - SIZING.nodeLabelPadding,
          y: (node.y1 + node.y0) / 2,
          dy: '0.35em',
          text: `${node.id}`,
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
        index,
        gradient: {
          id: `link-${link.index}`,
          start: {
            x: (link.source as SankeyNode).x1,
            color: colorForNodeId((link.source as SankeyNode).id),
          },
          end: {
            x: (link.target as SankeyNode).x0,
            color: colorForNodeId((link.target as SankeyNode).id),
          },
        },
        path: {
          d: linkHorizontal(link),
          stroke: `url(#link-${index})`,
          strokeWidth: Math.max(1, link.width),
        },
        title: `${(link.source as SankeyNode).id} → ${(link.target as SankeyNode).id}\n${format(
          link.value,
        )} kg CO2 equivalent`,
      };
    }),
  };
};
