import React from 'react'

/** Direction of a message bubble. */
export type MessageDirection = 'in' | 'out'

/** Delivery status of an outgoing message. */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

/** Discriminates the rendered content type. */
export type MessageType =
  | 'text'
  | 'image'
  | 'gif'
  | 'audio'
  | 'video'
  | 'sticker'
  | 'file'
  | 'custom'

/** Context value provided by {@link Message} to its children. */
export interface MessageContextValue {
  /** Render direction of this message bubble. */
  direction: MessageDirection
  /** `true` for the first message in a consecutive sender run; controls bubble tail rendering. */
  top: boolean
  /** `true` when rendered inside a group chat; enables avatar and sender name display. */
  group: boolean
  /** Display name of the sender (group chats only). */
  senderName?: string
  /** Avatar URL of the sender (group chats only). */
  avatarUrl?: string
  /** Formatted send-time string. */
  time?: string
  /** Delivery status. */
  status?: MessageStatus
}

const MessageContext = React.createContext<MessageContextValue>({
  direction: 'in',
  top: false,
  group: false,
})

/** Returns the context provided by the nearest ancestor `<Message>`. */
function useMessage(): MessageContextValue {
  return React.useContext(MessageContext)
}

export { MessageContext, useMessage }
