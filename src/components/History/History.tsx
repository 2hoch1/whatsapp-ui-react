import { Animated } from '@/components/Animated/Animated'
import { DayDivider } from '@/components/Chat/DayDivider'
import type { MessageProps } from '@/components/Message/Message'
import { Message } from '@/components/Message/Message'
import { cn } from '@/utils/cn'
import { isSameCalendarDay, toDate } from '@/utils/date'
import React from 'react'

/** Props for the {@link History} component. */
export interface HistoryProps {
  /** `<Message>` elements to render, optionally wrapped in `<Animated>`. Manual `<DayDivider>` elements are passed through unchanged. */
  children?: React.ReactNode
  /** Additional CSS class names applied to the wrapper element. */
  className?: string
}

/**
 * Renders a static chat history from JSX children.
 * Automatically injects `top={true}` into the first message of each consecutive sender group,
 * inserts `<DayDivider>` between calendar days, and shows a "Today" divider when the history is empty.
 */
function History({ children, className }: HistoryProps): React.JSX.Element {
  const childArray = React.Children.toArray(children ?? [])
  const result: React.ReactNode[] = []

  let lastGroupKey: string | undefined = undefined
  let lastDate: Date | null = null
  const today = new Date()
  let hasAnyMessage = false

  /** Extracts MessageProps from a direct <Message> or an <Animated>-wrapped <Message>. Returns null for anything else. */
  function extractMessageInfo(node: React.ReactNode):
    | {
        msgProps: MessageProps
        isAnimated: true
        animatedEl: React.ReactElement
        msgEl: React.ReactElement<MessageProps>
      }
    | { msgProps: MessageProps; isAnimated: false; msgEl: React.ReactElement<MessageProps> }
    | null {
    if (!React.isValidElement(node)) return null

    const el = node as React.ReactElement

    if (el.type === Message) {
      return {
        msgProps: el.props as MessageProps,
        isAnimated: false,
        msgEl: el as React.ReactElement<MessageProps>,
      }
    }

    if (el.type === Animated) {
      const innerChildren = React.Children.toArray(
        (el.props as { children?: React.ReactNode }).children ?? []
      )
      const innerMsg = innerChildren.find(
        c => React.isValidElement(c) && (c as React.ReactElement).type === Message
      ) as React.ReactElement<MessageProps> | undefined

      if (innerMsg) {
        return {
          msgProps: innerMsg.props,
          isAnimated: true,
          animatedEl: el,
          msgEl: innerMsg,
        }
      }
    }

    return null
  }

  for (const child of childArray) {
    const info = extractMessageInfo(child)

    if (!info) {
      result.push(child)
      continue
    }

    hasAnyMessage = true

    const { msgProps, isAnimated } = info
    const groupKey = msgProps.senderId ?? msgProps.direction
    const currentDate = toDate(msgProps.timestamp)

    const isNewDay =
      currentDate !== null && (lastDate === null || !isSameCalendarDay(currentDate, lastDate))

    if (isNewDay && currentDate) {
      result.push(<DayDivider key={`divider-${currentDate.toISOString()}`} date={currentDate} />)
    }

    const isNewGroup = lastGroupKey === undefined || groupKey !== lastGroupKey || isNewDay

    if (isAnimated) {
      const { animatedEl, msgEl } = info as {
        animatedEl: React.ReactElement
        msgEl: React.ReactElement<MessageProps>
        msgProps: MessageProps
        isAnimated: true
      }
      const newMsg = React.cloneElement(msgEl as React.ReactElement<{ top?: boolean }>, {
        top: isNewGroup,
      })
      result.push(
        React.cloneElement(animatedEl as React.ReactElement<{ children?: React.ReactNode }>, {
          children: newMsg,
        })
      )
    } else {
      result.push(
        React.cloneElement(info.msgEl as React.ReactElement<{ top?: boolean }>, {
          top: isNewGroup,
        })
      )
    }

    lastGroupKey = groupKey
    if (currentDate) lastDate = currentDate
  }

  // Show a "Today" divider only when the history is empty (no children).
  if (!hasAnyMessage) {
    result.push(<DayDivider key="history-today-divider" date={today} />)
  }

  if (className) {
    return <div className={cn(className)}>{result}</div>
  }

  return <>{result}</>
}

export { History }
