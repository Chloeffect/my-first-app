
import React from 'react';
import Button from './Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const HeartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pink-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
       <div className="bg-white p-8 md:p-12 border-4 border-black rounded-xl pixel-shadow w-full max-w-lg">
            <div className="flex justify-center mb-6">
                <HeartIcon />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                나의 학습 스타일은?
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                두근두근! 몇 가지 질문에 답하고<br/>
                나에게 꼭 맞는 MBTI 학습 유형을<br/>
                알아보세요!
            </p>
            <div className="w-full max-w-xs mx-auto">
                <Button onClick={onStart}>
                    시작하기!
                </Button>
            </div>
       </div>
    </div>
  );
};

export default WelcomeScreen;
