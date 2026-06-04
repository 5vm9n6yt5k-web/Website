import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { projects } from '../data/projects'

export default function Project() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ytError, setYtError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const project = projects.find(p => p.id === id)

  useEffect(() => {
    if (!project) navigate('/')
    window.scrollTo(0, 0)
  }, [project, navigate])

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    return () => {
      document.body.removeChild(tag)
    }
  }, [])

  // Listen for YouTube state changes
  useEffect(() => {
    const onMessage = (event) => {
      if (!event.data) return

      try {
        const data =
          typeof event.data === 'string'
            ? JSON.parse(event.data)
            : event.data

        if (data.event === 'onStateChange') {
          // 1 = playing, 2 = paused
          if (data.info === 1) setIsPlaying(true)
          if (data.info === 2) setIsPlaying(false)
        }
      } catch {}
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  if (!project) return null

  const currentIndex = projects.findIndex(p => p.id === id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const getYouTubeId = (url) => {
    try {
      const parsed = new URL(url)

      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.slice(1)
      }

      if (parsed.searchParams.get('v')) {
        return parsed.searchParams.get('v')
      }

      const match = url.match(/embed\/([^?]+)/)
      return match ? match[1] : null
    } catch {
      return null
    }
  }

  const hero = project.heroMedia || project.media

  // ─── YEAR FORMATTER (FIXED) ───────────────────────────────────
  const formatYear = (p) => {
    if (!p.yearStart) return ''
    if (p.yearEnd) return `${p.yearStart}–${p.yearEnd}`
    return `${p.yearStart}`
  }

  return (
    <div className="bg-ink page-enter">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <div className="hero-image-container relative">

        {(() => {

          // ─── YOUTUBE ───────────────────────────────────────
          if (
            hero.type === 'video' &&
            hero.source === 'youtube' &&
            !ytError
          ) {
            const videoId = getYouTubeId(hero.src)

            if (!videoId) {
              return (
                <img
                  src={project.media.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )
            }

            return (
              <iframe
                id="yt-player"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&playsinline=1&rel=0&modestbranding=1`}
                title={project.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover relative z-0"
                style={{ border: 0 }}
                onError={() => setYtError(true)}
              />
            )
          }

          // ─── LOCAL VIDEO ───────────────────────────────────
          if (hero.type === 'video' && hero.source === 'local') {
            return (
              <video
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={hero.src} type="video/mp4" />
              </video>
            )
          }

          // ─── IMAGE FALLBACK ────────────────────────────────
          return (
            <img
              src={hero.src}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )

        })()}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(12,11,10,0.2) 0%, rgba(12,11,10,0.5) 100%)',
          }}
        />

        {/* Hero title */}
        <div
          className="absolute bottom-0 left-0 right-0 p-10 md:p-16 z-20 pointer-events-none transition-all duration-500"
          style={{
            opacity: isPlaying ? 0.1 : 1,
            transform: isPlaying ? 'translateY(10px)' : 'translateY(0px)',
          }}
        >
          <p
            className="font-ui font-light text-paper/50 uppercase mb-3"
            style={{ fontSize: '10px', letterSpacing: '0.25em' }}
          >
            {project.category}
            {formatYear(project) ? ` | ${formatYear(project)}` : ''}
          </p>

          <h1
            className="font-ui font-light text-paper"
            style={{ fontSize: 'clamp(36px, 7vw, 88px)', lineHeight: 1.0 }}
          >
            {project.title}
          </h1>
        </div>

      </div>

      {/* ─── INFO STRIP ───────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {[
          { label: 'Role', value: project.role },
          { label: 'Type', value: project.category },
          { label: 'Director', value: project.director },
          { label: 'HOD', value: project.hod || project.tags?.join(', ') },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="px-8 py-6 border-r"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="font-ui font-light text-paper/40 uppercase mb-1"
              style={{ fontSize: '9px', letterSpacing: '0.2em' }}
            >
              {label}
            </p>

            <p className="font-ui font-light text-paper/80"
              style={{ fontSize: '13px' }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── DESCRIPTION ─────────────────────────────────────── */}
      <div className="px-8 py-16 md:px-24 md:py-20 max-w-4xl">
        <p className="font-ui font-light text-paper/90 leading-relaxed"
          style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', lineHeight: 1.6 }}
        >
          {project.description}
        </p>
      </div>

      {/* ─── GALLERY ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 px-4 py-4">

        {project.gallery?.map((item, i) => (
          <div key={i} className="w-full border border-white/0 bg-[#0] p-2">

            {item.type === 'video' ? (
              <video
                src={item.src}
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                className="w-full object-contain"
                style={{ height: 'clamp(300px, 45vw, 640px)' }}
              />
            ) : (
              <img
                src={item.src}
                alt={`${project.title} ${i + 1}`}
                className="w-full object-contain"
                style={{ height: 'clamp(300px, 45vw, 640px)' }}
                loading="lazy"
              />
            )}

          </div>
        ))}
      </div>

      {/* ─── NEXT PROJECT ────────────────────────────────────── */}
      <div className="mt-1">
        <Link
          to={`/project/${nextProject.id}`}
          className="relative block overflow-hidden group"
          style={{ height: 'clamp(60px, 10vw, 140px)' }}
        >
          <img
            src={nextProject.media.src}
            alt={nextProject.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-black/80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-white/50 uppercase text-[10px] tracking-widest mb-4">
              Next Project
            </p>

            <h3 className="text-white text-[clamp(24px,4vw,20px)]">
              {nextProject.title}
            </h3>
          </div>
        </Link>
      </div>

    </div>
  )
}