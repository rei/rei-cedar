function runA11yTests(browser, path, target) {

  const devServer = `${browser.globals.devServerURL}${path}`;

  browser
    .url(devServer)
    .waitForElementVisible(target, 60000)
    .axeInject()
    .axeRun(target, {
      reporter: 'v2',
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag22a', 'wcag22aa', 'best-practice'],
      },
      rules: {
        'aria-allowed-attr': { enabled: false },
        'aria-valid-attr-value': { enabled: false },
      }
    })
    .end();
}

module.exports = {
  '@tags': ['accessibility'],
  'Page Is Accessible: Primary Palette, Part 1':function (browser) {
    runA11yTests(browser, 'e2e-1?palette=primary', '#kitchen-sink-1');
  },
  'Page Is Accessible: Primary Palette, Part 2':function (browser) {
    runA11yTests(browser, 'e2e-2?palette=primary', '#kitchen-sink-2');
  },
  'Page Is Accessible: Secondary Palette, Part 1': function (browser) {
    runA11yTests(browser, 'e2e-1?palette=secondary', '#kitchen-sink-1')
  },
  'Page Is Accessible: Secondary Palette, Part 2': function (browser) {
    runA11yTests(browser, 'e2e-2?palette=secondary', '#kitchen-sink-2')
  },
};
