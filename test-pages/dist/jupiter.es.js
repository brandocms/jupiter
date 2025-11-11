function Dr(i, t) {
  i.indexOf(t) === -1 && i.push(t);
}
function ln(i, t) {
  const e = i.indexOf(t);
  e > -1 && i.splice(e, 1);
}
const Mt = (i, t, e) => e > t ? t : e < i ? i : e;
function di(i, t) {
  return t ? `${i}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : i;
}
let ye = () => {
}, wt = () => {
};
process.env.NODE_ENV !== "production" && (ye = (i, t, e) => {
  !i && typeof console < "u" && console.warn(di(t, e));
}, wt = (i, t, e) => {
  if (!i)
    throw new Error(di(t, e));
});
const It = {}, cn = (i) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i);
function hn(i) {
  return typeof i == "object" && i !== null;
}
const un = (i) => /^0[^.\s]+$/u.test(i);
// @__NO_SIDE_EFFECTS__
function ki(i) {
  let t;
  return () => (t === void 0 && (t = i()), t);
}
const _t = /* @__NO_SIDE_EFFECTS__ */ (i) => i, Rr = (i, t) => (e) => t(i(e)), _i = (...i) => i.reduce(Rr), Be = /* @__NO_SIDE_EFFECTS__ */ (i, t, e) => {
  const s = t - i;
  return s === 0 ? 1 : (e - i) / s;
};
class dn {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Dr(this.subscriptions, t), () => ln(this.subscriptions, t);
  }
  notify(t, e, s) {
    const n = this.subscriptions.length;
    if (n)
      if (n === 1)
        this.subscriptions[0](t, e, s);
      else
        for (let o = 0; o < n; o++) {
          const r = this.subscriptions[o];
          r && r(t, e, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const ut = /* @__NO_SIDE_EFFECTS__ */ (i) => i * 1e3, mt = /* @__NO_SIDE_EFFECTS__ */ (i) => i / 1e3;
function Di(i, t) {
  return t ? i * (1e3 / t) : 0;
}
const Es = /* @__PURE__ */ new Set();
function Ri(i, t, e) {
  i || Es.has(t) || (console.warn(di(t, e)), Es.add(t));
}
const zr = (i, t, e) => {
  const s = t - i;
  return ((e - i) % s + s) % s + i;
}, pn = (i, t, e) => (((1 - 3 * e + 3 * t) * i + (3 * e - 6 * t)) * i + 3 * t) * i, Fr = 1e-7, Vr = 12;
function Nr(i, t, e, s, n) {
  let o, r, a = 0;
  do
    r = t + (e - t) / 2, o = pn(r, s, n) - i, o > 0 ? e = r : t = r;
  while (Math.abs(o) > Fr && ++a < Vr);
  return r;
}
function be(i, t, e, s) {
  if (i === t && e === s)
    return _t;
  const n = (o) => Nr(o, 0, 1, i, e);
  return (o) => o === 0 || o === 1 ? o : pn(n(o), t, s);
}
const fn = (i) => (t) => t <= 0.5 ? i(2 * t) / 2 : (2 - i(2 * (1 - t))) / 2, mn = (i) => (t) => 1 - i(1 - t), gn = /* @__PURE__ */ be(0.33, 1.53, 0.69, 0.99), zi = /* @__PURE__ */ mn(gn), yn = /* @__PURE__ */ fn(zi), bn = (i) => (i *= 2) < 1 ? 0.5 * zi(i) : 0.5 * (2 - Math.pow(2, -10 * (i - 1))), Fi = (i) => 1 - Math.sin(Math.acos(i)), $r = mn(Fi), wn = fn(Fi), Hr = /* @__PURE__ */ be(0.42, 0, 1, 1), Br = /* @__PURE__ */ be(0, 0, 0.58, 1), vn = /* @__PURE__ */ be(0.42, 0, 0.58, 1), Sn = (i) => Array.isArray(i) && typeof i[0] != "number";
function An(i, t) {
  return Sn(i) ? i[zr(0, i.length, t)] : i;
}
const En = (i) => Array.isArray(i) && typeof i[0] == "number", Ts = {
  linear: _t,
  easeIn: Hr,
  easeInOut: vn,
  easeOut: Br,
  circIn: Fi,
  circInOut: wn,
  circOut: $r,
  backIn: zi,
  backInOut: yn,
  backOut: gn,
  anticipate: bn
}, qr = (i) => typeof i == "string", pi = (i) => {
  if (En(i)) {
    wt(i.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, s, n] = i;
    return be(t, e, s, n);
  } else if (qr(i))
    return wt(Ts[i] !== void 0, `Invalid easing type '${i}'`, "invalid-easing-type"), Ts[i];
  return i;
}, Me = [
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
function Wr(i, t) {
  let e = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), n = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function c(h) {
    r.has(h) && (d.schedule(h), i()), h(a);
  }
  const d = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (h, p = !1, m = !1) => {
      const b = m && n ? e : s;
      return p && r.add(h), b.has(h) || b.add(h), h;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (h) => {
      s.delete(h), r.delete(h);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (h) => {
      if (a = h, n) {
        o = !0;
        return;
      }
      n = !0, [e, s] = [s, e], e.forEach(c), e.clear(), n = !1, o && (o = !1, d.process(h));
    }
  };
  return d;
}
const Ur = 40;
function Tn(i, t) {
  let e = !1, s = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => e = !0, r = Me.reduce((z, F) => (z[F] = Wr(o), z), {}), { setup: a, read: c, resolveKeyframes: d, preUpdate: h, update: p, preRender: m, render: y, postRender: b } = r, S = () => {
    const z = It.useManualTiming ? n.timestamp : performance.now();
    e = !1, It.useManualTiming || (n.delta = s ? 1e3 / 60 : Math.max(Math.min(z - n.timestamp, Ur), 1)), n.timestamp = z, n.isProcessing = !0, a.process(n), c.process(n), d.process(n), h.process(n), p.process(n), m.process(n), y.process(n), b.process(n), n.isProcessing = !1, e && t && (s = !1, i(S));
  }, E = () => {
    e = !0, s = !0, n.isProcessing || i(S);
  };
  return { schedule: Me.reduce((z, F) => {
    const I = r[F];
    return z[F] = (V, U = !1, L = !1) => (e || E(), I.schedule(V, U, L)), z;
  }, {}), cancel: (z) => {
    for (let F = 0; F < Me.length; F++)
      r[Me[F]].cancel(z);
  }, state: n, steps: r };
}
const { schedule: ot, cancel: Ht, state: he } = /* @__PURE__ */ Tn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : _t, !0);
let Re;
function Kr() {
  Re = void 0;
}
const ct = {
  now: () => (Re === void 0 && ct.set(he.isProcessing || It.useManualTiming ? he.timestamp : performance.now()), Re),
  set: (i) => {
    Re = i, queueMicrotask(Kr);
  }
}, On = (i) => (t) => typeof t == "string" && t.startsWith(i), In = /* @__PURE__ */ On("--"), Yr = /* @__PURE__ */ On("var(--"), Vi = (i) => Yr(i) ? jr.test(i.split("/*")[0].trim()) : !1, jr = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Xt = {
  test: (i) => typeof i == "number",
  parse: parseFloat,
  transform: (i) => i
}, ue = {
  ...Xt,
  transform: (i) => Mt(0, 1, i)
}, ke = {
  ...Xt,
  default: 1
}, le = (i) => Math.round(i * 1e5) / 1e5, Ni = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Gr(i) {
  return i == null;
}
const Xr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, $i = (i, t) => (e) => !!(typeof e == "string" && Xr.test(e) && e.startsWith(i) || t && !Gr(e) && Object.prototype.hasOwnProperty.call(e, t)), xn = (i, t, e) => (s) => {
  if (typeof s != "string")
    return s;
  const [n, o, r, a] = s.match(Ni);
  return {
    [i]: parseFloat(n),
    [t]: parseFloat(o),
    [e]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Zr = (i) => Mt(0, 255, i), oi = {
  ...Xt,
  transform: (i) => Math.round(Zr(i))
}, Ft = {
  test: /* @__PURE__ */ $i("rgb", "red"),
  parse: /* @__PURE__ */ xn("red", "green", "blue"),
  transform: ({ red: i, green: t, blue: e, alpha: s = 1 }) => "rgba(" + oi.transform(i) + ", " + oi.transform(t) + ", " + oi.transform(e) + ", " + le(ue.transform(s)) + ")"
};
function Qr(i) {
  let t = "", e = "", s = "", n = "";
  return i.length > 5 ? (t = i.substring(1, 3), e = i.substring(3, 5), s = i.substring(5, 7), n = i.substring(7, 9)) : (t = i.substring(1, 2), e = i.substring(2, 3), s = i.substring(3, 4), n = i.substring(4, 5), t += t, e += e, s += s, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(s, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const fi = {
  test: /* @__PURE__ */ $i("#"),
  parse: Qr,
  transform: Ft.transform
}, we = /* @__NO_SIDE_EFFECTS__ */ (i) => ({
  test: (t) => typeof t == "string" && t.endsWith(i) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${i}`
}), Lt = /* @__PURE__ */ we("deg"), jt = /* @__PURE__ */ we("%"), x = /* @__PURE__ */ we("px"), Jr = /* @__PURE__ */ we("vh"), ta = /* @__PURE__ */ we("vw"), Os = {
  ...jt,
  parse: (i) => jt.parse(i) / 100,
  transform: (i) => jt.transform(i * 100)
}, Ut = {
  test: /* @__PURE__ */ $i("hsl", "hue"),
  parse: /* @__PURE__ */ xn("hue", "saturation", "lightness"),
  transform: ({ hue: i, saturation: t, lightness: e, alpha: s = 1 }) => "hsla(" + Math.round(i) + ", " + jt.transform(le(t)) + ", " + jt.transform(le(e)) + ", " + le(ue.transform(s)) + ")"
}, tt = {
  test: (i) => Ft.test(i) || fi.test(i) || Ut.test(i),
  parse: (i) => Ft.test(i) ? Ft.parse(i) : Ut.test(i) ? Ut.parse(i) : fi.parse(i),
  transform: (i) => typeof i == "string" ? i : i.hasOwnProperty("red") ? Ft.transform(i) : Ut.transform(i),
  getAnimatableNone: (i) => {
    const t = tt.parse(i);
    return t.alpha = 0, tt.transform(t);
  }
}, ea = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ia(i) {
  var t, e;
  return isNaN(i) && typeof i == "string" && (((t = i.match(Ni)) == null ? void 0 : t.length) || 0) + (((e = i.match(ea)) == null ? void 0 : e.length) || 0) > 0;
}
const Cn = "number", Ln = "color", sa = "var", na = "var(", Is = "${}", oa = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function de(i) {
  const t = i.toString(), e = [], s = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let o = 0;
  const a = t.replace(oa, (c) => (tt.test(c) ? (s.color.push(o), n.push(Ln), e.push(tt.parse(c))) : c.startsWith(na) ? (s.var.push(o), n.push(sa), e.push(c)) : (s.number.push(o), n.push(Cn), e.push(parseFloat(c))), ++o, Is)).split(Is);
  return { values: e, split: a, indexes: s, types: n };
}
function Pn(i) {
  return de(i).values;
}
function Mn(i) {
  const { split: t, types: e } = de(i), s = t.length;
  return (n) => {
    let o = "";
    for (let r = 0; r < s; r++)
      if (o += t[r], n[r] !== void 0) {
        const a = e[r];
        a === Cn ? o += le(n[r]) : a === Ln ? o += tt.transform(n[r]) : o += n[r];
      }
    return o;
  };
}
const ra = (i) => typeof i == "number" ? 0 : tt.test(i) ? tt.getAnimatableNone(i) : i;
function aa(i) {
  const t = Pn(i);
  return Mn(i)(t.map(ra));
}
const Zt = {
  test: ia,
  parse: Pn,
  createTransformer: Mn,
  getAnimatableNone: aa
};
function ri(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i;
}
function la({ hue: i, saturation: t, lightness: e, alpha: s }) {
  i /= 360, t /= 100, e /= 100;
  let n = 0, o = 0, r = 0;
  if (!t)
    n = o = r = e;
  else {
    const a = e < 0.5 ? e * (1 + t) : e + t - e * t, c = 2 * e - a;
    n = ri(c, a, i + 1 / 3), o = ri(c, a, i), r = ri(c, a, i - 1 / 3);
  }
  return {
    red: Math.round(n * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s
  };
}
function Ve(i, t) {
  return (e) => e > 0 ? t : i;
}
const ve = (i, t, e) => i + (t - i) * e, ai = (i, t, e) => {
  const s = i * i, n = e * (t * t - s) + s;
  return n < 0 ? 0 : Math.sqrt(n);
}, ca = [fi, Ft, Ut], ha = (i) => ca.find((t) => t.test(i));
function xs(i) {
  const t = ha(i);
  if (ye(!!t, `'${i}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(i);
  return t === Ut && (e = la(e)), e;
}
const Cs = (i, t) => {
  const e = xs(i), s = xs(t);
  if (!e || !s)
    return Ve(i, t);
  const n = { ...e };
  return (o) => (n.red = ai(e.red, s.red, o), n.green = ai(e.green, s.green, o), n.blue = ai(e.blue, s.blue, o), n.alpha = ve(e.alpha, s.alpha, o), Ft.transform(n));
}, mi = /* @__PURE__ */ new Set(["none", "hidden"]);
function ua(i, t) {
  return mi.has(i) ? (e) => e <= 0 ? i : t : (e) => e >= 1 ? t : i;
}
function da(i, t) {
  return (e) => ve(i, t, e);
}
function Hi(i) {
  return typeof i == "number" ? da : typeof i == "string" ? Vi(i) ? Ve : tt.test(i) ? Cs : ma : Array.isArray(i) ? kn : typeof i == "object" ? tt.test(i) ? Cs : pa : Ve;
}
function kn(i, t) {
  const e = [...i], s = e.length, n = i.map((o, r) => Hi(o)(o, t[r]));
  return (o) => {
    for (let r = 0; r < s; r++)
      e[r] = n[r](o);
    return e;
  };
}
function pa(i, t) {
  const e = { ...i, ...t }, s = {};
  for (const n in e)
    i[n] !== void 0 && t[n] !== void 0 && (s[n] = Hi(i[n])(i[n], t[n]));
  return (n) => {
    for (const o in s)
      e[o] = s[o](n);
    return e;
  };
}
function fa(i, t) {
  const e = [], s = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const o = t.types[n], r = i.indexes[o][s[o]], a = i.values[r] ?? 0;
    e[n] = a, s[o]++;
  }
  return e;
}
const ma = (i, t) => {
  const e = Zt.createTransformer(t), s = de(i), n = de(t);
  return s.indexes.var.length === n.indexes.var.length && s.indexes.color.length === n.indexes.color.length && s.indexes.number.length >= n.indexes.number.length ? mi.has(i) && !n.values.length || mi.has(t) && !s.values.length ? ua(i, t) : _i(kn(fa(s, n), n.values), e) : (ye(!0, `Complex values '${i}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ve(i, t));
};
function _n(i, t, e) {
  return typeof i == "number" && typeof t == "number" && typeof e == "number" ? ve(i, t, e) : Hi(i)(i, t);
}
const ga = (i) => {
  const t = ({ timestamp: e }) => i(e);
  return {
    start: (e = !0) => ot.update(t, e),
    stop: () => Ht(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => he.isProcessing ? he.timestamp : ct.now()
  };
}, Dn = (i, t, e = 10) => {
  let s = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let o = 0; o < n; o++)
    s += Math.round(i(o / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Ne = 2e4;
function Bi(i) {
  let t = 0;
  const e = 50;
  let s = i.next(t);
  for (; !s.done && t < Ne; )
    t += e, s = i.next(t);
  return t >= Ne ? 1 / 0 : t;
}
function Rn(i, t = 100, e) {
  const s = e({ ...i, keyframes: [0, t] }), n = Math.min(Bi(s), Ne);
  return {
    type: "keyframes",
    ease: (o) => s.next(n * o).value / t,
    duration: /* @__PURE__ */ mt(n)
  };
}
const ya = 5;
function zn(i, t, e) {
  const s = Math.max(t - ya, 0);
  return Di(e - i(s), t - s);
}
const Z = {
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
}, Ls = 1e-3;
function ba({ duration: i = Z.duration, bounce: t = Z.bounce, velocity: e = Z.velocity, mass: s = Z.mass }) {
  let n, o;
  ye(i <= /* @__PURE__ */ ut(Z.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let r = 1 - t;
  r = Mt(Z.minDamping, Z.maxDamping, r), i = Mt(Z.minDuration, Z.maxDuration, /* @__PURE__ */ mt(i)), r < 1 ? (n = (d) => {
    const h = d * r, p = h * i, m = h - e, y = gi(d, r), b = Math.exp(-p);
    return Ls - m / y * b;
  }, o = (d) => {
    const p = d * r * i, m = p * e + e, y = Math.pow(r, 2) * Math.pow(d, 2) * i, b = Math.exp(-p), S = gi(Math.pow(d, 2), r);
    return (-n(d) + Ls > 0 ? -1 : 1) * ((m - y) * b) / S;
  }) : (n = (d) => {
    const h = Math.exp(-d * i), p = (d - e) * i + 1;
    return -1e-3 + h * p;
  }, o = (d) => {
    const h = Math.exp(-d * i), p = (e - d) * (i * i);
    return h * p;
  });
  const a = 5 / i, c = va(n, o, a);
  if (i = /* @__PURE__ */ ut(i), isNaN(c))
    return {
      stiffness: Z.stiffness,
      damping: Z.damping,
      duration: i
    };
  {
    const d = Math.pow(c, 2) * s;
    return {
      stiffness: d,
      damping: r * 2 * Math.sqrt(s * d),
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
function gi(i, t) {
  return i * Math.sqrt(1 - t * t);
}
const Sa = ["duration", "bounce"], Aa = ["stiffness", "damping", "mass"];
function Ps(i, t) {
  return t.some((e) => i[e] !== void 0);
}
function Ea(i) {
  let t = {
    velocity: Z.velocity,
    stiffness: Z.stiffness,
    damping: Z.damping,
    mass: Z.mass,
    isResolvedFromDuration: !1,
    ...i
  };
  if (!Ps(i, Aa) && Ps(i, Sa))
    if (i.visualDuration) {
      const e = i.visualDuration, s = 2 * Math.PI / (e * 1.2), n = s * s, o = 2 * Mt(0.05, 1, 1 - (i.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Z.mass,
        stiffness: n,
        damping: o
      };
    } else {
      const e = ba(i);
      t = {
        ...t,
        ...e,
        mass: Z.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function pe(i = Z.visualDuration, t = Z.bounce) {
  const e = typeof i != "object" ? {
    visualDuration: i,
    keyframes: [0, 1],
    bounce: t
  } : i;
  let { restSpeed: s, restDelta: n } = e;
  const o = e.keyframes[0], r = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: c, damping: d, mass: h, duration: p, velocity: m, isResolvedFromDuration: y } = Ea({
    ...e,
    velocity: -/* @__PURE__ */ mt(e.velocity || 0)
  }), b = m || 0, S = d / (2 * Math.sqrt(c * h)), E = r - o, T = /* @__PURE__ */ mt(Math.sqrt(c / h)), R = Math.abs(E) < 5;
  s || (s = R ? Z.restSpeed.granular : Z.restSpeed.default), n || (n = R ? Z.restDelta.granular : Z.restDelta.default);
  let z;
  if (S < 1) {
    const I = gi(T, S);
    z = (V) => {
      const U = Math.exp(-S * T * V);
      return r - U * ((b + S * T * E) / I * Math.sin(I * V) + E * Math.cos(I * V));
    };
  } else if (S === 1)
    z = (I) => r - Math.exp(-T * I) * (E + (b + T * E) * I);
  else {
    const I = T * Math.sqrt(S * S - 1);
    z = (V) => {
      const U = Math.exp(-S * T * V), L = Math.min(I * V, 300);
      return r - U * ((b + S * T * E) * Math.sinh(L) + I * E * Math.cosh(L)) / I;
    };
  }
  const F = {
    calculatedDuration: y && p || null,
    next: (I) => {
      const V = z(I);
      if (y)
        a.done = I >= p;
      else {
        let U = I === 0 ? b : 0;
        S < 1 && (U = I === 0 ? /* @__PURE__ */ ut(b) : zn(z, I, V));
        const L = Math.abs(U) <= s, H = Math.abs(r - V) <= n;
        a.done = L && H;
      }
      return a.value = a.done ? r : V, a;
    },
    toString: () => {
      const I = Math.min(Bi(F), Ne), V = Dn((U) => F.next(I * U).value, I, 30);
      return I + "ms " + V;
    },
    toTransition: () => {
    }
  };
  return F;
}
pe.applyToOptions = (i) => {
  const t = Rn(i, 100, pe);
  return i.ease = t.ease, i.duration = /* @__PURE__ */ ut(t.duration), i.type = "keyframes", i;
};
function yi({ keyframes: i, velocity: t = 0, power: e = 0.8, timeConstant: s = 325, bounceDamping: n = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: c, restDelta: d = 0.5, restSpeed: h }) {
  const p = i[0], m = {
    done: !1,
    value: p
  }, y = (L) => a !== void 0 && L < a || c !== void 0 && L > c, b = (L) => a === void 0 ? c : c === void 0 || Math.abs(a - L) < Math.abs(c - L) ? a : c;
  let S = e * t;
  const E = p + S, T = r === void 0 ? E : r(E);
  T !== E && (S = T - p);
  const R = (L) => -S * Math.exp(-L / s), z = (L) => T + R(L), F = (L) => {
    const H = R(L), et = z(L);
    m.done = Math.abs(H) <= d, m.value = m.done ? T : et;
  };
  let I, V;
  const U = (L) => {
    y(m.value) && (I = L, V = pe({
      keyframes: [m.value, b(m.value)],
      velocity: zn(z, L, m.value),
      // TODO: This should be passing * 1000
      damping: n,
      stiffness: o,
      restDelta: d,
      restSpeed: h
    }));
  };
  return U(0), {
    calculatedDuration: null,
    next: (L) => {
      let H = !1;
      return !V && I === void 0 && (H = !0, F(L), U(L)), I !== void 0 && L >= I ? V.next(L - I) : (!H && F(L), m);
    }
  };
}
function Ta(i, t, e) {
  const s = [], n = e || It.mix || _n, o = i.length - 1;
  for (let r = 0; r < o; r++) {
    let a = n(i[r], i[r + 1]);
    if (t) {
      const c = Array.isArray(t) ? t[r] || _t : t;
      a = _i(c, a);
    }
    s.push(a);
  }
  return s;
}
function Fn(i, t, { clamp: e = !0, ease: s, mixer: n } = {}) {
  const o = i.length;
  if (wt(o === t.length, "Both input and output ranges must be the same length", "range-length"), o === 1)
    return () => t[0];
  if (o === 2 && t[0] === t[1])
    return () => t[1];
  const r = i[0] === i[1];
  i[0] > i[o - 1] && (i = [...i].reverse(), t = [...t].reverse());
  const a = Ta(t, s, n), c = a.length, d = (h) => {
    if (r && h < i[0])
      return t[0];
    let p = 0;
    if (c > 1)
      for (; p < i.length - 2 && !(h < i[p + 1]); p++)
        ;
    const m = /* @__PURE__ */ Be(i[p], i[p + 1], h);
    return a[p](m);
  };
  return e ? (h) => d(Mt(i[0], i[o - 1], h)) : d;
}
function Vn(i, t) {
  const e = i[i.length - 1];
  for (let s = 1; s <= t; s++) {
    const n = /* @__PURE__ */ Be(0, t, s);
    i.push(ve(e, 1, n));
  }
}
function qi(i) {
  const t = [0];
  return Vn(t, i.length - 1), t;
}
function Oa(i, t) {
  return i.map((e) => e * t);
}
function Ia(i, t) {
  return i.map(() => t || vn).splice(0, i.length - 1);
}
function Kt({ duration: i = 300, keyframes: t, times: e, ease: s = "easeInOut" }) {
  const n = Sn(s) ? s.map(pi) : pi(s), o = {
    done: !1,
    value: t[0]
  }, r = Oa(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : qi(t),
    i
  ), a = Fn(r, t, {
    ease: Array.isArray(n) ? n : Ia(t, n)
  });
  return {
    calculatedDuration: i,
    next: (c) => (o.value = a(c), o.done = c >= i, o)
  };
}
const xa = (i) => i !== null;
function Wi(i, { repeat: t, repeatType: e = "loop" }, s, n = 1) {
  const o = i.filter(xa), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : o.length - 1;
  return !a || s === void 0 ? o[a] : s;
}
const Ca = {
  decay: yi,
  inertia: yi,
  tween: Kt,
  keyframes: Kt,
  spring: pe
};
function Nn(i) {
  typeof i.type == "string" && (i.type = Ca[i.type]);
}
class Ui {
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
const La = (i) => i / 100;
class Ki extends Ui {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var s, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== ct.now() && this.tick(ct.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (s = this.options).onStop) == null || n.call(s));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Nn(t);
    const { type: e = Kt, repeat: s = 0, repeatDelay: n = 0, repeatType: o, velocity: r = 0 } = t;
    let { keyframes: a } = t;
    const c = e || Kt;
    process.env.NODE_ENV !== "production" && c !== Kt && wt(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), c !== Kt && typeof a[0] != "number" && (this.mixKeyframes = _i(La, _n(a[0], a[1])), a = [0, 100]);
    const d = c({ ...t, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = c({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -r
    })), d.calculatedDuration === null && (d.calculatedDuration = Bi(d));
    const { calculatedDuration: h } = d;
    this.calculatedDuration = h, this.resolvedDuration = h + n, this.totalDuration = this.resolvedDuration * (s + 1) - n, this.generator = d;
  }
  updateTime(t) {
    const e = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = e;
  }
  tick(t, e = !1) {
    const { generator: s, totalDuration: n, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: c } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: d = 0, keyframes: h, repeat: p, repeatType: m, repeatDelay: y, type: b, onUpdate: S, finalKeyframe: E } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const T = this.currentTime - d * (this.playbackSpeed >= 0 ? 1 : -1), R = this.playbackSpeed >= 0 ? T < 0 : T > n;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let z = this.currentTime, F = s;
    if (p) {
      const L = Math.min(this.currentTime, n) / a;
      let H = Math.floor(L), et = L % 1;
      !et && L >= 1 && (et = 1), et === 1 && H--, H = Math.min(H, p + 1), !!(H % 2) && (m === "reverse" ? (et = 1 - et, y && (et -= y / a)) : m === "mirror" && (F = r)), z = Mt(0, 1, et) * a;
    }
    const I = R ? { done: !1, value: h[0] } : F.next(z);
    o && (I.value = o(I.value));
    let { done: V } = I;
    !R && c !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const U = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return U && b !== yi && (I.value = Wi(h, this.options, E, this.speed)), S && S(I.value), U && this.finish(), I;
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
    return /* @__PURE__ */ mt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ mt(t);
  }
  get time() {
    return /* @__PURE__ */ mt(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ ut(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(ct.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ mt(this.currentTime));
  }
  play() {
    var n, o;
    if (this.isStopped)
      return;
    const { driver: t = ga, startTime: e } = this.options;
    this.driver || (this.driver = t((r) => this.tick(r))), (o = (n = this.options).onPlay) == null || o.call(n);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = e ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(ct.now()), this.holdTime = this.currentTime;
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
function Pa(i) {
  for (let t = 1; t < i.length; t++)
    i[t] ?? (i[t] = i[t - 1]);
}
const Vt = (i) => i * 180 / Math.PI, bi = (i) => {
  const t = Vt(Math.atan2(i[1], i[0]));
  return wi(t);
}, Ma = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (i) => (Math.abs(i[0]) + Math.abs(i[3])) / 2,
  rotate: bi,
  rotateZ: bi,
  skewX: (i) => Vt(Math.atan(i[1])),
  skewY: (i) => Vt(Math.atan(i[2])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[2])) / 2
}, wi = (i) => (i = i % 360, i < 0 && (i += 360), i), Ms = bi, ks = (i) => Math.sqrt(i[0] * i[0] + i[1] * i[1]), _s = (i) => Math.sqrt(i[4] * i[4] + i[5] * i[5]), ka = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ks,
  scaleY: _s,
  scale: (i) => (ks(i) + _s(i)) / 2,
  rotateX: (i) => wi(Vt(Math.atan2(i[6], i[5]))),
  rotateY: (i) => wi(Vt(Math.atan2(-i[2], i[0]))),
  rotateZ: Ms,
  rotate: Ms,
  skewX: (i) => Vt(Math.atan(i[4])),
  skewY: (i) => Vt(Math.atan(i[1])),
  skew: (i) => (Math.abs(i[1]) + Math.abs(i[4])) / 2
};
function vi(i) {
  return i.includes("scale") ? 1 : 0;
}
function Si(i, t) {
  if (!i || i === "none")
    return vi(t);
  const e = i.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, n;
  if (e)
    s = ka, n = e;
  else {
    const a = i.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Ma, n = a;
  }
  if (!n)
    return vi(t);
  const o = s[t], r = n[1].split(",").map(Da);
  return typeof o == "function" ? o(r) : r[o];
}
const _a = (i, t) => {
  const { transform: e = "none" } = getComputedStyle(i);
  return Si(e, t);
};
function Da(i) {
  return parseFloat(i.trim());
}
const Qt = [
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
], Jt = new Set(Qt), Ds = (i) => i === Xt || i === x, Ra = /* @__PURE__ */ new Set(["x", "y", "z"]), za = Qt.filter((i) => !Ra.has(i));
function Fa(i) {
  const t = [];
  return za.forEach((e) => {
    const s = i.getValue(e);
    s !== void 0 && (t.push([e, s.get()]), s.set(e.startsWith("scale") ? 1 : 0));
  }), t;
}
const Nt = {
  // Dimensions
  width: ({ x: i }, { paddingLeft: t = "0", paddingRight: e = "0" }) => i.max - i.min - parseFloat(t) - parseFloat(e),
  height: ({ y: i }, { paddingTop: t = "0", paddingBottom: e = "0" }) => i.max - i.min - parseFloat(t) - parseFloat(e),
  top: (i, { top: t }) => parseFloat(t),
  left: (i, { left: t }) => parseFloat(t),
  bottom: ({ y: i }, { top: t }) => parseFloat(t) + (i.max - i.min),
  right: ({ x: i }, { left: t }) => parseFloat(t) + (i.max - i.min),
  // Transform
  x: (i, { transform: t }) => Si(t, "x"),
  y: (i, { transform: t }) => Si(t, "y")
};
Nt.translateX = Nt.x;
Nt.translateY = Nt.y;
const $t = /* @__PURE__ */ new Set();
let Ai = !1, Ei = !1, Ti = !1;
function $n() {
  if (Ei) {
    const i = Array.from($t).filter((s) => s.needsMeasurement), t = new Set(i.map((s) => s.element)), e = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const n = Fa(s);
      n.length && (e.set(s, n), s.render());
    }), i.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const n = e.get(s);
      n && n.forEach(([o, r]) => {
        var a;
        (a = s.getValue(o)) == null || a.set(r);
      });
    }), i.forEach((s) => s.measureEndState()), i.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Ei = !1, Ai = !1, $t.forEach((i) => i.complete(Ti)), $t.clear();
}
function Hn() {
  $t.forEach((i) => {
    i.readKeyframes(), i.needsMeasurement && (Ei = !0);
  });
}
function Va() {
  Ti = !0, Hn(), $n(), Ti = !1;
}
class Yi {
  constructor(t, e, s, n, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = s, this.motionValue = n, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? ($t.add(this), Ai || (Ai = !0, ot.read(Hn), ot.resolveKeyframes($n))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: e, element: s, motionValue: n } = this;
    if (t[0] === null) {
      const o = n == null ? void 0 : n.get(), r = t[t.length - 1];
      if (o !== void 0)
        t[0] = o;
      else if (s && e) {
        const a = s.readValue(e, r);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = r), n && o === void 0 && n.set(t[0]);
    }
    Pa(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), $t.delete(this);
  }
  cancel() {
    this.state === "scheduled" && ($t.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Na = (i) => i.startsWith("--");
function $a(i, t, e) {
  Na(t) ? i.style.setProperty(t, e) : i.style[t] = e;
}
const Bn = /* @__PURE__ */ ki(() => window.ScrollTimeline !== void 0), Ha = {};
function Ba(i, t) {
  const e = /* @__PURE__ */ ki(i);
  return () => Ha[t] ?? e();
}
const qn = /* @__PURE__ */ Ba(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), re = ([i, t, e, s]) => `cubic-bezier(${i}, ${t}, ${e}, ${s})`, Rs = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ re([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ re([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ re([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ re([0.33, 1.53, 0.69, 0.99])
};
function Wn(i, t) {
  if (i)
    return typeof i == "function" ? qn() ? Dn(i, t) : "ease-out" : En(i) ? re(i) : Array.isArray(i) ? i.map((e) => Wn(e, t) || Rs.easeOut) : Rs[i];
}
function qa(i, t, e, { delay: s = 0, duration: n = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: c } = {}, d = void 0) {
  const h = {
    [t]: e
  };
  c && (h.offset = c);
  const p = Wn(a, n);
  Array.isArray(p) && (h.easing = p);
  const m = {
    delay: s,
    duration: n,
    easing: Array.isArray(p) ? "linear" : p,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return d && (m.pseudoElement = d), i.animate(h, m);
}
function ji(i) {
  return typeof i == "function" && "applyToOptions" in i;
}
function Wa({ type: i, ...t }) {
  return ji(i) && qn() ? i.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class Ua extends Ui {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: s, keyframes: n, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: c } = t;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = t, wt(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const d = Wa(t);
    this.animation = qa(e, s, n, d, o), d.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const h = Wi(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(h) : $a(e, s, h), this.animation.cancel();
      }
      c == null || c(), this.notifyFinished();
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
    return /* @__PURE__ */ mt(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ mt(t);
  }
  get time() {
    return /* @__PURE__ */ mt(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ ut(t);
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
    return this.allowFlatten && ((s = this.animation.effect) == null || s.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Bn() ? (this.animation.timeline = t, _t) : e(this);
  }
}
const Un = {
  anticipate: bn,
  backInOut: yn,
  circInOut: wn
};
function Ka(i) {
  return i in Un;
}
function Ya(i) {
  typeof i.ease == "string" && Ka(i.ease) && (i.ease = Un[i.ease]);
}
const zs = 10;
class ja extends Ua {
  constructor(t) {
    Ya(t), Nn(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const { motionValue: e, onUpdate: s, onComplete: n, element: o, ...r } = this.options;
    if (!e)
      return;
    if (t !== void 0) {
      e.set(t);
      return;
    }
    const a = new Ki({
      ...r,
      autoplay: !1
    }), c = /* @__PURE__ */ ut(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(c - zs).value, a.sample(c).value, zs), a.stop();
  }
}
const Fs = (i, t) => t === "zIndex" ? !1 : !!(typeof i == "number" || Array.isArray(i) || typeof i == "string" && // It's animatable if we have a string
(Zt.test(i) || i === "0") && // And it contains numbers and/or colors
!i.startsWith("url("));
function Ga(i) {
  const t = i[0];
  if (i.length === 1)
    return !0;
  for (let e = 0; e < i.length; e++)
    if (i[e] !== t)
      return !0;
}
function Xa(i, t, e, s) {
  const n = i[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const o = i[i.length - 1], r = Fs(n, t), a = Fs(o, t);
  return ye(r === a, `You are trying to animate ${t} from "${n}" to "${o}". "${r ? o : n}" is not an animatable value.`, "value-not-animatable"), !r || !a ? !1 : Ga(i) || (e === "spring" || ji(e)) && s;
}
function Oi(i) {
  i.duration = 0, i.type = "keyframes";
}
const Za = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Qa = /* @__PURE__ */ ki(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ja(i) {
  var h;
  const { motionValue: t, name: e, repeatDelay: s, repeatType: n, damping: o, type: r } = i;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: c, transformTemplate: d } = t.owner.getProps();
  return Qa() && e && Za.has(e) && (e !== "transform" || !d) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !c && !s && n !== "mirror" && o !== 0 && r !== "inertia";
}
const tl = 40;
class el extends Ui {
  constructor({ autoplay: t = !0, delay: e = 0, type: s = "keyframes", repeat: n = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: c, motionValue: d, element: h, ...p }) {
    var b;
    super(), this.stop = () => {
      var S, E;
      this._animation && (this._animation.stop(), (S = this.stopTimeline) == null || S.call(this)), (E = this.keyframeResolver) == null || E.cancel();
    }, this.createdAt = ct.now();
    const m = {
      autoplay: t,
      delay: e,
      type: s,
      repeat: n,
      repeatDelay: o,
      repeatType: r,
      name: c,
      motionValue: d,
      element: h,
      ...p
    }, y = (h == null ? void 0 : h.KeyframeResolver) || Yi;
    this.keyframeResolver = new y(a, (S, E, T) => this.onKeyframesResolved(S, E, m, !T), c, d, h), (b = this.keyframeResolver) == null || b.scheduleResolve();
  }
  onKeyframesResolved(t, e, s, n) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: c, isHandoff: d, onUpdate: h } = s;
    this.resolvedAt = ct.now(), Xa(t, o, r, a) || ((It.instantAnimations || !c) && (h == null || h(Wi(t, s, e))), t[0] = t[t.length - 1], Oi(s), s.repeat = 0);
    const m = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > tl ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...s,
      keyframes: t
    }, y = !d && Ja(m) ? new ja({
      ...m,
      element: m.motionValue.owner.current
    }) : new Ki(m);
    y.finished.then(() => this.notifyFinished()).catch(_t), this.pendingTimeline && (this.stopTimeline = y.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = y;
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), Va()), this._animation;
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
    return Vs(this.animations, "duration");
  }
  get iterationDuration() {
    return Vs(this.animations, "iterationDuration");
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
function Vs(i, t) {
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
function ol(i) {
  const t = nl.exec(i);
  if (!t)
    return [,];
  const [, e, s, n] = t;
  return [`--${e ?? s}`, n];
}
const rl = 4;
function Kn(i, t, e = 1) {
  wt(e <= rl, `Max CSS variable fallback depth detected in property "${i}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, n] = ol(i);
  if (!s)
    return;
  const o = window.getComputedStyle(t).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return cn(r) ? parseFloat(r) : r;
  }
  return Vi(n) ? Kn(n, t, e + 1) : n;
}
function Yn(i, t) {
  return (i == null ? void 0 : i[t]) ?? (i == null ? void 0 : i.default) ?? i;
}
const jn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Qt
]), al = {
  test: (i) => i === "auto",
  parse: (i) => i
}, Gn = (i) => (t) => t.test(i), Xn = [Xt, x, jt, Lt, ta, Jr, al], Ns = (i) => Xn.find(Gn(i));
function ll(i) {
  return typeof i == "number" ? i === 0 : i !== null ? i === "none" || i === "0" || un(i) : !0;
}
const cl = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function hl(i) {
  const [t, e] = i.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return i;
  const [s] = e.match(Ni) || [];
  if (!s)
    return i;
  const n = e.replace(s, "");
  let o = cl.has(t) ? 1 : 0;
  return s !== e && (o *= 100), t + "(" + o + n + ")";
}
const ul = /\b([a-z-]*)\(.*?\)/gu, Ii = {
  ...Zt,
  getAnimatableNone: (i) => {
    const t = i.match(ul);
    return t ? t.map(hl).join(" ") : i;
  }
}, $s = {
  ...Xt,
  transform: Math.round
}, dl = {
  rotate: Lt,
  rotateX: Lt,
  rotateY: Lt,
  rotateZ: Lt,
  scale: ke,
  scaleX: ke,
  scaleY: ke,
  scaleZ: ke,
  skew: Lt,
  skewX: Lt,
  skewY: Lt,
  distance: x,
  translateX: x,
  translateY: x,
  translateZ: x,
  x,
  y: x,
  z: x,
  perspective: x,
  transformPerspective: x,
  opacity: ue,
  originX: Os,
  originY: Os,
  originZ: x
}, Gi = {
  // Border props
  borderWidth: x,
  borderTopWidth: x,
  borderRightWidth: x,
  borderBottomWidth: x,
  borderLeftWidth: x,
  borderRadius: x,
  radius: x,
  borderTopLeftRadius: x,
  borderTopRightRadius: x,
  borderBottomRightRadius: x,
  borderBottomLeftRadius: x,
  // Positioning props
  width: x,
  maxWidth: x,
  height: x,
  maxHeight: x,
  top: x,
  right: x,
  bottom: x,
  left: x,
  // Spacing props
  padding: x,
  paddingTop: x,
  paddingRight: x,
  paddingBottom: x,
  paddingLeft: x,
  margin: x,
  marginTop: x,
  marginRight: x,
  marginBottom: x,
  marginLeft: x,
  // Misc
  backgroundPositionX: x,
  backgroundPositionY: x,
  ...dl,
  zIndex: $s,
  // SVG
  fillOpacity: ue,
  strokeOpacity: ue,
  numOctaves: $s
}, pl = {
  ...Gi,
  // Color props
  color: tt,
  backgroundColor: tt,
  outlineColor: tt,
  fill: tt,
  stroke: tt,
  // Border props
  borderColor: tt,
  borderTopColor: tt,
  borderRightColor: tt,
  borderBottomColor: tt,
  borderLeftColor: tt,
  filter: Ii,
  WebkitFilter: Ii
}, Zn = (i) => pl[i];
function Qn(i, t) {
  let e = Zn(i);
  return e !== Ii && (e = Zt), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const fl = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function ml(i, t, e) {
  let s = 0, n;
  for (; s < i.length && !n; ) {
    const o = i[s];
    typeof o == "string" && !fl.has(o) && de(o).values.length && (n = i[s]), s++;
  }
  if (n && e)
    for (const o of t)
      i[o] = Qn(e, n);
}
class gl extends Yi {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: e, name: s } = this;
    if (!e || !e.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      let d = t[c];
      if (typeof d == "string" && (d = d.trim(), Vi(d))) {
        const h = Kn(d, e.current);
        h !== void 0 && (t[c] = h), c === t.length - 1 && (this.finalKeyframe = d);
      }
    }
    if (this.resolveNoneKeyframes(), !jn.has(s) || t.length !== 2)
      return;
    const [n, o] = t, r = Ns(n), a = Ns(o);
    if (r !== a)
      if (Ds(r) && Ds(a))
        for (let c = 0; c < t.length; c++) {
          const d = t[c];
          typeof d == "string" && (t[c] = parseFloat(d));
        }
      else Nt[s] && (this.needsMeasurement = !0);
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
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Nt[s](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
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
    const o = s.length - 1, r = s[o];
    s[o] = Nt[e](t.measureViewportBox(), window.getComputedStyle(t.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([c, d]) => {
      t.getValue(c).set(d);
    }), this.resolveNoneKeyframes();
  }
}
function Jn(i, t, e) {
  if (i instanceof EventTarget)
    return [i];
  if (typeof i == "string") {
    let s = document;
    const n = (e == null ? void 0 : e[i]) ?? s.querySelectorAll(i);
    return n ? Array.from(n) : [];
  }
  return Array.from(i);
}
const to = (i, t) => t && typeof i == "number" ? t.transform(i) : i;
function yl(i) {
  return hn(i) && "offsetHeight" in i;
}
const Hs = 30, bl = (i) => !isNaN(parseFloat(i));
class wl {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var o;
      const n = ct.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((o = this.events.change) == null || o.notify(this.current), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = ct.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = bl(this.current));
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
    return process.env.NODE_ENV !== "production" && Ri(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new dn());
    const s = this.events[t].add(e);
    return t === "change" ? () => {
      s(), ot.read(() => {
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
    const t = ct.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Hs)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, Hs);
    return Di(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function Gt(i, t) {
  return new wl(i, t);
}
const { schedule: vl } = /* @__PURE__ */ Tn(queueMicrotask, !1);
function Xi(i) {
  return hn(i) && "ownerSVGElement" in i;
}
const ze = /* @__PURE__ */ new WeakMap();
let Pt;
const eo = (i, t, e) => (s, n) => n && n[0] ? n[0][i + "Size"] : Xi(s) && "getBBox" in s ? s.getBBox()[t] : s[e], Sl = /* @__PURE__ */ eo("inline", "width", "offsetWidth"), Al = /* @__PURE__ */ eo("block", "height", "offsetHeight");
function El({ target: i, borderBoxSize: t }) {
  var e;
  (e = ze.get(i)) == null || e.forEach((s) => {
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
function Tl(i) {
  i.forEach(El);
}
function Ol() {
  typeof ResizeObserver > "u" || (Pt = new ResizeObserver(Tl));
}
function Il(i, t) {
  Pt || Ol();
  const e = Jn(i);
  return e.forEach((s) => {
    let n = ze.get(s);
    n || (n = /* @__PURE__ */ new Set(), ze.set(s, n)), n.add(t), Pt == null || Pt.observe(s);
  }), () => {
    e.forEach((s) => {
      const n = ze.get(s);
      n == null || n.delete(t), n != null && n.size || Pt == null || Pt.unobserve(s);
    });
  };
}
const Fe = /* @__PURE__ */ new Set();
let Yt;
function xl() {
  Yt = () => {
    const i = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Fe.forEach((t) => t(i));
  }, window.addEventListener("resize", Yt);
}
function Cl(i) {
  return Fe.add(i), Yt || xl(), () => {
    Fe.delete(i), !Fe.size && typeof Yt == "function" && (window.removeEventListener("resize", Yt), Yt = void 0);
  };
}
function Ll(i, t) {
  return typeof i == "function" ? Cl(i) : Il(i, t);
}
function io(i, t) {
  let e;
  const s = () => {
    const { currentTime: n } = t, r = (n === null ? 0 : n.value) / 100;
    e !== r && i(r), e = r;
  };
  return ot.preUpdate(s, !0), () => Ht(s);
}
function Pl(i) {
  return Xi(i) && i.tagName === "svg";
}
function Ml(i, t) {
  if (i === "first")
    return 0;
  {
    const e = t - 1;
    return i === "last" ? e : e / 2;
  }
}
function xt(i = 0.1, { startDelay: t = 0, from: e = 0, ease: s } = {}) {
  return (n, o) => {
    const r = typeof e == "number" ? e : Ml(e, o), a = Math.abs(r - n);
    let c = i * a;
    if (s) {
      const d = o * i;
      c = pi(s)(c / d) * d;
    }
    return t + c;
  };
}
const it = (i) => !!(i && i.getVelocity), kl = [...Xn, tt, Zt], _l = (i) => kl.find(Gn(i));
function Zi(i) {
  return typeof i == "object" && !Array.isArray(i);
}
function so(i, t, e, s) {
  return typeof i == "string" && Zi(t) ? Jn(i, e, s) : i instanceof NodeList ? Array.from(i) : Array.isArray(i) ? i : [i];
}
function Dl(i, t, e) {
  return i * (t + 1);
}
function Bs(i, t, e, s) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, i + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : s.get(t) ?? i;
}
function Rl(i, t, e) {
  for (let s = 0; s < i.length; s++) {
    const n = i[s];
    n.at > t && n.at < e && (ln(i, n), s--);
  }
}
function zl(i, t, e, s, n, o) {
  Rl(i, n, o);
  for (let r = 0; r < t.length; r++)
    i.push({
      value: t[r],
      at: ve(n, o, s[r]),
      easing: An(e, r)
    });
}
function Fl(i, t) {
  for (let e = 0; e < i.length; e++)
    i[e] = i[e] / (t + 1);
}
function Vl(i, t) {
  return i.at === t.at ? i.value === null ? 1 : t.value === null ? -1 : 0 : i.at - t.at;
}
const Nl = "easeInOut", $l = 20;
function Hl(i, { defaultTransition: t = {}, ...e } = {}, s, n) {
  const o = t.duration || 0.3, r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), c = {}, d = /* @__PURE__ */ new Map();
  let h = 0, p = 0, m = 0;
  for (let y = 0; y < i.length; y++) {
    const b = i[y];
    if (typeof b == "string") {
      d.set(b, p);
      continue;
    } else if (!Array.isArray(b)) {
      d.set(b.name, Bs(p, b.at, h, d));
      continue;
    }
    let [S, E, T = {}] = b;
    T.at !== void 0 && (p = Bs(p, T.at, h, d));
    let R = 0;
    const z = (F, I, V, U = 0, L = 0) => {
      const H = Bl(F), { delay: et = 0, times: st = qi(H), type: vt = "keyframes", repeat: St, repeatType: O, repeatDelay: C = 0, ..._ } = I;
      let { ease: P = t.ease || "easeOut", duration: M } = I;
      const N = typeof et == "function" ? et(U, L) : et, K = H.length, J = ji(vt) ? vt : n == null ? void 0 : n[vt || "keyframes"];
      if (K <= 2 && J) {
        let bt = 100;
        if (K === 2 && Ul(H)) {
          const D = H[1] - H[0];
          bt = Math.abs(D);
        }
        const rt = { ..._ };
        M !== void 0 && (rt.duration = /* @__PURE__ */ ut(M));
        const ht = Rn(rt, bt, J);
        P = ht.ease, M = ht.duration;
      }
      M ?? (M = o);
      const Q = p + N;
      st.length === 1 && st[0] === 0 && (st[1] = 1);
      const k = st.length - H.length;
      if (k > 0 && Vn(st, k), H.length === 1 && H.unshift(null), St) {
        wt(St < $l, "Repeat count too high, must be less than 20", "repeat-count-high"), M = Dl(M, St);
        const bt = [...H], rt = [...st];
        P = Array.isArray(P) ? [...P] : [P];
        const ht = [...P];
        for (let D = 0; D < St; D++) {
          H.push(...bt);
          for (let Y = 0; Y < bt.length; Y++)
            st.push(rt[Y] + (D + 1)), P.push(Y === 0 ? "linear" : An(ht, Y - 1));
        }
        Fl(st, St);
      }
      const pt = Q + M;
      zl(V, H, P, st, Q, pt), R = Math.max(N + M, R), m = Math.max(pt, m);
    };
    if (it(S)) {
      const F = qs(S, a);
      z(E, T, Ws("default", F));
    } else {
      const F = so(S, E, s, c), I = F.length;
      for (let V = 0; V < I; V++) {
        E = E, T = T;
        const U = F[V], L = qs(U, a);
        for (const H in E)
          z(E[H], ql(T, H), Ws(H, L), V, I);
      }
    }
    h = p, p += R;
  }
  return a.forEach((y, b) => {
    for (const S in y) {
      const E = y[S];
      E.sort(Vl);
      const T = [], R = [], z = [];
      for (let I = 0; I < E.length; I++) {
        const { at: V, value: U, easing: L } = E[I];
        T.push(U), R.push(/* @__PURE__ */ Be(0, m, V)), z.push(L || "easeOut");
      }
      R[0] !== 0 && (R.unshift(0), T.unshift(T[0]), z.unshift(Nl)), R[R.length - 1] !== 1 && (R.push(1), T.push(null)), r.has(b) || r.set(b, {
        keyframes: {},
        transition: {}
      });
      const F = r.get(b);
      F.keyframes[S] = T, F.transition[S] = {
        ...t,
        duration: m,
        ease: z,
        times: R,
        ...e
      };
    }
  }), r;
}
function qs(i, t) {
  return !t.has(i) && t.set(i, {}), t.get(i);
}
function Ws(i, t) {
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
const Wl = (i) => typeof i == "number", Ul = (i) => i.every(Wl), fe = /* @__PURE__ */ new WeakMap(), Kl = (i) => Array.isArray(i);
function Us(i) {
  const t = [{}, {}];
  return i == null || i.values.forEach((e, s) => {
    t[0][s] = e.get(), t[1][s] = e.getVelocity();
  }), t;
}
function no(i, t, e, s) {
  if (typeof t == "function") {
    const [n, o] = Us(s);
    t = t(e !== void 0 ? e : i.custom, n, o);
  }
  if (typeof t == "string" && (t = i.variants && i.variants[t]), typeof t == "function") {
    const [n, o] = Us(s);
    t = t(e !== void 0 ? e : i.custom, n, o);
  }
  return t;
}
function Yl(i, t, e) {
  const s = i.getProps();
  return no(s, t, s.custom, i);
}
function jl(i, t, e) {
  i.hasValue(t) ? i.getValue(t).set(e) : i.addValue(t, Gt(e));
}
function Gl(i) {
  return Kl(i) ? i[i.length - 1] || 0 : i;
}
function Xl(i, t) {
  const e = Yl(i, t);
  let { transitionEnd: s = {}, transition: n = {}, ...o } = e || {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = Gl(o[r]);
    jl(i, r, a);
  }
}
function Zl(i) {
  return !!(it(i) && i.add);
}
function Ql(i, t) {
  const e = i.getValue("willChange");
  if (Zl(e))
    return e.add(t);
  if (!e && It.WillChange) {
    const s = new It.WillChange("auto");
    i.addValue("willChange", s), s.add(t);
  }
}
const Qi = (i) => i.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Jl = "framerAppearId", tc = "data-" + Qi(Jl);
function ec(i) {
  return i.props[tc];
}
const ic = (i) => i !== null;
function sc(i, { repeat: t, repeatType: e = "loop" }, s) {
  const n = i.filter(ic), o = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[o];
}
const nc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, oc = (i) => ({
  type: "spring",
  stiffness: 550,
  damping: i === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), rc = {
  type: "keyframes",
  duration: 0.8
}, ac = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, lc = (i, { keyframes: t }) => t.length > 2 ? rc : Jt.has(i) ? i.startsWith("scale") ? oc(t[1]) : nc : ac;
function cc({ when: i, delay: t, delayChildren: e, staggerChildren: s, staggerDirection: n, repeat: o, repeatType: r, repeatDelay: a, from: c, elapsed: d, ...h }) {
  return !!Object.keys(h).length;
}
const oo = (i, t, e, s = {}, n, o) => (r) => {
  const a = Yn(s, i) || {}, c = a.delay || s.delay || 0;
  let { elapsed: d = 0 } = s;
  d = d - /* @__PURE__ */ ut(c);
  const h = {
    keyframes: Array.isArray(e) ? e : [null, e],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -d,
    onUpdate: (m) => {
      t.set(m), a.onUpdate && a.onUpdate(m);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: i,
    motionValue: t,
    element: o ? void 0 : n
  };
  cc(a) || Object.assign(h, lc(i, h)), h.duration && (h.duration = /* @__PURE__ */ ut(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ ut(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let p = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (Oi(h), h.delay === 0 && (p = !0)), (It.instantAnimations || It.skipAnimations) && (p = !0, Oi(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, p && !o && t.get() !== void 0) {
    const m = sc(h.keyframes, a);
    if (m !== void 0) {
      ot.update(() => {
        h.onUpdate(m), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ki(h) : new el(h);
};
function hc({ protectedKeys: i, needsAnimating: t }, e) {
  const s = i.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, s;
}
function uc(i, t, { delay: e = 0, transitionOverride: s, type: n } = {}) {
  let { transition: o = i.getDefaultTransition(), transitionEnd: r, ...a } = t;
  s && (o = s);
  const c = [], d = n && i.animationState && i.animationState.getState()[n];
  for (const h in a) {
    const p = i.getValue(h, i.latestValues[h] ?? null), m = a[h];
    if (m === void 0 || d && hc(d, h))
      continue;
    const y = {
      delay: e,
      ...Yn(o || {}, h)
    }, b = p.get();
    if (b !== void 0 && !p.isAnimating && !Array.isArray(m) && m === b && !y.velocity)
      continue;
    let S = !1;
    if (window.MotionHandoffAnimation) {
      const T = ec(i);
      if (T) {
        const R = window.MotionHandoffAnimation(T, h, ot);
        R !== null && (y.startTime = R, S = !0);
      }
    }
    Ql(i, h), p.start(oo(h, p, m, i.shouldReduceMotion && jn.has(h) ? { type: !1 } : y, i, S));
    const E = p.animation;
    E && c.push(E);
  }
  return r && Promise.all(c).then(() => {
    ot.update(() => {
      r && Xl(i, r);
    });
  }), c;
}
function dc({ top: i, left: t, right: e, bottom: s }) {
  return {
    x: { min: t, max: e },
    y: { min: i, max: s }
  };
}
function pc(i, t) {
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
function fc(i, t) {
  return dc(pc(i.getBoundingClientRect(), t));
}
const Ks = {
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
}, xi = {};
for (const i in Ks)
  xi[i] = {
    isEnabled: (t) => Ks[i].some((e) => !!t[e])
  };
const Ys = () => ({ min: 0, max: 0 }), Ji = () => ({
  x: Ys(),
  y: Ys()
}), mc = typeof window < "u", Ci = { current: null }, ro = { current: !1 };
function gc() {
  if (ro.current = !0, !!mc)
    if (window.matchMedia) {
      const i = window.matchMedia("(prefers-reduced-motion)"), t = () => Ci.current = i.matches;
      i.addEventListener("change", t), t();
    } else
      Ci.current = !1;
}
function yc(i) {
  return i !== null && typeof i == "object" && typeof i.start == "function";
}
function bc(i) {
  return typeof i == "string" || Array.isArray(i);
}
const wc = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], vc = ["initial", ...wc];
function ao(i) {
  return yc(i.animate) || vc.some((t) => bc(i[t]));
}
function Sc(i) {
  return !!(ao(i) || i.variants);
}
function Ac(i, t, e) {
  for (const s in t) {
    const n = t[s], o = e[s];
    if (it(n))
      i.addValue(s, n);
    else if (it(o))
      i.addValue(s, Gt(n, { owner: i }));
    else if (o !== n)
      if (i.hasValue(s)) {
        const r = i.getValue(s);
        r.liveStyle === !0 ? r.jump(n) : r.hasAnimated || r.set(n);
      } else {
        const r = i.getStaticValue(s);
        i.addValue(s, Gt(r !== void 0 ? r : n, { owner: i }));
      }
  }
  for (const s in e)
    t[s] === void 0 && i.removeValue(s);
  return t;
}
const js = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class lo {
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
  constructor({ parent: t, props: e, presenceContext: s, reducedMotionConfig: n, blockInitialAnimation: o, visualState: r }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Yi, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const m = ct.now();
      this.renderScheduledAt < m && (this.renderScheduledAt = m, ot.render(this.render, !1, !0));
    };
    const { latestValues: c, renderState: d } = r;
    this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = e.initial ? { ...c } : {}, this.renderState = d, this.parent = t, this.props = e, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = ao(e), this.isVariantNode = Sc(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...p } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const m in p) {
      const y = p[m];
      c[m] !== void 0 && it(y) && y.set(c[m]);
    }
  }
  mount(t) {
    var e;
    this.current = t, fe.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, n) => this.bindToMotionValue(n, s)), ro.current || gc(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Ci.current, process.env.NODE_ENV !== "production" && Ri(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), Ht(this.notifyUpdate), Ht(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
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
    const s = Jt.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (r) => {
      this.latestValues[t] = r, this.props.onUpdate && ot.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, e)), this.valueSubscriptions.set(t, () => {
      n(), o && o(), e.owner && e.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in xi) {
      const e = xi[t];
      if (!e)
        continue;
      const { isEnabled: s, Feature: n } = e;
      if (!this.features[t] && n && s(this.props) && (this.features[t] = new n(this)), this.features[t]) {
        const o = this.features[t];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ji();
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
    for (let s = 0; s < js.length; s++) {
      const n = js[s];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const o = "on" + n, r = t[o];
      r && (this.propEventSubscriptions[n] = this.on(n, r));
    }
    this.prevMotionValues = Ac(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && e !== void 0 && (s = Gt(e === null ? void 0 : e, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return s != null && (typeof s == "string" && (cn(s) || un(s)) ? s = parseFloat(s) : !_l(s) && Zt.test(e) && (s = Qn(t, e)), this.setBaseTarget(t, it(s) ? s.get() : s)), it(s) ? s.get() : s;
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
    var o;
    const { initial: e } = this.props;
    let s;
    if (typeof e == "string" || typeof e == "object") {
      const r = no(this.props, e, (o = this.presenceContext) == null ? void 0 : o.custom);
      r && (s = r[t]);
    }
    if (e && s !== void 0)
      return s;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !it(n) ? n : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new dn()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    vl.render(this.render);
  }
}
class co extends lo {
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
    it(t) && (this.childSubscription = t.on("change", (e) => {
      this.current && (this.current.textContent = `${e}`);
    }));
  }
}
const Ec = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Tc = Qt.length;
function Oc(i, t, e) {
  let s = "", n = !0;
  for (let o = 0; o < Tc; o++) {
    const r = Qt[o], a = i[r];
    if (a === void 0)
      continue;
    let c = !0;
    if (typeof a == "number" ? c = a === (r.startsWith("scale") ? 1 : 0) : c = parseFloat(a) === 0, !c || e) {
      const d = to(a, Gi[r]);
      if (!c) {
        n = !1;
        const h = Ec[r] || r;
        s += `${h}(${d}) `;
      }
      e && (t[r] = d);
    }
  }
  return s = s.trim(), e ? s = e(t, n ? "" : s) : n && (s = "none"), s;
}
function ho(i, t, e) {
  const { style: s, vars: n, transformOrigin: o } = i;
  let r = !1, a = !1;
  for (const c in t) {
    const d = t[c];
    if (Jt.has(c)) {
      r = !0;
      continue;
    } else if (In(c)) {
      n[c] = d;
      continue;
    } else {
      const h = to(d, Gi[c]);
      c.startsWith("origin") ? (a = !0, o[c] = h) : s[c] = h;
    }
  }
  if (t.transform || (r || e ? s.transform = Oc(t, i.transform, e) : s.transform && (s.transform = "none")), a) {
    const { originX: c = "50%", originY: d = "50%", originZ: h = 0 } = o;
    s.transformOrigin = `${c} ${d} ${h}`;
  }
}
function uo(i, { style: t, vars: e }, s, n) {
  const o = i.style;
  let r;
  for (r in t)
    o[r] = t[r];
  n == null || n.applyProjectionStyles(o, s);
  for (r in e)
    o.setProperty(r, e[r]);
}
const Ic = {};
function xc(i, { layout: t, layoutId: e }) {
  return Jt.has(i) || i.startsWith("origin") || (t || e !== void 0) && (!!Ic[i] || i === "opacity");
}
function po(i, t, e) {
  var o;
  const { style: s } = i, n = {};
  for (const r in s)
    (it(s[r]) || t.style && it(t.style[r]) || xc(r, i) || ((o = e == null ? void 0 : e.getValue(r)) == null ? void 0 : o.liveStyle) !== void 0) && (n[r] = s[r]);
  return n;
}
function Cc(i) {
  return window.getComputedStyle(i);
}
class Lc extends co {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = uo;
  }
  readValueFromInstance(t, e) {
    var s;
    if (Jt.has(e))
      return (s = this.projection) != null && s.isProjecting ? vi(e) : _a(t, e);
    {
      const n = Cc(t), o = (In(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return fc(t, e);
  }
  build(t, e, s) {
    ho(t, e, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, s) {
    return po(t, e, s);
  }
}
function Pc(i, t) {
  return i in t;
}
class Mc extends lo {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (Pc(e, t)) {
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
    return Ji();
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
const kc = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, _c = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Dc(i, t, e = 1, s = 0, n = !0) {
  i.pathLength = 1;
  const o = n ? kc : _c;
  i[o.offset] = x.transform(-s);
  const r = x.transform(t), a = x.transform(e);
  i[o.array] = `${r} ${a}`;
}
function Rc(i, {
  attrX: t,
  attrY: e,
  attrScale: s,
  pathLength: n,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, c, d, h) {
  if (ho(i, a, d), c) {
    i.style.viewBox && (i.attrs.viewBox = i.style.viewBox);
    return;
  }
  i.attrs = i.style, i.style = {};
  const { attrs: p, style: m } = i;
  p.transform && (m.transform = p.transform, delete p.transform), (m.transform || p.transformOrigin) && (m.transformOrigin = p.transformOrigin ?? "50% 50%", delete p.transformOrigin), m.transform && (m.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete p.transformBox), t !== void 0 && (p.x = t), e !== void 0 && (p.y = e), s !== void 0 && (p.scale = s), n !== void 0 && Dc(p, n, o, r, !1);
}
const fo = /* @__PURE__ */ new Set([
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
]), zc = (i) => typeof i == "string" && i.toLowerCase() === "svg";
function Fc(i, t, e, s) {
  uo(i, t, void 0, s);
  for (const n in t.attrs)
    i.setAttribute(fo.has(n) ? n : Qi(n), t.attrs[n]);
}
function Vc(i, t, e) {
  const s = po(i, t, e);
  for (const n in i)
    if (it(i[n]) || it(t[n])) {
      const o = Qt.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      s[o] = i[n];
    }
  return s;
}
class Nc extends co {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ji;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (Jt.has(e)) {
      const s = Zn(e);
      return s && s.default || 0;
    }
    return e = fo.has(e) ? e : Qi(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, s) {
    return Vc(t, e, s);
  }
  build(t, e, s) {
    Rc(t, e, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(t, e, s, n) {
    Fc(t, e, s, n);
  }
  mount(t) {
    this.isSVGTag = zc(t.tagName), super.mount(t);
  }
}
function $c(i) {
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
  }, e = Xi(i) && !Pl(i) ? new Nc(t) : new Lc(t);
  e.mount(i), fe.set(i, e);
}
function Hc(i) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new Mc(t);
  e.mount(i), fe.set(i, e);
}
function Bc(i, t, e) {
  const s = it(i) ? i : Gt(i);
  return s.start(oo("", s, t, e)), s.animation;
}
function qc(i, t) {
  return it(i) || typeof i == "number" || typeof i == "string" && !Zi(t);
}
function mo(i, t, e, s) {
  const n = [];
  if (qc(i, t))
    n.push(Bc(i, Zi(t) && t.default || t, e && (e.default || e)));
  else {
    const o = so(i, t, s), r = o.length;
    wt(!!r, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < r; a++) {
      const c = o[a];
      wt(c !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const d = c instanceof Element ? $c : Hc;
      fe.has(c) || d(c);
      const h = fe.get(c), p = { ...e };
      "delay" in p && typeof p.delay == "function" && (p.delay = p.delay(a, r)), n.push(...uc(h, { ...t, transition: p }, {}));
    }
  }
  return n;
}
function Wc(i, t, e) {
  const s = [];
  return Hl(i, t, e, { spring: pe }).forEach(({ keyframes: o, transition: r }, a) => {
    s.push(...mo(a, o, r));
  }), s;
}
function Uc(i) {
  return Array.isArray(i) && i.some(Array.isArray);
}
function Kc(i) {
  function t(e, s, n) {
    let o = [], r;
    if (Uc(e))
      o = Wc(e, s, i);
    else {
      const { onComplete: c, ...d } = n || {};
      typeof c == "function" && (r = c), o = mo(e, s, d, i);
    }
    const a = new sl(o);
    return r && a.finished.then(r), a;
  }
  return t;
}
const g = Kc(), Yc = 50, Gs = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), jc = () => ({
  time: 0,
  x: Gs(),
  y: Gs()
}), Gc = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function Xs(i, t, e, s) {
  const n = e[t], { length: o, position: r } = Gc[t], a = n.current, c = e.time;
  n.current = i[`scroll${r}`], n.scrollLength = i[`scroll${o}`] - i[`client${o}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = /* @__PURE__ */ Be(0, n.scrollLength, n.current);
  const d = s - c;
  n.velocity = d > Yc ? 0 : Di(n.current - a, d);
}
function Xc(i, t, e) {
  Xs(i, "x", t, e), Xs(i, "y", t, e), t.time = e;
}
function Zc(i, t) {
  const e = { x: 0, y: 0 };
  let s = i;
  for (; s && s !== t; )
    if (yl(s))
      e.x += s.offsetLeft, e.y += s.offsetTop, s = s.offsetParent;
    else if (s.tagName === "svg") {
      const n = s.getBoundingClientRect();
      s = s.parentElement;
      const o = s.getBoundingClientRect();
      e.x += n.left - o.left, e.y += n.top - o.top;
    } else if (s instanceof SVGGraphicsElement) {
      const { x: n, y: o } = s.getBBox();
      e.x += n, e.y += o;
      let r = null, a = s.parentNode;
      for (; !r; )
        a.tagName === "svg" && (r = a), a = s.parentNode;
      s = r;
    } else
      break;
  return e;
}
const Li = {
  start: 0,
  center: 0.5,
  end: 1
};
function Zs(i, t, e = 0) {
  let s = 0;
  if (i in Li && (i = Li[i]), typeof i == "string") {
    const n = parseFloat(i);
    i.endsWith("px") ? s = n : i.endsWith("%") ? i = n / 100 : i.endsWith("vw") ? s = n / 100 * document.documentElement.clientWidth : i.endsWith("vh") ? s = n / 100 * document.documentElement.clientHeight : i = n;
  }
  return typeof i == "number" && (s = t * i), e + s;
}
const Qc = [0, 0];
function Jc(i, t, e, s) {
  let n = Array.isArray(i) ? i : Qc, o = 0, r = 0;
  return typeof i == "number" ? n = [i, i] : typeof i == "string" && (i = i.trim(), i.includes(" ") ? n = i.split(" ") : n = [i, Li[i] ? i : "0"]), o = Zs(n[0], e, s), r = Zs(n[1], t), o - r;
}
const th = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, eh = { x: 0, y: 0 };
function ih(i) {
  return "getBBox" in i && i.tagName !== "svg" ? i.getBBox() : { width: i.clientWidth, height: i.clientHeight };
}
function sh(i, t, e) {
  const { offset: s = th.All } = e, { target: n = i, axis: o = "y" } = e, r = o === "y" ? "height" : "width", a = n !== i ? Zc(n, i) : eh, c = n === i ? { width: i.scrollWidth, height: i.scrollHeight } : ih(n), d = {
    width: i.clientWidth,
    height: i.clientHeight
  };
  t[o].offset.length = 0;
  let h = !t[o].interpolate;
  const p = s.length;
  for (let m = 0; m < p; m++) {
    const y = Jc(s[m], d[r], c[r], a[o]);
    !h && y !== t[o].interpolatorOffsets[m] && (h = !0), t[o].offset[m] = y;
  }
  h && (t[o].interpolate = Fn(t[o].offset, qi(s), { clamp: !1 }), t[o].interpolatorOffsets = [...t[o].offset]), t[o].progress = Mt(0, 1, t[o].interpolate(t[o].current));
}
function nh(i, t = i, e) {
  if (e.x.targetOffset = 0, e.y.targetOffset = 0, t !== i) {
    let s = t;
    for (; s && s !== i; )
      e.x.targetOffset += s.offsetLeft, e.y.targetOffset += s.offsetTop, s = s.offsetParent;
  }
  e.x.targetLength = t === i ? t.scrollWidth : t.clientWidth, e.y.targetLength = t === i ? t.scrollHeight : t.clientHeight, e.x.containerLength = i.clientWidth, e.y.containerLength = i.clientHeight, process.env.NODE_ENV !== "production" && i && t && t !== i && Ri(getComputedStyle(i).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function oh(i, t, e, s = {}) {
  return {
    measure: (n) => {
      nh(i, s.target, e), Xc(i, e, n), (s.offset || s.target) && sh(i, e, s);
    },
    notify: () => t(e)
  };
}
const se = /* @__PURE__ */ new WeakMap(), Qs = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Js = (i) => i === document.scrollingElement ? window : i;
function go(i, { container: t = document.scrollingElement, ...e } = {}) {
  if (!t)
    return _t;
  let s = li.get(t);
  s || (s = /* @__PURE__ */ new Set(), li.set(t, s));
  const n = jc(), o = oh(t, i, n, e);
  if (s.add(o), !se.has(t)) {
    const a = () => {
      for (const p of s)
        p.measure(he.timestamp);
      ot.preUpdate(c);
    }, c = () => {
      for (const p of s)
        p.notify();
    }, d = () => ot.read(a);
    se.set(t, d);
    const h = Js(t);
    window.addEventListener("resize", d, { passive: !0 }), t !== document.documentElement && Qs.set(t, Ll(t, d)), h.addEventListener("scroll", d, { passive: !0 }), d();
  }
  const r = se.get(t);
  return ot.read(r, !1, !0), () => {
    var d;
    Ht(r);
    const a = li.get(t);
    if (!a || (a.delete(o), a.size))
      return;
    const c = se.get(t);
    se.delete(t), c && (Js(t).removeEventListener("scroll", c), (d = Qs.get(t)) == null || d(), window.removeEventListener("resize", c));
  };
}
const tn = /* @__PURE__ */ new Map();
function rh(i) {
  const t = { value: 0 }, e = go((s) => {
    t.value = s[i.axis].progress * 100;
  }, i);
  return { currentTime: t, cancel: e };
}
function yo({ source: i, container: t, ...e }) {
  const { axis: s } = e;
  i && (t = i);
  const n = tn.get(t) ?? /* @__PURE__ */ new Map();
  tn.set(t, n);
  const o = e.target ?? "self", r = n.get(o) ?? {}, a = s + (e.offset ?? []).join(",");
  return r[a] || (r[a] = !e.target && Bn() ? new ScrollTimeline({ source: t, axis: s }) : rh({ container: t, ...e })), r[a];
}
function ah(i, t) {
  const e = yo(t);
  return i.attachTimeline({
    timeline: t.target ? void 0 : e,
    observe: (s) => (s.pause(), io((n) => {
      s.time = s.iterationDuration * n;
    }, e))
  });
}
function lh(i) {
  return i.length === 2;
}
function ch(i, t) {
  return lh(i) ? go((e) => {
    i(e[t.axis].progress, e);
  }, t) : io(i, yo(t));
}
function Gh(i, { axis: t = "y", container: e = document.scrollingElement, ...s } = {}) {
  if (!e)
    return _t;
  const n = { axis: t, container: e, ...s };
  return typeof i == "function" ? ch(i, n) : ah(i, n);
}
function hh(i, t) {
  const e = ct.now(), s = ({ timestamp: n }) => {
    const o = n - e;
    o >= t && (Ht(s), i(o - t));
  };
  return ot.setup(s, !0), () => Ht(s);
}
function uh(i, t) {
  return hh(i, /* @__PURE__ */ ut(t));
}
var _e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dh(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var ae = { exports: {} };
ae.exports;
var en;
function ph() {
  return en || (en = 1, function(i, t) {
    var e = 200, s = "__lodash_hash_undefined__", n = 800, o = 16, r = 9007199254740991, a = "[object Arguments]", c = "[object Array]", d = "[object AsyncFunction]", h = "[object Boolean]", p = "[object Date]", m = "[object Error]", y = "[object Function]", b = "[object GeneratorFunction]", S = "[object Map]", E = "[object Number]", T = "[object Null]", R = "[object Object]", z = "[object Proxy]", F = "[object RegExp]", I = "[object Set]", V = "[object String]", U = "[object Undefined]", L = "[object WeakMap]", H = "[object ArrayBuffer]", et = "[object DataView]", st = "[object Float32Array]", vt = "[object Float64Array]", St = "[object Int8Array]", O = "[object Int16Array]", C = "[object Int32Array]", _ = "[object Uint8Array]", P = "[object Uint8ClampedArray]", M = "[object Uint16Array]", N = "[object Uint32Array]", K = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, Q = /^(?:0|[1-9]\d*)$/, k = {};
    k[st] = k[vt] = k[St] = k[O] = k[C] = k[_] = k[P] = k[M] = k[N] = !0, k[a] = k[c] = k[H] = k[h] = k[et] = k[p] = k[m] = k[y] = k[S] = k[E] = k[R] = k[F] = k[I] = k[V] = k[L] = !1;
    var pt = typeof _e == "object" && _e && _e.Object === Object && _e, bt = typeof self == "object" && self && self.Object === Object && self, rt = pt || bt || Function("return this")(), ht = t && !t.nodeType && t, D = ht && !0 && i && !i.nodeType && i, Y = D && D.exports === ht, j = Y && pt.process, nt = function() {
      try {
        var l = D && D.require && D.require("util").types;
        return l || j && j.binding && j.binding("util");
      } catch {
      }
    }(), at = nt && nt.isTypedArray;
    function At(l, u, f) {
      switch (f.length) {
        case 0:
          return l.call(u);
        case 1:
          return l.call(u, f[0]);
        case 2:
          return l.call(u, f[0], f[1]);
        case 3:
          return l.call(u, f[0], f[1], f[2]);
      }
      return l.apply(u, f);
    }
    function Dt(l, u) {
      for (var f = -1, w = Array(l); ++f < l; )
        w[f] = u(f);
      return w;
    }
    function Bt(l) {
      return function(u) {
        return l(u);
      };
    }
    function Et(l, u) {
      return l == null ? void 0 : l[u];
    }
    function Ae(l, u) {
      return function(f) {
        return l(u(f));
      };
    }
    var Ke = Array.prototype, xo = Function.prototype, Ee = Object.prototype, Ye = rt["__core-js_shared__"], Te = xo.toString, Ct = Ee.hasOwnProperty, ns = function() {
      var l = /[^.]+$/.exec(Ye && Ye.keys && Ye.keys.IE_PROTO || "");
      return l ? "Symbol(src)_1." + l : "";
    }(), os = Ee.toString, Co = Te.call(Object), Lo = RegExp(
      "^" + Te.call(Ct).replace(K, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Oe = Y ? rt.Buffer : void 0, rs = rt.Symbol, as = rt.Uint8Array;
    Oe && Oe.allocUnsafe;
    var ls = Ae(Object.getPrototypeOf, Object), cs = Object.create, Po = Ee.propertyIsEnumerable, Mo = Ke.splice, Rt = rs ? rs.toStringTag : void 0, Ie = function() {
      try {
        var l = Ze(Object, "defineProperty");
        return l({}, "", {}), l;
      } catch {
      }
    }(), ko = Oe ? Oe.isBuffer : void 0, hs = Math.max, _o = Date.now, us = Ze(rt, "Map"), te = Ze(Object, "create"), Do = /* @__PURE__ */ function() {
      function l() {
      }
      return function(u) {
        if (!Ot(u))
          return {};
        if (cs)
          return cs(u);
        l.prototype = u;
        var f = new l();
        return l.prototype = void 0, f;
      };
    }();
    function zt(l) {
      var u = -1, f = l == null ? 0 : l.length;
      for (this.clear(); ++u < f; ) {
        var w = l[u];
        this.set(w[0], w[1]);
      }
    }
    function Ro() {
      this.__data__ = te ? te(null) : {}, this.size = 0;
    }
    function zo(l) {
      var u = this.has(l) && delete this.__data__[l];
      return this.size -= u ? 1 : 0, u;
    }
    function Fo(l) {
      var u = this.__data__;
      if (te) {
        var f = u[l];
        return f === s ? void 0 : f;
      }
      return Ct.call(u, l) ? u[l] : void 0;
    }
    function Vo(l) {
      var u = this.__data__;
      return te ? u[l] !== void 0 : Ct.call(u, l);
    }
    function No(l, u) {
      var f = this.__data__;
      return this.size += this.has(l) ? 0 : 1, f[l] = te && u === void 0 ? s : u, this;
    }
    zt.prototype.clear = Ro, zt.prototype.delete = zo, zt.prototype.get = Fo, zt.prototype.has = Vo, zt.prototype.set = No;
    function Tt(l) {
      var u = -1, f = l == null ? 0 : l.length;
      for (this.clear(); ++u < f; ) {
        var w = l[u];
        this.set(w[0], w[1]);
      }
    }
    function $o() {
      this.__data__ = [], this.size = 0;
    }
    function Ho(l) {
      var u = this.__data__, f = xe(u, l);
      if (f < 0)
        return !1;
      var w = u.length - 1;
      return f == w ? u.pop() : Mo.call(u, f, 1), --this.size, !0;
    }
    function Bo(l) {
      var u = this.__data__, f = xe(u, l);
      return f < 0 ? void 0 : u[f][1];
    }
    function qo(l) {
      return xe(this.__data__, l) > -1;
    }
    function Wo(l, u) {
      var f = this.__data__, w = xe(f, l);
      return w < 0 ? (++this.size, f.push([l, u])) : f[w][1] = u, this;
    }
    Tt.prototype.clear = $o, Tt.prototype.delete = Ho, Tt.prototype.get = Bo, Tt.prototype.has = qo, Tt.prototype.set = Wo;
    function qt(l) {
      var u = -1, f = l == null ? 0 : l.length;
      for (this.clear(); ++u < f; ) {
        var w = l[u];
        this.set(w[0], w[1]);
      }
    }
    function Uo() {
      this.size = 0, this.__data__ = {
        hash: new zt(),
        map: new (us || Tt)(),
        string: new zt()
      };
    }
    function Ko(l) {
      var u = Le(this, l).delete(l);
      return this.size -= u ? 1 : 0, u;
    }
    function Yo(l) {
      return Le(this, l).get(l);
    }
    function jo(l) {
      return Le(this, l).has(l);
    }
    function Go(l, u) {
      var f = Le(this, l), w = f.size;
      return f.set(l, u), this.size += f.size == w ? 0 : 1, this;
    }
    qt.prototype.clear = Uo, qt.prototype.delete = Ko, qt.prototype.get = Yo, qt.prototype.has = jo, qt.prototype.set = Go;
    function Wt(l) {
      var u = this.__data__ = new Tt(l);
      this.size = u.size;
    }
    function Xo() {
      this.__data__ = new Tt(), this.size = 0;
    }
    function Zo(l) {
      var u = this.__data__, f = u.delete(l);
      return this.size = u.size, f;
    }
    function Qo(l) {
      return this.__data__.get(l);
    }
    function Jo(l) {
      return this.__data__.has(l);
    }
    function tr(l, u) {
      var f = this.__data__;
      if (f instanceof Tt) {
        var w = f.__data__;
        if (!us || w.length < e - 1)
          return w.push([l, u]), this.size = ++f.size, this;
        f = this.__data__ = new qt(w);
      }
      return f.set(l, u), this.size = f.size, this;
    }
    Wt.prototype.clear = Xo, Wt.prototype.delete = Zo, Wt.prototype.get = Qo, Wt.prototype.has = Jo, Wt.prototype.set = tr;
    function er(l, u) {
      var f = ti(l), w = !f && Je(l), $ = !f && !w && ys(l), B = !f && !w && !$ && ws(l), G = f || w || $ || B, q = G ? Dt(l.length, String) : [], X = q.length;
      for (var ft in l)
        G && // Safari 9 has enumerable `arguments.length` in strict mode.
        (ft == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        $ && (ft == "offset" || ft == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        B && (ft == "buffer" || ft == "byteLength" || ft == "byteOffset") || // Skip index properties.
        ms(ft, X)) || q.push(ft);
      return q;
    }
    function je(l, u, f) {
      (f !== void 0 && !Pe(l[u], f) || f === void 0 && !(u in l)) && Ge(l, u, f);
    }
    function ir(l, u, f) {
      var w = l[u];
      (!(Ct.call(l, u) && Pe(w, f)) || f === void 0 && !(u in l)) && Ge(l, u, f);
    }
    function xe(l, u) {
      for (var f = l.length; f--; )
        if (Pe(l[f][0], u))
          return f;
      return -1;
    }
    function Ge(l, u, f) {
      u == "__proto__" && Ie ? Ie(l, u, {
        configurable: !0,
        enumerable: !0,
        value: f,
        writable: !0
      }) : l[u] = f;
    }
    var sr = mr();
    function Ce(l) {
      return l == null ? l === void 0 ? U : T : Rt && Rt in Object(l) ? gr(l) : Ar(l);
    }
    function ds(l) {
      return ee(l) && Ce(l) == a;
    }
    function nr(l) {
      if (!Ot(l) || vr(l))
        return !1;
      var u = ii(l) ? Lo : J;
      return u.test(Ir(l));
    }
    function or(l) {
      return ee(l) && bs(l.length) && !!k[Ce(l)];
    }
    function rr(l) {
      if (!Ot(l))
        return Sr(l);
      var u = gs(l), f = [];
      for (var w in l)
        w == "constructor" && (u || !Ct.call(l, w)) || f.push(w);
      return f;
    }
    function Xe(l, u, f, w, $) {
      l !== u && sr(u, function(B, G) {
        if ($ || ($ = new Wt()), Ot(B))
          ar(l, u, G, f, Xe, w, $);
        else {
          var q = w ? w(Qe(l, G), B, G + "", l, u, $) : void 0;
          q === void 0 && (q = B), je(l, G, q);
        }
      }, vs);
    }
    function ar(l, u, f, w, $, B, G) {
      var q = Qe(l, f), X = Qe(u, f), ft = G.get(X);
      if (ft) {
        je(l, f, ft);
        return;
      }
      var lt = B ? B(q, X, f + "", l, u, G) : void 0, ie = lt === void 0;
      if (ie) {
        var si = ti(X), ni = !si && ys(X), As = !si && !ni && ws(X);
        lt = X, si || ni || As ? ti(q) ? lt = q : xr(q) ? lt = dr(q) : ni ? (ie = !1, lt = cr(X)) : As ? (ie = !1, lt = ur(X)) : lt = [] : Cr(X) || Je(X) ? (lt = q, Je(q) ? lt = Lr(q) : (!Ot(q) || ii(q)) && (lt = yr(X))) : ie = !1;
      }
      ie && (G.set(X, lt), $(lt, X, w, B, G), G.delete(X)), je(l, f, lt);
    }
    function ps(l, u) {
      return Tr(Er(l, u, Ss), l + "");
    }
    var lr = Ie ? function(l, u) {
      return Ie(l, "toString", {
        configurable: !0,
        enumerable: !1,
        value: kr(u),
        writable: !0
      });
    } : Ss;
    function cr(l, u) {
      return l.slice();
    }
    function hr(l) {
      var u = new l.constructor(l.byteLength);
      return new as(u).set(new as(l)), u;
    }
    function ur(l, u) {
      var f = hr(l.buffer);
      return new l.constructor(f, l.byteOffset, l.length);
    }
    function dr(l, u) {
      var f = -1, w = l.length;
      for (u || (u = Array(w)); ++f < w; )
        u[f] = l[f];
      return u;
    }
    function pr(l, u, f, w) {
      var $ = !f;
      f || (f = {});
      for (var B = -1, G = u.length; ++B < G; ) {
        var q = u[B], X = void 0;
        X === void 0 && (X = l[q]), $ ? Ge(f, q, X) : ir(f, q, X);
      }
      return f;
    }
    function fr(l) {
      return ps(function(u, f) {
        var w = -1, $ = f.length, B = $ > 1 ? f[$ - 1] : void 0, G = $ > 2 ? f[2] : void 0;
        for (B = l.length > 3 && typeof B == "function" ? ($--, B) : void 0, G && br(f[0], f[1], G) && (B = $ < 3 ? void 0 : B, $ = 1), u = Object(u); ++w < $; ) {
          var q = f[w];
          q && l(u, q, w, B);
        }
        return u;
      });
    }
    function mr(l) {
      return function(u, f, w) {
        for (var $ = -1, B = Object(u), G = w(u), q = G.length; q--; ) {
          var X = G[++$];
          if (f(B[X], X, B) === !1)
            break;
        }
        return u;
      };
    }
    function fs(l, u, f, w, $, B) {
      return Ot(l) && Ot(u) && (B.set(u, l), Xe(l, u, void 0, fs, B), B.delete(u)), l;
    }
    function Le(l, u) {
      var f = l.__data__;
      return wr(u) ? f[typeof u == "string" ? "string" : "hash"] : f.map;
    }
    function Ze(l, u) {
      var f = Et(l, u);
      return nr(f) ? f : void 0;
    }
    function gr(l) {
      var u = Ct.call(l, Rt), f = l[Rt];
      try {
        l[Rt] = void 0;
        var w = !0;
      } catch {
      }
      var $ = os.call(l);
      return w && (u ? l[Rt] = f : delete l[Rt]), $;
    }
    function yr(l) {
      return typeof l.constructor == "function" && !gs(l) ? Do(ls(l)) : {};
    }
    function ms(l, u) {
      var f = typeof l;
      return u = u ?? r, !!u && (f == "number" || f != "symbol" && Q.test(l)) && l > -1 && l % 1 == 0 && l < u;
    }
    function br(l, u, f) {
      if (!Ot(f))
        return !1;
      var w = typeof u;
      return (w == "number" ? ei(f) && ms(u, f.length) : w == "string" && u in f) ? Pe(f[u], l) : !1;
    }
    function wr(l) {
      var u = typeof l;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? l !== "__proto__" : l === null;
    }
    function vr(l) {
      return !!ns && ns in l;
    }
    function gs(l) {
      var u = l && l.constructor, f = typeof u == "function" && u.prototype || Ee;
      return l === f;
    }
    function Sr(l) {
      var u = [];
      if (l != null)
        for (var f in Object(l))
          u.push(f);
      return u;
    }
    function Ar(l) {
      return os.call(l);
    }
    function Er(l, u, f) {
      return u = hs(u === void 0 ? l.length - 1 : u, 0), function() {
        for (var w = arguments, $ = -1, B = hs(w.length - u, 0), G = Array(B); ++$ < B; )
          G[$] = w[u + $];
        $ = -1;
        for (var q = Array(u + 1); ++$ < u; )
          q[$] = w[$];
        return q[u] = f(G), At(l, this, q);
      };
    }
    function Qe(l, u) {
      if (!(u === "constructor" && typeof l[u] == "function") && u != "__proto__")
        return l[u];
    }
    var Tr = Or(lr);
    function Or(l) {
      var u = 0, f = 0;
      return function() {
        var w = _o(), $ = o - (w - f);
        if (f = w, $ > 0) {
          if (++u >= n)
            return arguments[0];
        } else
          u = 0;
        return l.apply(void 0, arguments);
      };
    }
    function Ir(l) {
      if (l != null) {
        try {
          return Te.call(l);
        } catch {
        }
        try {
          return l + "";
        } catch {
        }
      }
      return "";
    }
    function Pe(l, u) {
      return l === u || l !== l && u !== u;
    }
    var Je = ds(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ds : function(l) {
      return ee(l) && Ct.call(l, "callee") && !Po.call(l, "callee");
    }, ti = Array.isArray;
    function ei(l) {
      return l != null && bs(l.length) && !ii(l);
    }
    function xr(l) {
      return ee(l) && ei(l);
    }
    var ys = ko || _r;
    function ii(l) {
      if (!Ot(l))
        return !1;
      var u = Ce(l);
      return u == y || u == b || u == d || u == z;
    }
    function bs(l) {
      return typeof l == "number" && l > -1 && l % 1 == 0 && l <= r;
    }
    function Ot(l) {
      var u = typeof l;
      return l != null && (u == "object" || u == "function");
    }
    function ee(l) {
      return l != null && typeof l == "object";
    }
    function Cr(l) {
      if (!ee(l) || Ce(l) != R)
        return !1;
      var u = ls(l);
      if (u === null)
        return !0;
      var f = Ct.call(u, "constructor") && u.constructor;
      return typeof f == "function" && f instanceof f && Te.call(f) == Co;
    }
    var ws = at ? Bt(at) : or;
    function Lr(l) {
      return pr(l, vs(l));
    }
    var Pr = ps(function(l) {
      return l.push(void 0, fs), At(Mr, void 0, l);
    });
    function vs(l) {
      return ei(l) ? er(l) : rr(l);
    }
    var Mr = fr(function(l, u, f, w) {
      Xe(l, u, f, w);
    });
    function kr(l) {
      return function() {
        return l;
      };
    }
    function Ss(l) {
      return l;
    }
    function _r() {
      return !1;
    }
    i.exports = Pr;
  }(ae, ae.exports)), ae.exports;
}
var fh = ph();
const W = /* @__PURE__ */ dh(fh), mh = 60, ne = {}, sn = (i, t = mh) => (...e) => requestAnimationFrame(() => {
  const s = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  ne[i] = ne[i] || null;
  const o = ne[i] ? s - ne[i] : null;
  (o === null || o > n) && (ne[i] = s - o % n, i(...e));
});
function me() {
  if (!window.matchMedia)
    return !1;
  const i = window.matchMedia("(prefers-reduced-motion: reduce)");
  return i ? i.matches : !1;
}
const Pi = (i, t, e, s, n, o) => {
  const r = (i + t) / 2;
  if (e <= 0 || t - i < s)
    return r;
  const a = `(${n}:${r}${o})`;
  return window.matchMedia(a).matches ? Pi(r, t, e - 1, s, n, o) : Pi(i, r, e - 1, s, n, o);
}, gh = (i, t, e, s, n, o) => Pi(e, s, n, o, i, t), yh = () => Math.round(
  gh("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, bh = (i) => Math.round(window.devicePixelRatio * 100) - i, wh = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, ci = {
  firefox: yh,
  chrome: bh,
  default: wh
}, nn = {
  calculate: (i, t) => ci[i] ? ci[i](t) : ci.default(t)
}, ts = "APPLICATION:MOBILE_MENU:OPEN", es = "APPLICATION:MOBILE_MENU:CLOSED", $e = "APPLICATION_PRELUDIUM", Mi = "APPLICATION:INITIALIZED", ge = "APPLICATION:READY", dt = "APPLICATION:REVEALED", yt = "APPLICATION:RESIZE", kt = "APPLICATION:SCROLL", bo = "APPLICATION:SCROLL_LOCKED", wo = "APPLICATION:SCROLL_RELEASED", qe = "APPLICATION:FORCED_SCROLL_START", We = "APPLICATION:FORCED_SCROLL_END", Ue = "APPLICATION:OUTLINE", vo = "APPLICATION:VISIBILITY_CHANGE", So = "APPLICATION:HIDDEN", Ao = "APPLICATION:VISIBLE", He = "BREAKPOINT:CHANGE", is = "IMAGE:LAZYLOADED", Eo = "IMAGE:REVEALED", To = "SECTION:LAZYLOADED", Xh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: We,
  APPLICATION_FORCED_SCROLL_START: qe,
  APPLICATION_HIDDEN: So,
  APPLICATION_INITIALIZED: Mi,
  APPLICATION_MOBILE_MENU_CLOSED: es,
  APPLICATION_MOBILE_MENU_OPEN: ts,
  APPLICATION_OUTLINE: Ue,
  APPLICATION_PRELUDIUM: $e,
  APPLICATION_READY: ge,
  APPLICATION_RESIZE: yt,
  APPLICATION_REVEALED: dt,
  APPLICATION_SCROLL: kt,
  APPLICATION_SCROLL_LOCKED: bo,
  APPLICATION_SCROLL_RELEASED: wo,
  APPLICATION_VISIBILITY_CHANGE: vo,
  APPLICATION_VISIBLE: Ao,
  BREAKPOINT_CHANGE: He,
  IMAGE_LAZYLOADED: is,
  IMAGE_REVEALED: Eo,
  SECTION_LAZYLOADED: To
}, Symbol.toStringTag, { value: "Module" })), vh = {
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
class on {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = W(e, vh), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener($e, () => {
      this.initialize(!1);
    }), window.addEventListener(dt, () => {
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
        const o = e[(e.indexOf(s) + 1) % e.length];
        s === this.opts.breakpoints[0] && this.mediaQueries[s] === "0" ? n = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[o]) - 1}px)` : o === this.opts.breakpoints[0] ? n = `(min-width: ${this.mediaQueries[s]})` : n = `(min-width: ${this.mediaQueries[s]}) and (max-width: ${parseInt(this.mediaQueries[o]) - 1}px)`, this.mediaQueries[s] = window.matchMedia(n);
        const r = (a) => {
          if (a.matches) {
            const c = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), c !== this.currentBreakpoint) {
              const d = new CustomEvent(He, {
                detail: {
                  leaveBreakpoint: c,
                  enterBreakpoint: this.currentBreakpoint
                }
              });
              window.dispatchEvent(d);
            }
          }
          Object.prototype.hasOwnProperty.call(this.opts.listeners, s) && this.opts.listeners[s](a);
        };
        this.mediaQueries[s].addListener(r);
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
        }, n = new CustomEvent(He);
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
class Sh {
  constructor(t, e) {
    this.app = t, this.testFns = {
      touch: this.testTouch
    }, this.results = {}, this.testIE11() ? this.testFor("ie11", !0) : this.results.ie11 = !1, this.testIOS() ? this.testFor("ios", !0) : this.results.ios = !1, this.testWebview() ? this.testFor("webview", !0) : this.results.webview = !1;
    const s = this.testBrowsers();
    this.results.browser = s, this.app.browser = s, document.documentElement.setAttribute("data-browser", s);
    const o = Object.keys(e).filter((r) => e[r]);
    this.runTests(o), this.bindEventTests();
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
        const e = new window.CustomEvent(Ue);
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
class Ah {
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
class Eh {
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
    const s = t.getBoundingClientRect(), n = this.outerHeight(t), o = s.top + n, r = e.getBoundingClientRect(), a = this.outerHeight(e), c = r.top + a;
    return o > r.top ? o - r.top : s.top > c ? s.top - c : 0;
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
    const e = t.getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, o = e.top <= s && e.top + e.height >= 0, r = e.left <= n && e.left + e.width >= 0;
    return o && r;
  }
  /**
   * Strict viewport check - element must be fully contained within viewport bounds
   * Useful for popovers/tooltips that need to be completely visible
   *
   * @param {*} el
   */
  inViewportStrict(t) {
    const e = t.getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, o = e.top >= 0 && e.bottom <= s, r = e.left >= 0 && e.right <= n;
    return o && r;
  }
}
const A = new Eh();
function v(i, t) {
  let e;
  typeof i == "string" ? e = Array.from(document.querySelectorAll(i)) : i instanceof NodeList ? e = Array.from(i) : Array.isArray(i) ? e = i : e = [i], e.forEach((s) => {
    if (!s) return;
    const n = [], o = {};
    Object.entries(t).forEach(([r, a]) => {
      r === "x" ? n.push(`translateX(${typeof a == "number" ? a + "px" : a})`) : r === "y" ? n.push(`translateY(${typeof a == "number" ? a + "px" : a})`) : r === "scale" ? n.push(`scale(${a})`) : r === "scaleX" ? n.push(`scaleX(${a})`) : r === "scaleY" ? n.push(`scaleY(${a})`) : r === "rotate" ? n.push(`rotate(${typeof a == "number" ? a + "deg" : a})`) : r === "rotateX" ? n.push(`rotateX(${typeof a == "number" ? a + "deg" : a})`) : r === "rotateY" ? n.push(`rotateY(${typeof a == "number" ? a + "deg" : a})`) : r === "rotateZ" ? n.push(`rotateZ(${typeof a == "number" ? a + "deg" : a})`) : o[r] = a;
    }), n.length > 0 && (s.style.transform = n.join(" ")), Object.entries(o).forEach(([r, a]) => {
      s.style[r] = a;
    });
  });
}
function ce(i, t, e = {}) {
  const s = typeof i == "string" ? document.querySelector(i) : i;
  return t === 0 ? g(s, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      s.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (s.style.visibility = "visible", g(s, { opacity: t }, e));
}
function gt(i, t = "all") {
  let e;
  typeof i == "string" ? e = Array.from(document.querySelectorAll(i)) : i instanceof NodeList ? e = Array.from(i) : Array.isArray(i) ? e = i : e = [i], e.forEach((s) => {
    s && (t === "all" ? s.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((o) => {
      s.style.removeProperty(o);
    }));
  });
}
function hi(i, t) {
  return new Promise((e) => {
    uh(() => {
      t(), e();
    }, i);
  });
}
class rn {
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
        const [, s, n, o] = e;
        if (n.autoAlpha !== void 0) {
          const r = { ...o };
          delete r.autoAlpha, await ce(s, n.autoAlpha, r).finished;
        } else
          await g(s, n, o).finished;
      } else e[0] === "call" && e[1]();
  }
}
function De(i) {
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
      const o = document.querySelectorAll("[data-fader]");
      o.length && (v(o, { opacity: 0 }), o.forEach((d) => d.style.visibility = "hidden")), gt(document.body, ["opacity"]), document.body.classList.remove("unloaded");
      const r = A.find("header[data-nav]");
      r && gt(r, ["opacity", "transform"]);
      const a = A.find("main");
      a && gt(a, ["opacity", "transform"]);
      const c = A.find("footer");
      c && gt(c, ["opacity", "transform"]);
    };
    i.persisted ? s() : t && (setTimeout(s, 100), setTimeout(s, 500));
  }
};
const an = {
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
class Zh {
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
    delete t.breakpointConfig, this.opts = W(t, an), this.opts.breakpointConfig = e || an.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Sh(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new on(this, this.opts.breakpointConfig) : this.breakpoints = new on(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new Ah(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = me(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && document.documentElement.classList.add("prefers-reduced-motion"), window.addEventListener(He, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent($e, this), this.initializedEvent = new window.CustomEvent(Mi, this), this.readyEvent = new window.CustomEvent(ge, this), this.revealedEvent = new window.CustomEvent(dt, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", sn(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", sn(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks($e), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(Mi), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(ge), this.fadeIn();
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
        this._initialZoom = nn.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (nn.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), s = new window.CustomEvent(bo, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(s), this.SCROLL_LOCKED = !0, v(document.body, { overflow: "hidden" }), v(this._scrollPaddedElements, {
      paddingRight: `${e}px`
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(wo, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, v(document.body, { overflow: t }), gt(this._scrollPaddedElements, ["paddingRight"]), document.removeEventListener("touchmove", this.scrollVoid, !1);
  }
  /**
   *
   * @param {*} target
   * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
   * @param {*} time
   * @param {*} emitEvents
   */
  scrollTo(t, e = 0.8, s = !0, n = "easeInOut") {
    const o = new window.CustomEvent(qe);
    this.state.forcedScroll = !0, s && window.dispatchEvent(o);
    let r = 0;
    if (typeof t == "number")
      r = t;
    else if (typeof t == "string") {
      const y = document.querySelector(t);
      y && (r = y.getBoundingClientRect().top + window.pageYOffset);
    } else if (t instanceof Element)
      r = t.getBoundingClientRect().top + window.pageYOffset;
    else if (typeof t == "object") {
      const y = t.y;
      if (y instanceof Element)
        r = y.getBoundingClientRect().top + window.pageYOffset;
      else if (typeof y == "string") {
        const b = document.querySelector(y);
        b && (r = b.getBoundingClientRect().top + window.pageYOffset);
      } else typeof y == "number" && (r = y);
      t.offsetY && (r += t.offsetY);
    }
    const a = window.pageYOffset, c = r - a, d = e * 1e3, h = performance.now(), p = (y) => y < 0.5 ? 2 * y * y : -1 + (4 - 2 * y) * y, m = (y) => {
      const b = y - h, S = Math.min(b / d, 1), E = p(S), T = a + c * E;
      if (window.scrollTo(0, T), S < 1)
        requestAnimationFrame(m);
      else {
        const R = new window.CustomEvent(We);
        s && (window.dispatchEvent(R), requestAnimationFrame(() => this.state.forcedScroll = !1));
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(dt));
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
    const e = this.size.width !== window.innerWidth, s = this.size.height !== window.innerHeight, n = e || s, o = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(n, o), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
    const r = new CustomEvent(yt, {
      detail: { widthChanged: e, heightChanged: s }
    });
    window.dispatchEvent(r);
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
    }, s = new CustomEvent(kt, { detail: e });
    window.dispatchEvent(s);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(vo, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(So, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(Ao, t), window.dispatchEvent(e));
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
      const o = t.querySelector("b"), r = document.createElement("textarea");
      r.value = `
${o.textContent}
SCREEN >> ${window.screen.width}x${window.screen.height}
WINDOW >> ${s}x${n}

FEATURES >>
${JSON.stringify(this.featureTests.results, void 0, 2)}
      `, document.body.appendChild(r), r.select(), document.execCommand("Copy"), r.remove(), e.innerHTML = "OK!", setTimeout(() => {
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
            delay: xt(0.02),
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
            delay: xt(0.02),
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
const Th = {
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
class Qh {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Th), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(dt, () => {
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
  setCookie(t, e, s, n, o, r) {
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
    return document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)}${a}${o ? `; domain=${o}` : ""}${n ? `; path=${n}` : ""}${r ? "; secure" : ""}`, !0;
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
const Oh = {};
class Jh {
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Oh), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-cover-overlay]");
    Array.from(t).forEach((e) => {
      let s;
      const n = e.querySelector(".picture-wrapper"), o = e.querySelector("[data-cover-overlay-button]"), r = e.querySelector("iframe");
      r && r.setAttribute(
        "allow",
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ), e.hasAttribute("data-cover-overlay-vimeo-play") && (window.Vimeo && r ? s = new window.Vimeo.Player(r) : console.error("==> JUPITER// Missing vimeo JS or iframe")), o.addEventListener("click", () => {
        g([
          [o, { opacity: 0 }, { duration: 0.5, ease: "easeIn", at: 0 }],
          [n, { opacity: 0 }, { duration: 1, ease: "easeIn", at: 0 }],
          [r, { opacity: 1 }, { duration: 0.5, ease: "easeOut", at: 0.5 }],
          [n, { display: "none" }, { duration: 0, at: 1 }]
        ]).finished.then(() => {
          s ? s.play() : r && r.src.includes("youtube.com") && r.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        });
      });
    });
  }
}
class Ih {
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
    return Object.entries(t).forEach(([n, o]) => {
      const r = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || [], a = !o || r.includes(o);
      s = s.replace(`:${n}`, a ? "" : o);
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
      const h = `/${this.language}/`;
      e.startsWith(h) ? e = e.substring(h.length - 1) : this.hideDefaultLanguage && e.startsWith("/");
    }
    let s = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const n = [];
    s = s.replace(/:(\w+)/g, (h, p) => (n.push(p), "([^/]+)"));
    const o = t.split("/"), r = e.split("/");
    if (r.length <= o.length) {
      let p = o.slice(0, r.length).join("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const m = [];
      p = p.replace(/:(\w+)/g, (S, E) => (m.push(E), "([^/]+)"));
      const y = new RegExp(`^${p}$`), b = e.match(y);
      if (b) {
        const S = {};
        return m.forEach((E, T) => {
          b[T + 1] && (S[E] = decodeURIComponent(b[T + 1]));
        }), S;
      }
    }
    const a = new RegExp(`^${s}$`), c = e.match(a);
    if (!c)
      return {};
    const d = {};
    return n.forEach((h, p) => {
      c[p + 1] && (d[h] = decodeURIComponent(c[p + 1]));
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
      const n = this.dataloader.$paramEls.find((o) => (o.dataset.loaderParamKey || "defaultParam") === e && o.dataset.loaderParam === s);
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
const xh = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (i) => {
  }
};
class tu {
  constructor(t, e, s = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = A.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = A.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = A.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = W(s, xh), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = A.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new Ih(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
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
      this.$paramEls.forEach((o) => {
        s ? o.dataset.loaderParamKey === s && o.removeAttribute("data-loader-param-selected") : o.removeAttribute("data-loader-param-selected");
      }), t.currentTarget.setAttribute("data-loader-param-selected", "");
      const n = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[n] = t.currentTarget.dataset.loaderParam;
    }
    this.urlSync && this.urlSync.updateUrl(this.opts.loaderParam), this.fetch();
  }
  fetch(t = !1) {
    const { defaultParam: e, ...s } = this.opts.loaderParam, n = this.opts.filter, o = `${this.baseURL}/${e ? e + "/" : ""}${this.opts.page}?` + new URLSearchParams({ filter: n, ...s });
    fetch(o).then((r) => (this.status = r.headers.get("jpt-dataloader") || "available", this.updateButton(), r.text())).then((r) => {
      t ? this.$canvasEl.innerHTML += r : this.$canvasEl.innerHTML = r, this.opts.onFetch(this), this.complete();
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
const Ch = {
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
class eu {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = W(e, Ch), this.elements = {}, this.open = !1, this.element = e.el, this.element.matches && this.element.matches(this.opts.selectors.trigger) ? this.elements.trigger = this.element : this.elements.trigger = A.find(this.element, this.opts.selectors.trigger), this.elements.trigger && this.elements.trigger.hasAttribute("data-dropdown-target")) {
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
    const t = this.elements.menu.getBoundingClientRect(), e = window.innerHeight, s = window.innerWidth, n = t.height, o = t.top;
    A.setCSSVar(
      "dropdown-menu-height",
      `${n}px`,
      this.elements.menu
    ), n + o > e ? this.elements.menu.setAttribute("data-dropdown-placement", "top") : this.elements.menu.setAttribute("data-dropdown-placement", "bottom");
    const r = window.getComputedStyle(this.elements.menu);
    let a = parseFloat(r.left) || 0;
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
      delay: xt(this.opts.tweens.items.stagger)
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
const Lh = {};
class iu {
  constructor(t, e, s = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = W(s, Lh), this.selector = e, this.initialize(), window.addEventListener(yt, () => {
      gt("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
    });
  }
  initialize() {
    const t = A.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let s = null;
      const n = [];
      let o = [], r = 0;
      A.all(e, this.selector).forEach((c) => {
        const d = c.getBoundingClientRect();
        if (s === null) {
          r = d.height, o.push(c), s = d.top;
          return;
        }
        s !== d.top ? (console.debug("== pushing actionables", { elements: o, height: r }), n.push({ elements: o, height: r }), o = [], r = d.height) : s === d.top ? d.height > r && (r = d.height) : r = d.height, o.push(c), s = d.top;
      }), o.length && n.push({ elements: o, height: r }), n.length && n.forEach((c) => {
        c.elements.forEach((d) => {
          d.style.minHeight = `${c.height}px`, d.setAttribute("data-eq-height-elements-adjusted", "true");
        });
      });
    });
  }
}
function Se(i, t = !1) {
  return new Promise((e) => {
    t ? i.hasAttribute("data-ll-loaded") ? e({ img: i, status: "ok" }) : i.addEventListener(is, () => {
      e({ img: i, status: "ok" });
    }) : i.complete ? e({ img: i, status: "ok" }) : (i.onload = () => {
      e({ img: i, status: "ok" });
    }, i.onerror = () => {
      e({ img: i, status: "error" });
    });
  });
}
function ss(i, t = !1) {
  i && i.nodeType && (i = i.querySelectorAll("img"));
  const e = [];
  for (let s = 0; s < i.length; s += 1) {
    const n = i[s];
    e.push(Se(n, t));
  }
  return Promise.all(e);
}
const Ph = {
  listenForResize: !0
};
class su {
  constructor(t, e = {}, s = document.body) {
    this.app = t, this.container = s, this.opts = W(e, Ph), this.initialize(), e.listenForResize && window.addEventListener(yt, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const s = [];
      let n = [], o = 0;
      const r = A.all(t, "img");
      r.length !== 0 && ss(r, !1).then(() => {
        r.forEach((a) => {
          const c = a.getBoundingClientRect(), d = this.getImgSizeInfo(a);
          if (e === null) {
            o = d.height, n.push(a), e = c.top;
            return;
          }
          e !== c.top ? (s.push({ elements: n, height: o }), n = [], o = d.height) : e === c.top ? d.height > o && (o = d.height) : o = d.height, n.push(a), e = c.top;
        }), n.length && s.push({ elements: n, height: o }), s.length && s.forEach((a) => {
          a.elements.forEach((c) => {
            c.style.minHeight = `${a.height}px`;
          });
        });
      });
    });
  }
  initialize() {
    this.canvases = A.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, s, n, o, r) {
    const a = n / o, c = e / s;
    return (function() {
      return (t ? a > c : a < c) ? (this.width = e, this.height = e / a) : (this.width = s * a, this.height = s), this.left = (e - this.width) * (r / 100), this.right = this.width + this.left, this;
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
const Oo = {
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
}, Mh = {
  el: "header[data-nav]",
  on: dt,
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
        delay: xt(0.1, { startDelay: i.opts.enterDelay }),
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
    ...Oo
  }
};
class nu {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = W(e, Mh), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const s = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(s, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.opts.intersects && (this.intersectingElements = A.all("[data-intersect]")), window.addEventListener(Ue, () => {
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
      qe,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      We,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(dt, () => {
      let t = kt;
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
      ge,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      yt,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(dt, () => {
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
    return e = W(s, Oo, e.default || {}), e;
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
const kh = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class ou {
  constructor(t, e) {
    this.app = t, this.opts = W(e, kh);
    const s = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    v(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const o = n.offsetHeight;
    if (v(s, { marginBottom: o }), this.opts.shadow) {
      const r = `0 50px 50px -20px ${this.opts.shadowColor}`;
      s.style.mozBoxShadow = r, s.style.webkitBoxShadow = r, s.style.boxShadow = r;
    }
  }
}
const _h = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class ru {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = W(e, _h), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const s = document.querySelector(this.opts.el);
        s && (this.elements.parent = s, s.querySelectorAll("[data-parallax-factor]").forEach((o) => this.setupParallaxElement(o)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(kt, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
  }
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(t) {
    const e = t.hasAttribute("data-parallax-factor") ? parseFloat(t.getAttribute("data-parallax-factor")) : this.opts.factor;
    let s = t.hasAttribute("data-parallax") ? this.opts.fadeContent : t.hasAttribute("data-parallax-fade");
    const n = t.hasAttribute("data-parallax-orientation") ? t.getAttribute("data-parallax-orientation") : this.opts.orientation;
    let o = null, r = null;
    if (t.hasAttribute("data-parallax")) {
      if (o = t.querySelector("[data-parallax-content]"), r = t.querySelector("[data-parallax-figure]"), this.opts.overflow || (t.style.overflow = "hidden"), r) {
        r.style.transform = `scale(${this.opts.scale})`, r.style.willChange = "transform", r.style.transformOrigin = "center";
        const a = window.getComputedStyle(r);
        a.backgroundImage && a.backgroundImage !== "none" && (a.backgroundSize !== "cover" && (r.style.backgroundSize = "cover"), a.backgroundPosition !== "center" && (r.style.backgroundPosition = "center"));
      }
      o && (o.style.willChange = s ? "transform, opacity" : "transform", o.style.zIndex = "1");
    } else
      t.style.willChange = s ? "transform, opacity" : "transform";
    this.parallaxElements.push({
      element: t,
      factor: e,
      fadeContent: s,
      orientation: n,
      content: o,
      figure: r,
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
    const { element: s, factor: n, fadeContent: o, orientation: r } = t, a = s.getBoundingClientRect(), c = this.app.size.height, d = c / 2, y = (a.top + a.height / 2 - d) / c * n * 100;
    let b = 1;
    if (o) {
      const E = a.top / c;
      E <= 0 ? b = Math.max(0, 1 + E * 1.5) : E >= 0.7 && (b = Math.max(0, 1 - (E - 0.7) * 3.33)), b = Math.max(0, Math.min(1, b));
    }
    let S = "";
    switch (r) {
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
    const { element: s, figure: n, content: o } = t;
    if (n) {
      let r = "scale(1.2)";
      const a = n.style.transform;
      if (a) {
        const c = a.match(/scale\([^)]+\)/);
        c && (r = c[0]);
      }
      n.style.transform = `${r} ${e.transform}`;
    }
    o && (o.style.transform = e.transform, o.style.opacity = e.opacity), !n && !o && (s.style.transform = e.transform, s.style.opacity = e.opacity);
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
    window.removeEventListener(kt, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: s, content: n } = t;
      s && (s.style.transform = "", s.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !s && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
const Dh = {
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
class au {
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Dh), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
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
    this.app.registerCallback(dt, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Se(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    me() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
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
          const o = (this.opts.transition.scale - 1) / this.opts.interval * this.opts.transition.duration, r = this.opts.transition.scale + o, a = [
            // Previous slide continues zooming during fade at same rate
            [
              e,
              { scale: [this.opts.transition.scale, r] },
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
          const o = (this.opts.transition.scale - 1) / this.opts.interval * this.opts.transition.duration, r = this.opts.transition.scale + o, a = [
            // Previous slide continues zooming during collapse at same rate
            [
              e,
              { scale: [this.opts.transition.scale, r] },
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
        yt,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        yt,
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
const Rh = {
  el: "[data-hero-video]",
  onFadeIn: (i) => {
    ce(i.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (i) => {
    ce(i.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (i) => {
    ce(i.cover, 0, { duration: 0.35 });
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
class lu {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = W(e, Rh), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), v(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = A.find(this.el, "[data-cover]"), this.cover && ce(this.cover, 0, { duration: 0 });
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
    }), this.cover && Se(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(ge, () => {
      !this.video.playing && !me() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (me() ? v(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
        yt,
        this._resize.bind(this)
      )) : window.removeEventListener(
        yt,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
  }
}
function ui(i, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), i.dispatchEvent(e);
}
const zh = {
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
class cu {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, zh), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((s) => {
      s.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(dt, () => {
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
      e && (s.setAttribute("data-ll-srcset-initialized", ""), s.querySelectorAll("img:not([data-ll-loaded])").forEach((o) => {
        o.setAttribute("data-ll-blurred", ""), o.setAttribute("data-ll-idx", n), o.style.setProperty("--ll-idx", n);
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
        var d, h;
        const o = n.target;
        let r = ((h = (d = n.borderBoxSize) == null ? void 0 : d[0]) == null ? void 0 : h.inlineSize) || n.contentRect.width;
        r = Math.round(r), r < this.opts.minSize && (r = this.opts.minSize);
        const a = o.getAttribute("sizes"), c = `${r}px`;
        a !== c && (this.resizePending.set(o, r), this.rafId || (this.rafId = requestAnimationFrame(() => {
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
      s !== n && (e.setAttribute("sizes", n), e.parentNode && Array.from(A.all(e.parentNode, "source")).forEach((o) => {
        o.getAttribute("sizes") !== n && o.setAttribute("sizes", n);
      }));
    }), this.resizePending.clear(), this.rafId = null;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (s, n) => {
        const o = A.all(s, "img");
        return new IntersectionObserver((r, a) => {
          r.forEach((c) => {
            (c.isIntersecting || c.intersectionRatio > 0) && (ss(o, !0).then(() => {
              ui(s, To);
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
    for (let r = 0; r < e.length; r += 1) {
      const a = e[r];
      a.hasAttribute("data-ll-ready") || (s = !0), a.hasAttribute("data-srcset") && (a.setAttribute("srcset", a.dataset.srcset), a.setAttribute("data-ll-ready", ""));
    }
    if (!s && e.length > 0)
      return;
    const n = t.querySelector("img"), o = () => {
      n.removeAttribute("data-ll-placeholder"), n.removeAttribute("data-ll-blurred"), n.removeAttribute("data-ll-loading"), n.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    n.addEventListener("load", o, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && o(), ui(n, is);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), ui(e, Eo));
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
const Fh = {
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
class hu {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Fh), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: new rn(),
      image: new rn()
    }, this.lightboxes.forEach((s) => {
      const n = s.getAttribute("data-lightbox"), o = s.getAttribute("data-srcset"), a = s.querySelector("img").getAttribute("alt"), c = s.getAttribute("data-lightbox-section") || "general";
      let d = s;
      this.opts.trigger && (d = A.find(s, this.opts.trigger) || s), Object.prototype.hasOwnProperty.call(this.sections, c) || (this.sections[c] = []);
      const h = {
        href: n,
        alt: a,
        srcset: o
      }, p = this.sections[c].push(h) - 1;
      d.addEventListener("click", (m) => {
        m.preventDefault(), this.showBox(c, p);
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
    this.sections[t].forEach((n, o) => {
      const r = document.createElement("img");
      v(r, { opacity: 0 }), r.style.visibility = "hidden", r.classList.add("lightbox-image", "m-lg"), r.setAttribute("data-idx", o), this.elements.imgWrapper.appendChild(r), this.imgs.push(r);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", o), o === e && (a.classList.add("active"), s = a), a.addEventListener("click", (c) => {
        a.classList.add("active"), s.classList.remove("active"), s = a, c.stopPropagation(), c.preventDefault(), this.setImg(t, o, null);
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
    for (let o = 0; o < 3 && this.imgs[e + o]; o += 1)
      this.imgs[e + o].src = this.sections[t][e + o].href, this.sections[t][e + o].srcset && this.imgs[e + o].setAttribute(
        "srcset",
        this.sections[t][e + o].srcset
      );
    this.nextImage = this.imgs[e], this.nextImage.src = this.sections[t][e].href, this.sections[t][e].srcset && this.nextImage.setAttribute(
      "srcset",
      this.sections[t][e].srcset
    ), this.opts.onImageIn(this), this.timelines.image.call(() => {
      this.firstTransition && (this.firstTransition = !1);
    }), this.elements.caption && this.opts.onCaptionIn(this, s), Se(this.nextImage).then(() => {
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
const Vh = {
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
    const e = document.querySelector("main"), s = document.querySelector("header[data-nav]"), n = document.querySelector("footer"), o = document.querySelector("#fader");
    o ? (v(o, { display: "block", opacity: 0 }), e && (g(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), g(e, { opacity: 0 }, { duration: 0.2 })), s && g(s, { opacity: 0 }, { duration: 0.2 }), n && g(n, { opacity: 0 }, { duration: 0.2 }), g(o, { opacity: 1 }, { duration: 0.2 }).finished.then(() => {
      window.location = i;
    })) : (e && (g(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), g(e, { opacity: 0 }, { duration: 0.2 })), s && g(s, { opacity: 0 }, { duration: 0.2 }), n && g(n, { opacity: 0 }, { duration: 0.2 }), g(e, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
      window.location = i;
    }));
  }
};
class uu {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Vh);
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
        const o = s.getAttribute("href");
        if (o === "#")
          return;
        document.body.classList.contains("open-menu") && (this.app.mobileMenu.toggleMenuClosed(), e = !0);
        const r = () => {
          const a = o, c = document.querySelector(a);
          if (n.preventDefault(), c) {
            if (this.opts.onAnchor(c, this), c.hasAttribute("data-skip-history") || history.pushState({}, "", o), !this.app.header || c.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
              return;
            setTimeout(() => {
              this.app.header.unpin();
            }, 800);
          }
        };
        e ? setTimeout(r, this.opts.mobileMenuDelay) : r();
      });
    });
  }
  bindLinks(t) {
    const e = document.querySelector(".loading-container");
    Array.from(t).forEach((s) => {
      const n = s.getAttribute("href");
      if (!n || n === "#" || n.startsWith("javascript:"))
        return;
      const o = this.normalizeHostname(document.location.hostname);
      let r, a;
      try {
        a = new URL(n, document.location.href), r = a.hostname;
      } catch (h) {
        console.warn(`Failed to parse URL for href "${n}":`, h), r = "";
      }
      const d = this.normalizeHostname(r) === o;
      this.opts.openExternalInWindow && !d && s.setAttribute("target", "_blank"), s.addEventListener("click", (h) => {
        if (!(h.shiftKey || h.metaKey || h.ctrlKey) && (e && (e.style.display = "none"), d && a)) {
          const p = new URL(window.location.href), m = a.pathname === p.pathname && a.search === p.search;
          if (m && a.hash) {
            h.preventDefault();
            const y = a.hash, b = document.querySelector(y);
            b && (this.opts.onAnchor(b, this), history.pushState({}, "", n));
          } else m && !a.hash && !p.hash ? h.preventDefault() : (h.preventDefault(), this.opts.onTransition(n, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const Nh = {
  center: !1,
  snap: !1,
  // Set to true to enable snap-to-item behavior
  crawl: !0,
  // Continuous auto-scrolling
  loop: !0,
  // Infinite looping (false for linear scrolling)
  draggable: !0,
  // Enable drag interaction
  speed: {
    sm: 0.1,
    // Speed for mobile (multiplier)
    lg: 0.35
    // Speed for desktop (multiplier)
  },
  ease: {
    mouseOver: { speed: 0.3, duration: 0.75 },
    mouseOut: { speed: 1, duration: 0.75 }
  },
  selector: '[data-moonwalk-run="loop"]'
};
function $h(i, t, e) {
  t = Array.from(t), e = e || {};
  const s = e.loop !== !1, n = e.draggable !== !1, o = e.center, r = o === !0 ? t[0].parentNode : (typeof o == "string" ? document.querySelector(o) : o) || t[0].parentNode;
  let a = 0, c = 0, d = (e.speed || 1) * 100, h = null, p = Gt(0), m = [], y = [], b = [], S = 0, E = null;
  function T() {
    if (!t.length) return 0;
    const O = t[0], C = t[t.length - 1], _ = O.offsetLeft, M = C.getBoundingClientRect().width;
    return C.offsetLeft + M - _ + (parseFloat(e.paddingRight) || 0);
  }
  function R() {
    if (!s) return;
    const O = r.offsetWidth;
    let C = T();
    if (O === 0 || C === 0)
      return;
    const _ = t[0].offsetWidth, P = t[t.length - 1].offsetWidth, M = O + Math.max(_, P);
    if (C >= M)
      return;
    const N = t.length, K = 10;
    let J = 0, Q = C;
    for (; C < M && J < K; ) {
      for (let k = 0; k < N; k++) {
        const pt = t[k].cloneNode(!0);
        pt.setAttribute("data-looper-clone", "true"), r.appendChild(pt), t.push(pt);
      }
      if (r.getBoundingClientRect(), C = T(), J++, C <= Q && J > 1) {
        console.warn("[Looper] Item replication not increasing width, stopping");
        break;
      }
      Q = C;
    }
    J >= K && console.warn("[Looper] Hit max replication limit");
  }
  function z() {
    r.getBoundingClientRect(), t.forEach((O, C) => {
      const _ = O.getBoundingClientRect();
      m[C] = _.width;
      const M = window.getComputedStyle(O).transform;
      let N = 0;
      M && M !== "none" && (N = new DOMMatrix(M).m41), y[C] = N / m[C] * 100;
    }), S = t[0].offsetLeft, c = T();
  }
  function F() {
    if (!s) {
      t.forEach((_, P) => {
        b[P] = P / Math.max(1, t.length - 1);
      });
      return;
    }
    t.forEach((_, P) => {
      const M = y[P] / 100 * m[P], N = _.offsetLeft + M - S;
      b[P] = N / d;
    });
    const O = t[0].parentNode, C = parseFloat(getComputedStyle(O).paddingLeft) || 0;
    if (C > 0) {
      const _ = C / d;
      b = b.map((P) => P - _);
    }
  }
  function I(O) {
    if (!s) {
      const _ = Math.max(0, c - r.offsetWidth), P = Math.max(0, Math.min(_, O));
      t.forEach((M, N) => {
        const K = y[N] - P / m[N] * 100;
        M.style.transform = `translateX(${K}%)`;
      });
      return;
    }
    const C = (O % c + c) % c;
    t.forEach((_, P) => {
      const M = y[P] / 100 * m[P], N = _.offsetLeft + M - S;
      let K = N - C;
      K < -m[P] ? K += c : K > r.offsetWidth && (K -= c);
      const J = (M + K - N) / m[P] * 100;
      _.style.transform = `translateX(${J}%)`;
    });
  }
  function V(O = !1) {
    const C = h ? h.time / h.duration : 0, _ = p.get(), P = h && h.speed !== 0;
    if (h && h.pause(), z(), O) {
      const M = r.offsetWidth, N = T();
      if (s && N < M * 1.5 && (R(), z()), F(), s && e.crawl) {
        const K = c / d;
        h && h.stop(), h = g(
          p,
          e.reversed ? 0 : c,
          {
            duration: K,
            repeat: 1 / 0,
            easing: "linear"
          }
        ), h.speed = e.reversed ? -1 : 1, P ? (h.time = C * h.duration, h.play()) : h.pause();
      } else if (e.crawl) {
        const K = (c - r.offsetWidth) / d;
        h && h.stop(), h = g(
          p,
          c - r.offsetWidth,
          {
            duration: K,
            easing: "linear"
          }
        ), P ? (h.time = C * h.duration, h.play()) : h.pause();
      }
    } else
      F();
    I(_);
  }
  function U() {
    if (R(), z(), F(), t.forEach((O, C) => {
      O.style.transform = `translateX(${y[C]}%)`;
    }), p.on("change", (O) => {
      I(O);
    }), s) {
      const O = c / d;
      e.reversed && p.set(c), h = g(
        p,
        e.reversed ? 0 : c,
        {
          duration: O,
          repeat: 1 / 0,
          easing: "linear"
        }
      ), h.speed = e.reversed ? -1 : 1, h.pause();
    } else if (e.crawl) {
      const O = (c - r.offsetWidth) / d;
      h = g(
        p,
        c - r.offsetWidth,
        {
          duration: O,
          easing: "linear"
        }
      ), h.pause();
    }
    n && H(), et(), I(p.get()), window.addEventListener("APPLICATION:RESIZE", L);
  }
  function L(O) {
    O.detail && !O.detail.widthChanged || V(!0);
  }
  function H() {
    let O = !1, C = 0, _ = 0, P = 0, M = [], N = null;
    function K() {
      if (M.length < 2) return 0;
      const D = M.slice(-5);
      let Y = 0, j = 0;
      for (let nt = 1; nt < D.length; nt++) {
        const at = D[nt - 1], At = D[nt], Dt = At.x - at.x, Bt = At.time - at.time;
        if (Bt > 0) {
          const Et = nt / D.length;
          Y += Dt / Bt * 1e3 * Et, j += Et;
        }
      }
      return j > 0 ? Y / j : 0;
    }
    function J(D) {
      D.button !== void 0 && D.button !== 0 || (O = !0, C = D.clientX, D.clientX, _ = p.get(), P = Date.now(), M = [{ x: D.clientX, time: P }], h && h.pause(), r.style.cursor = "grabbing", D.preventDefault(), window.addEventListener("pointermove", Q, { passive: !1 }), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k));
    }
    function Q(D) {
      if (!O) return;
      D.preventDefault();
      const Y = D.clientX, j = Date.now();
      for (M.push({ x: Y, time: j }); M.length > 0 && j - M[0].time > 100; )
        M.shift();
      N && cancelAnimationFrame(N), N = requestAnimationFrame(() => {
        const nt = C - Y, at = _ + nt;
        if (s)
          p.set(at);
        else {
          const At = Math.max(0, c - r.offsetWidth);
          p.set(Math.max(0, Math.min(At, at)));
        }
        P = j;
      });
    }
    function k(D) {
      if (!O) return;
      O = !1, window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), N && (cancelAnimationFrame(N), N = null), r.style.cursor = "grab";
      const Y = K();
      Math.abs(Y) > 10 ? pt(Y) : e.snap ? rt() : e.crawl && h && ht();
    }
    function pt(D) {
      const Y = p.get(), j = {
        type: "inertia",
        velocity: -D,
        // Negative because drag direction is opposite to scroll
        power: 0.8,
        decay: 0.325,
        restSpeed: 2,
        restDistance: 0.5
      };
      if (!s) {
        const at = Math.max(0, c - r.offsetWidth);
        j.min = 0, j.max = at, j.bounceStiffness = 300, j.bounceDamping = 30;
      }
      e.snap && (j.modifyTarget = (at) => bt(at)), g(
        p,
        Y,
        // Target doesn't matter for inertia, it calculates its own
        j
      ).then(() => {
        e.snap && !j.modifyTarget ? rt() : e.crawl && h && ht();
      });
    }
    function bt(D) {
      if (!b || b.length === 0)
        return D;
      const Y = D / d;
      let j = 0, nt = 1 / 0;
      b.forEach((Dt, Bt) => {
        let Et = Math.abs(Dt - Y);
        if (s) {
          const Ae = c / d, Ke = Math.min(
            Math.abs(Dt + Ae - Y),
            Math.abs(Dt - Ae - Y)
          );
          Et = Math.min(Et, Ke);
        }
        Et < nt && (nt = Et, j = Bt);
      });
      const At = b[j] * d;
      return a = j, At;
    }
    function rt() {
      const D = p.get(), Y = bt(D);
      if (Math.abs(Y - D) < 1) {
        e.crawl && h && ht();
        return;
      }
      g(
        p,
        Y,
        {
          type: "spring",
          bounce: 0.2,
          duration: 0.5
        }
      ).then(() => {
        e.crawl && h && ht();
      });
    }
    function ht() {
      if (!h) return;
      const D = e.reversed ? -1 : 1;
      h.speed = 0, h.play(), g(
        h,
        { speed: D },
        { duration: 2, easing: "easeIn" }
      );
    }
    r.style.touchAction = "pan-y", r.style.cursor = "grab", r.addEventListener("pointerdown", J), E = {
      cleanup: () => {
        r.removeEventListener("pointerdown", J), window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), N && cancelAnimationFrame(N);
      }
    };
  }
  function et() {
    if (!e.crawl || !h) return;
    const O = e.reversed ? -1 : 1, C = e.reversed ? -e.ease.mouseOver.speed : e.ease.mouseOver.speed;
    t.forEach((_) => {
      _.addEventListener("mouseenter", () => {
        h && g(
          h,
          { speed: C },
          { duration: e.ease.mouseOver.duration, easing: "easeOut" }
        );
      }), _.addEventListener("mouseleave", () => {
        h && g(
          h,
          { speed: O },
          { duration: e.ease.mouseOut.duration, easing: "easeOut" }
        );
      });
    });
  }
  function st(O = !1) {
    if (!b || b.length === 0) return 0;
    const _ = p.get() / d;
    let P = 0, M = 1 / 0;
    return b.forEach((N, K) => {
      let J = Math.abs(N - _);
      if (s) {
        const Q = c / d, k = Math.min(
          Math.abs(N + Q - _),
          Math.abs(N - Q - _)
        );
        J = Math.min(J, k);
      }
      J < M && (M = J, P = K);
    }), O && (a = P), P;
  }
  function vt(O, C = {}) {
    if (C = C || {}, !b || b.length === 0) return;
    let _ = O;
    if (s) {
      const Q = t.length;
      Math.abs(O - a) > Q / 2 && (_ = O + (O > a ? -Q : Q)), _ = (_ % Q + Q) % Q;
    } else
      _ = Math.max(0, Math.min(O, t.length - 1));
    const M = b[_] * d;
    a = _;
    const N = C.duration !== void 0 ? C.duration : 0.85, K = C.easing || "easeInOut";
    return g(
      p,
      M,
      {
        duration: N,
        easing: K
      }
    );
  }
  const St = {
    position: p,
    animation: h,
    items: t,
    times: b,
    isReversed: e.reversed,
    isLooping: s,
    play() {
      h && h.play();
    },
    pause() {
      h && h.pause();
    },
    current() {
      return a;
    },
    closestIndex(O) {
      return st(O);
    },
    next(O) {
      const C = a + 1;
      return vt(C, O);
    },
    previous(O) {
      const C = a - 1;
      return vt(C, O);
    },
    toIndex(O, C) {
      return vt(O, C);
    },
    refresh(O) {
      return V(O);
    },
    destroy() {
      h && h.stop(), E && E.cleanup && E.cleanup(), window.removeEventListener("APPLICATION:RESIZE", L), p.destroy();
    }
  };
  return U(), St;
}
class du {
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Nh), this.loopers = [], this.pendingLoopers = [], this.init();
  }
  init() {
    this.looperElements = A.all(this.opts.selector), this.looperElements.forEach((t) => {
      var c;
      const e = A.all(t, "[data-panner-item], [data-looper-item]");
      if (!e.length) {
        console.warn("[Looper] No items found in", t);
        return;
      }
      const s = ["mobile", "iphone"].includes(this.app.breakpoint) ? this.opts.speed.sm : this.opts.speed.lg, n = t.querySelector("[data-looper-reverse]") !== null, o = (c = t.querySelector("[data-looper]")) == null ? void 0 : c.hasAttribute("data-looper-snap"), r = this.opts.snap || o, a = {
        play: () => {
        },
        pause: () => {
        },
        isReversed: n
      };
      t.$loop = a, this.pendingLoopers.push({
        element: t,
        items: e,
        config: {
          paused: !0,
          repeat: -1,
          draggable: this.opts.draggable,
          center: this.opts.center,
          snap: r,
          speed: s,
          reversed: n,
          loop: this.opts.loop,
          crawl: this.opts.crawl,
          ease: this.opts.ease
        }
      });
    }), this.app.registerCallback("APPLICATION:REVEALED", () => {
      this.finalizeLoopers();
    });
  }
  finalizeLoopers() {
    this.pendingLoopers.forEach(({ element: t, items: e, config: s }) => {
      const n = $h(this.app, e, s);
      s.crawl && n.play(), t.$loop = n;
      const o = A.find(t, "[data-panner-next]"), r = A.find(t, "[data-panner-previous]");
      o && o.addEventListener("click", () => {
        n.next({ duration: 0.85, easing: "easeInOut" });
      }), r && r.addEventListener("click", () => {
        n.previous({ duration: 0.85, easing: "easeInOut" });
      }), g(t, { opacity: 1 }, { duration: 0.5, delay: 0.5, easing: "easeOut" }), this.loopers.push(n);
    }), this.pendingLoopers = [];
  }
  destroy() {
    this.loopers.forEach((t) => t.destroy()), this.loopers = [], this.pendingLoopers = [];
  }
}
const Hh = {
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
class pu {
  constructor(t, e, s) {
    this.opts = W(s, Hh), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = A.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = A.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = A.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
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
    Array.from(t).forEach((e) => gt(e, "all"));
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
    gt(this.elements.$el, "height"), gt(this.elements.$marquee, "height"), this.elements.$marquee.innerHTML = "", this.elements.$marquee.appendChild(this.elements.$holder), this.elements.$holder.innerHTML = "", this.elements.$holder.appendChild(this.elements.$item), this.measuredHeight = this.elements.$item.offsetHeight;
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
const Bh = {
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
      { duration: 1, ease: "easeOut", delay: xt(0.05) }
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
      { duration: 0.5, ease: "easeOut", delay: xt(0.04) }
    );
    setTimeout(() => {
      g(i.bg, { x: "100%" }, { duration: 0.25, ease: "easeIn" });
    }, 200), await t.finished, gt(i.nav, "height"), i._emitMobileMenuClosedEvent(), Array.from(i.content).forEach((e) => v(e, { display: "none" })), i.nav.style.gridTemplateRows = "auto", Array.from(i.lis).forEach((e) => gt(e, "opacity")), await g(i.logo, { opacity: 1 }, { duration: 0.35, ease: "easeIn" }).finished;
  }
};
class fu {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Bh), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(yt, () => {
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
      ts
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      es
    );
    window.dispatchEvent(t);
  }
}
const qh = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: dt,
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
class mu {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, s = document.body) {
    this.app = t, this.opts = W(e, qh), s !== document.body && (this.opts.on = () => {
    }), this.initialize(s);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), me() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    document.querySelectorAll("[data-moonwalk]").forEach((o) => {
      (o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || o === e) && (o.setAttribute("data-moonwalked", ""), o.classList.add("moonwalked"));
    }), document.querySelectorAll(
      "[data-moonwalk-section]"
    ).forEach((o) => {
      (o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || o === e) && o.setAttribute("data-moonwalk-section-ready", "");
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
      Array.from(n).forEach((o) => o.removeAttribute(s)), t.removeAttribute(s);
    });
  }
  removeFor(t = document.body, e) {
    [
      "data-moonwalk",
      "data-moonwalk-section",
      "data-moonwalk-children"
    ].forEach((n) => {
      const o = t.querySelectorAll(`${e}[${n}]`);
      Array.from(o).forEach((r) => r.removeAttribute(n));
    });
  }
  /**
   * Remove run matching name
   */
  removeRun(t = document.body, e) {
    const s = "data-moonwalk-run", n = t.querySelectorAll(`[${s}="${e}"]`);
    Array.from(n).forEach((o) => o.removeAttribute(s));
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
      Array.from(n).forEach((o, r) => {
        o.setAttribute("data-moonwalk-idx", r + 1);
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
        const o = n.alphaTween ? {
          ...n.transition.from,
          opacity: 0
        } : n.transition.from;
        t.name, t.children.length, v(t.children, o), t.children.length > 0 && (t.children[0], void 0);
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
      (n, o) => {
        for (let r = 0; r < n.length; r += 1) {
          const a = n[r];
          if (a.isIntersecting) {
            if (t.stage.name && !t.stage.running) {
              const c = s[t.stage.name];
              g(a.target, c.transition.to, {
                duration: c.duration
              }), t.stage.firstTween = !0;
            }
            if (t.name) {
              const c = s[t.name];
              if (c || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), t.name, t.children.length, c.interval, c.duration, c.alphaTween, c.transition, !c.transition)
                t.name, t.children.forEach((d, h) => {
                  const p = (c.startDelay || 0) + h * c.interval;
                  hi(p, () => {
                    d.setAttribute("data-moonwalked", "");
                  });
                });
              else {
                typeof c.alphaTween == "object" ? c.alphaTween.duration = c.alphaTween.duration ? c.alphaTween.duration : c.duration : c.alphaTween === !0 && (c.alphaTween = {
                  duration: c.duration,
                  ease: "easeIn"
                });
                const { ease: d, ...h } = c.transition.to, p = De(d || "easeOut"), m = {
                  duration: c.duration,
                  ease: p,
                  delay: xt(c.interval, {
                    startDelay: c.startDelay || 0
                  })
                };
                t.name, g(t.children, h, m), c.alphaTween && g(
                  t.children,
                  { opacity: 1 },
                  {
                    duration: c.alphaTween.duration,
                    ease: De(c.alphaTween.ease || "easeIn"),
                    delay: xt(c.interval, {
                      startDelay: c.startDelay || 0
                    })
                  }
                );
              }
            }
            o.unobserve(a.target);
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
      const n = e.getAttribute("data-moonwalk-order") ? parseInt(e.getAttribute("data-moonwalk-order")) : null, o = e.getAttribute("data-moonwalk-order") ? parseInt(s.getAttribute("data-moonwalk-order")) : null;
      return !n && !o ? 0 : n && !o ? -1 : !n && o ? 1 : n - o;
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
    const o = (performance.now() - t.animation.lastStartTime) / 1e3, r = t.animation.lastDelay + t.animation.lastDuration + s, a = Math.max(0, r - o);
    return o.toFixed(3), t.animation.lastDelay, t.animation.lastDuration, a.toFixed(3), a;
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
      e === this.sections.length - 1 ? n = "0px" : n = t.rootMargin, this.setupNamesAndStages(s), s.name || (s.observer = this.observer(s, n)), s.elements = s.el.querySelectorAll("[data-moonwalk]"), s.name || (s.elements.forEach((o) => {
        const r = o.getAttribute("data-moonwalk"), a = r.length ? t.walks[r] : t.walks.default;
        a && a.transition && (a.transition.from, v(o, a.transition.from));
      }), s.elements.forEach((o) => s.observer.observe(o)));
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
      (n, o) => {
        for (let r = 0; r < n.length; r += 1) {
          const a = n[r], c = a.boundingClientRect, d = window.innerHeight, h = window.innerWidth;
          if (a.isIntersecting && t.callback) {
            let p = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  p.direction = "bottom";
                  break;
                case "up":
                  p.direction = "top";
                  break;
                case "right":
                  p.direction = "left";
                  break;
                case "left":
                  p.direction = "right";
                  break;
              }
            s.set(a.target, {
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right
            });
            const m = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, m, p), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && o.unobserve(a.target);
          } else if (t.onExit && a.target.hasAttribute("data-moonwalk-run-triggered")) {
            const p = a.target.hasAttribute(
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
              c.bottom <= 0 ? m.direction = "top" : c.top >= d ? m.direction = "bottom" : c.right <= 0 ? m.direction = "left" : c.left >= h && (m.direction = "right");
            t.onExit(a.target, p, m), t.repeated || o.unobserve(a.target);
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
      (n, o) => {
        for (let r = 0; r < n.length; r += 1) {
          const a = n[r];
          if (a.isIntersecting || a.intersectionRatio > 0) {
            t.running = !0;
            const c = a.target.getAttribute("data-moonwalk");
            a.target.getAttribute("data-testid") || c || a.target.className, a.isIntersecting, a.intersectionRatio;
            const d = c.length ? s.walks[c] : s.walks.default, { duration: h, transition: p, startDelay: m } = d, y = d.interval !== void 0 ? d.interval : 0.15;
            let { alphaTween: b } = d, S = (h - y) * -1;
            t.stage.firstTween && (S = 0, t.stage.firstTween = !1), typeof b == "object" && b !== null ? b.duration = b.duration ? b.duration : h : b === !0 && (b = {
              duration: h,
              ease: "easeIn"
            });
            const E = () => {
              p ? this.tweenJS(
                t,
                a.target,
                h,
                y,
                p,
                S,
                b
              ) : this.tweenCSS(
                t,
                a.target,
                h,
                y,
                p,
                S
              );
            }, T = () => {
              m ? hi(m, E) : E();
            };
            if (a.target.tagName === "IMG")
              Se(a.target).then(() => T());
            else if (a.target.hasAttribute("data-placeholder"))
              T();
            else {
              const R = a.target.querySelectorAll("img");
              R.length ? Array.from(R).every(
                (F) => F.hasAttribute("data-ll-placeholder")
              ) ? T() : ss(R).then(() => T()) : T();
            }
            o.unobserve(a.target);
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
  tweenJS(t, e, s, n, o, r, a) {
    if (e.getAttribute("data-testid") || e.getAttribute("data-moonwalk") || e.className, A.hasAttribute(e, "data-moonwalked"))
      return;
    const c = this.calculateDelay(t, s, r);
    o.from;
    const { ease: d, ...h } = o.to, p = De(d || "easeOut");
    c.toFixed(3);
    const m = g(e, h, {
      duration: s,
      delay: c,
      ease: p
    });
    m && m.finished ? m.finished.then(() => {
      e.setAttribute("data-moonwalked", "");
    }).catch((y) => {
      e.setAttribute("data-moonwalked", "");
    }) : e.setAttribute("data-moonwalked", ""), a && (a.duration, (c + (a.delay || 0)).toFixed(3), g(e, { opacity: 1 }, {
      duration: a.duration,
      ease: De(a.ease || "easeIn"),
      delay: c + (a.delay || 0)
    })), this.updateAnimationState(t, c, s);
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
  tweenCSS(t, e, s, n, o, r) {
    if (A.hasAttribute(e, "data-moonwalked"))
      return;
    const a = this.calculateDelay(
      t,
      s,
      r
    );
    e.getAttribute("data-testid") || e.className, a.toFixed(3), hi(a, () => {
      e.classList.add("moonwalked"), e.setAttribute("data-moonwalked", "");
    }), this.updateAnimationState(t, a, s);
  }
}
const Wh = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, oe = [];
class gu {
  constructor(t, e, s = {}) {
    this.app = t, this.opts = W(s, Wh), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
    const n = document.querySelector(
      `[data-popover-template=${e.dataset.popoverTarget}]`
    );
    if (!n) {
      console.warn(`Popover template not found for trigger: ${e.dataset.popoverTarget}`);
      return;
    }
    this.popover = document.createElement("div"), this.popover.innerHTML = n.innerHTML, Object.assign(this.popover.style, {
      position: "fixed"
    }), this.popover.classList.add(this.className), n.classList && n.classList.length > 0 && n.classList.forEach((o) => {
      o !== "popover-template" && this.popover.classList.add(o);
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), oe.includes(this) || oe.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
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
      height: o
    } = this.trigger.getBoundingClientRect(), { offsetHeight: r, offsetWidth: a } = this.popover, c = this.orderedPositions.indexOf(this.position), d = {
      top: {
        name: "top",
        top: e - r,
        left: s - (a - n) / 2
      },
      right: {
        name: "right",
        top: e - (r - o) / 2,
        left: s + n
      },
      bottom: {
        name: "bottom",
        top: e + o,
        left: s - (a - n) / 2
      },
      left: {
        name: "left",
        top: e - (r - o) / 2,
        left: s - a
      }
    }, h = this.orderedPositions.slice(c).concat(this.orderedPositions.slice(0, c)).map((p) => d[p]).find((p) => (t || (this.popover.style.top = `${p.top}px`, this.popover.style.left = `${p.left}px`), A.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((p) => {
      this.popover.classList.remove(`${this.className}--${p}`);
    }), h ? (t && this.isVisible ? g(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? g(this.popover, {
      top: Math.max(0, d.bottom.top),
      left: Math.max(0, d.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, d.bottom.top)}px`, this.popover.style.left = `${Math.max(0, d.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = oe.indexOf(this);
    t !== -1 && oe.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    oe.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(kt, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(kt, this.boundHandleScroll);
  }
}
const Uh = {
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
class yu {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", s = {}) {
    this.app = t, this.opts = W(s, Uh), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
  }
  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    const t = document.querySelectorAll("[data-popup-trigger]"), e = Array.from(t).filter((o) => {
      const r = o.getAttribute("data-popup-trigger");
      if (typeof r == "string") {
        const a = document.querySelector(r);
        return a && a.matches(this.opts.selector);
      }
      return !1;
    }), s = document.querySelectorAll(this.opts.selector), n = [];
    s.forEach((o) => {
      const r = o.querySelectorAll("[data-popup-close]");
      n.push(...r);
    }), e.forEach((o) => {
      const r = o.getAttribute("data-popup-trigger"), a = o.getAttribute("data-popup-key") || this.getKeyFromTarget(r);
      o.addEventListener("click", (c) => {
        this.opts.responsive(this.app) && (c.stopImmediatePropagation(), c.preventDefault(), this.open(o, r, a));
      });
    }), n.forEach((o) => {
      const r = o.closest(this.opts.selector), a = r ? r.getAttribute("data-popup-key") : null;
      o.addEventListener("click", (c) => {
        c.stopImmediatePropagation(), c.preventDefault(), (!this.popupKey || !a || this.popupKey === a) && (this.opts.onClose(this), this.close());
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
const Kh = {
  onIntersect: (i, t) => {
  }
};
class bu {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Kh), this.initialize();
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
const Yh = {};
class wu {
  constructor(t, e = {}) {
    this.app = t, this.opts = W(e, Yh), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-boxes-stacked]"), e = new IntersectionObserver((s) => {
      const [{ isIntersecting: n, target: o }] = s;
      n && this.adjustBox(o);
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
      const o = n.getAttribute("data-boxes-stacked-pull");
      let r;
      switch (o) {
        case "1/3":
          r = n.clientHeight / 3;
          break;
        case "2/3":
          r = n.clientHeight / 3 * 2;
          break;
        case "1/2":
          r = n.clientHeight / 2;
          break;
        default:
          console.error(
            "==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value"
          );
      }
      this.pull(n, r);
    }
  }
  pull(t, e) {
    v(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    v(t, { height: e.clientHeight });
  }
}
const Io = {
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
}, jh = {
  el: "header[data-nav]",
  on: dt,
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
        delay: xt(0.1, { startDelay: i.opts.enterDelay }),
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
    ...Io
  }
};
class vu {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = W(e, jh), this.mainOpts.pinOnOutline && window.addEventListener(Ue, () => {
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
      yt,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      kt,
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
    }), this.mainOpts.pinOnForcedScroll && (window.addEventListener(qe, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      We,
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
    return e = W(s, Io, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      ts,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      es,
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
class Su {
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
        const o = s.scrollHeight;
        t.push(
          g(s, { height: [0, o + "px"] }, {
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
        const o = s.scrollHeight;
        s.style.height = o + "px", s.offsetHeight, t.push(
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
        t.content.forEach((n, o) => {
          const r = n.scrollHeight;
          n.style.height = r + "px", n.offsetHeight, e.push(
            g(n, { height: 0 }, {
              duration: 0.25,
              ease: "easeOut",
              delay: o * 0.1
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
class Au {
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
const Eu = (i, t) => {
  const e = document.createElement("script");
  let s = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = i, e.onreadystatechange = function() {
    !s && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (s = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  Zh as Application,
  on as Breakpoints,
  Qh as Cookies,
  Jh as CoverOverlay,
  tu as Dataloader,
  A as Dom,
  eu as Dropdown,
  iu as EqualHeightElements,
  su as EqualHeightImages,
  Xh as Events,
  nu as FixedHeader,
  ou as FooterReveal,
  au as HeroSlider,
  lu as HeroVideo,
  cu as Lazyload,
  hu as Lightbox,
  uu as Links,
  du as Looper,
  pu as Marquee,
  fu as MobileMenu,
  mu as Moonwalk,
  ru as Parallax,
  gu as Popover,
  yu as Popup,
  bu as ScrollSpy,
  wu as StackedBoxes,
  vu as StickyHeader,
  Su as Toggler,
  Au as Typography,
  W as _defaultsDeep,
  g as animate,
  Se as imageIsLoaded,
  ss as imagesAreLoaded,
  Eu as loadScript,
  me as prefersReducedMotion,
  sn as rafCallback,
  Gh as scroll,
  xt as stagger
};
