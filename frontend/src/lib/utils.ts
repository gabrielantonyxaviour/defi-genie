import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function roundUpToFiveDecimals(floatStr: string): string {
  // Parse the string to a float
  const num = parseFloat(floatStr);

  // If the string cannot be parsed to a number, throw an error
  if (isNaN(num)) {
    throw new Error("Invalid number string");
  }

  // Multiply by 10^5, round up using Math.ceil, and then divide back by 10^5
  const roundedNum = Math.ceil(num * 100000) / 100000;

  // Convert the number back to a string with 5 decimal places
  let result = roundedNum.toFixed(5);

  // If the result has more than 2 decimal places but they are all zeros, reduce to 2 decimals
  if (result.endsWith("000") || result.endsWith("00")) {
    result = parseFloat(result).toFixed(2);
  }

  return result;
}
