import { type GroupedMessage } from '../../src/components/Chat'
import { Message, Text } from '../../src/components/Message'
import { Reply } from '../../src/components/Reply'

export const bbqMessages: GroupedMessage[] = [
  {
    id: 'g1',
    senderId: 'mats',
    timestamp: '2026-02-26T11:02:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        mode="neutral"
        time="11:02"
      >
        <Text content="Storm today if you want to come over" />
      </Message>
    ),
  },
  {
    id: 'g2',
    senderId: 'mats',
    timestamp: '2026-02-26T11:02:30.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        mode="neutral"
        time="11:02"
      >
        <Text content="But keep it chill" />
      </Message>
    ),
  },
  {
    id: 'g3',
    senderId: 'josh',
    timestamp: '2026-02-26T12:27:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Josh"
        avatarUrl="https://i.pravatar.cc/40?img=5"
        mode="neutral"
        time="12:27"
      >
        <Text content="You sick?" />
      </Message>
    ),
  },
  {
    id: 'g4',
    senderId: 'mats',
    timestamp: '2026-02-26T12:45:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        mode="neutral"
        time="12:45"
      >
        <Text content="A bit, hence why chill is fine" />
      </Message>
    ),
  },
  {
    id: 'g5',
    senderId: 'philipp',
    timestamp: '2026-02-26T14:06:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Philipp"
        avatarUrl="https://i.pravatar.cc/40?img=7"
        mode="neutral"
        time="14:06"
      >
        <Text content="Can't make it" />
      </Message>
    ),
  },
  {
    id: 'g6',
    senderId: 'mats',
    timestamp: '2026-02-26T14:43:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Mats"
        avatarUrl="https://i.pravatar.cc/40?img=3"
        mode="neutral"
        time="14:43"
      >
        <Text content="The others?" />
      </Message>
    ),
  },
  {
    id: 'g7',
    senderId: 'ben',
    timestamp: '2026-02-26T14:57:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Ben"
        avatarUrl="https://i.pravatar.cc/40?img=9"
        mode="neutral"
        time="14:57"
      >
        <Text content="I can't either" />
      </Message>
    ),
  },
  {
    id: 'g8',
    senderId: 'me',
    timestamp: '2026-02-26T15:10:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="15:10" status="read">
        <Text content="I'm in! 🙌" />
      </Message>
    ),
  },
  {
    id: 'g9',
    senderId: 'josh',
    timestamp: '2026-02-26T15:19:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Josh"
        avatarUrl="https://i.pravatar.cc/40?img=5"
        mode="neutral"
        time="15:19"
      >
        <Text content="Love coming over Mats. Thanks for the invite 🥰" />
      </Message>
    ),
  },
  {
    id: 'g10',
    senderId: 'mattis',
    timestamp: '2026-02-26T15:21:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Mattis"
        avatarUrl="https://i.pravatar.cc/40?img=11"
        mode="neutral"
        time="15:21"
      >
        <Text content="Can't today" />
      </Message>
    ),
  },
  {
    id: 'g11',
    senderId: 'tobias',
    timestamp: '2026-02-26T15:48:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Tobias"
        avatarUrl="https://i.pravatar.cc/40?img=13"
        mode="neutral"
        time="15:48"
      >
        <Text content="Also out for today" />
      </Message>
    ),
  },
  {
    id: 'g12',
    senderId: 'aaron',
    timestamp: '2026-02-26T16:31:00.000Z',
    node: (
      <Message
        direction="in"
        group
        senderName="Aaron"
        avatarUrl="https://i.pravatar.cc/40?img=15"
        mode="neutral"
        time="16:31"
      >
        <Text content="Same, I'm out" />
      </Message>
    ),
  },
]

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
