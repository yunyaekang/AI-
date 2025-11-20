import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <div className="mb-4">
            <p className="font-medium">(주)한국강사교육진흥원</p>
            <p>수석연구원 강연례</p>
        </div>
        <p>Powered by Google Gemini</p>
      </div>
    </footer>
  );
};