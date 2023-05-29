import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { token: null, status: 'idle', user: '' };

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async ({ email, password, isLogin }) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ';
    }
    const response = await axios.post(url, authData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: {
      reducer(state, action) {
        state.token = action.payload.token;
        state.user = action.payload.user;
        // очистка localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('experitionDate');
      },
    },
    autoLogin: {
      reducer(state, action) {
        state.token = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload.localId;
        // для доступа к полученому от сервера token, кладем его в localStorage
        localStorage.setItem('token', payload.idToken);
        // заводим локальный id пользователя
        localStorage.setItem('userId', payload.localId);
        // т.к. токен дан на 1час(3600), то нужно проверить если час прошел- нужно закончить сессию и получить новый токен(заново авторизироваться)
        // создаем константу с временем когда истекает сессия(получаем текущее время + то время что дает сервер)
        const experitionDate = new Date(
          new Date().getTime() + payload.expiresIn * 1000
        )
        // сохраняем время когда истечет сессия в localStorage
        localStorage.setItem('experitionDate', experitionDate)
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { authentication, authLogout, autoLogin } = authSlice.actions;

export default authSlice.reducer;
