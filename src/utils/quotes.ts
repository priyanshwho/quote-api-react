import type { Quote } from '../types'

export const normalizeText = (value: string) => value.toLowerCase().trim()

export const matchesQuote = (quote: Quote, query: string) => {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return true
  }

  const haystack = [quote.author, quote.content, ...quote.tags].join(' ')

  return normalizeText(haystack).includes(normalizedQuery)
}

export const getRandomQuote = (quotes: Quote[], currentId?: number) => {
  if (quotes.length === 0) {
    return null
  }

  if (quotes.length === 1) {
    return quotes[0]
  }

  let nextQuote = quotes[Math.floor(Math.random() * quotes.length)]

  if (currentId && nextQuote.id === currentId) {
    const availableQuotes = quotes.filter((quote) => quote.id !== currentId)
    nextQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
  }

  return nextQuote
}

export const getDailyQuote = (quotes: Quote[]) => {
  if (quotes.length === 0) {
    return null
  }

  const todaySeed = new Date().getDay() + new Date().getMonth() * 31 + new Date().getDate()

  return quotes[todaySeed % quotes.length]
}

export const buildShareText = (quote: Quote) => {
  const text = `"${quote.content}" — ${quote.author}`
  const url = window.location.href

  return `${text}\n${url}`
}