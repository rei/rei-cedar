module.exports = [
  {
    url: 'http://localhost:3000/#/radios',
    label: 'Radio responsive',
    responsive: true,
    selectors: [
      'document',
      '[data-backstop="radio-responsive"]',
    ],
  },
  {
    url: 'http://localhost:3000/#/radios',
    label: 'Radio',
    selectors: [
      '[data-backstop="radio-focus"]',
    ],
    focusSelectors: [
      {
        target: '[data-backstop="radio-focus"] input',
        capture: '[data-backstop="radio-focus"]',
      },
    ],
  },
];
