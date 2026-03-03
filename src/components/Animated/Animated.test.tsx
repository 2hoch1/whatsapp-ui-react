import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Animated } from './Animated'

describe('Animated', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders content immediately when delay is 0', async () => {
    render(
      <Animated delay={0}>
        <span data-testid="child">hello</span>
      </Animated>
    )
    await act(async () => {})
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('does not render content before delay fires', () => {
    render(
      <Animated delay={2000}>
        <span data-testid="delayed">late</span>
      </Animated>
    )
    expect(screen.queryByTestId('delayed')).not.toBeInTheDocument()
  })

  it('renders content after delay fires', async () => {
    render(
      <Animated delay={2000}>
        <span data-testid="delayed">late</span>
      </Animated>
    )
    await act(async () => {
      vi.advanceTimersByTime(2001)
    })
    expect(screen.getByTestId('delayed')).toBeInTheDocument()
  })

  it('applies custom className to the wrapper', async () => {
    const { container } = render(
      <Animated delay={0} className="my-class">
        <span>content</span>
      </Animated>
    )
    await act(async () => {})
    expect(container.querySelector('.my-class')).not.toBeNull()
  })
})
