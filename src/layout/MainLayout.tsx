import HomeIcon from '@/components/icons/HomeIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full flex items-center text-white bg-sky-700 p-4 font-vazir dark:bg-gray-900 '>
      <div
        className='absolute left-6 cursor-pointer'
        onClick={() => navigate('/markets')}
      >
        <HomeIcon />
      </div>
      <div className='m-auto'>کریپتوپین</div>
      <div className='absolute right-6'>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MainLayout;
