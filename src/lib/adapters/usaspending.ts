import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';

import { GetNaics, NaicsCode } from '$lib/domain/naics';

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

export const getSpending = (ctx: Context) => () => {
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
  }).then((data) => {
    return data;
  });
};

const NaicsReference = t.type({
  results: t.array(
    t.type({
      naics: NaicsCode,
      naics_description: t.string,
      count: t.number,
    }),
  ),
});
type NaicsReference = t.TypeOf<typeof NaicsReference>;

export const UsaSpendingGetNaics =
  (ctx: Context): GetNaics =>
  () => {
    return fetchServiceData<NaicsReference>(ctx, '/references/naics/').then((results) => {
      return results.results.map((result) => {
        return {
          code: result.naics,
          description: result.naics_description,
          /*parentCode:
              result.naics.length > 2
                ? (result.naics.slice(
                    0,
                    result.naics.length,
                  ) as unknown as NaicsCode)
                : null,*/
          parentCode: null,
        };
      });
    });
  };

export const validateNaics = (data: unknown): NaicsReference => {
  return pipe(
    NaicsReference.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

const rangeForFiscalYear = (fiscalYear: number) => {
  return {
    start_date: `${fiscalYear - 1}-10-01`,
    end_date: `${fiscalYear}-09-30`,
  };
};

const GetAllPages =
  (ctx: Context) =>
  <T extends (ctx: Context, ...args: unknown[]) => any>(getPage: T) =>
  async (opts: Parameters<T>[1]) => {
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
  return fetchServiceData<SpendingByNaicsCategoryPage>(ctx, '/search/spending_by_category/naics/', {
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
  });
};

export const validateSpendingByNaicsCategoryPage = (data: unknown): SpendingByNaicsCategoryPage => {
  return pipe(
    SpendingByNaicsCategoryPage.decode(data),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

export const GetAgencySpendBySector = (ctx: Context) =>
  GetAllPages(ctx)<typeof getSpendingByNaicsCategoryPage>(getSpendingByNaicsCategoryPage);

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

export const validateAgencies = (agencies: unknown): UsaSpendingAgencyResults => {
  return pipe(
    UsaSpendingAgencyResults.decode(agencies),
    fold(
      (errors) => {
        const msg = errors.map((error) => error.context.map(({ key }) => key).join('.'));
        throw new Error(`Error decoding service response ${msg}`);
      },
      (value) => value,
    ),
  );
};

export const GetAgencies = (ctx: Context) => (): Promise<UsaSpendingAgencyResults> => {
  return fetchServiceData<UsaSpendingAgencyResults>(
    ctx,
    // This is the sort order used by here: https://www.usaspending.gov/agency
    // For speed purposes, use it, because the server appears to cache results.
    '/references/toptier_agencies/?sort=percentage_of_total_budget_authority&order=desc',
  );
};
