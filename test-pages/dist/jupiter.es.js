function fn(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Xf(s, t) {
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
var bi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, nr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Wc, Re, Zt, nn = 1e8, We = 1 / nn, zl = Math.PI * 2, Wg = zl / 4, qg = 0, Kf = Math.sqrt, Ug = Math.cos, Xg = Math.sin, ke = function(t) {
  return typeof t == "string";
}, ie = function(t) {
  return typeof t == "function";
}, bn = function(t) {
  return typeof t == "number";
}, qc = function(t) {
  return typeof t > "u";
}, rn = function(t) {
  return typeof t == "object";
}, ri = function(t) {
  return t !== !1;
}, Uc = function() {
  return typeof window < "u";
}, $o = function(t) {
  return ie(t) || ke(t);
}, Gf = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, qe = Array.isArray, Fl = /(?:-?\.?\d|\.)+/gi, jf = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ns = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, rl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Zf = /[+-]=-?[.\d]+/, Qf = /[^,'"\[\]\s]+/gi, Kg = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Jt, Gi, Nl, Xc, xi = {}, wa = {}, Jf, td = function(t) {
  return (wa = sr(t, xi)) && ui;
}, Kc = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, ro = function(t, e) {
  return !e && console.warn(t);
}, ed = function(t, e) {
  return t && (xi[t] = e) && wa && (wa[t] = e) || xi;
}, oo = function() {
  return 0;
}, Gg = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ra = {
  suppressEvents: !0,
  kill: !1
}, jg = {
  suppressEvents: !0
}, Gc = {}, zn = [], $l = {}, id, pi = {}, ol = {}, ih = 30, oa = [], jc = "", Zc = function(t) {
  var e = t[0], i, n;
  if (rn(e) || ie(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (n = oa.length; n-- && !oa[n].targetTest(e); )
      ;
    i = oa[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new Ad(t[n], i))) || t.splice(n, 1);
  return t;
}, as = function(t) {
  return t._gsap || Zc(Ii(t))[0]._gsap;
}, nd = function(t, e, i) {
  return (i = t[e]) && ie(i) ? t[e]() : qc(i) && t.getAttribute && t.getAttribute(e) || i;
}, oi = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, ae = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ye = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, qs = function(t, e) {
  var i = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + n : i === "-" ? t - n : i === "*" ? t * n : t / n;
}, Zg = function(t, e) {
  for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, ba = function() {
  var t = zn.length, e = zn.slice(0), i, n;
  for ($l = {}, zn.length = 0, i = 0; i < t; i++)
    n = e[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Qc = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, sd = function(t, e, i, n) {
  zn.length && !Re && ba(), t.render(e, i, !!(Re && e < 0 && Qc(t))), zn.length && !Re && ba();
}, rd = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Qf).length < 2 ? e : ke(t) ? t.trim() : t;
}, od = function(t) {
  return t;
}, Si = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Qg = function(t) {
  return function(e, i) {
    for (var n in i)
      n in e || n === "duration" && t || n === "ease" || (e[n] = i[n]);
  };
}, sr = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, nh = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = rn(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, xa = function(t, e) {
  var i = {}, n;
  for (n in t)
    n in e || (i[n] = t[n]);
  return i;
}, $r = function(t) {
  var e = t.parent || Jt, i = t.keyframes ? Qg(qe(t.keyframes)) : Si;
  if (ri(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Jg = function(t, e) {
  for (var i = t.length, n = i === e.length; n && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, ad = function(t, e, i, n, r) {
  var o = t[n], a;
  if (r)
    for (a = e[r]; o && o[r] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e;
}, Va = function(t, e, i, n) {
  i === void 0 && (i = "_first"), n === void 0 && (n = "_last");
  var r = e._prev, o = e._next;
  r ? r._next = o : t[i] === e && (t[i] = o), o ? o._prev = r : t[n] === e && (t[n] = r), e._next = e._prev = e.parent = null;
}, Vn = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, ls = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, t0 = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Bl = function(t, e, i, n) {
  return t._startAt && (Re ? t._startAt.revert(ra) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, e0 = function s(t) {
  return !t || t._ts && s(t.parent);
}, sh = function(t) {
  return t._repeat ? rr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, rr = function(t, e) {
  var i = Math.floor(t = ye(t / e));
  return t && i === t ? i - 1 : i;
}, Sa = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Ha = function(t) {
  return t._end = ye(t._start + (t._tDur / Math.abs(t._ts || t._rts || We) || 0));
}, Ya = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = ye(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Ha(t), i._dirty || ls(i, t)), t;
}, ld = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Sa(t.rawTime(), e), (!e._dur || Oo(0, e.totalDuration(), i) - e._tTime > We) && e.render(i, !0)), ls(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Qi = function(t, e, i, n) {
  return e.parent && Vn(e), e._start = ye((bn(i) ? i : i || t !== Jt ? Pi(t, i, e) : t._time) + e._delay), e._end = ye(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ad(t, e, "_first", "_last", t._sort ? "_start" : 0), Vl(e) || (t._recent = e), n || ld(t, e), t._ts < 0 && Ya(t, t._tTime), t;
}, cd = function(t, e) {
  return (xi.ScrollTrigger || Kc("scrollTrigger", e)) && xi.ScrollTrigger.create(e, t);
}, ud = function(t, e, i, n, r) {
  if (tu(t, e, r), !t._initted)
    return 1;
  if (!i && t._pt && !Re && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && id !== gi.frame)
    return zn.push(t), t._lazy = [r, n], 1;
}, i0 = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Vl = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, n0 = function(t, e, i, n) {
  var r = t.ratio, o = e < 0 || !e && (!t._start && i0(t) && !(!t._initted && Vl(t)) || (t._ts < 0 || t._dp._ts < 0) && !Vl(t)) ? 0 : 1, a = t._rDelay, l = 0, u, h, f;
  if (a && t._repeat && (l = Oo(0, t._tDur, e), h = rr(l, a), t._yoyo && h & 1 && (o = 1 - o), h !== rr(t._tTime, a) && (r = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== r || Re || n || t._zTime === We || !e && t._zTime) {
    if (!t._initted && ud(t, e, n, i, l))
      return;
    for (f = t._zTime, t._zTime = e || (i ? We : 0), i || (i = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(o, u.d), u = u._next;
    e < 0 && Bl(t, e, i, !0), t._onUpdate && !i && vi(t, "onUpdate"), l && t._repeat && !i && t.parent && vi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Vn(t, 1), !i && !Re && (vi(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, s0 = function(t, e, i) {
  var n;
  if (i > e)
    for (n = t._first; n && n._start <= i; ) {
      if (n.data === "isPause" && n._start > e)
        return n;
      n = n._next;
    }
  else
    for (n = t._last; n && n._start >= i; ) {
      if (n.data === "isPause" && n._start < e)
        return n;
      n = n._prev;
    }
}, or = function(t, e, i, n) {
  var r = t._repeat, o = ye(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = r ? r < 0 ? 1e10 : ye(o * (r + 1) + t._rDelay * r) : o, a > 0 && !n && Ya(t, t._tTime = t._tDur * a), t.parent && Ha(t), i || ls(t.parent, t), t;
}, rh = function(t) {
  return t instanceof ti ? ls(t) : or(t, t._dur);
}, r0 = {
  _start: 0,
  endTime: oo,
  totalDuration: oo
}, Pi = function s(t, e, i) {
  var n = t.labels, r = t._recent || r0, o = t.duration() >= nn ? r.endTime(!1) : t._dur, a, l, u;
  return ke(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? r : i).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && i && (l = l / 100 * (qe(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + l : o + l)) : e == null ? o : +e;
}, Br = function(t, e, i) {
  var n = bn(e[1]), r = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[r], a, l;
  if (n && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = ri(l.vars.inherit) && l.parent;
    o.immediateRender = ri(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[r - 1];
  }
  return new ge(e[0], o, e[r + 1]);
}, Xn = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Oo = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, Ve = function(t, e) {
  return !ke(t) || !(e = Kg.exec(t)) ? "" : e[1];
}, o0 = function(t, e, i) {
  return Xn(i, function(n) {
    return Oo(t, e, n);
  });
}, Hl = [].slice, hd = function(t, e) {
  return t && rn(t) && "length" in t && (!e && !t.length || t.length - 1 in t && rn(t[0])) && !t.nodeType && t !== Gi;
}, a0 = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(n) {
    var r;
    return ke(n) && !e || hd(n, 1) ? (r = i).push.apply(r, Ii(n)) : i.push(n);
  }) || i;
}, Ii = function(t, e, i) {
  return Zt && !e && Zt.selector ? Zt.selector(t) : ke(t) && !i && (Nl || !ar()) ? Hl.call((e || Xc).querySelectorAll(t), 0) : qe(t) ? a0(t, i) : hd(t) ? Hl.call(t, 0) : t ? [t] : [];
}, Yl = function(t) {
  return t = Ii(t)[0] || ro("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Ii(e, i.querySelectorAll ? i : i === t ? ro("Invalid scope") || Xc.createElement("div") : t);
  };
}, fd = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, dd = function(t) {
  if (ie(t))
    return t;
  var e = rn(t) ? t : {
    each: t
  }, i = cs(e.ease), n = e.from || 0, r = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, u = e.axis, h = n, f = n;
  return ke(n) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (h = n[0], f = n[1]), function(d, c, m) {
    var p = (m || e).length, y = o[p], v, A, C, S, _, P, O, T, k;
    if (!y) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, nn])[1], !k) {
        for (O = -1e8; O < (O = m[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (y = o[p] = [], v = l ? Math.min(k, p) * h - 0.5 : n % k, A = k === nn ? 0 : l ? p * f / k - 0.5 : n / k | 0, O = 0, T = nn, P = 0; P < p; P++)
        C = P % k - v, S = A - (P / k | 0), y[P] = _ = u ? Math.abs(u === "y" ? S : C) : Kf(C * C + S * S), _ > O && (O = _), _ < T && (T = _);
      n === "random" && fd(y), y.max = O - T, y.min = T, y.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : u ? u === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (n === "edges" ? -1 : 1), y.b = p < 0 ? r - p : r, y.u = Ve(e.amount || e.each) || 0, i = i && p < 0 ? Sd(i) : i;
    }
    return p = (y[d] - y.min) / y.max || 0, ye(y.b + (i ? i(p) : p) * y.v) + y.u;
  };
}, Wl = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var n = ye(Math.round(parseFloat(i) / t) * t * e);
    return (n - n % 1) / e + (bn(i) ? 0 : Ve(i));
  };
}, pd = function(t, e) {
  var i = qe(t), n, r;
  return !i && rn(t) && (n = i = t.radius || nn, t.values ? (t = Ii(t.values), (r = !bn(t[0])) && (n *= n)) : t = Wl(t.increment)), Xn(e, i ? ie(t) ? function(o) {
    return r = t(o), Math.abs(r - o) <= n ? r : o;
  } : function(o) {
    for (var a = parseFloat(r ? o.x : o), l = parseFloat(r ? o.y : 0), u = nn, h = 0, f = t.length, d, c; f--; )
      r ? (d = t[f].x - a, c = t[f].y - l, d = d * d + c * c) : d = Math.abs(t[f] - a), d < u && (u = d, h = f);
    return h = !n || u <= n ? t[h] : o, r || h === o || bn(o) ? h : h + Ve(o);
  } : Wl(t));
}, md = function(t, e, i, n) {
  return Xn(qe(t) ? !e : i === !0 ? !!(i = 0) : !n, function() {
    return qe(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * n) / n;
  });
}, l0 = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}, c0 = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || Ve(i));
  };
}, u0 = function(t, e, i) {
  return yd(t, e, 0, 1, i);
}, gd = function(t, e, i) {
  return Xn(i, function(n) {
    return t[~~e(n)];
  });
}, h0 = function s(t, e, i) {
  var n = e - t;
  return qe(t) ? gd(t, s(0, t.length), e) : Xn(i, function(r) {
    return (n + (r - t) % n) % n + t;
  });
}, f0 = function s(t, e, i) {
  var n = e - t, r = n * 2;
  return qe(t) ? gd(t, s(0, t.length - 1), e) : Xn(i, function(o) {
    return o = (r + (o - t) % r) % r || 0, t + (o > n ? r - o : o);
  });
}, ao = function(t) {
  for (var e = 0, i = "", n, r, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", r = t.substr(n + 7, o - n - 7).match(a ? Qf : Fl), i += t.substr(e, n - e) + md(a ? r : +r[0], a ? 0 : +r[1], +r[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, yd = function(t, e, i, n, r) {
  var o = e - t, a = n - i;
  return Xn(r, function(l) {
    return i + ((l - t) / o * a || 0);
  });
}, d0 = function s(t, e, i, n) {
  var r = isNaN(t + e) ? 0 : function(c) {
    return (1 - c) * t + c * e;
  };
  if (!r) {
    var o = ke(t), a = {}, l, u, h, f, d;
    if (i === !0 && (n = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (qe(t) && !qe(e)) {
      for (h = [], f = t.length, d = f - 2, u = 1; u < f; u++)
        h.push(s(t[u - 1], t[u]));
      f--, r = function(m) {
        m *= f;
        var p = Math.min(d, ~~m);
        return h[p](m - p);
      }, i = e;
    } else n || (t = sr(qe(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        Jc.call(a, t, l, "get", e[l]);
      r = function(m) {
        return nu(m, a) || (o ? t.p : t);
      };
    }
  }
  return Xn(i, r);
}, oh = function(t, e, i) {
  var n = t.labels, r = nn, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!i && a && r > (a = Math.abs(a)) && (l = o, r = a);
  return l;
}, vi = function(t, e, i) {
  var n = t.vars, r = n[e], o = Zt, a = t._ctx, l, u, h;
  if (r)
    return l = n[e + "Params"], u = n.callbackScope || t, i && zn.length && ba(), a && (Zt = a), h = l ? r.apply(u, l) : r.call(u), Zt = o, h;
}, Er = function(t) {
  return Vn(t), t.scrollTrigger && t.scrollTrigger.kill(!!Re), t.progress() < 1 && vi(t, "onInterrupt"), t;
}, $s, _d = [], vd = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Uc() || t.headless) {
      var e = t.name, i = ie(t), n = e && !i && t.init ? function() {
        this._props = [];
      } : t, r = {
        init: oo,
        render: nu,
        add: Jc,
        kill: P0,
        modifier: O0,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: iu,
        aliases: {},
        register: 0
      };
      if (ar(), t !== n) {
        if (pi[e])
          return;
        Si(n, Si(xa(t, r), o)), sr(n.prototype, sr(r, xa(t, o))), pi[n.prop = e] = n, t.targetTest && (oa.push(n), Gc[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      ed(e, n), t.register && t.register(ui, n, ai);
    } else
      _d.push(t);
}, Vt = 255, Ar = {
  aqua: [0, Vt, Vt],
  lime: [0, Vt, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Vt],
  navy: [0, 0, 128],
  white: [Vt, Vt, Vt],
  olive: [128, 128, 0],
  yellow: [Vt, Vt, 0],
  orange: [Vt, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Vt, 0, 0],
  pink: [Vt, 192, 203],
  cyan: [0, Vt, Vt],
  transparent: [Vt, Vt, Vt, 0]
}, al = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Vt + 0.5 | 0;
}, wd = function(t, e, i) {
  var n = t ? bn(t) ? [t >> 16, t >> 8 & Vt, t & Vt] : 0 : Ar.black, r, o, a, l, u, h, f, d, c, m;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Ar[t])
      n = Ar[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (r = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + r + r + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & Vt, n & Vt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & Vt, t & Vt];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = m = t.match(Fl), !e)
        l = +n[0] % 360 / 360, u = +n[1] / 100, h = +n[2] / 100, o = h <= 0.5 ? h * (u + 1) : h + u - h * u, r = h * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = al(l + 1 / 3, r, o), n[1] = al(l, r, o), n[2] = al(l - 1 / 3, r, o);
      else if (~t.indexOf("="))
        return n = t.match(jf), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(Fl) || Ar.transparent;
    n = n.map(Number);
  }
  return e && !m && (r = n[0] / Vt, o = n[1] / Vt, a = n[2] / Vt, f = Math.max(r, o, a), d = Math.min(r, o, a), h = (f + d) / 2, f === d ? l = u = 0 : (c = f - d, u = h > 0.5 ? c / (2 - f - d) : c / (f + d), l = f === r ? (o - a) / c + (o < a ? 6 : 0) : f === o ? (a - r) / c + 2 : (r - o) / c + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(u * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, bd = function(t) {
  var e = [], i = [], n = -1;
  return t.split(Fn).forEach(function(r) {
    var o = r.match(Ns) || [];
    e.push.apply(e, o), i.push(n += o.length + 1);
  }), e.c = i, e;
}, ah = function(t, e, i) {
  var n = "", r = (t + n).match(Fn), o = e ? "hsla(" : "rgba(", a = 0, l, u, h, f;
  if (!r)
    return t;
  if (r = r.map(function(d) {
    return (d = wd(d, e, 1)) && o + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = bd(t), l = i.c, l.join(n) !== h.c.join(n)))
    for (u = t.replace(Fn, "1").split(Ns), f = u.length - 1; a < f; a++)
      n += u[a] + (~l.indexOf(a) ? r.shift() || o + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!u)
    for (u = t.split(Fn), f = u.length - 1; a < f; a++)
      n += u[a] + r[a];
  return n + u[f];
}, Fn = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Ar)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), p0 = /hsl[a]?\(/, xd = function(t) {
  var e = t.join(" "), i;
  if (Fn.lastIndex = 0, Fn.test(e))
    return i = p0.test(e), t[1] = ah(t[1], i), t[0] = ah(t[0], i, bd(t[1])), !0;
}, lo, gi = function() {
  var s = Date.now, t = 500, e = 33, i = s(), n = i, r = 1e3 / 240, o = r, a = [], l, u, h, f, d, c, m = function p(y) {
    var v = s() - n, A = y === !0, C, S, _, P;
    if ((v > t || v < 0) && (i += v - e), n += v, _ = n - i, C = _ - o, (C > 0 || A) && (P = ++f.frame, d = _ - f.time * 1e3, f.time = _ = _ / 1e3, o += C + (C >= r ? 4 : r - C), S = 1), A || (l = u(p)), S)
      for (c = 0; c < a.length; c++)
        a[c](_, d, P, y);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(y) {
      return d / (1e3 / (y || 60));
    },
    wake: function() {
      Jf && (!Nl && Uc() && (Gi = Nl = window, Xc = Gi.document || {}, xi.gsap = ui, (Gi.gsapVersions || (Gi.gsapVersions = [])).push(ui.version), td(wa || Gi.GreenSockGlobals || !Gi.gsap && Gi || {}), _d.forEach(vd)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), u = h || function(y) {
        return setTimeout(y, o - f.time * 1e3 + 1 | 0);
      }, lo = 1, m(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), lo = 0, u = oo;
    },
    lagSmoothing: function(y, v) {
      t = y || 1 / 0, e = Math.min(v || 33, t);
    },
    fps: function(y) {
      r = 1e3 / (y || 240), o = f.time * 1e3 + r;
    },
    add: function(y, v, A) {
      var C = v ? function(S, _, P, O) {
        y(S, _, P, O), f.remove(C);
      } : y;
      return f.remove(y), a[A ? "unshift" : "push"](C), ar(), C;
    },
    remove: function(y, v) {
      ~(v = a.indexOf(y)) && a.splice(v, 1) && c >= v && c--;
    },
    _listeners: a
  }, f;
}(), ar = function() {
  return !lo && gi.wake();
}, At = {}, m0 = /^[\d.\-M][\d.\-,\s]/, g0 = /["']/g, y0 = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), n = i[0], r = 1, o = i.length, a, l, u; r < o; r++)
    l = i[r], a = r !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), e[n] = isNaN(u) ? u.replace(g0, "").trim() : +u, n = l.substr(a + 1).trim();
  return e;
}, _0 = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
}, v0 = function(t) {
  var e = (t + "").split("("), i = At[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [y0(e[1])] : _0(t).split(",").map(rd)) : At._CE && m0.test(t) ? At._CE("", t) : i;
}, Sd = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Td = function s(t, e) {
  for (var i = t._first, n; i; )
    i instanceof ti ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next;
}, cs = function(t, e) {
  return t && (ie(t) ? t : At[t] || v0(t)) || e;
}, Ts = function(t, e, i, n) {
  i === void 0 && (i = function(l) {
    return 1 - e(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2;
  });
  var r = {
    easeIn: e,
    easeOut: i,
    easeInOut: n
  }, o;
  return oi(t, function(a) {
    At[a] = xi[a] = r, At[o = a.toLowerCase()] = i;
    for (var l in r)
      At[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = At[a + "." + l] = r[l];
  }), r;
}, Ed = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ll = function s(t, e, i) {
  var n = e >= 1 ? e : 1, r = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = r / zl * (Math.asin(1 / n) || 0), a = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * Xg((h - o) * r) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Ed(a);
  return r = zl / r, l.config = function(u, h) {
    return s(t, u, h);
  }, l;
}, cl = function s(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, n = t === "out" ? i : t === "in" ? function(r) {
    return 1 - i(1 - r);
  } : Ed(i);
  return n.config = function(r) {
    return s(t, r);
  }, n;
};
oi("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  Ts(s + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
At.Linear.easeNone = At.none = At.Linear.easeIn;
Ts("Elastic", ll("in"), ll("out"), ll());
(function(s, t) {
  var e = 1 / t, i = 2 * e, n = 2.5 * e, r = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Ts("Bounce", function(o) {
    return 1 - r(1 - o);
  }, r);
})(7.5625, 2.75);
Ts("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
Ts("Circ", function(s) {
  return -(Kf(1 - s * s) - 1);
});
Ts("Sine", function(s) {
  return s === 1 ? 1 : -Ug(s * Wg) + 1;
});
Ts("Back", cl("in"), cl("out"), cl());
At.SteppedEase = At.steps = xi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, n = t + (e ? 0 : 1), r = e ? 1 : 0, o = 1 - We;
    return function(a) {
      return ((n * Oo(0, o, a) | 0) + r) * i;
    };
  }
};
nr.ease = At["quad.out"];
oi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return jc += s + "," + s + "Params,";
});
var Ad = function(t, e) {
  this.id = qg++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : nd, this.set = e ? e.getSetter : iu;
}, co = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, or(this, +e.duration, 1, 1), this.data = e.data, Zt && (this._ctx = Zt, Zt.data.push(this)), lo || gi.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, or(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, n) {
    if (ar(), !arguments.length)
      return this._tTime;
    var r = this._dp;
    if (r && r.smoothChildTiming && this._ts) {
      for (Ya(this, i), !r._dp || r.parent || ld(r, this); r && r.parent; )
        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Qi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === We || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), sd(this, i, n)), this;
  }, t.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + sh(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + sh(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? rr(this._tTime, r) + 1 : 1;
  }, t.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? Sa(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(Oo(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), Ha(this), t0(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ar(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== We && (this._tTime -= We)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Qi(n, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ri(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var n = this.parent || this._dp;
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Sa(n.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = jg);
    var n = Re;
    return Re = i, Qc(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Re = n, this;
  }, t.globalTime = function(i) {
    for (var n = this, r = arguments.length ? i : n.rawTime(); n; )
      r = n._start + r / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : r;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, rh(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = i, rh(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, n) {
    return this.totalTime(Pi(this, i), ri(n));
  }, t.restart = function(i, n) {
    return this.play().totalTime(i ? -this._delay : 0, ri(n)), this._dur || (this._zTime = -1e-8), this;
  }, t.play = function(i, n) {
    return i != null && this.seek(i, n), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, n) {
    return i != null && this.seek(i || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, t.pause = function(i, n) {
    return i != null && this.seek(i, n), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -1e-8 : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -1e-8, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, n = this._start, r;
    return !!(!i || this._ts && this._initted && i.isActive() && (r = i.rawTime(!0)) >= n && r < this.endTime(!0) - We);
  }, t.eventCallback = function(i, n, r) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[i] = n, r && (o[i + "Params"] = r), i === "onUpdate" && (this._onUpdate = n)) : delete o[i], this) : o[i];
  }, t.then = function(i) {
    var n = this;
    return new Promise(function(r) {
      var o = ie(i) ? i : od, a = function() {
        var u = n.then;
        n.then = null, ie(o) && (o = o(n)) && (o.then || o === n) && (n.then = u), r(o), n.then = u;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    Er(this);
  }, s;
}();
Si(co.prototype, {
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
var ti = /* @__PURE__ */ function(s) {
  Xf(t, s);
  function t(i, n) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = ri(i.sortChildren), Jt && Qi(i.parent || Jt, fn(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && cd(fn(r), i.scrollTrigger), r;
  }
  var e = t.prototype;
  return e.to = function(n, r, o) {
    return Br(0, arguments, this), this;
  }, e.from = function(n, r, o) {
    return Br(1, arguments, this), this;
  }, e.fromTo = function(n, r, o, a) {
    return Br(2, arguments, this), this;
  }, e.set = function(n, r, o) {
    return r.duration = 0, r.parent = this, $r(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new ge(n, r, Pi(this, o), 1), this;
  }, e.call = function(n, r, o) {
    return Qi(this, ge.delayedCall(0, n, r), o);
  }, e.staggerTo = function(n, r, o, a, l, u, h) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = h, o.parent = this, new ge(n, o, Pi(this, l)), this;
  }, e.staggerFrom = function(n, r, o, a, l, u, h) {
    return o.runBackwards = 1, $r(o).immediateRender = ri(o.immediateRender), this.staggerTo(n, r, o, a, l, u, h);
  }, e.staggerFromTo = function(n, r, o, a, l, u, h, f) {
    return a.startAt = o, $r(a).immediateRender = ri(a.immediateRender), this.staggerTo(n, r, a, l, u, h, f);
  }, e.render = function(n, r, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, h = n <= 0 ? 0 : ye(n), f = this._zTime < 0 != n < 0 && (this._initted || !u), d, c, m, p, y, v, A, C, S, _, P, O;
    if (this !== Jt && h > l && n >= 0 && (h = l), h !== this._tTime || o || f) {
      if (a !== this._time && u && (h += this._time - a, n += this._time - a), d = h, S = this._start, C = this._ts, v = !C, f && (u || (a = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (P = this._yoyo, y = u + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(y * 100 + n, r, o);
        if (d = ye(h % y), h === l ? (p = this._repeat, d = u) : (_ = ye(h / y), p = ~~_, p && p === _ && (d = u, p--), d > u && (d = u)), _ = rr(this._tTime, y), !a && this._tTime && _ !== p && this._tTime - _ * y - this._dur <= 0 && (_ = p), P && p & 1 && (d = u - d, O = 1), p !== _ && !this._lock) {
          var T = P && _ & 1, k = T === (P && p & 1);
          if (p < _ && (T = !T), a = T ? 0 : h % u ? u : h, this._lock = 1, this.render(a || (O ? 0 : ye(p * y)), r, !u)._lock = 0, this._tTime = h, !r && this.parent && vi(this, "onRepeat"), this.vars.repeatRefresh && !O && (this.invalidate()._lock = 1), a && a !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, k && (this._lock = 2, a = T ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !O && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
          Td(this, O);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = s0(this, ye(a), ye(d)), A && (h -= d - (d = A._start))), this._tTime = h, this._time = d, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !r && !_ && (vi(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && n >= 0)
        for (c = this._first; c; ) {
          if (m = c._next, (c._act || d >= c._start) && c._ts && A !== c) {
            if (c.parent !== this)
              return this.render(n, r, o);
            if (c.render(c._ts > 0 ? (d - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (d - c._start) * c._ts, r, o), d !== this._time || !this._ts && !v) {
              A = 0, m && (h += this._zTime = -1e-8);
              break;
            }
          }
          c = m;
        }
      else {
        c = this._last;
        for (var R = n < 0 ? n : d; c; ) {
          if (m = c._prev, (c._act || R <= c._end) && c._ts && A !== c) {
            if (c.parent !== this)
              return this.render(n, r, o);
            if (c.render(c._ts > 0 ? (R - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (R - c._start) * c._ts, r, o || Re && Qc(c)), d !== this._time || !this._ts && !v) {
              A = 0, m && (h += this._zTime = R ? -1e-8 : We);
              break;
            }
          }
          c = m;
        }
      }
      if (A && !r && (this.pause(), A.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = S, Ha(this), this.render(n, r, o);
      this._onUpdate && !r && vi(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (S === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((n || !u) && (h === l && this._ts > 0 || !h && this._ts < 0) && Vn(this, 1), !r && !(n < 0 && !a) && (h || a || !l) && (vi(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, r) {
    var o = this;
    if (bn(r) || (r = Pi(this, r, n)), !(n instanceof co)) {
      if (qe(n))
        return n.forEach(function(a) {
          return o.add(a, r);
        }), this;
      if (ke(n))
        return this.addLabel(n, r);
      if (ie(n))
        n = ge.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? Qi(this, n, r) : this;
  }, e.getChildren = function(n, r, o, a) {
    n === void 0 && (n = !0), r === void 0 && (r = !0), o === void 0 && (o = !0), a === void 0 && (a = -1e8);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof ge ? r && l.push(u) : (o && l.push(u), n && l.push.apply(l, u.getChildren(!0, r, o)))), u = u._next;
    return l;
  }, e.getById = function(n) {
    for (var r = this.getChildren(1, 1, 1), o = r.length; o--; )
      if (r[o].vars.id === n)
        return r[o];
  }, e.remove = function(n) {
    return ke(n) ? this.removeLabel(n) : ie(n) ? this.killTweensOf(n) : (n.parent === this && Va(this, n), n === this._recent && (this._recent = this._last), ls(this));
  }, e.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(gi.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, r) {
    return this.labels[n] = Pi(this, r), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, r, o) {
    var a = ge.delayedCall(0, r || oo, o);
    return a.data = "isPause", this._hasPause = 1, Qi(this, a, Pi(this, n));
  }, e.removePause = function(n) {
    var r = this._first;
    for (n = Pi(this, n); r; )
      r._start === n && r.data === "isPause" && Vn(r), r = r._next;
  }, e.killTweensOf = function(n, r, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      kn !== a[l] && a[l].kill(n, r);
    return this;
  }, e.getTweensOf = function(n, r) {
    for (var o = [], a = Ii(n), l = this._first, u = bn(r), h; l; )
      l instanceof ge ? Zg(l._targets, a) && (u ? (!kn || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && o.push(l) : (h = l.getTweensOf(a, r)).length && o.push.apply(o, h), l = l._next;
    return o;
  }, e.tweenTo = function(n, r) {
    r = r || {};
    var o = this, a = Pi(o, n), l = r, u = l.startAt, h = l.onStart, f = l.onStartParams, d = l.immediateRender, c, m = ge.to(o, Si({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: r.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || We,
      onStart: function() {
        if (o.pause(), !c) {
          var y = r.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          m._dur !== y && or(m, y, 0, 1).render(m._time, !0, !0), c = 1;
        }
        h && h.apply(m, f || []);
      }
    }, r));
    return d ? m.render(0) : m;
  }, e.tweenFromTo = function(n, r, o) {
    return this.tweenTo(r, Si({
      startAt: {
        time: Pi(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), oh(this, Pi(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), oh(this, Pi(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + We);
  }, e.shiftChildren = function(n, r, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, u; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (r)
      for (u in l)
        l[u] >= o && (l[u] += n);
    return ls(this);
  }, e.invalidate = function(n) {
    var r = this._first;
    for (this._lock = 0; r; )
      r.invalidate(n), r = r._next;
    return s.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var r = this._first, o; r; )
      o = r._next, this.remove(r), r = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), ls(this);
  }, e.totalDuration = function(n) {
    var r = 0, o = this, a = o._last, l = nn, u, h, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Qi(o, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (r -= h, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > r && a._ts && (r = a._end), a = u;
      or(o, o === Jt && o._time > r ? o._time : r, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (Jt._ts && (sd(Jt, Sa(n, Jt)), id = gi.frame), gi.frame >= ih) {
      ih += bi.autoSleep || 120;
      var r = Jt._first;
      if ((!r || !r._ts) && bi.autoSleep && gi._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || gi.sleep();
      }
    }
  }, t;
}(co);
Si(ti.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var w0 = function(t, e, i, n, r, o, a) {
  var l = new ai(this._pt, t, e, 0, 1, Id, null, r), u = 0, h = 0, f, d, c, m, p, y, v, A;
  for (l.b = i, l.e = n, i += "", n += "", (v = ~n.indexOf("random(")) && (n = ao(n)), o && (A = [i, n], o(A, t, e), i = A[0], n = A[1]), d = i.match(rl) || []; f = rl.exec(n); )
    m = f[0], p = n.substring(u, f.index), c ? c = (c + 1) % 5 : p.substr(-5) === "rgba(" && (c = 1), m !== d[h++] && (y = parseFloat(d[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: y,
      c: m.charAt(1) === "=" ? qs(y, m) - y : parseFloat(m) - y,
      m: c && c < 4 ? Math.round : 0
    }, u = rl.lastIndex);
  return l.c = u < n.length ? n.substring(u, n.length) : "", l.fp = a, (Zf.test(n) || v) && (l.e = 0), this._pt = l, l;
}, Jc = function(t, e, i, n, r, o, a, l, u, h) {
  ie(n) && (n = n(r || 0, t, o));
  var f = t[e], d = i !== "get" ? i : ie(f) ? u ? t[e.indexOf("set") || !ie(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : f, c = ie(f) ? u ? E0 : kd : eu, m;
  if (ke(n) && (~n.indexOf("random(") && (n = ao(n)), n.charAt(1) === "=" && (m = qs(d, n) + (Ve(d) || 0), (m || m === 0) && (n = m))), !h || d !== n || ql)
    return !isNaN(d * n) && n !== "" ? (m = new ai(this._pt, t, e, +d || 0, n - (d || 0), typeof f == "boolean" ? C0 : Md, 0, c), u && (m.fp = u), a && m.modifier(a, this, t), this._pt = m) : (!f && !(e in t) && Kc(e, n), w0.call(this, t, e, d, n, c, l || bi.stringFilter, u));
}, b0 = function(t, e, i, n, r) {
  if (ie(t) && (t = Vr(t, r, e, i, n)), !rn(t) || t.style && t.nodeType || qe(t) || Gf(t))
    return ke(t) ? Vr(t, r, e, i, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Vr(t[a], r, e, i, n);
  return o;
}, Cd = function(t, e, i, n, r, o) {
  var a, l, u, h;
  if (pi[t] && (a = new pi[t]()).init(r, a.rawVars ? e[t] : b0(e[t], n, r, o, i), i, n, o) !== !1 && (i._pt = l = new ai(i._pt, r, t, 0, 1, a.render, a, 0, a.priority), i !== $s))
    for (u = i._ptLookup[i._targets.indexOf(r)], h = a._props.length; h--; )
      u[a._props[h]] = l;
  return a;
}, kn, ql, tu = function s(t, e, i) {
  var n = t.vars, r = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, u = n.onUpdate, h = n.runBackwards, f = n.yoyoEase, d = n.keyframes, c = n.autoRevert, m = t._dur, p = t._startAt, y = t._targets, v = t.parent, A = v && v.data === "nested" ? v.vars.targets : y, C = t._overwrite === "auto" && !Wc, S = t.timeline, _, P, O, T, k, R, V, z, B, J, it, U, H;
  if (S && (!d || !r) && (r = "none"), t._ease = cs(r, nr.ease), t._yEase = f ? Sd(cs(f === !0 ? r : f, nr.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !S && !!n.runBackwards, !S || d && !n.stagger) {
    if (z = y[0] ? as(y[0]).harness : 0, U = z && n[z.prop], _ = xa(n, Gc), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !c ? p.render(-1, !0) : p.revert(h && m ? ra : Gg), p._lazy = 0), o) {
      if (Vn(t._startAt = ge.set(y, Si({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !p && ri(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return vi(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Re || !a && !c) && t._startAt.revert(ra), a && m && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && m && !p) {
      if (e && (a = !1), O = Si({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ri(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, _), U && (O[z.prop] = U), Vn(t._startAt = ge.set(y, O)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Re ? t._startAt.revert(ra) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, We, We);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ri(l) || l && !m, P = 0; P < y.length; P++) {
      if (k = y[P], V = k._gsap || Zc(y)[P]._gsap, t._ptLookup[P] = J = {}, $l[V.id] && zn.length && ba(), it = A === y ? P : A.indexOf(k), z && (B = new z()).init(k, U || _, t, it, A) !== !1 && (t._pt = T = new ai(t._pt, k, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(tt) {
        J[tt] = T;
      }), B.priority && (R = 1)), !z || U)
        for (O in _)
          pi[O] && (B = Cd(O, _, t, it, k, A)) ? B.priority && (R = 1) : J[O] = T = Jc.call(t, k, O, "get", _[O], it, A, 0, n.stringFilter);
      t._op && t._op[P] && t.kill(k, t._op[P]), C && t._pt && (kn = t, Jt.killTweensOf(k, J, t.globalTime(e)), H = !t.parent, kn = 0), t._pt && l && ($l[V.id] = 1);
    }
    R && Dd(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !H, d && e <= 0 && S.render(nn, !0, !0);
}, x0 = function(t, e, i, n, r, o, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, c;
  if (!u)
    for (u = t._ptCache[e] = [], d = t._ptLookup, c = t._targets.length; c--; ) {
      if (h = d[c][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return ql = 1, t.vars[e] = "+=0", tu(t, a), ql = 0, l ? ro(e + " not eligible for reset") : 1;
      u.push(h);
    }
  for (c = u.length; c--; )
    f = u[c], h = f._pt || f, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + o * h.c, h.c = i - h.s, f.e && (f.e = ae(i) + Ve(f.e)), f.b && (f.b = h.s + Ve(f.b));
}, S0 = function(t, e) {
  var i = t[0] ? as(t[0]).harness : 0, n = i && i.aliases, r, o, a, l;
  if (!n)
    return e;
  r = sr({}, e);
  for (o in n)
    if (o in r)
      for (l = n[o].split(","), a = l.length; a--; )
        r[l[a]] = r[o];
  return r;
}, T0 = function(t, e, i, n) {
  var r = e.ease || n || "power1.inOut", o, a;
  if (qe(e))
    a = i[t] || (i[t] = []), e.forEach(function(l, u) {
      return a.push({
        t: u / (e.length - 1) * 100,
        v: l,
        e: r
      });
    });
  else
    for (o in e)
      a = i[o] || (i[o] = []), o === "ease" || a.push({
        t: parseFloat(t),
        v: e[o],
        e: r
      });
}, Vr = function(t, e, i, n, r) {
  return ie(t) ? t.call(e, i, n, r) : ke(t) && ~t.indexOf("random(") ? ao(t) : t;
}, Od = jc + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Pd = {};
oi(Od + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Pd[s] = 1;
});
var ge = /* @__PURE__ */ function(s) {
  Xf(t, s);
  function t(i, n, r, o) {
    var a;
    typeof n == "number" && (r.duration = n, n = r, r = null), a = s.call(this, o ? n : $r(n)) || this;
    var l = a.vars, u = l.duration, h = l.delay, f = l.immediateRender, d = l.stagger, c = l.overwrite, m = l.keyframes, p = l.defaults, y = l.scrollTrigger, v = l.yoyoEase, A = n.parent || Jt, C = (qe(i) || Gf(i) ? bn(i[0]) : "length" in n) ? [i] : Ii(i), S, _, P, O, T, k, R, V;
    if (a._targets = C.length ? Zc(C) : ro("GSAP target " + i + " not found. https://gsap.com", !bi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = c, m || d || $o(u) || $o(h)) {
      if (n = a.vars, S = a.timeline = new ti({
        data: "nested",
        defaults: p || {},
        targets: A && A.data === "nested" ? A.vars.targets : C
      }), S.kill(), S.parent = S._dp = fn(a), S._start = 0, d || $o(u) || $o(h)) {
        if (O = C.length, R = d && dd(d), rn(d))
          for (T in d)
            ~Od.indexOf(T) && (V || (V = {}), V[T] = d[T]);
        for (_ = 0; _ < O; _++)
          P = xa(n, Pd), P.stagger = 0, v && (P.yoyoEase = v), V && sr(P, V), k = C[_], P.duration = +Vr(u, fn(a), _, k, C), P.delay = (+Vr(h, fn(a), _, k, C) || 0) - a._delay, !d && O === 1 && P.delay && (a._delay = h = P.delay, a._start += h, P.delay = 0), S.to(k, P, R ? R(_, k, C) : 0), S._ease = At.none;
        S.duration() ? u = h = 0 : a.timeline = 0;
      } else if (m) {
        $r(Si(S.vars.defaults, {
          ease: "none"
        })), S._ease = cs(m.ease || n.ease || "none");
        var z = 0, B, J, it;
        if (qe(m))
          m.forEach(function(U) {
            return S.to(C, U, ">");
          }), S.duration();
        else {
          P = {};
          for (T in m)
            T === "ease" || T === "easeEach" || T0(T, m[T], P, m.easeEach);
          for (T in P)
            for (B = P[T].sort(function(U, H) {
              return U.t - H.t;
            }), z = 0, _ = 0; _ < B.length; _++)
              J = B[_], it = {
                ease: J.e,
                duration: (J.t - (_ ? B[_ - 1].t : 0)) / 100 * u
              }, it[T] = J.v, S.to(C, it, z), z += it.duration;
          S.duration() < u && S.to({}, {
            duration: u - S.duration()
          });
        }
      }
      u || a.duration(u = S.duration());
    } else
      a.timeline = 0;
    return c === !0 && !Wc && (kn = fn(a), Jt.killTweensOf(C), kn = 0), Qi(A, fn(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !u && !m && a._start === ye(A._time) && ri(f) && e0(fn(a)) && A.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), y && cd(fn(a), y), a;
  }
  var e = t.prototype;
  return e.render = function(n, r, o) {
    var a = this._time, l = this._tDur, u = this._dur, h = n < 0, f = n > l - We && !h ? l : n < We ? 0 : n, d, c, m, p, y, v, A, C, S;
    if (!u)
      n0(this, n, r, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, C = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + n, r, o);
        if (d = ye(f % p), f === l ? (m = this._repeat, d = u) : (y = ye(f / p), m = ~~y, m && m === y ? (d = u, m--) : d > u && (d = u)), v = this._yoyo && m & 1, v && (S = this._yEase, d = u - d), y = rr(this._tTime, p), d === a && !o && this._initted && m === y)
          return this._tTime = f, this;
        m !== y && (C && this._yEase && Td(C, v), this.vars.repeatRefresh && !v && !this._lock && d !== p && this._initted && (this._lock = o = 1, this.render(ye(p * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (ud(this, h ? n : d, o, r, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && m !== y))
          return this;
        if (u !== this._dur)
          return this.render(n, r, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (S || this._ease)(d / u), this._from && (this.ratio = A = 1 - A), !a && f && !r && !y && (vi(this, "onStart"), this._tTime !== f))
        return this;
      for (c = this._pt; c; )
        c.r(A, c.d), c = c._next;
      C && C.render(n < 0 ? n : C._dur * C._ease(d / this._dur), r, o) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && Bl(this, n, r, o), vi(this, "onUpdate")), this._repeat && m !== y && this.vars.onRepeat && !r && this.parent && vi(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && Bl(this, n, !0, !0), (n || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Vn(this, 1), !r && !(h && !a) && (f || a || v) && (vi(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, r, o, a, l) {
    lo || gi.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || tu(this, u), h = this._ease(u / this._dur), x0(this, n, r, o, a, h, u, l) ? this.resetTo(n, r, o, a, 1) : (Ya(this, 0), this.parent || ad(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? Er(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Re), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, kn && kn.vars.overwrite !== !0)._first || Er(this), this.parent && o !== this.timeline.totalDuration() && or(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Ii(n) : a, u = this._ptLookup, h = this._pt, f, d, c, m, p, y, v;
    if ((!r || r === "all") && Jg(a, l))
      return r === "all" && (this._pt = 0), Er(this);
    for (f = this._op = this._op || [], r !== "all" && (ke(r) && (p = {}, oi(r, function(A) {
      return p[A] = 1;
    }), r = p), r = S0(a, r)), v = a.length; v--; )
      if (~l.indexOf(a[v])) {
        d = u[v], r === "all" ? (f[v] = r, m = d, c = {}) : (c = f[v] = f[v] || {}, m = r);
        for (p in m)
          y = d && d[p], y && ((!("kill" in y.d) || y.d.kill(p) === !0) && Va(this, y, "_pt"), delete d[p]), c !== "all" && (c[p] = 1);
      }
    return this._initted && !this._pt && h && Er(this), this;
  }, t.to = function(n, r) {
    return new t(n, r, arguments[2]);
  }, t.from = function(n, r) {
    return Br(1, arguments);
  }, t.delayedCall = function(n, r, o, a) {
    return new t(r, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: r,
      onReverseComplete: r,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, t.fromTo = function(n, r, o) {
    return Br(2, arguments);
  }, t.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new t(n, r);
  }, t.killTweensOf = function(n, r, o) {
    return Jt.killTweensOf(n, r, o);
  }, t;
}(co);
Si(ge.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
oi("staggerTo,staggerFrom,staggerFromTo", function(s) {
  ge[s] = function() {
    var t = new ti(), e = Hl.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var eu = function(t, e, i) {
  return t[e] = i;
}, kd = function(t, e, i) {
  return t[e](i);
}, E0 = function(t, e, i, n) {
  return t[e](n.fp, i);
}, A0 = function(t, e, i) {
  return t.setAttribute(e, i);
}, iu = function(t, e) {
  return ie(t[e]) ? kd : qc(t[e]) && t.setAttribute ? A0 : eu;
}, Md = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, C0 = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Id = function(t, e) {
  var i = e._pt, n = "";
  if (!t && e.b)
    n = e.b;
  else if (t === 1 && e.e)
    n = e.e;
  else {
    for (; i; )
      n = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + n, i = i._next;
    n += e.c;
  }
  e.set(e.t, e.p, n, e);
}, nu = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, O0 = function(t, e, i, n) {
  for (var r = this._pt, o; r; )
    o = r._next, r.p === n && r.modifier(t, e, i), r = o;
}, P0 = function(t) {
  for (var e = this._pt, i, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? Va(this, e, "_pt") : e.dep || (i = 1), e = n;
  return !i;
}, k0 = function(t, e, i, n) {
  n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
}, Dd = function(t) {
  for (var e = t._pt, i, n, r, o; e; ) {
    for (i = e._next, n = r; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : r = e, (e._next = n) ? n._prev = e : o = e, e = i;
  }
  t._pt = r;
}, ai = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a, l, u, h) {
    this.t = i, this.s = r, this.c = o, this.p = n, this.r = a || Md, this.d = l || this, this.set = u || eu, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = k0, this.m = i, this.mt = r, this.tween = n;
  }, s;
}();
oi(jc + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return Gc[s] = 1;
});
xi.TweenMax = xi.TweenLite = ge;
xi.TimelineLite = xi.TimelineMax = ti;
Jt = new ti({
  sortChildren: !1,
  defaults: nr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
bi.stringFilter = xd;
var us = [], aa = {}, M0 = [], lh = 0, I0 = 0, ul = function(t) {
  return (aa[t] || M0).map(function(e) {
    return e();
  });
}, Ul = function() {
  var t = Date.now(), e = [];
  t - lh > 2 && (ul("matchMediaInit"), us.forEach(function(i) {
    var n = i.queries, r = i.conditions, o, a, l, u;
    for (a in n)
      o = Gi.matchMedia(n[a]).matches, o && (l = 1), o !== r[a] && (r[a] = o, u = 1);
    u && (i.revert(), l && e.push(i));
  }), ul("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), lh = t, ul("matchMedia"));
}, Ld = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Yl(i), this.data = [], this._r = [], this.isReverted = !1, this.id = I0++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    ie(i) && (r = n, n = i, i = ie);
    var o = this, a = function() {
      var u = Zt, h = o.selector, f;
      return u && u !== o && u.data.push(o), r && (o.selector = Yl(r)), Zt = o, f = n.apply(o, arguments), ie(f) && o._r.push(f), Zt = u, o.selector = h, o.isReverted = !1, f;
    };
    return o.last = a, i === ie ? a(o, function(l) {
      return o.add(null, l);
    }) : i ? o[i] = a : a;
  }, t.ignore = function(i) {
    var n = Zt;
    Zt = null, i(this), Zt = n;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(n) {
      return n instanceof s ? i.push.apply(i, n.getTweens()) : n instanceof ge && !(n.parent && n.parent.data === "nested") && i.push(n);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, n) {
    var r = this;
    if (i ? function() {
      for (var a = r.getTweens(), l = r.data.length, u; l--; )
        u = r.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(h) {
          return a.splice(a.indexOf(h), 1);
        }));
      for (a.map(function(h) {
        return {
          g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
          t: h
        };
      }).sort(function(h, f) {
        return f.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), l = r.data.length; l--; )
        u = r.data[l], u instanceof ti ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof ge) && u.revert && u.revert(i);
      r._r.forEach(function(h) {
        return h(i, r);
      }), r.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = us.length; o--; )
        us[o].id === this.id && us.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), D0 = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Zt && Zt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    rn(i) || (i = {
      matches: i
    });
    var o = new Ld(0, r || this.scope), a = o.conditions = {}, l, u, h;
    Zt && !o.selector && (o.selector = Zt.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = i;
    for (u in i)
      u === "all" ? h = 1 : (l = Gi.matchMedia(i[u]), l && (us.indexOf(o) < 0 && us.push(o), (a[u] = l.matches) && (h = 1), l.addListener ? l.addListener(Ul) : l.addEventListener("change", Ul)));
    return h && n(o, function(f) {
      return o.add(null, f);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(n) {
      return n.kill(i, !0);
    });
  }, s;
}(), Ta = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(n) {
      return vd(n);
    });
  },
  timeline: function(t) {
    return new ti(t);
  },
  getTweensOf: function(t, e) {
    return Jt.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, n) {
    ke(t) && (t = Ii(t)[0]);
    var r = as(t || {}).get, o = i ? od : rd;
    return i === "native" && (i = ""), t && (e ? o((pi[e] && pi[e].get || r)(t, e, i, n)) : function(a, l, u) {
      return o((pi[a] && pi[a].get || r)(t, a, l, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Ii(t), t.length > 1) {
      var n = t.map(function(h) {
        return ui.quickSetter(h, e, i);
      }), r = n.length;
      return function(h) {
        for (var f = r; f--; )
          n[f](h);
      };
    }
    t = t[0] || {};
    var o = pi[e], a = as(t), l = a.harness && (a.harness.aliases || {})[e] || e, u = o ? function(h) {
      var f = new o();
      $s._pt = 0, f.init(t, i ? h + i : h, $s, 0, [t]), f.render(1, f), $s._pt && nu(1, $s);
    } : a.set(t, l);
    return o ? u : function(h) {
      return u(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var n, r = ui.to(t, Si((n = {}, n[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), o = function(l, u, h) {
      return r.resetTo(e, l, u, h);
    };
    return o.tween = r, o;
  },
  isTweening: function(t) {
    return Jt.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = cs(t.ease, nr.ease)), nh(nr, t || {});
  },
  config: function(t) {
    return nh(bi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, n = t.plugins, r = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !pi[a] && !xi[a] && ro(e + " effect requires " + a + " plugin.");
    }), ol[e] = function(a, l, u) {
      return i(Ii(a), Si(l || {}, r), u);
    }, o && (ti.prototype[e] = function(a, l, u) {
      return this.add(ol[e](a, rn(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    At[t] = cs(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? cs(t, e) : At;
  },
  getById: function(t) {
    return Jt.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ti(t), n, r;
    for (i.smoothChildTiming = ri(t.smoothChildTiming), Jt.remove(i), i._dp = 0, i._time = i._tTime = Jt._time, n = Jt._first; n; )
      r = n._next, (e || !(!n._dur && n instanceof ge && n.vars.onComplete === n._targets[0])) && Qi(i, n, n._start - n._delay), n = r;
    return Qi(Jt, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Ld(t, e) : Zt;
  },
  matchMedia: function(t) {
    return new D0(t);
  },
  matchMediaRefresh: function() {
    return us.forEach(function(t) {
      var e = t.conditions, i, n;
      for (n in e)
        e[n] && (e[n] = !1, i = 1);
      i && t.revert();
    }) || Ul();
  },
  addEventListener: function(t, e) {
    var i = aa[t] || (aa[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = aa[t], n = i && i.indexOf(e);
    n >= 0 && i.splice(n, 1);
  },
  utils: {
    wrap: h0,
    wrapYoyo: f0,
    distribute: dd,
    random: md,
    snap: pd,
    normalize: u0,
    getUnit: Ve,
    clamp: o0,
    splitColor: wd,
    toArray: Ii,
    selector: Yl,
    mapRange: yd,
    pipe: l0,
    unitize: c0,
    interpolate: d0,
    shuffle: fd
  },
  install: td,
  effects: ol,
  ticker: gi,
  updateRoot: ti.updateRoot,
  plugins: pi,
  globalTimeline: Jt,
  core: {
    PropTween: ai,
    globals: ed,
    Tween: ge,
    Timeline: ti,
    Animation: co,
    getCache: as,
    _removeLinkedListItem: Va,
    reverting: function() {
      return Re;
    },
    context: function(t) {
      return t && Zt && (Zt.data.push(t), t._ctx = Zt), Zt;
    },
    suppressOverwrites: function(t) {
      return Wc = t;
    }
  }
};
oi("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Ta[s] = ge[s];
});
gi.add(ti.updateRoot);
$s = Ta.to({}, {
  duration: 0
});
var L0 = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, R0 = function(t, e) {
  var i = t._targets, n, r, o;
  for (n in e)
    for (r = i.length; r--; )
      o = t._ptLookup[r][n], o && (o = o.d) && (o._pt && (o = L0(o, n)), o && o.modifier && o.modifier(e[n], t, i[r], n));
}, hl = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, o) {
      o._onInit = function(a) {
        var l, u;
        if (ke(r) && (l = {}, oi(r, function(h) {
          return l[h] = 1;
        }), r = l), e) {
          l = {};
          for (u in r)
            l[u] = e(r[u]);
          r = l;
        }
        R0(a, r);
      };
    }
  };
}, ui = Ta.registerPlugin({
  name: "attr",
  init: function(t, e, i, n, r) {
    var o, a, l;
    this.tween = i;
    for (o in e)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", e[o], n, r, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      Re ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, hl("roundProps", Wl), hl("modifiers"), hl("snap", pd)) || Ta;
ge.version = ti.version = ui.version = "3.13.0";
Jf = 1;
Uc() && ar();
At.Power0;
At.Power1;
At.Power2;
At.Power3;
At.Power4;
At.Linear;
At.Quad;
At.Cubic;
At.Quart;
At.Quint;
At.Strong;
At.Elastic;
At.Back;
At.SteppedEase;
At.Bounce;
At.Sine;
At.Expo;
At.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ch, Mn, Us, su, ns, uh, ru, z0 = function() {
  return typeof window < "u";
}, xn = {}, Jn = 180 / Math.PI, Xs = Math.PI / 180, Cs = Math.atan2, hh = 1e8, ou = /([A-Z])/g, F0 = /(left|right|width|margin|padding|x)/i, N0 = /[\s,\(]\S/, Ji = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Xl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, $0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, B0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, V0 = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Rd = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, zd = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, H0 = function(t, e, i) {
  return t.style[e] = i;
}, Y0 = function(t, e, i) {
  return t.style.setProperty(e, i);
}, W0 = function(t, e, i) {
  return t._gsap[e] = i;
}, q0 = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, U0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(r, o);
}, X0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(r, o);
}, te = "transform", li = te + "Origin", K0 = function s(t, e) {
  var i = this, n = this.target, r = n.style, o = n._gsap;
  if (t in xn && r) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ji[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = dn(n, a);
      }) : this.tfm[t] = o.x ? o[t] : dn(n, t), t === li && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ji.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(te) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(li, e, "")), t = te;
  }
  (r || e) && this.props.push(t, e, r[t]);
}, Fd = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, G0 = function() {
  var t = this.props, e = this.target, i = e.style, n = e._gsap, r, o;
  for (r = 0; r < t.length; r += 3)
    t[r + 1] ? t[r + 1] === 2 ? e[t[r]](t[r + 2]) : e[t[r]] = t[r + 2] : t[r + 2] ? i[t[r]] = t[r + 2] : i.removeProperty(t[r].substr(0, 2) === "--" ? t[r] : t[r].replace(ou, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), r = ru(), (!r || !r.isStart) && !i[te] && (Fd(i), n.zOrigin && i[li] && (i[li] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Nd = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: G0,
    save: K0
  };
  return t._gsap || ui.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, $d, Kl = function(t, e) {
  var i = Mn.createElementNS ? Mn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Mn.createElement(t);
  return i && i.style ? i : Mn.createElement(t);
}, Di = function s(t, e, i) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(ou, "-$1").toLowerCase()) || n.getPropertyValue(e) || !i && s(t, lr(e) || e, 1) || "";
}, fh = "O,Moz,ms,Ms,Webkit".split(","), lr = function(t, e, i) {
  var n = e || ns, r = n.style, o = 5;
  if (t in r && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(fh[o] + t in r); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? fh[o] : "") + t;
}, Gl = function() {
  z0() && window.document && (ch = window, Mn = ch.document, Us = Mn.documentElement, ns = Kl("div") || {
    style: {}
  }, Kl("div"), te = lr(te), li = te + "Origin", ns.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", $d = !!lr("perspective"), ru = ui.core.reverting, su = 1);
}, dh = function(t) {
  var e = t.ownerSVGElement, i = Kl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = t.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), Us.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), Us.removeChild(i), r;
}, ph = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Bd = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = dh(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = dh(t)), e && !e.width && !e.x && !e.y ? {
    x: +ph(t, ["x", "cx", "x1"]) || 0,
    y: +ph(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Vd = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Bd(t));
}, _s = function(t, e) {
  if (e) {
    var i = t.style, n;
    e in xn && e !== li && (e = te), i.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(n === "--" ? e : e.replace(ou, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, In = function(t, e, i, n, r, o) {
  var a = new ai(t._pt, e, i, 0, 1, o ? zd : Rd);
  return t._pt = a, a.b = n, a.e = r, t._props.push(i), a;
}, mh = {
  deg: 1,
  rad: 1,
  turn: 1
}, j0 = {
  grid: 1,
  flex: 1
}, Hn = function s(t, e, i, n) {
  var r = parseFloat(i) || 0, o = (i + "").trim().substr((r + "").length) || "px", a = ns.style, l = F0.test(e), u = t.tagName.toLowerCase() === "svg", h = (u ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, d = n === "px", c = n === "%", m, p, y, v;
  if (n === o || !r || mh[n] || mh[o])
    return r;
  if (o !== "px" && !d && (r = s(t, e, i, "px")), v = t.getCTM && Vd(t), (c || o === "%") && (xn[e] || ~e.indexOf("adius")))
    return m = v ? t.getBBox()[l ? "width" : "height"] : t[h], ae(c ? r / m * f : r / 100 * m);
  if (a[l ? "width" : "height"] = f + (d ? o : n), p = n !== "rem" && ~e.indexOf("adius") || n === "em" && t.appendChild && !u ? t : t.parentNode, v && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Mn || !p.appendChild) && (p = Mn.body), y = p._gsap, y && c && y.width && l && y.time === gi.time && !y.uncache)
    return ae(r / y.width * f);
  if (c && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = f + n, m = t[h], A ? t.style[e] = A : _s(t, e);
  } else
    (c || o === "%") && !j0[Di(p, "display")] && (a.position = Di(t, "position")), p === t && (a.position = "static"), p.appendChild(ns), m = ns[h], p.removeChild(ns), a.position = "absolute";
  return l && c && (y = as(p), y.time = gi.time, y.width = p[h]), ae(d ? m * r / f : m && r ? f / m * r : 0);
}, dn = function(t, e, i, n) {
  var r;
  return su || Gl(), e in Ji && e !== "transform" && (e = Ji[e], ~e.indexOf(",") && (e = e.split(",")[0])), xn[e] && e !== "transform" ? (r = ho(t, n), r = e !== "transformOrigin" ? r[e] : r.svg ? r.origin : Aa(Di(t, li)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = Ea[e] && Ea[e](t, e, i) || Di(t, e) || nd(t, e) || (e === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? Hn(t, e, r, i) + i : r;
}, Z0 = function(t, e, i, n) {
  if (!i || i === "none") {
    var r = lr(e, t, 1), o = r && Di(t, r, 1);
    o && o !== i ? (e = r, i = o) : e === "borderColor" && (i = Di(t, "borderTopColor"));
  }
  var a = new ai(this._pt, t.style, e, 0, 1, Id), l = 0, u = 0, h, f, d, c, m, p, y, v, A, C, S, _;
  if (a.b = i, a.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = Di(t, n.substring(4, n.indexOf(")")))), n === "auto" && (p = t.style[e], t.style[e] = n, n = Di(t, e) || n, p ? t.style[e] = p : _s(t, e)), h = [i, n], xd(h), i = h[0], n = h[1], d = i.match(Ns) || [], _ = n.match(Ns) || [], _.length) {
    for (; f = Ns.exec(n); )
      y = f[0], A = n.substring(l, f.index), m ? m = (m + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (m = 1), y !== (p = d[u++] || "") && (c = parseFloat(p) || 0, S = p.substr((c + "").length), y.charAt(1) === "=" && (y = qs(c, y) + S), v = parseFloat(y), C = y.substr((v + "").length), l = Ns.lastIndex - C.length, C || (C = C || bi.units[e] || S, l === n.length && (n += C, a.e += C)), S !== C && (c = Hn(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: A || u === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: c,
        c: v - c,
        m: m && m < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? zd : Rd;
  return Zf.test(n) && (a.e = 0), this._pt = a, a;
}, gh = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Q0 = function(t) {
  var e = t.split(" "), i = e[0], n = e[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (t = i, i = n, n = t), e[0] = gh[i] || i, e[1] = gh[n] || n, e.join(" ");
}, J0 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, n = i.style, r = e.u, o = i._gsap, a, l, u;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), u = r.length; --u > -1; )
        a = r[u], xn[a] && (l = 1, a = a === "transformOrigin" ? li : te), _s(i, a);
    l && (_s(i, te), o && (o.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", ho(i, 1), o.uncache = 1, Fd(n)));
  }
}, Ea = {
  clearProps: function(t, e, i, n, r) {
    if (r.data !== "isFromStart") {
      var o = t._pt = new ai(t._pt, e, i, 0, 0, J0);
      return o.u = n, o.pr = -10, o.tween = r, t._props.push(i), 1;
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
}, uo = [1, 0, 0, 1, 0, 0], Hd = {}, Yd = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, yh = function(t) {
  var e = Di(t, te);
  return Yd(e) ? uo : e.substr(7).match(jf).map(ae);
}, au = function(t, e) {
  var i = t._gsap || as(t), n = t.style, r = yh(t), o, a, l, u;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? uo : r) : (r === uo && !t.offsetParent && t !== Us && !i.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, Us.appendChild(t)), r = yh(t), l ? n.display = l : _s(t, "display"), u && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : Us.removeChild(t))), e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, jl = function(t, e, i, n, r, o) {
  var a = t._gsap, l = r || au(t, !0), u = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, c = l[0], m = l[1], p = l[2], y = l[3], v = l[4], A = l[5], C = e.split(" "), S = parseFloat(C[0]) || 0, _ = parseFloat(C[1]) || 0, P, O, T, k;
  i ? l !== uo && (O = c * y - m * p) && (T = S * (y / O) + _ * (-p / O) + (p * A - y * v) / O, k = S * (-m / O) + _ * (c / O) - (c * A - m * v) / O, S = T, _ = k) : (P = Bd(t), S = P.x + (~C[0].indexOf("%") ? S / 100 * P.width : S), _ = P.y + (~(C[1] || C[0]).indexOf("%") ? _ / 100 * P.height : _)), n || n !== !1 && a.smooth ? (v = S - u, A = _ - h, a.xOffset = f + (v * c + A * p) - v, a.yOffset = d + (v * m + A * y) - A) : a.xOffset = a.yOffset = 0, a.xOrigin = S, a.yOrigin = _, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!i, t.style[li] = "0px 0px", o && (In(o, a, "xOrigin", u, S), In(o, a, "yOrigin", h, _), In(o, a, "xOffset", f, a.xOffset), In(o, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", S + " " + _);
}, ho = function(t, e) {
  var i = t._gsap || new Ad(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var n = t.style, r = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), u = Di(t, li) || "0", h, f, d, c, m, p, y, v, A, C, S, _, P, O, T, k, R, V, z, B, J, it, U, H, tt, at, b, j, st, X, ot, Dt;
  return h = f = d = p = y = v = A = C = S = 0, c = m = 1, i.svg = !!(t.getCTM && Vd(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[te] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[te] !== "none" ? l[te] : "")), n.scale = n.rotate = n.translate = "none"), O = au(t, i.svg), i.svg && (i.uncache ? (tt = t.getBBox(), u = i.xOrigin - tt.x + "px " + (i.yOrigin - tt.y) + "px", H = "") : H = !e && t.getAttribute("data-svg-origin"), jl(t, H || u, !!H || i.originIsAbsolute, i.smooth !== !1, O)), _ = i.xOrigin || 0, P = i.yOrigin || 0, O !== uo && (V = O[0], z = O[1], B = O[2], J = O[3], h = it = O[4], f = U = O[5], O.length === 6 ? (c = Math.sqrt(V * V + z * z), m = Math.sqrt(J * J + B * B), p = V || z ? Cs(z, V) * Jn : 0, A = B || J ? Cs(B, J) * Jn + p : 0, A && (m *= Math.abs(Math.cos(A * Xs))), i.svg && (h -= _ - (_ * V + P * B), f -= P - (_ * z + P * J))) : (Dt = O[6], X = O[7], b = O[8], j = O[9], st = O[10], ot = O[11], h = O[12], f = O[13], d = O[14], T = Cs(Dt, st), y = T * Jn, T && (k = Math.cos(-T), R = Math.sin(-T), H = it * k + b * R, tt = U * k + j * R, at = Dt * k + st * R, b = it * -R + b * k, j = U * -R + j * k, st = Dt * -R + st * k, ot = X * -R + ot * k, it = H, U = tt, Dt = at), T = Cs(-B, st), v = T * Jn, T && (k = Math.cos(-T), R = Math.sin(-T), H = V * k - b * R, tt = z * k - j * R, at = B * k - st * R, ot = J * R + ot * k, V = H, z = tt, B = at), T = Cs(z, V), p = T * Jn, T && (k = Math.cos(T), R = Math.sin(T), H = V * k + z * R, tt = it * k + U * R, z = z * k - V * R, U = U * k - it * R, V = H, it = tt), y && Math.abs(y) + Math.abs(p) > 359.9 && (y = p = 0, v = 180 - v), c = ae(Math.sqrt(V * V + z * z + B * B)), m = ae(Math.sqrt(U * U + Dt * Dt)), T = Cs(it, U), A = Math.abs(T) > 2e-4 ? T * Jn : 0, S = ot ? 1 / (ot < 0 ? -ot : ot) : 0), i.svg && (H = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Yd(Di(t, te)), H && t.setAttribute("transform", H))), Math.abs(A) > 90 && Math.abs(A) < 270 && (r ? (c *= -1, A += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (m *= -1, A += A <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = d + o, i.scaleX = ae(c), i.scaleY = ae(m), i.rotation = ae(p) + a, i.rotationX = ae(y) + a, i.rotationY = ae(v) + a, i.skewX = A + a, i.skewY = C + a, i.transformPerspective = S + o, (i.zOrigin = parseFloat(u.split(" ")[2]) || !e && i.zOrigin || 0) && (n[li] = Aa(u)), i.xOffset = i.yOffset = 0, i.force3D = bi.force3D, i.renderTransform = i.svg ? ey : $d ? Wd : ty, i.uncache = 0, i;
}, Aa = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, fl = function(t, e, i) {
  var n = Ve(e);
  return ae(parseFloat(e) + parseFloat(Hn(t, "x", i + "px", n))) + n;
}, ty = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Wd(t, e);
}, jn = "0deg", yr = "0px", Zn = ") ", Wd = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.z, u = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, c = i.skewY, m = i.scaleX, p = i.scaleY, y = i.transformPerspective, v = i.force3D, A = i.target, C = i.zOrigin, S = "", _ = v === "auto" && t && t !== 1 || v === !0;
  if (C && (f !== jn || h !== jn)) {
    var P = parseFloat(h) * Xs, O = Math.sin(P), T = Math.cos(P), k;
    P = parseFloat(f) * Xs, k = Math.cos(P), o = fl(A, o, O * k * -C), a = fl(A, a, -Math.sin(P) * -C), l = fl(A, l, T * k * -C + C);
  }
  y !== yr && (S += "perspective(" + y + Zn), (n || r) && (S += "translate(" + n + "%, " + r + "%) "), (_ || o !== yr || a !== yr || l !== yr) && (S += l !== yr || _ ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Zn), u !== jn && (S += "rotate(" + u + Zn), h !== jn && (S += "rotateY(" + h + Zn), f !== jn && (S += "rotateX(" + f + Zn), (d !== jn || c !== jn) && (S += "skew(" + d + ", " + c + Zn), (m !== 1 || p !== 1) && (S += "scale(" + m + ", " + p + Zn), A.style[te] = S || "translate(0, 0)";
}, ey = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.rotation, u = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, c = i.target, m = i.xOrigin, p = i.yOrigin, y = i.xOffset, v = i.yOffset, A = i.forceCSS, C = parseFloat(o), S = parseFloat(a), _, P, O, T, k;
  l = parseFloat(l), u = parseFloat(u), h = parseFloat(h), h && (h = parseFloat(h), u += h, l += h), l || u ? (l *= Xs, u *= Xs, _ = Math.cos(l) * f, P = Math.sin(l) * f, O = Math.sin(l - u) * -d, T = Math.cos(l - u) * d, u && (h *= Xs, k = Math.tan(u - h), k = Math.sqrt(1 + k * k), O *= k, T *= k, h && (k = Math.tan(h), k = Math.sqrt(1 + k * k), _ *= k, P *= k)), _ = ae(_), P = ae(P), O = ae(O), T = ae(T)) : (_ = f, T = d, P = O = 0), (C && !~(o + "").indexOf("px") || S && !~(a + "").indexOf("px")) && (C = Hn(c, "x", o, "px"), S = Hn(c, "y", a, "px")), (m || p || y || v) && (C = ae(C + m - (m * _ + p * O) + y), S = ae(S + p - (m * P + p * T) + v)), (n || r) && (k = c.getBBox(), C = ae(C + n / 100 * k.width), S = ae(S + r / 100 * k.height)), k = "matrix(" + _ + "," + P + "," + O + "," + T + "," + C + "," + S + ")", c.setAttribute("transform", k), A && (c.style[te] = k);
}, iy = function(t, e, i, n, r) {
  var o = 360, a = ke(r), l = parseFloat(r) * (a && ~r.indexOf("rad") ? Jn : 1), u = l - n, h = n + u + "deg", f, d;
  return a && (f = r.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -360)), f === "cw" && u < 0 ? u = (u + o * hh) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * hh) % o - ~~(u / o) * o)), t._pt = d = new ai(t._pt, e, i, n, u, $0), d.e = h, d.u = "deg", t._props.push(i), d;
}, _h = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, ny = function(t, e, i) {
  var n = _h({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, u, h, f, d, c, m;
  n.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), o[te] = e, a = ho(i, 1), _s(i, te), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[te], o[te] = e, a = ho(i, 1), o[te] = u);
  for (l in xn)
    u = n[l], h = a[l], u !== h && r.indexOf(l) < 0 && (c = Ve(u), m = Ve(h), f = c !== m ? Hn(i, l, u, m) : parseFloat(u), d = parseFloat(h), t._pt = new ai(t._pt, a, l, f, d - f, Xl), t._pt.u = m || 0, t._props.push(l));
  _h(a, n);
};
oi("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", n = "Bottom", r = "Left", o = (t < 3 ? [e, i, n, r] : [e + r, e + i, n + i, n + r]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  Ea[t > 1 ? "border" + s : s] = function(a, l, u, h, f) {
    var d, c;
    if (arguments.length < 4)
      return d = o.map(function(m) {
        return dn(a, m, u);
      }), c = d.join(" "), c.split(d[0]).length === 5 ? d[0] : c;
    d = (h + "").split(" "), c = {}, o.forEach(function(m, p) {
      return c[m] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), a.init(l, c, f);
  };
});
var qd = {
  name: "css",
  register: Gl,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, n, r) {
    var o = this._props, a = t.style, l = i.vars.startAt, u, h, f, d, c, m, p, y, v, A, C, S, _, P, O, T;
    su || Gl(), this.styles = this.styles || Nd(t), T = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(pi[p] && Cd(p, e, i, n, t, r)))) {
        if (c = typeof h, m = Ea[p], c === "function" && (h = h.call(i, n, t, r), c = typeof h), c === "string" && ~h.indexOf("random(") && (h = ao(h)), m)
          m(this, t, p, h, i) && (O = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Fn.lastIndex = 0, Fn.test(u) || (y = Ve(u), v = Ve(h)), v ? y !== v && (u = Hn(t, p, u, v) + v) : y && (h += y), this.add(a, "setProperty", u, h, n, r, 0, 0, p), o.push(p), T.push(p, 0, a[p]);
        else if (c !== "undefined") {
          if (l && p in l ? (u = typeof l[p] == "function" ? l[p].call(i, n, t, r) : l[p], ke(u) && ~u.indexOf("random(") && (u = ao(u)), Ve(u + "") || u === "auto" || (u += bi.units[p] || Ve(dn(t, p)) || ""), (u + "").charAt(1) === "=" && (u = dn(t, p))) : u = dn(t, p), d = parseFloat(u), A = c === "string" && h.charAt(1) === "=" && h.substr(0, 2), A && (h = h.substr(2)), f = parseFloat(h), p in Ji && (p === "autoAlpha" && (d === 1 && dn(t, "visibility") === "hidden" && f && (d = 0), T.push("visibility", 0, a.visibility), In(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = Ji[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in xn, C) {
            if (this.styles.save(p), c === "string" && h.substring(0, 6) === "var(--" && (h = Di(t, h.substring(4, h.indexOf(")"))), f = parseFloat(h)), S || (_ = t._gsap, _.renderTransform && !e.parseTransform || ho(t, e.parseTransform), P = e.smoothOrigin !== !1 && _.smooth, S = this._pt = new ai(this._pt, a, te, 0, 1, _.renderTransform, _, 0, -1), S.dep = 1), p === "scale")
              this._pt = new ai(this._pt, _, "scaleY", _.scaleY, (A ? qs(_.scaleY, A + f) : f) - _.scaleY || 0, Xl), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              T.push(li, 0, a[li]), h = Q0(h), _.svg ? jl(t, h, 0, P, 0, this) : (v = parseFloat(h.split(" ")[2]) || 0, v !== _.zOrigin && In(this, _, "zOrigin", _.zOrigin, v), In(this, a, p, Aa(u), Aa(h)));
              continue;
            } else if (p === "svgOrigin") {
              jl(t, h, 1, P, 0, this);
              continue;
            } else if (p in Hd) {
              iy(this, _, p, d, A ? qs(d, A + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              In(this, _, "smooth", _.smooth, h);
              continue;
            } else if (p === "force3D") {
              _[p] = h;
              continue;
            } else if (p === "transform") {
              ny(this, h, t);
              continue;
            }
          } else p in a || (p = lr(p) || p);
          if (C || (f || f === 0) && (d || d === 0) && !N0.test(h) && p in a)
            y = (u + "").substr((d + "").length), f || (f = 0), v = Ve(h) || (p in bi.units ? bi.units[p] : y), y !== v && (d = Hn(t, p, u, v)), this._pt = new ai(this._pt, C ? _ : a, p, d, (A ? qs(d, A + f) : f) - d, !C && (v === "px" || p === "zIndex") && e.autoRound !== !1 ? V0 : Xl), this._pt.u = v || 0, y !== v && v !== "%" && (this._pt.b = u, this._pt.r = B0);
          else if (p in a)
            Z0.call(this, t, p, u, A ? A + h : h);
          else if (p in t)
            this.add(t, p, u || t[p], A ? A + h : h, n, r);
          else if (p !== "parseTransform") {
            Kc(p, h);
            continue;
          }
          C || (p in a ? T.push(p, 0, a[p]) : typeof t[p] == "function" ? T.push(p, 2, t[p]()) : T.push(p, 1, u || t[p])), o.push(p);
        }
      }
    O && Dd(this);
  },
  render: function(t, e) {
    if (e.tween._time || !ru())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: dn,
  aliases: Ji,
  getSetter: function(t, e, i) {
    var n = Ji[e];
    return n && n.indexOf(",") < 0 && (e = n), e in xn && e !== li && (t._gsap.x || dn(t, "x")) ? i && uh === i ? e === "scale" ? q0 : W0 : (uh = i || {}) && (e === "scale" ? U0 : X0) : t.style && !qc(t.style[e]) ? H0 : ~e.indexOf("-") ? Y0 : iu(t, e);
  },
  core: {
    _removeProperty: _s,
    _getMatrix: au
  }
};
ui.utils.checkPrefix = lr;
ui.core.getStyleSaver = Nd;
(function(s, t, e, i) {
  var n = oi(s + "," + t + "," + e, function(r) {
    xn[r] = 1;
  });
  oi(t, function(r) {
    bi.units[r] = "deg", Hd[r] = 1;
  }), Ji[n[13]] = s + "," + t, oi(i, function(r) {
    var o = r.split(":");
    Ji[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
oi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  bi.units[s] = "px";
});
ui.registerPlugin(qd);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var gn, hs, lu, Wa, Cr, la, Ca, Hr, Hi = "transform", Zl = Hi + "Origin", Ud, Xd = function(t) {
  var e = t.ownerDocument || t;
  for (!(Hi in t.style) && ("msTransform" in t.style) && (Hi = "msTransform", Zl = Hi + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (hs = window, Ca = new vs(), e) {
    gn = e, lu = e.documentElement, Wa = e.body, Hr = gn.createElementNS("http://www.w3.org/2000/svg", "g"), Hr.style.transform = "none";
    var i = e.createElement("div"), n = e.createElement("div"), r = e && (e.body || e.firstElementChild);
    r && r.appendChild && (r.appendChild(i), i.appendChild(n), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), Ud = n.offsetParent !== i, r.removeChild(i));
  }
  return e;
}, sy = function(t) {
  for (var e, i; t && t !== Wa; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Kd = [], Gd = [], ry = function() {
  return hs.pageYOffset || gn.scrollTop || lu.scrollTop || Wa.scrollTop || 0;
}, oy = function() {
  return hs.pageXOffset || gn.scrollLeft || lu.scrollLeft || Wa.scrollLeft || 0;
}, cu = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, ay = function s(t) {
  if (hs.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, dl = function s(t, e) {
  if (t.parentNode && (gn || Xd(t))) {
    var i = cu(t), n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", r = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", u = gn.createElementNS ? gn.createElementNS(n.replace(/^https/, "http"), r) : gn.createElement(r);
    return e && (i ? (la || (la = s(t)), u.setAttribute("width", 0.01), u.setAttribute("height", 0.01), u.setAttribute("transform", "translate(" + o + "," + a + ")"), la.appendChild(u)) : (Cr || (Cr = s(t), Cr.style.cssText = l), u.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", Cr.appendChild(u))), u;
  }
  throw "Need document and parent.";
}, ly = function(t) {
  for (var e = new vs(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, cy = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Hi], t.style[Hi] = "none", t.appendChild(Hr), e = Hr.getCTM(), t.removeChild(Hr), i ? t.style[Hi] = i : t.style.removeProperty(Hi.replace(/([A-Z])/g, "-$1").toLowerCase())), e || Ca.clone();
}, uy = function(t, e) {
  var i = cu(t), n = t === i, r = i ? Kd : Gd, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, l, u, h, f, d, c;
  if (t === hs)
    return t;
  if (r.length || r.push(dl(t, 1), dl(t, 2), dl(t, 3)), l = i ? la : Cr, i)
    n ? (h = cy(t), f = -h.e / h.a, d = -h.f / h.d, u = Ca) : t.getBBox ? (h = t.getBBox(), u = t.transform ? t.transform.baseVal : {}, u = u.numberOfItems ? u.numberOfItems > 1 ? ly(u) : u.getItem(0).matrix : Ca, f = u.a * h.x + u.c * h.y, d = u.b * h.x + u.d * h.y) : (u = new vs(), f = d = 0), (n ? i : o).appendChild(l), l.setAttribute("transform", "matrix(" + u.a + "," + u.b + "," + u.c + "," + u.d + "," + (u.e + f) + "," + (u.f + d) + ")");
  else {
    if (f = d = 0, Ud)
      for (u = t.offsetParent, h = t; h && (h = h.parentNode) && h !== u && h.parentNode; )
        (hs.getComputedStyle(h)[Hi] + "").length > 4 && (f = h.offsetLeft, d = h.offsetTop, h = 0);
    if (c = hs.getComputedStyle(t), c.position !== "absolute" && c.position !== "fixed")
      for (u = t.offsetParent; o && o !== u; )
        f += o.scrollLeft || 0, d += o.scrollTop || 0, o = o.parentNode;
    h = l.style, h.top = t.offsetTop - d + "px", h.left = t.offsetLeft - f + "px", h[Hi] = c[Hi], h[Zl] = c[Zl], h.position = c.position === "fixed" ? "fixed" : "absolute", a.appendChild(l);
  }
  return l;
}, pl = function(t, e, i, n, r, o, a) {
  return t.a = e, t.b = i, t.c = n, t.d = r, t.e = o, t.f = a, t;
}, vs = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), pl(this, e, i, n, r, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, n = this.b, r = this.c, o = this.d, a = this.e, l = this.f, u = i * o - n * r || 1e-10;
    return pl(this, o / u, -n / u, -r / u, i / u, (r * l - o * a) / u, -(i * l - n * a) / u);
  }, t.multiply = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, u = this.f, h = i.a, f = i.c, d = i.b, c = i.d, m = i.e, p = i.f;
    return pl(this, h * n + d * o, h * r + d * a, f * n + c * o, f * r + c * a, l + m * n + p * o, u + m * r + p * a);
  }, t.clone = function() {
    return new s(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, u = this.f;
    return n === i.a && r === i.b && o === i.c && a === i.d && l === i.e && u === i.f;
  }, t.apply = function(i, n) {
    n === void 0 && (n = {});
    var r = i.x, o = i.y, a = this.a, l = this.b, u = this.c, h = this.d, f = this.e, d = this.f;
    return n.x = r * a + o * u + f || 0, n.y = r * l + o * h + d || 0, n;
  }, s;
}();
function is(s, t, e, i) {
  if (!s || !s.parentNode || (gn || Xd(s)).documentElement === s)
    return new vs();
  var n = sy(s), r = cu(s), o = r ? Kd : Gd, a = uy(s), l = o[0].getBoundingClientRect(), u = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), f = a.parentNode, d = ay(s), c = new vs((u.left - l.left) / 100, (u.top - l.top) / 100, (h.left - l.left) / 100, (h.top - l.top) / 100, l.left + (d ? 0 : oy()), l.top + (d ? 0 : ry()));
  if (f.removeChild(a), n)
    for (l = n.length; l--; )
      u = n[l], u.scaleX = u.scaleY = 0, u.renderTransform(1, u);
  return t ? c.inverse() : c;
}
function vh(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function hy(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var Et, Ht, yi, qi, yn, ml, pn, Ql, Or, Dn, jd, Jl, fo, uu, Pr, $i, kr, ca, Zd, tc, Oa = 0, Qd = function() {
  return typeof window < "u";
}, Jd = function() {
  return Et || Qd() && (Et = window.gsap) && Et.registerPlugin && Et;
}, Pn = function(t) {
  return typeof t == "function";
}, Yr = function(t) {
  return typeof t == "object";
}, Vi = function(t) {
  return typeof t > "u";
}, ua = function() {
  return !1;
}, Wr = "transform", ec = "transformOrigin", Tn = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, _r = Array.isArray, Bo = function(t, e) {
  var i = yi.createElementNS ? yi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : yi.createElement(t);
  return i.style ? i : yi.createElement(t);
}, wh = 180 / Math.PI, Os = 1e20, fy = new vs(), En = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, fs = [], Ks = {}, dy = 0, py = /^(?:a|input|textarea|button|select)$/i, bh = 0, Ps = {}, hn = {}, tp = function(t, e) {
  var i = {}, n;
  for (n in t)
    i[n] = e ? t[n] * e : t[n];
  return i;
}, my = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, xh = function s(t, e) {
  for (var i = t.length, n; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), n = t[i].children, n && n.length && s(n, e);
}, ep = function() {
  return fs.forEach(function(t) {
    return t();
  });
}, gy = function(t) {
  fs.push(t), fs.length === 1 && Et.ticker.add(ep);
}, Sh = function() {
  return !fs.length && Et.ticker.remove(ep);
}, Th = function(t) {
  for (var e = fs.length; e--; )
    fs[e] === t && fs.splice(e, 1);
  Et.to(Sh, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: Sh,
    data: "_draggable"
  });
}, yy = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Se = function(t, e, i, n) {
  if (t.addEventListener) {
    var r = fo[e];
    n = n || (jd ? {
      passive: !1
    } : null), t.addEventListener(r || e, i, n), r && e !== r && t.addEventListener(e, i, n);
  }
}, de = function(t, e, i, n) {
  if (t.removeEventListener) {
    var r = fo[e];
    t.removeEventListener(r || e, i, n), r && e !== r && t.removeEventListener(e, i, n);
  }
}, Ci = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, _y = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, vy = function s(t) {
  uu = t.touches && Oa < t.touches.length, de(t.target, "touchend", s);
}, Eh = function(t) {
  uu = t.touches && Oa < t.touches.length, Se(t.target, "touchend", vy);
}, Gs = function(t) {
  return Ht.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, js = function(t) {
  return Ht.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, Ah = function s(t, e) {
  Se(t, "scroll", e), cr(t.parentNode) || s(t.parentNode, e);
}, Ch = function s(t, e) {
  de(t, "scroll", e), cr(t.parentNode) || s(t.parentNode, e);
}, cr = function(t) {
  return !t || t === qi || t.nodeType === 9 || t === yi.body || t === Ht || !t.nodeType || !t.parentNode;
}, Oh = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return Math.max(0, cr(t) ? Math.max(qi[n], yn[n]) - (Ht["inner" + i] || qi[r] || yn[r]) : t[n] - t[r]);
}, gl = function s(t, e) {
  var i = Oh(t, "x"), n = Oh(t, "y");
  cr(t) ? t = hn : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = n, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, yl = function(t, e, i) {
  var n = t.style;
  n && (Vi(n[e]) && (e = Or(e, t) || e), i == null ? n.removeProperty && n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n[e] = i);
}, po = function(t) {
  return Ht.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Qn = {}, ks = function(t) {
  if (t === Ht)
    return Qn.left = Qn.top = 0, Qn.width = Qn.right = qi.clientWidth || t.innerWidth || yn.clientWidth || 0, Qn.height = Qn.bottom = (t.innerHeight || 0) - 20 < qi.clientHeight ? qi.clientHeight : t.innerHeight || yn.clientHeight || 0, Qn;
  var e = t.ownerDocument || yi, i = Vi(t.pageX) ? !t.nodeType && !Vi(t.left) && !Vi(t.top) ? t : Dn(t)[0].getBoundingClientRect() : {
    left: t.pageX - js(e),
    top: t.pageY - Gs(e),
    right: t.pageX - js(e) + 1,
    bottom: t.pageY - Gs(e) + 1
  };
  return Vi(i.right) && !Vi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Vi(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, oe = function(t, e, i) {
  var n = t.vars, r = n[i], o = t._listeners[e], a;
  return Pn(r) && (a = r.apply(n.callbackScope || t, n[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, Ph = function(t, e) {
  var i = Dn(t)[0], n, r, o;
  return !i.nodeType && i !== Ht ? Vi(t.left) ? (r = t.min || t.minX || t.minRotation || 0, n = t.min || t.minY || 0, {
    left: r,
    top: n,
    width: (t.max || t.maxX || t.maxRotation || 0) - r,
    height: (t.max || t.maxY || 0) - n
  }) : (o = {
    x: 0,
    y: 0
  }, {
    left: t.left - o.x,
    top: t.top - o.y,
    width: t.width,
    height: t.height
  }) : wy(i, e);
}, Oi = {}, wy = function(t, e) {
  e = Dn(e)[0];
  var i = t.getBBox && t.ownerSVGElement, n = t.ownerDocument || yi, r, o, a, l, u, h, f, d, c, m, p, y, v;
  if (t === Ht)
    a = Gs(n), r = js(n), o = r + (n.documentElement.clientWidth || t.innerWidth || n.body.clientWidth || 0), l = a + ((t.innerHeight || 0) - 20 < n.documentElement.clientHeight ? n.documentElement.clientHeight : t.innerHeight || n.body.clientHeight || 0);
  else {
    if (e === Ht || Vi(e))
      return t.getBoundingClientRect();
    r = a = 0, i ? (m = t.getBBox(), p = m.width, y = m.height) : (t.viewBox && (m = t.viewBox.baseVal) && (r = m.x || 0, a = m.y || 0, p = m.width, y = m.height), p || (v = po(t), m = v.boxSizing === "border-box", p = (parseFloat(v.width) || t.clientWidth || 0) + (m ? 0 : parseFloat(v.borderLeftWidth) + parseFloat(v.borderRightWidth)), y = (parseFloat(v.height) || t.clientHeight || 0) + (m ? 0 : parseFloat(v.borderTopWidth) + parseFloat(v.borderBottomWidth)))), o = p, l = y;
  }
  return t === e ? {
    left: r,
    top: a,
    width: o - r,
    height: l - a
  } : (u = is(e, !0).multiply(is(t)), h = u.apply({
    x: r,
    y: a
  }), f = u.apply({
    x: o,
    y: a
  }), d = u.apply({
    x: o,
    y: l
  }), c = u.apply({
    x: r,
    y: l
  }), r = Math.min(h.x, f.x, d.x, c.x), a = Math.min(h.y, f.y, d.y, c.y), {
    left: r,
    top: a,
    width: Math.max(h.x, f.x, d.x, c.x) - r,
    height: Math.max(h.y, f.y, d.y, c.y) - a
  });
}, _l = function(t, e, i, n, r, o) {
  var a = {}, l, u, h;
  if (e)
    if (r !== 1 && e instanceof Array) {
      if (a.end = l = [], h = e.length, Yr(e[0]))
        for (u = 0; u < h; u++)
          l[u] = tp(e[u], r);
      else
        for (u = 0; u < h; u++)
          l[u] = e[u] * r;
      i += 1.1, n -= 1.1;
    } else Pn(e) ? a.end = function(f) {
      var d = e.call(t, f), c, m;
      if (r !== 1)
        if (Yr(d)) {
          c = {};
          for (m in d)
            c[m] = d[m] * r;
          d = c;
        } else
          d *= r;
      return d;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (n || n === 0) && (a.min = n), o && (a.velocity = 0), a;
}, by = function s(t) {
  var e;
  return !t || !t.getAttribute || t === yn ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (py.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, Vo = function(t, e) {
  for (var i = t.length, n; i--; )
    n = t[i], n.ondragstart = n.onselectstart = e ? null : ua, Et.set(n, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, xy = function s(t) {
  if (po(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, ip, ic, Sy = function(t, e) {
  t = Et.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), n = i.style, r = t.firstChild, o = 0, a = 0, l = t.scrollTop, u = t.scrollLeft, h = t.scrollWidth, f = t.scrollHeight, d = 0, c = 0, m = 0, p, y, v, A, C, S;
  ip && e.force3D !== !1 ? (C = "translate3d(", S = "px,0px)") : Wr && (C = "translate(", S = "px)"), this.scrollTop = function(_, P) {
    if (!arguments.length)
      return -this.top();
    this.top(-_, P);
  }, this.scrollLeft = function(_, P) {
    if (!arguments.length)
      return -this.left();
    this.left(-_, P);
  }, this.left = function(_, P) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var O = t.scrollLeft - u, T = a;
    if ((O > 2 || O < -2) && !P) {
      u = t.scrollLeft, Et.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-u), e.onKill && e.onKill();
      return;
    }
    _ = -_, _ < 0 ? (a = _ - 0.5 | 0, _ = 0) : _ > c ? (a = _ - c | 0, _ = c) : a = 0, (a || T) && (this._skip || (n[Wr] = C + -a + "px," + -o + S), a + d >= 0 && (n.paddingRight = a + d + "px")), t.scrollLeft = _ | 0, u = t.scrollLeft;
  }, this.top = function(_, P) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var O = t.scrollTop - l, T = o;
    if ((O > 2 || O < -2) && !P) {
      l = t.scrollTop, Et.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-l), e.onKill && e.onKill();
      return;
    }
    _ = -_, _ < 0 ? (o = _ - 0.5 | 0, _ = 0) : _ > m ? (o = _ - m | 0, _ = m) : o = 0, (o || T) && (this._skip || (n[Wr] = C + -a + "px," + -o + S)), t.scrollTop = _ | 0, l = t.scrollTop;
  }, this.maxScrollTop = function() {
    return m;
  }, this.maxScrollLeft = function() {
    return c;
  }, this.disable = function() {
    for (r = i.firstChild; r; )
      A = r.nextSibling, t.appendChild(r), r = A;
    t === i.parentNode && t.removeChild(i);
  }, this.enable = function() {
    if (r = t.firstChild, r !== i) {
      for (; r; )
        A = r.nextSibling, i.appendChild(r), r = A;
      t.appendChild(i), this.calibrate();
    }
  }, this.calibrate = function(_) {
    var P = t.clientWidth === p, O, T, k;
    l = t.scrollTop, u = t.scrollLeft, !(P && t.clientHeight === y && i.offsetHeight === v && h === t.scrollWidth && f === t.scrollHeight && !_) && ((o || a) && (T = this.left(), k = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), O = po(t), (!P || _) && (n.display = "block", n.width = "auto", n.paddingRight = "0px", d = Math.max(0, t.scrollWidth - t.clientWidth), d && (d += parseFloat(O.paddingLeft) + (ic ? parseFloat(O.paddingRight) : 0))), n.display = "inline-block", n.position = "relative", n.overflow = "visible", n.verticalAlign = "top", n.boxSizing = "content-box", n.width = "100%", n.paddingRight = d + "px", ic && (n.paddingBottom = O.paddingBottom), p = t.clientWidth, y = t.clientHeight, h = t.scrollWidth, f = t.scrollHeight, c = t.scrollWidth - p, m = t.scrollHeight - y, v = i.offsetHeight, n.display = "block", (T || k) && (this.left(T), this.top(k)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, vl = function(t) {
  if (Qd() && document.body) {
    var e = window && window.navigator;
    Ht = window, yi = document, qi = yi.documentElement, yn = yi.body, ml = Bo("div"), ca = !!window.PointerEvent, pn = Bo("div"), pn.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", kr = pn.style.cursor === "grab" ? "grab" : "move", Pr = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Jl = "ontouchstart" in qi && "orientation" in Ht || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), ic = function() {
      var i = Bo("div"), n = Bo("div"), r = n.style, o = yn, a;
      return r.display = "inline-block", r.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(n), o.appendChild(i), a = n.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), fo = function(i) {
      for (var n = i.split(","), r = ("onpointerdown" in ml ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in ml ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[n[a]] = r[a], o[r[a]] = n[a];
      try {
        qi.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            jd = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), Se(yi, "touchcancel", ua), Se(Ht, "touchmove", ua), yn && yn.addEventListener("touchstart", ua), Se(yi, "contextmenu", function() {
      for (var i in Ks)
        Ks[i].isPressed && Ks[i].endDrag();
    }), Et = Ql = Jd();
  }
  Et ? ($i = Et.plugins.inertia, Zd = Et.core.context || function() {
  }, Or = Et.utils.checkPrefix, Wr = Or(Wr), ec = Or(ec), Dn = Et.utils.toArray, tc = Et.core.getStyleSaver, ip = !!Or("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, Ty = /* @__PURE__ */ function() {
  function s(e) {
    this._listeners = {}, this.target = e || this;
  }
  var t = s.prototype;
  return t.addEventListener = function(i, n) {
    var r = this._listeners[i] || (this._listeners[i] = []);
    ~r.indexOf(n) || r.push(n);
  }, t.removeEventListener = function(i, n) {
    var r = this._listeners[i], o = r && r.indexOf(n);
    o >= 0 && r.splice(o, 1);
  }, t.dispatchEvent = function(i) {
    var n = this, r;
    return (this._listeners[i] || []).forEach(function(o) {
      return o.call(n, {
        type: i,
        target: n.target
      }) === !1 && (r = !1);
    }), r;
  }, s;
}(), qa = /* @__PURE__ */ function(s) {
  hy(t, s);
  function t(e, i) {
    var n;
    n = s.call(this) || this, Ql || vl(1), e = Dn(e)[0], n.styles = tc && tc(e, "transform,left,top"), $i || ($i = Et.plugins.inertia), n.vars = i = tp(i || {}), n.target = e, n.x = n.y = n.rotation = 0, n.dragResistance = parseFloat(i.dragResistance) || 0, n.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, n.lockAxis = i.lockAxis, n.autoScroll = i.autoScroll || 0, n.lockedAxis = null, n.allowEventDefault = !!i.allowEventDefault, Et.getProperty(e, "x");
    var r = (i.type || "x,y").toLowerCase(), o = ~r.indexOf("x") || ~r.indexOf("y"), a = r.indexOf("rotation") !== -1, l = a ? "rotation" : o ? "x" : "left", u = o ? "y" : "top", h = !!(~r.indexOf("x") || ~r.indexOf("left") || r === "scroll"), f = !!(~r.indexOf("y") || ~r.indexOf("top") || r === "scroll"), d = i.minimumMovement || 2, c = vh(n), m = Dn(i.trigger || i.handle || e), p = {}, y = 0, v = !1, A = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, S = i.autoScrollMarginBottom || 40, _ = i.autoScrollMarginLeft || 40, P = i.clickableTest || by, O = 0, T = e._gsap || Et.core.getCache(e), k = xy(e), R = function(w, $) {
      return parseFloat(T.get(e, w, $));
    }, V = e.ownerDocument || yi, z, B, J, it, U, H, tt, at, b, j, st, X, ot, Dt, yt, Ct, ct, Rt, ne, $t, qt, mt, gt, ut, Ae, I, Bt, Ue, Me, zt, Nt, ce, Xe, Xt = function(w) {
      return Ci(w), w.stopImmediatePropagation && w.stopImmediatePropagation(), !1;
    }, se = function Z(w) {
      if (c.autoScroll && c.isDragging && (v || ct)) {
        var $ = e, E = c.autoScroll * 15, M, N, D, Y, F, W, et, K;
        for (v = !1, hn.scrollTop = Ht.pageYOffset != null ? Ht.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Ht.pageXOffset != null ? Ht.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft, Y = c.pointerX - hn.scrollLeft, F = c.pointerY - hn.scrollTop; $ && !N; )
          N = cr($.parentNode), M = N ? hn : $.parentNode, D = N ? {
            bottom: Math.max(qi.clientHeight, Ht.innerHeight || 0),
            right: Math.max(qi.clientWidth, Ht.innerWidth || 0),
            left: 0,
            top: 0
          } : M.getBoundingClientRect(), W = et = 0, f && (K = M._gsMaxScrollY - M.scrollTop, K < 0 ? et = K : F > D.bottom - S && K ? (v = !0, et = Math.min(K, E * (1 - Math.max(0, D.bottom - F) / S) | 0)) : F < D.top + A && M.scrollTop && (v = !0, et = -Math.min(M.scrollTop, E * (1 - Math.max(0, F - D.top) / A) | 0)), et && (M.scrollTop += et)), h && (K = M._gsMaxScrollX - M.scrollLeft, K < 0 ? W = K : Y > D.right - C && K ? (v = !0, W = Math.min(K, E * (1 - Math.max(0, D.right - Y) / C) | 0)) : Y < D.left + _ && M.scrollLeft && (v = !0, W = -Math.min(M.scrollLeft, E * (1 - Math.max(0, Y - D.left) / _) | 0)), W && (M.scrollLeft += W)), N && (W || et) && (Ht.scrollTo(M.scrollLeft, M.scrollTop), Ne(c.pointerX + W, c.pointerY + et)), $ = M;
      }
      if (ct) {
        var dt = c.x, St = c.y;
        a ? (c.deltaX = dt - parseFloat(T.rotation), c.rotation = dt, T.rotation = dt + "deg", T.renderTransform(1, T)) : B ? (f && (c.deltaY = St - B.top(), B.top(St)), h && (c.deltaX = dt - B.left(), B.left(dt))) : o ? (f && (c.deltaY = St - parseFloat(T.y), T.y = St + "px"), h && (c.deltaX = dt - parseFloat(T.x), T.x = dt + "px"), T.renderTransform(1, T)) : (f && (c.deltaY = St - parseFloat(e.style.top || 0), e.style.top = St + "px"), h && (c.deltaX = dt - parseFloat(e.style.left || 0), e.style.left = dt + "px")), at && !w && !Ue && (Ue = !0, oe(c, "drag", "onDrag") === !1 && (h && (c.x -= c.deltaX), f && (c.y -= c.deltaY), Z(!0)), Ue = !1);
      }
      ct = !1;
    }, Pt = function(w, $) {
      var E = c.x, M = c.y, N, D;
      e._gsap || (T = Et.core.getCache(e)), T.uncache && Et.getProperty(e, "x"), o ? (c.x = parseFloat(T.x), c.y = parseFloat(T.y)) : a ? c.x = c.rotation = parseFloat(T.rotation) : B ? (c.y = B.top(), c.x = B.left()) : (c.y = parseFloat(e.style.top || (D = po(e)) && D.top) || 0, c.x = parseFloat(e.style.left || (D || {}).left) || 0), (ne || $t || qt) && !$ && (c.isDragging || c.isThrowing) && (qt && (Ps.x = c.x, Ps.y = c.y, N = qt(Ps), N.x !== c.x && (c.x = N.x, ct = !0), N.y !== c.y && (c.y = N.y, ct = !0)), ne && (N = ne(c.x), N !== c.x && (c.x = N, a && (c.rotation = N), ct = !0)), $t && (N = $t(c.y), N !== c.y && (c.y = N), ct = !0)), ct && se(!0), w || (c.deltaX = c.x - E, c.deltaY = c.y - M, oe(c, "throwupdate", "onThrowUpdate"));
    }, ue = function(w, $, E, M) {
      return $ == null && ($ = -1e20), E == null && (E = Os), Pn(w) ? function(N) {
        var D = c.isPressed ? 1 - c.edgeResistance : 1;
        return w.call(c, (N > E ? E + (N - E) * D : N < $ ? $ + (N - $) * D : N) * M) * M;
      } : _r(w) ? function(N) {
        for (var D = w.length, Y = 0, F = Os, W, et; --D > -1; )
          W = w[D], et = W - N, et < 0 && (et = -et), et < F && W >= $ && W <= E && (Y = D, F = et);
        return w[Y];
      } : isNaN(w) ? function(N) {
        return N;
      } : function() {
        return w * M;
      };
    }, Ie = function(w, $, E, M, N, D, Y) {
      return D = D && D < Os ? D * D : Os, Pn(w) ? function(F) {
        var W = c.isPressed ? 1 - c.edgeResistance : 1, et = F.x, K = F.y, dt, St, Ot;
        return F.x = et = et > E ? E + (et - E) * W : et < $ ? $ + (et - $) * W : et, F.y = K = K > N ? N + (K - N) * W : K < M ? M + (K - M) * W : K, dt = w.call(c, F), dt !== F && (F.x = dt.x, F.y = dt.y), Y !== 1 && (F.x *= Y, F.y *= Y), D < Os && (St = F.x - et, Ot = F.y - K, St * St + Ot * Ot > D && (F.x = et, F.y = K)), F;
      } : _r(w) ? function(F) {
        for (var W = w.length, et = 0, K = Os, dt, St, Ot, _t; --W > -1; )
          Ot = w[W], dt = Ot.x - F.x, St = Ot.y - F.y, _t = dt * dt + St * St, _t < K && (et = W, K = _t);
        return K <= D ? w[et] : F;
      } : function(F) {
        return F;
      };
    }, ze = function() {
      var w, $, E, M;
      tt = !1, B ? (B.calibrate(), c.minX = st = -B.maxScrollLeft(), c.minY = ot = -B.maxScrollTop(), c.maxX = j = c.maxY = X = 0, tt = !0) : i.bounds && (w = Ph(i.bounds, e.parentNode), a ? (c.minX = st = w.left, c.maxX = j = w.left + w.width, c.minY = ot = c.maxY = X = 0) : !Vi(i.bounds.maxX) || !Vi(i.bounds.maxY) ? (w = i.bounds, c.minX = st = w.minX, c.minY = ot = w.minY, c.maxX = j = w.maxX, c.maxY = X = w.maxY) : ($ = Ph(e, e.parentNode), c.minX = st = Math.round(R(l, "px") + w.left - $.left), c.minY = ot = Math.round(R(u, "px") + w.top - $.top), c.maxX = j = Math.round(st + (w.width - $.width)), c.maxY = X = Math.round(ot + (w.height - $.height))), st > j && (c.minX = j, c.maxX = j = st, st = c.minX), ot > X && (c.minY = X, c.maxY = X = ot, ot = c.minY), a && (c.minRotation = st, c.maxRotation = j), tt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, M = _r(E) || Pn(E), a ? (ne = ue(M ? E : E.rotation, st, j, 1), $t = null) : E.points ? qt = Ie(M ? E : E.points, st, j, ot, X, E.radius, B ? -1 : 1) : (h && (ne = ue(M ? E : E.x || E.left || E.scrollLeft, st, j, B ? -1 : 1)), f && ($t = ue(M ? E : E.y || E.top || E.scrollTop, ot, X, B ? -1 : 1))));
    }, Xi = function() {
      c.isThrowing = !1, oe(c, "throwcomplete", "onThrowComplete");
    }, Ut = function() {
      c.isThrowing = !1;
    }, Ki = function(w, $) {
      var E, M, N, D;
      w && $i ? (w === !0 && (E = i.snap || i.liveSnap || {}, M = _r(E) || Pn(E), w = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? w.rotation = _l(c, M ? E : E.rotation, j, st, 1, $) : (h && (w[l] = _l(c, M ? E : E.points || E.x || E.left, j, st, B ? -1 : 1, $ || c.lockedAxis === "x")), f && (w[u] = _l(c, M ? E : E.points || E.y || E.top, X, ot, B ? -1 : 1, $ || c.lockedAxis === "y")), (E.points || _r(E) && Yr(E[0])) && (w.linkedProps = l + "," + u, w.radius = E.radius))), c.isThrowing = !0, D = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - c.edgeResistance + 0.2 : i.overshootTolerance, w.duration || (w.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? D === 0 || Yr(w) && w.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: D
      }), c.tween = N = Et.to(B || e, {
        inertia: w,
        data: "_draggable",
        inherit: !1,
        onComplete: Xi,
        onInterrupt: Ut,
        onUpdate: i.fastMode ? oe : Pt,
        onUpdateParams: i.fastMode ? [c, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), N.render(1e9, !0, !0), Pt(!0, !0), c.endX = c.x, c.endY = c.y, a && (c.endRotation = c.x), N.play(0), Pt(!0, !0), B && (B._skip = !1))) : tt && c.applyBounds();
    }, ni = function(w) {
      var $ = ut, E;
      ut = is(e.parentNode, !0), w && c.isPressed && !ut.equals($ || new vs()) && (E = $.inverse().apply({
        x: J,
        y: it
      }), ut.apply(E, E), J = E.x, it = E.y), ut.equals(fy) && (ut = null);
    }, _e = function() {
      var w = 1 - c.edgeResistance, $ = k ? js(V) : 0, E = k ? Gs(V) : 0, M, N, D;
      o && (T.x = R(l, "px") + "px", T.y = R(u, "px") + "px", T.renderTransform()), ni(!1), Oi.x = c.pointerX - $, Oi.y = c.pointerY - E, ut && ut.apply(Oi, Oi), J = Oi.x, it = Oi.y, ct && (Ne(c.pointerX, c.pointerY), se(!0)), ce = is(e), B ? (ze(), H = B.top(), U = B.left()) : (De() ? (Pt(!0, !0), ze()) : c.applyBounds(), a ? (M = e.ownerSVGElement ? [T.xOrigin - e.getBBox().x, T.yOrigin - e.getBBox().y] : (po(e)[ec] || "0 0").split(" "), Ct = c.rotationOrigin = is(e).apply({
        x: parseFloat(M[0]) || 0,
        y: parseFloat(M[1]) || 0
      }), Pt(!0, !0), N = c.pointerX - Ct.x - $, D = Ct.y - c.pointerY + E, U = c.x, H = c.y = Math.atan2(D, N) * wh) : (H = R(u, "px"), U = R(l, "px"))), tt && w && (U > j ? U = j + (U - j) / w : U < st && (U = st - (st - U) / w), a || (H > X ? H = X + (H - X) / w : H < ot && (H = ot - (ot - H) / w))), c.startX = U = Tn(U), c.startY = H = Tn(H);
    }, De = function() {
      return c.tween && c.tween.isActive();
    }, Ti = function() {
      pn.parentNode && !De() && !c.isDragging && pn.parentNode.removeChild(pn);
    }, Fe = function(w, $) {
      var E;
      if (!z || c.isPressed || !w || (w.type === "mousedown" || w.type === "pointerdown") && !$ && En() - O < 30 && fo[c.pointerEvent.type]) {
        Nt && w && z && Ci(w);
        return;
      }
      if (Ae = De(), Xe = !1, c.pointerEvent = w, fo[w.type] ? (gt = ~w.type.indexOf("touch") ? w.currentTarget || w.target : V, Se(gt, "touchend", Ft), Se(gt, "touchmove", lt), Se(gt, "touchcancel", Ft), Se(V, "touchstart", Eh)) : (gt = null, Se(V, "mousemove", lt)), Bt = null, (!ca || !gt) && (Se(V, "mouseup", Ft), w && w.target && Se(w.target, "mouseup", Ft)), mt = P.call(c, w.target) && i.dragClickables === !1 && !$, mt) {
        Se(w.target, "change", Ft), oe(c, "pressInit", "onPressInit"), oe(c, "press", "onPress"), Vo(m, !0), Nt = !1;
        return;
      }
      if (I = !gt || h === f || c.vars.allowNativeTouchScrolling === !1 || c.vars.allowContextMenu && w && (w.ctrlKey || w.which > 2) ? !1 : h ? "y" : "x", Nt = !I && !c.allowEventDefault, Nt && (Ci(w), Se(Ht, "touchforcechange", Ci)), w.changedTouches ? (w = Dt = w.changedTouches[0], yt = w.identifier) : w.pointerId ? yt = w.pointerId : Dt = yt = null, Oa++, gy(se), it = c.pointerY = w.pageY, J = c.pointerX = w.pageX, oe(c, "pressInit", "onPressInit"), (I || c.autoScroll) && gl(e.parentNode), e.parentNode && c.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !pn.parentNode && !e.getBBox && (pn.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(pn)), _e(), c.tween && c.tween.kill(), c.isThrowing = !1, Et.killTweensOf(B || e, p, !0), B && Et.killTweensOf(e, {
        scrollTo: 1
      }, !0), c.tween = c.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), c.isPressed = !0, at = !!(i.onDrag || c._listeners.drag), b = !!(i.onMove || c._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = m.length; --E > -1; )
          Et.set(m[E], {
            cursor: i.activeCursor || i.cursor || (kr === "grab" ? "grabbing" : kr)
          });
      oe(c, "press", "onPress");
    }, lt = function(w) {
      var $ = w, E, M, N, D, Y, F;
      if (!z || uu || !c.isPressed || !w) {
        Nt && w && z && Ci(w);
        return;
      }
      if (c.pointerEvent = w, E = w.changedTouches, E) {
        if (w = E[0], w !== Dt && w.identifier !== yt) {
          for (D = E.length; --D > -1 && (w = E[D]).identifier !== yt && w.target !== e; )
            ;
          if (D < 0)
            return;
        }
      } else if (w.pointerId && yt && w.pointerId !== yt)
        return;
      if (gt && I && !Bt && (Oi.x = w.pageX - (k ? js(V) : 0), Oi.y = w.pageY - (k ? Gs(V) : 0), ut && ut.apply(Oi, Oi), M = Oi.x, N = Oi.y, Y = Math.abs(M - J), F = Math.abs(N - it), (Y !== F && (Y > d || F > d) || Pr && I === Bt) && (Bt = Y > F && h ? "x" : "y", I && Bt !== I && Se(Ht, "touchforcechange", Ci), c.vars.lockAxisOnTouchScroll !== !1 && h && f && (c.lockedAxis = Bt === "x" ? "y" : "x", Pn(c.vars.onLockAxis) && c.vars.onLockAxis.call(c, $)), Pr && I === Bt))) {
        Ft($);
        return;
      }
      !c.allowEventDefault && (!I || Bt && I !== Bt) && $.cancelable !== !1 ? (Ci($), Nt = !0) : Nt && (Nt = !1), c.autoScroll && (v = !0), Ne(w.pageX, w.pageY, b);
    }, Ne = function(w, $, E) {
      var M = 1 - c.dragResistance, N = 1 - c.edgeResistance, D = c.pointerX, Y = c.pointerY, F = H, W = c.x, et = c.y, K = c.endX, dt = c.endY, St = c.endRotation, Ot = ct, _t, pt, kt, ht, ve, Kt;
      c.pointerX = w, c.pointerY = $, k && (w -= js(V), $ -= Gs(V)), a ? (ht = Math.atan2(Ct.y - $, w - Ct.x) * wh, ve = c.y - ht, ve > 180 ? (H -= 360, c.y = ht) : ve < -180 && (H += 360, c.y = ht), c.x !== U || Math.max(Math.abs(J - w), Math.abs(it - $)) > d ? (c.y = ht, kt = U + (H - ht) * M) : kt = U) : (ut && (Kt = w * ut.a + $ * ut.c + ut.e, $ = w * ut.b + $ * ut.d + ut.f, w = Kt), pt = $ - it, _t = w - J, pt < d && pt > -d && (pt = 0), _t < d && _t > -d && (_t = 0), (c.lockAxis || c.lockedAxis) && (_t || pt) && (Kt = c.lockedAxis, Kt || (c.lockedAxis = Kt = h && Math.abs(_t) > Math.abs(pt) ? "y" : f ? "x" : null, Kt && Pn(c.vars.onLockAxis) && c.vars.onLockAxis.call(c, c.pointerEvent)), Kt === "y" ? pt = 0 : Kt === "x" && (_t = 0)), kt = Tn(U + _t * M), ht = Tn(H + pt * M)), (ne || $t || qt) && (c.x !== kt || c.y !== ht && !a) && (qt && (Ps.x = kt, Ps.y = ht, Kt = qt(Ps), kt = Tn(Kt.x), ht = Tn(Kt.y)), ne && (kt = Tn(ne(kt))), $t && (ht = Tn($t(ht)))), tt && (kt > j ? kt = j + Math.round((kt - j) * N) : kt < st && (kt = st + Math.round((kt - st) * N)), a || (ht > X ? ht = Math.round(X + (ht - X) * N) : ht < ot && (ht = Math.round(ot + (ht - ot) * N)))), (c.x !== kt || c.y !== ht && !a) && (a ? (c.endRotation = c.x = c.endX = kt, ct = !0) : (f && (c.y = c.endY = ht, ct = !0), h && (c.x = c.endX = kt, ct = !0)), !E || oe(c, "move", "onMove") !== !1 ? !c.isDragging && c.isPressed && (c.isDragging = Xe = !0, oe(c, "dragstart", "onDragStart")) : (c.pointerX = D, c.pointerY = Y, H = F, c.x = W, c.y = et, c.endX = K, c.endY = dt, c.endRotation = St, ct = Ot));
    }, Ft = function Z(w, $) {
      if (!z || !c.isPressed || w && yt != null && !$ && (w.pointerId && w.pointerId !== yt && w.target !== e || w.changedTouches && !_y(w.changedTouches, yt))) {
        Nt && w && z && Ci(w);
        return;
      }
      c.isPressed = !1;
      var E = w, M = c.isDragging, N = c.vars.allowContextMenu && w && (w.ctrlKey || w.which > 2), D = Et.delayedCall(1e-3, Ti), Y, F, W, et, K;
      if (gt ? (de(gt, "touchend", Z), de(gt, "touchmove", lt), de(gt, "touchcancel", Z), de(V, "touchstart", Eh)) : de(V, "mousemove", lt), de(Ht, "touchforcechange", Ci), (!ca || !gt) && (de(V, "mouseup", Z), w && w.target && de(w.target, "mouseup", Z)), ct = !1, M && (y = bh = En(), c.isDragging = !1), Th(se), mt && !N) {
        w && (de(w.target, "change", Z), c.pointerEvent = E), Vo(m, !1), oe(c, "release", "onRelease"), oe(c, "click", "onClick"), mt = !1;
        return;
      }
      for (F = m.length; --F > -1; )
        yl(m[F], "cursor", i.cursor || (i.cursor !== !1 ? kr : null));
      if (Oa--, w) {
        if (Y = w.changedTouches, Y && (w = Y[0], w !== Dt && w.identifier !== yt)) {
          for (F = Y.length; --F > -1 && (w = Y[F]).identifier !== yt && w.target !== e; )
            ;
          if (F < 0 && !$)
            return;
        }
        c.pointerEvent = E, c.pointerX = w.pageX, c.pointerY = w.pageY;
      }
      return N && E ? (Ci(E), Nt = !0, oe(c, "release", "onRelease")) : E && !M ? (Nt = !1, Ae && (i.snap || i.bounds) && Ki(i.inertia || i.throwProps), oe(c, "release", "onRelease"), (!Pr || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (oe(c, "click", "onClick"), En() - O < 300 && oe(c, "doubleclick", "onDoubleClick"), et = E.target || e, O = En(), K = function() {
        O !== Me && c.enabled() && !c.isPressed && !E.defaultPrevented && (et.click ? et.click() : V.createEvent && (W = V.createEvent("MouseEvents"), W.initMouseEvent("click", !0, !0, Ht, 1, c.pointerEvent.screenX, c.pointerEvent.screenY, c.pointerX, c.pointerY, !1, !1, !1, !1, 0, null), et.dispatchEvent(W)));
      }, !Pr && !E.defaultPrevented && Et.delayedCall(0.05, K))) : (Ki(i.inertia || i.throwProps), !c.allowEventDefault && E && (i.dragClickables !== !1 || !P.call(c, E.target)) && M && (!I || Bt && I === Bt) && E.cancelable !== !1 ? (Nt = !0, Ci(E)) : Nt = !1, oe(c, "release", "onRelease")), De() && D.duration(c.tween.duration()), M && oe(c, "dragend", "onDragEnd"), !0;
    }, Ce = function(w) {
      if (w && c.isDragging && !B) {
        var $ = w.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, M = $.scrollTop - $._gsScrollY;
        (E || M) && (ut ? (J -= E * ut.a + M * ut.c, it -= M * ut.d + E * ut.b) : (J -= E, it -= M), $._gsScrollX += E, $._gsScrollY += M, Ne(c.pointerX, c.pointerY));
      }
    }, ee = function(w) {
      var $ = En(), E = $ - O < 100, M = $ - y < 50, N = E && Me === O, D = c.pointerEvent && c.pointerEvent.defaultPrevented, Y = E && zt === O, F = w.isTrusted || w.isTrusted == null && E && N;
      if ((N || M && c.vars.suppressClickOnDrag !== !1) && w.stopImmediatePropagation && w.stopImmediatePropagation(), E && !(c.pointerEvent && c.pointerEvent.defaultPrevented) && (!N || F && !Y)) {
        F && N && (zt = O), Me = O;
        return;
      }
      (c.isPressed || M || E) && (!F || !w.detail || !E || D) && Ci(w), !E && !M && !Xe && (w && w.target && (c.pointerEvent = w), oe(c, "click", "onClick"));
    }, Ei = function(w) {
      return ut ? {
        x: w.x * ut.a + w.y * ut.c + ut.e,
        y: w.x * ut.b + w.y * ut.d + ut.f
      } : {
        x: w.x,
        y: w.y
      };
    };
    return Rt = t.get(e), Rt && Rt.kill(), n.startDrag = function(Z, w) {
      var $, E, M, N;
      Fe(Z || c.pointerEvent, !0), w && !c.hitTest(Z || c.pointerEvent) && ($ = ks(Z || c.pointerEvent), E = ks(e), M = Ei({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), N = Ei({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), J -= M.x - N.x, it -= M.y - N.y), c.isDragging || (c.isDragging = Xe = !0, oe(c, "dragstart", "onDragStart"));
    }, n.drag = lt, n.endDrag = function(Z) {
      return Ft(Z || c.pointerEvent, !0);
    }, n.timeSinceDrag = function() {
      return c.isDragging ? 0 : (En() - y) / 1e3;
    }, n.timeSinceClick = function() {
      return (En() - O) / 1e3;
    }, n.hitTest = function(Z, w) {
      return t.hitTest(c.target, Z, w);
    }, n.getDirection = function(Z, w) {
      var $ = Z === "velocity" && $i ? Z : Yr(Z) && !a ? "element" : "start", E, M, N, D, Y, F;
      return $ === "element" && (Y = ks(c.target), F = ks(Z)), E = $ === "start" ? c.x - U : $ === "velocity" ? $i.getVelocity(e, l) : Y.left + Y.width / 2 - (F.left + F.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (w = w || 2, M = $ === "start" ? c.y - H : $ === "velocity" ? $i.getVelocity(e, u) : Y.top + Y.height / 2 - (F.top + F.height / 2), N = Math.abs(E / M), D = N < 1 / w ? "" : E < 0 ? "left" : "right", N < w && (D !== "" && (D += "-"), D += M < 0 ? "up" : "down"), D);
    }, n.applyBounds = function(Z, w) {
      var $, E, M, N, D, Y;
      if (Z && i.bounds !== Z)
        return i.bounds = Z, c.update(!0, w);
      if (Pt(!0), ze(), tt && !De()) {
        if ($ = c.x, E = c.y, $ > j ? $ = j : $ < st && ($ = st), E > X ? E = X : E < ot && (E = ot), (c.x !== $ || c.y !== E) && (M = !0, c.x = c.endX = $, a ? c.endRotation = $ : c.y = c.endY = E, ct = !0, se(!0), c.autoScroll && !c.isDragging))
          for (gl(e.parentNode), N = e, hn.scrollTop = Ht.pageYOffset != null ? Ht.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Ht.pageXOffset != null ? Ht.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft; N && !Y; )
            Y = cr(N.parentNode), D = Y ? hn : N.parentNode, f && D.scrollTop > D._gsMaxScrollY && (D.scrollTop = D._gsMaxScrollY), h && D.scrollLeft > D._gsMaxScrollX && (D.scrollLeft = D._gsMaxScrollX), N = D;
        c.isThrowing && (M || c.endX > j || c.endX < st || c.endY > X || c.endY < ot) && Ki(i.inertia || i.throwProps, M);
      }
      return c;
    }, n.update = function(Z, w, $) {
      if (w && c.isPressed) {
        var E = is(e), M = ce.apply({
          x: c.x - U,
          y: c.y - H
        }), N = is(e.parentNode, !0);
        N.apply({
          x: E.e - M.x,
          y: E.f - M.y
        }, M), c.x -= M.x - N.e, c.y -= M.y - N.f, se(!0), _e();
      }
      var D = c.x, Y = c.y;
      return ni(!w), Z ? c.applyBounds() : (ct && $ && se(!0), Pt(!0)), w && (Ne(c.pointerX, c.pointerY), ct && se(!0)), c.isPressed && !w && (h && Math.abs(D - c.x) > 0.01 || f && Math.abs(Y - c.y) > 0.01 && !a) && _e(), c.autoScroll && (gl(e.parentNode, c.isDragging), v = c.isDragging, se(!0), Ch(e, Ce), Ah(e, Ce)), c;
    }, n.enable = function(Z) {
      var w = {
        lazy: !0
      }, $, E, M;
      if (i.cursor !== !1 && (w.cursor = i.cursor || kr), Et.utils.checkPrefix("touchCallout") && (w.touchCallout = "none"), Z !== "soft") {
        for (xh(m, h === f ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), E = m.length; --E > -1; )
          M = m[E], ca || Se(M, "mousedown", Fe), Se(M, "touchstart", Fe), Se(M, "click", ee, !0), Et.set(M, w), M.getBBox && M.ownerSVGElement && h !== f && Et.set(M.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Se(M, "contextmenu", Xt);
        Vo(m, !1);
      }
      return Ah(e, Ce), z = !0, $i && Z !== "soft" && $i.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + dy++, Ks[$] = c, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && _e(), i.bounds && c.applyBounds(), c;
    }, n.disable = function(Z) {
      for (var w = c.isDragging, $ = m.length, E; --$ > -1; )
        yl(m[$], "cursor", null);
      if (Z !== "soft") {
        for (xh(m, null), $ = m.length; --$ > -1; )
          E = m[$], yl(E, "touchCallout", null), de(E, "mousedown", Fe), de(E, "touchstart", Fe), de(E, "click", ee, !0), de(E, "contextmenu", Xt);
        Vo(m, !0), gt && (de(gt, "touchcancel", Ft), de(gt, "touchend", Ft), de(gt, "touchmove", lt)), de(V, "mouseup", Ft), de(V, "mousemove", lt);
      }
      return Ch(e, Ce), z = !1, $i && Z !== "soft" && ($i.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), c.tween && c.tween.kill()), B && B.disable(), Th(se), c.isDragging = c.isPressed = mt = !1, w && oe(c, "dragend", "onDragEnd"), c;
    }, n.enabled = function(Z, w) {
      return arguments.length ? Z ? c.enable(w) : c.disable(w) : z;
    }, n.kill = function() {
      return c.isThrowing = !1, c.tween && c.tween.kill(), c.disable(), Et.set(m, {
        clearProps: "userSelect"
      }), delete Ks[e._gsDragID], c;
    }, n.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~r.indexOf("scroll") && (B = n.scrollProxy = new Sy(e, my({
      onKill: function() {
        c.isPressed && Ft(null);
      }
    }, i)), e.style.overflowY = f && !Jl ? "auto" : "hidden", e.style.overflowX = h && !Jl ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (h && (p[l] = 1), f && (p[u] = 1)), T.force3D = "force3D" in i ? i.force3D : !0, Zd(vh(n)), n.enable(), n;
  }
  return t.register = function(i) {
    Et = i, vl();
  }, t.create = function(i, n) {
    return Ql || vl(!0), Dn(i).map(function(r) {
      return new t(r, n);
    });
  }, t.get = function(i) {
    return Ks[(Dn(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (En() - bh) / 1e3;
  }, t.hitTest = function(i, n, r) {
    if (i === n)
      return !1;
    var o = ks(i), a = ks(n), l = o.top, u = o.left, h = o.right, f = o.bottom, d = o.width, c = o.height, m = a.left > h || a.right < u || a.top > f || a.bottom < l, p, y, v;
    return m || !r ? !m : (v = (r + "").indexOf("%") !== -1, r = parseFloat(r) || 0, p = {
      left: Math.max(u, a.left),
      top: Math.max(l, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(f, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : v ? (r *= 0.01, y = p.width * p.height, y >= d * c * r || y >= a.width * a.height * r) : p.width > r && p.height > r);
  }, t;
}(Ty);
yy(qa.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
qa.zIndex = 1e3;
qa.version = "3.13.0";
Jd() && Et.registerPlugin(qa);
function Ey(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function Ay(s, t, e) {
  return t && Ey(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Le, ha, _i, Ln, Rn, Zs, np, ts, qr, sp, _n, Bi, rp, op = function() {
  return Le || typeof window < "u" && (Le = window.gsap) && Le.registerPlugin && Le;
}, ap = 1, Bs = [], bt = [], sn = [], Ur = Date.now, nc = function(t, e) {
  return e;
}, Cy = function() {
  var t = qr.core, e = t.bridge || {}, i = t._scrollers, n = t._proxies;
  i.push.apply(i, bt), n.push.apply(n, sn), bt = i, sn = n, nc = function(o, a) {
    return e[o](a);
  };
}, Nn = function(t, e) {
  return ~sn.indexOf(t) && sn[sn.indexOf(t) + 1][e];
}, Xr = function(t) {
  return !!~sp.indexOf(t);
}, je = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: n !== !1,
    capture: !!r
  });
}, Ge = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Ho = "scrollLeft", Yo = "scrollTop", sc = function() {
  return _n && _n.isPressed || bt.cache++;
}, Pa = function(t, e) {
  var i = function n(r) {
    if (r || r === 0) {
      ap && (_i.history.scrollRestoration = "manual");
      var o = _n && _n.isPressed;
      r = n.v = Math.round(r) || (_n && _n.iOS ? 1 : 0), t(r), n.cacheID = bt.cache, o && nc("ss", r);
    } else (e || bt.cache !== n.cacheID || nc("ref")) && (n.cacheID = bt.cache, n.v = t());
    return n.v + n.offset;
  };
  return i.offset = 0, t && i;
}, ei = {
  s: Ho,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Pa(function(s) {
    return arguments.length ? _i.scrollTo(s, Ee.sc()) : _i.pageXOffset || Ln[Ho] || Rn[Ho] || Zs[Ho] || 0;
  })
}, Ee = {
  s: Yo,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ei,
  sc: Pa(function(s) {
    return arguments.length ? _i.scrollTo(ei.sc(), s) : _i.pageYOffset || Ln[Yo] || Rn[Yo] || Zs[Yo] || 0;
  })
}, si = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Le.utils.toArray)(t)[0] || (typeof t == "string" && Le.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Oy = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Yn = function(t, e) {
  var i = e.s, n = e.sc;
  Xr(t) && (t = Ln.scrollingElement || Rn);
  var r = bt.indexOf(t), o = n === Ee.sc ? 1 : 2;
  !~r && (r = bt.push(t) - 1), bt[r + o] || je(t, "scroll", sc);
  var a = bt[r + o], l = a || (bt[r + o] = Pa(Nn(t, i), !0) || (Xr(t) ? n : Pa(function(u) {
    return arguments.length ? t[i] = u : t[i];
  })));
  return l.target = t, a || (l.smooth = Le.getProperty(t, "scrollBehavior") === "smooth"), l;
}, rc = function(t, e, i) {
  var n = t, r = t, o = Ur(), a = o, l = e || 50, u = Math.max(500, l * 3), h = function(m, p) {
    var y = Ur();
    p || y - o > l ? (r = n, n = m, a = o, o = y) : i ? n += m : n = r + (m - r) / (y - a) * (o - a);
  }, f = function() {
    r = n = i ? 0 : n, a = o = 0;
  }, d = function(m) {
    var p = a, y = r, v = Ur();
    return (m || m === 0) && m !== n && h(m), o === a || v - a > u ? 0 : (n + (i ? y : -y)) / ((i ? v : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: f,
    getVelocity: d
  };
}, vr = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, kh = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, lp = function() {
  qr = Le.core.globals().ScrollTrigger, qr && qr.core && Cy();
}, cp = function(t) {
  return Le = t || op(), !ha && Le && typeof document < "u" && document.body && (_i = window, Ln = document, Rn = Ln.documentElement, Zs = Ln.body, sp = [_i, Ln, Rn, Zs], Le.utils.clamp, rp = Le.core.context || function() {
  }, ts = "onpointerenter" in Zs ? "pointer" : "mouse", np = le.isTouch = _i.matchMedia && _i.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _i || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Bi = le.eventTypes = ("ontouchstart" in Rn ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rn ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return ap = 0;
  }, 500), lp(), ha = 1), ha;
};
ei.op = Ee;
bt.cache = 0;
var le = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    ha || cp(Le) || console.warn("Please gsap.registerPlugin(Observer)"), qr || lp();
    var n = i.tolerance, r = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, u = i.debounce, h = i.preventDefault, f = i.onStop, d = i.onStopDelay, c = i.ignore, m = i.wheelSpeed, p = i.event, y = i.onDragStart, v = i.onDragEnd, A = i.onDrag, C = i.onPress, S = i.onRelease, _ = i.onRight, P = i.onLeft, O = i.onUp, T = i.onDown, k = i.onChangeX, R = i.onChangeY, V = i.onChange, z = i.onToggleX, B = i.onToggleY, J = i.onHover, it = i.onHoverEnd, U = i.onMove, H = i.ignoreCheck, tt = i.isNormalizer, at = i.onGestureStart, b = i.onGestureEnd, j = i.onWheel, st = i.onEnable, X = i.onDisable, ot = i.onClick, Dt = i.scrollSpeed, yt = i.capture, Ct = i.allowClicks, ct = i.lockAxis, Rt = i.onLockAxis;
    this.target = a = si(a) || Rn, this.vars = i, c && (c = Le.utils.toArray(c)), n = n || 1e-9, r = r || 0, m = m || 1, Dt = Dt || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(_i.getComputedStyle(Zs).lineHeight) || 22);
    var ne, $t, qt, mt, gt, ut, Ae, I = this, Bt = 0, Ue = 0, Me = i.passive || !h && i.passive !== !1, zt = Yn(a, ei), Nt = Yn(a, Ee), ce = zt(), Xe = Nt(), Xt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Bi[0] === "pointerdown", se = Xr(a), Pt = a.ownerDocument || Ln, ue = [0, 0, 0], Ie = [0, 0, 0], ze = 0, Xi = function() {
      return ze = Ur();
    }, Ut = function(M, N) {
      return (I.event = M) && c && Oy(M.target, c) || N && Xt && M.pointerType !== "touch" || H && H(M, N);
    }, Ki = function() {
      I._vx.reset(), I._vy.reset(), $t.pause(), f && f(I);
    }, ni = function() {
      var M = I.deltaX = kh(ue), N = I.deltaY = kh(Ie), D = Math.abs(M) >= n, Y = Math.abs(N) >= n;
      V && (D || Y) && V(I, M, N, ue, Ie), D && (_ && I.deltaX > 0 && _(I), P && I.deltaX < 0 && P(I), k && k(I), z && I.deltaX < 0 != Bt < 0 && z(I), Bt = I.deltaX, ue[0] = ue[1] = ue[2] = 0), Y && (T && I.deltaY > 0 && T(I), O && I.deltaY < 0 && O(I), R && R(I), B && I.deltaY < 0 != Ue < 0 && B(I), Ue = I.deltaY, Ie[0] = Ie[1] = Ie[2] = 0), (mt || qt) && (U && U(I), qt && (y && qt === 1 && y(I), A && A(I), qt = 0), mt = !1), ut && !(ut = !1) && Rt && Rt(I), gt && (j(I), gt = !1), ne = 0;
    }, _e = function(M, N, D) {
      ue[D] += M, Ie[D] += N, I._vx.update(M), I._vy.update(N), u ? ne || (ne = requestAnimationFrame(ni)) : ni();
    }, De = function(M, N) {
      ct && !Ae && (I.axis = Ae = Math.abs(M) > Math.abs(N) ? "x" : "y", ut = !0), Ae !== "y" && (ue[2] += M, I._vx.update(M, !0)), Ae !== "x" && (Ie[2] += N, I._vy.update(N, !0)), u ? ne || (ne = requestAnimationFrame(ni)) : ni();
    }, Ti = function(M) {
      if (!Ut(M, 1)) {
        M = vr(M, h);
        var N = M.clientX, D = M.clientY, Y = N - I.x, F = D - I.y, W = I.isDragging;
        I.x = N, I.y = D, (W || (Y || F) && (Math.abs(I.startX - N) >= r || Math.abs(I.startY - D) >= r)) && (qt = W ? 2 : 1, W || (I.isDragging = !0), De(Y, F));
      }
    }, Fe = I.onPress = function(E) {
      Ut(E, 1) || E && E.button || (I.axis = Ae = null, $t.pause(), I.isPressed = !0, E = vr(E), Bt = Ue = 0, I.startX = I.x = E.clientX, I.startY = I.y = E.clientY, I._vx.reset(), I._vy.reset(), je(tt ? a : Pt, Bi[1], Ti, Me, !0), I.deltaX = I.deltaY = 0, C && C(I));
    }, lt = I.onRelease = function(E) {
      if (!Ut(E, 1)) {
        Ge(tt ? a : Pt, Bi[1], Ti, !0);
        var M = !isNaN(I.y - I.startY), N = I.isDragging, D = N && (Math.abs(I.x - I.startX) > 3 || Math.abs(I.y - I.startY) > 3), Y = vr(E);
        !D && M && (I._vx.reset(), I._vy.reset(), h && Ct && Le.delayedCall(0.08, function() {
          if (Ur() - ze > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (Pt.createEvent) {
              var F = Pt.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, _i, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(F);
            }
          }
        })), I.isDragging = I.isGesturing = I.isPressed = !1, f && N && !tt && $t.restart(!0), qt && ni(), v && N && v(I), S && S(I, D);
      }
    }, Ne = function(M) {
      return M.touches && M.touches.length > 1 && (I.isGesturing = !0) && at(M, I.isDragging);
    }, Ft = function() {
      return (I.isGesturing = !1) || b(I);
    }, Ce = function(M) {
      if (!Ut(M)) {
        var N = zt(), D = Nt();
        _e((N - ce) * Dt, (D - Xe) * Dt, 1), ce = N, Xe = D, f && $t.restart(!0);
      }
    }, ee = function(M) {
      if (!Ut(M)) {
        M = vr(M, h), j && (gt = !0);
        var N = (M.deltaMode === 1 ? l : M.deltaMode === 2 ? _i.innerHeight : 1) * m;
        _e(M.deltaX * N, M.deltaY * N, 0), f && !tt && $t.restart(!0);
      }
    }, Ei = function(M) {
      if (!Ut(M)) {
        var N = M.clientX, D = M.clientY, Y = N - I.x, F = D - I.y;
        I.x = N, I.y = D, mt = !0, f && $t.restart(!0), (Y || F) && De(Y, F);
      }
    }, Z = function(M) {
      I.event = M, J(I);
    }, w = function(M) {
      I.event = M, it(I);
    }, $ = function(M) {
      return Ut(M) || vr(M, h) && ot(I);
    };
    $t = I._dc = Le.delayedCall(d || 0.25, Ki).pause(), I.deltaX = I.deltaY = 0, I._vx = rc(0, 50, !0), I._vy = rc(0, 50, !0), I.scrollX = zt, I.scrollY = Nt, I.isDragging = I.isGesturing = I.isPressed = !1, rp(this), I.enable = function(E) {
      return I.isEnabled || (je(se ? Pt : a, "scroll", sc), o.indexOf("scroll") >= 0 && je(se ? Pt : a, "scroll", Ce, Me, yt), o.indexOf("wheel") >= 0 && je(a, "wheel", ee, Me, yt), (o.indexOf("touch") >= 0 && np || o.indexOf("pointer") >= 0) && (je(a, Bi[0], Fe, Me, yt), je(Pt, Bi[2], lt), je(Pt, Bi[3], lt), Ct && je(a, "click", Xi, !0, !0), ot && je(a, "click", $), at && je(Pt, "gesturestart", Ne), b && je(Pt, "gestureend", Ft), J && je(a, ts + "enter", Z), it && je(a, ts + "leave", w), U && je(a, ts + "move", Ei)), I.isEnabled = !0, I.isDragging = I.isGesturing = I.isPressed = mt = qt = !1, I._vx.reset(), I._vy.reset(), ce = zt(), Xe = Nt(), E && E.type && Fe(E), st && st(I)), I;
    }, I.disable = function() {
      I.isEnabled && (Bs.filter(function(E) {
        return E !== I && Xr(E.target);
      }).length || Ge(se ? Pt : a, "scroll", sc), I.isPressed && (I._vx.reset(), I._vy.reset(), Ge(tt ? a : Pt, Bi[1], Ti, !0)), Ge(se ? Pt : a, "scroll", Ce, yt), Ge(a, "wheel", ee, yt), Ge(a, Bi[0], Fe, yt), Ge(Pt, Bi[2], lt), Ge(Pt, Bi[3], lt), Ge(a, "click", Xi, !0), Ge(a, "click", $), Ge(Pt, "gesturestart", Ne), Ge(Pt, "gestureend", Ft), Ge(a, ts + "enter", Z), Ge(a, ts + "leave", w), Ge(a, ts + "move", Ei), I.isEnabled = I.isPressed = I.isDragging = !1, X && X(I));
    }, I.kill = I.revert = function() {
      I.disable();
      var E = Bs.indexOf(I);
      E >= 0 && Bs.splice(E, 1), _n === I && (_n = 0);
    }, Bs.push(I), tt && Xr(a) && (_n = I), I.enable(p);
  }, Ay(s, [{
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
le.version = "3.13.0";
le.create = function(s) {
  return new le(s);
};
le.register = cp;
le.getAll = function() {
  return Bs.slice();
};
le.getById = function(s) {
  return Bs.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
op() && Le.registerPlugin(le);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var He, up, vn, tn, $n, hp, Qs, Wo, fp = function() {
  return typeof window < "u";
}, dp = function() {
  return He || fp() && (He = window.gsap) && He.registerPlugin && He;
}, pp = function(t) {
  return typeof t == "string";
}, Mh = function(t) {
  return typeof t == "function";
}, mo = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return t === vn || t === tn || t === $n ? Math.max(tn[n], $n[n]) - (vn["inner" + i] || tn[r] || $n[r]) : t[n] - t["offset" + i];
}, go = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === vn && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = tn[i] != null ? tn : $n), function() {
    return t[i];
  };
}, Py = function(t, e, i, n) {
  if (Mh(t) && (t = t(e, i, n)), typeof t != "object")
    return pp(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
  var r = {}, o;
  for (o in t)
    r[o] = o !== "onAutoKill" && Mh(t[o]) ? t[o](e, i, n) : t[o];
  return r;
}, mp = function(t, e) {
  if (t = hp(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), n = !e || e === vn || e === $n, r = n ? {
    top: tn.clientTop - (vn.pageYOffset || tn.scrollTop || $n.scrollTop || 0),
    left: tn.clientLeft - (vn.pageXOffset || tn.scrollLeft || $n.scrollLeft || 0)
  } : e.getBoundingClientRect(), o = {
    x: i.left - r.left,
    y: i.top - r.top
  };
  return !n && e && (o.x += go(e, "x")(), o.y += go(e, "y")()), o;
}, Ih = function(t, e, i, n, r) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : pp(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? mo(e, i) - r : Math.min(mo(e, i), mp(t, e)[i] - r);
}, oc = function() {
  He = dp(), fp() && He && typeof document < "u" && document.body && (vn = window, $n = document.body, tn = document.documentElement, hp = He.utils.toArray, He.config({
    autoKillThreshold: 7
  }), Qs = He.config(), up = 1);
}, Po = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    He = t, oc();
  },
  init: function(t, e, i, n, r) {
    up || oc();
    var o = this, a = He.getProperty(t, "scrollSnapType");
    o.isWin = t === vn, o.target = t, o.tween = i, e = Py(e, n, t, r), o.vars = e, o.autoKill = !!("autoKill" in e ? e : Qs).autoKill, o.getX = go(t, "x"), o.getY = go(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), Wo || (Wo = He.core.globals().ScrollTrigger), He.getProperty(t, "scrollBehavior") === "smooth" && He.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, Ih(e.x, t, "x", o.x, e.offsetX || 0), n, r), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, Ih(e.y, t, "y", o.y, e.offsetY || 0), n, r), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, n = e.target, r = e.tween, o = e.autoKill, a = e.xPrev, l = e.yPrev, u = e.isWin, h = e.snap, f = e.snapInline, d, c, m, p, y; i; )
      i.r(t, i.d), i = i._next;
    d = u || !e.skipX ? e.getX() : a, c = u || !e.skipY ? e.getY() : l, m = c - l, p = d - a, y = Qs.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > y || p < -y) && d < mo(n, "x") && (e.skipX = 1), !e.skipY && (m > y || m < -y) && c < mo(n, "y") && (e.skipY = 1), e.skipX && e.skipY && (r.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(r, e.vars.onAutoKillParams || []))), u ? vn.scrollTo(e.skipX ? d : e.x, e.skipY ? c : e.y) : (e.skipY || (n.scrollTop = e.y), e.skipX || (n.scrollLeft = e.x)), h && (t === 1 || t === 0) && (c = n.scrollTop, d = n.scrollLeft, f ? n.style.scrollSnapType = f : n.style.removeProperty("scroll-snap-type"), n.scrollTop = c + 1, n.scrollLeft = d + 1, n.scrollTop = c, n.scrollLeft = d), e.xPrev = e.x, e.yPrev = e.y, Wo && Wo.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
Po.max = mo;
Po.getOffset = mp;
Po.buildGetter = go;
Po.config = function(s) {
  Qs || oc() || (Qs = He.config());
  for (var t in s)
    Qs[t] = s[t];
};
dp() && He.registerPlugin(Po);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var G, Rs, wt, Yt, mi, Lt, hu, ka, yo, Kr, Mr, qo, $e, Ua, ac, Qe, Dh, Lh, zs, gp, wl, yp, Ze, lc, _p, vp, An, cc, fu, Js, du, Ma, uc, bl, Uo = 1, Be = Date.now, xl = Be(), Li = 0, Ir = 0, Rh = function(t, e, i) {
  var n = di(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t;
}, zh = function(t, e) {
  return e && (!di(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, ky = function s() {
  return Ir && requestAnimationFrame(s);
}, Fh = function() {
  return Ua = 1;
}, Nh = function() {
  return Ua = 0;
}, ji = function(t) {
  return t;
}, Dr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, wp = function() {
  return typeof window < "u";
}, bp = function() {
  return G || wp() && (G = window.gsap) && G.registerPlugin && G;
}, ws = function(t) {
  return !!~hu.indexOf(t);
}, xp = function(t) {
  return (t === "Height" ? du : wt["inner" + t]) || mi["client" + t] || Lt["client" + t];
}, Sp = function(t) {
  return Nn(t, "getBoundingClientRect") || (ws(t) ? function() {
    return ga.width = wt.innerWidth, ga.height = du, ga;
  } : function() {
    return mn(t);
  });
}, My = function(t, e, i) {
  var n = i.d, r = i.d2, o = i.a;
  return (o = Nn(t, "getBoundingClientRect")) ? function() {
    return o()[n];
  } : function() {
    return (e ? xp(r) : t["client" + r]) || 0;
  };
}, Iy = function(t, e) {
  return !e || ~sn.indexOf(t) ? Sp(t) : function() {
    return ga;
  };
}, en = function(t, e) {
  var i = e.s, n = e.d2, r = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + n) && (o = Nn(t, i)) ? o() - Sp(t)()[r] : ws(t) ? (mi[i] || Lt[i]) - xp(n) : t[i] - t["offset" + n]);
}, Xo = function(t, e) {
  for (var i = 0; i < zs.length; i += 3)
    (!e || ~e.indexOf(zs[i + 1])) && t(zs[i], zs[i + 1], zs[i + 2]);
}, di = function(t) {
  return typeof t == "string";
}, Ye = function(t) {
  return typeof t == "function";
}, Lr = function(t) {
  return typeof t == "number";
}, es = function(t) {
  return typeof t == "object";
}, wr = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, Sl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, Ms = Math.abs, Tp = "left", Ep = "top", pu = "right", mu = "bottom", ds = "width", ps = "height", Gr = "Right", jr = "Left", Zr = "Top", Qr = "Bottom", pe = "padding", ki = "margin", ur = "Width", gu = "Height", xe = "px", Mi = function(t) {
  return wt.getComputedStyle(t);
}, Dy = function(t) {
  var e = Mi(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, $h = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, mn = function(t, e) {
  var i = e && Mi(t)[ac] !== "matrix(1, 0, 0, 1, 0, 0)" && G.to(t, {
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
  }).progress(1), n = t.getBoundingClientRect();
  return i && i.progress(0).kill(), n;
}, Ia = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, Ap = function(t) {
  var e = [], i = t.labels, n = t.duration(), r;
  for (r in i)
    e.push(i[r] / n);
  return e;
}, Ly = function(t) {
  return function(e) {
    return G.utils.snap(Ap(t), e);
  };
}, yu = function(t) {
  var e = G.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(n, r) {
    return n - r;
  });
  return i ? function(n, r, o) {
    o === void 0 && (o = 1e-3);
    var a;
    if (!r)
      return e(n);
    if (r > 0) {
      for (n -= o, a = 0; a < i.length; a++)
        if (i[a] >= n)
          return i[a];
      return i[a - 1];
    } else
      for (a = i.length, n += o; a--; )
        if (i[a] <= n)
          return i[a];
    return i[0];
  } : function(n, r, o) {
    o === void 0 && (o = 1e-3);
    var a = e(n);
    return !r || Math.abs(a - n) < o || a - n < 0 == r < 0 ? a : e(r < 0 ? n - t : n + t);
  };
}, Ry = function(t) {
  return function(e, i) {
    return yu(Ap(t))(e, i.direction);
  };
}, Ko = function(t, e, i, n) {
  return i.split(",").forEach(function(r) {
    return t(e, r, n);
  });
}, Pe = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: !n,
    capture: !!r
  });
}, Oe = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Go = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Bh = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, jo = {
  toggleActions: "play",
  anticipatePin: 0
}, Da = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, fa = function(t, e) {
  if (di(t)) {
    var i = t.indexOf("="), n = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (n *= e / 100), t = t.substr(0, i - 1)), t = n + (t in Da ? Da[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, Zo = function(t, e, i, n, r, o, a, l) {
  var u = r.startColor, h = r.endColor, f = r.fontSize, d = r.indent, c = r.fontWeight, m = Yt.createElement("div"), p = ws(i) || Nn(i, "pinType") === "fixed", y = t.indexOf("scroller") !== -1, v = p ? Lt : i, A = t.indexOf("start") !== -1, C = A ? u : h, S = "border-color:" + C + ";font-size:" + f + ";color:" + C + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return S += "position:" + ((y || l) && p ? "fixed;" : "absolute;"), (y || l || !p) && (S += (n === Ee ? pu : mu) + ":" + (o + parseFloat(d)) + "px;"), a && (S += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), m._isStart = A, m.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), m.style.cssText = S, m.innerText = e || e === 0 ? t + "-" + e : t, v.children[0] ? v.insertBefore(m, v.children[0]) : v.appendChild(m), m._offset = m["offset" + n.op.d2], da(m, 0, n, A), m;
}, da = function(t, e, i, n) {
  var r = {
    display: "block"
  }, o = i[n ? "os2" : "p2"], a = i[n ? "p2" : "os2"];
  t._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? "1px" : 0, r["border" + o + ur] = 1, r["border" + a + ur] = 0, r[i.p] = e + "px", G.set(t, r);
}, vt = [], hc = {}, _o, Vh = function() {
  return Be() - Li > 34 && (_o || (_o = requestAnimationFrame(wn)));
}, Is = function() {
  (!Ze || !Ze.isPressed || Ze.startX > Lt.clientWidth) && (bt.cache++, Ze ? _o || (_o = requestAnimationFrame(wn)) : wn(), Li || xs("scrollStart"), Li = Be());
}, Tl = function() {
  vp = wt.innerWidth, _p = wt.innerHeight;
}, Rr = function(t) {
  bt.cache++, (t === !0 || !$e && !yp && !Yt.fullscreenElement && !Yt.webkitFullscreenElement && (!lc || vp !== wt.innerWidth || Math.abs(wt.innerHeight - _p) > wt.innerHeight * 0.25)) && ka.restart(!0);
}, bs = {}, zy = [], Cp = function s() {
  return Oe(xt, "scrollEnd", s) || ss(!0);
}, xs = function(t) {
  return bs[t] && bs[t].map(function(e) {
    return e();
  }) || zy;
}, fi = [], Op = function(t) {
  for (var e = 0; e < fi.length; e += 5)
    (!t || fi[e + 4] && fi[e + 4].query === t) && (fi[e].style.cssText = fi[e + 1], fi[e].getBBox && fi[e].setAttribute("transform", fi[e + 2] || ""), fi[e + 3].uncache = 1);
}, _u = function(t, e) {
  var i;
  for (Qe = 0; Qe < vt.length; Qe++)
    i = vt[Qe], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  Ma = !0, e && Op(e), e || xs("revert");
}, Pp = function(t, e) {
  bt.cache++, (e || !Je) && bt.forEach(function(i) {
    return Ye(i) && i.cacheID++ && (i.rec = 0);
  }), di(t) && (wt.history.scrollRestoration = fu = t);
}, Je, ms = 0, Hh, Fy = function() {
  if (Hh !== ms) {
    var t = Hh = ms;
    requestAnimationFrame(function() {
      return t === ms && ss(!0);
    });
  }
}, kp = function() {
  Lt.appendChild(Js), du = !Ze && Js.offsetHeight || wt.innerHeight, Lt.removeChild(Js);
}, Yh = function(t) {
  return yo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, ss = function(t, e) {
  if (mi = Yt.documentElement, Lt = Yt.body, hu = [wt, Yt, mi, Lt], Li && !t && !Ma) {
    Pe(xt, "scrollEnd", Cp);
    return;
  }
  kp(), Je = xt.isRefreshing = !0, bt.forEach(function(n) {
    return Ye(n) && ++n.cacheID && (n.rec = n());
  });
  var i = xs("refreshInit");
  gp && xt.sort(), e || _u(), bt.forEach(function(n) {
    Ye(n) && (n.smooth && (n.target.style.scrollBehavior = "auto"), n(0));
  }), vt.slice(0).forEach(function(n) {
    return n.refresh();
  }), Ma = !1, vt.forEach(function(n) {
    if (n._subPinOffset && n.pin) {
      var r = n.vars.horizontal ? "offsetWidth" : "offsetHeight", o = n.pin[r];
      n.revert(!0, 1), n.adjustPinSpacing(n.pin[r] - o), n.refresh();
    }
  }), uc = 1, Yh(!0), vt.forEach(function(n) {
    var r = en(n.scroller, n._dir), o = n.vars.end === "max" || n._endClamp && n.end > r, a = n._startClamp && n.start >= r;
    (o || a) && n.setPositions(a ? r - 1 : n.start, o ? Math.max(a ? r : n.start + 1, r) : n.end, !0);
  }), Yh(!1), uc = 0, i.forEach(function(n) {
    return n && n.render && n.render(-1);
  }), bt.forEach(function(n) {
    Ye(n) && (n.smooth && requestAnimationFrame(function() {
      return n.target.style.scrollBehavior = "smooth";
    }), n.rec && n(n.rec));
  }), Pp(fu, 1), ka.pause(), ms++, Je = 2, wn(2), vt.forEach(function(n) {
    return Ye(n.vars.onRefresh) && n.vars.onRefresh(n);
  }), Je = xt.isRefreshing = !1, xs("refresh");
}, fc = 0, pa = 1, Jr, wn = function(t) {
  if (t === 2 || !Je && !Ma) {
    xt.isUpdating = !0, Jr && Jr.update(0);
    var e = vt.length, i = Be(), n = i - xl >= 50, r = e && vt[0].scroll();
    if (pa = fc > r ? -1 : 1, Je || (fc = r), n && (Li && !Ua && i - Li > 200 && (Li = 0, xs("scrollEnd")), Mr = xl, xl = i), pa < 0) {
      for (Qe = e; Qe-- > 0; )
        vt[Qe] && vt[Qe].update(0, n);
      pa = 1;
    } else
      for (Qe = 0; Qe < e; Qe++)
        vt[Qe] && vt[Qe].update(0, n);
    xt.isUpdating = !1;
  }
  _o = 0;
}, dc = [Tp, Ep, mu, pu, ki + Qr, ki + Gr, ki + Zr, ki + jr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], ma = dc.concat([ds, ps, "boxSizing", "max" + ur, "max" + gu, "position", ki, pe, pe + Zr, pe + Gr, pe + Qr, pe + jr]), Ny = function(t, e, i) {
  tr(i);
  var n = t._gsap;
  if (n.spacerIsNative)
    tr(n.spacerState);
  else if (t._gsap.swappedIn) {
    var r = e.parentNode;
    r && (r.insertBefore(t, e), r.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, El = function(t, e, i, n) {
  if (!t._gsap.swappedIn) {
    for (var r = dc.length, o = e.style, a = t.style, l; r--; )
      l = dc[r], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[mu] = a[pu] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[ds] = Ia(t, ei) + xe, o[ps] = Ia(t, Ee) + xe, o[pe] = a[ki] = a[Ep] = a[Tp] = "0", tr(n), a[ds] = a["max" + ur] = i[ds], a[ps] = a["max" + gu] = i[ps], a[pe] = i[pe], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, $y = /([A-Z])/g, tr = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, n = 0, r, o;
    for ((t.t._gsap || G.core.getCache(t.t)).uncache = 1; n < i; n += 2)
      o = t[n + 1], r = t[n], o ? e[r] = o : e[r] && e.removeProperty(r.replace($y, "-$1").toLowerCase());
  }
}, Qo = function(t) {
  for (var e = ma.length, i = t.style, n = [], r = 0; r < e; r++)
    n.push(ma[r], i[ma[r]]);
  return n.t = t, n;
}, By = function(t, e, i) {
  for (var n = [], r = t.length, o = i ? 8 : 0, a; o < r; o += 2)
    a = t[o], n.push(a, a in e ? e[a] : t[o + 1]);
  return n.t = t.t, n;
}, ga = {
  left: 0,
  top: 0
}, Wh = function(t, e, i, n, r, o, a, l, u, h, f, d, c, m) {
  Ye(t) && (t = t(l)), di(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? fa("0" + t.substr(3), i) : 0));
  var p = c ? c.time() : 0, y, v, A;
  if (c && c.seek(0), isNaN(t) || (t = +t), Lr(t))
    c && (t = G.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, t)), a && da(a, i, n, !0);
  else {
    Ye(e) && (e = e(l));
    var C = (t || "0").split(" "), S, _, P, O;
    A = si(e, l) || Lt, S = mn(A) || {}, (!S || !S.left && !S.top) && Mi(A).display === "none" && (O = A.style.display, A.style.display = "block", S = mn(A), O ? A.style.display = O : A.style.removeProperty("display")), _ = fa(C[0], S[n.d]), P = fa(C[1] || "0", i), t = S[n.p] - u[n.p] - h + _ + r - P, a && da(a, P, n, i - P < 20 || a._isStart && P > 20), i -= i - P;
  }
  if (m && (l[m] = t || -1e-3, t < 0 && (t = 0)), o) {
    var T = t + i, k = o._isStart;
    y = "scroll" + n.d2, da(o, T, n, k && T > 20 || !k && (f ? Math.max(Lt[y], mi[y]) : o.parentNode[y]) <= T + 1), f && (u = mn(a), f && (o.style[n.op.p] = u[n.op.p] - n.op.m - o._offset + xe));
  }
  return c && A && (y = mn(A), c.seek(d), v = mn(A), c._caScrollDist = y[n.p] - v[n.p], t = t / c._caScrollDist * d), c && c.seek(p), c ? t : Math.round(t);
}, Vy = /(webkit|moz|length|cssText|inset)/i, qh = function(t, e, i, n) {
  if (t.parentNode !== e) {
    var r = t.style, o, a;
    if (e === Lt) {
      t._stOrig = r.cssText, a = Mi(t);
      for (o in a)
        !+o && !Vy.test(o) && a[o] && typeof r[o] == "string" && o !== "0" && (r[o] = a[o]);
      r.top = i, r.left = n;
    } else
      r.cssText = t._stOrig;
    G.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, Mp = function(t, e, i) {
  var n = e, r = n;
  return function(o) {
    var a = Math.round(t());
    return a !== n && a !== r && Math.abs(a - n) > 3 && Math.abs(a - r) > 3 && (o = a, i && i()), r = n, n = Math.round(o), n;
  };
}, Jo = function(t, e, i) {
  var n = {};
  n[e.p] = "+=" + i, G.set(t, n);
}, Uh = function(t, e) {
  var i = Yn(t, e), n = "_scroll" + e.p2, r = function o(a, l, u, h, f) {
    var d = o.tween, c = l.onComplete, m = {};
    u = u || i();
    var p = Mp(i, u, function() {
      d.kill(), o.tween = 0;
    });
    return f = h && f || 0, h = h || a - u, d && d.kill(), l[n] = a, l.inherit = !1, l.modifiers = m, m[n] = function() {
      return p(u + h * d.ratio + f * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      bt.cache++, o.tween && wn();
    }, l.onComplete = function() {
      o.tween = 0, c && c.call(d);
    }, d = o.tween = G.to(t, l), d;
  };
  return t[n] = i, i.wheelHandler = function() {
    return r.tween && r.tween.kill() && (r.tween = 0);
  }, Pe(t, "wheel", i.wheelHandler), xt.isTouch && Pe(t, "touchmove", i.wheelHandler), r;
}, xt = /* @__PURE__ */ function() {
  function s(e, i) {
    Rs || s.register(G) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), cc(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, n) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Ir) {
      this.update = this.refresh = this.kill = ji;
      return;
    }
    i = $h(di(i) || Lr(i) || i.nodeType ? {
      trigger: i
    } : i, jo);
    var r = i, o = r.onUpdate, a = r.toggleClass, l = r.id, u = r.onToggle, h = r.onRefresh, f = r.scrub, d = r.trigger, c = r.pin, m = r.pinSpacing, p = r.invalidateOnRefresh, y = r.anticipatePin, v = r.onScrubComplete, A = r.onSnapComplete, C = r.once, S = r.snap, _ = r.pinReparent, P = r.pinSpacer, O = r.containerAnimation, T = r.fastScrollEnd, k = r.preventOverlaps, R = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? ei : Ee, V = !f && f !== 0, z = si(i.scroller || wt), B = G.core.getCache(z), J = ws(z), it = ("pinType" in i ? i.pinType : Nn(z, "pinType") || J && "fixed") === "fixed", U = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], H = V && i.toggleActions.split(" "), tt = "markers" in i ? i.markers : jo.markers, at = J ? 0 : parseFloat(Mi(z)["border" + R.p2 + ur]) || 0, b = this, j = i.onRefreshInit && function() {
      return i.onRefreshInit(b);
    }, st = My(z, J, R), X = Iy(z, J), ot = 0, Dt = 0, yt = 0, Ct = Yn(z, R), ct, Rt, ne, $t, qt, mt, gt, ut, Ae, I, Bt, Ue, Me, zt, Nt, ce, Xe, Xt, se, Pt, ue, Ie, ze, Xi, Ut, Ki, ni, _e, De, Ti, Fe, lt, Ne, Ft, Ce, ee, Ei, Z, w;
    if (b._startClamp = b._endClamp = !1, b._dir = R, y *= 45, b.scroller = z, b.scroll = O ? O.time.bind(O) : Ct, $t = Ct(), b.vars = i, n = n || i.animation, "refreshPriority" in i && (gp = 1, i.refreshPriority === -9999 && (Jr = b)), B.tweenScroll = B.tweenScroll || {
      top: Uh(z, Ee),
      left: Uh(z, ei)
    }, b.tweenTo = ct = B.tweenScroll[R.p], b.scrubDuration = function(D) {
      Ne = Lr(D) && D, Ne ? lt ? lt.duration(D) : lt = G.to(n, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Ne,
        paused: !0,
        onComplete: function() {
          return v && v(b);
        }
      }) : (lt && lt.progress(1).kill(), lt = 0);
    }, n && (n.vars.lazy = !1, n._initted && !b.isReverted || n.vars.immediateRender !== !1 && i.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), b.animation = n.pause(), n.scrollTrigger = b, b.scrubDuration(f), Ti = 0, l || (l = n.vars.id)), S && ((!es(S) || S.push) && (S = {
      snapTo: S
    }), "scrollBehavior" in Lt.style && G.set(J ? [Lt, mi] : z, {
      scrollBehavior: "auto"
    }), bt.forEach(function(D) {
      return Ye(D) && D.target === (J ? Yt.scrollingElement || mi : z) && (D.smooth = !1);
    }), ne = Ye(S.snapTo) ? S.snapTo : S.snapTo === "labels" ? Ly(n) : S.snapTo === "labelsDirectional" ? Ry(n) : S.directional !== !1 ? function(D, Y) {
      return yu(S.snapTo)(D, Be() - Dt < 500 ? 0 : Y.direction);
    } : G.utils.snap(S.snapTo), Ft = S.duration || {
      min: 0.1,
      max: 2
    }, Ft = es(Ft) ? Kr(Ft.min, Ft.max) : Kr(Ft, Ft), Ce = G.delayedCall(S.delay || Ne / 2 || 0.1, function() {
      var D = Ct(), Y = Be() - Dt < 500, F = ct.tween;
      if ((Y || Math.abs(b.getVelocity()) < 10) && !F && !Ua && ot !== D) {
        var W = (D - mt) / zt, et = n && !V ? n.totalProgress() : W, K = Y ? 0 : (et - Fe) / (Be() - Mr) * 1e3 || 0, dt = G.utils.clamp(-W, 1 - W, Ms(K / 2) * K / 0.185), St = W + (S.inertia === !1 ? 0 : dt), Ot, _t, pt = S, kt = pt.onStart, ht = pt.onInterrupt, ve = pt.onComplete;
        if (Ot = ne(St, b), Lr(Ot) || (Ot = St), _t = Math.max(0, Math.round(mt + Ot * zt)), D <= gt && D >= mt && _t !== D) {
          if (F && !F._initted && F.data <= Ms(_t - D))
            return;
          S.inertia === !1 && (dt = Ot - W), ct(_t, {
            duration: Ft(Ms(Math.max(Ms(St - et), Ms(Ot - et)) * 0.185 / K / 0.05 || 0)),
            ease: S.ease || "power3",
            data: Ms(_t - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ce.restart(!0) && ht && ht(b);
            },
            onComplete: function() {
              b.update(), ot = Ct(), n && !V && (lt ? lt.resetTo("totalProgress", Ot, n._tTime / n._tDur) : n.progress(Ot)), Ti = Fe = n && !V ? n.totalProgress() : b.progress, A && A(b), ve && ve(b);
            }
          }, D, dt * zt, _t - D - dt * zt), kt && kt(b, ct.tween);
        }
      } else b.isActive && ot !== D && Ce.restart(!0);
    }).pause()), l && (hc[l] = b), d = b.trigger = si(d || c !== !0 && c), w = d && d._gsap && d._gsap.stRevert, w && (w = w(b)), c = c === !0 ? d : si(c), di(a) && (a = {
      targets: d,
      className: a
    }), c && (m === !1 || m === ki || (m = !m && c.parentNode && c.parentNode.style && Mi(c.parentNode).display === "flex" ? !1 : pe), b.pin = c, Rt = G.core.getCache(c), Rt.spacer ? Nt = Rt.pinState : (P && (P = si(P), P && !P.nodeType && (P = P.current || P.nativeElement), Rt.spacerIsNative = !!P, P && (Rt.spacerState = Qo(P))), Rt.spacer = Xt = P || Yt.createElement("div"), Xt.classList.add("pin-spacer"), l && Xt.classList.add("pin-spacer-" + l), Rt.pinState = Nt = Qo(c)), i.force3D !== !1 && G.set(c, {
      force3D: !0
    }), b.spacer = Xt = Rt.spacer, De = Mi(c), Xi = De[m + R.os2], Pt = G.getProperty(c), ue = G.quickSetter(c, R.a, xe), El(c, Xt, De), Xe = Qo(c)), tt) {
      Ue = es(tt) ? $h(tt, Bh) : Bh, I = Zo("scroller-start", l, z, R, Ue, 0), Bt = Zo("scroller-end", l, z, R, Ue, 0, I), se = I["offset" + R.op.d2];
      var $ = si(Nn(z, "content") || z);
      ut = this.markerStart = Zo("start", l, $, R, Ue, se, 0, O), Ae = this.markerEnd = Zo("end", l, $, R, Ue, se, 0, O), O && (Z = G.quickSetter([ut, Ae], R.a, xe)), !it && !(sn.length && Nn(z, "fixedMarkers") === !0) && (Dy(J ? Lt : z), G.set([I, Bt], {
        force3D: !0
      }), Ki = G.quickSetter(I, R.a, xe), _e = G.quickSetter(Bt, R.a, xe));
    }
    if (O) {
      var E = O.vars.onUpdate, M = O.vars.onUpdateParams;
      O.eventCallback("onUpdate", function() {
        b.update(0, 0, 1), E && E.apply(O, M || []);
      });
    }
    if (b.previous = function() {
      return vt[vt.indexOf(b) - 1];
    }, b.next = function() {
      return vt[vt.indexOf(b) + 1];
    }, b.revert = function(D, Y) {
      if (!Y)
        return b.kill(!0);
      var F = D !== !1 || !b.enabled, W = $e;
      F !== b.isReverted && (F && (ee = Math.max(Ct(), b.scroll.rec || 0), yt = b.progress, Ei = n && n.progress()), ut && [ut, Ae, I, Bt].forEach(function(et) {
        return et.style.display = F ? "none" : "block";
      }), F && ($e = b, b.update(F)), c && (!_ || !b.isActive) && (F ? Ny(c, Xt, Nt) : El(c, Xt, Mi(c), Ut)), F || b.update(F), $e = W, b.isReverted = F);
    }, b.refresh = function(D, Y, F, W) {
      if (!(($e || !b.enabled) && !Y)) {
        if (c && D && Li) {
          Pe(s, "scrollEnd", Cp);
          return;
        }
        !Je && j && j(b), $e = b, ct.tween && !F && (ct.tween.kill(), ct.tween = 0), lt && lt.pause(), p && n && (n.revert({
          kill: !1
        }).invalidate(), n.getChildren && n.getChildren(!0, !0, !1).forEach(function(Fi) {
          return Fi.vars.immediateRender && Fi.render(0, !0, !0);
        })), b.isReverted || b.revert(!0, !0), b._subPinOffset = !1;
        var et = st(), K = X(), dt = O ? O.duration() : en(z, R), St = zt <= 0.01 || !zt, Ot = 0, _t = W || 0, pt = es(F) ? F.end : i.end, kt = i.endTrigger || d, ht = es(F) ? F.start : i.start || (i.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"), ve = b.pinnedContainer = i.pinnedContainer && si(i.pinnedContainer, b), Kt = d && Math.max(0, vt.indexOf(b)) || 0, we = Kt, be, he, an, ln, fe, re, Ke, Es, zo, Gn, Ai, cn, As;
        for (tt && es(F) && (cn = G.getProperty(I, R.p), As = G.getProperty(Bt, R.p)); we-- > 0; )
          re = vt[we], re.end || re.refresh(0, 1) || ($e = b), Ke = re.pin, Ke && (Ke === d || Ke === c || Ke === ve) && !re.isReverted && (Gn || (Gn = []), Gn.unshift(re), re.revert(!0, !0)), re !== vt[we] && (Kt--, we--);
        for (Ye(ht) && (ht = ht(b)), ht = Rh(ht, "start", b), mt = Wh(ht, d, et, R, Ct(), ut, I, b, K, at, it, dt, O, b._startClamp && "_startClamp") || (c ? -1e-3 : 0), Ye(pt) && (pt = pt(b)), di(pt) && !pt.indexOf("+=") && (~pt.indexOf(" ") ? pt = (di(ht) ? ht.split(" ")[0] : "") + pt : (Ot = fa(pt.substr(2), et), pt = di(ht) ? ht : (O ? G.utils.mapRange(0, O.duration(), O.scrollTrigger.start, O.scrollTrigger.end, mt) : mt) + Ot, kt = d)), pt = Rh(pt, "end", b), gt = Math.max(mt, Wh(pt || (kt ? "100% 0" : dt), kt, et, R, Ct() + Ot, Ae, Bt, b, K, at, it, dt, O, b._endClamp && "_endClamp")) || -1e-3, Ot = 0, we = Kt; we--; )
          re = vt[we], Ke = re.pin, Ke && re.start - re._pinPush <= mt && !O && re.end > 0 && (be = re.end - (b._startClamp ? Math.max(0, re.start) : re.start), (Ke === d && re.start - re._pinPush < mt || Ke === ve) && isNaN(ht) && (Ot += be * (1 - re.progress)), Ke === c && (_t += be));
        if (mt += Ot, gt += Ot, b._startClamp && (b._startClamp += Ot), b._endClamp && !Je && (b._endClamp = gt || -1e-3, gt = Math.min(gt, en(z, R))), zt = gt - mt || (mt -= 0.01) && 1e-3, St && (yt = G.utils.clamp(0, 1, G.utils.normalize(mt, gt, ee))), b._pinPush = _t, ut && Ot && (be = {}, be[R.a] = "+=" + Ot, ve && (be[R.p] = "-=" + Ct()), G.set([ut, Ae], be)), c && !(uc && b.end >= en(z, R)))
          be = Mi(c), ln = R === Ee, an = Ct(), Ie = parseFloat(Pt(R.a)) + _t, !dt && gt > 1 && (Ai = (J ? Yt.scrollingElement || mi : z).style, Ai = {
            style: Ai,
            value: Ai["overflow" + R.a.toUpperCase()]
          }, J && Mi(Lt)["overflow" + R.a.toUpperCase()] !== "scroll" && (Ai.style["overflow" + R.a.toUpperCase()] = "scroll")), El(c, Xt, be), Xe = Qo(c), he = mn(c, !0), Es = it && Yn(z, ln ? ei : Ee)(), m ? (Ut = [m + R.os2, zt + _t + xe], Ut.t = Xt, we = m === pe ? Ia(c, R) + zt + _t : 0, we && (Ut.push(R.d, we + xe), Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = we + xe)), tr(Ut), ve && vt.forEach(function(Fi) {
            Fi.pin === ve && Fi.vars.pinSpacing !== !1 && (Fi._subPinOffset = !0);
          }), it && Ct(ee)) : (we = Ia(c, R), we && Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = we + xe)), it && (fe = {
            top: he.top + (ln ? an - mt : Es) + xe,
            left: he.left + (ln ? Es : an - mt) + xe,
            boxSizing: "border-box",
            position: "fixed"
          }, fe[ds] = fe["max" + ur] = Math.ceil(he.width) + xe, fe[ps] = fe["max" + gu] = Math.ceil(he.height) + xe, fe[ki] = fe[ki + Zr] = fe[ki + Gr] = fe[ki + Qr] = fe[ki + jr] = "0", fe[pe] = be[pe], fe[pe + Zr] = be[pe + Zr], fe[pe + Gr] = be[pe + Gr], fe[pe + Qr] = be[pe + Qr], fe[pe + jr] = be[pe + jr], ce = By(Nt, fe, _), Je && Ct(0)), n ? (zo = n._initted, wl(1), n.render(n.duration(), !0, !0), ze = Pt(R.a) - Ie + zt + _t, ni = Math.abs(zt - ze) > 1, it && ni && ce.splice(ce.length - 2, 2), n.render(0, !0, !0), zo || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), wl(0)) : ze = zt, Ai && (Ai.value ? Ai.style["overflow" + R.a.toUpperCase()] = Ai.value : Ai.style.removeProperty("overflow-" + R.a));
        else if (d && Ct() && !O)
          for (he = d.parentNode; he && he !== Lt; )
            he._pinOffset && (mt -= he._pinOffset, gt -= he._pinOffset), he = he.parentNode;
        Gn && Gn.forEach(function(Fi) {
          return Fi.revert(!1, !0);
        }), b.start = mt, b.end = gt, $t = qt = Je ? ee : Ct(), !O && !Je && ($t < ee && Ct(ee), b.scroll.rec = 0), b.revert(!1, !0), Dt = Be(), Ce && (ot = -1, Ce.restart(!0)), $e = 0, n && V && (n._initted || Ei) && n.progress() !== Ei && n.progress(Ei || 0, !0).render(n.time(), !0, !0), (St || yt !== b.progress || O || p || n && !n._initted) && (n && !V && (n._initted || yt || n.vars.immediateRender !== !1) && n.totalProgress(O && mt < -1e-3 && !yt ? G.utils.normalize(mt, gt, 0) : yt, !0), b.progress = St || ($t - mt) / zt === yt ? 0 : yt), c && m && (Xt._pinOffset = Math.round(b.progress * ze)), lt && lt.invalidate(), isNaN(cn) || (cn -= G.getProperty(I, R.p), As -= G.getProperty(Bt, R.p), Jo(I, R, cn), Jo(ut, R, cn - (W || 0)), Jo(Bt, R, As), Jo(Ae, R, As - (W || 0))), St && !Je && b.update(), h && !Je && !Me && (Me = !0, h(b), Me = !1);
      }
    }, b.getVelocity = function() {
      return (Ct() - qt) / (Be() - Mr) * 1e3 || 0;
    }, b.endAnimation = function() {
      wr(b.callbackAnimation), n && (lt ? lt.progress(1) : n.paused() ? V || wr(n, b.direction < 0, 1) : wr(n, n.reversed()));
    }, b.labelToScroll = function(D) {
      return n && n.labels && (mt || b.refresh() || mt) + n.labels[D] / n.duration() * zt || 0;
    }, b.getTrailing = function(D) {
      var Y = vt.indexOf(b), F = b.direction > 0 ? vt.slice(0, Y).reverse() : vt.slice(Y + 1);
      return (di(D) ? F.filter(function(W) {
        return W.vars.preventOverlaps === D;
      }) : F).filter(function(W) {
        return b.direction > 0 ? W.end <= mt : W.start >= gt;
      });
    }, b.update = function(D, Y, F) {
      if (!(O && !F && !D)) {
        var W = Je === !0 ? ee : b.scroll(), et = D ? 0 : (W - mt) / zt, K = et < 0 ? 0 : et > 1 ? 1 : et || 0, dt = b.progress, St, Ot, _t, pt, kt, ht, ve, Kt;
        if (Y && (qt = $t, $t = O ? Ct() : W, S && (Fe = Ti, Ti = n && !V ? n.totalProgress() : K)), y && c && !$e && !Uo && Li && (!K && mt < W + (W - qt) / (Be() - Mr) * y ? K = 1e-4 : K === 1 && gt > W + (W - qt) / (Be() - Mr) * y && (K = 0.9999)), K !== dt && b.enabled) {
          if (St = b.isActive = !!K && K < 1, Ot = !!dt && dt < 1, ht = St !== Ot, kt = ht || !!K != !!dt, b.direction = K > dt ? 1 : -1, b.progress = K, kt && !$e && (_t = K && !dt ? 0 : K === 1 ? 1 : dt === 1 ? 2 : 3, V && (pt = !ht && H[_t + 1] !== "none" && H[_t + 1] || H[_t], Kt = n && (pt === "complete" || pt === "reset" || pt in n))), k && (ht || Kt) && (Kt || f || !n) && (Ye(k) ? k(b) : b.getTrailing(k).forEach(function(an) {
            return an.endAnimation();
          })), V || (lt && !$e && !Uo ? (lt._dp._time - lt._start !== lt._time && lt.render(lt._dp._time - lt._start), lt.resetTo ? lt.resetTo("totalProgress", K, n._tTime / n._tDur) : (lt.vars.totalProgress = K, lt.invalidate().restart())) : n && n.totalProgress(K, !!($e && (Dt || D)))), c) {
            if (D && m && (Xt.style[m + R.os2] = Xi), !it)
              ue(Dr(Ie + ze * K));
            else if (kt) {
              if (ve = !D && K > dt && gt + 1 > W && W + 1 >= en(z, R), _)
                if (!D && (St || ve)) {
                  var we = mn(c, !0), be = W - mt;
                  qh(c, Lt, we.top + (R === Ee ? be : 0) + xe, we.left + (R === Ee ? 0 : be) + xe);
                } else
                  qh(c, Xt);
              tr(St || ve ? ce : Xe), ni && K < 1 && St || ue(Ie + (K === 1 && !ve ? ze : 0));
            }
          }
          S && !ct.tween && !$e && !Uo && Ce.restart(!0), a && (ht || C && K && (K < 1 || !bl)) && yo(a.targets).forEach(function(an) {
            return an.classList[St || C ? "add" : "remove"](a.className);
          }), o && !V && !D && o(b), kt && !$e ? (V && (Kt && (pt === "complete" ? n.pause().totalProgress(1) : pt === "reset" ? n.restart(!0).pause() : pt === "restart" ? n.restart(!0) : n[pt]()), o && o(b)), (ht || !bl) && (u && ht && Sl(b, u), U[_t] && Sl(b, U[_t]), C && (K === 1 ? b.kill(!1, 1) : U[_t] = 0), ht || (_t = K === 1 ? 1 : 3, U[_t] && Sl(b, U[_t]))), T && !St && Math.abs(b.getVelocity()) > (Lr(T) ? T : 2500) && (wr(b.callbackAnimation), lt ? lt.progress(1) : wr(n, pt === "reverse" ? 1 : !K, 1))) : V && o && !$e && o(b);
        }
        if (_e) {
          var he = O ? W / O.duration() * (O._caScrollDist || 0) : W;
          Ki(he + (I._isFlipped ? 1 : 0)), _e(he);
        }
        Z && Z(-W / O.duration() * (O._caScrollDist || 0));
      }
    }, b.enable = function(D, Y) {
      b.enabled || (b.enabled = !0, Pe(z, "resize", Rr), J || Pe(z, "scroll", Is), j && Pe(s, "refreshInit", j), D !== !1 && (b.progress = yt = 0, $t = qt = ot = Ct()), Y !== !1 && b.refresh());
    }, b.getTween = function(D) {
      return D && ct ? ct.tween : lt;
    }, b.setPositions = function(D, Y, F, W) {
      if (O) {
        var et = O.scrollTrigger, K = O.duration(), dt = et.end - et.start;
        D = et.start + dt * D / K, Y = et.start + dt * Y / K;
      }
      b.refresh(!1, !1, {
        start: zh(D, F && !!b._startClamp),
        end: zh(Y, F && !!b._endClamp)
      }, W), b.update();
    }, b.adjustPinSpacing = function(D) {
      if (Ut && D) {
        var Y = Ut.indexOf(R.d) + 1;
        Ut[Y] = parseFloat(Ut[Y]) + D + xe, Ut[1] = parseFloat(Ut[1]) + D + xe, tr(Ut);
      }
    }, b.disable = function(D, Y) {
      if (b.enabled && (D !== !1 && b.revert(!0, !0), b.enabled = b.isActive = !1, Y || lt && lt.pause(), ee = 0, Rt && (Rt.uncache = 1), j && Oe(s, "refreshInit", j), Ce && (Ce.pause(), ct.tween && ct.tween.kill() && (ct.tween = 0)), !J)) {
        for (var F = vt.length; F--; )
          if (vt[F].scroller === z && vt[F] !== b)
            return;
        Oe(z, "resize", Rr), J || Oe(z, "scroll", Is);
      }
    }, b.kill = function(D, Y) {
      b.disable(D, Y), lt && !Y && lt.kill(), l && delete hc[l];
      var F = vt.indexOf(b);
      F >= 0 && vt.splice(F, 1), F === Qe && pa > 0 && Qe--, F = 0, vt.forEach(function(W) {
        return W.scroller === b.scroller && (F = 1);
      }), F || Je || (b.scroll.rec = 0), n && (n.scrollTrigger = null, D && n.revert({
        kill: !1
      }), Y || n.kill()), ut && [ut, Ae, I, Bt].forEach(function(W) {
        return W.parentNode && W.parentNode.removeChild(W);
      }), Jr === b && (Jr = 0), c && (Rt && (Rt.uncache = 1), F = 0, vt.forEach(function(W) {
        return W.pin === c && F++;
      }), F || (Rt.spacer = 0)), i.onKill && i.onKill(b);
    }, vt.push(b), b.enable(!1, !1), w && w(b), n && n.add && !zt) {
      var N = b.update;
      b.update = function() {
        b.update = N, bt.cache++, mt || gt || b.refresh();
      }, G.delayedCall(0.01, b.update), zt = 0.01, mt = gt = 0;
    } else
      b.refresh();
    c && Fy();
  }, s.register = function(i) {
    return Rs || (G = i || bp(), wp() && window.document && s.enable(), Rs = Ir), Rs;
  }, s.defaults = function(i) {
    if (i)
      for (var n in i)
        jo[n] = i[n];
    return jo;
  }, s.disable = function(i, n) {
    Ir = 0, vt.forEach(function(o) {
      return o[n ? "kill" : "disable"](i);
    }), Oe(wt, "wheel", Is), Oe(Yt, "scroll", Is), clearInterval(qo), Oe(Yt, "touchcancel", ji), Oe(Lt, "touchstart", ji), Ko(Oe, Yt, "pointerdown,touchstart,mousedown", Fh), Ko(Oe, Yt, "pointerup,touchend,mouseup", Nh), ka.kill(), Xo(Oe);
    for (var r = 0; r < bt.length; r += 3)
      Go(Oe, bt[r], bt[r + 1]), Go(Oe, bt[r], bt[r + 2]);
  }, s.enable = function() {
    if (wt = window, Yt = document, mi = Yt.documentElement, Lt = Yt.body, G && (yo = G.utils.toArray, Kr = G.utils.clamp, cc = G.core.context || ji, wl = G.core.suppressOverwrites || ji, fu = wt.history.scrollRestoration || "auto", fc = wt.pageYOffset || 0, G.core.globals("ScrollTrigger", s), Lt)) {
      Ir = 1, Js = document.createElement("div"), Js.style.height = "100vh", Js.style.position = "absolute", kp(), ky(), le.register(G), s.isTouch = le.isTouch, An = le.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), lc = le.isTouch === 1, Pe(wt, "wheel", Is), hu = [wt, Yt, mi, Lt], G.matchMedia ? (s.matchMedia = function(u) {
        var h = G.matchMedia(), f;
        for (f in u)
          h.add(f, u[f]);
        return h;
      }, G.addEventListener("matchMediaInit", function() {
        return _u();
      }), G.addEventListener("matchMediaRevert", function() {
        return Op();
      }), G.addEventListener("matchMedia", function() {
        ss(0, 1), xs("matchMedia");
      }), G.matchMedia().add("(orientation: portrait)", function() {
        return Tl(), Tl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Tl(), Pe(Yt, "scroll", Is);
      var i = Lt.hasAttribute("style"), n = Lt.style, r = n.borderTopStyle, o = G.core.Animation.prototype, a, l;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = mn(Lt), Ee.m = Math.round(a.top + Ee.sc()) || 0, ei.m = Math.round(a.left + ei.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), i || (Lt.setAttribute("style", ""), Lt.removeAttribute("style")), qo = setInterval(Vh, 250), G.delayedCall(0.5, function() {
        return Uo = 0;
      }), Pe(Yt, "touchcancel", ji), Pe(Lt, "touchstart", ji), Ko(Pe, Yt, "pointerdown,touchstart,mousedown", Fh), Ko(Pe, Yt, "pointerup,touchend,mouseup", Nh), ac = G.utils.checkPrefix("transform"), ma.push(ac), Rs = Be(), ka = G.delayedCall(0.2, ss).pause(), zs = [Yt, "visibilitychange", function() {
        var u = wt.innerWidth, h = wt.innerHeight;
        Yt.hidden ? (Dh = u, Lh = h) : (Dh !== u || Lh !== h) && Rr();
      }, Yt, "DOMContentLoaded", ss, wt, "load", ss, wt, "resize", Rr], Xo(Pe), vt.forEach(function(u) {
        return u.enable(0, 1);
      }), l = 0; l < bt.length; l += 3)
        Go(Oe, bt[l], bt[l + 1]), Go(Oe, bt[l], bt[l + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (bl = !!i.limitCallbacks);
    var n = i.syncInterval;
    n && clearInterval(qo) || (qo = n) && setInterval(Vh, n), "ignoreMobileResize" in i && (lc = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Xo(Oe) || Xo(Pe, i.autoRefreshEvents || "none"), yp = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, n) {
    var r = si(i), o = bt.indexOf(r), a = ws(r);
    ~o && bt.splice(o, a ? 6 : 2), n && (a ? sn.unshift(wt, n, Lt, n, mi, n) : sn.unshift(r, n));
  }, s.clearMatchMedia = function(i) {
    vt.forEach(function(n) {
      return n._ctx && n._ctx.query === i && n._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, n, r) {
    var o = (di(i) ? si(i) : i).getBoundingClientRect(), a = o[r ? ds : ps] * n || 0;
    return r ? o.right - a > 0 && o.left + a < wt.innerWidth : o.bottom - a > 0 && o.top + a < wt.innerHeight;
  }, s.positionInViewport = function(i, n, r) {
    di(i) && (i = si(i));
    var o = i.getBoundingClientRect(), a = o[r ? ds : ps], l = n == null ? a / 2 : n in Da ? Da[n] * a : ~n.indexOf("%") ? parseFloat(n) * a / 100 : parseFloat(n) || 0;
    return r ? (o.left + l) / wt.innerWidth : (o.top + l) / wt.innerHeight;
  }, s.killAll = function(i) {
    if (vt.slice(0).forEach(function(r) {
      return r.vars.id !== "ScrollSmoother" && r.kill();
    }), i !== !0) {
      var n = bs.killAll || [];
      bs = {}, n.forEach(function(r) {
        return r();
      });
    }
  }, s;
}();
xt.version = "3.13.0";
xt.saveStyles = function(s) {
  return s ? yo(s).forEach(function(t) {
    if (t && t.style) {
      var e = fi.indexOf(t);
      e >= 0 && fi.splice(e, 5), fi.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), G.core.getCache(t), cc());
    }
  }) : fi;
};
xt.revert = function(s, t) {
  return _u(!s, t);
};
xt.create = function(s, t) {
  return new xt(s, t);
};
xt.refresh = function(s) {
  return s ? Rr(!0) : (Rs || xt.register()) && ss(!0);
};
xt.update = function(s) {
  return ++bt.cache && wn(s === !0 ? 2 : 0);
};
xt.clearScrollMemory = Pp;
xt.maxScroll = function(s, t) {
  return en(s, t ? ei : Ee);
};
xt.getScrollFunc = function(s, t) {
  return Yn(si(s), t ? ei : Ee);
};
xt.getById = function(s) {
  return hc[s];
};
xt.getAll = function() {
  return vt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
xt.isScrolling = function() {
  return !!Li;
};
xt.snapDirectional = yu;
xt.addEventListener = function(s, t) {
  var e = bs[s] || (bs[s] = []);
  ~e.indexOf(t) || e.push(t);
};
xt.removeEventListener = function(s, t) {
  var e = bs[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
xt.batch = function(s, t) {
  var e = [], i = {}, n = t.interval || 0.016, r = t.batchMax || 1e9, o = function(u, h) {
    var f = [], d = [], c = G.delayedCall(n, function() {
      h(f, d), f = [], d = [];
    }).pause();
    return function(m) {
      f.length || c.restart(!0), f.push(m.trigger), d.push(m), r <= f.length && c.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Ye(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return Ye(r) && (r = r(), Pe(xt, "refresh", function() {
    return r = t.batchMax();
  })), yo(s).forEach(function(l) {
    var u = {};
    for (a in i)
      u[a] = i[a];
    u.trigger = l, e.push(xt.create(u));
  }), e;
};
var Xh = function(t, e, i, n) {
  return e > n ? t(n) : e < 0 && t(0), i > n ? (n - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Al = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (le.isTouch ? " pinch-zoom" : "") : "none", t === mi && s(Lt, e);
}, ta = {
  auto: 1,
  scroll: 1
}, Hy = function(t) {
  var e = t.event, i = t.target, n = t.axis, r = (e.changedTouches ? e.changedTouches[0] : e).target, o = r._gsap || G.core.getCache(r), a = Be(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; r && r !== Lt && (r.scrollHeight <= r.clientHeight && r.scrollWidth <= r.clientWidth || !(ta[(l = Mi(r)).overflowY] || ta[l.overflowX])); )
      r = r.parentNode;
    o._isScroll = r && r !== i && !ws(r) && (ta[(l = Mi(r)).overflowY] || ta[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || n === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Ip = function(t, e, i, n) {
  return le.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: n = n && Hy,
    onPress: n,
    onDrag: n,
    onScroll: n,
    onEnable: function() {
      return i && Pe(Yt, le.eventTypes[0], Gh, !1, !0);
    },
    onDisable: function() {
      return Oe(Yt, le.eventTypes[0], Gh, !0);
    }
  });
}, Yy = /(input|label|select|textarea)/i, Kh, Gh = function(t) {
  var e = Yy.test(t.target.tagName);
  (e || Kh) && (t._gsapAllow = !0, Kh = e);
}, Wy = function(t) {
  es(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, n = e.momentum, r = e.allowNestedScroll, o = e.onRelease, a, l, u = si(t.target) || mi, h = G.core.globals().ScrollSmoother, f = h && h.get(), d = An && (t.content && si(t.content) || f && t.content !== !1 && !f.smooth() && f.content()), c = Yn(u, Ee), m = Yn(u, ei), p = 1, y = (le.isTouch && wt.visualViewport ? wt.visualViewport.scale * wt.visualViewport.width : wt.outerWidth) / wt.innerWidth, v = 0, A = Ye(n) ? function() {
    return n(a);
  } : function() {
    return n || 2.8;
  }, C, S, _ = Ip(u, t.type, !0, r), P = function() {
    return S = !1;
  }, O = ji, T = ji, k = function() {
    l = en(u, Ee), T = Kr(An ? 1 : 0, l), i && (O = Kr(0, en(u, ei))), C = ms;
  }, R = function() {
    d._gsap.y = Dr(parseFloat(d._gsap.y) + c.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, V = function() {
    if (S) {
      requestAnimationFrame(P);
      var tt = Dr(a.deltaY / 2), at = T(c.v - tt);
      if (d && at !== c.v + c.offset) {
        c.offset = at - c.v;
        var b = Dr((parseFloat(d && d._gsap.y) || 0) - c.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + b + ", 0, 1)", d._gsap.y = b + "px", c.cacheID = bt.cache, wn();
      }
      return !0;
    }
    c.offset && R(), S = !0;
  }, z, B, J, it, U = function() {
    k(), z.isActive() && z.vars.scrollY > l && (c() > l ? z.progress(1) && c(l) : z.resetTo("scrollY", l));
  };
  return d && G.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return An && H.type === "touchmove" && V() || p > 1.05 && H.type !== "touchstart" || a.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    S = !1;
    var H = p;
    p = Dr((wt.visualViewport && wt.visualViewport.scale || 1) / y), z.pause(), H !== p && Al(u, p > 1.01 ? !0 : i ? !1 : "x"), B = m(), J = c(), k(), C = ms;
  }, t.onRelease = t.onGestureStart = function(H, tt) {
    if (c.offset && R(), !tt)
      it.restart(!0);
    else {
      bt.cache++;
      var at = A(), b, j;
      i && (b = m(), j = b + at * 0.05 * -H.velocityX / 0.227, at *= Xh(m, b, j, en(u, ei)), z.vars.scrollX = O(j)), b = c(), j = b + at * 0.05 * -H.velocityY / 0.227, at *= Xh(c, b, j, en(u, Ee)), z.vars.scrollY = T(j), z.invalidate().duration(at).play(0.01), (An && z.vars.scrollY >= l || b >= l - 1) && G.to({}, {
        onUpdate: U,
        duration: at
      });
    }
    o && o(H);
  }, t.onWheel = function() {
    z._ts && z.pause(), Be() - v > 1e3 && (C = 0, v = Be());
  }, t.onChange = function(H, tt, at, b, j) {
    if (ms !== C && k(), tt && i && m(O(b[2] === tt ? B + (H.startX - H.x) : m() + tt - b[1])), at) {
      c.offset && R();
      var st = j[2] === at, X = st ? J + H.startY - H.y : c() + at - j[1], ot = T(X);
      st && X !== ot && (J += ot - X), c(ot);
    }
    (at || tt) && wn();
  }, t.onEnable = function() {
    Al(u, i ? !1 : "x"), xt.addEventListener("refresh", U), Pe(wt, "resize", U), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = m.smooth = !1), _.enable();
  }, t.onDisable = function() {
    Al(u, !0), Oe(wt, "resize", U), xt.removeEventListener("refresh", U), _.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new le(t), a.iOS = An, An && !c() && c(1), An && G.ticker.add(ji), it = a._dc, z = G.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Mp(c, c(), function() {
        return z.pause();
      })
    },
    onUpdate: wn,
    onComplete: it.vars.onComplete
  }), a;
};
xt.sort = function(s) {
  if (Ye(s))
    return vt.sort(s);
  var t = wt.pageYOffset || 0;
  return xt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + wt.innerHeight;
  }), vt.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
xt.observe = function(s) {
  return new le(s);
};
xt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return Ze;
  if (s === !0 && Ze)
    return Ze.enable();
  if (s === !1) {
    Ze && Ze.kill(), Ze = s;
    return;
  }
  var t = s instanceof le ? s : Wy(s);
  return Ze && Ze.target === t.target && Ze.kill(), ws(t.target) && (Ze = t), t;
};
xt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: rc,
  _inputObserver: Ip,
  _scrollers: bt,
  _proxies: sn,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Li || xs("scrollStart"), Li = Be();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return $e;
    }
  }
};
bp() && G.registerPlugin(xt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Zi, pc, to, Dp, Fs, Vs, mc, Lp, Rp = function() {
  return Zi || typeof window < "u" && (Zi = window.gsap);
}, gc = {}, qy = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, yc = function(t) {
  return Lp(t).id;
}, zr = function(t) {
  return gc[yc(typeof t == "string" ? to(t)[0] : t)];
}, jh = function(t) {
  var e = Fs, i;
  if (t - mc >= 0.05)
    for (mc = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, Uy = {
  deg: 360,
  rad: Math.PI * 2
}, Cl = function() {
  Zi = Rp(), Zi && (to = Zi.utils.toArray, Dp = Zi.utils.getUnit, Lp = Zi.core.getCache, Vs = Zi.ticker, pc = 1);
}, Xy = function(t, e, i, n) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = Uy[i || Dp(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = Vs.time, n && (this._next = n, n._prev = this);
}, ko = /* @__PURE__ */ function() {
  function s(e, i) {
    pc || Cl(), this.target = to(e)[0], gc[yc(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    Zi = i, Cl();
  };
  var t = s.prototype;
  return t.get = function(i, n) {
    var r = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, l;
    return o = parseFloat(n ? r.v1 : r.g(r.t, r.p)), a = o - parseFloat(r.v2), l = r.rCap, l && (a = a % l, a !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), qy(a / ((n ? r.t1 : Vs.time) - r.t2));
  }, t.getAll = function() {
    var i = {}, n = this._props, r;
    for (r in n)
      i[r] = this.get(r);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, n) {
    i in this._props || (Fs || (Vs.add(jh), mc = Vs.time), Fs = this._props[i] = new Xy(this.target, i, n, Fs));
  }, t.remove = function(i) {
    var n = this._props[i], r, o;
    n && (r = n._prev, o = n._next, r && (r._next = o), o ? o._prev = r : Fs === n && (Vs.remove(jh), Fs = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var n in this._props)
      this.remove(n);
    i || delete gc[yc(this.target)];
  }, s.track = function(i, n, r) {
    pc || Cl();
    for (var o = [], a = to(i), l = n.split(","), u = (r || "").split(","), h = a.length, f, d; h--; ) {
      for (f = zr(a[h]) || new s(a[h]), d = l.length; d--; )
        f.add(l[d], u[d] || u[0]);
      o.push(f);
    }
    return o;
  }, s.untrack = function(i, n) {
    var r = (n || "").split(",");
    to(i).forEach(function(o) {
      var a = zr(o);
      a && (r.length ? r.forEach(function(l) {
        return a.remove(l);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, n) {
    var r = zr(i);
    return r && r.isTracking(n);
  }, s.getVelocity = function(i, n) {
    var r = zr(i);
    return !r || !r.isTracking(n) ? console.warn("Not tracking velocity of " + n) : r.get(n);
  }, s;
}();
ko.getByTarget = zr;
Rp() && Zi.registerPlugin(ko);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Te, zp, Zh, Fp, _c, eo, Np, $p, Bp, vu, Vp, io, vc, Hp, La = ko.getByTarget, Yp = function() {
  return Te || typeof window < "u" && (Te = window.gsap) && Te.registerPlugin && Te;
}, Ky = function(t) {
  return typeof t == "string";
}, vo = function(t) {
  return typeof t == "number";
}, Bn = function(t) {
  return typeof t == "object";
}, wc = function(t) {
  return typeof t == "function";
}, Gy = 1, Wp = Array.isArray, jy = function(t) {
  return t;
}, er = 1e10, Qh = 1 / er, qp = 0.05, Zy = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, Qy = function(t, e, i) {
  for (var n in e)
    !(n in t) && n !== i && (t[n] = e[n]);
  return t;
}, Jy = function s(t) {
  var e = {}, i, n;
  for (i in t)
    e[i] = Bn(n = t[i]) && !Wp(n) ? s(n) : n;
  return e;
}, Jh = function(t, e, i, n, r) {
  var o = e.length, a = 0, l = er, u, h, f, d;
  if (Bn(t)) {
    for (; o--; ) {
      u = e[o], h = 0;
      for (f in t)
        d = u[f] - t[f], h += d * d;
      h < l && (a = o, l = h);
    }
    if ((r || er) < er && r < Math.sqrt(l))
      return t;
  } else
    for (; o--; )
      u = e[o], h = u - t, h < 0 && (h = -h), h < l && u >= n && u <= i && (a = o, l = h);
  return e[a];
}, Up = function(t, e, i, n, r, o, a) {
  if (t.end === "auto")
    return t;
  var l = t.end, u, h;
  if (i = isNaN(i) ? er : i, n = isNaN(n) ? -1e10 : n, Bn(e)) {
    if (u = e.calculated ? e : (wc(l) ? l(e, a) : Jh(e, l, i, n, o)) || e, !e.calculated) {
      for (h in u)
        e[h] = u[h];
      e.calculated = !0;
    }
    u = u[r];
  } else
    u = wc(l) ? l(e, a) : Wp(l) ? Jh(e, l, i, n, o) : parseFloat(l);
  return u > i ? u = i : u < n && (u = n), {
    max: u,
    min: u,
    unitFactor: t.unitFactor
  };
}, Ra = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, wu = function(t, e) {
  return e * qp * t / vu;
}, tf = function(t, e, i) {
  return Math.abs((e - t) * vu / i / qp);
}, Xp = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Kp = function(t, e, i, n) {
  if (e.linkedProps) {
    var r = e.linkedProps.split(","), o = {}, a, l, u, h, f, d;
    for (a = 0; a < r.length; a++)
      l = r[a], u = e[l], u && (vo(u.velocity) ? h = u.velocity : (f = f || La(t), h = f && f.isTracking(l) ? f.get(l) : 0), d = Math.abs(h / Ra(u, "resistance", n)), o[l] = parseFloat(i(t, l)) + wu(h, d));
    return o;
  }
}, t_ = function(t, e, i, n, r, o) {
  if (i === void 0 && (i = 10), n === void 0 && (n = 0.2), r === void 0 && (r = 1), Ky(t) && (t = Fp(t)[0]), !t)
    return 0;
  var a = 0, l = er, u = e.inertia || e, h = Bp(t).get, f = Ra(u, "resistance", eo.resistance), d, c, m, p, y, v, A, C, S, _;
  _ = Kp(t, u, h, f);
  for (d in u)
    Xp[d] || (c = u[d], Bn(c) || (C = C || La(t), C && C.isTracking(d) ? c = vo(c) ? {
      velocity: c
    } : {
      velocity: C.get(d)
    } : (p = +c || 0, m = Math.abs(p / f))), Bn(c) && (vo(c.velocity) ? p = c.velocity : (C = C || La(t), p = C && C.isTracking(d) ? C.get(d) : 0), m = Vp(n, i, Math.abs(p / Ra(c, "resistance", f))), y = parseFloat(h(t, d)) || 0, v = y + wu(p, m), "end" in c && (c = Up(c, _ && d in _ ? _ : v, c.max, c.min, d, u.radius, p), io === e && (io = u = Jy(e)), u[d] = Qy(c, u[d], "end")), "max" in c && v > +c.max + Qh ? (S = c.unitFactor || eo.unitFactors[d] || 1, A = y > c.max && c.min !== c.max || p * S > -15 && p * S < 45 ? n + (i - n) * 0.1 : tf(y, c.max, p), A + r < l && (l = A + r)) : "min" in c && v < +c.min - Qh && (S = c.unitFactor || eo.unitFactors[d] || 1, A = y < c.min && c.min !== c.max || p * S > -45 && p * S < 15 ? n + (i - n) * 0.1 : tf(y, c.min, p), A + r < l && (l = A + r)), A > a && (a = A)), m > a && (a = m));
  return a > l && (a = l), a > i ? i : a < n ? n : a;
}, ef = function() {
  Te = Yp(), Te && (Zh = Te.parseEase, Fp = Te.utils.toArray, Np = Te.utils.getUnit, Bp = Te.core.getCache, Vp = Te.utils.clamp, vc = Te.core.getStyleSaver, Hp = Te.core.reverting || function() {
  }, _c = Zh("power3"), vu = _c(0.05), $p = Te.core.PropTween, Te.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), eo = Te.config(), Te.registerPlugin(ko), zp = 1);
}, Gp = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Te = t, ef();
  },
  init: function(t, e, i, n, r) {
    zp || ef();
    var o = La(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = vc && typeof t.style == "object" && vc(t), this.target = t, this.tween = i, io = e;
    var a = t._gsap, l = a.get, u = e.duration, h = Bn(u), f = e.preventOvershoot || h && u.overshoot === 0, d = Ra(e, "resistance", eo.resistance), c = vo(u) ? u : t_(t, e, h && u.max || 10, h && u.min || 0.2, h && "overshoot" in u ? +u.overshoot : f ? 0 : 1), m, p, y, v, A, C, S, _, P;
    e = io, io = 0, P = Kp(t, e, l, d);
    for (m in e)
      Xp[m] || (p = e[m], wc(p) && (p = p(n, t, r)), vo(p) ? A = p : Bn(p) && !isNaN(p.velocity) ? A = +p.velocity : o && o.isTracking(m) ? A = o.get(m) : console.warn("ERROR: No velocity was defined for " + t + " property: " + m), C = wu(A, c), _ = 0, y = l(t, m), v = Np(y), y = parseFloat(y), Bn(p) && (S = y + C, "end" in p && (p = Up(p, P && m in P ? P : S, p.max, p.min, m, e.radius, A)), "max" in p && +p.max < S ? f || p.preventOvershoot ? C = p.max - y : _ = p.max - y - C : "min" in p && +p.min > S && (f || p.preventOvershoot ? C = p.min - y : _ = p.min - y - C)), this._props.push(m), this.styles && this.styles.save(m), this._pt = new $p(this._pt, t, m, y, 0, jy, 0, a.set(t, m, this)), this._pt.u = v || 0, this._pt.c1 = C, this._pt.c2 = _);
    return i.duration(c), Gy;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = _c(e.tween._time / e.tween._dur), t || !Hp())
      for (; i; )
        i.set(i.t, i.p, Zy(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Gp[s] = ko[s];
});
Yp() && Te.registerPlugin(Gp);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let br, Ds, bc, e_ = () => bc || s_.register(window.gsap), nf = typeof Intl < "u" ? new Intl.Segmenter() : 0, za = (s) => typeof s == "string" ? za(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], sf = (s) => za(s).filter((t) => t instanceof HTMLElement), xc = [], Ol = function() {
}, i_ = /\s+/g, rf = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), of = { left: 0, top: 0, width: 0, height: 0 }, af = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || xc), i = s.length, n, r, o, a;
    if (e.size)
      for (; --i > -1; ) {
        r = s[i];
        for (o of e)
          if (o.startsWith(r) && o.length > r.length) {
            for (n = 0, a = r; o.startsWith(a += s[i + ++n]) && a.length < o.length; )
              ;
            if (n && a.length === o.length) {
              s[i] = o, s.splice(i + 1, n);
              break;
            }
          }
      }
  }
  return s;
}, lf = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Ls = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), Sc = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: n = "div", aria: r = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", l = i.indexOf("++") > -1, u = (h) => {
    let f = document.createElement(n), d = e.length + 1;
    return i && (f.className = i + (l ? " " + i + d : "")), o && f.style.setProperty("--" + s, d + ""), r !== "none" && f.setAttribute("aria-hidden", "true"), n !== "span" && (f.style.position = "relative", f.style.display = a), f.textContent = h, e.push(f), f;
  };
  return l && (i = i.replace("++", "")), u.collection = e, u;
}, n_ = (s, t, e, i) => {
  let n = Sc("line", e, i), r = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let l = n("");
    for (l.style.textAlign = r, s.insertBefore(l, t[o]); o < a; o++)
      l.appendChild(t[o]);
    l.normalize();
  };
}, jp = (s, t, e, i, n, r, o, a, l, u) => {
  var h;
  let f = Array.from(s.childNodes), d = 0, { wordDelimiter: c, reduceWhiteSpace: m = !0, prepareText: p } = t, y = s.getBoundingClientRect(), v = y, A = !m && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, S = e.collection, _, P, O, T, k, R, V, z, B, J, it, U, H, tt, at, b, j, st;
  for (typeof c == "object" ? (O = c.delimiter || c, P = c.replaceWith || "") : P = c === "" ? "" : c || " ", _ = P !== " "; d < f.length; d++)
    if (T = f[d], T.nodeType === 3) {
      for (at = T.textContent || "", m ? at = at.replace(i_, " ") : A && (at = at.replace(/\n/g, P + `
`)), p && (at = p(at, s)), T.textContent = at, k = P || O ? at.split(O || P) : at.match(a) || xc, j = k[k.length - 1], z = _ ? j.slice(-1) === " " : !j, j || k.pop(), v = y, V = _ ? k[0].charAt(0) === " " : !k[0], V && Ls(" ", s, T), k[0] || k.shift(), af(k, l), r && u || (T.textContent = ""), B = 1; B <= k.length; B++)
        if (b = k[B - 1], !m && A && b.charAt(0) === `
` && ((h = T.previousSibling) == null || h.remove(), Ls(document.createElement("br"), s, T), b = b.slice(1)), !m && b === "")
          Ls(P, s, T);
        else if (b === " ")
          s.insertBefore(document.createTextNode(" "), T);
        else {
          if (_ && b.charAt(0) === " " && Ls(" ", s, T), C && B === 1 && !V && S.indexOf(C.parentNode) > -1 ? (R = S[S.length - 1], R.appendChild(document.createTextNode(i ? "" : b))) : (R = e(i ? "" : b), Ls(R, s, T), C && B === 1 && !V && R.insertBefore(C, R.firstChild)), i)
            for (it = nf ? af([...nf.segment(b)].map((X) => X.segment), l) : b.match(a) || xc, st = 0; st < it.length; st++)
              R.appendChild(it[st] === " " ? document.createTextNode(" ") : i(it[st]));
          if (r && u) {
            if (at = T.textContent = at.substring(b.length + 1, at.length), J = R.getBoundingClientRect(), J.top > v.top && J.left <= v.left) {
              for (U = s.cloneNode(), H = s.childNodes[0]; H && H !== R; )
                tt = H, H = H.nextSibling, U.appendChild(tt);
              s.parentNode.insertBefore(U, s), n && lf(U);
            }
            v = J;
          }
          (B < k.length || z) && Ls(B >= k.length ? " " : _ && b.slice(-1) === " " ? " " + P : P, s, T);
        }
      s.removeChild(T), C = 0;
    } else T.nodeType === 1 && (o && o.indexOf(T) > -1 ? (S.indexOf(T.previousSibling) > -1 && S[S.length - 1].appendChild(T), C = T) : (jp(T, t, e, i, n, r, o, a, l, !0), C = 0), n && lf(T));
};
const Zp = class Qp {
  constructor(t, e) {
    this.isSplit = !1, e_(), this.elements = sf(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
    let i = [], n, r = () => {
      let o = i.length, a;
      for (; o--; ) {
        a = i[o];
        let l = a.element.offsetWidth;
        if (l !== a.width) {
          a.width = l, this._split();
          return;
        }
      }
    };
    this._data = { orig: i, obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
      clearTimeout(n), n = setTimeout(r, 200);
    }) }, Ol(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: n = !0, smartWrap: r, onSplit: o, autoSplit: a = !1, specialChars: l, mask: u } = this.vars, h = e.indexOf("lines") > -1, f = e.indexOf("chars") > -1, d = e.indexOf("words") > -1, c = f && !d && !h, m = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l), p = m ? new RegExp(m.source + "|" + rf.source, "gu") : rf, y = !!t.ignore && sf(t.ignore), { orig: v, animTime: A, obs: C } = this._data, S;
    return (f || d || h) && (this.elements.forEach((_, P) => {
      v[P] = {
        element: _,
        html: _.innerHTML,
        ariaL: _.getAttribute("aria-label"),
        ariaH: _.getAttribute("aria-hidden")
      }, i === "auto" ? _.setAttribute("aria-label", (_.textContent || "").trim()) : i === "hidden" && _.setAttribute("aria-hidden", "true");
      let O = [], T = [], k = [], R = f ? Sc("char", t, O) : null, V = Sc("word", t, T), z, B, J, it;
      if (jp(_, t, V, R, c, n && (h || c), y, p, m, !1), h) {
        let U = za(_.childNodes), H = n_(_, U, t, k), tt, at = [], b = 0, j = U.map((X) => X.nodeType === 1 ? X.getBoundingClientRect() : of), st = of;
        for (z = 0; z < U.length; z++)
          tt = U[z], tt.nodeType === 1 && (tt.nodeName === "BR" ? (at.push(tt), H(b, z + 1), b = z + 1, st = j[b]) : (z && j[z].top > st.top && j[z].left <= st.left && (H(b, z), b = z), st = j[z]));
        b < z && H(b, z), at.forEach((X) => {
          var ot;
          return (ot = X.parentNode) == null ? void 0 : ot.removeChild(X);
        });
      }
      if (!d) {
        for (z = 0; z < T.length; z++)
          if (B = T[z], f || !B.nextSibling || B.nextSibling.nodeType !== 3)
            if (r && !h) {
              for (J = document.createElement("span"), J.style.whiteSpace = "nowrap"; B.firstChild; )
                J.appendChild(B.firstChild);
              B.replaceWith(J);
            } else
              B.replaceWith(...B.childNodes);
          else
            it = B.nextSibling, it && it.nodeType === 3 && (it.textContent = (B.textContent || "") + (it.textContent || ""), B.remove());
        T.length = 0, _.normalize();
      }
      this.lines.push(...k), this.words.push(...T), this.chars.push(...O);
    }), u && this[u] && this.masks.push(...this[u].map((_) => {
      let P = _.cloneNode();
      return _.replaceWith(P), P.appendChild(_), _.className && (P.className = _.className.replace(/(\b\w+\b)/g, "$1-mask")), P.style.overflow = "clip", P;
    }))), this.isSplit = !0, Ds && (a ? Ds.addEventListener("loadingdone", this._split) : Ds.status === "loading" && console.warn("SplitText called before fonts loaded")), (S = o && o(this)) && S.totalTime && (this._data.anim = A ? S.totalTime(A) : S), h && a && this.elements.forEach((_, P) => {
      v[P].width = _.offsetWidth, C && C.observe(_);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: n, obs: r } = this._data;
    return r && r.disconnect(), i.forEach(({ element: o, html: a, ariaL: l, ariaH: u }) => {
      o.innerHTML = a, l ? o.setAttribute("aria-label", l) : o.removeAttribute("aria-label"), u ? o.setAttribute("aria-hidden", u) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, Ds == null || Ds.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Qp(t, e);
  }
  static register(t) {
    br = br || t || window.gsap, br && (za = br.utils.toArray, Ol = br.core.context || Ol), !bc && window.innerWidth > 0 && (Ds = document.fonts, bc = !0);
  }
};
Zp.version = "3.13.0";
let s_ = Zp;
var Jp = ui.registerPlugin(qd) || ui;
Jp.core.Tween;
function r_(s, t) {
  s.indexOf(t) === -1 && s.push(t);
}
function tm(s, t) {
  const e = s.indexOf(t);
  e > -1 && s.splice(e, 1);
}
const Wn = (s, t, e) => e > t ? t : e < s ? s : e;
function Tc(s, t) {
  return t ? `${s}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : s;
}
let Mo = () => {
}, on = () => {
};
process.env.NODE_ENV !== "production" && (Mo = (s, t, e) => {
  !s && typeof console < "u" && console.warn(Tc(t, e));
}, on = (s, t, e) => {
  if (!s)
    throw new Error(Tc(t, e));
});
const Sn = {}, em = (s) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s);
function im(s) {
  return typeof s == "object" && s !== null;
}
const nm = (s) => /^0[^.\s]+$/u.test(s);
// @__NO_SIDE_EFFECTS__
function bu(s) {
  let t;
  return () => (t === void 0 && (t = s()), t);
}
const Kn = /* @__NO_SIDE_EFFECTS__ */ (s) => s, o_ = (s, t) => (e) => t(s(e)), xu = (...s) => s.reduce(o_), Xa = /* @__NO_SIDE_EFFECTS__ */ (s, t, e) => {
  const i = t - s;
  return i === 0 ? 1 : (e - s) / i;
};
class sm {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return r_(this.subscriptions, t), () => tm(this.subscriptions, t);
  }
  notify(t, e, i) {
    const n = this.subscriptions.length;
    if (n)
      if (n === 1)
        this.subscriptions[0](t, e, i);
      else
        for (let r = 0; r < n; r++) {
          const o = this.subscriptions[r];
          o && o(t, e, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ri = /* @__NO_SIDE_EFFECTS__ */ (s) => s * 1e3, Yi = /* @__NO_SIDE_EFFECTS__ */ (s) => s / 1e3;
function Su(s, t) {
  return t ? s * (1e3 / t) : 0;
}
const cf = /* @__PURE__ */ new Set();
function Tu(s, t, e) {
  s || cf.has(t) || (console.warn(Tc(t, e)), cf.add(t));
}
const a_ = (s, t, e) => {
  const i = t - s;
  return ((e - s) % i + i) % i + s;
}, rm = (s, t, e) => (((1 - 3 * e + 3 * t) * s + (3 * e - 6 * t)) * s + 3 * t) * s, l_ = 1e-7, c_ = 12;
function u_(s, t, e, i, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = rm(o, i, n) - s, r > 0 ? e = o : t = o;
  while (Math.abs(r) > l_ && ++a < c_);
  return o;
}
function Io(s, t, e, i) {
  if (s === t && e === i)
    return Kn;
  const n = (r) => u_(r, 0, 1, s, e);
  return (r) => r === 0 || r === 1 ? r : rm(n(r), t, i);
}
const om = (s) => (t) => t <= 0.5 ? s(2 * t) / 2 : (2 - s(2 * (1 - t))) / 2, am = (s) => (t) => 1 - s(1 - t), lm = /* @__PURE__ */ Io(0.33, 1.53, 0.69, 0.99), Eu = /* @__PURE__ */ am(lm), cm = /* @__PURE__ */ om(Eu), um = (s) => (s *= 2) < 1 ? 0.5 * Eu(s) : 0.5 * (2 - Math.pow(2, -10 * (s - 1))), Au = (s) => 1 - Math.sin(Math.acos(s)), h_ = am(Au), hm = om(Au), f_ = /* @__PURE__ */ Io(0.42, 0, 1, 1), d_ = /* @__PURE__ */ Io(0, 0, 0.58, 1), fm = /* @__PURE__ */ Io(0.42, 0, 0.58, 1), dm = (s) => Array.isArray(s) && typeof s[0] != "number";
function pm(s, t) {
  return dm(s) ? s[a_(0, s.length, t)] : s;
}
const mm = (s) => Array.isArray(s) && typeof s[0] == "number", uf = {
  linear: Kn,
  easeIn: f_,
  easeInOut: fm,
  easeOut: d_,
  circIn: Au,
  circInOut: hm,
  circOut: h_,
  backIn: Eu,
  backInOut: cm,
  backOut: lm,
  anticipate: um
}, p_ = (s) => typeof s == "string", Ec = (s) => {
  if (mm(s)) {
    on(s.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, i, n] = s;
    return Io(t, e, i, n);
  } else if (p_(s))
    return on(uf[s] !== void 0, `Invalid easing type '${s}'`, "invalid-easing-type"), uf[s];
  return s;
}, ea = [
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
function m_(s, t) {
  let e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), n = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(h) {
    o.has(h) && (u.schedule(h), s()), h(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (h, f = !1, d = !1) => {
      const m = d && n ? e : i;
      return f && o.add(h), m.has(h) || m.add(h), h;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (h) => {
      i.delete(h), o.delete(h);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (h) => {
      if (a = h, n) {
        r = !0;
        return;
      }
      n = !0, [e, i] = [i, e], e.forEach(l), e.clear(), n = !1, r && (r = !1, u.process(h));
    }
  };
  return u;
}
const g_ = 40;
function gm(s, t) {
  let e = !1, i = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = ea.reduce((C, S) => (C[S] = m_(r), C), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: h, update: f, preRender: d, render: c, postRender: m } = o, p = () => {
    const C = Sn.useManualTiming ? n.timestamp : performance.now();
    e = !1, Sn.useManualTiming || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(C - n.timestamp, g_), 1)), n.timestamp = C, n.isProcessing = !0, a.process(n), l.process(n), u.process(n), h.process(n), f.process(n), d.process(n), c.process(n), m.process(n), n.isProcessing = !1, e && t && (i = !1, s(p));
  }, y = () => {
    e = !0, i = !0, n.isProcessing || s(p);
  };
  return { schedule: ea.reduce((C, S) => {
    const _ = o[S];
    return C[S] = (P, O = !1, T = !1) => (e || y(), _.schedule(P, O, T)), C;
  }, {}), cancel: (C) => {
    for (let S = 0; S < ea.length; S++)
      o[ea[S]].cancel(C);
  }, state: n, steps: o };
}
const { schedule: ci, cancel: Ss, state: wo } = /* @__PURE__ */ gm(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Kn, !0);
let ya;
function y_() {
  ya = void 0;
}
const wi = {
  now: () => (ya === void 0 && wi.set(wo.isProcessing || Sn.useManualTiming ? wo.timestamp : performance.now()), ya),
  set: (s) => {
    ya = s, queueMicrotask(y_);
  }
}, ym = (s) => (t) => typeof t == "string" && t.startsWith(s), _m = /* @__PURE__ */ ym("--"), __ = /* @__PURE__ */ ym("var(--"), Cu = (s) => __(s) ? v_.test(s.split("/*")[0].trim()) : !1, v_ = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, hr = {
  test: (s) => typeof s == "number",
  parse: parseFloat,
  transform: (s) => s
}, bo = {
  ...hr,
  transform: (s) => Wn(0, 1, s)
}, ia = {
  ...hr,
  default: 1
}, no = (s) => Math.round(s * 1e5) / 1e5, Ou = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function w_(s) {
  return s == null;
}
const b_ = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Pu = (s, t) => (e) => !!(typeof e == "string" && b_.test(e) && e.startsWith(s) || t && !w_(e) && Object.prototype.hasOwnProperty.call(e, t)), vm = (s, t, e) => (i) => {
  if (typeof i != "string")
    return i;
  const [n, r, o, a] = i.match(Ou);
  return {
    [s]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, x_ = (s) => Wn(0, 255, s), Pl = {
  ...hr,
  transform: (s) => Math.round(x_(s))
}, rs = {
  test: /* @__PURE__ */ Pu("rgb", "red"),
  parse: /* @__PURE__ */ vm("red", "green", "blue"),
  transform: ({ red: s, green: t, blue: e, alpha: i = 1 }) => "rgba(" + Pl.transform(s) + ", " + Pl.transform(t) + ", " + Pl.transform(e) + ", " + no(bo.transform(i)) + ")"
};
function S_(s) {
  let t = "", e = "", i = "", n = "";
  return s.length > 5 ? (t = s.substring(1, 3), e = s.substring(3, 5), i = s.substring(5, 7), n = s.substring(7, 9)) : (t = s.substring(1, 2), e = s.substring(2, 3), i = s.substring(3, 4), n = s.substring(4, 5), t += t, e += e, i += i, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(i, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const Ac = {
  test: /* @__PURE__ */ Pu("#"),
  parse: S_,
  transform: rs.transform
}, Do = /* @__NO_SIDE_EFFECTS__ */ (s) => ({
  test: (t) => typeof t == "string" && t.endsWith(s) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${s}`
}), Cn = /* @__PURE__ */ Do("deg"), ir = /* @__PURE__ */ Do("%"), ft = /* @__PURE__ */ Do("px"), T_ = /* @__PURE__ */ Do("vh"), E_ = /* @__PURE__ */ Do("vw"), hf = {
  ...ir,
  parse: (s) => ir.parse(s) / 100,
  transform: (s) => ir.transform(s * 100)
}, Hs = {
  test: /* @__PURE__ */ Pu("hsl", "hue"),
  parse: /* @__PURE__ */ vm("hue", "saturation", "lightness"),
  transform: ({ hue: s, saturation: t, lightness: e, alpha: i = 1 }) => "hsla(" + Math.round(s) + ", " + ir.transform(no(t)) + ", " + ir.transform(no(e)) + ", " + no(bo.transform(i)) + ")"
}, me = {
  test: (s) => rs.test(s) || Ac.test(s) || Hs.test(s),
  parse: (s) => rs.test(s) ? rs.parse(s) : Hs.test(s) ? Hs.parse(s) : Ac.parse(s),
  transform: (s) => typeof s == "string" ? s : s.hasOwnProperty("red") ? rs.transform(s) : Hs.transform(s),
  getAnimatableNone: (s) => {
    const t = me.parse(s);
    return t.alpha = 0, me.transform(t);
  }
}, A_ = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function C_(s) {
  var t, e;
  return isNaN(s) && typeof s == "string" && (((t = s.match(Ou)) == null ? void 0 : t.length) || 0) + (((e = s.match(A_)) == null ? void 0 : e.length) || 0) > 0;
}
const wm = "number", bm = "color", O_ = "var", P_ = "var(", ff = "${}", k_ = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function xo(s) {
  const t = s.toString(), e = [], i = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(k_, (l) => (me.test(l) ? (i.color.push(r), n.push(bm), e.push(me.parse(l))) : l.startsWith(P_) ? (i.var.push(r), n.push(O_), e.push(l)) : (i.number.push(r), n.push(wm), e.push(parseFloat(l))), ++r, ff)).split(ff);
  return { values: e, split: a, indexes: i, types: n };
}
function xm(s) {
  return xo(s).values;
}
function Sm(s) {
  const { split: t, types: e } = xo(s), i = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === wm ? r += no(n[o]) : a === bm ? r += me.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const M_ = (s) => typeof s == "number" ? 0 : me.test(s) ? me.getAnimatableNone(s) : s;
function I_(s) {
  const t = xm(s);
  return Sm(s)(t.map(M_));
}
const fr = {
  test: C_,
  parse: xm,
  createTransformer: Sm,
  getAnimatableNone: I_
};
function kl(s, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? s + (t - s) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? s + (t - s) * (2 / 3 - e) * 6 : s;
}
function D_({ hue: s, saturation: t, lightness: e, alpha: i }) {
  s /= 360, t /= 100, e /= 100;
  let n = 0, r = 0, o = 0;
  if (!t)
    n = r = o = e;
  else {
    const a = e < 0.5 ? e * (1 + t) : e + t - e * t, l = 2 * e - a;
    n = kl(l, a, s + 1 / 3), r = kl(l, a, s), o = kl(l, a, s - 1 / 3);
  }
  return {
    red: Math.round(n * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function Fa(s, t) {
  return (e) => e > 0 ? t : s;
}
const Lo = (s, t, e) => s + (t - s) * e, Ml = (s, t, e) => {
  const i = s * s, n = e * (t * t - i) + i;
  return n < 0 ? 0 : Math.sqrt(n);
}, L_ = [Ac, rs, Hs], R_ = (s) => L_.find((t) => t.test(s));
function df(s) {
  const t = R_(s);
  if (Mo(!!t, `'${s}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(s);
  return t === Hs && (e = D_(e)), e;
}
const pf = (s, t) => {
  const e = df(s), i = df(t);
  if (!e || !i)
    return Fa(s, t);
  const n = { ...e };
  return (r) => (n.red = Ml(e.red, i.red, r), n.green = Ml(e.green, i.green, r), n.blue = Ml(e.blue, i.blue, r), n.alpha = Lo(e.alpha, i.alpha, r), rs.transform(n));
}, Cc = /* @__PURE__ */ new Set(["none", "hidden"]);
function z_(s, t) {
  return Cc.has(s) ? (e) => e <= 0 ? s : t : (e) => e >= 1 ? t : s;
}
function F_(s, t) {
  return (e) => Lo(s, t, e);
}
function ku(s) {
  return typeof s == "number" ? F_ : typeof s == "string" ? Cu(s) ? Fa : me.test(s) ? pf : B_ : Array.isArray(s) ? Tm : typeof s == "object" ? me.test(s) ? pf : N_ : Fa;
}
function Tm(s, t) {
  const e = [...s], i = e.length, n = s.map((r, o) => ku(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      e[o] = n[o](r);
    return e;
  };
}
function N_(s, t) {
  const e = { ...s, ...t }, i = {};
  for (const n in e)
    s[n] !== void 0 && t[n] !== void 0 && (i[n] = ku(s[n])(s[n], t[n]));
  return (n) => {
    for (const r in i)
      e[r] = i[r](n);
    return e;
  };
}
function $_(s, t) {
  const e = [], i = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = s.indexes[r][i[r]], a = s.values[o] ?? 0;
    e[n] = a, i[r]++;
  }
  return e;
}
const B_ = (s, t) => {
  const e = fr.createTransformer(t), i = xo(s), n = xo(t);
  return i.indexes.var.length === n.indexes.var.length && i.indexes.color.length === n.indexes.color.length && i.indexes.number.length >= n.indexes.number.length ? Cc.has(s) && !n.values.length || Cc.has(t) && !i.values.length ? z_(s, t) : xu(Tm($_(i, n), n.values), e) : (Mo(!0, `Complex values '${s}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Fa(s, t));
};
function Em(s, t, e) {
  return typeof s == "number" && typeof t == "number" && typeof e == "number" ? Lo(s, t, e) : ku(s)(s, t);
}
const V_ = (s) => {
  const t = ({ timestamp: e }) => s(e);
  return {
    start: (e = !0) => ci.update(t, e),
    stop: () => Ss(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wo.isProcessing ? wo.timestamp : wi.now()
  };
}, Am = (s, t, e = 10) => {
  let i = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    i += Math.round(s(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Na = 2e4;
function Mu(s) {
  let t = 0;
  const e = 50;
  let i = s.next(t);
  for (; !i.done && t < Na; )
    t += e, i = s.next(t);
  return t >= Na ? 1 / 0 : t;
}
function Cm(s, t = 100, e) {
  const i = e({ ...s, keyframes: [0, t] }), n = Math.min(Mu(i), Na);
  return {
    type: "keyframes",
    ease: (r) => i.next(n * r).value / t,
    duration: /* @__PURE__ */ Yi(n)
  };
}
const H_ = 5;
function Om(s, t, e) {
  const i = Math.max(t - H_, 0);
  return Su(e - s(i), t - i);
}
const Qt = {
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
}, mf = 1e-3;
function Y_({ duration: s = Qt.duration, bounce: t = Qt.bounce, velocity: e = Qt.velocity, mass: i = Qt.mass }) {
  let n, r;
  Mo(s <= /* @__PURE__ */ Ri(Qt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = Wn(Qt.minDamping, Qt.maxDamping, o), s = Wn(Qt.minDuration, Qt.maxDuration, /* @__PURE__ */ Yi(s)), o < 1 ? (n = (u) => {
    const h = u * o, f = h * s, d = h - e, c = Oc(u, o), m = Math.exp(-f);
    return mf - d / c * m;
  }, r = (u) => {
    const f = u * o * s, d = f * e + e, c = Math.pow(o, 2) * Math.pow(u, 2) * s, m = Math.exp(-f), p = Oc(Math.pow(u, 2), o);
    return (-n(u) + mf > 0 ? -1 : 1) * ((d - c) * m) / p;
  }) : (n = (u) => {
    const h = Math.exp(-u * s), f = (u - e) * s + 1;
    return -1e-3 + h * f;
  }, r = (u) => {
    const h = Math.exp(-u * s), f = (e - u) * (s * s);
    return h * f;
  });
  const a = 5 / s, l = q_(n, r, a);
  if (s = /* @__PURE__ */ Ri(s), isNaN(l))
    return {
      stiffness: Qt.stiffness,
      damping: Qt.damping,
      duration: s
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(i * u),
      duration: s
    };
  }
}
const W_ = 12;
function q_(s, t, e) {
  let i = e;
  for (let n = 1; n < W_; n++)
    i = i - s(i) / t(i);
  return i;
}
function Oc(s, t) {
  return s * Math.sqrt(1 - t * t);
}
const U_ = ["duration", "bounce"], X_ = ["stiffness", "damping", "mass"];
function gf(s, t) {
  return t.some((e) => s[e] !== void 0);
}
function K_(s) {
  let t = {
    velocity: Qt.velocity,
    stiffness: Qt.stiffness,
    damping: Qt.damping,
    mass: Qt.mass,
    isResolvedFromDuration: !1,
    ...s
  };
  if (!gf(s, X_) && gf(s, U_))
    if (s.visualDuration) {
      const e = s.visualDuration, i = 2 * Math.PI / (e * 1.2), n = i * i, r = 2 * Wn(0.05, 1, 1 - (s.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Qt.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = Y_(s);
      t = {
        ...t,
        ...e,
        mass: Qt.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function So(s = Qt.visualDuration, t = Qt.bounce) {
  const e = typeof s != "object" ? {
    visualDuration: s,
    keyframes: [0, 1],
    bounce: t
  } : s;
  let { restSpeed: i, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: h, duration: f, velocity: d, isResolvedFromDuration: c } = K_({
    ...e,
    velocity: -/* @__PURE__ */ Yi(e.velocity || 0)
  }), m = d || 0, p = u / (2 * Math.sqrt(l * h)), y = o - r, v = /* @__PURE__ */ Yi(Math.sqrt(l / h)), A = Math.abs(y) < 5;
  i || (i = A ? Qt.restSpeed.granular : Qt.restSpeed.default), n || (n = A ? Qt.restDelta.granular : Qt.restDelta.default);
  let C;
  if (p < 1) {
    const _ = Oc(v, p);
    C = (P) => {
      const O = Math.exp(-p * v * P);
      return o - O * ((m + p * v * y) / _ * Math.sin(_ * P) + y * Math.cos(_ * P));
    };
  } else if (p === 1)
    C = (_) => o - Math.exp(-v * _) * (y + (m + v * y) * _);
  else {
    const _ = v * Math.sqrt(p * p - 1);
    C = (P) => {
      const O = Math.exp(-p * v * P), T = Math.min(_ * P, 300);
      return o - O * ((m + p * v * y) * Math.sinh(T) + _ * y * Math.cosh(T)) / _;
    };
  }
  const S = {
    calculatedDuration: c && f || null,
    next: (_) => {
      const P = C(_);
      if (c)
        a.done = _ >= f;
      else {
        let O = _ === 0 ? m : 0;
        p < 1 && (O = _ === 0 ? /* @__PURE__ */ Ri(m) : Om(C, _, P));
        const T = Math.abs(O) <= i, k = Math.abs(o - P) <= n;
        a.done = T && k;
      }
      return a.value = a.done ? o : P, a;
    },
    toString: () => {
      const _ = Math.min(Mu(S), Na), P = Am((O) => S.next(_ * O).value, _, 30);
      return _ + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return S;
}
So.applyToOptions = (s) => {
  const t = Cm(s, 100, So);
  return s.ease = t.ease, s.duration = /* @__PURE__ */ Ri(t.duration), s.type = "keyframes", s;
};
function Pc({ keyframes: s, velocity: t = 0, power: e = 0.8, timeConstant: i = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: h }) {
  const f = s[0], d = {
    done: !1,
    value: f
  }, c = (T) => a !== void 0 && T < a || l !== void 0 && T > l, m = (T) => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
  let p = e * t;
  const y = f + p, v = o === void 0 ? y : o(y);
  v !== y && (p = v - f);
  const A = (T) => -p * Math.exp(-T / i), C = (T) => v + A(T), S = (T) => {
    const k = A(T), R = C(T);
    d.done = Math.abs(k) <= u, d.value = d.done ? v : R;
  };
  let _, P;
  const O = (T) => {
    c(d.value) && (_ = T, P = So({
      keyframes: [d.value, m(d.value)],
      velocity: Om(C, T, d.value),
      // TODO: This should be passing * 1000
      damping: n,
      stiffness: r,
      restDelta: u,
      restSpeed: h
    }));
  };
  return O(0), {
    calculatedDuration: null,
    next: (T) => {
      let k = !1;
      return !P && _ === void 0 && (k = !0, S(T), O(T)), _ !== void 0 && T >= _ ? P.next(T - _) : (!k && S(T), d);
    }
  };
}
function G_(s, t, e) {
  const i = [], n = e || Sn.mix || Em, r = s.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(s[o], s[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Kn : t;
      a = xu(l, a);
    }
    i.push(a);
  }
  return i;
}
function Pm(s, t, { clamp: e = !0, ease: i, mixer: n } = {}) {
  const r = s.length;
  if (on(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = s[0] === s[1];
  s[0] > s[r - 1] && (s = [...s].reverse(), t = [...t].reverse());
  const a = G_(t, i, n), l = a.length, u = (h) => {
    if (o && h < s[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < s.length - 2 && !(h < s[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ Xa(s[f], s[f + 1], h);
    return a[f](d);
  };
  return e ? (h) => u(Wn(s[0], s[r - 1], h)) : u;
}
function km(s, t) {
  const e = s[s.length - 1];
  for (let i = 1; i <= t; i++) {
    const n = /* @__PURE__ */ Xa(0, t, i);
    s.push(Lo(e, 1, n));
  }
}
function Iu(s) {
  const t = [0];
  return km(t, s.length - 1), t;
}
function j_(s, t) {
  return s.map((e) => e * t);
}
function Z_(s, t) {
  return s.map(() => t || fm).splice(0, s.length - 1);
}
function Ys({ duration: s = 300, keyframes: t, times: e, ease: i = "easeInOut" }) {
  const n = dm(i) ? i.map(Ec) : Ec(i), r = {
    done: !1,
    value: t[0]
  }, o = j_(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : Iu(t),
    s
  ), a = Pm(o, t, {
    ease: Array.isArray(n) ? n : Z_(t, n)
  });
  return {
    calculatedDuration: s,
    next: (l) => (r.value = a(l), r.done = l >= s, r)
  };
}
const Q_ = (s) => s !== null;
function Du(s, { repeat: t, repeatType: e = "loop" }, i, n = 1) {
  const r = s.filter(Q_), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const J_ = {
  decay: Pc,
  inertia: Pc,
  tween: Ys,
  keyframes: Ys,
  spring: So
};
function Mm(s) {
  typeof s.type == "string" && (s.type = J_[s.type]);
}
class Lu {
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
const tv = (s) => s / 100;
class Ru extends Lu {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== wi.now() && this.tick(wi.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (i = this.options).onStop) == null || n.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Mm(t);
    const { type: e = Ys, repeat: i = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = e || Ys;
    process.env.NODE_ENV !== "production" && l !== Ys && on(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== Ys && typeof a[0] != "number" && (this.mixKeyframes = xu(tv, Em(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = Mu(u));
    const { calculatedDuration: h } = u;
    this.calculatedDuration = h, this.resolvedDuration = h + n, this.totalDuration = this.resolvedDuration * (i + 1) - n, this.generator = u;
  }
  updateTime(t) {
    const e = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = e;
  }
  tick(t, e = !1) {
    const { generator: i, totalDuration: n, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: h, repeat: f, repeatType: d, repeatDelay: c, type: m, onUpdate: p, finalKeyframe: y } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const v = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? v < 0 : v > n;
    this.currentTime = Math.max(v, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let C = this.currentTime, S = i;
    if (f) {
      const T = Math.min(this.currentTime, n) / a;
      let k = Math.floor(T), R = T % 1;
      !R && T >= 1 && (R = 1), R === 1 && k--, k = Math.min(k, f + 1), !!(k % 2) && (d === "reverse" ? (R = 1 - R, c && (R -= c / a)) : d === "mirror" && (S = o)), C = Wn(0, 1, R) * a;
    }
    const _ = A ? { done: !1, value: h[0] } : S.next(C);
    r && (_.value = r(_.value));
    let { done: P } = _;
    !A && l !== null && (P = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const O = this.holdTime === null && (this.state === "finished" || this.state === "running" && P);
    return O && m !== Pc && (_.value = Du(h, this.options, y, this.speed)), p && p(_.value), O && this.finish(), _;
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
    return /* @__PURE__ */ Yi(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Yi(t);
  }
  get time() {
    return /* @__PURE__ */ Yi(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ Ri(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(wi.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ Yi(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = V_, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = e ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(wi.now()), this.holdTime = this.currentTime;
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
function ev(s) {
  for (let t = 1; t < s.length; t++)
    s[t] ?? (s[t] = s[t - 1]);
}
const os = (s) => s * 180 / Math.PI, kc = (s) => {
  const t = os(Math.atan2(s[1], s[0]));
  return Mc(t);
}, iv = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (s) => (Math.abs(s[0]) + Math.abs(s[3])) / 2,
  rotate: kc,
  rotateZ: kc,
  skewX: (s) => os(Math.atan(s[1])),
  skewY: (s) => os(Math.atan(s[2])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[2])) / 2
}, Mc = (s) => (s = s % 360, s < 0 && (s += 360), s), yf = kc, _f = (s) => Math.sqrt(s[0] * s[0] + s[1] * s[1]), vf = (s) => Math.sqrt(s[4] * s[4] + s[5] * s[5]), nv = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: _f,
  scaleY: vf,
  scale: (s) => (_f(s) + vf(s)) / 2,
  rotateX: (s) => Mc(os(Math.atan2(s[6], s[5]))),
  rotateY: (s) => Mc(os(Math.atan2(-s[2], s[0]))),
  rotateZ: yf,
  rotate: yf,
  skewX: (s) => os(Math.atan(s[4])),
  skewY: (s) => os(Math.atan(s[1])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[4])) / 2
};
function Ic(s) {
  return s.includes("scale") ? 1 : 0;
}
function Dc(s, t) {
  if (!s || s === "none")
    return Ic(t);
  const e = s.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, n;
  if (e)
    i = nv, n = e;
  else {
    const a = s.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = iv, n = a;
  }
  if (!n)
    return Ic(t);
  const r = i[t], o = n[1].split(",").map(rv);
  return typeof r == "function" ? r(o) : o[r];
}
const sv = (s, t) => {
  const { transform: e = "none" } = getComputedStyle(s);
  return Dc(e, t);
};
function rv(s) {
  return parseFloat(s.trim());
}
const dr = [
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
], pr = new Set(dr), wf = (s) => s === hr || s === ft, ov = /* @__PURE__ */ new Set(["x", "y", "z"]), av = dr.filter((s) => !ov.has(s));
function lv(s) {
  const t = [];
  return av.forEach((e) => {
    const i = s.getValue(e);
    i !== void 0 && (t.push([e, i.get()]), i.set(e.startsWith("scale") ? 1 : 0));
  }), t;
}
const gs = {
  // Dimensions
  width: ({ x: s }, { paddingLeft: t = "0", paddingRight: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  height: ({ y: s }, { paddingTop: t = "0", paddingBottom: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  top: (s, { top: t }) => parseFloat(t),
  left: (s, { left: t }) => parseFloat(t),
  bottom: ({ y: s }, { top: t }) => parseFloat(t) + (s.max - s.min),
  right: ({ x: s }, { left: t }) => parseFloat(t) + (s.max - s.min),
  // Transform
  x: (s, { transform: t }) => Dc(t, "x"),
  y: (s, { transform: t }) => Dc(t, "y")
};
gs.translateX = gs.x;
gs.translateY = gs.y;
const ys = /* @__PURE__ */ new Set();
let Lc = !1, Rc = !1, zc = !1;
function Im() {
  if (Rc) {
    const s = Array.from(ys).filter((i) => i.needsMeasurement), t = new Set(s.map((i) => i.element)), e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const n = lv(i);
      n.length && (e.set(i, n), i.render());
    }), s.forEach((i) => i.measureInitialState()), t.forEach((i) => {
      i.render();
      const n = e.get(i);
      n && n.forEach(([r, o]) => {
        var a;
        (a = i.getValue(r)) == null || a.set(o);
      });
    }), s.forEach((i) => i.measureEndState()), s.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Rc = !1, Lc = !1, ys.forEach((s) => s.complete(zc)), ys.clear();
}
function Dm() {
  ys.forEach((s) => {
    s.readKeyframes(), s.needsMeasurement && (Rc = !0);
  });
}
function cv() {
  zc = !0, Dm(), Im(), zc = !1;
}
class zu {
  constructor(t, e, i, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = i, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ys.add(this), Lc || (Lc = !0, ci.read(Dm), ci.resolveKeyframes(Im))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: e, element: i, motionValue: n } = this;
    if (t[0] === null) {
      const r = n == null ? void 0 : n.get(), o = t[t.length - 1];
      if (r !== void 0)
        t[0] = r;
      else if (i && e) {
        const a = i.readValue(e, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), n && r === void 0 && n.set(t[0]);
    }
    ev(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), ys.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ys.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const uv = (s) => s.startsWith("--");
function hv(s, t, e) {
  uv(t) ? s.style.setProperty(t, e) : s.style[t] = e;
}
const Lm = /* @__PURE__ */ bu(() => window.ScrollTimeline !== void 0), fv = {};
function dv(s, t) {
  const e = /* @__PURE__ */ bu(s);
  return () => fv[t] ?? e();
}
const Rm = /* @__PURE__ */ dv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Fr = ([s, t, e, i]) => `cubic-bezier(${s}, ${t}, ${e}, ${i})`, bf = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Fr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Fr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Fr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Fr([0.33, 1.53, 0.69, 0.99])
};
function zm(s, t) {
  if (s)
    return typeof s == "function" ? Rm() ? Am(s, t) : "ease-out" : mm(s) ? Fr(s) : Array.isArray(s) ? s.map((e) => zm(e, t) || bf.easeOut) : bf[s];
}
function pv(s, t, e, { delay: i = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const h = {
    [t]: e
  };
  l && (h.offset = l);
  const f = zm(a, n);
  Array.isArray(f) && (h.easing = f);
  const d = {
    delay: i,
    duration: n,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), s.animate(h, d);
}
function Fu(s) {
  return typeof s == "function" && "applyToOptions" in s;
}
function mv({ type: s, ...t }) {
  return Fu(s) && Rm() ? s.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class gv extends Lu {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: i, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, on(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = mv(t);
    this.animation = pv(e, i, n, u, r), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const h = Du(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(h) : hv(e, i, h), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
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
    var e, i;
    const t = ((i = (e = this.animation.effect) == null ? void 0 : e.getComputedTiming) == null ? void 0 : i.call(e).duration) || 0;
    return /* @__PURE__ */ Yi(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Yi(t);
  }
  get time() {
    return /* @__PURE__ */ Yi(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ri(t);
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
    var i;
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Lm() ? (this.animation.timeline = t, Kn) : e(this);
  }
}
const Fm = {
  anticipate: um,
  backInOut: cm,
  circInOut: hm
};
function yv(s) {
  return s in Fm;
}
function _v(s) {
  typeof s.ease == "string" && yv(s.ease) && (s.ease = Fm[s.ease]);
}
const xf = 10;
class vv extends gv {
  constructor(t) {
    _v(t), Mm(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const { motionValue: e, onUpdate: i, onComplete: n, element: r, ...o } = this.options;
    if (!e)
      return;
    if (t !== void 0) {
      e.set(t);
      return;
    }
    const a = new Ru({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ Ri(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(l - xf).value, a.sample(l).value, xf), a.stop();
  }
}
const Sf = (s, t) => t === "zIndex" ? !1 : !!(typeof s == "number" || Array.isArray(s) || typeof s == "string" && // It's animatable if we have a string
(fr.test(s) || s === "0") && // And it contains numbers and/or colors
!s.startsWith("url("));
function wv(s) {
  const t = s[0];
  if (s.length === 1)
    return !0;
  for (let e = 0; e < s.length; e++)
    if (s[e] !== t)
      return !0;
}
function bv(s, t, e, i) {
  const n = s[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = s[s.length - 1], o = Sf(n, t), a = Sf(r, t);
  return Mo(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : wv(s) || (e === "spring" || Fu(e)) && i;
}
function Fc(s) {
  s.duration = 0, s.type = "keyframes";
}
const xv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Sv = /* @__PURE__ */ bu(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Tv(s) {
  var h;
  const { motionValue: t, name: e, repeatDelay: i, repeatType: n, damping: r, type: o } = s;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return Sv() && e && xv.has(e) && (e !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && n !== "mirror" && r !== 0 && o !== "inertia";
}
const Ev = 40;
class Av extends Lu {
  constructor({ autoplay: t = !0, delay: e = 0, type: i = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: h, ...f }) {
    var m;
    super(), this.stop = () => {
      var p, y;
      this._animation && (this._animation.stop(), (p = this.stopTimeline) == null || p.call(this)), (y = this.keyframeResolver) == null || y.cancel();
    }, this.createdAt = wi.now();
    const d = {
      autoplay: t,
      delay: e,
      type: i,
      repeat: n,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: u,
      element: h,
      ...f
    }, c = (h == null ? void 0 : h.KeyframeResolver) || zu;
    this.keyframeResolver = new c(a, (p, y, v) => this.onKeyframesResolved(p, y, d, !v), l, u, h), (m = this.keyframeResolver) == null || m.scheduleResolve();
  }
  onKeyframesResolved(t, e, i, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: h } = i;
    this.resolvedAt = wi.now(), bv(t, r, o, a) || ((Sn.instantAnimations || !l) && (h == null || h(Du(t, i, e))), t[0] = t[t.length - 1], Fc(i), i.repeat = 0);
    const d = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ev ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...i,
      keyframes: t
    }, c = !u && Tv(d) ? new vv({
      ...d,
      element: d.motionValue.owner.current
    }) : new Ru(d);
    c.finished.then(() => this.notifyFinished()).catch(Kn), this.pendingTimeline && (this.stopTimeline = c.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = c;
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), cv()), this._animation;
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
class Cv {
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
    for (let i = 0; i < this.animations.length; i++)
      this.animations[i][t] = e;
  }
  attachTimeline(t) {
    const e = this.animations.map((i) => i.attachTimeline(t));
    return () => {
      e.forEach((i, n) => {
        i && i(), this.animations[n].stop();
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
    return Tf(this.animations, "duration");
  }
  get iterationDuration() {
    return Tf(this.animations, "iterationDuration");
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
function Tf(s, t) {
  let e = 0;
  for (let i = 0; i < s.length; i++) {
    const n = s[i][t];
    n !== null && n > e && (e = n);
  }
  return e;
}
class Ov extends Cv {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Pv = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function kv(s) {
  const t = Pv.exec(s);
  if (!t)
    return [,];
  const [, e, i, n] = t;
  return [`--${e ?? i}`, n];
}
const Mv = 4;
function Nm(s, t, e = 1) {
  on(e <= Mv, `Max CSS variable fallback depth detected in property "${s}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, n] = kv(s);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return em(o) ? parseFloat(o) : o;
  }
  return Cu(n) ? Nm(n, t, e + 1) : n;
}
function $m(s, t) {
  return (s == null ? void 0 : s[t]) ?? (s == null ? void 0 : s.default) ?? s;
}
const Bm = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...dr
]), Iv = {
  test: (s) => s === "auto",
  parse: (s) => s
}, Vm = (s) => (t) => t.test(s), Hm = [hr, ft, ir, Cn, E_, T_, Iv], Ef = (s) => Hm.find(Vm(s));
function Dv(s) {
  return typeof s == "number" ? s === 0 : s !== null ? s === "none" || s === "0" || nm(s) : !0;
}
const Lv = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Rv(s) {
  const [t, e] = s.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return s;
  const [i] = e.match(Ou) || [];
  if (!i)
    return s;
  const n = e.replace(i, "");
  let r = Lv.has(t) ? 1 : 0;
  return i !== e && (r *= 100), t + "(" + r + n + ")";
}
const zv = /\b([a-z-]*)\(.*?\)/gu, Nc = {
  ...fr,
  getAnimatableNone: (s) => {
    const t = s.match(zv);
    return t ? t.map(Rv).join(" ") : s;
  }
}, Af = {
  ...hr,
  transform: Math.round
}, Fv = {
  rotate: Cn,
  rotateX: Cn,
  rotateY: Cn,
  rotateZ: Cn,
  scale: ia,
  scaleX: ia,
  scaleY: ia,
  scaleZ: ia,
  skew: Cn,
  skewX: Cn,
  skewY: Cn,
  distance: ft,
  translateX: ft,
  translateY: ft,
  translateZ: ft,
  x: ft,
  y: ft,
  z: ft,
  perspective: ft,
  transformPerspective: ft,
  opacity: bo,
  originX: hf,
  originY: hf,
  originZ: ft
}, Nu = {
  // Border props
  borderWidth: ft,
  borderTopWidth: ft,
  borderRightWidth: ft,
  borderBottomWidth: ft,
  borderLeftWidth: ft,
  borderRadius: ft,
  radius: ft,
  borderTopLeftRadius: ft,
  borderTopRightRadius: ft,
  borderBottomRightRadius: ft,
  borderBottomLeftRadius: ft,
  // Positioning props
  width: ft,
  maxWidth: ft,
  height: ft,
  maxHeight: ft,
  top: ft,
  right: ft,
  bottom: ft,
  left: ft,
  // Spacing props
  padding: ft,
  paddingTop: ft,
  paddingRight: ft,
  paddingBottom: ft,
  paddingLeft: ft,
  margin: ft,
  marginTop: ft,
  marginRight: ft,
  marginBottom: ft,
  marginLeft: ft,
  // Misc
  backgroundPositionX: ft,
  backgroundPositionY: ft,
  ...Fv,
  zIndex: Af,
  // SVG
  fillOpacity: bo,
  strokeOpacity: bo,
  numOctaves: Af
}, Nv = {
  ...Nu,
  // Color props
  color: me,
  backgroundColor: me,
  outlineColor: me,
  fill: me,
  stroke: me,
  // Border props
  borderColor: me,
  borderTopColor: me,
  borderRightColor: me,
  borderBottomColor: me,
  borderLeftColor: me,
  filter: Nc,
  WebkitFilter: Nc
}, Ym = (s) => Nv[s];
function Wm(s, t) {
  let e = Ym(s);
  return e !== Nc && (e = fr), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const $v = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Bv(s, t, e) {
  let i = 0, n;
  for (; i < s.length && !n; ) {
    const r = s[i];
    typeof r == "string" && !$v.has(r) && xo(r).values.length && (n = s[i]), i++;
  }
  if (n && e)
    for (const r of t)
      s[r] = Wm(e, n);
}
class Vv extends zu {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: e, name: i } = this;
    if (!e || !e.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), Cu(u))) {
        const h = Nm(u, e.current);
        h !== void 0 && (t[l] = h), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !Bm.has(i) || t.length !== 2)
      return;
    const [n, r] = t, o = Ef(n), a = Ef(r);
    if (o !== a)
      if (wf(o) && wf(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else gs[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, i = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || Dv(t[n])) && i.push(n);
    i.length && Bv(t, i, e);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: e, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = gs[i](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
    const n = e[e.length - 1];
    n !== void 0 && t.getValue(i, n).jump(n, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: e, unresolvedKeyframes: i } = this;
    if (!t || !t.current)
      return;
    const n = t.getValue(e);
    n && n.jump(this.measuredOrigin, !1);
    const r = i.length - 1, o = i[r];
    i[r] = gs[e](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
      t.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
function qm(s, t, e) {
  if (s instanceof EventTarget)
    return [s];
  if (typeof s == "string") {
    let i = document;
    const n = (e == null ? void 0 : e[s]) ?? i.querySelectorAll(s);
    return n ? Array.from(n) : [];
  }
  return Array.from(s);
}
const Um = (s, t) => t && typeof s == "number" ? t.transform(s) : s;
function Hv(s) {
  return im(s) && "offsetHeight" in s;
}
const Cf = 30, Yv = (s) => !isNaN(parseFloat(s));
class Wv {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const n = wi.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = wi.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Yv(this.current));
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
    return process.env.NODE_ENV !== "production" && Tu(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new sm());
    const i = this.events[t].add(e);
    return t === "change" ? () => {
      i(), ci.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
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
  setWithVelocity(t, e, i) {
    this.set(e), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - i;
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
    const t = wi.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Cf)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, Cf);
    return Su(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function To(s, t) {
  return new Wv(s, t);
}
const { schedule: qv } = /* @__PURE__ */ gm(queueMicrotask, !1);
function $u(s) {
  return im(s) && "ownerSVGElement" in s;
}
const _a = /* @__PURE__ */ new WeakMap();
let On;
const Xm = (s, t, e) => (i, n) => n && n[0] ? n[0][s + "Size"] : $u(i) && "getBBox" in i ? i.getBBox()[t] : i[e], Uv = /* @__PURE__ */ Xm("inline", "width", "offsetWidth"), Xv = /* @__PURE__ */ Xm("block", "height", "offsetHeight");
function Kv({ target: s, borderBoxSize: t }) {
  var e;
  (e = _a.get(s)) == null || e.forEach((i) => {
    i(s, {
      get width() {
        return Uv(s, t);
      },
      get height() {
        return Xv(s, t);
      }
    });
  });
}
function Gv(s) {
  s.forEach(Kv);
}
function jv() {
  typeof ResizeObserver > "u" || (On = new ResizeObserver(Gv));
}
function Zv(s, t) {
  On || jv();
  const e = qm(s);
  return e.forEach((i) => {
    let n = _a.get(i);
    n || (n = /* @__PURE__ */ new Set(), _a.set(i, n)), n.add(t), On == null || On.observe(i);
  }), () => {
    e.forEach((i) => {
      const n = _a.get(i);
      n == null || n.delete(t), n != null && n.size || On == null || On.unobserve(i);
    });
  };
}
const va = /* @__PURE__ */ new Set();
let Ws;
function Qv() {
  Ws = () => {
    const s = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    va.forEach((t) => t(s));
  }, window.addEventListener("resize", Ws);
}
function Jv(s) {
  return va.add(s), Ws || Qv(), () => {
    va.delete(s), !va.size && typeof Ws == "function" && (window.removeEventListener("resize", Ws), Ws = void 0);
  };
}
function tw(s, t) {
  return typeof s == "function" ? Jv(s) : Zv(s, t);
}
function Km(s, t) {
  let e;
  const i = () => {
    const { currentTime: n } = t, o = (n === null ? 0 : n.value) / 100;
    e !== o && s(o), e = o;
  };
  return ci.preUpdate(i, !0), () => Ss(i);
}
function ew(s) {
  return $u(s) && s.tagName === "svg";
}
function iw(s, t) {
  if (s === "first")
    return 0;
  {
    const e = t - 1;
    return s === "last" ? e : e / 2;
  }
}
function qn(s = 0.1, { startDelay: t = 0, from: e = 0, ease: i } = {}) {
  return (n, r) => {
    const o = typeof e == "number" ? e : iw(e, r), a = Math.abs(o - n);
    let l = s * a;
    if (i) {
      const u = r * s;
      l = Ec(i)(l / u) * u;
    }
    return t + l;
  };
}
const ii = (s) => !!(s && s.getVelocity), nw = [...Hm, me, fr], sw = (s) => nw.find(Vm(s));
function Bu(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function Gm(s, t, e, i) {
  return typeof s == "string" && Bu(t) ? qm(s, e, i) : s instanceof NodeList ? Array.from(s) : Array.isArray(s) ? s : [s];
}
function rw(s, t, e) {
  return s * (t + 1);
}
function Of(s, t, e, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, s + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : i.get(t) ?? s;
}
function ow(s, t, e) {
  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    n.at > t && n.at < e && (tm(s, n), i--);
  }
}
function aw(s, t, e, i, n, r) {
  ow(s, n, r);
  for (let o = 0; o < t.length; o++)
    s.push({
      value: t[o],
      at: Lo(n, r, i[o]),
      easing: pm(e, o)
    });
}
function lw(s, t) {
  for (let e = 0; e < s.length; e++)
    s[e] = s[e] / (t + 1);
}
function cw(s, t) {
  return s.at === t.at ? s.value === null ? 1 : t.value === null ? -1 : 0 : s.at - t.at;
}
const uw = "easeInOut", hw = 20;
function fw(s, { defaultTransition: t = {}, ...e } = {}, i, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let h = 0, f = 0, d = 0;
  for (let c = 0; c < s.length; c++) {
    const m = s[c];
    if (typeof m == "string") {
      u.set(m, f);
      continue;
    } else if (!Array.isArray(m)) {
      u.set(m.name, Of(f, m.at, h, u));
      continue;
    }
    let [p, y, v = {}] = m;
    v.at !== void 0 && (f = Of(f, v.at, h, u));
    let A = 0;
    const C = (S, _, P, O = 0, T = 0) => {
      const k = dw(S), { delay: R = 0, times: V = Iu(k), type: z = "keyframes", repeat: B, repeatType: J, repeatDelay: it = 0, ...U } = _;
      let { ease: H = t.ease || "easeOut", duration: tt } = _;
      const at = typeof R == "function" ? R(O, T) : R, b = k.length, j = Fu(z) ? z : n == null ? void 0 : n[z || "keyframes"];
      if (b <= 2 && j) {
        let Dt = 100;
        if (b === 2 && gw(k)) {
          const ct = k[1] - k[0];
          Dt = Math.abs(ct);
        }
        const yt = { ...U };
        tt !== void 0 && (yt.duration = /* @__PURE__ */ Ri(tt));
        const Ct = Cm(yt, Dt, j);
        H = Ct.ease, tt = Ct.duration;
      }
      tt ?? (tt = r);
      const st = f + at;
      V.length === 1 && V[0] === 0 && (V[1] = 1);
      const X = V.length - k.length;
      if (X > 0 && km(V, X), k.length === 1 && k.unshift(null), B) {
        on(B < hw, "Repeat count too high, must be less than 20", "repeat-count-high"), tt = rw(tt, B);
        const Dt = [...k], yt = [...V];
        H = Array.isArray(H) ? [...H] : [H];
        const Ct = [...H];
        for (let ct = 0; ct < B; ct++) {
          k.push(...Dt);
          for (let Rt = 0; Rt < Dt.length; Rt++)
            V.push(yt[Rt] + (ct + 1)), H.push(Rt === 0 ? "linear" : pm(Ct, Rt - 1));
        }
        lw(V, B);
      }
      const ot = st + tt;
      aw(P, k, H, V, st, ot), A = Math.max(at + tt, A), d = Math.max(ot, d);
    };
    if (ii(p)) {
      const S = Pf(p, a);
      C(y, v, kf("default", S));
    } else {
      const S = Gm(p, y, i, l), _ = S.length;
      for (let P = 0; P < _; P++) {
        y = y, v = v;
        const O = S[P], T = Pf(O, a);
        for (const k in y)
          C(y[k], pw(v, k), kf(k, T), P, _);
      }
    }
    h = f, f += A;
  }
  return a.forEach((c, m) => {
    for (const p in c) {
      const y = c[p];
      y.sort(cw);
      const v = [], A = [], C = [];
      for (let _ = 0; _ < y.length; _++) {
        const { at: P, value: O, easing: T } = y[_];
        v.push(O), A.push(/* @__PURE__ */ Xa(0, d, P)), C.push(T || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), v.unshift(v[0]), C.unshift(uw)), A[A.length - 1] !== 1 && (A.push(1), v.push(null)), o.has(m) || o.set(m, {
        keyframes: {},
        transition: {}
      });
      const S = o.get(m);
      S.keyframes[p] = v, S.transition[p] = {
        ...t,
        duration: d,
        ease: C,
        times: A,
        ...e
      };
    }
  }), o;
}
function Pf(s, t) {
  return !t.has(s) && t.set(s, {}), t.get(s);
}
function kf(s, t) {
  return t[s] || (t[s] = []), t[s];
}
function dw(s) {
  return Array.isArray(s) ? s : [s];
}
function pw(s, t) {
  return s && s[t] ? {
    ...s,
    ...s[t]
  } : { ...s };
}
const mw = (s) => typeof s == "number", gw = (s) => s.every(mw), Eo = /* @__PURE__ */ new WeakMap(), yw = (s) => Array.isArray(s);
function Mf(s) {
  const t = [{}, {}];
  return s == null || s.values.forEach((e, i) => {
    t[0][i] = e.get(), t[1][i] = e.getVelocity();
  }), t;
}
function jm(s, t, e, i) {
  if (typeof t == "function") {
    const [n, r] = Mf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  if (typeof t == "string" && (t = s.variants && s.variants[t]), typeof t == "function") {
    const [n, r] = Mf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  return t;
}
function _w(s, t, e) {
  const i = s.getProps();
  return jm(i, t, i.custom, s);
}
function vw(s, t, e) {
  s.hasValue(t) ? s.getValue(t).set(e) : s.addValue(t, To(e));
}
function ww(s) {
  return yw(s) ? s[s.length - 1] || 0 : s;
}
function bw(s, t) {
  const e = _w(s, t);
  let { transitionEnd: i = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = ww(r[o]);
    vw(s, o, a);
  }
}
function xw(s) {
  return !!(ii(s) && s.add);
}
function Sw(s, t) {
  const e = s.getValue("willChange");
  if (xw(e))
    return e.add(t);
  if (!e && Sn.WillChange) {
    const i = new Sn.WillChange("auto");
    s.addValue("willChange", i), i.add(t);
  }
}
const Vu = (s) => s.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Tw = "framerAppearId", Ew = "data-" + Vu(Tw);
function Aw(s) {
  return s.props[Ew];
}
const Cw = (s) => s !== null;
function Ow(s, { repeat: t, repeatType: e = "loop" }, i) {
  const n = s.filter(Cw), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const Pw = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, kw = (s) => ({
  type: "spring",
  stiffness: 550,
  damping: s === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Mw = {
  type: "keyframes",
  duration: 0.8
}, Iw = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Dw = (s, { keyframes: t }) => t.length > 2 ? Mw : pr.has(s) ? s.startsWith("scale") ? kw(t[1]) : Pw : Iw;
function Lw({ when: s, delay: t, delayChildren: e, staggerChildren: i, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...h }) {
  return !!Object.keys(h).length;
}
const Zm = (s, t, e, i = {}, n, r) => (o) => {
  const a = $m(i, s) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ Ri(l);
  const h = {
    keyframes: Array.isArray(e) ? e : [null, e],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      t.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: s,
    motionValue: t,
    element: r ? void 0 : n
  };
  Lw(a) || Object.assign(h, Dw(s, h)), h.duration && (h.duration = /* @__PURE__ */ Ri(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ Ri(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let f = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (Fc(h), h.delay === 0 && (f = !0)), (Sn.instantAnimations || Sn.skipAnimations) && (f = !0, Fc(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, f && !r && t.get() !== void 0) {
    const d = Ow(h.keyframes, a);
    if (d !== void 0) {
      ci.update(() => {
        h.onUpdate(d), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ru(h) : new Av(h);
};
function Rw({ protectedKeys: s, needsAnimating: t }, e) {
  const i = s.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, i;
}
function zw(s, t, { delay: e = 0, transitionOverride: i, type: n } = {}) {
  let { transition: r = s.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (r = i);
  const l = [], u = n && s.animationState && s.animationState.getState()[n];
  for (const h in a) {
    const f = s.getValue(h, s.latestValues[h] ?? null), d = a[h];
    if (d === void 0 || u && Rw(u, h))
      continue;
    const c = {
      delay: e,
      ...$m(r || {}, h)
    }, m = f.get();
    if (m !== void 0 && !f.isAnimating && !Array.isArray(d) && d === m && !c.velocity)
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const v = Aw(s);
      if (v) {
        const A = window.MotionHandoffAnimation(v, h, ci);
        A !== null && (c.startTime = A, p = !0);
      }
    }
    Sw(s, h), f.start(Zm(h, f, d, s.shouldReduceMotion && Bm.has(h) ? { type: !1 } : c, s, p));
    const y = f.animation;
    y && l.push(y);
  }
  return o && Promise.all(l).then(() => {
    ci.update(() => {
      o && bw(s, o);
    });
  }), l;
}
function Fw({ top: s, left: t, right: e, bottom: i }) {
  return {
    x: { min: t, max: e },
    y: { min: s, max: i }
  };
}
function Nw(s, t) {
  if (!t)
    return s;
  const e = t({ x: s.left, y: s.top }), i = t({ x: s.right, y: s.bottom });
  return {
    top: e.y,
    left: e.x,
    bottom: i.y,
    right: i.x
  };
}
function $w(s, t) {
  return Fw(Nw(s.getBoundingClientRect(), t));
}
const If = {
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
}, $c = {};
for (const s in If)
  $c[s] = {
    isEnabled: (t) => If[s].some((e) => !!t[e])
  };
const Df = () => ({ min: 0, max: 0 }), Hu = () => ({
  x: Df(),
  y: Df()
}), Bw = typeof window < "u", Bc = { current: null }, Qm = { current: !1 };
function Vw() {
  if (Qm.current = !0, !!Bw)
    if (window.matchMedia) {
      const s = window.matchMedia("(prefers-reduced-motion)"), t = () => Bc.current = s.matches;
      s.addEventListener("change", t), t();
    } else
      Bc.current = !1;
}
function Hw(s) {
  return s !== null && typeof s == "object" && typeof s.start == "function";
}
function Yw(s) {
  return typeof s == "string" || Array.isArray(s);
}
const Ww = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], qw = ["initial", ...Ww];
function Jm(s) {
  return Hw(s.animate) || qw.some((t) => Yw(s[t]));
}
function Uw(s) {
  return !!(Jm(s) || s.variants);
}
function Xw(s, t, e) {
  for (const i in t) {
    const n = t[i], r = e[i];
    if (ii(n))
      s.addValue(i, n);
    else if (ii(r))
      s.addValue(i, To(n, { owner: s }));
    else if (r !== n)
      if (s.hasValue(i)) {
        const o = s.getValue(i);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = s.getStaticValue(i);
        s.addValue(i, To(o !== void 0 ? o : n, { owner: s }));
      }
  }
  for (const i in e)
    t[i] === void 0 && s.removeValue(i);
  return t;
}
const Lf = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class tg {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, e, i) {
    return {};
  }
  constructor({ parent: t, props: e, presenceContext: i, reducedMotionConfig: n, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = zu, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = wi.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, ci.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = e.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Jm(e), this.isVariantNode = Uw(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const d in f) {
      const c = f[d];
      l[d] !== void 0 && ii(c) && c.set(l[d]);
    }
  }
  mount(t) {
    var e;
    this.current = t, Eo.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, n) => this.bindToMotionValue(n, i)), Qm.current || Vw(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Bc.current, process.env.NODE_ENV !== "production" && Tu(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), Ss(this.notifyUpdate), Ss(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const i = this.features[e];
      i && (i.unmount(), i.isMounted = !1);
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
    const i = pr.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && ci.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (t in $c) {
      const e = $c[t];
      if (!e)
        continue;
      const { isEnabled: i, Feature: n } = e;
      if (!this.features[t] && n && i(this.props) && (this.features[t] = new n(this)), this.features[t]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Hu();
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
    for (let i = 0; i < Lf.length; i++) {
      const n = Lf[i];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const r = "on" + n, o = t[r];
      o && (this.propEventSubscriptions[n] = this.on(n, o));
    }
    this.prevMotionValues = Xw(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const i = this.values.get(t);
    e !== i && (i && this.removeValue(t), this.bindToMotionValue(t, e), this.values.set(t, e), this.latestValues[t] = e.get());
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
    let i = this.values.get(t);
    return i === void 0 && e !== void 0 && (i = To(e === null ? void 0 : e, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (em(i) || nm(i)) ? i = parseFloat(i) : !sw(i) && fr.test(e) && (i = Wm(t, e)), this.setBaseTarget(t, ii(i) ? i.get() : i)), ii(i) ? i.get() : i;
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
    let i;
    if (typeof e == "string" || typeof e == "object") {
      const o = jm(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (e && i !== void 0)
      return i;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !ii(n) ? n : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new sm()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    qv.render(this.render);
  }
}
class eg extends tg {
  constructor() {
    super(...arguments), this.KeyframeResolver = Vv;
  }
  sortInstanceNodePosition(t, e) {
    return t.compareDocumentPosition(e) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, e) {
    return t.style ? t.style[e] : void 0;
  }
  removeValueFromRenderState(t, { vars: e, style: i }) {
    delete e[t], delete i[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    ii(t) && (this.childSubscription = t.on("change", (e) => {
      this.current && (this.current.textContent = `${e}`);
    }));
  }
}
const Kw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Gw = dr.length;
function jw(s, t, e) {
  let i = "", n = !0;
  for (let r = 0; r < Gw; r++) {
    const o = dr[r], a = s[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || e) {
      const u = Um(a, Nu[o]);
      if (!l) {
        n = !1;
        const h = Kw[o] || o;
        i += `${h}(${u}) `;
      }
      e && (t[o] = u);
    }
  }
  return i = i.trim(), e ? i = e(t, n ? "" : i) : n && (i = "none"), i;
}
function ig(s, t, e) {
  const { style: i, vars: n, transformOrigin: r } = s;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (pr.has(l)) {
      o = !0;
      continue;
    } else if (_m(l)) {
      n[l] = u;
      continue;
    } else {
      const h = Um(u, Nu[l]);
      l.startsWith("origin") ? (a = !0, r[l] = h) : i[l] = h;
    }
  }
  if (t.transform || (o || e ? i.transform = jw(t, s.transform, e) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: h = 0 } = r;
    i.transformOrigin = `${l} ${u} ${h}`;
  }
}
function ng(s, { style: t, vars: e }, i, n) {
  const r = s.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, i);
  for (o in e)
    r.setProperty(o, e[o]);
}
const Zw = {};
function Qw(s, { layout: t, layoutId: e }) {
  return pr.has(s) || s.startsWith("origin") || (t || e !== void 0) && (!!Zw[s] || s === "opacity");
}
function sg(s, t, e) {
  var r;
  const { style: i } = s, n = {};
  for (const o in i)
    (ii(i[o]) || t.style && ii(t.style[o]) || Qw(o, s) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = i[o]);
  return n;
}
function Jw(s) {
  return window.getComputedStyle(s);
}
class tb extends eg {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ng;
  }
  readValueFromInstance(t, e) {
    var i;
    if (pr.has(e))
      return (i = this.projection) != null && i.isProjecting ? Ic(e) : sv(t, e);
    {
      const n = Jw(t), r = (_m(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return $w(t, e);
  }
  build(t, e, i) {
    ig(t, e, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return sg(t, e, i);
  }
}
function eb(s, t) {
  return s in t;
}
class ib extends tg {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (eb(e, t)) {
      const i = t[e];
      if (typeof i == "string" || typeof i == "number")
        return i;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, e) {
    delete e.output[t];
  }
  measureInstanceViewportBox() {
    return Hu();
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
const nb = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, sb = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function rb(s, t, e = 1, i = 0, n = !0) {
  s.pathLength = 1;
  const r = n ? nb : sb;
  s[r.offset] = ft.transform(-i);
  const o = ft.transform(t), a = ft.transform(e);
  s[r.array] = `${o} ${a}`;
}
function ob(s, {
  attrX: t,
  attrY: e,
  attrScale: i,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, h) {
  if (ig(s, a, u), l) {
    s.style.viewBox && (s.attrs.viewBox = s.style.viewBox);
    return;
  }
  s.attrs = s.style, s.style = {};
  const { attrs: f, style: d } = s;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), e !== void 0 && (f.y = e), i !== void 0 && (f.scale = i), n !== void 0 && rb(f, n, r, o, !1);
}
const rg = /* @__PURE__ */ new Set([
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
]), ab = (s) => typeof s == "string" && s.toLowerCase() === "svg";
function lb(s, t, e, i) {
  ng(s, t, void 0, i);
  for (const n in t.attrs)
    s.setAttribute(rg.has(n) ? n : Vu(n), t.attrs[n]);
}
function cb(s, t, e) {
  const i = sg(s, t, e);
  for (const n in s)
    if (ii(s[n]) || ii(t[n])) {
      const r = dr.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      i[r] = s[n];
    }
  return i;
}
class ub extends eg {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Hu;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (pr.has(e)) {
      const i = Ym(e);
      return i && i.default || 0;
    }
    return e = rg.has(e) ? e : Vu(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return cb(t, e, i);
  }
  build(t, e, i) {
    ob(t, e, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, e, i, n) {
    lb(t, e, i, n);
  }
  mount(t) {
    this.isSVGTag = ab(t.tagName), super.mount(t);
  }
}
function hb(s) {
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
  }, e = $u(s) && !ew(s) ? new ub(t) : new tb(t);
  e.mount(s), Eo.set(s, e);
}
function fb(s) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new ib(t);
  e.mount(s), Eo.set(s, e);
}
function db(s, t, e) {
  const i = ii(s) ? s : To(s);
  return i.start(Zm("", i, t, e)), i.animation;
}
function pb(s, t) {
  return ii(s) || typeof s == "number" || typeof s == "string" && !Bu(t);
}
function og(s, t, e, i) {
  const n = [];
  if (pb(s, t))
    n.push(db(s, Bu(t) && t.default || t, e && (e.default || e)));
  else {
    const r = Gm(s, t, i), o = r.length;
    on(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a];
      on(l !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const u = l instanceof Element ? hb : fb;
      Eo.has(l) || u(l);
      const h = Eo.get(l), f = { ...e };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), n.push(...zw(h, { ...t, transition: f }, {}));
    }
  }
  return n;
}
function mb(s, t, e) {
  const i = [];
  return fw(s, t, e, { spring: So }).forEach(({ keyframes: r, transition: o }, a) => {
    i.push(...og(a, r, o));
  }), i;
}
function gb(s) {
  return Array.isArray(s) && s.some(Array.isArray);
}
function yb(s) {
  function t(e, i, n) {
    let r = [], o;
    if (gb(e))
      r = mb(e, i, s);
    else {
      const { onComplete: l, ...u } = n || {};
      typeof l == "function" && (o = l), r = og(e, i, u, s);
    }
    const a = new Ov(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const q = yb(), _b = 50, Rf = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), vb = () => ({
  time: 0,
  x: Rf(),
  y: Rf()
}), wb = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function zf(s, t, e, i) {
  const n = e[t], { length: r, position: o } = wb[t], a = n.current, l = e.time;
  n.current = s[`scroll${o}`], n.scrollLength = s[`scroll${r}`] - s[`client${r}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = /* @__PURE__ */ Xa(0, n.scrollLength, n.current);
  const u = i - l;
  n.velocity = u > _b ? 0 : Su(n.current - a, u);
}
function bb(s, t, e) {
  zf(s, "x", t, e), zf(s, "y", t, e), t.time = e;
}
function xb(s, t) {
  const e = { x: 0, y: 0 };
  let i = s;
  for (; i && i !== t; )
    if (Hv(i))
      e.x += i.offsetLeft, e.y += i.offsetTop, i = i.offsetParent;
    else if (i.tagName === "svg") {
      const n = i.getBoundingClientRect();
      i = i.parentElement;
      const r = i.getBoundingClientRect();
      e.x += n.left - r.left, e.y += n.top - r.top;
    } else if (i instanceof SVGGraphicsElement) {
      const { x: n, y: r } = i.getBBox();
      e.x += n, e.y += r;
      let o = null, a = i.parentNode;
      for (; !o; )
        a.tagName === "svg" && (o = a), a = i.parentNode;
      i = o;
    } else
      break;
  return e;
}
const Vc = {
  start: 0,
  center: 0.5,
  end: 1
};
function Ff(s, t, e = 0) {
  let i = 0;
  if (s in Vc && (s = Vc[s]), typeof s == "string") {
    const n = parseFloat(s);
    s.endsWith("px") ? i = n : s.endsWith("%") ? s = n / 100 : s.endsWith("vw") ? i = n / 100 * document.documentElement.clientWidth : s.endsWith("vh") ? i = n / 100 * document.documentElement.clientHeight : s = n;
  }
  return typeof s == "number" && (i = t * s), e + i;
}
const Sb = [0, 0];
function Tb(s, t, e, i) {
  let n = Array.isArray(s) ? s : Sb, r = 0, o = 0;
  return typeof s == "number" ? n = [s, s] : typeof s == "string" && (s = s.trim(), s.includes(" ") ? n = s.split(" ") : n = [s, Vc[s] ? s : "0"]), r = Ff(n[0], e, i), o = Ff(n[1], t), r - o;
}
const Eb = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, Ab = { x: 0, y: 0 };
function Cb(s) {
  return "getBBox" in s && s.tagName !== "svg" ? s.getBBox() : { width: s.clientWidth, height: s.clientHeight };
}
function Ob(s, t, e) {
  const { offset: i = Eb.All } = e, { target: n = s, axis: r = "y" } = e, o = r === "y" ? "height" : "width", a = n !== s ? xb(n, s) : Ab, l = n === s ? { width: s.scrollWidth, height: s.scrollHeight } : Cb(n), u = {
    width: s.clientWidth,
    height: s.clientHeight
  };
  t[r].offset.length = 0;
  let h = !t[r].interpolate;
  const f = i.length;
  for (let d = 0; d < f; d++) {
    const c = Tb(i[d], u[o], l[o], a[r]);
    !h && c !== t[r].interpolatorOffsets[d] && (h = !0), t[r].offset[d] = c;
  }
  h && (t[r].interpolate = Pm(t[r].offset, Iu(i), { clamp: !1 }), t[r].interpolatorOffsets = [...t[r].offset]), t[r].progress = Wn(0, 1, t[r].interpolate(t[r].current));
}
function Pb(s, t = s, e) {
  if (e.x.targetOffset = 0, e.y.targetOffset = 0, t !== s) {
    let i = t;
    for (; i && i !== s; )
      e.x.targetOffset += i.offsetLeft, e.y.targetOffset += i.offsetTop, i = i.offsetParent;
  }
  e.x.targetLength = t === s ? t.scrollWidth : t.clientWidth, e.y.targetLength = t === s ? t.scrollHeight : t.clientHeight, e.x.containerLength = s.clientWidth, e.y.containerLength = s.clientHeight, process.env.NODE_ENV !== "production" && s && t && t !== s && Tu(getComputedStyle(s).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function kb(s, t, e, i = {}) {
  return {
    measure: (n) => {
      Pb(s, i.target, e), bb(s, e, n), (i.offset || i.target) && Ob(s, e, i);
    },
    notify: () => t(e)
  };
}
const xr = /* @__PURE__ */ new WeakMap(), Nf = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), $f = (s) => s === document.scrollingElement ? window : s;
function ag(s, { container: t = document.scrollingElement, ...e } = {}) {
  if (!t)
    return Kn;
  let i = Il.get(t);
  i || (i = /* @__PURE__ */ new Set(), Il.set(t, i));
  const n = vb(), r = kb(t, s, n, e);
  if (i.add(r), !xr.has(t)) {
    const a = () => {
      for (const f of i)
        f.measure(wo.timestamp);
      ci.preUpdate(l);
    }, l = () => {
      for (const f of i)
        f.notify();
    }, u = () => ci.read(a);
    xr.set(t, u);
    const h = $f(t);
    window.addEventListener("resize", u, { passive: !0 }), t !== document.documentElement && Nf.set(t, tw(t, u)), h.addEventListener("scroll", u, { passive: !0 }), u();
  }
  const o = xr.get(t);
  return ci.read(o, !1, !0), () => {
    var u;
    Ss(o);
    const a = Il.get(t);
    if (!a || (a.delete(r), a.size))
      return;
    const l = xr.get(t);
    xr.delete(t), l && ($f(t).removeEventListener("scroll", l), (u = Nf.get(t)) == null || u(), window.removeEventListener("resize", l));
  };
}
const Bf = /* @__PURE__ */ new Map();
function Mb(s) {
  const t = { value: 0 }, e = ag((i) => {
    t.value = i[s.axis].progress * 100;
  }, s);
  return { currentTime: t, cancel: e };
}
function lg({ source: s, container: t, ...e }) {
  const { axis: i } = e;
  s && (t = s);
  const n = Bf.get(t) ?? /* @__PURE__ */ new Map();
  Bf.set(t, n);
  const r = e.target ?? "self", o = n.get(r) ?? {}, a = i + (e.offset ?? []).join(",");
  return o[a] || (o[a] = !e.target && Lm() ? new ScrollTimeline({ source: t, axis: i }) : Mb({ container: t, ...e })), o[a];
}
function Ib(s, t) {
  const e = lg(t);
  return s.attachTimeline({
    timeline: t.target ? void 0 : e,
    observe: (i) => (i.pause(), Km((n) => {
      i.time = i.iterationDuration * n;
    }, e))
  });
}
function Db(s) {
  return s.length === 2;
}
function Lb(s, t) {
  return Db(s) ? ag((e) => {
    s(e[t.axis].progress, e);
  }, t) : Km(s, lg(t));
}
function _1(s, { axis: t = "y", container: e = document.scrollingElement, ...i } = {}) {
  if (!e)
    return Kn;
  const n = { axis: t, container: e, ...i };
  return typeof s == "function" ? Lb(s, n) : Ib(s, n);
}
function Rb(s, t) {
  const e = wi.now(), i = ({ timestamp: n }) => {
    const r = n - e;
    r >= t && (Ss(i), s(r - t));
  };
  return ci.setup(i, !0), () => Ss(i);
}
function zb(s, t) {
  return Rb(s, /* @__PURE__ */ Ri(t));
}
var na = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fb(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Nr = { exports: {} };
Nr.exports;
var Vf;
function Nb() {
  return Vf || (Vf = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", d = "[object Error]", c = "[object Function]", m = "[object GeneratorFunction]", p = "[object Map]", y = "[object Number]", v = "[object Null]", A = "[object Object]", C = "[object Proxy]", S = "[object RegExp]", _ = "[object Set]", P = "[object String]", O = "[object Undefined]", T = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", V = "[object Float32Array]", z = "[object Float64Array]", B = "[object Int8Array]", J = "[object Int16Array]", it = "[object Int32Array]", U = "[object Uint8Array]", H = "[object Uint8ClampedArray]", tt = "[object Uint16Array]", at = "[object Uint32Array]", b = /[\\^$.*+?()[\]{}|]/g, j = /^\[object .+?Constructor\]$/, st = /^(?:0|[1-9]\d*)$/, X = {};
    X[V] = X[z] = X[B] = X[J] = X[it] = X[U] = X[H] = X[tt] = X[at] = !0, X[a] = X[l] = X[k] = X[h] = X[R] = X[f] = X[d] = X[c] = X[p] = X[y] = X[A] = X[S] = X[_] = X[P] = X[T] = !1;
    var ot = typeof na == "object" && na && na.Object === Object && na, Dt = typeof self == "object" && self && self.Object === Object && self, yt = ot || Dt || Function("return this")(), Ct = t && !t.nodeType && t, ct = Ct && !0 && s && !s.nodeType && s, Rt = ct && ct.exports === Ct, ne = Rt && ot.process, $t = function() {
      try {
        var g = ct && ct.require && ct.require("util").types;
        return g || ne && ne.binding && ne.binding("util");
      } catch {
      }
    }(), qt = $t && $t.isTypedArray;
    function mt(g, x, L) {
      switch (L.length) {
        case 0:
          return g.call(x);
        case 1:
          return g.call(x, L[0]);
        case 2:
          return g.call(x, L[0], L[1]);
        case 3:
          return g.call(x, L[0], L[1], L[2]);
      }
      return g.apply(x, L);
    }
    function gt(g, x) {
      for (var L = -1, Q = Array(g); ++L < g; )
        Q[L] = x(L);
      return Q;
    }
    function ut(g) {
      return function(x) {
        return g(x);
      };
    }
    function Ae(g, x) {
      return g == null ? void 0 : g[x];
    }
    function I(g, x) {
      return function(L) {
        return g(x(L));
      };
    }
    var Bt = Array.prototype, Ue = Function.prototype, Me = Object.prototype, zt = yt["__core-js_shared__"], Nt = Ue.toString, ce = Me.hasOwnProperty, Xe = function() {
      var g = /[^.]+$/.exec(zt && zt.keys && zt.keys.IE_PROTO || "");
      return g ? "Symbol(src)_1." + g : "";
    }(), Xt = Me.toString, se = Nt.call(Object), Pt = RegExp(
      "^" + Nt.call(ce).replace(b, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), ue = Rt ? yt.Buffer : void 0, Ie = yt.Symbol, ze = yt.Uint8Array;
    ue && ue.allocUnsafe;
    var Xi = I(Object.getPrototypeOf, Object), Ut = Object.create, Ki = Me.propertyIsEnumerable, ni = Bt.splice, _e = Ie ? Ie.toStringTag : void 0, De = function() {
      try {
        var g = Za(Object, "defineProperty");
        return g({}, "", {}), g;
      } catch {
      }
    }(), Ti = ue ? ue.isBuffer : void 0, Fe = Math.max, lt = Date.now, Ne = Za(yt, "Map"), Ft = Za(Object, "create"), Ce = /* @__PURE__ */ function() {
      function g() {
      }
      return function(x) {
        if (!un(x))
          return {};
        if (Ut)
          return Ut(x);
        g.prototype = x;
        var L = new g();
        return g.prototype = void 0, L;
      };
    }();
    function ee(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Q = g[x];
        this.set(Q[0], Q[1]);
      }
    }
    function Ei() {
      this.__data__ = Ft ? Ft(null) : {}, this.size = 0;
    }
    function Z(g) {
      var x = this.has(g) && delete this.__data__[g];
      return this.size -= x ? 1 : 0, x;
    }
    function w(g) {
      var x = this.__data__;
      if (Ft) {
        var L = x[g];
        return L === i ? void 0 : L;
      }
      return ce.call(x, g) ? x[g] : void 0;
    }
    function $(g) {
      var x = this.__data__;
      return Ft ? x[g] !== void 0 : ce.call(x, g);
    }
    function E(g, x) {
      var L = this.__data__;
      return this.size += this.has(g) ? 0 : 1, L[g] = Ft && x === void 0 ? i : x, this;
    }
    ee.prototype.clear = Ei, ee.prototype.delete = Z, ee.prototype.get = w, ee.prototype.has = $, ee.prototype.set = E;
    function M(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Q = g[x];
        this.set(Q[0], Q[1]);
      }
    }
    function N() {
      this.__data__ = [], this.size = 0;
    }
    function D(g) {
      var x = this.__data__, L = ln(x, g);
      if (L < 0)
        return !1;
      var Q = x.length - 1;
      return L == Q ? x.pop() : ni.call(x, L, 1), --this.size, !0;
    }
    function Y(g) {
      var x = this.__data__, L = ln(x, g);
      return L < 0 ? void 0 : x[L][1];
    }
    function F(g) {
      return ln(this.__data__, g) > -1;
    }
    function W(g, x) {
      var L = this.__data__, Q = ln(L, g);
      return Q < 0 ? (++this.size, L.push([g, x])) : L[Q][1] = x, this;
    }
    M.prototype.clear = N, M.prototype.delete = D, M.prototype.get = Y, M.prototype.has = F, M.prototype.set = W;
    function et(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Q = g[x];
        this.set(Q[0], Q[1]);
      }
    }
    function K() {
      this.size = 0, this.__data__ = {
        hash: new ee(),
        map: new (Ne || M)(),
        string: new ee()
      };
    }
    function dt(g) {
      var x = Fo(this, g).delete(g);
      return this.size -= x ? 1 : 0, x;
    }
    function St(g) {
      return Fo(this, g).get(g);
    }
    function Ot(g) {
      return Fo(this, g).has(g);
    }
    function _t(g, x) {
      var L = Fo(this, g), Q = L.size;
      return L.set(g, x), this.size += L.size == Q ? 0 : 1, this;
    }
    et.prototype.clear = K, et.prototype.delete = dt, et.prototype.get = St, et.prototype.has = Ot, et.prototype.set = _t;
    function pt(g) {
      var x = this.__data__ = new M(g);
      this.size = x.size;
    }
    function kt() {
      this.__data__ = new M(), this.size = 0;
    }
    function ht(g) {
      var x = this.__data__, L = x.delete(g);
      return this.size = x.size, L;
    }
    function ve(g) {
      return this.__data__.get(g);
    }
    function Kt(g) {
      return this.__data__.has(g);
    }
    function we(g, x) {
      var L = this.__data__;
      if (L instanceof M) {
        var Q = L.__data__;
        if (!Ne || Q.length < e - 1)
          return Q.push([g, x]), this.size = ++L.size, this;
        L = this.__data__ = new et(Q);
      }
      return L.set(g, x), this.size = L.size, this;
    }
    pt.prototype.clear = kt, pt.prototype.delete = ht, pt.prototype.get = ve, pt.prototype.has = Kt, pt.prototype.set = we;
    function be(g, x) {
      var L = tl(g), Q = !L && Ja(g), Tt = !L && !Q && ju(g), Mt = !L && !Q && !Tt && Qu(g), Gt = L || Q || Tt || Mt, It = Gt ? gt(g.length, String) : [], jt = It.length;
      for (var Ni in g)
        Gt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ni == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Tt && (Ni == "offset" || Ni == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Mt && (Ni == "buffer" || Ni == "byteLength" || Ni == "byteOffset") || // Skip index properties.
        Ku(Ni, jt)) || It.push(Ni);
      return It;
    }
    function he(g, x, L) {
      (L !== void 0 && !No(g[x], L) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function an(g, x, L) {
      var Q = g[x];
      (!(ce.call(g, x) && No(Q, L)) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function ln(g, x) {
      for (var L = g.length; L--; )
        if (No(g[L][0], x))
          return L;
      return -1;
    }
    function fe(g, x, L) {
      x == "__proto__" && De ? De(g, x, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : g[x] = L;
    }
    var re = Eg();
    function Ke(g) {
      return g == null ? g === void 0 ? O : v : _e && _e in Object(g) ? Ag(g) : Ig(g);
    }
    function Es(g) {
      return mr(g) && Ke(g) == a;
    }
    function zo(g) {
      if (!un(g) || kg(g))
        return !1;
      var x = il(g) ? Pt : j;
      return x.test(zg(g));
    }
    function Gn(g) {
      return mr(g) && Zu(g.length) && !!X[Ke(g)];
    }
    function Ai(g) {
      if (!un(g))
        return Mg(g);
      var x = Gu(g), L = [];
      for (var Q in g)
        Q == "constructor" && (x || !ce.call(g, Q)) || L.push(Q);
      return L;
    }
    function cn(g, x, L, Q, Tt) {
      g !== x && re(x, function(Mt, Gt) {
        if (Tt || (Tt = new pt()), un(Mt))
          As(g, x, Gt, L, cn, Q, Tt);
        else {
          var It = Q ? Q(Qa(g, Gt), Mt, Gt + "", g, x, Tt) : void 0;
          It === void 0 && (It = Mt), he(g, Gt, It);
        }
      }, Ju);
    }
    function As(g, x, L, Q, Tt, Mt, Gt) {
      var It = Qa(g, L), jt = Qa(x, L), Ni = Gt.get(jt);
      if (Ni) {
        he(g, L, Ni);
        return;
      }
      var hi = Mt ? Mt(It, jt, L + "", g, x, Gt) : void 0, gr = hi === void 0;
      if (gr) {
        var nl = tl(jt), sl = !nl && ju(jt), eh = !nl && !sl && Qu(jt);
        hi = jt, nl || sl || eh ? tl(It) ? hi = It : Fg(It) ? hi = xg(It) : sl ? (gr = !1, hi = vg(jt)) : eh ? (gr = !1, hi = bg(jt)) : hi = [] : Ng(jt) || Ja(jt) ? (hi = It, Ja(It) ? hi = $g(It) : (!un(It) || il(It)) && (hi = Cg(jt))) : gr = !1;
      }
      gr && (Gt.set(jt, hi), Tt(hi, jt, Q, Mt, Gt), Gt.delete(jt)), he(g, L, hi);
    }
    function Fi(g, x) {
      return Lg(Dg(g, x, th), g + "");
    }
    var _g = De ? function(g, x) {
      return De(g, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Hg(x),
        writable: !0
      });
    } : th;
    function vg(g, x) {
      return g.slice();
    }
    function wg(g) {
      var x = new g.constructor(g.byteLength);
      return new ze(x).set(new ze(g)), x;
    }
    function bg(g, x) {
      var L = wg(g.buffer);
      return new g.constructor(L, g.byteOffset, g.length);
    }
    function xg(g, x) {
      var L = -1, Q = g.length;
      for (x || (x = Array(Q)); ++L < Q; )
        x[L] = g[L];
      return x;
    }
    function Sg(g, x, L, Q) {
      var Tt = !L;
      L || (L = {});
      for (var Mt = -1, Gt = x.length; ++Mt < Gt; ) {
        var It = x[Mt], jt = void 0;
        jt === void 0 && (jt = g[It]), Tt ? fe(L, It, jt) : an(L, It, jt);
      }
      return L;
    }
    function Tg(g) {
      return Fi(function(x, L) {
        var Q = -1, Tt = L.length, Mt = Tt > 1 ? L[Tt - 1] : void 0, Gt = Tt > 2 ? L[2] : void 0;
        for (Mt = g.length > 3 && typeof Mt == "function" ? (Tt--, Mt) : void 0, Gt && Og(L[0], L[1], Gt) && (Mt = Tt < 3 ? void 0 : Mt, Tt = 1), x = Object(x); ++Q < Tt; ) {
          var It = L[Q];
          It && g(x, It, Q, Mt);
        }
        return x;
      });
    }
    function Eg(g) {
      return function(x, L, Q) {
        for (var Tt = -1, Mt = Object(x), Gt = Q(x), It = Gt.length; It--; ) {
          var jt = Gt[++Tt];
          if (L(Mt[jt], jt, Mt) === !1)
            break;
        }
        return x;
      };
    }
    function Xu(g, x, L, Q, Tt, Mt) {
      return un(g) && un(x) && (Mt.set(x, g), cn(g, x, void 0, Xu, Mt), Mt.delete(x)), g;
    }
    function Fo(g, x) {
      var L = g.__data__;
      return Pg(x) ? L[typeof x == "string" ? "string" : "hash"] : L.map;
    }
    function Za(g, x) {
      var L = Ae(g, x);
      return zo(L) ? L : void 0;
    }
    function Ag(g) {
      var x = ce.call(g, _e), L = g[_e];
      try {
        g[_e] = void 0;
        var Q = !0;
      } catch {
      }
      var Tt = Xt.call(g);
      return Q && (x ? g[_e] = L : delete g[_e]), Tt;
    }
    function Cg(g) {
      return typeof g.constructor == "function" && !Gu(g) ? Ce(Xi(g)) : {};
    }
    function Ku(g, x) {
      var L = typeof g;
      return x = x ?? o, !!x && (L == "number" || L != "symbol" && st.test(g)) && g > -1 && g % 1 == 0 && g < x;
    }
    function Og(g, x, L) {
      if (!un(L))
        return !1;
      var Q = typeof x;
      return (Q == "number" ? el(L) && Ku(x, L.length) : Q == "string" && x in L) ? No(L[x], g) : !1;
    }
    function Pg(g) {
      var x = typeof g;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? g !== "__proto__" : g === null;
    }
    function kg(g) {
      return !!Xe && Xe in g;
    }
    function Gu(g) {
      var x = g && g.constructor, L = typeof x == "function" && x.prototype || Me;
      return g === L;
    }
    function Mg(g) {
      var x = [];
      if (g != null)
        for (var L in Object(g))
          x.push(L);
      return x;
    }
    function Ig(g) {
      return Xt.call(g);
    }
    function Dg(g, x, L) {
      return x = Fe(x === void 0 ? g.length - 1 : x, 0), function() {
        for (var Q = arguments, Tt = -1, Mt = Fe(Q.length - x, 0), Gt = Array(Mt); ++Tt < Mt; )
          Gt[Tt] = Q[x + Tt];
        Tt = -1;
        for (var It = Array(x + 1); ++Tt < x; )
          It[Tt] = Q[Tt];
        return It[x] = L(Gt), mt(g, this, It);
      };
    }
    function Qa(g, x) {
      if (!(x === "constructor" && typeof g[x] == "function") && x != "__proto__")
        return g[x];
    }
    var Lg = Rg(_g);
    function Rg(g) {
      var x = 0, L = 0;
      return function() {
        var Q = lt(), Tt = r - (Q - L);
        if (L = Q, Tt > 0) {
          if (++x >= n)
            return arguments[0];
        } else
          x = 0;
        return g.apply(void 0, arguments);
      };
    }
    function zg(g) {
      if (g != null) {
        try {
          return Nt.call(g);
        } catch {
        }
        try {
          return g + "";
        } catch {
        }
      }
      return "";
    }
    function No(g, x) {
      return g === x || g !== g && x !== x;
    }
    var Ja = Es(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Es : function(g) {
      return mr(g) && ce.call(g, "callee") && !Ki.call(g, "callee");
    }, tl = Array.isArray;
    function el(g) {
      return g != null && Zu(g.length) && !il(g);
    }
    function Fg(g) {
      return mr(g) && el(g);
    }
    var ju = Ti || Yg;
    function il(g) {
      if (!un(g))
        return !1;
      var x = Ke(g);
      return x == c || x == m || x == u || x == C;
    }
    function Zu(g) {
      return typeof g == "number" && g > -1 && g % 1 == 0 && g <= o;
    }
    function un(g) {
      var x = typeof g;
      return g != null && (x == "object" || x == "function");
    }
    function mr(g) {
      return g != null && typeof g == "object";
    }
    function Ng(g) {
      if (!mr(g) || Ke(g) != A)
        return !1;
      var x = Xi(g);
      if (x === null)
        return !0;
      var L = ce.call(x, "constructor") && x.constructor;
      return typeof L == "function" && L instanceof L && Nt.call(L) == se;
    }
    var Qu = qt ? ut(qt) : Gn;
    function $g(g) {
      return Sg(g, Ju(g));
    }
    var Bg = Fi(function(g) {
      return g.push(void 0, Xu), mt(Vg, void 0, g);
    });
    function Ju(g) {
      return el(g) ? be(g) : Ai(g);
    }
    var Vg = Tg(function(g, x, L, Q) {
      cn(g, x, L, Q);
    });
    function Hg(g) {
      return function() {
        return g;
      };
    }
    function th(g) {
      return g;
    }
    function Yg() {
      return !1;
    }
    s.exports = Bg;
  }(Nr, Nr.exports)), Nr.exports;
}
var $b = Nb();
const Wt = /* @__PURE__ */ Fb($b), Bb = 60, Sr = {}, Hf = (s, t = Bb) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  Sr[s] = Sr[s] || null;
  const r = Sr[s] ? i - Sr[s] : null;
  (r === null || r > n) && (Sr[s] = i - r % n, s(...e));
});
function Ao() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const Hc = (s, t, e, i, n, r) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? Hc(o, t, e - 1, i, n, r) : Hc(s, o, e - 1, i, n, r);
}, Vb = (s, t, e, i, n, r) => Hc(e, i, n, r, s, t), Hb = () => Math.round(
  Vb("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, Yb = (s) => Math.round(window.devicePixelRatio * 100) - s, Wb = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Dl = {
  firefox: Hb,
  chrome: Yb,
  default: Wb
}, Yf = {
  calculate: (s, t) => Dl[s] ? Dl[s](t) : Dl.default(t)
}, Yu = "APPLICATION:MOBILE_MENU:OPEN", Wu = "APPLICATION:MOBILE_MENU:CLOSED", $a = "APPLICATION_PRELUDIUM", Yc = "APPLICATION:INITIALIZED", Co = "APPLICATION:READY", zi = "APPLICATION:REVEALED", Ui = "APPLICATION:RESIZE", Un = "APPLICATION:SCROLL", cg = "APPLICATION:SCROLL_LOCKED", ug = "APPLICATION:SCROLL_RELEASED", Ka = "APPLICATION:FORCED_SCROLL_START", Ga = "APPLICATION:FORCED_SCROLL_END", ja = "APPLICATION:OUTLINE", hg = "APPLICATION:VISIBILITY_CHANGE", fg = "APPLICATION:HIDDEN", dg = "APPLICATION:VISIBLE", Ba = "BREAKPOINT:CHANGE", qu = "IMAGE:LAZYLOADED", pg = "IMAGE:REVEALED", mg = "SECTION:LAZYLOADED", v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: Ga,
  APPLICATION_FORCED_SCROLL_START: Ka,
  APPLICATION_HIDDEN: fg,
  APPLICATION_INITIALIZED: Yc,
  APPLICATION_MOBILE_MENU_CLOSED: Wu,
  APPLICATION_MOBILE_MENU_OPEN: Yu,
  APPLICATION_OUTLINE: ja,
  APPLICATION_PRELUDIUM: $a,
  APPLICATION_READY: Co,
  APPLICATION_RESIZE: Ui,
  APPLICATION_REVEALED: zi,
  APPLICATION_SCROLL: Un,
  APPLICATION_SCROLL_LOCKED: cg,
  APPLICATION_SCROLL_RELEASED: ug,
  APPLICATION_VISIBILITY_CHANGE: hg,
  APPLICATION_VISIBLE: dg,
  BREAKPOINT_CHANGE: Ba,
  IMAGE_LAZYLOADED: qu,
  IMAGE_REVEALED: pg,
  SECTION_LAZYLOADED: mg
}, Symbol.toStringTag, { value: "Module" })), qb = {
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
class Wf {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = Wt(e, qb), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener($a, () => {
      this.initialize(!1);
    }), window.addEventListener(zi, () => {
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
        let n = "";
        const r = e[(e.indexOf(i) + 1) % e.length];
        i === this.opts.breakpoints[0] && this.mediaQueries[i] === "0" ? n = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[r]) - 1}px)` : r === this.opts.breakpoints[0] ? n = `(min-width: ${this.mediaQueries[i]})` : n = `(min-width: ${this.mediaQueries[i]}) and (max-width: ${parseInt(this.mediaQueries[r]) - 1}px)`, this.mediaQueries[i] = window.matchMedia(n);
        const o = (a) => {
          if (a.matches) {
            const l = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), l !== this.currentBreakpoint) {
              const u = new CustomEvent(Ba, {
                detail: {
                  leaveBreakpoint: l,
                  enterBreakpoint: this.currentBreakpoint
                }
              });
              window.dispatchEvent(u);
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
        }, n = new CustomEvent(Ba);
        window.dispatchEvent(n), Object.prototype.hasOwnProperty.call(this.opts.listeners, e.key) && this.opts.listeners[e.key](i);
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
class Ub {
  constructor(t, e) {
    this.app = t, this.testFns = {
      touch: this.testTouch
    }, this.results = {}, this.testIE11() ? this.testFor("ie11", !0) : this.results.ie11 = !1, this.testIOS() ? this.testFor("ios", !0) : this.results.ios = !1, this.testWebview() ? this.testFor("webview", !0) : this.results.webview = !1;
    const i = this.testBrowsers();
    this.results.browser = i, this.app.browser = i, document.documentElement.setAttribute("data-browser", i);
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
        const e = new window.CustomEvent(ja);
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
class Xb {
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
class Kb {
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
    const i = t.getBoundingClientRect(), n = this.outerHeight(t), r = i.top + n, o = e.getBoundingClientRect(), a = this.outerHeight(e), l = o.top + a;
    return r > o.top ? r - o.top : i.top > l ? i.top - l : 0;
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
    const e = t.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, r = e.top <= i && e.top + e.height >= 0, o = e.left <= n && e.left + e.width >= 0;
    return r && o;
  }
  /**
   * Strict viewport check - element must be fully contained within viewport bounds
   * Useful for popovers/tooltips that need to be completely visible
   *
   * @param {*} el
   */
  inViewportStrict(t) {
    const e = t.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, n = window.innerWidth || document.documentElement.clientWidth, r = e.top >= 0 && e.bottom <= i, o = e.left >= 0 && e.right <= n;
    return r && o;
  }
}
const rt = new Kb();
function nt(s, t) {
  let e;
  typeof s == "string" ? e = Array.from(document.querySelectorAll(s)) : s instanceof NodeList ? e = Array.from(s) : Array.isArray(s) ? e = s : e = [s], e.forEach((i) => {
    if (!i) return;
    const n = [], r = {};
    Object.entries(t).forEach(([o, a]) => {
      o === "x" ? n.push(`translateX(${typeof a == "number" ? a + "px" : a})`) : o === "y" ? n.push(`translateY(${typeof a == "number" ? a + "px" : a})`) : o === "scale" ? n.push(`scale(${a})`) : o === "scaleX" ? n.push(`scaleX(${a})`) : o === "scaleY" ? n.push(`scaleY(${a})`) : o === "rotate" ? n.push(`rotate(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateX" ? n.push(`rotateX(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateY" ? n.push(`rotateY(${typeof a == "number" ? a + "deg" : a})`) : o === "rotateZ" ? n.push(`rotateZ(${typeof a == "number" ? a + "deg" : a})`) : r[o] = a;
    }), n.length > 0 && (i.style.transform = n.join(" ")), Object.entries(r).forEach(([o, a]) => {
      i.style[o] = a;
    });
  });
}
function so(s, t, e = {}) {
  const i = typeof s == "string" ? document.querySelector(s) : s;
  return t === 0 ? q(i, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      i.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (i.style.visibility = "visible", q(i, { opacity: t }, e));
}
function Wi(s, t = "all") {
  let e;
  typeof s == "string" ? e = Array.from(document.querySelectorAll(s)) : s instanceof NodeList ? e = Array.from(s) : Array.isArray(s) ? e = s : e = [s], e.forEach((i) => {
    i && (t === "all" ? i.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((r) => {
      i.style.removeProperty(r);
    }));
  });
}
function Ll(s, t) {
  return new Promise((e) => {
    zb(() => {
      t(), e();
    }, s);
  });
}
class qf {
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
  to(t, e, i = {}) {
    return this.sequence.push(["animate", t, e, i]), this;
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
        const [, i, n, r] = e;
        if (n.autoAlpha !== void 0) {
          const o = { ...r };
          delete o.autoAlpha, await so(i, n.autoAlpha, o).finished;
        } else
          await q(i, n, r).finished;
      } else e[0] === "call" && e[1]();
  }
}
function sa(s) {
  if (Array.isArray(s))
    return s;
  if (typeof s != "string")
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
  ].includes(s))
    return s;
  const i = {
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
  }[s.toLowerCase()];
  return i || (console.warn(
    `[Motion Helpers] Unknown easing type "${s}", using "easeOut" as fallback`
  ), "easeOut");
}
window.onpageshow = (s) => {
  const t = window.location.hash;
  if (s.persisted || t) {
    const i = () => {
      const n = document.querySelector("#fader");
      n && (nt(n, { opacity: 0, display: "none" }), n.style.visibility = "hidden");
      const r = document.querySelectorAll("[data-fader]");
      r.length && (nt(r, { opacity: 0 }), r.forEach((u) => u.style.visibility = "hidden")), Wi(document.body, ["opacity"]), document.body.classList.remove("unloaded");
      const o = rt.find("header[data-nav]");
      o && Wi(o, ["opacity", "transform"]);
      const a = rt.find("main");
      a && Wi(a, ["opacity", "transform"]);
      const l = rt.find("footer");
      l && Wi(l, ["opacity", "transform"]);
    };
    s.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const Uf = {
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
    fadeIn: (s = () => {
    }) => {
      const t = document.querySelector("#fader");
      if (!t) {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), s();
        return;
      }
      q(t, { opacity: 0 }, { duration: 0.65 }).finished.then(() => {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), s();
      });
    }
  }
};
class w1 {
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
    delete t.breakpointConfig, this.opts = Wt(t, Uf), this.opts.breakpointConfig = e || Uf.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Ub(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Wf(this, this.opts.breakpointConfig) : this.breakpoints = new Wf(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new Xb(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = Ao(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && document.documentElement.classList.add("prefers-reduced-motion"), window.addEventListener(Ba, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent($a, this), this.initializedEvent = new window.CustomEvent(Yc, this), this.readyEvent = new window.CustomEvent(Co, this), this.revealedEvent = new window.CustomEvent(zi, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", Hf(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", Hf(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks($a), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(Yc), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(Co), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), nt(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Yf.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Yf.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(cg, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, nt(document.body, { overflow: "hidden" }), nt(this._scrollPaddedElements, {
      paddingRight: `${e}px`
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(ug, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, nt(document.body, { overflow: t }), Wi(this._scrollPaddedElements, ["paddingRight"]), document.removeEventListener("touchmove", this.scrollVoid, !1);
  }
  /**
   *
   * @param {*} target
   * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
   * @param {*} time
   * @param {*} emitEvents
   */
  scrollTo(t, e = 0.8, i = !0, n = "easeInOut") {
    const r = new window.CustomEvent(Ka);
    this.state.forcedScroll = !0, i && window.dispatchEvent(r);
    let o = 0;
    if (typeof t == "number")
      o = t;
    else if (typeof t == "string") {
      const c = document.querySelector(t);
      c && (o = c.getBoundingClientRect().top + window.pageYOffset);
    } else if (t instanceof Element)
      o = t.getBoundingClientRect().top + window.pageYOffset;
    else if (typeof t == "object") {
      const c = t.y;
      if (c instanceof Element)
        o = c.getBoundingClientRect().top + window.pageYOffset;
      else if (typeof c == "string") {
        const m = document.querySelector(c);
        m && (o = m.getBoundingClientRect().top + window.pageYOffset);
      } else typeof c == "number" && (o = c);
      t.offsetY && (o += t.offsetY);
    }
    const a = window.pageYOffset, l = o - a, u = e * 1e3, h = performance.now(), f = (c) => c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c, d = (c) => {
      const m = c - h, p = Math.min(m / u, 1), y = f(p), v = a + l * y;
      if (window.scrollTo(0, v), p < 1)
        requestAnimationFrame(d);
      else {
        const A = new window.CustomEvent(Ga);
        i && (window.dispatchEvent(A), requestAnimationFrame(() => this.state.forcedScroll = !1));
      }
    };
    requestAnimationFrame(d);
  }
  hardScrollToTop() {
    window.scrollTo(0, 0);
  }
  hardScrollTo(t) {
    const e = rt.find(t);
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
      const t = rt.all('source[type="image/webp"]');
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(zi));
  }
  _getBaseVW() {
    const t = rt.getCSSVar("--font-base-px"), e = parseFloat(t, 10), i = window.innerWidth;
    return `${e / i * 100}vw`;
  }
  setDims() {
    const t = document.querySelector(":root");
    this.size.initialInnerHeight = window.innerHeight, this.size.initialOuterHeight = window.outerHeight, this.size.initialInnerWidth = window.innerWidth, this.size.initialOuterWidth = window.outerWidth, this.size.scrollHeight = document.body.scrollHeight, t.style.setProperty("--vp-initial-inner-h", `${this.size.initialInnerHeight}px`), t.style.setProperty("--vp-initial-outer-h", `${this.size.initialOuterHeight}px`), t.style.setProperty("--vp-initial-inner-w", `${this.size.initialInnerWidth}px`), t.style.setProperty("--vp-initial-outer-w", `${this.size.initialOuterWidth}px`), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = rt.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
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
    this.size.container = rt.getCSSVar("--container-padding");
  }
  /**
   * RAF'ed resize event
   */
  onResize(t) {
    const e = this.size.width !== window.innerWidth, i = this.size.height !== window.innerHeight, n = e || i, r = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(n, r), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
    const o = new CustomEvent(Ui, {
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
    }, i = new CustomEvent(Un, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(hg, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(fg, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(dg, t), window.dispatchEvent(e));
  }
  pollForElement(t, e = 500, i = () => {
  }) {
    const n = document.querySelector(t);
    n !== null ? i(n) : setTimeout(() => {
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
    nt(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
    const e = t.querySelector("span"), i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    e.addEventListener("click", () => {
      const r = t.querySelector("b"), o = document.createElement("textarea");
      o.value = `
${r.textContent}
SCREEN >> ${window.screen.width}x${window.screen.height}
WINDOW >> ${i}x${n}

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
        q([t, e], { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
          [t, e].forEach((i) => i.style.visibility = "hidden"), q([t, e], { width: 0 }, { duration: 0.7 }).finished.then(() => {
            nt([t, e], { display: "none" });
          });
        });
        break;
      case 1:
        nt(t, { width: "auto", display: "block" }), t.style.visibility = "visible", q(t, { width: [0, "auto"] }, { duration: 0.7 }).finished.then(() => {
          q(t, { opacity: 1 }, { duration: 0.3 });
        });
        break;
      case 2:
        nt(e, { width: "auto", display: "block" }), e.style.visibility = "visible", q(e, { width: [0, "auto"] }, { duration: 0.7 }).finished.then(() => {
          q(e, { opacity: 1 }, { duration: 0.3 });
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
        const i = rt.find(".dbg-grid"), n = rt.all(i, "b");
        if (!i || !n)
          return;
        rt.hasClass(i, "visible") ? (nt(n, { width: "auto" }), q(
          n,
          {
            width: 0
          },
          {
            duration: 0.35,
            delay: qn(0.02),
            ease: "easeInOut"
          }
        ).finished.then(() => {
          i.classList.toggle("visible");
        })) : (nt(n, { width: 0 }), i.classList.toggle("visible"), q(
          n,
          {
            width: "100%"
          },
          {
            duration: 0.35,
            delay: qn(0.02),
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
const Gb = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s);
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, ease: "easeIn", at: 0 }]
    ];
    q(e).finished.then(() => {
      s.cc.style.display = "none";
    });
  },
  onRefuse: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 0, t, "/");
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, ease: "easeIn", at: 0 }]
    ];
    q(e).finished.then(() => {
      s.cc.style.display = "none";
    });
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
    s.cc.style.display = "block", nt(s.cc, { opacity: 1 }), nt(s.inner, { opacity: 1 });
    const t = [
      [s.cc, { y: ["120%", "0%"] }, { duration: 0.5, ease: "easeOut", at: 1 }],
      [s.text, { opacity: [0, 1] }, { duration: 0.7, ease: "easeOut", at: 1.15 }],
      [s.btns, { opacity: [0, 1] }, { duration: 0.7, ease: "easeOut", at: 1.5 }]
    ];
    q(t);
  }
};
class b1 {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, Gb), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(zi, () => {
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
  setCookie(t, e, i, n, r, o) {
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
    return document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)}${a}${r ? `; domain=${r}` : ""}${n ? `; path=${n}` : ""}${o ? "; secure" : ""}`, !0;
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
const jb = {};
class x1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, jb), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-cover-overlay]");
    Array.from(t).forEach((e) => {
      let i;
      const n = e.querySelector(".picture-wrapper"), r = e.querySelector("[data-cover-overlay-button]"), o = e.querySelector("iframe");
      o && o.setAttribute(
        "allow",
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ), e.hasAttribute("data-cover-overlay-vimeo-play") && (window.Vimeo && o ? i = new window.Vimeo.Player(o) : console.error("==> JUPITER// Missing vimeo JS or iframe")), r.addEventListener("click", () => {
        q([
          [r, { opacity: 0 }, { duration: 0.5, ease: "easeIn", at: 0 }],
          [n, { opacity: 0 }, { duration: 1, ease: "easeIn", at: 0 }],
          [o, { opacity: 1 }, { duration: 0.5, ease: "easeOut", at: 0.5 }],
          [n, { display: "none" }, { duration: 0, at: 1 }]
        ]).finished.then(() => {
          i ? i.play() : o && o.src.includes("youtube.com") && o.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        });
      });
    });
  }
}
class Zb {
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
    let i = e;
    return Object.entries(t).forEach(([n, r]) => {
      const o = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || [], a = !r || o.includes(r);
      i = i.replace(`:${n}`, a ? "" : r);
    }), i = i.replace(/\/:[^\/]+/g, ""), i = i.replace(/\/+$/, ""), (!i || i === "") && (i = e.split(":")[0].replace(/\/+$/, "") || "/"), this.languageInPath && (this.language !== this.defaultLanguage || !this.hideDefaultLanguage) && !i.startsWith(`/${this.language}/`) && (i = `/${this.language}${i}`), i;
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
    let i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const n = [];
    i = i.replace(/:(\w+)/g, (h, f) => (n.push(f), "([^/]+)"));
    const r = t.split("/"), o = e.split("/");
    if (o.length <= r.length) {
      let f = r.slice(0, o.length).join("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const d = [];
      f = f.replace(/:(\w+)/g, (p, y) => (d.push(y), "([^/]+)"));
      const c = new RegExp(`^${f}$`), m = e.match(c);
      if (m) {
        const p = {};
        return d.forEach((y, v) => {
          m[v + 1] && (p[y] = decodeURIComponent(m[v + 1]));
        }), p;
      }
    }
    const a = new RegExp(`^${i}$`), l = e.match(a);
    if (!l)
      return {};
    const u = {};
    return n.forEach((h, f) => {
      l[f + 1] && (u[h] = decodeURIComponent(l[f + 1]));
    }), u;
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
    }), this.dataloader.opts.loaderParam = {}, Object.entries(t).forEach(([e, i]) => {
      const n = this.dataloader.$paramEls.find((r) => (r.dataset.loaderParamKey || "defaultParam") === e && r.dataset.loaderParam === i);
      n && n.setAttribute("data-loader-param-selected", ""), e === "defaultParam" ? this.dataloader.opts.loaderParam.defaultParam = i : this.dataloader.opts.loaderParam[e] = i;
    });
  }
  /**
   * Clean up event listeners
   */
  destroy() {
    this.popstateHandler && window.removeEventListener("popstate", this.popstateHandler);
  }
}
const Qb = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (s) => {
  }
};
class S1 {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = rt.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = rt.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = rt.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = Wt(i, Qb), this.initialize();
  }
  static replaceInnerHTML(t, e) {
    return new Promise((i) => {
      fetch(e).then((n) => n.text()).then((n) => (t.innerHTML = n, i(t)));
    });
  }
  debounce(t, e = 650) {
    let i;
    return (...n) => {
      clearTimeout(i), i = setTimeout(() => {
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = rt.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new Zb(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
      e.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = rt.find(this.$el, "[data-loader-more]"), !this.$moreBtn && this.id && (this.$moreBtn = rt.find(`[data-loader-more-for="${this.id}"]`)), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = rt.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.id && (this.$filterInput = rt.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener("input", this.debounce(this.onFilterInput.bind(this)));
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
      e ? this.opts.loaderParam[i] = this.opts.loaderParam[i].filter((n) => n !== t.currentTarget.dataset.loaderParam) : delete this.opts.loaderParam[i], t.currentTarget.removeAttribute("data-loader-param-selected");
    } else if (e) {
      const i = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam.hasOwnProperty(i) || (this.opts.loaderParam[i] = []), this.opts.loaderParam[i].push(t.currentTarget.dataset.loaderParam), t.currentTarget.setAttribute("data-loader-param-selected", "");
    } else {
      const i = t.currentTarget.dataset.loaderParamKey;
      this.$paramEls.forEach((r) => {
        i ? r.dataset.loaderParamKey === i && r.removeAttribute("data-loader-param-selected") : r.removeAttribute("data-loader-param-selected");
      }), t.currentTarget.setAttribute("data-loader-param-selected", "");
      const n = t.currentTarget.dataset.loaderParamKey || "defaultParam";
      this.opts.loaderParam[n] = t.currentTarget.dataset.loaderParam;
    }
    this.urlSync && this.urlSync.updateUrl(this.opts.loaderParam), this.fetch();
  }
  fetch(t = !1) {
    const { defaultParam: e, ...i } = this.opts.loaderParam, n = this.opts.filter, r = `${this.baseURL}/${e ? e + "/" : ""}${this.opts.page}?` + new URLSearchParams({ filter: n, ...i });
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
const Jb = {
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
class T1 {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Wt(e, Jb), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = Jp.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = rt.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
      const i = this.elements.trigger.getAttribute(
        "data-dropdown-target"
      );
      this.elements.menu = rt.find(i);
    } else
      this.elements.menu = rt.find(this.element, this.opts.selectors.menu);
    this.elements.menuItems = rt.all(
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
      const t = this.elements.menu.getBoundingClientRect(), e = window.innerHeight, i = window.innerWidth, n = t.height, r = t.top;
      rt.setCSSVar(
        "dropdown-menu-height",
        `${n}px`,
        this.elements.menu
      ), n + r > e ? this.elements.menu.setAttribute("data-dropdown-placement", "top") : this.elements.menu.setAttribute("data-dropdown-placement", "bottom");
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
const t1 = {};
class E1 {
  constructor(t, e, i = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = Wt(i, t1), this.selector = e, this.initialize(), window.addEventListener(Ui, () => {
      Wi("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
    });
  }
  initialize() {
    const t = rt.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const n = [];
      let r = [], o = 0;
      rt.all(e, this.selector).forEach((l) => {
        const u = l.getBoundingClientRect();
        if (i === null) {
          o = u.height, r.push(l), i = u.top;
          return;
        }
        i !== u.top ? (console.debug("== pushing actionables", { elements: r, height: o }), n.push({ elements: r, height: o }), r = [], o = u.height) : i === u.top ? u.height > o && (o = u.height) : o = u.height, r.push(l), i = u.top;
      }), r.length && n.push({ elements: r, height: o }), n.length && n.forEach((l) => {
        l.elements.forEach((u) => {
          u.style.minHeight = `${l.height}px`, u.setAttribute("data-eq-height-elements-adjusted", "true");
        });
      });
    });
  }
}
function Ro(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(qu, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function Uu(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const n = s[i];
    e.push(Ro(n, t));
  }
  return Promise.all(e);
}
const e1 = {
  listenForResize: !0
};
class A1 {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = Wt(e, e1), this.initialize(), e.listenForResize && window.addEventListener(Ui, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let n = [], r = 0;
      const o = rt.all(t, "img");
      o.length !== 0 && Uu(o, !1).then(() => {
        o.forEach((a) => {
          const l = a.getBoundingClientRect(), u = this.getImgSizeInfo(a);
          if (e === null) {
            r = u.height, n.push(a), e = l.top;
            return;
          }
          e !== l.top ? (i.push({ elements: n, height: r }), n = [], r = u.height) : e === l.top ? u.height > r && (r = u.height) : r = u.height, n.push(a), e = l.top;
        }), n.length && i.push({ elements: n, height: r }), i.length && i.forEach((a) => {
          a.elements.forEach((l) => {
            l.style.minHeight = `${a.height}px`;
          });
        });
      });
    });
  }
  initialize() {
    this.canvases = rt.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, i, n, r, o) {
    const a = n / r, l = e / i;
    return (function() {
      return (t ? a > l : a < l) ? (this.width = e, this.height = e / a) : (this.width = i * a, this.height = i), this.left = (e - this.width) * (o / 100), this.right = this.width + this.left, this;
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
const gg = {
  onPin: (s) => {
    q(s.el, {
      yPercent: "0"
    }, {
      duration: 0.35,
      ease: "easeOut"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, q(s.el, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      ease: "easeIn"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onAltBg: (s) => {
    s.opts.altBgColor && q(s.el, {
      backgroundColor: s.opts.altBgColor
    }, {
      duration: 0.2
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && q(s.el, {
      backgroundColor: s.opts.regBgColor
    }, {
      duration: 0.4
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
}, i1 = {
  el: "header[data-nav]",
  on: zi,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      nt(s.el, { yPercent: -100 }), nt(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      q(s.el, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        ease: "easeOut"
      }), q(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: qn(0.1, { startDelay: s.opts.enterDelay }),
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
    ...gg
  }
};
class C1 {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Wt(e, i1), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.opts.intersects && (this.intersectingElements = rt.all("[data-intersect]")), window.addEventListener(ja, () => {
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
      Ka,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      Ga,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(zi, () => {
      let t = Un;
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
      Co,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      Ui,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(zi, () => {
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
    return e = Wt(i, gg, e.default || {}), e;
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
const n1 = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class O1 {
  constructor(t, e) {
    this.app = t, this.opts = Wt(e, n1);
    const i = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    nt(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (nt(i, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const s1 = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class P1 {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Wt(e, s1), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((r) => this.setupParallaxElement(r)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Un, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
  }
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(t) {
    const e = t.hasAttribute("data-parallax-factor") ? parseFloat(t.getAttribute("data-parallax-factor")) : this.opts.factor;
    let i = t.hasAttribute("data-parallax") ? this.opts.fadeContent : t.hasAttribute("data-parallax-fade");
    const n = t.hasAttribute("data-parallax-orientation") ? t.getAttribute("data-parallax-orientation") : this.opts.orientation;
    let r = null, o = null;
    if (t.hasAttribute("data-parallax")) {
      if (r = t.querySelector("[data-parallax-content]"), o = t.querySelector("[data-parallax-figure]"), this.opts.overflow || (t.style.overflow = "hidden"), o) {
        o.style.transform = `scale(${this.opts.scale})`, o.style.willChange = "transform", o.style.transformOrigin = "center";
        const a = window.getComputedStyle(o);
        a.backgroundImage && a.backgroundImage !== "none" && (a.backgroundSize !== "cover" && (o.style.backgroundSize = "cover"), a.backgroundPosition !== "center" && (o.style.backgroundPosition = "center"));
      }
      r && (r.style.willChange = i ? "transform, opacity" : "transform", r.style.zIndex = "1");
    } else
      t.style.willChange = i ? "transform, opacity" : "transform";
    this.parallaxElements.push({
      element: t,
      factor: e,
      fadeContent: i,
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
    const { element: i, factor: n, fadeContent: r, orientation: o } = t, a = i.getBoundingClientRect(), l = this.app.size.height, u = l / 2, c = (a.top + a.height / 2 - u) / l * n * 100;
    let m = 1;
    if (r) {
      const y = a.top / l;
      y <= 0 ? m = Math.max(0, 1 + y * 1.5) : y >= 0.7 && (m = Math.max(0, 1 - (y - 0.7) * 3.33)), m = Math.max(0, Math.min(1, m));
    }
    let p = "";
    switch (o) {
      case "up":
        p = `translate3d(0, ${c}px, 0)`;
        break;
      case "down":
        p = `translate3d(0, ${-c}px, 0)`;
        break;
      case "left":
        p = `translate3d(${c}px, 0, 0)`;
        break;
      case "right":
        p = `translate3d(${-c}px, 0, 0)`;
        break;
      default:
        p = `translate3d(0, ${c}px, 0)`;
    }
    return { transform: p, opacity: m };
  }
  /**
   * Apply a smooth transition between current and target position
   * @param {Object} item - Parallax element data
   * @param {Object} target - Target transform and opacity values
   */
  applyTransform(t, e) {
    const { element: i, figure: n, content: r } = t;
    if (n) {
      let o = "scale(1.2)";
      const a = n.style.transform;
      if (a) {
        const l = a.match(/scale\([^)]+\)/);
        l && (o = l[0]);
      }
      n.style.transform = `${o} ${e.transform}`;
    }
    r && (r.style.transform = e.transform, r.style.opacity = e.opacity), !n && !r && (i.style.transform = e.transform, i.style.opacity = e.opacity);
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
        const n = this.calculateTransform(e, t);
        this.applyTransform(e, n);
      }
    });
  }
  /**
   * Destroy the parallax instance and clean up
   */
  destroy() {
    window.removeEventListener(Un, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: n } = t;
      i && (i.style.transform = "", i.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !i && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
const r1 = {
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
    const e = s.slides[s._currentSlideIdx].querySelector(".hero-slide-img");
    q(s.el, { opacity: 1 }, { duration: 0.25 }), e && s.slides.length > 1 && q(
      e,
      { scale: [1, s.opts.transition.scale] },
      { type: "tween", duration: s.opts.interval, ease: "linear" }
    ).finished.then(t);
  }
};
class k1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, r1), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), nt(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e, i) => {
      nt(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: i === 0 ? 1 : 0
        // Only first slide visible initially
      });
      const n = e.querySelector(".hero-slide-img");
      n ? nt(n, {
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
    this.app.registerCallback(zi, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Ro(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    Ao() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    switch (t) {
      case "fade":
        {
          nt(this._currentSlide, {
            opacity: 0,
            zIndex: this.opts.zIndex.visible
          }), nt(this._nextSlide, { opacity: 0 });
          const e = this._previousSlide.querySelector(".hero-slide-img"), i = this._currentSlide.querySelector(".hero-slide-img");
          nt(i, { scale: 1 });
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
              i,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 }
            ]
          ];
          q(a).finished.then(() => {
            nt(this._previousSlide, { opacity: 0 }), nt(this._currentSlide, { opacity: 1 }), nt(e, { scale: 1 }), this._nextSlide.style.zIndex = this.opts.zIndex.visible, this._currentSlide.style.zIndex = this.opts.zIndex.regular, this._previousSlide.style.zIndex = this.opts.zIndex.regular, this.next();
          });
        }
        break;
      case "parallax":
        {
          nt(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            width: "100%",
            opacity: 1
            // Make sure it's visible underneath
          }), nt(this._previousSlide, { overflow: "hidden" });
          const e = this._previousSlide.querySelector(".hero-slide-img"), i = this._currentSlide.querySelector(".hero-slide-img");
          nt(i, { scale: 1 });
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
              i,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 }
            ]
          ];
          q(a).finished.then(() => {
            nt(this._nextSlide, { zIndex: this.opts.zIndex.next, opacity: 1 }), nt(this._currentSlide, {
              zIndex: this.opts.zIndex.visible,
              width: "100%",
              opacity: 1
            }), nt(this._previousSlide, {
              zIndex: this.opts.zIndex.regular,
              width: "100%",
              opacity: 0
              // Hide previous slide
            }), nt(e, { scale: 1 }), this.next();
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
        Ui,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        Ui,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    this.resizeAnimation && this.resizeAnimation.stop(), this.resizeAnimation = q(
      this.images,
      { width: document.body.clientWidth },
      { duration: 0.15 }
    );
  }
}
const o1 = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    so(s.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (s) => {
    so(s.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (s) => {
    so(s.cover, 0, { duration: 0.35 });
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
class M1 {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = Wt(e, o1), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), nt(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = rt.find(this.el, "[data-cover]"), this.cover && so(this.cover, 0, { duration: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), nt(this.videoDiv, {
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
    this.video.muted = !0, nt(this.video, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0
    }), this.cover && Ro(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(Co, () => {
      !this.video.playing && !Ao() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (Ao() ? nt(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
        Ui,
        this._resize.bind(this)
      )) : window.removeEventListener(
        Ui,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
  }
}
function Rl(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const a1 = {
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
class I1 {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, a1), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
      i.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(zi, () => {
      this.watch();
    }));
  }
  watch() {
    this.initObserver(this.revealObserver, !1);
  }
  initialize() {
    if (this.initializeResizeObserver(), this.initializeSections(), "loading" in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      this.target.querySelectorAll("[data-ll-image]").forEach((i) => {
        i.setAttribute("loading", "lazy"), this.swapImage(i);
      }), this.target.querySelectorAll("[data-ll-srcset]").forEach((i) => {
        i.querySelectorAll("img").forEach((n) => n.setAttribute("loading", "lazy")), this.swapPicture(i);
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
    this.lazyPictures.forEach((i, n) => {
      e && (i.setAttribute("data-ll-srcset-initialized", ""), i.querySelectorAll("img:not([data-ll-loaded])").forEach((r) => {
        r.setAttribute("data-ll-blurred", ""), r.setAttribute("data-ll-idx", n), r.style.setProperty("--ll-idx", n);
      })), t.observe(i);
    });
  }
  forceLoad(t = document.body) {
    rt.all(t, "[data-ll-image]").forEach((n) => this.swapImage(n)), rt.all(t, "[data-ll-srcset]").forEach((n) => this.revealPicture(n));
  }
  initializeResizeObserver() {
    if (!this.opts.updateSizes)
      return;
    this.sizeObserver = new ResizeObserver((i) => {
      i.forEach((n) => {
        var u, h;
        const r = n.target;
        let o = ((h = (u = n.borderBoxSize) == null ? void 0 : u[0]) == null ? void 0 : h.inlineSize) || n.contentRect.width;
        o = Math.round(o), o < this.opts.minSize && (o = this.opts.minSize);
        const a = r.getAttribute("sizes"), l = `${o}px`;
        a !== l && (this.resizePending.set(r, o), this.rafId || (this.rafId = requestAnimationFrame(() => {
          this.flushSizeUpdates();
        })));
      });
    });
    const t = rt.all(this.target, '[data-sizes="auto"]');
    new Set(t).forEach((i) => {
      this.sizeObserver.observe(i);
    });
  }
  flushSizeUpdates() {
    this.resizePending.forEach((t, e) => {
      const i = e.getAttribute("sizes"), n = `${Math.round(t)}px`;
      i !== n && (e.setAttribute("sizes", n), e.parentNode && Array.from(rt.all(e.parentNode, "source")).forEach((r) => {
        r.getAttribute("sizes") !== n && r.setAttribute("sizes", n);
      }));
    }), this.resizePending.clear(), this.rafId = null;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (i, n) => {
        const r = rt.all(i, "img");
        return new IntersectionObserver((o, a) => {
          o.forEach((l) => {
            (l.isIntersecting || l.intersectionRatio > 0) && (Uu(r, !0).then(() => {
              Rl(i, mg);
            }), n.forEach((u) => {
              this.loadPicture(u), this.loadObserver.unobserve(u);
            }), a.unobserve(i));
          });
        }, this.opts.intersectionObserverConfig);
      };
      t.forEach((i) => {
        const n = i.querySelectorAll("picture");
        e(i, n).observe(i);
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
    t.forEach((e) => {
      if (e.isIntersecting || e.intersectionRatio > 0) {
        const i = e.target;
        e.target.hasAttribute("data-ll-srcset-ready") ? (this.revealPicture(i), this.revealObserver.unobserve(e.target)) : this.srcsetReadyObserver.observe(i, { attributes: !0 });
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
    const n = t.querySelector("img"), r = () => {
      n.removeAttribute("data-ll-placeholder"), n.removeAttribute("data-ll-blurred"), n.removeAttribute("data-ll-loading"), n.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), Rl(n, qu);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), Rl(e, pg));
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
const l1 = {
  /* enable captions */
  captions: !1,
  /* enable index numbers */
  numbers: !1,
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
    s.app.scrollLock(), q(s.elements.wrapper, { opacity: 1 }, { duration: 0.5 });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && q(s.elements.caption, { opacity: 0 }, { duration: 0.45 }), q(
      [
        s.elements.imgWrapper,
        s.elements.nextArrow,
        s.elements.prevArrow,
        s.elements.close,
        s.elements.dots
      ],
      { opacity: 0 },
      { duration: 0.5 }
    ).finished.then(() => {
      q(s.elements.wrapper, { opacity: 0 }, { duration: 0.45 }).finished.then(() => {
        s.app.scrollRelease(), s.destroy();
      });
    });
  }
};
class D1 {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, l1), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: new qf(),
      image: new qf()
    }, this.lightboxes.forEach((i) => {
      const n = i.getAttribute("data-lightbox"), r = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), l = i.getAttribute("data-lightbox-section") || "general";
      let u = i;
      this.opts.trigger && (u = rt.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, l) || (this.sections[l] = []);
      const h = {
        href: n,
        alt: a,
        srcset: r
      }, f = this.sections[l].push(h) - 1;
      u.addEventListener("click", (d) => {
        d.preventDefault(), this.showBox(l, f);
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
    let i;
    this.sections[t].forEach((n, r) => {
      const o = document.createElement("img");
      nt(o, { opacity: 0 }), o.style.visibility = "hidden", o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", r), r === e && (a.classList.add("active"), i = a), a.addEventListener("click", (l) => {
        a.classList.add("active"), i.classList.remove("active"), i = a, l.stopPropagation(), l.preventDefault(), this.setImg(t, r, null);
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
    let i = !1;
    this.currentIndex = e, this.elements.content.setAttribute("data-current-idx", e);
    let n = document.querySelector(".lightbox-dots a.active");
    n && n.classList.remove("active"), n = document.querySelector(`.lightbox-dots a[data-idx="${e}"]`), n.classList.add("active"), this.elements.caption && (i = this.previousCaption !== this.sections[t][e].alt, this.previousCaption = this.sections[t][e].alt, this.opts.onCaptionOut(this, i), this.timelines.caption.call(() => {
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), Ro(this.nextImage).then(() => {
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
const c1 = {
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
    t.app.scrollTo(s, t.opts.scrollDuration, t.opts.triggerEvents);
  },
  onTransition: (s, t) => {
    const e = document.querySelector("main"), i = document.querySelector("header[data-nav]"), n = document.querySelector("footer"), r = document.querySelector("#fader");
    r ? (nt(r, { display: "block", opacity: 0 }), e && (q(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), q(e, { opacity: 0 }, { duration: 0.2 })), i && q(i, { opacity: 0 }, { duration: 0.2 }), n && q(n, { opacity: 0 }, { duration: 0.2 }), q(r, { opacity: 1 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    })) : (e && (q(e, { y: 25 }, { duration: 0.8, ease: "easeOut" }), q(e, { opacity: 0 }, { duration: 0.2 })), i && q(i, { opacity: 0 }, { duration: 0.2 }), n && q(n, { opacity: 0 }, { duration: 0.2 }), q(e, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    }));
  }
};
class L1 {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, c1);
    const i = document.querySelectorAll(this.opts.linkQuery), n = document.querySelectorAll(this.opts.anchorQuery);
    this.bindHeroLink(), this.bindAnchors(n), this.bindLinks(i);
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
      i.addEventListener("click", (n) => {
        n.preventDefault();
        const r = i.getAttribute("href");
        if (r === "#")
          return;
        document.body.classList.contains("open-menu") && (this.app.mobileMenu.toggleMenuClosed(), e = !0);
        const o = () => {
          const a = r, l = document.querySelector(a);
          if (n.preventDefault(), l) {
            if (this.opts.onAnchor(l, this), l.hasAttribute("data-skip-history") || history.pushState({}, "", r), !this.app.header || l.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
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
      const n = i.getAttribute("href");
      if (!n || n === "#" || n.startsWith("javascript:"))
        return;
      const r = this.normalizeHostname(document.location.hostname);
      let o, a;
      try {
        a = new URL(n, document.location.href), o = a.hostname;
      } catch (h) {
        console.warn(`Failed to parse URL for href "${n}":`, h), o = "";
      }
      const u = this.normalizeHostname(o) === r;
      this.opts.openExternalInWindow && !u && i.setAttribute("target", "_blank"), i.addEventListener("click", (h) => {
        if (!(h.shiftKey || h.metaKey || h.ctrlKey) && (e && (e.style.display = "none"), u && a)) {
          const f = new URL(window.location.href), d = a.pathname === f.pathname && a.search === f.search;
          if (d && a.hash) {
            h.preventDefault();
            const c = a.hash, m = document.querySelector(c);
            m && (this.opts.onAnchor(m, this), history.pushState({}, "", n));
          } else d && !a.hash && !f.hash ? h.preventDefault() : (h.preventDefault(), this.opts.onTransition(n, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const u1 = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    q(s, { opacity: 1 }, { ease: "linear" });
  }
};
class R1 {
  constructor(t, e, i) {
    this.opts = Wt(i, u1), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = rt.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = rt.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = rt.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    nt(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.fillText(), this.setHeight();
    const e = this.elements.$holder.offsetWidth, i = rt.all(this.elements.$el, "[data-marquee-holder]"), n = e * i.length;
    this.duration = Math.min(
      (e + n) / this.opts.speed,
      40
    ), nt(this.elements.$marquee, { width: n }), this.initializeTween(), rt.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = rt.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Wi(e, "all"));
  }
  killTweens() {
    this.timeline && (this.timeline.stop(), this.timeline = null), this.speedAnimation && (this.speedAnimation.stop(), this.speedAnimation = null);
  }
  initializeTween() {
    const t = rt.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      nt(e, {
        position: "absolute",
        left: e.offsetWidth * i,
        transform: "translateZ(0)",
        willChange: "transform"
      });
    }), this.timeline = q(
      t,
      { transform: ["translateX(0) translateZ(0)", "translateX(-100%) translateZ(0)"] },
      { duration: this.duration, ease: "linear", repeat: 1 / 0 }
    ), this.timeline.pause(), this.opts.startProgress > 0 && (this.timeline.currentTime = this.opts.startProgress * this.duration), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    if (this.playing = !0, this.speedAnimation && this.speedAnimation.stop(), t) {
      this.timeline.play();
      const e = { speed: this.timeline.speed || 0 };
      this.speedAnimation = q(
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
    this.speedAnimation = q(
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
    this.speedAnimation = q(
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
    this.speedAnimation = q(
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
    Wi(this.elements.$el, "height"), Wi(this.elements.$marquee, "height"), this.elements.$marquee.innerHTML = "", this.elements.$marquee.appendChild(this.elements.$holder), this.elements.$holder.innerHTML = "", this.elements.$holder.appendChild(this.elements.$item), this.measuredHeight = this.elements.$item.offsetHeight;
    const t = this.elements.$item.offsetWidth;
    if (t) {
      this.opts.spacer && this.elements.$holder.appendChild(rt.new(this.opts.spacer)[0]);
      const e = Math.max(Math.ceil(this.app.size.width / t) - 1, 2);
      for (let i = 0; i < e; i += 1)
        this.elements.$holder.append(this.elements.$item.cloneNode(!0)), this.opts.spacer && this.elements.$holder.appendChild(rt.new(this.opts.spacer)[0]);
      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(!0));
    } else
      console.error(
        "no textWidth! probably image? Set width to elements inside holder",
        this.elements.$item
      );
  }
  setHeight() {
    const t = this.measuredHeight + this.opts.extraHeight;
    nt(this.elements.$el, { height: t }), nt(this.elements.$marquee, { height: t });
  }
}
const h1 = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: async (s) => {
    s.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), nt(s.bg, { x: "0%", opacity: 0, height: window.innerHeight });
    const t = [
      [s.bg, { opacity: 1 }, { duration: 0.35, ease: "easeIn", at: 0 }],
      [s.logo, { opacity: 0 }, { duration: 0.35, ease: "easeOut", at: 0 }],
      [s.header, { backgroundColor: "transparent" }, { duration: 0.55, ease: "easeOut", at: 0 }]
    ];
    await q(t).finished, s.nav.style.gridTemplateRows = "auto 1fr", nt(s.nav, { height: window.innerHeight }), Array.from(s.content).forEach((n) => nt(n, { display: "block" })), Array.from(s.logoPath).forEach((n) => n.setAttribute("fill", s.opts.logoColor)), nt(s.logo, { x: "3%" });
    const e = q(
      s.lis,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 1, ease: "easeOut", delay: qn(0.05) }
    ), i = q(
      s.logo,
      { opacity: 1, x: ["3%", "0%"] },
      { duration: 0.55, ease: "easeInOut", at: 0.15 }
    );
    await Promise.all([e.finished, i.finished]), s._emitMobileMenuOpenEvent();
  },
  closeTween: async (s) => {
    document.body.classList.toggle("open-menu"), s.hamburger.classList.toggle("is-active"), await q(s.logo, { opacity: 0, x: "5%" }, { duration: 0.2, ease: "easeOut" }).finished, Array.from(s.logoPath).forEach((e) => e.removeAttribute("fill"));
    const t = q(
      s.lis,
      { opacity: 0, x: 20 },
      { duration: 0.5, ease: "easeOut", delay: qn(0.04) }
    );
    setTimeout(() => {
      q(s.bg, { x: "100%" }, { duration: 0.25, ease: "easeIn" });
    }, 200), await t.finished, Wi(s.nav, "height"), s._emitMobileMenuClosedEvent(), Array.from(s.content).forEach((e) => nt(e, { display: "none" })), s.nav.style.gridTemplateRows = "auto", Array.from(s.lis).forEach((e) => Wi(e, "opacity")), await q(s.logo, { opacity: 1 }, { duration: 0.35, ease: "easeIn" }).finished;
  }
};
class z1 {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, h1), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(Ui, () => {
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
      Yu
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      Wu
    );
    window.dispatchEvent(t);
  }
}
const f1 = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: zi,
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
class F1 {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = Wt(e, f1), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), Ao() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    ].forEach((i) => {
      const n = t.querySelectorAll(`[${i}]`);
      Array.from(n).forEach((r) => r.removeAttribute(i)), t.removeAttribute(i);
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
    const i = "data-moonwalk-run", n = t.querySelectorAll(`[${i}="${e}"]`);
    Array.from(n).forEach((r) => r.removeAttribute(i));
  }
  /**
   * Remove all runs
   */
  removeRuns(t = document.body) {
    const e = "data-moonwalk-run", i = t.querySelectorAll(`[${e}]`);
    Array.from(i).forEach((n) => n.removeAttribute(e));
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
      const i = e === "default" ? '[data-moonwalk=""]' : `[data-moonwalk="${e}"]`, n = t.querySelectorAll(i);
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
    return Array.from(e).map((i) => {
      const n = this.opts.runs[i.getAttribute("data-moonwalk-run")];
      return n ? (n.initialize && n.initialize(i), {
        el: i,
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
      (i) => this.initializeSection(i)
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
    const e = rt.all(t, "[data-moonwalk-children]");
    Array.from(e).forEach((i) => {
      const n = i.getAttribute("data-moonwalk-children");
      this.setAttrs(i, n);
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
    return Array.prototype.forEach.call(t.children, (n) => {
      n.setAttribute("data-moonwalk", e), i.push(n);
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
      const n = e[t.name];
      if (n.sectionTargets ? t.children = this.orderChildren(
        t.el.querySelectorAll(n.sectionTargets)
      ) : t.children = this.orderChildren(t.el.children), n.transition) {
        const r = n.alphaTween ? {
          ...n.transition.from,
          opacity: 0
        } : n.transition.from;
        t.name, t.children.length, nt(t.children, r), t.children.length > 0 && (t.children[0], void 0);
      } else
        t.name, t.children.length;
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? (t.stage.name, n.transition.from, nt(t.el, n.transition.from), t.el, void 0) : console.error(
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
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o];
          if (a.isIntersecting) {
            if (t.stage.name && !t.stage.running) {
              const l = i[t.stage.name];
              q(a.target, l.transition.to, {
                duration: l.duration
              }), t.stage.firstTween = !0;
            }
            if (t.name) {
              const l = i[t.name];
              if (l || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), t.name, t.children.length, l.interval, l.duration, l.alphaTween, l.transition, !l.transition)
                t.name, t.children.forEach((u, h) => {
                  const f = (l.startDelay || 0) + h * l.interval;
                  Ll(f, () => {
                    u.setAttribute("data-moonwalked", "");
                  });
                });
              else {
                typeof l.alphaTween == "object" ? l.alphaTween.duration = l.alphaTween.duration ? l.alphaTween.duration : l.duration : l.alphaTween === !0 && (l.alphaTween = {
                  duration: l.duration,
                  ease: "easeIn"
                });
                const { ease: u, ...h } = l.transition.to, f = sa(u || "easeOut"), d = {
                  duration: l.duration,
                  ease: f,
                  delay: qn(l.interval, {
                    startDelay: l.startDelay || 0
                  })
                };
                t.name, q(t.children, h, d), l.alphaTween && q(
                  t.children,
                  { opacity: 1 },
                  {
                    duration: l.alphaTween.duration,
                    ease: sa(l.alphaTween.ease || "easeIn"),
                    delay: qn(l.interval, {
                      startDelay: l.startDelay || 0
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
    return Array.from(t).sort((e, i) => {
      const n = e.getAttribute("data-moonwalk-order") ? parseInt(e.getAttribute("data-moonwalk-order")) : null, r = e.getAttribute("data-moonwalk-order") ? parseInt(i.getAttribute("data-moonwalk-order")) : null;
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
  calculateDelay(t, e, i) {
    if (!t.animation.lastStartTime)
      return 0;
    const r = (performance.now() - t.animation.lastStartTime) / 1e3, o = t.animation.lastDelay + t.animation.lastDuration + i, a = Math.max(0, o - r);
    return r.toFixed(3), t.animation.lastDelay, t.animation.lastDuration, a.toFixed(3), a;
  }
  /**
   * Update the animation state after adding an animation.
   *
   * @param {*} section - The section object
   * @param {*} delay - The delay that was used
   * @param {*} duration - The duration of the animation
   */
  updateAnimationState(t, e, i) {
    ({ ...t.animation }, t.animation.lastDelay = e), t.animation.lastDuration = i, t.animation.lastStartTime = performance.now(), { ...t.animation };
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
      i && i.onReady && i.onReady(i.el);
    }
    for (let e = 0; e < this.runs.length; e += 1) {
      const i = this.runs[e];
      if (!i)
        return;
      let n;
      e === this.sections.length - 1 ? n = "0px" : i.rootMargin ? n = i.rootMargin : n = t.rootMargin, this.runObserver(i, n).observe(i.el);
    }
    for (let e = 0; e < this.sections.length; e += 1) {
      const i = this.sections[e];
      let n;
      e === this.sections.length - 1 ? n = "0px" : n = t.rootMargin, this.setupNamesAndStages(i), i.name || (i.observer = this.observer(i, n)), i.elements = i.el.querySelectorAll("[data-moonwalk]"), i.name || (i.elements.forEach((r) => {
        const o = r.getAttribute("data-moonwalk"), a = o.length ? t.walks[o] : t.walks.default;
        a && a.transition && (a.transition.from, nt(r, a.transition.from));
      }), i.elements.forEach((r) => i.observer.observe(r)));
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
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o], l = a.boundingClientRect, u = window.innerHeight, h = window.innerWidth;
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
            i.set(a.target, {
              top: l.top,
              bottom: l.bottom,
              left: l.left,
              right: l.right
            });
            const d = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, d, f), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && r.unobserve(a.target);
          } else if (t.onExit && a.target.hasAttribute("data-moonwalk-run-triggered")) {
            const f = a.target.hasAttribute(
              "data-moonwalk-run-exit-triggered"
            );
            a.target.setAttribute("data-moonwalk-run-exit-triggered", "");
            let d = { direction: null };
            if (this.app.state && this.app.state.scrollDirection)
              switch (this.app.state.scrollDirection) {
                case "down":
                  d.direction = "top";
                  break;
                case "up":
                  d.direction = "bottom";
                  break;
                case "right":
                  d.direction = "right";
                  break;
                case "left":
                  d.direction = "left";
                  break;
              }
            else
              l.bottom <= 0 ? d.direction = "top" : l.top >= u ? d.direction = "bottom" : l.right <= 0 ? d.direction = "left" : l.left >= h && (d.direction = "right");
            t.onExit(a.target, f, d), t.repeated || r.unobserve(a.target);
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
      (n, r) => {
        for (let o = 0; o < n.length; o += 1) {
          const a = n[o];
          if (a.isIntersecting || a.intersectionRatio > 0) {
            t.running = !0;
            const l = a.target.getAttribute("data-moonwalk");
            a.target.getAttribute("data-testid") || l || a.target.className, a.isIntersecting, a.intersectionRatio;
            const u = l.length ? i.walks[l] : i.walks.default, { duration: h, transition: f, startDelay: d } = u, c = u.interval !== void 0 ? u.interval : 0.15;
            let { alphaTween: m } = u, p = (h - c) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof m == "object" && m !== null ? m.duration = m.duration ? m.duration : h : m === !0 && (m = {
              duration: h,
              ease: "easeIn"
            });
            const y = () => {
              f ? this.tweenJS(
                t,
                a.target,
                h,
                c,
                f,
                p,
                m
              ) : this.tweenCSS(
                t,
                a.target,
                h,
                c,
                f,
                p
              );
            }, v = () => {
              d ? Ll(d, y) : y();
            };
            if (a.target.tagName === "IMG")
              Ro(a.target).then(() => v());
            else if (a.target.hasAttribute("data-placeholder"))
              v();
            else {
              const A = a.target.querySelectorAll("img");
              A.length ? Array.from(A).every(
                (S) => S.hasAttribute("data-ll-placeholder")
              ) ? v() : Uu(A).then(() => v()) : v();
            }
            r.unobserve(a.target);
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
  tweenJS(t, e, i, n, r, o, a) {
    if (e.getAttribute("data-testid") || e.getAttribute("data-moonwalk") || e.className, rt.hasAttribute(e, "data-moonwalked"))
      return;
    const l = this.calculateDelay(t, i, o);
    r.from;
    const { ease: u, ...h } = r.to, f = sa(u || "easeOut");
    l.toFixed(3);
    const d = q(e, h, {
      duration: i,
      delay: l,
      ease: f
    });
    d && d.finished ? d.finished.then(() => {
      e.setAttribute("data-moonwalked", "");
    }).catch((c) => {
      e.setAttribute("data-moonwalked", "");
    }) : e.setAttribute("data-moonwalked", ""), a && (a.duration, (l + (a.delay || 0)).toFixed(3), q(e, { opacity: 1 }, {
      duration: a.duration,
      ease: sa(a.ease || "easeIn"),
      delay: l + (a.delay || 0)
    })), this.updateAnimationState(t, l, i);
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
  tweenCSS(t, e, i, n, r, o) {
    if (rt.hasAttribute(e, "data-moonwalked"))
      return;
    const a = this.calculateDelay(
      t,
      i,
      o
    );
    e.getAttribute("data-testid") || e.className, a.toFixed(3), Ll(a, () => {
      e.classList.add("moonwalked"), e.setAttribute("data-moonwalked", "");
    }), this.updateAnimationState(t, a, i);
  }
}
const d1 = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, Tr = [];
class N1 {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = Wt(i, d1), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), Tr.includes(this) || Tr.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
      this.addScrollListener();
    }), typeof this.opts.onShow == "function" && requestAnimationFrame(() => {
      this.opts.onShow(this);
    });
  }
  // Update popover position based on trigger position
  updatePosition(t = !0) {
    const {
      top: e,
      left: i,
      width: n,
      height: r
    } = this.trigger.getBoundingClientRect(), { offsetHeight: o, offsetWidth: a } = this.popover, l = this.orderedPositions.indexOf(this.position), u = {
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
    }, h = this.orderedPositions.slice(l).concat(this.orderedPositions.slice(0, l)).map((f) => u[f]).find((f) => (t || (this.popover.style.top = `${f.top}px`, this.popover.style.left = `${f.left}px`), rt.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((f) => {
      this.popover.classList.remove(`${this.className}--${f}`);
    }), h ? (t && this.isVisible ? q(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? q(this.popover, {
      top: Math.max(0, u.bottom.top),
      left: Math.max(0, u.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      ease: "easeOut"
    }) : t || (this.popover.style.top = `${Math.max(0, u.bottom.top)}px`, this.popover.style.left = `${Math.max(0, u.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = Tr.indexOf(this);
    t !== -1 && Tr.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    Tr.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Un, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(Un, this.boundHandleScroll);
  }
}
const p1 = {
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
    e.backdrop.style.display = "block", q(e.backdrop, { opacity: 1 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "block", q(
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
  tweenOut: (s) => {
    console.log("default tweenOut");
    const t = s.currentPopup;
    t && q(t, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "none";
    }), q(s.backdrop, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      s.backdrop.remove();
    });
  }
};
class $1 {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = Wt(i, p1), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
    }), i = document.querySelectorAll(this.opts.selector), n = [];
    i.forEach((r) => {
      const o = r.querySelectorAll("[data-popup-close]");
      n.push(...o);
    }), e.forEach((r) => {
      const o = r.getAttribute("data-popup-trigger"), a = r.getAttribute("data-popup-key") || this.getKeyFromTarget(o);
      r.addEventListener("click", (l) => {
        this.opts.responsive(this.app) && (l.stopImmediatePropagation(), l.preventDefault(), this.open(r, o, a));
      });
    }), n.forEach((r) => {
      const o = r.closest(this.opts.selector), a = o ? o.getAttribute("data-popup-key") : null;
      r.addEventListener("click", (l) => {
        l.stopImmediatePropagation(), l.preventDefault(), (!this.popupKey || !a || this.popupKey === a) && (this.opts.onClose(this), this.close());
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), e.style.display = "none", e.style.zIndex = "4999", nt(e, { opacity: 0 }), e.addEventListener("click", (i) => {
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
const m1 = {
  onIntersect: (s, t) => {
  }
};
class B1 {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, m1), this.initialize();
  }
  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = rt.all("[data-scrollspy-trigger]");
    const t = {
      rootMargin: "-55px 0px -85%"
    }, e = new IntersectionObserver((i) => {
      i.forEach((n) => {
        n.isIntersecting && this.intersectionHandler(n);
      });
    }, t);
    this.triggers.forEach((i) => e.observe(i));
  }
  /**
   * Handle intersection with viewport
   * @param {IntersectionObserverEntry} entry - Intersection observer entry
   */
  intersectionHandler(t) {
    const e = t.target.dataset.scrollspyTrigger, i = document.querySelector("[data-scrollspy-active]"), n = document.querySelector(`[data-scrollspy-target="${e}"]`);
    i && i.removeAttribute("data-scrollspy-active"), n && (n.dataset.scrollspyActive = "", this.opts.onIntersect(t.target, n));
  }
}
const g1 = {};
class V1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, g1), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-boxes-stacked]"), e = new IntersectionObserver((i) => {
      const [{ isIntersecting: n, target: r }] = i;
      n && this.adjustBox(r);
    });
    Array.from(t).forEach((i) => {
      e.observe(i);
    });
  }
  adjustBox(t) {
    const e = t.querySelector("[data-boxes-stacked-size-target]"), i = t.querySelector("[data-boxes-stacked-size-src]");
    e && this.size(e, i);
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
    nt(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    nt(t, { height: e.clientHeight });
  }
}
const yg = {
  onMainVisible: (s) => {
    q(s.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    q(s.el, {
      opacity: 0
    }, {
      duration: 1
    });
  },
  onPin: (s) => {
    q(s.auxEl, {
      yPercent: "0"
    }, {
      duration: 0.35,
      ease: "easeOut"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, q(s.auxEl, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      ease: "easeIn"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onSmall: () => {
  }
}, y1 = {
  el: "header[data-nav]",
  on: zi,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      nt(s.el, { opacity: 0 });
    },
    enter: (s) => {
      nt(s.auxEl, { yPercent: -100 }), nt(s.lis, { opacity: 0 }), q(s.auxEl, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        ease: "easeOut"
      }), q(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: qn(0.1, { startDelay: s.opts.enterDelay }),
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
    ...yg
  }
};
class H1 {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Wt(e, y1), this.mainOpts.pinOnOutline && window.addEventListener(ja, () => {
      this.preventUnpin = !0, this.pin();
    }), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.auxEl = this.opts.onClone(this), this.auxEl.setAttribute("data-header-pinned", ""), this.auxEl.setAttribute("data-auxiliary-nav", ""), this.auxEl.removeAttribute("data-nav"), document.body.appendChild(this.auxEl), this.small(), this.unpin(), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._isResizing = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.firstReveal = !0, this.initialize();
  }
  initialize() {
    if (this.lastKnownScrollY = this.getScrollY(), this.currentScrollY = this.lastKnownScrollY, typeof this.opts.offsetBg == "string") {
      const t = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = t.offsetTop - this.el.offsetHeight;
    }
    this.setupObserver(), window.addEventListener(this.mainOpts.on, this.bindObserver.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && window.addEventListener(
      Ui,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      Un,
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
    }), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Ka, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      Ga,
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
    return e = Wt(i, yg, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      Yu,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      Wu,
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
class Y1 {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} options - Configuration options
   * @param {Function} options.onOpen - Callback when toggle opens
   * @param {Function} options.onClose - Callback when toggle closes
   */
  constructor(t, e, i = {}) {
    this.open = !1, this.app = t, this.el = e, this.onOpen = i.onOpen, this.onClose = i.onClose, this.onBeforeOpen = i.onBeforeOpen, this.onBeforeClose = i.onBeforeClose, this.trigger = rt.find(this.el, "[data-toggle-trigger]"), this.triggerTarget = this.trigger.dataset.toggleTrigger, this.group = this.el.dataset.toggleGroup, this.triggerTarget ? this.content = rt.all(this.el, `[data-toggle-content="${this.triggerTarget}"]`) : this.content = rt.all(this.el, "[data-toggle-content]"), this.triggerIcon = rt.find(this.trigger, "span.icon"), this.trigger.addEventListener("click", this.onClick.bind(this));
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
      this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), this.content.forEach((i) => {
        i.style.height = "0", i.style.display = "block", i.offsetHeight;
      }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex());
      const t = [];
      this.content.forEach((i, n) => {
        const r = i.scrollHeight;
        t.push(
          q(i, { height: [0, r + "px"] }, {
            ease: "easeInOut",
            delay: n * 0.1
          })
        );
      });
      const e = t[t.length - 1];
      e && e.finished.then(() => {
        this.content.forEach((i) => {
          i.style.height = "auto", i.removeAttribute("data-toggle-hidden"), i.setAttribute("data-toggle-visible", "");
        }), this.onOpen && this.onOpen(this, this.getGroupIndex());
      });
    } else {
      this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.removeAttribute("data-toggle-trigger-active"), this.onBeforeClose && this.onBeforeClose(this, this.getGroupIndex());
      const t = [];
      this.content.forEach((i, n) => {
        const r = i.scrollHeight;
        i.style.height = r + "px", i.offsetHeight, t.push(
          q(i, { height: 0 }, {
            duration: 0.25,
            ease: "easeOut",
            delay: n * 0.1
          })
        );
      });
      const e = t[t.length - 1];
      e && e.finished.then(() => {
        this.el.classList.toggle("open"), this.content.forEach((i) => {
          i.style.display = "none", i.style.removeProperty("height"), i.removeAttribute("data-toggle-visible"), i.setAttribute("data-toggle-hidden", "");
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
            q(n, { height: 0 }, {
              duration: 0.25,
              ease: "easeOut",
              delay: r * 0.1
            })
          );
        });
        const i = e[e.length - 1];
        i && i.finished.then(() => {
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
class W1 {
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
const q1 = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  w1 as Application,
  Wf as Breakpoints,
  qd as CSSPlugin,
  b1 as Cookies,
  x1 as CoverOverlay,
  S1 as Dataloader,
  rt as Dom,
  qa as Draggable,
  T1 as Dropdown,
  E1 as EqualHeightElements,
  A1 as EqualHeightImages,
  v1 as Events,
  C1 as FixedHeader,
  O1 as FooterReveal,
  k1 as HeroSlider,
  M1 as HeroVideo,
  Gp as InertiaPlugin,
  I1 as Lazyload,
  D1 as Lightbox,
  L1 as Links,
  R1 as Marquee,
  z1 as MobileMenu,
  F1 as Moonwalk,
  P1 as Parallax,
  N1 as Popover,
  $1 as Popup,
  B1 as ScrollSpy,
  Po as ScrollToPlugin,
  xt as ScrollTrigger,
  s_ as SplitText,
  V1 as StackedBoxes,
  H1 as StickyHeader,
  Y1 as Toggler,
  W1 as Typography,
  Wt as _defaultsDeep,
  q as animate,
  Jp as gsap,
  Ro as imageIsLoaded,
  Uu as imagesAreLoaded,
  q1 as loadScript,
  Ao as prefersReducedMotion,
  Hf as rafCallback,
  _1 as scroll,
  qn as stagger
};
