import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StartFirebase from '../../firebase/firebaseConfig/startFirebase';
import { onValue, ref, remove } from 'firebase/database';

const initialState = {
  quizes: [],
  status: 'idle',
  error: null,
  author: '',
};

const db = StartFirebase();

const getQuizList = async () => {
  const response = await new Promise((resolve) => {
    const dbRef = ref(db, 'quizes');
    onValue(dbRef, (snapshot) => {
      resolve(snapshot.val());
    });
  });
  const quizesUpdated = [];
  for (let key in response) {
    quizesUpdated.push({
      id: key,
      title: `${quizesUpdated.length + 1}. ${response[key].quiz[0]['title']}`,
      author: response[key].author,
    });
  }
  return quizesUpdated;
};

export const fetchQuizes = createAsyncThunk('/quizes/fetchQuizes/', () =>
  getQuizList()
);

export const fetchShowQuizes = createAsyncThunk(
  '/quizes/fetchShowQuizes/',
  () => getQuizList()
);

export const fetchDelete = createAsyncThunk(
  '/quizes/fetchDelete/',
  ({ id }) => {
    remove(ref(db, 'quizes/' + id));
    return getQuizList()
  }
);

const quizesSlice = createSlice({
  name: 'quizes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        state.status = 'success';
        state.quizes = state.quizes.concat(action.payload);
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(fetchShowQuizes.fulfilled, (state, action) => {
      state.quizes = action.payload;
    });
    builder.addCase(fetchDelete.fulfilled, (state, action) => {
      state.quizes = action.payload;
    });
  },
});

export default quizesSlice.reducer;

export const selectAllQuizes = (state) => state.quizes.quizes;

export const selectQuizById = (state, quizId) =>
  state.quizes.quizes.find((quiz) => quiz.id === quizId);
