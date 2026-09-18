# Data Display implementation

Baseline: main `f62c0a8f267b8971394775416d18cc9542bff81e`, clean worktree.
Reference: daisyUI 5.7.40, commit `156c57412e49fe3e77884d16b1c453b8fb52db25`.
Compare coverage/composition, not compatibility. New styles are original DuskMoon
implementations; no upstream source is copied.

- [x] Inspect current source, exports, build, docs and tests.
- [x] A: Accordion, Collapse, Avatar contracts and existing Badge, Card, Chat,
  List, Table, Timeline audit/regressions.
- [x] B: Stat, existing Indicator composition (replaces redundant Status), Kbd, Carousel source, exports and docs.
- [x] C: Countdown and Diff source, controllers and docs.
- [x] D: Aura, Hover 3D, Hover Gallery, Text Rotate opt-in effects.
- [x] Packed package CSS/ESM/declarations, SSR and default exclusion checks.
- [ ] Unit/build/typecheck/docs, browser, visual and accessibility verification.

## Decisions

Native `details[open]` is the only native disclosure state. Controlled Collapse
uses `collapse-closed` before `collapse-open`/`show`; Accordion retains `open`
and accepts `accordion-item-open`. Hidden/inert and ARIA are controller-owned.
Avatar canonical status classes are the documented `avatar-status-*`, with
`avatar-online`/`avatar-offline` retained. Effects live in `src/effects`, never in
the component aggregate. CSS is authoritative; the plugin remains token-only.

## Baseline validation

Initial `cd packages/core && bun test tests/unit`: 2049 pass, 4 fail (two missing
component artifact checks and two standalone temporary-module import failures).
After build the component checks pass. Bun 1.4.0 cannot dynamically import the
standalone test's newly generated temporary module; its two failures persist.
Separate packed-package Node execution verifies the actual standalone plugin.
No failing baseline test is treated as acceptance.

Historical Actions guidance is checked against current source/tests rather than
assumed from previous reports.

## Completed coverage

All rows include source CSS, shipped CSS/ESM/declaration paths, docs and regression
coverage. Completion here describes implementation, not a claim that every
repository-wide verification gate is green.

| Component | Canonical API | Preserved aliases / coverage |
| --- | --- | --- |
| Accordion | accordion / accordion-item / accordion-header / accordion-content; open | accordion-item-open; native open, controlled hidden/inert, groups, nesting |
| Avatar | avatar / avatar-placeholder / avatar-status-* | avatar-online/offline; image masking, rings, groups and Indicator composition |
| Badge | badge / badge-outlined / badge-soft | badge-outline, outlined-secondary/tertiary; filled/md/notification/removable; long labels |
| Card | card / card-body / card-title | outlined, filled, five elevation modifiers, subtitle, comfortable; Stat composition; no new default tilt |
| Carousel | carousel / carousel-item | horizontal/vertical, start/center/end; native scroll and optional navigation controller |
| Chat bubble | chat / chat-bubble / chat-bubble-content | transcript, scroll indicators and timeline IDs preserved; long links/code |
| Collapse | collapse / collapse-trigger / collapse-content | collapse-open/closed, show; fade/slide/horizontal/fixed/maxheight precedence |
| Countdown | countdown / countdown-value | sm/lg/transition/animated; controller restarts countdown-tick on changed DOM values; reduced-motion fallback |
| Diff | diff / diff-before / diff-after / diff-label | diff-static; range controller, endpoints, RTL and both-side print |
| Kbd | kbd | xs/sm/lg/ghost; semantic colors; Markdown styling preserved independently |
| List | list / list-item / list-item-content / title/subtitle/action | text/secondary, leading/trailing, multiline/interactive/active/surface/nested aliases |
| Stat | stats / stat / title/value/desc/figure/actions | horizontal/vertical/responsive, seven semantic colors; Card composition |
| Indicator (replaces Status) | indicator / indicator-item | Existing positioning primitive with Badge labels; redundant Status API removed |
| Table | table / table-responsive | striped/zebra, selected/table-row-selected, cell composition aliases; hover selection preserved |
| Timeline | timeline / timeline-item / timeline-marker / timeline-content | right/horizontal/alternate, marker colors, active/pending/compact/content-card; RTL narrow layouts |
| Aura | aura | aura-animated opt-in; static/reduced-motion/print, non-intercepting decoration |
| Hover 3D | hover-3d | optional angle variables; no overlay; nested controls, no-hover/reduced-motion/print fallback |
| Hover Gallery | hover-gallery / stage/controls | initial image; deliberate keyboard/touch/click controller; selected/focus state |
| Text Rotate | text-rotate | animated/paused; exactly three phrases, stable accessible copy, reduced-motion/print fallback |

### Additional compatibility classes

- Avatar: avatar-image, avatar-icon, avatar-circle, avatar-bordered,
  avatar-clickable, avatar-group-dense, avatar-overflow, avatar-group-xs/xl.
- Accordion: accordion-outlined, accordion-comfortable, accordion-secondary/
  tertiary, accordion-header-icon/leading, accordion-item-disabled,
  accordion-no-animation. Disabled styling is not automatic event suppression.
- Card: card-lowest/low/default/high/highest, card-filled, card-outlined,
  card-subtitle, card-comfortable; existing card-bordered remains unchanged.
- List: list-item-text/secondary/two-line/three-line/interactive/leading/trailing,
  list-item-active-primary/secondary/tertiary, list-comfortable,
  list-surface-container/low/high, list-nested. Native controls remain required.
- Table: table-checkbox, table-sort-icon, table-numeric (logical inline-end),
  table-center, table-actions. Existing physical pin-left/right APIs are retained.
- Timeline: timeline-marker-secondary/tertiary/success/error,
  timeline-item-active/pending, timeline-compact, timeline-content-card.

## Imports and controllers

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";
/* Alternative default complete standalone CSS (includes CSS Art): */
/* @import "@duskmoon-dev/core/standalone.css"; */
/* Individual component example: */
/* @import "@duskmoon-dev/core/components/stat.css"; */
/* Explicitly opt-in, never included above: */
@import "@duskmoon-dev/core/effects.css";
/* Or only one: @import "@duskmoon-dev/core/effects/aura.css"; */
```

Constructable stylesheet modules: `@duskmoon-dev/core/components/{name}`,
`@duskmoon-dev/core/effects/{name}`, and `@duskmoon-dev/core/effects` (CSS text,
nullable stylesheet, declarations; no controller). Individual `style` conditions
also resolve CSS. Tailwind `/plugin` stays token/tool-only; import component CSS.
Do not import both aggregate and individual CSS for the same component.

Controllers own controlled disclosure ARIA/hidden/inert/focus/exclusivity,
Carousel navigation buttons, Countdown deadline/format/update/expiry, Diff range
binding, Gallery selection/pressed state, and Text Rotate pause button state.
The docs' DataDisplayDemo is a consumer example, not a core runtime.

## Upstream comparison and compatibility

Inspected current upstream documentation and sources at the recorded commit.
Accordion shares upstream collapse.css; hover3d.css, hovergallery.css and
textrotate.css are upstream filenames, not the hyphenated public names.
DuskMoon deliberately avoids upstream invisible input/hit-test overlays and
generated-content-only digit presentation. It does not claim drop-in compatibility.
No upstream CSS was adapted, so no new upstream copyright block is required.
Local sample image attribution is in packages/docs/public/images/CREDITS.md.
New docs follow the existing English-only component content convention.
Current HEAD ships four generated themes (sunshine/moonlight/ocean/forest), not
the historical overview's five; validation covers all four without inventing Sunset.

## Verification limits

The legacy integration configuration now serves its real fixture HTTP server and
discovers accessibility tests. Full Chromium integration plus accessibility:
100 passed / 14 failed. Replayed historical baseline CSS from `git show f62c0a8`
through an in-memory HTTP response: exactly the same 100 passed / 14 failed,
including identical failing test names. No checkout or baseline files changed.
Separate a11y command: 45 passed / 8 failed, the same baseline subset.
Failures concern legacy fixture names/tab order, old HSL/rgb expectations,
token counting, and existing modal focus/reduced-motion assertions. They were not
weakened or fixed outside this scope.

Visual command on macOS: 21 missing Darwin baseline snapshots, one interrupted,
54 not run; stopped with exit 130 rather than approving generated baselines.
Generated snapshots were moved to ignored test-results/unapproved-darwin-snapshots.
Chromium screenshots and geometric/interaction/axe checks in the new suite are
separate evidence, not a substitute for Linux visual baseline comparison.
Firefox/WebKit smoke checks were attempted but blocked before execution because
browser binaries are not installed (BLOCKED_ENV):
`bunx playwright test --config=playwright.data-display.config.ts --browser=firefox|webkit --grep='controlled disclosure synchronizes'`
Chrome DevTools screenshot file writes were denied by its workspace boundary;
viewport output was inspected directly, and Playwright writes local screenshots.

## Commands and results

Browser commands used `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
Core test commands ran from `packages/core`; build/typecheck commands from the root.

| Command | Result |
| --- | --- |
| `bun run build:core` | Passed |
| `bun run build:docs` | Passed; 110 pages, no Astro errors/warnings |
| `bun run typecheck` | Passed; core and docs |
| `bun test tests/unit/data-display-package.test.ts` | 6 passed; packed exports, declarations, SSR and standalone integration |
| `bun run test:data-display` | 31 passed; interaction, themes, narrow/RTL, axe and built docs controllers |
| `bun run test:native-overlays` | 20 passed; existing Actions contracts |
| `bun test tests/unit` | 2061 passed / 2 failed; Bun temporary standalone ESM import resolution |
| `bun run test:integration -- --project=chromium --workers=2 --reporter=list` | 100 passed / 14 baseline failures, reproduced with historical CSS |
| `bun run test:a11y -- --project=chromium --workers=2 --reporter=line` | 45 passed / 8 baseline failures |
| `bun run test:visual -- --workers=2` | Interrupted, exit 130; missing Darwin baselines; see limits above |
| `git diff --check` | Passed |

No release, merge, commit or push was performed. Local docs preview:
`http://localhost:4322/duskmoonui/`.

## Follow-up adjustments

User-requested scope revision: use existing Indicator with Badge rather than a
new Status primitive. Status source, exports, type union, catalog and page were
removed; existing Avatar status aliases remain unchanged. Individual composition
consumers import Indicator and Badge alongside Avatar.

Countdown now offers `countdown-animated` plus controller-restarted
`countdown-tick` slide/fade on changed readable values. Chat uses curved upper
tails and logical start/end placement. Collapse uses progressive native
`::details-content`/interpolated height and controlled discrete-display height
transitions, with immediate inert handling and reduced-motion/static fallback.

Follow-up validation: core build, docs build (109 pages), typecheck and focused
unit/packed/Chat/Collapse tests passed (85 tests). Data Display Chromium suite
passed all 33 tests, including intermediate expand/close heights, Countdown
animation/reduced motion and Chat tail screenshots in both directions.
Repository-wide limits above remain applicable; those suites were not rerun for
this follow-up. A filled-success Badge example exposed Forest contrast of 4.3:1;
the composition uses the existing soft-success variant, retaining the full axe
assertion. The underlying filled Badge theme contrast remains outside this change.

Collapse docs follow-up: previously static button/class previews lacked application
handlers. Style previews now use native details/summary, including open/closed,
variants, colors, sizes, animation and nested examples. The group uses an explicit
shared name. Disabled markup uses a genuinely disabled button and hidden/inert
panel. The controlled example uses a bundled consumer controller, with a complete
framework-neutral binding documented alongside the setter. Chrome DevTools MCP
confirmed all 26 native previews toggle and inspected an expanded panel screenshot.
The full Data Display Chromium suite passed 34 tests, including a new every-preview
keyboard/controller/exclusive-group regression. Docs build and diff checks passed.
