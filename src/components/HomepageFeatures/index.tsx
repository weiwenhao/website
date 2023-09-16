import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className='homepage-backgroudgrey homepage-title'>
            <div className="container">
                <h1 className="hero__title" style={{ fontSize: "2.5rem" }}>
                    <Translate id="homepageFeatures.title">Features</Translate>
                </h1>
                <div className="row">
                    {renderFeature("⚙️", "homepageFeatures.reliable", "Reliable", "The type system assists you in writing efficient and reliable applications, while cross-platform static compilation can help you quickly build and deploy your applications.")}
                    {renderFeature("🌟", "homepageFeatures.concise", "Concise", "A concise syntax and smooth learning curve minimize your learning cost and allow you to write concise and elegant code.")}
                    {renderFeature("🐳", "homepageFeatures.open", "Open", "Nature is a programming language that belongs to its users. Everyone has the ability to contribute their own ideas or directly participate in its development.")}
                </div>
            </div>
        </section>
    );
}

function renderFeature(icon: string, translationId: string, defaultTitle: string, defaultDescription: string) {
    return (
        <div className='col col--4 margin-top--md'>
            <div className="card">
                <div className="card__header">
                    <h2>
                        {icon} <Translate id={`${translationId}.title`}>{defaultTitle}</Translate>
                    </h2>
                </div>
                <div className="card__body" style={{ minHeight: '150px' }}>
                    <p>
                        <Translate id={`${translationId}.description`}>{defaultDescription}</Translate>
                    </p>
                </div>
            </div>
        </div>
    );
}
