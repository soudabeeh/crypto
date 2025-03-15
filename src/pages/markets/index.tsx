import { Tab, Tabs, Pagination } from '@/components/ui';
import useMarketsController from './useMarketsController';
import MarketList from '@/components/bussiness/MarketList';

const TABS = ['پایه تومان', 'پایه تتر'];

const Markets = () => {
  const {
    isLoadingMarkets,
    errorFetchingMarkets,
    handleTabChange,
    paginatedMarkets,
    calculateTotal,
    currentPage,
    handlePageChange,
    handleClickCard,
  } = useMarketsController();

  if (isLoadingMarkets) {
    return <div className='text-black text-center'>Loading...</div>;
  }

  if (errorFetchingMarkets) {
    return <div className='text-red-500 text-center'>خطایی رخ داده است!</div>;
  }

  return (
    <div className='py-10 px-6 h-screen  bg-white dark:bg-gray-800'>
      <Tabs onTabChange={handleTabChange}>
        {TABS.map((tab) => (
          <Tab key={tab} label={tab}>
            <div>{tab}</div>
          </Tab>
        ))}
      </Tabs>

      <MarketList
        markets={paginatedMarkets}
        handleClickCard={handleClickCard}
      />

      <Pagination
        totalPages={calculateTotal}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Markets;
