import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

export default function HomepageApplies(): JSX.Element {
    return (
        <section className='homepage-title'>
            <div className="container">
                <h1 className="hero__title" style={{ fontSize: "2.5rem" }}>
                    <Translate id="homepageApplies.whatsPossible">What's possible</Translate>
                </h1>
                <div className="row">
                    {renderApplies("🎮", "homepageApplies.gameEngine", "Game engine and game production")}
                    {renderApplies("🤖", "homepageApplies.scienceAI", "Science and AI computing")}
                    {renderApplies("🛰", "homepageApplies.operatingSystems", "Operating Systems and Internet of Things")}
                    {renderApplies("🌐", "homepageApplies.webDevelopment", "WEB development")}
                </div>
            </div>
        </section>
    );
}

function renderApplies(icon: string, translationId: string, defaultText: string) {
    return (
        <div className='col col--3 margin-top--md'>
            <div className={clsx('text--center', styles.appliesIcon)}> {icon} </div>
            <h2 className='text--center'>
                <Translate id={translationId}>{defaultText}</Translate>
            </h2>
        </div>
    );
}
