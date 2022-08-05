/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { fetch } from 'whatwg-fetch';

import * as api from './api';

describe('integration: api.gov service integrates correctly', () => {
  it('with getSpendingByNaicsCategoryPage', async () => {
    const serviceData = await api.getSpendingByNaicsCategoryPage(
      {
        fetch,
      },
      {
        agency: 'Department of Commerce',
        fiscalYear: 2021,
      },
      1,
    );
    expect(serviceData.ok).toEqual(true);
    // Validate shape of data.
    if (serviceData.ok) {
      api.validateSpendingByNaicsCategoryPage(serviceData.value);
    }
  });

  it('with getAgencies', async () => {
    const serviceData = await api.getAgencies({
      fetch,
    });
    expect(serviceData.ok).toEqual(true);
    // Validate shape of data.
    if (serviceData.ok) {
      api.validateAgencies(serviceData.value);
    }
  });

  /*it('with getNaics', async () => {
    const serviceData = api.UsaSpendingGetNaics({
      fetch,
    });
    const serviceData = await getNaics();
    const result = reporter.report(NaicsSectorList.decode(serviceData));
    expect(result.length).toEqual(0);
  });*/
});
