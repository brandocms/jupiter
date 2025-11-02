# Migration: FixedHeader Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 4-5 hours | **File**: `src/modules/FixedHeader/index.js`

---

## Current GSAP Usage (from audit)

- **Timeline**: Header reveal on scroll
- **Stagger**: List items fade in with stagger
- **Properties**: `y`, `opacity`

```javascript
const tl = gsap.timeline()
tl.to(header, { y: 0, opacity: 1, duration: 0.35 })
tl.staggerTo('.nav-items', 0.3, { opacity: 1 }, 0.1)  // GSAP 2 legacy syntax
```

---

## Migration Plan

### Header Reveal
```javascript
animate(header, {
  y: 0,
  opacity: 1
}, {
  duration: 0.35,
  easing: 'ease-out'
})
```

### Stagger Items

**Option 1: Manual stagger**
```javascript
const items = document.querySelectorAll('.nav-items')
items.forEach((item, i) => {
  animate(item, { opacity: 1 }, {
    duration: 0.3,
    delay: 0.35 + (i * 0.1)  // After header + stagger
  })
})
```

**Option 2: Timeline array**
```javascript
const sequence = [
  [header, { y: 0, opacity: 1 }, { duration: 0.35 }]
]

// Add staggered items
const items = document.querySelectorAll('.nav-items')
items.forEach((item, i) => {
  sequence.push([item, { opacity: 1 }, {
    duration: 0.3,
    at: 0.35 + (i * 0.1)
  }])
})

animate(sequence)
```

---

## Key Points

- Header slides down + fades in on scroll down
- Nav items stagger in after header
- Slides up when scrolling up (hide)
- Uses scroll direction detection

---

## Testing

- [ ] Header appears when scrolling down
- [ ] Header hides when scrolling up
- [ ] Nav items stagger correctly
- [ ] Timing feels natural
- [ ] Works at different scroll speeds
- [ ] No jank during scroll

---

**Risk**: Medium (stagger + scroll integration) | **Priority**: High
