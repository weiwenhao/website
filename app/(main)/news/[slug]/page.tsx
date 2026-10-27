import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let mod
  try {
    mod = await import(`@/content/news/${slug}.mdx`)
  } catch (error) {
    // Unknown slug -> 404; anything else (e.g. a broken MDX file) should still surface as an error
    if ((error as { code?: string }).code === 'MODULE_NOT_FOUND') notFound()
    throw error
  }
  const { default: Post, frontmatter } = mod

  return (
    <div className="flex flex-col items-center xl:flex-row gap-8 xl:gap-12 max-w-7xl mx-auto px-4 py-4">
      <div className="flex-1 min-w-0 max-w-3xl mx-auto">
        <Card className="mb-6 shadow-none border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">{frontmatter.title}</CardTitle>
            <CardDescription className="text-muted-foreground text-base mt-1">{frontmatter.date}</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <Post />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}