/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import Image from '@theme/IdealImage';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

function HeroBanner() {
  return (
    <div className={styles.hero} data-theme="dark">
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroProjectTagline}>
          <img
            alt={translate({message: 'Docusaurus with Keytar'})}
            className={styles.heroLogo}
            src={useBaseUrl('/img/docusaurus_keytar.svg')}
            width="200"
            height="200"
          />
          <span
            className={styles.heroTitleTextHtml}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.hero.title',
                message:
                  'Build <b>optimized</b> websites <b>quickly</b>, focus on your <b>content</b>',
                description:
                  'Home page hero title, can contain simple html tags',
              }),
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link className="button button--primary" to="/docs">
            <Translate>Get Started</Translate>
          </Link>
          <Link className="button button--info" to="https://docusaurus.new">
            <Translate>Try a Demo</Translate>
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=facebook&amp;repo=docusaurus&amp;type=star&amp;count=true&amp;size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
      </div>
    </div>
  );
}





function Feature({
  feature,
  className,
}) {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <div className={clsx('col', className)}>
      <img
        className={styles.featureImage}
        alt={feature.title}
        width={Math.floor(feature.image.width)}
        height={Math.floor(feature.image.height)}
        src={withBaseUrl(feature.image.src)}
        loading="lazy"
      />
      <Heading as="h3" className={clsx(styles.featureHeading)}>
        {feature.title}
      </Heading>
      <p className="padding-horiz--md">{feature.text}</p>
    </div>
  );
}

function FeaturesContainer() {
  const firstRow = Features.slice(0, 3);
  const secondRow = Features.slice(3);

  return (
    <div className="container text--center">
      <div className="row margin-top--lg margin-bottom--lg">
        {firstRow.map((feature, idx) => (
          <Feature feature={feature} key={idx} />
        ))}
      </div>
      <div className="row">
        {secondRow.map((feature, idx) => (
          <Feature
            feature={feature}
            key={idx}
            className={clsx('col--4', idx === 0 && 'col--offset-2')}
          />
        ))}
      </div>
    </div>
  );
}

function TopBanner() {
  // TODO We should be able to strongly type customFields
  //  Refactor to use a CustomFields interface + TS declaration merging
  const announcedVersion = useDocusaurusContext().siteConfig.customFields
    ?.announcedVersion;

  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link
          to={`/blog/releases/${announcedVersion}`}
          className={styles.topBannerTitleText}>
          <Translate
            id="homepage.banner.launch.newVersion"
            values={{newVersion: announcedVersion}}>
            {'Docusaurus\xa0{newVersion} is\xa0out!️'}
          </Translate>
        </Link>
        {'\xa0🥳'}
      </div>
      {/*
      <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={{flex: 1, whiteSpace: 'nowrap'}}>
          <div className={styles.topBannerDescription}>
            We are on{' '}
            <b>
              <Link to="https://www.producthunt.com/posts/docusaurus-2-0">
                ProductHunt
              </Link>{' '}
              and{' '}
              <Link to="https://news.ycombinator.com/item?id=32303052">
                Hacker News
              </Link>{' '}
              today!
            </b>
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            flexShrink: 0,
            padding: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <ProductHuntCard />
          <HackerNewsIcon />
        </div>
      </div>
      */}
    </div>
  );
}

export default function Home() {
  const {
    siteConfig: {customFields, tagline},
  } = useDocusaurusContext();
  const {description} = customFields;
  return (
    <Layout title={tagline} description={description}>
      <main>
        {/* <TopBanner /> */}
        <HeroBanner />
        <div className={styles.section}>
          {/* <FeaturesContainer /> */}
          {/* <VideoContainer /> */}
        </div>
        {/* <TweetsSection /> */}
        {/* <QuotesSection /> */}
      </main>
    </Layout>
  );
}