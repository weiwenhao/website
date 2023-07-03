import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HomepageApplies(): JSX.Element {
    return (
        // <section className='homepage-title' style={{ backgroundColor: '#f6f8fa' }}>
        <section className='homepage-title'>
            <div className="container">
                {/* <h1 className="hero__title text--center">Features</h1> */}
                <h1 className="hero__title" style={{ fontSize: "2.5rem" }}>What's possible</h1>
                <div className="row">
                    <div className='col col--3 margin-top--md'>
                        <div className={clsx('text--center', styles.appliesIcon)}> 🎮 </div>
                        <h2 className='text--center'>Game engine and game production</h2>
                    </div>

                    <div className='col col--3 margin-top--md'>
                        <div className={clsx('text--center', styles.appliesIcon)}> 🤖 </div>
                        <h2 className='text--center'>Science and AI computing</h2>
                    </div>

                    <div className='col col--3 margin-top--md'>
                        <div className={clsx('text--center', styles.appliesIcon)}> 🛰 </div>
                        <h2 className='text--center'>Operating Systems and Internet of Things</h2>
                    </div>

                    <div className='col col--3 margin-top--md'>
                        <div className={clsx('text--center', styles.appliesIcon)}> 🌐 </div>
                        <h2 className='text--center'>WEB development</h2>
                    </div>

                </div>
            </div>
        </section>
    );
}