import { cn } from '@/utils/cn'
import React from 'react'
import { InputfieldActions } from './InputfieldActions'

/** Props for the {@link Inputfield} component. */
export interface InputfieldProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'defaultValue'
> {
  /** Additional CSS class names applied to the outer wrapper. */
  className?: string
  /** Additional CSS class names applied to the textarea element. */
  textareaClassName?: string
  /** Additional CSS class names applied to the actions row. */
  actionsClassName?: string
  /** Controlled textarea value. When provided, internal state is bypassed. */
  value?: string
  /** Uncontrolled initial textarea value. */
  defaultValue?: string
  /** Disables the send action without removing the input field. @defaultValue `false` */
  locked?: boolean
  /** Fired on every textarea change with the current string value. */
  onValueChange?: (value: string) => void
  /** Fired with the trimmed message string when the user sends; the field is cleared afterwards. */
  onSend?: (value: string) => void
  /** Handler for the emoji/sticker button. */
  onEmojiClick?: () => void
  /** Handler for the attachment button. */
  onAttachClick?: () => void
  /** Handler for the camera button. */
  onCameraClick?: () => void
  /** Handler for the microphone button. */
  onMicClick?: () => void
}

function Inputfield({
  className,
  textareaClassName,
  actionsClassName,
  value,
  defaultValue,
  locked = false,
  onValueChange,
  onSend,
  onEmojiClick,
  onAttachClick,
  onCameraClick,
  onMicClick,
  onChange,
  onKeyDown,
  placeholder = 'Enter a message.',
  ...props
}: InputfieldProps): React.JSX.Element {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const isControlled = typeof value === 'string'
  const currentValue = isControlled ? value : internalValue
  const hasValue = currentValue.trim().length > 0

  function updateValue(next: string): void {
    if (!isControlled) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    updateValue(event.target.value)
    onChange?.(event)
  }

  function sendCurrentValue(): void {
    if (locked) return
    const trimmedValue = currentValue.trim()
    if (!trimmedValue) {
      return
    }
    onSend?.(trimmedValue)
    updateValue('')
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!locked) sendCurrentValue()
    }
    onKeyDown?.(event)
  }

  return (
    <div className={cn('px-3 pb-3 pt-1', className)}>
      <InputfieldActions
        hasValue={hasValue}
        onSendClick={sendCurrentValue}
        {...(onEmojiClick ? { onEmojiClick } : {})}
        {...(onAttachClick ? { onAttachClick } : {})}
        {...(onCameraClick ? { onCameraClick } : {})}
        {...(onMicClick ? { onMicClick } : {})}
        sendDisabled={locked}
        {...(actionsClassName ? { className: actionsClassName } : {})}
        textareaSlot={
          <textarea
            {...props}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className={cn(
              'min-h-5 w-full resize-none bg-transparent px-1 py-0 text-sm text-wa-text-body outline-none placeholder:font-medium placeholder:text-wa-icon/70',
              textareaClassName
            )}
          />
        }
      />
    </div>
  )
}
export { Inputfield }
