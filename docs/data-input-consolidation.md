# Data Input Consolidation

Baseline: clean `main`, `1ff823b78cc857a214f0d6cf12147fbdac2a1387`.
Historical review: `f62c0a8f267b8971394775416d18cc9542bff81e`, not checked out.

## Execution

1. Consolidate canonical CSS and opt-in validation; verify cascade/import parity.
2. Complete native controls and small compositions; verify real interaction, values and reset.
3. Repair docs/discovery and packaging; verify built and packed assets across browser engines.

No worktree, theme redesign, mandatory runtime, DaisyUI dependency, release or merge.
The three tasks run locally/serially (delegation is not authorized for this session).

## Coverage Matrix

All public paths below are relative to `@duskmoon-dev/core/components/`.
Each named component has `.css` and extensionless CSSStyleSheet/`css` exports.
All are included in aggregate and standalone builds. Calendar, Fieldset and Label
reuse existing implementations, not duplicate stylesheets.

| Capability | Canonical implementation | Public entry | Documentation | Work completed | Behavior owner / remaining boundary |
| --- | --- | --- | --- | --- | --- |
| Calendar | `datepicker.css`, `.datepicker-calendar`, `.datepicker-inline` | `datepicker` | Datepicker: Inline Calendar | Clarified styling-only surface and states | Application date/locale/keyboard engine |
| Checkbox | `checkbox.css`, `.checkbox` | `checkbox`, legacy `form` | Checkbox | One mark; indeterminate, invalid, focus, disabled | Native checked/reset; application indeterminate property |
| Fieldset | `form-group.css`, `.fieldset` | `form-group`, `form` | Form Group: Fieldset | Group semantics and narrow layout | Native legend/disabled inheritance |
| File Input | `file-input.css`, `.file-input` | `file-input`, retained `input`, `form` | File Input | Selector button, sizes, colors, invalid, disabled | Native files; application transport |
| Filter | `filter-group.css`, `.filter-group` + Chip | `filter-group` | Filter Group | Native radio/checkbox selection, focus, disabled | Native selection; application queries/scoped clear |
| Label | `form-group.css`, `.form-label`, `.label`, `.label-text` | `form-group`, `form` | Form Group: Labels | Canonical composition, required/help association | Native `for`/label nesting |
| Radio | `radio.css`, `.radio` | `radio`, `form` | Radio | One dot; invalid/focus/disabled | Native group selection/reset |
| Range | `range.css`, `.range` | `range`, `form` | Range; Slider | Sizes, colors, native focus and constraints | Native value; application optional output sync |
| Rating | `rating.css`, `.rating-native` + `.rating-input` | `rating` | Rating | Checked-state stars, keyboard, no-rating, reset, enlarged-text wrapping | Native radios; static legacy half/display retained |
| Select | `select.css`, `.select` | `select`, `form` | Select | Canonical definition, sizes/variants, RTL, invalid | Native options; searchable/multi-select adapters separate |
| Input field | `input.css`, `.input` | `input`, `form` | Input; Form | Filled/outlined, composition, invalid precedence | Native editing/constraints/submission |
| Textarea | `textarea.css`, `.textarea` | `textarea`, `form` | Textarea; Form | Canonical definition, XS/MD, invalid | Native text/reset; autosize fallback application-owned |
| Toggle | `switch.css`, legacy `toggle-switch.css` | `switch`, `toggle-switch`, `toggle`, `form` | Switch; Toggle Button | Legacy dimensions retained; native/ARIA state | Native on/off; application updates action `aria-pressed` |
| Validator | `validator.css`, `.validator`, `.validator-success` | `validator` (included by controls) | Validator | Error precedence, hints, explicit success, `.validate` compatibility | Native constraint status; application messages/announcements |
| OTP | `otp-input.css`, `.otp-code`, `.otp-input-field` | `otp-input` | OTP Input | Single editable value; aligned length guides; stationary Reset; reconciled aliases | Native single-input behavior; segmented controller deliberately deferred |

## Reference and Compatibility

Reviewed DaisyUI's upstream OTP, Filter and Calendar CSS and linked component docs.
Adopted the native-input/composition boundaries, not upstream source code. No license
notice was removed, and no upstream code or CSS dependency was copied.

Canonical segmented OTP names remain `.otp-input-underline`, `.otp-separator`,
`.otp-helper`, `.otp-error-message`. Retained doc spellings as aliases:
`.otp-input-underlined`, `.otp-input-separator`, `.otp-input-helper`,
`.otp-input-helper-error`; added `.otp-input-helper-success` presentation.
Undefined `otp-input-4/6`, `otp-input-disabled`, and simulated-focus classes are
removed from examples: actual constraints, `disabled`, and focus belong to controls.

## Migration Notes

- Add `.validator` for native interaction-based errors and additionally
  `.validator-success` for native success. Ordinary controls no longer acquire
  native validity colors automatically. `.validate` remains the immediate mode.
  Application ARIA errors survive native reset until the application clears them.
- `form.css` keeps its public entry and delegates to canonical controls. Custom
  overrides of the removed duplicate Checkbox/Radio `::after` marks should target
  the canonical `::before` mark instead. Existing class names remain available.
- Individual imports require the new `base.css` prerequisite and a theme. This
  includes the existing generated spacing/shape tokens; a theme alone is insufficient.
  Constructable modules include resolved CSS dependencies, not unresolved imports.
- Native Range defaults to on-surface; use `.range-primary` for the old primary
  thumb palette. Legacy Toggle retains compact dimensions and now uses a current-color
  border; `.toggle-ghost` removes it. File Input's border/button inherit its palette.
- `.rating-native` derives selection from radios, wraps enlarged/narrow layouts,
  and ignores stale `.filled/.active` colors. Legacy half/static APIs remain.
  On `.toggle-btn`, explicit `aria-pressed` wins over active aliases, including hover.
- Prefer `.otp-code` for one real code value. `.otp-code-4` changes only the guide;
  native length/pattern attributes remain required. Existing segmented integrations
  retain their API and must supply their own interaction/reset controller.
  The field now fits the code, with guides aligned to character metrics rather than
  stretched across a full field width. Adjacent OTP `.validator-error` elements reserve
  layout space while hidden, preventing blur-time feedback from interrupting Reset clicks.

See `packages/core/CHANGELOG.md`, Data Input Consolidation for `1.19.4`.

## Initial Verification

Checked on 2026-09-18. Commands below omit output redirection; logs are under
`/tmp/duskmoon-data-input-*.log`; OTP follow-up evidence is also recorded below. Root commands:

| Command | Result |
| --- | --- |
| `bun run build:core` | PASS, CSS, standalone plugin, stylesheet modules and declarations generated |
| `bun run typecheck` | PASS, Core + docs; 0 errors, warnings or hints |
| `bun run build:docs` | PASS, 113 pages built and indexed |
| `git diff --check` | PASS |
| `bun run dev` | Preview active at http://localhost:4321/duskmoonui/; OTP page returns HTTP 200 |

Commands from `packages/core`:

```sh
bun test tests/unit
bun test tests/unit/data-input.test.ts tests/unit/data-input-package.test.ts tests/unit/form.test.ts tests/unit/form-group.test.ts
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun run test:data-input
DATA_INPUT_PACKED_BROWSER=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun test tests/unit/data-input-package.test.ts
```

| Check | Result |
| --- | --- |
| Full unit suite | 1,909 pass / 2 pre-existing failures, exit 1 |
| Focused consolidation/package units | 14 pass / 0 fail, exit 0 |
| Built-assets browser suite + actual served docs | Chromium 21 pass; Firefox 20 pass / 1 skip; WebKit 20 pass / 1 skip; exit 0 |
| Packed-artifact acceptance | 5 package tests pass, including Chromium 16 pass, Firefox 15 pass / 1 skip and WebKit 15 pass / 1 skip; exit 0 |

The two unchanged failures are `standalone.test.ts`'s Bun dynamic temporary file-URL
plugin imports: `Cannot find module .../duskmoonui.mjs`. Initial clean-HEAD unit
baseline was 2,059 pass / the same 2 failures. Duplicate Form/Form Group control-state
assertions were replaced with authoritative-owner/wrapper assertions and native browser
regressions, not suppressed. The packed standalone plugin loads and compiles in Node.

Browser checks compare aggregate, individual, legacy Form, standalone CSS and adopted
stylesheet modules; exercise all seven semantic palettes, focus/blur, filled/outlined/ghost
presentation, server-invalid/native-valid precedence, real marks, FormData/reset,
indeterminate/disabled fieldsets, OTP editing/constraints, Rating, Filter, Range, File Input,
native dates and application ARIA actions. Served-page checks cover discovery, defined
classes, valid associations, select-all reset synchronization and explicitly static Calendar.
Sunshine/Moonlight, LTR/RTL, 360px layouts, settled 200% root-font scaling, reduced motion,
forced-colors/focus and axe WCAG checks pass. Native Rating needed wrapping after a
settled-layout probe exposed enlarged-text overflow. Screenshots were visually reviewed;
no unrelated visual baselines were regenerated.

Regression proof against unchanged HEAD CSS:

```sh
DATA_INPUT_BASELINE=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun run test:data-input --project=chromium --grep 'aggregate checkbox|server invalid|ordinary controls'
```

All three fail as intended: duplicate marks, native success overriding explicit errors,
and automatic ordinary-field success. The new Toggle hover regression also reproduced
`aria-pressed="false"` being overridden by stale `.active` before its selector fix.
Forced-colors checks caught canonical rules overriding the initial fallback; scoped native
selectors now win without added `!important`. Native reset synchronization in the Checkbox
demo runs after the default action, not in an early microtask. Tests wait for defined style
transitions and rendered layout, and screenshots preserve caret state.

### OTP Follow-up

The reported OTP screenshot exposed full-width guides unrelated to character positions.
Guides now use the same monospace `ch` metrics as the native text, with a compact field
and trailing caret allowance. A new browser regression checks four/six characters,
LTR/RTL, editing, reset and a constrained 140px container at 200% root-font scaling.

The new editing/reset test also reproduced a native pointer failure: incomplete code
caused an error to appear on blur between `mousedown` and `mouseup`, moving Reset by
42px. `mouseup` landed on the error paragraph, and no reset event occurred. OTP error
space is now reserved with visibility, while the shared validation contract still owns
when errors appear. Other controls' error display behavior is unchanged. The actual
served example now verifies that one Reset click clears an incomplete code.

Additional commands from `packages/core`:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun run test:data-input --grep 'OTP guides' --project=chromium
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun run test:data-input --grep 'OTP guides'
bun test tests/unit/otp-input.test.ts tests/unit/data-input.test.ts tests/unit/data-input-package.test.ts tests/unit/form.test.ts tests/unit/form-group.test.ts
```

The first command failed against the previous guide geometry as intended. After the
CSS fixes, the three-engine regression passed (3/3). Additional focused units/package
checks passed (22/22). Core build, typecheck and docs build were rerun and passed.
Full browser acceptance was rerun: 61 pass / 2 clipboard skips, exit 0. Packed acceptance
was rerun: 5 package tests pass, including 46 browser checks / 2 skips, exit 0. The full
unit rerun remained 1,909 pass / the same 2 standalone-import baseline failures, exit 1.
Complete-code screenshots and the actual docs page were visually reviewed with a visible
trailing caret and all characters in view.

## Autocomplete And OTP Layout Follow-up

The latest checks below supersede the initial totals above. OTP's error and disabled
examples now each use a `.form-group` inside the responsive `.form-grid.form-grid-2`,
with labels above their controls and an actual disabled value. The compatibility table
scrolls locally; it no longer forces the whole 360px page to overflow. Desktop/mobile
LTR/RTL layout, label association, error visibility and disabled state are browser-tested.

Autocomplete reuses its existing public entry and build registration, not a new widget
runtime. `.autocomplete-input-wrapper` positions `.autocomplete-toggle` inside the field,
reserving logical end-padding after small/large padding shorthands. A regression first
failed with 12px reserved for a 28px small toggle, then passed after correcting rule order.
Semantic `aria-selected`, `aria-disabled` and native `hidden` control presentation.
`ComponentName` now also admits the already-public `autocomplete` component.

Retained compatibility names include `.autocomplete-dropdown-open`/`.show`, `.selected`,
`.autocomplete-option-selected`, `.highlighted`, `.autocomplete-option-focused`,
`.disabled`, `.autocomplete-group-label`, `.autocomplete-no-options`, and
`.autocomplete-chips`/`.autocomplete-chip`/`.autocomplete-chip-remove`. Canonical names,
imports and boundaries are listed in the English Autocomplete page. The copyable example
supplies its scoped application controller for filtering, arrows/Enter/Escape, pointer
choice, disabled-option rejection, focus-out and native reset. It submits one `country`
value and accepts free text. A native datalist alternative needs no controller.

The popup's last option was clipped by the showcase's `overflow: hidden`; only this
example opts into `allowOverflow`. Tests hit-test the last option before scrolling it,
and compare aggregate, individual, standalone and adopted stylesheet imports. They also
exercise all sizes, light/dark themes, narrow layouts, RTL, reduced motion, forced-colors
keyboard focus and axe. Theme contrast is measured after transitions settle; macOS
WebKit uses Option-Tab for all-control keyboard navigation, matching existing tests.

### Latest Commands And Results

The system volume filled during verification (`ENOSPC`). Playwright cache/profile files
were redirected to a dedicated temporary directory on the project volume; no user files
were deleted. Installed Google Chrome still failed before any test ran with
`ftruncate: No space left on device` and `Failed to create socket directory`.
Playwright's Headless Chromium was installed on the project volume instead. Firefox and
WebKit use their existing installations. Standard download fallback recovered FFmpeg
host DNS failures. This changes test infrastructure, not package dependencies.

Setup commands:

```sh
mktemp -d /Volumes/Data/duskmoon-verification.XXXXXX
# Returned /Volumes/Data/duskmoon-verification.Ql1MaS
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS PLAYWRIGHT_BROWSERS_PATH=/Volumes/Data/duskmoon-verification.Ql1MaS/browsers PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=30000 bunx playwright install chromium-headless-shell
```

Root checks, all exit 0:

```sh
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS bun run build:core
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS bun run typecheck
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS bun run build:docs
git diff --check
curl -I http://localhost:4321/duskmoonui/docs/en/components/autocomplete/
```

Core build generated all 73 component modules, CSS bundles and declarations. Core/docs
typecheck reports zero errors, warnings and hints. Docs build/index covers 113 pages.
The preview responds HTTP 200. Commands from `packages/core`:

```sh
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS bun test tests/unit
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS bun test tests/unit/autocomplete.test.ts tests/unit/otp-input.test.ts tests/unit/data-input.test.ts tests/unit/data-input-package.test.ts tests/unit/form.test.ts tests/unit/form-group.test.ts tests/unit/palette-variants.test.ts
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Volumes/Data/duskmoon-verification.Ql1MaS/browsers/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' bun run test:data-input
TMPDIR=/Volumes/Data/duskmoon-verification.Ql1MaS DATA_INPUT_PACKED_BROWSER=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Volumes/Data/duskmoon-verification.Ql1MaS/browsers/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' bun test tests/unit/data-input-package.test.ts
```

| Check | Latest result |
| --- | --- |
| Full units | PASS, 1,911 pass / 0 fail, exit 0 |
| Focused units/package APIs | PASS, 101 pass / 0 fail, exit 0 |
| Full Data Input browser/docs suite | PASS, Chromium 26 pass; Firefox 25 pass / 1 skip; WebKit 25 pass / 1 skip; 76 pass / 2 skips total, exit 0 |
| Extracted packed package | PASS, 5 package tests; Chromium 20 pass; Firefox 19 pass / 1 skip; WebKit 19 pass / 1 skip; 58 browser checks / 2 skips, exit 0 |

The previously failing standalone-import tests were not edited or suppressed. They pass
with the dedicated `TMPDIR`; their earlier default-temporary-path failures remain in the
historical results. No cause beyond that verified environment sensitivity is claimed.
The final-review changes were rebuilt and the full browser and unit suites rerun.

### Verification Limits

All three engines became available after installation with
`PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=30000 bunx playwright install firefox webkit`.
Download-host DNS errors were recovered through Playwright's standard fallback.
No engine is claimed unavailable in the final results.

Actual clipboard paste is exercised only in Chromium: the Playwright clipboard-permission
test is explicitly skipped in Firefox/WebKit. Native text editing, selection, constraints,
submission and reset are exercised in all three. Real SMS/autofill, mobile keyboards,
device pinch zoom and physical high-contrast settings were not tested; 200% text scaling
and forced-colors are automated emulation, not device verification. The unrelated full
visual/integration/a11y suites were not rerun; this focused suite includes interaction,
screenshots and axe checks rather than claiming those suites passed.

### Deliberate Adapter Boundaries

Segmented OTP focus/paste/value/reset coordination, custom Slider controllers, custom
Calendar date/locale/keyboard/focus/popup engines, searchable/multi-select adapters,
remote validation and upload previews/drag-drop/progress/transport remain application-owned.
No new global runtime or required third-party dependency is introduced. Custom widgets
in the touched docs are explicitly styling samples; native examples work as shown.

These implementation checks were completed before commit, push or publication.
The subsequent user-authorized patch release uses the existing GitHub workflow to
publish `1.19.4`; its remote run and registry state determine publication status.
