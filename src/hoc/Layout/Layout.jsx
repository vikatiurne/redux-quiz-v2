import { useState } from 'react';

import MenuToggle from '../../componets/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../componets/Navigation/Drawer/Drawer';

import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.layout}>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(true);
          // leave && setModalActive(true);
        }}
      />
      <MenuToggle
        isOpen={isOpen}
        onToggle={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
