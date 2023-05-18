import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri';

import styles from './ActiveQuiz.module.css';

import AnswersList from '../AnswersList/AnswersList';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import { fetchDeleteQuestion } from '../../containers/Quiz/quizSlise';
import { useParams } from 'react-router-dom';

const ActiveQuiz = () => {
  const [modalActive, setModalActive]=useState(false)

  const quiz = useSelector((state) => state.quiz)
  const index = quiz.numQuestion
  // const [activeQuestion, setActiveQuestion]=useState(index)
  // console.log(activeQuestion)

  const dispatch = useDispatch()
  const { id } = useParams();

  const numQuestion = quiz.numQuestion + 1;
  const question = quiz.quiz.quiz[numQuestion - 1].question;
  const qtyQuestions = quiz.quiz.quiz.length;

  const author = quiz.quiz.author;
  const user = localStorage.getItem('userId');


  const clickDeleteOk = () => {
    // dispatch(fetchDeleteQuestion({id, index}));
    // setModalActive(false);
  };

  // const renderModalContent = (
  //   <div className={styles.modalContent}>
  //     <p className={styles.modalTitle}>Увага &#129300;</p>
  //     <p>впевнені, що бажаєте видалити питання без можливості його відновлення?</p>
  //     <Button type="error" valid={true} title="ok" onclick={clickDeleteOk}>
  //       Видалити
  //     </Button>
  //     <Button
  //       type="primary"
  //       valid={true}
  //       title="відміна"
  //       onclick={() => setModalActive(false)}
  //     >
  //       Відмінити
  //     </Button>
  //   </div>
  // );


  return (
    <>
    {/* {modalActive && (
      <Modal active={modalActive} setActive={setModalActive}>
        {renderModalContent}
      </Modal>
    )} */}
    <div className={styles.activeQuiz}>
      {user === author && (
        <div className={styles.icons}>
          <RiDeleteBin6Line className={styles.deleteIcon} onClick={()=>setModalActive(true)}/>
          <RiEdit2Fill className={styles.editIcon} />
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
