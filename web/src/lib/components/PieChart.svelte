<script lang="ts">
  import { arc as d3Arc, pie as d3Pie, PieArcDatum } from 'd3-shape';
  import { scaleSequential } from 'd3-scale';
  import { interpolateCool } from 'd3-scale-chromatic';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';

  //import { fuelUsageData } from '$lib/stores/fuel-type-usage';
  //import { validateFuelTypeUsageSet } from '$lib/data';

  type FuelTypeDatum = { label: string; value: number; trillionBtu: number };
  const data: FuelTypeDatum[] = [
    { label: 'Diesel', value: 12.9, trillionBtu: 109.6 },
    { label: 'Fuel Oil', value: 1.8, trillionBtu: 15.7 },
    { label: 'Gasoline', value: 5.1, trillionBtu: 43.3 },
    { label: 'Jet Fuel', value: 40.6, trillionBtu: 345.0 },
    { label: 'Renewables', value: 1.3, trillionBtu: 11.1 },
    { label: 'Electricity', value: 20.5, trillionBtu: 173.8 },
    { label: 'Natural Gas', value: 15.1, trillionBtu: 128.3 },
    { label: 'Other', value: 2.6, trillionBtu: 22.3 },
  ];

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };
  const innerRadius = 0;
  const outerRadius = 200;

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  const createPie = d3Pie<FuelTypeDatum>()
    .padAngle(0)
    .value((d) => d.value);

  const createArc = d3Arc<PieArcDatum<FuelTypeDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const pieArcs = createPie(data);

  function drawChart() {
    // Remove the old svg
    select('#pie-container').select('svg').remove();

    // Create new svg
    const svg = select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = svg.selectAll().data(pieArcs).enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', createArc)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = createArc.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  onMount(drawChart);
</script>

<div id="pie-container" style="background-color: lightgray;" />

<div id="pie-container-svelte">
  <svg {width} {height}>
    <g transform={`translate(${width / 2}, ${height / 2})`}>
      {#each pieArcs as datum, index}
        <path
          d={createArc(datum)}
          fill={colorScale(index)}
          stroke={'#ffffff'}
          stroke-width="0"
        />
        <text
          text-anchor="middle"
          alignment-baseline="middle"
          style={`fill: ${colorScale(data.length - 1)}`}
          transform={(() => {
            const [x, y] = createArc.centroid(datum);
            return `translate(${x}, ${y})`;
          })()}
        >
          {datum.data.label}
        </text>
      {/each}
    </g>
  </svg>
</div>

<!--
<svg
  {width}
  {height}
  viewBox={`${-width / 2} ${-height / 2} ${width}, ${height}`}
  style="max-width: 100%; height: auto; height: intrinsic;"
>
  <g {stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin}>
    {#each $fuelUsageData as row, index}
      <path d="" fill="green">
        <title>{row.fuelType}\n{row.percentage}%\n{row.trillionBTU} BTU</title>
      </path>
    {/each}
  </g>
  <g font-family="sans-serif" font-size="10" text-anchor="middle">
    {#each $fuelUsageData as row, index}
      <text>
        <tspan>some text</tspan>
        <tspan>some text2</tspan>
      </text>
    {/each}
  </g>
</svg>
-->
