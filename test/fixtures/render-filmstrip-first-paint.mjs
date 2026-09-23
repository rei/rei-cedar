import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';

process.env.npm_package_version = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
).version;

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { FilmstripFixture, ResponsiveFilmstripFixture } = await vite.ssrLoadModule(
    '/test/fixtures/filmstrip-first-paint.ts',
  );
  const fixture = process.argv.includes('responsive')
    ? ResponsiveFilmstripFixture
    : FilmstripFixture;
  process.stdout.write(await renderToString(createSSRApp(fixture)));
} finally {
  await vite.close();
}
