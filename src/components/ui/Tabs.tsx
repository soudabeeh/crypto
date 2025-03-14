import React, { useState, ReactNode, ReactElement } from 'react';

interface TabsProps {
  children: ReactNode;
  onTabChange?: (activeTabIndex: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ children, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className='w-full p-4'>
      <div className='flex cursor-pointer  justify-center gap-4 rounded-lg border-1 border-gray-400 w-fit m-auto p-1'>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const childWithProps = child as ReactElement<{ label: string }>;
            return (
              <div
                className={`px-8 py-1 ${
                  activeTab === index
                    ? 'bg-gray-200 rounded-lg text-gray-600'
                    : 'text-gray-600 dark:text-white'
                }`}
                onClick={() => handleTabClick(index)}
              >
                {childWithProps.props.label}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
