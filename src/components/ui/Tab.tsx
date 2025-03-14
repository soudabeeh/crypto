import React, { ReactNode } from 'react';

interface TabProps {
  label: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div className='text-black'>
      <div>{children}</div>
    </div>
  );
};

export default Tab;
