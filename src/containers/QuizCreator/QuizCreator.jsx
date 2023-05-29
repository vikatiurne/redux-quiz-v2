import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './QuizCreator.module.css';

import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Select from '../../componets/UI/Select/Select';
import Modal from '../../componets/UI/Modal/Modal';

import {
  addQuestion,
  createQuiz,
  fetchActiveQuiz,
  fetchAddQuestion,
  fetchEditQuestion,
  resetCreate,
} from './creatorSlice';
import { fetchShowQuizes } from '../QuizList/quizListSlice';
import { editOpen } from './editSlice';
import { addNewQuestion } from './editSlice';

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

  const diferentAnswers =
   option1!==option2 && option1!==option3 && option1!==option4 && 
   option2!==option3 && option2!==option4 && 
   option3!==option4 

  const quizState = useSelector((state) => state.quiz);
  const quizes = useSelector((state) => state.quizes.quizes);
  const editState = useSelector((state) => state.edit);
  const state = useSelector((state) => state.addQuiz.quiz);
  const length = useSelector((state) => state.addQuiz.length);

  const dispatch = useDispatch();

  useEffect(() => {
    if (editState.isEdit) {
      const activeEditQuestion = quizState.quiz.quiz[editState.questionId];
      setQuizTitle(quizState.quiz.title);
      setOption1(activeEditQuestion.answers[0].text);
      setOption2(activeEditQuestion.answers[1].text);
      setOption3(activeEditQuestion.answers[2].text);
      setOption4(activeEditQuestion.answers[3].text);
      setUserQuestion(activeEditQuestion.question);
      setRightAnswer('відповідь');
    }
  }, [state, editState.isEdit, editState.questionId, quizState]);

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

  const editQuestionHandler = () => {
    dispatch(editOpen({ isEdit: false }));
    dispatch(
      fetchEditQuestion({
        option1,
        option2,
        option3,
        option4,
        question: userQuestion,
        rightAnswer,
        questionId: editState.questionId,
        quizId: editState.quizId,
      })
    );
  };

  const addQuestionHandler = () => {
    if (editState.isAdd) {
      dispatch(
        fetchAddQuestion({
          quizId: editState.quizId,
          option1,
          option2,
          option3,
          option4,
          question: userQuestion,
          rightAnswer,
          position: length,
        })
      );
    } else {
      dispatch(
        addQuestion({
          userQuestion,
          option1,
          option2,
          option3,
          option4,
          rightAnswer,
        })
      );
    }
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
    const author = localStorage.getItem('userId');
    dispatch(createQuiz({ author, title: quizTitle }));
    setQuizTitle('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setUserQuestion('');
    setRightAnswer('відповідь');
    dispatch(resetCreate({ quiz: [] }));
    setModalActive(true);
  };

  const renderModalAddQuestion = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Питання додано &#128077;</p>
      <p>можете додати ще питання обо перейти до списку</p>
      <Button
        onclick={() => {
          setModalActive(false);
          setClickButtonAdd(false);
          dispatch(fetchActiveQuiz({ id: editState.quizId }));
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
              readOnlyStyle={
                editState.isAdd || editState.isEdit ? styles.readonly : null
              }
              inputType="text"
              onChangeInput={handlerInputTitle}
              placeholder="Назва тесту"
              value={
                editState.isAdd
                  ? quizes
                      .filter((quiz) => quiz.id === editState.quizId)[0]
                      .title.split('.')[1]
                      .trim()
                  : quizTitle
              }
              inputLabel="Назва тесту"
              valid={true}
              readonly={editState.isEdit || editState.isAdd}
            />
            <Input
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
                inputType="text"
                onChangeInput={handlerInputOption1}
                placeholder="варіант 1"
                value={option1}
                inputLabel="1."
                valid={validInputs.option1}
                tached={true}
              />
              <Input
                inputType="text"
                onChangeInput={handlerInputOption2}
                placeholder="варіант 2"
                value={option2}
                inputLabel="2."
                valid={validInputs.option2}
                tached={true}
              />
              <Input
                inputType="text"
                onChangeInput={handlerInputOption3}
                placeholder="варіант 3"
                value={option3}
                inputLabel="3."
                valid={validInputs.option3}
                tached={true}
              />
              <Input
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
              {!editState.isEdit ? (
                <>
                  <Button
                    onclick={addQuestionHandler}
                    type="primary"
                    valid={
                      validInputs.option4 &&
                      validInputs.option3 &&
                      validInputs.option2 &&
                      validInputs.option1 &&
                      validInputs.select &&
                      validInputs.question && diferentAnswers
                    }
                  >
                    Додати питання
                  </Button>
                  {!editState.isAdd && (
                    <Button
                      onclick={createQuizHandler}
                      type="success"
                      valid={validInputs.createButton}
                    >
                      Зберегти тест
                    </Button>
                  )}
                  <Link to="/">
                    <Button
                      valid
                      type="success"
                      onclick={() => {
                        dispatch(fetchShowQuizes());
                        dispatch(addNewQuestion({ isAdd: false }));
                        dispatch(resetCreate({ quiz: [] }));
                      }}
                    >
                      Список тестів
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`../quiz/${editState.quizId}`}>
                    <Button
                      onclick={editQuestionHandler}
                      type="success"
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
                      Зберегти
                    </Button>
                  </Link>
                  <Link to={`../quiz/${editState.quizId}`}>
                    <Button
                      valid
                      type="primary"
                      onclick={() => dispatch(editOpen({ isEdit: false }))}
                    >
                      Відмінити
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizCreator;
