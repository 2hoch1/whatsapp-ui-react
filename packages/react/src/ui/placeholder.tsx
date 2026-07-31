import * as React from 'react';

import { cn } from '@/lib/utils';

export interface PlaceholderProps extends React.ComponentProps<'div'> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

/** Empty state shown where a conversation would be, before one is opened. */
function Placeholder({
  title = 'No chat selected',
  description = 'Pick a conversation to start messaging.',
  icon,
  className,
  children,
  ...props
}: PlaceholderProps) {
  return (
    <div
      data-slot="placeholder"
      className={cn(
        'bg-background flex size-full flex-col items-center justify-center gap-3 px-6 py-16 text-center',
        className
      )}
      {...props}
    >
      {icon}
      <div className="flex flex-col gap-1">
        <p className="text-foreground text-lg font-medium">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  );
}

export { Placeholder };
