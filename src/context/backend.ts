/**
 * This application context is to be used for service endpoints.
 * It should only include dependencies that can only run during the build
 * process; ie, services that return transformed source data.
 */

import makeFetchHappen from 'make-fetch-happen';
import memoizee from 'memoizee';

import { getNaicsMap } from '$lib/adapters/naics';
import { UsaSpendingGetAgencySpendsBySector } from '$lib/adapters/usa-spending';
import * as useeio from '$lib/adapters/useeio';
import { GetImpactData } from '$lib/services/spending-impact';
import { GetSectorSummary } from '$lib/services/naics/get-summary';

const USEEIO_API_KEY = import.meta.env.VITE_USEEIO_API_KEY.toString();

// Fetch implementation that caches to the filesystem.
const fetch = makeFetchHappen.defaults({
  cachePath: './fetch-cache',
}) as unknown as typeof global.fetch;

export const getImpactData = memoizee(
  GetImpactData({
    getNaicsMap,
    getGhgImpactBySectorId: useeio.GetUseeioGhgImpactBySectorId({
      fetch,
      USEEIO_API_KEY,
    }),
    getAgencySpendsBySector: UsaSpendingGetAgencySpendsBySector({ fetch }),
  }),
);

export const getSectorSummary = memoizee(
  GetSectorSummary({
    getNaicsMap,
    getImpactData
  }),
);
