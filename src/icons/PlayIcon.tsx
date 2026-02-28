import React from 'react'

interface PlayIconProps {
  className?: string
}

function PlayIcon({ className }: PlayIconProps): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 34"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8.5,8.7c0-1.7,1.2-2.4,2.6-1.5l14.4,8.3c1.4,0.8,1.4,2.2,0,3l-14.4,8.3c-1.4,0.8-2.6,0.2-2.6-1.5V8.7z" />
    </svg>
  )
}

export { PlayIcon }
