import * as spendingImpact from './spending-impact';
import type { NaicsSector } from '$lib/domain/naics';

describe('spending impact', () => {
  it('groupAgencyImpactByThreshold', () => {
    it('groups economic sectors by threshold', async () => {});
    spendingImpact.groupAgencyImpactsByThreshold(MOCK_AGENCY_IMPACTS, 2000);
  });
  xit('getAllAgencySectorImpacts', async () => {
    const getAgencySectorImpacts = spendingImpact.GetAllAgencySectorImpacts({
      getNaics: () =>
        Promise.resolve([
          {
            code: '10',
            description: '10 description',
            parentCode: null,
          } as unknown as NaicsSector,
          {
            code: '101',
            description: '101 description',
            parentCode: '10',
          } as unknown as NaicsSector,
          {
            code: '102',
            description: '102 description',
            parentCode: '10',
          } as unknown as NaicsSector,
        ]),
      getGhgImpactBySectorId: () => {
        return Promise.resolve({
          '102': 1,
          '101': 2,
        });
      },
      getAgencies: () =>
        Promise.resolve({
          results: [
            {
              agency_id: 123,
              toptier_code: '123',
              abbreviation: '123',
              agency_name: '123',
              congressional_justification_url: '123',
              active_fy: '123',
              active_fq: '123',
              outlay_amount: 10,
              obligated_amount: 10,
              budget_authority_amount: 10,
              current_total_budget_authority_amount: 10,
              percentage_of_total_budget_authority: 10,
              agency_slug: '123',
            },
          ],
        }),
      getAgencySpendBySector: ({ agency, fiscalYear }: { agency: string; fiscalYear: number }) => {
        return Promise.resolve([
          {
            amount: 10,
            code: '101',
            id: null,
            name: '101',
          },
        ]);
      },
    });
  });
});

const MOCK_AGENCY_IMPACTS = [
  {
    name: 'agency1',
    sectors: [
      {
        amount: 100,
        sector: '10',
        name: 'agency1 name',
        kgC02Eq: 1000,
      },
      {
        amount: 100,
        sector: '20',
        name: 'agency1 name',
        kgC02Eq: 1000,
      },
    ],
  },
  {
    name: 'agency2',
    sectors: [
      {
        amount: 2500,
        sector: '20',
        name: 'agency1 name',
        kgC02Eq: 1000,
      },
      {
        amount: 2500,
        sector: '20',
        name: 'agency1 name',
        kgC02Eq: 1000,
      },
    ],
  },
];
