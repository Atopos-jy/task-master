import dayjs from "dayjs";

/**
 * Format date string
 * @param date Date string or object
 * @param format Format string, default 'YYYY-MM-DD HH:mm:ss'
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date | undefined,
  format: string = "YYYY-MM-DD HH:mm:ss",
): string => {
  if (!date) return "-";
  return dayjs(date).format(format);
};

/**
 * Format currency
 * @param amount Number
 * @param currency Currency symbol, default '¥'
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "¥",
): string => {
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Format number with commas
 * @param num Number
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
