import { type GroupedMessage } from '../../src/components/Chat'
import { Message, Text, Voice } from '../../src/components/Message'
import metalPipeMp3 from '../assets/metal_pipe.mp3'

export const sarahMessages: GroupedMessage[] = [
  {
    id: 's1',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:00:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:00">
        <Text content="Hey! Are you coming to Emma's birthday on Saturday? 🎂" />
      </Message>
    ),
  },
  {
    id: 's2',
    senderId: 'me',
    timestamp: '2026-03-01T10:03:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:03" status="read">
        <Text content="Of course! What time does it start?" />
      </Message>
    ),
  },
  {
    id: 's3',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:04:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:04">
        <Text content="7pm, at her place" />
      </Message>
    ),
  },
  {
    id: 's4',
    senderId: 'me',
    timestamp: '2026-03-01T10:06:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:06" status="delivered">
        <Text content="Should I bring anything?" />
      </Message>
    ),
  },
  {
    id: 's5',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:08:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:08">
        <Text content="She said no gifts but I'm getting her flowers anyway 😂" />
      </Message>
    ),
  },
  {
    id: 's6',
    senderId: 'me',
    timestamp: '2026-03-01T10:10:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:10" status="read">
        <Text content="Good call, I'll bring wine then 🍷" />
      </Message>
    ),
  },
  {
    id: 's7',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:12:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:12">
        <Text content="Perfect! See you there 🎉" />
      </Message>
    ),
  },
  {
    id: 's8',
    senderId: 'me',
    timestamp: '2026-03-02T10:30:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:30" status="read">
        <Text content="That was so fun last night!" />
      </Message>
    ),
  },
  {
    id: 's9',
    senderId: 'sarah',
    timestamp: '2026-03-02T10:35:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:35">
        <Text content="Right?? We need to do this more often 😄" />
      </Message>
    ),
  },
  {
    id: 's10',
    senderId: 'me',
    timestamp: '2026-03-02T10:35:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:35">
        <Text content="You got still got my metal plates?" />
      </Message>
    ),
  },
  {
    id: 's11',
    senderId: 'sarah',
    timestamp: '2026-03-02T10:36:00.000Z',
    node: (
      <Message direction="in" top mode="neutral" time="10:36">
        <Voice src={metalPipeMp3} duration="0:42" avatarUrl="https://i.pravatar.cc/40?img=47" />
      </Message>
    ),
  },
  {
    id: 's12',
    senderId: 'me',
    timestamp: '2026-03-02T10:37:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:37">
        <Text content="Good to know. :)" />
      </Message>
    ),
  },
]
