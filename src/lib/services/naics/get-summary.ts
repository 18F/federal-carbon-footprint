import { getSectorSummaryByCode, type GetNaicsMap, type SectorSummary } from '$lib/domain/naics';
import * as r from '$lib/result';
import type { GetImpactData } from '../spending-impact';

export const GetSectorSummary =
  (ctx: { getNaicsMap: GetNaicsMap, getImpactData: GetImpactData  }) =>
  async (sectorCode: string): Promise<r.Result<SectorSummary, Error>> => {
    const naicsMap = await ctx.getNaicsMap();

    const impactData = await ctx.getImpactData();

    if(impactData.ok === false) {
      return r.Error(new Error(`Unable to find impact data for ${sectorCode}`));
    }

    return getSectorSummaryByCode(impactData.value, naicsMap, sectorCode);
  };
