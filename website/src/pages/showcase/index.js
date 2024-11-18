import Translate, { translate } from '@docusaurus/Translate';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ShowcaseSearchBar from '@site/src/pages/showcase/_components/ShowcaseSearchBar';
import ShowcaseCards from './_components/ShowcaseCards';
import ShowcaseFilters from './_components/ShowcaseFilters';

const TITLE = translate({ message: 'Code Showcase' });
const DESCRIPTION = translate({
  message: 'Here are coding projects I have worked on',
});
const SUBMIT_URL = 'mailto:mgale694@gmail.com';

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
      <Link className="button button--primary" to={SUBMIT_URL}>
        <Translate id="showcase.header.button">
          📧 Please reach out
        </Translate>
      </Link>
    </section>
  );
}

export default function Showcase() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
    <main className="margin-vert--lg">
      <ShowcaseHeader />
      <ShowcaseFilters />
      <div
        style={{ display: 'flex', marginLeft: 'auto' }}
        className="container">
        {/* <ShowcaseSearchBar /> // uncomment to add search bar for sites */}
      </div>
      <ShowcaseCards />
    </main>
    </Layout>
  );
}
