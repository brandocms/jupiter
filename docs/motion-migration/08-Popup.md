# Migration: Popup Module

**Tier**: 2 (Moderate)
**Complexity**: ⭐⭐ Low-Moderate
**Estimated Time**: 3-4 hours
**File**: `src/modules/Popup/index.js`

---

## Module Overview

Popup creates modal dialogs/popups with overlay and content animations. Uses GSAP for fade and transform animations.

---

## Current GSAP Usage

### Patterns Found (from audit)
- **`gsap.to()`** - Opacity and transform animations
- **Properties**: `opacity`, `scale`, `y`, possibly `autoAlpha`

### Typical Code Pattern

```javascript
// Show popup
gsap.to(overlay, { opacity: 1, duration: 0.3 })
gsap.to(content, {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: 0.35,
  ease: 'power2.out'
})

// Hide popup
gsap.to(overlay, { opacity: 0, duration: 0.25 })
gsap.to(content, {
  opacity: 0,
  scale: 0.95,
  y: 20,
  duration: 0.25
})
```

---

## Migration Difficulty

**Low-Moderate** ⭐⭐

**Reasons**:
- Simple property animations
- Parallel animations (overlay + content)
- No complex timelines

**Moderate aspects**:
- Multiple elements animating simultaneously
- May need to sequence overlay and content
- Focus management (not animation-related but important)

---

## Dependencies

**Recommended**: Migrate after Popover (similar pattern)

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
import { set, animateAutoAlpha } from '../../utils/motion-helpers'
```

### Step 2: Set Initial States

**Before (GSAP)**:
```javascript
gsap.set(overlay, { opacity: 0 })
gsap.set(content, { opacity: 0, scale: 0.95, y: 20 })
```

**After (Motion)**:
```javascript
set(overlay, { opacity: 0 })
set(content, { opacity: 0, scale: 0.95, y: 20 })
```

### Step 3: Replace Show Animations

**Before (GSAP)**:
```javascript
gsap.to(overlay, { opacity: 1, duration: 0.3 })
gsap.to(content, {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: 0.35,
  ease: 'power2.out',
  delay: 0.05  // Slight delay after overlay
})
```

**After (Motion)**:
```javascript
// Animate overlay
animate(overlay, {
  opacity: 1
}, {
  duration: 0.3
})

// Animate content with slight delay
animate(content, {
  opacity: 1,
  scale: 1,
  y: 0
}, {
  duration: 0.35,
  easing: 'ease-out',
  delay: 0.05
})
```

**Or use Timeline for coordination**:
```javascript
const showSequence = [
  [overlay, { opacity: 1 }, { duration: 0.3 }],
  [content, { opacity: 1, scale: 1, y: 0 }, { duration: 0.35, easing: 'ease-out' }]
]
animate(showSequence)
```

### Step 4: Replace Hide Animations

**Before (GSAP)**:
```javascript
gsap.to(content, {
  opacity: 0,
  scale: 0.95,
  y: 20,
  duration: 0.25
})

gsap.to(overlay, {
  opacity: 0,
  duration: 0.25,
  delay: 0.05  // After content starts fading
})
```

**After (Motion)**:
```javascript
// Animate content first
animate(content, {
  opacity: 0,
  scale: 0.95,
  y: 20
}, {
  duration: 0.25
})

// Fade overlay with delay
animate(overlay, {
  opacity: 0
}, {
  duration: 0.25,
  delay: 0.05
})
```

**Or use Timeline**:
```javascript
const hideSequence = [
  [content, { opacity: 0, scale: 0.95, y: 20 }, { duration: 0.25 }],
  [overlay, { opacity: 0 }, { duration: 0.25, at: 0.05 }]  // Start at 0.05s
]
animate(hideSequence)
```

### Step 5: Manage Animation References

```javascript
class Popup {
  constructor() {
    this.overlayAnimation = null
    this.contentAnimation = null
  }

  show() {
    // Stop any existing animations
    this.stopAnimations()

    // Animate
    this.overlayAnimation = animate(this.overlay, { opacity: 1 }, { duration: 0.3 })
    this.contentAnimation = animate(this.content, {
      opacity: 1,
      scale: 1,
      y: 0
    }, {
      duration: 0.35,
      easing: 'ease-out',
      delay: 0.05
    })
  }

  hide() {
    this.stopAnimations()

    this.contentAnimation = animate(this.content, {
      opacity: 0,
      scale: 0.95,
      y: 20
    }, { duration: 0.25 })

    this.overlayAnimation = animate(this.overlay, {
      opacity: 0
    }, {
      duration: 0.25,
      delay: 0.05,
      onComplete: () => this.onHideComplete()
    })
  }

  stopAnimations() {
    if (this.overlayAnimation) this.overlayAnimation.stop()
    if (this.contentAnimation) this.contentAnimation.stop()
  }
}
```

### Step 6: Test & Cleanup
- Test open animation
- Test close animation
- Test rapid open/close
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import Motion and utilities
- [ ] Replace initial state setting
- [ ] Replace show animations (overlay + content)
- [ ] Replace hide animations (overlay + content)
- [ ] Add animation reference tracking
- [ ] Implement stop/cancel for rapid open/close
- [ ] Update callbacks (onComplete, etc.)
- [ ] Test show animation
- [ ] Test hide animation
- [ ] Test outside click close
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Overlay fades in smoothly
- [ ] Content fades + scales + slides smoothly
- [ ] Animation feels natural (not too fast/slow)
- [ ] Hide animation reverses correctly
- [ ] No visual glitches

### Functional Testing
- [ ] Open button triggers popup
- [ ] Close button hides popup
- [ ] Outside click closes (if enabled)
- [ ] ESC key closes (if enabled)
- [ ] Multiple popups work independently
- [ ] Rapid open/close doesn't break
- [ ] Body scroll locked when open (if implemented)
- [ ] Focus management works (trap focus in popup)

### Accessibility Testing
- [ ] Focus moves to popup when opened
- [ ] Focus trapped in popup (can't tab outside)
- [ ] Focus returns to trigger when closed
- [ ] ESC key closes popup
- [ ] Screen reader announces popup
- [ ] ARIA attributes correct (role="dialog", aria-modal, etc.)

### Performance Testing
- [ ] Smooth 60fps animations
- [ ] No jank when opening/closing
- [ ] Works smoothly on mobile

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Potential Issues & Solutions

### Issue 1: Animation Overlap
**Problem**: Content animates before overlay visible

**Solution**: Add small delay to content or use timeline for proper sequencing.

### Issue 2: Rapid Open/Close
**Problem**: User clicks rapidly, animations conflict

**Solution**: Stop previous animations before starting new ones (see example above).

### Issue 3: AutoAlpha Usage
**Problem**: Module uses autoAlpha for overlay

**Solution**: Use `animateAutoAlpha` utility or manually handle visibility:
```javascript
// Show
overlay.style.visibility = 'visible'
animate(overlay, { opacity: 1 })

// Hide
animate(overlay, { opacity: 0 }, {
  onComplete: () => {
    overlay.style.visibility = 'hidden'
  }
})
```

---

## Performance Notes

Popups often overlay entire page. Optimize:

```css
.popup-overlay {
  will-change: opacity;
}

.popup-content {
  will-change: opacity, transform;
}
```

Consider:
- Remove `will-change` after animation completes
- Use hardware acceleration (transform properties)
- Test on lower-end devices

---

## Rollback Plan

If issues arise:
1. Check animation sequencing (overlay vs content)
2. Verify callbacks fire correctly (onComplete for cleanup)
3. Test focus management (separate from animations)
4. Revert to GSAP if blocking issues

---

## Notes

- Similar pattern to Popover but with overlay
- Good module for learning parallel animations
- Timeline approach is cleaner for sequencing
- Focus on animation feel (timing, easing)

---

## Related Modules

- Popover (similar fade animations)
- MobileMenu (similar overlay pattern)
- Lightbox (similar modal pattern)

---

**Status**: Ready for migration
**Priority**: Medium-High (common UI pattern)
**Risk Level**: Low
