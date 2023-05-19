import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Line } from 'react-icons/ri';

import styles from './QuizList.module.css';

import { fetchDelete, fetchQuizes, selectAllQuizes } from './quizListSlice';

import Loader from '../../componets/UI/Loader/Loader';
import Modal from '../../componets/UI/Modal/Modal';
import Button from '../../componets/UI/Button/Button';

const QuizList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const quizes = useSelector(selectAllQuizes);
  const user = localStorage.getItem('userId');

  const quizStatus = useSelector((state) => state.quizes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (quizStatus === 'idle') dispatch(fetchQuizes());
  }, [quizStatus, dispatch]);

  const clickDeleteHandler = (id) => {
    setActiveQuiz(id);
    setModalActive(true);
  };
  const clickDeleteOk = () => {
    dispatch(fetchDelete(activeQuiz));
    setModalActive(false);
  };

  const renderModalContent = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Увага &#129300;</p>
      <p>впевнені, що бажаєте видалити тест без можливості його відновлення?</p>
      <Button type="error" valid={true} title="ok" onclick={clickDeleteOk}>
        Видалити
      </Button>
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

  const renderQuizList = quizes.map((quiz) => {
    return (
      <li key={uuidv4()}>
        <div className={styles.quizOfList}>
          <NavLink to={`quiz/${quiz.id}`}>{quiz.title}</NavLink>
          {user === quiz.author && (
              <RiDeleteBin6Line
                className={styles.deleteIcon}
                onClick={() => clickDeleteHandler(quiz)}
              />
          )}
        </div>
      </li>
    );
  });

  return (
    <>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          {renderModalContent}
        </Modal>
      )}
      <div className={styles.quizList}>
        <div>
          <h1>Оберіть тест</h1>
          {quizStatus === 'loading' ? <Loader /> : <ul>{renderQuizList}</ul>}
        </div>
      </div>
    </>
  );
};

export default QuizList;
