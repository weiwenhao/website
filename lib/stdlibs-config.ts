// Standard library list configuration
// This file contains the complete list of Nature language standard libraries
// Can be imported by both server and client components

export interface StdLib {
  name: string
  slug: string
}

// Complete standard library list for Nature language
export const STDLIBS_LIST = [
  'base64', 'co', 'crypto', 'elf', 'fmt', 'fs', 'http', 'io', 'json',
  'libc', 'mem', 'net', 'os', 'path', 'process', 'reflect', 'runtime',
  'strings', 'syscall', 'time', 'unsafe'
]

/**
 * Get standard library list from configuration (client-side compatible)
 * Returns the configured list without remote validation
 */
export function getStdLibsList(): StdLib[] {
  return STDLIBS_LIST.map(name => ({
    name,
    slug: name
  })).sort((a, b) => a.name.localeCompare(b.name))
}