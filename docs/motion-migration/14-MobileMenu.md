# Migration: MobileMenu Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐⭐ | **Time**: 5-7 hours | **File**: `src/modules/MobileMenu/index.js`

---

## Current GSAP Usage (from audit)

- **Complex timeline**: Overlay + menu + nav items
- **Staggers**: Navigation items reveal
- **Properties**: `x`, `opacity`, possibly `autoAlpha`

```javascript
const openTimeline = gsap.timeline()
openTimeline.to(overlay, { opacity: 1, duration: 0.3 })
openTimeline.to(menu, { x: 0, duration: 0.35, ease: 'power2.out' }, '-=0.15')
openTimeline.staggerTo('.nav-item', 0.3, { opacity: 1, x: 0 }, 0.08, '>')
```

---

## Migration Plan

### Open Sequence

```javascript
const sequence = [
  // Fade in overlay
  [overlay, { opacity: 1 }, { duration: 0.3 }],

  // Slide in menu (overlaps with overlay)
  [menu, { x: 0 }, { duration: 0.35, easing: 'ease-out', at: 0.15 }],
]

// Add staggered nav items (after menu starts)
const navItems = document.querySelectorAll('.nav-item')
navItems.forEach((item, i) => {
  sequence.push([item, { opacity: 1, x: 0 }, {
    duration: 0.3,
    at: 0.5 + (i * 0.08)  // Start after menu, stagger 0.08s
  }])
})

animate(sequence)
```

### Close Sequence

```javascript
// Reverse order: items → menu → overlay

const sequence = []

// Fade out nav items (stagger in reverse)
const navItems = document.querySelectorAll('.nav-item')
navItems.forEach((item, i) => {
  sequence.push([item, { opacity: 0, x: -20 }, {
    duration: 0.2,
    at: i * 0.05
  }])
})

// Slide out menu
const itemsDelay = navItems.length * 0.05
sequence.push([menu, { x: -300 }, {
  duration: 0.3,
  at: itemsDelay
}])

// Fade out overlay
sequence.push([overlay, { opacity: 0 }, {
  duration: 0.25,
  at: itemsDelay + 0.15
}])

animate(sequence)
```

---

## Key Points

- **Most complex Tier 2 module**
- Three layers: overlay → menu → nav items
- Stagger in AND stagger out
- Proper sequencing critical for feel
- Lock body scroll when open
- Focus trapping

---

## Testing

- [ ] Hamburger icon opens menu
- [ ] Overlay fades in first
- [ ] Menu slides in from left/right
- [ ] Nav items stagger in beautifully
- [ ] Close reverses correctly
- [ ] Outside click closes
- [ ] ESC key closes
- [ ] Body scroll locked when open
- [ ] Focus trapped in menu
- [ ] Smooth on mobile devices

---

**Risk**: Medium-High (complex sequencing) | **Priority**: High
