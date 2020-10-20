import React from 'react';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-gtag';
import Img from 'gatsby-image';
import { cssThemeName, renderAst } from '../utils';
import videoIcon from '../assets/images/visuals/icons/play@2x.png';

import classNames from 'classnames/bind';
import styles from './block.module.css';

let cx = classNames.bind(styles);

const Block = ({ block }) => {
  const {
    title,
    body,
    linkUrl,
    linkText,
    image,
    description,
    scaleImage,
    videoUrl,
    theme,
  } = block;

  const themeName = cssThemeName('block', theme || 'light');

  const cardLayout =
    themeName !== 'blockThemeAllWhiteLinkContent' &&
    themeName !== 'blockThemeCorangeLinkContent';

  const articleStyles = cx({
    [themeName]: true,
    card: cardLayout,
    cardImageTop: image,
  });

  const titleStyles = cx({
    title: true,
    display3: !cardLayout,
  });

  const cardBodyStyles = cx({
    cardBody: cardLayout,
  });

  return (
    <article className={`${articleStyles} block`}>
      {image && cardLayout && (
        <div
          className={cx(
            { videoPlaceholderContainer: videoUrl },
            styles.cardImageTopContainer
          )}
        >
          {scaleImage && (
            <Img
              fluid={image.fluid}
              alt={description}
              className={styles.cardImage}
            />
          )}

          {!scaleImage && (
            <Img
              fixed={image.fixed}
              alt={description}
              className={styles.cardImage}
            />
          )}

          {videoUrl && (
            <OutboundLink
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoButton}
            >
              <img src={videoIcon} alt="Play button" />
            </OutboundLink>
          )}
        </div>
      )}

      <div className={cardBodyStyles}>
        <div>
          {title && <h2 className={titleStyles}>{title}</h2>}

          {body && (
            <div className={styles.markdownContainer}>
              {renderAst(body.childMarkdownRemark.htmlAst)}
            </div>
          )}

          {linkText && (
            <Link to={`/${linkUrl}`} className="link-text">
              {linkText}
            </Link>
          )}
          {linkUrl && !linkText && (
            <Link to={`/${linkUrl}`}>
              <button className={styles.linkButton}>→</button>
            </Link>
          )}
        </div>
        <div>
          {image && !cardLayout && (
            <div className={styles.linkContentImageContainer}>
              <img src={image.fluid.src} alt={description} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Block;
