'use client';

import { useMemo, useState } from 'react';
import {
  AudioMessage,
  Chat,
  ChatComposer,
  ChatComposerAttachmentButton,
  ChatComposerExpressionButton,
  ChatComposerSendButton,
  ChatComposerTextInput,
  ChatContent,
  ChatFooter,
  ChatHeader,
  DocumentMessage,
  ImageMessage,
  LocationMessage,
  MessageThread,
  PollMessage,
  StickerMessage,
  SystemMessage,
  TextMessage,
  VoiceMessage,
  type ChatColorScheme,
  type GroupedMessage,
} from 'whatsapp-ui-react';

import {
  sampleAudio,
  sampleAvatar,
  sampleMap,
  samplePhoto,
  sampleSticker,
  today,
  yesterday,
} from '@/components/demos/sample-data';

/** A one-to-one conversation: the smallest complete chat. */
export function PrivateChatExample({
  colorScheme,
  theme,
}: {
  colorScheme: ChatColorScheme;
  theme: 'light' | 'dark';
}) {
  const [messages, setMessages] = useState<GroupedMessage[]>(() => [
    {
      id: 1,
      senderId: 'ana',
      timestamp: yesterday,
      node: <TextMessage direction="in" content="Are we still on for tonight?" time="19:04" />,
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
      node: <TextMessage direction="in" content="🎉" time="09:12" />,
    },
  ]);

  function send(text: string) {
    setMessages(current => [
      ...current,
      {
        id: current.length + 1,
        senderId: 'me',
        timestamp: new Date(),
        node: (
          <TextMessage
            direction="out"
            content={text}
            time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            status="sent"
          />
        ),
      },
    ]);
  }

  return (
    <Chat colorScheme={colorScheme} theme={theme} bordered className="h-[520px] w-full">
      <ChatHeader name="Ana Ribeiro" subtitle="online" avatarUrl={sampleAvatar} />
      <ChatContent>
        <MessageThread
          messages={messages}
          leading={<SystemMessage>Messages are end-to-end encrypted.</SystemMessage>}
        >
          {message => message.node}
        </MessageThread>
      </ChatContent>
      <ChatFooter>
        <ChatComposer onSend={send}>
          <ChatComposerAttachmentButton />
          <ChatComposerTextInput addonEnd={<ChatComposerExpressionButton />} />
          <ChatComposerSendButton />
        </ChatComposer>
      </ChatFooter>
    </Chat>
  );
}

/** A group chat: sender names and per-sender colours appear above incoming bubbles. */
export function GroupChatExample({
  colorScheme,
  theme,
}: {
  colorScheme: ChatColorScheme;
  theme: 'light' | 'dark';
}) {
  const messages = useMemo<GroupedMessage[]>(
    () => [
      {
        id: 1,
        senderId: 'ana',
        timestamp: today,
        node: <TextMessage direction="in" senderName="Ana" content="Dinner Friday?" time="18:00" />,
      },
      {
        id: 2,
        senderId: 'marco',
        timestamp: today,
        node: <TextMessage direction="in" senderName="Marco" content="I'm in." time="18:01" />,
      },
      {
        id: 3,
        senderId: 'julia',
        timestamp: today,
        node: (
          <TextMessage
            direction="in"
            senderName="Júlia"
            content="Same, but not too late."
            time="18:02"
          />
        ),
      },
      {
        id: 4,
        senderId: 'ana',
        timestamp: today,
        node: (
          <PollMessage
            direction="in"
            question="Where should we eat?"
            options={[
              { id: 'a', label: 'Ramen', votes: 4 },
              { id: 'b', label: 'Pizza', votes: 2 },
              { id: 'c', label: 'Tapas', votes: 5 },
            ]}
            selected={['c']}
            time="18:03"
          />
        ),
      },
      {
        id: 5,
        senderId: 'me',
        timestamp: today,
        node: <TextMessage direction="out" content="Tapas it is." time="18:05" status="read" />,
      },
    ],
    []
  );

  return (
    <Chat colorScheme={colorScheme} theme={theme} bordered className="h-[520px] w-full">
      <ChatHeader name="Friday plans" subtitle="Ana, Marco, Júlia" />
      <ChatContent>
        <MessageThread messages={messages}>{message => message.node}</MessageThread>
      </ChatContent>
    </Chat>
  );
}

/** Every rich message type in one thread. */
export function MediaChatExample({
  colorScheme,
  theme,
}: {
  colorScheme: ChatColorScheme;
  theme: 'light' | 'dark';
}) {
  const messages = useMemo<GroupedMessage[]>(
    () => [
      {
        id: 1,
        senderId: 'ana',
        timestamp: today,
        node: (
          <ImageMessage
            direction="in"
            src={samplePhoto}
            alt="Sunset"
            caption="From the hike"
            time="14:02"
          />
        ),
      },
      {
        id: 2,
        senderId: 'me',
        timestamp: today,
        node: (
          <StickerMessage
            direction="out"
            src={sampleSticker}
            alt="Smile"
            time="14:03"
            status="read"
          />
        ),
      },
      {
        id: 3,
        senderId: 'ana',
        timestamp: today,
        node: (
          <VoiceMessage direction="in" src={sampleAudio} avatarUrl={sampleAvatar} time="14:05" />
        ),
      },
      {
        id: 4,
        senderId: 'ana',
        timestamp: today,
        node: (
          <AudioMessage direction="in" src={sampleAudio} fileName="playlist.m4a" time="14:06" />
        ),
      },
      {
        id: 5,
        senderId: 'me',
        timestamp: today,
        node: (
          <DocumentMessage
            direction="out"
            fileName="route.pdf"
            fileSize="1.1 MB"
            time="14:08"
            status="delivered"
          />
        ),
      },
      {
        id: 6,
        senderId: 'ana',
        timestamp: today,
        node: (
          <LocationMessage
            direction="in"
            latitude={38.7223}
            longitude={-9.1393}
            previewUrl={sampleMap}
            name="Praça do Comércio"
            address="Lisbon, Portugal"
            time="14:10"
          />
        ),
      },
    ],
    []
  );

  return (
    <Chat colorScheme={colorScheme} theme={theme} bordered className="h-[520px] w-full">
      <ChatHeader name="Ana Ribeiro" subtitle="last seen today" avatarUrl={sampleAvatar} />
      <ChatContent>
        <MessageThread messages={messages}>{message => message.node}</MessageThread>
      </ChatContent>
    </Chat>
  );
}
