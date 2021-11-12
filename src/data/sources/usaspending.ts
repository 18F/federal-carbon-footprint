import { fetch } from '../context';

const API_BASE = 'https://api.usaspending.gov/api/v2';

export const fetchServiceData = <T>(
  endpoint: string,
  payload?: object,
): Promise<T> => {
  return fetch(`${API_BASE}${endpoint}`, {
    method: payload ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json() as Promise<T>);
};

export const getSpending = () => {
  // https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/spending.md
  return fetchServiceData('/spending/', {
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

export const getNaics = (parent?: string) => {
  if (parent) {
    return fetchServiceData(`/references/naics/${parent}`);
  } else {
    return fetchServiceData('/references/naics/');
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
  <T extends (...args: any) => any>(getPage: T) =>
  async (opts: Parameters<T>[0]) => {
    let response: Awaited<ReturnType<T>>;
    const results: typeof response['results'] = [];
    let page = 0;
    do {
      page++;
      response = await getPage(opts, page);
      results.push(...response.results);
    } while (response.page_metadata.hasNext);
    return results;
  };

type SpendingByCategoryOptions = {
  naicsCodes: string[];
  fiscalYear: number;
};
const getSpendingByNaicsPage = (
  opts: SpendingByCategoryOptions,
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
  }>('/search/spending_by_category/naics/', {
    filters: {
      /*agencies: [
        {
          type: null,
          tier: null,
          name: null,
        },
      ],*/
      time_period: [rangeForFiscalYear(opts.fiscalYear)],
      naics_codes: opts.naicsCodes,
    },
    limit: 100,
    page,
    //subawards: true,  // prime awards or sub-awards
  });
};

export const getSpendingByNaics = getAllPages<typeof getSpendingByNaicsPage>(
  getSpendingByNaicsPage,
);

export const getTest = () =>
  getSpendingByNaics({ naicsCodes: ['1119'], fiscalYear: 2021 });
