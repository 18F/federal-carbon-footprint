<script lang="ts">
  import { arc, pie, PieArcDatum } from 'd3-shape';
  import { scaleSequential } from 'd3-scale';
  import { interpolateCool } from 'd3-scale-chromatic';

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

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const innerRadius = 0;
  const outerRadius = 200;
  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);
  const createPie = pie<FuelTypeDatum>()
    .padAngle(0)
    .value((datum) => datum.value);
  const pieArc = arc<PieArcDatum<FuelTypeDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const pieArcData = createPie(data);
</script>

<div id="pie-container">
  <svg {width} {height}>
    <g transform={`translate(${width / 2}, ${height / 2})`}>
      {#each pieArcData as datum, index}
        <path
          d={pieArc(datum)}
          fill={colorScale(index)}
          stroke={'#ffffff'}
          stroke-width="0"
        />
        <text
          text-anchor="middle"
          alignment-baseline="middle"
          style={`fill: ${colorScale(data.length - index - 1)}`}
          transform={(() => {
            const [x, y] = pieArc.centroid(datum);
            return `translate(${x}, ${y})`;
          })()}
        >
          {datum.data.label}
        </text>
      {/each}
    </g>
  </svg>
</div>
