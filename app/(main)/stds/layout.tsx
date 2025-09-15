'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getStdLibsList } from '@/lib/stdlibs-config'

export default function StdsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [activeSlug, setActiveSlug] = useState('')
    const [stdLibs, setStdLibs] = useState<Array<{ name: string, slug: string }>>([])

    useEffect(() => {
        // Get standard library list from configuration
        const libs = getStdLibsList()
        setStdLibs(libs)

        const slug = pathname.split('/').pop() || ''
        setActiveSlug(slug)
    }, [pathname])

    return (
        <div className="flex flex-col xl:flex-row max-w-7xl mx-auto px-4 py-8">
            {/* 左侧标准库列表 */}
            <div className="w-full xl:w-64 xl:flex-shrink-0 mb-10 xl:mb-0">
                <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pr-4">
                    <h2 className="text-xl font-bold mb-4 px-4">Standard library</h2>
                    <nav>
                        <ul className="space-y-1">
                            {stdLibs.map((lib) => (
                                <li key={lib.slug}>
                                    <Link
                                        href={`/stds/${lib.slug}`}
                                        className={`block px-4 py-1 rounded-md hover:font-md hover:bg-gray-100 ${activeSlug === lib.slug ? 'font-md bg-gray-100' : ''}`}
                                    >
                                        {lib.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* 右侧内容区域 */}
            <div className="prose w-full max-w-5xl mx-auto min-w-0">
                {children}
            </div>
        </div>
    )
}