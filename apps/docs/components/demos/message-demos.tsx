'use client';

import {
  AudioMessage,
  Bubble,
  BubbleContent,
  BubbleReactions,
  ContactMessage,
  DocumentMessage,
  ImageMessage,
  LocationMessage,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageMeta,
  MessageReaction,
  PollMessage,
  StickerMessage,
  SystemMessage,
  TextMessage,
  VideoMessage,
  VoiceMessage,
} from 'whatsapp-ui-react';

import {
  sampleAudio,
  sampleAvatar,
  sampleMap,
  samplePhoto,
  sampleSticker,
} from '@/components/demos/sample-data';

/** Shared frame so every demo sits on the chat background at a readable width. */
function Stage({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full max-w-md flex-col gap-2">{children}</div>;
}

export function TextMessageDemo() {
  return (
    <Stage>
      <TextMessage
        direction="in"
        senderName="Ana"
        content="Are we still on for tonight?"
        time="19:04"
      />
      <TextMessage
        direction="out"
        content="Yes! 8pm at the usual place."
        time="19:06"
        status="read"
      />
      <TextMessage direction="in" content="🎉" time="19:07" />
      <SystemMessage>Messages are end-to-end encrypted.</SystemMessage>
    </Stage>
  );
}

export function BubbleDemo() {
  const variants = ['default', 'secondary', 'tinted', 'outline', 'muted', 'ghost'] as const;

  return (
    <Stage>
      {variants.map(variant => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant}</BubbleContent>
        </Bubble>
      ))}
      <Bubble variant="secondary" className="mb-4">
        <BubbleContent>With reactions</BubbleContent>
        <BubbleReactions>
          <MessageReaction emoji="👍" count={3} active />
          <MessageReaction emoji="❤️" count={1} />
        </BubbleReactions>
      </Bubble>
    </Stage>
  );
}

export function MessageDemo() {
  return (
    <Stage>
      <Message align="start">
        <MessageAvatar>
          {/* Inline data URI: next/image has nothing to optimise here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sampleAvatar} alt="" className="size-8" />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Ana Ribeiro</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>The avatar, header and footer are separate slots.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <MessageMeta time="19:04" />
          </MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageContent>
          <Bubble variant="default" align="end">
            <BubbleContent>So the same row works both ways.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <MessageMeta time="19:05" status="read" direction="out" />
          </MessageFooter>
        </MessageContent>
      </Message>
    </Stage>
  );
}

export function ImageMessageDemo() {
  return (
    <Stage>
      <ImageMessage direction="in" src={samplePhoto} alt="A sunset over hills" time="19:04" />
      <ImageMessage
        direction="out"
        src={samplePhoto}
        alt="A sunset over hills"
        caption="Look at this view"
        time="19:06"
        status="delivered"
      />
    </Stage>
  );
}

export function VideoMessageDemo() {
  return (
    <Stage>
      <VideoMessage
        direction="in"
        src=""
        poster={samplePhoto}
        duration="1:24"
        caption="Clip from the trip"
        time="19:08"
      />
    </Stage>
  );
}

export function AudioMessageDemo() {
  return (
    <Stage>
      <AudioMessage direction="in" src={sampleAudio} fileName="podcast-ep-12.mp3" time="19:10" />
      <AudioMessage
        direction="out"
        src={sampleAudio}
        fileName="notes.m4a"
        time="19:11"
        status="sent"
      />
    </Stage>
  );
}

export function VoiceMessageDemo() {
  return (
    <Stage>
      <VoiceMessage
        direction="in"
        src={sampleAudio}
        avatarUrl={sampleAvatar}
        senderName="Ana"
        time="19:12"
      />
      <VoiceMessage direction="out" src={sampleAudio} time="19:13" status="read" />
    </Stage>
  );
}

export function StickerMessageDemo() {
  return (
    <Stage>
      <StickerMessage direction="in" src={sampleSticker} alt="Smiling sticker" time="19:14" />
    </Stage>
  );
}

export function DocumentMessageDemo() {
  return (
    <Stage>
      <DocumentMessage
        direction="in"
        fileName="quarterly-report.pdf"
        fileSize="2.4 MB"
        time="19:15"
      />
      <DocumentMessage
        direction="out"
        fileName="budget.xlsx"
        fileSize="88 KB"
        time="19:16"
        status="delivered"
      />
    </Stage>
  );
}

export function ContactMessageDemo() {
  return (
    <Stage>
      <ContactMessage
        direction="in"
        name="Marco Silva"
        phoneNumber="+351 912 345 678"
        avatarUrl={sampleAvatar}
        time="19:17"
      />
    </Stage>
  );
}

export function LocationMessageDemo() {
  return (
    <Stage>
      <LocationMessage
        direction="in"
        latitude={38.7223}
        longitude={-9.1393}
        previewUrl={sampleMap}
        name="Praça do Comércio"
        address="Lisbon, Portugal"
        time="19:18"
      />
    </Stage>
  );
}

export function PollMessageDemo() {
  return (
    <Stage>
      <PollMessage
        direction="in"
        question="Where should we eat?"
        options={[
          { id: 'a', label: 'Ramen', votes: 4 },
          { id: 'b', label: 'Pizza', votes: 2 },
          { id: 'c', label: 'Tapas', votes: 5 },
        ]}
        selected={['c']}
        time="19:20"
      />
    </Stage>
  );
}
