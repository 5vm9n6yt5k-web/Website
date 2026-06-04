import ExperienceSidebar from '../components/experience/ExperienceSidebar'
import ExperienceGrid from '../components/experience/ExperienceGrid'
import { experience, education, employment, technicalSkills, contact } from '../data/experience'

// 🔧 ONE CONTROL ONLY: overall page width
const PAGE_WIDTH = 'max-w-7xl'

export default function Experience() {
  return (
    <div className="min-h-screen bg-paper page-enter">

      <main className={`pt-32 pb-24 px-8 md:px-12 lg:px-16 ${PAGE_WIDTH} mx-auto`}>

        {/* ─── TITLE ───────────────────────────── */}
        <div className="mb-16">
          <p
            className="font-ui font-light text-mid uppercase mb-6"
            style={{ fontSize: '9px', letterSpacing: '0.25em' }}
          >
            Experience
          </p>

          <h1
            className="font-ui font-light text-ink"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}
          >
            Credits &<br />Background
          </h1>
        </div>

        {/* ─── GRID ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* LEFT */}
          <div className="lg:col-span-3">
            <ExperienceSidebar
              contact={contact}
              technicalSkills={technicalSkills}
              education={education}
              employment={employment}
            />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-9">
            <ExperienceGrid entries={experience} />
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-light px-8 md:px-16 lg:px-24 py-6 flex justify-between">
        <span className="font-ui font-light text-mid uppercase" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
          © {new Date().getFullYear()} Toby Goldsmith
        </span>

        <span className="font-ui font-light text-mid uppercase" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
          Barcelona · London
        </span>
      </footer>
    </div>
  )
}