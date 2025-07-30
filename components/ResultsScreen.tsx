import React from 'react';
import { MBTIResult, ChatMessage } from '../types';
import Button from './Button';

interface ResultsScreenProps {
  result: MBTIResult;
  onRestart: () => void;
  chatHistory: ChatMessage[];
  onFollowUpSubmit: (e: React.FormEvent) => void;
  followUpQuestion: string;
  setFollowUpQuestion: (question: string) => void;
  isReplying: boolean;
  chatEnabled: boolean;
}

const StarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 text-yellow-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const GemiIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center border-2 border-black flex-shrink-0 mr-3">
        <span className="text-white text-lg">G</span>
    </div>
);

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex items-start ${isModel ? '' : 'justify-end'}`}>
            {isModel && <GemiIcon />}
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg border-2 border-black text-sm ${isModel ? 'bg-purple-200 text-gray-800' : 'bg-pink-200 text-gray-800'}`}>
                {message.text}
            </div>
        </div>
    );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestart, chatHistory, onFollowUpSubmit, followUpQuestion, setFollowUpQuestion, isReplying, chatEnabled }) => {
  return (
    <div className="flex flex-col items-center justify-start w-full p-4 py-10">
      <div className="bg-white p-6 md:p-8 border-4 border-black rounded-xl pixel-shadow-pink w-full max-w-2xl space-y-6">
          <div className="text-center">
              <span className="text-white bg-pink-500 px-4 py-2 rounded-full border-2 border-black text-lg">
                  {result.mbtiType}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
                  {result.title}
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">{result.summary}</p>
          </div>

          <div className="bg-purple-100 p-4 border-2 border-black rounded-lg space-y-3">
              <h3 className="font-bold text-purple-800 text-lg">💖 나의 학습 강점</h3>
              <ul className="list-none space-y-2 text-gray-700 text-sm">
                  {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start"><StarIcon /><span>{strength}</span></li>
                  ))}
              </ul>
          </div>
          
          <div className="bg-pink-100 p-4 border-2 border-black rounded-lg space-y-3">
              <h3 className="font-bold text-pink-800 text-lg">🚀 추천 학습 전략</h3>
              <ul className="list-none space-y-2 text-gray-700 text-sm">
                  {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start"><StarIcon /><span>{rec}</span></li>
                  ))}
              </ul>
          </div>
          
          {chatEnabled && (
            <div className="border-t-4 border-dashed border-gray-300 pt-6 space-y-4">
                <h3 className="text-center font-bold text-lg text-purple-800">궁금한 점을 Gemi에게 물어보세요!</h3>
                <div className="bg-gray-100 border-2 border-black rounded-lg p-4 h-64 overflow-y-auto space-y-4">
                    {chatHistory.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                    {isReplying && (
                        <div className="flex items-start">
                            <GemiIcon />
                            <div className="max-w-xs p-3 rounded-lg border-2 border-black bg-purple-200">
                                <div className="flex items-center space-x-1">
                                    <span className="h-2 w-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={onFollowUpSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={followUpQuestion}
                      onChange={(e) => setFollowUpQuestion(e.target.value)}
                      placeholder="여기에 질문을 입력하세요..."
                      disabled={isReplying}
                      className="flex-grow p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <Button type="submit" variant="secondary" disabled={isReplying || !followUpQuestion.trim()}>
                        전송
                    </Button>
                </form>
            </div>
          )}
          
          <div className="pt-6">
              <Button onClick={onRestart} variant="primary">
                  다시하기
              </Button>
          </div>
      </div>
    </div>
  );
};

export default ResultsScreen;