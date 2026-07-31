'use client';

import { useState } from 'react';

/**
 * Registry items are served as static JSON from `public/r`, so the install URL is
 * just the deployed origin. Falls back to the current origin in the browser.
 */
function registryUrl(name: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  return `npx shadcn@latest add ${base}/r/${name}.json`;
}

export function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const command = registryUrl(name);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border-fd-border bg-fd-secondary flex items-center gap-2 rounded-lg border px-3 py-2">
      <code className="flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="text-fd-muted-foreground hover:text-fd-foreground shrink-0 text-xs font-medium"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
