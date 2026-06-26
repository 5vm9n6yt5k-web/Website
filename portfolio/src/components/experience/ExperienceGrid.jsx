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
          className="hidden md:grid font-display font-normal text-mid section-heading"
          style={{
            gridTemplateColumns: columnsTemplate,
            alignItems: 'start',
            paddingTop: '0px',
            paddingBottom: '12px',
          }}
        >
          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
            Production
          </div>

          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
            Client
          </div>

          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
            Production Co.
          </div>

          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
            HOD
          </div>

          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
            Director
          </div>

          <div className="uppercase section-heading" style={{ fontFamily: 'MilkyWalky, Georgia, serif' }}>
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
  'minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)'