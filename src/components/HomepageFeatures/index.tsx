import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Feature1Svg from '@site/static/img/feature_1.svg'
import Feature2Svg from '@site/static/img/feature_2.svg'
import Feature3Svg from '@site/static/img/feature_3.svg'

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                {/* <h1 className="hero__title text--center">Features</h1> */}
                <h1 className="hero__title" style={{ fontSize: "2.5rem" }}>Features</h1>
                <div className="row">
                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                {/* <Feature1Svg className="margin-right--md feature-svg" role="img" /> */}
                                <h2>💪 Reliable</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    The type system assists you in writing efficient and reliable applications,
                                    while cross-platform static compilation can help you quickly build and deploy your applications.
                                    <br />
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                {/* <Feature2Svg className={clsx("margin-right--md", "feature-svg")} role="img" /> */}
                                <h2>⭕️ Concise</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    A concise syntax and smooth learning curve minimize your learning cost and allow you to write concise and elegant code.
                                    <br />
                                    <br />
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='col col--4'>
                        <div className="card shadow--tl">
                            <div className="card__header">
                                {/* <Feature3Svg className="margin-right--md feature-svg" role="img" /> */}
                                <h2>🍻 Open</h2>
                            </div>
                            <div className="card__body">
                                <p>
                                    Nature is a programming language that belongs to its users and not to any specific company or organization.
                                    Everyone has the ability to contribute their own ideas or directly participate in its development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}