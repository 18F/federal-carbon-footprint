import type { GetGhgImpactBySectorId } from '$lib/domain/ghg-impact';
import type { GetNaics } from '$lib/domain/naics';

import type * as usaSpending from '../adapters/usaspending';

type Context = {
  getNaics: GetNaics;
  getGhgImpactBySectorId: GetGhgImpactBySectorId;
  getAgencies: ReturnType<typeof usaSpending.GetAgencies>;
  getAgencySpendBySector: ReturnType<typeof usaSpending.GetAgencySpendBySector>;
};

export type AgencySectorImpacts = {
  name: string;
  sectors: {
    amount: number;
    sector: string;
    name: string;
    kgC02Eq: number;
  }[];
};

export const GetAllAgencySectorImpacts =
  (ctx: Context) => async (): Promise<AgencySectorImpacts[]> => {
    const naicsCodes = ctx.getNaics();
    const impactBySectorPromise = ctx.getGhgImpactBySectorId();
    const agencyResults = await ctx.getAgencies();
    const agencyNames = agencyResults.results.map((agency) => agency.agency_name);
    const [impactBySector, ...agencySpendsBySector] = await Promise.all([
      impactBySectorPromise,
      ...agencyNames.map((agencyName) => {
        return ctx.getAgencySpendBySector({
          agency: agencyName,
          fiscalYear: 2021,
        });
      }),
    ]);

    return agencySpendsBySector.map((agencySpendBySector, index) => {
      return {
        name: agencyNames[index],
        sectors: agencySpendBySector.map((sectorSpend) => {
          return {
            amount: sectorSpend.amount,
            sector: sectorSpend.code,
            name: sectorSpend.name,
            kgC02Eq: impactBySector[sectorSpend.code] * sectorSpend.amount,
          };
        }),
      };
    });
  };
