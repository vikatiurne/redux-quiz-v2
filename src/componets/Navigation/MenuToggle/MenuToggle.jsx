import { useSelector } from 'react-redux';
import { FaTimes, FaBars } from 'react-icons/fa';

import styles from './MenuToggle.module.css';

const MenuToggle = ({ isOpen, onToggle }) => {
  const isEdit = useSelector((state) => state.edit.isEdit);
  return isOpen ? (
    !isEdit && (
      <FaBars className={styles.menuToggle} onClick={() => onToggle()} />
    )
  ) : (
    <FaTimes
      className={`${styles.menuToggle} ${styles.open}`}
      onClick={() => onToggle()}
    />
  );
};

export default MenuToggle;
