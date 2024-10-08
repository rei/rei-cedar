# REI Cedar Style Framework!
[![codecov](https://codecov.io/gh/rei/rei-cedar/branch/master/graph/badge.svg)](https://codecov.io/gh/rei/rei-cedar)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


Welcome to REI's style framework! The overall goals of this project are to provide a common scaffolding for UI elements,
and a set of themes that build on this scaffolding. We started this project in 2015 as a fork of
[Bootstrap](http://getbootstrap.com/).
The project has evolved into what it is today, and will continue to grow to fit our expanding needs. Feel free to watch
the Cedar grow and learn from what we are doing, or jump in and provide some recommendations.

## Using Cedar

See the [Cedar docs](https://cedar.rei.com) for usage instructions.

## Getting Started

### Install

Clone the project.

`npm install`

### Run

`npm run dev`

Runs locally for development. Has hot reloading, and other nice things related to development.

## Testing

### Code Tests

`npm run unit`

Runs unit tests.

`npm run watch`

Runs unit tests in watch mode. This also allows you to inspect snapshot discrepancies and regenerate the snapshots if appropriate.

`npm run e2e`

Runs [Nightwatch](http://nightwatchjs.org/) end-to-end tests and Axe a11y tests.

Tests run using Chromedriver. To upgrade Chromedriver, determine the latest version of Chrome and Puppeteer that are compatible by visiting [this](https://pptr.dev/supported-browsers) page.

`npm run test`

Runs both unit and e2e/accessibility tests.

## Publishing Prerelease Components

`npm run prerelease`

Publishes package to npm with a prerelease tag. You must increment the component's version manually prior to publishing. `--dry-run` flag will run the prerelease process without publishing to npm.

## Commits

This project is Commitizen friendly.  To install: `npm install -g commitizen`
When creating a pull request run `git cz` rather than `git commit` and follow the prompts.

This projects Changelogs are generated.
- Generate the Changelog: `npm run changelog`
