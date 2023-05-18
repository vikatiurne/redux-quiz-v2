import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './QuizCreator.module.css';

import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Select from '../../componets/UI/Select/Select';
import Modal from '../../componets/UI/Modal/Modal';

import { addQuestion, createQuiz, resetCreate } from './creatorSlice';
import { fetchShowQuizes } from '../QuizList/quizListSlice';

const QuizCreator = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [rightAnswer, setRightAnswer] = useState('відповідь');
  const [clickButtonAdd, setClickButtonAdd] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const state = useSelector((state) => state.addQuiz.quiz);
  const dispatch = useDispatch();

  const validInputs = {
    title: quizTitle.trim().length > 0,
    question: userQuestion.trim().length > 0,
    option1: option1.trim().length > 0,
    option2: option2.trim().length > 0,
    option3: option3.trim().length > 0,
    option4: option4.trim().length > 0,
    select: rightAnswer !== 'відповідь',
    createButton: state.length !== 0,
  };

  const handlerInputTitle = (e) => setQuizTitle(e.target.value);
  const handlerInputUserQuestion = (e) => setUserQuestion(e.target.value);
  const handlerInputOption1 = (e) => setOption1(e.target.value);
  const handlerInputOption2 = (e) => setOption2(e.target.value);
  const handlerInputOption3 = (e) => setOption3(e.target.value);
  const handlerInputOption4 = (e) => setOption4(e.target.value);
  const handlerSelect = (e) => setRightAnswer(e.target.value);

  const addQuestionHandler = () => {
    dispatch(
      addQuestion({
        userQuestion,
        quizTitle,
        option1,
        option2,
        option3,
        option4,
        rightAnswer,
      })
    );
    setQuizTitle(quizTitle);
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setUserQuestion('');
    setRightAnswer('відповідь');
    setClickButtonAdd(true);
    setModalActive(true);
  };

  const createQuizHandler = (e) => {
    e.preventDefault();
    const author = localStorage.getItem('userId')
    dispatch(createQuiz({author}));
    setQuizTitle('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setUserQuestion('');
    setRightAnswer('відповідь');
    dispatch(resetCreate([]));
    setModalActive(true);
  };

  const renderModalAddQuestion = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Питання додано &#128077;</p>
      <p>можете додати ще питання обо зберегти тест</p>
      <Button
        onclick={() => {
          setModalActive(false);
          setClickButtonAdd(false);
        }}
        type="success"
        valid={true}
      >
        Зрозуміло
      </Button>
    </div>
  );

  const renderModalCreateQuestion = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Тест створено &#128170;</p>
      <p>можете знайти його у списку тестів</p>
      <Button
        onclick={() => {
          setModalActive(false);
        }}
        type="success"
        valid={true}
      >
        Зрозуміло
      </Button>
    </div>
  );
  return (
    <>
      {modalActive &&
        (clickButtonAdd ? (
          <Modal active={modalActive} setActive={() => setModalActive(false)}>
            {renderModalAddQuestion}
          </Modal>
        ) : (
          <Modal active={modalActive} setActive={() => setModalActive(false)}>
            {renderModalCreateQuestion}
          </Modal>
        ))}
      <div className={styles.quizCreator}>
        <h2>Створення тесту</h2>
        <div className={styles.formWrapper}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              className={styles.quizCreatorInput}
              inputType="text"
              onChangeInput={handlerInputTitle}
              placeholder="Назва тесту"
              value={quizTitle}
              inputLabel="Назва тесту"
              valid={validInputs.quizTitle}
            />
            <Input
              className={styles.quizCreatorInput}
              inputType="text"
              onChangeInput={handlerInputUserQuestion}
              placeholder="Питання"
              value={userQuestion}
              inputLabel="Питання"
              valid={validInputs.question}
              tached={true}
            />
            <hr />
            <p>Варіанти відповіді:</p>
            <div className={styles.answerOptions}>
              <Input
                className={styles.quizCreatorInput}
                inputType="text"
                onChangeInput={handlerInputOption1}
                placeholder="варіант 1"
                value={option1}
                inputLabel="1."
                valid={validInputs.option1}
                tached={true}
              />
              <Input
                className={styles.quizCreatorInput}
                inputType="text"
                onChangeInput={handlerInputOption2}
                placeholder="варіант 2"
                value={option2}
                inputLabel="2."
                valid={validInputs.option2}
                tached={true}
              />
              <Input
                className={styles.quizCreatorInput}
                inputType="text"
                onChangeInput={handlerInputOption3}
                placeholder="варіант 3"
                value={option3}
                inputLabel="3."
                valid={validInputs.option3}
                tached={true}
              />
              <Input
                className={styles.quizCreatorInput}
                inputType="text"
                onChangeInput={handlerInputOption4}
                placeholder="варіант 4"
                value={option4}
                inputLabel="4."
                valid={validInputs.option4}
                tached={true}
              />
            </div>
            <Select
              onchange={handlerSelect}
              label="№ вірної відповіді"
              value={rightAnswer}
              optionsAnswer={[
                { text: option1, value: 1 },
                { text: option2, value: 2 },
                { text: option3, value: 3 },
                { text: option4, value: 4 },
              ]}
              valid={validInputs.select}
            />
            <div className={styles.quizCreatorActive}>
              <Button
                onclick={addQuestionHandler}
                type="primary"
                valid={
                  validInputs.option4 &&
                  validInputs.option3 &&
                  validInputs.option2 &&
                  validInputs.option1 &&
                  validInputs.select &&
                  validInputs.title &&
                  validInputs.question
                }
              >
                Додати питання
              </Button>
              <Button
                onclick={createQuizHandler}
                type="success"
                valid={validInputs.createButton}
              >
                Зберегти тест
              </Button>
              <Link to="/">
                <Button
                  valid
                  type="success"
                  onclick={() => dispatch(fetchShowQuizes())}
                >
                  Список тестів
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizCreator;
