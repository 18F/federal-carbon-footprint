import * as t from 'io-ts';

interface NaicsCodeBrand {
  readonly NaicsCode: unique symbol;
}
export const NaicsCode = t.brand(
  t.string,
  (n): n is t.Branded<string, NaicsCodeBrand> =>
    2 <= n.length && n.length <= 6 && !isNaN(Number(n)),
  'NaicsCode',
);
export type NaicsCode = t.Type<typeof NaicsCode>;

export const NaicsSector = t.type({
  code: NaicsCode,
  description: t.string,
  parentCode: t.union([NaicsCode, t.null]),
});
export type NaicsSector = t.TypeOf<typeof NaicsSector>;
export const NaicsSectorList = t.array(NaicsSector);
export type NaicsSectorList = t.TypeOf<typeof NaicsSectorList>;

export type GetNaics = () => Promise<NaicsSector[]>;
