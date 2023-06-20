import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheck, FiX } from 'react-icons/fi';

import { v4 as uuidv4 } from 'uuid';

import { leaveTest, repeatTest } from '../../containers/Quiz/quizSlise';
import Button from '../UI/Button/Button';

import styles from './Finished.module.css';

const Finished = () => {
  const state = useSelector((state) => state);
  const quiz = state.quiz.quiz.quiz;
  const qtyRightAnswers = state.quiz.qtyRightAnswers;

  const dispatch = useDispatch();
  const repeatHandler = () => {
    dispatch(repeatTest());
    dispatch(leaveTest(true));
  };

  return (
    <div className={styles.finished}>
      <p className={styles.result}>
        Правильно {qtyRightAnswers} з {quiz.length}{' '}
        <span>({((qtyRightAnswers / quiz.length) * 100).toFixed(2)}%)</span>
      </p>
      <ul>
        {quiz.map((item,i) => {
          
          return (
            <li key={uuidv4()}>
              <p
                className={`${item.result !== 'success' && styles.errorAnswer}`}
              >
                <strong>{i+1}.</strong>&nbsp;{item.question}{' '}
                {item.result !== 'success'
                  ? `(вірна відповідь - ${item.rightAnswer})`
                  : `(${item.rightAnswer})`}
              </p>
              {item.result === 'success' ? (
                <FiCheck className={styles.checkIcon} />
              ) : (
                <FiX className={styles.crossIcon} />
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.control}>
        <Button type="primary" valid={true} onclick={repeatHandler}>
          Повторити
        </Button>
        <Link to="..">
          <Button
            type="success"
            valid={true}
            onclick={() => dispatch(leaveTest(false))}
          >
            Перейти до списку тестів
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Finished;
