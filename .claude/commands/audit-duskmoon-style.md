# Custom Command: audit-duskmoon-styles

## Command Definition
```yaml
name: audit-duskmoon-styles
description: Audit DuskmoonUI component styles using chrome-devtools MCP
mcp_server: chrome-devtools
```

## Execution Flow

### 1. Setup
```
Base URL: http://localhost:4321/duskmoonui/components/
Screenshot dir: ./audit-screenshots/
Issues dir: ./issues/
Worktrees dir: ./.trees/

Create directories if not exists:
  mkdir -p audit-screenshots issues
```

### 2. Component Discovery
```javascript
navigate("http://localhost:4321/duskmoonui/components/")
wait(2000)
links = execute_script(`
  Array.from(document.querySelectorAll('a[href*="/components/"]'))
    .map(a => a.href)
    .filter(href => href !== window.location.href)
`)
```

### 3. Per-Component Audit

For each component link:
```javascript
// Navigate
navigate(component_url)
wait(1000)

// Screenshot - VIEWPORT ONLY (fix for size limit)
screenshot_path = `./audit-screenshots/${component_name}.png`
take_screenshot({
  fullPage: false,
  path: screenshot_path
})

// Get page metrics
metrics = execute_script(`({
  height: document.documentElement.scrollHeight,
  viewport: window.innerHeight,
  needsScroll: document.documentElement.scrollHeight > window.innerHeight
})`)

// Console check
console_logs = get_console_logs()
errors = console_logs.filter(log => log.level === 'error')

// Network check
failed_requests = get_failed_requests()

// Style checks
style_issues = execute_script(`
  const issues = [];
  
  // Check for horizontal overflow
  if (document.documentElement.scrollWidth > window.innerWidth) {
    issues.push('Horizontal overflow detected');
  }
  
  // Check for contrast issues (simplified)
  const elements = document.querySelectorAll('*');
  // Add contrast checking logic here
  
  return issues;
`)

// Responsive check (optional - multiple viewports)
viewports = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 900, name: 'desktop' }
]

for viewport in viewports:
  set_viewport(viewport.width, viewport.height)
  wait(500)
  // Recheck for issues at this viewport
```

### 4. Issue Detection Logic
```javascript
const has_issues =
  errors.length > 0 ||
  failed_requests.length > 0 ||
  style_issues.length > 0

if (has_issues) {
  // Collect issue details for worktree-based fixing
  issues_found.push({
    component_name,
    errors,
    failed_requests,
    style_issues,
    screenshot_path,
    metrics
  })
}
```

### 5. Worktree Creation for Fixes

For each component with issues, create a dedicated worktree branch:

```bash
# Ensure .trees directory exists
mkdir -p .trees

# Create fix branch and worktree for the component
BRANCH_NAME="fix/audit-${component_name}-$(date +%Y%m%d)"
git worktree add ".trees/${component_name}" -b "${BRANCH_NAME}" main

# Store worktree info for later merge
echo "${component_name}:${BRANCH_NAME}:.trees/${component_name}" >> .trees/.audit-worktrees
```

**Worktree Structure:**
```
.trees/
  .audit-worktrees          # Tracking file for created worktrees
  button/                   # Worktree for button fixes
  card/                     # Worktree for card fixes
  modal/                    # Worktree for modal fixes
```

### 6. Fix Workflow in Worktree

For each worktree, apply fixes:
```bash
cd ".trees/${component_name}"

# Apply fixes based on detected issues
# - Console errors: Fix JS/CSS issues in component
# - Horizontal overflow: Adjust CSS rules
# - Failed requests: Fix asset paths or missing resources

# Stage and commit fixes
git add -A
git commit -m "fix(${component_name}): resolve style audit issues

- ${format_issues_for_commit(errors, failed_requests, style_issues)}

Detected by audit-duskmoon-styles"
```

### 7. Merge Worktrees Back

After all fixes are applied:
```bash
# Return to main repo
cd /path/to/duskmoonui

# Read worktree tracking file
while IFS=: read -r component branch path; do
  echo "Merging ${branch} from ${path}..."

  # Merge the fix branch
  git merge "${branch}" --no-ff -m "Merge fix for ${component} from audit"

  # Clean up worktree
  git worktree remove "${path}" --force
  git branch -d "${branch}"

  # Remove the issue file after successful merge
  rm -f "issues/${component}.md"

done < .trees/.audit-worktrees

# Clean up tracking file
rm -f .trees/.audit-worktrees

# Remove directories if empty
rmdir .trees 2>/dev/null || true
rmdir issues 2>/dev/null || true
```

**Alternative: Interactive merge with /worktree-merge skill**
```bash
# Use the worktree-merge skill for guided merging
> /worktree-merge
```

### 8. Issue Tracking with Local Files

Create an issue file for each component with problems:

```bash
# Ensure issues directory exists
mkdir -p issues

# Create issue file for the component
cat > "issues/${component_name}.md" <<EOF
# ${component_name} - Style Issues

**Component:** ${component_name}
**URL:** ${component_url}
**Severity:** ${calculate_severity(errors, style_issues)}
**Detected:** $(date -Iseconds)

## Issues Found

${format_issues(errors, failed_requests, style_issues)}

## Page Metrics

- Full height: ${metrics.height}px
- Viewport: ${metrics.viewport}px
- Needs scroll: ${metrics.needsScroll}

## Evidence

- Screenshot: ${screenshot_path}
- Console errors: ${errors.length}
- Failed requests: ${failed_requests.length}

## Console Errors

\`\`\`
${errors.join('\n')}
\`\`\`

## Failed Requests

${failed_requests.map(r => \`- ${r.url} (${r.status})\`).join('\n')}

## Style Issues

${style_issues.map(i => \`- [ ] ${i}\`).join('\n')}

---
*Auto-generated by audit-duskmoon-styles*
EOF
```

**Issue File Structure:**
```
issues/
  button.md      # Issues for button component
  card.md        # Issues for card component
  modal.md       # Issues for modal component
```

When fixes are applied and merged, delete the corresponding issue file:
```bash
rm "issues/${component_name}.md"
```

### 9. Summary Report
```javascript
generate_summary({
  total_components: components.length,
  components_with_issues: issues_found.length,
  clean_components: components.length - issues_found.length,
  issues_by_severity: {
    critical: count_by_severity('critical'),
    high: count_by_severity('high'),
    medium: count_by_severity('medium'),
    low: count_by_severity('low')
  },
  issue_files: issues_found.map(i => `issues/${i.component_name}.md`),
  worktrees_created: worktrees.map(w => w.branch),
  fixes_merged: merged_branches.length
})
```

## Severity Calculation
```javascript
function calculate_severity(errors, style_issues) {
  if (errors.some(e => e.includes('ReferenceError') || e.includes('TypeError'))) {
    return 'critical';
  }
  if (errors.length > 3 || style_issues.includes('Horizontal overflow')) {
    return 'high';
  }
  if (errors.length > 0 || style_issues.length > 2) {
    return 'medium';
  }
  return 'low';
}
```

## Screenshot Handling

**Key Fix Applied:**
- `fullPage: false` - Captures viewport only, prevents dimension overflow
- Saves to local filesystem: `./audit-screenshots/{component}.png`
- File path referenced in issue, not base64 submitted to API
- For long pages, note in issue that full page review may be needed

## Usage
```bash
# Run the audit (audit only, no fixes)
> /audit-duskmoon-styles

# Run audit and create worktrees for fixing
> /audit-duskmoon-styles --fix

# Run audit, fix, and merge all in one go
> /audit-duskmoon-styles --fix --merge

# Merge existing worktrees from previous audit
> /worktree-merge
```

## Workflow Modes

### Mode 1: Audit Only (Default)
Audits all components and reports issues without making changes.

### Mode 2: Audit + Fix (`--fix`)
1. Audits all components
2. Creates worktrees in `.trees/` for each component with issues
3. Applies fixes in isolated branches
4. Leaves worktrees ready for review before merge

### Mode 3: Full Pipeline (`--fix --merge`)
1. Audits all components
2. Creates worktrees and applies fixes
3. Automatically merges all fix branches back to main
4. Cleans up worktrees

## Output Example

### Audit Phase
```
✓ Audited 12 components
✗ Found issues in 4 components:
  - button: 2 console errors, horizontal overflow
  - card: 1 failed request
  - modal: missing focus styles
  - input: 3 style issues

✓ Created issue files:
  - issues/button.md
  - issues/card.md
  - issues/modal.md
  - issues/input.md

✓ 8 components clean
  - Avatar, Badge, Checkbox, Dialog...
```

### Worktree Creation Phase
```
✓ Created worktrees in .trees/
  - .trees/button  → fix/audit-button-20260117
  - .trees/card    → fix/audit-card-20260117
  - .trees/modal   → fix/audit-modal-20260117
  - .trees/input   → fix/audit-input-20260117
```

### Fix Phase
```
✓ Applied fixes:
  - button: Fixed overflow CSS, resolved console errors
  - card: Updated asset path
  - modal: Added focus-visible styles
  - input: Corrected padding values

✓ All fixes committed to respective branches
```

### Merge Phase
```
✓ Merged fix branches:
  - fix/audit-button-20260117 → main
  - fix/audit-card-20260117 → main
  - fix/audit-modal-20260117 → main
  - fix/audit-input-20260117 → main

✓ Cleaned up 4 worktrees
✓ Removed resolved issue files:
  - issues/button.md
  - issues/card.md
  - issues/modal.md
  - issues/input.md

✓ All components now passing audit
```
