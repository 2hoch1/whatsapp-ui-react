'use client';

import { useEffect, useState } from 'react';

/**
 * Registry items are served as static JSON from `public/r`, so the install URL is just the
 * origin. The origin is resolved after mount rather than during render, so the server and client
 * markup agree on the first pass.
 */
function useInstallCommand(name: string) {
  const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_SITE_URL ?? '');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- origin is only known client-side, must resolve after mount
    if (!process.env.NEXT_PUBLIC_SITE_URL) setOrigin(window.location.origin);
  }, []);

  return `npx shadcn@latest add ${origin}/r/${name}.json`;
}

export function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const command = useInstallCommand(name);

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
