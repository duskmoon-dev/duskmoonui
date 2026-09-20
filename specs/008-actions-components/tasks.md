# Tasks: Actions Components

**Baseline**: `8302794c8eadfb425e4155d6bada91a4dd70d6fb`

## Phase 1: Baseline and contracts

- [x] T001 Record the starting revision and preserve the existing untracked `.loki/` and `.trees/` directories
- [x] T002 Run the Core build and focused Button, Navigation, Dialog, Theme Controller, Circle Menu, package-export, and standalone tests
- [x] T003 Define CSS-first state contracts for FAB and Swap, plus a Popover-only Dropdown contract

## Phase 2: Core and packaging

- [x] T004 Add dedicated `fab.css`, `swap.css`, and `dropdown.css` component sources
- [x] T005 Make the canonical Dropdown source Popover-only with logical anchor placement and fallbacks
- [x] T006 Add generated-module, package-export, aggregate CSS, standalone, and plugin integration for all new sources
- [x] T007 Make only targeted Button and Dialog visual changes required by the new compositions

## Phase 3: Documentation

- [x] T008 Add an Actions overview covering Button, Dropdown, FAB / Speed Dial, Swap, and Theme Controller
- [x] T009 Add FAB and Swap examples plus a Popover-only Dropdown component page
- [x] T010 Clarify native Dialog versus legacy Modal and document backdrop/scroll policies
- [x] T011 Expand Theme Controller guidance for preference, resolved theme, Swap composition, SSR, storage, and listener cleanup
- [x] T012 Update component inventories and remove FAB from future-component listings

## Phase 4: Tests and browser validation

- [x] T013 Add focused unit and package tests for FAB, Swap, and Dropdown
- [x] T014 Add Playwright interaction/accessibility coverage for native and controlled state contracts
- [x] T015 Run scoped tests, Core build, typecheck, and docs build
- [x] T016 Verify the finished docs with Chrome DevTools MCP plus Chromium coverage for desktop/mobile, LTR/RTL, light/dark, and reduced-motion states
