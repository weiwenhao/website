"use client"

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { javascript } from '@codemirror/lang-javascript';

export default function Playground() {
  const [code, setCode] = useState(`fn main() {
    println('hello world')
}`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 组件加载时从 localStorage 读取保存的代码
  useEffect(() => {
    const savedCode = localStorage.getItem('naturePlaygroundCode');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const runCode = async () => {
    setIsLoading(true);
    setOutput('Running...');

    try {
      const response = await fetch('https://api.nature-lang.cn/api/playgrounds/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: code,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setOutput(result.data);
    } catch (error) {
      console.error('Error running code:', error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理代码变更的函数
  const onChange = (value) => {
    setCode(value);
    // 将代码保存到 localStorage
    localStorage.setItem('naturePlaygroundCode', value);
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Main area - Left-right split layout */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Left side code editor */}
        <section className="flex-1 p-4 border-r overflow-auto">
          <div className="h-full flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code Editor</h2>
              <Button
                className="bg-nature-red hover:bg-nature-red/90"
                onClick={runCode}
                disabled={isLoading}
              >
                {isLoading ? 'Running...' : 'Run'}
                <Play />
              </Button>
            </div>
            {/* Code editor */}
            <div className="flex-1">
              {/* <textarea
                className="w-full h-full min-h-[calc(100vh-10rem)] bg-muted rounded p-3 font-mono text-sm outline-none resize-none"
                placeholder="// Enter your Nature code here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
              /> */}
              <div className="flex-1 border rounded">
                <CodeMirror
                  value={code}
                  height="calc(100vh - 10rem)"
                  onChange={onChange}
                  readOnly={isLoading}
                  className="h-full"
                  style={{
                    fontSize: '14px',
                  }}
                  basicSetup={{
                    tabSize: 4,
                    indentUnit: 4,
                  }}
                  theme={githubLight}
                  extensions={[javascript()]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right side output area */}
        <section className="w-[45%] p-4 overflow-auto">
          <div className="h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Output Results</h2>
            <div className="flex-1 bg-muted rounded p-3 font-mono text-sm overflow-auto">
              {/* Code execution results will be displayed here */}
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}