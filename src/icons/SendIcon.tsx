import React from 'react'

interface SendIconProps {
  className?: string
}

function SendIcon({ className }: SendIconProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3.4 20.5l17.8-8.5a.5.5 0 000-.9L3.4 2.5a.5.5 0 00-.7.6l2.2 7.1c.1.2.2.4.5.4h7.4a.75.75 0 010 1.5H5.4a.5.5 0 00-.5.4l-2.2 7.1a.5.5 0 00.7.6z" />
    </svg>
  )
}

export { SendIcon }
