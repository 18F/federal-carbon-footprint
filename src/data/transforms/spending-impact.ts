import * as usaSpending from '../sources/usaspending';
import * as useeio from '../sources/useeio';

export const getSpendingImpactByAgency = async (ctx: useeio.Context) => {
  const [impactBySector, agency1SpendBySector, agency2SpendBySector] =
    await Promise.all([
      useeio.getGhgImpactBySectorId(ctx),
      usaSpending.getAgencySpendBySector(ctx, {
        agency: 'Securities and Exchange Commission',
        fiscalYear: 2021,
      }),
      usaSpending.getAgencySpendBySector(ctx, {
        agency: 'U.S. Agency for Global Media',
        fiscalYear: 2021,
      }),
    ]);
  return {
    agencies: [
      {
        name: 'Securities and Exchange Commission',
        sectors: agency1SpendBySector.map((sectorSpend) => {
          return {
            amount: sectorSpend.amount,
            code: sectorSpend.code,
            name: sectorSpend.name,
            kgC02Eq: impactBySector[sectorSpend.code] * sectorSpend.amount,
          };
        }),
      },
      {
        name: 'U.S. Agency for Global Media',
        sectors: agency1SpendBySector.map((sectorSpend) => {
          return {
            amount: sectorSpend.amount,
            code: sectorSpend.code,
            name: sectorSpend.name,
            kgC02Eq: impactBySector[sectorSpend.code] * sectorSpend.amount,
          };
        }),
      },
    ],
  };
};
export type SpendingImpactByAgency = ReturnType<
  typeof getSpendingImpactByAgency
>;

export const getSpendingImpact = async (ctx: useeio.Context) => {
  // Get more detailed sector metadata from the USEEIO api.
  const modelSectors = await useeio.getModelSectors(ctx);
  return modelSectors;
  /*
  const spendingByNaics = await getSpendingByNaics({
    naicsCodes: ['1119'],
    fiscalYear: 2021,
  });
  const co2PerDollar = Promise.all(
    spendingByNaics.map((item) => {
      console.log(spendingByNaics);
      return getSectorCO2Equivalents([modelSectors[item.code].id]);
    }),
  );

  return spendingByNaics.map((item, index) => {
    return {
      code: item.code,
      co2Equivalents: item.amount * co2PerDollar[index],
      description: modelSectors[item.code].description,
      location: modelSectors[item.code].location,
      name: modelSectors[item.code].name,
    };
  });
  */
};
