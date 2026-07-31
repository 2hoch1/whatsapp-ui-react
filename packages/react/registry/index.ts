/**
 * Single source of truth for the registry. `registry.json` is generated from this file so the
 * shipped npm package and the downloadable registry items never drift apart.
 *
 * `path` is relative to the package root, which is where `shadcn build` runs.
 */

export type RegistryItemType =
  'registry:ui' | 'registry:component' | 'registry:lib' | 'registry:hook';

export interface RegistryFile {
  path: string;
  type: RegistryItemType;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

const ui = (name: string): RegistryFile => ({
  path: `src/ui/components/${name}.tsx`,
  type: 'registry:ui',
});

const component = (name: string): RegistryFile => ({
  path: `src/ui/${name}.tsx`,
  type: 'registry:component',
});

const lib = (name: string): RegistryFile => ({
  path: `src/lib/${name}.ts`,
  type: 'registry:lib',
});

const hook = (name: string): RegistryFile => ({
  path: `src/hooks/${name}.ts`,
  type: 'registry:hook',
});

export const primitives: RegistryItem[] = [
  {
    name: 'bubble',
    type: 'registry:ui',
    title: 'Bubble',
    description: 'The rounded container a message body sits in, with a reactions strip.',
    dependencies: ['class-variance-authority'],
    files: [ui('bubble')],
  },
  {
    name: 'message',
    type: 'registry:ui',
    title: 'Message',
    description: 'A chat message row: avatar, header, content and footer.',
    files: [ui('message')],
  },
  {
    name: 'message-scroller',
    type: 'registry:ui',
    title: 'Message Scroller',
    description:
      'Scroll container that pins the newest message and offers a jump-to-latest button.',
    dependencies: ['@shadcn/react'],
    registryDependencies: ['button'],
    files: [ui('message-scroller')],
  },
  {
    name: 'direction',
    type: 'registry:ui',
    title: 'Direction',
    description: 'Text-direction provider for right-to-left layouts.',
    dependencies: ['@base-ui/react'],
    files: [ui('direction')],
  },
];

export const components: RegistryItem[] = [
  {
    name: 'chat',
    type: 'registry:component',
    title: 'Chat',
    description: 'The full chat shell: header, scrollable content and composer footer.',
    registryDependencies: ['message', 'message-scroller', 'chat-composer'],
    files: [component('chat')],
  },
  {
    name: 'chat-composer',
    type: 'registry:component',
    title: 'Chat Composer',
    description: 'Message input with attachment, expression and voice actions.',
    registryDependencies: ['button', 'input-group'],
    files: [component('chat-composer')],
  },
  {
    name: 'text-message',
    type: 'registry:component',
    title: 'Text Message',
    description: 'Plain text and system message bodies.',
    registryDependencies: ['bubble', 'message'],
    files: [component('text-message')],
  },
  {
    name: 'image-message',
    type: 'registry:component',
    title: 'Image Message',
    description: 'Image and GIF message bodies.',
    registryDependencies: ['bubble', 'aspect-ratio'],
    files: [component('image-message')],
  },
  {
    name: 'video-message',
    type: 'registry:component',
    title: 'Video Message',
    description: 'Video message body with an inline player.',
    registryDependencies: ['bubble', 'aspect-ratio'],
    files: [component('video-message')],
  },
  {
    name: 'audio-message',
    type: 'registry:component',
    title: 'Audio Message',
    description: 'Audio file message with playback controls.',
    registryDependencies: ['bubble', 'button', 'progress'],
    files: [component('audio-message'), hook('use-audio-player')],
  },
  {
    name: 'voice-message',
    type: 'registry:component',
    title: 'Voice Message',
    description: 'Voice note with a waveform scrubber.',
    registryDependencies: ['bubble', 'button'],
    files: [component('voice-message'), hook('use-audio-player'), lib('audio')],
  },
  {
    name: 'document-message',
    type: 'registry:component',
    title: 'Document Message',
    description: 'File attachment message.',
    registryDependencies: ['bubble', 'button'],
    files: [component('document-message')],
  },
  {
    name: 'contact-message',
    type: 'registry:component',
    title: 'Contact Message',
    description: 'Shared contact card message.',
    registryDependencies: ['bubble', 'avatar', 'button'],
    files: [component('contact-message')],
  },
  {
    name: 'location-message',
    type: 'registry:component',
    title: 'Location Message',
    description: 'Shared location message with a map preview.',
    registryDependencies: ['bubble', 'aspect-ratio'],
    files: [component('location-message')],
  },
  {
    name: 'poll-message',
    type: 'registry:component',
    title: 'Poll Message',
    description: 'Poll message with vote bars.',
    registryDependencies: ['bubble', 'progress'],
    files: [component('poll-message')],
  },
  {
    name: 'sticker-message',
    type: 'registry:component',
    title: 'Sticker Message',
    description: 'Sticker message body.',
    registryDependencies: ['bubble'],
    files: [component('sticker-message')],
  },
  {
    name: 'placeholder',
    type: 'registry:component',
    title: 'Placeholder',
    description: 'Empty-state placeholder for an unopened conversation.',
    registryDependencies: ['skeleton'],
    files: [component('placeholder')],
  },
  {
    name: 'reaction-menu',
    type: 'registry:component',
    title: 'Reaction Menu',
    description: 'Quick emoji reaction picker anchored to a message.',
    registryDependencies: ['popover'],
    files: [component('reaction-menu')],
  },
  {
    name: 'contact-menu',
    type: 'registry:component',
    title: 'Contact Menu',
    description: 'Contact chooser for sharing a contact card into a conversation.',
    registryDependencies: ['popover', 'avatar', 'separator'],
    files: [component('contact-menu')],
  },
  {
    name: 'poll-menu',
    type: 'registry:component',
    title: 'Poll Menu',
    description: 'Composer popover for building a poll before sending it.',
    registryDependencies: ['popover', 'button', 'input'],
    files: [component('poll-menu')],
  },
  {
    name: 'expression-picker',
    type: 'registry:component',
    title: 'Expression Picker',
    description: 'Tabbed emoji, sticker and GIF picker for the composer.',
    registryDependencies: ['popover', 'tabs', 'input', 'scroll-area'],
    files: [component('expression-picker')],
  },
];

export const registryItems: RegistryItem[] = [...primitives, ...components];
