'use client';

import { useState } from 'react';
import type { ChatColorScheme } from 'whatsapp-ui-react';

import {
  GroupChatExample,
  MediaChatExample,
  PrivateChatExample,
} from '@/components/examples/chat-examples';

const SCHEMES: ChatColorScheme[] = ['natural', 'forest', 'ocean', 'rose'];

const EXAMPLES = [
  {
    id: 'private',
    title: 'Private chat',
    description:
      'A working one-to-one conversation. Type in the composer and the message is appended to the thread.',
    Component: PrivateChatExample,
  },
  {
    id: 'group',
    title: 'Group chat',
    description:
      'Incoming bubbles carry a sender name, tinted with a colour derived from the name so each participant stays recognisable.',
    Component: GroupChatExample,
  },
  {
    id: 'media',
    title: 'Rich media',
    description:
      'Every non-text message type in one thread: image, sticker, voice note, audio file, document and location.',
    Component: MediaChatExample,
  },
] as const;

export default function ExamplesPage() {
  const [colorScheme, setColorScheme] = useState<ChatColorScheme>('natural');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Examples</h1>
        <p className="text-fd-muted-foreground max-w-2xl">
          Complete chats assembled from the library. Every example below uses the same components
          you would install; only the sample data differs.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-fd-muted-foreground text-sm">Palette</span>
          {SCHEMES.map(scheme => (
            <button
              key={scheme}
              type="button"
              onClick={() => setColorScheme(scheme)}
              aria-pressed={colorScheme === scheme}
              className={`rounded-lg border px-3 py-1.5 text-sm capitalize transition-colors ${
                colorScheme === scheme
                  ? 'bg-fd-primary text-fd-primary-foreground border-transparent'
                  : 'border-fd-border hover:bg-fd-muted'
              }`}
            >
              {scheme}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setTheme(value => (value === 'dark' ? 'light' : 'dark'))}
            className="border-fd-border hover:bg-fd-muted ml-2 rounded-lg border px-3 py-1.5 text-sm"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-2">
        {EXAMPLES.map(({ id, title, description, Component }) => (
          <section key={id} id={id} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium">{title}</h2>
              <p className="text-fd-muted-foreground text-sm">{description}</p>
            </div>
            <Component colorScheme={colorScheme} theme={theme} />
          </section>
        ))}
      </div>
    </main>
  );
}
