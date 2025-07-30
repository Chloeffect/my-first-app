
import { Question, MBTI_Dimension } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  // E/I
  {
    question: '그룹 프로젝트를 할 때 나는...',
    answers: [
      { text: '친구들과 함께 아이디어를 내고 토론하는 게 좋아!', type: MBTI_Dimension.E },
      { text: '혼자 조용히 자료를 찾아보고 정리하는 게 편해.', type: MBTI_Dimension.I },
    ],
  },
  {
    question: '주말에 에너지를 충전하는 방법은?',
    answers: [
      { text: '친구들과 만나 신나게 수다 떨기!', type: MBTI_Dimension.E },
      { text: '집에서 좋아하는 책을 읽거나 영화 보기.', type: MBTI_Dimension.I },
    ],
  },
  {
    question: '수업 시간에 발표할 때 나는...',
    answers: [
      { text: '자신있게 손을 들고 먼저 발표하는 편이야!', type: MBTI_Dimension.E },
      { text: '다른 친구들이 먼저 할 때까지 기다렸다가 하는 편이야.', type: MBTI_Dimension.I },
    ],
  },
  // S/N
  {
    question: '새로운 것을 배울 때 나는...',
    answers: [
      { text: '직접 해보거나 실제 예시를 보는 게 이해가 잘 돼.', type: MBTI_Dimension.S },
      { text: '전체적인 그림이나 숨은 의미를 파악하는 게 흥미로워.', type: MBTI_Dimension.N },
    ],
  },
  {
    question: '문제가 생겼을 때 해결 방식은?',
    answers: [
      { text: '내가 경험했던 사실을 바탕으로 차근차근 해결해.', type: MBTI_Dimension.S },
      { text: '다양한 가능성을 상상하며 새로운 해결책을 찾아봐.', type: MBTI_Dimension.N },
    ],
  },
  {
    question: '설명서를 볼 때 나는...',
    answers: [
      { text: '순서대로 꼼꼼하게 읽고 따라하는 편이야.', type: MBTI_Dimension.S },
      { text: '대충 훑어보고 감으로 조립하는 편이야!', type: MBTI_Dimension.N },
    ],
  },
  // T/F
  {
    question: '친구가 고민 상담을 할 때 나는...',
    answers: [
      { text: '객관적인 사실을 바탕으로 해결책을 제시해줘.', type: MBTI_Dimension.T },
      { text: '먼저 친구의 감정에 공감하고 위로해줘.', type: MBTI_Dimension.F },
    ],
  },
  {
    question: '숙제를 할 때 더 중요한 것은?',
    answers: [
      { text: '정확하고 논리적인 결과물을 만드는 것!', type: MBTI_Dimension.T },
      { text: '모두가 만족하고 화목한 분위기에서 하는 것!', type: MBTI_Dimension.F },
    ],
  },
  {
    question: '칭찬을 들었을 때 나의 반응은?',
    answers: [
      { text: '"고마워, 이 부분에 신경을 많이 썼어." 라고 구체적으로 말해.', type: MBTI_Dimension.T },
      { text: '"정말? 고마워! 기분 좋다!" 라고 감정을 표현해.', type: MBTI_Dimension.F },
    ],
  },
  // J/P
  {
    question: '여행 계획을 세울 때 나는...',
    answers: [
      { text: '출발 전, 시간대별로 완벽한 계획을 세워야 마음이 편해!', type: MBTI_Dimension.J },
      { text: '큰 틀만 정해놓고, 즉흥적으로 마음 가는 대로 즐기는 게 좋아!', type: MBTI_Dimension.P },
    ],
  },
  {
    question: '방 청소를 할 때 나는...',
    answers: [
      { text: '날 잡아서 한 번에 완벽하게 끝내야 해!', type: MBTI_Dimension.J },
      { text: '필요한 부분만 그때그때 치우는 편이야.', type: MBTI_Dimension.P },
    ],
  },
  {
    question: '마감 기한이 있는 과제가 있다면?',
    answers: [
      { text: '미리미리 계획을 세워서 꾸준히 진행해.', type: MBTI_Dimension.J },
      { text: '마감 직전에 초인적인 힘을 발휘해서 끝내!', type: MBTI_Dimension.P },
    ],
  },
];
