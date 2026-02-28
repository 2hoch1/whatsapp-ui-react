import { type GroupedMessage } from '../../src/components/Chat'
import { Message, Text } from '../../src/components/Message'
import { Reply } from '../../src/components/Reply'

export const workBotMessages: GroupedMessage[] = [
  {
    id: 'wb1',
    senderId: 'workbot',
    timestamp: '2026-02-27T09:00:00.000Z',
    node: (
      <Message direction="in" mode="neutral" time="09:00">
        <Text content="Send me !ho and I'll greet you, but only once. 😊" />
      </Message>
    ),
  },
  {
    id: 'wb2',
    senderId: 'workbot',
    timestamp: '2026-02-27T09:00:10.000Z',
    node: (
      <Message direction="in" mode="neutral" time="09:00">
        <Text content="Send !ha as many times as you like and I'll always laugh back. 😂" />
      </Message>
    ),
  },
]

export const workBotReply = (
  <>
    <Reply
      once
      onMessage={<Text content="!ho" />}
      replyMessage={
        <Message direction="in" mode="neutral" time="now">
          <Text content="👋 Hey there! (Toldya)" />
        </Message>
      }
    />
    <Reply
      onMessage={<Text content="!ha" />}
      replyMessage={
        <Message direction="in" mode="neutral" time="now">
          <Text content="Ha ha! 😂" />
        </Message>
      }
    />
  </>
)
