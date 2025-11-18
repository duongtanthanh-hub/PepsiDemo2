
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="bg-[#002a52] p-4 rounded-2xl border-2 border-yellow-400 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex justify-center items-center relative overflow-hidden shadow-inner shadow-black/50">
       <div className="absolute inset-2 border-2 border-yellow-400/70 rounded-lg pointer-events-none"></div>
      
      {isLoading && (
        <div className="text-center text-yellow-400">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-semibold animate-pulse">Your special moment is being created...</p>
          <p className="mt-2 text-sm text-gray-300">This can take a moment, please wait.</p>
        </div>
      )}
      {!isLoading && imageUrl && (
        <img src={imageUrl} alt="Generated Tet Moment" className="max-w-full max-h-full h-auto w-auto object-contain rounded-lg shadow-2xl" />
      )}
      {!isLoading && !imageUrl && (
        <div className="text-center text-gray-400">
          <p className="text-lg">Your generated image will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
