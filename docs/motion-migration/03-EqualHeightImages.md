# Migration: EqualHeightImages Module

**Tier**: 1 (Easy)
**Complexity**: ⭐ Very Low
**Estimated Time**: 1 hour
**File**: `src/modules/EqualHeightImages/index.js`

---

## Module Overview

EqualHeightImages equalizes the height of images within a container. Uses GSAP to set minHeight properties immediately (no animation).

---

## Current GSAP Usage

### Patterns Found
- **`gsap.set()`** - Setting minHeight immediately
- **Properties**: `minHeight`

### Typical Code Pattern

```javascript
// Calculate tallest image
const maxHeight = Math.max(...heights)

// Set all images to same height
images.forEach(img => {
  gsap.set(img, { minHeight: maxHeight })
})
```

---

## Migration Difficulty

**Very Easy** ⭐

**Reasons**:
- Only sets one property: `minHeight`
- No animations (immediate set)
- No timelines or complex logic
- Identical pattern to StackedBoxes

---

## Dependencies

**Recommended**: Migrate after StackedBoxes (reuse `set` utility)

---

## Migration Plan

### Step 1: Import Motion Utility
```javascript
import { set } from '../../utils/motion-helpers'
```

### Step 2: Replace gsap.set() Calls

**Before (GSAP)**:
```javascript
images.forEach(img => {
  gsap.set(img, { minHeight: maxHeight })
})
```

**After (Motion)**:
```javascript
images.forEach(img => {
  set(img, { minHeight: maxHeight })
})
```

### Step 3: Test & Cleanup
- Verify equal heights
- Test responsive behavior
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import `set` utility from motion-helpers
- [ ] Replace all `gsap.set()` with `set()`
- [ ] Test equal height calculation
- [ ] Test on resize
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] All images have equal height
- [ ] Heights calculated correctly
- [ ] No visual regressions

### Functional Testing
- [ ] Works with different image sizes
- [ ] Recalculates on window resize
- [ ] Multiple containers work independently
- [ ] Edge case: single image
- [ ] Edge case: no images

### Responsive Testing
- [ ] Desktop: equal heights maintained
- [ ] Tablet: equal heights maintained
- [ ] Mobile: equal heights maintained
- [ ] Resize event: heights recalculate correctly

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

---

## Rollback Plan

If issues arise:
1. Revert Motion changes
2. Restore GSAP import
3. Document issue

Very low risk - rollback unlikely to be needed.

---

## Notes

- **Simplest possible migration** - just property setting
- No timing, easing, or animation concerns
- Great confidence builder
- Can be migrated in parallel with EqualHeightElements (same pattern)

---

## Related Modules

- **EqualHeightElements** (identical pattern, different property)
- StackedBoxes (similar set() usage)

---

**Status**: Ready for migration
**Priority**: High (extremely simple)
**Risk Level**: Minimal
