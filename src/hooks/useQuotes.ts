import { useEffect, useState } from 'react'

import type { Quote } from '../types'

interface QuoteState {
  quotes: Quote[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const QUOTES_URL = 'https://api.freeapi.app/api/v1/public/quotes?limit=300'

export const useQuotes = (): QuoteState => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadQuotes = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(QUOTES_URL)

      if (!response.ok) {
        throw new Error(`Unable to fetch quotes (${response.status})`)
      }

      const data = (await response.json()) as {
        data?: {
          data?: Quote[]
        }
      }

      const nextQuotes = data.data?.data ?? []

      if (nextQuotes.length === 0) {
        throw new Error('No quotes were returned by the API.')
      }

      setQuotes(nextQuotes)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong while loading quotes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadQuotes()
  }, [])

  return {
    quotes,
    loading,
    error,
    refresh: loadQuotes,
  }
}