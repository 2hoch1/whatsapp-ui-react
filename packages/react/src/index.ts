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
export * from '@/ui/components/message';
export * from '@/ui/components/message-scroller';
export * from '@/ui/components/popover';
export * from '@/ui/components/progress';
export * from '@/ui/components/scroll-area';
export * from '@/ui/components/separator';
export * from '@/ui/components/skeleton';
export * from '@/ui/components/tabs';
export * from '@/ui/components/tooltip';

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
