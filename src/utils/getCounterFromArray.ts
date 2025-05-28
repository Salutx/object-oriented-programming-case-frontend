/* eslint-disable @typescript-eslint/no-explicit-any */

import padHelper from "./padHelper";

const getCounterFromArray = (array?: any[]): string => {
  if (!array) return "00";

  const { length } = array;
  const counter = padHelper.padStart(length);
  return counter;
};

export default getCounterFromArray;
