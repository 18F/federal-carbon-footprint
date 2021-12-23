/**
 * This application context is to be used for service endpoints.
 * It should should include dependencies that can only run during the build
 * process; ie, services that return transformed source data.
 */

import makeFetchHappen from 'make-fetch-happen';

import { GetSpendingImpactByAgency } from '$data/services/spending-impact';
import * as usaSpending from '$data/adapters/usaspending';
import * as useeio from '$data/adapters/useeio';

const USEEIO_API_KEY = import.meta.env.VITE_USEEIO_API_KEY.toString();

// Fetch implementation that caches to the filesystem.
const fetch = makeFetchHappen.defaults({
  cachePath: './fetch-cache',
}) as unknown as typeof global.fetch;

export const getSpendingImpactByAgency = GetSpendingImpactByAgency({
  getNaics: usaSpending.UsaSpendingGetNaics({ fetch }),
  getGhgImpactBySectorId: useeio.GetGhgImpactBySectorId({
    fetch,
    USEEIO_API_KEY,
  }),
  getAgencies: usaSpending.GetAgencies({ fetch }),
  getAgencySpendBySector: usaSpending.GetAgencySpendBySector({ fetch }),
});
