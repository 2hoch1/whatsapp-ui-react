import * as React from 'react';

import { AudioFileIcon } from '@/icons';
import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface DocumentMessageProps extends React.ComponentProps<'div'> {
  fileName: string;
  /** Human-readable size, e.g. `'1.2 MB'`. */
  fileSize?: string;
  /** Extension badge, e.g. `'PDF'`. Derived from `fileName` when omitted. */
  fileType?: string;
  /** When set, the card becomes a download link. */
  href?: string;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot > -1 ? fileName.slice(dot + 1).toUpperCase() : 'FILE';
}

function DocumentMessage({
  fileName,
  fileSize,
  fileType,
  href,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: DocumentMessageProps) {
  const extension = fileType ?? extensionOf(fileName);

  return (
    <Bubble
      data-slot="document-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        <a
          href={href}
          download={href ? fileName : undefined}
          className="bg-accent/50 flex w-64 max-w-full items-center gap-3 rounded-lg p-2"
        >
          <span
            aria-hidden="true"
            className="bg-background flex size-10 shrink-0 items-center justify-center rounded-lg"
          >
            <AudioFileIcon title={fileName} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{fileName}</span>
            <span className="text-muted-foreground text-xs">
              {[extension, fileSize].filter(Boolean).join(' · ')}
            </span>
          </span>
        </a>
        {(time !== undefined || status !== undefined) && (
          <MessageMeta
            time={time}
            status={status}
            direction={direction}
            className="text-muted-foreground mt-0.5 justify-end"
          />
        )}
      </BubbleContent>
    </Bubble>
  );
}

export { DocumentMessage };
