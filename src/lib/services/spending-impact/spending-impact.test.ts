import type { NaicsSector } from '$lib/domain/naics';
import * as spendingImpact from './spending-impact';

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
                sector: {
                  code: '101',
                  description: 'fairy dust manufacturing',
                  parentCode: null,
                } as unknown as NaicsSector,
                kgC02Eq: 1000,
              },
              {
                amount: 150,
                sector: {
                  code: '102',
                  description: 'pixie dust manufacturing',
                  parentCode: null,
                } as unknown as NaicsSector,
                kgC02Eq: 1500,
              },
              {
                amount: 150,
                sector: {
                  code: '201',
                  description: 'hybrid tulips',
                  parentCode: null,
                } as unknown as NaicsSector,
                kgC02Eq: 225,
              },
            ],
          },
        ],
        {
          filterText: '',
          kgCO2Threshold: 1000,
        },
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
    spendingImpact.GetImpactData({
      getNaicsMap: () =>
        Promise.resolve({
          '10': {
            code: '10',
            description: '10 description',
            parentCode: null,
          } as unknown as NaicsSector,
          '101': {
            code: '101',
            description: '101 description',
            parentCode: '10',
          } as unknown as NaicsSector,
          '102': {
            code: '102',
            description: '102 description',
            parentCode: '10',
          } as unknown as NaicsSector,
        }),
      getGhgImpactBySectorId: () => {
        return Promise.resolve({
          '102': 1,
          '101': 2,
        });
      },
      getAgencySpendsBySector: () => {
        return Promise.resolve([
          {
            agencyName: 'usgs',
            sectorSpends: [{ sector: '10', amount: 10 }],
          },
        ]);
      },
    });
  });
});
