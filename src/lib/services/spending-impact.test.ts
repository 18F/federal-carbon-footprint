import * as spendingImpact from './spending-impact';
import type { NaicsSector } from '$lib/domain/naics';

describe('spending impact', () => {
  describe('getSankeyFlows', () => {
    xit('groups sectors by common parents', async () => {
      const flows = spendingImpact.getSankeyFlows(
        [
          {
            name: 'Dept of Imagination',
            sectors: [
              {
                amount: 100,
                sector: '101',
                name: 'fairy dust manufacturing',
                kgC02Eq: 1000,
              },
              {
                amount: 150,
                sector: '102',
                name: 'pixie dust manufacturing',
                kgC02Eq: 1500,
              },
              {
                amount: 150,
                sector: '201',
                name: 'hybrid tulips',
                kgC02Eq: 225,
              },
            ],
          },
        ],
        [
          {
            code: '10',
            description: 'magic potions',
            parentCode: null,
          } as unknown as NaicsSector,
          {
            code: '101',
            description: 'fairy dust manufacturing',
            parentCode: '10',
          } as unknown as NaicsSector,
          {
            code: '102',
            description: 'pixie dust manufacturing',
            parentCode: '10',
          } as unknown as NaicsSector,
          {
            code: '20',
            description: 'flower breeding',
            parentCode: null,
          } as unknown as NaicsSector,
          {
            code: '201',
            description: 'hybrid tulips',
            parentCode: '20',
          } as unknown as NaicsSector,
        ],
      );
      expect(flows).toEqual([
        {
          source: 'Dept of Imagination',
          target: 'magic potions',
          value: 250,
        },
        {
          source: 'magic potions',
          target: 'fairy dust manufacturing',
          value: 100,
        },
        {
          source: 'magic potions',
          target: 'pixie dust manufacturing',
          value: 150,
        },
        {
          source: 'Dept of Imagination',
          target: 'hybrid tulips',
          value: 225,
        },
      ]);
    });
  });
  xit('groupAgencyImpactByThreshold', () => {
    it('groups economic sectors by threshold', async () => {});
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
