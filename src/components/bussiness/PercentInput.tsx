import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';

type PercentInputProps = {
  onDebouncedChange: (percent: number) => void;
};
const PercentInput = ({ onDebouncedChange }: PercentInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(Number(value));
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <Input
      placeholder='درصد مورد نظر را وارد کنید'
      type='number'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default PercentInput;
