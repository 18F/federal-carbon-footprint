import memoizee from 'memoizee';

const BASE_URL = 'https://api.edap-cluster.com/useeio/api';
const MODEL_NAME = 'USEEIOv1.2';

export type Context = {
  USEEIO_API_KEY: string;
  fetch: typeof fetch;
};

const fetchServiceData = <T>(
  ctx: Context,
  modelName: string,
  endpoint: string,
  jsonPayload?: object,
): Promise<T> => {
  const body = JSON.stringify(jsonPayload);
  return ctx
    .fetch(`${BASE_URL}/${modelName}/${endpoint}`, {
      method: jsonPayload ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ctx.USEEIO_API_KEY,
      },
      body,
    })
    .then((response) => {
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
export const getModelSectors = memoizee(async (ctx: Context) => {
  return fetchServiceData<ModelSector[]>(ctx, MODEL_NAME, 'sectors');
  /*return models.reduce<Record<string, ModelSector>>(
    (modelSectorsById, current) => {
      modelSectorsById[current.code] = current;
      return modelSectorsById;
    },
    {},
  );*/
});

type ModelIndicator = {
  id: string;
  index: number;
  name: string;
  code: string;
  unit: string;
};
export const getModelIndicators = memoizee(async (ctx: Context) => {
  const indicators = await fetchServiceData<ModelIndicator[]>(
    ctx,
    MODEL_NAME,
    'indicators',
  );
  return indicators.reduce<Record<string, ModelIndicator>>(
    (modelIndicatorsById, current) => {
      modelIndicatorsById[current.code] = current;
      return modelIndicatorsById;
    },
    {},
  );
});

export const getMatrixD = memoizee(async (ctx: Context) => {
  return fetchServiceData<number[][]>(ctx, MODEL_NAME, 'matrix/D');
});

export const getGhgImpactBySectorId = memoizee(async (ctx: Context) => {
  const [indicators, sectors, rows] = await Promise.all([
    getModelIndicators(ctx),
    getModelSectors(ctx),
    getMatrixD(ctx),
  ]);
  const sectorGhgImpactVector = rows[indicators['GHG'].index];
  return sectors.reduce<Record<string, number>>(
    (ghgImpactBySectorId, sector) => {
      ghgImpactBySectorId[sector.code] = sectorGhgImpactVector[sector.index];
      return ghgImpactBySectorId;
    },
    {},
  );
});
