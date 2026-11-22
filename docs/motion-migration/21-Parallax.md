# Migration: Parallax Module

**Tier**: 3 (Complex) | **Complexity**: ⭐⭐⭐⭐ | **Time**: 1 week | **File**: `src/modules/Parallax/index.js`

---

## Module Overview

Parallax creates scroll-linked parallax effects where elements move at different speeds based on scroll position. Likely uses GSAP for smooth position updates on scroll.

**Note**: Module file not fully audited yet, but parallax typically requires scroll-linked animations.

---

## Expected GSAP Usage

Based on typical parallax implementations:

- **Scroll event handling** - Update positions on scroll
- **gsap.to()** with low duration - Smooth position tweening
- **Properties**: `y`, `x`, possibly `scale`, `opacity`
- **Performance**: Throttled/debounced scroll updates

### Typical Pattern

```javascript
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  const speed = 0.5  // Parallax speed (slower than scroll)

  gsap.to(parallaxElement, {
    y: scrollY * speed,
    duration: 0.1,  // Very short for smoothness
    overwrite: 'auto'
  })
})
```

---

## Migration Difficulty

**Complex** ⭐⭐⭐⭐

**Reasons**:
- **Scroll performance critical** - Must be smooth 60fps
- **Multiple elements** - Each at different speeds
- **Scroll-linked animation** - Motion has special support for this!
- **Browser API differences** - Motion uses Scroll Timeline API

**Advantages**:
- ✅ **Motion's scroll() function** - Built for this exact use case!
- ✅ **Scroll Timeline API** - Hardware-accelerated scroll animations
- ✅ **Better performance than GSAP** - No per-frame scroll reads

---

## Migration Plan

### Approach 1: Motion scroll() Function (RECOMMENDED)

Use Motion's `scroll()` function which leverages Scroll Timeline API:

```javascript
import { animate, scroll } from 'motion'

// Create animation
const animation = animate(parallaxElement, {
  y: [0, -100]  // Move from 0 to -100 as scroll progresses
})

// Link to scroll
scroll(animation, {
  target: parallaxElement,  // Or container
  offset: ['start end', 'end start']  // When element enters/exits viewport
})
```

**Benefits**:
- Hardware-accelerated (Scroll Timeline API)
- No per-frame scroll position reads
- Smooth performance
- Simpler code

### Approach 2: Scroll Event + Motion Animate (Fallback)

If scroll() doesn't fit the use case:

```javascript
import { animate } from 'motion'

let ticking = false

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax()
      ticking = false
    })
    ticking = true
  }
})

function updateParallax() {
  const scrollY = window.scrollY

  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed || 0.5)
    const offset = scrollY * speed

    animate(el, { y: offset }, {
      duration: 0,  // Immediate update
    })
  })
}
```

**Note**: This is more like GSAP approach, but Motion animate is still more performant.

---

## Detailed Migration Steps

### Step 1: Identify Parallax Elements & Speeds

```javascript
// Data attribute API
<div data-parallax data-parallax-speed="0.5">
  Parallax content
</div>

// JavaScript
class Parallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]')
    this.setupParallax()
  }

  setupParallax() {
    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed || 0.5)
      this.createParallaxAnimation(el, speed)
    })
  }
}
```

### Step 2: Create Scroll-Linked Animations

**Using Motion scroll()**:

```javascript
createParallaxAnimation(element, speed) {
  // Calculate movement range based on speed
  const range = 200 * speed  // Adjust multiplier as needed

  // Create animation
  const animation = animate(element, {
    y: [-range/2, range/2]  // Move from -range to +range
  })

  // Link to scroll
  scroll(animation, {
    target: element,
    offset: ['start end', 'end start']  // Full viewport traverse
  })
}
```

### Step 3: Handle Different Scroll Ranges

```javascript
// Parallax only when element is in viewport
scroll(animation, {
  target: element,
  offset: [
    'start end',    // Element enters bottom of viewport
    'end start'     // Element exits top of viewport
  ]
})

// Parallax across entire page
scroll(animation, {
  target: document.documentElement,
  offset: ['start start', 'end end']
})
```

### Step 4: Optimize Performance

```javascript
// Add will-change for smooth animations
parallaxElements.forEach(el => {
  el.style.willChange = 'transform'
})

// Remove will-change after scroll stops (optional optimization)
let scrollTimeout
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    parallaxElements.forEach(el => {
      el.style.willChange = 'auto'
    })
  }, 200)
})
```

---

## Code Changes Checklist

### Investigation
- [ ] Read Parallax module source
- [ ] Document current GSAP implementation
- [ ] Identify all parallax speeds/ranges
- [ ] List configuration options

### Implementation
- [ ] Import Motion scroll()
- [ ] Replace scroll event handler with scroll() API
- [ ] Calculate movement ranges for each speed
- [ ] Set up scroll offset configurations
- [ ] Handle horizontal parallax (if needed)
- [ ] Add will-change optimization
- [ ] Remove GSAP import

### Testing
- [ ] Test vertical parallax
- [ ] Test horizontal parallax (if applicable)
- [ ] Test different speeds (0.2, 0.5, 0.8, etc.)
- [ ] Test multiple elements on page
- [ ] Test performance (60fps)
- [ ] Test on mobile (touch scroll)

---

## Testing Checklist

### Visual Testing
- [ ] Elements move at different speeds
- [ ] Movement feels smooth and natural
- [ ] No jittering or stuttering
- [ ] Parallax effect visually pleasing

### Functional Testing
- [ ] Scroll down - elements move correctly
- [ ] Scroll up - elements move in reverse
- [ ] Fast scroll - no animation lag
- [ ] Slow scroll - smooth movement
- [ ] Multiple parallax elements work independently

### Performance Testing
- [ ] Smooth 60fps scrolling
- [ ] No layout thrashing
- [ ] No forced reflows
- [ ] CPU usage reasonable
- [ ] Works on lower-end devices

### Browser Testing
- [ ] Chrome (Scroll Timeline API support)
- [ ] Firefox (may need polyfill)
- [ ] Safari (check compatibility)
- [ ] Mobile browsers
- [ ] Test with/without Scroll Timeline API support

---

## Scroll Timeline API Support

Motion's scroll() uses Scroll Timeline API when available, with graceful fallback.

**Check support**:
```javascript
const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()')
console.log('Scroll Timeline API:', supportsScrollTimeline)
```

**Polyfill**: Motion may include polyfill, or it gracefully degrades.

---

## Performance Notes

### Motion scroll() Advantages

1. **Hardware-accelerated** - Uses Scroll Timeline API
2. **No per-frame reads** - Doesn't measure scroll position every frame
3. **No layout thrashing** - Doesn't trigger style recalculations
4. **Efficient** - Browser handles scroll-animation link natively

### Comparison with GSAP Approach

**GSAP**:
- Scroll event listener fires frequently
- Reads scroll position (style recalculation)
- Updates styles (potential reflow)
- Even with RAF optimization, still JS-driven

**Motion**:
- Scroll Timeline API handles scroll-animation link
- No JS execution per scroll frame (if browser supports)
- Hardware-accelerated
- Much more performant

---

## Example: Complete Parallax Module

```javascript
import { animate, scroll } from 'motion'

class Parallax {
  constructor(options = {}) {
    this.options = {
      selector: '[data-parallax]',
      defaultSpeed: 0.5,
      ...options
    }

    this.init()
  }

  init() {
    this.elements = document.querySelectorAll(this.options.selector)

    if (this.elements.length === 0) return

    this.elements.forEach(el => this.setupElement(el))
  }

  setupElement(element) {
    const speed = parseFloat(
      element.dataset.parallaxSpeed || this.options.defaultSpeed
    )

    const direction = element.dataset.parallaxDirection || 'vertical'
    const range = parseFloat(element.dataset.parallaxRange || 200)

    // Calculate movement based on speed
    const movement = range * speed

    // Create animation based on direction
    const animationValues = direction === 'horizontal'
      ? { x: [-movement/2, movement/2] }
      : { y: [-movement/2, movement/2] }

    const animation = animate(element, animationValues)

    // Link to scroll
    scroll(animation, {
      target: element,
      offset: ['start end', 'end start']
    })

    // Store reference for cleanup
    if (!this.animations) this.animations = []
    this.animations.push(animation)
  }

  destroy() {
    // Stop all animations
    if (this.animations) {
      this.animations.forEach(animation => animation.stop())
    }
  }
}

export default Parallax
```

**Usage**:
```html
<div data-parallax data-parallax-speed="0.5">
  Slow parallax
</div>

<div data-parallax data-parallax-speed="0.8" data-parallax-direction="horizontal">
  Fast horizontal parallax
</div>
```

---

## Notes

- **Good candidate for Motion's scroll()** - Purpose-built for this
- **Performance will likely improve** vs GSAP implementation
- **Simpler code** - Scroll Timeline API handles complexity
- **Test browser support** - May need fallback for older browsers

---

**Status**: Ready for migration
**Priority**: Medium-High (depends on Parallax usage in projects)
**Risk Level**: Medium (scroll performance critical, but Motion scroll() is designed for this)
