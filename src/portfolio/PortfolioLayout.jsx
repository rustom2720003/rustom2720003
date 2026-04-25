import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { navigationLinks, profile } from './portfolioData'
import { cx, sectionClassName } from './classes'

function PortfolioLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden font-body text-ink">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at top left, rgba(47, 102, 112, 0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(190, 91, 46, 0.22), transparent 36%), linear-gradient(180deg, #f7f1e7 0%, #efe6d8 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), rgba(16, 41, 47, 0.03) calc(50% - 0.5px), rgba(16, 41, 47, 0.03) calc(50% + 0.5px), transparent calc(50% + 0.5px), transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-80 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.18),transparent_80%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16, 41, 47, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 41, 47, 0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <header className="sticky top-0 z-20 py-4">
        <div className={cx(sectionClassName, 'relative py-0')}>
          <div className="flex items-center justify-between gap-6 rounded-full border border-white/40 bg-white/70 px-4 py-3 shadow-[0_12px_30px_rgba(16,41,47,0.08)] backdrop-blur-xl">
            <Link
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-teal font-display text-[0.95rem] font-bold uppercase tracking-[0.16em] text-white"
              onClick={() => setMenuOpen(false)}
              to="/"
            >
              RSY
            </Link>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/60 text-ink md:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav
              className={cx(
                'absolute left-4 right-4 top-[calc(100%+0.6rem)] flex-col gap-1 rounded-[1.2rem] border border-line bg-white/90 p-2 shadow-portfolio backdrop-blur-xl md:static md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
                menuOpen ? 'flex' : 'hidden md:flex',
              )}
            >
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  className={({ isActive }) =>
                    cx(
                      'rounded-full px-3 py-2 text-sm text-muted transition duration-200 hover:-translate-y-0.5 hover:bg-white/60 hover:text-ink',
                      isActive && 'bg-black/5 text-ink',
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
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-9rem)]">
        <Outlet />
      </main>

      <footer className={cx(sectionClassName, 'pt-0 pb-10 text-sm leading-7 text-muted')}>
        <p>
          Portfolio for {profile.name} built with React components, routed
          pages, mapped data, reusable UI blocks, and responsive styling.
        </p>
      </footer>
    </div>
  )
}

export default PortfolioLayout
