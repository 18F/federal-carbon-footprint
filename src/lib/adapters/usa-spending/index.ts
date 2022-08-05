import * as r from '$lib/result';
import type { GetAgencySpendsBySector } from '$lib/services/spending-impact/spending-impact';
import * as api from './api';

export const UsaSpendingGetAgencySpendsBySector =
  (ctx: api.Context): GetAgencySpendsBySector =>
  async () => {
    // Get the agency names. These are used the query for agency spends.
    const getAgencyResult = await api.getAgencies(ctx);
    if (getAgencyResult.ok === false) {
      return r.Error(getAgencyResult.error);
    }

    const agencyResults = getAgencyResult.value;
    const agencyNames = agencyResults.results.map((agency) => agency.agency_name);
    // Get the agency spending for each sector.
    const agencySpendsBySectorResults = await Promise.all(
      agencyNames.map((agencyName) =>
        api.GetAgencySpendBySector(ctx)({
          agency: agencyName,
          fiscalYear: 2021,
        }),
      ),
    );

    const agencySpendsBySectorResult = r.combine(agencySpendsBySectorResults);
    if (agencySpendsBySectorResult.ok === false) {
      const error = new Error(
        agencySpendsBySectorResult.error.map((error) => error.message).join(', '),
      );
      return r.Error(error);
    }

    // Group each spend amount by agency.
    return r.Ok(
      agencySpendsBySectorResult.value.map((agencySpendBySector, index) => {
        return {
          agencyName: agencyNames[index],
          sectorSpends: agencySpendBySector.map((sectorSpend) => {
            return {
              sector: sectorSpend.code,
              amount: sectorSpend.amount,
            };
          }),
        };
      }),
    );
  };
