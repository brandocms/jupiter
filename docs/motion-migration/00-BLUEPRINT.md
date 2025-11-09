# GSAP to Motion Migration Blueprint

**Quick Technical Reference**

---

## Quick Facts

- **21 files** use GSAP across 20+ modules
- **GSAP**: 546kb → **Motion**: 18kb (97% savings)
- **Migration**: Incremental, both libs coexist during transition
- **Moonwalk already uses IntersectionObserver** - perfect alignment with Motion!
- **ScrollTrigger exported but NOT used** in source

---

## Implementation Notes

### Utility Helpers
- **Location**: `src/utils/motion-helpers.js`
- **Functions**:
  - `set(target, values)` - Immediate property setting (gsap.set equivalent)
  - `animateAutoAlpha(target, value, options)` - Opacity + visibility
  - `clearProps(target, props)` - Clear inline styles
  - `delayedCall(duration, callback)` - Delayed callbacks (uses Motion's `delay` function)
- **Motion built-ins**: Import `stagger` and `delay` directly from 'motion' (no custom wrappers needed)

### Migration Pattern
1. Replace GSAP import with Motion utilities
2. Replace GSAP calls with Motion equivalents
3. Run `yarn vite:build` to verify build
4. Run `yarn test` to verify functionality
5. Update `docs/motion-migration/STATUS.md` checklist

### Project Setup
- Use `yarn` (not npm) for package management
- Both GSAP and Motion coexist during migration
- Track progress: `docs/motion-migration/STATUS.md`
- Git handles rollbacks (no need to comment out old code)

### Tier 1 Learnings (All 5 Complete!)

**Simple modules (01-04)**:
- Only use `gsap.set()` (no animations)
- Direct replacement: `gsap.set()` → `set()`
- Migration time: ~5 minutes per module

**Popover (05)** - More complex than expected:
- Has actual animations (`gsap.to()` not just `set()`)
- **Naming collision**: Function param `animate` shadows Motion's `animate()`
  - Solution: Rename param to `shouldAnimate` (more descriptive anyway)
- Animates position with easing: `ease: 'power2.out'` → `easing: 'ease-out'`

**Special cases discovered**:
- `attr` property (GSAP): Motion doesn't support, set manually with `element.setAttribute()`
- `clearProps` (GSAP): Use our `clearProps()` helper
- `minHeight`, `minWidth`, `maxHeight`, `maxWidth` (CSS sizing): Motion's `animate()` doesn't support these properties
  - Solution: Set directly via `element.style.minHeight = '100px'` instead of using `set()` helper
  - Discovered in: EqualHeightImages, EqualHeightElements modules
  - Why: Motion focuses on transform/opacity animations; layout properties must be set manually

**Completed**: All Tier 1 (5/5) ✅

### Tier 2 Learnings (Batch 1: 3/16 Complete)

**HeroVideo (06)** - Mostly straightforward:
- Primarily `gsap.set()` calls → `set()` helper
- Uses `autoAlpha` extensively → `animateAutoAlpha()` helper
- Migration time: ~10 minutes

**CoverOverlay (09)** - Timeline with callback gotcha:
- Simple GSAP timeline → Motion array syntax
- **CRITICAL BUG DISCOVERED**: Timeline callbacks are different!
  - ❌ WRONG: `animate(timeline, { onComplete })`
  - ✅ RIGHT: `animate(timeline).finished.then(callback)`
- Timeline arrays do NOT accept second options parameter
- This caused page timeout in tests (animation never completed)
- Migration time: ~10 minutes

**Toggler (07)** - Stagger with promises:
- Uses `gsap.from()` → keyframe arrays `{ height: [0, 'auto'] }`
- Manual stagger: `forEach` with `delay: index * 0.1`
- Multiple animations need `.finished.then()` for callbacks
- Accordion group behavior: same pattern repeated
- Migration time: ~15 minutes

**Key patterns established**:
- Timeline callbacks: Always use `.finished.then()`
- Stagger: Manual loop with calculated delays
- From animations: Keyframe arrays `[startValue, endValue]`
- Multiple content elements: Array of animations, track last one's `.finished`

**Completed**: Batch 1 of Tier 2 (3/16) ✅

### Motion Docs Review (2025-11-02)

**Reviewed helpers against official Motion documentation** - Key findings:

**✅ Already correct:**
- `set()` - Using `animate(target, values, { duration: 0 })` is the official approach
- `clearProps()` - Motion has no built-in, manual approach is correct
- `animateAutoAlpha()` - Custom helper is needed (Motion has no autoAlpha)
- Timeline callbacks with `.finished.then()` - Exactly as documented

**⚠️ Fixed based on docs:**
1. **`delayedCall`** - Should use Motion's built-in `delay` function
   - Old: Used `setTimeout` (not synchronized with animations)
   - New: Uses `delay` from 'motion' (locked to animation frame loop)
   - Benefit: Better sync with animations, less overhead

2. **`animateAutoAlpha`** - Removed unnecessary onComplete wrapper
   - In non-zero case, just pass options directly
   - No need to wrap the callback

3. **Stagger** - Motion has this built-in, no custom helper needed!
   - Import: `import { animate, stagger } from 'motion'`
   - Usage: `animate('.items', { opacity: 1 }, { delay: stagger(0.1) })`
   - Options: `stagger(0.1, { startDelay: 0.2, from: 'center', ease: 'easeOut' })`
   - Removed custom stagger helper from blueprint

**Motion built-ins to use directly:**
- `stagger` - For staggered animations
- `delay` - For delayed callbacks (better than setTimeout)

**Verification:**
- ✅ Build successful
- ✅ All 85 tests passing
- ✅ CoverOverlay confirmed using correct timeline callback pattern

---

## API Mapping Reference

### Basic Animations

#### Simple Tween

```javascript
// GSAP
gsap.to('.element', {
  duration: 1,
  opacity: 0.5,
  x: 100,
  ease: 'power2.out'
})

// Motion
animate('.element', {
  opacity: 0.5,
  x: 100
}, {
  duration: 1,
  easing: 'ease-out'
})
```

**Key differences:**
- Values and options are separate objects in Motion
- `x` (same in both)
- `opacity` (same in both)
- `ease` → `easing`

#### From Animation

```javascript
// GSAP
gsap.from('.box', { opacity: 0 })

// Motion - use keyframe syntax
animate('.box', { opacity: [0, 1] })
```

#### FromTo Animation

```javascript
// GSAP
gsap.fromTo('.box',
  { opacity: 0 },
  { opacity: 0.5, duration: 1 }
)

// Motion - use keyframe array
animate('.box',
  { opacity: [0, 0.5] },
  { duration: 1 }
)
```

#### Set (Immediate)

```javascript
// GSAP
gsap.set('.element', { opacity: 0, x: 100 })

// Motion - duration: 0
animate('.element',
  { opacity: 0, x: 100 },
  { duration: 0 }
)
```

### Property Names

| GSAP | Motion | Notes |
|------|--------|-------|
| `rotation` | `rotate` | Degrees |
| `rotationX/Y/Z` | `rotateX/Y/Z` | 3D rotation |
| `x`, `y` | `x`, `y` | Same |
| `xPercent`, `yPercent` | Use CSS calc | Or transform |
| `scale` | `scale` | Same |
| `scaleX`, `scaleY` | `scaleX`, `scaleY` | Same |
| `opacity` | `opacity` | Same |
| `autoAlpha` | N/A | **Need utility** (see below) |
| `clearProps` | N/A | Manual cleanup |
| `backgroundColor` | `backgroundColor` | Same |

### Animation Options

| GSAP | Motion | Notes |
|------|--------|-------|
| `duration` | `duration` | Same (seconds) |
| `delay` | `delay` | Same (seconds) |
| `ease` | `easing` | Different naming |
| `repeat: -1` | `repeat: Infinity` | Infinite loop |
| `repeat: 2` | `repeat: 2` | Same |
| `yoyo: true` | `direction: 'alternate'` | Reverse on repeat |
| `paused: true` | N/A | Call `.pause()` after |
| `onComplete` | `onComplete` | Same |
| `onStart` | `onPlay` | Different name |
| `onUpdate` | `onUpdate` | Limited (single values) |

### Easing Functions

| GSAP | Motion |
|------|--------|
| `'none'` | `'linear'` |
| `'power1.out'` | `'ease-out'` |
| `'power2.out'` | `'ease-out'` |
| `'power2.inOut'` | `'ease-in-out'` |
| `'elastic.out'` | CSS easing or custom bezier |
| `'back.out'` | CSS easing or custom bezier |

### Animation Controls

| GSAP | Motion | Notes |
|------|--------|-------|
| `.play()` | `.play()` | Same |
| `.pause()` | `.pause()` | Same |
| `.resume()` | `.play()` | Same as play |
| `.reverse()` | N/A | Plan animation differently |
| `.kill()` | `.stop()` | Stop animation |
| `.revert()` | `.cancel()` | Cancel and revert styles |
| `.progress(1)` | `.complete()` | Jump to end |
| `.timeScale(2)` | `.speed = 2` | Property, not method |
| `.time()` | `.time` | Property, not method |
| `.delay(0.5)` | N/A | No dynamic delay |

### Stagger

```javascript
// GSAP (GSAP 3 syntax)
gsap.to('.items', {
  opacity: 1,
  stagger: 0.1
})

// GSAP (GSAP 2 legacy - we use this)
tl.staggerTo('.items', 1, { opacity: 1 }, 0.1)

// Motion - use built-in stagger function
import { animate, stagger } from 'motion'

animate(
  '.items',
  { opacity: 1 },
  { delay: stagger(0.1), duration: 1 }
)

// With options (start delay, from center, easing)
animate(
  '.items',
  { opacity: 1 },
  { delay: stagger(0.1, { startDelay: 0.2, from: 'center' }), duration: 1 }
)
```

---

## Timeline Differences

### Philosophy

**GSAP: Imperative**
- Create timeline object
- Add animations with methods
- Modify timeline dynamically

**Motion: Declarative**
- Define timeline as array
- Pass to animate() function
- Cannot modify in progress (immutable)

### Basic Timeline

```javascript
// GSAP
const tl = gsap.timeline()
tl.to('#id', { x: 100, duration: 1 })
tl.to('#id', { y: 50, duration: 1 })

// Motion - array syntax
const tl = [
  ['#id', { x: 100 }, { duration: 1 }],
  ['#id', { y: 50 }, { duration: 1 }]
]
animate(tl)
```

### Timeline with Labels

```javascript
// GSAP
const tl = gsap.timeline()
tl.to('#id', { x: 100, duration: 1 })
tl.addLabel('midpoint')
tl.to('#id', { y: 50, duration: 1 })

// Motion - string labels in array
const tl = [
  ['#id', { x: 100 }, { duration: 1 }],
  'midpoint',
  ['#id', { y: 50 }, { duration: 1 }]
]
animate(tl)
```

### Position Parameters

GSAP has rich position parameter syntax: `>`, `<`, `+=0.5`, `-=0.5`, `"label"`, `"label+=0.5"`

Motion uses array order and `at` property:

```javascript
// GSAP - start animations at same time
tl.to('#a', { x: 100 }, 0)
tl.to('#b', { y: 100 }, 0)

// Motion - use 'at' option
const tl = [
  ['#a', { x: 100 }, { duration: 1, at: 0 }],
  ['#b', { y: 100 }, { duration: 1, at: 0 }]
]

// GSAP - overlap animations
tl.to('#a', { x: 100 })
tl.to('#b', { y: 100 }, '-=0.5') // Start 0.5s before previous ends

// Motion - calculate absolute time
const tl = [
  ['#a', { x: 100 }, { duration: 1 }],  // 0-1s
  ['#b', { y: 100 }, { duration: 1, at: 0.5 }]  // Start at 0.5s
]
```

**Note**: Motion's `at` might not support all GSAP position syntax. May need to calculate absolute times.

### Composing Timelines

```javascript
// GSAP
tl.add(timelineA)
tl.add(timelineB)

// Motion - spread operator
const combined = [...timelineA, ...timelineB]
animate(combined)
```

### Timeline Control

```javascript
// GSAP
const tl = gsap.timeline({ paused: true })
tl.to(...)
tl.play()
tl.reverse()

// Motion
const tl = [...]
const animation = animate(tl)
animation.play()
// No reverse() - plan differently
```

### Timeline Callbacks

**CRITICAL**: Timeline arrays do NOT accept a second options parameter!

```javascript
// GSAP - onComplete in timeline options
const tl = gsap.timeline({
  onComplete: () => { console.log('done') }
})
tl.to('#a', { x: 100 })

// Motion - WRONG! ❌
const tl = [['#a', { x: 100 }]]
animate(tl, {
  onComplete: () => { console.log('done') }  // This doesn't work!
})

// Motion - CORRECT! ✅
const tl = [['#a', { x: 100 }]]
const animation = animate(tl)
animation.finished.then(() => {
  console.log('done')  // Use .finished promise instead
})
```

**Key Difference**:
- Single animation: `animate(el, props, { onComplete })` ✅
- Timeline: `animate(timeline).finished.then(callback)` ✅
- Timeline: ~~`animate(timeline, { onComplete })`~~ ❌ Does NOT work!

**Discovered in**: CoverOverlay migration (Tier 2)

### Dynamic Timeline Insertion

**This is the biggest challenge**

```javascript
// GSAP - can add to timeline dynamically
const tl = gsap.timeline()
tl.to('#a', { x: 100 })
// Later, based on some condition:
tl.to('#b', { y: 100 }, '>')  // Add at end
tl.to('#c', { opacity: 0 }, tl.recent().endTime())  // Add at specific time

// Motion - must pre-compute timeline array
// Solution: Build array first, then animate
const tl = []
tl.push(['#a', { x: 100 }, { duration: 1 }])

// Compute position based on array
if (someCondition) {
  tl.push(['#b', { y: 100 }, { duration: 1 }])
}

animate(tl)
```

**Impact**: Moonwalk uses `timeline.recent()` and dynamic insertion extensively. Will need refactoring.

---

## Common Patterns

### Pattern 1: Fade In

```javascript
// GSAP
gsap.to('.element', { opacity: 1, duration: 0.35 })

// Motion
animate('.element', { opacity: 1 }, { duration: 0.35 })
```

### Pattern 2: Slide Up and Fade In

```javascript
// GSAP
gsap.from('.element', {
  opacity: 0,
  y: 20,
  duration: 0.5,
  ease: 'power2.out'
})

// Motion
animate('.element', {
  opacity: [0, 1],
  y: [20, 0]
}, {
  duration: 0.5,
  easing: 'ease-out'
})
```

### Pattern 3: Sequence

```javascript
// GSAP
const tl = gsap.timeline()
tl.to('.first', { opacity: 1 })
tl.to('.second', { opacity: 1 })

// Motion
const sequence = [
  ['.first', { opacity: 1 }],
  ['.second', { opacity: 1 }]
]
animate(sequence)
```

### Pattern 4: Parallel Animations

```javascript
// GSAP
tl.to('.first', { opacity: 1 }, 0)
tl.to('.second', { opacity: 1 }, 0)

// Motion
const parallel = [
  ['.first', { opacity: 1 }, { at: 0 }],
  ['.second', { opacity: 1 }, { at: 0 }]
]
animate(parallel)
```

### Pattern 5: Stagger Reveal

```javascript
// GSAP (GSAP 2 legacy syntax - used in codebase)
tl.staggerTo('.items', 0.5, { opacity: 1, y: 0 }, 0.1)

// GSAP 3 syntax
gsap.to('.items', { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 })

// Motion - use built-in stagger
import { animate, stagger } from 'motion'

animate(
  '.items',
  { opacity: 1, y: 0 },
  { delay: stagger(0.1), duration: 0.5 }
)
```

### Pattern 6: Infinite Loop

```javascript
// GSAP (Marquee pattern)
gsap.to('.marquee', {
  x: -1000,
  duration: 20,
  repeat: -1,
  ease: 'none'
})

// Motion
animate('.marquee', {
  x: -1000
}, {
  duration: 20,
  repeat: Infinity,
  easing: 'linear'
})
```

### Pattern 7: AutoAlpha (Opacity + Visibility)

```javascript
// GSAP - autoAlpha handles both opacity and visibility
gsap.to('.element', { autoAlpha: 0 })  // opacity: 0, visibility: hidden
gsap.to('.element', { autoAlpha: 1 })  // opacity: 1, visibility: visible

// Motion - use utility function
import { animateAutoAlpha } from './utils/motion-helpers'
animateAutoAlpha('.element', 0)  // fade out + hide
animateAutoAlpha('.element', 1)  // fade in + show
```

### Pattern 8: Clear Props

```javascript
// GSAP - remove inline styles
gsap.set('.element', { clearProps: 'all' })

// Motion - manual cleanup
const element = document.querySelector('.element')
element.removeAttribute('style')
// Or specific properties:
element.style.removeProperty('opacity')
element.style.removeProperty('transform')
```

---

## Utility Functions

Create `src/utils/motion-helpers.js`:

```javascript
import { animate, delay } from 'motion'

/**
 * Animate autoAlpha (opacity + visibility)
 * Mimics GSAP's autoAlpha property
 */
export function animateAutoAlpha(target, value, options = {}) {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target

  if (value === 0) {
    // Fade out, then hide
    return animate(element, { opacity: 0 }, {
      ...options,
      onComplete: () => {
        element.style.visibility = 'hidden'
        options.onComplete?.()
      }
    })
  } else {
    // Show, then fade in
    element.style.visibility = 'visible'
    return animate(element, { opacity: value }, options)
  }
}

/**
 * Clear inline styles
 * Mimics GSAP's clearProps
 */
export function clearProps(target, props = 'all') {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target

  if (props === 'all') {
    element.removeAttribute('style')
  } else {
    const properties = Array.isArray(props) ? props : [props]
    properties.forEach(prop => {
      element.style.removeProperty(prop)
    })
  }
}

/**
 * Set properties immediately (like gsap.set)
 */
export function set(target, values) {
  return animate(target, values, { duration: 0 })
}

/**
 * Delayed call helper
 * Mimics gsap.delayedCall
 * Uses Motion's delay function (locked to animation frame loop)
 */
export function delayedCall(duration, callback) {
  return new Promise(resolve => {
    delay(() => {
      callback()
      resolve()
    }, duration)
  })
}

/**
 * Timeline helper for position calculations
 * Helps convert GSAP position parameters to Motion's 'at' values
 */
export class Timeline {
  constructor() {
    this.sequence = []
    this.currentTime = 0
    this.labels = {}
  }

  to(target, values, options = {}, position) {
    const at = this._calculatePosition(position, options.duration || 1)
    this.sequence.push([target, values, { ...options, at }])
    return this
  }

  addLabel(label, position) {
    const at = this._calculatePosition(position, 0)
    this.labels[label] = at
    this.sequence.push(label)
    return this
  }

  _calculatePosition(position, duration) {
    if (position === undefined || position === '>') {
      // After previous
      const at = this.currentTime
      this.currentTime += duration
      return at
    } else if (position === '<') {
      // With previous (start at same time)
      return this.currentTime - duration
    } else if (typeof position === 'number') {
      // Absolute position
      this.currentTime = Math.max(this.currentTime, position + duration)
      return position
    } else if (typeof position === 'string') {
      // Label-based or relative
      if (position.startsWith('+=')) {
        const offset = parseFloat(position.slice(2))
        const at = this.currentTime + offset
        this.currentTime = at + duration
        return at
      } else if (position.startsWith('-=')) {
        const offset = parseFloat(position.slice(2))
        const at = this.currentTime - offset
        this.currentTime = Math.max(this.currentTime, at + duration)
        return at
      } else if (this.labels[position] !== undefined) {
        const at = this.labels[position]
        this.currentTime = Math.max(this.currentTime, at + duration)
        return at
      }
    }
    return this.currentTime
  }

  play() {
    return animate(this.sequence)
  }
}
```

Usage:

```javascript
import { Timeline } from './utils/motion-helpers'

const tl = new Timeline()
tl.to('#a', { x: 100 }, { duration: 1 })
tl.to('#b', { y: 100 }, { duration: 1 }, '>')
tl.addLabel('midpoint')
tl.to('#c', { opacity: 0 }, { duration: 0.5 }, 'midpoint')
tl.play()
```

---

## Technical Challenges & Solutions

### Challenge 1: Dynamic Timeline Insertion (Moonwalk)

**Problem**: Moonwalk uses `timeline.recent()` to get the last added tween and insert new tweens at specific positions dynamically.

```javascript
// Current GSAP approach
timeline.to(el, { opacity: 1 })
const recent = timeline.recent()
timeline.to(el, { y: 0 }, recent.endTime())
```

**Solution Options**:

1. **Pre-compute timeline array**: Build entire timeline upfront before animating
2. **Refactor to use IntersectionObserver more directly**: Since Moonwalk already uses IntersectionObserver, we could trigger individual animations instead of managing a complex timeline
3. **Use Timeline utility class**: The Timeline helper above can approximate GSAP behavior

**Recommended**: Combination of #1 and #2 - simplify Moonwalk's approach using IntersectionObserver callbacks.

### Challenge 2: AutoAlpha Property

**Problem**: GSAP's `autoAlpha` is convenient shorthand for opacity + visibility.

**Solution**: Use `animateAutoAlpha` utility function (see above).

### Challenge 3: ClearProps

**Problem**: GSAP's `clearProps` removes inline styles after animation.

**Solution**: Use `clearProps` utility function or manually clean up in `onComplete` callback.

### Challenge 4: Stagger Animations

**Problem**: GSAP has built-in stagger support, Motion doesn't.

**Solution**: Use `stagger` utility function that calculates delays.

### Challenge 5: Timeline Position Parameters

**Problem**: GSAP's rich position parameter syntax (`>`, `<`, `+=`, label+offset).

**Solution**:
- Use Timeline utility class for complex cases
- For simple cases, calculate absolute times manually
- Convert relative positions to absolute during migration

### Challenge 6: Reverse Animations

**Problem**: GSAP timelines can `.reverse()`, Motion cannot.

**Solution**:
- Create separate forward and reverse timelines
- Or use state to switch between different animations
- Plan animation differently (toggle between two states)

### Challenge 7: GSAP 2 Legacy Syntax

**Problem**: Codebase uses GSAP 2 syntax (`.staggerTo()`, `.staggerFrom()`).

**Solution**: Convert to GSAP 3 thinking first, then to Motion:
- `.staggerTo(targets, duration, vars, stagger)` → `animate(targets, vars, { duration, stagger })`

---

## Resources

- [Motion Docs](https://motion.dev)
- [Motion GSAP Migration Guide](https://motion.dev/guides/migrate-from-gsap) (see: `docs/motion_migration_tips.txt`)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Scroll Timeline API](https://developer.mozilla.org/en-US/docs/Web/API/Scroll_Timeline_API)
