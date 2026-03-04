import { AttachIcon, MicFillIcon, MicOutlineIcon, SendIcon, StickerIcon } from '@/icons'
import { cn } from '@/utils/cn'
import React from 'react'

/** @internal */
interface InputfieldActionsProps {
  /** Additional CSS class names applied to the root element. */
  className?: string
  /** When `true` the send button is shown; when `false` the mic button is shown instead. @defaultValue `false` */
  hasValue?: boolean
  /** Content rendered in the expanding textarea slot between the icon buttons and the send/mic button. */
  textareaSlot?: React.ReactNode
  /** Handler for the emoji/sticker icon button. */
  onEmojiClick?: () => void
  /** Handler for the attachment icon button. */
  onAttachClick?: () => void
  /** Handler for the camera icon button (reserved, not yet rendered). */
  onCameraClick?: () => void
  /** Handler for the mic icon button. */
  onMicClick?: () => void
  /** Handler for the send button. */
  onSendClick?: () => void
  /** When `true` the send button is rendered in a disabled state. @defaultValue `false` */
  sendDisabled?: boolean
}

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-wa-icon transition-colors hover:text-wa-text"
    >
      {children}
    </button>
  )
}

function InputfieldActions({
  className,
  hasValue = false,
  textareaSlot,
  onEmojiClick,
  onAttachClick,
  onCameraClick: _onCameraClick,
  onMicClick,
  onSendClick,
  sendDisabled = false,
}: InputfieldActionsProps): React.JSX.Element {
  return (
    <div className={cn('flex w-full items-end', className)}>
      <div className="flex min-h-10.5 flex-1 items-center gap-1 rounded-full bg-wa-input px-3">
        <ActionButton label="Attachments" {...(onAttachClick ? { onClick: onAttachClick } : {})}>
          <AttachIcon className="size-6" />
        </ActionButton>

        <ActionButton label="Sticker" {...(onEmojiClick ? { onClick: onEmojiClick } : {})}>
          <StickerIcon className="size-6" />
        </ActionButton>

        <div className="flex flex-1 items-center px-2">{textareaSlot}</div>

        {hasValue ? (
          <button
            type="button"
            onClick={onSendClick}
            disabled={sendDisabled}
            aria-label="Send message"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-wa-send text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="ml-0.5 size-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onMicClick}
            aria-label="Record voice message"
            className="group inline-flex size-8 shrink-0 items-center justify-center rounded-full text-wa-icon transition-colors hover:bg-wa-hover hover:text-black"
          >
            <MicOutlineIcon className="size-5 group-hover:hidden" />
            <MicFillIcon className="hidden size-5 group-hover:block" />
          </button>
        )}
      </div>
    </div>
  )
}

export { InputfieldActions }
export type { InputfieldActionsProps }
