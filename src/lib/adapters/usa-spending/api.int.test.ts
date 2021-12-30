import * as api from './api';

describe('api.gov service integrates correctly', () => {
  it('with getSpendingByNaicsCategoryPage', async () => {
    const serviceData = await api.getSpendingByNaicsCategoryPage(
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
    api.validateSpendingByNaicsCategoryPage(serviceData);
  });

  it('with getAgencies', async () => {
    const serviceData = await api.getAgencies({
      fetch: window.fetch.bind(window),
    });
    // Validate shape of data.
    api.validateAgencies(serviceData);
  });

  /*it('with getNaics', async () => {
    const serviceData = api.UsaSpendingGetNaics({
      fetch: window.fetch.bind(window),
    });
    const serviceData = await getNaics();
    const result = reporter.report(NaicsSectorList.decode(serviceData));
    expect(result.length).toEqual(0);
  });*/
});
