import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchBuyOrders,
  fetchSellOrders,
  fetchTransactions,
} from '../../services/api';
import { useParams } from 'react-router-dom';
import { convertTime } from '@/helper/functions';
import { Order } from '@/models/MarketDetail';
import PercentInput from '@/components/bussiness/PercentInput';
import NProgress from 'nprogress';

const API_MAP = {
  sell: fetchSellOrders,
  buy: fetchBuyOrders,
  transactions: fetchTransactions,
} as const;
type TabType = keyof typeof API_MAP;
const TABS: TabType[] = ['buy', 'sell', 'transactions'];

const useMarketDetailController = () => {
  const { id } = useParams();
  const [totalPercentRow, setTotalPercentRow] = useState<Order[]>([
    {
      amount: '',
      value: '',
      price: '',
      remain: '',
    },
  ]);
  const [activeTab, setActiveTab] = useState<TabType>('buy');

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [activeTab, id],
    queryFn: () => API_MAP[activeTab](Number(id)),
    enabled: Boolean(activeTab),
    refetchInterval: 3000,
    staleTime: 3000,
  });

  useEffect(() => {
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  const calcTotal = (orders: Order[], key: keyof (typeof orders)[0]) => {
    return orders.reduce((sum, order) => Number(sum) + Number(order[key]), 0);
  };

  const calcWeightedAvg = (orders: Order[]) => {
    const weightedAvgPrice = orders.reduce(
      (acc, order) => {
        acc.totalPrice += Number(order.price) * Number(order.amount);
        acc.totalAmount += Number(order.amount);
        return acc;
      },
      { totalPrice: 0, totalAmount: 0 }
    );
    const avgPrice = weightedAvgPrice.totalAmount
      ? weightedAvgPrice.totalPrice / weightedAvgPrice.totalAmount
      : 0;

    return avgPrice;
  };

  const processedData = useMemo(() => {
    if (!data) return [];

    if (activeTab === 'transactions') {
      return data.slice(0, 10);
    }

    const orders = data.orders.slice(0, 10);
    const totalRemain = calcTotal(orders, 'remain');
    const totalValue = calcTotal(orders, 'value');
    const avgPrice = calcWeightedAvg(orders);

    return [
      ...orders,
      {
        amount: 'مجموع',
        value: totalValue,
        price: avgPrice,
        remain: totalRemain,
      },
    ];
  }, [data, activeTab]);

  const handleChangePercent = (percent: number) => {
    const item = processedData.find((item: Order) => item.amount === 'مجموع');
    if (!item) return;
    const updatedData = [
      {
        amount: item.amount,
        value: item.value * percent,
        price: item.price * percent,
        remain: item.remain * percent,
      },
    ];

    setTotalPercentRow(updatedData);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(TABS[index] || 'buy');
  };

  const columns = [
    {
      header: 'مقدار',
      accessor: 'amount',
    },
    {
      header: 'ارزش',
      accessor: 'value',
    },
    {
      header: 'قیمت',
      accessor: 'price',
    },
    {
      header: 'باقی‌مانده',
      accessor: 'remain',
    },
  ];

  const percentColumns = [
    {
      header: 'درصد مورد نظر',
      accessor: 'amount',
      renderCell: () => (
        <div className='m-auto w-1/2'>
          <PercentInput onDebouncedChange={handleChangePercent} />
        </div>
      ),
    },
    {
      header: 'ارزش محاسبه شده',
      accessor: 'value',
    },
    {
      header: 'قیمت محاسبه شده',
      accessor: 'price',
    },
    {
      header: 'باقی‌مانده محاسبه شده',
      accessor: 'remain',
    },
  ];

  const transactionColumns = [
    {
      header: 'مقدار معامله',
      accessor: 'match_amount',
    },
    {
      header: 'قیمت',
      accessor: 'price',
    },
    {
      header: 'زمان',
      accessor: 'time',
      renderCell: (row) => convertTime(row.time),
    },
  ];

  return {
    data: processedData,
    isLoading,
    error,
    columns,
    transactionColumns,
    handleTabChange,
    activeTab,
    totalPercentRow,
    percentColumns,
  };
};

export default useMarketDetailController;
