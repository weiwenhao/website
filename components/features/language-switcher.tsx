'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const chineseSiteBaseUrl = "https://nature-lang.cn";

  // Construct the target URL by combining the base URL of the Chinese site
  // with the current path from the English site.
  // The URL constructor handles joining them correctly (e.g. avoids double slashes if pathname is '/').
  const targetHref = new URL(pathname, chineseSiteBaseUrl).toString();

  return (
    <Link
      href={targetHref}
      className="p-2 hover:text-primary flex items-center justify-center"
      style={{ fontWeight: 500, fontSize: 17 }}
    >
      <span className="inline-block align-middle">CN</span>
    </Link>
  );
}