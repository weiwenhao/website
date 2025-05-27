import Link from 'next/link';
import Image from 'next/image';
import { Github, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/features/landing-nav";
import { LanguageSwitcher } from "@/components/features/language-switcher";

export function Header() {
  return (
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
          <Button asChild variant="default" size="sm" className="bg-[#F35774] hover:bg-[#E34764] text-white">
            <Link target="_blank" href="https://github.com/sponsors/weiwenhao" className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>Donate</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 