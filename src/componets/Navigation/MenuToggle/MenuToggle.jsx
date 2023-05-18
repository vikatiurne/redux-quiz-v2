import { FaTimes, FaBars } from 'react-icons/fa';

import styles from './MenuToggle.module.css';

const MenuToggle = ({ isOpen, onToggle }) => {
  return isOpen ? (
    <FaBars className={styles.menuToggle} onClick={() => onToggle()} />
  ) : (
    <FaTimes className={`${styles.menuToggle} ${styles.open}`} onClick={() => onToggle()} />
  );
};

export default MenuToggle;
