import { describe, expect, it } from 'vitest'
import { Audio, Chat, Message, Sticker } from '../src/index'

describe('whatsapp-ui-react exports', () => {
  it('should export Chat', () => {
    expect(Chat).toBeDefined()
  })

  it('should export Message', () => {
    expect(Message).toBeDefined()
  })

  it('should export Audio', () => {
    expect(Audio).toBeDefined()
  })

  it('should export Sticker', () => {
    expect(Sticker).toBeDefined()
  })
})
