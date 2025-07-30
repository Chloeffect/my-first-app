import { GoogleGenAI, Type, Chat, Content, GenerateContentResponse } from "@google/genai";
import { MBTIResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to show a friendly message to the user
  // instead of throwing an error that crashes the app.
  // For this exercise, we assume the key is always present.
  console.error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

const resultSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "학생의 MBTI 유형에 대한 창의적이고 귀여운 별명 또는 제목. 예: '따뜻한 마음의 발명가'",
    },
    summary: {
      type: Type.STRING,
      description: "MBTI 유형에 기반한 학습 스타일을 요약한 긍정적이고 격려가 되는 한두 문장의 설명.",
    },
    strengths: {
      type: Type.ARRAY,
      description: "이 학습자가 가진 주요 강점들. 3-4가지 강점을 짧은 문장으로 나열.",
      items: { type: Type.STRING },
    },
    recommendations: {
      type: Type.ARRAY,
      description: "이 학습자에게 가장 효과적인 학습 방법 추천. 3-4가지 추천 방법을 짧은 문장으로 나열.",
      items: { type: Type.STRING },
    },
     mbtiType: {
      type: Type.STRING,
      description: "분석에 사용된 MBTI 유형 코드. 예: 'INFP'",
    },
  },
  required: ["title", "summary", "strengths", "recommendations", "mbtiType"],
};


export const getLearningStyleAnalysis = async (mbtiType: string): Promise<MBTIResult> => {
  try {
    const prompt = `
    당신은 MBTI와 학습 스타일 분석 전문가입니다. 학생들을 위한 8비트 게임 컨셉의 학습 진단 앱의 일부로, 주어진 MBTI 유형에 대한 분석 결과를 제공해야 합니다. 
    분석 내용은 매우 긍정적이고, 격려적이며, 귀엽고 사랑스러운 톤앤매너를 유지해야 합니다.
    결과는 반드시 JSON 형식으로, 제공된 스키마에 맞춰 생성해주세요.

    분석할 MBTI 유형: ${mbtiType}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resultSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const cleanedJsonText = jsonText.replace(/^```json\s*/, '').replace(/```$/, '');
    const result: MBTIResult = JSON.parse(cleanedJsonText);
    
    if (result.mbtiType !== mbtiType) {
        result.mbtiType = mbtiType;
    }

    return result;

  } catch (error) {
    console.error("Error fetching learning style analysis:", error);
    return {
      title: "오류 발생!",
      summary: "결과를 불러오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
      strengths: ["네트워크 연결을 확인해주세요."],
      recommendations: ["문제가 계속되면 페이지를 새로고침 해보세요."],
      mbtiType: mbtiType,
    };
  }
};


export const startFollowUpChat = (mbtiType: string, initialAnalysis: MBTIResult): Chat => {
    const history: Content[] = [
        {
            role: 'user',
            parts: [{ text: `내 MBTI 유형은 ${mbtiType}이야. 내 학습 스타일은 "${initialAnalysis.title}" 유형이고, 특징은 "${initialAnalysis.summary}"라고 분석됐어. 이 내용을 바탕으로 내 질문에 답변해줘.` }]
        },
        {
            role: 'model',
            parts: [{ text: `네, 알겠습니다! 당신의 ${mbtiType} 유형, "${initialAnalysis.title}" 스타일에 대해 궁금한 점이 있다면 무엇이든 물어보세요! 귀엽고 다정한 말투로 친절하게 설명해 드릴게요.` }]
        }
    ];

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
            systemInstruction: 'You are a friendly and encouraging learning coach for students. Your name is Gemi. You must answer questions in a cute, lovely, and supportive tone, in Korean.',
        }
    });
    return chat;
}

export const sendFollowUpMessage = async (chat: Chat, message: string): Promise<string> => {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
}