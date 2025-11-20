import React from 'react';

const FilmReelIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <FilmReelIcon className="w-8 h-8 text-indigo-400"/>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              AI 홍보영상 프롬프트 생성기
            </h1>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">(주)한국강사교육진흥원 | 수석연구원 강연례</p>
          </div>
        </div>
      </div>
    </header>
  );
};