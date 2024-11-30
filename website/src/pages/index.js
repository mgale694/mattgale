import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import Showcase from './showcase'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const circles = Array.from({ length: 41 }, (_, i) => i); // Create 21 circles dynamically

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroProjectTagline}>
          {/* Uncomment for a ccs animation */}
          {/* <span className={styles.heroLogo}>
            {circles.map((i) => (
              <div
              key={i}
              className={clsx(styles.circle)}
              style={{ "--i": i }}
            ></div>
            ))}
          </span> */}
          <span
            className={styles.heroTitleTextHtml}
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.hero.title',
                message:
                  'Matthew <b>Gale</b>',
                description:
                  'Home page hero title, can contain simple html tags',
              }),
            }}
          />
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.indexCtas}>
          <Link className="button button--secondary" to="/docs">
            <Translate>Contact</Translate>
          </Link>
          <Link className="button button--secondary" to="https://docusaurus.new">
            <Translate>GitHub</Translate>
          </Link> 
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
