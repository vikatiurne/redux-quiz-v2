import { createSlice } from '@reduxjs/toolkit';

const initialState = { isEdit: false, quizId: '', questionId: null };

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
  },
});

export const {editOpen} = editSlice.actions
export default editSlice.reducer


