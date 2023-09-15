import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';


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
                        <h1 className="hero__title" style={{ fontSize: "2.3rem" }}>Functions Defined</h1>
                        <p>A fib evaluation function was defined using recursion.
                        </p>
                        <p>
                            The result of the function call was assigned to a variable named "result" and format the output using fmt.printf
                        </p>
                        <div style={{ marginTop: "0em" }}>
                            <p> <Link href='/docs/getting-started/installation'> Install </Link> nature and execute the compile command</p>
                            <CodeBlock
                                language='shell'>
                                {`> nature build -o fib fib.n && ./fib
fib result is 832040`}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}