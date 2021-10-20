export const getDummyData = (ctx: { fetch: typeof fetch; baseUrl: string }) => {
  console.log('getting data', ctx);
  return ctx
    .fetch(`${ctx.baseUrl}/data/dummy.json`)
    .then(response => response.json());
};
