import { createContext, useContext, useMemo } from 'react'
import { gamesCatalog } from './gamesData'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const value = useMemo(
    () => ({
      games: gamesCatalog,
      getGameById: (gameId) =>
        gamesCatalog.find((game) => game.id === gameId) ?? null,
    }),
    [],
  )

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export function useGames() {
  const context = useContext(GamesContext)

  if (!context) {
    throw new Error('useGames must be used inside GamesProvider')
  }

  return context
}
