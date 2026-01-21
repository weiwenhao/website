import { getBlog } from '@/lib/get-blog'
import Link from 'next/link'

export default async function BlogPage() {
  const blogList = await getBlog()

  return (
    <div>
      <ul className="space-y-6">
        {blogList.length === 0 && <li className="text-gray-500">No blogs yet</li>}
        {blogList.map(blog => (
          <li key={blog.slug} className="border-b pb-4">
            <Link href={`/blog/${blog.slug}`} className="text-xl no-underline font-semibold text-nature-red transition-colors duration-200 hover:text-red-700">
              {blog.title}
            </Link>
            <div className="text-gray-500 text-sm mt-1">{blog.date?.slice(0, 10)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
