import { NaicsSectorList } from '$lib/domain/naics';
import reporter from 'io-ts-reporters';

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
    const getAgengies = usaspending.GetAgencies({
      fetch: window.fetch.bind(window),
    });
    const serviceData = await getAgengies();
    // Validate shape of data.
    usaspending.validateAgencies(serviceData);
  });

  it('with getNaics', async () => {
    const getNaics = usaspending.UsaSpendingGetNaics({
      fetch: window.fetch.bind(window),
    });
    const serviceData = await getNaics();
    const result = reporter.report(NaicsSectorList.decode(serviceData));
    expect(result.length).toEqual(0);
  });
});
