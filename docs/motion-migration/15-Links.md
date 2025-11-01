# Migration: Links Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 4-5 hours | **File**: `src/modules/Links/index.js`

---

## Current GSAP Usage (from audit)

- **Page transitions**: Fade out current, fade in new
- **Properties**: `opacity`, possibly `y` for slide effects
- **No timelines**: Simple transitions

```javascript
// Fade out current page
gsap.to(currentPage, {
  opacity: 0,
  y: -20,
  duration: 0.3,
  onComplete: () => navigateToNewPage()
})

// Fade in new page (after navigation)
gsap.from(newPage, {
  opacity: 0,
  y: 20,
  duration: 0.4,
  ease: 'power2.out'
})
```

---

## Migration Plan

### Page Exit Animation

```javascript
animate(currentPage, {
  opacity: 0,
  y: -20
}, {
  duration: 0.3,
  onComplete: () => {
    // Navigate to new page
    window.location.href = newUrl
  }
})
```

### Page Enter Animation

```javascript
// On new page load
animate(document.body, {
  opacity: [0, 1],
  y: [20, 0]
}, {
  duration: 0.4,
  easing: 'ease-out'
})
```

---

## Key Points

- Smooth page transitions on link clicks
- Fade out → navigate → fade in
- May need to intercept link clicks
- Consider using History API for SPA transitions

---

## Testing

- [ ] Click link fades out current page
- [ ] New page fades in smoothly
- [ ] Back button works
- [ ] External links not affected
- [ ] Hash links not affected
- [ ] Works with browser navigation

---

**Risk**: Low-Medium | **Priority**: Medium
