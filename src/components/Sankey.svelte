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
    {#each $sankeyLayout.layout.nodes as node, index}
      <rect
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={$sankeyLayout.color($sankeyLayout.nodeGroups[index])}
      >
        <title>{$sankeyLayout.nodeTitles[index]}</title>
      </rect>
    {/each}
  </g>
  <g fill="none" stroke-opacity={$sankeyLayout.linkStrokeOpacity}>
    {#each $sankeyLayout.layout.links as link, index}
      <g mix-blend-mode="multiply" />
      {#if $sankeyLayout.linkColor === 'source-target'}
        <linearGradient
          id={`link-${index}`}
          gradientUnits={'userSpaceOnUse'}
          x1={castSankeyNode(link.source).x1}
          x2={castSankeyNode(link.target).x0}
        >
          <title>{link}</title>
          <stop offset={'0%'} stop-color={$sankeyLayout.color($sankeyLayout.nodeGroups[castSankeyNode(link.source).index])} />
          <stop offset={'100%'} stop-color={$sankeyLayout.color($sankeyLayout.nodeGroups[castSankeyNode(link.target).index])} />
        </linearGradient>
      {/if}
      <path
        d={$sankeyLayout.linkHorizontal(link)}
        stroke={$sankeyLayout.linkColor === 'source-target'
          ? `url(#link-${index})`
          : $sankeyLayout.linkColor === 'source'
          ? $sankeyLayout.color($sankeyLayout.nodeGroups[index])
          : $sankeyLayout.linkColor === 'target'
          ? $sankeyLayout.color($sankeyLayout.nodeGroups[index])
          : $sankeyLayout.linkColor}
        stroke-width={Math.max(1, link.width)}
      >
        {#if $sankeyLayout.linkTitles}
          <title>{$sankeyLayout.linkTitles[index]}</title>
        {/if}
      </path>
    {/each}
  </g>
  <g font-family="sans-serif" font-size="10">
    {#each $sankeyLayout.layout.nodes as node, index}
      <text
        x={node.x0 < SIZING.width / 2 ? node.x1 + $sankeyLayout.nodeLabelPadding : node.x0 - $sankeyLayout.nodeLabelPadding}
        y={(node.y1 + node.y0) / 2}
        dy="0.35em"
        text-anchor={node.x0 < SIZING.width / 2 ? 'start' : 'end'}
      >
        {$sankeyLayout.nodeIds[index]}
      </text>
    {/each}
  </g>
</svg>
