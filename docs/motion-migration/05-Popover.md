# Migration: Popover Module

**Tier**: 1 (Easy)
**Complexity**: ⭐⭐ Low
**Estimated Time**: 2-3 hours
**File**: `src/modules/Popover/index.js`

---

## Module Overview

Popover creates tooltip-style popovers that appear on hover/click. Uses GSAP for positioning and basic fade animations.

---

## Current GSAP Usage

### Patterns Found
- **`gsap.to()`** - Fade in/out animations
- **`gsap.set()`** - Initial positioning
- **Properties**: `opacity`, `x`, `y`, positioning

### Typical Code Pattern

```javascript
// Position popover initially
gsap.set(popover, {
  opacity: 0,
  x: position.x,
  y: position.y
})

// Show popover
gsap.to(popover, {
  opacity: 1,
  duration: 0.2,
  ease: 'power2.out'
})

// Hide popover
gsap.to(popover, {
  opacity: 0,
  duration: 0.15
})
```

---

## Migration Difficulty

**Easy** ⭐⭐

**Reasons**:
- Simple fade animations
- Basic positioning
- No timelines
- No complex sequencing

**Slightly more complex than other Tier 1 modules because**:
- Has actual animations (not just set)
- Multiple animation states (show/hide)
- Positioning calculations

---

## Dependencies

**Recommended**: Migrate after other Tier 1 modules (good to have pattern established)

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
import { set } from '../../utils/motion-helpers'
```

### Step 2: Replace Initial Positioning

**Before (GSAP)**:
```javascript
gsap.set(popover, {
  opacity: 0,
  x: position.x,
  y: position.y
})
```

**After (Motion)**:
```javascript
set(popover, {
  opacity: 0,
  x: position.x,
  y: position.y
})
```

### Step 3: Replace Show Animation

**Before (GSAP)**:
```javascript
gsap.to(popover, {
  opacity: 1,
  duration: 0.2,
  ease: 'power2.out'
})
```

**After (Motion)**:
```javascript
animate(popover, {
  opacity: 1
}, {
  duration: 0.2,
  easing: 'ease-out'
})
```

### Step 4: Replace Hide Animation

**Before (GSAP)**:
```javascript
gsap.to(popover, {
  opacity: 0,
  duration: 0.15
})
```

**After (Motion)**:
```javascript
animate(popover, {
  opacity: 0
}, {
  duration: 0.15
})
```

### Step 5: Store Animation References (if needed)

If you need to kill/stop animations:

```javascript
// Store reference
this.showAnimation = animate(popover, { opacity: 1 }, { duration: 0.2 })

// Later, stop if needed
if (this.showAnimation) {
  this.showAnimation.stop()
}
```

### Step 6: Test & Cleanup
- Test show/hide on hover
- Test positioning at various screen locations
- Verify smooth animations
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import Motion and utilities
- [ ] Replace `gsap.set()` with `set()`
- [ ] Replace show animation (`gsap.to`)
- [ ] Replace hide animation (`gsap.to`)
- [ ] Store animation references if needed for stopping
- [ ] Test show animation
- [ ] Test hide animation
- [ ] Test positioning logic
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Popover appears in correct position
- [ ] Fade in animation smooth
- [ ] Fade out animation smooth
- [ ] Positioning correct at edges/corners
- [ ] No visual regressions

### Functional Testing
- [ ] Show on hover works
- [ ] Hide on mouse leave works
- [ ] Show on click works (if applicable)
- [ ] Hide on outside click works
- [ ] Multiple popovers work independently
- [ ] Rapid hover in/out doesn't break
- [ ] Animation interruption handled gracefully

### Positioning Testing
- [ ] Popover positioned correctly above trigger
- [ ] Popover positioned correctly below trigger
- [ ] Popover positioned correctly left of trigger
- [ ] Popover positioned correctly right of trigger
- [ ] Edge detection works (flips position near viewport edges)

### Performance Testing
- [ ] Smooth 60fps animations
- [ ] No jank on show/hide
- [ ] Positioning calculations lightweight

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (touch events)

---

## Potential Issues & Solutions

### Issue 1: Animation Interruption
**Problem**: User hovers in/out rapidly, animations conflict

**Solution**: Stop previous animation before starting new one
```javascript
// Stop existing animation
if (this.currentAnimation) {
  this.currentAnimation.stop()
}

// Start new animation
this.currentAnimation = animate(popover, { opacity: 1 }, { duration: 0.2 })
```

### Issue 2: Positioning Calculations
**Problem**: Positioning logic might be GSAP-specific

**Solution**: Position calculations are just math, should work the same. Just use `set()` to apply positions.

---

## Rollback Plan

If issues arise:
1. Identify specific issue (animation, positioning, etc.)
2. Revert to GSAP temporarily
3. Document issue clearly
4. Retry with fix

---

## Performance Notes

Popovers often show/hide frequently. Ensure:
- Animations are lightweight
- Stop previous animations to prevent conflicts
- Consider using `will-change: opacity` for smooth fades

```css
.popover {
  will-change: opacity, transform;
}
```

---

## Notes

- First Tier 1 module with actual animations (not just property setting)
- Good bridge between Tier 1 and Tier 2
- Establishes pattern for simple show/hide animations
- Can reuse pattern in other modules (Dropdown, Popup, etc.)

---

## Related Modules

- Popup (similar fade in/out pattern)
- Dropdown (similar show/hide)
- Tooltip modules

---

**Status**: Ready for migration
**Priority**: High (last Tier 1 module, establishes animation patterns)
**Risk Level**: Low
