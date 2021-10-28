import { promises as fs } from 'fs';
import path from 'path';

import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import * as t from 'io-ts';

import { DATA_DIR } from './context';

const FuelTypeUsage = t.type({
  fuelType: t.string,
  percentage: t.number,
  trillionBTU: t.number,
});
const FuelTypeUsageSet = t.array(FuelTypeUsage);
export type FuelTypeUsageSet = t.TypeOf<typeof FuelTypeUsageSet>;

export const validateFuelTypeUsageSet = (
  input: any,
): FuelTypeUsageSet | null => {
  return pipe(
    FuelTypeUsageSet.decode(input),
    fold(
      () => null,
      (value) => value,
    ),
  );
};

export const getFuelUsage = async () => {
  const input = await fs.readFile(path.join(DATA_DIR, 'dummy.json'), 'utf-8');
  const rows = JSON.parse(input) || [];
  return validateFuelTypeUsageSet(
    rows.map((row) => {
      return {
        fuelType: row[0],
        percentage: row[1],
        trillionBTU: row[2],
      };
    }),
  );
};
