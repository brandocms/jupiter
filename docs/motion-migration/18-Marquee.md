# Migration: Marquee Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 4-5 hours | **File**: `src/modules/Marquee/index.js`

---

## Current GSAP Usage (from audit)

- **Infinite timeline**: Continuous scrolling
- **Properties**: `x` (horizontal scroll)
- **Timeline methods**: `repeat(-1)`, `timeScale()`, `totalProgress()`

```javascript
const tl = gsap.timeline({ repeat: -1 })
tl.to(marqueeContent, {
  x: -totalWidth,
  duration: 20,
  ease: 'none'
})

// Speed control
tl.timeScale(1.5)  // Faster

// Set starting position
tl.totalProgress(0.5)  // Start halfway
```

---

## Migration Plan

### Basic Infinite Scroll

```javascript
animate(marqueeContent, {
  x: -totalWidth
}, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'  // 'none' in GSAP = 'linear' in Motion
})
```

### Speed Control

```javascript
const animation = animate(marqueeContent, {
  x: -totalWidth
}, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})

// Speed up/down
animation.speed = 1.5  // Faster (GSAP's timeScale equivalent)
animation.speed = 0.5  // Slower
```

### Starting Position

```javascript
// GSAP: timeline.totalProgress(0.5)
// Motion: Use delay or initial x value

// Option 1: Set starting position
set(marqueeContent, { x: -totalWidth * 0.5 })
animate(marqueeContent, { x: -totalWidth }, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})

// Option 2: Use animation.time
const animation = animate(marqueeContent, { x: -totalWidth }, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})
animation.time = 10  // Start halfway through 20s duration
```

### Seamless Loop

For seamless marquee, clone content:

```javascript
// Clone marquee content for seamless loop
const clone = marqueeContent.cloneNode(true)
marqueeContainer.appendChild(clone)

// Animate both (offset by width)
set(clone, { x: totalWidth })
animate(marqueeContent, { x: -totalWidth }, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})
animate(clone, { x: 0 }, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})
```

---

## Key Points

- Infinite continuous scrolling
- Linear easing (no easing, constant speed)
- Speed control (animation.speed)
- Seamless loop (clone content)
- Pause on hover (optional)

---

## Testing

- [ ] Marquee scrolls continuously
- [ ] Speed is consistent
- [ ] Loop is seamless (no gap/jump)
- [ ] Pause on hover works (if enabled)
- [ ] Speed control works
- [ ] Starting position works (if configured)
- [ ] Multiple marquees work independently
- [ ] Responsive (different screen sizes)

---

## Performance Notes

Infinite animations should use `will-change`:

```css
.marquee-content {
  will-change: transform;
}
```

Consider using CSS `animation` for simple marquees (better performance):

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.marquee-content {
  animation: marquee 20s linear infinite;
}
```

But JavaScript needed for:
- Dynamic speed control
- Pause/play
- Starting position
- Complex interactions

---

**Risk**: Low-Medium | **Priority**: Medium
