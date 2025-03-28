<p align="center">
  <sup><em>«Earth people, I was born on»</em></sup>
</p>

![](http://univers.agency/jupiter.svg)

<p align="center">
  <img src="https://github.com/univers-agency/jupiter/workflows/CI/badge.svg">
  <a href="https://badge.fury.io/js/%40univers-agency%2Fjupiter"><img src="https://badge.fury.io/js/%40univers-agency%2Fjupiter.svg" alt="npm version" height="18"></a>
</p>

------

## NOTICE

This package is not compiled with Babel, which means that your build step should babelify it.
Meaning, if your bundler's babel config excludes `node_modules`, you should add `jupiter` as an exception.
In your webpack babel loader config:

```es6
exclude: [
  /node_modules([\\]+|\/)+(?!@univers-agency\/jupiter)/
]
```


## Application

### Config

- `respectReducedMotion` - default `true`


### Available CSS vars

- `--vp-initial-inner-h` - Initial window inner height
- `--vp-initial-outer-h` - Initial window outer height
- `--vp-initial-inner-w` - Initial window inner width
- `--vp-initial-outer-w` - Initial window outer width


### Methods/functions

- `registerCallback(type, callback)`
  - Registers `callback` to be called when an event `type` occurs.
  - Example:
  ```es6
  const app = new Application()

  app.registerCallback(Events.APPLICATION_PRELUDIUM, () => { ... })
  app.registerCallback(Events.APPLICATION_INITIALIZED, () => { ... })
  app.registerCallback(Events.APPLICATION_READY, () => { ... })
  ```

- `isScrolled()`
  - If application is scrolled or not

- `scrollLock()`
  - Lock the application's scrolling

- `scrollRelease()`
  - Release the application's scrolling

- `scrollTo(target)`
  - scroll to target

- `pollForElement(target, time = 500, callback = () => {})`
  - Checks if `target` is in DOM every 500ms until successful, then calls `callback`

- `pollForVar(variable, time = 500, callback = () => {})`
  - Checks if `variable` is true every 500ms until successful, then calls `callback`


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
  - Returns number in pixels element1 and element2 overlaps

- `Dom.offset(element)`
  - Returns `top` and `left` offsets for `element`

- `Dom.position(element)`
  - Returns `top` and `left` positions for `element`

- `Dom.getCSSVar(key)`
  - Get `key` as CSS var on root

- `Dom.setCSSVar(key, val)`
  - Sets `key` with `val` as CSS var on root



## Events (application)

- `APPLICATION:PRELUDIUM`

Called before initialization

- `APPLICATION:INITIALIZED`

Called after initialization

- `APPLICATION:READY`

Called when application/dom ready

- `APPLICATION:REVEALED`

Called after `#fader` removed

- `APPLICATION:MOBILE_MENU:OPEN`

Called on opening mobile navigation menu

- `APPLICATION:MOBILE_MENU:CLOSE`

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

Called when an image marked for lazyloading finishes loading. Gets called on the element itself:

```es6
import * as Events from jupiter
const image = document.querySelector('.my-image')
image.addEventListener(Events.IMAGE_LAZYLOADED, () => { console.log('lazyloaded') })
```

`SECTION:LAZYLOADED`

Called when a section enters the viewport and its pictures are done loading

```es6
import * as Events from jupiter
const section = document.querySelector('.my-section[data-lazyload-section]')
section.addEventListener(Events.SECTION_LAZYLOADED, () => { console.log('lazyloaded') })
```

## Lightbox

Can be initiated with a sectioned name `data-lightbox-section`. The lightbox will only
include images from this section. Otherwise, all lightboxed images will be included.

```html
<div
  data-lightbox="/media/images/site/posts/xlarge/2gmk2h1d8d4q.jpg"
  data-lightbox-section="intro"
  aria-hidden="true">
  <figure>
    <img
      alt="Text"
      src="/media/images/site/posts/small/2gmk2h1d8d4q.jpg"
      height="1667"
      width="2210">

      <div data-lightbox-trigger>Click to trigger</div>
  </figure>
</div>
```

#### Options

- `trigger` - `false` - selector representing an element you want to use as a trigger to open lightbox
- `captions` - `false` - whether to show captions or not in the overlay
- `swipe` - `true` – if swipe is true, native zoom won't work, so allow choosing
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

[data-toggle-content] {
  height: 0;
  overflow: hidden;
  opacity: 1;
  position: relative;
}
```

JS
```es6
import { Toggler } from '@brandocms/jupiter'

app.togglers = []

const togglers = Dom.all('[data-toggle]')
togglers.forEach(toggleEl => {
  app.togglers.push(new Toggler(app, toggleEl))
})
```

#### Options


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


## Moonwalk

Moonwalks are divided into sections that are run in a timeline. Multiple
timelines can run at the same time.

You reference the configured `walks` by the `data-moonwalk="walkname"`
syntax. If no value is provided, we run the `default` walk.

#### Options

- `on` - default `Events.APPLICATION_REVEALED`
  - Automatically fire on `APPLICATION_REVEALED` event. Set this to `() => {}` if
    you need to do customized initialization before firing.

- `initialDelay` - default `0`
  - Set a delay before calling the `ready` function. Useful for timing reveal against
    other reveals happening towards the `APPLICATION_REVEALED` event for instance.

- `clearLazyload` - default `false`
  - Clear out all `data-ll-srcset` from moonwalk elements

- `clearNestedSections` - default `true`
  - Clear nested `data-moonwalk-sections` since they usually just break functionality.

- `clearMoonwalkOnAnchors` - default `false`
  - Removes all moonwalks if called from a link with hash/anchor.

- `rootMargin` - default `'-15%'`
  - Determines how early the IntersectionObserver triggers

- `threshold` - default `0`
  - How much of the element must be visible before IO trigger. From 0 to 1 where 1 is the entire element

- `uniqueIds` - default `false`
  - Create unique `[data-moonwalk-id="<rand>"] prop for each moonwalk element

- `addIndexes` - default `false`
  - Create `[data-moonwalk-idx="X"] inside of each section per key

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
  - Configures tweens
  - Example:
  ```es6
  walks: {
    default: {
      /* How long between multiple entries in a moonwalk section */
      interval: 0.1,
      /* How long each tween is */
      duration: 0.65,
      /* Add a separate tween for opacity/visibility.
      Can be set to `true` for the default tween, or `false` to skip */
      alphaTween: { ease: Sine.easeIn, duration: 1 },
      /* The transitions that will be tweened */
      transition: {
        from: {
          y: 5
        },
        to: {
          /* skip autoAlpha here, since we have our own alphaTween that sets it for us */
          // autoAlpha: 1,
          ease: 'sine.out',
          force3D: true,
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
Needs the `sectionTargets` key in config. If `sectionTargets` is not provided,
the section's immediate children are used instead.

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
      autoAlpha: 0,
      y: 21
    },
    to: {
      ease: 'sine.out',
      y: 0
    }
  }
}

```

### Stages

A stage will run a transition on itself before introducing the rest
of the moonwalks. For instance, if a section should be animated to
"open" by scaling Y from 0 to 100. When the stage's tween is finished,
the rest are called as they intersect.

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
    interval: 0,
    duration: 1,
    startDelay: 1,
    transition: {
      from: {
        scaleY: 0,
        transformOrigin: '50% 50%'
      },

      to: {
        scaleY: 1,
        ease: 'sine.out'
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

The Popup module allows you to create modal dialogs that appear when triggered by a button click.

### Options

- `selector` - default `[data-popup]`
  - CSS selector to find popup elements

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
<div id="my-popup" data-popup>
  <div class="popup-header">
    <h3>My Popup</h3>
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
<div id="newsletter-popup" data-popup data-popup-key="newsletter">
  <div class="popup-header">
    <h3>Newsletter Signup</h3>
    <button class="close-button" data-popup-close>×</button>
  </div>
  <div class="popup-content">
    <p>Sign up for our newsletter!</p>
  </div>
</div>

<!-- Second popup with key "login" -->
<div id="login-popup" data-popup data-popup-key="login">
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

You can customize the animation for specific popups:

```js
const customPopup = new Popup(app, '[data-popup][data-popup-key="custom"]', {
  tweenIn: (trigger, target, popup) => {
    // Set backdrop visible
    gsap.set(popup.backdrop, { display: 'block' })
    gsap.to(popup.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        // Bounce in animation for popup
        gsap.fromTo(
          target,
          {
            scale: 0.5,
            opacity: 0,
            display: 'block'
          },
          {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.7)'
          }
        )
      }
    })
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
  
  @responsive mobile {
    width: 90%;
  }
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
    <%= picture_tag Enum.at(@works, 2).cover, img_class: "img-fluid", alt: "--", key: :original, prefix: media_url() %>
  </figure>
</div>
```

## StickyHeader

 * header element should not have position: fixed

### Options

- `onClone` - default `h => h.el.cloneNode(true)`
  - Hook to customize how the auxillary header element is created

- `on` - default `Events.APPLICATION_REVEALED`
  - Automatically shows on `APPLICATION_REVEALED` event.

- `pinOnOutline` - default `false`
  - Pin header when user tabs
- `pinOnForcedScroll` - default `true`
  - Pin header when scroll is forced (`application.scrollTo`, clicking anchors etc)
- `unPinOnResize` - default `false`
  - Unpin header when window is resized

- Events
  - `onMainVisible`
    - Triggers when main nav is in viewport
  - `onMainInvisible`
    - Triggers when main nav leaves viewport
  - `onPin`
    - Triggers when the auxillary nav gets pinned
  - `onUnpin`
    - Triggers when the auxillary nav unpins
  - `beforeEnter`
    - Triggers during initialization. Useful for preparing elements
      before tweening into view


## FixedHeader

 * header element needs position: fixed;

### Options

- `on` - default `Events.APPLICATION_REVEALED`
  - Automatically enter on `APPLICATION_REVEALED` event.
- `pinOnOutline` - default `false`
  - Pin header when user tabs
- `sections`
  - Here you can set a config per section (body[data-script="section"])
  - `unPinOnResize` - auto unpin while resizing
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
    - Triggers when the auxillary nav gets pinned
  - `onUnpin`
    - Triggers when the auxillary nav unpins
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
Allow different srcs for mobile/desktop by setting
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
    - string SVG representing the play icon
    - Gets wrapped in a button with `[data-hero-video-pause].
  - `elements.pause`
    - string SVG representing the pause icon
    - Gets wrapped in a button with `[data-hero-video-pause].


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

  - autoplay hero video.
    - iOS safari needs `playsinline`, `muted` and `loop` attributes
