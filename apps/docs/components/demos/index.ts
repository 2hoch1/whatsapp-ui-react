import type { ComponentType } from 'react';

import {
  AudioMessageDemo,
  BubbleDemo,
  ContactMessageDemo,
  DocumentMessageDemo,
  ImageMessageDemo,
  LocationMessageDemo,
  MessageDemo,
  PollMessageDemo,
  StickerMessageDemo,
  TextMessageDemo,
  VideoMessageDemo,
  VoiceMessageDemo,
} from '@/components/demos/message-demos';
import {
  ChatComposerDemo,
  ChatDemo,
  ContactMenuDemo,
  ExpressionPickerDemo,
  MessageScrollerDemo,
  PlaceholderDemo,
  PollMenuDemo,
  ReactionMenuDemo,
} from '@/components/demos/chat-demos';

/**
 * Keyed by registry item name, so `<ComponentPreview name="text-message" />` in MDX renders the
 * demo and prints the matching install command without importing anything per page.
 */
export const demos: Record<string, ComponentType> = {
  bubble: BubbleDemo,
  message: MessageDemo,
  'message-scroller': MessageScrollerDemo,
  chat: ChatDemo,
  'chat-composer': ChatComposerDemo,
  'text-message': TextMessageDemo,
  'image-message': ImageMessageDemo,
  'video-message': VideoMessageDemo,
  'audio-message': AudioMessageDemo,
  'voice-message': VoiceMessageDemo,
  'sticker-message': StickerMessageDemo,
  'document-message': DocumentMessageDemo,
  'contact-message': ContactMessageDemo,
  'location-message': LocationMessageDemo,
  'poll-message': PollMessageDemo,
  placeholder: PlaceholderDemo,
  'reaction-menu': ReactionMenuDemo,
  'contact-menu': ContactMenuDemo,
  'poll-menu': PollMenuDemo,
  'expression-picker': ExpressionPickerDemo,
};

export const demoNames = Object.keys(demos);
