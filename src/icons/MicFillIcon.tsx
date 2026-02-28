import React from 'react'

interface MicFillIconProps {
  className?: string
}

function MicFillIcon({ className }: MicFillIconProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 14a2.9 2.9 0 0 1-2.125-.875A2.9 2.9 0 0 1 9 11V5q0-1.25.875-2.125A2.9 2.9 0 0 1 12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125A2.9 2.9 0 0 1 12 14m0 7a1 1 0 0 1-1-1v-2.075q-2.6-.35-4.3-2.325-1.37-1.59-1.636-3.603C4.992 11.45 5.448 11 6 11s.988.452 1.09.995q.274 1.443 1.373 2.543Q9.926 16 12 16q2.075 0 3.537-1.463 1.099-1.098 1.373-2.543c.102-.542.538-.994 1.09-.994s1.008.45.936.997Q18.669 14.01 17.3 15.6q-1.7 1.975-4.3 2.325V20a1 1 0 0 1-1 1"
        fill="currentColor"
      />
    </svg>
  )
}

export { MicFillIcon }
