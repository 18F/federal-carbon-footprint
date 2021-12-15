<script lang="ts">
  import * as d3 from 'd3';
  import * as d3Sankey from 'd3-sankey';

  import type { SpendingImpactByAgency } from '$data/transforms/spending-impact';

  export let data: SpendingImpactByAgency;

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

  const width = 640;
  const height = 400;
  const marginTop = 5;
  const marginRight = 1;
  const marginBottom = 5;
  const marginLeft = 1;

  const createSankeyLayout = (links: SLink[]) => {
    let sankeyLayout: d3Sankey.SankeyLayout<DAG, NodeExtra, LinkExtra> =
      d3Sankey.sankey<DAG, NodeExtra, LinkExtra>();

    const linkSources = d3.map(links, ({ source }) => source);
    const linkTargets = d3.map(links, ({ target }) => target);
    let nodes: NodeExtra[] = Array.from(
      d3.union(linkSources, linkTargets),
      (id) => ({ id }),
    );

    sankeyLayout
      .nodeId((node) => node.id)
      .nodeAlign(d3Sankey.sankeyJustify)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [marginLeft, marginTop],
        [width - marginRight, height - marginBottom],
      ]);

    return sankeyLayout({ nodes, links });
  };

  const sankeyData = (data.agencies).flatMap(agency => {
    return agency.sectors.map(sector => {
      return {
        source: agency.name,
        target: sector.name,
        value: sector.kgC02Eq,
      };
    });
  });

  const sankeyLayout = createSankeyLayout(sankeyData);
  const nodeIds = sankeyLayout.nodes.map((n) => n.id);
  const format = d3.format(',');
  const nodeGroups = d3.map(sankeyLayout.nodes, (n) => n.id);
  const color = d3.scaleOrdinal(nodeGroups, d3.schemeTableau10);
  const nodeTitles = d3.map(
    sankeyLayout.nodes,
    (d) => `${d.id}\n${format(d.value)}`,
  );
  const linkTitles = d3.map(
    sankeyLayout.links,
    (d) => `${d.source} → ${d.target}\n${format(d.value)}`,
  );
  const nodeLabelPadding = 6;
  const linkStrokeOpacity = 0.5;
  const linkColor = 'source-target';

  // The Typescript type of link nodes is:
  //  `string & (string | number | d3Sankey.SankeyNode<NodeExtra, LinkExtra>`
  // This comes from the source and target types in `LinkExtra`, which are
  // set as string IDs for convenience. This casts to the node
  // type in a manner that can be used inside the Svelte markup.
  const castSankeyNode = (node) => {
    return node as d3Sankey.SankeyNode<NodeExtra, LinkExtra>;
  }
</script>

<svg
  {width}
  {height}
  viewBox={`0 0 ${width}, ${height}`}
  style="max-width: 100%; height: auto; height: intrinsic;"
>
  <g stroke="currentColor">
    {#each sankeyLayout.nodes as node, index}
      <rect
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={color(nodeGroups[index])}
      >
      <title>{nodeTitles[index]}</title>
    </rect>
    {/each}
  </g>
  <g fill="none" stroke-opacity={linkStrokeOpacity}>
    {#each sankeyLayout.links as link, index}
      <g mix-blend-mode="multiply" />
      {#if linkColor === 'source-target'}
        <linearGradient
          id={`link-${index}`}
          gradientUnits={'userSpaceOnUse'}
          x1={castSankeyNode(link.source).x1}
          x2={castSankeyNode(link.target).x0}
        >
          <title>{link}</title>
          <stop offset={'0%'} stop-color={color(nodeGroups[castSankeyNode(link.source).index])} />
          <stop offset={'100%'} stop-color={color(nodeGroups[castSankeyNode(link.target).index])} />
        </linearGradient>
      {/if}
      <path
        d={d3Sankey.sankeyLinkHorizontal()(link)}
        stroke={linkColor === 'source-target'
          ? `url(#link-${index})`
          : linkColor === 'source'
          ? color(nodeGroups[index])
          : linkColor === 'target'
          ? color(nodeGroups[index])
          : linkColor}
        stroke-width={Math.max(1, link.width)}
      >
        {#if linkTitles}
          <title>{linkTitles[index]}</title>
        {/if}
      </path>
    {/each}
  </g>
  <g font-family="sans-serif" font-size="10">
    {#each sankeyLayout.nodes as node, index}
      <text
        x={node.x0 < width / 2
          ? node.x1 + nodeLabelPadding
          : node.x0 - nodeLabelPadding}
        y={(node.y1 + node.y0) / 2}
        dy="0.35em"
        text-anchor={node.x0 < width / 2 ? 'start' : 'end'}
      >
        {nodeIds[index]}
      </text>
    {/each}
  </g>
</svg>
