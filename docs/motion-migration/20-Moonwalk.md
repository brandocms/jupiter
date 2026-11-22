# Migration: Moonwalk Module

**Tier**: 3 (Complex) | **Complexity**: ⭐⭐⭐⭐⭐ | **Time**: 2-3 weeks | **File**: `src/modules/Moonwalk/index.js`

---

## Module Overview

Moonwalk is the **most complex module** in the codebase. It creates scroll-reveal animations with sophisticated timeline management, dynamic tween insertion, and IntersectionObserver integration.

**Key Insight**: Moonwalk already uses IntersectionObserver (same as Motion's `inView`!), which significantly simplifies migration potential.

---

## Current GSAP Usage (from audit)

### Complex Timeline Features

1. **Dynamic timeline insertion** - `timeline.recent()` to get last tween
2. **Position calculation** - Adding tweens at specific positions
3. **Timeline state inspection** - `timeline.time()`, `.endTime()`, `.isActive()`
4. **Runtime tween insertion** - Adding animations based on scroll events
5. **Stagger animations** - Multiple elements with stagger delays
6. **Alpha tweens** - Separate opacity animations

### Code Patterns

```javascript
// Create timeline
this.timeline = gsap.timeline({ paused: true })

// Add element to timeline dynamically
this.timeline.to(element, { y: 0, opacity: 1, duration: 0.6 })

// Get last added tween
const recent = this.timeline.recent()

// Add another tween at specific position
this.timeline.to(element, { scale: 1 }, recent.endTime(), '>')

// Play timeline when element enters viewport (IntersectionObserver)
if (entry.isIntersecting) {
  this.timeline.play()
}
```

---

## Migration Difficulty

**Extremely Complex** ⭐⭐⭐⭐⭐

**Reasons**:
- **Dynamic timeline insertion** - Motion timelines are declarative (pre-defined arrays)
- **timeline.recent()** - No Motion equivalent
- **Runtime position calculation** - GSAP-specific
- **Complex state management** - Timeline state inspection

**However**:
- ✅ **Already uses IntersectionObserver** - alignment with Motion!
- ✅ This is a huge advantage - we can leverage this

---

## Migration Strategy

Two possible approaches:

### Approach 1: Refactor to Pre-Computed Timelines (Traditional)

Pre-compute entire timeline array upfront, then trigger with IntersectionObserver.

**Pros**: Uses Motion timelines as designed
**Cons**: Major refactoring, changes architecture

### Approach 2: IntersectionObserver + Individual Animations (RECOMMENDED)

Simplify Moonwalk by ditching complex timeline management. Use IntersectionObserver to trigger individual element animations.

**Pros**: Simpler, aligned with Motion philosophy, leverages existing IntersectionObserver
**Cons**: Different architecture, may need to adjust default animations

---

## Recommended Approach: Simplify with IntersectionObserver

Instead of complex timeline management, use IntersectionObserver (which Moonwalk already has!) to trigger individual animations.

### Current Architecture

```
IntersectionObserver → Timeline plays → Elements animate
```

### New Architecture

```
IntersectionObserver → Individual element animations trigger
```

---

## Migration Plan (Simplified Approach)

### Phase 1: Analysis (2-3 days)

1. Document all current Moonwalk animation types
2. Identify common patterns (fade in, slide up, scale, etc.)
3. List all configuration options
4. Understand stagger logic
5. Document entry/exit animations

### Phase 2: Create Animation Presets (3-4 days)

Define reusable animation presets:

```javascript
const ANIMATION_PRESETS = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    options: { duration: 0.6, easing: 'ease-out' }
  },

  slideUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    options: { duration: 0.6, easing: 'ease-out' }
  },

  scale: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    options: { duration: 0.6, easing: 'ease-out' }
  },

  slideLeft: {
    from: { opacity: 0, x: 40 },
    to: { opacity: 1, x: 0 },
    options: { duration: 0.6, easing: 'ease-out' }
  }
}
```

### Phase 3: Refactor IntersectionObserver Callback (5-7 days)

```javascript
class Moonwalk {
  constructor(options) {
    this.options = _defaultsDeep(options, {
      animationType: 'fadeIn',
      stagger: 0.1,
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    })

    this.setupIntersectionObserver()
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    )

    this.elements = document.querySelectorAll('[data-moonwalk]')
    this.elements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.moonwalkAnimated) {
        this.animateElement(entry.target)
        entry.target.dataset.moonwalkAnimated = 'true'

        // Optionally unobserve after animation
        if (!this.options.repeat) {
          this.observer.unobserve(entry.target)
        }
      }
    })
  }

  animateElement(element) {
    // Get animation type from data attribute or default
    const animationType = element.dataset.moonwalkAnimation || this.options.animationType
    const preset = ANIMATION_PRESETS[animationType]

    if (!preset) {
      console.warn(`Unknown animation type: ${animationType}`)
      return
    }

    // Set initial state
    set(element, preset.from)

    // Get delay (for stagger)
    const index = Array.from(this.elements).indexOf(element)
    const delay = index * this.options.stagger

    // Animate
    animate(element, preset.to, {
      ...preset.options,
      delay,
      onComplete: () => this.onElementAnimated(element)
    })
  }

  onElementAnimated(element) {
    // Callback for when element animation completes
    if (this.options.onReveal) {
      this.options.onReveal(element)
    }
  }
}
```

### Phase 4: Handle Stagger (2-3 days)

Stagger is already handled above (delay based on index), but refine:

```javascript
getStaggerDelay(element, container) {
  // Get all moonwalk elements in container
  const siblings = Array.from(container.querySelectorAll('[data-moonwalk]'))
  const index = siblings.indexOf(element)

  // Calculate delay
  return index * this.options.stagger
}
```

### Phase 5: Handle Advanced Features (3-5 days)

**Container-based stagger**:
```javascript
// Elements within same container stagger together
const containers = document.querySelectorAll('[data-moonwalk-container]')
containers.forEach(container => {
  const elements = container.querySelectorAll('[data-moonwalk]')
  elements.forEach((el, i) => {
    // Set delay based on position in container
    el.dataset.moonwalkDelay = i * this.options.stagger
  })
})
```

**Reverse animation (exit)**:
```javascript
handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      this.animateIn(entry.target)
    } else if (this.options.animateOut) {
      this.animateOut(entry.target)
    }
  })
}

animateOut(element) {
  const animationType = element.dataset.moonwalkAnimation || this.options.animationType
  const preset = ANIMATION_PRESETS[animationType]

  // Reverse animation
  animate(element, preset.from, {
    ...preset.options,
    duration: preset.options.duration * 0.7  // Slightly faster exit
  })
}
```

### Phase 6: Migration from Old API (3-4 days)

Provide backwards compatibility or migration guide:

**Old API**:
```javascript
new Moonwalk({
  elements: '.reveal',
  threshold: 0.3
})
```

**New API (same)**:
```javascript
new Moonwalk({
  elements: '.reveal',  // or auto-detect [data-moonwalk]
  animationType: 'slideUp',
  threshold: 0.3,
  stagger: 0.1
})
```

### Phase 7: Testing (5-7 days)

Extensive testing required - Moonwalk is heavily used.

---

## Code Changes Checklist

### Investigation
- [ ] Document all Moonwalk animation types
- [ ] List all configuration options
- [ ] Understand stagger implementation
- [ ] Identify breaking changes

### Implementation
- [ ] Create animation presets
- [ ] Refactor IntersectionObserver callback
- [ ] Implement Motion animations
- [ ] Handle stagger logic
- [ ] Handle container-based groups
- [ ] Implement exit animations (if needed)
- [ ] Add data attribute API (`data-moonwalk-animation`)
- [ ] Remove GSAP timeline code
- [ ] Update configuration options

### Testing
- [ ] Test fade in animations
- [ ] Test slide animations (up, down, left, right)
- [ ] Test scale animations
- [ ] Test stagger timing
- [ ] Test container-based stagger
- [ ] Test threshold configurations
- [ ] Test rootMargin configurations
- [ ] Test on long pages with many elements
- [ ] Test performance (100+ elements)
- [ ] Run Playwright Moonwalk tests

---

## Testing Checklist

### Animation Types
- [ ] Fade in
- [ ] Slide up
- [ ] Slide down
- [ ] Slide left
- [ ] Slide right
- [ ] Scale
- [ ] Custom animations (via data attributes)

### Stagger Behavior
- [ ] Individual elements stagger correctly
- [ ] Container-based stagger works
- [ ] Stagger timing feels natural
- [ ] Delay calculations correct

### Intersection Observer
- [ ] Elements animate when entering viewport
- [ ] Threshold settings respected
- [ ] Root margin settings work
- [ ] Elements only animate once (if repeat: false)
- [ ] Elements re-animate on re-enter (if repeat: true)

### Performance
- [ ] Smooth 60fps animations
- [ ] Many elements (100+) don't cause jank
- [ ] IntersectionObserver efficient
- [ ] No memory leaks

### Edge Cases
- [ ] Elements already in viewport on page load
- [ ] Elements above fold
- [ ] Fast scrolling
- [ ] Slow scrolling
- [ ] Mobile devices
- [ ] Touch scrolling

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Breaking Changes

### Removed Features
- ❌ **Dynamic timeline insertion** - No longer supported
- ❌ **timeline.recent()** - Not needed in new architecture
- ❌ **Complex timeline position parameters** - Simplified

### Changed Features
- ⚠️ **Animation API** - Simplified to presets
- ⚠️ **Stagger calculation** - May behave slightly differently
- ⚠️ **Custom animations** - Use data attributes or presets

### Maintained Features
- ✅ **IntersectionObserver** - Still core technology
- ✅ **Threshold/rootMargin** - Same configuration
- ✅ **Stagger animations** - Still supported
- ✅ **Multiple animation types** - Via presets

---

## Alternative Approach: Keep Timeline (Not Recommended)

If we MUST keep timeline approach:

```javascript
class Moonwalk {
  constructor() {
    this.animations = []  // Store Motion animation objects
  }

  handleIntersection(entry) {
    if (entry.isIntersecting) {
      // Build timeline array when element enters
      const timeline = this.buildTimelineForElement(entry.target)
      const animation = animate(timeline)
      this.animations.push(animation)
    }
  }

  buildTimelineForElement(element) {
    // Pre-compute timeline for this element and its children
    const sequence = []
    const children = element.querySelectorAll('[data-moonwalk-child]')

    sequence.push([element, { opacity: 1, y: 0 }, { duration: 0.6 }])

    children.forEach((child, i) => {
      sequence.push([child, { opacity: 1 }, {
        duration: 0.4,
        at: 0.6 + (i * 0.1)  // Stagger
      }])
    })

    return sequence
  }
}
```

**Why not recommended**: Still complex, loses benefits of simpler approach.

---

## Performance Considerations

### Optimize IntersectionObserver

```javascript
// Use passive event listeners
this.observer = new IntersectionObserver(
  (entries) => this.handleIntersection(entries),
  {
    threshold: this.options.threshold,
    rootMargin: this.options.rootMargin
  }
)
```

### Batch Animations

If many elements enter viewport simultaneously:

```javascript
handleIntersection(entries) {
  const toAnimate = entries.filter(e => e.isIntersecting && !e.target.dataset.moonwalkAnimated)

  if (toAnimate.length > 0) {
    requestAnimationFrame(() => {
      toAnimate.forEach(entry => this.animateElement(entry.target))
    })
  }
}
```

---

## Notes

- **Most complex module** - allow 2-3 weeks
- **Consider architectural change** - simplify instead of direct port
- **Leverage IntersectionObserver** - already built-in!
- **Extensive testing required**
- **May want beta release** before v5.0

---

## Success Criteria

Migration is successful if:
- [ ] All animation types work
- [ ] Stagger timing feels right
- [ ] Performance is good (60fps)
- [ ] IntersectionObserver efficient
- [ ] Playwright tests pass
- [ ] No visual regressions
- [ ] API is simpler than before (bonus!)

---

**Status**: Ready for migration (complex, allow plenty of time)
**Priority**: High (but migrate after simpler modules)
**Risk Level**: High (most complex module, but IntersectionObserver alignment helps)
