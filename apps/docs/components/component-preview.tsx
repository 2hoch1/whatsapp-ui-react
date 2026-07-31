import type { ReactNode } from 'react';

import { InstallCommand } from '@/components/install-command';

export function ComponentPreview({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div className="border-fd-border bg-fd-card flex min-h-64 items-center justify-center rounded-xl border p-8">
        {children}
      </div>
      <InstallCommand name={name} />
    </div>
  );
}
