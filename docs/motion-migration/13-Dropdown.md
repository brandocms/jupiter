# Migration: Dropdown Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 4-6 hours | **File**: `src/modules/Dropdown/index.js`

---

## Current GSAP Usage (from audit)

- **Timeline**: Menu open/close sequences
- **Stagger**: Menu items reveal
- **Properties**: `height`, `opacity`, `y`

```javascript
const openTimeline = gsap.timeline()
openTimeline.to(menu, { height: 'auto', duration: 0.3 })
openTimeline.staggerTo('.menu-item', 0.2, { opacity: 1, y: 0 }, 0.05)
```

---

## Migration Plan

### Open Menu

Similar to Toggler (height: auto challenge):

```javascript
// Measure target height
const currentHeight = menu.offsetHeight
menu.style.height = 'auto'
const targetHeight = menu.offsetHeight
menu.style.height = `${currentHeight}px`

// Animate height
const sequence = [
  // Expand menu
  [menu, { height: targetHeight, opacity: 1 }, {
    duration: 0.3,
    easing: 'ease-out',
    onComplete: () => {
      menu.style.height = 'auto'
    }
  }]
]

// Add staggered items
const items = document.querySelectorAll('.menu-item')
items.forEach((item, i) => {
  sequence.push([item, { opacity: 1, y: 0 }, {
    duration: 0.2,
    at: 0.1 + (i * 0.05)  // Start slightly after menu expand
  }])
})

animate(sequence)
```

### Close Menu

```javascript
// Set explicit height
menu.style.height = `${menu.offsetHeight}px`
menu.offsetHeight  // Force reflow

// Fade items first
const items = document.querySelectorAll('.menu-item')
items.forEach((item, i) => {
  animate(item, { opacity: 0, y: -10 }, {
    duration: 0.15,
    delay: i * 0.03
  })
})

// Then collapse menu
setTimeout(() => {
  animate(menu, { height: 0, opacity: 0 }, { duration: 0.25 })
}, items.length * 0.03 + 0.15)
```

---

## Key Points

- Combines Toggler height logic + stagger animations
- Height: auto measurement required
- Stagger items on open
- Reverse stagger on close (optional)

---

## Testing

- [ ] Dropdown opens smoothly
- [ ] Height animates correctly
- [ ] Menu items stagger in
- [ ] Dropdown closes smoothly
- [ ] Height: auto is responsive
- [ ] Multiple dropdowns work independently
- [ ] Keyboard navigation works

---

**Risk**: Medium (height: auto + stagger) | **Priority**: High
