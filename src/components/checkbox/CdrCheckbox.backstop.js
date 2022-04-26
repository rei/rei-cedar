module.exports = [
  {
    url: 'http://localhost:3000/#/checkboxes',
    label: 'Checkbox responsive',
    responsive: true,
    selectors: [
      'document',
      '[data-backstop="checkbox-responsive"]',
    ],
  },
  // TODO: need method for focus/hovering one element but snapshotting it's parent
  {
    url: 'http://localhost:3000/#/checkboxes',
    label: 'Checkbox',
    selectors: [
      '[data-backstop="checkbox-checked"]',
    ],
    focusSelectors: [
      {
        target: '[data-backstop="checkbox-checked"] input',
        capture: '[data-backstop="checkbox-checked"]',
      },
    ],
  },
];
