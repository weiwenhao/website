import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';  // 引入Translate

export default function HomepageCode(): JSX.Element {
    return (
        <section className='homepage-title'>
            <div className="container">
                <div className="row">
                    <div className='col col--6'>
                        <CodeBlock
                            language="nature"
                            title="fib.n"
                            showLineNumbers>
                            {`import fmt

fn fib(int n):int {
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

fmt.printf('fib result is %d', fib(30))`}
                        </CodeBlock>
                    </div>

                    <div className='col col--6'>
                        <h1 className="hero__title" style={{ fontSize: "2.3rem" }}>
                            <Translate id="homepageCode.functionDefined">Functions Defined</Translate>
                        </h1>
                        <p>
                            <Translate id="homepageCode.fibEvaluation">A fib evaluation function was defined using recursion.</Translate>
                        </p>
                        <p>
                            <Translate id="homepageCode.resultAssignment">
                                Call the fib function and pass its result to fmt.Printf for output.
                            </Translate>
                        </p>
                        <div style={{ marginTop: "0em" }}>
                            <p>
                                <Translate
                                    id="homepageCode.installExecute"
                                    values={{
                                        Install: (
                                            <Link href='/docs/getting-started/installation'>
                                                <Translate id="homepageCode.installExecutePartLink">nature</Translate>
                                            </Link>
                                        ),
                                    }}>
                                    {'Install nature and execute the compile command'}
                                </Translate>
                            </p>
                            <CodeBlock
                                language='shell'>
                                {`> nature build fib.n && ./main
fib result is 832040`}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
