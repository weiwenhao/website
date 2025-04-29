import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/features/code-block";
import { Gamepad2, Bot, Cog, Globe } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <main>
        {/* hero */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-nature-red">
                  Nature is...
                </h1>

                <p className="text-2xl leading-relaxed text-gray-800 dark:text-gray-200">
                  A general-purpose open-source <span className="font-semibold">programming language</span> and <span className="font-semibold">compiler</span> designed to provide developers with an{" "}
                  <span className="font-semibold">elegant and concise</span> development experience, enabling them to build secure and reliable cross-platform software{" "}
                  <span className="font-semibold">simply and efficiently</span>.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <Button
                  size="lg"
                  className="bg-nature-red hover:bg-nature-red/80 text-white px-8 py-6 text-lg rounded-md shadow-lg flex items-center gap-2"
                  asChild
                >
                  <Link href="/docs/get-started" rel="noopener noreferrer">
                    Get Started
                  </Link>
                </Button>
                <span className="text-gray-600 dark:text-gray-400">or</span>
                <Link
                  href="/playground"
                  className="text-nature-red hover:text-nature-red/90 text-lg font-medium hover:underline"
                >
                  Try in Browser
                </Link>
              </div>
            </div>

            {/* 右侧代码展示 */}
            <div className="rounded-lg border bg-card text-card-foreground shadow">
              <CodeBlock />
            </div>
          </div>
        </div>

        {/* 主要特性 */}
        <div className="w-full bg-gray-50 dark:bg-gray-900">
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Nature?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">Clean & Natural Syntax</h3>
                <p className="text-gray-600 dark:text-gray-300">Simple, natural, consistent syntax design, even programming beginners can easily grasp, quickly get started!</p>
              </div>
              <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">Cross-Platform</h3>
                <p className="text-gray-600 dark:text-gray-300">No dependency on llvm and VM, compiles directly to target platform machine code and supports cross-compilation.</p>
              </div>
              <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">High Performance</h3>
                <p className="text-gray-600 dark:text-gray-300">High-performance GC, High-performance Coroutine and Pure C implementation runtime</p>
              </div>
            </div>
            <div className="text-center text-gray-400 mt-4">Click to Get Started more feature support……</div>
          </section>
        </div>

        {/* 应用场景 */}
        <div className="w-full bg-white dark:bg-gray-800">
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Gamepad2 className="w-6 h-6 text-nature-red" />
                  <h3 className="text-lg font-semibold">Game Development</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Game engines and game development</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-6 h-6 text-nature-red" />
                  <h3 className="text-lg font-semibold">Scientific Computing</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">AI and scientific applications</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Cog className="w-6 h-6 text-nature-red" />
                  <h3 className="text-lg font-semibold">Systems Programming</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Operating systems and IoT</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-6 h-6 text-nature-red" />
                  <h3 className="text-lg font-semibold">Web Development</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Modern web applications</p>
              </div>
            </div>
          </section>
        </div>

        {/* 赞助商部分 */}
        <div className="w-full bg-gray-50 dark:bg-gray-900">
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Supported By</h2>

            <div className="flex justify-center">
              <Link 
                href="https://www.jetbrains.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img 
                  src="https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.png" 
                  alt="JetBrains logo"
                  className="h-12"
                />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
