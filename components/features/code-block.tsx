'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Highlight, themes } from "prism-react-renderer"

const CODE_EXAMPLES = {
  fib: `import fmt  

fn fib(int n):int {
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

fn main() {
    var result = fib(10)
    fmt.printf('result=%d', result)
}`,

  http: `import http

fn main() {
    var app = http.server()

    app.get('/', fn(http.request_t req, ptr<http.response_t> res):void! {
        res.send('hello nature')
    })


    println('server will listen on port 8888 and block')
    app.listen(8888)
}`,

  generics: `type box<T, U> = struct {
	T width
	U length
}
  
fn box<T, U>.perimeter():T {
    return (self.width + self.length as T) * 2
}

fn main() {
    var b = box<i16, i32>{width=10, length=20}
    println('perimeter =', b.perimeter())
}`,

  coroutine: `import co

fn delay_sum(int a, int b):int {
    co.sleep(1000)

    return a + b
}

fn main() {
  var fut = go delay_sum(1, 1) // eq: future_t<int> fut = @async(delay_sum(1, 1))
  var result = fut.await()

  println('result =', result)
}`,

  error: `fn main() {
    var result = rem(10, 0) catch e {
        println(e.msg())
        1
    }
    println(result)
}

fn rem(int dividend, int divisor):int! {
	if divisor == 0 {
		throw errorf('divisor cannot zero')
	}
	return dividend % divisor
}`,

  nullable: `fn main() {
    int? foo = null
    int bar = match foo {
        is int -> foo // auto assert
        is null -> -1
    }

    assert(bar == -1) 

    if foo is int {
        assert(foo == -1)
    }
}`,

  match: `fn main() {
    int n = 3
    match n {
        1|2 -> println('one or two')
        3 -> println('three') // here
        _ -> println('something else')
    }

    var res = match {
        (n < 0) -> 1
        _ -> 2
    }
    println(res) // 2
}`,


  interface: `type measurable = interface{
	fn perimeter():int
	fn area():int
}

type rectangle: measurable = struct{
	int width
	int height
}

fn rectangle.area():int {
	return self.width * self.height
}
fn rectangle.perimeter():int {
	return 2 * (self.width + self.height)
}

fn print_shape(measurable s) {
    println(s.area(), s.perimeter())
}

fn main() {
    var r = rectangle{width=3, height=4}
    print_shape(r)

    var r1 = new rectangle(width=15, height=18)
    print_shape(r1)
}
`,

  channel: `import co

fn main() {
    var ch = chan_new<string>()

    go delay_send(ch)

    select{
        ch.on_recv() -> msg {
            println('recv msg =', msg)
        }
    }
}

fn delay_send(chan<string> ch):void! {
    co.sleep(1000)
    ch.send('hello ch')
}`,

  json: `import json

type book_t = struct{
    string title
    string author
}

fn main() {
    var str = \`{"title":"杀死一只知更鸟","author":"Harper Lee"}\`

    var book = json.deserialize<book_t>(str)

    println(book.title, book.author) // 杀死一只知更鸟 Harper Lee
}`


};

type CodeExample = keyof typeof CODE_EXAMPLES;

export function CodeBlock() {
  const [activeExample, setActiveExample] = useState<CodeExample>("fib");

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap gap-2 p-4 border-b bg-white dark:bg-gray-950">
        {Object.keys(CODE_EXAMPLES).map((example) => (
          <Button
            key={example}
            variant={activeExample === example ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveExample(example as CodeExample)}
            className={activeExample === example ? "bg-nature-red hover:bg-nature-red/90 text-white" : ""}
          >
            {example}
          </Button>
        ))}
      </div>
      <div className="h-[320px] overflow-y-auto bg-white no-scrollbar">
        <Highlight
          theme={themes.github}
          code={CODE_EXAMPLES[activeExample]}
          language="js"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className + " p-4 font-mono"}
              style={{
                ...style,
                backgroundColor: 'transparent',
                margin: 0,
                lineHeight: '1.4',
                fontFamily: 'Operator Mono, IBM Plex Mono, JetBrains Mono, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                fontWeight: '400',  // 添加这一行来控制字体粗细
                fontSize: '0.9rem'  // 或使用 style 属性
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
} 