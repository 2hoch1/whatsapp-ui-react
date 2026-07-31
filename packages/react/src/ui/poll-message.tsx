import * as React from 'react';

import { Bubble, BubbleContent } from '@/ui/components/bubble';
import { Progress, ProgressIndicator, ProgressTrack } from '@/ui/components/progress';
import { MessageMeta, alignFor, type MessageDirection, type MessageStatus } from '@/ui/message';

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollMessageProps extends React.ComponentProps<'div'> {
  question: string;
  options: PollOption[];
  /** Ids the current user voted for. */
  selected?: string[];
  multiple?: boolean;
  onVote?: (optionId: string) => void;
  direction?: MessageDirection;
  time?: string;
  status?: MessageStatus;
}

function PollMessage({
  question,
  options,
  selected = [],
  multiple = false,
  onVote,
  direction = 'in',
  time,
  status,
  className,
  ...props
}: PollMessageProps) {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Bubble
      data-slot="poll-message"
      align={alignFor(direction)}
      variant={direction === 'out' ? 'default' : 'secondary'}
      className={className}
      {...props}
    >
      <BubbleContent>
        <div className="flex w-64 max-w-full flex-col gap-2">
          <div>
            <p className="text-sm font-medium wrap-break-word">{question}</p>
            <p className="text-muted-foreground text-xs">
              {multiple ? 'Select one or more' : 'Select one'}
            </p>
          </div>

          {options.map(option => {
            const share = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isSelected = selected.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onVote?.(option.id)}
                aria-pressed={isSelected}
                className="flex flex-col gap-1 text-left"
              >
                <span className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate">{option.label}</span>
                  <span className="text-muted-foreground tabular-nums">{option.votes}</span>
                </span>
                <Progress value={share}>
                  <ProgressTrack className="h-1.5">
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress>
              </button>
            );
          })}

          <p className="text-muted-foreground text-xs">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </p>
        </div>
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

export { PollMessage };
