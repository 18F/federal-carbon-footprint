import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';

const API_BASE = 'https://api.usaspending.gov/api/v2';

export type Context = {
  fetch: typeof fetch;
};

export const fetchServiceData = <T>(
  ctx: Context,
  endpoint: string,
  payload?: object,
): Promise<T> => {
  return ctx
    .fetch(`${API_BASE}${endpoint}`, {
      method: payload ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      return response.json() as Promise<T>;
    });
};

export const getSpending = (ctx: Context) => {
  // https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/spending.md
  return fetchServiceData(ctx, '/spending/', {
    // federal_account, object_class, recipient, award, budget_function,
    // budget_subfunction, agency, program_activity
    type: 'agency',
    //type: 'object_class',
    filters: {
      fy: '2020',
      quarter: 4,
    },
  });
};

export const getNaics = (ctx: Context, parent?: string) => {
  if (parent) {
    return fetchServiceData(ctx, `/references/naics/${parent}`);
  } else {
    return fetchServiceData(ctx, '/references/naics/');
  }
};

const rangeForFiscalYear = (fiscalYear: number) => {
  return {
    start_date: `${fiscalYear - 1}-10-01`,
    end_date: `${fiscalYear}-09-30`,
  };
};

const getAllPages =
  <T extends (ctx: Context, ...args: unknown[]) => any>(getPage: T) =>
  async (ctx: Context, opts: Parameters<T>[1]) => {
    let response: Awaited<ReturnType<T>>;
    const results: typeof response['results'] = [];
    let page = 0;
    do {
      page++;
      response = await getPage(ctx, opts, page);
      results.push(...response.results);
    } while (response.page_metadata.hasNext);
    return results;
  };

const SpendingByNaicsCategoryPage = t.type({
  category: t.string,
  limit: t.number,
  page_metadata: t.type({
    page: t.number,
    next: t.union([t.null, t.number]),
    previous: t.union([t.null, t.number]),
    hasNext: t.boolean,
    hasPrevious: t.boolean,
  }),
  messages: t.array(t.string),
  results: t.array(
    t.type({
      amount: t.number,
      code: t.string,
      id: t.null,
      name: t.string,
    }),
  ),
});
type SpendingByNaicsCategoryPage = t.TypeOf<typeof SpendingByNaicsCategoryPage>;

export const getSpendingByNaicsCategoryPage = (
  ctx: Context,
  opts: {
    agency: string;
    fiscalYear: number;
  },
  page: number,
): Promise<SpendingByNaicsCategoryPage> => {
  // https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/search/spending_by_category/naics.md
  return fetchServiceData<SpendingByNaicsCategoryPage>(
    ctx,
    '/search/spending_by_category/naics/',
    {
      filters: {
        agencies: [
          {
            type: 'funding',
            tier: 'toptier',
            name: opts.agency,
          },
        ],
        time_period: [rangeForFiscalYear(opts.fiscalYear)],
        //naics_codes: opts.naicsCodes,
      },
      limit: 100,
      page,
      //subawards: true,  // prime awards or sub-awards
    },
  );
};

export const validateSpendingByNaicsCategoryPage = (
  data: unknown,
): SpendingByNaicsCategoryPage => {
  return pipe(
    SpendingByNaicsCategoryPage.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) =>
          error.context.map(({ key }) => key).join('.'),
        );
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

export const getAgencySpendBySector = getAllPages<
  typeof getSpendingByNaicsCategoryPage
>(getSpendingByNaicsCategoryPage);

const UsaSpendingAgencyResults = t.type({
  results: t.array(
    t.type({
      agency_id: t.number,
      toptier_code: t.string,
      abbreviation: t.string,
      agency_name: t.string,
      congressional_justification_url: t.union([t.string, t.null]),
      active_fy: t.string,
      active_fq: t.string,
      outlay_amount: t.number,
      obligated_amount: t.number,
      budget_authority_amount: t.number,
      current_total_budget_authority_amount: t.number,
      percentage_of_total_budget_authority: t.number,
      agency_slug: t.string,
    }),
  ),
});
type UsaSpendingAgencyResults = t.TypeOf<typeof UsaSpendingAgencyResults>;

export const validateAgencies = (
  agencies: unknown,
): UsaSpendingAgencyResults => {
  return pipe(
    UsaSpendingAgencyResults.decode(agencies),
    fold(
      (errors) => {
        const msg = errors.map((error) =>
          error.context.map(({ key }) => key).join('.'),
        );
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

export const getAgencies = (
  ctx: Context,
): Promise<UsaSpendingAgencyResults> => {
  return fetchServiceData<UsaSpendingAgencyResults>(
    ctx,
    // This is the sort order used by here: https://www.usaspending.gov/agency
    // For speed purposes, use it, because the server appears to cache results.
    '/references/toptier_agencies/?sort=percentage_of_total_budget_authority&order=desc',
  );
};
