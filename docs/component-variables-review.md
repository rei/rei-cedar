# Component variables verification

The implementation extends migration PR #249 at
`079647d939ea290b4719781fa8ea7eecbfe57ded`.

The common exporter handles all 19 documented components. Pressable recipes use
shared generators for public mixins, CSS and demos. Compatibility hook names
are contract data; the build has no component identity checks. Component Sass
recipes keep ownership of structural styles and interaction behavior.

Output before generalization was captured from Cedar
`1b267cc3e4dba959561467b81e082eb2651d9e3c` and component variables
`af5178db682a8503db17f2961aa7e3202c54a855`. The
`build/component-variables/__tests__/fixtures/output-sha256.json` fixture records
all 39 package files, including Sass, CSS, the offline demo and documentation.
The refactor must reproduce them byte-for-byte. Intentional future output
changes require updating this fixture after review.

Validation covers legacy public mixins/hooks, all 81 examples, direct/index/
legacy-import/detached-bundle consumption, unknown modifiers, and a pressable
contract with a different component name plus a new variant and size. Browser
checks cover interaction states, responsive boundaries, hook precedence,
standalone defaults and inherited overrides in Chromium, Firefox and WebKit.

The earlier adversarial reviews found and resolved missing legacy hooks,
elevated aliases, package import issues, icon helper specificity and the
initialization that previously depended on Vue. Link retains its four public
mixins and compatibility hooks; Caption/Quote examples apply content styles to
their paragraphs. Shared Sass recipes remain necessary to preserve the output.

The package requires the migrated runtime token CSS and does not produce LESS.
Exhaustive visual comparisons cover pressable recipes; other components have
API/compilation coverage and focused browser checks.
