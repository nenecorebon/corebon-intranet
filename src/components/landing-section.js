import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { renderAst } from '../utils';

import cx from 'classnames/bind';
import styles from './landing-section.module.css';

const LandingSection = ({ content }) => {
  const { backgroundImage, hero, heroSubtitle } = content;

  return (
    <BackgroundImage
      Tag="section"
      fluid={backgroundImage.fluid}
      className={cx(styles.container, 'landing-section')}
    >
      <div className={styles.heroContainer}>
        {hero && (
          <div className={styles.markdownContainer}>
            {renderAst(hero.childMarkdownRemark.htmlAst)}
          </div>
        )}

        {heroSubtitle && (
          <div className={styles.markdownContainer}>
            {renderAst(heroSubtitle.childMarkdownRemark.htmlAst)}
          </div>
        )}
      </div>
    </BackgroundImage>
  );
};

export default LandingSection;
