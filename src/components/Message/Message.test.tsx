import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { Message } from './Message'
import { Text } from './Text'

describe('Message', () => {
  it('renders neutral mode with text content', () => {
    render(
      <Message direction="in" mode="neutral" time="12:00">
        <Text content="Hello world" />
      </Message>
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders outgoing message', () => {
    render(
      <Message direction="out" mode="neutral" time="12:00">
        <Text content="Outgoing" />
      </Message>
    )
    expect(screen.getByText('Outgoing')).toBeInTheDocument()
  })

  it('displays send time in neutral mode', () => {
    render(
      <Message direction="in" mode="neutral" time="09:41">
        <Text content="timed" />
      </Message>
    )
    expect(screen.getAllByText('09:41').length).toBeGreaterThan(0)
  })

  it('renders free mode children', () => {
    render(
      <Message direction="out" mode="free" time="12:00">
        <img src="sticker.png" alt="sticker" />
      </Message>
    )
    expect(screen.getByAltText('sticker')).toBeInTheDocument()
  })

  it('renders custom mode children directly', () => {
    render(
      <Message direction="in" mode="custom">
        <div data-testid="custom-child">custom</div>
      </Message>
    )
    expect(screen.getByTestId('custom-child')).toBeInTheDocument()
  })

  it('renders sender name in group mode', () => {
    render(
      <Message direction="in" mode="neutral" time="12:00" top group senderName="Alice">
        <Text content="group message" />
      </Message>
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })
})
