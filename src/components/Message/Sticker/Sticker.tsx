import { cn } from '@/utils/cn'
import React from 'react'

/** Props for the {@link Sticker} component. */
export interface StickerProps {
  /** URL of the sticker image. */
  src: string
  /** Accessible alt text for the sticker image. @defaultValue `''` */
  alt?: string
  /** Additional CSS class names applied to the root element. */
  className?: string
}

function Sticker({ src, alt = '', className }: StickerProps): React.JSX.Element {
  return (
    <div className={cn('relative inline-block', className)}>
      <img
        src={src}
        alt={alt}
        className="size-48 select-none object-contain drop-shadow-sm"
        draggable={false}
      />
    </div>
  )
}

export { Sticker }
