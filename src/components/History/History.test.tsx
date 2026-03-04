import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Message } from '../Message/Message'
import { Text } from '../Message/Text/Text'
import { History } from './History'

describe('History', () => {
  afterEach(() => {
    vi.useRealTimers()
  })
  it('renders message content', () => {
    render(
      <History>
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-02-26T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="Hello from Alice" />
        </Message>
      </History>
    )
    expect(screen.getByText('Hello from Alice')).toBeInTheDocument()
  })

  it('renders a Today divider when no children are passed', () => {
    render(<History />)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('does not render a Today divider when messages are present', () => {
    render(
      <History>
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-02-26T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="hi" />
        </Message>
      </History>
    )
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
  })

  it('injects top=true into the first message of a sender group', () => {
    const { container } = render(
      <History>
        <Message
          direction="in"
          senderId="bob"
          timestamp="2026-02-26T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="first" />
        </Message>
        <Message
          direction="in"
          senderId="bob"
          timestamp="2026-02-26T10:01:00Z"
          mode="neutral"
          time="10:01"
        >
          <Text content="second" />
        </Message>
      </History>
    )
    expect(container.querySelectorAll('.pt-\\[10px\\]').length).toBe(1)
    expect(container.querySelectorAll('.pt-\\[1px\\]').length).toBe(1)
  })

  it('renders multiple messages', () => {
    render(
      <History>
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-02-26T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="Message A" />
        </Message>
        <Message
          direction="out"
          senderId="me"
          timestamp="2026-02-26T10:01:00Z"
          mode="neutral"
          time="10:01"
        >
          <Text content="Message B" />
        </Message>
      </History>
    )
    expect(screen.getByText('Message A')).toBeInTheDocument()
    expect(screen.getByText('Message B')).toBeInTheDocument()
  })

  it('inserts a day divider between messages on different calendar days', () => {
    // Pin "today" to 2026-03-03 so 2026-02-25 is exactly 6 days ago ("Wednesday")
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-03T12:00:00Z'))

    render(
      <History>
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-02-25T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="yesterday" />
        </Message>
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-03-03T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="today" />
        </Message>
      </History>
    )
    // Both messages and at least one divider should render.
    expect(screen.getByText('yesterday')).toBeInTheDocument()
    expect(screen.getByText('today')).toBeInTheDocument()
    // getDayDivider labels: Wednesday (2026-02-25) and Today (2026-03-03).
    expect(screen.getByText('Wednesday')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('applies className wrapper when provided', () => {
    const { container } = render(
      <History className="history-wrap">
        <Message
          direction="in"
          senderId="alice"
          timestamp="2026-02-26T10:00:00Z"
          mode="neutral"
          time="10:00"
        >
          <Text content="wrapped" />
        </Message>
      </History>
    )
    expect(container.querySelector('.history-wrap')).not.toBeNull()
  })
})
