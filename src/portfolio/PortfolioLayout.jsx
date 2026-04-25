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
              'radial-gradient(circle at 12% 12%, rgba(214, 63, 157, 0.26), transparent 31%), radial-gradient(circle at 86% 14%, rgba(124, 66, 238, 0.2), transparent 28%), radial-gradient(circle at 48% 84%, rgba(255, 118, 210, 0.18), transparent 34%), linear-gradient(180deg, #fff7fd 0%, #ffe9f7 34%, #ffd9ef 68%, #f6e6ff 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), rgba(151, 29, 106, 0.05) calc(50% - 0.5px), rgba(151, 29, 106, 0.05) calc(50% + 0.5px), transparent calc(50% + 0.5px), transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-80 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.18),transparent_80%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(151, 29, 106, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(151, 29, 106, 0.04) 1px, transparent 1px)',
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
              'nav-shimmer flex items-center justify-between gap-6 rounded-full border border-white/50 bg-white/58 px-4 py-2.5 shadow-[0_20px_48px_rgba(122,16,88,0.16)] backdrop-blur-2xl',
              menuOpen && 'overflow-visible',
            )}
          >
            <Link
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent via-[#ef5db8] to-teal font-display text-[0.95rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(151,29,106,0.28)]"
              onClick={() => setMenuOpen(false)}
              to="/"
            >
              RSY
            </Link>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/72 text-ink shadow-[0_10px_22px_rgba(122,16,88,0.12)] md:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav
              className={cx(
                'absolute left-4 right-4 top-[calc(100%+0.6rem)] flex-col gap-1 rounded-[1.2rem] border border-white/45 bg-white/82 p-2 shadow-portfolio backdrop-blur-xl md:static md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
                menuOpen ? 'flex' : 'hidden md:flex',
              )}
            >
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  className={({ isActive }) =>
                    cx(
                      'rounded-full px-3 py-2 text-sm font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:text-ink',
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
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>

      <footer className={cx(sectionClassName, 'pt-0 pb-10')}>
        <p className="rounded-[1.4rem] border border-white/45 bg-white/52 px-5 py-4 text-sm leading-7 text-muted shadow-[0_18px_44px_rgba(122,16,88,0.12)] backdrop-blur-xl">
          Portfolio for {profile.name} built with React components, routed
          pages, mapped data, reusable UI blocks, and responsive styling.
        </p>
      </footer>
    </div>
  )
}

export default PortfolioLayout
