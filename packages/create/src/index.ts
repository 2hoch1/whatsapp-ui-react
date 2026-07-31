#!/usr/bin/env node

/**
 * Thin wrapper around the shadcn CLI that points it at the whatsapp-ui registry, so users can
 * run `npx whatsapp-ui-create add chat` instead of pasting a registry URL.
 */

const REGISTRY_URL = process.env.WHATSAPP_UI_REGISTRY ?? 'https://whatsapp-ui.dev/r';

function registryItemUrl(name: string): string {
  return name.startsWith('http') ? name : `${REGISTRY_URL}/${name}.json`;
}

export { REGISTRY_URL, registryItemUrl };
