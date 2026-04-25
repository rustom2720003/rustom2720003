import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'rustom-portfolio-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'dark'
}

export function usePortfolioTheme() {
  const [theme, setTheme] = useState(() => getInitialTheme())

  useEffect(() => {
    const root = document.documentElement

    root.dataset.theme = theme
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return {
    theme,
    isDarkTheme: theme === 'dark',
    toggleTheme,
  }
}
