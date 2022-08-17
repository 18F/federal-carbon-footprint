import { describe, expect, it } from 'vitest';

import { getCanonicalParentSector, getCanonicalSector, getSectorSummaryByCode } from '.';
import type { NaicsSector, NaicsSectorMap } from './entities';

describe('naics logic', () => {
  describe('getCanonicalSector', () => {
    it('returns self with no parent', () => {
      expect(getCanonicalSector(MOCK_SECTORS, '10').code).toEqual('10');
    });
    it('traverses two parents and terminates at right point', () => {
      expect(getCanonicalSector(MOCK_SECTORS, '20111').code).toEqual('201');
    });
  });
  describe('getCanonicalParentSector', () => {
    it('handles null parents', () => {
      expect(getCanonicalParentSector(MOCK_SECTORS, '10')).toEqual(null);
    });
    it('traverses an identical parent and terminates', () => {
      expect(getCanonicalParentSector(MOCK_SECTORS, '2011').code).toEqual('20');
    });
    it('traverses multiple parents and terminates at first unique parent', () => {
      expect(getCanonicalParentSector(MOCK_SECTORS, '201110').code).toEqual('201');
    });
  });
  describe('getSectorSummaryByCode', () => {
    it('should return a SectorSummary for the provided sector code', () => {
      const result = getSectorSummaryByCode(MOCK_SECTORS, '201110');
  
      expect(result.ok ? result.value : null).toEqual({
        "description": "xyz*",
      });    
    });
    it('should return an error when a sector cannot be found for the provided sector code', () => {
      const result = getSectorSummaryByCode(MOCK_SECTORS, '0');
  
      expect(result.ok).toBe(false);  
      expect(result.ok === true ? null : result.error.message).toEqual("Unknown sector: 0");    
    });
  });
});

const MOCK_SECTORS: NaicsSectorMap = {
  '10': {
    code: '10',
    description: 'abc',
    parentCode: null,
  } as unknown as NaicsSector,
  '101': {
    code: '101',
    description: 'abcd',
    parentCode: '10',
  } as unknown as NaicsSector,
  '20': {
    code: '20',
    description: 'xy',
    parentCode: null,
  } as unknown as NaicsSector,
  '201': {
    code: '201',
    description: 'xyz',
    parentCode: '20',
  } as unknown as NaicsSector,
  '2011': {
    code: '2011',
    description: 'xyz',
    parentCode: '201',
  } as unknown as NaicsSector,
  '20111': {
    code: '20111',
    description: 'xyz',
    parentCode: '2011',
  } as unknown as NaicsSector,
  '201110': {
    code: '201110',
    description: 'xyz*',
    parentCode: '20111',
  } as unknown as NaicsSector,
};
