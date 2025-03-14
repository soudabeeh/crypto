const HomeIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    width={size}
    height={size}
  >
    <path d='M3 9.5L12 3l9 6.5' />
    <path d='M19 10v10a1 1 0 0 1-1 1h-4v-5a2 2 0 0 0-4 0v5H6a1 1 0 0 1-1-1V10' />
  </svg>
);

export default HomeIcon;
