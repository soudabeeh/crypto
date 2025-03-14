import { Market } from '@/models/market';
import { getChangeColor } from '@/helper/functions';
import MarketCard from '@/components/bussiness/MarketCard';
import MarketInfo from '@/components/bussiness/MarketInfo';
import { Card } from '../ui';

type MarketListProps = {
  markets: Market[];
  handleClickCard: (id: number) => void;
};

const MarketList = ({ markets, handleClickCard }: MarketListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8'>
      {markets.map((market: Market) => (
        <Card
          key={market.id}
          className='p-4 flex flex-col justify-between text-black '
          handleClick={handleClickCard.bind(null, market.id)}
        >
          <div className='flex flex-col justify-between h-full gap-8'>
            <MarketCard market={market} />
            <div className='flex flex-col gap-2'>
              <MarketInfo
                label='قیمت لحظه‌ای'
                value={market.price_info.price}
                valueColor='text-black dark:text-white'
              />
              <MarketInfo
                label='تغییر ۲۴ ساعت گذشته'
                value={market.price_info.change}
                valueColor={getChangeColor(Number(market.price_info.change))}
                className={{ direction: 'ltr' }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MarketList;
