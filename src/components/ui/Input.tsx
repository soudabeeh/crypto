interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label className='text-sm font-medium text-gray-700 text-right dark:text-white'>
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition text-sm border-gray-300  ${className} `}
        {...props}
      />
    </div>
  );
};

export default Input;
