import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ref, update } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig/startFirebase';

import axios from '../../axios/axios-quiz';

const initialState = { quiz: [], author: '', title: '' };

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
    let questionUpdated = {
      question,
      rightAnswer,
      answers: [
        { text: option1, id: `${option1}-${rightAnswer}` },
        { text: option2, id: `${option2}-${rightAnswer}` },
        { text: option3, id: `${option3}-${rightAnswer}` },
        { text: option4, id: `${option4}-${rightAnswer}` },
      ],
    };
    update(ref(db, `quizes/${quizId}/quiz/${questionId}`), questionUpdated);
    update(ref(db, `quizes/${quizId}/quiz/${questionId}`), {
      question,
      rightAnswer,
    });
  }
);
export const fetchEditTitle = createAsyncThunk(
  '/quizes/fetchEditTitle/',
  async ({ quizId, title }) => {
    update(ref(db, `quizes/${quizId}`), { title });
    return title
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
      const questionItem = {
        question: userQuestion,
        id: state.length + 1,
        rightAnswer,
        answers: [
          { text: option1, id: `${option1}-${rightAnswer}` },
          { text: option2, id: `${option2}-${rightAnswer}` },
          { text: option3, id: `${option3}-${rightAnswer}` },
          { text: option4, id: `${option4}-${rightAnswer}` },
        ],
      };
      state.quiz.push(questionItem);
    },
    resetCreate(state, action) {
      state.quiz = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEditQuestion.fulfilled, (state, action) => {
      state.title = action.payload;
    })
  },
});

export const { createQuiz, addQuestion, resetCreate } = creatorSlice.actions;
export default creatorSlice.reducer;
