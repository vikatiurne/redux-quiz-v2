import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri';

import styles from './QuizList.module.css';

import {
  fetchDelete,
  fetchQuizes,
  fetchShowQuizes,
  selectAllQuizes,
} from './quizListSlice';
import { fetchActiveQuiz, fetchEditTitle } from '../QuizCreator/creatorSlice';
import { addNewQuestion } from '../QuizCreator/editSlice';

import Loader from '../../componets/UI/Loader/Loader';
import Modal from '../../componets/UI/Modal/Modal';
import Button from '../../componets/UI/Button/Button';

const QuizList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [clickEdit, setClickEdit] = useState(false);
  const [editField, setEditField] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  // const [user, setUser] = useState(localStorage.getItem('userId'));

  const quizes = useSelector(selectAllQuizes);

  const quizStatus = useSelector((state) => state.quizes.status);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (editField) setEditedTitle(activeQuiz.title.split('.')[1].trim());
  }, [editField, activeQuiz]);

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

  const clickEditTitleHandler = () => {
    dispatch(fetchEditTitle({ title: editedTitle, quizId: activeQuiz.id }));
    setModalActive(false);
    setEditField(false);
    setClickEdit(false);
    dispatch(fetchShowQuizes());
  };

  const clickAddQuestionHandler = () => {
    dispatch(addNewQuestion({ isAdd: true, quizId: activeQuiz.id }));
    dispatch(fetchActiveQuiz({ id: activeQuiz.id }));
    setModalActive(false);
  };

  const clickEditHandler = (id) => {
    setActiveQuiz(id);
    setModalActive(true);
    setClickEdit(true);
  };

  const renderModalContent = !clickEdit ? (
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
  ) : (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>&#128221;</p>
      <p>оберіть дію, яку треба виконати</p>
      <div className={styles.modalControl}>
        <Button
          type="success"
          valid={true}
          title="Змінити назву"
          onclick={() => setEditField(true)}
        >
          Змінити назву
        </Button>
        <Link to="../quiz-creator">
          <Button
            type="success"
            valid={true}
            title="Додати питання"
            onclick={clickAddQuestionHandler}
          >
            Додати питання
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderModalContentEdit = editField && (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>&#128221;</p>
      <input
        className={styles.editInput}
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        autoFocus
      />
      <div>
        <Button
          type="success"
          valid={true}
          title="Зберегти"
          onclick={clickEditTitleHandler}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );

  const renderQuizList = quizes.map((quiz) => {
    return (
      <li key={uuidv4()}>
        <div className={styles.quizOfList}>
          <NavLink to={`quiz/${quiz.id}`}>{quiz.title}</NavLink>
          {user === quiz.author && (
            <div className={styles.icons}>
              <RiDeleteBin6Line
                className={styles.deleteIcon}
                onClick={() => clickDeleteHandler(quiz)}
              />
              <RiEdit2Fill
                className={styles.editIcon}
                onClick={() => clickEditHandler(quiz)}
              />
            </div>
          )}
        </div>
      </li>
    );
  });
  return (
    <>
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={() => {
            setModalActive();
            setClickEdit(false);
          }}
        >
          {renderModalContent}
        </Modal>
      )}
      {modalActive && editField && (
        <Modal
          active={modalActive}
          setActive={() => {
            setModalActive();
            setEditField(false);
            setClickEdit(false);
          }}
        >
          {renderModalContentEdit}
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
