import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  cssThemeName,
  renderAst,
  getParentPage,
  renderUniqueContent,
} from '../utils';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Section from '../components/section';
import LandingSection from '../components/landing-section';

import classNames from 'classnames/bind';
import styles from './page.module.css';

let cx = classNames.bind(styles);

const Page = ({ pageContext, data }) => {
  const { pages, menu } = pageContext;
  const {
    contentfulPage: {
      id,
      title,
      titleImage,
      subheading,
      sections,
      firstSectionToCutBackground,
      theme,
      slug,
      description,
    },
  } = data;

  const themeName = cssThemeName('page', theme || 'default');

  const pagePrefaceContainerStyles = cx({
    pageTitleImagePrefaceContainer: titleImage,
    pagePrefaceContainer: !titleImage,
    pagePrefaceContainerThemeDark: themeName === 'pageThemeDark',
    firstSectionToCutBackground: firstSectionToCutBackground,
  });

  const pagePrefaceStyles = cx({
    pagePreface: true,
    [themeName]: true,
    overlapTitleImage: titleImage,
  });

  const titleImageStyles = cx({
    titleImage: true,
    underlapPreface: titleImage,
  });

  const pageSubheadingStyles = cx({
    subheadingColumnLayout: !titleImage,
  });

  const parentPage = getParentPage(id, pages);
  const parentSlug = parentPage ? parentPage.slug : undefined;

  return (
    <Layout menu={menu} pages={pages} theme={themeName}>
      <SEO title={title} description={description} />

      <div className={pagePrefaceContainerStyles}>
        {titleImage && (
          <Img
            className={titleImageStyles}
            fluid={titleImage.fluid}
            alt={titleImage.description}
          />
        )}

        {(title !== 'Home' || subheading) && (
          <div className={pagePrefaceStyles}>
            {parentSlug && (
              <Link to={`/${parentSlug}`} className={styles.backButton}>
                ← Back
              </Link>
            )}

            <p className="caption">
              <Link to="/" className="color-corange">
                Corebon
              </Link>
              {<span> /{slug}</span>}
            </p>

            {title && <h1>{title === 'Home' ? '' : title}</h1>}

            {subheading && (
              <div className={pageSubheadingStyles}>
                {renderAst(subheading.childMarkdownRemark.htmlAst)}
              </div>
            )}
          </div>
        )}
      </div>

      {sections &&
        sections.map(section =>
          section.__typename === 'ContentfulLandingSection' ? (
            <LandingSection key={section.id} content={section} />
          ) : section.__typename === 'ContentfulUniqueContent' ? (
            renderUniqueContent(section.componentName)
          ) : (
            <Section
              key={section.id}
              section={section}
              contentToCutBackground={firstSectionToCutBackground}
            />
          )
        )}
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      titleImage {
        description
        fluid(quality: 75, maxWidth: 1200) {
          ...GatsbyContentfulFluid
        }
      }
      title
      subheading {
        childMarkdownRemark {
          htmlAst
        }
      }
      firstSectionToCutBackground
      theme
      slug
      description
      sections {
        __typename
        ... on ContentfulUniqueContent {
          id
          name
          componentName
        }
        ... on ContentfulSection {
          id
          caption
          title
          subtitle
          backgroundImage {
            fluid(quality: 75, maxWidth: 1440) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
          backgroundTheme
          sectionStylingTop
          columns
          contentTypes {
            __typename
            ... on ContentfulBlock {
              id
              title
              image {
                description
                fluid(quality: 75, maxWidth: 548) {
                  ...GatsbyContentfulFluid
                }
                fixed(width: 311) {
                  ...GatsbyContentfulFixed_noBase64
                }
              }
              scaleImage
              videoUrl
              body {
                childMarkdownRemark {
                  htmlAst
                }
              }
              theme
              linkUrl
              linkText
            }
            ... on ContentfulImageLink {
              id
              image {
                description
                fluid(quality: 75, maxWidth: 548) {
                  ...GatsbyContentfulFluid
                }
              }
              linkText
              linkUrl
            }
            ... on ContentfulArticle {
              id
              compactArticle
              body {
                childMarkdownRemark {
                  htmlAst
                }
              }
            }
            ... on ContentfulImage {
              id
              image {
                fluid(quality: 75, maxWidth: 1600) {
                  ...GatsbyContentfulFluid
                }
              }
            }
            ... on ContentfulCorebonNumbers {
              id
              image {
                description
                fluid(quality: 75, maxHeight: 600) {
                  ...GatsbyContentfulFluid
                }
              }
            }
            ... on ContentfulTextLink {
              id
              textLink
              textUrl
            }
          }
        }
        ... on ContentfulLandingSection {
          id
          backgroundImage {
            fluid(quality: 75, maxWidth: 2000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          hero {
            childMarkdownRemark {
              htmlAst
            }
          }
          heroSubtitle {
            childMarkdownRemark {
              htmlAst
            }
          }
        }
      }
    }
  }
`;

export default Page;
