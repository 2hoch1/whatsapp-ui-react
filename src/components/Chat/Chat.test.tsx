import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { Chat } from './Chat'

describe('Chat', () => {
  it('renders the chat header with name', () => {
    render(<Chat name="Alice" />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('renders children when no messages are given', () => {
    render(
      <Chat name="Bob">
        <div data-testid="custom-content">hello</div>
      </Chat>
    )
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('renders without inputfield when showInputfield is false', () => {
    const { container } = render(<Chat name="Test" showInputfield={false} />)
    expect(container.querySelector('textarea')).toBeNull()
  })

  it('renders with subtitle', () => {
    render(<Chat name="GroupChat" subtitle="3 members" />)
    expect(screen.getByText('3 members')).toBeInTheDocument()
  })
})
