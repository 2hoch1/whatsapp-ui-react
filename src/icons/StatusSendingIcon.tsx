import React from 'react'

interface StatusSendingIconProps {
  className?: string
}

function StatusSendingIcon({ className }: StatusSendingIconProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export { StatusSendingIcon }
