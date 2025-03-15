import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPaginationNumbers = () => {
    const numbers: (number | string)[] = [
      1,
      '...',
      '...',
      '...',
      '...',
      '...',
      totalPages,
    ];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      numbers[1] = 2;
      numbers[2] = 3;
      numbers[3] = 4;
      numbers[4] = '...';
    } else if (currentPage >= totalPages - 2) {
      numbers[1] = '...';
      numbers[2] = totalPages - 3;
      numbers[3] = totalPages - 2;
      numbers[4] = totalPages - 1;
    } else {
      numbers[1] = '...';
      numbers[2] = currentPage - 1;
      numbers[3] = currentPage;
      numbers[4] = currentPage + 1;
      numbers[5] = '...';
    }

    return numbers;
  };

  return (
    <div className='flex items-center justify-center space-x-2 min-w-[200px] absolute bottom-20 left-1/2 transform -translate-x-1/2'>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className='px-3 py-1 text-black dark:text-white'
      >
        {`<`}
      </button>

      {getPaginationNumbers().map((num, index) => (
        <button
          key={index}
          onClick={() => typeof num === 'number' && onPageChange(num)}
          className={`px-3 py-1 ${
            currentPage === num
              ? 'bg-sky-700 text-white rounded-full'
              : 'text-gray-700 dark:text-white'
          }`}
          disabled={num === '...'}
        >
          {num}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='px-3 py-1 text-black dark:text-white'
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
