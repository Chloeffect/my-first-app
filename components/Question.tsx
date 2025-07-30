
import React from 'react';
import { Question as QuestionType, Answer } from '../types';
import Button from './Button';
import ProgressBar from './ProgressBar';

interface QuestionProps {
  questionData: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}

const Question: React.FC<QuestionProps> = ({ questionData, questionNumber, totalQuestions, onAnswer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="bg-white p-8 md:p-12 border-4 border-black rounded-xl pixel-shadow w-full max-w-2xl space-y-8">
            <div className="space-y-4">
                <p className="text-purple-500 font-bold text-lg">Q{questionNumber}.</p>
                <h2 className="text-xl md:text-2xl text-gray-800 leading-snug">
                    {questionData.question}
                </h2>
            </div>

            <div className="space-y-4">
                <Button onClick={() => onAnswer(questionData.answers[0])} variant="primary">
                    {questionData.answers[0].text}
                </Button>
                <Button onClick={() => onAnswer(questionData.answers[1])} variant="secondary">
                    {questionData.answers[1].text}
                </Button>
            </div>
            
            <div className="pt-4">
                <ProgressBar current={questionNumber} total={totalQuestions} />
            </div>
        </div>
    </div>
  );
};

export default Question;
