import { type Plugin } from 'vite';
import path from 'node:path';

/**
 * Converts a string to kebab case.
 * @param {*} str
 */
function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}


/**
 * Setting `cssCodeSplit = true` enables chunked
 * CSS generated from each [cdr-component].module.scss.
 * By default, Vite will output a name that resembles this:
 * "CdrChip.module.scss_used_vue_type_style_index_0_src_true_lang.module.css"
 *
 * This Vite plugin uses the Rollup hook "generateBundle" to
 * normalize this output to simply:
 * cdr-chip.css
 */
export default async function cssNameNormalizer(): Promise<Plugin> {
  return {
    name: 'css-name-normalizer',
    apply(config, { command }) {
      // apply only on build but not for SSR
      return command === 'build' && !config.build.ssr;
    },
    enforce: 'post',
    async generateBundle(obj, bundle) {
      Object.keys(bundle)
        .filter((key) => {
          const { ext } = path.parse(key);
          return ext === '.css';
        })
        .forEach((key) => {
          const entry = bundle[key];
          const filePath = kebabCase(key.split('.').shift());
          const fileName = filePath.split('/').pop();
          entry.fileName = `style/${fileName}.css`;
        });
    },
  };
}