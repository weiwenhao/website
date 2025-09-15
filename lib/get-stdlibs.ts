'use server'

export interface StdLibContent {
  content: string
  metadata?: {
    title?: string
    description?: string
    [key: string]: string | number | boolean | undefined
  }
}

/**
 * Fetch standard library content from remote repository
 * @param slug - The standard library slug (e.g., 'fmt', 'io')
 * @returns Promise with the Markdown content and metadata
 */
export async function getStdLibContent(slug: string): Promise<StdLibContent | null> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/nature-lang/nature/refs/heads/master/std/${slug}/README.md`,
      {
        cache: 'force-cache', // Cache for 1 hour
        next: { revalidate: 3600 } // Revalidate every hour
      }
    )

    if (!response.ok) {
      console.error(`Failed to fetch std lib content for '${slug}': ${response.status}`)
      return null
    }

    const content = await response.text()
    
    // Extract basic metadata from content if needed
    // For now, just return the raw content
    return {
      content,
      metadata: {
        title: slug,
        description: `Standard library documentation for ${slug}`
      }
    }
  } catch (error) {
    console.error(`Failed to get std lib content for '${slug}':`, error)
    return null
  }
}