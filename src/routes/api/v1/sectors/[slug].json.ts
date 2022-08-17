import type { RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ params }) => {
  return {
    body: { data: params.slug },
  };
};
