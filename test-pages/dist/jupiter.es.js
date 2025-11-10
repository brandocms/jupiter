function Do(i, t) {
  i.indexOf(t) === -1 && i.push(t);
}
function sn(i, t) {
  const e = i.indexOf(t);
  e > -1 && i.splice(e, 1);
}
const ft = (i, t, e) => e > t ? t : e < i ? i : e;
function ii(i, t) {
  return t ? `${i}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : i;
}
let se = () => {
}, rt = () => {
};
process.env.NODE_ENV !== "production" && (se = (i, t, e) => {
  !i && typeof console < "u" && console.warn(ii(t, e));
}, rt = (i, t, e) => {
  if (!i)
    throw new Error(ii(t, e));
});
const lt = {}, nn = (i) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i);
function rn(i) {
  return typeof i == "object" && i !== null;
}
const on = (i) => /^0[^.\s]+$/u.test(i);
// @__NO_SIDE_EFFECTS__
function Ai(i) {
  let t;
  return () => (t === void 0 && (t = i()), t);
}
const gt = /* @__NO_SIDE_EFFECTS__ */ (i) => i, zo = (i, t) => (e) => t(i(e)), Ti = (...i) => i.reduce(zo), ke = /* @__NO_SIDE_EFFECTS__ */ (i, t, e) => {
  const s = t - i;
  return s === 0 ? 1 : (e - i) / s;
};
class an {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Do(this.subscriptions, t), () => sn(this.subscriptions, t);
  }
  notify(t, e, s) {
    const n = this.subscriptions.length;
    if (n)
      if (n === 1)
        this.subscriptions[0](t, e, s);
      else
        for (let r = 0; r < n; r++) {
          const o = this.subscriptions[r];
          o && o(t, e, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const G = /* @__NO_SIDE_EFFECTS__ */ (i) => i * 1e3, tt = /* @__NO_SIDE_EFFECTS__ */ (i) => i / 1e3;
function Ei(i, t) {
  return t ? i * (1e3 / t) : 0;
}
const bs = /* @__PURE__ */ new Set();
function Oi(i, t, e) {
  i || bs.has(t) || (console.warn(ii(t, e)), bs.add(t));
}
const Ro = (i, t, e) => {
  const s = t - i;
  return ((e - i) % s + s) % s + i;
}, ln = (i, t, e) => (((1 - 3 * e + 3 * t) * i + (3 * e - 6 * t)) * i + 3 * t) * i, Vo = 1e-7, Fo = 12;
function $o(i, t, e, s, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = ln(o, s, n) - i, r > 0 ? e = o : t = o;
  while (Math.abs(r) > Vo && ++a < Fo);
  return o;
}
function ne(i, t, e, s) {
  if (i === t && e === s)
    return gt;
  const n = (r) => $o(r, 0, 1, i, e);
  return (r) => r === 0 || r === 1 ? r : ln(n(r), t, s);
}
const hn = (i) => (t) => t <= 0.5 ? i(2 * t) / 2 : (2 - i(2 * (1 - t))) / 2, cn = (i) => (t) => 1 - i(1 - t), un = /* @__PURE__ */ ne(0.33, 1.53, 0.69, 0.99), Ii = /* @__PURE__ */ cn(un), dn = /* @__PURE__ */ hn(Ii), pn = (i) => (i *= 2) < 1 ? 0.5 * Ii(i) : 0.5 * (2 - Math.pow(2, -10 * (i - 1))), xi = (i) => 1 - Math.sin(Math.acos(i)), No = cn(xi), fn = hn(xi), Ho = /* @__PURE__ */ ne(0.42, 0, 1, 1), Bo = /* @__PURE__ */ ne(0, 0, 0.58, 1), mn = /* @__PURE__ */ ne(0.42, 0, 0.58, 1), gn = (i) => Array.isArray(i) && typeof i[0] != "number";
function yn(i, t) {
  return gn(i) ? i[Ro(0, i.length, t)] : i;
}
const bn = (i) => Array.isArray(i) && typeof i[0] == "number", ws = {
  linear: gt,
  easeIn: Ho,
  easeInOut: mn,
  easeOut: Bo,
  circIn: xi,
  circInOut: fn,
  circOut: No,
  backIn: Ii,
  backInOut: dn,
  backOut: un,
  anticipate: pn
}, qo = (i) => typeof i == "string", si = (i) => {
  if (bn(i)) {
    rt(i.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, s, n] = i;
    return ne(t, e, s, n);
  } else if (qo(i))
    return rt(ws[i] !== void 0, `Invalid easing type '${i}'`, "invalid-easing-type"), ws[i];
  return i;
}, ve = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Uo(i, t) {
  let e = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), n = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(u) {
    o.has(u) && (d.schedule(u), i()), u(a);
  }
  const d = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, f = !1, m = !1) => {
      const b = m && n ? e : s;
      return f && o.add(u), b.has(u) || b.add(u), u;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (u) => {
      s.delete(u), o.delete(u);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (u) => {
      if (a = u, n) {
        r = !0;
        return;
      }
      n = !0, [e, s] = [s, e], e.forEach(h), e.clear(), n = !1, r && (r = !1, d.process(u));
    }
  };
  return d;
}
const Wo = 40;
function wn(i, t) {
  let e = !1, s = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = ve.reduce((L, k) => (L[k] = Uo(r), L), {}), { setup: a, read: h, resolveKeyframes: d, preUpdate: u, update: f, preRender: m, render: y, postRender: b } = o, S = () => {
    const L = lt.useManualTiming ? n.timestamp : performance.now();
    e = !1, lt.useManualTiming || (n.delta = s ? 1e3 / 60 : Math.max(Math.min(L - n.timestamp, Wo), 1)), n.timestamp = L, n.isProcessing = !0, a.process(n), h.process(n), d.process(n), u.process(n), f.process(n), m.process(n), y.process(n), b.process(n), n.isProcessing = !1, e && t && (s = !1, i(S));
  }, T = () => {
    e = !0, s = !0, n.isProcessing || i(S);
  };
  return { schedule: ve.reduce((L, k) => {
    const O = o[k];
    return L[k] = (M, F = !1, x = !1) => (e || T(), O.schedule(M, F, x)), L;
  }, {}), cancel: (L) => {
    for (let k = 0; k < ve.length; k++)
      o[ve[k]].cancel(L);
  }, state: n, steps: o };
}
const { schedule: W, cancel: It, state: Gt } = /* @__PURE__ */ wn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : gt, !0);
let Ee;
function Ko() {
  Ee = void 0;
}
const Y = {
  now: () => (Ee === void 0 && Y.set(Gt.isProcessing || lt.useManualTiming ? Gt.timestamp : performance.now()), Ee),
  set: (i) => {
    Ee = i, queueMicrotask(Ko);
  }
}, vn = (i) => (t) => typeof t == "string" && t.startsWith(i), Sn = /* @__PURE__ */ vn("--"), Yo = /* @__PURE__ */ vn("var(--"), Ci = (i) => Yo(i) ? jo.test(i.split("/*")[0].trim()) : !1, jo = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, _t = {
  test: (i) => typeof i == "number",
  parse: parseFloat,
  transform: (i) => i
}, Zt = {
  ..._t,
  transform: (i) => ft(0, 1, i)
}, Se = {
  ..._t,
  default: 1
}, Yt = (i) => Math.round(i * 1e5) / 1e5, Pi = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Go(i) {
  return i == null;
}
const Zo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Li = (i, t) => (e) => !!(typeof e == "string" && Zo.test(e) && e.startsWith(i) || t && !Go(e) && Object.prototype.hasOwnProperty.call(e, t)), An = (i, t, e) => (s) => {
  if (typeof s != "string")
    return s;
  const [n, r, o, a] = s.match(Pi);
  return {
    [i]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Xo = (i) => ft(0, 255, i), Ge = {
  ..._t,
  transform: (i) => Math.round(Xo(i))
}, At = {
  test: /* @__PURE__ */ Li("rgb", "red"),
  parse: /* @__PURE__ */ An("red", "green", "blue"),
  transform: ({ red: i, green: t, blue: e, alpha: s = 1 }) => "rgba(" + Ge.transform(i) + ", " + Ge.transform(t) + ", " + Ge.transform(e) + ", " + Yt(Zt.transform(s)) + ")"
};
function Qo(i) {
  let t = "", e = "", s = "", n = "";
  return i.length > 5 ? (t = i.substring(1, 3), e = i.substring(3, 5), s = i.substring(5, 7), n = i.substring(7, 9)) : (t = i.substring(1, 2), e = i.substring(2, 3), s = i.substring(3, 4), n = i.substring(4, 5), t += t, e += e, s += s, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(s, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const ni = {
  test: /* @__PURE__ */ Li("#"),
  parse: Qo,
  transform: At.transform
}, re = /* @__NO_SIDE_EFFECTS__ */ (i) => ({
  test: (t) => typeof t == "string" && t.endsWith(i) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${i}`
}), dt = /* @__PURE__ */ re("deg"), Mt = /* @__PURE__ */ re("%"), I = /* @__PURE__ */ re("px"), Jo = /* @__PURE__ */ re("vh"), ta = /* @__PURE__ */ re("vw"), vs = {
  ...Mt,
  parse: (i) => Mt.parse(i) / 100,
  transform: (i) => Mt.transform(i * 100)
}, Pt = {
  test: /* @__PURE__ */ Li("hsl", "hue"),
  parse: /* @__PURE__ */ An("hue", "saturation", "lightness"),
  transform: ({ hue: i, saturation: t, lightness: e, alpha: s = 1 }) => "hsla(" + Math.round(i) + ", " + Mt.transform(Yt(t)) + ", " + Mt.transform(Yt(e)) + ", " + Yt(Zt.transform(s)) + ")"
}, B = {
  test: (i) => At.test(i) || ni.test(i) || Pt.test(i),
  parse: (i) => At.test(i) ? At.parse(i) : Pt.test(i) ? Pt.parse(i) : ni.parse(i),
  transform: (i) => typeof i == "string" ? i : i.hasOwnProperty("red") ? At.transform(i) : Pt.transform(i),
  getAnimatableNone: (i) => {
    const t = B.parse(i);
    return t.alpha = 0, B.transform(t);
  }
}, ea = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ia(i) {
  var t, e;
  return isNaN(i) && typeof i == "string" && (((t = i.match(Pi)) == null ? void 0 : t.length) || 0) + (((e = i.match(ea)) == null ? void 0 : e.length) || 0) > 0;
}
const Tn = "number", En = "color", sa = "var", na = "var(", Ss = "${}", ra = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Xt(i) {
  const t = i.toString(), e = [], s = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(ra, (h) => (B.test(h) ? (s.color.push(r), n.push(En), e.push(B.parse(h))) : h.startsWith(na) ? (s.var.push(r), n.push(sa), e.push(h)) : (s.number.push(r), n.push(Tn), e.push(parseFloat(h))), ++r, Ss)).split(Ss);
  return { values: e, split: a, indexes: s, types: n };
}
function On(i) {
  return Xt(i).values;
}
function In(i) {
  const { split: t, types: e } = Xt(i), s = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === Tn ? r += Yt(n[o]) : a === En ? r += B.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const oa = (i) => typeof i == "number" ? 0 : B.test(i) ? B.getAnimatableNone(i) : i;
function aa(i) {
  const t = On(i);
  return In(i)(t.map(oa));
}
const Dt = {
  test: ia,
  parse: On,
  createTransformer: In,
  getAnimatableNone: aa
};
function Ze(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
function la({ hue: i, saturation: t, lightness: e, alpha: s }) {
  i /= 360, t /= 100, e /= 100;
  let n = 0, r = 0, o = 0;
  if (!t)
    n = r = o = e;
  else {
    const a = e < 0.5 ? e * (1 + t) : e + t - e * t, h = 2 * e - a;
    n = Ze(h, a, i + 1 / 3), r = Ze(h, a, i), o = Ze(h, a, i - 1 / 3);
  }
  return {
    red: Math.round(n * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function xe(i, t) {
  return (e) => e > 0 ? t : i;
}
const oe = (i, t, e) => i + (t - i) * e, Xe = (i, t, e) => {
  const s = i * i, n = e * (t * t - s) + s;
  return n < 0 ? 0 : Math.sqrt(n);
}, ha = [ni, At, Pt], ca = (i) => ha.find((t) => t.test(i));
function As(i) {
  const t = ca(i);
  if (se(!!t, `'${i}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(i);
  return t === Pt && (e = la(e)), e;
}
const Ts = (i, t) => {
  const e = As(i), s = As(t);
  if (!e || !s)
    return xe(i, t);
  const n = { ...e };
  return (r) => (n.red = Xe(e.red, s.red, r), n.green = Xe(e.green, s.green, r), n.blue = Xe(e.blue, s.blue, r), n.alpha = oe(e.alpha, s.alpha, r), At.transform(n));
}, ri = /* @__PURE__ */ new Set(["none", "hidden"]);
function ua(i, t) {
  return ri.has(i) ? (e) => e <= 0 ? i : t : (e) => e >= 1 ? t : i;
}
function da(i, t) {
  return (e) => oe(i, t, e);
}
function ki(i) {
  return typeof i == "number" ? da : typeof i == "string" ? Ci(i) ? xe : B.test(i) ? Ts : ma : Array.isArray(i) ? xn : typeof i == "object" ? B.test(i) ? Ts : pa : xe;
}
function xn(i, t) {
  const e = [...i], s = e.length, n = i.map((r, o) => ki(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      e[o] = n[o](r);
    return e;
  };
}
function pa(i, t) {
  const e = { ...i, ...t }, s = {};
  for (const n in e)
    i[n] !== void 0 && t[n] !== void 0 && (s[n] = ki(i[n])(i[n], t[n]));
  return (n) => {
    for (const r in s)
      e[r] = s[r](n);
    return e;
  };
}
function fa(i, t) {
  const e = [], s = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = i.indexes[r][s[r]], a = i.values[o] ?? 0;
    e[n] = a, s[r]++;
  }
  return e;
}
const ma = (i, t) => {
  const e = Dt.createTransformer(t), s = Xt(i), n = Xt(t);
  return s.indexes.var.length === n.indexes.var.length && s.indexes.color.length === n.indexes.color.length && s.indexes.number.length >= n.indexes.number.length ? ri.has(i) && !n.values.length || ri.has(t) && !s.values.length ? ua(i, t) : Ti(xn(fa(s, n), n.values), e) : (se(!0, `Complex values '${i}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), xe(i, t));
};
function Cn(i, t, e) {
  return typeof i == "number" && typeof t == "number" && typeof e == "number" ? oe(i, t, e) : ki(i)(i, t);
}
const ga = (i) => {
  const t = ({ timestamp: e }) => i(e);
  return {
    start: (e = !0) => W.update(t, e),
    stop: () => It(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Gt.isProcessing ? Gt.timestamp : Y.now()
  };
}, Pn = (i, t, e = 10) => {
  let s = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    s += Math.round(i(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Ce = 2e4;
function Mi(i) {
  let t = 0;
  const e = 50;
  let s = i.next(t);
  for (; !s.done && t < Ce; )
    t += e, s = i.next(t);
  return t >= Ce ? 1 / 0 : t;
}
function Ln(i, t = 100, e) {
  const s = e({ ...i, keyframes: [0, t] }), n = Math.min(Mi(s), Ce);
  return {
    type: "keyframes",
    ease: (r) => s.next(n * r).value / t,
    duration: /* @__PURE__ */ tt(n)
  };
}
const ya = 5;
function kn(i, t, e) {
  const s = Math.max(t - ya, 0);
  return Ei(e - i(s), t - s);
}
const H = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Es = 1e-3;
function ba({ duration: i = H.duration, bounce: t = H.bounce, velocity: e = H.velocity, mass: s = H.mass }) {
  let n, r;
  se(i <= /* @__PURE__ */ G(H.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = ft(H.minDamping, H.maxDamping, o), i = ft(H.minDuration, H.maxDuration, /* @__PURE__ */ tt(i)), o < 1 ? (n = (d) => {
    const u = d * o, f = u * i, m = u - e, y = oi(d, o), b = Math.exp(-f);
    return Es - m / y * b;
  }, r = (d) => {
    const f = d * o * i, m = f * e + e, y = Math.pow(o, 2) * Math.pow(d, 2) * i, b = Math.exp(-f), S = oi(Math.pow(d, 2), o);
    return (-n(d) + Es > 0 ? -1 : 1) * ((m - y) * b) / S;
  }) : (n = (d) => {
    const u = Math.exp(-d * i), f = (d - e) * i + 1;
    return -1e-3 + u * f;
  }, r = (d) => {
    const u = Math.exp(-d * i), f = (e - d) * (i * i);
    return u * f;
  });
  const a = 5 / i, h = va(n, r, a);
  if (i = /* @__PURE__ */ G(i), isNaN(h))
    return {
      stiffness: H.stiffness,
      damping: H.damping,
      duration: i
    };
  {
    const d = Math.pow(h, 2) * s;
    return {
      stiffness: d,
      damping: o * 2 * Math.sqrt(s * d),
      duration: i
    };
  }
}
const wa = 12;
function va(i, t, e) {
  let s = e;
  for (let n = 1; n < wa; n++)
    s = s - i(s) / t(s);
  return s;
}
function oi(i, t) {
  return i * Math.sqrt(1 - t * t);
}
const Sa = ["duration", "bounce"], Aa = ["stiffness", "damping", "mass"];
function Os(i, t) {
  return t.some((e) => i[e] !== void 0);
}
function Ta(i) {
  let t = {
    velocity: H.velocity,
    stiffness: H.stiffness,
    damping: H.damping,
    mass: H.mass,
    isResolvedFromDuration: !1,
    ...i
  };
  if (!Os(i, Aa) && Os(i, Sa))
    if (i.visualDuration) {
      const e = i.visualDuration, s = 2 * Math.PI / (e * 1.2), n = s * s, r = 2 * ft(0.05, 1, 1 - (i.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: H.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = ba(i);
      t = {
        ...t,
        ...e,
        mass: H.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function Qt(i = H.visualDuration, t = H.bounce) {
  const e = typeof i != "object" ? {
    visualDuration: i,
    keyframes: [0, 1],
    bounce: t
  } : i;
  let { restSpeed: s, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: h, damping: d, mass: u, duration: f, velocity: m, isResolvedFromDuration: y } = Ta({
    ...e,
    velocity: -/* @__PURE__ */ tt(e.velocity || 0)
  }), b = m || 0, S = d / (2 * Math.sqrt(h * u)), T = o - r, E = /* @__PURE__ */ tt(Math.sqrt(h / u)), P = Math.abs(T) < 5;
  s || (s = P ? H.restSpeed.granular : H.restSpeed.default), n || (n = P ? H.restDelta.granular : H.restDelta.default);
  let L;
  if (S < 1) {
    const O = oi(E, S);
    L = (M) => {
      const F = Math.exp(-S * E * M);
      return o - F * ((b + S * E * T) / O * Math.sin(O * M) + T * Math.cos(O * M));
    };
  } else if (S === 1)
    L = (O) => o - Math.exp(-E * O) * (T + (b + E * T) * O);
  else {
    const O = E * Math.sqrt(S * S - 1);
    L = (M) => {
      const F = Math.exp(-S * E * M), x = Math.min(O * M, 300);
      return o - F * ((b + S * E * T) * Math.sinh(x) + O * T * Math.cosh(x)) / O;
    };
  }
  const k = {
    calculatedDuration: y && f || null,
    next: (O) => {
      const M = L(O);
      if (y)
        a.done = O >= f;
      else {
        let F = O === 0 ? b : 0;
        S < 1 && (F = O === 0 ? /* @__PURE__ */ G(b) : kn(L, O, M));
        const x = Math.abs(F) <= s, z = Math.abs(o - M) <= n;
        a.done = x && z;
      }
      return a.value = a.done ? o : M, a;
    },
    toString: () => {
      const O = Math.min(Mi(k), Ce), M = Pn((F) => k.next(O * F).value, O, 30);
      return O + "ms " + M;
    },
    toTransition: () => {
    }
  };
  return k;
}
Qt.applyToOptions = (i) => {
  const t = Ln(i, 100, Qt);
  return i.ease = t.ease, i.duration = /* @__PURE__ */ G(t.duration), i.type = "keyframes", i;
};
function ai({ keyframes: i, velocity: t = 0, power: e = 0.8, timeConstant: s = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: h, restDelta: d = 0.5, restSpeed: u }) {
  const f = i[0], m = {
    done: !1,
    value: f
  }, y = (x) => a !== void 0 && x < a || h !== void 0 && x > h, b = (x) => a === void 0 ? h : h === void 0 || Math.abs(a - x) < Math.abs(h - x) ? a : h;
  let S = e * t;
  const T = f + S, E = o === void 0 ? T : o(T);
  E !== T && (S = E - f);
  const P = (x) => -S * Math.exp(-x / s), L = (x) => E + P(x), k = (x) => {
    const z = P(x), q = L(x);
    m.done = Math.abs(z) <= d, m.value = m.done ? E : q;
  };
  let O, M;
  const F = (x) => {
    y(m.value) && (O = x, M = Qt({
      keyframes: [m.value, b(m.value)],
      velocity: kn(L, x, m.value),
      // TODO: This should be passing * 1000
      damping: n,
      stiffness: r,
      restDelta: d,
      restSpeed: u
    }));
  };
  return F(0), {
    calculatedDuration: null,
    next: (x) => {
      let z = !1;
      return !M && O === void 0 && (z = !0, k(x), F(x)), O !== void 0 && x >= O ? M.next(x - O) : (!z && k(x), m);
    }
  };
}
function Ea(i, t, e) {
  const s = [], n = e || lt.mix || Cn, r = i.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(i[o], i[o + 1]);
    if (t) {
      const h = Array.isArray(t) ? t[o] || gt : t;
      a = Ti(h, a);
    }
    s.push(a);
  }
  return s;
}
function Mn(i, t, { clamp: e = !0, ease: s, mixer: n } = {}) {
  const r = i.length;
  if (rt(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = i[0] === i[1];
  i[0] > i[r - 1] && (i = [...i].reverse(), t = [...t].reverse());
  const a = Ea(t, s, n), h = a.length, d = (u) => {
    if (o && u < i[0])
      return t[0];
    let f = 0;
    if (h > 1)
      for (; f < i.length - 2 && !(u < i[f + 1]); f++)
        ;
    const m = /* @__PURE__ */ ke(i[f], i[f + 1], u);
    return a[f](m);
  };
  return e ? (u) => d(ft(i[0], i[r - 1], u)) : d;
}
function _n(i, t) {
  const e = i[i.length - 1];
  for (let s = 1; s <= t; s++) {
    const n = /* @__PURE__ */ ke(0, t, s);
    i.push(oe(e, 1, n));
  }
}
function _i(i) {
  const t = [0];
  return _n(t, i.length - 1), t;
}
function Oa(i, t) {
  return i.map((e) => e * t);
}
function Ia(i, t) {
  return i.map(() => t || mn).splice(0, i.length - 1);
}
function Lt({ duration: i = 300, keyframes: t, times: e, ease: s = "easeInOut" }) {
  const n = gn(s) ? s.map(si) : si(s), r = {
    done: !1,
    value: t[0]
  }, o = Oa(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : _i(t),
    i
  ), a = Mn(o, t, {
    ease: Array.isArray(n) ? n : Ia(t, n)
  });
  return {
    calculatedDuration: i,
    next: (h) => (r.value = a(h), r.done = h >= i, r)
  };
}
const xa = (i) => i !== null;
function Di(i, { repeat: t, repeatType: e = "loop" }, s, n = 1) {
  const r = i.filter(xa), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || s === void 0 ? r[a] : s;
}
const Ca = {
  decay: ai,
  inertia: ai,
  tween: Lt,
  keyframes: Lt,
  spring: Qt
};
function Dn(i) {
  typeof i.type == "string" && (i.type = Ca[i.type]);
}
class zi {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, e) {
    return this.finished.then(t, e);
  }
}
const Pa = (i) => i / 100;
class Ri extends zi {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var s, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== Y.now() && this.tick(Y.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (s = this.options).onStop) == null || n.call(s));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Dn(t);
    const { type: e = Lt, repeat: s = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const h = e || Lt;
    process.env.NODE_ENV !== "production" && h !== Lt && rt(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), h !== Lt && typeof a[0] != "number" && (this.mixKeyframes = Ti(Pa, Cn(a[0], a[1])), a = [0, 100]);
    const d = h({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = h({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), d.calculatedDuration === null && (d.calculatedDuration = Mi(d));
    const { calculatedDuration: u } = d;
    this.calculatedDuration = u, this.resolvedDuration = u + n, this.totalDuration = this.resolvedDuration * (s + 1) - n, this.generator = d;
  }
  updateTime(t) {
    const e = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = e;
  }
  tick(t, e = !1) {
    const { generator: s, totalDuration: n, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: h } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: d = 0, keyframes: u, repeat: f, repeatType: m, repeatDelay: y, type: b, onUpdate: S, finalKeyframe: T } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const E = this.currentTime - d * (this.playbackSpeed >= 0 ? 1 : -1), P = this.playbackSpeed >= 0 ? E < 0 : E > n;
    this.currentTime = Math.max(E, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let L = this.currentTime, k = s;
    if (f) {
      const x = Math.min(this.currentTime, n) / a;
      let z = Math.floor(x), q = x % 1;
      !q && x >= 1 && (q = 1), q === 1 && z--, z = Math.min(z, f + 1), !!(z % 2) && (m === "reverse" ? (q = 1 - q, y && (q -= y / a)) : m === "mirror" && (k = o)), L = ft(0, 1, q) * a;
    }
    const O = P ? { done: !1, value: u[0] } : k.next(L);
    r && (O.value = r(O.value));
    let { done: M } = O;
    !P && h !== null && (M = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const F = this.holdTime === null && (this.state === "finished" || this.state === "running" && M);
    return F && b !== ai && (O.value = Di(u, this.options, T, this.speed)), S && S(O.value), F && this.finish(), O;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, e) {
    return this.finished.then(t, e);
  }
  get duration() {
    return /* @__PURE__ */ tt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ tt(t);
  }
  get time() {
    return /* @__PURE__ */ tt(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ G(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(Y.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ tt(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = ga, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = e ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Y.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, e;
    this.notifyFinished(), this.teardown(), this.state = "finished", (e = (t = this.options).onComplete) == null || e.call(t);
  }
  cancel() {
    var t, e;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (e = (t = this.options).onCancel) == null || e.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var e;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (e = this.driver) == null || e.stop(), t.observe(this);
  }
}
function La(i) {
  for (let t = 1; t < i.length; t++)
    i[t] ?? (i[t] = i[t - 1]);
}
const Tt = (i) => i * 180 / Math.PI, li = (i) => {
  const t = Tt(Math.atan2(i[1], i[0]));
  return hi(t);
}, ka = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (i) => (Math.abs(i[0]) + Math.abs(i[3])) / 2,
  rotate: li,
  rotateZ: li,
  skewX: (i) => Tt(Math.atan(i[1])),
  skewY: (i) => Tt(Math.atan(i[2])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[2])) / 2
}, hi = (i) => (i = i % 360, i < 0 && (i += 360), i), Is = li, xs = (i) => Math.sqrt(i[0] * i[0] + i[1] * i[1]), Cs = (i) => Math.sqrt(i[4] * i[4] + i[5] * i[5]), Ma = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: xs,
  scaleY: Cs,
  scale: (i) => (xs(i) + Cs(i)) / 2,
  rotateX: (i) => hi(Tt(Math.atan2(i[6], i[5]))),
  rotateY: (i) => hi(Tt(Math.atan2(-i[2], i[0]))),
  rotateZ: Is,
  rotate: Is,
  skewX: (i) => Tt(Math.atan(i[4])),
  skewY: (i) => Tt(Math.atan(i[1])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[4])) / 2
};
function ci(i) {
  return i.includes("scale") ? 1 : 0;
}
function ui(i, t) {
  if (!i || i === "none")
    return ci(t);
  const e = i.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, n;
  if (e)
    s = Ma, n = e;
  else {
    const a = i.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = ka, n = a;
  }
  if (!n)
    return ci(t);
  const r = s[t], o = n[1].split(",").map(Da);
  return typeof r == "function" ? r(o) : o[r];
}
const _a = (i, t) => {
  const { transform: e = "none" } = getComputedStyle(i);
  return ui(e, t);
};
function Da(i) {
  return parseFloat(i.trim());
}
const zt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Rt = new Set(zt), Ps = (i) => i === _t || i === I, za = /* @__PURE__ */ new Set(["x", "y", "z"]), Ra = zt.filter((i) => !za.has(i));
function Va(i) {
  const t = [];
  return Ra.forEach((e) => {
    const s = i.getValue(e);
    s !== void 0 && (t.push([e, s.get()]), s.set(e.startsWith("scale") ? 1 : 0));
  }), t;
}
const Et = {
  // Dimensions
  width: ({ x: i }, { paddingLeft: t = "0", paddingRight: e = "0" }) => i.max - i.min - parseFloat(t) - parseFloat(e),
  height: ({ y: i }, { paddingTop: t = "0", paddingBottom: e = "0" }) => i.max - i.min - parseFloat(t) - parseFloat(e),
  top: (i, { top: t }) => parseFloat(t),
  left: (i, { left: t }) => parseFloat(t),
  bottom: ({ y: i }, { top: t }) => parseFloat(t) + (i.max - i.min),
  right: ({ x: i }, { left: t }) => parseFloat(t) + (i.max - i.min),
  // Transform
  x: (i, { transform: t }) => ui(t, "x"),
  y: (i, { transform: t }) => ui(t, "y")
};
Et.translateX = Et.x;
Et.translateY = Et.y;
const Ot = /* @__PURE__ */ new Set();
let di = !1, pi = !1, fi = !1;
function zn() {
  if (pi) {
    const i = Array.from(Ot).filter((s) => s.needsMeasurement), t = new Set(i.map((s) => s.element)), e = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const n = Va(s);
      n.length && (e.set(s, n), s.render());
    }), i.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const n = e.get(s);
      n && n.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) == null || a.set(o);
      });
    }), i.forEach((s) => s.measureEndState()), i.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  pi = !1, di = !1, Ot.forEach((i) => i.complete(fi)), Ot.clear();
}
function Rn() {
  Ot.forEach((i) => {
    i.readKeyframes(), i.needsMeasurement && (pi = !0);
  });
}
function Fa() {
  fi = !0, Rn(), zn(), fi = !1;
}
class Vi {
  constructor(t, e, s, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = s, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Ot.add(this), di || (di = !0, W.read(Rn), W.resolveKeyframes(zn))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: e, element: s, motionValue: n } = this;
    if (t[0] === null) {
      const r = n == null ? void 0 : n.get(), o = t[t.length - 1];
      if (r !== void 0)
        t[0] = r;
      else if (s && e) {
        const a = s.readValue(e, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), n && r === void 0 && n.set(t[0]);
    }
    La(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Ot.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Ot.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const $a = (i) => i.startsWith("--");
function Na(i, t, e) {
  $a(t) ? i.style.setProperty(t, e) : i.style[t] = e;
}
const Vn = /* @__PURE__ */ Ai(() => window.ScrollTimeline !== void 0), Ha = {};
function Ba(i, t) {
  const e = /* @__PURE__ */ Ai(i);
  return () => Ha[t] ?? e();
}
const Fn = /* @__PURE__ */ Ba(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Wt = ([i, t, e, s]) => `cubic-bezier(${i}, ${t}, ${e}, ${s})`, Ls = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Wt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Wt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Wt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Wt([0.33, 1.53, 0.69, 0.99])
};
function $n(i, t) {
  if (i)
    return typeof i == "function" ? Fn() ? Pn(i, t) : "ease-out" : bn(i) ? Wt(i) : Array.isArray(i) ? i.map((e) => $n(e, t) || Ls.easeOut) : Ls[i];
}
function qa(i, t, e, { delay: s = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: h } = {}, d = void 0) {
  const u = {
    [t]: e
  };
  h && (u.offset = h);
  const f = $n(a, n);
  Array.isArray(f) && (u.easing = f);
  const m = {
    delay: s,
    duration: n,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return d && (m.pseudoElement = d), i.animate(u, m);
}
function Fi(i) {
  return typeof i == "function" && "applyToOptions" in i;
}
function Ua({ type: i, ...t }) {
  return Fi(i) && Fn() ? i.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class Wa extends zi {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: s, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: h } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, rt(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const d = Ua(t);
    this.animation = qa(e, s, n, d, r), d.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const u = Di(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(u) : Na(e, s, u), this.animation.cancel();
      }
      h == null || h(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, e;
    (e = (t = this.animation).finish) == null || e.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var t, e;
    this.isPseudoElement || (e = (t = this.animation).commitStyles) == null || e.call(t);
  }
  get duration() {
    var e, s;
    const t = ((s = (e = this.animation.effect) == null ? void 0 : e.getComputedTiming) == null ? void 0 : s.call(e).duration) || 0;
    return /* @__PURE__ */ tt(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ tt(t);
  }
  get time() {
    return /* @__PURE__ */ tt(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ G(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: e }) {
    var s;
    return this.allowFlatten && ((s = this.animation.effect) == null || s.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Vn() ? (this.animation.timeline = t, gt) : e(this);
  }
}
const Nn = {
  anticipate: pn,
  backInOut: dn,
  circInOut: fn
};
function Ka(i) {
  return i in Nn;
}
function Ya(i) {
  typeof i.ease == "string" && Ka(i.ease) && (i.ease = Nn[i.ease]);
}
const ks = 10;
class ja extends Wa {
  constructor(t) {
    Ya(t), Dn(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: e, onUpdate: s, onComplete: n, element: r, ...o } = this.options;
    if (!e)
      return;
    if (t !== void 0) {
      e.set(t);
      return;
    }
    const a = new Ri({
      ...o,
      autoplay: !1
    }), h = /* @__PURE__ */ G(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(h - ks).value, a.sample(h).value, ks), a.stop();
  }
}
const Ms = (i, t) => t === "zIndex" ? !1 : !!(typeof i == "number" || Array.isArray(i) || typeof i == "string" && // It's animatable if we have a string
(Dt.test(i) || i === "0") && // And it contains numbers and/or colors
!i.startsWith("url("));
function Ga(i) {
  const t = i[0];
  if (i.length === 1)
    return !0;
  for (let e = 0; e < i.length; e++)
    if (i[e] !== t)
      return !0;
}
function Za(i, t, e, s) {
  const n = i[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = i[i.length - 1], o = Ms(n, t), a = Ms(r, t);
  return se(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : Ga(i) || (e === "spring" || Fi(e)) && s;
}
function mi(i) {
  i.duration = 0, i.type = "keyframes";
}
const Xa = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Qa = /* @__PURE__ */ Ai(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ja(i) {
  var u;
  const { motionValue: t, name: e, repeatDelay: s, repeatType: n, damping: r, type: o } = i;
  if (!(((u = t == null ? void 0 : t.owner) == null ? void 0 : u.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: h, transformTemplate: d } = t.owner.getProps();
  return Qa() && e && Xa.has(e) && (e !== "transform" || !d) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !h && !s && n !== "mirror" && r !== 0 && o !== "inertia";
}
const tl = 40;
class el extends zi {
  constructor({ autoplay: t = !0, delay: e = 0, type: s = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: h, motionValue: d, element: u, ...f }) {
    var b;
    super(), this.stop = () => {
      var S, T;
      this._animation && (this._animation.stop(), (S = this.stopTimeline) == null || S.call(this)), (T = this.keyframeResolver) == null || T.cancel();
    }, this.createdAt = Y.now();
    const m = {
      autoplay: t,
      delay: e,
      type: s,
      repeat: n,
      repeatDelay: r,
      repeatType: o,
      name: h,
      motionValue: d,
      element: u,
      ...f
    }, y = (u == null ? void 0 : u.KeyframeResolver) || Vi;
    this.keyframeResolver = new y(a, (S, T, E) => this.onKeyframesResolved(S, T, m, !E), h, d, u), (b = this.keyframeResolver) == null || b.scheduleResolve();
  }
  onKeyframesResolved(t, e, s, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: h, isHandoff: d, onUpdate: u } = s;
    this.resolvedAt = Y.now(), Za(t, r, o, a) || ((lt.instantAnimations || !h) && (u == null || u(Di(t, s, e))), t[0] = t[t.length - 1], mi(s), s.repeat = 0);
    const m = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > tl ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...s,
      keyframes: t
    }, y = !d && Ja(m) ? new ja({
      ...m,
      element: m.motionValue.owner.current
    }) : new Ri(m);
    y.finished.then(() => this.notifyFinished()).catch(gt), this.pendingTimeline && (this.stopTimeline = y.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = y;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), Fa()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
class il {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, e) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][t] = e;
  }
  attachTimeline(t) {
    const e = this.animations.map((s) => s.attachTimeline(t));
    return () => {
      e.forEach((s, n) => {
        s && s(), this.animations[n].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return _s(this.animations, "duration");
  }
  get iterationDuration() {
    return _s(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((e) => e[t]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function _s(i, t) {
  let e = 0;
  for (let s = 0; s < i.length; s++) {
    const n = i[s][t];
    n !== null && n > e && (e = n);
  }
  return e;
}
class sl extends il {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const nl = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function rl(i) {
  const t = nl.exec(i);
  if (!t)
    return [,];
  const [, e, s, n] = t;
  return [`--${e ?? s}`, n];
}
const ol = 4;
function Hn(i, t, e = 1) {
  rt(e <= ol, `Max CSS variable fallback depth detected in property "${i}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, n] = rl(i);
  if (!s)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return nn(o) ? parseFloat(o) : o;
  }
  return Ci(n) ? Hn(n, t, e + 1) : n;
}
function Bn(i, t) {
  return (i == null ? void 0 : i[t]) ?? (i == null ? void 0 : i.default) ?? i;
}
const qn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...zt
]), al = {
  test: (i) => i === "auto",
  parse: (i) => i
}, Un = (i) => (t) => t.test(i), Wn = [_t, I, Mt, dt, ta, Jo, al], Ds = (i) => Wn.find(Un(i));
function ll(i) {
  return typeof i == "number" ? i === 0 : i !== null ? i === "none" || i === "0" || on(i) : !0;
}
const hl = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function cl(i) {
  const [t, e] = i.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return i;
  const [s] = e.match(Pi) || [];
  if (!s)
    return i;
  const n = e.replace(s, "");
  let r = hl.has(t) ? 1 : 0;
  return s !== e && (r *= 100), t + "(" + r + n + ")";
}
const ul = /\b([a-z-]*)\(.*?\)/gu, gi = {
  ...Dt,
  getAnimatableNone: (i) => {
    const t = i.match(ul);
    return t ? t.map(cl).join(" ") : i;
  }
}, zs = {
  ..._t,
  transform: Math.round
}, dl = {
  rotate: dt,
  rotateX: dt,
  rotateY: dt,
  rotateZ: dt,
  scale: Se,
  scaleX: Se,
  scaleY: Se,
  scaleZ: Se,
  skew: dt,
  skewX: dt,
  skewY: dt,
  distance: I,
  translateX: I,
  translateY: I,
  translateZ: I,
  x: I,
  y: I,
  z: I,
  perspective: I,
  transformPerspective: I,
  opacity: Zt,
  originX: vs,
  originY: vs,
  originZ: I
}, $i = {
  // Border props
  borderWidth: I,
  borderTopWidth: I,
  borderRightWidth: I,
  borderBottomWidth: I,
  borderLeftWidth: I,
  borderRadius: I,
  radius: I,
  borderTopLeftRadius: I,
  borderTopRightRadius: I,
  borderBottomRightRadius: I,
  borderBottomLeftRadius: I,
  // Positioning props
  width: I,
  maxWidth: I,
  height: I,
  maxHeight: I,
  top: I,
  right: I,
  bottom: I,
  left: I,
  // Spacing props
  padding: I,
  paddingTop: I,
  paddingRight: I,
  paddingBottom: I,
  paddingLeft: I,
  margin: I,
  marginTop: I,
  marginRight: I,
  marginBottom: I,
  marginLeft: I,
  // Misc
  backgroundPositionX: I,
  backgroundPositionY: I,
  ...dl,
  zIndex: zs,
  // SVG
  fillOpacity: Zt,
  strokeOpacity: Zt,
  numOctaves: zs
}, pl = {
  ...$i,
  // Color props
  color: B,
  backgroundColor: B,
  outlineColor: B,
  fill: B,
  stroke: B,
  // Border props
  borderColor: B,
  borderTopColor: B,
  borderRightColor: B,
  borderBottomColor: B,
  borderLeftColor: B,
  filter: gi,
  WebkitFilter: gi
}, Kn = (i) => pl[i];
function Yn(i, t) {
  let e = Kn(i);
  return e !== gi && (e = Dt), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const fl = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function ml(i, t, e) {
  let s = 0, n;
  for (; s < i.length && !n; ) {
    const r = i[s];
    typeof r == "string" && !fl.has(r) && Xt(r).values.length && (n = i[s]), s++;
  }
  if (n && e)
    for (const r of t)
      i[r] = Yn(e, n);
}
class gl extends Vi {
  constructor(t, e, s, n, r) {
    super(t, e, s, n, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: e, name: s } = this;
    if (!e || !e.current)
      return;
    super.readKeyframes();
    for (let h = 0; h < t.length; h++) {
      let d = t[h];
      if (typeof d == "string" && (d = d.trim(), Ci(d))) {
        const u = Hn(d, e.current);
        u !== void 0 && (t[h] = u), h === t.length - 1 && (this.finalKeyframe = d);
      }
    }
    if (this.resolveNoneKeyframes(), !qn.has(s) || t.length !== 2)
      return;
    const [n, r] = t, o = Ds(n), a = Ds(r);
    if (o !== a)
      if (Ps(o) && Ps(a))
        for (let h = 0; h < t.length; h++) {
          const d = t[h];
          typeof d == "string" && (t[h] = parseFloat(d));
        }
      else Et[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, s = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || ll(t[n])) && s.push(n);
    s.length && ml(t, s, e);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: e, name: s } = this;
    if (!t || !t.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Et[s](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
    const n = e[e.length - 1];
    n !== void 0 && t.getValue(s, n).jump(n, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: e, unresolvedKeyframes: s } = this;
    if (!t || !t.current)
      return;
    const n = t.getValue(e);
    n && n.jump(this.measuredOrigin, !1);
    const r = s.length - 1, o = s[r];
    s[r] = Et[e](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([h, d]) => {
      t.getValue(h).set(d);
    }), this.resolveNoneKeyframes();
  }
}
function jn(i, t, e) {
  if (i instanceof EventTarget)
    return [i];
  if (typeof i == "string") {
    let s = document;
    const n = (e == null ? void 0 : e[i]) ?? s.querySelectorAll(i);
    return n ? Array.from(n) : [];
  }
  return Array.from(i);
}
const Gn = (i, t) => t && typeof i == "number" ? t.transform(i) : i;
function yl(i) {
  return rn(i) && "offsetHeight" in i;
}
const Rs = 30, bl = (i) => !isNaN(parseFloat(i));
class wl {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var r;
      const n = Y.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Y.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = bl(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && Oi(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new an());
    const s = this.events[t].add(e);
    return t === "change" ? () => {
      s(), W.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, e) {
    this.passiveEffect = t, this.stopPassiveEffect = e;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, e, s) {
    this.set(e), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, e = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, e && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = Y.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Rs)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, Rs);
    return Ei(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((e) => {
      this.hasAnimated = !0, this.animation = t(e), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var t, e;
    (t = this.dependents) == null || t.clear(), (e = this.events.destroy) == null || e.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Jt(i, t) {
  return new wl(i, t);
}
const { schedule: vl } = /* @__PURE__ */ wn(queueMicrotask, !1);
function Ni(i) {
  return rn(i) && "ownerSVGElement" in i;
}
const Oe = /* @__PURE__ */ new WeakMap();
let pt;
const Zn = (i, t, e) => (s, n) => n && n[0] ? n[0][i + "Size"] : Ni(s) && "getBBox" in s ? s.getBBox()[t] : s[e], Sl = /* @__PURE__ */ Zn("inline", "width", "offsetWidth"), Al = /* @__PURE__ */ Zn("block", "height", "offsetHeight");
function Tl({ target: i, borderBoxSize: t }) {
  var e;
  (e = Oe.get(i)) == null || e.forEach((s) => {
    s(i, {
      get width() {
        return Sl(i, t);
      },
      get height() {
        return Al(i, t);
      }
    });
  });
}
function El(i) {
  i.forEach(Tl);
}
function Ol() {
  typeof ResizeObserver > "u" || (pt = new ResizeObserver(El));
}
function Il(i, t) {
  pt || Ol();
  const e = jn(i);
  return e.forEach((s) => {
    let n = Oe.get(s);
    n || (n = /* @__PURE__ */ new Set(), Oe.set(s, n)), n.add(t), pt == null || pt.observe(s);
  }), () => {
    e.forEach((s) => {
      const n = Oe.get(s);
      n == null || n.delete(t), n != null && n.size || pt == null || pt.unobserve(s);
    });
  };
}
const Ie = /* @__PURE__ */ new Set();
let kt;
function xl() {
  kt = () => {
    const i = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Ie.forEach((t) => t(i));
  }, window.addEventListener("resize", kt);
}
function Cl(i) {
  return Ie.add(i), kt || xl(), () => {
    Ie.delete(i), !Ie.size && typeof kt == "function" && (window.removeEventListener("resize", kt), kt = void 0);
  };
}
function Pl(i, t) {
  return typeof i == "function" ? Cl(i) : Il(i, t);
}
function Xn(i, t) {
  let e;
  const s = () => {
    const { currentTime: n } = t, o = (n === null ? 0 : n.value) / 100;
    e !== o && i(o), e = o;
  };
  return W.preUpdate(s, !0), () => It(s);
}
function Ll(i) {
  return Ni(i) && i.tagName === "svg";
}
function kl(i, t) {
  if (i === "first")
    return 0;
  {
    const e = t - 1;
    return i === "last" ? e : e / 2;
  }
}
function ht(i = 0.1, { startDelay: t = 0, from: e = 0, ease: s } = {}) {
  return (n, r) => {
    const o = typeof e == "number" ? e : kl(e, r), a = Math.abs(o - n);
    let h = i * a;
    if (s) {
      const d = r * i;
      h = si(s)(h / d) * d;
    }
    return t + h;
  };
}
const U = (i) => !!(i && i.getVelocity), Ml = [...Wn, B, Dt], _l = (i) => Ml.find(Un(i));
function Hi(i) {
  return typeof i == "object" && !Array.isArray(i);
}
function Qn(i, t, e, s) {
  return typeof i == "string" && Hi(t) ? jn(i, e, s) : i instanceof NodeList ? Array.from(i) : Array.isArray(i) ? i : [i];
}
function Dl(i, t, e) {
  return i * (t + 1);
}
function Vs(i, t, e, s) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, i + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : s.get(t) ?? i;
}
function zl(i, t, e) {
  for (let s = 0; s < i.length; s++) {
    const n = i[s];
    n.at > t && n.at < e && (sn(i, n), s--);
  }
}
function Rl(i, t, e, s, n, r) {
  zl(i, n, r);
  for (let o = 0; o < t.length; o++)
    i.push({
      value: t[o],
      at: oe(n, r, s[o]),
      easing: yn(e, o)
    });
}
function Vl(i, t) {
  for (let e = 0; e < i.length; e++)
    i[e] = i[e] / (t + 1);
}
function Fl(i, t) {
  return i.at === t.at ? i.value === null ? 1 : t.value === null ? -1 : 0 : i.at - t.at;
}
const $l = "easeInOut", Nl = 20;
function Hl(i, { defaultTransition: t = {}, ...e } = {}, s, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), h = {}, d = /* @__PURE__ */ new Map();
  let u = 0, f = 0, m = 0;
  for (let y = 0; y < i.length; y++) {
    const b = i[y];
    if (typeof b == "string") {
      d.set(b, f);
      continue;
    } else if (!Array.isArray(b)) {
      d.set(b.name, Vs(f, b.at, u, d));
      continue;
    }
    let [S, T, E = {}] = b;
    E.at !== void 0 && (f = Vs(f, E.at, u, d));
    let P = 0;
    const L = (k, O, M, F = 0, x = 0) => {
      const z = Bl(k), { delay: q = 0, times: j = _i(z), type: Vt = "keyframes", repeat: yt, repeatType: ji, repeatDelay: Gi = 0, ...ze } = O;
      let { ease: st = t.ease || "easeOut", duration: X } = O;
      const le = typeof q == "function" ? q(F, x) : q, he = z.length, ce = Fi(Vt) ? Vt : n == null ? void 0 : n[Vt || "keyframes"];
      if (he <= 2 && ce) {
        let bt = 100;
        if (he === 2 && Wl(z)) {
          const Q = z[1] - z[0];
          bt = Math.abs(Q);
        }
        const nt = { ...ze };
        X !== void 0 && (nt.duration = /* @__PURE__ */ G(X));
        const wt = Ln(nt, bt, ce);
        st = wt.ease, X = wt.duration;
      }
      X ?? (X = r);
      const ue = f + le;
      j.length === 1 && j[0] === 0 && (j[1] = 1);
      const R = j.length - z.length;
      if (R > 0 && _n(j, R), z.length === 1 && z.unshift(null), yt) {
        rt(yt < Nl, "Repeat count too high, must be less than 20", "repeat-count-high"), X = Dl(X, yt);
        const bt = [...z], nt = [...j];
        st = Array.isArray(st) ? [...st] : [st];
        const wt = [...st];
        for (let Q = 0; Q < yt; Q++) {
          z.push(...bt);
          for (let ct = 0; ct < bt.length; ct++)
            j.push(nt[ct] + (Q + 1)), st.push(ct === 0 ? "linear" : yn(wt, ct - 1));
        }
        Vl(j, yt);
      }
      const Ft = ue + X;
      Rl(M, z, st, j, ue, Ft), P = Math.max(le + X, P), m = Math.max(Ft, m);
    };
    if (U(S)) {
      const k = Fs(S, a);
      L(T, E, $s("default", k));
    } else {
      const k = Qn(S, T, s, h), O = k.length;
      for (let M = 0; M < O; M++) {
        T = T, E = E;
        const F = k[M], x = Fs(F, a);
        for (const z in T)
          L(T[z], ql(E, z), $s(z, x), M, O);
      }
    }
    u = f, f += P;
  }
  return a.forEach((y, b) => {
    for (const S in y) {
      const T = y[S];
      T.sort(Fl);
      const E = [], P = [], L = [];
      for (let O = 0; O < T.length; O++) {
        const { at: M, value: F, easing: x } = T[O];
        E.push(F), P.push(/* @__PURE__ */ ke(0, m, M)), L.push(x || "easeOut");
      }
      P[0] !== 0 && (P.unshift(0), E.unshift(E[0]), L.unshift($l)), P[P.length - 1] !== 1 && (P.push(1), E.push(null)), o.has(b) || o.set(b, {
        keyframes: {},
        transition: {}
      });
      const k = o.get(b);
      k.keyframes[S] = E, k.transition[S] = {
        ...t,
        duration: m,
        ease: L,
        times: P,
        ...e
      };
    }
  }), o;
}
function Fs(i, t) {
  return !t.has(i) && t.set(i, {}), t.get(i);
}
function $s(i, t) {
  return t[i] || (t[i] = []), t[i];
}
function Bl(i) {
  return Array.isArray(i) ? i : [i];
}
function ql(i, t) {
  return i && i[t] ? {
    ...i,
    ...i[t]
  } : { ...i };
}
const Ul = (i) => typeof i == "number", Wl = (i) => i.every(Ul), te = /* @__PURE__ */ new WeakMap(), Kl = (i) => Array.isArray(i);
function Ns(i) {
  const t = [{}, {}];
  return i == null || i.values.forEach((e, s) => {
    t[0][s] = e.get(), t[1][s] = e.getVelocity();
  }), t;
}
function Jn(i, t, e, s) {
  if (typeof t == "function") {
    const [n, r] = Ns(s);
    t = t(e !== void 0 ? e : i.custom, n, r);
  }
  if (typeof t == "string" && (t = i.variants && i.variants[t]), typeof t == "function") {
    const [n, r] = Ns(s);
    t = t(e !== void 0 ? e : i.custom, n, r);
  }
  return t;
}
function Yl(i, t, e) {
  const s = i.getProps();
  return Jn(s, t, s.custom, i);
}
function jl(i, t, e) {
  i.hasValue(t) ? i.getValue(t).set(e) : i.addValue(t, Jt(e));
}
function Gl(i) {
  return Kl(i) ? i[i.length - 1] || 0 : i;
}
function Zl(i, t) {
  const e = Yl(i, t);
  let { transitionEnd: s = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = Gl(r[o]);
    jl(i, o, a);
  }
}
function Xl(i) {
  return !!(U(i) && i.add);
}
function Ql(i, t) {
  const e = i.getValue("willChange");
  if (Xl(e))
    return e.add(t);
  if (!e && lt.WillChange) {
    const s = new lt.WillChange("auto");
    i.addValue("willChange", s), s.add(t);
  }
}
const Bi = (i) => i.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Jl = "framerAppearId", th = "data-" + Bi(Jl);
function eh(i) {
  return i.props[th];
}
const ih = (i) => i !== null;
function sh(i, { repeat: t, repeatType: e = "loop" }, s) {
  const n = i.filter(ih), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const nh = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, rh = (i) => ({
  type: "spring",
  stiffness: 550,
  damping: i === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), oh = {
  type: "keyframes",
  duration: 0.8
}, ah = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, lh = (i, { keyframes: t }) => t.length > 2 ? oh : Rt.has(i) ? i.startsWith("scale") ? rh(t[1]) : nh : ah;
function hh({ when: i, delay: t, delayChildren: e, staggerChildren: s, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: h, elapsed: d, ...u }) {
  return !!Object.keys(u).length;
}
const tr = (i, t, e, s = {}, n, r) => (o) => {
  const a = Bn(s, i) || {}, h = a.delay || s.delay || 0;
  let { elapsed: d = 0 } = s;
  d = d - /* @__PURE__ */ G(h);
  const u = {
    keyframes: Array.isArray(e) ? e : [null, e],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -d,
    onUpdate: (m) => {
      t.set(m), a.onUpdate && a.onUpdate(m);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: i,
    motionValue: t,
    element: r ? void 0 : n
  };
  hh(a) || Object.assign(u, lh(i, u)), u.duration && (u.duration = /* @__PURE__ */ G(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ G(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let f = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (mi(u), u.delay === 0 && (f = !0)), (lt.instantAnimations || lt.skipAnimations) && (f = !0, mi(u), u.delay = 0), u.allowFlatten = !a.type && !a.ease, f && !r && t.get() !== void 0) {
    const m = sh(u.keyframes, a);
    if (m !== void 0) {
      W.update(() => {
        u.onUpdate(m), u.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ri(u) : new el(u);
};
function ch({ protectedKeys: i, needsAnimating: t }, e) {
  const s = i.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, s;
}
function uh(i, t, { delay: e = 0, transitionOverride: s, type: n } = {}) {
  let { transition: r = i.getDefaultTransition(), transitionEnd: o, ...a } = t;
  s && (r = s);
  const h = [], d = n && i.animationState && i.animationState.getState()[n];
  for (const u in a) {
    const f = i.getValue(u, i.latestValues[u] ?? null), m = a[u];
    if (m === void 0 || d && ch(d, u))
      continue;
    const y = {
      delay: e,
      ...Bn(r || {}, u)
    }, b = f.get();
    if (b !== void 0 && !f.isAnimating && !Array.isArray(m) && m === b && !y.velocity)
      continue;
    let S = !1;
    if (window.MotionHandoffAnimation) {
      const E = eh(i);
      if (E) {
        const P = window.MotionHandoffAnimation(E, u, W);
        P !== null && (y.startTime = P, S = !0);
      }
    }
    Ql(i, u), f.start(tr(u, f, m, i.shouldReduceMotion && qn.has(u) ? { type: !1 } : y, i, S));
    const T = f.animation;
    T && h.push(T);
  }
  return o && Promise.all(h).then(() => {
    W.update(() => {
      o && Zl(i, o);
    });
  }), h;
}
function dh({ top: i, left: t, right: e, bottom: s }) {
  return {
    x: { min: t, max: e },
    y: { min: i, max: s }
  };
}
function ph(i, t) {
  if (!t)
    return i;
  const e = t({ x: i.left, y: i.top }), s = t({ x: i.right, y: i.bottom });
  return {
    top: e.y,
    left: e.x,
    bottom: s.y,
    right: s.x
  };
}
function fh(i, t) {
  return dh(ph(i.getBoundingClientRect(), t));
}
const Hs = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, yi = {};
for (const i in Hs)
  yi[i] = {
    isEnabled: (t) => Hs[i].some((e) => !!t[e])
  };
const Bs = () => ({ min: 0, max: 0 }), qi = () => ({
  x: Bs(),
  y: Bs()
}), mh = typeof window < "u", bi = { current: null }, er = { current: !1 };
function gh() {
  if (er.current = !0, !!mh)
    if (window.matchMedia) {
      const i = window.matchMedia("(prefers-reduced-motion)"), t = () => bi.current = i.matches;
      i.addEventListener("change", t), t();
    } else
      bi.current = !1;
}
function yh(i) {
  return i !== null && typeof i == "object" && typeof i.start == "function";
}
function bh(i) {
  return typeof i == "string" || Array.isArray(i);
}
const wh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], vh = ["initial", ...wh];
function ir(i) {
  return yh(i.animate) || vh.some((t) => bh(i[t]));
}
function Sh(i) {
  return !!(ir(i) || i.variants);
}
function Ah(i, t, e) {
  for (const s in t) {
    const n = t[s], r = e[s];
    if (U(n))
      i.addValue(s, n);
    else if (U(r))
      i.addValue(s, Jt(n, { owner: i }));
    else if (r !== n)
      if (i.hasValue(s)) {
        const o = i.getValue(s);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = i.getStaticValue(s);
        i.addValue(s, Jt(o !== void 0 ? o : n, { owner: i }));
      }
  }
  for (const s in e)
    t[s] === void 0 && i.removeValue(s);
  return t;
}
const qs = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class sr {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, e, s) {
    return {};
  }
  constructor({ parent: t, props: e, presenceContext: s, reducedMotionConfig: n, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Vi, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const m = Y.now();
      this.renderScheduledAt < m && (this.renderScheduledAt = m, W.render(this.render, !1, !0));
    };
    const { latestValues: h, renderState: d } = o;
    this.latestValues = h, this.baseTarget = { ...h }, this.initialValues = e.initial ? { ...h } : {}, this.renderState = d, this.parent = t, this.props = e, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = ir(e), this.isVariantNode = Sh(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: u, ...f } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const m in f) {
      const y = f[m];
      h[m] !== void 0 && U(y) && y.set(h[m]);
    }
  }
  mount(t) {
    var e;
    this.current = t, te.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, n) => this.bindToMotionValue(n, s)), er.current || gh(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : bi.current, process.env.NODE_ENV !== "production" && Oi(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), It(this.notifyUpdate), It(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const s = this.features[e];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, e) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = Rt.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && W.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, t, e)), this.valueSubscriptions.set(t, () => {
      n(), r && r(), e.owner && e.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in yi) {
      const e = yi[t];
      if (!e)
        continue;
      const { isEnabled: s, Feature: n } = e;
      if (!this.features[t] && n && s(this.props) && (this.features[t] = new n(this)), this.features[t]) {
        const r = this.features[t];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : qi();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, e) {
    this.latestValues[t] = e;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, e) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = e;
    for (let s = 0; s < qs.length; s++) {
      const n = qs[s];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const r = "on" + n, o = t[r];
      o && (this.propEventSubscriptions[n] = this.on(n, o));
    }
    this.prevMotionValues = Ah(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const e = this.getClosestVariantNode();
    if (e)
      return e.variantChildren && e.variantChildren.add(t), () => e.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, e) {
    const s = this.values.get(t);
    e !== s && (s && this.removeValue(t), this.bindToMotionValue(t, e), this.values.set(t, e), this.latestValues[t] = e.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const e = this.valueSubscriptions.get(t);
    e && (e(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, e) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let s = this.values.get(t);
    return s === void 0 && e !== void 0 && (s = Jt(e === null ? void 0 : e, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return s != null && (typeof s == "string" && (nn(s) || on(s)) ? s = parseFloat(s) : !_l(s) && Dt.test(e) && (s = Yn(t, e)), this.setBaseTarget(t, U(s) ? s.get() : s)), U(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, e) {
    this.baseTarget[t] = e;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var r;
    const { initial: e } = this.props;
    let s;
    if (typeof e == "string" || typeof e == "object") {
      const o = Jn(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (s = o[t]);
    }
    if (e && s !== void 0)
      return s;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !U(n) ? n : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new an()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    vl.render(this.render);
  }
}
class nr extends sr {
  constructor() {
    super(...arguments), this.KeyframeResolver = gl;
  }
  sortInstanceNodePosition(t, e) {
    return t.compareDocumentPosition(e) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, e) {
    return t.style ? t.style[e] : void 0;
  }
  removeValueFromRenderState(t, { vars: e, style: s }) {
    delete e[t], delete s[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    U(t) && (this.childSubscription = t.on("change", (e) => {
      this.current && (this.current.textContent = `${e}`);
    }));
  }
}
const Th = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Eh = zt.length;
function Oh(i, t, e) {
  let s = "", n = !0;
  for (let r = 0; r < Eh; r++) {
    const o = zt[r], a = i[o];
    if (a === void 0)
      continue;
    let h = !0;
    if (typeof a == "number" ? h = a === (o.startsWith("scale") ? 1 : 0) : h = parseFloat(a) === 0, !h || e) {
      const d = Gn(a, $i[o]);
      if (!h) {
        n = !1;
        const u = Th[o] || o;
        s += `${u}(${d}) `;
      }
      e && (t[o] = d);
    }
  }
  return s = s.trim(), e ? s = e(t, n ? "" : s) : n && (s = "none"), s;
}
function rr(i, t, e) {
  const { style: s, vars: n, transformOrigin: r } = i;
  let o = !1, a = !1;
  for (const h in t) {
    const d = t[h];
    if (Rt.has(h)) {
      o = !0;
      continue;
    } else if (Sn(h)) {
      n[h] = d;
      continue;
    } else {
      const u = Gn(d, $i[h]);
      h.startsWith("origin") ? (a = !0, r[h] = u) : s[h] = u;
    }
  }
  if (t.transform || (o || e ? s.transform = Oh(t, i.transform, e) : s.transform && (s.transform = "none")), a) {
    const { originX: h = "50%", originY: d = "50%", originZ: u = 0 } = r;
    s.transformOrigin = `${h} ${d} ${u}`;
  }
}
function or(i, { style: t, vars: e }, s, n) {
  const r = i.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, s);
  for (o in e)
    r.setProperty(o, e[o]);
}
const Ih = {};
function xh(i, { layout: t, layoutId: e }) {
  return Rt.has(i) || i.startsWith("origin") || (t || e !== void 0) && (!!Ih[i] || i === "opacity");
}
function ar(i, t, e) {
  var r;
  const { style: s } = i, n = {};
  for (const o in s)
    (U(s[o]) || t.style && U(t.style[o]) || xh(o, i) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = s[o]);
  return n;
}
function Ch(i) {
  return window.getComputedStyle(i);
}
class Ph extends nr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = or;
  }
  readValueFromInstance(t, e) {
    var s;
    if (Rt.has(e))
      return (s = this.projection) != null && s.isProjecting ? ci(e) : _a(t, e);
    {
      const n = Ch(t), r = (Sn(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return fh(t, e);
  }
  build(t, e, s) {
    rr(t, e, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, s) {
    return ar(t, e, s);
  }
}
function Lh(i, t) {
  return i in t;
}
class kh extends sr {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (Lh(e, t)) {
      const s = t[e];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, e) {
    delete e.output[t];
  }
  measureInstanceViewportBox() {
    return qi();
  }
  build(t, e) {
    Object.assign(t.output, e);
  }
  renderInstance(t, { output: e }) {
    Object.assign(t, e);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const Mh = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, _h = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Dh(i, t, e = 1, s = 0, n = !0) {
  i.pathLength = 1;
  const r = n ? Mh : _h;
  i[r.offset] = I.transform(-s);
  const o = I.transform(t), a = I.transform(e);
  i[r.array] = `${o} ${a}`;
}
function zh(i, {
  attrX: t,
  attrY: e,
  attrScale: s,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, h, d, u) {
  if (rr(i, a, d), h) {
    i.style.viewBox && (i.attrs.viewBox = i.style.viewBox);
    return;
  }
  i.attrs = i.style, i.style = {};
  const { attrs: f, style: m } = i;
  f.transform && (m.transform = f.transform, delete f.transform), (m.transform || f.transformOrigin) && (m.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), m.transform && (m.transformBox = (u == null ? void 0 : u.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), e !== void 0 && (f.y = e), s !== void 0 && (f.scale = s), n !== void 0 && Dh(f, n, r, o, !1);
}
const lr = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), Rh = (i) => typeof i == "string" && i.toLowerCase() === "svg";
function Vh(i, t, e, s) {
  or(i, t, void 0, s);
  for (const n in t.attrs)
    i.setAttribute(lr.has(n) ? n : Bi(n), t.attrs[n]);
}
function Fh(i, t, e) {
  const s = ar(i, t, e);
  for (const n in i)
    if (U(i[n]) || U(t[n])) {
      const r = zt.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      s[r] = i[n];
    }
  return s;
}
class $h extends nr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = qi;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (Rt.has(e)) {
      const s = Kn(e);
      return s && s.default || 0;
    }
    return e = lr.has(e) ? e : Bi(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, s) {
    return Fh(t, e, s);
  }
  build(t, e, s) {
    zh(t, e, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(t, e, s, n) {
    Vh(t, e, s, n);
  }
  mount(t) {
    this.isSVGTag = Rh(t.tagName), super.mount(t);
  }
}
function Nh(i) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, e = Ni(i) && !Ll(i) ? new $h(t) : new Ph(t);
  e.mount(i), te.set(i, e);
}
function Hh(i) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new kh(t);
  e.mount(i), te.set(i, e);
}
function Bh(i, t, e) {
  const s = U(i) ? i : Jt(i);
  return s.start(tr("", s, t, e)), s.animation;
}
function qh(i, t) {
  return U(i) || typeof i == "number" || typeof i == "string" && !Hi(t);
}
function hr(i, t, e, s) {
  const n = [];
  if (qh(i, t))
    n.push(Bh(i, Hi(t) && t.default || t, e && (e.default || e)));
  else {
    const r = Qn(i, t, s), o = r.length;
    rt(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const h = r[a];
      rt(h !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const d = h instanceof Element ? Nh : Hh;
      te.has(h) || d(h);
      const u = te.get(h), f = { ...e };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), n.push(...uh(u, { ...t, transition: f }, {}));
    }
  }
  return n;
}
function Uh(i, t, e) {
  const s = [];
  return Hl(i, t, e, { spring: Qt }).forEach(({ keyframes: r, transition: o }, a) => {
    s.push(...hr(a, r, o));
  }), s;
}
function Wh(i) {
  return Array.isArray(i) && i.some(Array.isArray);
}
function Kh(i) {
  function t(e, s, n) {
    let r = [], o;
    if (Wh(e))
      r = Uh(e, s, i);
    else {
      const { onComplete: h, ...d } = n || {};
      typeof h == "function" && (o = h), r = hr(e, s, d, i);
    }
    const a = new sl(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const g = Kh(), Yh = 50, Us = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), jh = () => ({
  time: 0,
  x: Us(),
  y: Us()
}), Gh = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function Ws(i, t, e, s) {
  const n = e[t], { length: r, position: o } = Gh[t], a = n.current, h = e.time;
  n.current = i[`scroll${o}`], n.scrollLength = i[`scroll${r}`] - i[`client${r}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = /* @__PURE__ */ ke(0, n.scrollLength, n.current);
  const d = s - h;
  n.velocity = d > Yh ? 0 : Ei(n.current - a, d);
}
function Zh(i, t, e) {
  Ws(i, "x", t, e), Ws(i, "y", t, e), t.time = e;
}
function Xh(i, t) {
  const e = { x: 0, y: 0 };
  let s = i;
  for (; s && s !== t; )
    if (yl(s))
      e.x += s.offsetLeft, e.y += s.offsetTop, s = s.offsetParent;
    else if (s.tagName === "svg") {
      const n = s.getBoundingClientRect();
      s = s.parentElement;
      const r = s.getBoundingClientRect();
      e.x += n.left - r.left, e.y += n.top - r.top;
    } else if (s instanceof SVGGraphicsElement) {
      const { x: n, y: r } = s.getBBox();
      e.x += n, e.y += r;
      let o = null, a = s.parentNode;
      for (; !o; )
        a.tagName === "svg" && (o = a), a = s.parentNode;
      s = o;
    } else
      break;
  return e;
}
const wi = {
  start: 0,
  center: 0.5,
  end: 1
};
function Ks(i, t, e = 0) {
  let s = 0;
  if (i in wi && (i = wi[i]), typeof i == "string") {
    const n = parseFloat(i);
    i.endsWith("px") ? s = n : i.endsWith("%") ? i = n / 100 : i.endsWith("vw") ? s = n / 100 * document.documentElement.clientWidth : i.endsWith("vh") ? s = n / 100 * document.documentElement.clientHeight : i = n;
  }
  return typeof i == "number" && (s = t * i), e + s;
}
const Qh = [0, 0];
function Jh(i, t, e, s) {
  let n = Array.isArray(i) ? i : Qh, r = 0, o = 0;
  return typeof i == "number" ? n = [i, i] : typeof i == "string" && (i = i.trim(), i.includes(" ") ? n = i.split(" ") : n = [i, wi[i] ? i : "0"]), r = Ks(n[0], e, s), o = Ks(n[1], t), r - o;
}
const tc = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, ec = { x: 0, y: 0 };
function ic(i) {
  return "getBBox" in i && i.tagName !== "svg" ? i.getBBox() : { width: i.clientWidth, height: i.clientHeight };
}
function sc(i, t, e) {
  const { offset: s = tc.All } = e, { target: n = i, axis: r = "y" } = e, o = r === "y" ? "height" : "width", a = n !== i ? Xh(n, i) : ec, h = n === i ? { width: i.scrollWidth, height: i.scrollHeight } : ic(n), d = {
    width: i.clientWidth,
    height: i.clientHeight
  };
  t[r].offset.length = 0;
  let u = !t[r].interpolate;
  const f = s.length;
  for (let m = 0; m < f; m++) {
    const y = Jh(s[m], d[o], h[o], a[r]);
    !u && y !== t[r].interpolatorOffsets[m] && (u = !0), t[r].offset[m] = y;
  }
  u && (t[r].interpolate = Mn(t[r].offset, _i(s), { clamp: !1 }), t[r].interpolatorOffsets = [...t[r].offset]), t[r].progress = ft(0, 1, t[r].interpolate(t[r].current));
}
function nc(i, t = i, e) {
  if (e.x.targetOffset = 0, e.y.targetOffset = 0, t !== i) {
    let s = t;
    for (; s && s !== i; )
      e.x.targetOffset += s.offsetLeft, e.y.targetOffset += s.offsetTop, s = s.offsetParent;
  }
  e.x.targetLength = t === i ? t.scrollWidth : t.clientWidth, e.y.targetLength = t === i ? t.scrollHeight : t.clientHeight, e.x.containerLength = i.clientWidth, e.y.containerLength = i.clientHeight, process.env.NODE_ENV !== "production" && i && t && t !== i && Oi(getComputedStyle(i).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function rc(i, t, e, s = {}) {
  return {
    measure: (n) => {
      nc(i, s.target, e), Zh(i, e, n), (s.offset || s.target) && sc(i, e, s);
    },
    notify: () => t(e)
  };
}
const Bt = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), js = (i) => i === document.scrollingElement ? window : i;
function cr(i, { container: t = document.scrollingElement, ...e } = {}) {
  if (!t)
    return gt;
  let s = Qe.get(t);
  s || (s = /* @__PURE__ */ new Set(), Qe.set(t, s));
  const n = jh(), r = rc(t, i, n, e);
  if (s.add(r), !Bt.has(t)) {
    const a = () => {
      for (const f of s)
        f.measure(Gt.timestamp);
      W.preUpdate(h);
    }, h = () => {
      for (const f of s)
        f.notify();
    }, d = () => W.read(a);
    Bt.set(t, d);
    const u = js(t);
    window.addEventListener("resize", d, { passive: !0 }), t !== document.documentElement && Ys.set(t, Pl(t, d)), u.addEventListener("scroll", d, { passive: !0 }), d();
  }
  const o = Bt.get(t);
  return W.read(o, !1, !0), () => {
    var d;
    It(o);
    const a = Qe.get(t);
    if (!a || (a.delete(r), a.size))
      return;
    const h = Bt.get(t);
    Bt.delete(t), h && (js(t).removeEventListener("scroll", h), (d = Ys.get(t)) == null || d(), window.removeEventListener("resize", h));
  };
}
const Gs = /* @__PURE__ */ new Map();
function oc(i) {
  const t = { value: 0 }, e = cr((s) => {
    t.value = s[i.axis].progress * 100;
  }, i);
  return { currentTime: t, cancel: e };
}
function ur({ source: i, container: t, ...e }) {
  const { axis: s } = e;
  i && (t = i);
  const n = Gs.get(t) ?? /* @__PURE__ */ new Map();
  Gs.set(t, n);
  const r = e.target ?? "self", o = n.get(r) ?? {}, a = s + (e.offset ?? []).join(",");
  return o[a] || (o[a] = !e.target && Vn() ? new ScrollTimeline({ source: t, axis: s }) : oc({ container: t, ...e })), o[a];
}
function ac(i, t) {
  const e = ur(t);
  return i.attachTimeline({
    timeline: t.target ? void 0 : e,
    observe: (s) => (s.pause(), Xn((n) => {
      s.time = s.iterationDuration * n;
    }, e))
  });
}
function lc(i) {
  return i.length === 2;
}
function hc(i, t) {
  return lc(i) ? cr((e) => {
    i(e[t.axis].progress, e);
  }, t) : Xn(i, ur(t));
}
function Yc(i, { axis: t = "y", container: e = document.scrollingElement, ...s } = {}) {
  if (!e)
    return gt;
  const n = { axis: t, container: e, ...s };
  return typeof i == "function" ? hc(i, n) : ac(i, n);
}
function cc(i, t) {
  const e = Y.now(), s = ({ timestamp: n }) => {
    const r = n - e;
    r >= t && (It(s), i(r - t));
  };
  return W.setup(s, !0), () => It(s);
}
function uc(i, t) {
  return cc(i, /* @__PURE__ */ G(t));
}
var Ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dc(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Kt = { exports: {} };
Kt.exports;
var Zs;
function pc() {
  return Zs || (Zs = 1, function(i, t) {
    var e = 200, s = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", h = "[object Array]", d = "[object AsyncFunction]", u = "[object Boolean]", f = "[object Date]", m = "[object Error]", y = "[object Function]", b = "[object GeneratorFunction]", S = "[object Map]", T = "[object Number]", E = "[object Null]", P = "[object Object]", L = "[object Proxy]", k = "[object RegExp]", O = "[object Set]", M = "[object String]", F = "[object Undefined]", x = "[object WeakMap]", z = "[object ArrayBuffer]", q = "[object DataView]", j = "[object Float32Array]", Vt = "[object Float64Array]", yt = "[object Int8Array]", ji = "[object Int16Array]", Gi = "[object Int32Array]", ze = "[object Uint8Array]", st = "[object Uint8ClampedArray]", X = "[object Uint16Array]", le = "[object Uint32Array]", he = /[\\^$.*+?()[\]{}|]/g, ce = /^\[object .+?Constructor\]$/, ue = /^(?:0|[1-9]\d*)$/, R = {};
    R[j] = R[Vt] = R[yt] = R[ji] = R[Gi] = R[ze] = R[st] = R[X] = R[le] = !0, R[a] = R[h] = R[z] = R[u] = R[q] = R[f] = R[m] = R[y] = R[S] = R[T] = R[P] = R[k] = R[O] = R[M] = R[x] = !1;
    var Ft = typeof Ae == "object" && Ae && Ae.Object === Object && Ae, bt = typeof self == "object" && self && self.Object === Object && self, nt = Ft || bt || Function("return this")(), wt = t && !t.nodeType && t, Q = wt && !0 && i && !i.nodeType && i, ct = Q && Q.exports === wt, Re = ct && Ft.process, Zi = function() {
      try {
        var l = Q && Q.require && Q.require("util").types;
        return l || Re && Re.binding && Re.binding("util");
      } catch {
      }
    }(), Xi = Zi && Zi.isTypedArray;
    function Qi(l, c, p) {
      switch (p.length) {
        case 0:
          return l.call(c);
        case 1:
          return l.call(c, p[0]);
        case 2:
          return l.call(c, p[0], p[1]);
        case 3:
          return l.call(c, p[0], p[1], p[2]);
      }
      return l.apply(c, p);
    }
    function Sr(l, c) {
      for (var p = -1, w = Array(l); ++p < l; )
        w[p] = c(p);
      return w;
    }
    function Ar(l) {
      return function(c) {
        return l(c);
      };
    }
    function Tr(l, c) {
      return l == null ? void 0 : l[c];
    }
    function Er(l, c) {
      return function(p) {
        return l(c(p));
      };
    }
    var Or = Array.prototype, Ir = Function.prototype, de = Object.prototype, Ve = nt["__core-js_shared__"], pe = Ir.toString, ut = de.hasOwnProperty, Ji = function() {
      var l = /[^.]+$/.exec(Ve && Ve.keys && Ve.keys.IE_PROTO || "");
      return l ? "Symbol(src)_1." + l : "";
    }(), ts = de.toString, xr = pe.call(Object), Cr = RegExp(
      "^" + pe.call(ut).replace(he, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), fe = ct ? nt.Buffer : void 0, es = nt.Symbol, is = nt.Uint8Array;
    fe && fe.allocUnsafe;
    var ss = Er(Object.getPrototypeOf, Object), ns = Object.create, Pr = de.propertyIsEnumerable, Lr = Or.splice, vt = es ? es.toStringTag : void 0, me = function() {
      try {
        var l = He(Object, "defineProperty");
        return l({}, "", {}), l;
      } catch {
      }
    }(), kr = fe ? fe.isBuffer : void 0, rs = Math.max, Mr = Date.now, os = He(nt, "Map"), $t = He(Object, "create"), _r = /* @__PURE__ */ function() {
      function l() {
      }
      return function(c) {
        if (!at(c))
          return {};
        if (ns)
          return ns(c);
        l.prototype = c;
        var p = new l();
        return l.prototype = void 0, p;
      };
    }();
    function St(l) {
      var c = -1, p = l == null ? 0 : l.length;
      for (this.clear(); ++c < p; ) {
        var w = l[c];
        this.set(w[0], w[1]);
      }
    }
    function Dr() {
      this.__data__ = $t ? $t(null) : {}, this.size = 0;
    }
    function zr(l) {
      var c = this.has(l) && delete this.__data__[l];
      return this.size -= c ? 1 : 0, c;
    }
    function Rr(l) {
      var c = this.__data__;
      if ($t) {
        var p = c[l];
        return p === s ? void 0 : p;
      }
      return ut.call(c, l) ? c[l] : void 0;
    }
    function Vr(l) {
      var c = this.__data__;
      return $t ? c[l] !== void 0 : ut.call(c, l);
    }
    function Fr(l, c) {
      var p = this.__data__;
      return this.size += this.has(l) ? 0 : 1, p[l] = $t && c === void 0 ? s : c, this;
    }
    St.prototype.clear = Dr, St.prototype.delete = zr, St.prototype.get = Rr, St.prototype.has = Vr, St.prototype.set = Fr;
    function ot(l) {
      var c = -1, p = l == null ? 0 : l.length;
      for (this.clear(); ++c < p; ) {
        var w = l[c];
        this.set(w[0], w[1]);
      }
    }
    function $r() {
      this.__data__ = [], this.size = 0;
    }
    function Nr(l) {
      var c = this.__data__, p = ge(c, l);
      if (p < 0)
        return !1;
      var w = c.length - 1;
      return p == w ? c.pop() : Lr.call(c, p, 1), --this.size, !0;
    }
    function Hr(l) {
      var c = this.__data__, p = ge(c, l);
      return p < 0 ? void 0 : c[p][1];
    }
    function Br(l) {
      return ge(this.__data__, l) > -1;
    }
    function qr(l, c) {
      var p = this.__data__, w = ge(p, l);
      return w < 0 ? (++this.size, p.push([l, c])) : p[w][1] = c, this;
    }
    ot.prototype.clear = $r, ot.prototype.delete = Nr, ot.prototype.get = Hr, ot.prototype.has = Br, ot.prototype.set = qr;
    function xt(l) {
      var c = -1, p = l == null ? 0 : l.length;
      for (this.clear(); ++c < p; ) {
        var w = l[c];
        this.set(w[0], w[1]);
      }
    }
    function Ur() {
      this.size = 0, this.__data__ = {
        hash: new St(),
        map: new (os || ot)(),
        string: new St()
      };
    }
    function Wr(l) {
      var c = be(this, l).delete(l);
      return this.size -= c ? 1 : 0, c;
    }
    function Kr(l) {
      return be(this, l).get(l);
    }
    function Yr(l) {
      return be(this, l).has(l);
    }
    function jr(l, c) {
      var p = be(this, l), w = p.size;
      return p.set(l, c), this.size += p.size == w ? 0 : 1, this;
    }
    xt.prototype.clear = Ur, xt.prototype.delete = Wr, xt.prototype.get = Kr, xt.prototype.has = Yr, xt.prototype.set = jr;
    function Ct(l) {
      var c = this.__data__ = new ot(l);
      this.size = c.size;
    }
    function Gr() {
      this.__data__ = new ot(), this.size = 0;
    }
    function Zr(l) {
      var c = this.__data__, p = c.delete(l);
      return this.size = c.size, p;
    }
    function Xr(l) {
      return this.__data__.get(l);
    }
    function Qr(l) {
      return this.__data__.has(l);
    }
    function Jr(l, c) {
      var p = this.__data__;
      if (p instanceof ot) {
        var w = p.__data__;
        if (!os || w.length < e - 1)
          return w.push([l, c]), this.size = ++p.size, this;
        p = this.__data__ = new xt(w);
      }
      return p.set(l, c), this.size = p.size, this;
    }
    Ct.prototype.clear = Gr, Ct.prototype.delete = Zr, Ct.prototype.get = Xr, Ct.prototype.has = Qr, Ct.prototype.set = Jr;
    function to(l, c) {
      var p = Ue(l), w = !p && qe(l), C = !p && !w && ds(l), _ = !p && !w && !C && fs(l), $ = p || w || C || _, D = $ ? Sr(l.length, String) : [], N = D.length;
      for (var J in l)
        $ && // Safari 9 has enumerable `arguments.length` in strict mode.
        (J == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        C && (J == "offset" || J == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        _ && (J == "buffer" || J == "byteLength" || J == "byteOffset") || // Skip index properties.
        cs(J, N)) || D.push(J);
      return D;
    }
    function Fe(l, c, p) {
      (p !== void 0 && !we(l[c], p) || p === void 0 && !(c in l)) && $e(l, c, p);
    }
    function eo(l, c, p) {
      var w = l[c];
      (!(ut.call(l, c) && we(w, p)) || p === void 0 && !(c in l)) && $e(l, c, p);
    }
    function ge(l, c) {
      for (var p = l.length; p--; )
        if (we(l[p][0], c))
          return p;
      return -1;
    }
    function $e(l, c, p) {
      c == "__proto__" && me ? me(l, c, {
        configurable: !0,
        enumerable: !0,
        value: p,
        writable: !0
      }) : l[c] = p;
    }
    var io = mo();
    function ye(l) {
      return l == null ? l === void 0 ? F : E : vt && vt in Object(l) ? go(l) : Ao(l);
    }
    function as(l) {
      return Nt(l) && ye(l) == a;
    }
    function so(l) {
      if (!at(l) || vo(l))
        return !1;
      var c = Ke(l) ? Cr : ce;
      return c.test(Io(l));
    }
    function no(l) {
      return Nt(l) && ps(l.length) && !!R[ye(l)];
    }
    function ro(l) {
      if (!at(l))
        return So(l);
      var c = us(l), p = [];
      for (var w in l)
        w == "constructor" && (c || !ut.call(l, w)) || p.push(w);
      return p;
    }
    function Ne(l, c, p, w, C) {
      l !== c && io(c, function(_, $) {
        if (C || (C = new Ct()), at(_))
          oo(l, c, $, p, Ne, w, C);
        else {
          var D = w ? w(Be(l, $), _, $ + "", l, c, C) : void 0;
          D === void 0 && (D = _), Fe(l, $, D);
        }
      }, ms);
    }
    function oo(l, c, p, w, C, _, $) {
      var D = Be(l, p), N = Be(c, p), J = $.get(N);
      if (J) {
        Fe(l, p, J);
        return;
      }
      var K = _ ? _(D, N, p + "", l, c, $) : void 0, Ht = K === void 0;
      if (Ht) {
        var Ye = Ue(N), je = !Ye && ds(N), ys = !Ye && !je && fs(N);
        K = N, Ye || je || ys ? Ue(D) ? K = D : xo(D) ? K = uo(D) : je ? (Ht = !1, K = lo(N)) : ys ? (Ht = !1, K = co(N)) : K = [] : Co(N) || qe(N) ? (K = D, qe(D) ? K = Po(D) : (!at(D) || Ke(D)) && (K = yo(N))) : Ht = !1;
      }
      Ht && ($.set(N, K), C(K, N, w, _, $), $.delete(N)), Fe(l, p, K);
    }
    function ls(l, c) {
      return Eo(To(l, c, gs), l + "");
    }
    var ao = me ? function(l, c) {
      return me(l, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Mo(c),
        writable: !0
      });
    } : gs;
    function lo(l, c) {
      return l.slice();
    }
    function ho(l) {
      var c = new l.constructor(l.byteLength);
      return new is(c).set(new is(l)), c;
    }
    function co(l, c) {
      var p = ho(l.buffer);
      return new l.constructor(p, l.byteOffset, l.length);
    }
    function uo(l, c) {
      var p = -1, w = l.length;
      for (c || (c = Array(w)); ++p < w; )
        c[p] = l[p];
      return c;
    }
    function po(l, c, p, w) {
      var C = !p;
      p || (p = {});
      for (var _ = -1, $ = c.length; ++_ < $; ) {
        var D = c[_], N = void 0;
        N === void 0 && (N = l[D]), C ? $e(p, D, N) : eo(p, D, N);
      }
      return p;
    }
    function fo(l) {
      return ls(function(c, p) {
        var w = -1, C = p.length, _ = C > 1 ? p[C - 1] : void 0, $ = C > 2 ? p[2] : void 0;
        for (_ = l.length > 3 && typeof _ == "function" ? (C--, _) : void 0, $ && bo(p[0], p[1], $) && (_ = C < 3 ? void 0 : _, C = 1), c = Object(c); ++w < C; ) {
          var D = p[w];
          D && l(c, D, w, _);
        }
        return c;
      });
    }
    function mo(l) {
      return function(c, p, w) {
        for (var C = -1, _ = Object(c), $ = w(c), D = $.length; D--; ) {
          var N = $[++C];
          if (p(_[N], N, _) === !1)
            break;
        }
        return c;
      };
    }
    function hs(l, c, p, w, C, _) {
      return at(l) && at(c) && (_.set(c, l), Ne(l, c, void 0, hs, _), _.delete(c)), l;
    }
    function be(l, c) {
      var p = l.__data__;
      return wo(c) ? p[typeof c == "string" ? "string" : "hash"] : p.map;
    }
    function He(l, c) {
      var p = Tr(l, c);
      return so(p) ? p : void 0;
    }
    function go(l) {
      var c = ut.call(l, vt), p = l[vt];
      try {
        l[vt] = void 0;
        var w = !0;
      } catch {
      }
      var C = ts.call(l);
      return w && (c ? l[vt] = p : delete l[vt]), C;
    }
    function yo(l) {
      return typeof l.constructor == "function" && !us(l) ? _r(ss(l)) : {};
    }
    function cs(l, c) {
      var p = typeof l;
      return c = c ?? o, !!c && (p == "number" || p != "symbol" && ue.test(l)) && l > -1 && l % 1 == 0 && l < c;
    }
    function bo(l, c, p) {
      if (!at(p))
        return !1;
      var w = typeof c;
      return (w == "number" ? We(p) && cs(c, p.length) : w == "string" && c in p) ? we(p[c], l) : !1;
    }
    function wo(l) {
      var c = typeof l;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? l !== "__proto__" : l === null;
    }
    function vo(l) {
      return !!Ji && Ji in l;
    }
    function us(l) {
      var c = l && l.constructor, p = typeof c == "function" && c.prototype || de;
      return l === p;
    }
    function So(l) {
      var c = [];
      if (l != null)
        for (var p in Object(l))
          c.push(p);
      return c;
    }
    function Ao(l) {
      return ts.call(l);
    }
    function To(l, c, p) {
      return c = rs(c === void 0 ? l.length - 1 : c, 0), function() {
        for (var w = arguments, C = -1, _ = rs(w.length - c, 0), $ = Array(_); ++C < _; )
          $[C] = w[c + C];
        C = -1;
        for (var D = Array(c + 1); ++C < c; )
          D[C] = w[C];
        return D[c] = p($), Qi(l, this, D);
      };
    }
    function Be(l, c) {
      if (!(c === "constructor" && typeof l[c] == "function") && c != "__proto__")
        return l[c];
    }
    var Eo = Oo(ao);
    function Oo(l) {
      var c = 0, p = 0;
      return function() {
        var w = Mr(), C = r - (w - p);
        if (p = w, C > 0) {
          if (++c >= n)
            return arguments[0];
        } else
          c = 0;
        return l.apply(void 0, arguments);
      };
    }
    function Io(l) {
      if (l != null) {
        try {
          return pe.call(l);
        } catch {
        }
        try {
          return l + "";
        } catch {
        }
      }
      return "";
    }
    function we(l, c) {
      return l === c || l !== l && c !== c;
    }
    var qe = as(/* @__PURE__ */ function() {
      return arguments;
    }()) ? as : function(l) {
      return Nt(l) && ut.call(l, "callee") && !Pr.call(l, "callee");
    }, Ue = Array.isArray;
    function We(l) {
      return l != null && ps(l.length) && !Ke(l);
    }
    function xo(l) {
      return Nt(l) && We(l);
    }
    var ds = kr || _o;
    function Ke(l) {
      if (!at(l))
        return !1;
      var c = ye(l);
      return c == y || c == b || c == d || c == L;
    }
    function ps(l) {
      return typeof l == "number" && l > -1 && l % 1 == 0 && l <= o;
    }
    function at(l) {
      var c = typeof l;
      return l != null && (c == "object" || c == "function");
    }
    function Nt(l) {
      return l != null && typeof l == "object";
    }
    function Co(l) {
      if (!Nt(l) || ye(l) != P)
        return !1;
      var c = ss(l);
      if (c === null)
        return !0;
      var p = ut.call(c, "constructor") && c.constructor;
      return typeof p == "function" && p instanceof p && pe.call(p) == xr;
    }
    var fs = Xi ? Ar(Xi) : no;
    function Po(l) {
      return po(l, ms(l));
    }
    var Lo = ls(function(l) {
      return l.push(void 0, hs), Qi(ko, void 0, l);
    });
    function ms(l) {
      return We(l) ? to(l) : ro(l);
    }
    var ko = fo(function(l, c, p, w) {
      Ne(l, c, p, w);
    });
    function Mo(l) {
      return function() {
        return l;
      };
    }
    function gs(l) {
      return l;
    }
    function _o() {
      return !1;
    }
    i.exports = Lo;
  }(Kt, Kt.exports)), Kt.exports;
}
var fc = pc();
const V = /* @__PURE__ */ dc(fc), mc = 60, qt = {}, Xs = (i, t = mc) => (...e) => requestAnimationFrame(() => {
  const s = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  qt[i] = qt[i] || null;
  const r = qt[i] ? s - qt[i] : null;
  (r === null || r > n) && (qt[i] = s - r % n, i(...e));
});
function ee() {
  if (!window.matchMedia)
    return !1;
  const i = window.matchMedia("(prefers-reduced-motion: reduce)");
  return i ? i.matches : !1;
}
const vi = (i, t, e, s, n, r) => {
  const o = (i + t) / 2;
  if (e <= 0 || t - i < s)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? vi(o, t, e - 1, s, n, r) : vi(i, o, e - 1, s, n, r);
}, gc = (i, t, e, s, n, r) => vi(e, s, n, r, i, t), yc = () => Math.round(
  gc("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, bc = (i) => Math.round(window.devicePixelRatio * 100) - i, wc = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Je = {
  firefox: yc,
  chrome: bc,
  default: wc
}, Qs = {
  calculate: (i, t) => Je[i] ? Je[i](t) : Je.default(t)
}, Ui = "APPLICATION:MOBILE_MENU:OPEN", Wi = "APPLICATION:MOBILE_MENU:CLOSED", Pe = "APPLICATION_PRELUDIUM", Si = "APPLICATION:INITIALIZED", ie = "APPLICATION:READY", Z = "APPLICATION:REVEALED", it = "APPLICATION:RESIZE", mt = "APPLICATION:SCROLL", dr = "APPLICATION:SCROLL_LOCKED", pr = "APPLICATION:SCROLL_RELEASED", Me = "APPLICATION:FORCED_SCROLL_START", _e = "APPLICATION:FORCED_SCROLL_END", De = "APPLICATION:OUTLINE", fr = "APPLICATION:VISIBILITY_CHANGE", mr = "APPLICATION:HIDDEN", gr = "APPLICATION:VISIBLE", Le = "BREAKPOINT:CHANGE", Ki = "IMAGE:LAZYLOADED", yr = "IMAGE:REVEALED", br = "SECTION:LAZYLOADED", jc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: _e,
  APPLICATION_FORCED_SCROLL_START: Me,
  APPLICATION_HIDDEN: mr,
  APPLICATION_INITIALIZED: Si,
  APPLICATION_MOBILE_MENU_CLOSED: Wi,
  APPLICATION_MOBILE_MENU_OPEN: Ui,
  APPLICATION_OUTLINE: De,
  APPLICATION_PRELUDIUM: Pe,
  APPLICATION_READY: ie,
  APPLICATION_RESIZE: it,
  APPLICATION_REVEALED: Z,
  APPLICATION_SCROLL: mt,
  APPLICATION_SCROLL_LOCKED: dr,
  APPLICATION_SCROLL_RELEASED: pr,
  APPLICATION_VISIBILITY_CHANGE: fr,
  APPLICATION_VISIBLE: gr,
  BREAKPOINT_CHANGE: Le,
  IMAGE_LAZYLOADED: Ki,
  IMAGE_REVEALED: yr,
  SECTION_LAZYLOADED: br
}, Symbol.toStringTag, { value: "Module" })), vc = {
  runListenerOnInit: !1,
  breakpoints: ["xs", "sm", "md", "lg"],
  listeners: {
    // xs: (mq) => {
    //   if (mq.matches) {
    //     // XS NOW
    //   } else {
    //     // NOT XS ANYMORE
    //   }
    // }
  }
};
class Js {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = V(e, vc), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Pe, () => {
      this.initialize(!1);
    }), window.addEventListener(Z, () => {
      this.initialize(!0);
    });
  }
  initialize(t = !1) {
    if (!t) {
      this.opts.breakpoints.forEach((s) => {
        this.mediaQueries[s] = this._getVal(`--breakpoint-${s}`);
      });
      const e = Object.keys(this.mediaQueries);
      e.forEach((s) => {
        let n = "";
        const r = e[(e.indexOf(s) + 1) % e.length];
        s === this.opts.breakpoints[0] && this.mediaQueries[s] === "0" ? n = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[r]) - 1}px)` : r === this.opts.breakpoints[0] ? n = `(min-width: ${this.mediaQueries[s]})` : n = `(min-width: ${this.mediaQueries[s]}) and (max-width: ${parseInt(this.mediaQueries[r]) - 1}px)`, this.mediaQueries[s] = window.matchMedia(n);
        const o = (a) => {
          if (a.matches) {
            const h = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), h !== this.currentBreakpoint) {
              const d = new CustomEvent(Le, {
                detail: {
                  leaveBreakpoint: h,
                  enterBreakpoint: this.currentBreakpoint
                }
              });
              window.dispatchEvent(d);
            }
          }
          Object.prototype.hasOwnProperty.call(this.opts.listeners, s) && this.opts.listeners[s](a);
        };
        this.mediaQueries[s].addListener(o);
      });
    }
    if (this.setCurrentBreakpoint(), t && this.opts.runListenerOnInit && !this.initialized) {
      this.initialized = !0;
      const e = this.getCurrentBreakpoint();
      if (e && e.key && e.mq) {
        const s = {
          matches: e.mq.matches,
          media: e.mq.media,
          target: e.mq
        }, n = new CustomEvent(Le);
        window.dispatchEvent(n), Object.prototype.hasOwnProperty.call(this.opts.listeners, e.key) && this.opts.listeners[e.key](s);
      }
    }
  }
  getCurrentBreakpoint() {
    if (!Object.keys(this.mediaQueries).length)
      return null;
    const t = Object.keys(this.mediaQueries).find((e) => this.mediaQueries[e] && this.mediaQueries[e].matches);
    return t && this.mediaQueries[t] ? { key: t, mq: this.mediaQueries[t] } : null;
  }
  defaultListener(t) {
    t.matches && this.setCurrentBreakpoint();
  }
  setCurrentBreakpoint() {
    const t = this.getCurrentBreakpoint();
    t && t.key && (this.currentBreakpoint = t.key, this.app.breakpoint = t.key);
  }
  _getVal(t) {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim();
  }
}
class Sc {
  constructor(t, e) {
    this.app = t, this.testFns = {
      touch: this.testTouch
    }, this.results = {}, this.testIE11() ? this.testFor("ie11", !0) : this.results.ie11 = !1, this.testIOS() ? this.testFor("ios", !0) : this.results.ios = !1, this.testWebview() ? this.testFor("webview", !0) : this.results.webview = !1;
    const s = this.testBrowsers();
    this.results.browser = s, this.app.browser = s, document.documentElement.setAttribute("data-browser", s);
    const r = Object.keys(e).filter((o) => e[o]);
    this.runTests(r), this.bindEventTests();
  }
  runTests(t) {
    t.forEach((e) => {
      this.testFor(e, this.testFns[e]());
    });
  }
  testFor(t, e) {
    this.results[t] = e, document.documentElement.setAttribute(`data-${t}`, e);
  }
  /**
   * Check if we should outline elements. If the user hits TAB, we should outline,
   * otherwise we skip it.
   */
  testOutlineEvents() {
    document.addEventListener("mousedown", () => {
      this.testFor("outline", !1);
    }), document.addEventListener("keydown", (t) => {
      if (t.keyCode === 9 || t.which === 9) {
        this.testFor("outline", !0);
        const e = new window.CustomEvent(De);
        window.dispatchEvent(e);
      }
    });
  }
  /**
   * Sometimes the initial test for touch/mouse fail, so
   * listen for events as well
   */
  testTouchMouseEvents() {
    window.PointerEvent && "maxTouchPoints" in navigator ? navigator.maxTouchPoints > 0 && (this.results.touch = !0, this.results.mouse = !1, this.testFor("touch", !0), this.testFor("mouse", !1)) : window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches ? (this.results.touch = !0, this.results.mouse = !1, this.testFor("touch", !0), this.testFor("mouse", !1)) : (window.TouchEvent || "ontouchstart" in window) && (this.results.touch = !0, this.results.mouse = !1, this.testFor("touch", !0), this.testFor("mouse", !1));
    const t = () => {
      this.results.touch || (this.results.touch = !0, this.results.mouse = !1, this.testFor("touch", !0), this.testFor("mouse", !1), this.deviceLastTouched = Date.now());
    }, e = () => {
      this.deviceLastTouched = Date.now();
    };
    document.addEventListener("touchstart", t, !1), document.addEventListener("touchend", e, !1);
    const s = () => {
      this.results.mouse || Date.now() - this.devicelastTouched > 300 && (this.results.touch = !1, this.results.mouse = !0, this.testFor("touch", !1), this.testFor("mouse", !0));
    };
    document.addEventListener("mousemove", s, !1);
  }
  bindEventTests() {
    this.testOutlineEvents(), this.testTouchMouseEvents();
  }
  testTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  testIE11() {
    return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
  }
  testIOS() {
    return navigator.userAgent.match(/iphone|ipod|ipad/i);
  }
  testBrowsers() {
    let t = "unknown", e = !1, s = !1;
    return navigator.userAgent.indexOf("Chrome") > -1 && (t = "chrome", e = !0), navigator.userAgent.indexOf("MSIE") > -1 && (t = "ie"), navigator.userAgent.indexOf("Firefox") > -1 && (t = "firefox"), navigator.userAgent.indexOf("Safari") > -1 && (t = "safari", s = !0), e && s && (t = "chrome"), t;
  }
  testWebview() {
    return navigator.userAgent.match(/FBAN|FBAV|instagram|facebook|messenger/i);
  }
}
class Ac {
  constructor(t) {
    this.app = t;
  }
  loadFonts() {
    return new Promise((t) => {
      window.FontFace ? document.fonts.ready.then(() => {
        t();
      }) : setTimeout(() => {
        t();
      }, 800);
    });
  }
}
class Tc {
  /**
   * Create a new DOM utility instance
   */
  constructor() {
    this.body = document.body, this.html = document.documentElement;
  }
  new(t) {
    const e = new DOMParser().parseFromString(t.trim(), "text/html");
    return Array.from(e.body.childNodes);
  }
  find(t, e) {
    if (typeof t == "string" && typeof e == "object")
      throw new Error("Dom.find: Wrong syntax, use -> Dom.find(node, selector)");
    return typeof t == "string" ? document.querySelector(t) : typeof e == "string" ? t.querySelector(e) : null;
  }
  all(t, e) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : typeof e == "string" ? Array.from(t.querySelectorAll(e)) : [];
  }
  create(t, ...e) {
    const s = document.createElement(t);
    return this.addClass(s, ...e), s;
  }
  append(t) {
    document.body.appendChild(t);
  }
  remove(t) {
    t.remove();
  }
  addClass(t, ...e) {
    return e.forEach((s) => {
      t.classList.add(s);
    }), t;
  }
  removeClass(t, ...e) {
    return e.forEach((s) => {
      t.classList.remove(s);
    }), t;
  }
  hasClass(t, e) {
    return t.classList.contains(e);
  }
  toggleClass(t, ...e) {
    return e.map((s) => t.classList.toggle(s));
  }
  hasAttribute(t, e) {
    return t.hasAttribute(e);
  }
  overlapsVertically(t, e) {
    const s = t.getBoundingClientRect(), n = this.outerHeight(t), r = s.top + n, o = e.getBoundingClientRect(), a = this.outerHeight(e), h = o.top + a;
    return r > o.top ? r - o.top : s.top > h ? s.top - h : 0;
  }
  outerHeight(t) {
    let e = t.offsetHeight;
    const s = getComputedStyle(t);
    return e += parseInt(s.marginTop) + parseInt(s.marginBottom), e;
  }
  outerWidth(t) {
    let e = t.offsetWidth;
    const s = getComputedStyle(t);
    return e += parseInt(s.marginLeft) + parseInt(s.marginRight), e;
  }
  getCSSVar(t, e = document.documentElement) {
    return getComputedStyle(e).getPropertyValue(t).trim();
  }
  setCSSVar(t, e, s = document.documentElement) {
    s.style.setProperty(`--${t}`, e);
  }
  removeCSSVar(t, e = document.documentElement) {
    e.style.removeProperty(`--${t}`);
  }
  offset(t) {
    const e = t.getBoundingClientRect();
    return {
      top: e.top + window.pageYOffset,
      left: e.left + window.pageXOffset
    };
  }
  position(t) {
    return {
      top: t.offsetTop,
      left: t.offsetLeft
    };
  }
  /**
   * Check if parts of `el` is in viewport
   *
   * @param {*} el
   */
  inViewport(t) {
    const e = t.getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, r = e.top <= s && e.top + e.height >= 0, o = e.left <= n && e.left + e.width >= 0;
    return r && o;
  }
  /**
   * Strict viewport check - element must be fully contained within viewport bounds
   * Useful for popovers/tooltips that need to be completely visible
   *
   * @param {*} el
   */
  inViewportStrict(t) {
    const e = t.getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, r = e.top >= 0 && e.bottom <= s, o = e.left >= 0 && e.right <= n;
    return r && o;
  }
}
const A = new Tc();
function v(i, t) {
  let e;
  typeof i == "string" ? e = Array.from(document.querySelectorAll(i)) : i instanceof NodeList ? e = Array.from(i) : Array.isArray(i) ? e = i : e = [i], e.forEach((s) => {
    if (!s) return;
    const n = [], r = {};
    Object.entries(t).forEach(([o, a]) => {
      o === "x" ? n.push(`translateX(${typeof a == "number" ? a + "px" : a})`) : o === "y" ? n.push(`translateY(${typeof a == "number" ? a + "px" : a})`) : o === "scale" ? n.push(`scale(${a})`) : o === "scaleX" ? n.push(`scaleX(${a})`) : o === "scaleY" ? n.push(`scaleY(${a})`) : o === "rotate" ? n.push(`rotate(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateX" ? n.push(`rotateX(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateY" ? n.push(`rotateY(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateZ" ? n.push(`rotateZ(${typeof a == "number" ? a + "deg" : a})`) : r[o] = a;
    }), n.length > 0 && (s.style.transform = n.join(" ")), Object.entries(r).forEach(([o, a]) => {
      s.style[o] = a;
    });
  });
}
function jt(i, t, e = {}) {
  const s = typeof i == "string" ? document.querySelector(i) : i;
  return t === 0 ? g(s, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      s.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (s.style.visibility = "visible", g(s, { opacity: t }, e));
}
function et(i, t = "all") {
  let e;
  typeof i == "string" ? e = Array.from(document.querySelectorAll(i)) : i instanceof NodeList ? e = Array.from(i) : Array.isArray(i) ? e = i : e = [i], e.forEach((s) => {
    s && (t === "all" ? s.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((r) => {
      s.style.removeProperty(r);
    }));
  });
}
function ti(i, t) {
  return new Promise((e) => {
    uc(() => {
      t(), e();
    }, i);
  });
}
class tn {
  constructor() {
    this.sequence = [];
  }
  /**
   * Add animation to timeline
   * @param {Element|string} target - Element or selector
   * @param {Object} values - Properties to animate
   * @param {Object} options - Animation options
   * @returns {PausedTimeline} this for chaining
   */
  to(t, e, s = {}) {
    return this.sequence.push(["animate", t, e, s]), this;
  }
  /**
   * Add callback to timeline
   * @param {Function} callback - Function to call
   * @returns {PausedTimeline} this for chaining
   */
  call(t) {
    return this.sequence.push(["call", t]), this;
  }
  /**
   * Clear timeline sequence
   * @returns {PausedTimeline} this for chaining
   */
  clear() {
    return this.sequence = [], this;
  }
  /**
   * Play timeline sequence
   * Executes all animations and callbacks in order
   * @returns {Promise} Promise that resolves when sequence completes
   */
  async play() {
    const t = [...this.sequence];
    this.sequence = [];
    for (const e of t)
      if (e[0] === "animate") {
        const [, s, n, r] = e;
        if (n.autoAlpha !== void 0) {
          const o = { ...r };
          delete o.autoAlpha, await jt(s, n.autoAlpha, o).finished;
        } else
          await g(s, n, r).finished;
      } else e[0] === "call" && e[1]();
  }
}
function Te(i) {
  if (Array.isArray(i))
    return i;
  if (typeof i != "string")
    return "easeOut";
  if ([
    "linear",
    "easeIn",
    "easeInOut",
    "easeOut",
    "circIn",
    "circInOut",
    "circOut",
    "backIn",
    "backInOut",
    "backOut",
    "anticipate"
  ].includes(i))
    return i;
  const s = {
    // Power easings (most common)
    "power1.in": "easeIn",
    "power1.out": "easeOut",
    "power1.inOut": "easeInOut",
    "power2.in": "easeIn",
    "power2.out": "easeOut",
    "power2.inOut": "easeInOut",
    "power3.in": "easeIn",
    "power3.out": "easeOut",
    "power3.inOut": "easeInOut",
    "power4.in": "easeIn",
    "power4.out": "easeOut",
    "power4.inOut": "easeInOut",
    // Sine easings
    "sine.in": "easeIn",
    "sine.out": "easeOut",
    "sine.inOut": "easeInOut",
    // Expo easings
    "expo.in": "easeIn",
    "expo.out": "easeOut",
    "expo.inOut": "easeInOut",
    // Circ easings (Motion.js has these!)
    "circ.in": "circIn",
    "circ.out": "circOut",
    "circ.inOut": "circInOut",
    // Back easings (Motion.js has these!)
    "back.in": "backIn",
    "back.out": "backOut",
    "back.inOut": "backInOut",
    // Elastic and bounce - no direct equivalent, use anticipate or backOut
    "elastic.in": "backIn",
    "elastic.out": "backOut",
    "elastic.inOut": "backInOut",
    "bounce.in": "backIn",
    "bounce.out": "anticipate",
    "bounce.inOut": "backInOut",
    // Common aliases
    none: "linear",
    linear: "linear"
  }[i.toLowerCase()];
  return s || (console.warn(
    `[Motion Helpers] Unknown easing type "${i}", using "easeOut" as fallback`
  ), "easeOut");
}
window.onpageshow = (i) => {
  const t = window.location.hash;
  if (i.persisted || t) {
    const s = () => {
      const n = document.querySelector("#fader");
      n && (v(n, { opacity: 0, display: "none" }), n.style.visibility = "hidden");
      const r = document.querySelectorAll("[data-fader]");
      r.length && (v(r, { opacity: 0 }), r.forEach((d) => d.style.visibility = "hidden")), et(document.body, ["opacity"]), document.body.classList.remove("unloaded");
      const o = A.find("header[data-nav]");
      o && et(o, ["opacity", "transform"]);
      const a = A.find("main");
      a && et(a, ["opacity", "transform"]);
      const h = A.find("footer");
      h && et(h, ["opacity", "transform"]);
    };
    i.persisted ? s() : t && (setTimeout(s, 100), setTimeout(s, 500));
  }
};
const en = {
  respectReducedMotion: !1,
  featureTests: {
    touch: !0
  },
  focusableSelectors: [
    "a",
    "input",
    "select",
    "button",
    "textarea",
    "iframe"
    // , 'video'?
  ],
  breakpointConfig: {
    breakpoints: [
      "iphone",
      "mobile",
      "ipad_portrait",
      "ipad_landscape",
      "desktop_md",
      "desktop_lg",
      "desktop_xl"
    ]
  },
  bindScroll: !0,
  bindResize: !0,
  // Big Sur + Safari 14 is now trying to display webp, but fails intermittently
  disableWebpSafari: !1,
  faderOpts: {
    fadeIn: (i = () => {
    }) => {
      const t = document.querySelector("#fader");
      if (!t) {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), i();
        return;
      }
      g(t, { opacity: 0 }, { duration: 0.65 }).finished.then(() => {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), i();
      });
    }
  }
};
class Gc {
  constructor(t = {}) {
    this.debugType = 1, this.debugOverlay = null, this.userAgent = navigator.userAgent, this._lastWindowHeight = 0, this.breakpoint = null, this.language = document.documentElement.lang, this.size = {
      width: 0,
      height: 0,
      initialInnerHeight: 0,
      initialOuterHeight: 0,
      initialInnerWidth: 0,
      initialOuterWidth: 0,
      zoom: 1
    }, this.position = {
      top: 0,
      left: 0,
      lastTop: 0,
      lastLeft: 0
    }, this.state = {
      revealed: !1,
      forcedScroll: !1,
      scrollDirection: null
    };
    const e = t.breakpointConfig;
    delete t.breakpointConfig, this.opts = V(t, en), this.opts.breakpointConfig = e || en.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Sc(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Js(this, this.opts.breakpointConfig) : this.breakpoints = new Js(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new Ac(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = ee(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && document.documentElement.classList.add("prefers-reduced-motion"), window.addEventListener(Le, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent(Pe, this), this.initializedEvent = new window.CustomEvent(Si, this), this.readyEvent = new window.CustomEvent(ie, this), this.revealedEvent = new window.CustomEvent(Z, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", Xs(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", Xs(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Pe), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(Si), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(ie), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), v(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Qs.calculate(this.browser);
    }
  }
  zoomCalculateChrome(t) {
    if (t) {
      const e = Math.round(window.devicePixelRatio * 100), s = (e - this._lastDevicePixelRatio) / 100;
      this.size.zoom += s, this.size.zoom === 0 && (this.size.zoom = 1), this._lastDevicePixelRatio = e;
    }
  }
  zoomCalculateSafari() {
    this.size.zoom = this._zoomSVG.currentScale;
  }
  updateZoom(t = !1, e = 0) {
    switch (this.browser) {
      case "chrome":
        this.zoomCalculateChrome(t);
        break;
      case "safari":
        this.zoomCalculateSafari(t);
        break;
      default:
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Qs.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
    }
    this.setZoom();
  }
  /**
   * Fade in application, as declared in the `faderOpts`
   */
  fadeIn() {
    this.opts.faderOpts.fadeIn(this._emitRevealedEvent.bind(this));
  }
  /**
   * Register callbacks by `type`
   */
  registerCallback(t, e) {
    Object.prototype.hasOwnProperty.call(this.callbacks, t) || (this.callbacks[t] = []), this.callbacks[t].push(e);
  }
  /**
   * Execute callbacks by `type`
   */
  executeCallbacks(t) {
    Object.prototype.hasOwnProperty.call(this.callbacks, t) && this.callbacks[t].forEach((e) => e(this));
  }
  /**
   * Set section
   */
  setSection() {
    this.section = document.body.getAttribute("data-script");
  }
  /**
   * Check if document is scrolled
   */
  isScrolled() {
    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) > 0;
  }
  /**
   * Locks body scroll
   * `extraPaddedElements` can be a list of elements that also need padding, such as the header!
   * @param {*} extraPaddedElements
   */
  scrollLock(t = []) {
    if (this.SCROLL_LOCKED)
      return;
    const e = this.getCurrentScrollBarWidth(), s = new window.CustomEvent(dr, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(s), this.SCROLL_LOCKED = !0, v(document.body, { overflow: "hidden" }), v(this._scrollPaddedElements, {
      paddingRight: `${e}px`
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(pr, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, v(document.body, { overflow: t }), et(this._scrollPaddedElements, ["paddingRight"]), document.removeEventListener("touchmove", this.scrollVoid, !1);
  }
  /**
   *
   * @param {*} target
   * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
   * @param {*} time
   * @param {*} emitEvents
   */
  scrollTo(t, e = 0.8, s = !0, n = "easeInOut") {
    const r = new window.CustomEvent(Me);
    this.state.forcedScroll = !0, s && window.dispatchEvent(r);
    let o = 0;
    if (typeof t == "number")
      o = t;
    else if (typeof t == "string") {
      const y = document.querySelector(t);
      y && (o = y.getBoundingClientRect().top + window.pageYOffset);
    } else if (t instanceof Element)
      o = t.getBoundingClientRect().top + window.pageYOffset;
    else if (typeof t == "object") {
      const y = t.y;
      if (y instanceof Element)
        o = y.getBoundingClientRect().top + window.pageYOffset;
      else if (typeof y == "string") {
        const b = document.querySelector(y);
        b && (o = b.getBoundingClientRect().top + window.pageYOffset);
      } else typeof y == "number" && (o = y);
      t.offsetY && (o += t.offsetY);
    }
    const a = window.pageYOffset, h = o - a, d = e * 1e3, u = performance.now(), f = (y) => y < 0.5 ? 2 * y * y : -1 + (4 - 2 * y) * y, m = (y) => {
      const b = y - u, S = Math.min(b / d, 1), T = f(S), E = a + h * T;
      if (window.scrollTo(0, E), S < 1)
        requestAnimationFrame(m);
      else {
        const P = new window.CustomEvent(_e);
        s && (window.dispatchEvent(P), requestAnimationFrame(() => this.state.forcedScroll = !1));
      }
    };
    requestAnimationFrame(m);
  }
  hardScrollToTop() {
    window.scrollTo(0, 0);
  }
  hardScrollTo(t) {
    const e = A.find(t);
    e && e.scrollIntoView();
  }
  scrollVoid(t) {
    t.preventDefault();
  }
  /**
   * Get current scrollbar width — if there is none, there is none
   */
  getCurrentScrollBarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  /**
   * Get scrollbar width by FORCE. No matter if there is
   * currently a scrollbar or not
   */
  getScrollBarWidth() {
    if (!this.SCROLLBAR_WIDTH) {
      const t = document.createElement("div");
      t.style.visibility = "hidden", t.style.overflow = "scroll", t.style.msOverflowStyle = "scrollbar", document.body.appendChild(t);
      const e = document.createElement("div");
      t.appendChild(e), this.SCROLLBAR_WIDTH = t.offsetWidth - e.offsetWidth, t.parentNode.removeChild(t);
    }
  }
  /**
   * Ugly hacks
   */
  hacks() {
    if (this.opts.disableWebpSafari && this.browser === "safari") {
      const t = A.all('source[type="image/webp"]');
      for (let e = 0; e < t.length; e += 1)
        t[e].remove();
    }
  }
  getIOSCurrentInnerHeight() {
    return window.innerHeight;
  }
  getIOSInnerHeightMax() {
    if (!navigator.userAgent.match(/iphone|ipod|ipad/i))
      return window.innerHeight;
    const t = Math.abs(window.orientation), e = { w: 0, h: 0 };
    return (() => {
      let n = document.createElement("div");
      n.style.position = "fixed", n.style.height = "100vh", n.style.width = 0, n.style.top = 0, document.documentElement.appendChild(n), e.w = t === 90 ? n.offsetHeight : window.innerWidth, e.h = t === 90 ? window.innerWidth : n.offsetHeight, document.documentElement.removeChild(n), n = null;
    })(), Math.abs(window.orientation) !== 90 ? e.h : e.w;
  }
  /**
   * Event emitters
   */
  _emitBeforeInitializedEvent() {
    window.dispatchEvent(this.beforeInitializedEvent);
  }
  _emitInitializedEvent() {
    window.dispatchEvent(this.initializedEvent), this.INITIALIZED = !0;
  }
  _emitReadyEvent() {
    window.dispatchEvent(this.readyEvent), document.body.dataset.appReady = !0;
  }
  _emitRevealedEvent() {
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Z));
  }
  _getBaseVW() {
    const t = A.getCSSVar("--font-base-px"), e = parseFloat(t, 10), s = window.innerWidth;
    return `${e / s * 100}vw`;
  }
  setDims() {
    const t = document.querySelector(":root");
    this.size.initialInnerHeight = window.innerHeight, this.size.initialOuterHeight = window.outerHeight, this.size.initialInnerWidth = window.innerWidth, this.size.initialOuterWidth = window.outerWidth, this.size.scrollHeight = document.body.scrollHeight, t.style.setProperty("--vp-initial-inner-h", `${this.size.initialInnerHeight}px`), t.style.setProperty("--vp-initial-outer-h", `${this.size.initialOuterHeight}px`), t.style.setProperty("--vp-initial-inner-w", `${this.size.initialInnerWidth}px`), t.style.setProperty("--vp-initial-outer-w", `${this.size.initialOuterWidth}px`), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = A.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
  }
  setFontBaseVw() {
    const t = document.querySelector(":root");
    this.size.baseVW = this._getBaseVW(), t.style.setProperty("--font-base-vw", `${this.size.baseVW}`);
  }
  setZoom() {
    document.querySelector(":root").style.setProperty("--ec-zoom", `${this.size.zoom}`);
  }
  /**
   * Inner height of mobiles may change when showing hiding bottom bar.
   */
  setvh100() {
    const t = document.querySelector(":root"), e = this.featureTests.results.ios ? screen.height : window.innerHeight;
    t.style.setProperty("--vp-100vh", `${e}px`), t.style.setProperty("--vp-1vh", `${e * 0.01}px`);
  }
  setvw100() {
    const t = document.querySelector(":root");
    t.style.setProperty("--vp-100vw", `${window.innerWidth}px`), t.style.setProperty("--vp-1vw", `${window.innerWidth * 0.01}px`);
  }
  /**
   * Get the max 100vh for iOS
   */
  setvh100Max() {
    const t = document.querySelector(":root"), e = this.featureTests.results.ios ? this.getIOSInnerHeightMax() : this.size.initialInnerHeight;
    t.style.setProperty("--vp-100vh-max", `${e}px`), this.size.vh100max = e;
  }
  setScrollHeight() {
    document.querySelector(":root").style.setProperty("--scroll-h", `${document.body.scrollHeight}px`);
  }
  onBreakpointChanged() {
    this.size.container = A.getCSSVar("--container-padding");
  }
  /**
   * RAF'ed resize event
   */
  onResize(t) {
    const e = this.size.width !== window.innerWidth, s = this.size.height !== window.innerHeight, n = e || s, r = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(n, r), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
    const o = new CustomEvent(it, {
      detail: { widthChanged: e, heightChanged: s }
    });
    window.dispatchEvent(o);
  }
  /**
   * RAF'ed scroll event
   */
  onScroll(t) {
    if (this.SCROLL_LOCKED) {
      t.preventDefault();
      return;
    }
    this.position.lastTop = this.position.top, this.position.lastLeft = this.position.left, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset, this.position.top > this.position.lastTop ? this.state.scrollDirection = "down" : this.position.top < this.position.lastTop ? this.state.scrollDirection = "up" : this.position.left > this.position.lastLeft ? this.state.scrollDirection = "right" : this.position.left < this.position.lastLeft && (this.state.scrollDirection = "left");
    const e = {
      scrollDirection: this.state.scrollDirection,
      position: this.position,
      originalEvent: t
    }, s = new CustomEvent(mt, { detail: e });
    window.dispatchEvent(s);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(fr, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(mr, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(gr, t), window.dispatchEvent(e));
  }
  pollForElement(t, e = 500, s = () => {
  }) {
    const n = document.querySelector(t);
    n !== null ? s(n) : setTimeout(() => {
      this.pollForElement(t, e, s);
    }, e);
  }
  pollForVar(t, e = 500, s = () => {
  }) {
    t !== null ? s(t) : setTimeout(() => {
      this.pollForVar(t, e, s);
    }, e);
  }
  setupDebug() {
    if (this.setupGridoverlay(), this.debugOverlay = document.querySelector(".dbg-breakpoints"), !this.debugOverlay)
      return;
    this.debugOverlay.addEventListener("click", this.toggleDebug.bind(this));
    const t = this.debugOverlay.querySelector(".user-agent");
    v(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
    const e = t.querySelector("span"), s = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    e.addEventListener("click", () => {
      const r = t.querySelector("b"), o = document.createElement("textarea");
      o.value = `
${r.textContent}
SCREEN >> ${window.screen.width}x${window.screen.height}
WINDOW >> ${s}x${n}

FEATURES >>
${JSON.stringify(this.featureTests.results, void 0, 2)}
      `, document.body.appendChild(o), o.select(), document.execCommand("Copy"), o.remove(), e.innerHTML = "OK!", setTimeout(() => {
        e.innerHTML = "KOPIER";
      }, 1500);
    });
  }
  toggleDebug() {
    const t = this.debugOverlay.querySelector(".breakpoint"), e = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        g([t, e], { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
          [t, e].forEach((s) => s.style.visibility = "hidden"), g([t, e], { width: 0 }, { duration: 0.7 }).finished.then(() => {
            v([t, e], { display: "none" });
          });
        });
        break;
      case 1:
        v(t, { width: "auto", display: "block" }), t.style.visibility = "visible", g(t, { width: [0, "auto"] }, { duration: 0.7 }).finished.then(() => {
          g(t, { opacity: 1 }, { duration: 0.3 });
        });
        break;
      case 2:
        v(e, { width: "auto", display: "block" }), e.style.visibility = "visible", g(e, { width: [0, "auto"] }, { duration: 0.7 }).finished.then(() => {
          g(e, { opacity: 1 }, { duration: 0.3 });
        });
        break;
    }
  }
  /**
   * CTRL-G to show grid overlay
   */
  setupGridoverlay() {
    const t = (e) => {
      if (e.keyCode === 71 && e.ctrlKey) {
        const s = A.find(".dbg-grid"), n = A.all(s, "b");
        if (!s || !n)
          return;
        A.hasClass(s, "visible") ? (v(n, { width: "auto" }), g(
          n,
          {
            width: 0
          },
          {
            duration: 0.35,
            delay: ht(0.02),
            ease: "easeInOut"
          }
        ).finished.then(() => {
          s.classList.toggle("visible");
        })) : (v(n, { width: 0 }), s.classList.toggle("visible"), g(
          n,
          {
            width: "100%"
          },
          {
            duration: 0.35,
            delay: ht(0.02),
            ease: "easeInOut"
          }
        ));
      }
    };
    document.onkeydown = t;
  }
  /**
   * Add in extra selectors that are focusable
   * @param {array} extraSelectors
   */
  addFocusableSelectors(t) {
    t.length && (this.focusableSelectors = this.focusableSelectors.concat(t));
  }
  /**
   * Set focusable selectors. Replaces default array.
   * @param {array} selectors
   */
  setFocusableSelectors(t) {
    t.length && (this.focusableSelectors = t);
  }
  /**
   * Returns focusable selectors as a comma separated list
   */
  getFocusableSelectors() {
    return this.focusableSelectors.join(",");
  }
}
const Ec = {
  onAccept: (i) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), i.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), i.opts.setCookies(i);
    const e = [
      [i.cc, { y: "120%" }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [i.inner, { opacity: 0 }, { duration: 0.3, ease: "easeIn", at: 0 }]
    ];
    g(e).finished.then(() => {
      i.cc.style.display = "none";
    });
  },
  onRefuse: (i) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), i.setCookie("COOKIES_CONSENT_STATUS", 0, t, "/");
    const e = [
      [i.cc, { y: "120%" }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [i.inner, { opacity: 0 }, { duration: 0.3, ease: "easeIn", at: 0 }]
    ];
    g(e).finished.then(() => {
      i.cc.style.display = "none";
    });
  },
  alreadyConsented: (i) => {
  },
  alreadyRefused: (i) => {
  },
  setCookies: (i) => {
  },
  showCC: (i) => {
    if (i.hasCookie("COOKIES_CONSENT_STATUS")) {
      i.getCookie("COOKIES_CONSENT_STATUS") === "1" ? i.opts.alreadyConsented(i) : i.opts.alreadyRefused(i);
      return;
    }
    i.cc.style.display = "block", v(i.cc, { opacity: 1 }), v(i.inner, { opacity: 1 });
    const t = [
      [i.cc, { y: ["120%", "0%"] }, { duration: 0.5, ease: "easeOut", at: 1 }],
      [i.text, { opacity: [0, 1] }, { duration: 0.7, ease: "easeOut", at: 1.15 }],
      [i.btns, { opacity: [0, 1] }, { duration: 0.7, ease: "easeOut", at: 1.5 }]
    ];
    g(t);
  }
};
class Zc {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Ec), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Z, () => {
      this.opts.showCC(this);
    }), this.btn.addEventListener("click", () => {
      this.opts.onAccept(this);
    }), this.btnRefuse && this.btnRefuse.addEventListener("click", () => {
      this.opts.onRefuse(this);
    }));
  }
  /**
   * Get a cookie value by key
   * @param {string} sKey - Cookie key
   * @returns {string|null} Cookie value or null if not found
   */
  getCookie(t) {
    return t && decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          `(?:(?:^|.*;)\\s*${encodeURIComponent(t).replace(
            /[-.+*]/g,
            "\\$&"
          )}\\s*\\=\\s*([^;]*).*$)|^.*$`
        ),
        "$1"
      )
    ) || null;
  }
  /**
   * Set a cookie
   * @param {string} sKey - Cookie key
   * @param {string|number} sValue - Cookie value
   * @param {Date|string|number} vEnd - Expiration date, string date, or max age in seconds
   * @param {string} [sPath] - Cookie path
   * @param {string} [sDomain] - Cookie domain
   * @param {boolean} [bSecure] - Secure flag
   * @returns {boolean} Whether cookie was set successfully
   */
  setCookie(t, e, s, n, r, o) {
    if (!t || /^(?:expires|max-age|path|domain|secure)$/i.test(t))
      return !1;
    let a = "";
    if (s)
      switch (s.constructor) {
        case Number:
          a = s === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : `; max-age=${s}`;
          break;
        case String:
          a = `; expires=${s}`;
          break;
        case Date:
          a = `; expires=${s.toUTCString()}`;
          break;
      }
    return document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)}${a}${r ? `; domain=${r}` : ""}${n ? `; path=${n}` : ""}${o ? "; secure" : ""}`, !0;
  }
  /**
   * Remove a cookie
   * @param {string} sKey - Cookie key
   * @param {string} [sPath] - Cookie path
   * @param {string} [sDomain] - Cookie domain
   * @returns {boolean} Whether cookie was removed successfully
   */
  removeCookie(t, e, s) {
    return this.hasCookie(t) ? (document.cookie = `${encodeURIComponent(t)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${s ? `; domain=${s}` : ""}${e ? `; path=${e}` : ""}`, !0) : !1;
  }
  /**
   * Check if a cookie exists
   * @param {string} sKey - Cookie key
   * @returns {boolean} Whether cookie exists
   */
  hasCookie(t) {
    return !t || /^(?:expires|max-age|path|domain|secure)$/i.test(t) ? !1 : new RegExp(
      `(?:^|;\\s*)${encodeURIComponent(t).replace(/[-.+*]/g, "\\$&")}\\s*\\=`
    ).test(document.cookie);
  }
  /**
   * Get all cookie keys
   * @returns {string[]} Array of cookie keys
   */
  keys() {
    const t = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/);
    for (let e = t.length, s = 0; s < e; s += 1)
      t[s] = decodeURIComponent(t[s]);
    return t;
  }
}
const Oc = {};
class Xc {
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Oc), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-cover-overlay]");
    Array.from(t).forEach((e) => {
      let s;
      const n = e.querySelector(".picture-wrapper"), r = e.querySelector("[data-cover-overlay-button]"), o = e.querySelector("iframe");
      o && o.setAttribute(
        "allow",
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ), e.hasAttribute("data-cover-overlay-vimeo-play") && (window.Vimeo && o ? s = new window.Vimeo.Player(o) : console.error("==> JUPITER// Missing vimeo JS or iframe")), r.addEventListener("click", () => {
        g([
          [r, { opacity: 0 }, { duration: 0.5, ease: "easeIn", at: 0 }],
          [n, { opacity: 0 }, { duration: 1, ease: "easeIn", at: 0 }],
          [o, { opacity: 1 }, { duration: 0.5, ease: "easeOut", at: 0.5 }],
          [n, { display: "none" }, { duration: 0, at: 1 }]
        ]).finished.then(() => {
          s ? s.play() : o && o.src.includes("youtube.com") && o.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        });
      });
    });
  }
}
class Ic {
  constructor(t, e) {
    this.dataloader = t, this.config = e, this.language = document.documentElement.lang || "en", this.languageInPath = e.languageInPath || !1, this.hideDefaultLanguage = e.hideDefaultLanguage !== !1, this.defaultLanguage = e.defaultLanguage || "en", this.omitFromUrl = e.omitFromUrl || {
      en: ["all"],
      no: ["alle"]
      // Add more languages as needed
    }, this.initialize();
  }
  initialize() {
    this.syncFromUrl(), this.popstateHandler = () => {
      this.syncFromUrl(), this.dataloader.fetch();
    }, window.addEventListener("popstate", this.popstateHandler);
  }
  /**
   * Build URL from parameters using template
   */
  buildUrl(t) {
    if (typeof this.config.buildUrl == "function")
      return this.config.buildUrl(t, this.language, window.location.pathname);
    const e = this.config.templates[this.language] || this.config.templates[this.defaultLanguage] || Object.values(this.config.templates)[0];
    if (!e)
      return console.error("No URL template found for dataloader:", this.dataloader.id), window.location.pathname;
    let s = e;
    return Object.entries(t).forEach(([n, r]) => {
      const o = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || [], a = !r || o.includes(r);
      s = s.replace(`:${n}`, a ? "" : r);
    }), s = s.replace(/\/:[^\/]+/g, ""), s = s.replace(/\/+$/, ""), (!s || s === "") && (s = e.split(":")[0].replace(/\/+$/, "") || "/"), this.languageInPath && (this.language !== this.defaultLanguage || !this.hideDefaultLanguage) && !s.startsWith(`/${this.language}/`) && (s = `/${this.language}${s}`), s;
  }
  /**
   * Parse current URL and extract parameters based on template
   */
  parseUrl() {
    if (typeof this.config.parseUrl == "function")
      return this.config.parseUrl(window.location.pathname, this.language);
    const t = this.config.templates[this.language] || this.config.templates[this.defaultLanguage] || Object.values(this.config.templates)[0];
    if (!t)
      return {};
    let e = window.location.pathname;
    if (this.languageInPath) {
      const u = `/${this.language}/`;
      e.startsWith(u) ? e = e.substring(u.length - 1) : this.hideDefaultLanguage && e.startsWith("/");
    }
    let s = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const n = [];
    s = s.replace(/:(\w+)/g, (u, f) => (n.push(f), "([^/]+)"));
    const r = t.split("/"), o = e.split("/");
    if (o.length <= r.length) {
      let f = r.slice(0, o.length).join("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const m = [];
      f = f.replace(/:(\w+)/g, (S, T) => (m.push(T), "([^/]+)"));
      const y = new RegExp(`^${f}$`), b = e.match(y);
      if (b) {
        const S = {};
        return m.forEach((T, E) => {
          b[E + 1] && (S[T] = decodeURIComponent(b[E + 1]));
        }), S;
      }
    }
    const a = new RegExp(`^${s}$`), h = e.match(a);
    if (!h)
      return {};
    const d = {};
    return n.forEach((u, f) => {
      h[f + 1] && (d[u] = decodeURIComponent(h[f + 1]));
    }), d;
  }
  /**
   * Update browser URL with current parameters
   */
  updateUrl(t) {
    const e = this.buildUrl(t);
    e !== window.location.pathname && history.pushState(
      { dataloaderId: this.dataloader.id, params: t },
      "",
      e
    );
  }
  /**
   * Sync dataloader parameters from current URL
   */
  syncFromUrl() {
    const t = this.parseUrl();
    this.dataloader.$paramEls.forEach((e) => {
      e.removeAttribute("data-loader-param-selected");
    }), this.dataloader.opts.loaderParam = {}, Object.entries(t).forEach(([e, s]) => {
      const n = this.dataloader.$paramEls.find((r) => (r.dataset.loaderParamKey || "defaultParam") === e && r.dataset.loaderParam === s);
      n && n.setAttribute("data-loader-param-selected", ""), e === "defaultParam" ? this.dataloader.opts.loaderParam.defaultParam = s : this.dataloader.opts.loaderParam[e] = s;
    });
  }
  /**
   * Clean up event listeners
   */
  destroy() {
    this.popstateHandler && window.removeEventListener("popstate", this.popstateHandler);
  }
}
const xc = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (i) => {
  }
};
class Qc {
  constructor(t, e, s = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = A.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = A.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = A.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = V(s, xc), this.initialize();
  }
  static replaceInnerHTML(t, e) {
    return new Promise((s) => {
      fetch(e).then((n) => n.text()).then((n) => (t.innerHTML = n, s(t)));
    });
  }
  debounce(t, e = 650) {
    let s;
    return (...n) => {
      clearTimeout(s), s = setTimeout(() => {
        t.apply(this, n);
      }, e);
    };
  }
  updateBaseURL(t) {
    this.baseURL = t;
  }
  setInitialParams() {
    this.$paramEls.forEach((t) => {
      if (t.hasAttribute("data-loader-param-selected")) {
        const e = t.dataset.loaderParamKey || "defaultParam";
        this.opts.loaderParam[e] = t.dataset.loaderParam;
      }
    }), this.urlSync && this.opts.urlSync[this.id].updateOnInit !== !1 && this.urlSync.updateUrl(this.opts.loaderParam);
  }
  initialize() {
    var t;
    this.baseURL = this.$el.dataset.loader, this.$paramEls = A.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new Ic(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
      e.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = A.find(this.$el, "[data-loader-more]"), !this.$moreBtn && this.id && (this.$moreBtn = A.find(`[data-loader-more-for="${this.id}"]`)), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = A.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.id && (this.$filterInput = A.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener("input", this.debounce(this.onFilterInput.bind(this)));
  }
  onFilterInput(t) {
    t.preventDefault(), this.loading(), this.opts.page = 0, this.opts.filter = this.$filterInput.value, this.fetch(!1);
  }
  onMore(t) {
    t.preventDefault(), this.loading(), this.opts.page += 1, this.fetch(!0);
  }
  onParam(t) {
    this.loading(), this.opts.page = 0;
    const e = t.currentTarget.hasAttribute("data-loader-param-multi");
    if (t.currentTarget.getAttribute("type") === "checkbox") {
      const s = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[s] = t.currentTarget.checked;
    } else if (t.preventDefault(), t.currentTarget.hasAttribute("data-loader-param-selected")) {
      const s = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      e ? this.opts.loaderParam[s] = this.opts.loaderParam[s].filter((n) => n !== t.currentTarget.dataset.loaderParam) : delete this.opts.loaderParam[s], t.currentTarget.removeAttribute("data-loader-param-selected");
    } else if (e) {
      const s = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam.hasOwnProperty(s) || (this.opts.loaderParam[s] = []), this.opts.loaderParam[s].push(t.currentTarget.dataset.loaderParam), t.currentTarget.setAttribute("data-loader-param-selected", "");
    } else {
      const s = t.currentTarget.dataset.loaderParamKey;
      this.$paramEls.forEach((r) => {
        s ? r.dataset.loaderParamKey === s && r.removeAttribute("data-loader-param-selected") : r.removeAttribute("data-loader-param-selected");
      }), t.currentTarget.setAttribute("data-loader-param-selected", "");
      const n = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[n] = t.currentTarget.dataset.loaderParam;
    }
    this.urlSync && this.urlSync.updateUrl(this.opts.loaderParam), this.fetch();
  }
  fetch(t = !1) {
    const { defaultParam: e, ...s } = this.opts.loaderParam, n = this.opts.filter, r = `${this.baseURL}/${e ? e + "/" : ""}${this.opts.page}?` + new URLSearchParams({ filter: n, ...s });
    fetch(r).then((o) => (this.status = o.headers.get("jpt-dataloader") || "available", this.updateButton(), o.text())).then((o) => {
      t ? this.$canvasEl.innerHTML += o : this.$canvasEl.innerHTML = o, this.opts.onFetch(this), this.complete();
    });
  }
  /**
   * Set [data-loader-loading] on main el
   */
  loading() {
    document.documentElement.setAttribute("data-loading", ""), this.$el.setAttribute("data-loader-loading", "");
  }
  /**
   * Remove [data-loader-loading] on main el
   */
  complete() {
    this.$el.removeAttribute("data-loader-loading"), document.documentElement.removeAttribute("data-loading");
  }
  /**
   * Update the MORE button
   *
   * Sets [data-loader-starved] attribute if there is no more to fetch
   */
  updateButton() {
    this.$moreBtn && (this.status === "starved" ? this.$moreBtn.setAttribute("data-loader-starved", "") : this.$moreBtn.removeAttribute("data-loader-starved"));
  }
}
const Cc = {
  multipleActive: !1,
  selectors: {
    trigger: "[data-dropdown-trigger]",
    menu: "[data-dropdown-menu]",
    menuItems: "[data-dropdown-menu] > li"
  },
  overlapTweens: !0,
  menuOpenDuration: 0.1,
  tweens: {
    items: {
      duration: 0.2,
      autoAlpha: 0,
      stagger: 0.03
    }
  },
  onBeforeOpen: async (i) => {
  },
  onAfterOpen: async (i) => {
  },
  onBeforeClose: async (i) => {
  },
  onAfterClose: async (i) => {
  }
};
class Jc {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = V(e, Cc), this.elements = {}, this.open = !1, this.element = e.el, this.element.matches && this.element.matches(this.opts.selectors.trigger) ? this.elements.trigger = this.element : this.elements.trigger = A.find(this.element, this.opts.selectors.trigger), this.elements.trigger && this.elements.trigger.hasAttribute("data-dropdown-target")) {
      const s = this.elements.trigger.getAttribute(
        "data-dropdown-target"
      );
      this.elements.menu = A.find(s);
    } else
      this.elements.menu = A.find(this.element, this.opts.selectors.menu);
    this.elements.menuItems = A.all(
      this.elements.menu,
      this.opts.selectors.menuItems
    ), this.handleDocumentClick = this.handleDocumentClick.bind(this), this.initialize(), this.checkForInitialOpen();
  }
  initialize() {
    if (!this.elements.menu) {
      console.error("Dropdown menu element not found");
      return;
    }
    if (this.elements.menu.style.removeProperty("height"), v(this.elements.menu, { display: "none", opacity: 0 }), this.elements.menuItems && this.elements.menuItems.length && v(this.elements.menuItems, { opacity: 0 }), !this.elements.trigger) {
      console.error("Dropdown trigger element not found");
      return;
    }
    this.elements.trigger.addEventListener("click", this.onClick.bind(this));
  }
  positionMenu() {
    const t = this.elements.menu.getBoundingClientRect(), e = window.innerHeight, s = window.innerWidth, n = t.height, r = t.top;
    A.setCSSVar(
      "dropdown-menu-height",
      `${n}px`,
      this.elements.menu
    ), n + r > e ? this.elements.menu.setAttribute("data-dropdown-placement", "top") : this.elements.menu.setAttribute("data-dropdown-placement", "bottom");
    const o = window.getComputedStyle(this.elements.menu);
    let a = parseFloat(o.left) || 0;
    t.left < 0 ? this.elements.menu.style.left = `${a - t.left}px` : t.right > s && (this.elements.menu.style.left = `${a - (t.right - s)}px`);
  }
  async onClick(t) {
    t.preventDefault(), t.stopPropagation(), this.open ? (await this.opts.onBeforeClose(this), await this.closeMenu(), this.opts.onAfterClose(this)) : (await this.opts.onBeforeOpen(this), await this.openMenu(), this.opts.onAfterOpen(this));
  }
  async openMenu() {
    this.opts.multipleActive || (this.app.currentMenu && (this.opts.overlapTweens ? this.app.currentMenu.closeMenu() : await this.app.currentMenu.closeMenu()), this.app.currentMenu = this), this.open = !0, this.elements.trigger.dataset.dropdownActive = "", document.addEventListener("click", this.handleDocumentClick), v(this.elements.menu, { display: "flex", opacity: 0 }), this.elements.menu.classList.add("zero-height"), await new Promise((t) => setTimeout(t, 50)), this.elements.menu.classList.remove("zero-height"), this.positionMenu(), await g(this.elements.menu, { opacity: 1 }, {
      duration: this.opts.menuOpenDuration
    }).finished, this.elements.menuItems.length && await g(this.elements.menuItems, { opacity: 1 }, {
      duration: this.opts.tweens.items.duration,
      delay: ht(this.opts.tweens.items.stagger)
    }).finished;
  }
  async closeMenu() {
    this.app.currentMenu = null, this.open = !1, delete this.elements.trigger.dataset.dropdownActive, document.removeEventListener("click", this.handleDocumentClick), this.elements.menuItems.length && await g(this.elements.menuItems, { opacity: 0 }, {
      duration: this.opts.tweens.items.duration * 0.5
    }).finished, await g(this.elements.menu, { opacity: 0 }, {
      duration: this.opts.menuOpenDuration
    }).finished, this.elements.menu.classList.add("zero-height"), await new Promise((t) => setTimeout(t, 50)), v(this.elements.menu, { display: "none" }), this.elements.menu.classList.remove("zero-height");
  }
  // Handler that checks if a click was outside the dropdown element.
  handleDocumentClick(t) {
    this.element.contains(t.target) || this.onClick(t);
  }
  checkForInitialOpen() {
    this.elements.trigger && this.elements.trigger.hasAttribute("data-dropdown-active") && this.openMenu();
  }
}
const Pc = {};
class tu {
  constructor(t, e, s = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = V(s, Pc), this.selector = e, this.initialize(), window.addEventListener(it, () => {
      et("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
    });
  }
  initialize() {
    const t = A.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let s = null;
      const n = [];
      let r = [], o = 0;
      A.all(e, this.selector).forEach((h) => {
        const d = h.getBoundingClientRect();
        if (s === null) {
          o = d.height, r.push(h), s = d.top;
          return;
        }
        s !== d.top ? (console.debug("== pushing actionables", { elements: r, height: o }), n.push({ elements: r, height: o }), r = [], o = d.height) : s === d.top ? d.height > o && (o = d.height) : o = d.height, r.push(h), s = d.top;
      }), r.length && n.push({ elements: r, height: o }), n.length && n.forEach((h) => {
        h.elements.forEach((d) => {
          d.style.minHeight = `${h.height}px`, d.setAttribute("data-eq-height-elements-adjusted", "true");
        });
      });
    });
  }
}
function ae(i, t = !1) {
  return new Promise((e) => {
    t ? i.hasAttribute("data-ll-loaded") ? e({ img: i, status: "ok" }) : i.addEventListener(Ki, () => {
      e({ img: i, status: "ok" });
    }) : i.complete ? e({ img: i, status: "ok" }) : (i.onload = () => {
      e({ img: i, status: "ok" });
    }, i.onerror = () => {
      e({ img: i, status: "error" });
    });
  });
}
function Yi(i, t = !1) {
  i && i.nodeType && (i = i.querySelectorAll("img"));
  const e = [];
  for (let s = 0; s < i.length; s += 1) {
    const n = i[s];
    e.push(ae(n, t));
  }
  return Promise.all(e);
}
const Lc = {
  listenForResize: !0
};
class eu {
  constructor(t, e = {}, s = document.body) {
    this.app = t, this.container = s, this.opts = V(e, Lc), this.initialize(), e.listenForResize && window.addEventListener(it, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const s = [];
      let n = [], r = 0;
      const o = A.all(t, "img");
      o.length !== 0 && Yi(o, !1).then(() => {
        o.forEach((a) => {
          const h = a.getBoundingClientRect(), d = this.getImgSizeInfo(a);
          if (e === null) {
            r = d.height, n.push(a), e = h.top;
            return;
          }
          e !== h.top ? (s.push({ elements: n, height: r }), n = [], r = d.height) : e === h.top ? d.height > r && (r = d.height) : r = d.height, n.push(a), e = h.top;
        }), n.length && s.push({ elements: n, height: r }), s.length && s.forEach((a) => {
          a.elements.forEach((h) => {
            h.style.minHeight = `${a.height}px`;
          });
        });
      });
    });
  }
  initialize() {
    this.canvases = A.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, s, n, r, o) {
    const a = n / r, h = e / s;
    return (function() {
      return (t ? a > h : a < h) ? (this.width = e, this.height = e / a) : (this.width = s * a, this.height = s), this.left = (e - this.width) * (o / 100), this.right = this.width + this.left, this;
    }).call({});
  }
  getImgSizeInfo(t) {
    const e = window.getComputedStyle(t).getPropertyValue("object-position").split(" ");
    return this.getRenderedSize(
      !0,
      t.width,
      t.height,
      t.naturalWidth,
      t.naturalHeight,
      parseInt(e[0])
    );
  }
}
const wr = {
  onPin: (i) => {
    g(i.el, {
      yPercent: "0"
    }, {
      duration: 0.35,
      ease: "easeOut"
    });
  },
  onUnpin: (i) => {
    i._hiding = !0, g(i.el, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      ease: "easeIn"
    }).finished.then(() => {
      i._hiding = !1;
    });
  },
  onAltBg: (i) => {
    i.opts.altBgColor && g(i.el, {
      backgroundColor: i.opts.altBgColor
    }, {
      duration: 0.2
    });
  },
  onNotAltBg: (i) => {
    i.opts.regBgColor && g(i.el, {
      backgroundColor: i.opts.regBgColor
    }, {
      duration: 0.4
    });
  },
  // eslint-disable-next-line no-unused-vars
  onSmall: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotSmall: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onTop: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotTop: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onBottom: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotBottom: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuOpen: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuClose: (i) => {
  },
  // eslint-disable-next-line no-unused-vars
  onIntersect: (i) => {
  },
  onOutline: (i) => {
    i.preventUnpin = !0, i.pin();
  }
}, kc = {
  el: "header[data-nav]",
  on: Z,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (i) => {
      v(i.el, { yPercent: -100 }), v(i.lis, { opacity: 0 });
    },
    enter: (i) => {
      g(i.el, {
        yPercent: 0
      }, {
        duration: 1,
        delay: i.opts.enterDelay,
        ease: "easeOut"
      }), g(i.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: ht(0.1, { startDelay: i.opts.enterDelay }),
        ease: "easeIn"
      });
    },
    enterDelay: 0,
    tolerance: 3,
    offset: 0,
    // how far from the top before we trigger hide
    offsetSmall: 50,
    // how far from the top before we trigger the shrinked padding,
    offsetBg: 200,
    // how far down before changing backgroundcolor
    regBgColor: null,
    altBgColor: null,
    ...wr
  }
};
class iu {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = V(e, kc), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const s = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(s, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.opts.intersects && (this.intersectingElements = A.all("[data-intersect]")), window.addEventListener(De, () => {
      this.opts.onOutline(this);
    }), this.initialize();
  }
  initialize() {
    if (this.lastKnownScrollY = this.getScrollY(), this.lastKnownScrollHeight = document.body.scrollHeight, this.currentScrollY = this.lastKnownScrollY, this.currentScrollHeight = this.lastKnownScrollHeight, this.pageIsScrolledOnReady = !1, typeof this.opts.offsetBg == "string") {
      const t = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = t.offsetTop;
    } else typeof this.opts.offsetBg == "function" && (this.opts.offsetBg = this.opts.offsetBg(this) - 1);
    if (typeof this.opts.offset == "string") {
      const t = document.querySelector(this.opts.offset);
      this.opts.offset = t.offsetTop - 1;
    } else typeof this.opts.offset == "function" && (this.opts.offset = this.opts.offset(this) - 1);
    if (typeof this.opts.offsetSmall == "string") {
      const t = document.querySelector(this.opts.offsetSmall);
      this.opts.offsetSmall = t.offsetTop - 1;
    } else typeof this.opts.offsetSmall == "function" && (this.opts.offsetSmall = this.opts.offsetSmall(this) - 1);
    this.mainOpts.unpinOnForcedScrollStart && window.addEventListener(
      Me,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      _e,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Z, () => {
      let t = mt;
      this.mainOpts.rafScroll || (t = "scroll"), window.addEventListener(t, this.redraw.bind(this), {
        capture: !1,
        passive: !0
      }), window.addEventListener("scroll", () => {
        clearTimeout(this.scrollSettleTimeout), this.scrollSettleTimeout = setTimeout(() => {
          const e = this.opts.canvas === window || this.opts.canvas === document.body ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop : this.opts.canvas.scrollTop;
          this.currentScrollY = e, this.checkTop(!0), this.checkBot(!0);
        }, 100);
      }, {
        capture: !1,
        passive: !0
      });
    }), this.app.registerCallback(
      ie,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      it,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Z, () => {
      setTimeout(() => {
        this.el.setAttribute("data-header-transitions", "");
      }, 350);
    });
  }
  lock() {
    this.preventPin = !0, this.preventUnpin = !0;
  }
  unlock() {
    this.preventPin = !1, this.preventUnpin = !1;
  }
  isScrolled() {
    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) > 0;
  }
  unpinIfScrolled() {
    this.isScrolled() && (this.pageIsScrolledOnReady = !0, this.unpin());
  }
  enter() {
    this.opts.enter && (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0), this.opts.enter(this));
  }
  setResizeTimer() {
    this._isResizing = !0, this._pinned && this.unpin(), this.resetResizeTimer && clearTimeout(this.resetResizeTimer), this.resetResizeTimer = setTimeout(() => {
      this._isResizing = !1, clearTimeout(this.resetResizeTimer), this.resetResizeTimer = null;
    }, 500);
  }
  update() {
    this.redraw();
  }
  checkSize(t) {
    this.currentScrollY > this.opts.offsetSmall ? t ? this.small() : this._small || this.small() : t ? this.notSmall() : this._small && this.notSmall();
  }
  checkBg(t) {
    this.currentScrollY > this.opts.offsetBg ? t ? this.altBg() : !this._altBg && !this._hiding && this.altBg() : t ? this.notAltBg() : this._altBg && this.notAltBg();
  }
  checkTop(t) {
    this.currentScrollY <= this.opts.offset ? t ? this.top() : this._top || this.top() : t ? this.notTop() : this._top && this.notTop();
  }
  checkBot(t) {
    this.currentScrollY + this.getViewportHeight() >= this.getScrollerHeight() ? t ? this.bottom() : this._bottom || this.bottom() : t ? this.notBottom() : this._bottom && this.notBottom();
  }
  checkPin(t, e) {
    if (this.shouldUnpin(e)) {
      if (this.mobileMenuOpen)
        return;
      t ? this.unpin() : this._pinned && this.unpin();
    } else this.shouldPin(e) && (t ? this.pin() : this._pinned || this.pin());
  }
  redraw() {
    this.currentScrollY = this.getScrollY(), this.currentScrollHeight = document.body.scrollHeight;
    const t = this.toleranceExceeded();
    if (!this.isOutOfBounds()) {
      if (this.currentScrollHeight !== this.lastKnownScrollHeight && !this._firstLoad) {
        this.lastKnownScrollY = this.currentScrollY, this.lastKnownScrollHeight = this.currentScrollHeight;
        return;
      }
      this.checkSize(!1), this.checkBg(!1), this.checkTop(!1), this.checkBot(!1), this.mainOpts.ignoreForcedScroll && this.app.state.forcedScroll || this.checkPin(!1, t), this.lastKnownScrollY = this.currentScrollY, this.lastKnownScrollHeight = this.currentScrollHeight, this._firstLoad = !1;
    }
  }
  notTop() {
    this._top = !1, this.el.removeAttribute("data-header-top"), this.el.setAttribute("data-header-not-top", ""), this.opts.onNotTop(this);
  }
  top() {
    this._top = !0, this.el.setAttribute("data-header-top", ""), this.el.removeAttribute("data-header-not-top"), this.opts.onTop(this);
  }
  notBottom() {
    this._bottom = !1, this.el.setAttribute("data-header-not-bottom", ""), this.el.removeAttribute("data-header-bottom"), this.opts.onNotBottom(this);
  }
  bottom() {
    this._bottom = !0, this.el.setAttribute("data-header-bottom", ""), this.el.removeAttribute("data-header-not-bottom"), this.opts.onBottom(this);
  }
  unpin() {
    this.preventUnpin || (this._pinned = !1, this.el.setAttribute("data-header-unpinned", ""), this.el.removeAttribute("data-header-pinned"), this.opts.onUnpin(this));
  }
  pin() {
    this.preventPin || (this._pinned = !0, this.el.setAttribute("data-header-pinned", ""), this.el.removeAttribute("data-header-unpinned"), this.opts.onPin(this));
  }
  notSmall() {
    this._small = !1, this.el.setAttribute("data-header-big", ""), this.el.removeAttribute("data-header-small"), this.opts.onNotSmall(this);
  }
  small() {
    this._small = !0, this.el.setAttribute("data-header-small", ""), this.el.removeAttribute("data-header-big"), this.opts.onSmall(this);
  }
  notAltBg() {
    this._altBg = !1, this.el.setAttribute("data-header-reg-bg", ""), this.el.removeAttribute("data-header-alt-bg"), this.opts.onNotAltBg(this);
  }
  altBg() {
    this._altBg = !0, this.el.setAttribute("data-header-alt-bg", ""), this.el.removeAttribute("data-header-reg-bg"), this.opts.onAltBg(this);
  }
  shouldUnpin(t) {
    const e = this.currentScrollY > this.lastKnownScrollY, s = this.currentScrollY >= this.opts.offset;
    return e && s && t;
  }
  shouldPin(t) {
    if (this._isResizing)
      return !1;
    const e = this.currentScrollY < this.lastKnownScrollY, s = this.currentScrollY <= this.opts.offset;
    return e && t || s;
  }
  isOutOfBounds() {
    const t = this.currentScrollY < 0, e = this.currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
    return t || e;
  }
  getScrollerPhysicalHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.opts.canvas);
  }
  getScrollerHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body ? this.getDocumentHeight() : this.getElementHeight(this.opts.canvas);
  }
  getDocumentHeight() {
    const { body: t } = document, { documentElement: e } = document;
    return Math.max(
      t.scrollHeight,
      e.scrollHeight,
      t.offsetHeight,
      e.offsetHeight,
      t.clientHeight,
      e.clientHeight
    );
  }
  getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  getElementHeight(t) {
    return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight);
  }
  getElementPhysicalHeight(t) {
    return Math.max(t.offsetHeight, t.clientHeight);
  }
  getScrollY() {
    return this.opts.canvas.pageYOffset !== void 0 ? this.opts.canvas.pageYOffset : this.opts.canvas.scrollTop !== void 0 ? this.opts.canvas.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  toleranceExceeded() {
    return Math.abs(this.currentScrollY - this.lastKnownScrollY) >= this.opts.tolerance;
  }
  _getOptionsForSection(t, e) {
    if (!Object.prototype.hasOwnProperty.call(e, "sections") || !Object.prototype.hasOwnProperty.call(e.sections, t))
      return e.default;
    const s = e.sections[t];
    return e = V(s, wr, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      "APPLICATION:MOBILE_MENU:OPEN",
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      "APPLICATION:MOBILE_MENU:CLOSED",
      this._onMobileMenuClose.bind(this)
    );
  }
  _onMobileMenuOpen() {
    this.opts.onMobileMenuOpen(this), this.mobileMenuOpen = !0;
  }
  _onMobileMenuClose() {
    this.opts.onMobileMenuClose(this), this.mobileMenuOpen = !1;
  }
}
const Mc = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class su {
  constructor(t, e) {
    this.app = t, this.opts = V(e, Mc);
    const s = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    v(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (v(s, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      s.style.mozBoxShadow = o, s.style.webkitBoxShadow = o, s.style.boxShadow = o;
    }
  }
}
const _c = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class nu {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = V(e, _c), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const s = document.querySelector(this.opts.el);
        s && (this.elements.parent = s, s.querySelectorAll("[data-parallax-factor]").forEach((r) => this.setupParallaxElement(r)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(mt, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
  }
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(t) {
    const e = t.hasAttribute("data-parallax-factor") ? parseFloat(t.getAttribute("data-parallax-factor")) : this.opts.factor;
    let s = t.hasAttribute("data-parallax") ? this.opts.fadeContent : t.hasAttribute("data-parallax-fade");
    const n = t.hasAttribute("data-parallax-orientation") ? t.getAttribute("data-parallax-orientation") : this.opts.orientation;
    let r = null, o = null;
    if (t.hasAttribute("data-parallax")) {
      if (r = t.querySelector("[data-parallax-content]"), o = t.querySelector("[data-parallax-figure]"), this.opts.overflow || (t.style.overflow = "hidden"), o) {
        o.style.transform = `scale(${this.opts.scale})`, o.style.willChange = "transform", o.style.transformOrigin = "center";
        const a = window.getComputedStyle(o);
        a.backgroundImage && a.backgroundImage !== "none" && (a.backgroundSize !== "cover" && (o.style.backgroundSize = "cover"), a.backgroundPosition !== "center" && (o.style.backgroundPosition = "center"));
      }
      r && (r.style.willChange = s ? "transform, opacity" : "transform", r.style.zIndex = "1");
    } else
      t.style.willChange = s ? "transform, opacity" : "transform";
    this.parallaxElements.push({
      element: t,
      factor: e,
      fadeContent: s,
      orientation: n,
      content: r,
      figure: o,
      elementHeight: t.offsetHeight,
      elementWidth: t.offsetWidth,
      lastPosition: 0
    });
  }
  /**
   * Calculate the transform value based on scroll position
   * @param {Object} item - Parallax element data
   * @param {number} scrollPosition - Current scroll position
   * @returns {Object} Transform and opacity values
   */
  calculateTransform(t, e) {
    const { element: s, factor: n, fadeContent: r, orientation: o } = t, a = s.getBoundingClientRect(), h = this.app.size.height, d = h / 2, y = (a.top + a.height / 2 - d) / h * n * 100;
    let b = 1;
    if (r) {
      const T = a.top / h;
      T <= 0 ? b = Math.max(0, 1 + T * 1.5) : T >= 0.7 && (b = Math.max(0, 1 - (T - 0.7) * 3.33)), b = Math.max(0, Math.min(1, b));
    }
    let S = "";
    switch (o) {
      case "up":
        S = `translate3d(0, ${y}px, 0)`;
        break;
      case "down":
        S = `translate3d(0, ${-y}px, 0)`;
        break;
      case "left":
        S = `translate3d(${y}px, 0, 0)`;
        break;
      case "right":
        S = `translate3d(${-y}px, 0, 0)`;
        break;
      default:
        S = `translate3d(0, ${y}px, 0)`;
    }
    return { transform: S, opacity: b };
  }
  /**
   * Apply a smooth transition between current and target position
   * @param {Object} item - Parallax element data
   * @param {Object} target - Target transform and opacity values
   */
  applyTransform(t, e) {
    const { element: s, figure: n, content: r } = t;
    if (n) {
      let o = "scale(1.2)";
      const a = n.style.transform;
      if (a) {
        const h = a.match(/scale\([^)]+\)/);
        h && (o = h[0]);
      }
      n.style.transform = `${o} ${e.transform}`;
    }
    r && (r.style.transform = e.transform, r.style.opacity = e.opacity), !n && !r && (s.style.transform = e.transform, s.style.opacity = e.opacity);
  }
  /**
   * Handle scroll event to update parallax effect
   */
  onScroll() {
    if (!this.parallaxElements.length) return;
    const t = window.pageYOffset;
    this.parallaxElements.forEach((e) => {
      const s = e.element.getBoundingClientRect();
      if (s.bottom > -100 && s.top < this.app.size.height + 100) {
        const n = this.calculateTransform(e, t);
        this.applyTransform(e, n);
      }
    });
  }
  /**
   * Destroy the parallax instance and clean up
   */
  destroy() {
    window.removeEventListener(mt, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: s, content: n } = t;
      s && (s.style.transform = "", s.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !s && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
const Dc = {
  el: "[data-hero-slider]",
  /* time between slides */
  interval: 4.2,
  /* the slide number we start with */
  initialSlideNumber: 0,
  /* are the slider images lazyloaded? */
  lazyImages: !1,
  /* zIndexes for the slide mechanism */
  zIndex: {
    visible: 5,
    next: 4,
    regular: 3
  },
  transition: {
    /* how long the actual transition from slide to slide takes */
    duration: 0.8,
    /* the transition type. 'parallax' or 'fade' */
    type: "parallax",
    /* how much to scale when 'idle' */
    scale: 1.05
  },
  onTransition: (i) => {
    i.slide("parallax");
  },
  onInitialize: () => {
  },
  onFadeIn: (i, t) => {
    const e = i.slides[i._currentSlideIdx].querySelector(".hero-slide-img");
    g(i.el, { opacity: 1 }, { duration: 0.25 }), e && i.slides.length > 1 && g(
      e,
      { scale: [1, i.opts.transition.scale] },
      { type: "tween", duration: i.opts.interval, ease: "linear" }
    ).finished.then(t);
  }
};
class ru {
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Dc), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), v(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e, s) => {
      v(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: s === 0 ? 1 : 0
        // Only first slide visible initially
      });
      const n = e.querySelector(".hero-slide-img");
      n ? v(n, {
        width: document.body.clientWidth,
        height: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        transition: "none",
        transformOrigin: "center center",
        willChange: "transform",
        scale: 1
        // Initialize scale
      }) : console.error(
        "==> JUPITER/HEROSLIDER: MISSING .hero-slide-img INSIDE [data-hero-slide]"
      );
    }), this.slides[0].style.zIndex = this.opts.zIndex.visible, this.slides[1] && (this.slides[1].style.zIndex = this.opts.zIndex.next), this.opts.onInitialize(this);
    const t = this.slides.length > 1 ? this.next.bind(this) : () => {
    };
    this.app.registerCallback(Z, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && ae(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    ee() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    switch (t) {
      case "fade":
        {
          v(this._currentSlide, {
            opacity: 0,
            zIndex: this.opts.zIndex.visible
          }), v(this._nextSlide, { opacity: 0 });
          const e = this._previousSlide.querySelector(".hero-slide-img"), s = this._currentSlide.querySelector(".hero-slide-img");
          v(s, { scale: 1 });
          const r = (this.opts.transition.scale - 1) / this.opts.interval * this.opts.transition.duration, o = this.opts.transition.scale + r, a = [
            // Previous slide continues zooming during fade at same rate
            [
              e,
              { scale: [this.opts.transition.scale, o] },
              { type: "tween", duration: this.opts.transition.duration, ease: "linear", at: 0 }
            ],
            // Current slide fade-in (starts immediately)
            [
              this._currentSlide,
              { opacity: 1 },
              {
                type: "tween",
                duration: this.opts.transition.duration,
                ease: [0.45, 0, 0.55, 1],
                // sine.inOut bezier
                at: 0
              }
            ],
            // Current slide image zoom (starts immediately as it fades in)
            [
              s,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 }
            ]
          ];
          g(a).finished.then(() => {
            v(this._previousSlide, { opacity: 0 }), v(this._currentSlide, { opacity: 1 }), v(e, { scale: 1 }), this._nextSlide.style.zIndex = this.opts.zIndex.visible, this._currentSlide.style.zIndex = this.opts.zIndex.regular, this._previousSlide.style.zIndex = this.opts.zIndex.regular, this.next();
          });
        }
        break;
      case "parallax":
        {
          v(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            width: "100%",
            opacity: 1
            // Make sure it's visible underneath
          }), v(this._previousSlide, { overflow: "hidden" });
          const e = this._previousSlide.querySelector(".hero-slide-img"), s = this._currentSlide.querySelector(".hero-slide-img");
          v(s, { scale: 1 });
          const r = (this.opts.transition.scale - 1) / this.opts.interval * this.opts.transition.duration, o = this.opts.transition.scale + r, a = [
            // Previous slide continues zooming during collapse at same rate
            [
              e,
              { scale: [this.opts.transition.scale, o] },
              { type: "tween", duration: this.opts.transition.duration, ease: "linear", at: 0 }
            ],
            // Previous slide width collapse (starts immediately)
            [
              this._previousSlide,
              { width: 0 },
              {
                type: "tween",
                duration: this.opts.transition.duration,
                ease: [0.895, 0.03, 0.685, 0.22],
                // power3.in bezier
                at: 0
              }
            ],
            // Current slide image zoom (starts immediately as it's revealed)
            [
              s,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 }
            ]
          ];
          g(a).finished.then(() => {
            v(this._nextSlide, { zIndex: this.opts.zIndex.next, opacity: 1 }), v(this._currentSlide, {
              zIndex: this.opts.zIndex.visible,
              width: "100%",
              opacity: 1
            }), v(this._previousSlide, {
              zIndex: this.opts.zIndex.regular,
              width: "100%",
              opacity: 0
              // Hide previous slide
            }), v(e, { scale: 1 }), this.next();
          });
        }
        break;
      default:
        console.error(
          "==> JUPITER/HEROSLIDER: Unrecognized `opts.transition.type` option."
        );
    }
  }
  /**
   * Add a window resize handler that resizes slide widths
   */
  _addResizeHandler() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._resizeSlides(), window.addEventListener(
        it,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        it,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    this.resizeAnimation && this.resizeAnimation.stop(), this.resizeAnimation = g(
      this.images,
      { width: document.body.clientWidth },
      { duration: 0.15 }
    );
  }
}
const zc = {
  el: "[data-hero-video]",
  onFadeIn: (i) => {
    jt(i.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (i) => {
    jt(i.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (i) => {
    jt(i.cover, 0, { duration: 0.35 });
  },
  onPlayReady: () => {
  },
  onClickPlay: () => {
  },
  onClickPause: () => {
  },
  /**
   * Where to attach the pause button
   */
  pauseParent: ".hero-content",
  elements: {
    pause: () => `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 350 350"><circle cx="175" cy="175" r="172.5" stroke="#000" stroke-width="10"/><path stroke="#000" stroke-width="10" d="M227.5 100v150M127.5 100v150"/></svg>
    `,
    play: () => `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 350 350"><circle cx="175" cy="175" r="172.5" stroke="#000" stroke-width="10"/><path stroke="#000" stroke-width="10" d="M240 174l-112-72v148l112-76z"/></svg>
    `
  }
};
class ou {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = V(e, zc), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), v(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = A.find(this.el, "[data-cover]"), this.cover && jt(this.cover, 0, { duration: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), v(this.videoDiv, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0
    }), !this.video) {
      console.error(
        "==> JUPITER/HEROVIDEO: MISSING <video> INSIDE [data-hero-video-content]"
      );
      return;
    }
    this.video.muted = !0, v(this.video, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0
    }), this.cover && ae(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(ie, () => {
      !this.video.playing && !ee() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
    });
  }
  setSrc() {
    const t = this.video.getAttribute("data-src");
    if (!t)
      return;
    const e = JSON.parse(t);
    this.app.breakpoints.mediaQueries.iphone.matches || this.app.breakpoints.mediaQueries.mobile.matches ? this.video.setAttribute("src", e.phone) : this.video.setAttribute("src", e.desktop);
  }
  addEvents() {
    this.video.addEventListener("canplay", () => {
      this.playing || (ee() ? v(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
    }), this.elements.pause && this.elements.pause.addEventListener("click", (t) => {
      t.preventDefault(), t.stopPropagation(), this.playing ? (this.opts.onClickPause(this), this.pause(), this.forcePaused = !0, this.elements.pause.innerHTML = this.opts.elements.play()) : (this.opts.onClickPlay(this), this.play(), this.forcePaused = !1, this.elements.pause.innerHTML = this.opts.elements.pause());
    });
  }
  play() {
    this.cover && this.opts.onFadeOutCover(this), this.video.play(), this.playing = !0;
  }
  pause() {
    this.video.pause(), this.playing = !1;
  }
  fadeIn() {
    this.opts.onFadeIn(this);
  }
  fadeInCover() {
    this.opts.onFadeInCover(this);
  }
  addObserver() {
    new IntersectionObserver((e) => {
      const [{ isIntersecting: s }] = e;
      if (s) {
        if (this.forcePaused)
          return;
        !this.booting && !this.playing && this.play();
      } else this.playing && this.pause();
    }).observe(this.el);
  }
  /**
   * Add a window resize handler that resizes video width
   */
  _addResizeHandler() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._resize(), window.addEventListener(
        it,
        this._resize.bind(this)
      )) : window.removeEventListener(
        it,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
  }
}
function ei(i, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), i.dispatchEvent(e);
}
const Rc = {
  revealIntersectionObserverConfig: {
    rootMargin: "0px 100px 0px 100px",
    threshold: 0
  },
  loadIntersectionObserverConfig: {
    rootMargin: "850px 500px 850px 500px",
    threshold: 0
  },
  useNativeLazyloadIfAvailable: !0,
  mode: "default",
  minSize: 40,
  updateSizes: !0,
  registerCallback: !0,
  target: null
};
class au {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Rc), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((s) => {
      s.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Z, () => {
      this.watch();
    }));
  }
  watch() {
    this.initObserver(this.revealObserver, !1);
  }
  initialize() {
    if (this.initializeResizeObserver(), this.initializeSections(), "loading" in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      this.target.querySelectorAll("[data-ll-image]").forEach((s) => {
        s.setAttribute("loading", "lazy"), this.swapImage(s);
      }), this.target.querySelectorAll("[data-ll-srcset]").forEach((s) => {
        s.querySelectorAll("img").forEach((n) => n.setAttribute("loading", "lazy")), this.swapPicture(s);
      });
      return;
    }
    this.lazyPictures = this.target.querySelectorAll("[data-ll-srcset]"), this.loadObserver = new IntersectionObserver(
      this.handleLoadEntries.bind(this),
      this.opts.loadIntersectionObserverConfig
    ), this.revealObserver = new IntersectionObserver(
      this.handleRevealEntries.bind(this),
      this.opts.revealIntersectionObserverConfig
    ), this.initObserver(this.loadObserver), this.imageObserver = new IntersectionObserver(
      this.lazyloadImages.bind(this),
      this.opts.intersectionObserverConfig
    ), this.lazyImages = this.target.querySelectorAll("[data-ll-image]"), this.lazyImages.forEach((t, e) => {
      t.setAttribute("data-ll-blurred", ""), t.setAttribute("data-ll-idx", e), t.style.setProperty("--ll-idx", e), this.imageObserver.observe(t);
    });
  }
  initObserver(t, e = !0) {
    this.lazyPictures.forEach((s, n) => {
      e && (s.setAttribute("data-ll-srcset-initialized", ""), s.querySelectorAll("img:not([data-ll-loaded])").forEach((r) => {
        r.setAttribute("data-ll-blurred", ""), r.setAttribute("data-ll-idx", n), r.style.setProperty("--ll-idx", n);
      })), t.observe(s);
    });
  }
  forceLoad(t = document.body) {
    A.all(t, "[data-ll-image]").forEach((n) => this.swapImage(n)), A.all(t, "[data-ll-srcset]").forEach((n) => this.revealPicture(n));
  }
  initializeResizeObserver() {
    if (!this.opts.updateSizes)
      return;
    this.sizeObserver = new ResizeObserver((s) => {
      s.forEach((n) => {
        var d, u;
        const r = n.target;
        let o = ((u = (d = n.borderBoxSize) == null ? void 0 : d[0]) == null ? void 0 : u.inlineSize) || n.contentRect.width;
        o = Math.round(o), o < this.opts.minSize && (o = this.opts.minSize);
        const a = r.getAttribute("sizes"), h = `${o}px`;
        a !== h && (this.resizePending.set(r, o), this.rafId || (this.rafId = requestAnimationFrame(() => {
          this.flushSizeUpdates();
        })));
      });
    });
    const t = A.all(this.target, '[data-sizes="auto"]');
    new Set(t).forEach((s) => {
      this.sizeObserver.observe(s);
    });
  }
  flushSizeUpdates() {
    this.resizePending.forEach((t, e) => {
      const s = e.getAttribute("sizes"), n = `${Math.round(t)}px`;
      s !== n && (e.setAttribute("sizes", n), e.parentNode && Array.from(A.all(e.parentNode, "source")).forEach((r) => {
        r.getAttribute("sizes") !== n && r.setAttribute("sizes", n);
      }));
    }), this.resizePending.clear(), this.rafId = null;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (s, n) => {
        const r = A.all(s, "img");
        return new IntersectionObserver((o, a) => {
          o.forEach((h) => {
            (h.isIntersecting || h.intersectionRatio > 0) && (Yi(r, !0).then(() => {
              ei(s, br);
            }), n.forEach((d) => {
              this.loadPicture(d), this.loadObserver.unobserve(d);
            }), a.unobserve(s));
          });
        }, this.opts.intersectionObserverConfig);
      };
      t.forEach((s) => {
        const n = s.querySelectorAll("picture");
        e(s, n).observe(s);
      });
    }
  }
  // we load the picture a ways before it enters the viewport
  handleLoadEntries(t) {
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const s = e.target;
        this.loadPicture(s), this.loadObserver.unobserve(e.target);
      }
    });
  }
  // we reveal the picture when it enters the viewport
  handleRevealEntries(t) {
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const s = e.target;
        e.target.hasAttribute("data-ll-srcset-ready") ? (this.revealPicture(s), this.revealObserver.unobserve(e.target)) : this.srcsetReadyObserver.observe(s, { attributes: !0 });
      }
    });
  }
  loadPicture(t) {
    const e = t.querySelectorAll("source");
    let s = !1;
    for (let o = 0; o < e.length; o += 1) {
      const a = e[o];
      a.hasAttribute("data-ll-ready") || (s = !0), a.hasAttribute("data-srcset") && (a.setAttribute("srcset", a.dataset.srcset), a.setAttribute("data-ll-ready", ""));
    }
    if (!s && e.length > 0)
      return;
    const n = t.querySelector("img"), r = () => {
      n.removeAttribute("data-ll-placeholder"), n.removeAttribute("data-ll-blurred"), n.removeAttribute("data-ll-loading"), n.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), ei(n, Ki);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), ei(e, yr));
  }
  lazyloadImages(t) {
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const s = e.target;
        this.swapImage(s), this.imageObserver.unobserve(s);
      }
    });
  }
  swapImage(t) {
    t.src = t.dataset.src, t.setAttribute("data-ll-loaded", "");
  }
}
const Vc = {
  /* enable captions */
  captions: !1,
  /* enable index numbers */
  numbers: !1,
  /* set to a selector if you want a specific trigger element to open the box */
  trigger: !1,
  elements: {
    arrowRight: () => {
      const i = document.createElement("span");
      return i.classList.add("arrow-r"), i.appendChild(document.createTextNode("→")), i;
    },
    arrowLeft: () => {
      const i = document.createElement("span");
      return i.classList.add("arrow-l"), i.appendChild(document.createTextNode("←")), i;
    },
    close: () => document.createTextNode("×"),
    dot: () => document.createTextNode("▪")
  },
  onClick: (i, t, e) => {
    e.stopPropagation(), e.preventDefault(), i.pointerDirection === "left" ? i.setImg(t, i.getPrevIdx(t)) : i.setImg(t, i.getNextIdx(t));
  },
  onPointerLeft: () => {
  },
  onPointerRight: () => {
  },
  onCaptionOut: (i, t) => {
    t && i.timelines.caption.to(i.elements.caption, {
      duration: 0.4,
      autoAlpha: 0
    });
  },
  onCaptionIn: (i, t) => {
    t && i.timelines.caption.to(i.elements.caption, {
      duration: 0.4,
      autoAlpha: 1
    });
  },
  onImageOut: (i) => {
    i.timelines.image.to(i.currentImage, {
      duration: 0.5,
      autoAlpha: 0
    });
  },
  onImageIn: (i) => {
    const t = i.firstTransition ? 0.6 : 0.4;
    i.timelines.image.to(i.nextImage, {
      duration: 0.5,
      autoAlpha: 1,
      delay: t
    });
  },
  onNumbers: (i, t) => {
    i.elements.numbers.innerHTML = `${i.currentIndex + 1}/${t.length}`;
  },
  onBeforeOpen: () => {
  },
  onOpen: (i) => {
    i.app.scrollLock(), g(i.elements.wrapper, { opacity: 1 }, { duration: 0.5 });
  },
  onAfterClose: () => {
  },
  onClose: (i) => {
    i.opts.captions && g(i.elements.caption, { opacity: 0 }, { duration: 0.45 }), g(
      [
        i.elements.imgWrapper,
        i.elements.nextArrow,
        i.elements.prevArrow,
        i.elements.close,
        i.elements.dots
      ],
      { opacity: 0 },
      { duration: 0.5 }
    ).finished.then(() => {
      g(i.elements.wrapper, { opacity: 0 }, { duration: 0.45 }).finished.then(() => {
        i.app.scrollRelease(), i.destroy();
      });
    });
  }
};
class lu {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Vc), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: new tn(),
      image: new tn()
    }, this.lightboxes.forEach((s) => {
      const n = s.getAttribute("data-lightbox"), r = s.getAttribute("data-srcset"), a = s.querySelector("img").getAttribute("alt"), h = s.getAttribute("data-lightbox-section") || "general";
      let d = s;
      this.opts.trigger && (d = A.find(s, this.opts.trigger) || s), Object.prototype.hasOwnProperty.call(this.sections, h) || (this.sections[h] = []);
      const u = {
        href: n,
        alt: a,
        srcset: r
      }, f = this.sections[h].push(u) - 1;
      d.addEventListener("click", (m) => {
        m.preventDefault(), this.showBox(h, f);
      });
    });
  }
  showBox(t, e) {
    this.opts.onBeforeOpen(this), this.buildBox(t, e);
  }
  buildBox(t, e) {
    this.elements.wrapper = document.createElement("div"), this.elements.content = document.createElement("div"), this.elements.imgWrapper = document.createElement("div"), this.elements.dots = document.createElement("div"), this.elements.numbers = document.createElement("div"), this.elements.nextArrow = document.createElement("a"), this.elements.prevArrow = document.createElement("a"), this.elements.close = document.createElement("a"), this.elements.content.setAttribute("data-current-idx", e), this.elements.content.classList.add("lightbox-content"), this.elements.nextArrow.classList.add("lightbox-next"), this.elements.prevArrow.classList.add("lightbox-prev"), this.elements.close.classList.add("lightbox-close"), this.elements.dots.classList.add("lightbox-dots"), this.elements.numbers.classList.add("lightbox-numbers"), this.elements.wrapper.classList.add("lightbox-backdrop"), this.elements.wrapper.setAttribute("data-lightbox-wrapper-section", t), this.elements.imgWrapper.classList.add("lightbox-image-wrapper"), this.elements.close.appendChild(this.opts.elements.close()), this.elements.close.href = "#", this.elements.nextArrow.appendChild(this.opts.elements.arrowRight()), this.elements.nextArrow.href = "#", this.elements.nextArrow.addEventListener("click", (n) => {
      n.stopPropagation(), n.preventDefault(), this.setImg(t, this.getNextIdx(t));
    }), this.elements.prevArrow.addEventListener("click", (n) => {
      n.stopPropagation(), n.preventDefault(), this.setImg(t, this.getPrevIdx(t));
    }), this.keyUpCallback = (n) => {
      this.onKeyup(n, t);
    }, document.removeEventListener("keyup", this.keyUpCallback), document.addEventListener("keyup", this.keyUpCallback), this.elements.wrapper.addEventListener("mousemove", (n) => {
      this.onMouseMove(n);
    }), this.elements.wrapper.addEventListener("click", (n) => {
      this.onClick(n, t);
    }), this.elements.prevArrow.appendChild(this.opts.elements.arrowLeft()), this.elements.prevArrow.href = "#";
    let s;
    this.sections[t].forEach((n, r) => {
      const o = document.createElement("img");
      v(o, { opacity: 0 }), o.style.visibility = "hidden", o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", r), r === e && (a.classList.add("active"), s = a), a.addEventListener("click", (h) => {
        a.classList.add("active"), s.classList.remove("active"), s = a, h.stopPropagation(), h.preventDefault(), this.setImg(t, r, null);
      }), a.appendChild(this.opts.elements.dot()), this.elements.dots.appendChild(a);
    }), this.elements.content.appendChild(this.elements.close), this.elements.content.appendChild(this.elements.imgWrapper), this.elements.content.appendChild(this.elements.nextArrow), this.elements.content.appendChild(this.elements.prevArrow), this.elements.content.appendChild(this.elements.dots), this.opts.numbers && this.elements.content.appendChild(this.elements.numbers), this.opts.captions && (this.elements.caption = document.createElement("div"), this.elements.caption.classList.add("lightbox-caption"), this.elements.content.appendChild(this.elements.caption)), this.elements.wrapper.appendChild(this.elements.content), document.body.appendChild(this.elements.wrapper), this.setImg(t, e, this.getPrevIdx(t)), this.opts.onOpen(this), this.elements.close.addEventListener("click", (n) => {
      n.preventDefault(), n.stopPropagation(), this.close();
    });
  }
  close() {
    document.removeEventListener("keyup", this.keyUpCallback), this.opts.onClose(this), this.opts.onAfterClose(this), this.currentIndex = null, this.currentImage = null, this.firstTransition = !0, this.imgs = [];
  }
  destroy() {
    this.elements.wrapper.parentNode.removeChild(this.elements.wrapper);
  }
  setImg(t, e) {
    let s = !1;
    this.currentIndex = e, this.elements.content.setAttribute("data-current-idx", e);
    let n = document.querySelector(".lightbox-dots a.active");
    n && n.classList.remove("active"), n = document.querySelector(`.lightbox-dots a[data-idx="${e}"]`), n.classList.add("active"), this.elements.caption && (s = this.previousCaption !== this.sections[t][e].alt, this.previousCaption = this.sections[t][e].alt, this.opts.onCaptionOut(this, s), this.timelines.caption.call(() => {
      this.elements.caption.innerHTML = this.sections[t][e].alt;
    })), this.elements.numbers && this.opts.onNumbers(this, this.sections[t]), this.currentImage && this.opts.onImageOut(this);
    for (let r = 0; r < 3 && this.imgs[e + r]; r += 1)
      this.imgs[e + r].src = this.sections[t][e + r].href, this.sections[t][e + r].srcset && this.imgs[e + r].setAttribute(
        "srcset",
        this.sections[t][e + r].srcset
      );
    this.nextImage = this.imgs[e], this.nextImage.src = this.sections[t][e].href, this.sections[t][e].srcset && this.nextImage.setAttribute(
      "srcset",
      this.sections[t][e].srcset
    ), this.opts.onImageIn(this), this.timelines.image.call(() => {
      this.firstTransition && (this.firstTransition = !1);
    }), this.elements.caption && this.opts.onCaptionIn(this, s), ae(this.nextImage).then(() => {
      this.timelines.caption.play(), this.timelines.image.play();
    }), this.currentImage = this.nextImage;
  }
  getNextIdx(t) {
    const e = this.currentIndex;
    return e === this.sections[t].length - 1 ? 0 : e + 1;
  }
  getPrevIdx(t) {
    const e = this.currentIndex;
    return e === 0 ? this.sections[t].length - 1 : e - 1;
  }
  onClick(t, e) {
    this.opts.onClick(this, e, t);
  }
  onKeyup(t, e) {
    switch (t.keyCode || t.which) {
      case 27:
        this.close();
        break;
      case 37:
        this.setImg(e, this.getPrevIdx(e));
        break;
      case 39:
        this.setImg(e, this.getNextIdx(e));
        break;
    }
  }
  onMouseMove(t) {
    if (t.clientX < this.app.size.width / 2) {
      if (this.pointerDirection === "left")
        return;
      this.pointerDirection = "left", this.opts.onPointerLeft(this);
    } else {
      if (this.pointerDirection === "right")
        return;
      this.pointerDirection = "right", this.opts.onPointerRight(this);
    }
  }
}
const Fc = {
  triggerEvents: !0,
  scrollDuration: 0.8,
  scrollOffsetNav: !1,
  mobileMenuDelay: 800,
  openExternalInWindow: !0,
  linkQuery: 'a:not([href^="#"]):not([target="_blank"]):not([data-lightbox]):not(.noanim)',
  anchorQuery: 'a[href^="#"]:not(.noanim)',
  onAnchor: (i, t) => {
    if (t.opts.scrollOffsetNav) {
      const e = document.querySelector("header[data-nav]"), s = e ? e.clientHeight : 0;
      i = { y: i, offsetY: s };
    }
    t.app.scrollTo(i, t.opts.scrollDuration, t.opts.triggerEvents);
  },
  onTransition: (i, t) => {
    const e = document.querySelector("main"), s = document.querySelector("header[data-nav]"), n = document.querySelector("footer"), r = document.querySelector("#fader");
    r ? (v(r, { display: "block", opacity: 0 }), e && (g(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), g(e, { opacity: 0 }, { duration: 0.2 })), s && g(s, { opacity: 0 }, { duration: 0.2 }), n && g(n, { opacity: 0 }, { duration: 0.2 }), g(r, { opacity: 1 }, { duration: 0.2 }).finished.then(() => {
      window.location = i;
    })) : (e && (g(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), g(e, { opacity: 0 }, { duration: 0.2 })), s && g(s, { opacity: 0 }, { duration: 0.2 }), n && g(n, { opacity: 0 }, { duration: 0.2 }), g(e, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
      window.location = i;
    }));
  }
};
class hu {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Fc);
    const s = document.querySelectorAll(this.opts.linkQuery), n = document.querySelectorAll(this.opts.anchorQuery);
    this.bindHeroLink(), this.bindAnchors(n), this.bindLinks(s);
  }
  bindHeroLink() {
    const t = document.querySelector("[data-link-to-content]");
    t && t.addEventListener("click", (e) => {
      const s = document.querySelector("main");
      e.preventDefault(), s && this.opts.onAnchor(s, this);
    });
  }
  bindAnchors(t) {
    let e = !1;
    Array.from(t).forEach((s) => {
      s.addEventListener("click", (n) => {
        n.preventDefault();
        const r = s.getAttribute("href");
        if (r === "#")
          return;
        document.body.classList.contains("open-menu") && (this.app.mobileMenu.toggleMenuClosed(), e = !0);
        const o = () => {
          const a = r, h = document.querySelector(a);
          if (n.preventDefault(), h) {
            if (this.opts.onAnchor(h, this), h.hasAttribute("data-skip-history") || history.pushState({}, "", r), !this.app.header || h.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
              return;
            setTimeout(() => {
              this.app.header.unpin();
            }, 800);
          }
        };
        e ? setTimeout(o, this.opts.mobileMenuDelay) : o();
      });
    });
  }
  bindLinks(t) {
    const e = document.querySelector(".loading-container");
    Array.from(t).forEach((s) => {
      const n = s.getAttribute("href");
      if (!n || n === "#" || n.startsWith("javascript:"))
        return;
      const r = this.normalizeHostname(document.location.hostname);
      let o, a;
      try {
        a = new URL(n, document.location.href), o = a.hostname;
      } catch (u) {
        console.warn(`Failed to parse URL for href "${n}":`, u), o = "";
      }
      const d = this.normalizeHostname(o) === r;
      this.opts.openExternalInWindow && !d && s.setAttribute("target", "_blank"), s.addEventListener("click", (u) => {
        if (!(u.shiftKey || u.metaKey || u.ctrlKey) && (e && (e.style.display = "none"), d && a)) {
          const f = new URL(window.location.href), m = a.pathname === f.pathname && a.search === f.search;
          if (m && a.hash) {
            u.preventDefault();
            const y = a.hash, b = document.querySelector(y);
            b && (this.opts.onAnchor(b, this), history.pushState({}, "", n));
          } else m && !a.hash && !f.hash ? u.preventDefault() : (u.preventDefault(), this.opts.onTransition(n, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const $c = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (i) => {
    g(i, { opacity: 1 }, { ease: "linear" });
  }
};
class cu {
  constructor(t, e, s) {
    this.opts = V(s, $c), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = A.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = A.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = A.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    v(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.fillText(), this.setHeight();
    const e = this.elements.$holder.offsetWidth, s = A.all(this.elements.$el, "[data-marquee-holder]"), n = e * s.length;
    this.duration = Math.min(
      (e + n) / this.opts.speed,
      40
    ), v(this.elements.$marquee, { width: n }), this.initializeTween(), A.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = A.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => et(e, "all"));
  }
  killTweens() {
    this.timeline && (this.timeline.stop(), this.timeline = null), this.speedAnimation && (this.speedAnimation.stop(), this.speedAnimation = null);
  }
  initializeTween() {
    const t = A.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, s) => {
      v(e, {
        position: "absolute",
        left: e.offsetWidth * s,
        transform: "translateZ(0)",
        willChange: "transform"
      });
    }), this.timeline = g(
      t,
      { transform: ["translateX(0) translateZ(0)", "translateX(-100%) translateZ(0)"] },
      { duration: this.duration, ease: "linear", repeat: 1 / 0 }
    ), this.timeline.pause(), this.opts.startProgress > 0 && (this.timeline.currentTime = this.opts.startProgress * this.duration), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    if (this.playing = !0, this.speedAnimation && this.speedAnimation.stop(), t) {
      this.timeline.play();
      const e = { speed: this.timeline.speed || 0 };
      this.speedAnimation = g(
        e,
        { speed: 1 },
        {
          duration: 0.8,
          ease: "easeIn",
          onUpdate: () => {
            this.timeline.speed = e.speed;
          }
        }
      );
    } else
      this.timeline.speed = 1, this.timeline.play();
  }
  pause() {
    this.playing = !1;
    const t = { speed: this.timeline.speed || 1 };
    this.speedAnimation = g(
      t,
      { speed: 0.01 },
      {
        duration: 0.8,
        onUpdate: () => {
          this.timeline.speed = t.speed;
        }
      }
    ), this.speedAnimation.finished.then(() => {
      this.playing || this.timeline.pause();
    });
  }
  slowDown() {
    this.speedAnimation && this.speedAnimation.stop();
    const t = { speed: this.timeline.speed || 1 };
    this.speedAnimation = g(
      t,
      { speed: 0.5 },
      {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        // ease-out
        onUpdate: () => {
          this.timeline.speed = t.speed;
        }
      }
    );
  }
  speedUp() {
    this.speedAnimation && this.speedAnimation.stop();
    const t = { speed: this.timeline.speed || 0.5 };
    this.speedAnimation = g(
      t,
      { speed: 1 },
      {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        // ease-out
        onUpdate: () => {
          this.timeline.speed = t.speed;
        }
      }
    );
  }
  setupObserver() {
    this.observer = new IntersectionObserver(
      (t) => {
        t.forEach((e) => {
          const { isIntersecting: s } = e;
          s && !this.playing ? this.play() : !s && this.playing && this.pause();
        });
      },
      {
        root: null,
        threshold: 0
      }
    ), this.observer.observe(this.elements.$el);
  }
  fillText() {
    et(this.elements.$el, "height"), et(this.elements.$marquee, "height"), this.elements.$marquee.innerHTML = "", this.elements.$marquee.appendChild(this.elements.$holder), this.elements.$holder.innerHTML = "", this.elements.$holder.appendChild(this.elements.$item), this.measuredHeight = this.elements.$item.offsetHeight;
    const t = this.elements.$item.offsetWidth;
    if (t) {
      this.opts.spacer && this.elements.$holder.appendChild(A.new(this.opts.spacer)[0]);
      const e = Math.max(Math.ceil(this.app.size.width / t) - 1, 2);
      for (let s = 0; s < e; s += 1)
        this.elements.$holder.append(this.elements.$item.cloneNode(!0)), this.opts.spacer && this.elements.$holder.appendChild(A.new(this.opts.spacer)[0]);
      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(!0));
    } else
      console.error(
        "no textWidth! probably image? Set width to elements inside holder",
        this.elements.$item
      );
  }
  setHeight() {
    const t = this.measuredHeight + this.opts.extraHeight;
    v(this.elements.$el, { height: t }), v(this.elements.$marquee, { height: t });
  }
}
const Nc = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: async (i) => {
    i.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), v(i.bg, { x: "0%", opacity: 0, height: window.innerHeight });
    const t = [
      [i.bg, { opacity: 1 }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [i.logo, { opacity: 0 }, { duration: 0.35, ease: "easeOut", at: 0 }],
      [i.header, { backgroundColor: "transparent" }, { duration: 0.55, ease: "easeOut", at: 0 }]
    ];
    await g(t).finished, i.nav.style.gridTemplateRows = "auto 1fr", v(i.nav, { height: window.innerHeight }), Array.from(i.content).forEach((n) => v(n, { display: "block" })), Array.from(i.logoPath).forEach((n) => n.setAttribute("fill", i.opts.logoColor)), v(i.logo, { x: "3%" });
    const e = g(
      i.lis,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 1, ease: "easeOut", delay: ht(0.05) }
    ), s = g(
      i.logo,
      { opacity: 1, x: ["3%", "0%"] },
      { duration: 0.55, ease: "easeInOut", at: 0.15 }
    );
    await Promise.all([e.finished, s.finished]), i._emitMobileMenuOpenEvent();
  },
  closeTween: async (i) => {
    document.body.classList.toggle("open-menu"), i.hamburger.classList.toggle("is-active"), await g(i.logo, { opacity: 0, x: "5%" }, { duration: 0.2, ease: "easeOut" }).finished, Array.from(i.logoPath).forEach((e) => e.removeAttribute("fill"));
    const t = g(
      i.lis,
      { opacity: 0, x: 20 },
      { duration: 0.5, ease: "easeOut", delay: ht(0.04) }
    );
    setTimeout(() => {
      g(i.bg, { x: "100%" }, { duration: 0.25, ease: "easeIn" });
    }, 200), await t.finished, et(i.nav, "height"), i._emitMobileMenuClosedEvent(), Array.from(i.content).forEach((e) => v(e, { display: "none" })), i.nav.style.gridTemplateRows = "auto", Array.from(i.lis).forEach((e) => et(e, "opacity")), await g(i.logo, { opacity: 1 }, { duration: 0.35, ease: "easeIn" }).finished;
  }
};
class uu {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Nc), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(it, () => {
      this.opts.onResize(this);
    });
  }
  toggleMenu() {
    document.body.classList.contains("open-menu") ? this.toggleMenuClosed() : this.toggleMenuOpen();
  }
  toggleMenuClosed() {
    this.opts.closeTween(this), this.open = !1;
  }
  toggleMenuOpen() {
    this.opts.openTween(this), this.open = !0;
  }
  _emitMobileMenuOpenEvent() {
    const t = new window.CustomEvent(
      Ui
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      Wi
    );
    window.dispatchEvent(t);
  }
}
const Hc = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Z,
  /**
   * Set a delay for the initial reveal. Could be useful if you want the reveal to happen
   * after for instance a header has been revealed
   */
  initialDelay: 0.1,
  /**
   * Clear out all `data-ll-srcset` from moonwalk elements
   */
  clearLazyload: !1,
  /**
   * Clear out all nested [data-moonwalk-section]s
   */
  clearNestedSections: !0,
  /**
   * Clear out all nested [data-moonwalk]s
   */
  clearNestedWalks: !0,
  /**
   * If page is linked with an anchor, remove moonwalk for the page
   */
  clearMoonwalkOnAnchors: !0,
  /**
   * If an element with moonwalk-run also has moonwalk-section, print a console warning
   */
  warnRunWithSection: !0,
  /**
   * Determines how early the IntersectionObserver triggers
   */
  rootMargin: "-10% 0%",
  /**
   * How much of the element must be visible before IO trigger
   */
  threshold: 0,
  /**
   * Create unique `id` prop for each moonwalk element
   */
  uniqueIds: !1,
  /**
   * Create indexes inside of each section per key
   */
  addIndexes: !1,
  runs: {},
  walks: {
    default: {
      /* How long to wait before firing timeline */
      startDelay: 0,
      /* How long between multiple entries in a moonwalk-section */
      interval: 0.15,
      /* How long each tween is */
      duration: 0.65,
      /* */
      alphaTween: !1,
      /* The transitions that will be tweened */
      transition: {
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        }
      }
    }
  }
};
class du {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, s = document.body) {
    this.app = t, this.opts = V(e, Hc), s !== document.body && (this.opts.on = () => {
    }), this.initialize(s);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), ee() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
  }
  /**
   * Add `moonwalk` class to html element to identify ourselves.
   */
  addClass() {
    document.documentElement.classList.add("moonwalk");
  }
  /**
   * Matching moonwalk elements before the element matching the hash should be set to visible
   * by setting the `data-moonwalked` attribute on `data-moonwalk` elements and
   * `data-moonwalk-section-ready` on `data-moonwalk-section` elements.
   */
  walkToThisPoint(t) {
    const e = document.querySelector(t);
    if (!e) return;
    document.querySelectorAll("[data-moonwalk]").forEach((r) => {
      (r.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || r === e) && (r.setAttribute("data-moonwalked", ""), r.classList.add("moonwalked"));
    }), document.querySelectorAll(
      "[data-moonwalk-section]"
    ).forEach((r) => {
      (r.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || r === e) && r.setAttribute("data-moonwalk-section-ready", "");
    });
  }
  /**
   * Remove all moonwalks. Useful for clients who prefer reduced motion
   */
  removeAllWalks(t = document.body) {
    [
      "data-moonwalk",
      "data-moonwalk-section",
      "data-moonwalk-children"
    ].forEach((s) => {
      const n = t.querySelectorAll(`[${s}]`);
      Array.from(n).forEach((r) => r.removeAttribute(s)), t.removeAttribute(s);
    });
  }
  removeFor(t = document.body, e) {
    [
      "data-moonwalk",
      "data-moonwalk-section",
      "data-moonwalk-children"
    ].forEach((n) => {
      const r = t.querySelectorAll(`${e}[${n}]`);
      Array.from(r).forEach((o) => o.removeAttribute(n));
    });
  }
  /**
   * Remove run matching name
   */
  removeRun(t = document.body, e) {
    const s = "data-moonwalk-run", n = t.querySelectorAll(`[${s}="${e}"]`);
    Array.from(n).forEach((r) => r.removeAttribute(s));
  }
  /**
   * Remove all runs
   */
  removeRuns(t = document.body) {
    const e = "data-moonwalk-run", s = t.querySelectorAll(`[${e}]`);
    Array.from(s).forEach((n) => n.removeAttribute(e));
  }
  /**
   * Add a random ID to each moonwalk element
   *
   * @param {*} section
   */
  addIds(t) {
    Array.from(t.querySelectorAll("[data-moonwalk]")).forEach((e) => {
      e.setAttribute(
        "data-moonwalk-id",
        Math.random().toString(36).substring(7)
      );
    });
  }
  /**
   * Add index to each moonwalk element in `section`
   *
   * @param {*} section
   */
  addIndexes(t) {
    Object.keys(this.opts.walks).forEach((e) => {
      const s = e === "default" ? '[data-moonwalk=""]' : `[data-moonwalk="${e}"]`, n = t.querySelectorAll(s);
      Array.from(n).forEach((r, o) => {
        r.setAttribute("data-moonwalk-idx", o + 1);
      });
    }, this);
  }
  /**
   * Go through each `data-moonwalk-run`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeRuns(t = document.body) {
    const e = t.querySelectorAll("[data-moonwalk-run]");
    return Array.from(e).map((s) => {
      const n = this.opts.runs[s.getAttribute("data-moonwalk-run")];
      return n ? (n.initialize && n.initialize(s), {
        el: s,
        threshold: n.threshold || 0,
        initialize: n.initialize,
        onReady: n.onReady,
        callback: n.callback,
        onExit: n.onExit,
        repeated: n.repeated,
        rootMargin: n.rootMargin
      }) : null;
    });
  }
  /**
   * Go through each `data-moonwalk-section`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeSections(t = document.body) {
    const e = t.querySelectorAll("[data-moonwalk-section]");
    return t !== document && !e.length && t.hasAttribute("data-moonwalk-section") ? [this.initializeSection(t)] : Array.from(e).map(
      (s) => this.initializeSection(s)
    );
  }
  initializeSection(t) {
    return this.parseChildren(t), this.opts.uniqueIds && this.addIds(t), this.opts.addIndexes && this.addIndexes(t), {
      id: Math.random().toString(36).substring(7),
      el: t,
      name: t.getAttribute("data-moonwalk-section") || null,
      animation: {
        lastDelay: 0,
        lastDuration: 0,
        lastStartTime: null
      },
      observer: null,
      stage: {
        name: t.getAttribute("data-moonwalk-stage") || null,
        running: !1,
        firstTween: !1
      },
      elements: []
    };
  }
  /**
   * Removes `data-moonwalk` from all elements who already have `data-ll-srcset´
   * Can be used if Moonwalking interferes with custom lazyloading animations
   */
  clearLazyloads(t = document.body) {
    const e = t.querySelectorAll(
      "[data-ll-srcset][data-moonwalk]"
    );
    Array.from(e).forEach(
      (s) => s.removeAttribute("data-moonwalk")
    );
  }
  /**
   * Look through section for `data-moonwalk-children` or
   * `data-moonwalk-children="{walkName}"`, then convert all children to
   * `data-moonwalk` or `data-moonwalk-{walkName}`
   *
   * @param {*} section
   */
  parseChildren(t) {
    const e = A.all(t, "[data-moonwalk-children]");
    Array.from(e).forEach((s) => {
      const n = s.getAttribute("data-moonwalk-children");
      this.setAttrs(s, n);
    });
  }
  /**
   * Sets all `element`s childrens `data-moonwalk` to `val`
   *
   * @param {*} element
   * @param {*} val
   */
  setAttrs(t, e) {
    const s = [];
    return Array.prototype.forEach.call(t.children, (n) => {
      n.setAttribute("data-moonwalk", e), s.push(n);
    }), s;
  }
  /**
   * If we have advanced sections, either named sections or section stages.
   * Resets the entry's `from` state, then creates an observer that will
   * watch this section.
   *
   * @param {*} section
   */
  setupNamesAndStages(t) {
    if (t.el.setAttribute("data-moonwalk-section-ready", ""), !t.stage.name && !t.name)
      return;
    const {
      opts: { walks: e }
    } = this;
    if (t.name) {
      const n = e[t.name];
      if (n.sectionTargets ? t.children = this.orderChildren(
        t.el.querySelectorAll(n.sectionTargets)
      ) : t.children = this.orderChildren(t.el.children), n.transition) {
        const r = n.alphaTween ? {
          ...n.transition.from,
          opacity: 0
        } : n.transition.from;
        t.name, t.children.length, v(t.children, r), t.children.length > 0 && (t.children[0], void 0);
      } else
        t.name, t.children.length;
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? (t.stage.name, n.transition.from, v(t.el, n.transition.from), t.el, void 0) : console.error(
        "==> JUPITER/MOONWALK: MISSING referenced moonwalk stage",
        t.stage.name
      );
    }
    this.sectionObserver(t).observe(t.el);
  }
  /**
   * Create and return an observer for `section`
   *
   * @param {*} section
   */
  sectionObserver(t) {
    const { opts: e } = this, { walks: s } = e;
    return new IntersectionObserver(
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o];
          if (a.isIntersecting) {
            if (t.stage.name && !t.stage.running) {
              const h = s[t.stage.name];
              g(a.target, h.transition.to, {
                duration: h.duration
              }), t.stage.firstTween = !0;
            }
            if (t.name) {
              const h = s[t.name];
              if (h || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), t.name, t.children.length, h.interval, h.duration, h.alphaTween, h.transition, !h.transition)
                t.name, t.children.forEach((d, u) => {
                  const f = (h.startDelay || 0) + u * h.interval;
                  ti(f, () => {
                    d.setAttribute("data-moonwalked", "");
                  });
                });
              else {
                typeof h.alphaTween == "object" ? h.alphaTween.duration = h.alphaTween.duration ? h.alphaTween.duration : h.duration : h.alphaTween === !0 && (h.alphaTween = {
                  duration: h.duration,
                  ease: "easeIn"
                });
                const { ease: d, ...u } = h.transition.to, f = Te(d || "easeOut"), m = {
                  duration: h.duration,
                  ease: f,
                  delay: ht(h.interval, {
                    startDelay: h.startDelay || 0
                  })
                };
                t.name, g(t.children, u, m), h.alphaTween && g(
                  t.children,
                  { opacity: 1 },
                  {
                    duration: h.alphaTween.duration,
                    ease: Te(h.alphaTween.ease || "easeIn"),
                    delay: ht(h.interval, {
                      startDelay: h.startDelay || 0
                    })
                  }
                );
              }
            }
            r.unobserve(a.target);
          }
        }
      },
      { rootMargin: e.rootMargin }
    );
  }
  /**
   * Order `children` by `data-moonwalk-order`.
   *
   * @param {*} children
   */
  orderChildren(t) {
    return Array.from(t).sort((e, s) => {
      const n = e.getAttribute("data-moonwalk-order") ? parseInt(e.getAttribute("data-moonwalk-order")) : null, r = e.getAttribute("data-moonwalk-order") ? parseInt(s.getAttribute("data-moonwalk-order")) : null;
      return !n && !r ? 0 : n && !r ? -1 : !n && r ? 1 : n - r;
    });
  }
  /**
   * Calculate the delay for the next animation in the section.
   * This replaces GSAP's timeline.recent() logic.
   *
   * @param {*} section - The section object
   * @param {*} duration - Duration of the animation to add
   * @param {*} overlap - How much the animations should overlap
   * @returns {number} The delay in seconds
   */
  calculateDelay(t, e, s) {
    if (!t.animation.lastStartTime)
      return 0;
    const r = (performance.now() - t.animation.lastStartTime) / 1e3, o = t.animation.lastDelay + t.animation.lastDuration + s, a = Math.max(0, o - r);
    return r.toFixed(3), t.animation.lastDelay, t.animation.lastDuration, a.toFixed(3), a;
  }
  /**
   * Update the animation state after adding an animation.
   *
   * @param {*} section - The section object
   * @param {*} delay - The delay that was used
   * @param {*} duration - The duration of the animation
   */
  updateAnimationState(t, e, s) {
    ({ ...t.animation }, t.animation.lastDelay = e), t.animation.lastDuration = s, t.animation.lastStartTime = performance.now(), { ...t.animation };
  }
  onReady() {
    this.opts.initialDelay ? setTimeout(() => {
      this.ready();
    }, this.opts.initialDelay) : this.ready();
  }
  /**
   * Called on `APPLICATION_READY` event, if `config.fireOnReady`.
   * Otherwise must be triggered manually
   */
  ready() {
    const { opts: t } = this;
    for (let e = 0; e < this.runs.length; e += 1) {
      const s = this.runs[e];
      s && s.onReady && s.onReady(s.el);
    }
    for (let e = 0; e < this.runs.length; e += 1) {
      const s = this.runs[e];
      if (!s)
        return;
      let n;
      e === this.sections.length - 1 ? n = "0px" : s.rootMargin ? n = s.rootMargin : n = t.rootMargin, this.runObserver(s, n).observe(s.el);
    }
    for (let e = 0; e < this.sections.length; e += 1) {
      const s = this.sections[e];
      let n;
      e === this.sections.length - 1 ? n = "0px" : n = t.rootMargin, this.setupNamesAndStages(s), s.name || (s.observer = this.observer(s, n)), s.elements = s.el.querySelectorAll("[data-moonwalk]"), s.name || (s.elements.forEach((r) => {
        const o = r.getAttribute("data-moonwalk"), a = o.length ? t.walks[o] : t.walks.default;
        a && a.transition && (a.transition.from, v(r, a.transition.from));
      }), s.elements.forEach((r) => s.observer.observe(r)));
    }
  }
  /**
   * Creates and returns the RUN observer for data-moonwalk-run elements
   *
   * @param {*} run
   * @param {*} rootMargin
   */
  runObserver(t, e) {
    const s = /* @__PURE__ */ new WeakMap();
    return new IntersectionObserver(
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o], h = a.boundingClientRect, d = window.innerHeight, u = window.innerWidth;
          if (a.isIntersecting && t.callback) {
            let f = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  f.direction = "bottom";
                  break;
                case "up":
                  f.direction = "top";
                  break;
                case "right":
                  f.direction = "left";
                  break;
                case "left":
                  f.direction = "right";
                  break;
              }
            s.set(a.target, {
              top: h.top,
              bottom: h.bottom,
              left: h.left,
              right: h.right
            });
            const m = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, m, f), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && r.unobserve(a.target);
          } else if (t.onExit && a.target.hasAttribute("data-moonwalk-run-triggered")) {
            const f = a.target.hasAttribute(
              "data-moonwalk-run-exit-triggered"
            );
            a.target.setAttribute("data-moonwalk-run-exit-triggered", "");
            let m = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  m.direction = "top";
                  break;
                case "up":
                  m.direction = "bottom";
                  break;
                case "right":
                  m.direction = "right";
                  break;
                case "left":
                  m.direction = "left";
                  break;
              }
            else
              h.bottom <= 0 ? m.direction = "top" : h.top >= d ? m.direction = "bottom" : h.right <= 0 ? m.direction = "left" : h.left >= u && (m.direction = "right");
            t.onExit(a.target, f, m), t.repeated || r.unobserve(a.target);
          }
        }
      },
      {
        rootMargin: e,
        threshold: t.threshold
      }
    );
  }
  /**
   * Creates and returns the standard observer for all moonwalk elements
   * inside a section.
   *
   * @param {*} section
   * @param {*} rootMargin
   */
  observer(t, e) {
    const { opts: s } = this;
    return new IntersectionObserver(
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o];
          if (a.isIntersecting || a.intersectionRatio > 0) {
            t.running = !0;
            const h = a.target.getAttribute("data-moonwalk");
            a.target.getAttribute("data-testid") || h || a.target.className, a.isIntersecting, a.intersectionRatio;
            const d = h.length ? s.walks[h] : s.walks.default, { duration: u, transition: f, startDelay: m } = d, y = d.interval !== void 0 ? d.interval : 0.15;
            let { alphaTween: b } = d, S = (u - y) * -1;
            t.stage.firstTween && (S = 0, t.stage.firstTween = !1), typeof b == "object" && b !== null ? b.duration = b.duration ? b.duration : u : b === !0 && (b = {
              duration: u,
              ease: "easeIn"
            });
            const T = () => {
              f ? this.tweenJS(
                t,
                a.target,
                u,
                y,
                f,
                S,
                b
              ) : this.tweenCSS(
                t,
                a.target,
                u,
                y,
                f,
                S
              );
            }, E = () => {
              m ? ti(m, T) : T();
            };
            if (a.target.tagName === "IMG")
              ae(a.target).then(() => E());
            else if (a.target.hasAttribute("data-placeholder"))
              E();
            else {
              const P = a.target.querySelectorAll("img");
              P.length ? Array.from(P).every(
                (k) => k.hasAttribute("data-ll-placeholder")
              ) ? E() : Yi(P).then(() => E()) : E();
            }
            r.unobserve(a.target);
          }
        }
      },
      {
        rootMargin: e,
        threshold: s.threshold
      }
    );
  }
  /**
   * The main tween function
   *
   * @param {*} section
   * @param {*} target
   * @param {*} tweenDuration
   * @param {*} tweenTransition
   * @param {*} tweenOverlap
   * @param {*} alphaTween
   */
  tweenJS(t, e, s, n, r, o, a) {
    if (e.getAttribute("data-testid") || e.getAttribute("data-moonwalk") || e.className, A.hasAttribute(e, "data-moonwalked"))
      return;
    const h = this.calculateDelay(t, s, o);
    r.from;
    const { ease: d, ...u } = r.to, f = Te(d || "easeOut");
    h.toFixed(3);
    const m = g(e, u, {
      duration: s,
      delay: h,
      ease: f
    });
    m && m.finished ? m.finished.then(() => {
      e.setAttribute("data-moonwalked", "");
    }).catch((y) => {
      e.setAttribute("data-moonwalked", "");
    }) : e.setAttribute("data-moonwalked", ""), a && (a.duration, (h + (a.delay || 0)).toFixed(3), g(e, { opacity: 1 }, {
      duration: a.duration,
      ease: Te(a.ease || "easeIn"),
      delay: h + (a.delay || 0)
    })), this.updateAnimationState(t, h, s);
  }
  /**
   * CSS version. Not quite ready yet.
   *
   * @param {*} section
   * @param {*} target
   * @param {*} duration
   * @param {*} transition
   * @param {*} overlap
   */
  tweenCSS(t, e, s, n, r, o) {
    if (A.hasAttribute(e, "data-moonwalked"))
      return;
    const a = this.calculateDelay(
      t,
      s,
      o
    );
    e.getAttribute("data-testid") || e.className, a.toFixed(3), ti(a, () => {
      e.classList.add("moonwalked"), e.setAttribute("data-moonwalked", "");
    }), this.updateAnimationState(t, a, s);
  }
}
const Bc = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, Ut = [];
class pu {
  constructor(t, e, s = {}) {
    this.app = t, this.opts = V(s, Bc), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
    const n = document.querySelector(
      `[data-popover-template=${e.dataset.popoverTarget}]`
    );
    if (!n) {
      console.warn(`Popover template not found for trigger: ${e.dataset.popoverTarget}`);
      return;
    }
    this.popover = document.createElement("div"), this.popover.innerHTML = n.innerHTML, Object.assign(this.popover.style, {
      position: "fixed"
    }), this.popover.classList.add(this.className), n.classList && n.classList.length > 0 && n.classList.forEach((r) => {
      r !== "popover-template" && this.popover.classList.add(r);
    }), this.boundHandleDocumentClick = this.handleDocumentClick.bind(this), this.boundHandleScroll = this.handleScroll.bind(this), t.featureTests.results.touch ? this.trigger.addEventListener("touchstart", this.handleTouchStart.bind(this)) : this.opts.clickToggle ? this.trigger.addEventListener("click", this.handleClick.bind(this)) : (this.trigger.addEventListener("mouseenter", this.handleMouseEnter.bind(this)), this.trigger.addEventListener("mouseleave", this.handleMouseLeave.bind(this)));
  }
  handleMouseEnter(t) {
    this.show();
  }
  handleMouseLeave(t) {
    this.hide();
  }
  handleTouchStart(t) {
    this.toggle();
  }
  handleClick(t) {
    t.stopPropagation(), this.toggle();
  }
  get isVisible() {
    return document.body.contains(this.popover);
  }
  show() {
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), Ut.includes(this) || Ut.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
      this.addScrollListener();
    }), typeof this.opts.onShow == "function" && requestAnimationFrame(() => {
      this.opts.onShow(this);
    });
  }
  // Update popover position based on trigger position
  updatePosition(t = !0) {
    const {
      top: e,
      left: s,
      width: n,
      height: r
    } = this.trigger.getBoundingClientRect(), { offsetHeight: o, offsetWidth: a } = this.popover, h = this.orderedPositions.indexOf(this.position), d = {
      top: {
        name: "top",
        top: e - o,
        left: s - (a - n) / 2
      },
      right: {
        name: "right",
        top: e - (o - r) / 2,
        left: s + n
      },
      bottom: {
        name: "bottom",
        top: e + r,
        left: s - (a - n) / 2
      },
      left: {
        name: "left",
        top: e - (o - r) / 2,
        left: s - a
      }
    }, u = this.orderedPositions.slice(h).concat(this.orderedPositions.slice(0, h)).map((f) => d[f]).find((f) => (t || (this.popover.style.top = `${f.top}px`, this.popover.style.left = `${f.left}px`), A.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((f) => {
      this.popover.classList.remove(`${this.className}--${f}`);
    }), u ? (t && this.isVisible ? g(this.popover, {
      top: Math.max(0, u.top),
      left: Math.max(0, u.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, u.top)}px`, this.popover.style.left = `${Math.max(0, u.left)}px`), this.popover.classList.add(`${this.className}--${u.name}`), this.currentPosition = u.name) : (t && this.isVisible ? g(this.popover, {
      top: Math.max(0, d.bottom.top),
      left: Math.max(0, d.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, d.bottom.top)}px`, this.popover.style.left = `${Math.max(0, d.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = Ut.indexOf(this);
    t !== -1 && Ut.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
  }
  toggle() {
    this.isVisible ? this.hide() : this.show();
  }
  // Add document click handler to close popover when clicking outside
  addDocumentClickHandler() {
    document.addEventListener("click", this.boundHandleDocumentClick);
  }
  // Remove document click handler
  removeDocumentClickHandler() {
    document.removeEventListener("click", this.boundHandleDocumentClick);
  }
  // Handle clicks on document to close popover when clicking outside
  handleDocumentClick(t) {
    this.isVisible && !this.popover.contains(t.target) && !this.trigger.contains(t.target) && this.hide();
  }
  // Close all popovers except the specified one
  closeAllExcept(t) {
    Ut.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(mt, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(mt, this.boundHandleScroll);
  }
}
const qc = {
  /**
   * selector
   *
   * CSS selector to find popup elements
   * Default: '[data-popup]'
   */
  selector: "[data-popup]",
  /**
   * responsive
   *
   * Runs to check if popup should be shown on this breakpoint.
   * Passes app object to callback
   *
   * Example:
   *
   *  responsive: app => { return (app.breakpoint === 'iphone') }
   */
  responsive: () => !0,
  onOpen: () => {
  },
  onClose: () => {
  },
  tweenIn: (i, t, e) => {
    e.backdrop.style.display = "block", g(e.backdrop, { opacity: 1 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "block", g(
        t,
        {
          transform: [
            "translate(calc(-50% - 5px), -50%)",
            "translate(-50%, -50%)"
          ],
          opacity: [0, 1]
        },
        { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      );
    });
  },
  tweenOut: (i) => {
    console.log("default tweenOut");
    const t = i.currentPopup;
    t && g(t, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "none";
    }), g(i.backdrop, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      i.backdrop.remove();
    });
  }
};
class fu {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", s = {}) {
    this.app = t, this.opts = V(s, qc), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
  }
  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    const t = document.querySelectorAll("[data-popup-trigger]"), e = Array.from(t).filter((r) => {
      const o = r.getAttribute("data-popup-trigger");
      if (typeof o == "string") {
        const a = document.querySelector(o);
        return a && a.matches(this.opts.selector);
      }
      return !1;
    }), s = document.querySelectorAll(this.opts.selector), n = [];
    s.forEach((r) => {
      const o = r.querySelectorAll("[data-popup-close]");
      n.push(...o);
    }), e.forEach((r) => {
      const o = r.getAttribute("data-popup-trigger"), a = r.getAttribute("data-popup-key") || this.getKeyFromTarget(o);
      r.addEventListener("click", (h) => {
        this.opts.responsive(this.app) && (h.stopImmediatePropagation(), h.preventDefault(), this.open(r, o, a));
      });
    }), n.forEach((r) => {
      const o = r.closest(this.opts.selector), a = o ? o.getAttribute("data-popup-key") : null;
      r.addEventListener("click", (h) => {
        h.stopImmediatePropagation(), h.preventDefault(), (!this.popupKey || !a || this.popupKey === a) && (this.opts.onClose(this), this.close());
      });
    });
  }
  /**
   * Extract key from target selector or element
   * @param {HTMLElement|string} target - Target element or selector
   * @returns {string|null} - The popup key or null
   */
  getKeyFromTarget(t) {
    if (typeof t == "string") {
      const e = document.querySelector(t);
      return e ? e.getAttribute("data-popup-key") : null;
    } else if (t instanceof HTMLElement)
      return t.getAttribute("data-popup-key");
    return null;
  }
  /**
   * Create backdrop element for popup
   * @param {string|null} key - Optional popup key to associate with backdrop
   * @returns {HTMLElement} The created backdrop element
   */
  createBackdrop(t) {
    const e = document.createElement("div");
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), e.style.display = "none", e.style.zIndex = "4999", v(e, { opacity: 0 }), e.addEventListener("click", (s) => {
      s.stopPropagation(), this.close();
    }), document.body.append(e), e;
  }
  /**
   * Open a popup
   * @param {HTMLElement} trigger - Element that triggered the popup
   * @param {HTMLElement|string} target - Popup element or selector
   * @param {string|null} key - Optional popup key
   */
  open(t, e, s = null) {
    if (this.keyUpListener = this.onKeyup.bind(this), document.addEventListener("keyup", this.keyUpListener), this.popupKey = s || this.getKeyFromTarget(e), this.backdrop = this.createBackdrop(this.popupKey), typeof e == "string" && (e = document.querySelector(e)), !e) {
      console.error(`JUPITER/POPUP >>> Element ${e} not found`);
      return;
    }
    this.currentPopup = e, this.popupKey && !e.hasAttribute("data-popup-key") && e.setAttribute("data-popup-key", this.popupKey), this.opts.onOpen(t, e, this), this.opts.tweenIn(t, e, this);
  }
  /**
   * Close the popup
   */
  close() {
    document.removeEventListener("keyup", this.keyUpListener), this.opts.onClose(this), this.opts.tweenOut(this), this.popupKey = null, this.currentPopup = null;
  }
  /**
   * Handle keyup event for Escape key to close popup
   * @param {KeyboardEvent} e - Keyboard event
   */
  onKeyup(t) {
    switch (t.keyCode || t.which) {
      case 27:
        this.close();
        break;
    }
  }
}
const Uc = {
  onIntersect: (i, t) => {
  }
};
class mu {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Uc), this.initialize();
  }
  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = A.all("[data-scrollspy-trigger]");
    const t = {
      rootMargin: "-55px 0px -85%"
    }, e = new IntersectionObserver((s) => {
      s.forEach((n) => {
        n.isIntersecting && this.intersectionHandler(n);
      });
    }, t);
    this.triggers.forEach((s) => e.observe(s));
  }
  /**
   * Handle intersection with viewport
   * @param {IntersectionObserverEntry} entry - Intersection observer entry
   */
  intersectionHandler(t) {
    const e = t.target.dataset.scrollspyTrigger, s = document.querySelector("[data-scrollspy-active]"), n = document.querySelector(`[data-scrollspy-target="${e}"]`);
    s && s.removeAttribute("data-scrollspy-active"), n && (n.dataset.scrollspyActive = "", this.opts.onIntersect(t.target, n));
  }
}
const Wc = {};
class gu {
  constructor(t, e = {}) {
    this.app = t, this.opts = V(e, Wc), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-boxes-stacked]"), e = new IntersectionObserver((s) => {
      const [{ isIntersecting: n, target: r }] = s;
      n && this.adjustBox(r);
    });
    Array.from(t).forEach((s) => {
      e.observe(s);
    });
  }
  adjustBox(t) {
    const e = t.querySelector("[data-boxes-stacked-size-target]"), s = t.querySelector("[data-boxes-stacked-size-src]");
    e && this.size(e, s);
    const n = t.querySelector("[data-boxes-stacked-pull]");
    if (n) {
      const r = n.getAttribute("data-boxes-stacked-pull");
      let o;
      switch (r) {
        case "1/3":
          o = n.clientHeight / 3;
          break;
        case "2/3":
          o = n.clientHeight / 3 * 2;
          break;
        case "1/2":
          o = n.clientHeight / 2;
          break;
        default:
          console.error(
            "==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value"
          );
      }
      this.pull(n, o);
    }
  }
  pull(t, e) {
    v(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    v(t, { height: e.clientHeight });
  }
}
const vr = {
  onMainVisible: (i) => {
    g(i.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    });
  },
  onMainInvisible: (i) => {
    g(i.el, {
      opacity: 0
    }, {
      duration: 1
    });
  },
  onPin: (i) => {
    g(i.auxEl, {
      yPercent: "0"
    }, {
      duration: 0.35,
      ease: "easeOut"
    });
  },
  onUnpin: (i) => {
    i._hiding = !0, g(i.auxEl, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      ease: "easeIn"
    }).finished.then(() => {
      i._hiding = !1;
    });
  },
  onSmall: () => {
  }
}, Kc = {
  el: "header[data-nav]",
  on: Z,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (i) => i.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (i) => {
      v(i.el, { opacity: 0 });
    },
    enter: (i) => {
      v(i.auxEl, { yPercent: -100 }), v(i.lis, { opacity: 0 }), g(i.auxEl, {
        yPercent: 0
      }, {
        duration: 1,
        delay: i.opts.enterDelay,
        ease: "easeOut"
      }), g(i.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: ht(0.1, { startDelay: i.opts.enterDelay }),
        ease: "easeIn"
      });
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0,
    // how far from the top before we trigger hide
    offsetSmall: 50,
    // how far from the top before we trigger the shrinked padding,
    offsetBg: 200,
    // how far down before changing backgroundcolor
    ...vr
  }
};
class yu {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = V(e, Kc), this.mainOpts.pinOnOutline && window.addEventListener(De, () => {
      this.preventUnpin = !0, this.pin();
    }), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const s = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(s, e), this.auxEl = this.opts.onClone(this), this.auxEl.setAttribute("data-header-pinned", ""), this.auxEl.setAttribute("data-auxiliary-nav", ""), this.auxEl.removeAttribute("data-nav"), document.body.appendChild(this.auxEl), this.small(), this.unpin(), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._isResizing = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.firstReveal = !0, this.initialize();
  }
  initialize() {
    if (this.lastKnownScrollY = this.getScrollY(), this.currentScrollY = this.lastKnownScrollY, typeof this.opts.offsetBg == "string") {
      const t = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = t.offsetTop - this.el.offsetHeight;
    }
    this.setupObserver(), window.addEventListener(this.mainOpts.on, this.bindObserver.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && window.addEventListener(
      it,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      mt,
      this.update.bind(this),
      !1
    ), window.addEventListener("scroll", () => {
      clearTimeout(this.scrollSettleTimeout), this.scrollSettleTimeout = setTimeout(() => {
        const t = this.opts.canvas === window || this.opts.canvas === document.body ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop : this.opts.canvas.scrollTop;
        this.currentScrollY = t, this.checkTop(!0), this.checkBot(!0);
      }, 100);
    }, {
      capture: !1,
      passive: !0
    }), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Me, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      _e,
      () => {
        this.preventPin = !1, this.pin(), this.preventUnpin = !1;
      },
      !1
    ));
  }
  bindObserver() {
    this.observer.observe(this.el);
  }
  setResizeTimer() {
    this._isResizing = !0, this._pinned && this.unpin(), this.resetResizeTimer && clearTimeout(this.resetResizeTimer), this.resetResizeTimer = setTimeout(() => {
      this._isResizing = !1, clearTimeout(this.resetResizeTimer), this.resetResizeTimer = null;
    }, 500);
  }
  _hideAlt() {
    this.unpin();
  }
  _showAlt() {
    this.pin();
  }
  update() {
    this.redraw(!1);
  }
  lock() {
    this.preventPin = !0, this.preventUnpin = !0;
  }
  unlock() {
    this.preventPin = !1, this.preventUnpin = !1;
  }
  checkSize(t) {
    this.currentScrollY > this.opts.offsetSmall ? t ? this.small() : this._small || this.small() : t ? this.notSmall() : this._small && this.notSmall();
  }
  checkTop(t) {
    this.currentScrollY <= this.opts.offset ? t ? this.top() : this._top || this.top() : t ? this.notTop() : this._top && this.notTop();
  }
  checkBot(t) {
    this.currentScrollY + this.getViewportHeight() >= this.getScrollerHeight() ? t ? this.bottom() : this._bottom || this.bottom() : t ? this.notBottom() : this._bottom && this.notBottom();
  }
  checkPin(t, e) {
    if (this._navVisible && this._pinned) {
      this.unpin();
      return;
    }
    if (this.shouldUnpin(e)) {
      if (this.mobileMenuOpen)
        return;
      this._pinned && this.unpin();
    } else this.shouldPin(e) && (this._pinned || this.pin());
  }
  redraw(t = !1) {
    this.currentScrollY = this.getScrollY();
    const e = this.toleranceExceeded();
    this.isOutOfBounds() || (this.checkPin(t, e), this.lastKnownScrollY = this.currentScrollY, this._firstLoad = !1);
  }
  notTop() {
    this._top = !1, this.el.removeAttribute("data-header-top"), this.el.setAttribute("data-header-not-top", ""), this.opts.onNotTop(this);
  }
  top() {
    this._top = !0, this.el.setAttribute("data-header-top", ""), this.el.removeAttribute("data-header-not-top"), this.opts.onTop(this);
  }
  notBottom() {
    this._bottom = !1, this.el.setAttribute("data-header-not-bottom", ""), this.el.removeAttribute("data-header-bottom"), this.opts.onNotBottom(this);
  }
  bottom() {
    this._bottom = !0, this.el.setAttribute("data-header-bottom", ""), this.el.removeAttribute("data-header-not-bottom"), this.opts.onBottom(this);
  }
  unpin() {
    this.preventUnpin || (this._pinned = !1, this.opts.onUnpin(this));
  }
  pin() {
    this.preventPin || (this._pinned = !0, this.opts.onSmall(this), this.opts.onPin(this));
  }
  notSmall() {
    this._small = !1, this.auxEl.setAttribute("data-header-big", ""), this.auxEl.removeAttribute("data-header-small"), this.opts.onNotSmall(this);
  }
  small() {
    this._small = !0, this.auxEl.setAttribute("data-header-small", ""), this.auxEl.removeAttribute("data-header-big"), this.opts.onSmall(this);
  }
  shouldUnpin(t) {
    if (this._navVisible)
      return !0;
    const e = this.currentScrollY > this.lastKnownScrollY, s = this.currentScrollY >= this.opts.offset;
    return e && s && t;
  }
  shouldPin(t) {
    if (this._isResizing)
      return !1;
    const e = this.currentScrollY < this.lastKnownScrollY, s = this.currentScrollY <= this.opts.offset;
    return e && t || s;
  }
  isOutOfBounds() {
    const t = this.currentScrollY < 0, e = this.currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
    return t || e;
  }
  getScrollerPhysicalHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.opts.canvas);
  }
  getScrollerHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body ? this.getDocumentHeight() : this.getElementHeight(this.opts.canvas);
  }
  getDocumentHeight() {
    const { body: t } = document, { documentElement: e } = document;
    return Math.max(
      t.scrollHeight,
      e.scrollHeight,
      t.offsetHeight,
      e.offsetHeight,
      t.clientHeight,
      e.clientHeight
    );
  }
  getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  getElementHeight(t) {
    return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight);
  }
  getElementPhysicalHeight(t) {
    return Math.max(t.offsetHeight, t.clientHeight);
  }
  getScrollY() {
    return this.opts.canvas.pageYOffset !== void 0 ? this.opts.canvas.pageYOffset : this.opts.canvas.scrollTop !== void 0 ? this.opts.canvas.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  toleranceExceeded() {
    return Math.abs(this.currentScrollY - this.lastKnownScrollY) >= this.opts.tolerance;
  }
  _getOptionsForSection(t, e) {
    if (!Object.prototype.hasOwnProperty.call(e, "sections") || !Object.prototype.hasOwnProperty.call(e.sections, t))
      return e.default;
    const s = e.sections[t];
    return e = V(s, vr, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      Ui,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      Wi,
      this._onMobileMenuClose.bind(this)
    );
  }
  _onMobileMenuOpen() {
    this.mobileMenuOpen = !0;
  }
  _onMobileMenuClose() {
    this.mobileMenuOpen = !1;
  }
}
class bu {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} options - Configuration options
   * @param {Function} options.onOpen - Callback when toggle opens
   * @param {Function} options.onClose - Callback when toggle closes
   */
  constructor(t, e, s = {}) {
    this.open = !1, this.app = t, this.el = e, this.onOpen = s.onOpen, this.onClose = s.onClose, this.onBeforeOpen = s.onBeforeOpen, this.onBeforeClose = s.onBeforeClose, this.trigger = A.find(this.el, "[data-toggle-trigger]"), this.triggerTarget = this.trigger.dataset.toggleTrigger, this.group = this.el.dataset.toggleGroup, this.triggerTarget ? this.content = A.all(this.el, `[data-toggle-content="${this.triggerTarget}"]`) : this.content = A.all(this.el, "[data-toggle-content]"), this.triggerIcon = A.find(this.trigger, "span.icon"), this.trigger.addEventListener("click", this.onClick.bind(this));
  }
  /**
   * Get the index of this toggle within its group (1-based)
   * @returns {number} The 1-based index of this toggle in its group
   */
  getGroupIndex() {
    return !this.group || !this.app.togglers ? 1 : this.app.togglers.filter((e) => e.group === this.group).indexOf(this) + 1;
  }
  /**
   * Handle click on trigger element
   */
  onClick() {
    if (this.group && !this.open && this.closeOthersInGroup(), this.toggleState(), this.open) {
      this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), this.content.forEach((s) => {
        s.style.height = "0", s.style.display = "block", s.offsetHeight;
      }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex());
      const t = [];
      this.content.forEach((s, n) => {
        const r = s.scrollHeight;
        t.push(
          g(s, { height: [0, r + "px"] }, {
            ease: "easeInOut",
            delay: n * 0.1
          })
        );
      });
      const e = t[t.length - 1];
      e && e.finished.then(() => {
        this.content.forEach((s) => {
          s.style.height = "auto", s.removeAttribute("data-toggle-hidden"), s.setAttribute("data-toggle-visible", "");
        }), this.onOpen && this.onOpen(this, this.getGroupIndex());
      });
    } else {
      this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.removeAttribute("data-toggle-trigger-active"), this.onBeforeClose && this.onBeforeClose(this, this.getGroupIndex());
      const t = [];
      this.content.forEach((s, n) => {
        const r = s.scrollHeight;
        s.style.height = r + "px", s.offsetHeight, t.push(
          g(s, { height: 0 }, {
            duration: 0.25,
            ease: "easeOut",
            delay: n * 0.1
          })
        );
      });
      const e = t[t.length - 1];
      e && e.finished.then(() => {
        this.el.classList.toggle("open"), this.content.forEach((s) => {
          s.style.display = "none", s.style.removeProperty("height"), s.removeAttribute("data-toggle-visible"), s.setAttribute("data-toggle-hidden", "");
        }), this.onClose && this.onClose(this, this.getGroupIndex());
      });
    }
  }
  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    !this.group || !this.app.togglers || this.app.togglers.forEach((t) => {
      if (!(t === this || t.group !== this.group) && t.open) {
        t.open = !1, t.triggerIcon && t.triggerIcon.classList.remove("active"), t.trigger.removeAttribute("data-toggle-trigger-active"), t.el.classList.remove("open");
        const e = [];
        t.content.forEach((n, r) => {
          const o = n.scrollHeight;
          n.style.height = o + "px", n.offsetHeight, e.push(
            g(n, { height: 0 }, {
              duration: 0.25,
              ease: "easeOut",
              delay: r * 0.1
            })
          );
        });
        const s = e[e.length - 1];
        s && s.finished.then(() => {
          t.content.forEach((n) => {
            n.style.display = "none", n.style.removeProperty("height"), n.removeAttribute("data-toggle-visible"), n.setAttribute("data-toggle-hidden", "");
          }), t.onClose && t.onClose(t, t.getGroupIndex());
        });
      }
    });
  }
  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open ? this.open = !1 : this.open = !0;
  }
}
class wu {
  /**
   * Create a new Typography instance
   * @param {HTMLElement|undefined} parent - Parent element to search for typography elements, or undefined for document
   * @param {TypographySettings} settings - Typography settings
   */
  constructor(t, e = {}) {
    this.settings = {
      minWords: 4,
      selector: "[data-typo]",
      ignoreClass: "no-typo-fix",
      ignoreExistingSpaceChars: !1,
      ...e
    }, this.elems = [], typeof t > "u" ? this.elems = [...this.elems, ...document.querySelectorAll(this.settings.selector)] : this.elems = [...this.elems, ...t.querySelectorAll(this.settings.selector)], document.querySelectorAll("[data-typo-children]").forEach((n) => {
      this.elems = [...this.elems, ...n.children];
    }), this.apply();
  }
  /**
   * Apply formatting to the loaded elements
   * @return void
   */
  apply() {
    this.elems.map((t) => {
      if (this.shouldElementBeIgnored(t))
        return !1;
      let e = "", s = t.innerHTML.trim().replace(/&nbsp;/g, " ").split(/ (?=[^>]*(?:<|$))/);
      return s.length < this.settings.minWords ? !1 : (s = this.preventOrphans(s), e = s.join(" "), e = e.replace(/&nbsp; /g, "&nbsp;"), t.innerHTML = e, !0);
    });
  }
  /**
   * Apply the orphans filter to the passed text and return it
   * @param {string} textItems
   */
  preventOrphans(t) {
    const e = t[t.length - 2];
    return t[t.length - 2] = `${e}&nbsp;`, t;
  }
  /**
   * Reset any formatting
   * @return void
   */
  reset() {
    this.elems.map((t) => this.shouldElementBeIgnored(t) ? !1 : (t.innerHTML = t.innerHTML.replace(/&nbsp;/g, " "), !0));
  }
  /**
   * Run checks to see if the passed element should be skipped
   *
   * @param {HTMLElement} elem
   * @returns boolean
   */
  shouldElementBeIgnored(t) {
    return !!(t.innerHTML.indexOf("&nbsp;") > -1 && this.settings.ignoreExistingSpaceChars || t.classList.contains(this.settings.ignoreClass));
  }
}
const vu = (i, t) => {
  const e = document.createElement("script");
  let s = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = i, e.onreadystatechange = function() {
    !s && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (s = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  Gc as Application,
  Js as Breakpoints,
  Zc as Cookies,
  Xc as CoverOverlay,
  Qc as Dataloader,
  A as Dom,
  Jc as Dropdown,
  tu as EqualHeightElements,
  eu as EqualHeightImages,
  jc as Events,
  iu as FixedHeader,
  su as FooterReveal,
  ru as HeroSlider,
  ou as HeroVideo,
  au as Lazyload,
  lu as Lightbox,
  hu as Links,
  cu as Marquee,
  uu as MobileMenu,
  du as Moonwalk,
  nu as Parallax,
  pu as Popover,
  fu as Popup,
  mu as ScrollSpy,
  gu as StackedBoxes,
  yu as StickyHeader,
  bu as Toggler,
  wu as Typography,
  V as _defaultsDeep,
  g as animate,
  ae as imageIsLoaded,
  Yi as imagesAreLoaded,
  vu as loadScript,
  ee as prefersReducedMotion,
  Xs as rafCallback,
  Yc as scroll,
  ht as stagger
};
