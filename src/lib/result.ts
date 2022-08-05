export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export const Ok = <T>(data: T): Result<T, never> => {
  return { ok: true, value: data };
};

export const Error = <E>(error?: E): Result<never, E> => {
  return { ok: false, error };
};

export const getErrors = <T, E>(results: Result<T, E>[]): E[] => {
  return results.reduce(
    (retVal, result) => (!result.ok ? retVal.push(result) && retVal : retVal),
    [],
  );
};

export const getResults = <T, E>(results: Result<T, E>[]): T[] => {
  return results.reduce(
    (retVal, result) => (result.ok ? retVal.push(result) && retVal : retVal),
    [],
  );
};

export const combine = <T, E>(results: Result<T, E>[]): Result<T[], E[]> => {
  const result = results.reduce<{ errors: E[]; values: T[] }>(
    (retVal, result) => {
      if (result.ok === true) {
        retVal.values.push(result.value);
      } else {
        retVal.errors.push(result.error);
      }
      return retVal;
    },
    { errors: [], values: [] },
  );
  if (result.errors.length > 0) {
    return Error(result.errors);
  } else {
    return Ok(result.values);
  }
};
