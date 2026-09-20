'use client';

import { useState } from 'react';
import {
  Button,
  Chat,
  ChatComposer,
  ChatComposerAttachmentButton,
  ChatComposerExpressionButton,
  ChatComposerSendButton,
  ChatComposerTextInput,
  ChatComposerVoiceRecorder,
  ChatContent,
  ChatFooter,
  ChatHeader,
  ContactMenu,
  ExpressionPicker,
  ExpressionPickerEmojiGrid,
  ExpressionPickerSearch,
  ExpressionPickerTabs,
  ExpressionPickerTrigger,
  MessageThread,
  Placeholder,
  PollMenu,
  ReactionMenu,
  SystemMessage,
  TextMessage,
  type GroupedMessage,
} from 'whatsapp-ui-react';

import { sampleAvatar, today, yesterday } from '@/components/demos/sample-data';

const EMOJIS = [
  '😀',
  '😂',
  '🥲',
  '😍',
  '😎',
  '🤔',
  '🙃',
  '😴',
  '👍',
  '🙏',
  '👏',
  '🔥',
  '🎉',
  '❤️',
  '💯',
  '✨',
];

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

export function ChatDemo() {
  return (
    <Chat bordered className="h-[480px] w-full max-w-md">
      <ChatHeader name="Ana Ribeiro" subtitle="online" avatarUrl={sampleAvatar} />
      <ChatContent>
        <MessageThread
          messages={thread}
          leading={<SystemMessage>Messages are end-to-end encrypted.</SystemMessage>}
        >
          {message => message.node}
        </MessageThread>
      </ChatContent>
      <ChatFooter>
        <ChatComposer onSend={() => {}}>
          <ChatComposerAttachmentButton />
          <ChatComposerTextInput addonEnd={<ChatComposerExpressionButton />} />
          <ChatComposerSendButton />
        </ChatComposer>
      </ChatFooter>
    </Chat>
  );
}

export function ChatComposerDemo() {
  const [sent, setSent] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="bg-fd-card border-fd-border rounded-lg border p-2">
        {recording ? (
          <ChatComposerVoiceRecorder
            elapsed={7}
            onCancel={() => setRecording(false)}
            onConfirm={() => setRecording(false)}
          />
        ) : (
          <ChatComposer onSend={message => setSent(current => [...current, message])}>
            <ChatComposerAttachmentButton />
            <ChatComposerTextInput addonEnd={<ChatComposerExpressionButton />} />
            <ChatComposerSendButton />
          </ChatComposer>
        )}
      </div>

      <Button variant="outline" size="sm" onClick={() => setRecording(value => !value)}>
        {recording ? 'Show text composer' : 'Show voice recorder'}
      </Button>

      {sent.length > 0 && (
        <ul className="text-fd-muted-foreground list-disc pl-5 text-sm">
          {sent.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ExpressionPickerDemo() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <ExpressionPicker>
        <ExpressionPickerTrigger render={<Button variant="outline" />}>
          Open picker
        </ExpressionPickerTrigger>
        <ExpressionPickerTabs>
          <ExpressionPickerSearch />
          <ExpressionPickerEmojiGrid emojis={EMOJIS} onSelect={setPicked} />
        </ExpressionPickerTabs>
      </ExpressionPicker>
      {picked && <p className="text-sm">Picked {picked}</p>}
    </div>
  );
}

export function ReactionMenuDemo() {
  const [reaction, setReaction] = useState<string>();

  return (
    <div className="flex flex-col items-center gap-3">
      <ReactionMenu
        value={reaction}
        onSelect={setReaction}
        trigger={<Button variant="outline">React to a message</Button>}
      />
      {reaction && <p className="text-sm">Reacted with {reaction}</p>}
    </div>
  );
}

export function ContactMenuDemo() {
  const [chosen, setChosen] = useState<string>();

  return (
    <div className="flex flex-col items-center gap-3">
      <ContactMenu
        contacts={[
          { id: '1', name: 'Ana Ribeiro', subtitle: '+351 912 345 678', avatarUrl: sampleAvatar },
          { id: '2', name: 'Marco Silva', subtitle: 'Work' },
          { id: '3', name: 'Júlia Costa', subtitle: 'Family' },
        ]}
        onSelect={contact => setChosen(contact.name)}
        trigger={<Button variant="outline">Share a contact</Button>}
      />
      {chosen && <p className="text-sm">Selected {chosen}</p>}
    </div>
  );
}

export function PollMenuDemo() {
  const [created, setCreated] = useState<string>();

  return (
    <div className="flex flex-col items-center gap-3">
      <PollMenu
        onCreate={poll => setCreated(poll.question)}
        trigger={<Button variant="outline">Create a poll</Button>}
      />
      {created && <p className="text-sm">Created “{created}”</p>}
    </div>
  );
}

export function PlaceholderDemo() {
  return (
    <div className="bg-fd-card border-fd-border w-full max-w-md rounded-lg border">
      <Placeholder />
    </div>
  );
}

export function MessageScrollerDemo() {
  return (
    <Chat bordered className="h-80 w-full max-w-md">
      <ChatContent>
        <MessageThread messages={thread}>{message => message.node}</MessageThread>
      </ChatContent>
    </Chat>
  );
}
