import { useDispatch, useSelector } from 'react-redux';

import { answerClick, nextQuestion } from '../../../containers/Quiz/quizSlise';
import styles from './AnswerItem.module.css';

const AnswerItem = ({ answer, styleAnswer }) => {
  const num = useSelector((state) => state.quiz.numQuestion + 1);
  const isClicked = useSelector((state) => state.quiz.isClick);

  console.log(answer)

  const dispatch = useDispatch();

  const handlerClick = () => {
    dispatch(answerClick({ answer: answer.id, isClicked: true }));
    const timeout = setTimeout(() => {
      dispatch(nextQuestion(num));
      clearTimeout(timeout);
    }, 1000);
  };

  const classes = [styles.answerItem];
  if (styleAnswer) classes.push(styles[styleAnswer]);

  return (
    <li
      className={classes.join(' ')}
      onClick={!isClicked ? () => handlerClick() : null}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
