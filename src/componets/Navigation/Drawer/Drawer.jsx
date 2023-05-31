import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { leaveTest } from '../../../containers/Quiz/quizSlise';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import styles from './Drawer.module.css';

const Drawer = ({ isOpen, onClose }) => {
  const [modalActive, setModalActive] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const isAutentification = useSelector((state) => !!state.auth.token);
  const leave = useSelector((state) => state.quiz.isLeave);
  const dispatch = useDispatch();

  const links = [
    { to: 'rules', label: 'Правила', id: uuidv4() },
    { to: '/', label: 'Перелік тестів', id: uuidv4() },
  ];

  if (!isAutentification) {
    links.push({
      to: 'auth',
      label: 'Авторизація',

      id: uuidv4(),
    });
  } else {
    links.push(
      {
        to: 'quiz-creator',
        label: 'Створити тест',
        id: uuidv4(),
      },
      { to: 'logout', label: 'Вихід', id: uuidv4() }
    );
  }

  const openModal = (link) => {
    setActiveLink(link);
    setModalActive(true);
    onClose();
  };

  const renderModalLeaveActiveQuiz = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Увага &#129300;</p>
      <p>впевнені, що бажаєте вийти з тесту і втратити результат?</p>
      <div className={styles.modalControl}>
        <Link to={activeLink}>
          <Button
            type="primary"
            valid={true}
            title="так"
            onclick={() => {
              setModalActive(false);
              dispatch(leaveTest(false));
            }}
          >
            Так
          </Button>
        </Link>
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
      </div>
    </div>
  );

  const linksList = links.map((link) => {
    return (
      <li key={uuidv4()}>
        <NavLink
          to={!leave && link.to}
          className={styles.active}
          onClick={leave ? () => openModal(link.to) : () => onClose()}
        >
          {link.label}
        </NavLink>
      </li>
    );
  });
  return (
    <>
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={() => {
            setModalActive();
          }}
        >
          {renderModalLeaveActiveQuiz}
        </Modal>
      )}

      <nav className={`${styles.drawer} ${isOpen ? styles.close : null}`}>
        <ul>{linksList}</ul>
      </nav>
      {!isOpen && <Backdrop onclick={onClose} />}
    </>
  );
};

export default Drawer;
