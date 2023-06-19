import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios/axios-quiz';
import { ref, update } from 'firebase/database';
import { db, getData } from '../../firebase/firebaseConfig/startFirebase';

const initialState = {
  numQuestion: 0,
  quiz: [],
  answerState: null,
  finished: false,
  qtyRightAnswers: 0,
  repeat: true,
  status: 'idle',
  isLeave: false,
  isClick: false,
};

export const fetchQuiz = createAsyncThunk(
  '/quizes/fetchQuiz',
  async (quizId) => {
    const response = await axios.get(`/quizes/${quizId}.json`);
    return response.data;
  }
);

export const fetchDeleteQuestion = createAsyncThunk(
  '/quizes/fetchDeleteQuestion/',
  async ({ id, index }) => {
    const response = await getData();
    const quizUpdated = [];
    for (let key in response) {
      if (id === key) {
        response[key].quiz.splice(index, 1);
        quizUpdated.push(response[key]);
      }
    }
    update(ref(db, `quizes/${id}`), quizUpdated[0]);
    const res = await axios.get(`/quizes/${id}.json`);
    return res.data;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerClick: {
      reducer(state, action) {
        const quiz = state;
        const id = action.payload.answer;
        state.isClick = action.payload.isClicked;
        const userAnswer = id.split('-')[0];
        const rightAnswer = quiz.quiz.quiz[quiz.numQuestion].rightAnswer;
        const idRightAnswer = `${rightAnswer}-${rightAnswer}`;
        if (quiz.quizStatus !== 'success') {
          // проверка стиля для ответа
          if (quiz.answerState !== null) {
            if (quiz.answerState[0] === 'success') return;
          }
          // проверка ответа:
          // правильный ответ

          if (userAnswer === rightAnswer) {
            //   счетчик правильных ответов
            quiz.qtyRightAnswers = quiz.qtyRightAnswers + 1;
            quiz.quiz.quiz[quiz.numQuestion].result = 'success';
            quiz.quiz.quiz[quiz.numQuestion].userAnswer = userAnswer;
            // добавление стиля правильному ответу
            quiz.answerState = { [id]: 'success' };
            //   неправильный ответ
          } else {
            quiz.quiz.quiz[quiz.numQuestion].result = 'error';
            quiz.quiz.quiz[quiz.numQuestion].userAnswer = userAnswer;
            // добавление стиля правильному и неправильному ответу
            quiz.answerState = { [id]: 'error', [idRightAnswer]: 'success' };
          }
        }
      },
    },
    nextQuestion(state, action) {
      state.isClick = false;
      if (action.payload === state.quiz.quiz.length) {
        state.answerState = null;
        state.numQuestion = 0;
        state.finished = true;
        state.isLeave = false;
      } else {
        state.answerState = null;
        state.numQuestion = action.payload;
      }
    },
    repeatTest(state) {
      state.numQuestion = 0;
      state.answerState = null;
      state.repeat = true;
      state.finished = false;
      state.qtyRightAnswers = 0;
    },
    leaveTest(state, action) {
      state.isLeave = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = 'success';
        state.quiz = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDeleteQuestion.fulfilled, (state, action) => {
        state.quiz = action.payload;
      });
  },
});

export const { answerClick, nextQuestion, repeatTest, leaveTest } =
  quizSlice.actions;

export default quizSlice.reducer;

export const selectQuizById = (state) => state.quiz;
