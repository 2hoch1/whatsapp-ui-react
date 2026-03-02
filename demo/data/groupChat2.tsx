import React from 'react'
import type { ChatHandle } from '../../src/components/Chat/Chat'
import { Message, Text } from '../../src/components/Message'

function nowTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Fires a scripted WorkTeam chat animation on mount via the Chat ref.
 */
export function WorkTeamAnimation({
  chatRef,
}: {
  chatRef: React.RefObject<ChatHandle | null>
}): null {
  React.useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
    const add = (options: Parameters<ChatHandle['addMessage']>[0]) =>
      chatRef.current?.addMessage(options)

    // Kai opens the thread
    at(5200, () =>
      add({
        senderId: 'kai',
        node: (
          <Message
            direction="in"
            group
            top
            senderName="Kai"
            avatarUrl="https://i.pravatar.cc/40?img=25"
            mode="neutral"
            time={nowTime()}
          >
            <Text content="Hey, quick question. Does anyone know our current total user count? I need it for the board slides tomorrow morning 🙏" />
          </Message>
        ),
      })
    )

    // Hannah replies
    at(10200, () =>
      add({
        senderId: 'hannah',
        node: (
          <Message
            direction="in"
            group
            top
            senderName="Hannah"
            avatarUrl="https://i.pravatar.cc/40?img=44"
            mode="neutral"
            time={nowTime()}
          >
            <Text content="I tried pulling it from the dashboard earlier but the query keeps timing out 😬 The users table has grown a lot lately." />
          </Message>
        ),
      })
    )

    // Tom elaborates
    at(15800, () =>
      add({
        senderId: 'tom',
        node: (
          <Message
            direction="in"
            group
            top
            senderName="Tom"
            avatarUrl="https://i.pravatar.cc/40?img=57"
            mode="neutral"
            time={nowTime()}
          >
            <Text content="Same issue here. Even the read replica struggled. It crashed after about 40 seconds. A full COUNT(*) would probably take hours at this point." />
          </Message>
        ),
      })
    )

    // Kai stressed
    at(18500, () =>
      add({
        senderId: 'kai',
        node: (
          <Message
            direction="in"
            group
            top
            senderName="Kai"
            avatarUrl="https://i.pravatar.cc/40?img=25"
            mode="neutral"
            time={nowTime()}
          >
            <Text content="That is not ideal. They will definitely ask for the exact number. The meeting is at 9 and I really do not want to guess." />
          </Message>
        ),
      })
    )

    // You reassure
    at(21500, () =>
      add({
        senderId: 'me',
        node: (
          <Message direction="out" mode="neutral" time={nowTime()} status="sent">
            <Text content="No worries, I got you." />
          </Message>
        ),
      })
    )

    // You send command
    at(23500, () =>
      add({
        senderId: 'me',
        node: (
          <Message direction="out" mode="neutral" time={nowTime()} status="sent">
            <Text content="!usercount" />
          </Message>
        ),
      })
    )

    // WorkBot answers instantly
    at(24000, () =>
      add({
        senderId: 'workbot',
        node: (
          <Message
            direction="in"
            group
            top
            senderName="WorkBot 🤖"
            avatarUrl="https://i.pravatar.cc/40?img=68"
            mode="neutral"
            time={nowTime()}
          >
            <Text content="Current total registered users: 2,847,392" />
          </Message>
        ),
      })
    )

    return () => {
      timers.forEach(clearTimeout)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
