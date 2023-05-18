import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios-quiz';


const initialState = { quiz: [], author: '', quizTitle: '' };

const creatorSlice = createSlice({
  name: 'creater',
  initialState,
  reducers: {
    createQuiz: {
      reducer(state, action) {
        state.author = action.payload.author;
        state.quizTitle = action.payload.quizTitle;
        axios.post('/quizes.json', state);
      },
    },
    addQuestion(state, action) {
      const {
        userQuestion,
        rightAnswer,
        option1,
        option2,
        option3,
        option4,
      } = action.payload;
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
});

export const { createQuiz, addQuestion, resetCreate } = creatorSlice.actions;
export default creatorSlice.reducer;
