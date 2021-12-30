import type { GetGhgImpactBySectorId } from '$lib/domain/ghg-impact';
import type { GetNaicsMap } from '$lib/domain/naics';
import { getCanonicalSector, NaicsSector } from '$lib/domain/naics';

export type SectorImpact = {
  amount: number;
  kgC02Eq: number;
  sector: NaicsSector;
};

export type AgencySectorImpacts = {
  name: string;
  sectors: SectorImpact[];
};

// Suitable for use by d3-sankey to represent the links between nodes.
export type AgencySectorImpactLink = {
  source: string;
  target: string;
  value: number;
};

export type GetAgencySpendsBySector = () => Promise<
  {
    agencyName: string;
    sectorSpends: {
      sector: string;
      amount: number;
    }[];
  }[]
>;

export const GetImpactData =
  (ctx: {
    getNaicsMap: GetNaicsMap;
    getGhgImpactBySectorId: GetGhgImpactBySectorId;
    getAgencySpendsBySector: GetAgencySpendsBySector;
  }) =>
  async (): Promise<AgencySectorImpacts[]> => {
    const naicsPromise = ctx.getNaicsMap();
    const impactBySectorPromise = ctx.getGhgImpactBySectorId();
    const agencySpendsBySectorPromise = ctx.getAgencySpendsBySector();
    const [naics, impactBySector, agencySpendsBySector] = await Promise.all([
      naicsPromise,
      impactBySectorPromise,
      agencySpendsBySectorPromise,
    ]);
    return agencySpendsBySector.map((agencySpendBySector) => {
      return {
        name: agencySpendBySector.agencyName,
        sectors: agencySpendBySector.sectorSpends.map((sectorSpend) => {
          const sector = getCanonicalSector(naics, sectorSpend.sector);
          return {
            amount: sectorSpend.amount,
            kgC02Eq: impactBySector[sector.code] * sectorSpend.amount,
            sector,
          };
        }),
      };
    });
  };

export const getSankeyFlows = (
  agencySectorImpacts: AgencySectorImpacts[],
  filterOptions: {
    kgCO2Threshold: number;
    filterText: string;
  },
) => {
  // Get all agency impacts that flow to an individual sector.
  /*
  const sectorInputs: Record<string, SectorImpact[]> = {};
  agencySectorImpacts.forEach((agencySectorImpact) => {
    agencySectorImpact.sectors.forEach((agencySector) => {
      sectorInputs[agencySector.sector] = sectorInputs[agencySector.sector] || [];
      sectorInputs[agencySector.sector].push(agencySector);
    });
  });
  */

  // Get flows, working backward from target to source.
  return (
    agencySectorImpacts
      .filter((agencySectorImpact) =>
        agencySectorImpact.name.toLowerCase().includes(filterOptions.filterText.toLowerCase()),
      )
      // Filter matching agency names.
      .flatMap((agency) => {
        return (
          agency.sectors
            // for now, rather than group, just filter out sectors less than the threshold.
            .filter((sector) => sector.kgC02Eq > filterOptions.kgCO2Threshold)
            .map((sectorImpact) => {
              return {
                source: agency.name,
                target: sectorImpact.sector.description,
                value: sectorImpact.kgC02Eq,
              };
            })
        );
      })
  );
};

export const filterAgencyImpacts = (
  agencySectorImpacts: AgencySectorImpacts[],
  filterText: string,
) => {
  return agencySectorImpacts.filter((agencySectorImpact) =>
    agencySectorImpact.name.toLowerCase().includes(filterText.toLowerCase()),
  );
};
