import * as React from 'react';

import { cn } from '@/lib/utils';
import { uid } from '@/lib/message';
import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/components/popover';

export interface PollDraft {
  question: string;
  options: string[];
  multiple: boolean;
}

export interface PollMenuProps {
  /** Element that opens the menu. Becomes the trigger via Base UI's `render`. */
  trigger: React.ReactElement;
  /** Called with the completed draft when the user confirms. */
  onCreate?: (poll: PollDraft) => void;
  maxOptions?: number;
  className?: string;
}

interface DraftOption {
  id: string;
  label: string;
}

function createOption(): DraftOption {
  return { id: String(uid()), label: '' };
}

/** Composer popover for building a poll before sending it. */
function PollMenu({ trigger, onCreate, maxOptions = 12, className }: PollMenuProps) {
  const [question, setQuestion] = React.useState('');
  const [options, setOptions] = React.useState<DraftOption[]>(() => [
    createOption(),
    createOption(),
  ]);

  const filledOptions = options.map(option => option.label.trim()).filter(Boolean);
  const canCreate = question.trim().length > 0 && filledOptions.length >= 2;

  function updateOption(id: string, label: string) {
    setOptions(current =>
      current.map(option => (option.id === id ? { ...option, label } : option))
    );
  }

  function submit() {
    if (!canCreate) return;
    onCreate?.({ question: question.trim(), options: filledOptions, multiple: false });
    setQuestion('');
    setOptions([createOption(), createOption()]);
  }

  return (
    <Popover>
      <PopoverTrigger data-slot="poll-menu-trigger" render={trigger} />
      <PopoverContent data-slot="poll-menu" className={cn('flex w-72 flex-col gap-3', className)}>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" htmlFor="poll-question">
            Question
          </label>
          <Input
            id="poll-question"
            value={question}
            onChange={event => setQuestion(event.target.value)}
            placeholder="Ask something"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium">Options</span>
          {options.map((option, index) => (
            <Input
              key={option.id}
              value={option.label}
              onChange={event => updateOption(option.id, event.target.value)}
              placeholder={`Option ${index + 1}`}
              aria-label={`Option ${index + 1}`}
            />
          ))}
          {options.length < maxOptions && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOptions(current => [...current, createOption()])}
            >
              Add option
            </Button>
          )}
        </div>

        <Button disabled={!canCreate} onClick={submit}>
          Create poll
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export { PollMenu };
