# FreeAPI Quote App

A simple React + TypeScript app built with Vite that shows random quotes fetched from a public API. It includes a clean UI, theme support, local quote history, and quote sharing actions.

## 🚀 What it does

- Fetches quotes from a free quote API
- Displays a quote card with text and author
- Allows users to get a new random quote
- Supports light/dark theme toggling
- Shows a loading indicator while the quote loads
- Stores favorite quotes in local storage for persistence

## 🧩 Tech stack

- `React` for user interface
- `TypeScript` for static typing
- `Vite` for fast development and build
- `Tailwind CSS` for styling
- Browser `fetch` for API requests
- `localStorage` for saving user data

## 📁 Project structure

- `src/App.tsx` — main app shell and page layout
- `src/main.tsx` — app bootstrap with Vite
- `src/components/QuoteCard.tsx` — quote display card
- `src/components/ActionButtons.tsx` — buttons for refresh, share, and theme actions
- `src/components/Loader.tsx` — loading spinner UI
- `src/components/Navbar.tsx` — top navigation bar
- `src/components/TextRotate.tsx` — animated rotating text effect
- `src/hooks/useQuotes.ts` — quote fetching and state management
- `src/hooks/useLocalStorage.ts` — local storage helper hook
- `src/hooks/useTheme.ts` — theme state and persistence hook
- `src/utils/quotes.ts` — quote-related utilities or sample quote data

## 🧠 How it works

1. `useQuotes.ts` fetches a random quote from the API and tracks loading state.
2. The `QuoteCard` component renders the quote text and author.
3. `ActionButtons` provides controls for:
   - loading a new quote
   - copying the current quote
   - toggling between light and dark mode
4. `useTheme.ts` saves the selected theme in `localStorage` and applies it to the document.
5. `useLocalStorage.ts` abstracts storing values in `localStorage`, so favorite or last-used settings persist across sessions.

## 🛠️ Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal, usually `http://localhost:5173`.

## 📦 Build for production

```bash
npm run build
```

## 💡 Notes

- If the API request fails, the app should show a fallback or retry behavior.
- The UI is designed to be responsive and should work well on desktop and mobile.
- You can extend the app with quote categories, favorites, or author search.
