import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  loading: string;
  name: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isLoading, 
  disabled = false, 
  name, 
  loading 
}) => {
  const buttonState = isLoading ? loading : name;
  
  return (
    <button
      type="submit"
      className={`
        w-full 
        py-4 
        px-2 
        rounded-lg 
        transition-all 
        duration-300 
        flex 
        items-center 
        justify-center 
        text-base
        text-white
      

        ${isLoading || disabled 
          ? 'bg-blue-300 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
      `}
      disabled={isLoading || disabled}
    >
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {buttonState}
    </button>
  );
};

export default SubmitButton;