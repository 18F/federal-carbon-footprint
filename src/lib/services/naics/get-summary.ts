import { getCanonicalSector, type GetNaicsMap, type NaicsCode } from "$lib/domain/naics";
import * as r from '$lib/result';

type SectorSummary = {
  description: string;
}

export const GetSummary = (ctx: {
  getNaicsMap: GetNaicsMap;
}) => async (sectorCode: string) : Promise<r.Result<SectorSummary, Error>> => {
  const naicsMap = await ctx.getNaicsMap();

  try {
    const foundSector = getCanonicalSector(naicsMap, sectorCode)
    return r.Ok({
      description: foundSector.description,
    });
  } catch(e) {
    return r.Error(e);
  }
};