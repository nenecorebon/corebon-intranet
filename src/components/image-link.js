import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import cx from 'classnames/bind';
import styles from './image-link.module.css';

const ImageLink = ({ data: { linkText, linkUrl, image } }) => {
  return (
    <div className={cx(`${styles.container} image-link`)}>
      <Link to={`/${linkUrl}`} className="with-animated-content">
        <div>
          <Img
            className={styles.image}
            fluid={image.fluid}
            alt={image.description}
          />
          <div className={styles.linkTextContainer}>
            <p className="link-text link-text-small">{linkText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ImageLink;
