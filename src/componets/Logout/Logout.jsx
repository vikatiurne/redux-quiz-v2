import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { authLogout } from '../../containers/Auth/authSlice';

const Logout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout({token:null, user:''}));
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
