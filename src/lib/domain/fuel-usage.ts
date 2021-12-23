/*
 * As a placeholder, hardcode some data. These sort of functions should ideally
 * download the data from a source location and cache it on the local
 * filesystem.
 * The format of the returned data should ideally not be altered from the
 * source format, other than having been loaded into a native TS datatype.
 */
export const getRawFuelUsageData = () => {
  return [
    ['Diesel', 12.9, 109.6],
    ['Fuel Oil', 1.8, 15.7],
    ['Gasoline', 5.1, 43.3],
    ['Jet Fuel', 40.6, 345.0],
    ['Renewables', 1.3, 11.1],
    ['Electricity', 20.5, 173.8],
    ['Natural Gas', 15.1, 128.3],
    ['Other', 2.6, 22.3],
  ];
};
