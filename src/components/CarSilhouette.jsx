'use client'

// Generic sports coupe silhouette (Porsche 911-inspired side view)
// viewBox 0 0 500 220, ground at y=195
// front wheel cx=115 cy=195 r=32, rear wheel cx=370 cy=195 r=32
export default function CarSilhouette({
  bodyColor = '#111111',
  windowColor = 'rgba(255,255,255,0.18)',
  wheelColor = '#1a1a1a',
  rimColor = '#888888',
  className = '',
  withShadow = true,
}) {
  return (
    <svg
      viewBox="0 0 500 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {withShadow && (
        <ellipse cx="250" cy="205" rx="195" ry="12" fill="rgba(0,0,0,0.09)" />
      )}

      {/* Car body */}
      <path
        fill={bodyColor}
        d="
          M 58 195
          L 52 178
          Q 53 166 63 157
          Q 74 148 90 142
          L 115 138
          L 158 130
          L 186 122
          L 207 110
          Q 222 94 233 86
          Q 246 80 265 78
          L 300 77
          Q 328 78 348 88
          Q 364 100 374 116
          L 393 128
          Q 412 135 438 143
          Q 455 150 462 163
          L 465 178
          L 465 195
          L 402 195
          A 32 32 0 1 0 338 195
          L 147 195
          A 32 32 0 1 0 83 195
          Z
        "
      />

      {/* Greenhouse / windows */}
      <path
        fill={windowColor}
        d="
          M 207 110
          Q 222 94 233 86
          Q 246 80 265 78
          L 300 77
          Q 326 78 344 87
          Q 360 98 372 114
          L 390 126
          Q 340 130 290 130
          Q 248 130 207 126
          Z
        "
      />

      {/* A-pillar line */}
      <line x1="207" y1="110" x2="207" y2="126" stroke={bodyColor} strokeWidth="3" />

      {/* Window divider (B-pillar area) */}
      <line x1="310" y1="78" x2="310" y2="130" stroke={bodyColor} strokeWidth="2.5" />

      {/* Rear light strip */}
      <rect x="456" y="152" width="9" height="28" rx="2" fill="#C0392B" opacity="0.9" />

      {/* Front headlight */}
      <rect x="62" y="150" width="20" height="9" rx="2" fill="#d4d4d4" opacity="0.8" />

      {/* Wheels — front */}
      <circle cx="115" cy="195" r="32" fill={wheelColor} />
      <circle cx="115" cy="195" r="22" fill={rimColor} />
      <circle cx="115" cy="195" r="8" fill={wheelColor} />
      {/* Rim spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={115 + 8 * Math.cos(rad)}
            y1={195 + 8 * Math.sin(rad)}
            x2={115 + 20 * Math.cos(rad)}
            y2={195 + 20 * Math.sin(rad)}
            stroke={wheelColor}
            strokeWidth="2.5"
          />
        )
      })}

      {/* Wheels — rear */}
      <circle cx="370" cy="195" r="32" fill={wheelColor} />
      <circle cx="370" cy="195" r="22" fill={rimColor} />
      <circle cx="370" cy="195" r="8" fill={wheelColor} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={370 + 8 * Math.cos(rad)}
            y1={195 + 8 * Math.sin(rad)}
            x2={370 + 20 * Math.cos(rad)}
            y2={195 + 20 * Math.sin(rad)}
            stroke={wheelColor}
            strokeWidth="2.5"
          />
        )
      })}
    </svg>
  )
}
