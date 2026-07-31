'use client';

import {
  Chat,
  ChatContent,
  ChatFooter,
  ChatHeader,
  ChatComposer,
  ChatComposerAttachmentButton,
  ChatComposerExpressionButton,
  ChatComposerSendButton,
  ChatComposerTextInput,
  MessageScrollerDays,
  SystemMessage,
  TextMessage,
  type ChatColorScheme,
  type GroupedMessage,
} from 'whatsapp-ui-react';
import { useState } from 'react';

const today = new Date();
const yesterday = new Date(today.getTime() - 86_400_000);

const thread: GroupedMessage[] = [
  {
    id: 1,
    senderId: 'ana',
    timestamp: yesterday,
    node: (
      <TextMessage
        direction="in"
        senderName="Ana"
        content="Are we still on for tonight?"
        time="19:04"
      />
    ),
  },
  {
    id: 2,
    senderId: 'me',
    timestamp: yesterday,
    node: (
      <TextMessage
        direction="out"
        content="Yes! 8pm at the usual place."
        time="19:06"
        status="read"
      />
    ),
  },
  {
    id: 3,
    senderId: 'ana',
    timestamp: today,
    node: <TextMessage direction="in" senderName="Ana" content="🎉" time="09:12" />,
  },
  {
    id: 4,
    senderId: 'me',
    timestamp: today,
    node: <TextMessage direction="out" content="See you there." time="09:15" status="delivered" />,
  },
];

const schemes: ChatColorScheme[] = ['natural', 'forest', 'ocean', 'rose'];

export default function PreviewPage() {
  const [scheme, setScheme] = useState<ChatColorScheme>('natural');
  const [dark, setDark] = useState(false);

  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-8">
      <div className="flex items-center gap-2">
        {schemes.map(name => (
          <button
            key={name}
            type="button"
            onClick={() => setScheme(name)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${scheme === name ? 'bg-fd-primary text-fd-primary-foreground' : ''}`}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setDark(value => !value)}
          className="rounded-lg border px-3 py-1.5 text-sm"
        >
          {dark ? 'light' : 'dark'}
        </button>
      </div>

      <Chat
        colorScheme={scheme}
        theme={dark ? 'dark' : 'light'}
        bordered
        className="h-[600px] w-full max-w-lg"
      >
        <ChatHeader name="Ana Ribeiro" subtitle="online" />
        <ChatContent className="overflow-y-auto p-3">
          <SystemMessage>Messages are end-to-end encrypted.</SystemMessage>
          <div className="flex flex-col gap-1">
            <MessageScrollerDays messages={thread}>{message => message.node}</MessageScrollerDays>
          </div>
        </ChatContent>
        <ChatFooter>
          <ChatComposer onSend={message => console.log('[preview] send:', message)}>
            <ChatComposerAttachmentButton />
            <ChatComposerTextInput addonEnd={<ChatComposerExpressionButton />} />
            <ChatComposerSendButton />
          </ChatComposer>
        </ChatFooter>
      </Chat>
    </main>
  );
}
