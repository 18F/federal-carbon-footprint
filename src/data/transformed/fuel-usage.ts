import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import * as t from 'io-ts';

import { getRawFuelUsageData } from '$data/sources/fuel-usage';

const FuelTypeUsage = t.type({
  fuelType: t.string,
  percentage: t.number,
  trillionBTU: t.number,
});
const FuelTypeUsageSet = t.array(FuelTypeUsage);
export type FuelTypeUsageSet = t.TypeOf<typeof FuelTypeUsageSet>;

const validateFuelTypeUsageSet = (input: any): FuelTypeUsageSet | null => {
  return pipe(
    FuelTypeUsageSet.decode(input),
    fold(
      () => null,
      (value) => value,
    ),
  );
};

export const getFuelUsage = async () => {
  const rows = getRawFuelUsageData();
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
