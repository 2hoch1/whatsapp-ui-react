import * as React from 'react';

import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/string';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/components/popover';
import { Separator } from '@/ui/components/separator';

export interface ContactMenuEntry {
  id: string;
  name: string;
  avatarUrl?: string;
  subtitle?: string;
}

export interface ContactMenuProps {
  children: React.ReactNode;
  contacts: ContactMenuEntry[];
  onSelect?: (contact: ContactMenuEntry) => void;
  emptyLabel?: string;
  className?: string;
}

/** Contact chooser used when sharing a contact card into a conversation. */
function ContactMenu({
  children,
  contacts,
  onSelect,
  emptyLabel = 'No contacts',
  className,
}: ContactMenuProps) {
  return (
    <Popover>
      <PopoverTrigger data-slot="contact-menu-trigger">{children}</PopoverTrigger>
      <PopoverContent data-slot="contact-menu" className={cn('w-64 p-1', className)}>
        {contacts.length === 0 ? (
          <p className="text-muted-foreground px-2 py-6 text-center text-sm">{emptyLabel}</p>
        ) : (
          contacts.map((contact, index) => (
            <React.Fragment key={contact.id}>
              {index > 0 && <Separator />}
              <button
                type="button"
                onClick={() => onSelect?.(contact)}
                className="hover:bg-accent flex w-full items-center gap-3 rounded-md px-2 py-2 text-left"
              >
                <Avatar className="size-8 shrink-0">
                  {contact.avatarUrl && <AvatarImage src={contact.avatarUrl} alt={contact.name} />}
                  <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm">{contact.name}</span>
                  {contact.subtitle && (
                    <span className="text-muted-foreground truncate text-xs">
                      {contact.subtitle}
                    </span>
                  )}
                </span>
              </button>
            </React.Fragment>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}

export { ContactMenu };
