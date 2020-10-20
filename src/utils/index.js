import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Article from '../components/article';
import Block from '../components/block';
import ImageLink from '../components/image-link';
import CorebonByNumbers from '../components/corebon-by-numbers';
import AvailableJobs from '../components/AvailableJobs';

export const toPascalCase = text => {
  return text
    .split(' ')
    .map(string => capitalize(string))
    .join('');
};

export const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

export const removeWhitespaces = text => text.replace(/\s/g, '');

export const cssThemeName = (prefixOrName, name) => {
  if (prefixOrName && name) {
    return `${prefixOrName}Theme${removeWhitespaces(toPascalCase(name))}`;
  } else {
    return `theme${removeWhitespaces(toPascalCase(prefixOrName))}`;
  }
};

export const kebab2camel = text => {
  const words = text.split('-');
  return words[0] + words.slice(1).map(w => capitalize(w));
};

const styleToObject = style => {
  return style.split(';').reduce((obj, kv) => {
    const [key, value] = kv.split(':');
    if (key && value) {
      obj[kebab2camel(key.trim())] = value.trim();
    }
    return obj;
  }, {});
};

export const renderAst = (ast, key) => {
  switch (ast.type) {
    case 'root':
      return <>{ast.children.map((ast, index) => renderAst(ast, index))}</>;

    case 'element':
      const style = ast.properties.style && styleToObject(ast.properties.style);
      return React.createElement(
        ast.tagName,
        { ...ast.properties, key, style },
        ast.children && ast.children.length > 0
          ? ast.children.map((ast, index) => renderAst(ast, index))
          : null
      );

    case 'text':
      return ast.value;

    default:
      alert(`Unexpected AST type: ${ast.type}`);
  }
};

export const renderUniqueContent = componentName => {
  switch (componentName) {
    case 'availableJobs':
      return <AvailableJobs />;

    default:
      return <pre>{componentName}</pre>;
  }
};

export const renderContent = contentType => {
  switch (contentType.__typename) {
    case 'ContentfulTextLink':
      return (
        <div className="section-text-link" key={contentType.id}>
          <Link to={contentType.textUrl} className="link-text">
            {contentType.textLink}
          </Link>
        </div>
      );

    case 'ContentfulCorebonNumbers':
      return <CorebonByNumbers media={contentType} key={contentType.id} />;

    case 'ContentfulImage':
      return (
        <div className="section-image-container" key={contentType.id}>
          <Img fluid={contentType.image.fluid} />
        </div>
      );

    case 'ContentfulArticle':
      return <Article article={contentType} key={contentType.id} />;

    case 'ContentfulBlock':
      return <Block block={contentType} key={contentType.id} />;

    case 'ContentfulImageLink':
      return <ImageLink data={contentType} key={contentType.id} />;

    default:
      return <pre>{JSON.stringify(contentType)}</pre>;
  }
};

export const getParentPage = (id, pages) => {
  return pages.find(
    ({ subPages }) => subPages && subPages.some(subPage => subPage.id === id)
  );
};
