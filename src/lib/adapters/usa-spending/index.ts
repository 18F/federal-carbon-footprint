import type { GetAgencySpendsBySector } from '$lib/services/spending-impact/spending-impact';
import * as api from './api';

export const UsaSpendingGetAgencySpendsBySector =
  (ctx: api.Context): GetAgencySpendsBySector =>
  async () => {
    // Get the agency names. These are used the query for agency spends.
    const agencyResults = await api.getAgencies(ctx);
    const agencyNames = agencyResults.results.map((agency) => agency.agency_name);

    // Get the agency spending for each sector.
    const agencySpendsBySector = await Promise.all(
      agencyNames.map((agencyName) =>
        api.GetAgencySpendBySector(ctx)({
          agency: agencyName,
          fiscalYear: 2021,
        }),
      ),
    );

    // Group each spend amount by agency.
    return agencySpendsBySector.map((agencySpendBySector, index) => {
      return {
        agencyName: agencyNames[index],
        sectorSpends: agencySpendBySector.map((sectorSpend) => {
          return {
            sector: sectorSpend.code,
            amount: sectorSpend.amount,
          };
        }),
      };
    });
  };
