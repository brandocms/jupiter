# Migration: FooterReveal Module

**Tier**: 1 (Easy)
**Complexity**: ⭐ Very Low
**Estimated Time**: 1-2 hours
**File**: `src/modules/FooterReveal/index.js`

---

## Module Overview

FooterReveal creates a footer reveal effect where the footer is revealed as content scrolls up. Uses GSAP for simple positioning calculations.

---

## Current GSAP Usage

### Patterns Found
- **`gsap.set()`** - Setting positions immediately
- **`gsap.to()`** - Simple position animations (if any)
- **Properties**: `y`, `position`, positioning values

### Typical Code Pattern

```javascript
// Position footer initially
gsap.set(footer, {
  position: 'fixed',
  bottom: 0,
  y: 0
})

// Adjust on scroll (if animated)
gsap.to(footer, {
  y: scrollOffset,
  ease: 'none'
})
```

---

## Migration Difficulty

**Very Easy** ⭐

**Reasons**:
- Simple positioning logic
- No complex timelines
- Straightforward property animations
- Similar to StackedBoxes

---

## Dependencies

**Recommended**: Migrate after StackedBoxes (to reuse `set` utility pattern)

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
import { set } from '../../utils/motion-helpers'
```

### Step 2: Replace gsap.set() Calls

**Before (GSAP)**:
```javascript
gsap.set(footer, {
  position: 'fixed',
  bottom: 0,
  y: 0
})
```

**After (Motion)**:
```javascript
set(footer, {
  position: 'fixed',
  bottom: 0,
  y: 0
})
```

### Step 3: Replace gsap.to() Calls (if any)

**Before (GSAP)**:
```javascript
gsap.to(footer, {
  y: offset,
  ease: 'none',
  duration: 0
})
```

**After (Motion)**:
```javascript
animate(footer, {
  y: offset
}, {
  duration: 0,
  easing: 'linear'
})
```

### Step 4: Update Scroll Handler (if applicable)

If module updates footer position on scroll:

```javascript
// Likely just needs position updates (duration: 0)
handleScroll() {
  const offset = calculateOffset()
  set(this.footer, { y: offset })
}
```

### Step 5: Test & Cleanup
- Test footer reveal effect
- Remove GSAP import
- Verify smooth scrolling performance

---

## Code Changes Checklist

- [ ] Import Motion and utilities
- [ ] Replace `gsap.set()` with `set()` utility
- [ ] Replace `gsap.to()` with `animate()` (if used)
- [ ] Update scroll event handlers
- [ ] Test footer reveal effect
- [ ] Test scroll performance
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Footer starts in correct position
- [ ] Reveal effect works on scroll
- [ ] Footer stays positioned correctly at page bottom
- [ ] No layout jumps or shifts

### Functional Testing
- [ ] Scroll up - footer reveals correctly
- [ ] Scroll down - footer behavior correct
- [ ] Resize window - footer repositions correctly
- [ ] Multiple page sizes work correctly

### Performance Testing
- [ ] Smooth 60fps scrolling
- [ ] No jank during scroll
- [ ] Lightweight position updates
- [ ] No performance regression vs GSAP version

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

---

## Performance Notes

**Important**: Footer reveal often updates on scroll. Ensure:
- Position updates are lightweight (duration: 0)
- No unnecessary reflows
- Use transform (y) instead of top/bottom when possible
- Consider using `will-change: transform` on footer

```css
.footer-reveal {
  will-change: transform;
}
```

---

## Rollback Plan

If issues arise:
1. Revert to GSAP implementation
2. Document specific issue encountered
3. Investigate before retry

---

## Notes

- Very similar to StackedBoxes migration
- Focus on scroll performance
- Keep position updates lightweight
- Good second module after StackedBoxes

---

## Related Modules

- StackedBoxes (similar set() usage)
- Parallax (similar scroll-based positioning)

---

**Status**: Ready for migration
**Priority**: High (simple, good early win)
**Risk Level**: Very Low
