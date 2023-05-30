import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

import { autoLogin, fetchAuth } from '../Auth/authSlice';

import styles from '../Auth/Auth.module.css';

import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Modal from '../../componets/UI/Modal/Modal';
import Loader from '../../componets/UI/Loader/Loader';

const Redister = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [tachedName, setTachedName] = useState(false);
  const [tachedPass, setTachedPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [inputType, setInputType] = useState('password');
  const [modalActive, setModalActive] = useState(false);

  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

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

  const registerHandler = () => {
    dispatch(
      fetchAuth({ email: inputEmail, password: inputPass, isLogin: false })
    );
    setInputEmail('');
    setInputPass('');
    setTachedName(false);
    setTachedPass(false);
    setModalActive(true);
  };

  const clickRegisterOkHandler = () => {
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
            <h1>Вітаю!!!</h1>
            <h4>реєстрація пройшла успіно!!!</h4>
            <p>ви відкрили доступ до сторінки створення тестів</p>
            <Link to="/">
              <Button
                type="success"
                valid={true}
                title="ok"
                onclick={clickRegisterOkHandler}
              >
                Зрозуміло
              </Button>
            </Link>
          </div>
        );
      case 'error':
        return (
          <div className={styles.modalContent}>
            <h1>Вітаю!!!</h1>
            <h4>Ви вже зареєстровані</h4>
            <p>введіть свій e:mail та пароль на сторінці авторизації</p>
            <Link to="/auth">
              <Button type="success" valid={true} title="ok">
                Зрозуміло
              </Button>
            </Link>
          </div>
        );
      default:
        return '';
    }
  };
  return (
    <>
      {modalActive && (
        <Modal active={modalActive} setActive={clickRegisterOkHandler}>
          {renderModalContent()}
        </Modal>
      )}

      <div className={styles.auth}>
        <p>Для регістрації ведіть e:mail та пароль</p>
        <div className={styles.formWrapper}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              inputType="email"
              onChangeInput={handlerInputEmail}
              placeholder="Введіть e:mail"
              value={inputEmail}
              autocomplete="email"
              inputLabel="E:mail"
              // errorMessage="E:mail має містити символ @"
              // inputMessage="E:mail має містити символ @"
              valid={inputEmail.trim().length >= 8}
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
           {eye? <RxEyeClosed
              onClick={openEyeHandler}
              className={styles.visible}
            />:  <RxEyeOpen
            onClick={closeEyeHandler}
            className={styles.visible}
          />}
            <div className={styles.authActive}>
              <Link to="..">
                <Button
                  type="success"
                  valid={true}
                  title="Перейти до списку тестів"
                >
                  До списку тестів
                </Button>
              </Link>
              <Button
                onclick={registerHandler}
                type="primary"
                valid={
                  inputPass.trim().length >= 8 && inputEmail.trim().length >= 8
                }
                title="Зареєструватися"
              >
                Зареєструватися
              </Button>
            </div>
            <small>
              вже маєте акаунт? <Link to="../auth">Увійти</Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
};

export default Redister;
