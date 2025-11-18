
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-6 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-center">
      <p><strong>Error:</strong> {message}</p>
    </div>
  );
};

export default ErrorMessage;
