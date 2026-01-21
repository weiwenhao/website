'use server'

import { readdirSync, readFileSync } from 'fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export interface BlogItem {
  title: string
  date: string
  slug: string
  tags?: string[]
}

export async function getBlog(): Promise<BlogItem[]> {
  try {
    const blogDir = join(process.cwd(), 'content/blog')
    const files = readdirSync(blogDir)
    
    const blogItems = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = join(blogDir, file)
        const fileContent = readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        const slug = file.replace('.mdx', '')
        
        return {
          title: data.title || slug,
          date: data.date ? new Date(data.date).toISOString() : '',
          slug: slug,
          tags: data.tags || []
        }
      })
      
    return blogItems.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('获取博客列表失败:', error)
    return []
  }
}
