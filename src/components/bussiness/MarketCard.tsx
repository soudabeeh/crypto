import { Market } from '@/models/market';

type MarketCardProps = {
  market: Market;
};

const MarketCard = ({ market }: MarketCardProps) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row gap-2 items-center'>
        <div
          className='p-1 rounded-lg flex justify-center items-center w-14 h-14'
          style={{ backgroundColor: `#${market.currency1.color}` }}
        >
          <img src={market.currency1.image || ''} />
        </div>
        <div className='flex flex-col gap-1 items-start dark:text-white'>
          <div className='font-semibold'>{market.currency1.title_fa}</div>
          <div className='text-gray-400'>{market.title}</div>
        </div>
      </div>
      <div className='text-black dark:text-white'>...</div>
    </div>
  );
};

export default MarketCard;
