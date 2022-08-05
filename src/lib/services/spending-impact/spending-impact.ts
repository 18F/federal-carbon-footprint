import type { GetGhgImpactBySectorId } from '$lib/domain/ghg-impact';
import { getSectorHierarchy, NaicsSectorMap } from '$lib/domain/naics';
import type { GetNaicsMap } from '$lib/domain/naics';
import { getCanonicalSector, NaicsSector } from '$lib/domain/naics';
import * as r from '$lib/result';

export type SectorImpact = {
  amount: number;
  kgC02Eq: number;
  sector: NaicsSector;
};

export type AgencySectorImpacts = {
  name: string;
  sectors: SectorImpact[];
};

type AgencySectorImpactNodeType = 'sector' | 'agency';

// Suitable for use by d3-sankey to represent the links between nodes.
export type AgencySectorImpactLink = {
  source: string;
  sourceType: AgencySectorImpactNodeType;
  target: string;
  targetType: AgencySectorImpactNodeType;
  value: number;
};

export type GetAgencySpendsBySector = () => Promise<
  r.Result<
    {
      agencyName: string;
      sectorSpends: {
        sector: string;
        amount: number;
      }[];
    }[],
    Error
  >
>;

export type ImpactData = {
  agencySectorImpacts: AgencySectorImpacts[];
  naics: NaicsSectorMap;
};

export const GetImpactData =
  (ctx: {
    getNaicsMap: GetNaicsMap;
    getGhgImpactBySectorId: GetGhgImpactBySectorId;
    getAgencySpendsBySector: GetAgencySpendsBySector;
  }) =>
  async (agencyName?: string): Promise<r.Result<ImpactData, Error>> => {
    const naicsPromise = ctx.getNaicsMap();
    const impactBySectorPromise = ctx.getGhgImpactBySectorId();
    const agencySpendsBySectorPromise = ctx.getAgencySpendsBySector();
    const [naics, impactBySector, agencySpendsBySectorResult] = await Promise.all([
      naicsPromise,
      impactBySectorPromise,
      agencySpendsBySectorPromise,
    ]);
    if (agencySpendsBySectorResult.ok == false) {
      return r.Error(agencySpendsBySectorResult.error);
    }
    const agencySpendsBySector = agencySpendsBySectorResult.value;
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
      return r.Ok({
        agencySectorImpacts: result.agencySectorImpacts.filter(
          (impact) => impact.name === agencyName,
        ),
        naics,
      });
    } else {
      return r.Ok(result);
    }
  };

const getLinksForSectorImpact = (
  naics: NaicsSectorMap,
  agencyName: string,
  sectorImpact: SectorImpact,
  sectorDepth: number,
): AgencySectorImpactLink[] => {
  const sectors = getSectorHierarchy(naics, sectorImpact.sector.code);
  const links: AgencySectorImpactLink[] = [];
  for (const [index, sector] of sectors.entries()) {
    if (index === sectorDepth) {
      break;
    }
    links.push({
      ...(index === 0
        ? {
            sourceType: 'agency',
            source: agencyName,
          }
        : {
            sourceType: 'sector',
            source: sectors[index - 1].description,
          }),
      target: sector.description,
      targetType: 'sector',
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
      ...impactLink,
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
