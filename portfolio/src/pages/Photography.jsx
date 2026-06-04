import { useState, useMemo, useCallback, useEffect } from 'react'
import { photographyCollections } from '../data/photography'

// ─── CHANGE THIS GRADIENT ─────────────────────────────────
const NAV_GRADIENT = `
  linear-gradient(
    to bottom,
    rgba(163, 153, 153, 0.7) 0%,
    rgba(168, 159, 159, 0.6) 20%,
    rgba(255,255,255,0.00) 100%
  )
`

// ─── FLATTEN ALL IMAGES ───────────────────────────────────
function useAllImages() {
  return useMemo(() => {
    return photographyCollections.flatMap((col) =>
      col.images.map((img) => ({
        src: img.src,
        title: col.title,
        year: col.year,
        collection: col.id,
      }))
    )
  }, [])
}

// ─── TILE ────────────────────────────────────────────────
function ImageTile({ image, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div onClick={() => onOpen(index)} style={{ cursor: 'pointer' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '66%',
          overflow: 'hidden',
          background: '#eee',
        }}
      >
        <img
          src={image.src}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 4 ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* title overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            fontSize: 9,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {image.title}
        </div>
      </div>
    </div>
  )
}

// ─── LIGHTBOX ──────────────────────────────────────────────
function Lightbox({ images, initial, onClose }) {
  const [index, setIndex] = useState(initial)
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const active = images[index]

  const close = () => onClose()

  // ─── IMAGE PRELOADING ───────────────────────────────────
  useEffect(() => {
    const preloadIndexes = [
      (index + 1) % images.length,
      (index - 1 + images.length) % images.length,
    ]

    preloadIndexes.forEach((i) => {
      const img = new Image()
      img.src = images[i].src
    })
  }, [index, images])

  // ─── NAVIGATION WITH MOMENTUM EASING ────────────────────
  const changeImage = (newIndex) => {
    setTransitioning(true)
    setLoaded(false)

    setTimeout(() => {
      setIndex(newIndex)
      setTransitioning(false)
    }, 120)
  }

  // ─── KEYBOARD NAVIGATION ───────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        close()
      }

      if (e.key === 'ArrowRight') {
        changeImage((index + 1) % images.length)
      }

      if (e.key === 'ArrowLeft') {
        changeImage(
          index === 0 ? images.length - 1 : index - 1
        )
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [index, images.length])

  // ─── SCRUB CONTROL ─────────────────────────────────────
  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newIndex = Math.floor(ratio * images.length)

    changeImage(
      Math.max(0, Math.min(images.length - 1, newIndex))
    )
  }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* PREV CLICK ZONE */}
      <div
        onClick={(e) => {
          e.stopPropagation()

          changeImage(
            index === 0 ? images.length - 1 : index - 1
          )
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '20%',
          cursor: 'w-resize',
          zIndex: 5,
        }}
      />

      {/* NEXT CLICK ZONE */}
      <div
        onClick={(e) => {
          e.stopPropagation()

          changeImage((index + 1) % images.length)
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '20%',
          cursor: 'e-resize',
          zIndex: 5,
        }}
      />

      {/* image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90vw',
          maxWidth: 1200,
          transform: transitioning
            ? 'scale(0.985)'
            : 'scale(1)',
          opacity: transitioning ? 0.82 : 1,
          transition:
            'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={active.src}
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            opacity: loaded ? 1 : 0,
            transition:
              'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* scrub bar */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          handleScrub(e)
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          bottom: 28,
          width: '420px',
          height: '20px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        {/* base line */}
        <div
          style={{
            position: 'absolute',
            top: 9,
            left: 0,
            right: 0,
            height: hovered ? '2px' : '1px',
            background: 'rgba(255,255,255,0.08)',
            transition:
              'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* progress */}
        <div
          style={{
            position: 'absolute',
            top: 9,
            left: 0,
            height: hovered ? '2px' : '1px',
            width: `${((index + 1) / images.length) * 100}%`,
            background: 'rgba(255,255,255,0.42)',
            transition:
              'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* inactive fade */}
        <div
          style={{
            position: 'absolute',
            top: 9,
            right: 0,
            height: hovered ? '2px' : '1px',
            width: `${100 - (((index + 1) / images.length) * 100)}%`,
            background: 'rgba(255,255,255,0.04)',
            transition:
              'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* title */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          color: 'rgba(255,255,255,0.28)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          transition:
            'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {active.title} · {active.year}
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────
export default function Photography() {
  const images = useAllImages()
  const [lightbox, setLightbox] = useState(null)

  const open = useCallback((i) => setLightbox(i), [])

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* NAVIGATION GRADIENT */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: NAV_GRADIENT,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />

      {/* header */}
      <div
        style={{
          padding: '120px 32px 40px',
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 300 }}>
          IMAGE
        </h1>

        <p style={{ opacity: 0.5 }}>
          Ski Photographer | Niseko 25/26 Season
        </p>
      </div>

      {/* ALL IMAGES GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px 80px',
        }}
      >
        {images.map((img, i) => (
          <ImageTile
            key={i}
            image={img}
            index={i}
            onOpen={open}
          />
        ))}
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={images}
          initial={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}