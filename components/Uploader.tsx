
import React from 'react';

interface UploaderProps {
  onImageUpload: (file: File) => void;
  imagePreviewUrl?: string;
  disabled: boolean;
}

const Uploader: React.FC<UploaderProps> = ({ onImageUpload, imagePreviewUrl, disabled }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl border border-white/30 h-full flex flex-col justify-between">
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-100">1. Upload Your Family Photo</label>
        <p className="text-sm text-gray-300 mb-4">Upload a JPG or PNG photo with at least two people for the best results.</p>
        <div className="mt-2 flex justify-center">
            <input
                type="file"
                id="imageUpload"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-yellow-400 file:text-[#001f40]
                    hover:file:bg-yellow-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
            />
        </div>
      </div>
      <div className="mt-4 w-full h-48 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-1 text-sm">Image Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
