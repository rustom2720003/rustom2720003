import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import PortfolioLayout from './PortfolioLayout.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ResumePage from './pages/ResumePage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import { usePortfolioTheme } from './usePortfolioTheme.js'

function PortfolioApp() {
  const { theme, toggleTheme } = usePortfolioTheme()

  return (
    <HashRouter>
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
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default PortfolioApp
