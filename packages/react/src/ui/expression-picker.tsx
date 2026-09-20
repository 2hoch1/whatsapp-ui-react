import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/components/popover';
import { ScrollArea } from '@/ui/components/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';

export interface StickerItem {
  id: string;
  src: string;
  alt?: string;
}

/** Shared by every grid so the popover can close itself after a pick. */
interface ExpressionPickerContextValue {
  query: string;
  setQuery: (query: string) => void;
}

const ExpressionPickerContext = React.createContext<ExpressionPickerContextValue>({
  query: '',
  setQuery: () => {},
});

export interface ExpressionPickerProps {
  children: React.ReactNode;
}

/** Root of the emoji / sticker / GIF picker. Compose the parts inside it. */
function ExpressionPicker({ children }: ExpressionPickerProps) {
  const [query, setQuery] = React.useState('');
  const value = React.useMemo(() => ({ query, setQuery }), [query]);

  return (
    <ExpressionPickerContext.Provider value={value}>
      <Popover>{children}</Popover>
    </ExpressionPickerContext.Provider>
  );
}

/**
 * Opens the picker. Pass your own control through `render` rather than as a child: Base UI's
 * trigger renders a `<button>`, so nesting a button inside it produces invalid HTML.
 */
function ExpressionPickerTrigger(props: React.ComponentProps<typeof PopoverTrigger>) {
  return <PopoverTrigger data-slot="expression-picker-trigger" {...props} />;
}

export interface ExpressionPickerTabsProps extends React.ComponentProps<typeof Tabs> {
  children: React.ReactNode;
}

/** Popover body holding the emoji / sticker / GIF tabs. */
function ExpressionPickerTabs({
  defaultValue = 'emoji',
  className,
  children,
  ...props
}: ExpressionPickerTabsProps) {
  return (
    <PopoverContent
      data-slot="expression-picker"
      className={cn('w-88 max-w-[90vw] p-0', className)}
    >
      {/* The column direction is set here rather than inherited: the Tabs root only switches to
          a column via a `data-horizontal` attribute, which is not always emitted. */}
      <Tabs defaultValue={defaultValue} className="flex w-full flex-col gap-0" {...props}>
        <TabsList className="w-full shrink-0 rounded-none">
          <TabsTrigger value="emoji">Emoji</TabsTrigger>
          <TabsTrigger value="sticker">Stickers</TabsTrigger>
          <TabsTrigger value="gif">GIFs</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </PopoverContent>
  );
}

function ExpressionPickerSearch({ placeholder = 'Search' }: { placeholder?: string }) {
  const { query, setQuery } = React.useContext(ExpressionPickerContext);

  return (
    <div className="p-2">
      <Input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}

export interface ExpressionPickerEmojiGridProps {
  emojis: readonly string[];
  onSelect?: (emoji: string) => void;
}

function ExpressionPickerEmojiGrid({ emojis, onSelect }: ExpressionPickerEmojiGridProps) {
  return (
    <TabsContent value="emoji">
      <ScrollArea className="h-64 w-full">
        <div className="grid grid-cols-8 gap-1 p-2">
          {emojis.map(emoji => (
            <button
              key={emoji}
              type="button"
              aria-label={emoji}
              onClick={() => onSelect?.(emoji)}
              className="hover:bg-accent flex size-9 items-center justify-center rounded-md text-xl"
            >
              {emoji}
            </button>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}

export interface ExpressionPickerStickerGridProps {
  stickers: StickerItem[];
  onSelect?: (sticker: StickerItem) => void;
}

function ExpressionPickerStickerGrid({ stickers, onSelect }: ExpressionPickerStickerGridProps) {
  return (
    <TabsContent value="sticker">
      <ScrollArea className="h-64 w-full">
        <div className="grid grid-cols-4 gap-2 p-2">
          {stickers.map(sticker => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => onSelect?.(sticker)}
              className="hover:bg-accent rounded-md p-1"
            >
              <img src={sticker.src} alt={sticker.alt ?? ''} className="size-full object-contain" />
            </button>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}

export interface ExpressionPickerGifGridProps {
  gifs: StickerItem[];
  onSelect?: (gif: StickerItem) => void;
}

function ExpressionPickerGifGrid({ gifs, onSelect }: ExpressionPickerGifGridProps) {
  return (
    <TabsContent value="gif">
      <ScrollArea className="h-64 w-full">
        <div className="grid grid-cols-2 gap-2 p-2">
          {gifs.map(gif => (
            <button
              key={gif.id}
              type="button"
              onClick={() => onSelect?.(gif)}
              className="hover:bg-accent overflow-hidden rounded-md"
            >
              <img src={gif.src} alt={gif.alt ?? ''} className="w-full object-cover" />
            </button>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}

export interface ExpressionPickerRecentSectionProps {
  emojis: readonly string[];
  onSelect?: (emoji: string) => void;
  label?: string;
}

function ExpressionPickerRecentSection({
  emojis,
  onSelect,
  label = 'Recently used',
}: ExpressionPickerRecentSectionProps) {
  if (emojis.length === 0) return null;

  return (
    <div className="border-border border-b p-2">
      <p className="text-muted-foreground mb-1 text-xs font-medium">{label}</p>
      <div className="flex flex-wrap gap-1">
        {emojis.map(emoji => (
          <button
            key={emoji}
            type="button"
            aria-label={emoji}
            onClick={() => onSelect?.(emoji)}
            className="hover:bg-accent flex size-9 items-center justify-center rounded-md text-xl"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export {
  ExpressionPicker,
  ExpressionPickerTrigger,
  ExpressionPickerTabs,
  ExpressionPickerSearch,
  ExpressionPickerEmojiGrid,
  ExpressionPickerStickerGrid,
  ExpressionPickerGifGrid,
  ExpressionPickerRecentSection,
};
