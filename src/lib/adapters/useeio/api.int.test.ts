import * as useeio from './api';

const USEEIO_API_KEY = process.env.VITE_USEEIO_API_KEY;

describe('useeio service integration', () => {
  it('getModelSectors returns data', async () => {
    const sectors = await useeio.getModelSectors({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    useeio.validateModelSectors(sectors);
  });

  it('getModelIndicators returns data', async () => {
    const modelIndicators = await useeio.getModelIndicators({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    // Validate shape of data.
    useeio.validateModelIndicators(modelIndicators);
  });

  it('getMatrixU returns data', async () => {
    const matrixU = await useeio.getMatrixU({
      fetch: window.fetch.bind(window),
      USEEIO_API_KEY,
    });
    // Validate shape of data.
    useeio.validateMatrixU(matrixU);
  });
});
