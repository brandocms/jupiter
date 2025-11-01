# Migration: CoverOverlay Module

**Tier**: 2 (Moderate)
**Complexity**: ⭐⭐ Low-Moderate
**Estimated Time**: 2-3 hours
**File**: `src/modules/CoverOverlay/index.js`

---

## Module Overview

CoverOverlay manages video cover overlays with fade animations. Uses GSAP for opacity transitions and timeline sequences.

---

## Current GSAP Usage

### Patterns Found (from audit)
- **`gsap.timeline()`** - Sequence overlay + button fades
- **Properties**: `opacity`

### Typical Code Pattern

```javascript
const tl = gsap.timeline()
tl.to(overlay, { opacity: 0, duration: 0.4 })
tl.to(playButton, { opacity: 0, duration: 0.3 }, '-=0.2')  // Overlap
```

---

## Migration Difficulty

**Low-Moderate** ⭐⭐

**Reasons**:
- Simple timeline sequence
- Only opacity animations
- Straightforward overlap pattern

---

## Migration Plan

### Step 1: Import Motion
```javascript
import { animate } from 'motion'
```

### Step 2: Convert Timeline to Array

**Before (GSAP)**:
```javascript
const tl = gsap.timeline()
tl.to(overlay, { opacity: 0, duration: 0.4 })
tl.to(playButton, { opacity: 0, duration: 0.3 }, '-=0.2')  // Start 0.2s before previous ends
```

**After (Motion)** - Option 1: Timeline Array:
```javascript
const sequence = [
  [overlay, { opacity: 0 }, { duration: 0.4 }],  // 0-0.4s
  [playButton, { opacity: 0 }, { duration: 0.3, at: 0.2 }]  // Start at 0.2s (overlap)
]
animate(sequence)
```

**After (Motion)** - Option 2: Parallel with Delays:
```javascript
// Start both, playButton with delay
animate(overlay, { opacity: 0 }, { duration: 0.4 })
animate(playButton, { opacity: 0 }, { duration: 0.3, delay: 0.2 })
```

---

## Code Changes Checklist

- [ ] Import Motion
- [ ] Convert timeline to array or parallel animations
- [ ] Calculate overlap positions (GSAP: `-=0.2` → Motion: `at: 0.2`)
- [ ] Test fade sequence
- [ ] Test timing feels right
- [ ] Remove GSAP import

---

## Testing Checklist

### Visual Testing
- [ ] Overlay fades out smoothly
- [ ] Play button fades with correct timing
- [ ] Overlap timing matches original (0.2s overlap)

### Functional Testing
- [ ] Fade triggers at right time (video start)
- [ ] Video plays correctly after fade
- [ ] Animation can be interrupted if needed

---

**Status**: Ready for migration
**Priority**: Medium
**Risk Level**: Low
