import React from 'react'

interface PauseIconProps {
  className?: string
}

function PauseIcon({ className }: PauseIconProps): React.JSX.Element {
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
      <path d="M9.2,25c0,0.5,0.4,1,0.9,1h3.6c0.5,0,0.9-0.4,0.9-1V9c0-0.5-0.4-0.9-0.9-0.9h-3.6C9.7,8,9.2,8.4,9.2,9V25z M20.2,8c-0.5,0-1,0.4-1,0.9V25c0,0.5,0.4,1,1,1h3.6c0.5,0,1-0.4,1-1V9c0-0.5-0.4-0.9-1-0.9C23.8,8,20.2,8,20.2,8z" />
    </svg>
  )
}

export { PauseIcon }
