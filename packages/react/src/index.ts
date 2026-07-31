/**
 * Public API of `whatsapp-ui-react`.
 *
 * The same sources are published here and served through the shadcn registry, so a component
 * behaves identically whether it was installed from npm or copied in with the CLI.
 */

export * from '@/ui/components/aspect-ratio';
export * from '@/ui/components/avatar';
export * from '@/ui/components/badge';
export * from '@/ui/components/bubble';
export * from '@/ui/components/button';
export * from '@/ui/components/button-group';
export * from '@/ui/components/context-menu';
export * from '@/ui/components/direction';
export * from '@/ui/components/input';
export * from '@/ui/components/input-group';
export * from '@/ui/components/popover';
export * from '@/ui/components/progress';
export * from '@/ui/components/scroll-area';
export * from '@/ui/components/separator';
export * from '@/ui/components/skeleton';
export * from '@/ui/components/tabs';
export * from '@/ui/components/tooltip';

/* `message` and `message-scroller` re-export their primitives, so they are not listed above. */
export * from '@/ui/message';
export * from '@/ui/message-scroller';

export * from '@/ui/chat';
export * from '@/ui/chat-composer';
export * from '@/ui/text-message';
export * from '@/ui/image-message';
export * from '@/ui/video-message';
export * from '@/ui/audio-message';
export * from '@/ui/voice-message';
export * from '@/ui/sticker-message';
export * from '@/ui/document-message';
export * from '@/ui/contact-message';
export * from '@/ui/location-message';
export * from '@/ui/poll-message';
export * from '@/ui/placeholder';
export * from '@/ui/contact-menu';
export * from '@/ui/poll-menu';
export * from '@/ui/reaction-menu';
export * from '@/ui/expression-picker';

export * from '@/icons';

export { cn } from '@/lib/utils';
export { senderColor } from '@/lib/color';
export { getInitials } from '@/lib/string';
export { getDisplayDate } from '@/lib/time';
export { extractTextFromNode } from '@/lib/extract-text';
export {
  groupMessagesByDay,
  type GroupedMessage,
  type MessageDayGroup,
} from '@/lib/group-messages';

export {
  ChatReplyContext,
  Reply,
  useMessages,
  useReply,
  type ChatReplyContextValue,
  type ReplyProps,
  type UseReplyOptions,
} from '@/lib/scripted-chat';

export { useAudioPlayer, type AudioPlayerState } from '@/hooks/use-audio-player';
