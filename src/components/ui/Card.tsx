import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  handleClick: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, handleClick }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer dark:bg-gray-700 ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Card;
