
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Uploader from './components/Uploader';
import LetterSelector from './components/LetterSelector';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import ErrorMessage from './components/ErrorMessage';
import { LUCKY_LETTER_OPTIONS } from './constants';
import { generateTetImage } from './services/geminiService';
import type { LuckyLetter } from './types';

function App() {
  const [uploadedImage, setUploadedImage] = useState<{ file: File, previewUrl: string, base64: string } | null>(null);
  const [luckyLetter, setLuckyLetter] = useState<LuckyLetter>('T');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setError('Please upload a JPG or PNG image.');
        return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1] || '';
        setUploadedImage({
            file,
            previewUrl: URL.createObjectURL(file),
            base64,
        });
        setGeneratedImage(null); // Clear previous generation
    };
    reader.onerror = () => {
        setError('Could not read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload a family photo first!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const selectedOption = LUCKY_LETTER_OPTIONS.find(opt => opt.value === luckyLetter);
    if (!selectedOption) {
      setError('Invalid lucky letter selected.');
      setIsLoading(false);
      return;
    }

    try {
      const prompt = selectedOption.getPrompt();
      const imageMimeType = uploadedImage.file.type;
      const resultBase64 = await generateTetImage(prompt, uploadedImage.base64, imageMimeType);
      
      if (resultBase64) {
        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
      } else {
        setError('Failed to generate image. The API did not return image data.');
      }
    } catch (err: unknown) {
      console.error('Error during image generation:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`An error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, luckyLetter]);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#001f40] to-[#003366] text-white font-sans">
        <main className="relative z-10 bg-black/40 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-4xl w-full my-8 border border-white/20">
            <Header />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <Uploader onImageUpload={handleImageUpload} imagePreviewUrl={uploadedImage?.previewUrl} disabled={isLoading} />
                <LetterSelector 
                    selectedLetter={luckyLetter} 
                    onLetterChange={(e) => setLuckyLetter(e.target.value as LuckyLetter)} 
                    options={LUCKY_LETTER_OPTIONS}
                    disabled={isLoading}
                />
            </div>

            <div className="mt-8 text-center">
                <GenerateButton 
                    onClick={handleGenerateClick} 
                    isLoading={isLoading} 
                    disabled={!uploadedImage || isLoading} 
                />
            </div>
            
            {error && <ErrorMessage message={error} />}

            <div className="mt-10">
                <ImageDisplay imageUrl={generatedImage} isLoading={isLoading} />
            </div>
        </main>
    </div>
  );
}

export default App;
