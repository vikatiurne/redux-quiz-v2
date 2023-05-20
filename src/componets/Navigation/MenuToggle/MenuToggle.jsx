import { useSelector } from 'react-redux';
import { FaTimes, FaBars } from 'react-icons/fa';

import styles from './MenuToggle.module.css';

const MenuToggle = ({ isOpen, onToggle }) => {
  const edit = useSelector((state) => state.edit);
  return isOpen ? (
    (!edit.isEdit && !edit.isAdd) && (
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
