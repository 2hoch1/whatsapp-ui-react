import type { ReactNode } from 'react';

import { demos } from '@/components/demos';
import { InstallCommand } from '@/components/install-command';

export interface ComponentPreviewProps {
  /** Registry item name. Looks the demo up in the registry unless `children` is given. */
  name: string;
  children?: ReactNode;
  /** Hide the install command, e.g. when several previews share one component. */
  hideCommand?: boolean;
}

export function ComponentPreview({ name, children, hideCommand }: ComponentPreviewProps) {
  const Demo = demos[name];

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div
        data-wa-color="natural"
        className="border-fd-border bg-fd-card flex min-h-64 items-center justify-center overflow-hidden rounded-xl border p-6"
      >
        {children ??
          (Demo ? (
            <Demo />
          ) : (
            <p className="text-fd-muted-foreground text-sm">No preview for “{name}”.</p>
          ))}
      </div>
      {!hideCommand && <InstallCommand name={name} />}
    </div>
  );
}
