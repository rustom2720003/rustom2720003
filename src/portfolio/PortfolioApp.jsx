import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GamesProvider } from './games/GamesContext.jsx'
import PortfolioLayout from './PortfolioLayout.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import GamePage from './pages/GamePage.jsx'
import GamesPage from './pages/GamesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ResumePage from './pages/ResumePage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import { usePortfolioTheme } from './usePortfolioTheme.js'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

function PortfolioApp() {
  const { theme, toggleTheme } = usePortfolioTheme()

  return (
    <BrowserRouter basename={routerBasename}>
      <GamesProvider>
        <Routes>
          <Route
            element={
              <PortfolioLayout onToggleTheme={toggleTheme} theme={theme} />
            }
          >
            <Route index element={<OverviewPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="games">
              <Route index element={<GamesPage />} />
              <Route path=":gameId" element={<GamePage />} />
            </Route>
            <Route path="resume" element={<ResumePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </GamesProvider>
    </BrowserRouter>
  )
}

export default PortfolioApp
