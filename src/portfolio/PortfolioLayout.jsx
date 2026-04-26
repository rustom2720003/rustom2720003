import { useEffect, useRef, useState } from 'react'
import {
  Clock3,
  Menu,
  MoonStar,
  SunMedium,
  ThermometerSun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { navigationLinks } from './portfolioData'
import { cx, sectionClassName } from './classes'
import RemarksWidget from './RemarksWidget'
import { useLiveEnvironment } from './useLiveEnvironment'
import { useVisitorAnalytics } from './useVisitorAnalytics'

const mobileNavToneClasses = [
  {
    inactive:
      'bg-[image:var(--portfolio-mobile-tone-1-inactive)] text-white/92 hover:bg-[image:var(--portfolio-mobile-tone-1-hover)] hover:text-white',
    active:
      'bg-[image:var(--portfolio-mobile-tone-1-active)] text-white shadow-[var(--portfolio-mobile-tone-1-shadow)]',
  },
  {
    inactive:
      'bg-[image:var(--portfolio-mobile-tone-2-inactive)] text-white/92 hover:bg-[image:var(--portfolio-mobile-tone-2-hover)] hover:text-white',
    active:
      'bg-[image:var(--portfolio-mobile-tone-2-active)] text-white shadow-[var(--portfolio-mobile-tone-2-shadow)]',
  },
  {
    inactive:
      'bg-[image:var(--portfolio-mobile-tone-3-inactive)] text-white/92 hover:bg-[image:var(--portfolio-mobile-tone-3-hover)] hover:text-white',
    active:
      'bg-[image:var(--portfolio-mobile-tone-3-active)] text-white shadow-[var(--portfolio-mobile-tone-3-shadow)]',
  },
]

const backgroundMusicSource = `${import.meta.env.BASE_URL}music/Sitaare.mp3`

function BackgroundMusicControl() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const stopMusic = (updateState = true) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (updateState) {
      setIsPlaying(false)
    }
  }

  const startMusic = async () => {
    if (!audioRef.current) {
      return
    }

    try {
      audioRef.current.volume = 0.32
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  useEffect(() => () => stopMusic(false), [])

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic()
      return
    }

    startMusic()
  }

  return (
    <>
      <audio
        loop
        preload="none"
        ref={audioRef}
        src={backgroundMusicSource}
      />
      <button
        type="button"
        className="inline-flex h-[3.75rem] items-center justify-center gap-2 rounded-[1.25rem] border border-white/10 bg-[image:var(--portfolio-mobile-control-gradient)] px-[1.125rem] text-sm font-bold tracking-[0.04em] text-white shadow-[var(--portfolio-mobile-control-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-[image:var(--portfolio-mobile-control-gradient-hover)] md:h-12 md:rounded-full md:border-[color:var(--portfolio-glass-border)] md:bg-[color:var(--portfolio-glass-strong)] md:px-4 md:text-sm md:font-medium md:tracking-normal md:text-ink md:shadow-[var(--portfolio-soft-shadow)] md:hover:border-line-strong md:hover:bg-[color:var(--portfolio-glass-hover)]"
        aria-label={isPlaying ? 'Turn Sitaare music off' : 'Turn Sitaare music on'}
        aria-pressed={isPlaying}
        onClick={toggleMusic}
        title={isPlaying ? 'Turn Sitaare music off' : 'Turn Sitaare music on'}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="hidden min-[560px]:inline">Sitaare</span>
      </button>
    </>
  )
}

function PortfolioLayout({ theme = 'light', onToggleTheme = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDarkTheme = theme === 'dark'
  const { liveEnvironment, refreshLiveEnvironment } = useLiveEnvironment()
  const visitorAnalytics = useVisitorAnalytics()
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
              'nav-shimmer flex items-center justify-between gap-3.5 rounded-[2.2rem] border border-white/12 bg-[image:var(--portfolio-mobile-nav-shell)] px-4 py-3.5 shadow-[var(--portfolio-mobile-nav-shell-shadow)] backdrop-blur-2xl md:gap-3 md:rounded-[2rem] md:border-[color:var(--portfolio-nav-border)] md:bg-[color:var(--portfolio-nav-background)] md:px-4 md:py-2.5 md:shadow-[var(--portfolio-strong-shadow)]',
              menuOpen && 'overflow-visible',
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Link
                className="inline-flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-[image:var(--portfolio-mobile-logo-gradient)] font-display text-[1.18rem] font-black uppercase tracking-[0.19em] text-white shadow-[var(--portfolio-mobile-logo-shadow)] md:h-12 md:w-12 md:text-[0.95rem] md:tracking-[0.16em]"
                onClick={() => setMenuOpen(false)}
                to="/"
              >
                RSY
              </Link>

              <button
                type="button"
                className="live-pill-active inline-flex min-w-0 max-w-[11.75rem] items-center gap-2.5 rounded-[1.3rem] border border-[color:var(--portfolio-live-pill-border)] bg-[image:var(--portfolio-live-pill-gradient)] px-3.5 py-3.5 pr-5 text-[0.88rem] font-bold text-[color:var(--portfolio-live-pill-text)] shadow-[var(--portfolio-live-pill-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--portfolio-live-pill-hover-border)] hover:bg-[image:var(--portfolio-live-pill-gradient-hover)] sm:max-w-[12.4rem] md:max-w-[12.5rem] md:text-[0.82rem] lg:hidden"
                aria-label={livePillTitle}
                onClick={refreshLiveEnvironment}
                title={livePillTitle}
              >
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <Clock3 className="shrink-0" size={14} />
                  <span className="truncate">{navTimeLabel}</span>
                </span>
                <span className="h-4 w-px shrink-0 bg-[color:var(--portfolio-live-pill-divider)]" />
                <span className="inline-flex shrink-0 items-center gap-1 text-[color:var(--portfolio-live-pill-subtle-text)]">
                  <ThermometerSun size={14} />
                  {navTemperature}
                </span>
              </button>

              <button
                type="button"
                className="live-pill-active hidden items-center gap-2 rounded-full border border-[color:var(--portfolio-live-pill-border)] bg-[image:var(--portfolio-live-pill-gradient)] px-4 py-2 pr-5 text-sm text-[color:var(--portfolio-live-pill-text)] shadow-[var(--portfolio-live-pill-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--portfolio-live-pill-hover-border)] hover:bg-[image:var(--portfolio-live-pill-gradient-hover)] lg:inline-flex"
                aria-label={livePillTitle}
                onClick={refreshLiveEnvironment}
                title={livePillTitle}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {navTimeLabel}
                </span>
                <span className="h-4 w-px bg-[color:var(--portfolio-live-pill-divider)]" />
                <span className="inline-flex items-center gap-1.5 text-[color:var(--portfolio-live-pill-subtle-text)]">
                  <ThermometerSun size={15} />
                  {navTemperature}
                </span>
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:ml-auto">
              <nav
                className={cx(
                  'absolute left-4 right-4 top-[calc(100%+0.85rem)] flex-col gap-2.5 rounded-[1.85rem] border border-white/12 bg-[image:var(--portfolio-mobile-menu-gradient)] p-3.5 shadow-[var(--portfolio-mobile-menu-shadow)] backdrop-blur-2xl md:static md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:gap-2 md:rounded-full md:border md:border-[color:var(--portfolio-nav-tab-group-border)] md:bg-[color:var(--portfolio-nav-tab-group-background)] md:p-1.5 md:shadow-[var(--portfolio-nav-tab-group-shadow)] md:backdrop-blur-xl',
                  menuOpen ? 'flex' : 'hidden md:flex',
                )}
              >
                {navigationLinks.map((link, index) => {
                  const tone =
                    mobileNavToneClasses[index % mobileNavToneClasses.length]

                  return (
                  <NavLink
                    key={link.to}
                    className={({ isActive }) =>
                      cx(
                        'rounded-[1.3rem] px-[1.125rem] py-3.5 text-[1rem] font-black tracking-[0.05em] transition duration-200 hover:-translate-y-1 md:rounded-full md:border md:px-4 md:py-2.5 md:text-sm md:font-semibold md:tracking-normal md:hover:-translate-y-0.5',
                        isActive ? tone.active : tone.inactive,
                        isActive &&
                          'md:border-transparent md:bg-[image:var(--portfolio-nav-tab-active-gradient)] md:text-white md:shadow-[var(--portfolio-nav-tab-active-shadow)]',
                        !isActive &&
                          'md:border-[color:var(--portfolio-nav-tab-border)] md:bg-[color:var(--portfolio-nav-tab-background)] md:text-[color:var(--portfolio-nav-tab-text)] md:shadow-[var(--portfolio-nav-tab-shadow)] md:hover:border-[color:var(--portfolio-nav-tab-hover-border)] md:hover:bg-[color:var(--portfolio-nav-tab-hover-background)] md:hover:text-[color:var(--portfolio-nav-tab-hover-text)]',
                      )
                    }
                    end={link.end}
                    onClick={() => setMenuOpen(false)}
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                  )
                })}
              </nav>

              <BackgroundMusicControl />

              <button
                type="button"
                className="inline-flex h-[3.75rem] items-center justify-center gap-2 rounded-[1.25rem] border border-white/10 bg-[image:var(--portfolio-mobile-control-gradient)] px-[1.125rem] text-sm font-bold tracking-[0.04em] text-white shadow-[var(--portfolio-mobile-control-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-[image:var(--portfolio-mobile-control-gradient-hover)] md:h-12 md:rounded-full md:border-[color:var(--portfolio-glass-border)] md:bg-[color:var(--portfolio-glass-strong)] md:px-4 md:text-sm md:font-medium md:tracking-normal md:text-ink md:shadow-[var(--portfolio-soft-shadow)] md:hover:border-line-strong md:hover:bg-[color:var(--portfolio-glass-hover)]"
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
                className="inline-flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[1.25rem] border border-white/10 bg-[image:var(--portfolio-mobile-control-gradient)] text-white shadow-[var(--portfolio-mobile-control-shadow)] md:hidden"
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
        <Outlet
          context={{
            liveEnvironment,
            refreshLiveEnvironment,
            visitorAnalytics,
          }}
        />
      </main>

      <footer className={cx(sectionClassName, 'pt-0 pb-10')}>
        <p className="rounded-[1.4rem] border border-[color:var(--portfolio-footer-border)] bg-[color:var(--portfolio-footer-background)] px-5 py-4 text-sm leading-7 text-muted shadow-[var(--portfolio-soft-shadow)] backdrop-blur-xl">
          Portfolio built by me using React, featuring component-based architecture, routed pages, dynamic data mapping, reusable UI elements, and responsive design.
        </p>
      </footer>

      <RemarksWidget />
    </div>
  )
}

export default PortfolioLayout
