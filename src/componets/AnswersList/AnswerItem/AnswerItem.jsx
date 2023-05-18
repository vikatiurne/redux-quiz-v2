import { useDispatch, useSelector } from 'react-redux';

import { answerClick, nextQuestion } from '../../../containers/Quiz/quizSlise';
import styles from './AnswerItem.module.css';

const AnswerItem = ({ answer, styleAnswer }) => {
  const num = useSelector((state) => state.quiz.numQuestion + 1);

  
  const dispatch = useDispatch();
  const handlerClick = () => {
    dispatch(answerClick(answer.id));
    const timeout = setTimeout(() => {
      dispatch(nextQuestion(num));
      clearTimeout(timeout);
    }, 1000);
  };

  const classes = [styles.answerItem];
  if (styleAnswer) classes.push(styles[styleAnswer]);

  return (
    <li className={classes.join(' ')} onClick={handlerClick}>
      {answer.text}
    </li>
  );
};

export default AnswerItem;
