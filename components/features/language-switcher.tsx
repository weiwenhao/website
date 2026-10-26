'use client';

import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();

  // The Chinese site is served under /cn (see rewrites in next.config.mjs), mirroring the English paths.
  // Use a plain anchor so the browser does a full navigation into the other app.
  const targetHref = pathname === '/' ? '/cn' : `/cn${pathname}`;

  return (
    <a
      href={targetHref}
      className="p-2 hover:text-primary flex items-center justify-center"
      style={{ fontWeight: 500, fontSize: 17 }}
    >
      <span className="inline-block align-middle">CN</span>
    </a>
  );
}
