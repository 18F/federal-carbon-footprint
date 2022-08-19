import type { NaicsSector, NaicsSectorMap } from './entities';
import * as r from '$lib/result';

const getSector = (naics: NaicsSectorMap, code: string) => {
  const sector: NaicsSector = naics[code];
  if (!sector) {
    // If we can't find this code, try clipping the last digit until we find a match.
    if (code.length > 2) {
      return getSector(naics, code.slice(0, code.length - 1));
    }
    throw new Error(`Unknown sector: ${code}`);
  }
  return sector;
};

/**
 * Defined a canonical sector as the highest-parent sector with the same name as a given code.
 * We do this to avoid duplicates, as some NAICS sectors have parents with the same string
 * description as itself.
 */
export const getCanonicalSector = (naics: NaicsSectorMap, code: string): NaicsSector => {
  const sector = getSector(naics, code);
  // If there is no parent, this sector is canonical.
  if (sector.parentCode === null) {
    return sector;
  }

  // If parent description is different, treat this sector as the canonical one.
  const parent = getSector(naics, sector.parentCode);
  if (parent.description !== sector.description) {
    return sector;
  }

  // If parent description is the same, get its canonical sector.
  return getCanonicalSector(naics, parent.code);
};

/**
 * Define a "canonical parent" as the highest parent node with a unique description.
 * We do this because some NAICS sectors have parent sectors with identical descriptions.
 */
export const getCanonicalParentSector = (naics: NaicsSectorMap, code: string) => {
  const sector = getCanonicalSector(naics, code);
  if (sector.parentCode === null) {
    return null;
  }
  return getCanonicalSector(naics, sector.parentCode);
};

export const getSectorHierarchy = (naics: NaicsSectorMap, code: string) => {
  let currentSector = getCanonicalSector(naics, code);
  const sectors = [currentSector];
  currentSector = getCanonicalParentSector(naics, currentSector.code);
  while (currentSector !== null) {
    sectors.push(currentSector);
    currentSector = getCanonicalParentSector(naics, currentSector.code);
  }
  return sectors;
};

export type SectorSummary = {
  description: string;
};

export const getSectorSummaryByCode = (
  naics: NaicsSectorMap,
  sectorCode: string,
): r.Result<SectorSummary, Error> => {
  try {
    const foundSector = getCanonicalSector(naics, sectorCode);
    return r.Ok({
      description: foundSector.description,
    });
  } catch (e) {
    return r.Error(e);
  }
};
