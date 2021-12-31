import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
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

const ModelSectorList = t.array(
  t.type({
    id: t.string,
    index: t.number,
    name: t.string,
    code: t.string,
    location: t.string,
    description: t.string,
  }),
);
type ModelSectorList = t.TypeOf<typeof ModelSectorList>;

export const getModelSectors = memoizee(async (ctx: Context) => {
  return fetchServiceData<ModelSectorList>(ctx, MODEL_NAME, 'sectors');
});

export const validateModelSectors = (data: unknown): ModelSectorList => {
  return pipe(
    ModelSectorList.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

const ModelIndicatorList = t.array(
  t.type({
    id: t.string,
    index: t.number,
    name: t.string,
    code: t.string,
    unit: t.string,
  }),
);
type ModelIndicatorList = t.TypeOf<typeof ModelIndicatorList>;

export const getModelIndicators = memoizee(async (ctx: Context) => {
  return await fetchServiceData<ModelIndicatorList>(ctx, MODEL_NAME, 'indicators');
});

export const validateModelIndicators = (data: unknown): ModelIndicatorList => {
  return pipe(
    ModelIndicatorList.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

const MatrixD = t.array(t.array(t.number));
type MatrixD = t.TypeOf<typeof MatrixD>;

export const getMatrixD = memoizee(async (ctx: Context) => {
  return fetchServiceData<MatrixD>(ctx, MODEL_NAME, 'matrix/D');
});

export const validateMatrixD = (data: unknown): MatrixD => {
  return pipe(
    MatrixD.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};
