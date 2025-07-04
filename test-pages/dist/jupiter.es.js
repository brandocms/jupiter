var Lg = Object.defineProperty;
var Uc = (s) => {
  throw TypeError(s);
};
var Dg = (s, t, e) => t in s ? Lg(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var Yt = (s, t, e) => Dg(s, typeof t != "symbol" ? t + "" : t, e), yl = (s, t, e) => t.has(s) || Uc("Cannot " + e);
var Et = (s, t, e) => (yl(s, t, "read from private field"), e ? e.call(s) : t.get(s)), li = (s, t, e) => t.has(s) ? Uc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), ut = (s, t, e, i) => (yl(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), Jt = (s, t, e) => (yl(s, t, "access private method"), e);
function vr(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function pd(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ei = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, _s = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Xh, He, te, hr = 1e8, Ge = 1 / hr, Xl = Math.PI * 2, Rg = Xl / 4, Ng = 0, gd = Math.sqrt, zg = Math.cos, Fg = Math.sin, De = function(t) {
  return typeof t == "string";
}, se = function(t) {
  return typeof t == "function";
}, Ir = function(t) {
  return typeof t == "number";
}, Vh = function(t) {
  return typeof t > "u";
}, dr = function(t) {
  return typeof t == "object";
}, ci = function(t) {
  return t !== !1;
}, Gh = function() {
  return typeof window < "u";
}, Qo = function(t) {
  return se(t) || De(t);
}, md = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ke = Array.isArray, Vl = /(?:-?\.?\d|\.)+/gi, _d = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Qn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, wl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, vd = /[+-]=-?[.\d]+/, yd = /[^,'"\[\]\s]+/gi, Hg = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ie, tr, Gl, Kh, Ci = {}, Ma = {}, wd, bd = function(t) {
  return (Ma = vs(t, Ci)) && Ut;
}, jh = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, yo = function(t, e) {
  return !e && console.warn(t);
}, Td = function(t, e) {
  return t && (Ci[t] = e) && Ma && (Ma[t] = e) || Ci;
}, wo = function() {
  return 0;
}, $g = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, va = {
  suppressEvents: !0,
  kill: !1
}, Bg = {
  suppressEvents: !0
}, Zh = {}, Ur = [], Kl = {}, xd, yi = {}, bl = {}, qc = 30, ya = [], Qh = "", Jh = function(t) {
  var e = t[0], i, r;
  if (dr(e) || se(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ya.length; r-- && !ya[r].targetTest(e); )
      ;
    i = ya[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new Vd(t[r], i))) || t.splice(r, 1);
  return t;
}, _n = function(t) {
  return t._gsap || Jh(zi(t))[0]._gsap;
}, Sd = function(t, e, i) {
  return (i = t[e]) && se(i) ? t[e]() : Vh(i) && t.getAttribute && t.getAttribute(e) || i;
}, ui = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, ce = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ye = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, ns = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, Yg = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, La = function() {
  var t = Ur.length, e = Ur.slice(0), i, r;
  for (Kl = {}, Ur.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, tc = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, Ed = function(t, e, i, r) {
  Ur.length && !He && La(), t.render(e, i, !!(He && e < 0 && tc(t))), Ur.length && !He && La();
}, Cd = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(yd).length < 2 ? e : De(t) ? t.trim() : t;
}, Pd = function(t) {
  return t;
}, Pi = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Wg = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, vs = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Xc = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = dr(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Da = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, Qs = function(t) {
  var e = t.parent || ie, i = t.keyframes ? Wg(Ke(t.keyframes)) : Pi;
  if (ci(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Ug = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Od = function(t, e, i, r, n) {
  var o = t[r], a;
  if (n)
    for (a = e[n]; o && o[n] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = o, e.parent = e._dp = t, e;
}, tl = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, o = e._next;
  n ? n._next = o : t[i] === e && (t[i] = o), o ? o._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, jr = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, vn = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, qg = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, jl = function(t, e, i, r) {
  return t._startAt && (He ? t._startAt.revert(va) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, Xg = function s(t) {
  return !t || t._ts && s(t.parent);
}, Vc = function(t) {
  return t._repeat ? ys(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ys = function(t, e) {
  var i = Math.floor(t = ye(t / e));
  return t && i === t ? i - 1 : i;
}, Ra = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, el = function(t) {
  return t._end = ye(t._start + (t._tDur / Math.abs(t._ts || t._rts || Ge) || 0));
}, il = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = ye(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), el(t), i._dirty || vn(i, t)), t;
}, Ad = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Ra(t.rawTime(), e), (!e._dur || $o(0, e.totalDuration(), i) - e._tTime > Ge) && e.render(i, !0)), vn(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, nr = function(t, e, i, r) {
  return e.parent && jr(e), e._start = ye((Ir(i) ? i : i || t !== ie ? Li(t, i, e) : t._time) + e._delay), e._end = ye(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Od(t, e, "_first", "_last", t._sort ? "_start" : 0), Zl(e) || (t._recent = e), r || Ad(t, e), t._ts < 0 && il(t, t._tTime), t;
}, kd = function(t, e) {
  return (Ci.ScrollTrigger || jh("scrollTrigger", e)) && Ci.ScrollTrigger.create(e, t);
}, Id = function(t, e, i, r, n) {
  if (ic(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !He && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && xd !== bi.frame)
    return Ur.push(t), t._lazy = [n, r], 1;
}, Vg = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Zl = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Gg = function(t, e, i, r) {
  var n = t.ratio, o = e < 0 || !e && (!t._start && Vg(t) && !(!t._initted && Zl(t)) || (t._ts < 0 || t._dp._ts < 0) && !Zl(t)) ? 0 : 1, a = t._rDelay, h = 0, c, u, d;
  if (a && t._repeat && (h = $o(0, t._tDur, e), u = ys(h, a), t._yoyo && u & 1 && (o = 1 - o), u !== ys(t._tTime, a) && (n = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== n || He || r || t._zTime === Ge || !e && t._zTime) {
    if (!t._initted && Id(t, e, r, i, h))
      return;
    for (d = t._zTime, t._zTime = e || (i ? Ge : 0), i || (i = e && !d), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = h, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && jl(t, e, i, !0), t._onUpdate && !i && Si(t, "onUpdate"), h && t._repeat && !i && t.parent && Si(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && jr(t, 1), !i && !He && (Si(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Kg = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, ws = function(t, e, i, r) {
  var n = t._repeat, o = ye(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = n ? n < 0 ? 1e10 : ye(o * (n + 1) + t._rDelay * n) : o, a > 0 && !r && il(t, t._tTime = t._tDur * a), t.parent && el(t), i || vn(t.parent, t), t;
}, Gc = function(t) {
  return t instanceof ni ? vn(t) : ws(t, t._dur);
}, jg = {
  _start: 0,
  endTime: wo,
  totalDuration: wo
}, Li = function s(t, e, i) {
  var r = t.labels, n = t._recent || jg, o = t.duration() >= hr ? n.endTime(!1) : t._dur, a, h, c;
  return De(e) && (isNaN(e) || e in r) ? (h = e.charAt(0), c = e.substr(-1) === "%", a = e.indexOf("="), h === "<" || h === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (h === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = o), r[e]) : (h = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), c && i && (h = h / 100 * (Ke(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + h : o + h)) : e == null ? o : +e;
}, Js = function(t, e, i) {
  var r = Ir(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), o = e[n], a, h;
  if (r && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, h = i; h && !("immediateRender" in a); )
      a = h.vars.defaults || {}, h = ci(h.vars.inherit) && h.parent;
    o.immediateRender = ci(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[n - 1];
  }
  return new ve(e[0], o, e[n + 1]);
}, tn = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, $o = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, qe = function(t, e) {
  return !De(t) || !(e = Hg.exec(t)) ? "" : e[1];
}, Zg = function(t, e, i) {
  return tn(i, function(r) {
    return $o(t, e, r);
  });
}, Ql = [].slice, Md = function(t, e) {
  return t && dr(t) && "length" in t && (!e && !t.length || t.length - 1 in t && dr(t[0])) && !t.nodeType && t !== tr;
}, Qg = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return De(r) && !e || Md(r, 1) ? (n = i).push.apply(n, zi(r)) : i.push(r);
  }) || i;
}, zi = function(t, e, i) {
  return te && !e && te.selector ? te.selector(t) : De(t) && !i && (Gl || !bs()) ? Ql.call((e || Kh).querySelectorAll(t), 0) : Ke(t) ? Qg(t, i) : Md(t) ? Ql.call(t, 0) : t ? [t] : [];
}, Jl = function(t) {
  return t = zi(t)[0] || yo("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return zi(e, i.querySelectorAll ? i : i === t ? yo("Invalid scope") || Kh.createElement("div") : t);
  };
}, Ld = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Dd = function(t) {
  if (se(t))
    return t;
  var e = dr(t) ? t : {
    each: t
  }, i = yn(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, o = {}, a = r > 0 && r < 1, h = isNaN(r) || a, c = e.axis, u = r, d = r;
  return De(r) ? u = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && h && (u = r[0], d = r[1]), function(f, l, g) {
    var p = (g || e).length, _ = o[p], C, v, x, S, w, M, O, k, D;
    if (!_) {
      if (D = e.grid === "auto" ? 0 : (e.grid || [1, hr])[1], !D) {
        for (O = -1e8; O < (O = g[D++].getBoundingClientRect().left) && D < p; )
          ;
        D < p && D--;
      }
      for (_ = o[p] = [], C = h ? Math.min(D, p) * u - 0.5 : r % D, v = D === hr ? 0 : h ? p * d / D - 0.5 : r / D | 0, O = 0, k = hr, M = 0; M < p; M++)
        x = M % D - C, S = v - (M / D | 0), _[M] = w = c ? Math.abs(c === "y" ? S : x) : gd(x * x + S * S), w > O && (O = w), w < k && (k = w);
      r === "random" && Ld(_), _.max = O - k, _.min = k, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (D > p ? p - 1 : c ? c === "y" ? p / D : D : Math.max(D, p / D)) || 0) * (r === "edges" ? -1 : 1), _.b = p < 0 ? n - p : n, _.u = qe(e.amount || e.each) || 0, i = i && p < 0 ? Ud(i) : i;
    }
    return p = (_[f] - _.min) / _.max || 0, ye(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, th = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = ye(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (Ir(i) ? 0 : qe(i));
  };
}, Rd = function(t, e) {
  var i = Ke(t), r, n;
  return !i && dr(t) && (r = i = t.radius || hr, t.values ? (t = zi(t.values), (n = !Ir(t[0])) && (r *= r)) : t = th(t.increment)), tn(e, i ? se(t) ? function(o) {
    return n = t(o), Math.abs(n - o) <= r ? n : o;
  } : function(o) {
    for (var a = parseFloat(n ? o.x : o), h = parseFloat(n ? o.y : 0), c = hr, u = 0, d = t.length, f, l; d--; )
      n ? (f = t[d].x - a, l = t[d].y - h, f = f * f + l * l) : f = Math.abs(t[d] - a), f < c && (c = f, u = d);
    return u = !r || c <= r ? t[u] : o, n || u === o || Ir(o) ? u : u + qe(o);
  } : th(t));
}, Nd = function(t, e, i, r) {
  return tn(Ke(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return Ke(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, Jg = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}, tm = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || qe(i));
  };
}, em = function(t, e, i) {
  return Fd(t, e, 0, 1, i);
}, zd = function(t, e, i) {
  return tn(i, function(r) {
    return t[~~e(r)];
  });
}, im = function s(t, e, i) {
  var r = e - t;
  return Ke(t) ? zd(t, s(0, t.length), e) : tn(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, rm = function s(t, e, i) {
  var r = e - t, n = r * 2;
  return Ke(t) ? zd(t, s(0, t.length - 1), e) : tn(i, function(o) {
    return o = (n + (o - t) % n) % n || 0, t + (o > r ? n - o : o);
  });
}, bo = function(t) {
  for (var e = 0, i = "", r, n, o, a; ~(r = t.indexOf("random(", e)); )
    o = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, o - r - 7).match(a ? yd : Vl), i += t.substr(e, r - e) + Nd(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, Fd = function(t, e, i, r, n) {
  var o = e - t, a = r - i;
  return tn(n, function(h) {
    return i + ((h - t) / o * a || 0);
  });
}, nm = function s(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(l) {
    return (1 - l) * t + l * e;
  };
  if (!n) {
    var o = De(t), a = {}, h, c, u, d, f;
    if (i === !0 && (r = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ke(t) && !Ke(e)) {
      for (u = [], d = t.length, f = d - 2, c = 1; c < d; c++)
        u.push(s(t[c - 1], t[c]));
      d--, n = function(g) {
        g *= d;
        var p = Math.min(f, ~~g);
        return u[p](g - p);
      }, i = e;
    } else r || (t = vs(Ke(t) ? [] : {}, t));
    if (!u) {
      for (h in e)
        ec.call(a, t, h, "get", e[h]);
      n = function(g) {
        return sc(g, a) || (o ? t.p : t);
      };
    }
  }
  return tn(i, n);
}, Kc = function(t, e, i) {
  var r = t.labels, n = hr, o, a, h;
  for (o in r)
    a = r[o] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (h = o, n = a);
  return h;
}, Si = function(t, e, i) {
  var r = t.vars, n = r[e], o = te, a = t._ctx, h, c, u;
  if (n)
    return h = r[e + "Params"], c = r.callbackScope || t, i && Ur.length && La(), a && (te = a), u = h ? n.apply(c, h) : n.call(c), te = o, u;
}, Fs = function(t) {
  return jr(t), t.scrollTrigger && t.scrollTrigger.kill(!!He), t.progress() < 1 && Si(t, "onInterrupt"), t;
}, Jn, Hd = [], $d = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Gh() || t.headless) {
      var e = t.name, i = se(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: wo,
        render: sc,
        add: ec,
        kill: wm,
        modifier: ym,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: nc,
        aliases: {},
        register: 0
      };
      if (bs(), t !== r) {
        if (yi[e])
          return;
        Pi(r, Pi(Da(t, n), o)), vs(r.prototype, vs(n, Da(t, o))), yi[r.prop = e] = r, t.targetTest && (ya.push(r), Zh[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Td(e, r), t.register && t.register(Ut, r, di);
    } else
      Hd.push(t);
}, $t = 255, Hs = {
  aqua: [0, $t, $t],
  lime: [0, $t, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, $t],
  navy: [0, 0, 128],
  white: [$t, $t, $t],
  olive: [128, 128, 0],
  yellow: [$t, $t, 0],
  orange: [$t, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [$t, 0, 0],
  pink: [$t, 192, 203],
  cyan: [0, $t, $t],
  transparent: [$t, $t, $t, 0]
}, Tl = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * $t + 0.5 | 0;
}, Bd = function(t, e, i) {
  var r = t ? Ir(t) ? [t >> 16, t >> 8 & $t, t & $t] : 0 : Hs.black, n, o, a, h, c, u, d, f, l, g;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Hs[t])
      r = Hs[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + n + n + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & $t, r & $t, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & $t, t & $t];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = g = t.match(Vl), !e)
        h = +r[0] % 360 / 360, c = +r[1] / 100, u = +r[2] / 100, o = u <= 0.5 ? u * (c + 1) : u + c - u * c, n = u * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = Tl(h + 1 / 3, n, o), r[1] = Tl(h, n, o), r[2] = Tl(h - 1 / 3, n, o);
      else if (~t.indexOf("="))
        return r = t.match(_d), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Vl) || Hs.transparent;
    r = r.map(Number);
  }
  return e && !g && (n = r[0] / $t, o = r[1] / $t, a = r[2] / $t, d = Math.max(n, o, a), f = Math.min(n, o, a), u = (d + f) / 2, d === f ? h = c = 0 : (l = d - f, c = u > 0.5 ? l / (2 - d - f) : l / (d + f), h = d === n ? (o - a) / l + (o < a ? 6 : 0) : d === o ? (a - n) / l + 2 : (n - o) / l + 4, h *= 60), r[0] = ~~(h + 0.5), r[1] = ~~(c * 100 + 0.5), r[2] = ~~(u * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Yd = function(t) {
  var e = [], i = [], r = -1;
  return t.split(qr).forEach(function(n) {
    var o = n.match(Qn) || [];
    e.push.apply(e, o), i.push(r += o.length + 1);
  }), e.c = i, e;
}, jc = function(t, e, i) {
  var r = "", n = (t + r).match(qr), o = e ? "hsla(" : "rgba(", a = 0, h, c, u, d;
  if (!n)
    return t;
  if (n = n.map(function(f) {
    return (f = Bd(f, e, 1)) && o + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), i && (u = Yd(t), h = i.c, h.join(r) !== u.c.join(r)))
    for (c = t.replace(qr, "1").split(Qn), d = c.length - 1; a < d; a++)
      r += c[a] + (~h.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (u.length ? u : n.length ? n : i).shift());
  if (!c)
    for (c = t.split(qr), d = c.length - 1; a < d; a++)
      r += c[a] + n[a];
  return r + c[d];
}, qr = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Hs)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), sm = /hsl[a]?\(/, Wd = function(t) {
  var e = t.join(" "), i;
  if (qr.lastIndex = 0, qr.test(e))
    return i = sm.test(e), t[1] = jc(t[1], i), t[0] = jc(t[0], i, Yd(t[1])), !0;
}, To, bi = function() {
  var s = Date.now, t = 500, e = 33, i = s(), r = i, n = 1e3 / 240, o = n, a = [], h, c, u, d, f, l, g = function p(_) {
    var C = s() - r, v = _ === !0, x, S, w, M;
    if ((C > t || C < 0) && (i += C - e), r += C, w = r - i, x = w - o, (x > 0 || v) && (M = ++d.frame, f = w - d.time * 1e3, d.time = w = w / 1e3, o += x + (x >= n ? 4 : n - x), S = 1), v || (h = c(p)), S)
      for (l = 0; l < a.length; l++)
        a[l](w, f, M, _);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(_) {
      return f / (1e3 / (_ || 60));
    },
    wake: function() {
      wd && (!Gl && Gh() && (tr = Gl = window, Kh = tr.document || {}, Ci.gsap = Ut, (tr.gsapVersions || (tr.gsapVersions = [])).push(Ut.version), bd(Ma || tr.GreenSockGlobals || !tr.gsap && tr || {}), Hd.forEach($d)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, h && d.sleep(), c = u || function(_) {
        return setTimeout(_, o - d.time * 1e3 + 1 | 0);
      }, To = 1, g(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(h), To = 0, c = wo;
    },
    lagSmoothing: function(_, C) {
      t = _ || 1 / 0, e = Math.min(C || 33, t);
    },
    fps: function(_) {
      n = 1e3 / (_ || 240), o = d.time * 1e3 + n;
    },
    add: function(_, C, v) {
      var x = C ? function(S, w, M, O) {
        _(S, w, M, O), d.remove(x);
      } : _;
      return d.remove(_), a[v ? "unshift" : "push"](x), bs(), x;
    },
    remove: function(_, C) {
      ~(C = a.indexOf(_)) && a.splice(C, 1) && l >= C && l--;
    },
    _listeners: a
  }, d;
}(), bs = function() {
  return !To && bi.wake();
}, Pt = {}, om = /^[\d.\-M][\d.\-,\s]/, am = /["']/g, lm = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, o = i.length, a, h, c; n < o; n++)
    h = i[n], a = n !== o - 1 ? h.lastIndexOf(",") : h.length, c = h.substr(0, a), e[r] = isNaN(c) ? c.replace(am, "").trim() : +c, r = h.substr(a + 1).trim();
  return e;
}, hm = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, cm = function(t) {
  var e = (t + "").split("("), i = Pt[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [lm(e[1])] : hm(t).split(",").map(Cd)) : Pt._CE && om.test(t) ? Pt._CE("", t) : i;
}, Ud = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, qd = function s(t, e) {
  for (var i = t._first, r; i; )
    i instanceof ni ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, yn = function(t, e) {
  return t && (se(t) ? t : Pt[t] || cm(t)) || e;
}, Nn = function(t, e, i, r) {
  i === void 0 && (i = function(h) {
    return 1 - e(1 - h);
  }), r === void 0 && (r = function(h) {
    return h < 0.5 ? e(h * 2) / 2 : 1 - e((1 - h) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, o;
  return ui(t, function(a) {
    Pt[a] = Ci[a] = n, Pt[o = a.toLowerCase()] = i;
    for (var h in n)
      Pt[o + (h === "easeIn" ? ".in" : h === "easeOut" ? ".out" : ".inOut")] = Pt[a + "." + h] = n[h];
  }), n;
}, Xd = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, xl = function s(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = n / Xl * (Math.asin(1 / r) || 0), a = function(u) {
    return u === 1 ? 1 : r * Math.pow(2, -10 * u) * Fg((u - o) * n) + 1;
  }, h = t === "out" ? a : t === "in" ? function(c) {
    return 1 - a(1 - c);
  } : Xd(a);
  return n = Xl / n, h.config = function(c, u) {
    return s(t, c, u);
  }, h;
}, Sl = function s(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Xd(i);
  return r.config = function(n) {
    return s(t, n);
  }, r;
};
ui("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  Nn(s + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
Pt.Linear.easeNone = Pt.none = Pt.Linear.easeIn;
Nn("Elastic", xl("in"), xl("out"), xl());
(function(s, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Nn("Bounce", function(o) {
    return 1 - n(1 - o);
  }, n);
})(7.5625, 2.75);
Nn("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
Nn("Circ", function(s) {
  return -(gd(1 - s * s) - 1);
});
Nn("Sine", function(s) {
  return s === 1 ? 1 : -zg(s * Rg) + 1;
});
Nn("Back", Sl("in"), Sl("out"), Sl());
Pt.SteppedEase = Pt.steps = Ci.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, o = 1 - Ge;
    return function(a) {
      return ((r * $o(0, o, a) | 0) + n) * i;
    };
  }
};
_s.ease = Pt["quad.out"];
ui("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Qh += s + "," + s + "Params,";
});
var Vd = function(t, e) {
  this.id = Ng++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Sd, this.set = e ? e.getSetter : nc;
}, xo = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, ws(this, +e.duration, 1, 1), this.data = e.data, te && (this._ctx = te, te.data.push(this)), To || bi.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, ws(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (bs(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (il(this, i), !n._dp || n.parent || Ad(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && nr(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === Ge || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Ed(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Vc(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Vc(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? ys(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Ra(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime($o(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), el(this), qg(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (bs(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Ge && (this._tTime -= Ge)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && nr(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ci(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ra(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Bg);
    var r = He;
    return He = i, tc(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), He = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Gc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Gc(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(Li(this, i), ci(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, ci(r)), this._dur || (this._zTime = -1e-8), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -1e-8 : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -1e-8, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - Ge);
  }, t.eventCallback = function(i, r, n) {
    var o = this.vars;
    return arguments.length > 1 ? (r ? (o[i] = r, n && (o[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete o[i], this) : o[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var o = se(i) ? i : Pd, a = function() {
        var c = r.then;
        r.then = null, se(o) && (o = o(r)) && (o.then || o === r) && (r.then = c), n(o), r.then = c;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    Fs(this);
  }, s;
}();
Pi(xo.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -1e-8,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ni = /* @__PURE__ */ function(s) {
  pd(t, s);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = s.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = ci(i.sortChildren), ie && nr(i.parent || ie, vr(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && kd(vr(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, o) {
    return Js(0, arguments, this), this;
  }, e.from = function(r, n, o) {
    return Js(1, arguments, this), this;
  }, e.fromTo = function(r, n, o, a) {
    return Js(2, arguments, this), this;
  }, e.set = function(r, n, o) {
    return n.duration = 0, n.parent = this, Qs(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new ve(r, n, Li(this, o), 1), this;
  }, e.call = function(r, n, o) {
    return nr(this, ve.delayedCall(0, r, n), o);
  }, e.staggerTo = function(r, n, o, a, h, c, u) {
    return o.duration = n, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = u, o.parent = this, new ve(r, o, Li(this, h)), this;
  }, e.staggerFrom = function(r, n, o, a, h, c, u) {
    return o.runBackwards = 1, Qs(o).immediateRender = ci(o.immediateRender), this.staggerTo(r, n, o, a, h, c, u);
  }, e.staggerFromTo = function(r, n, o, a, h, c, u, d) {
    return a.startAt = o, Qs(a).immediateRender = ci(a.immediateRender), this.staggerTo(r, n, a, h, c, u, d);
  }, e.render = function(r, n, o) {
    var a = this._time, h = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, u = r <= 0 ? 0 : ye(r), d = this._zTime < 0 != r < 0 && (this._initted || !c), f, l, g, p, _, C, v, x, S, w, M, O;
    if (this !== ie && u > h && r >= 0 && (u = h), u !== this._tTime || o || d) {
      if (a !== this._time && c && (u += this._time - a, r += this._time - a), f = u, S = this._start, x = this._ts, C = !x, d && (c || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (M = this._yoyo, _ = c + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(_ * 100 + r, n, o);
        if (f = ye(u % _), u === h ? (p = this._repeat, f = c) : (w = ye(u / _), p = ~~w, p && p === w && (f = c, p--), f > c && (f = c)), w = ys(this._tTime, _), !a && this._tTime && w !== p && this._tTime - w * _ - this._dur <= 0 && (w = p), M && p & 1 && (f = c - f, O = 1), p !== w && !this._lock) {
          var k = M && w & 1, D = k === (M && p & 1);
          if (p < w && (k = !k), a = k ? 0 : u % c ? c : u, this._lock = 1, this.render(a || (O ? 0 : ye(p * _)), n, !c)._lock = 0, this._tTime = u, !n && this.parent && Si(this, "onRepeat"), this.vars.repeatRefresh && !O && (this.invalidate()._lock = 1), a && a !== this._time || C !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, h = this._tDur, D && (this._lock = 2, a = k ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !O && this.invalidate()), this._lock = 0, !this._ts && !C)
            return this;
          qd(this, O);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (v = Kg(this, ye(a), ye(f)), v && (u -= f - (f = v._start))), this._tTime = u, this._time = f, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && u && !n && !w && (Si(this, "onStart"), this._tTime !== u))
        return this;
      if (f >= a && r >= 0)
        for (l = this._first; l; ) {
          if (g = l._next, (l._act || f >= l._start) && l._ts && v !== l) {
            if (l.parent !== this)
              return this.render(r, n, o);
            if (l.render(l._ts > 0 ? (f - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (f - l._start) * l._ts, n, o), f !== this._time || !this._ts && !C) {
              v = 0, g && (u += this._zTime = -1e-8);
              break;
            }
          }
          l = g;
        }
      else {
        l = this._last;
        for (var z = r < 0 ? r : f; l; ) {
          if (g = l._prev, (l._act || z <= l._end) && l._ts && v !== l) {
            if (l.parent !== this)
              return this.render(r, n, o);
            if (l.render(l._ts > 0 ? (z - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (z - l._start) * l._ts, n, o || He && tc(l)), f !== this._time || !this._ts && !C) {
              v = 0, g && (u += this._zTime = z ? -1e-8 : Ge);
              break;
            }
          }
          l = g;
        }
      }
      if (v && !n && (this.pause(), v.render(f >= a ? 0 : -1e-8)._zTime = f >= a ? 1 : -1, this._ts))
        return this._start = S, el(this), this.render(r, n, o);
      this._onUpdate && !n && Si(this, "onUpdate", !0), (u === h && this._tTime >= this.totalDuration() || !u && a) && (S === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((r || !c) && (u === h && this._ts > 0 || !u && this._ts < 0) && jr(this, 1), !n && !(r < 0 && !a) && (u || a || !h) && (Si(this, u === h && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < h && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var o = this;
    if (Ir(n) || (n = Li(this, n, r)), !(r instanceof xo)) {
      if (Ke(r))
        return r.forEach(function(a) {
          return o.add(a, n);
        }), this;
      if (De(r))
        return this.addLabel(r, n);
      if (se(r))
        r = ve.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? nr(this, r, n) : this;
  }, e.getChildren = function(r, n, o, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), o === void 0 && (o = !0), a === void 0 && (a = -1e8);
    for (var h = [], c = this._first; c; )
      c._start >= a && (c instanceof ve ? n && h.push(c) : (o && h.push(c), r && h.push.apply(h, c.getChildren(!0, n, o)))), c = c._next;
    return h;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
      if (n[o].vars.id === r)
        return n[o];
  }, e.remove = function(r) {
    return De(r) ? this.removeLabel(r) : se(r) ? this.killTweensOf(r) : (r.parent === this && tl(this, r), r === this._recent && (this._recent = this._last), vn(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(bi.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), s.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = Li(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, o) {
    var a = ve.delayedCall(0, n || wo, o);
    return a.data = "isPause", this._hasPause = 1, nr(this, a, Li(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = Li(this, r); n; )
      n._start === r && n.data === "isPause" && jr(n), n = n._next;
  }, e.killTweensOf = function(r, n, o) {
    for (var a = this.getTweensOf(r, o), h = a.length; h--; )
      Fr !== a[h] && a[h].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var o = [], a = zi(r), h = this._first, c = Ir(n), u; h; )
      h instanceof ve ? Yg(h._targets, a) && (c ? (!Fr || h._initted && h._ts) && h.globalTime(0) <= n && h.globalTime(h.totalDuration()) > n : !n || h.isActive()) && o.push(h) : (u = h.getTweensOf(a, n)).length && o.push.apply(o, u), h = h._next;
    return o;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var o = this, a = Li(o, r), h = n, c = h.startAt, u = h.onStart, d = h.onStartParams, f = h.immediateRender, l, g = ve.to(o, Pi({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || Ge,
      onStart: function() {
        if (o.pause(), !l) {
          var _ = n.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          g._dur !== _ && ws(g, _, 0, 1).render(g._time, !0, !0), l = 1;
        }
        u && u.apply(g, d || []);
      }
    }, n));
    return f ? g.render(0) : g;
  }, e.tweenFromTo = function(r, n, o) {
    return this.tweenTo(n, Pi({
      startAt: {
        time: Li(this, r)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Kc(this, Li(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Kc(this, Li(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + Ge);
  }, e.shiftChildren = function(r, n, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, h = this.labels, c; a; )
      a._start >= o && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (c in h)
        h[c] >= o && (h[c] += r);
    return vn(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return s.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, o; n; )
      o = n._next, this.remove(n), n = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), vn(this);
  }, e.totalDuration = function(r) {
    var n = 0, o = this, a = o._last, h = hr, c, u, d;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
    if (o._dirty) {
      for (d = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), u = a._start, u > h && o._sort && a._ts && !o._lock ? (o._lock = 1, nr(o, a, u - a._delay, 1)._lock = 0) : h = u, u < 0 && a._ts && (n -= u, (!d && !o._dp || d && d.smoothChildTiming) && (o._start += u / o._ts, o._time -= u, o._tTime -= u), o.shiftChildren(-u, !1, -1 / 0), h = 0), a._end > n && a._ts && (n = a._end), a = c;
      ws(o, o === ie && o._time > n ? o._time : n, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(r) {
    if (ie._ts && (Ed(ie, Ra(r, ie)), xd = bi.frame), bi.frame >= qc) {
      qc += Ei.autoSleep || 120;
      var n = ie._first;
      if ((!n || !n._ts) && Ei.autoSleep && bi._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || bi.sleep();
      }
    }
  }, t;
}(xo);
Pi(ni.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var um = function(t, e, i, r, n, o, a) {
  var h = new di(this._pt, t, e, 0, 1, Jd, null, n), c = 0, u = 0, d, f, l, g, p, _, C, v;
  for (h.b = i, h.e = r, i += "", r += "", (C = ~r.indexOf("random(")) && (r = bo(r)), o && (v = [i, r], o(v, t, e), i = v[0], r = v[1]), f = i.match(wl) || []; d = wl.exec(r); )
    g = d[0], p = r.substring(c, d.index), l ? l = (l + 1) % 5 : p.substr(-5) === "rgba(" && (l = 1), g !== f[u++] && (_ = parseFloat(f[u - 1]) || 0, h._pt = {
      _next: h._pt,
      p: p || u === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: g.charAt(1) === "=" ? ns(_, g) - _ : parseFloat(g) - _,
      m: l && l < 4 ? Math.round : 0
    }, c = wl.lastIndex);
  return h.c = c < r.length ? r.substring(c, r.length) : "", h.fp = a, (vd.test(r) || C) && (h.e = 0), this._pt = h, h;
}, ec = function(t, e, i, r, n, o, a, h, c, u) {
  se(r) && (r = r(n || 0, t, o));
  var d = t[e], f = i !== "get" ? i : se(d) ? c ? t[e.indexOf("set") || !se(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : d, l = se(d) ? c ? mm : Zd : rc, g;
  if (De(r) && (~r.indexOf("random(") && (r = bo(r)), r.charAt(1) === "=" && (g = ns(f, r) + (qe(f) || 0), (g || g === 0) && (r = g))), !u || f !== r || eh)
    return !isNaN(f * r) && r !== "" ? (g = new di(this._pt, t, e, +f || 0, r - (f || 0), typeof d == "boolean" ? vm : Qd, 0, l), c && (g.fp = c), a && g.modifier(a, this, t), this._pt = g) : (!d && !(e in t) && jh(e, r), um.call(this, t, e, f, r, l, h || Ei.stringFilter, c));
}, dm = function(t, e, i, r, n) {
  if (se(t) && (t = to(t, n, e, i, r)), !dr(t) || t.style && t.nodeType || Ke(t) || md(t))
    return De(t) ? to(t, n, e, i, r) : t;
  var o = {}, a;
  for (a in t)
    o[a] = to(t[a], n, e, i, r);
  return o;
}, Gd = function(t, e, i, r, n, o) {
  var a, h, c, u;
  if (yi[t] && (a = new yi[t]()).init(n, a.rawVars ? e[t] : dm(e[t], r, n, o, i), i, r, o) !== !1 && (i._pt = h = new di(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== Jn))
    for (c = i._ptLookup[i._targets.indexOf(n)], u = a._props.length; u--; )
      c[a._props[u]] = h;
  return a;
}, Fr, eh, ic = function s(t, e, i) {
  var r = t.vars, n = r.ease, o = r.startAt, a = r.immediateRender, h = r.lazy, c = r.onUpdate, u = r.runBackwards, d = r.yoyoEase, f = r.keyframes, l = r.autoRevert, g = t._dur, p = t._startAt, _ = t._targets, C = t.parent, v = C && C.data === "nested" ? C.vars.targets : _, x = t._overwrite === "auto" && !Xh, S = t.timeline, w, M, O, k, D, z, W, F, B, Q, et, X, U;
  if (S && (!f || !n) && (n = "none"), t._ease = yn(n, _s.ease), t._yEase = d ? Ud(yn(d === !0 ? n : d, _s.ease)) : 0, d && t._yoyo && !t._repeat && (d = t._yEase, t._yEase = t._ease, t._ease = d), t._from = !S && !!r.runBackwards, !S || f && !r.stagger) {
    if (F = _[0] ? _n(_[0]).harness : 0, X = F && r[F.prop], w = Da(r, Zh), p && (p._zTime < 0 && p.progress(1), e < 0 && u && a && !l ? p.render(-1, !0) : p.revert(u && g ? va : $g), p._lazy = 0), o) {
      if (jr(t._startAt = ve.set(_, Pi({
        data: "isStart",
        overwrite: !1,
        parent: C,
        immediateRender: !0,
        lazy: !p && ci(h),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return Si(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (He || !a && !l) && t._startAt.revert(va), a && g && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (u && g && !p) {
      if (e && (a = !1), O = Pi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ci(h),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: C
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, w), X && (O[F.prop] = X), jr(t._startAt = ve.set(_, O)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (He ? t._startAt.revert(va) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, Ge, Ge);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, h = g && ci(h) || h && !g, M = 0; M < _.length; M++) {
      if (D = _[M], W = D._gsap || Jh(_)[M]._gsap, t._ptLookup[M] = Q = {}, Kl[W.id] && Ur.length && La(), et = v === _ ? M : v.indexOf(D), F && (B = new F()).init(D, X || w, t, et, v) !== !1 && (t._pt = k = new di(t._pt, D, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(nt) {
        Q[nt] = k;
      }), B.priority && (z = 1)), !F || X)
        for (O in w)
          yi[O] && (B = Gd(O, w, t, et, D, v)) ? B.priority && (z = 1) : Q[O] = k = ec.call(t, D, O, "get", w[O], et, v, 0, r.stringFilter);
      t._op && t._op[M] && t.kill(D, t._op[M]), x && t._pt && (Fr = t, ie.killTweensOf(D, Q, t.globalTime(e)), U = !t.parent, Fr = 0), t._pt && h && (Kl[W.id] = 1);
    }
    z && tf(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !U, f && e <= 0 && S.render(hr, !0, !0);
}, fm = function(t, e, i, r, n, o, a, h) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], u, d, f, l;
  if (!c)
    for (c = t._ptCache[e] = [], f = t._ptLookup, l = t._targets.length; l--; ) {
      if (u = f[l][e], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== e && u.fp !== e; )
          u = u._next;
      if (!u)
        return eh = 1, t.vars[e] = "+=0", ic(t, a), eh = 0, h ? yo(e + " not eligible for reset") : 1;
      c.push(u);
    }
  for (l = c.length; l--; )
    d = c[l], u = d._pt || d, u.s = (r || r === 0) && !n ? r : u.s + (r || 0) + o * u.c, u.c = i - u.s, d.e && (d.e = ce(i) + qe(d.e)), d.b && (d.b = u.s + qe(d.b));
}, pm = function(t, e) {
  var i = t[0] ? _n(t[0]).harness : 0, r = i && i.aliases, n, o, a, h;
  if (!r)
    return e;
  n = vs({}, e);
  for (o in r)
    if (o in n)
      for (h = r[o].split(","), a = h.length; a--; )
        n[h[a]] = n[o];
  return n;
}, gm = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", o, a;
  if (Ke(e))
    a = i[t] || (i[t] = []), e.forEach(function(h, c) {
      return a.push({
        t: c / (e.length - 1) * 100,
        v: h,
        e: n
      });
    });
  else
    for (o in e)
      a = i[o] || (i[o] = []), o === "ease" || a.push({
        t: parseFloat(t),
        v: e[o],
        e: n
      });
}, to = function(t, e, i, r, n) {
  return se(t) ? t.call(e, i, r, n) : De(t) && ~t.indexOf("random(") ? bo(t) : t;
}, Kd = Qh + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", jd = {};
ui(Kd + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return jd[s] = 1;
});
var ve = /* @__PURE__ */ function(s) {
  pd(t, s);
  function t(i, r, n, o) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = s.call(this, o ? r : Qs(r)) || this;
    var h = a.vars, c = h.duration, u = h.delay, d = h.immediateRender, f = h.stagger, l = h.overwrite, g = h.keyframes, p = h.defaults, _ = h.scrollTrigger, C = h.yoyoEase, v = r.parent || ie, x = (Ke(i) || md(i) ? Ir(i[0]) : "length" in r) ? [i] : zi(i), S, w, M, O, k, D, z, W;
    if (a._targets = x.length ? Jh(x) : yo("GSAP target " + i + " not found. https://gsap.com", !Ei.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = l, g || f || Qo(c) || Qo(u)) {
      if (r = a.vars, S = a.timeline = new ni({
        data: "nested",
        defaults: p || {},
        targets: v && v.data === "nested" ? v.vars.targets : x
      }), S.kill(), S.parent = S._dp = vr(a), S._start = 0, f || Qo(c) || Qo(u)) {
        if (O = x.length, z = f && Dd(f), dr(f))
          for (k in f)
            ~Kd.indexOf(k) && (W || (W = {}), W[k] = f[k]);
        for (w = 0; w < O; w++)
          M = Da(r, jd), M.stagger = 0, C && (M.yoyoEase = C), W && vs(M, W), D = x[w], M.duration = +to(c, vr(a), w, D, x), M.delay = (+to(u, vr(a), w, D, x) || 0) - a._delay, !f && O === 1 && M.delay && (a._delay = u = M.delay, a._start += u, M.delay = 0), S.to(D, M, z ? z(w, D, x) : 0), S._ease = Pt.none;
        S.duration() ? c = u = 0 : a.timeline = 0;
      } else if (g) {
        Qs(Pi(S.vars.defaults, {
          ease: "none"
        })), S._ease = yn(g.ease || r.ease || "none");
        var F = 0, B, Q, et;
        if (Ke(g))
          g.forEach(function(X) {
            return S.to(x, X, ">");
          }), S.duration();
        else {
          M = {};
          for (k in g)
            k === "ease" || k === "easeEach" || gm(k, g[k], M, g.easeEach);
          for (k in M)
            for (B = M[k].sort(function(X, U) {
              return X.t - U.t;
            }), F = 0, w = 0; w < B.length; w++)
              Q = B[w], et = {
                ease: Q.e,
                duration: (Q.t - (w ? B[w - 1].t : 0)) / 100 * c
              }, et[k] = Q.v, S.to(x, et, F), F += et.duration;
          S.duration() < c && S.to({}, {
            duration: c - S.duration()
          });
        }
      }
      c || a.duration(c = S.duration());
    } else
      a.timeline = 0;
    return l === !0 && !Xh && (Fr = vr(a), ie.killTweensOf(x), Fr = 0), nr(v, vr(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (d || !c && !g && a._start === ye(v._time) && ci(d) && Xg(vr(a)) && v.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -u) || 0)), _ && kd(vr(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, o) {
    var a = this._time, h = this._tDur, c = this._dur, u = r < 0, d = r > h - Ge && !u ? h : r < Ge ? 0 : r, f, l, g, p, _, C, v, x, S;
    if (!c)
      Gg(this, r, n, o);
    else if (d !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (f = d, x = this.timeline, this._repeat) {
        if (p = c + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(p * 100 + r, n, o);
        if (f = ye(d % p), d === h ? (g = this._repeat, f = c) : (_ = ye(d / p), g = ~~_, g && g === _ ? (f = c, g--) : f > c && (f = c)), C = this._yoyo && g & 1, C && (S = this._yEase, f = c - f), _ = ys(this._tTime, p), f === a && !o && this._initted && g === _)
          return this._tTime = d, this;
        g !== _ && (x && this._yEase && qd(x, C), this.vars.repeatRefresh && !C && !this._lock && f !== p && this._initted && (this._lock = o = 1, this.render(ye(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Id(this, u ? r : f, o, n, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== _))
          return this;
        if (c !== this._dur)
          return this.render(r, n, o);
      }
      if (this._tTime = d, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = v = (S || this._ease)(f / c), this._from && (this.ratio = v = 1 - v), !a && d && !n && !_ && (Si(this, "onStart"), this._tTime !== d))
        return this;
      for (l = this._pt; l; )
        l.r(v, l.d), l = l._next;
      x && x.render(r < 0 ? r : x._dur * x._ease(f / this._dur), n, o) || this._startAt && (this._zTime = r), this._onUpdate && !n && (u && jl(this, r, n, o), Si(this, "onUpdate")), this._repeat && g !== _ && this.vars.onRepeat && !n && this.parent && Si(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (u && !this._onUpdate && jl(this, r, !0, !0), (r || !c) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && jr(this, 1), !n && !(u && !a) && (d || a || C) && (Si(this, d === h ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < h && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), s.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, o, a, h) {
    To || bi.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || ic(this, c), u = this._ease(c / this._dur), fm(this, r, n, o, a, u, c, h) ? this.resetTo(r, n, o, a, 1) : (il(this, 0), this.parent || Od(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Fs(this) : this.scrollTrigger && this.scrollTrigger.kill(!!He), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Fr && Fr.vars.overwrite !== !0)._first || Fs(this), this.parent && o !== this.timeline.totalDuration() && ws(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, h = r ? zi(r) : a, c = this._ptLookup, u = this._pt, d, f, l, g, p, _, C;
    if ((!n || n === "all") && Ug(a, h))
      return n === "all" && (this._pt = 0), Fs(this);
    for (d = this._op = this._op || [], n !== "all" && (De(n) && (p = {}, ui(n, function(v) {
      return p[v] = 1;
    }), n = p), n = pm(a, n)), C = a.length; C--; )
      if (~h.indexOf(a[C])) {
        f = c[C], n === "all" ? (d[C] = n, g = f, l = {}) : (l = d[C] = d[C] || {}, g = n);
        for (p in g)
          _ = f && f[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && tl(this, _, "_pt"), delete f[p]), l !== "all" && (l[p] = 1);
      }
    return this._initted && !this._pt && u && Fs(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Js(1, arguments);
  }, t.delayedCall = function(r, n, o, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, o) {
    return Js(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, o) {
    return ie.killTweensOf(r, n, o);
  }, t;
}(xo);
Pi(ve.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ui("staggerTo,staggerFrom,staggerFromTo", function(s) {
  ve[s] = function() {
    var t = new ni(), e = Ql.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var rc = function(t, e, i) {
  return t[e] = i;
}, Zd = function(t, e, i) {
  return t[e](i);
}, mm = function(t, e, i, r) {
  return t[e](r.fp, i);
}, _m = function(t, e, i) {
  return t.setAttribute(e, i);
}, nc = function(t, e) {
  return se(t[e]) ? Zd : Vh(t[e]) && t.setAttribute ? _m : rc;
}, Qd = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, vm = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Jd = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, sc = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, ym = function(t, e, i, r) {
  for (var n = this._pt, o; n; )
    o = n._next, n.p === r && n.modifier(t, e, i), n = o;
}, wm = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? tl(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, bm = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, tf = function(t) {
  for (var e = t._pt, i, r, n, o; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : o) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : o = e, e = i;
  }
  t._pt = n;
}, di = /* @__PURE__ */ function() {
  function s(e, i, r, n, o, a, h, c, u) {
    this.t = i, this.s = n, this.c = o, this.p = r, this.r = a || Qd, this.d = h || this, this.set = c || rc, this.pr = u || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = bm, this.m = i, this.mt = n, this.tween = r;
  }, s;
}();
ui(Qh + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return Zh[s] = 1;
});
Ci.TweenMax = Ci.TweenLite = ve;
Ci.TimelineLite = Ci.TimelineMax = ni;
ie = new ni({
  sortChildren: !1,
  defaults: _s,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Ei.stringFilter = Wd;
var wn = [], wa = {}, Tm = [], Zc = 0, xm = 0, El = function(t) {
  return (wa[t] || Tm).map(function(e) {
    return e();
  });
}, ih = function() {
  var t = Date.now(), e = [];
  t - Zc > 2 && (El("matchMediaInit"), wn.forEach(function(i) {
    var r = i.queries, n = i.conditions, o, a, h, c;
    for (a in r)
      o = tr.matchMedia(r[a]).matches, o && (h = 1), o !== n[a] && (n[a] = o, c = 1);
    c && (i.revert(), h && e.push(i));
  }), El("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Zc = t, El("matchMedia"));
}, ef = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Jl(i), this.data = [], this._r = [], this.isReverted = !1, this.id = xm++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, r, n) {
    se(i) && (n = r, r = i, i = se);
    var o = this, a = function() {
      var c = te, u = o.selector, d;
      return c && c !== o && c.data.push(o), n && (o.selector = Jl(n)), te = o, d = r.apply(o, arguments), se(d) && o._r.push(d), te = c, o.selector = u, o.isReverted = !1, d;
    };
    return o.last = a, i === se ? a(o, function(h) {
      return o.add(null, h);
    }) : i ? o[i] = a : a;
  }, t.ignore = function(i) {
    var r = te;
    te = null, i(this), te = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof s ? i.push.apply(i, r.getTweens()) : r instanceof ve && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? function() {
      for (var a = n.getTweens(), h = n.data.length, c; h--; )
        c = n.data[h], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(u) {
          return a.splice(a.indexOf(u), 1);
        }));
      for (a.map(function(u) {
        return {
          g: u._dur || u._delay || u._sat && !u._sat.vars.immediateRender ? u.globalTime(0) : -1 / 0,
          t: u
        };
      }).sort(function(u, d) {
        return d.g - u.g || -1 / 0;
      }).forEach(function(u) {
        return u.t.revert(i);
      }), h = n.data.length; h--; )
        c = n.data[h], c instanceof ni ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof ve) && c.revert && c.revert(i);
      n._r.forEach(function(u) {
        return u(i, n);
      }), n.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var o = wn.length; o--; )
        wn[o].id === this.id && wn.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), Sm = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, te && te.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, r, n) {
    dr(i) || (i = {
      matches: i
    });
    var o = new ef(0, n || this.scope), a = o.conditions = {}, h, c, u;
    te && !o.selector && (o.selector = te.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = i;
    for (c in i)
      c === "all" ? u = 1 : (h = tr.matchMedia(i[c]), h && (wn.indexOf(o) < 0 && wn.push(o), (a[c] = h.matches) && (u = 1), h.addListener ? h.addListener(ih) : h.addEventListener("change", ih)));
    return u && r(o, function(d) {
      return o.add(null, d);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, s;
}(), Na = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return $d(r);
    });
  },
  timeline: function(t) {
    return new ni(t);
  },
  getTweensOf: function(t, e) {
    return ie.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    De(t) && (t = zi(t)[0]);
    var n = _n(t || {}).get, o = i ? Pd : Cd;
    return i === "native" && (i = ""), t && (e ? o((yi[e] && yi[e].get || n)(t, e, i, r)) : function(a, h, c) {
      return o((yi[a] && yi[a].get || n)(t, a, h, c));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = zi(t), t.length > 1) {
      var r = t.map(function(u) {
        return Ut.quickSetter(u, e, i);
      }), n = r.length;
      return function(u) {
        for (var d = n; d--; )
          r[d](u);
      };
    }
    t = t[0] || {};
    var o = yi[e], a = _n(t), h = a.harness && (a.harness.aliases || {})[e] || e, c = o ? function(u) {
      var d = new o();
      Jn._pt = 0, d.init(t, i ? u + i : u, Jn, 0, [t]), d.render(1, d), Jn._pt && sc(1, Jn);
    } : a.set(t, h);
    return o ? c : function(u) {
      return c(t, h, i ? u + i : u, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = Ut.to(t, Pi((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), o = function(h, c, u) {
      return n.resetTo(e, h, c, u);
    };
    return o.tween = n, o;
  },
  isTweening: function(t) {
    return ie.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = yn(t.ease, _s.ease)), Xc(_s, t || {});
  },
  config: function(t) {
    return Xc(Ei, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, o = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !yi[a] && !Ci[a] && yo(e + " effect requires " + a + " plugin.");
    }), bl[e] = function(a, h, c) {
      return i(zi(a), Pi(h || {}, n), c);
    }, o && (ni.prototype[e] = function(a, h, c) {
      return this.add(bl[e](a, dr(h) ? h : (c = h) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    Pt[t] = yn(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? yn(t, e) : Pt;
  },
  getById: function(t) {
    return ie.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ni(t), r, n;
    for (i.smoothChildTiming = ci(t.smoothChildTiming), ie.remove(i), i._dp = 0, i._time = i._tTime = ie._time, r = ie._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof ve && r.vars.onComplete === r._targets[0])) && nr(i, r, r._start - r._delay), r = n;
    return nr(ie, i, 0), i;
  },
  context: function(t, e) {
    return t ? new ef(t, e) : te;
  },
  matchMedia: function(t) {
    return new Sm(t);
  },
  matchMediaRefresh: function() {
    return wn.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || ih();
  },
  addEventListener: function(t, e) {
    var i = wa[t] || (wa[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = wa[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: im,
    wrapYoyo: rm,
    distribute: Dd,
    random: Nd,
    snap: Rd,
    normalize: em,
    getUnit: qe,
    clamp: Zg,
    splitColor: Bd,
    toArray: zi,
    selector: Jl,
    mapRange: Fd,
    pipe: Jg,
    unitize: tm,
    interpolate: nm,
    shuffle: Ld
  },
  install: bd,
  effects: bl,
  ticker: bi,
  updateRoot: ni.updateRoot,
  plugins: yi,
  globalTimeline: ie,
  core: {
    PropTween: di,
    globals: Td,
    Tween: ve,
    Timeline: ni,
    Animation: xo,
    getCache: _n,
    _removeLinkedListItem: tl,
    reverting: function() {
      return He;
    },
    context: function(t) {
      return t && te && (te.data.push(t), t._ctx = te), te;
    },
    suppressOverwrites: function(t) {
      return Xh = t;
    }
  }
};
ui("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Na[s] = ve[s];
});
bi.add(ni.updateRoot);
Jn = Na.to({}, {
  duration: 0
});
var Em = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Cm = function(t, e) {
  var i = t._targets, r, n, o;
  for (r in e)
    for (n = i.length; n--; )
      o = t._ptLookup[n][r], o && (o = o.d) && (o._pt && (o = Em(o, r)), o && o.modifier && o.modifier(e[r], t, i[n], r));
}, Cl = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, o) {
      o._onInit = function(a) {
        var h, c;
        if (De(n) && (h = {}, ui(n, function(u) {
          return h[u] = 1;
        }), n = h), e) {
          h = {};
          for (c in n)
            h[c] = e(n[c]);
          n = h;
        }
        Cm(a, n);
      };
    }
  };
}, Ut = Na.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var o, a, h;
    this.tween = i;
    for (o in e)
      h = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (h || 0) + "", e[o], r, n, 0, 0, o), a.op = o, a.b = h, this._props.push(o);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      He ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, Cl("roundProps", th), Cl("modifiers"), Cl("snap", Rd)) || Na;
ve.version = ni.version = Ut.version = "3.13.0";
wd = 1;
Gh() && bs();
Pt.Power0;
Pt.Power1;
Pt.Power2;
Pt.Power3;
Pt.Power4;
Pt.Linear;
Pt.Quad;
Pt.Cubic;
Pt.Quart;
Pt.Quint;
Pt.Strong;
Pt.Elastic;
Pt.Back;
Pt.SteppedEase;
Pt.Bounce;
Pt.Sine;
Pt.Expo;
Pt.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Qc, Hr, ss, oc, cn, Jc, ac, Pm = function() {
  return typeof window < "u";
}, Mr = {}, on = 180 / Math.PI, os = Math.PI / 180, Bn = Math.atan2, tu = 1e8, lc = /([A-Z])/g, Om = /(left|right|width|margin|padding|x)/i, Am = /[\s,\(]\S/, sr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, rh = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, km = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Im = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Mm = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, rf = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, nf = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Lm = function(t, e, i) {
  return t.style[e] = i;
}, Dm = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Rm = function(t, e, i) {
  return t._gsap[e] = i;
}, Nm = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, zm = function(t, e, i, r, n) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(n, o);
}, Fm = function(t, e, i, r, n) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(n, o);
}, re = "transform", fi = re + "Origin", Hm = function s(t, e) {
  var i = this, r = this.target, n = r.style, o = r._gsap;
  if (t in Mr && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = sr[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = yr(r, a);
      }) : this.tfm[t] = o.x ? o[t] : yr(r, t), t === fi && (this.tfm.zOrigin = o.zOrigin);
    else
      return sr.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(re) >= 0)
      return;
    o.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(fi, e, "")), t = re;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, sf = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, $m = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, o;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(lc, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = ac(), (!n || !n.isStart) && !i[re] && (sf(i), r.zOrigin && i[fi] && (i[fi] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, of = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: $m,
    save: Hm
  };
  return t._gsap || Ut.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, af, nh = function(t, e) {
  var i = Hr.createElementNS ? Hr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Hr.createElement(t);
  return i && i.style ? i : Hr.createElement(t);
}, Fi = function s(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(lc, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && s(t, Ts(e) || e, 1) || "";
}, eu = "O,Moz,ms,Ms,Webkit".split(","), Ts = function(t, e, i) {
  var r = e || cn, n = r.style, o = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(eu[o] + t in n); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? eu[o] : "") + t;
}, sh = function() {
  Pm() && window.document && (Qc = window, Hr = Qc.document, ss = Hr.documentElement, cn = nh("div") || {
    style: {}
  }, nh("div"), re = Ts(re), fi = re + "Origin", cn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", af = !!Ts("perspective"), ac = Ut.core.reverting, oc = 1);
}, iu = function(t) {
  var e = t.ownerSVGElement, i = nh("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), ss.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), ss.removeChild(i), n;
}, ru = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, lf = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = iu(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = iu(t)), e && !e.width && !e.x && !e.y ? {
    x: +ru(t, ["x", "cx", "x1"]) || 0,
    y: +ru(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, hf = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && lf(t));
}, On = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in Mr && e !== fi && (e = re), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(lc, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, $r = function(t, e, i, r, n, o) {
  var a = new di(t._pt, e, i, 0, 1, o ? nf : rf);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, nu = {
  deg: 1,
  rad: 1,
  turn: 1
}, Bm = {
  grid: 1,
  flex: 1
}, Zr = function s(t, e, i, r) {
  var n = parseFloat(i) || 0, o = (i + "").trim().substr((n + "").length) || "px", a = cn.style, h = Om.test(e), c = t.tagName.toLowerCase() === "svg", u = (c ? "client" : "offset") + (h ? "Width" : "Height"), d = 100, f = r === "px", l = r === "%", g, p, _, C;
  if (r === o || !n || nu[r] || nu[o])
    return n;
  if (o !== "px" && !f && (n = s(t, e, i, "px")), C = t.getCTM && hf(t), (l || o === "%") && (Mr[e] || ~e.indexOf("adius")))
    return g = C ? t.getBBox()[h ? "width" : "height"] : t[u], ce(l ? n / g * d : n / 100 * g);
  if (a[h ? "width" : "height"] = d + (f ? o : r), p = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !c ? t : t.parentNode, C && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Hr || !p.appendChild) && (p = Hr.body), _ = p._gsap, _ && l && _.width && h && _.time === bi.time && !_.uncache)
    return ce(n / _.width * d);
  if (l && (e === "height" || e === "width")) {
    var v = t.style[e];
    t.style[e] = d + r, g = t[u], v ? t.style[e] = v : On(t, e);
  } else
    (l || o === "%") && !Bm[Fi(p, "display")] && (a.position = Fi(t, "position")), p === t && (a.position = "static"), p.appendChild(cn), g = cn[u], p.removeChild(cn), a.position = "absolute";
  return h && l && (_ = _n(p), _.time = bi.time, _.width = p[u]), ce(f ? g * n / d : g && n ? d / g * n : 0);
}, yr = function(t, e, i, r) {
  var n;
  return oc || sh(), e in sr && e !== "transform" && (e = sr[e], ~e.indexOf(",") && (e = e.split(",")[0])), Mr[e] && e !== "transform" ? (n = Eo(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Fa(Fi(t, fi)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = za[e] && za[e](t, e, i) || Fi(t, e) || Sd(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Zr(t, e, n, i) + i : n;
}, Ym = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = Ts(e, t, 1), o = n && Fi(t, n, 1);
    o && o !== i ? (e = n, i = o) : e === "borderColor" && (i = Fi(t, "borderTopColor"));
  }
  var a = new di(this._pt, t.style, e, 0, 1, Jd), h = 0, c = 0, u, d, f, l, g, p, _, C, v, x, S, w;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = Fi(t, r.substring(4, r.indexOf(")")))), r === "auto" && (p = t.style[e], t.style[e] = r, r = Fi(t, e) || r, p ? t.style[e] = p : On(t, e)), u = [i, r], Wd(u), i = u[0], r = u[1], f = i.match(Qn) || [], w = r.match(Qn) || [], w.length) {
    for (; d = Qn.exec(r); )
      _ = d[0], v = r.substring(h, d.index), g ? g = (g + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (g = 1), _ !== (p = f[c++] || "") && (l = parseFloat(p) || 0, S = p.substr((l + "").length), _.charAt(1) === "=" && (_ = ns(l, _) + S), C = parseFloat(_), x = _.substr((C + "").length), h = Qn.lastIndex - x.length, x || (x = x || Ei.units[e] || S, h === r.length && (r += x, a.e += x)), S !== x && (l = Zr(t, e, p, x) || 0), a._pt = {
        _next: a._pt,
        p: v || c === 1 ? v : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: l,
        c: C - l,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = h < r.length ? r.substring(h, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? nf : rf;
  return vd.test(r) && (a.e = 0), this._pt = a, a;
}, su = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Wm = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = su[i] || i, e[1] = su[r] || r, e.join(" ");
}, Um = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, o = i._gsap, a, h, c;
    if (n === "all" || n === !0)
      r.cssText = "", h = 1;
    else
      for (n = n.split(","), c = n.length; --c > -1; )
        a = n[c], Mr[a] && (h = 1, a = a === "transformOrigin" ? fi : re), On(i, a);
    h && (On(i, re), o && (o.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", Eo(i, 1), o.uncache = 1, sf(r)));
  }
}, za = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var o = t._pt = new di(t._pt, e, i, 0, 0, Um);
      return o.u = r, o.pr = -10, o.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, So = [1, 0, 0, 1, 0, 0], cf = {}, uf = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, ou = function(t) {
  var e = Fi(t, re);
  return uf(e) ? So : e.substr(7).match(_d).map(ce);
}, hc = function(t, e) {
  var i = t._gsap || _n(t), r = t.style, n = ou(t), o, a, h, c;
  return i.svg && t.getAttribute("transform") ? (h = t.transform.baseVal.consolidate().matrix, n = [h.a, h.b, h.c, h.d, h.e, h.f], n.join(",") === "1,0,0,1,0,0" ? So : n) : (n === So && !t.offsetParent && t !== ss && !i.svg && (h = r.display, r.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, a = t.nextElementSibling, ss.appendChild(t)), n = ou(t), h ? r.display = h : On(t, "display"), c && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : ss.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, oh = function(t, e, i, r, n, o) {
  var a = t._gsap, h = n || hc(t, !0), c = a.xOrigin || 0, u = a.yOrigin || 0, d = a.xOffset || 0, f = a.yOffset || 0, l = h[0], g = h[1], p = h[2], _ = h[3], C = h[4], v = h[5], x = e.split(" "), S = parseFloat(x[0]) || 0, w = parseFloat(x[1]) || 0, M, O, k, D;
  i ? h !== So && (O = l * _ - g * p) && (k = S * (_ / O) + w * (-p / O) + (p * v - _ * C) / O, D = S * (-g / O) + w * (l / O) - (l * v - g * C) / O, S = k, w = D) : (M = lf(t), S = M.x + (~x[0].indexOf("%") ? S / 100 * M.width : S), w = M.y + (~(x[1] || x[0]).indexOf("%") ? w / 100 * M.height : w)), r || r !== !1 && a.smooth ? (C = S - c, v = w - u, a.xOffset = d + (C * l + v * p) - C, a.yOffset = f + (C * g + v * _) - v) : a.xOffset = a.yOffset = 0, a.xOrigin = S, a.yOrigin = w, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[fi] = "0px 0px", o && ($r(o, a, "xOrigin", c, S), $r(o, a, "yOrigin", u, w), $r(o, a, "xOffset", d, a.xOffset), $r(o, a, "yOffset", f, a.yOffset)), t.setAttribute("data-svg-origin", S + " " + w);
}, Eo = function(t, e) {
  var i = t._gsap || new Vd(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, o = "px", a = "deg", h = getComputedStyle(t), c = Fi(t, fi) || "0", u, d, f, l, g, p, _, C, v, x, S, w, M, O, k, D, z, W, F, B, Q, et, X, U, nt, ot, b, J, rt, G, st, Gt;
  return u = d = f = p = _ = C = v = x = S = 0, l = g = 1, i.svg = !!(t.getCTM && hf(t)), h.translate && ((h.translate !== "none" || h.scale !== "none" || h.rotate !== "none") && (r[re] = (h.translate !== "none" ? "translate3d(" + (h.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (h.rotate !== "none" ? "rotate(" + h.rotate + ") " : "") + (h.scale !== "none" ? "scale(" + h.scale.split(" ").join(",") + ") " : "") + (h[re] !== "none" ? h[re] : "")), r.scale = r.rotate = r.translate = "none"), O = hc(t, i.svg), i.svg && (i.uncache ? (nt = t.getBBox(), c = i.xOrigin - nt.x + "px " + (i.yOrigin - nt.y) + "px", U = "") : U = !e && t.getAttribute("data-svg-origin"), oh(t, U || c, !!U || i.originIsAbsolute, i.smooth !== !1, O)), w = i.xOrigin || 0, M = i.yOrigin || 0, O !== So && (W = O[0], F = O[1], B = O[2], Q = O[3], u = et = O[4], d = X = O[5], O.length === 6 ? (l = Math.sqrt(W * W + F * F), g = Math.sqrt(Q * Q + B * B), p = W || F ? Bn(F, W) * on : 0, v = B || Q ? Bn(B, Q) * on + p : 0, v && (g *= Math.abs(Math.cos(v * os))), i.svg && (u -= w - (w * W + M * B), d -= M - (w * F + M * Q))) : (Gt = O[6], G = O[7], b = O[8], J = O[9], rt = O[10], st = O[11], u = O[12], d = O[13], f = O[14], k = Bn(Gt, rt), _ = k * on, k && (D = Math.cos(-k), z = Math.sin(-k), U = et * D + b * z, nt = X * D + J * z, ot = Gt * D + rt * z, b = et * -z + b * D, J = X * -z + J * D, rt = Gt * -z + rt * D, st = G * -z + st * D, et = U, X = nt, Gt = ot), k = Bn(-B, rt), C = k * on, k && (D = Math.cos(-k), z = Math.sin(-k), U = W * D - b * z, nt = F * D - J * z, ot = B * D - rt * z, st = Q * z + st * D, W = U, F = nt, B = ot), k = Bn(F, W), p = k * on, k && (D = Math.cos(k), z = Math.sin(k), U = W * D + F * z, nt = et * D + X * z, F = F * D - W * z, X = X * D - et * z, W = U, et = nt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, C = 180 - C), l = ce(Math.sqrt(W * W + F * F + B * B)), g = ce(Math.sqrt(X * X + Gt * Gt)), k = Bn(et, X), v = Math.abs(k) > 2e-4 ? k * on : 0, S = st ? 1 / (st < 0 ? -st : st) : 0), i.svg && (U = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !uf(Fi(t, re)), U && t.setAttribute("transform", U))), Math.abs(v) > 90 && Math.abs(v) < 270 && (n ? (l *= -1, v += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, v += v <= 0 ? 180 : -180)), e = e || i.uncache, i.x = u - ((i.xPercent = u && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = d - ((i.yPercent = d && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = f + o, i.scaleX = ce(l), i.scaleY = ce(g), i.rotation = ce(p) + a, i.rotationX = ce(_) + a, i.rotationY = ce(C) + a, i.skewX = v + a, i.skewY = x + a, i.transformPerspective = S + o, (i.zOrigin = parseFloat(c.split(" ")[2]) || !e && i.zOrigin || 0) && (r[fi] = Fa(c)), i.xOffset = i.yOffset = 0, i.force3D = Ei.force3D, i.renderTransform = i.svg ? Xm : af ? df : qm, i.uncache = 0, i;
}, Fa = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Pl = function(t, e, i) {
  var r = qe(e);
  return ce(parseFloat(e) + parseFloat(Zr(t, "x", i + "px", r))) + r;
}, qm = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, df(t, e);
}, rn = "0deg", Is = "0px", nn = ") ", df = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, o = i.x, a = i.y, h = i.z, c = i.rotation, u = i.rotationY, d = i.rotationX, f = i.skewX, l = i.skewY, g = i.scaleX, p = i.scaleY, _ = i.transformPerspective, C = i.force3D, v = i.target, x = i.zOrigin, S = "", w = C === "auto" && t && t !== 1 || C === !0;
  if (x && (d !== rn || u !== rn)) {
    var M = parseFloat(u) * os, O = Math.sin(M), k = Math.cos(M), D;
    M = parseFloat(d) * os, D = Math.cos(M), o = Pl(v, o, O * D * -x), a = Pl(v, a, -Math.sin(M) * -x), h = Pl(v, h, k * D * -x + x);
  }
  _ !== Is && (S += "perspective(" + _ + nn), (r || n) && (S += "translate(" + r + "%, " + n + "%) "), (w || o !== Is || a !== Is || h !== Is) && (S += h !== Is || w ? "translate3d(" + o + ", " + a + ", " + h + ") " : "translate(" + o + ", " + a + nn), c !== rn && (S += "rotate(" + c + nn), u !== rn && (S += "rotateY(" + u + nn), d !== rn && (S += "rotateX(" + d + nn), (f !== rn || l !== rn) && (S += "skew(" + f + ", " + l + nn), (g !== 1 || p !== 1) && (S += "scale(" + g + ", " + p + nn), v.style[re] = S || "translate(0, 0)";
}, Xm = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, o = i.x, a = i.y, h = i.rotation, c = i.skewX, u = i.skewY, d = i.scaleX, f = i.scaleY, l = i.target, g = i.xOrigin, p = i.yOrigin, _ = i.xOffset, C = i.yOffset, v = i.forceCSS, x = parseFloat(o), S = parseFloat(a), w, M, O, k, D;
  h = parseFloat(h), c = parseFloat(c), u = parseFloat(u), u && (u = parseFloat(u), c += u, h += u), h || c ? (h *= os, c *= os, w = Math.cos(h) * d, M = Math.sin(h) * d, O = Math.sin(h - c) * -f, k = Math.cos(h - c) * f, c && (u *= os, D = Math.tan(c - u), D = Math.sqrt(1 + D * D), O *= D, k *= D, u && (D = Math.tan(u), D = Math.sqrt(1 + D * D), w *= D, M *= D)), w = ce(w), M = ce(M), O = ce(O), k = ce(k)) : (w = d, k = f, M = O = 0), (x && !~(o + "").indexOf("px") || S && !~(a + "").indexOf("px")) && (x = Zr(l, "x", o, "px"), S = Zr(l, "y", a, "px")), (g || p || _ || C) && (x = ce(x + g - (g * w + p * O) + _), S = ce(S + p - (g * M + p * k) + C)), (r || n) && (D = l.getBBox(), x = ce(x + r / 100 * D.width), S = ce(S + n / 100 * D.height)), D = "matrix(" + w + "," + M + "," + O + "," + k + "," + x + "," + S + ")", l.setAttribute("transform", D), v && (l.style[re] = D);
}, Vm = function(t, e, i, r, n) {
  var o = 360, a = De(n), h = parseFloat(n) * (a && ~n.indexOf("rad") ? on : 1), c = h - r, u = r + c + "deg", d, f;
  return a && (d = n.split("_")[1], d === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -360)), d === "cw" && c < 0 ? c = (c + o * tu) % o - ~~(c / o) * o : d === "ccw" && c > 0 && (c = (c - o * tu) % o - ~~(c / o) * o)), t._pt = f = new di(t._pt, e, i, r, c, km), f.e = u, f.u = "deg", t._props.push(i), f;
}, au = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Gm = function(t, e, i) {
  var r = au({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, h, c, u, d, f, l, g;
  r.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), o[re] = e, a = Eo(i, 1), On(i, re), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[re], o[re] = e, a = Eo(i, 1), o[re] = c);
  for (h in Mr)
    c = r[h], u = a[h], c !== u && n.indexOf(h) < 0 && (l = qe(c), g = qe(u), d = l !== g ? Zr(i, h, c, g) : parseFloat(c), f = parseFloat(u), t._pt = new di(t._pt, a, h, d, f - d, rh), t._pt.u = g || 0, t._props.push(h));
  au(a, r);
};
ui("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", o = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  za[t > 1 ? "border" + s : s] = function(a, h, c, u, d) {
    var f, l;
    if (arguments.length < 4)
      return f = o.map(function(g) {
        return yr(a, g, c);
      }), l = f.join(" "), l.split(f[0]).length === 5 ? f[0] : l;
    f = (u + "").split(" "), l = {}, o.forEach(function(g, p) {
      return l[g] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), a.init(h, l, d);
  };
});
var Bo = {
  name: "css",
  register: sh,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var o = this._props, a = t.style, h = i.vars.startAt, c, u, d, f, l, g, p, _, C, v, x, S, w, M, O, k;
    oc || sh(), this.styles = this.styles || of(t), k = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (u = e[p], !(yi[p] && Gd(p, e, i, r, t, n)))) {
        if (l = typeof u, g = za[p], l === "function" && (u = u.call(i, r, t, n), l = typeof u), l === "string" && ~u.indexOf("random(") && (u = bo(u)), g)
          g(this, t, p, u, i) && (O = 1);
        else if (p.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(p) + "").trim(), u += "", qr.lastIndex = 0, qr.test(c) || (_ = qe(c), C = qe(u)), C ? _ !== C && (c = Zr(t, p, c, C) + C) : _ && (u += _), this.add(a, "setProperty", c, u, r, n, 0, 0, p), o.push(p), k.push(p, 0, a[p]);
        else if (l !== "undefined") {
          if (h && p in h ? (c = typeof h[p] == "function" ? h[p].call(i, r, t, n) : h[p], De(c) && ~c.indexOf("random(") && (c = bo(c)), qe(c + "") || c === "auto" || (c += Ei.units[p] || qe(yr(t, p)) || ""), (c + "").charAt(1) === "=" && (c = yr(t, p))) : c = yr(t, p), f = parseFloat(c), v = l === "string" && u.charAt(1) === "=" && u.substr(0, 2), v && (u = u.substr(2)), d = parseFloat(u), p in sr && (p === "autoAlpha" && (f === 1 && yr(t, "visibility") === "hidden" && d && (f = 0), k.push("visibility", 0, a.visibility), $r(this, a, "visibility", f ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = sr[p], ~p.indexOf(",") && (p = p.split(",")[0]))), x = p in Mr, x) {
            if (this.styles.save(p), l === "string" && u.substring(0, 6) === "var(--" && (u = Fi(t, u.substring(4, u.indexOf(")"))), d = parseFloat(u)), S || (w = t._gsap, w.renderTransform && !e.parseTransform || Eo(t, e.parseTransform), M = e.smoothOrigin !== !1 && w.smooth, S = this._pt = new di(this._pt, a, re, 0, 1, w.renderTransform, w, 0, -1), S.dep = 1), p === "scale")
              this._pt = new di(this._pt, w, "scaleY", w.scaleY, (v ? ns(w.scaleY, v + d) : d) - w.scaleY || 0, rh), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              k.push(fi, 0, a[fi]), u = Wm(u), w.svg ? oh(t, u, 0, M, 0, this) : (C = parseFloat(u.split(" ")[2]) || 0, C !== w.zOrigin && $r(this, w, "zOrigin", w.zOrigin, C), $r(this, a, p, Fa(c), Fa(u)));
              continue;
            } else if (p === "svgOrigin") {
              oh(t, u, 1, M, 0, this);
              continue;
            } else if (p in cf) {
              Vm(this, w, p, f, v ? ns(f, v + u) : u);
              continue;
            } else if (p === "smoothOrigin") {
              $r(this, w, "smooth", w.smooth, u);
              continue;
            } else if (p === "force3D") {
              w[p] = u;
              continue;
            } else if (p === "transform") {
              Gm(this, u, t);
              continue;
            }
          } else p in a || (p = Ts(p) || p);
          if (x || (d || d === 0) && (f || f === 0) && !Am.test(u) && p in a)
            _ = (c + "").substr((f + "").length), d || (d = 0), C = qe(u) || (p in Ei.units ? Ei.units[p] : _), _ !== C && (f = Zr(t, p, c, C)), this._pt = new di(this._pt, x ? w : a, p, f, (v ? ns(f, v + d) : d) - f, !x && (C === "px" || p === "zIndex") && e.autoRound !== !1 ? Mm : rh), this._pt.u = C || 0, _ !== C && C !== "%" && (this._pt.b = c, this._pt.r = Im);
          else if (p in a)
            Ym.call(this, t, p, c, v ? v + u : u);
          else if (p in t)
            this.add(t, p, c || t[p], v ? v + u : u, r, n);
          else if (p !== "parseTransform") {
            jh(p, u);
            continue;
          }
          x || (p in a ? k.push(p, 0, a[p]) : typeof t[p] == "function" ? k.push(p, 2, t[p]()) : k.push(p, 1, c || t[p])), o.push(p);
        }
      }
    O && tf(this);
  },
  render: function(t, e) {
    if (e.tween._time || !ac())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: yr,
  aliases: sr,
  getSetter: function(t, e, i) {
    var r = sr[e];
    return r && r.indexOf(",") < 0 && (e = r), e in Mr && e !== fi && (t._gsap.x || yr(t, "x")) ? i && Jc === i ? e === "scale" ? Nm : Rm : (Jc = i || {}) && (e === "scale" ? zm : Fm) : t.style && !Vh(t.style[e]) ? Lm : ~e.indexOf("-") ? Dm : nc(t, e);
  },
  core: {
    _removeProperty: On,
    _getMatrix: hc
  }
};
Ut.utils.checkPrefix = Ts;
Ut.core.getStyleSaver = of;
(function(s, t, e, i) {
  var r = ui(s + "," + t + "," + e, function(n) {
    Mr[n] = 1;
  });
  ui(t, function(n) {
    Ei.units[n] = "deg", cf[n] = 1;
  }), sr[r[13]] = s + "," + t, ui(i, function(n) {
    var o = n.split(":");
    sr[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ui("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  Ei.units[s] = "px";
});
Ut.registerPlugin(Bo);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var xr, bn, cc, rl, $s, ba, Ha, eo, Ki = "transform", ah = Ki + "Origin", ff, pf = function(t) {
  var e = t.ownerDocument || t;
  for (!(Ki in t.style) && ("msTransform" in t.style) && (Ki = "msTransform", ah = Ki + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (bn = window, Ha = new An(), e) {
    xr = e, cc = e.documentElement, rl = e.body, eo = xr.createElementNS("http://www.w3.org/2000/svg", "g"), eo.style.transform = "none";
    var i = e.createElement("div"), r = e.createElement("div"), n = e && (e.body || e.firstElementChild);
    n && n.appendChild && (n.appendChild(i), i.appendChild(r), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), ff = r.offsetParent !== i, n.removeChild(i));
  }
  return e;
}, Km = function(t) {
  for (var e, i; t && t !== rl; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, gf = [], mf = [], jm = function() {
  return bn.pageYOffset || xr.scrollTop || cc.scrollTop || rl.scrollTop || 0;
}, Zm = function() {
  return bn.pageXOffset || xr.scrollLeft || cc.scrollLeft || rl.scrollLeft || 0;
}, uc = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, Qm = function s(t) {
  if (bn.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, Ol = function s(t, e) {
  if (t.parentNode && (xr || pf(t))) {
    var i = uc(t), r = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", n = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, h = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", c = xr.createElementNS ? xr.createElementNS(r.replace(/^https/, "http"), n) : xr.createElement(n);
    return e && (i ? (ba || (ba = s(t)), c.setAttribute("width", 0.01), c.setAttribute("height", 0.01), c.setAttribute("transform", "translate(" + o + "," + a + ")"), ba.appendChild(c)) : ($s || ($s = s(t), $s.style.cssText = h), c.style.cssText = h + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", $s.appendChild(c))), c;
  }
  throw "Need document and parent.";
}, Jm = function(t) {
  for (var e = new An(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, t_ = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Ki], t.style[Ki] = "none", t.appendChild(eo), e = eo.getCTM(), t.removeChild(eo), i ? t.style[Ki] = i : t.style.removeProperty(Ki.replace(/([A-Z])/g, "-$1").toLowerCase())), e || Ha.clone();
}, e_ = function(t, e) {
  var i = uc(t), r = t === i, n = i ? gf : mf, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, h, c, u, d, f, l;
  if (t === bn)
    return t;
  if (n.length || n.push(Ol(t, 1), Ol(t, 2), Ol(t, 3)), h = i ? ba : $s, i)
    r ? (u = t_(t), d = -u.e / u.a, f = -u.f / u.d, c = Ha) : t.getBBox ? (u = t.getBBox(), c = t.transform ? t.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? Jm(c) : c.getItem(0).matrix : Ha, d = c.a * u.x + c.c * u.y, f = c.b * u.x + c.d * u.y) : (c = new An(), d = f = 0), (r ? i : o).appendChild(h), h.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + d) + "," + (c.f + f) + ")");
  else {
    if (d = f = 0, ff)
      for (c = t.offsetParent, u = t; u && (u = u.parentNode) && u !== c && u.parentNode; )
        (bn.getComputedStyle(u)[Ki] + "").length > 4 && (d = u.offsetLeft, f = u.offsetTop, u = 0);
    if (l = bn.getComputedStyle(t), l.position !== "absolute" && l.position !== "fixed")
      for (c = t.offsetParent; o && o !== c; )
        d += o.scrollLeft || 0, f += o.scrollTop || 0, o = o.parentNode;
    u = h.style, u.top = t.offsetTop - f + "px", u.left = t.offsetLeft - d + "px", u[Ki] = l[Ki], u[ah] = l[ah], u.position = l.position === "fixed" ? "fixed" : "absolute", a.appendChild(h);
  }
  return h;
}, Al = function(t, e, i, r, n, o, a) {
  return t.a = e, t.b = i, t.c = r, t.d = n, t.e = o, t.f = a, t;
}, An = /* @__PURE__ */ function() {
  function s(e, i, r, n, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), r === void 0 && (r = 0), n === void 0 && (n = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), Al(this, e, i, r, n, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, r = this.b, n = this.c, o = this.d, a = this.e, h = this.f, c = i * o - r * n || 1e-10;
    return Al(this, o / c, -r / c, -n / c, i / c, (n * h - o * a) / c, -(i * h - r * a) / c);
  }, t.multiply = function(i) {
    var r = this.a, n = this.b, o = this.c, a = this.d, h = this.e, c = this.f, u = i.a, d = i.c, f = i.b, l = i.d, g = i.e, p = i.f;
    return Al(this, u * r + f * o, u * n + f * a, d * r + l * o, d * n + l * a, h + g * r + p * o, c + g * n + p * a);
  }, t.clone = function() {
    return new s(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var r = this.a, n = this.b, o = this.c, a = this.d, h = this.e, c = this.f;
    return r === i.a && n === i.b && o === i.c && a === i.d && h === i.e && c === i.f;
  }, t.apply = function(i, r) {
    r === void 0 && (r = {});
    var n = i.x, o = i.y, a = this.a, h = this.b, c = this.c, u = this.d, d = this.e, f = this.f;
    return r.x = n * a + o * c + d || 0, r.y = n * h + o * u + f || 0, r;
  }, s;
}();
function hn(s, t, e, i) {
  if (!s || !s.parentNode || (xr || pf(s)).documentElement === s)
    return new An();
  var r = Km(s), n = uc(s), o = n ? gf : mf, a = e_(s), h = o[0].getBoundingClientRect(), c = o[1].getBoundingClientRect(), u = o[2].getBoundingClientRect(), d = a.parentNode, f = Qm(s), l = new An((c.left - h.left) / 100, (c.top - h.top) / 100, (u.left - h.left) / 100, (u.top - h.top) / 100, h.left + (f ? 0 : Zm()), h.top + (f ? 0 : jm()));
  if (d.removeChild(a), r)
    for (h = r.length; h--; )
      c = r[h], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
  return t ? l.inverse() : l;
}
function lu(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function i_(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var Ct, Bt, Ti, ji, Sr, kl, wr, lh, Bs, Br, _f, hh, Co, dc, Ys, Xi, Ws, Ta, vf, ch, $a = 0, yf = function() {
  return typeof window < "u";
}, wf = function() {
  return Ct || yf() && (Ct = window.gsap) && Ct.registerPlugin && Ct;
}, Nr = function(t) {
  return typeof t == "function";
}, io = function(t) {
  return typeof t == "object";
}, Gi = function(t) {
  return typeof t > "u";
}, xa = function() {
  return !1;
}, ro = "transform", uh = "transformOrigin", Lr = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, Ms = Array.isArray, Jo = function(t, e) {
  var i = Ti.createElementNS ? Ti.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : Ti.createElement(t);
  return i.style ? i : Ti.createElement(t);
}, hu = 180 / Math.PI, Yn = 1e20, r_ = new An(), Dr = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, Tn = [], as = {}, n_ = 0, s_ = /^(?:a|input|textarea|button|select)$/i, cu = 0, Wn = {}, _r = {}, bf = function(t, e) {
  var i = {}, r;
  for (r in t)
    i[r] = e ? t[r] * e : t[r];
  return i;
}, o_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, uu = function s(t, e) {
  for (var i = t.length, r; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), r = t[i].children, r && r.length && s(r, e);
}, Tf = function() {
  return Tn.forEach(function(t) {
    return t();
  });
}, a_ = function(t) {
  Tn.push(t), Tn.length === 1 && Ct.ticker.add(Tf);
}, du = function() {
  return !Tn.length && Ct.ticker.remove(Tf);
}, fu = function(t) {
  for (var e = Tn.length; e--; )
    Tn[e] === t && Tn.splice(e, 1);
  Ct.to(du, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: du,
    data: "_draggable"
  });
}, l_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Pe = function(t, e, i, r) {
  if (t.addEventListener) {
    var n = Co[e];
    r = r || (_f ? {
      passive: !1
    } : null), t.addEventListener(n || e, i, r), n && e !== n && t.addEventListener(e, i, r);
  }
}, me = function(t, e, i, r) {
  if (t.removeEventListener) {
    var n = Co[e];
    t.removeEventListener(n || e, i, r), n && e !== n && t.removeEventListener(e, i, r);
  }
}, Ii = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, h_ = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, c_ = function s(t) {
  dc = t.touches && $a < t.touches.length, me(t.target, "touchend", s);
}, pu = function(t) {
  dc = t.touches && $a < t.touches.length, Pe(t.target, "touchend", c_);
}, ls = function(t) {
  return Bt.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, hs = function(t) {
  return Bt.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, gu = function s(t, e) {
  Pe(t, "scroll", e), xs(t.parentNode) || s(t.parentNode, e);
}, mu = function s(t, e) {
  me(t, "scroll", e), xs(t.parentNode) || s(t.parentNode, e);
}, xs = function(t) {
  return !t || t === ji || t.nodeType === 9 || t === Ti.body || t === Bt || !t.nodeType || !t.parentNode;
}, _u = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return Math.max(0, xs(t) ? Math.max(ji[r], Sr[r]) - (Bt["inner" + i] || ji[n] || Sr[n]) : t[r] - t[n]);
}, Il = function s(t, e) {
  var i = _u(t, "x"), r = _u(t, "y");
  xs(t) ? t = _r : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = r, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, Ml = function(t, e, i) {
  var r = t.style;
  r && (Gi(r[e]) && (e = Bs(e, t) || e), i == null ? r.removeProperty && r.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : r[e] = i);
}, Po = function(t) {
  return Bt.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, sn = {}, Un = function(t) {
  if (t === Bt)
    return sn.left = sn.top = 0, sn.width = sn.right = ji.clientWidth || t.innerWidth || Sr.clientWidth || 0, sn.height = sn.bottom = (t.innerHeight || 0) - 20 < ji.clientHeight ? ji.clientHeight : t.innerHeight || Sr.clientHeight || 0, sn;
  var e = t.ownerDocument || Ti, i = Gi(t.pageX) ? !t.nodeType && !Gi(t.left) && !Gi(t.top) ? t : Br(t)[0].getBoundingClientRect() : {
    left: t.pageX - hs(e),
    top: t.pageY - ls(e),
    right: t.pageX - hs(e) + 1,
    bottom: t.pageY - ls(e) + 1
  };
  return Gi(i.right) && !Gi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Gi(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, he = function(t, e, i) {
  var r = t.vars, n = r[i], o = t._listeners[e], a;
  return Nr(n) && (a = n.apply(r.callbackScope || t, r[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, vu = function(t, e) {
  var i = Br(t)[0], r, n, o;
  return !i.nodeType && i !== Bt ? Gi(t.left) ? (n = t.min || t.minX || t.minRotation || 0, r = t.min || t.minY || 0, {
    left: n,
    top: r,
    width: (t.max || t.maxX || t.maxRotation || 0) - n,
    height: (t.max || t.maxY || 0) - r
  }) : (o = {
    x: 0,
    y: 0
  }, {
    left: t.left - o.x,
    top: t.top - o.y,
    width: t.width,
    height: t.height
  }) : u_(i, e);
}, Mi = {}, u_ = function(t, e) {
  e = Br(e)[0];
  var i = t.getBBox && t.ownerSVGElement, r = t.ownerDocument || Ti, n, o, a, h, c, u, d, f, l, g, p, _, C;
  if (t === Bt)
    a = ls(r), n = hs(r), o = n + (r.documentElement.clientWidth || t.innerWidth || r.body.clientWidth || 0), h = a + ((t.innerHeight || 0) - 20 < r.documentElement.clientHeight ? r.documentElement.clientHeight : t.innerHeight || r.body.clientHeight || 0);
  else {
    if (e === Bt || Gi(e))
      return t.getBoundingClientRect();
    n = a = 0, i ? (g = t.getBBox(), p = g.width, _ = g.height) : (t.viewBox && (g = t.viewBox.baseVal) && (n = g.x || 0, a = g.y || 0, p = g.width, _ = g.height), p || (C = Po(t), g = C.boxSizing === "border-box", p = (parseFloat(C.width) || t.clientWidth || 0) + (g ? 0 : parseFloat(C.borderLeftWidth) + parseFloat(C.borderRightWidth)), _ = (parseFloat(C.height) || t.clientHeight || 0) + (g ? 0 : parseFloat(C.borderTopWidth) + parseFloat(C.borderBottomWidth)))), o = p, h = _;
  }
  return t === e ? {
    left: n,
    top: a,
    width: o - n,
    height: h - a
  } : (c = hn(e, !0).multiply(hn(t)), u = c.apply({
    x: n,
    y: a
  }), d = c.apply({
    x: o,
    y: a
  }), f = c.apply({
    x: o,
    y: h
  }), l = c.apply({
    x: n,
    y: h
  }), n = Math.min(u.x, d.x, f.x, l.x), a = Math.min(u.y, d.y, f.y, l.y), {
    left: n,
    top: a,
    width: Math.max(u.x, d.x, f.x, l.x) - n,
    height: Math.max(u.y, d.y, f.y, l.y) - a
  });
}, Ll = function(t, e, i, r, n, o) {
  var a = {}, h, c, u;
  if (e)
    if (n !== 1 && e instanceof Array) {
      if (a.end = h = [], u = e.length, io(e[0]))
        for (c = 0; c < u; c++)
          h[c] = bf(e[c], n);
      else
        for (c = 0; c < u; c++)
          h[c] = e[c] * n;
      i += 1.1, r -= 1.1;
    } else Nr(e) ? a.end = function(d) {
      var f = e.call(t, d), l, g;
      if (n !== 1)
        if (io(f)) {
          l = {};
          for (g in f)
            l[g] = f[g] * n;
          f = l;
        } else
          f *= n;
      return f;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (r || r === 0) && (a.min = r), o && (a.velocity = 0), a;
}, d_ = function s(t) {
  var e;
  return !t || !t.getAttribute || t === Sr ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (s_.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, ta = function(t, e) {
  for (var i = t.length, r; i--; )
    r = t[i], r.ondragstart = r.onselectstart = e ? null : xa, Ct.set(r, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, f_ = function s(t) {
  if (Po(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, xf, dh, p_ = function(t, e) {
  t = Ct.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), r = i.style, n = t.firstChild, o = 0, a = 0, h = t.scrollTop, c = t.scrollLeft, u = t.scrollWidth, d = t.scrollHeight, f = 0, l = 0, g = 0, p, _, C, v, x, S;
  xf && e.force3D !== !1 ? (x = "translate3d(", S = "px,0px)") : ro && (x = "translate(", S = "px)"), this.scrollTop = function(w, M) {
    if (!arguments.length)
      return -this.top();
    this.top(-w, M);
  }, this.scrollLeft = function(w, M) {
    if (!arguments.length)
      return -this.left();
    this.left(-w, M);
  }, this.left = function(w, M) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var O = t.scrollLeft - c, k = a;
    if ((O > 2 || O < -2) && !M) {
      c = t.scrollLeft, Ct.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-c), e.onKill && e.onKill();
      return;
    }
    w = -w, w < 0 ? (a = w - 0.5 | 0, w = 0) : w > l ? (a = w - l | 0, w = l) : a = 0, (a || k) && (this._skip || (r[ro] = x + -a + "px," + -o + S), a + f >= 0 && (r.paddingRight = a + f + "px")), t.scrollLeft = w | 0, c = t.scrollLeft;
  }, this.top = function(w, M) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var O = t.scrollTop - h, k = o;
    if ((O > 2 || O < -2) && !M) {
      h = t.scrollTop, Ct.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-h), e.onKill && e.onKill();
      return;
    }
    w = -w, w < 0 ? (o = w - 0.5 | 0, w = 0) : w > g ? (o = w - g | 0, w = g) : o = 0, (o || k) && (this._skip || (r[ro] = x + -a + "px," + -o + S)), t.scrollTop = w | 0, h = t.scrollTop;
  }, this.maxScrollTop = function() {
    return g;
  }, this.maxScrollLeft = function() {
    return l;
  }, this.disable = function() {
    for (n = i.firstChild; n; )
      v = n.nextSibling, t.appendChild(n), n = v;
    t === i.parentNode && t.removeChild(i);
  }, this.enable = function() {
    if (n = t.firstChild, n !== i) {
      for (; n; )
        v = n.nextSibling, i.appendChild(n), n = v;
      t.appendChild(i), this.calibrate();
    }
  }, this.calibrate = function(w) {
    var M = t.clientWidth === p, O, k, D;
    h = t.scrollTop, c = t.scrollLeft, !(M && t.clientHeight === _ && i.offsetHeight === C && u === t.scrollWidth && d === t.scrollHeight && !w) && ((o || a) && (k = this.left(), D = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), O = Po(t), (!M || w) && (r.display = "block", r.width = "auto", r.paddingRight = "0px", f = Math.max(0, t.scrollWidth - t.clientWidth), f && (f += parseFloat(O.paddingLeft) + (dh ? parseFloat(O.paddingRight) : 0))), r.display = "inline-block", r.position = "relative", r.overflow = "visible", r.verticalAlign = "top", r.boxSizing = "content-box", r.width = "100%", r.paddingRight = f + "px", dh && (r.paddingBottom = O.paddingBottom), p = t.clientWidth, _ = t.clientHeight, u = t.scrollWidth, d = t.scrollHeight, l = t.scrollWidth - p, g = t.scrollHeight - _, C = i.offsetHeight, r.display = "block", (k || D) && (this.left(k), this.top(D)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, Dl = function(t) {
  if (yf() && document.body) {
    var e = window && window.navigator;
    Bt = window, Ti = document, ji = Ti.documentElement, Sr = Ti.body, kl = Jo("div"), Ta = !!window.PointerEvent, wr = Jo("div"), wr.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Ws = wr.style.cursor === "grab" ? "grab" : "move", Ys = e && e.userAgent.toLowerCase().indexOf("android") !== -1, hh = "ontouchstart" in ji && "orientation" in Bt || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), dh = function() {
      var i = Jo("div"), r = Jo("div"), n = r.style, o = Sr, a;
      return n.display = "inline-block", n.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(r), o.appendChild(i), a = r.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), Co = function(i) {
      for (var r = i.split(","), n = ("onpointerdown" in kl ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in kl ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[r[a]] = n[a], o[n[a]] = r[a];
      try {
        ji.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            _f = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), Pe(Ti, "touchcancel", xa), Pe(Bt, "touchmove", xa), Sr && Sr.addEventListener("touchstart", xa), Pe(Ti, "contextmenu", function() {
      for (var i in as)
        as[i].isPressed && as[i].endDrag();
    }), Ct = lh = wf();
  }
  Ct ? (Xi = Ct.plugins.inertia, vf = Ct.core.context || function() {
  }, Bs = Ct.utils.checkPrefix, ro = Bs(ro), uh = Bs(uh), Br = Ct.utils.toArray, ch = Ct.core.getStyleSaver, xf = !!Bs("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, g_ = /* @__PURE__ */ function() {
  function s(e) {
    this._listeners = {}, this.target = e || this;
  }
  var t = s.prototype;
  return t.addEventListener = function(i, r) {
    var n = this._listeners[i] || (this._listeners[i] = []);
    ~n.indexOf(r) || n.push(r);
  }, t.removeEventListener = function(i, r) {
    var n = this._listeners[i], o = n && n.indexOf(r);
    o >= 0 && n.splice(o, 1);
  }, t.dispatchEvent = function(i) {
    var r = this, n;
    return (this._listeners[i] || []).forEach(function(o) {
      return o.call(r, {
        type: i,
        target: r.target
      }) === !1 && (n = !1);
    }), n;
  }, s;
}(), nl = /* @__PURE__ */ function(s) {
  i_(t, s);
  function t(e, i) {
    var r;
    r = s.call(this) || this, lh || Dl(1), e = Br(e)[0], r.styles = ch && ch(e, "transform,left,top"), Xi || (Xi = Ct.plugins.inertia), r.vars = i = bf(i || {}), r.target = e, r.x = r.y = r.rotation = 0, r.dragResistance = parseFloat(i.dragResistance) || 0, r.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, r.lockAxis = i.lockAxis, r.autoScroll = i.autoScroll || 0, r.lockedAxis = null, r.allowEventDefault = !!i.allowEventDefault, Ct.getProperty(e, "x");
    var n = (i.type || "x,y").toLowerCase(), o = ~n.indexOf("x") || ~n.indexOf("y"), a = n.indexOf("rotation") !== -1, h = a ? "rotation" : o ? "x" : "left", c = o ? "y" : "top", u = !!(~n.indexOf("x") || ~n.indexOf("left") || n === "scroll"), d = !!(~n.indexOf("y") || ~n.indexOf("top") || n === "scroll"), f = i.minimumMovement || 2, l = lu(r), g = Br(i.trigger || i.handle || e), p = {}, _ = 0, C = !1, v = i.autoScrollMarginTop || 40, x = i.autoScrollMarginRight || 40, S = i.autoScrollMarginBottom || 40, w = i.autoScrollMarginLeft || 40, M = i.clickableTest || d_, O = 0, k = e._gsap || Ct.core.getCache(e), D = f_(e), z = function(y, $) {
      return parseFloat(k.get(e, y, $));
    }, W = e.ownerDocument || Ti, F, B, Q, et, X, U, nt, ot, b, J, rt, G, st, Gt, Tt, Dt, gt, ee, oe, Ft, Xt, ft, pt, lt, ke, A, Ht, je, Re, Rt, zt, de, Ze, Kt = function(y) {
      return Ii(y), y.stopImmediatePropagation && y.stopImmediatePropagation(), !1;
    }, ae = function j(y) {
      if (l.autoScroll && l.isDragging && (C || gt)) {
        var $ = e, E = l.autoScroll * 15, P, H, I, Y, R, q, tt, V;
        for (C = !1, _r.scrollTop = Bt.pageYOffset != null ? Bt.pageYOffset : W.documentElement.scrollTop != null ? W.documentElement.scrollTop : W.body.scrollTop, _r.scrollLeft = Bt.pageXOffset != null ? Bt.pageXOffset : W.documentElement.scrollLeft != null ? W.documentElement.scrollLeft : W.body.scrollLeft, Y = l.pointerX - _r.scrollLeft, R = l.pointerY - _r.scrollTop; $ && !H; )
          H = xs($.parentNode), P = H ? _r : $.parentNode, I = H ? {
            bottom: Math.max(ji.clientHeight, Bt.innerHeight || 0),
            right: Math.max(ji.clientWidth, Bt.innerWidth || 0),
            left: 0,
            top: 0
          } : P.getBoundingClientRect(), q = tt = 0, d && (V = P._gsMaxScrollY - P.scrollTop, V < 0 ? tt = V : R > I.bottom - S && V ? (C = !0, tt = Math.min(V, E * (1 - Math.max(0, I.bottom - R) / S) | 0)) : R < I.top + v && P.scrollTop && (C = !0, tt = -Math.min(P.scrollTop, E * (1 - Math.max(0, R - I.top) / v) | 0)), tt && (P.scrollTop += tt)), u && (V = P._gsMaxScrollX - P.scrollLeft, V < 0 ? q = V : Y > I.right - x && V ? (C = !0, q = Math.min(V, E * (1 - Math.max(0, I.right - Y) / x) | 0)) : Y < I.left + w && P.scrollLeft && (C = !0, q = -Math.min(P.scrollLeft, E * (1 - Math.max(0, Y - I.left) / w) | 0)), q && (P.scrollLeft += q)), H && (q || tt) && (Bt.scrollTo(P.scrollLeft, P.scrollTop), Ye(l.pointerX + q, l.pointerY + tt)), $ = P;
      }
      if (gt) {
        var ct = l.x, xt = l.y;
        a ? (l.deltaX = ct - parseFloat(k.rotation), l.rotation = ct, k.rotation = ct + "deg", k.renderTransform(1, k)) : B ? (d && (l.deltaY = xt - B.top(), B.top(xt)), u && (l.deltaX = ct - B.left(), B.left(ct))) : o ? (d && (l.deltaY = xt - parseFloat(k.y), k.y = xt + "px"), u && (l.deltaX = ct - parseFloat(k.x), k.x = ct + "px"), k.renderTransform(1, k)) : (d && (l.deltaY = xt - parseFloat(e.style.top || 0), e.style.top = xt + "px"), u && (l.deltaX = ct - parseFloat(e.style.left || 0), e.style.left = ct + "px")), ot && !y && !je && (je = !0, he(l, "drag", "onDrag") === !1 && (u && (l.x -= l.deltaX), d && (l.y -= l.deltaY), j(!0)), je = !1);
      }
      gt = !1;
    }, At = function(y, $) {
      var E = l.x, P = l.y, H, I;
      e._gsap || (k = Ct.core.getCache(e)), k.uncache && Ct.getProperty(e, "x"), o ? (l.x = parseFloat(k.x), l.y = parseFloat(k.y)) : a ? l.x = l.rotation = parseFloat(k.rotation) : B ? (l.y = B.top(), l.x = B.left()) : (l.y = parseFloat(e.style.top || (I = Po(e)) && I.top) || 0, l.x = parseFloat(e.style.left || (I || {}).left) || 0), (oe || Ft || Xt) && !$ && (l.isDragging || l.isThrowing) && (Xt && (Wn.x = l.x, Wn.y = l.y, H = Xt(Wn), H.x !== l.x && (l.x = H.x, gt = !0), H.y !== l.y && (l.y = H.y, gt = !0)), oe && (H = oe(l.x), H !== l.x && (l.x = H, a && (l.rotation = H), gt = !0)), Ft && (H = Ft(l.y), H !== l.y && (l.y = H), gt = !0)), gt && ae(!0), y || (l.deltaX = l.x - E, l.deltaY = l.y - P, he(l, "throwupdate", "onThrowUpdate"));
    }, fe = function(y, $, E, P) {
      return $ == null && ($ = -1e20), E == null && (E = Yn), Nr(y) ? function(H) {
        var I = l.isPressed ? 1 - l.edgeResistance : 1;
        return y.call(l, (H > E ? E + (H - E) * I : H < $ ? $ + (H - $) * I : H) * P) * P;
      } : Ms(y) ? function(H) {
        for (var I = y.length, Y = 0, R = Yn, q, tt; --I > -1; )
          q = y[I], tt = q - H, tt < 0 && (tt = -tt), tt < R && q >= $ && q <= E && (Y = I, R = tt);
        return y[Y];
      } : isNaN(y) ? function(H) {
        return H;
      } : function() {
        return y * P;
      };
    }, Ne = function(y, $, E, P, H, I, Y) {
      return I = I && I < Yn ? I * I : Yn, Nr(y) ? function(R) {
        var q = l.isPressed ? 1 - l.edgeResistance : 1, tt = R.x, V = R.y, ct, xt, Ot;
        return R.x = tt = tt > E ? E + (tt - E) * q : tt < $ ? $ + (tt - $) * q : tt, R.y = V = V > H ? H + (V - H) * q : V < P ? P + (V - P) * q : V, ct = y.call(l, R), ct !== R && (R.x = ct.x, R.y = ct.y), Y !== 1 && (R.x *= Y, R.y *= Y), I < Yn && (xt = R.x - tt, Ot = R.y - V, xt * xt + Ot * Ot > I && (R.x = tt, R.y = V)), R;
      } : Ms(y) ? function(R) {
        for (var q = y.length, tt = 0, V = Yn, ct, xt, Ot, _t; --q > -1; )
          Ot = y[q], ct = Ot.x - R.x, xt = Ot.y - R.y, _t = ct * ct + xt * xt, _t < V && (tt = q, V = _t);
        return V <= I ? y[tt] : R;
      } : function(R) {
        return R;
      };
    }, $e = function() {
      var y, $, E, P;
      nt = !1, B ? (B.calibrate(), l.minX = rt = -B.maxScrollLeft(), l.minY = st = -B.maxScrollTop(), l.maxX = J = l.maxY = G = 0, nt = !0) : i.bounds && (y = vu(i.bounds, e.parentNode), a ? (l.minX = rt = y.left, l.maxX = J = y.left + y.width, l.minY = st = l.maxY = G = 0) : !Gi(i.bounds.maxX) || !Gi(i.bounds.maxY) ? (y = i.bounds, l.minX = rt = y.minX, l.minY = st = y.minY, l.maxX = J = y.maxX, l.maxY = G = y.maxY) : ($ = vu(e, e.parentNode), l.minX = rt = Math.round(z(h, "px") + y.left - $.left), l.minY = st = Math.round(z(c, "px") + y.top - $.top), l.maxX = J = Math.round(rt + (y.width - $.width)), l.maxY = G = Math.round(st + (y.height - $.height))), rt > J && (l.minX = J, l.maxX = J = rt, rt = l.minX), st > G && (l.minY = G, l.maxY = G = st, st = l.minY), a && (l.minRotation = rt, l.maxRotation = J), nt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, P = Ms(E) || Nr(E), a ? (oe = fe(P ? E : E.rotation, rt, J, 1), Ft = null) : E.points ? Xt = Ne(P ? E : E.points, rt, J, st, G, E.radius, B ? -1 : 1) : (u && (oe = fe(P ? E : E.x || E.left || E.scrollLeft, rt, J, B ? -1 : 1)), d && (Ft = fe(P ? E : E.y || E.top || E.scrollTop, st, G, B ? -1 : 1))));
    }, Qi = function() {
      l.isThrowing = !1, he(l, "throwcomplete", "onThrowComplete");
    }, Vt = function() {
      l.isThrowing = !1;
    }, Ji = function(y, $) {
      var E, P, H, I;
      y && Xi ? (y === !0 && (E = i.snap || i.liveSnap || {}, P = Ms(E) || Nr(E), y = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? y.rotation = Ll(l, P ? E : E.rotation, J, rt, 1, $) : (u && (y[h] = Ll(l, P ? E : E.points || E.x || E.left, J, rt, B ? -1 : 1, $ || l.lockedAxis === "x")), d && (y[c] = Ll(l, P ? E : E.points || E.y || E.top, G, st, B ? -1 : 1, $ || l.lockedAxis === "y")), (E.points || Ms(E) && io(E[0])) && (y.linkedProps = h + "," + c, y.radius = E.radius))), l.isThrowing = !0, I = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - l.edgeResistance + 0.2 : i.overshootTolerance, y.duration || (y.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? I === 0 || io(y) && y.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: I
      }), l.tween = H = Ct.to(B || e, {
        inertia: y,
        data: "_draggable",
        inherit: !1,
        onComplete: Qi,
        onInterrupt: Vt,
        onUpdate: i.fastMode ? he : At,
        onUpdateParams: i.fastMode ? [l, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), H.render(1e9, !0, !0), At(!0, !0), l.endX = l.x, l.endY = l.y, a && (l.endRotation = l.x), H.play(0), At(!0, !0), B && (B._skip = !1))) : nt && l.applyBounds();
    }, ai = function(y) {
      var $ = lt, E;
      lt = hn(e.parentNode, !0), y && l.isPressed && !lt.equals($ || new An()) && (E = $.inverse().apply({
        x: Q,
        y: et
      }), lt.apply(E, E), Q = E.x, et = E.y), lt.equals(r_) && (lt = null);
    }, be = function() {
      var y = 1 - l.edgeResistance, $ = D ? hs(W) : 0, E = D ? ls(W) : 0, P, H, I;
      o && (k.x = z(h, "px") + "px", k.y = z(c, "px") + "px", k.renderTransform()), ai(!1), Mi.x = l.pointerX - $, Mi.y = l.pointerY - E, lt && lt.apply(Mi, Mi), Q = Mi.x, et = Mi.y, gt && (Ye(l.pointerX, l.pointerY), ae(!0)), de = hn(e), B ? ($e(), U = B.top(), X = B.left()) : (ze() ? (At(!0, !0), $e()) : l.applyBounds(), a ? (P = e.ownerSVGElement ? [k.xOrigin - e.getBBox().x, k.yOrigin - e.getBBox().y] : (Po(e)[uh] || "0 0").split(" "), Dt = l.rotationOrigin = hn(e).apply({
        x: parseFloat(P[0]) || 0,
        y: parseFloat(P[1]) || 0
      }), At(!0, !0), H = l.pointerX - Dt.x - $, I = Dt.y - l.pointerY + E, X = l.x, U = l.y = Math.atan2(I, H) * hu) : (U = z(c, "px"), X = z(h, "px"))), nt && y && (X > J ? X = J + (X - J) / y : X < rt && (X = rt - (rt - X) / y), a || (U > G ? U = G + (U - G) / y : U < st && (U = st - (st - U) / y))), l.startX = X = Lr(X), l.startY = U = Lr(U);
    }, ze = function() {
      return l.tween && l.tween.isActive();
    }, Oi = function() {
      wr.parentNode && !ze() && !l.isDragging && wr.parentNode.removeChild(wr);
    }, Be = function(y, $) {
      var E;
      if (!F || l.isPressed || !y || (y.type === "mousedown" || y.type === "pointerdown") && !$ && Dr() - O < 30 && Co[l.pointerEvent.type]) {
        zt && y && F && Ii(y);
        return;
      }
      if (ke = ze(), Ze = !1, l.pointerEvent = y, Co[y.type] ? (pt = ~y.type.indexOf("touch") ? y.currentTarget || y.target : W, Pe(pt, "touchend", Nt), Pe(pt, "touchmove", at), Pe(pt, "touchcancel", Nt), Pe(W, "touchstart", pu)) : (pt = null, Pe(W, "mousemove", at)), Ht = null, (!Ta || !pt) && (Pe(W, "mouseup", Nt), y && y.target && Pe(y.target, "mouseup", Nt)), ft = M.call(l, y.target) && i.dragClickables === !1 && !$, ft) {
        Pe(y.target, "change", Nt), he(l, "pressInit", "onPressInit"), he(l, "press", "onPress"), ta(g, !0), zt = !1;
        return;
      }
      if (A = !pt || u === d || l.vars.allowNativeTouchScrolling === !1 || l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2) ? !1 : u ? "y" : "x", zt = !A && !l.allowEventDefault, zt && (Ii(y), Pe(Bt, "touchforcechange", Ii)), y.changedTouches ? (y = Gt = y.changedTouches[0], Tt = y.identifier) : y.pointerId ? Tt = y.pointerId : Gt = Tt = null, $a++, a_(ae), et = l.pointerY = y.pageY, Q = l.pointerX = y.pageX, he(l, "pressInit", "onPressInit"), (A || l.autoScroll) && Il(e.parentNode), e.parentNode && l.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !wr.parentNode && !e.getBBox && (wr.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(wr)), be(), l.tween && l.tween.kill(), l.isThrowing = !1, Ct.killTweensOf(B || e, p, !0), B && Ct.killTweensOf(e, {
        scrollTo: 1
      }, !0), l.tween = l.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), l.isPressed = !0, ot = !!(i.onDrag || l._listeners.drag), b = !!(i.onMove || l._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = g.length; --E > -1; )
          Ct.set(g[E], {
            cursor: i.activeCursor || i.cursor || (Ws === "grab" ? "grabbing" : Ws)
          });
      he(l, "press", "onPress");
    }, at = function(y) {
      var $ = y, E, P, H, I, Y, R;
      if (!F || dc || !l.isPressed || !y) {
        zt && y && F && Ii(y);
        return;
      }
      if (l.pointerEvent = y, E = y.changedTouches, E) {
        if (y = E[0], y !== Gt && y.identifier !== Tt) {
          for (I = E.length; --I > -1 && (y = E[I]).identifier !== Tt && y.target !== e; )
            ;
          if (I < 0)
            return;
        }
      } else if (y.pointerId && Tt && y.pointerId !== Tt)
        return;
      if (pt && A && !Ht && (Mi.x = y.pageX - (D ? hs(W) : 0), Mi.y = y.pageY - (D ? ls(W) : 0), lt && lt.apply(Mi, Mi), P = Mi.x, H = Mi.y, Y = Math.abs(P - Q), R = Math.abs(H - et), (Y !== R && (Y > f || R > f) || Ys && A === Ht) && (Ht = Y > R && u ? "x" : "y", A && Ht !== A && Pe(Bt, "touchforcechange", Ii), l.vars.lockAxisOnTouchScroll !== !1 && u && d && (l.lockedAxis = Ht === "x" ? "y" : "x", Nr(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, $)), Ys && A === Ht))) {
        Nt($);
        return;
      }
      !l.allowEventDefault && (!A || Ht && A !== Ht) && $.cancelable !== !1 ? (Ii($), zt = !0) : zt && (zt = !1), l.autoScroll && (C = !0), Ye(y.pageX, y.pageY, b);
    }, Ye = function(y, $, E) {
      var P = 1 - l.dragResistance, H = 1 - l.edgeResistance, I = l.pointerX, Y = l.pointerY, R = U, q = l.x, tt = l.y, V = l.endX, ct = l.endY, xt = l.endRotation, Ot = gt, _t, dt, kt, ht, Te, jt;
      l.pointerX = y, l.pointerY = $, D && (y -= hs(W), $ -= ls(W)), a ? (ht = Math.atan2(Dt.y - $, y - Dt.x) * hu, Te = l.y - ht, Te > 180 ? (U -= 360, l.y = ht) : Te < -180 && (U += 360, l.y = ht), l.x !== X || Math.max(Math.abs(Q - y), Math.abs(et - $)) > f ? (l.y = ht, kt = X + (U - ht) * P) : kt = X) : (lt && (jt = y * lt.a + $ * lt.c + lt.e, $ = y * lt.b + $ * lt.d + lt.f, y = jt), dt = $ - et, _t = y - Q, dt < f && dt > -f && (dt = 0), _t < f && _t > -f && (_t = 0), (l.lockAxis || l.lockedAxis) && (_t || dt) && (jt = l.lockedAxis, jt || (l.lockedAxis = jt = u && Math.abs(_t) > Math.abs(dt) ? "y" : d ? "x" : null, jt && Nr(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, l.pointerEvent)), jt === "y" ? dt = 0 : jt === "x" && (_t = 0)), kt = Lr(X + _t * P), ht = Lr(U + dt * P)), (oe || Ft || Xt) && (l.x !== kt || l.y !== ht && !a) && (Xt && (Wn.x = kt, Wn.y = ht, jt = Xt(Wn), kt = Lr(jt.x), ht = Lr(jt.y)), oe && (kt = Lr(oe(kt))), Ft && (ht = Lr(Ft(ht)))), nt && (kt > J ? kt = J + Math.round((kt - J) * H) : kt < rt && (kt = rt + Math.round((kt - rt) * H)), a || (ht > G ? ht = Math.round(G + (ht - G) * H) : ht < st && (ht = Math.round(st + (ht - st) * H)))), (l.x !== kt || l.y !== ht && !a) && (a ? (l.endRotation = l.x = l.endX = kt, gt = !0) : (d && (l.y = l.endY = ht, gt = !0), u && (l.x = l.endX = kt, gt = !0)), !E || he(l, "move", "onMove") !== !1 ? !l.isDragging && l.isPressed && (l.isDragging = Ze = !0, he(l, "dragstart", "onDragStart")) : (l.pointerX = I, l.pointerY = Y, U = R, l.x = q, l.y = tt, l.endX = V, l.endY = ct, l.endRotation = xt, gt = Ot));
    }, Nt = function j(y, $) {
      if (!F || !l.isPressed || y && Tt != null && !$ && (y.pointerId && y.pointerId !== Tt && y.target !== e || y.changedTouches && !h_(y.changedTouches, Tt))) {
        zt && y && F && Ii(y);
        return;
      }
      l.isPressed = !1;
      var E = y, P = l.isDragging, H = l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2), I = Ct.delayedCall(1e-3, Oi), Y, R, q, tt, V;
      if (pt ? (me(pt, "touchend", j), me(pt, "touchmove", at), me(pt, "touchcancel", j), me(W, "touchstart", pu)) : me(W, "mousemove", at), me(Bt, "touchforcechange", Ii), (!Ta || !pt) && (me(W, "mouseup", j), y && y.target && me(y.target, "mouseup", j)), gt = !1, P && (_ = cu = Dr(), l.isDragging = !1), fu(ae), ft && !H) {
        y && (me(y.target, "change", j), l.pointerEvent = E), ta(g, !1), he(l, "release", "onRelease"), he(l, "click", "onClick"), ft = !1;
        return;
      }
      for (R = g.length; --R > -1; )
        Ml(g[R], "cursor", i.cursor || (i.cursor !== !1 ? Ws : null));
      if ($a--, y) {
        if (Y = y.changedTouches, Y && (y = Y[0], y !== Gt && y.identifier !== Tt)) {
          for (R = Y.length; --R > -1 && (y = Y[R]).identifier !== Tt && y.target !== e; )
            ;
          if (R < 0 && !$)
            return;
        }
        l.pointerEvent = E, l.pointerX = y.pageX, l.pointerY = y.pageY;
      }
      return H && E ? (Ii(E), zt = !0, he(l, "release", "onRelease")) : E && !P ? (zt = !1, ke && (i.snap || i.bounds) && Ji(i.inertia || i.throwProps), he(l, "release", "onRelease"), (!Ys || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (he(l, "click", "onClick"), Dr() - O < 300 && he(l, "doubleclick", "onDoubleClick"), tt = E.target || e, O = Dr(), V = function() {
        O !== Re && l.enabled() && !l.isPressed && !E.defaultPrevented && (tt.click ? tt.click() : W.createEvent && (q = W.createEvent("MouseEvents"), q.initMouseEvent("click", !0, !0, Bt, 1, l.pointerEvent.screenX, l.pointerEvent.screenY, l.pointerX, l.pointerY, !1, !1, !1, !1, 0, null), tt.dispatchEvent(q)));
      }, !Ys && !E.defaultPrevented && Ct.delayedCall(0.05, V))) : (Ji(i.inertia || i.throwProps), !l.allowEventDefault && E && (i.dragClickables !== !1 || !M.call(l, E.target)) && P && (!A || Ht && A === Ht) && E.cancelable !== !1 ? (zt = !0, Ii(E)) : zt = !1, he(l, "release", "onRelease")), ze() && I.duration(l.tween.duration()), P && he(l, "dragend", "onDragEnd"), !0;
    }, Ie = function(y) {
      if (y && l.isDragging && !B) {
        var $ = y.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, P = $.scrollTop - $._gsScrollY;
        (E || P) && (lt ? (Q -= E * lt.a + P * lt.c, et -= P * lt.d + E * lt.b) : (Q -= E, et -= P), $._gsScrollX += E, $._gsScrollY += P, Ye(l.pointerX, l.pointerY));
      }
    }, ne = function(y) {
      var $ = Dr(), E = $ - O < 100, P = $ - _ < 50, H = E && Re === O, I = l.pointerEvent && l.pointerEvent.defaultPrevented, Y = E && Rt === O, R = y.isTrusted || y.isTrusted == null && E && H;
      if ((H || P && l.vars.suppressClickOnDrag !== !1) && y.stopImmediatePropagation && y.stopImmediatePropagation(), E && !(l.pointerEvent && l.pointerEvent.defaultPrevented) && (!H || R && !Y)) {
        R && H && (Rt = O), Re = O;
        return;
      }
      (l.isPressed || P || E) && (!R || !y.detail || !E || I) && Ii(y), !E && !P && !Ze && (y && y.target && (l.pointerEvent = y), he(l, "click", "onClick"));
    }, Ai = function(y) {
      return lt ? {
        x: y.x * lt.a + y.y * lt.c + lt.e,
        y: y.x * lt.b + y.y * lt.d + lt.f
      } : {
        x: y.x,
        y: y.y
      };
    };
    return ee = t.get(e), ee && ee.kill(), r.startDrag = function(j, y) {
      var $, E, P, H;
      Be(j || l.pointerEvent, !0), y && !l.hitTest(j || l.pointerEvent) && ($ = Un(j || l.pointerEvent), E = Un(e), P = Ai({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), H = Ai({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), Q -= P.x - H.x, et -= P.y - H.y), l.isDragging || (l.isDragging = Ze = !0, he(l, "dragstart", "onDragStart"));
    }, r.drag = at, r.endDrag = function(j) {
      return Nt(j || l.pointerEvent, !0);
    }, r.timeSinceDrag = function() {
      return l.isDragging ? 0 : (Dr() - _) / 1e3;
    }, r.timeSinceClick = function() {
      return (Dr() - O) / 1e3;
    }, r.hitTest = function(j, y) {
      return t.hitTest(l.target, j, y);
    }, r.getDirection = function(j, y) {
      var $ = j === "velocity" && Xi ? j : io(j) && !a ? "element" : "start", E, P, H, I, Y, R;
      return $ === "element" && (Y = Un(l.target), R = Un(j)), E = $ === "start" ? l.x - X : $ === "velocity" ? Xi.getVelocity(e, h) : Y.left + Y.width / 2 - (R.left + R.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (y = y || 2, P = $ === "start" ? l.y - U : $ === "velocity" ? Xi.getVelocity(e, c) : Y.top + Y.height / 2 - (R.top + R.height / 2), H = Math.abs(E / P), I = H < 1 / y ? "" : E < 0 ? "left" : "right", H < y && (I !== "" && (I += "-"), I += P < 0 ? "up" : "down"), I);
    }, r.applyBounds = function(j, y) {
      var $, E, P, H, I, Y;
      if (j && i.bounds !== j)
        return i.bounds = j, l.update(!0, y);
      if (At(!0), $e(), nt && !ze()) {
        if ($ = l.x, E = l.y, $ > J ? $ = J : $ < rt && ($ = rt), E > G ? E = G : E < st && (E = st), (l.x !== $ || l.y !== E) && (P = !0, l.x = l.endX = $, a ? l.endRotation = $ : l.y = l.endY = E, gt = !0, ae(!0), l.autoScroll && !l.isDragging))
          for (Il(e.parentNode), H = e, _r.scrollTop = Bt.pageYOffset != null ? Bt.pageYOffset : W.documentElement.scrollTop != null ? W.documentElement.scrollTop : W.body.scrollTop, _r.scrollLeft = Bt.pageXOffset != null ? Bt.pageXOffset : W.documentElement.scrollLeft != null ? W.documentElement.scrollLeft : W.body.scrollLeft; H && !Y; )
            Y = xs(H.parentNode), I = Y ? _r : H.parentNode, d && I.scrollTop > I._gsMaxScrollY && (I.scrollTop = I._gsMaxScrollY), u && I.scrollLeft > I._gsMaxScrollX && (I.scrollLeft = I._gsMaxScrollX), H = I;
        l.isThrowing && (P || l.endX > J || l.endX < rt || l.endY > G || l.endY < st) && Ji(i.inertia || i.throwProps, P);
      }
      return l;
    }, r.update = function(j, y, $) {
      if (y && l.isPressed) {
        var E = hn(e), P = de.apply({
          x: l.x - X,
          y: l.y - U
        }), H = hn(e.parentNode, !0);
        H.apply({
          x: E.e - P.x,
          y: E.f - P.y
        }, P), l.x -= P.x - H.e, l.y -= P.y - H.f, ae(!0), be();
      }
      var I = l.x, Y = l.y;
      return ai(!y), j ? l.applyBounds() : (gt && $ && ae(!0), At(!0)), y && (Ye(l.pointerX, l.pointerY), gt && ae(!0)), l.isPressed && !y && (u && Math.abs(I - l.x) > 0.01 || d && Math.abs(Y - l.y) > 0.01 && !a) && be(), l.autoScroll && (Il(e.parentNode, l.isDragging), C = l.isDragging, ae(!0), mu(e, Ie), gu(e, Ie)), l;
    }, r.enable = function(j) {
      var y = {
        lazy: !0
      }, $, E, P;
      if (i.cursor !== !1 && (y.cursor = i.cursor || Ws), Ct.utils.checkPrefix("touchCallout") && (y.touchCallout = "none"), j !== "soft") {
        for (uu(g, u === d ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : u ? "pan-y" : "pan-x"), E = g.length; --E > -1; )
          P = g[E], Ta || Pe(P, "mousedown", Be), Pe(P, "touchstart", Be), Pe(P, "click", ne, !0), Ct.set(P, y), P.getBBox && P.ownerSVGElement && u !== d && Ct.set(P.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : u ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Pe(P, "contextmenu", Kt);
        ta(g, !1);
      }
      return gu(e, Ie), F = !0, Xi && j !== "soft" && Xi.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + n_++, as[$] = l, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && be(), i.bounds && l.applyBounds(), l;
    }, r.disable = function(j) {
      for (var y = l.isDragging, $ = g.length, E; --$ > -1; )
        Ml(g[$], "cursor", null);
      if (j !== "soft") {
        for (uu(g, null), $ = g.length; --$ > -1; )
          E = g[$], Ml(E, "touchCallout", null), me(E, "mousedown", Be), me(E, "touchstart", Be), me(E, "click", ne, !0), me(E, "contextmenu", Kt);
        ta(g, !0), pt && (me(pt, "touchcancel", Nt), me(pt, "touchend", Nt), me(pt, "touchmove", at)), me(W, "mouseup", Nt), me(W, "mousemove", at);
      }
      return mu(e, Ie), F = !1, Xi && j !== "soft" && (Xi.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), l.tween && l.tween.kill()), B && B.disable(), fu(ae), l.isDragging = l.isPressed = ft = !1, y && he(l, "dragend", "onDragEnd"), l;
    }, r.enabled = function(j, y) {
      return arguments.length ? j ? l.enable(y) : l.disable(y) : F;
    }, r.kill = function() {
      return l.isThrowing = !1, l.tween && l.tween.kill(), l.disable(), Ct.set(g, {
        clearProps: "userSelect"
      }), delete as[e._gsDragID], l;
    }, r.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~n.indexOf("scroll") && (B = r.scrollProxy = new p_(e, o_({
      onKill: function() {
        l.isPressed && Nt(null);
      }
    }, i)), e.style.overflowY = d && !hh ? "auto" : "hidden", e.style.overflowX = u && !hh ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (u && (p[h] = 1), d && (p[c] = 1)), k.force3D = "force3D" in i ? i.force3D : !0, vf(lu(r)), r.enable(), r;
  }
  return t.register = function(i) {
    Ct = i, Dl();
  }, t.create = function(i, r) {
    return lh || Dl(!0), Br(i).map(function(n) {
      return new t(n, r);
    });
  }, t.get = function(i) {
    return as[(Br(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (Dr() - cu) / 1e3;
  }, t.hitTest = function(i, r, n) {
    if (i === r)
      return !1;
    var o = Un(i), a = Un(r), h = o.top, c = o.left, u = o.right, d = o.bottom, f = o.width, l = o.height, g = a.left > u || a.right < c || a.top > d || a.bottom < h, p, _, C;
    return g || !n ? !g : (C = (n + "").indexOf("%") !== -1, n = parseFloat(n) || 0, p = {
      left: Math.max(c, a.left),
      top: Math.max(h, a.top)
    }, p.width = Math.min(u, a.right) - p.left, p.height = Math.min(d, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : C ? (n *= 0.01, _ = p.width * p.height, _ >= f * l * n || _ >= a.width * a.height * n) : p.width > n && p.height > n);
  }, t;
}(g_);
l_(nl.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
nl.zIndex = 1e3;
nl.version = "3.13.0";
wf() && Ct.registerPlugin(nl);
function m_(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function __(s, t, e) {
  return t && m_(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Fe, Sa, xi, Yr, Wr, cs, Sf, an, no, Ef, Er, Vi, Cf, Pf = function() {
  return Fe || typeof window < "u" && (Fe = window.gsap) && Fe.registerPlugin && Fe;
}, Of = 1, ts = [], wt = [], cr = [], so = Date.now, fh = function(t, e) {
  return e;
}, v_ = function() {
  var t = no.core, e = t.bridge || {}, i = t._scrollers, r = t._proxies;
  i.push.apply(i, wt), r.push.apply(r, cr), wt = i, cr = r, fh = function(o, a) {
    return e[o](a);
  };
}, Xr = function(t, e) {
  return ~cr.indexOf(t) && cr[cr.indexOf(t) + 1][e];
}, oo = function(t) {
  return !!~Ef.indexOf(t);
}, ti = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: r !== !1,
    capture: !!n
  });
}, Je = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, ea = "scrollLeft", ia = "scrollTop", ph = function() {
  return Er && Er.isPressed || wt.cache++;
}, Ba = function(t, e) {
  var i = function r(n) {
    if (n || n === 0) {
      Of && (xi.history.scrollRestoration = "manual");
      var o = Er && Er.isPressed;
      n = r.v = Math.round(n) || (Er && Er.iOS ? 1 : 0), t(n), r.cacheID = wt.cache, o && fh("ss", n);
    } else (e || wt.cache !== r.cacheID || fh("ref")) && (r.cacheID = wt.cache, r.v = t());
    return r.v + r.offset;
  };
  return i.offset = 0, t && i;
}, si = {
  s: ea,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Ba(function(s) {
    return arguments.length ? xi.scrollTo(s, Ae.sc()) : xi.pageXOffset || Yr[ea] || Wr[ea] || cs[ea] || 0;
  })
}, Ae = {
  s: ia,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: si,
  sc: Ba(function(s) {
    return arguments.length ? xi.scrollTo(si.sc(), s) : xi.pageYOffset || Yr[ia] || Wr[ia] || cs[ia] || 0;
  })
}, hi = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Fe.utils.toArray)(t)[0] || (typeof t == "string" && Fe.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, y_ = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Qr = function(t, e) {
  var i = e.s, r = e.sc;
  oo(t) && (t = Yr.scrollingElement || Wr);
  var n = wt.indexOf(t), o = r === Ae.sc ? 1 : 2;
  !~n && (n = wt.push(t) - 1), wt[n + o] || ti(t, "scroll", ph);
  var a = wt[n + o], h = a || (wt[n + o] = Ba(Xr(t, i), !0) || (oo(t) ? r : Ba(function(c) {
    return arguments.length ? t[i] = c : t[i];
  })));
  return h.target = t, a || (h.smooth = Fe.getProperty(t, "scrollBehavior") === "smooth"), h;
}, gh = function(t, e, i) {
  var r = t, n = t, o = so(), a = o, h = e || 50, c = Math.max(500, h * 3), u = function(g, p) {
    var _ = so();
    p || _ - o > h ? (n = r, r = g, a = o, o = _) : i ? r += g : r = n + (g - n) / (_ - a) * (o - a);
  }, d = function() {
    n = r = i ? 0 : r, a = o = 0;
  }, f = function(g) {
    var p = a, _ = n, C = so();
    return (g || g === 0) && g !== r && u(g), o === a || C - a > c ? 0 : (r + (i ? _ : -_)) / ((i ? C : o) - p) * 1e3;
  };
  return {
    update: u,
    reset: d,
    getVelocity: f
  };
}, Ls = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, yu = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, Af = function() {
  no = Fe.core.globals().ScrollTrigger, no && no.core && v_();
}, kf = function(t) {
  return Fe = t || Pf(), !Sa && Fe && typeof document < "u" && document.body && (xi = window, Yr = document, Wr = Yr.documentElement, cs = Yr.body, Ef = [xi, Yr, Wr, cs], Fe.utils.clamp, Cf = Fe.core.context || function() {
  }, an = "onpointerenter" in cs ? "pointer" : "mouse", Sf = ue.isTouch = xi.matchMedia && xi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in xi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Vi = ue.eventTypes = ("ontouchstart" in Wr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Wr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Of = 0;
  }, 500), Af(), Sa = 1), Sa;
};
si.op = Ae;
wt.cache = 0;
var ue = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    Sa || kf(Fe) || console.warn("Please gsap.registerPlugin(Observer)"), no || Af();
    var r = i.tolerance, n = i.dragMinimum, o = i.type, a = i.target, h = i.lineHeight, c = i.debounce, u = i.preventDefault, d = i.onStop, f = i.onStopDelay, l = i.ignore, g = i.wheelSpeed, p = i.event, _ = i.onDragStart, C = i.onDragEnd, v = i.onDrag, x = i.onPress, S = i.onRelease, w = i.onRight, M = i.onLeft, O = i.onUp, k = i.onDown, D = i.onChangeX, z = i.onChangeY, W = i.onChange, F = i.onToggleX, B = i.onToggleY, Q = i.onHover, et = i.onHoverEnd, X = i.onMove, U = i.ignoreCheck, nt = i.isNormalizer, ot = i.onGestureStart, b = i.onGestureEnd, J = i.onWheel, rt = i.onEnable, G = i.onDisable, st = i.onClick, Gt = i.scrollSpeed, Tt = i.capture, Dt = i.allowClicks, gt = i.lockAxis, ee = i.onLockAxis;
    this.target = a = hi(a) || Wr, this.vars = i, l && (l = Fe.utils.toArray(l)), r = r || 1e-9, n = n || 0, g = g || 1, Gt = Gt || 1, o = o || "wheel,touch,pointer", c = c !== !1, h || (h = parseFloat(xi.getComputedStyle(cs).lineHeight) || 22);
    var oe, Ft, Xt, ft, pt, lt, ke, A = this, Ht = 0, je = 0, Re = i.passive || !u && i.passive !== !1, Rt = Qr(a, si), zt = Qr(a, Ae), de = Rt(), Ze = zt(), Kt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Vi[0] === "pointerdown", ae = oo(a), At = a.ownerDocument || Yr, fe = [0, 0, 0], Ne = [0, 0, 0], $e = 0, Qi = function() {
      return $e = so();
    }, Vt = function(P, H) {
      return (A.event = P) && l && y_(P.target, l) || H && Kt && P.pointerType !== "touch" || U && U(P, H);
    }, Ji = function() {
      A._vx.reset(), A._vy.reset(), Ft.pause(), d && d(A);
    }, ai = function() {
      var P = A.deltaX = yu(fe), H = A.deltaY = yu(Ne), I = Math.abs(P) >= r, Y = Math.abs(H) >= r;
      W && (I || Y) && W(A, P, H, fe, Ne), I && (w && A.deltaX > 0 && w(A), M && A.deltaX < 0 && M(A), D && D(A), F && A.deltaX < 0 != Ht < 0 && F(A), Ht = A.deltaX, fe[0] = fe[1] = fe[2] = 0), Y && (k && A.deltaY > 0 && k(A), O && A.deltaY < 0 && O(A), z && z(A), B && A.deltaY < 0 != je < 0 && B(A), je = A.deltaY, Ne[0] = Ne[1] = Ne[2] = 0), (ft || Xt) && (X && X(A), Xt && (_ && Xt === 1 && _(A), v && v(A), Xt = 0), ft = !1), lt && !(lt = !1) && ee && ee(A), pt && (J(A), pt = !1), oe = 0;
    }, be = function(P, H, I) {
      fe[I] += P, Ne[I] += H, A._vx.update(P), A._vy.update(H), c ? oe || (oe = requestAnimationFrame(ai)) : ai();
    }, ze = function(P, H) {
      gt && !ke && (A.axis = ke = Math.abs(P) > Math.abs(H) ? "x" : "y", lt = !0), ke !== "y" && (fe[2] += P, A._vx.update(P, !0)), ke !== "x" && (Ne[2] += H, A._vy.update(H, !0)), c ? oe || (oe = requestAnimationFrame(ai)) : ai();
    }, Oi = function(P) {
      if (!Vt(P, 1)) {
        P = Ls(P, u);
        var H = P.clientX, I = P.clientY, Y = H - A.x, R = I - A.y, q = A.isDragging;
        A.x = H, A.y = I, (q || (Y || R) && (Math.abs(A.startX - H) >= n || Math.abs(A.startY - I) >= n)) && (Xt = q ? 2 : 1, q || (A.isDragging = !0), ze(Y, R));
      }
    }, Be = A.onPress = function(E) {
      Vt(E, 1) || E && E.button || (A.axis = ke = null, Ft.pause(), A.isPressed = !0, E = Ls(E), Ht = je = 0, A.startX = A.x = E.clientX, A.startY = A.y = E.clientY, A._vx.reset(), A._vy.reset(), ti(nt ? a : At, Vi[1], Oi, Re, !0), A.deltaX = A.deltaY = 0, x && x(A));
    }, at = A.onRelease = function(E) {
      if (!Vt(E, 1)) {
        Je(nt ? a : At, Vi[1], Oi, !0);
        var P = !isNaN(A.y - A.startY), H = A.isDragging, I = H && (Math.abs(A.x - A.startX) > 3 || Math.abs(A.y - A.startY) > 3), Y = Ls(E);
        !I && P && (A._vx.reset(), A._vy.reset(), u && Dt && Fe.delayedCall(0.08, function() {
          if (so() - $e > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (At.createEvent) {
              var R = At.createEvent("MouseEvents");
              R.initMouseEvent("click", !0, !0, xi, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(R);
            }
          }
        })), A.isDragging = A.isGesturing = A.isPressed = !1, d && H && !nt && Ft.restart(!0), Xt && ai(), C && H && C(A), S && S(A, I);
      }
    }, Ye = function(P) {
      return P.touches && P.touches.length > 1 && (A.isGesturing = !0) && ot(P, A.isDragging);
    }, Nt = function() {
      return (A.isGesturing = !1) || b(A);
    }, Ie = function(P) {
      if (!Vt(P)) {
        var H = Rt(), I = zt();
        be((H - de) * Gt, (I - Ze) * Gt, 1), de = H, Ze = I, d && Ft.restart(!0);
      }
    }, ne = function(P) {
      if (!Vt(P)) {
        P = Ls(P, u), J && (pt = !0);
        var H = (P.deltaMode === 1 ? h : P.deltaMode === 2 ? xi.innerHeight : 1) * g;
        be(P.deltaX * H, P.deltaY * H, 0), d && !nt && Ft.restart(!0);
      }
    }, Ai = function(P) {
      if (!Vt(P)) {
        var H = P.clientX, I = P.clientY, Y = H - A.x, R = I - A.y;
        A.x = H, A.y = I, ft = !0, d && Ft.restart(!0), (Y || R) && ze(Y, R);
      }
    }, j = function(P) {
      A.event = P, Q(A);
    }, y = function(P) {
      A.event = P, et(A);
    }, $ = function(P) {
      return Vt(P) || Ls(P, u) && st(A);
    };
    Ft = A._dc = Fe.delayedCall(f || 0.25, Ji).pause(), A.deltaX = A.deltaY = 0, A._vx = gh(0, 50, !0), A._vy = gh(0, 50, !0), A.scrollX = Rt, A.scrollY = zt, A.isDragging = A.isGesturing = A.isPressed = !1, Cf(this), A.enable = function(E) {
      return A.isEnabled || (ti(ae ? At : a, "scroll", ph), o.indexOf("scroll") >= 0 && ti(ae ? At : a, "scroll", Ie, Re, Tt), o.indexOf("wheel") >= 0 && ti(a, "wheel", ne, Re, Tt), (o.indexOf("touch") >= 0 && Sf || o.indexOf("pointer") >= 0) && (ti(a, Vi[0], Be, Re, Tt), ti(At, Vi[2], at), ti(At, Vi[3], at), Dt && ti(a, "click", Qi, !0, !0), st && ti(a, "click", $), ot && ti(At, "gesturestart", Ye), b && ti(At, "gestureend", Nt), Q && ti(a, an + "enter", j), et && ti(a, an + "leave", y), X && ti(a, an + "move", Ai)), A.isEnabled = !0, A.isDragging = A.isGesturing = A.isPressed = ft = Xt = !1, A._vx.reset(), A._vy.reset(), de = Rt(), Ze = zt(), E && E.type && Be(E), rt && rt(A)), A;
    }, A.disable = function() {
      A.isEnabled && (ts.filter(function(E) {
        return E !== A && oo(E.target);
      }).length || Je(ae ? At : a, "scroll", ph), A.isPressed && (A._vx.reset(), A._vy.reset(), Je(nt ? a : At, Vi[1], Oi, !0)), Je(ae ? At : a, "scroll", Ie, Tt), Je(a, "wheel", ne, Tt), Je(a, Vi[0], Be, Tt), Je(At, Vi[2], at), Je(At, Vi[3], at), Je(a, "click", Qi, !0), Je(a, "click", $), Je(At, "gesturestart", Ye), Je(At, "gestureend", Nt), Je(a, an + "enter", j), Je(a, an + "leave", y), Je(a, an + "move", Ai), A.isEnabled = A.isPressed = A.isDragging = !1, G && G(A));
    }, A.kill = A.revert = function() {
      A.disable();
      var E = ts.indexOf(A);
      E >= 0 && ts.splice(E, 1), Er === A && (Er = 0);
    }, ts.push(A), nt && oo(a) && (Er = A), A.enable(p);
  }, __(s, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), s;
}();
ue.version = "3.13.0";
ue.create = function(s) {
  return new ue(s);
};
ue.register = kf;
ue.getAll = function() {
  return ts.slice();
};
ue.getById = function(s) {
  return ts.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
Pf() && Fe.registerPlugin(ue);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Xe, If, Cr, or, Vr, Mf, us, ra, Lf = function() {
  return typeof window < "u";
}, Df = function() {
  return Xe || Lf() && (Xe = window.gsap) && Xe.registerPlugin && Xe;
}, Rf = function(t) {
  return typeof t == "string";
}, wu = function(t) {
  return typeof t == "function";
}, Oo = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return t === Cr || t === or || t === Vr ? Math.max(or[r], Vr[r]) - (Cr["inner" + i] || or[n] || Vr[n]) : t[r] - t["offset" + i];
}, Ao = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === Cr && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = or[i] != null ? or : Vr), function() {
    return t[i];
  };
}, w_ = function(t, e, i, r) {
  if (wu(t) && (t = t(e, i, r)), typeof t != "object")
    return Rf(t) && t !== "max" && t.charAt(1) !== "=" ? {
      x: t,
      y: t
    } : {
      y: t
    };
  if (t.nodeType)
    return {
      y: t,
      x: t
    };
  var n = {}, o;
  for (o in t)
    n[o] = o !== "onAutoKill" && wu(t[o]) ? t[o](e, i, r) : t[o];
  return n;
}, Nf = function(t, e) {
  if (t = Mf(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), r = !e || e === Cr || e === Vr, n = r ? {
    top: or.clientTop - (Cr.pageYOffset || or.scrollTop || Vr.scrollTop || 0),
    left: or.clientLeft - (Cr.pageXOffset || or.scrollLeft || Vr.scrollLeft || 0)
  } : e.getBoundingClientRect(), o = {
    x: i.left - n.left,
    y: i.top - n.top
  };
  return !r && e && (o.x += Ao(e, "x")(), o.y += Ao(e, "y")()), o;
}, bu = function(t, e, i, r, n) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - n : Rf(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + r - n : t === "max" ? Oo(e, i) - n : Math.min(Oo(e, i), Nf(t, e)[i] - n);
}, mh = function() {
  Xe = Df(), Lf() && Xe && typeof document < "u" && document.body && (Cr = window, Vr = document.body, or = document.documentElement, Mf = Xe.utils.toArray, Xe.config({
    autoKillThreshold: 7
  }), us = Xe.config(), If = 1);
}, zn = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    Xe = t, mh();
  },
  init: function(t, e, i, r, n) {
    If || mh();
    var o = this, a = Xe.getProperty(t, "scrollSnapType");
    o.isWin = t === Cr, o.target = t, o.tween = i, e = w_(e, r, t, n), o.vars = e, o.autoKill = !!("autoKill" in e ? e : us).autoKill, o.getX = Ao(t, "x"), o.getY = Ao(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), ra || (ra = Xe.core.globals().ScrollTrigger), Xe.getProperty(t, "scrollBehavior") === "smooth" && Xe.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, bu(e.x, t, "x", o.x, e.offsetX || 0), r, n), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, bu(e.y, t, "y", o.y, e.offsetY || 0), r, n), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, r = e.target, n = e.tween, o = e.autoKill, a = e.xPrev, h = e.yPrev, c = e.isWin, u = e.snap, d = e.snapInline, f, l, g, p, _; i; )
      i.r(t, i.d), i = i._next;
    f = c || !e.skipX ? e.getX() : a, l = c || !e.skipY ? e.getY() : h, g = l - h, p = f - a, _ = us.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > _ || p < -_) && f < Oo(r, "x") && (e.skipX = 1), !e.skipY && (g > _ || g < -_) && l < Oo(r, "y") && (e.skipY = 1), e.skipX && e.skipY && (n.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(n, e.vars.onAutoKillParams || []))), c ? Cr.scrollTo(e.skipX ? f : e.x, e.skipY ? l : e.y) : (e.skipY || (r.scrollTop = e.y), e.skipX || (r.scrollLeft = e.x)), u && (t === 1 || t === 0) && (l = r.scrollTop, f = r.scrollLeft, d ? r.style.scrollSnapType = d : r.style.removeProperty("scroll-snap-type"), r.scrollTop = l + 1, r.scrollLeft = f + 1, r.scrollTop = l, r.scrollLeft = f), e.xPrev = e.x, e.yPrev = e.y, ra && ra.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
zn.max = Oo;
zn.getOffset = Nf;
zn.buildGetter = Ao;
zn.config = function(s) {
  us || mh() || (us = Xe.config());
  for (var t in s)
    us[t] = s[t];
};
Df() && Xe.registerPlugin(zn);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var K, Kn, yt, Wt, wi, Lt, fc, Ya, ko, ao, Us, na, We, sl, _h, ii, Tu, xu, jn, zf, Rl, Ff, ei, vh, Hf, $f, Rr, yh, pc, ds, gc, Wa, wh, Nl, sa = 1, Ue = Date.now, zl = Ue(), Hi = 0, qs = 0, Su = function(t, e, i) {
  var r = vi(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Eu = function(t, e) {
  return e && (!vi(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, b_ = function s() {
  return qs && requestAnimationFrame(s);
}, Cu = function() {
  return sl = 1;
}, Pu = function() {
  return sl = 0;
}, er = function(t) {
  return t;
}, Xs = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Bf = function() {
  return typeof window < "u";
}, Yf = function() {
  return K || Bf() && (K = window.gsap) && K.registerPlugin && K;
}, kn = function(t) {
  return !!~fc.indexOf(t);
}, Wf = function(t) {
  return (t === "Height" ? gc : yt["inner" + t]) || wi["client" + t] || Lt["client" + t];
}, Uf = function(t) {
  return Xr(t, "getBoundingClientRect") || (kn(t) ? function() {
    return Aa.width = yt.innerWidth, Aa.height = gc, Aa;
  } : function() {
    return Tr(t);
  });
}, T_ = function(t, e, i) {
  var r = i.d, n = i.d2, o = i.a;
  return (o = Xr(t, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (e ? Wf(n) : t["client" + n]) || 0;
  };
}, x_ = function(t, e) {
  return !e || ~cr.indexOf(t) ? Uf(t) : function() {
    return Aa;
  };
}, ar = function(t, e) {
  var i = e.s, r = e.d2, n = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + r) && (o = Xr(t, i)) ? o() - Uf(t)()[n] : kn(t) ? (wi[i] || Lt[i]) - Wf(r) : t[i] - t["offset" + r]);
}, oa = function(t, e) {
  for (var i = 0; i < jn.length; i += 3)
    (!e || ~e.indexOf(jn[i + 1])) && t(jn[i], jn[i + 1], jn[i + 2]);
}, vi = function(t) {
  return typeof t == "string";
}, Ve = function(t) {
  return typeof t == "function";
}, Vs = function(t) {
  return typeof t == "number";
}, ln = function(t) {
  return typeof t == "object";
}, Ds = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, Fl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, qn = Math.abs, qf = "left", Xf = "top", mc = "right", _c = "bottom", xn = "width", Sn = "height", lo = "Right", ho = "Left", co = "Top", uo = "Bottom", _e = "padding", Ri = "margin", Ss = "Width", vc = "Height", Ee = "px", Ni = function(t) {
  return yt.getComputedStyle(t);
}, S_ = function(t) {
  var e = Ni(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, Ou = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Tr = function(t, e) {
  var i = e && Ni(t)[_h] !== "matrix(1, 0, 0, 1, 0, 0)" && K.to(t, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = t.getBoundingClientRect();
  return i && i.progress(0).kill(), r;
}, Ua = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, Vf = function(t) {
  var e = [], i = t.labels, r = t.duration(), n;
  for (n in i)
    e.push(i[n] / r);
  return e;
}, E_ = function(t) {
  return function(e) {
    return K.utils.snap(Vf(t), e);
  };
}, yc = function(t) {
  var e = K.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return i ? function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var a;
    if (!n)
      return e(r);
    if (n > 0) {
      for (r -= o, a = 0; a < i.length; a++)
        if (i[a] >= r)
          return i[a];
      return i[a - 1];
    } else
      for (a = i.length, r += o; a--; )
        if (i[a] <= r)
          return i[a];
    return i[0];
  } : function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var a = e(r);
    return !n || Math.abs(a - r) < o || a - r < 0 == n < 0 ? a : e(n < 0 ? r - t : r + t);
  };
}, C_ = function(t) {
  return function(e, i) {
    return yc(Vf(t))(e, i.direction);
  };
}, aa = function(t, e, i, r) {
  return i.split(",").forEach(function(n) {
    return t(e, n, r);
  });
}, Le = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: !r,
    capture: !!n
  });
}, Me = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, la = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Au = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, ha = {
  toggleActions: "play",
  anticipatePin: 0
}, qa = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Ea = function(t, e) {
  if (vi(t)) {
    var i = t.indexOf("="), r = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (r *= e / 100), t = t.substr(0, i - 1)), t = r + (t in qa ? qa[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, ca = function(t, e, i, r, n, o, a, h) {
  var c = n.startColor, u = n.endColor, d = n.fontSize, f = n.indent, l = n.fontWeight, g = Wt.createElement("div"), p = kn(i) || Xr(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, C = p ? Lt : i, v = t.indexOf("start") !== -1, x = v ? c : u, S = "border-color:" + x + ";font-size:" + d + ";color:" + x + ";font-weight:" + l + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return S += "position:" + ((_ || h) && p ? "fixed;" : "absolute;"), (_ || h || !p) && (S += (r === Ae ? mc : _c) + ":" + (o + parseFloat(f)) + "px;"), a && (S += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = v, g.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), g.style.cssText = S, g.innerText = e || e === 0 ? t + "-" + e : t, C.children[0] ? C.insertBefore(g, C.children[0]) : C.appendChild(g), g._offset = g["offset" + r.op.d2], Ca(g, 0, r, v), g;
}, Ca = function(t, e, i, r) {
  var n = {
    display: "block"
  }, o = i[r ? "os2" : "p2"], a = i[r ? "p2" : "os2"];
  t._isFlipped = r, n[i.a + "Percent"] = r ? -100 : 0, n[i.a] = r ? "1px" : 0, n["border" + o + Ss] = 1, n["border" + a + Ss] = 0, n[i.p] = e + "px", K.set(t, n);
}, vt = [], bh = {}, Io, ku = function() {
  return Ue() - Hi > 34 && (Io || (Io = requestAnimationFrame(Pr)));
}, Xn = function() {
  (!ei || !ei.isPressed || ei.startX > Lt.clientWidth) && (wt.cache++, ei ? Io || (Io = requestAnimationFrame(Pr)) : Pr(), Hi || Mn("scrollStart"), Hi = Ue());
}, Hl = function() {
  $f = yt.innerWidth, Hf = yt.innerHeight;
}, Gs = function(t) {
  wt.cache++, (t === !0 || !We && !Ff && !Wt.fullscreenElement && !Wt.webkitFullscreenElement && (!vh || $f !== yt.innerWidth || Math.abs(yt.innerHeight - Hf) > yt.innerHeight * 0.25)) && Ya.restart(!0);
}, In = {}, P_ = [], Gf = function s() {
  return Me(bt, "scrollEnd", s) || un(!0);
}, Mn = function(t) {
  return In[t] && In[t].map(function(e) {
    return e();
  }) || P_;
}, _i = [], Kf = function(t) {
  for (var e = 0; e < _i.length; e += 5)
    (!t || _i[e + 4] && _i[e + 4].query === t) && (_i[e].style.cssText = _i[e + 1], _i[e].getBBox && _i[e].setAttribute("transform", _i[e + 2] || ""), _i[e + 3].uncache = 1);
}, wc = function(t, e) {
  var i;
  for (ii = 0; ii < vt.length; ii++)
    i = vt[ii], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  Wa = !0, e && Kf(e), e || Mn("revert");
}, jf = function(t, e) {
  wt.cache++, (e || !ri) && wt.forEach(function(i) {
    return Ve(i) && i.cacheID++ && (i.rec = 0);
  }), vi(t) && (yt.history.scrollRestoration = pc = t);
}, ri, En = 0, Iu, O_ = function() {
  if (Iu !== En) {
    var t = Iu = En;
    requestAnimationFrame(function() {
      return t === En && un(!0);
    });
  }
}, Zf = function() {
  Lt.appendChild(ds), gc = !ei && ds.offsetHeight || yt.innerHeight, Lt.removeChild(ds);
}, Mu = function(t) {
  return ko(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, un = function(t, e) {
  if (wi = Wt.documentElement, Lt = Wt.body, fc = [yt, Wt, wi, Lt], Hi && !t && !Wa) {
    Le(bt, "scrollEnd", Gf);
    return;
  }
  Zf(), ri = bt.isRefreshing = !0, wt.forEach(function(r) {
    return Ve(r) && ++r.cacheID && (r.rec = r());
  });
  var i = Mn("refreshInit");
  zf && bt.sort(), e || wc(), wt.forEach(function(r) {
    Ve(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), vt.slice(0).forEach(function(r) {
    return r.refresh();
  }), Wa = !1, vt.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[n];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[n] - o), r.refresh();
    }
  }), wh = 1, Mu(!0), vt.forEach(function(r) {
    var n = ar(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > n, a = r._startClamp && r.start >= n;
    (o || a) && r.setPositions(a ? n - 1 : r.start, o ? Math.max(a ? n : r.start + 1, n) : r.end, !0);
  }), Mu(!1), wh = 0, i.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), wt.forEach(function(r) {
    Ve(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), jf(pc, 1), Ya.pause(), En++, ri = 2, Pr(2), vt.forEach(function(r) {
    return Ve(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), ri = bt.isRefreshing = !1, Mn("refresh");
}, Th = 0, Pa = 1, fo, Pr = function(t) {
  if (t === 2 || !ri && !Wa) {
    bt.isUpdating = !0, fo && fo.update(0);
    var e = vt.length, i = Ue(), r = i - zl >= 50, n = e && vt[0].scroll();
    if (Pa = Th > n ? -1 : 1, ri || (Th = n), r && (Hi && !sl && i - Hi > 200 && (Hi = 0, Mn("scrollEnd")), Us = zl, zl = i), Pa < 0) {
      for (ii = e; ii-- > 0; )
        vt[ii] && vt[ii].update(0, r);
      Pa = 1;
    } else
      for (ii = 0; ii < e; ii++)
        vt[ii] && vt[ii].update(0, r);
    bt.isUpdating = !1;
  }
  Io = 0;
}, xh = [qf, Xf, _c, mc, Ri + uo, Ri + lo, Ri + co, Ri + ho, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Oa = xh.concat([xn, Sn, "boxSizing", "max" + Ss, "max" + vc, "position", Ri, _e, _e + co, _e + lo, _e + uo, _e + ho]), A_ = function(t, e, i) {
  fs(i);
  var r = t._gsap;
  if (r.spacerIsNative)
    fs(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = e.parentNode;
    n && (n.insertBefore(t, e), n.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, $l = function(t, e, i, r) {
  if (!t._gsap.swappedIn) {
    for (var n = xh.length, o = e.style, a = t.style, h; n--; )
      h = xh[n], o[h] = i[h];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[_c] = a[mc] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[xn] = Ua(t, si) + Ee, o[Sn] = Ua(t, Ae) + Ee, o[_e] = a[Ri] = a[Xf] = a[qf] = "0", fs(r), a[xn] = a["max" + Ss] = i[xn], a[Sn] = a["max" + vc] = i[Sn], a[_e] = i[_e], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, k_ = /([A-Z])/g, fs = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, r = 0, n, o;
    for ((t.t._gsap || K.core.getCache(t.t)).uncache = 1; r < i; r += 2)
      o = t[r + 1], n = t[r], o ? e[n] = o : e[n] && e.removeProperty(n.replace(k_, "-$1").toLowerCase());
  }
}, ua = function(t) {
  for (var e = Oa.length, i = t.style, r = [], n = 0; n < e; n++)
    r.push(Oa[n], i[Oa[n]]);
  return r.t = t, r;
}, I_ = function(t, e, i) {
  for (var r = [], n = t.length, o = i ? 8 : 0, a; o < n; o += 2)
    a = t[o], r.push(a, a in e ? e[a] : t[o + 1]);
  return r.t = t.t, r;
}, Aa = {
  left: 0,
  top: 0
}, Lu = function(t, e, i, r, n, o, a, h, c, u, d, f, l, g) {
  Ve(t) && (t = t(h)), vi(t) && t.substr(0, 3) === "max" && (t = f + (t.charAt(4) === "=" ? Ea("0" + t.substr(3), i) : 0));
  var p = l ? l.time() : 0, _, C, v;
  if (l && l.seek(0), isNaN(t) || (t = +t), Vs(t))
    l && (t = K.utils.mapRange(l.scrollTrigger.start, l.scrollTrigger.end, 0, f, t)), a && Ca(a, i, r, !0);
  else {
    Ve(e) && (e = e(h));
    var x = (t || "0").split(" "), S, w, M, O;
    v = hi(e, h) || Lt, S = Tr(v) || {}, (!S || !S.left && !S.top) && Ni(v).display === "none" && (O = v.style.display, v.style.display = "block", S = Tr(v), O ? v.style.display = O : v.style.removeProperty("display")), w = Ea(x[0], S[r.d]), M = Ea(x[1] || "0", i), t = S[r.p] - c[r.p] - u + w + n - M, a && Ca(a, M, r, i - M < 20 || a._isStart && M > 20), i -= i - M;
  }
  if (g && (h[g] = t || -1e-3, t < 0 && (t = 0)), o) {
    var k = t + i, D = o._isStart;
    _ = "scroll" + r.d2, Ca(o, k, r, D && k > 20 || !D && (d ? Math.max(Lt[_], wi[_]) : o.parentNode[_]) <= k + 1), d && (c = Tr(a), d && (o.style[r.op.p] = c[r.op.p] - r.op.m - o._offset + Ee));
  }
  return l && v && (_ = Tr(v), l.seek(f), C = Tr(v), l._caScrollDist = _[r.p] - C[r.p], t = t / l._caScrollDist * f), l && l.seek(p), l ? t : Math.round(t);
}, M_ = /(webkit|moz|length|cssText|inset)/i, Du = function(t, e, i, r) {
  if (t.parentNode !== e) {
    var n = t.style, o, a;
    if (e === Lt) {
      t._stOrig = n.cssText, a = Ni(t);
      for (o in a)
        !+o && !M_.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
      n.top = i, n.left = r;
    } else
      n.cssText = t._stOrig;
    K.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, Qf = function(t, e, i) {
  var r = e, n = r;
  return function(o) {
    var a = Math.round(t());
    return a !== r && a !== n && Math.abs(a - r) > 3 && Math.abs(a - n) > 3 && (o = a, i && i()), n = r, r = Math.round(o), r;
  };
}, da = function(t, e, i) {
  var r = {};
  r[e.p] = "+=" + i, K.set(t, r);
}, Ru = function(t, e) {
  var i = Qr(t, e), r = "_scroll" + e.p2, n = function o(a, h, c, u, d) {
    var f = o.tween, l = h.onComplete, g = {};
    c = c || i();
    var p = Qf(i, c, function() {
      f.kill(), o.tween = 0;
    });
    return d = u && d || 0, u = u || a - c, f && f.kill(), h[r] = a, h.inherit = !1, h.modifiers = g, g[r] = function() {
      return p(c + u * f.ratio + d * f.ratio * f.ratio);
    }, h.onUpdate = function() {
      wt.cache++, o.tween && Pr();
    }, h.onComplete = function() {
      o.tween = 0, l && l.call(f);
    }, f = o.tween = K.to(t, h), f;
  };
  return t[r] = i, i.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Le(t, "wheel", i.wheelHandler), bt.isTouch && Le(t, "touchmove", i.wheelHandler), n;
}, bt = /* @__PURE__ */ function() {
  function s(e, i) {
    Kn || s.register(K) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), yh(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !qs) {
      this.update = this.refresh = this.kill = er;
      return;
    }
    i = Ou(vi(i) || Vs(i) || i.nodeType ? {
      trigger: i
    } : i, ha);
    var n = i, o = n.onUpdate, a = n.toggleClass, h = n.id, c = n.onToggle, u = n.onRefresh, d = n.scrub, f = n.trigger, l = n.pin, g = n.pinSpacing, p = n.invalidateOnRefresh, _ = n.anticipatePin, C = n.onScrubComplete, v = n.onSnapComplete, x = n.once, S = n.snap, w = n.pinReparent, M = n.pinSpacer, O = n.containerAnimation, k = n.fastScrollEnd, D = n.preventOverlaps, z = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? si : Ae, W = !d && d !== 0, F = hi(i.scroller || yt), B = K.core.getCache(F), Q = kn(F), et = ("pinType" in i ? i.pinType : Xr(F, "pinType") || Q && "fixed") === "fixed", X = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], U = W && i.toggleActions.split(" "), nt = "markers" in i ? i.markers : ha.markers, ot = Q ? 0 : parseFloat(Ni(F)["border" + z.p2 + Ss]) || 0, b = this, J = i.onRefreshInit && function() {
      return i.onRefreshInit(b);
    }, rt = T_(F, Q, z), G = x_(F, Q), st = 0, Gt = 0, Tt = 0, Dt = Qr(F, z), gt, ee, oe, Ft, Xt, ft, pt, lt, ke, A, Ht, je, Re, Rt, zt, de, Ze, Kt, ae, At, fe, Ne, $e, Qi, Vt, Ji, ai, be, ze, Oi, Be, at, Ye, Nt, Ie, ne, Ai, j, y;
    if (b._startClamp = b._endClamp = !1, b._dir = z, _ *= 45, b.scroller = F, b.scroll = O ? O.time.bind(O) : Dt, Ft = Dt(), b.vars = i, r = r || i.animation, "refreshPriority" in i && (zf = 1, i.refreshPriority === -9999 && (fo = b)), B.tweenScroll = B.tweenScroll || {
      top: Ru(F, Ae),
      left: Ru(F, si)
    }, b.tweenTo = gt = B.tweenScroll[z.p], b.scrubDuration = function(I) {
      Ye = Vs(I) && I, Ye ? at ? at.duration(I) : at = K.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Ye,
        paused: !0,
        onComplete: function() {
          return C && C(b);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, r && (r.vars.lazy = !1, r._initted && !b.isReverted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), b.animation = r.pause(), r.scrollTrigger = b, b.scrubDuration(d), Oi = 0, h || (h = r.vars.id)), S && ((!ln(S) || S.push) && (S = {
      snapTo: S
    }), "scrollBehavior" in Lt.style && K.set(Q ? [Lt, wi] : F, {
      scrollBehavior: "auto"
    }), wt.forEach(function(I) {
      return Ve(I) && I.target === (Q ? Wt.scrollingElement || wi : F) && (I.smooth = !1);
    }), oe = Ve(S.snapTo) ? S.snapTo : S.snapTo === "labels" ? E_(r) : S.snapTo === "labelsDirectional" ? C_(r) : S.directional !== !1 ? function(I, Y) {
      return yc(S.snapTo)(I, Ue() - Gt < 500 ? 0 : Y.direction);
    } : K.utils.snap(S.snapTo), Nt = S.duration || {
      min: 0.1,
      max: 2
    }, Nt = ln(Nt) ? ao(Nt.min, Nt.max) : ao(Nt, Nt), Ie = K.delayedCall(S.delay || Ye / 2 || 0.1, function() {
      var I = Dt(), Y = Ue() - Gt < 500, R = gt.tween;
      if ((Y || Math.abs(b.getVelocity()) < 10) && !R && !sl && st !== I) {
        var q = (I - ft) / Rt, tt = r && !W ? r.totalProgress() : q, V = Y ? 0 : (tt - Be) / (Ue() - Us) * 1e3 || 0, ct = K.utils.clamp(-q, 1 - q, qn(V / 2) * V / 0.185), xt = q + (S.inertia === !1 ? 0 : ct), Ot, _t, dt = S, kt = dt.onStart, ht = dt.onInterrupt, Te = dt.onComplete;
        if (Ot = oe(xt, b), Vs(Ot) || (Ot = xt), _t = Math.max(0, Math.round(ft + Ot * Rt)), I <= pt && I >= ft && _t !== I) {
          if (R && !R._initted && R.data <= qn(_t - I))
            return;
          S.inertia === !1 && (ct = Ot - q), gt(_t, {
            duration: Nt(qn(Math.max(qn(xt - tt), qn(Ot - tt)) * 0.185 / V / 0.05 || 0)),
            ease: S.ease || "power3",
            data: qn(_t - I),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ie.restart(!0) && ht && ht(b);
            },
            onComplete: function() {
              b.update(), st = Dt(), r && !W && (at ? at.resetTo("totalProgress", Ot, r._tTime / r._tDur) : r.progress(Ot)), Oi = Be = r && !W ? r.totalProgress() : b.progress, v && v(b), Te && Te(b);
            }
          }, I, ct * Rt, _t - I - ct * Rt), kt && kt(b, gt.tween);
        }
      } else b.isActive && st !== I && Ie.restart(!0);
    }).pause()), h && (bh[h] = b), f = b.trigger = hi(f || l !== !0 && l), y = f && f._gsap && f._gsap.stRevert, y && (y = y(b)), l = l === !0 ? f : hi(l), vi(a) && (a = {
      targets: f,
      className: a
    }), l && (g === !1 || g === Ri || (g = !g && l.parentNode && l.parentNode.style && Ni(l.parentNode).display === "flex" ? !1 : _e), b.pin = l, ee = K.core.getCache(l), ee.spacer ? zt = ee.pinState : (M && (M = hi(M), M && !M.nodeType && (M = M.current || M.nativeElement), ee.spacerIsNative = !!M, M && (ee.spacerState = ua(M))), ee.spacer = Kt = M || Wt.createElement("div"), Kt.classList.add("pin-spacer"), h && Kt.classList.add("pin-spacer-" + h), ee.pinState = zt = ua(l)), i.force3D !== !1 && K.set(l, {
      force3D: !0
    }), b.spacer = Kt = ee.spacer, ze = Ni(l), Qi = ze[g + z.os2], At = K.getProperty(l), fe = K.quickSetter(l, z.a, Ee), $l(l, Kt, ze), Ze = ua(l)), nt) {
      je = ln(nt) ? Ou(nt, Au) : Au, A = ca("scroller-start", h, F, z, je, 0), Ht = ca("scroller-end", h, F, z, je, 0, A), ae = A["offset" + z.op.d2];
      var $ = hi(Xr(F, "content") || F);
      lt = this.markerStart = ca("start", h, $, z, je, ae, 0, O), ke = this.markerEnd = ca("end", h, $, z, je, ae, 0, O), O && (j = K.quickSetter([lt, ke], z.a, Ee)), !et && !(cr.length && Xr(F, "fixedMarkers") === !0) && (S_(Q ? Lt : F), K.set([A, Ht], {
        force3D: !0
      }), Ji = K.quickSetter(A, z.a, Ee), be = K.quickSetter(Ht, z.a, Ee));
    }
    if (O) {
      var E = O.vars.onUpdate, P = O.vars.onUpdateParams;
      O.eventCallback("onUpdate", function() {
        b.update(0, 0, 1), E && E.apply(O, P || []);
      });
    }
    if (b.previous = function() {
      return vt[vt.indexOf(b) - 1];
    }, b.next = function() {
      return vt[vt.indexOf(b) + 1];
    }, b.revert = function(I, Y) {
      if (!Y)
        return b.kill(!0);
      var R = I !== !1 || !b.enabled, q = We;
      R !== b.isReverted && (R && (ne = Math.max(Dt(), b.scroll.rec || 0), Tt = b.progress, Ai = r && r.progress()), lt && [lt, ke, A, Ht].forEach(function(tt) {
        return tt.style.display = R ? "none" : "block";
      }), R && (We = b, b.update(R)), l && (!w || !b.isActive) && (R ? A_(l, Kt, zt) : $l(l, Kt, Ni(l), Vt)), R || b.update(R), We = q, b.isReverted = R);
    }, b.refresh = function(I, Y, R, q) {
      if (!((We || !b.enabled) && !Y)) {
        if (l && I && Hi) {
          Le(s, "scrollEnd", Gf);
          return;
        }
        !ri && J && J(b), We = b, gt.tween && !R && (gt.tween.kill(), gt.tween = 0), at && at.pause(), p && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren && r.getChildren(!0, !0, !1).forEach(function(Ui) {
          return Ui.vars.immediateRender && Ui.render(0, !0, !0);
        })), b.isReverted || b.revert(!0, !0), b._subPinOffset = !1;
        var tt = rt(), V = G(), ct = O ? O.duration() : ar(F, z), xt = Rt <= 0.01 || !Rt, Ot = 0, _t = q || 0, dt = ln(R) ? R.end : i.end, kt = i.endTrigger || f, ht = ln(R) ? R.start : i.start || (i.start === 0 || !f ? 0 : l ? "0 0" : "0 100%"), Te = b.pinnedContainer = i.pinnedContainer && hi(i.pinnedContainer, b), jt = f && Math.max(0, vt.indexOf(b)) || 0, xe = jt, Se, pe, fr, pr, ge, le, Qe, Hn, Ko, en, ki, gr, $n;
        for (nt && ln(R) && (gr = K.getProperty(A, z.p), $n = K.getProperty(Ht, z.p)); xe-- > 0; )
          le = vt[xe], le.end || le.refresh(0, 1) || (We = b), Qe = le.pin, Qe && (Qe === f || Qe === l || Qe === Te) && !le.isReverted && (en || (en = []), en.unshift(le), le.revert(!0, !0)), le !== vt[xe] && (jt--, xe--);
        for (Ve(ht) && (ht = ht(b)), ht = Su(ht, "start", b), ft = Lu(ht, f, tt, z, Dt(), lt, A, b, V, ot, et, ct, O, b._startClamp && "_startClamp") || (l ? -1e-3 : 0), Ve(dt) && (dt = dt(b)), vi(dt) && !dt.indexOf("+=") && (~dt.indexOf(" ") ? dt = (vi(ht) ? ht.split(" ")[0] : "") + dt : (Ot = Ea(dt.substr(2), tt), dt = vi(ht) ? ht : (O ? K.utils.mapRange(0, O.duration(), O.scrollTrigger.start, O.scrollTrigger.end, ft) : ft) + Ot, kt = f)), dt = Su(dt, "end", b), pt = Math.max(ft, Lu(dt || (kt ? "100% 0" : ct), kt, tt, z, Dt() + Ot, ke, Ht, b, V, ot, et, ct, O, b._endClamp && "_endClamp")) || -1e-3, Ot = 0, xe = jt; xe--; )
          le = vt[xe], Qe = le.pin, Qe && le.start - le._pinPush <= ft && !O && le.end > 0 && (Se = le.end - (b._startClamp ? Math.max(0, le.start) : le.start), (Qe === f && le.start - le._pinPush < ft || Qe === Te) && isNaN(ht) && (Ot += Se * (1 - le.progress)), Qe === l && (_t += Se));
        if (ft += Ot, pt += Ot, b._startClamp && (b._startClamp += Ot), b._endClamp && !ri && (b._endClamp = pt || -1e-3, pt = Math.min(pt, ar(F, z))), Rt = pt - ft || (ft -= 0.01) && 1e-3, xt && (Tt = K.utils.clamp(0, 1, K.utils.normalize(ft, pt, ne))), b._pinPush = _t, lt && Ot && (Se = {}, Se[z.a] = "+=" + Ot, Te && (Se[z.p] = "-=" + Dt()), K.set([lt, ke], Se)), l && !(wh && b.end >= ar(F, z)))
          Se = Ni(l), pr = z === Ae, fr = Dt(), Ne = parseFloat(At(z.a)) + _t, !ct && pt > 1 && (ki = (Q ? Wt.scrollingElement || wi : F).style, ki = {
            style: ki,
            value: ki["overflow" + z.a.toUpperCase()]
          }, Q && Ni(Lt)["overflow" + z.a.toUpperCase()] !== "scroll" && (ki.style["overflow" + z.a.toUpperCase()] = "scroll")), $l(l, Kt, Se), Ze = ua(l), pe = Tr(l, !0), Hn = et && Qr(F, pr ? si : Ae)(), g ? (Vt = [g + z.os2, Rt + _t + Ee], Vt.t = Kt, xe = g === _e ? Ua(l, z) + Rt + _t : 0, xe && (Vt.push(z.d, xe + Ee), Kt.style.flexBasis !== "auto" && (Kt.style.flexBasis = xe + Ee)), fs(Vt), Te && vt.forEach(function(Ui) {
            Ui.pin === Te && Ui.vars.pinSpacing !== !1 && (Ui._subPinOffset = !0);
          }), et && Dt(ne)) : (xe = Ua(l, z), xe && Kt.style.flexBasis !== "auto" && (Kt.style.flexBasis = xe + Ee)), et && (ge = {
            top: pe.top + (pr ? fr - ft : Hn) + Ee,
            left: pe.left + (pr ? Hn : fr - ft) + Ee,
            boxSizing: "border-box",
            position: "fixed"
          }, ge[xn] = ge["max" + Ss] = Math.ceil(pe.width) + Ee, ge[Sn] = ge["max" + vc] = Math.ceil(pe.height) + Ee, ge[Ri] = ge[Ri + co] = ge[Ri + lo] = ge[Ri + uo] = ge[Ri + ho] = "0", ge[_e] = Se[_e], ge[_e + co] = Se[_e + co], ge[_e + lo] = Se[_e + lo], ge[_e + uo] = Se[_e + uo], ge[_e + ho] = Se[_e + ho], de = I_(zt, ge, w), ri && Dt(0)), r ? (Ko = r._initted, Rl(1), r.render(r.duration(), !0, !0), $e = At(z.a) - Ne + Rt + _t, ai = Math.abs(Rt - $e) > 1, et && ai && de.splice(de.length - 2, 2), r.render(0, !0, !0), Ko || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), Rl(0)) : $e = Rt, ki && (ki.value ? ki.style["overflow" + z.a.toUpperCase()] = ki.value : ki.style.removeProperty("overflow-" + z.a));
        else if (f && Dt() && !O)
          for (pe = f.parentNode; pe && pe !== Lt; )
            pe._pinOffset && (ft -= pe._pinOffset, pt -= pe._pinOffset), pe = pe.parentNode;
        en && en.forEach(function(Ui) {
          return Ui.revert(!1, !0);
        }), b.start = ft, b.end = pt, Ft = Xt = ri ? ne : Dt(), !O && !ri && (Ft < ne && Dt(ne), b.scroll.rec = 0), b.revert(!1, !0), Gt = Ue(), Ie && (st = -1, Ie.restart(!0)), We = 0, r && W && (r._initted || Ai) && r.progress() !== Ai && r.progress(Ai || 0, !0).render(r.time(), !0, !0), (xt || Tt !== b.progress || O || p || r && !r._initted) && (r && !W && (r._initted || Tt || r.vars.immediateRender !== !1) && r.totalProgress(O && ft < -1e-3 && !Tt ? K.utils.normalize(ft, pt, 0) : Tt, !0), b.progress = xt || (Ft - ft) / Rt === Tt ? 0 : Tt), l && g && (Kt._pinOffset = Math.round(b.progress * $e)), at && at.invalidate(), isNaN(gr) || (gr -= K.getProperty(A, z.p), $n -= K.getProperty(Ht, z.p), da(A, z, gr), da(lt, z, gr - (q || 0)), da(Ht, z, $n), da(ke, z, $n - (q || 0))), xt && !ri && b.update(), u && !ri && !Re && (Re = !0, u(b), Re = !1);
      }
    }, b.getVelocity = function() {
      return (Dt() - Xt) / (Ue() - Us) * 1e3 || 0;
    }, b.endAnimation = function() {
      Ds(b.callbackAnimation), r && (at ? at.progress(1) : r.paused() ? W || Ds(r, b.direction < 0, 1) : Ds(r, r.reversed()));
    }, b.labelToScroll = function(I) {
      return r && r.labels && (ft || b.refresh() || ft) + r.labels[I] / r.duration() * Rt || 0;
    }, b.getTrailing = function(I) {
      var Y = vt.indexOf(b), R = b.direction > 0 ? vt.slice(0, Y).reverse() : vt.slice(Y + 1);
      return (vi(I) ? R.filter(function(q) {
        return q.vars.preventOverlaps === I;
      }) : R).filter(function(q) {
        return b.direction > 0 ? q.end <= ft : q.start >= pt;
      });
    }, b.update = function(I, Y, R) {
      if (!(O && !R && !I)) {
        var q = ri === !0 ? ne : b.scroll(), tt = I ? 0 : (q - ft) / Rt, V = tt < 0 ? 0 : tt > 1 ? 1 : tt || 0, ct = b.progress, xt, Ot, _t, dt, kt, ht, Te, jt;
        if (Y && (Xt = Ft, Ft = O ? Dt() : q, S && (Be = Oi, Oi = r && !W ? r.totalProgress() : V)), _ && l && !We && !sa && Hi && (!V && ft < q + (q - Xt) / (Ue() - Us) * _ ? V = 1e-4 : V === 1 && pt > q + (q - Xt) / (Ue() - Us) * _ && (V = 0.9999)), V !== ct && b.enabled) {
          if (xt = b.isActive = !!V && V < 1, Ot = !!ct && ct < 1, ht = xt !== Ot, kt = ht || !!V != !!ct, b.direction = V > ct ? 1 : -1, b.progress = V, kt && !We && (_t = V && !ct ? 0 : V === 1 ? 1 : ct === 1 ? 2 : 3, W && (dt = !ht && U[_t + 1] !== "none" && U[_t + 1] || U[_t], jt = r && (dt === "complete" || dt === "reset" || dt in r))), D && (ht || jt) && (jt || d || !r) && (Ve(D) ? D(b) : b.getTrailing(D).forEach(function(fr) {
            return fr.endAnimation();
          })), W || (at && !We && !sa ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", V, r._tTime / r._tDur) : (at.vars.totalProgress = V, at.invalidate().restart())) : r && r.totalProgress(V, !!(We && (Gt || I)))), l) {
            if (I && g && (Kt.style[g + z.os2] = Qi), !et)
              fe(Xs(Ne + $e * V));
            else if (kt) {
              if (Te = !I && V > ct && pt + 1 > q && q + 1 >= ar(F, z), w)
                if (!I && (xt || Te)) {
                  var xe = Tr(l, !0), Se = q - ft;
                  Du(l, Lt, xe.top + (z === Ae ? Se : 0) + Ee, xe.left + (z === Ae ? 0 : Se) + Ee);
                } else
                  Du(l, Kt);
              fs(xt || Te ? de : Ze), ai && V < 1 && xt || fe(Ne + (V === 1 && !Te ? $e : 0));
            }
          }
          S && !gt.tween && !We && !sa && Ie.restart(!0), a && (ht || x && V && (V < 1 || !Nl)) && ko(a.targets).forEach(function(fr) {
            return fr.classList[xt || x ? "add" : "remove"](a.className);
          }), o && !W && !I && o(b), kt && !We ? (W && (jt && (dt === "complete" ? r.pause().totalProgress(1) : dt === "reset" ? r.restart(!0).pause() : dt === "restart" ? r.restart(!0) : r[dt]()), o && o(b)), (ht || !Nl) && (c && ht && Fl(b, c), X[_t] && Fl(b, X[_t]), x && (V === 1 ? b.kill(!1, 1) : X[_t] = 0), ht || (_t = V === 1 ? 1 : 3, X[_t] && Fl(b, X[_t]))), k && !xt && Math.abs(b.getVelocity()) > (Vs(k) ? k : 2500) && (Ds(b.callbackAnimation), at ? at.progress(1) : Ds(r, dt === "reverse" ? 1 : !V, 1))) : W && o && !We && o(b);
        }
        if (be) {
          var pe = O ? q / O.duration() * (O._caScrollDist || 0) : q;
          Ji(pe + (A._isFlipped ? 1 : 0)), be(pe);
        }
        j && j(-q / O.duration() * (O._caScrollDist || 0));
      }
    }, b.enable = function(I, Y) {
      b.enabled || (b.enabled = !0, Le(F, "resize", Gs), Q || Le(F, "scroll", Xn), J && Le(s, "refreshInit", J), I !== !1 && (b.progress = Tt = 0, Ft = Xt = st = Dt()), Y !== !1 && b.refresh());
    }, b.getTween = function(I) {
      return I && gt ? gt.tween : at;
    }, b.setPositions = function(I, Y, R, q) {
      if (O) {
        var tt = O.scrollTrigger, V = O.duration(), ct = tt.end - tt.start;
        I = tt.start + ct * I / V, Y = tt.start + ct * Y / V;
      }
      b.refresh(!1, !1, {
        start: Eu(I, R && !!b._startClamp),
        end: Eu(Y, R && !!b._endClamp)
      }, q), b.update();
    }, b.adjustPinSpacing = function(I) {
      if (Vt && I) {
        var Y = Vt.indexOf(z.d) + 1;
        Vt[Y] = parseFloat(Vt[Y]) + I + Ee, Vt[1] = parseFloat(Vt[1]) + I + Ee, fs(Vt);
      }
    }, b.disable = function(I, Y) {
      if (b.enabled && (I !== !1 && b.revert(!0, !0), b.enabled = b.isActive = !1, Y || at && at.pause(), ne = 0, ee && (ee.uncache = 1), J && Me(s, "refreshInit", J), Ie && (Ie.pause(), gt.tween && gt.tween.kill() && (gt.tween = 0)), !Q)) {
        for (var R = vt.length; R--; )
          if (vt[R].scroller === F && vt[R] !== b)
            return;
        Me(F, "resize", Gs), Q || Me(F, "scroll", Xn);
      }
    }, b.kill = function(I, Y) {
      b.disable(I, Y), at && !Y && at.kill(), h && delete bh[h];
      var R = vt.indexOf(b);
      R >= 0 && vt.splice(R, 1), R === ii && Pa > 0 && ii--, R = 0, vt.forEach(function(q) {
        return q.scroller === b.scroller && (R = 1);
      }), R || ri || (b.scroll.rec = 0), r && (r.scrollTrigger = null, I && r.revert({
        kill: !1
      }), Y || r.kill()), lt && [lt, ke, A, Ht].forEach(function(q) {
        return q.parentNode && q.parentNode.removeChild(q);
      }), fo === b && (fo = 0), l && (ee && (ee.uncache = 1), R = 0, vt.forEach(function(q) {
        return q.pin === l && R++;
      }), R || (ee.spacer = 0)), i.onKill && i.onKill(b);
    }, vt.push(b), b.enable(!1, !1), y && y(b), r && r.add && !Rt) {
      var H = b.update;
      b.update = function() {
        b.update = H, wt.cache++, ft || pt || b.refresh();
      }, K.delayedCall(0.01, b.update), Rt = 0.01, ft = pt = 0;
    } else
      b.refresh();
    l && O_();
  }, s.register = function(i) {
    return Kn || (K = i || Yf(), Bf() && window.document && s.enable(), Kn = qs), Kn;
  }, s.defaults = function(i) {
    if (i)
      for (var r in i)
        ha[r] = i[r];
    return ha;
  }, s.disable = function(i, r) {
    qs = 0, vt.forEach(function(o) {
      return o[r ? "kill" : "disable"](i);
    }), Me(yt, "wheel", Xn), Me(Wt, "scroll", Xn), clearInterval(na), Me(Wt, "touchcancel", er), Me(Lt, "touchstart", er), aa(Me, Wt, "pointerdown,touchstart,mousedown", Cu), aa(Me, Wt, "pointerup,touchend,mouseup", Pu), Ya.kill(), oa(Me);
    for (var n = 0; n < wt.length; n += 3)
      la(Me, wt[n], wt[n + 1]), la(Me, wt[n], wt[n + 2]);
  }, s.enable = function() {
    if (yt = window, Wt = document, wi = Wt.documentElement, Lt = Wt.body, K && (ko = K.utils.toArray, ao = K.utils.clamp, yh = K.core.context || er, Rl = K.core.suppressOverwrites || er, pc = yt.history.scrollRestoration || "auto", Th = yt.pageYOffset || 0, K.core.globals("ScrollTrigger", s), Lt)) {
      qs = 1, ds = document.createElement("div"), ds.style.height = "100vh", ds.style.position = "absolute", Zf(), b_(), ue.register(K), s.isTouch = ue.isTouch, Rr = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), vh = ue.isTouch === 1, Le(yt, "wheel", Xn), fc = [yt, Wt, wi, Lt], K.matchMedia ? (s.matchMedia = function(c) {
        var u = K.matchMedia(), d;
        for (d in c)
          u.add(d, c[d]);
        return u;
      }, K.addEventListener("matchMediaInit", function() {
        return wc();
      }), K.addEventListener("matchMediaRevert", function() {
        return Kf();
      }), K.addEventListener("matchMedia", function() {
        un(0, 1), Mn("matchMedia");
      }), K.matchMedia().add("(orientation: portrait)", function() {
        return Hl(), Hl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Hl(), Le(Wt, "scroll", Xn);
      var i = Lt.hasAttribute("style"), r = Lt.style, n = r.borderTopStyle, o = K.core.Animation.prototype, a, h;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), r.borderTopStyle = "solid", a = Tr(Lt), Ae.m = Math.round(a.top + Ae.sc()) || 0, si.m = Math.round(a.left + si.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), i || (Lt.setAttribute("style", ""), Lt.removeAttribute("style")), na = setInterval(ku, 250), K.delayedCall(0.5, function() {
        return sa = 0;
      }), Le(Wt, "touchcancel", er), Le(Lt, "touchstart", er), aa(Le, Wt, "pointerdown,touchstart,mousedown", Cu), aa(Le, Wt, "pointerup,touchend,mouseup", Pu), _h = K.utils.checkPrefix("transform"), Oa.push(_h), Kn = Ue(), Ya = K.delayedCall(0.2, un).pause(), jn = [Wt, "visibilitychange", function() {
        var c = yt.innerWidth, u = yt.innerHeight;
        Wt.hidden ? (Tu = c, xu = u) : (Tu !== c || xu !== u) && Gs();
      }, Wt, "DOMContentLoaded", un, yt, "load", un, yt, "resize", Gs], oa(Le), vt.forEach(function(c) {
        return c.enable(0, 1);
      }), h = 0; h < wt.length; h += 3)
        la(Me, wt[h], wt[h + 1]), la(Me, wt[h], wt[h + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (Nl = !!i.limitCallbacks);
    var r = i.syncInterval;
    r && clearInterval(na) || (na = r) && setInterval(ku, r), "ignoreMobileResize" in i && (vh = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (oa(Me) || oa(Le, i.autoRefreshEvents || "none"), Ff = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, r) {
    var n = hi(i), o = wt.indexOf(n), a = kn(n);
    ~o && wt.splice(o, a ? 6 : 2), r && (a ? cr.unshift(yt, r, Lt, r, wi, r) : cr.unshift(n, r));
  }, s.clearMatchMedia = function(i) {
    vt.forEach(function(r) {
      return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, r, n) {
    var o = (vi(i) ? hi(i) : i).getBoundingClientRect(), a = o[n ? xn : Sn] * r || 0;
    return n ? o.right - a > 0 && o.left + a < yt.innerWidth : o.bottom - a > 0 && o.top + a < yt.innerHeight;
  }, s.positionInViewport = function(i, r, n) {
    vi(i) && (i = hi(i));
    var o = i.getBoundingClientRect(), a = o[n ? xn : Sn], h = r == null ? a / 2 : r in qa ? qa[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return n ? (o.left + h) / yt.innerWidth : (o.top + h) / yt.innerHeight;
  }, s.killAll = function(i) {
    if (vt.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), i !== !0) {
      var r = In.killAll || [];
      In = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, s;
}();
bt.version = "3.13.0";
bt.saveStyles = function(s) {
  return s ? ko(s).forEach(function(t) {
    if (t && t.style) {
      var e = _i.indexOf(t);
      e >= 0 && _i.splice(e, 5), _i.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), K.core.getCache(t), yh());
    }
  }) : _i;
};
bt.revert = function(s, t) {
  return wc(!s, t);
};
bt.create = function(s, t) {
  return new bt(s, t);
};
bt.refresh = function(s) {
  return s ? Gs(!0) : (Kn || bt.register()) && un(!0);
};
bt.update = function(s) {
  return ++wt.cache && Pr(s === !0 ? 2 : 0);
};
bt.clearScrollMemory = jf;
bt.maxScroll = function(s, t) {
  return ar(s, t ? si : Ae);
};
bt.getScrollFunc = function(s, t) {
  return Qr(hi(s), t ? si : Ae);
};
bt.getById = function(s) {
  return bh[s];
};
bt.getAll = function() {
  return vt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
bt.isScrolling = function() {
  return !!Hi;
};
bt.snapDirectional = yc;
bt.addEventListener = function(s, t) {
  var e = In[s] || (In[s] = []);
  ~e.indexOf(t) || e.push(t);
};
bt.removeEventListener = function(s, t) {
  var e = In[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
bt.batch = function(s, t) {
  var e = [], i = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, o = function(c, u) {
    var d = [], f = [], l = K.delayedCall(r, function() {
      u(d, f), d = [], f = [];
    }).pause();
    return function(g) {
      d.length || l.restart(!0), d.push(g.trigger), f.push(g), n <= d.length && l.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Ve(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return Ve(n) && (n = n(), Le(bt, "refresh", function() {
    return n = t.batchMax();
  })), ko(s).forEach(function(h) {
    var c = {};
    for (a in i)
      c[a] = i[a];
    c.trigger = h, e.push(bt.create(c));
  }), e;
};
var Nu = function(t, e, i, r) {
  return e > r ? t(r) : e < 0 && t(0), i > r ? (r - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Bl = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (ue.isTouch ? " pinch-zoom" : "") : "none", t === wi && s(Lt, e);
}, fa = {
  auto: 1,
  scroll: 1
}, L_ = function(t) {
  var e = t.event, i = t.target, r = t.axis, n = (e.changedTouches ? e.changedTouches[0] : e).target, o = n._gsap || K.core.getCache(n), a = Ue(), h;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; n && n !== Lt && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(fa[(h = Ni(n)).overflowY] || fa[h.overflowX])); )
      n = n.parentNode;
    o._isScroll = n && n !== i && !kn(n) && (fa[(h = Ni(n)).overflowY] || fa[h.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || r === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Jf = function(t, e, i, r) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: r = r && L_,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return i && Le(Wt, ue.eventTypes[0], Fu, !1, !0);
    },
    onDisable: function() {
      return Me(Wt, ue.eventTypes[0], Fu, !0);
    }
  });
}, D_ = /(input|label|select|textarea)/i, zu, Fu = function(t) {
  var e = D_.test(t.target.tagName);
  (e || zu) && (t._gsapAllow = !0, zu = e);
}, R_ = function(t) {
  ln(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, r = e.momentum, n = e.allowNestedScroll, o = e.onRelease, a, h, c = hi(t.target) || wi, u = K.core.globals().ScrollSmoother, d = u && u.get(), f = Rr && (t.content && hi(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), l = Qr(c, Ae), g = Qr(c, si), p = 1, _ = (ue.isTouch && yt.visualViewport ? yt.visualViewport.scale * yt.visualViewport.width : yt.outerWidth) / yt.innerWidth, C = 0, v = Ve(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, x, S, w = Jf(c, t.type, !0, n), M = function() {
    return S = !1;
  }, O = er, k = er, D = function() {
    h = ar(c, Ae), k = ao(Rr ? 1 : 0, h), i && (O = ao(0, ar(c, si))), x = En;
  }, z = function() {
    f._gsap.y = Xs(parseFloat(f._gsap.y) + l.offset) + "px", f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(f._gsap.y) + ", 0, 1)", l.offset = l.cacheID = 0;
  }, W = function() {
    if (S) {
      requestAnimationFrame(M);
      var nt = Xs(a.deltaY / 2), ot = k(l.v - nt);
      if (f && ot !== l.v + l.offset) {
        l.offset = ot - l.v;
        var b = Xs((parseFloat(f && f._gsap.y) || 0) - l.offset);
        f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + b + ", 0, 1)", f._gsap.y = b + "px", l.cacheID = wt.cache, Pr();
      }
      return !0;
    }
    l.offset && z(), S = !0;
  }, F, B, Q, et, X = function() {
    D(), F.isActive() && F.vars.scrollY > h && (l() > h ? F.progress(1) && l(h) : F.resetTo("scrollY", h));
  };
  return f && K.set(f, {
    y: "+=0"
  }), t.ignoreCheck = function(U) {
    return Rr && U.type === "touchmove" && W() || p > 1.05 && U.type !== "touchstart" || a.isGesturing || U.touches && U.touches.length > 1;
  }, t.onPress = function() {
    S = !1;
    var U = p;
    p = Xs((yt.visualViewport && yt.visualViewport.scale || 1) / _), F.pause(), U !== p && Bl(c, p > 1.01 ? !0 : i ? !1 : "x"), B = g(), Q = l(), D(), x = En;
  }, t.onRelease = t.onGestureStart = function(U, nt) {
    if (l.offset && z(), !nt)
      et.restart(!0);
    else {
      wt.cache++;
      var ot = v(), b, J;
      i && (b = g(), J = b + ot * 0.05 * -U.velocityX / 0.227, ot *= Nu(g, b, J, ar(c, si)), F.vars.scrollX = O(J)), b = l(), J = b + ot * 0.05 * -U.velocityY / 0.227, ot *= Nu(l, b, J, ar(c, Ae)), F.vars.scrollY = k(J), F.invalidate().duration(ot).play(0.01), (Rr && F.vars.scrollY >= h || b >= h - 1) && K.to({}, {
        onUpdate: X,
        duration: ot
      });
    }
    o && o(U);
  }, t.onWheel = function() {
    F._ts && F.pause(), Ue() - C > 1e3 && (x = 0, C = Ue());
  }, t.onChange = function(U, nt, ot, b, J) {
    if (En !== x && D(), nt && i && g(O(b[2] === nt ? B + (U.startX - U.x) : g() + nt - b[1])), ot) {
      l.offset && z();
      var rt = J[2] === ot, G = rt ? Q + U.startY - U.y : l() + ot - J[1], st = k(G);
      rt && G !== st && (Q += st - G), l(st);
    }
    (ot || nt) && Pr();
  }, t.onEnable = function() {
    Bl(c, i ? !1 : "x"), bt.addEventListener("refresh", X), Le(yt, "resize", X), l.smooth && (l.target.style.scrollBehavior = "auto", l.smooth = g.smooth = !1), w.enable();
  }, t.onDisable = function() {
    Bl(c, !0), Me(yt, "resize", X), bt.removeEventListener("refresh", X), w.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new ue(t), a.iOS = Rr, Rr && !l() && l(1), Rr && K.ticker.add(er), et = a._dc, F = K.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Qf(l, l(), function() {
        return F.pause();
      })
    },
    onUpdate: Pr,
    onComplete: et.vars.onComplete
  }), a;
};
bt.sort = function(s) {
  if (Ve(s))
    return vt.sort(s);
  var t = yt.pageYOffset || 0;
  return bt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + yt.innerHeight;
  }), vt.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
bt.observe = function(s) {
  return new ue(s);
};
bt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return ei;
  if (s === !0 && ei)
    return ei.enable();
  if (s === !1) {
    ei && ei.kill(), ei = s;
    return;
  }
  var t = s instanceof ue ? s : R_(s);
  return ei && ei.target === t.target && ei.kill(), kn(t.target) && (ei = t), t;
};
bt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: gh,
  _inputObserver: Jf,
  _scrollers: wt,
  _proxies: cr,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Hi || Mn("scrollStart"), Hi = Ue();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return We;
    }
  }
};
Yf() && K.registerPlugin(bt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var rr, Sh, po, tp, Zn, es, Eh, ep, ip = function() {
  return rr || typeof window < "u" && (rr = window.gsap);
}, Ch = {}, N_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, Ph = function(t) {
  return ep(t).id;
}, Ks = function(t) {
  return Ch[Ph(typeof t == "string" ? po(t)[0] : t)];
}, Hu = function(t) {
  var e = Zn, i;
  if (t - Eh >= 0.05)
    for (Eh = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, z_ = {
  deg: 360,
  rad: Math.PI * 2
}, Yl = function() {
  rr = ip(), rr && (po = rr.utils.toArray, tp = rr.utils.getUnit, ep = rr.core.getCache, es = rr.ticker, Sh = 1);
}, F_ = function(t, e, i, r) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = z_[i || tp(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = es.time, r && (this._next = r, r._prev = this);
}, Yo = /* @__PURE__ */ function() {
  function s(e, i) {
    Sh || Yl(), this.target = po(e)[0], Ch[Ph(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    rr = i, Yl();
  };
  var t = s.prototype;
  return t.get = function(i, r) {
    var n = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, h;
    return o = parseFloat(r ? n.v1 : n.g(n.t, n.p)), a = o - parseFloat(n.v2), h = n.rCap, h && (a = a % h, a !== a % (h / 2) && (a = a < 0 ? a + h : a - h)), N_(a / ((r ? n.t1 : es.time) - n.t2));
  }, t.getAll = function() {
    var i = {}, r = this._props, n;
    for (n in r)
      i[n] = this.get(n);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, r) {
    i in this._props || (Zn || (es.add(Hu), Eh = es.time), Zn = this._props[i] = new F_(this.target, i, r, Zn));
  }, t.remove = function(i) {
    var r = this._props[i], n, o;
    r && (n = r._prev, o = r._next, n && (n._next = o), o ? o._prev = n : Zn === r && (es.remove(Hu), Zn = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var r in this._props)
      this.remove(r);
    i || delete Ch[Ph(this.target)];
  }, s.track = function(i, r, n) {
    Sh || Yl();
    for (var o = [], a = po(i), h = r.split(","), c = (n || "").split(","), u = a.length, d, f; u--; ) {
      for (d = Ks(a[u]) || new s(a[u]), f = h.length; f--; )
        d.add(h[f], c[f] || c[0]);
      o.push(d);
    }
    return o;
  }, s.untrack = function(i, r) {
    var n = (r || "").split(",");
    po(i).forEach(function(o) {
      var a = Ks(o);
      a && (n.length ? n.forEach(function(h) {
        return a.remove(h);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, r) {
    var n = Ks(i);
    return n && n.isTracking(r);
  }, s.getVelocity = function(i, r) {
    var n = Ks(i);
    return !n || !n.isTracking(r) ? console.warn("Not tracking velocity of " + r) : n.get(r);
  }, s;
}();
Yo.getByTarget = Ks;
ip() && rr.registerPlugin(Yo);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Oe, rp, $u, np, Oh, go, sp, op, ap, bc, lp, mo, Ah, hp, Xa = Yo.getByTarget, cp = function() {
  return Oe || typeof window < "u" && (Oe = window.gsap) && Oe.registerPlugin && Oe;
}, H_ = function(t) {
  return typeof t == "string";
}, Mo = function(t) {
  return typeof t == "number";
}, Gr = function(t) {
  return typeof t == "object";
}, kh = function(t) {
  return typeof t == "function";
}, $_ = 1, up = Array.isArray, B_ = function(t) {
  return t;
}, ps = 1e10, Bu = 1 / ps, dp = 0.05, Y_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, W_ = function(t, e, i) {
  for (var r in e)
    !(r in t) && r !== i && (t[r] = e[r]);
  return t;
}, U_ = function s(t) {
  var e = {}, i, r;
  for (i in t)
    e[i] = Gr(r = t[i]) && !up(r) ? s(r) : r;
  return e;
}, Yu = function(t, e, i, r, n) {
  var o = e.length, a = 0, h = ps, c, u, d, f;
  if (Gr(t)) {
    for (; o--; ) {
      c = e[o], u = 0;
      for (d in t)
        f = c[d] - t[d], u += f * f;
      u < h && (a = o, h = u);
    }
    if ((n || ps) < ps && n < Math.sqrt(h))
      return t;
  } else
    for (; o--; )
      c = e[o], u = c - t, u < 0 && (u = -u), u < h && c >= r && c <= i && (a = o, h = u);
  return e[a];
}, fp = function(t, e, i, r, n, o, a) {
  if (t.end === "auto")
    return t;
  var h = t.end, c, u;
  if (i = isNaN(i) ? ps : i, r = isNaN(r) ? -1e10 : r, Gr(e)) {
    if (c = e.calculated ? e : (kh(h) ? h(e, a) : Yu(e, h, i, r, o)) || e, !e.calculated) {
      for (u in c)
        e[u] = c[u];
      e.calculated = !0;
    }
    c = c[n];
  } else
    c = kh(h) ? h(e, a) : up(h) ? Yu(e, h, i, r, o) : parseFloat(h);
  return c > i ? c = i : c < r && (c = r), {
    max: c,
    min: c,
    unitFactor: t.unitFactor
  };
}, Va = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, Tc = function(t, e) {
  return e * dp * t / bc;
}, Wu = function(t, e, i) {
  return Math.abs((e - t) * bc / i / dp);
}, pp = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, gp = function(t, e, i, r) {
  if (e.linkedProps) {
    var n = e.linkedProps.split(","), o = {}, a, h, c, u, d, f;
    for (a = 0; a < n.length; a++)
      h = n[a], c = e[h], c && (Mo(c.velocity) ? u = c.velocity : (d = d || Xa(t), u = d && d.isTracking(h) ? d.get(h) : 0), f = Math.abs(u / Va(c, "resistance", r)), o[h] = parseFloat(i(t, h)) + Tc(u, f));
    return o;
  }
}, q_ = function(t, e, i, r, n, o) {
  if (i === void 0 && (i = 10), r === void 0 && (r = 0.2), n === void 0 && (n = 1), H_(t) && (t = np(t)[0]), !t)
    return 0;
  var a = 0, h = ps, c = e.inertia || e, u = ap(t).get, d = Va(c, "resistance", go.resistance), f, l, g, p, _, C, v, x, S, w;
  w = gp(t, c, u, d);
  for (f in c)
    pp[f] || (l = c[f], Gr(l) || (x = x || Xa(t), x && x.isTracking(f) ? l = Mo(l) ? {
      velocity: l
    } : {
      velocity: x.get(f)
    } : (p = +l || 0, g = Math.abs(p / d))), Gr(l) && (Mo(l.velocity) ? p = l.velocity : (x = x || Xa(t), p = x && x.isTracking(f) ? x.get(f) : 0), g = lp(r, i, Math.abs(p / Va(l, "resistance", d))), _ = parseFloat(u(t, f)) || 0, C = _ + Tc(p, g), "end" in l && (l = fp(l, w && f in w ? w : C, l.max, l.min, f, c.radius, p), mo === e && (mo = c = U_(e)), c[f] = W_(l, c[f], "end")), "max" in l && C > +l.max + Bu ? (S = l.unitFactor || go.unitFactors[f] || 1, v = _ > l.max && l.min !== l.max || p * S > -15 && p * S < 45 ? r + (i - r) * 0.1 : Wu(_, l.max, p), v + n < h && (h = v + n)) : "min" in l && C < +l.min - Bu && (S = l.unitFactor || go.unitFactors[f] || 1, v = _ < l.min && l.min !== l.max || p * S > -45 && p * S < 15 ? r + (i - r) * 0.1 : Wu(_, l.min, p), v + n < h && (h = v + n)), v > a && (a = v)), g > a && (a = g));
  return a > h && (a = h), a > i ? i : a < r ? r : a;
}, Uu = function() {
  Oe = cp(), Oe && ($u = Oe.parseEase, np = Oe.utils.toArray, sp = Oe.utils.getUnit, ap = Oe.core.getCache, lp = Oe.utils.clamp, Ah = Oe.core.getStyleSaver, hp = Oe.core.reverting || function() {
  }, Oh = $u("power3"), bc = Oh(0.05), op = Oe.core.PropTween, Oe.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), go = Oe.config(), Oe.registerPlugin(Yo), rp = 1);
}, mp = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Oe = t, Uu();
  },
  init: function(t, e, i, r, n) {
    rp || Uu();
    var o = Xa(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = Ah && typeof t.style == "object" && Ah(t), this.target = t, this.tween = i, mo = e;
    var a = t._gsap, h = a.get, c = e.duration, u = Gr(c), d = e.preventOvershoot || u && c.overshoot === 0, f = Va(e, "resistance", go.resistance), l = Mo(c) ? c : q_(t, e, u && c.max || 10, u && c.min || 0.2, u && "overshoot" in c ? +c.overshoot : d ? 0 : 1), g, p, _, C, v, x, S, w, M;
    e = mo, mo = 0, M = gp(t, e, h, f);
    for (g in e)
      pp[g] || (p = e[g], kh(p) && (p = p(r, t, n)), Mo(p) ? v = p : Gr(p) && !isNaN(p.velocity) ? v = +p.velocity : o && o.isTracking(g) ? v = o.get(g) : console.warn("ERROR: No velocity was defined for " + t + " property: " + g), x = Tc(v, l), w = 0, _ = h(t, g), C = sp(_), _ = parseFloat(_), Gr(p) && (S = _ + x, "end" in p && (p = fp(p, M && g in M ? M : S, p.max, p.min, g, e.radius, v)), "max" in p && +p.max < S ? d || p.preventOvershoot ? x = p.max - _ : w = p.max - _ - x : "min" in p && +p.min > S && (d || p.preventOvershoot ? x = p.min - _ : w = p.min - _ - x)), this._props.push(g), this.styles && this.styles.save(g), this._pt = new op(this._pt, t, g, _, 0, B_, 0, a.set(t, g, this)), this._pt.u = C || 0, this._pt.c1 = x, this._pt.c2 = w);
    return i.duration(l), $_;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = Oh(e.tween._time / e.tween._dur), t || !hp())
      for (; i; )
        i.set(i.t, i.p, Y_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return mp[s] = Yo[s];
});
cp() && Oe.registerPlugin(mp);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let Rs, Vn, Ih, X_ = () => Ih || K_.register(window.gsap), qu = typeof Intl < "u" ? new Intl.Segmenter() : 0, Ga = (s) => typeof s == "string" ? Ga(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], Xu = (s) => Ga(s).filter((t) => t instanceof HTMLElement), Mh = [], Wl = function() {
}, V_ = /\s+/g, Vu = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Gu = { left: 0, top: 0, width: 0, height: 0 }, Ku = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || Mh), i = s.length, r, n, o, a;
    if (e.size)
      for (; --i > -1; ) {
        n = s[i];
        for (o of e)
          if (o.startsWith(n) && o.length > n.length) {
            for (r = 0, a = n; o.startsWith(a += s[i + ++r]) && a.length < o.length; )
              ;
            if (r && a.length === o.length) {
              s[i] = o, s.splice(i + 1, r);
              break;
            }
          }
      }
  }
  return s;
}, ju = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Gn = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), Lh = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: r = "div", aria: n = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", h = i.indexOf("++") > -1, c = (u) => {
    let d = document.createElement(r), f = e.length + 1;
    return i && (d.className = i + (h ? " " + i + f : "")), o && d.style.setProperty("--" + s, f + ""), n !== "none" && d.setAttribute("aria-hidden", "true"), r !== "span" && (d.style.position = "relative", d.style.display = a), d.textContent = u, e.push(d), d;
  };
  return h && (i = i.replace("++", "")), c.collection = e, c;
}, G_ = (s, t, e, i) => {
  let r = Lh("line", e, i), n = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let h = r("");
    for (h.style.textAlign = n, s.insertBefore(h, t[o]); o < a; o++)
      h.appendChild(t[o]);
    h.normalize();
  };
}, _p = (s, t, e, i, r, n, o, a, h, c) => {
  var u;
  let d = Array.from(s.childNodes), f = 0, { wordDelimiter: l, reduceWhiteSpace: g = !0, prepareText: p } = t, _ = s.getBoundingClientRect(), C = _, v = !g && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", x = 0, S = e.collection, w, M, O, k, D, z, W, F, B, Q, et, X, U, nt, ot, b, J, rt;
  for (typeof l == "object" ? (O = l.delimiter || l, M = l.replaceWith || "") : M = l === "" ? "" : l || " ", w = M !== " "; f < d.length; f++)
    if (k = d[f], k.nodeType === 3) {
      for (ot = k.textContent || "", g ? ot = ot.replace(V_, " ") : v && (ot = ot.replace(/\n/g, M + `
`)), p && (ot = p(ot, s)), k.textContent = ot, D = M || O ? ot.split(O || M) : ot.match(a) || Mh, J = D[D.length - 1], F = w ? J.slice(-1) === " " : !J, J || D.pop(), C = _, W = w ? D[0].charAt(0) === " " : !D[0], W && Gn(" ", s, k), D[0] || D.shift(), Ku(D, h), n && c || (k.textContent = ""), B = 1; B <= D.length; B++)
        if (b = D[B - 1], !g && v && b.charAt(0) === `
` && ((u = k.previousSibling) == null || u.remove(), Gn(document.createElement("br"), s, k), b = b.slice(1)), !g && b === "")
          Gn(M, s, k);
        else if (b === " ")
          s.insertBefore(document.createTextNode(" "), k);
        else {
          if (w && b.charAt(0) === " " && Gn(" ", s, k), x && B === 1 && !W && S.indexOf(x.parentNode) > -1 ? (z = S[S.length - 1], z.appendChild(document.createTextNode(i ? "" : b))) : (z = e(i ? "" : b), Gn(z, s, k), x && B === 1 && !W && z.insertBefore(x, z.firstChild)), i)
            for (et = qu ? Ku([...qu.segment(b)].map((G) => G.segment), h) : b.match(a) || Mh, rt = 0; rt < et.length; rt++)
              z.appendChild(et[rt] === " " ? document.createTextNode(" ") : i(et[rt]));
          if (n && c) {
            if (ot = k.textContent = ot.substring(b.length + 1, ot.length), Q = z.getBoundingClientRect(), Q.top > C.top && Q.left <= C.left) {
              for (X = s.cloneNode(), U = s.childNodes[0]; U && U !== z; )
                nt = U, U = U.nextSibling, X.appendChild(nt);
              s.parentNode.insertBefore(X, s), r && ju(X);
            }
            C = Q;
          }
          (B < D.length || F) && Gn(B >= D.length ? " " : w && b.slice(-1) === " " ? " " + M : M, s, k);
        }
      s.removeChild(k), x = 0;
    } else k.nodeType === 1 && (o && o.indexOf(k) > -1 ? (S.indexOf(k.previousSibling) > -1 && S[S.length - 1].appendChild(k), x = k) : (_p(k, t, e, i, r, n, o, a, h, !0), x = 0), r && ju(k));
};
const vp = class yp {
  constructor(t, e) {
    this.isSplit = !1, X_(), this.elements = Xu(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
    let i = [], r, n = () => {
      let o = i.length, a;
      for (; o--; ) {
        a = i[o];
        let h = a.element.offsetWidth;
        if (h !== a.width) {
          a.width = h, this._split();
          return;
        }
      }
    };
    this._data = { orig: i, obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
      clearTimeout(r), r = setTimeout(n, 200);
    }) }, Wl(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: r = !0, smartWrap: n, onSplit: o, autoSplit: a = !1, specialChars: h, mask: c } = this.vars, u = e.indexOf("lines") > -1, d = e.indexOf("chars") > -1, f = e.indexOf("words") > -1, l = d && !f && !u, g = h && ("push" in h ? new RegExp("(?:" + h.join("|") + ")", "gu") : h), p = g ? new RegExp(g.source + "|" + Vu.source, "gu") : Vu, _ = !!t.ignore && Xu(t.ignore), { orig: C, animTime: v, obs: x } = this._data, S;
    return (d || f || u) && (this.elements.forEach((w, M) => {
      C[M] = {
        element: w,
        html: w.innerHTML,
        ariaL: w.getAttribute("aria-label"),
        ariaH: w.getAttribute("aria-hidden")
      }, i === "auto" ? w.setAttribute("aria-label", (w.textContent || "").trim()) : i === "hidden" && w.setAttribute("aria-hidden", "true");
      let O = [], k = [], D = [], z = d ? Lh("char", t, O) : null, W = Lh("word", t, k), F, B, Q, et;
      if (_p(w, t, W, z, l, r && (u || l), _, p, g, !1), u) {
        let X = Ga(w.childNodes), U = G_(w, X, t, D), nt, ot = [], b = 0, J = X.map((G) => G.nodeType === 1 ? G.getBoundingClientRect() : Gu), rt = Gu;
        for (F = 0; F < X.length; F++)
          nt = X[F], nt.nodeType === 1 && (nt.nodeName === "BR" ? (ot.push(nt), U(b, F + 1), b = F + 1, rt = J[b]) : (F && J[F].top > rt.top && J[F].left <= rt.left && (U(b, F), b = F), rt = J[F]));
        b < F && U(b, F), ot.forEach((G) => {
          var st;
          return (st = G.parentNode) == null ? void 0 : st.removeChild(G);
        });
      }
      if (!f) {
        for (F = 0; F < k.length; F++)
          if (B = k[F], d || !B.nextSibling || B.nextSibling.nodeType !== 3)
            if (n && !u) {
              for (Q = document.createElement("span"), Q.style.whiteSpace = "nowrap"; B.firstChild; )
                Q.appendChild(B.firstChild);
              B.replaceWith(Q);
            } else
              B.replaceWith(...B.childNodes);
          else
            et = B.nextSibling, et && et.nodeType === 3 && (et.textContent = (B.textContent || "") + (et.textContent || ""), B.remove());
        k.length = 0, w.normalize();
      }
      this.lines.push(...D), this.words.push(...k), this.chars.push(...O);
    }), c && this[c] && this.masks.push(...this[c].map((w) => {
      let M = w.cloneNode();
      return w.replaceWith(M), M.appendChild(w), w.className && (M.className = w.className.replace(/(\b\w+\b)/g, "$1-mask")), M.style.overflow = "clip", M;
    }))), this.isSplit = !0, Vn && (a ? Vn.addEventListener("loadingdone", this._split) : Vn.status === "loading" && console.warn("SplitText called before fonts loaded")), (S = o && o(this)) && S.totalTime && (this._data.anim = v ? S.totalTime(v) : S), u && a && this.elements.forEach((w, M) => {
      C[M].width = w.offsetWidth, x && x.observe(w);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: r, obs: n } = this._data;
    return n && n.disconnect(), i.forEach(({ element: o, html: a, ariaL: h, ariaH: c }) => {
      o.innerHTML = a, h ? o.setAttribute("aria-label", h) : o.removeAttribute("aria-label"), c ? o.setAttribute("aria-hidden", c) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, Vn == null || Vn.removeEventListener("loadingdone", this._split), r && (this._data.animTime = r.totalTime(), r.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new yp(t, e);
  }
  static register(t) {
    Rs = Rs || t || window.gsap, Rs && (Ga = Rs.utils.toArray, Wl = Rs.core.context || Wl), !Ih && window.innerWidth > 0 && (Vn = document.fonts, Ih = !0);
  }
};
vp.version = "3.13.0";
let K_ = vp;
var N = Ut.registerPlugin(Bo) || Ut;
N.core.Tween;
/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function Zi() {
  return Zi = Object.assign || function(s) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (s[i] = e[i]);
    }
    return s;
  }, Zi.apply(this, arguments);
}
function Wi(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
function pa(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
var Dh;
typeof Object.assign != "function" ? Dh = function(t) {
  if (t == null)
    throw new TypeError("Cannot convert undefined or null to object");
  for (var e = Object(t), i = 1; i < arguments.length; i++) {
    var r = arguments[i];
    if (r != null)
      for (var n in r)
        r.hasOwnProperty(n) && (e[n] = r[n]);
  }
  return e;
} : Dh = Object.assign;
var Ln = Dh, Zu = ["", "webkit", "Moz", "MS", "ms", "o"], j_ = typeof document > "u" ? {
  style: {}
} : document.createElement("div"), Z_ = "function", is = Math.round, Dn = Math.abs, xc = Date.now;
function ol(s, t) {
  for (var e, i, r = t[0].toUpperCase() + t.slice(1), n = 0; n < Zu.length; ) {
    if (e = Zu[n], i = e ? e + r : t, i in s)
      return i;
    n++;
  }
}
var Or;
typeof window > "u" ? Or = {} : Or = window;
var wp = ol(j_.style, "touchAction"), bp = wp !== void 0;
function Q_() {
  if (!bp)
    return !1;
  var s = {}, t = Or.CSS && Or.CSS.supports;
  return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(e) {
    return s[e] = t ? Or.CSS.supports("touch-action", e) : !0;
  }), s;
}
var Tp = "compute", xp = "auto", Rh = "manipulation", Cn = "none", Lo = "pan-x", Do = "pan-y", ga = Q_(), J_ = /mobile|tablet|ip(ad|hone|od)|android/i, Sp = "ontouchstart" in Or, t0 = ol(Or, "PointerEvent") !== void 0, e0 = Sp && J_.test(navigator.userAgent), Wo = "touch", i0 = "pen", Sc = "mouse", r0 = "kinect", n0 = 25, oi = 1, Fn = 2, we = 4, pi = 8, Ka = 1, Uo = 2, qo = 4, Xo = 8, Es = 16, ur = Uo | qo, Pn = Xo | Es, Ep = ur | Pn, Cp = ["x", "y"], ja = ["clientX", "clientY"];
function Ar(s, t, e) {
  var i;
  if (s)
    if (s.forEach)
      s.forEach(t, e);
    else if (s.length !== void 0)
      for (i = 0; i < s.length; )
        t.call(e, s[i], i, s), i++;
    else
      for (i in s)
        s.hasOwnProperty(i) && t.call(e, s[i], i, s);
}
function al(s, t) {
  return typeof s === Z_ ? s.apply(t && t[0] || void 0, t) : s;
}
function dn(s, t) {
  return s.indexOf(t) > -1;
}
function s0(s) {
  if (dn(s, Cn))
    return Cn;
  var t = dn(s, Lo), e = dn(s, Do);
  return t && e ? Cn : t || e ? t ? Lo : Do : dn(s, Rh) ? Rh : xp;
}
var Pp = /* @__PURE__ */ function() {
  function s(e, i) {
    this.manager = e, this.set(i);
  }
  var t = s.prototype;
  return t.set = function(i) {
    i === Tp && (i = this.compute()), bp && this.manager.element.style && ga[i] && (this.manager.element.style[wp] = i), this.actions = i.toLowerCase().trim();
  }, t.update = function() {
    this.set(this.manager.options.touchAction);
  }, t.compute = function() {
    var i = [];
    return Ar(this.manager.recognizers, function(r) {
      al(r.options.enable, [r]) && (i = i.concat(r.getTouchAction()));
    }), s0(i.join(" "));
  }, t.preventDefaults = function(i) {
    var r = i.srcEvent, n = i.offsetDirection;
    if (this.manager.session.prevented) {
      r.preventDefault();
      return;
    }
    var o = this.actions, a = dn(o, Cn) && !ga[Cn], h = dn(o, Do) && !ga[Do], c = dn(o, Lo) && !ga[Lo];
    if (a) {
      var u = i.pointers.length === 1, d = i.distance < 2, f = i.deltaTime < 250;
      if (u && d && f)
        return;
    }
    if (!(c && h) && (a || h && n & ur || c && n & Pn))
      return this.preventSrc(r);
  }, t.preventSrc = function(i) {
    this.manager.session.prevented = !0, i.preventDefault();
  }, s;
}();
function Ec(s, t) {
  for (; s; ) {
    if (s === t)
      return !0;
    s = s.parentNode;
  }
  return !1;
}
function Op(s) {
  var t = s.length;
  if (t === 1)
    return {
      x: is(s[0].clientX),
      y: is(s[0].clientY)
    };
  for (var e = 0, i = 0, r = 0; r < t; )
    e += s[r].clientX, i += s[r].clientY, r++;
  return {
    x: is(e / t),
    y: is(i / t)
  };
}
function Qu(s) {
  for (var t = [], e = 0; e < s.pointers.length; )
    t[e] = {
      clientX: is(s.pointers[e].clientX),
      clientY: is(s.pointers[e].clientY)
    }, e++;
  return {
    timeStamp: xc(),
    pointers: t,
    center: Op(t),
    deltaX: s.deltaX,
    deltaY: s.deltaY
  };
}
function Za(s, t, e) {
  e || (e = Cp);
  var i = t[e[0]] - s[e[0]], r = t[e[1]] - s[e[1]];
  return Math.sqrt(i * i + r * r);
}
function Nh(s, t, e) {
  e || (e = Cp);
  var i = t[e[0]] - s[e[0]], r = t[e[1]] - s[e[1]];
  return Math.atan2(r, i) * 180 / Math.PI;
}
function Ap(s, t) {
  return s === t ? Ka : Dn(s) >= Dn(t) ? s < 0 ? Uo : qo : t < 0 ? Xo : Es;
}
function o0(s, t) {
  var e = t.center, i = s.offsetDelta || {}, r = s.prevDelta || {}, n = s.prevInput || {};
  (t.eventType === oi || n.eventType === we) && (r = s.prevDelta = {
    x: n.deltaX || 0,
    y: n.deltaY || 0
  }, i = s.offsetDelta = {
    x: e.x,
    y: e.y
  }), t.deltaX = r.x + (e.x - i.x), t.deltaY = r.y + (e.y - i.y);
}
function kp(s, t, e) {
  return {
    x: t / s || 0,
    y: e / s || 0
  };
}
function a0(s, t) {
  return Za(t[0], t[1], ja) / Za(s[0], s[1], ja);
}
function l0(s, t) {
  return Nh(t[1], t[0], ja) + Nh(s[1], s[0], ja);
}
function h0(s, t) {
  var e = s.lastInterval || t, i = t.timeStamp - e.timeStamp, r, n, o, a;
  if (t.eventType !== pi && (i > n0 || e.velocity === void 0)) {
    var h = t.deltaX - e.deltaX, c = t.deltaY - e.deltaY, u = kp(i, h, c);
    n = u.x, o = u.y, r = Dn(u.x) > Dn(u.y) ? u.x : u.y, a = Ap(h, c), s.lastInterval = t;
  } else
    r = e.velocity, n = e.velocityX, o = e.velocityY, a = e.direction;
  t.velocity = r, t.velocityX = n, t.velocityY = o, t.direction = a;
}
function c0(s, t) {
  var e = s.session, i = t.pointers, r = i.length;
  e.firstInput || (e.firstInput = Qu(t)), r > 1 && !e.firstMultiple ? e.firstMultiple = Qu(t) : r === 1 && (e.firstMultiple = !1);
  var n = e.firstInput, o = e.firstMultiple, a = o ? o.center : n.center, h = t.center = Op(i);
  t.timeStamp = xc(), t.deltaTime = t.timeStamp - n.timeStamp, t.angle = Nh(a, h), t.distance = Za(a, h), o0(e, t), t.offsetDirection = Ap(t.deltaX, t.deltaY);
  var c = kp(t.deltaTime, t.deltaX, t.deltaY);
  t.overallVelocityX = c.x, t.overallVelocityY = c.y, t.overallVelocity = Dn(c.x) > Dn(c.y) ? c.x : c.y, t.scale = o ? a0(o.pointers, i) : 1, t.rotation = o ? l0(o.pointers, i) : 0, t.maxPointers = e.prevInput ? t.pointers.length > e.prevInput.maxPointers ? t.pointers.length : e.prevInput.maxPointers : t.pointers.length, h0(e, t);
  var u = s.element, d = t.srcEvent, f;
  d.composedPath ? f = d.composedPath()[0] : d.path ? f = d.path[0] : f = d.target, Ec(f, u) && (u = f), t.target = u;
}
function u0(s, t, e) {
  var i = e.pointers.length, r = e.changedPointers.length, n = t & oi && i - r === 0, o = t & (we | pi) && i - r === 0;
  e.isFirst = !!n, e.isFinal = !!o, n && (s.session = {}), e.eventType = t, c0(s, e), s.emit("hammer.input", e), s.recognize(e), s.session.prevInput = e;
}
function Ro(s) {
  return s.trim().split(/\s+/g);
}
function _o(s, t, e) {
  Ar(Ro(t), function(i) {
    s.addEventListener(i, e, !1);
  });
}
function vo(s, t, e) {
  Ar(Ro(t), function(i) {
    s.removeEventListener(i, e, !1);
  });
}
function Ju(s) {
  var t = s.ownerDocument || s;
  return t.defaultView || t.parentWindow || window;
}
var Os = /* @__PURE__ */ function() {
  function s(e, i) {
    var r = this;
    this.manager = e, this.callback = i, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(n) {
      al(e.options.enable, [e]) && r.handler(n);
    }, this.init();
  }
  var t = s.prototype;
  return t.handler = function() {
  }, t.init = function() {
    this.evEl && _o(this.element, this.evEl, this.domHandler), this.evTarget && _o(this.target, this.evTarget, this.domHandler), this.evWin && _o(Ju(this.element), this.evWin, this.domHandler);
  }, t.destroy = function() {
    this.evEl && vo(this.element, this.evEl, this.domHandler), this.evTarget && vo(this.target, this.evTarget, this.domHandler), this.evWin && vo(Ju(this.element), this.evWin, this.domHandler);
  }, s;
}();
function Rn(s, t, e) {
  if (s.indexOf && !e)
    return s.indexOf(t);
  for (var i = 0; i < s.length; ) {
    if (e && s[i][e] == t || !e && s[i] === t)
      return i;
    i++;
  }
  return -1;
}
var d0 = {
  pointerdown: oi,
  pointermove: Fn,
  pointerup: we,
  pointercancel: pi,
  pointerout: pi
}, f0 = {
  2: Wo,
  3: i0,
  4: Sc,
  5: r0
  // see https://twitter.com/jacobrossi/status/480596438489890816
}, Ip = "pointerdown", Mp = "pointermove pointerup pointercancel";
Or.MSPointerEvent && !Or.PointerEvent && (Ip = "MSPointerDown", Mp = "MSPointerMove MSPointerUp MSPointerCancel");
var Lp = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evEl = Ip, r.evWin = Mp, i = s.apply(this, arguments) || this, i.store = i.manager.session.pointerEvents = [], i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = this.store, o = !1, a = r.type.toLowerCase().replace("ms", ""), h = d0[a], c = f0[r.pointerType] || r.pointerType, u = c === Wo, d = Rn(n, r.pointerId, "pointerId");
    h & oi && (r.button === 0 || u) ? d < 0 && (n.push(r), d = n.length - 1) : h & (we | pi) && (o = !0), !(d < 0) && (n[d] = r, this.callback(this.manager, h, {
      pointers: n,
      changedPointers: [r],
      pointerType: c,
      srcEvent: r
    }), o && n.splice(d, 1));
  }, t;
}(Os);
function No(s) {
  return Array.prototype.slice.call(s, 0);
}
function Cc(s, t, e) {
  for (var i = [], r = [], n = 0; n < s.length; ) {
    var o = t ? s[n][t] : s[n];
    Rn(r, o) < 0 && i.push(s[n]), r[n] = o, n++;
  }
  return e && (t ? i = i.sort(function(a, h) {
    return a[t] > h[t];
  }) : i = i.sort()), i;
}
var p0 = {
  touchstart: oi,
  touchmove: Fn,
  touchend: we,
  touchcancel: pi
}, g0 = "touchstart touchmove touchend touchcancel", Pc = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t() {
    var i;
    return t.prototype.evTarget = g0, i = s.apply(this, arguments) || this, i.targetIds = {}, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = p0[r.type], o = m0.call(this, r, n);
    o && this.callback(this.manager, n, {
      pointers: o[0],
      changedPointers: o[1],
      pointerType: Wo,
      srcEvent: r
    });
  }, t;
}(Os);
function m0(s, t) {
  var e = No(s.touches), i = this.targetIds;
  if (t & (oi | Fn) && e.length === 1)
    return i[e[0].identifier] = !0, [e, e];
  var r, n, o = No(s.changedTouches), a = [], h = this.target;
  if (n = e.filter(function(c) {
    return Ec(c.target, h);
  }), t === oi)
    for (r = 0; r < n.length; )
      i[n[r].identifier] = !0, r++;
  for (r = 0; r < o.length; )
    i[o[r].identifier] && a.push(o[r]), t & (we | pi) && delete i[o[r].identifier], r++;
  if (a.length)
    return [
      // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
      Cc(n.concat(a), "identifier", !0),
      a
    ];
}
var _0 = {
  mousedown: oi,
  mousemove: Fn,
  mouseup: we
}, v0 = "mousedown", y0 = "mousemove mouseup", Oc = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evEl = v0, r.evWin = y0, i = s.apply(this, arguments) || this, i.pressed = !1, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = _0[r.type];
    n & oi && r.button === 0 && (this.pressed = !0), n & Fn && r.which !== 1 && (n = we), this.pressed && (n & we && (this.pressed = !1), this.callback(this.manager, n, {
      pointers: [r],
      changedPointers: [r],
      pointerType: Sc,
      srcEvent: r
    }));
  }, t;
}(Os), w0 = 2500, td = 25;
function ed(s) {
  var t = s.changedPointers, e = t[0];
  if (e.identifier === this.primaryTouch) {
    var i = {
      x: e.clientX,
      y: e.clientY
    }, r = this.lastTouches;
    this.lastTouches.push(i);
    var n = function() {
      var a = r.indexOf(i);
      a > -1 && r.splice(a, 1);
    };
    setTimeout(n, w0);
  }
}
function b0(s, t) {
  s & oi ? (this.primaryTouch = t.changedPointers[0].identifier, ed.call(this, t)) : s & (we | pi) && ed.call(this, t);
}
function T0(s) {
  for (var t = s.srcEvent.clientX, e = s.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
    var r = this.lastTouches[i], n = Math.abs(t - r.x), o = Math.abs(e - r.y);
    if (n <= td && o <= td)
      return !0;
  }
  return !1;
}
var Dp = /* @__PURE__ */ function() {
  var s = /* @__PURE__ */ function(t) {
    Wi(e, t);
    function e(r, n) {
      var o;
      return o = t.call(this, r, n) || this, o.handler = function(a, h, c) {
        var u = c.pointerType === Wo, d = c.pointerType === Sc;
        if (!(d && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
          if (u)
            b0.call(pa(pa(o)), h, c);
          else if (d && T0.call(pa(pa(o)), c))
            return;
          o.callback(a, h, c);
        }
      }, o.touch = new Pc(o.manager, o.handler), o.mouse = new Oc(o.manager, o.handler), o.primaryTouch = null, o.lastTouches = [], o;
    }
    var i = e.prototype;
    return i.destroy = function() {
      this.touch.destroy(), this.mouse.destroy();
    }, e;
  }(Os);
  return s;
}();
function x0(s) {
  var t, e = s.options.inputClass;
  return e ? t = e : t0 ? t = Lp : e0 ? t = Pc : Sp ? t = Dp : t = Oc, new t(s, u0);
}
function rs(s, t, e) {
  return Array.isArray(s) ? (Ar(s, e[t], e), !0) : !1;
}
var ka = 1, $i = 2, Cs = 4, Kr = 8, kr = Kr, zo = 16, lr = 32, S0 = 1;
function E0() {
  return S0++;
}
function ma(s, t) {
  var e = t.manager;
  return e ? e.get(s) : s;
}
function id(s) {
  return s & zo ? "cancel" : s & Kr ? "end" : s & Cs ? "move" : s & $i ? "start" : "";
}
var Vo = /* @__PURE__ */ function() {
  function s(e) {
    e === void 0 && (e = {}), this.options = Zi({
      enable: !0
    }, e), this.id = E0(), this.manager = null, this.state = ka, this.simultaneous = {}, this.requireFail = [];
  }
  var t = s.prototype;
  return t.set = function(i) {
    return Ln(this.options, i), this.manager && this.manager.touchAction.update(), this;
  }, t.recognizeWith = function(i) {
    if (rs(i, "recognizeWith", this))
      return this;
    var r = this.simultaneous;
    return i = ma(i, this), r[i.id] || (r[i.id] = i, i.recognizeWith(this)), this;
  }, t.dropRecognizeWith = function(i) {
    return rs(i, "dropRecognizeWith", this) ? this : (i = ma(i, this), delete this.simultaneous[i.id], this);
  }, t.requireFailure = function(i) {
    if (rs(i, "requireFailure", this))
      return this;
    var r = this.requireFail;
    return i = ma(i, this), Rn(r, i) === -1 && (r.push(i), i.requireFailure(this)), this;
  }, t.dropRequireFailure = function(i) {
    if (rs(i, "dropRequireFailure", this))
      return this;
    i = ma(i, this);
    var r = Rn(this.requireFail, i);
    return r > -1 && this.requireFail.splice(r, 1), this;
  }, t.hasRequireFailures = function() {
    return this.requireFail.length > 0;
  }, t.canRecognizeWith = function(i) {
    return !!this.simultaneous[i.id];
  }, t.emit = function(i) {
    var r = this, n = this.state;
    function o(a) {
      r.manager.emit(a, i);
    }
    n < Kr && o(r.options.event + id(n)), o(r.options.event), i.additionalEvent && o(i.additionalEvent), n >= Kr && o(r.options.event + id(n));
  }, t.tryEmit = function(i) {
    if (this.canEmit())
      return this.emit(i);
    this.state = lr;
  }, t.canEmit = function() {
    for (var i = 0; i < this.requireFail.length; ) {
      if (!(this.requireFail[i].state & (lr | ka)))
        return !1;
      i++;
    }
    return !0;
  }, t.recognize = function(i) {
    var r = Ln({}, i);
    if (!al(this.options.enable, [this, r])) {
      this.reset(), this.state = lr;
      return;
    }
    this.state & (kr | zo | lr) && (this.state = ka), this.state = this.process(r), this.state & ($i | Cs | Kr | zo) && this.tryEmit(r);
  }, t.process = function(i) {
  }, t.getTouchAction = function() {
  }, t.reset = function() {
  }, s;
}(), zh = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Zi({
      event: "tap",
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, i)) || this, r.pTime = !1, r.pCenter = !1, r._timer = null, r._input = null, r.count = 0, r;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [Rh];
  }, e.process = function(r) {
    var n = this, o = this.options, a = r.pointers.length === o.pointers, h = r.distance < o.threshold, c = r.deltaTime < o.time;
    if (this.reset(), r.eventType & oi && this.count === 0)
      return this.failTimeout();
    if (h && c && a) {
      if (r.eventType !== we)
        return this.failTimeout();
      var u = this.pTime ? r.timeStamp - this.pTime < o.interval : !0, d = !this.pCenter || Za(this.pCenter, r.center) < o.posThreshold;
      this.pTime = r.timeStamp, this.pCenter = r.center, !d || !u ? this.count = 1 : this.count += 1, this._input = r;
      var f = this.count % o.taps;
      if (f === 0)
        return this.hasRequireFailures() ? (this._timer = setTimeout(function() {
          n.state = kr, n.tryEmit();
        }, o.interval), $i) : kr;
    }
    return lr;
  }, e.failTimeout = function() {
    var r = this;
    return this._timer = setTimeout(function() {
      r.state = lr;
    }, this.options.interval), lr;
  }, e.reset = function() {
    clearTimeout(this._timer);
  }, e.emit = function() {
    this.state === kr && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
  }, t;
}(Vo), Ps = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Zi({
      pointers: 1
    }, i)) || this;
  }
  var e = t.prototype;
  return e.attrTest = function(r) {
    var n = this.options.pointers;
    return n === 0 || r.pointers.length === n;
  }, e.process = function(r) {
    var n = this.state, o = r.eventType, a = n & ($i | Cs), h = this.attrTest(r);
    return a && (o & pi || !h) ? n | zo : a || h ? o & we ? n | Kr : n & $i ? n | Cs : $i : lr;
  }, t;
}(Vo);
function Rp(s) {
  return s === Es ? "down" : s === Xo ? "up" : s === Uo ? "left" : s === qo ? "right" : "";
}
var Ac = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Zi({
      event: "pan",
      threshold: 10,
      pointers: 1,
      direction: Ep
    }, i)) || this, r.pX = null, r.pY = null, r;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    var r = this.options.direction, n = [];
    return r & ur && n.push(Do), r & Pn && n.push(Lo), n;
  }, e.directionTest = function(r) {
    var n = this.options, o = !0, a = r.distance, h = r.direction, c = r.deltaX, u = r.deltaY;
    return h & n.direction || (n.direction & ur ? (h = c === 0 ? Ka : c < 0 ? Uo : qo, o = c !== this.pX, a = Math.abs(r.deltaX)) : (h = u === 0 ? Ka : u < 0 ? Xo : Es, o = u !== this.pY, a = Math.abs(r.deltaY))), r.direction = h, o && a > n.threshold && h & n.direction;
  }, e.attrTest = function(r) {
    return Ps.prototype.attrTest.call(this, r) && // replace with a super call
    (this.state & $i || !(this.state & $i) && this.directionTest(r));
  }, e.emit = function(r) {
    this.pX = r.deltaX, this.pY = r.deltaY;
    var n = Rp(r.direction);
    n && (r.additionalEvent = this.options.event + n), s.prototype.emit.call(this, r);
  }, t;
}(Ps), kc = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Zi({
      event: "swipe",
      threshold: 10,
      velocity: 0.3,
      direction: ur | Pn,
      pointers: 1
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return Ac.prototype.getTouchAction.call(this);
  }, e.attrTest = function(r) {
    var n = this.options.direction, o;
    return n & (ur | Pn) ? o = r.overallVelocity : n & ur ? o = r.overallVelocityX : n & Pn && (o = r.overallVelocityY), s.prototype.attrTest.call(this, r) && n & r.offsetDirection && r.distance > this.options.threshold && r.maxPointers === this.options.pointers && Dn(o) > this.options.velocity && r.eventType & we;
  }, e.emit = function(r) {
    var n = Rp(r.offsetDirection);
    n && this.manager.emit(this.options.event + n, r), this.manager.emit(this.options.event, r);
  }, t;
}(Ps), Np = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Zi({
      event: "pinch",
      threshold: 0,
      pointers: 2
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [Cn];
  }, e.attrTest = function(r) {
    return s.prototype.attrTest.call(this, r) && (Math.abs(r.scale - 1) > this.options.threshold || this.state & $i);
  }, e.emit = function(r) {
    if (r.scale !== 1) {
      var n = r.scale < 1 ? "in" : "out";
      r.additionalEvent = this.options.event + n;
    }
    s.prototype.emit.call(this, r);
  }, t;
}(Ps), zp = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Zi({
      event: "rotate",
      threshold: 0,
      pointers: 2
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [Cn];
  }, e.attrTest = function(r) {
    return s.prototype.attrTest.call(this, r) && (Math.abs(r.rotation) > this.options.threshold || this.state & $i);
  }, t;
}(Ps), Fp = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Zi({
      event: "press",
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, i)) || this, r._timer = null, r._input = null, r;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [xp];
  }, e.process = function(r) {
    var n = this, o = this.options, a = r.pointers.length === o.pointers, h = r.distance < o.threshold, c = r.deltaTime > o.time;
    if (this._input = r, !h || !a || r.eventType & (we | pi) && !c)
      this.reset();
    else if (r.eventType & oi)
      this.reset(), this._timer = setTimeout(function() {
        n.state = kr, n.tryEmit();
      }, o.time);
    else if (r.eventType & we)
      return kr;
    return lr;
  }, e.reset = function() {
    clearTimeout(this._timer);
  }, e.emit = function(r) {
    this.state === kr && (r && r.eventType & we ? this.manager.emit(this.options.event + "up", r) : (this._input.timeStamp = xc(), this.manager.emit(this.options.event, this._input)));
  }, t;
}(Vo), Hp = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: !1,
  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: Tp,
  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: !0,
  /**
   * @private
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,
  /**
   * @private
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,
  /**
   * @private
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * @private
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: "none",
    /**
     * @private
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: "none",
    /**
     * @private
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: "none",
    /**
     * @private
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: "none",
    /**
     * @private
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: "none",
    /**
     * @private
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: "rgba(0,0,0,0)"
  }
}, rd = [[zp, {
  enable: !1
}], [Np, {
  enable: !1
}, ["rotate"]], [kc, {
  direction: ur
}], [Ac, {
  direction: ur
}, ["swipe"]], [zh], [zh, {
  event: "doubletap",
  taps: 2
}, ["tap"]], [Fp]], C0 = 1, nd = 2;
function sd(s, t) {
  var e = s.element;
  if (e.style) {
    var i;
    Ar(s.options.cssProps, function(r, n) {
      i = ol(e.style, n), t ? (s.oldCssProps[i] = e.style[i], e.style[i] = r) : e.style[i] = s.oldCssProps[i] || "";
    }), t || (s.oldCssProps = {});
  }
}
function P0(s, t) {
  var e = document.createEvent("Event");
  e.initEvent(s, !0, !0), e.gesture = t, t.target.dispatchEvent(e);
}
var Fh = /* @__PURE__ */ function() {
  function s(e, i) {
    var r = this;
    this.options = Ln({}, Hp, i || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = x0(this), this.touchAction = new Pp(this, this.options.touchAction), sd(this, !0), Ar(this.options.recognizers, function(n) {
      var o = r.add(new n[0](n[1]));
      n[2] && o.recognizeWith(n[2]), n[3] && o.requireFailure(n[3]);
    }, this);
  }
  var t = s.prototype;
  return t.set = function(i) {
    return Ln(this.options, i), i.touchAction && this.touchAction.update(), i.inputTarget && (this.input.destroy(), this.input.target = i.inputTarget, this.input.init()), this;
  }, t.stop = function(i) {
    this.session.stopped = i ? nd : C0;
  }, t.recognize = function(i) {
    var r = this.session;
    if (!r.stopped) {
      this.touchAction.preventDefaults(i);
      var n, o = this.recognizers, a = r.curRecognizer;
      (!a || a && a.state & kr) && (r.curRecognizer = null, a = null);
      for (var h = 0; h < o.length; )
        n = o[h], r.stopped !== nd && // 1
        (!a || n === a || // 2
        n.canRecognizeWith(a)) ? n.recognize(i) : n.reset(), !a && n.state & ($i | Cs | Kr) && (r.curRecognizer = n, a = n), h++;
    }
  }, t.get = function(i) {
    if (i instanceof Vo)
      return i;
    for (var r = this.recognizers, n = 0; n < r.length; n++)
      if (r[n].options.event === i)
        return r[n];
    return null;
  }, t.add = function(i) {
    if (rs(i, "add", this))
      return this;
    var r = this.get(i.options.event);
    return r && this.remove(r), this.recognizers.push(i), i.manager = this, this.touchAction.update(), i;
  }, t.remove = function(i) {
    if (rs(i, "remove", this))
      return this;
    var r = this.get(i);
    if (i) {
      var n = this.recognizers, o = Rn(n, r);
      o !== -1 && (n.splice(o, 1), this.touchAction.update());
    }
    return this;
  }, t.on = function(i, r) {
    if (i === void 0 || r === void 0)
      return this;
    var n = this.handlers;
    return Ar(Ro(i), function(o) {
      n[o] = n[o] || [], n[o].push(r);
    }), this;
  }, t.off = function(i, r) {
    if (i === void 0)
      return this;
    var n = this.handlers;
    return Ar(Ro(i), function(o) {
      r ? n[o] && n[o].splice(Rn(n[o], r), 1) : delete n[o];
    }), this;
  }, t.emit = function(i, r) {
    this.options.domEvents && P0(i, r);
    var n = this.handlers[i] && this.handlers[i].slice();
    if (!(!n || !n.length)) {
      r.type = i, r.preventDefault = function() {
        r.srcEvent.preventDefault();
      };
      for (var o = 0; o < n.length; )
        n[o](r), o++;
    }
  }, t.destroy = function() {
    this.element && sd(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
  }, s;
}(), O0 = {
  touchstart: oi,
  touchmove: Fn,
  touchend: we,
  touchcancel: pi
}, A0 = "touchstart", k0 = "touchstart touchmove touchend touchcancel", I0 = /* @__PURE__ */ function(s) {
  Wi(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evTarget = A0, r.evWin = k0, i = s.apply(this, arguments) || this, i.started = !1, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = O0[r.type];
    if (n === oi && (this.started = !0), !!this.started) {
      var o = M0.call(this, r, n);
      n & (we | pi) && o[0].length - o[1].length === 0 && (this.started = !1), this.callback(this.manager, n, {
        pointers: o[0],
        changedPointers: o[1],
        pointerType: Wo,
        srcEvent: r
      });
    }
  }, t;
}(Os);
function M0(s, t) {
  var e = No(s.touches), i = No(s.changedTouches);
  return t & (we | pi) && (e = Cc(e.concat(i), "identifier", !0)), [e, i];
}
function $p(s, t, e) {
  var i = "DEPRECATED METHOD: " + t + `
` + e + ` AT 
`;
  return function() {
    var r = new Error("get-stack-trace"), n = r && r.stack ? r.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", o = window.console && (window.console.warn || window.console.log);
    return o && o.call(window.console, i, n), s.apply(this, arguments);
  };
}
var Bp = $p(function(s, t, e) {
  for (var i = Object.keys(t), r = 0; r < i.length; )
    (!e || e && s[i[r]] === void 0) && (s[i[r]] = t[i[r]]), r++;
  return s;
}, "extend", "Use `assign`."), L0 = $p(function(s, t) {
  return Bp(s, t, !0);
}, "merge", "Use `assign`.");
function D0(s, t, e) {
  var i = t.prototype, r;
  r = s.prototype = Object.create(i), r.constructor = s, r._super = i, e && Ln(r, e);
}
function od(s, t) {
  return function() {
    return s.apply(t, arguments);
  };
}
var R0 = /* @__PURE__ */ function() {
  var s = (
    /**
      * @private
      * @const {string}
      */
    function(e, i) {
      return i === void 0 && (i = {}), new Fh(e, Zi({
        recognizers: rd.concat()
      }, i));
    }
  );
  return s.VERSION = "2.0.17-rc", s.DIRECTION_ALL = Ep, s.DIRECTION_DOWN = Es, s.DIRECTION_LEFT = Uo, s.DIRECTION_RIGHT = qo, s.DIRECTION_UP = Xo, s.DIRECTION_HORIZONTAL = ur, s.DIRECTION_VERTICAL = Pn, s.DIRECTION_NONE = Ka, s.DIRECTION_DOWN = Es, s.INPUT_START = oi, s.INPUT_MOVE = Fn, s.INPUT_END = we, s.INPUT_CANCEL = pi, s.STATE_POSSIBLE = ka, s.STATE_BEGAN = $i, s.STATE_CHANGED = Cs, s.STATE_ENDED = Kr, s.STATE_RECOGNIZED = kr, s.STATE_CANCELLED = zo, s.STATE_FAILED = lr, s.Manager = Fh, s.Input = Os, s.TouchAction = Pp, s.TouchInput = Pc, s.MouseInput = Oc, s.PointerEventInput = Lp, s.TouchMouseInput = Dp, s.SingleTouchInput = I0, s.Recognizer = Vo, s.AttrRecognizer = Ps, s.Tap = zh, s.Pan = Ac, s.Swipe = kc, s.Pinch = Np, s.Rotate = zp, s.Press = Fp, s.on = _o, s.off = vo, s.each = Ar, s.merge = L0, s.extend = Bp, s.bindFn = od, s.assign = Ln, s.inherit = D0, s.bindFn = od, s.prefixed = ol, s.toArray = No, s.inArray = Rn, s.uniqueArray = Cc, s.splitStr = Ro, s.boolOrFn = al, s.hasParent = Ec, s.addEventListeners = _o, s.removeEventListeners = vo, s.defaults = Ln({}, Hp, {
    preset: rd
  }), s;
}();
R0.defaults;
var _a = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yp(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var js = { exports: {} };
js.exports;
var ad;
function N0() {
  return ad || (ad = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", r = 800, n = 16, o = 9007199254740991, a = "[object Arguments]", h = "[object Array]", c = "[object AsyncFunction]", u = "[object Boolean]", d = "[object Date]", f = "[object Error]", l = "[object Function]", g = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", C = "[object Null]", v = "[object Object]", x = "[object Proxy]", S = "[object RegExp]", w = "[object Set]", M = "[object String]", O = "[object Undefined]", k = "[object WeakMap]", D = "[object ArrayBuffer]", z = "[object DataView]", W = "[object Float32Array]", F = "[object Float64Array]", B = "[object Int8Array]", Q = "[object Int16Array]", et = "[object Int32Array]", X = "[object Uint8Array]", U = "[object Uint8ClampedArray]", nt = "[object Uint16Array]", ot = "[object Uint32Array]", b = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, rt = /^(?:0|[1-9]\d*)$/, G = {};
    G[W] = G[F] = G[B] = G[Q] = G[et] = G[X] = G[U] = G[nt] = G[ot] = !0, G[a] = G[h] = G[D] = G[u] = G[z] = G[d] = G[f] = G[l] = G[p] = G[_] = G[v] = G[S] = G[w] = G[M] = G[k] = !1;
    var st = typeof _a == "object" && _a && _a.Object === Object && _a, Gt = typeof self == "object" && self && self.Object === Object && self, Tt = st || Gt || Function("return this")(), Dt = t && !t.nodeType && t, gt = Dt && !0 && s && !s.nodeType && s, ee = gt && gt.exports === Dt, oe = ee && st.process, Ft = function() {
      try {
        var m = gt && gt.require && gt.require("util").types;
        return m || oe && oe.binding && oe.binding("util");
      } catch {
      }
    }(), Xt = Ft && Ft.isTypedArray;
    function ft(m, T, L) {
      switch (L.length) {
        case 0:
          return m.call(T);
        case 1:
          return m.call(T, L[0]);
        case 2:
          return m.call(T, L[0], L[1]);
        case 3:
          return m.call(T, L[0], L[1], L[2]);
      }
      return m.apply(T, L);
    }
    function pt(m, T) {
      for (var L = -1, Z = Array(m); ++L < m; )
        Z[L] = T(L);
      return Z;
    }
    function lt(m) {
      return function(T) {
        return m(T);
      };
    }
    function ke(m, T) {
      return m == null ? void 0 : m[T];
    }
    function A(m, T) {
      return function(L) {
        return m(T(L));
      };
    }
    var Ht = Array.prototype, je = Function.prototype, Re = Object.prototype, Rt = Tt["__core-js_shared__"], zt = je.toString, de = Re.hasOwnProperty, Ze = function() {
      var m = /[^.]+$/.exec(Rt && Rt.keys && Rt.keys.IE_PROTO || "");
      return m ? "Symbol(src)_1." + m : "";
    }(), Kt = Re.toString, ae = zt.call(Object), At = RegExp(
      "^" + zt.call(de).replace(b, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), fe = ee ? Tt.Buffer : void 0, Ne = Tt.Symbol, $e = Tt.Uint8Array;
    fe && fe.allocUnsafe;
    var Qi = A(Object.getPrototypeOf, Object), Vt = Object.create, Ji = Re.propertyIsEnumerable, ai = Ht.splice, be = Ne ? Ne.toStringTag : void 0, ze = function() {
      try {
        var m = ul(Object, "defineProperty");
        return m({}, "", {}), m;
      } catch {
      }
    }(), Oi = fe ? fe.isBuffer : void 0, Be = Math.max, at = Date.now, Ye = ul(Tt, "Map"), Nt = ul(Object, "create"), Ie = /* @__PURE__ */ function() {
      function m() {
      }
      return function(T) {
        if (!mr(T))
          return {};
        if (Vt)
          return Vt(T);
        m.prototype = T;
        var L = new m();
        return m.prototype = void 0, L;
      };
    }();
    function ne(m) {
      var T = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++T < L; ) {
        var Z = m[T];
        this.set(Z[0], Z[1]);
      }
    }
    function Ai() {
      this.__data__ = Nt ? Nt(null) : {}, this.size = 0;
    }
    function j(m) {
      var T = this.has(m) && delete this.__data__[m];
      return this.size -= T ? 1 : 0, T;
    }
    function y(m) {
      var T = this.__data__;
      if (Nt) {
        var L = T[m];
        return L === i ? void 0 : L;
      }
      return de.call(T, m) ? T[m] : void 0;
    }
    function $(m) {
      var T = this.__data__;
      return Nt ? T[m] !== void 0 : de.call(T, m);
    }
    function E(m, T) {
      var L = this.__data__;
      return this.size += this.has(m) ? 0 : 1, L[m] = Nt && T === void 0 ? i : T, this;
    }
    ne.prototype.clear = Ai, ne.prototype.delete = j, ne.prototype.get = y, ne.prototype.has = $, ne.prototype.set = E;
    function P(m) {
      var T = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++T < L; ) {
        var Z = m[T];
        this.set(Z[0], Z[1]);
      }
    }
    function H() {
      this.__data__ = [], this.size = 0;
    }
    function I(m) {
      var T = this.__data__, L = pr(T, m);
      if (L < 0)
        return !1;
      var Z = T.length - 1;
      return L == Z ? T.pop() : ai.call(T, L, 1), --this.size, !0;
    }
    function Y(m) {
      var T = this.__data__, L = pr(T, m);
      return L < 0 ? void 0 : T[L][1];
    }
    function R(m) {
      return pr(this.__data__, m) > -1;
    }
    function q(m, T) {
      var L = this.__data__, Z = pr(L, m);
      return Z < 0 ? (++this.size, L.push([m, T])) : L[Z][1] = T, this;
    }
    P.prototype.clear = H, P.prototype.delete = I, P.prototype.get = Y, P.prototype.has = R, P.prototype.set = q;
    function tt(m) {
      var T = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++T < L; ) {
        var Z = m[T];
        this.set(Z[0], Z[1]);
      }
    }
    function V() {
      this.size = 0, this.__data__ = {
        hash: new ne(),
        map: new (Ye || P)(),
        string: new ne()
      };
    }
    function ct(m) {
      var T = jo(this, m).delete(m);
      return this.size -= T ? 1 : 0, T;
    }
    function xt(m) {
      return jo(this, m).get(m);
    }
    function Ot(m) {
      return jo(this, m).has(m);
    }
    function _t(m, T) {
      var L = jo(this, m), Z = L.size;
      return L.set(m, T), this.size += L.size == Z ? 0 : 1, this;
    }
    tt.prototype.clear = V, tt.prototype.delete = ct, tt.prototype.get = xt, tt.prototype.has = Ot, tt.prototype.set = _t;
    function dt(m) {
      var T = this.__data__ = new P(m);
      this.size = T.size;
    }
    function kt() {
      this.__data__ = new P(), this.size = 0;
    }
    function ht(m) {
      var T = this.__data__, L = T.delete(m);
      return this.size = T.size, L;
    }
    function Te(m) {
      return this.__data__.get(m);
    }
    function jt(m) {
      return this.__data__.has(m);
    }
    function xe(m, T) {
      var L = this.__data__;
      if (L instanceof P) {
        var Z = L.__data__;
        if (!Ye || Z.length < e - 1)
          return Z.push([m, T]), this.size = ++L.size, this;
        L = this.__data__ = new tt(Z);
      }
      return L.set(m, T), this.size = L.size, this;
    }
    dt.prototype.clear = kt, dt.prototype.delete = ht, dt.prototype.get = Te, dt.prototype.has = jt, dt.prototype.set = xe;
    function Se(m, T) {
      var L = pl(m), Z = !L && fl(m), St = !L && !Z && Fc(m), It = !L && !Z && !St && $c(m), Zt = L || Z || St || It, Mt = Zt ? pt(m.length, String) : [], Qt = Mt.length;
      for (var qi in m)
        Zt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (qi == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        St && (qi == "offset" || qi == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        It && (qi == "buffer" || qi == "byteLength" || qi == "byteOffset") || // Skip index properties.
        Nc(qi, Qt)) || Mt.push(qi);
      return Mt;
    }
    function pe(m, T, L) {
      (L !== void 0 && !Zo(m[T], L) || L === void 0 && !(T in m)) && ge(m, T, L);
    }
    function fr(m, T, L) {
      var Z = m[T];
      (!(de.call(m, T) && Zo(Z, L)) || L === void 0 && !(T in m)) && ge(m, T, L);
    }
    function pr(m, T) {
      for (var L = m.length; L--; )
        if (Zo(m[L][0], T))
          return L;
      return -1;
    }
    function ge(m, T, L) {
      T == "__proto__" && ze ? ze(m, T, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : m[T] = L;
    }
    var le = pg();
    function Qe(m) {
      return m == null ? m === void 0 ? O : C : be && be in Object(m) ? gg(m) : bg(m);
    }
    function Hn(m) {
      return As(m) && Qe(m) == a;
    }
    function Ko(m) {
      if (!mr(m) || yg(m))
        return !1;
      var T = ml(m) ? At : J;
      return T.test(Eg(m));
    }
    function en(m) {
      return As(m) && Hc(m.length) && !!G[Qe(m)];
    }
    function ki(m) {
      if (!mr(m))
        return wg(m);
      var T = zc(m), L = [];
      for (var Z in m)
        Z == "constructor" && (T || !de.call(m, Z)) || L.push(Z);
      return L;
    }
    function gr(m, T, L, Z, St) {
      m !== T && le(T, function(It, Zt) {
        if (St || (St = new dt()), mr(It))
          $n(m, T, Zt, L, gr, Z, St);
        else {
          var Mt = Z ? Z(dl(m, Zt), It, Zt + "", m, T, St) : void 0;
          Mt === void 0 && (Mt = It), pe(m, Zt, Mt);
        }
      }, Bc);
    }
    function $n(m, T, L, Z, St, It, Zt) {
      var Mt = dl(m, L), Qt = dl(T, L), qi = Zt.get(Qt);
      if (qi) {
        pe(m, L, qi);
        return;
      }
      var gi = It ? It(Mt, Qt, L + "", m, T, Zt) : void 0, ks = gi === void 0;
      if (ks) {
        var _l = pl(Qt), vl = !_l && Fc(Qt), Wc = !_l && !vl && $c(Qt);
        gi = Qt, _l || vl || Wc ? pl(Mt) ? gi = Mt : Cg(Mt) ? gi = ug(Mt) : vl ? (ks = !1, gi = lg(Qt)) : Wc ? (ks = !1, gi = cg(Qt)) : gi = [] : Pg(Qt) || fl(Qt) ? (gi = Mt, fl(Mt) ? gi = Og(Mt) : (!mr(Mt) || ml(Mt)) && (gi = mg(Qt))) : ks = !1;
      }
      ks && (Zt.set(Qt, gi), St(gi, Qt, Z, It, Zt), Zt.delete(Qt)), pe(m, L, gi);
    }
    function Ui(m, T) {
      return xg(Tg(m, T, Yc), m + "");
    }
    var ag = ze ? function(m, T) {
      return ze(m, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Ig(T),
        writable: !0
      });
    } : Yc;
    function lg(m, T) {
      return m.slice();
    }
    function hg(m) {
      var T = new m.constructor(m.byteLength);
      return new $e(T).set(new $e(m)), T;
    }
    function cg(m, T) {
      var L = hg(m.buffer);
      return new m.constructor(L, m.byteOffset, m.length);
    }
    function ug(m, T) {
      var L = -1, Z = m.length;
      for (T || (T = Array(Z)); ++L < Z; )
        T[L] = m[L];
      return T;
    }
    function dg(m, T, L, Z) {
      var St = !L;
      L || (L = {});
      for (var It = -1, Zt = T.length; ++It < Zt; ) {
        var Mt = T[It], Qt = void 0;
        Qt === void 0 && (Qt = m[Mt]), St ? ge(L, Mt, Qt) : fr(L, Mt, Qt);
      }
      return L;
    }
    function fg(m) {
      return Ui(function(T, L) {
        var Z = -1, St = L.length, It = St > 1 ? L[St - 1] : void 0, Zt = St > 2 ? L[2] : void 0;
        for (It = m.length > 3 && typeof It == "function" ? (St--, It) : void 0, Zt && _g(L[0], L[1], Zt) && (It = St < 3 ? void 0 : It, St = 1), T = Object(T); ++Z < St; ) {
          var Mt = L[Z];
          Mt && m(T, Mt, Z, It);
        }
        return T;
      });
    }
    function pg(m) {
      return function(T, L, Z) {
        for (var St = -1, It = Object(T), Zt = Z(T), Mt = Zt.length; Mt--; ) {
          var Qt = Zt[++St];
          if (L(It[Qt], Qt, It) === !1)
            break;
        }
        return T;
      };
    }
    function Rc(m, T, L, Z, St, It) {
      return mr(m) && mr(T) && (It.set(T, m), gr(m, T, void 0, Rc, It), It.delete(T)), m;
    }
    function jo(m, T) {
      var L = m.__data__;
      return vg(T) ? L[typeof T == "string" ? "string" : "hash"] : L.map;
    }
    function ul(m, T) {
      var L = ke(m, T);
      return Ko(L) ? L : void 0;
    }
    function gg(m) {
      var T = de.call(m, be), L = m[be];
      try {
        m[be] = void 0;
        var Z = !0;
      } catch {
      }
      var St = Kt.call(m);
      return Z && (T ? m[be] = L : delete m[be]), St;
    }
    function mg(m) {
      return typeof m.constructor == "function" && !zc(m) ? Ie(Qi(m)) : {};
    }
    function Nc(m, T) {
      var L = typeof m;
      return T = T ?? o, !!T && (L == "number" || L != "symbol" && rt.test(m)) && m > -1 && m % 1 == 0 && m < T;
    }
    function _g(m, T, L) {
      if (!mr(L))
        return !1;
      var Z = typeof T;
      return (Z == "number" ? gl(L) && Nc(T, L.length) : Z == "string" && T in L) ? Zo(L[T], m) : !1;
    }
    function vg(m) {
      var T = typeof m;
      return T == "string" || T == "number" || T == "symbol" || T == "boolean" ? m !== "__proto__" : m === null;
    }
    function yg(m) {
      return !!Ze && Ze in m;
    }
    function zc(m) {
      var T = m && m.constructor, L = typeof T == "function" && T.prototype || Re;
      return m === L;
    }
    function wg(m) {
      var T = [];
      if (m != null)
        for (var L in Object(m))
          T.push(L);
      return T;
    }
    function bg(m) {
      return Kt.call(m);
    }
    function Tg(m, T, L) {
      return T = Be(T === void 0 ? m.length - 1 : T, 0), function() {
        for (var Z = arguments, St = -1, It = Be(Z.length - T, 0), Zt = Array(It); ++St < It; )
          Zt[St] = Z[T + St];
        St = -1;
        for (var Mt = Array(T + 1); ++St < T; )
          Mt[St] = Z[St];
        return Mt[T] = L(Zt), ft(m, this, Mt);
      };
    }
    function dl(m, T) {
      if (!(T === "constructor" && typeof m[T] == "function") && T != "__proto__")
        return m[T];
    }
    var xg = Sg(ag);
    function Sg(m) {
      var T = 0, L = 0;
      return function() {
        var Z = at(), St = n - (Z - L);
        if (L = Z, St > 0) {
          if (++T >= r)
            return arguments[0];
        } else
          T = 0;
        return m.apply(void 0, arguments);
      };
    }
    function Eg(m) {
      if (m != null) {
        try {
          return zt.call(m);
        } catch {
        }
        try {
          return m + "";
        } catch {
        }
      }
      return "";
    }
    function Zo(m, T) {
      return m === T || m !== m && T !== T;
    }
    var fl = Hn(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Hn : function(m) {
      return As(m) && de.call(m, "callee") && !Ji.call(m, "callee");
    }, pl = Array.isArray;
    function gl(m) {
      return m != null && Hc(m.length) && !ml(m);
    }
    function Cg(m) {
      return As(m) && gl(m);
    }
    var Fc = Oi || Mg;
    function ml(m) {
      if (!mr(m))
        return !1;
      var T = Qe(m);
      return T == l || T == g || T == c || T == x;
    }
    function Hc(m) {
      return typeof m == "number" && m > -1 && m % 1 == 0 && m <= o;
    }
    function mr(m) {
      var T = typeof m;
      return m != null && (T == "object" || T == "function");
    }
    function As(m) {
      return m != null && typeof m == "object";
    }
    function Pg(m) {
      if (!As(m) || Qe(m) != v)
        return !1;
      var T = Qi(m);
      if (T === null)
        return !0;
      var L = de.call(T, "constructor") && T.constructor;
      return typeof L == "function" && L instanceof L && zt.call(L) == ae;
    }
    var $c = Xt ? lt(Xt) : en;
    function Og(m) {
      return dg(m, Bc(m));
    }
    var Ag = Ui(function(m) {
      return m.push(void 0, Rc), ft(kg, void 0, m);
    });
    function Bc(m) {
      return gl(m) ? Se(m) : ki(m);
    }
    var kg = fg(function(m, T, L, Z) {
      gr(m, T, L, Z);
    });
    function Ig(m) {
      return function() {
        return m;
      };
    }
    function Yc(m) {
      return m;
    }
    function Mg() {
      return !1;
    }
    s.exports = Ag;
  }(js, js.exports)), js.exports;
}
var z0 = N0();
const qt = /* @__PURE__ */ Yp(z0), F0 = 60, Ns = {}, ld = (s, t = F0) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), r = 1e3 / t;
  Ns[s] = Ns[s] || null;
  const n = Ns[s] ? i - Ns[s] : null;
  (n === null || n > r) && (Ns[s] = i - n % r, s(...e));
});
function Fo() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const Hh = (s, t, e, i, r, n) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${r}:${o}${n})`;
  return window.matchMedia(a).matches ? Hh(o, t, e - 1, i, r, n) : Hh(s, o, e - 1, i, r, n);
}, H0 = (s, t, e, i, r, n) => Hh(e, i, r, n, s, t), $0 = () => Math.round(
  H0("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, B0 = (s) => Math.round(window.devicePixelRatio * 100) - s, Y0 = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Ul = {
  firefox: $0,
  chrome: B0,
  default: Y0
}, hd = {
  calculate: (s, t) => Ul[s] ? Ul[s](t) : Ul.default(t)
}, Ic = "APPLICATION:MOBILE_MENU:OPEN", Mc = "APPLICATION:MOBILE_MENU:CLOSED", Qa = "APPLICATION_PRELUDIUM", $h = "APPLICATION:INITIALIZED", Ho = "APPLICATION:READY", Bi = "APPLICATION:REVEALED", Yi = "APPLICATION:RESIZE", Jr = "APPLICATION:SCROLL", Wp = "APPLICATION:SCROLL_LOCKED", Up = "APPLICATION:SCROLL_RELEASED", ll = "APPLICATION:FORCED_SCROLL_START", hl = "APPLICATION:FORCED_SCROLL_END", cl = "APPLICATION:OUTLINE", qp = "APPLICATION:VISIBILITY_CHANGE", Xp = "APPLICATION:HIDDEN", Vp = "APPLICATION:VISIBLE", Ja = "BREAKPOINT:CHANGE", Lc = "IMAGE:LAZYLOADED", Gp = "IMAGE:REVEALED", Kp = "SECTION:LAZYLOADED", xv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: hl,
  APPLICATION_FORCED_SCROLL_START: ll,
  APPLICATION_HIDDEN: Xp,
  APPLICATION_INITIALIZED: $h,
  APPLICATION_MOBILE_MENU_CLOSED: Mc,
  APPLICATION_MOBILE_MENU_OPEN: Ic,
  APPLICATION_OUTLINE: cl,
  APPLICATION_PRELUDIUM: Qa,
  APPLICATION_READY: Ho,
  APPLICATION_RESIZE: Yi,
  APPLICATION_REVEALED: Bi,
  APPLICATION_SCROLL: Jr,
  APPLICATION_SCROLL_LOCKED: Wp,
  APPLICATION_SCROLL_RELEASED: Up,
  APPLICATION_VISIBILITY_CHANGE: qp,
  APPLICATION_VISIBLE: Vp,
  BREAKPOINT_CHANGE: Ja,
  IMAGE_LAZYLOADED: Lc,
  IMAGE_REVEALED: Gp,
  SECTION_LAZYLOADED: Kp
}, Symbol.toStringTag, { value: "Module" })), W0 = {
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
class cd {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = qt(e, W0), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Qa, () => {
      this.initialize(!1);
    }), window.addEventListener(Bi, () => {
      this.initialize(!0);
    });
  }
  initialize(t = !1) {
    if (!t) {
      this.opts.breakpoints.forEach((i) => {
        this.mediaQueries[i] = this._getVal(`--breakpoint-${i}`);
      });
      const e = Object.keys(this.mediaQueries);
      e.forEach((i) => {
        let r = "";
        const n = e[(e.indexOf(i) + 1) % e.length];
        i === this.opts.breakpoints[0] && this.mediaQueries[i] === "0" ? r = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[n]) - 1}px)` : n === this.opts.breakpoints[0] ? r = `(min-width: ${this.mediaQueries[i]})` : r = `(min-width: ${this.mediaQueries[i]}) and (max-width: ${parseInt(this.mediaQueries[n]) - 1}px)`, this.mediaQueries[i] = window.matchMedia(r);
        const o = (a) => {
          if (a.matches) {
            const h = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), h !== this.currentBreakpoint) {
              const c = new CustomEvent(Ja, {
                detail: {
                  leaveBreakpoint: h,
                  enterBreakpoint: this.currentBreakpoint
                }
              });
              window.dispatchEvent(c);
            }
          }
          Object.prototype.hasOwnProperty.call(this.opts.listeners, i) && this.opts.listeners[i](a);
        };
        this.mediaQueries[i].addListener(o);
      });
    }
    if (this.setCurrentBreakpoint(), t && this.opts.runListenerOnInit && !this.initialized) {
      this.initialized = !0;
      const e = this.getCurrentBreakpoint();
      if (e && e.key && e.mq) {
        const i = {
          matches: e.mq.matches,
          media: e.mq.media,
          target: e.mq
        }, r = new CustomEvent(Ja);
        window.dispatchEvent(r), Object.prototype.hasOwnProperty.call(this.opts.listeners, e.key) && this.opts.listeners[e.key](i);
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
class U0 {
  constructor(t, e) {
    this.app = t, this.testFns = {
      touch: this.testTouch
    }, this.results = {}, this.testIE11() ? this.testFor("ie11", !0) : this.results.ie11 = !1, this.testIOS() ? this.testFor("ios", !0) : this.results.ios = !1, this.testWebview() ? this.testFor("webview", !0) : this.results.webview = !1;
    const i = this.testBrowsers();
    this.results.browser = i, this.app.browser = i, document.documentElement.setAttribute("data-browser", i);
    const n = Object.keys(e).filter((o) => e[o]);
    this.runTests(n), this.bindEventTests();
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
        const e = new window.CustomEvent(cl);
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
    const i = () => {
      this.results.mouse || Date.now() - this.devicelastTouched > 300 && (this.results.touch = !1, this.results.mouse = !0, this.testFor("touch", !1), this.testFor("mouse", !0));
    };
    document.addEventListener("mousemove", i, !1);
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
    let t = "unknown", e = !1, i = !1;
    return navigator.userAgent.indexOf("Chrome") > -1 && (t = "chrome", e = !0), navigator.userAgent.indexOf("MSIE") > -1 && (t = "ie"), navigator.userAgent.indexOf("Firefox") > -1 && (t = "firefox"), navigator.userAgent.indexOf("Safari") > -1 && (t = "safari", i = !0), e && i && (t = "chrome"), t;
  }
  testWebview() {
    return navigator.userAgent.match(/FBAN|FBAV|instagram|facebook|messenger/i);
  }
}
class q0 {
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
class X0 {
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
    const i = document.createElement(t);
    return this.addClass(i, ...e), i;
  }
  append(t) {
    document.body.appendChild(t);
  }
  remove(t) {
    t.remove();
  }
  addClass(t, ...e) {
    return e.forEach((i) => {
      t.classList.add(i);
    }), t;
  }
  removeClass(t, ...e) {
    return e.forEach((i) => {
      t.classList.remove(i);
    }), t;
  }
  hasClass(t, e) {
    return t.classList.contains(e);
  }
  toggleClass(t, ...e) {
    return e.map((i) => t.classList.toggle(i));
  }
  hasAttribute(t, e) {
    return t.hasAttribute(e);
  }
  overlapsVertically(t, e) {
    const i = t.getBoundingClientRect(), r = this.outerHeight(t), n = i.top + r, o = e.getBoundingClientRect(), a = this.outerHeight(e), h = o.top + a;
    return n > o.top ? n - o.top : i.top > h ? i.top - h : 0;
  }
  outerHeight(t) {
    let e = t.offsetHeight;
    const i = getComputedStyle(t);
    return e += parseInt(i.marginTop) + parseInt(i.marginBottom), e;
  }
  outerWidth(t) {
    let e = t.offsetWidth;
    const i = getComputedStyle(t);
    return e += parseInt(i.marginLeft) + parseInt(i.marginRight), e;
  }
  getCSSVar(t, e = document.documentElement) {
    return getComputedStyle(e).getPropertyValue(t).trim();
  }
  setCSSVar(t, e, i = document.documentElement) {
    i.style.setProperty(`--${t}`, e);
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
    const e = t.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, r = window.innerWidth || document.documentElement.clientWidth, n = e.top <= i && e.top + e.height >= 0, o = e.left <= r && e.left + e.width >= 0;
    return n && o;
  }
}
const it = new X0();
N.registerPlugin(zn);
N.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  if (s.persisted) {
    const t = document.querySelector("#fader");
    t && N.to(t, { duration: 0.35, autoAlpha: 0 });
    const e = document.querySelectorAll("[data-fader]");
    e.length && N.to(e, { duration: 0.35, autoAlpha: 0 }), N.set(document.body, { clearProps: "opacity" });
    const i = it.find("header[data-nav]");
    N.set(i, { clearProps: "opacity" });
    const r = it.find("main");
    N.set(r, { clearProps: "opacity" });
    const n = it.find("footer");
    N.set(n, { clearProps: "opacity" });
  }
};
const V0 = {
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
  bindScroll: !0,
  bindResize: !0,
  // Big Sur + Safari 14 is now trying to display webp, but fails intermittently
  disableWebpSafari: !0,
  faderOpts: {
    fadeIn: (s = () => {
    }) => {
      const t = document.querySelector("#fader");
      if (!t) {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), s();
        return;
      }
      N.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), N.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class Sv {
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
    }, this.opts = qt(t, V0), this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new U0(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new cd(this, this.opts.breakpointConfig) : this.breakpoints = new cd(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new q0(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = Fo(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (N.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(
      Ja,
      this.onBreakpointChanged.bind(this)
    ), this.beforeInitializedEvent = new window.CustomEvent(
      Qa,
      this
    ), this.initializedEvent = new window.CustomEvent(
      $h,
      this
    ), this.readyEvent = new window.CustomEvent(Ho, this), this.revealedEvent = new window.CustomEvent(
      Bi,
      this
    ), document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this)
    ), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", ld(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", ld(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Qa), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks($h), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(Ho), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        ), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), N.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = hd.calculate(this.browser);
    }
  }
  zoomCalculateChrome(t) {
    if (t) {
      const e = Math.round(window.devicePixelRatio * 100), i = (e - this._lastDevicePixelRatio) / 100;
      this.size.zoom += i, this.size.zoom === 0 && (this.size.zoom = 1), this._lastDevicePixelRatio = e;
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (hd.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(
          Math.max(this._initialZoom - e, 1),
          2
        );
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(Wp, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, N.set(document.body, { overflow: "hidden" }), N.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(Up, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, N.set(document.body, { overflow: t }), N.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
  }
  /**
   *
   * @param {*} target
   * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
   * @param {*} time
   * @param {*} emitEvents
   */
  scrollTo(t, e = 0.8, i = !0, r = "sine.inOut") {
    let n;
    const o = new window.CustomEvent(
      ll
    );
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? n = t : n = { y: t, autoKill: !1 }, N.to(window, {
      duration: e,
      scrollTo: n,
      onComplete: () => {
        const a = new window.CustomEvent(
          hl
        );
        i && (window.dispatchEvent(a), requestAnimationFrame(() => this.state.forcedScroll = !1));
      },
      ease: r
    });
  }
  hardScrollToTop() {
    window.scrollTo(0, 0);
  }
  hardScrollTo(t) {
    const e = it.find(t);
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
      console.debug("==> disable webp");
      const t = it.all('source[type="image/webp"]');
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
      let r = document.createElement("div");
      r.style.position = "fixed", r.style.height = "100vh", r.style.width = 0, r.style.top = 0, document.documentElement.appendChild(r), e.w = t === 90 ? r.offsetHeight : window.innerWidth, e.h = t === 90 ? window.innerWidth : r.offsetHeight, document.documentElement.removeChild(r), r = null;
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Bi));
  }
  _getBaseVW() {
    const t = it.getCSSVar("--font-base-px"), e = parseFloat(t, 10), i = window.innerWidth;
    return `${e / i * 100}vw`;
  }
  setDims() {
    const t = document.querySelector(":root");
    this.size.initialInnerHeight = window.innerHeight, this.size.initialOuterHeight = window.outerHeight, this.size.initialInnerWidth = window.innerWidth, this.size.initialOuterWidth = window.outerWidth, this.size.scrollHeight = document.body.scrollHeight, t.style.setProperty(
      "--vp-initial-inner-h",
      `${this.size.initialInnerHeight}px`
    ), t.style.setProperty(
      "--vp-initial-outer-h",
      `${this.size.initialOuterHeight}px`
    ), t.style.setProperty(
      "--vp-initial-inner-w",
      `${this.size.initialInnerWidth}px`
    ), t.style.setProperty(
      "--vp-initial-outer-w",
      `${this.size.initialOuterWidth}px`
    ), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = it.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
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
    this.size.container = it.getCSSVar("--container-padding");
  }
  /**
   * RAF'ed resize event
   */
  onResize(t) {
    const e = this.size.width !== window.innerWidth, i = this.size.height !== window.innerHeight, r = e || i, n = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(r, n), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
    const o = new CustomEvent(Yi, {
      detail: { widthChanged: e, heightChanged: i }
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
    }, i = new CustomEvent(Jr, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(qp, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(Xp, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(Vp, t), window.dispatchEvent(e));
  }
  pollForElement(t, e = 500, i = () => {
  }) {
    const r = document.querySelector(t);
    r !== null ? i(r) : setTimeout(() => {
      this.pollForElement(t, e, i);
    }, e);
  }
  pollForVar(t, e = 500, i = () => {
  }) {
    t !== null ? i(t) : setTimeout(() => {
      this.pollForVar(t, e, i);
    }, e);
  }
  setupDebug() {
    if (this.setupGridoverlay(), this.debugOverlay = document.querySelector(".dbg-breakpoints"), !this.debugOverlay)
      return;
    this.debugOverlay.addEventListener("click", this.toggleDebug.bind(this));
    const t = this.debugOverlay.querySelector(".user-agent");
    N.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
    const e = t.querySelector("span"), i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    e.addEventListener("click", () => {
      const n = t.querySelector("b"), o = document.createElement("textarea");
      o.value = `
${n.textContent}
SCREEN >> ${window.screen.width}x${window.screen.height}
WINDOW >> ${i}x${r}

FEATURES >>
${JSON.stringify(this.featureTests.results, void 0, 2)}
      `, document.body.appendChild(o), o.select(), document.execCommand("Copy"), o.remove(), e.innerHTML = "OK!", setTimeout(() => {
        e.innerHTML = "KOPIER";
      }, 1500);
    });
  }
  toggleDebug() {
    const t = N.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          N.set([e, i], { display: "none" });
        });
        break;
      case 1:
        N.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        N.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
          duration: 0.3,
          autoAlpha: 1
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
        const i = it.find(".dbg-grid"), r = it.all(i, "b");
        if (!i || !r)
          return;
        it.hasClass(i, "visible") ? (N.set(r, { width: "auto" }), N.to(r, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (N.set(r, { width: 0 }), i.classList.toggle("visible"), N.to(r, {
          duration: 0.35,
          width: "100%",
          stagger: 0.02,
          ease: "sine.inOut"
        }));
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
const G0 = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = N.timeline();
    s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s), e.to(s.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(s.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(s.cc, { display: "none" });
  },
  onRefuse: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = N.timeline();
    s.setCookie("COOKIES_CONSENT_STATUS", 0, t, "/"), e.to(s.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(s.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(s.cc, { display: "none" });
  },
  alreadyConsented: (s) => {
  },
  alreadyRefused: (s) => {
  },
  setCookies: (s) => {
  },
  showCC: (s) => {
    if (s.hasCookie("COOKIES_CONSENT_STATUS")) {
      s.getCookie("COOKIES_CONSENT_STATUS") === "1" ? s.opts.alreadyConsented(s) : s.opts.alreadyRefused(s);
      return;
    }
    N.timeline().fromTo(
      s.cc,
      {
        duration: 0.5,
        y: "120%",
        display: "block"
      },
      {
        duration: 0.5,
        y: "0%",
        delay: "0.5",
        ease: "power3.out"
      },
      "0.5"
    ).fromTo(
      s.text,
      {
        duration: 0.7,
        opacity: 0
      },
      {
        duration: 0.7,
        opacity: 1,
        ease: "power3.out"
      },
      "-=0.35"
    ).fromTo(
      s.btns,
      {
        duration: 0.7,
        opacity: 0
      },
      {
        duration: 0.7,
        opacity: 1,
        ease: "power3.out"
      },
      "-=0.35"
    );
  }
};
class Ev {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, G0), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Bi, () => {
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
  setCookie(t, e, i, r, n, o) {
    if (!t || /^(?:expires|max-age|path|domain|secure)$/i.test(t))
      return !1;
    let a = "";
    if (i)
      switch (i.constructor) {
        case Number:
          a = i === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : `; max-age=${i}`;
          break;
        case String:
          a = `; expires=${i}`;
          break;
        case Date:
          a = `; expires=${i.toUTCString()}`;
          break;
      }
    return document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)}${a}${n ? `; domain=${n}` : ""}${r ? `; path=${r}` : ""}${o ? "; secure" : ""}`, !0;
  }
  /**
   * Remove a cookie
   * @param {string} sKey - Cookie key
   * @param {string} [sPath] - Cookie path
   * @param {string} [sDomain] - Cookie domain
   * @returns {boolean} Whether cookie was removed successfully
   */
  removeCookie(t, e, i) {
    return this.hasCookie(t) ? (document.cookie = `${encodeURIComponent(t)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${i ? `; domain=${i}` : ""}${e ? `; path=${e}` : ""}`, !0) : !1;
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
    for (let e = t.length, i = 0; i < e; i += 1)
      t[i] = decodeURIComponent(t[i]);
    return t;
  }
}
const K0 = {};
class Cv {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, K0), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-cover-overlay]");
    Array.from(t).forEach((e) => {
      let i;
      const r = e.querySelector(".picture-wrapper"), n = e.querySelector("[data-cover-overlay-button]"), o = e.querySelector("iframe");
      o && o.setAttribute(
        "allow",
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ), e.hasAttribute("data-cover-overlay-vimeo-play") && (window.Vimeo && o ? i = new window.Vimeo.Player(o) : console.error("==> JUPITER// Missing vimeo JS or iframe")), n.addEventListener("click", () => {
        N.timeline().set(o, { opacity: 1 }).to(n, { duration: 0.5, opacity: 0, ease: "sine.in" }).to(r, { duration: 1, opacity: 0, ease: "sine.in" }).set(r, { display: "none" }).call(() => {
          i && i.play();
        });
      });
    });
  }
}
const j0 = {
  page: 0,
  loaderParam: {},
  filter: "",
  onFetch: (s) => {
  }
};
class Pv {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = it.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = it.find(e, "[data-loader-canvas]"), !this.$canvasEl && e.dataset.loaderId && (this.id = e.dataset.loaderId, this.$canvasEl = it.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = qt(i, j0), this.initialize();
  }
  static replaceInnerHTML(t, e) {
    return new Promise((i) => {
      fetch(e).then((r) => r.text()).then((r) => (t.innerHTML = r, i(t)));
    });
  }
  debounce(t, e = 650) {
    let i;
    return (...r) => {
      clearTimeout(i), i = setTimeout(() => {
        t.apply(this, r);
      }, e);
    };
  }
  updateBaseURL(t) {
    this.baseURL = t;
  }
  initialize() {
    this.baseURL = this.$el.dataset.loader, this.$paramEls = it.all(this.$el, "[data-loader-param]"), this.$paramEls.forEach((t) => {
      t.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = it.find(this.$el, "[data-loader-more]"), !this.$moreBtn && this.$el.dataset.loaderId && (this.id = this.$el.dataset.loaderId, this.$moreBtn = it.find(`[data-loader-more-for="${this.id}"]`)), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = it.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.$el.dataset.loaderId && (this.id = this.$el.dataset.loaderId, this.$filterInput = it.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener("input", this.debounce(this.onFilterInput.bind(this)));
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
      const i = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[i] = t.currentTarget.checked;
    } else if (t.preventDefault(), t.currentTarget.hasAttribute("data-loader-param-selected")) {
      const i = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      e ? this.opts.loaderParam[i] = this.opts.loaderParam[i].filter((r) => r !== t.currentTarget.dataset.loaderParam) : delete this.opts.loaderParam[i], t.currentTarget.removeAttribute("data-loader-param-selected");
    } else if (e) {
      const i = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam.hasOwnProperty(i) || (this.opts.loaderParam[i] = []), this.opts.loaderParam[i].push(t.currentTarget.dataset.loaderParam), t.currentTarget.setAttribute("data-loader-param-selected", "");
    } else {
      const i = t.currentTarget.dataset.loaderParamKey;
      this.$paramEls.forEach((n) => {
        i ? n.dataset.loaderParamKey === i && n.removeAttribute("data-loader-param-selected") : n.removeAttribute("data-loader-param-selected");
      }), t.currentTarget.setAttribute("data-loader-param-selected", "");
      const r = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[r] = t.currentTarget.dataset.loaderParam;
    }
    this.fetch();
  }
  fetch(t = !1) {
    const { defaultParam: e, ...i } = this.opts.loaderParam, r = this.opts.filter;
    fetch(
      `${this.baseURL}/${e ? e + "/" : ""}${this.opts.page}?` + new URLSearchParams({ filter: r, ...i })
    ).then((n) => (this.status = n.headers.get("jpt-dataloader") || "available", this.updateButton(), n.text())).then((n) => {
      t ? this.$canvasEl.innerHTML += n : this.$canvasEl.innerHTML = n, this.opts.onFetch(this), this.complete();
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
const Z0 = {
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
  onBeforeOpen: async (s) => {
  },
  onAfterOpen: async (s) => {
  },
  onBeforeClose: async (s) => {
  },
  onAfterClose: async (s) => {
  }
};
class Ov {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, Z0), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = N.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = it.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
      const i = this.elements.trigger.getAttribute(
        "data-dropdown-target"
      );
      this.elements.menu = it.find(i);
    } else
      this.elements.menu = it.find(this.element, this.opts.selectors.menu);
    this.elements.menuItems = it.all(
      this.elements.menu,
      this.opts.selectors.menuItems
    ), this.handleDocumentClick = this.handleDocumentClick.bind(this), this.initialize(), this.checkForInitialOpen();
  }
  initialize() {
    this.timeline.set(this.elements.menu, { display: "none", clearProps: "height" }).set(this.elements.menu, { display: "flex", opacity: 0 }).from(
      this.elements.menu,
      {
        className: `${this.elements.menu.className} zero-height`,
        duration: 0.05
      },
      "open"
    ).to(
      this.elements.menu,
      {
        height: "auto",
        duration: 0.05
      },
      "open"
    ).call(() => {
      const t = this.elements.menu.getBoundingClientRect(), e = window.innerHeight, i = window.innerWidth, r = t.height, n = t.top;
      it.setCSSVar(
        "dropdown-menu-height",
        `${r}px`,
        this.elements.menu
      ), r + n > e ? this.elements.menu.setAttribute("data-dropdown-placement", "top") : this.elements.menu.setAttribute("data-dropdown-placement", "bottom");
      const o = window.getComputedStyle(this.elements.menu);
      let a = parseFloat(o.left) || 0;
      t.left < 0 ? this.elements.menu.style.left = `${a - t.left}px` : t.right > i && (this.elements.menu.style.left = `${a - (t.right - i)}px`);
    }).to(this.elements.menu, {
      opacity: 1,
      duration: this.opts.menuOpenDuration
    }), this.elements.menuItems.length && this.timeline.from(
      this.elements.menuItems,
      this.opts.tweens.items,
      `open+=${this.opts.menuOpenDuration}`
    ), this.elements.trigger && this.elements.trigger.addEventListener("click", this.onClick.bind(this));
  }
  async onClick(t) {
    t.preventDefault(), t.stopPropagation(), this.open ? (await this.opts.onBeforeClose(this), await this.closeMenu(), this.opts.onAfterClose(this)) : (await this.opts.onBeforeOpen(this), await this.openMenu(), this.opts.onAfterOpen(this));
  }
  async openMenu() {
    this.opts.multipleActive || (this.app.currentMenu && (this.opts.overlapTweens ? this.app.currentMenu.closeMenu() : await this.app.currentMenu.closeMenu()), this.app.currentMenu = this), this.open = !0, this.elements.trigger.dataset.dropdownActive = "", document.addEventListener("click", this.handleDocumentClick), this.timeline.reversed() ? await this.timeline.play() : await this.timeline.reverse();
  }
  async closeMenu() {
    this.app.currentMenu = null, this.open = !1, delete this.elements.trigger.dataset.dropdownActive, document.removeEventListener("click", this.handleDocumentClick), this.timeline.reversed() ? await this.timeline.play() : await this.timeline.reverse();
  }
  // Handler that checks if a click was outside the dropdown element.
  handleDocumentClick(t) {
    this.element.contains(t.target) || this.onClick(t);
  }
  checkForInitialOpen() {
    this.elements.trigger.hasAttribute("data-dropdown-active") && this.openMenu();
  }
}
const Q0 = {};
class Av {
  constructor(t, e, i = {}, r = document.body) {
    this.app = t, this.container = r, this.opts = qt(i, Q0), this.selector = e, this.initialize(), window.addEventListener(Yi, () => {
      N.set("[data-eq-height-elements-adjusted]", {
        clearProps: "minHeight"
      }), this.initialize();
    });
  }
  initialize() {
    const t = it.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const r = [];
      let n = [], o = 0;
      it.all(e, this.selector).forEach((h) => {
        const c = h.getBoundingClientRect();
        if (i === null) {
          o = c.height, n.push(h), i = c.top;
          return;
        }
        i !== c.top ? (console.debug("== pushing actionables", { elements: n, height: o }), r.push({ elements: n, height: o }), n = [], o = c.height) : i === c.top ? c.height > o && (o = c.height) : o = c.height, n.push(h), i = c.top;
      }), n.length && r.push({ elements: n, height: o }), r.length && r.forEach((h) => {
        N.set(h.elements, {
          minHeight: h.height,
          attr: { "data-eq-height-elements-adjusted": !0 }
        });
      });
    });
  }
}
function Go(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(Lc, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function Dc(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const r = s[i];
    e.push(Go(r, t));
  }
  return Promise.all(e);
}
const J0 = {
  listenForResize: !0
};
class kv {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = qt(e, J0), this.initialize(), e.listenForResize && window.addEventListener(Yi, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let r = [], n = 0;
      const o = it.all(t, "img");
      Dc(o, !1).then(() => {
        o.forEach((a) => {
          const h = a.getBoundingClientRect(), c = this.getImgSizeInfo(a);
          if (e === null) {
            n = c.height, r.push(a), e = h.top;
            return;
          }
          e !== h.top ? (i.push({ elements: r, height: n }), r = [], n = c.height) : e === h.top ? c.height > n && (n = c.height) : n = c.height, r.push(a), e = h.top;
        }), r.length && i.push({ elements: r, height: n }), i.length && i.forEach((a) => {
          N.set(a.elements, { minHeight: a.height });
        });
      });
    });
  }
  initialize() {
    this.canvases = it.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, i, r, n, o) {
    const a = r / n, h = e / i;
    return (function() {
      return (t ? a > h : a < h) ? (this.width = e, this.height = e / a) : (this.width = i * a, this.height = i), this.left = (e - this.width) * (o / 100), this.right = this.width + this.left, this;
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
const jp = {
  onPin: (s) => {
    N.to(s.el, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, N.to(s.el, {
      duration: 0.25,
      yPercent: "-100",
      ease: "sine.in",
      autoRound: !0,
      onComplete: () => {
        s._hiding = !1;
      }
    });
  },
  onAltBg: (s) => {
    s.opts.altBgColor && N.to(s.el, {
      duration: 0.2,
      backgroundColor: s.opts.altBgColor
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && N.to(s.el, {
      duration: 0.4,
      backgroundColor: s.opts.regBgColor
    });
  },
  // eslint-disable-next-line no-unused-vars
  onSmall: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotSmall: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onTop: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotTop: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onBottom: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotBottom: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuOpen: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuClose: (s) => {
  },
  // eslint-disable-next-line no-unused-vars
  onIntersect: (s) => {
  },
  onOutline: (s) => {
    s.preventUnpin = !0, s.pin();
  }
}, tv = {
  el: "header[data-nav]",
  on: Bi,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      N.timeline().set(s.el, { yPercent: -100 }).set(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      N.timeline().to(s.el, {
        duration: 1,
        yPercent: 0,
        delay: s.opts.enterDelay,
        ease: "power3.out",
        autoRound: !0
      }).staggerTo(s.lis, 0.8, { opacity: 1, ease: "sine.in" }, 0.1, "-=1");
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
    ...jp
  }
};
class Iv {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, tv), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.opts.intersects && (this.intersectingElements = it.all("[data-intersect]")), window.addEventListener(cl, () => {
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
      ll,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      hl,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Bi, () => {
      let t = Jr;
      this.mainOpts.rafScroll || (t = "scroll"), window.addEventListener(t, this.redraw.bind(this), {
        capture: !1,
        passive: !0
      });
    }), this.app.registerCallback(
      Ho,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      Yi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Bi, () => {
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
    const e = this.currentScrollY > this.lastKnownScrollY, i = this.currentScrollY >= this.opts.offset;
    return e && i && t;
  }
  shouldPin(t) {
    if (this._isResizing)
      return !1;
    const e = this.currentScrollY < this.lastKnownScrollY, i = this.currentScrollY <= this.opts.offset;
    return e && t || i;
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
    const i = e.sections[t];
    return e = qt(i, jp, e.default || {}), e;
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
const ev = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class Mv {
  constructor(t, e) {
    this.app = t, this.opts = qt(e, ev);
    const i = document.querySelector("main"), r = document.querySelector("[data-footer-reveal]");
    N.set(r, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const n = r.offsetHeight;
    if (N.set(i, { marginBottom: n }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const iv = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class Lv {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, iv), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((n) => this.setupParallaxElement(n)));
      } else
        document.querySelectorAll(this.opts.el).forEach((r) => this.setupParallaxElement(r));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Jr, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
  }
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(t) {
    const e = t.hasAttribute("data-parallax-factor") ? parseFloat(t.getAttribute("data-parallax-factor")) : this.opts.factor;
    let i = t.hasAttribute("data-parallax") ? this.opts.fadeContent : t.hasAttribute("data-parallax-fade");
    const r = t.hasAttribute("data-parallax-orientation") ? t.getAttribute("data-parallax-orientation") : this.opts.orientation;
    let n = null, o = null;
    if (t.hasAttribute("data-parallax")) {
      if (n = t.querySelector("[data-parallax-content]"), o = t.querySelector("[data-parallax-figure]"), this.opts.overflow || (t.style.overflow = "hidden"), o) {
        o.style.transform = `scale(${this.opts.scale})`, o.style.willChange = "transform", o.style.transformOrigin = "center";
        const a = window.getComputedStyle(o);
        a.backgroundImage && a.backgroundImage !== "none" && (a.backgroundSize !== "cover" && (o.style.backgroundSize = "cover"), a.backgroundPosition !== "center" && (o.style.backgroundPosition = "center"));
      }
      n && (n.style.willChange = i ? "transform, opacity" : "transform", n.style.zIndex = "1");
    } else
      t.style.willChange = i ? "transform, opacity" : "transform";
    this.parallaxElements.push({
      element: t,
      factor: e,
      fadeContent: i,
      orientation: r,
      content: n,
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
    const { element: i, factor: r, fadeContent: n, orientation: o } = t, a = i.getBoundingClientRect(), h = this.app.size.height, c = h / 2, l = (a.top + a.height / 2 - c) / h * r * 100;
    let g = 1;
    if (n) {
      const _ = a.top / h;
      _ <= 0 ? g = Math.max(0, 1 + _ * 1.5) : _ >= 0.7 && (g = Math.max(0, 1 - (_ - 0.7) * 3.33)), g = Math.max(0, Math.min(1, g));
    }
    let p = "";
    switch (o) {
      case "up":
        p = `translate3d(0, ${l}px, 0)`;
        break;
      case "down":
        p = `translate3d(0, ${-l}px, 0)`;
        break;
      case "left":
        p = `translate3d(${l}px, 0, 0)`;
        break;
      case "right":
        p = `translate3d(${-l}px, 0, 0)`;
        break;
      default:
        p = `translate3d(0, ${l}px, 0)`;
    }
    return { transform: p, opacity: g };
  }
  /**
   * Apply a smooth transition between current and target position
   * @param {Object} item - Parallax element data
   * @param {Object} target - Target transform and opacity values
   */
  applyTransform(t, e) {
    const { element: i, figure: r, content: n } = t;
    if (r) {
      let o = "scale(1.2)";
      const a = r.style.transform;
      if (a) {
        const h = a.match(/scale\([^)]+\)/);
        h && (o = h[0]);
      }
      r.style.transform = `${o} ${e.transform}`;
    }
    n && (n.style.transform = e.transform, n.style.opacity = e.opacity), !r && !n && (i.style.transform = e.transform, i.style.opacity = e.opacity);
  }
  /**
   * Handle scroll event to update parallax effect
   */
  onScroll() {
    if (!this.parallaxElements.length) return;
    const t = window.pageYOffset;
    this.parallaxElements.forEach((e) => {
      const i = e.element.getBoundingClientRect();
      if (i.bottom > -100 && i.top < this.app.size.height + 100) {
        const r = this.calculateTransform(e, t);
        this.applyTransform(e, r);
      }
    });
  }
  /**
   * Destroy the parallax instance and clean up
   */
  destroy() {
    window.removeEventListener(Jr, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: r } = t;
      i && (i.style.transform = "", i.style.willChange = ""), r && (r.style.transform = "", r.style.opacity = "", r.style.willChange = ""), !i && !r && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
N.registerPlugin(Bo);
const rv = {
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
  onTransition: (s) => {
    s.slide("parallax");
  },
  onInitialize: () => {
  },
  onFadeIn: (s, t) => {
    s.slides.length > 1 ? N.to(s.el, {
      duration: 0.25,
      opacity: 1,
      onComplete: () => {
        t();
      }
    }) : N.to(s.el, {
      duration: 0.25,
      opacity: 1
    });
  }
};
class Dv {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, rv), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), N.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      N.set(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? N.set(i, {
        width: document.body.clientWidth,
        height: "100%",
        top: 0,
        left: 0,
        position: "absolute"
      }) : console.error(
        "==> JUPITER/HEROSLIDER: MISSING .hero-slide-img INSIDE [data-hero-slide]"
      );
    }), this.slides[0].style.zIndex = this.opts.zIndex.visible, this.slides[1] && (this.slides[1].style.zIndex = this.opts.zIndex.next), this.opts.onInitialize(this);
    const t = this.slides.length > 1 ? this.next.bind(this) : () => {
    };
    this.app.registerCallback(Bi, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Go(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    Fo() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    const e = N.timeline();
    switch (t) {
      case "fade":
        e.set(this._currentSlide, {
          opacity: 0,
          scale: 1,
          zIndex: this.opts.zIndex.visible
        }).set(this._nextSlide, {
          opacity: 0
        }).to(this._previousSlide, {
          duration: this.opts.interval,
          scale: this.opts.transition.scale
        }).to(this._currentSlide, {
          duration: this.opts.transition.duration,
          opacity: 1,
          delay: this.opts.interval - this.opts.transition.duration,
          force3D: !0,
          ease: "sine.inOut"
        }).set(this._previousSlide, {
          opacity: 0
        }).call(
          () => {
            this._nextSlide.style.zIndex = this.opts.zIndex.visible, this._currentSlide.style.zIndex = this.opts.zIndex.regular, this._previousSlide.style.zIndex = this.opts.zIndex.regular, this.next();
          },
          null,
          this
        );
        break;
      case "parallax":
        e.set(this._currentSlide, {
          zIndex: this.opts.zIndex.next,
          scale: 1,
          width: "100%"
        }).fromTo(
          this._previousSlide,
          {
            duration: this.opts.interval,
            overflow: "hidden"
          },
          {
            duration: this.opts.interval,
            scale: this.opts.transition.scale
          }
        ).to(this._previousSlide, {
          duration: this.opts.transition.duration,
          width: 0,
          ease: "power3.in",
          autoRound: !0,
          overwrite: "preexisting"
        }).set(this._nextSlide, {
          zIndex: this.opts.zIndex.next
        }).set(this._currentSlide, {
          zIndex: this.opts.zIndex.visible,
          width: "100%"
        }).set(this._previousSlide, {
          zIndex: this.opts.zIndex.regular,
          scale: 1,
          width: "100%"
        }).call(() => {
          this.next();
        });
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
        Yi,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        Yi,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    N.to(this.images, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
N.registerPlugin(Bo);
const nv = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    N.to(s.videoDiv, {
      duration: 1,
      autoAlpha: 1
    });
  },
  onFadeInCover: (s) => {
    N.to(s.cover, {
      duration: 0.35,
      autoAlpha: 1
    });
  },
  onFadeOutCover: (s) => {
    N.set(s.cover, {
      duration: 0.35,
      autoAlpha: 0
    });
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
class Rv {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = qt(e, nv), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), N.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = it.find(this.el, "[data-cover]"), this.cover && N.set(this.cover, { autoAlpha: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), N.set(this.videoDiv, {
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
    this.video.muted = !0, N.set(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && Go(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(Ho, () => {
      !this.video.playing && !Fo() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (Fo() ? N.set(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
      const [{ isIntersecting: i }] = e;
      if (i) {
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
        Yi,
        this._resize.bind(this)
      )) : window.removeEventListener(
        Yi,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
    N.to(this.video, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
function ql(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const sv = {
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
class Nv {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, sv), this.target = this.opts.target || document.body, this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Bi, () => {
      this.watch();
    }));
  }
  watch() {
    this.initObserver(this.revealObserver, !1);
  }
  initialize() {
    if (this.initializeAutoSizes(), this.initializeSections(), "loading" in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      this.target.querySelectorAll("[data-ll-image]").forEach((i) => {
        i.setAttribute("loading", "lazy"), this.swapImage(i);
      }), this.target.querySelectorAll("[data-ll-srcset]").forEach((i) => {
        i.querySelectorAll("img").forEach((r) => r.setAttribute("loading", "lazy")), this.swapPicture(i);
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
    this.lazyPictures.forEach((i, r) => {
      e && (i.setAttribute("data-ll-srcset-initialized", ""), i.querySelectorAll("img:not([data-ll-loaded])").forEach((n) => {
        n.setAttribute("data-ll-blurred", ""), n.setAttribute("data-ll-idx", r), n.style.setProperty("--ll-idx", r);
      })), t.observe(i);
    });
  }
  forceLoad(t = document.body) {
    it.all(t, "[data-ll-image]").forEach((r) => this.swapImage(r)), it.all(t, "[data-ll-srcset]").forEach((r) => this.revealPicture(r));
  }
  initializeAutoSizes() {
    this.opts.updateSizes && (this.$autoSizesImages = it.all('[data-sizes="auto"]'), this.autoSizes(), window.addEventListener(Yi, () => this.autoSizes()));
  }
  /**
   * Set sizes attribute for all imgs with `data-sizes="auto"` and source within the <picture>
   */
  autoSizes() {
    Array.from(this.$autoSizesImages).forEach((t) => {
      const e = this.getWidth(t);
      t.setAttribute("sizes", `${e}px`), t.parentNode && Array.from(it.all(t.parentNode, "source")).forEach(
        (i) => i.setAttribute("sizes", `${e}px`)
      );
    });
  }
  getWidth(t) {
    let e = t.offsetWidth, i = t.parentNode;
    for (; e < this.opts.minSize && i; )
      e = i.offsetWidth, i = i.parentNode;
    return e;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (i, r) => {
        const n = it.all(i, "img");
        return new IntersectionObserver((o, a) => {
          o.forEach((h) => {
            (h.isIntersecting || h.intersectionRatio > 0) && (Dc(n, !0).then(() => {
              ql(i, Kp);
            }), r.forEach((c) => {
              this.loadPicture(c), this.loadObserver.unobserve(c);
            }), a.unobserve(i));
          });
        }, this.opts.intersectionObserverConfig);
      };
      t.forEach((i) => {
        const r = i.querySelectorAll("picture");
        e(i, r).observe(i);
      });
    }
  }
  // we load the picture a ways before it enters the viewport
  handleLoadEntries(t) {
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const i = e.target;
        this.loadPicture(i), this.loadObserver.unobserve(e.target);
      }
    });
  }
  // we reveal the picture when it enters the viewport
  handleRevealEntries(t) {
    const e = new MutationObserver((i) => {
      i.forEach((r) => {
        r.type === "attributes" && r.attributeName === "data-ll-srcset-ready" && (this.revealPicture(r.target), this.revealObserver.unobserve(r.target));
      });
    });
    t.forEach((i) => {
      if (i.isIntersecting || i.intersectionRatio > 0) {
        const r = i.target;
        i.target.hasAttribute("data-ll-srcset-ready") ? (this.revealPicture(r), this.revealObserver.unobserve(i.target)) : e.observe(r, { attributes: !0 });
      }
    });
  }
  loadPicture(t) {
    const e = t.querySelectorAll("source");
    let i = !1;
    for (let o = 0; o < e.length; o += 1) {
      const a = e[o];
      a.hasAttribute("data-ll-ready") || (i = !0), a.hasAttribute("data-srcset") && (a.setAttribute("srcset", a.dataset.srcset), a.setAttribute("data-ll-ready", ""));
    }
    if (!i && e.length > 0)
      return;
    const r = t.querySelector("img"), n = () => {
      if (!r.getAttribute("data-ll-ready") && this.app.browser === "firefox") {
        const o = this.getWidth(r);
        r.setAttribute("sizes", `${o}px`), r.parentNode && Array.from(it.all(r.parentNode, "source")).forEach(
          (a) => a.setAttribute("sizes", `${o}px`)
        );
      }
      r.removeAttribute("data-ll-placeholder"), r.removeAttribute("data-ll-blurred"), r.removeAttribute("data-ll-loading"), r.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    r.addEventListener("load", n, !1), r.setAttribute("data-ll-loading", ""), r.dataset.src && r.setAttribute("src", r.dataset.src), r.dataset.srcset && r.setAttribute("srcset", r.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), r.complete && n(), ql(r, Lc);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), ql(e, Gp));
  }
  lazyloadImages(t) {
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const i = e.target;
        this.swapImage(i), this.imageObserver.unobserve(i);
      }
    });
  }
  swapImage(t) {
    t.src = t.dataset.src, t.setAttribute("data-ll-loaded", "");
  }
}
const ov = {
  /* enable captions */
  captions: !1,
  /* enable index numbers */
  numbers: !1,
  /* enable swipe — this breaks native zoom! */
  swipe: !0,
  /* set to a selector if you want a specific trigger element to open the box */
  trigger: !1,
  elements: {
    arrowRight: () => {
      const s = document.createElement("span");
      return s.classList.add("arrow-r"), s.appendChild(document.createTextNode("→")), s;
    },
    arrowLeft: () => {
      const s = document.createElement("span");
      return s.classList.add("arrow-l"), s.appendChild(document.createTextNode("←")), s;
    },
    close: () => document.createTextNode("×"),
    dot: () => document.createTextNode("▪")
  },
  onClick: (s, t, e) => {
    e.stopPropagation(), e.preventDefault(), s.pointerDirection === "left" ? s.setImg(t, s.getPrevIdx(t)) : s.setImg(t, s.getNextIdx(t));
  },
  onPointerLeft: () => {
  },
  onPointerRight: () => {
  },
  onCaptionOut: (s, t) => {
    t && s.timelines.caption.to(s.elements.caption, {
      duration: 0.4,
      autoAlpha: 0
    });
  },
  onCaptionIn: (s, t) => {
    t && s.timelines.caption.to(s.elements.caption, {
      duration: 0.4,
      autoAlpha: 1
    });
  },
  onImageOut: (s) => {
    s.timelines.image.to(s.currentImage, {
      duration: 0.5,
      autoAlpha: 0
    });
  },
  onImageIn: (s) => {
    const t = s.firstTransition ? 0.6 : 0.4;
    s.timelines.image.to(s.nextImage, {
      duration: 0.5,
      autoAlpha: 1,
      delay: t
    });
  },
  onNumbers: (s, t) => {
    s.elements.numbers.innerHTML = `${s.currentIndex + 1}/${t.length}`;
  },
  onBeforeOpen: () => {
  },
  onOpen: (s) => {
    s.app.scrollLock(), N.to(s.elements.wrapper, {
      duration: 0.5,
      opacity: 1
    });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && N.to(s.elements.caption, {
      duration: 0.45,
      opacity: 0
    }), N.to(
      [
        s.elements.imgWrapper,
        s.elements.nextArrow,
        s.elements.prevArrow,
        s.elements.close,
        s.elements.dots
      ],
      {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          N.to(s.elements.wrapper, {
            duration: 0.45,
            opacity: 0,
            onComplete: () => {
              s.app.scrollRelease(), s.destroy();
            }
          });
        }
      }
    );
  }
};
class zv {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, ov), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: N.timeline({ paused: !0 }),
      image: N.timeline({ paused: !0 })
    }, this.lightboxes.forEach((i) => {
      const r = i.getAttribute("data-lightbox"), n = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), h = i.getAttribute("data-lightbox-section") || "general";
      let c = i;
      this.opts.trigger && (c = it.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, h) || (this.sections[h] = []);
      const u = {
        href: r,
        alt: a,
        srcset: n
      }, d = this.sections[h].push(u) - 1;
      c.addEventListener("click", (f) => {
        f.preventDefault(), this.showBox(h, d);
      });
    });
  }
  showBox(t, e) {
    this.opts.onBeforeOpen(this), this.buildBox(t, e);
  }
  buildBox(t, e) {
    this.elements.wrapper = document.createElement("div"), this.elements.content = document.createElement("div"), this.elements.imgWrapper = document.createElement("div"), this.elements.dots = document.createElement("div"), this.elements.numbers = document.createElement("div"), this.elements.nextArrow = document.createElement("a"), this.elements.prevArrow = document.createElement("a"), this.elements.close = document.createElement("a"), this.elements.content.setAttribute("data-current-idx", e), this.elements.content.classList.add("lightbox-content"), this.elements.nextArrow.classList.add("lightbox-next"), this.elements.prevArrow.classList.add("lightbox-prev"), this.elements.close.classList.add("lightbox-close"), this.elements.dots.classList.add("lightbox-dots"), this.elements.numbers.classList.add("lightbox-numbers"), this.elements.wrapper.classList.add("lightbox-backdrop"), this.elements.wrapper.setAttribute("data-lightbox-wrapper-section", t), this.elements.imgWrapper.classList.add("lightbox-image-wrapper"), this.elements.close.appendChild(this.opts.elements.close()), this.elements.close.href = "#", this.elements.nextArrow.appendChild(this.opts.elements.arrowRight()), this.elements.nextArrow.href = "#", this.elements.nextArrow.addEventListener("click", (r) => {
      r.stopPropagation(), r.preventDefault(), this.setImg(t, this.getNextIdx(t));
    }), this.elements.prevArrow.addEventListener("click", (r) => {
      r.stopPropagation(), r.preventDefault(), this.setImg(t, this.getPrevIdx(t));
    }), this.keyUpCallback = (r) => {
      this.onKeyup(r, t);
    }, document.removeEventListener("keyup", this.keyUpCallback), document.addEventListener("keyup", this.keyUpCallback), this.elements.wrapper.addEventListener("mousemove", (r) => {
      this.onMouseMove(r);
    }), this.elements.wrapper.addEventListener("click", (r) => {
      this.onClick(r, t);
    }), this.elements.prevArrow.appendChild(this.opts.elements.arrowLeft()), this.elements.prevArrow.href = "#";
    let i;
    this.sections[t].forEach((r, n) => {
      const o = document.createElement("img");
      N.set(o, { autoAlpha: 0 }), o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", n), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", n), n === e && (a.classList.add("active"), i = a), a.addEventListener("click", (h) => {
        a.classList.add("active"), i.classList.remove("active"), i = a, h.stopPropagation(), h.preventDefault(), this.setImg(t, n, null);
      }), a.appendChild(this.opts.elements.dot()), this.elements.dots.appendChild(a);
    }), this.elements.content.appendChild(this.elements.close), this.elements.content.appendChild(this.elements.imgWrapper), this.elements.content.appendChild(this.elements.nextArrow), this.elements.content.appendChild(this.elements.prevArrow), this.elements.content.appendChild(this.elements.dots), this.opts.numbers && this.elements.content.appendChild(this.elements.numbers), this.opts.captions && (this.elements.caption = document.createElement("div"), this.elements.caption.classList.add("lightbox-caption"), this.elements.content.appendChild(this.elements.caption)), this.elements.wrapper.appendChild(this.elements.content), document.body.appendChild(this.elements.wrapper), this.setImg(t, e, this.getPrevIdx(t)), this.opts.swipe && this.attachSwiper(t, this.elements.content, e), this.opts.onOpen(this), this.elements.close.addEventListener("click", (r) => {
      r.preventDefault(), r.stopPropagation(), this.close();
    });
  }
  close() {
    document.removeEventListener("keyup", this.keyUpCallback), this.opts.onClose(this), this.opts.onAfterClose(this), this.currentIndex = null, this.currentImage = null, this.firstTransition = !0, this.imgs = [];
  }
  destroy() {
    this.elements.wrapper.parentNode.removeChild(this.elements.wrapper);
  }
  setImg(t, e) {
    let i = !1;
    this.currentIndex = e, this.elements.content.setAttribute("data-current-idx", e);
    let r = document.querySelector(".lightbox-dots a.active");
    r && r.classList.remove("active"), r = document.querySelector(`.lightbox-dots a[data-idx="${e}"]`), r.classList.add("active"), this.elements.caption && (i = this.previousCaption !== this.sections[t][e].alt, this.previousCaption = this.sections[t][e].alt, this.opts.onCaptionOut(this, i), this.timelines.caption.call(() => {
      this.elements.caption.innerHTML = this.sections[t][e].alt;
    })), this.elements.numbers && this.opts.onNumbers(this, this.sections[t]), this.currentImage && this.opts.onImageOut(this);
    for (let n = 0; n < 3 && this.imgs[e + n]; n += 1)
      this.imgs[e + n].src = this.sections[t][e + n].href, this.sections[t][e + n].srcset && this.imgs[e + n].setAttribute(
        "srcset",
        this.sections[t][e + n].srcset
      );
    this.nextImage = this.imgs[e], this.nextImage.src = this.sections[t][e].href, this.sections[t][e].srcset && this.nextImage.setAttribute(
      "srcset",
      this.sections[t][e].srcset
    ), this.opts.onImageIn(this), this.timelines.image.call(() => {
      this.firstTransition && (this.firstTransition = !1);
    }), this.elements.caption && this.opts.onCaptionIn(this, i), Go(this.nextImage).then(() => {
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
  attachSwiper(t, e, i) {
    const r = new Fh(e), n = new kc();
    this.elements.content.setAttribute("data-current-idx", i), r.add(n), r.on("swipeleft", () => {
      const o = this.getNextIdx(t);
      this.setImg(t, o);
    }), r.on("swiperight", () => {
      const o = this.getPrevIdx(t);
      this.setImg(t, o);
    });
  }
}
N.registerPlugin(zn);
const av = {
  triggerEvents: !0,
  scrollDuration: 0.8,
  scrollOffsetNav: !1,
  mobileMenuDelay: 800,
  openExternalInWindow: !0,
  linkQuery: 'a:not([href^="#"]):not([target="_blank"]):not([data-lightbox]):not(.noanim)',
  anchorQuery: 'a[href^="#"]:not(.noanim)',
  onAnchor: (s, t) => {
    if (t.opts.scrollOffsetNav) {
      const e = document.querySelector("header[data-nav]"), i = e ? e.clientHeight : 0;
      s = { y: s, offsetY: i };
    }
    t.app.scrollTo(
      s,
      t.opts.scrollDuration,
      t.opts.triggerEvents
    );
  },
  onTransition: (s, t) => {
    const e = document.querySelector("main"), i = document.querySelector("header[data-nav]"), r = document.querySelector("footer"), n = document.querySelector("#fader");
    n ? (N.set(n, { display: "block", opacity: 0 }), N.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), i && N.to(i, { duration: 0.2, opacity: 0 }), r && N.to(r, { duration: 0.2, opacity: 0 }), N.to(n, {
      duration: 0.2,
      opacity: 1,
      onComplete: () => {
        window.location = s;
      }
    })) : (N.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), i && N.to(i, { duration: 0.2, opacity: 0 }), r && N.to(r, { duration: 0.2, opacity: 0 }), N.to(e, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        window.location = s;
      }
    }));
  }
};
class Fv {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, av);
    const i = document.querySelectorAll(this.opts.linkQuery), r = document.querySelectorAll(this.opts.anchorQuery);
    this.bindHeroLink(), this.bindAnchors(r), this.bindLinks(i);
  }
  bindHeroLink() {
    const t = document.querySelector("[data-link-to-content]");
    t && t.addEventListener("click", (e) => {
      const i = document.querySelector("main");
      e.preventDefault(), i && this.opts.onAnchor(i, this);
    });
  }
  bindAnchors(t) {
    let e = !1;
    Array.from(t).forEach((i) => {
      i.addEventListener("click", (r) => {
        r.preventDefault();
        const n = i.getAttribute("href");
        if (n === "#")
          return;
        document.body.classList.contains("open-menu") && (this.app.mobileMenu.toggleMenuClosed(), e = !0);
        const o = () => {
          const a = n, h = document.querySelector(a);
          if (r.preventDefault(), h) {
            if (this.opts.onAnchor(h, this), h.hasAttribute("data-skip-history") || history.pushState({}, "", n), !this.app.header || h.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
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
    Array.from(t).forEach((i) => {
      const r = i.getAttribute("href");
      if (!r || r === "#" || r.startsWith("javascript:"))
        return;
      const n = this.normalizeHostname(
        document.location.hostname
      );
      let o;
      try {
        o = new URL(r, document.location.href).hostname;
      } catch (c) {
        console.warn(`Failed to parse URL for href "${r}":`, c), o = "";
      }
      const h = this.normalizeHostname(o) === n;
      this.opts.openExternalInWindow && !h && i.setAttribute("target", "_blank"), i.addEventListener("click", (c) => {
        c.shiftKey || c.metaKey || c.ctrlKey || (e && (e.style.display = "none"), h && (c.preventDefault(), this.opts.onTransition(r, this.app)));
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
var Ia = { exports: {} }, lv = Ia.exports, ud;
function hv() {
  return ud || (ud = 1, function(s, t) {
    (function(e, i) {
      s.exports = i();
    })(lv, function() {
      var e = 0;
      function i(p) {
        return "__private_" + e++ + "_" + p;
      }
      function r(p, _) {
        if (!Object.prototype.hasOwnProperty.call(p, _)) throw new TypeError("attempted to use private field on non-instance");
        return p;
      }
      function n() {
      }
      n.prototype = { on: function(p, _, C) {
        var v = this.e || (this.e = {});
        return (v[p] || (v[p] = [])).push({ fn: _, ctx: C }), this;
      }, once: function(p, _, C) {
        var v = this;
        function x() {
          v.off(p, x), _.apply(C, arguments);
        }
        return x._ = _, this.on(p, x, C);
      }, emit: function(p) {
        for (var _ = [].slice.call(arguments, 1), C = ((this.e || (this.e = {}))[p] || []).slice(), v = 0, x = C.length; v < x; v++) C[v].fn.apply(C[v].ctx, _);
        return this;
      }, off: function(p, _) {
        var C = this.e || (this.e = {}), v = C[p], x = [];
        if (v && _) for (var S = 0, w = v.length; S < w; S++) v[S].fn !== _ && v[S].fn._ !== _ && x.push(v[S]);
        return x.length ? C[p] = x : delete C[p], this;
      } };
      var o = n;
      o.TinyEmitter = n;
      var a, h = "virtualscroll", c = i("options"), u = i("el"), d = i("emitter"), f = i("event"), l = i("touchStart"), g = i("bodyTouchAction");
      return function() {
        function p(C) {
          var v = this;
          Object.defineProperty(this, c, { writable: !0, value: void 0 }), Object.defineProperty(this, u, { writable: !0, value: void 0 }), Object.defineProperty(this, d, { writable: !0, value: void 0 }), Object.defineProperty(this, f, { writable: !0, value: void 0 }), Object.defineProperty(this, l, { writable: !0, value: void 0 }), Object.defineProperty(this, g, { writable: !0, value: void 0 }), this._onWheel = function(x) {
            var S = r(v, c)[c], w = r(v, f)[f];
            w.deltaX = x.wheelDeltaX || -1 * x.deltaX, w.deltaY = x.wheelDeltaY || -1 * x.deltaY, a.isFirefox && x.deltaMode === 1 && (w.deltaX *= S.firefoxMultiplier, w.deltaY *= S.firefoxMultiplier), w.deltaX *= S.mouseMultiplier, w.deltaY *= S.mouseMultiplier, v._notify(x);
          }, this._onMouseWheel = function(x) {
            var S = r(v, f)[f];
            S.deltaX = x.wheelDeltaX ? x.wheelDeltaX : 0, S.deltaY = x.wheelDeltaY ? x.wheelDeltaY : x.wheelDelta, v._notify(x);
          }, this._onTouchStart = function(x) {
            var S = x.targetTouches ? x.targetTouches[0] : x;
            r(v, l)[l].x = S.pageX, r(v, l)[l].y = S.pageY;
          }, this._onTouchMove = function(x) {
            var S = r(v, c)[c];
            S.preventTouch && !x.target.classList.contains(S.unpreventTouchClass) && x.preventDefault();
            var w = r(v, f)[f], M = x.targetTouches ? x.targetTouches[0] : x;
            w.deltaX = (M.pageX - r(v, l)[l].x) * S.touchMultiplier, w.deltaY = (M.pageY - r(v, l)[l].y) * S.touchMultiplier, r(v, l)[l].x = M.pageX, r(v, l)[l].y = M.pageY, v._notify(x);
          }, this._onKeyDown = function(x) {
            var S = r(v, f)[f];
            S.deltaX = S.deltaY = 0;
            var w = window.innerHeight - 40;
            switch (x.keyCode) {
              case 37:
              case 38:
                S.deltaY = r(v, c)[c].keyStep;
                break;
              case 39:
              case 40:
                S.deltaY = -r(v, c)[c].keyStep;
                break;
              case 32:
                S.deltaY = w * (x.shiftKey ? 1 : -1);
                break;
              default:
                return;
            }
            v._notify(x);
          }, r(this, u)[u] = window, C && C.el && (r(this, u)[u] = C.el, delete C.el), a || (a = { hasWheelEvent: "onwheel" in document, hasMouseWheelEvent: "onmousewheel" in document, hasTouch: "ontouchstart" in document, hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, hasPointer: !!window.navigator.msPointerEnabled, hasKeyDown: "onkeydown" in document, isFirefox: navigator.userAgent.indexOf("Firefox") > -1 }), r(this, c)[c] = Object.assign({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", useKeyboard: !0, useTouch: !0 }, C), r(this, d)[d] = new o(), r(this, f)[f] = { y: 0, x: 0, deltaX: 0, deltaY: 0 }, r(this, l)[l] = { x: null, y: null }, r(this, g)[g] = null, r(this, c)[c].passive !== void 0 && (this.listenerOptions = { passive: r(this, c)[c].passive });
        }
        var _ = p.prototype;
        return _._notify = function(C) {
          var v = r(this, f)[f];
          v.x += v.deltaX, v.y += v.deltaY, r(this, d)[d].emit(h, { x: v.x, y: v.y, deltaX: v.deltaX, deltaY: v.deltaY, originalEvent: C });
        }, _._bind = function() {
          a.hasWheelEvent && r(this, u)[u].addEventListener("wheel", this._onWheel, this.listenerOptions), a.hasMouseWheelEvent && r(this, u)[u].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), a.hasTouch && r(this, c)[c].useTouch && (r(this, u)[u].addEventListener("touchstart", this._onTouchStart, this.listenerOptions), r(this, u)[u].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), a.hasPointer && a.hasTouchWin && (r(this, g)[g] = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", r(this, u)[u].addEventListener("MSPointerDown", this._onTouchStart, !0), r(this, u)[u].addEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && r(this, c)[c].useKeyboard && document.addEventListener("keydown", this._onKeyDown);
        }, _._unbind = function() {
          a.hasWheelEvent && r(this, u)[u].removeEventListener("wheel", this._onWheel), a.hasMouseWheelEvent && r(this, u)[u].removeEventListener("mousewheel", this._onMouseWheel), a.hasTouch && (r(this, u)[u].removeEventListener("touchstart", this._onTouchStart), r(this, u)[u].removeEventListener("touchmove", this._onTouchMove)), a.hasPointer && a.hasTouchWin && (document.body.style.msTouchAction = r(this, g)[g], r(this, u)[u].removeEventListener("MSPointerDown", this._onTouchStart, !0), r(this, u)[u].removeEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && r(this, c)[c].useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
        }, _.on = function(C, v) {
          r(this, d)[d].on(h, C, v);
          var x = r(this, d)[d].e;
          x && x[h] && x[h].length === 1 && this._bind();
        }, _.off = function(C, v) {
          r(this, d)[d].off(h, C, v);
          var x = r(this, d)[d].e;
          (!x[h] || x[h].length <= 0) && this._unbind();
        }, _.destroy = function() {
          r(this, d)[d].off(), this._unbind();
        }, p;
      }();
    });
  }(Ia)), Ia.exports;
}
var cv = hv();
const uv = /* @__PURE__ */ Yp(cv);
function dd(s, t, e, i) {
  const r = 1 - Math.exp(-e * i);
  return s + (t - s) * r;
}
function fd(s, t) {
  let e = s % t;
  return Math.abs(e) > t / 2 && (e = e > 0 ? e - t : e + t), e;
}
const dv = {
  /** Params */
  infinite: !1,
  snap: !1,
  crawl: !1,
  crawlSpeed: 0.03,
  reverse: !1,
  dragSensitivity: 7e-3,
  lerpFactor: 0.3,
  scrollSensitivity: 1,
  snapStrength: 0.1,
  speedDecay: 0.85,
  bounceLimit: 1,
  slowCrawlOnHover: !1,
  virtualScroll: {
    mouseMultiplier: 0.5,
    touchMultiplier: 2,
    firefoxMultiplier: 30,
    useKeyboard: !1,
    passive: !0
  },
  setOffset: ({ itemWidth: s, wrapperWidth: t }) => s,
  /** Functionality */
  scrollInput: !1
};
var fn, gs, ms, pn, mi, Ce, gn, zr, ir, br, Di, mn, mt, Zp, Qp, Jp, tg, Zs, eg, Bh, ig, Yh, Wh, Uh, rg, ng, sg, qh;
class fv {
  constructor(t, e = {}) {
    li(this, mt);
    /* config */
    Yt(this, "speed", 0);
    Yt(this, "crawlSpeed", 0);
    li(this, fn, 0);
    li(this, gs, 0);
    li(this, ms, 0);
    li(this, pn, 0);
    Yt(this, "deltaTime", 0);
    Yt(this, "atRest", !0);
    li(this, mi, null);
    li(this, Ce, 0);
    li(this, gn, !1);
    li(this, zr, 1);
    Yt(this, "snapping", !1);
    /* flags */
    li(this, ir, !0);
    li(this, br, !1);
    li(this, Di, 0);
    li(this, mn, 0);
    Yt(this, "config", {});
    Yt(this, "wrapper", null);
    Yt(this, "items", []);
    Yt(this, "viewport", null);
    Yt(this, "isDragging", !1);
    Yt(this, "dragStart", 0);
    Yt(this, "dragStartTarget", 0);
    Yt(this, "isVisible", !1);
    Yt(this, "current", 0);
    Yt(this, "target", 0);
    Yt(this, "maxScroll", 0);
    Yt(this, "resizeTimeout", null);
    Yt(this, "virtualScroll", null);
    Yt(this, "observer", null);
    Yt(this, "touchStartY", 0);
    Yt(this, "touchStartX", 0);
    Yt(this, "scrollDirection", "horizontal");
    Yt(this, "parallaxValues", []);
    Yt(this, "webglValue", 0);
    this.speed = 0, ut(this, fn, 0), ut(this, ms, 0), ut(this, pn, 0), this.deltaTime = 0, this.crawlSpeed = 0, this.crawling = !1, this.snapping = !1, ut(this, Ce, 0), ut(this, ir, !0), ut(this, br, !1), ut(this, Di, 0), ut(this, mn, 0);
    const i = Jt(this, mt, Zp).call(this, t);
    this.config = {
      ...dv,
      ...i,
      ...e
    }, e.onSlideChange && (this.onSlideChange = e.onSlideChange), e.onResize && (this.onResize = e.onResize), e.onUpdate && (this.onUpdate = e.onUpdate), delete this.config.onSlideChange, delete this.config.onResize, delete this.config.onUpdate, this.wrapper = t, this.items = [...t.children], this.current = 0, this.target = 0, this.isDragging = !1, this.dragStart = 0, this.dragStartTarget = 0, this.isVisible = !1, ut(this, Di, 0), ut(this, mn, 0), Jt(this, mt, Zs).call(this), Jt(this, mt, Jp).call(this), Jt(this, mt, tg).call(this), Jt(this, mt, eg).call(this), this.wrapper.style.cursor = "grab", Jt(this, mt, Qp).call(this), Jt(this, mt, Zs).call(this), Jt(this, mt, ig).call(this), this.snapping = this.config.snap && !this.crawling, this.atRest = !0, this.config.crawl && this.config.crawlSpeed && (this.crawling = !0, this.snapping = !1);
  }
  duplicateItems() {
    const t = [];
    this.items.forEach((e) => {
      const i = e.cloneNode(!0);
      i.setAttribute("aria-hidden", "true"), this.wrapper.appendChild(i), t.push(i);
    }), this.items.push(...t), Jt(this, mt, Zs).call(this);
  }
  /** Update */
  update() {
    if (!this.isVisible || !Et(this, ir)) return;
    const t = performance.now();
    if (this.deltaTime = (t - Et(this, pn)) / 1e3, ut(this, pn, t), this.snapping && !this.isDragging) {
      const n = Math.round(this.target) - this.target;
      this.target += n * this.config.snapStrength;
    }
    if (this.current = dd(this.current, this.target, 1 / this.config.lerpFactor, this.deltaTime), this.config.infinite) {
      const r = Math.round(-this.current), n = this.items.length, o = (r % n + n) % n;
      Jt(this, mt, qh).call(this, o), Jt(this, mt, ng).call(this);
    } else
      Jt(this, mt, qh).call(this, Math.round(Math.abs(this.current))), Jt(this, mt, rg).call(this);
    if (Jt(this, mt, sg).call(this), this.crawling) {
      const r = Math.abs(this.crawlSpeed);
      let n = Et(this, zr);
      const o = this.crawlSpeed < 0 ? -1 : 1, a = r * n * o, h = r / 3;
      Math.abs(Et(this, Ce)) < r && (ut(this, Ce, Et(this, Ce) + h * this.deltaTime * o), o === 1 && Et(this, Ce) > a ? ut(this, Ce, a) : o === -1 && Et(this, Ce) < a && ut(this, Ce, a)), this.snapping = !1;
    } else {
      const n = Math.abs(this.crawlSpeed) / 2, o = Et(this, Ce) < 0 ? -1 : 1;
      Math.abs(Et(this, Ce)) > 0 && (ut(this, Ce, Et(this, Ce) - n * this.deltaTime * o), (o === 1 && Et(this, Ce) < 0 || o === -1 && Et(this, Ce) > 0) && ut(this, Ce, 0));
    }
    const e = Math.abs(this.current - this.target) < 1e-4, i = this.speed === 0;
    e && i && !this.isDragging && !this.crawling ? !this.atRest && this.config.crawl && this.config.crawlSpeed && !Et(this, mi) ? (this.atRest = !0, ut(this, mi, setTimeout(() => {
      this.crawling = !0, this.snapping = !1, this.atRest = !1, ut(this, mi, null);
    }, 1e3))) : this.atRest || (this.atRest = !0) : (!e || !i) && (this.atRest = !1), this.crawling && !this.isDragging && this.speed === 0 && (this.target = this.current - Et(this, Ce)), this.onUpdate && this.onUpdate(this);
  }
  goToNext() {
    const t = Et(this, Di), e = this.snapping;
    if (this.snapping = !1, this.config.infinite) {
      const i = (t + 1) % this.items.length;
      this.target = -i;
    } else {
      const i = Math.min(this.items.length - 1, t + 1);
      this.target = -i;
    }
    this.snapping = e;
  }
  goToPrev() {
    const t = Et(this, Di), e = this.snapping;
    if (this.snapping = !1, this.config.infinite) {
      const i = (t - 1 + this.items.length) % this.items.length;
      this.target = -i;
    } else {
      const i = Math.max(0, t - 1);
      this.target = -i;
    }
    this.snapping = e;
  }
  goToIndex(t) {
    this.target = -t;
  }
  set snap(t) {
    this.config.snap = t;
  }
  getProgress() {
    const t = this.items.length;
    return Math.abs(this.current) % t / t;
  }
  destroy() {
    this.kill(), Et(this, mi) && (clearTimeout(Et(this, mi)), ut(this, mi, null)), window.removeEventListener("mousemove", this.mouseMoveHandler), window.removeEventListener("mouseup", this.mouseUpHandler), window.removeEventListener("touchmove", this.touchMoveHandler), window.removeEventListener("touchend", this.touchEndHandler), this.wrapper.removeEventListener("mousedown", this.mouseDownHandler), this.wrapper.removeEventListener("touchstart", this.touchStartHandler), this.config.slowCrawlOnHover && (this.mouseEnterHandler = () => {
      ut(this, gn, !0), ut(this, zr, 0.5);
    }, this.mouseLeaveHandler = () => {
      ut(this, gn, !1), ut(this, zr, 1);
    }, this.wrapper.removeEventListener("mouseenter", this.mouseEnterHandler), this.wrapper.removeEventListener("mouseleave", this.mouseLeaveHandler)), this.resizeTimeout && clearTimeout(this.resizeTimeout), this.virtualScroll && this.config.scrollInput && this.virtualScroll.destroy(), this.observer && this.observer.disconnect();
  }
  get currentSlide() {
    return Et(this, Di);
  }
  /** Interfaces */
  kill() {
    ut(this, ir, !1), this.items.forEach((t) => {
      t.style.transform = "";
    }), this.current = 0, this.target = 0, this.speed = 0, ut(this, fn, 0);
  }
  init() {
    ut(this, ir, !0), ut(this, pn, performance.now());
  }
  set paused(t) {
    ut(this, br, t);
  }
  get paused() {
    return Et(this, br);
  }
  get progress() {
    if (this.config.infinite) {
      const t = -this.target, e = this.items.length;
      return (t % e + e) % e / (e - 1);
    } else {
      const t = Math.abs(this.current), e = Math.abs(this.maxScroll);
      return Math.max(0, Math.min(1, t / e));
    }
  }
  resize() {
    Jt(this, mt, Zs).call(this);
    const t = Et(this, ir), e = this.isVisible;
    ut(this, ir, !0), this.isVisible = !0, this.update(), ut(this, ir, t), this.isVisible = e;
  }
}
fn = new WeakMap(), gs = new WeakMap(), ms = new WeakMap(), pn = new WeakMap(), mi = new WeakMap(), Ce = new WeakMap(), gn = new WeakMap(), zr = new WeakMap(), ir = new WeakMap(), br = new WeakMap(), Di = new WeakMap(), mn = new WeakMap(), mt = new WeakSet(), Zp = function(t) {
  const e = {};
  return t.hasAttribute("data-looper-infinite") && (e.infinite = !0), t.hasAttribute("data-looper-snap") && (e.snap = !0), t.hasAttribute("data-looper-crawl") && (e.crawl = !0), t.hasAttribute("data-looper-reverse") && (e.reverse = !0), e;
}, Qp = function() {
  this.items.forEach((t) => {
    const e = t.querySelector("img");
    e && (e.draggable = !1);
  });
}, Jp = function() {
  this.config.crawl && this.config.crawlSpeed && (this.originalCrawlSpeed = Math.abs(this.config.crawlSpeed), this.crawlSpeed = this.config.reverse ? -this.originalCrawlSpeed : this.originalCrawlSpeed, ut(this, Ce, 0), this.crawling = !1, this.snapping = !1);
}, tg = function() {
  const t = {
    root: null,
    rootMargin: "50px",
    threshold: 0
  };
  this.observer = new IntersectionObserver((e) => {
    e.forEach((i) => {
      this.isVisible = i.isIntersecting;
    });
  }, t), this.observer.observe(this.wrapper);
}, Zs = function() {
  if (this.viewport = {
    itemWidth: this.items[0].getBoundingClientRect().width,
    wrapperWidth: this.wrapper.clientWidth,
    totalWidth: this.items.reduce((e, i) => e + i.clientWidth, 0)
  }, this.items.reduce((e, i) => e + i.clientWidth, 0) - this.items[this.items.length - 1].clientWidth - this.items[this.items.length - 2].clientWidth < window.innerWidth) {
    this.duplicateItems();
    return;
  }
  ut(this, ms, this.config.setOffset(this.viewport)), this.maxScroll = -(this.viewport.totalWidth - Et(this, ms)) / this.viewport.itemWidth, queueMicrotask(() => {
    this.onResize && this.onResize(this);
  });
}, eg = function() {
  this.mouseDownHandler = (i) => Jt(this, mt, Yh).call(this, i), this.mouseMoveHandler = (i) => Jt(this, mt, Wh).call(this, i), this.mouseUpHandler = () => Jt(this, mt, Uh).call(this), this.wrapper.addEventListener("mousedown", this.mouseDownHandler), window.addEventListener("mousemove", this.mouseMoveHandler), window.addEventListener("mouseup", this.mouseUpHandler);
  const t = 5;
  this.touchStartHandler = (i) => {
    const r = i.touches[0];
    this.touchStartY = r.clientY, this.touchStartX = r.clientX, this.scrollDirection = void 0, Jt(this, mt, Yh).call(this, r);
  }, this.touchMoveHandler = (i) => {
    const r = i.touches[0], n = Math.abs(r.clientY - this.touchStartY), o = Math.abs(r.clientX - this.touchStartX);
    !this.scrollDirection && (o > t || n > t) && (this.scrollDirection = o > n ? "horizontal" : "vertical"), this.scrollDirection === "horizontal" && (i.preventDefault(), Jt(this, mt, Wh).call(this, r));
  }, this.touchEndHandler = () => {
    this.scrollDirection = void 0, Jt(this, mt, Uh).call(this);
  }, this.wrapper.addEventListener("touchstart", this.touchStartHandler), window.addEventListener("touchmove", this.touchMoveHandler, { passive: !1 }), window.addEventListener("touchend", this.touchEndHandler), this.config.slowCrawlOnHover && (this.mouseEnterHandler = () => {
    ut(this, gn, !0), ut(this, zr, 0.5);
  }, this.mouseLeaveHandler = () => {
    ut(this, gn, !1), ut(this, zr, 1);
  }, this.wrapper.addEventListener("mouseenter", this.mouseEnterHandler), this.wrapper.addEventListener("mouseleave", this.mouseLeaveHandler)), new ResizeObserver(() => {
    this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => this.resize(), 10);
  }).observe(this.wrapper);
}, /** Events */
Bh = function(t) {
  if (!this.config.infinite) {
    if (t > this.config.bounceLimit)
      return this.config.bounceLimit;
    if (t < this.maxScroll - this.config.bounceLimit)
      return this.maxScroll - this.config.bounceLimit;
  }
  return t;
}, ig = function() {
  this.virtualScroll = new uv({
    ...this.config.virtualScroll,
    el: this.wrapper
  });
  const t = 5;
  this.virtualScroll.on((e) => {
    if (!this.isDragging && !Et(this, br)) {
      if (e.touchDevice) {
        const o = Math.abs(e.deltaY), a = Math.abs(e.deltaX);
        if (o < t && a < t || o > a) return;
      }
      const r = (this.config.scrollInput ? Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY : e.deltaX) * this.config.scrollSensitivity * 1e-3;
      let n = this.target + r;
      this.config.infinite || (n > 0 ? n = 0 : n < this.maxScroll && (n = this.maxScroll)), this.target = Jt(this, mt, Bh).call(this, n), this.speed = -r * 10;
    }
  });
}, Yh = function(t) {
  Et(this, br) || (this.isDragging = !0, this.dragStart = t.clientX, this.dragStartTarget = this.target, this.wrapper.style.cursor = "grabbing", this.atRest = !1, this.config.snap && (this.snapping = !0), Et(this, mi) && (clearTimeout(Et(this, mi)), ut(this, mi, null)), this.crawling = !1, ut(this, Ce, 0));
}, Wh = function(t) {
  if (!this.isDragging || Et(this, br)) return;
  const e = t.clientX - this.dragStart;
  let i = this.dragStartTarget + e * this.config.dragSensitivity;
  this.target = Jt(this, mt, Bh).call(this, i), "movementX" in t && (this.speed += t.movementX * 0.01);
}, Uh = function() {
  if (this.isDragging = !1, this.wrapper.style.cursor = "grab", this.config.snap && (this.snapping = !0), this.config.infinite)
    this.snapping && (this.target = Math.round(this.target));
  else if (this.target > 0)
    this.target = 0;
  else if (this.target < this.maxScroll)
    this.target = this.maxScroll;
  else if (this.snapping) {
    const t = Math.round(this.target);
    this.target = Math.min(0, Math.max(this.maxScroll, t));
  }
  this.speed = 0, ut(this, gs, 0);
}, rg = function() {
  this.parallaxValues = this.items.map((t, e) => {
    const i = this.current * this.viewport.itemWidth;
    return t.style.transform = `translateX(${i}px)`, i;
  });
}, ng = function() {
  this.parallaxValues = this.items.map((t, e) => {
    const i = this.current + e, n = (fd(i, this.items.length) - e) * this.viewport.itemWidth;
    return t.style.transform = `translateX(${n}px)`, fd(i, this.items.length / 2);
  });
}, sg = function() {
  ut(this, fn, dd(Et(this, fn), this.speed, 1 / this.config.lerpFactor, this.deltaTime)), this.speed = this.speed * this.config.speedDecay;
  const t = Math.abs(this.speed) < 1e-5, e = Math.abs(this.speed - Et(this, gs)) < 1e-5;
  (t || e) && !this.isDragging && (this.speed = 0, this.config.crawlSpeed ? !this.crawling && !this.isDragging && Et(this, mi) : Math.abs(this.current - this.target) < 1e-4 && (this.atRest = !0, this.config.snap && (this.snapping = !0))), ut(this, gs, this.speed);
}, qh = function(t) {
  Et(this, Di) !== t && (ut(this, mn, Et(this, Di)), ut(this, Di, t), this.onSlideChange && this.onSlideChange(Et(this, Di), Et(this, mn)));
};
class Hv extends fv {
  constructor(e, i = {}) {
    super(e.querySelector("[data-looper]"), i);
    Yt(this, "onSlideChange", (e, i) => {
      this.items[i].children[0].classList.remove("active"), this.items[e].children[0].classList.add("active"), this.state.dots && (this.dots[i].children[0].classList.remove("active-dot"), this.dots[e].children[0].classList.add("active-dot")), this.state.arrows && this.config.infinite;
    });
    this.container = e, this.state = {
      dots: !1,
      arrows: !1
    }, this.createInterface(), this.onSlideChange(0, 0), N.ticker.add(this.update.bind(this));
  }
  createInterface() {
    const e = this.container.querySelector("[data-dots]");
    e && (this.state.dots = !0, this.dots = [...e.children], this.dots.forEach((r, n) => r.onclick = () => this.goToIndex(n)));
    const i = this.container.querySelector("[data-arrows]");
    i && (this.state.arrows = !0, this.arrows = [...i.children], this.arrows.forEach(
      (r, n) => r.onclick = () => n === 0 ? this.goToPrev() : this.goToNext()
    ));
  }
}
const pv = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    Ut.to(s, { opacity: 1, ease: "none" });
  }
};
class $v {
  constructor(t, e, i) {
    this.opts = qt(i, pv), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = it.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = it.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = it.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    Ut.set(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.setHeight(), this.fillText();
    const e = this.elements.$holder.offsetWidth, i = it.all(this.elements.$el, "[data-marquee-holder]"), r = e * i.length;
    this.duration = (e + r) / this.opts.speed, Ut.set(this.elements.$marquee, { width: r }), this.initializeTween(), it.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = it.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Ut.set(e, { clearProps: "all" }));
  }
  killTweens() {
    this.timeline && (this.timeline.kill(), this.timeline = null);
  }
  initializeTween() {
    const t = it.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      Ut.set(e, { position: "absolute", left: e.offsetWidth * i });
    }), this.timeline = Ut.timeline({ paused: !0 }), this.timeline.to(t, { xPercent: -100, ease: "none", duration: this.duration }, "standard").repeat(-1), this.timeline.totalProgress(this.opts.startProgress), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    this.playing = !0, Ut.killTweensOf(this.timeline), t ? (this.timeline.play(), Ut.to(this.timeline, {
      timeScale: 1,
      ease: "sine.in",
      duration: 0.8
    })) : (this.timeline.timeScale(1), this.timeline.play());
  }
  pause() {
    this.playing = !1, Ut.to(this.timeline, {
      timeScale: 0.01,
      onComplete: () => {
        this.timeline.pause();
      },
      duration: 0.8
    });
  }
  slowDown() {
    Ut.to(this.timeline, {
      timeScale: 0.5,
      duration: 0.8
    });
  }
  speedUp() {
    Ut.to(this.timeline, {
      timeScale: 1,
      duration: 0.8,
      ease: "sine.in"
    });
  }
  setupObserver() {
    this.observer = new IntersectionObserver(
      (t) => {
        t.forEach((e) => {
          const { isIntersecting: i } = e;
          i && !this.playing ? this.play() : !i && this.playing && this.pause();
        });
      },
      {
        root: null,
        threshold: 0
      }
    ), this.observer.observe(this.elements.$el);
  }
  fillText() {
    this.elements.$marquee.innerHTML = "", this.elements.$marquee.appendChild(this.elements.$holder), this.elements.$holder.innerHTML = "", this.elements.$holder.appendChild(this.elements.$item);
    const t = this.elements.$item.offsetWidth;
    if (t) {
      this.opts.spacer && this.elements.$holder.appendChild(it.new(this.opts.spacer)[0]);
      const e = Math.max(Math.ceil(this.app.size.width / t) - 1, 2);
      for (let i = 0; i < e; i += 1)
        this.elements.$holder.append(this.elements.$item.cloneNode(!0)), this.opts.spacer && this.elements.$holder.appendChild(it.new(this.opts.spacer)[0]);
      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(!0));
    } else
      console.error(
        "no textWidth! probably image? Set width to elements inside holder",
        this.elements.$item
      );
  }
  setHeight() {
    const t = this.elements.$item.offsetHeight + this.opts.extraHeight;
    Ut.set(this.elements.$el, { height: t });
  }
}
const gv = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: (s) => {
    const t = N.timeline();
    s.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), t.fromTo(
      s.bg,
      {
        duration: 0.35,
        x: "0%",
        opacity: 0,
        height: window.innerHeight
      },
      {
        duration: 0.35,
        opacity: 1,
        ease: "sine.in"
      }
    ).to(
      s.logo,
      {
        duration: 0.35,
        opacity: 0,
        ease: "power3.out"
      },
      "-=0.35"
    ).to(
      s.header,
      {
        duration: 0.55,
        backgroundColor: "transparent",
        ease: "power3.out"
      },
      "-=0.35"
    ).call(() => {
      s.nav.style.gridTemplateRows = "auto 1fr";
    }).set(s.nav, { height: window.innerHeight }).set(s.content, { display: "block" }).set(s.logoPath, { fill: s.opts.logoColor }).set(s.logo, { xPercent: 3 }).staggerFromTo(
      s.lis,
      {
        duration: 1,
        opacity: 0,
        x: 20
      },
      {
        duration: 1,
        x: 0,
        opacity: 1,
        ease: "power3.out"
      },
      0.05
    ).to(
      s.logo,
      {
        duration: 0.55,
        opacity: 1,
        xPercent: 0,
        ease: "power3.inOut"
      },
      "-=1.2"
    ).call(s._emitMobileMenuOpenEvent);
  },
  closeTween: (s) => {
    document.body.classList.toggle("open-menu"), N.timeline().call(() => {
      s.hamburger.classList.toggle("is-active");
    }).fromTo(
      s.logo,
      {
        duration: 0.2,
        opacity: 1,
        xPercent: 0
      },
      {
        duration: 0.2,
        opacity: 0,
        xPercent: 5,
        ease: "power3.out"
      }
    ).set(s.logoPath, { clearProps: "fill" }).staggerTo(
      s.lis,
      {
        duration: 0.5,
        opacity: 0,
        x: 20,
        ease: "power3.out"
      },
      0.04
    ).set(s.nav, { clearProps: "height" }).to(
      s.bg,
      {
        duration: 0.25,
        x: "100%",
        ease: "sine.in"
      },
      "-=0.3"
    ).call(() => {
      s._emitMobileMenuClosedEvent();
    }).set(s.content, { display: "none" }).call(() => {
      s.nav.style.gridTemplateRows = "auto";
    }).set(s.lis, { clearProps: "opacity" }).to(s.logo, {
      duration: 0.35,
      opacity: 1,
      ease: "power3.in"
    });
  }
};
class Bv {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, gv), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(Yi, () => {
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
      Ic
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      Mc
    );
    window.dispatchEvent(t);
  }
}
N.registerPlugin(Bo);
const mv = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Bi,
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
class Yv {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = qt(e, mv), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), Fo() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    document.querySelectorAll("[data-moonwalk]").forEach((n) => {
      (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || n === e) && (n.setAttribute("data-moonwalked", ""), n.classList.add("moonwalked"));
    }), document.querySelectorAll(
      "[data-moonwalk-section]"
    ).forEach((n) => {
      (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING || n === e) && n.setAttribute("data-moonwalk-section-ready", "");
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
    ].forEach((i) => {
      const r = t.querySelectorAll(`[${i}]`);
      Array.from(r).forEach((n) => n.removeAttribute(i)), t.removeAttribute(i);
    });
  }
  removeFor(t = document.body, e) {
    [
      "data-moonwalk",
      "data-moonwalk-section",
      "data-moonwalk-children"
    ].forEach((r) => {
      const n = t.querySelectorAll(`${e}[${r}]`);
      Array.from(n).forEach((o) => o.removeAttribute(r));
    });
  }
  /**
   * Remove run matching name
   */
  removeRun(t = document.body, e) {
    const i = "data-moonwalk-run", r = t.querySelectorAll(`[${i}="${e}"]`);
    Array.from(r).forEach((n) => n.removeAttribute(i));
  }
  /**
   * Remove all runs
   */
  removeRuns(t = document.body) {
    const e = "data-moonwalk-run", i = t.querySelectorAll(`[${e}]`);
    Array.from(i).forEach((r) => r.removeAttribute(e));
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
      const i = e === "default" ? '[data-moonwalk=""]' : `[data-moonwalk="${e}"]`, r = t.querySelectorAll(i);
      Array.from(r).forEach((n, o) => {
        n.setAttribute("data-moonwalk-idx", o + 1);
      });
    }, this);
  }
  /**
   * Go through each `data-moonwalk-run`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeRuns(t = document.body) {
    const e = t.querySelectorAll("[data-moonwalk-run]");
    return Array.from(e).map((i) => {
      const r = this.opts.runs[i.getAttribute("data-moonwalk-run")];
      return r ? (r.initialize && r.initialize(i), {
        el: i,
        threshold: r.threshold || 0,
        initialize: r.initialize,
        callback: r.callback,
        onExit: r.onExit,
        repeated: r.repeated,
        rootMargin: r.rootMargin
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
      (i) => this.initializeSection(i)
    );
  }
  initializeSection(t) {
    this.parseChildren(t), this.opts.uniqueIds && this.addIds(t), this.opts.addIndexes && this.addIndexes(t);
    const e = N.timeline({
      autoRemoveChildren: !1,
      smoothChildTiming: !1
    });
    return {
      id: Math.random().toString(36).substring(7),
      el: t,
      name: t.getAttribute("data-moonwalk-section") || null,
      timeline: e,
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
      (i) => i.removeAttribute("data-moonwalk")
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
    const e = it.all(t, "[data-moonwalk-children]");
    Array.from(e).forEach((i) => {
      const r = i.getAttribute("data-moonwalk-children");
      this.setAttrs(i, r);
    });
  }
  /**
   * Sets all `element`s childrens `data-moonwalk` to `val`
   *
   * @param {*} element
   * @param {*} val
   */
  setAttrs(t, e) {
    const i = [];
    return Array.prototype.forEach.call(t.children, (r) => {
      r.setAttribute("data-moonwalk", e), i.push(r);
    }), i;
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
      const r = e[t.name];
      r.sectionTargets ? t.children = this.orderChildren(
        t.el.querySelectorAll(r.sectionTargets)
      ) : t.children = this.orderChildren(t.el.children);
      const n = r.alphaTween ? {
        ...r.transition.from,
        opacity: 0
      } : r.transition.from;
      N.set(t.children, n);
    }
    if (t.stage.name) {
      const r = e[t.stage.name];
      r ? N.set(t.el, r.transition.from) : console.error(
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
    const { opts: e } = this, { walks: i } = e;
    return new IntersectionObserver(
      (r, n) => {
        for (let o = 0; o < r.length; o += 1) {
          const a = r[o];
          if (a.isIntersecting) {
            if (t.stage.name && !t.stage.running) {
              const h = i[t.stage.name], c = {
                ...h.transition.to,
                duration: h.duration
              };
              t.timeline.to(a.target, c, 0), t.stage.firstTween = !0;
            }
            if (t.name) {
              const h = i[t.name];
              h || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), typeof h.alphaTween == "object" ? h.alphaTween.duration = h.alphaTween.duration ? h.alphaTween.duration : h.duration : h.alphaTween === !0 && (h.alphaTween = {
                duration: h.duration,
                ease: "sine.in"
              }), h.startDelay && (h.transition.to = {
                ...h.transition.to,
                delay: h.startDelay
              }), t.timeline.staggerTo(
                t.children,
                h.duration,
                h.transition.to,
                h.interval,
                0
              ), h.alphaTween && t.timeline.staggerTo(
                t.children,
                h.alphaTween.duration,
                {
                  opacity: 1,
                  ease: h.alphaTween.ease,
                  delay: h.startDelay || 0
                },
                h.interval,
                0
              );
            }
            n.unobserve(a.target);
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
    return Array.from(t).sort((e, i) => {
      const r = e.getAttribute("data-moonwalk-order") ? parseInt(e.getAttribute("data-moonwalk-order")) : null, n = e.getAttribute("data-moonwalk-order") ? parseInt(i.getAttribute("data-moonwalk-order")) : null;
      return !r && !n ? 0 : r && !n ? -1 : !r && n ? 1 : r - n;
    });
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
      const i = this.runs[e];
      if (!i)
        return;
      let r;
      e === this.sections.length - 1 ? r = "0px" : i.rootMargin ? r = i.rootMargin : r = t.rootMargin, this.runObserver(i, r).observe(i.el);
    }
    for (let e = 0; e < this.sections.length; e += 1) {
      const i = this.sections[e];
      let r;
      e === this.sections.length - 1 ? r = "0px" : r = t.rootMargin, this.setupNamesAndStages(i), i.name || (i.observer = this.observer(i, r)), i.elements = i.el.querySelectorAll("[data-moonwalk]"), i.elements.forEach((n) => i.observer.observe(n));
    }
  }
  /**
   * Creates and returns the RUN observer for data-moonwalk-run elements
   *
   * @param {*} run
   * @param {*} rootMargin
   */
  runObserver(t, e) {
    const i = /* @__PURE__ */ new WeakMap();
    return new IntersectionObserver(
      (r, n) => {
        for (let o = 0; o < r.length; o += 1) {
          const a = r[o], h = a.boundingClientRect, c = window.innerHeight, u = window.innerWidth;
          if (a.isIntersecting && t.callback) {
            let d = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  d.direction = "bottom";
                  break;
                case "up":
                  d.direction = "top";
                  break;
                case "right":
                  d.direction = "left";
                  break;
                case "left":
                  d.direction = "right";
                  break;
              }
            i.set(a.target, {
              top: h.top,
              bottom: h.bottom,
              left: h.left,
              right: h.right
            });
            const f = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, f, d), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && n.unobserve(a.target);
          } else if (t.onExit && a.target.hasAttribute("data-moonwalk-run-triggered")) {
            const d = a.target.hasAttribute(
              "data-moonwalk-run-exit-triggered"
            );
            a.target.setAttribute("data-moonwalk-run-exit-triggered", "");
            let f = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  f.direction = "top";
                  break;
                case "up":
                  f.direction = "bottom";
                  break;
                case "right":
                  f.direction = "right";
                  break;
                case "left":
                  f.direction = "left";
                  break;
              }
            else
              h.bottom <= 0 ? f.direction = "top" : h.top >= c ? f.direction = "bottom" : h.right <= 0 ? f.direction = "left" : h.left >= u && (f.direction = "right");
            t.onExit(a.target, d, f), t.repeated || n.unobserve(a.target);
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
    const { opts: i } = this;
    return new IntersectionObserver(
      (r, n) => {
        for (let o = 0; o < r.length; o += 1) {
          const a = r[o];
          if (a.isIntersecting || a.intersectionRatio > 0) {
            t.running = !0, a.target.dataset.moonwalkId && console.debug("-- intersecting", a.target.dataset.moonwalkId);
            const h = a.target.getAttribute("data-moonwalk"), c = h.length ? i.walks[h] : i.walks.default, { duration: u, transition: d, interval: f, startDelay: l } = c;
            let { alphaTween: g } = c, p = (u - f) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof g == "object" && g !== null ? g.duration = g.duration ? g.duration : u : g === !0 && (g = {
              duration: u,
              ease: "sine.in"
            });
            const _ = d ? this.tweenJS : this.tweenCSS, C = () => {
              _(
                t,
                a.target,
                u,
                f,
                d,
                p,
                g
              );
            }, v = () => {
              l ? N.delayedCall(l, C) : C();
            };
            if (a.target.tagName === "IMG")
              Go(a.target).then(() => v());
            else if (a.target.hasAttribute("data-placeholder"))
              v();
            else {
              const x = a.target.querySelectorAll("img");
              x.length ? Array.from(x).every(
                (w) => w.hasAttribute("data-ll-placeholder")
              ) ? v() : Dc(x).then(() => v()) : v();
            }
            n.unobserve(a.target);
          }
        }
      },
      {
        rootMargin: e,
        threshold: i.threshold
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
  tweenJS(t, e, i, r, n, o, a) {
    let h;
    const c = i - o;
    if (it.hasAttribute(e, "data-moonwalked"))
      return;
    if (t.timeline.isActive() && t.timeline.recent()) {
      const d = t.timeline.time(), f = t.timeline.recent().time(), l = t.timeline.recent().endTime();
      f > c ? h = () => t.timeline.time() : d + o * -1 < l ? h = () => `>${o}` : h = () => t.timeline.time();
    } else
      h = () => ">";
    N.set(e, n.from);
    const u = {
      ...n.to,
      duration: i,
      onComplete: () => e.setAttribute("data-moonwalked", "")
    };
    t.timeline.to(e, u, h()), a && t.timeline.to(
      e,
      {
        duration: a.duration,
        opacity: 1,
        ease: a.ease,
        delay: a.delay ? a.delay : 0
      },
      "<"
    );
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
  tweenCSS(t, e, i, r, n, o) {
    let a;
    const h = i - o * -1;
    if (!it.hasAttribute(e, "data-moonwalked")) {
      if (t.timeline.isActive() && t.timeline.recent()) {
        const c = t.timeline.time(), u = t.timeline.recent().time(), d = t.timeline.recent().endTime();
        u > h ? a = () => t.timeline.time() : c + o * -1 < d ? a = () => `>${o}` : a = () => t.timeline.time();
      } else
        a = () => ">";
      t.timeline.to(
        e,
        {
          css: {
            className: e.className ? `${e.className} moonwalked` : "moonwalked"
          },
          duration: i
        },
        a()
      ).call(() => e.setAttribute("data-moonwalked", ""), null, ">");
    }
  }
}
const _v = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, zs = [];
class Wv {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = qt(i, _v), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
    const r = document.querySelector(
      `[data-popover-template=${e.dataset.popoverTarget}]`
    );
    this.popover = document.createElement("div"), this.popover.innerHTML = r.innerHTML, Object.assign(this.popover.style, {
      position: "fixed"
    }), this.popover.classList.add(this.className), r.classList && r.classList.length > 0 && r.classList.forEach((n) => {
      n !== "popover-template" && this.popover.classList.add(n);
    }), this.boundHandleDocumentClick = this.handleDocumentClick.bind(this), this.boundHandleScroll = this.handleScroll.bind(this), t.featureTests.results.touch ? this.trigger.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this)
    ) : this.opts.clickToggle ? this.trigger.addEventListener("click", this.handleClick.bind(this)) : (this.trigger.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    ), this.trigger.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    ));
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), zs.includes(this) || zs.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
      this.addScrollListener();
    }), typeof this.opts.onShow == "function" && requestAnimationFrame(() => {
      this.opts.onShow(this);
    });
  }
  // Update popover position based on trigger position
  updatePosition(t = !0) {
    const { top: e, left: i } = this.trigger.getBoundingClientRect(), { offsetHeight: r, offsetWidth: n } = this.trigger, { offsetHeight: o, offsetWidth: a } = this.popover, h = this.orderedPositions.indexOf(this.position), c = {
      top: {
        name: "top",
        top: e - o,
        left: i - (a - n) / 2
      },
      right: {
        name: "right",
        top: e - (o - r) / 2,
        left: i + n
      },
      bottom: {
        name: "bottom",
        top: e + r,
        left: i - (a - n) / 2
      },
      left: {
        name: "left",
        top: e - (o - r) / 2,
        left: i - a
      }
    }, u = this.orderedPositions.slice(h).concat(this.orderedPositions.slice(0, h)).map((d) => c[d]).find((d) => (t || (this.popover.style.top = `${d.top}px`, this.popover.style.left = `${d.left}px`), it.inViewport(this.popover)));
    this.orderedPositions.forEach((d) => {
      this.popover.classList.remove(`${this.className}--${d}`);
    }), u ? (t && this.isVisible ? N.to(this.popover, {
      top: Math.max(0, u.top),
      left: Math.max(0, u.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, u.top)}px`, this.popover.style.left = `${Math.max(0, u.left)}px`), this.popover.classList.add(`${this.className}--${u.name}`), this.currentPosition = u.name) : (t && this.isVisible ? N.to(this.popover, {
      top: Math.max(0, c.bottom.top),
      left: Math.max(0, c.bottom.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, c.bottom.top)}px`, this.popover.style.left = `${Math.max(0, c.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = zs.indexOf(this);
    t !== -1 && zs.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    zs.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Jr, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(
      Jr,
      this.boundHandleScroll
    );
  }
}
const vv = {
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
  tweenIn: (s, t, e) => {
    N.set(e.backdrop, { display: "block" }), N.to(e.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        N.fromTo(
          t,
          {
            duration: 0.3,
            yPercent: -50,
            x: -5,
            xPercent: -50,
            opacity: 0,
            display: "block"
          },
          {
            duration: 0.3,
            yPercent: -50,
            xPercent: -50,
            x: 0,
            opacity: 1
          }
        );
      }
    });
  },
  tweenOut: (s) => {
    console.log("default tweenOut");
    const t = s.currentPopup;
    t && N.to(t, {
      duration: 0.3,
      opacity: 0,
      display: "none"
    }), N.to(s.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        s.backdrop.remove();
      }
    });
  }
};
class Uv {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = qt(i, vv), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
  }
  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    const t = document.querySelectorAll("[data-popup-trigger]"), e = Array.from(t).filter((n) => {
      const o = n.getAttribute("data-popup-trigger");
      if (typeof o == "string") {
        const a = document.querySelector(o);
        return a && a.matches(this.opts.selector);
      }
      return !1;
    }), i = document.querySelectorAll(this.opts.selector), r = [];
    i.forEach((n) => {
      const o = n.querySelectorAll("[data-popup-close]");
      r.push(...o);
    }), e.forEach((n) => {
      const o = n.getAttribute("data-popup-trigger"), a = n.getAttribute("data-popup-key") || this.getKeyFromTarget(o);
      n.addEventListener("click", (h) => {
        this.opts.responsive(this.app) && (h.stopImmediatePropagation(), h.preventDefault(), this.open(n, o, a));
      });
    }), r.forEach((n) => {
      const o = n.closest(this.opts.selector), a = o ? o.getAttribute("data-popup-key") : null;
      n.addEventListener("click", (h) => {
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), N.set(e, { opacity: 0, display: "none", zIndex: 4999 }), e.addEventListener("click", (i) => {
      i.stopPropagation(), this.close();
    }), document.body.append(e), e;
  }
  /**
   * Open a popup
   * @param {HTMLElement} trigger - Element that triggered the popup
   * @param {HTMLElement|string} target - Popup element or selector
   * @param {string|null} key - Optional popup key
   */
  open(t, e, i = null) {
    if (this.keyUpListener = this.onKeyup.bind(this), document.addEventListener("keyup", this.keyUpListener), this.popupKey = i || this.getKeyFromTarget(e), this.backdrop = this.createBackdrop(this.popupKey), typeof e == "string" && (e = document.querySelector(e)), !e) {
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
const yv = {
  onIntersect: (s, t) => {
  }
};
class qv {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, yv), this.initialize();
  }
  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = it.all("[data-scrollspy-trigger]");
    const t = {
      rootMargin: "-55px 0px -85%"
    }, e = new IntersectionObserver((i) => {
      i.forEach((r) => {
        r.isIntersecting && this.intersectionHandler(r);
      });
    }, t);
    this.triggers.forEach((i) => e.observe(i));
  }
  /**
   * Handle intersection with viewport
   * @param {IntersectionObserverEntry} entry - Intersection observer entry
   */
  intersectionHandler(t) {
    const e = t.target.dataset.scrollspyTrigger, i = document.querySelector("[data-scrollspy-active]"), r = document.querySelector(`[data-scrollspy-target="${e}"]`);
    i && i.removeAttribute("data-scrollspy-active"), r && (r.dataset.scrollspyActive = "", this.opts.onIntersect(t.target, r));
  }
}
const wv = {};
class Xv {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, wv), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-boxes-stacked]"), e = new IntersectionObserver((i) => {
      const [{ isIntersecting: r, target: n }] = i;
      r && this.adjustBox(n);
    });
    Array.from(t).forEach((i) => {
      e.observe(i);
    });
  }
  adjustBox(t) {
    const e = t.querySelector("[data-boxes-stacked-size-target]"), i = t.querySelector("[data-boxes-stacked-size-src]");
    e && this.size(e, i);
    const r = t.querySelector("[data-boxes-stacked-pull]");
    if (r) {
      const n = r.getAttribute("data-boxes-stacked-pull");
      let o;
      switch (n) {
        case "1/3":
          o = r.clientHeight / 3;
          break;
        case "2/3":
          o = r.clientHeight / 3 * 2;
          break;
        case "1/2":
          o = r.clientHeight / 2;
          break;
        default:
          console.error(
            "==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value"
          );
      }
      this.pull(r, o);
    }
  }
  pull(t, e) {
    N.set(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    N.set(t, { height: e.clientHeight });
  }
}
const og = {
  onMainVisible: (s) => {
    N.to(s.el, {
      duration: 3,
      opacity: 1,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    N.to(s.el, {
      duration: 1,
      opacity: 0
    });
  },
  onPin: (s) => {
    N.to(s.auxEl, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, N.to(s.auxEl, {
      duration: 0.25,
      yPercent: "-100",
      ease: "sine.in",
      autoRound: !0,
      onComplete: () => {
        s._hiding = !1;
      }
    });
  },
  onSmall: () => {
  }
}, bv = {
  el: "header[data-nav]",
  on: Bi,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      N.set(s.el, { opacity: 0 });
    },
    enter: (s) => {
      N.timeline().set(s.auxEl, { yPercent: -100 }).set(s.lis, { opacity: 0 }).to(s.auxEl, 1, {
        yPercent: 0,
        delay: s.opts.enterDelay,
        ease: "power3.out",
        autoRound: !0
      }).staggerTo(s.lis, 0.8, { opacity: 1, ease: "sine.in" }, 0.1, "-=1");
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0,
    // how far from the top before we trigger hide
    offsetSmall: 50,
    // how far from the top before we trigger the shrinked padding,
    offsetBg: 200,
    // how far down before changing backgroundcolor
    ...og
  }
};
class Vv {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, bv), this.mainOpts.pinOnOutline && window.addEventListener(cl, () => {
      this.preventUnpin = !0, this.pin();
    }), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.auxEl = this.opts.onClone(this), this.auxEl.setAttribute("data-header-pinned", ""), this.auxEl.setAttribute("data-auxiliary-nav", ""), this.auxEl.removeAttribute("data-nav"), document.body.appendChild(this.auxEl), this.small(), this.unpin(), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._isResizing = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.firstReveal = !0, this.initialize();
  }
  initialize() {
    if (this.lastKnownScrollY = this.getScrollY(), this.currentScrollY = this.lastKnownScrollY, typeof this.opts.offsetBg == "string") {
      const t = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = t.offsetTop - this.el.offsetHeight;
    }
    this.setupObserver(), window.addEventListener(this.mainOpts.on, this.bindObserver.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && window.addEventListener(
      Yi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      Jr,
      this.update.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScroll && (window.addEventListener(ll, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      hl,
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
    const e = this.currentScrollY > this.lastKnownScrollY, i = this.currentScrollY >= this.opts.offset;
    return e && i && t;
  }
  shouldPin(t) {
    if (this._isResizing)
      return !1;
    const e = this.currentScrollY < this.lastKnownScrollY, i = this.currentScrollY <= this.opts.offset;
    return e && t || i;
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
    const i = e.sections[t];
    return e = qt(i, og, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      Ic,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      Mc,
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
class Gv {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} options - Configuration options
   * @param {Function} options.onOpen - Callback when toggle opens
   * @param {Function} options.onClose - Callback when toggle closes
   */
  constructor(t, e, i = {}) {
    this.open = !1, this.app = t, this.el = e, this.onOpen = i.onOpen, this.onClose = i.onClose, this.onBeforeOpen = i.onBeforeOpen, this.onBeforeClose = i.onBeforeClose, this.trigger = it.find(this.el, "[data-toggle-trigger]"), this.triggerTarget = this.trigger.dataset.toggleTrigger, this.group = this.el.dataset.toggleGroup, this.triggerTarget ? this.content = it.all(this.el, `[data-toggle-content="${this.triggerTarget}"]`) : this.content = it.all(this.el, "[data-toggle-content]"), this.triggerIcon = it.find(this.trigger, "span.icon"), this.trigger.addEventListener("click", this.onClick.bind(this));
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
    this.group && !this.open && this.closeOthersInGroup(), this.toggleState(), this.open ? (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), N.set(this.content, { height: "auto", display: "block" }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex()), N.from(this.content, {
      height: 0,
      ease: "power1.inOut",
      stagger: 0.1,
      onComplete: () => {
        this.content.forEach((t) => t.removeAttribute("data-toggle-hidden")), this.content.forEach((t) => t.setAttribute("data-toggle-visible", "")), this.onOpen && this.onOpen(this, this.getGroupIndex());
      }
    })) : (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.removeAttribute("data-toggle-trigger-active"), this.onBeforeClose && this.onBeforeClose(this, this.getGroupIndex()), N.to(this.content, {
      duration: 0.25,
      onComplete: () => {
        this.el.classList.toggle("open"), this.content.forEach((t) => t.removeAttribute("data-toggle-visible")), this.content.forEach((t) => t.setAttribute("data-toggle-hidden", "")), this.onClose && this.onClose(this, this.getGroupIndex());
      }
    }), N.to(this.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
  }
  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    !this.group || !this.app.togglers || this.app.togglers.forEach((t) => {
      t === this || t.group !== this.group || t.open && (t.open = !1, t.triggerIcon && t.triggerIcon.classList.remove("active"), t.trigger.removeAttribute("data-toggle-trigger-active"), t.el.classList.remove("open"), N.to(t.content, {
        duration: 0.25,
        onComplete: () => {
          t.content.forEach((e) => e.removeAttribute("data-toggle-visible")), t.content.forEach((e) => e.setAttribute("data-toggle-hidden", "")), t.onClose && t.onClose(t, t.getGroupIndex());
        }
      }), N.to(t.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
    });
  }
  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open ? this.open = !1 : this.open = !0;
  }
}
class Kv {
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
    }, this.elems = [], typeof t > "u" ? this.elems = [...this.elems, ...document.querySelectorAll(this.settings.selector)] : this.elems = [...this.elems, ...t.querySelectorAll(this.settings.selector)], document.querySelectorAll("[data-typo-children]").forEach((r) => {
      this.elems = [...this.elems, ...r.children];
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
      let e = "", i = t.innerHTML.trim().replace(/&nbsp;/g, " ").split(/ (?=[^>]*(?:<|$))/);
      return i.length < this.settings.minWords ? !1 : (i = this.preventOrphans(i), e = i.join(" "), e = e.replace(/&nbsp; /g, "&nbsp;"), t.innerHTML = e, !0);
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
const jv = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const r = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, r.removeChild(e));
  }, e.onload = e.onreadystatechange, r.appendChild(e);
};
export {
  Sv as Application,
  cd as Breakpoints,
  Bo as CSSPlugin,
  Ev as Cookies,
  Cv as CoverOverlay,
  Pv as Dataloader,
  it as Dom,
  nl as Draggable,
  Ov as Dropdown,
  Av as EqualHeightElements,
  kv as EqualHeightImages,
  xv as Events,
  Iv as FixedHeader,
  Mv as FooterReveal,
  R0 as Hammer,
  Dv as HeroSlider,
  Rv as HeroVideo,
  mp as InertiaPlugin,
  Nv as Lazyload,
  zv as Lightbox,
  Fv as Links,
  Hv as Looper,
  $v as Marquee,
  Bv as MobileMenu,
  Yv as Moonwalk,
  Lv as Parallax,
  Wv as Popover,
  Uv as Popup,
  qv as ScrollSpy,
  zn as ScrollToPlugin,
  bt as ScrollTrigger,
  K_ as SplitText,
  Xv as StackedBoxes,
  Vv as StickyHeader,
  Gv as Toggler,
  Kv as Typography,
  qt as _defaultsDeep,
  N as gsap,
  Go as imageIsLoaded,
  Dc as imagesAreLoaded,
  jv as loadScript,
  Fo as prefersReducedMotion,
  ld as rafCallback
};
