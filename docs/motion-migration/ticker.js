'use strict'
;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [81105],
  {
    24560: (e, t, n) => {
      n.d(t, {
        p: () => i,
      })
      var r = n(6733)
      function i(...e) {
        let t = !Array.isArray(e[0]),
          n = t ? 0 : -1,
          o = e[0 + n],
          l = e[1 + n],
          a = e[2 + n],
          s = e[3 + n],
          u = (0, r.G)(l, a, s)
        return t ? u(o) : u
      }
    },
    32709: (e, t, n) => {
      n.d(t, {
        N: () => l,
      })
      var r = n(62081),
        i = n(7620),
        o = n(39070)
      function l(e) {
        let t = (0, i.useRef)(0),
          { isStatic: n } = (0, i.useContext)(o.Q)
        ;(0, i.useEffect)(() => {
          if (n) return
          let i = n => {
            let { timestamp: r, delta: i } = n
            t.current || (t.current = r), e(r - t.current, i)
          }
          return r.Gt.update(i, !0), () => (0, r.WG)(i)
        }, [e])
      }
    },
    67466: (e, t, n) => {
      n.d(t, {
        Hf: () => f,
        Hs: () => u,
        Ad: () => a,
      })
      var r = n(25164),
        i = n(18928)
      function o(e, t) {
        let n = document.createElement('span')
        return (
          e && (n.className = e),
          void 0 !== t && (n.dataset.index = t.toString()),
          (n.style.display = 'inline-block'),
          n
        )
      }
      function l(e, t, n, r) {
        let i = o(n, r)
        return (i.textContent = t), e.appendChild(i), i
      }
      function a(
        e,
        {
          splitBy: t = ' ',
          charClass: n = 'split-char',
          wordClass: s = 'split-word',
          lineClass: u = 'split-line',
        } = {}
      ) {
        let [d] = (0, r.K)(e)
        ;(0, i.V)(!!d, 'Element not found')
        let c = d.textContent || ''
        d.setAttribute('aria-label', c), (d.textContent = '')
        let f = {
            chars: [],
            words: [],
            lines: [],
          },
          p = c.split(t),
          h = [],
          g = []
        for (let e = 0; e < p.length; e++) {
          let r = p[e],
            i = o(s, e)
          f.words.push(i), h.push(i)
          let a = Array.from(r)
          for (let e = 0; e < a.length; e++) {
            let t = l(i, a[e], n, e)
            f.chars.push(t)
          }
          if ((d.appendChild(i), e < p.length - 1))
            if (' ' === t) {
              let e = document.createTextNode(' ')
              d.appendChild(e), g.push(e)
            } else {
              let e = l(i, t, `${n}-delimiter`)
              f.chars.push(e)
            }
        }
        let m = h.map((e, t) => ({
            element: e,
            top: e.offsetTop,
            index: t,
            spacer: t < g.length ? g[t] : null,
          })),
          y = [],
          v = [],
          x = m[0]?.top ?? 0,
          w = 0
        for (let e = 0; e < m.length; e++) {
          let { element: t, top: n, spacer: r } = m[e]
          n > x &&
            v.length > 0 &&
            (y.push({
              elements: v,
              lineIndex: w++,
            }),
            (v = []),
            (x = n)),
            v.push(t),
            r && v.push(r)
        }
        for (let { elements: e, lineIndex: t } of (v.length > 0 &&
          y.push({
            elements: v,
            lineIndex: w,
          }),
        (d.textContent = ''),
        y)) {
          let n = o(u, t)
          for (let t of ((n.style.display = 'inline-block'), f.lines.push(n), e)) n.appendChild(t)
          d.appendChild(n)
        }
        return f
      }
      function s(e, t) {
        return e.length > t.length || (e.length > 0 && !t.startsWith(e))
      }
      function u(e, t, n, r, i) {
        if (s(t, e)) return n * i
        if ('natural' === r)
          return (function (e, t, n) {
            let r = t.length,
              i = e[r],
              o = e[r - 1]
            if (!i) return n
            let l = e.slice(0, r).lastIndexOf(' '),
              a = r - l - 1,
              s = e.slice(r).indexOf(' '),
              u = (-1 === s ? e.length : r + s) - (l + 1),
              f = 1
            o && /[.!?]/.test(o) && ' ' === i && (f *= 3),
              u <= 3
                ? (f *= 0.7)
                : (0 === a && ' ' !== i && (f *= 1.5), a === u - 1 && (f *= 1.4)),
              a > 0 && a < u - 1 && u > 3 && (f *= 1 - Math.min(a / u, 0.4)),
              d.has(i) && (f *= 1.5),
              c.has(i) && (f *= 1.5),
              /\d/.test(i) && (f *= 1.3),
              u > 8 && (f *= 1.3),
              i !== i.toLowerCase() && (f *= 1.25),
              r > 200 && (f *= 1 + Math.min((r - 200) / 1e3, 0.3))
            let p = n * (f *= 1 + (-0.25 + 0.5 * Math.random()))
            return Math.max(0.2 * n, p)
          })(e, t, n)
        if ('number' == typeof r && r > 0) {
          var o
          let e = (r / 100) * n
          return n + ((o = -e) + (e - o) * Math.random())
        }
        return n
      }
      let d = new Set(['.', ',', '!', '?', ':', ';', "'", '"', '-', '(', ')']),
        c = new Set([
          '!',
          '@',
          '#',
          '$',
          '%',
          '^',
          '&',
          '*',
          '(',
          ')',
          '_',
          '+',
          '{',
          '}',
          '|',
          ':',
          '"',
          '<',
          '>',
          '?',
        ])
      function f(e, t, n, r) {
        if ('type' === n && s(e, t))
          if ('all' === r)
            return t.slice(
              0,
              (function (e, t) {
                let n = Math.min(e.length, t.length),
                  r = 0
                for (let i = 0; i < n; i++)
                  if (e[i] === t[i]) r = i + 1
                  else break
                return r
              })(e, t)
            )
          else {
            if ('word' !== r) return e.slice(0, -1)
            let t = (function (e, t) {
              let n = t - 1
              for (; n >= 0 && /\s/.test(e[n]); ) n--
              for (; n >= 0 && !/\s/.test(e[n]); ) n--
              return Math.max(0, n + 1)
            })(e, e.length)
            return e.slice(0, t)
          }
        return t.slice(0, e.length + 1)
      }
    },
    79457: (e, t, n) => {
      n.d(t, {
        j: () => l,
      })
      var r = n(62081),
        i = n(85176),
        o = n(98425)
      function l(e, t) {
        let n = (0, o.d)(t()),
          l = () => n.set(t())
        return (
          l(),
          (0, i.E)(() => {
            let t = () => r.Gt.preRender(l, !1, !0),
              n = e.map(e => e.on('change', t))
            return () => {
              n.forEach(e => e()), (0, r.WG)(l)
            }
          }),
          n
        )
      }
    },
    81105: (e, t, n) => {
      let r, i
      n.d(t, {
        pe: () => e_,
        Bm: () => eu,
        Cursor: () => W,
        Rv: () => e$,
        cU: () => eK,
        Hy: () => E,
        Kg: () => eN,
        J0: () => H,
        On: () => C,
      })
      var o = n(54568),
        l = n(7620),
        a = n(14769),
        s = n(53830)
      function u() {
        s.r.current || (0, a.U)()
        let [e] = (0, l.useState)(s.O.current)
        return e
      }
      var d = n(82290),
        c = n(90215),
        f = n(94661),
        p = n(35678),
        h = n(1335)
      function g(e, t, n) {
        return {
          width: n?.width ?? e,
          height: n?.height ?? t,
        }
      }
      var m = n(97509)
      let y = null
      function v(e) {
        return t => {
          'mouse' === t.pointerType && e(t)
        }
      }
      function x(e) {
        return v(t => {
          0 === t.button && e(t)
        })
      }
      let w = null,
        b = {
          type: 'default',
          isPressed: !1,
          fontSize: null,
          targetBoundingBox: null,
          target: null,
          zone: null,
        }
      function E() {
        let [e, t] = (0, l.useState)({
          ...b,
        })
        return (
          (0, l.useEffect)(
            () =>
              (!w &&
                (w = (function () {
                  let e = new Set()
                  function t(t) {
                    ;(b = {
                      ...b,
                      ...t,
                    }),
                      e.forEach(e => e(b))
                  }
                  let n = x(() => {
                      b.isPressed ||
                        t({
                          isPressed: !0,
                        })
                    }),
                    r = x(() => {
                      b.isPressed &&
                        t({
                          isPressed: !1,
                        })
                    }),
                    i = v(({ target: e }) => {
                      if (!e) return
                      let [n, r] = (function (e) {
                          let t = e.closest('[data-cursor]')
                          return t
                            ? [t.dataset.cursor, t]
                            : (t = e.closest('a, button, input[type="button"]:not(:disabled)'))
                            ? ['pointer', t]
                            : (t =
                                'none' === window.getComputedStyle(e).userSelect
                                  ? null
                                  : e.closest(
                                      "p, textarea:not(:disabled), input[type='text']:not(:disabled), h1, h2, h3, h4, h5, h6"
                                    ))
                            ? ['text', t]
                            : ['default', null]
                        })(e),
                        i = !1,
                        o = {
                          target: r,
                          zone: (function (e) {
                            let t = null
                            if ('closest' in e) {
                              let n = e.closest('[data-cursor-zone]')
                              n instanceof HTMLElement && (t = n.dataset.cursorZone || null)
                            }
                            return t
                          })(e),
                        }
                      n !== b.type && ((o.type = n), (i = !0)),
                        o.zone !== b.zone && ((o.zone = o.zone), (i = !0))
                      let l = 'pointer' === n && r ? r.getBoundingClientRect() : null
                      if (
                        (l !== b.targetBoundingBox && ((o.targetBoundingBox = l), (i = !0)),
                        'text' === n)
                      ) {
                        let { fontSize: t } = window.getComputedStyle(e),
                          n = t ? parseInt(t) : null
                        n !== b.fontSize && ((o.fontSize = n), (i = !0))
                      } else b.fontSize && ((o.fontSize = null), (i = !0))
                      i && t(o)
                    })
                  return {
                    onChange: t => (
                      e.size ||
                        (window.addEventListener('pointerover', i),
                        window.addEventListener('pointerdown', n),
                        window.addEventListener('pointerup', r)),
                      e.add(t),
                      () => {
                        e.delete(t),
                          e.size ||
                            (window.removeEventListener('pointerover', i),
                            window.removeEventListener('pointerdown', n),
                            window.removeEventListener('pointerup', r))
                      }
                    ),
                  }
                })()),
              w).onChange(e => {
                t(e)
              }),
            [e]
          ),
          e
        )
      }
      var L = n(48981),
        S = n(83725),
        j = n(14536),
        k = n(62081)
      function C() {
        return (
          r ||
            (function () {
              ;(r = (0, j.OQ)(0)), (i = (0, j.OQ)(0))
              let e = 0,
                t = 0
              function n() {
                r.set(e), i.set(t)
              }
              'undefined' != typeof window &&
                window.addEventListener(
                  'pointermove',
                  v(r => {
                    ;(e = r.clientX), (t = r.clientY), k.Gt.update(n)
                  })
                )
            })(),
          {
            x: r,
            y: i,
          }
        )
      }
      var I = n(98425),
        P = n(85176),
        B = n(61569),
        z = n(27235)
      function M(e, t, n) {
        let r = (0, d.z)(0, {
            stiffness: 600,
            damping: 50,
          }),
          i = (0, I.d)(0),
          o = (0, S.G)(() => (0, z.j)(e.get(), r.get(), i.get())),
          a = (0, l.useRef)(n)
        return (
          (0, P.E)(() => {
            n
              ? (a.current || i.isAnimating() ? r.set(n) : r.jump(n), (0, B.i)(i, t))
              : (0, B.i)(i, 0),
              (a.current = n)
          }, [n]),
          o
        )
      }
      var R = n(97037)
      function $() {
        let e = document.createElement('style')
        return (
          (e.textContent = `
      * {
          cursor: none !important;
      }
          
      [data-motion-cursor="pointer"] {
          background-color: #333;
      }
    `),
          document.head.appendChild(e),
          () => {
            document.head.removeChild(e)
          }
        )
      }
      let A = {
          x: 0,
          y: 0,
        },
        D = {
          x: 0.5,
          y: 0.5,
        },
        O = {
          duration: 0,
        },
        T = {
          followSpring: {
            stiffness: 1e3,
            damping: 100,
          },
          magneticOptions: {
            morph: !0,
            padding: 5,
            snap: 0.8,
          },
        }
      function W(e) {
        let {
            follow: t = !1,
            center: n = t ? A : D,
            offset: r = A,
            spring: i = !!t && T.followSpring,
            magnetic: a = !1,
            matchTextSize: s = !0,
            children: v,
            style: x,
            ...w
          } = e,
          b = u()
        ;(q = !b && !t), (0, l.useInsertionEffect)(q ? $ : R.l, [q])
        let j = C(),
          k = {
            x: (0, S.G)(() => j.x.get() + r.x),
            y: (0, S.G)(() => j.y.get() + r.y),
          },
          I = (0, d.z)(k.x, i || void 0),
          P = (0, d.z)(k.y, i || void 0),
          B =
            'object' == typeof a
              ? {
                  ...T.magneticOptions,
                  ...a,
                }
              : T.magneticOptions,
          z = () => {
            let e = k.x.on('change', t => {
                I.jump(t), e()
              }),
              t = k.y.on('change', e => {
                P.jump(e), t()
              })
          },
          W = E(),
          N = (function (e) {
            let [t, n] = (0, l.useState)(!0)
            return (
              (0, l.useEffect)(
                () =>
                  (!y &&
                    (y = (function () {
                      let e = new Set()
                      function t() {
                        e.forEach(e => e.show())
                      }
                      function n() {
                        e.forEach(e => e.hide())
                      }
                      return {
                        on: r => (
                          e.size ||
                            (document.body.addEventListener('mouseenter', t),
                            document.body.addEventListener('mouseleave', n)),
                          e.add(r),
                          () => {
                            e.delete(r),
                              0 === e.size &&
                                (document.body.removeEventListener('mouseenter', t),
                                document.body.removeEventListener('mouseleave', n))
                          }
                        ),
                      }
                    })()),
                  y).on({
                    show: () => {
                      t || (e(), n(!0))
                    },
                    hide: () => n(!1),
                  }),
                [t]
              ),
              t
            )
          })(z),
          { x: H, y: Q } = (function (e, t, n, r) {
            let i = M(
                e.x,
                r,
                n.targetBoundingBox
                  ? n.targetBoundingBox.left + n.targetBoundingBox.width / 2
                  : void 0
              ),
              o = M(
                e.y,
                r,
                n.targetBoundingBox
                  ? n.targetBoundingBox.top + n.targetBoundingBox.height / 2
                  : void 0
              )
            return t
              ? {
                  x: i,
                  y: o,
                }
              : e
          })(
            i
              ? {
                  x: I,
                  y: P,
                }
              : j,
            !!a,
            W,
            B.snap
          ),
          { width: F, height: K } = (function ({
            type: e,
            state: t,
            hasChildren: n,
            style: r,
            isMagnetic: i,
            magneticOptions: o,
            matchTextSize: l,
          }) {
            let a = i && t.targetBoundingBox
            if (n && !a) return g('auto', 'auto', r)
            switch (e) {
              case 'pointer':
                let { padding: s, morph: u } = o
                if (i && u && t.targetBoundingBox) {
                  let { width: e, height: n } = t.targetBoundingBox
                  return {
                    width: e + 2 * s,
                    height: n + 2 * s,
                  }
                }
                return g(31, 31, r)
              case 'text':
                if (l && t.fontSize)
                  return {
                    width: 4,
                    height: t.fontSize,
                  }
                return g(4, 20, r)
              default:
                return g(17, 17, r)
            }
          })({
            type: W.type,
            state: W,
            hasChildren: !!v,
            style: x,
            isMagnetic: !!a,
            magneticOptions: B,
            matchTextSize: s,
          })
        var X,
          _,
          V,
          q,
          U = !(function ({ x: e, y: t }, n) {
            let [r, i] = (0, l.useState)(void 0 !== e.prev || void 0 !== t.prev)
            return (
              (0, l.useInsertionEffect)(() => {
                if (r) return
                let o = () => {
                    i(!0), n(), l()
                  },
                  l = (0, L.F)(e.on('change', o), t.on('change', o))
                return () => l()
              }, [e, t, r]),
              r
            )
          })(j, z)
            ? null
            : (0, o.jsx)(c.o, {
                children: (0, o.jsx)(f.x, {
                  transition: b ? O : w.transition || G,
                  children: (0, o.jsx)(p.P.div, {
                    layout: !0,
                    'data-motion-cursor': t ? 'follow' : 'pointer',
                    'data-framer-portal-id': 'motion-cursor',
                    initial: 'exit',
                    exit: 'exit',
                    ...w,
                    variants: {
                      pressed: t
                        ? {}
                        : {
                            scale: 0.9,
                          },
                      ...w.variants,
                      default: {
                        opacity: 1,
                        scale: 1,
                        ...(null == (_ = w.variants) ? void 0 : _.default),
                      },
                      exit: {
                        opacity: 0,
                        scale: 0,
                        ...(null == (V = w.variants) ? void 0 : V.exit),
                      },
                    },
                    animate: [
                      'default',
                      W.type,
                      a && W.targetBoundingBox ? 'magnetic' : '',
                      N ? (W.isPressed ? 'pressed' : '') : 'exit',
                    ],
                    transformTemplate:
                      ((X = n),
                      (e, t) =>
                        'translate(-'
                          .concat(100 * X.x, '%, -')
                          .concat(100 * X.y, '%) ')
                          .concat(t)),
                    style: {
                      borderRadius: 20 * !t,
                      zIndex: t ? 99998 : 99999,
                      willChange: 'transform',
                      contain: 'layout',
                      originX: n.x,
                      originY: n.y,
                      ...x,
                      width: F,
                      height: K,
                      x: H,
                      y: Q,
                      top: 0,
                      left: 0,
                      position: 'fixed',
                      pointerEvents: 'none',
                    },
                    children: (0, o.jsx)(h.N, {
                      children: v,
                    }),
                  }),
                }),
              })
        let [J, Y] = (0, l.useState)(null)
        return (
          (0, l.useLayoutEffect)(() => {
            Y(document.body)
          }, []),
          J ? (0, m.createPortal)(U, J) : null
        )
      }
      let G = {
        duration: 0.15,
        ease: [0.38, 0.12, 0.29, 1],
      }
      function N(e, t, n) {
        let r = (0, I.d)(0),
          i = (0, I.d)(0),
          o = (0, I.d)(0)
        return (
          (0, l.useEffect)(() => {
            if ('number' == typeof n) {
              ;(0, B.i)(o, 1)
              let r = () => {
                i.set(t * (e.get() - n))
              }
              return r(), e.on('change', r)
            }
            ;(0, B.i)(o, 0)
          }, [n]),
          (0, S.G)(() => (0, z.j)(r.get(), i.get(), o.get()))
        )
      }
      function H(e, t = 0.1) {
        let n = E(),
          r = C(),
          i = (0, l.useMemo)(
            () => n.targetBoundingBox && n.target === e.current,
            [n.targetBoundingBox, n.target, e.current]
          )
        return {
          x: N(r.x, t, i ? n.targetBoundingBox.left + n.targetBoundingBox.width / 2 : void 0),
          y: N(r.y, t, i ? n.targetBoundingBox.top + n.targetBoundingBox.height / 2 : void 0),
        }
      }
      var Q = n(69389),
        F = n(39070),
        K = n(73227)
      let X = 'var(--mask-height, 0.15em)',
        _ = 'var(--mask-width, 0.5em)',
        V = `calc(${_} / var(--invert-x, 1))`,
        q = '#000 0, transparent 71%',
        U = `linear-gradient(to right, transparent 0, #000 ${V}, #000 calc(100% - ${V}), transparent),linear-gradient(to bottom, transparent 0, #000 ${X}, #000 calc(100% - ${X}), transparent 100%),radial-gradient(at bottom right, ${q}),radial-gradient(at bottom left, ${q}), radial-gradient(at top left, ${q}), radial-gradient(at top right, ${q})`,
        J = `100% calc(100% - ${X} * 2),calc(100% - ${V} * 2) 100%,${V} ${X},${V} ${X},${V} ${X},${V} ${X}`
      function Y({ children: e, layoutDependency: t }) {
        return (0, o.jsx)(p.P.span, {
          layout: !0,
          layoutDependency: t,
          'aria-hidden': !0,
          style: {
            display: 'inline-flex',
            '--invert-x': 1,
            margin: `0 calc(-1*${_})`,
            padding: `calc(${X}/2) ${_}`,
            position: 'relative',
            zIndex: -1,
            overflow: 'clip',
            WebkitMaskImage: U,
            WebkitMaskSize: J,
            WebkitMaskPosition: 'center, center, top left, top right, bottom right, bottom left',
            WebkitMaskRepeat: 'no-repeat',
          },
          children: e,
        })
      }
      function Z() {
        let e = (0, l.useRef)(!0)
        return (
          (0, l.useEffect)(() => {
            e.current = !1
          }, []),
          e.current
        )
      }
      ;(0, K.$)({
        '--invert-x': {
          correct: (e, { treeScale: t, projectionDelta: n }) => n.x.scale * t.x,
        },
      })
      var ee = n(26472)
      function et(e) {
        let { width: t, fontSize: n } = getComputedStyle(e)
        return `${parseFloat(t) / parseFloat(n)}em`
      }
      let en = new WeakMap(),
        er = (0, l.forwardRef)(function ({ value: e, initialValue: t = e, ...n }, r) {
          let { transition: i } = (0, l.useContext)(F.Q),
            a = (0, l.useRef)(t).current,
            s = Z(),
            u = (0, l.useRef)(null),
            d = (0, l.useRef)(null)
          ;(0, l.useImperativeHandle)(r, () => d.current, [])
          let c = (0, l.useRef)(Array(10)),
            f = (0, ee.tF)(),
            h = f ? e : 0
          ;(0, l.useLayoutEffect)(() => {
            u.current && c.current[a] && (u.current.style.width = et(c.current[a]))
          }, [])
          let g = (0, l.useRef)(t)
          ;(0, l.useLayoutEffect)(() => {
            if (!u.current || h === g.current) return
            let e = u.current.getBoundingClientRect(),
              t = d.current?.getBoundingClientRect(),
              n = e.height * (h - g.current) + (e.top - (t ? t.top || 0 : e.top))
            return (
              (0, B.i)(
                u.current,
                {
                  y: [n, 0],
                },
                i
              ),
              () => {
                g.current = h
              }
            )
          }, [h])
          let [m, y] = (0, l.useState)()
          ;(0, l.useEffect)(() => {
            if ((s && a === h) || !c.current[h]) return
            let e = et(c.current[h])
            d.current && en.set(d.current, e), y(e)
          }, [h])
          let v = e =>
            (0, o.jsx)(
              'span',
              {
                style: {
                  display: 'inline-block',
                  padding: `calc(${X}/2) 0`,
                },
                ref: t => void (c.current[e] = t),
                children: e,
              },
              e
            )
          return (0, o.jsx)(p.P.span, {
            ...n,
            ref: d,
            layout: 'position',
            'data-state': f ? void 0 : 'exiting',
            style: {
              display: 'inline-flex',
              justifyContent: 'center',
              width: m,
            },
            children: (0, o.jsxs)('span', {
              ref: u,
              style: {
                display: 'inline-flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              },
              children: [
                0 !== h &&
                  (0, o.jsx)('span', {
                    style: {
                      ...ei,
                      bottom: '100%',
                      left: 0,
                    },
                    children: Array(h)
                      .fill(null)
                      .map((e, t) => v(t)),
                  }),
                v(h),
                9 !== h &&
                  (0, o.jsx)('span', {
                    style: {
                      ...ei,
                      top: '100%',
                      left: 0,
                    },
                    children: Array(9 - h)
                      .fill(null)
                      .map((e, t) => v(h + t + 1)),
                  }),
              ],
            }),
          })
        }),
        ei = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
        },
        eo = (0, l.createContext)({
          justify: 'left',
        }),
        el = (0, l.forwardRef)(function (
          { partKey: e, type: t, children: n, layoutDependency: r, ...i },
          a
        ) {
          let s = (0, ee.tF)(),
            { justify: u } = (0, l.useContext)(eo)
          return (0, o.jsx)(p.P.span, {
            ...i,
            'data-state': s ? void 0 : 'exiting',
            style: {
              display: 'inline-flex',
              justifyContent: u,
              padding: `calc(${X}/2) 0`,
              position: 'relative',
            },
            layout: 'position',
            layoutDependency: r,
            ref: a,
            children: (0, o.jsx)(h.N, {
              mode: 'popLayout',
              anchorX: u,
              initial: !1,
              children: (0, o.jsx)(
                p.P.span,
                {
                  layout: 'right' === u && 'position',
                  layoutDependency: r,
                  initial: {
                    opacity: 0,
                  },
                  animate: {
                    opacity: [null, 1],
                  },
                  exit: {
                    opacity: [null, 0],
                  },
                  style: {
                    display: 'inline-block',
                    whiteSpace: 'pre',
                  },
                  children: n,
                },
                n
              ),
            }),
          })
        }),
        ea = (0, l.forwardRef)(function (e, t) {
          let {
              parts: n,
              justify: r = 'left',
              mode: i,
              style: a,
              name: s,
              layoutDependency: u,
              ...d
            } = e,
            c = (0, l.useRef)(null)
          ;(0, l.useImperativeHandle)(t, () => c.current, [])
          let f = (0, l.useMemo)(
              () => ({
                justify: r,
              }),
              [r]
            ),
            g = (0, l.useRef)(null),
            m = Z(),
            [y, v] = (0, l.useState)()
          return (
            (0, l.useEffect)(() => {
              if (!g.current) return
              if (m) {
                c.current && (c.current.style.width = et(g.current))
                return
              }
              let e = Array.from(g.current.children).map(e => {
                if (!(e instanceof HTMLElement)) return
                if ('exiting' === e.dataset.state) {
                  let t = e.nextSibling
                  return (
                    e.remove(),
                    () => {
                      g.current && g.current.insertBefore(e, t)
                    }
                  )
                }
                let t = en.get(e)
                if (!t) return
                let n = e.style.width
                return (
                  (e.style.width = t),
                  () => {
                    e.style.width = n
                  }
                )
              })
              v(et(g.current))
              for (let t = e.length - 1; t >= 0; t--) {
                let n = e[t]
                n && n()
              }
            }, [n.map(e => e.value).join('')]),
            (0, o.jsx)(eo.Provider, {
              value: f,
              children: (0, o.jsx)(p.P.span, {
                layoutDependency: u,
                ...d,
                ref: c,
                className: 'number-section-'.concat(s),
                style: {
                  ...a,
                  display: 'inline-flex',
                  justifyContent: r,
                  width: y,
                },
                children: (0, o.jsxs)('span', {
                  ref: g,
                  style: {
                    display: 'inline-flex',
                    justifyContent: 'inherit',
                    position: 'relative',
                  },
                  children: [
                    '​',
                    (0, o.jsx)(h.N, {
                      mode: i,
                      anchorX: r,
                      initial: !1,
                      children: n.map(e =>
                        'integer' === e.type || 'fraction' === e.type
                          ? (0, o.jsx)(
                              er,
                              {
                                initial: {
                                  opacity: 0,
                                },
                                animate: {
                                  opacity: 1,
                                },
                                exit: {
                                  opacity: 0,
                                },
                                value: e.value,
                                initialValue: m ? void 0 : 0,
                                layoutDependency: u,
                              },
                              e.key
                            )
                          : (0, o.jsx)(
                              el,
                              {
                                type: e.type,
                                partKey: e.key,
                                initial: {
                                  opacity: 0,
                                },
                                animate: {
                                  opacity: 1,
                                },
                                exit: {
                                  opacity: 0,
                                },
                                layoutDependency: u,
                                children: e.value,
                              },
                              'literal' === e.type ? ''.concat(e.key, ':').concat(e.value) : e.key
                            )
                      ),
                    }),
                  ],
                }),
              }),
            })
          )
        }),
        es = {
          opacity: {
            duration: 1,
            ease: Q.vT,
          },
          layout: {
            type: 'spring',
            duration: 1,
            bounce: 0,
          },
          y: {
            type: 'spring',
            duration: 1,
            bounce: 0,
          },
        },
        eu = (0, l.forwardRef)(function (e, t) {
          var n
          let {
              children: r,
              locales: i,
              format: a,
              transition: s,
              style: u,
              suffix: d,
              prefix: h,
              ...g
            } = e,
            {
              pre: m,
              integer: y,
              fraction: v,
              post: x,
              formatted: w,
            } = (0, l.useMemo)(
              () =>
                ((e, { locales: t, format: n }, r, i) => {
                  let o = new Intl.NumberFormat(t, n).formatToParts(Number(e))
                  r &&
                    o.unshift({
                      type: 'prefix',
                      value: r,
                    }),
                    i &&
                      o.push({
                        type: 'suffix',
                        value: i,
                      })
                  let l = [],
                    a = [],
                    s = [],
                    u = [],
                    d = {},
                    c = e => `${e}:${(d[e] = (d[e] ?? -1) + 1)}`,
                    f = '',
                    p = !1,
                    h = !1
                  for (let e of o) {
                    f += e.value
                    let t = 'minusSign' === e.type || 'plusSign' === e.type ? 'sign' : e.type
                    switch (t) {
                      case 'integer':
                        ;(p = !0),
                          a.push(
                            ...e.value.split('').map(e => ({
                              type: t,
                              value: parseInt(e),
                            }))
                          )
                        break
                      case 'group':
                        a.push({
                          type: t,
                          value: e.value,
                        })
                        break
                      case 'decimal':
                        ;(h = !0),
                          s.push({
                            type: t,
                            value: e.value,
                            key: c(t),
                          })
                        break
                      case 'fraction':
                        s.push(
                          ...e.value.split('').map(e => ({
                            type: t,
                            value: parseInt(e),
                            key: c(t),
                          }))
                        )
                        break
                      default:
                        ;(p || h ? u : l).push({
                          type: t,
                          value: e.value,
                          key: c(t),
                        })
                    }
                  }
                  let g = []
                  for (let e = a.length - 1; e >= 0; e--)
                    g.unshift({
                      ...a[e],
                      key: c(a[e].type),
                    })
                  return {
                    pre: l,
                    integer: g,
                    fraction: s,
                    post: u,
                    formatted: f,
                  }
                })(
                  r,
                  {
                    locales: i,
                    format: a,
                  },
                  h,
                  d
                ),
              [r, i, a]
            ),
            b = (0, l.useContext)(F.Q).transition
          s = null != (n = null != s ? s : b) ? n : es
          let { layoutDependency: E } = g,
            L = (0, l.useMemo)(() => {
              if (void 0 !== E)
                return {
                  layoutDependency: E,
                  value: r,
                }
            }, [E, r])
          return (0, o.jsx)(c.o, {
            children: (0, o.jsx)(f.x, {
              transition: s,
              children: (0, o.jsx)(p.P.div, {
                ...g,
                ref: t,
                layout: !0,
                layoutDependency: L,
                style: {
                  lineHeight: 1,
                  ...u,
                  display: 'inline-flex',
                  isolation: 'isolate',
                  whiteSpace: 'nowrap',
                },
                children: (0, o.jsxs)(p.P.div, {
                  layout: !0,
                  layoutDependency: L,
                  'aria-label': w,
                  style: {
                    display: 'inline-flex',
                    direction: 'ltr',
                    isolation: 'isolate',
                    position: 'relative',
                    zIndex: -1,
                  },
                  children: [
                    (0, o.jsx)(ea, {
                      style: {
                        padding: 'calc('.concat(X, '/2) 0'),
                      },
                      layoutDependency: L,
                      'aria-hidden': !0,
                      justify: 'right',
                      mode: 'popLayout',
                      parts: m,
                      name: 'pre',
                    }),
                    (0, o.jsxs)(Y, {
                      layoutDependency: L,
                      children: [
                        (0, o.jsx)(ea, {
                          layoutDependency: L,
                          justify: 'right',
                          parts: y,
                          name: 'integer',
                        }),
                        (0, o.jsx)(ea, {
                          layout: 'position',
                          layoutDependency: L,
                          parts: v,
                          name: 'fraction',
                        }),
                      ],
                    }),
                    (0, o.jsx)(ea, {
                      style: {
                        padding: 'calc('.concat(X, '/2) 0'),
                      },
                      'aria-hidden': !0,
                      layout: 'position',
                      layoutDependency: L,
                      mode: 'popLayout',
                      parts: x,
                      name: 'post',
                    }),
                  ],
                }),
              }),
            }),
          })
        })
      p.P.create(l.Fragment)
      var ed = n(84619),
        ec = n(53589),
        ef = n(25164)
      let ep = {
        some: 0,
        all: 1,
      }
      var eh = n(83303),
        eg = n(32709),
        em = n(90252)
      function ey(e, t, n) {
        let r = Math.floor(e / n),
          i = r * n,
          o = 0
        for (let n = 0; n < t.length; n++) {
          let { end: r } = t[n]
          if (((o = n), r + i > e)) break
        }
        return o + r * t.length
      }
      function ev(e, t, n, r) {
        if (0 === t.length) return 0
        let i = t[t.length - 1].end + n,
          o = r ?? e + (t[0]?.end ?? 0),
          l = ey(e, t, i) + 1,
          a = 0,
          s = !1
        for (; !s; ) {
          let { start: e, end: n } = t[(0, ec.L)(0, t.length, l)],
            r = Math.floor(l / t.length) * i
          ;(a = e + r), n + r > o ? (s = !0) : l++
        }
        return a
      }
      function ex(e, t, n, r, i) {
        if (0 === t.length) return 0
        let o = t[t.length - 1].end + n,
          l = r ?? e - (i ?? 0),
          a = ey(e, t, o),
          s = e,
          u = !1
        for (; !u; ) {
          let { start: r, end: d } = t[(0, ec.L)(0, t.length, a)],
            c = d - r,
            f = r + Math.floor(a / t.length) * o
          l <= f + n || f >= e
            ? ((s = f), a--)
            : (l <= f ? (s = f) : i && c > i && (s = f), (u = !0))
        }
        return s
      }
      let ew = (0, l.createContext)(null),
        eb = (0, l.createContext)(void 0),
        eE = (e, t, n, r) => ({
          sign: 1,
          lengthProp: t,
          viewportLengthProp: n,
          paddingStartProp: r,
          measureItem: n => ({
            start: n[e],
            end: n[e] + n[t],
          }),
          getCumulativeInset: t => {
            let n = 0,
              r = t
            for (; r; ) (n += r[e]), (r = r.offsetParent)
            return n
          },
        }),
        eL = eE('offsetLeft', 'offsetWidth', 'innerWidth', 'paddingLeft'),
        eS = eE('offsetTop', 'offsetHeight', 'innerHeight', 'paddingTop')
      function ej(e, t) {
        return (t?.offsetWidth ?? window.innerWidth) - (e.offsetLeft + e.offsetWidth)
      }
      let ek = {
        ...eL,
        sign: -1,
        paddingStartProp: 'paddingRight',
        measureItem: (e, t) => {
          let n = e.offsetWidth,
            r = ej(e, t)
          return {
            start: r,
            end: r + n,
          }
        },
        getCumulativeInset: e => {
          let t = 0,
            n = e
          for (; n; ) (t += ej(n, n.offsetParent)), (n = n.offsetParent)
          return t
        },
      }
      function eC(e, t) {
        return 'y' === e ? eS : 'ltr' === t ? eL : ek
      }
      function eI(e) {
        let {
            offset: t,
            axis: n,
            direction: r,
            listSize: i = 0,
            itemIndex: a,
            cloneIndex: s,
            bounds: u,
            inset: d,
            alignItems: c,
            reproject: f = !0,
            size: h = 'auto',
            crossSize: g = 'fit-content',
            ...m
          } = e,
          y = (0, l.useRef)(null),
          { start: v, end: x } = u,
          { sign: w } = eC(n, r),
          b = (0, S.G)(() => {
            if (!f) return 0
            let e = t.get()
            return (v || x) && i && e * w + u.end <= -d ? i * w : 0
          }),
          E = (0, S.G)(() => {
            let e = t.get(),
              n = b.get()
            return (v || x) && i ? e * w + v + n * w : 0
          }),
          L = 'stretch' === c ? '100%' : g
        return (0, o.jsx)(eb.Provider, {
          value: {
            offset: E,
          },
          children: (0, o.jsx)(p.P.li, {
            ref: y,
            ...m,
            className: void 0 === s ? 'ticker-item' : 'clone-item',
            style: {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: 'fill' === h ? '100%' : void 0,
              display: 'fill' === h ? 'flex' : void 0,
              height: 'x' === n ? L : void 0,
              width: 'y' === n ? L : void 0,
              x: 'x' === n ? b : 0,
              y: 'y' === n ? b : 0,
            },
            'aria-hidden': void 0 !== s || void 0,
          }),
        })
      }
      var eP = n(83449)
      function eB(e, t) {
        return e.tabIndex >= 1 && t.tabIndex >= 1
          ? e.tabIndex - t.tabIndex
          : e.tabIndex >= 1 && t.tabIndex <= 0
          ? -1
          : +(t.tabIndex >= 1 && e.tabIndex <= 0)
      }
      function ez(e) {
        return e.end - e.start
      }
      function eM(e) {
        return e[e.length - 1].end - e[0].start
      }
      let eR = {
          start: 'flex-start',
          end: 'flex-end',
        },
        e$ = (0, l.forwardRef)(function (e, t) {
          let {
              items: n,
              velocity: r = 50,
              hoverFactor: i = 1,
              gap: a = 10,
              axis: s = 'x',
              align: d = 'center',
              offset: f,
              isStatic: p = !1,
              itemSize: h = 'auto',
              _itemCrossSize: g = 'fit-content',
              overflow: m = !1,
              loop: y = !0,
              children: v,
              as: x = 'div',
              snap: w,
              ...b
            } = e,
            E = (0, l.useRef)(null),
            L = (0, ed.s)(t, E),
            j = (0, l.useRef)(null),
            [C, z] = (0, l.useState)({
              direction: 'ltr',
              visibleLength: 0,
              inset: 0,
              totalItemLength: 0,
              containerLength: 0,
              itemPositions: [],
              isMeasured: !1,
              maxInset: null,
            }),
            M = eR[d] || d
          if (p) {
            let e = (0, I.d)(0)
            return (0, o.jsx)(eA, {
              containerProps: b,
              containerRef: L,
              children: v,
              gap: a,
              axis: s,
              alignItems: M,
              offset: e,
              renderedOffset: e,
              items: n,
              itemSize: h,
              itemCrossSize: g,
              state: C,
              overflow: m,
              isStatic: !0,
              as: x,
            })
          }
          let [$, A] = (0, l.useState)(!1),
            D = (0, I.d)(1),
            O = (0, I.d)(0)
          null != f || (f = O)
          let T = (0, S.G)(() =>
              'rtl' === C.direction
                ? (0, ec.L)(C.totalItemLength + a + C.inset, C.inset, f.get())
                : (0, ec.L)(-C.totalItemLength - a - C.inset, -C.inset, f.get())
            ),
            W = (0, I.d)(0),
            G = $ ? W : y ? T : f,
            N = (function (e) {
              let {
                  root: t,
                  margin: n,
                  amount: r,
                  once: i = !1,
                  initial: o = !1,
                } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                [a, s] = (0, l.useState)(o)
              return (
                (0, l.useEffect)(() => {
                  if (!e.current || (i && a)) return
                  let o = {
                    root: (t && t.current) || void 0,
                    margin: n,
                    amount: r,
                  }
                  return (function (e, t, { root: n, margin: r, amount: i = 'some' } = {}) {
                    let o = (0, ef.K)(e),
                      l = new WeakMap(),
                      a = new IntersectionObserver(
                        e => {
                          e.forEach(e => {
                            let n = l.get(e.target)
                            if (!!n !== e.isIntersecting)
                              if (e.isIntersecting) {
                                let n = t(e.target, e)
                                'function' == typeof n
                                  ? l.set(e.target, n)
                                  : a.unobserve(e.target)
                              } else 'function' == typeof n && (n(e), l.delete(e.target))
                          })
                        },
                        {
                          root: n,
                          rootMargin: r,
                          threshold: 'number' == typeof i ? i : ep[i],
                        }
                      )
                    return o.forEach(e => a.observe(e)), () => a.disconnect()
                  })(e.current, () => (s(!0), i ? void 0 : () => s(!1)), o)
                }, [t, e, n, i, r]),
                a
              )
            })(E, {
              margin: '100px',
            }),
            H = (function () {
              let [e, t] = (0, l.useState)(!0)
              return (
                (0, l.useEffect)(() => {
                  let e = () => t(!document.hidden)
                  return (
                    document.hidden && e(),
                    document.addEventListener('visibilitychange', e),
                    () => {
                      document.removeEventListener('visibilitychange', e)
                    }
                  )
                }, []),
                e
              )
            })(),
            Q = N && H,
            F = u(),
            K = () => {
              var e
              if (!E.current || !j.current) return
              let t = window.getComputedStyle(E.current).direction,
                {
                  measureItem: n,
                  lengthProp: r,
                  viewportLengthProp: i,
                  getCumulativeInset: o,
                } = eC(s, t),
                l = 'x' === s ? 'paddingLeft' : 'paddingTop',
                a = E.current,
                u = j.current.querySelectorAll('.ticker-item')
              if (!u.length) return
              let d = !1,
                c = []
              for (let e = 0; e < u.length; e++) {
                let t = n(u[e], a)
                c.push(t)
                let r = C.itemPositions[e]
                ;(r && t.start === r.start && t.end === r.end) || (d = !0)
              }
              let f = Math.min(a[r], window[i]),
                p = m ? window[i] : f,
                h = eM(c),
                g = parseInt(null != (e = window.getComputedStyle(a)[l]) ? e : 0),
                v = m ? o(u[0]) : g,
                x = !1 === y ? Math.max(0, h - f) : null
              ;(p !== C.visibleLength ||
                h !== C.totalItemLength ||
                v !== C.inset ||
                C.itemPositions.length !== c.length ||
                d) &&
                z({
                  direction: t,
                  visibleLength: p,
                  itemPositions: c,
                  totalItemLength: h,
                  inset: v,
                  containerLength: f,
                  maxInset: x,
                  isMeasured: !0,
                })
            }
          ;(0, P.E)(() => {
            if (!Q || !E.current) return
            K()
            let e = m ? (0, eh.X)(K) : void 0,
              t = (0, eh.X)(E.current, K)
            return () => {
              null == e || e(), t()
            }
          }, [n, Q, m])
          let X = C.totalItemLength > 0,
            { sign: _ } = eC(s, C.direction)
          ;(0, eg.N)(
            X && Q && f === O && !F
              ? (e, t) => {
                  let n = (t / 1e3) * (r * _ * D.get())
                  f.set(f.get() - n)
                }
              : R.l
          )
          let V = (0, l.useMemo)(
              () =>
                X && C.visibleLength
                  ? (function (e, t, n) {
                      let r = eM(t),
                        i = Math.max(...t.map(ez)),
                        o = 0,
                        l = 0
                      for (; l < e; ) (l = (r + n) * (o + 1) - i), o++
                      return Math.max(o - 1, 0)
                    })(C.visibleLength, C.itemPositions, a)
                  : 0,
              [X, C]
            ),
            q = 0 === C.totalItemLength ? 0 : (C.totalItemLength + a) * (V + 1),
            U = []
          if (y)
            for (let e = 0; e < V; e++) {
              let t = []
              n.forEach((n, r) => {
                let i = C.itemPositions[r],
                  l = (C.totalItemLength + a) * (e + 1),
                  u = i
                    ? {
                        start: i.start + l,
                        end: i.end + l,
                      }
                    : eD
                t.push(
                  (0, o.jsx)(
                    eI,
                    {
                      direction: C.direction,
                      offset: G,
                      axis: s,
                      listSize: q,
                      cloneIndex: r,
                      bounds: u,
                      inset: C.inset,
                      alignItems: M,
                      size: h,
                      crossSize: g,
                      children: n,
                    },
                    'clone-'.concat(e, '-').concat(r)
                  )
                )
              })
              let r = 'ticker-group-'.concat(e)
              U.push(
                (0, o.jsx)(
                  c.o,
                  {
                    id: r,
                    children: t,
                  },
                  r
                )
              )
            }
          var J = f
          let Y = (0, l.useRef)(!1)
          ;(0, l.useEffect)(() => {
            let e = E.current
            if (!e) return
            let t = !1,
              n = new AbortController(),
              r = {
                signal: n.signal,
              },
              i = {
                ...r,
                capture: !0,
              },
              o = 'x' === s ? 'scrollLeft' : 'scrollTop',
              l = 'x' === s ? 'offsetLeft' : 'offsetTop',
              a = 'x' === s ? 'ArrowLeft' : 'ArrowUp',
              u = 'x' === s ? 'ArrowRight' : 'ArrowDown',
              d = [],
              c = 0,
              f = () => {
                let t = d[c]
                t &&
                  (t.focus(),
                  W.set(-t[l]),
                  (e[o] = 0),
                  k.Gt.render(() => {
                    e[o] = 0
                  }))
              },
              p = t => {
                if ('Tab' === t.key) {
                  t.preventDefault(), g()
                  let n = Array.from(
                    document.querySelectorAll(
                      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
                    )
                  ).filter(eP.s)
                  n.sort(eB)
                  let r = n[t.shiftKey ? 0 : n.length - 1],
                    i = t.shiftKey ? n.length - 1 : 0
                  if (e.contains(r)) return void n[i].focus()
                  {
                    let r = n.indexOf(d[c]),
                      i = t.shiftKey ? -1 : 1
                    for (let t = r; t < n.length && t >= 0; t += i) {
                      let r = n[t]
                      if (!e.contains(r)) return void r.focus()
                    }
                  }
                  return
                }
                t.key === a ? c-- : t.key === u && c++, (c = (0, ec.L)(0, d.length, c)), f()
              },
              h = t => {
                ;(t.target && t.target instanceof HTMLElement && e.contains(t.target)) || g()
              },
              g = () => {
                Y.current &&
                  ((Y.current = !1),
                  A(!1),
                  J.set(W.get()),
                  window.removeEventListener('focus', h),
                  window.removeEventListener('blur', h),
                  e.removeEventListener('keydown', p))
              },
              m = t => {
                let { target: n } = t
                ;(0, eP.s)(n) &&
                  (Y.current ||
                    (!Y.current &&
                      ((d = Array.from(
                        e.querySelectorAll(
                          '.ticker-item a, .ticker-item button, .ticker-item input, .ticker-item textarea, .ticker-item select, .ticker-item [tabindex]:not([tabindex="-1"]), .ticker-item [contenteditable="true"]'
                        )
                      ).filter(eP.s)),
                      (c = 0),
                      d.length &&
                        (A(!0),
                        (Y.current = !0),
                        f(),
                        window.addEventListener('focus', h, i),
                        window.addEventListener('blur', h, i),
                        e.addEventListener('keydown', p, r)))))
              },
              y = () => {
                t &&
                  ((t = !1),
                  e.removeEventListener('focus', m, !0),
                  window.removeEventListener('pointermove', y, r))
              }
            return (
              window.addEventListener(
                'keydown',
                () => {
                  t ||
                    ((t = !0),
                    e.addEventListener('focus', m, i),
                    window.addEventListener('pointermove', y, r))
                },
                r
              ),
              e.addEventListener(
                'pointerdown',
                e => {
                  let t = e.target.closest('[aria-hidden="true"]')
                  t && t.removeAttribute('aria-hidden')
                },
                r
              ),
              () => {
                n.abort(), g()
              }
            )
          }, [])
          let Z = (0, l.useCallback)(
            e => (null !== C.maxInset ? (0, em.q)(-C.maxInset, 0, e) : e),
            [C.maxInset]
          )
          return (0, o.jsx)(ew.Provider, {
            value: {
              ...C,
              gap: a,
              clampOffset: Z,
              renderedOffset: G,
            },
            children: (0, o.jsx)(eA, {
              containerProps: b,
              children: v,
              containerRef: L,
              listRef: j,
              gap: a,
              axis: s,
              alignItems: M,
              isMeasured: X,
              isInView: Q,
              offset: f,
              renderedOffset: G,
              items: n,
              itemSize: h,
              itemCrossSize: g,
              clonedItems: U,
              clampOffset: Z,
              snap: w,
              onPointerEnter: () => {
                ;(0, B.i)(D, i)
              },
              onPointerLeave: () => {
                ;(0, B.i)(D, 1)
              },
              totalListSize: q,
              state: C,
              overflow: m,
              loop: y,
              as: x,
            }),
          })
        })
      function eA(e) {
        let t,
          n,
          {
            children: r,
            containerProps: i,
            containerRef: a,
            listRef: s,
            gap: u,
            axis: d,
            alignItems: c,
            isMeasured: f,
            isInView: h,
            isStatic: g,
            items: m,
            offset: y,
            clonedItems: v,
            clampOffset: x,
            renderedOffset: w,
            onPointerEnter: b,
            onPointerLeave: E,
            totalListSize: L,
            itemSize: S,
            itemCrossSize: j,
            overflow: k,
            state: C,
            snap: I,
            loop: P,
            as: z,
          } = e,
          M = (0, l.useMemo)(() => p.P.create(z), [z]),
          R = {}
        if (!P) {
          let e = Math.min(0, -C.totalItemLength + C.containerLength)
          R =
            'x' === d
              ? {
                  left: e,
                  right: 0,
                }
              : {
                  top: e,
                  bottom: 0,
                }
        }
        let { drag: $, _dragX: A, _dragY: D, ...O } = i,
          T = 'x' === d ? A : D
        return (
          $ &&
            T &&
            ((n = () => T.set(y.get())),
            (t = (e, t) => {
              let { velocity: n } = t,
                r = y.get(),
                i = r + n[d] * (I ? 0.3 : 0.8)
              if (I)
                if (n[d] < 0) i = -ev(-r, C.itemPositions, u, -i)
                else if (n[d] > 0) i = -ex(-r, C.itemPositions, u, -i, C.containerLength)
                else {
                  let e = -ev(-r, C.itemPositions, u, -r),
                    t = -ex(-r, C.itemPositions, u, -r, C.containerLength)
                  i = Math.abs(e) < Math.abs(t) ? e : t
                }
              ;(0, B.i)(
                T,
                null == x ? void 0 : x(i),
                I
                  ? eW
                  : {
                      type: 'inertia',
                      velocity: n[d],
                      modifyTarget: () => i,
                      bounceDamping: 40,
                      bounceStiffness: 400,
                      max: 0,
                      min: R['x' === d ? 'left' : 'top'],
                    }
              )
            })),
          (0, o.jsxs)(M, {
            ...O,
            ref: a,
            style: {
              ...eO,
              ...i.style,
              overflow: k ? 'visible' : 'hidden',
            },
            onPointerEnter: b,
            onPointerLeave: E,
            children: [
              (0, o.jsxs)(p.P.ul, {
                ref: s,
                role: 'group',
                style: {
                  ...eT,
                  flexDirection: 'x' === d ? 'row' : 'column',
                  gap: ''.concat(u, 'px'),
                  x: 'x' === d ? w : 0,
                  y: 'y' === d ? w : 0,
                  opacity: f || g ? 1 : 0,
                  alignItems: c,
                  willChange: f && h ? 'transform' : void 0,
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%',
                  maxWidth: '100%',
                },
                drag: $,
                _dragX: A,
                _dragY: D,
                dragConstraints: R,
                dragMomentum: !1,
                onPointerDown: n,
                onDragEnd: t,
                children: [
                  m.map((e, t) => {
                    var n
                    return (0, o.jsx)(
                      eI,
                      {
                        axis: d,
                        direction: C.direction,
                        offset: w,
                        listSize: L,
                        itemIndex: t,
                        bounds: null != (n = C.itemPositions[t]) ? n : eD,
                        inset: C.inset,
                        alignItems: c,
                        size: S,
                        crossSize: j,
                        reproject: P,
                        children: e,
                      },
                      'original-' + t
                    )
                  }),
                  v || null,
                ],
              }),
              r,
            ],
          })
        )
      }
      let eD = {
          start: 0,
          end: 0,
        },
        eO = {
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        },
        eT = {
          display: 'flex',
          position: 'relative',
          willChange: 'transform',
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          justifyContent: 'flex-start',
        },
        eW = {
          type: 'spring',
          stiffness: 400,
          damping: 40,
        }
      var eG = n(18928)
      function eN() {
        let e = (0, l.useContext)(eb)
        return (0, eG.V)(!!e, 'useItemOffset must be used within a TickerItem'), e.offset
      }
      var eH = n(67466),
        eQ = n(43172)
      let eF = {
          slow: 130,
          normal: 75,
          fast: 30,
        },
        eK = (0, l.forwardRef)(function (e, t) {
          let {
              children: n = '',
              as: r,
              speed: i = 'normal',
              variance: a = 'natural',
              cursorClassName: s = 'motion-typewriter-cursor',
              cursorStyle: u,
              cursorBlinkDuration: d = 0.5,
              onComplete: c,
              play: f = !0,
              'aria-label': h,
              textClassName: g,
              textStyle: m,
              replace: y = 'type',
              backspace: v = 'character',
              backspaceFactor: x = 0.2,
              ...w
            } = e,
            b = (0, l.useRef)(n),
            E = (0, I.d)(''),
            L = (0, l.useRef)(null),
            S = (0, l.useRef)(null),
            j = (0, l.useRef)(null),
            k = 'number' == typeof i ? i : eF[i],
            C = () => {
              var e
              null == (e = L.current) || e.call(L), (L.current = null)
            },
            P = () => {
              S.current = (0, B.i)(
                j.current,
                {
                  opacity: [1, 1, 0, 0],
                },
                {
                  duration: d,
                  times: [0, 0.5, 0.5, 1],
                  ease: 'linear',
                  repeat: 1 / 0,
                  repeatType: 'reverse',
                }
              )
            }
          return (
            (0, l.useEffect)(() => {
              'all' === y && n !== b.current && E.set(''), (b.current = n)
            }, [n, y]),
            (0, l.useEffect)(() => {
              var e
              if (!f) {
                P(), C()
                return
              }
              null == (e = S.current) || e.cancel()
              let t = () => {
                  let e = (0, eH.Hf)(E.get(), n, y, v)
                  E.set(e), e !== n ? r() : (P(), null == c || c())
                },
                r = () => {
                  L.current = (0, eQ.c)(t, (0, eH.Hs)(n, E.get(), k, a, x))
                }
              return L.current || r(), C
            }, [f, c, n, k, a, x, v]),
            (0, o.jsxs)(r || 'span', {
              ref: t,
              ...w,
              'aria-label': h || n,
              children: [
                (0, o.jsx)(p.P.span, {
                  className: g,
                  style: m,
                  children: E,
                }),
                (0, o.jsx)(p.P.span, {
                  ref: j,
                  className: s,
                  style: {
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    backgroundColor: 'currentColor',
                    position: 'relative',
                    top: '0.1em',
                    left: '0.2em',
                    ...u,
                  },
                }),
              ],
            })
          )
        })
      var eX = n(21606)
      function e_({ mode: e, layoutMode: t, children: n }) {
        let [r, i] = (0, l.useState)(e),
          a = 'visible' === e
        return a && 'visible' !== r
          ? (i('visible'), null)
          : ((0, eG.V)(
              !!l.Activity,
              'Activity component not found - upgrade to React 19.2.0 or higher'
            ),
            (0, o.jsx)(l.Activity, {
              mode: r,
              children: (0, o.jsx)(eX.O, {
                isPresent: a,
                onExitComplete: a ? void 0 : () => i('hidden'),
                presenceAffectsLayout: !1,
                mode: 'pop' === t ? 'popLayout' : 'sync',
                children: n,
              }),
            }))
      }
    },
    82290: (e, t, n) => {
      n.d(t, {
        z: () => c,
      })
      var r = n(37441),
        i = n(53013),
        o = n(62081)
      function l(e) {
        return 'number' == typeof e ? e : parseFloat(e)
      }
      var a = n(7620),
        s = n(39070),
        u = n(98425),
        d = n(83725)
      function c(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          { isStatic: n } = (0, a.useContext)(s.Q),
          c = () => ((0, r.S)(e) ? e.get() : e)
        if (n) return (0, d.G)(c)
        let f = (0, u.d)(c())
        return (
          (0, a.useInsertionEffect)(
            () =>
              (function (e, t, n) {
                let a,
                  s = e.get(),
                  u = null,
                  d = s,
                  c = 'string' == typeof s ? s.replace(/[\d.-]/g, '') : void 0,
                  f = () => {
                    u && (u.stop(), (u = null))
                  },
                  p = () => {
                    f(),
                      (u = new i.s({
                        keyframes: [l(e.get()), l(d)],
                        velocity: e.getVelocity(),
                        type: 'spring',
                        restDelta: 0.001,
                        restSpeed: 0.01,
                        ...n,
                        onUpdate: a,
                      }))
                  }
                if (
                  (e.attach((e, t) => {
                    ;(d = e),
                      (a = e => {
                        var n, r
                        return t(((n = e), (r = c) ? n + r : n))
                      }),
                      o.Gt.postRender(p)
                  }, f),
                  (0, r.S)(t))
                ) {
                  let n = t.on('change', t => {
                      var n, r
                      return e.set(((n = t), (r = c) ? n + r : n))
                    }),
                    r = e.on('destroy', n)
                  return () => {
                    n(), r()
                  }
                }
                return f
              })(f, e, t),
            [f, JSON.stringify(t)]
          ),
          f
        )
      }
    },
    83303: (e, t, n) => {
      let r, i
      n.d(t, {
        X: () => h,
      })
      var o = n(18168),
        l = n(25164)
      let a = new WeakMap(),
        s = (e, t, n) => (r, i) =>
          i && i[0] ? i[0][e + 'Size'] : (0, o.x)(r) && 'getBBox' in r ? r.getBBox()[t] : r[n],
        u = s('inline', 'width', 'offsetWidth'),
        d = s('block', 'height', 'offsetHeight')
      function c({ target: e, borderBoxSize: t }) {
        a.get(e)?.forEach(n => {
          n(e, {
            get width() {
              return u(e, t)
            },
            get height() {
              return d(e, t)
            },
          })
        })
      }
      function f(e) {
        e.forEach(c)
      }
      let p = new Set()
      function h(e, t) {
        return 'function' == typeof e
          ? (p.add(e),
            i ||
              ((i = () => {
                let e = {
                  get width() {
                    return window.innerWidth
                  },
                  get height() {
                    return window.innerHeight
                  },
                }
                p.forEach(t => t(e))
              }),
              window.addEventListener('resize', i)),
            () => {
              p.delete(e),
                p.size ||
                  'function' != typeof i ||
                  (window.removeEventListener('resize', i), (i = void 0))
            })
          : (function (e, t) {
              r || ('undefined' != typeof ResizeObserver && (r = new ResizeObserver(f)))
              let n = (0, l.K)(e)
              return (
                n.forEach(e => {
                  let n = a.get(e)
                  n || ((n = new Set()), a.set(e, n)), n.add(t), r?.observe(e)
                }),
                () => {
                  n.forEach(e => {
                    let n = a.get(e)
                    n?.delete(t), n?.size || r?.unobserve(e)
                  })
                }
              )
            })(e, t)
      }
    },
    83725: (e, t, n) => {
      n.d(t, {
        G: () => a,
      })
      var r = n(24560),
        i = n(23847),
        o = n(79457),
        l = n(14536)
      function a(e, t, n, i) {
        if ('function' == typeof e) {
          ;(l.bt.current = []), e()
          let t = (0, o.j)(l.bt.current, e)
          return (l.bt.current = void 0), t
        }
        let a = 'function' == typeof t ? t : (0, r.p)(t, n, i)
        return Array.isArray(e)
          ? s(e, a)
          : s([e], e => {
              let [t] = e
              return a(t)
            })
      }
      function s(e, t) {
        let n = (0, i.M)(() => [])
        return (0, o.j)(e, () => {
          n.length = 0
          let r = e.length
          for (let t = 0; t < r; t++) n[t] = e[t].get()
          return t(n)
        })
      }
    },
    94661: (e, t, n) => {
      n.d(t, {
        x: () => s,
      })
      var r = n(54568),
        i = n(7620),
        o = n(39070),
        l = n(70663),
        a = n(23847)
      function s(e) {
        let { children: t, isValidProp: n, ...s } = e
        n && (0, l.D)(n),
          ((s = {
            ...(0, i.useContext)(o.Q),
            ...s,
          }).isStatic = (0, a.M)(() => s.isStatic))
        let u = (0, i.useMemo)(
          () => s,
          [JSON.stringify(s.transition), s.transformPagePoint, s.reducedMotion]
        )
        return (0, r.jsx)(o.Q.Provider, {
          value: u,
          children: t,
        })
      }
    },
    98425: (e, t, n) => {
      n.d(t, {
        d: () => a,
      })
      var r = n(14536),
        i = n(7620),
        o = n(39070),
        l = n(23847)
      function a(e) {
        let t = (0, l.M)(() => (0, r.OQ)(e)),
          { isStatic: n } = (0, i.useContext)(o.Q)
        if (n) {
          let [, n] = (0, i.useState)(e)
          ;(0, i.useEffect)(() => t.on('change', n), [])
        }
        return t
      }
    },
  },
])
