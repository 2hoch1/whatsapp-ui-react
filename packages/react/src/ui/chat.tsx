import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/string';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/ui/components/context-menu';

/** Palettes shipped with the package; each is a `css/<name>.css` import away. */
export type ChatColorScheme = 'natural' | 'forest' | 'ocean' | 'rose';

const chatVariants = cva(
  'flex min-h-0 flex-col overflow-hidden bg-background text-foreground @container',
  {
    variants: {
      bordered: {
        true: 'rounded-xl border border-border',
        false: '',
      },
    },
    defaultVariants: {
      bordered: false,
    },
  }
);

export interface ChatProps extends React.ComponentProps<'div'>, VariantProps<typeof chatVariants> {
  /** Selects a palette by setting `data-wa-color`. */
  colorScheme?: ChatColorScheme;
  /** Adds the `dark` class so the palette's dark values apply. */
  theme?: 'light' | 'dark';
  /** Background image behind the message list. */
  background?: string | null;
}

function Chat({
  colorScheme = 'natural',
  theme,
  background,
  bordered,
  className,
  style,
  children,
  ...props
}: ChatProps) {
  return (
    <div
      data-slot="chat"
      data-wa-color={colorScheme}
      className={cn(chatVariants({ bordered }), theme === 'dark' && 'dark', className)}
      style={
        background
          ? ({ ...style, '--wa-chat-background': `url(${background})` } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
    </div>
  );
}

export interface ChatHeaderProps extends React.ComponentProps<'div'> {
  name?: string;
  avatarUrl?: string;
  subtitle?: string;
}

function ChatHeader({ name, avatarUrl, subtitle, className, children, ...props }: ChatHeaderProps) {
  return (
    <div
      data-slot="chat-header"
      className={cn(
        'bg-card border-border flex shrink-0 items-center gap-3 border-b px-4 py-2.5',
        className
      )}
      {...props}
    >
      {(name ?? avatarUrl) !== undefined && (
        <Avatar className="size-10 shrink-0">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name ?? ''} />}
          <AvatarFallback>{name ? getInitials(name) : ''}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex min-w-0 flex-col">
        {name && <span className="truncate text-sm font-medium">{name}</span>}
        {subtitle && <span className="text-muted-foreground truncate text-xs">{subtitle}</span>}
      </div>
      {children && <div className="ml-auto flex items-center gap-1">{children}</div>}
    </div>
  );
}

/** Scrollable middle region. Put a `MessageScroller` inside it. */
function ChatContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-content"
      className={cn(
        'relative min-h-0 flex-1 bg-[image:var(--wa-chat-background)] bg-repeat',
        className
      )}
      {...props}
    />
  );
}

/** Composer region pinned to the bottom of the chat. */
function ChatFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="chat-footer"
      className={cn('bg-card border-border shrink-0 border-t px-3 py-2', className)}
      {...props}
    />
  );
}

export interface ChatContextMenuProps {
  children: React.ReactNode;
  /** Menu items, typically `ContextMenuItem`s. */
  items: React.ReactNode;
}

/** Wraps any part of the chat in a right-click menu. */
function ChatContextMenu({ children, items }: ChatContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger data-slot="chat-context-menu-trigger">{children}</ContextMenuTrigger>
      <ContextMenuContent>{items}</ContextMenuContent>
    </ContextMenu>
  );
}

export { Chat, ChatHeader, ChatContent, ChatFooter, ChatContextMenu, chatVariants };
