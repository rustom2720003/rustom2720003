import { useState } from 'react'
import { Clock3, Menu, MoonStar, SunMedium, ThermometerSun, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { navigationLinks, profile } from './portfolioData'
import { cx, sectionClassName } from './classes'
import { useLiveEnvironment } from './useLiveEnvironment'

function PortfolioLayout({ theme = 'light', onToggleTheme = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDarkTheme = theme === 'dark'
  const { liveEnvironment, refreshLiveEnvironment } = useLiveEnvironment()
  const navTemperature =
    liveEnvironment.temperature !== null
      ? `${Math.round(liveEnvironment.temperature)}\u00B0C`
      : '--'
  const navTimeLabel =
    liveEnvironment.status === 'error'
      ? 'Location off'
      : liveEnvironment.timeSnapshot.clockLabel
  const livePillTitle =
    liveEnvironment.status === 'error'
      ? 'Turn on location and retry'
      : 'Refresh live time and temperature'

  return (
    <div className="relative min-h-screen overflow-x-hidden font-body text-ink">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'var(--portfolio-page-background)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'none',
          }}
        />
        <div
          className="absolute inset-0 opacity-80 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.18),transparent_80%)]"
          style={{
            backgroundImage: 'var(--portfolio-page-grid-pattern)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <header className="sticky top-0 z-20 pt-3 pb-2">
        <div className={cx(sectionClassName, 'relative py-0')}>
          <div
            className={cx(
              'nav-shimmer flex items-center justify-between gap-3 rounded-[2rem] border border-[color:var(--portfolio-nav-border)] bg-[color:var(--portfolio-nav-background)] px-4 py-2.5 shadow-[var(--portfolio-strong-shadow)] backdrop-blur-2xl',
              menuOpen && 'overflow-visible',
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Link
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent via-[#ef5db8] to-teal font-display text-[0.95rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(151,29,106,0.28)]"
                onClick={() => setMenuOpen(false)}
                to="/"
              >
                RSY
              </Link>

              <button
                type="button"
                className="inline-flex min-w-0 max-w-[8.9rem] items-center gap-1.5 rounded-full border border-[color:var(--portfolio-glass-border)] bg-[color:var(--portfolio-glass-strong)] px-2.5 py-2 text-[0.72rem] text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] sm:max-w-[10.75rem] sm:px-3 sm:text-[0.78rem] md:max-w-[12.5rem] lg:hidden"
                aria-label={livePillTitle}
                onClick={refreshLiveEnvironment}
                title={livePillTitle}
              >
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <Clock3 className="shrink-0" size={14} />
                  <span className="truncate">{navTimeLabel}</span>
                </span>
                <span className="h-4 w-px shrink-0 bg-line" />
                <span className="inline-flex shrink-0 items-center gap-1 text-muted">
                  <ThermometerSun size={14} />
                  {navTemperature}
                </span>
              </button>

              <button
                type="button"
                className="hidden items-center gap-2 rounded-full border border-[color:var(--portfolio-glass-border)] bg-[color:var(--portfolio-glass-strong)] px-4 py-2 text-sm text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] lg:inline-flex"
                aria-label={livePillTitle}
                onClick={refreshLiveEnvironment}
                title={livePillTitle}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {navTimeLabel}
                </span>
                <span className="h-4 w-px bg-line" />
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <ThermometerSun size={15} />
                  {navTemperature}
                </span>
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:ml-auto">
              <nav
                className={cx(
                  'absolute left-4 right-4 top-[calc(100%+0.6rem)] flex-col gap-1 rounded-[1.2rem] border border-[color:var(--portfolio-nav-border)] bg-[color:var(--portfolio-nav-popup-background)] p-2 shadow-portfolio backdrop-blur-xl md:static md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
                  menuOpen ? 'flex' : 'hidden md:flex',
                )}
              >
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    className={({ isActive }) =>
                      cx(
                        'rounded-full px-3 py-2 text-sm font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--portfolio-glass-chip)] hover:text-ink',
                        isActive &&
                          'bg-accent-soft text-accent-strong shadow-[inset_0_0_0_1px_rgba(151,29,106,0.12)]',
                      )
                    }
                    end={link.end}
                    onClick={() => setMenuOpen(false)}
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[color:var(--portfolio-glass-border)] bg-[color:var(--portfolio-glass-strong)] px-4 text-sm font-medium text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]"
                aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
                onClick={onToggleTheme}
                title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
              >
                {isDarkTheme ? <SunMedium size={18} /> : <MoonStar size={18} />}
                <span className="hidden min-[480px]:inline">
                  {isDarkTheme ? 'Light' : 'Dark'}
                </span>
              </button>

              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--portfolio-glass-border)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)] md:hidden"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-8rem)]">
        <Outlet context={{ liveEnvironment, refreshLiveEnvironment }} />
      </main>

      <footer className={cx(sectionClassName, 'pt-0 pb-10')}>
        <p className="rounded-[1.4rem] border border-[color:var(--portfolio-footer-border)] bg-[color:var(--portfolio-footer-background)] px-5 py-4 text-sm leading-7 text-muted shadow-[var(--portfolio-soft-shadow)] backdrop-blur-xl">
          Portfolio for {profile.name} built with React components, routed
          pages, mapped data, reusable UI blocks, and responsive styling.
        </p>
      </footer>
    </div>
  )
}

export default PortfolioLayout
