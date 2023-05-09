import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';


export default function HomepageCode(): JSX.Element {
    return (
        <section className={styles.codeSection}>
            <div className="container">
                <div className="row">
                    <div className='col col--6'>
                        <CodeBlock
                            language="nature"
                            title="fib.n"
                            showLineNumbers>
                            {`fn fib(int n):int {
    if (n <= 1) {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

var result = fib(10)
println(result)`}
                        </CodeBlock>
                    </div>

                    <div className='col col--6'>
                        <h1 className="hero__title" style={{ fontSize: "2.5rem" }}>Coding Example</h1>
                        <p>A fib evaluation function was defined using recursion. The result of the function call was assigned to a variable named "result" and printed.</p>
                        <div style={{ marginTop: "2.3rem" }}>
                            <p> <Link href='/docs/getting-started/installation'> Install </Link> nature and execute the compile command</p>
                            <CodeBlock
                                language='shell'>
                                {`> nature build -o fib fib.n && ./fib
55`}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}