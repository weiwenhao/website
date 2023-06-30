import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className='homepage-title'>
            <div className="container ">
                {/* <h1 className="hero__title text--center">Features</h1> */}
                <h1 className="hero__title text--left" style={{ fontSize: "2.5rem" }}>Code Examples</h1>
                <div className="row">
                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630115906.png" alt="error handle" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Error handle</h4>
                            </div>
                        </div>
                    </div>

                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630132324.png" alt="generics" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Generics</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630120447.png" alt="function label" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Function label</h4>
                            </div>
                        </div>
                    </div>


                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630132845.png" alt="union type" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Union type</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row margin-bottom--md">
                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630120423.png" alt="coroutine" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Coroutine</h4>
                            </div>
                        </div>
                    </div>

                    <div className='col col--6 margin-top--md'>
                        <div className="card">
                            <div className="card__image">
                                <img src="https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230630131801.png" alt="http server" />
                            </div>
                            <div className="card__body">
                                <h4 className='text--center'>Http server</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}