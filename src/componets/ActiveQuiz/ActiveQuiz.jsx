import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri';

import styles from './ActiveQuiz.module.css';

import AnswersList from '../AnswersList/AnswersList';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import {
  fetchDeleteQuestion,
  fetchQuiz,
  repeatTest,
} from '../../containers/Quiz/quizSlise';
import { fetchDelete } from '../../containers/QuizList/quizListSlice';
import { editOpen } from '../../containers/QuizCreator/editSlice';

const ActiveQuiz = () => {
  const [modalActive, setModalActive] = useState(false);

  const quiz = useSelector((state) => state.quiz);
  const index = quiz.numQuestion;

  const dispatch = useDispatch();
  const { id } = useParams();

  const numQuestion = quiz.numQuestion + 1;
  const question = quiz.quiz.quiz[index].question;
  const qtyQuestions = quiz.quiz.quiz.length;

  const author = quiz.quiz.author;
  const user = localStorage.getItem('userId');

  const clickDeleteOkHandler = () => {
    if (qtyQuestions !== 1) {
      dispatch(fetchDeleteQuestion({ id, index }));
      dispatch(repeatTest());
      dispatch(fetchQuiz(id));
    } else {
      dispatch(fetchDelete({ id }));
    }
    setModalActive(false);
  };

  const clickEditHandler = () => {
    dispatch(editOpen({ isEdit: true, quizId: id, questionId: index }));
    dispatch(fetchQuiz(id));
  };

  const renderModalContent = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Увага &#129300;</p>
      {qtyQuestions !== 1 ? (
        <p>
          впевнені, що бажаєте видалити питання без можливості його відновлення?
        </p>
      ) : (
        <p>це єдине питання, бажаєти видалити тест повністю?</p>
      )}
      {qtyQuestions !== 1 ? (
        <Button
          type="error"
          valid={true}
          title="ok"
          onclick={clickDeleteOkHandler}
        >
          Видалити
        </Button>
      ) : (
        <Link to="/">
          <Button
            type="error"
            valid={true}
            title="ok"
            onclick={clickDeleteOkHandler}
          >
            Видалити
          </Button>
        </Link>
      )}
      <Button
        type="primary"
        valid={true}
        title="відміна"
        onclick={() => setModalActive(false)}
      >
        Відмінити
      </Button>
    </div>
  );

  return (
    <>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          {renderModalContent}
        </Modal>
      )}
      <div className={styles.activeQuiz}>
        {user === author && (
          <div className={styles.icons}>
            <RiDeleteBin6Line
              title="видалити питання"
              className={styles.deleteIcon}
              onClick={() => setModalActive(true)}
            />
            <Link to="../quiz-creator">
              <RiEdit2Fill
                title="редагувати питання"
                className={styles.editIcon}
                onClick={clickEditHandler}
              />
            </Link>
          </div>
        )}
        <p className={styles.question}>
          <span>
            <strong>{numQuestion}.</strong>&nbsp;
            {question}
          </span>
          <small>
            {numQuestion} з {qtyQuestions}
          </small>
        </p>
        <AnswersList />
      </div>
    </>
  );
};

export default ActiveQuiz;
