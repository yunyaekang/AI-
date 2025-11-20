
import React, { useState, useCallback } from 'react';
import type { VideoScript } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultDisplayProps {
  script: VideoScript;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ script }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatScriptForCopy = useCallback(() => {
    let text = `제목: ${script.title}\n`;
    text += `컨셉: ${script.concept}\n\n`;
    text += "--- 장면별 스크립트 ---\n\n";

    script.scenes.forEach(scene => {
      text += `# 장면 ${scene.sceneNumber}\n`;
      text += `[화면] ${scene.visual}\n`;
      text += `[소리] ${scene.narration}\n`;
      text += `[자막] ${scene.onScreenText}\n\n`;
    });

    return text;
  }, [script]);

  const handleCopy = useCallback(() => {
    const scriptText = formatScriptForCopy();
    navigator.clipboard.writeText(scriptText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [formatScriptForCopy]);


  return (
    <div className="bg-gray-800 shadow-2xl rounded-2xl border border-gray-700 animate-fade-in">
        <div className="p-6 md:p-8 border-b border-gray-700">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text mb-2">{script.title}</h2>
                    <p className="text-gray-300">{script.concept}</p>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                    title="스크립트 복사"
                >
                    {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                    <span className="hidden md:inline">{isCopied ? '복사 완료!' : '복사'}</span>
                </button>
            </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
            {script.scenes.map((scene) => (
                <div key={scene.sceneNumber} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-purple-400 mb-3"># 장면 {scene.sceneNumber}</h3>
                    <div className="space-y-2 text-gray-300">
                        <p><strong className="font-medium text-indigo-300">[화면]:</strong> {scene.visual}</p>
                        <p><strong className="font-medium text-indigo-300">[소리]:</strong> {scene.narration}</p>
                        <p><strong className="font-medium text-indigo-300">[자막]:</strong> {scene.onScreenText}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
