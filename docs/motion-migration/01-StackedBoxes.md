# Migration: StackedBoxes Module

**Tier**: 1 (Easy)
**Complexity**: ⭐ Very Low
**Estimated Time**: 1-2 hours
**File**: `src/modules/StackedBoxes/index.js`

---

## Module Overview

StackedBoxes handles the stacking/positioning of box elements. It uses GSAP only for immediate property setting (no animations).

---

## Current GSAP Usage

### Patterns Found
- **`gsap.set()`** - Setting properties immediately (no animation)
- **Properties**: `position`, `marginBottom`, positioning values

### Code Examples

```javascript
// Current GSAP usage (from audit)
gsap.set(element, {
  position: 'absolute',
  marginBottom: 0,
  // ... other positioning properties
})
```

---

## Migration Difficulty

**Very Easy** ⭐

**Reasons**:
- Only uses `gsap.set()` (immediate, no animation)
- No timelines
- No complex features
- Simple 1:1 replacement

---

## Dependencies

**None** - This module can be migrated independently.

---

## Migration Plan

### Step 1: Import Motion
```javascript
// Add at top of file
import { animate } from 'motion'
// Keep gsap import temporarily for fallback
```

### Step 2: Replace gsap.set() Calls

**Before (GSAP)**:
```javascript
gsap.set(element, {
  position: 'absolute',
  marginBottom: 0,
  top: 0,
  left: 0
})
```

**After (Motion)**:
```javascript
animate(element, {
  position: 'absolute',
  marginBottom: 0,
  top: 0,
  left: 0
}, { duration: 0 })  // duration: 0 = immediate (like gsap.set)
```

**Or use the set utility**:
```javascript
import { set } from '../../utils/motion-helpers'

set(element, {
  position: 'absolute',
  marginBottom: 0,
  top: 0,
  left: 0
})
```

### Step 3: Test Thoroughly
- Visual testing: Check box stacking works correctly
- Responsive testing: Test different screen sizes
- Browser testing: Chrome, Firefox, Safari

### Step 4: Remove GSAP Import
```javascript
// Remove this line
import gsap from 'gsap'
```

---

## Code Changes Checklist

- [ ] Import Motion: `import { animate } from 'motion'`
- [ ] Create `set` utility (if not already exists): `src/utils/motion-helpers.js`
- [ ] Replace all `gsap.set()` with `set()` or `animate(..., { duration: 0 })`
- [ ] Test visually
- [ ] Test responsiveness
- [ ] Test in multiple browsers
- [ ] Remove GSAP import
- [ ] Update any comments referencing GSAP
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Boxes stack correctly on page load
- [ ] Positioning is accurate
- [ ] No layout shifts or jumps
- [ ] Matches pre-migration appearance

### Functional Testing
- [ ] Resize window - stacking updates correctly
- [ ] Multiple instances work on same page
- [ ] No JavaScript errors in console

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

### Performance
- [ ] No performance regressions
- [ ] Page load time unchanged (or better)

---

## Rollback Plan

If issues arise:
1. Restore GSAP import
2. Revert Motion changes
3. Commit rollback with clear message
4. Document issue for future retry

---

## Notes

- This is the EASIEST module to migrate - perfect for starting
- No animations means no timing/easing concerns
- Good module to establish migration patterns
- Creates foundation for utility functions

---

## Related Modules

Similar patterns used in:
- FooterReveal (also uses simple gsap.set)
- EqualHeightImages
- EqualHeightElements

---

**Status**: Ready for migration
**Priority**: High (good starter module)
**Risk Level**: Very Low
