import { Animated } from '../../src/components/Animated'
import { History } from '../../src/components/History'
import { Message, Text } from '../../src/components/Message'
import React from 'react'

export function WorkTeamHistory(): React.JSX.Element {
  return (
    <History>
      <Animated delay={5200}>
        <Message
          direction="in"
          senderId="kai"
          group
          senderName="Kai"
          avatarUrl="https://i.pravatar.cc/40?img=25"
          mode="neutral"
          time="09:05"
        >
          <Text content="Hey, quick question. Does anyone know our current total user count? I need it for the board slides tomorrow morning 🙏" />
        </Message>
      </Animated>
      <Animated delay={10200}>
        <Message
          direction="in"
          senderId="hannah"
          group
          senderName="Hannah"
          avatarUrl="https://i.pravatar.cc/40?img=44"
          mode="neutral"
          time="09:05"
        >
          <Text content="I tried pulling it from the dashboard earlier but the query keeps timing out 😬 The users table has grown a lot lately." />
        </Message>
      </Animated>
      <Animated delay={15800}>
        <Message
          direction="in"
          senderId="tom"
          group
          senderName="Tom"
          avatarUrl="https://i.pravatar.cc/40?img=57"
          mode="neutral"
          time="09:06"
        >
          <Text content="Same issue here. Even the read replica struggled. It crashed after about 40 seconds. A full COUNT(*) would probably take hours at this point." />
        </Message>
      </Animated>
      <Animated delay={18500}>
        <Message
          direction="in"
          senderId="kai"
          group
          senderName="Kai"
          avatarUrl="https://i.pravatar.cc/40?img=25"
          mode="neutral"
          time="09:06"
        >
          <Text content="That is not ideal. They will definitely ask for the exact number. The meeting is at 9 and I really do not want to guess." />
        </Message>
      </Animated>
      <Animated delay={21500}>
        <Message direction="out" senderId="me" mode="neutral" time="09:07" status="sent">
          <Text content="No worries, I got you." />
        </Message>
      </Animated>
      <Animated delay={23500}>
        <Message direction="out" senderId="me" mode="neutral" time="09:07" status="sent">
          <Text content="!usercount" />
        </Message>
      </Animated>
      <Animated delay={24000}>
        <Message
          direction="in"
          senderId="workbot"
          group
          senderName="WorkBot 🤖"
          avatarUrl="https://i.pravatar.cc/40?img=68"
          mode="neutral"
          time="09:07"
        >
          <Text content="Current total registered users: 2,847,392" />
        </Message>
      </Animated>
    </History>
  )
}
