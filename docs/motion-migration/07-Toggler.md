# Migration: Toggler Module

**Tier**: 2 (Moderate)
**Complexity**: ⭐⭐⭐ Moderate
**Estimated Time**: 4-6 hours
**File**: `src/modules/Toggler/index.js`

---

## Module Overview

Toggler handles expanding/collapsing content with smooth height animations. Uses GSAP for height tweening and opacity fades.

---

## Current GSAP Usage

### Patterns Found (from audit)
- **`gsap.to()`** - Height animations (expand/collapse)
- **Properties**: `height`, `opacity`, possibly `autoAlpha`

### Typical Code Pattern

```javascript
// Expand/Open
gsap.to(content, {
  height: 'auto',
  opacity: 1,
  duration: 0.35,
  ease: 'power2.out',
  onComplete: () => this.onOpenComplete()
})

// Collapse/Close
gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.25,
  ease: 'power2.in'
})
```

---

## Migration Difficulty

**Moderate** ⭐⭐⭐

**Reasons**:
- Height animations require special handling
- `height: 'auto'` needs workaround in Motion
- Toggle state management
- May use autoAlpha

**Challenges**:
- **Height: auto** - Need to measure actual height first
- **Height animation** - Can cause reflows if not handled well

---

## Dependencies

**Recommended**: Migrate after Popover and HeroVideo (similar animation patterns)

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
import { set, animateAutoAlpha } from '../../utils/motion-helpers'
```

### Step 2: Handle Height: Auto Pattern

GSAP can animate to `height: 'auto'`, but Motion cannot directly. We need to:
1. Measure the actual height
2. Animate to that height
3. Then set to 'auto' (so it's responsive)

**Helper function**:
```javascript
function getAutoHeight(element) {
  // Get current height
  const currentHeight = element.offsetHeight

  // Temporarily set to auto to measure
  element.style.height = 'auto'
  const autoHeight = element.offsetHeight

  // Reset to current
  element.style.height = `${currentHeight}px`

  return autoHeight
}
```

### Step 3: Replace Expand Animation

**Before (GSAP)**:
```javascript
gsap.to(content, {
  height: 'auto',
  opacity: 1,
  duration: 0.35,
  ease: 'power2.out',
  onComplete: () => this.onOpenComplete()
})
```

**After (Motion)**:
```javascript
// Measure target height
const targetHeight = getAutoHeight(content)

// Animate to measured height
animate(content, {
  height: targetHeight,
  opacity: 1
}, {
  duration: 0.35,
  easing: 'ease-out',
  onComplete: () => {
    // Set to auto for responsiveness
    content.style.height = 'auto'
    this.onOpenComplete()
  }
})
```

### Step 4: Replace Collapse Animation

**Before (GSAP)**:
```javascript
gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.25,
  ease: 'power2.in'
})
```

**After (Motion)**:
```javascript
// Set explicit height first (if currently 'auto')
if (content.style.height === 'auto' || !content.style.height) {
  content.style.height = `${content.offsetHeight}px`
}

// Then animate to 0
animate(content, {
  height: 0,
  opacity: 0
}, {
  duration: 0.25,
  easing: 'ease-in'
})
```

### Step 5: Create Reusable Toggler Methods

```javascript
class Toggler {
  expand(element, options = {}) {
    const { duration = 0.35, onComplete } = options

    // Get target height
    const currentHeight = element.offsetHeight
    element.style.height = 'auto'
    const targetHeight = element.offsetHeight
    element.style.height = `${currentHeight}px`

    // Force reflow
    element.offsetHeight

    // Animate
    return animate(element, {
      height: targetHeight,
      opacity: 1
    }, {
      duration,
      easing: 'ease-out',
      onComplete: () => {
        element.style.height = 'auto'
        onComplete?.()
      }
    })
  }

  collapse(element, options = {}) {
    const { duration = 0.25, onComplete } = options

    // Set explicit height if needed
    if (element.style.height === 'auto' || !element.style.height) {
      element.style.height = `${element.offsetHeight}px`
      element.offsetHeight  // Force reflow
    }

    // Animate to 0
    return animate(element, {
      height: 0,
      opacity: 0
    }, {
      duration,
      easing: 'ease-in',
      onComplete
    })
  }
}
```

### Step 6: Test & Cleanup
- Test expand/collapse
- Test rapid toggling
- Test responsiveness (resize during open state)
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import Motion and utilities
- [ ] Create `getAutoHeight` helper (or add to motion-helpers)
- [ ] Replace expand animations
- [ ] Replace collapse animations
- [ ] Handle height: auto → measured height conversion
- [ ] Set height: auto after expand completes
- [ ] Set explicit height before collapse starts
- [ ] Test expand animation
- [ ] Test collapse animation
- [ ] Test rapid toggling
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Expand animation smooth and natural
- [ ] Collapse animation smooth
- [ ] No jumps or flickers
- [ ] Height animates correctly
- [ ] Opacity fades in/out correctly

### Functional Testing
- [ ] Click to expand works
- [ ] Click to collapse works
- [ ] Toggle (click when open) works
- [ ] Rapid clicking doesn't break
- [ ] Multiple togglers work independently
- [ ] Initial state correct (open/closed based on config)

### Edge Cases
- [ ] Content with images (height changes when images load)
- [ ] Content with variable height
- [ ] Nested togglers
- [ ] Toggler inside toggler
- [ ] Empty content
- [ ] Very tall content (performance)

### Responsive Testing
- [ ] Resize window while content open (height: auto should adapt)
- [ ] Mobile: touch events work
- [ ] Different screen sizes
- [ ] Content reflows correctly

### Performance Testing
- [ ] Smooth 60fps animation
- [ ] No layout thrashing
- [ ] Height measurement doesn't cause visible reflows

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Potential Issues & Solutions

### Issue 1: Height: Auto Not Responsive
**Problem**: Forgot to set height: auto after animation

**Solution**: Always set `height: 'auto'` in onComplete:
```javascript
onComplete: () => {
  element.style.height = 'auto'
}
```

### Issue 2: Jump When Collapsing
**Problem**: Element is at height: auto, trying to animate to 0 causes jump

**Solution**: Set explicit height first, force reflow, then animate:
```javascript
element.style.height = `${element.offsetHeight}px`
element.offsetHeight  // Force reflow
animate(element, { height: 0 }, options)
```

### Issue 3: Rapid Toggling
**Problem**: User clicks rapidly, animations conflict

**Solution**: Cancel previous animation:
```javascript
if (this.currentAnimation) {
  this.currentAnimation.stop()
}
this.currentAnimation = animate(...)
```

### Issue 4: Content Height Changes During Animation
**Problem**: Images load during animation, height is wrong

**Solution**:
- Wait for images to load before measuring
- Or remeasure if content changes
- Or use fixed heights

---

## Performance Notes

Height animations can trigger layout recalculations. To optimize:

1. **Use will-change**:
```css
.toggler-content {
  will-change: height, opacity;
}
```

2. **Measure Once**: Cache height measurement if content doesn't change

3. **Batch Measurements**: If toggling multiple items, measure all first, then animate

4. **Consider max-height**: Instead of height animation:
```javascript
// Alternative approach (no measurement needed)
animate(element, {
  maxHeight: 1000,  // Arbitrary large value
  opacity: 1
})
```

---

## Alternative Approach: Max-Height

If height measurement is problematic, use max-height instead:

```javascript
// Expand
animate(element, {
  maxHeight: 1000,  // Set higher than any expected content
  opacity: 1
})

// Collapse
animate(element, {
  maxHeight: 0,
  opacity: 0
})
```

**Pros**: No measurement needed
**Cons**: Animation timing may feel off if content much smaller than maxHeight

---

## Rollback Plan

If issues arise:
1. Check height measurement logic
2. Verify height: auto is being set after expand
3. Check for animation conflicts
4. Revert to GSAP if blocking issues
5. Consider max-height alternative

---

## Notes

- **Most complex Tier 2 module** due to height: auto handling
- Good test of Motion animation skills
- Pattern applies to accordions, dropdowns, etc.
- Take time to get this right - it's a common pattern

---

## Related Modules

- Dropdown (similar expand/collapse)
- MobileMenu (similar height animations)
- Any accordion-style component

---

**Status**: Ready for migration
**Priority**: High (common pattern, but complex)
**Risk Level**: Medium (height: auto requires careful handling)
