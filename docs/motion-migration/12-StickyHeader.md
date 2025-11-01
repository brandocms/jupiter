# Migration: StickyHeader Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 4-5 hours | **File**: `src/modules/StickyHeader/index.js`

---

## Current GSAP Usage (from audit)

- **Timeline**: Auxiliary header animations
- **Stagger**: List items reveal
- **Properties**: `y`, `opacity`, positioning

Similar to FixedHeader with additional auxiliary header logic.

---

## Migration Plan

```javascript
// Main header stick
animate(header, {
  y: 0,
  opacity: 1
}, {
  duration: 0.35,
  easing: 'ease-out'
})

// Auxiliary header (if applicable)
animate(auxHeader, {
  y: -50,  // Slide up and hide
  opacity: 0
}, {
  duration: 0.3
})

// Stagger nav items
import { stagger } from '../../utils/motion-helpers'
stagger('.nav-items', { opacity: 1 }, {
  duration: 0.3,
  stagger: 0.1,
  delay: 0.35
})
```

---

## Key Points

- Similar to FixedHeader
- May have auxiliary/secondary header
- Sticky positioning combined with animations
- Scroll threshold triggers animation

---

## Testing

- [ ] Header sticks at scroll threshold
- [ ] Auxiliary header behavior correct
- [ ] Stagger animations smooth
- [ ] Works with CSS sticky positioning
- [ ] Mobile behavior correct

---

**Risk**: Medium | **Priority**: High
