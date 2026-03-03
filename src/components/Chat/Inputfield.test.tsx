import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Inputfield } from './Inputfield'

describe('Inputfield', () => {
  it('renders a textarea', () => {
    render(<Inputfield />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows custom placeholder text', () => {
    render(<Inputfield placeholder="Type here…" />)
    expect(screen.getByPlaceholderText('Type here…')).toBeInTheDocument()
  })

  it('calls onSend with typed text when Enter is pressed', () => {
    const onSend = vi.fn()
    render(<Inputfield onSend={onSend} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(onSend).toHaveBeenCalledWith('hello')
  })

  it('does not call onSend when locked', () => {
    const onSend = vi.fn()
    render(<Inputfield onSend={onSend} locked />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('does not call onSend for empty or whitespace-only input', () => {
    const onSend = vi.fn()
    render(<Inputfield onSend={onSend} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: '   ' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('calls onValueChange on every keystroke', () => {
    const onValueChange = vi.fn()
    render(<Inputfield onValueChange={onValueChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hi' } })
    expect(onValueChange).toHaveBeenCalledWith('hi')
  })

  it('renders as controlled when value prop is provided', () => {
    render(<Inputfield value="controlled text" onValueChange={() => {}} />)
    expect(screen.getByDisplayValue('controlled text')).toBeInTheDocument()
  })

  it('clears the textarea after sending', () => {
    const onSend = vi.fn()
    render(<Inputfield onSend={onSend} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'msg' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(screen.getByRole('textbox')).toHaveValue('')
  })
})
