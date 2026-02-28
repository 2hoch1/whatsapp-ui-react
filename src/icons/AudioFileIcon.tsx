import React from 'react'

interface AudioFileIconProps {
  className?: string | undefined
  title?: string | undefined
}

function AudioFileIcon({ className, title }: AudioFileIconProps): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 55 55"
      height="40"
      width="40"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      {title && <title>{title}</title>}
      <path fill="#FFAD1F" d="M0,0h55v55H0V0z" />
      <path
        fill="#FFFFFF"
        d="M27.5,16c-5.6,0-10,4.4-10,10v7.8c0,1.9,1.4,3.3,3.3,3.3h3.3v-8.9h-4.4V26
         c0-4.3,3.4-7.8,7.8-7.8s7.8,3.4,7.8,7.8v2.2h-4.4v8.9h3.3c1.9,0,3.3-1.4,3.3-3.3V26
         C37.5,20.4,33.1,16,27.5,16z"
      />
    </svg>
  )
}

export { AudioFileIcon }
