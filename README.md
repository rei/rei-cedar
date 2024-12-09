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

`npm run test:playwright`

Runs [Playwright](https://playwright.dev) end-to-end tests and Axe a11y tests.

`npm run test`

Runs both unit and e2e/accessibility tests.

## Publishing Prerelease Components

`npm run prerelease`

Publishes package to npm with a prerelease tag. You must increment the component's version manually prior to publishing. `--dry-run` flag will run the prerelease process without publishing to npm.

## Commits

This project is Commitizen friendly. To install: `npm install -g commitizen`
When creating a pull request run `git cz` rather than `git commit` and follow the prompts.

This projects Changelogs are generated.

- Generate the Changelog: `npm run changelog`

## Developer demo

The main documentation site for Cedar is our separate [Cedar docs](https://cedar.rei.com) website. With that in mind, we also have a playground for developing components and sharing ideas with others and within our team. The Cedar team produces this *developer demo* through GitHub Pages that can be accessed at [https://rei.github.io/rei-cedar/](https://rei.github.io/rei-cedar/), but we do not guarantee it will always be up to date or be an accurate representation of the Cedar library.
