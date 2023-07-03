import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageBuildExample from '@site/src/components/HomepageBuildExample';
import HomepageCodeExample from '@site/src/components/HomepageCodeExample';
import { Analytics } from '@vercel/analytics/react';


import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--dark', styles.heroBanner)}>
            <div className="container">
                <div className="row">
                    <div className="col col--8">
                        <h1 className="hero__title" style={{ fontSize: "4rem" }}>Nature</h1>
                        <p className="hero__subtitle" style={{ fontSize: "2.5rem" }}>{siteConfig.tagline}</p>
                        <Link
                            style={{ backgroundColor: '#F9322C', color: "white" }}
                            className="button button--lg banner-button margin-right--lg margin-top--lg"
                            to="/docs/getting-started/meet-nature">
                            GET STARTED
                        </Link>
                        <Link
                            style={{ marginRight: '40px', marginTop: '40px', backgroundColor: '#5BC2E7', color: "white" }}
                            className="button button--lg banner-button margin-right--lg margin-top--lg"
                            to="https://github.com/nature-lang/nature/releases">
                            DOWNLOAD
                        </Link>
                    </div>
                    <div className="col col--4">
                        <img
                            className={styles.logoShip} src={require('@site/static/img/nature.png').default} alt="nature logo"
                            style={{ width: '85%', height: 'auto' }}
                        />
                    </div>
                </div>

                {/* <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        ️DOWNLOAD
                    </Link>
                </div> */}
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <HomepageBuildExample />
                <HomepageFeatures />
                <HomepageCodeExample />
            </main>
            <Analytics />
        </Layout>
    );
}
