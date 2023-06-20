import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { authLogout } from '../../containers/Auth/authSlice';
import Button from '../UI/Button/Button';

import styles from './Logout.module.css';
import Modal from '../UI/Modal/Modal';

const Logout = () => {
  const [modalActive, setModalActive] = useState(true);
  const dispatch = useDispatch();

  const clickOutHandler = () => {
    dispatch(authLogout({ token: null, user: '' }));
    setModalActive(false);
  };

  const renderModalOut = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Увага &#129300;</p>
      <p>
        впевнені, що бажаєте вийти і втратити можливість створювати власні
        тести?
      </p>
      <div className={styles.modalControl}>
        <Link to="/">
          <Button
            type="error"
            valid={true}
            title="так"
            onclick={clickOutHandler}
          >
            Так
          </Button>
        </Link>

        <Link to="/">
          <Button
            type="success"
            valid={true}
            title="ні"
            onclick={() => {
              setModalActive(false);
            }}
          >
            Ні
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <Link to="/">
      <Modal
        active={modalActive}
        setActive={() => {
          setModalActive();
        }}
      >
        {renderModalOut}
      </Modal>
    </Link>
  );
};

export default Logout;
