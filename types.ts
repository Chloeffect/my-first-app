export enum MBTI_Dimension {
  E = 'E', // Extroversion
  I = 'I', // Introversion
  S = 'S', // Sensing
  N = 'N', // Intuition
  T = 'T', // Thinking
  F = 'F', // Feeling
  J = 'J', // Judging
  P = 'P'  // Perceiving
}

export type Answer = {
  text: string;
  type: MBTI_Dimension;
};

export type Question = {
  question: string;
  answers: [Answer, Answer];
};

export type MBTIResult = {
  title: string;
  summary: string;
  strengths: string[];
  recommendations: string[];
  mbtiType: string;
};

export type GameState = 'welcome' | 'in-progress' | 'loading' | 'results';

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};
