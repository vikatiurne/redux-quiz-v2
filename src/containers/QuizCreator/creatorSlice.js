import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ref, set, update } from 'firebase/database';
import { db, getData } from '../../firebase/firebaseConfig/startFirebase';

import axios from '../../axios/axios-quiz';

const initialState = { quiz: [], author: '', title: '', length: 0 };

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
  '/creator/fetchEditQuestion/',
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

export const fetchActiveQuiz = createAsyncThunk(
  '/creator/fetchActiveQuiz/',
  async ({ id }) => {
    const response = await getData();
    let activeQuiz;
    for (let key in response) {
      if (key === id) {
        activeQuiz = response[key].quiz.length;
      }
    }
    return activeQuiz;
  }
);

export const fetchAddQuestion = createAsyncThunk(
  '/creator/fetchAddQuestion/',
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
  '/creator/fetchEditTitle/',
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
      state.quiz = action.payload.quiz;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEditQuestion.fulfilled, (state, action) => {
        state.title = action.payload;
      })
      .addCase(fetchAddQuestion.fulfilled, (state, action) => {
        state.quiz = action.payload;
      })
      .addCase(fetchActiveQuiz.fulfilled, (state, action) => {
        state.length =action.payload;
      })
  },
});

export const { createQuiz, addQuestion, resetCreate } = creatorSlice.actions;
export default creatorSlice.reducer;
