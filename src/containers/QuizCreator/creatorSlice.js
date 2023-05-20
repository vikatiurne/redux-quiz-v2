import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ref, set, update } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig/startFirebase';

import axios from '../../axios/axios-quiz';

const initialState = { quiz: [], author: '', title: '' };

const createQuestion = (
  question,
  rightAnswer,
  option1,
  option2,
  option3,
  option4
) => {
  return {
    question,
    rightAnswer,
    answers: [
      { text: option1, id: `${option1}-${rightAnswer}` },
      { text: option2, id: `${option2}-${rightAnswer}` },
      { text: option3, id: `${option3}-${rightAnswer}` },
      { text: option4, id: `${option4}-${rightAnswer}` },
    ],
  };
};

export const fetchEditQuestion = createAsyncThunk(
  '/quizes/fetchEditQuestion/',
  async ({
    quizId,
    questionId,
    option1,
    option2,
    option3,
    option4,
    question,
    rightAnswer,
  }) => {
    const questionUpdated = createQuestion(
      question,
      rightAnswer,
      option1,
      option2,
      option3,
      option4
    );
    update(ref(db, `quizes/${quizId}/quiz/${questionId}`), questionUpdated);
  }
);

export const fetchAddQuestion = createAsyncThunk(
  '/quizes/fetchAddQuestion/',
  async ({
    position,
    quizId,
    option1,
    option2,
    option3,
    option4,
    question,
    rightAnswer,
  }) => {
    const questionUpdated = createQuestion(
      question,
      rightAnswer,
      option1,
      option2,
      option3,
      option4
    );
    set(ref(db, `quizes/${quizId}/quiz/${position}`), questionUpdated);
    return questionUpdated;
  }
);

export const fetchEditTitle = createAsyncThunk(
  '/quizes/fetchEditTitle/',
  async ({ quizId, title }) => {
    update(ref(db, `quizes/${quizId}`), { title });
    return title;
  }
);

const creatorSlice = createSlice({
  name: 'creater',
  initialState,
  reducers: {
    createQuiz: {
      reducer(state, action) {
        state.author = action.payload.author;
        state.title = action.payload.title;
        axios.post('/quizes.json', state);
      },
    },
    addQuestion(state, action) {
      const { userQuestion, rightAnswer, option1, option2, option3, option4 } =
        action.payload;
      const questionItem = createQuestion(
        userQuestion,
        rightAnswer,
        option1,
        option2,
        option3,
        option4
      );
      state.quiz.push(questionItem);
    },
    resetCreate(state, action) {
      state.quiz = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEditQuestion.fulfilled, (state, action) => {
        state.title = action.payload;
      })
      .addCase(fetchAddQuestion.fulfilled, (state, action) => {
        state.quiz = action.payload;
      });
  },
});

export const { createQuiz, addQuestion, resetCreate } = creatorSlice.actions;
export default creatorSlice.reducer;
