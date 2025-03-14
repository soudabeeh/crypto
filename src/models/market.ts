export interface Market {
  id: number;
  title: string;
  code: string;
  coming_soon: boolean;
  currency1: Currency;
  currency2: Currency;
  market_cap: string;
  otc_max_buy_amount: string;
  otc_max_sell_amount: string;
  otc_sell_percent: string;
  price: string;
  price_info: PriceInfo;
  volume_24h: string;
}

export interface Currency {
  id: number;
  code: string;
  color: string;
  decimal: number;
  decimal_amount: number;
  decimal_irt: number;
  etf: boolean;
  for_binvest: boolean;
  image: string;
  title: string;
  title_fa: string;
}

export interface PriceInfo {
  amount: number;
  change: string;
  created_at: number;
  max: string;
  mean: string;
  min: string;
  price: string;
  time: string;
  value: string;
}

export type MarketsList = {
  count: number;
  next: number;
  previous: number;
  results: Market[];
};
