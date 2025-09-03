/**
 * Convert a percentage to a bps
 * @param percent - The percentage to convert
 * @returns The bps
 */
export const percentToBps = (percent: number): number => percent * 100;

/**
 * Convert a bps to a percentage
 * @param bps - The bps to convert
 * @returns The percentage
 */
export const bpsToPercent = (bps: number): number => bps / 100;
