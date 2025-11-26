# Data Model: DuskMoonUI Core Entities

**Date**: 2025-11-19
**Purpose**: Define the key entities and their relationships for @duskmoon-dev/core refactor

## Entity Diagram

```
┌─────────────────┐
│     Theme       │
│                 │
│ - name          │
│ - colorScheme   │
│ - default       │
│ - prefersDark   │
└────────┬────────┘
         │
         │ contains
         │
         ▼
┌─────────────────┐
│  Color Token    │◄──────┐
│                 │       │ uses
│ - name          │       │
│ - hue           │       │
│ - saturation    │       │
│ - lightness     │       │
│ - contrast      │       │
└─────────────────┘       │
                          │
                          │
┌─────────────────┐       │
│ Component Style │───────┘
│                 │
│ - className     │
│ - variants      │
│ - states        │
│ - customizable  │
└─────────────────┘
```

## Entities

### Theme

**Description**: A collection of color values and design tokens that define the visual appearance of all components. Themes enable seamless switching between light/dark modes and custom branding.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| name | string | ✅ | Unique theme identifier (e.g., "sunshine", "moonlight") | Lowercase, alphanumeric, hyphens only |
| colorScheme | 'light' \| 'dark' | ✅ | Indicates light or dark theme for system preferences | Must be 'light' or 'dark' |
| default | boolean | ⬜ | Whether this is the default theme | Only one theme can be default |
| prefersDark | boolean | ⬜ | Whether to use when user prefers dark mode | Only one theme can have prefersDark |
| colors | ThemeColors | ✅ | Color token definitions (see Color Token entity) | Must include required tokens |

**Relationships**:
- **Contains** multiple Color Tokens (1:N)
- **Applied to** DOM elements via `data-theme` attribute

**State Transitions**:
```
[Defined] → [Loaded] → [Active] → [Inactive]
                ↑                      ↓
                └──────────────────────┘
```

**Lifecycle**:
1. **Defined**: Theme configuration parsed from user's CSS
2. **Loaded**: CSS variables generated and injected into stylesheet
3. **Active**: Applied to DOM element via `data-theme="themeName"`
4. **Inactive**: Not currently applied (but CSS variables remain available)

**Example**:
```typescript
// Theme definition (TypeScript representation)
const sunshineTheme: Theme = {
  name: 'sunshine',
  colorScheme: 'light',
  default: true,
  prefersDark: false,
  colors: {
    primary: '30 90% 60%',           // Warm orange
    primaryContent: '0 0% 100%',     // White text
    secondary: '340 80% 65%',        // Pink
    secondaryContent: '0 0% 100%',
    tertiary: '270 75% 65%',         // Purple
    tertiaryContent: '0 0% 100%',
    base100: '0 0% 100%',            // White background
    base200: '220 20% 97%',
    base300: '220 20% 94%',
    baseContent: '220 20% 20%',      // Dark gray text
    // ... other semantic colors
  }
};
```

```css
/* Theme definition (CSS representation) */
[data-theme="sunshine"] {
  color-scheme: light;

  /* Brand colors */
  --color-primary: 30 90% 60%;
  --color-primary-content: 0 0% 100%;
  --color-secondary: 340 80% 65%;
  --color-secondary-content: 0 0% 100%;
  --color-tertiary: 270 75% 65%;
  --color-tertiary-content: 0 0% 100%;

  /* Neutral colors */
  --color-base-100: 0 0% 100%;
  --color-base-200: 220 20% 97%;
  --color-base-300: 220 20% 94%;
  --color-base-content: 220 20% 20%;

  /* Semantic colors */
  --color-info: 200 100% 50%;
  --color-info-content: 0 0% 100%;
  --color-success: 150 60% 50%;
  --color-success-content: 0 0% 100%;
  --color-warning: 40 100% 50%;
  --color-warning-content: 0 0% 0%;
  --color-error: 0 80% 60%;
  --color-error-content: 0 0% 100%;
}
```

**Identity Rules**:
- Theme names must be unique within a project
- Only one theme can be marked as `default: true`
- Only one theme can be marked as `prefersDark: true`

**Validation Rules**:
- Name: Lowercase letters, numbers, hyphens only (regex: `^[a-z0-9-]+$`)
- Color values: Must be valid HSL space-separated format (e.g., "240 80% 60%")
- Content colors: Must meet WCAG AA contrast ratio (4.5:1) against base color
- Required tokens: primary, secondary, tertiary, base-100, base-content

---

### Color Token

**Description**: A semantic CSS custom property representing a specific color role in the design system. Color tokens enable theme-aware styling and guarantee accessibility through automatic content color generation.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| name | string | ✅ | Semantic token name (e.g., "primary", "secondary-content") | Must match naming convention |
| hue | number | ✅ | HSL hue value (0-360 degrees) | 0 <= hue <= 360 |
| saturation | number | ✅ | HSL saturation percentage (0-100%) | 0 <= saturation <= 100 |
| lightness | number | ✅ | HSL lightness percentage (0-100%) | 0 <= lightness <= 100 |
| contrastRatio | number | ⬜ | WCAG contrast ratio against paired color | >= 4.5 for AA compliance |

**Relationships**:
- **Belongs to** a Theme (N:1)
- **Used by** Component Styles (N:M)
- **Paired with** content color token for accessibility (1:1)

**Token Categories**:

1. **Brand Colors** (3 colors × 5 variants = 15 tokens):
   - `primary`, `primary-focus`, `primary-content`, `primary-container`, `on-primary-container`
   - `secondary`, `secondary-focus`, `secondary-content`, `secondary-container`, `on-secondary-container`
   - `tertiary`, `tertiary-focus`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`

2. **Surface Colors** (10 tokens):
   - `surface`, `surface-dim`, `surface-bright`
   - `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`
   - `surface-variant`, `on-surface`, `on-surface-variant`

3. **Semantic Colors** (4 colors × 3 variants = 12 tokens):
   - `info`, `info-content`, `info-container`, `on-info-container`
   - `success`, `success-content`, `success-container`, `on-success-container`
   - `warning`, `warning-content`, `warning-container`, `on-warning-container`
   - `error`, `error-content`, `error-container`, `on-error-container`

4. **Neutral Colors** (10 tokens):
   - `base-100` through `base-900` (10 shades)
   - `base-content` (text on base colors)

5. **Outline Colors** (2 tokens):
   - `outline`, `outline-variant`

**Total**: 65+ tokens

**Naming Convention**:
```
{category}-{variant}

Examples:
- primary                    # Base brand color
- primary-focus              # Hover/active state
- primary-content            # Text on primary
- primary-container          # Tinted background
- on-primary-container       # Text on container

- surface-container-high     # Elevated surface
- on-surface-variant         # Secondary text
```

**Content Color Generation Algorithm**:
```typescript
function generateContentColor(baseColor: string): string {
  const [h, s, l] = parseHSL(baseColor);

  // Determine content lightness based on base lightness
  const contentLightness = l > 50 ? 20 : 100;

  // Reduce saturation for better readability
  const contentSaturation = Math.min(s, 20);

  // Maintain hue for color harmony
  return `${h} ${contentSaturation}% ${contentLightness}%`;
}

// Validation: Ensure WCAG AA contrast
function validateContrast(bg: string, fg: string): boolean {
  const contrast = calculateContrastRatio(bg, fg);
  return contrast >= 4.5;  // WCAG AA threshold
}
```

**Example**:
```css
/* Color token definition */
:root {
  /* Base color */
  --color-primary: 240 80% 60%;

  /* Content color (auto-generated) */
  --color-primary-content: 240 20% 100%;

  /* Focus variant (programmatically lightened/darkened) */
  --color-primary-focus: 240 80% 50%;
}

/* Usage in components */
.btn-primary {
  background-color: hsl(var(--color-primary) / var(--tw-bg-opacity, 1));
  color: hsl(var(--color-primary-content) / var(--tw-text-opacity, 1));
}

/* Supports Tailwind opacity modifiers */
.bg-primary\/60 {
  --tw-bg-opacity: 0.6;
  background-color: hsl(var(--color-primary) / var(--tw-bg-opacity));
}
```

**Identity Rules**:
- Token names must be unique within a theme
- Base colors and their content colors form inseparable pairs
- Token names follow kebab-case convention

**Validation Rules**:
- HSL values: `h` (0-360), `s` (0-100%), `l` (0-100%)
- Content colors: Must achieve 4.5:1 contrast ratio with base color
- Format: Space-separated values (e.g., "240 80% 60%"), NOT `hsl()` function

---

### Component Style

**Description**: CSS declarations in `@layer components` that define the visual appearance and interactive behavior of UI elements. Component styles are minimal by design, providing only essential colors and states while allowing customization via Tailwind utility classes.

**Attributes**:

| Attribute | Type | Required | Description | Validation |
|-----------|------|----------|-------------|------------|
| className | string | ✅ | Base CSS class name (e.g., "btn", "card") | Lowercase, alphanumeric, hyphens |
| variants | string[] | ✅ | Available color/style variants | Must include at least primary/secondary/tertiary |
| states | string[] | ✅ | Interactive states (hover, focus, active, disabled) | Must handle all states accessibly |
| customizable | boolean | ✅ | Whether utility classes can override styles | true for all components |

**Relationships**:
- **Uses** Color Tokens for colors (N:M)
- **Belongs to** component category (button, input, etc.)
- **Can be combined** with Tailwind utility classes (composition)

**Component Categories**:

1. **Button** (`btn`):
   - Variants: `btn-primary`, `btn-secondary`, `btn-tertiary`, `btn-outline`, `btn-ghost`
   - Sizes: `btn-xs`, `btn-sm`, `btn-md` (default), `btn-lg`
   - States: hover, active, focus, disabled

2. **Card** (`card`):
   - Variants: `card-bordered`, `card-compact`, `card-side`
   - Sub-components: `card-body`, `card-title`, `card-actions`

3. **Input** (`input`):
   - Variants: `input-bordered`, `input-primary`, `input-secondary`, `input-tertiary`
   - Sizes: `input-xs`, `input-sm`, `input-md` (default), `input-lg`
   - States: focus, disabled, error

4. **Form** (`form-control`):
   - Sub-components: `label`, `label-text`, `label-text-alt`
   - Variants: `form-control-horizontal`, `form-control-vertical`

5. **Navigation** (`navbar`):
   - Sub-components: `navbar-start`, `navbar-center`, `navbar-end`
   - Variants: `navbar-sticky`, `navbar-transparent`

6. **Modal** (`modal`):
   - Sub-components: `modal-box`, `modal-action`, `modal-backdrop`
   - Variants: `modal-bottom`, `modal-middle`

**Customization Pattern**:
```css
/* Base component (minimal styles) */
.btn {
  /* Fixed properties */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  transition: all 200ms;

  /* Customizable via utilities (no fixed values) */
  /* padding, margin, border-radius, shadow can be overridden */
}

/* Color variant */
.btn-primary {
  background-color: hsl(var(--color-primary) / var(--tw-bg-opacity, 1));
  color: hsl(var(--color-primary-content) / var(--tw-text-opacity, 1));
}

/* State */
.btn:hover {
  filter: brightness(1.05);
}

/* Usage with utilities (ENCOURAGED) */
<button class="btn btn-primary rounded-full px-8 shadow-lg">
  <!-- Tailwind utilities override spacing, border-radius, shadow -->
</button>
```

**State Handling**:
```css
/* All interactive states must be defined */
.btn:hover:not(:disabled) {
  filter: brightness(1.05);
}

.btn:active:not(:disabled) {
  filter: brightness(0.95);
  transform: scale(0.98);
}

.btn:focus-visible {
  outline: 2px solid hsl(var(--color-primary-focus));
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Validation Rules**:
- All components must support primary, secondary, and tertiary variants
- All interactive components must define hover, active, focus, disabled states
- Focus states must be keyboard-accessible (`:focus-visible`)
- Disabled states must prevent interaction and reduce opacity
- Base styles must not set fixed spacing (allow utility override)

**Identity Rules**:
- Class names must be unique across the plugin
- Base class (e.g., `btn`) is required, variants are optional
- Variants follow pattern: `{base}-{variant}` (e.g., `btn-primary`)

---

## Relationships Summary

```
Theme (1) ──contains──> ColorToken (N)
                             ▲
                             │
                           uses
                             │
ComponentStyle (M) ──────────┘
```

**Key Relationships**:
1. A Theme contains 65+ Color Tokens
2. Component Styles use multiple Color Tokens
3. Themes can be switched without reloading (CSS variables)
4. Component Styles work with all Themes automatically

## Data Flow

```
User Configuration
       │
       ▼
Theme Definition (CSS/TypeScript)
       │
       ▼
Color Token Generation
       │
       ▼
CSS Variables Injection
       │
       ▼
Component Styles Reference Variables
       │
       ▼
Theme Switch (data-theme attribute change)
       │
       ▼
CSS Variables Update (instant)
       │
       ▼
Components Re-render with New Colors
```

## Persistence & Storage

**No Data Persistence Required**: All data is ephemeral and generated at build time.

- **Themes**: Defined in user's CSS, compiled into static stylesheet
- **Color Tokens**: Generated as CSS variables, no runtime state
- **Component Styles**: Static CSS, no runtime modification

**Optional User Persistence** (not handled by plugin):
- Users may store selected theme in `localStorage`
- Users may sync theme preference with backend
- Plugin only handles CSS, not state management
