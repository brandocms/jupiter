#### 4.0.0-beta.2

- Update gsap - export InertiaPlugin, SplitText <3


#### 4.0.0-beta.1

- **BREAKING** Popup: Refactor to accept a specific CSS selector in constructor
  - Popups now require a custom selector to target specific popups
  - This allows multiple independent popups to be managed separately
  - New syntax: `new Popup(app, '[data-popup][data-popup-custom]', opts)`
  - Updated tests to demonstrate isolated popup functionality
- **BREAKING** Parallax: Complete rewrite.
  - Significant improvements in parallax performance and appearance
  - New `scale` option (default: 1.2) to prevent gaps during parallax movement
  - New `orientation` option ('up', 'down', 'left', 'right') for movement direction
  - Support for multi-element parallax with `data-parallax-parent`
  - Individual elements can use `data-parallax-factor` to set custom movement factor
  - Optional `data-parallax-fade` attribute enables fade effect for individual elements
  - Optional `data-parallax-orientation` to override movement direction per element
  - Added `destroy()` method for proper cleanup
  - Simplified implementation with better performance
  - Updated tests and documentation for the new features
- **FEATURE** Added type definitions for auto-complete
- **FEATURE** Popup: Add key-based popup management through `data-popup-key`
  - Triggers, popups, and close buttons can now be properly associated
  - Each popup gets its own backdrop element
  - Improved trigger/closer targeting based on selectors
- **FEATURE** Moonwalk: Add direction information to run callbacks
  - Both `callback` and `onExit` functions now receive a third `meta` parameter with direction information
  - For entry callbacks: `meta.direction` indicates which side the element entered the viewport from
  - For exit callbacks: `meta.direction` indicates which side the element exited the viewport to
  - Possible values are 'top', 'bottom', 'left', 'right', or null
  - Direction detection uses Application's scroll direction for greater accuracy
  - Added TypeScript definitions for the new `MoonwalkRunMeta` type
- **FEATURE** Application: Add scroll direction tracking
  - Application now tracks vertical and horizontal scroll direction
  - Direction is stored in `app.state.scrollDirection` as 'up', 'down', 'left', or 'right'
  - Enhanced APPLICATION_SCROLL event includes scrollDirection in event details
- **FEATURE** Popover: Add click toggle functionality
  - New option `clickToggle: false` enables click-based popover interaction instead of hover
  - Click outside popover closes it automatically
  - New option `allowMultiple: false` controls whether multiple popovers can be open at once
  - New option `followTrigger: false` makes popovers follow their triggers during scroll
  - New option `followSpeed: 0.3` controls the animation speed when following triggers
  - New option `onShow: callback` provides hook for custom actions when popover is shown
  - Improved handling of popover stacking and management
  - Popovers now inherit custom classes from their template elements


#### 3.55.0

- Application: Set `respectReducedMotion: false` as default, since there
  are more cases of where there are subtle bugs with this, and if we
  explicitly set it to `true`, we are at least aware of the issue.


#### 3.54.4

- Dropdown: Click outside to close
- Moonwalk: Warn if data-moonwalk-section and data-moonwalk-run
  on the same element.


#### 3.54.3

- Dropdown: Add some callbacks.


#### 3.54.2

- FixedHeader: Allow ignoring forced scroll
- Links: Respect header pin settings when scrolling anchors
- Lazyload: add forceLoad


#### 3.54.1

- Moonwalk: Fix typo in clearing moonwalks for reduced motion targets


#### 3.54.0

- ScrollSpy: Add `onIntersect(target, shouldBeActive)` to opts
- Moonwalk: If all images within a mw element should be lazyloaded, don't wait for
  them to load before revealing the element


#### 3.53.0

- Moonwalk: When `clearMoonwalkOnAnchors`, run all moonwalks up to the anchor point
  instead of clearing them.


#### 3.52.0

- Moonwalk: Add `clearNestedWalks: true` to default config to prevent slow moonwalks.


#### 3.51.1

- Cookies: Verify we have btnRefuse


#### 3.51.0

- Links: Add anchor to browser history. Allow skipping with `data-skip-history`
  on link target
- Dataloader: Allow multiple selected params across different keys
- Dataloader: Add static `replaceInnerHTML(el, url)`


#### 3.50.1

- Links: Add `openExternalInWindow` to force external links to open in new window


#### 3.50.0

- Popover: Add initial version
- Breakpoints: Rerun initialization on REVEAL
- Moonwalk: Add `initialize` callback to runs
- Dataloader: Allow setting custom key per param
- EqualHeightImages: Recalculate on resize
- Dropdown: Update dataset status on a lower level
- Defaults: Don't set overwrite auto on tweens by default.


#### 3.49.0

- Lazyload: Add MutationObserver that will check for loading after initial try


#### 3.48.4

- Lazyload: Start watching if called when application is already revealed


#### 3.48.3

- Lightbox: Add index numbers (numbers: true)


#### 3.48.2

- Get vh100 by screen on iPhone/iOS


#### 3.48.1

- Force `main` visible on back button


#### 3.48.0

- Add `Dataloader`
- Add `EqualHeightElements`
- Lazyload: Rewritten to use 2 observers. One for loading which will load more
  eagerly and one for revealing which will react from bottom of viewport.
  Now sets `data-ll-ready` when ready to reveal and `data-ll-loaded` when revealed
- Moonwalk: Tweaks to the tween code.
- Application: Set `scrollHeight` as CSS var
- Application: Add `ease` param to `scrollTo`


#### 3.47.0

- Application: Ensure header and footer's opacity is cleared out when arriving
  at page from using back button.
- Marquee: Add `spacer` option to allow overriding
- Add `EqualHeightImages` module


#### 3.46.4

- Typography: Allow multiple `data-typo-children` selectors on same page.


#### 3.46.3

- Moonwalk: Set `data-moonwalk-section-ready` instead of tweening element.
  EuropaCSS will add a rule for this attribute with opacity: 1. If you're
  not using EuropaCSS, add this to your stylesheet if you want to use
  Moonwalk without initial flickering:

      html.moonwalk [data-moonwalk-section][data-moonwalk-section-ready] {
        opacity: 1;
      }


#### 3.46.2

- Moonwalk: Set autoRemoveChildren to false to fix jumbled timelines.


#### 3.46.1

- Lazyload: Fix loading loop for Chrome. Only reset `sizes` on load for firefox browsers,
  and when the image has not been loaded before.


#### 3.46.0

- **BREAKING** Marquee: Drop `paddingLeft` -- add `startProgress`. This sets where in the
  timeline we should start. Default is `0.5`
- Application: Add `hardScrollToTop()`
- Zoom: Try to improve zoom handling for chrome


#### 3.45.0

- Marquee: Reveal on `APPLICATION:REVEALED`
- Add Toggler module


#### 3.44.0

- Moonwalk: Add `data-moonwalked` to walked elements. Don't run again on
  already walked elements.
- Dom: Add `hasAttribute`


#### 3.43.0

- **BREAKING** Marquee: More consistent `speed`. This means you should probably
  verify that the speed you set looks ok with the new config
- Marquee: Add `paddingLeft` and `slowDownOnHover` options
- Application: send `widthChanged` and `heightChanged` booleans
  in `APPLICATION:RESIZE` event detail


#### 3.42.7

- Links: Check for zero opacity body element on back/forward nav


#### 3.42.6

- Typography: Better defaults
- MobileMenu: set `this.open` boolean on opening/closing


#### 3.42.5

- Links: Fade out header/footer (if found) in default transition
- Moonwalk: Don't wait for images with `data-placeholder`, render right away
  and let Lazyload do the image reveal.

#### 3.42.4

- Moonwalk: Fix fallback selector. This could have broken devices with
  prefer reduced motion enabled.

#### 3.42.3

- Zoom: Change logic for Chrome/Safari

#### 3.42.2

- Popup: Listen for ESC to close popup

#### 3.42.1

- Moonwalk: Also remove `-children` when resetting
- FixedHeader: Only run `onAltBg` and `onNotAltBg` if `altBgColor` is set
- Application: Set browser zoom as `--ec-zoom` variable. This is used
  in EuropaCSS for scaling/zooming vw fontsizes.

#### 3.42.0

- FixedHeader: Try to fix scroll jank with content-visibility
- General: Better checking for existing elements before proceeding

#### 3.41.3

- CoverOverlay: Check that iframe exists
- Lazyload: Ensure parent node exists before setting sizes
- General: Switch package scope to brandocms

#### 3.41.2

- Marquee: Play when in viewport initially. Fixes resize bug.

#### 3.41.1

- Marquee: Update marquee dimensions on resize

#### 3.41.0

- Marquee: New module

#### 3.40.1

- FixedHeader: Check props as preflight
- FixedHeader: Set data-header-transitions after initial preflight

#### 3.40.0

- Dropdown: New module
- Scrollspy: New module

#### 3.39.1

- FixedHeader: Fix `onOutline` callback
- Lazyload: Also set `sizes` on `source` tags


#### 3.39.0

- Lightbox: Add support for srcset. Add `data-srcset` to your anchor tag with `data-lightbox`
- FixedHeader: Remove unused intersect logic.
- Lazyload: Fix setting `srcset` on `source` tags that have `data-srcset`


#### 3.38.0

- Application: Prevent scrollLock running while already locked, since this would reset scrollbar
  width padding compensation
- Application: Add `extraPaddedElements` param to `scrollLock`. If for instance your nav needs
  the same padding as the body element when compensating for scrollbar width.
  `app.scrollLock(['header[data-nav] nav']);`
- Cookies: Expire cookie law cookie one year in the future.
- Dom: Add `Dom.inViewport(el)` to check if parts of `el` is currently visible
- Dom: Add `Dom.create('div', ['my-class1', 'my-class2'])` convenience function
- Dom: Add `Dom.remove(el)` convenience function for removing `el` from document
- Dom: Add `Dom.append(el)` convenience function for appending `el` to `body`
- Lazyload: Set `data-ll-loaded` on finished lazy loaded images.
- Lazyload: Prevent repeat lazyloading already loaded image
- Lazyload: Prevent repeat lazyloading already loaded image
- Lazyload: Dynamically set `sizes` for images with `[data-sizes="auto"]`
- Moonwalk: Add `container` param to constructor. For instance if we want to run Moonwalk
  on a json loaded doc.


#### 3.37.0

- update GSAP, export ScrollTrigger
- Application: add `app.section`
- HeroSlider: add `lazyImages` config. If true, tries to lazyload first image before
  setting slider as ready


#### 3.36.0

- Moonwalk: Fix space in class name when css tweening
- Moonwalk: add `clearMoonwalkOnAnchors`. Removes all moonwalks if called from a link with hash/anchor.
I.e if the URL is `/news#latest`, all moonwalks are removed. This can sort out a rendering bug with
IntersectionObserver that sometimes happens.
- Application: add `respectReducedMotion`. Set to false if you don't want to respect the user's
reduced-motion settings. May prevent some rendering bugs in extreme cases, but not recommended.
- General: Don't include polyfills in package, include from application
- General: Only try to call object-fit polyfill on IE11
- General: Set capture/passive for events where applicable.
- Lazyload: Force picturefill after lazyload on IE11


#### 3.35.0

- Dom: `setCSSVar`
- FixedHeader: fix `onOutline` event
- Lightbox: `swipe: true/false` cfg setting. If swipe is true, native zoom won't work, so allow to choose.
- Moonwalk: add `clearNestedSections` -- NOTE: This is enabled by default, since nested sections
  usually leads to trouble!
- StickyHeader: add `beforeEnter` event
- StickyHeader: add `unPinOnResize` cfg.


#### 3.34.1

- Cookies: Set `cookielaw` cookie to ROOT


#### 3.34.0

- Lightbox: Add `trigger` to opts.
- Drop node 8 from travis


#### 3.33.0

- Add `APPLICATION_REVEALED` to registerable callbacks.
  app.registerCallback(Events.APPLICATION_REVEALED, () => {})


#### 3.32.0

- FixedHeader: Add `onOutline` event that pins header when outline is enabled. Replaces `pinOnOutline`.
- Moonwalk: Change default starting style to be `opacity 0` instead of `visibility: hidden`, since the latter
screws up tabbing. Make sure your css reflects this by setting `[data-moonwalk], [data-moonwalk-section], ...`
to `opacity: 0` instead of `visibility: hidden`. If you update `europacss` this is fixed automatically.


#### 3.31.0

- Fix cookielaw banner not respecting cookie set


#### 3.30.0

- Kill all faders


#### 3.29.0

- HeroVideo: Add `data-src` option for choosing mobile/desktop versions.


#### 3.28.0

- Bug fixes
- Update GSAP to 3.1.1
- Moonwalk: Fix CSS transitions


#### 3.27.0

- Moonwalk: Allow setting named children - `data-moonwalk-children="slide"`
- Moonwalk: Clear out more keys on reduced-motion. Update EuropaCSS too for fixes.
- HeroVideo: Add `data-cover` for cover image.


#### 3.26.0

- Links: Add `triggerEvents` and `scrollDuration` to config.


#### 3.25.0

- Fix Safari back button bug where fader would stay activated.


#### 3.24.2

- Lock GSAP to 3.0.4 due to a timeline regression.


#### 3.24.1

- Remove debug log


#### 3.24.0

- MobileMenu: Fix: Prevent default when binding click event


#### 3.23.0

- MobileMenu: Fix: Pass self to `onResize` event.


#### 3.22.0

- Moonwalk: Fix visual bug
- Moonwalk: Add runs. Runs a function when element comes into view.


#### 3.21.0

- gsap 3!
- FixedHeader: Allow function as `offset` and `offsetBg`


#### 3.20.0

- FixedHeader: Allow element as `offset`
- Move `unPinOnResize` to section config!


#### 3.19.0

- HeroVideo: Don't autoplay when in viewport if pause is pressed
- Links: Ignore `noanim` classed anchors


#### 3.18.0

- Applicaton: Add `Application.pollForElement` and `Application.pollForVariable`
- FixedHeader: Add `onMobileMenuOpen` and `onMobileMenuClose` callbacks
- Dom: Add `Dom.offset` and `Dom.position`


#### 3.17.0

- StickyHeader: Add `opts.pinOnForcedScroll`
- Application: Add `Application.scrollTo`
- HeroVideo: Add pause/play.
  `opts.elements.play` and `opts.elements.pause` are strings representing the SVG icons.
  They get wrapped in a button with `[data-hero-video-pause].


#### 3.16.0

- Lightbox: track pointer direction in `pointerDirection`
- Lightbox: expose `onClick`, `onPointerLeft` and `onPointerRight` events.
- StickyHeader: add `onClone` event to customize how the auxillary header is created.

#### 3.15.0

- HeroSlider: better initialization. Expose `onFadeIn` event
- Export `_defaultsDeep`


#### 3.14.0

- StickyHeader: reveals on `Events.APPLICATION_REVEALED`. Can be set with `opts.on`
- Moonwalk: Force section element to be visible (Set `visibility: hidden`
  in pcss for `[data-moonwalk-section]`)
- Application: remove default fader delay.


#### 3.13.0

- Lightbox: Add keyboard navigation


#### 3.12.0

- Lightbox: Use timelines for even more flexibility with captions


#### 3.11.0

- Lightbox: Rewritten to be more flexible. Exposes more events. Preloads more images.


#### 3.10.0

- Moonwalk: Removed `opts.fireOnReady`. Added `opts.on` option instead. Pass the event
  we should listen for. The default is `on: Events.APPLICATION_REVEALED`
- Moonwalk: add `opts.initialDelay`. This is an added delay before `ready()` is fired.
- FixedHeader: add `opts.on` option for listening to an event before firing `enter()`
- FixedHeader: added `opts.<section>.beforeEnter`. This gets called during init, so
  it's a good place to hide items that should be revealed in `opts.<section>.enter`.


#### 3.9.0

- FixedHeader: Allow locking/unlocking pin/unpin
- StickyHeader: Allow locking/unlocking pin/unpin


#### 3.8.0

- Lightbox: Lock scroll
- Lightbox: Ensure image is loaded before fading in


#### 3.7.0

- Cookielaw: Show after application is revealed. Delay by 0.5 as standard.
- Fontloader: Check that fonts are loaded before calling fadeIn() / revealed event


#### 3.6.0

- Lightbox: More hooks
- Breakpoints: Initialize earlier to ensure breakpoints are available to other modules
- Remove `no-js`/`js` feature test. Handle this at the application
level instead to try and avoid fouc. Newest Brando version does this for us
in the `render_meta`.


#### 3.5.0

- Dom: Add `overlapsVertically` function
- FixedHeader: Add `unPinOnResize` boolean switch
- Export `rafCallback` function


#### 3.4.0

- Add `Dom` class


#### 3.3.0

- Force update Parallax after Git tries to ruin everything


#### 3.2.0

- Popup: Add triggers for opening and closing popups. Add docs in README


#### 3.1.0

- Application: Set dimensions on application init
- Application: Extended debug info (screen size, viewport, features)
- Moonwalk: Clean up Moonwalk code
- Parallax: Fix parallax up a bit. Still mainly for hero usage.
- Parallax: Fix parallax up a bit. Still mainly for hero usage.
