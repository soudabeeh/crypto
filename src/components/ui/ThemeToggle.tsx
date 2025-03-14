import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className='p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg'
      onClick={toggleTheme}
    >
      {theme === 'dark' ? '🌙 دارک' : '☀️ لایت'}
    </button>
  );
};
