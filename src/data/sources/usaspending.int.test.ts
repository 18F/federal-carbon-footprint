import * as usaspending from './usaspending';

describe('usaspending.gov service integrates correctly', () => {
  it('with getSpendingByNaicsCategoryPage', async () => {
    const serviceData = await usaspending.getSpendingByNaicsCategoryPage(
      {
        fetch: window.fetch.bind(window),
      },
      {
        agency: 'Securities and Exchange Commission',
        fiscalYear: 2021,
      },
      1,
    );
    // Validate shape of data.
    usaspending.validateSpendingByNaicsCategoryPage(serviceData);
  });

  it('with getAgencies', async () => {
    const serviceData = await usaspending.getAgencies({
      fetch: window.fetch.bind(window),
    });
    // Validate shape of data.
    usaspending.validateAgencies(serviceData);
  });
});
