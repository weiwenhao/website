import { getNews } from '@/lib/get-news'
import Link from 'next/link'

export default async function NewsPage() {
  const newsList = await getNews()

  return (
    <div>
      <ul className="space-y-6">
        {newsList.length === 0 && <li className="text-gray-500">暂无新闻</li>}
        {newsList.map(news => (
          <li key={news.slug} className="border-b pb-4">
            <Link href={`/news/${news.slug}`} className="text-xl no-underline font-semibold text-nax-red transition-colors duration-200 hover:text-red-700">
              {news.title}
            </Link>
            <div className="text-gray-500 text-sm mt-1">{news.date?.slice(0, 10)}</div>
            {/* {news.tags && news.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {news.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  )
}