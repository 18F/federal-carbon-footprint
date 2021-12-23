import type { GetNaics } from '$data/domain/naics';

import type * as usaSpending from '../adapters/usaspending';
import type * as useeio from '../adapters/useeio';

type Context = {
  getNaics: GetNaics;
  getGhgImpactBySectorId: ReturnType<typeof useeio.GetGhgImpactBySectorId>;
  getAgencies: ReturnType<typeof usaSpending.GetAgencies>;
  getAgencySpendBySector: ReturnType<typeof usaSpending.GetAgencySpendBySector>;
};

export type SpendingImpactByAgency = {
  agencies: {
    name: string;
    sectors: {
      amount: number;
      code: string;
      name: string;
      kgC02Eq: number;
    }[];
  }[];
};

export const GetSpendingImpactByAgency =
  (ctx: Context) => async (): Promise<SpendingImpactByAgency> => {
    const naicsCodes = ctx.getNaics();
    const impactBySectorPromise = ctx.getGhgImpactBySectorId();
    const agencyResults = await ctx.getAgencies();
    const agencyNames = agencyResults.results.map(
      (agency) => agency.agency_name,
    );
    const [impactBySector, ...agencySpendsBySector] = await Promise.all([
      impactBySectorPromise,
      ...agencyNames.map((agencyName) => {
        return ctx.getAgencySpendBySector({
          agency: agencyName,
          fiscalYear: 2021,
        });
      }),
    ]);

    return {
      agencies: agencySpendsBySector.map((agencySpendBySector, index) => {
        return {
          name: agencyNames[index],
          sectors: agencySpendBySector.map((sectorSpend) => {
            return {
              amount: sectorSpend.amount,
              code: sectorSpend.code,
              name: sectorSpend.name,
              kgC02Eq: impactBySector[sectorSpend.code] * sectorSpend.amount,
            };
          }),
        };
      }),
    };
  };
