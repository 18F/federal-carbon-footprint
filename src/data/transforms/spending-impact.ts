import * as usaSpending from '../sources/usaspending';
import * as useeio from '../sources/useeio';

export const getSpendingImpactByAgency = async (ctx: useeio.Context) => {
  const agencyNames = [
    'Securities and Exchange Commission',
    'U.S. Agency for Global Media',
    'Corporation for National and Community Service',
    'Department of Veterans Affairs',
    'Social Security Administration',
    'Department of Education',
    'Department of Agriculture',
  ];
  const [impactBySector, ...agencySpendsBySector] = await Promise.all([
    useeio.getGhgImpactBySectorId(ctx),
    ...agencyNames.map((agencyName) => {
      return usaSpending.getAgencySpendBySector(ctx, {
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
