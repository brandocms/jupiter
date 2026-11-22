<p align="center">
  <sup><em>«Earth people, I was born on»</em></sup>
</p>

# Jupiter

Jupiter is a browser toolkit for responsive layout, scroll effects, carousels, galleries and disclosure controls.

[![CI](https://github.com/brandocms/jupiter/actions/workflows/ci.yml/badge.svg)](https://github.com/brandocms/jupiter/actions/workflows/ci.yml)

## Getting started

Install `@brandocms/jupiter` in your frontend project and import the components you use. The npm package ships ES module source and TypeScript declarations. Use a browser bundler such as Vite to resolve the imports. In an SSR application, load Jupiter in the browser after the page markup exists.

```js
import { Application, Events, Moonwalk } from '@brandocms/jupiter'

const app = new Application({ respectReducedMotion: true })
const moonwalk = new Moonwalk(app)
app.registerCallback(Events.APPLICATION_REVEALED, () => {
  console.log('Page revealed')
})
app.initialize()
```

Create modules before `app.initialize()` so they receive the startup events. For responsive components, define the `--breakpoint-<name>` CSS variables that correspond to `breakpointConfig.breakpoints`. See the [breakpoints demo](test-pages/breakpoints.html).

From a checkout, run `yarn install --frozen-lockfile` and `yarn vite`, then open `http://localhost:8448/` for the [demo index](test-pages/index.html). The [development guide](CLAUDE.md), [TypeScript guide](types/README.md) and [release guide](RELEASE.md) cover the repository workflows.

## Bundle size

Import the components your page uses from `@brandocms/jupiter`. A production bundler can tree-shake the package’s ES module entry. The standalone ES and UMD files in `test-pages/dist` include the complete API and its dependencies.

Run `yarn size` from the repository to measure the npm tarball, both standalone builds, and production bundles for individual and combined imports. The default Application fader uses Web Animations. In a code-splitting build, the Motion fallback and debug-panel animations load on demand. The tarball value is its download size. For JavaScript the command reports raw, gzip and Brotli bytes, with on-demand chunks shown separately from the initial import. See the [audit measurements](docs/codebase-audit.html) for the before-and-after comparison.

## Application

### Config

- `respectReducedMotion` defaults to `false`. Set it to `true` to enable reduced-motion handling in components such as Moonwalk and Parallax when the browser reports that preference.


### Available CSS vars

- `--vp-initial-inner-h` - Initial window inner height
- `--vp-initial-outer-h` - Initial window outer height
- `--vp-initial-inner-w` - Initial window inner width
- `--vp-initial-outer-w` - Initial window outer width
- `--vp-100vh` and `--vp-1vh` are updated on resize using screen height on iOS and inner height elsewhere. Call `app.setvw100()` to publish `--vp-100vw` and `--vp-1vw` for the current width.


### Methods/functions

- `registerCallback(type, callback)` runs the callback with the application when that lifecycle stage occurs. It returns a function you can call to unsubscribe.
- `isScrolled()` returns whether the document is scrolled below the top.
- `scrollLock(extraPaddedElements = [])` locks body scrolling and compensates for the scrollbar. `scrollRelease()` restores the previous inline overflow and padding.
- `scrollTo(target, time = 0.8, emitEvents = true, ease = 'easeInOut')` accepts a pixel position, CSS selector, element or `{ y, offsetY }`. Duration is in seconds and a positive offset scrolls further down.
- `pollForElement(selector, time = 500, callback)` polls in milliseconds and passes the matching element to the callback.
- `pollForVar(getter, time = 500, callback)` calls a getter until it returns a value other than `null` or `undefined`, then passes the value to the callback.
- `destroy()` releases application-owned listeners, subscriptions and pending scroll work. When unmounting a view, call the individual modules’ teardown methods as well where provided.

## Dom

Some utility functions for dealing with the DOM.

- `Dom.html`
  - References the `html` element

- `Dom.body`
  - References the `body` element

- `Dom.find('header')`
  - Returns the `header` element

- `Dom.find(header, 'nav')`
  - Returns the `nav` element inside `header`. `header` is an element, not a string.

- `Dom.all('li')`
  - Returns all `li` elements

- `Dom.all(header, 'li')`
  - Returns all `li` elements inside `header`. `header` is an element, not a string.

- `Dom.addClass(element, 'one', 'two', 'three')`
  - Adds classes to `element`

- `Dom.removeClass(element, 'one', 'two', 'three')`
  - Removes classes to `element`

- `Dom.hasClass(element, 'one')`
  - Checks if `element` has class `one`

- `Dom.toggleClass(element, 'one', 'two', 'three')`
  - Toggles `one`, `two`, `three` classes on `element`

- `Dom.overlapsVertically(element1, element2)`
  - Returns the vertical overlap of both margin boxes in pixels, or zero when they do not overlap

- `Dom.offset(element)`
  - Returns `top` and `left` offsets for `element`

- `Dom.position(element)`
  - Returns `top` and `left` positions for `element`

- `Dom.getCSSVar(key)`
  - Reads the root custom property, for example `Dom.getCSSVar('--header-height')`

- `Dom.setCSSVar(key, val)`
  - Writes the root custom property, for example `Dom.setCSSVar('header-height', '48px')`



## Events (application)

Import `{ Events }` from `@brandocms/jupiter` and use its constants with `window.addEventListener`. The event strings below are case-sensitive.

- `APPLICATION_PRELUDIUM`

Called before initialization

- `APPLICATION:INITIALIZED`

Called after initialization

- `APPLICATION:READY`

Called when the application finishes waiting for fonts

- `APPLICATION:REVEALED`

Called when the configured fade-in completes

- `APPLICATION:MOBILE_MENU:OPEN`

Called on opening mobile navigation menu

- `APPLICATION:MOBILE_MENU:CLOSED`

Called on closing mobile navigation menu

- `APPLICATION:SCROLL`

Called on application scrolling

- `APPLICATION:RESIZE`

Called on application resizing

- `APPLICATION:SCROLL_LOCKED`

Called when scrollbar is locked with `app.scrollLock()`

- `APPLICATION:SCROLL_RELEASED`

Called when scrollbar is released with `app.scrollRelease()`

- `APPLICATION:FORCED_SCROLL_START`

Called when application is forced to scroll, for instance on clicking anchors, triggering `scrollTo`

- `APPLICATION:FORCED_SCROLL_END`

Called at end of forced scroll.

- `APPLICATION:OUTLINE`

Called if user presses `<tab>`. Tells us the user is using tabbed navigation

- `APPLICATION:VISIBILITY_CHANGE`

Called when application becomes hidden or visible

- `APPLICATION:HIDDEN`

Called when application becomes hidden

- `APPLICATION:VISIBLE`

Called when application becomes visible


## Events (other)

`IMAGE:LAZYLOADED`

Lazyload dispatches this event on the image when it assigns its sources. `imageIsLoaded(img, true)` waits for that handoff and also recognizes images already handed off. Use `imageIsLoaded(img)` to wait for native load or error, or `img.decode()` for decoded pixels.

```es6
import { Events } from '@brandocms/jupiter'
const image = document.querySelector('.my-image')
image.addEventListener(Events.IMAGE_LAZYLOADED, () => { console.log('lazyloaded') })
```

`SECTION:LAZYLOADED`

With `useNativeLazyloadIfAvailable: false`, the section observer dispatches this event on the section after it intersects the configured load margin and its images reach the Lazyload handoff.

```es6
import { Events } from '@brandocms/jupiter'
const section = document.querySelector('.my-section[data-lazyload-section]')
section.addEventListener(Events.SECTION_LAZYLOADED, () => { console.log('lazyloaded') })
```

## Lightbox

The default gallery moves focus into a labelled dialog and restores it to the opening control after close. Set `dialogLabel` to localize its name. Captions display the original image’s alt as plain text. A custom `onClose` should return its animation promise and release resources it owns. `onAfterClose` runs when closing finishes.

Give related images the same `data-lightbox-section` to navigate them as a group. Images without a section share the `general` group.

```html
<div
  data-lightbox="/media/images/site/posts/xlarge/2gmk2h1d8d4q.jpg"
  data-lightbox-section="intro">
  <figure>
    <img
      alt="Text"
      src="/media/images/site/posts/small/2gmk2h1d8d4q.jpg"
      height="1667"
      width="2210">

    <button type="button" data-lightbox-trigger>Open image</button>
  </figure>
</div>
```

```js
import { Lightbox } from '@brandocms/jupiter'

new Lightbox(app, { trigger: '[data-lightbox-trigger]', captions: true })
```

#### Options

- `numbers` defaults to `false`. Set it to `true` to show the current image number and section total.
- `trigger` - `false` - selector representing an element you want to use as a trigger to open lightbox
- `captions` - `false` - whether to show captions or not in the overlay
- `elements` - `object` - switch out default elements in the overlay
  - `arrowRight` - `function` - returns an element
  - `arrowLeft` - `function` - returns an element
  - `close` - `function` - returns an element
  - `dot` - `function` - returns an element
- `onBeforeOpen` - `function` - hook for before opening lightbox
- `onOpen` - `function`- hook for opening lightbox
- `onClose` - `function` - called when closing the lightbox
- `onAfterClose` - `function` - called after closing the lightbox
- `onImageIn` - `function (lightbox)` - called on image fade in.
  You can check for the first transition at `lightbox.firstTransition`. The image to tween is at
  `lightbox.nextImage`. Timeline is at `lightbox.timelines.image`.
- `onImageOut` - `function (lightbox)` - called on image fade out. The image to
  tween is at `lightbox.currentImage`. Timeline is at `lightbox.timelines.image`.
- `onCaptionIn` - `function (lightbox, captionHasChanged)` - called on caption fade in. The caption
  to tween is at `lightbox.elements.caption`. Timeline is at `lightbox.timelines.caption`.
- `onCaptionOut` - `function (lightbox, captionHasChanged)` - called on caption fade out. The caption
  to tween is at `lightbox.elements.caption`. Timeline is at `lightbox.timelines.caption`.
- `onClick` - `function (lightbox, section, event)` - called when lightbox is clicked. The pointer
  direction is available at `lightbox.pointerDirection`
- `onPointerLeft/onPointerRight` - `function (lightbox)` - callback for when pointer direction changes


## Toggler

#### Example

HTML
```html
<div data-toggle>
  <button data-toggle-trigger>Click to expand <span class="arrow icon">&darr;</span></button>
  <div class="panel" data-toggle-content>
    <div class="panel-content">
      Content goes here
    </div>
  </div>
</div>
```

#### Group Functionality

You can group togglers together to create an accordion-like behavior where only one toggler in the group can be open at a time. When you open one toggler, all others in the same group will close automatically.

```html
<div data-toggle data-toggle-group="phases">
  <button data-toggle-trigger="phase1">Phase 1 <span class="arrow icon">&darr;</span></button>
  <div class="panel" data-toggle-content="phase1">
    Phase 1 content
  </div>
</div>

<div data-toggle data-toggle-group="phases">
  <button data-toggle-trigger="phase2">Phase 2 <span class="arrow icon">&darr;</span></button>
  <div class="panel" data-toggle-content="phase2">
    Phase 2 content
  </div>
</div>

<div data-toggle data-toggle-group="phases">
  <button data-toggle-trigger="phase3">Phase 3 <span class="arrow icon">&darr;</span></button>
  <div class="panel" data-toggle-content="phase3">
    Phase 3 content
  </div>
</div>
```

CSS
```css
[data-toggle-trigger] {
  .arrow {
    display: inline-block;
    transform: scaleY(1);
    transition: transform 250ms ease;
    &.active {
      transform: scaleY(-1);
    }
  }
}

/* Style active trigger elements */
[data-toggle-trigger][data-toggle-trigger-active] {
  background-color: #e8f4ff;
  border-color: #4a90e2;
  color: #0056b3;
  font-weight: bold;
}

[data-toggle-content] {
  height: 0;
  overflow: hidden;
  opacity: 1;
  position: relative;
}
```

JS
```es6
import { Dom, Toggler } from '@brandocms/jupiter'

app.togglers = []

const togglers = Dom.all('[data-toggle]')
togglers.forEach(toggleEl => {
  app.togglers.push(new Toggler(app, toggleEl))
})
```

#### Options

Pass `onBeforeOpen`, `onOpen`, `onBeforeClose` or `onClose` in the third constructor argument. Each receives the Toggler instance and its one-based group index. Keep padding on a child inside `[data-toggle-content]` so the panel can collapse to zero height.

## Dataloader

A component for dynamically loading and filtering content via AJAX with optional URL synchronization.

### Basic Usage

HTML:
```html
<div data-loader="/api/articles" data-loader-id="articles">
  <div class="filters">
    <a href="#" data-loader-param="all" data-loader-param-key="category" data-loader-param-selected>All</a>
    <a href="#" data-loader-param="tech" data-loader-param-key="category">Technology</a>
    <a href="#" data-loader-param="design" data-loader-param-key="category">Design</a>
  </div>
  
  <div data-loader-canvas>
    <!-- Content will be loaded here -->
  </div>
  
  <button data-loader-more>Load More</button>
</div>
```

JavaScript:
```js
import { Dataloader, Lazyload } from '@brandocms/jupiter'

const loader = document.querySelector('[data-loader]')
const lazyload = new Lazyload(app)
const dataloader = new Dataloader(app, loader, {
  onFetch: ({ $canvasEl }) => lazyload.observe($canvasEl)
})
```

### URL Synchronization

Enable bidirectional sync between dataloader parameters and browser URL:

```js
// Configure URL patterns for different dataloaders
const urlConfigs = {
  events: {
    templates: {
      en: '/events/:location/:type',
      no: '/arrangementer/:location/:type'
    },
    updateOnInit: false // Don't update URL on initialization
  },
  news: {
    templates: {
      en: '/news/:category/:year',
      no: '/nyheter/:category/:year'
    }
  }
}

// Initialize all dataloaders with URL sync
app.dataloaders = []
Dom.all('[data-loader]').forEach($dl => {
  app.dataloaders.push(
    new Dataloader(app, $dl, {
      urlSync: urlConfigs,
      onFetch: (dataloader) => {
        // Your onFetch logic
      }
    })
  )
})
```

### Split Layout

Components can be placed outside the main dataloader element:

```html
<!-- Sidebar -->
<div data-loader="/api/articles" data-loader-id="articles">
  <a href="#" data-loader-param="tech" data-loader-param-key="category">Tech</a>
</div>

<!-- Main content area -->
<div data-loader-canvas-for="articles">
  <!-- Content loads here -->
</div>

<!-- Footer -->
<button data-loader-more-for="articles">Load More</button>
<input data-loader-filter-for="articles" placeholder="Search...">
```

### Options

- `page` - `number` - Initial page number (default: 0)
- `loaderParam` - `object` - Initial parameters
- `filter` - `string` - Initial filter value
- `filterDebounce` - `number` - Debounce delay in ms for filter input (default: 650)
- `onFetch` - `function` - Called after content is fetched
- `urlSync` - `object` - URL synchronization configuration:
  - Key the configuration by `data-loader-id`. Each entry accepts the options below.
  - `templates` - Language-specific URL templates with `:param` placeholders
  - `updateOnInit` - `boolean` - Update URL on initialization (default: true)
  - `languageInPath` - `boolean` - Include language in URL path
  - `hideDefaultLanguage` - `boolean` - Hide default language from URL (default: true)
  - `defaultLanguage` - `string` - Default language code (default: 'en')
  - `buildUrl` - `function` - Custom URL building function
  - `parseUrl` - `function` - Custom URL parsing function

### Attributes

- `data-loader="/api/endpoint"` - Main container with API endpoint
- `data-loader-id="unique-id"` - Unique identifier for the dataloader
- `data-loader-canvas` - Container where content will be loaded
- `data-loader-canvas-for="id"` - Canvas for specific dataloader (split layout)
- `data-loader-param="value"` - Parameter value to send to API
- `data-loader-param-key="key"` - Parameter key (default: 'defaultParam')
- `data-loader-param-multi` - Allow multiple selections for this parameter
- `data-loader-param-selected` - Marks parameter as selected
- `data-loader-more` - Load more button
- `data-loader-more-for="id"` - Load more for specific dataloader (split layout)
- `data-loader-filter` - Filter input field
- `data-loader-filter-for="id"` - Filter for specific dataloader (split layout)
- `data-loader-loading` - Added during loading
- `data-loader-starved` - Added to load more button when no more content

### Methods

- `destroy()` - Remove all event listeners, abort pending fetches, and clean up URL sync
- `updateBaseURL(url)` - Change the base API URL
- `Dataloader.replaceInnerHTML(el, url)` - Static method to replace an element's innerHTML with fetched content

Dataloader inserts HTML returned by the configured endpoint. Use a trusted renderer that escapes user-authored values. A successful response commits the page and fires `onFetch`. A failed request leaves the current results in place and the More button retries the same page.

URL templates encode each filter value separately. Multiple values share a segment separated by commas, and a comma inside a value is encoded. An omitted middle parameter leaves an empty path segment so later parameters keep their positions. On back or forward navigation the loader fetches page zero. Sites with different URL conventions can supply `buildUrl` and `parseUrl`.

### API Response Headers

- `jpt-dataloader: starved` - Set this header when there's no more content to load


## Links

#### Options

- `triggerEvents` - `boolean` - `true` - If we should trigger events when scrolling.
  This affects the fixed header amongst other things.
- `scrollDuration` - `number` - `0.8` - how long the scroll lasts

By default anchor links get added to the browser history. You can skip this by setting
`data-skip-history` on the link **target**:

```html
<a id="content" name="content" data-skip-history></a>
```


## Lazyload

`new Lazyload(app, { target: container })` scopes image handling to a container. The default target is `document.body`. On browsers with native lazy loading, the default path assigns the image sources and `loading="lazy"`. Call `lazyload.observe(container)` after inserting new images. Native mode assigns their sources and the observer path registers them for loading and reveal. Both paths measure images marked `data-sizes="auto"` before assigning sources, then update `sizes` when their width changes. Set `useNativeLazyloadIfAvailable: false` for Jupiter’s distance-based preload and section events. Call `destroy()` when removing the view. See the [responsive picture examples](test-pages/lazyload.html).

## Looper and Marquee

`new Looper(app)` scans `[data-moonwalk-run="loop"]` containers. Inside each, place a `[data-looper]` track with `[data-looper-item]` children inside a `[data-looper-container]` wrapper. Clip overflow on the wrapper. Looper measures and reveals the carousel when the application is revealed, or immediately if that already happened. Call `destroy()` when removing the view. See the [basic markup](test-pages/looper/basic.html), [peek layout](test-pages/looper/peek.html) and [teardown demo](test-pages/looper/destroy.html).

`new Marquee(app, container, options)` uses `[data-marquee]`, `[data-marquee-holder]` and `[data-marquee-item]` descendants. `speed` defaults to 100 pixels per second. Set `reversed: true` for rightward movement or `draggable: true` for drag and inertia. Call `destroy()` when removing the marquee. See the [marquee demo](test-pages/marquee.html) and [drag example](test-pages/marquee/drag.html).

## Moonwalk

Moonwalk observes sections and their children. Each section can reveal its items independently as they enter the viewport.

You reference the configured `walks` by the `data-moonwalk="walkname"`
syntax. If no value is provided, we run the `default` walk.

#### Options

- `on` - default `Events.APPLICATION_REVEALED`
  - Set this to `null` to start manually with `moonwalk.ready()`. A Moonwalk scoped to a container other than `document.body` also starts manually.

- `initialDelay` - default `100` milliseconds
  - Delay between the configured event and starting the reveal observers. Useful for timing reveal against
    other reveals happening towards the `APPLICATION_REVEALED` event for instance.

- `clearLazyload` - default `false`
  - Remove `data-moonwalk` from elements that also have `data-ll-srcset` so Lazyload can reveal them.

- `clearNestedSections` - default `true`
  - Clear nested `data-moonwalk-section` attributes since they usually just break functionality.

- `clearMoonwalkOnAnchors` - default `true`
  - When the page loads with a hash, marks every walk before the target element, the
    target and its ancestors as revealed, and the sections before it as ready.

- `rootMargin` - default `'-10% 0%'`
  - Determines how early the IntersectionObserver triggers. The last section and the
    last run on the page always use `'0px'`.

- `threshold` - default `0`
  - How much of the element must be visible before IO trigger. From 0 to 1 where 1 is the entire element

- `uniqueIds` - default `false`
  - Assign a unique `data-moonwalk-id` to each walk element

- `addIndexes` - default `false`
  - Assign a `data-moonwalk-idx` within each section per key

- `runs`
  - Example
  ```es6
  runs: {
    heroAnimation: {
      threshold: 0.5,
      callback: element => {
        // This function runs when `element` comes into view
      }
    }
  }
  ```
  - Call this with `<div data-moonwalk-run="heroAnimation">`

- `walks`
  - Configures tweens. A walk name used in the markup but missing here is logged
    as an error; an element falls back to the `default` walk, and a named section
    or stage is treated as a plain section.
  - Example:
  ```es6
  walks: {
    default: {
      /* How long between multiple entries in a moonwalk section (default 0.15) */
      interval: 0.15,
      /* How long each tween is */
      duration: 0.65,
      /* Add a separate tween for opacity.
      Can be set to `true` for the default tween, or `false` to skip */
      alphaTween: { ease: 'easeIn', duration: 1 },
      /* The transitions that will be tweened. `null` animates nothing: Moonwalk
      only adds `data-moonwalked` (and the `moonwalked` class) and CSS does the rest */
      transition: {
        from: {
          y: 5
        },
        to: {
          ease: 'easeOut',
          y: 0
        }
      }
    }
  }
  ```

Sample code
```html
<div data-moonwalk-section>
  <div data-moonwalk>
    Default walk
  </div>
  <div data-moonwalk="fast">
    `Fast` walk
  </div>
</div>
```

### Named sections

A named section will autoplay its children when intersecting with the viewport.
Set `sectionTargets` to select specific descendants. By default the section uses its immediate children.

You can force a custom order of the staggered reveal by adding `data-moonwalk-order="1"` etc
to the targeted elements.

Named sections can have `startDelay`, a delay added before the first staggered tween.

Sample code

```html
<div class="slideshow" data-moonwalk-section="slider">
  <div class="slides-wrapper">
    <picture class="image">
      ...
    </picture>
    <picture class="image">
      ...
    </picture>
  </div>
</div>
```

Sample config:

```es6
slider: {
  sectionTargets: '.image',
  interval: 0.2,
  duration: 1.2,
  alphaTween: true,
  transition: {
    from: {
      opacity: 0,
      y: 21
    },
    to: {
      ease: 'easeOut',
      y: 0
    }
  }
}

```

### Stages

A stage animates the section itself when it intersects. For example, the stage below scales from 0 to 1. Child walks have their own intersection observers and can start while the stage is animating.

Sample code

```html
<div class="slideshow" data-moonwalk-section data-moonwalk-stage="scaleup">
  <div data-moonwalk="slow">...</div>
  <div data-moonwalk>...</div>
  <div data-moonwalk="slow">...</div>
</div>
```

Sample config

```es6
walks: {
  scaleup: {
    duration: 1,
    transition: {
      from: {
        scaleY: 0,
        transformOrigin: '50% 50%'
      },

      to: {
        scaleY: 1
      }
    }
  }
}
```

### Set children

Sometimes you might have a dynamic number of children that you want to moonwalk,
for instance paragraphs in an article. You can do this by setting `data-moonwalk-children`
on the parent element. You can also supply a value to this attribute if you want to set a
specific walk to the children:

```html
<article data-moonwalk-section data-moonwalk-children="slide">
  <p>Paragraph one</p>
  <p>Paragraph two</p>
  ...
</article>
```

Paragraph one and two will then get a `data-moonwalk="slide"` attribute.


## Popup

For a modal popup, give the target a dialog role and an accessible name. Popup handles Escape, backdrop and close-button clicks. A modal integration must also move focus into the visible dialog, contain Tab navigation there and return focus to the opener on close.

### Options

- Pass the target selector as the second argument to `new Popup(app, selector, options)`. It defaults to `[data-popup]`.

- `responsive: (app) => boolean` - default `() => true`
  - Function to determine if popup should be shown on current breakpoint

- `onOpen: (trigger, target, popup) => {}`
  - Function called when popup opens
  - `trigger` is the element that triggered the popup
  - `target` is the popup element
  - `popup` is the Popup instance

- `onClose: (popup) => {}`
  - Function called when popup closes
  - `popup` is the Popup instance

- `tweenIn: (trigger, target, popup) => {}`
  - Function for animating the popup opening
  - `trigger` is the element that triggered the popup
  - `target` is the popup element
  - `popup` is the Popup instance
  - Backdrop can be accessed as `popup.backdrop`

- `tweenOut: (popup) => {}`
  - Function for animating the popup closing
  - `popup` is the Popup instance
  - Popup element can be accessed as `popup.currentPopup`
  - Backdrop can be accessed as `popup.backdrop`

### Basic Usage

HTML:

```html
<div id="my-popup" data-popup role="dialog" aria-labelledby="my-popup-title">
  <div class="popup-header">
    <h3 id="my-popup-title">My Popup</h3>
    <button class="close-button" data-popup-close>×</button>
  </div>
  <div class="popup-content">
    <p>This is a popup that appears when the trigger button is clicked.</p>
  </div>
</div>

<button data-popup-trigger="#my-popup">Open Popup</button>
```

JavaScript:

```js
import { Application, Popup } from '@brandocms/jupiter'

const app = new Application()
const popup = new Popup(app)
```

### Advanced Usage with Multiple Popups

You can create multiple independent popups by using the key-based system. This ensures that each popup operates independently, with its own backdrop and close behavior.

HTML:

```html
<!-- First popup with key "newsletter" -->
<div id="newsletter-popup" data-popup data-popup-key="newsletter" role="dialog" aria-label="Newsletter signup">
  <div class="popup-header">
    <h3>Newsletter Signup</h3>
    <button class="close-button" data-popup-close>×</button>
  </div>
  <div class="popup-content">
    <p>Sign up for our newsletter!</p>
  </div>
</div>

<!-- Second popup with key "login" -->
<div id="login-popup" data-popup data-popup-key="login" role="dialog" aria-label="Login">
  <div class="popup-header">
    <h3>Login</h3>
    <button class="close-button" data-popup-close>×</button>
  </div>
  <div class="popup-content">
    <p>Enter your credentials to log in.</p>
  </div>
</div>

<!-- Triggers for each popup with corresponding keys -->
<button data-popup-trigger="#newsletter-popup" data-popup-key="newsletter">
  Subscribe to Newsletter
</button>

<button data-popup-trigger="#login-popup" data-popup-key="login">
  Login
</button>
```

JavaScript:

```js
import { Application, Popup } from '@brandocms/jupiter'

const app = new Application()

// Create separate instances for different types of popups
const newsletterPopup = new Popup(app, '[data-popup][data-popup-key="newsletter"]', {
  onOpen: (trigger, target, popup) => {
    console.log('Newsletter popup opened')
  }
})

const loginPopup = new Popup(app, '[data-popup][data-popup-key="login"]', {
  onOpen: (trigger, target, popup) => {
    console.log('Login popup opened')
  }
})
```

### Custom Animations

This opening animation uses the Motion function exported by Jupiter. It runs on a popup with `data-popup-key="custom"` and the CSS below. The default exit animation handles the backdrop and target.

```js
import { animate, Popup } from '@brandocms/jupiter'

const customPopup = new Popup(app, '[data-popup][data-popup-key="custom"]', {
  tweenIn(trigger, target, popup) {
    popup.backdrop.style.display = 'block'
    target.style.display = 'block'
    animate(popup.backdrop, { opacity: [0, 1] }, { duration: 0.3 })
    animate(target, { opacity: [0, 1] }, { duration: 0.5, ease: 'easeOut' })
    target.querySelector('[data-popup-close]')?.focus()
  }
})
```

### CSS Styling

```scss
[data-popup] {
  position: fixed;
  justify-self: center;
  align-self: center;
  background-color: white;
  top: 50%;
  left: 50%;
  z-index: 5000;
  padding: 3em;
  text-align: center;
  display: none;
  opacity: 0;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
}

@media (max-width: 600px) {
  [data-popup] { width: 90%; }
}

[data-popup-backdrop] {
  z-index: 4999;
  display: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}
```


## StackedBoxes

```html
<div class="v-module" data-v="quote|image" data-moonwalk-section data-boxes-stacked>
  <aside data-boxes-stacked-size-target>
    <blockquote>
      Quote here
    </blockquote>
    <cite>
      Name
    </cite>
  </aside>
  <figure data-boxes-stacked-pull="2/3" data-boxes-stacked-size-src>
    <img src="/images/work.jpg" alt="Selected project">
  </figure>
</div>
```

## DoubleHeader

A dual-header module that clones the original header element. The clone stays fixed and
hides when scrolling down, revealing on scroll up. Uses IntersectionObserver to detect
when the original header is visible.

> **Note:** This module was previously named `StickyHeader`. It was renamed to `DoubleHeader`
> to better reflect its dual-header/clone architecture. The new `StickyHeader` module uses
> CSS `position: sticky` instead.

 * header element should not have position: fixed

### Options

- `default.onClone` - default `h => h.el.cloneNode(true)`
  - Hook to customize how the auxiliary header element is created

- `on` - default `Events.APPLICATION_REVEALED`
  - Automatically shows on `APPLICATION_REVEALED` event.

- `pinOnOutline` - default `false`
  - Pin header when user tabs
- `pinOnForcedScroll` - default `true`
  - Pin header when scroll is forced (`application.scrollTo`, clicking anchors etc)
- Set `default.unPinOnResize: true` to unpin the clone when the window is resized.
- `headerHeightTracksPin` - default `true`
  - Set per section (under `default` / `sections`). Whether `--header-height` drops
    to `0px` while the header is unpinned. Set `false` for a header that never
    retracts — see [CSS variables](#css-variables) under FixedHeader.

- Events
  - `onMainVisible`
    - Triggers when main nav is in viewport
  - `onMainInvisible`
    - Triggers when main nav leaves viewport
  - `onPin`
    - Triggers when the auxiliary nav gets pinned
  - `onUnpin`
    - Triggers when the auxiliary nav unpins
  - `beforeEnter`
    - Triggers during initialization. Useful for preparing elements
      before tweening into view


## StickyHeader

A header that uses `position: sticky`. Hides when scrolling down and is revealed on scrolling up.
Unlike FixedHeader, the sticky header stays in document flow - when hidden via transform,
its space is still reserved.

> **Note:** This is a new module. If you were using the old `StickyHeader` (which cloned the header),
> you should now use `DoubleHeader` instead.

 * header element needs `position: sticky; top: 0;`
 * No padding-top needed on content below (header stays in document flow)

### Options

Same options as FixedHeader - see FixedHeader documentation below, including
`headerHeightTracksPin` and the [CSS variables](#css-variables) section.


## FixedHeader

 * header element needs position: fixed;

### Options

- `on` - default `Events.APPLICATION_REVEALED`
  - Automatically enter on `APPLICATION_REVEALED` event.
- `unpinOnForcedScrollStart` and `pinOnForcedScrollEnd` both default to `true`.
- Set section-specific callbacks, including `onOutline`, under `default` or `sections[sectionName]`. The default outline handler pins the header.
- `sections`
  - Here you can set a config per section (body[data-script="section"])
  - `unPinOnResize` - auto unpin while resizing
  - `headerHeightTracksPin` - default `true`. Whether `--header-height` drops to `0px`
    while the header is unpinned. Set `false` for a header that never retracts.
  - `offset` - when is header triggered
  - `offsetBg` - when is offset background triggered (i.e. if there's another bg for content)
  - events are same as under default.

- Events
  *Standard events*
  - `enter`
    - Triggers 'enter' animation on the event set in `opts.on`
  - `beforeEnter`
    - Triggers during initialization. Useful for preparing elements
      before tweening into view
  - `onOutline`
    - When document is outlined. Default behaviour is to pin the header.

  *Section-specific events*
  - `onPin`
    - Triggers when the auxiliary nav gets pinned
  - `onUnpin`
    - Triggers when the auxiliary nav unpins
  - `onAltBg`
    - Triggers when the altBg offset is passed
  - `onNotAltBg`
    - Triggers when the altBg offset is passed to reg background
  - `onSmall`
    - Triggers when we're small
  - `onNotSmall`
    - Triggers when we're not small
  - `onTop`
    - Triggers when we're at the top
  - `onNotTop`
    - Triggers when we're not at the top
  - `onBottom`
    - Triggers when we're at the bottom
  - `onNotBottom`
    - Triggers when we're not at the bottom
  - `onMobileMenuOpen`
    - Triggers when mobile menu opens
  - `onMobileMenuClose`
    - Triggers when mobile menu closes

### CSS variables

`--header-height` is kept up to date on `:root`, republished whenever the header pins,
unpins or toggles small/big. By default it is how much header is *visible* — the
measured height while pinned, `0px` while unpinned — so anything positioned under the
bar follows it out of the way as it retracts.

For a header that never retracts — through `preventUnpin`, or by no-opping
`onPin`/`onUnpin` — set `headerHeightTracksPin: false`. The bar stays put, but the
pinned state still flips on every change of scroll direction, so the variable would
otherwise drop to `0px` and back while nothing moves. Any layout sized from it (a
`padding-top` standing in for the fixed bar, say) then grows and shrinks the document
under the reader. Scroll anchoring absorbs that mid-page, but not at the very bottom,
where the scroll offset is clamped to the document and the page visibly jumps.
`headerHeightTracksPin: false` publishes the measured height throughout.

 ```
 header[data-nav] {
  @include container();

  z-index: 10;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  backface-visibility: hidden;
  transition: padding-top 500ms ease, padding-bottom 500ms ease;

  @each $bp-name, $bp-size in $grid-breakpoints {
    @include media('>=#{$bp-name}') {
      @each $key, $val in map-get($header-padding, $bp-name) {
        #{$key}: #{$val};
      }
    }
  }

  &[data-header-small] {
    transition: padding-top 500ms ease, padding-bottom 500ms ease;

    @each $bp-name, $bp-size in $grid-breakpoints {
      @include media('>=#{$bp-name}') {
        @each $key, $val in map-get($header-padding-small, $bp-name) {
          #{$key}: #{$val};
        }
      }
    }
  }
 }
 ```


## HeroVideo

Set a cover image by supplying a `data-cover` element.
Select different video sources for phone and desktop by setting this attribute on the `<video>` element:
`data-src='{"phone": "<%= get_global("hero_link_phone") %>", "desktop": "<%= get_global("hero_link_desktop") %>"}'`

Hero example:

```html
<section class="hero stretch" data-section>
  <div class="hero-bg">
    <div data-hero-video data-object-fit="cover">
      <img src="/img/wide.jpg" data-object-fit="cover" data-cover />
      <div data-hero-video-content>
        <video tabindex="-1" role="presentation" preload="auto" muted loop playsinline src="/img/hero.mp4"></video>
      </div>
      <noscript>
        <video tabindex="-1" role="presentation" autoplay muted loop playsinline src="/img/hero.mp4"></video>
      </noscript>
    </div>
  </div>
  <article class="hero-content">
    <div class="container">
      <section class="main-text">
        <p>
          We specialise in branding<br>
          and identity design.
        </p>
      </section>
    </div>
    <section class="centered-arrow">
      <a href="#index-content">
        <span class="arrow-d mt-3">↓</span>
      </a>
    </section>
  </article>
</section>
```

### Options

- Events
  - `onFadeIn: (hero) => {}`
  - `onPlayReady: (hero) => {}`
  - `onClickPlay: (hero) => {}`
  - `onClickPause: (hero) => {}`
  - `onFadeInCover: (hero) => {}`
  - `onFadeOutCover: (hero) => {}`

- Elements
  - `elements.play`
    - Function returning the play icon markup for the `[data-hero-video-pause]` button.
  - `elements.pause`
    - Function returning the pause icon markup for the same button.


## Parallax

Smooth parallax scrolling effect for images and elements, inspired by SimpleParallax.js.

### Options

- `el`
  - default `[data-parallax]`
  - Can also be `[data-parallax-parent]` for multi-element parallax

- `factor`
  - default `1.3`
  - Controls the speed of the parallax effect (higher = more movement)
  - Can be overridden per-element with `data-parallax-factor` attribute

- `fadeContent`
  - default `true`
  - If true, fades out content as it leaves the viewport
  - For multi-element parallax, can be set per-element with `data-parallax-fade` attribute

- `scale`
  - default `1.2`
  - Scale factor to apply to parallax background images to prevent gaps during movement

- `orientation`
  - default `'up'`
  - Direction of parallax movement: `'up'`, `'down'`, `'left'`, or `'right'`
  - Can be overridden per-element with `data-parallax-orientation` attribute

- `overflow`
  - default `false`
  - Whether to allow element overflow to be visible

### Single-Element Parallax

For traditional parallax effects with a background and content:

```html
<style>
  [data-parallax] {
    position: relative;
    min-height: 70vh;
    overflow: hidden;
  }

  [data-parallax-figure] {
    position: absolute;
    top: -20%;
    left: 0;
    width: 100%;
    height: 140%;
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  [data-parallax-content] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
    will-change: transform, opacity;
  }
</style>

<section data-parallax>
  <div 
    data-parallax-figure 
    style="background-image: url('/path/to/image.jpg');"
  ></div>
  <div data-parallax-content>
    <h2>Parallax Title</h2>
    <p>Parallax content with automatic fade effect</p>
  </div>
</section>
```

### Multi-Element Parallax

For creating parallax effects with multiple elements, each with their own movement speed and fade settings:

```html
<style>
  [data-parallax-parent] {
    position: relative;
    height: 80vh;
    overflow: hidden;
  }
  
  .parallax-element {
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    will-change: transform, opacity;
  }
  
  /* Position elements as needed */
  .element-1 {
    background-color: #e74c3c;
    left: 20%;
    top: 30%;
  }
  
  .element-2 {
    background-color: #3498db;
    left: 50%;
    top: 40%;
  }
  
  .element-3 {
    background-color: #2ecc71;
    left: 70%;
    top: 50%;
  }
</style>

<div data-parallax-parent>
  <!-- Slow element moving down -->
  <div 
    class="parallax-element element-1" 
    data-parallax-factor="0.8" 
    data-parallax-orientation="down"
  >
    Slow downward movement
  </div>
  
  <!-- Medium element with fade effect -->
  <div 
    class="parallax-element element-2" 
    data-parallax-factor="1.5" 
    data-parallax-fade
  >
    Medium upward movement with fade
  </div>
  
  <!-- Fast element without fade moving left -->
  <div 
    class="parallax-element element-3" 
    data-parallax-factor="2.5"
    data-parallax-orientation="left"
  >
    Fast leftward movement
  </div>
</div>
```

### Initialize in JS

```js
import { Application, Parallax } from '@brandocms/jupiter'

const app = new Application()

// Traditional parallax with background image and content
const singleParallax = new Parallax(app, {
  // Default options
  factor: 1.3,
  fadeContent: true,
  scale: 1.2  
})

// Multi-element parallax
const multiParallax = new Parallax(app, {
  el: '[data-parallax-parent]',
  orientation: 'up'  // Default movement direction
})

// Cleanup when needed
function cleanup() {
  singleParallax.destroy()
  multiParallax.destroy()
}
```

### Using with picture elements

For using parallax with responsive images:

```html
<section data-parallax>
  <div data-parallax-figure>
    <picture>
      <source media="(min-width: 1200px)" srcset="/images/large.jpg">
      <source media="(min-width: 768px)" srcset="/images/medium.jpg">
      <img src="/images/small.jpg" alt="Parallax image">
    </picture>
  </div>
  <div data-parallax-content>
    <h2>Responsive Parallax</h2>
  </div>
</section>
```


## CSS/JS Quirks

Use `playsinline` and `muted` for inline video autoplay. Add `loop` when the video should repeat.
