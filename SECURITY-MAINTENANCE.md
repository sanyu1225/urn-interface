# Dependency security maintenance

Use pnpm 10.6.5 with the committed lockfile. Run `pnpm install --frozen-lockfile`,
`pnpm lint`, `pnpm build`, and `pnpm audit` when updating dependencies.

## Review on 2026-10-23

Next.js and its ESLint configuration are aligned at 15.5.28. Swiper is updated
to 12.2.0 with the React module imports migrated. Scoped overrides update Axios,
form-data, Lodash, PostCSS, ws, and uuid used by older wallet SDKs.

The audit still reports five advisories:

- `braces` (high): an indirect ESLint/build dependency; no patched release.
  Application input is not used as a glob pattern.
- `elliptic` (low): inherited from OpenBlock's legacy multi-chain SDK; no patched
  release. A wallet SDK migration is needed before this dependency can be removed.
- `stream-json` (three moderate advisories): version 1 is inherited through
  OpenBlock, Solana/Sui SDKs, and jayson. The application's browser client does not
  expose jayson's Node streaming server. The patched version 3 requires an upstream
  migration; a blind major override would risk breaking wallet SDK imports.

These findings are deferred, not fixed. Reassess them before deploying new wallet
features or accepting untrusted streaming JSON on a Node server. Build and lint
checks do not validate external wallets or blockchain transactions.
