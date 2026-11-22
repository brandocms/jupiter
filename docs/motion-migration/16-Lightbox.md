# Migration: Lightbox Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 5-6 hours | **File**: `src/modules/Lightbox/index.js`

---

## Current GSAP Usage (from audit)

- **Timeline**: Image transitions, caption fades
- **Properties**: `opacity`, `scale`, possibly `x` for slide transitions
- **Stagger**: Dot indicators (if pagination)

```javascript
const showTimeline = gsap.timeline()
showTimeline.to(overlay, { opacity: 1, duration: 0.3 })
showTimeline.to(image, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.1')
showTimeline.to(caption, { opacity: 1, y: 0, duration: 0.3 })

// Image transitions
const transitionTimeline = gsap.timeline()
transitionTimeline.to(currentImage, { opacity: 0, duration: 0.25 })
transitionTimeline.to(nextImage, { opacity: 1, duration: 0.25 })
```

---

## Migration Plan

### Open Lightbox

```javascript
const sequence = [
  [overlay, { opacity: 1 }, { duration: 0.3 }],
  [image, { opacity: 1, scale: 1 }, { duration: 0.4, easing: 'ease-out', at: 0.2 }],
  [caption, { opacity: 1, y: 0 }, { duration: 0.3, at: 0.5 }]
]
animate(sequence)
```

### Close Lightbox

```javascript
const sequence = [
  [caption, { opacity: 0, y: 10 }, { duration: 0.2 }],
  [image, { opacity: 0, scale: 0.95 }, { duration: 0.25, at: 0.1 }],
  [overlay, { opacity: 0 }, { duration: 0.25, at: 0.2 }]
]
animate(sequence)
```

### Navigate Between Images

**Crossfade**:
```javascript
const sequence = [
  [currentImage, { opacity: 0 }, { duration: 0.25 }],
  [nextImage, { opacity: 1 }, { duration: 0.25, at: 0.1 }],  // Slight overlap
  [caption, { opacity: [0, 1] }, { duration: 0.2, at: 0.25 }]
]
animate(sequence)
```

**Or slide**:
```javascript
const sequence = [
  [currentImage, { x: -100, opacity: 0 }, { duration: 0.3 }],
  [nextImage, { x: [100, 0], opacity: [0, 1] }, { duration: 0.3, at: 0 }]  // Parallel
]
animate(sequence)
```

---

## Key Points

- Open: overlay → image → caption sequence
- Close: reverse order
- Image navigation: crossfade or slide
- Keyboard navigation (arrows, ESC)
- Touch/swipe support

---

## Testing

- [ ] Click thumbnail opens lightbox
- [ ] Image scales + fades in
- [ ] Caption appears after image
- [ ] Next/prev buttons work
- [ ] Keyboard arrows navigate
- [ ] ESC closes lightbox
- [ ] Touch swipe works (mobile)
- [ ] Outside click closes
- [ ] Image transitions smooth
- [ ] Pagination dots update

---

**Risk**: Medium (multiple animation sequences) | **Priority**: High
