# Migration: Application Module

**Tier**: 3 (Complex) | **Complexity**: ⭐⭐⭐⭐⭐ | **Time**: 1-2 weeks | **File**: `src/modules/Application/index.js`

---

## Module Overview

Application is the **core module** that manages the entire Jupiter framework. It has multiple animation use cases throughout different features and utilities.

---

## Current GSAP Usage (from audit)

### Multiple Use Cases

1. **Scroll lock animations** - Animating scroll position
2. **Debug overlay animations** - Grid overlay with stagger
3. **Zoom elements** - Modal zoom effects
4. **Various utility animations** - Multiple smaller animations throughout

### Code Patterns

```javascript
// Debug grid overlay (stagger)
const tl = gsap.timeline()
tl.staggerTo('.grid-lines', 0.5, { opacity: 1 }, 0.05)

// Scroll lock
gsap.to(window, { scrollTo: position, duration: 0.5 })

// Zoom modal
gsap.to(element, {
  scale: 1,
  opacity: 1,
  duration: 0.4,
  ease: 'power2.out'
})
```

---

## Migration Difficulty

**Very Complex** ⭐⭐⭐⭐⭐

**Reasons**:
- **Core module** - impacts entire framework
- **Multiple animation use cases** - need to migrate all
- **Utilities used by other modules** - breaking changes cascade
- **Testing burden** - must test entire framework
- **ScrollToPlugin** - need alternative

---

## Dependencies

**Critical**: Should migrate **LAST** or near-last
- Other modules may depend on Application utilities
- Framework-wide impact
- Most thorough testing required

---

## Migration Plan

### Phase 1: Inventory (1-2 days)

Create complete inventory of all GSAP usage in Application:
1. List every GSAP call
2. Categorize by feature/utility
3. Prioritize by frequency of use
4. Identify dependencies (what other modules use)

### Phase 2: Scroll Lock / ScrollTo (2-3 days)

**Challenge**: GSAP's ScrollToPlugin

**Solutions**:

**Option 1: Motion scroll() function**
```javascript
import { scroll, animate } from 'motion'

// GSAP
gsap.to(window, { scrollTo: targetPosition, duration: 0.5 })

// Motion - may need custom implementation
window.scrollTo({
  top: targetPosition,
  behavior: 'smooth'  // Native browser smooth scroll
})

// Or for more control:
const currentScroll = window.scrollY
animate(
  (progress) => {
    window.scrollTo(0, currentScroll + (targetPosition - currentScroll) * progress)
  },
  { duration: 0.5, easing: 'ease-out' }
)
```

**Option 2: Keep ScrollToPlugin temporarily**
- Install GSAP just for ScrollToPlugin
- Migrate other Application features first
- Remove ScrollToPlugin last (find Motion alternative or build custom)

### Phase 3: Debug Overlay (1-2 days)

```javascript
// Stagger grid lines
import { stagger } from '../../utils/motion-helpers'

stagger('.grid-lines', { opacity: 1 }, {
  duration: 0.5,
  stagger: 0.05
})
```

### Phase 4: Zoom Elements (2-3 days)

```javascript
// Modal zoom effect
animate(element, {
  scale: 1,
  opacity: 1
}, {
  duration: 0.4,
  easing: 'ease-out'
})

// Zoom out
animate(element, {
  scale: 0.95,
  opacity: 0
}, {
  duration: 0.3
})
```

### Phase 5: Miscellaneous Utilities (3-5 days)

Migrate all other GSAP usage in Application:
- Property tweens
- Transitions
- Any remaining timelines

### Phase 6: Integration Testing (3-5 days)

**Critical**: Test entire framework
- Run all Playwright tests
- Manual testing of all modules
- Check for regressions
- Performance benchmarking

---

## Code Changes Checklist

### Investigation
- [ ] Complete inventory of all GSAP calls in Application
- [ ] Document each use case
- [ ] Identify dependencies (other modules using Application animations)
- [ ] Prioritize by complexity

### Scroll Lock
- [ ] Research Motion scroll() alternatives
- [ ] Implement smooth scroll to position
- [ ] Test scroll locking
- [ ] Test scroll to element
- [ ] Test different easing functions

### Debug Overlay
- [ ] Migrate grid overlay animations
- [ ] Test stagger effect
- [ ] Verify timing matches original

### Zoom Elements
- [ ] Migrate zoom in animations
- [ ] Migrate zoom out animations
- [ ] Test modal zoom effects
- [ ] Verify scale + opacity coordination

### Other Utilities
- [ ] Migrate remaining animations
- [ ] Update any utility functions
- [ ] Test each utility individually

### Integration
- [ ] Run full Playwright test suite
- [ ] Manual test all modules
- [ ] Check for regressions in dependent modules
- [ ] Performance benchmarking
- [ ] Remove GSAP import (or keep if using ScrollToPlugin temporarily)

---

## Testing Checklist

### Unit Testing
- [ ] Test each Application utility individually
- [ ] Verify all animations work
- [ ] Check callbacks fire correctly

### Integration Testing
- [ ] Test with Moonwalk
- [ ] Test with all navigation modules
- [ ] Test with media modules
- [ ] Test debug mode
- [ ] Test scroll locking
- [ ] Test zoom modals

### Regression Testing
- [ ] No modules broken by Application changes
- [ ] All Playwright tests pass
- [ ] Manual testing of critical user flows

### Performance Testing
- [ ] Framework initialization time
- [ ] Animation smoothness
- [ ] Memory usage
- [ ] Bundle size (should decrease after GSAP removal)

---

## Potential Issues & Solutions

### Issue 1: ScrollToPlugin Dependency
**Problem**: No direct Motion equivalent for smooth scroll to position

**Solutions**:
1. Use native `window.scrollTo({ behavior: 'smooth' })`
   - **Pros**: Native, no library needed
   - **Cons**: Less control over easing, duration

2. Animate scroll manually:
```javascript
const startScroll = window.scrollY
const targetScroll = calculateTarget()

animate(
  (progress) => {
    window.scrollTo(0, startScroll + (targetScroll - startScroll) * progress)
  },
  { duration: 0.5, easing: easeOutExpo }
)
```

3. Use Motion's scroll() function (if applicable)
4. Keep GSAP ScrollToPlugin temporarily

**Recommended**: Try option 2 first (manual animation with custom easing)

### Issue 2: Dependencies from Other Modules
**Problem**: Other modules might use Application's GSAP-based utilities

**Solution**:
- Update utility APIs to be library-agnostic
- Provide Motion implementations
- Update dependent modules first

### Issue 3: Extensive Testing Required
**Problem**: Application impacts entire framework

**Solution**:
- Dedicated testing phase
- Automated Playwright tests
- Manual testing checklist
- Beta testing period before release

---

## Phased Approach Recommendation

### Approach 1: All at once
- Migrate all Application GSAP usage in one go
- Extensive testing phase
- Higher risk but cleaner

### Approach 2: Feature by feature (RECOMMENDED)
- Week 1: Scroll lock / ScrollToPlugin
- Week 2: Debug overlay + zoom elements
- Week 3: Remaining utilities
- Week 4: Integration testing
- Lower risk, easier to rollback

---

## ScrollToPlugin Alternatives (Deep Dive)

### Native Browser API

```javascript
// Simple
element.scrollIntoView({
  behavior: 'smooth',
  block: 'start'
})

// Window scroll
window.scrollTo({
  top: targetY,
  behavior: 'smooth'
})
```

**Pros**: No library, native
**Cons**: No easing control, duration control limited

### Custom Scroll Animation

```javascript
function scrollTo(target, options = {}) {
  const { duration = 0.5, easing = 'ease-out', offset = 0 } = options

  const startY = window.scrollY
  const targetY = typeof target === 'number'
    ? target
    : target.getBoundingClientRect().top + window.scrollY - offset

  return animate(
    (progress) => {
      const currentY = startY + (targetY - startY) * progress
      window.scrollTo(0, currentY)
    },
    { duration, easing }
  )
}

// Usage
scrollTo(1000)  // Scroll to position
scrollTo(element, { offset: 100 })  // Scroll to element
```

**Pros**: Full control, customizable easing
**Cons**: Need to implement ourselves

**Recommendation**: Implement custom scrollTo utility in motion-helpers

---

## Notes

- **Migrate LAST** - after Moonwalk
- **Most critical module** - take extra time
- **Thorough testing essential**
- Consider **beta release** to users before v5.0 final
- Document breaking changes clearly

---

## Related Modules

- **All modules** - Application is core framework
- Moonwalk (may share utilities)
- Navigation modules (scroll locking)

---

**Status**: Ready for migration (but migrate LAST)
**Priority**: Critical (but lower priority timing-wise)
**Risk Level**: Very High (core module, framework-wide impact)
