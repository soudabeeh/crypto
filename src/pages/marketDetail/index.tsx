import { Tab, Tabs } from '@/components/ui';
import useMarketDetailController from './useMarketDetailController';
import Table from '@/components/ui/Table';

const TABS = ['سفارشات خرید', 'سفارشات فروش', 'معاملات'];
const MarketDetail = () => {
  const {
    data,
    isLoading,
    error,
    handleTabChange,
    columns,
    activeTab,
    transactionColumns,
    percentColumns,
    totalPercentRow,
  } = useMarketDetailController();

  const tableColumns =
    activeTab === 'transactions' ? transactionColumns : columns;

  return (
    <div className='py-10 px-6 dark:bg-gray-800 h-screen'>
      <Tabs onTabChange={handleTabChange}>
        {TABS.map((tab) => (
          <Tab key={tab} label={tab}>
            <div>{tab}</div>
          </Tab>
        ))}
      </Tabs>

      <div className='text-black mt-6'>
        {isLoading && <div>Loading...</div>}
        {error && <div className='text-red-500'>خطایی رخ داده است!</div>}
        {!isLoading && !error && (
          <div className='flex flex-col gap-12 dark:text-white'>
            <Table columns={tableColumns} data={data} />
            {activeTab !== 'transactions' && (
              <Table columns={percentColumns} data={totalPercentRow} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDetail;
