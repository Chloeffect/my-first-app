import React, { useState, useCallback } from 'react';
import { GameState, MBTI_Dimension, Answer, MBTIResult, ChatMessage } from './types';
import { QUIZ_QUESTIONS } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import Question from './components/Question';
import ResultsScreen from './components/ResultsScreen';
import { getLearningStyleAnalysis, startFollowUpChat, sendFollowUpMessage } from './services/geminiService';
import type { Chat } from '@google/genai';


const LoadingIndicator: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="bg-white p-8 md:p-12 border-4 border-black rounded-xl pixel-shadow w-full max-w-lg">
             <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent rounded-full mx-auto"></div>
             <h2 className="text-2xl font-bold text-gray-800 mt-6">분석 중...</h2>
             <p className="text-gray-600 mt-2">두근두근! 당신의 유형을<br/>찾고 있어요!</p>
        </div>
    </div>
);


const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('welcome');
    const [answers, setAnswers] = useState<MBTI_Dimension[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState<MBTIResult | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [followUpQuestion, setFollowUpQuestion] = useState('');
    const [isReplying, setIsReplying] = useState(false);


    const handleStart = () => {
        setGameState('in-progress');
    };

    const handleAnswer = (answer: Answer) => {
        const newAnswers = [...answers, answer.type];
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameState('loading');
            processResults(newAnswers);
        }
    };
    
    const processResults = useCallback(async (finalAnswers: MBTI_Dimension[]) => {
        const counts: { [key in MBTI_Dimension]: number } = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        finalAnswers.forEach(type => {
            counts[type]++;
        });

        let mbtiType = '';
        mbtiType += counts.E >= counts.I ? 'E' : 'I';
        mbtiType += counts.S >= counts.N ? 'S' : 'N';
        mbtiType += counts.T >= counts.F ? 'T' : 'F';
        mbtiType += counts.J >= counts.P ? 'P' : 'P';
        
        const analysisResult = await getLearningStyleAnalysis(mbtiType);
        setResult(analysisResult);

        if (analysisResult.title !== "오류 발생!") {
            const chatInstance = startFollowUpChat(mbtiType, analysisResult);
            setChat(chatInstance);
        }

        setGameState('results');

    }, []);
    
    const handleFollowUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!followUpQuestion.trim() || !chat || isReplying) return;

        const userMessage: ChatMessage = { role: 'user', text: followUpQuestion };
        setChatHistory(prev => [...prev, userMessage]);
        const currentQuestion = followUpQuestion;
        setFollowUpQuestion('');
        setIsReplying(true);

        try {
            const responseText = await sendFollowUpMessage(chat, currentQuestion);
            const modelMessage: ChatMessage = { role: 'model', text: responseText };
            setChatHistory(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Follow-up chat error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "미안해요, 지금은 대답할 수 없어요. 잠시 후 다시 시도해주세요." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsReplying(false);
        }
    };

    const handleRestart = () => {
        setGameState('welcome');
        setAnswers([]);
        setCurrentQuestionIndex(0);
        setResult(null);
        setChat(null);
        setChatHistory([]);
        setFollowUpQuestion('');
    };

    const renderContent = () => {
        switch (gameState) {
            case 'welcome':
                return <WelcomeScreen onStart={handleStart} />;
            case 'in-progress':
                return (
                    <Question
                        questionData={QUIZ_QUESTIONS[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={QUIZ_QUESTIONS.length}
                        onAnswer={handleAnswer}
                    />
                );
            case 'loading':
                return <LoadingIndicator />;
            case 'results':
                return result ? (
                    <ResultsScreen 
                        result={result} 
                        onRestart={handleRestart}
                        chatHistory={chatHistory}
                        onFollowUpSubmit={handleFollowUpSubmit}
                        followUpQuestion={followUpQuestion}
                        setFollowUpQuestion={setFollowUpQuestion}
                        isReplying={isReplying}
                        chatEnabled={!!chat}
                    />
                ) : <LoadingIndicator />;
            default:
                return <WelcomeScreen onStart={handleStart} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container mx-auto w-full flex-grow flex justify-center items-center py-4">
                {renderContent()}
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm">
                © 2025 Chloe Jeong
            </footer>
        </div>
    );
};

export default App;