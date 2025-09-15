import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { createHighlighter } from 'shiki'
import fs from 'fs'
import path from 'path'

interface RemoteMDXRendererProps {
  content: string
  className?: string
}

// Configure rehype-pretty-code options to match next.config.mjs
const prettyCodeOptions = {
  bypassInlineCode: true,
  showLineNumbers: true,
  theme: 'github-light',
  getHighlighter: async (options: { langs?: unknown[]; themes?: string[] }) => {
    // Load custom language definition using fs (server-side only)
    const natureLangPath = path.join(process.cwd(), 'lib', 'nature-lang.json')
    const natureLang = JSON.parse(fs.readFileSync(natureLangPath, 'utf8'))

    return await createHighlighter({
      ...options,
      langs: [natureLang],
      themes: ['github-light']
    })
  },
  // When no language is specified, default to nature for better syntax highlighting
  defaultLang: 'nature'
}

export default function RemoteMDXRenderer({ content, className = '' }: RemoteMDXRendererProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <MDXRemote 
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              [remarkToc, {
                heading: 'Table of Contents',
                maxDepth: 2,
                tight: true
              }]
            ],
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behaviour: 'append',
                  properties: {
                    ariaHidden: true,
                    tabIndex: -1,
                    className: 'hash-link'
                  }
                }
              ]
            ]
          }
        }}
      />
    </div>
  )
}