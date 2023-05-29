import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Logout from './componets/Logout/Logout';
import Redister from './containers/Register/Redister';
import { useEffect } from 'react';
import { authLogout, autoLogin } from './containers/Auth/authSlice';

function App() {
  const isAutentification = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(autoLogin(null));
    } else {
      const experitionDate = new Date(localStorage.getItem('experitionDate'));
      if (experitionDate <= new Date()) {
        dispatch(autoLogin(null));
      } else {
        dispatch(autoLogin(token));
        const expires = experitionDate.getTime() - new Date().getTime();
        setTimeout(() => {
          dispatch(authLogout({ token: null, user:'' }))
        }, expires);
      }
    }
  }, [dispatch]);

  let routes = (
    <Routes>
      <Route path="/*" element={<QuizList />} />
      <Route path="auth" element={<Auth />} />
      <Route path="register" element={<Redister />} />
      <Route path="quiz/:id" element={<Quiz />} />
    </Routes>
  );

  if (isAutentification) {
    routes = (
      <Routes>
        <Route path="/*" element={<QuizList />} />
        <Route path="logout" element={<Logout />} />
        <Route path="quiz-creator" element={<QuizCreator />} />
        <Route path="quiz/:id" element={<Quiz />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
