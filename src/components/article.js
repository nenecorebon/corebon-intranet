import React from 'react';
import { renderAst } from '../utils';

import classnames from 'classnames/bind';
import styles from './article.module.css';

let cx = classnames.bind(styles);

const Article = ({ article }) => {
  const { body, compactArticle } = article;

  return (
    <article className={cx({ compactArticle }, 'article')}>
      {body && (
        <div className={cx(styles.markdownContainer, 'body2')}>
          {renderAst(body.childMarkdownRemark.htmlAst)}
        </div>
      )}
    </article>
  );
};

export default Article;
