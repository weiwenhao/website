import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import { createHighlighter } from "shiki";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import fs from 'fs';


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  bypassInlineCode: true,
  showLineNumbers: true,
  theme: 'github-light',
  getHighlighter: async (options) => {
    // 加载自定义语言定义
    const naxLang = JSON.parse(fs.readFileSync('./lib/nax-lang.json', 'utf8'));

    return await createHighlighter({
      ...options,
      langs: [naxLang],
      themes: ['github-light']
    });
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, [remarkToc, {
      heading: "toc his page", // 可选，定义TOC的标题
      maxDepth: 2,    // 只包含h2标题
      tight: true     // 紧凑模式
    }]],
    rehypePlugins: [[rehypePrettyCode, options], rehypeSlug, [
      rehypeAutolinkHeadings,
      {
        behaviour: 'append',
        properties: {
          ariaHidden: true,
          tabIndex: -1,
          className: 'hash-link'
        }
      }
    ]],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)