function lr(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function $h(s, t) {
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
var _i = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Jn = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, bu, Le, Zt, Ji = 1e8, Ye = 1 / Ji, Cl = Math.PI * 2, Vp = Cl / 4, Gp = 0, Hh = Math.sqrt, Kp = Math.cos, jp = Math.sin, Ae = function(t) {
  return typeof t == "string";
}, ee = function(t) {
  return typeof t == "function";
}, wr = function(t) {
  return typeof t == "number";
}, Tu = function(t) {
  return typeof t > "u";
}, ir = function(t) {
  return typeof t == "object";
}, ri = function(t) {
  return t !== !1;
}, xu = function() {
  return typeof window < "u";
}, Do = function(t) {
  return ee(t) || Ae(t);
}, Bh = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, We = Array.isArray, Pl = /(?:-?\.?\d|\.)+/gi, Yh = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Nn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, tl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Wh = /[+-]=-?[.\d]+/, qh = /[^,'"\[\]\s]+/gi, Zp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Qt, Ui, Al, Su, vi = {}, da = {}, Uh, Xh = function(t) {
  return (da = ts(t, vi)) && Wt;
}, Eu = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, to = function(t, e) {
  return !e && console.warn(t);
}, Vh = function(t, e) {
  return t && (vi[t] = e) && da && (da[t] = e) || vi;
}, eo = function() {
  return 0;
}, Qp = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ta = {
  suppressEvents: !0,
  kill: !1
}, Jp = {
  suppressEvents: !0
}, Cu = {}, Mr = [], Ol = {}, Gh, hi = {}, el = {}, yc = 30, ea = [], Pu = "", Au = function(t) {
  var e = t[0], i, r;
  if (ir(e) || ee(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ea.length; r-- && !ea[r].targetTest(e); )
      ;
    i = ea[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new yf(t[r], i))) || t.splice(r, 1);
  return t;
}, tn = function(t) {
  return t._gsap || Au(Ai(t))[0]._gsap;
}, Kh = function(t, e, i) {
  return (i = t[e]) && ee(i) ? t[e]() : Tu(i) && t.getAttribute && t.getAttribute(e) || i;
}, ni = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, se = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, pe = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Yn = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, tg = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, pa = function() {
  var t = Mr.length, e = Mr.slice(0), i, r;
  for (Ol = {}, Mr.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Ou = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, jh = function(t, e, i, r) {
  Mr.length && !Le && pa(), t.render(e, i, !!(Le && e < 0 && Ou(t))), Mr.length && !Le && pa();
}, Zh = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(qh).length < 2 ? e : Ae(t) ? t.trim() : t;
}, Qh = function(t) {
  return t;
}, yi = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, eg = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, ts = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, wc = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = ir(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, ga = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, Ds = function(t) {
  var e = t.parent || Qt, i = t.keyframes ? eg(We(t.keyframes)) : yi;
  if (ri(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, ig = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Jh = function(t, e, i, r, n) {
  var o = t[r], a;
  if (n)
    for (a = e[n]; o && o[n] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = o, e.parent = e._dp = t, e;
}, Na = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, o = e._next;
  n ? n._next = o : t[i] === e && (t[i] = o), o ? o._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Fr = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, en = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, rg = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, kl = function(t, e, i, r) {
  return t._startAt && (Le ? t._startAt.revert(ta) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, ng = function s(t) {
  return !t || t._ts && s(t.parent);
}, bc = function(t) {
  return t._repeat ? es(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, es = function(t, e) {
  var i = Math.floor(t = pe(t / e));
  return t && i === t ? i - 1 : i;
}, ma = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, za = function(t) {
  return t._end = pe(t._start + (t._tDur / Math.abs(t._ts || t._rts || Ye) || 0));
}, Fa = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = pe(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), za(t), i._dirty || en(i, t)), t;
}, tf = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = ma(t.rawTime(), e), (!e._dur || To(0, e.totalDuration(), i) - e._tTime > Ye) && e.render(i, !0)), en(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Gi = function(t, e, i, r) {
  return e.parent && Fr(e), e._start = pe((wr(i) ? i : i || t !== Qt ? Ei(t, i, e) : t._time) + e._delay), e._end = pe(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Jh(t, e, "_first", "_last", t._sort ? "_start" : 0), Il(e) || (t._recent = e), r || tf(t, e), t._ts < 0 && Fa(t, t._tTime), t;
}, ef = function(t, e) {
  return (vi.ScrollTrigger || Eu("scrollTrigger", e)) && vi.ScrollTrigger.create(e, t);
}, rf = function(t, e, i, r, n) {
  if (Iu(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !Le && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Gh !== di.frame)
    return Mr.push(t), t._lazy = [n, r], 1;
}, sg = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Il = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, og = function(t, e, i, r) {
  var n = t.ratio, o = e < 0 || !e && (!t._start && sg(t) && !(!t._initted && Il(t)) || (t._ts < 0 || t._dp._ts < 0) && !Il(t)) ? 0 : 1, a = t._rDelay, u = 0, c, h, f;
  if (a && t._repeat && (u = To(0, t._tDur, e), h = es(u, a), t._yoyo && h & 1 && (o = 1 - o), h !== es(t._tTime, a) && (n = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== n || Le || r || t._zTime === Ye || !e && t._zTime) {
    if (!t._initted && rf(t, e, r, i, u))
      return;
    for (f = t._zTime, t._zTime = e || (i ? Ye : 0), i || (i = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = u, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && kl(t, e, i, !0), t._onUpdate && !i && mi(t, "onUpdate"), u && t._repeat && !i && t.parent && mi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Fr(t, 1), !i && !Le && (mi(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, ag = function(t, e, i) {
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
}, is = function(t, e, i, r) {
  var n = t._repeat, o = pe(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = n ? n < 0 ? 1e10 : pe(o * (n + 1) + t._rDelay * n) : o, a > 0 && !r && Fa(t, t._tTime = t._tDur * a), t.parent && za(t), i || en(t.parent, t), t;
}, Tc = function(t) {
  return t instanceof Qe ? en(t) : is(t, t._dur);
}, lg = {
  _start: 0,
  endTime: eo,
  totalDuration: eo
}, Ei = function s(t, e, i) {
  var r = t.labels, n = t._recent || lg, o = t.duration() >= Ji ? n.endTime(!1) : t._dur, a, u, c;
  return Ae(e) && (isNaN(e) || e in r) ? (u = e.charAt(0), c = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = o), r[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), c && i && (u = u / 100 * (We(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + u : o + u)) : e == null ? o : +e;
}, Rs = function(t, e, i) {
  var r = wr(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), o = e[n], a, u;
  if (r && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, u = i; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = ri(u.vars.inherit) && u.parent;
    o.immediateRender = ri(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[n - 1];
  }
  return new de(e[0], o, e[n + 1]);
}, Yr = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, To = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, $e = function(t, e) {
  return !Ae(t) || !(e = Zp.exec(t)) ? "" : e[1];
}, ug = function(t, e, i) {
  return Yr(i, function(r) {
    return To(t, e, r);
  });
}, Ml = [].slice, nf = function(t, e) {
  return t && ir(t) && "length" in t && (!e && !t.length || t.length - 1 in t && ir(t[0])) && !t.nodeType && t !== Ui;
}, cg = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Ae(r) && !e || nf(r, 1) ? (n = i).push.apply(n, Ai(r)) : i.push(r);
  }) || i;
}, Ai = function(t, e, i) {
  return Zt && !e && Zt.selector ? Zt.selector(t) : Ae(t) && !i && (Al || !rs()) ? Ml.call((e || Su).querySelectorAll(t), 0) : We(t) ? cg(t, i) : nf(t) ? Ml.call(t, 0) : t ? [t] : [];
}, Ll = function(t) {
  return t = Ai(t)[0] || to("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Ai(e, i.querySelectorAll ? i : i === t ? to("Invalid scope") || Su.createElement("div") : t);
  };
}, sf = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, of = function(t) {
  if (ee(t))
    return t;
  var e = ir(t) ? t : {
    each: t
  }, i = rn(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, o = {}, a = r > 0 && r < 1, u = isNaN(r) || a, c = e.axis, h = r, f = r;
  return Ae(r) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && u && (h = r[0], f = r[1]), function(d, l, g) {
    var p = (g || e).length, v = o[p], x, E, C, S, b, I, P, O, R;
    if (!v) {
      if (R = e.grid === "auto" ? 0 : (e.grid || [1, Ji])[1], !R) {
        for (P = -1e8; P < (P = g[R++].getBoundingClientRect().left) && R < p; )
          ;
        R < p && R--;
      }
      for (v = o[p] = [], x = u ? Math.min(R, p) * h - 0.5 : r % R, E = R === Ji ? 0 : u ? p * f / R - 0.5 : r / R | 0, P = 0, O = Ji, I = 0; I < p; I++)
        C = I % R - x, S = E - (I / R | 0), v[I] = b = c ? Math.abs(c === "y" ? S : C) : Hh(C * C + S * S), b > P && (P = b), b < O && (O = b);
      r === "random" && sf(v), v.max = P - O, v.min = O, v.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (R > p ? p - 1 : c ? c === "y" ? p / R : R : Math.max(R, p / R)) || 0) * (r === "edges" ? -1 : 1), v.b = p < 0 ? n - p : n, v.u = $e(e.amount || e.each) || 0, i = i && p < 0 ? mf(i) : i;
    }
    return p = (v[d] - v.min) / v.max || 0, pe(v.b + (i ? i(p) : p) * v.v) + v.u;
  };
}, Dl = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = pe(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (wr(i) ? 0 : $e(i));
  };
}, af = function(t, e) {
  var i = We(t), r, n;
  return !i && ir(t) && (r = i = t.radius || Ji, t.values ? (t = Ai(t.values), (n = !wr(t[0])) && (r *= r)) : t = Dl(t.increment)), Yr(e, i ? ee(t) ? function(o) {
    return n = t(o), Math.abs(n - o) <= r ? n : o;
  } : function(o) {
    for (var a = parseFloat(n ? o.x : o), u = parseFloat(n ? o.y : 0), c = Ji, h = 0, f = t.length, d, l; f--; )
      n ? (d = t[f].x - a, l = t[f].y - u, d = d * d + l * l) : d = Math.abs(t[f] - a), d < c && (c = d, h = f);
    return h = !r || c <= r ? t[h] : o, n || h === o || wr(o) ? h : h + $e(o);
  } : Dl(t));
}, lf = function(t, e, i, r) {
  return Yr(We(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return We(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, hg = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}, fg = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || $e(i));
  };
}, dg = function(t, e, i) {
  return cf(t, e, 0, 1, i);
}, uf = function(t, e, i) {
  return Yr(i, function(r) {
    return t[~~e(r)];
  });
}, pg = function s(t, e, i) {
  var r = e - t;
  return We(t) ? uf(t, s(0, t.length), e) : Yr(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, gg = function s(t, e, i) {
  var r = e - t, n = r * 2;
  return We(t) ? uf(t, s(0, t.length - 1), e) : Yr(i, function(o) {
    return o = (n + (o - t) % n) % n || 0, t + (o > r ? n - o : o);
  });
}, io = function(t) {
  for (var e = 0, i = "", r, n, o, a; ~(r = t.indexOf("random(", e)); )
    o = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, o - r - 7).match(a ? qh : Pl), i += t.substr(e, r - e) + lf(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, cf = function(t, e, i, r, n) {
  var o = e - t, a = r - i;
  return Yr(n, function(u) {
    return i + ((u - t) / o * a || 0);
  });
}, mg = function s(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(l) {
    return (1 - l) * t + l * e;
  };
  if (!n) {
    var o = Ae(t), a = {}, u, c, h, f, d;
    if (i === !0 && (r = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (We(t) && !We(e)) {
      for (h = [], f = t.length, d = f - 2, c = 1; c < f; c++)
        h.push(s(t[c - 1], t[c]));
      f--, n = function(g) {
        g *= f;
        var p = Math.min(d, ~~g);
        return h[p](g - p);
      }, i = e;
    } else r || (t = ts(We(t) ? [] : {}, t));
    if (!h) {
      for (u in e)
        ku.call(a, t, u, "get", e[u]);
      n = function(g) {
        return Du(g, a) || (o ? t.p : t);
      };
    }
  }
  return Yr(i, n);
}, xc = function(t, e, i) {
  var r = t.labels, n = Ji, o, a, u;
  for (o in r)
    a = r[o] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (u = o, n = a);
  return u;
}, mi = function(t, e, i) {
  var r = t.vars, n = r[e], o = Zt, a = t._ctx, u, c, h;
  if (n)
    return u = r[e + "Params"], c = r.callbackScope || t, i && Mr.length && pa(), a && (Zt = a), h = u ? n.apply(c, u) : n.call(c), Zt = o, h;
}, bs = function(t) {
  return Fr(t), t.scrollTrigger && t.scrollTrigger.kill(!!Le), t.progress() < 1 && mi(t, "onInterrupt"), t;
}, zn, hf = [], ff = function(t) {
  if (t)
    if (t = !t.name && t.default || t, xu() || t.headless) {
      var e = t.name, i = ee(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: eo,
        render: Du,
        add: ku,
        kill: Mg,
        modifier: Ig,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Lu,
        aliases: {},
        register: 0
      };
      if (rs(), t !== r) {
        if (hi[e])
          return;
        yi(r, yi(ga(t, n), o)), ts(r.prototype, ts(n, ga(t, o))), hi[r.prop = e] = r, t.targetTest && (ea.push(r), Cu[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Vh(e, r), t.register && t.register(Wt, r, si);
    } else
      hf.push(t);
}, Ft = 255, Ts = {
  aqua: [0, Ft, Ft],
  lime: [0, Ft, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Ft],
  navy: [0, 0, 128],
  white: [Ft, Ft, Ft],
  olive: [128, 128, 0],
  yellow: [Ft, Ft, 0],
  orange: [Ft, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Ft, 0, 0],
  pink: [Ft, 192, 203],
  cyan: [0, Ft, Ft],
  transparent: [Ft, Ft, Ft, 0]
}, il = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Ft + 0.5 | 0;
}, df = function(t, e, i) {
  var r = t ? wr(t) ? [t >> 16, t >> 8 & Ft, t & Ft] : 0 : Ts.black, n, o, a, u, c, h, f, d, l, g;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Ts[t])
      r = Ts[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + n + n + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & Ft, r & Ft, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & Ft, t & Ft];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = g = t.match(Pl), !e)
        u = +r[0] % 360 / 360, c = +r[1] / 100, h = +r[2] / 100, o = h <= 0.5 ? h * (c + 1) : h + c - h * c, n = h * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = il(u + 1 / 3, n, o), r[1] = il(u, n, o), r[2] = il(u - 1 / 3, n, o);
      else if (~t.indexOf("="))
        return r = t.match(Yh), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Pl) || Ts.transparent;
    r = r.map(Number);
  }
  return e && !g && (n = r[0] / Ft, o = r[1] / Ft, a = r[2] / Ft, f = Math.max(n, o, a), d = Math.min(n, o, a), h = (f + d) / 2, f === d ? u = c = 0 : (l = f - d, c = h > 0.5 ? l / (2 - f - d) : l / (f + d), u = f === n ? (o - a) / l + (o < a ? 6 : 0) : f === o ? (a - n) / l + 2 : (n - o) / l + 4, u *= 60), r[0] = ~~(u + 0.5), r[1] = ~~(c * 100 + 0.5), r[2] = ~~(h * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, pf = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Lr).forEach(function(n) {
    var o = n.match(Nn) || [];
    e.push.apply(e, o), i.push(r += o.length + 1);
  }), e.c = i, e;
}, Sc = function(t, e, i) {
  var r = "", n = (t + r).match(Lr), o = e ? "hsla(" : "rgba(", a = 0, u, c, h, f;
  if (!n)
    return t;
  if (n = n.map(function(d) {
    return (d = df(d, e, 1)) && o + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = pf(t), u = i.c, u.join(r) !== h.c.join(r)))
    for (c = t.replace(Lr, "1").split(Nn), f = c.length - 1; a < f; a++)
      r += c[a] + (~u.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
  if (!c)
    for (c = t.split(Lr), f = c.length - 1; a < f; a++)
      r += c[a] + n[a];
  return r + c[f];
}, Lr = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Ts)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), _g = /hsl[a]?\(/, gf = function(t) {
  var e = t.join(" "), i;
  if (Lr.lastIndex = 0, Lr.test(e))
    return i = _g.test(e), t[1] = Sc(t[1], i), t[0] = Sc(t[0], i, pf(t[1])), !0;
}, ro, di = function() {
  var s = Date.now, t = 500, e = 33, i = s(), r = i, n = 1e3 / 240, o = n, a = [], u, c, h, f, d, l, g = function p(v) {
    var x = s() - r, E = v === !0, C, S, b, I;
    if ((x > t || x < 0) && (i += x - e), r += x, b = r - i, C = b - o, (C > 0 || E) && (I = ++f.frame, d = b - f.time * 1e3, f.time = b = b / 1e3, o += C + (C >= n ? 4 : n - C), S = 1), E || (u = c(p)), S)
      for (l = 0; l < a.length; l++)
        a[l](b, d, I, v);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(v) {
      return d / (1e3 / (v || 60));
    },
    wake: function() {
      Uh && (!Al && xu() && (Ui = Al = window, Su = Ui.document || {}, vi.gsap = Wt, (Ui.gsapVersions || (Ui.gsapVersions = [])).push(Wt.version), Xh(da || Ui.GreenSockGlobals || !Ui.gsap && Ui || {}), hf.forEach(ff)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && f.sleep(), c = h || function(v) {
        return setTimeout(v, o - f.time * 1e3 + 1 | 0);
      }, ro = 1, g(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(u), ro = 0, c = eo;
    },
    lagSmoothing: function(v, x) {
      t = v || 1 / 0, e = Math.min(x || 33, t);
    },
    fps: function(v) {
      n = 1e3 / (v || 240), o = f.time * 1e3 + n;
    },
    add: function(v, x, E) {
      var C = x ? function(S, b, I, P) {
        v(S, b, I, P), f.remove(C);
      } : v;
      return f.remove(v), a[E ? "unshift" : "push"](C), rs(), C;
    },
    remove: function(v, x) {
      ~(x = a.indexOf(v)) && a.splice(x, 1) && l >= x && l--;
    },
    _listeners: a
  }, f;
}(), rs = function() {
  return !ro && di.wake();
}, Et = {}, vg = /^[\d.\-M][\d.\-,\s]/, yg = /["']/g, wg = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, o = i.length, a, u, c; n < o; n++)
    u = i[n], a = n !== o - 1 ? u.lastIndexOf(",") : u.length, c = u.substr(0, a), e[r] = isNaN(c) ? c.replace(yg, "").trim() : +c, r = u.substr(a + 1).trim();
  return e;
}, bg = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, Tg = function(t) {
  var e = (t + "").split("("), i = Et[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [wg(e[1])] : bg(t).split(",").map(Zh)) : Et._CE && vg.test(t) ? Et._CE("", t) : i;
}, mf = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, _f = function s(t, e) {
  for (var i = t._first, r; i; )
    i instanceof Qe ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, rn = function(t, e) {
  return t && (ee(t) ? t : Et[t] || Tg(t)) || e;
}, wn = function(t, e, i, r) {
  i === void 0 && (i = function(u) {
    return 1 - e(1 - u);
  }), r === void 0 && (r = function(u) {
    return u < 0.5 ? e(u * 2) / 2 : 1 - e((1 - u) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, o;
  return ni(t, function(a) {
    Et[a] = vi[a] = n, Et[o = a.toLowerCase()] = i;
    for (var u in n)
      Et[o + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = Et[a + "." + u] = n[u];
  }), n;
}, vf = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, rl = function s(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = n / Cl * (Math.asin(1 / r) || 0), a = function(h) {
    return h === 1 ? 1 : r * Math.pow(2, -10 * h) * jp((h - o) * n) + 1;
  }, u = t === "out" ? a : t === "in" ? function(c) {
    return 1 - a(1 - c);
  } : vf(a);
  return n = Cl / n, u.config = function(c, h) {
    return s(t, c, h);
  }, u;
}, nl = function s(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : vf(i);
  return r.config = function(n) {
    return s(t, n);
  }, r;
};
ni("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  wn(s + ",Power" + (e - 1), t ? function(i) {
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
wn("Elastic", rl("in"), rl("out"), rl());
(function(s, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  wn("Bounce", function(o) {
    return 1 - n(1 - o);
  }, n);
})(7.5625, 2.75);
wn("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
wn("Circ", function(s) {
  return -(Hh(1 - s * s) - 1);
});
wn("Sine", function(s) {
  return s === 1 ? 1 : -Kp(s * Vp) + 1;
});
wn("Back", nl("in"), nl("out"), nl());
Et.SteppedEase = Et.steps = vi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, o = 1 - Ye;
    return function(a) {
      return ((r * To(0, o, a) | 0) + n) * i;
    };
  }
};
Jn.ease = Et["quad.out"];
ni("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Pu += s + "," + s + "Params,";
});
var yf = function(t, e) {
  this.id = Gp++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Kh, this.set = e ? e.getSetter : Lu;
}, no = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, is(this, +e.duration, 1, 1), this.data = e.data, Zt && (this._ctx = Zt, Zt.data.push(this)), ro || di.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, is(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (rs(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Fa(this, i), !n._dp || n.parent || tf(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Gi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === Ye || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), jh(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + bc(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + bc(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? es(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? ma(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(To(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), za(this), rg(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (rs(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Ye && (this._tTime -= Ye)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && Gi(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ri(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ma(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Jp);
    var r = Le;
    return Le = i, Ou(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Le = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Tc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Tc(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(Ei(this, i), ri(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, ri(r)), this._dur || (this._zTime = -1e-8), this;
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
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - Ye);
  }, t.eventCallback = function(i, r, n) {
    var o = this.vars;
    return arguments.length > 1 ? (r ? (o[i] = r, n && (o[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete o[i], this) : o[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var o = ee(i) ? i : Qh, a = function() {
        var c = r.then;
        r.then = null, ee(o) && (o = o(r)) && (o.then || o === r) && (r.then = c), n(o), r.then = c;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    bs(this);
  }, s;
}();
yi(no.prototype, {
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
var Qe = /* @__PURE__ */ function(s) {
  $h(t, s);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = s.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = ri(i.sortChildren), Qt && Gi(i.parent || Qt, lr(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && ef(lr(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, o) {
    return Rs(0, arguments, this), this;
  }, e.from = function(r, n, o) {
    return Rs(1, arguments, this), this;
  }, e.fromTo = function(r, n, o, a) {
    return Rs(2, arguments, this), this;
  }, e.set = function(r, n, o) {
    return n.duration = 0, n.parent = this, Ds(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new de(r, n, Ei(this, o), 1), this;
  }, e.call = function(r, n, o) {
    return Gi(this, de.delayedCall(0, r, n), o);
  }, e.staggerTo = function(r, n, o, a, u, c, h) {
    return o.duration = n, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = h, o.parent = this, new de(r, o, Ei(this, u)), this;
  }, e.staggerFrom = function(r, n, o, a, u, c, h) {
    return o.runBackwards = 1, Ds(o).immediateRender = ri(o.immediateRender), this.staggerTo(r, n, o, a, u, c, h);
  }, e.staggerFromTo = function(r, n, o, a, u, c, h, f) {
    return a.startAt = o, Ds(a).immediateRender = ri(a.immediateRender), this.staggerTo(r, n, a, u, c, h, f);
  }, e.render = function(r, n, o) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, h = r <= 0 ? 0 : pe(r), f = this._zTime < 0 != r < 0 && (this._initted || !c), d, l, g, p, v, x, E, C, S, b, I, P;
    if (this !== Qt && h > u && r >= 0 && (h = u), h !== this._tTime || o || f) {
      if (a !== this._time && c && (h += this._time - a, r += this._time - a), d = h, S = this._start, C = this._ts, x = !C, f && (c || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (I = this._yoyo, v = c + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(v * 100 + r, n, o);
        if (d = pe(h % v), h === u ? (p = this._repeat, d = c) : (b = pe(h / v), p = ~~b, p && p === b && (d = c, p--), d > c && (d = c)), b = es(this._tTime, v), !a && this._tTime && b !== p && this._tTime - b * v - this._dur <= 0 && (b = p), I && p & 1 && (d = c - d, P = 1), p !== b && !this._lock) {
          var O = I && b & 1, R = O === (I && p & 1);
          if (p < b && (O = !O), a = O ? 0 : h % c ? c : h, this._lock = 1, this.render(a || (P ? 0 : pe(p * v)), n, !c)._lock = 0, this._tTime = h, !n && this.parent && mi(this, "onRepeat"), this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1), a && a !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, u = this._tDur, R && (this._lock = 2, a = O ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !P && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          _f(this, P);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (E = ag(this, pe(a), pe(d)), E && (h -= d - (d = E._start))), this._tTime = h, this._time = d, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && !n && !b && (mi(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && r >= 0)
        for (l = this._first; l; ) {
          if (g = l._next, (l._act || d >= l._start) && l._ts && E !== l) {
            if (l.parent !== this)
              return this.render(r, n, o);
            if (l.render(l._ts > 0 ? (d - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (d - l._start) * l._ts, n, o), d !== this._time || !this._ts && !x) {
              E = 0, g && (h += this._zTime = -1e-8);
              break;
            }
          }
          l = g;
        }
      else {
        l = this._last;
        for (var z = r < 0 ? r : d; l; ) {
          if (g = l._prev, (l._act || z <= l._end) && l._ts && E !== l) {
            if (l.parent !== this)
              return this.render(r, n, o);
            if (l.render(l._ts > 0 ? (z - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (z - l._start) * l._ts, n, o || Le && Ou(l)), d !== this._time || !this._ts && !x) {
              E = 0, g && (h += this._zTime = z ? -1e-8 : Ye);
              break;
            }
          }
          l = g;
        }
      }
      if (E && !n && (this.pause(), E.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = S, za(this), this.render(r, n, o);
      this._onUpdate && !n && mi(this, "onUpdate", !0), (h === u && this._tTime >= this.totalDuration() || !h && a) && (S === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((r || !c) && (h === u && this._ts > 0 || !h && this._ts < 0) && Fr(this, 1), !n && !(r < 0 && !a) && (h || a || !u) && (mi(this, h === u && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var o = this;
    if (wr(n) || (n = Ei(this, n, r)), !(r instanceof no)) {
      if (We(r))
        return r.forEach(function(a) {
          return o.add(a, n);
        }), this;
      if (Ae(r))
        return this.addLabel(r, n);
      if (ee(r))
        r = de.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? Gi(this, r, n) : this;
  }, e.getChildren = function(r, n, o, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), o === void 0 && (o = !0), a === void 0 && (a = -1e8);
    for (var u = [], c = this._first; c; )
      c._start >= a && (c instanceof de ? n && u.push(c) : (o && u.push(c), r && u.push.apply(u, c.getChildren(!0, n, o)))), c = c._next;
    return u;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
      if (n[o].vars.id === r)
        return n[o];
  }, e.remove = function(r) {
    return Ae(r) ? this.removeLabel(r) : ee(r) ? this.killTweensOf(r) : (r.parent === this && Na(this, r), r === this._recent && (this._recent = this._last), en(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = pe(di.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), s.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = Ei(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, o) {
    var a = de.delayedCall(0, n || eo, o);
    return a.data = "isPause", this._hasPause = 1, Gi(this, a, Ei(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = Ei(this, r); n; )
      n._start === r && n.data === "isPause" && Fr(n), n = n._next;
  }, e.killTweensOf = function(r, n, o) {
    for (var a = this.getTweensOf(r, o), u = a.length; u--; )
      Cr !== a[u] && a[u].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var o = [], a = Ai(r), u = this._first, c = wr(n), h; u; )
      u instanceof de ? tg(u._targets, a) && (c ? (!Cr || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && o.push(u) : (h = u.getTweensOf(a, n)).length && o.push.apply(o, h), u = u._next;
    return o;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var o = this, a = Ei(o, r), u = n, c = u.startAt, h = u.onStart, f = u.onStartParams, d = u.immediateRender, l, g = de.to(o, yi({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || Ye,
      onStart: function() {
        if (o.pause(), !l) {
          var v = n.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          g._dur !== v && is(g, v, 0, 1).render(g._time, !0, !0), l = 1;
        }
        h && h.apply(g, f || []);
      }
    }, n));
    return d ? g.render(0) : g;
  }, e.tweenFromTo = function(r, n, o) {
    return this.tweenTo(n, yi({
      startAt: {
        time: Ei(this, r)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), xc(this, Ei(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), xc(this, Ei(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + Ye);
  }, e.shiftChildren = function(r, n, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, u = this.labels, c; a; )
      a._start >= o && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (c in u)
        u[c] >= o && (u[c] += r);
    return en(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return s.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, o; n; )
      o = n._next, this.remove(n), n = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), en(this);
  }, e.totalDuration = function(r) {
    var n = 0, o = this, a = o._last, u = Ji, c, h, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
    if (o._dirty) {
      for (f = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), h = a._start, h > u && o._sort && a._ts && !o._lock ? (o._lock = 1, Gi(o, a, h - a._delay, 1)._lock = 0) : u = h, h < 0 && a._ts && (n -= h, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), u = 0), a._end > n && a._ts && (n = a._end), a = c;
      is(o, o === Qt && o._time > n ? o._time : n, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(r) {
    if (Qt._ts && (jh(Qt, ma(r, Qt)), Gh = di.frame), di.frame >= yc) {
      yc += _i.autoSleep || 120;
      var n = Qt._first;
      if ((!n || !n._ts) && _i.autoSleep && di._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || di.sleep();
      }
    }
  }, t;
}(no);
yi(Qe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var xg = function(t, e, i, r, n, o, a) {
  var u = new si(this._pt, t, e, 0, 1, Ef, null, n), c = 0, h = 0, f, d, l, g, p, v, x, E;
  for (u.b = i, u.e = r, i += "", r += "", (x = ~r.indexOf("random(")) && (r = io(r)), o && (E = [i, r], o(E, t, e), i = E[0], r = E[1]), d = i.match(tl) || []; f = tl.exec(r); )
    g = f[0], p = r.substring(c, f.index), l ? l = (l + 1) % 5 : p.substr(-5) === "rgba(" && (l = 1), g !== d[h++] && (v = parseFloat(d[h - 1]) || 0, u._pt = {
      _next: u._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: v,
      c: g.charAt(1) === "=" ? Yn(v, g) - v : parseFloat(g) - v,
      m: l && l < 4 ? Math.round : 0
    }, c = tl.lastIndex);
  return u.c = c < r.length ? r.substring(c, r.length) : "", u.fp = a, (Wh.test(r) || x) && (u.e = 0), this._pt = u, u;
}, ku = function(t, e, i, r, n, o, a, u, c, h) {
  ee(r) && (r = r(n || 0, t, o));
  var f = t[e], d = i !== "get" ? i : ee(f) ? c ? t[e.indexOf("set") || !ee(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : f, l = ee(f) ? c ? Ag : xf : Mu, g;
  if (Ae(r) && (~r.indexOf("random(") && (r = io(r)), r.charAt(1) === "=" && (g = Yn(d, r) + ($e(d) || 0), (g || g === 0) && (r = g))), !h || d !== r || Rl)
    return !isNaN(d * r) && r !== "" ? (g = new si(this._pt, t, e, +d || 0, r - (d || 0), typeof f == "boolean" ? kg : Sf, 0, l), c && (g.fp = c), a && g.modifier(a, this, t), this._pt = g) : (!f && !(e in t) && Eu(e, r), xg.call(this, t, e, d, r, l, u || _i.stringFilter, c));
}, Sg = function(t, e, i, r, n) {
  if (ee(t) && (t = Ns(t, n, e, i, r)), !ir(t) || t.style && t.nodeType || We(t) || Bh(t))
    return Ae(t) ? Ns(t, n, e, i, r) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Ns(t[a], n, e, i, r);
  return o;
}, wf = function(t, e, i, r, n, o) {
  var a, u, c, h;
  if (hi[t] && (a = new hi[t]()).init(n, a.rawVars ? e[t] : Sg(e[t], r, n, o, i), i, r, o) !== !1 && (i._pt = u = new si(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== zn))
    for (c = i._ptLookup[i._targets.indexOf(n)], h = a._props.length; h--; )
      c[a._props[h]] = u;
  return a;
}, Cr, Rl, Iu = function s(t, e, i) {
  var r = t.vars, n = r.ease, o = r.startAt, a = r.immediateRender, u = r.lazy, c = r.onUpdate, h = r.runBackwards, f = r.yoyoEase, d = r.keyframes, l = r.autoRevert, g = t._dur, p = t._startAt, v = t._targets, x = t.parent, E = x && x.data === "nested" ? x.vars.targets : v, C = t._overwrite === "auto" && !bu, S = t.timeline, b, I, P, O, R, z, U, F, Y, tt, it, j, V;
  if (S && (!d || !n) && (n = "none"), t._ease = rn(n, Jn.ease), t._yEase = f ? mf(rn(f === !0 ? n : f, Jn.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !S && !!r.runBackwards, !S || d && !r.stagger) {
    if (F = v[0] ? tn(v[0]).harness : 0, j = F && r[F.prop], b = ga(r, Cu), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !l ? p.render(-1, !0) : p.revert(h && g ? ta : Qp), p._lazy = 0), o) {
      if (Fr(t._startAt = de.set(v, yi({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !p && ri(u),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return mi(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Le || !a && !l) && t._startAt.revert(ta), a && g && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && g && !p) {
      if (e && (a = !1), P = yi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ri(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, b), j && (P[F.prop] = j), Fr(t._startAt = de.set(v, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Le ? t._startAt.revert(ta) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, Ye, Ye);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = g && ri(u) || u && !g, I = 0; I < v.length; I++) {
      if (R = v[I], U = R._gsap || Au(v)[I]._gsap, t._ptLookup[I] = tt = {}, Ol[U.id] && Mr.length && pa(), it = E === v ? I : E.indexOf(R), F && (Y = new F()).init(R, j || b, t, it, E) !== !1 && (t._pt = O = new si(t._pt, R, Y.name, 0, 1, Y.render, Y, 0, Y.priority), Y._props.forEach(function(N) {
        tt[N] = O;
      }), Y.priority && (z = 1)), !F || j)
        for (P in b)
          hi[P] && (Y = wf(P, b, t, it, R, E)) ? Y.priority && (z = 1) : tt[P] = O = ku.call(t, R, P, "get", b[P], it, E, 0, r.stringFilter);
      t._op && t._op[I] && t.kill(R, t._op[I]), C && t._pt && (Cr = t, Qt.killTweensOf(R, tt, t.globalTime(e)), V = !t.parent, Cr = 0), t._pt && u && (Ol[U.id] = 1);
    }
    z && Cf(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !V, d && e <= 0 && S.render(Ji, !0, !0);
}, Eg = function(t, e, i, r, n, o, a, u) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, l;
  if (!c)
    for (c = t._ptCache[e] = [], d = t._ptLookup, l = t._targets.length; l--; ) {
      if (h = d[l][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Rl = 1, t.vars[e] = "+=0", Iu(t, a), Rl = 0, u ? to(e + " not eligible for reset") : 1;
      c.push(h);
    }
  for (l = c.length; l--; )
    f = c[l], h = f._pt || f, h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + o * h.c, h.c = i - h.s, f.e && (f.e = se(i) + $e(f.e)), f.b && (f.b = h.s + $e(f.b));
}, Cg = function(t, e) {
  var i = t[0] ? tn(t[0]).harness : 0, r = i && i.aliases, n, o, a, u;
  if (!r)
    return e;
  n = ts({}, e);
  for (o in r)
    if (o in n)
      for (u = r[o].split(","), a = u.length; a--; )
        n[u[a]] = n[o];
  return n;
}, Pg = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", o, a;
  if (We(e))
    a = i[t] || (i[t] = []), e.forEach(function(u, c) {
      return a.push({
        t: c / (e.length - 1) * 100,
        v: u,
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
}, Ns = function(t, e, i, r, n) {
  return ee(t) ? t.call(e, i, r, n) : Ae(t) && ~t.indexOf("random(") ? io(t) : t;
}, bf = Pu + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Tf = {};
ni(bf + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Tf[s] = 1;
});
var de = /* @__PURE__ */ function(s) {
  $h(t, s);
  function t(i, r, n, o) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = s.call(this, o ? r : Ds(r)) || this;
    var u = a.vars, c = u.duration, h = u.delay, f = u.immediateRender, d = u.stagger, l = u.overwrite, g = u.keyframes, p = u.defaults, v = u.scrollTrigger, x = u.yoyoEase, E = r.parent || Qt, C = (We(i) || Bh(i) ? wr(i[0]) : "length" in r) ? [i] : Ai(i), S, b, I, P, O, R, z, U;
    if (a._targets = C.length ? Au(C) : to("GSAP target " + i + " not found. https://gsap.com", !_i.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = l, g || d || Do(c) || Do(h)) {
      if (r = a.vars, S = a.timeline = new Qe({
        data: "nested",
        defaults: p || {},
        targets: E && E.data === "nested" ? E.vars.targets : C
      }), S.kill(), S.parent = S._dp = lr(a), S._start = 0, d || Do(c) || Do(h)) {
        if (P = C.length, z = d && of(d), ir(d))
          for (O in d)
            ~bf.indexOf(O) && (U || (U = {}), U[O] = d[O]);
        for (b = 0; b < P; b++)
          I = ga(r, Tf), I.stagger = 0, x && (I.yoyoEase = x), U && ts(I, U), R = C[b], I.duration = +Ns(c, lr(a), b, R, C), I.delay = (+Ns(h, lr(a), b, R, C) || 0) - a._delay, !d && P === 1 && I.delay && (a._delay = h = I.delay, a._start += h, I.delay = 0), S.to(R, I, z ? z(b, R, C) : 0), S._ease = Et.none;
        S.duration() ? c = h = 0 : a.timeline = 0;
      } else if (g) {
        Ds(yi(S.vars.defaults, {
          ease: "none"
        })), S._ease = rn(g.ease || r.ease || "none");
        var F = 0, Y, tt, it;
        if (We(g))
          g.forEach(function(j) {
            return S.to(C, j, ">");
          }), S.duration();
        else {
          I = {};
          for (O in g)
            O === "ease" || O === "easeEach" || Pg(O, g[O], I, g.easeEach);
          for (O in I)
            for (Y = I[O].sort(function(j, V) {
              return j.t - V.t;
            }), F = 0, b = 0; b < Y.length; b++)
              tt = Y[b], it = {
                ease: tt.e,
                duration: (tt.t - (b ? Y[b - 1].t : 0)) / 100 * c
              }, it[O] = tt.v, S.to(C, it, F), F += it.duration;
          S.duration() < c && S.to({}, {
            duration: c - S.duration()
          });
        }
      }
      c || a.duration(c = S.duration());
    } else
      a.timeline = 0;
    return l === !0 && !bu && (Cr = lr(a), Qt.killTweensOf(C), Cr = 0), Gi(E, lr(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (f || !c && !g && a._start === pe(E._time) && ri(f) && ng(lr(a)) && E.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), v && ef(lr(a), v), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, o) {
    var a = this._time, u = this._tDur, c = this._dur, h = r < 0, f = r > u - Ye && !h ? u : r < Ye ? 0 : r, d, l, g, p, v, x, E, C, S;
    if (!c)
      og(this, r, n, o);
    else if (f !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, C = this.timeline, this._repeat) {
        if (p = c + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + r, n, o);
        if (d = pe(f % p), f === u ? (g = this._repeat, d = c) : (v = pe(f / p), g = ~~v, g && g === v ? (d = c, g--) : d > c && (d = c)), x = this._yoyo && g & 1, x && (S = this._yEase, d = c - d), v = es(this._tTime, p), d === a && !o && this._initted && g === v)
          return this._tTime = f, this;
        g !== v && (C && this._yEase && _f(C, x), this.vars.repeatRefresh && !x && !this._lock && d !== p && this._initted && (this._lock = o = 1, this.render(pe(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (rf(this, h ? r : d, o, n, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== v))
          return this;
        if (c !== this._dur)
          return this.render(r, n, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = E = (S || this._ease)(d / c), this._from && (this.ratio = E = 1 - E), !a && f && !n && !v && (mi(this, "onStart"), this._tTime !== f))
        return this;
      for (l = this._pt; l; )
        l.r(E, l.d), l = l._next;
      C && C.render(r < 0 ? r : C._dur * C._ease(d / this._dur), n, o) || this._startAt && (this._zTime = r), this._onUpdate && !n && (h && kl(this, r, n, o), mi(this, "onUpdate")), this._repeat && g !== v && this.vars.onRepeat && !n && this.parent && mi(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && kl(this, r, !0, !0), (r || !c) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Fr(this, 1), !n && !(h && !a) && (f || a || x) && (mi(this, f === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), s.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, o, a, u) {
    ro || di.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Iu(this, c), h = this._ease(c / this._dur), Eg(this, r, n, o, a, h, c, u) ? this.resetTo(r, n, o, a, 1) : (Fa(this, 0), this.parent || Jh(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? bs(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Le), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Cr && Cr.vars.overwrite !== !0)._first || bs(this), this.parent && o !== this.timeline.totalDuration() && is(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, u = r ? Ai(r) : a, c = this._ptLookup, h = this._pt, f, d, l, g, p, v, x;
    if ((!n || n === "all") && ig(a, u))
      return n === "all" && (this._pt = 0), bs(this);
    for (f = this._op = this._op || [], n !== "all" && (Ae(n) && (p = {}, ni(n, function(E) {
      return p[E] = 1;
    }), n = p), n = Cg(a, n)), x = a.length; x--; )
      if (~u.indexOf(a[x])) {
        d = c[x], n === "all" ? (f[x] = n, g = d, l = {}) : (l = f[x] = f[x] || {}, g = n);
        for (p in g)
          v = d && d[p], v && ((!("kill" in v.d) || v.d.kill(p) === !0) && Na(this, v, "_pt"), delete d[p]), l !== "all" && (l[p] = 1);
      }
    return this._initted && !this._pt && h && bs(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Rs(1, arguments);
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
    return Rs(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, o) {
    return Qt.killTweensOf(r, n, o);
  }, t;
}(no);
yi(de.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ni("staggerTo,staggerFrom,staggerFromTo", function(s) {
  de[s] = function() {
    var t = new Qe(), e = Ml.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var Mu = function(t, e, i) {
  return t[e] = i;
}, xf = function(t, e, i) {
  return t[e](i);
}, Ag = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Og = function(t, e, i) {
  return t.setAttribute(e, i);
}, Lu = function(t, e) {
  return ee(t[e]) ? xf : Tu(t[e]) && t.setAttribute ? Og : Mu;
}, Sf = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, kg = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Ef = function(t, e) {
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
}, Du = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Ig = function(t, e, i, r) {
  for (var n = this._pt, o; n; )
    o = n._next, n.p === r && n.modifier(t, e, i), n = o;
}, Mg = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Na(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Lg = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, Cf = function(t) {
  for (var e = t._pt, i, r, n, o; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : o) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : o = e, e = i;
  }
  t._pt = n;
}, si = /* @__PURE__ */ function() {
  function s(e, i, r, n, o, a, u, c, h) {
    this.t = i, this.s = n, this.c = o, this.p = r, this.r = a || Sf, this.d = u || this, this.set = c || Mu, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Lg, this.m = i, this.mt = n, this.tween = r;
  }, s;
}();
ni(Pu + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return Cu[s] = 1;
});
vi.TweenMax = vi.TweenLite = de;
vi.TimelineLite = vi.TimelineMax = Qe;
Qt = new Qe({
  sortChildren: !1,
  defaults: Jn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
_i.stringFilter = gf;
var nn = [], ia = {}, Dg = [], Ec = 0, Rg = 0, sl = function(t) {
  return (ia[t] || Dg).map(function(e) {
    return e();
  });
}, Nl = function() {
  var t = Date.now(), e = [];
  t - Ec > 2 && (sl("matchMediaInit"), nn.forEach(function(i) {
    var r = i.queries, n = i.conditions, o, a, u, c;
    for (a in r)
      o = Ui.matchMedia(r[a]).matches, o && (u = 1), o !== n[a] && (n[a] = o, c = 1);
    c && (i.revert(), u && e.push(i));
  }), sl("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Ec = t, sl("matchMedia"));
}, Pf = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Ll(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Rg++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, r, n) {
    ee(i) && (n = r, r = i, i = ee);
    var o = this, a = function() {
      var c = Zt, h = o.selector, f;
      return c && c !== o && c.data.push(o), n && (o.selector = Ll(n)), Zt = o, f = r.apply(o, arguments), ee(f) && o._r.push(f), Zt = c, o.selector = h, o.isReverted = !1, f;
    };
    return o.last = a, i === ee ? a(o, function(u) {
      return o.add(null, u);
    }) : i ? o[i] = a : a;
  }, t.ignore = function(i) {
    var r = Zt;
    Zt = null, i(this), Zt = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof s ? i.push.apply(i, r.getTweens()) : r instanceof de && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? function() {
      for (var a = n.getTweens(), u = n.data.length, c; u--; )
        c = n.data[u], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(h) {
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
      }), u = n.data.length; u--; )
        c = n.data[u], c instanceof Qe ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof de) && c.revert && c.revert(i);
      n._r.forEach(function(h) {
        return h(i, n);
      }), n.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var o = nn.length; o--; )
        nn[o].id === this.id && nn.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), Ng = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Zt && Zt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, r, n) {
    ir(i) || (i = {
      matches: i
    });
    var o = new Pf(0, n || this.scope), a = o.conditions = {}, u, c, h;
    Zt && !o.selector && (o.selector = Zt.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = i;
    for (c in i)
      c === "all" ? h = 1 : (u = Ui.matchMedia(i[c]), u && (nn.indexOf(o) < 0 && nn.push(o), (a[c] = u.matches) && (h = 1), u.addListener ? u.addListener(Nl) : u.addEventListener("change", Nl)));
    return h && r(o, function(f) {
      return o.add(null, f);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, s;
}(), _a = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return ff(r);
    });
  },
  timeline: function(t) {
    return new Qe(t);
  },
  getTweensOf: function(t, e) {
    return Qt.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    Ae(t) && (t = Ai(t)[0]);
    var n = tn(t || {}).get, o = i ? Qh : Zh;
    return i === "native" && (i = ""), t && (e ? o((hi[e] && hi[e].get || n)(t, e, i, r)) : function(a, u, c) {
      return o((hi[a] && hi[a].get || n)(t, a, u, c));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Ai(t), t.length > 1) {
      var r = t.map(function(h) {
        return Wt.quickSetter(h, e, i);
      }), n = r.length;
      return function(h) {
        for (var f = n; f--; )
          r[f](h);
      };
    }
    t = t[0] || {};
    var o = hi[e], a = tn(t), u = a.harness && (a.harness.aliases || {})[e] || e, c = o ? function(h) {
      var f = new o();
      zn._pt = 0, f.init(t, i ? h + i : h, zn, 0, [t]), f.render(1, f), zn._pt && Du(1, zn);
    } : a.set(t, u);
    return o ? c : function(h) {
      return c(t, u, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = Wt.to(t, yi((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), o = function(u, c, h) {
      return n.resetTo(e, u, c, h);
    };
    return o.tween = n, o;
  },
  isTweening: function(t) {
    return Qt.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = rn(t.ease, Jn.ease)), wc(Jn, t || {});
  },
  config: function(t) {
    return wc(_i, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, o = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !hi[a] && !vi[a] && to(e + " effect requires " + a + " plugin.");
    }), el[e] = function(a, u, c) {
      return i(Ai(a), yi(u || {}, n), c);
    }, o && (Qe.prototype[e] = function(a, u, c) {
      return this.add(el[e](a, ir(u) ? u : (c = u) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    Et[t] = rn(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? rn(t, e) : Et;
  },
  getById: function(t) {
    return Qt.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new Qe(t), r, n;
    for (i.smoothChildTiming = ri(t.smoothChildTiming), Qt.remove(i), i._dp = 0, i._time = i._tTime = Qt._time, r = Qt._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof de && r.vars.onComplete === r._targets[0])) && Gi(i, r, r._start - r._delay), r = n;
    return Gi(Qt, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Pf(t, e) : Zt;
  },
  matchMedia: function(t) {
    return new Ng(t);
  },
  matchMediaRefresh: function() {
    return nn.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || Nl();
  },
  addEventListener: function(t, e) {
    var i = ia[t] || (ia[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = ia[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: pg,
    wrapYoyo: gg,
    distribute: of,
    random: lf,
    snap: af,
    normalize: dg,
    getUnit: $e,
    clamp: ug,
    splitColor: df,
    toArray: Ai,
    selector: Ll,
    mapRange: cf,
    pipe: hg,
    unitize: fg,
    interpolate: mg,
    shuffle: sf
  },
  install: Xh,
  effects: el,
  ticker: di,
  updateRoot: Qe.updateRoot,
  plugins: hi,
  globalTimeline: Qt,
  core: {
    PropTween: si,
    globals: Vh,
    Tween: de,
    Timeline: Qe,
    Animation: no,
    getCache: tn,
    _removeLinkedListItem: Na,
    reverting: function() {
      return Le;
    },
    context: function(t) {
      return t && Zt && (Zt.data.push(t), t._ctx = Zt), Zt;
    },
    suppressOverwrites: function(t) {
      return bu = t;
    }
  }
};
ni("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return _a[s] = de[s];
});
di.add(Qe.updateRoot);
zn = _a.to({}, {
  duration: 0
});
var zg = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Fg = function(t, e) {
  var i = t._targets, r, n, o;
  for (r in e)
    for (n = i.length; n--; )
      o = t._ptLookup[n][r], o && (o = o.d) && (o._pt && (o = zg(o, r)), o && o.modifier && o.modifier(e[r], t, i[n], r));
}, ol = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, o) {
      o._onInit = function(a) {
        var u, c;
        if (Ae(n) && (u = {}, ni(n, function(h) {
          return u[h] = 1;
        }), n = u), e) {
          u = {};
          for (c in n)
            u[c] = e(n[c]);
          n = u;
        }
        Fg(a, n);
      };
    }
  };
}, Wt = _a.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var o, a, u;
    this.tween = i;
    for (o in e)
      u = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (u || 0) + "", e[o], r, n, 0, 0, o), a.op = o, a.b = u, this._props.push(o);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      Le ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, ol("roundProps", Dl), ol("modifiers"), ol("snap", af)) || _a;
de.version = Qe.version = Wt.version = "3.13.0";
Uh = 1;
xu() && rs();
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
var Cc, Pr, Wn, Ru, Zr, Pc, Nu, $g = function() {
  return typeof window < "u";
}, br = {}, Vr = 180 / Math.PI, qn = Math.PI / 180, En = Math.atan2, Ac = 1e8, zu = /([A-Z])/g, Hg = /(left|right|width|margin|padding|x)/i, Bg = /[\s,\(]\S/, Ki = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, zl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Yg = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Wg = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, qg = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Af = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, Of = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Ug = function(t, e, i) {
  return t.style[e] = i;
}, Xg = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Vg = function(t, e, i) {
  return t._gsap[e] = i;
}, Gg = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Kg = function(t, e, i, r, n) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(n, o);
}, jg = function(t, e, i, r, n) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(n, o);
}, Jt = "transform", oi = Jt + "Origin", Zg = function s(t, e) {
  var i = this, r = this.target, n = r.style, o = r._gsap;
  if (t in br && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ki[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = ur(r, a);
      }) : this.tfm[t] = o.x ? o[t] : ur(r, t), t === oi && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ki.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(Jt) >= 0)
      return;
    o.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(oi, e, "")), t = Jt;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, kf = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Qg = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, o;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(zu, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Nu(), (!n || !n.isStart) && !i[Jt] && (kf(i), r.zOrigin && i[oi] && (i[oi] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, If = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: Qg,
    save: Zg
  };
  return t._gsap || Wt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Mf, Fl = function(t, e) {
  var i = Pr.createElementNS ? Pr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Pr.createElement(t);
  return i && i.style ? i : Pr.createElement(t);
}, Oi = function s(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(zu, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && s(t, ns(e) || e, 1) || "";
}, Oc = "O,Moz,ms,Ms,Webkit".split(","), ns = function(t, e, i) {
  var r = e || Zr, n = r.style, o = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(Oc[o] + t in n); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Oc[o] : "") + t;
}, $l = function() {
  $g() && window.document && (Cc = window, Pr = Cc.document, Wn = Pr.documentElement, Zr = Fl("div") || {
    style: {}
  }, Fl("div"), Jt = ns(Jt), oi = Jt + "Origin", Zr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Mf = !!ns("perspective"), Nu = Wt.core.reverting, Ru = 1);
}, kc = function(t) {
  var e = t.ownerSVGElement, i = Fl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Wn.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Wn.removeChild(i), n;
}, Ic = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Lf = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = kc(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = kc(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ic(t, ["x", "cx", "x1"]) || 0,
    y: +Ic(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Df = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Lf(t));
}, fn = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in br && e !== oi && (e = Jt), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(zu, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, Ar = function(t, e, i, r, n, o) {
  var a = new si(t._pt, e, i, 0, 1, o ? Of : Af);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Mc = {
  deg: 1,
  rad: 1,
  turn: 1
}, Jg = {
  grid: 1,
  flex: 1
}, $r = function s(t, e, i, r) {
  var n = parseFloat(i) || 0, o = (i + "").trim().substr((n + "").length) || "px", a = Zr.style, u = Hg.test(e), c = t.tagName.toLowerCase() === "svg", h = (c ? "client" : "offset") + (u ? "Width" : "Height"), f = 100, d = r === "px", l = r === "%", g, p, v, x;
  if (r === o || !n || Mc[r] || Mc[o])
    return n;
  if (o !== "px" && !d && (n = s(t, e, i, "px")), x = t.getCTM && Df(t), (l || o === "%") && (br[e] || ~e.indexOf("adius")))
    return g = x ? t.getBBox()[u ? "width" : "height"] : t[h], se(l ? n / g * f : n / 100 * g);
  if (a[u ? "width" : "height"] = f + (d ? o : r), p = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !c ? t : t.parentNode, x && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Pr || !p.appendChild) && (p = Pr.body), v = p._gsap, v && l && v.width && u && v.time === di.time && !v.uncache)
    return se(n / v.width * f);
  if (l && (e === "height" || e === "width")) {
    var E = t.style[e];
    t.style[e] = f + r, g = t[h], E ? t.style[e] = E : fn(t, e);
  } else
    (l || o === "%") && !Jg[Oi(p, "display")] && (a.position = Oi(t, "position")), p === t && (a.position = "static"), p.appendChild(Zr), g = Zr[h], p.removeChild(Zr), a.position = "absolute";
  return u && l && (v = tn(p), v.time = di.time, v.width = p[h]), se(d ? g * n / f : g && n ? f / g * n : 0);
}, ur = function(t, e, i, r) {
  var n;
  return Ru || $l(), e in Ki && e !== "transform" && (e = Ki[e], ~e.indexOf(",") && (e = e.split(",")[0])), br[e] && e !== "transform" ? (n = oo(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : ya(Oi(t, oi)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = va[e] && va[e](t, e, i) || Oi(t, e) || Kh(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? $r(t, e, n, i) + i : n;
}, tm = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = ns(e, t, 1), o = n && Oi(t, n, 1);
    o && o !== i ? (e = n, i = o) : e === "borderColor" && (i = Oi(t, "borderTopColor"));
  }
  var a = new si(this._pt, t.style, e, 0, 1, Ef), u = 0, c = 0, h, f, d, l, g, p, v, x, E, C, S, b;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = Oi(t, r.substring(4, r.indexOf(")")))), r === "auto" && (p = t.style[e], t.style[e] = r, r = Oi(t, e) || r, p ? t.style[e] = p : fn(t, e)), h = [i, r], gf(h), i = h[0], r = h[1], d = i.match(Nn) || [], b = r.match(Nn) || [], b.length) {
    for (; f = Nn.exec(r); )
      v = f[0], E = r.substring(u, f.index), g ? g = (g + 1) % 5 : (E.substr(-5) === "rgba(" || E.substr(-5) === "hsla(") && (g = 1), v !== (p = d[c++] || "") && (l = parseFloat(p) || 0, S = p.substr((l + "").length), v.charAt(1) === "=" && (v = Yn(l, v) + S), x = parseFloat(v), C = v.substr((x + "").length), u = Nn.lastIndex - C.length, C || (C = C || _i.units[e] || S, u === r.length && (r += C, a.e += C)), S !== C && (l = $r(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: E || c === 1 ? E : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: l,
        c: x - l,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < r.length ? r.substring(u, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? Of : Af;
  return Wh.test(r) && (a.e = 0), this._pt = a, a;
}, Lc = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, em = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Lc[i] || i, e[1] = Lc[r] || r, e.join(" ");
}, im = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, o = i._gsap, a, u, c;
    if (n === "all" || n === !0)
      r.cssText = "", u = 1;
    else
      for (n = n.split(","), c = n.length; --c > -1; )
        a = n[c], br[a] && (u = 1, a = a === "transformOrigin" ? oi : Jt), fn(i, a);
    u && (fn(i, Jt), o && (o.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", oo(i, 1), o.uncache = 1, kf(r)));
  }
}, va = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var o = t._pt = new si(t._pt, e, i, 0, 0, im);
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
}, so = [1, 0, 0, 1, 0, 0], Rf = {}, Nf = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Dc = function(t) {
  var e = Oi(t, Jt);
  return Nf(e) ? so : e.substr(7).match(Yh).map(se);
}, Fu = function(t, e) {
  var i = t._gsap || tn(t), r = t.style, n = Dc(t), o, a, u, c;
  return i.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? so : n) : (n === so && !t.offsetParent && t !== Wn && !i.svg && (u = r.display, r.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, a = t.nextElementSibling, Wn.appendChild(t)), n = Dc(t), u ? r.display = u : fn(t, "display"), c && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : Wn.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Hl = function(t, e, i, r, n, o) {
  var a = t._gsap, u = n || Fu(t, !0), c = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, l = u[0], g = u[1], p = u[2], v = u[3], x = u[4], E = u[5], C = e.split(" "), S = parseFloat(C[0]) || 0, b = parseFloat(C[1]) || 0, I, P, O, R;
  i ? u !== so && (P = l * v - g * p) && (O = S * (v / P) + b * (-p / P) + (p * E - v * x) / P, R = S * (-g / P) + b * (l / P) - (l * E - g * x) / P, S = O, b = R) : (I = Lf(t), S = I.x + (~C[0].indexOf("%") ? S / 100 * I.width : S), b = I.y + (~(C[1] || C[0]).indexOf("%") ? b / 100 * I.height : b)), r || r !== !1 && a.smooth ? (x = S - c, E = b - h, a.xOffset = f + (x * l + E * p) - x, a.yOffset = d + (x * g + E * v) - E) : a.xOffset = a.yOffset = 0, a.xOrigin = S, a.yOrigin = b, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[oi] = "0px 0px", o && (Ar(o, a, "xOrigin", c, S), Ar(o, a, "yOrigin", h, b), Ar(o, a, "xOffset", f, a.xOffset), Ar(o, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", S + " " + b);
}, oo = function(t, e) {
  var i = t._gsap || new yf(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, o = "px", a = "deg", u = getComputedStyle(t), c = Oi(t, oi) || "0", h, f, d, l, g, p, v, x, E, C, S, b, I, P, O, R, z, U, F, Y, tt, it, j, V, N, W, _, q, Z, G, et, Dt;
  return h = f = d = p = v = x = E = C = S = 0, l = g = 1, i.svg = !!(t.getCTM && Df(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (r[Jt] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[Jt] !== "none" ? u[Jt] : "")), r.scale = r.rotate = r.translate = "none"), P = Fu(t, i.svg), i.svg && (i.uncache ? (N = t.getBBox(), c = i.xOrigin - N.x + "px " + (i.yOrigin - N.y) + "px", V = "") : V = !e && t.getAttribute("data-svg-origin"), Hl(t, V || c, !!V || i.originIsAbsolute, i.smooth !== !1, P)), b = i.xOrigin || 0, I = i.yOrigin || 0, P !== so && (U = P[0], F = P[1], Y = P[2], tt = P[3], h = it = P[4], f = j = P[5], P.length === 6 ? (l = Math.sqrt(U * U + F * F), g = Math.sqrt(tt * tt + Y * Y), p = U || F ? En(F, U) * Vr : 0, E = Y || tt ? En(Y, tt) * Vr + p : 0, E && (g *= Math.abs(Math.cos(E * qn))), i.svg && (h -= b - (b * U + I * Y), f -= I - (b * F + I * tt))) : (Dt = P[6], G = P[7], _ = P[8], q = P[9], Z = P[10], et = P[11], h = P[12], f = P[13], d = P[14], O = En(Dt, Z), v = O * Vr, O && (R = Math.cos(-O), z = Math.sin(-O), V = it * R + _ * z, N = j * R + q * z, W = Dt * R + Z * z, _ = it * -z + _ * R, q = j * -z + q * R, Z = Dt * -z + Z * R, et = G * -z + et * R, it = V, j = N, Dt = W), O = En(-Y, Z), x = O * Vr, O && (R = Math.cos(-O), z = Math.sin(-O), V = U * R - _ * z, N = F * R - q * z, W = Y * R - Z * z, et = tt * z + et * R, U = V, F = N, Y = W), O = En(F, U), p = O * Vr, O && (R = Math.cos(O), z = Math.sin(O), V = U * R + F * z, N = it * R + j * z, F = F * R - U * z, j = j * R - it * z, U = V, it = N), v && Math.abs(v) + Math.abs(p) > 359.9 && (v = p = 0, x = 180 - x), l = se(Math.sqrt(U * U + F * F + Y * Y)), g = se(Math.sqrt(j * j + Dt * Dt)), O = En(it, j), E = Math.abs(O) > 2e-4 ? O * Vr : 0, S = et ? 1 / (et < 0 ? -et : et) : 0), i.svg && (V = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Nf(Oi(t, Jt)), V && t.setAttribute("transform", V))), Math.abs(E) > 90 && Math.abs(E) < 270 && (n ? (l *= -1, E += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, E += E <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = d + o, i.scaleX = se(l), i.scaleY = se(g), i.rotation = se(p) + a, i.rotationX = se(v) + a, i.rotationY = se(x) + a, i.skewX = E + a, i.skewY = C + a, i.transformPerspective = S + o, (i.zOrigin = parseFloat(c.split(" ")[2]) || !e && i.zOrigin || 0) && (r[oi] = ya(c)), i.xOffset = i.yOffset = 0, i.force3D = _i.force3D, i.renderTransform = i.svg ? nm : Mf ? zf : rm, i.uncache = 0, i;
}, ya = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, al = function(t, e, i) {
  var r = $e(e);
  return se(parseFloat(e) + parseFloat($r(t, "x", i + "px", r))) + r;
}, rm = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, zf(t, e);
}, qr = "0deg", ps = "0px", Ur = ") ", zf = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, o = i.x, a = i.y, u = i.z, c = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, l = i.skewY, g = i.scaleX, p = i.scaleY, v = i.transformPerspective, x = i.force3D, E = i.target, C = i.zOrigin, S = "", b = x === "auto" && t && t !== 1 || x === !0;
  if (C && (f !== qr || h !== qr)) {
    var I = parseFloat(h) * qn, P = Math.sin(I), O = Math.cos(I), R;
    I = parseFloat(f) * qn, R = Math.cos(I), o = al(E, o, P * R * -C), a = al(E, a, -Math.sin(I) * -C), u = al(E, u, O * R * -C + C);
  }
  v !== ps && (S += "perspective(" + v + Ur), (r || n) && (S += "translate(" + r + "%, " + n + "%) "), (b || o !== ps || a !== ps || u !== ps) && (S += u !== ps || b ? "translate3d(" + o + ", " + a + ", " + u + ") " : "translate(" + o + ", " + a + Ur), c !== qr && (S += "rotate(" + c + Ur), h !== qr && (S += "rotateY(" + h + Ur), f !== qr && (S += "rotateX(" + f + Ur), (d !== qr || l !== qr) && (S += "skew(" + d + ", " + l + Ur), (g !== 1 || p !== 1) && (S += "scale(" + g + ", " + p + Ur), E.style[Jt] = S || "translate(0, 0)";
}, nm = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, o = i.x, a = i.y, u = i.rotation, c = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, l = i.target, g = i.xOrigin, p = i.yOrigin, v = i.xOffset, x = i.yOffset, E = i.forceCSS, C = parseFloat(o), S = parseFloat(a), b, I, P, O, R;
  u = parseFloat(u), c = parseFloat(c), h = parseFloat(h), h && (h = parseFloat(h), c += h, u += h), u || c ? (u *= qn, c *= qn, b = Math.cos(u) * f, I = Math.sin(u) * f, P = Math.sin(u - c) * -d, O = Math.cos(u - c) * d, c && (h *= qn, R = Math.tan(c - h), R = Math.sqrt(1 + R * R), P *= R, O *= R, h && (R = Math.tan(h), R = Math.sqrt(1 + R * R), b *= R, I *= R)), b = se(b), I = se(I), P = se(P), O = se(O)) : (b = f, O = d, I = P = 0), (C && !~(o + "").indexOf("px") || S && !~(a + "").indexOf("px")) && (C = $r(l, "x", o, "px"), S = $r(l, "y", a, "px")), (g || p || v || x) && (C = se(C + g - (g * b + p * P) + v), S = se(S + p - (g * I + p * O) + x)), (r || n) && (R = l.getBBox(), C = se(C + r / 100 * R.width), S = se(S + n / 100 * R.height)), R = "matrix(" + b + "," + I + "," + P + "," + O + "," + C + "," + S + ")", l.setAttribute("transform", R), E && (l.style[Jt] = R);
}, sm = function(t, e, i, r, n) {
  var o = 360, a = Ae(n), u = parseFloat(n) * (a && ~n.indexOf("rad") ? Vr : 1), c = u - r, h = r + c + "deg", f, d;
  return a && (f = n.split("_")[1], f === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -360)), f === "cw" && c < 0 ? c = (c + o * Ac) % o - ~~(c / o) * o : f === "ccw" && c > 0 && (c = (c - o * Ac) % o - ~~(c / o) * o)), t._pt = d = new si(t._pt, e, i, r, c, Yg), d.e = h, d.u = "deg", t._props.push(i), d;
}, Rc = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, om = function(t, e, i) {
  var r = Rc({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, u, c, h, f, d, l, g;
  r.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), o[Jt] = e, a = oo(i, 1), fn(i, Jt), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[Jt], o[Jt] = e, a = oo(i, 1), o[Jt] = c);
  for (u in br)
    c = r[u], h = a[u], c !== h && n.indexOf(u) < 0 && (l = $e(c), g = $e(h), f = l !== g ? $r(i, u, c, g) : parseFloat(c), d = parseFloat(h), t._pt = new si(t._pt, a, u, f, d - f, zl), t._pt.u = g || 0, t._props.push(u));
  Rc(a, r);
};
ni("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", o = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  va[t > 1 ? "border" + s : s] = function(a, u, c, h, f) {
    var d, l;
    if (arguments.length < 4)
      return d = o.map(function(g) {
        return ur(a, g, c);
      }), l = d.join(" "), l.split(d[0]).length === 5 ? d[0] : l;
    d = (h + "").split(" "), l = {}, o.forEach(function(g, p) {
      return l[g] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), a.init(u, l, f);
  };
});
var xo = {
  name: "css",
  register: $l,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var o = this._props, a = t.style, u = i.vars.startAt, c, h, f, d, l, g, p, v, x, E, C, S, b, I, P, O;
    Ru || $l(), this.styles = this.styles || If(t), O = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(hi[p] && wf(p, e, i, r, t, n)))) {
        if (l = typeof h, g = va[p], l === "function" && (h = h.call(i, r, t, n), l = typeof h), l === "string" && ~h.indexOf("random(") && (h = io(h)), g)
          g(this, t, p, h, i) && (P = 1);
        else if (p.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Lr.lastIndex = 0, Lr.test(c) || (v = $e(c), x = $e(h)), x ? v !== x && (c = $r(t, p, c, x) + x) : v && (h += v), this.add(a, "setProperty", c, h, r, n, 0, 0, p), o.push(p), O.push(p, 0, a[p]);
        else if (l !== "undefined") {
          if (u && p in u ? (c = typeof u[p] == "function" ? u[p].call(i, r, t, n) : u[p], Ae(c) && ~c.indexOf("random(") && (c = io(c)), $e(c + "") || c === "auto" || (c += _i.units[p] || $e(ur(t, p)) || ""), (c + "").charAt(1) === "=" && (c = ur(t, p))) : c = ur(t, p), d = parseFloat(c), E = l === "string" && h.charAt(1) === "=" && h.substr(0, 2), E && (h = h.substr(2)), f = parseFloat(h), p in Ki && (p === "autoAlpha" && (d === 1 && ur(t, "visibility") === "hidden" && f && (d = 0), O.push("visibility", 0, a.visibility), Ar(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = Ki[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in br, C) {
            if (this.styles.save(p), l === "string" && h.substring(0, 6) === "var(--" && (h = Oi(t, h.substring(4, h.indexOf(")"))), f = parseFloat(h)), S || (b = t._gsap, b.renderTransform && !e.parseTransform || oo(t, e.parseTransform), I = e.smoothOrigin !== !1 && b.smooth, S = this._pt = new si(this._pt, a, Jt, 0, 1, b.renderTransform, b, 0, -1), S.dep = 1), p === "scale")
              this._pt = new si(this._pt, b, "scaleY", b.scaleY, (E ? Yn(b.scaleY, E + f) : f) - b.scaleY || 0, zl), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              O.push(oi, 0, a[oi]), h = em(h), b.svg ? Hl(t, h, 0, I, 0, this) : (x = parseFloat(h.split(" ")[2]) || 0, x !== b.zOrigin && Ar(this, b, "zOrigin", b.zOrigin, x), Ar(this, a, p, ya(c), ya(h)));
              continue;
            } else if (p === "svgOrigin") {
              Hl(t, h, 1, I, 0, this);
              continue;
            } else if (p in Rf) {
              sm(this, b, p, d, E ? Yn(d, E + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              Ar(this, b, "smooth", b.smooth, h);
              continue;
            } else if (p === "force3D") {
              b[p] = h;
              continue;
            } else if (p === "transform") {
              om(this, h, t);
              continue;
            }
          } else p in a || (p = ns(p) || p);
          if (C || (f || f === 0) && (d || d === 0) && !Bg.test(h) && p in a)
            v = (c + "").substr((d + "").length), f || (f = 0), x = $e(h) || (p in _i.units ? _i.units[p] : v), v !== x && (d = $r(t, p, c, x)), this._pt = new si(this._pt, C ? b : a, p, d, (E ? Yn(d, E + f) : f) - d, !C && (x === "px" || p === "zIndex") && e.autoRound !== !1 ? qg : zl), this._pt.u = x || 0, v !== x && x !== "%" && (this._pt.b = c, this._pt.r = Wg);
          else if (p in a)
            tm.call(this, t, p, c, E ? E + h : h);
          else if (p in t)
            this.add(t, p, c || t[p], E ? E + h : h, r, n);
          else if (p !== "parseTransform") {
            Eu(p, h);
            continue;
          }
          C || (p in a ? O.push(p, 0, a[p]) : typeof t[p] == "function" ? O.push(p, 2, t[p]()) : O.push(p, 1, c || t[p])), o.push(p);
        }
      }
    P && Cf(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Nu())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: ur,
  aliases: Ki,
  getSetter: function(t, e, i) {
    var r = Ki[e];
    return r && r.indexOf(",") < 0 && (e = r), e in br && e !== oi && (t._gsap.x || ur(t, "x")) ? i && Pc === i ? e === "scale" ? Gg : Vg : (Pc = i || {}) && (e === "scale" ? Kg : jg) : t.style && !Tu(t.style[e]) ? Ug : ~e.indexOf("-") ? Xg : Lu(t, e);
  },
  core: {
    _removeProperty: fn,
    _getMatrix: Fu
  }
};
Wt.utils.checkPrefix = ns;
Wt.core.getStyleSaver = If;
(function(s, t, e, i) {
  var r = ni(s + "," + t + "," + e, function(n) {
    br[n] = 1;
  });
  ni(t, function(n) {
    _i.units[n] = "deg", Rf[n] = 1;
  }), Ki[r[13]] = s + "," + t, ni(i, function(n) {
    var o = n.split(":");
    Ki[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ni("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  _i.units[s] = "px";
});
Wt.registerPlugin(xo);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var fr, sn, $u, $a, xs, ra, wa, zs, Hi = "transform", Bl = Hi + "Origin", Ff, $f = function(t) {
  var e = t.ownerDocument || t;
  for (!(Hi in t.style) && ("msTransform" in t.style) && (Hi = "msTransform", Bl = Hi + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (sn = window, wa = new dn(), e) {
    fr = e, $u = e.documentElement, $a = e.body, zs = fr.createElementNS("http://www.w3.org/2000/svg", "g"), zs.style.transform = "none";
    var i = e.createElement("div"), r = e.createElement("div"), n = e && (e.body || e.firstElementChild);
    n && n.appendChild && (n.appendChild(i), i.appendChild(r), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), Ff = r.offsetParent !== i, n.removeChild(i));
  }
  return e;
}, am = function(t) {
  for (var e, i; t && t !== $a; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Hf = [], Bf = [], lm = function() {
  return sn.pageYOffset || fr.scrollTop || $u.scrollTop || $a.scrollTop || 0;
}, um = function() {
  return sn.pageXOffset || fr.scrollLeft || $u.scrollLeft || $a.scrollLeft || 0;
}, Hu = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, cm = function s(t) {
  if (sn.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, ll = function s(t, e) {
  if (t.parentNode && (fr || $f(t))) {
    var i = Hu(t), r = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", n = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, u = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", c = fr.createElementNS ? fr.createElementNS(r.replace(/^https/, "http"), n) : fr.createElement(n);
    return e && (i ? (ra || (ra = s(t)), c.setAttribute("width", 0.01), c.setAttribute("height", 0.01), c.setAttribute("transform", "translate(" + o + "," + a + ")"), ra.appendChild(c)) : (xs || (xs = s(t), xs.style.cssText = u), c.style.cssText = u + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", xs.appendChild(c))), c;
  }
  throw "Need document and parent.";
}, hm = function(t) {
  for (var e = new dn(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, fm = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Hi], t.style[Hi] = "none", t.appendChild(zs), e = zs.getCTM(), t.removeChild(zs), i ? t.style[Hi] = i : t.style.removeProperty(Hi.replace(/([A-Z])/g, "-$1").toLowerCase())), e || wa.clone();
}, dm = function(t, e) {
  var i = Hu(t), r = t === i, n = i ? Hf : Bf, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, u, c, h, f, d, l;
  if (t === sn)
    return t;
  if (n.length || n.push(ll(t, 1), ll(t, 2), ll(t, 3)), u = i ? ra : xs, i)
    r ? (h = fm(t), f = -h.e / h.a, d = -h.f / h.d, c = wa) : t.getBBox ? (h = t.getBBox(), c = t.transform ? t.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? hm(c) : c.getItem(0).matrix : wa, f = c.a * h.x + c.c * h.y, d = c.b * h.x + c.d * h.y) : (c = new dn(), f = d = 0), (r ? i : o).appendChild(u), u.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + f) + "," + (c.f + d) + ")");
  else {
    if (f = d = 0, Ff)
      for (c = t.offsetParent, h = t; h && (h = h.parentNode) && h !== c && h.parentNode; )
        (sn.getComputedStyle(h)[Hi] + "").length > 4 && (f = h.offsetLeft, d = h.offsetTop, h = 0);
    if (l = sn.getComputedStyle(t), l.position !== "absolute" && l.position !== "fixed")
      for (c = t.offsetParent; o && o !== c; )
        f += o.scrollLeft || 0, d += o.scrollTop || 0, o = o.parentNode;
    h = u.style, h.top = t.offsetTop - d + "px", h.left = t.offsetLeft - f + "px", h[Hi] = l[Hi], h[Bl] = l[Bl], h.position = l.position === "fixed" ? "fixed" : "absolute", a.appendChild(u);
  }
  return u;
}, ul = function(t, e, i, r, n, o, a) {
  return t.a = e, t.b = i, t.c = r, t.d = n, t.e = o, t.f = a, t;
}, dn = /* @__PURE__ */ function() {
  function s(e, i, r, n, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), r === void 0 && (r = 0), n === void 0 && (n = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), ul(this, e, i, r, n, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, r = this.b, n = this.c, o = this.d, a = this.e, u = this.f, c = i * o - r * n || 1e-10;
    return ul(this, o / c, -r / c, -n / c, i / c, (n * u - o * a) / c, -(i * u - r * a) / c);
  }, t.multiply = function(i) {
    var r = this.a, n = this.b, o = this.c, a = this.d, u = this.e, c = this.f, h = i.a, f = i.c, d = i.b, l = i.d, g = i.e, p = i.f;
    return ul(this, h * r + d * o, h * n + d * a, f * r + l * o, f * n + l * a, u + g * r + p * o, c + g * n + p * a);
  }, t.clone = function() {
    return new s(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var r = this.a, n = this.b, o = this.c, a = this.d, u = this.e, c = this.f;
    return r === i.a && n === i.b && o === i.c && a === i.d && u === i.e && c === i.f;
  }, t.apply = function(i, r) {
    r === void 0 && (r = {});
    var n = i.x, o = i.y, a = this.a, u = this.b, c = this.c, h = this.d, f = this.e, d = this.f;
    return r.x = n * a + o * c + f || 0, r.y = n * u + o * h + d || 0, r;
  }, s;
}();
function jr(s, t, e, i) {
  if (!s || !s.parentNode || (fr || $f(s)).documentElement === s)
    return new dn();
  var r = am(s), n = Hu(s), o = n ? Hf : Bf, a = dm(s), u = o[0].getBoundingClientRect(), c = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), f = a.parentNode, d = cm(s), l = new dn((c.left - u.left) / 100, (c.top - u.top) / 100, (h.left - u.left) / 100, (h.top - u.top) / 100, u.left + (d ? 0 : um()), u.top + (d ? 0 : lm()));
  if (f.removeChild(a), r)
    for (u = r.length; u--; )
      c = r[u], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
  return t ? l.inverse() : l;
}
function Nc(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function pm(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var St, $t, pi, Bi, dr, cl, cr, Yl, Ss, Or, Yf, Wl, ao, Bu, Es, zi, Cs, na, Wf, ql, ba = 0, qf = function() {
  return typeof window < "u";
}, Uf = function() {
  return St || qf() && (St = window.gsap) && St.registerPlugin && St;
}, Er = function(t) {
  return typeof t == "function";
}, Fs = function(t) {
  return typeof t == "object";
}, $i = function(t) {
  return typeof t > "u";
}, sa = function() {
  return !1;
}, $s = "transform", Ul = "transformOrigin", Tr = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, gs = Array.isArray, Ro = function(t, e) {
  var i = pi.createElementNS ? pi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : pi.createElement(t);
  return i.style ? i : pi.createElement(t);
}, zc = 180 / Math.PI, Cn = 1e20, gm = new dn(), xr = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, on = [], Un = {}, mm = 0, _m = /^(?:a|input|textarea|button|select)$/i, Fc = 0, Pn = {}, ar = {}, Xf = function(t, e) {
  var i = {}, r;
  for (r in t)
    i[r] = e ? t[r] * e : t[r];
  return i;
}, vm = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, $c = function s(t, e) {
  for (var i = t.length, r; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), r = t[i].children, r && r.length && s(r, e);
}, Vf = function() {
  return on.forEach(function(t) {
    return t();
  });
}, ym = function(t) {
  on.push(t), on.length === 1 && St.ticker.add(Vf);
}, Hc = function() {
  return !on.length && St.ticker.remove(Vf);
}, Bc = function(t) {
  for (var e = on.length; e--; )
    on[e] === t && on.splice(e, 1);
  St.to(Hc, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: Hc,
    data: "_draggable"
  });
}, wm = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, be = function(t, e, i, r) {
  if (t.addEventListener) {
    var n = ao[e];
    r = r || (Yf ? {
      passive: !1
    } : null), t.addEventListener(n || e, i, r), n && e !== n && t.addEventListener(e, i, r);
  }
}, he = function(t, e, i, r) {
  if (t.removeEventListener) {
    var n = ao[e];
    t.removeEventListener(n || e, i, r), n && e !== n && t.removeEventListener(e, i, r);
  }
}, xi = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, bm = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, Tm = function s(t) {
  Bu = t.touches && ba < t.touches.length, he(t.target, "touchend", s);
}, Yc = function(t) {
  Bu = t.touches && ba < t.touches.length, be(t.target, "touchend", Tm);
}, Xn = function(t) {
  return $t.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Vn = function(t) {
  return $t.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, Wc = function s(t, e) {
  be(t, "scroll", e), ss(t.parentNode) || s(t.parentNode, e);
}, qc = function s(t, e) {
  he(t, "scroll", e), ss(t.parentNode) || s(t.parentNode, e);
}, ss = function(t) {
  return !t || t === Bi || t.nodeType === 9 || t === pi.body || t === $t || !t.nodeType || !t.parentNode;
}, Uc = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return Math.max(0, ss(t) ? Math.max(Bi[r], dr[r]) - ($t["inner" + i] || Bi[n] || dr[n]) : t[r] - t[n]);
}, hl = function s(t, e) {
  var i = Uc(t, "x"), r = Uc(t, "y");
  ss(t) ? t = ar : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = r, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, fl = function(t, e, i) {
  var r = t.style;
  r && ($i(r[e]) && (e = Ss(e, t) || e), i == null ? r.removeProperty && r.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : r[e] = i);
}, lo = function(t) {
  return $t.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Xr = {}, An = function(t) {
  if (t === $t)
    return Xr.left = Xr.top = 0, Xr.width = Xr.right = Bi.clientWidth || t.innerWidth || dr.clientWidth || 0, Xr.height = Xr.bottom = (t.innerHeight || 0) - 20 < Bi.clientHeight ? Bi.clientHeight : t.innerHeight || dr.clientHeight || 0, Xr;
  var e = t.ownerDocument || pi, i = $i(t.pageX) ? !t.nodeType && !$i(t.left) && !$i(t.top) ? t : Or(t)[0].getBoundingClientRect() : {
    left: t.pageX - Vn(e),
    top: t.pageY - Xn(e),
    right: t.pageX - Vn(e) + 1,
    bottom: t.pageY - Xn(e) + 1
  };
  return $i(i.right) && !$i(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : $i(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, ne = function(t, e, i) {
  var r = t.vars, n = r[i], o = t._listeners[e], a;
  return Er(n) && (a = n.apply(r.callbackScope || t, r[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, Xc = function(t, e) {
  var i = Or(t)[0], r, n, o;
  return !i.nodeType && i !== $t ? $i(t.left) ? (n = t.min || t.minX || t.minRotation || 0, r = t.min || t.minY || 0, {
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
  }) : xm(i, e);
}, Si = {}, xm = function(t, e) {
  e = Or(e)[0];
  var i = t.getBBox && t.ownerSVGElement, r = t.ownerDocument || pi, n, o, a, u, c, h, f, d, l, g, p, v, x;
  if (t === $t)
    a = Xn(r), n = Vn(r), o = n + (r.documentElement.clientWidth || t.innerWidth || r.body.clientWidth || 0), u = a + ((t.innerHeight || 0) - 20 < r.documentElement.clientHeight ? r.documentElement.clientHeight : t.innerHeight || r.body.clientHeight || 0);
  else {
    if (e === $t || $i(e))
      return t.getBoundingClientRect();
    n = a = 0, i ? (g = t.getBBox(), p = g.width, v = g.height) : (t.viewBox && (g = t.viewBox.baseVal) && (n = g.x || 0, a = g.y || 0, p = g.width, v = g.height), p || (x = lo(t), g = x.boxSizing === "border-box", p = (parseFloat(x.width) || t.clientWidth || 0) + (g ? 0 : parseFloat(x.borderLeftWidth) + parseFloat(x.borderRightWidth)), v = (parseFloat(x.height) || t.clientHeight || 0) + (g ? 0 : parseFloat(x.borderTopWidth) + parseFloat(x.borderBottomWidth)))), o = p, u = v;
  }
  return t === e ? {
    left: n,
    top: a,
    width: o - n,
    height: u - a
  } : (c = jr(e, !0).multiply(jr(t)), h = c.apply({
    x: n,
    y: a
  }), f = c.apply({
    x: o,
    y: a
  }), d = c.apply({
    x: o,
    y: u
  }), l = c.apply({
    x: n,
    y: u
  }), n = Math.min(h.x, f.x, d.x, l.x), a = Math.min(h.y, f.y, d.y, l.y), {
    left: n,
    top: a,
    width: Math.max(h.x, f.x, d.x, l.x) - n,
    height: Math.max(h.y, f.y, d.y, l.y) - a
  });
}, dl = function(t, e, i, r, n, o) {
  var a = {}, u, c, h;
  if (e)
    if (n !== 1 && e instanceof Array) {
      if (a.end = u = [], h = e.length, Fs(e[0]))
        for (c = 0; c < h; c++)
          u[c] = Xf(e[c], n);
      else
        for (c = 0; c < h; c++)
          u[c] = e[c] * n;
      i += 1.1, r -= 1.1;
    } else Er(e) ? a.end = function(f) {
      var d = e.call(t, f), l, g;
      if (n !== 1)
        if (Fs(d)) {
          l = {};
          for (g in d)
            l[g] = d[g] * n;
          d = l;
        } else
          d *= n;
      return d;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (r || r === 0) && (a.min = r), o && (a.velocity = 0), a;
}, Sm = function s(t) {
  var e;
  return !t || !t.getAttribute || t === dr ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (_m.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, No = function(t, e) {
  for (var i = t.length, r; i--; )
    r = t[i], r.ondragstart = r.onselectstart = e ? null : sa, St.set(r, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, Em = function s(t) {
  if (lo(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, Gf, Xl, Cm = function(t, e) {
  t = St.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), r = i.style, n = t.firstChild, o = 0, a = 0, u = t.scrollTop, c = t.scrollLeft, h = t.scrollWidth, f = t.scrollHeight, d = 0, l = 0, g = 0, p, v, x, E, C, S;
  Gf && e.force3D !== !1 ? (C = "translate3d(", S = "px,0px)") : $s && (C = "translate(", S = "px)"), this.scrollTop = function(b, I) {
    if (!arguments.length)
      return -this.top();
    this.top(-b, I);
  }, this.scrollLeft = function(b, I) {
    if (!arguments.length)
      return -this.left();
    this.left(-b, I);
  }, this.left = function(b, I) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var P = t.scrollLeft - c, O = a;
    if ((P > 2 || P < -2) && !I) {
      c = t.scrollLeft, St.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-c), e.onKill && e.onKill();
      return;
    }
    b = -b, b < 0 ? (a = b - 0.5 | 0, b = 0) : b > l ? (a = b - l | 0, b = l) : a = 0, (a || O) && (this._skip || (r[$s] = C + -a + "px," + -o + S), a + d >= 0 && (r.paddingRight = a + d + "px")), t.scrollLeft = b | 0, c = t.scrollLeft;
  }, this.top = function(b, I) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var P = t.scrollTop - u, O = o;
    if ((P > 2 || P < -2) && !I) {
      u = t.scrollTop, St.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-u), e.onKill && e.onKill();
      return;
    }
    b = -b, b < 0 ? (o = b - 0.5 | 0, b = 0) : b > g ? (o = b - g | 0, b = g) : o = 0, (o || O) && (this._skip || (r[$s] = C + -a + "px," + -o + S)), t.scrollTop = b | 0, u = t.scrollTop;
  }, this.maxScrollTop = function() {
    return g;
  }, this.maxScrollLeft = function() {
    return l;
  }, this.disable = function() {
    for (n = i.firstChild; n; )
      E = n.nextSibling, t.appendChild(n), n = E;
    t === i.parentNode && t.removeChild(i);
  }, this.enable = function() {
    if (n = t.firstChild, n !== i) {
      for (; n; )
        E = n.nextSibling, i.appendChild(n), n = E;
      t.appendChild(i), this.calibrate();
    }
  }, this.calibrate = function(b) {
    var I = t.clientWidth === p, P, O, R;
    u = t.scrollTop, c = t.scrollLeft, !(I && t.clientHeight === v && i.offsetHeight === x && h === t.scrollWidth && f === t.scrollHeight && !b) && ((o || a) && (O = this.left(), R = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), P = lo(t), (!I || b) && (r.display = "block", r.width = "auto", r.paddingRight = "0px", d = Math.max(0, t.scrollWidth - t.clientWidth), d && (d += parseFloat(P.paddingLeft) + (Xl ? parseFloat(P.paddingRight) : 0))), r.display = "inline-block", r.position = "relative", r.overflow = "visible", r.verticalAlign = "top", r.boxSizing = "content-box", r.width = "100%", r.paddingRight = d + "px", Xl && (r.paddingBottom = P.paddingBottom), p = t.clientWidth, v = t.clientHeight, h = t.scrollWidth, f = t.scrollHeight, l = t.scrollWidth - p, g = t.scrollHeight - v, x = i.offsetHeight, r.display = "block", (O || R) && (this.left(O), this.top(R)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, pl = function(t) {
  if (qf() && document.body) {
    var e = window && window.navigator;
    $t = window, pi = document, Bi = pi.documentElement, dr = pi.body, cl = Ro("div"), na = !!window.PointerEvent, cr = Ro("div"), cr.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Cs = cr.style.cursor === "grab" ? "grab" : "move", Es = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Wl = "ontouchstart" in Bi && "orientation" in $t || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), Xl = function() {
      var i = Ro("div"), r = Ro("div"), n = r.style, o = dr, a;
      return n.display = "inline-block", n.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(r), o.appendChild(i), a = r.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), ao = function(i) {
      for (var r = i.split(","), n = ("onpointerdown" in cl ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in cl ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[r[a]] = n[a], o[n[a]] = r[a];
      try {
        Bi.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Yf = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), be(pi, "touchcancel", sa), be($t, "touchmove", sa), dr && dr.addEventListener("touchstart", sa), be(pi, "contextmenu", function() {
      for (var i in Un)
        Un[i].isPressed && Un[i].endDrag();
    }), St = Yl = Uf();
  }
  St ? (zi = St.plugins.inertia, Wf = St.core.context || function() {
  }, Ss = St.utils.checkPrefix, $s = Ss($s), Ul = Ss(Ul), Or = St.utils.toArray, ql = St.core.getStyleSaver, Gf = !!Ss("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, Pm = /* @__PURE__ */ function() {
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
}(), os = /* @__PURE__ */ function(s) {
  pm(t, s);
  function t(e, i) {
    var r;
    r = s.call(this) || this, Yl || pl(1), e = Or(e)[0], r.styles = ql && ql(e, "transform,left,top"), zi || (zi = St.plugins.inertia), r.vars = i = Xf(i || {}), r.target = e, r.x = r.y = r.rotation = 0, r.dragResistance = parseFloat(i.dragResistance) || 0, r.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, r.lockAxis = i.lockAxis, r.autoScroll = i.autoScroll || 0, r.lockedAxis = null, r.allowEventDefault = !!i.allowEventDefault, St.getProperty(e, "x");
    var n = (i.type || "x,y").toLowerCase(), o = ~n.indexOf("x") || ~n.indexOf("y"), a = n.indexOf("rotation") !== -1, u = a ? "rotation" : o ? "x" : "left", c = o ? "y" : "top", h = !!(~n.indexOf("x") || ~n.indexOf("left") || n === "scroll"), f = !!(~n.indexOf("y") || ~n.indexOf("top") || n === "scroll"), d = i.minimumMovement || 2, l = Nc(r), g = Or(i.trigger || i.handle || e), p = {}, v = 0, x = !1, E = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, S = i.autoScrollMarginBottom || 40, b = i.autoScrollMarginLeft || 40, I = i.clickableTest || Sm, P = 0, O = e._gsap || St.core.getCache(e), R = Em(e), z = function(y, B) {
      return parseFloat(O.get(e, y, B));
    }, U = e.ownerDocument || pi, F, Y, tt, it, j, V, N, W, _, q, Z, G, et, Dt, pt, vt, ht, qt, Bt, Nt, Ut, dt, gt, lt, Se, k, zt, qe, Oe, Mt, Rt, ae, Ue, Vt = function(y) {
      return xi(y), y.stopImmediatePropagation && y.stopImmediatePropagation(), !1;
    }, ie = function rt(y) {
      if (l.autoScroll && l.isDragging && (x || ht)) {
        var B = e, T = l.autoScroll * 15, A, H, M, X, $, K, st, Q;
        for (x = !1, ar.scrollTop = $t.pageYOffset != null ? $t.pageYOffset : U.documentElement.scrollTop != null ? U.documentElement.scrollTop : U.body.scrollTop, ar.scrollLeft = $t.pageXOffset != null ? $t.pageXOffset : U.documentElement.scrollLeft != null ? U.documentElement.scrollLeft : U.body.scrollLeft, X = l.pointerX - ar.scrollLeft, $ = l.pointerY - ar.scrollTop; B && !H; )
          H = ss(B.parentNode), A = H ? ar : B.parentNode, M = H ? {
            bottom: Math.max(Bi.clientHeight, $t.innerHeight || 0),
            right: Math.max(Bi.clientWidth, $t.innerWidth || 0),
            left: 0,
            top: 0
          } : A.getBoundingClientRect(), K = st = 0, f && (Q = A._gsMaxScrollY - A.scrollTop, Q < 0 ? st = Q : $ > M.bottom - S && Q ? (x = !0, st = Math.min(Q, T * (1 - Math.max(0, M.bottom - $) / S) | 0)) : $ < M.top + E && A.scrollTop && (x = !0, st = -Math.min(A.scrollTop, T * (1 - Math.max(0, $ - M.top) / E) | 0)), st && (A.scrollTop += st)), h && (Q = A._gsMaxScrollX - A.scrollLeft, Q < 0 ? K = Q : X > M.right - C && Q ? (x = !0, K = Math.min(Q, T * (1 - Math.max(0, M.right - X) / C) | 0)) : X < M.left + b && A.scrollLeft && (x = !0, K = -Math.min(A.scrollLeft, T * (1 - Math.max(0, X - M.left) / b) | 0)), K && (A.scrollLeft += K)), H && (K || st) && ($t.scrollTo(A.scrollLeft, A.scrollTop), Ne(l.pointerX + K, l.pointerY + st)), B = A;
      }
      if (ht) {
        var ct = l.x, Tt = l.y;
        a ? (l.deltaX = ct - parseFloat(O.rotation), l.rotation = ct, O.rotation = ct + "deg", O.renderTransform(1, O)) : Y ? (f && (l.deltaY = Tt - Y.top(), Y.top(Tt)), h && (l.deltaX = ct - Y.left(), Y.left(ct))) : o ? (f && (l.deltaY = Tt - parseFloat(O.y), O.y = Tt + "px"), h && (l.deltaX = ct - parseFloat(O.x), O.x = ct + "px"), O.renderTransform(1, O)) : (f && (l.deltaY = Tt - parseFloat(e.style.top || 0), e.style.top = Tt + "px"), h && (l.deltaX = ct - parseFloat(e.style.left || 0), e.style.left = ct + "px")), W && !y && !qe && (qe = !0, ne(l, "drag", "onDrag") === !1 && (h && (l.x -= l.deltaX), f && (l.y -= l.deltaY), rt(!0)), qe = !1);
      }
      ht = !1;
    }, Pt = function(y, B) {
      var T = l.x, A = l.y, H, M;
      e._gsap || (O = St.core.getCache(e)), O.uncache && St.getProperty(e, "x"), o ? (l.x = parseFloat(O.x), l.y = parseFloat(O.y)) : a ? l.x = l.rotation = parseFloat(O.rotation) : Y ? (l.y = Y.top(), l.x = Y.left()) : (l.y = parseFloat(e.style.top || (M = lo(e)) && M.top) || 0, l.x = parseFloat(e.style.left || (M || {}).left) || 0), (Bt || Nt || Ut) && !B && (l.isDragging || l.isThrowing) && (Ut && (Pn.x = l.x, Pn.y = l.y, H = Ut(Pn), H.x !== l.x && (l.x = H.x, ht = !0), H.y !== l.y && (l.y = H.y, ht = !0)), Bt && (H = Bt(l.x), H !== l.x && (l.x = H, a && (l.rotation = H), ht = !0)), Nt && (H = Nt(l.y), H !== l.y && (l.y = H), ht = !0)), ht && ie(!0), y || (l.deltaX = l.x - T, l.deltaY = l.y - A, ne(l, "throwupdate", "onThrowUpdate"));
    }, le = function(y, B, T, A) {
      return B == null && (B = -1e20), T == null && (T = Cn), Er(y) ? function(H) {
        var M = l.isPressed ? 1 - l.edgeResistance : 1;
        return y.call(l, (H > T ? T + (H - T) * M : H < B ? B + (H - B) * M : H) * A) * A;
      } : gs(y) ? function(H) {
        for (var M = y.length, X = 0, $ = Cn, K, st; --M > -1; )
          K = y[M], st = K - H, st < 0 && (st = -st), st < $ && K >= B && K <= T && (X = M, $ = st);
        return y[X];
      } : isNaN(y) ? function(H) {
        return H;
      } : function() {
        return y * A;
      };
    }, ke = function(y, B, T, A, H, M, X) {
      return M = M && M < Cn ? M * M : Cn, Er(y) ? function($) {
        var K = l.isPressed ? 1 - l.edgeResistance : 1, st = $.x, Q = $.y, ct, Tt, Ct;
        return $.x = st = st > T ? T + (st - T) * K : st < B ? B + (st - B) * K : st, $.y = Q = Q > H ? H + (Q - H) * K : Q < A ? A + (Q - A) * K : Q, ct = y.call(l, $), ct !== $ && ($.x = ct.x, $.y = ct.y), X !== 1 && ($.x *= X, $.y *= X), M < Cn && (Tt = $.x - st, Ct = $.y - Q, Tt * Tt + Ct * Ct > M && ($.x = st, $.y = Q)), $;
      } : gs(y) ? function($) {
        for (var K = y.length, st = 0, Q = Cn, ct, Tt, Ct, mt; --K > -1; )
          Ct = y[K], ct = Ct.x - $.x, Tt = Ct.y - $.y, mt = ct * ct + Tt * Tt, mt < Q && (st = K, Q = mt);
        return Q <= M ? y[st] : $;
      } : function($) {
        return $;
      };
    }, De = function() {
      var y, B, T, A;
      N = !1, Y ? (Y.calibrate(), l.minX = Z = -Y.maxScrollLeft(), l.minY = et = -Y.maxScrollTop(), l.maxX = q = l.maxY = G = 0, N = !0) : i.bounds && (y = Xc(i.bounds, e.parentNode), a ? (l.minX = Z = y.left, l.maxX = q = y.left + y.width, l.minY = et = l.maxY = G = 0) : !$i(i.bounds.maxX) || !$i(i.bounds.maxY) ? (y = i.bounds, l.minX = Z = y.minX, l.minY = et = y.minY, l.maxX = q = y.maxX, l.maxY = G = y.maxY) : (B = Xc(e, e.parentNode), l.minX = Z = Math.round(z(u, "px") + y.left - B.left), l.minY = et = Math.round(z(c, "px") + y.top - B.top), l.maxX = q = Math.round(Z + (y.width - B.width)), l.maxY = G = Math.round(et + (y.height - B.height))), Z > q && (l.minX = q, l.maxX = q = Z, Z = l.minX), et > G && (l.minY = G, l.maxY = G = et, et = l.minY), a && (l.minRotation = Z, l.maxRotation = q), N = !0), i.liveSnap && (T = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, A = gs(T) || Er(T), a ? (Bt = le(A ? T : T.rotation, Z, q, 1), Nt = null) : T.points ? Ut = ke(A ? T : T.points, Z, q, et, G, T.radius, Y ? -1 : 1) : (h && (Bt = le(A ? T : T.x || T.left || T.scrollLeft, Z, q, Y ? -1 : 1)), f && (Nt = le(A ? T : T.y || T.top || T.scrollTop, et, G, Y ? -1 : 1))));
    }, Wi = function() {
      l.isThrowing = !1, ne(l, "throwcomplete", "onThrowComplete");
    }, Xt = function() {
      l.isThrowing = !1;
    }, qi = function(y, B) {
      var T, A, H, M;
      y && zi ? (y === !0 && (T = i.snap || i.liveSnap || {}, A = gs(T) || Er(T), y = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? y.rotation = dl(l, A ? T : T.rotation, q, Z, 1, B) : (h && (y[u] = dl(l, A ? T : T.points || T.x || T.left, q, Z, Y ? -1 : 1, B || l.lockedAxis === "x")), f && (y[c] = dl(l, A ? T : T.points || T.y || T.top, G, et, Y ? -1 : 1, B || l.lockedAxis === "y")), (T.points || gs(T) && Fs(T[0])) && (y.linkedProps = u + "," + c, y.radius = T.radius))), l.isThrowing = !0, M = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - l.edgeResistance + 0.2 : i.overshootTolerance, y.duration || (y.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? M === 0 || Fs(y) && y.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: M
      }), l.tween = H = St.to(Y || e, {
        inertia: y,
        data: "_draggable",
        inherit: !1,
        onComplete: Wi,
        onInterrupt: Xt,
        onUpdate: i.fastMode ? ne : Pt,
        onUpdateParams: i.fastMode ? [l, "onthrowupdate", "onThrowUpdate"] : T && T.radius ? [!1, !0] : []
      }), i.fastMode || (Y && (Y._skip = !0), H.render(1e9, !0, !0), Pt(!0, !0), l.endX = l.x, l.endY = l.y, a && (l.endRotation = l.x), H.play(0), Pt(!0, !0), Y && (Y._skip = !1))) : N && l.applyBounds();
    }, ei = function(y) {
      var B = lt, T;
      lt = jr(e.parentNode, !0), y && l.isPressed && !lt.equals(B || new dn()) && (T = B.inverse().apply({
        x: tt,
        y: it
      }), lt.apply(T, T), tt = T.x, it = T.y), lt.equals(gm) && (lt = null);
    }, me = function() {
      var y = 1 - l.edgeResistance, B = R ? Vn(U) : 0, T = R ? Xn(U) : 0, A, H, M;
      o && (O.x = z(u, "px") + "px", O.y = z(c, "px") + "px", O.renderTransform()), ei(!1), Si.x = l.pointerX - B, Si.y = l.pointerY - T, lt && lt.apply(Si, Si), tt = Si.x, it = Si.y, ht && (Ne(l.pointerX, l.pointerY), ie(!0)), ae = jr(e), Y ? (De(), V = Y.top(), j = Y.left()) : (Ie() ? (Pt(!0, !0), De()) : l.applyBounds(), a ? (A = e.ownerSVGElement ? [O.xOrigin - e.getBBox().x, O.yOrigin - e.getBBox().y] : (lo(e)[Ul] || "0 0").split(" "), vt = l.rotationOrigin = jr(e).apply({
        x: parseFloat(A[0]) || 0,
        y: parseFloat(A[1]) || 0
      }), Pt(!0, !0), H = l.pointerX - vt.x - B, M = vt.y - l.pointerY + T, j = l.x, V = l.y = Math.atan2(M, H) * zc) : (V = z(c, "px"), j = z(u, "px"))), N && y && (j > q ? j = q + (j - q) / y : j < Z && (j = Z - (Z - j) / y), a || (V > G ? V = G + (V - G) / y : V < et && (V = et - (et - V) / y))), l.startX = j = Tr(j), l.startY = V = Tr(V);
    }, Ie = function() {
      return l.tween && l.tween.isActive();
    }, wi = function() {
      cr.parentNode && !Ie() && !l.isDragging && cr.parentNode.removeChild(cr);
    }, Re = function(y, B) {
      var T;
      if (!F || l.isPressed || !y || (y.type === "mousedown" || y.type === "pointerdown") && !B && xr() - P < 30 && ao[l.pointerEvent.type]) {
        Rt && y && F && xi(y);
        return;
      }
      if (Se = Ie(), Ue = !1, l.pointerEvent = y, ao[y.type] ? (gt = ~y.type.indexOf("touch") ? y.currentTarget || y.target : U, be(gt, "touchend", Lt), be(gt, "touchmove", at), be(gt, "touchcancel", Lt), be(U, "touchstart", Yc)) : (gt = null, be(U, "mousemove", at)), zt = null, (!na || !gt) && (be(U, "mouseup", Lt), y && y.target && be(y.target, "mouseup", Lt)), dt = I.call(l, y.target) && i.dragClickables === !1 && !B, dt) {
        be(y.target, "change", Lt), ne(l, "pressInit", "onPressInit"), ne(l, "press", "onPress"), No(g, !0), Rt = !1;
        return;
      }
      if (k = !gt || h === f || l.vars.allowNativeTouchScrolling === !1 || l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2) ? !1 : h ? "y" : "x", Rt = !k && !l.allowEventDefault, Rt && (xi(y), be($t, "touchforcechange", xi)), y.changedTouches ? (y = Dt = y.changedTouches[0], pt = y.identifier) : y.pointerId ? pt = y.pointerId : Dt = pt = null, ba++, ym(ie), it = l.pointerY = y.pageY, tt = l.pointerX = y.pageX, ne(l, "pressInit", "onPressInit"), (k || l.autoScroll) && hl(e.parentNode), e.parentNode && l.autoScroll && !Y && !a && e.parentNode._gsMaxScrollX && !cr.parentNode && !e.getBBox && (cr.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(cr)), me(), l.tween && l.tween.kill(), l.isThrowing = !1, St.killTweensOf(Y || e, p, !0), Y && St.killTweensOf(e, {
        scrollTo: 1
      }, !0), l.tween = l.lockedAxis = null, (i.zIndexBoost || !a && !Y && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), l.isPressed = !0, W = !!(i.onDrag || l._listeners.drag), _ = !!(i.onMove || l._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (T = g.length; --T > -1; )
          St.set(g[T], {
            cursor: i.activeCursor || i.cursor || (Cs === "grab" ? "grabbing" : Cs)
          });
      ne(l, "press", "onPress");
    }, at = function(y) {
      var B = y, T, A, H, M, X, $;
      if (!F || Bu || !l.isPressed || !y) {
        Rt && y && F && xi(y);
        return;
      }
      if (l.pointerEvent = y, T = y.changedTouches, T) {
        if (y = T[0], y !== Dt && y.identifier !== pt) {
          for (M = T.length; --M > -1 && (y = T[M]).identifier !== pt && y.target !== e; )
            ;
          if (M < 0)
            return;
        }
      } else if (y.pointerId && pt && y.pointerId !== pt)
        return;
      if (gt && k && !zt && (Si.x = y.pageX - (R ? Vn(U) : 0), Si.y = y.pageY - (R ? Xn(U) : 0), lt && lt.apply(Si, Si), A = Si.x, H = Si.y, X = Math.abs(A - tt), $ = Math.abs(H - it), (X !== $ && (X > d || $ > d) || Es && k === zt) && (zt = X > $ && h ? "x" : "y", k && zt !== k && be($t, "touchforcechange", xi), l.vars.lockAxisOnTouchScroll !== !1 && h && f && (l.lockedAxis = zt === "x" ? "y" : "x", Er(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, B)), Es && k === zt))) {
        Lt(B);
        return;
      }
      !l.allowEventDefault && (!k || zt && k !== zt) && B.cancelable !== !1 ? (xi(B), Rt = !0) : Rt && (Rt = !1), l.autoScroll && (x = !0), Ne(y.pageX, y.pageY, _);
    }, Ne = function(y, B, T) {
      var A = 1 - l.dragResistance, H = 1 - l.edgeResistance, M = l.pointerX, X = l.pointerY, $ = V, K = l.x, st = l.y, Q = l.endX, ct = l.endY, Tt = l.endRotation, Ct = ht, mt, ft, At, ut, _e, Gt;
      l.pointerX = y, l.pointerY = B, R && (y -= Vn(U), B -= Xn(U)), a ? (ut = Math.atan2(vt.y - B, y - vt.x) * zc, _e = l.y - ut, _e > 180 ? (V -= 360, l.y = ut) : _e < -180 && (V += 360, l.y = ut), l.x !== j || Math.max(Math.abs(tt - y), Math.abs(it - B)) > d ? (l.y = ut, At = j + (V - ut) * A) : At = j) : (lt && (Gt = y * lt.a + B * lt.c + lt.e, B = y * lt.b + B * lt.d + lt.f, y = Gt), ft = B - it, mt = y - tt, ft < d && ft > -d && (ft = 0), mt < d && mt > -d && (mt = 0), (l.lockAxis || l.lockedAxis) && (mt || ft) && (Gt = l.lockedAxis, Gt || (l.lockedAxis = Gt = h && Math.abs(mt) > Math.abs(ft) ? "y" : f ? "x" : null, Gt && Er(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, l.pointerEvent)), Gt === "y" ? ft = 0 : Gt === "x" && (mt = 0)), At = Tr(j + mt * A), ut = Tr(V + ft * A)), (Bt || Nt || Ut) && (l.x !== At || l.y !== ut && !a) && (Ut && (Pn.x = At, Pn.y = ut, Gt = Ut(Pn), At = Tr(Gt.x), ut = Tr(Gt.y)), Bt && (At = Tr(Bt(At))), Nt && (ut = Tr(Nt(ut)))), N && (At > q ? At = q + Math.round((At - q) * H) : At < Z && (At = Z + Math.round((At - Z) * H)), a || (ut > G ? ut = Math.round(G + (ut - G) * H) : ut < et && (ut = Math.round(et + (ut - et) * H)))), (l.x !== At || l.y !== ut && !a) && (a ? (l.endRotation = l.x = l.endX = At, ht = !0) : (f && (l.y = l.endY = ut, ht = !0), h && (l.x = l.endX = At, ht = !0)), !T || ne(l, "move", "onMove") !== !1 ? !l.isDragging && l.isPressed && (l.isDragging = Ue = !0, ne(l, "dragstart", "onDragStart")) : (l.pointerX = M, l.pointerY = X, V = $, l.x = K, l.y = st, l.endX = Q, l.endY = ct, l.endRotation = Tt, ht = Ct));
    }, Lt = function rt(y, B) {
      if (!F || !l.isPressed || y && pt != null && !B && (y.pointerId && y.pointerId !== pt && y.target !== e || y.changedTouches && !bm(y.changedTouches, pt))) {
        Rt && y && F && xi(y);
        return;
      }
      l.isPressed = !1;
      var T = y, A = l.isDragging, H = l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2), M = St.delayedCall(1e-3, wi), X, $, K, st, Q;
      if (gt ? (he(gt, "touchend", rt), he(gt, "touchmove", at), he(gt, "touchcancel", rt), he(U, "touchstart", Yc)) : he(U, "mousemove", at), he($t, "touchforcechange", xi), (!na || !gt) && (he(U, "mouseup", rt), y && y.target && he(y.target, "mouseup", rt)), ht = !1, A && (v = Fc = xr(), l.isDragging = !1), Bc(ie), dt && !H) {
        y && (he(y.target, "change", rt), l.pointerEvent = T), No(g, !1), ne(l, "release", "onRelease"), ne(l, "click", "onClick"), dt = !1;
        return;
      }
      for ($ = g.length; --$ > -1; )
        fl(g[$], "cursor", i.cursor || (i.cursor !== !1 ? Cs : null));
      if (ba--, y) {
        if (X = y.changedTouches, X && (y = X[0], y !== Dt && y.identifier !== pt)) {
          for ($ = X.length; --$ > -1 && (y = X[$]).identifier !== pt && y.target !== e; )
            ;
          if ($ < 0 && !B)
            return;
        }
        l.pointerEvent = T, l.pointerX = y.pageX, l.pointerY = y.pageY;
      }
      return H && T ? (xi(T), Rt = !0, ne(l, "release", "onRelease")) : T && !A ? (Rt = !1, Se && (i.snap || i.bounds) && qi(i.inertia || i.throwProps), ne(l, "release", "onRelease"), (!Es || T.type !== "touchmove") && T.type.indexOf("cancel") === -1 && (ne(l, "click", "onClick"), xr() - P < 300 && ne(l, "doubleclick", "onDoubleClick"), st = T.target || e, P = xr(), Q = function() {
        P !== Oe && l.enabled() && !l.isPressed && !T.defaultPrevented && (st.click ? st.click() : U.createEvent && (K = U.createEvent("MouseEvents"), K.initMouseEvent("click", !0, !0, $t, 1, l.pointerEvent.screenX, l.pointerEvent.screenY, l.pointerX, l.pointerY, !1, !1, !1, !1, 0, null), st.dispatchEvent(K)));
      }, !Es && !T.defaultPrevented && St.delayedCall(0.05, Q))) : (qi(i.inertia || i.throwProps), !l.allowEventDefault && T && (i.dragClickables !== !1 || !I.call(l, T.target)) && A && (!k || zt && k === zt) && T.cancelable !== !1 ? (Rt = !0, xi(T)) : Rt = !1, ne(l, "release", "onRelease")), Ie() && M.duration(l.tween.duration()), A && ne(l, "dragend", "onDragEnd"), !0;
    }, Ee = function(y) {
      if (y && l.isDragging && !Y) {
        var B = y.target || e.parentNode, T = B.scrollLeft - B._gsScrollX, A = B.scrollTop - B._gsScrollY;
        (T || A) && (lt ? (tt -= T * lt.a + A * lt.c, it -= A * lt.d + T * lt.b) : (tt -= T, it -= A), B._gsScrollX += T, B._gsScrollY += A, Ne(l.pointerX, l.pointerY));
      }
    }, te = function(y) {
      var B = xr(), T = B - P < 100, A = B - v < 50, H = T && Oe === P, M = l.pointerEvent && l.pointerEvent.defaultPrevented, X = T && Mt === P, $ = y.isTrusted || y.isTrusted == null && T && H;
      if ((H || A && l.vars.suppressClickOnDrag !== !1) && y.stopImmediatePropagation && y.stopImmediatePropagation(), T && !(l.pointerEvent && l.pointerEvent.defaultPrevented) && (!H || $ && !X)) {
        $ && H && (Mt = P), Oe = P;
        return;
      }
      (l.isPressed || A || T) && (!$ || !y.detail || !T || M) && xi(y), !T && !A && !Ue && (y && y.target && (l.pointerEvent = y), ne(l, "click", "onClick"));
    }, bi = function(y) {
      return lt ? {
        x: y.x * lt.a + y.y * lt.c + lt.e,
        y: y.x * lt.b + y.y * lt.d + lt.f
      } : {
        x: y.x,
        y: y.y
      };
    };
    return qt = t.get(e), qt && qt.kill(), r.startDrag = function(rt, y) {
      var B, T, A, H;
      Re(rt || l.pointerEvent, !0), y && !l.hitTest(rt || l.pointerEvent) && (B = An(rt || l.pointerEvent), T = An(e), A = bi({
        x: B.left + B.width / 2,
        y: B.top + B.height / 2
      }), H = bi({
        x: T.left + T.width / 2,
        y: T.top + T.height / 2
      }), tt -= A.x - H.x, it -= A.y - H.y), l.isDragging || (l.isDragging = Ue = !0, ne(l, "dragstart", "onDragStart"));
    }, r.drag = at, r.endDrag = function(rt) {
      return Lt(rt || l.pointerEvent, !0);
    }, r.timeSinceDrag = function() {
      return l.isDragging ? 0 : (xr() - v) / 1e3;
    }, r.timeSinceClick = function() {
      return (xr() - P) / 1e3;
    }, r.hitTest = function(rt, y) {
      return t.hitTest(l.target, rt, y);
    }, r.getDirection = function(rt, y) {
      var B = rt === "velocity" && zi ? rt : Fs(rt) && !a ? "element" : "start", T, A, H, M, X, $;
      return B === "element" && (X = An(l.target), $ = An(rt)), T = B === "start" ? l.x - j : B === "velocity" ? zi.getVelocity(e, u) : X.left + X.width / 2 - ($.left + $.width / 2), a ? T < 0 ? "counter-clockwise" : "clockwise" : (y = y || 2, A = B === "start" ? l.y - V : B === "velocity" ? zi.getVelocity(e, c) : X.top + X.height / 2 - ($.top + $.height / 2), H = Math.abs(T / A), M = H < 1 / y ? "" : T < 0 ? "left" : "right", H < y && (M !== "" && (M += "-"), M += A < 0 ? "up" : "down"), M);
    }, r.applyBounds = function(rt, y) {
      var B, T, A, H, M, X;
      if (rt && i.bounds !== rt)
        return i.bounds = rt, l.update(!0, y);
      if (Pt(!0), De(), N && !Ie()) {
        if (B = l.x, T = l.y, B > q ? B = q : B < Z && (B = Z), T > G ? T = G : T < et && (T = et), (l.x !== B || l.y !== T) && (A = !0, l.x = l.endX = B, a ? l.endRotation = B : l.y = l.endY = T, ht = !0, ie(!0), l.autoScroll && !l.isDragging))
          for (hl(e.parentNode), H = e, ar.scrollTop = $t.pageYOffset != null ? $t.pageYOffset : U.documentElement.scrollTop != null ? U.documentElement.scrollTop : U.body.scrollTop, ar.scrollLeft = $t.pageXOffset != null ? $t.pageXOffset : U.documentElement.scrollLeft != null ? U.documentElement.scrollLeft : U.body.scrollLeft; H && !X; )
            X = ss(H.parentNode), M = X ? ar : H.parentNode, f && M.scrollTop > M._gsMaxScrollY && (M.scrollTop = M._gsMaxScrollY), h && M.scrollLeft > M._gsMaxScrollX && (M.scrollLeft = M._gsMaxScrollX), H = M;
        l.isThrowing && (A || l.endX > q || l.endX < Z || l.endY > G || l.endY < et) && qi(i.inertia || i.throwProps, A);
      }
      return l;
    }, r.update = function(rt, y, B) {
      if (y && l.isPressed) {
        var T = jr(e), A = ae.apply({
          x: l.x - j,
          y: l.y - V
        }), H = jr(e.parentNode, !0);
        H.apply({
          x: T.e - A.x,
          y: T.f - A.y
        }, A), l.x -= A.x - H.e, l.y -= A.y - H.f, ie(!0), me();
      }
      var M = l.x, X = l.y;
      return ei(!y), rt ? l.applyBounds() : (ht && B && ie(!0), Pt(!0)), y && (Ne(l.pointerX, l.pointerY), ht && ie(!0)), l.isPressed && !y && (h && Math.abs(M - l.x) > 0.01 || f && Math.abs(X - l.y) > 0.01 && !a) && me(), l.autoScroll && (hl(e.parentNode, l.isDragging), x = l.isDragging, ie(!0), qc(e, Ee), Wc(e, Ee)), l;
    }, r.enable = function(rt) {
      var y = {
        lazy: !0
      }, B, T, A;
      if (i.cursor !== !1 && (y.cursor = i.cursor || Cs), St.utils.checkPrefix("touchCallout") && (y.touchCallout = "none"), rt !== "soft") {
        for ($c(g, h === f ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), T = g.length; --T > -1; )
          A = g[T], na || be(A, "mousedown", Re), be(A, "touchstart", Re), be(A, "click", te, !0), St.set(A, y), A.getBBox && A.ownerSVGElement && h !== f && St.set(A.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || be(A, "contextmenu", Vt);
        No(g, !1);
      }
      return Wc(e, Ee), F = !0, zi && rt !== "soft" && zi.track(Y || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = B = e._gsDragID || "d" + mm++, Un[B] = l, Y && (Y.enable(), Y.element._gsDragID = B), (i.bounds || a) && me(), i.bounds && l.applyBounds(), l;
    }, r.disable = function(rt) {
      for (var y = l.isDragging, B = g.length, T; --B > -1; )
        fl(g[B], "cursor", null);
      if (rt !== "soft") {
        for ($c(g, null), B = g.length; --B > -1; )
          T = g[B], fl(T, "touchCallout", null), he(T, "mousedown", Re), he(T, "touchstart", Re), he(T, "click", te, !0), he(T, "contextmenu", Vt);
        No(g, !0), gt && (he(gt, "touchcancel", Lt), he(gt, "touchend", Lt), he(gt, "touchmove", at)), he(U, "mouseup", Lt), he(U, "mousemove", at);
      }
      return qc(e, Ee), F = !1, zi && rt !== "soft" && (zi.untrack(Y || e, o ? "x,y" : a ? "rotation" : "top,left"), l.tween && l.tween.kill()), Y && Y.disable(), Bc(ie), l.isDragging = l.isPressed = dt = !1, y && ne(l, "dragend", "onDragEnd"), l;
    }, r.enabled = function(rt, y) {
      return arguments.length ? rt ? l.enable(y) : l.disable(y) : F;
    }, r.kill = function() {
      return l.isThrowing = !1, l.tween && l.tween.kill(), l.disable(), St.set(g, {
        clearProps: "userSelect"
      }), delete Un[e._gsDragID], l;
    }, r.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~n.indexOf("scroll") && (Y = r.scrollProxy = new Cm(e, vm({
      onKill: function() {
        l.isPressed && Lt(null);
      }
    }, i)), e.style.overflowY = f && !Wl ? "auto" : "hidden", e.style.overflowX = h && !Wl ? "auto" : "hidden", e = Y.content), a ? p.rotation = 1 : (h && (p[u] = 1), f && (p[c] = 1)), O.force3D = "force3D" in i ? i.force3D : !0, Wf(Nc(r)), r.enable(), r;
  }
  return t.register = function(i) {
    St = i, pl();
  }, t.create = function(i, r) {
    return Yl || pl(!0), Or(i).map(function(n) {
      return new t(n, r);
    });
  }, t.get = function(i) {
    return Un[(Or(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (xr() - Fc) / 1e3;
  }, t.hitTest = function(i, r, n) {
    if (i === r)
      return !1;
    var o = An(i), a = An(r), u = o.top, c = o.left, h = o.right, f = o.bottom, d = o.width, l = o.height, g = a.left > h || a.right < c || a.top > f || a.bottom < u, p, v, x;
    return g || !n ? !g : (x = (n + "").indexOf("%") !== -1, n = parseFloat(n) || 0, p = {
      left: Math.max(c, a.left),
      top: Math.max(u, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(f, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : x ? (n *= 0.01, v = p.width * p.height, v >= d * l * n || v >= a.width * a.height * n) : p.width > n && p.height > n);
  }, t;
}(Pm);
wm(os.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
os.zIndex = 1e3;
os.version = "3.13.0";
Uf() && St.registerPlugin(os);
function Am(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function Om(s, t, e) {
  return t && Am(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Me, oa, gi, kr, Ir, Gn, Kf, Gr, Hs, jf, pr, Fi, Zf, Qf = function() {
  return Me || typeof window < "u" && (Me = window.gsap) && Me.registerPlugin && Me;
}, Jf = 1, Fn = [], wt = [], tr = [], Bs = Date.now, Vl = function(t, e) {
  return e;
}, km = function() {
  var t = Hs.core, e = t.bridge || {}, i = t._scrollers, r = t._proxies;
  i.push.apply(i, wt), r.push.apply(r, tr), wt = i, tr = r, Vl = function(o, a) {
    return e[o](a);
  };
}, Dr = function(t, e) {
  return ~tr.indexOf(t) && tr[tr.indexOf(t) + 1][e];
}, Ys = function(t) {
  return !!~jf.indexOf(t);
}, Ge = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: r !== !1,
    capture: !!n
  });
}, Ve = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, zo = "scrollLeft", Fo = "scrollTop", Gl = function() {
  return pr && pr.isPressed || wt.cache++;
}, Ta = function(t, e) {
  var i = function r(n) {
    if (n || n === 0) {
      Jf && (gi.history.scrollRestoration = "manual");
      var o = pr && pr.isPressed;
      n = r.v = Math.round(n) || (pr && pr.iOS ? 1 : 0), t(n), r.cacheID = wt.cache, o && Vl("ss", n);
    } else (e || wt.cache !== r.cacheID || Vl("ref")) && (r.cacheID = wt.cache, r.v = t());
    return r.v + r.offset;
  };
  return i.offset = 0, t && i;
}, Je = {
  s: zo,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Ta(function(s) {
    return arguments.length ? gi.scrollTo(s, xe.sc()) : gi.pageXOffset || kr[zo] || Ir[zo] || Gn[zo] || 0;
  })
}, xe = {
  s: Fo,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Je,
  sc: Ta(function(s) {
    return arguments.length ? gi.scrollTo(Je.sc(), s) : gi.pageYOffset || kr[Fo] || Ir[Fo] || Gn[Fo] || 0;
  })
}, ii = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Me.utils.toArray)(t)[0] || (typeof t == "string" && Me.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Im = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Hr = function(t, e) {
  var i = e.s, r = e.sc;
  Ys(t) && (t = kr.scrollingElement || Ir);
  var n = wt.indexOf(t), o = r === xe.sc ? 1 : 2;
  !~n && (n = wt.push(t) - 1), wt[n + o] || Ge(t, "scroll", Gl);
  var a = wt[n + o], u = a || (wt[n + o] = Ta(Dr(t, i), !0) || (Ys(t) ? r : Ta(function(c) {
    return arguments.length ? t[i] = c : t[i];
  })));
  return u.target = t, a || (u.smooth = Me.getProperty(t, "scrollBehavior") === "smooth"), u;
}, Kl = function(t, e, i) {
  var r = t, n = t, o = Bs(), a = o, u = e || 50, c = Math.max(500, u * 3), h = function(g, p) {
    var v = Bs();
    p || v - o > u ? (n = r, r = g, a = o, o = v) : i ? r += g : r = n + (g - n) / (v - a) * (o - a);
  }, f = function() {
    n = r = i ? 0 : r, a = o = 0;
  }, d = function(g) {
    var p = a, v = n, x = Bs();
    return (g || g === 0) && g !== r && h(g), o === a || x - a > c ? 0 : (r + (i ? v : -v)) / ((i ? x : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: f,
    getVelocity: d
  };
}, ms = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Vc = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, td = function() {
  Hs = Me.core.globals().ScrollTrigger, Hs && Hs.core && km();
}, ed = function(t) {
  return Me = t || Qf(), !oa && Me && typeof document < "u" && document.body && (gi = window, kr = document, Ir = kr.documentElement, Gn = kr.body, jf = [gi, kr, Ir, Gn], Me.utils.clamp, Zf = Me.core.context || function() {
  }, Gr = "onpointerenter" in Gn ? "pointer" : "mouse", Kf = oe.isTouch = gi.matchMedia && gi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in gi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Fi = oe.eventTypes = ("ontouchstart" in Ir ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ir ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Jf = 0;
  }, 500), td(), oa = 1), oa;
};
Je.op = xe;
wt.cache = 0;
var oe = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    oa || ed(Me) || console.warn("Please gsap.registerPlugin(Observer)"), Hs || td();
    var r = i.tolerance, n = i.dragMinimum, o = i.type, a = i.target, u = i.lineHeight, c = i.debounce, h = i.preventDefault, f = i.onStop, d = i.onStopDelay, l = i.ignore, g = i.wheelSpeed, p = i.event, v = i.onDragStart, x = i.onDragEnd, E = i.onDrag, C = i.onPress, S = i.onRelease, b = i.onRight, I = i.onLeft, P = i.onUp, O = i.onDown, R = i.onChangeX, z = i.onChangeY, U = i.onChange, F = i.onToggleX, Y = i.onToggleY, tt = i.onHover, it = i.onHoverEnd, j = i.onMove, V = i.ignoreCheck, N = i.isNormalizer, W = i.onGestureStart, _ = i.onGestureEnd, q = i.onWheel, Z = i.onEnable, G = i.onDisable, et = i.onClick, Dt = i.scrollSpeed, pt = i.capture, vt = i.allowClicks, ht = i.lockAxis, qt = i.onLockAxis;
    this.target = a = ii(a) || Ir, this.vars = i, l && (l = Me.utils.toArray(l)), r = r || 1e-9, n = n || 0, g = g || 1, Dt = Dt || 1, o = o || "wheel,touch,pointer", c = c !== !1, u || (u = parseFloat(gi.getComputedStyle(Gn).lineHeight) || 22);
    var Bt, Nt, Ut, dt, gt, lt, Se, k = this, zt = 0, qe = 0, Oe = i.passive || !h && i.passive !== !1, Mt = Hr(a, Je), Rt = Hr(a, xe), ae = Mt(), Ue = Rt(), Vt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Fi[0] === "pointerdown", ie = Ys(a), Pt = a.ownerDocument || kr, le = [0, 0, 0], ke = [0, 0, 0], De = 0, Wi = function() {
      return De = Bs();
    }, Xt = function(A, H) {
      return (k.event = A) && l && Im(A.target, l) || H && Vt && A.pointerType !== "touch" || V && V(A, H);
    }, qi = function() {
      k._vx.reset(), k._vy.reset(), Nt.pause(), f && f(k);
    }, ei = function() {
      var A = k.deltaX = Vc(le), H = k.deltaY = Vc(ke), M = Math.abs(A) >= r, X = Math.abs(H) >= r;
      U && (M || X) && U(k, A, H, le, ke), M && (b && k.deltaX > 0 && b(k), I && k.deltaX < 0 && I(k), R && R(k), F && k.deltaX < 0 != zt < 0 && F(k), zt = k.deltaX, le[0] = le[1] = le[2] = 0), X && (O && k.deltaY > 0 && O(k), P && k.deltaY < 0 && P(k), z && z(k), Y && k.deltaY < 0 != qe < 0 && Y(k), qe = k.deltaY, ke[0] = ke[1] = ke[2] = 0), (dt || Ut) && (j && j(k), Ut && (v && Ut === 1 && v(k), E && E(k), Ut = 0), dt = !1), lt && !(lt = !1) && qt && qt(k), gt && (q(k), gt = !1), Bt = 0;
    }, me = function(A, H, M) {
      le[M] += A, ke[M] += H, k._vx.update(A), k._vy.update(H), c ? Bt || (Bt = requestAnimationFrame(ei)) : ei();
    }, Ie = function(A, H) {
      ht && !Se && (k.axis = Se = Math.abs(A) > Math.abs(H) ? "x" : "y", lt = !0), Se !== "y" && (le[2] += A, k._vx.update(A, !0)), Se !== "x" && (ke[2] += H, k._vy.update(H, !0)), c ? Bt || (Bt = requestAnimationFrame(ei)) : ei();
    }, wi = function(A) {
      if (!Xt(A, 1)) {
        A = ms(A, h);
        var H = A.clientX, M = A.clientY, X = H - k.x, $ = M - k.y, K = k.isDragging;
        k.x = H, k.y = M, (K || (X || $) && (Math.abs(k.startX - H) >= n || Math.abs(k.startY - M) >= n)) && (Ut = K ? 2 : 1, K || (k.isDragging = !0), Ie(X, $));
      }
    }, Re = k.onPress = function(T) {
      Xt(T, 1) || T && T.button || (k.axis = Se = null, Nt.pause(), k.isPressed = !0, T = ms(T), zt = qe = 0, k.startX = k.x = T.clientX, k.startY = k.y = T.clientY, k._vx.reset(), k._vy.reset(), Ge(N ? a : Pt, Fi[1], wi, Oe, !0), k.deltaX = k.deltaY = 0, C && C(k));
    }, at = k.onRelease = function(T) {
      if (!Xt(T, 1)) {
        Ve(N ? a : Pt, Fi[1], wi, !0);
        var A = !isNaN(k.y - k.startY), H = k.isDragging, M = H && (Math.abs(k.x - k.startX) > 3 || Math.abs(k.y - k.startY) > 3), X = ms(T);
        !M && A && (k._vx.reset(), k._vy.reset(), h && vt && Me.delayedCall(0.08, function() {
          if (Bs() - De > 300 && !T.defaultPrevented) {
            if (T.target.click)
              T.target.click();
            else if (Pt.createEvent) {
              var $ = Pt.createEvent("MouseEvents");
              $.initMouseEvent("click", !0, !0, gi, 1, X.screenX, X.screenY, X.clientX, X.clientY, !1, !1, !1, !1, 0, null), T.target.dispatchEvent($);
            }
          }
        })), k.isDragging = k.isGesturing = k.isPressed = !1, f && H && !N && Nt.restart(!0), Ut && ei(), x && H && x(k), S && S(k, M);
      }
    }, Ne = function(A) {
      return A.touches && A.touches.length > 1 && (k.isGesturing = !0) && W(A, k.isDragging);
    }, Lt = function() {
      return (k.isGesturing = !1) || _(k);
    }, Ee = function(A) {
      if (!Xt(A)) {
        var H = Mt(), M = Rt();
        me((H - ae) * Dt, (M - Ue) * Dt, 1), ae = H, Ue = M, f && Nt.restart(!0);
      }
    }, te = function(A) {
      if (!Xt(A)) {
        A = ms(A, h), q && (gt = !0);
        var H = (A.deltaMode === 1 ? u : A.deltaMode === 2 ? gi.innerHeight : 1) * g;
        me(A.deltaX * H, A.deltaY * H, 0), f && !N && Nt.restart(!0);
      }
    }, bi = function(A) {
      if (!Xt(A)) {
        var H = A.clientX, M = A.clientY, X = H - k.x, $ = M - k.y;
        k.x = H, k.y = M, dt = !0, f && Nt.restart(!0), (X || $) && Ie(X, $);
      }
    }, rt = function(A) {
      k.event = A, tt(k);
    }, y = function(A) {
      k.event = A, it(k);
    }, B = function(A) {
      return Xt(A) || ms(A, h) && et(k);
    };
    Nt = k._dc = Me.delayedCall(d || 0.25, qi).pause(), k.deltaX = k.deltaY = 0, k._vx = Kl(0, 50, !0), k._vy = Kl(0, 50, !0), k.scrollX = Mt, k.scrollY = Rt, k.isDragging = k.isGesturing = k.isPressed = !1, Zf(this), k.enable = function(T) {
      return k.isEnabled || (Ge(ie ? Pt : a, "scroll", Gl), o.indexOf("scroll") >= 0 && Ge(ie ? Pt : a, "scroll", Ee, Oe, pt), o.indexOf("wheel") >= 0 && Ge(a, "wheel", te, Oe, pt), (o.indexOf("touch") >= 0 && Kf || o.indexOf("pointer") >= 0) && (Ge(a, Fi[0], Re, Oe, pt), Ge(Pt, Fi[2], at), Ge(Pt, Fi[3], at), vt && Ge(a, "click", Wi, !0, !0), et && Ge(a, "click", B), W && Ge(Pt, "gesturestart", Ne), _ && Ge(Pt, "gestureend", Lt), tt && Ge(a, Gr + "enter", rt), it && Ge(a, Gr + "leave", y), j && Ge(a, Gr + "move", bi)), k.isEnabled = !0, k.isDragging = k.isGesturing = k.isPressed = dt = Ut = !1, k._vx.reset(), k._vy.reset(), ae = Mt(), Ue = Rt(), T && T.type && Re(T), Z && Z(k)), k;
    }, k.disable = function() {
      k.isEnabled && (Fn.filter(function(T) {
        return T !== k && Ys(T.target);
      }).length || Ve(ie ? Pt : a, "scroll", Gl), k.isPressed && (k._vx.reset(), k._vy.reset(), Ve(N ? a : Pt, Fi[1], wi, !0)), Ve(ie ? Pt : a, "scroll", Ee, pt), Ve(a, "wheel", te, pt), Ve(a, Fi[0], Re, pt), Ve(Pt, Fi[2], at), Ve(Pt, Fi[3], at), Ve(a, "click", Wi, !0), Ve(a, "click", B), Ve(Pt, "gesturestart", Ne), Ve(Pt, "gestureend", Lt), Ve(a, Gr + "enter", rt), Ve(a, Gr + "leave", y), Ve(a, Gr + "move", bi), k.isEnabled = k.isPressed = k.isDragging = !1, G && G(k));
    }, k.kill = k.revert = function() {
      k.disable();
      var T = Fn.indexOf(k);
      T >= 0 && Fn.splice(T, 1), pr === k && (pr = 0);
    }, Fn.push(k), N && Ys(a) && (pr = k), k.enable(p);
  }, Om(s, [{
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
oe.version = "3.13.0";
oe.create = function(s) {
  return new oe(s);
};
oe.register = ed;
oe.getAll = function() {
  return Fn.slice();
};
oe.getById = function(s) {
  return Fn.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
Qf() && Me.registerPlugin(oe);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var He, id, gr, ji, Rr, rd, Kn, $o, nd = function() {
  return typeof window < "u";
}, sd = function() {
  return He || nd() && (He = window.gsap) && He.registerPlugin && He;
}, od = function(t) {
  return typeof t == "string";
}, Gc = function(t) {
  return typeof t == "function";
}, uo = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return t === gr || t === ji || t === Rr ? Math.max(ji[r], Rr[r]) - (gr["inner" + i] || ji[n] || Rr[n]) : t[r] - t["offset" + i];
}, co = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === gr && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = ji[i] != null ? ji : Rr), function() {
    return t[i];
  };
}, Mm = function(t, e, i, r) {
  if (Gc(t) && (t = t(e, i, r)), typeof t != "object")
    return od(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
    n[o] = o !== "onAutoKill" && Gc(t[o]) ? t[o](e, i, r) : t[o];
  return n;
}, ad = function(t, e) {
  if (t = rd(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), r = !e || e === gr || e === Rr, n = r ? {
    top: ji.clientTop - (gr.pageYOffset || ji.scrollTop || Rr.scrollTop || 0),
    left: ji.clientLeft - (gr.pageXOffset || ji.scrollLeft || Rr.scrollLeft || 0)
  } : e.getBoundingClientRect(), o = {
    x: i.left - n.left,
    y: i.top - n.top
  };
  return !r && e && (o.x += co(e, "x")(), o.y += co(e, "y")()), o;
}, Kc = function(t, e, i, r, n) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - n : od(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + r - n : t === "max" ? uo(e, i) - n : Math.min(uo(e, i), ad(t, e)[i] - n);
}, jl = function() {
  He = sd(), nd() && He && typeof document < "u" && document.body && (gr = window, Rr = document.body, ji = document.documentElement, rd = He.utils.toArray, He.config({
    autoKillThreshold: 7
  }), Kn = He.config(), id = 1);
}, bn = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    He = t, jl();
  },
  init: function(t, e, i, r, n) {
    id || jl();
    var o = this, a = He.getProperty(t, "scrollSnapType");
    o.isWin = t === gr, o.target = t, o.tween = i, e = Mm(e, r, t, n), o.vars = e, o.autoKill = !!("autoKill" in e ? e : Kn).autoKill, o.getX = co(t, "x"), o.getY = co(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), $o || ($o = He.core.globals().ScrollTrigger), He.getProperty(t, "scrollBehavior") === "smooth" && He.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, Kc(e.x, t, "x", o.x, e.offsetX || 0), r, n), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, Kc(e.y, t, "y", o.y, e.offsetY || 0), r, n), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, r = e.target, n = e.tween, o = e.autoKill, a = e.xPrev, u = e.yPrev, c = e.isWin, h = e.snap, f = e.snapInline, d, l, g, p, v; i; )
      i.r(t, i.d), i = i._next;
    d = c || !e.skipX ? e.getX() : a, l = c || !e.skipY ? e.getY() : u, g = l - u, p = d - a, v = Kn.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > v || p < -v) && d < uo(r, "x") && (e.skipX = 1), !e.skipY && (g > v || g < -v) && l < uo(r, "y") && (e.skipY = 1), e.skipX && e.skipY && (n.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(n, e.vars.onAutoKillParams || []))), c ? gr.scrollTo(e.skipX ? d : e.x, e.skipY ? l : e.y) : (e.skipY || (r.scrollTop = e.y), e.skipX || (r.scrollLeft = e.x)), h && (t === 1 || t === 0) && (l = r.scrollTop, d = r.scrollLeft, f ? r.style.scrollSnapType = f : r.style.removeProperty("scroll-snap-type"), r.scrollTop = l + 1, r.scrollLeft = d + 1, r.scrollTop = l, r.scrollLeft = d), e.xPrev = e.x, e.yPrev = e.y, $o && $o.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
bn.max = uo;
bn.getOffset = ad;
bn.buildGetter = co;
bn.config = function(s) {
  Kn || jl() || (Kn = He.config());
  for (var t in s)
    Kn[t] = s[t];
};
sd() && He.registerPlugin(bn);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var J, Ln, yt, Yt, fi, It, Yu, xa, ho, Ws, Ps, Ho, ze, Ha, Zl, je, jc, Zc, Dn, ld, gl, ud, Ke, Ql, cd, hd, Sr, Jl, Wu, jn, qu, Sa, tu, ml, Bo = 1, Fe = Date.now, _l = Fe(), ki = 0, As = 0, Qc = function(t, e, i) {
  var r = ci(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Jc = function(t, e) {
  return e && (!ci(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, Lm = function s() {
  return As && requestAnimationFrame(s);
}, th = function() {
  return Ha = 1;
}, eh = function() {
  return Ha = 0;
}, Xi = function(t) {
  return t;
}, Os = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, fd = function() {
  return typeof window < "u";
}, dd = function() {
  return J || fd() && (J = window.gsap) && J.registerPlugin && J;
}, pn = function(t) {
  return !!~Yu.indexOf(t);
}, pd = function(t) {
  return (t === "Height" ? qu : yt["inner" + t]) || fi["client" + t] || It["client" + t];
}, gd = function(t) {
  return Dr(t, "getBoundingClientRect") || (pn(t) ? function() {
    return ha.width = yt.innerWidth, ha.height = qu, ha;
  } : function() {
    return hr(t);
  });
}, Dm = function(t, e, i) {
  var r = i.d, n = i.d2, o = i.a;
  return (o = Dr(t, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (e ? pd(n) : t["client" + n]) || 0;
  };
}, Rm = function(t, e) {
  return !e || ~tr.indexOf(t) ? gd(t) : function() {
    return ha;
  };
}, Zi = function(t, e) {
  var i = e.s, r = e.d2, n = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + r) && (o = Dr(t, i)) ? o() - gd(t)()[n] : pn(t) ? (fi[i] || It[i]) - pd(r) : t[i] - t["offset" + r]);
}, Yo = function(t, e) {
  for (var i = 0; i < Dn.length; i += 3)
    (!e || ~e.indexOf(Dn[i + 1])) && t(Dn[i], Dn[i + 1], Dn[i + 2]);
}, ci = function(t) {
  return typeof t == "string";
}, Be = function(t) {
  return typeof t == "function";
}, ks = function(t) {
  return typeof t == "number";
}, Kr = function(t) {
  return typeof t == "object";
}, _s = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, vl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, On = Math.abs, md = "left", _d = "top", Uu = "right", Xu = "bottom", an = "width", ln = "height", qs = "Right", Us = "Left", Xs = "Top", Vs = "Bottom", fe = "padding", Ci = "margin", as = "Width", Vu = "Height", we = "px", Pi = function(t) {
  return yt.getComputedStyle(t);
}, Nm = function(t) {
  var e = Pi(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, ih = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, hr = function(t, e) {
  var i = e && Pi(t)[Zl] !== "matrix(1, 0, 0, 1, 0, 0)" && J.to(t, {
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
}, Ea = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, vd = function(t) {
  var e = [], i = t.labels, r = t.duration(), n;
  for (n in i)
    e.push(i[n] / r);
  return e;
}, zm = function(t) {
  return function(e) {
    return J.utils.snap(vd(t), e);
  };
}, Gu = function(t) {
  var e = J.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(r, n) {
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
}, Fm = function(t) {
  return function(e, i) {
    return Gu(vd(t))(e, i.direction);
  };
}, Wo = function(t, e, i, r) {
  return i.split(",").forEach(function(n) {
    return t(e, n, r);
  });
}, Pe = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: !r,
    capture: !!n
  });
}, Ce = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, qo = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, rh = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Uo = {
  toggleActions: "play",
  anticipatePin: 0
}, Ca = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, aa = function(t, e) {
  if (ci(t)) {
    var i = t.indexOf("="), r = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (r *= e / 100), t = t.substr(0, i - 1)), t = r + (t in Ca ? Ca[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, Xo = function(t, e, i, r, n, o, a, u) {
  var c = n.startColor, h = n.endColor, f = n.fontSize, d = n.indent, l = n.fontWeight, g = Yt.createElement("div"), p = pn(i) || Dr(i, "pinType") === "fixed", v = t.indexOf("scroller") !== -1, x = p ? It : i, E = t.indexOf("start") !== -1, C = E ? c : h, S = "border-color:" + C + ";font-size:" + f + ";color:" + C + ";font-weight:" + l + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return S += "position:" + ((v || u) && p ? "fixed;" : "absolute;"), (v || u || !p) && (S += (r === xe ? Uu : Xu) + ":" + (o + parseFloat(d)) + "px;"), a && (S += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = E, g.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), g.style.cssText = S, g.innerText = e || e === 0 ? t + "-" + e : t, x.children[0] ? x.insertBefore(g, x.children[0]) : x.appendChild(g), g._offset = g["offset" + r.op.d2], la(g, 0, r, E), g;
}, la = function(t, e, i, r) {
  var n = {
    display: "block"
  }, o = i[r ? "os2" : "p2"], a = i[r ? "p2" : "os2"];
  t._isFlipped = r, n[i.a + "Percent"] = r ? -100 : 0, n[i.a] = r ? "1px" : 0, n["border" + o + as] = 1, n["border" + a + as] = 0, n[i.p] = e + "px", J.set(t, n);
}, _t = [], eu = {}, fo, nh = function() {
  return Fe() - ki > 34 && (fo || (fo = requestAnimationFrame(mr)));
}, kn = function() {
  (!Ke || !Ke.isPressed || Ke.startX > It.clientWidth) && (wt.cache++, Ke ? fo || (fo = requestAnimationFrame(mr)) : mr(), ki || mn("scrollStart"), ki = Fe());
}, yl = function() {
  hd = yt.innerWidth, cd = yt.innerHeight;
}, Is = function(t) {
  wt.cache++, (t === !0 || !ze && !ud && !Yt.fullscreenElement && !Yt.webkitFullscreenElement && (!Ql || hd !== yt.innerWidth || Math.abs(yt.innerHeight - cd) > yt.innerHeight * 0.25)) && xa.restart(!0);
}, gn = {}, $m = [], yd = function s() {
  return Ce(bt, "scrollEnd", s) || Qr(!0);
}, mn = function(t) {
  return gn[t] && gn[t].map(function(e) {
    return e();
  }) || $m;
}, ui = [], wd = function(t) {
  for (var e = 0; e < ui.length; e += 5)
    (!t || ui[e + 4] && ui[e + 4].query === t) && (ui[e].style.cssText = ui[e + 1], ui[e].getBBox && ui[e].setAttribute("transform", ui[e + 2] || ""), ui[e + 3].uncache = 1);
}, Ku = function(t, e) {
  var i;
  for (je = 0; je < _t.length; je++)
    i = _t[je], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  Sa = !0, e && wd(e), e || mn("revert");
}, bd = function(t, e) {
  wt.cache++, (e || !Ze) && wt.forEach(function(i) {
    return Be(i) && i.cacheID++ && (i.rec = 0);
  }), ci(t) && (yt.history.scrollRestoration = Wu = t);
}, Ze, un = 0, sh, Hm = function() {
  if (sh !== un) {
    var t = sh = un;
    requestAnimationFrame(function() {
      return t === un && Qr(!0);
    });
  }
}, Td = function() {
  It.appendChild(jn), qu = !Ke && jn.offsetHeight || yt.innerHeight, It.removeChild(jn);
}, oh = function(t) {
  return ho(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, Qr = function(t, e) {
  if (fi = Yt.documentElement, It = Yt.body, Yu = [yt, Yt, fi, It], ki && !t && !Sa) {
    Pe(bt, "scrollEnd", yd);
    return;
  }
  Td(), Ze = bt.isRefreshing = !0, wt.forEach(function(r) {
    return Be(r) && ++r.cacheID && (r.rec = r());
  });
  var i = mn("refreshInit");
  ld && bt.sort(), e || Ku(), wt.forEach(function(r) {
    Be(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), _t.slice(0).forEach(function(r) {
    return r.refresh();
  }), Sa = !1, _t.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[n];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[n] - o), r.refresh();
    }
  }), tu = 1, oh(!0), _t.forEach(function(r) {
    var n = Zi(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > n, a = r._startClamp && r.start >= n;
    (o || a) && r.setPositions(a ? n - 1 : r.start, o ? Math.max(a ? n : r.start + 1, n) : r.end, !0);
  }), oh(!1), tu = 0, i.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), wt.forEach(function(r) {
    Be(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), bd(Wu, 1), xa.pause(), un++, Ze = 2, mr(2), _t.forEach(function(r) {
    return Be(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Ze = bt.isRefreshing = !1, mn("refresh");
}, iu = 0, ua = 1, Gs, mr = function(t) {
  if (t === 2 || !Ze && !Sa) {
    bt.isUpdating = !0, Gs && Gs.update(0);
    var e = _t.length, i = Fe(), r = i - _l >= 50, n = e && _t[0].scroll();
    if (ua = iu > n ? -1 : 1, Ze || (iu = n), r && (ki && !Ha && i - ki > 200 && (ki = 0, mn("scrollEnd")), Ps = _l, _l = i), ua < 0) {
      for (je = e; je-- > 0; )
        _t[je] && _t[je].update(0, r);
      ua = 1;
    } else
      for (je = 0; je < e; je++)
        _t[je] && _t[je].update(0, r);
    bt.isUpdating = !1;
  }
  fo = 0;
}, ru = [md, _d, Xu, Uu, Ci + Vs, Ci + qs, Ci + Xs, Ci + Us, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], ca = ru.concat([an, ln, "boxSizing", "max" + as, "max" + Vu, "position", Ci, fe, fe + Xs, fe + qs, fe + Vs, fe + Us]), Bm = function(t, e, i) {
  Zn(i);
  var r = t._gsap;
  if (r.spacerIsNative)
    Zn(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = e.parentNode;
    n && (n.insertBefore(t, e), n.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, wl = function(t, e, i, r) {
  if (!t._gsap.swappedIn) {
    for (var n = ru.length, o = e.style, a = t.style, u; n--; )
      u = ru[n], o[u] = i[u];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[Xu] = a[Uu] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[an] = Ea(t, Je) + we, o[ln] = Ea(t, xe) + we, o[fe] = a[Ci] = a[_d] = a[md] = "0", Zn(r), a[an] = a["max" + as] = i[an], a[ln] = a["max" + Vu] = i[ln], a[fe] = i[fe], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Ym = /([A-Z])/g, Zn = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, r = 0, n, o;
    for ((t.t._gsap || J.core.getCache(t.t)).uncache = 1; r < i; r += 2)
      o = t[r + 1], n = t[r], o ? e[n] = o : e[n] && e.removeProperty(n.replace(Ym, "-$1").toLowerCase());
  }
}, Vo = function(t) {
  for (var e = ca.length, i = t.style, r = [], n = 0; n < e; n++)
    r.push(ca[n], i[ca[n]]);
  return r.t = t, r;
}, Wm = function(t, e, i) {
  for (var r = [], n = t.length, o = i ? 8 : 0, a; o < n; o += 2)
    a = t[o], r.push(a, a in e ? e[a] : t[o + 1]);
  return r.t = t.t, r;
}, ha = {
  left: 0,
  top: 0
}, ah = function(t, e, i, r, n, o, a, u, c, h, f, d, l, g) {
  Be(t) && (t = t(u)), ci(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? aa("0" + t.substr(3), i) : 0));
  var p = l ? l.time() : 0, v, x, E;
  if (l && l.seek(0), isNaN(t) || (t = +t), ks(t))
    l && (t = J.utils.mapRange(l.scrollTrigger.start, l.scrollTrigger.end, 0, d, t)), a && la(a, i, r, !0);
  else {
    Be(e) && (e = e(u));
    var C = (t || "0").split(" "), S, b, I, P;
    E = ii(e, u) || It, S = hr(E) || {}, (!S || !S.left && !S.top) && Pi(E).display === "none" && (P = E.style.display, E.style.display = "block", S = hr(E), P ? E.style.display = P : E.style.removeProperty("display")), b = aa(C[0], S[r.d]), I = aa(C[1] || "0", i), t = S[r.p] - c[r.p] - h + b + n - I, a && la(a, I, r, i - I < 20 || a._isStart && I > 20), i -= i - I;
  }
  if (g && (u[g] = t || -1e-3, t < 0 && (t = 0)), o) {
    var O = t + i, R = o._isStart;
    v = "scroll" + r.d2, la(o, O, r, R && O > 20 || !R && (f ? Math.max(It[v], fi[v]) : o.parentNode[v]) <= O + 1), f && (c = hr(a), f && (o.style[r.op.p] = c[r.op.p] - r.op.m - o._offset + we));
  }
  return l && E && (v = hr(E), l.seek(d), x = hr(E), l._caScrollDist = v[r.p] - x[r.p], t = t / l._caScrollDist * d), l && l.seek(p), l ? t : Math.round(t);
}, qm = /(webkit|moz|length|cssText|inset)/i, lh = function(t, e, i, r) {
  if (t.parentNode !== e) {
    var n = t.style, o, a;
    if (e === It) {
      t._stOrig = n.cssText, a = Pi(t);
      for (o in a)
        !+o && !qm.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
      n.top = i, n.left = r;
    } else
      n.cssText = t._stOrig;
    J.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, xd = function(t, e, i) {
  var r = e, n = r;
  return function(o) {
    var a = Math.round(t());
    return a !== r && a !== n && Math.abs(a - r) > 3 && Math.abs(a - n) > 3 && (o = a, i && i()), n = r, r = Math.round(o), r;
  };
}, Go = function(t, e, i) {
  var r = {};
  r[e.p] = "+=" + i, J.set(t, r);
}, uh = function(t, e) {
  var i = Hr(t, e), r = "_scroll" + e.p2, n = function o(a, u, c, h, f) {
    var d = o.tween, l = u.onComplete, g = {};
    c = c || i();
    var p = xd(i, c, function() {
      d.kill(), o.tween = 0;
    });
    return f = h && f || 0, h = h || a - c, d && d.kill(), u[r] = a, u.inherit = !1, u.modifiers = g, g[r] = function() {
      return p(c + h * d.ratio + f * d.ratio * d.ratio);
    }, u.onUpdate = function() {
      wt.cache++, o.tween && mr();
    }, u.onComplete = function() {
      o.tween = 0, l && l.call(d);
    }, d = o.tween = J.to(t, u), d;
  };
  return t[r] = i, i.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Pe(t, "wheel", i.wheelHandler), bt.isTouch && Pe(t, "touchmove", i.wheelHandler), n;
}, bt = /* @__PURE__ */ function() {
  function s(e, i) {
    Ln || s.register(J) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Jl(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !As) {
      this.update = this.refresh = this.kill = Xi;
      return;
    }
    i = ih(ci(i) || ks(i) || i.nodeType ? {
      trigger: i
    } : i, Uo);
    var n = i, o = n.onUpdate, a = n.toggleClass, u = n.id, c = n.onToggle, h = n.onRefresh, f = n.scrub, d = n.trigger, l = n.pin, g = n.pinSpacing, p = n.invalidateOnRefresh, v = n.anticipatePin, x = n.onScrubComplete, E = n.onSnapComplete, C = n.once, S = n.snap, b = n.pinReparent, I = n.pinSpacer, P = n.containerAnimation, O = n.fastScrollEnd, R = n.preventOverlaps, z = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? Je : xe, U = !f && f !== 0, F = ii(i.scroller || yt), Y = J.core.getCache(F), tt = pn(F), it = ("pinType" in i ? i.pinType : Dr(F, "pinType") || tt && "fixed") === "fixed", j = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], V = U && i.toggleActions.split(" "), N = "markers" in i ? i.markers : Uo.markers, W = tt ? 0 : parseFloat(Pi(F)["border" + z.p2 + as]) || 0, _ = this, q = i.onRefreshInit && function() {
      return i.onRefreshInit(_);
    }, Z = Dm(F, tt, z), G = Rm(F, tt), et = 0, Dt = 0, pt = 0, vt = Hr(F, z), ht, qt, Bt, Nt, Ut, dt, gt, lt, Se, k, zt, qe, Oe, Mt, Rt, ae, Ue, Vt, ie, Pt, le, ke, De, Wi, Xt, qi, ei, me, Ie, wi, Re, at, Ne, Lt, Ee, te, bi, rt, y;
    if (_._startClamp = _._endClamp = !1, _._dir = z, v *= 45, _.scroller = F, _.scroll = P ? P.time.bind(P) : vt, Nt = vt(), _.vars = i, r = r || i.animation, "refreshPriority" in i && (ld = 1, i.refreshPriority === -9999 && (Gs = _)), Y.tweenScroll = Y.tweenScroll || {
      top: uh(F, xe),
      left: uh(F, Je)
    }, _.tweenTo = ht = Y.tweenScroll[z.p], _.scrubDuration = function(M) {
      Ne = ks(M) && M, Ne ? at ? at.duration(M) : at = J.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Ne,
        paused: !0,
        onComplete: function() {
          return x && x(_);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, r && (r.vars.lazy = !1, r._initted && !_.isReverted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), _.animation = r.pause(), r.scrollTrigger = _, _.scrubDuration(f), wi = 0, u || (u = r.vars.id)), S && ((!Kr(S) || S.push) && (S = {
      snapTo: S
    }), "scrollBehavior" in It.style && J.set(tt ? [It, fi] : F, {
      scrollBehavior: "auto"
    }), wt.forEach(function(M) {
      return Be(M) && M.target === (tt ? Yt.scrollingElement || fi : F) && (M.smooth = !1);
    }), Bt = Be(S.snapTo) ? S.snapTo : S.snapTo === "labels" ? zm(r) : S.snapTo === "labelsDirectional" ? Fm(r) : S.directional !== !1 ? function(M, X) {
      return Gu(S.snapTo)(M, Fe() - Dt < 500 ? 0 : X.direction);
    } : J.utils.snap(S.snapTo), Lt = S.duration || {
      min: 0.1,
      max: 2
    }, Lt = Kr(Lt) ? Ws(Lt.min, Lt.max) : Ws(Lt, Lt), Ee = J.delayedCall(S.delay || Ne / 2 || 0.1, function() {
      var M = vt(), X = Fe() - Dt < 500, $ = ht.tween;
      if ((X || Math.abs(_.getVelocity()) < 10) && !$ && !Ha && et !== M) {
        var K = (M - dt) / Mt, st = r && !U ? r.totalProgress() : K, Q = X ? 0 : (st - Re) / (Fe() - Ps) * 1e3 || 0, ct = J.utils.clamp(-K, 1 - K, On(Q / 2) * Q / 0.185), Tt = K + (S.inertia === !1 ? 0 : ct), Ct, mt, ft = S, At = ft.onStart, ut = ft.onInterrupt, _e = ft.onComplete;
        if (Ct = Bt(Tt, _), ks(Ct) || (Ct = Tt), mt = Math.max(0, Math.round(dt + Ct * Mt)), M <= gt && M >= dt && mt !== M) {
          if ($ && !$._initted && $.data <= On(mt - M))
            return;
          S.inertia === !1 && (ct = Ct - K), ht(mt, {
            duration: Lt(On(Math.max(On(Tt - st), On(Ct - st)) * 0.185 / Q / 0.05 || 0)),
            ease: S.ease || "power3",
            data: On(mt - M),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ee.restart(!0) && ut && ut(_);
            },
            onComplete: function() {
              _.update(), et = vt(), r && !U && (at ? at.resetTo("totalProgress", Ct, r._tTime / r._tDur) : r.progress(Ct)), wi = Re = r && !U ? r.totalProgress() : _.progress, E && E(_), _e && _e(_);
            }
          }, M, ct * Mt, mt - M - ct * Mt), At && At(_, ht.tween);
        }
      } else _.isActive && et !== M && Ee.restart(!0);
    }).pause()), u && (eu[u] = _), d = _.trigger = ii(d || l !== !0 && l), y = d && d._gsap && d._gsap.stRevert, y && (y = y(_)), l = l === !0 ? d : ii(l), ci(a) && (a = {
      targets: d,
      className: a
    }), l && (g === !1 || g === Ci || (g = !g && l.parentNode && l.parentNode.style && Pi(l.parentNode).display === "flex" ? !1 : fe), _.pin = l, qt = J.core.getCache(l), qt.spacer ? Rt = qt.pinState : (I && (I = ii(I), I && !I.nodeType && (I = I.current || I.nativeElement), qt.spacerIsNative = !!I, I && (qt.spacerState = Vo(I))), qt.spacer = Vt = I || Yt.createElement("div"), Vt.classList.add("pin-spacer"), u && Vt.classList.add("pin-spacer-" + u), qt.pinState = Rt = Vo(l)), i.force3D !== !1 && J.set(l, {
      force3D: !0
    }), _.spacer = Vt = qt.spacer, Ie = Pi(l), Wi = Ie[g + z.os2], Pt = J.getProperty(l), le = J.quickSetter(l, z.a, we), wl(l, Vt, Ie), Ue = Vo(l)), N) {
      qe = Kr(N) ? ih(N, rh) : rh, k = Xo("scroller-start", u, F, z, qe, 0), zt = Xo("scroller-end", u, F, z, qe, 0, k), ie = k["offset" + z.op.d2];
      var B = ii(Dr(F, "content") || F);
      lt = this.markerStart = Xo("start", u, B, z, qe, ie, 0, P), Se = this.markerEnd = Xo("end", u, B, z, qe, ie, 0, P), P && (rt = J.quickSetter([lt, Se], z.a, we)), !it && !(tr.length && Dr(F, "fixedMarkers") === !0) && (Nm(tt ? It : F), J.set([k, zt], {
        force3D: !0
      }), qi = J.quickSetter(k, z.a, we), me = J.quickSetter(zt, z.a, we));
    }
    if (P) {
      var T = P.vars.onUpdate, A = P.vars.onUpdateParams;
      P.eventCallback("onUpdate", function() {
        _.update(0, 0, 1), T && T.apply(P, A || []);
      });
    }
    if (_.previous = function() {
      return _t[_t.indexOf(_) - 1];
    }, _.next = function() {
      return _t[_t.indexOf(_) + 1];
    }, _.revert = function(M, X) {
      if (!X)
        return _.kill(!0);
      var $ = M !== !1 || !_.enabled, K = ze;
      $ !== _.isReverted && ($ && (te = Math.max(vt(), _.scroll.rec || 0), pt = _.progress, bi = r && r.progress()), lt && [lt, Se, k, zt].forEach(function(st) {
        return st.style.display = $ ? "none" : "block";
      }), $ && (ze = _, _.update($)), l && (!b || !_.isActive) && ($ ? Bm(l, Vt, Rt) : wl(l, Vt, Pi(l), Xt)), $ || _.update($), ze = K, _.isReverted = $);
    }, _.refresh = function(M, X, $, K) {
      if (!((ze || !_.enabled) && !X)) {
        if (l && M && ki) {
          Pe(s, "scrollEnd", yd);
          return;
        }
        !Ze && q && q(_), ze = _, ht.tween && !$ && (ht.tween.kill(), ht.tween = 0), at && at.pause(), p && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren && r.getChildren(!0, !0, !1).forEach(function(Ri) {
          return Ri.vars.immediateRender && Ri.render(0, !0, !0);
        })), _.isReverted || _.revert(!0, !0), _._subPinOffset = !1;
        var st = Z(), Q = G(), ct = P ? P.duration() : Zi(F, z), Tt = Mt <= 0.01 || !Mt, Ct = 0, mt = K || 0, ft = Kr($) ? $.end : i.end, At = i.endTrigger || d, ut = Kr($) ? $.start : i.start || (i.start === 0 || !d ? 0 : l ? "0 0" : "0 100%"), _e = _.pinnedContainer = i.pinnedContainer && ii(i.pinnedContainer, _), Gt = d && Math.max(0, _t.indexOf(_)) || 0, ve = Gt, ye, ue, rr, nr, ce, re, Xe, xn, Io, Wr, Ti, sr, Sn;
        for (N && Kr($) && (sr = J.getProperty(k, z.p), Sn = J.getProperty(zt, z.p)); ve-- > 0; )
          re = _t[ve], re.end || re.refresh(0, 1) || (ze = _), Xe = re.pin, Xe && (Xe === d || Xe === l || Xe === _e) && !re.isReverted && (Wr || (Wr = []), Wr.unshift(re), re.revert(!0, !0)), re !== _t[ve] && (Gt--, ve--);
        for (Be(ut) && (ut = ut(_)), ut = Qc(ut, "start", _), dt = ah(ut, d, st, z, vt(), lt, k, _, Q, W, it, ct, P, _._startClamp && "_startClamp") || (l ? -1e-3 : 0), Be(ft) && (ft = ft(_)), ci(ft) && !ft.indexOf("+=") && (~ft.indexOf(" ") ? ft = (ci(ut) ? ut.split(" ")[0] : "") + ft : (Ct = aa(ft.substr(2), st), ft = ci(ut) ? ut : (P ? J.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, dt) : dt) + Ct, At = d)), ft = Qc(ft, "end", _), gt = Math.max(dt, ah(ft || (At ? "100% 0" : ct), At, st, z, vt() + Ct, Se, zt, _, Q, W, it, ct, P, _._endClamp && "_endClamp")) || -1e-3, Ct = 0, ve = Gt; ve--; )
          re = _t[ve], Xe = re.pin, Xe && re.start - re._pinPush <= dt && !P && re.end > 0 && (ye = re.end - (_._startClamp ? Math.max(0, re.start) : re.start), (Xe === d && re.start - re._pinPush < dt || Xe === _e) && isNaN(ut) && (Ct += ye * (1 - re.progress)), Xe === l && (mt += ye));
        if (dt += Ct, gt += Ct, _._startClamp && (_._startClamp += Ct), _._endClamp && !Ze && (_._endClamp = gt || -1e-3, gt = Math.min(gt, Zi(F, z))), Mt = gt - dt || (dt -= 0.01) && 1e-3, Tt && (pt = J.utils.clamp(0, 1, J.utils.normalize(dt, gt, te))), _._pinPush = mt, lt && Ct && (ye = {}, ye[z.a] = "+=" + Ct, _e && (ye[z.p] = "-=" + vt()), J.set([lt, Se], ye)), l && !(tu && _.end >= Zi(F, z)))
          ye = Pi(l), nr = z === xe, rr = vt(), ke = parseFloat(Pt(z.a)) + mt, !ct && gt > 1 && (Ti = (tt ? Yt.scrollingElement || fi : F).style, Ti = {
            style: Ti,
            value: Ti["overflow" + z.a.toUpperCase()]
          }, tt && Pi(It)["overflow" + z.a.toUpperCase()] !== "scroll" && (Ti.style["overflow" + z.a.toUpperCase()] = "scroll")), wl(l, Vt, ye), Ue = Vo(l), ue = hr(l, !0), xn = it && Hr(F, nr ? Je : xe)(), g ? (Xt = [g + z.os2, Mt + mt + we], Xt.t = Vt, ve = g === fe ? Ea(l, z) + Mt + mt : 0, ve && (Xt.push(z.d, ve + we), Vt.style.flexBasis !== "auto" && (Vt.style.flexBasis = ve + we)), Zn(Xt), _e && _t.forEach(function(Ri) {
            Ri.pin === _e && Ri.vars.pinSpacing !== !1 && (Ri._subPinOffset = !0);
          }), it && vt(te)) : (ve = Ea(l, z), ve && Vt.style.flexBasis !== "auto" && (Vt.style.flexBasis = ve + we)), it && (ce = {
            top: ue.top + (nr ? rr - dt : xn) + we,
            left: ue.left + (nr ? xn : rr - dt) + we,
            boxSizing: "border-box",
            position: "fixed"
          }, ce[an] = ce["max" + as] = Math.ceil(ue.width) + we, ce[ln] = ce["max" + Vu] = Math.ceil(ue.height) + we, ce[Ci] = ce[Ci + Xs] = ce[Ci + qs] = ce[Ci + Vs] = ce[Ci + Us] = "0", ce[fe] = ye[fe], ce[fe + Xs] = ye[fe + Xs], ce[fe + qs] = ye[fe + qs], ce[fe + Vs] = ye[fe + Vs], ce[fe + Us] = ye[fe + Us], ae = Wm(Rt, ce, b), Ze && vt(0)), r ? (Io = r._initted, gl(1), r.render(r.duration(), !0, !0), De = Pt(z.a) - ke + Mt + mt, ei = Math.abs(Mt - De) > 1, it && ei && ae.splice(ae.length - 2, 2), r.render(0, !0, !0), Io || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), gl(0)) : De = Mt, Ti && (Ti.value ? Ti.style["overflow" + z.a.toUpperCase()] = Ti.value : Ti.style.removeProperty("overflow-" + z.a));
        else if (d && vt() && !P)
          for (ue = d.parentNode; ue && ue !== It; )
            ue._pinOffset && (dt -= ue._pinOffset, gt -= ue._pinOffset), ue = ue.parentNode;
        Wr && Wr.forEach(function(Ri) {
          return Ri.revert(!1, !0);
        }), _.start = dt, _.end = gt, Nt = Ut = Ze ? te : vt(), !P && !Ze && (Nt < te && vt(te), _.scroll.rec = 0), _.revert(!1, !0), Dt = Fe(), Ee && (et = -1, Ee.restart(!0)), ze = 0, r && U && (r._initted || bi) && r.progress() !== bi && r.progress(bi || 0, !0).render(r.time(), !0, !0), (Tt || pt !== _.progress || P || p || r && !r._initted) && (r && !U && (r._initted || pt || r.vars.immediateRender !== !1) && r.totalProgress(P && dt < -1e-3 && !pt ? J.utils.normalize(dt, gt, 0) : pt, !0), _.progress = Tt || (Nt - dt) / Mt === pt ? 0 : pt), l && g && (Vt._pinOffset = Math.round(_.progress * De)), at && at.invalidate(), isNaN(sr) || (sr -= J.getProperty(k, z.p), Sn -= J.getProperty(zt, z.p), Go(k, z, sr), Go(lt, z, sr - (K || 0)), Go(zt, z, Sn), Go(Se, z, Sn - (K || 0))), Tt && !Ze && _.update(), h && !Ze && !Oe && (Oe = !0, h(_), Oe = !1);
      }
    }, _.getVelocity = function() {
      return (vt() - Ut) / (Fe() - Ps) * 1e3 || 0;
    }, _.endAnimation = function() {
      _s(_.callbackAnimation), r && (at ? at.progress(1) : r.paused() ? U || _s(r, _.direction < 0, 1) : _s(r, r.reversed()));
    }, _.labelToScroll = function(M) {
      return r && r.labels && (dt || _.refresh() || dt) + r.labels[M] / r.duration() * Mt || 0;
    }, _.getTrailing = function(M) {
      var X = _t.indexOf(_), $ = _.direction > 0 ? _t.slice(0, X).reverse() : _t.slice(X + 1);
      return (ci(M) ? $.filter(function(K) {
        return K.vars.preventOverlaps === M;
      }) : $).filter(function(K) {
        return _.direction > 0 ? K.end <= dt : K.start >= gt;
      });
    }, _.update = function(M, X, $) {
      if (!(P && !$ && !M)) {
        var K = Ze === !0 ? te : _.scroll(), st = M ? 0 : (K - dt) / Mt, Q = st < 0 ? 0 : st > 1 ? 1 : st || 0, ct = _.progress, Tt, Ct, mt, ft, At, ut, _e, Gt;
        if (X && (Ut = Nt, Nt = P ? vt() : K, S && (Re = wi, wi = r && !U ? r.totalProgress() : Q)), v && l && !ze && !Bo && ki && (!Q && dt < K + (K - Ut) / (Fe() - Ps) * v ? Q = 1e-4 : Q === 1 && gt > K + (K - Ut) / (Fe() - Ps) * v && (Q = 0.9999)), Q !== ct && _.enabled) {
          if (Tt = _.isActive = !!Q && Q < 1, Ct = !!ct && ct < 1, ut = Tt !== Ct, At = ut || !!Q != !!ct, _.direction = Q > ct ? 1 : -1, _.progress = Q, At && !ze && (mt = Q && !ct ? 0 : Q === 1 ? 1 : ct === 1 ? 2 : 3, U && (ft = !ut && V[mt + 1] !== "none" && V[mt + 1] || V[mt], Gt = r && (ft === "complete" || ft === "reset" || ft in r))), R && (ut || Gt) && (Gt || f || !r) && (Be(R) ? R(_) : _.getTrailing(R).forEach(function(rr) {
            return rr.endAnimation();
          })), U || (at && !ze && !Bo ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", Q, r._tTime / r._tDur) : (at.vars.totalProgress = Q, at.invalidate().restart())) : r && r.totalProgress(Q, !!(ze && (Dt || M)))), l) {
            if (M && g && (Vt.style[g + z.os2] = Wi), !it)
              le(Os(ke + De * Q));
            else if (At) {
              if (_e = !M && Q > ct && gt + 1 > K && K + 1 >= Zi(F, z), b)
                if (!M && (Tt || _e)) {
                  var ve = hr(l, !0), ye = K - dt;
                  lh(l, It, ve.top + (z === xe ? ye : 0) + we, ve.left + (z === xe ? 0 : ye) + we);
                } else
                  lh(l, Vt);
              Zn(Tt || _e ? ae : Ue), ei && Q < 1 && Tt || le(ke + (Q === 1 && !_e ? De : 0));
            }
          }
          S && !ht.tween && !ze && !Bo && Ee.restart(!0), a && (ut || C && Q && (Q < 1 || !ml)) && ho(a.targets).forEach(function(rr) {
            return rr.classList[Tt || C ? "add" : "remove"](a.className);
          }), o && !U && !M && o(_), At && !ze ? (U && (Gt && (ft === "complete" ? r.pause().totalProgress(1) : ft === "reset" ? r.restart(!0).pause() : ft === "restart" ? r.restart(!0) : r[ft]()), o && o(_)), (ut || !ml) && (c && ut && vl(_, c), j[mt] && vl(_, j[mt]), C && (Q === 1 ? _.kill(!1, 1) : j[mt] = 0), ut || (mt = Q === 1 ? 1 : 3, j[mt] && vl(_, j[mt]))), O && !Tt && Math.abs(_.getVelocity()) > (ks(O) ? O : 2500) && (_s(_.callbackAnimation), at ? at.progress(1) : _s(r, ft === "reverse" ? 1 : !Q, 1))) : U && o && !ze && o(_);
        }
        if (me) {
          var ue = P ? K / P.duration() * (P._caScrollDist || 0) : K;
          qi(ue + (k._isFlipped ? 1 : 0)), me(ue);
        }
        rt && rt(-K / P.duration() * (P._caScrollDist || 0));
      }
    }, _.enable = function(M, X) {
      _.enabled || (_.enabled = !0, Pe(F, "resize", Is), tt || Pe(F, "scroll", kn), q && Pe(s, "refreshInit", q), M !== !1 && (_.progress = pt = 0, Nt = Ut = et = vt()), X !== !1 && _.refresh());
    }, _.getTween = function(M) {
      return M && ht ? ht.tween : at;
    }, _.setPositions = function(M, X, $, K) {
      if (P) {
        var st = P.scrollTrigger, Q = P.duration(), ct = st.end - st.start;
        M = st.start + ct * M / Q, X = st.start + ct * X / Q;
      }
      _.refresh(!1, !1, {
        start: Jc(M, $ && !!_._startClamp),
        end: Jc(X, $ && !!_._endClamp)
      }, K), _.update();
    }, _.adjustPinSpacing = function(M) {
      if (Xt && M) {
        var X = Xt.indexOf(z.d) + 1;
        Xt[X] = parseFloat(Xt[X]) + M + we, Xt[1] = parseFloat(Xt[1]) + M + we, Zn(Xt);
      }
    }, _.disable = function(M, X) {
      if (_.enabled && (M !== !1 && _.revert(!0, !0), _.enabled = _.isActive = !1, X || at && at.pause(), te = 0, qt && (qt.uncache = 1), q && Ce(s, "refreshInit", q), Ee && (Ee.pause(), ht.tween && ht.tween.kill() && (ht.tween = 0)), !tt)) {
        for (var $ = _t.length; $--; )
          if (_t[$].scroller === F && _t[$] !== _)
            return;
        Ce(F, "resize", Is), tt || Ce(F, "scroll", kn);
      }
    }, _.kill = function(M, X) {
      _.disable(M, X), at && !X && at.kill(), u && delete eu[u];
      var $ = _t.indexOf(_);
      $ >= 0 && _t.splice($, 1), $ === je && ua > 0 && je--, $ = 0, _t.forEach(function(K) {
        return K.scroller === _.scroller && ($ = 1);
      }), $ || Ze || (_.scroll.rec = 0), r && (r.scrollTrigger = null, M && r.revert({
        kill: !1
      }), X || r.kill()), lt && [lt, Se, k, zt].forEach(function(K) {
        return K.parentNode && K.parentNode.removeChild(K);
      }), Gs === _ && (Gs = 0), l && (qt && (qt.uncache = 1), $ = 0, _t.forEach(function(K) {
        return K.pin === l && $++;
      }), $ || (qt.spacer = 0)), i.onKill && i.onKill(_);
    }, _t.push(_), _.enable(!1, !1), y && y(_), r && r.add && !Mt) {
      var H = _.update;
      _.update = function() {
        _.update = H, wt.cache++, dt || gt || _.refresh();
      }, J.delayedCall(0.01, _.update), Mt = 0.01, dt = gt = 0;
    } else
      _.refresh();
    l && Hm();
  }, s.register = function(i) {
    return Ln || (J = i || dd(), fd() && window.document && s.enable(), Ln = As), Ln;
  }, s.defaults = function(i) {
    if (i)
      for (var r in i)
        Uo[r] = i[r];
    return Uo;
  }, s.disable = function(i, r) {
    As = 0, _t.forEach(function(o) {
      return o[r ? "kill" : "disable"](i);
    }), Ce(yt, "wheel", kn), Ce(Yt, "scroll", kn), clearInterval(Ho), Ce(Yt, "touchcancel", Xi), Ce(It, "touchstart", Xi), Wo(Ce, Yt, "pointerdown,touchstart,mousedown", th), Wo(Ce, Yt, "pointerup,touchend,mouseup", eh), xa.kill(), Yo(Ce);
    for (var n = 0; n < wt.length; n += 3)
      qo(Ce, wt[n], wt[n + 1]), qo(Ce, wt[n], wt[n + 2]);
  }, s.enable = function() {
    if (yt = window, Yt = document, fi = Yt.documentElement, It = Yt.body, J && (ho = J.utils.toArray, Ws = J.utils.clamp, Jl = J.core.context || Xi, gl = J.core.suppressOverwrites || Xi, Wu = yt.history.scrollRestoration || "auto", iu = yt.pageYOffset || 0, J.core.globals("ScrollTrigger", s), It)) {
      As = 1, jn = document.createElement("div"), jn.style.height = "100vh", jn.style.position = "absolute", Td(), Lm(), oe.register(J), s.isTouch = oe.isTouch, Sr = oe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ql = oe.isTouch === 1, Pe(yt, "wheel", kn), Yu = [yt, Yt, fi, It], J.matchMedia ? (s.matchMedia = function(c) {
        var h = J.matchMedia(), f;
        for (f in c)
          h.add(f, c[f]);
        return h;
      }, J.addEventListener("matchMediaInit", function() {
        return Ku();
      }), J.addEventListener("matchMediaRevert", function() {
        return wd();
      }), J.addEventListener("matchMedia", function() {
        Qr(0, 1), mn("matchMedia");
      }), J.matchMedia().add("(orientation: portrait)", function() {
        return yl(), yl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), yl(), Pe(Yt, "scroll", kn);
      var i = It.hasAttribute("style"), r = It.style, n = r.borderTopStyle, o = J.core.Animation.prototype, a, u;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), r.borderTopStyle = "solid", a = hr(It), xe.m = Math.round(a.top + xe.sc()) || 0, Je.m = Math.round(a.left + Je.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), i || (It.setAttribute("style", ""), It.removeAttribute("style")), Ho = setInterval(nh, 250), J.delayedCall(0.5, function() {
        return Bo = 0;
      }), Pe(Yt, "touchcancel", Xi), Pe(It, "touchstart", Xi), Wo(Pe, Yt, "pointerdown,touchstart,mousedown", th), Wo(Pe, Yt, "pointerup,touchend,mouseup", eh), Zl = J.utils.checkPrefix("transform"), ca.push(Zl), Ln = Fe(), xa = J.delayedCall(0.2, Qr).pause(), Dn = [Yt, "visibilitychange", function() {
        var c = yt.innerWidth, h = yt.innerHeight;
        Yt.hidden ? (jc = c, Zc = h) : (jc !== c || Zc !== h) && Is();
      }, Yt, "DOMContentLoaded", Qr, yt, "load", Qr, yt, "resize", Is], Yo(Pe), _t.forEach(function(c) {
        return c.enable(0, 1);
      }), u = 0; u < wt.length; u += 3)
        qo(Ce, wt[u], wt[u + 1]), qo(Ce, wt[u], wt[u + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (ml = !!i.limitCallbacks);
    var r = i.syncInterval;
    r && clearInterval(Ho) || (Ho = r) && setInterval(nh, r), "ignoreMobileResize" in i && (Ql = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Yo(Ce) || Yo(Pe, i.autoRefreshEvents || "none"), ud = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, r) {
    var n = ii(i), o = wt.indexOf(n), a = pn(n);
    ~o && wt.splice(o, a ? 6 : 2), r && (a ? tr.unshift(yt, r, It, r, fi, r) : tr.unshift(n, r));
  }, s.clearMatchMedia = function(i) {
    _t.forEach(function(r) {
      return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, r, n) {
    var o = (ci(i) ? ii(i) : i).getBoundingClientRect(), a = o[n ? an : ln] * r || 0;
    return n ? o.right - a > 0 && o.left + a < yt.innerWidth : o.bottom - a > 0 && o.top + a < yt.innerHeight;
  }, s.positionInViewport = function(i, r, n) {
    ci(i) && (i = ii(i));
    var o = i.getBoundingClientRect(), a = o[n ? an : ln], u = r == null ? a / 2 : r in Ca ? Ca[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return n ? (o.left + u) / yt.innerWidth : (o.top + u) / yt.innerHeight;
  }, s.killAll = function(i) {
    if (_t.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), i !== !0) {
      var r = gn.killAll || [];
      gn = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, s;
}();
bt.version = "3.13.0";
bt.saveStyles = function(s) {
  return s ? ho(s).forEach(function(t) {
    if (t && t.style) {
      var e = ui.indexOf(t);
      e >= 0 && ui.splice(e, 5), ui.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), J.core.getCache(t), Jl());
    }
  }) : ui;
};
bt.revert = function(s, t) {
  return Ku(!s, t);
};
bt.create = function(s, t) {
  return new bt(s, t);
};
bt.refresh = function(s) {
  return s ? Is(!0) : (Ln || bt.register()) && Qr(!0);
};
bt.update = function(s) {
  return ++wt.cache && mr(s === !0 ? 2 : 0);
};
bt.clearScrollMemory = bd;
bt.maxScroll = function(s, t) {
  return Zi(s, t ? Je : xe);
};
bt.getScrollFunc = function(s, t) {
  return Hr(ii(s), t ? Je : xe);
};
bt.getById = function(s) {
  return eu[s];
};
bt.getAll = function() {
  return _t.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
bt.isScrolling = function() {
  return !!ki;
};
bt.snapDirectional = Gu;
bt.addEventListener = function(s, t) {
  var e = gn[s] || (gn[s] = []);
  ~e.indexOf(t) || e.push(t);
};
bt.removeEventListener = function(s, t) {
  var e = gn[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
bt.batch = function(s, t) {
  var e = [], i = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, o = function(c, h) {
    var f = [], d = [], l = J.delayedCall(r, function() {
      h(f, d), f = [], d = [];
    }).pause();
    return function(g) {
      f.length || l.restart(!0), f.push(g.trigger), d.push(g), n <= f.length && l.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Be(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return Be(n) && (n = n(), Pe(bt, "refresh", function() {
    return n = t.batchMax();
  })), ho(s).forEach(function(u) {
    var c = {};
    for (a in i)
      c[a] = i[a];
    c.trigger = u, e.push(bt.create(c));
  }), e;
};
var ch = function(t, e, i, r) {
  return e > r ? t(r) : e < 0 && t(0), i > r ? (r - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, bl = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (oe.isTouch ? " pinch-zoom" : "") : "none", t === fi && s(It, e);
}, Ko = {
  auto: 1,
  scroll: 1
}, Um = function(t) {
  var e = t.event, i = t.target, r = t.axis, n = (e.changedTouches ? e.changedTouches[0] : e).target, o = n._gsap || J.core.getCache(n), a = Fe(), u;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; n && n !== It && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Ko[(u = Pi(n)).overflowY] || Ko[u.overflowX])); )
      n = n.parentNode;
    o._isScroll = n && n !== i && !pn(n) && (Ko[(u = Pi(n)).overflowY] || Ko[u.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || r === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Sd = function(t, e, i, r) {
  return oe.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: r = r && Um,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return i && Pe(Yt, oe.eventTypes[0], fh, !1, !0);
    },
    onDisable: function() {
      return Ce(Yt, oe.eventTypes[0], fh, !0);
    }
  });
}, Xm = /(input|label|select|textarea)/i, hh, fh = function(t) {
  var e = Xm.test(t.target.tagName);
  (e || hh) && (t._gsapAllow = !0, hh = e);
}, Vm = function(t) {
  Kr(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, r = e.momentum, n = e.allowNestedScroll, o = e.onRelease, a, u, c = ii(t.target) || fi, h = J.core.globals().ScrollSmoother, f = h && h.get(), d = Sr && (t.content && ii(t.content) || f && t.content !== !1 && !f.smooth() && f.content()), l = Hr(c, xe), g = Hr(c, Je), p = 1, v = (oe.isTouch && yt.visualViewport ? yt.visualViewport.scale * yt.visualViewport.width : yt.outerWidth) / yt.innerWidth, x = 0, E = Be(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, C, S, b = Sd(c, t.type, !0, n), I = function() {
    return S = !1;
  }, P = Xi, O = Xi, R = function() {
    u = Zi(c, xe), O = Ws(Sr ? 1 : 0, u), i && (P = Ws(0, Zi(c, Je))), C = un;
  }, z = function() {
    d._gsap.y = Os(parseFloat(d._gsap.y) + l.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", l.offset = l.cacheID = 0;
  }, U = function() {
    if (S) {
      requestAnimationFrame(I);
      var N = Os(a.deltaY / 2), W = O(l.v - N);
      if (d && W !== l.v + l.offset) {
        l.offset = W - l.v;
        var _ = Os((parseFloat(d && d._gsap.y) || 0) - l.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + _ + ", 0, 1)", d._gsap.y = _ + "px", l.cacheID = wt.cache, mr();
      }
      return !0;
    }
    l.offset && z(), S = !0;
  }, F, Y, tt, it, j = function() {
    R(), F.isActive() && F.vars.scrollY > u && (l() > u ? F.progress(1) && l(u) : F.resetTo("scrollY", u));
  };
  return d && J.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(V) {
    return Sr && V.type === "touchmove" && U() || p > 1.05 && V.type !== "touchstart" || a.isGesturing || V.touches && V.touches.length > 1;
  }, t.onPress = function() {
    S = !1;
    var V = p;
    p = Os((yt.visualViewport && yt.visualViewport.scale || 1) / v), F.pause(), V !== p && bl(c, p > 1.01 ? !0 : i ? !1 : "x"), Y = g(), tt = l(), R(), C = un;
  }, t.onRelease = t.onGestureStart = function(V, N) {
    if (l.offset && z(), !N)
      it.restart(!0);
    else {
      wt.cache++;
      var W = E(), _, q;
      i && (_ = g(), q = _ + W * 0.05 * -V.velocityX / 0.227, W *= ch(g, _, q, Zi(c, Je)), F.vars.scrollX = P(q)), _ = l(), q = _ + W * 0.05 * -V.velocityY / 0.227, W *= ch(l, _, q, Zi(c, xe)), F.vars.scrollY = O(q), F.invalidate().duration(W).play(0.01), (Sr && F.vars.scrollY >= u || _ >= u - 1) && J.to({}, {
        onUpdate: j,
        duration: W
      });
    }
    o && o(V);
  }, t.onWheel = function() {
    F._ts && F.pause(), Fe() - x > 1e3 && (C = 0, x = Fe());
  }, t.onChange = function(V, N, W, _, q) {
    if (un !== C && R(), N && i && g(P(_[2] === N ? Y + (V.startX - V.x) : g() + N - _[1])), W) {
      l.offset && z();
      var Z = q[2] === W, G = Z ? tt + V.startY - V.y : l() + W - q[1], et = O(G);
      Z && G !== et && (tt += et - G), l(et);
    }
    (W || N) && mr();
  }, t.onEnable = function() {
    bl(c, i ? !1 : "x"), bt.addEventListener("refresh", j), Pe(yt, "resize", j), l.smooth && (l.target.style.scrollBehavior = "auto", l.smooth = g.smooth = !1), b.enable();
  }, t.onDisable = function() {
    bl(c, !0), Ce(yt, "resize", j), bt.removeEventListener("refresh", j), b.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new oe(t), a.iOS = Sr, Sr && !l() && l(1), Sr && J.ticker.add(Xi), it = a._dc, F = J.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: xd(l, l(), function() {
        return F.pause();
      })
    },
    onUpdate: mr,
    onComplete: it.vars.onComplete
  }), a;
};
bt.sort = function(s) {
  if (Be(s))
    return _t.sort(s);
  var t = yt.pageYOffset || 0;
  return bt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + yt.innerHeight;
  }), _t.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
bt.observe = function(s) {
  return new oe(s);
};
bt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return Ke;
  if (s === !0 && Ke)
    return Ke.enable();
  if (s === !1) {
    Ke && Ke.kill(), Ke = s;
    return;
  }
  var t = s instanceof oe ? s : Vm(s);
  return Ke && Ke.target === t.target && Ke.kill(), pn(t.target) && (Ke = t), t;
};
bt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Kl,
  _inputObserver: Sd,
  _scrollers: wt,
  _proxies: tr,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ki || mn("scrollStart"), ki = Fe();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return ze;
    }
  }
};
dd() && J.registerPlugin(bt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Vi, nu, Ks, Ed, Rn, $n, su, Cd, Pd = function() {
  return Vi || typeof window < "u" && (Vi = window.gsap);
}, ou = {}, Gm = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, au = function(t) {
  return Cd(t).id;
}, Ms = function(t) {
  return ou[au(typeof t == "string" ? Ks(t)[0] : t)];
}, dh = function(t) {
  var e = Rn, i;
  if (t - su >= 0.05)
    for (su = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, Km = {
  deg: 360,
  rad: Math.PI * 2
}, Tl = function() {
  Vi = Pd(), Vi && (Ks = Vi.utils.toArray, Ed = Vi.utils.getUnit, Cd = Vi.core.getCache, $n = Vi.ticker, nu = 1);
}, jm = function(t, e, i, r) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = Km[i || Ed(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = $n.time, r && (this._next = r, r._prev = this);
}, So = /* @__PURE__ */ function() {
  function s(e, i) {
    nu || Tl(), this.target = Ks(e)[0], ou[au(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    Vi = i, Tl();
  };
  var t = s.prototype;
  return t.get = function(i, r) {
    var n = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, u;
    return o = parseFloat(r ? n.v1 : n.g(n.t, n.p)), a = o - parseFloat(n.v2), u = n.rCap, u && (a = a % u, a !== a % (u / 2) && (a = a < 0 ? a + u : a - u)), Gm(a / ((r ? n.t1 : $n.time) - n.t2));
  }, t.getAll = function() {
    var i = {}, r = this._props, n;
    for (n in r)
      i[n] = this.get(n);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, r) {
    i in this._props || (Rn || ($n.add(dh), su = $n.time), Rn = this._props[i] = new jm(this.target, i, r, Rn));
  }, t.remove = function(i) {
    var r = this._props[i], n, o;
    r && (n = r._prev, o = r._next, n && (n._next = o), o ? o._prev = n : Rn === r && ($n.remove(dh), Rn = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var r in this._props)
      this.remove(r);
    i || delete ou[au(this.target)];
  }, s.track = function(i, r, n) {
    nu || Tl();
    for (var o = [], a = Ks(i), u = r.split(","), c = (n || "").split(","), h = a.length, f, d; h--; ) {
      for (f = Ms(a[h]) || new s(a[h]), d = u.length; d--; )
        f.add(u[d], c[d] || c[0]);
      o.push(f);
    }
    return o;
  }, s.untrack = function(i, r) {
    var n = (r || "").split(",");
    Ks(i).forEach(function(o) {
      var a = Ms(o);
      a && (n.length ? n.forEach(function(u) {
        return a.remove(u);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, r) {
    var n = Ms(i);
    return n && n.isTracking(r);
  }, s.getVelocity = function(i, r) {
    var n = Ms(i);
    return !n || !n.isTracking(r) ? console.warn("Not tracking velocity of " + r) : n.get(r);
  }, s;
}();
So.getByTarget = Ms;
Pd() && Vi.registerPlugin(So);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Te, Ad, ph, Od, lu, js, kd, Id, Md, ju, Ld, Zs, uu, Dd, Pa = So.getByTarget, Rd = function() {
  return Te || typeof window < "u" && (Te = window.gsap) && Te.registerPlugin && Te;
}, Zm = function(t) {
  return typeof t == "string";
}, po = function(t) {
  return typeof t == "number";
}, Nr = function(t) {
  return typeof t == "object";
}, cu = function(t) {
  return typeof t == "function";
}, Qm = 1, Nd = Array.isArray, Jm = function(t) {
  return t;
}, Qn = 1e10, gh = 1 / Qn, zd = 0.05, t_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, e_ = function(t, e, i) {
  for (var r in e)
    !(r in t) && r !== i && (t[r] = e[r]);
  return t;
}, i_ = function s(t) {
  var e = {}, i, r;
  for (i in t)
    e[i] = Nr(r = t[i]) && !Nd(r) ? s(r) : r;
  return e;
}, mh = function(t, e, i, r, n) {
  var o = e.length, a = 0, u = Qn, c, h, f, d;
  if (Nr(t)) {
    for (; o--; ) {
      c = e[o], h = 0;
      for (f in t)
        d = c[f] - t[f], h += d * d;
      h < u && (a = o, u = h);
    }
    if ((n || Qn) < Qn && n < Math.sqrt(u))
      return t;
  } else
    for (; o--; )
      c = e[o], h = c - t, h < 0 && (h = -h), h < u && c >= r && c <= i && (a = o, u = h);
  return e[a];
}, Fd = function(t, e, i, r, n, o, a) {
  if (t.end === "auto")
    return t;
  var u = t.end, c, h;
  if (i = isNaN(i) ? Qn : i, r = isNaN(r) ? -1e10 : r, Nr(e)) {
    if (c = e.calculated ? e : (cu(u) ? u(e, a) : mh(e, u, i, r, o)) || e, !e.calculated) {
      for (h in c)
        e[h] = c[h];
      e.calculated = !0;
    }
    c = c[n];
  } else
    c = cu(u) ? u(e, a) : Nd(u) ? mh(e, u, i, r, o) : parseFloat(u);
  return c > i ? c = i : c < r && (c = r), {
    max: c,
    min: c,
    unitFactor: t.unitFactor
  };
}, Aa = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, Zu = function(t, e) {
  return e * zd * t / ju;
}, _h = function(t, e, i) {
  return Math.abs((e - t) * ju / i / zd);
}, $d = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Hd = function(t, e, i, r) {
  if (e.linkedProps) {
    var n = e.linkedProps.split(","), o = {}, a, u, c, h, f, d;
    for (a = 0; a < n.length; a++)
      u = n[a], c = e[u], c && (po(c.velocity) ? h = c.velocity : (f = f || Pa(t), h = f && f.isTracking(u) ? f.get(u) : 0), d = Math.abs(h / Aa(c, "resistance", r)), o[u] = parseFloat(i(t, u)) + Zu(h, d));
    return o;
  }
}, r_ = function(t, e, i, r, n, o) {
  if (i === void 0 && (i = 10), r === void 0 && (r = 0.2), n === void 0 && (n = 1), Zm(t) && (t = Od(t)[0]), !t)
    return 0;
  var a = 0, u = Qn, c = e.inertia || e, h = Md(t).get, f = Aa(c, "resistance", js.resistance), d, l, g, p, v, x, E, C, S, b;
  b = Hd(t, c, h, f);
  for (d in c)
    $d[d] || (l = c[d], Nr(l) || (C = C || Pa(t), C && C.isTracking(d) ? l = po(l) ? {
      velocity: l
    } : {
      velocity: C.get(d)
    } : (p = +l || 0, g = Math.abs(p / f))), Nr(l) && (po(l.velocity) ? p = l.velocity : (C = C || Pa(t), p = C && C.isTracking(d) ? C.get(d) : 0), g = Ld(r, i, Math.abs(p / Aa(l, "resistance", f))), v = parseFloat(h(t, d)) || 0, x = v + Zu(p, g), "end" in l && (l = Fd(l, b && d in b ? b : x, l.max, l.min, d, c.radius, p), Zs === e && (Zs = c = i_(e)), c[d] = e_(l, c[d], "end")), "max" in l && x > +l.max + gh ? (S = l.unitFactor || js.unitFactors[d] || 1, E = v > l.max && l.min !== l.max || p * S > -15 && p * S < 45 ? r + (i - r) * 0.1 : _h(v, l.max, p), E + n < u && (u = E + n)) : "min" in l && x < +l.min - gh && (S = l.unitFactor || js.unitFactors[d] || 1, E = v < l.min && l.min !== l.max || p * S > -45 && p * S < 15 ? r + (i - r) * 0.1 : _h(v, l.min, p), E + n < u && (u = E + n)), E > a && (a = E)), g > a && (a = g));
  return a > u && (a = u), a > i ? i : a < r ? r : a;
}, vh = function() {
  Te = Rd(), Te && (ph = Te.parseEase, Od = Te.utils.toArray, kd = Te.utils.getUnit, Md = Te.core.getCache, Ld = Te.utils.clamp, uu = Te.core.getStyleSaver, Dd = Te.core.reverting || function() {
  }, lu = ph("power3"), ju = lu(0.05), Id = Te.core.PropTween, Te.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), js = Te.config(), Te.registerPlugin(So), Ad = 1);
}, Oa = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Te = t, vh();
  },
  init: function(t, e, i, r, n) {
    Ad || vh();
    var o = Pa(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = uu && typeof t.style == "object" && uu(t), this.target = t, this.tween = i, Zs = e;
    var a = t._gsap, u = a.get, c = e.duration, h = Nr(c), f = e.preventOvershoot || h && c.overshoot === 0, d = Aa(e, "resistance", js.resistance), l = po(c) ? c : r_(t, e, h && c.max || 10, h && c.min || 0.2, h && "overshoot" in c ? +c.overshoot : f ? 0 : 1), g, p, v, x, E, C, S, b, I;
    e = Zs, Zs = 0, I = Hd(t, e, u, d);
    for (g in e)
      $d[g] || (p = e[g], cu(p) && (p = p(r, t, n)), po(p) ? E = p : Nr(p) && !isNaN(p.velocity) ? E = +p.velocity : o && o.isTracking(g) ? E = o.get(g) : console.warn("ERROR: No velocity was defined for " + t + " property: " + g), C = Zu(E, l), b = 0, v = u(t, g), x = kd(v), v = parseFloat(v), Nr(p) && (S = v + C, "end" in p && (p = Fd(p, I && g in I ? I : S, p.max, p.min, g, e.radius, E)), "max" in p && +p.max < S ? f || p.preventOvershoot ? C = p.max - v : b = p.max - v - C : "min" in p && +p.min > S && (f || p.preventOvershoot ? C = p.min - v : b = p.min - v - C)), this._props.push(g), this.styles && this.styles.save(g), this._pt = new Id(this._pt, t, g, v, 0, Jm, 0, a.set(t, g, this)), this._pt.u = x || 0, this._pt.c1 = C, this._pt.c2 = b);
    return i.duration(l), Qm;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = lu(e.tween._time / e.tween._dur), t || !Dd())
      for (; i; )
        i.set(i.t, i.p, t_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Oa[s] = So[s];
});
Rd() && Te.registerPlugin(Oa);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let vs, In, hu, n_ = () => hu || a_.register(window.gsap), yh = typeof Intl < "u" ? new Intl.Segmenter() : 0, ka = (s) => typeof s == "string" ? ka(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], wh = (s) => ka(s).filter((t) => t instanceof HTMLElement), fu = [], xl = function() {
}, s_ = /\s+/g, bh = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Th = { left: 0, top: 0, width: 0, height: 0 }, xh = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || fu), i = s.length, r, n, o, a;
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
}, Sh = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Mn = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), du = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: r = "div", aria: n = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", u = i.indexOf("++") > -1, c = (h) => {
    let f = document.createElement(r), d = e.length + 1;
    return i && (f.className = i + (u ? " " + i + d : "")), o && f.style.setProperty("--" + s, d + ""), n !== "none" && f.setAttribute("aria-hidden", "true"), r !== "span" && (f.style.position = "relative", f.style.display = a), f.textContent = h, e.push(f), f;
  };
  return u && (i = i.replace("++", "")), c.collection = e, c;
}, o_ = (s, t, e, i) => {
  let r = du("line", e, i), n = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let u = r("");
    for (u.style.textAlign = n, s.insertBefore(u, t[o]); o < a; o++)
      u.appendChild(t[o]);
    u.normalize();
  };
}, Bd = (s, t, e, i, r, n, o, a, u, c) => {
  var h;
  let f = Array.from(s.childNodes), d = 0, { wordDelimiter: l, reduceWhiteSpace: g = !0, prepareText: p } = t, v = s.getBoundingClientRect(), x = v, E = !g && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, S = e.collection, b, I, P, O, R, z, U, F, Y, tt, it, j, V, N, W, _, q, Z;
  for (typeof l == "object" ? (P = l.delimiter || l, I = l.replaceWith || "") : I = l === "" ? "" : l || " ", b = I !== " "; d < f.length; d++)
    if (O = f[d], O.nodeType === 3) {
      for (W = O.textContent || "", g ? W = W.replace(s_, " ") : E && (W = W.replace(/\n/g, I + `
`)), p && (W = p(W, s)), O.textContent = W, R = I || P ? W.split(P || I) : W.match(a) || fu, q = R[R.length - 1], F = b ? q.slice(-1) === " " : !q, q || R.pop(), x = v, U = b ? R[0].charAt(0) === " " : !R[0], U && Mn(" ", s, O), R[0] || R.shift(), xh(R, u), n && c || (O.textContent = ""), Y = 1; Y <= R.length; Y++)
        if (_ = R[Y - 1], !g && E && _.charAt(0) === `
` && ((h = O.previousSibling) == null || h.remove(), Mn(document.createElement("br"), s, O), _ = _.slice(1)), !g && _ === "")
          Mn(I, s, O);
        else if (_ === " ")
          s.insertBefore(document.createTextNode(" "), O);
        else {
          if (b && _.charAt(0) === " " && Mn(" ", s, O), C && Y === 1 && !U && S.indexOf(C.parentNode) > -1 ? (z = S[S.length - 1], z.appendChild(document.createTextNode(i ? "" : _))) : (z = e(i ? "" : _), Mn(z, s, O), C && Y === 1 && !U && z.insertBefore(C, z.firstChild)), i)
            for (it = yh ? xh([...yh.segment(_)].map((G) => G.segment), u) : _.match(a) || fu, Z = 0; Z < it.length; Z++)
              z.appendChild(it[Z] === " " ? document.createTextNode(" ") : i(it[Z]));
          if (n && c) {
            if (W = O.textContent = W.substring(_.length + 1, W.length), tt = z.getBoundingClientRect(), tt.top > x.top && tt.left <= x.left) {
              for (j = s.cloneNode(), V = s.childNodes[0]; V && V !== z; )
                N = V, V = V.nextSibling, j.appendChild(N);
              s.parentNode.insertBefore(j, s), r && Sh(j);
            }
            x = tt;
          }
          (Y < R.length || F) && Mn(Y >= R.length ? " " : b && _.slice(-1) === " " ? " " + I : I, s, O);
        }
      s.removeChild(O), C = 0;
    } else O.nodeType === 1 && (o && o.indexOf(O) > -1 ? (S.indexOf(O.previousSibling) > -1 && S[S.length - 1].appendChild(O), C = O) : (Bd(O, t, e, i, r, n, o, a, u, !0), C = 0), r && Sh(O));
};
const Yd = class Wd {
  constructor(t, e) {
    this.isSplit = !1, n_(), this.elements = wh(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
    let i = [], r, n = () => {
      let o = i.length, a;
      for (; o--; ) {
        a = i[o];
        let u = a.element.offsetWidth;
        if (u !== a.width) {
          a.width = u, this._split();
          return;
        }
      }
    };
    this._data = { orig: i, obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
      clearTimeout(r), r = setTimeout(n, 200);
    }) }, xl(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: r = !0, smartWrap: n, onSplit: o, autoSplit: a = !1, specialChars: u, mask: c } = this.vars, h = e.indexOf("lines") > -1, f = e.indexOf("chars") > -1, d = e.indexOf("words") > -1, l = f && !d && !h, g = u && ("push" in u ? new RegExp("(?:" + u.join("|") + ")", "gu") : u), p = g ? new RegExp(g.source + "|" + bh.source, "gu") : bh, v = !!t.ignore && wh(t.ignore), { orig: x, animTime: E, obs: C } = this._data, S;
    return (f || d || h) && (this.elements.forEach((b, I) => {
      x[I] = {
        element: b,
        html: b.innerHTML,
        ariaL: b.getAttribute("aria-label"),
        ariaH: b.getAttribute("aria-hidden")
      }, i === "auto" ? b.setAttribute("aria-label", (b.textContent || "").trim()) : i === "hidden" && b.setAttribute("aria-hidden", "true");
      let P = [], O = [], R = [], z = f ? du("char", t, P) : null, U = du("word", t, O), F, Y, tt, it;
      if (Bd(b, t, U, z, l, r && (h || l), v, p, g, !1), h) {
        let j = ka(b.childNodes), V = o_(b, j, t, R), N, W = [], _ = 0, q = j.map((G) => G.nodeType === 1 ? G.getBoundingClientRect() : Th), Z = Th;
        for (F = 0; F < j.length; F++)
          N = j[F], N.nodeType === 1 && (N.nodeName === "BR" ? (W.push(N), V(_, F + 1), _ = F + 1, Z = q[_]) : (F && q[F].top > Z.top && q[F].left <= Z.left && (V(_, F), _ = F), Z = q[F]));
        _ < F && V(_, F), W.forEach((G) => {
          var et;
          return (et = G.parentNode) == null ? void 0 : et.removeChild(G);
        });
      }
      if (!d) {
        for (F = 0; F < O.length; F++)
          if (Y = O[F], f || !Y.nextSibling || Y.nextSibling.nodeType !== 3)
            if (n && !h) {
              for (tt = document.createElement("span"), tt.style.whiteSpace = "nowrap"; Y.firstChild; )
                tt.appendChild(Y.firstChild);
              Y.replaceWith(tt);
            } else
              Y.replaceWith(...Y.childNodes);
          else
            it = Y.nextSibling, it && it.nodeType === 3 && (it.textContent = (Y.textContent || "") + (it.textContent || ""), Y.remove());
        O.length = 0, b.normalize();
      }
      this.lines.push(...R), this.words.push(...O), this.chars.push(...P);
    }), c && this[c] && this.masks.push(...this[c].map((b) => {
      let I = b.cloneNode();
      return b.replaceWith(I), I.appendChild(b), b.className && (I.className = b.className.replace(/(\b\w+\b)/g, "$1-mask")), I.style.overflow = "clip", I;
    }))), this.isSplit = !0, In && (a ? In.addEventListener("loadingdone", this._split) : In.status === "loading" && console.warn("SplitText called before fonts loaded")), (S = o && o(this)) && S.totalTime && (this._data.anim = E ? S.totalTime(E) : S), h && a && this.elements.forEach((b, I) => {
      x[I].width = b.offsetWidth, C && C.observe(b);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: r, obs: n } = this._data;
    return n && n.disconnect(), i.forEach(({ element: o, html: a, ariaL: u, ariaH: c }) => {
      o.innerHTML = a, u ? o.setAttribute("aria-label", u) : o.removeAttribute("aria-label"), c ? o.setAttribute("aria-hidden", c) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, In == null || In.removeEventListener("loadingdone", this._split), r && (this._data.animTime = r.totalTime(), r.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Wd(t, e);
  }
  static register(t) {
    vs = vs || t || window.gsap, vs && (ka = vs.utils.toArray, xl = vs.core.context || xl), !hu && window.innerWidth > 0 && (In = document.fonts, hu = !0);
  }
};
Yd.version = "3.13.0";
let a_ = Yd;
var D = Wt.registerPlugin(xo) || Wt;
D.core.Tween;
/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function Yi() {
  return Yi = Object.assign || function(s) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (s[i] = e[i]);
    }
    return s;
  }, Yi.apply(this, arguments);
}
function Di(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
function jo(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
var pu;
typeof Object.assign != "function" ? pu = function(t) {
  if (t == null)
    throw new TypeError("Cannot convert undefined or null to object");
  for (var e = Object(t), i = 1; i < arguments.length; i++) {
    var r = arguments[i];
    if (r != null)
      for (var n in r)
        r.hasOwnProperty(n) && (e[n] = r[n]);
  }
  return e;
} : pu = Object.assign;
var _n = pu, Eh = ["", "webkit", "Moz", "MS", "ms", "o"], l_ = typeof document > "u" ? {
  style: {}
} : document.createElement("div"), u_ = "function", Hn = Math.round, vn = Math.abs, Qu = Date.now;
function Ba(s, t) {
  for (var e, i, r = t[0].toUpperCase() + t.slice(1), n = 0; n < Eh.length; ) {
    if (e = Eh[n], i = e ? e + r : t, i in s)
      return i;
    n++;
  }
}
var _r;
typeof window > "u" ? _r = {} : _r = window;
var qd = Ba(l_.style, "touchAction"), Ud = qd !== void 0;
function c_() {
  if (!Ud)
    return !1;
  var s = {}, t = _r.CSS && _r.CSS.supports;
  return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(e) {
    return s[e] = t ? _r.CSS.supports("touch-action", e) : !0;
  }), s;
}
var Xd = "compute", Vd = "auto", gu = "manipulation", cn = "none", go = "pan-x", mo = "pan-y", Zo = c_(), h_ = /mobile|tablet|ip(ad|hone|od)|android/i, Gd = "ontouchstart" in _r, f_ = Ba(_r, "PointerEvent") !== void 0, d_ = Gd && h_.test(navigator.userAgent), Eo = "touch", p_ = "pen", Ju = "mouse", g_ = "kinect", m_ = 25, ti = 1, Tn = 2, ge = 4, ai = 8, Ia = 1, Co = 2, Po = 4, Ao = 8, ls = 16, er = Co | Po, hn = Ao | ls, Kd = er | hn, jd = ["x", "y"], Ma = ["clientX", "clientY"];
function vr(s, t, e) {
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
function Ya(s, t) {
  return typeof s === u_ ? s.apply(t && t[0] || void 0, t) : s;
}
function Jr(s, t) {
  return s.indexOf(t) > -1;
}
function __(s) {
  if (Jr(s, cn))
    return cn;
  var t = Jr(s, go), e = Jr(s, mo);
  return t && e ? cn : t || e ? t ? go : mo : Jr(s, gu) ? gu : Vd;
}
var Zd = /* @__PURE__ */ function() {
  function s(e, i) {
    this.manager = e, this.set(i);
  }
  var t = s.prototype;
  return t.set = function(i) {
    i === Xd && (i = this.compute()), Ud && this.manager.element.style && Zo[i] && (this.manager.element.style[qd] = i), this.actions = i.toLowerCase().trim();
  }, t.update = function() {
    this.set(this.manager.options.touchAction);
  }, t.compute = function() {
    var i = [];
    return vr(this.manager.recognizers, function(r) {
      Ya(r.options.enable, [r]) && (i = i.concat(r.getTouchAction()));
    }), __(i.join(" "));
  }, t.preventDefaults = function(i) {
    var r = i.srcEvent, n = i.offsetDirection;
    if (this.manager.session.prevented) {
      r.preventDefault();
      return;
    }
    var o = this.actions, a = Jr(o, cn) && !Zo[cn], u = Jr(o, mo) && !Zo[mo], c = Jr(o, go) && !Zo[go];
    if (a) {
      var h = i.pointers.length === 1, f = i.distance < 2, d = i.deltaTime < 250;
      if (h && f && d)
        return;
    }
    if (!(c && u) && (a || u && n & er || c && n & hn))
      return this.preventSrc(r);
  }, t.preventSrc = function(i) {
    this.manager.session.prevented = !0, i.preventDefault();
  }, s;
}();
function tc(s, t) {
  for (; s; ) {
    if (s === t)
      return !0;
    s = s.parentNode;
  }
  return !1;
}
function Qd(s) {
  var t = s.length;
  if (t === 1)
    return {
      x: Hn(s[0].clientX),
      y: Hn(s[0].clientY)
    };
  for (var e = 0, i = 0, r = 0; r < t; )
    e += s[r].clientX, i += s[r].clientY, r++;
  return {
    x: Hn(e / t),
    y: Hn(i / t)
  };
}
function Ch(s) {
  for (var t = [], e = 0; e < s.pointers.length; )
    t[e] = {
      clientX: Hn(s.pointers[e].clientX),
      clientY: Hn(s.pointers[e].clientY)
    }, e++;
  return {
    timeStamp: Qu(),
    pointers: t,
    center: Qd(t),
    deltaX: s.deltaX,
    deltaY: s.deltaY
  };
}
function La(s, t, e) {
  e || (e = jd);
  var i = t[e[0]] - s[e[0]], r = t[e[1]] - s[e[1]];
  return Math.sqrt(i * i + r * r);
}
function mu(s, t, e) {
  e || (e = jd);
  var i = t[e[0]] - s[e[0]], r = t[e[1]] - s[e[1]];
  return Math.atan2(r, i) * 180 / Math.PI;
}
function Jd(s, t) {
  return s === t ? Ia : vn(s) >= vn(t) ? s < 0 ? Co : Po : t < 0 ? Ao : ls;
}
function v_(s, t) {
  var e = t.center, i = s.offsetDelta || {}, r = s.prevDelta || {}, n = s.prevInput || {};
  (t.eventType === ti || n.eventType === ge) && (r = s.prevDelta = {
    x: n.deltaX || 0,
    y: n.deltaY || 0
  }, i = s.offsetDelta = {
    x: e.x,
    y: e.y
  }), t.deltaX = r.x + (e.x - i.x), t.deltaY = r.y + (e.y - i.y);
}
function tp(s, t, e) {
  return {
    x: t / s || 0,
    y: e / s || 0
  };
}
function y_(s, t) {
  return La(t[0], t[1], Ma) / La(s[0], s[1], Ma);
}
function w_(s, t) {
  return mu(t[1], t[0], Ma) + mu(s[1], s[0], Ma);
}
function b_(s, t) {
  var e = s.lastInterval || t, i = t.timeStamp - e.timeStamp, r, n, o, a;
  if (t.eventType !== ai && (i > m_ || e.velocity === void 0)) {
    var u = t.deltaX - e.deltaX, c = t.deltaY - e.deltaY, h = tp(i, u, c);
    n = h.x, o = h.y, r = vn(h.x) > vn(h.y) ? h.x : h.y, a = Jd(u, c), s.lastInterval = t;
  } else
    r = e.velocity, n = e.velocityX, o = e.velocityY, a = e.direction;
  t.velocity = r, t.velocityX = n, t.velocityY = o, t.direction = a;
}
function T_(s, t) {
  var e = s.session, i = t.pointers, r = i.length;
  e.firstInput || (e.firstInput = Ch(t)), r > 1 && !e.firstMultiple ? e.firstMultiple = Ch(t) : r === 1 && (e.firstMultiple = !1);
  var n = e.firstInput, o = e.firstMultiple, a = o ? o.center : n.center, u = t.center = Qd(i);
  t.timeStamp = Qu(), t.deltaTime = t.timeStamp - n.timeStamp, t.angle = mu(a, u), t.distance = La(a, u), v_(e, t), t.offsetDirection = Jd(t.deltaX, t.deltaY);
  var c = tp(t.deltaTime, t.deltaX, t.deltaY);
  t.overallVelocityX = c.x, t.overallVelocityY = c.y, t.overallVelocity = vn(c.x) > vn(c.y) ? c.x : c.y, t.scale = o ? y_(o.pointers, i) : 1, t.rotation = o ? w_(o.pointers, i) : 0, t.maxPointers = e.prevInput ? t.pointers.length > e.prevInput.maxPointers ? t.pointers.length : e.prevInput.maxPointers : t.pointers.length, b_(e, t);
  var h = s.element, f = t.srcEvent, d;
  f.composedPath ? d = f.composedPath()[0] : f.path ? d = f.path[0] : d = f.target, tc(d, h) && (h = d), t.target = h;
}
function x_(s, t, e) {
  var i = e.pointers.length, r = e.changedPointers.length, n = t & ti && i - r === 0, o = t & (ge | ai) && i - r === 0;
  e.isFirst = !!n, e.isFinal = !!o, n && (s.session = {}), e.eventType = t, T_(s, e), s.emit("hammer.input", e), s.recognize(e), s.session.prevInput = e;
}
function _o(s) {
  return s.trim().split(/\s+/g);
}
function Qs(s, t, e) {
  vr(_o(t), function(i) {
    s.addEventListener(i, e, !1);
  });
}
function Js(s, t, e) {
  vr(_o(t), function(i) {
    s.removeEventListener(i, e, !1);
  });
}
function Ph(s) {
  var t = s.ownerDocument || s;
  return t.defaultView || t.parentWindow || window;
}
var hs = /* @__PURE__ */ function() {
  function s(e, i) {
    var r = this;
    this.manager = e, this.callback = i, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(n) {
      Ya(e.options.enable, [e]) && r.handler(n);
    }, this.init();
  }
  var t = s.prototype;
  return t.handler = function() {
  }, t.init = function() {
    this.evEl && Qs(this.element, this.evEl, this.domHandler), this.evTarget && Qs(this.target, this.evTarget, this.domHandler), this.evWin && Qs(Ph(this.element), this.evWin, this.domHandler);
  }, t.destroy = function() {
    this.evEl && Js(this.element, this.evEl, this.domHandler), this.evTarget && Js(this.target, this.evTarget, this.domHandler), this.evWin && Js(Ph(this.element), this.evWin, this.domHandler);
  }, s;
}();
function yn(s, t, e) {
  if (s.indexOf && !e)
    return s.indexOf(t);
  for (var i = 0; i < s.length; ) {
    if (e && s[i][e] == t || !e && s[i] === t)
      return i;
    i++;
  }
  return -1;
}
var S_ = {
  pointerdown: ti,
  pointermove: Tn,
  pointerup: ge,
  pointercancel: ai,
  pointerout: ai
}, E_ = {
  2: Eo,
  3: p_,
  4: Ju,
  5: g_
  // see https://twitter.com/jacobrossi/status/480596438489890816
}, ep = "pointerdown", ip = "pointermove pointerup pointercancel";
_r.MSPointerEvent && !_r.PointerEvent && (ep = "MSPointerDown", ip = "MSPointerMove MSPointerUp MSPointerCancel");
var rp = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evEl = ep, r.evWin = ip, i = s.apply(this, arguments) || this, i.store = i.manager.session.pointerEvents = [], i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = this.store, o = !1, a = r.type.toLowerCase().replace("ms", ""), u = S_[a], c = E_[r.pointerType] || r.pointerType, h = c === Eo, f = yn(n, r.pointerId, "pointerId");
    u & ti && (r.button === 0 || h) ? f < 0 && (n.push(r), f = n.length - 1) : u & (ge | ai) && (o = !0), !(f < 0) && (n[f] = r, this.callback(this.manager, u, {
      pointers: n,
      changedPointers: [r],
      pointerType: c,
      srcEvent: r
    }), o && n.splice(f, 1));
  }, t;
}(hs);
function vo(s) {
  return Array.prototype.slice.call(s, 0);
}
function ec(s, t, e) {
  for (var i = [], r = [], n = 0; n < s.length; ) {
    var o = t ? s[n][t] : s[n];
    yn(r, o) < 0 && i.push(s[n]), r[n] = o, n++;
  }
  return e && (t ? i = i.sort(function(a, u) {
    return a[t] > u[t];
  }) : i = i.sort()), i;
}
var C_ = {
  touchstart: ti,
  touchmove: Tn,
  touchend: ge,
  touchcancel: ai
}, P_ = "touchstart touchmove touchend touchcancel", ic = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t() {
    var i;
    return t.prototype.evTarget = P_, i = s.apply(this, arguments) || this, i.targetIds = {}, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = C_[r.type], o = A_.call(this, r, n);
    o && this.callback(this.manager, n, {
      pointers: o[0],
      changedPointers: o[1],
      pointerType: Eo,
      srcEvent: r
    });
  }, t;
}(hs);
function A_(s, t) {
  var e = vo(s.touches), i = this.targetIds;
  if (t & (ti | Tn) && e.length === 1)
    return i[e[0].identifier] = !0, [e, e];
  var r, n, o = vo(s.changedTouches), a = [], u = this.target;
  if (n = e.filter(function(c) {
    return tc(c.target, u);
  }), t === ti)
    for (r = 0; r < n.length; )
      i[n[r].identifier] = !0, r++;
  for (r = 0; r < o.length; )
    i[o[r].identifier] && a.push(o[r]), t & (ge | ai) && delete i[o[r].identifier], r++;
  if (a.length)
    return [
      // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
      ec(n.concat(a), "identifier", !0),
      a
    ];
}
var O_ = {
  mousedown: ti,
  mousemove: Tn,
  mouseup: ge
}, k_ = "mousedown", I_ = "mousemove mouseup", rc = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evEl = k_, r.evWin = I_, i = s.apply(this, arguments) || this, i.pressed = !1, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = O_[r.type];
    n & ti && r.button === 0 && (this.pressed = !0), n & Tn && r.which !== 1 && (n = ge), this.pressed && (n & ge && (this.pressed = !1), this.callback(this.manager, n, {
      pointers: [r],
      changedPointers: [r],
      pointerType: Ju,
      srcEvent: r
    }));
  }, t;
}(hs), M_ = 2500, Ah = 25;
function Oh(s) {
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
    setTimeout(n, M_);
  }
}
function L_(s, t) {
  s & ti ? (this.primaryTouch = t.changedPointers[0].identifier, Oh.call(this, t)) : s & (ge | ai) && Oh.call(this, t);
}
function D_(s) {
  for (var t = s.srcEvent.clientX, e = s.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
    var r = this.lastTouches[i], n = Math.abs(t - r.x), o = Math.abs(e - r.y);
    if (n <= Ah && o <= Ah)
      return !0;
  }
  return !1;
}
var np = /* @__PURE__ */ function() {
  var s = /* @__PURE__ */ function(t) {
    Di(e, t);
    function e(r, n) {
      var o;
      return o = t.call(this, r, n) || this, o.handler = function(a, u, c) {
        var h = c.pointerType === Eo, f = c.pointerType === Ju;
        if (!(f && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
          if (h)
            L_.call(jo(jo(o)), u, c);
          else if (f && D_.call(jo(jo(o)), c))
            return;
          o.callback(a, u, c);
        }
      }, o.touch = new ic(o.manager, o.handler), o.mouse = new rc(o.manager, o.handler), o.primaryTouch = null, o.lastTouches = [], o;
    }
    var i = e.prototype;
    return i.destroy = function() {
      this.touch.destroy(), this.mouse.destroy();
    }, e;
  }(hs);
  return s;
}();
function R_(s) {
  var t, e = s.options.inputClass;
  return e ? t = e : f_ ? t = rp : d_ ? t = ic : Gd ? t = np : t = rc, new t(s, x_);
}
function Bn(s, t, e) {
  return Array.isArray(s) ? (vr(s, e[t], e), !0) : !1;
}
var fa = 1, Ii = 2, us = 4, zr = 8, yr = zr, yo = 16, Qi = 32, N_ = 1;
function z_() {
  return N_++;
}
function Qo(s, t) {
  var e = t.manager;
  return e ? e.get(s) : s;
}
function kh(s) {
  return s & yo ? "cancel" : s & zr ? "end" : s & us ? "move" : s & Ii ? "start" : "";
}
var Oo = /* @__PURE__ */ function() {
  function s(e) {
    e === void 0 && (e = {}), this.options = Yi({
      enable: !0
    }, e), this.id = z_(), this.manager = null, this.state = fa, this.simultaneous = {}, this.requireFail = [];
  }
  var t = s.prototype;
  return t.set = function(i) {
    return _n(this.options, i), this.manager && this.manager.touchAction.update(), this;
  }, t.recognizeWith = function(i) {
    if (Bn(i, "recognizeWith", this))
      return this;
    var r = this.simultaneous;
    return i = Qo(i, this), r[i.id] || (r[i.id] = i, i.recognizeWith(this)), this;
  }, t.dropRecognizeWith = function(i) {
    return Bn(i, "dropRecognizeWith", this) ? this : (i = Qo(i, this), delete this.simultaneous[i.id], this);
  }, t.requireFailure = function(i) {
    if (Bn(i, "requireFailure", this))
      return this;
    var r = this.requireFail;
    return i = Qo(i, this), yn(r, i) === -1 && (r.push(i), i.requireFailure(this)), this;
  }, t.dropRequireFailure = function(i) {
    if (Bn(i, "dropRequireFailure", this))
      return this;
    i = Qo(i, this);
    var r = yn(this.requireFail, i);
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
    n < zr && o(r.options.event + kh(n)), o(r.options.event), i.additionalEvent && o(i.additionalEvent), n >= zr && o(r.options.event + kh(n));
  }, t.tryEmit = function(i) {
    if (this.canEmit())
      return this.emit(i);
    this.state = Qi;
  }, t.canEmit = function() {
    for (var i = 0; i < this.requireFail.length; ) {
      if (!(this.requireFail[i].state & (Qi | fa)))
        return !1;
      i++;
    }
    return !0;
  }, t.recognize = function(i) {
    var r = _n({}, i);
    if (!Ya(this.options.enable, [this, r])) {
      this.reset(), this.state = Qi;
      return;
    }
    this.state & (yr | yo | Qi) && (this.state = fa), this.state = this.process(r), this.state & (Ii | us | zr | yo) && this.tryEmit(r);
  }, t.process = function(i) {
  }, t.getTouchAction = function() {
  }, t.reset = function() {
  }, s;
}(), _u = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Yi({
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
    return [gu];
  }, e.process = function(r) {
    var n = this, o = this.options, a = r.pointers.length === o.pointers, u = r.distance < o.threshold, c = r.deltaTime < o.time;
    if (this.reset(), r.eventType & ti && this.count === 0)
      return this.failTimeout();
    if (u && c && a) {
      if (r.eventType !== ge)
        return this.failTimeout();
      var h = this.pTime ? r.timeStamp - this.pTime < o.interval : !0, f = !this.pCenter || La(this.pCenter, r.center) < o.posThreshold;
      this.pTime = r.timeStamp, this.pCenter = r.center, !f || !h ? this.count = 1 : this.count += 1, this._input = r;
      var d = this.count % o.taps;
      if (d === 0)
        return this.hasRequireFailures() ? (this._timer = setTimeout(function() {
          n.state = yr, n.tryEmit();
        }, o.interval), Ii) : yr;
    }
    return Qi;
  }, e.failTimeout = function() {
    var r = this;
    return this._timer = setTimeout(function() {
      r.state = Qi;
    }, this.options.interval), Qi;
  }, e.reset = function() {
    clearTimeout(this._timer);
  }, e.emit = function() {
    this.state === yr && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
  }, t;
}(Oo), cs = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Yi({
      pointers: 1
    }, i)) || this;
  }
  var e = t.prototype;
  return e.attrTest = function(r) {
    var n = this.options.pointers;
    return n === 0 || r.pointers.length === n;
  }, e.process = function(r) {
    var n = this.state, o = r.eventType, a = n & (Ii | us), u = this.attrTest(r);
    return a && (o & ai || !u) ? n | yo : a || u ? o & ge ? n | zr : n & Ii ? n | us : Ii : Qi;
  }, t;
}(Oo);
function sp(s) {
  return s === ls ? "down" : s === Ao ? "up" : s === Co ? "left" : s === Po ? "right" : "";
}
var nc = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Yi({
      event: "pan",
      threshold: 10,
      pointers: 1,
      direction: Kd
    }, i)) || this, r.pX = null, r.pY = null, r;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    var r = this.options.direction, n = [];
    return r & er && n.push(mo), r & hn && n.push(go), n;
  }, e.directionTest = function(r) {
    var n = this.options, o = !0, a = r.distance, u = r.direction, c = r.deltaX, h = r.deltaY;
    return u & n.direction || (n.direction & er ? (u = c === 0 ? Ia : c < 0 ? Co : Po, o = c !== this.pX, a = Math.abs(r.deltaX)) : (u = h === 0 ? Ia : h < 0 ? Ao : ls, o = h !== this.pY, a = Math.abs(r.deltaY))), r.direction = u, o && a > n.threshold && u & n.direction;
  }, e.attrTest = function(r) {
    return cs.prototype.attrTest.call(this, r) && // replace with a super call
    (this.state & Ii || !(this.state & Ii) && this.directionTest(r));
  }, e.emit = function(r) {
    this.pX = r.deltaX, this.pY = r.deltaY;
    var n = sp(r.direction);
    n && (r.additionalEvent = this.options.event + n), s.prototype.emit.call(this, r);
  }, t;
}(cs), sc = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Yi({
      event: "swipe",
      threshold: 10,
      velocity: 0.3,
      direction: er | hn,
      pointers: 1
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return nc.prototype.getTouchAction.call(this);
  }, e.attrTest = function(r) {
    var n = this.options.direction, o;
    return n & (er | hn) ? o = r.overallVelocity : n & er ? o = r.overallVelocityX : n & hn && (o = r.overallVelocityY), s.prototype.attrTest.call(this, r) && n & r.offsetDirection && r.distance > this.options.threshold && r.maxPointers === this.options.pointers && vn(o) > this.options.velocity && r.eventType & ge;
  }, e.emit = function(r) {
    var n = sp(r.offsetDirection);
    n && this.manager.emit(this.options.event + n, r), this.manager.emit(this.options.event, r);
  }, t;
}(cs), op = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Yi({
      event: "pinch",
      threshold: 0,
      pointers: 2
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [cn];
  }, e.attrTest = function(r) {
    return s.prototype.attrTest.call(this, r) && (Math.abs(r.scale - 1) > this.options.threshold || this.state & Ii);
  }, e.emit = function(r) {
    if (r.scale !== 1) {
      var n = r.scale < 1 ? "in" : "out";
      r.additionalEvent = this.options.event + n;
    }
    s.prototype.emit.call(this, r);
  }, t;
}(cs), ap = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    return i === void 0 && (i = {}), s.call(this, Yi({
      event: "rotate",
      threshold: 0,
      pointers: 2
    }, i)) || this;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [cn];
  }, e.attrTest = function(r) {
    return s.prototype.attrTest.call(this, r) && (Math.abs(r.rotation) > this.options.threshold || this.state & Ii);
  }, t;
}(cs), lp = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t(i) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, Yi({
      event: "press",
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, i)) || this, r._timer = null, r._input = null, r;
  }
  var e = t.prototype;
  return e.getTouchAction = function() {
    return [Vd];
  }, e.process = function(r) {
    var n = this, o = this.options, a = r.pointers.length === o.pointers, u = r.distance < o.threshold, c = r.deltaTime > o.time;
    if (this._input = r, !u || !a || r.eventType & (ge | ai) && !c)
      this.reset();
    else if (r.eventType & ti)
      this.reset(), this._timer = setTimeout(function() {
        n.state = yr, n.tryEmit();
      }, o.time);
    else if (r.eventType & ge)
      return yr;
    return Qi;
  }, e.reset = function() {
    clearTimeout(this._timer);
  }, e.emit = function(r) {
    this.state === yr && (r && r.eventType & ge ? this.manager.emit(this.options.event + "up", r) : (this._input.timeStamp = Qu(), this.manager.emit(this.options.event, this._input)));
  }, t;
}(Oo), up = {
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
  touchAction: Xd,
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
}, Ih = [[ap, {
  enable: !1
}], [op, {
  enable: !1
}, ["rotate"]], [sc, {
  direction: er
}], [nc, {
  direction: er
}, ["swipe"]], [_u], [_u, {
  event: "doubletap",
  taps: 2
}, ["tap"]], [lp]], F_ = 1, Mh = 2;
function Lh(s, t) {
  var e = s.element;
  if (e.style) {
    var i;
    vr(s.options.cssProps, function(r, n) {
      i = Ba(e.style, n), t ? (s.oldCssProps[i] = e.style[i], e.style[i] = r) : e.style[i] = s.oldCssProps[i] || "";
    }), t || (s.oldCssProps = {});
  }
}
function $_(s, t) {
  var e = document.createEvent("Event");
  e.initEvent(s, !0, !0), e.gesture = t, t.target.dispatchEvent(e);
}
var vu = /* @__PURE__ */ function() {
  function s(e, i) {
    var r = this;
    this.options = _n({}, up, i || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = R_(this), this.touchAction = new Zd(this, this.options.touchAction), Lh(this, !0), vr(this.options.recognizers, function(n) {
      var o = r.add(new n[0](n[1]));
      n[2] && o.recognizeWith(n[2]), n[3] && o.requireFailure(n[3]);
    }, this);
  }
  var t = s.prototype;
  return t.set = function(i) {
    return _n(this.options, i), i.touchAction && this.touchAction.update(), i.inputTarget && (this.input.destroy(), this.input.target = i.inputTarget, this.input.init()), this;
  }, t.stop = function(i) {
    this.session.stopped = i ? Mh : F_;
  }, t.recognize = function(i) {
    var r = this.session;
    if (!r.stopped) {
      this.touchAction.preventDefaults(i);
      var n, o = this.recognizers, a = r.curRecognizer;
      (!a || a && a.state & yr) && (r.curRecognizer = null, a = null);
      for (var u = 0; u < o.length; )
        n = o[u], r.stopped !== Mh && // 1
        (!a || n === a || // 2
        n.canRecognizeWith(a)) ? n.recognize(i) : n.reset(), !a && n.state & (Ii | us | zr) && (r.curRecognizer = n, a = n), u++;
    }
  }, t.get = function(i) {
    if (i instanceof Oo)
      return i;
    for (var r = this.recognizers, n = 0; n < r.length; n++)
      if (r[n].options.event === i)
        return r[n];
    return null;
  }, t.add = function(i) {
    if (Bn(i, "add", this))
      return this;
    var r = this.get(i.options.event);
    return r && this.remove(r), this.recognizers.push(i), i.manager = this, this.touchAction.update(), i;
  }, t.remove = function(i) {
    if (Bn(i, "remove", this))
      return this;
    var r = this.get(i);
    if (i) {
      var n = this.recognizers, o = yn(n, r);
      o !== -1 && (n.splice(o, 1), this.touchAction.update());
    }
    return this;
  }, t.on = function(i, r) {
    if (i === void 0 || r === void 0)
      return this;
    var n = this.handlers;
    return vr(_o(i), function(o) {
      n[o] = n[o] || [], n[o].push(r);
    }), this;
  }, t.off = function(i, r) {
    if (i === void 0)
      return this;
    var n = this.handlers;
    return vr(_o(i), function(o) {
      r ? n[o] && n[o].splice(yn(n[o], r), 1) : delete n[o];
    }), this;
  }, t.emit = function(i, r) {
    this.options.domEvents && $_(i, r);
    var n = this.handlers[i] && this.handlers[i].slice();
    if (!(!n || !n.length)) {
      r.type = i, r.preventDefault = function() {
        r.srcEvent.preventDefault();
      };
      for (var o = 0; o < n.length; )
        n[o](r), o++;
    }
  }, t.destroy = function() {
    this.element && Lh(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
  }, s;
}(), H_ = {
  touchstart: ti,
  touchmove: Tn,
  touchend: ge,
  touchcancel: ai
}, B_ = "touchstart", Y_ = "touchstart touchmove touchend touchcancel", W_ = /* @__PURE__ */ function(s) {
  Di(t, s);
  function t() {
    var i, r = t.prototype;
    return r.evTarget = B_, r.evWin = Y_, i = s.apply(this, arguments) || this, i.started = !1, i;
  }
  var e = t.prototype;
  return e.handler = function(r) {
    var n = H_[r.type];
    if (n === ti && (this.started = !0), !!this.started) {
      var o = q_.call(this, r, n);
      n & (ge | ai) && o[0].length - o[1].length === 0 && (this.started = !1), this.callback(this.manager, n, {
        pointers: o[0],
        changedPointers: o[1],
        pointerType: Eo,
        srcEvent: r
      });
    }
  }, t;
}(hs);
function q_(s, t) {
  var e = vo(s.touches), i = vo(s.changedTouches);
  return t & (ge | ai) && (e = ec(e.concat(i), "identifier", !0)), [e, i];
}
function cp(s, t, e) {
  var i = "DEPRECATED METHOD: " + t + `
` + e + ` AT 
`;
  return function() {
    var r = new Error("get-stack-trace"), n = r && r.stack ? r.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", o = window.console && (window.console.warn || window.console.log);
    return o && o.call(window.console, i, n), s.apply(this, arguments);
  };
}
var hp = cp(function(s, t, e) {
  for (var i = Object.keys(t), r = 0; r < i.length; )
    (!e || e && s[i[r]] === void 0) && (s[i[r]] = t[i[r]]), r++;
  return s;
}, "extend", "Use `assign`."), U_ = cp(function(s, t) {
  return hp(s, t, !0);
}, "merge", "Use `assign`.");
function X_(s, t, e) {
  var i = t.prototype, r;
  r = s.prototype = Object.create(i), r.constructor = s, r._super = i, e && _n(r, e);
}
function Dh(s, t) {
  return function() {
    return s.apply(t, arguments);
  };
}
var V_ = /* @__PURE__ */ function() {
  var s = (
    /**
      * @private
      * @const {string}
      */
    function(e, i) {
      return i === void 0 && (i = {}), new vu(e, Yi({
        recognizers: Ih.concat()
      }, i));
    }
  );
  return s.VERSION = "2.0.17-rc", s.DIRECTION_ALL = Kd, s.DIRECTION_DOWN = ls, s.DIRECTION_LEFT = Co, s.DIRECTION_RIGHT = Po, s.DIRECTION_UP = Ao, s.DIRECTION_HORIZONTAL = er, s.DIRECTION_VERTICAL = hn, s.DIRECTION_NONE = Ia, s.DIRECTION_DOWN = ls, s.INPUT_START = ti, s.INPUT_MOVE = Tn, s.INPUT_END = ge, s.INPUT_CANCEL = ai, s.STATE_POSSIBLE = fa, s.STATE_BEGAN = Ii, s.STATE_CHANGED = us, s.STATE_ENDED = zr, s.STATE_RECOGNIZED = yr, s.STATE_CANCELLED = yo, s.STATE_FAILED = Qi, s.Manager = vu, s.Input = hs, s.TouchAction = Zd, s.TouchInput = ic, s.MouseInput = rc, s.PointerEventInput = rp, s.TouchMouseInput = np, s.SingleTouchInput = W_, s.Recognizer = Oo, s.AttrRecognizer = cs, s.Tap = _u, s.Pan = nc, s.Swipe = sc, s.Pinch = op, s.Rotate = ap, s.Press = lp, s.on = Qs, s.off = Js, s.each = vr, s.merge = U_, s.extend = hp, s.bindFn = Dh, s.assign = _n, s.inherit = X_, s.bindFn = Dh, s.prefixed = Ba, s.toArray = vo, s.inArray = yn, s.uniqueArray = ec, s.splitStr = _o, s.boolOrFn = Ya, s.hasParent = tc, s.addEventListeners = Qs, s.removeEventListeners = Js, s.defaults = _n({}, up, {
    preset: Ih
  }), s;
}();
V_.defaults;
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function G_(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Ls = { exports: {} };
Ls.exports;
var Rh;
function K_() {
  return Rh || (Rh = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", r = 800, n = 16, o = 9007199254740991, a = "[object Arguments]", u = "[object Array]", c = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", d = "[object Error]", l = "[object Function]", g = "[object GeneratorFunction]", p = "[object Map]", v = "[object Number]", x = "[object Null]", E = "[object Object]", C = "[object Proxy]", S = "[object RegExp]", b = "[object Set]", I = "[object String]", P = "[object Undefined]", O = "[object WeakMap]", R = "[object ArrayBuffer]", z = "[object DataView]", U = "[object Float32Array]", F = "[object Float64Array]", Y = "[object Int8Array]", tt = "[object Int16Array]", it = "[object Int32Array]", j = "[object Uint8Array]", V = "[object Uint8ClampedArray]", N = "[object Uint16Array]", W = "[object Uint32Array]", _ = /[\\^$.*+?()[\]{}|]/g, q = /^\[object .+?Constructor\]$/, Z = /^(?:0|[1-9]\d*)$/, G = {};
    G[U] = G[F] = G[Y] = G[tt] = G[it] = G[j] = G[V] = G[N] = G[W] = !0, G[a] = G[u] = G[R] = G[h] = G[z] = G[f] = G[d] = G[l] = G[p] = G[v] = G[E] = G[S] = G[b] = G[I] = G[O] = !1;
    var et = typeof Jo == "object" && Jo && Jo.Object === Object && Jo, Dt = typeof self == "object" && self && self.Object === Object && self, pt = et || Dt || Function("return this")(), vt = t && !t.nodeType && t, ht = vt && !0 && s && !s.nodeType && s, qt = ht && ht.exports === vt, Bt = qt && et.process, Nt = function() {
      try {
        var m = ht && ht.require && ht.require("util").types;
        return m || Bt && Bt.binding && Bt.binding("util");
      } catch {
      }
    }(), Ut = Nt && Nt.isTypedArray;
    function dt(m, w, L) {
      switch (L.length) {
        case 0:
          return m.call(w);
        case 1:
          return m.call(w, L[0]);
        case 2:
          return m.call(w, L[0], L[1]);
        case 3:
          return m.call(w, L[0], L[1], L[2]);
      }
      return m.apply(w, L);
    }
    function gt(m, w) {
      for (var L = -1, nt = Array(m); ++L < m; )
        nt[L] = w(L);
      return nt;
    }
    function lt(m) {
      return function(w) {
        return m(w);
      };
    }
    function Se(m, w) {
      return m == null ? void 0 : m[w];
    }
    function k(m, w) {
      return function(L) {
        return m(w(L));
      };
    }
    var zt = Array.prototype, qe = Function.prototype, Oe = Object.prototype, Mt = pt["__core-js_shared__"], Rt = qe.toString, ae = Oe.hasOwnProperty, Ue = function() {
      var m = /[^.]+$/.exec(Mt && Mt.keys && Mt.keys.IE_PROTO || "");
      return m ? "Symbol(src)_1." + m : "";
    }(), Vt = Oe.toString, ie = Rt.call(Object), Pt = RegExp(
      "^" + Rt.call(ae).replace(_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), le = qt ? pt.Buffer : void 0, ke = pt.Symbol, De = pt.Uint8Array;
    le && le.allocUnsafe;
    var Wi = k(Object.getPrototypeOf, Object), Xt = Object.create, qi = Oe.propertyIsEnumerable, ei = zt.splice, me = ke ? ke.toStringTag : void 0, Ie = function() {
      try {
        var m = Xa(Object, "defineProperty");
        return m({}, "", {}), m;
      } catch {
      }
    }(), wi = le ? le.isBuffer : void 0, Re = Math.max, at = Date.now, Ne = Xa(pt, "Map"), Lt = Xa(Object, "create"), Ee = /* @__PURE__ */ function() {
      function m() {
      }
      return function(w) {
        if (!or(w))
          return {};
        if (Xt)
          return Xt(w);
        m.prototype = w;
        var L = new m();
        return m.prototype = void 0, L;
      };
    }();
    function te(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var nt = m[w];
        this.set(nt[0], nt[1]);
      }
    }
    function bi() {
      this.__data__ = Lt ? Lt(null) : {}, this.size = 0;
    }
    function rt(m) {
      var w = this.has(m) && delete this.__data__[m];
      return this.size -= w ? 1 : 0, w;
    }
    function y(m) {
      var w = this.__data__;
      if (Lt) {
        var L = w[m];
        return L === i ? void 0 : L;
      }
      return ae.call(w, m) ? w[m] : void 0;
    }
    function B(m) {
      var w = this.__data__;
      return Lt ? w[m] !== void 0 : ae.call(w, m);
    }
    function T(m, w) {
      var L = this.__data__;
      return this.size += this.has(m) ? 0 : 1, L[m] = Lt && w === void 0 ? i : w, this;
    }
    te.prototype.clear = bi, te.prototype.delete = rt, te.prototype.get = y, te.prototype.has = B, te.prototype.set = T;
    function A(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var nt = m[w];
        this.set(nt[0], nt[1]);
      }
    }
    function H() {
      this.__data__ = [], this.size = 0;
    }
    function M(m) {
      var w = this.__data__, L = nr(w, m);
      if (L < 0)
        return !1;
      var nt = w.length - 1;
      return L == nt ? w.pop() : ei.call(w, L, 1), --this.size, !0;
    }
    function X(m) {
      var w = this.__data__, L = nr(w, m);
      return L < 0 ? void 0 : w[L][1];
    }
    function $(m) {
      return nr(this.__data__, m) > -1;
    }
    function K(m, w) {
      var L = this.__data__, nt = nr(L, m);
      return nt < 0 ? (++this.size, L.push([m, w])) : L[nt][1] = w, this;
    }
    A.prototype.clear = H, A.prototype.delete = M, A.prototype.get = X, A.prototype.has = $, A.prototype.set = K;
    function st(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var nt = m[w];
        this.set(nt[0], nt[1]);
      }
    }
    function Q() {
      this.size = 0, this.__data__ = {
        hash: new te(),
        map: new (Ne || A)(),
        string: new te()
      };
    }
    function ct(m) {
      var w = Mo(this, m).delete(m);
      return this.size -= w ? 1 : 0, w;
    }
    function Tt(m) {
      return Mo(this, m).get(m);
    }
    function Ct(m) {
      return Mo(this, m).has(m);
    }
    function mt(m, w) {
      var L = Mo(this, m), nt = L.size;
      return L.set(m, w), this.size += L.size == nt ? 0 : 1, this;
    }
    st.prototype.clear = Q, st.prototype.delete = ct, st.prototype.get = Tt, st.prototype.has = Ct, st.prototype.set = mt;
    function ft(m) {
      var w = this.__data__ = new A(m);
      this.size = w.size;
    }
    function At() {
      this.__data__ = new A(), this.size = 0;
    }
    function ut(m) {
      var w = this.__data__, L = w.delete(m);
      return this.size = w.size, L;
    }
    function _e(m) {
      return this.__data__.get(m);
    }
    function Gt(m) {
      return this.__data__.has(m);
    }
    function ve(m, w) {
      var L = this.__data__;
      if (L instanceof A) {
        var nt = L.__data__;
        if (!Ne || nt.length < e - 1)
          return nt.push([m, w]), this.size = ++L.size, this;
        L = this.__data__ = new st(nt);
      }
      return L.set(m, w), this.size = L.size, this;
    }
    ft.prototype.clear = At, ft.prototype.delete = ut, ft.prototype.get = _e, ft.prototype.has = Gt, ft.prototype.set = ve;
    function ye(m, w) {
      var L = Ka(m), nt = !L && Ga(m), xt = !L && !nt && dc(m), Ot = !L && !nt && !xt && gc(m), Kt = L || nt || xt || Ot, kt = Kt ? gt(m.length, String) : [], jt = kt.length;
      for (var Ni in m)
        Kt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ni == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        xt && (Ni == "offset" || Ni == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Ot && (Ni == "buffer" || Ni == "byteLength" || Ni == "byteOffset") || // Skip index properties.
        hc(Ni, jt)) || kt.push(Ni);
      return kt;
    }
    function ue(m, w, L) {
      (L !== void 0 && !Lo(m[w], L) || L === void 0 && !(w in m)) && ce(m, w, L);
    }
    function rr(m, w, L) {
      var nt = m[w];
      (!(ae.call(m, w) && Lo(nt, L)) || L === void 0 && !(w in m)) && ce(m, w, L);
    }
    function nr(m, w) {
      for (var L = m.length; L--; )
        if (Lo(m[L][0], w))
          return L;
      return -1;
    }
    function ce(m, w, L) {
      w == "__proto__" && Ie ? Ie(m, w, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : m[w] = L;
    }
    var re = Ap();
    function Xe(m) {
      return m == null ? m === void 0 ? P : x : me && me in Object(m) ? Op(m) : Rp(m);
    }
    function xn(m) {
      return fs(m) && Xe(m) == a;
    }
    function Io(m) {
      if (!or(m) || Lp(m))
        return !1;
      var w = Za(m) ? Pt : q;
      return w.test($p(m));
    }
    function Wr(m) {
      return fs(m) && pc(m.length) && !!G[Xe(m)];
    }
    function Ti(m) {
      if (!or(m))
        return Dp(m);
      var w = fc(m), L = [];
      for (var nt in m)
        nt == "constructor" && (w || !ae.call(m, nt)) || L.push(nt);
      return L;
    }
    function sr(m, w, L, nt, xt) {
      m !== w && re(w, function(Ot, Kt) {
        if (xt || (xt = new ft()), or(Ot))
          Sn(m, w, Kt, L, sr, nt, xt);
        else {
          var kt = nt ? nt(Va(m, Kt), Ot, Kt + "", m, w, xt) : void 0;
          kt === void 0 && (kt = Ot), ue(m, Kt, kt);
        }
      }, mc);
    }
    function Sn(m, w, L, nt, xt, Ot, Kt) {
      var kt = Va(m, L), jt = Va(w, L), Ni = Kt.get(jt);
      if (Ni) {
        ue(m, L, Ni);
        return;
      }
      var li = Ot ? Ot(kt, jt, L + "", m, w, Kt) : void 0, ds = li === void 0;
      if (ds) {
        var Qa = Ka(jt), Ja = !Qa && dc(jt), vc = !Qa && !Ja && gc(jt);
        li = jt, Qa || Ja || vc ? Ka(kt) ? li = kt : Hp(kt) ? li = Ep(kt) : Ja ? (ds = !1, li = Tp(jt)) : vc ? (ds = !1, li = Sp(jt)) : li = [] : Bp(jt) || Ga(jt) ? (li = kt, Ga(kt) ? li = Yp(kt) : (!or(kt) || Za(kt)) && (li = kp(jt))) : ds = !1;
      }
      ds && (Kt.set(jt, li), xt(li, jt, nt, Ot, Kt), Kt.delete(jt)), ue(m, L, li);
    }
    function Ri(m, w) {
      return zp(Np(m, w, _c), m + "");
    }
    var bp = Ie ? function(m, w) {
      return Ie(m, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Up(w),
        writable: !0
      });
    } : _c;
    function Tp(m, w) {
      return m.slice();
    }
    function xp(m) {
      var w = new m.constructor(m.byteLength);
      return new De(w).set(new De(m)), w;
    }
    function Sp(m, w) {
      var L = xp(m.buffer);
      return new m.constructor(L, m.byteOffset, m.length);
    }
    function Ep(m, w) {
      var L = -1, nt = m.length;
      for (w || (w = Array(nt)); ++L < nt; )
        w[L] = m[L];
      return w;
    }
    function Cp(m, w, L, nt) {
      var xt = !L;
      L || (L = {});
      for (var Ot = -1, Kt = w.length; ++Ot < Kt; ) {
        var kt = w[Ot], jt = void 0;
        jt === void 0 && (jt = m[kt]), xt ? ce(L, kt, jt) : rr(L, kt, jt);
      }
      return L;
    }
    function Pp(m) {
      return Ri(function(w, L) {
        var nt = -1, xt = L.length, Ot = xt > 1 ? L[xt - 1] : void 0, Kt = xt > 2 ? L[2] : void 0;
        for (Ot = m.length > 3 && typeof Ot == "function" ? (xt--, Ot) : void 0, Kt && Ip(L[0], L[1], Kt) && (Ot = xt < 3 ? void 0 : Ot, xt = 1), w = Object(w); ++nt < xt; ) {
          var kt = L[nt];
          kt && m(w, kt, nt, Ot);
        }
        return w;
      });
    }
    function Ap(m) {
      return function(w, L, nt) {
        for (var xt = -1, Ot = Object(w), Kt = nt(w), kt = Kt.length; kt--; ) {
          var jt = Kt[++xt];
          if (L(Ot[jt], jt, Ot) === !1)
            break;
        }
        return w;
      };
    }
    function cc(m, w, L, nt, xt, Ot) {
      return or(m) && or(w) && (Ot.set(w, m), sr(m, w, void 0, cc, Ot), Ot.delete(w)), m;
    }
    function Mo(m, w) {
      var L = m.__data__;
      return Mp(w) ? L[typeof w == "string" ? "string" : "hash"] : L.map;
    }
    function Xa(m, w) {
      var L = Se(m, w);
      return Io(L) ? L : void 0;
    }
    function Op(m) {
      var w = ae.call(m, me), L = m[me];
      try {
        m[me] = void 0;
        var nt = !0;
      } catch {
      }
      var xt = Vt.call(m);
      return nt && (w ? m[me] = L : delete m[me]), xt;
    }
    function kp(m) {
      return typeof m.constructor == "function" && !fc(m) ? Ee(Wi(m)) : {};
    }
    function hc(m, w) {
      var L = typeof m;
      return w = w ?? o, !!w && (L == "number" || L != "symbol" && Z.test(m)) && m > -1 && m % 1 == 0 && m < w;
    }
    function Ip(m, w, L) {
      if (!or(L))
        return !1;
      var nt = typeof w;
      return (nt == "number" ? ja(L) && hc(w, L.length) : nt == "string" && w in L) ? Lo(L[w], m) : !1;
    }
    function Mp(m) {
      var w = typeof m;
      return w == "string" || w == "number" || w == "symbol" || w == "boolean" ? m !== "__proto__" : m === null;
    }
    function Lp(m) {
      return !!Ue && Ue in m;
    }
    function fc(m) {
      var w = m && m.constructor, L = typeof w == "function" && w.prototype || Oe;
      return m === L;
    }
    function Dp(m) {
      var w = [];
      if (m != null)
        for (var L in Object(m))
          w.push(L);
      return w;
    }
    function Rp(m) {
      return Vt.call(m);
    }
    function Np(m, w, L) {
      return w = Re(w === void 0 ? m.length - 1 : w, 0), function() {
        for (var nt = arguments, xt = -1, Ot = Re(nt.length - w, 0), Kt = Array(Ot); ++xt < Ot; )
          Kt[xt] = nt[w + xt];
        xt = -1;
        for (var kt = Array(w + 1); ++xt < w; )
          kt[xt] = nt[xt];
        return kt[w] = L(Kt), dt(m, this, kt);
      };
    }
    function Va(m, w) {
      if (!(w === "constructor" && typeof m[w] == "function") && w != "__proto__")
        return m[w];
    }
    var zp = Fp(bp);
    function Fp(m) {
      var w = 0, L = 0;
      return function() {
        var nt = at(), xt = n - (nt - L);
        if (L = nt, xt > 0) {
          if (++w >= r)
            return arguments[0];
        } else
          w = 0;
        return m.apply(void 0, arguments);
      };
    }
    function $p(m) {
      if (m != null) {
        try {
          return Rt.call(m);
        } catch {
        }
        try {
          return m + "";
        } catch {
        }
      }
      return "";
    }
    function Lo(m, w) {
      return m === w || m !== m && w !== w;
    }
    var Ga = xn(/* @__PURE__ */ function() {
      return arguments;
    }()) ? xn : function(m) {
      return fs(m) && ae.call(m, "callee") && !qi.call(m, "callee");
    }, Ka = Array.isArray;
    function ja(m) {
      return m != null && pc(m.length) && !Za(m);
    }
    function Hp(m) {
      return fs(m) && ja(m);
    }
    var dc = wi || Xp;
    function Za(m) {
      if (!or(m))
        return !1;
      var w = Xe(m);
      return w == l || w == g || w == c || w == C;
    }
    function pc(m) {
      return typeof m == "number" && m > -1 && m % 1 == 0 && m <= o;
    }
    function or(m) {
      var w = typeof m;
      return m != null && (w == "object" || w == "function");
    }
    function fs(m) {
      return m != null && typeof m == "object";
    }
    function Bp(m) {
      if (!fs(m) || Xe(m) != E)
        return !1;
      var w = Wi(m);
      if (w === null)
        return !0;
      var L = ae.call(w, "constructor") && w.constructor;
      return typeof L == "function" && L instanceof L && Rt.call(L) == ie;
    }
    var gc = Ut ? lt(Ut) : Wr;
    function Yp(m) {
      return Cp(m, mc(m));
    }
    var Wp = Ri(function(m) {
      return m.push(void 0, cc), dt(qp, void 0, m);
    });
    function mc(m) {
      return ja(m) ? ye(m) : Ti(m);
    }
    var qp = Pp(function(m, w, L, nt) {
      sr(m, w, L, nt);
    });
    function Up(m) {
      return function() {
        return m;
      };
    }
    function _c(m) {
      return m;
    }
    function Xp() {
      return !1;
    }
    s.exports = Wp;
  }(Ls, Ls.exports)), Ls.exports;
}
var j_ = K_();
const Ht = /* @__PURE__ */ G_(j_), Z_ = 60, ys = {}, Nh = (s, t = Z_) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), r = 1e3 / t;
  ys[s] = ys[s] || null;
  const n = ys[s] ? i - ys[s] : null;
  (n === null || n > r) && (ys[s] = i - n % r, s(...e));
});
function wo() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const yu = (s, t, e, i, r, n) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${r}:${o}${n})`;
  return window.matchMedia(a).matches ? yu(o, t, e - 1, i, r, n) : yu(s, o, e - 1, i, r, n);
}, Q_ = (s, t, e, i, r, n) => yu(e, i, r, n, s, t), J_ = () => Math.round(
  Q_("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, t0 = (s) => Math.round(window.devicePixelRatio * 100) - s, e0 = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Sl = {
  firefox: J_,
  chrome: t0,
  default: e0
}, zh = {
  calculate: (s, t) => Sl[s] ? Sl[s](t) : Sl.default(t)
}, oc = "APPLICATION:MOBILE_MENU:OPEN", ac = "APPLICATION:MOBILE_MENU:CLOSED", Da = "APPLICATION_PRELUDIUM", wu = "APPLICATION:INITIALIZED", bo = "APPLICATION:READY", Mi = "APPLICATION:REVEALED", Li = "APPLICATION:RESIZE", Br = "APPLICATION:SCROLL", fp = "APPLICATION:SCROLL_LOCKED", dp = "APPLICATION:SCROLL_RELEASED", Wa = "APPLICATION:FORCED_SCROLL_START", qa = "APPLICATION:FORCED_SCROLL_END", Ua = "APPLICATION:OUTLINE", pp = "APPLICATION:VISIBILITY_CHANGE", gp = "APPLICATION:HIDDEN", mp = "APPLICATION:VISIBLE", Ra = "BREAKPOINT:CHANGE", lc = "IMAGE:LAZYLOADED", _p = "IMAGE:REVEALED", vp = "SECTION:LAZYLOADED", I0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: qa,
  APPLICATION_FORCED_SCROLL_START: Wa,
  APPLICATION_HIDDEN: gp,
  APPLICATION_INITIALIZED: wu,
  APPLICATION_MOBILE_MENU_CLOSED: ac,
  APPLICATION_MOBILE_MENU_OPEN: oc,
  APPLICATION_OUTLINE: Ua,
  APPLICATION_PRELUDIUM: Da,
  APPLICATION_READY: bo,
  APPLICATION_RESIZE: Li,
  APPLICATION_REVEALED: Mi,
  APPLICATION_SCROLL: Br,
  APPLICATION_SCROLL_LOCKED: fp,
  APPLICATION_SCROLL_RELEASED: dp,
  APPLICATION_VISIBILITY_CHANGE: pp,
  APPLICATION_VISIBLE: mp,
  BREAKPOINT_CHANGE: Ra,
  IMAGE_LAZYLOADED: lc,
  IMAGE_REVEALED: _p,
  SECTION_LAZYLOADED: vp
}, Symbol.toStringTag, { value: "Module" })), i0 = {
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
class Fh {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = Ht(e, i0), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Da, () => {
      this.initialize(!1);
    }), window.addEventListener(Mi, () => {
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
            const u = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), u !== this.currentBreakpoint) {
              const c = new CustomEvent(Ra, {
                detail: {
                  leaveBreakpoint: u,
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
        }, r = new CustomEvent(Ra);
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
class r0 {
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
        const e = new window.CustomEvent(Ua);
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
class n0 {
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
class s0 {
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
    const i = t.getBoundingClientRect(), r = this.outerHeight(t), n = i.top + r, o = e.getBoundingClientRect(), a = this.outerHeight(e), u = o.top + a;
    return n > o.top ? n - o.top : i.top > u ? i.top - u : 0;
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
const ot = new s0();
D.registerPlugin(bn);
D.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  if (s.persisted) {
    const t = document.querySelector("#fader");
    t && D.to(t, { duration: 0.35, autoAlpha: 0 });
    const e = document.querySelectorAll("[data-fader]");
    e.length && D.to(e, { duration: 0.35, autoAlpha: 0 }), D.set(document.body, { clearProps: "opacity" });
    const i = ot.find("header[data-nav]");
    D.set(i, { clearProps: "opacity" });
    const r = ot.find("main");
    D.set(r, { clearProps: "opacity" });
    const n = ot.find("footer");
    D.set(n, { clearProps: "opacity" });
  }
};
const o0 = {
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
      D.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), D.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class M0 {
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
    }, this.opts = Ht(t, o0), this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new r0(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Fh(this, this.opts.breakpointConfig) : this.breakpoints = new Fh(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new n0(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = wo(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (D.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(
      Ra,
      this.onBreakpointChanged.bind(this)
    ), this.beforeInitializedEvent = new window.CustomEvent(
      Da,
      this
    ), this.initializedEvent = new window.CustomEvent(
      wu,
      this
    ), this.readyEvent = new window.CustomEvent(bo, this), this.revealedEvent = new window.CustomEvent(
      Mi,
      this
    ), document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this)
    ), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", Nh(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", Nh(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Da), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(wu), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(bo), this.fadeIn();
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
        ), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), D.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = zh.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (zh.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(fp, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, D.set(document.body, { overflow: "hidden" }), D.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(dp, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, D.set(document.body, { overflow: t }), D.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
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
      Wa
    );
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? n = t : n = { y: t, autoKill: !1 }, D.to(window, {
      duration: e,
      scrollTo: n,
      onComplete: () => {
        const a = new window.CustomEvent(
          qa
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
    const e = ot.find(t);
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
      const t = ot.all('source[type="image/webp"]');
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Mi));
  }
  _getBaseVW() {
    const t = ot.getCSSVar("--font-base-px"), e = parseFloat(t, 10), i = window.innerWidth;
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
    ), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = ot.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
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
    this.size.container = ot.getCSSVar("--container-padding");
  }
  /**
   * RAF'ed resize event
   */
  onResize(t) {
    const e = this.size.width !== window.innerWidth, i = this.size.height !== window.innerHeight, r = e || i, n = this.size.devicePixelRatio - window.devicePixelRatio;
    this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.size.scrollHeight = document.body.scrollHeight, this.size.devicePixelRatio = window.devicePixelRatio, this.updateZoom(r, n), this.setvh100(), this.setScrollHeight(), this.setFontBaseVw();
    const o = new CustomEvent(Li, {
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
    }, i = new CustomEvent(Br, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(pp, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(gp, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(mp, t), window.dispatchEvent(e));
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
    D.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
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
    const t = D.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          D.set([e, i], { display: "none" });
        });
        break;
      case 1:
        D.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        D.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        const i = ot.find(".dbg-grid"), r = ot.all(i, "b");
        if (!i || !r)
          return;
        ot.hasClass(i, "visible") ? (D.set(r, { width: "auto" }), D.to(r, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (D.set(r, { width: 0 }), i.classList.toggle("visible"), D.to(r, {
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
const a0 = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = D.timeline();
    s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s), e.to(s.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(s.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(s.cc, { display: "none" });
  },
  onRefuse: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = D.timeline();
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
    D.timeline().fromTo(
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
class L0 {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, a0), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Mi, () => {
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
const l0 = {};
class D0 {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, l0), this.initialize();
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
        D.timeline().set(o, { opacity: 1 }).to(n, { duration: 0.5, opacity: 0, ease: "sine.in" }).to(r, { duration: 1, opacity: 0, ease: "sine.in" }).set(r, { display: "none" }).call(() => {
          i && i.play();
        });
      });
    });
  }
}
const u0 = {
  page: 0,
  loaderParam: {},
  filter: "",
  onFetch: (s) => {
  }
};
class R0 {
  constructor(t, e, i = {}) {
    this.status = "available", this.app = t, this.$el = e, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = ot.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = ot.find(e, "[data-loader-canvas]"), this.opts = Ht(i, u0), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = ot.all(this.$el, "[data-loader-param]"), this.$paramEls.forEach((t) => {
      t.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = ot.find(this.$el, "[data-loader-more]"), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = ot.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.$el.dataset.loaderId && (this.id = this.$el.dataset.loaderId, this.$filterInput = ot.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener(
      "input",
      this.debounce(this.onFilterInput.bind(this))
    );
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
      e ? this.opts.loaderParam[i] = this.opts.loaderParam[i].filter(
        (r) => r !== t.currentTarget.dataset.loaderParam
      ) : delete this.opts.loaderParam[i], t.currentTarget.removeAttribute("data-loader-param-selected");
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
const c0 = {
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
class N0 {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Ht(e, c0), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = D.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = ot.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
      const i = this.elements.trigger.getAttribute(
        "data-dropdown-target"
      );
      this.elements.menu = ot.find(i);
    } else
      this.elements.menu = ot.find(this.element, this.opts.selectors.menu);
    this.elements.menuItems = ot.all(
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
      ot.setCSSVar(
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
const h0 = {};
class z0 {
  constructor(t, e, i = {}, r = document.body) {
    this.app = t, this.container = r, this.opts = Ht(i, h0), this.selector = e, this.initialize(), window.addEventListener(Li, () => {
      D.set("[data-eq-height-elements-adjusted]", {
        clearProps: "minHeight"
      }), this.initialize();
    });
  }
  initialize() {
    const t = ot.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const r = [];
      let n = [], o = 0;
      ot.all(e, this.selector).forEach((u) => {
        const c = u.getBoundingClientRect();
        if (i === null) {
          o = c.height, n.push(u), i = c.top;
          return;
        }
        i !== c.top ? (console.debug("== pushing actionables", { elements: n, height: o }), r.push({ elements: n, height: o }), n = [], o = c.height) : i === c.top ? c.height > o && (o = c.height) : o = c.height, n.push(u), i = c.top;
      }), n.length && r.push({ elements: n, height: o }), r.length && r.forEach((u) => {
        D.set(u.elements, {
          minHeight: u.height,
          attr: { "data-eq-height-elements-adjusted": !0 }
        });
      });
    });
  }
}
function ko(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(lc, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function uc(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const r = s[i];
    e.push(ko(r, t));
  }
  return Promise.all(e);
}
const f0 = {
  listenForResize: !0
};
class F0 {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = Ht(e, f0), this.initialize(), e.listenForResize && window.addEventListener(Li, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let r = [], n = 0;
      const o = ot.all(t, "img");
      uc(o, !1).then(() => {
        o.forEach((a) => {
          const u = a.getBoundingClientRect(), c = this.getImgSizeInfo(a);
          if (e === null) {
            n = c.height, r.push(a), e = u.top;
            return;
          }
          e !== u.top ? (i.push({ elements: r, height: n }), r = [], n = c.height) : e === u.top ? c.height > n && (n = c.height) : n = c.height, r.push(a), e = u.top;
        }), r.length && i.push({ elements: r, height: n }), i.length && i.forEach((a) => {
          D.set(a.elements, { minHeight: a.height });
        });
      });
    });
  }
  initialize() {
    this.canvases = ot.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, i, r, n, o) {
    const a = r / n, u = e / i;
    return (function() {
      return (t ? a > u : a < u) ? (this.width = e, this.height = e / a) : (this.width = i * a, this.height = i), this.left = (e - this.width) * (o / 100), this.right = this.width + this.left, this;
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
const yp = {
  onPin: (s) => {
    D.to(s.el, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, D.to(s.el, {
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
    s.opts.altBgColor && D.to(s.el, {
      duration: 0.2,
      backgroundColor: s.opts.altBgColor
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && D.to(s.el, {
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
}, d0 = {
  el: "header[data-nav]",
  on: Mi,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      D.timeline().set(s.el, { yPercent: -100 }).set(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      D.timeline().to(s.el, {
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
    ...yp
  }
};
class $0 {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Ht(e, d0), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.opts.intersects && (this.intersectingElements = ot.all("[data-intersect]")), window.addEventListener(Ua, () => {
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
      Wa,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      qa,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Mi, () => {
      let t = Br;
      this.mainOpts.rafScroll || (t = "scroll"), window.addEventListener(t, this.redraw.bind(this), {
        capture: !1,
        passive: !0
      });
    }), this.app.registerCallback(
      bo,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      Li,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Mi, () => {
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
    return e = Ht(i, yp, e.default || {}), e;
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
const p0 = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class H0 {
  constructor(t, e) {
    this.app = t, this.opts = Ht(e, p0);
    const i = document.querySelector("main"), r = document.querySelector("[data-footer-reveal]");
    D.set(r, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const n = r.offsetHeight;
    if (D.set(i, { marginBottom: n }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const g0 = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class B0 {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Ht(e, g0), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((n) => this.setupParallaxElement(n)));
      } else
        document.querySelectorAll(this.opts.el).forEach((r) => this.setupParallaxElement(r));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Br, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
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
    const { element: i, factor: r, fadeContent: n, orientation: o } = t, a = i.getBoundingClientRect(), u = this.app.size.height, c = u / 2, l = (a.top + a.height / 2 - c) / u * r * 100;
    let g = 1;
    if (n) {
      const v = a.top / u;
      v <= 0 ? g = Math.max(0, 1 + v * 1.5) : v >= 0.7 && (g = Math.max(0, 1 - (v - 0.7) * 3.33)), g = Math.max(0, Math.min(1, g));
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
        const u = a.match(/scale\([^)]+\)/);
        u && (o = u[0]);
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
    window.removeEventListener(Br, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: r } = t;
      i && (i.style.transform = "", i.style.willChange = ""), r && (r.style.transform = "", r.style.opacity = "", r.style.willChange = ""), !i && !r && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
D.registerPlugin(xo);
const m0 = {
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
    s.slides.length > 1 ? D.to(s.el, {
      duration: 0.25,
      opacity: 1,
      onComplete: () => {
        t();
      }
    }) : D.to(s.el, {
      duration: 0.25,
      opacity: 1
    });
  }
};
class Y0 {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, m0), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), D.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      D.set(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? D.set(i, {
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
    this.app.registerCallback(Mi, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && ko(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    wo() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    const e = D.timeline();
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
        Li,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        Li,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    D.to(this.images, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
D.registerPlugin(xo);
const _0 = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    D.to(s.videoDiv, {
      duration: 1,
      autoAlpha: 1
    });
  },
  onFadeInCover: (s) => {
    D.to(s.cover, {
      duration: 0.35,
      autoAlpha: 1
    });
  },
  onFadeOutCover: (s) => {
    D.set(s.cover, {
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
class W0 {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = Ht(e, _0), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), D.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = ot.find(this.el, "[data-cover]"), this.cover && D.set(this.cover, { autoAlpha: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), D.set(this.videoDiv, {
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
    this.video.muted = !0, D.set(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && ko(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(bo, () => {
      !this.video.playing && !wo() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (wo() ? D.set(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
        Li,
        this._resize.bind(this)
      )) : window.removeEventListener(
        Li,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
    D.to(this.video, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
function El(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const v0 = {
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
class q0 {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, v0), this.target = this.opts.target || document.body, this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Mi, () => {
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
    ot.all(t, "[data-ll-image]").forEach((r) => this.swapImage(r)), ot.all(t, "[data-ll-srcset]").forEach((r) => this.revealPicture(r));
  }
  initializeAutoSizes() {
    this.opts.updateSizes && (this.$autoSizesImages = ot.all('[data-sizes="auto"]'), this.autoSizes(), window.addEventListener(Li, () => this.autoSizes()));
  }
  /**
   * Set sizes attribute for all imgs with `data-sizes="auto"` and source within the <picture>
   */
  autoSizes() {
    Array.from(this.$autoSizesImages).forEach((t) => {
      const e = this.getWidth(t);
      t.setAttribute("sizes", `${e}px`), t.parentNode && Array.from(ot.all(t.parentNode, "source")).forEach(
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
        const n = ot.all(i, "img");
        return new IntersectionObserver((o, a) => {
          o.forEach((u) => {
            (u.isIntersecting || u.intersectionRatio > 0) && (uc(n, !0).then(() => {
              El(i, vp);
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
        r.setAttribute("sizes", `${o}px`), r.parentNode && Array.from(ot.all(r.parentNode, "source")).forEach(
          (a) => a.setAttribute("sizes", `${o}px`)
        );
      }
      r.removeAttribute("data-ll-placeholder"), r.removeAttribute("data-ll-blurred"), r.removeAttribute("data-ll-loading"), r.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    r.addEventListener("load", n, !1), r.setAttribute("data-ll-loading", ""), r.dataset.src && r.setAttribute("src", r.dataset.src), r.dataset.srcset && r.setAttribute("srcset", r.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), r.complete && n(), El(r, lc);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), El(e, _p));
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
const y0 = {
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
    s.app.scrollLock(), D.to(s.elements.wrapper, {
      duration: 0.5,
      opacity: 1
    });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && D.to(s.elements.caption, {
      duration: 0.45,
      opacity: 0
    }), D.to(
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
          D.to(s.elements.wrapper, {
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
class U0 {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, y0), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: D.timeline({ paused: !0 }),
      image: D.timeline({ paused: !0 })
    }, this.lightboxes.forEach((i) => {
      const r = i.getAttribute("data-lightbox"), n = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), u = i.getAttribute("data-lightbox-section") || "general";
      let c = i;
      this.opts.trigger && (c = ot.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, u) || (this.sections[u] = []);
      const h = {
        href: r,
        alt: a,
        srcset: n
      }, f = this.sections[u].push(h) - 1;
      c.addEventListener("click", (d) => {
        d.preventDefault(), this.showBox(u, f);
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
      D.set(o, { autoAlpha: 0 }), o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", n), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", n), n === e && (a.classList.add("active"), i = a), a.addEventListener("click", (u) => {
        a.classList.add("active"), i.classList.remove("active"), i = a, u.stopPropagation(), u.preventDefault(), this.setImg(t, n, null);
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), ko(this.nextImage).then(() => {
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
    const r = new vu(e), n = new sc();
    this.elements.content.setAttribute("data-current-idx", i), r.add(n), r.on("swipeleft", () => {
      const o = this.getNextIdx(t);
      this.setImg(t, o);
    }), r.on("swiperight", () => {
      const o = this.getPrevIdx(t);
      this.setImg(t, o);
    });
  }
}
D.registerPlugin(bn);
const w0 = {
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
    n ? (D.set(n, { display: "block", opacity: 0 }), D.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), i && D.to(i, { duration: 0.2, opacity: 0 }), r && D.to(r, { duration: 0.2, opacity: 0 }), D.to(n, {
      duration: 0.2,
      opacity: 1,
      onComplete: () => {
        window.location = s;
      }
    })) : (D.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), i && D.to(i, { duration: 0.2, opacity: 0 }), r && D.to(r, { duration: 0.2, opacity: 0 }), D.to(e, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        window.location = s;
      }
    }));
  }
};
class X0 {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, w0);
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
          const a = n, u = document.querySelector(a);
          if (r.preventDefault(), u) {
            if (this.opts.onAnchor(u, this), u.hasAttribute("data-skip-history") || history.pushState({}, "", n), !this.app.header || u.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
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
      const u = this.normalizeHostname(o) === n;
      this.opts.openExternalInWindow && !u && i.setAttribute("target", "_blank"), i.addEventListener("click", (c) => {
        c.shiftKey || c.metaKey || c.ctrlKey || (e && (e.style.display = "none"), u && (c.preventDefault(), this.opts.onTransition(r, this.app)));
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const b0 = {
  center: !1,
  snap: !1,
  crawl: !0,
  loop: !0,
  // New option to control looping behavior
  speed: {
    sm: 0.1,
    lg: 0.35
  },
  ease: {
    mouseOver: { timeScale: 0.3, duration: 0.75 },
    mouseOut: { timeScale: 1, duration: 0.75 }
  },
  selector: '[data-moonwalk-run="loop"]'
};
class V0 {
  constructor(t, e = {}) {
    this.app = t, this.opts = { ...Ht(e, b0) }, this.loopers = [], this.init();
  }
  init() {
    this.looperElements = ot.all(this.opts.selector), this.looperElements.forEach((t) => {
      const e = ot.all(t, "[data-panner-item], [data-looper-item]"), i = ["mobile", "iphone"].includes(this.app.breakpoint) ? this.opts.speed.sm : this.opts.speed.lg, r = t.querySelector("[data-looper-reverse]") !== null, n = T0(this.app, e, {
        paused: !0,
        // Always start paused initially for proper setup
        repeat: -1,
        draggable: !0,
        center: this.opts.center,
        snap: this.opts.snap,
        speed: i,
        reversed: r,
        loop: this.opts.loop
        // Pass the loop option
      });
      n.toIndex(0, { duration: 0 }), this.opts.crawl && (r ? (n.progress(1), n.play(), n.timeScale(-1)) : (n.progress(0), n.play(), n.timeScale(1))), t.$loop = n;
      const o = ot.find(t, "[data-panner-next]");
      o && o.addEventListener("click", () => {
        n.next({ duration: 0.85, ease: "power2.inOut" });
      }), e.forEach((a) => {
        a.addEventListener("mouseover", () => {
          D.killTweensOf(n, "timeScale"), D.to(n, {
            ...this.opts.ease.mouseOver,
            timeScale: n.isReversed ? -0.3 : 0.3
          });
        }), a.addEventListener("mouseout", () => {
          D.killTweensOf(n, "timeScale"), D.to(n, {
            ...this.opts.ease.mouseOut,
            timeScale: n.isReversed ? -1 : 1
          });
        });
      }), D.to(t, { opacity: 1, ease: "none", delay: 0.5 }), this.loopers.push(n);
    });
  }
}
function T0(s, t, e) {
  D.registerPlugin(Oa), t = D.utils.toArray(t), e = e || {};
  const i = e.loop !== !1;
  let r = e.center, n = r === !0 ? t[0].parentNode : D.utils.toArray(r)[0] || t[0].parentNode;
  function o() {
    if (!t.length) return 0;
    let N = t[0].offsetLeft, W = t[t.length - 1], _ = (D.getProperty(W, "xPercent") || 0) / 100, q = parseFloat(D.getProperty(W, "width", "px")), Z = D.getProperty(W, "scaleX") || 1;
    return W.offsetLeft + _ * q - N + W.offsetWidth * Z + (parseFloat(e.paddingRight) || 0);
  }
  function a() {
    if (!i) return;
    let N = o(), W = 10, _ = 0;
    for (; N < n.offsetWidth * 2 && _ < W; )
      [...t].forEach((Z) => {
        const G = Z.cloneNode(!0);
        n.appendChild(G), t.push(G);
      }), N = o(), _++;
  }
  a();
  let u = e.onChange, c = 0, h = D.timeline({
    repeat: i ? e.repeat : 0,
    // Only repeat if looping
    onUpdate: u && function() {
      let N = h.closestIndex();
      c !== N && (c = N, u(t[N], N));
    },
    paused: e.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => i && h.totalTime(h.rawTime() + h.duration() * 100)
  }), f = t.length, d = t[0].offsetLeft, l = [], g = [], p = [], v = [], x = 0, E = !1, C = (e.speed || 1) * 100, S = e.snap === !1 ? (N) => N : D.utils.snap(e.snap || 1), b = 0, I, P = r === !0, O = () => t[f - 1].offsetLeft + v[f - 1] / 100 * g[f - 1] - d + p[0] + t[f - 1].offsetWidth * D.getProperty(t[f - 1], "scaleX") + (parseFloat(e.paddingRight) || 0), R, z = () => {
    let N = n.getBoundingClientRect(), W;
    t.forEach((_, q) => {
      g[q] = parseFloat(D.getProperty(_, "width", "px")), v[q] = S(
        parseFloat(D.getProperty(_, "x", "px")) / g[q] * 100 + D.getProperty(_, "xPercent")
      ), W = _.getBoundingClientRect(), p[q] = W.left - (q ? N.right : N.left), N = W;
    }), D.set(t, {
      // convert "x" to "xPercent" to make things responsive
      xPercent: (_) => v[_]
    }), I = O();
  }, U = () => {
    b = P ? h.duration() * (n.offsetWidth / 2) / I : 0, P && l.forEach((N, W) => {
      l[W] = R(
        h.labels["label" + W] + h.duration() * g[W] / 2 / I - b
      );
    });
  }, F = (N, W, _) => {
    let q = N.length, Z = 1e10, G = 0, et;
    for (; q--; )
      et = Math.abs(N[q] - W), et > _ / 2 && (et = _ - et), et < Z && (Z = et, G = q);
    return G;
  }, Y = () => {
    let N, W, _, q, Z;
    if (h.clear(), i)
      for (N = 0; N < f; N++)
        W = t[N], _ = v[N] / 100 * g[N], q = W.offsetLeft + _ - d + p[0], Z = q + g[N] * D.getProperty(W, "scaleX"), h.to(
          W,
          {
            xPercent: S((_ - Z) / g[N] * 100),
            duration: Z / C
          },
          0
        ).fromTo(
          W,
          {
            xPercent: S((_ - Z + I) / g[N] * 100)
          },
          {
            xPercent: v[N],
            duration: (_ - Z + I - _) / C,
            immediateRender: !1
          },
          Z / C
        ).add("label" + N, q / C), l[N] = q / C;
    else {
      let G = I - n.offsetWidth;
      if (G <= 0)
        return;
      let et = G / C;
      for (h.addLabel("start", 0), N = 0; N < f; N++) {
        W = t[N];
        let pt = v[N] - G / g[N] * 100;
        h.to(
          W,
          {
            xPercent: pt,
            duration: et
          },
          0
        );
        let vt = N / (f - 1);
        h.addLabel("label" + N, vt * et), l[N] = vt * et;
      }
      h.addLabel("end", et);
    }
    R = D.utils.wrap(0, h.duration());
  }, tt = (N) => {
    let W = h.progress();
    h.progress(0, !0), z(), N && Y(), U(), N && h.draggable ? h.time(l[x], !0) : h.progress(W, !0);
  }, it;
  D.set(t, { x: 0 }), z(), Y(), U(), window.addEventListener("APPLICATION:RESIZE", (N) => {
    N.detail.widthChanged && tt(!0);
  });
  function j(N, W) {
    W = W || {}, i ? Math.abs(N - x) > f / 2 && (N += N > x ? -f : f) : N = Math.max(0, Math.min(N, f - 1));
    let _ = i ? D.utils.wrap(0, f, N) : N, q = l[_];
    return i && q > h.time() != N > x && N !== x && (q += h.duration() * (N > x ? 1 : -1)), i && (q < 0 || q > h.duration()) && (W.modifiers = { time: R }), x = _, W.overwrite = !0, D.killTweensOf(it), W.duration === 0 ? h.time(i ? R(q) : q) : h.tweenTo(q, W);
  }
  h.toIndex = (N, W) => j(N, W), h.closestIndex = (N) => {
    let W = F(l, h.time(), h.duration());
    return N && (x = W, E = !1), W;
  }, h.refreshLoop = tt, h.current = () => E ? h.closestIndex(!0) : x, h.next = (N) => j(h.current() + 1, N), h.previous = (N) => j(h.current() - 1, N), h.times = l, h.isReversed = e.reversed, h.isLooping = i;
  const V = h.play;
  if (h.play = function(...N) {
    const W = V.apply(this, N);
    return this.isReversed ? h.timeScale(-1) : h.timeScale(1), W;
  }, h.isReversed = !!e.reversed, e.draggable && typeof os == "function") {
    it = document.createElement("div");
    let N = D.utils.wrap(0, 1), W, _, q, Z, G, et = () => h.progress(N(_ + (q.startX - q.x) * W)), Dt = () => h.closestIndex(!0);
    typeof Oa > "u" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping."), q = os.create(it, {
      trigger: n,
      type: "x",
      zIndexBoost: !1,
      onPressInit() {
        let pt = this.x;
        D.killTweensOf(h), _ = h.progress(), tt(), W = 1 / I, G = _ / -W - pt, !(G > 1e3 || G < -1e3) && D.set(it, { x: _ / -W });
      },
      onDrag: et,
      onThrowUpdate: et,
      overshootTolerance: 0,
      inertia: !0,
      onDragStart() {
        h.pause();
      },
      snap(pt) {
        if (Math.abs(_ / -W - this.x) < 10)
          return Z + G;
        let vt = -(pt * W) * h.duration(), ht = i ? R(vt) : Math.max(0, Math.min(h.duration(), vt)), qt = l[F(l, i ? ht : vt, h.duration())], Bt = qt - (i ? ht : vt);
        return i && Math.abs(Bt) > h.duration() / 2 && (Bt += Bt < 0 ? h.duration() : -h.duration()), Z = (vt + Bt) / h.duration() / -W, Z;
      },
      onRelease() {
        Dt(), q.isThrowing && (E = !0);
      },
      onThrowComplete() {
        if (Dt(), !i) {
          h.progress(h.progress());
          return;
        }
        h.isReversed ? (h.progress(h.progress()), h.pause(), h.play(), D.fromTo(h, { timeScale: 0 }, { timeScale: -1, ease: "power2.in", duration: 2 })) : (h.progress(h.progress()), h.pause(), h.play(), D.fromTo(h, { timeScale: 0 }, { timeScale: 1, ease: "power2.in", duration: 2 }));
      }
    })[0], h.draggable = q;
  }
  return h.closestIndex(!0), c = x, u && u(t[x], x), h;
}
const x0 = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    Wt.to(s, { opacity: 1, ease: "none" });
  }
};
class G0 {
  constructor(t, e, i) {
    this.opts = Ht(i, x0), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = ot.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = ot.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = ot.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    Wt.set(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.setHeight(), this.fillText();
    const e = this.elements.$holder.offsetWidth, i = ot.all(this.elements.$el, "[data-marquee-holder]"), r = e * i.length;
    this.duration = (e + r) / this.opts.speed, Wt.set(this.elements.$marquee, { width: r }), this.initializeTween(), ot.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = ot.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Wt.set(e, { clearProps: "all" }));
  }
  killTweens() {
    this.timeline && (this.timeline.kill(), this.timeline = null);
  }
  initializeTween() {
    const t = ot.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      Wt.set(e, { position: "absolute", left: e.offsetWidth * i });
    }), this.timeline = Wt.timeline({ paused: !0 }), this.timeline.to(t, { xPercent: -100, ease: "none", duration: this.duration }, "standard").repeat(-1), this.timeline.totalProgress(this.opts.startProgress), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    this.playing = !0, Wt.killTweensOf(this.timeline), t ? (this.timeline.play(), Wt.to(this.timeline, {
      timeScale: 1,
      ease: "sine.in",
      duration: 0.8
    })) : (this.timeline.timeScale(1), this.timeline.play());
  }
  pause() {
    this.playing = !1, Wt.to(this.timeline, {
      timeScale: 0.01,
      onComplete: () => {
        this.timeline.pause();
      },
      duration: 0.8
    });
  }
  slowDown() {
    Wt.to(this.timeline, {
      timeScale: 0.5,
      duration: 0.8
    });
  }
  speedUp() {
    Wt.to(this.timeline, {
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
      this.opts.spacer && this.elements.$holder.appendChild(ot.new(this.opts.spacer)[0]);
      const e = Math.max(Math.ceil(this.app.size.width / t) - 1, 2);
      for (let i = 0; i < e; i += 1)
        this.elements.$holder.append(this.elements.$item.cloneNode(!0)), this.opts.spacer && this.elements.$holder.appendChild(ot.new(this.opts.spacer)[0]);
      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(!0));
    } else
      console.error(
        "no textWidth! probably image? Set width to elements inside holder",
        this.elements.$item
      );
  }
  setHeight() {
    const t = this.elements.$item.offsetHeight + this.opts.extraHeight;
    Wt.set(this.elements.$el, { height: t });
  }
}
const S0 = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: (s) => {
    const t = D.timeline();
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
    document.body.classList.toggle("open-menu"), D.timeline().call(() => {
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
class K0 {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, S0), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(Li, () => {
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
      oc
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      ac
    );
    window.dispatchEvent(t);
  }
}
D.registerPlugin(xo);
const E0 = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Mi,
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
class j0 {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = Ht(e, E0), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), wo() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    const e = D.timeline({
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
    const e = ot.all(t, "[data-moonwalk-children]");
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
      D.set(t.children, n);
    }
    if (t.stage.name) {
      const r = e[t.stage.name];
      r ? D.set(t.el, r.transition.from) : console.error(
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
              const u = i[t.stage.name], c = {
                ...u.transition.to,
                duration: u.duration
              };
              t.timeline.to(a.target, c, 0), t.stage.firstTween = !0;
            }
            if (t.name) {
              const u = i[t.name];
              u || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), typeof u.alphaTween == "object" ? u.alphaTween.duration = u.alphaTween.duration ? u.alphaTween.duration : u.duration : u.alphaTween === !0 && (u.alphaTween = {
                duration: u.duration,
                ease: "sine.in"
              }), u.startDelay && (u.transition.to = {
                ...u.transition.to,
                delay: u.startDelay
              }), t.timeline.staggerTo(
                t.children,
                u.duration,
                u.transition.to,
                u.interval,
                0
              ), u.alphaTween && t.timeline.staggerTo(
                t.children,
                u.alphaTween.duration,
                {
                  opacity: 1,
                  ease: u.alphaTween.ease,
                  delay: u.startDelay || 0
                },
                u.interval,
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
          const a = r[o], u = a.boundingClientRect, c = window.innerHeight, h = window.innerWidth;
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
              top: u.top,
              bottom: u.bottom,
              left: u.left,
              right: u.right
            });
            const d = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, d, f), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && n.unobserve(a.target);
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
              u.bottom <= 0 ? d.direction = "top" : u.top >= c ? d.direction = "bottom" : u.right <= 0 ? d.direction = "left" : u.left >= h && (d.direction = "right");
            t.onExit(a.target, f, d), t.repeated || n.unobserve(a.target);
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
            const u = a.target.getAttribute("data-moonwalk"), c = u.length ? i.walks[u] : i.walks.default, { duration: h, transition: f, interval: d, startDelay: l } = c;
            let { alphaTween: g } = c, p = (h - d) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof g == "object" && g !== null ? g.duration = g.duration ? g.duration : h : g === !0 && (g = {
              duration: h,
              ease: "sine.in"
            });
            const v = f ? this.tweenJS : this.tweenCSS, x = () => {
              v(
                t,
                a.target,
                h,
                d,
                f,
                p,
                g
              );
            }, E = () => {
              l ? D.delayedCall(l, x) : x();
            };
            if (a.target.tagName === "IMG")
              ko(a.target).then(() => E());
            else if (a.target.hasAttribute("data-placeholder"))
              E();
            else {
              const C = a.target.querySelectorAll("img");
              C.length ? Array.from(C).every(
                (b) => b.hasAttribute("data-ll-placeholder")
              ) ? E() : uc(C).then(() => E()) : E();
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
    let u;
    const c = i - o;
    if (ot.hasAttribute(e, "data-moonwalked"))
      return;
    if (t.timeline.isActive() && t.timeline.recent()) {
      const f = t.timeline.time(), d = t.timeline.recent().time(), l = t.timeline.recent().endTime();
      d > c ? u = () => t.timeline.time() : f + o * -1 < l ? u = () => `>${o}` : u = () => t.timeline.time();
    } else
      u = () => ">";
    D.set(e, n.from);
    const h = {
      ...n.to,
      duration: i,
      onComplete: () => e.setAttribute("data-moonwalked", "")
    };
    t.timeline.to(e, h, u()), a && t.timeline.to(
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
    const u = i - o * -1;
    if (!ot.hasAttribute(e, "data-moonwalked")) {
      if (t.timeline.isActive() && t.timeline.recent()) {
        const c = t.timeline.time(), h = t.timeline.recent().time(), f = t.timeline.recent().endTime();
        h > u ? a = () => t.timeline.time() : c + o * -1 < f ? a = () => `>${o}` : a = () => t.timeline.time();
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
const C0 = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, ws = [];
class Z0 {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = Ht(i, C0), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), ws.includes(this) || ws.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
      this.addScrollListener();
    }), typeof this.opts.onShow == "function" && requestAnimationFrame(() => {
      this.opts.onShow(this);
    });
  }
  // Update popover position based on trigger position
  updatePosition(t = !0) {
    const { top: e, left: i } = this.trigger.getBoundingClientRect(), { offsetHeight: r, offsetWidth: n } = this.trigger, { offsetHeight: o, offsetWidth: a } = this.popover, u = this.orderedPositions.indexOf(this.position), c = {
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
    }, h = this.orderedPositions.slice(u).concat(this.orderedPositions.slice(0, u)).map((f) => c[f]).find((f) => (t || (this.popover.style.top = `${f.top}px`, this.popover.style.left = `${f.left}px`), ot.inViewport(this.popover)));
    this.orderedPositions.forEach((f) => {
      this.popover.classList.remove(`${this.className}--${f}`);
    }), h ? (t && this.isVisible ? D.to(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? D.to(this.popover, {
      top: Math.max(0, c.bottom.top),
      left: Math.max(0, c.bottom.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, c.bottom.top)}px`, this.popover.style.left = `${Math.max(0, c.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = ws.indexOf(this);
    t !== -1 && ws.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    ws.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Br, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(
      Br,
      this.boundHandleScroll
    );
  }
}
const P0 = {
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
    D.set(e.backdrop, { display: "block" }), D.to(e.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        D.fromTo(
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
    t && D.to(t, {
      duration: 0.3,
      opacity: 0,
      display: "none"
    }), D.to(s.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        s.backdrop.remove();
      }
    });
  }
};
class Q0 {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = Ht(i, P0), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
      n.addEventListener("click", (u) => {
        this.opts.responsive(this.app) && (u.stopImmediatePropagation(), u.preventDefault(), this.open(n, o, a));
      });
    }), r.forEach((n) => {
      const o = n.closest(this.opts.selector), a = o ? o.getAttribute("data-popup-key") : null;
      n.addEventListener("click", (u) => {
        u.stopImmediatePropagation(), u.preventDefault(), (!this.popupKey || !a || this.popupKey === a) && (this.opts.onClose(this), this.close());
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), D.set(e, { opacity: 0, display: "none", zIndex: 4999 }), e.addEventListener("click", (i) => {
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
const A0 = {
  onIntersect: (s, t) => {
  }
};
class J0 {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, A0), this.initialize();
  }
  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = ot.all("[data-scrollspy-trigger]");
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
const O0 = {};
class tv {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, O0), this.initialize();
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
    D.set(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    D.set(t, { height: e.clientHeight });
  }
}
const wp = {
  onMainVisible: (s) => {
    D.to(s.el, {
      duration: 3,
      opacity: 1,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    D.to(s.el, {
      duration: 1,
      opacity: 0
    });
  },
  onPin: (s) => {
    D.to(s.auxEl, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, D.to(s.auxEl, {
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
}, k0 = {
  el: "header[data-nav]",
  on: Mi,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      D.set(s.el, { opacity: 0 });
    },
    enter: (s) => {
      D.timeline().set(s.auxEl, { yPercent: -100 }).set(s.lis, { opacity: 0 }).to(s.auxEl, 1, {
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
    ...wp
  }
};
class ev {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Ht(e, k0), this.mainOpts.pinOnOutline && window.addEventListener(Ua, () => {
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
      Li,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      Br,
      this.update.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Wa, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      qa,
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
    return e = Ht(i, wp, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      oc,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      ac,
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
class iv {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   */
  constructor(t, e) {
    this.open = !1, this.app = t, this.el = e, this.trigger = ot.find(this.el, "[data-toggle-trigger]"), this.triggerTarget = this.trigger.dataset.toggleTrigger, this.triggerTarget ? this.content = ot.all(
      this.el,
      `[data-toggle-content="${this.triggerTarget}"]`
    ) : this.content = ot.all(this.el, "[data-toggle-content]"), this.triggerIcon = ot.find(this.trigger, "span.icon"), this.trigger.addEventListener("click", this.onClick.bind(this));
  }
  /**
   * Handle click on trigger element
   */
  onClick() {
    this.toggleState(), this.open ? (this.triggerIcon && this.triggerIcon.classList.toggle("active"), D.set(this.content, { height: "auto", display: "block" }), this.el.classList.toggle("open"), D.from(this.content, {
      height: 0,
      ease: "power1.inOut",
      stagger: 0.1,
      onComplete: () => {
        this.content.forEach((t) => t.removeAttribute("data-toggle-hidden")), this.content.forEach(
          (t) => t.setAttribute("data-toggle-visible", "")
        );
      }
    })) : (this.triggerIcon && this.triggerIcon.classList.toggle("active"), D.to(this.content, {
      duration: 0.25,
      onComplete: () => {
        this.el.classList.toggle("open"), this.content.forEach(
          (t) => t.removeAttribute("data-toggle-visible")
        ), this.content.forEach(
          (t) => t.setAttribute("data-toggle-hidden", "")
        );
      }
    }), D.to(this.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
  }
  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open ? this.open = !1 : this.open = !0;
  }
}
class rv {
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
const nv = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const r = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, r.removeChild(e));
  }, e.onload = e.onreadystatechange, r.appendChild(e);
};
export {
  M0 as Application,
  Fh as Breakpoints,
  xo as CSSPlugin,
  L0 as Cookies,
  D0 as CoverOverlay,
  R0 as Dataloader,
  ot as Dom,
  os as Draggable,
  N0 as Dropdown,
  z0 as EqualHeightElements,
  F0 as EqualHeightImages,
  I0 as Events,
  $0 as FixedHeader,
  H0 as FooterReveal,
  V_ as Hammer,
  Y0 as HeroSlider,
  W0 as HeroVideo,
  Oa as InertiaPlugin,
  q0 as Lazyload,
  U0 as Lightbox,
  X0 as Links,
  V0 as Looper,
  G0 as Marquee,
  K0 as MobileMenu,
  j0 as Moonwalk,
  B0 as Parallax,
  Z0 as Popover,
  Q0 as Popup,
  J0 as ScrollSpy,
  bn as ScrollToPlugin,
  bt as ScrollTrigger,
  a_ as SplitText,
  tv as StackedBoxes,
  ev as StickyHeader,
  iv as Toggler,
  rv as Typography,
  Ht as _defaultsDeep,
  D as gsap,
  ko as imageIsLoaded,
  uc as imagesAreLoaded,
  nv as loadScript,
  wo as prefersReducedMotion,
  Nh as rafCallback
};
