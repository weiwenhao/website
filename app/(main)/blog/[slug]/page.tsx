import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post, frontmatter } = await import(`@/content/blog/${slug}.mdx`)

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
