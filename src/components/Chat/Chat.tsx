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

/** Props for the {@link Chat} component. */
export interface ChatProps {
  /** Display name shown in the chat header. */
  name: string
  /** URL of the avatar image. Falls back to initials derived from `name` when omitted. */
  avatarUrl?: string
  /** Secondary line displayed below `name` in the header (e.g. `"online"` or `"typing..."`). */
  subtitle?: string
  /** Rendered in the message area when no messages exist yet and `messageHistory` is empty. */
  children?: React.ReactNode
  /** Additional CSS class names applied to the root element. */
  className?: string
  /** Initial message list. Copied into internal state on mount; subsequent external changes are ignored. */
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
  /** Handler for the emoji/sticker button in the input bar. */
  onEmojiClick?: () => void
  /** Handler for the attachment button in the input bar. */
  onAttachClick?: () => void
  /** Handler for the camera button in the input bar. */
  onCameraClick?: () => void
  /** Handler for the microphone button in the input bar. */
  onMicClick?: () => void
}

/**
 * Top-level chat component. Manages the message list state and composes
 * the header, scrollable message list, and input bar.
 */
function Chat({
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
  onEmojiClick,
  onAttachClick,
  onCameraClick,
  onMicClick,
}: ChatProps): React.JSX.Element {
  const [messages, setMessages] = React.useState<GroupedMessage[]>(messageHistory ?? [])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

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

  return (
    <ChatReplyContext.Provider value={{ messages, sendMessage, addMessage, provided: true }}>
      <div className={cn('flex h-full min-h-0 flex-col bg-wa-bg', className)}>
        <ChatHeader
          name={name}
          {...(avatarUrl ? { avatarUrl } : {})}
          {...(subtitle ? { subtitle } : {})}
        />
        <div className="relative isolate flex min-h-0 flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-repeat opacity-[0.06]"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
          <div ref={scrollRef} className="scrollbar-wa flex-1 overflow-y-auto py-2 px-12">
            {messages.length > 0 ? <MessageList messages={messages} /> : children}
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
}

export { Chat }
