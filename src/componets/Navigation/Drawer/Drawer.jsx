import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './Drawer.module.css';

const Drawer = ({ isOpen, onClose }) => {
  const isAutentification = useSelector((state) => !!state.auth.token);

  const links = [
    { to: '/', label: 'Перелік тестів',  id: uuidv4() },
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
      { to: 'logout', label: 'Вихід',  id: uuidv4() }
    );
   
  }
  const linksList = links.map((link) => {
    return (
      <li key={link.id}>
        <NavLink
          to={link.to}
          className={styles.active}
          onClick={() => onClose()}
        >
          {link.label}
        </NavLink>
      </li>
    );
  });
  return (
    <>
      <nav className={`${styles.drawer} ${isOpen ? styles.close : null}`}>
        <ul>{linksList}</ul>
      </nav>
      {!isOpen && <Backdrop onclick={onClose} />}
    </>
  );
};

export default Drawer;
