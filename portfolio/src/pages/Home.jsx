import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { projects } from '../data/projects'

function ProjectCard({ project }) {
  const [isColor, setIsColor] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsColor(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsColor(false)
    }, 20)
  }

  // ─── YEAR FORMATTER (FIX) ───────────────────────────────
  const formatYear = (p) => {
    if (!p.yearStart) return ''
    if (p.yearEnd) return `${p.yearStart}–${p.yearEnd}`
    return `${p.yearStart}`
  }

  return (
    <Link
      to={`/project/${project.id}`}
      className="project-card relative overflow-hidden bg-black aspect-[4/5]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={project.media.src}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{
          filter: isColor ? 'grayscale(0%)' : 'grayscale(100%)',
          transition: isColor
            ? 'filter 0.3s ease'
            : 'filter 0.3s ease 0.5s'
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p
          className="font-ui font-light text-paper/60 uppercase mb-2"
          style={{ fontSize: '9px', letterSpacing: '0.2em' }}
        >
          {project.category}
          {formatYear(project) ? ` | ${formatYear(project)}` : ''}
        </p>

        <h2
          className="font-ui font-light text-paper"
          style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: 1.1 }}
        >
          {project.title}
        </h2>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">

      <main className="pt-[100px] pb-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

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