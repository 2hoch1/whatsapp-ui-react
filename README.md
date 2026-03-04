# whatsapp-ui-react

A React component library that provides a chat window interface inspired by the design and interaction patterns of WhatsApp Web.

**Notice:** Some components are still placeholders and may not be fully functional; breaking changes may occur between releases.

## Goal

This library was created to better understand WhatsApp's design system and interaction patterns. It is intended purely for educational purposes, including studying UI architecture, component composition, and interaction modeling. **It is not intended to be an official client or production-ready replacement.**

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

## Install

```bash
npm install whatsapp-ui-react
```

**Peer dependencies:** React 18+ and TailwindCSS v4.

## Setup

```css
/* global.css */
@import 'tailwindcss';
@import 'whatsapp-ui-react/css/natural.css';
@import 'whatsapp-ui-react/css/preset.css';
```

Available themes: `natural` (default), `ocean`, `forest`, `rose`.

Use `theme="dark"` on `<Chat>` to switch to the dark variant of the loaded theme:

```tsx
<Chat theme="dark" ... />
```

## Usage

### Chat

<!--prettier-ignore-->
```tsx
import { Chat } from 'whatsapp-ui-react';
<Chat name="Alice" subtitle="online" />
```

### Messages

<!--prettier-ignore-->
```tsx
import { Chat, History, Message, Text } from 'whatsapp-ui-react';

<Chat name="Alice">
  <History>
    <Message direction="in" senderId="alice" timestamp="2026-03-03T09:41:00Z" mode="neutral" time="09:41">
      <Text content="Hey! 👋" />
    </Message>
    <Message direction="out" senderId="me" timestamp="2026-03-03T09:42:00Z" mode="neutral" time="09:42" status="read">
      <Text content="Hi! How are you?" />
    </Message>
  </History>
</Chat>
```

### Animated messages

<!--prettier-ignore-->
```tsx
import { Chat, History, Message, Text, Animated } from 'whatsapp-ui-react';

<Chat name="Support Bot">
  <History>
    <Animated delay={1500}>
      <Message direction="in" senderId="bot" timestamp="2026-03-03T09:00:00Z" mode="neutral" time="09:00">
        <Text content="Hello! How can I help you?" />
      </Message>
    </Animated>
  </History>
</Chat>
```

### Content types

| Component    | Description                   | Implemented |
| ------------ | ----------------------------- | ----------- |
| `<Text>`     | Plain text                    | ✅          |
| `<Image>`    | Image with optional caption   |             |
| `<Video>`    | Video with thumbnail          |             |
| `<Audio>`    | Audio file attachment         | ✅          |
| `<Voice>`    | Voice message with waveform   | ✅          |
| `<Sticker>`  | Sticker (frameless image)     | ✅          |
| `<Gif>`      | Animated GIF                  |             |
| `<File>`     | Generic file attachment       |             |
| `<Contact>`  | Contact card                  |             |
| `<Location>` | Location pin with map preview |             |
| `<Poll>`     | Poll with options             |             |
| `<Emoji>`    | Large emoji message           |             |
| `<Event>`    | Event card                    |             |

### Reply rules

Automated replies that fire when an incoming message matches a trigger:

<!--prettier-ignore-->
```tsx
import { Chat, Message, Text, Reply } from 'whatsapp-ui-react';

<Chat
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

## `<History>` props

| Prop        | Type        | Default | Description                                                                                      |
| ----------- | ----------- | ------- | ------------------------------------------------------------------------------------------------ |
| `children`  | `ReactNode` |         | `<Message>` elements, optionally wrapped in `<Animated>`. Anything else is passed through as-is. |
| `className` | `string`    |         | Additional CSS class names applied to the wrapper element                                        |

## `<Animated>` props

| Prop        | Type        | Default | Description                                               |
| ----------- | ----------- | ------- | --------------------------------------------------------- |
| `delay`     | `number`    | `0`     | Milliseconds from mount until the content fades in        |
| `children`  | `ReactNode` |         | Content to reveal                                         |
| `className` | `string`    |         | Additional CSS class names applied to the wrapper element |

## `<Message>` props

| Prop         | Type                                           | Default    | Description                                                                                          |
| ------------ | ---------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `direction`  | `'in' \| 'out'`                                |            | Received (`'in'`) or sent (`'out'`) message                                                          |
| `mode`       | `'neutral' \| 'free' \| 'custom'`              | `'custom'` | Layout mode: `'neutral'` overlays the timestamp; `'free'` floats it below; `'custom'` is unwrapped   |
| `top`        | `boolean`                                      | `false`    | First message in a consecutive run - renders the bubble tail. Injected automatically by `<History>`. |
| `group`      | `boolean`                                      | `false`    | Group chat mode - shows sender avatar when `top` is `true`                                           |
| `avatarUrl`  | `string`                                       |            | Sender avatar URL (group chats)                                                                      |
| `senderName` | `string`                                       |            | Sender display name (group chats)                                                                    |
| `time`       | `string`                                       |            | Formatted time string shown in the bubble footer                                                     |
| `status`     | `'sending' \| 'sent' \| 'delivered' \| 'read'` |            | Delivery status icon (outgoing messages only)                                                        |
| `senderId`   | `string`                                       |            | Identifies the sender; used by `<History>` for grouping. No visual effect.                           |
| `timestamp`  | `string \| Date`                               |            | ISO string or `Date` for the message time; used by `<History>` for day dividers. No visual effect.   |
| `className`  | `string`                                       |            | Additional CSS class names applied to the root element                                               |

## `<Chat>` props

| Prop                 | Type                              | Default              | Description                                                                                                                              |
| -------------------- | --------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`                          |                      | Contact or group name                                                                                                                    |
| `avatarUrl`          | `'online' \| 'typeing' \| string` |                      | Avatar image URL                                                                                                                         |
| `subtitle`           | `string`                          |                      | Status text below the name                                                                                                               |
| `children`           | `ReactNode`                       |                      | Static content rendered at the top of the message area. Typically a `<History>` component.                                               |
| `showInputfield`     | `boolean`                         | `true`               | Show / hide the input bar                                                                                                                |
| `locked`             | `boolean`                         | `false`              | Allow typing but disable sending                                                                                                         |
| `inputPlaceholder`   | `string`                          | `'Enter a message.'` | Textarea placeholder                                                                                                                     |
| `inputValue`         | `string`                          |                      | Controlled input value (use with `onInputValueChange`)                                                                                   |
| `defaultInputValue`  | `string`                          |                      | Uncontrolled initial value (internal state managed by component)                                                                         |
| `onInputValueChange` | `(v: string) => void`             |                      | Called on every keystroke                                                                                                                |
| `onSendMessage`      | `(v: string) => void`             |                      | Called when a message is sent                                                                                                            |
| `onReply`            | `ReactNode`                       |                      | `<Reply>` rules rendered inside the chat context                                                                                         |
| `background`         | `string \| null`                  | background image     | Message area background. Hex color string for a solid fill; `null` or `'none'` for plain `#0a0a0a`; omit to use the default tiled image. |
| `onEmojiClick`       | `() => void`                      |                      | Emoji button click handler                                                                                                               |
| `onAttachClick`      | `() => void`                      |                      | Attach button click handler                                                                                                              |
| `onCameraClick`      | `() => void`                      |                      | Camera button click handler                                                                                                              |
| `onMicClick`         | `() => void`                      |                      | Mic button click handler                                                                                                                 |
| `theme`              | `'dark' \| 'light'`               |                      | Sets `data-wa-theme` theme for the chat                                                                                                  |

## License

This project is licensed under the Apache License 2.0.
