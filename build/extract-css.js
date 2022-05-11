const sass = require('node-sass');
const tildeImporter = require('node-sass-package-importer');
const fs = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const postcss = require('postcss');
const atImport = require("postcss-import")
const postcssrc = require('postcss-load-config');
const postcssModules = require('postcss-modules');
const _ = require('lodash');
const packageJson = require('../package.json')

const components = glob.sync('./src/components/**/styles/*.scss')
  .map((path) => {
    const componentName = path.split('/styles/')[1];
    const filename = _.kebabCase(componentName).replace('-module-scss', '.css');
    return {
      srcPath: path,
      outPath: `./dist/style/${filename}`,
      scopeClasses: true,
    }
  }
);

components.forEach(buildCss);
const compiledOutFile = [{outPath: './public/reset.css'}]
  .concat(components)
  .map(createCompiledImport)
  .join('\n');

const outFile = [{outPath: './public/reset.css'}]
  .concat(components)
  .map(createImport)
  .join('\n');

fs.outputFile('./dist/style/cedar-full.css', outFile, function(err) {
  if (!err) {
    console.log(chalk.green(`success! created cedar-full.css`));
  }
});

postcss()
  .use(atImport())
  .process(compiledOutFile, {
    from: undefined,
  })
  .then((result) => {
    fs.outputFile('./dist/cedar-compiled.css', result.css, function(err) {
      if (!err) {
        console.log(chalk.green(`success! created cedar-compiled.css`));
      }
    });
  });

function createImport(data) {
  return `@import url('${data.outPath.replace('.', '@rei/cedar')}');`
}

function createCompiledImport(data) {
  return `@import url('${data.outPath}');`
}

function buildCss({ srcPath, outPath, scopeClasses }) {
  sass.render({
    file: srcPath,
    outputStyle: 'compressed',
    importer: tildeImporter(),
  }, function(err, result) {
    if (err) {
      console.log(chalk.red('error!', err));
    } else {
      postcssrc().then(({ plugins, options }) => {
        if (scopeClasses) {
          plugins.push(postcssModules({
            generateScopedName: function (name) {
              // scope classes for components
              return `${name}_${packageJson.version.replace(/\./g, '-')}`;
            },
            getJSON: function noop() {}
            // Passing a noop as getJSON makes it so postcss-modules does not output a JSON
            // representation of the transformed class names into the source folder.
            // This JSON data gets handled by the JS build and is not needed here.
          }))
        }
        options.from = srcPath; // enables source maps, browserlist, etc.
        postcss(plugins)
        .process(result.css, options)
        .then((result) => {
          fs.outputFile(outPath, result.css, function(err) {
            if (!err) {
              console.log(chalk.green(`success! created ${outPath}`));
            }
          });
        });
      });
    }
  });

  return outPath;
}
