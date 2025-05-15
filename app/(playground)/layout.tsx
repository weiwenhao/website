import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "@/globals.css";
import Link from 'next/link';
import { Github } from 'lucide-react';
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
            <div className="flex items-center">
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
      </body>
    </html>
  );
}
