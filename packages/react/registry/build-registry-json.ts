import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { registryItems } from './index';

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'whatsapp-ui',
  homepage: 'https://github.com/2hoch1/whatsapp-ui-react',
  items: registryItems,
};

const target = fileURLToPath(new URL('../registry.json', import.meta.url));

await writeFile(target, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

console.log(`registry.json written with ${registryItems.length} items`);
