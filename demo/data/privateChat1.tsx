import React from 'react'
import { History } from '../../src/components/History'
import { Message, Text } from '../../src/components/Message'
import { Reply } from '../../src/components/Reply'

export function WorkBotHistory(): React.JSX.Element {
  return (
    <History>
      <Message
        direction="in"
        senderId="workbot"
        timestamp="2026-02-27T09:00:00.000Z"
        mode="neutral"
        time="09:00"
      >
        <Text content="Send me !ho and I'll greet you, but only once. 😊" />
      </Message>
      <Message
        direction="in"
        senderId="workbot"
        timestamp="2026-02-27T09:00:10.000Z"
        mode="neutral"
        time="09:00"
      >
        <Text content="Send !ha as many times as you like and I'll always laugh back. 😂" />
      </Message>
    </History>
  )
}

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
