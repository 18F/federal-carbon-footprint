<script lang="ts">
  import type { Readable } from 'svelte/store';

  import type { AgencySectorImpactLink } from '$lib/services/spending-impact';
  import { createSankeyFlowsStore } from '$lib/view-state/sankey-flows';

  export let agencySectorImpacts: Readable<AgencySectorImpactLink[]>;

  $: sankeyFlows = createSankeyFlowsStore(agencySectorImpacts);
  $: hoverLink = sankeyFlows.hoverLink;
  $: sankeyLayout = sankeyFlows.sankeyLayout;
  $: linkActiveStates = sankeyFlows.linkActiveStates;
</script>

<svg
  width={$sankeyLayout.svg.width}
  height={$sankeyLayout.svg.height}
  viewBox={$sankeyLayout.svg.viewBox}
  style="max-width: 100%; height: auto; height: intrinsic;"
>
  <g stroke="currentColor">
    {#each $sankeyLayout.nodes as node}
      <a href={node.url}>
        <rect
          x={node.rect.x}
          y={node.rect.y}
          height={node.rect.height}
          width={node.rect.width}
          fill={node.rect.fill}
        >
          <title>{node.rect.title}</title>
        </rect>
      </a>
    {/each}
  </g>
  <g fill="none" stroke-opacity={$sankeyLayout.linkStrokeOpacity}>
    {#each $sankeyLayout.links as link}
      <g
        mix-blend-mode="multiply"
        on:mouseenter={() => hoverLink.setHover(link.index)}
        on:mouseleave={() => hoverLink.clear()}
      >
        <linearGradient
          id={link.gradient.id}
          gradientUnits={'userSpaceOnUse'}
          x1={link.gradient.start.x}
          x2={link.gradient.end.x}
        >
          <title>{link.title}</title>
          <stop offset={'0%'} stop-color={link.gradient.start.color} />
          <stop offset={'100%'} stop-color={link.gradient.end.color} />
        </linearGradient>
        <path
          d={link.path.d}
          stroke={$linkActiveStates[link.index] ? 'black' : link.path.stroke}
          stroke-width={link.path.strokeWidth}
        >
          <title>{link.title}</title>
        </path>
      </g>
    {/each}
  </g>
  <g font-family="sans-serif" font-size="10">
    {#each $sankeyLayout.nodes as node}
      <a href={node.url}>
        <text
          x={node.label.x}
          y={node.label.y}
          dy={node.label.dy}
          text-anchor={node.label.textAnchor}
        >
          {node.label.text}
        </text>
      </a>
    {/each}
  </g>
</svg>
