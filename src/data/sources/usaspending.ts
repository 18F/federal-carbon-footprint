import memoizee from 'memoizee';

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

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

const getAllPages =
  <T extends (ctx: Context, ...args: any) => any>(getPage: T) =>
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

type AgencySpendingByCategoryOptions = {
  agency: string;
  fiscalYear: number;
};
export const getAgencySpendBySectorPage = (
  ctx: Context,
  opts: AgencySpendingByCategoryOptions,
  page: number,
) => {
  // https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/search/spending_by_category/naics.md
  return fetchServiceData<{
    category: string;
    limit: number;
    page_metadata: {
      page: number;
      next: null | number;
      previous: null | number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
    messages: string;
    results: {
      amount: number;
      code: string;
      id: any;
      name: string;
    }[];
  }>(ctx, '/search/spending_by_category/naics/', {
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

export const getAgencySpendBySector = getAllPages<
  typeof getAgencySpendBySectorPage
>(getAgencySpendBySectorPage);

export const getAgencies = (ctx: Context) => {
  return fetchServiceData<
    {
      id: number;
      subtier_agency: {
        abbreviation: null;
        name: string;
      };
      toptier_agency: {
        abbreviation: string;
        name: string;
        toptier_code: string;
      };
      toptier_flag: boolean;
    }[]
  >(ctx, `/autocomplete/funding_agency/`, {
    limit: 1000,
    search_text: 'defense',
  });
};
