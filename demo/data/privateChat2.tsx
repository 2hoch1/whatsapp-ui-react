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
    timestamp: '2026-03-01T10:02:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:02" status="read">
        <Text content="Yeah of course 🙂 What time does it start?" />
      </Message>
    ),
  },
  {
    id: 's3',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:04:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:04">
        <Text content="7pm at her place." />
      </Message>
    ),
  },
  {
    id: 's4',
    senderId: 'me',
    timestamp: '2026-03-01T10:06:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:06" status="read">
        <Text content="Nice. Want me to bring anything?" />
      </Message>
    ),
  },
  {
    id: 's5',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:08:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:08">
        <Text content="She said no gifts, but I’m bringing flowers anyway 😂" />
      </Message>
    ),
  },
  {
    id: 's6',
    senderId: 'me',
    timestamp: '2026-03-01T10:09:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:09" status="read">
        <Text content="Fair. I’ll grab a bottle of wine then 🍷" />
      </Message>
    ),
  },
  {
    id: 's7',
    senderId: 'sarah',
    timestamp: '2026-03-01T10:11:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:11">
        <Text content="Perfect. See you Saturday 🎉" />
      </Message>
    ),
  },
  {
    id: 's8',
    senderId: 'me',
    timestamp: '2026-03-02T10:30:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:30" status="read">
        <Text content="Last night was actually so much fun 😄" />
      </Message>
    ),
  },
  {
    id: 's9',
    senderId: 'sarah',
    timestamp: '2026-03-02T10:33:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="10:33">
        <Text content="Right?? I did not expect it to go that long 😂" />
      </Message>
    ),
  },
  {
    id: 's10',
    senderId: 'me',
    timestamp: '2026-03-02T10:35:00.000Z',
    node: (
      <Message direction="out" mode="neutral" time="10:35" status="delivered">
        <Text content="By the way, do you still have my metal plates from the kitchen?" />
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
      <Message direction="out" mode="neutral" time="10:37" status="read">
        <Text content="I’m going to assume that means yes 😅" />
      </Message>
    ),
  },
]
