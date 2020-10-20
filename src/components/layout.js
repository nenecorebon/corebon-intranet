import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Navigation from './Navigation';
import Footer from './footer';

import styles from './layout.module.css';

const cx = classNames.bind(styles);

const Layout = ({ theme, children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Navigation showMenu={showMenu} setShowMenu={setShowMenu} theme={theme} />
      <main className={cx('main', theme)}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
