import { bpsToPercent, percentToBps } from './helper';

/**
 * Calculate the make bid and make ask prices based on the best bid, best ask, and spread
 * @param best_bid - The best bid price
 * @param best_ask - The best ask price
 * @param spread - The desired spread in bps
 * @returns The make bid and make ask prices
 */
export function calcMakeSpread(best_bid: number, best_ask: number, spread: number): { make_bid: number; make_ask: number } {
	const mid_price = (best_bid + best_ask) / 2;
	const make_bid = mid_price * (1 + bpsToPercent(spread) / 2);
	const make_ask = mid_price * (1 - bpsToPercent(spread) / 2);
	return { make_bid, make_ask };
}

/**
 * Check if there is a make opportunity based on the orders and the desired spread
 * @param orders - The order book of a market
 * @param spread - The desired spread in bps
 * @returns True if there is a make opportunity, false otherwise
 */
export function isMakeOportunity(orders: Order[], spread: number): boolean {
	const best_bid = orders.filter((order) => order.side === 'bid').sort((a, b) => a.priceAtlas - b.priceAtlas)[0] || 0;
	const best_ask = orders.filter((order) => order.side === 'ask').sort((a, b) => b.priceAtlas - a.priceAtlas)[0] || 0;

	if (!best_bid || !best_ask) return false;

	const current_spread = (best_ask.priceAtlas - best_bid.priceAtlas) / ((best_ask.priceAtlas + best_bid.priceAtlas) / 2);
	if (current_spread < spread) return false;

	return true;
}
