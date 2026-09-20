'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { fmtTime } from '@/lib/audio';
import { AttachIcon, MicFillIcon, MicOutlineIcon, SendIcon, StickerIcon } from '@/icons';
import { Button } from '@/ui/components/button';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/ui/components/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/components/popover';

interface ChatComposerContextValue {
  value: string;
  setValue: (value: string) => void;
  send: () => void;
  disabled: boolean;
}

const ChatComposerContext = React.createContext<ChatComposerContextValue>({
  value: '',
  setValue: () => {},
  send: () => {},
  disabled: false,
});

function useChatComposer(): ChatComposerContextValue {
  return React.useContext(ChatComposerContext);
}

export interface ChatComposerProps extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed message when the user sends. */
  onSend?: (message: string) => void;
  /** Blocks input, e.g. for a read-only or archived conversation. */
  disabled?: boolean;
}

/**
 * Composer root. Holds the draft value and exposes it to the parts through context, so the
 * buttons can be rearranged or replaced without prop drilling.
 */
function ChatComposer({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  onSend,
  disabled = false,
  className,
  children,
  ...props
}: ChatComposerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const send = React.useCallback(() => {
    const message = value.trim();
    if (!message || disabled) return;
    onSend?.(message);
    setValue('');
  }, [value, disabled, onSend, setValue]);

  const context = React.useMemo(
    () => ({ value, setValue, send, disabled }),
    [value, setValue, send, disabled]
  );

  return (
    <ChatComposerContext.Provider value={context}>
      <div data-slot="chat-composer" className={cn('flex items-end gap-2', className)} {...props}>
        {children}
      </div>
    </ChatComposerContext.Provider>
  );
}

/** Paperclip button. Wrap it in `ChatComposerAttachmentMenu` to attach a menu. */
function ChatComposerAttachmentButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { disabled } = useChatComposer();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Attach"
      disabled={disabled}
      data-slot="chat-composer-attachment-button"
      className={className}
      {...props}
    >
      {children ?? <AttachIcon className="size-6" />}
    </Button>
  );
}

export interface ChatComposerAttachmentMenuProps {
  /** Element that opens the menu. Becomes the trigger via Base UI's `render`. */
  trigger: React.ReactElement;
  /** Menu contents shown when the trigger is pressed. */
  items: React.ReactNode;
}

function ChatComposerAttachmentMenu({ trigger, items }: ChatComposerAttachmentMenuProps) {
  return (
    <Popover>
      <PopoverTrigger data-slot="chat-composer-attachment-menu-trigger" render={trigger} />
      <PopoverContent data-slot="chat-composer-attachment-menu" className="w-56 p-1">
        {items}
      </PopoverContent>
    </Popover>
  );
}

export interface ChatComposerTextInputProps extends Omit<
  React.ComponentProps<typeof InputGroupTextarea>,
  'value' | 'onChange'
> {
  /** Addons rendered inside the input frame, e.g. the expression button. */
  addonStart?: React.ReactNode;
  addonEnd?: React.ReactNode;
}

/** Auto-growing message field. Enter sends, Shift+Enter inserts a newline. */
function ChatComposerTextInput({
  placeholder = 'Type a message',
  addonStart,
  addonEnd,
  className,
  onKeyDown,
  ...props
}: ChatComposerTextInputProps) {
  const { value, setValue, send, disabled } = useChatComposer();

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }

  return (
    <InputGroup className="flex-1">
      {addonStart && <InputGroupAddon align="inline-start">{addonStart}</InputGroupAddon>}
      <InputGroupTextarea
        data-slot="chat-composer-text-input"
        rows={1}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={event => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className={cn('max-h-32 resize-none', className)}
        {...props}
      />
      {addonEnd && <InputGroupAddon align="inline-end">{addonEnd}</InputGroupAddon>}
    </InputGroup>
  );
}

/** Emoji / sticker button. Wrap with `ExpressionPicker` to open the picker. */
function ChatComposerExpressionButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { disabled } = useChatComposer();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Emoji"
      disabled={disabled}
      data-slot="chat-composer-expression-button"
      className={className}
      {...props}
    >
      {children ?? <StickerIcon className="size-6" />}
    </Button>
  );
}

export interface ChatComposerVoiceButtonProps extends React.ComponentProps<typeof Button> {
  recording?: boolean;
}

function ChatComposerVoiceButton({
  recording = false,
  className,
  children,
  ...props
}: ChatComposerVoiceButtonProps) {
  const { disabled } = useChatComposer();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={recording ? 'Stop recording' : 'Record voice message'}
      aria-pressed={recording}
      disabled={disabled}
      data-slot="chat-composer-voice-button"
      className={className}
      {...props}
    >
      {children ??
        (recording ? <MicFillIcon className="size-6" /> : <MicOutlineIcon className="size-6" />)}
    </Button>
  );
}

export interface ChatComposerVoiceRecorderProps extends React.ComponentProps<'div'> {
  /** Elapsed recording time in seconds. */
  elapsed: number;
  onCancel?: () => void;
  onConfirm?: () => void;
}

/** Replaces the text field while a voice message is being recorded. */
function ChatComposerVoiceRecorder({
  elapsed,
  onCancel,
  onConfirm,
  className,
  ...props
}: ChatComposerVoiceRecorderProps) {
  return (
    <div
      data-slot="chat-composer-voice-recorder"
      className={cn('flex flex-1 items-center gap-3 px-2', className)}
      {...props}
    >
      <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-red-500" />
      <span className="text-sm tabular-nums" role="timer">
        {fmtTime(elapsed)}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="sm" onClick={onConfirm}>
          Send
        </Button>
      </div>
    </div>
  );
}

function ChatComposerSendButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { value, send, disabled } = useChatComposer();

  return (
    <Button
      type="button"
      size="icon"
      aria-label="Send"
      disabled={disabled || value.trim().length === 0}
      onClick={send}
      data-slot="chat-composer-send-button"
      className={className}
      {...props}
    >
      {children ?? <SendIcon className="size-6" />}
    </Button>
  );
}

export {
  ChatComposer,
  ChatComposerAttachmentButton,
  ChatComposerAttachmentMenu,
  ChatComposerTextInput,
  ChatComposerExpressionButton,
  ChatComposerVoiceButton,
  ChatComposerVoiceRecorder,
  ChatComposerSendButton,
  useChatComposer,
};
