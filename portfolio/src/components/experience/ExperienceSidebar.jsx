import React from 'react'

export default function ExperienceSidebar({
  contact,
  technicalSkills,
  education,
  employment,
}) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      {/* ─── CONTACT ───────────────────────────────────────────────────── */}
<div>
  <h4
    className="font-ui font-light text-mid uppercase mb-3"
    style={{ fontSize: '9px', letterSpacing: '0.18em' }}
  >
    Contact
  </h4>

  <div className="flex flex-col gap-3">
    <a
      href={`tel:${contact.phone}`}
      className="font-ui font-light text-ink"
    >
      {contact.phone}
    </a>

    <a
      href={`mailto:${contact.email}`}
      className="font-ui font-light text-ink"
    >
      {contact.email}
    </a>

    <div className="font-ui font-light text-dim text-sm">
      {contact.location}
    </div>

    {contact.passport && (
      <div className="font-ui font-light text-dim text-sm">
        {contact.passport}
      </div>
    )}

    {contact.drivers && (
      <div className="font-ui font-light text-dim text-sm">
        {contact.drivers}
      </div>
    )}
  </div>
</div>
      {/* ─── TECHNICAL SKILLS ─────────────────────────────────────────── */}
      <div>
        <h4
          className="font-ui font-light text-mid uppercase mb-3"
          style={{ fontSize: '9px', letterSpacing: '0.18em' }}
        >
          Technical Skills
        </h4>

        <div className="flex flex-col gap-2">
          {technicalSkills.map((s, i) => (
            <div
              key={i}
              className="font-ui font-light text-dim"
              style={{ fontSize: '12px' }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* ─── EMPLOYMENT ───────────────────────────────────────────────── */}
      <div>
        <h4
          className="font-ui font-light text-mid uppercase mb-3"
          style={{ fontSize: '9px', letterSpacing: '0.18em' }}
        >
          Employment
        </h4>

        <div className="flex flex-col gap-3">
          {employment.map((e, i) => (
            <div key={i}>
              <div
                className="font-ui font-light text-ink"
                style={{ fontSize: '13px' }}
              >
                {e.role}
              </div>

              <div
                className="font-ui font-light text-dim"
                style={{ fontSize: '12px' }}
              >
                {e.company}{' '}
                {e.endYear
                  ? ` • ${e.year}–${e.endYear}`
                  : e.ongoing
                  ? ` • ${e.year}–present`
                  : ` • ${e.year}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EDUCATION ────────────────────────────────────────────────── */}
      <div>
        <h4
          className="font-ui font-light text-mid uppercase mb-3"
          style={{ fontSize: '9px', letterSpacing: '0.18em' }}
        >
          Education
        </h4>

        <div className="flex flex-col gap-3">
          {education.map((edu, i) => (
            <div key={i}>
              <div
                className="font-ui font-light text-ink"
                style={{ fontSize: '13px' }}
              >
                {edu.qualification}
              </div>

              <div
                className="font-ui font-light text-dim"
                style={{ fontSize: '12px' }}
              >
                {edu.institution}
                {edu.year ? ` • ${edu.year}` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}