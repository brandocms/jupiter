# Migration: HeroSlider Module

**Tier**: 2 (Moderate) | **Complexity**: ⭐⭐⭐ | **Time**: 5-6 hours | **File**: `src/modules/HeroSlider/index.js`

---

## Current GSAP Usage (from audit)

- **Timeline**: Parallax slide transitions
- **Properties**: `x`, `opacity`, `scale`
- **Parallax**: Different layers move at different speeds

```javascript
const slideTimeline = gsap.timeline()
slideTimeline.to(currentSlide, { x: '-100%', opacity: 0, duration: 0.8 })
slideTimeline.to(nextSlide, { x: '0%', opacity: 1, duration: 0.8 }, 0)  // Parallel

// Parallax layers (different speeds)
slideTimeline.to(bgLayer, { x: '-50%', duration: 0.8 }, 0)
slideTimeline.to(fgLayer, { x: '-150%', duration: 0.8 }, 0)
```

---

## Migration Plan

### Slide Transition

```javascript
const sequence = [
  // Slide out current
  [currentSlide, { x: '-100%', opacity: 0 }, { duration: 0.8, easing: 'ease-in-out' }],

  // Slide in next (parallel)
  [nextSlide, { x: '0%', opacity: 1 }, { duration: 0.8, easing: 'ease-in-out', at: 0 }],

  // Parallax background layer (slower)
  [bgLayer, { x: '-50%' }, { duration: 0.8, easing: 'ease-in-out', at: 0 }],

  // Parallax foreground layer (faster)
  [fgLayer, { x: '-150%' }, { duration: 0.8, easing: 'ease-in-out', at: 0 }]
]

animate(sequence)
```

### Autoplay

```javascript
class HeroSlider {
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next()
    }, this.options.autoplayDelay)
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval)
  }

  next() {
    this.stopAutoplay()
    this.transitionToSlide(this.currentIndex + 1)
    if (this.options.autoplay) {
      this.startAutoplay()
    }
  }
}
```

---

## Key Points

- Slide transitions with parallax layers
- Multiple elements move simultaneously at different speeds
- Autoplay functionality
- Pagination dots/arrows
- Touch/swipe support

---

## Testing

- [ ] Slides transition smoothly
- [ ] Parallax effect works (layers move at different speeds)
- [ ] Next/prev buttons work
- [ ] Pagination dots work
- [ ] Autoplay works
- [ ] Autoplay pauses on hover
- [ ] Autoplay resumes after interaction
- [ ] Touch/swipe works (mobile)
- [ ] Keyboard navigation works
- [ ] Loop mode works (last → first)

---

**Risk**: Medium (parallax coordination) | **Priority**: High
