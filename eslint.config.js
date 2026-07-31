import baseConfig from '@whatsapp-ui/eslint';
import reactInternalConfig from '@whatsapp-ui/eslint/react-internal';
import nextConfig from '@whatsapp-ui/eslint/next';

/**
 * lint-staged and `turbo run lint` both invoke ESLint from the repository root, where flat
 * config resolves a single file. Package-level rules therefore have to be re-applied here,
 * scoped by path, or they silently do not run.
 */
function scopeTo(configs, files) {
  return configs
    .filter(config => !(config.ignores && Object.keys(config).length === 1))
    .map(config => ({ ...config, files }));
}

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.source/**',
      '**/.turbo/**',
      'apps/docs/public/r/**',
    ],
  },
  ...baseConfig,
  ...scopeTo(reactInternalConfig, ['packages/react/**/*.{ts,tsx}']),
  ...scopeTo(nextConfig, ['apps/docs/**/*.{ts,tsx}']),
];
