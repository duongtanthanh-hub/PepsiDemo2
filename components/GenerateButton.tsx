
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="bg-yellow-400 text-[#001f40] px-8 py-4 rounded-full text-xl font-bold
                 transition-all duration-300 ease-in-out
                 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/50 hover:scale-105
                 active:scale-95
                 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
                 flex items-center justify-center min-w-[280px]"
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          <span className="ml-3">Generating Your Moment...</span>
        </>
      ) : (
        'Generate My Tet Moment!'
      )}
    </button>
  );
};

export default GenerateButton;
