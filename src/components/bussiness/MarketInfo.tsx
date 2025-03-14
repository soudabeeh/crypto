import { formatNumber } from '@/helper/functions';
import { CSSProperties } from 'react';

type MarketInfoProps = {
  label: string;
  value: string | number;
  valueColor: string;
  className?: CSSProperties;
};

const MarketInfo = ({
  label,
  value,
  valueColor,
  className,
}: MarketInfoProps) => (
  <div className='flex justify-between'>
    <div className='text-sm text-gray-700 dark:text-white'>{label}</div>
    <div className={`font-medium ${valueColor}`} style={className}>
      {formatNumber(Number(value))}
    </div>
  </div>
);

export default MarketInfo;
