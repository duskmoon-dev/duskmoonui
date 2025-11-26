# Documentation Site Build Issues

## Current Status: Build Failing

The Astro documentation site currently fails to build due to PostCSS compatibility issues.

## Error Description

```
[postcss] Unexpected '/'. Escaping special characters with \ may help.
```

## Root Cause

The PostCSS selector parser is encountering issues when processing:

1. **CSS-in-JS from @duskmoon-dev/core plugin**: The Tailwind plugin generates CSS with modern syntax including:
   - Alpha channel syntax: `hsl(var(--color-primary) / 0.1)`
   - Complex selectors and pseudo-classes

2. **Astro Scoped Styles**: PostCSS has known issues parsing Astro's `<style>` blocks with certain patterns

3. **PostCSS Version Incompatibility**: The current PostCSS setup may not support all modern CSS syntax

## Attempted Solutions

### ✅ Completed
- Removed all Astro scoped `<style>` blocks from pages
- Moved styles to external CSS files (`src/styles/pages.css`)
- Converted component pages to use Tailwind utility classes only
- Removed component showcase pages that had complex template literals

### ❌ Still Failing
- External CSS files (`themes.css`, `global.css`) still cause PostCSS errors
- The `@duskmoon-dev/core` plugin generates CSS that triggers the parser error
- Even with minimal configuration, the build fails

## Possible Solutions

### Option 1: Upgrade PostCSS (Recommended)
```bash
bun add -D postcss@latest postcss-selector-parser@latest
```

### Option 2: Use Different CSS Processing
- Disable PostCSS selector parser
- Use Lightning CSS instead
- Configure Vite to skip certain CSS transformations

### Option 3: Simplify @duskmoon-dev/core Plugin
- Modify the plugin to generate PostCSS-compatible CSS
- Avoid using `/` in alpha channel syntax
- Use rgba() instead of modern `/ alpha` syntax

### Option 4: Static Documentation
- Build documentation as static MDX files only
- Skip component showcase pages
- Use GitHub Pages to serve pre-built MDX docs

## Workaround for Now

The core package (`@duskmoon-dev/core`) works perfectly fine. The issue is isolated to the documentation site build process.

**For users:**
- Install and use `@duskmoon-dev/core` normally
- Refer to the comprehensive component documentation in `/packages/core/docs/COMPONENTS_CATEGORIZED.md`
- Check the README for component lists and usage examples

## Files Modified (But Build Still Fails)

- ✅ Removed `<style>` from all page files
- ✅ Created `src/styles/pages.css` with external styles
- ✅ Converted components index to use Tailwind classes
- ✅ Updated BaseLayout to import external CSS
- ❌ Build still fails due to CSS processing pipeline

## Next Steps

1. **Investigate PostCSS Configuration**
   - Check if PostCSS config can disable selector parser for certain files
   - Try different PostCSS plugins or configurations

2. **Test with Lightning CSS**
   - Astro supports Lightning CSS as alternative
   - May handle modern CSS syntax better

3. **Simplify Theme System**
   - Generate static CSS instead of dynamic plugin-based CSS
   - Pre-compile themes to avoid runtime CSS generation

4. **Alternative Documentation Platform**
   - Consider Docusaurus, VitePress, or Next.js for docs
   - These may have better PostCSS compatibility

## Related Issues

- PostCSS Selector Parser: https://github.com/postcss/postcss-selector-parser/issues
- Astro & PostCSS: https://github.com/withastro/astro/issues
- Tailwind CSS 4.0 compatibility

## Contact

If you can help resolve this issue, please open a PR or issue on GitHub!
