# Migration: Cookies Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐ | **Time**: 2-3 hours | **File**: `src/modules/Cookies/index.js`

---

## Current GSAP Usage

- **Timeline**: Slide up/down animation for cookie banner
- **Properties**: `y`, `opacity`

```javascript
const tl = gsap.timeline()
tl.to(banner, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
```

---

## Migration Plan

**Convert to Motion**:
```javascript
// Simple single animation (no timeline needed)
animate(banner, {
  y: 0,
  opacity: 1
}, {
  duration: 0.4,
  easing: 'ease-out'
})

// Hide
animate(banner, {
  y: 100,  // Or height of banner
  opacity: 0
}, {
  duration: 0.3
})
```

---

## Key Points

- Simple slide + fade animation
- Set initial state: `set(banner, { y: 100, opacity: 0 })`
- Animate in on page load (after delay)
- Animate out on accept/decline

---

## Testing

- [ ] Banner slides up from bottom
- [ ] Fades in smoothly
- [ ] Accept button hides banner
- [ ] Decline button hides banner
- [ ] Cookie preference saved
- [ ] Doesn't show again after dismiss

---

**Risk**: Low | **Priority**: Medium
