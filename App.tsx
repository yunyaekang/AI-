
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generatePrompt } from './services/geminiService';
import type { FormData, VideoScript } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoScript, setVideoScript] = useState<VideoScript | null>(null);

  const handleFormSubmit = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setVideoScript(null);
    try {
      const script = await generatePrompt(formData);
      setVideoScript(script);
    } catch (e) {
      console.error(e);
      setError('스크립트 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg md:text-xl text-gray-300 mb-8">
            당신의 제품이나 서비스를 위한 홍보영상 스크립트를 AI를 통해 단 몇 초 만에 생성해보세요.
          </p>
          <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-700">
            <PromptForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">오류: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {videoScript && !isLoading && (
            <div className="mt-8">
              <ResultDisplay script={videoScript} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
