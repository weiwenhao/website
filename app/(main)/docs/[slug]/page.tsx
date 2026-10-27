import { notFound } from 'next/navigation'
import TableOfContents from '@/components/features/table-of-contents'

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    let mod
    try {
      mod = await import(`@/content/${slug}.mdx`)
    } catch (error) {
      // Unknown slug -> 404; anything else (e.g. a broken MDX file) should still surface as an error
      if ((error as { code?: string }).code === 'MODULE_NOT_FOUND') notFound()
      throw error
    }
    const { default: Post } = mod
   
    
    return (
      <div className="flex flex-col xl:flex-row mx-auto">
        <div className="w-full min-w-0">
          <Post />
        </div>
        <TableOfContents />
      </div>
    )
  }
   
  // export function generateStaticParams() {
  //   return [{ slug: 'welcome' }, { slug: 'about' }]
  // }
   
  // export const dynamicParams = false