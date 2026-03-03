import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ChatReplyContext } from '../Chat/ChatReplyContext'
import type { GroupedMessage } from '../Chat/MessageList'
import { Text } from '../Message/Text/Text'
import { Reply } from './Reply'

function makeMessage(id: string, text: string, senderId = 'me'): GroupedMessage {
  return { id, senderId, node: <Text content={text} /> }
}

function Wrapper({
  messages,
  addMessage,
  children,
}: {
  messages: GroupedMessage[]
  addMessage: ReturnType<typeof vi.fn>
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <ChatReplyContext.Provider
      value={{ messages, sendMessage: () => {}, addMessage, provided: true }}
    >
      {children}
    </ChatReplyContext.Provider>
  )
}

describe('Reply', () => {
  it('renders nothing visible', () => {
    const { container } = render(
      <Wrapper messages={[]} addMessage={vi.fn()}>
        <Reply onMessage={<Text content="ping" />} replyMessage={<Text content="pong" />} />
      </Wrapper>
    )
    expect(container.firstChild).toBeNull()
  })

  it('calls addMessage when a matching message arrives', () => {
    const addMessage = vi.fn()
    const initialMessages = [makeMessage('1', 'hello')]

    const { rerender } = render(
      <Wrapper messages={initialMessages} addMessage={addMessage}>
        <Reply onMessage={<Text content="!ping" />} replyMessage={<Text content="pong" />} />
      </Wrapper>
    )

    const updatedMessages = [...initialMessages, makeMessage('2', '!ping')]
    rerender(
      <Wrapper messages={updatedMessages} addMessage={addMessage}>
        <Reply onMessage={<Text content="!ping" />} replyMessage={<Text content="pong" />} />
      </Wrapper>
    )

    expect(addMessage).toHaveBeenCalledOnce()
  })

  it('does not fire again when once=true and trigger repeats', () => {
    const addMessage = vi.fn()
    const initial = [makeMessage('1', 'start')]

    const { rerender } = render(
      <Wrapper messages={initial} addMessage={addMessage}>
        <Reply once onMessage={<Text content="!go" />} replyMessage={<Text content="ok" />} />
      </Wrapper>
    )

    const withFirst = [...initial, makeMessage('2', '!go')]
    rerender(
      <Wrapper messages={withFirst} addMessage={addMessage}>
        <Reply once onMessage={<Text content="!go" />} replyMessage={<Text content="ok" />} />
      </Wrapper>
    )

    const withSecond = [...withFirst, makeMessage('3', '!go')]
    rerender(
      <Wrapper messages={withSecond} addMessage={addMessage}>
        <Reply once onMessage={<Text content="!go" />} replyMessage={<Text content="ok" />} />
      </Wrapper>
    )

    expect(addMessage).toHaveBeenCalledOnce()
  })

  it('ignores messages from a different sender when from is set', () => {
    const addMessage = vi.fn()
    const initial: GroupedMessage[] = []

    const { rerender } = render(
      <Wrapper messages={initial} addMessage={addMessage}>
        <Reply
          from="bot"
          onMessage={<Text content="!cmd" />}
          replyMessage={<Text content="reply" />}
        />
      </Wrapper>
    )

    // message from 'me', not 'bot' - should not fire
    rerender(
      <Wrapper messages={[makeMessage('1', '!cmd', 'me')]} addMessage={addMessage}>
        <Reply
          from="bot"
          onMessage={<Text content="!cmd" />}
          replyMessage={<Text content="reply" />}
        />
      </Wrapper>
    )

    expect(addMessage).not.toHaveBeenCalled()
  })
})
