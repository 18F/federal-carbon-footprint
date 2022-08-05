import type { GetGhgImpactBySectorId } from '$lib/domain/ghg-impact';
import { getSectorHierarchy, NaicsSectorMap } from '$lib/domain/naics';
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
  async (
    agencyName?: string,
  ): Promise<{
    agencySectorImpacts: AgencySectorImpacts[];
    naics: NaicsSectorMap;
  }> => {
    const naicsPromise = ctx.getNaicsMap();
    const impactBySectorPromise = ctx.getGhgImpactBySectorId();
    const agencySpendsBySectorPromise = ctx.getAgencySpendsBySector();
    const [naics, impactBySector, agencySpendsBySector] = await Promise.all([
      naicsPromise,
      impactBySectorPromise,
      agencySpendsBySectorPromise,
    ]);
    const result = {
      agencySectorImpacts: agencySpendsBySector.map((agencySpendBySector) => {
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
      }),
      naics,
    };
    if (agencyName) {
      return {
        agencySectorImpacts: result.agencySectorImpacts.filter(
          (impact) => impact.name === agencyName,
        ),
        naics,
      };
    } else {
      return result;
    }
  };

export type ImpactData = Awaited<ReturnType<ReturnType<typeof GetImpactData>>>;

const getLinksForSectorImpact = (
  naics: NaicsSectorMap,
  agencyName: string,
  sectorImpact: SectorImpact,
  sectorDepth: number,
): AgencySectorImpactLink[] => {
  const sectors = getSectorHierarchy(naics, sectorImpact.sector.code);
  const links = [];
  for (const [index, sector] of sectors.entries()) {
    if (index === sectorDepth) {
      break;
    }
    links.push({
      source: index === 0 ? agencyName : sectors[index - 1].description,
      target: sector.description,
      value: sectorImpact.kgC02Eq,
    });
  }
  return links;
};

const flattenImpactLinks = (impactLinks: AgencySectorImpactLink[]): AgencySectorImpactLink[] => {
  const impactLinkValues: Record<string, AgencySectorImpactLink> = {};
  impactLinks.forEach((impactLink) => {
    const linkKey = `${impactLink.source}:${impactLink.target}`;
    impactLinkValues[linkKey] = impactLinkValues[linkKey] || {
      source: impactLink.source,
      target: impactLink.target,
      value: 0,
    };
    impactLinkValues[linkKey].value += impactLink.value;
  });
  return Object.values(impactLinkValues);
};

export const getSankeyFlows = (
  agencySectorImpacts: AgencySectorImpacts[],
  naics: NaicsSectorMap,
  filterOptions: {
    agencyName: string;
    kgCO2Threshold: number;
    sectorDepth: number;
  },
) => {
  return (
    flattenImpactLinks(
      agencySectorImpacts
        // Filter out non-matching agency names.
        .filter((agency) =>
          agency.name.toLowerCase().includes(filterOptions.agencyName.toLowerCase()),
        )
        .flatMap((agency) => {
          return agency.sectors.flatMap((sectorImpact) => {
            return getLinksForSectorImpact(
              naics,
              agency.name,
              sectorImpact,
              filterOptions.sectorDepth,
            );
          });
        }),
    )
      // for now, rather than group, just filter out sectors less than the threshold.
      .filter((sectorImpact) => {
        return sectorImpact.value > filterOptions.kgCO2Threshold;
      })
  );
};

const getEnterLinks = (sankeyFlows: AgencySectorImpactLink[], node: string) => {
  const links = sankeyFlows.filter((flow) => flow.target === node);
  return [...links, ...links.flatMap((link) => getEnterLinks(sankeyFlows, link.source))];
};

const getExitLinks = (sankeyFlows: AgencySectorImpactLink[], node: string) => {
  const links = sankeyFlows.filter((flow) => flow.source === node);
  return [...links, ...links.flatMap((link) => getExitLinks(sankeyFlows, link.target))];
};

// For a given link, return all links that flow into or out of ajacent nodes.
export const getFlowsForLink = (
  sankeyFlows: AgencySectorImpactLink[],
  agencySectorImpactLink: AgencySectorImpactLink,
) => {
  return [
    agencySectorImpactLink,
    ...getEnterLinks(sankeyFlows, agencySectorImpactLink.source),
    ...getExitLinks(sankeyFlows, agencySectorImpactLink.target),
  ];
};

export const linkInFlow = (link: AgencySectorImpactLink, flows: AgencySectorImpactLink[]) => {
  return flows.some(
    (flowLink) => link.source === flowLink.source && flowLink.target === link.target,
  );
};
