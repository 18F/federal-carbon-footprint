import type { number } from 'fp-ts';
import { fetch } from '../context';

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
  const body = JSON.stringify(jsonPayload);
  return fetch(`${BASE_URL}/${modelName}/${endpoint}`, {
    method: jsonPayload ? 'POST' : 'GET',
    headers: API_HEADERS,
    body,
  }).then((response) => {
    if (response.status !== 200) {
      const error = {
        status: response.status,
        message: response.statusText,
        url: response.url,
        body,
      };
      console.error(error);
      return Promise.reject(error);
    }
    return response.json() as Promise<T>;
  });
};

type ModelSector = {
  id: string;
  index: number;
  name: string;
  code: string;
  location: string;
  description: string;
};
export const getModelSectors = async () => {
  const models = await fetchServiceData<ModelSector[]>(MODEL_NAME, 'sectors');
  return models.reduce<Record<string, ModelSector>>(
    (modelSectorsById, current) => {
      modelSectorsById[current.code] = current;
      return modelSectorsById;
    },
    {},
  );
};

type CalculateResult = {
  indicators: string[];
  sectors: string[];
  data: number[][];
  totals: number[];
};
export const getSectorCO2Equivalents = async (
  sectors: string[],
  dollars: number = 1,
) => {
  const result = await fetchServiceData<CalculateResult>(
    MODEL_NAME,
    'calculate',
    {
      demand: sectors.map((sector) => {
        return {
          sector: sector,
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
