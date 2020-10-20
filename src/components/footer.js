import React from 'react';
import moment from 'moment';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-gtag';

import logoMobile from '../assets/images/visuals/icons/Footer.png';
import logoDesktop from '../assets/images/visuals/icons/Footer@2x.png';

import fbIconMobile from '../assets/images/visuals/icons/FB.png';
import fbIconDesktop from '../assets/images/visuals/icons/FB@2x.png';

import liIconMobile from '../assets/images/visuals/icons/LI.png';
import liIconDesktop from '../assets/images/visuals/icons/LI@2x.png';

import styles from './footer.module.css';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu(name: { eq: "Footer Menu" }) {
        id
        name
        pages {
          id
          menuTitle
          slug
        }
      }
    }
  `);

  return (
    <footer className={styles.footer}>
      <div>
        <picture className={styles.logo}>
          <source
            media="(max-width: 799px)"
            srcSet={`${logoMobile} 1x, ${logoDesktop} 2x`}
          />
          <source
            media="(min-width: 800px)"
            srcSet={`${logoMobile} 1x, ${logoDesktop} 2x`}
          />
          <img src={logoMobile} alt="Orange company logo" />
        </picture>

        <div>
          <div className={styles.links}>
            {data.contentfulMenu.pages.map(({ id, menuTitle, slug }) => (
              <Link to={`/${slug}`} key={id}>
                {menuTitle}
              </Link>
            ))}
          </div>

          <div className={styles.socialIcons}>
            <OutboundLink
              href="https://www.facebook.com/pages/Corebon-AB/268892267003814"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source
                  media="(max-width: 799px)"
                  srcSet={`${fbIconMobile} 1x, ${fbIconDesktop} 2x`}
                />
                <source
                  media="(min-width: 800px)"
                  srcSet={`${fbIconMobile} 1x, ${fbIconDesktop} 2x`}
                />
                <img src={fbIconMobile} alt="Social account, facebook icon" />
              </picture>
            </OutboundLink>

            <OutboundLink
              href="https://www.linkedin.com/company/corebon-ab/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source
                  media="(max-width: 799px)"
                  srcSet={`${liIconMobile} 1x, ${liIconDesktop} 2x`}
                />
                <source
                  media="(min-width: 800px)"
                  srcSet={`${liIconMobile} 1x, ${liIconDesktop} 2x`}
                />
                <img src={liIconMobile} alt="Social account, linkedin icon" />
              </picture>
            </OutboundLink>
          </div>
        </div>
      </div>
      <p>Copyright © {moment().format('YYYY')} Corebon AB</p>
    </footer>
  );
};

export default Footer;
