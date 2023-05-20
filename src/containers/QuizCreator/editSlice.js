import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEdit: false,
  isAdd: false,
  quizId: '',
  questionId: null,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editOpen: {
      reducer(state, action) {
        state.isEdit = action.payload.isEdit;
        state.quizId = action.payload.quizId;
        state.questionId = action.payload.questionId;
      },
    },
    addNewQuestion: {
      reducer(state, action) {
        state.quizId = action.payload.quizId;
        state.isAdd = action.payload.isAdd;
      },
    },
  },
});

export const { editOpen, addNewQuestion } = editSlice.actions;
export default editSlice.reducer;
