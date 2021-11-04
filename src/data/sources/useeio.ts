const BASE_URL = 'https://api.edap-cluster.com/useeio/api';
const API_KEY = import.meta.env.VITE_USEEIO_API_KEY.toString();
const MODEL_NAME = 'USEEIOv1.2';

// An optional application key may be added to each request.
const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

const fetchServiceData = <T>(
  modelName: string,
  endpoint: string,
  jsonPayload?: object,
): Promise<T> => {
  return fetch(`${BASE_URL}/${modelName}/${endpoint}`, {
    method: jsonPayload ? 'POST' : 'GET',
    headers: API_HEADERS,
    body: JSON.stringify(jsonPayload),
  }).then((response) => response.json() as Promise<T>);
};

type ModelSector = {
  id: string;
  index: number;
  name: string;
  code: string;
  location: string;
  description: string;
};
type CalculateResult = {
  indicators: string[];
  sectors: string[];
  data: number[][];
  totals: number[];
};
export const getSectorCO2Equivalents = async (dollars: number = 1_000_000) => {
  const sectors = await fetchServiceData<ModelSector[]>(MODEL_NAME, 'sectors');
  const result = await fetchServiceData<CalculateResult>(
    MODEL_NAME,
    'calculate',
    {
      demand: sectors.map((sector) => {
        return {
          sector: sector.id,
          amount: dollars,
        };
      }),
      perspective: 'final',
    },
  );
  const ghgIndex = result.indicators.indexOf('GHG');
  const kgCO2Equilvalent = result.totals[ghgIndex];
  return kgCO2Equilvalent;
};

/**
 * @see https://www.epa.gov/chemical-research/tool-reduction-and-assessment-chemicals-and-other-environmental-impacts-traci
 * @param demand Array of sector spend amounts.
 * @returns TRACI - kg CO2-equivalent
 */
/*
import * as useeio from 'useeio';

const BASE_URL = 'https://api.edap-cluster.com/useeio/api';
const API_KEY = 'lySopVteG11Ru0m5ucnRharYBWco1CIGWlxKvro0';
const MODEL_NAME = 'USEEIOv1.2';

export const getCO2Equivalent = async (demand: useeio.DemandEntry[]) => {
  const model = useeio.modelOf({
    endpoint: BASE_URL,
    model: MODEL_NAME,
    apikey: API_KEY,
    asJsonFiles: false,
  });
  const result = await model.calculate({
    // "direct" | "intermediate" | "final"
    perspective: 'final',
    // {sector: string; amount: number;}[]
    demand: demand,
  });
  const ghgIndex = result.indicators.indexOf('GHG');
  return result.totals[ghgIndex];
};*/
