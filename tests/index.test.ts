import { describe, expect, it } from 'vitest'
import {
  Animated,
  Audio,
  Chat,
  Contact,
  Emoji,
  Event,
  File,
  Gif,
  History,
  Image,
  Location,
  Message,
  Poll,
  Reply,
  Sticker,
  Text,
  Video,
  Voice,
} from '../src/index'

describe('package exports', () => {
  it('exports Chat', () => expect(Chat).toBeDefined())
  it('exports History', () => expect(History).toBeDefined())
  it('exports Animated', () => expect(Animated).toBeDefined())
  it('exports Message', () => expect(Message).toBeDefined())
  it('exports Text', () => expect(Text).toBeDefined())
  it('exports Voice', () => expect(Voice).toBeDefined())
  it('exports Audio', () => expect(Audio).toBeDefined())
  it('exports Image', () => expect(Image).toBeDefined())
  it('exports Video', () => expect(Video).toBeDefined())
  it('exports File', () => expect(File).toBeDefined())
  it('exports Sticker', () => expect(Sticker).toBeDefined())
  it('exports Emoji', () => expect(Emoji).toBeDefined())
  it('exports Gif', () => expect(Gif).toBeDefined())
  it('exports Location', () => expect(Location).toBeDefined())
  it('exports Contact', () => expect(Contact).toBeDefined())
  it('exports Poll', () => expect(Poll).toBeDefined())
  it('exports Event', () => expect(Event).toBeDefined())
  it('exports Reply', () => expect(Reply).toBeDefined())
})
