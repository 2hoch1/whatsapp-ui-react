import { History } from '../../src/components/History'
import { Message, Text } from '../../src/components/Message'
import { Reply } from '../../src/components/Reply'
import React from 'react'

export function BbqHistory(): React.JSX.Element {
  return (
    <History>
      <Message
        direction="in"
        senderId="mats"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        timestamp="2026-02-26T11:02:00.000Z"
        mode="neutral"
        time="11:02"
      >
        <Text content="Storm today if you want to come over" />
      </Message>
      <Message
        direction="in"
        senderId="mats"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        timestamp="2026-02-26T11:02:30.000Z"
        mode="neutral"
        time="11:02"
      >
        <Text content="But keep it chill" />
      </Message>
      <Message
        direction="in"
        senderId="josh"
        group
        senderName="Josh"
        avatarUrl="https://i.pravatar.cc/40?img=5"
        timestamp="2026-02-26T12:27:00.000Z"
        mode="neutral"
        time="12:27"
      >
        <Text content="You sick?" />
      </Message>
      <Message
        direction="in"
        senderId="mats"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        timestamp="2026-02-26T12:45:00.000Z"
        mode="neutral"
        time="12:45"
      >
        <Text content="A bit, hence why chill is fine" />
      </Message>
      <Message
        direction="in"
        senderId="philipp"
        group
        senderName="Philipp"
        avatarUrl="https://i.pravatar.cc/40?img=7"
        timestamp="2026-02-26T14:06:00.000Z"
        mode="neutral"
        time="14:06"
      >
        <Text content="Can't make it" />
      </Message>
      <Message
        direction="in"
        senderId="mats"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        timestamp="2026-02-26T14:43:00.000Z"
        mode="neutral"
        time="14:43"
      >
        <Text content="The others?" />
      </Message>
      <Message
        direction="in"
        senderId="ben"
        group
        senderName="Ben"
        avatarUrl="https://i.pravatar.cc/40?img=9"
        timestamp="2026-02-26T14:57:00.000Z"
        mode="neutral"
        time="14:57"
      >
        <Text content="I can't either" />
      </Message>
      <Message
        direction="out"
        senderId="me"
        timestamp="2026-02-26T15:10:00.000Z"
        mode="neutral"
        time="15:10"
        status="read"
      >
        <Text content="I'm in! 🙌" />
      </Message>
      <Message
        direction="in"
        senderId="josh"
        group
        senderName="Josh"
        avatarUrl="https://i.pravatar.cc/40?img=5"
        timestamp="2026-02-26T15:19:00.000Z"
        mode="neutral"
        time="15:19"
      >
        <Text content="Love coming over Mats. Thanks for the invite 🥰" />
      </Message>
      <Message
        direction="in"
        senderId="mattis"
        group
        senderName="Mattis"
        avatarUrl="https://i.pravatar.cc/40?img=11"
        timestamp="2026-02-26T15:21:00.000Z"
        mode="neutral"
        time="15:21"
      >
        <Text content="Can't today" />
      </Message>
      <Message
        direction="in"
        senderId="tobias"
        group
        senderName="Tobias"
        avatarUrl="https://i.pravatar.cc/40?img=13"
        timestamp="2026-02-26T15:48:00.000Z"
        mode="neutral"
        time="15:48"
      >
        <Text content="Also out for today" />
      </Message>
      <Message
        direction="in"
        senderId="aaron"
        group
        senderName="Aaron"
        avatarUrl="https://i.pravatar.cc/40?img=15"
        timestamp="2026-02-26T16:31:00.000Z"
        mode="neutral"
        time="16:31"
      >
        <Text content="Same, I'm out" />
      </Message>
    </History>
  )
}

export const bbqReply = (
  <Reply
    once
    onMessage={<Text content="Same, I'm out" />}
    replyMessage={
      <Message direction="out" mode="neutral" time="now">
        <Text content="I'm In 🙌" />
      </Message>
    }
  />
)
