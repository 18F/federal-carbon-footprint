import reporter from 'io-ts-reporters';

import * as naics from './naics';

describe('naics domain', () => {
  describe('code definition is valid', () => {
    it('must be a string', () => {
      const result = reporter.report(naics.NaicsCode.decode(1));
      expect(result.length).toEqual(1);
    });
    it('must be a string with length greater than 2', () => {
      const result = reporter.report(naics.NaicsCode.decode('1'));
      expect(result.length).toEqual(1);
    });
    it('must be a string with length less than 7', () => {
      const result = reporter.report(naics.NaicsCode.decode('1234567'));
      expect(result.length).toEqual(1);
    });
    it('must be a number', () => {
      const result = reporter.report(naics.NaicsCode.decode('123a56'));
      expect(result.length).toEqual(1);
    });
    it('validates with legal code', () => {
      const result = reporter.report(naics.NaicsCode.decode('123456'));
      expect(result.length).toEqual(0);
    });
  });
});
