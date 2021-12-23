import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import reporter from 'io-ts-reporters';

export const NaicsSector = t.type({
  code: t.string,
  description: t.string,
  parentCode: t.union([t.string, t.null]),
});
export type NaicsSector = t.TypeOf<typeof NaicsSector>;
export const NaicsSectorList = t.array(NaicsSector);
export type NaicsSectorList = t.TypeOf<typeof NaicsSector>;

export type GetNaics = () => Promise<NaicsSector[]>;
