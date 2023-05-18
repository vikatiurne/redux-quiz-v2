import { useSelector } from 'react-redux';

import AnswerItem from './AnswerItem/AnswerItem';
import styles from './AnswersList.module.css';

const AnswersList = () => {
  const state = useSelector((state) => state.quiz);
  const answers = state.quiz.quiz[state.numQuestion].answers;
  const styleAnswer = state.answerState;

  return (
    <ul className={styles.answersList}>
      {answers.map((answer) => {
        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            // проверяем что в состоянии null или объект, если null дальше передаем null
            styleAnswer={styleAnswer ? styleAnswer[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
