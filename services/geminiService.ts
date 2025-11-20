
import { GoogleGenAI, Type } from '@google/genai';
import type { FormData, VideoScript } from '../types';

const schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "영상의 시선을 사로잡는 매력적인 제목",
    },
    concept: {
      type: Type.STRING,
      description: "영상의 전반적인 컨셉을 한두 문장으로 요약",
    },
    scenes: {
      type: Type.ARRAY,
      description: "영상 시나리오를 구성하는 정확히 8개의 장면 배열",
      items: {
        type: Type.OBJECT,
        properties: {
          sceneNumber: {
            type: Type.INTEGER,
            description: "장면 번호 (1부터 8까지)",
          },
          visual: {
            type: Type.STRING,
            description: "해당 장면에서 화면에 보여질 시각적 요소에 대한 상세하고 생생한 묘사 (카메라 워크, 배경, 인물, 제품 등)",
          },
          narration: {
            type: Type.STRING,
            description: "성우 나레이션, 배경음악, 효과음 등에 대한 설명. 대사가 없다면 '배경음악' 또는 '효과음' 등으로 표기",
          },
          onScreenText: {
            type: Type.STRING,
            description: "화면에 표시될 자막 또는 텍스트. 텍스트가 없다면 '없음'으로 표기",
          },
        },
        required: ["sceneNumber", "visual", "narration", "onScreenText"],
      },
    },
  },
  required: ["title", "concept", "scenes"],
};

export const generatePrompt = async (formData: FormData): Promise<VideoScript> => {
  // Initialize the client inside the function to prevent top-level crashes
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { productName, keyFeatures, targetAudience, vibe, length } = formData;

  const prompt = `
    당신은 숏폼 비디오 광고 제작 전문가입니다. 다음 정보를 바탕으로 매우 창의적이고 시청자의 시선을 사로잡을 수 있는 ${length} 길이의 홍보 영상 스크립트를 작성해주세요.

    - 제품/서비스 이름: ${productName}
    - 핵심 특징 및 장점: ${keyFeatures}
    - 타겟 고객: ${targetAudience}
    - 영상의 전체적인 분위기: ${vibe}

    **필수 요구사항:**
    1. **전체 스크립트는 반드시 정확히 8개의 장면(Scene)으로 구성되어야 합니다.**
    2. 각 장면은 시각적 묘사, 나레이션/음악, 화면에 표시될 텍스트로 구성되어야 합니다.
    3. 전체 스토리가 자연스럽게 연결되고, 기승전결이 뚜렷해야 합니다.
    4. 마지막 8번째 장면에는 강력한 콜투액션(Call-to-Action)을 포함해주세요.

    결과는 반드시 지정된 JSON 형식으로만 응답해야 합니다.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    // Validate the parsed response shape
    if (parsedResponse.title && parsedResponse.concept && Array.isArray(parsedResponse.scenes)) {
        return parsedResponse as VideoScript;
    } else {
        throw new Error("AI 응답이 예상된 형식이 아닙니다.");
    }

  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    throw new Error('AI 스크립트 생성에 실패했습니다.');
  }
};
