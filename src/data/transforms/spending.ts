import { getSpendingByNaics } from '../sources/usaspending';
import { getModelSectors, getSectorCO2Equivalents } from '../sources/useeio';

export const getSpendingImpact = async () => {
  const spendingByNaics = await getSpendingByNaics({
    naicsCodes: ['1119'],
    fiscalYear: 2021,
  });

  // Get more detailed sector metadata from the USEEIO api.
  const modelSectors = await getModelSectors();
  console.log(modelSectors);
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
};
