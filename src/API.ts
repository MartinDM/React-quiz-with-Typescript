import { randomise } from './utils';

export type Question = {
  category: string;
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

// Add a property to the parent 'Question' type for storing all answers in one array
export type QuestionsState = Question & { answers: string[] };

// TS Enum
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export const fetchQuizQs = async ( amount: number, difficulty: Difficulty ) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&${difficulty}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map( (question: Question) => (
     { ...question, 
      answers: randomise([
        ...question.incorrect_answers,
        question.correct_answer
      ])
     }
  ))
}

