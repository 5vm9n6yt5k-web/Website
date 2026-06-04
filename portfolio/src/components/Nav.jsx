import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Film',       path: '/film'       },
  { label: 'Image',      path: '/image'      },
  { label: 'Experience', path: '/experience' },
  { label: 'About',      path: '/about'      },
]

export default function Nav({ dark = false }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const navClasses = [
    'nav-root',
    scrolled ? 'nav-scrolled' : '',
    dark && !scrolled ? 'nav-dark' : '',
  ].join(' ')

  const linkColor = dark && !scrolled ? 'text-paper' : 'text-ink'
  const logoColor = dark && !scrolled ? 'text-paper' : 'text-ink'

  return (
    <>
      <nav className={navClasses}>
        {/* Logo / Name */}
        <Link
          to="/"
          className={`font-ui font-light tracking-widest uppercase ${logoColor} hover:opacity-60 transition-opacity duration-300`}
          style={{ letterSpacing: '0.2em', fontSize: '24px' }}
        >
          Toby Goldsmith
        </Link>

        {/* Desktop links */}
        {location.pathname !== '/' && (
          <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = location.pathname === path
              return (
              <li key={path}>
                <Link
                  to={path}
                  className={`
                    font-ui font-light tracking-widest uppercase
                    link-underline transition-opacity duration-300
                    ${linkColor}
                    ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
                  `}
                  style={{ letterSpacing: '0.18em', fontSize: '18px' }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
        )}

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-1 cursor-pointer ${linkColor}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            } ${dark && !scrolled ? 'bg-paper' : 'bg-ink'}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            } ${dark && !scrolled ? 'bg-paper' : 'bg-ink'}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5' : ''
            } ${dark && !scrolled ? 'bg-paper' : 'bg-ink'}`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {location.pathname !== '/' && (
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
            className="font-ui font-light text-paper text-4xl tracking-widest hover:opacity-50 transition-opacity duration-300"
            style={{ letterSpacing: '0.12em' }}
          >
            {label}
          </Link>
        ))}
      </div>
      )}
    </>
  )
}
