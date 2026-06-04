import { useState } from 'react'

export default function About() {
  // ✔️ SIMPLE CODE SWITCH (NO UI TOGGLE)
  const IS_BW = true // set false for colour

  return (
    <div className="min-h-screen bg-paper page-enter flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center px-8 md:px-16 lg:px-24 pt-24">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-12">

            {/* Label */}
            <div className="lg:col-span-3">
              <p
                className="font-ui font-light text-mid uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.25em' }}
              >
                About
              </p>

              {/* HEADSHOT (LANDSCAPE IMAGE SLOT) */}
              <div
                style={{
                  width: '120%',
                  maxWidth: '700px',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  background: '#eaeaea',
                  marginTop: '16px',
                }}
              >
                <img
                  src="/images/projects/Toby/toby1.JPG"
                  alt="Headshot"
                  style={{
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 1,
                    filter: IS_BW ? 'grayscale(70%)' : 'none',
                  }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-7 lg:col-start-5">

              <h1
                className="font-ui font-light text-ink mb-16"
                style={{
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  lineHeight: 1.0,
                }}
              >
                ART
                <br />
                DEPARTMENT
              </h1>

              <div className="section-rule mb-12" />

              {/* Description */}
              <div className="mb-12">
                <p
                  className="font-ui font-light text-mid uppercase mb-3"
                  style={{ fontSize: '9px', letterSpacing: '0.22em' }}
                >
                  |||
                </p>

                <p
                  className="font-ui font-light text-dim leading-relaxed"
                  style={{ fontSize: '14px', maxWidth: '680px' }}
                >
                  Based between London and Barcelona, I work across the art
                  department from assistant and 3D designer to art director.

                  <br />
                  <br />

                  With a background in architecture and several years’
                  experience as an architectural designer in Manchester, I bring
                  a strong eye for design, spatial storytelling, and visual
                  detail to every project. My work spans commercials, blending
                  technical precision with a passion for creative world-building in the digital and physical space.
                </p>
              </div>

              <div className="section-rule mb-12" />

              {/* Email */}
              <div className="mb-12">
                <p
                  className="font-ui font-light text-mid uppercase mb-3"
                  style={{ fontSize: '9px', letterSpacing: '0.22em' }}
                >
                  Email
                </p>

                <a
                  href="mailto:tobyrexgoldsmith@gmail.com"
                  className="font-ui font-light text-ink link-underline"
                  style={{ fontSize: 'clamp(20px, 3vw, 36px)' }}
                >
                  tobyrexgoldsmith@gmail.com
                </a>
              </div>

              <div className="section-rule mb-12" />

              {/* Info */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div>
                  <p
                    className="font-ui font-light text-mid uppercase mb-2"
                    style={{ fontSize: '9px', letterSpacing: '0.2em' }}
                  >
                    Phone
                  </p>

                  <p
                    className="font-ui font-light text-dim"
                    style={{ fontSize: '14px' }}
                  >
                    +44 75380 92211
                  </p>
                </div>

                <div>
                  <p
                    className="font-ui font-light text-mid uppercase mb-2"
                    style={{ fontSize: '9px', letterSpacing: '0.2em' }}
                  >
                    Open to
                  </p>

                  <p
                    className="font-ui font-light text-dim"
                    style={{ fontSize: '14px' }}
                  >
                    Worldwide
                  </p>
                </div>

                <div>
                    
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-light px-8 md:px-16 lg:px-24 py-6 flex justify-between">
        <span
          className="font-ui font-light text-mid uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.2em' }}
        >
          © {new Date().getFullYear()} Toby Goldsmith
        </span>

        <span
          className="font-ui font-light text-mid uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.2em' }}
        >
          Barcelona · London
        </span>
      </footer>
    </div>
  )
}