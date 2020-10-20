import React from 'react';
import Img from 'gatsby-image';

import Icon from '../components/icon';

import cx from 'classnames/bind';
import '../styles/common.css';
import '../styles/typography.css';
import styles from './corebon-by-numbers.module.css';

const CorebonByNumbers = ({ media: { image } }) => {
  const values = [
    {
      title: 'YIELD',
      colorStyle: 'color-corange',
      icon: 'yield',
      value: '98',
      unit: '%',
    },
    {
      title: 'SPEED',
      colorStyle: 'color-sand',
      icon: 'speed',
      value: '10',
      unit: 'x',
    },
    {
      title: 'ENERGY',
      colorStyle: 'display-color-light',
      icon: 'energy',
      value: '-95',
      unit: '%',
    },
  ];

  const renderValue = ({ title, colorStyle, icon, value, unit }, index) => (
    <div className={styles.contentContainer} key={index}>
      <div>
        <h2 className={cx('display0', colorStyle)}>
          {value}
          <span className={styles.offset}> {unit}</span>
        </h2>
        <div className={styles.hr}></div>
      </div>
      <div className="flex">
        <h2 className={cx('caption', styles.iconPadding)}>{title}</h2>
        <Icon type={icon} />
      </div>
    </div>
  );

  return (
    <section className={`${styles.container} corebon-by-numbers`}>
      <h3 className="display-color-light">Corebon By Numbers</h3>

      <div className={styles.flex}>{values.map(renderValue)}</div>

      {image && (
        <div className={styles.imageContainer}>
          <Img
            fluid={image.fluid}
            alt={image.description}
            className={styles.image}
          />
        </div>
      )}
    </section>
  );
};

export default CorebonByNumbers;
