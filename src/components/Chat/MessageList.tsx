import { cn } from '@/utils/cn'
import { isSameCalendarDay } from '@/utils/date'
import { groupMessagesByDay, type GroupedMessage } from '@/utils/groupMessages'
import React from 'react'
import { DayDivider } from './DayDivider'

export type { GroupedMessage }

interface MessageListProps {
  className?: string
  messages: GroupedMessage[]
}

function MessageList({ className, messages }: MessageListProps): React.JSX.Element {
  const dayGroups = groupMessagesByDay(messages)

  const content = dayGroups.map((group, index) => {
    const previousGroup = dayGroups[index - 1]
    const dayDate = group.dayDate
    const shouldRenderDivider =
      dayDate !== null &&
      (!previousGroup?.dayDate || !isSameCalendarDay(dayDate, previousGroup.dayDate))

    // Use a stable key: combine senderId, first message ID, and day timestamp
    const firstMsgId = group.messages[0]?.id ?? ''
    const dayKey = dayDate?.getTime() ?? index
    const groupKey = `${group.senderId}-${firstMsgId}-${dayKey}`

    return (
      <React.Fragment key={groupKey}>
        {shouldRenderDivider && dayDate !== null && <DayDivider date={dayDate} />}
        {group.messages.map((message, msgIndex) => {
          const node =
            msgIndex === 0
              ? React.cloneElement(message.node as React.ReactElement<{ top?: boolean }>, {
                  top: true,
                })
              : message.node
          return (
            <React.Fragment key={message.id ?? `${message.senderId}-${msgIndex}`}>
              {node}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  })

  if (className) {
    return <div className={cn(className)}>{content}</div>
  }

  return <>{content}</>
}

export { MessageList }
export type { MessageListProps }
