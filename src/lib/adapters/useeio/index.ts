import memoizee from 'memoizee';

import type { GetGhgImpactBySectorId } from '$lib/domain/ghg-impact';
import * as api from './api';

export const GetUseeioGhgImpactBySectorId = (ctx: api.Context): GetGhgImpactBySectorId =>
  memoizee(async () => {
    const [indicators, sectors, rows] = await Promise.all([
      api.getModelIndicators(ctx),
      api.getModelSectors(ctx),
      api.getMatrixU(ctx),
    ]);
    const ghgIndicator = indicators.find((indicator) => indicator.code === 'GHG');
    const sectorGhgImpactVector = rows[ghgIndicator.index];
    return sectors.reduce<Record<string, number>>((ghgImpactBySectorId, sector) => {
      ghgImpactBySectorId[sector.code] = sectorGhgImpactVector[sector.index];
      return ghgImpactBySectorId;
    }, {});
  });
