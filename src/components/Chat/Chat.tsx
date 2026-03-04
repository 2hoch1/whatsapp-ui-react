import { Message, Text } from '@/components/Message'
import { cn } from '@/utils/cn'
import { nowTime, uid } from '@/utils/message'
import React from 'react'
import { ChatReplyContext } from './ChatReplyContext'
import { ChatHeader } from './Header'
import { Inputfield } from './Inputfield'
import type { GroupedMessage } from './MessageList'
import { MessageList } from './MessageList'

const backgroundUrl = new URL('./background.png', import.meta.url).href

/** Imperative handle exposed via a ref on {@link Chat}. */
export interface ChatHandle {
  /** Appends an arbitrary message node to the chat list. */
  addMessage: (options: { node: React.ReactNode; senderId?: string }) => void
}

/** Props for the {@link Chat} component. */
export interface ChatProps {
  /** Display name shown in the chat header. */
  name: string
  /** URL of the avatar image. Falls back to initials derived from `name` when omitted. */
  avatarUrl?: string
  /** Secondary line displayed below `name` in the header (e.g. `"online"` or `"typing..."`). */
  subtitle?: 'online' | 'typing...' | string
  /**
   * Static content rendered at the top of the message area. Typically a `<History>` component.
   * Rendered unconditionally above any dynamically added messages.
   */
  children?: React.ReactNode
  /** Additional CSS class names applied to the root element. */
  className?: string
  /**
   * Initial message list. Copied into internal state on mount; subsequent external changes are ignored.
   * @deprecated Pass a `<History>` as `children` instead.
   */
  messageHistory?: GroupedMessage[]
  /** Controls visibility of the input bar. @defaultValue `true` */
  showInputfield?: boolean
  /** Disables the send action without removing the input field, preventing new messages from being added. @defaultValue `false` */
  locked?: boolean
  /** Placeholder text for the textarea. @defaultValue `'Enter a message.'` */
  inputPlaceholder?: string
  /** Controlled textarea value. When provided the component does not manage input state internally. */
  inputValue?: string
  /** Uncontrolled initial textarea value. */
  defaultInputValue?: string
  /** Fired on every textarea change with the current string value. */
  onInputValueChange?: (value: string) => void
  /** Fired after a message is sent with the trimmed message text. The message is also appended to the internal list. */
  onSendMessage?: (value: string) => void
  /** One or more `<Reply>` nodes rendered inside `ChatReplyContext` so they can subscribe to new messages. */
  onReply?: React.ReactNode
  /**
   * Controls the message area background.
   * - Omitted (default): renders the built-in tiled background image.
   * - Hex color string (e.g. `"#3a7bd5"`): fills the area with that solid color.
   * - `null` or `'none'`: no background, falls back to `#0a0a0a`.
   */
  background?: string | null
  /** Handler for the emoji/sticker button in the input bar. */
  onEmojiClick?: () => void
  /** Handler for the attachment button in the input bar. */
  onAttachClick?: () => void
  /** Handler for the camera button in the input bar. */
  onCameraClick?: () => void
  /** Handler for the microphone button in the input bar. */
  onMicClick?: () => void
  /**
   * Visual colour theme for the chat window.
   * - `'light'` (default): WhatsApp light style.
   * - `'dark'`: WhatsApp dark style.
   */
  theme?: 'dark' | 'light'
  /**
   * Colour scheme applied to the chat window. Requires the matching CSS file to be imported.
   * - `'natural'` (default): Classic WhatsApp green.
   * - `'ocean'`: Blue-teal palette.
   * - `'forest'`: Deep green palette.
   * - `'rose'`: Pink-rose palette.
   */
  colorScheme?: 'natural' | 'ocean' | 'forest' | 'rose'
  /** Explicit width applied as an inline style (e.g. `400` or `'100%'`). */
  width?: number | string
  /** Explicit height applied as an inline style (e.g. `600` or `'100%'`). */
  height?: number | string
}

/**
 * Top-level chat component. Manages the message list state and composes
 * the header, scrollable message list, and input bar.
 *
 * Attach a `ref` to get an imperative {@link ChatHandle} for dynamically
 * adding messages.
 */
const Chat = React.forwardRef<ChatHandle, ChatProps>(function Chat(
  {
    name,
    avatarUrl,
    subtitle,
    children,
    className,
    messageHistory,
    showInputfield = true,
    locked = false,
    inputPlaceholder,
    inputValue,
    defaultInputValue,
    onInputValueChange,
    onSendMessage,
    onReply,
    background,
    onEmojiClick,
    onAttachClick,
    onCameraClick,
    onMicClick,
    theme,
    colorScheme,
    width,
    height,
  }: ChatProps,
  ref
): React.JSX.Element {
  const [messages, setMessages] = React.useState<GroupedMessage[]>(messageHistory ?? [])
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Scrolls to bottom if a new content is added
  React.useEffect(() => {
    const content = contentRef.current
    const scroll = scrollRef.current
    if (!content || !scroll) return
    const ro = new ResizeObserver(() => {
      scroll.scrollTop = scroll.scrollHeight
    })
    ro.observe(content)
    return () => ro.disconnect()
  }, [])

  function sendMessage(text: string): void {
    const trimmed = text.trim()
    if (!trimmed) return
    const time = nowTime()
    setMessages(prev => [
      ...prev,
      {
        id: uid(),
        senderId: 'me',
        timestamp: new Date(),
        node: (
          <Message direction="out" mode="neutral" time={time} status="sent">
            <Text content={trimmed} />
          </Message>
        ),
      },
    ])
    onSendMessage?.(trimmed)
  }

  function addMessage({
    node,
    senderId = 'me',
  }: {
    node: React.ReactNode
    senderId?: string
  }): void {
    setMessages(prev => [
      ...prev,
      {
        id: uid(),
        senderId,
        timestamp: new Date(),
        node,
      },
    ])
  }

  React.useImperativeHandle(ref, () => ({ addMessage }))

  const isDefaultBg = background === undefined
  const bgStyle: React.CSSProperties =
    background === null || background === 'none'
      ? { backgroundColor: '#0a0a0a' }
      : isDefaultBg
        ? {}
        : { backgroundColor: background }

  const sizeStyle: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined
      ? { height: typeof height === 'number' ? `${height}px` : height }
      : {}),
  }

  return (
    <ChatReplyContext.Provider value={{ messages, sendMessage, addMessage, provided: true }}>
      <div
        className={cn(
          'flex min-h-0 flex-col',
          width === undefined && 'w-full',
          height === undefined && 'h-full',
          isDefaultBg ? 'bg-wa-bg' : '',
          theme === 'dark' ? 'dark' : '',
          className
        )}
        style={{ ...(isDefaultBg ? {} : bgStyle), ...sizeStyle }}
        {...(colorScheme ? { 'data-wa-color': colorScheme } : {})}
      >
        <ChatHeader
          name={name}
          {...(avatarUrl ? { avatarUrl } : {})}
          {...(subtitle ? { subtitle } : {})}
        />
        <div className="relative isolate flex min-h-0 flex-1 flex-col">
          {isDefaultBg && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-repeat opacity-[0.06]"
              style={{ backgroundImage: `url(${backgroundUrl})` }}
            />
          )}
          <div ref={scrollRef} className="wa-scrollbar flex-1 overflow-y-auto px-12 py-2">
            <div ref={contentRef}>
              {children}
              {messages.length > 0 && <MessageList messages={messages} />}
            </div>
          </div>
          {showInputfield && (
            <Inputfield
              placeholder={inputPlaceholder}
              locked={locked}
              {...(typeof inputValue === 'string' ? { value: inputValue } : {})}
              {...(typeof defaultInputValue === 'string'
                ? { defaultValue: defaultInputValue }
                : {})}
              {...(onInputValueChange ? { onValueChange: onInputValueChange } : {})}
              onSend={sendMessage}
              {...(onEmojiClick ? { onEmojiClick } : {})}
              {...(onAttachClick ? { onAttachClick } : {})}
              {...(onCameraClick ? { onCameraClick } : {})}
              {...(onMicClick ? { onMicClick } : {})}
            />
          )}
        </div>
        {onReply}
      </div>
    </ChatReplyContext.Provider>
  )
})

export { Chat }
