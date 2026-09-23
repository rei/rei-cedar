import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';

process.env.npm_package_version = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
).version;

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { FilmstripFixture } = await vite.ssrLoadModule('/test/fixtures/filmstrip-first-paint.ts');
  process.stdout.write(await renderToString(createSSRApp(FilmstripFixture)));
} finally {
  await vite.close();
}
