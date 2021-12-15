import * as usaspending from './usaspending';

describe('usaspending.gov service integration', () => {
  it('getAgencySpendBySector returns data', async () => {
    // Fetch data from an agency with only one page of results.
    const test = await usaspending.getAgencySpendBySector(
      {
        fetch: window.fetch.bind(window),
      },
      {
        agency: 'Securities and Exchange Commission',
        fiscalYear: 2021,
      },
    );
    expect(test).toBe({});
  });
});