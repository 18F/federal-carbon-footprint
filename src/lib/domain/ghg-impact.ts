// Mapping of NAICS Code : number (kg CO2 eq)
export type GhgImpactBySectorId = Record<string, number>;
export type GetGhgImpactBySectorId = () => Promise<GhgImpactBySectorId>;
