import { SellOrders } from '@/models/MarketDetail';
import { MarketsList } from '../models/market';
import axiosInstance from './axiosInstance';

export const fetchMarkets = async (): Promise<MarketsList> => {
  try {
    const response = await axiosInstance.get('/v1/mkt/markets/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch hotels: Unknown error');
  }
};

export const fetchSellOrders = async (
  marketId: number
): Promise<SellOrders> => {
  try {
    const response = await axiosInstance.get(
      `/v2/mth/actives/${marketId}/?type=sell`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch hotels: Unknown error');
  }
};

export const fetchBuyOrders = async (marketId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/v2/mth/actives/${marketId}/?type=buy`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch hotels: Unknown error');
  }
};

export const fetchTransactions = async (marketId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/v1/mth/matches/${marketId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch hotels: Unknown error');
  }
};
