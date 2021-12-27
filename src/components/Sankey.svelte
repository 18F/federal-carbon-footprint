<script lang="ts">
  import { castSankeyNode, sankeyLayout, SIZING } from '$lib/stores/sankey-flows';
</script>

<svg
  width={SIZING.width}
  height={SIZING.height}
  viewBox={`0 0 ${SIZING.width}, ${SIZING.height}`}
  style="max-width: 100%; height: auto; height: intrinsic;"
>
  <g stroke="currentColor">
    {#each $sankeyLayout.nodes as node}
      <rect
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={node.color}
      >
        <title>{node.title}</title>
      </rect>
    {/each}
  </g>
  <g fill="none" stroke-opacity={SIZING.linkStrokeOpacity}>
    {#each $sankeyLayout.links as link, index}
      <g mix-blend-mode="multiply" />
        <linearGradient
          id={`link-${index}`}
          gradientUnits={'userSpaceOnUse'}
          x1={castSankeyNode(link.source).x1}
          x2={castSankeyNode(link.target).x0}
        >
          <title>{link.title}</title>
          <stop offset={'0%'} stop-color={link.colors.start} />
          <stop offset={'100%'} stop-color={link.colors.end} />
        </linearGradient>
      <path
        d={link.linkHorizontal}
        stroke={`url(#link-${index})`}
        stroke-width={Math.max(1, link.width)}
      >
        <title>{link.title}</title>
      </path>
    {/each}
  </g>
  <g font-family="sans-serif" font-size="10">
    {#each $sankeyLayout.nodes as node}
      <text
        x={node.x0 < SIZING.width / 2 ? node.x1 + SIZING.nodeLabelPadding : node.x0 - SIZING.nodeLabelPadding}
        y={(node.y1 + node.y0) / 2}
        dy="0.35em"
        text-anchor={node.x0 < SIZING.width / 2 ? 'start' : 'end'}
      >
        {node.id}
      </text>
    {/each}
  </g>
</svg>
