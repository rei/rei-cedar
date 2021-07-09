# REI Cedar Style Framework!
[![codecov](https://codecov.io/gh/rei/rei-cedar/branch/master/graph/badge.svg)](https://codecov.io/gh/rei/rei-cedar)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Work In Progress

This project tracks the migration of [@rei/cedar](https://github.com/rei/rei-cedar) to Vue 3. This is a work in progress and the code contained in this repo is not production ready. Please reach out to the Cedar team if you have any questions.


Welcome to REI's style framework! The overall goals of this project are to provide a common scaffolding for UI elements,
and a set of themes that build on this scaffolding. We started this project in 2015 as a fork of
[Bootstrap](http://getbootstrap.com/).
The project has evolved into what it is today, and will continue to grow to fit our expanding needs. Feel free to watch
the Cedar grow and learn from what we are doing, or jump in and provide some recommendations.

### Migration Status

Vue 2 Cedar was written in JSX because at that time it was the only way to generate a tree-shakeable vue component library. We have migrated to .vue SFC's for vue 3 and have also adopted the "composition API" which should make the Cedar bundle significantly smaller as it will no longer need to import all of Vue. All of the "view-model" logic for a component is exported as part of it's `setup()` function. There are definitely opportunities to DRY up this code by extracting common computed property logic or to simply better organize the contents of the setup functions. Helper functions could be moved into `/utils` or simply a `.js` file in the component directory and imported rather than defined in the setup function itself. The Vue mastery courses around vue 3, particularly the one by Evan You are the best resource I have found for understanding the composition API

Vue 2 private API usage: Cedar used the `vnode` API in a few places in vue 2 which simply does not work in vue 3. This is particularly problematic for CdrTabs which maintains a close parent-child relationship between the CdrTabs wrapper and CdrTabPanel contents. Will need to refactor that component to use a flux architecture, with CdrTabs using provide/inject to pass data into the tab panels, and CdrTabPanel's emitting events that CdrTabs listens for.

Unit Tests: many unit tests are commented out or `xit`'d currently. In some cases, Vue/VTU have just changed such that our old method of unit testing no longer works and those tests may need to be removed or replaced (i.e, test a instance method directly rather than triggering an event on a component and validating that the component updates based on what the instance method does)

Build: The dev/test/prod builds should all work. However there are still breaking bugs in the vue ecosystem that prevent tree-shaking from working which will be the biggest blocker for release. It may be possible to bypass the tree shaking issues by having consumers import Cedar components directly rather than from the index entry point, for example

```
import { CdrButton, CdrLink } from '@rei/cedar'; // imports from entry point, if tree-shaking is broken this imports ALL of cedar

import CdrButton from '@rei/cedar/dist/components/CdrButton.vue'; // Importing components individually would allow febs/webpack to tree-shake Cedar
import CdrLink from '@rei/cedar/dist/components/CdrLink.vue'; // Might be possible to make a webpack alias in FEBS that would automagically do this so consumers could maintain the old import syntax.
```

Visual Regression: It should be possible to generate backstop reference images in the vue 2 Cedar repo and then copy them into `/backstop_data` in this repo to validate that components are rendering the same.

## Using Cedar

See the [Cedar docs](https://rei.github.io/rei-cedar-docs/) for usage instructions.

## Getting Started

### Install

Clone the project.

`npm install`

### Run

`npm run dev`

Runs locally for development. Has hot reloading, and other nice things related to development.

Sometimes the liveReload server will hang in the background, do the following...

Works on MacOS:

`kill -9 $(lsof -ti tcp:35729)`

## Testing

### Code Tests

`npm run unit`

Runs unit tests.

`npm run e2e`

Runs [Nightwatch](http://nightwatchjs.org/) end-to-end tests and Axe a11y tests.

`npm run test`

Runs both unit and e2e/accesibility tests.

### Visual Regression Testing

Check [backstop](https://github.com/garris/BackstopJS) for general configuration questions.

Our visual regressions audits can be performed against all patterns documented within the project's component proving grounds. To do so, follow the steps below:

1. Run the project locally with `npm run dev`
2. `npm run reference` will create a base set of images providing coverage for all defined patterns. Ensure this is run against a clean build prior to any edits.
3. `npm run compare` after making changes to the markup or css. This will create another set of test images and compare them against those generated in the previous step.
4. Review the generated report that should open in your browser. Make sure all changes are what you expect.
5. `npm run approve` if everything looks good. This will promote the latest test images to be the new reference images that future tests will be compared against.

If you want to do backstop tests against a single scenario you can do `npm run compare -- --filter=<Label>`

The config (`backstop.js`) looks through `src/` for all __*.backstop.js__ and generates a proper backstop scenario object for each.

__*.backstop.js__ files will export an array of objects that are standard backstop scenario objects and support all the same options noted in the docs with the following exceptions:

- `responsive`: Boolean, configures whether or not the scenario runs against all 4 breakpoints. If not present or false it will only run against the largest breakpoint. Note that running responsive tests against specific selectors can often lead to incorrect screenshots, and it is better to set up a separate responsive scenario that targets the entire document, for example: `{ url: 'http://localhost:3000/#/EXAMPLE', label: 'EXAMPLE', responsive: true }`
- `focusSelectors`: Array, list of selectors that will have `focus` applied before screenshotting
- `hoverSelectors`: Array, list of selectors that will have `hover` applied before screenshotting
- `wait`: Number, if using `focusSelectors` or `hoverSelectors` this will insert a delay in milliseconds between the element interaction and the screenshot


## Publishing Prerelease Components

`npm run prerelease`

Publishes package to npm with a prerelease tag. You must increment the component's version manually prior to publishing. `--dry-run` flag will run the prerelease process without publishing to npm.

## Commits

This project is Commitizen friendly.  To install: `npm install -g commitizen`
When creating a pull request run `git cz` rather than `git commit` and follow the prompts.

This projects Changelogs are generated.
- Generate the Changelog: `npm run changelog`
