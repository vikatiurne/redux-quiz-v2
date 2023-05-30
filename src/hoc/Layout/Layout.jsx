import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuToggle from '../../componets/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../componets/Navigation/Drawer/Drawer';
import Button from '../../componets/UI/Button/Button';
import Modal from '../../componets/UI/Modal/Modal';

import { leaveTest } from '../../containers/Quiz/quizSlise';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const leave = useSelector((state) => state.quiz.isLeave);

  const renderModalLeaveActiveQuiz = (
    <div className={styles.modalContent}>
      <p className={styles.modalTitle}>Увага &#129300;</p>
      <p>впевнені, що бажаєте вийти з тесту і втратити результат</p>
      <Button
        type="error"
        valid={true}
        title="так"
        onclick={() => {
          setModalActive(false);
          setIsOpen((prev) => !prev);
          dispatch(leaveTest(false));
        }}
      >
        Так
      </Button>
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
  );

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
      <div className={styles.layout}>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(true)} />
        <MenuToggle
          isOpen={isOpen}
          onToggle={() => {
            !leave && setIsOpen((prev) => !prev);
            leave && setModalActive(true);
          }}
        />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
