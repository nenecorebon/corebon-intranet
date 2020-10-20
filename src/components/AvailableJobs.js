import React from 'react';

import IframeResizer from 'iframe-resizer-react';
import styles from './AvailableJobs.module.css';

const AvailableJobs = () => (
  <section className={styles.iframeContainer}>
    <h2 className="display3">Latest Available jobs</h2>
    <IframeResizer
      id="iframe"
      title="Available Jobs"
      src="https://candidate.hr-manager.net/Vacancies/List.aspx?customer=corebon"
      width="100%"
      className={styles.iframe}
    />
  </section>
);

export default AvailableJobs;
