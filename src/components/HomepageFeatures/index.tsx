import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                <h2>Reliable</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    Type system and static compilation help you write more efficient and reliable software.
                                    <br />
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                <h2>Concise</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    A concise syntax and smooth learning curve minimize your learning cost and allow you to write concise and elegant code.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                <h2>Open</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    Nature is a programming language for everyone, and everyone can provide their opinions or directly contribute to it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
