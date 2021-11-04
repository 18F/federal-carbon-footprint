import type { RequestHandler } from '@sveltejs/kit';

import { getTestData } from '$data/transforms/spending';

export const get: RequestHandler = async ({ params }) => {
  const testData = await getTestData();
  if (testData) {
    return {
      body: testData,
    };
  }
};
