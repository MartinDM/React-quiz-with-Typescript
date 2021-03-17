import { useState, useEffect } from "react";
import React from "react";
import { fetchQuizQs } from './API';

// Components
import QuestionCard from "./components/QuestionCard";

// Styles
import { GlobalStyle, Wrapper} from './App.styles'

// Types
import { Difficulty, QuestionsState, Question } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUS = 3;
 
function App() {
  const [isLoading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);

  // Difficulty
  console.log(fetchQuizQs(TOTAL_QUS, Difficulty.EASY));

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQs(TOTAL_QUS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);

      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      // Spread previous into new state with new answer
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };


  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    console.log(number);
    if (nextQ === TOTAL_QUS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  
  return (
    <>
      <GlobalStyle />
      <Wrapper>
      
      <h1>React Quiz</h1>
      { gameOver || userAnswers.length === 0 ? (
        <button className="start" onClick={startQuiz}>
          Start {gameOver}
        </button>
      ) : null}
      
      {/* Show score */}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}

      { isLoading && <p>Loading...</p>}
      { (!isLoading && !gameOver) && (
        <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUS}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
        />
      )}

      {!gameOver && !isLoading && userAnswers.length === number + 1 && number !== TOTAL_QUS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </Wrapper>
    </>
  );
}
export default App;
