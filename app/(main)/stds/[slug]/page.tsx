import TableOfContents from '@/components/features/table-of-contents'
import RemoteMDXRenderer from '@/components/features/remote-mdx-renderer'
import { getStdLibContent } from '@/lib/get-stdlibs'
import { notFound } from 'next/navigation'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    
    // Fetch content from remote repository
    const stdLibContent = await getStdLibContent(slug)
    
    if (!stdLibContent) {
        notFound()
    }

    return (
        <div className="flex flex-col xl:flex-row mx-auto">
            <div className="w-full min-w-0" >
                <RemoteMDXRenderer 
                    content={stdLibContent.content}
                    className="prose prose-gray max-w-none"
                />
            </div>
            <TableOfContents />
        </div>
    )
}

export async function generateStaticParams() {
    // Get standard library list from configuration (build-time optimized)
    const { getStdLibsList } = await import('@/lib/stdlibs-config')
    const stdLibs = getStdLibsList()

    // Convert to Next.js required format
    return stdLibs.map(lib => ({
        slug: lib.slug
    }))
}