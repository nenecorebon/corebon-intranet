import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames/bind';

import styles from './Navigation.module.css';

const cx = classNames.bind(styles);

const Menu = props => {
  const { visible, menu } = props;

  return (
    <ul className={cx('menu', { show: visible })}>
      {menu.pages.map(page => (
        <li key={page.id}>
          <Link activeClassName={styles.active} to={`/${page.slug}`}>
            {page.menuTitle} {page.subPages && page.subPages.length > 0 && '+'}
          </Link>

          {page.subPages && page.subPages.length > 0 && (
            <ul className={styles.subMenu}>
              {page.subPages.map(subPage => (
                <li className={styles.subMenuItem} key={subPage.id}>
                  <Link activeClassName={styles.active} to={`/${subPage.slug}`}>
                    {subPage.menuTitle}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
