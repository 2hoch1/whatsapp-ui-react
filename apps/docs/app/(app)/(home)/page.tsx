import Link from 'next/link';

const installCommand = 'npx shadcn@latest add https://whatsapp-ui.dev/r/chat.json';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">whatsapp-ui-react</h1>
      <p className="text-fd-muted-foreground max-w-xl text-lg">
        Chat components with a WhatsApp Web-inspired look. Install them as an npm package, or copy
        the source into your project with the shadcn CLI.
      </p>
      <code className="bg-fd-muted rounded-lg px-4 py-2 font-mono text-sm">{installCommand}</code>
      <div className="flex gap-3">
        <Link
          href="/docs"
          className="bg-fd-primary text-fd-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium"
        >
          Documentation
        </Link>
        <Link
          href="/docs/components"
          className="border-fd-border rounded-lg border px-5 py-2.5 text-sm font-medium"
        >
          Components
        </Link>
      </div>
    </main>
  );
}
