# Migration: HeroVideo Module

**Tier**: 2 (Moderate)
**Complexity**: ⭐⭐ Low-Moderate
**Estimated Time**: 3-4 hours
**File**: `src/modules/HeroVideo/index.js`

---

## Module Overview

HeroVideo manages background hero videos with fade in/out animations and resize handling. Uses GSAP for opacity animations and property setting.

---

## Current GSAP Usage

### Patterns Found (from audit)
- **`gsap.to()`** - Opacity fade animations
- **`gsap.from()`** - Initial fade in
- **`gsap.set()`** - Setting initial states
- **Properties**: `opacity`, possibly `scale` for resize effects

### Typical Code Pattern

```javascript
// Initial state
gsap.set(video, { opacity: 0 })

// Fade in when loaded
gsap.to(video, {
  opacity: 1,
  duration: 0.6,
  ease: 'power2.out'
})

// Fade out
gsap.to(video, {
  opacity: 0,
  duration: 0.4
})

// Resize handling (if animated)
gsap.to(video, {
  scale: scaleValue,
  duration: 0.3
})
```

---

## Migration Difficulty

**Low-Moderate** ⭐⭐

**Reasons**:
- Simple opacity animations
- No complex timelines
- Mostly basic tweens

**Moderate aspects**:
- Multiple animation states (loaded, playing, paused)
- Resize handling may have animations
- Video event handling

---

## Dependencies

**Recommended**: Migrate after Tier 1 modules (Popover pattern is similar)

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
import { set } from '../../utils/motion-helpers'
```

### Step 2: Replace Initial State

**Before (GSAP)**:
```javascript
gsap.set(video, { opacity: 0 })
```

**After (Motion)**:
```javascript
set(video, { opacity: 0 })
```

### Step 3: Replace Fade In Animation

**Before (GSAP)**:
```javascript
gsap.to(video, {
  opacity: 1,
  duration: 0.6,
  ease: 'power2.out',
  onComplete: this.onVideoReady
})
```

**After (Motion)**:
```javascript
animate(video, {
  opacity: 1
}, {
  duration: 0.6,
  easing: 'ease-out',
  onComplete: () => this.onVideoReady()
})
```

### Step 4: Replace Fade Out Animation

**Before (GSAP)**:
```javascript
gsap.to(video, {
  opacity: 0,
  duration: 0.4
})
```

**After (Motion)**:
```javascript
animate(video, {
  opacity: 0
}, {
  duration: 0.4
})
```

### Step 5: Replace Resize Animations (if any)

**Before (GSAP)**:
```javascript
gsap.to(video, {
  scale: newScale,
  duration: 0.3,
  ease: 'power2.out'
})
```

**After (Motion)**:
```javascript
animate(video, {
  scale: newScale
}, {
  duration: 0.3,
  easing: 'ease-out'
})
```

### Step 6: Manage Animation References

Store references to stop animations if needed:

```javascript
class HeroVideo {
  constructor() {
    this.currentAnimation = null
  }

  fadeIn() {
    // Stop any existing animation
    if (this.currentAnimation) {
      this.currentAnimation.stop()
    }

    this.currentAnimation = animate(this.video, {
      opacity: 1
    }, {
      duration: 0.6,
      easing: 'ease-out'
    })
  }

  fadeOut() {
    if (this.currentAnimation) {
      this.currentAnimation.stop()
    }

    this.currentAnimation = animate(this.video, {
      opacity: 0
    }, {
      duration: 0.4
    })
  }
}
```

### Step 7: Test & Cleanup
- Test video load and fade in
- Test resize behavior
- Remove GSAP import

---

## Code Changes Checklist

- [ ] Import Motion and utilities
- [ ] Replace `gsap.set()` calls
- [ ] Replace fade in animation
- [ ] Replace fade out animation
- [ ] Replace resize animations (if any)
- [ ] Add animation reference tracking
- [ ] Update callbacks (onComplete, etc.)
- [ ] Test video load animation
- [ ] Test all video states
- [ ] Remove GSAP import
- [ ] Verify no console errors

---

## Testing Checklist

### Visual Testing
- [ ] Video fades in smoothly when loaded
- [ ] Fade in duration/easing feels right
- [ ] Video hidden initially (opacity: 0)
- [ ] Resize animations smooth (if applicable)

### Functional Testing
- [ ] Video loads and plays correctly
- [ ] Fade in triggers at right time (on canplay/loadedmetadata)
- [ ] Pause/play states work correctly
- [ ] Resize event handling works
- [ ] Multiple videos on page work independently
- [ ] Animation interruption handled (rapid state changes)

### Video Event Testing
- [ ] `canplay` event triggers fade in
- [ ] `loadedmetadata` event works
- [ ] `ended` event works (if used)
- [ ] `error` event handled gracefully

### Performance Testing
- [ ] Smooth 60fps animations
- [ ] No jank during video playback + animation
- [ ] Resize handling performant

### Browser Testing
- [ ] Chrome (video codec support)
- [ ] Firefox
- [ ] Safari (WebKit video quirks)
- [ ] Mobile browsers (autoplay policies)

---

## Potential Issues & Solutions

### Issue 1: Video Autoplay Policies
**Problem**: Mobile browsers block autoplay

**Solution**: Not animation-related, existing logic should still work. Motion doesn't affect video API.

### Issue 2: Fade In Before Video Ready
**Problem**: Animation might start before video is truly ready

**Solution**: Ensure video event listeners still work correctly:
```javascript
video.addEventListener('canplay', () => {
  animate(video, { opacity: 1 }, { duration: 0.6 })
})
```

### Issue 3: Animation During Resize
**Problem**: Resize events fire rapidly

**Solution**: Debounce or use `duration: 0` for immediate updates:
```javascript
onResize() {
  // Immediate update (no animation)
  set(this.video, { scale: newScale })

  // Or smooth animation
  animate(this.video, { scale: newScale }, { duration: 0.2 })
}
```

---

## Performance Notes

Videos are heavy. Ensure:
- Use `will-change: opacity` for smooth fades
- Consider disabling animations on low-end devices
- Test with large video files

```css
.hero-video {
  will-change: opacity;
}
```

---

## Rollback Plan

If issues arise:
1. Check video event timing
2. Verify animation callbacks fire correctly
3. Revert to GSAP if blocking issues
4. Document specific issue

---

## Notes

- Simple animations but video API integration is important
- Focus on event timing (canplay, etc.)
- Good module for learning callback migration
- Similar pattern to Popover, just with video events

---

## Related Modules

- CoverOverlay (video + overlay fade pattern)
- Any module with fade animations

---

**Status**: Ready for migration
**Priority**: Medium
**Risk Level**: Low (simple animations, but test video events carefully)
