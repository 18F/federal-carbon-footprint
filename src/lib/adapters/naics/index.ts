import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import memoizee from 'memoizee';

import { GetNaicsMap, NaicsCode } from '$lib/domain/naics';

import naics07 from './naics-2007.json';
import naics12 from './naics-2012.json';
import naics17 from './naics-2017.json';

const NaicsSourceJson = t.array(
  t.type({
    code: NaicsCode,
    description: t.string,
    parentCode: t.union([NaicsCode, t.null]),
  }),
);

// Return flat list of all naics sectors, with duplicates.
// De-duped in `getNaicsMap`.
const getNaics = () => {
  const naics = [...naics07, ...naics12, ...naics17];
  const value = pipe(
    NaicsSourceJson.decode(naics),
    fold(
      (errors) => {
        const msg = errors.map((error) => {
          return error.context.map(({ key }) => key).join('.');
        });
        throw new Error(`Error decoding JSON: ${msg}`);
      },
      (naicsList) => naicsList,
    ),
  );
  return Promise.resolve(value);
};

export const getNaicsMap: GetNaicsMap = memoizee(async () => {
  const naics = await getNaics();
  return naics.reduce((map, naicsSector) => {
    map[naicsSector.code] = naicsSector;
    return map;
  }, {});
});
