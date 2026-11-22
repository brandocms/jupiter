# GSAP to Motion Migration Status

The runtime migration is complete. Jupiter uses Motion, and GSAP is absent from the package dependencies. The numbered documents in this directory preserve the original plans, examples and estimates. The implementation of the original cloned header now lives in `DoubleHeader`.

For current usage see the [Jupiter guide](../../README.md), the [module demos](../../test-pages/index.html) and the [measured bundle sizes](../codebase-audit.html).

## Migration record

### Tier 1 - Easy

- [x] **01-StackedBoxes** ✅ 2025-11-02
- [x] **02-FooterReveal** ✅ 2025-11-02
- [x] **03-EqualHeightImages** ✅ 2025-11-02
- [x] **04-EqualHeightElements** ✅ 2025-11-02
- [x] **05-Popover** ✅ 2025-11-02 (Note: Has animations, more complex than expected)

### Tier 2 - Moderate

- [x] **06-HeroVideo** ✅ 2025-11-02
- [x] **07-Toggler** ✅ 2025-11-02
- [x] **08-Popup** ✅ 2025-11-02
- [x] **09-CoverOverlay** ✅ 2025-11-02
- [x] **10-Cookies** ✅ 2025-11-02
- [x] **11-FixedHeader** ✅ 2025-11-02
- [x] **12-DoubleHeader** (then named StickyHeader) ✅ 2025-11-02
- [x] [13-Dropdown](../../src/modules/Dropdown/index.js)
- [x] **14-MobileMenu** ✅ 2025-11-02
- [x] **15-Links** ✅ 2025-11-02
- [x] **16-Lightbox** ✅ 2025-11-02
- [x] **17-HeroSlider** ✅ 2025-11-02 (Note: Recursive pattern with overlapping animations)
- [x] **18-Marquee** ✅ 2025-11-02

### Tier 3 - Complex

- [x] **19-Application** ✅ 2025-11-09
- [x] **20-Moonwalk** ✅ 2025-11-09
- [x] [21-Parallax](../../src/modules/Parallax/index.js)
