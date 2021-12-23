import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import memoizee from 'memoizee';

import { GetNaics, NaicsCode } from '$lib/domain/naics';

import naics from './naics.json';

const NaicsSourceJson = t.array(
  t.type({
    code: NaicsCode,
    description: t.string,
    parentCode: t.union([NaicsCode, t.null]),
  }),
);

export const getNaics: GetNaics = memoizee(() => {
  const value = pipe(
    NaicsSourceJson.decode(naics),
    fold(
      (errors) => {
        const msg = errors.map((error) =>
          error.context.map(({ key }) => key).join('.'),
        );
        throw new Error(`Error decoding JSON: ${msg}`);
      },
      (naicsList) => naicsList,
    ),
  );
  return Promise.resolve(value);
});
