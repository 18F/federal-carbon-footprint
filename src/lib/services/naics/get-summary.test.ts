import { getNaicsMap } from '$lib/adapters/naics';
import { describe, expect, it } from 'vitest';
import { GetSectorSummary } from './get-summary';

describe('getSummary', () => {
  it('should return a description of the specified sector', async () => {
    const racetracksCode = "711212";
    const getSummary = GetSectorSummary({getNaicsMap})

    const result = await getSummary(racetracksCode);

    expect(result.ok ? result.value : null).toEqual({
      "description": "Racetracks",
    });
  });
});
