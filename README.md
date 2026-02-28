# whatsapp-ui-react

React component library with a WhatsApp‑Web–inspired UI. Some components are still placeholders and may not be fully functional yet.

## Install

```bash
npm install whatsapp-ui-react
```

**Peer dependencies:** React 18+ and TailwindCSS v4.

## Setup

Import the component styles into your CSS entry point:

```css
@import 'tailwindcss';
@import 'whatsapp-ui-react/styles';
```

## Usage

### Chat

```tsx
import { Chat } from 'whatsapp-ui-react'
;<Chat name="Alice" subtitle="online" />
```

### Messages

```tsx
import { Chat, Message, Text } from 'whatsapp-ui-react'
import type { GroupedMessage } from 'whatsapp-ui-react'

const history: GroupedMessage[] = [
  {
    id: '1',
    senderId: 'alice',
    timestamp: new Date(),
    node: (
      <Message direction="in" mode="neutral" time="09:41">
        <Text content="Hey! 👋" />
      </Message>
    ),
  },
]

<Chat name="Alice" messageHistory={history} />
```

### Content types

| Component    | Description                   |
| ------------ | ----------------------------- |
| `<Text>`     | Plain text                    |
| `<Image>`    | Image with optional caption   |
| `<Video>`    | Video with thumbnail          |
| `<Audio>`    | Audio file attachment         |
| `<Voice>`    | Voice message with waveform   |
| `<Sticker>`  | Sticker (frameless image)     |
| `<Gif>`      | Animated GIF                  |
| `<File>`     | Generic file attachment       |
| `<Contact>`  | Contact card                  |
| `<Location>` | Location pin with map preview |
| `<Poll>`     | Poll with options             |
| `<Emoji>`    | Large emoji message           |
| `<Event>`    | Event card                    |

### Reply rules

Automated replies that fire when an incoming message matches a trigger:

```tsx
import { Chat, Message, Text, Reply } from 'whatsapp-ui-react'
;<Chat
  name="Support Bot"
  onReply={
    <Reply
      once
      from="bot"
      onMessage={<Text content="!help" />}
      replyMessage={
        <Message direction="in" mode="neutral" time="now">
          <Text content="Available commands: !help, !status" />
        </Message>
      }
    />
  }
/>
```

| Prop           | Type        | Default | Description                                          |
| -------------- | ----------- | ------- | ---------------------------------------------------- |
| `onMessage`    | `ReactNode` |         | Message content to match against (text is extracted) |
| `replyMessage` | `ReactNode` |         | `<Message>` to inject when the trigger matches       |
| `from`         | `string`    | `'me'`  | Only react to messages from this `senderId`          |
| `once`         | `boolean`   | `false` | Fire at most once per component lifetime             |

### Locked chat

Set `locked` to disable sending while still allowing typing:

```tsx
<Chat name="Read-only" locked />
```

## `<Chat>` props

| Prop                 | Type                  | Default              | Description                                      |
| -------------------- | --------------------- | -------------------- | ------------------------------------------------ |
| `name`               | `string`              |                      | Contact or group name                            |
| `avatarUrl`          | `string`              |                      | Avatar image URL                                 |
| `subtitle`           | `string`              |                      | Status text below the name                       |
| `messageHistory`     | `GroupedMessage[]`    | `[]`                 | Initial message list                             |
| `showInputfield`     | `boolean`             | `true`               | Show / hide the input bar                        |
| `locked`             | `boolean`             | `false`              | Allow typing but disable sending                 |
| `inputPlaceholder`   | `string`              | `'Enter a message.'` | Textarea placeholder                             |
| `inputValue`         | `string`              |                      | Controlled input value                           |
| `defaultInputValue`  | `string`              |                      | Uncontrolled initial value                       |
| `onInputValueChange` | `(v: string) => void` |                      | Called on every keystroke                        |
| `onSendMessage`      | `(v: string) => void` |                      | Called when a message is sent                    |
| `onReply`            | `ReactNode`           |                      | `<Reply>` rules rendered inside the chat context |
| `onEmojiClick`       | `() => void`          |                      | Emoji button click handler                       |
| `onAttachClick`      | `() => void`          |                      | Attach button click handler                      |
| `onMicClick`         | `() => void`          |                      | Mic button click handler                         |

## License

Apache-2.0 © [2hoch1](https://github.com/2hoch1)
