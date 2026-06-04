import React from 'react'
import ExperienceRow from './ExperienceRow'

export default function ExperienceGrid({
  entries,
  columnsTemplate = DEFAULT_COLUMNS_TEMPLATE,
  rowVPadding = '12px',
  rowMinHeight = 'auto'
}) {
  const sorted = [...entries].sort((a, b) => {
    if (a.year && b.year) return b.year - a.year
    return 0
  })

  return (
    <section>

      {/* STICKY WRAPPER (IMPORTANT FIX) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'transparent',
        }}
      >
        {/* Header row */}
        <div
          className="hidden md:grid font-ui font-light text-mid mb-3"
          style={{
            gridTemplateColumns: columnsTemplate,
            paddingTop: '12px',
            paddingBottom: '12px',
          }}
        >
          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            Production
          </div>

          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            Client
          </div>

          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            Production Co.
          </div>

          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            HOD
          </div>

          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            Director
          </div>

          <div className="uppercase" style={{ fontSize: '12px', letterSpacing: '0.18em' }}>
            Role
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {sorted.map((entry, i) => (
          <ExperienceRow
            key={i}
            entry={entry}
            columnsTemplate={columnsTemplate}
            rowVPadding={rowVPadding}
            rowMinHeight={rowMinHeight}
          />
        ))}
      </div>

    </section>
  )
}

export const DEFAULT_COLUMNS_TEMPLATE =
  '2fr 1.5fr 1.5fr 1fr 1fr 1fr'