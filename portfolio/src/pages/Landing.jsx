import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper page-enter relative overflow-hidden">
      {/* Hero Section - Full Screen */}
      <div className="relative w-full h-screen overflow-hidden">
        
        {/* Background Image */}
        <img
          src="/images/projects/Fanta/Tokyo 09.09.25 III.jpg"
          alt="Portfolio hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Base dark overlay (bottom fade) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper opacity-20" />

        {/* NEW: radial vignette JUST for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Centered ENTER */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            to="/film"
            className="group relative flex flex-col items-center justify-center"
          >
            <span
              className="font-ui font-light uppercase text-paper"
              style={{
                fontSize: '30px',
                letterSpacing: '0.45em',
                textShadow: '0 0 18px rgba(0,0,0,0.55)',
                transition:
                  'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              ENTER
            </span>

            {/* underline */}
            <div
              style={{
                marginTop: '14px',
                height: '1px',
                width: '0%',
                background: 'rgba(255,255,255,0.75)',
                transition:
                  'width 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="enter-line"
            />

            {/* subtle metadata */}
            <span
              className="font-ui font-light uppercase text-paper"
              style={{
                marginTop: '18px',
                fontSize: '24px',
                letterSpacing: '0.35em',
                opacity: 0.8,
              }}
            >
              ART · DEPARTMENT
            </span>

            <style>{`
              .group:hover .enter-line {
                width: 100%;
              }

              .group:hover span:first-child {
                transform: translateY(-2px);
              }
            `}</style>
          </Link>
        </div>
      </div>
    </div>
  )
}