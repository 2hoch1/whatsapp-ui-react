import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'whatsapp-ui-react',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Components',
        url: '/docs/components',
        active: 'nested-url',
      },
      {
        text: 'Examples',
        url: '/examples',
        active: 'nested-url',
      },
    ],
    githubUrl: 'https://github.com/2hoch1/whatsapp-ui-react',
  };
}
