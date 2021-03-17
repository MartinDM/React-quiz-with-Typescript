import React from 'react';

// Types
import { AnswerObject } from '../App';

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

// Assign types to the props passed to the Question Card
// Callback function takes the React event wrapper ('MouseEvent), returns nothing.
type cardProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number
}

const QuestionCard: React.FC<cardProps> = ({ question, answers, callback, userAnswer, questionNum, totalQuestions }) => (
    <Wrapper>
      <p className="number">Question: { questionNum } / { totalQuestions }</p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
        { answers.map( answer => 
        (
          <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} /> 
          </button>
        </ButtonWrapper>
        ))}
    </Wrapper>
)

export default QuestionCard;