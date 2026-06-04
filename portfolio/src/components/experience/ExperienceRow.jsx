import React from 'react'

function MobileRow({ entry }) {
  return (
    <div className="block md:hidden space-y-1 py-4 border-b border-light group hover:bg-light transition-colors duration-150">
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">Production</div>
        <div className="font-ui font-light text-ink">{entry.production}</div>
      </div>
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">Client</div>
        <div className="font-ui font-light text-dim">{entry.client}</div>
      </div>
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">Production Co.</div>
        <div className="font-ui font-light text-dim">{entry.productionCompany}</div>
      </div>
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">HOD</div>
        <div className="font-ui font-light text-dim">{entry.hod}</div>
      </div>
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">Director</div>
        <div className="font-ui font-light text-dim">{entry.director}</div>
      </div>
      <div>
        <div className="font-ui font-light text-mid uppercase text-xs">Role</div>
        <div className="font-ui font-light text-dim">{entry.role}</div>
      </div>
    </div>
  )
}

export default function ExperienceRow({ entry, columnsTemplate, rowVPadding = '12px', rowMinHeight = 'auto' }) {
  const desktopStyle = { gridTemplateColumns: columnsTemplate, paddingTop: rowVPadding, paddingBottom: rowVPadding, minHeight: rowMinHeight }
  const mobileStyle = { paddingTop: rowVPadding, paddingBottom: rowVPadding, minHeight: rowMinHeight }

  return (
    <>
      {/* Desktop row: CSS Grid aligned to headers */}
      <div className="hidden md:grid items-start border-b border-light group hover:bg-light transition-colors duration-150" style={desktopStyle}>
        <div className="font-ui font-light text-ink">{entry.production}</div>
        <div className="font-ui font-light text-dim">{entry.client}</div>
        <div className="font-ui font-light text-dim">{entry.productionCompany}</div>
        <div className="font-ui font-light text-dim">{entry.hod}</div>
        <div className="font-ui font-light text-dim">{entry.director}</div>
        <div className="font-ui font-light text-dim">{entry.role}</div>
      </div>
      <div style={mobileStyle}>
        <MobileRow entry={entry} />
      </div>
    </>
  )
}
