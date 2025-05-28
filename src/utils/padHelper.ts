/* eslint-disable import/no-anonymous-default-export */
const padStart = (
  str?: string | number,
  maxLength = 2,
  fillChar = "0"
): string => {
  if (!str) return fillChar.repeat(maxLength);
  return str.toString().padStart(maxLength, fillChar);
};

const padEnd = (
  str: string | number,
  maxLength: number,
  fillChar: string
): string => {
  if (!str) return fillChar.repeat(maxLength);
  return str.toString().padEnd(maxLength, fillChar);
};

export default {
  padStart,
  padEnd,
};
