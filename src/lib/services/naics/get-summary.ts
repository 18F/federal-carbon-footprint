import { getSectorSummaryByCode, type GetNaicsMap, type SectorSummary } from "$lib/domain/naics";
import type * as r from '$lib/result';


// todo: rename getsectorsummary
export const GetSummary = (ctx: {
  getNaicsMap: GetNaicsMap;
}) => async (sectorCode: string) : Promise<r.Result<SectorSummary, Error>> => {
  const naicsMap = await ctx.getNaicsMap();

  return getSectorSummaryByCode(naicsMap, sectorCode)
};