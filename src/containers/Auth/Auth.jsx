import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';

import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Modal from '../../componets/UI/Modal/Modal';
import Loader from '../../componets/UI/Loader/Loader';

import { autoLogin, fetchAuth } from './authSlice';

import styles from './Auth.module.css';

const Auth = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [tachedName, setTachedName] = useState(false);
  const [tachedPass, setTachedPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [inputType, setInputType] = useState('password');
  const [modalActive, setModalActive] = useState(false);

  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handlerInputEmail = (e) => {
    setTachedName(true);
    setInputEmail(e.target.value);
  };
  const handlerInputPass = (e) => {
    setTachedPass(true);
    setInputPass(e.target.value);
  };

  const openEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'password') setInputType('text');
  };
  const closeEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'text') setInputType('password');
  };

  const authHandler = async () => {
    dispatch(
      fetchAuth({ email: inputEmail, password: inputPass, isLogin: true })
    );
    setInputEmail('');
    setInputPass('');
    setTachedName(false);
    setTachedPass(false);
    setModalActive(true);
  };

  const clickLoginOkHandler = () => {
    const token = localStorage.getItem('token');
    dispatch(autoLogin(token));
    setModalActive(false);
  };

  const renderModalContent = () => {
    switch (status) {
      case 'loading':
        return <Loader />;
      case 'success':
        return (
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Вітаю!!! &#128522;</p>
            <p>ви відкрили доступ до сторінки створення тестів</p>
            <Link to="/">
              <Button
                type="success"
                valid={true}
                title="ok"
                onclick={clickLoginOkHandler}
              >
                Зрозуміло
              </Button>
            </Link>
          </div>
        );
      case 'error':
        return (
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Невдала спроба &#128557;</p>
            <p>Невірний E-mail або пароль</p>
            <div className={styles.authActive}>
              <Button
                type="success"
                valid={true}
                title="перейти на строрінку авторизації"
                onclick={() => setModalActive(false)}
              >
                Повторити
              </Button>
              <Link to="../register">
                <Button
                  type="success"
                  valid={true}
                  title="перейти на строрінку реєстрації"
                >
                  Реєстрація
                </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <>
      {modalActive && (
        <Modal active={modalActive} setActive={clickLoginOkHandler}>
          {renderModalContent()}
        </Modal>
      )}

      <div className={styles.auth}>
        <p>
          Введіть E-mail та пароль
          <br />
          <span>
            або пройдіть реєстрацію <br /> чи використайте E-mail{' '}
            <b>test@ukr.com</b> пароль <b>01234567</b>
          </span>
        </p>
        <div className={styles.formWrapper}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              inputType="email"
              onChangeInput={handlerInputEmail}
              placeholder="Введіть E-mail"
              value={inputEmail}
              autocomplete="email"
              inputLabel="E-mail"
              // errorMessage="E:mail має містити символ @"
              inputMessage=""
              valid={validateEmail(inputEmail)}
              tached={tachedName}
            />
            <Input
              passwordStyle={styles.password}
              inputType={inputType}
              onChangeInput={handlerInputPass}
              placeholder="Введіть пароль"
              value={inputPass}
              autocomplete="current-password"
              inputLabel="Пароль"
              errorMessage="Введіть коректний пароль"
              inputMessage="Пароль має містити мінімум 8 символів"
              valid={inputPass.trim().length >= 8}
              tached={tachedPass}
            />
            {eye ? (
              <RxEyeClosed
                onClick={openEyeHandler}
                className={styles.visible}
              />
            ) : (
              <RxEyeOpen onClick={closeEyeHandler} className={styles.visible} />
            )}
            <div className={styles.authActive}>
              <Link to="../register">
                <Button
                  type="primary"
                  valid={true}
                  title="Перейти на сторінку реєстрації"
                >
                  Реєстрація
                </Button>
              </Link>
              <Button
                onclick={authHandler}
                type="success"
                valid={
                  inputPass.trim().length >= 8 && inputEmail.trim().length >= 8
                }
                title="Увійти"
              >
                Вхід
              </Button>
            </div>
            <small>***авторизація дає право самостійно створювати тести</small>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
