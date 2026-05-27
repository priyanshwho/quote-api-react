export interface Quote {
  id: number
  author: string
  content: string
  tags: string[]
  authorSlug: string
  length: number
  dateAdded: string
  dateModified: string
}

export type ThemeMode = 'light' | 'dark'