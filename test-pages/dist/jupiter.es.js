function un(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Ef(s, t) {
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
var yi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Zs = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Mu, Re, Zt, Ji = 1e8, We = 1 / Ji, Sl = Math.PI * 2, gg = Sl / 4, _g = 0, Af = Math.sqrt, yg = Math.cos, vg = Math.sin, ke = function(t) {
  return typeof t == "string";
}, ie = function(t) {
  return typeof t == "function";
}, yn = function(t) {
  return typeof t == "number";
}, Iu = function(t) {
  return typeof t > "u";
}, en = function(t) {
  return typeof t == "object";
}, ri = function(t) {
  return t !== !1;
}, Du = function() {
  return typeof window < "u";
}, Io = function(t) {
  return ie(t) || ke(t);
}, Cf = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ue = Array.isArray, El = /(?:-?\.?\d|\.)+/gi, Pf = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ds = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ga = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Of = /[+-]=-?[.\d]+/, kf = /[^,'"\[\]\s]+/gi, bg = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Jt, qi, Al, Lu, vi = {}, ca = {}, Mf, If = function(t) {
  return (ca = Qs(t, vi)) && Yt;
}, Ru = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, Qr = function(t, e) {
  return !e && console.warn(t);
}, Df = function(t, e) {
  return t && (vi[t] = e) && ca && (ca[t] = e) || vi;
}, Jr = function() {
  return 0;
}, wg = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Zo = {
  suppressEvents: !0,
  kill: !1
}, xg = {
  suppressEvents: !0
}, zu = {}, Dn = [], Cl = {}, Lf, fi = {}, ja = {}, Bc = 30, Qo = [], Fu = "", Nu = function(t) {
  var e = t[0], i, n;
  if (en(e) || ie(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (n = Qo.length; n-- && !Qo[n].targetTest(e); )
      ;
    i = Qo[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new sd(t[n], i))) || t.splice(n, 1);
  return t;
}, es = function(t) {
  return t._gsap || Nu(Oi(t))[0]._gsap;
}, Rf = function(t, e, i) {
  return (i = t[e]) && ie(i) ? t[e]() : Iu(i) && t.getAttribute && t.getAttribute(e) || i;
}, oi = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, ae = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, _e = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, $s = function(t, e) {
  var i = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + n : i === "-" ? t - n : i === "*" ? t * n : t / n;
}, Tg = function(t, e) {
  for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, ha = function() {
  var t = Dn.length, e = Dn.slice(0), i, n;
  for (Cl = {}, Dn.length = 0, i = 0; i < t; i++)
    n = e[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, $u = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, zf = function(t, e, i, n) {
  Dn.length && !Re && ha(), t.render(e, i, !!(Re && e < 0 && $u(t))), Dn.length && !Re && ha();
}, Ff = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(kf).length < 2 ? e : ke(t) ? t.trim() : t;
}, Nf = function(t) {
  return t;
}, bi = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Sg = function(t) {
  return function(e, i) {
    for (var n in i)
      n in e || n === "duration" && t || n === "ease" || (e[n] = i[n]);
  };
}, Qs = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Vc = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = en(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, fa = function(t, e) {
  var i = {}, n;
  for (n in t)
    n in e || (i[n] = t[n]);
  return i;
}, Dr = function(t) {
  var e = t.parent || Jt, i = t.keyframes ? Sg(Ue(t.keyframes)) : bi;
  if (ri(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Eg = function(t, e) {
  for (var i = t.length, n = i === e.length; n && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, $f = function(t, e, i, n, r) {
  var o = t[n], a;
  if (r)
    for (a = e[r]; o && o[r] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e;
}, Ia = function(t, e, i, n) {
  i === void 0 && (i = "_first"), n === void 0 && (n = "_last");
  var r = e._prev, o = e._next;
  r ? r._next = o : t[i] === e && (t[i] = o), o ? o._prev = r : t[n] === e && (t[n] = r), e._next = e._prev = e.parent = null;
}, Nn = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, is = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Ag = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Pl = function(t, e, i, n) {
  return t._startAt && (Re ? t._startAt.revert(Zo) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, Cg = function s(t) {
  return !t || t._ts && s(t.parent);
}, Hc = function(t) {
  return t._repeat ? Js(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Js = function(t, e) {
  var i = Math.floor(t = _e(t / e));
  return t && i === t ? i - 1 : i;
}, da = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Da = function(t) {
  return t._end = _e(t._start + (t._tDur / Math.abs(t._ts || t._rts || We) || 0));
}, La = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = _e(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Da(t), i._dirty || is(i, t)), t;
}, Bf = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = da(t.rawTime(), e), (!e._dur || wo(0, e.totalDuration(), i) - e._tTime > We) && e.render(i, !0)), is(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Gi = function(t, e, i, n) {
  return e.parent && Nn(e), e._start = _e((yn(i) ? i : i || t !== Jt ? Ai(t, i, e) : t._time) + e._delay), e._end = _e(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), $f(t, e, "_first", "_last", t._sort ? "_start" : 0), Ol(e) || (t._recent = e), n || Bf(t, e), t._ts < 0 && La(t, t._tTime), t;
}, Vf = function(t, e) {
  return (vi.ScrollTrigger || Ru("scrollTrigger", e)) && vi.ScrollTrigger.create(e, t);
}, Hf = function(t, e, i, n, r) {
  if (Vu(t, e, r), !t._initted)
    return 1;
  if (!i && t._pt && !Re && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Lf !== pi.frame)
    return Dn.push(t), t._lazy = [r, n], 1;
}, Pg = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Ol = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Og = function(t, e, i, n) {
  var r = t.ratio, o = e < 0 || !e && (!t._start && Pg(t) && !(!t._initted && Ol(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ol(t)) ? 0 : 1, a = t._rDelay, l = 0, c, h, f;
  if (a && t._repeat && (l = wo(0, t._tDur, e), h = Js(l, a), t._yoyo && h & 1 && (o = 1 - o), h !== Js(t._tTime, a) && (r = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== r || Re || n || t._zTime === We || !e && t._zTime) {
    if (!t._initted && Hf(t, e, n, i, l))
      return;
    for (f = t._zTime, t._zTime = e || (i ? We : 0), i || (i = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && Pl(t, e, i, !0), t._onUpdate && !i && _i(t, "onUpdate"), l && t._repeat && !i && t.parent && _i(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Nn(t, 1), !i && !Re && (_i(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, kg = function(t, e, i) {
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
}, tr = function(t, e, i, n) {
  var r = t._repeat, o = _e(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = r ? r < 0 ? 1e10 : _e(o * (r + 1) + t._rDelay * r) : o, a > 0 && !n && La(t, t._tTime = t._tDur * a), t.parent && Da(t), i || is(t.parent, t), t;
}, Yc = function(t) {
  return t instanceof ti ? is(t) : tr(t, t._dur);
}, Mg = {
  _start: 0,
  endTime: Jr,
  totalDuration: Jr
}, Ai = function s(t, e, i) {
  var n = t.labels, r = t._recent || Mg, o = t.duration() >= Ji ? r.endTime(!1) : t._dur, a, l, c;
  return ke(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), c = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (a < 0 ? r : i).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), c && i && (l = l / 100 * (Ue(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + l : o + l)) : e == null ? o : +e;
}, Lr = function(t, e, i) {
  var n = yn(e[1]), r = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[r], a, l;
  if (n && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = ri(l.vars.inherit) && l.parent;
    o.immediateRender = ri(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[r - 1];
  }
  return new ge(e[0], o, e[r + 1]);
}, Hn = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, wo = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, Ve = function(t, e) {
  return !ke(t) || !(e = bg.exec(t)) ? "" : e[1];
}, Ig = function(t, e, i) {
  return Hn(i, function(n) {
    return wo(t, e, n);
  });
}, kl = [].slice, Yf = function(t, e) {
  return t && en(t) && "length" in t && (!e && !t.length || t.length - 1 in t && en(t[0])) && !t.nodeType && t !== qi;
}, Dg = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(n) {
    var r;
    return ke(n) && !e || Yf(n, 1) ? (r = i).push.apply(r, Oi(n)) : i.push(n);
  }) || i;
}, Oi = function(t, e, i) {
  return Zt && !e && Zt.selector ? Zt.selector(t) : ke(t) && !i && (Al || !er()) ? kl.call((e || Lu).querySelectorAll(t), 0) : Ue(t) ? Dg(t, i) : Yf(t) ? kl.call(t, 0) : t ? [t] : [];
}, Ml = function(t) {
  return t = Oi(t)[0] || Qr("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Oi(e, i.querySelectorAll ? i : i === t ? Qr("Invalid scope") || Lu.createElement("div") : t);
  };
}, Wf = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Uf = function(t) {
  if (ie(t))
    return t;
  var e = en(t) ? t : {
    each: t
  }, i = ns(e.ease), n = e.from || 0, r = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, c = e.axis, h = n, f = n;
  return ke(n) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (h = n[0], f = n[1]), function(d, u, m) {
    var p = (m || e).length, _ = o[p], b, A, C, T, y, O, P, S, k;
    if (!_) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, Ji])[1], !k) {
        for (P = -1e8; P < (P = m[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (_ = o[p] = [], b = l ? Math.min(k, p) * h - 0.5 : n % k, A = k === Ji ? 0 : l ? p * f / k - 0.5 : n / k | 0, P = 0, S = Ji, O = 0; O < p; O++)
        C = O % k - b, T = A - (O / k | 0), _[O] = y = c ? Math.abs(c === "y" ? T : C) : Af(C * C + T * T), y > P && (P = y), y < S && (S = y);
      n === "random" && Wf(_), _.max = P - S, _.min = S, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : c ? c === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (n === "edges" ? -1 : 1), _.b = p < 0 ? r - p : r, _.u = Ve(e.amount || e.each) || 0, i = i && p < 0 ? ed(i) : i;
    }
    return p = (_[d] - _.min) / _.max || 0, _e(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, Il = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var n = _e(Math.round(parseFloat(i) / t) * t * e);
    return (n - n % 1) / e + (yn(i) ? 0 : Ve(i));
  };
}, qf = function(t, e) {
  var i = Ue(t), n, r;
  return !i && en(t) && (n = i = t.radius || Ji, t.values ? (t = Oi(t.values), (r = !yn(t[0])) && (n *= n)) : t = Il(t.increment)), Hn(e, i ? ie(t) ? function(o) {
    return r = t(o), Math.abs(r - o) <= n ? r : o;
  } : function(o) {
    for (var a = parseFloat(r ? o.x : o), l = parseFloat(r ? o.y : 0), c = Ji, h = 0, f = t.length, d, u; f--; )
      r ? (d = t[f].x - a, u = t[f].y - l, d = d * d + u * u) : d = Math.abs(t[f] - a), d < c && (c = d, h = f);
    return h = !n || c <= n ? t[h] : o, r || h === o || yn(o) ? h : h + Ve(o);
  } : Il(t));
}, Kf = function(t, e, i, n) {
  return Hn(Ue(t) ? !e : i === !0 ? !!(i = 0) : !n, function() {
    return Ue(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * n) / n;
  });
}, Lg = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}, Rg = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || Ve(i));
  };
}, zg = function(t, e, i) {
  return Gf(t, e, 0, 1, i);
}, Xf = function(t, e, i) {
  return Hn(i, function(n) {
    return t[~~e(n)];
  });
}, Fg = function s(t, e, i) {
  var n = e - t;
  return Ue(t) ? Xf(t, s(0, t.length), e) : Hn(i, function(r) {
    return (n + (r - t) % n) % n + t;
  });
}, Ng = function s(t, e, i) {
  var n = e - t, r = n * 2;
  return Ue(t) ? Xf(t, s(0, t.length - 1), e) : Hn(i, function(o) {
    return o = (r + (o - t) % r) % r || 0, t + (o > n ? r - o : o);
  });
}, to = function(t) {
  for (var e = 0, i = "", n, r, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", r = t.substr(n + 7, o - n - 7).match(a ? kf : El), i += t.substr(e, n - e) + Kf(a ? r : +r[0], a ? 0 : +r[1], +r[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, Gf = function(t, e, i, n, r) {
  var o = e - t, a = n - i;
  return Hn(r, function(l) {
    return i + ((l - t) / o * a || 0);
  });
}, $g = function s(t, e, i, n) {
  var r = isNaN(t + e) ? 0 : function(u) {
    return (1 - u) * t + u * e;
  };
  if (!r) {
    var o = ke(t), a = {}, l, c, h, f, d;
    if (i === !0 && (n = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ue(t) && !Ue(e)) {
      for (h = [], f = t.length, d = f - 2, c = 1; c < f; c++)
        h.push(s(t[c - 1], t[c]));
      f--, r = function(m) {
        m *= f;
        var p = Math.min(d, ~~m);
        return h[p](m - p);
      }, i = e;
    } else n || (t = Qs(Ue(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        Bu.call(a, t, l, "get", e[l]);
      r = function(m) {
        return Wu(m, a) || (o ? t.p : t);
      };
    }
  }
  return Hn(i, r);
}, Wc = function(t, e, i) {
  var n = t.labels, r = Ji, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!i && a && r > (a = Math.abs(a)) && (l = o, r = a);
  return l;
}, _i = function(t, e, i) {
  var n = t.vars, r = n[e], o = Zt, a = t._ctx, l, c, h;
  if (r)
    return l = n[e + "Params"], c = n.callbackScope || t, i && Dn.length && ha(), a && (Zt = a), h = l ? r.apply(c, l) : r.call(c), Zt = o, h;
}, vr = function(t) {
  return Nn(t), t.scrollTrigger && t.scrollTrigger.kill(!!Re), t.progress() < 1 && _i(t, "onInterrupt"), t;
}, Ls, jf = [], Zf = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Du() || t.headless) {
      var e = t.name, i = ie(t), n = e && !i && t.init ? function() {
        this._props = [];
      } : t, r = {
        init: Jr,
        render: Wu,
        add: Bu,
        kill: e0,
        modifier: t0,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Yu,
        aliases: {},
        register: 0
      };
      if (er(), t !== n) {
        if (fi[e])
          return;
        bi(n, bi(fa(t, r), o)), Qs(n.prototype, Qs(r, fa(t, o))), fi[n.prop = e] = n, t.targetTest && (Qo.push(n), zu[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Df(e, n), t.register && t.register(Yt, n, ai);
    } else
      jf.push(t);
}, Bt = 255, br = {
  aqua: [0, Bt, Bt],
  lime: [0, Bt, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Bt],
  navy: [0, 0, 128],
  white: [Bt, Bt, Bt],
  olive: [128, 128, 0],
  yellow: [Bt, Bt, 0],
  orange: [Bt, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Bt, 0, 0],
  pink: [Bt, 192, 203],
  cyan: [0, Bt, Bt],
  transparent: [Bt, Bt, Bt, 0]
}, Za = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Bt + 0.5 | 0;
}, Qf = function(t, e, i) {
  var n = t ? yn(t) ? [t >> 16, t >> 8 & Bt, t & Bt] : 0 : br.black, r, o, a, l, c, h, f, d, u, m;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), br[t])
      n = br[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (r = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + r + r + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & Bt, n & Bt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & Bt, t & Bt];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = m = t.match(El), !e)
        l = +n[0] % 360 / 360, c = +n[1] / 100, h = +n[2] / 100, o = h <= 0.5 ? h * (c + 1) : h + c - h * c, r = h * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = Za(l + 1 / 3, r, o), n[1] = Za(l, r, o), n[2] = Za(l - 1 / 3, r, o);
      else if (~t.indexOf("="))
        return n = t.match(Pf), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(El) || br.transparent;
    n = n.map(Number);
  }
  return e && !m && (r = n[0] / Bt, o = n[1] / Bt, a = n[2] / Bt, f = Math.max(r, o, a), d = Math.min(r, o, a), h = (f + d) / 2, f === d ? l = c = 0 : (u = f - d, c = h > 0.5 ? u / (2 - f - d) : u / (f + d), l = f === r ? (o - a) / u + (o < a ? 6 : 0) : f === o ? (a - r) / u + 2 : (r - o) / u + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, Jf = function(t) {
  var e = [], i = [], n = -1;
  return t.split(Ln).forEach(function(r) {
    var o = r.match(Ds) || [];
    e.push.apply(e, o), i.push(n += o.length + 1);
  }), e.c = i, e;
}, Uc = function(t, e, i) {
  var n = "", r = (t + n).match(Ln), o = e ? "hsla(" : "rgba(", a = 0, l, c, h, f;
  if (!r)
    return t;
  if (r = r.map(function(d) {
    return (d = Qf(d, e, 1)) && o + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = Jf(t), l = i.c, l.join(n) !== h.c.join(n)))
    for (c = t.replace(Ln, "1").split(Ds), f = c.length - 1; a < f; a++)
      n += c[a] + (~l.indexOf(a) ? r.shift() || o + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!c)
    for (c = t.split(Ln), f = c.length - 1; a < f; a++)
      n += c[a] + r[a];
  return n + c[f];
}, Ln = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in br)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), Bg = /hsl[a]?\(/, td = function(t) {
  var e = t.join(" "), i;
  if (Ln.lastIndex = 0, Ln.test(e))
    return i = Bg.test(e), t[1] = Uc(t[1], i), t[0] = Uc(t[0], i, Jf(t[1])), !0;
}, eo, pi = function() {
  var s = Date.now, t = 500, e = 33, i = s(), n = i, r = 1e3 / 240, o = r, a = [], l, c, h, f, d, u, m = function p(_) {
    var b = s() - n, A = _ === !0, C, T, y, O;
    if ((b > t || b < 0) && (i += b - e), n += b, y = n - i, C = y - o, (C > 0 || A) && (O = ++f.frame, d = y - f.time * 1e3, f.time = y = y / 1e3, o += C + (C >= r ? 4 : r - C), T = 1), A || (l = c(p)), T)
      for (u = 0; u < a.length; u++)
        a[u](y, d, O, _);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(_) {
      return d / (1e3 / (_ || 60));
    },
    wake: function() {
      Mf && (!Al && Du() && (qi = Al = window, Lu = qi.document || {}, vi.gsap = Yt, (qi.gsapVersions || (qi.gsapVersions = [])).push(Yt.version), If(ca || qi.GreenSockGlobals || !qi.gsap && qi || {}), jf.forEach(Zf)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), c = h || function(_) {
        return setTimeout(_, o - f.time * 1e3 + 1 | 0);
      }, eo = 1, m(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), eo = 0, c = Jr;
    },
    lagSmoothing: function(_, b) {
      t = _ || 1 / 0, e = Math.min(b || 33, t);
    },
    fps: function(_) {
      r = 1e3 / (_ || 240), o = f.time * 1e3 + r;
    },
    add: function(_, b, A) {
      var C = b ? function(T, y, O, P) {
        _(T, y, O, P), f.remove(C);
      } : _;
      return f.remove(_), a[A ? "unshift" : "push"](C), er(), C;
    },
    remove: function(_, b) {
      ~(b = a.indexOf(_)) && a.splice(b, 1) && u >= b && u--;
    },
    _listeners: a
  }, f;
}(), er = function() {
  return !eo && pi.wake();
}, Et = {}, Vg = /^[\d.\-M][\d.\-,\s]/, Hg = /["']/g, Yg = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), n = i[0], r = 1, o = i.length, a, l, c; r < o; r++)
    l = i[r], a = r !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), e[n] = isNaN(c) ? c.replace(Hg, "").trim() : +c, n = l.substr(a + 1).trim();
  return e;
}, Wg = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
}, Ug = function(t) {
  var e = (t + "").split("("), i = Et[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [Yg(e[1])] : Wg(t).split(",").map(Ff)) : Et._CE && Vg.test(t) ? Et._CE("", t) : i;
}, ed = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, id = function s(t, e) {
  for (var i = t._first, n; i; )
    i instanceof ti ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next;
}, ns = function(t, e) {
  return t && (ie(t) ? t : Et[t] || Ug(t)) || e;
}, ys = function(t, e, i, n) {
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
    Et[a] = vi[a] = r, Et[o = a.toLowerCase()] = i;
    for (var l in r)
      Et[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = Et[a + "." + l] = r[l];
  }), r;
}, nd = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Qa = function s(t, e, i) {
  var n = e >= 1 ? e : 1, r = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = r / Sl * (Math.asin(1 / n) || 0), a = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * vg((h - o) * r) + 1;
  }, l = t === "out" ? a : t === "in" ? function(c) {
    return 1 - a(1 - c);
  } : nd(a);
  return r = Sl / r, l.config = function(c, h) {
    return s(t, c, h);
  }, l;
}, Ja = function s(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, n = t === "out" ? i : t === "in" ? function(r) {
    return 1 - i(1 - r);
  } : nd(i);
  return n.config = function(r) {
    return s(t, r);
  }, n;
};
oi("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  ys(s + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
Et.Linear.easeNone = Et.none = Et.Linear.easeIn;
ys("Elastic", Qa("in"), Qa("out"), Qa());
(function(s, t) {
  var e = 1 / t, i = 2 * e, n = 2.5 * e, r = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  ys("Bounce", function(o) {
    return 1 - r(1 - o);
  }, r);
})(7.5625, 2.75);
ys("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
ys("Circ", function(s) {
  return -(Af(1 - s * s) - 1);
});
ys("Sine", function(s) {
  return s === 1 ? 1 : -yg(s * gg) + 1;
});
ys("Back", Ja("in"), Ja("out"), Ja());
Et.SteppedEase = Et.steps = vi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, n = t + (e ? 0 : 1), r = e ? 1 : 0, o = 1 - We;
    return function(a) {
      return ((n * wo(0, o, a) | 0) + r) * i;
    };
  }
};
Zs.ease = Et["quad.out"];
oi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Fu += s + "," + s + "Params,";
});
var sd = function(t, e) {
  this.id = _g++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Rf, this.set = e ? e.getSetter : Yu;
}, io = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, tr(this, +e.duration, 1, 1), this.data = e.data, Zt && (this._ctx = Zt, Zt.data.push(this)), eo || pi.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, tr(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, n) {
    if (er(), !arguments.length)
      return this._tTime;
    var r = this._dp;
    if (r && r.smoothChildTiming && this._ts) {
      for (La(this, i), !r._dp || r.parent || Bf(r, this); r && r.parent; )
        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Gi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === We || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), zf(this, i, n)), this;
  }, t.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Hc(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Hc(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? Js(this._tTime, r) + 1 : 1;
  }, t.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? da(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(wo(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), Da(this), Ag(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (er(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== We && (this._tTime -= We)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Gi(n, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ri(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var n = this.parent || this._dp;
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? da(n.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = xg);
    var n = Re;
    return Re = i, $u(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Re = n, this;
  }, t.globalTime = function(i) {
    for (var n = this, r = arguments.length ? i : n.rawTime(); n; )
      r = n._start + r / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : r;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Yc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = i, Yc(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, n) {
    return this.totalTime(Ai(this, i), ri(n));
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
      var o = ie(i) ? i : Nf, a = function() {
        var c = n.then;
        n.then = null, ie(o) && (o = o(n)) && (o.then || o === n) && (n.then = c), r(o), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    vr(this);
  }, s;
}();
bi(io.prototype, {
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
  Ef(t, s);
  function t(i, n) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = ri(i.sortChildren), Jt && Gi(i.parent || Jt, un(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && Vf(un(r), i.scrollTrigger), r;
  }
  var e = t.prototype;
  return e.to = function(n, r, o) {
    return Lr(0, arguments, this), this;
  }, e.from = function(n, r, o) {
    return Lr(1, arguments, this), this;
  }, e.fromTo = function(n, r, o, a) {
    return Lr(2, arguments, this), this;
  }, e.set = function(n, r, o) {
    return r.duration = 0, r.parent = this, Dr(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new ge(n, r, Ai(this, o), 1), this;
  }, e.call = function(n, r, o) {
    return Gi(this, ge.delayedCall(0, n, r), o);
  }, e.staggerTo = function(n, r, o, a, l, c, h) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = h, o.parent = this, new ge(n, o, Ai(this, l)), this;
  }, e.staggerFrom = function(n, r, o, a, l, c, h) {
    return o.runBackwards = 1, Dr(o).immediateRender = ri(o.immediateRender), this.staggerTo(n, r, o, a, l, c, h);
  }, e.staggerFromTo = function(n, r, o, a, l, c, h, f) {
    return a.startAt = o, Dr(a).immediateRender = ri(a.immediateRender), this.staggerTo(n, r, a, l, c, h, f);
  }, e.render = function(n, r, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, h = n <= 0 ? 0 : _e(n), f = this._zTime < 0 != n < 0 && (this._initted || !c), d, u, m, p, _, b, A, C, T, y, O, P;
    if (this !== Jt && h > l && n >= 0 && (h = l), h !== this._tTime || o || f) {
      if (a !== this._time && c && (h += this._time - a, n += this._time - a), d = h, T = this._start, C = this._ts, b = !C, f && (c || (a = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (O = this._yoyo, _ = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(_ * 100 + n, r, o);
        if (d = _e(h % _), h === l ? (p = this._repeat, d = c) : (y = _e(h / _), p = ~~y, p && p === y && (d = c, p--), d > c && (d = c)), y = Js(this._tTime, _), !a && this._tTime && y !== p && this._tTime - y * _ - this._dur <= 0 && (y = p), O && p & 1 && (d = c - d, P = 1), p !== y && !this._lock) {
          var S = O && y & 1, k = S === (O && p & 1);
          if (p < y && (S = !S), a = S ? 0 : h % c ? c : h, this._lock = 1, this.render(a || (P ? 0 : _e(p * _)), r, !c)._lock = 0, this._tTime = h, !r && this.parent && _i(this, "onRepeat"), this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1), a && a !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, k && (this._lock = 2, a = S ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !P && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          id(this, P);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = kg(this, _e(a), _e(d)), A && (h -= d - (d = A._start))), this._tTime = h, this._time = d, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !r && !y && (_i(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && n >= 0)
        for (u = this._first; u; ) {
          if (m = u._next, (u._act || d >= u._start) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (d - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (d - u._start) * u._ts, r, o), d !== this._time || !this._ts && !b) {
              A = 0, m && (h += this._zTime = -1e-8);
              break;
            }
          }
          u = m;
        }
      else {
        u = this._last;
        for (var R = n < 0 ? n : d; u; ) {
          if (m = u._prev, (u._act || R <= u._end) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (R - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (R - u._start) * u._ts, r, o || Re && $u(u)), d !== this._time || !this._ts && !b) {
              A = 0, m && (h += this._zTime = R ? -1e-8 : We);
              break;
            }
          }
          u = m;
        }
      }
      if (A && !r && (this.pause(), A.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = T, Da(this), this.render(n, r, o);
      this._onUpdate && !r && _i(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (T === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (h === l && this._ts > 0 || !h && this._ts < 0) && Nn(this, 1), !r && !(n < 0 && !a) && (h || a || !l) && (_i(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, r) {
    var o = this;
    if (yn(r) || (r = Ai(this, r, n)), !(n instanceof io)) {
      if (Ue(n))
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
    return this !== n ? Gi(this, n, r) : this;
  }, e.getChildren = function(n, r, o, a) {
    n === void 0 && (n = !0), r === void 0 && (r = !0), o === void 0 && (o = !0), a === void 0 && (a = -1e8);
    for (var l = [], c = this._first; c; )
      c._start >= a && (c instanceof ge ? r && l.push(c) : (o && l.push(c), n && l.push.apply(l, c.getChildren(!0, r, o)))), c = c._next;
    return l;
  }, e.getById = function(n) {
    for (var r = this.getChildren(1, 1, 1), o = r.length; o--; )
      if (r[o].vars.id === n)
        return r[o];
  }, e.remove = function(n) {
    return ke(n) ? this.removeLabel(n) : ie(n) ? this.killTweensOf(n) : (n.parent === this && Ia(this, n), n === this._recent && (this._recent = this._last), is(this));
  }, e.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = _e(pi.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, r) {
    return this.labels[n] = Ai(this, r), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, r, o) {
    var a = ge.delayedCall(0, r || Jr, o);
    return a.data = "isPause", this._hasPause = 1, Gi(this, a, Ai(this, n));
  }, e.removePause = function(n) {
    var r = this._first;
    for (n = Ai(this, n); r; )
      r._start === n && r.data === "isPause" && Nn(r), r = r._next;
  }, e.killTweensOf = function(n, r, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      Cn !== a[l] && a[l].kill(n, r);
    return this;
  }, e.getTweensOf = function(n, r) {
    for (var o = [], a = Oi(n), l = this._first, c = yn(r), h; l; )
      l instanceof ge ? Tg(l._targets, a) && (c ? (!Cn || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && o.push(l) : (h = l.getTweensOf(a, r)).length && o.push.apply(o, h), l = l._next;
    return o;
  }, e.tweenTo = function(n, r) {
    r = r || {};
    var o = this, a = Ai(o, n), l = r, c = l.startAt, h = l.onStart, f = l.onStartParams, d = l.immediateRender, u, m = ge.to(o, bi({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || We,
      onStart: function() {
        if (o.pause(), !u) {
          var _ = r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          m._dur !== _ && tr(m, _, 0, 1).render(m._time, !0, !0), u = 1;
        }
        h && h.apply(m, f || []);
      }
    }, r));
    return d ? m.render(0) : m;
  }, e.tweenFromTo = function(n, r, o) {
    return this.tweenTo(r, bi({
      startAt: {
        time: Ai(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), Wc(this, Ai(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), Wc(this, Ai(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + We);
  }, e.shiftChildren = function(n, r, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (r)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return is(this);
  }, e.invalidate = function(n) {
    var r = this._first;
    for (this._lock = 0; r; )
      r.invalidate(n), r = r._next;
    return s.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var r = this._first, o; r; )
      o = r._next, this.remove(r), r = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), is(this);
  }, e.totalDuration = function(n) {
    var r = 0, o = this, a = o._last, l = Ji, c, h, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Gi(o, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (r -= h, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > r && a._ts && (r = a._end), a = c;
      tr(o, o === Jt && o._time > r ? o._time : r, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (Jt._ts && (zf(Jt, da(n, Jt)), Lf = pi.frame), pi.frame >= Bc) {
      Bc += yi.autoSleep || 120;
      var r = Jt._first;
      if ((!r || !r._ts) && yi.autoSleep && pi._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || pi.sleep();
      }
    }
  }, t;
}(io);
bi(ti.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var qg = function(t, e, i, n, r, o, a) {
  var l = new ai(this._pt, t, e, 0, 1, cd, null, r), c = 0, h = 0, f, d, u, m, p, _, b, A;
  for (l.b = i, l.e = n, i += "", n += "", (b = ~n.indexOf("random(")) && (n = to(n)), o && (A = [i, n], o(A, t, e), i = A[0], n = A[1]), d = i.match(Ga) || []; f = Ga.exec(n); )
    m = f[0], p = n.substring(c, f.index), u ? u = (u + 1) % 5 : p.substr(-5) === "rgba(" && (u = 1), m !== d[h++] && (_ = parseFloat(d[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: m.charAt(1) === "=" ? $s(_, m) - _ : parseFloat(m) - _,
      m: u && u < 4 ? Math.round : 0
    }, c = Ga.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = a, (Of.test(n) || b) && (l.e = 0), this._pt = l, l;
}, Bu = function(t, e, i, n, r, o, a, l, c, h) {
  ie(n) && (n = n(r || 0, t, o));
  var f = t[e], d = i !== "get" ? i : ie(f) ? c ? t[e.indexOf("set") || !ie(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : f, u = ie(f) ? c ? Zg : ld : Hu, m;
  if (ke(n) && (~n.indexOf("random(") && (n = to(n)), n.charAt(1) === "=" && (m = $s(d, n) + (Ve(d) || 0), (m || m === 0) && (n = m))), !h || d !== n || Dl)
    return !isNaN(d * n) && n !== "" ? (m = new ai(this._pt, t, e, +d || 0, n - (d || 0), typeof f == "boolean" ? Jg : ud, 0, u), c && (m.fp = c), a && m.modifier(a, this, t), this._pt = m) : (!f && !(e in t) && Ru(e, n), qg.call(this, t, e, d, n, u, l || yi.stringFilter, c));
}, Kg = function(t, e, i, n, r) {
  if (ie(t) && (t = Rr(t, r, e, i, n)), !en(t) || t.style && t.nodeType || Ue(t) || Cf(t))
    return ke(t) ? Rr(t, r, e, i, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Rr(t[a], r, e, i, n);
  return o;
}, rd = function(t, e, i, n, r, o) {
  var a, l, c, h;
  if (fi[t] && (a = new fi[t]()).init(r, a.rawVars ? e[t] : Kg(e[t], n, r, o, i), i, n, o) !== !1 && (i._pt = l = new ai(i._pt, r, t, 0, 1, a.render, a, 0, a.priority), i !== Ls))
    for (c = i._ptLookup[i._targets.indexOf(r)], h = a._props.length; h--; )
      c[a._props[h]] = l;
  return a;
}, Cn, Dl, Vu = function s(t, e, i) {
  var n = t.vars, r = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, c = n.onUpdate, h = n.runBackwards, f = n.yoyoEase, d = n.keyframes, u = n.autoRevert, m = t._dur, p = t._startAt, _ = t._targets, b = t.parent, A = b && b.data === "nested" ? b.vars.targets : _, C = t._overwrite === "auto" && !Mu, T = t.timeline, y, O, P, S, k, R, H, z, B, J, it, q, Y;
  if (T && (!d || !r) && (r = "none"), t._ease = ns(r, Zs.ease), t._yEase = f ? ed(ns(f === !0 ? r : f, Zs.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !T && !!n.runBackwards, !T || d && !n.stagger) {
    if (z = _[0] ? es(_[0]).harness : 0, q = z && n[z.prop], y = fa(n, zu), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !u ? p.render(-1, !0) : p.revert(h && m ? Zo : wg), p._lazy = 0), o) {
      if (Nn(t._startAt = ge.set(_, bi({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && ri(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return _i(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Re || !a && !u) && t._startAt.revert(Zo), a && m && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && m && !p) {
      if (e && (a = !1), P = bi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ri(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), q && (P[z.prop] = q), Nn(t._startAt = ge.set(_, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Re ? t._startAt.revert(Zo) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, We, We);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ri(l) || l && !m, O = 0; O < _.length; O++) {
      if (k = _[O], H = k._gsap || Nu(_)[O]._gsap, t._ptLookup[O] = J = {}, Cl[H.id] && Dn.length && ha(), it = A === _ ? O : A.indexOf(k), z && (B = new z()).init(k, q || y, t, it, A) !== !1 && (t._pt = S = new ai(t._pt, k, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(tt) {
        J[tt] = S;
      }), B.priority && (R = 1)), !z || q)
        for (P in y)
          fi[P] && (B = rd(P, y, t, it, k, A)) ? B.priority && (R = 1) : J[P] = S = Bu.call(t, k, P, "get", y[P], it, A, 0, n.stringFilter);
      t._op && t._op[O] && t.kill(k, t._op[O]), C && t._pt && (Cn = t, Jt.killTweensOf(k, J, t.globalTime(e)), Y = !t.parent, Cn = 0), t._pt && l && (Cl[H.id] = 1);
    }
    R && hd(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !Y, d && e <= 0 && T.render(Ji, !0, !0);
}, Xg = function(t, e, i, n, r, o, a, l) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, u;
  if (!c)
    for (c = t._ptCache[e] = [], d = t._ptLookup, u = t._targets.length; u--; ) {
      if (h = d[u][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Dl = 1, t.vars[e] = "+=0", Vu(t, a), Dl = 0, l ? Qr(e + " not eligible for reset") : 1;
      c.push(h);
    }
  for (u = c.length; u--; )
    f = c[u], h = f._pt || f, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + o * h.c, h.c = i - h.s, f.e && (f.e = ae(i) + Ve(f.e)), f.b && (f.b = h.s + Ve(f.b));
}, Gg = function(t, e) {
  var i = t[0] ? es(t[0]).harness : 0, n = i && i.aliases, r, o, a, l;
  if (!n)
    return e;
  r = Qs({}, e);
  for (o in n)
    if (o in r)
      for (l = n[o].split(","), a = l.length; a--; )
        r[l[a]] = r[o];
  return r;
}, jg = function(t, e, i, n) {
  var r = e.ease || n || "power1.inOut", o, a;
  if (Ue(e))
    a = i[t] || (i[t] = []), e.forEach(function(l, c) {
      return a.push({
        t: c / (e.length - 1) * 100,
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
}, Rr = function(t, e, i, n, r) {
  return ie(t) ? t.call(e, i, n, r) : ke(t) && ~t.indexOf("random(") ? to(t) : t;
}, od = Fu + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ad = {};
oi(od + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return ad[s] = 1;
});
var ge = /* @__PURE__ */ function(s) {
  Ef(t, s);
  function t(i, n, r, o) {
    var a;
    typeof n == "number" && (r.duration = n, n = r, r = null), a = s.call(this, o ? n : Dr(n)) || this;
    var l = a.vars, c = l.duration, h = l.delay, f = l.immediateRender, d = l.stagger, u = l.overwrite, m = l.keyframes, p = l.defaults, _ = l.scrollTrigger, b = l.yoyoEase, A = n.parent || Jt, C = (Ue(i) || Cf(i) ? yn(i[0]) : "length" in n) ? [i] : Oi(i), T, y, O, P, S, k, R, H;
    if (a._targets = C.length ? Nu(C) : Qr("GSAP target " + i + " not found. https://gsap.com", !yi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = u, m || d || Io(c) || Io(h)) {
      if (n = a.vars, T = a.timeline = new ti({
        data: "nested",
        defaults: p || {},
        targets: A && A.data === "nested" ? A.vars.targets : C
      }), T.kill(), T.parent = T._dp = un(a), T._start = 0, d || Io(c) || Io(h)) {
        if (P = C.length, R = d && Uf(d), en(d))
          for (S in d)
            ~od.indexOf(S) && (H || (H = {}), H[S] = d[S]);
        for (y = 0; y < P; y++)
          O = fa(n, ad), O.stagger = 0, b && (O.yoyoEase = b), H && Qs(O, H), k = C[y], O.duration = +Rr(c, un(a), y, k, C), O.delay = (+Rr(h, un(a), y, k, C) || 0) - a._delay, !d && P === 1 && O.delay && (a._delay = h = O.delay, a._start += h, O.delay = 0), T.to(k, O, R ? R(y, k, C) : 0), T._ease = Et.none;
        T.duration() ? c = h = 0 : a.timeline = 0;
      } else if (m) {
        Dr(bi(T.vars.defaults, {
          ease: "none"
        })), T._ease = ns(m.ease || n.ease || "none");
        var z = 0, B, J, it;
        if (Ue(m))
          m.forEach(function(q) {
            return T.to(C, q, ">");
          }), T.duration();
        else {
          O = {};
          for (S in m)
            S === "ease" || S === "easeEach" || jg(S, m[S], O, m.easeEach);
          for (S in O)
            for (B = O[S].sort(function(q, Y) {
              return q.t - Y.t;
            }), z = 0, y = 0; y < B.length; y++)
              J = B[y], it = {
                ease: J.e,
                duration: (J.t - (y ? B[y - 1].t : 0)) / 100 * c
              }, it[S] = J.v, T.to(C, it, z), z += it.duration;
          T.duration() < c && T.to({}, {
            duration: c - T.duration()
          });
        }
      }
      c || a.duration(c = T.duration());
    } else
      a.timeline = 0;
    return u === !0 && !Mu && (Cn = un(a), Jt.killTweensOf(C), Cn = 0), Gi(A, un(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !c && !m && a._start === _e(A._time) && ri(f) && Cg(un(a)) && A.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), _ && Vf(un(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(n, r, o) {
    var a = this._time, l = this._tDur, c = this._dur, h = n < 0, f = n > l - We && !h ? l : n < We ? 0 : n, d, u, m, p, _, b, A, C, T;
    if (!c)
      Og(this, n, r, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, C = this.timeline, this._repeat) {
        if (p = c + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + n, r, o);
        if (d = _e(f % p), f === l ? (m = this._repeat, d = c) : (_ = _e(f / p), m = ~~_, m && m === _ ? (d = c, m--) : d > c && (d = c)), b = this._yoyo && m & 1, b && (T = this._yEase, d = c - d), _ = Js(this._tTime, p), d === a && !o && this._initted && m === _)
          return this._tTime = f, this;
        m !== _ && (C && this._yEase && id(C, b), this.vars.repeatRefresh && !b && !this._lock && d !== p && this._initted && (this._lock = o = 1, this.render(_e(p * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Hf(this, h ? n : d, o, r, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && m !== _))
          return this;
        if (c !== this._dur)
          return this.render(n, r, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (T || this._ease)(d / c), this._from && (this.ratio = A = 1 - A), !a && f && !r && !_ && (_i(this, "onStart"), this._tTime !== f))
        return this;
      for (u = this._pt; u; )
        u.r(A, u.d), u = u._next;
      C && C.render(n < 0 ? n : C._dur * C._ease(d / this._dur), r, o) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && Pl(this, n, r, o), _i(this, "onUpdate")), this._repeat && m !== _ && this.vars.onRepeat && !r && this.parent && _i(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && Pl(this, n, !0, !0), (n || !c) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Nn(this, 1), !r && !(h && !a) && (f || a || b) && (_i(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, r, o, a, l) {
    eo || pi.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Vu(this, c), h = this._ease(c / this._dur), Xg(this, n, r, o, a, h, c, l) ? this.resetTo(n, r, o, a, 1) : (La(this, 0), this.parent || $f(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? vr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Re), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, Cn && Cn.vars.overwrite !== !0)._first || vr(this), this.parent && o !== this.timeline.totalDuration() && tr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Oi(n) : a, c = this._ptLookup, h = this._pt, f, d, u, m, p, _, b;
    if ((!r || r === "all") && Eg(a, l))
      return r === "all" && (this._pt = 0), vr(this);
    for (f = this._op = this._op || [], r !== "all" && (ke(r) && (p = {}, oi(r, function(A) {
      return p[A] = 1;
    }), r = p), r = Gg(a, r)), b = a.length; b--; )
      if (~l.indexOf(a[b])) {
        d = c[b], r === "all" ? (f[b] = r, m = d, u = {}) : (u = f[b] = f[b] || {}, m = r);
        for (p in m)
          _ = d && d[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Ia(this, _, "_pt"), delete d[p]), u !== "all" && (u[p] = 1);
      }
    return this._initted && !this._pt && h && vr(this), this;
  }, t.to = function(n, r) {
    return new t(n, r, arguments[2]);
  }, t.from = function(n, r) {
    return Lr(1, arguments);
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
    return Lr(2, arguments);
  }, t.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new t(n, r);
  }, t.killTweensOf = function(n, r, o) {
    return Jt.killTweensOf(n, r, o);
  }, t;
}(io);
bi(ge.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
oi("staggerTo,staggerFrom,staggerFromTo", function(s) {
  ge[s] = function() {
    var t = new ti(), e = kl.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var Hu = function(t, e, i) {
  return t[e] = i;
}, ld = function(t, e, i) {
  return t[e](i);
}, Zg = function(t, e, i, n) {
  return t[e](n.fp, i);
}, Qg = function(t, e, i) {
  return t.setAttribute(e, i);
}, Yu = function(t, e) {
  return ie(t[e]) ? ld : Iu(t[e]) && t.setAttribute ? Qg : Hu;
}, ud = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Jg = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, cd = function(t, e) {
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
}, Wu = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, t0 = function(t, e, i, n) {
  for (var r = this._pt, o; r; )
    o = r._next, r.p === n && r.modifier(t, e, i), r = o;
}, e0 = function(t) {
  for (var e = this._pt, i, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? Ia(this, e, "_pt") : e.dep || (i = 1), e = n;
  return !i;
}, i0 = function(t, e, i, n) {
  n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
}, hd = function(t) {
  for (var e = t._pt, i, n, r, o; e; ) {
    for (i = e._next, n = r; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : r = e, (e._next = n) ? n._prev = e : o = e, e = i;
  }
  t._pt = r;
}, ai = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a, l, c, h) {
    this.t = i, this.s = r, this.c = o, this.p = n, this.r = a || ud, this.d = l || this, this.set = c || Hu, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = i0, this.m = i, this.mt = r, this.tween = n;
  }, s;
}();
oi(Fu + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return zu[s] = 1;
});
vi.TweenMax = vi.TweenLite = ge;
vi.TimelineLite = vi.TimelineMax = ti;
Jt = new ti({
  sortChildren: !1,
  defaults: Zs,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
yi.stringFilter = td;
var ss = [], Jo = {}, n0 = [], qc = 0, s0 = 0, tl = function(t) {
  return (Jo[t] || n0).map(function(e) {
    return e();
  });
}, Ll = function() {
  var t = Date.now(), e = [];
  t - qc > 2 && (tl("matchMediaInit"), ss.forEach(function(i) {
    var n = i.queries, r = i.conditions, o, a, l, c;
    for (a in n)
      o = qi.matchMedia(n[a]).matches, o && (l = 1), o !== r[a] && (r[a] = o, c = 1);
    c && (i.revert(), l && e.push(i));
  }), tl("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), qc = t, tl("matchMedia"));
}, fd = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Ml(i), this.data = [], this._r = [], this.isReverted = !1, this.id = s0++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    ie(i) && (r = n, n = i, i = ie);
    var o = this, a = function() {
      var c = Zt, h = o.selector, f;
      return c && c !== o && c.data.push(o), r && (o.selector = Ml(r)), Zt = o, f = n.apply(o, arguments), ie(f) && o._r.push(f), Zt = c, o.selector = h, o.isReverted = !1, f;
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
      for (var a = r.getTweens(), l = r.data.length, c; l--; )
        c = r.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(h) {
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
        c = r.data[l], c instanceof ti ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof ge) && c.revert && c.revert(i);
      r._r.forEach(function(h) {
        return h(i, r);
      }), r.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = ss.length; o--; )
        ss[o].id === this.id && ss.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), r0 = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Zt && Zt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    en(i) || (i = {
      matches: i
    });
    var o = new fd(0, r || this.scope), a = o.conditions = {}, l, c, h;
    Zt && !o.selector && (o.selector = Zt.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = i;
    for (c in i)
      c === "all" ? h = 1 : (l = qi.matchMedia(i[c]), l && (ss.indexOf(o) < 0 && ss.push(o), (a[c] = l.matches) && (h = 1), l.addListener ? l.addListener(Ll) : l.addEventListener("change", Ll)));
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
}(), pa = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(n) {
      return Zf(n);
    });
  },
  timeline: function(t) {
    return new ti(t);
  },
  getTweensOf: function(t, e) {
    return Jt.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, n) {
    ke(t) && (t = Oi(t)[0]);
    var r = es(t || {}).get, o = i ? Nf : Ff;
    return i === "native" && (i = ""), t && (e ? o((fi[e] && fi[e].get || r)(t, e, i, n)) : function(a, l, c) {
      return o((fi[a] && fi[a].get || r)(t, a, l, c));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Oi(t), t.length > 1) {
      var n = t.map(function(h) {
        return Yt.quickSetter(h, e, i);
      }), r = n.length;
      return function(h) {
        for (var f = r; f--; )
          n[f](h);
      };
    }
    t = t[0] || {};
    var o = fi[e], a = es(t), l = a.harness && (a.harness.aliases || {})[e] || e, c = o ? function(h) {
      var f = new o();
      Ls._pt = 0, f.init(t, i ? h + i : h, Ls, 0, [t]), f.render(1, f), Ls._pt && Wu(1, Ls);
    } : a.set(t, l);
    return o ? c : function(h) {
      return c(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var n, r = Yt.to(t, bi((n = {}, n[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), o = function(l, c, h) {
      return r.resetTo(e, l, c, h);
    };
    return o.tween = r, o;
  },
  isTweening: function(t) {
    return Jt.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = ns(t.ease, Zs.ease)), Vc(Zs, t || {});
  },
  config: function(t) {
    return Vc(yi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, n = t.plugins, r = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !fi[a] && !vi[a] && Qr(e + " effect requires " + a + " plugin.");
    }), ja[e] = function(a, l, c) {
      return i(Oi(a), bi(l || {}, r), c);
    }, o && (ti.prototype[e] = function(a, l, c) {
      return this.add(ja[e](a, en(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    Et[t] = ns(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? ns(t, e) : Et;
  },
  getById: function(t) {
    return Jt.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ti(t), n, r;
    for (i.smoothChildTiming = ri(t.smoothChildTiming), Jt.remove(i), i._dp = 0, i._time = i._tTime = Jt._time, n = Jt._first; n; )
      r = n._next, (e || !(!n._dur && n instanceof ge && n.vars.onComplete === n._targets[0])) && Gi(i, n, n._start - n._delay), n = r;
    return Gi(Jt, i, 0), i;
  },
  context: function(t, e) {
    return t ? new fd(t, e) : Zt;
  },
  matchMedia: function(t) {
    return new r0(t);
  },
  matchMediaRefresh: function() {
    return ss.forEach(function(t) {
      var e = t.conditions, i, n;
      for (n in e)
        e[n] && (e[n] = !1, i = 1);
      i && t.revert();
    }) || Ll();
  },
  addEventListener: function(t, e) {
    var i = Jo[t] || (Jo[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = Jo[t], n = i && i.indexOf(e);
    n >= 0 && i.splice(n, 1);
  },
  utils: {
    wrap: Fg,
    wrapYoyo: Ng,
    distribute: Uf,
    random: Kf,
    snap: qf,
    normalize: zg,
    getUnit: Ve,
    clamp: Ig,
    splitColor: Qf,
    toArray: Oi,
    selector: Ml,
    mapRange: Gf,
    pipe: Lg,
    unitize: Rg,
    interpolate: $g,
    shuffle: Wf
  },
  install: If,
  effects: ja,
  ticker: pi,
  updateRoot: ti.updateRoot,
  plugins: fi,
  globalTimeline: Jt,
  core: {
    PropTween: ai,
    globals: Df,
    Tween: ge,
    Timeline: ti,
    Animation: io,
    getCache: es,
    _removeLinkedListItem: Ia,
    reverting: function() {
      return Re;
    },
    context: function(t) {
      return t && Zt && (Zt.data.push(t), t._ctx = Zt), Zt;
    },
    suppressOverwrites: function(t) {
      return Mu = t;
    }
  }
};
oi("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return pa[s] = ge[s];
});
pi.add(ti.updateRoot);
Ls = pa.to({}, {
  duration: 0
});
var o0 = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, a0 = function(t, e) {
  var i = t._targets, n, r, o;
  for (n in e)
    for (r = i.length; r--; )
      o = t._ptLookup[r][n], o && (o = o.d) && (o._pt && (o = o0(o, n)), o && o.modifier && o.modifier(e[n], t, i[r], n));
}, el = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, o) {
      o._onInit = function(a) {
        var l, c;
        if (ke(r) && (l = {}, oi(r, function(h) {
          return l[h] = 1;
        }), r = l), e) {
          l = {};
          for (c in r)
            l[c] = e(r[c]);
          r = l;
        }
        a0(a, r);
      };
    }
  };
}, Yt = pa.registerPlugin({
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
}, el("roundProps", Il), el("modifiers"), el("snap", qf)) || pa;
ge.version = ti.version = Yt.version = "3.13.0";
Mf = 1;
Du() && er();
Et.Power0;
Et.Power1;
Et.Power2;
Et.Power3;
Et.Power4;
Et.Linear;
Et.Quad;
Et.Cubic;
Et.Quart;
Et.Quint;
Et.Strong;
Et.Elastic;
Et.Back;
Et.SteppedEase;
Et.Bounce;
Et.Sine;
Et.Expo;
Et.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Kc, Pn, Bs, Uu, Zn, Xc, qu, l0 = function() {
  return typeof window < "u";
}, vn = {}, Kn = 180 / Math.PI, Vs = Math.PI / 180, xs = Math.atan2, Gc = 1e8, Ku = /([A-Z])/g, u0 = /(left|right|width|margin|padding|x)/i, c0 = /[\s,\(]\S/, ji = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Rl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, h0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, f0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, d0 = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, dd = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, pd = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, p0 = function(t, e, i) {
  return t.style[e] = i;
}, m0 = function(t, e, i) {
  return t.style.setProperty(e, i);
}, g0 = function(t, e, i) {
  return t._gsap[e] = i;
}, _0 = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, y0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(r, o);
}, v0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(r, o);
}, te = "transform", li = te + "Origin", b0 = function s(t, e) {
  var i = this, n = this.target, r = n.style, o = n._gsap;
  if (t in vn && r) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = ji[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = cn(n, a);
      }) : this.tfm[t] = o.x ? o[t] : cn(n, t), t === li && (this.tfm.zOrigin = o.zOrigin);
    else
      return ji.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(te) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(li, e, "")), t = te;
  }
  (r || e) && this.props.push(t, e, r[t]);
}, md = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, w0 = function() {
  var t = this.props, e = this.target, i = e.style, n = e._gsap, r, o;
  for (r = 0; r < t.length; r += 3)
    t[r + 1] ? t[r + 1] === 2 ? e[t[r]](t[r + 2]) : e[t[r]] = t[r + 2] : t[r + 2] ? i[t[r]] = t[r + 2] : i.removeProperty(t[r].substr(0, 2) === "--" ? t[r] : t[r].replace(Ku, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), r = qu(), (!r || !r.isStart) && !i[te] && (md(i), n.zOrigin && i[li] && (i[li] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, gd = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: w0,
    save: b0
  };
  return t._gsap || Yt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, _d, zl = function(t, e) {
  var i = Pn.createElementNS ? Pn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Pn.createElement(t);
  return i && i.style ? i : Pn.createElement(t);
}, ki = function s(t, e, i) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(Ku, "-$1").toLowerCase()) || n.getPropertyValue(e) || !i && s(t, ir(e) || e, 1) || "";
}, jc = "O,Moz,ms,Ms,Webkit".split(","), ir = function(t, e, i) {
  var n = e || Zn, r = n.style, o = 5;
  if (t in r && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(jc[o] + t in r); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? jc[o] : "") + t;
}, Fl = function() {
  l0() && window.document && (Kc = window, Pn = Kc.document, Bs = Pn.documentElement, Zn = zl("div") || {
    style: {}
  }, zl("div"), te = ir(te), li = te + "Origin", Zn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", _d = !!ir("perspective"), qu = Yt.core.reverting, Uu = 1);
}, Zc = function(t) {
  var e = t.ownerSVGElement, i = zl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = t.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), Bs.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), Bs.removeChild(i), r;
}, Qc = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, yd = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Zc(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Zc(t)), e && !e.width && !e.x && !e.y ? {
    x: +Qc(t, ["x", "cx", "x1"]) || 0,
    y: +Qc(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, vd = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && yd(t));
}, fs = function(t, e) {
  if (e) {
    var i = t.style, n;
    e in vn && e !== li && (e = te), i.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(n === "--" ? e : e.replace(Ku, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, On = function(t, e, i, n, r, o) {
  var a = new ai(t._pt, e, i, 0, 1, o ? pd : dd);
  return t._pt = a, a.b = n, a.e = r, t._props.push(i), a;
}, Jc = {
  deg: 1,
  rad: 1,
  turn: 1
}, x0 = {
  grid: 1,
  flex: 1
}, $n = function s(t, e, i, n) {
  var r = parseFloat(i) || 0, o = (i + "").trim().substr((r + "").length) || "px", a = Zn.style, l = u0.test(e), c = t.tagName.toLowerCase() === "svg", h = (c ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, d = n === "px", u = n === "%", m, p, _, b;
  if (n === o || !r || Jc[n] || Jc[o])
    return r;
  if (o !== "px" && !d && (r = s(t, e, i, "px")), b = t.getCTM && vd(t), (u || o === "%") && (vn[e] || ~e.indexOf("adius")))
    return m = b ? t.getBBox()[l ? "width" : "height"] : t[h], ae(u ? r / m * f : r / 100 * m);
  if (a[l ? "width" : "height"] = f + (d ? o : n), p = n !== "rem" && ~e.indexOf("adius") || n === "em" && t.appendChild && !c ? t : t.parentNode, b && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Pn || !p.appendChild) && (p = Pn.body), _ = p._gsap, _ && u && _.width && l && _.time === pi.time && !_.uncache)
    return ae(r / _.width * f);
  if (u && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = f + n, m = t[h], A ? t.style[e] = A : fs(t, e);
  } else
    (u || o === "%") && !x0[ki(p, "display")] && (a.position = ki(t, "position")), p === t && (a.position = "static"), p.appendChild(Zn), m = Zn[h], p.removeChild(Zn), a.position = "absolute";
  return l && u && (_ = es(p), _.time = pi.time, _.width = p[h]), ae(d ? m * r / f : m && r ? f / m * r : 0);
}, cn = function(t, e, i, n) {
  var r;
  return Uu || Fl(), e in ji && e !== "transform" && (e = ji[e], ~e.indexOf(",") && (e = e.split(",")[0])), vn[e] && e !== "transform" ? (r = so(t, n), r = e !== "transformOrigin" ? r[e] : r.svg ? r.origin : ga(ki(t, li)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = ma[e] && ma[e](t, e, i) || ki(t, e) || Rf(t, e) || (e === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? $n(t, e, r, i) + i : r;
}, T0 = function(t, e, i, n) {
  if (!i || i === "none") {
    var r = ir(e, t, 1), o = r && ki(t, r, 1);
    o && o !== i ? (e = r, i = o) : e === "borderColor" && (i = ki(t, "borderTopColor"));
  }
  var a = new ai(this._pt, t.style, e, 0, 1, cd), l = 0, c = 0, h, f, d, u, m, p, _, b, A, C, T, y;
  if (a.b = i, a.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = ki(t, n.substring(4, n.indexOf(")")))), n === "auto" && (p = t.style[e], t.style[e] = n, n = ki(t, e) || n, p ? t.style[e] = p : fs(t, e)), h = [i, n], td(h), i = h[0], n = h[1], d = i.match(Ds) || [], y = n.match(Ds) || [], y.length) {
    for (; f = Ds.exec(n); )
      _ = f[0], A = n.substring(l, f.index), m ? m = (m + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (m = 1), _ !== (p = d[c++] || "") && (u = parseFloat(p) || 0, T = p.substr((u + "").length), _.charAt(1) === "=" && (_ = $s(u, _) + T), b = parseFloat(_), C = _.substr((b + "").length), l = Ds.lastIndex - C.length, C || (C = C || yi.units[e] || T, l === n.length && (n += C, a.e += C)), T !== C && (u = $n(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: A || c === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: u,
        c: b - u,
        m: m && m < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? pd : dd;
  return Of.test(n) && (a.e = 0), this._pt = a, a;
}, th = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, S0 = function(t) {
  var e = t.split(" "), i = e[0], n = e[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (t = i, i = n, n = t), e[0] = th[i] || i, e[1] = th[n] || n, e.join(" ");
}, E0 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, n = i.style, r = e.u, o = i._gsap, a, l, c;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), c = r.length; --c > -1; )
        a = r[c], vn[a] && (l = 1, a = a === "transformOrigin" ? li : te), fs(i, a);
    l && (fs(i, te), o && (o.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", so(i, 1), o.uncache = 1, md(n)));
  }
}, ma = {
  clearProps: function(t, e, i, n, r) {
    if (r.data !== "isFromStart") {
      var o = t._pt = new ai(t._pt, e, i, 0, 0, E0);
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
}, no = [1, 0, 0, 1, 0, 0], bd = {}, wd = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, eh = function(t) {
  var e = ki(t, te);
  return wd(e) ? no : e.substr(7).match(Pf).map(ae);
}, Xu = function(t, e) {
  var i = t._gsap || es(t), n = t.style, r = eh(t), o, a, l, c;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? no : r) : (r === no && !t.offsetParent && t !== Bs && !i.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, a = t.nextElementSibling, Bs.appendChild(t)), r = eh(t), l ? n.display = l : fs(t, "display"), c && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : Bs.removeChild(t))), e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, Nl = function(t, e, i, n, r, o) {
  var a = t._gsap, l = r || Xu(t, !0), c = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, u = l[0], m = l[1], p = l[2], _ = l[3], b = l[4], A = l[5], C = e.split(" "), T = parseFloat(C[0]) || 0, y = parseFloat(C[1]) || 0, O, P, S, k;
  i ? l !== no && (P = u * _ - m * p) && (S = T * (_ / P) + y * (-p / P) + (p * A - _ * b) / P, k = T * (-m / P) + y * (u / P) - (u * A - m * b) / P, T = S, y = k) : (O = yd(t), T = O.x + (~C[0].indexOf("%") ? T / 100 * O.width : T), y = O.y + (~(C[1] || C[0]).indexOf("%") ? y / 100 * O.height : y)), n || n !== !1 && a.smooth ? (b = T - c, A = y - h, a.xOffset = f + (b * u + A * p) - b, a.yOffset = d + (b * m + A * _) - A) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = y, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!i, t.style[li] = "0px 0px", o && (On(o, a, "xOrigin", c, T), On(o, a, "yOrigin", h, y), On(o, a, "xOffset", f, a.xOffset), On(o, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + y);
}, so = function(t, e) {
  var i = t._gsap || new sd(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var n = t.style, r = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), c = ki(t, li) || "0", h, f, d, u, m, p, _, b, A, C, T, y, O, P, S, k, R, H, z, B, J, it, q, Y, tt, ot, w, j, nt, K, rt, It;
  return h = f = d = p = _ = b = A = C = T = 0, u = m = 1, i.svg = !!(t.getCTM && vd(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[te] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[te] !== "none" ? l[te] : "")), n.scale = n.rotate = n.translate = "none"), P = Xu(t, i.svg), i.svg && (i.uncache ? (tt = t.getBBox(), c = i.xOrigin - tt.x + "px " + (i.yOrigin - tt.y) + "px", Y = "") : Y = !e && t.getAttribute("data-svg-origin"), Nl(t, Y || c, !!Y || i.originIsAbsolute, i.smooth !== !1, P)), y = i.xOrigin || 0, O = i.yOrigin || 0, P !== no && (H = P[0], z = P[1], B = P[2], J = P[3], h = it = P[4], f = q = P[5], P.length === 6 ? (u = Math.sqrt(H * H + z * z), m = Math.sqrt(J * J + B * B), p = H || z ? xs(z, H) * Kn : 0, A = B || J ? xs(B, J) * Kn + p : 0, A && (m *= Math.abs(Math.cos(A * Vs))), i.svg && (h -= y - (y * H + O * B), f -= O - (y * z + O * J))) : (It = P[6], K = P[7], w = P[8], j = P[9], nt = P[10], rt = P[11], h = P[12], f = P[13], d = P[14], S = xs(It, nt), _ = S * Kn, S && (k = Math.cos(-S), R = Math.sin(-S), Y = it * k + w * R, tt = q * k + j * R, ot = It * k + nt * R, w = it * -R + w * k, j = q * -R + j * k, nt = It * -R + nt * k, rt = K * -R + rt * k, it = Y, q = tt, It = ot), S = xs(-B, nt), b = S * Kn, S && (k = Math.cos(-S), R = Math.sin(-S), Y = H * k - w * R, tt = z * k - j * R, ot = B * k - nt * R, rt = J * R + rt * k, H = Y, z = tt, B = ot), S = xs(z, H), p = S * Kn, S && (k = Math.cos(S), R = Math.sin(S), Y = H * k + z * R, tt = it * k + q * R, z = z * k - H * R, q = q * k - it * R, H = Y, it = tt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, b = 180 - b), u = ae(Math.sqrt(H * H + z * z + B * B)), m = ae(Math.sqrt(q * q + It * It)), S = xs(it, q), A = Math.abs(S) > 2e-4 ? S * Kn : 0, T = rt ? 1 / (rt < 0 ? -rt : rt) : 0), i.svg && (Y = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !wd(ki(t, te)), Y && t.setAttribute("transform", Y))), Math.abs(A) > 90 && Math.abs(A) < 270 && (r ? (u *= -1, A += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (m *= -1, A += A <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = d + o, i.scaleX = ae(u), i.scaleY = ae(m), i.rotation = ae(p) + a, i.rotationX = ae(_) + a, i.rotationY = ae(b) + a, i.skewX = A + a, i.skewY = C + a, i.transformPerspective = T + o, (i.zOrigin = parseFloat(c.split(" ")[2]) || !e && i.zOrigin || 0) && (n[li] = ga(c)), i.xOffset = i.yOffset = 0, i.force3D = yi.force3D, i.renderTransform = i.svg ? C0 : _d ? xd : A0, i.uncache = 0, i;
}, ga = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, il = function(t, e, i) {
  var n = Ve(e);
  return ae(parseFloat(e) + parseFloat($n(t, "x", i + "px", n))) + n;
}, A0 = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, xd(t, e);
}, Wn = "0deg", fr = "0px", Un = ") ", xd = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.z, c = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, u = i.skewY, m = i.scaleX, p = i.scaleY, _ = i.transformPerspective, b = i.force3D, A = i.target, C = i.zOrigin, T = "", y = b === "auto" && t && t !== 1 || b === !0;
  if (C && (f !== Wn || h !== Wn)) {
    var O = parseFloat(h) * Vs, P = Math.sin(O), S = Math.cos(O), k;
    O = parseFloat(f) * Vs, k = Math.cos(O), o = il(A, o, P * k * -C), a = il(A, a, -Math.sin(O) * -C), l = il(A, l, S * k * -C + C);
  }
  _ !== fr && (T += "perspective(" + _ + Un), (n || r) && (T += "translate(" + n + "%, " + r + "%) "), (y || o !== fr || a !== fr || l !== fr) && (T += l !== fr || y ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Un), c !== Wn && (T += "rotate(" + c + Un), h !== Wn && (T += "rotateY(" + h + Un), f !== Wn && (T += "rotateX(" + f + Un), (d !== Wn || u !== Wn) && (T += "skew(" + d + ", " + u + Un), (m !== 1 || p !== 1) && (T += "scale(" + m + ", " + p + Un), A.style[te] = T || "translate(0, 0)";
}, C0 = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.rotation, c = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, u = i.target, m = i.xOrigin, p = i.yOrigin, _ = i.xOffset, b = i.yOffset, A = i.forceCSS, C = parseFloat(o), T = parseFloat(a), y, O, P, S, k;
  l = parseFloat(l), c = parseFloat(c), h = parseFloat(h), h && (h = parseFloat(h), c += h, l += h), l || c ? (l *= Vs, c *= Vs, y = Math.cos(l) * f, O = Math.sin(l) * f, P = Math.sin(l - c) * -d, S = Math.cos(l - c) * d, c && (h *= Vs, k = Math.tan(c - h), k = Math.sqrt(1 + k * k), P *= k, S *= k, h && (k = Math.tan(h), k = Math.sqrt(1 + k * k), y *= k, O *= k)), y = ae(y), O = ae(O), P = ae(P), S = ae(S)) : (y = f, S = d, O = P = 0), (C && !~(o + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (C = $n(u, "x", o, "px"), T = $n(u, "y", a, "px")), (m || p || _ || b) && (C = ae(C + m - (m * y + p * P) + _), T = ae(T + p - (m * O + p * S) + b)), (n || r) && (k = u.getBBox(), C = ae(C + n / 100 * k.width), T = ae(T + r / 100 * k.height)), k = "matrix(" + y + "," + O + "," + P + "," + S + "," + C + "," + T + ")", u.setAttribute("transform", k), A && (u.style[te] = k);
}, P0 = function(t, e, i, n, r) {
  var o = 360, a = ke(r), l = parseFloat(r) * (a && ~r.indexOf("rad") ? Kn : 1), c = l - n, h = n + c + "deg", f, d;
  return a && (f = r.split("_")[1], f === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -360)), f === "cw" && c < 0 ? c = (c + o * Gc) % o - ~~(c / o) * o : f === "ccw" && c > 0 && (c = (c - o * Gc) % o - ~~(c / o) * o)), t._pt = d = new ai(t._pt, e, i, n, c, h0), d.e = h, d.u = "deg", t._props.push(i), d;
}, ih = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, O0 = function(t, e, i) {
  var n = ih({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, c, h, f, d, u, m;
  n.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), o[te] = e, a = so(i, 1), fs(i, te), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[te], o[te] = e, a = so(i, 1), o[te] = c);
  for (l in vn)
    c = n[l], h = a[l], c !== h && r.indexOf(l) < 0 && (u = Ve(c), m = Ve(h), f = u !== m ? $n(i, l, c, m) : parseFloat(c), d = parseFloat(h), t._pt = new ai(t._pt, a, l, f, d - f, Rl), t._pt.u = m || 0, t._props.push(l));
  ih(a, n);
};
oi("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", n = "Bottom", r = "Left", o = (t < 3 ? [e, i, n, r] : [e + r, e + i, n + i, n + r]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  ma[t > 1 ? "border" + s : s] = function(a, l, c, h, f) {
    var d, u;
    if (arguments.length < 4)
      return d = o.map(function(m) {
        return cn(a, m, c);
      }), u = d.join(" "), u.split(d[0]).length === 5 ? d[0] : u;
    d = (h + "").split(" "), u = {}, o.forEach(function(m, p) {
      return u[m] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), a.init(l, u, f);
  };
});
var xo = {
  name: "css",
  register: Fl,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, n, r) {
    var o = this._props, a = t.style, l = i.vars.startAt, c, h, f, d, u, m, p, _, b, A, C, T, y, O, P, S;
    Uu || Fl(), this.styles = this.styles || gd(t), S = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(fi[p] && rd(p, e, i, n, t, r)))) {
        if (u = typeof h, m = ma[p], u === "function" && (h = h.call(i, n, t, r), u = typeof h), u === "string" && ~h.indexOf("random(") && (h = to(h)), m)
          m(this, t, p, h, i) && (P = 1);
        else if (p.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Ln.lastIndex = 0, Ln.test(c) || (_ = Ve(c), b = Ve(h)), b ? _ !== b && (c = $n(t, p, c, b) + b) : _ && (h += _), this.add(a, "setProperty", c, h, n, r, 0, 0, p), o.push(p), S.push(p, 0, a[p]);
        else if (u !== "undefined") {
          if (l && p in l ? (c = typeof l[p] == "function" ? l[p].call(i, n, t, r) : l[p], ke(c) && ~c.indexOf("random(") && (c = to(c)), Ve(c + "") || c === "auto" || (c += yi.units[p] || Ve(cn(t, p)) || ""), (c + "").charAt(1) === "=" && (c = cn(t, p))) : c = cn(t, p), d = parseFloat(c), A = u === "string" && h.charAt(1) === "=" && h.substr(0, 2), A && (h = h.substr(2)), f = parseFloat(h), p in ji && (p === "autoAlpha" && (d === 1 && cn(t, "visibility") === "hidden" && f && (d = 0), S.push("visibility", 0, a.visibility), On(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = ji[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in vn, C) {
            if (this.styles.save(p), u === "string" && h.substring(0, 6) === "var(--" && (h = ki(t, h.substring(4, h.indexOf(")"))), f = parseFloat(h)), T || (y = t._gsap, y.renderTransform && !e.parseTransform || so(t, e.parseTransform), O = e.smoothOrigin !== !1 && y.smooth, T = this._pt = new ai(this._pt, a, te, 0, 1, y.renderTransform, y, 0, -1), T.dep = 1), p === "scale")
              this._pt = new ai(this._pt, y, "scaleY", y.scaleY, (A ? $s(y.scaleY, A + f) : f) - y.scaleY || 0, Rl), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              S.push(li, 0, a[li]), h = S0(h), y.svg ? Nl(t, h, 0, O, 0, this) : (b = parseFloat(h.split(" ")[2]) || 0, b !== y.zOrigin && On(this, y, "zOrigin", y.zOrigin, b), On(this, a, p, ga(c), ga(h)));
              continue;
            } else if (p === "svgOrigin") {
              Nl(t, h, 1, O, 0, this);
              continue;
            } else if (p in bd) {
              P0(this, y, p, d, A ? $s(d, A + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              On(this, y, "smooth", y.smooth, h);
              continue;
            } else if (p === "force3D") {
              y[p] = h;
              continue;
            } else if (p === "transform") {
              O0(this, h, t);
              continue;
            }
          } else p in a || (p = ir(p) || p);
          if (C || (f || f === 0) && (d || d === 0) && !c0.test(h) && p in a)
            _ = (c + "").substr((d + "").length), f || (f = 0), b = Ve(h) || (p in yi.units ? yi.units[p] : _), _ !== b && (d = $n(t, p, c, b)), this._pt = new ai(this._pt, C ? y : a, p, d, (A ? $s(d, A + f) : f) - d, !C && (b === "px" || p === "zIndex") && e.autoRound !== !1 ? d0 : Rl), this._pt.u = b || 0, _ !== b && b !== "%" && (this._pt.b = c, this._pt.r = f0);
          else if (p in a)
            T0.call(this, t, p, c, A ? A + h : h);
          else if (p in t)
            this.add(t, p, c || t[p], A ? A + h : h, n, r);
          else if (p !== "parseTransform") {
            Ru(p, h);
            continue;
          }
          C || (p in a ? S.push(p, 0, a[p]) : typeof t[p] == "function" ? S.push(p, 2, t[p]()) : S.push(p, 1, c || t[p])), o.push(p);
        }
      }
    P && hd(this);
  },
  render: function(t, e) {
    if (e.tween._time || !qu())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: cn,
  aliases: ji,
  getSetter: function(t, e, i) {
    var n = ji[e];
    return n && n.indexOf(",") < 0 && (e = n), e in vn && e !== li && (t._gsap.x || cn(t, "x")) ? i && Xc === i ? e === "scale" ? _0 : g0 : (Xc = i || {}) && (e === "scale" ? y0 : v0) : t.style && !Iu(t.style[e]) ? p0 : ~e.indexOf("-") ? m0 : Yu(t, e);
  },
  core: {
    _removeProperty: fs,
    _getMatrix: Xu
  }
};
Yt.utils.checkPrefix = ir;
Yt.core.getStyleSaver = gd;
(function(s, t, e, i) {
  var n = oi(s + "," + t + "," + e, function(r) {
    vn[r] = 1;
  });
  oi(t, function(r) {
    yi.units[r] = "deg", bd[r] = 1;
  }), ji[n[13]] = s + "," + t, oi(i, function(r) {
    var o = r.split(":");
    ji[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
oi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  yi.units[s] = "px";
});
Yt.registerPlugin(xo);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var dn, rs, Gu, Ra, wr, ta, _a, zr, $i = "transform", $l = $i + "Origin", Td, Sd = function(t) {
  var e = t.ownerDocument || t;
  for (!($i in t.style) && ("msTransform" in t.style) && ($i = "msTransform", $l = $i + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (rs = window, _a = new ds(), e) {
    dn = e, Gu = e.documentElement, Ra = e.body, zr = dn.createElementNS("http://www.w3.org/2000/svg", "g"), zr.style.transform = "none";
    var i = e.createElement("div"), n = e.createElement("div"), r = e && (e.body || e.firstElementChild);
    r && r.appendChild && (r.appendChild(i), i.appendChild(n), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), Td = n.offsetParent !== i, r.removeChild(i));
  }
  return e;
}, k0 = function(t) {
  for (var e, i; t && t !== Ra; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Ed = [], Ad = [], M0 = function() {
  return rs.pageYOffset || dn.scrollTop || Gu.scrollTop || Ra.scrollTop || 0;
}, I0 = function() {
  return rs.pageXOffset || dn.scrollLeft || Gu.scrollLeft || Ra.scrollLeft || 0;
}, ju = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, D0 = function s(t) {
  if (rs.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, nl = function s(t, e) {
  if (t.parentNode && (dn || Sd(t))) {
    var i = ju(t), n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", r = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", c = dn.createElementNS ? dn.createElementNS(n.replace(/^https/, "http"), r) : dn.createElement(r);
    return e && (i ? (ta || (ta = s(t)), c.setAttribute("width", 0.01), c.setAttribute("height", 0.01), c.setAttribute("transform", "translate(" + o + "," + a + ")"), ta.appendChild(c)) : (wr || (wr = s(t), wr.style.cssText = l), c.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", wr.appendChild(c))), c;
  }
  throw "Need document and parent.";
}, L0 = function(t) {
  for (var e = new ds(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, R0 = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[$i], t.style[$i] = "none", t.appendChild(zr), e = zr.getCTM(), t.removeChild(zr), i ? t.style[$i] = i : t.style.removeProperty($i.replace(/([A-Z])/g, "-$1").toLowerCase())), e || _a.clone();
}, z0 = function(t, e) {
  var i = ju(t), n = t === i, r = i ? Ed : Ad, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, l, c, h, f, d, u;
  if (t === rs)
    return t;
  if (r.length || r.push(nl(t, 1), nl(t, 2), nl(t, 3)), l = i ? ta : wr, i)
    n ? (h = R0(t), f = -h.e / h.a, d = -h.f / h.d, c = _a) : t.getBBox ? (h = t.getBBox(), c = t.transform ? t.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? L0(c) : c.getItem(0).matrix : _a, f = c.a * h.x + c.c * h.y, d = c.b * h.x + c.d * h.y) : (c = new ds(), f = d = 0), (n ? i : o).appendChild(l), l.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + f) + "," + (c.f + d) + ")");
  else {
    if (f = d = 0, Td)
      for (c = t.offsetParent, h = t; h && (h = h.parentNode) && h !== c && h.parentNode; )
        (rs.getComputedStyle(h)[$i] + "").length > 4 && (f = h.offsetLeft, d = h.offsetTop, h = 0);
    if (u = rs.getComputedStyle(t), u.position !== "absolute" && u.position !== "fixed")
      for (c = t.offsetParent; o && o !== c; )
        f += o.scrollLeft || 0, d += o.scrollTop || 0, o = o.parentNode;
    h = l.style, h.top = t.offsetTop - d + "px", h.left = t.offsetLeft - f + "px", h[$i] = u[$i], h[$l] = u[$l], h.position = u.position === "fixed" ? "fixed" : "absolute", a.appendChild(l);
  }
  return l;
}, sl = function(t, e, i, n, r, o, a) {
  return t.a = e, t.b = i, t.c = n, t.d = r, t.e = o, t.f = a, t;
}, ds = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), sl(this, e, i, n, r, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, n = this.b, r = this.c, o = this.d, a = this.e, l = this.f, c = i * o - n * r || 1e-10;
    return sl(this, o / c, -n / c, -r / c, i / c, (r * l - o * a) / c, -(i * l - n * a) / c);
  }, t.multiply = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, c = this.f, h = i.a, f = i.c, d = i.b, u = i.d, m = i.e, p = i.f;
    return sl(this, h * n + d * o, h * r + d * a, f * n + u * o, f * r + u * a, l + m * n + p * o, c + m * r + p * a);
  }, t.clone = function() {
    return new s(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, c = this.f;
    return n === i.a && r === i.b && o === i.c && a === i.d && l === i.e && c === i.f;
  }, t.apply = function(i, n) {
    n === void 0 && (n = {});
    var r = i.x, o = i.y, a = this.a, l = this.b, c = this.c, h = this.d, f = this.e, d = this.f;
    return n.x = r * a + o * c + f || 0, n.y = r * l + o * h + d || 0, n;
  }, s;
}();
function jn(s, t, e, i) {
  if (!s || !s.parentNode || (dn || Sd(s)).documentElement === s)
    return new ds();
  var n = k0(s), r = ju(s), o = r ? Ed : Ad, a = z0(s), l = o[0].getBoundingClientRect(), c = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), f = a.parentNode, d = D0(s), u = new ds((c.left - l.left) / 100, (c.top - l.top) / 100, (h.left - l.left) / 100, (h.top - l.top) / 100, l.left + (d ? 0 : I0()), l.top + (d ? 0 : M0()));
  if (f.removeChild(a), n)
    for (l = n.length; l--; )
      c = n[l], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
  return t ? u.inverse() : u;
}
function nh(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function F0(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var St, Vt, mi, Vi, pn, rl, hn, Bl, xr, kn, Cd, Vl, ro, Zu, Tr, zi, Sr, ea, Pd, Hl, ya = 0, Od = function() {
  return typeof window < "u";
}, kd = function() {
  return St || Od() && (St = window.gsap) && St.registerPlugin && St;
}, An = function(t) {
  return typeof t == "function";
}, Fr = function(t) {
  return typeof t == "object";
}, Ni = function(t) {
  return typeof t > "u";
}, ia = function() {
  return !1;
}, Nr = "transform", Yl = "transformOrigin", xn = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, dr = Array.isArray, Do = function(t, e) {
  var i = mi.createElementNS ? mi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : mi.createElement(t);
  return i.style ? i : mi.createElement(t);
}, sh = 180 / Math.PI, Ts = 1e20, N0 = new ds(), Tn = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, os = [], Hs = {}, $0 = 0, B0 = /^(?:a|input|textarea|button|select)$/i, rh = 0, Ss = {}, ln = {}, Md = function(t, e) {
  var i = {}, n;
  for (n in t)
    i[n] = e ? t[n] * e : t[n];
  return i;
}, V0 = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, oh = function s(t, e) {
  for (var i = t.length, n; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), n = t[i].children, n && n.length && s(n, e);
}, Id = function() {
  return os.forEach(function(t) {
    return t();
  });
}, H0 = function(t) {
  os.push(t), os.length === 1 && St.ticker.add(Id);
}, ah = function() {
  return !os.length && St.ticker.remove(Id);
}, lh = function(t) {
  for (var e = os.length; e--; )
    os[e] === t && os.splice(e, 1);
  St.to(ah, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: ah,
    data: "_draggable"
  });
}, Y0 = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Te = function(t, e, i, n) {
  if (t.addEventListener) {
    var r = ro[e];
    n = n || (Cd ? {
      passive: !1
    } : null), t.addEventListener(r || e, i, n), r && e !== r && t.addEventListener(e, i, n);
  }
}, de = function(t, e, i, n) {
  if (t.removeEventListener) {
    var r = ro[e];
    t.removeEventListener(r || e, i, n), r && e !== r && t.removeEventListener(e, i, n);
  }
}, Si = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, W0 = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, U0 = function s(t) {
  Zu = t.touches && ya < t.touches.length, de(t.target, "touchend", s);
}, uh = function(t) {
  Zu = t.touches && ya < t.touches.length, Te(t.target, "touchend", U0);
}, Ys = function(t) {
  return Vt.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Ws = function(t) {
  return Vt.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, ch = function s(t, e) {
  Te(t, "scroll", e), nr(t.parentNode) || s(t.parentNode, e);
}, hh = function s(t, e) {
  de(t, "scroll", e), nr(t.parentNode) || s(t.parentNode, e);
}, nr = function(t) {
  return !t || t === Vi || t.nodeType === 9 || t === mi.body || t === Vt || !t.nodeType || !t.parentNode;
}, fh = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return Math.max(0, nr(t) ? Math.max(Vi[n], pn[n]) - (Vt["inner" + i] || Vi[r] || pn[r]) : t[n] - t[r]);
}, ol = function s(t, e) {
  var i = fh(t, "x"), n = fh(t, "y");
  nr(t) ? t = ln : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = n, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, al = function(t, e, i) {
  var n = t.style;
  n && (Ni(n[e]) && (e = xr(e, t) || e), i == null ? n.removeProperty && n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n[e] = i);
}, oo = function(t) {
  return Vt.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, qn = {}, Es = function(t) {
  if (t === Vt)
    return qn.left = qn.top = 0, qn.width = qn.right = Vi.clientWidth || t.innerWidth || pn.clientWidth || 0, qn.height = qn.bottom = (t.innerHeight || 0) - 20 < Vi.clientHeight ? Vi.clientHeight : t.innerHeight || pn.clientHeight || 0, qn;
  var e = t.ownerDocument || mi, i = Ni(t.pageX) ? !t.nodeType && !Ni(t.left) && !Ni(t.top) ? t : kn(t)[0].getBoundingClientRect() : {
    left: t.pageX - Ws(e),
    top: t.pageY - Ys(e),
    right: t.pageX - Ws(e) + 1,
    bottom: t.pageY - Ys(e) + 1
  };
  return Ni(i.right) && !Ni(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Ni(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, oe = function(t, e, i) {
  var n = t.vars, r = n[i], o = t._listeners[e], a;
  return An(r) && (a = r.apply(n.callbackScope || t, n[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, dh = function(t, e) {
  var i = kn(t)[0], n, r, o;
  return !i.nodeType && i !== Vt ? Ni(t.left) ? (r = t.min || t.minX || t.minRotation || 0, n = t.min || t.minY || 0, {
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
  }) : q0(i, e);
}, Ei = {}, q0 = function(t, e) {
  e = kn(e)[0];
  var i = t.getBBox && t.ownerSVGElement, n = t.ownerDocument || mi, r, o, a, l, c, h, f, d, u, m, p, _, b;
  if (t === Vt)
    a = Ys(n), r = Ws(n), o = r + (n.documentElement.clientWidth || t.innerWidth || n.body.clientWidth || 0), l = a + ((t.innerHeight || 0) - 20 < n.documentElement.clientHeight ? n.documentElement.clientHeight : t.innerHeight || n.body.clientHeight || 0);
  else {
    if (e === Vt || Ni(e))
      return t.getBoundingClientRect();
    r = a = 0, i ? (m = t.getBBox(), p = m.width, _ = m.height) : (t.viewBox && (m = t.viewBox.baseVal) && (r = m.x || 0, a = m.y || 0, p = m.width, _ = m.height), p || (b = oo(t), m = b.boxSizing === "border-box", p = (parseFloat(b.width) || t.clientWidth || 0) + (m ? 0 : parseFloat(b.borderLeftWidth) + parseFloat(b.borderRightWidth)), _ = (parseFloat(b.height) || t.clientHeight || 0) + (m ? 0 : parseFloat(b.borderTopWidth) + parseFloat(b.borderBottomWidth)))), o = p, l = _;
  }
  return t === e ? {
    left: r,
    top: a,
    width: o - r,
    height: l - a
  } : (c = jn(e, !0).multiply(jn(t)), h = c.apply({
    x: r,
    y: a
  }), f = c.apply({
    x: o,
    y: a
  }), d = c.apply({
    x: o,
    y: l
  }), u = c.apply({
    x: r,
    y: l
  }), r = Math.min(h.x, f.x, d.x, u.x), a = Math.min(h.y, f.y, d.y, u.y), {
    left: r,
    top: a,
    width: Math.max(h.x, f.x, d.x, u.x) - r,
    height: Math.max(h.y, f.y, d.y, u.y) - a
  });
}, ll = function(t, e, i, n, r, o) {
  var a = {}, l, c, h;
  if (e)
    if (r !== 1 && e instanceof Array) {
      if (a.end = l = [], h = e.length, Fr(e[0]))
        for (c = 0; c < h; c++)
          l[c] = Md(e[c], r);
      else
        for (c = 0; c < h; c++)
          l[c] = e[c] * r;
      i += 1.1, n -= 1.1;
    } else An(e) ? a.end = function(f) {
      var d = e.call(t, f), u, m;
      if (r !== 1)
        if (Fr(d)) {
          u = {};
          for (m in d)
            u[m] = d[m] * r;
          d = u;
        } else
          d *= r;
      return d;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (n || n === 0) && (a.min = n), o && (a.velocity = 0), a;
}, K0 = function s(t) {
  var e;
  return !t || !t.getAttribute || t === pn ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (B0.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, Lo = function(t, e) {
  for (var i = t.length, n; i--; )
    n = t[i], n.ondragstart = n.onselectstart = e ? null : ia, St.set(n, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, X0 = function s(t) {
  if (oo(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, Dd, Wl, G0 = function(t, e) {
  t = St.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), n = i.style, r = t.firstChild, o = 0, a = 0, l = t.scrollTop, c = t.scrollLeft, h = t.scrollWidth, f = t.scrollHeight, d = 0, u = 0, m = 0, p, _, b, A, C, T;
  Dd && e.force3D !== !1 ? (C = "translate3d(", T = "px,0px)") : Nr && (C = "translate(", T = "px)"), this.scrollTop = function(y, O) {
    if (!arguments.length)
      return -this.top();
    this.top(-y, O);
  }, this.scrollLeft = function(y, O) {
    if (!arguments.length)
      return -this.left();
    this.left(-y, O);
  }, this.left = function(y, O) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var P = t.scrollLeft - c, S = a;
    if ((P > 2 || P < -2) && !O) {
      c = t.scrollLeft, St.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-c), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (a = y - 0.5 | 0, y = 0) : y > u ? (a = y - u | 0, y = u) : a = 0, (a || S) && (this._skip || (n[Nr] = C + -a + "px," + -o + T), a + d >= 0 && (n.paddingRight = a + d + "px")), t.scrollLeft = y | 0, c = t.scrollLeft;
  }, this.top = function(y, O) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var P = t.scrollTop - l, S = o;
    if ((P > 2 || P < -2) && !O) {
      l = t.scrollTop, St.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-l), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (o = y - 0.5 | 0, y = 0) : y > m ? (o = y - m | 0, y = m) : o = 0, (o || S) && (this._skip || (n[Nr] = C + -a + "px," + -o + T)), t.scrollTop = y | 0, l = t.scrollTop;
  }, this.maxScrollTop = function() {
    return m;
  }, this.maxScrollLeft = function() {
    return u;
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
  }, this.calibrate = function(y) {
    var O = t.clientWidth === p, P, S, k;
    l = t.scrollTop, c = t.scrollLeft, !(O && t.clientHeight === _ && i.offsetHeight === b && h === t.scrollWidth && f === t.scrollHeight && !y) && ((o || a) && (S = this.left(), k = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), P = oo(t), (!O || y) && (n.display = "block", n.width = "auto", n.paddingRight = "0px", d = Math.max(0, t.scrollWidth - t.clientWidth), d && (d += parseFloat(P.paddingLeft) + (Wl ? parseFloat(P.paddingRight) : 0))), n.display = "inline-block", n.position = "relative", n.overflow = "visible", n.verticalAlign = "top", n.boxSizing = "content-box", n.width = "100%", n.paddingRight = d + "px", Wl && (n.paddingBottom = P.paddingBottom), p = t.clientWidth, _ = t.clientHeight, h = t.scrollWidth, f = t.scrollHeight, u = t.scrollWidth - p, m = t.scrollHeight - _, b = i.offsetHeight, n.display = "block", (S || k) && (this.left(S), this.top(k)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, ul = function(t) {
  if (Od() && document.body) {
    var e = window && window.navigator;
    Vt = window, mi = document, Vi = mi.documentElement, pn = mi.body, rl = Do("div"), ea = !!window.PointerEvent, hn = Do("div"), hn.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Sr = hn.style.cursor === "grab" ? "grab" : "move", Tr = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Vl = "ontouchstart" in Vi && "orientation" in Vt || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), Wl = function() {
      var i = Do("div"), n = Do("div"), r = n.style, o = pn, a;
      return r.display = "inline-block", r.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(n), o.appendChild(i), a = n.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), ro = function(i) {
      for (var n = i.split(","), r = ("onpointerdown" in rl ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in rl ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[n[a]] = r[a], o[r[a]] = n[a];
      try {
        Vi.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Cd = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), Te(mi, "touchcancel", ia), Te(Vt, "touchmove", ia), pn && pn.addEventListener("touchstart", ia), Te(mi, "contextmenu", function() {
      for (var i in Hs)
        Hs[i].isPressed && Hs[i].endDrag();
    }), St = Bl = kd();
  }
  St ? (zi = St.plugins.inertia, Pd = St.core.context || function() {
  }, xr = St.utils.checkPrefix, Nr = xr(Nr), Yl = xr(Yl), kn = St.utils.toArray, Hl = St.core.getStyleSaver, Dd = !!xr("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, j0 = /* @__PURE__ */ function() {
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
}(), za = /* @__PURE__ */ function(s) {
  F0(t, s);
  function t(e, i) {
    var n;
    n = s.call(this) || this, Bl || ul(1), e = kn(e)[0], n.styles = Hl && Hl(e, "transform,left,top"), zi || (zi = St.plugins.inertia), n.vars = i = Md(i || {}), n.target = e, n.x = n.y = n.rotation = 0, n.dragResistance = parseFloat(i.dragResistance) || 0, n.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, n.lockAxis = i.lockAxis, n.autoScroll = i.autoScroll || 0, n.lockedAxis = null, n.allowEventDefault = !!i.allowEventDefault, St.getProperty(e, "x");
    var r = (i.type || "x,y").toLowerCase(), o = ~r.indexOf("x") || ~r.indexOf("y"), a = r.indexOf("rotation") !== -1, l = a ? "rotation" : o ? "x" : "left", c = o ? "y" : "top", h = !!(~r.indexOf("x") || ~r.indexOf("left") || r === "scroll"), f = !!(~r.indexOf("y") || ~r.indexOf("top") || r === "scroll"), d = i.minimumMovement || 2, u = nh(n), m = kn(i.trigger || i.handle || e), p = {}, _ = 0, b = !1, A = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, T = i.autoScrollMarginBottom || 40, y = i.autoScrollMarginLeft || 40, O = i.clickableTest || K0, P = 0, S = e._gsap || St.core.getCache(e), k = X0(e), R = function(v, $) {
      return parseFloat(S.get(e, v, $));
    }, H = e.ownerDocument || mi, z, B, J, it, q, Y, tt, ot, w, j, nt, K, rt, It, gt, At, lt, Lt, ne, Nt, Ut, pt, mt, ut, Ae, I, $t, qe, Me, Rt, Ft, ue, Ke, Kt = function(v) {
      return Si(v), v.stopImmediatePropagation && v.stopImmediatePropagation(), !1;
    }, se = function Z(v) {
      if (u.autoScroll && u.isDragging && (b || lt)) {
        var $ = e, E = u.autoScroll * 15, M, N, D, W, F, U, et, X;
        for (b = !1, ln.scrollTop = Vt.pageYOffset != null ? Vt.pageYOffset : H.documentElement.scrollTop != null ? H.documentElement.scrollTop : H.body.scrollTop, ln.scrollLeft = Vt.pageXOffset != null ? Vt.pageXOffset : H.documentElement.scrollLeft != null ? H.documentElement.scrollLeft : H.body.scrollLeft, W = u.pointerX - ln.scrollLeft, F = u.pointerY - ln.scrollTop; $ && !N; )
          N = nr($.parentNode), M = N ? ln : $.parentNode, D = N ? {
            bottom: Math.max(Vi.clientHeight, Vt.innerHeight || 0),
            right: Math.max(Vi.clientWidth, Vt.innerWidth || 0),
            left: 0,
            top: 0
          } : M.getBoundingClientRect(), U = et = 0, f && (X = M._gsMaxScrollY - M.scrollTop, X < 0 ? et = X : F > D.bottom - T && X ? (b = !0, et = Math.min(X, E * (1 - Math.max(0, D.bottom - F) / T) | 0)) : F < D.top + A && M.scrollTop && (b = !0, et = -Math.min(M.scrollTop, E * (1 - Math.max(0, F - D.top) / A) | 0)), et && (M.scrollTop += et)), h && (X = M._gsMaxScrollX - M.scrollLeft, X < 0 ? U = X : W > D.right - C && X ? (b = !0, U = Math.min(X, E * (1 - Math.max(0, D.right - W) / C) | 0)) : W < D.left + y && M.scrollLeft && (b = !0, U = -Math.min(M.scrollLeft, E * (1 - Math.max(0, W - D.left) / y) | 0)), U && (M.scrollLeft += U)), N && (U || et) && (Vt.scrollTo(M.scrollLeft, M.scrollTop), Ne(u.pointerX + U, u.pointerY + et)), $ = M;
      }
      if (lt) {
        var ft = u.x, xt = u.y;
        a ? (u.deltaX = ft - parseFloat(S.rotation), u.rotation = ft, S.rotation = ft + "deg", S.renderTransform(1, S)) : B ? (f && (u.deltaY = xt - B.top(), B.top(xt)), h && (u.deltaX = ft - B.left(), B.left(ft))) : o ? (f && (u.deltaY = xt - parseFloat(S.y), S.y = xt + "px"), h && (u.deltaX = ft - parseFloat(S.x), S.x = ft + "px"), S.renderTransform(1, S)) : (f && (u.deltaY = xt - parseFloat(e.style.top || 0), e.style.top = xt + "px"), h && (u.deltaX = ft - parseFloat(e.style.left || 0), e.style.left = ft + "px")), ot && !v && !qe && (qe = !0, oe(u, "drag", "onDrag") === !1 && (h && (u.x -= u.deltaX), f && (u.y -= u.deltaY), Z(!0)), qe = !1);
      }
      lt = !1;
    }, Pt = function(v, $) {
      var E = u.x, M = u.y, N, D;
      e._gsap || (S = St.core.getCache(e)), S.uncache && St.getProperty(e, "x"), o ? (u.x = parseFloat(S.x), u.y = parseFloat(S.y)) : a ? u.x = u.rotation = parseFloat(S.rotation) : B ? (u.y = B.top(), u.x = B.left()) : (u.y = parseFloat(e.style.top || (D = oo(e)) && D.top) || 0, u.x = parseFloat(e.style.left || (D || {}).left) || 0), (ne || Nt || Ut) && !$ && (u.isDragging || u.isThrowing) && (Ut && (Ss.x = u.x, Ss.y = u.y, N = Ut(Ss), N.x !== u.x && (u.x = N.x, lt = !0), N.y !== u.y && (u.y = N.y, lt = !0)), ne && (N = ne(u.x), N !== u.x && (u.x = N, a && (u.rotation = N), lt = !0)), Nt && (N = Nt(u.y), N !== u.y && (u.y = N), lt = !0)), lt && se(!0), v || (u.deltaX = u.x - E, u.deltaY = u.y - M, oe(u, "throwupdate", "onThrowUpdate"));
    }, ce = function(v, $, E, M) {
      return $ == null && ($ = -1e20), E == null && (E = Ts), An(v) ? function(N) {
        var D = u.isPressed ? 1 - u.edgeResistance : 1;
        return v.call(u, (N > E ? E + (N - E) * D : N < $ ? $ + (N - $) * D : N) * M) * M;
      } : dr(v) ? function(N) {
        for (var D = v.length, W = 0, F = Ts, U, et; --D > -1; )
          U = v[D], et = U - N, et < 0 && (et = -et), et < F && U >= $ && U <= E && (W = D, F = et);
        return v[W];
      } : isNaN(v) ? function(N) {
        return N;
      } : function() {
        return v * M;
      };
    }, Ie = function(v, $, E, M, N, D, W) {
      return D = D && D < Ts ? D * D : Ts, An(v) ? function(F) {
        var U = u.isPressed ? 1 - u.edgeResistance : 1, et = F.x, X = F.y, ft, xt, Ct;
        return F.x = et = et > E ? E + (et - E) * U : et < $ ? $ + (et - $) * U : et, F.y = X = X > N ? N + (X - N) * U : X < M ? M + (X - M) * U : X, ft = v.call(u, F), ft !== F && (F.x = ft.x, F.y = ft.y), W !== 1 && (F.x *= W, F.y *= W), D < Ts && (xt = F.x - et, Ct = F.y - X, xt * xt + Ct * Ct > D && (F.x = et, F.y = X)), F;
      } : dr(v) ? function(F) {
        for (var U = v.length, et = 0, X = Ts, ft, xt, Ct, _t; --U > -1; )
          Ct = v[U], ft = Ct.x - F.x, xt = Ct.y - F.y, _t = ft * ft + xt * xt, _t < X && (et = U, X = _t);
        return X <= D ? v[et] : F;
      } : function(F) {
        return F;
      };
    }, ze = function() {
      var v, $, E, M;
      tt = !1, B ? (B.calibrate(), u.minX = nt = -B.maxScrollLeft(), u.minY = rt = -B.maxScrollTop(), u.maxX = j = u.maxY = K = 0, tt = !0) : i.bounds && (v = dh(i.bounds, e.parentNode), a ? (u.minX = nt = v.left, u.maxX = j = v.left + v.width, u.minY = rt = u.maxY = K = 0) : !Ni(i.bounds.maxX) || !Ni(i.bounds.maxY) ? (v = i.bounds, u.minX = nt = v.minX, u.minY = rt = v.minY, u.maxX = j = v.maxX, u.maxY = K = v.maxY) : ($ = dh(e, e.parentNode), u.minX = nt = Math.round(R(l, "px") + v.left - $.left), u.minY = rt = Math.round(R(c, "px") + v.top - $.top), u.maxX = j = Math.round(nt + (v.width - $.width)), u.maxY = K = Math.round(rt + (v.height - $.height))), nt > j && (u.minX = j, u.maxX = j = nt, nt = u.minX), rt > K && (u.minY = K, u.maxY = K = rt, rt = u.minY), a && (u.minRotation = nt, u.maxRotation = j), tt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, M = dr(E) || An(E), a ? (ne = ce(M ? E : E.rotation, nt, j, 1), Nt = null) : E.points ? Ut = Ie(M ? E : E.points, nt, j, rt, K, E.radius, B ? -1 : 1) : (h && (ne = ce(M ? E : E.x || E.left || E.scrollLeft, nt, j, B ? -1 : 1)), f && (Nt = ce(M ? E : E.y || E.top || E.scrollTop, rt, K, B ? -1 : 1))));
    }, Wi = function() {
      u.isThrowing = !1, oe(u, "throwcomplete", "onThrowComplete");
    }, qt = function() {
      u.isThrowing = !1;
    }, Ui = function(v, $) {
      var E, M, N, D;
      v && zi ? (v === !0 && (E = i.snap || i.liveSnap || {}, M = dr(E) || An(E), v = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? v.rotation = ll(u, M ? E : E.rotation, j, nt, 1, $) : (h && (v[l] = ll(u, M ? E : E.points || E.x || E.left, j, nt, B ? -1 : 1, $ || u.lockedAxis === "x")), f && (v[c] = ll(u, M ? E : E.points || E.y || E.top, K, rt, B ? -1 : 1, $ || u.lockedAxis === "y")), (E.points || dr(E) && Fr(E[0])) && (v.linkedProps = l + "," + c, v.radius = E.radius))), u.isThrowing = !0, D = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - u.edgeResistance + 0.2 : i.overshootTolerance, v.duration || (v.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? D === 0 || Fr(v) && v.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: D
      }), u.tween = N = St.to(B || e, {
        inertia: v,
        data: "_draggable",
        inherit: !1,
        onComplete: Wi,
        onInterrupt: qt,
        onUpdate: i.fastMode ? oe : Pt,
        onUpdateParams: i.fastMode ? [u, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), N.render(1e9, !0, !0), Pt(!0, !0), u.endX = u.x, u.endY = u.y, a && (u.endRotation = u.x), N.play(0), Pt(!0, !0), B && (B._skip = !1))) : tt && u.applyBounds();
    }, ni = function(v) {
      var $ = ut, E;
      ut = jn(e.parentNode, !0), v && u.isPressed && !ut.equals($ || new ds()) && (E = $.inverse().apply({
        x: J,
        y: it
      }), ut.apply(E, E), J = E.x, it = E.y), ut.equals(N0) && (ut = null);
    }, ye = function() {
      var v = 1 - u.edgeResistance, $ = k ? Ws(H) : 0, E = k ? Ys(H) : 0, M, N, D;
      o && (S.x = R(l, "px") + "px", S.y = R(c, "px") + "px", S.renderTransform()), ni(!1), Ei.x = u.pointerX - $, Ei.y = u.pointerY - E, ut && ut.apply(Ei, Ei), J = Ei.x, it = Ei.y, lt && (Ne(u.pointerX, u.pointerY), se(!0)), ue = jn(e), B ? (ze(), Y = B.top(), q = B.left()) : (De() ? (Pt(!0, !0), ze()) : u.applyBounds(), a ? (M = e.ownerSVGElement ? [S.xOrigin - e.getBBox().x, S.yOrigin - e.getBBox().y] : (oo(e)[Yl] || "0 0").split(" "), At = u.rotationOrigin = jn(e).apply({
        x: parseFloat(M[0]) || 0,
        y: parseFloat(M[1]) || 0
      }), Pt(!0, !0), N = u.pointerX - At.x - $, D = At.y - u.pointerY + E, q = u.x, Y = u.y = Math.atan2(D, N) * sh) : (Y = R(c, "px"), q = R(l, "px"))), tt && v && (q > j ? q = j + (q - j) / v : q < nt && (q = nt - (nt - q) / v), a || (Y > K ? Y = K + (Y - K) / v : Y < rt && (Y = rt - (rt - Y) / v))), u.startX = q = xn(q), u.startY = Y = xn(Y);
    }, De = function() {
      return u.tween && u.tween.isActive();
    }, wi = function() {
      hn.parentNode && !De() && !u.isDragging && hn.parentNode.removeChild(hn);
    }, Fe = function(v, $) {
      var E;
      if (!z || u.isPressed || !v || (v.type === "mousedown" || v.type === "pointerdown") && !$ && Tn() - P < 30 && ro[u.pointerEvent.type]) {
        Ft && v && z && Si(v);
        return;
      }
      if (Ae = De(), Ke = !1, u.pointerEvent = v, ro[v.type] ? (mt = ~v.type.indexOf("touch") ? v.currentTarget || v.target : H, Te(mt, "touchend", zt), Te(mt, "touchmove", at), Te(mt, "touchcancel", zt), Te(H, "touchstart", uh)) : (mt = null, Te(H, "mousemove", at)), $t = null, (!ea || !mt) && (Te(H, "mouseup", zt), v && v.target && Te(v.target, "mouseup", zt)), pt = O.call(u, v.target) && i.dragClickables === !1 && !$, pt) {
        Te(v.target, "change", zt), oe(u, "pressInit", "onPressInit"), oe(u, "press", "onPress"), Lo(m, !0), Ft = !1;
        return;
      }
      if (I = !mt || h === f || u.vars.allowNativeTouchScrolling === !1 || u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2) ? !1 : h ? "y" : "x", Ft = !I && !u.allowEventDefault, Ft && (Si(v), Te(Vt, "touchforcechange", Si)), v.changedTouches ? (v = It = v.changedTouches[0], gt = v.identifier) : v.pointerId ? gt = v.pointerId : It = gt = null, ya++, H0(se), it = u.pointerY = v.pageY, J = u.pointerX = v.pageX, oe(u, "pressInit", "onPressInit"), (I || u.autoScroll) && ol(e.parentNode), e.parentNode && u.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !hn.parentNode && !e.getBBox && (hn.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(hn)), ye(), u.tween && u.tween.kill(), u.isThrowing = !1, St.killTweensOf(B || e, p, !0), B && St.killTweensOf(e, {
        scrollTo: 1
      }, !0), u.tween = u.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), u.isPressed = !0, ot = !!(i.onDrag || u._listeners.drag), w = !!(i.onMove || u._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = m.length; --E > -1; )
          St.set(m[E], {
            cursor: i.activeCursor || i.cursor || (Sr === "grab" ? "grabbing" : Sr)
          });
      oe(u, "press", "onPress");
    }, at = function(v) {
      var $ = v, E, M, N, D, W, F;
      if (!z || Zu || !u.isPressed || !v) {
        Ft && v && z && Si(v);
        return;
      }
      if (u.pointerEvent = v, E = v.changedTouches, E) {
        if (v = E[0], v !== It && v.identifier !== gt) {
          for (D = E.length; --D > -1 && (v = E[D]).identifier !== gt && v.target !== e; )
            ;
          if (D < 0)
            return;
        }
      } else if (v.pointerId && gt && v.pointerId !== gt)
        return;
      if (mt && I && !$t && (Ei.x = v.pageX - (k ? Ws(H) : 0), Ei.y = v.pageY - (k ? Ys(H) : 0), ut && ut.apply(Ei, Ei), M = Ei.x, N = Ei.y, W = Math.abs(M - J), F = Math.abs(N - it), (W !== F && (W > d || F > d) || Tr && I === $t) && ($t = W > F && h ? "x" : "y", I && $t !== I && Te(Vt, "touchforcechange", Si), u.vars.lockAxisOnTouchScroll !== !1 && h && f && (u.lockedAxis = $t === "x" ? "y" : "x", An(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, $)), Tr && I === $t))) {
        zt($);
        return;
      }
      !u.allowEventDefault && (!I || $t && I !== $t) && $.cancelable !== !1 ? (Si($), Ft = !0) : Ft && (Ft = !1), u.autoScroll && (b = !0), Ne(v.pageX, v.pageY, w);
    }, Ne = function(v, $, E) {
      var M = 1 - u.dragResistance, N = 1 - u.edgeResistance, D = u.pointerX, W = u.pointerY, F = Y, U = u.x, et = u.y, X = u.endX, ft = u.endY, xt = u.endRotation, Ct = lt, _t, dt, Ot, ct, ve, Xt;
      u.pointerX = v, u.pointerY = $, k && (v -= Ws(H), $ -= Ys(H)), a ? (ct = Math.atan2(At.y - $, v - At.x) * sh, ve = u.y - ct, ve > 180 ? (Y -= 360, u.y = ct) : ve < -180 && (Y += 360, u.y = ct), u.x !== q || Math.max(Math.abs(J - v), Math.abs(it - $)) > d ? (u.y = ct, Ot = q + (Y - ct) * M) : Ot = q) : (ut && (Xt = v * ut.a + $ * ut.c + ut.e, $ = v * ut.b + $ * ut.d + ut.f, v = Xt), dt = $ - it, _t = v - J, dt < d && dt > -d && (dt = 0), _t < d && _t > -d && (_t = 0), (u.lockAxis || u.lockedAxis) && (_t || dt) && (Xt = u.lockedAxis, Xt || (u.lockedAxis = Xt = h && Math.abs(_t) > Math.abs(dt) ? "y" : f ? "x" : null, Xt && An(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, u.pointerEvent)), Xt === "y" ? dt = 0 : Xt === "x" && (_t = 0)), Ot = xn(q + _t * M), ct = xn(Y + dt * M)), (ne || Nt || Ut) && (u.x !== Ot || u.y !== ct && !a) && (Ut && (Ss.x = Ot, Ss.y = ct, Xt = Ut(Ss), Ot = xn(Xt.x), ct = xn(Xt.y)), ne && (Ot = xn(ne(Ot))), Nt && (ct = xn(Nt(ct)))), tt && (Ot > j ? Ot = j + Math.round((Ot - j) * N) : Ot < nt && (Ot = nt + Math.round((Ot - nt) * N)), a || (ct > K ? ct = Math.round(K + (ct - K) * N) : ct < rt && (ct = Math.round(rt + (ct - rt) * N)))), (u.x !== Ot || u.y !== ct && !a) && (a ? (u.endRotation = u.x = u.endX = Ot, lt = !0) : (f && (u.y = u.endY = ct, lt = !0), h && (u.x = u.endX = Ot, lt = !0)), !E || oe(u, "move", "onMove") !== !1 ? !u.isDragging && u.isPressed && (u.isDragging = Ke = !0, oe(u, "dragstart", "onDragStart")) : (u.pointerX = D, u.pointerY = W, Y = F, u.x = U, u.y = et, u.endX = X, u.endY = ft, u.endRotation = xt, lt = Ct));
    }, zt = function Z(v, $) {
      if (!z || !u.isPressed || v && gt != null && !$ && (v.pointerId && v.pointerId !== gt && v.target !== e || v.changedTouches && !W0(v.changedTouches, gt))) {
        Ft && v && z && Si(v);
        return;
      }
      u.isPressed = !1;
      var E = v, M = u.isDragging, N = u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2), D = St.delayedCall(1e-3, wi), W, F, U, et, X;
      if (mt ? (de(mt, "touchend", Z), de(mt, "touchmove", at), de(mt, "touchcancel", Z), de(H, "touchstart", uh)) : de(H, "mousemove", at), de(Vt, "touchforcechange", Si), (!ea || !mt) && (de(H, "mouseup", Z), v && v.target && de(v.target, "mouseup", Z)), lt = !1, M && (_ = rh = Tn(), u.isDragging = !1), lh(se), pt && !N) {
        v && (de(v.target, "change", Z), u.pointerEvent = E), Lo(m, !1), oe(u, "release", "onRelease"), oe(u, "click", "onClick"), pt = !1;
        return;
      }
      for (F = m.length; --F > -1; )
        al(m[F], "cursor", i.cursor || (i.cursor !== !1 ? Sr : null));
      if (ya--, v) {
        if (W = v.changedTouches, W && (v = W[0], v !== It && v.identifier !== gt)) {
          for (F = W.length; --F > -1 && (v = W[F]).identifier !== gt && v.target !== e; )
            ;
          if (F < 0 && !$)
            return;
        }
        u.pointerEvent = E, u.pointerX = v.pageX, u.pointerY = v.pageY;
      }
      return N && E ? (Si(E), Ft = !0, oe(u, "release", "onRelease")) : E && !M ? (Ft = !1, Ae && (i.snap || i.bounds) && Ui(i.inertia || i.throwProps), oe(u, "release", "onRelease"), (!Tr || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (oe(u, "click", "onClick"), Tn() - P < 300 && oe(u, "doubleclick", "onDoubleClick"), et = E.target || e, P = Tn(), X = function() {
        P !== Me && u.enabled() && !u.isPressed && !E.defaultPrevented && (et.click ? et.click() : H.createEvent && (U = H.createEvent("MouseEvents"), U.initMouseEvent("click", !0, !0, Vt, 1, u.pointerEvent.screenX, u.pointerEvent.screenY, u.pointerX, u.pointerY, !1, !1, !1, !1, 0, null), et.dispatchEvent(U)));
      }, !Tr && !E.defaultPrevented && St.delayedCall(0.05, X))) : (Ui(i.inertia || i.throwProps), !u.allowEventDefault && E && (i.dragClickables !== !1 || !O.call(u, E.target)) && M && (!I || $t && I === $t) && E.cancelable !== !1 ? (Ft = !0, Si(E)) : Ft = !1, oe(u, "release", "onRelease")), De() && D.duration(u.tween.duration()), M && oe(u, "dragend", "onDragEnd"), !0;
    }, Ce = function(v) {
      if (v && u.isDragging && !B) {
        var $ = v.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, M = $.scrollTop - $._gsScrollY;
        (E || M) && (ut ? (J -= E * ut.a + M * ut.c, it -= M * ut.d + E * ut.b) : (J -= E, it -= M), $._gsScrollX += E, $._gsScrollY += M, Ne(u.pointerX, u.pointerY));
      }
    }, ee = function(v) {
      var $ = Tn(), E = $ - P < 100, M = $ - _ < 50, N = E && Me === P, D = u.pointerEvent && u.pointerEvent.defaultPrevented, W = E && Rt === P, F = v.isTrusted || v.isTrusted == null && E && N;
      if ((N || M && u.vars.suppressClickOnDrag !== !1) && v.stopImmediatePropagation && v.stopImmediatePropagation(), E && !(u.pointerEvent && u.pointerEvent.defaultPrevented) && (!N || F && !W)) {
        F && N && (Rt = P), Me = P;
        return;
      }
      (u.isPressed || M || E) && (!F || !v.detail || !E || D) && Si(v), !E && !M && !Ke && (v && v.target && (u.pointerEvent = v), oe(u, "click", "onClick"));
    }, xi = function(v) {
      return ut ? {
        x: v.x * ut.a + v.y * ut.c + ut.e,
        y: v.x * ut.b + v.y * ut.d + ut.f
      } : {
        x: v.x,
        y: v.y
      };
    };
    return Lt = t.get(e), Lt && Lt.kill(), n.startDrag = function(Z, v) {
      var $, E, M, N;
      Fe(Z || u.pointerEvent, !0), v && !u.hitTest(Z || u.pointerEvent) && ($ = Es(Z || u.pointerEvent), E = Es(e), M = xi({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), N = xi({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), J -= M.x - N.x, it -= M.y - N.y), u.isDragging || (u.isDragging = Ke = !0, oe(u, "dragstart", "onDragStart"));
    }, n.drag = at, n.endDrag = function(Z) {
      return zt(Z || u.pointerEvent, !0);
    }, n.timeSinceDrag = function() {
      return u.isDragging ? 0 : (Tn() - _) / 1e3;
    }, n.timeSinceClick = function() {
      return (Tn() - P) / 1e3;
    }, n.hitTest = function(Z, v) {
      return t.hitTest(u.target, Z, v);
    }, n.getDirection = function(Z, v) {
      var $ = Z === "velocity" && zi ? Z : Fr(Z) && !a ? "element" : "start", E, M, N, D, W, F;
      return $ === "element" && (W = Es(u.target), F = Es(Z)), E = $ === "start" ? u.x - q : $ === "velocity" ? zi.getVelocity(e, l) : W.left + W.width / 2 - (F.left + F.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (v = v || 2, M = $ === "start" ? u.y - Y : $ === "velocity" ? zi.getVelocity(e, c) : W.top + W.height / 2 - (F.top + F.height / 2), N = Math.abs(E / M), D = N < 1 / v ? "" : E < 0 ? "left" : "right", N < v && (D !== "" && (D += "-"), D += M < 0 ? "up" : "down"), D);
    }, n.applyBounds = function(Z, v) {
      var $, E, M, N, D, W;
      if (Z && i.bounds !== Z)
        return i.bounds = Z, u.update(!0, v);
      if (Pt(!0), ze(), tt && !De()) {
        if ($ = u.x, E = u.y, $ > j ? $ = j : $ < nt && ($ = nt), E > K ? E = K : E < rt && (E = rt), (u.x !== $ || u.y !== E) && (M = !0, u.x = u.endX = $, a ? u.endRotation = $ : u.y = u.endY = E, lt = !0, se(!0), u.autoScroll && !u.isDragging))
          for (ol(e.parentNode), N = e, ln.scrollTop = Vt.pageYOffset != null ? Vt.pageYOffset : H.documentElement.scrollTop != null ? H.documentElement.scrollTop : H.body.scrollTop, ln.scrollLeft = Vt.pageXOffset != null ? Vt.pageXOffset : H.documentElement.scrollLeft != null ? H.documentElement.scrollLeft : H.body.scrollLeft; N && !W; )
            W = nr(N.parentNode), D = W ? ln : N.parentNode, f && D.scrollTop > D._gsMaxScrollY && (D.scrollTop = D._gsMaxScrollY), h && D.scrollLeft > D._gsMaxScrollX && (D.scrollLeft = D._gsMaxScrollX), N = D;
        u.isThrowing && (M || u.endX > j || u.endX < nt || u.endY > K || u.endY < rt) && Ui(i.inertia || i.throwProps, M);
      }
      return u;
    }, n.update = function(Z, v, $) {
      if (v && u.isPressed) {
        var E = jn(e), M = ue.apply({
          x: u.x - q,
          y: u.y - Y
        }), N = jn(e.parentNode, !0);
        N.apply({
          x: E.e - M.x,
          y: E.f - M.y
        }, M), u.x -= M.x - N.e, u.y -= M.y - N.f, se(!0), ye();
      }
      var D = u.x, W = u.y;
      return ni(!v), Z ? u.applyBounds() : (lt && $ && se(!0), Pt(!0)), v && (Ne(u.pointerX, u.pointerY), lt && se(!0)), u.isPressed && !v && (h && Math.abs(D - u.x) > 0.01 || f && Math.abs(W - u.y) > 0.01 && !a) && ye(), u.autoScroll && (ol(e.parentNode, u.isDragging), b = u.isDragging, se(!0), hh(e, Ce), ch(e, Ce)), u;
    }, n.enable = function(Z) {
      var v = {
        lazy: !0
      }, $, E, M;
      if (i.cursor !== !1 && (v.cursor = i.cursor || Sr), St.utils.checkPrefix("touchCallout") && (v.touchCallout = "none"), Z !== "soft") {
        for (oh(m, h === f ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), E = m.length; --E > -1; )
          M = m[E], ea || Te(M, "mousedown", Fe), Te(M, "touchstart", Fe), Te(M, "click", ee, !0), St.set(M, v), M.getBBox && M.ownerSVGElement && h !== f && St.set(M.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Te(M, "contextmenu", Kt);
        Lo(m, !1);
      }
      return ch(e, Ce), z = !0, zi && Z !== "soft" && zi.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + $0++, Hs[$] = u, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && ye(), i.bounds && u.applyBounds(), u;
    }, n.disable = function(Z) {
      for (var v = u.isDragging, $ = m.length, E; --$ > -1; )
        al(m[$], "cursor", null);
      if (Z !== "soft") {
        for (oh(m, null), $ = m.length; --$ > -1; )
          E = m[$], al(E, "touchCallout", null), de(E, "mousedown", Fe), de(E, "touchstart", Fe), de(E, "click", ee, !0), de(E, "contextmenu", Kt);
        Lo(m, !0), mt && (de(mt, "touchcancel", zt), de(mt, "touchend", zt), de(mt, "touchmove", at)), de(H, "mouseup", zt), de(H, "mousemove", at);
      }
      return hh(e, Ce), z = !1, zi && Z !== "soft" && (zi.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), u.tween && u.tween.kill()), B && B.disable(), lh(se), u.isDragging = u.isPressed = pt = !1, v && oe(u, "dragend", "onDragEnd"), u;
    }, n.enabled = function(Z, v) {
      return arguments.length ? Z ? u.enable(v) : u.disable(v) : z;
    }, n.kill = function() {
      return u.isThrowing = !1, u.tween && u.tween.kill(), u.disable(), St.set(m, {
        clearProps: "userSelect"
      }), delete Hs[e._gsDragID], u;
    }, n.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~r.indexOf("scroll") && (B = n.scrollProxy = new G0(e, V0({
      onKill: function() {
        u.isPressed && zt(null);
      }
    }, i)), e.style.overflowY = f && !Vl ? "auto" : "hidden", e.style.overflowX = h && !Vl ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (h && (p[l] = 1), f && (p[c] = 1)), S.force3D = "force3D" in i ? i.force3D : !0, Pd(nh(n)), n.enable(), n;
  }
  return t.register = function(i) {
    St = i, ul();
  }, t.create = function(i, n) {
    return Bl || ul(!0), kn(i).map(function(r) {
      return new t(r, n);
    });
  }, t.get = function(i) {
    return Hs[(kn(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (Tn() - rh) / 1e3;
  }, t.hitTest = function(i, n, r) {
    if (i === n)
      return !1;
    var o = Es(i), a = Es(n), l = o.top, c = o.left, h = o.right, f = o.bottom, d = o.width, u = o.height, m = a.left > h || a.right < c || a.top > f || a.bottom < l, p, _, b;
    return m || !r ? !m : (b = (r + "").indexOf("%") !== -1, r = parseFloat(r) || 0, p = {
      left: Math.max(c, a.left),
      top: Math.max(l, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(f, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : b ? (r *= 0.01, _ = p.width * p.height, _ >= d * u * r || _ >= a.width * a.height * r) : p.width > r && p.height > r);
  }, t;
}(j0);
Y0(za.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
za.zIndex = 1e3;
za.version = "3.13.0";
kd() && St.registerPlugin(za);
function Z0(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function Q0(s, t, e) {
  return t && Z0(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Le, na, gi, Mn, In, Us, Ld, Xn, $r, Rd, mn, Fi, zd, Fd = function() {
  return Le || typeof window < "u" && (Le = window.gsap) && Le.registerPlugin && Le;
}, Nd = 1, Rs = [], bt = [], tn = [], Br = Date.now, Ul = function(t, e) {
  return e;
}, J0 = function() {
  var t = $r.core, e = t.bridge || {}, i = t._scrollers, n = t._proxies;
  i.push.apply(i, bt), n.push.apply(n, tn), bt = i, tn = n, Ul = function(o, a) {
    return e[o](a);
  };
}, Rn = function(t, e) {
  return ~tn.indexOf(t) && tn[tn.indexOf(t) + 1][e];
}, Vr = function(t) {
  return !!~Rd.indexOf(t);
}, je = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: n !== !1,
    capture: !!r
  });
}, Ge = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Ro = "scrollLeft", zo = "scrollTop", ql = function() {
  return mn && mn.isPressed || bt.cache++;
}, va = function(t, e) {
  var i = function n(r) {
    if (r || r === 0) {
      Nd && (gi.history.scrollRestoration = "manual");
      var o = mn && mn.isPressed;
      r = n.v = Math.round(r) || (mn && mn.iOS ? 1 : 0), t(r), n.cacheID = bt.cache, o && Ul("ss", r);
    } else (e || bt.cache !== n.cacheID || Ul("ref")) && (n.cacheID = bt.cache, n.v = t());
    return n.v + n.offset;
  };
  return i.offset = 0, t && i;
}, ei = {
  s: Ro,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: va(function(s) {
    return arguments.length ? gi.scrollTo(s, Ee.sc()) : gi.pageXOffset || Mn[Ro] || In[Ro] || Us[Ro] || 0;
  })
}, Ee = {
  s: zo,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ei,
  sc: va(function(s) {
    return arguments.length ? gi.scrollTo(ei.sc(), s) : gi.pageYOffset || Mn[zo] || In[zo] || Us[zo] || 0;
  })
}, si = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Le.utils.toArray)(t)[0] || (typeof t == "string" && Le.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, t_ = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Bn = function(t, e) {
  var i = e.s, n = e.sc;
  Vr(t) && (t = Mn.scrollingElement || In);
  var r = bt.indexOf(t), o = n === Ee.sc ? 1 : 2;
  !~r && (r = bt.push(t) - 1), bt[r + o] || je(t, "scroll", ql);
  var a = bt[r + o], l = a || (bt[r + o] = va(Rn(t, i), !0) || (Vr(t) ? n : va(function(c) {
    return arguments.length ? t[i] = c : t[i];
  })));
  return l.target = t, a || (l.smooth = Le.getProperty(t, "scrollBehavior") === "smooth"), l;
}, Kl = function(t, e, i) {
  var n = t, r = t, o = Br(), a = o, l = e || 50, c = Math.max(500, l * 3), h = function(m, p) {
    var _ = Br();
    p || _ - o > l ? (r = n, n = m, a = o, o = _) : i ? n += m : n = r + (m - r) / (_ - a) * (o - a);
  }, f = function() {
    r = n = i ? 0 : n, a = o = 0;
  }, d = function(m) {
    var p = a, _ = r, b = Br();
    return (m || m === 0) && m !== n && h(m), o === a || b - a > c ? 0 : (n + (i ? _ : -_)) / ((i ? b : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: f,
    getVelocity: d
  };
}, pr = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, ph = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, $d = function() {
  $r = Le.core.globals().ScrollTrigger, $r && $r.core && J0();
}, Bd = function(t) {
  return Le = t || Fd(), !na && Le && typeof document < "u" && document.body && (gi = window, Mn = document, In = Mn.documentElement, Us = Mn.body, Rd = [gi, Mn, In, Us], Le.utils.clamp, zd = Le.core.context || function() {
  }, Xn = "onpointerenter" in Us ? "pointer" : "mouse", Ld = le.isTouch = gi.matchMedia && gi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in gi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Fi = le.eventTypes = ("ontouchstart" in In ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in In ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Nd = 0;
  }, 500), $d(), na = 1), na;
};
ei.op = Ee;
bt.cache = 0;
var le = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    na || Bd(Le) || console.warn("Please gsap.registerPlugin(Observer)"), $r || $d();
    var n = i.tolerance, r = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, c = i.debounce, h = i.preventDefault, f = i.onStop, d = i.onStopDelay, u = i.ignore, m = i.wheelSpeed, p = i.event, _ = i.onDragStart, b = i.onDragEnd, A = i.onDrag, C = i.onPress, T = i.onRelease, y = i.onRight, O = i.onLeft, P = i.onUp, S = i.onDown, k = i.onChangeX, R = i.onChangeY, H = i.onChange, z = i.onToggleX, B = i.onToggleY, J = i.onHover, it = i.onHoverEnd, q = i.onMove, Y = i.ignoreCheck, tt = i.isNormalizer, ot = i.onGestureStart, w = i.onGestureEnd, j = i.onWheel, nt = i.onEnable, K = i.onDisable, rt = i.onClick, It = i.scrollSpeed, gt = i.capture, At = i.allowClicks, lt = i.lockAxis, Lt = i.onLockAxis;
    this.target = a = si(a) || In, this.vars = i, u && (u = Le.utils.toArray(u)), n = n || 1e-9, r = r || 0, m = m || 1, It = It || 1, o = o || "wheel,touch,pointer", c = c !== !1, l || (l = parseFloat(gi.getComputedStyle(Us).lineHeight) || 22);
    var ne, Nt, Ut, pt, mt, ut, Ae, I = this, $t = 0, qe = 0, Me = i.passive || !h && i.passive !== !1, Rt = Bn(a, ei), Ft = Bn(a, Ee), ue = Rt(), Ke = Ft(), Kt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Fi[0] === "pointerdown", se = Vr(a), Pt = a.ownerDocument || Mn, ce = [0, 0, 0], Ie = [0, 0, 0], ze = 0, Wi = function() {
      return ze = Br();
    }, qt = function(M, N) {
      return (I.event = M) && u && t_(M.target, u) || N && Kt && M.pointerType !== "touch" || Y && Y(M, N);
    }, Ui = function() {
      I._vx.reset(), I._vy.reset(), Nt.pause(), f && f(I);
    }, ni = function() {
      var M = I.deltaX = ph(ce), N = I.deltaY = ph(Ie), D = Math.abs(M) >= n, W = Math.abs(N) >= n;
      H && (D || W) && H(I, M, N, ce, Ie), D && (y && I.deltaX > 0 && y(I), O && I.deltaX < 0 && O(I), k && k(I), z && I.deltaX < 0 != $t < 0 && z(I), $t = I.deltaX, ce[0] = ce[1] = ce[2] = 0), W && (S && I.deltaY > 0 && S(I), P && I.deltaY < 0 && P(I), R && R(I), B && I.deltaY < 0 != qe < 0 && B(I), qe = I.deltaY, Ie[0] = Ie[1] = Ie[2] = 0), (pt || Ut) && (q && q(I), Ut && (_ && Ut === 1 && _(I), A && A(I), Ut = 0), pt = !1), ut && !(ut = !1) && Lt && Lt(I), mt && (j(I), mt = !1), ne = 0;
    }, ye = function(M, N, D) {
      ce[D] += M, Ie[D] += N, I._vx.update(M), I._vy.update(N), c ? ne || (ne = requestAnimationFrame(ni)) : ni();
    }, De = function(M, N) {
      lt && !Ae && (I.axis = Ae = Math.abs(M) > Math.abs(N) ? "x" : "y", ut = !0), Ae !== "y" && (ce[2] += M, I._vx.update(M, !0)), Ae !== "x" && (Ie[2] += N, I._vy.update(N, !0)), c ? ne || (ne = requestAnimationFrame(ni)) : ni();
    }, wi = function(M) {
      if (!qt(M, 1)) {
        M = pr(M, h);
        var N = M.clientX, D = M.clientY, W = N - I.x, F = D - I.y, U = I.isDragging;
        I.x = N, I.y = D, (U || (W || F) && (Math.abs(I.startX - N) >= r || Math.abs(I.startY - D) >= r)) && (Ut = U ? 2 : 1, U || (I.isDragging = !0), De(W, F));
      }
    }, Fe = I.onPress = function(E) {
      qt(E, 1) || E && E.button || (I.axis = Ae = null, Nt.pause(), I.isPressed = !0, E = pr(E), $t = qe = 0, I.startX = I.x = E.clientX, I.startY = I.y = E.clientY, I._vx.reset(), I._vy.reset(), je(tt ? a : Pt, Fi[1], wi, Me, !0), I.deltaX = I.deltaY = 0, C && C(I));
    }, at = I.onRelease = function(E) {
      if (!qt(E, 1)) {
        Ge(tt ? a : Pt, Fi[1], wi, !0);
        var M = !isNaN(I.y - I.startY), N = I.isDragging, D = N && (Math.abs(I.x - I.startX) > 3 || Math.abs(I.y - I.startY) > 3), W = pr(E);
        !D && M && (I._vx.reset(), I._vy.reset(), h && At && Le.delayedCall(0.08, function() {
          if (Br() - ze > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (Pt.createEvent) {
              var F = Pt.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, gi, 1, W.screenX, W.screenY, W.clientX, W.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(F);
            }
          }
        })), I.isDragging = I.isGesturing = I.isPressed = !1, f && N && !tt && Nt.restart(!0), Ut && ni(), b && N && b(I), T && T(I, D);
      }
    }, Ne = function(M) {
      return M.touches && M.touches.length > 1 && (I.isGesturing = !0) && ot(M, I.isDragging);
    }, zt = function() {
      return (I.isGesturing = !1) || w(I);
    }, Ce = function(M) {
      if (!qt(M)) {
        var N = Rt(), D = Ft();
        ye((N - ue) * It, (D - Ke) * It, 1), ue = N, Ke = D, f && Nt.restart(!0);
      }
    }, ee = function(M) {
      if (!qt(M)) {
        M = pr(M, h), j && (mt = !0);
        var N = (M.deltaMode === 1 ? l : M.deltaMode === 2 ? gi.innerHeight : 1) * m;
        ye(M.deltaX * N, M.deltaY * N, 0), f && !tt && Nt.restart(!0);
      }
    }, xi = function(M) {
      if (!qt(M)) {
        var N = M.clientX, D = M.clientY, W = N - I.x, F = D - I.y;
        I.x = N, I.y = D, pt = !0, f && Nt.restart(!0), (W || F) && De(W, F);
      }
    }, Z = function(M) {
      I.event = M, J(I);
    }, v = function(M) {
      I.event = M, it(I);
    }, $ = function(M) {
      return qt(M) || pr(M, h) && rt(I);
    };
    Nt = I._dc = Le.delayedCall(d || 0.25, Ui).pause(), I.deltaX = I.deltaY = 0, I._vx = Kl(0, 50, !0), I._vy = Kl(0, 50, !0), I.scrollX = Rt, I.scrollY = Ft, I.isDragging = I.isGesturing = I.isPressed = !1, zd(this), I.enable = function(E) {
      return I.isEnabled || (je(se ? Pt : a, "scroll", ql), o.indexOf("scroll") >= 0 && je(se ? Pt : a, "scroll", Ce, Me, gt), o.indexOf("wheel") >= 0 && je(a, "wheel", ee, Me, gt), (o.indexOf("touch") >= 0 && Ld || o.indexOf("pointer") >= 0) && (je(a, Fi[0], Fe, Me, gt), je(Pt, Fi[2], at), je(Pt, Fi[3], at), At && je(a, "click", Wi, !0, !0), rt && je(a, "click", $), ot && je(Pt, "gesturestart", Ne), w && je(Pt, "gestureend", zt), J && je(a, Xn + "enter", Z), it && je(a, Xn + "leave", v), q && je(a, Xn + "move", xi)), I.isEnabled = !0, I.isDragging = I.isGesturing = I.isPressed = pt = Ut = !1, I._vx.reset(), I._vy.reset(), ue = Rt(), Ke = Ft(), E && E.type && Fe(E), nt && nt(I)), I;
    }, I.disable = function() {
      I.isEnabled && (Rs.filter(function(E) {
        return E !== I && Vr(E.target);
      }).length || Ge(se ? Pt : a, "scroll", ql), I.isPressed && (I._vx.reset(), I._vy.reset(), Ge(tt ? a : Pt, Fi[1], wi, !0)), Ge(se ? Pt : a, "scroll", Ce, gt), Ge(a, "wheel", ee, gt), Ge(a, Fi[0], Fe, gt), Ge(Pt, Fi[2], at), Ge(Pt, Fi[3], at), Ge(a, "click", Wi, !0), Ge(a, "click", $), Ge(Pt, "gesturestart", Ne), Ge(Pt, "gestureend", zt), Ge(a, Xn + "enter", Z), Ge(a, Xn + "leave", v), Ge(a, Xn + "move", xi), I.isEnabled = I.isPressed = I.isDragging = !1, K && K(I));
    }, I.kill = I.revert = function() {
      I.disable();
      var E = Rs.indexOf(I);
      E >= 0 && Rs.splice(E, 1), mn === I && (mn = 0);
    }, Rs.push(I), tt && Vr(a) && (mn = I), I.enable(p);
  }, Q0(s, [{
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
le.register = Bd;
le.getAll = function() {
  return Rs.slice();
};
le.getById = function(s) {
  return Rs.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
Fd() && Le.registerPlugin(le);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var He, Vd, gn, Zi, zn, Hd, qs, Fo, Yd = function() {
  return typeof window < "u";
}, Wd = function() {
  return He || Yd() && (He = window.gsap) && He.registerPlugin && He;
}, Ud = function(t) {
  return typeof t == "string";
}, mh = function(t) {
  return typeof t == "function";
}, ao = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return t === gn || t === Zi || t === zn ? Math.max(Zi[n], zn[n]) - (gn["inner" + i] || Zi[r] || zn[r]) : t[n] - t["offset" + i];
}, lo = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === gn && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = Zi[i] != null ? Zi : zn), function() {
    return t[i];
  };
}, e_ = function(t, e, i, n) {
  if (mh(t) && (t = t(e, i, n)), typeof t != "object")
    return Ud(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
    r[o] = o !== "onAutoKill" && mh(t[o]) ? t[o](e, i, n) : t[o];
  return r;
}, qd = function(t, e) {
  if (t = Hd(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), n = !e || e === gn || e === zn, r = n ? {
    top: Zi.clientTop - (gn.pageYOffset || Zi.scrollTop || zn.scrollTop || 0),
    left: Zi.clientLeft - (gn.pageXOffset || Zi.scrollLeft || zn.scrollLeft || 0)
  } : e.getBoundingClientRect(), o = {
    x: i.left - r.left,
    y: i.top - r.top
  };
  return !n && e && (o.x += lo(e, "x")(), o.y += lo(e, "y")()), o;
}, gh = function(t, e, i, n, r) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : Ud(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? ao(e, i) - r : Math.min(ao(e, i), qd(t, e)[i] - r);
}, Xl = function() {
  He = Wd(), Yd() && He && typeof document < "u" && document.body && (gn = window, zn = document.body, Zi = document.documentElement, Hd = He.utils.toArray, He.config({
    autoKillThreshold: 7
  }), qs = He.config(), Vd = 1);
}, vs = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    He = t, Xl();
  },
  init: function(t, e, i, n, r) {
    Vd || Xl();
    var o = this, a = He.getProperty(t, "scrollSnapType");
    o.isWin = t === gn, o.target = t, o.tween = i, e = e_(e, n, t, r), o.vars = e, o.autoKill = !!("autoKill" in e ? e : qs).autoKill, o.getX = lo(t, "x"), o.getY = lo(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), Fo || (Fo = He.core.globals().ScrollTrigger), He.getProperty(t, "scrollBehavior") === "smooth" && He.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, gh(e.x, t, "x", o.x, e.offsetX || 0), n, r), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, gh(e.y, t, "y", o.y, e.offsetY || 0), n, r), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, n = e.target, r = e.tween, o = e.autoKill, a = e.xPrev, l = e.yPrev, c = e.isWin, h = e.snap, f = e.snapInline, d, u, m, p, _; i; )
      i.r(t, i.d), i = i._next;
    d = c || !e.skipX ? e.getX() : a, u = c || !e.skipY ? e.getY() : l, m = u - l, p = d - a, _ = qs.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > _ || p < -_) && d < ao(n, "x") && (e.skipX = 1), !e.skipY && (m > _ || m < -_) && u < ao(n, "y") && (e.skipY = 1), e.skipX && e.skipY && (r.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(r, e.vars.onAutoKillParams || []))), c ? gn.scrollTo(e.skipX ? d : e.x, e.skipY ? u : e.y) : (e.skipY || (n.scrollTop = e.y), e.skipX || (n.scrollLeft = e.x)), h && (t === 1 || t === 0) && (u = n.scrollTop, d = n.scrollLeft, f ? n.style.scrollSnapType = f : n.style.removeProperty("scroll-snap-type"), n.scrollTop = u + 1, n.scrollLeft = d + 1, n.scrollTop = u, n.scrollLeft = d), e.xPrev = e.x, e.yPrev = e.y, Fo && Fo.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
vs.max = ao;
vs.getOffset = qd;
vs.buildGetter = lo;
vs.config = function(s) {
  qs || Xl() || (qs = He.config());
  for (var t in s)
    qs[t] = s[t];
};
Wd() && He.registerPlugin(vs);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var G, ks, vt, Ht, di, Dt, Qu, ba, uo, Hr, Er, No, $e, Fa, Gl, Qe, _h, yh, Ms, Kd, cl, Xd, Ze, jl, Gd, jd, Sn, Zl, Ju, Ks, tc, wa, Ql, hl, $o = 1, Be = Date.now, fl = Be(), Ii = 0, Ar = 0, vh = function(t, e, i) {
  var n = hi(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t;
}, bh = function(t, e) {
  return e && (!hi(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, i_ = function s() {
  return Ar && requestAnimationFrame(s);
}, wh = function() {
  return Fa = 1;
}, xh = function() {
  return Fa = 0;
}, Ki = function(t) {
  return t;
}, Cr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Zd = function() {
  return typeof window < "u";
}, Qd = function() {
  return G || Zd() && (G = window.gsap) && G.registerPlugin && G;
}, ps = function(t) {
  return !!~Qu.indexOf(t);
}, Jd = function(t) {
  return (t === "Height" ? tc : vt["inner" + t]) || di["client" + t] || Dt["client" + t];
}, tp = function(t) {
  return Rn(t, "getBoundingClientRect") || (ps(t) ? function() {
    return la.width = vt.innerWidth, la.height = tc, la;
  } : function() {
    return fn(t);
  });
}, n_ = function(t, e, i) {
  var n = i.d, r = i.d2, o = i.a;
  return (o = Rn(t, "getBoundingClientRect")) ? function() {
    return o()[n];
  } : function() {
    return (e ? Jd(r) : t["client" + r]) || 0;
  };
}, s_ = function(t, e) {
  return !e || ~tn.indexOf(t) ? tp(t) : function() {
    return la;
  };
}, Qi = function(t, e) {
  var i = e.s, n = e.d2, r = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + n) && (o = Rn(t, i)) ? o() - tp(t)()[r] : ps(t) ? (di[i] || Dt[i]) - Jd(n) : t[i] - t["offset" + n]);
}, Bo = function(t, e) {
  for (var i = 0; i < Ms.length; i += 3)
    (!e || ~e.indexOf(Ms[i + 1])) && t(Ms[i], Ms[i + 1], Ms[i + 2]);
}, hi = function(t) {
  return typeof t == "string";
}, Ye = function(t) {
  return typeof t == "function";
}, Pr = function(t) {
  return typeof t == "number";
}, Gn = function(t) {
  return typeof t == "object";
}, mr = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, dl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, As = Math.abs, ep = "left", ip = "top", ec = "right", ic = "bottom", as = "width", ls = "height", Yr = "Right", Wr = "Left", Ur = "Top", qr = "Bottom", pe = "padding", Ci = "margin", sr = "Width", nc = "Height", xe = "px", Pi = function(t) {
  return vt.getComputedStyle(t);
}, r_ = function(t) {
  var e = Pi(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, Th = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, fn = function(t, e) {
  var i = e && Pi(t)[Gl] !== "matrix(1, 0, 0, 1, 0, 0)" && G.to(t, {
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
}, xa = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, np = function(t) {
  var e = [], i = t.labels, n = t.duration(), r;
  for (r in i)
    e.push(i[r] / n);
  return e;
}, o_ = function(t) {
  return function(e) {
    return G.utils.snap(np(t), e);
  };
}, sc = function(t) {
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
}, a_ = function(t) {
  return function(e, i) {
    return sc(np(t))(e, i.direction);
  };
}, Vo = function(t, e, i, n) {
  return i.split(",").forEach(function(r) {
    return t(e, r, n);
  });
}, Oe = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: !n,
    capture: !!r
  });
}, Pe = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Ho = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Sh = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Yo = {
  toggleActions: "play",
  anticipatePin: 0
}, Ta = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, sa = function(t, e) {
  if (hi(t)) {
    var i = t.indexOf("="), n = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (n *= e / 100), t = t.substr(0, i - 1)), t = n + (t in Ta ? Ta[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, Wo = function(t, e, i, n, r, o, a, l) {
  var c = r.startColor, h = r.endColor, f = r.fontSize, d = r.indent, u = r.fontWeight, m = Ht.createElement("div"), p = ps(i) || Rn(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, b = p ? Dt : i, A = t.indexOf("start") !== -1, C = A ? c : h, T = "border-color:" + C + ";font-size:" + f + ";color:" + C + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((_ || l) && p ? "fixed;" : "absolute;"), (_ || l || !p) && (T += (n === Ee ? ec : ic) + ":" + (o + parseFloat(d)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), m._isStart = A, m.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), m.style.cssText = T, m.innerText = e || e === 0 ? t + "-" + e : t, b.children[0] ? b.insertBefore(m, b.children[0]) : b.appendChild(m), m._offset = m["offset" + n.op.d2], ra(m, 0, n, A), m;
}, ra = function(t, e, i, n) {
  var r = {
    display: "block"
  }, o = i[n ? "os2" : "p2"], a = i[n ? "p2" : "os2"];
  t._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? "1px" : 0, r["border" + o + sr] = 1, r["border" + a + sr] = 0, r[i.p] = e + "px", G.set(t, r);
}, yt = [], Jl = {}, co, Eh = function() {
  return Be() - Ii > 34 && (co || (co = requestAnimationFrame(_n)));
}, Cs = function() {
  (!Ze || !Ze.isPressed || Ze.startX > Dt.clientWidth) && (bt.cache++, Ze ? co || (co = requestAnimationFrame(_n)) : _n(), Ii || gs("scrollStart"), Ii = Be());
}, pl = function() {
  jd = vt.innerWidth, Gd = vt.innerHeight;
}, Or = function(t) {
  bt.cache++, (t === !0 || !$e && !Xd && !Ht.fullscreenElement && !Ht.webkitFullscreenElement && (!jl || jd !== vt.innerWidth || Math.abs(vt.innerHeight - Gd) > vt.innerHeight * 0.25)) && ba.restart(!0);
}, ms = {}, l_ = [], sp = function s() {
  return Pe(wt, "scrollEnd", s) || Qn(!0);
}, gs = function(t) {
  return ms[t] && ms[t].map(function(e) {
    return e();
  }) || l_;
}, ci = [], rp = function(t) {
  for (var e = 0; e < ci.length; e += 5)
    (!t || ci[e + 4] && ci[e + 4].query === t) && (ci[e].style.cssText = ci[e + 1], ci[e].getBBox && ci[e].setAttribute("transform", ci[e + 2] || ""), ci[e + 3].uncache = 1);
}, rc = function(t, e) {
  var i;
  for (Qe = 0; Qe < yt.length; Qe++)
    i = yt[Qe], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  wa = !0, e && rp(e), e || gs("revert");
}, op = function(t, e) {
  bt.cache++, (e || !Je) && bt.forEach(function(i) {
    return Ye(i) && i.cacheID++ && (i.rec = 0);
  }), hi(t) && (vt.history.scrollRestoration = Ju = t);
}, Je, us = 0, Ah, u_ = function() {
  if (Ah !== us) {
    var t = Ah = us;
    requestAnimationFrame(function() {
      return t === us && Qn(!0);
    });
  }
}, ap = function() {
  Dt.appendChild(Ks), tc = !Ze && Ks.offsetHeight || vt.innerHeight, Dt.removeChild(Ks);
}, Ch = function(t) {
  return uo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, Qn = function(t, e) {
  if (di = Ht.documentElement, Dt = Ht.body, Qu = [vt, Ht, di, Dt], Ii && !t && !wa) {
    Oe(wt, "scrollEnd", sp);
    return;
  }
  ap(), Je = wt.isRefreshing = !0, bt.forEach(function(n) {
    return Ye(n) && ++n.cacheID && (n.rec = n());
  });
  var i = gs("refreshInit");
  Kd && wt.sort(), e || rc(), bt.forEach(function(n) {
    Ye(n) && (n.smooth && (n.target.style.scrollBehavior = "auto"), n(0));
  }), yt.slice(0).forEach(function(n) {
    return n.refresh();
  }), wa = !1, yt.forEach(function(n) {
    if (n._subPinOffset && n.pin) {
      var r = n.vars.horizontal ? "offsetWidth" : "offsetHeight", o = n.pin[r];
      n.revert(!0, 1), n.adjustPinSpacing(n.pin[r] - o), n.refresh();
    }
  }), Ql = 1, Ch(!0), yt.forEach(function(n) {
    var r = Qi(n.scroller, n._dir), o = n.vars.end === "max" || n._endClamp && n.end > r, a = n._startClamp && n.start >= r;
    (o || a) && n.setPositions(a ? r - 1 : n.start, o ? Math.max(a ? r : n.start + 1, r) : n.end, !0);
  }), Ch(!1), Ql = 0, i.forEach(function(n) {
    return n && n.render && n.render(-1);
  }), bt.forEach(function(n) {
    Ye(n) && (n.smooth && requestAnimationFrame(function() {
      return n.target.style.scrollBehavior = "smooth";
    }), n.rec && n(n.rec));
  }), op(Ju, 1), ba.pause(), us++, Je = 2, _n(2), yt.forEach(function(n) {
    return Ye(n.vars.onRefresh) && n.vars.onRefresh(n);
  }), Je = wt.isRefreshing = !1, gs("refresh");
}, tu = 0, oa = 1, Kr, _n = function(t) {
  if (t === 2 || !Je && !wa) {
    wt.isUpdating = !0, Kr && Kr.update(0);
    var e = yt.length, i = Be(), n = i - fl >= 50, r = e && yt[0].scroll();
    if (oa = tu > r ? -1 : 1, Je || (tu = r), n && (Ii && !Fa && i - Ii > 200 && (Ii = 0, gs("scrollEnd")), Er = fl, fl = i), oa < 0) {
      for (Qe = e; Qe-- > 0; )
        yt[Qe] && yt[Qe].update(0, n);
      oa = 1;
    } else
      for (Qe = 0; Qe < e; Qe++)
        yt[Qe] && yt[Qe].update(0, n);
    wt.isUpdating = !1;
  }
  co = 0;
}, eu = [ep, ip, ic, ec, Ci + qr, Ci + Yr, Ci + Ur, Ci + Wr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], aa = eu.concat([as, ls, "boxSizing", "max" + sr, "max" + nc, "position", Ci, pe, pe + Ur, pe + Yr, pe + qr, pe + Wr]), c_ = function(t, e, i) {
  Xs(i);
  var n = t._gsap;
  if (n.spacerIsNative)
    Xs(n.spacerState);
  else if (t._gsap.swappedIn) {
    var r = e.parentNode;
    r && (r.insertBefore(t, e), r.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, ml = function(t, e, i, n) {
  if (!t._gsap.swappedIn) {
    for (var r = eu.length, o = e.style, a = t.style, l; r--; )
      l = eu[r], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[ic] = a[ec] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[as] = xa(t, ei) + xe, o[ls] = xa(t, Ee) + xe, o[pe] = a[Ci] = a[ip] = a[ep] = "0", Xs(n), a[as] = a["max" + sr] = i[as], a[ls] = a["max" + nc] = i[ls], a[pe] = i[pe], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, h_ = /([A-Z])/g, Xs = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, n = 0, r, o;
    for ((t.t._gsap || G.core.getCache(t.t)).uncache = 1; n < i; n += 2)
      o = t[n + 1], r = t[n], o ? e[r] = o : e[r] && e.removeProperty(r.replace(h_, "-$1").toLowerCase());
  }
}, Uo = function(t) {
  for (var e = aa.length, i = t.style, n = [], r = 0; r < e; r++)
    n.push(aa[r], i[aa[r]]);
  return n.t = t, n;
}, f_ = function(t, e, i) {
  for (var n = [], r = t.length, o = i ? 8 : 0, a; o < r; o += 2)
    a = t[o], n.push(a, a in e ? e[a] : t[o + 1]);
  return n.t = t.t, n;
}, la = {
  left: 0,
  top: 0
}, Ph = function(t, e, i, n, r, o, a, l, c, h, f, d, u, m) {
  Ye(t) && (t = t(l)), hi(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? sa("0" + t.substr(3), i) : 0));
  var p = u ? u.time() : 0, _, b, A;
  if (u && u.seek(0), isNaN(t) || (t = +t), Pr(t))
    u && (t = G.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, d, t)), a && ra(a, i, n, !0);
  else {
    Ye(e) && (e = e(l));
    var C = (t || "0").split(" "), T, y, O, P;
    A = si(e, l) || Dt, T = fn(A) || {}, (!T || !T.left && !T.top) && Pi(A).display === "none" && (P = A.style.display, A.style.display = "block", T = fn(A), P ? A.style.display = P : A.style.removeProperty("display")), y = sa(C[0], T[n.d]), O = sa(C[1] || "0", i), t = T[n.p] - c[n.p] - h + y + r - O, a && ra(a, O, n, i - O < 20 || a._isStart && O > 20), i -= i - O;
  }
  if (m && (l[m] = t || -1e-3, t < 0 && (t = 0)), o) {
    var S = t + i, k = o._isStart;
    _ = "scroll" + n.d2, ra(o, S, n, k && S > 20 || !k && (f ? Math.max(Dt[_], di[_]) : o.parentNode[_]) <= S + 1), f && (c = fn(a), f && (o.style[n.op.p] = c[n.op.p] - n.op.m - o._offset + xe));
  }
  return u && A && (_ = fn(A), u.seek(d), b = fn(A), u._caScrollDist = _[n.p] - b[n.p], t = t / u._caScrollDist * d), u && u.seek(p), u ? t : Math.round(t);
}, d_ = /(webkit|moz|length|cssText|inset)/i, Oh = function(t, e, i, n) {
  if (t.parentNode !== e) {
    var r = t.style, o, a;
    if (e === Dt) {
      t._stOrig = r.cssText, a = Pi(t);
      for (o in a)
        !+o && !d_.test(o) && a[o] && typeof r[o] == "string" && o !== "0" && (r[o] = a[o]);
      r.top = i, r.left = n;
    } else
      r.cssText = t._stOrig;
    G.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, lp = function(t, e, i) {
  var n = e, r = n;
  return function(o) {
    var a = Math.round(t());
    return a !== n && a !== r && Math.abs(a - n) > 3 && Math.abs(a - r) > 3 && (o = a, i && i()), r = n, n = Math.round(o), n;
  };
}, qo = function(t, e, i) {
  var n = {};
  n[e.p] = "+=" + i, G.set(t, n);
}, kh = function(t, e) {
  var i = Bn(t, e), n = "_scroll" + e.p2, r = function o(a, l, c, h, f) {
    var d = o.tween, u = l.onComplete, m = {};
    c = c || i();
    var p = lp(i, c, function() {
      d.kill(), o.tween = 0;
    });
    return f = h && f || 0, h = h || a - c, d && d.kill(), l[n] = a, l.inherit = !1, l.modifiers = m, m[n] = function() {
      return p(c + h * d.ratio + f * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      bt.cache++, o.tween && _n();
    }, l.onComplete = function() {
      o.tween = 0, u && u.call(d);
    }, d = o.tween = G.to(t, l), d;
  };
  return t[n] = i, i.wheelHandler = function() {
    return r.tween && r.tween.kill() && (r.tween = 0);
  }, Oe(t, "wheel", i.wheelHandler), wt.isTouch && Oe(t, "touchmove", i.wheelHandler), r;
}, wt = /* @__PURE__ */ function() {
  function s(e, i) {
    ks || s.register(G) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Zl(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, n) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Ar) {
      this.update = this.refresh = this.kill = Ki;
      return;
    }
    i = Th(hi(i) || Pr(i) || i.nodeType ? {
      trigger: i
    } : i, Yo);
    var r = i, o = r.onUpdate, a = r.toggleClass, l = r.id, c = r.onToggle, h = r.onRefresh, f = r.scrub, d = r.trigger, u = r.pin, m = r.pinSpacing, p = r.invalidateOnRefresh, _ = r.anticipatePin, b = r.onScrubComplete, A = r.onSnapComplete, C = r.once, T = r.snap, y = r.pinReparent, O = r.pinSpacer, P = r.containerAnimation, S = r.fastScrollEnd, k = r.preventOverlaps, R = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? ei : Ee, H = !f && f !== 0, z = si(i.scroller || vt), B = G.core.getCache(z), J = ps(z), it = ("pinType" in i ? i.pinType : Rn(z, "pinType") || J && "fixed") === "fixed", q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], Y = H && i.toggleActions.split(" "), tt = "markers" in i ? i.markers : Yo.markers, ot = J ? 0 : parseFloat(Pi(z)["border" + R.p2 + sr]) || 0, w = this, j = i.onRefreshInit && function() {
      return i.onRefreshInit(w);
    }, nt = n_(z, J, R), K = s_(z, J), rt = 0, It = 0, gt = 0, At = Bn(z, R), lt, Lt, ne, Nt, Ut, pt, mt, ut, Ae, I, $t, qe, Me, Rt, Ft, ue, Ke, Kt, se, Pt, ce, Ie, ze, Wi, qt, Ui, ni, ye, De, wi, Fe, at, Ne, zt, Ce, ee, xi, Z, v;
    if (w._startClamp = w._endClamp = !1, w._dir = R, _ *= 45, w.scroller = z, w.scroll = P ? P.time.bind(P) : At, Nt = At(), w.vars = i, n = n || i.animation, "refreshPriority" in i && (Kd = 1, i.refreshPriority === -9999 && (Kr = w)), B.tweenScroll = B.tweenScroll || {
      top: kh(z, Ee),
      left: kh(z, ei)
    }, w.tweenTo = lt = B.tweenScroll[R.p], w.scrubDuration = function(D) {
      Ne = Pr(D) && D, Ne ? at ? at.duration(D) : at = G.to(n, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Ne,
        paused: !0,
        onComplete: function() {
          return b && b(w);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, n && (n.vars.lazy = !1, n._initted && !w.isReverted || n.vars.immediateRender !== !1 && i.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), w.animation = n.pause(), n.scrollTrigger = w, w.scrubDuration(f), wi = 0, l || (l = n.vars.id)), T && ((!Gn(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in Dt.style && G.set(J ? [Dt, di] : z, {
      scrollBehavior: "auto"
    }), bt.forEach(function(D) {
      return Ye(D) && D.target === (J ? Ht.scrollingElement || di : z) && (D.smooth = !1);
    }), ne = Ye(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? o_(n) : T.snapTo === "labelsDirectional" ? a_(n) : T.directional !== !1 ? function(D, W) {
      return sc(T.snapTo)(D, Be() - It < 500 ? 0 : W.direction);
    } : G.utils.snap(T.snapTo), zt = T.duration || {
      min: 0.1,
      max: 2
    }, zt = Gn(zt) ? Hr(zt.min, zt.max) : Hr(zt, zt), Ce = G.delayedCall(T.delay || Ne / 2 || 0.1, function() {
      var D = At(), W = Be() - It < 500, F = lt.tween;
      if ((W || Math.abs(w.getVelocity()) < 10) && !F && !Fa && rt !== D) {
        var U = (D - pt) / Rt, et = n && !H ? n.totalProgress() : U, X = W ? 0 : (et - Fe) / (Be() - Er) * 1e3 || 0, ft = G.utils.clamp(-U, 1 - U, As(X / 2) * X / 0.185), xt = U + (T.inertia === !1 ? 0 : ft), Ct, _t, dt = T, Ot = dt.onStart, ct = dt.onInterrupt, ve = dt.onComplete;
        if (Ct = ne(xt, w), Pr(Ct) || (Ct = xt), _t = Math.max(0, Math.round(pt + Ct * Rt)), D <= mt && D >= pt && _t !== D) {
          if (F && !F._initted && F.data <= As(_t - D))
            return;
          T.inertia === !1 && (ft = Ct - U), lt(_t, {
            duration: zt(As(Math.max(As(xt - et), As(Ct - et)) * 0.185 / X / 0.05 || 0)),
            ease: T.ease || "power3",
            data: As(_t - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ce.restart(!0) && ct && ct(w);
            },
            onComplete: function() {
              w.update(), rt = At(), n && !H && (at ? at.resetTo("totalProgress", Ct, n._tTime / n._tDur) : n.progress(Ct)), wi = Fe = n && !H ? n.totalProgress() : w.progress, A && A(w), ve && ve(w);
            }
          }, D, ft * Rt, _t - D - ft * Rt), Ot && Ot(w, lt.tween);
        }
      } else w.isActive && rt !== D && Ce.restart(!0);
    }).pause()), l && (Jl[l] = w), d = w.trigger = si(d || u !== !0 && u), v = d && d._gsap && d._gsap.stRevert, v && (v = v(w)), u = u === !0 ? d : si(u), hi(a) && (a = {
      targets: d,
      className: a
    }), u && (m === !1 || m === Ci || (m = !m && u.parentNode && u.parentNode.style && Pi(u.parentNode).display === "flex" ? !1 : pe), w.pin = u, Lt = G.core.getCache(u), Lt.spacer ? Ft = Lt.pinState : (O && (O = si(O), O && !O.nodeType && (O = O.current || O.nativeElement), Lt.spacerIsNative = !!O, O && (Lt.spacerState = Uo(O))), Lt.spacer = Kt = O || Ht.createElement("div"), Kt.classList.add("pin-spacer"), l && Kt.classList.add("pin-spacer-" + l), Lt.pinState = Ft = Uo(u)), i.force3D !== !1 && G.set(u, {
      force3D: !0
    }), w.spacer = Kt = Lt.spacer, De = Pi(u), Wi = De[m + R.os2], Pt = G.getProperty(u), ce = G.quickSetter(u, R.a, xe), ml(u, Kt, De), Ke = Uo(u)), tt) {
      qe = Gn(tt) ? Th(tt, Sh) : Sh, I = Wo("scroller-start", l, z, R, qe, 0), $t = Wo("scroller-end", l, z, R, qe, 0, I), se = I["offset" + R.op.d2];
      var $ = si(Rn(z, "content") || z);
      ut = this.markerStart = Wo("start", l, $, R, qe, se, 0, P), Ae = this.markerEnd = Wo("end", l, $, R, qe, se, 0, P), P && (Z = G.quickSetter([ut, Ae], R.a, xe)), !it && !(tn.length && Rn(z, "fixedMarkers") === !0) && (r_(J ? Dt : z), G.set([I, $t], {
        force3D: !0
      }), Ui = G.quickSetter(I, R.a, xe), ye = G.quickSetter($t, R.a, xe));
    }
    if (P) {
      var E = P.vars.onUpdate, M = P.vars.onUpdateParams;
      P.eventCallback("onUpdate", function() {
        w.update(0, 0, 1), E && E.apply(P, M || []);
      });
    }
    if (w.previous = function() {
      return yt[yt.indexOf(w) - 1];
    }, w.next = function() {
      return yt[yt.indexOf(w) + 1];
    }, w.revert = function(D, W) {
      if (!W)
        return w.kill(!0);
      var F = D !== !1 || !w.enabled, U = $e;
      F !== w.isReverted && (F && (ee = Math.max(At(), w.scroll.rec || 0), gt = w.progress, xi = n && n.progress()), ut && [ut, Ae, I, $t].forEach(function(et) {
        return et.style.display = F ? "none" : "block";
      }), F && ($e = w, w.update(F)), u && (!y || !w.isActive) && (F ? c_(u, Kt, Ft) : ml(u, Kt, Pi(u), qt)), F || w.update(F), $e = U, w.isReverted = F);
    }, w.refresh = function(D, W, F, U) {
      if (!(($e || !w.enabled) && !W)) {
        if (u && D && Ii) {
          Oe(s, "scrollEnd", sp);
          return;
        }
        !Je && j && j(w), $e = w, lt.tween && !F && (lt.tween.kill(), lt.tween = 0), at && at.pause(), p && n && (n.revert({
          kill: !1
        }).invalidate(), n.getChildren && n.getChildren(!0, !0, !1).forEach(function(Li) {
          return Li.vars.immediateRender && Li.render(0, !0, !0);
        })), w.isReverted || w.revert(!0, !0), w._subPinOffset = !1;
        var et = nt(), X = K(), ft = P ? P.duration() : Qi(z, R), xt = Rt <= 0.01 || !Rt, Ct = 0, _t = U || 0, dt = Gn(F) ? F.end : i.end, Ot = i.endTrigger || d, ct = Gn(F) ? F.start : i.start || (i.start === 0 || !d ? 0 : u ? "0 0" : "0 100%"), ve = w.pinnedContainer = i.pinnedContainer && si(i.pinnedContainer, w), Xt = d && Math.max(0, yt.indexOf(w)) || 0, be = Xt, we, he, sn, rn, fe, re, Xe, bs, Oo, Yn, Ti, on, ws;
        for (tt && Gn(F) && (on = G.getProperty(I, R.p), ws = G.getProperty($t, R.p)); be-- > 0; )
          re = yt[be], re.end || re.refresh(0, 1) || ($e = w), Xe = re.pin, Xe && (Xe === d || Xe === u || Xe === ve) && !re.isReverted && (Yn || (Yn = []), Yn.unshift(re), re.revert(!0, !0)), re !== yt[be] && (Xt--, be--);
        for (Ye(ct) && (ct = ct(w)), ct = vh(ct, "start", w), pt = Ph(ct, d, et, R, At(), ut, I, w, X, ot, it, ft, P, w._startClamp && "_startClamp") || (u ? -1e-3 : 0), Ye(dt) && (dt = dt(w)), hi(dt) && !dt.indexOf("+=") && (~dt.indexOf(" ") ? dt = (hi(ct) ? ct.split(" ")[0] : "") + dt : (Ct = sa(dt.substr(2), et), dt = hi(ct) ? ct : (P ? G.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, pt) : pt) + Ct, Ot = d)), dt = vh(dt, "end", w), mt = Math.max(pt, Ph(dt || (Ot ? "100% 0" : ft), Ot, et, R, At() + Ct, Ae, $t, w, X, ot, it, ft, P, w._endClamp && "_endClamp")) || -1e-3, Ct = 0, be = Xt; be--; )
          re = yt[be], Xe = re.pin, Xe && re.start - re._pinPush <= pt && !P && re.end > 0 && (we = re.end - (w._startClamp ? Math.max(0, re.start) : re.start), (Xe === d && re.start - re._pinPush < pt || Xe === ve) && isNaN(ct) && (Ct += we * (1 - re.progress)), Xe === u && (_t += we));
        if (pt += Ct, mt += Ct, w._startClamp && (w._startClamp += Ct), w._endClamp && !Je && (w._endClamp = mt || -1e-3, mt = Math.min(mt, Qi(z, R))), Rt = mt - pt || (pt -= 0.01) && 1e-3, xt && (gt = G.utils.clamp(0, 1, G.utils.normalize(pt, mt, ee))), w._pinPush = _t, ut && Ct && (we = {}, we[R.a] = "+=" + Ct, ve && (we[R.p] = "-=" + At()), G.set([ut, Ae], we)), u && !(Ql && w.end >= Qi(z, R)))
          we = Pi(u), rn = R === Ee, sn = At(), Ie = parseFloat(Pt(R.a)) + _t, !ft && mt > 1 && (Ti = (J ? Ht.scrollingElement || di : z).style, Ti = {
            style: Ti,
            value: Ti["overflow" + R.a.toUpperCase()]
          }, J && Pi(Dt)["overflow" + R.a.toUpperCase()] !== "scroll" && (Ti.style["overflow" + R.a.toUpperCase()] = "scroll")), ml(u, Kt, we), Ke = Uo(u), he = fn(u, !0), bs = it && Bn(z, rn ? ei : Ee)(), m ? (qt = [m + R.os2, Rt + _t + xe], qt.t = Kt, be = m === pe ? xa(u, R) + Rt + _t : 0, be && (qt.push(R.d, be + xe), Kt.style.flexBasis !== "auto" && (Kt.style.flexBasis = be + xe)), Xs(qt), ve && yt.forEach(function(Li) {
            Li.pin === ve && Li.vars.pinSpacing !== !1 && (Li._subPinOffset = !0);
          }), it && At(ee)) : (be = xa(u, R), be && Kt.style.flexBasis !== "auto" && (Kt.style.flexBasis = be + xe)), it && (fe = {
            top: he.top + (rn ? sn - pt : bs) + xe,
            left: he.left + (rn ? bs : sn - pt) + xe,
            boxSizing: "border-box",
            position: "fixed"
          }, fe[as] = fe["max" + sr] = Math.ceil(he.width) + xe, fe[ls] = fe["max" + nc] = Math.ceil(he.height) + xe, fe[Ci] = fe[Ci + Ur] = fe[Ci + Yr] = fe[Ci + qr] = fe[Ci + Wr] = "0", fe[pe] = we[pe], fe[pe + Ur] = we[pe + Ur], fe[pe + Yr] = we[pe + Yr], fe[pe + qr] = we[pe + qr], fe[pe + Wr] = we[pe + Wr], ue = f_(Ft, fe, y), Je && At(0)), n ? (Oo = n._initted, cl(1), n.render(n.duration(), !0, !0), ze = Pt(R.a) - Ie + Rt + _t, ni = Math.abs(Rt - ze) > 1, it && ni && ue.splice(ue.length - 2, 2), n.render(0, !0, !0), Oo || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), cl(0)) : ze = Rt, Ti && (Ti.value ? Ti.style["overflow" + R.a.toUpperCase()] = Ti.value : Ti.style.removeProperty("overflow-" + R.a));
        else if (d && At() && !P)
          for (he = d.parentNode; he && he !== Dt; )
            he._pinOffset && (pt -= he._pinOffset, mt -= he._pinOffset), he = he.parentNode;
        Yn && Yn.forEach(function(Li) {
          return Li.revert(!1, !0);
        }), w.start = pt, w.end = mt, Nt = Ut = Je ? ee : At(), !P && !Je && (Nt < ee && At(ee), w.scroll.rec = 0), w.revert(!1, !0), It = Be(), Ce && (rt = -1, Ce.restart(!0)), $e = 0, n && H && (n._initted || xi) && n.progress() !== xi && n.progress(xi || 0, !0).render(n.time(), !0, !0), (xt || gt !== w.progress || P || p || n && !n._initted) && (n && !H && (n._initted || gt || n.vars.immediateRender !== !1) && n.totalProgress(P && pt < -1e-3 && !gt ? G.utils.normalize(pt, mt, 0) : gt, !0), w.progress = xt || (Nt - pt) / Rt === gt ? 0 : gt), u && m && (Kt._pinOffset = Math.round(w.progress * ze)), at && at.invalidate(), isNaN(on) || (on -= G.getProperty(I, R.p), ws -= G.getProperty($t, R.p), qo(I, R, on), qo(ut, R, on - (U || 0)), qo($t, R, ws), qo(Ae, R, ws - (U || 0))), xt && !Je && w.update(), h && !Je && !Me && (Me = !0, h(w), Me = !1);
      }
    }, w.getVelocity = function() {
      return (At() - Ut) / (Be() - Er) * 1e3 || 0;
    }, w.endAnimation = function() {
      mr(w.callbackAnimation), n && (at ? at.progress(1) : n.paused() ? H || mr(n, w.direction < 0, 1) : mr(n, n.reversed()));
    }, w.labelToScroll = function(D) {
      return n && n.labels && (pt || w.refresh() || pt) + n.labels[D] / n.duration() * Rt || 0;
    }, w.getTrailing = function(D) {
      var W = yt.indexOf(w), F = w.direction > 0 ? yt.slice(0, W).reverse() : yt.slice(W + 1);
      return (hi(D) ? F.filter(function(U) {
        return U.vars.preventOverlaps === D;
      }) : F).filter(function(U) {
        return w.direction > 0 ? U.end <= pt : U.start >= mt;
      });
    }, w.update = function(D, W, F) {
      if (!(P && !F && !D)) {
        var U = Je === !0 ? ee : w.scroll(), et = D ? 0 : (U - pt) / Rt, X = et < 0 ? 0 : et > 1 ? 1 : et || 0, ft = w.progress, xt, Ct, _t, dt, Ot, ct, ve, Xt;
        if (W && (Ut = Nt, Nt = P ? At() : U, T && (Fe = wi, wi = n && !H ? n.totalProgress() : X)), _ && u && !$e && !$o && Ii && (!X && pt < U + (U - Ut) / (Be() - Er) * _ ? X = 1e-4 : X === 1 && mt > U + (U - Ut) / (Be() - Er) * _ && (X = 0.9999)), X !== ft && w.enabled) {
          if (xt = w.isActive = !!X && X < 1, Ct = !!ft && ft < 1, ct = xt !== Ct, Ot = ct || !!X != !!ft, w.direction = X > ft ? 1 : -1, w.progress = X, Ot && !$e && (_t = X && !ft ? 0 : X === 1 ? 1 : ft === 1 ? 2 : 3, H && (dt = !ct && Y[_t + 1] !== "none" && Y[_t + 1] || Y[_t], Xt = n && (dt === "complete" || dt === "reset" || dt in n))), k && (ct || Xt) && (Xt || f || !n) && (Ye(k) ? k(w) : w.getTrailing(k).forEach(function(sn) {
            return sn.endAnimation();
          })), H || (at && !$e && !$o ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", X, n._tTime / n._tDur) : (at.vars.totalProgress = X, at.invalidate().restart())) : n && n.totalProgress(X, !!($e && (It || D)))), u) {
            if (D && m && (Kt.style[m + R.os2] = Wi), !it)
              ce(Cr(Ie + ze * X));
            else if (Ot) {
              if (ve = !D && X > ft && mt + 1 > U && U + 1 >= Qi(z, R), y)
                if (!D && (xt || ve)) {
                  var be = fn(u, !0), we = U - pt;
                  Oh(u, Dt, be.top + (R === Ee ? we : 0) + xe, be.left + (R === Ee ? 0 : we) + xe);
                } else
                  Oh(u, Kt);
              Xs(xt || ve ? ue : Ke), ni && X < 1 && xt || ce(Ie + (X === 1 && !ve ? ze : 0));
            }
          }
          T && !lt.tween && !$e && !$o && Ce.restart(!0), a && (ct || C && X && (X < 1 || !hl)) && uo(a.targets).forEach(function(sn) {
            return sn.classList[xt || C ? "add" : "remove"](a.className);
          }), o && !H && !D && o(w), Ot && !$e ? (H && (Xt && (dt === "complete" ? n.pause().totalProgress(1) : dt === "reset" ? n.restart(!0).pause() : dt === "restart" ? n.restart(!0) : n[dt]()), o && o(w)), (ct || !hl) && (c && ct && dl(w, c), q[_t] && dl(w, q[_t]), C && (X === 1 ? w.kill(!1, 1) : q[_t] = 0), ct || (_t = X === 1 ? 1 : 3, q[_t] && dl(w, q[_t]))), S && !xt && Math.abs(w.getVelocity()) > (Pr(S) ? S : 2500) && (mr(w.callbackAnimation), at ? at.progress(1) : mr(n, dt === "reverse" ? 1 : !X, 1))) : H && o && !$e && o(w);
        }
        if (ye) {
          var he = P ? U / P.duration() * (P._caScrollDist || 0) : U;
          Ui(he + (I._isFlipped ? 1 : 0)), ye(he);
        }
        Z && Z(-U / P.duration() * (P._caScrollDist || 0));
      }
    }, w.enable = function(D, W) {
      w.enabled || (w.enabled = !0, Oe(z, "resize", Or), J || Oe(z, "scroll", Cs), j && Oe(s, "refreshInit", j), D !== !1 && (w.progress = gt = 0, Nt = Ut = rt = At()), W !== !1 && w.refresh());
    }, w.getTween = function(D) {
      return D && lt ? lt.tween : at;
    }, w.setPositions = function(D, W, F, U) {
      if (P) {
        var et = P.scrollTrigger, X = P.duration(), ft = et.end - et.start;
        D = et.start + ft * D / X, W = et.start + ft * W / X;
      }
      w.refresh(!1, !1, {
        start: bh(D, F && !!w._startClamp),
        end: bh(W, F && !!w._endClamp)
      }, U), w.update();
    }, w.adjustPinSpacing = function(D) {
      if (qt && D) {
        var W = qt.indexOf(R.d) + 1;
        qt[W] = parseFloat(qt[W]) + D + xe, qt[1] = parseFloat(qt[1]) + D + xe, Xs(qt);
      }
    }, w.disable = function(D, W) {
      if (w.enabled && (D !== !1 && w.revert(!0, !0), w.enabled = w.isActive = !1, W || at && at.pause(), ee = 0, Lt && (Lt.uncache = 1), j && Pe(s, "refreshInit", j), Ce && (Ce.pause(), lt.tween && lt.tween.kill() && (lt.tween = 0)), !J)) {
        for (var F = yt.length; F--; )
          if (yt[F].scroller === z && yt[F] !== w)
            return;
        Pe(z, "resize", Or), J || Pe(z, "scroll", Cs);
      }
    }, w.kill = function(D, W) {
      w.disable(D, W), at && !W && at.kill(), l && delete Jl[l];
      var F = yt.indexOf(w);
      F >= 0 && yt.splice(F, 1), F === Qe && oa > 0 && Qe--, F = 0, yt.forEach(function(U) {
        return U.scroller === w.scroller && (F = 1);
      }), F || Je || (w.scroll.rec = 0), n && (n.scrollTrigger = null, D && n.revert({
        kill: !1
      }), W || n.kill()), ut && [ut, Ae, I, $t].forEach(function(U) {
        return U.parentNode && U.parentNode.removeChild(U);
      }), Kr === w && (Kr = 0), u && (Lt && (Lt.uncache = 1), F = 0, yt.forEach(function(U) {
        return U.pin === u && F++;
      }), F || (Lt.spacer = 0)), i.onKill && i.onKill(w);
    }, yt.push(w), w.enable(!1, !1), v && v(w), n && n.add && !Rt) {
      var N = w.update;
      w.update = function() {
        w.update = N, bt.cache++, pt || mt || w.refresh();
      }, G.delayedCall(0.01, w.update), Rt = 0.01, pt = mt = 0;
    } else
      w.refresh();
    u && u_();
  }, s.register = function(i) {
    return ks || (G = i || Qd(), Zd() && window.document && s.enable(), ks = Ar), ks;
  }, s.defaults = function(i) {
    if (i)
      for (var n in i)
        Yo[n] = i[n];
    return Yo;
  }, s.disable = function(i, n) {
    Ar = 0, yt.forEach(function(o) {
      return o[n ? "kill" : "disable"](i);
    }), Pe(vt, "wheel", Cs), Pe(Ht, "scroll", Cs), clearInterval(No), Pe(Ht, "touchcancel", Ki), Pe(Dt, "touchstart", Ki), Vo(Pe, Ht, "pointerdown,touchstart,mousedown", wh), Vo(Pe, Ht, "pointerup,touchend,mouseup", xh), ba.kill(), Bo(Pe);
    for (var r = 0; r < bt.length; r += 3)
      Ho(Pe, bt[r], bt[r + 1]), Ho(Pe, bt[r], bt[r + 2]);
  }, s.enable = function() {
    if (vt = window, Ht = document, di = Ht.documentElement, Dt = Ht.body, G && (uo = G.utils.toArray, Hr = G.utils.clamp, Zl = G.core.context || Ki, cl = G.core.suppressOverwrites || Ki, Ju = vt.history.scrollRestoration || "auto", tu = vt.pageYOffset || 0, G.core.globals("ScrollTrigger", s), Dt)) {
      Ar = 1, Ks = document.createElement("div"), Ks.style.height = "100vh", Ks.style.position = "absolute", ap(), i_(), le.register(G), s.isTouch = le.isTouch, Sn = le.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), jl = le.isTouch === 1, Oe(vt, "wheel", Cs), Qu = [vt, Ht, di, Dt], G.matchMedia ? (s.matchMedia = function(c) {
        var h = G.matchMedia(), f;
        for (f in c)
          h.add(f, c[f]);
        return h;
      }, G.addEventListener("matchMediaInit", function() {
        return rc();
      }), G.addEventListener("matchMediaRevert", function() {
        return rp();
      }), G.addEventListener("matchMedia", function() {
        Qn(0, 1), gs("matchMedia");
      }), G.matchMedia().add("(orientation: portrait)", function() {
        return pl(), pl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), pl(), Oe(Ht, "scroll", Cs);
      var i = Dt.hasAttribute("style"), n = Dt.style, r = n.borderTopStyle, o = G.core.Animation.prototype, a, l;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = fn(Dt), Ee.m = Math.round(a.top + Ee.sc()) || 0, ei.m = Math.round(a.left + ei.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), i || (Dt.setAttribute("style", ""), Dt.removeAttribute("style")), No = setInterval(Eh, 250), G.delayedCall(0.5, function() {
        return $o = 0;
      }), Oe(Ht, "touchcancel", Ki), Oe(Dt, "touchstart", Ki), Vo(Oe, Ht, "pointerdown,touchstart,mousedown", wh), Vo(Oe, Ht, "pointerup,touchend,mouseup", xh), Gl = G.utils.checkPrefix("transform"), aa.push(Gl), ks = Be(), ba = G.delayedCall(0.2, Qn).pause(), Ms = [Ht, "visibilitychange", function() {
        var c = vt.innerWidth, h = vt.innerHeight;
        Ht.hidden ? (_h = c, yh = h) : (_h !== c || yh !== h) && Or();
      }, Ht, "DOMContentLoaded", Qn, vt, "load", Qn, vt, "resize", Or], Bo(Oe), yt.forEach(function(c) {
        return c.enable(0, 1);
      }), l = 0; l < bt.length; l += 3)
        Ho(Pe, bt[l], bt[l + 1]), Ho(Pe, bt[l], bt[l + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (hl = !!i.limitCallbacks);
    var n = i.syncInterval;
    n && clearInterval(No) || (No = n) && setInterval(Eh, n), "ignoreMobileResize" in i && (jl = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Bo(Pe) || Bo(Oe, i.autoRefreshEvents || "none"), Xd = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, n) {
    var r = si(i), o = bt.indexOf(r), a = ps(r);
    ~o && bt.splice(o, a ? 6 : 2), n && (a ? tn.unshift(vt, n, Dt, n, di, n) : tn.unshift(r, n));
  }, s.clearMatchMedia = function(i) {
    yt.forEach(function(n) {
      return n._ctx && n._ctx.query === i && n._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, n, r) {
    var o = (hi(i) ? si(i) : i).getBoundingClientRect(), a = o[r ? as : ls] * n || 0;
    return r ? o.right - a > 0 && o.left + a < vt.innerWidth : o.bottom - a > 0 && o.top + a < vt.innerHeight;
  }, s.positionInViewport = function(i, n, r) {
    hi(i) && (i = si(i));
    var o = i.getBoundingClientRect(), a = o[r ? as : ls], l = n == null ? a / 2 : n in Ta ? Ta[n] * a : ~n.indexOf("%") ? parseFloat(n) * a / 100 : parseFloat(n) || 0;
    return r ? (o.left + l) / vt.innerWidth : (o.top + l) / vt.innerHeight;
  }, s.killAll = function(i) {
    if (yt.slice(0).forEach(function(r) {
      return r.vars.id !== "ScrollSmoother" && r.kill();
    }), i !== !0) {
      var n = ms.killAll || [];
      ms = {}, n.forEach(function(r) {
        return r();
      });
    }
  }, s;
}();
wt.version = "3.13.0";
wt.saveStyles = function(s) {
  return s ? uo(s).forEach(function(t) {
    if (t && t.style) {
      var e = ci.indexOf(t);
      e >= 0 && ci.splice(e, 5), ci.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), G.core.getCache(t), Zl());
    }
  }) : ci;
};
wt.revert = function(s, t) {
  return rc(!s, t);
};
wt.create = function(s, t) {
  return new wt(s, t);
};
wt.refresh = function(s) {
  return s ? Or(!0) : (ks || wt.register()) && Qn(!0);
};
wt.update = function(s) {
  return ++bt.cache && _n(s === !0 ? 2 : 0);
};
wt.clearScrollMemory = op;
wt.maxScroll = function(s, t) {
  return Qi(s, t ? ei : Ee);
};
wt.getScrollFunc = function(s, t) {
  return Bn(si(s), t ? ei : Ee);
};
wt.getById = function(s) {
  return Jl[s];
};
wt.getAll = function() {
  return yt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
wt.isScrolling = function() {
  return !!Ii;
};
wt.snapDirectional = sc;
wt.addEventListener = function(s, t) {
  var e = ms[s] || (ms[s] = []);
  ~e.indexOf(t) || e.push(t);
};
wt.removeEventListener = function(s, t) {
  var e = ms[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
wt.batch = function(s, t) {
  var e = [], i = {}, n = t.interval || 0.016, r = t.batchMax || 1e9, o = function(c, h) {
    var f = [], d = [], u = G.delayedCall(n, function() {
      h(f, d), f = [], d = [];
    }).pause();
    return function(m) {
      f.length || u.restart(!0), f.push(m.trigger), d.push(m), r <= f.length && u.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Ye(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return Ye(r) && (r = r(), Oe(wt, "refresh", function() {
    return r = t.batchMax();
  })), uo(s).forEach(function(l) {
    var c = {};
    for (a in i)
      c[a] = i[a];
    c.trigger = l, e.push(wt.create(c));
  }), e;
};
var Mh = function(t, e, i, n) {
  return e > n ? t(n) : e < 0 && t(0), i > n ? (n - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, gl = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (le.isTouch ? " pinch-zoom" : "") : "none", t === di && s(Dt, e);
}, Ko = {
  auto: 1,
  scroll: 1
}, p_ = function(t) {
  var e = t.event, i = t.target, n = t.axis, r = (e.changedTouches ? e.changedTouches[0] : e).target, o = r._gsap || G.core.getCache(r), a = Be(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; r && r !== Dt && (r.scrollHeight <= r.clientHeight && r.scrollWidth <= r.clientWidth || !(Ko[(l = Pi(r)).overflowY] || Ko[l.overflowX])); )
      r = r.parentNode;
    o._isScroll = r && r !== i && !ps(r) && (Ko[(l = Pi(r)).overflowY] || Ko[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || n === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, up = function(t, e, i, n) {
  return le.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: n = n && p_,
    onPress: n,
    onDrag: n,
    onScroll: n,
    onEnable: function() {
      return i && Oe(Ht, le.eventTypes[0], Dh, !1, !0);
    },
    onDisable: function() {
      return Pe(Ht, le.eventTypes[0], Dh, !0);
    }
  });
}, m_ = /(input|label|select|textarea)/i, Ih, Dh = function(t) {
  var e = m_.test(t.target.tagName);
  (e || Ih) && (t._gsapAllow = !0, Ih = e);
}, g_ = function(t) {
  Gn(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, n = e.momentum, r = e.allowNestedScroll, o = e.onRelease, a, l, c = si(t.target) || di, h = G.core.globals().ScrollSmoother, f = h && h.get(), d = Sn && (t.content && si(t.content) || f && t.content !== !1 && !f.smooth() && f.content()), u = Bn(c, Ee), m = Bn(c, ei), p = 1, _ = (le.isTouch && vt.visualViewport ? vt.visualViewport.scale * vt.visualViewport.width : vt.outerWidth) / vt.innerWidth, b = 0, A = Ye(n) ? function() {
    return n(a);
  } : function() {
    return n || 2.8;
  }, C, T, y = up(c, t.type, !0, r), O = function() {
    return T = !1;
  }, P = Ki, S = Ki, k = function() {
    l = Qi(c, Ee), S = Hr(Sn ? 1 : 0, l), i && (P = Hr(0, Qi(c, ei))), C = us;
  }, R = function() {
    d._gsap.y = Cr(parseFloat(d._gsap.y) + u.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, H = function() {
    if (T) {
      requestAnimationFrame(O);
      var tt = Cr(a.deltaY / 2), ot = S(u.v - tt);
      if (d && ot !== u.v + u.offset) {
        u.offset = ot - u.v;
        var w = Cr((parseFloat(d && d._gsap.y) || 0) - u.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + w + ", 0, 1)", d._gsap.y = w + "px", u.cacheID = bt.cache, _n();
      }
      return !0;
    }
    u.offset && R(), T = !0;
  }, z, B, J, it, q = function() {
    k(), z.isActive() && z.vars.scrollY > l && (u() > l ? z.progress(1) && u(l) : z.resetTo("scrollY", l));
  };
  return d && G.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(Y) {
    return Sn && Y.type === "touchmove" && H() || p > 1.05 && Y.type !== "touchstart" || a.isGesturing || Y.touches && Y.touches.length > 1;
  }, t.onPress = function() {
    T = !1;
    var Y = p;
    p = Cr((vt.visualViewport && vt.visualViewport.scale || 1) / _), z.pause(), Y !== p && gl(c, p > 1.01 ? !0 : i ? !1 : "x"), B = m(), J = u(), k(), C = us;
  }, t.onRelease = t.onGestureStart = function(Y, tt) {
    if (u.offset && R(), !tt)
      it.restart(!0);
    else {
      bt.cache++;
      var ot = A(), w, j;
      i && (w = m(), j = w + ot * 0.05 * -Y.velocityX / 0.227, ot *= Mh(m, w, j, Qi(c, ei)), z.vars.scrollX = P(j)), w = u(), j = w + ot * 0.05 * -Y.velocityY / 0.227, ot *= Mh(u, w, j, Qi(c, Ee)), z.vars.scrollY = S(j), z.invalidate().duration(ot).play(0.01), (Sn && z.vars.scrollY >= l || w >= l - 1) && G.to({}, {
        onUpdate: q,
        duration: ot
      });
    }
    o && o(Y);
  }, t.onWheel = function() {
    z._ts && z.pause(), Be() - b > 1e3 && (C = 0, b = Be());
  }, t.onChange = function(Y, tt, ot, w, j) {
    if (us !== C && k(), tt && i && m(P(w[2] === tt ? B + (Y.startX - Y.x) : m() + tt - w[1])), ot) {
      u.offset && R();
      var nt = j[2] === ot, K = nt ? J + Y.startY - Y.y : u() + ot - j[1], rt = S(K);
      nt && K !== rt && (J += rt - K), u(rt);
    }
    (ot || tt) && _n();
  }, t.onEnable = function() {
    gl(c, i ? !1 : "x"), wt.addEventListener("refresh", q), Oe(vt, "resize", q), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = m.smooth = !1), y.enable();
  }, t.onDisable = function() {
    gl(c, !0), Pe(vt, "resize", q), wt.removeEventListener("refresh", q), y.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new le(t), a.iOS = Sn, Sn && !u() && u(1), Sn && G.ticker.add(Ki), it = a._dc, z = G.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: lp(u, u(), function() {
        return z.pause();
      })
    },
    onUpdate: _n,
    onComplete: it.vars.onComplete
  }), a;
};
wt.sort = function(s) {
  if (Ye(s))
    return yt.sort(s);
  var t = vt.pageYOffset || 0;
  return wt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + vt.innerHeight;
  }), yt.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
wt.observe = function(s) {
  return new le(s);
};
wt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return Ze;
  if (s === !0 && Ze)
    return Ze.enable();
  if (s === !1) {
    Ze && Ze.kill(), Ze = s;
    return;
  }
  var t = s instanceof le ? s : g_(s);
  return Ze && Ze.target === t.target && Ze.kill(), ps(t.target) && (Ze = t), t;
};
wt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Kl,
  _inputObserver: up,
  _scrollers: bt,
  _proxies: tn,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Ii || gs("scrollStart"), Ii = Be();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return $e;
    }
  }
};
Qd() && G.registerPlugin(wt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Xi, iu, Xr, cp, Is, zs, nu, hp, fp = function() {
  return Xi || typeof window < "u" && (Xi = window.gsap);
}, su = {}, __ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, ru = function(t) {
  return hp(t).id;
}, kr = function(t) {
  return su[ru(typeof t == "string" ? Xr(t)[0] : t)];
}, Lh = function(t) {
  var e = Is, i;
  if (t - nu >= 0.05)
    for (nu = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, y_ = {
  deg: 360,
  rad: Math.PI * 2
}, _l = function() {
  Xi = fp(), Xi && (Xr = Xi.utils.toArray, cp = Xi.utils.getUnit, hp = Xi.core.getCache, zs = Xi.ticker, iu = 1);
}, v_ = function(t, e, i, n) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = y_[i || cp(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = zs.time, n && (this._next = n, n._prev = this);
}, To = /* @__PURE__ */ function() {
  function s(e, i) {
    iu || _l(), this.target = Xr(e)[0], su[ru(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    Xi = i, _l();
  };
  var t = s.prototype;
  return t.get = function(i, n) {
    var r = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, l;
    return o = parseFloat(n ? r.v1 : r.g(r.t, r.p)), a = o - parseFloat(r.v2), l = r.rCap, l && (a = a % l, a !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), __(a / ((n ? r.t1 : zs.time) - r.t2));
  }, t.getAll = function() {
    var i = {}, n = this._props, r;
    for (r in n)
      i[r] = this.get(r);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, n) {
    i in this._props || (Is || (zs.add(Lh), nu = zs.time), Is = this._props[i] = new v_(this.target, i, n, Is));
  }, t.remove = function(i) {
    var n = this._props[i], r, o;
    n && (r = n._prev, o = n._next, r && (r._next = o), o ? o._prev = r : Is === n && (zs.remove(Lh), Is = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var n in this._props)
      this.remove(n);
    i || delete su[ru(this.target)];
  }, s.track = function(i, n, r) {
    iu || _l();
    for (var o = [], a = Xr(i), l = n.split(","), c = (r || "").split(","), h = a.length, f, d; h--; ) {
      for (f = kr(a[h]) || new s(a[h]), d = l.length; d--; )
        f.add(l[d], c[d] || c[0]);
      o.push(f);
    }
    return o;
  }, s.untrack = function(i, n) {
    var r = (n || "").split(",");
    Xr(i).forEach(function(o) {
      var a = kr(o);
      a && (r.length ? r.forEach(function(l) {
        return a.remove(l);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, n) {
    var r = kr(i);
    return r && r.isTracking(n);
  }, s.getVelocity = function(i, n) {
    var r = kr(i);
    return !r || !r.isTracking(n) ? console.warn("Not tracking velocity of " + n) : r.get(n);
  }, s;
}();
To.getByTarget = kr;
fp() && Xi.registerPlugin(To);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Se, dp, Rh, pp, ou, Gr, mp, gp, _p, oc, yp, jr, au, vp, Sa = To.getByTarget, bp = function() {
  return Se || typeof window < "u" && (Se = window.gsap) && Se.registerPlugin && Se;
}, b_ = function(t) {
  return typeof t == "string";
}, ho = function(t) {
  return typeof t == "number";
}, Fn = function(t) {
  return typeof t == "object";
}, lu = function(t) {
  return typeof t == "function";
}, w_ = 1, wp = Array.isArray, x_ = function(t) {
  return t;
}, Gs = 1e10, zh = 1 / Gs, xp = 0.05, T_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, S_ = function(t, e, i) {
  for (var n in e)
    !(n in t) && n !== i && (t[n] = e[n]);
  return t;
}, E_ = function s(t) {
  var e = {}, i, n;
  for (i in t)
    e[i] = Fn(n = t[i]) && !wp(n) ? s(n) : n;
  return e;
}, Fh = function(t, e, i, n, r) {
  var o = e.length, a = 0, l = Gs, c, h, f, d;
  if (Fn(t)) {
    for (; o--; ) {
      c = e[o], h = 0;
      for (f in t)
        d = c[f] - t[f], h += d * d;
      h < l && (a = o, l = h);
    }
    if ((r || Gs) < Gs && r < Math.sqrt(l))
      return t;
  } else
    for (; o--; )
      c = e[o], h = c - t, h < 0 && (h = -h), h < l && c >= n && c <= i && (a = o, l = h);
  return e[a];
}, Tp = function(t, e, i, n, r, o, a) {
  if (t.end === "auto")
    return t;
  var l = t.end, c, h;
  if (i = isNaN(i) ? Gs : i, n = isNaN(n) ? -1e10 : n, Fn(e)) {
    if (c = e.calculated ? e : (lu(l) ? l(e, a) : Fh(e, l, i, n, o)) || e, !e.calculated) {
      for (h in c)
        e[h] = c[h];
      e.calculated = !0;
    }
    c = c[r];
  } else
    c = lu(l) ? l(e, a) : wp(l) ? Fh(e, l, i, n, o) : parseFloat(l);
  return c > i ? c = i : c < n && (c = n), {
    max: c,
    min: c,
    unitFactor: t.unitFactor
  };
}, Ea = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, ac = function(t, e) {
  return e * xp * t / oc;
}, Nh = function(t, e, i) {
  return Math.abs((e - t) * oc / i / xp);
}, Sp = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Ep = function(t, e, i, n) {
  if (e.linkedProps) {
    var r = e.linkedProps.split(","), o = {}, a, l, c, h, f, d;
    for (a = 0; a < r.length; a++)
      l = r[a], c = e[l], c && (ho(c.velocity) ? h = c.velocity : (f = f || Sa(t), h = f && f.isTracking(l) ? f.get(l) : 0), d = Math.abs(h / Ea(c, "resistance", n)), o[l] = parseFloat(i(t, l)) + ac(h, d));
    return o;
  }
}, A_ = function(t, e, i, n, r, o) {
  if (i === void 0 && (i = 10), n === void 0 && (n = 0.2), r === void 0 && (r = 1), b_(t) && (t = pp(t)[0]), !t)
    return 0;
  var a = 0, l = Gs, c = e.inertia || e, h = _p(t).get, f = Ea(c, "resistance", Gr.resistance), d, u, m, p, _, b, A, C, T, y;
  y = Ep(t, c, h, f);
  for (d in c)
    Sp[d] || (u = c[d], Fn(u) || (C = C || Sa(t), C && C.isTracking(d) ? u = ho(u) ? {
      velocity: u
    } : {
      velocity: C.get(d)
    } : (p = +u || 0, m = Math.abs(p / f))), Fn(u) && (ho(u.velocity) ? p = u.velocity : (C = C || Sa(t), p = C && C.isTracking(d) ? C.get(d) : 0), m = yp(n, i, Math.abs(p / Ea(u, "resistance", f))), _ = parseFloat(h(t, d)) || 0, b = _ + ac(p, m), "end" in u && (u = Tp(u, y && d in y ? y : b, u.max, u.min, d, c.radius, p), jr === e && (jr = c = E_(e)), c[d] = S_(u, c[d], "end")), "max" in u && b > +u.max + zh ? (T = u.unitFactor || Gr.unitFactors[d] || 1, A = _ > u.max && u.min !== u.max || p * T > -15 && p * T < 45 ? n + (i - n) * 0.1 : Nh(_, u.max, p), A + r < l && (l = A + r)) : "min" in u && b < +u.min - zh && (T = u.unitFactor || Gr.unitFactors[d] || 1, A = _ < u.min && u.min !== u.max || p * T > -45 && p * T < 15 ? n + (i - n) * 0.1 : Nh(_, u.min, p), A + r < l && (l = A + r)), A > a && (a = A)), m > a && (a = m));
  return a > l && (a = l), a > i ? i : a < n ? n : a;
}, $h = function() {
  Se = bp(), Se && (Rh = Se.parseEase, pp = Se.utils.toArray, mp = Se.utils.getUnit, _p = Se.core.getCache, yp = Se.utils.clamp, au = Se.core.getStyleSaver, vp = Se.core.reverting || function() {
  }, ou = Rh("power3"), oc = ou(0.05), gp = Se.core.PropTween, Se.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), Gr = Se.config(), Se.registerPlugin(To), dp = 1);
}, Ap = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Se = t, $h();
  },
  init: function(t, e, i, n, r) {
    dp || $h();
    var o = Sa(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = au && typeof t.style == "object" && au(t), this.target = t, this.tween = i, jr = e;
    var a = t._gsap, l = a.get, c = e.duration, h = Fn(c), f = e.preventOvershoot || h && c.overshoot === 0, d = Ea(e, "resistance", Gr.resistance), u = ho(c) ? c : A_(t, e, h && c.max || 10, h && c.min || 0.2, h && "overshoot" in c ? +c.overshoot : f ? 0 : 1), m, p, _, b, A, C, T, y, O;
    e = jr, jr = 0, O = Ep(t, e, l, d);
    for (m in e)
      Sp[m] || (p = e[m], lu(p) && (p = p(n, t, r)), ho(p) ? A = p : Fn(p) && !isNaN(p.velocity) ? A = +p.velocity : o && o.isTracking(m) ? A = o.get(m) : console.warn("ERROR: No velocity was defined for " + t + " property: " + m), C = ac(A, u), y = 0, _ = l(t, m), b = mp(_), _ = parseFloat(_), Fn(p) && (T = _ + C, "end" in p && (p = Tp(p, O && m in O ? O : T, p.max, p.min, m, e.radius, A)), "max" in p && +p.max < T ? f || p.preventOvershoot ? C = p.max - _ : y = p.max - _ - C : "min" in p && +p.min > T && (f || p.preventOvershoot ? C = p.min - _ : y = p.min - _ - C)), this._props.push(m), this.styles && this.styles.save(m), this._pt = new gp(this._pt, t, m, _, 0, x_, 0, a.set(t, m, this)), this._pt.u = b || 0, this._pt.c1 = C, this._pt.c2 = y);
    return i.duration(u), w_;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = ou(e.tween._time / e.tween._dur), t || !vp())
      for (; i; )
        i.set(i.t, i.p, T_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Ap[s] = To[s];
});
bp() && Se.registerPlugin(Ap);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let gr, Ps, uu, C_ = () => uu || k_.register(window.gsap), Bh = typeof Intl < "u" ? new Intl.Segmenter() : 0, Aa = (s) => typeof s == "string" ? Aa(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], Vh = (s) => Aa(s).filter((t) => t instanceof HTMLElement), cu = [], yl = function() {
}, P_ = /\s+/g, Hh = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Yh = { left: 0, top: 0, width: 0, height: 0 }, Wh = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || cu), i = s.length, n, r, o, a;
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
}, Uh = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Os = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), hu = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: n = "div", aria: r = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", l = i.indexOf("++") > -1, c = (h) => {
    let f = document.createElement(n), d = e.length + 1;
    return i && (f.className = i + (l ? " " + i + d : "")), o && f.style.setProperty("--" + s, d + ""), r !== "none" && f.setAttribute("aria-hidden", "true"), n !== "span" && (f.style.position = "relative", f.style.display = a), f.textContent = h, e.push(f), f;
  };
  return l && (i = i.replace("++", "")), c.collection = e, c;
}, O_ = (s, t, e, i) => {
  let n = hu("line", e, i), r = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let l = n("");
    for (l.style.textAlign = r, s.insertBefore(l, t[o]); o < a; o++)
      l.appendChild(t[o]);
    l.normalize();
  };
}, Cp = (s, t, e, i, n, r, o, a, l, c) => {
  var h;
  let f = Array.from(s.childNodes), d = 0, { wordDelimiter: u, reduceWhiteSpace: m = !0, prepareText: p } = t, _ = s.getBoundingClientRect(), b = _, A = !m && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, T = e.collection, y, O, P, S, k, R, H, z, B, J, it, q, Y, tt, ot, w, j, nt;
  for (typeof u == "object" ? (P = u.delimiter || u, O = u.replaceWith || "") : O = u === "" ? "" : u || " ", y = O !== " "; d < f.length; d++)
    if (S = f[d], S.nodeType === 3) {
      for (ot = S.textContent || "", m ? ot = ot.replace(P_, " ") : A && (ot = ot.replace(/\n/g, O + `
`)), p && (ot = p(ot, s)), S.textContent = ot, k = O || P ? ot.split(P || O) : ot.match(a) || cu, j = k[k.length - 1], z = y ? j.slice(-1) === " " : !j, j || k.pop(), b = _, H = y ? k[0].charAt(0) === " " : !k[0], H && Os(" ", s, S), k[0] || k.shift(), Wh(k, l), r && c || (S.textContent = ""), B = 1; B <= k.length; B++)
        if (w = k[B - 1], !m && A && w.charAt(0) === `
` && ((h = S.previousSibling) == null || h.remove(), Os(document.createElement("br"), s, S), w = w.slice(1)), !m && w === "")
          Os(O, s, S);
        else if (w === " ")
          s.insertBefore(document.createTextNode(" "), S);
        else {
          if (y && w.charAt(0) === " " && Os(" ", s, S), C && B === 1 && !H && T.indexOf(C.parentNode) > -1 ? (R = T[T.length - 1], R.appendChild(document.createTextNode(i ? "" : w))) : (R = e(i ? "" : w), Os(R, s, S), C && B === 1 && !H && R.insertBefore(C, R.firstChild)), i)
            for (it = Bh ? Wh([...Bh.segment(w)].map((K) => K.segment), l) : w.match(a) || cu, nt = 0; nt < it.length; nt++)
              R.appendChild(it[nt] === " " ? document.createTextNode(" ") : i(it[nt]));
          if (r && c) {
            if (ot = S.textContent = ot.substring(w.length + 1, ot.length), J = R.getBoundingClientRect(), J.top > b.top && J.left <= b.left) {
              for (q = s.cloneNode(), Y = s.childNodes[0]; Y && Y !== R; )
                tt = Y, Y = Y.nextSibling, q.appendChild(tt);
              s.parentNode.insertBefore(q, s), n && Uh(q);
            }
            b = J;
          }
          (B < k.length || z) && Os(B >= k.length ? " " : y && w.slice(-1) === " " ? " " + O : O, s, S);
        }
      s.removeChild(S), C = 0;
    } else S.nodeType === 1 && (o && o.indexOf(S) > -1 ? (T.indexOf(S.previousSibling) > -1 && T[T.length - 1].appendChild(S), C = S) : (Cp(S, t, e, i, n, r, o, a, l, !0), C = 0), n && Uh(S));
};
const Pp = class Op {
  constructor(t, e) {
    this.isSplit = !1, C_(), this.elements = Vh(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
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
    }) }, yl(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: n = !0, smartWrap: r, onSplit: o, autoSplit: a = !1, specialChars: l, mask: c } = this.vars, h = e.indexOf("lines") > -1, f = e.indexOf("chars") > -1, d = e.indexOf("words") > -1, u = f && !d && !h, m = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l), p = m ? new RegExp(m.source + "|" + Hh.source, "gu") : Hh, _ = !!t.ignore && Vh(t.ignore), { orig: b, animTime: A, obs: C } = this._data, T;
    return (f || d || h) && (this.elements.forEach((y, O) => {
      b[O] = {
        element: y,
        html: y.innerHTML,
        ariaL: y.getAttribute("aria-label"),
        ariaH: y.getAttribute("aria-hidden")
      }, i === "auto" ? y.setAttribute("aria-label", (y.textContent || "").trim()) : i === "hidden" && y.setAttribute("aria-hidden", "true");
      let P = [], S = [], k = [], R = f ? hu("char", t, P) : null, H = hu("word", t, S), z, B, J, it;
      if (Cp(y, t, H, R, u, n && (h || u), _, p, m, !1), h) {
        let q = Aa(y.childNodes), Y = O_(y, q, t, k), tt, ot = [], w = 0, j = q.map((K) => K.nodeType === 1 ? K.getBoundingClientRect() : Yh), nt = Yh;
        for (z = 0; z < q.length; z++)
          tt = q[z], tt.nodeType === 1 && (tt.nodeName === "BR" ? (ot.push(tt), Y(w, z + 1), w = z + 1, nt = j[w]) : (z && j[z].top > nt.top && j[z].left <= nt.left && (Y(w, z), w = z), nt = j[z]));
        w < z && Y(w, z), ot.forEach((K) => {
          var rt;
          return (rt = K.parentNode) == null ? void 0 : rt.removeChild(K);
        });
      }
      if (!d) {
        for (z = 0; z < S.length; z++)
          if (B = S[z], f || !B.nextSibling || B.nextSibling.nodeType !== 3)
            if (r && !h) {
              for (J = document.createElement("span"), J.style.whiteSpace = "nowrap"; B.firstChild; )
                J.appendChild(B.firstChild);
              B.replaceWith(J);
            } else
              B.replaceWith(...B.childNodes);
          else
            it = B.nextSibling, it && it.nodeType === 3 && (it.textContent = (B.textContent || "") + (it.textContent || ""), B.remove());
        S.length = 0, y.normalize();
      }
      this.lines.push(...k), this.words.push(...S), this.chars.push(...P);
    }), c && this[c] && this.masks.push(...this[c].map((y) => {
      let O = y.cloneNode();
      return y.replaceWith(O), O.appendChild(y), y.className && (O.className = y.className.replace(/(\b\w+\b)/g, "$1-mask")), O.style.overflow = "clip", O;
    }))), this.isSplit = !0, Ps && (a ? Ps.addEventListener("loadingdone", this._split) : Ps.status === "loading" && console.warn("SplitText called before fonts loaded")), (T = o && o(this)) && T.totalTime && (this._data.anim = A ? T.totalTime(A) : T), h && a && this.elements.forEach((y, O) => {
      b[O].width = y.offsetWidth, C && C.observe(y);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: n, obs: r } = this._data;
    return r && r.disconnect(), i.forEach(({ element: o, html: a, ariaL: l, ariaH: c }) => {
      o.innerHTML = a, l ? o.setAttribute("aria-label", l) : o.removeAttribute("aria-label"), c ? o.setAttribute("aria-hidden", c) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, Ps == null || Ps.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Op(t, e);
  }
  static register(t) {
    gr = gr || t || window.gsap, gr && (Aa = gr.utils.toArray, yl = gr.core.context || yl), !uu && window.innerWidth > 0 && (Ps = document.fonts, uu = !0);
  }
};
Pp.version = "3.13.0";
let k_ = Pp;
var V = Yt.registerPlugin(xo) || Yt;
V.core.Tween;
var Xo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function M_(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Mr = { exports: {} };
Mr.exports;
var qh;
function I_() {
  return qh || (qh = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", d = "[object Error]", u = "[object Function]", m = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", b = "[object Null]", A = "[object Object]", C = "[object Proxy]", T = "[object RegExp]", y = "[object Set]", O = "[object String]", P = "[object Undefined]", S = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", H = "[object Float32Array]", z = "[object Float64Array]", B = "[object Int8Array]", J = "[object Int16Array]", it = "[object Int32Array]", q = "[object Uint8Array]", Y = "[object Uint8ClampedArray]", tt = "[object Uint16Array]", ot = "[object Uint32Array]", w = /[\\^$.*+?()[\]{}|]/g, j = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, K = {};
    K[H] = K[z] = K[B] = K[J] = K[it] = K[q] = K[Y] = K[tt] = K[ot] = !0, K[a] = K[l] = K[k] = K[h] = K[R] = K[f] = K[d] = K[u] = K[p] = K[_] = K[A] = K[T] = K[y] = K[O] = K[S] = !1;
    var rt = typeof Xo == "object" && Xo && Xo.Object === Object && Xo, It = typeof self == "object" && self && self.Object === Object && self, gt = rt || It || Function("return this")(), At = t && !t.nodeType && t, lt = At && !0 && s && !s.nodeType && s, Lt = lt && lt.exports === At, ne = Lt && rt.process, Nt = function() {
      try {
        var g = lt && lt.require && lt.require("util").types;
        return g || ne && ne.binding && ne.binding("util");
      } catch {
      }
    }(), Ut = Nt && Nt.isTypedArray;
    function pt(g, x, L) {
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
    function mt(g, x) {
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
    var $t = Array.prototype, qe = Function.prototype, Me = Object.prototype, Rt = gt["__core-js_shared__"], Ft = qe.toString, ue = Me.hasOwnProperty, Ke = function() {
      var g = /[^.]+$/.exec(Rt && Rt.keys && Rt.keys.IE_PROTO || "");
      return g ? "Symbol(src)_1." + g : "";
    }(), Kt = Me.toString, se = Ft.call(Object), Pt = RegExp(
      "^" + Ft.call(ue).replace(w, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), ce = Lt ? gt.Buffer : void 0, Ie = gt.Symbol, ze = gt.Uint8Array;
    ce && ce.allocUnsafe;
    var Wi = I(Object.getPrototypeOf, Object), qt = Object.create, Ui = Me.propertyIsEnumerable, ni = $t.splice, ye = Ie ? Ie.toStringTag : void 0, De = function() {
      try {
        var g = Va(Object, "defineProperty");
        return g({}, "", {}), g;
      } catch {
      }
    }(), wi = ce ? ce.isBuffer : void 0, Fe = Math.max, at = Date.now, Ne = Va(gt, "Map"), zt = Va(Object, "create"), Ce = /* @__PURE__ */ function() {
      function g() {
      }
      return function(x) {
        if (!an(x))
          return {};
        if (qt)
          return qt(x);
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
    function xi() {
      this.__data__ = zt ? zt(null) : {}, this.size = 0;
    }
    function Z(g) {
      var x = this.has(g) && delete this.__data__[g];
      return this.size -= x ? 1 : 0, x;
    }
    function v(g) {
      var x = this.__data__;
      if (zt) {
        var L = x[g];
        return L === i ? void 0 : L;
      }
      return ue.call(x, g) ? x[g] : void 0;
    }
    function $(g) {
      var x = this.__data__;
      return zt ? x[g] !== void 0 : ue.call(x, g);
    }
    function E(g, x) {
      var L = this.__data__;
      return this.size += this.has(g) ? 0 : 1, L[g] = zt && x === void 0 ? i : x, this;
    }
    ee.prototype.clear = xi, ee.prototype.delete = Z, ee.prototype.get = v, ee.prototype.has = $, ee.prototype.set = E;
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
      var x = this.__data__, L = rn(x, g);
      if (L < 0)
        return !1;
      var Q = x.length - 1;
      return L == Q ? x.pop() : ni.call(x, L, 1), --this.size, !0;
    }
    function W(g) {
      var x = this.__data__, L = rn(x, g);
      return L < 0 ? void 0 : x[L][1];
    }
    function F(g) {
      return rn(this.__data__, g) > -1;
    }
    function U(g, x) {
      var L = this.__data__, Q = rn(L, g);
      return Q < 0 ? (++this.size, L.push([g, x])) : L[Q][1] = x, this;
    }
    M.prototype.clear = N, M.prototype.delete = D, M.prototype.get = W, M.prototype.has = F, M.prototype.set = U;
    function et(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Q = g[x];
        this.set(Q[0], Q[1]);
      }
    }
    function X() {
      this.size = 0, this.__data__ = {
        hash: new ee(),
        map: new (Ne || M)(),
        string: new ee()
      };
    }
    function ft(g) {
      var x = ko(this, g).delete(g);
      return this.size -= x ? 1 : 0, x;
    }
    function xt(g) {
      return ko(this, g).get(g);
    }
    function Ct(g) {
      return ko(this, g).has(g);
    }
    function _t(g, x) {
      var L = ko(this, g), Q = L.size;
      return L.set(g, x), this.size += L.size == Q ? 0 : 1, this;
    }
    et.prototype.clear = X, et.prototype.delete = ft, et.prototype.get = xt, et.prototype.has = Ct, et.prototype.set = _t;
    function dt(g) {
      var x = this.__data__ = new M(g);
      this.size = x.size;
    }
    function Ot() {
      this.__data__ = new M(), this.size = 0;
    }
    function ct(g) {
      var x = this.__data__, L = x.delete(g);
      return this.size = x.size, L;
    }
    function ve(g) {
      return this.__data__.get(g);
    }
    function Xt(g) {
      return this.__data__.has(g);
    }
    function be(g, x) {
      var L = this.__data__;
      if (L instanceof M) {
        var Q = L.__data__;
        if (!Ne || Q.length < e - 1)
          return Q.push([g, x]), this.size = ++L.size, this;
        L = this.__data__ = new et(Q);
      }
      return L.set(g, x), this.size = L.size, this;
    }
    dt.prototype.clear = Ot, dt.prototype.delete = ct, dt.prototype.get = ve, dt.prototype.has = Xt, dt.prototype.set = be;
    function we(g, x) {
      var L = Wa(g), Q = !L && Ya(g), Tt = !L && !Q && Lc(g), kt = !L && !Q && !Tt && zc(g), Gt = L || Q || Tt || kt, Mt = Gt ? mt(g.length, String) : [], jt = Mt.length;
      for (var Ri in g)
        Gt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ri == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Tt && (Ri == "offset" || Ri == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        kt && (Ri == "buffer" || Ri == "byteLength" || Ri == "byteOffset") || // Skip index properties.
        Ic(Ri, jt)) || Mt.push(Ri);
      return Mt;
    }
    function he(g, x, L) {
      (L !== void 0 && !Mo(g[x], L) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function sn(g, x, L) {
      var Q = g[x];
      (!(ue.call(g, x) && Mo(Q, L)) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function rn(g, x) {
      for (var L = g.length; L--; )
        if (Mo(g[L][0], x))
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
    var re = Zm();
    function Xe(g) {
      return g == null ? g === void 0 ? P : b : ye && ye in Object(g) ? Qm(g) : sg(g);
    }
    function bs(g) {
      return cr(g) && Xe(g) == a;
    }
    function Oo(g) {
      if (!an(g) || ig(g))
        return !1;
      var x = qa(g) ? Pt : j;
      return x.test(lg(g));
    }
    function Yn(g) {
      return cr(g) && Rc(g.length) && !!K[Xe(g)];
    }
    function Ti(g) {
      if (!an(g))
        return ng(g);
      var x = Dc(g), L = [];
      for (var Q in g)
        Q == "constructor" && (x || !ue.call(g, Q)) || L.push(Q);
      return L;
    }
    function on(g, x, L, Q, Tt) {
      g !== x && re(x, function(kt, Gt) {
        if (Tt || (Tt = new dt()), an(kt))
          ws(g, x, Gt, L, on, Q, Tt);
        else {
          var Mt = Q ? Q(Ha(g, Gt), kt, Gt + "", g, x, Tt) : void 0;
          Mt === void 0 && (Mt = kt), he(g, Gt, Mt);
        }
      }, Fc);
    }
    function ws(g, x, L, Q, Tt, kt, Gt) {
      var Mt = Ha(g, L), jt = Ha(x, L), Ri = Gt.get(jt);
      if (Ri) {
        he(g, L, Ri);
        return;
      }
      var ui = kt ? kt(Mt, jt, L + "", g, x, Gt) : void 0, hr = ui === void 0;
      if (hr) {
        var Ka = Wa(jt), Xa = !Ka && Lc(jt), $c = !Ka && !Xa && zc(jt);
        ui = jt, Ka || Xa || $c ? Wa(Mt) ? ui = Mt : ug(Mt) ? ui = Xm(Mt) : Xa ? (hr = !1, ui = Um(jt)) : $c ? (hr = !1, ui = Km(jt)) : ui = [] : cg(jt) || Ya(jt) ? (ui = Mt, Ya(Mt) ? ui = hg(Mt) : (!an(Mt) || qa(Mt)) && (ui = Jm(jt))) : hr = !1;
      }
      hr && (Gt.set(jt, ui), Tt(ui, jt, Q, kt, Gt), Gt.delete(jt)), he(g, L, ui);
    }
    function Li(g, x) {
      return og(rg(g, x, Nc), g + "");
    }
    var Wm = De ? function(g, x) {
      return De(g, "toString", {
        configurable: !0,
        enumerable: !1,
        value: pg(x),
        writable: !0
      });
    } : Nc;
    function Um(g, x) {
      return g.slice();
    }
    function qm(g) {
      var x = new g.constructor(g.byteLength);
      return new ze(x).set(new ze(g)), x;
    }
    function Km(g, x) {
      var L = qm(g.buffer);
      return new g.constructor(L, g.byteOffset, g.length);
    }
    function Xm(g, x) {
      var L = -1, Q = g.length;
      for (x || (x = Array(Q)); ++L < Q; )
        x[L] = g[L];
      return x;
    }
    function Gm(g, x, L, Q) {
      var Tt = !L;
      L || (L = {});
      for (var kt = -1, Gt = x.length; ++kt < Gt; ) {
        var Mt = x[kt], jt = void 0;
        jt === void 0 && (jt = g[Mt]), Tt ? fe(L, Mt, jt) : sn(L, Mt, jt);
      }
      return L;
    }
    function jm(g) {
      return Li(function(x, L) {
        var Q = -1, Tt = L.length, kt = Tt > 1 ? L[Tt - 1] : void 0, Gt = Tt > 2 ? L[2] : void 0;
        for (kt = g.length > 3 && typeof kt == "function" ? (Tt--, kt) : void 0, Gt && tg(L[0], L[1], Gt) && (kt = Tt < 3 ? void 0 : kt, Tt = 1), x = Object(x); ++Q < Tt; ) {
          var Mt = L[Q];
          Mt && g(x, Mt, Q, kt);
        }
        return x;
      });
    }
    function Zm(g) {
      return function(x, L, Q) {
        for (var Tt = -1, kt = Object(x), Gt = Q(x), Mt = Gt.length; Mt--; ) {
          var jt = Gt[++Tt];
          if (L(kt[jt], jt, kt) === !1)
            break;
        }
        return x;
      };
    }
    function Mc(g, x, L, Q, Tt, kt) {
      return an(g) && an(x) && (kt.set(x, g), on(g, x, void 0, Mc, kt), kt.delete(x)), g;
    }
    function ko(g, x) {
      var L = g.__data__;
      return eg(x) ? L[typeof x == "string" ? "string" : "hash"] : L.map;
    }
    function Va(g, x) {
      var L = Ae(g, x);
      return Oo(L) ? L : void 0;
    }
    function Qm(g) {
      var x = ue.call(g, ye), L = g[ye];
      try {
        g[ye] = void 0;
        var Q = !0;
      } catch {
      }
      var Tt = Kt.call(g);
      return Q && (x ? g[ye] = L : delete g[ye]), Tt;
    }
    function Jm(g) {
      return typeof g.constructor == "function" && !Dc(g) ? Ce(Wi(g)) : {};
    }
    function Ic(g, x) {
      var L = typeof g;
      return x = x ?? o, !!x && (L == "number" || L != "symbol" && nt.test(g)) && g > -1 && g % 1 == 0 && g < x;
    }
    function tg(g, x, L) {
      if (!an(L))
        return !1;
      var Q = typeof x;
      return (Q == "number" ? Ua(L) && Ic(x, L.length) : Q == "string" && x in L) ? Mo(L[x], g) : !1;
    }
    function eg(g) {
      var x = typeof g;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? g !== "__proto__" : g === null;
    }
    function ig(g) {
      return !!Ke && Ke in g;
    }
    function Dc(g) {
      var x = g && g.constructor, L = typeof x == "function" && x.prototype || Me;
      return g === L;
    }
    function ng(g) {
      var x = [];
      if (g != null)
        for (var L in Object(g))
          x.push(L);
      return x;
    }
    function sg(g) {
      return Kt.call(g);
    }
    function rg(g, x, L) {
      return x = Fe(x === void 0 ? g.length - 1 : x, 0), function() {
        for (var Q = arguments, Tt = -1, kt = Fe(Q.length - x, 0), Gt = Array(kt); ++Tt < kt; )
          Gt[Tt] = Q[x + Tt];
        Tt = -1;
        for (var Mt = Array(x + 1); ++Tt < x; )
          Mt[Tt] = Q[Tt];
        return Mt[x] = L(Gt), pt(g, this, Mt);
      };
    }
    function Ha(g, x) {
      if (!(x === "constructor" && typeof g[x] == "function") && x != "__proto__")
        return g[x];
    }
    var og = ag(Wm);
    function ag(g) {
      var x = 0, L = 0;
      return function() {
        var Q = at(), Tt = r - (Q - L);
        if (L = Q, Tt > 0) {
          if (++x >= n)
            return arguments[0];
        } else
          x = 0;
        return g.apply(void 0, arguments);
      };
    }
    function lg(g) {
      if (g != null) {
        try {
          return Ft.call(g);
        } catch {
        }
        try {
          return g + "";
        } catch {
        }
      }
      return "";
    }
    function Mo(g, x) {
      return g === x || g !== g && x !== x;
    }
    var Ya = bs(/* @__PURE__ */ function() {
      return arguments;
    }()) ? bs : function(g) {
      return cr(g) && ue.call(g, "callee") && !Ui.call(g, "callee");
    }, Wa = Array.isArray;
    function Ua(g) {
      return g != null && Rc(g.length) && !qa(g);
    }
    function ug(g) {
      return cr(g) && Ua(g);
    }
    var Lc = wi || mg;
    function qa(g) {
      if (!an(g))
        return !1;
      var x = Xe(g);
      return x == u || x == m || x == c || x == C;
    }
    function Rc(g) {
      return typeof g == "number" && g > -1 && g % 1 == 0 && g <= o;
    }
    function an(g) {
      var x = typeof g;
      return g != null && (x == "object" || x == "function");
    }
    function cr(g) {
      return g != null && typeof g == "object";
    }
    function cg(g) {
      if (!cr(g) || Xe(g) != A)
        return !1;
      var x = Wi(g);
      if (x === null)
        return !0;
      var L = ue.call(x, "constructor") && x.constructor;
      return typeof L == "function" && L instanceof L && Ft.call(L) == se;
    }
    var zc = Ut ? ut(Ut) : Yn;
    function hg(g) {
      return Gm(g, Fc(g));
    }
    var fg = Li(function(g) {
      return g.push(void 0, Mc), pt(dg, void 0, g);
    });
    function Fc(g) {
      return Ua(g) ? we(g) : Ti(g);
    }
    var dg = jm(function(g, x, L, Q) {
      on(g, x, L, Q);
    });
    function pg(g) {
      return function() {
        return g;
      };
    }
    function Nc(g) {
      return g;
    }
    function mg() {
      return !1;
    }
    s.exports = fg;
  }(Mr, Mr.exports)), Mr.exports;
}
var D_ = I_();
const Wt = /* @__PURE__ */ M_(D_), L_ = 60, _r = {}, Kh = (s, t = L_) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  _r[s] = _r[s] || null;
  const r = _r[s] ? i - _r[s] : null;
  (r === null || r > n) && (_r[s] = i - r % n, s(...e));
});
function fo() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const fu = (s, t, e, i, n, r) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? fu(o, t, e - 1, i, n, r) : fu(s, o, e - 1, i, n, r);
}, R_ = (s, t, e, i, n, r) => fu(e, i, n, r, s, t), z_ = () => Math.round(
  R_("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, F_ = (s) => Math.round(window.devicePixelRatio * 100) - s, N_ = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, vl = {
  firefox: z_,
  chrome: F_,
  default: N_
}, Xh = {
  calculate: (s, t) => vl[s] ? vl[s](t) : vl.default(t)
}, lc = "APPLICATION:MOBILE_MENU:OPEN", uc = "APPLICATION:MOBILE_MENU:CLOSED", Ca = "APPLICATION_PRELUDIUM", du = "APPLICATION:INITIALIZED", po = "APPLICATION:READY", Di = "APPLICATION:REVEALED", Yi = "APPLICATION:RESIZE", Vn = "APPLICATION:SCROLL", kp = "APPLICATION:SCROLL_LOCKED", Mp = "APPLICATION:SCROLL_RELEASED", Na = "APPLICATION:FORCED_SCROLL_START", $a = "APPLICATION:FORCED_SCROLL_END", Ba = "APPLICATION:OUTLINE", Ip = "APPLICATION:VISIBILITY_CHANGE", Dp = "APPLICATION:HIDDEN", Lp = "APPLICATION:VISIBLE", Pa = "BREAKPOINT:CHANGE", cc = "IMAGE:LAZYLOADED", Rp = "IMAGE:REVEALED", zp = "SECTION:LAZYLOADED", vw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: $a,
  APPLICATION_FORCED_SCROLL_START: Na,
  APPLICATION_HIDDEN: Dp,
  APPLICATION_INITIALIZED: du,
  APPLICATION_MOBILE_MENU_CLOSED: uc,
  APPLICATION_MOBILE_MENU_OPEN: lc,
  APPLICATION_OUTLINE: Ba,
  APPLICATION_PRELUDIUM: Ca,
  APPLICATION_READY: po,
  APPLICATION_RESIZE: Yi,
  APPLICATION_REVEALED: Di,
  APPLICATION_SCROLL: Vn,
  APPLICATION_SCROLL_LOCKED: kp,
  APPLICATION_SCROLL_RELEASED: Mp,
  APPLICATION_VISIBILITY_CHANGE: Ip,
  APPLICATION_VISIBLE: Lp,
  BREAKPOINT_CHANGE: Pa,
  IMAGE_LAZYLOADED: cc,
  IMAGE_REVEALED: Rp,
  SECTION_LAZYLOADED: zp
}, Symbol.toStringTag, { value: "Module" })), $_ = {
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
class Gh {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = Wt(e, $_), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Ca, () => {
      this.initialize(!1);
    }), window.addEventListener(Di, () => {
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
              const c = new CustomEvent(Pa, {
                detail: {
                  leaveBreakpoint: l,
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
        }, n = new CustomEvent(Pa);
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
class B_ {
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
        const e = new window.CustomEvent(Ba);
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
class V_ {
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
class H_ {
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
const st = new H_();
V.registerPlugin(vs);
V.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  const t = window.location.hash;
  if (s.persisted || t) {
    const i = () => {
      console.log("== fixVisibility");
      const n = document.querySelector("#fader");
      n && V.set(n, { autoAlpha: 0, display: "none" });
      const r = document.querySelectorAll("[data-fader]");
      r.length && V.set(r, { autoAlpha: 0 }), V.set(document.body, { clearProps: "opacity" }), document.body.classList.remove("unloaded");
      const o = st.find("header[data-nav]");
      o && V.set(o, { clearProps: "opacity, transform" });
      const a = st.find("main");
      a && V.set(a, { clearProps: "opacity, transform" });
      const l = st.find("footer");
      l && V.set(l, { clearProps: "opacity, transform" });
    };
    s.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const jh = {
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
  disableWebpSafari: !0,
  faderOpts: {
    fadeIn: (s = () => {
    }) => {
      const t = document.querySelector("#fader");
      if (!t) {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), s();
        return;
      }
      V.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), V.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class bw {
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
    delete t.breakpointConfig, this.opts = Wt(t, jh), this.opts.breakpointConfig = e || jh.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new B_(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Gh(this, this.opts.breakpointConfig) : this.breakpoints = new Gh(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new V_(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = fo(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (V.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(Pa, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent(Ca, this), this.initializedEvent = new window.CustomEvent(du, this), this.readyEvent = new window.CustomEvent(po, this), this.revealedEvent = new window.CustomEvent(Di, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", Kh(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", Kh(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Ca), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(du), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(po), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), V.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Xh.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Xh.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(kp, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, V.set(document.body, { overflow: "hidden" }), V.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(Mp, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, V.set(document.body, { overflow: t }), V.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
  }
  /**
   *
   * @param {*} target
   * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
   * @param {*} time
   * @param {*} emitEvents
   */
  scrollTo(t, e = 0.8, i = !0, n = "sine.inOut") {
    let r;
    const o = new window.CustomEvent(Na);
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? r = t : r = { y: t, autoKill: !1 }, V.to(window, {
      duration: e,
      scrollTo: r,
      onComplete: () => {
        const a = new window.CustomEvent($a);
        i && (window.dispatchEvent(a), requestAnimationFrame(() => this.state.forcedScroll = !1));
      },
      ease: n
    });
  }
  hardScrollToTop() {
    window.scrollTo(0, 0);
  }
  hardScrollTo(t) {
    const e = st.find(t);
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
      const t = st.all('source[type="image/webp"]');
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Di));
  }
  _getBaseVW() {
    const t = st.getCSSVar("--font-base-px"), e = parseFloat(t, 10), i = window.innerWidth;
    return `${e / i * 100}vw`;
  }
  setDims() {
    const t = document.querySelector(":root");
    this.size.initialInnerHeight = window.innerHeight, this.size.initialOuterHeight = window.outerHeight, this.size.initialInnerWidth = window.innerWidth, this.size.initialOuterWidth = window.outerWidth, this.size.scrollHeight = document.body.scrollHeight, t.style.setProperty("--vp-initial-inner-h", `${this.size.initialInnerHeight}px`), t.style.setProperty("--vp-initial-outer-h", `${this.size.initialOuterHeight}px`), t.style.setProperty("--vp-initial-inner-w", `${this.size.initialInnerWidth}px`), t.style.setProperty("--vp-initial-outer-w", `${this.size.initialOuterWidth}px`), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = st.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
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
    this.size.container = st.getCSSVar("--container-padding");
  }
  /**
   * RAF'ed resize event
   */
  onResize(t) {
    const e = this.size.width !== window.innerWidth, i = this.size.height !== window.innerHeight, n = e || i, r = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(n, r), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
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
    }, i = new CustomEvent(Vn, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(Ip, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(Dp, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(Lp, t), window.dispatchEvent(e));
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
    V.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
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
    const t = V.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          V.set([e, i], { display: "none" });
        });
        break;
      case 1:
        V.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        V.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        const i = st.find(".dbg-grid"), n = st.all(i, "b");
        if (!i || !n)
          return;
        st.hasClass(i, "visible") ? (V.set(n, { width: "auto" }), V.to(n, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (V.set(n, { width: 0 }), i.classList.toggle("visible"), V.to(n, {
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
const Y_ = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = V.timeline();
    s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s), e.to(s.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(s.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(s.cc, { display: "none" });
  },
  onRefuse: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = V.timeline();
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
    V.timeline().fromTo(
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
class ww {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, Y_), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Di, () => {
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
const W_ = {};
class xw {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, W_), this.initialize();
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
        V.timeline().set(o, { opacity: 1 }).to(r, { duration: 0.5, opacity: 0, ease: "sine.in" }).to(n, { duration: 1, opacity: 0, ease: "sine.in" }).set(n, { display: "none" }).call(() => {
          i && i.play();
        });
      });
    });
  }
}
class U_ {
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
      f = f.replace(/:(\w+)/g, (p, _) => (d.push(_), "([^/]+)"));
      const u = new RegExp(`^${f}$`), m = e.match(u);
      if (m) {
        const p = {};
        return d.forEach((_, b) => {
          m[b + 1] && (p[_] = decodeURIComponent(m[b + 1]));
        }), p;
      }
    }
    const a = new RegExp(`^${i}$`), l = e.match(a);
    if (!l)
      return {};
    const c = {};
    return n.forEach((h, f) => {
      l[f + 1] && (c[h] = decodeURIComponent(l[f + 1]));
    }), c;
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
const q_ = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (s) => {
  }
};
class Tw {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = st.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = st.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = st.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = Wt(i, q_), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = st.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new U_(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
      e.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = st.find(this.$el, "[data-loader-more]"), !this.$moreBtn && this.id && (this.$moreBtn = st.find(`[data-loader-more-for="${this.id}"]`)), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = st.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.id && (this.$filterInput = st.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener("input", this.debounce(this.onFilterInput.bind(this)));
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
const K_ = {
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
class Sw {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Wt(e, K_), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = V.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = st.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
      const i = this.elements.trigger.getAttribute(
        "data-dropdown-target"
      );
      this.elements.menu = st.find(i);
    } else
      this.elements.menu = st.find(this.element, this.opts.selectors.menu);
    this.elements.menuItems = st.all(
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
      st.setCSSVar(
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
const X_ = {};
class Ew {
  constructor(t, e, i = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = Wt(i, X_), this.selector = e, this.initialize(), window.addEventListener(Yi, () => {
      V.set("[data-eq-height-elements-adjusted]", {
        clearProps: "minHeight"
      }), this.initialize();
    });
  }
  initialize() {
    const t = st.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const n = [];
      let r = [], o = 0;
      st.all(e, this.selector).forEach((l) => {
        const c = l.getBoundingClientRect();
        if (i === null) {
          o = c.height, r.push(l), i = c.top;
          return;
        }
        i !== c.top ? (console.debug("== pushing actionables", { elements: r, height: o }), n.push({ elements: r, height: o }), r = [], o = c.height) : i === c.top ? c.height > o && (o = c.height) : o = c.height, r.push(l), i = c.top;
      }), r.length && n.push({ elements: r, height: o }), n.length && n.forEach((l) => {
        V.set(l.elements, {
          minHeight: l.height,
          attr: { "data-eq-height-elements-adjusted": !0 }
        });
      });
    });
  }
}
function G_(s, t) {
  s.indexOf(t) === -1 && s.push(t);
}
function Fp(s, t) {
  const e = s.indexOf(t);
  e > -1 && s.splice(e, 1);
}
const _s = (s, t, e) => e > t ? t : e < s ? s : e;
function pu(s, t) {
  return t ? `${s}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : s;
}
let So = () => {
}, nn = () => {
};
process.env.NODE_ENV !== "production" && (So = (s, t, e) => {
  !s && typeof console < "u" && console.warn(pu(t, e));
}, nn = (s, t, e) => {
  if (!s)
    throw new Error(pu(t, e));
});
const bn = {}, Np = (s) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s);
function j_(s) {
  return typeof s == "object" && s !== null;
}
const $p = (s) => /^0[^.\s]+$/u.test(s);
// @__NO_SIDE_EFFECTS__
function hc(s) {
  let t;
  return () => (t === void 0 && (t = s()), t);
}
const rr = /* @__NO_SIDE_EFFECTS__ */ (s) => s, Z_ = (s, t) => (e) => t(s(e)), fc = (...s) => s.reduce(Z_), dc = /* @__NO_SIDE_EFFECTS__ */ (s, t, e) => {
  const i = t - s;
  return i === 0 ? 1 : (e - s) / i;
};
class Bp {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return G_(this.subscriptions, t), () => Fp(this.subscriptions, t);
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
const Hi = /* @__NO_SIDE_EFFECTS__ */ (s) => s * 1e3, Bi = /* @__NO_SIDE_EFFECTS__ */ (s) => s / 1e3;
function Vp(s, t) {
  return t ? s * (1e3 / t) : 0;
}
const Zh = /* @__PURE__ */ new Set();
function Hp(s, t, e) {
  s || Zh.has(t) || (console.warn(pu(t, e)), Zh.add(t));
}
const Q_ = (s, t, e) => {
  const i = t - s;
  return ((e - s) % i + i) % i + s;
}, Yp = (s, t, e) => (((1 - 3 * e + 3 * t) * s + (3 * e - 6 * t)) * s + 3 * t) * s, J_ = 1e-7, ty = 12;
function ey(s, t, e, i, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = Yp(o, i, n) - s, r > 0 ? e = o : t = o;
  while (Math.abs(r) > J_ && ++a < ty);
  return o;
}
function Eo(s, t, e, i) {
  if (s === t && e === i)
    return rr;
  const n = (r) => ey(r, 0, 1, s, e);
  return (r) => r === 0 || r === 1 ? r : Yp(n(r), t, i);
}
const Wp = (s) => (t) => t <= 0.5 ? s(2 * t) / 2 : (2 - s(2 * (1 - t))) / 2, Up = (s) => (t) => 1 - s(1 - t), qp = /* @__PURE__ */ Eo(0.33, 1.53, 0.69, 0.99), pc = /* @__PURE__ */ Up(qp), Kp = /* @__PURE__ */ Wp(pc), Xp = (s) => (s *= 2) < 1 ? 0.5 * pc(s) : 0.5 * (2 - Math.pow(2, -10 * (s - 1))), mc = (s) => 1 - Math.sin(Math.acos(s)), iy = Up(mc), Gp = Wp(mc), ny = /* @__PURE__ */ Eo(0.42, 0, 1, 1), sy = /* @__PURE__ */ Eo(0, 0, 0.58, 1), jp = /* @__PURE__ */ Eo(0.42, 0, 0.58, 1), Zp = (s) => Array.isArray(s) && typeof s[0] != "number";
function Qp(s, t) {
  return Zp(s) ? s[Q_(0, s.length, t)] : s;
}
const Jp = (s) => Array.isArray(s) && typeof s[0] == "number", Qh = {
  linear: rr,
  easeIn: ny,
  easeInOut: jp,
  easeOut: sy,
  circIn: mc,
  circInOut: Gp,
  circOut: iy,
  backIn: pc,
  backInOut: Kp,
  backOut: qp,
  anticipate: Xp
}, ry = (s) => typeof s == "string", Jh = (s) => {
  if (Jp(s)) {
    nn(s.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, i, n] = s;
    return Eo(t, e, i, n);
  } else if (ry(s))
    return nn(Qh[s] !== void 0, `Invalid easing type '${s}'`, "invalid-easing-type"), Qh[s];
  return s;
}, Go = [
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
function oy(s, t) {
  let e = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), n = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(h) {
    o.has(h) && (c.schedule(h), s()), h(a);
  }
  const c = {
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
      n = !0, [e, i] = [i, e], e.forEach(l), e.clear(), n = !1, r && (r = !1, c.process(h));
    }
  };
  return c;
}
const ay = 40;
function tm(s, t) {
  let e = !1, i = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = Go.reduce((C, T) => (C[T] = oy(r), C), {}), { setup: a, read: l, resolveKeyframes: c, preUpdate: h, update: f, preRender: d, render: u, postRender: m } = o, p = () => {
    const C = bn.useManualTiming ? n.timestamp : performance.now();
    e = !1, bn.useManualTiming || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(C - n.timestamp, ay), 1)), n.timestamp = C, n.isProcessing = !0, a.process(n), l.process(n), c.process(n), h.process(n), f.process(n), d.process(n), u.process(n), m.process(n), n.isProcessing = !1, e && t && (i = !1, s(p));
  }, _ = () => {
    e = !0, i = !0, n.isProcessing || s(p);
  };
  return { schedule: Go.reduce((C, T) => {
    const y = o[T];
    return C[T] = (O, P = !1, S = !1) => (e || _(), y.schedule(O, P, S)), C;
  }, {}), cancel: (C) => {
    for (let T = 0; T < Go.length; T++)
      o[Go[T]].cancel(C);
  }, state: n, steps: o };
}
const { schedule: wn, cancel: mu, state: Oa } = /* @__PURE__ */ tm(typeof requestAnimationFrame < "u" ? requestAnimationFrame : rr, !0);
let ua;
function ly() {
  ua = void 0;
}
const Mi = {
  now: () => (ua === void 0 && Mi.set(Oa.isProcessing || bn.useManualTiming ? Oa.timestamp : performance.now()), ua),
  set: (s) => {
    ua = s, queueMicrotask(ly);
  }
}, em = (s) => (t) => typeof t == "string" && t.startsWith(s), im = /* @__PURE__ */ em("--"), uy = /* @__PURE__ */ em("var(--"), gc = (s) => uy(s) ? cy.test(s.split("/*")[0].trim()) : !1, cy = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, or = {
  test: (s) => typeof s == "number",
  parse: parseFloat,
  transform: (s) => s
}, mo = {
  ...or,
  transform: (s) => _s(0, 1, s)
}, jo = {
  ...or,
  default: 1
}, Zr = (s) => Math.round(s * 1e5) / 1e5, _c = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function hy(s) {
  return s == null;
}
const fy = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, yc = (s, t) => (e) => !!(typeof e == "string" && fy.test(e) && e.startsWith(s) || t && !hy(e) && Object.prototype.hasOwnProperty.call(e, t)), nm = (s, t, e) => (i) => {
  if (typeof i != "string")
    return i;
  const [n, r, o, a] = i.match(_c);
  return {
    [s]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, dy = (s) => _s(0, 255, s), bl = {
  ...or,
  transform: (s) => Math.round(dy(s))
}, Jn = {
  test: /* @__PURE__ */ yc("rgb", "red"),
  parse: /* @__PURE__ */ nm("red", "green", "blue"),
  transform: ({ red: s, green: t, blue: e, alpha: i = 1 }) => "rgba(" + bl.transform(s) + ", " + bl.transform(t) + ", " + bl.transform(e) + ", " + Zr(mo.transform(i)) + ")"
};
function py(s) {
  let t = "", e = "", i = "", n = "";
  return s.length > 5 ? (t = s.substring(1, 3), e = s.substring(3, 5), i = s.substring(5, 7), n = s.substring(7, 9)) : (t = s.substring(1, 2), e = s.substring(2, 3), i = s.substring(3, 4), n = s.substring(4, 5), t += t, e += e, i += i, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(i, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const gu = {
  test: /* @__PURE__ */ yc("#"),
  parse: py,
  transform: Jn.transform
}, Ao = /* @__NO_SIDE_EFFECTS__ */ (s) => ({
  test: (t) => typeof t == "string" && t.endsWith(s) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${s}`
}), En = /* @__PURE__ */ Ao("deg"), js = /* @__PURE__ */ Ao("%"), ht = /* @__PURE__ */ Ao("px"), my = /* @__PURE__ */ Ao("vh"), gy = /* @__PURE__ */ Ao("vw"), tf = {
  ...js,
  parse: (s) => js.parse(s) / 100,
  transform: (s) => js.transform(s * 100)
}, Fs = {
  test: /* @__PURE__ */ yc("hsl", "hue"),
  parse: /* @__PURE__ */ nm("hue", "saturation", "lightness"),
  transform: ({ hue: s, saturation: t, lightness: e, alpha: i = 1 }) => "hsla(" + Math.round(s) + ", " + js.transform(Zr(t)) + ", " + js.transform(Zr(e)) + ", " + Zr(mo.transform(i)) + ")"
}, me = {
  test: (s) => Jn.test(s) || gu.test(s) || Fs.test(s),
  parse: (s) => Jn.test(s) ? Jn.parse(s) : Fs.test(s) ? Fs.parse(s) : gu.parse(s),
  transform: (s) => typeof s == "string" ? s : s.hasOwnProperty("red") ? Jn.transform(s) : Fs.transform(s),
  getAnimatableNone: (s) => {
    const t = me.parse(s);
    return t.alpha = 0, me.transform(t);
  }
}, _y = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function yy(s) {
  var t, e;
  return isNaN(s) && typeof s == "string" && (((t = s.match(_c)) == null ? void 0 : t.length) || 0) + (((e = s.match(_y)) == null ? void 0 : e.length) || 0) > 0;
}
const sm = "number", rm = "color", vy = "var", by = "var(", ef = "${}", wy = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function go(s) {
  const t = s.toString(), e = [], i = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(wy, (l) => (me.test(l) ? (i.color.push(r), n.push(rm), e.push(me.parse(l))) : l.startsWith(by) ? (i.var.push(r), n.push(vy), e.push(l)) : (i.number.push(r), n.push(sm), e.push(parseFloat(l))), ++r, ef)).split(ef);
  return { values: e, split: a, indexes: i, types: n };
}
function om(s) {
  return go(s).values;
}
function am(s) {
  const { split: t, types: e } = go(s), i = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === sm ? r += Zr(n[o]) : a === rm ? r += me.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const xy = (s) => typeof s == "number" ? 0 : me.test(s) ? me.getAnimatableNone(s) : s;
function Ty(s) {
  const t = om(s);
  return am(s)(t.map(xy));
}
const ar = {
  test: yy,
  parse: om,
  createTransformer: am,
  getAnimatableNone: Ty
};
function wl(s, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? s + (t - s) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? s + (t - s) * (2 / 3 - e) * 6 : s;
}
function Sy({ hue: s, saturation: t, lightness: e, alpha: i }) {
  s /= 360, t /= 100, e /= 100;
  let n = 0, r = 0, o = 0;
  if (!t)
    n = r = o = e;
  else {
    const a = e < 0.5 ? e * (1 + t) : e + t - e * t, l = 2 * e - a;
    n = wl(l, a, s + 1 / 3), r = wl(l, a, s), o = wl(l, a, s - 1 / 3);
  }
  return {
    red: Math.round(n * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function ka(s, t) {
  return (e) => e > 0 ? t : s;
}
const Co = (s, t, e) => s + (t - s) * e, xl = (s, t, e) => {
  const i = s * s, n = e * (t * t - i) + i;
  return n < 0 ? 0 : Math.sqrt(n);
}, Ey = [gu, Jn, Fs], Ay = (s) => Ey.find((t) => t.test(s));
function nf(s) {
  const t = Ay(s);
  if (So(!!t, `'${s}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(s);
  return t === Fs && (e = Sy(e)), e;
}
const sf = (s, t) => {
  const e = nf(s), i = nf(t);
  if (!e || !i)
    return ka(s, t);
  const n = { ...e };
  return (r) => (n.red = xl(e.red, i.red, r), n.green = xl(e.green, i.green, r), n.blue = xl(e.blue, i.blue, r), n.alpha = Co(e.alpha, i.alpha, r), Jn.transform(n));
}, _u = /* @__PURE__ */ new Set(["none", "hidden"]);
function Cy(s, t) {
  return _u.has(s) ? (e) => e <= 0 ? s : t : (e) => e >= 1 ? t : s;
}
function Py(s, t) {
  return (e) => Co(s, t, e);
}
function vc(s) {
  return typeof s == "number" ? Py : typeof s == "string" ? gc(s) ? ka : me.test(s) ? sf : My : Array.isArray(s) ? lm : typeof s == "object" ? me.test(s) ? sf : Oy : ka;
}
function lm(s, t) {
  const e = [...s], i = e.length, n = s.map((r, o) => vc(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      e[o] = n[o](r);
    return e;
  };
}
function Oy(s, t) {
  const e = { ...s, ...t }, i = {};
  for (const n in e)
    s[n] !== void 0 && t[n] !== void 0 && (i[n] = vc(s[n])(s[n], t[n]));
  return (n) => {
    for (const r in i)
      e[r] = i[r](n);
    return e;
  };
}
function ky(s, t) {
  const e = [], i = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = s.indexes[r][i[r]], a = s.values[o] ?? 0;
    e[n] = a, i[r]++;
  }
  return e;
}
const My = (s, t) => {
  const e = ar.createTransformer(t), i = go(s), n = go(t);
  return i.indexes.var.length === n.indexes.var.length && i.indexes.color.length === n.indexes.color.length && i.indexes.number.length >= n.indexes.number.length ? _u.has(s) && !n.values.length || _u.has(t) && !i.values.length ? Cy(s, t) : fc(lm(ky(i, n), n.values), e) : (So(!0, `Complex values '${s}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ka(s, t));
};
function um(s, t, e) {
  return typeof s == "number" && typeof t == "number" && typeof e == "number" ? Co(s, t, e) : vc(s)(s, t);
}
const Iy = (s) => {
  const t = ({ timestamp: e }) => s(e);
  return {
    start: (e = !0) => wn.update(t, e),
    stop: () => mu(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Oa.isProcessing ? Oa.timestamp : Mi.now()
  };
}, cm = (s, t, e = 10) => {
  let i = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    i += Math.round(s(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Ma = 2e4;
function bc(s) {
  let t = 0;
  const e = 50;
  let i = s.next(t);
  for (; !i.done && t < Ma; )
    t += e, i = s.next(t);
  return t >= Ma ? 1 / 0 : t;
}
function hm(s, t = 100, e) {
  const i = e({ ...s, keyframes: [0, t] }), n = Math.min(bc(i), Ma);
  return {
    type: "keyframes",
    ease: (r) => i.next(n * r).value / t,
    duration: /* @__PURE__ */ Bi(n)
  };
}
const Dy = 5;
function fm(s, t, e) {
  const i = Math.max(t - Dy, 0);
  return Vp(e - s(i), t - i);
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
}, rf = 1e-3;
function Ly({ duration: s = Qt.duration, bounce: t = Qt.bounce, velocity: e = Qt.velocity, mass: i = Qt.mass }) {
  let n, r;
  So(s <= /* @__PURE__ */ Hi(Qt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = _s(Qt.minDamping, Qt.maxDamping, o), s = _s(Qt.minDuration, Qt.maxDuration, /* @__PURE__ */ Bi(s)), o < 1 ? (n = (c) => {
    const h = c * o, f = h * s, d = h - e, u = yu(c, o), m = Math.exp(-f);
    return rf - d / u * m;
  }, r = (c) => {
    const f = c * o * s, d = f * e + e, u = Math.pow(o, 2) * Math.pow(c, 2) * s, m = Math.exp(-f), p = yu(Math.pow(c, 2), o);
    return (-n(c) + rf > 0 ? -1 : 1) * ((d - u) * m) / p;
  }) : (n = (c) => {
    const h = Math.exp(-c * s), f = (c - e) * s + 1;
    return -1e-3 + h * f;
  }, r = (c) => {
    const h = Math.exp(-c * s), f = (e - c) * (s * s);
    return h * f;
  });
  const a = 5 / s, l = zy(n, r, a);
  if (s = /* @__PURE__ */ Hi(s), isNaN(l))
    return {
      stiffness: Qt.stiffness,
      damping: Qt.damping,
      duration: s
    };
  {
    const c = Math.pow(l, 2) * i;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(i * c),
      duration: s
    };
  }
}
const Ry = 12;
function zy(s, t, e) {
  let i = e;
  for (let n = 1; n < Ry; n++)
    i = i - s(i) / t(i);
  return i;
}
function yu(s, t) {
  return s * Math.sqrt(1 - t * t);
}
const Fy = ["duration", "bounce"], Ny = ["stiffness", "damping", "mass"];
function of(s, t) {
  return t.some((e) => s[e] !== void 0);
}
function $y(s) {
  let t = {
    velocity: Qt.velocity,
    stiffness: Qt.stiffness,
    damping: Qt.damping,
    mass: Qt.mass,
    isResolvedFromDuration: !1,
    ...s
  };
  if (!of(s, Ny) && of(s, Fy))
    if (s.visualDuration) {
      const e = s.visualDuration, i = 2 * Math.PI / (e * 1.2), n = i * i, r = 2 * _s(0.05, 1, 1 - (s.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Qt.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = Ly(s);
      t = {
        ...t,
        ...e,
        mass: Qt.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function _o(s = Qt.visualDuration, t = Qt.bounce) {
  const e = typeof s != "object" ? {
    visualDuration: s,
    keyframes: [0, 1],
    bounce: t
  } : s;
  let { restSpeed: i, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: h, duration: f, velocity: d, isResolvedFromDuration: u } = $y({
    ...e,
    velocity: -/* @__PURE__ */ Bi(e.velocity || 0)
  }), m = d || 0, p = c / (2 * Math.sqrt(l * h)), _ = o - r, b = /* @__PURE__ */ Bi(Math.sqrt(l / h)), A = Math.abs(_) < 5;
  i || (i = A ? Qt.restSpeed.granular : Qt.restSpeed.default), n || (n = A ? Qt.restDelta.granular : Qt.restDelta.default);
  let C;
  if (p < 1) {
    const y = yu(b, p);
    C = (O) => {
      const P = Math.exp(-p * b * O);
      return o - P * ((m + p * b * _) / y * Math.sin(y * O) + _ * Math.cos(y * O));
    };
  } else if (p === 1)
    C = (y) => o - Math.exp(-b * y) * (_ + (m + b * _) * y);
  else {
    const y = b * Math.sqrt(p * p - 1);
    C = (O) => {
      const P = Math.exp(-p * b * O), S = Math.min(y * O, 300);
      return o - P * ((m + p * b * _) * Math.sinh(S) + y * _ * Math.cosh(S)) / y;
    };
  }
  const T = {
    calculatedDuration: u && f || null,
    next: (y) => {
      const O = C(y);
      if (u)
        a.done = y >= f;
      else {
        let P = y === 0 ? m : 0;
        p < 1 && (P = y === 0 ? /* @__PURE__ */ Hi(m) : fm(C, y, O));
        const S = Math.abs(P) <= i, k = Math.abs(o - O) <= n;
        a.done = S && k;
      }
      return a.value = a.done ? o : O, a;
    },
    toString: () => {
      const y = Math.min(bc(T), Ma), O = cm((P) => T.next(y * P).value, y, 30);
      return y + "ms " + O;
    },
    toTransition: () => {
    }
  };
  return T;
}
_o.applyToOptions = (s) => {
  const t = hm(s, 100, _o);
  return s.ease = t.ease, s.duration = /* @__PURE__ */ Hi(t.duration), s.type = "keyframes", s;
};
function vu({ keyframes: s, velocity: t = 0, power: e = 0.8, timeConstant: i = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: h }) {
  const f = s[0], d = {
    done: !1,
    value: f
  }, u = (S) => a !== void 0 && S < a || l !== void 0 && S > l, m = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let p = e * t;
  const _ = f + p, b = o === void 0 ? _ : o(_);
  b !== _ && (p = b - f);
  const A = (S) => -p * Math.exp(-S / i), C = (S) => b + A(S), T = (S) => {
    const k = A(S), R = C(S);
    d.done = Math.abs(k) <= c, d.value = d.done ? b : R;
  };
  let y, O;
  const P = (S) => {
    u(d.value) && (y = S, O = _o({
      keyframes: [d.value, m(d.value)],
      velocity: fm(C, S, d.value),
      // TODO: This should be passing * 1000
      damping: n,
      stiffness: r,
      restDelta: c,
      restSpeed: h
    }));
  };
  return P(0), {
    calculatedDuration: null,
    next: (S) => {
      let k = !1;
      return !O && y === void 0 && (k = !0, T(S), P(S)), y !== void 0 && S >= y ? O.next(S - y) : (!k && T(S), d);
    }
  };
}
function By(s, t, e) {
  const i = [], n = e || bn.mix || um, r = s.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(s[o], s[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || rr : t;
      a = fc(l, a);
    }
    i.push(a);
  }
  return i;
}
function Vy(s, t, { clamp: e = !0, ease: i, mixer: n } = {}) {
  const r = s.length;
  if (nn(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = s[0] === s[1];
  s[0] > s[r - 1] && (s = [...s].reverse(), t = [...t].reverse());
  const a = By(t, i, n), l = a.length, c = (h) => {
    if (o && h < s[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < s.length - 2 && !(h < s[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ dc(s[f], s[f + 1], h);
    return a[f](d);
  };
  return e ? (h) => c(_s(s[0], s[r - 1], h)) : c;
}
function dm(s, t) {
  const e = s[s.length - 1];
  for (let i = 1; i <= t; i++) {
    const n = /* @__PURE__ */ dc(0, t, i);
    s.push(Co(e, 1, n));
  }
}
function pm(s) {
  const t = [0];
  return dm(t, s.length - 1), t;
}
function Hy(s, t) {
  return s.map((e) => e * t);
}
function Yy(s, t) {
  return s.map(() => t || jp).splice(0, s.length - 1);
}
function Ns({ duration: s = 300, keyframes: t, times: e, ease: i = "easeInOut" }) {
  const n = Zp(i) ? i.map(Jh) : Jh(i), r = {
    done: !1,
    value: t[0]
  }, o = Hy(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : pm(t),
    s
  ), a = Vy(o, t, {
    ease: Array.isArray(n) ? n : Yy(t, n)
  });
  return {
    calculatedDuration: s,
    next: (l) => (r.value = a(l), r.done = l >= s, r)
  };
}
const Wy = (s) => s !== null;
function wc(s, { repeat: t, repeatType: e = "loop" }, i, n = 1) {
  const r = s.filter(Wy), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Uy = {
  decay: vu,
  inertia: vu,
  tween: Ns,
  keyframes: Ns,
  spring: _o
};
function mm(s) {
  typeof s.type == "string" && (s.type = Uy[s.type]);
}
class xc {
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
const qy = (s) => s / 100;
class Tc extends xc {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== Mi.now() && this.tick(Mi.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (i = this.options).onStop) == null || n.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    mm(t);
    const { type: e = Ns, repeat: i = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = e || Ns;
    process.env.NODE_ENV !== "production" && l !== Ns && nn(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== Ns && typeof a[0] != "number" && (this.mixKeyframes = fc(qy, um(a[0], a[1])), a = [0, 100]);
    const c = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = bc(c));
    const { calculatedDuration: h } = c;
    this.calculatedDuration = h, this.resolvedDuration = h + n, this.totalDuration = this.resolvedDuration * (i + 1) - n, this.generator = c;
  }
  updateTime(t) {
    const e = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = e;
  }
  tick(t, e = !1) {
    const { generator: i, totalDuration: n, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: c = 0, keyframes: h, repeat: f, repeatType: d, repeatDelay: u, type: m, onUpdate: p, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const b = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? b < 0 : b > n;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let C = this.currentTime, T = i;
    if (f) {
      const S = Math.min(this.currentTime, n) / a;
      let k = Math.floor(S), R = S % 1;
      !R && S >= 1 && (R = 1), R === 1 && k--, k = Math.min(k, f + 1), !!(k % 2) && (d === "reverse" ? (R = 1 - R, u && (R -= u / a)) : d === "mirror" && (T = o)), C = _s(0, 1, R) * a;
    }
    const y = A ? { done: !1, value: h[0] } : T.next(C);
    r && (y.value = r(y.value));
    let { done: O } = y;
    !A && l !== null && (O = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const P = this.holdTime === null && (this.state === "finished" || this.state === "running" && O);
    return P && m !== vu && (y.value = wc(h, this.options, _, this.speed)), p && p(y.value), P && this.finish(), y;
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
    return /* @__PURE__ */ Bi(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Bi(t);
  }
  get time() {
    return /* @__PURE__ */ Bi(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ Hi(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(Mi.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ Bi(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = Iy, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = e ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Mi.now()), this.holdTime = this.currentTime;
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
function Ky(s) {
  for (let t = 1; t < s.length; t++)
    s[t] ?? (s[t] = s[t - 1]);
}
const ts = (s) => s * 180 / Math.PI, bu = (s) => {
  const t = ts(Math.atan2(s[1], s[0]));
  return wu(t);
}, Xy = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (s) => (Math.abs(s[0]) + Math.abs(s[3])) / 2,
  rotate: bu,
  rotateZ: bu,
  skewX: (s) => ts(Math.atan(s[1])),
  skewY: (s) => ts(Math.atan(s[2])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[2])) / 2
}, wu = (s) => (s = s % 360, s < 0 && (s += 360), s), af = bu, lf = (s) => Math.sqrt(s[0] * s[0] + s[1] * s[1]), uf = (s) => Math.sqrt(s[4] * s[4] + s[5] * s[5]), Gy = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: lf,
  scaleY: uf,
  scale: (s) => (lf(s) + uf(s)) / 2,
  rotateX: (s) => wu(ts(Math.atan2(s[6], s[5]))),
  rotateY: (s) => wu(ts(Math.atan2(-s[2], s[0]))),
  rotateZ: af,
  rotate: af,
  skewX: (s) => ts(Math.atan(s[4])),
  skewY: (s) => ts(Math.atan(s[1])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[4])) / 2
};
function xu(s) {
  return s.includes("scale") ? 1 : 0;
}
function Tu(s, t) {
  if (!s || s === "none")
    return xu(t);
  const e = s.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, n;
  if (e)
    i = Gy, n = e;
  else {
    const a = s.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = Xy, n = a;
  }
  if (!n)
    return xu(t);
  const r = i[t], o = n[1].split(",").map(Zy);
  return typeof r == "function" ? r(o) : o[r];
}
const jy = (s, t) => {
  const { transform: e = "none" } = getComputedStyle(s);
  return Tu(e, t);
};
function Zy(s) {
  return parseFloat(s.trim());
}
const lr = [
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
], ur = new Set(lr), cf = (s) => s === or || s === ht, Qy = /* @__PURE__ */ new Set(["x", "y", "z"]), Jy = lr.filter((s) => !Qy.has(s));
function tv(s) {
  const t = [];
  return Jy.forEach((e) => {
    const i = s.getValue(e);
    i !== void 0 && (t.push([e, i.get()]), i.set(e.startsWith("scale") ? 1 : 0));
  }), t;
}
const cs = {
  // Dimensions
  width: ({ x: s }, { paddingLeft: t = "0", paddingRight: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  height: ({ y: s }, { paddingTop: t = "0", paddingBottom: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  top: (s, { top: t }) => parseFloat(t),
  left: (s, { left: t }) => parseFloat(t),
  bottom: ({ y: s }, { top: t }) => parseFloat(t) + (s.max - s.min),
  right: ({ x: s }, { left: t }) => parseFloat(t) + (s.max - s.min),
  // Transform
  x: (s, { transform: t }) => Tu(t, "x"),
  y: (s, { transform: t }) => Tu(t, "y")
};
cs.translateX = cs.x;
cs.translateY = cs.y;
const hs = /* @__PURE__ */ new Set();
let Su = !1, Eu = !1, Au = !1;
function gm() {
  if (Eu) {
    const s = Array.from(hs).filter((i) => i.needsMeasurement), t = new Set(s.map((i) => i.element)), e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const n = tv(i);
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
  Eu = !1, Su = !1, hs.forEach((s) => s.complete(Au)), hs.clear();
}
function _m() {
  hs.forEach((s) => {
    s.readKeyframes(), s.needsMeasurement && (Eu = !0);
  });
}
function ev() {
  Au = !0, _m(), gm(), Au = !1;
}
class Sc {
  constructor(t, e, i, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = i, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (hs.add(this), Su || (Su = !0, wn.read(_m), wn.resolveKeyframes(gm))) : (this.readKeyframes(), this.complete());
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
    Ky(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), hs.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (hs.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const iv = (s) => s.startsWith("--");
function nv(s, t, e) {
  iv(t) ? s.style.setProperty(t, e) : s.style[t] = e;
}
const sv = /* @__PURE__ */ hc(() => window.ScrollTimeline !== void 0), rv = {};
function ov(s, t) {
  const e = /* @__PURE__ */ hc(s);
  return () => rv[t] ?? e();
}
const ym = /* @__PURE__ */ ov(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Ir = ([s, t, e, i]) => `cubic-bezier(${s}, ${t}, ${e}, ${i})`, hf = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Ir([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Ir([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Ir([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Ir([0.33, 1.53, 0.69, 0.99])
};
function vm(s, t) {
  if (s)
    return typeof s == "function" ? ym() ? cm(s, t) : "ease-out" : Jp(s) ? Ir(s) : Array.isArray(s) ? s.map((e) => vm(e, t) || hf.easeOut) : hf[s];
}
function av(s, t, e, { delay: i = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, c = void 0) {
  const h = {
    [t]: e
  };
  l && (h.offset = l);
  const f = vm(a, n);
  Array.isArray(f) && (h.easing = f);
  const d = {
    delay: i,
    duration: n,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return c && (d.pseudoElement = c), s.animate(h, d);
}
function Ec(s) {
  return typeof s == "function" && "applyToOptions" in s;
}
function lv({ type: s, ...t }) {
  return Ec(s) && ym() ? s.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class uv extends xc {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: i, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, nn(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = lv(t);
    this.animation = av(e, i, n, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const h = wc(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(h) : nv(e, i, h), this.animation.cancel();
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
    return /* @__PURE__ */ Bi(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Bi(t);
  }
  get time() {
    return /* @__PURE__ */ Bi(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Hi(t);
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
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && sv() ? (this.animation.timeline = t, rr) : e(this);
  }
}
const bm = {
  anticipate: Xp,
  backInOut: Kp,
  circInOut: Gp
};
function cv(s) {
  return s in bm;
}
function hv(s) {
  typeof s.ease == "string" && cv(s.ease) && (s.ease = bm[s.ease]);
}
const ff = 10;
class fv extends uv {
  constructor(t) {
    hv(t), mm(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const a = new Tc({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ Hi(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(l - ff).value, a.sample(l).value, ff), a.stop();
  }
}
const df = (s, t) => t === "zIndex" ? !1 : !!(typeof s == "number" || Array.isArray(s) || typeof s == "string" && // It's animatable if we have a string
(ar.test(s) || s === "0") && // And it contains numbers and/or colors
!s.startsWith("url("));
function dv(s) {
  const t = s[0];
  if (s.length === 1)
    return !0;
  for (let e = 0; e < s.length; e++)
    if (s[e] !== t)
      return !0;
}
function pv(s, t, e, i) {
  const n = s[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = s[s.length - 1], o = df(n, t), a = df(r, t);
  return So(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : dv(s) || (e === "spring" || Ec(e)) && i;
}
function Cu(s) {
  s.duration = 0, s.type = "keyframes";
}
const mv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), gv = /* @__PURE__ */ hc(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _v(s) {
  var h;
  const { motionValue: t, name: e, repeatDelay: i, repeatType: n, damping: r, type: o } = s;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: c } = t.owner.getProps();
  return gv() && e && mv.has(e) && (e !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && n !== "mirror" && r !== 0 && o !== "inertia";
}
const yv = 40;
class vv extends xc {
  constructor({ autoplay: t = !0, delay: e = 0, type: i = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: c, element: h, ...f }) {
    var m;
    super(), this.stop = () => {
      var p, _;
      this._animation && (this._animation.stop(), (p = this.stopTimeline) == null || p.call(this)), (_ = this.keyframeResolver) == null || _.cancel();
    }, this.createdAt = Mi.now();
    const d = {
      autoplay: t,
      delay: e,
      type: i,
      repeat: n,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: c,
      element: h,
      ...f
    }, u = (h == null ? void 0 : h.KeyframeResolver) || Sc;
    this.keyframeResolver = new u(a, (p, _, b) => this.onKeyframesResolved(p, _, d, !b), l, c, h), (m = this.keyframeResolver) == null || m.scheduleResolve();
  }
  onKeyframesResolved(t, e, i, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: c, onUpdate: h } = i;
    this.resolvedAt = Mi.now(), pv(t, r, o, a) || ((bn.instantAnimations || !l) && (h == null || h(wc(t, i, e))), t[0] = t[t.length - 1], Cu(i), i.repeat = 0);
    const d = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > yv ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...i,
      keyframes: t
    }, u = !c && _v(d) ? new fv({
      ...d,
      element: d.motionValue.owner.current
    }) : new Tc(d);
    u.finished.then(() => this.notifyFinished()).catch(rr), this.pendingTimeline && (this.stopTimeline = u.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = u;
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), ev()), this._animation;
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
class bv {
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
    return pf(this.animations, "duration");
  }
  get iterationDuration() {
    return pf(this.animations, "iterationDuration");
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
function pf(s, t) {
  let e = 0;
  for (let i = 0; i < s.length; i++) {
    const n = s[i][t];
    n !== null && n > e && (e = n);
  }
  return e;
}
class wv extends bv {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const xv = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Tv(s) {
  const t = xv.exec(s);
  if (!t)
    return [,];
  const [, e, i, n] = t;
  return [`--${e ?? i}`, n];
}
const Sv = 4;
function wm(s, t, e = 1) {
  nn(e <= Sv, `Max CSS variable fallback depth detected in property "${s}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, n] = Tv(s);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return Np(o) ? parseFloat(o) : o;
  }
  return gc(n) ? wm(n, t, e + 1) : n;
}
function xm(s, t) {
  return (s == null ? void 0 : s[t]) ?? (s == null ? void 0 : s.default) ?? s;
}
const Tm = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...lr
]), Ev = {
  test: (s) => s === "auto",
  parse: (s) => s
}, Sm = (s) => (t) => t.test(s), Em = [or, ht, js, En, gy, my, Ev], mf = (s) => Em.find(Sm(s));
function Av(s) {
  return typeof s == "number" ? s === 0 : s !== null ? s === "none" || s === "0" || $p(s) : !0;
}
const Cv = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Pv(s) {
  const [t, e] = s.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return s;
  const [i] = e.match(_c) || [];
  if (!i)
    return s;
  const n = e.replace(i, "");
  let r = Cv.has(t) ? 1 : 0;
  return i !== e && (r *= 100), t + "(" + r + n + ")";
}
const Ov = /\b([a-z-]*)\(.*?\)/gu, Pu = {
  ...ar,
  getAnimatableNone: (s) => {
    const t = s.match(Ov);
    return t ? t.map(Pv).join(" ") : s;
  }
}, gf = {
  ...or,
  transform: Math.round
}, kv = {
  rotate: En,
  rotateX: En,
  rotateY: En,
  rotateZ: En,
  scale: jo,
  scaleX: jo,
  scaleY: jo,
  scaleZ: jo,
  skew: En,
  skewX: En,
  skewY: En,
  distance: ht,
  translateX: ht,
  translateY: ht,
  translateZ: ht,
  x: ht,
  y: ht,
  z: ht,
  perspective: ht,
  transformPerspective: ht,
  opacity: mo,
  originX: tf,
  originY: tf,
  originZ: ht
}, Ac = {
  // Border props
  borderWidth: ht,
  borderTopWidth: ht,
  borderRightWidth: ht,
  borderBottomWidth: ht,
  borderLeftWidth: ht,
  borderRadius: ht,
  radius: ht,
  borderTopLeftRadius: ht,
  borderTopRightRadius: ht,
  borderBottomRightRadius: ht,
  borderBottomLeftRadius: ht,
  // Positioning props
  width: ht,
  maxWidth: ht,
  height: ht,
  maxHeight: ht,
  top: ht,
  right: ht,
  bottom: ht,
  left: ht,
  // Spacing props
  padding: ht,
  paddingTop: ht,
  paddingRight: ht,
  paddingBottom: ht,
  paddingLeft: ht,
  margin: ht,
  marginTop: ht,
  marginRight: ht,
  marginBottom: ht,
  marginLeft: ht,
  // Misc
  backgroundPositionX: ht,
  backgroundPositionY: ht,
  ...kv,
  zIndex: gf,
  // SVG
  fillOpacity: mo,
  strokeOpacity: mo,
  numOctaves: gf
}, Mv = {
  ...Ac,
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
  filter: Pu,
  WebkitFilter: Pu
}, Am = (s) => Mv[s];
function Cm(s, t) {
  let e = Am(s);
  return e !== Pu && (e = ar), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const Iv = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Dv(s, t, e) {
  let i = 0, n;
  for (; i < s.length && !n; ) {
    const r = s[i];
    typeof r == "string" && !Iv.has(r) && go(r).values.length && (n = s[i]), i++;
  }
  if (n && e)
    for (const r of t)
      s[r] = Cm(e, n);
}
class Lv extends Sc {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: e, name: i } = this;
    if (!e || !e.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let c = t[l];
      if (typeof c == "string" && (c = c.trim(), gc(c))) {
        const h = wm(c, e.current);
        h !== void 0 && (t[l] = h), l === t.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Tm.has(i) || t.length !== 2)
      return;
    const [n, r] = t, o = mf(n), a = mf(r);
    if (o !== a)
      if (cf(o) && cf(a))
        for (let l = 0; l < t.length; l++) {
          const c = t[l];
          typeof c == "string" && (t[l] = parseFloat(c));
        }
      else cs[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, i = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || Av(t[n])) && i.push(n);
    i.length && Dv(t, i, e);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: e, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = cs[i](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
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
    i[r] = cs[e](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, c]) => {
      t.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
function Rv(s, t, e) {
  if (s instanceof EventTarget)
    return [s];
  if (typeof s == "string") {
    let i = document;
    const n = (e == null ? void 0 : e[s]) ?? i.querySelectorAll(s);
    return n ? Array.from(n) : [];
  }
  return Array.from(s);
}
const Pm = (s, t) => t && typeof s == "number" ? t.transform(s) : s, _f = 30, zv = (s) => !isNaN(parseFloat(s));
class Fv {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const n = Mi.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Mi.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = zv(this.current));
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
    return process.env.NODE_ENV !== "production" && Hp(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new Bp());
    const i = this.events[t].add(e);
    return t === "change" ? () => {
      i(), wn.read(() => {
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
    const t = Mi.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > _f)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, _f);
    return Vp(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function yo(s, t) {
  return new Fv(s, t);
}
const { schedule: Nv } = /* @__PURE__ */ tm(queueMicrotask, !1);
function Om(s) {
  return j_(s) && "ownerSVGElement" in s;
}
function $v(s) {
  return Om(s) && s.tagName === "svg";
}
const ii = (s) => !!(s && s.getVelocity), Bv = [...Em, me, ar], Vv = (s) => Bv.find(Sm(s));
function Cc(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function km(s, t, e, i) {
  return typeof s == "string" && Cc(t) ? Rv(s, e, i) : s instanceof NodeList ? Array.from(s) : Array.isArray(s) ? s : [s];
}
function Hv(s, t, e) {
  return s * (t + 1);
}
function yf(s, t, e, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, s + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : i.get(t) ?? s;
}
function Yv(s, t, e) {
  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    n.at > t && n.at < e && (Fp(s, n), i--);
  }
}
function Wv(s, t, e, i, n, r) {
  Yv(s, n, r);
  for (let o = 0; o < t.length; o++)
    s.push({
      value: t[o],
      at: Co(n, r, i[o]),
      easing: Qp(e, o)
    });
}
function Uv(s, t) {
  for (let e = 0; e < s.length; e++)
    s[e] = s[e] / (t + 1);
}
function qv(s, t) {
  return s.at === t.at ? s.value === null ? 1 : t.value === null ? -1 : 0 : s.at - t.at;
}
const Kv = "easeInOut", Xv = 20;
function Gv(s, { defaultTransition: t = {}, ...e } = {}, i, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let h = 0, f = 0, d = 0;
  for (let u = 0; u < s.length; u++) {
    const m = s[u];
    if (typeof m == "string") {
      c.set(m, f);
      continue;
    } else if (!Array.isArray(m)) {
      c.set(m.name, yf(f, m.at, h, c));
      continue;
    }
    let [p, _, b = {}] = m;
    b.at !== void 0 && (f = yf(f, b.at, h, c));
    let A = 0;
    const C = (T, y, O, P = 0, S = 0) => {
      const k = jv(T), { delay: R = 0, times: H = pm(k), type: z = "keyframes", repeat: B, repeatType: J, repeatDelay: it = 0, ...q } = y;
      let { ease: Y = t.ease || "easeOut", duration: tt } = y;
      const ot = typeof R == "function" ? R(P, S) : R, w = k.length, j = Ec(z) ? z : n == null ? void 0 : n[z || "keyframes"];
      if (w <= 2 && j) {
        let It = 100;
        if (w === 2 && Jv(k)) {
          const lt = k[1] - k[0];
          It = Math.abs(lt);
        }
        const gt = { ...q };
        tt !== void 0 && (gt.duration = /* @__PURE__ */ Hi(tt));
        const At = hm(gt, It, j);
        Y = At.ease, tt = At.duration;
      }
      tt ?? (tt = r);
      const nt = f + ot;
      H.length === 1 && H[0] === 0 && (H[1] = 1);
      const K = H.length - k.length;
      if (K > 0 && dm(H, K), k.length === 1 && k.unshift(null), B) {
        nn(B < Xv, "Repeat count too high, must be less than 20", "repeat-count-high"), tt = Hv(tt, B);
        const It = [...k], gt = [...H];
        Y = Array.isArray(Y) ? [...Y] : [Y];
        const At = [...Y];
        for (let lt = 0; lt < B; lt++) {
          k.push(...It);
          for (let Lt = 0; Lt < It.length; Lt++)
            H.push(gt[Lt] + (lt + 1)), Y.push(Lt === 0 ? "linear" : Qp(At, Lt - 1));
        }
        Uv(H, B);
      }
      const rt = nt + tt;
      Wv(O, k, Y, H, nt, rt), A = Math.max(ot + tt, A), d = Math.max(rt, d);
    };
    if (ii(p)) {
      const T = vf(p, a);
      C(_, b, bf("default", T));
    } else {
      const T = km(p, _, i, l), y = T.length;
      for (let O = 0; O < y; O++) {
        _ = _, b = b;
        const P = T[O], S = vf(P, a);
        for (const k in _)
          C(_[k], Zv(b, k), bf(k, S), O, y);
      }
    }
    h = f, f += A;
  }
  return a.forEach((u, m) => {
    for (const p in u) {
      const _ = u[p];
      _.sort(qv);
      const b = [], A = [], C = [];
      for (let y = 0; y < _.length; y++) {
        const { at: O, value: P, easing: S } = _[y];
        b.push(P), A.push(/* @__PURE__ */ dc(0, d, O)), C.push(S || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), b.unshift(b[0]), C.unshift(Kv)), A[A.length - 1] !== 1 && (A.push(1), b.push(null)), o.has(m) || o.set(m, {
        keyframes: {},
        transition: {}
      });
      const T = o.get(m);
      T.keyframes[p] = b, T.transition[p] = {
        ...t,
        duration: d,
        ease: C,
        times: A,
        ...e
      };
    }
  }), o;
}
function vf(s, t) {
  return !t.has(s) && t.set(s, {}), t.get(s);
}
function bf(s, t) {
  return t[s] || (t[s] = []), t[s];
}
function jv(s) {
  return Array.isArray(s) ? s : [s];
}
function Zv(s, t) {
  return s && s[t] ? {
    ...s,
    ...s[t]
  } : { ...s };
}
const Qv = (s) => typeof s == "number", Jv = (s) => s.every(Qv), vo = /* @__PURE__ */ new WeakMap(), tb = (s) => Array.isArray(s);
function wf(s) {
  const t = [{}, {}];
  return s == null || s.values.forEach((e, i) => {
    t[0][i] = e.get(), t[1][i] = e.getVelocity();
  }), t;
}
function Mm(s, t, e, i) {
  if (typeof t == "function") {
    const [n, r] = wf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  if (typeof t == "string" && (t = s.variants && s.variants[t]), typeof t == "function") {
    const [n, r] = wf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  return t;
}
function eb(s, t, e) {
  const i = s.getProps();
  return Mm(i, t, i.custom, s);
}
function ib(s, t, e) {
  s.hasValue(t) ? s.getValue(t).set(e) : s.addValue(t, yo(e));
}
function nb(s) {
  return tb(s) ? s[s.length - 1] || 0 : s;
}
function sb(s, t) {
  const e = eb(s, t);
  let { transitionEnd: i = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = nb(r[o]);
    ib(s, o, a);
  }
}
function rb(s) {
  return !!(ii(s) && s.add);
}
function ob(s, t) {
  const e = s.getValue("willChange");
  if (rb(e))
    return e.add(t);
  if (!e && bn.WillChange) {
    const i = new bn.WillChange("auto");
    s.addValue("willChange", i), i.add(t);
  }
}
const Pc = (s) => s.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), ab = "framerAppearId", lb = "data-" + Pc(ab);
function ub(s) {
  return s.props[lb];
}
const cb = (s) => s !== null;
function hb(s, { repeat: t, repeatType: e = "loop" }, i) {
  const n = s.filter(cb), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const fb = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, db = (s) => ({
  type: "spring",
  stiffness: 550,
  damping: s === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), pb = {
  type: "keyframes",
  duration: 0.8
}, mb = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, gb = (s, { keyframes: t }) => t.length > 2 ? pb : ur.has(s) ? s.startsWith("scale") ? db(t[1]) : fb : mb;
function _b({ when: s, delay: t, delayChildren: e, staggerChildren: i, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...h }) {
  return !!Object.keys(h).length;
}
const Im = (s, t, e, i = {}, n, r) => (o) => {
  const a = xm(i, s) || {}, l = a.delay || i.delay || 0;
  let { elapsed: c = 0 } = i;
  c = c - /* @__PURE__ */ Hi(l);
  const h = {
    keyframes: Array.isArray(e) ? e : [null, e],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -c,
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
  _b(a) || Object.assign(h, gb(s, h)), h.duration && (h.duration = /* @__PURE__ */ Hi(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ Hi(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let f = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (Cu(h), h.delay === 0 && (f = !0)), (bn.instantAnimations || bn.skipAnimations) && (f = !0, Cu(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, f && !r && t.get() !== void 0) {
    const d = hb(h.keyframes, a);
    if (d !== void 0) {
      wn.update(() => {
        h.onUpdate(d), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Tc(h) : new vv(h);
};
function yb({ protectedKeys: s, needsAnimating: t }, e) {
  const i = s.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, i;
}
function vb(s, t, { delay: e = 0, transitionOverride: i, type: n } = {}) {
  let { transition: r = s.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (r = i);
  const l = [], c = n && s.animationState && s.animationState.getState()[n];
  for (const h in a) {
    const f = s.getValue(h, s.latestValues[h] ?? null), d = a[h];
    if (d === void 0 || c && yb(c, h))
      continue;
    const u = {
      delay: e,
      ...xm(r || {}, h)
    }, m = f.get();
    if (m !== void 0 && !f.isAnimating && !Array.isArray(d) && d === m && !u.velocity)
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const b = ub(s);
      if (b) {
        const A = window.MotionHandoffAnimation(b, h, wn);
        A !== null && (u.startTime = A, p = !0);
      }
    }
    ob(s, h), f.start(Im(h, f, d, s.shouldReduceMotion && Tm.has(h) ? { type: !1 } : u, s, p));
    const _ = f.animation;
    _ && l.push(_);
  }
  return o && Promise.all(l).then(() => {
    wn.update(() => {
      o && sb(s, o);
    });
  }), l;
}
function bb({ top: s, left: t, right: e, bottom: i }) {
  return {
    x: { min: t, max: e },
    y: { min: s, max: i }
  };
}
function wb(s, t) {
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
function xb(s, t) {
  return bb(wb(s.getBoundingClientRect(), t));
}
const xf = {
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
}, Ou = {};
for (const s in xf)
  Ou[s] = {
    isEnabled: (t) => xf[s].some((e) => !!t[e])
  };
const Tf = () => ({ min: 0, max: 0 }), Oc = () => ({
  x: Tf(),
  y: Tf()
}), Tb = typeof window < "u", ku = { current: null }, Dm = { current: !1 };
function Sb() {
  if (Dm.current = !0, !!Tb)
    if (window.matchMedia) {
      const s = window.matchMedia("(prefers-reduced-motion)"), t = () => ku.current = s.matches;
      s.addEventListener("change", t), t();
    } else
      ku.current = !1;
}
function Eb(s) {
  return s !== null && typeof s == "object" && typeof s.start == "function";
}
function Ab(s) {
  return typeof s == "string" || Array.isArray(s);
}
const Cb = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Pb = ["initial", ...Cb];
function Lm(s) {
  return Eb(s.animate) || Pb.some((t) => Ab(s[t]));
}
function Ob(s) {
  return !!(Lm(s) || s.variants);
}
function kb(s, t, e) {
  for (const i in t) {
    const n = t[i], r = e[i];
    if (ii(n))
      s.addValue(i, n);
    else if (ii(r))
      s.addValue(i, yo(n, { owner: s }));
    else if (r !== n)
      if (s.hasValue(i)) {
        const o = s.getValue(i);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = s.getStaticValue(i);
        s.addValue(i, yo(o !== void 0 ? o : n, { owner: s }));
      }
  }
  for (const i in e)
    t[i] === void 0 && s.removeValue(i);
  return t;
}
const Sf = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Rm {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Sc, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = Mi.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, wn.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = e.initial ? { ...l } : {}, this.renderState = c, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Lm(e), this.isVariantNode = Ob(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const d in f) {
      const u = f[d];
      l[d] !== void 0 && ii(u) && u.set(l[d]);
    }
  }
  mount(t) {
    var e;
    this.current = t, vo.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, n) => this.bindToMotionValue(n, i)), Dm.current || Sb(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : ku.current, process.env.NODE_ENV !== "production" && Hp(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), mu(this.notifyUpdate), mu(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
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
    const i = ur.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && wn.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (t in Ou) {
      const e = Ou[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Oc();
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
    for (let i = 0; i < Sf.length; i++) {
      const n = Sf[i];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const r = "on" + n, o = t[r];
      o && (this.propEventSubscriptions[n] = this.on(n, o));
    }
    this.prevMotionValues = kb(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && e !== void 0 && (i = yo(e === null ? void 0 : e, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (Np(i) || $p(i)) ? i = parseFloat(i) : !Vv(i) && ar.test(e) && (i = Cm(t, e)), this.setBaseTarget(t, ii(i) ? i.get() : i)), ii(i) ? i.get() : i;
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
      const o = Mm(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (e && i !== void 0)
      return i;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !ii(n) ? n : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new Bp()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    Nv.render(this.render);
  }
}
class zm extends Rm {
  constructor() {
    super(...arguments), this.KeyframeResolver = Lv;
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
const Mb = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Ib = lr.length;
function Db(s, t, e) {
  let i = "", n = !0;
  for (let r = 0; r < Ib; r++) {
    const o = lr[r], a = s[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || e) {
      const c = Pm(a, Ac[o]);
      if (!l) {
        n = !1;
        const h = Mb[o] || o;
        i += `${h}(${c}) `;
      }
      e && (t[o] = c);
    }
  }
  return i = i.trim(), e ? i = e(t, n ? "" : i) : n && (i = "none"), i;
}
function Fm(s, t, e) {
  const { style: i, vars: n, transformOrigin: r } = s;
  let o = !1, a = !1;
  for (const l in t) {
    const c = t[l];
    if (ur.has(l)) {
      o = !0;
      continue;
    } else if (im(l)) {
      n[l] = c;
      continue;
    } else {
      const h = Pm(c, Ac[l]);
      l.startsWith("origin") ? (a = !0, r[l] = h) : i[l] = h;
    }
  }
  if (t.transform || (o || e ? i.transform = Db(t, s.transform, e) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: h = 0 } = r;
    i.transformOrigin = `${l} ${c} ${h}`;
  }
}
function Nm(s, { style: t, vars: e }, i, n) {
  const r = s.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, i);
  for (o in e)
    r.setProperty(o, e[o]);
}
const Lb = {};
function Rb(s, { layout: t, layoutId: e }) {
  return ur.has(s) || s.startsWith("origin") || (t || e !== void 0) && (!!Lb[s] || s === "opacity");
}
function $m(s, t, e) {
  var r;
  const { style: i } = s, n = {};
  for (const o in i)
    (ii(i[o]) || t.style && ii(t.style[o]) || Rb(o, s) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = i[o]);
  return n;
}
function zb(s) {
  return window.getComputedStyle(s);
}
class Fb extends zm {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Nm;
  }
  readValueFromInstance(t, e) {
    var i;
    if (ur.has(e))
      return (i = this.projection) != null && i.isProjecting ? xu(e) : jy(t, e);
    {
      const n = zb(t), r = (im(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return xb(t, e);
  }
  build(t, e, i) {
    Fm(t, e, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return $m(t, e, i);
  }
}
function Nb(s, t) {
  return s in t;
}
class $b extends Rm {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (Nb(e, t)) {
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
    return Oc();
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
const Bb = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Vb = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Hb(s, t, e = 1, i = 0, n = !0) {
  s.pathLength = 1;
  const r = n ? Bb : Vb;
  s[r.offset] = ht.transform(-i);
  const o = ht.transform(t), a = ht.transform(e);
  s[r.array] = `${o} ${a}`;
}
function Yb(s, {
  attrX: t,
  attrY: e,
  attrScale: i,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, c, h) {
  if (Fm(s, a, c), l) {
    s.style.viewBox && (s.attrs.viewBox = s.style.viewBox);
    return;
  }
  s.attrs = s.style, s.style = {};
  const { attrs: f, style: d } = s;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), e !== void 0 && (f.y = e), i !== void 0 && (f.scale = i), n !== void 0 && Hb(f, n, r, o, !1);
}
const Bm = /* @__PURE__ */ new Set([
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
]), Wb = (s) => typeof s == "string" && s.toLowerCase() === "svg";
function Ub(s, t, e, i) {
  Nm(s, t, void 0, i);
  for (const n in t.attrs)
    s.setAttribute(Bm.has(n) ? n : Pc(n), t.attrs[n]);
}
function qb(s, t, e) {
  const i = $m(s, t, e);
  for (const n in s)
    if (ii(s[n]) || ii(t[n])) {
      const r = lr.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      i[r] = s[n];
    }
  return i;
}
class Kb extends zm {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Oc;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (ur.has(e)) {
      const i = Am(e);
      return i && i.default || 0;
    }
    return e = Bm.has(e) ? e : Pc(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return qb(t, e, i);
  }
  build(t, e, i) {
    Yb(t, e, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, e, i, n) {
    Ub(t, e, i, n);
  }
  mount(t) {
    this.isSVGTag = Wb(t.tagName), super.mount(t);
  }
}
function Xb(s) {
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
  }, e = Om(s) && !$v(s) ? new Kb(t) : new Fb(t);
  e.mount(s), vo.set(s, e);
}
function Gb(s) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new $b(t);
  e.mount(s), vo.set(s, e);
}
function jb(s, t, e) {
  const i = ii(s) ? s : yo(s);
  return i.start(Im("", i, t, e)), i.animation;
}
function Zb(s, t) {
  return ii(s) || typeof s == "number" || typeof s == "string" && !Cc(t);
}
function Vm(s, t, e, i) {
  const n = [];
  if (Zb(s, t))
    n.push(jb(s, Cc(t) && t.default || t, e && (e.default || e)));
  else {
    const r = km(s, t, i), o = r.length;
    nn(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a];
      nn(l !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const c = l instanceof Element ? Xb : Gb;
      vo.has(l) || c(l);
      const h = vo.get(l), f = { ...e };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), n.push(...vb(h, { ...t, transition: f }, {}));
    }
  }
  return n;
}
function Qb(s, t, e) {
  const i = [];
  return Gv(s, t, e, { spring: _o }).forEach(({ keyframes: r, transition: o }, a) => {
    i.push(...Vm(a, r, o));
  }), i;
}
function Jb(s) {
  return Array.isArray(s) && s.some(Array.isArray);
}
function tw(s) {
  function t(e, i, n) {
    let r = [], o;
    if (Jb(e))
      r = Qb(e, i, s);
    else {
      const { onComplete: l, ...c } = n || {};
      typeof l == "function" && (o = l), r = Vm(e, i, c, s);
    }
    const a = new wv(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const ew = tw();
function bo(s, t) {
  return ew(s, t, { duration: 0 });
}
function Po(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(cc, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function kc(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const n = s[i];
    e.push(Po(n, t));
  }
  return Promise.all(e);
}
const iw = {
  listenForResize: !0
};
class Aw {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = Wt(e, iw), this.initialize(), e.listenForResize && window.addEventListener(Yi, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let n = [], r = 0;
      const o = st.all(t, "img");
      kc(o, !1).then(() => {
        o.forEach((a) => {
          const l = a.getBoundingClientRect(), c = this.getImgSizeInfo(a);
          if (e === null) {
            r = c.height, n.push(a), e = l.top;
            return;
          }
          e !== l.top ? (i.push({ elements: n, height: r }), n = [], r = c.height) : e === l.top ? c.height > r && (r = c.height) : r = c.height, n.push(a), e = l.top;
        }), n.length && i.push({ elements: n, height: r }), i.length && i.forEach((a) => {
          bo(a.elements, { minHeight: a.height });
        });
      });
    });
  }
  initialize() {
    this.canvases = st.all(this.container, "[data-eq-height-images]"), this.run();
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
const Hm = {
  onPin: (s) => {
    V.to(s.el, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, V.to(s.el, {
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
    s.opts.altBgColor && V.to(s.el, {
      duration: 0.2,
      backgroundColor: s.opts.altBgColor
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && V.to(s.el, {
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
}, nw = {
  el: "header[data-nav]",
  on: Di,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      V.timeline().set(s.el, { yPercent: -100 }).set(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      V.timeline().to(s.el, {
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
    ...Hm
  }
};
class Cw {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Wt(e, nw), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.opts.intersects && (this.intersectingElements = st.all("[data-intersect]")), window.addEventListener(Ba, () => {
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
      Na,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      $a,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Di, () => {
      let t = Vn;
      this.mainOpts.rafScroll || (t = "scroll"), window.addEventListener(t, this.redraw.bind(this), {
        capture: !1,
        passive: !0
      });
    }), this.app.registerCallback(
      po,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      Yi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Di, () => {
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
    return e = Wt(i, Hm, e.default || {}), e;
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
const sw = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class Pw {
  constructor(t, e) {
    this.app = t, this.opts = Wt(e, sw);
    const i = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    bo(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (bo(i, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const rw = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class Ow {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Wt(e, rw), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((r) => this.setupParallaxElement(r)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Vn, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
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
    const { element: i, factor: n, fadeContent: r, orientation: o } = t, a = i.getBoundingClientRect(), l = this.app.size.height, c = l / 2, u = (a.top + a.height / 2 - c) / l * n * 100;
    let m = 1;
    if (r) {
      const _ = a.top / l;
      _ <= 0 ? m = Math.max(0, 1 + _ * 1.5) : _ >= 0.7 && (m = Math.max(0, 1 - (_ - 0.7) * 3.33)), m = Math.max(0, Math.min(1, m));
    }
    let p = "";
    switch (o) {
      case "up":
        p = `translate3d(0, ${u}px, 0)`;
        break;
      case "down":
        p = `translate3d(0, ${-u}px, 0)`;
        break;
      case "left":
        p = `translate3d(${u}px, 0, 0)`;
        break;
      case "right":
        p = `translate3d(${-u}px, 0, 0)`;
        break;
      default:
        p = `translate3d(0, ${u}px, 0)`;
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
    window.removeEventListener(Vn, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: n } = t;
      i && (i.style.transform = "", i.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !i && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
V.registerPlugin(xo);
const ow = {
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
    s.slides.length > 1 ? V.to(s.el, {
      duration: 0.25,
      opacity: 1,
      onComplete: () => {
        t();
      }
    }) : V.to(s.el, {
      duration: 0.25,
      opacity: 1
    });
  }
};
class kw {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, ow), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), V.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      V.set(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? V.set(i, {
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
    this.app.registerCallback(Di, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Po(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    fo() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    const e = V.timeline();
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
    V.to(this.images, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
V.registerPlugin(xo);
const aw = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    V.to(s.videoDiv, {
      duration: 1,
      autoAlpha: 1
    });
  },
  onFadeInCover: (s) => {
    V.to(s.cover, {
      duration: 0.35,
      autoAlpha: 1
    });
  },
  onFadeOutCover: (s) => {
    V.set(s.cover, {
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
class Mw {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = Wt(e, aw), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), V.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = st.find(this.el, "[data-cover]"), this.cover && V.set(this.cover, { autoAlpha: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), V.set(this.videoDiv, {
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
    this.video.muted = !0, V.set(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && Po(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(po, () => {
      !this.video.playing && !fo() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (fo() ? V.set(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
    V.to(this.video, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
function Tl(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const lw = {
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
class Iw {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, lw), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
      i.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Di, () => {
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
    st.all(t, "[data-ll-image]").forEach((n) => this.swapImage(n)), st.all(t, "[data-ll-srcset]").forEach((n) => this.revealPicture(n));
  }
  initializeResizeObserver() {
    if (!this.opts.updateSizes)
      return;
    this.sizeObserver = new ResizeObserver((i) => {
      i.forEach((n) => {
        var c, h;
        const r = n.target;
        let o = ((h = (c = n.borderBoxSize) == null ? void 0 : c[0]) == null ? void 0 : h.inlineSize) || n.contentRect.width;
        o = Math.round(o), o < this.opts.minSize && (o = this.opts.minSize);
        const a = r.getAttribute("sizes"), l = `${o}px`;
        a !== l && (this.resizePending.set(r, o), this.rafId || (this.rafId = requestAnimationFrame(() => {
          this.flushSizeUpdates();
        })));
      });
    });
    const t = st.all(this.target, '[data-sizes="auto"]');
    new Set(t).forEach((i) => {
      this.sizeObserver.observe(i);
    });
  }
  flushSizeUpdates() {
    this.resizePending.forEach((t, e) => {
      const i = e.getAttribute("sizes"), n = `${Math.round(t)}px`;
      i !== n && (e.setAttribute("sizes", n), e.parentNode && Array.from(st.all(e.parentNode, "source")).forEach((r) => {
        r.getAttribute("sizes") !== n && r.setAttribute("sizes", n);
      }));
    }), this.resizePending.clear(), this.rafId = null;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (i, n) => {
        const r = st.all(i, "img");
        return new IntersectionObserver((o, a) => {
          o.forEach((l) => {
            (l.isIntersecting || l.intersectionRatio > 0) && (kc(r, !0).then(() => {
              Tl(i, zp);
            }), n.forEach((c) => {
              this.loadPicture(c), this.loadObserver.unobserve(c);
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
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), Tl(n, cc);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), Tl(e, Rp));
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
const uw = {
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
    s.app.scrollLock(), V.to(s.elements.wrapper, {
      duration: 0.5,
      opacity: 1
    });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && V.to(s.elements.caption, {
      duration: 0.45,
      opacity: 0
    }), V.to(
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
          V.to(s.elements.wrapper, {
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
class Dw {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, uw), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: V.timeline({ paused: !0 }),
      image: V.timeline({ paused: !0 })
    }, this.lightboxes.forEach((i) => {
      const n = i.getAttribute("data-lightbox"), r = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), l = i.getAttribute("data-lightbox-section") || "general";
      let c = i;
      this.opts.trigger && (c = st.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, l) || (this.sections[l] = []);
      const h = {
        href: n,
        alt: a,
        srcset: r
      }, f = this.sections[l].push(h) - 1;
      c.addEventListener("click", (d) => {
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
      V.set(o, { autoAlpha: 0 }), o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), Po(this.nextImage).then(() => {
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
V.registerPlugin(vs);
const cw = {
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
    r ? (V.set(r, { display: "block", opacity: 0 }), e && (V.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), V.to(e, { duration: 0.2, opacity: 0 })), i && V.to(i, { duration: 0.2, opacity: 0 }), n && V.to(n, { duration: 0.2, opacity: 0 }), V.to(r, {
      duration: 0.2,
      opacity: 1,
      onComplete: () => {
        window.location = s;
      }
    })) : (e && (V.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), V.to(e, { duration: 0.2, opacity: 0 })), i && V.to(i, { duration: 0.2, opacity: 0 }), n && V.to(n, { duration: 0.2, opacity: 0 }), V.to(e, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        window.location = s;
      }
    }));
  }
};
class Lw {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, cw);
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
      const c = this.normalizeHostname(o) === r;
      this.opts.openExternalInWindow && !c && i.setAttribute("target", "_blank"), i.addEventListener("click", (h) => {
        if (!(h.shiftKey || h.metaKey || h.ctrlKey) && (e && (e.style.display = "none"), c && a)) {
          const f = new URL(window.location.href), d = a.pathname === f.pathname && a.search === f.search;
          if (d && a.hash) {
            h.preventDefault();
            const u = a.hash, m = document.querySelector(u);
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
const hw = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    Yt.to(s, { opacity: 1, ease: "none" });
  }
};
class Rw {
  constructor(t, e, i) {
    this.opts = Wt(i, hw), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = st.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = st.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = st.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    Yt.set(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.setHeight(), this.fillText();
    const e = this.elements.$holder.offsetWidth, i = st.all(this.elements.$el, "[data-marquee-holder]"), n = e * i.length;
    this.duration = (e + n) / this.opts.speed, Yt.set(this.elements.$marquee, { width: n }), this.initializeTween(), st.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Yt.set(e, { clearProps: "all" }));
  }
  killTweens() {
    this.timeline && (this.timeline.kill(), this.timeline = null);
  }
  initializeTween() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      Yt.set(e, { position: "absolute", left: e.offsetWidth * i });
    }), this.timeline = Yt.timeline({ paused: !0 }), this.timeline.to(t, { xPercent: -100, ease: "none", duration: this.duration }, "standard").repeat(-1), this.timeline.totalProgress(this.opts.startProgress), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    this.playing = !0, Yt.killTweensOf(this.timeline), t ? (this.timeline.play(), Yt.to(this.timeline, {
      timeScale: 1,
      ease: "sine.in",
      duration: 0.8
    })) : (this.timeline.timeScale(1), this.timeline.play());
  }
  pause() {
    this.playing = !1, Yt.to(this.timeline, {
      timeScale: 0.01,
      onComplete: () => {
        this.timeline.pause();
      },
      duration: 0.8
    });
  }
  slowDown() {
    Yt.to(this.timeline, {
      timeScale: 0.5,
      duration: 0.8
    });
  }
  speedUp() {
    Yt.to(this.timeline, {
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
      this.opts.spacer && this.elements.$holder.appendChild(st.new(this.opts.spacer)[0]);
      const e = Math.max(Math.ceil(this.app.size.width / t) - 1, 2);
      for (let i = 0; i < e; i += 1)
        this.elements.$holder.append(this.elements.$item.cloneNode(!0)), this.opts.spacer && this.elements.$holder.appendChild(st.new(this.opts.spacer)[0]);
      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(!0));
    } else
      console.error(
        "no textWidth! probably image? Set width to elements inside holder",
        this.elements.$item
      );
  }
  setHeight() {
    const t = this.elements.$item.offsetHeight + this.opts.extraHeight;
    Yt.set(this.elements.$el, { height: t });
  }
}
const fw = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: (s) => {
    const t = V.timeline();
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
    document.body.classList.toggle("open-menu"), V.timeline().call(() => {
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
class zw {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, fw), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
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
      lc
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      uc
    );
    window.dispatchEvent(t);
  }
}
V.registerPlugin(xo);
const dw = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Di,
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
class Fw {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = Wt(e, dw), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), fo() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    this.parseChildren(t), this.opts.uniqueIds && this.addIds(t), this.opts.addIndexes && this.addIndexes(t);
    const e = V.timeline({
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
    const e = st.all(t, "[data-moonwalk-children]");
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
      n.sectionTargets ? t.children = this.orderChildren(
        t.el.querySelectorAll(n.sectionTargets)
      ) : t.children = this.orderChildren(t.el.children);
      const r = n.alphaTween ? {
        ...n.transition.from,
        opacity: 0
      } : n.transition.from;
      V.set(t.children, r);
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? V.set(t.el, n.transition.from) : console.error(
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
              const l = i[t.stage.name], c = {
                ...l.transition.to,
                duration: l.duration
              };
              t.timeline.to(a.target, c, 0), t.stage.firstTween = !0;
            }
            if (t.name) {
              const l = i[t.name];
              l || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), typeof l.alphaTween == "object" ? l.alphaTween.duration = l.alphaTween.duration ? l.alphaTween.duration : l.duration : l.alphaTween === !0 && (l.alphaTween = {
                duration: l.duration,
                ease: "sine.in"
              }), l.startDelay && (l.transition.to = {
                ...l.transition.to,
                delay: l.startDelay
              }), t.timeline.staggerTo(
                t.children,
                l.duration,
                l.transition.to,
                l.interval,
                0
              ), l.alphaTween && t.timeline.staggerTo(
                t.children,
                l.alphaTween.duration,
                {
                  opacity: 1,
                  ease: l.alphaTween.ease,
                  delay: l.startDelay || 0
                },
                l.interval,
                0
              );
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
      e === this.sections.length - 1 ? n = "0px" : n = t.rootMargin, this.setupNamesAndStages(i), i.name || (i.observer = this.observer(i, n)), i.elements = i.el.querySelectorAll("[data-moonwalk]"), i.elements.forEach((r) => i.observer.observe(r));
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
          const a = n[o], l = a.boundingClientRect, c = window.innerHeight, h = window.innerWidth;
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
              l.bottom <= 0 ? d.direction = "top" : l.top >= c ? d.direction = "bottom" : l.right <= 0 ? d.direction = "left" : l.left >= h && (d.direction = "right");
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
            t.running = !0, a.target.dataset.moonwalkId && console.debug("-- intersecting", a.target.dataset.moonwalkId);
            const l = a.target.getAttribute("data-moonwalk"), c = l.length ? i.walks[l] : i.walks.default, { duration: h, transition: f, interval: d, startDelay: u } = c;
            let { alphaTween: m } = c, p = (h - d) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof m == "object" && m !== null ? m.duration = m.duration ? m.duration : h : m === !0 && (m = {
              duration: h,
              ease: "sine.in"
            });
            const _ = f ? this.tweenJS : this.tweenCSS, b = () => {
              _(
                t,
                a.target,
                h,
                d,
                f,
                p,
                m
              );
            }, A = () => {
              u ? V.delayedCall(u, b) : b();
            };
            if (a.target.tagName === "IMG")
              Po(a.target).then(() => A());
            else if (a.target.hasAttribute("data-placeholder"))
              A();
            else {
              const C = a.target.querySelectorAll("img");
              C.length ? Array.from(C).every(
                (y) => y.hasAttribute("data-ll-placeholder")
              ) ? A() : kc(C).then(() => A()) : A();
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
    let l;
    const c = i - o;
    if (st.hasAttribute(e, "data-moonwalked"))
      return;
    if (t.timeline.isActive() && t.timeline.recent()) {
      const f = t.timeline.time(), d = t.timeline.recent().time(), u = t.timeline.recent().endTime();
      d > c ? l = () => t.timeline.time() : f + o * -1 < u ? l = () => `>${o}` : l = () => t.timeline.time();
    } else
      l = () => ">";
    V.set(e, r.from);
    const h = {
      ...r.to,
      duration: i,
      onComplete: () => e.setAttribute("data-moonwalked", "")
    };
    t.timeline.to(e, h, l()), a && t.timeline.to(
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
  tweenCSS(t, e, i, n, r, o) {
    let a;
    const l = i - o * -1;
    if (!st.hasAttribute(e, "data-moonwalked")) {
      if (t.timeline.isActive() && t.timeline.recent()) {
        const c = t.timeline.time(), h = t.timeline.recent().time(), f = t.timeline.recent().endTime();
        h > l ? a = () => t.timeline.time() : c + o * -1 < f ? a = () => `>${o}` : a = () => t.timeline.time();
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
const pw = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, yr = [];
class Nw {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = Wt(i, pw), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), yr.includes(this) || yr.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
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
    } = this.trigger.getBoundingClientRect(), { offsetHeight: o, offsetWidth: a } = this.popover, l = this.orderedPositions.indexOf(this.position), c = {
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
    }, h = this.orderedPositions.slice(l).concat(this.orderedPositions.slice(0, l)).map((f) => c[f]).find((f) => (t || (this.popover.style.top = `${f.top}px`, this.popover.style.left = `${f.left}px`), st.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((f) => {
      this.popover.classList.remove(`${this.className}--${f}`);
    }), h ? (t && this.isVisible ? V.to(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? V.to(this.popover, {
      top: Math.max(0, c.bottom.top),
      left: Math.max(0, c.bottom.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, c.bottom.top)}px`, this.popover.style.left = `${Math.max(0, c.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = yr.indexOf(this);
    t !== -1 && yr.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    yr.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Vn, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(Vn, this.boundHandleScroll);
  }
}
const mw = {
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
    V.set(e.backdrop, { display: "block" }), V.to(e.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        V.fromTo(
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
    t && V.to(t, {
      duration: 0.3,
      opacity: 0,
      display: "none"
    }), V.to(s.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        s.backdrop.remove();
      }
    });
  }
};
class $w {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = Wt(i, mw), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), V.set(e, { opacity: 0, display: "none", zIndex: 4999 }), e.addEventListener("click", (i) => {
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
const gw = {
  onIntersect: (s, t) => {
  }
};
class Bw {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, gw), this.initialize();
  }
  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = st.all("[data-scrollspy-trigger]");
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
const _w = {};
class Vw {
  constructor(t, e = {}) {
    this.app = t, this.opts = Wt(e, _w), this.initialize();
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
    bo(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    bo(t, { height: e.clientHeight });
  }
}
const Ym = {
  onMainVisible: (s) => {
    V.to(s.el, {
      duration: 3,
      opacity: 1,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    V.to(s.el, {
      duration: 1,
      opacity: 0
    });
  },
  onPin: (s) => {
    V.to(s.auxEl, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, V.to(s.auxEl, {
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
}, yw = {
  el: "header[data-nav]",
  on: Di,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      V.set(s.el, { opacity: 0 });
    },
    enter: (s) => {
      V.timeline().set(s.auxEl, { yPercent: -100 }).set(s.lis, { opacity: 0 }).to(s.auxEl, 1, {
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
    ...Ym
  }
};
class Hw {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Wt(e, yw), this.mainOpts.pinOnOutline && window.addEventListener(Ba, () => {
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
      Vn,
      this.update.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Na, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      $a,
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
    return e = Wt(i, Ym, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      lc,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      uc,
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
class Yw {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} options - Configuration options
   * @param {Function} options.onOpen - Callback when toggle opens
   * @param {Function} options.onClose - Callback when toggle closes
   */
  constructor(t, e, i = {}) {
    this.open = !1, this.app = t, this.el = e, this.onOpen = i.onOpen, this.onClose = i.onClose, this.onBeforeOpen = i.onBeforeOpen, this.onBeforeClose = i.onBeforeClose, this.trigger = st.find(this.el, "[data-toggle-trigger]"), this.triggerTarget = this.trigger.dataset.toggleTrigger, this.group = this.el.dataset.toggleGroup, this.triggerTarget ? this.content = st.all(this.el, `[data-toggle-content="${this.triggerTarget}"]`) : this.content = st.all(this.el, "[data-toggle-content]"), this.triggerIcon = st.find(this.trigger, "span.icon"), this.trigger.addEventListener("click", this.onClick.bind(this));
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
    this.group && !this.open && this.closeOthersInGroup(), this.toggleState(), this.open ? (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), V.set(this.content, { height: "auto", display: "block" }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex()), V.from(this.content, {
      height: 0,
      ease: "power1.inOut",
      stagger: 0.1,
      onComplete: () => {
        this.content.forEach((t) => t.removeAttribute("data-toggle-hidden")), this.content.forEach((t) => t.setAttribute("data-toggle-visible", "")), this.onOpen && this.onOpen(this, this.getGroupIndex());
      }
    })) : (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.removeAttribute("data-toggle-trigger-active"), this.onBeforeClose && this.onBeforeClose(this, this.getGroupIndex()), V.to(this.content, {
      duration: 0.25,
      onComplete: () => {
        this.el.classList.toggle("open"), this.content.forEach((t) => t.removeAttribute("data-toggle-visible")), this.content.forEach((t) => t.setAttribute("data-toggle-hidden", "")), this.onClose && this.onClose(this, this.getGroupIndex());
      }
    }), V.to(this.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
  }
  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    !this.group || !this.app.togglers || this.app.togglers.forEach((t) => {
      t === this || t.group !== this.group || t.open && (t.open = !1, t.triggerIcon && t.triggerIcon.classList.remove("active"), t.trigger.removeAttribute("data-toggle-trigger-active"), t.el.classList.remove("open"), V.to(t.content, {
        duration: 0.25,
        onComplete: () => {
          t.content.forEach((e) => e.removeAttribute("data-toggle-visible")), t.content.forEach((e) => e.setAttribute("data-toggle-hidden", "")), t.onClose && t.onClose(t, t.getGroupIndex());
        }
      }), V.to(t.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
    });
  }
  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open ? this.open = !1 : this.open = !0;
  }
}
class Ww {
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
const Uw = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  bw as Application,
  Gh as Breakpoints,
  xo as CSSPlugin,
  ww as Cookies,
  xw as CoverOverlay,
  Tw as Dataloader,
  st as Dom,
  za as Draggable,
  Sw as Dropdown,
  Ew as EqualHeightElements,
  Aw as EqualHeightImages,
  vw as Events,
  Cw as FixedHeader,
  Pw as FooterReveal,
  kw as HeroSlider,
  Mw as HeroVideo,
  Ap as InertiaPlugin,
  Iw as Lazyload,
  Dw as Lightbox,
  Lw as Links,
  Rw as Marquee,
  zw as MobileMenu,
  Fw as Moonwalk,
  Ow as Parallax,
  Nw as Popover,
  $w as Popup,
  Bw as ScrollSpy,
  vs as ScrollToPlugin,
  wt as ScrollTrigger,
  k_ as SplitText,
  Vw as StackedBoxes,
  Hw as StickyHeader,
  Yw as Toggler,
  Ww as Typography,
  Wt as _defaultsDeep,
  V as gsap,
  Po as imageIsLoaded,
  kc as imagesAreLoaded,
  Uw as loadScript,
  fo as prefersReducedMotion,
  Kh as rafCallback
};
