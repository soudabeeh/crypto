import { useMemo, useState } from 'react';
import { MarketsList } from '../../models/market';
import { useQuery } from '@tanstack/react-query';
import { fetchMarkets } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const useMarketsController = () => {
  const PAGE_SIZE = 10;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'IRT' | 'USDT'>('IRT');
  const [pageMap, setPageMap] = useState<{ IRT: number; USDT: number }>({
    IRT: 1,
    USDT: 1,
  });
  const {
    data,
    isLoading: isLoadingMarkets,
    error: errorFetchingMarkets,
  } = useQuery<MarketsList, Error>({
    queryKey: ['merkets'],
    queryFn: fetchMarkets,
  });

  const handleTabChange = (index: number) => {
    setActiveTab(index === 0 ? 'IRT' : 'USDT');
  };

  const handlePageChange = (page: number) => {
    setPageMap((prev) => ({ ...prev, [activeTab]: page }));
  };

  const paginatedMarkets = useMemo(() => {
    if (!data) return [];
    const filteredMarkets = data.results.filter(
      (m) => m.currency2.code === activeTab
    );
    const startIndex = (pageMap[activeTab] - 1) * PAGE_SIZE;
    return filteredMarkets.slice(startIndex, startIndex + PAGE_SIZE);
  }, [data, activeTab, pageMap]);

  const calculateTotal = Math.ceil(
    (data?.results.filter((market) => market.currency2.code === activeTab)
      .length || 0) / PAGE_SIZE
  );

  const currentPage = pageMap[activeTab];

  const handleClickCard = (merket_id: number) => {
    navigate(`/markets/${merket_id}`);
  };
  return {
    isLoadingMarkets,
    errorFetchingMarkets,
    handleTabChange,
    paginatedMarkets,
    calculateTotal,
    currentPage,
    handlePageChange,
    handleClickCard,
  };
};

export default useMarketsController;
