# Migration: EqualHeightElements Module

**Tier**: 1 (Easy)
**Complexity**: ⭐ Very Low
**Estimated Time**: 1 hour
**File**: `src/modules/EqualHeightElements/index.js`

---

## Module Overview

EqualHeightElements equalizes the height of any elements within a container. Uses GSAP to set minHeight properties immediately (no animation).

**Note**: Identical pattern to EqualHeightImages, just works with any elements instead of just images.

---

## Current GSAP Usage

### Patterns Found
- **`gsap.set()`** - Setting minHeight immediately
- **Properties**: `minHeight`

### Typical Code Pattern

```javascript
// Calculate tallest element
const maxHeight = Math.max(...heights)

// Set all elements to same height
elements.forEach(el => {
  gsap.set(el, { minHeight: maxHeight })
})
```

---

## Migration Difficulty

**Very Easy** ⭐

**Reasons**:
- Identical to EqualHeightImages
- Only sets one property: `minHeight`
- No animations (immediate set)
- No timelines or complex logic

---

## Dependencies

**Recommended**: Can migrate in parallel with EqualHeightImages (identical pattern)

---

## Migration Plan

### Step 1: Import Motion Utility
```javascript
import { set } from '../../utils/motion-helpers'
```

### Step 2: Replace gsap.set() Calls

**Before (GSAP)**:
```javascript
elements.forEach(el => {
  gsap.set(el, { minHeight: maxHeight })
})
```

**After (Motion)**:
```javascript
elements.forEach(el => {
  set(el, { minHeight: maxHeight })
})
```

### Step 3: Test & Cleanup
- Verify equal heights for various element types
- Test responsive behavior
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import `set` utility from motion-helpers
- [ ] Replace all `gsap.set()` with `set()`
- [ ] Test equal height calculation
- [ ] Test on resize
- [ ] Test with various element types (divs, sections, articles, etc.)
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] All elements have equal height
- [ ] Heights calculated correctly
- [ ] Works with different element types
- [ ] No visual regressions

### Functional Testing
- [ ] Works with divs, sections, articles, etc.
- [ ] Recalculates on window resize
- [ ] Multiple containers work independently
- [ ] Edge case: single element
- [ ] Edge case: no elements
- [ ] Mixed content (text, images, etc.)

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

- **Identical pattern to EqualHeightImages**
- Can copy/paste approach from EqualHeightImages migration
- Can be done in parallel with EqualHeightImages
- Extremely low risk

---

## Related Modules

- **EqualHeightImages** (identical pattern)
- StackedBoxes (similar set() usage)

---

**Status**: Ready for migration
**Priority**: High (extremely simple, can parallelize with EqualHeightImages)
**Risk Level**: Minimal
