
import React, { useState } from 'react';
import type { FormData } from '../types';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface PromptFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

const InputField: React.FC<{ id: keyof FormData; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder: string; isTextArea?: boolean }> = ({ id, label, value, onChange, placeholder, isTextArea = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    ) : (
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    )}
  </div>
);

export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    keyFeatures: '',
    targetAudience: '',
    vibe: '역동적이고 활기찬',
    length: '30초',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="productName" label="제품/서비스 이름" value={formData.productName} onChange={handleChange} placeholder="예: 스마트 커피메이커 '모닝브루'" />
        <InputField id="targetAudience" label="타겟 고객" value={formData.targetAudience} onChange={handleChange} placeholder="예: 바쁜 아침을 보내는 20-30대 직장인" />
      </div>

      <InputField id="keyFeatures" label="핵심 특징 및 장점" value={formData.keyFeatures} onChange={handleChange} placeholder="예: 앱으로 원격 제어 가능, 개인 맞춤형 레시피, 빠른 추출 속도" isTextArea />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vibe" className="block text-sm font-medium text-gray-300 mb-2">영상 분위기</label>
          <select id="vibe" name="vibe" value={formData.vibe} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
            <option>역동적이고 활기찬</option>
            <option>감성적이고 따뜻한</option>
            <option>유머러스하고 재치있는</option>
            <option>전문적이고 신뢰감 있는</option>
            <option>신비롭고 고급스러운</option>
          </select>
        </div>
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">영상 길이</label>
          <select id="length" name="length" value={formData.length} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
            <option>15초 (숏폼)</option>
            <option>30초 (표준)</option>
            <option>60초 (정보성)</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          <MagicWandIcon className="w-5 h-5" />
          {isLoading ? '스크립트 생성 중...' : 'AI로 스크립트 생성하기'}
        </button>
      </div>
    </form>
  );
};
