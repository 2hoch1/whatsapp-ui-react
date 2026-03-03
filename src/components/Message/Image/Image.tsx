import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Image} component. */
export interface ImageProps {
  /** URL of the image to display. */
  src: string
  /** Accessible alt text for the image. @defaultValue `''` */
  alt?: string
  /** Reserved for the overlaid timestamp string; not rendered by this component directly. */
  time?: string
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Image({ src, alt = '', className }: ImageProps): React.JSX.Element {
  return (
    <div className={cn('w-[336px]', className)}>
      <img src={src} alt={alt} className="w-full rounded-[0.525rem] object-cover" />
    </div>
  )
}

export { Image }
