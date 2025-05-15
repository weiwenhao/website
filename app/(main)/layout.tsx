import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "@/globals.css";
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import Image from 'next/image';

import { LandingNav } from "@/components/features/landing-nav";
import { LanguageSwitcher } from "@/components/features/language-switcher";

const font = Oxanium({
  weight: "400",
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Nature Programming Language",
  description: "A modern programming language designed for elegant, efficient, and reliable software development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font.className}`}>
      <body className="antialiased min-h-screen flex flex-col font-body">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Nature Logo"
                  width={32}
                  height={32}
                />
                <span className="text-2xl font-semibold tracking-tight text-nature-red">
                  Nature
                </span>
              </Link>
              <LandingNav />

            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link
                href="https://github.com/nature-lang/nature"
                target="_blank"
                className="p-2 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">About Creator</h3>
                <p className="text-sm text-muted-foreground">
                  I&apos;m Hacker.
                </p>
                <div className="mt-2 text-sm text-muted-foreground space-y-2">
                  <div>
                    <span>Email: </span>
                    <a
                      href="mailto:wwhacker@qq.com"
                      className="hover:text-primary"
                    >
                      wwhacker@qq.com
                    </a>
                  </div>
                  <div>
                    <span>GitHub: </span>
                    <a
                      href="https://github.com/weiwenhao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      @weiwenhao
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/docs/get-started" className="text-sm hover:text-primary">
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/nature-lang/nature/tree/master/tests/features/cases" className="text-sm hover:text-primary">
                      Examples
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/weiwenhao/website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary"
                    >
                      Edit on GitHub
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Social Media</h3>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com/your-repo/nature"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://x.com/nature_lang"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">WeChat Group:</span>
                    <span className="text-sm text-muted-foreground">nature-lang</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
