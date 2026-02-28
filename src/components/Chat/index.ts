import { Chat as ChatRoot } from './Chat'
import * as ChatParts from './index.parts'

const Chat = Object.assign(ChatRoot, ChatParts)

export { Chat }

export type * from './Chat'
export type * from './DayDivider'
export type * from './Header'
export type * from './Inputfield'
export type * from './InputfieldActions'
export type * from './MessageList'
