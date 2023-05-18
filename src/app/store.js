import { configureStore } from '@reduxjs/toolkit';
import quizesReducer from '../containers/QuizList/quizListSlice';
import quizReducer from '../containers/Quiz/quizSlise';
import createReducer from '../containers/QuizCreator/creatorSlice'
import authReducer from '../containers/Auth/authSlice'

export default configureStore({
  reducer: {
    quizes: quizesReducer,
    quiz: quizReducer,
    addQuiz: createReducer,
    auth: authReducer,
  }
});
