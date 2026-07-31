import React, { type Key } from 'react';

import { extractTextFromNode } from './extract-text';
import type { GroupedMessage } from './group-messages';

interface AddMessageOptions {
  node: React.ReactNode;
  /** @defaultValue `'me'` */
  senderId?: string;
}

export interface ChatReplyContextValue {
  messages: GroupedMessage[];
  sendMessage: (text: string) => void;
  addMessage: (options: AddMessageOptions) => void;
  /** @internal `true` only when a real `<Chat>` provides this context. */
  provided: boolean;
}

export const ChatReplyContext = React.createContext<ChatReplyContextValue>({
  messages: [],
  sendMessage: () => {},
  addMessage: () => {},
  provided: false,
});

/** Tracks which message ids this subscriber has already seen. */
function useUnseenMessages(messages: GroupedMessage[]) {
  const seenIdsRef = React.useRef<Set<Key | undefined>>(new Set(messages.map(m => m.id)));

  return React.useCallback(
    (current: GroupedMessage[]) => {
      const unseen = current.filter(m => !seenIdsRef.current.has(m.id));
      for (const message of unseen) seenIdsRef.current.add(message.id);
      return unseen;
    },
    [seenIdsRef]
  );
}

/** Calls `callback` for every new message arriving in the nearest `<Chat>`. */
export function useMessages(callback: (message: GroupedMessage) => void): void {
  const { messages } = React.useContext(ChatReplyContext);
  const takeUnseen = useUnseenMessages(messages);
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    for (const message of takeUnseen(messages)) callbackRef.current(message);
  }, [messages, takeUnseen]);
}

export interface UseReplyOptions {
  /** Node whose extracted text is the match trigger, compared case-insensitively. */
  onMessage: React.ReactNode;
  /** Node appended to the chat when a match is found. */
  replyMessage: React.ReactNode;
  /** Only match messages from this sender. When omitted, all senders match. */
  from?: string;
  /** @defaultValue `false` */
  once?: boolean;
}

/**
 * Appends `replyMessage` whenever an incoming message's text matches `onMessage`.
 * Must be used inside a `<Chat>`.
 */
export function useReply({ onMessage, replyMessage, from, once = false }: UseReplyOptions): void {
  const { messages, addMessage } = React.useContext(ChatReplyContext);
  const takeUnseen = useUnseenMessages(messages);
  const firedRef = React.useRef(false);

  // The reply nodes are fresh objects on every render, so they are read through a ref
  // instead of the dependency array: the rule should only re-run for new messages.
  const optionsRef = React.useRef({ onMessage, replyMessage, from, once, addMessage });

  React.useEffect(() => {
    optionsRef.current = { onMessage, replyMessage, from, once, addMessage };
  });

  React.useEffect(() => {
    const {
      onMessage: trigger,
      replyMessage: reply,
      from: sender,
      once: onlyOnce,
    } = optionsRef.current;

    if (onlyOnce && firedRef.current) return;

    const unseen = takeUnseen(messages);
    if (unseen.length === 0) return;

    const triggerText = extractTextFromNode(trigger).trim().toLowerCase();
    if (!triggerText) return;

    for (const message of unseen) {
      if (onlyOnce && firedRef.current) break;
      if (sender !== undefined && message.senderId !== sender) continue;

      if (extractTextFromNode(message.node).trim().toLowerCase() === triggerText) {
        if (onlyOnce) firedRef.current = true;
        optionsRef.current.addMessage({ node: reply });
      }
    }
  }, [messages, takeUnseen]);
}

export interface ReplyProps extends UseReplyOptions {
  /** @defaultValue `'me'` */
  from?: string;
}

/** Declarative wrapper around {@link useReply}. Renders nothing. */
export function Reply({ onMessage, replyMessage, from = 'me', once }: ReplyProps): null {
  useReply({
    onMessage,
    replyMessage,
    from,
    ...(once !== undefined ? { once } : {}),
  });
  return null;
}
