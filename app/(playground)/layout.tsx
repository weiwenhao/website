import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "@/globals.css";
import Link from 'next/link';
import { Github, Heart } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Header } from "@/components/features/header";

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
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
