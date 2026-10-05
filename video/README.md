# Cedar — Color with intent

A 3:05 narrated Remotion introduction for new Cedar users, 1920 × 1080 at 30 fps,
with Zelda's voice through Higgsfield's ElevenLabs engine.
The story follows the supplied Michelle Lam / Michael Hewson transcript and
slide summaries: repeated decisions create friction; semantic, unified, and
dynamic capabilities connect the system; two components make the method
concrete; the Semantic Token Migration skill supports adoption.

## Watch and iterate

```sh
cd video
npm install --package-lock=false
npm run dev
npm run render    # out/cedar-semantic-tokens-v2.mp4
npm run review    # 25 chapter-relative review frames in out/review-v2/
npm run still
npm run typecheck
```

Composition: `CedarSemanticTokens`. Generated data, narration, renders, and
proprietary fonts are ignored. The existing lockfile deletion is preserved.

## Narrative

1. Meaning remains: design decisions should travel with their purpose.
2. Friction: conversations alone make teams decide and translate again.
3. Semantic framework, unified system, dynamic variables.
4. The new semantic layer between primitives and components.
5. All palettes as raw material, with a brief OKLCH introduction.
6. Colors scoped by purpose: text, surfaces, graphics.
7. Action, Control, Selection, Feedback, Universal, Graphics.
8. Five naming questions: foundation, family, role, identity, expression.
9. One component's surface, border, text, and icon separate and reassemble.
10. Button: intent → mapping → contract → generated styling → states.
11. Accordion: intent → parts → contract → opening and closing.
12. Variables preserve purpose while values adapt across modes/platforms.
13. Releasing the Semantic Token Migration skill to guide migration.
14. Less translation, more shared understanding.

The footer notes teach the scene's main takeaway. Dense hex catalogs, palette
gap diagnostics, and checkout approval instructions stay out of the film.
Release dates and productivity estimates from the source deck are omitted.

## Narration and synchronization

`src/film/story.json` contains chapter text and spoken beats.
The final narrator is Zelda, generated through the Higgsfield MCP with the
ElevenLabs `text2speech_v2` engine. Recordings and generation IDs are preserved
in `public/audio/elevenlabs/manifest.json`. A local Samantha scratch track is
available only through `npm run audio:scratch` for timing experiments.

The audio builder measures each clip and quantizes its start/end to 30 fps in
`src/data/narration-timing.json`. `timing.ts` derives chapter lengths and visual
cues from those measured values. Speech starts after the incoming wipe and
finishes before the outgoing wipe. Longer recordings expand a chapter instead
of cutting words or accelerating the voice. No instrumental score is mixed
into the narrated revision.

The render command finishes with `scripts/finalize-narration.mjs`: it places
the original recordings at their measured frame positions, copies the picture
unchanged, and encodes the final audio once. This avoids the intermediate
render's audio delay. Exported audio is compared against all fourteen source
takes to verify synchronization.

Key cues drive family highlights, naming tiers, role separation, component
contracts, state demos, the variable illustration, and migration steps.
Higgsfield-generated ElevenLabs recordings are imported from
`public/audio/elevenlabs/manifest.json` by `scripts/import-narration.mjs`.
Each chapter entry provides its `id`, source `file`, voice, and a `cues` array
of measured recording-relative phrase starts. Full chapter recordings preserve
natural delivery; visual beats use those phrase markers. The importer validates
all markers against measured audio duration and normalizes volume.
Word timestamps were measured with Whisper and checked against the script.
The Button's hover, focus, and pressed transitions follow those spoken words.
Accordion and closing narration share one source take, split in the silence
between their sentences. The alignment report is saved beside the manifest.
`npm run audio` prefers these recordings when the manifest is present.
`npm run audio:scratch` explicitly recreates the local reference track.
Changing the narrator requires measuring its replacement phrase cues before
rendering.

## Source fidelity

- All primitive palette colors come from `web-tokens.json` in this folder.
- Semantic names and colors come from
  `../.agents/skills/semantic-token-migration/references/semantic-colors.json`.
  Exact matching filters the primitive ribbons; every semantic name used by a
  preview is validated against the list.
- There are six categories and four interaction families. Universal omits the
  interaction segment; Graphics uses the `graphic` namespace. The film's
  naming example uses an actual Action token.
- Button and Accordion previews reconstruct the checked-in contracts. Color
  assignments remain driven by those contracts. Code panels are condensed
  excerpts, not full migration implementations. No component files are changed.
- The variable/cart modes are conceptual illustrations of adaptable values,
  not an assertion that these particular dark-mode values have shipped.
- The skill scene describes the method in
  `../.agents/skills/semantic-token-migration/SKILL.md`. It does not claim a
  real Storybook or Playwright migration was run for this film.

## Editing

- `src/film/story.json`: narration and chapter intent.
- `src/film/timing.ts`: measured chapter boundaries and narration cues.
- `src/film/NarrativeScenes.tsx`: friction, capabilities, architecture, modes.
- `src/film/FoundationScenes.tsx`: palettes, taxonomy, grammar, roles, closing.
- `src/film/ComponentScenes.tsx`: Button, Accordion, migration skill.
- `src/film/kit.tsx`: typography, transitions, previews, code panels.
- `src/film/data.ts`: semantic and component-contract resolution.
- `scripts/review.mjs`: chapter-relative visual QA.

## Design references

The film uses Cedar's Graphik, Stuart, and Pressura fonts, warm surfaces,
forest green, lichen accents, and topographic motion.

- [Cedar design system](https://cedar.rei.com/)
- [Cedar motion](https://cedar.rei.com/guidelines/motion)
- [Cedar Button](https://cedar.rei.com/components/button)

The original composition remains in `src/TokenFilter.tsx` and `src/scenes/`
for comparison. `out/original-palette.png` records its earlier palette scene.
The first exported cut is preserved as `out/cedar-semantic-tokens-v1.mp4`.
