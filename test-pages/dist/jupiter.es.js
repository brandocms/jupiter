function tr(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function Tu(o, t) {
  o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.__proto__ = t;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var pi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Ln = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Sl, Le, Kt, Vi = 1e8, He = 1 / Vi, Ma = Math.PI * 2, hf = Ma / 4, df = 0, Eu = Math.sqrt, ff = Math.cos, pf = Math.sin, Pe = function(t) {
  return typeof t == "string";
}, te = function(t) {
  return typeof t == "function";
}, cr = function(t) {
  return typeof t == "number";
}, Tl = function(t) {
  return typeof t > "u";
}, Gi = function(t) {
  return typeof t == "object";
}, ei = function(t) {
  return t !== !1;
}, El = function() {
  return typeof window < "u";
}, Ks = function(t) {
  return te(t) || Pe(t);
}, Cu = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ye = Array.isArray, Da = /(?:-?\.?\d|\.)+/gi, Pu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _n = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, aa = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Au = /[+-]=-?[.\d]+/, Ou = /[^,'"\[\]\s]+/gi, gf = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Qt, Fi, Ra, Cl, gi = {}, Eo = {}, ku, Iu = function(t) {
  return (Eo = Mn(t, gi)) && Bt;
}, Pl = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, Cs = function(t, e) {
  return !e && console.warn(t);
}, Lu = function(t, e) {
  return t && (gi[t] = e) && Eo && (Eo[t] = e) || gi;
}, Ps = function() {
  return 0;
}, mf = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, fo = {
  suppressEvents: !0,
  kill: !1
}, _f = {
  suppressEvents: !0
}, Al = {}, br = [], za = {}, Mu, li = {}, la = {}, fc = 30, po = [], Ol = "", kl = function(t) {
  var e = t[0], i, r;
  if (Gi(e) || te(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = po.length; r-- && !po[r].targetTest(e); )
      ;
    i = po[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new rh(t[r], i))) || t.splice(r, 1);
  return t;
}, Hr = function(t) {
  return t._gsap || kl(Ei(t))[0]._gsap;
}, Du = function(t, e, i) {
  return (i = t[e]) && te(i) ? t[e]() : Tl(i) && t.getAttribute && t.getAttribute(e) || i;
}, ii = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, se = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, pe = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, bn = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, yf = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Co = function() {
  var t = br.length, e = br.slice(0), i, r;
  for (za = {}, br.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Il = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, Ru = function(t, e, i, r) {
  br.length && !Le && Co(), t.render(e, i, !!(Le && e < 0 && Il(t))), br.length && !Le && Co();
}, zu = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Ou).length < 2 ? e : Pe(t) ? t.trim() : t;
}, Nu = function(t) {
  return t;
}, mi = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, vf = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Mn = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, pc = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = Gi(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Po = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, ls = function(t) {
  var e = t.parent || Qt, i = t.keyframes ? vf(Ye(t.keyframes)) : mi;
  if (ei(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, wf = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, $u = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Uo = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Cr = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Yr = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, bf = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Na = function(t, e, i, r) {
  return t._startAt && (Le ? t._startAt.revert(fo) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, xf = function o(t) {
  return !t || t._ts && o(t.parent);
}, gc = function(t) {
  return t._repeat ? Dn(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Dn = function(t, e) {
  var i = Math.floor(t = pe(t / e));
  return t && i === t ? i - 1 : i;
}, Ao = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Wo = function(t) {
  return t._end = pe(t._start + (t._tDur / Math.abs(t._ts || t._rts || He) || 0));
}, Vo = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = pe(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Wo(t), i._dirty || Yr(i, t)), t;
}, Fu = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Ao(t.rawTime(), e), (!e._dur || Ys(0, e.totalDuration(), i) - e._tTime > He) && e.render(i, !0)), Yr(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Yi = function(t, e, i, r) {
  return e.parent && Cr(e), e._start = pe((cr(i) ? i : i || t !== Qt ? xi(t, i, e) : t._time) + e._delay), e._end = pe(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), $u(t, e, "_first", "_last", t._sort ? "_start" : 0), $a(e) || (t._recent = e), r || Fu(t, e), t._ts < 0 && Vo(t, t._tTime), t;
}, Bu = function(t, e) {
  return (gi.ScrollTrigger || Pl("scrollTrigger", e)) && gi.ScrollTrigger.create(e, t);
}, Hu = function(t, e, i, r, n) {
  if (Ml(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !Le && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Mu !== ui.frame)
    return br.push(t), t._lazy = [n, r], 1;
}, Sf = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, $a = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Tf = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && Sf(t) && !(!t._initted && $a(t)) || (t._ts < 0 || t._dp._ts < 0) && !$a(t)) ? 0 : 1, a = t._rDelay, c = 0, u, h, d;
  if (a && t._repeat && (c = Ys(0, t._tDur, e), h = Dn(c, a), t._yoyo && h & 1 && (s = 1 - s), h !== Dn(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Le || r || t._zTime === He || !e && t._zTime) {
    if (!t._initted && Hu(t, e, r, i, c))
      return;
    for (d = t._zTime, t._zTime = e || (i ? He : 0), i || (i = e && !d), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = c, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    e < 0 && Na(t, e, i, !0), t._onUpdate && !i && fi(t, "onUpdate"), c && t._repeat && !i && t.parent && fi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Cr(t, 1), !i && !Le && (fi(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Ef = function(t, e, i) {
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
}, Rn = function(t, e, i, r) {
  var n = t._repeat, s = pe(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : pe(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && Vo(t, t._tTime = t._tDur * a), t.parent && Wo(t), i || Yr(t.parent, t), t;
}, mc = function(t) {
  return t instanceof Qe ? Yr(t) : Rn(t, t._dur);
}, Cf = {
  _start: 0,
  endTime: Ps,
  totalDuration: Ps
}, xi = function o(t, e, i) {
  var r = t.labels, n = t._recent || Cf, s = t.duration() >= Vi ? n.endTime(!1) : t._dur, a, c, u;
  return Pe(e) && (isNaN(e) || e in r) ? (c = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), c === "<" || c === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (c === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (c = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && i && (c = c / 100 * (Ye(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + c : s + c)) : e == null ? s : +e;
}, cs = function(t, e, i) {
  var r = cr(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, c;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, c = i; c && !("immediateRender" in a); )
      a = c.vars.defaults || {}, c = ei(c.vars.inherit) && c.parent;
    s.immediateRender = ei(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new fe(e[0], s, e[n + 1]);
}, kr = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Ys = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, $e = function(t, e) {
  return !Pe(t) || !(e = gf.exec(t)) ? "" : e[1];
}, Pf = function(t, e, i) {
  return kr(i, function(r) {
    return Ys(t, e, r);
  });
}, Fa = [].slice, Yu = function(t, e) {
  return t && Gi(t) && "length" in t && (!e && !t.length || t.length - 1 in t && Gi(t[0])) && !t.nodeType && t !== Fi;
}, Af = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Pe(r) && !e || Yu(r, 1) ? (n = i).push.apply(n, Ei(r)) : i.push(r);
  }) || i;
}, Ei = function(t, e, i) {
  return Kt && !e && Kt.selector ? Kt.selector(t) : Pe(t) && !i && (Ra || !zn()) ? Fa.call((e || Cl).querySelectorAll(t), 0) : Ye(t) ? Af(t, i) : Yu(t) ? Fa.call(t, 0) : t ? [t] : [];
}, Ba = function(t) {
  return t = Ei(t)[0] || Cs("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Ei(e, i.querySelectorAll ? i : i === t ? Cs("Invalid scope") || Cl.createElement("div") : t);
  };
}, qu = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Uu = function(t) {
  if (te(t))
    return t;
  var e = Gi(t) ? t : {
    each: t
  }, i = qr(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, c = isNaN(r) || a, u = e.axis, h = r, d = r;
  return Pe(r) ? h = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && c && (h = r[0], d = r[1]), function(f, l, g) {
    var p = (g || e).length, _ = s[p], S, E, k, T, x, M, P, O, D;
    if (!_) {
      if (D = e.grid === "auto" ? 0 : (e.grid || [1, Vi])[1], !D) {
        for (P = -1e8; P < (P = g[D++].getBoundingClientRect().left) && D < p; )
          ;
        D < p && D--;
      }
      for (_ = s[p] = [], S = c ? Math.min(D, p) * h - 0.5 : r % D, E = D === Vi ? 0 : c ? p * d / D - 0.5 : r / D | 0, P = 0, O = Vi, M = 0; M < p; M++)
        k = M % D - S, T = E - (M / D | 0), _[M] = x = u ? Math.abs(u === "y" ? T : k) : Eu(k * k + T * T), x > P && (P = x), x < O && (O = x);
      r === "random" && qu(_), _.max = P - O, _.min = O, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (D > p ? p - 1 : u ? u === "y" ? p / D : D : Math.max(D, p / D)) || 0) * (r === "edges" ? -1 : 1), _.b = p < 0 ? n - p : n, _.u = $e(e.amount || e.each) || 0, i = i && p < 0 ? th(i) : i;
    }
    return p = (_[f] - _.min) / _.max || 0, pe(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, Ha = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = pe(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (cr(i) ? 0 : $e(i));
  };
}, Wu = function(t, e) {
  var i = Ye(t), r, n;
  return !i && Gi(t) && (r = i = t.radius || Vi, t.values ? (t = Ei(t.values), (n = !cr(t[0])) && (r *= r)) : t = Ha(t.increment)), kr(e, i ? te(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), c = parseFloat(n ? s.y : 0), u = Vi, h = 0, d = t.length, f, l; d--; )
      n ? (f = t[d].x - a, l = t[d].y - c, f = f * f + l * l) : f = Math.abs(t[d] - a), f < u && (u = f, h = d);
    return h = !r || u <= r ? t[h] : s, n || h === s || cr(s) ? h : h + $e(s);
  } : Ha(t));
}, Vu = function(t, e, i, r) {
  return kr(Ye(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return Ye(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, Of = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, kf = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || $e(i));
  };
}, If = function(t, e, i) {
  return Gu(t, e, 0, 1, i);
}, Xu = function(t, e, i) {
  return kr(i, function(r) {
    return t[~~e(r)];
  });
}, Lf = function o(t, e, i) {
  var r = e - t;
  return Ye(t) ? Xu(t, o(0, t.length), e) : kr(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Mf = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return Ye(t) ? Xu(t, o(0, t.length - 1), e) : kr(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, As = function(t) {
  for (var e = 0, i = "", r, n, s, a; ~(r = t.indexOf("random(", e)); )
    s = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(a ? Ou : Da), i += t.substr(e, r - e) + Vu(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = s + 1;
  return i + t.substr(e, t.length - e);
}, Gu = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return kr(n, function(c) {
    return i + ((c - t) / s * a || 0);
  });
}, Df = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(l) {
    return (1 - l) * t + l * e;
  };
  if (!n) {
    var s = Pe(t), a = {}, c, u, h, d, f;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ye(t) && !Ye(e)) {
      for (h = [], d = t.length, f = d - 2, u = 1; u < d; u++)
        h.push(o(t[u - 1], t[u]));
      d--, n = function(g) {
        g *= d;
        var p = Math.min(f, ~~g);
        return h[p](g - p);
      }, i = e;
    } else r || (t = Mn(Ye(t) ? [] : {}, t));
    if (!h) {
      for (c in e)
        Ll.call(a, t, c, "get", e[c]);
      n = function(g) {
        return zl(g, a) || (s ? t.p : t);
      };
    }
  }
  return kr(i, n);
}, _c = function(t, e, i) {
  var r = t.labels, n = Vi, s, a, c;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (c = s, n = a);
  return c;
}, fi = function(t, e, i) {
  var r = t.vars, n = r[e], s = Kt, a = t._ctx, c, u, h;
  if (n)
    return c = r[e + "Params"], u = r.callbackScope || t, i && br.length && Co(), a && (Kt = a), h = c ? n.apply(u, c) : n.call(u), Kt = s, h;
}, Kn = function(t) {
  return Cr(t), t.scrollTrigger && t.scrollTrigger.kill(!!Le), t.progress() < 1 && fi(t, "onInterrupt"), t;
}, yn, Ku = [], ju = function(t) {
  if (t)
    if (t = !t.name && t.default || t, El() || t.headless) {
      var e = t.name, i = te(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: Ps,
        render: zl,
        add: Ll,
        kill: jf,
        modifier: Kf,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Rl,
        aliases: {},
        register: 0
      };
      if (zn(), t !== r) {
        if (li[e])
          return;
        mi(r, mi(Po(t, n), s)), Mn(r.prototype, Mn(n, Po(t, s))), li[r.prop = e] = r, t.targetTest && (po.push(r), Al[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Lu(e, r), t.register && t.register(Bt, r, ri);
    } else
      Ku.push(t);
}, Nt = 255, jn = {
  aqua: [0, Nt, Nt],
  lime: [0, Nt, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Nt],
  navy: [0, 0, 128],
  white: [Nt, Nt, Nt],
  olive: [128, 128, 0],
  yellow: [Nt, Nt, 0],
  orange: [Nt, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Nt, 0, 0],
  pink: [Nt, 192, 203],
  cyan: [0, Nt, Nt],
  transparent: [Nt, Nt, Nt, 0]
}, ca = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Nt + 0.5 | 0;
}, Qu = function(t, e, i) {
  var r = t ? cr(t) ? [t >> 16, t >> 8 & Nt, t & Nt] : 0 : jn.black, n, s, a, c, u, h, d, f, l, g;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), jn[t])
      r = jn[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & Nt, r & Nt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & Nt, t & Nt];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = g = t.match(Da), !e)
        c = +r[0] % 360 / 360, u = +r[1] / 100, h = +r[2] / 100, s = h <= 0.5 ? h * (u + 1) : h + u - h * u, n = h * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = ca(c + 1 / 3, n, s), r[1] = ca(c, n, s), r[2] = ca(c - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Pu), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Da) || jn.transparent;
    r = r.map(Number);
  }
  return e && !g && (n = r[0] / Nt, s = r[1] / Nt, a = r[2] / Nt, d = Math.max(n, s, a), f = Math.min(n, s, a), h = (d + f) / 2, d === f ? c = u = 0 : (l = d - f, u = h > 0.5 ? l / (2 - d - f) : l / (d + f), c = d === n ? (s - a) / l + (s < a ? 6 : 0) : d === s ? (a - n) / l + 2 : (n - s) / l + 4, c *= 60), r[0] = ~~(c + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(h * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Zu = function(t) {
  var e = [], i = [], r = -1;
  return t.split(xr).forEach(function(n) {
    var s = n.match(_n) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, yc = function(t, e, i) {
  var r = "", n = (t + r).match(xr), s = e ? "hsla(" : "rgba(", a = 0, c, u, h, d;
  if (!n)
    return t;
  if (n = n.map(function(f) {
    return (f = Qu(f, e, 1)) && s + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), i && (h = Zu(t), c = i.c, c.join(r) !== h.c.join(r)))
    for (u = t.replace(xr, "1").split(_n), d = u.length - 1; a < d; a++)
      r += u[a] + (~c.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
  if (!u)
    for (u = t.split(xr), d = u.length - 1; a < d; a++)
      r += u[a] + n[a];
  return r + u[d];
}, xr = function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in jn)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
}(), Rf = /hsl[a]?\(/, Ju = function(t) {
  var e = t.join(" "), i;
  if (xr.lastIndex = 0, xr.test(e))
    return i = Rf.test(e), t[1] = yc(t[1], i), t[0] = yc(t[0], i, Zu(t[1])), !0;
}, Os, ui = function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], c, u, h, d, f, l, g = function p(_) {
    var S = o() - r, E = _ === !0, k, T, x, M;
    if ((S > t || S < 0) && (i += S - e), r += S, x = r - i, k = x - s, (k > 0 || E) && (M = ++d.frame, f = x - d.time * 1e3, d.time = x = x / 1e3, s += k + (k >= n ? 4 : n - k), T = 1), E || (c = u(p)), T)
      for (l = 0; l < a.length; l++)
        a[l](x, f, M, _);
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
      ku && (!Ra && El() && (Fi = Ra = window, Cl = Fi.document || {}, gi.gsap = Bt, (Fi.gsapVersions || (Fi.gsapVersions = [])).push(Bt.version), Iu(Eo || Fi.GreenSockGlobals || !Fi.gsap && Fi || {}), Ku.forEach(ju)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && d.sleep(), u = h || function(_) {
        return setTimeout(_, s - d.time * 1e3 + 1 | 0);
      }, Os = 1, g(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(c), Os = 0, u = Ps;
    },
    lagSmoothing: function(_, S) {
      t = _ || 1 / 0, e = Math.min(S || 33, t);
    },
    fps: function(_) {
      n = 1e3 / (_ || 240), s = d.time * 1e3 + n;
    },
    add: function(_, S, E) {
      var k = S ? function(T, x, M, P) {
        _(T, x, M, P), d.remove(k);
      } : _;
      return d.remove(_), a[E ? "unshift" : "push"](k), zn(), k;
    },
    remove: function(_, S) {
      ~(S = a.indexOf(_)) && a.splice(S, 1) && l >= S && l--;
    },
    _listeners: a
  }, d;
}(), zn = function() {
  return !Os && ui.wake();
}, Tt = {}, zf = /^[\d.\-M][\d.\-,\s]/, Nf = /["']/g, $f = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, c, u; n < s; n++)
    c = i[n], a = n !== s - 1 ? c.lastIndexOf(",") : c.length, u = c.substr(0, a), e[r] = isNaN(u) ? u.replace(Nf, "").trim() : +u, r = c.substr(a + 1).trim();
  return e;
}, Ff = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, Bf = function(t) {
  var e = (t + "").split("("), i = Tt[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [$f(e[1])] : Ff(t).split(",").map(zu)) : Tt._CE && zf.test(t) ? Tt._CE("", t) : i;
}, th = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, eh = function o(t, e) {
  for (var i = t._first, r; i; )
    i instanceof Qe ? o(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? o(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, qr = function(t, e) {
  return t && (te(t) ? t : Tt[t] || Bf(t)) || e;
}, en = function(t, e, i, r) {
  i === void 0 && (i = function(c) {
    return 1 - e(1 - c);
  }), r === void 0 && (r = function(c) {
    return c < 0.5 ? e(c * 2) / 2 : 1 - e((1 - c) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return ii(t, function(a) {
    Tt[a] = gi[a] = n, Tt[s = a.toLowerCase()] = i;
    for (var c in n)
      Tt[s + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = Tt[a + "." + c] = n[c];
  }), n;
}, ih = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ua = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ma * (Math.asin(1 / r) || 0), a = function(h) {
    return h === 1 ? 1 : r * Math.pow(2, -10 * h) * pf((h - s) * n) + 1;
  }, c = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : ih(a);
  return n = Ma / n, c.config = function(u, h) {
    return o(t, u, h);
  }, c;
}, ha = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : ih(i);
  return r.config = function(n) {
    return o(t, n);
  }, r;
};
ii("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, t) {
  var e = t < 5 ? t + 1 : t;
  en(o + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
Tt.Linear.easeNone = Tt.none = Tt.Linear.easeIn;
en("Elastic", ua("in"), ua("out"), ua());
(function(o, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? o * a * a : a < i ? o * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? o * (a -= 2.25 / t) * a + 0.9375 : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  en("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
en("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
en("Circ", function(o) {
  return -(Eu(1 - o * o) - 1);
});
en("Sine", function(o) {
  return o === 1 ? 1 : -ff(o * hf) + 1;
});
en("Back", ha("in"), ha("out"), ha());
Tt.SteppedEase = Tt.steps = gi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - He;
    return function(a) {
      return ((r * Ys(0, s, a) | 0) + n) * i;
    };
  }
};
Ln.ease = Tt["quad.out"];
ii("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return Ol += o + "," + o + "Params,";
});
var rh = function(t, e) {
  this.id = df++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Du, this.set = e ? e.getSetter : Rl;
}, ks = /* @__PURE__ */ function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Rn(this, +e.duration, 1, 1), this.data = e.data, Kt && (this._ctx = Kt, Kt.data.push(this)), Os || ui.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Rn(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (zn(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Vo(this, i), !n._dp || n.parent || Fu(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Yi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === He || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Ru(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + gc(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + gc(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Dn(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Ao(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(Ys(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Wo(this), bf(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (zn(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== He && (this._tTime -= He)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && Yi(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ei(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ao(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = _f);
    var r = Le;
    return Le = i, Il(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Le = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, mc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, mc(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(xi(this, i), ei(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, ei(r)), this._dur || (this._zTime = -1e-8), this;
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
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - He);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var s = te(i) ? i : Nu, a = function() {
        var u = r.then;
        r.then = null, te(s) && (s = s(r)) && (s.then || s === r) && (r.then = u), n(s), r.then = u;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    Kn(this);
  }, o;
}();
mi(ks.prototype, {
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
var Qe = /* @__PURE__ */ function(o) {
  Tu(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = ei(i.sortChildren), Qt && Yi(i.parent || Qt, tr(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Bu(tr(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return cs(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return cs(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return cs(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, ls(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new fe(r, n, xi(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return Yi(this, fe.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, c, u, h) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = u, s.onCompleteParams = h, s.parent = this, new fe(r, s, xi(this, c)), this;
  }, e.staggerFrom = function(r, n, s, a, c, u, h) {
    return s.runBackwards = 1, ls(s).immediateRender = ei(s.immediateRender), this.staggerTo(r, n, s, a, c, u, h);
  }, e.staggerFromTo = function(r, n, s, a, c, u, h, d) {
    return a.startAt = s, ls(a).immediateRender = ei(a.immediateRender), this.staggerTo(r, n, a, c, u, h, d);
  }, e.render = function(r, n, s) {
    var a = this._time, c = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, h = r <= 0 ? 0 : pe(r), d = this._zTime < 0 != r < 0 && (this._initted || !u), f, l, g, p, _, S, E, k, T, x, M, P;
    if (this !== Qt && h > c && r >= 0 && (h = c), h !== this._tTime || s || d) {
      if (a !== this._time && u && (h += this._time - a, r += this._time - a), f = h, T = this._start, k = this._ts, S = !k, d && (u || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (M = this._yoyo, _ = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(_ * 100 + r, n, s);
        if (f = pe(h % _), h === c ? (p = this._repeat, f = u) : (x = pe(h / _), p = ~~x, p && p === x && (f = u, p--), f > u && (f = u)), x = Dn(this._tTime, _), !a && this._tTime && x !== p && this._tTime - x * _ - this._dur <= 0 && (x = p), M && p & 1 && (f = u - f, P = 1), p !== x && !this._lock) {
          var O = M && x & 1, D = O === (M && p & 1);
          if (p < x && (O = !O), a = O ? 0 : h % u ? u : h, this._lock = 1, this.render(a || (P ? 0 : pe(p * _)), n, !u)._lock = 0, this._tTime = h, !n && this.parent && fi(this, "onRepeat"), this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1), a && a !== this._time || S !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, c = this._tDur, D && (this._lock = 2, a = O ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !P && this.invalidate()), this._lock = 0, !this._ts && !S)
            return this;
          eh(this, P);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (E = Ef(this, pe(a), pe(f)), E && (h -= f - (f = E._start))), this._tTime = h, this._time = f, this._act = !k, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && !n && !x && (fi(this, "onStart"), this._tTime !== h))
        return this;
      if (f >= a && r >= 0)
        for (l = this._first; l; ) {
          if (g = l._next, (l._act || f >= l._start) && l._ts && E !== l) {
            if (l.parent !== this)
              return this.render(r, n, s);
            if (l.render(l._ts > 0 ? (f - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (f - l._start) * l._ts, n, s), f !== this._time || !this._ts && !S) {
              E = 0, g && (h += this._zTime = -1e-8);
              break;
            }
          }
          l = g;
        }
      else {
        l = this._last;
        for (var N = r < 0 ? r : f; l; ) {
          if (g = l._prev, (l._act || N <= l._end) && l._ts && E !== l) {
            if (l.parent !== this)
              return this.render(r, n, s);
            if (l.render(l._ts > 0 ? (N - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (N - l._start) * l._ts, n, s || Le && Il(l)), f !== this._time || !this._ts && !S) {
              E = 0, g && (h += this._zTime = N ? -1e-8 : He);
              break;
            }
          }
          l = g;
        }
      }
      if (E && !n && (this.pause(), E.render(f >= a ? 0 : -1e-8)._zTime = f >= a ? 1 : -1, this._ts))
        return this._start = T, Wo(this), this.render(r, n, s);
      this._onUpdate && !n && fi(this, "onUpdate", !0), (h === c && this._tTime >= this.totalDuration() || !h && a) && (T === this._start || Math.abs(k) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (h === c && this._ts > 0 || !h && this._ts < 0) && Cr(this, 1), !n && !(r < 0 && !a) && (h || a || !c) && (fi(this, h === c && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (cr(n) || (n = xi(this, n, r)), !(r instanceof ks)) {
      if (Ye(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (Pe(r))
        return this.addLabel(r, n);
      if (te(r))
        r = fe.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? Yi(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -1e8);
    for (var c = [], u = this._first; u; )
      u._start >= a && (u instanceof fe ? n && c.push(u) : (s && c.push(u), r && c.push.apply(c, u.getChildren(!0, n, s)))), u = u._next;
    return c;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return Pe(r) ? this.removeLabel(r) : te(r) ? this.killTweensOf(r) : (r.parent === this && Uo(this, r), r === this._recent && (this._recent = this._last), Yr(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = pe(ui.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = xi(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = fe.delayedCall(0, n || Ps, s);
    return a.data = "isPause", this._hasPause = 1, Yi(this, a, xi(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = xi(this, r); n; )
      n._start === r && n.data === "isPause" && Cr(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), c = a.length; c--; )
      gr !== a[c] && a[c].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = Ei(r), c = this._first, u = cr(n), h; c; )
      c instanceof fe ? yf(c._targets, a) && (u ? (!gr || c._initted && c._ts) && c.globalTime(0) <= n && c.globalTime(c.totalDuration()) > n : !n || c.isActive()) && s.push(c) : (h = c.getTweensOf(a, n)).length && s.push.apply(s, h), c = c._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = xi(s, r), c = n, u = c.startAt, h = c.onStart, d = c.onStartParams, f = c.immediateRender, l, g = fe.to(s, mi({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || He,
      onStart: function() {
        if (s.pause(), !l) {
          var _ = n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          g._dur !== _ && Rn(g, _, 0, 1).render(g._time, !0, !0), l = 1;
        }
        h && h.apply(g, d || []);
      }
    }, n));
    return f ? g.render(0) : g;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, mi({
      startAt: {
        time: xi(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), _c(this, xi(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), _c(this, xi(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + He);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, c = this.labels, u; a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (u in c)
        c[u] >= s && (c[u] += r);
    return Yr(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Yr(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, c = Vi, u, h, d;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (d = s.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), h = a._start, h > c && s._sort && a._ts && !s._lock ? (s._lock = 1, Yi(s, a, h - a._delay, 1)._lock = 0) : c = h, h < 0 && a._ts && (n -= h, (!d && !s._dp || d && d.smoothChildTiming) && (s._start += h / s._ts, s._time -= h, s._tTime -= h), s.shiftChildren(-h, !1, -1 / 0), c = 0), a._end > n && a._ts && (n = a._end), a = u;
      Rn(s, s === Qt && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (Qt._ts && (Ru(Qt, Ao(r, Qt)), Mu = ui.frame), ui.frame >= fc) {
      fc += pi.autoSleep || 120;
      var n = Qt._first;
      if ((!n || !n._ts) && pi.autoSleep && ui._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || ui.sleep();
      }
    }
  }, t;
}(ks);
mi(Qe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Hf = function(t, e, i, r, n, s, a) {
  var c = new ri(this._pt, t, e, 0, 1, ch, null, n), u = 0, h = 0, d, f, l, g, p, _, S, E;
  for (c.b = i, c.e = r, i += "", r += "", (S = ~r.indexOf("random(")) && (r = As(r)), s && (E = [i, r], s(E, t, e), i = E[0], r = E[1]), f = i.match(aa) || []; d = aa.exec(r); )
    g = d[0], p = r.substring(u, d.index), l ? l = (l + 1) % 5 : p.substr(-5) === "rgba(" && (l = 1), g !== f[h++] && (_ = parseFloat(f[h - 1]) || 0, c._pt = {
      _next: c._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: g.charAt(1) === "=" ? bn(_, g) - _ : parseFloat(g) - _,
      m: l && l < 4 ? Math.round : 0
    }, u = aa.lastIndex);
  return c.c = u < r.length ? r.substring(u, r.length) : "", c.fp = a, (Au.test(r) || S) && (c.e = 0), this._pt = c, c;
}, Ll = function(t, e, i, r, n, s, a, c, u, h) {
  te(r) && (r = r(n || 0, t, s));
  var d = t[e], f = i !== "get" ? i : te(d) ? u ? t[e.indexOf("set") || !te(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : d, l = te(d) ? u ? Vf : ah : Dl, g;
  if (Pe(r) && (~r.indexOf("random(") && (r = As(r)), r.charAt(1) === "=" && (g = bn(f, r) + ($e(f) || 0), (g || g === 0) && (r = g))), !h || f !== r || Ya)
    return !isNaN(f * r) && r !== "" ? (g = new ri(this._pt, t, e, +f || 0, r - (f || 0), typeof d == "boolean" ? Gf : lh, 0, l), u && (g.fp = u), a && g.modifier(a, this, t), this._pt = g) : (!d && !(e in t) && Pl(e, r), Hf.call(this, t, e, f, r, l, c || pi.stringFilter, u));
}, Yf = function(t, e, i, r, n) {
  if (te(t) && (t = us(t, n, e, i, r)), !Gi(t) || t.style && t.nodeType || Ye(t) || Cu(t))
    return Pe(t) ? us(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = us(t[a], n, e, i, r);
  return s;
}, nh = function(t, e, i, r, n, s) {
  var a, c, u, h;
  if (li[t] && (a = new li[t]()).init(n, a.rawVars ? e[t] : Yf(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = c = new ri(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== yn))
    for (u = i._ptLookup[i._targets.indexOf(n)], h = a._props.length; h--; )
      u[a._props[h]] = c;
  return a;
}, gr, Ya, Ml = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, c = r.lazy, u = r.onUpdate, h = r.runBackwards, d = r.yoyoEase, f = r.keyframes, l = r.autoRevert, g = t._dur, p = t._startAt, _ = t._targets, S = t.parent, E = S && S.data === "nested" ? S.vars.targets : _, k = t._overwrite === "auto" && !Sl, T = t.timeline, x, M, P, O, D, N, q, $, H, Z, et, V, U;
  if (T && (!f || !n) && (n = "none"), t._ease = qr(n, Ln.ease), t._yEase = d ? th(qr(d === !0 ? n : d, Ln.ease)) : 0, d && t._yoyo && !t._repeat && (d = t._yEase, t._yEase = t._ease, t._ease = d), t._from = !T && !!r.runBackwards, !T || f && !r.stagger) {
    if ($ = _[0] ? Hr(_[0]).harness : 0, V = $ && r[$.prop], x = Po(r, Al), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !l ? p.render(-1, !0) : p.revert(h && g ? fo : mf), p._lazy = 0), s) {
      if (Cr(t._startAt = fe.set(_, mi({
        data: "isStart",
        overwrite: !1,
        parent: S,
        immediateRender: !0,
        lazy: !p && ei(c),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return fi(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Le || !a && !l) && t._startAt.revert(fo), a && g && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && g && !p) {
      if (e && (a = !1), P = mi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ei(c),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: S
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, x), V && (P[$.prop] = V), Cr(t._startAt = fe.set(_, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Le ? t._startAt.revert(fo) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, He, He);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, c = g && ei(c) || c && !g, M = 0; M < _.length; M++) {
      if (D = _[M], q = D._gsap || kl(_)[M]._gsap, t._ptLookup[M] = Z = {}, za[q.id] && br.length && Co(), et = E === _ ? M : E.indexOf(D), $ && (H = new $()).init(D, V || x, t, et, E) !== !1 && (t._pt = O = new ri(t._pt, D, H.name, 0, 1, H.render, H, 0, H.priority), H._props.forEach(function(nt) {
        Z[nt] = O;
      }), H.priority && (N = 1)), !$ || V)
        for (P in x)
          li[P] && (H = nh(P, x, t, et, D, E)) ? H.priority && (N = 1) : Z[P] = O = Ll.call(t, D, P, "get", x[P], et, E, 0, r.stringFilter);
      t._op && t._op[M] && t.kill(D, t._op[M]), k && t._pt && (gr = t, Qt.killTweensOf(D, Z, t.globalTime(e)), U = !t.parent, gr = 0), t._pt && c && (za[q.id] = 1);
    }
    N && uh(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !U, f && e <= 0 && T.render(Vi, !0, !0);
}, qf = function(t, e, i, r, n, s, a, c) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, d, f, l;
  if (!u)
    for (u = t._ptCache[e] = [], f = t._ptLookup, l = t._targets.length; l--; ) {
      if (h = f[l][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Ya = 1, t.vars[e] = "+=0", Ml(t, a), Ya = 0, c ? Cs(e + " not eligible for reset") : 1;
      u.push(h);
    }
  for (l = u.length; l--; )
    d = u[l], h = d._pt || d, h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + s * h.c, h.c = i - h.s, d.e && (d.e = se(i) + $e(d.e)), d.b && (d.b = h.s + $e(d.b));
}, Uf = function(t, e) {
  var i = t[0] ? Hr(t[0]).harness : 0, r = i && i.aliases, n, s, a, c;
  if (!r)
    return e;
  n = Mn({}, e);
  for (s in r)
    if (s in n)
      for (c = r[s].split(","), a = c.length; a--; )
        n[c[a]] = n[s];
  return n;
}, Wf = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if (Ye(e))
    a = i[t] || (i[t] = []), e.forEach(function(c, u) {
      return a.push({
        t: u / (e.length - 1) * 100,
        v: c,
        e: n
      });
    });
  else
    for (s in e)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, us = function(t, e, i, r, n) {
  return te(t) ? t.call(e, i, r, n) : Pe(t) && ~t.indexOf("random(") ? As(t) : t;
}, sh = Ol + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", oh = {};
ii(sh + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return oh[o] = 1;
});
var fe = /* @__PURE__ */ function(o) {
  Tu(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : ls(r)) || this;
    var c = a.vars, u = c.duration, h = c.delay, d = c.immediateRender, f = c.stagger, l = c.overwrite, g = c.keyframes, p = c.defaults, _ = c.scrollTrigger, S = c.yoyoEase, E = r.parent || Qt, k = (Ye(i) || Cu(i) ? cr(i[0]) : "length" in r) ? [i] : Ei(i), T, x, M, P, O, D, N, q;
    if (a._targets = k.length ? kl(k) : Cs("GSAP target " + i + " not found. https://gsap.com", !pi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = l, g || f || Ks(u) || Ks(h)) {
      if (r = a.vars, T = a.timeline = new Qe({
        data: "nested",
        defaults: p || {},
        targets: E && E.data === "nested" ? E.vars.targets : k
      }), T.kill(), T.parent = T._dp = tr(a), T._start = 0, f || Ks(u) || Ks(h)) {
        if (P = k.length, N = f && Uu(f), Gi(f))
          for (O in f)
            ~sh.indexOf(O) && (q || (q = {}), q[O] = f[O]);
        for (x = 0; x < P; x++)
          M = Po(r, oh), M.stagger = 0, S && (M.yoyoEase = S), q && Mn(M, q), D = k[x], M.duration = +us(u, tr(a), x, D, k), M.delay = (+us(h, tr(a), x, D, k) || 0) - a._delay, !f && P === 1 && M.delay && (a._delay = h = M.delay, a._start += h, M.delay = 0), T.to(D, M, N ? N(x, D, k) : 0), T._ease = Tt.none;
        T.duration() ? u = h = 0 : a.timeline = 0;
      } else if (g) {
        ls(mi(T.vars.defaults, {
          ease: "none"
        })), T._ease = qr(g.ease || r.ease || "none");
        var $ = 0, H, Z, et;
        if (Ye(g))
          g.forEach(function(V) {
            return T.to(k, V, ">");
          }), T.duration();
        else {
          M = {};
          for (O in g)
            O === "ease" || O === "easeEach" || Wf(O, g[O], M, g.easeEach);
          for (O in M)
            for (H = M[O].sort(function(V, U) {
              return V.t - U.t;
            }), $ = 0, x = 0; x < H.length; x++)
              Z = H[x], et = {
                ease: Z.e,
                duration: (Z.t - (x ? H[x - 1].t : 0)) / 100 * u
              }, et[O] = Z.v, T.to(k, et, $), $ += et.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || a.duration(u = T.duration());
    } else
      a.timeline = 0;
    return l === !0 && !Sl && (gr = tr(a), Qt.killTweensOf(k), gr = 0), Yi(E, tr(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (d || !u && !g && a._start === pe(E._time) && ei(d) && xf(tr(a)) && E.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), _ && Bu(tr(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, c = this._tDur, u = this._dur, h = r < 0, d = r > c - He && !h ? c : r < He ? 0 : r, f, l, g, p, _, S, E, k, T;
    if (!u)
      Tf(this, r, n, s);
    else if (d !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (f = d, k = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + r, n, s);
        if (f = pe(d % p), d === c ? (g = this._repeat, f = u) : (_ = pe(d / p), g = ~~_, g && g === _ ? (f = u, g--) : f > u && (f = u)), S = this._yoyo && g & 1, S && (T = this._yEase, f = u - f), _ = Dn(this._tTime, p), f === a && !s && this._initted && g === _)
          return this._tTime = d, this;
        g !== _ && (k && this._yEase && eh(k, S), this.vars.repeatRefresh && !S && !this._lock && f !== p && this._initted && (this._lock = s = 1, this.render(pe(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Hu(this, h ? r : f, s, n, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && g !== _))
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = d, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = E = (T || this._ease)(f / u), this._from && (this.ratio = E = 1 - E), !a && d && !n && !_ && (fi(this, "onStart"), this._tTime !== d))
        return this;
      for (l = this._pt; l; )
        l.r(E, l.d), l = l._next;
      k && k.render(r < 0 ? r : k._dur * k._ease(f / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (h && Na(this, r, n, s), fi(this, "onUpdate")), this._repeat && g !== _ && this.vars.onRepeat && !n && this.parent && fi(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (h && !this._onUpdate && Na(this, r, !0, !0), (r || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Cr(this, 1), !n && !(h && !a) && (d || a || S) && (fi(this, d === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, c) {
    Os || ui.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Ml(this, u), h = this._ease(u / this._dur), qf(this, r, n, s, a, h, u, c) ? this.resetTo(r, n, s, a, 1) : (Vo(this, 0), this.parent || $u(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Kn(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Le), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, gr && gr.vars.overwrite !== !0)._first || Kn(this), this.parent && s !== this.timeline.totalDuration() && Rn(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, c = r ? Ei(r) : a, u = this._ptLookup, h = this._pt, d, f, l, g, p, _, S;
    if ((!n || n === "all") && wf(a, c))
      return n === "all" && (this._pt = 0), Kn(this);
    for (d = this._op = this._op || [], n !== "all" && (Pe(n) && (p = {}, ii(n, function(E) {
      return p[E] = 1;
    }), n = p), n = Uf(a, n)), S = a.length; S--; )
      if (~c.indexOf(a[S])) {
        f = u[S], n === "all" ? (d[S] = n, g = f, l = {}) : (l = d[S] = d[S] || {}, g = n);
        for (p in g)
          _ = f && f[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Uo(this, _, "_pt"), delete f[p]), l !== "all" && (l[p] = 1);
      }
    return this._initted && !this._pt && h && Kn(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return cs(1, arguments);
  }, t.delayedCall = function(r, n, s, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, s) {
    return cs(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return Qt.killTweensOf(r, n, s);
  }, t;
}(ks);
mi(fe.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ii("staggerTo,staggerFrom,staggerFromTo", function(o) {
  fe[o] = function() {
    var t = new Qe(), e = Fa.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var Dl = function(t, e, i) {
  return t[e] = i;
}, ah = function(t, e, i) {
  return t[e](i);
}, Vf = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Xf = function(t, e, i) {
  return t.setAttribute(e, i);
}, Rl = function(t, e) {
  return te(t[e]) ? ah : Tl(t[e]) && t.setAttribute ? Xf : Dl;
}, lh = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Gf = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, ch = function(t, e) {
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
}, zl = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Kf = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, jf = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Uo(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Qf = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, uh = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, ri = /* @__PURE__ */ function() {
  function o(e, i, r, n, s, a, c, u, h) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || lh, this.d = c || this, this.set = u || Dl, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Qf, this.m = i, this.mt = n, this.tween = r;
  }, o;
}();
ii(Ol + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(o) {
  return Al[o] = 1;
});
gi.TweenMax = gi.TweenLite = fe;
gi.TimelineLite = gi.TimelineMax = Qe;
Qt = new Qe({
  sortChildren: !1,
  defaults: Ln,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
pi.stringFilter = Ju;
var Ur = [], go = {}, Zf = [], vc = 0, Jf = 0, da = function(t) {
  return (go[t] || Zf).map(function(e) {
    return e();
  });
}, qa = function() {
  var t = Date.now(), e = [];
  t - vc > 2 && (da("matchMediaInit"), Ur.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, c, u;
    for (a in r)
      s = Fi.matchMedia(r[a]).matches, s && (c = 1), s !== n[a] && (n[a] = s, u = 1);
    u && (i.revert(), c && e.push(i));
  }), da("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), vc = t, da("matchMedia"));
}, hh = /* @__PURE__ */ function() {
  function o(e, i) {
    this.selector = i && Ba(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Jf++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    te(i) && (n = r, r = i, i = te);
    var s = this, a = function() {
      var u = Kt, h = s.selector, d;
      return u && u !== s && u.data.push(s), n && (s.selector = Ba(n)), Kt = s, d = r.apply(s, arguments), te(d) && s._r.push(d), Kt = u, s.selector = h, s.isReverted = !1, d;
    };
    return s.last = a, i === te ? a(s, function(c) {
      return s.add(null, c);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = Kt;
    Kt = null, i(this), Kt = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof fe && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? function() {
      for (var a = n.getTweens(), c = n.data.length, u; c--; )
        u = n.data[c], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(h) {
          return a.splice(a.indexOf(h), 1);
        }));
      for (a.map(function(h) {
        return {
          g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
          t: h
        };
      }).sort(function(h, d) {
        return d.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), c = n.data.length; c--; )
        u = n.data[c], u instanceof Qe ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof fe) && u.revert && u.revert(i);
      n._r.forEach(function(h) {
        return h(i, n);
      }), n.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Ur.length; s--; )
        Ur[s].id === this.id && Ur.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
}(), tp = /* @__PURE__ */ function() {
  function o(e) {
    this.contexts = [], this.scope = e, Kt && Kt.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    Gi(i) || (i = {
      matches: i
    });
    var s = new hh(0, n || this.scope), a = s.conditions = {}, c, u, h;
    Kt && !s.selector && (s.selector = Kt.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (u in i)
      u === "all" ? h = 1 : (c = Fi.matchMedia(i[u]), c && (Ur.indexOf(s) < 0 && Ur.push(s), (a[u] = c.matches) && (h = 1), c.addListener ? c.addListener(qa) : c.addEventListener("change", qa)));
    return h && r(s, function(d) {
      return s.add(null, d);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
}(), Oo = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return ju(r);
    });
  },
  timeline: function(t) {
    return new Qe(t);
  },
  getTweensOf: function(t, e) {
    return Qt.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    Pe(t) && (t = Ei(t)[0]);
    var n = Hr(t || {}).get, s = i ? Nu : zu;
    return i === "native" && (i = ""), t && (e ? s((li[e] && li[e].get || n)(t, e, i, r)) : function(a, c, u) {
      return s((li[a] && li[a].get || n)(t, a, c, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Ei(t), t.length > 1) {
      var r = t.map(function(h) {
        return Bt.quickSetter(h, e, i);
      }), n = r.length;
      return function(h) {
        for (var d = n; d--; )
          r[d](h);
      };
    }
    t = t[0] || {};
    var s = li[e], a = Hr(t), c = a.harness && (a.harness.aliases || {})[e] || e, u = s ? function(h) {
      var d = new s();
      yn._pt = 0, d.init(t, i ? h + i : h, yn, 0, [t]), d.render(1, d), yn._pt && zl(1, yn);
    } : a.set(t, c);
    return s ? u : function(h) {
      return u(t, c, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = Bt.to(t, mi((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(c, u, h) {
      return n.resetTo(e, c, u, h);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return Qt.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = qr(t.ease, Ln.ease)), pc(Ln, t || {});
  },
  config: function(t) {
    return pc(pi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !li[a] && !gi[a] && Cs(e + " effect requires " + a + " plugin.");
    }), la[e] = function(a, c, u) {
      return i(Ei(a), mi(c || {}, n), u);
    }, s && (Qe.prototype[e] = function(a, c, u) {
      return this.add(la[e](a, Gi(c) ? c : (u = c) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    Tt[t] = qr(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? qr(t, e) : Tt;
  },
  getById: function(t) {
    return Qt.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new Qe(t), r, n;
    for (i.smoothChildTiming = ei(t.smoothChildTiming), Qt.remove(i), i._dp = 0, i._time = i._tTime = Qt._time, r = Qt._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof fe && r.vars.onComplete === r._targets[0])) && Yi(i, r, r._start - r._delay), r = n;
    return Yi(Qt, i, 0), i;
  },
  context: function(t, e) {
    return t ? new hh(t, e) : Kt;
  },
  matchMedia: function(t) {
    return new tp(t);
  },
  matchMediaRefresh: function() {
    return Ur.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || qa();
  },
  addEventListener: function(t, e) {
    var i = go[t] || (go[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = go[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Lf,
    wrapYoyo: Mf,
    distribute: Uu,
    random: Vu,
    snap: Wu,
    normalize: If,
    getUnit: $e,
    clamp: Pf,
    splitColor: Qu,
    toArray: Ei,
    selector: Ba,
    mapRange: Gu,
    pipe: Of,
    unitize: kf,
    interpolate: Df,
    shuffle: qu
  },
  install: Iu,
  effects: la,
  ticker: ui,
  updateRoot: Qe.updateRoot,
  plugins: li,
  globalTimeline: Qt,
  core: {
    PropTween: ri,
    globals: Lu,
    Tween: fe,
    Timeline: Qe,
    Animation: ks,
    getCache: Hr,
    _removeLinkedListItem: Uo,
    reverting: function() {
      return Le;
    },
    context: function(t) {
      return t && Kt && (Kt.data.push(t), t._ctx = Kt), Kt;
    },
    suppressOverwrites: function(t) {
      return Sl = t;
    }
  }
};
ii("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return Oo[o] = fe[o];
});
ui.add(Qe.updateRoot);
yn = Oo.to({}, {
  duration: 0
});
var ep = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, ip = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = ep(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, fa = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var c, u;
        if (Pe(n) && (c = {}, ii(n, function(h) {
          return c[h] = 1;
        }), n = c), e) {
          c = {};
          for (u in n)
            c[u] = e(n[u]);
          n = c;
        }
        ip(a, n);
      };
    }
  };
}, Bt = Oo.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, c;
    this.tween = i;
    for (s in e)
      c = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (c || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = c, this._props.push(s);
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
}, fa("roundProps", Ha), fa("modifiers"), fa("snap", Wu)) || Oo;
fe.version = Qe.version = Bt.version = "3.13.0";
ku = 1;
El() && zn();
Tt.Power0;
Tt.Power1;
Tt.Power2;
Tt.Power3;
Tt.Power4;
Tt.Linear;
Tt.Quad;
Tt.Cubic;
Tt.Quart;
Tt.Quint;
Tt.Strong;
Tt.Elastic;
Tt.Back;
Tt.SteppedEase;
Tt.Bounce;
Tt.Sine;
Tt.Expo;
Tt.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var wc, mr, xn, Nl, Fr, bc, $l, rp = function() {
  return typeof window < "u";
}, ur = {}, Rr = 180 / Math.PI, Sn = Math.PI / 180, on = Math.atan2, xc = 1e8, Fl = /([A-Z])/g, np = /(left|right|width|margin|padding|x)/i, sp = /[\s,\(]\S/, qi = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ua = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, op = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, ap = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, lp = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, dh = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, fh = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, cp = function(t, e, i) {
  return t.style[e] = i;
}, up = function(t, e, i) {
  return t.style.setProperty(e, i);
}, hp = function(t, e, i) {
  return t._gsap[e] = i;
}, dp = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, fp = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, pp = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, Zt = "transform", ni = Zt + "Origin", gp = function o(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in ur && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = qi[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = er(r, a);
      }) : this.tfm[t] = s.x ? s[t] : er(r, t), t === ni && (this.tfm.zOrigin = s.zOrigin);
    else
      return qi.transform.split(",").forEach(function(a) {
        return o.call(i, a, e);
      });
    if (this.props.indexOf(Zt) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ni, e, "")), t = Zt;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, ph = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, mp = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Fl, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = $l(), (!n || !n.isStart) && !i[Zt] && (ph(i), r.zOrigin && i[ni] && (i[ni] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, gh = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: mp,
    save: gp
  };
  return t._gsap || Bt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, mh, Wa = function(t, e) {
  var i = mr.createElementNS ? mr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : mr.createElement(t);
  return i && i.style ? i : mr.createElement(t);
}, Ci = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Fl, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, Nn(e) || e, 1) || "";
}, Sc = "O,Moz,ms,Ms,Webkit".split(","), Nn = function(t, e, i) {
  var r = e || Fr, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Sc[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Sc[s] : "") + t;
}, Va = function() {
  rp() && window.document && (wc = window, mr = wc.document, xn = mr.documentElement, Fr = Wa("div") || {
    style: {}
  }, Wa("div"), Zt = Nn(Zt), ni = Zt + "Origin", Fr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", mh = !!Nn("perspective"), $l = Bt.core.reverting, Nl = 1);
}, Tc = function(t) {
  var e = t.ownerSVGElement, i = Wa("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), xn.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), xn.removeChild(i), n;
}, Ec = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, _h = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Tc(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Tc(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ec(t, ["x", "cx", "x1"]) || 0,
    y: +Ec(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, yh = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && _h(t));
}, jr = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in ur && e !== ni && (e = Zt), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(Fl, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, _r = function(t, e, i, r, n, s) {
  var a = new ri(t._pt, e, i, 0, 1, s ? fh : dh);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Cc = {
  deg: 1,
  rad: 1,
  turn: 1
}, _p = {
  grid: 1,
  flex: 1
}, Pr = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Fr.style, c = np.test(e), u = t.tagName.toLowerCase() === "svg", h = (u ? "client" : "offset") + (c ? "Width" : "Height"), d = 100, f = r === "px", l = r === "%", g, p, _, S;
  if (r === s || !n || Cc[r] || Cc[s])
    return n;
  if (s !== "px" && !f && (n = o(t, e, i, "px")), S = t.getCTM && yh(t), (l || s === "%") && (ur[e] || ~e.indexOf("adius")))
    return g = S ? t.getBBox()[c ? "width" : "height"] : t[h], se(l ? n / g * d : n / 100 * g);
  if (a[c ? "width" : "height"] = d + (f ? s : r), p = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, S && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === mr || !p.appendChild) && (p = mr.body), _ = p._gsap, _ && l && _.width && c && _.time === ui.time && !_.uncache)
    return se(n / _.width * d);
  if (l && (e === "height" || e === "width")) {
    var E = t.style[e];
    t.style[e] = d + r, g = t[h], E ? t.style[e] = E : jr(t, e);
  } else
    (l || s === "%") && !_p[Ci(p, "display")] && (a.position = Ci(t, "position")), p === t && (a.position = "static"), p.appendChild(Fr), g = Fr[h], p.removeChild(Fr), a.position = "absolute";
  return c && l && (_ = Hr(p), _.time = ui.time, _.width = p[h]), se(f ? g * n / d : g && n ? d / g * n : 0);
}, er = function(t, e, i, r) {
  var n;
  return Nl || Va(), e in qi && e !== "transform" && (e = qi[e], ~e.indexOf(",") && (e = e.split(",")[0])), ur[e] && e !== "transform" ? (n = Ls(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Io(Ci(t, ni)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = ko[e] && ko[e](t, e, i) || Ci(t, e) || Du(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Pr(t, e, n, i) + i : n;
}, yp = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = Nn(e, t, 1), s = n && Ci(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = Ci(t, "borderTopColor"));
  }
  var a = new ri(this._pt, t.style, e, 0, 1, ch), c = 0, u = 0, h, d, f, l, g, p, _, S, E, k, T, x;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = Ci(t, r.substring(4, r.indexOf(")")))), r === "auto" && (p = t.style[e], t.style[e] = r, r = Ci(t, e) || r, p ? t.style[e] = p : jr(t, e)), h = [i, r], Ju(h), i = h[0], r = h[1], f = i.match(_n) || [], x = r.match(_n) || [], x.length) {
    for (; d = _n.exec(r); )
      _ = d[0], E = r.substring(c, d.index), g ? g = (g + 1) % 5 : (E.substr(-5) === "rgba(" || E.substr(-5) === "hsla(") && (g = 1), _ !== (p = f[u++] || "") && (l = parseFloat(p) || 0, T = p.substr((l + "").length), _.charAt(1) === "=" && (_ = bn(l, _) + T), S = parseFloat(_), k = _.substr((S + "").length), c = _n.lastIndex - k.length, k || (k = k || pi.units[e] || T, c === r.length && (r += k, a.e += k)), T !== k && (l = Pr(t, e, p, k) || 0), a._pt = {
        _next: a._pt,
        p: E || u === 1 ? E : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: l,
        c: S - l,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = c < r.length ? r.substring(c, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? fh : dh;
  return Au.test(r) && (a.e = 0), this._pt = a, a;
}, Pc = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, vp = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Pc[i] || i, e[1] = Pc[r] || r, e.join(" ");
}, wp = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, c, u;
    if (n === "all" || n === !0)
      r.cssText = "", c = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        a = n[u], ur[a] && (c = 1, a = a === "transformOrigin" ? ni : Zt), jr(i, a);
    c && (jr(i, Zt), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", Ls(i, 1), s.uncache = 1, ph(r)));
  }
}, ko = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new ri(t._pt, e, i, 0, 0, wp);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
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
}, Is = [1, 0, 0, 1, 0, 0], vh = {}, wh = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Ac = function(t) {
  var e = Ci(t, Zt);
  return wh(e) ? Is : e.substr(7).match(Pu).map(se);
}, Bl = function(t, e) {
  var i = t._gsap || Hr(t), r = t.style, n = Ac(t), s, a, c, u;
  return i.svg && t.getAttribute("transform") ? (c = t.transform.baseVal.consolidate().matrix, n = [c.a, c.b, c.c, c.d, c.e, c.f], n.join(",") === "1,0,0,1,0,0" ? Is : n) : (n === Is && !t.offsetParent && t !== xn && !i.svg && (c = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, xn.appendChild(t)), n = Ac(t), c ? r.display = c : jr(t, "display"), u && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : xn.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Xa = function(t, e, i, r, n, s) {
  var a = t._gsap, c = n || Bl(t, !0), u = a.xOrigin || 0, h = a.yOrigin || 0, d = a.xOffset || 0, f = a.yOffset || 0, l = c[0], g = c[1], p = c[2], _ = c[3], S = c[4], E = c[5], k = e.split(" "), T = parseFloat(k[0]) || 0, x = parseFloat(k[1]) || 0, M, P, O, D;
  i ? c !== Is && (P = l * _ - g * p) && (O = T * (_ / P) + x * (-p / P) + (p * E - _ * S) / P, D = T * (-g / P) + x * (l / P) - (l * E - g * S) / P, T = O, x = D) : (M = _h(t), T = M.x + (~k[0].indexOf("%") ? T / 100 * M.width : T), x = M.y + (~(k[1] || k[0]).indexOf("%") ? x / 100 * M.height : x)), r || r !== !1 && a.smooth ? (S = T - u, E = x - h, a.xOffset = d + (S * l + E * p) - S, a.yOffset = f + (S * g + E * _) - E) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = x, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[ni] = "0px 0px", s && (_r(s, a, "xOrigin", u, T), _r(s, a, "yOrigin", h, x), _r(s, a, "xOffset", d, a.xOffset), _r(s, a, "yOffset", f, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + x);
}, Ls = function(t, e) {
  var i = t._gsap || new rh(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", c = getComputedStyle(t), u = Ci(t, ni) || "0", h, d, f, l, g, p, _, S, E, k, T, x, M, P, O, D, N, q, $, H, Z, et, V, U, nt, ot, v, J, rt, G, st, Ut;
  return h = d = f = p = _ = S = E = k = T = 0, l = g = 1, i.svg = !!(t.getCTM && yh(t)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (r[Zt] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[Zt] !== "none" ? c[Zt] : "")), r.scale = r.rotate = r.translate = "none"), P = Bl(t, i.svg), i.svg && (i.uncache ? (nt = t.getBBox(), u = i.xOrigin - nt.x + "px " + (i.yOrigin - nt.y) + "px", U = "") : U = !e && t.getAttribute("data-svg-origin"), Xa(t, U || u, !!U || i.originIsAbsolute, i.smooth !== !1, P)), x = i.xOrigin || 0, M = i.yOrigin || 0, P !== Is && (q = P[0], $ = P[1], H = P[2], Z = P[3], h = et = P[4], d = V = P[5], P.length === 6 ? (l = Math.sqrt(q * q + $ * $), g = Math.sqrt(Z * Z + H * H), p = q || $ ? on($, q) * Rr : 0, E = H || Z ? on(H, Z) * Rr + p : 0, E && (g *= Math.abs(Math.cos(E * Sn))), i.svg && (h -= x - (x * q + M * H), d -= M - (x * $ + M * Z))) : (Ut = P[6], G = P[7], v = P[8], J = P[9], rt = P[10], st = P[11], h = P[12], d = P[13], f = P[14], O = on(Ut, rt), _ = O * Rr, O && (D = Math.cos(-O), N = Math.sin(-O), U = et * D + v * N, nt = V * D + J * N, ot = Ut * D + rt * N, v = et * -N + v * D, J = V * -N + J * D, rt = Ut * -N + rt * D, st = G * -N + st * D, et = U, V = nt, Ut = ot), O = on(-H, rt), S = O * Rr, O && (D = Math.cos(-O), N = Math.sin(-O), U = q * D - v * N, nt = $ * D - J * N, ot = H * D - rt * N, st = Z * N + st * D, q = U, $ = nt, H = ot), O = on($, q), p = O * Rr, O && (D = Math.cos(O), N = Math.sin(O), U = q * D + $ * N, nt = et * D + V * N, $ = $ * D - q * N, V = V * D - et * N, q = U, et = nt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, S = 180 - S), l = se(Math.sqrt(q * q + $ * $ + H * H)), g = se(Math.sqrt(V * V + Ut * Ut)), O = on(et, V), E = Math.abs(O) > 2e-4 ? O * Rr : 0, T = st ? 1 / (st < 0 ? -st : st) : 0), i.svg && (U = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !wh(Ci(t, Zt)), U && t.setAttribute("transform", U))), Math.abs(E) > 90 && Math.abs(E) < 270 && (n ? (l *= -1, E += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, E += E <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = d - ((i.yPercent = d && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = f + s, i.scaleX = se(l), i.scaleY = se(g), i.rotation = se(p) + a, i.rotationX = se(_) + a, i.rotationY = se(S) + a, i.skewX = E + a, i.skewY = k + a, i.transformPerspective = T + s, (i.zOrigin = parseFloat(u.split(" ")[2]) || !e && i.zOrigin || 0) && (r[ni] = Io(u)), i.xOffset = i.yOffset = 0, i.force3D = pi.force3D, i.renderTransform = i.svg ? xp : mh ? bh : bp, i.uncache = 0, i;
}, Io = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, pa = function(t, e, i) {
  var r = $e(e);
  return se(parseFloat(e) + parseFloat(Pr(t, "x", i + "px", r))) + r;
}, bp = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, bh(t, e);
}, Lr = "0deg", Yn = "0px", Mr = ") ", bh = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, c = i.z, u = i.rotation, h = i.rotationY, d = i.rotationX, f = i.skewX, l = i.skewY, g = i.scaleX, p = i.scaleY, _ = i.transformPerspective, S = i.force3D, E = i.target, k = i.zOrigin, T = "", x = S === "auto" && t && t !== 1 || S === !0;
  if (k && (d !== Lr || h !== Lr)) {
    var M = parseFloat(h) * Sn, P = Math.sin(M), O = Math.cos(M), D;
    M = parseFloat(d) * Sn, D = Math.cos(M), s = pa(E, s, P * D * -k), a = pa(E, a, -Math.sin(M) * -k), c = pa(E, c, O * D * -k + k);
  }
  _ !== Yn && (T += "perspective(" + _ + Mr), (r || n) && (T += "translate(" + r + "%, " + n + "%) "), (x || s !== Yn || a !== Yn || c !== Yn) && (T += c !== Yn || x ? "translate3d(" + s + ", " + a + ", " + c + ") " : "translate(" + s + ", " + a + Mr), u !== Lr && (T += "rotate(" + u + Mr), h !== Lr && (T += "rotateY(" + h + Mr), d !== Lr && (T += "rotateX(" + d + Mr), (f !== Lr || l !== Lr) && (T += "skew(" + f + ", " + l + Mr), (g !== 1 || p !== 1) && (T += "scale(" + g + ", " + p + Mr), E.style[Zt] = T || "translate(0, 0)";
}, xp = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, c = i.rotation, u = i.skewX, h = i.skewY, d = i.scaleX, f = i.scaleY, l = i.target, g = i.xOrigin, p = i.yOrigin, _ = i.xOffset, S = i.yOffset, E = i.forceCSS, k = parseFloat(s), T = parseFloat(a), x, M, P, O, D;
  c = parseFloat(c), u = parseFloat(u), h = parseFloat(h), h && (h = parseFloat(h), u += h, c += h), c || u ? (c *= Sn, u *= Sn, x = Math.cos(c) * d, M = Math.sin(c) * d, P = Math.sin(c - u) * -f, O = Math.cos(c - u) * f, u && (h *= Sn, D = Math.tan(u - h), D = Math.sqrt(1 + D * D), P *= D, O *= D, h && (D = Math.tan(h), D = Math.sqrt(1 + D * D), x *= D, M *= D)), x = se(x), M = se(M), P = se(P), O = se(O)) : (x = d, O = f, M = P = 0), (k && !~(s + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (k = Pr(l, "x", s, "px"), T = Pr(l, "y", a, "px")), (g || p || _ || S) && (k = se(k + g - (g * x + p * P) + _), T = se(T + p - (g * M + p * O) + S)), (r || n) && (D = l.getBBox(), k = se(k + r / 100 * D.width), T = se(T + n / 100 * D.height)), D = "matrix(" + x + "," + M + "," + P + "," + O + "," + k + "," + T + ")", l.setAttribute("transform", D), E && (l.style[Zt] = D);
}, Sp = function(t, e, i, r, n) {
  var s = 360, a = Pe(n), c = parseFloat(n) * (a && ~n.indexOf("rad") ? Rr : 1), u = c - r, h = r + u + "deg", d, f;
  return a && (d = n.split("_")[1], d === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -360)), d === "cw" && u < 0 ? u = (u + s * xc) % s - ~~(u / s) * s : d === "ccw" && u > 0 && (u = (u - s * xc) % s - ~~(u / s) * s)), t._pt = f = new ri(t._pt, e, i, r, u, op), f.e = h, f.u = "deg", t._props.push(i), f;
}, Oc = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Tp = function(t, e, i) {
  var r = Oc({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, c, u, h, d, f, l, g;
  r.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), s[Zt] = e, a = Ls(i, 1), jr(i, Zt), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[Zt], s[Zt] = e, a = Ls(i, 1), s[Zt] = u);
  for (c in ur)
    u = r[c], h = a[c], u !== h && n.indexOf(c) < 0 && (l = $e(u), g = $e(h), d = l !== g ? Pr(i, c, u, g) : parseFloat(u), f = parseFloat(h), t._pt = new ri(t._pt, a, c, d, f - d, Ua), t._pt.u = g || 0, t._props.push(c));
  Oc(a, r);
};
ii("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  ko[t > 1 ? "border" + o : o] = function(a, c, u, h, d) {
    var f, l;
    if (arguments.length < 4)
      return f = s.map(function(g) {
        return er(a, g, u);
      }), l = f.join(" "), l.split(f[0]).length === 5 ? f[0] : l;
    f = (h + "").split(" "), l = {}, s.forEach(function(g, p) {
      return l[g] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), a.init(c, l, d);
  };
});
var qs = {
  name: "css",
  register: Va,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, c = i.vars.startAt, u, h, d, f, l, g, p, _, S, E, k, T, x, M, P, O;
    Nl || Va(), this.styles = this.styles || gh(t), O = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(li[p] && nh(p, e, i, r, t, n)))) {
        if (l = typeof h, g = ko[p], l === "function" && (h = h.call(i, r, t, n), l = typeof h), l === "string" && ~h.indexOf("random(") && (h = As(h)), g)
          g(this, t, p, h, i) && (P = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", xr.lastIndex = 0, xr.test(u) || (_ = $e(u), S = $e(h)), S ? _ !== S && (u = Pr(t, p, u, S) + S) : _ && (h += _), this.add(a, "setProperty", u, h, r, n, 0, 0, p), s.push(p), O.push(p, 0, a[p]);
        else if (l !== "undefined") {
          if (c && p in c ? (u = typeof c[p] == "function" ? c[p].call(i, r, t, n) : c[p], Pe(u) && ~u.indexOf("random(") && (u = As(u)), $e(u + "") || u === "auto" || (u += pi.units[p] || $e(er(t, p)) || ""), (u + "").charAt(1) === "=" && (u = er(t, p))) : u = er(t, p), f = parseFloat(u), E = l === "string" && h.charAt(1) === "=" && h.substr(0, 2), E && (h = h.substr(2)), d = parseFloat(h), p in qi && (p === "autoAlpha" && (f === 1 && er(t, "visibility") === "hidden" && d && (f = 0), O.push("visibility", 0, a.visibility), _r(this, a, "visibility", f ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = qi[p], ~p.indexOf(",") && (p = p.split(",")[0]))), k = p in ur, k) {
            if (this.styles.save(p), l === "string" && h.substring(0, 6) === "var(--" && (h = Ci(t, h.substring(4, h.indexOf(")"))), d = parseFloat(h)), T || (x = t._gsap, x.renderTransform && !e.parseTransform || Ls(t, e.parseTransform), M = e.smoothOrigin !== !1 && x.smooth, T = this._pt = new ri(this._pt, a, Zt, 0, 1, x.renderTransform, x, 0, -1), T.dep = 1), p === "scale")
              this._pt = new ri(this._pt, x, "scaleY", x.scaleY, (E ? bn(x.scaleY, E + d) : d) - x.scaleY || 0, Ua), this._pt.u = 0, s.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              O.push(ni, 0, a[ni]), h = vp(h), x.svg ? Xa(t, h, 0, M, 0, this) : (S = parseFloat(h.split(" ")[2]) || 0, S !== x.zOrigin && _r(this, x, "zOrigin", x.zOrigin, S), _r(this, a, p, Io(u), Io(h)));
              continue;
            } else if (p === "svgOrigin") {
              Xa(t, h, 1, M, 0, this);
              continue;
            } else if (p in vh) {
              Sp(this, x, p, f, E ? bn(f, E + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              _r(this, x, "smooth", x.smooth, h);
              continue;
            } else if (p === "force3D") {
              x[p] = h;
              continue;
            } else if (p === "transform") {
              Tp(this, h, t);
              continue;
            }
          } else p in a || (p = Nn(p) || p);
          if (k || (d || d === 0) && (f || f === 0) && !sp.test(h) && p in a)
            _ = (u + "").substr((f + "").length), d || (d = 0), S = $e(h) || (p in pi.units ? pi.units[p] : _), _ !== S && (f = Pr(t, p, u, S)), this._pt = new ri(this._pt, k ? x : a, p, f, (E ? bn(f, E + d) : d) - f, !k && (S === "px" || p === "zIndex") && e.autoRound !== !1 ? lp : Ua), this._pt.u = S || 0, _ !== S && S !== "%" && (this._pt.b = u, this._pt.r = ap);
          else if (p in a)
            yp.call(this, t, p, u, E ? E + h : h);
          else if (p in t)
            this.add(t, p, u || t[p], E ? E + h : h, r, n);
          else if (p !== "parseTransform") {
            Pl(p, h);
            continue;
          }
          k || (p in a ? O.push(p, 0, a[p]) : typeof t[p] == "function" ? O.push(p, 2, t[p]()) : O.push(p, 1, u || t[p])), s.push(p);
        }
      }
    P && uh(this);
  },
  render: function(t, e) {
    if (e.tween._time || !$l())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: er,
  aliases: qi,
  getSetter: function(t, e, i) {
    var r = qi[e];
    return r && r.indexOf(",") < 0 && (e = r), e in ur && e !== ni && (t._gsap.x || er(t, "x")) ? i && bc === i ? e === "scale" ? dp : hp : (bc = i || {}) && (e === "scale" ? fp : pp) : t.style && !Tl(t.style[e]) ? cp : ~e.indexOf("-") ? up : Rl(t, e);
  },
  core: {
    _removeProperty: jr,
    _getMatrix: Bl
  }
};
Bt.utils.checkPrefix = Nn;
Bt.core.getStyleSaver = gh;
(function(o, t, e, i) {
  var r = ii(o + "," + t + "," + e, function(n) {
    ur[n] = 1;
  });
  ii(t, function(n) {
    pi.units[n] = "deg", vh[n] = 1;
  }), qi[r[13]] = o + "," + t, ii(i, function(n) {
    var s = n.split(":");
    qi[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ii("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  pi.units[o] = "px";
});
Bt.registerPlugin(qs);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var nr, Wr, Hl, Xo, Qn, mo, Lo, hs, Di = "transform", Ga = Di + "Origin", xh, Sh = function(t) {
  var e = t.ownerDocument || t;
  for (!(Di in t.style) && ("msTransform" in t.style) && (Di = "msTransform", Ga = Di + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (Wr = window, Lo = new Qr(), e) {
    nr = e, Hl = e.documentElement, Xo = e.body, hs = nr.createElementNS("http://www.w3.org/2000/svg", "g"), hs.style.transform = "none";
    var i = e.createElement("div"), r = e.createElement("div"), n = e && (e.body || e.firstElementChild);
    n && n.appendChild && (n.appendChild(i), i.appendChild(r), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), xh = r.offsetParent !== i, n.removeChild(i));
  }
  return e;
}, Ep = function(t) {
  for (var e, i; t && t !== Xo; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Th = [], Eh = [], Cp = function() {
  return Wr.pageYOffset || nr.scrollTop || Hl.scrollTop || Xo.scrollTop || 0;
}, Pp = function() {
  return Wr.pageXOffset || nr.scrollLeft || Hl.scrollLeft || Xo.scrollLeft || 0;
}, Yl = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, Ap = function o(t) {
  if (Wr.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return o(t);
}, ga = function o(t, e) {
  if (t.parentNode && (nr || Sh(t))) {
    var i = Yl(t), r = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", n = i ? e ? "rect" : "g" : "div", s = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, c = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", u = nr.createElementNS ? nr.createElementNS(r.replace(/^https/, "http"), n) : nr.createElement(n);
    return e && (i ? (mo || (mo = o(t)), u.setAttribute("width", 0.01), u.setAttribute("height", 0.01), u.setAttribute("transform", "translate(" + s + "," + a + ")"), mo.appendChild(u)) : (Qn || (Qn = o(t), Qn.style.cssText = c), u.style.cssText = c + "width:0.1px;height:0.1px;top:" + a + "px;left:" + s + "px", Qn.appendChild(u))), u;
  }
  throw "Need document and parent.";
}, Op = function(t) {
  for (var e = new Qr(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, kp = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Di], t.style[Di] = "none", t.appendChild(hs), e = hs.getCTM(), t.removeChild(hs), i ? t.style[Di] = i : t.style.removeProperty(Di.replace(/([A-Z])/g, "-$1").toLowerCase())), e || Lo.clone();
}, Ip = function(t, e) {
  var i = Yl(t), r = t === i, n = i ? Th : Eh, s = t.parentNode, a = s && !i && s.shadowRoot && s.shadowRoot.appendChild ? s.shadowRoot : s, c, u, h, d, f, l;
  if (t === Wr)
    return t;
  if (n.length || n.push(ga(t, 1), ga(t, 2), ga(t, 3)), c = i ? mo : Qn, i)
    r ? (h = kp(t), d = -h.e / h.a, f = -h.f / h.d, u = Lo) : t.getBBox ? (h = t.getBBox(), u = t.transform ? t.transform.baseVal : {}, u = u.numberOfItems ? u.numberOfItems > 1 ? Op(u) : u.getItem(0).matrix : Lo, d = u.a * h.x + u.c * h.y, f = u.b * h.x + u.d * h.y) : (u = new Qr(), d = f = 0), (r ? i : s).appendChild(c), c.setAttribute("transform", "matrix(" + u.a + "," + u.b + "," + u.c + "," + u.d + "," + (u.e + d) + "," + (u.f + f) + ")");
  else {
    if (d = f = 0, xh)
      for (u = t.offsetParent, h = t; h && (h = h.parentNode) && h !== u && h.parentNode; )
        (Wr.getComputedStyle(h)[Di] + "").length > 4 && (d = h.offsetLeft, f = h.offsetTop, h = 0);
    if (l = Wr.getComputedStyle(t), l.position !== "absolute" && l.position !== "fixed")
      for (u = t.offsetParent; s && s !== u; )
        d += s.scrollLeft || 0, f += s.scrollTop || 0, s = s.parentNode;
    h = c.style, h.top = t.offsetTop - f + "px", h.left = t.offsetLeft - d + "px", h[Di] = l[Di], h[Ga] = l[Ga], h.position = l.position === "fixed" ? "fixed" : "absolute", a.appendChild(c);
  }
  return c;
}, ma = function(t, e, i, r, n, s, a) {
  return t.a = e, t.b = i, t.c = r, t.d = n, t.e = s, t.f = a, t;
}, Qr = /* @__PURE__ */ function() {
  function o(e, i, r, n, s, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), r === void 0 && (r = 0), n === void 0 && (n = 1), s === void 0 && (s = 0), a === void 0 && (a = 0), ma(this, e, i, r, n, s, a);
  }
  var t = o.prototype;
  return t.inverse = function() {
    var i = this.a, r = this.b, n = this.c, s = this.d, a = this.e, c = this.f, u = i * s - r * n || 1e-10;
    return ma(this, s / u, -r / u, -n / u, i / u, (n * c - s * a) / u, -(i * c - r * a) / u);
  }, t.multiply = function(i) {
    var r = this.a, n = this.b, s = this.c, a = this.d, c = this.e, u = this.f, h = i.a, d = i.c, f = i.b, l = i.d, g = i.e, p = i.f;
    return ma(this, h * r + f * s, h * n + f * a, d * r + l * s, d * n + l * a, c + g * r + p * s, u + g * n + p * a);
  }, t.clone = function() {
    return new o(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var r = this.a, n = this.b, s = this.c, a = this.d, c = this.e, u = this.f;
    return r === i.a && n === i.b && s === i.c && a === i.d && c === i.e && u === i.f;
  }, t.apply = function(i, r) {
    r === void 0 && (r = {});
    var n = i.x, s = i.y, a = this.a, c = this.b, u = this.c, h = this.d, d = this.e, f = this.f;
    return r.x = n * a + s * u + d || 0, r.y = n * c + s * h + f || 0, r;
  }, o;
}();
function $r(o, t, e, i) {
  if (!o || !o.parentNode || (nr || Sh(o)).documentElement === o)
    return new Qr();
  var r = Ep(o), n = Yl(o), s = n ? Th : Eh, a = Ip(o), c = s[0].getBoundingClientRect(), u = s[1].getBoundingClientRect(), h = s[2].getBoundingClientRect(), d = a.parentNode, f = Ap(o), l = new Qr((u.left - c.left) / 100, (u.top - c.top) / 100, (h.left - c.left) / 100, (h.top - c.top) / 100, c.left + (f ? 0 : Pp()), c.top + (f ? 0 : Cp()));
  if (d.removeChild(a), r)
    for (c = r.length; c--; )
      u = r[c], u.scaleX = u.scaleY = 0, u.renderTransform(1, u);
  return t ? l.inverse() : l;
}
function kc(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function Lp(o, t) {
  o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.__proto__ = t;
}
var St, $t, hi, Ri, sr, _a, ir, Ka, Zn, yr, Ch, ja, Ms, ql, Jn, Ii, ts, _o, Ph, Qa, Mo = 0, Ah = function() {
  return typeof window < "u";
}, Oh = function() {
  return St || Ah() && (St = window.gsap) && St.registerPlugin && St;
}, pr = function(t) {
  return typeof t == "function";
}, ds = function(t) {
  return typeof t == "object";
}, Mi = function(t) {
  return typeof t > "u";
}, yo = function() {
  return !1;
}, fs = "transform", Za = "transformOrigin", hr = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, qn = Array.isArray, js = function(t, e) {
  var i = hi.createElementNS ? hi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : hi.createElement(t);
  return i.style ? i : hi.createElement(t);
}, Ic = 180 / Math.PI, an = 1e20, Mp = new Qr(), dr = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, Vr = [], Tn = {}, Dp = 0, Rp = /^(?:a|input|textarea|button|select)$/i, Lc = 0, ln = {}, Ji = {}, kh = function(t, e) {
  var i = {}, r;
  for (r in t)
    i[r] = e ? t[r] * e : t[r];
  return i;
}, zp = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Mc = function o(t, e) {
  for (var i = t.length, r; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), r = t[i].children, r && r.length && o(r, e);
}, Ih = function() {
  return Vr.forEach(function(t) {
    return t();
  });
}, Np = function(t) {
  Vr.push(t), Vr.length === 1 && St.ticker.add(Ih);
}, Dc = function() {
  return !Vr.length && St.ticker.remove(Ih);
}, Rc = function(t) {
  for (var e = Vr.length; e--; )
    Vr[e] === t && Vr.splice(e, 1);
  St.to(Dc, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: Dc,
    data: "_draggable"
  });
}, $p = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, we = function(t, e, i, r) {
  if (t.addEventListener) {
    var n = Ms[e];
    r = r || (Ch ? {
      passive: !1
    } : null), t.addEventListener(n || e, i, r), n && e !== n && t.addEventListener(e, i, r);
  }
}, he = function(t, e, i, r) {
  if (t.removeEventListener) {
    var n = Ms[e];
    t.removeEventListener(n || e, i, r), n && e !== n && t.removeEventListener(e, i, r);
  }
}, wi = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, Fp = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, Bp = function o(t) {
  ql = t.touches && Mo < t.touches.length, he(t.target, "touchend", o);
}, zc = function(t) {
  ql = t.touches && Mo < t.touches.length, we(t.target, "touchend", Bp);
}, En = function(t) {
  return $t.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Cn = function(t) {
  return $t.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, Nc = function o(t, e) {
  we(t, "scroll", e), $n(t.parentNode) || o(t.parentNode, e);
}, $c = function o(t, e) {
  he(t, "scroll", e), $n(t.parentNode) || o(t.parentNode, e);
}, $n = function(t) {
  return !t || t === Ri || t.nodeType === 9 || t === hi.body || t === $t || !t.nodeType || !t.parentNode;
}, Fc = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return Math.max(0, $n(t) ? Math.max(Ri[r], sr[r]) - ($t["inner" + i] || Ri[n] || sr[n]) : t[r] - t[n]);
}, ya = function o(t, e) {
  var i = Fc(t, "x"), r = Fc(t, "y");
  $n(t) ? t = Ji : o(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = r, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, va = function(t, e, i) {
  var r = t.style;
  r && (Mi(r[e]) && (e = Zn(e, t) || e), i == null ? r.removeProperty && r.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : r[e] = i);
}, Ds = function(t) {
  return $t.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Dr = {}, cn = function(t) {
  if (t === $t)
    return Dr.left = Dr.top = 0, Dr.width = Dr.right = Ri.clientWidth || t.innerWidth || sr.clientWidth || 0, Dr.height = Dr.bottom = (t.innerHeight || 0) - 20 < Ri.clientHeight ? Ri.clientHeight : t.innerHeight || sr.clientHeight || 0, Dr;
  var e = t.ownerDocument || hi, i = Mi(t.pageX) ? !t.nodeType && !Mi(t.left) && !Mi(t.top) ? t : yr(t)[0].getBoundingClientRect() : {
    left: t.pageX - Cn(e),
    top: t.pageY - En(e),
    right: t.pageX - Cn(e) + 1,
    bottom: t.pageY - En(e) + 1
  };
  return Mi(i.right) && !Mi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Mi(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, ne = function(t, e, i) {
  var r = t.vars, n = r[i], s = t._listeners[e], a;
  return pr(n) && (a = n.apply(r.callbackScope || t, r[i + "Params"] || [t.pointerEvent])), s && t.dispatchEvent(e) === !1 && (a = !1), a;
}, Bc = function(t, e) {
  var i = yr(t)[0], r, n, s;
  return !i.nodeType && i !== $t ? Mi(t.left) ? (n = t.min || t.minX || t.minRotation || 0, r = t.min || t.minY || 0, {
    left: n,
    top: r,
    width: (t.max || t.maxX || t.maxRotation || 0) - n,
    height: (t.max || t.maxY || 0) - r
  }) : (s = {
    x: 0,
    y: 0
  }, {
    left: t.left - s.x,
    top: t.top - s.y,
    width: t.width,
    height: t.height
  }) : Hp(i, e);
}, bi = {}, Hp = function(t, e) {
  e = yr(e)[0];
  var i = t.getBBox && t.ownerSVGElement, r = t.ownerDocument || hi, n, s, a, c, u, h, d, f, l, g, p, _, S;
  if (t === $t)
    a = En(r), n = Cn(r), s = n + (r.documentElement.clientWidth || t.innerWidth || r.body.clientWidth || 0), c = a + ((t.innerHeight || 0) - 20 < r.documentElement.clientHeight ? r.documentElement.clientHeight : t.innerHeight || r.body.clientHeight || 0);
  else {
    if (e === $t || Mi(e))
      return t.getBoundingClientRect();
    n = a = 0, i ? (g = t.getBBox(), p = g.width, _ = g.height) : (t.viewBox && (g = t.viewBox.baseVal) && (n = g.x || 0, a = g.y || 0, p = g.width, _ = g.height), p || (S = Ds(t), g = S.boxSizing === "border-box", p = (parseFloat(S.width) || t.clientWidth || 0) + (g ? 0 : parseFloat(S.borderLeftWidth) + parseFloat(S.borderRightWidth)), _ = (parseFloat(S.height) || t.clientHeight || 0) + (g ? 0 : parseFloat(S.borderTopWidth) + parseFloat(S.borderBottomWidth)))), s = p, c = _;
  }
  return t === e ? {
    left: n,
    top: a,
    width: s - n,
    height: c - a
  } : (u = $r(e, !0).multiply($r(t)), h = u.apply({
    x: n,
    y: a
  }), d = u.apply({
    x: s,
    y: a
  }), f = u.apply({
    x: s,
    y: c
  }), l = u.apply({
    x: n,
    y: c
  }), n = Math.min(h.x, d.x, f.x, l.x), a = Math.min(h.y, d.y, f.y, l.y), {
    left: n,
    top: a,
    width: Math.max(h.x, d.x, f.x, l.x) - n,
    height: Math.max(h.y, d.y, f.y, l.y) - a
  });
}, wa = function(t, e, i, r, n, s) {
  var a = {}, c, u, h;
  if (e)
    if (n !== 1 && e instanceof Array) {
      if (a.end = c = [], h = e.length, ds(e[0]))
        for (u = 0; u < h; u++)
          c[u] = kh(e[u], n);
      else
        for (u = 0; u < h; u++)
          c[u] = e[u] * n;
      i += 1.1, r -= 1.1;
    } else pr(e) ? a.end = function(d) {
      var f = e.call(t, d), l, g;
      if (n !== 1)
        if (ds(f)) {
          l = {};
          for (g in f)
            l[g] = f[g] * n;
          f = l;
        } else
          f *= n;
      return f;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (r || r === 0) && (a.min = r), s && (a.velocity = 0), a;
}, Yp = function o(t) {
  var e;
  return !t || !t.getAttribute || t === sr ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (Rp.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : o(t.parentNode);
}, Qs = function(t, e) {
  for (var i = t.length, r; i--; )
    r = t[i], r.ondragstart = r.onselectstart = e ? null : yo, St.set(r, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, qp = function o(t) {
  if (Ds(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return o(t);
}, Lh, Ja, Up = function(t, e) {
  t = St.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), r = i.style, n = t.firstChild, s = 0, a = 0, c = t.scrollTop, u = t.scrollLeft, h = t.scrollWidth, d = t.scrollHeight, f = 0, l = 0, g = 0, p, _, S, E, k, T;
  Lh && e.force3D !== !1 ? (k = "translate3d(", T = "px,0px)") : fs && (k = "translate(", T = "px)"), this.scrollTop = function(x, M) {
    if (!arguments.length)
      return -this.top();
    this.top(-x, M);
  }, this.scrollLeft = function(x, M) {
    if (!arguments.length)
      return -this.left();
    this.left(-x, M);
  }, this.left = function(x, M) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var P = t.scrollLeft - u, O = a;
    if ((P > 2 || P < -2) && !M) {
      u = t.scrollLeft, St.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-u), e.onKill && e.onKill();
      return;
    }
    x = -x, x < 0 ? (a = x - 0.5 | 0, x = 0) : x > l ? (a = x - l | 0, x = l) : a = 0, (a || O) && (this._skip || (r[fs] = k + -a + "px," + -s + T), a + f >= 0 && (r.paddingRight = a + f + "px")), t.scrollLeft = x | 0, u = t.scrollLeft;
  }, this.top = function(x, M) {
    if (!arguments.length)
      return -(t.scrollTop + s);
    var P = t.scrollTop - c, O = s;
    if ((P > 2 || P < -2) && !M) {
      c = t.scrollTop, St.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-c), e.onKill && e.onKill();
      return;
    }
    x = -x, x < 0 ? (s = x - 0.5 | 0, x = 0) : x > g ? (s = x - g | 0, x = g) : s = 0, (s || O) && (this._skip || (r[fs] = k + -a + "px," + -s + T)), t.scrollTop = x | 0, c = t.scrollTop;
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
  }, this.calibrate = function(x) {
    var M = t.clientWidth === p, P, O, D;
    c = t.scrollTop, u = t.scrollLeft, !(M && t.clientHeight === _ && i.offsetHeight === S && h === t.scrollWidth && d === t.scrollHeight && !x) && ((s || a) && (O = this.left(), D = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), P = Ds(t), (!M || x) && (r.display = "block", r.width = "auto", r.paddingRight = "0px", f = Math.max(0, t.scrollWidth - t.clientWidth), f && (f += parseFloat(P.paddingLeft) + (Ja ? parseFloat(P.paddingRight) : 0))), r.display = "inline-block", r.position = "relative", r.overflow = "visible", r.verticalAlign = "top", r.boxSizing = "content-box", r.width = "100%", r.paddingRight = f + "px", Ja && (r.paddingBottom = P.paddingBottom), p = t.clientWidth, _ = t.clientHeight, h = t.scrollWidth, d = t.scrollHeight, l = t.scrollWidth - p, g = t.scrollHeight - _, S = i.offsetHeight, r.display = "block", (O || D) && (this.left(O), this.top(D)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, ba = function(t) {
  if (Ah() && document.body) {
    var e = window && window.navigator;
    $t = window, hi = document, Ri = hi.documentElement, sr = hi.body, _a = js("div"), _o = !!window.PointerEvent, ir = js("div"), ir.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", ts = ir.style.cursor === "grab" ? "grab" : "move", Jn = e && e.userAgent.toLowerCase().indexOf("android") !== -1, ja = "ontouchstart" in Ri && "orientation" in $t || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), Ja = function() {
      var i = js("div"), r = js("div"), n = r.style, s = sr, a;
      return n.display = "inline-block", n.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(r), s.appendChild(i), a = r.offsetHeight + 18 > i.scrollHeight, s.removeChild(i), a;
    }(), Ms = function(i) {
      for (var r = i.split(","), n = ("onpointerdown" in _a ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _a ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), s = {}, a = 4; --a > -1; )
        s[r[a]] = n[a], s[n[a]] = r[a];
      try {
        Ri.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Ch = 1;
          }
        }));
      } catch {
      }
      return s;
    }("touchstart,touchmove,touchend,touchcancel"), we(hi, "touchcancel", yo), we($t, "touchmove", yo), sr && sr.addEventListener("touchstart", yo), we(hi, "contextmenu", function() {
      for (var i in Tn)
        Tn[i].isPressed && Tn[i].endDrag();
    }), St = Ka = Oh();
  }
  St ? (Ii = St.plugins.inertia, Ph = St.core.context || function() {
  }, Zn = St.utils.checkPrefix, fs = Zn(fs), Za = Zn(Za), yr = St.utils.toArray, Qa = St.core.getStyleSaver, Lh = !!Zn("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, Wp = /* @__PURE__ */ function() {
  function o(e) {
    this._listeners = {}, this.target = e || this;
  }
  var t = o.prototype;
  return t.addEventListener = function(i, r) {
    var n = this._listeners[i] || (this._listeners[i] = []);
    ~n.indexOf(r) || n.push(r);
  }, t.removeEventListener = function(i, r) {
    var n = this._listeners[i], s = n && n.indexOf(r);
    s >= 0 && n.splice(s, 1);
  }, t.dispatchEvent = function(i) {
    var r = this, n;
    return (this._listeners[i] || []).forEach(function(s) {
      return s.call(r, {
        type: i,
        target: r.target
      }) === !1 && (n = !1);
    }), n;
  }, o;
}(), Go = /* @__PURE__ */ function(o) {
  Lp(t, o);
  function t(e, i) {
    var r;
    r = o.call(this) || this, Ka || ba(1), e = yr(e)[0], r.styles = Qa && Qa(e, "transform,left,top"), Ii || (Ii = St.plugins.inertia), r.vars = i = kh(i || {}), r.target = e, r.x = r.y = r.rotation = 0, r.dragResistance = parseFloat(i.dragResistance) || 0, r.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, r.lockAxis = i.lockAxis, r.autoScroll = i.autoScroll || 0, r.lockedAxis = null, r.allowEventDefault = !!i.allowEventDefault, St.getProperty(e, "x");
    var n = (i.type || "x,y").toLowerCase(), s = ~n.indexOf("x") || ~n.indexOf("y"), a = n.indexOf("rotation") !== -1, c = a ? "rotation" : s ? "x" : "left", u = s ? "y" : "top", h = !!(~n.indexOf("x") || ~n.indexOf("left") || n === "scroll"), d = !!(~n.indexOf("y") || ~n.indexOf("top") || n === "scroll"), f = i.minimumMovement || 2, l = kc(r), g = yr(i.trigger || i.handle || e), p = {}, _ = 0, S = !1, E = i.autoScrollMarginTop || 40, k = i.autoScrollMarginRight || 40, T = i.autoScrollMarginBottom || 40, x = i.autoScrollMarginLeft || 40, M = i.clickableTest || Yp, P = 0, O = e._gsap || St.core.getCache(e), D = qp(e), N = function(y, B) {
      return parseFloat(O.get(e, y, B));
    }, q = e.ownerDocument || hi, $, H, Z, et, V, U, nt, ot, v, J, rt, G, st, Ut, wt, It, pt, jt, ee, Rt, Yt, dt, ft, lt, Se, A, zt, qe, Ae, Lt, Dt, ae, Ue, Wt = function(y) {
      return wi(y), y.stopImmediatePropagation && y.stopImmediatePropagation(), !1;
    }, ie = function j(y) {
      if (l.autoScroll && l.isDragging && (S || pt)) {
        var B = e, b = l.autoScroll * 15, C, F, I, Y, R, W, tt, X;
        for (S = !1, Ji.scrollTop = $t.pageYOffset != null ? $t.pageYOffset : q.documentElement.scrollTop != null ? q.documentElement.scrollTop : q.body.scrollTop, Ji.scrollLeft = $t.pageXOffset != null ? $t.pageXOffset : q.documentElement.scrollLeft != null ? q.documentElement.scrollLeft : q.body.scrollLeft, Y = l.pointerX - Ji.scrollLeft, R = l.pointerY - Ji.scrollTop; B && !F; )
          F = $n(B.parentNode), C = F ? Ji : B.parentNode, I = F ? {
            bottom: Math.max(Ri.clientHeight, $t.innerHeight || 0),
            right: Math.max(Ri.clientWidth, $t.innerWidth || 0),
            left: 0,
            top: 0
          } : C.getBoundingClientRect(), W = tt = 0, d && (X = C._gsMaxScrollY - C.scrollTop, X < 0 ? tt = X : R > I.bottom - T && X ? (S = !0, tt = Math.min(X, b * (1 - Math.max(0, I.bottom - R) / T) | 0)) : R < I.top + E && C.scrollTop && (S = !0, tt = -Math.min(C.scrollTop, b * (1 - Math.max(0, R - I.top) / E) | 0)), tt && (C.scrollTop += tt)), h && (X = C._gsMaxScrollX - C.scrollLeft, X < 0 ? W = X : Y > I.right - k && X ? (S = !0, W = Math.min(X, b * (1 - Math.max(0, I.right - Y) / k) | 0)) : Y < I.left + x && C.scrollLeft && (S = !0, W = -Math.min(C.scrollLeft, b * (1 - Math.max(0, Y - I.left) / x) | 0)), W && (C.scrollLeft += W)), F && (W || tt) && ($t.scrollTo(C.scrollLeft, C.scrollTop), Re(l.pointerX + W, l.pointerY + tt)), B = C;
      }
      if (pt) {
        var ut = l.x, bt = l.y;
        a ? (l.deltaX = ut - parseFloat(O.rotation), l.rotation = ut, O.rotation = ut + "deg", O.renderTransform(1, O)) : H ? (d && (l.deltaY = bt - H.top(), H.top(bt)), h && (l.deltaX = ut - H.left(), H.left(ut))) : s ? (d && (l.deltaY = bt - parseFloat(O.y), O.y = bt + "px"), h && (l.deltaX = ut - parseFloat(O.x), O.x = ut + "px"), O.renderTransform(1, O)) : (d && (l.deltaY = bt - parseFloat(e.style.top || 0), e.style.top = bt + "px"), h && (l.deltaX = ut - parseFloat(e.style.left || 0), e.style.left = ut + "px")), ot && !y && !qe && (qe = !0, ne(l, "drag", "onDrag") === !1 && (h && (l.x -= l.deltaX), d && (l.y -= l.deltaY), j(!0)), qe = !1);
      }
      pt = !1;
    }, Ct = function(y, B) {
      var b = l.x, C = l.y, F, I;
      e._gsap || (O = St.core.getCache(e)), O.uncache && St.getProperty(e, "x"), s ? (l.x = parseFloat(O.x), l.y = parseFloat(O.y)) : a ? l.x = l.rotation = parseFloat(O.rotation) : H ? (l.y = H.top(), l.x = H.left()) : (l.y = parseFloat(e.style.top || (I = Ds(e)) && I.top) || 0, l.x = parseFloat(e.style.left || (I || {}).left) || 0), (ee || Rt || Yt) && !B && (l.isDragging || l.isThrowing) && (Yt && (ln.x = l.x, ln.y = l.y, F = Yt(ln), F.x !== l.x && (l.x = F.x, pt = !0), F.y !== l.y && (l.y = F.y, pt = !0)), ee && (F = ee(l.x), F !== l.x && (l.x = F, a && (l.rotation = F), pt = !0)), Rt && (F = Rt(l.y), F !== l.y && (l.y = F), pt = !0)), pt && ie(!0), y || (l.deltaX = l.x - b, l.deltaY = l.y - C, ne(l, "throwupdate", "onThrowUpdate"));
    }, le = function(y, B, b, C) {
      return B == null && (B = -1e20), b == null && (b = an), pr(y) ? function(F) {
        var I = l.isPressed ? 1 - l.edgeResistance : 1;
        return y.call(l, (F > b ? b + (F - b) * I : F < B ? B + (F - B) * I : F) * C) * C;
      } : qn(y) ? function(F) {
        for (var I = y.length, Y = 0, R = an, W, tt; --I > -1; )
          W = y[I], tt = W - F, tt < 0 && (tt = -tt), tt < R && W >= B && W <= b && (Y = I, R = tt);
        return y[Y];
      } : isNaN(y) ? function(F) {
        return F;
      } : function() {
        return y * C;
      };
    }, Oe = function(y, B, b, C, F, I, Y) {
      return I = I && I < an ? I * I : an, pr(y) ? function(R) {
        var W = l.isPressed ? 1 - l.edgeResistance : 1, tt = R.x, X = R.y, ut, bt, Et;
        return R.x = tt = tt > b ? b + (tt - b) * W : tt < B ? B + (tt - B) * W : tt, R.y = X = X > F ? F + (X - F) * W : X < C ? C + (X - C) * W : X, ut = y.call(l, R), ut !== R && (R.x = ut.x, R.y = ut.y), Y !== 1 && (R.x *= Y, R.y *= Y), I < an && (bt = R.x - tt, Et = R.y - X, bt * bt + Et * Et > I && (R.x = tt, R.y = X)), R;
      } : qn(y) ? function(R) {
        for (var W = y.length, tt = 0, X = an, ut, bt, Et, gt; --W > -1; )
          Et = y[W], ut = Et.x - R.x, bt = Et.y - R.y, gt = ut * ut + bt * bt, gt < X && (tt = W, X = gt);
        return X <= I ? y[tt] : R;
      } : function(R) {
        return R;
      };
    }, Me = function() {
      var y, B, b, C;
      nt = !1, H ? (H.calibrate(), l.minX = rt = -H.maxScrollLeft(), l.minY = st = -H.maxScrollTop(), l.maxX = J = l.maxY = G = 0, nt = !0) : i.bounds && (y = Bc(i.bounds, e.parentNode), a ? (l.minX = rt = y.left, l.maxX = J = y.left + y.width, l.minY = st = l.maxY = G = 0) : !Mi(i.bounds.maxX) || !Mi(i.bounds.maxY) ? (y = i.bounds, l.minX = rt = y.minX, l.minY = st = y.minY, l.maxX = J = y.maxX, l.maxY = G = y.maxY) : (B = Bc(e, e.parentNode), l.minX = rt = Math.round(N(c, "px") + y.left - B.left), l.minY = st = Math.round(N(u, "px") + y.top - B.top), l.maxX = J = Math.round(rt + (y.width - B.width)), l.maxY = G = Math.round(st + (y.height - B.height))), rt > J && (l.minX = J, l.maxX = J = rt, rt = l.minX), st > G && (l.minY = G, l.maxY = G = st, st = l.minY), a && (l.minRotation = rt, l.maxRotation = J), nt = !0), i.liveSnap && (b = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, C = qn(b) || pr(b), a ? (ee = le(C ? b : b.rotation, rt, J, 1), Rt = null) : b.points ? Yt = Oe(C ? b : b.points, rt, J, st, G, b.radius, H ? -1 : 1) : (h && (ee = le(C ? b : b.x || b.left || b.scrollLeft, rt, J, H ? -1 : 1)), d && (Rt = le(C ? b : b.y || b.top || b.scrollTop, st, G, H ? -1 : 1))));
    }, Ni = function() {
      l.isThrowing = !1, ne(l, "throwcomplete", "onThrowComplete");
    }, qt = function() {
      l.isThrowing = !1;
    }, $i = function(y, B) {
      var b, C, F, I;
      y && Ii ? (y === !0 && (b = i.snap || i.liveSnap || {}, C = qn(b) || pr(b), y = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? y.rotation = wa(l, C ? b : b.rotation, J, rt, 1, B) : (h && (y[c] = wa(l, C ? b : b.points || b.x || b.left, J, rt, H ? -1 : 1, B || l.lockedAxis === "x")), d && (y[u] = wa(l, C ? b : b.points || b.y || b.top, G, st, H ? -1 : 1, B || l.lockedAxis === "y")), (b.points || qn(b) && ds(b[0])) && (y.linkedProps = c + "," + u, y.radius = b.radius))), l.isThrowing = !0, I = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - l.edgeResistance + 0.2 : i.overshootTolerance, y.duration || (y.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? I === 0 || ds(y) && y.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: I
      }), l.tween = F = St.to(H || e, {
        inertia: y,
        data: "_draggable",
        inherit: !1,
        onComplete: Ni,
        onInterrupt: qt,
        onUpdate: i.fastMode ? ne : Ct,
        onUpdateParams: i.fastMode ? [l, "onthrowupdate", "onThrowUpdate"] : b && b.radius ? [!1, !0] : []
      }), i.fastMode || (H && (H._skip = !0), F.render(1e9, !0, !0), Ct(!0, !0), l.endX = l.x, l.endY = l.y, a && (l.endRotation = l.x), F.play(0), Ct(!0, !0), H && (H._skip = !1))) : nt && l.applyBounds();
    }, Je = function(y) {
      var B = lt, b;
      lt = $r(e.parentNode, !0), y && l.isPressed && !lt.equals(B || new Qr()) && (b = B.inverse().apply({
        x: Z,
        y: et
      }), lt.apply(b, b), Z = b.x, et = b.y), lt.equals(Mp) && (lt = null);
    }, ge = function() {
      var y = 1 - l.edgeResistance, B = D ? Cn(q) : 0, b = D ? En(q) : 0, C, F, I;
      s && (O.x = N(c, "px") + "px", O.y = N(u, "px") + "px", O.renderTransform()), Je(!1), bi.x = l.pointerX - B, bi.y = l.pointerY - b, lt && lt.apply(bi, bi), Z = bi.x, et = bi.y, pt && (Re(l.pointerX, l.pointerY), ie(!0)), ae = $r(e), H ? (Me(), U = H.top(), V = H.left()) : (ke() ? (Ct(!0, !0), Me()) : l.applyBounds(), a ? (C = e.ownerSVGElement ? [O.xOrigin - e.getBBox().x, O.yOrigin - e.getBBox().y] : (Ds(e)[Za] || "0 0").split(" "), It = l.rotationOrigin = $r(e).apply({
        x: parseFloat(C[0]) || 0,
        y: parseFloat(C[1]) || 0
      }), Ct(!0, !0), F = l.pointerX - It.x - B, I = It.y - l.pointerY + b, V = l.x, U = l.y = Math.atan2(I, F) * Ic) : (U = N(u, "px"), V = N(c, "px"))), nt && y && (V > J ? V = J + (V - J) / y : V < rt && (V = rt - (rt - V) / y), a || (U > G ? U = G + (U - G) / y : U < st && (U = st - (st - U) / y))), l.startX = V = hr(V), l.startY = U = hr(U);
    }, ke = function() {
      return l.tween && l.tween.isActive();
    }, _i = function() {
      ir.parentNode && !ke() && !l.isDragging && ir.parentNode.removeChild(ir);
    }, De = function(y, B) {
      var b;
      if (!$ || l.isPressed || !y || (y.type === "mousedown" || y.type === "pointerdown") && !B && dr() - P < 30 && Ms[l.pointerEvent.type]) {
        Dt && y && $ && wi(y);
        return;
      }
      if (Se = ke(), Ue = !1, l.pointerEvent = y, Ms[y.type] ? (ft = ~y.type.indexOf("touch") ? y.currentTarget || y.target : q, we(ft, "touchend", Mt), we(ft, "touchmove", at), we(ft, "touchcancel", Mt), we(q, "touchstart", zc)) : (ft = null, we(q, "mousemove", at)), zt = null, (!_o || !ft) && (we(q, "mouseup", Mt), y && y.target && we(y.target, "mouseup", Mt)), dt = M.call(l, y.target) && i.dragClickables === !1 && !B, dt) {
        we(y.target, "change", Mt), ne(l, "pressInit", "onPressInit"), ne(l, "press", "onPress"), Qs(g, !0), Dt = !1;
        return;
      }
      if (A = !ft || h === d || l.vars.allowNativeTouchScrolling === !1 || l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2) ? !1 : h ? "y" : "x", Dt = !A && !l.allowEventDefault, Dt && (wi(y), we($t, "touchforcechange", wi)), y.changedTouches ? (y = Ut = y.changedTouches[0], wt = y.identifier) : y.pointerId ? wt = y.pointerId : Ut = wt = null, Mo++, Np(ie), et = l.pointerY = y.pageY, Z = l.pointerX = y.pageX, ne(l, "pressInit", "onPressInit"), (A || l.autoScroll) && ya(e.parentNode), e.parentNode && l.autoScroll && !H && !a && e.parentNode._gsMaxScrollX && !ir.parentNode && !e.getBBox && (ir.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(ir)), ge(), l.tween && l.tween.kill(), l.isThrowing = !1, St.killTweensOf(H || e, p, !0), H && St.killTweensOf(e, {
        scrollTo: 1
      }, !0), l.tween = l.lockedAxis = null, (i.zIndexBoost || !a && !H && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), l.isPressed = !0, ot = !!(i.onDrag || l._listeners.drag), v = !!(i.onMove || l._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (b = g.length; --b > -1; )
          St.set(g[b], {
            cursor: i.activeCursor || i.cursor || (ts === "grab" ? "grabbing" : ts)
          });
      ne(l, "press", "onPress");
    }, at = function(y) {
      var B = y, b, C, F, I, Y, R;
      if (!$ || ql || !l.isPressed || !y) {
        Dt && y && $ && wi(y);
        return;
      }
      if (l.pointerEvent = y, b = y.changedTouches, b) {
        if (y = b[0], y !== Ut && y.identifier !== wt) {
          for (I = b.length; --I > -1 && (y = b[I]).identifier !== wt && y.target !== e; )
            ;
          if (I < 0)
            return;
        }
      } else if (y.pointerId && wt && y.pointerId !== wt)
        return;
      if (ft && A && !zt && (bi.x = y.pageX - (D ? Cn(q) : 0), bi.y = y.pageY - (D ? En(q) : 0), lt && lt.apply(bi, bi), C = bi.x, F = bi.y, Y = Math.abs(C - Z), R = Math.abs(F - et), (Y !== R && (Y > f || R > f) || Jn && A === zt) && (zt = Y > R && h ? "x" : "y", A && zt !== A && we($t, "touchforcechange", wi), l.vars.lockAxisOnTouchScroll !== !1 && h && d && (l.lockedAxis = zt === "x" ? "y" : "x", pr(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, B)), Jn && A === zt))) {
        Mt(B);
        return;
      }
      !l.allowEventDefault && (!A || zt && A !== zt) && B.cancelable !== !1 ? (wi(B), Dt = !0) : Dt && (Dt = !1), l.autoScroll && (S = !0), Re(y.pageX, y.pageY, v);
    }, Re = function(y, B, b) {
      var C = 1 - l.dragResistance, F = 1 - l.edgeResistance, I = l.pointerX, Y = l.pointerY, R = U, W = l.x, tt = l.y, X = l.endX, ut = l.endY, bt = l.endRotation, Et = pt, gt, ht, Pt, ct, me, Vt;
      l.pointerX = y, l.pointerY = B, D && (y -= Cn(q), B -= En(q)), a ? (ct = Math.atan2(It.y - B, y - It.x) * Ic, me = l.y - ct, me > 180 ? (U -= 360, l.y = ct) : me < -180 && (U += 360, l.y = ct), l.x !== V || Math.max(Math.abs(Z - y), Math.abs(et - B)) > f ? (l.y = ct, Pt = V + (U - ct) * C) : Pt = V) : (lt && (Vt = y * lt.a + B * lt.c + lt.e, B = y * lt.b + B * lt.d + lt.f, y = Vt), ht = B - et, gt = y - Z, ht < f && ht > -f && (ht = 0), gt < f && gt > -f && (gt = 0), (l.lockAxis || l.lockedAxis) && (gt || ht) && (Vt = l.lockedAxis, Vt || (l.lockedAxis = Vt = h && Math.abs(gt) > Math.abs(ht) ? "y" : d ? "x" : null, Vt && pr(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, l.pointerEvent)), Vt === "y" ? ht = 0 : Vt === "x" && (gt = 0)), Pt = hr(V + gt * C), ct = hr(U + ht * C)), (ee || Rt || Yt) && (l.x !== Pt || l.y !== ct && !a) && (Yt && (ln.x = Pt, ln.y = ct, Vt = Yt(ln), Pt = hr(Vt.x), ct = hr(Vt.y)), ee && (Pt = hr(ee(Pt))), Rt && (ct = hr(Rt(ct)))), nt && (Pt > J ? Pt = J + Math.round((Pt - J) * F) : Pt < rt && (Pt = rt + Math.round((Pt - rt) * F)), a || (ct > G ? ct = Math.round(G + (ct - G) * F) : ct < st && (ct = Math.round(st + (ct - st) * F)))), (l.x !== Pt || l.y !== ct && !a) && (a ? (l.endRotation = l.x = l.endX = Pt, pt = !0) : (d && (l.y = l.endY = ct, pt = !0), h && (l.x = l.endX = Pt, pt = !0)), !b || ne(l, "move", "onMove") !== !1 ? !l.isDragging && l.isPressed && (l.isDragging = Ue = !0, ne(l, "dragstart", "onDragStart")) : (l.pointerX = I, l.pointerY = Y, U = R, l.x = W, l.y = tt, l.endX = X, l.endY = ut, l.endRotation = bt, pt = Et));
    }, Mt = function j(y, B) {
      if (!$ || !l.isPressed || y && wt != null && !B && (y.pointerId && y.pointerId !== wt && y.target !== e || y.changedTouches && !Fp(y.changedTouches, wt))) {
        Dt && y && $ && wi(y);
        return;
      }
      l.isPressed = !1;
      var b = y, C = l.isDragging, F = l.vars.allowContextMenu && y && (y.ctrlKey || y.which > 2), I = St.delayedCall(1e-3, _i), Y, R, W, tt, X;
      if (ft ? (he(ft, "touchend", j), he(ft, "touchmove", at), he(ft, "touchcancel", j), he(q, "touchstart", zc)) : he(q, "mousemove", at), he($t, "touchforcechange", wi), (!_o || !ft) && (he(q, "mouseup", j), y && y.target && he(y.target, "mouseup", j)), pt = !1, C && (_ = Lc = dr(), l.isDragging = !1), Rc(ie), dt && !F) {
        y && (he(y.target, "change", j), l.pointerEvent = b), Qs(g, !1), ne(l, "release", "onRelease"), ne(l, "click", "onClick"), dt = !1;
        return;
      }
      for (R = g.length; --R > -1; )
        va(g[R], "cursor", i.cursor || (i.cursor !== !1 ? ts : null));
      if (Mo--, y) {
        if (Y = y.changedTouches, Y && (y = Y[0], y !== Ut && y.identifier !== wt)) {
          for (R = Y.length; --R > -1 && (y = Y[R]).identifier !== wt && y.target !== e; )
            ;
          if (R < 0 && !B)
            return;
        }
        l.pointerEvent = b, l.pointerX = y.pageX, l.pointerY = y.pageY;
      }
      return F && b ? (wi(b), Dt = !0, ne(l, "release", "onRelease")) : b && !C ? (Dt = !1, Se && (i.snap || i.bounds) && $i(i.inertia || i.throwProps), ne(l, "release", "onRelease"), (!Jn || b.type !== "touchmove") && b.type.indexOf("cancel") === -1 && (ne(l, "click", "onClick"), dr() - P < 300 && ne(l, "doubleclick", "onDoubleClick"), tt = b.target || e, P = dr(), X = function() {
        P !== Ae && l.enabled() && !l.isPressed && !b.defaultPrevented && (tt.click ? tt.click() : q.createEvent && (W = q.createEvent("MouseEvents"), W.initMouseEvent("click", !0, !0, $t, 1, l.pointerEvent.screenX, l.pointerEvent.screenY, l.pointerX, l.pointerY, !1, !1, !1, !1, 0, null), tt.dispatchEvent(W)));
      }, !Jn && !b.defaultPrevented && St.delayedCall(0.05, X))) : ($i(i.inertia || i.throwProps), !l.allowEventDefault && b && (i.dragClickables !== !1 || !M.call(l, b.target)) && C && (!A || zt && A === zt) && b.cancelable !== !1 ? (Dt = !0, wi(b)) : Dt = !1, ne(l, "release", "onRelease")), ke() && I.duration(l.tween.duration()), C && ne(l, "dragend", "onDragEnd"), !0;
    }, Te = function(y) {
      if (y && l.isDragging && !H) {
        var B = y.target || e.parentNode, b = B.scrollLeft - B._gsScrollX, C = B.scrollTop - B._gsScrollY;
        (b || C) && (lt ? (Z -= b * lt.a + C * lt.c, et -= C * lt.d + b * lt.b) : (Z -= b, et -= C), B._gsScrollX += b, B._gsScrollY += C, Re(l.pointerX, l.pointerY));
      }
    }, Jt = function(y) {
      var B = dr(), b = B - P < 100, C = B - _ < 50, F = b && Ae === P, I = l.pointerEvent && l.pointerEvent.defaultPrevented, Y = b && Lt === P, R = y.isTrusted || y.isTrusted == null && b && F;
      if ((F || C && l.vars.suppressClickOnDrag !== !1) && y.stopImmediatePropagation && y.stopImmediatePropagation(), b && !(l.pointerEvent && l.pointerEvent.defaultPrevented) && (!F || R && !Y)) {
        R && F && (Lt = P), Ae = P;
        return;
      }
      (l.isPressed || C || b) && (!R || !y.detail || !b || I) && wi(y), !b && !C && !Ue && (y && y.target && (l.pointerEvent = y), ne(l, "click", "onClick"));
    }, yi = function(y) {
      return lt ? {
        x: y.x * lt.a + y.y * lt.c + lt.e,
        y: y.x * lt.b + y.y * lt.d + lt.f
      } : {
        x: y.x,
        y: y.y
      };
    };
    return jt = t.get(e), jt && jt.kill(), r.startDrag = function(j, y) {
      var B, b, C, F;
      De(j || l.pointerEvent, !0), y && !l.hitTest(j || l.pointerEvent) && (B = cn(j || l.pointerEvent), b = cn(e), C = yi({
        x: B.left + B.width / 2,
        y: B.top + B.height / 2
      }), F = yi({
        x: b.left + b.width / 2,
        y: b.top + b.height / 2
      }), Z -= C.x - F.x, et -= C.y - F.y), l.isDragging || (l.isDragging = Ue = !0, ne(l, "dragstart", "onDragStart"));
    }, r.drag = at, r.endDrag = function(j) {
      return Mt(j || l.pointerEvent, !0);
    }, r.timeSinceDrag = function() {
      return l.isDragging ? 0 : (dr() - _) / 1e3;
    }, r.timeSinceClick = function() {
      return (dr() - P) / 1e3;
    }, r.hitTest = function(j, y) {
      return t.hitTest(l.target, j, y);
    }, r.getDirection = function(j, y) {
      var B = j === "velocity" && Ii ? j : ds(j) && !a ? "element" : "start", b, C, F, I, Y, R;
      return B === "element" && (Y = cn(l.target), R = cn(j)), b = B === "start" ? l.x - V : B === "velocity" ? Ii.getVelocity(e, c) : Y.left + Y.width / 2 - (R.left + R.width / 2), a ? b < 0 ? "counter-clockwise" : "clockwise" : (y = y || 2, C = B === "start" ? l.y - U : B === "velocity" ? Ii.getVelocity(e, u) : Y.top + Y.height / 2 - (R.top + R.height / 2), F = Math.abs(b / C), I = F < 1 / y ? "" : b < 0 ? "left" : "right", F < y && (I !== "" && (I += "-"), I += C < 0 ? "up" : "down"), I);
    }, r.applyBounds = function(j, y) {
      var B, b, C, F, I, Y;
      if (j && i.bounds !== j)
        return i.bounds = j, l.update(!0, y);
      if (Ct(!0), Me(), nt && !ke()) {
        if (B = l.x, b = l.y, B > J ? B = J : B < rt && (B = rt), b > G ? b = G : b < st && (b = st), (l.x !== B || l.y !== b) && (C = !0, l.x = l.endX = B, a ? l.endRotation = B : l.y = l.endY = b, pt = !0, ie(!0), l.autoScroll && !l.isDragging))
          for (ya(e.parentNode), F = e, Ji.scrollTop = $t.pageYOffset != null ? $t.pageYOffset : q.documentElement.scrollTop != null ? q.documentElement.scrollTop : q.body.scrollTop, Ji.scrollLeft = $t.pageXOffset != null ? $t.pageXOffset : q.documentElement.scrollLeft != null ? q.documentElement.scrollLeft : q.body.scrollLeft; F && !Y; )
            Y = $n(F.parentNode), I = Y ? Ji : F.parentNode, d && I.scrollTop > I._gsMaxScrollY && (I.scrollTop = I._gsMaxScrollY), h && I.scrollLeft > I._gsMaxScrollX && (I.scrollLeft = I._gsMaxScrollX), F = I;
        l.isThrowing && (C || l.endX > J || l.endX < rt || l.endY > G || l.endY < st) && $i(i.inertia || i.throwProps, C);
      }
      return l;
    }, r.update = function(j, y, B) {
      if (y && l.isPressed) {
        var b = $r(e), C = ae.apply({
          x: l.x - V,
          y: l.y - U
        }), F = $r(e.parentNode, !0);
        F.apply({
          x: b.e - C.x,
          y: b.f - C.y
        }, C), l.x -= C.x - F.e, l.y -= C.y - F.f, ie(!0), ge();
      }
      var I = l.x, Y = l.y;
      return Je(!y), j ? l.applyBounds() : (pt && B && ie(!0), Ct(!0)), y && (Re(l.pointerX, l.pointerY), pt && ie(!0)), l.isPressed && !y && (h && Math.abs(I - l.x) > 0.01 || d && Math.abs(Y - l.y) > 0.01 && !a) && ge(), l.autoScroll && (ya(e.parentNode, l.isDragging), S = l.isDragging, ie(!0), $c(e, Te), Nc(e, Te)), l;
    }, r.enable = function(j) {
      var y = {
        lazy: !0
      }, B, b, C;
      if (i.cursor !== !1 && (y.cursor = i.cursor || ts), St.utils.checkPrefix("touchCallout") && (y.touchCallout = "none"), j !== "soft") {
        for (Mc(g, h === d ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), b = g.length; --b > -1; )
          C = g[b], _o || we(C, "mousedown", De), we(C, "touchstart", De), we(C, "click", Jt, !0), St.set(C, y), C.getBBox && C.ownerSVGElement && h !== d && St.set(C.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || we(C, "contextmenu", Wt);
        Qs(g, !1);
      }
      return Nc(e, Te), $ = !0, Ii && j !== "soft" && Ii.track(H || e, s ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = B = e._gsDragID || "d" + Dp++, Tn[B] = l, H && (H.enable(), H.element._gsDragID = B), (i.bounds || a) && ge(), i.bounds && l.applyBounds(), l;
    }, r.disable = function(j) {
      for (var y = l.isDragging, B = g.length, b; --B > -1; )
        va(g[B], "cursor", null);
      if (j !== "soft") {
        for (Mc(g, null), B = g.length; --B > -1; )
          b = g[B], va(b, "touchCallout", null), he(b, "mousedown", De), he(b, "touchstart", De), he(b, "click", Jt, !0), he(b, "contextmenu", Wt);
        Qs(g, !0), ft && (he(ft, "touchcancel", Mt), he(ft, "touchend", Mt), he(ft, "touchmove", at)), he(q, "mouseup", Mt), he(q, "mousemove", at);
      }
      return $c(e, Te), $ = !1, Ii && j !== "soft" && (Ii.untrack(H || e, s ? "x,y" : a ? "rotation" : "top,left"), l.tween && l.tween.kill()), H && H.disable(), Rc(ie), l.isDragging = l.isPressed = dt = !1, y && ne(l, "dragend", "onDragEnd"), l;
    }, r.enabled = function(j, y) {
      return arguments.length ? j ? l.enable(y) : l.disable(y) : $;
    }, r.kill = function() {
      return l.isThrowing = !1, l.tween && l.tween.kill(), l.disable(), St.set(g, {
        clearProps: "userSelect"
      }), delete Tn[e._gsDragID], l;
    }, r.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~n.indexOf("scroll") && (H = r.scrollProxy = new Up(e, zp({
      onKill: function() {
        l.isPressed && Mt(null);
      }
    }, i)), e.style.overflowY = d && !ja ? "auto" : "hidden", e.style.overflowX = h && !ja ? "auto" : "hidden", e = H.content), a ? p.rotation = 1 : (h && (p[c] = 1), d && (p[u] = 1)), O.force3D = "force3D" in i ? i.force3D : !0, Ph(kc(r)), r.enable(), r;
  }
  return t.register = function(i) {
    St = i, ba();
  }, t.create = function(i, r) {
    return Ka || ba(!0), yr(i).map(function(n) {
      return new t(n, r);
    });
  }, t.get = function(i) {
    return Tn[(yr(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (dr() - Lc) / 1e3;
  }, t.hitTest = function(i, r, n) {
    if (i === r)
      return !1;
    var s = cn(i), a = cn(r), c = s.top, u = s.left, h = s.right, d = s.bottom, f = s.width, l = s.height, g = a.left > h || a.right < u || a.top > d || a.bottom < c, p, _, S;
    return g || !n ? !g : (S = (n + "").indexOf("%") !== -1, n = parseFloat(n) || 0, p = {
      left: Math.max(u, a.left),
      top: Math.max(c, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(d, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : S ? (n *= 0.01, _ = p.width * p.height, _ >= f * l * n || _ >= a.width * a.height * n) : p.width > n && p.height > n);
  }, t;
}(Wp);
$p(Go.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
Go.zIndex = 1e3;
Go.version = "3.13.0";
Oh() && St.registerPlugin(Go);
function Vp(o, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(o, i.key, i);
  }
}
function Xp(o, t, e) {
  return t && Vp(o.prototype, t), o;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ie, vo, di, vr, wr, Pn, Mh, zr, ps, Dh, or, Li, Rh, zh = function() {
  return Ie || typeof window < "u" && (Ie = window.gsap) && Ie.registerPlugin && Ie;
}, Nh = 1, vn = [], yt = [], Xi = [], gs = Date.now, tl = function(t, e) {
  return e;
}, Gp = function() {
  var t = ps.core, e = t.bridge || {}, i = t._scrollers, r = t._proxies;
  i.push.apply(i, yt), r.push.apply(r, Xi), yt = i, Xi = r, tl = function(s, a) {
    return e[s](a);
  };
}, Sr = function(t, e) {
  return ~Xi.indexOf(t) && Xi[Xi.indexOf(t) + 1][e];
}, ms = function(t) {
  return !!~Dh.indexOf(t);
}, Xe = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: r !== !1,
    capture: !!n
  });
}, Ve = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, Zs = "scrollLeft", Js = "scrollTop", el = function() {
  return or && or.isPressed || yt.cache++;
}, Do = function(t, e) {
  var i = function r(n) {
    if (n || n === 0) {
      Nh && (di.history.scrollRestoration = "manual");
      var s = or && or.isPressed;
      n = r.v = Math.round(n) || (or && or.iOS ? 1 : 0), t(n), r.cacheID = yt.cache, s && tl("ss", n);
    } else (e || yt.cache !== r.cacheID || tl("ref")) && (r.cacheID = yt.cache, r.v = t());
    return r.v + r.offset;
  };
  return i.offset = 0, t && i;
}, Ze = {
  s: Zs,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Do(function(o) {
    return arguments.length ? di.scrollTo(o, xe.sc()) : di.pageXOffset || vr[Zs] || wr[Zs] || Pn[Zs] || 0;
  })
}, xe = {
  s: Js,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Ze,
  sc: Do(function(o) {
    return arguments.length ? di.scrollTo(Ze.sc(), o) : di.pageYOffset || vr[Js] || wr[Js] || Pn[Js] || 0;
  })
}, ti = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Ie.utils.toArray)(t)[0] || (typeof t == "string" && Ie.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Kp = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Ar = function(t, e) {
  var i = e.s, r = e.sc;
  ms(t) && (t = vr.scrollingElement || wr);
  var n = yt.indexOf(t), s = r === xe.sc ? 1 : 2;
  !~n && (n = yt.push(t) - 1), yt[n + s] || Xe(t, "scroll", el);
  var a = yt[n + s], c = a || (yt[n + s] = Do(Sr(t, i), !0) || (ms(t) ? r : Do(function(u) {
    return arguments.length ? t[i] = u : t[i];
  })));
  return c.target = t, a || (c.smooth = Ie.getProperty(t, "scrollBehavior") === "smooth"), c;
}, il = function(t, e, i) {
  var r = t, n = t, s = gs(), a = s, c = e || 50, u = Math.max(500, c * 3), h = function(g, p) {
    var _ = gs();
    p || _ - s > c ? (n = r, r = g, a = s, s = _) : i ? r += g : r = n + (g - n) / (_ - a) * (s - a);
  }, d = function() {
    n = r = i ? 0 : r, a = s = 0;
  }, f = function(g) {
    var p = a, _ = n, S = gs();
    return (g || g === 0) && g !== r && h(g), s === a || S - a > u ? 0 : (r + (i ? _ : -_)) / ((i ? S : s) - p) * 1e3;
  };
  return {
    update: h,
    reset: d,
    getVelocity: f
  };
}, Un = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Hc = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, $h = function() {
  ps = Ie.core.globals().ScrollTrigger, ps && ps.core && Gp();
}, Fh = function(t) {
  return Ie = t || zh(), !vo && Ie && typeof document < "u" && document.body && (di = window, vr = document, wr = vr.documentElement, Pn = vr.body, Dh = [di, vr, wr, Pn], Ie.utils.clamp, Rh = Ie.core.context || function() {
  }, zr = "onpointerenter" in Pn ? "pointer" : "mouse", Mh = oe.isTouch = di.matchMedia && di.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in di || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Li = oe.eventTypes = ("ontouchstart" in wr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in wr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Nh = 0;
  }, 500), $h(), vo = 1), vo;
};
Ze.op = xe;
yt.cache = 0;
var oe = /* @__PURE__ */ function() {
  function o(e) {
    this.init(e);
  }
  var t = o.prototype;
  return t.init = function(i) {
    vo || Fh(Ie) || console.warn("Please gsap.registerPlugin(Observer)"), ps || $h();
    var r = i.tolerance, n = i.dragMinimum, s = i.type, a = i.target, c = i.lineHeight, u = i.debounce, h = i.preventDefault, d = i.onStop, f = i.onStopDelay, l = i.ignore, g = i.wheelSpeed, p = i.event, _ = i.onDragStart, S = i.onDragEnd, E = i.onDrag, k = i.onPress, T = i.onRelease, x = i.onRight, M = i.onLeft, P = i.onUp, O = i.onDown, D = i.onChangeX, N = i.onChangeY, q = i.onChange, $ = i.onToggleX, H = i.onToggleY, Z = i.onHover, et = i.onHoverEnd, V = i.onMove, U = i.ignoreCheck, nt = i.isNormalizer, ot = i.onGestureStart, v = i.onGestureEnd, J = i.onWheel, rt = i.onEnable, G = i.onDisable, st = i.onClick, Ut = i.scrollSpeed, wt = i.capture, It = i.allowClicks, pt = i.lockAxis, jt = i.onLockAxis;
    this.target = a = ti(a) || wr, this.vars = i, l && (l = Ie.utils.toArray(l)), r = r || 1e-9, n = n || 0, g = g || 1, Ut = Ut || 1, s = s || "wheel,touch,pointer", u = u !== !1, c || (c = parseFloat(di.getComputedStyle(Pn).lineHeight) || 22);
    var ee, Rt, Yt, dt, ft, lt, Se, A = this, zt = 0, qe = 0, Ae = i.passive || !h && i.passive !== !1, Lt = Ar(a, Ze), Dt = Ar(a, xe), ae = Lt(), Ue = Dt(), Wt = ~s.indexOf("touch") && !~s.indexOf("pointer") && Li[0] === "pointerdown", ie = ms(a), Ct = a.ownerDocument || vr, le = [0, 0, 0], Oe = [0, 0, 0], Me = 0, Ni = function() {
      return Me = gs();
    }, qt = function(C, F) {
      return (A.event = C) && l && Kp(C.target, l) || F && Wt && C.pointerType !== "touch" || U && U(C, F);
    }, $i = function() {
      A._vx.reset(), A._vy.reset(), Rt.pause(), d && d(A);
    }, Je = function() {
      var C = A.deltaX = Hc(le), F = A.deltaY = Hc(Oe), I = Math.abs(C) >= r, Y = Math.abs(F) >= r;
      q && (I || Y) && q(A, C, F, le, Oe), I && (x && A.deltaX > 0 && x(A), M && A.deltaX < 0 && M(A), D && D(A), $ && A.deltaX < 0 != zt < 0 && $(A), zt = A.deltaX, le[0] = le[1] = le[2] = 0), Y && (O && A.deltaY > 0 && O(A), P && A.deltaY < 0 && P(A), N && N(A), H && A.deltaY < 0 != qe < 0 && H(A), qe = A.deltaY, Oe[0] = Oe[1] = Oe[2] = 0), (dt || Yt) && (V && V(A), Yt && (_ && Yt === 1 && _(A), E && E(A), Yt = 0), dt = !1), lt && !(lt = !1) && jt && jt(A), ft && (J(A), ft = !1), ee = 0;
    }, ge = function(C, F, I) {
      le[I] += C, Oe[I] += F, A._vx.update(C), A._vy.update(F), u ? ee || (ee = requestAnimationFrame(Je)) : Je();
    }, ke = function(C, F) {
      pt && !Se && (A.axis = Se = Math.abs(C) > Math.abs(F) ? "x" : "y", lt = !0), Se !== "y" && (le[2] += C, A._vx.update(C, !0)), Se !== "x" && (Oe[2] += F, A._vy.update(F, !0)), u ? ee || (ee = requestAnimationFrame(Je)) : Je();
    }, _i = function(C) {
      if (!qt(C, 1)) {
        C = Un(C, h);
        var F = C.clientX, I = C.clientY, Y = F - A.x, R = I - A.y, W = A.isDragging;
        A.x = F, A.y = I, (W || (Y || R) && (Math.abs(A.startX - F) >= n || Math.abs(A.startY - I) >= n)) && (Yt = W ? 2 : 1, W || (A.isDragging = !0), ke(Y, R));
      }
    }, De = A.onPress = function(b) {
      qt(b, 1) || b && b.button || (A.axis = Se = null, Rt.pause(), A.isPressed = !0, b = Un(b), zt = qe = 0, A.startX = A.x = b.clientX, A.startY = A.y = b.clientY, A._vx.reset(), A._vy.reset(), Xe(nt ? a : Ct, Li[1], _i, Ae, !0), A.deltaX = A.deltaY = 0, k && k(A));
    }, at = A.onRelease = function(b) {
      if (!qt(b, 1)) {
        Ve(nt ? a : Ct, Li[1], _i, !0);
        var C = !isNaN(A.y - A.startY), F = A.isDragging, I = F && (Math.abs(A.x - A.startX) > 3 || Math.abs(A.y - A.startY) > 3), Y = Un(b);
        !I && C && (A._vx.reset(), A._vy.reset(), h && It && Ie.delayedCall(0.08, function() {
          if (gs() - Me > 300 && !b.defaultPrevented) {
            if (b.target.click)
              b.target.click();
            else if (Ct.createEvent) {
              var R = Ct.createEvent("MouseEvents");
              R.initMouseEvent("click", !0, !0, di, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), b.target.dispatchEvent(R);
            }
          }
        })), A.isDragging = A.isGesturing = A.isPressed = !1, d && F && !nt && Rt.restart(!0), Yt && Je(), S && F && S(A), T && T(A, I);
      }
    }, Re = function(C) {
      return C.touches && C.touches.length > 1 && (A.isGesturing = !0) && ot(C, A.isDragging);
    }, Mt = function() {
      return (A.isGesturing = !1) || v(A);
    }, Te = function(C) {
      if (!qt(C)) {
        var F = Lt(), I = Dt();
        ge((F - ae) * Ut, (I - Ue) * Ut, 1), ae = F, Ue = I, d && Rt.restart(!0);
      }
    }, Jt = function(C) {
      if (!qt(C)) {
        C = Un(C, h), J && (ft = !0);
        var F = (C.deltaMode === 1 ? c : C.deltaMode === 2 ? di.innerHeight : 1) * g;
        ge(C.deltaX * F, C.deltaY * F, 0), d && !nt && Rt.restart(!0);
      }
    }, yi = function(C) {
      if (!qt(C)) {
        var F = C.clientX, I = C.clientY, Y = F - A.x, R = I - A.y;
        A.x = F, A.y = I, dt = !0, d && Rt.restart(!0), (Y || R) && ke(Y, R);
      }
    }, j = function(C) {
      A.event = C, Z(A);
    }, y = function(C) {
      A.event = C, et(A);
    }, B = function(C) {
      return qt(C) || Un(C, h) && st(A);
    };
    Rt = A._dc = Ie.delayedCall(f || 0.25, $i).pause(), A.deltaX = A.deltaY = 0, A._vx = il(0, 50, !0), A._vy = il(0, 50, !0), A.scrollX = Lt, A.scrollY = Dt, A.isDragging = A.isGesturing = A.isPressed = !1, Rh(this), A.enable = function(b) {
      return A.isEnabled || (Xe(ie ? Ct : a, "scroll", el), s.indexOf("scroll") >= 0 && Xe(ie ? Ct : a, "scroll", Te, Ae, wt), s.indexOf("wheel") >= 0 && Xe(a, "wheel", Jt, Ae, wt), (s.indexOf("touch") >= 0 && Mh || s.indexOf("pointer") >= 0) && (Xe(a, Li[0], De, Ae, wt), Xe(Ct, Li[2], at), Xe(Ct, Li[3], at), It && Xe(a, "click", Ni, !0, !0), st && Xe(a, "click", B), ot && Xe(Ct, "gesturestart", Re), v && Xe(Ct, "gestureend", Mt), Z && Xe(a, zr + "enter", j), et && Xe(a, zr + "leave", y), V && Xe(a, zr + "move", yi)), A.isEnabled = !0, A.isDragging = A.isGesturing = A.isPressed = dt = Yt = !1, A._vx.reset(), A._vy.reset(), ae = Lt(), Ue = Dt(), b && b.type && De(b), rt && rt(A)), A;
    }, A.disable = function() {
      A.isEnabled && (vn.filter(function(b) {
        return b !== A && ms(b.target);
      }).length || Ve(ie ? Ct : a, "scroll", el), A.isPressed && (A._vx.reset(), A._vy.reset(), Ve(nt ? a : Ct, Li[1], _i, !0)), Ve(ie ? Ct : a, "scroll", Te, wt), Ve(a, "wheel", Jt, wt), Ve(a, Li[0], De, wt), Ve(Ct, Li[2], at), Ve(Ct, Li[3], at), Ve(a, "click", Ni, !0), Ve(a, "click", B), Ve(Ct, "gesturestart", Re), Ve(Ct, "gestureend", Mt), Ve(a, zr + "enter", j), Ve(a, zr + "leave", y), Ve(a, zr + "move", yi), A.isEnabled = A.isPressed = A.isDragging = !1, G && G(A));
    }, A.kill = A.revert = function() {
      A.disable();
      var b = vn.indexOf(A);
      b >= 0 && vn.splice(b, 1), or === A && (or = 0);
    }, vn.push(A), nt && ms(a) && (or = A), A.enable(p);
  }, Xp(o, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), o;
}();
oe.version = "3.13.0";
oe.create = function(o) {
  return new oe(o);
};
oe.register = Fh;
oe.getAll = function() {
  return vn.slice();
};
oe.getById = function(o) {
  return vn.filter(function(t) {
    return t.vars.id === o;
  })[0];
};
zh() && Ie.registerPlugin(oe);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Fe, Bh, ar, Ui, Tr, Hh, An, to, Yh = function() {
  return typeof window < "u";
}, qh = function() {
  return Fe || Yh() && (Fe = window.gsap) && Fe.registerPlugin && Fe;
}, Uh = function(t) {
  return typeof t == "string";
}, Yc = function(t) {
  return typeof t == "function";
}, Rs = function(t, e) {
  var i = e === "x" ? "Width" : "Height", r = "scroll" + i, n = "client" + i;
  return t === ar || t === Ui || t === Tr ? Math.max(Ui[r], Tr[r]) - (ar["inner" + i] || Ui[n] || Tr[n]) : t[r] - t["offset" + i];
}, zs = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === ar && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = Ui[i] != null ? Ui : Tr), function() {
    return t[i];
  };
}, jp = function(t, e, i, r) {
  if (Yc(t) && (t = t(e, i, r)), typeof t != "object")
    return Uh(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
  var n = {}, s;
  for (s in t)
    n[s] = s !== "onAutoKill" && Yc(t[s]) ? t[s](e, i, r) : t[s];
  return n;
}, Wh = function(t, e) {
  if (t = Hh(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), r = !e || e === ar || e === Tr, n = r ? {
    top: Ui.clientTop - (ar.pageYOffset || Ui.scrollTop || Tr.scrollTop || 0),
    left: Ui.clientLeft - (ar.pageXOffset || Ui.scrollLeft || Tr.scrollLeft || 0)
  } : e.getBoundingClientRect(), s = {
    x: i.left - n.left,
    y: i.top - n.top
  };
  return !r && e && (s.x += zs(e, "x")(), s.y += zs(e, "y")()), s;
}, qc = function(t, e, i, r, n) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - n : Uh(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + r - n : t === "max" ? Rs(e, i) - n : Math.min(Rs(e, i), Wh(t, e)[i] - n);
}, rl = function() {
  Fe = qh(), Yh() && Fe && typeof document < "u" && document.body && (ar = window, Tr = document.body, Ui = document.documentElement, Hh = Fe.utils.toArray, Fe.config({
    autoKillThreshold: 7
  }), An = Fe.config(), Bh = 1);
}, rn = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    Fe = t, rl();
  },
  init: function(t, e, i, r, n) {
    Bh || rl();
    var s = this, a = Fe.getProperty(t, "scrollSnapType");
    s.isWin = t === ar, s.target = t, s.tween = i, e = jp(e, r, t, n), s.vars = e, s.autoKill = !!("autoKill" in e ? e : An).autoKill, s.getX = zs(t, "x"), s.getY = zs(t, "y"), s.x = s.xPrev = s.getX(), s.y = s.yPrev = s.getY(), to || (to = Fe.core.globals().ScrollTrigger), Fe.getProperty(t, "scrollBehavior") === "smooth" && Fe.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (s.snap = 1, s.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (s.add(s, "x", s.x, qc(e.x, t, "x", s.x, e.offsetX || 0), r, n), s._props.push("scrollTo_x")) : s.skipX = 1, e.y != null ? (s.add(s, "y", s.y, qc(e.y, t, "y", s.y, e.offsetY || 0), r, n), s._props.push("scrollTo_y")) : s.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, r = e.target, n = e.tween, s = e.autoKill, a = e.xPrev, c = e.yPrev, u = e.isWin, h = e.snap, d = e.snapInline, f, l, g, p, _; i; )
      i.r(t, i.d), i = i._next;
    f = u || !e.skipX ? e.getX() : a, l = u || !e.skipY ? e.getY() : c, g = l - c, p = f - a, _ = An.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), s && (!e.skipX && (p > _ || p < -_) && f < Rs(r, "x") && (e.skipX = 1), !e.skipY && (g > _ || g < -_) && l < Rs(r, "y") && (e.skipY = 1), e.skipX && e.skipY && (n.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(n, e.vars.onAutoKillParams || []))), u ? ar.scrollTo(e.skipX ? f : e.x, e.skipY ? l : e.y) : (e.skipY || (r.scrollTop = e.y), e.skipX || (r.scrollLeft = e.x)), h && (t === 1 || t === 0) && (l = r.scrollTop, f = r.scrollLeft, d ? r.style.scrollSnapType = d : r.style.removeProperty("scroll-snap-type"), r.scrollTop = l + 1, r.scrollLeft = f + 1, r.scrollTop = l, r.scrollLeft = f), e.xPrev = e.x, e.yPrev = e.y, to && to.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
rn.max = Rs;
rn.getOffset = Wh;
rn.buildGetter = zs;
rn.config = function(o) {
  An || rl() || (An = Fe.config());
  for (var t in o)
    An[t] = o[t];
};
qh() && Fe.registerPlugin(rn);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var K, pn, _t, Ft, ci, kt, Ul, Ro, Ns, _s, es, eo, ze, Ko, nl, Ke, Uc, Wc, gn, Vh, xa, Xh, Ge, sl, Gh, Kh, fr, ol, Wl, On, Vl, zo, al, Sa, io = 1, Ne = Date.now, Ta = Ne(), Pi = 0, is = 0, Vc = function(t, e, i) {
  var r = ai(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Xc = function(t, e) {
  return e && (!ai(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, Qp = function o() {
  return is && requestAnimationFrame(o);
}, Gc = function() {
  return Ko = 1;
}, Kc = function() {
  return Ko = 0;
}, Bi = function(t) {
  return t;
}, rs = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, jh = function() {
  return typeof window < "u";
}, Qh = function() {
  return K || jh() && (K = window.gsap) && K.registerPlugin && K;
}, Zr = function(t) {
  return !!~Ul.indexOf(t);
}, Zh = function(t) {
  return (t === "Height" ? Vl : _t["inner" + t]) || ci["client" + t] || kt["client" + t];
}, Jh = function(t) {
  return Sr(t, "getBoundingClientRect") || (Zr(t) ? function() {
    return To.width = _t.innerWidth, To.height = Vl, To;
  } : function() {
    return rr(t);
  });
}, Zp = function(t, e, i) {
  var r = i.d, n = i.d2, s = i.a;
  return (s = Sr(t, "getBoundingClientRect")) ? function() {
    return s()[r];
  } : function() {
    return (e ? Zh(n) : t["client" + n]) || 0;
  };
}, Jp = function(t, e) {
  return !e || ~Xi.indexOf(t) ? Jh(t) : function() {
    return To;
  };
}, Wi = function(t, e) {
  var i = e.s, r = e.d2, n = e.d, s = e.a;
  return Math.max(0, (i = "scroll" + r) && (s = Sr(t, i)) ? s() - Jh(t)()[n] : Zr(t) ? (ci[i] || kt[i]) - Zh(r) : t[i] - t["offset" + r]);
}, ro = function(t, e) {
  for (var i = 0; i < gn.length; i += 3)
    (!e || ~e.indexOf(gn[i + 1])) && t(gn[i], gn[i + 1], gn[i + 2]);
}, ai = function(t) {
  return typeof t == "string";
}, Be = function(t) {
  return typeof t == "function";
}, ns = function(t) {
  return typeof t == "number";
}, Nr = function(t) {
  return typeof t == "object";
}, Wn = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, Ea = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, un = Math.abs, td = "left", ed = "top", Xl = "right", Gl = "bottom", Xr = "width", Gr = "height", ys = "Right", vs = "Left", ws = "Top", bs = "Bottom", de = "padding", Si = "margin", Fn = "Width", Kl = "Height", ve = "px", Ti = function(t) {
  return _t.getComputedStyle(t);
}, tg = function(t) {
  var e = Ti(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, jc = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, rr = function(t, e) {
  var i = e && Ti(t)[nl] !== "matrix(1, 0, 0, 1, 0, 0)" && K.to(t, {
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
}, No = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, id = function(t) {
  var e = [], i = t.labels, r = t.duration(), n;
  for (n in i)
    e.push(i[n] / r);
  return e;
}, eg = function(t) {
  return function(e) {
    return K.utils.snap(id(t), e);
  };
}, jl = function(t) {
  var e = K.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return i ? function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var a;
    if (!n)
      return e(r);
    if (n > 0) {
      for (r -= s, a = 0; a < i.length; a++)
        if (i[a] >= r)
          return i[a];
      return i[a - 1];
    } else
      for (a = i.length, r += s; a--; )
        if (i[a] <= r)
          return i[a];
    return i[0];
  } : function(r, n, s) {
    s === void 0 && (s = 1e-3);
    var a = e(r);
    return !n || Math.abs(a - r) < s || a - r < 0 == n < 0 ? a : e(n < 0 ? r - t : r + t);
  };
}, ig = function(t) {
  return function(e, i) {
    return jl(id(t))(e, i.direction);
  };
}, no = function(t, e, i, r) {
  return i.split(",").forEach(function(n) {
    return t(e, n, r);
  });
}, Ce = function(t, e, i, r, n) {
  return t.addEventListener(e, i, {
    passive: !r,
    capture: !!n
  });
}, Ee = function(t, e, i, r) {
  return t.removeEventListener(e, i, !!r);
}, so = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Qc = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, oo = {
  toggleActions: "play",
  anticipatePin: 0
}, $o = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, wo = function(t, e) {
  if (ai(t)) {
    var i = t.indexOf("="), r = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (r *= e / 100), t = t.substr(0, i - 1)), t = r + (t in $o ? $o[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, ao = function(t, e, i, r, n, s, a, c) {
  var u = n.startColor, h = n.endColor, d = n.fontSize, f = n.indent, l = n.fontWeight, g = Ft.createElement("div"), p = Zr(i) || Sr(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, S = p ? kt : i, E = t.indexOf("start") !== -1, k = E ? u : h, T = "border-color:" + k + ";font-size:" + d + ";color:" + k + ";font-weight:" + l + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((_ || c) && p ? "fixed;" : "absolute;"), (_ || c || !p) && (T += (r === xe ? Xl : Gl) + ":" + (s + parseFloat(f)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = E, g.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), g.style.cssText = T, g.innerText = e || e === 0 ? t + "-" + e : t, S.children[0] ? S.insertBefore(g, S.children[0]) : S.appendChild(g), g._offset = g["offset" + r.op.d2], bo(g, 0, r, E), g;
}, bo = function(t, e, i, r) {
  var n = {
    display: "block"
  }, s = i[r ? "os2" : "p2"], a = i[r ? "p2" : "os2"];
  t._isFlipped = r, n[i.a + "Percent"] = r ? -100 : 0, n[i.a] = r ? "1px" : 0, n["border" + s + Fn] = 1, n["border" + a + Fn] = 0, n[i.p] = e + "px", K.set(t, n);
}, mt = [], ll = {}, $s, Zc = function() {
  return Ne() - Pi > 34 && ($s || ($s = requestAnimationFrame(lr)));
}, hn = function() {
  (!Ge || !Ge.isPressed || Ge.startX > kt.clientWidth) && (yt.cache++, Ge ? $s || ($s = requestAnimationFrame(lr)) : lr(), Pi || tn("scrollStart"), Pi = Ne());
}, Ca = function() {
  Kh = _t.innerWidth, Gh = _t.innerHeight;
}, ss = function(t) {
  yt.cache++, (t === !0 || !ze && !Xh && !Ft.fullscreenElement && !Ft.webkitFullscreenElement && (!sl || Kh !== _t.innerWidth || Math.abs(_t.innerHeight - Gh) > _t.innerHeight * 0.25)) && Ro.restart(!0);
}, Jr = {}, rg = [], rd = function o() {
  return Ee(vt, "scrollEnd", o) || Br(!0);
}, tn = function(t) {
  return Jr[t] && Jr[t].map(function(e) {
    return e();
  }) || rg;
}, oi = [], nd = function(t) {
  for (var e = 0; e < oi.length; e += 5)
    (!t || oi[e + 4] && oi[e + 4].query === t) && (oi[e].style.cssText = oi[e + 1], oi[e].getBBox && oi[e].setAttribute("transform", oi[e + 2] || ""), oi[e + 3].uncache = 1);
}, Ql = function(t, e) {
  var i;
  for (Ke = 0; Ke < mt.length; Ke++)
    i = mt[Ke], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  zo = !0, e && nd(e), e || tn("revert");
}, sd = function(t, e) {
  yt.cache++, (e || !je) && yt.forEach(function(i) {
    return Be(i) && i.cacheID++ && (i.rec = 0);
  }), ai(t) && (_t.history.scrollRestoration = Wl = t);
}, je, Kr = 0, Jc, ng = function() {
  if (Jc !== Kr) {
    var t = Jc = Kr;
    requestAnimationFrame(function() {
      return t === Kr && Br(!0);
    });
  }
}, od = function() {
  kt.appendChild(On), Vl = !Ge && On.offsetHeight || _t.innerHeight, kt.removeChild(On);
}, tu = function(t) {
  return Ns(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, Br = function(t, e) {
  if (ci = Ft.documentElement, kt = Ft.body, Ul = [_t, Ft, ci, kt], Pi && !t && !zo) {
    Ce(vt, "scrollEnd", rd);
    return;
  }
  od(), je = vt.isRefreshing = !0, yt.forEach(function(r) {
    return Be(r) && ++r.cacheID && (r.rec = r());
  });
  var i = tn("refreshInit");
  Vh && vt.sort(), e || Ql(), yt.forEach(function(r) {
    Be(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), mt.slice(0).forEach(function(r) {
    return r.refresh();
  }), zo = !1, mt.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", s = r.pin[n];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[n] - s), r.refresh();
    }
  }), al = 1, tu(!0), mt.forEach(function(r) {
    var n = Wi(r.scroller, r._dir), s = r.vars.end === "max" || r._endClamp && r.end > n, a = r._startClamp && r.start >= n;
    (s || a) && r.setPositions(a ? n - 1 : r.start, s ? Math.max(a ? n : r.start + 1, n) : r.end, !0);
  }), tu(!1), al = 0, i.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), yt.forEach(function(r) {
    Be(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), sd(Wl, 1), Ro.pause(), Kr++, je = 2, lr(2), mt.forEach(function(r) {
    return Be(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), je = vt.isRefreshing = !1, tn("refresh");
}, cl = 0, xo = 1, xs, lr = function(t) {
  if (t === 2 || !je && !zo) {
    vt.isUpdating = !0, xs && xs.update(0);
    var e = mt.length, i = Ne(), r = i - Ta >= 50, n = e && mt[0].scroll();
    if (xo = cl > n ? -1 : 1, je || (cl = n), r && (Pi && !Ko && i - Pi > 200 && (Pi = 0, tn("scrollEnd")), es = Ta, Ta = i), xo < 0) {
      for (Ke = e; Ke-- > 0; )
        mt[Ke] && mt[Ke].update(0, r);
      xo = 1;
    } else
      for (Ke = 0; Ke < e; Ke++)
        mt[Ke] && mt[Ke].update(0, r);
    vt.isUpdating = !1;
  }
  $s = 0;
}, ul = [td, ed, Gl, Xl, Si + bs, Si + ys, Si + ws, Si + vs, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], So = ul.concat([Xr, Gr, "boxSizing", "max" + Fn, "max" + Kl, "position", Si, de, de + ws, de + ys, de + bs, de + vs]), sg = function(t, e, i) {
  kn(i);
  var r = t._gsap;
  if (r.spacerIsNative)
    kn(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = e.parentNode;
    n && (n.insertBefore(t, e), n.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, Pa = function(t, e, i, r) {
  if (!t._gsap.swappedIn) {
    for (var n = ul.length, s = e.style, a = t.style, c; n--; )
      c = ul[n], s[c] = i[c];
    s.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (s.display = "inline-block"), a[Gl] = a[Xl] = "auto", s.flexBasis = i.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[Xr] = No(t, Ze) + ve, s[Gr] = No(t, xe) + ve, s[de] = a[Si] = a[ed] = a[td] = "0", kn(r), a[Xr] = a["max" + Fn] = i[Xr], a[Gr] = a["max" + Kl] = i[Gr], a[de] = i[de], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, og = /([A-Z])/g, kn = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, r = 0, n, s;
    for ((t.t._gsap || K.core.getCache(t.t)).uncache = 1; r < i; r += 2)
      s = t[r + 1], n = t[r], s ? e[n] = s : e[n] && e.removeProperty(n.replace(og, "-$1").toLowerCase());
  }
}, lo = function(t) {
  for (var e = So.length, i = t.style, r = [], n = 0; n < e; n++)
    r.push(So[n], i[So[n]]);
  return r.t = t, r;
}, ag = function(t, e, i) {
  for (var r = [], n = t.length, s = i ? 8 : 0, a; s < n; s += 2)
    a = t[s], r.push(a, a in e ? e[a] : t[s + 1]);
  return r.t = t.t, r;
}, To = {
  left: 0,
  top: 0
}, eu = function(t, e, i, r, n, s, a, c, u, h, d, f, l, g) {
  Be(t) && (t = t(c)), ai(t) && t.substr(0, 3) === "max" && (t = f + (t.charAt(4) === "=" ? wo("0" + t.substr(3), i) : 0));
  var p = l ? l.time() : 0, _, S, E;
  if (l && l.seek(0), isNaN(t) || (t = +t), ns(t))
    l && (t = K.utils.mapRange(l.scrollTrigger.start, l.scrollTrigger.end, 0, f, t)), a && bo(a, i, r, !0);
  else {
    Be(e) && (e = e(c));
    var k = (t || "0").split(" "), T, x, M, P;
    E = ti(e, c) || kt, T = rr(E) || {}, (!T || !T.left && !T.top) && Ti(E).display === "none" && (P = E.style.display, E.style.display = "block", T = rr(E), P ? E.style.display = P : E.style.removeProperty("display")), x = wo(k[0], T[r.d]), M = wo(k[1] || "0", i), t = T[r.p] - u[r.p] - h + x + n - M, a && bo(a, M, r, i - M < 20 || a._isStart && M > 20), i -= i - M;
  }
  if (g && (c[g] = t || -1e-3, t < 0 && (t = 0)), s) {
    var O = t + i, D = s._isStart;
    _ = "scroll" + r.d2, bo(s, O, r, D && O > 20 || !D && (d ? Math.max(kt[_], ci[_]) : s.parentNode[_]) <= O + 1), d && (u = rr(a), d && (s.style[r.op.p] = u[r.op.p] - r.op.m - s._offset + ve));
  }
  return l && E && (_ = rr(E), l.seek(f), S = rr(E), l._caScrollDist = _[r.p] - S[r.p], t = t / l._caScrollDist * f), l && l.seek(p), l ? t : Math.round(t);
}, lg = /(webkit|moz|length|cssText|inset)/i, iu = function(t, e, i, r) {
  if (t.parentNode !== e) {
    var n = t.style, s, a;
    if (e === kt) {
      t._stOrig = n.cssText, a = Ti(t);
      for (s in a)
        !+s && !lg.test(s) && a[s] && typeof n[s] == "string" && s !== "0" && (n[s] = a[s]);
      n.top = i, n.left = r;
    } else
      n.cssText = t._stOrig;
    K.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, ad = function(t, e, i) {
  var r = e, n = r;
  return function(s) {
    var a = Math.round(t());
    return a !== r && a !== n && Math.abs(a - r) > 3 && Math.abs(a - n) > 3 && (s = a, i && i()), n = r, r = Math.round(s), r;
  };
}, co = function(t, e, i) {
  var r = {};
  r[e.p] = "+=" + i, K.set(t, r);
}, ru = function(t, e) {
  var i = Ar(t, e), r = "_scroll" + e.p2, n = function s(a, c, u, h, d) {
    var f = s.tween, l = c.onComplete, g = {};
    u = u || i();
    var p = ad(i, u, function() {
      f.kill(), s.tween = 0;
    });
    return d = h && d || 0, h = h || a - u, f && f.kill(), c[r] = a, c.inherit = !1, c.modifiers = g, g[r] = function() {
      return p(u + h * f.ratio + d * f.ratio * f.ratio);
    }, c.onUpdate = function() {
      yt.cache++, s.tween && lr();
    }, c.onComplete = function() {
      s.tween = 0, l && l.call(f);
    }, f = s.tween = K.to(t, c), f;
  };
  return t[r] = i, i.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Ce(t, "wheel", i.wheelHandler), vt.isTouch && Ce(t, "touchmove", i.wheelHandler), n;
}, vt = /* @__PURE__ */ function() {
  function o(e, i) {
    pn || o.register(K) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), ol(this), this.init(e, i);
  }
  var t = o.prototype;
  return t.init = function(i, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !is) {
      this.update = this.refresh = this.kill = Bi;
      return;
    }
    i = jc(ai(i) || ns(i) || i.nodeType ? {
      trigger: i
    } : i, oo);
    var n = i, s = n.onUpdate, a = n.toggleClass, c = n.id, u = n.onToggle, h = n.onRefresh, d = n.scrub, f = n.trigger, l = n.pin, g = n.pinSpacing, p = n.invalidateOnRefresh, _ = n.anticipatePin, S = n.onScrubComplete, E = n.onSnapComplete, k = n.once, T = n.snap, x = n.pinReparent, M = n.pinSpacer, P = n.containerAnimation, O = n.fastScrollEnd, D = n.preventOverlaps, N = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? Ze : xe, q = !d && d !== 0, $ = ti(i.scroller || _t), H = K.core.getCache($), Z = Zr($), et = ("pinType" in i ? i.pinType : Sr($, "pinType") || Z && "fixed") === "fixed", V = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], U = q && i.toggleActions.split(" "), nt = "markers" in i ? i.markers : oo.markers, ot = Z ? 0 : parseFloat(Ti($)["border" + N.p2 + Fn]) || 0, v = this, J = i.onRefreshInit && function() {
      return i.onRefreshInit(v);
    }, rt = Zp($, Z, N), G = Jp($, Z), st = 0, Ut = 0, wt = 0, It = Ar($, N), pt, jt, ee, Rt, Yt, dt, ft, lt, Se, A, zt, qe, Ae, Lt, Dt, ae, Ue, Wt, ie, Ct, le, Oe, Me, Ni, qt, $i, Je, ge, ke, _i, De, at, Re, Mt, Te, Jt, yi, j, y;
    if (v._startClamp = v._endClamp = !1, v._dir = N, _ *= 45, v.scroller = $, v.scroll = P ? P.time.bind(P) : It, Rt = It(), v.vars = i, r = r || i.animation, "refreshPriority" in i && (Vh = 1, i.refreshPriority === -9999 && (xs = v)), H.tweenScroll = H.tweenScroll || {
      top: ru($, xe),
      left: ru($, Ze)
    }, v.tweenTo = pt = H.tweenScroll[N.p], v.scrubDuration = function(I) {
      Re = ns(I) && I, Re ? at ? at.duration(I) : at = K.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Re,
        paused: !0,
        onComplete: function() {
          return S && S(v);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, r && (r.vars.lazy = !1, r._initted && !v.isReverted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), v.animation = r.pause(), r.scrollTrigger = v, v.scrubDuration(d), _i = 0, c || (c = r.vars.id)), T && ((!Nr(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in kt.style && K.set(Z ? [kt, ci] : $, {
      scrollBehavior: "auto"
    }), yt.forEach(function(I) {
      return Be(I) && I.target === (Z ? Ft.scrollingElement || ci : $) && (I.smooth = !1);
    }), ee = Be(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? eg(r) : T.snapTo === "labelsDirectional" ? ig(r) : T.directional !== !1 ? function(I, Y) {
      return jl(T.snapTo)(I, Ne() - Ut < 500 ? 0 : Y.direction);
    } : K.utils.snap(T.snapTo), Mt = T.duration || {
      min: 0.1,
      max: 2
    }, Mt = Nr(Mt) ? _s(Mt.min, Mt.max) : _s(Mt, Mt), Te = K.delayedCall(T.delay || Re / 2 || 0.1, function() {
      var I = It(), Y = Ne() - Ut < 500, R = pt.tween;
      if ((Y || Math.abs(v.getVelocity()) < 10) && !R && !Ko && st !== I) {
        var W = (I - dt) / Lt, tt = r && !q ? r.totalProgress() : W, X = Y ? 0 : (tt - De) / (Ne() - es) * 1e3 || 0, ut = K.utils.clamp(-W, 1 - W, un(X / 2) * X / 0.185), bt = W + (T.inertia === !1 ? 0 : ut), Et, gt, ht = T, Pt = ht.onStart, ct = ht.onInterrupt, me = ht.onComplete;
        if (Et = ee(bt, v), ns(Et) || (Et = bt), gt = Math.max(0, Math.round(dt + Et * Lt)), I <= ft && I >= dt && gt !== I) {
          if (R && !R._initted && R.data <= un(gt - I))
            return;
          T.inertia === !1 && (ut = Et - W), pt(gt, {
            duration: Mt(un(Math.max(un(bt - tt), un(Et - tt)) * 0.185 / X / 0.05 || 0)),
            ease: T.ease || "power3",
            data: un(gt - I),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Te.restart(!0) && ct && ct(v);
            },
            onComplete: function() {
              v.update(), st = It(), r && !q && (at ? at.resetTo("totalProgress", Et, r._tTime / r._tDur) : r.progress(Et)), _i = De = r && !q ? r.totalProgress() : v.progress, E && E(v), me && me(v);
            }
          }, I, ut * Lt, gt - I - ut * Lt), Pt && Pt(v, pt.tween);
        }
      } else v.isActive && st !== I && Te.restart(!0);
    }).pause()), c && (ll[c] = v), f = v.trigger = ti(f || l !== !0 && l), y = f && f._gsap && f._gsap.stRevert, y && (y = y(v)), l = l === !0 ? f : ti(l), ai(a) && (a = {
      targets: f,
      className: a
    }), l && (g === !1 || g === Si || (g = !g && l.parentNode && l.parentNode.style && Ti(l.parentNode).display === "flex" ? !1 : de), v.pin = l, jt = K.core.getCache(l), jt.spacer ? Dt = jt.pinState : (M && (M = ti(M), M && !M.nodeType && (M = M.current || M.nativeElement), jt.spacerIsNative = !!M, M && (jt.spacerState = lo(M))), jt.spacer = Wt = M || Ft.createElement("div"), Wt.classList.add("pin-spacer"), c && Wt.classList.add("pin-spacer-" + c), jt.pinState = Dt = lo(l)), i.force3D !== !1 && K.set(l, {
      force3D: !0
    }), v.spacer = Wt = jt.spacer, ke = Ti(l), Ni = ke[g + N.os2], Ct = K.getProperty(l), le = K.quickSetter(l, N.a, ve), Pa(l, Wt, ke), Ue = lo(l)), nt) {
      qe = Nr(nt) ? jc(nt, Qc) : Qc, A = ao("scroller-start", c, $, N, qe, 0), zt = ao("scroller-end", c, $, N, qe, 0, A), ie = A["offset" + N.op.d2];
      var B = ti(Sr($, "content") || $);
      lt = this.markerStart = ao("start", c, B, N, qe, ie, 0, P), Se = this.markerEnd = ao("end", c, B, N, qe, ie, 0, P), P && (j = K.quickSetter([lt, Se], N.a, ve)), !et && !(Xi.length && Sr($, "fixedMarkers") === !0) && (tg(Z ? kt : $), K.set([A, zt], {
        force3D: !0
      }), $i = K.quickSetter(A, N.a, ve), ge = K.quickSetter(zt, N.a, ve));
    }
    if (P) {
      var b = P.vars.onUpdate, C = P.vars.onUpdateParams;
      P.eventCallback("onUpdate", function() {
        v.update(0, 0, 1), b && b.apply(P, C || []);
      });
    }
    if (v.previous = function() {
      return mt[mt.indexOf(v) - 1];
    }, v.next = function() {
      return mt[mt.indexOf(v) + 1];
    }, v.revert = function(I, Y) {
      if (!Y)
        return v.kill(!0);
      var R = I !== !1 || !v.enabled, W = ze;
      R !== v.isReverted && (R && (Jt = Math.max(It(), v.scroll.rec || 0), wt = v.progress, yi = r && r.progress()), lt && [lt, Se, A, zt].forEach(function(tt) {
        return tt.style.display = R ? "none" : "block";
      }), R && (ze = v, v.update(R)), l && (!x || !v.isActive) && (R ? sg(l, Wt, Dt) : Pa(l, Wt, Ti(l), qt)), R || v.update(R), ze = W, v.isReverted = R);
    }, v.refresh = function(I, Y, R, W) {
      if (!((ze || !v.enabled) && !Y)) {
        if (l && I && Pi) {
          Ce(o, "scrollEnd", rd);
          return;
        }
        !je && J && J(v), ze = v, pt.tween && !R && (pt.tween.kill(), pt.tween = 0), at && at.pause(), p && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren && r.getChildren(!0, !0, !1).forEach(function(Oi) {
          return Oi.vars.immediateRender && Oi.render(0, !0, !0);
        })), v.isReverted || v.revert(!0, !0), v._subPinOffset = !1;
        var tt = rt(), X = G(), ut = P ? P.duration() : Wi($, N), bt = Lt <= 0.01 || !Lt, Et = 0, gt = W || 0, ht = Nr(R) ? R.end : i.end, Pt = i.endTrigger || f, ct = Nr(R) ? R.start : i.start || (i.start === 0 || !f ? 0 : l ? "0 0" : "0 100%"), me = v.pinnedContainer = i.pinnedContainer && ti(i.pinnedContainer, v), Vt = f && Math.max(0, mt.indexOf(v)) || 0, _e = Vt, ye, ce, Ki, ji, ue, re, We, nn, Vs, Ir, vi, Qi, sn;
        for (nt && Nr(R) && (Qi = K.getProperty(A, N.p), sn = K.getProperty(zt, N.p)); _e-- > 0; )
          re = mt[_e], re.end || re.refresh(0, 1) || (ze = v), We = re.pin, We && (We === f || We === l || We === me) && !re.isReverted && (Ir || (Ir = []), Ir.unshift(re), re.revert(!0, !0)), re !== mt[_e] && (Vt--, _e--);
        for (Be(ct) && (ct = ct(v)), ct = Vc(ct, "start", v), dt = eu(ct, f, tt, N, It(), lt, A, v, X, ot, et, ut, P, v._startClamp && "_startClamp") || (l ? -1e-3 : 0), Be(ht) && (ht = ht(v)), ai(ht) && !ht.indexOf("+=") && (~ht.indexOf(" ") ? ht = (ai(ct) ? ct.split(" ")[0] : "") + ht : (Et = wo(ht.substr(2), tt), ht = ai(ct) ? ct : (P ? K.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, dt) : dt) + Et, Pt = f)), ht = Vc(ht, "end", v), ft = Math.max(dt, eu(ht || (Pt ? "100% 0" : ut), Pt, tt, N, It() + Et, Se, zt, v, X, ot, et, ut, P, v._endClamp && "_endClamp")) || -1e-3, Et = 0, _e = Vt; _e--; )
          re = mt[_e], We = re.pin, We && re.start - re._pinPush <= dt && !P && re.end > 0 && (ye = re.end - (v._startClamp ? Math.max(0, re.start) : re.start), (We === f && re.start - re._pinPush < dt || We === me) && isNaN(ct) && (Et += ye * (1 - re.progress)), We === l && (gt += ye));
        if (dt += Et, ft += Et, v._startClamp && (v._startClamp += Et), v._endClamp && !je && (v._endClamp = ft || -1e-3, ft = Math.min(ft, Wi($, N))), Lt = ft - dt || (dt -= 0.01) && 1e-3, bt && (wt = K.utils.clamp(0, 1, K.utils.normalize(dt, ft, Jt))), v._pinPush = gt, lt && Et && (ye = {}, ye[N.a] = "+=" + Et, me && (ye[N.p] = "-=" + It()), K.set([lt, Se], ye)), l && !(al && v.end >= Wi($, N)))
          ye = Ti(l), ji = N === xe, Ki = It(), Oe = parseFloat(Ct(N.a)) + gt, !ut && ft > 1 && (vi = (Z ? Ft.scrollingElement || ci : $).style, vi = {
            style: vi,
            value: vi["overflow" + N.a.toUpperCase()]
          }, Z && Ti(kt)["overflow" + N.a.toUpperCase()] !== "scroll" && (vi.style["overflow" + N.a.toUpperCase()] = "scroll")), Pa(l, Wt, ye), Ue = lo(l), ce = rr(l, !0), nn = et && Ar($, ji ? Ze : xe)(), g ? (qt = [g + N.os2, Lt + gt + ve], qt.t = Wt, _e = g === de ? No(l, N) + Lt + gt : 0, _e && (qt.push(N.d, _e + ve), Wt.style.flexBasis !== "auto" && (Wt.style.flexBasis = _e + ve)), kn(qt), me && mt.forEach(function(Oi) {
            Oi.pin === me && Oi.vars.pinSpacing !== !1 && (Oi._subPinOffset = !0);
          }), et && It(Jt)) : (_e = No(l, N), _e && Wt.style.flexBasis !== "auto" && (Wt.style.flexBasis = _e + ve)), et && (ue = {
            top: ce.top + (ji ? Ki - dt : nn) + ve,
            left: ce.left + (ji ? nn : Ki - dt) + ve,
            boxSizing: "border-box",
            position: "fixed"
          }, ue[Xr] = ue["max" + Fn] = Math.ceil(ce.width) + ve, ue[Gr] = ue["max" + Kl] = Math.ceil(ce.height) + ve, ue[Si] = ue[Si + ws] = ue[Si + ys] = ue[Si + bs] = ue[Si + vs] = "0", ue[de] = ye[de], ue[de + ws] = ye[de + ws], ue[de + ys] = ye[de + ys], ue[de + bs] = ye[de + bs], ue[de + vs] = ye[de + vs], ae = ag(Dt, ue, x), je && It(0)), r ? (Vs = r._initted, xa(1), r.render(r.duration(), !0, !0), Me = Ct(N.a) - Oe + Lt + gt, Je = Math.abs(Lt - Me) > 1, et && Je && ae.splice(ae.length - 2, 2), r.render(0, !0, !0), Vs || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), xa(0)) : Me = Lt, vi && (vi.value ? vi.style["overflow" + N.a.toUpperCase()] = vi.value : vi.style.removeProperty("overflow-" + N.a));
        else if (f && It() && !P)
          for (ce = f.parentNode; ce && ce !== kt; )
            ce._pinOffset && (dt -= ce._pinOffset, ft -= ce._pinOffset), ce = ce.parentNode;
        Ir && Ir.forEach(function(Oi) {
          return Oi.revert(!1, !0);
        }), v.start = dt, v.end = ft, Rt = Yt = je ? Jt : It(), !P && !je && (Rt < Jt && It(Jt), v.scroll.rec = 0), v.revert(!1, !0), Ut = Ne(), Te && (st = -1, Te.restart(!0)), ze = 0, r && q && (r._initted || yi) && r.progress() !== yi && r.progress(yi || 0, !0).render(r.time(), !0, !0), (bt || wt !== v.progress || P || p || r && !r._initted) && (r && !q && (r._initted || wt || r.vars.immediateRender !== !1) && r.totalProgress(P && dt < -1e-3 && !wt ? K.utils.normalize(dt, ft, 0) : wt, !0), v.progress = bt || (Rt - dt) / Lt === wt ? 0 : wt), l && g && (Wt._pinOffset = Math.round(v.progress * Me)), at && at.invalidate(), isNaN(Qi) || (Qi -= K.getProperty(A, N.p), sn -= K.getProperty(zt, N.p), co(A, N, Qi), co(lt, N, Qi - (W || 0)), co(zt, N, sn), co(Se, N, sn - (W || 0))), bt && !je && v.update(), h && !je && !Ae && (Ae = !0, h(v), Ae = !1);
      }
    }, v.getVelocity = function() {
      return (It() - Yt) / (Ne() - es) * 1e3 || 0;
    }, v.endAnimation = function() {
      Wn(v.callbackAnimation), r && (at ? at.progress(1) : r.paused() ? q || Wn(r, v.direction < 0, 1) : Wn(r, r.reversed()));
    }, v.labelToScroll = function(I) {
      return r && r.labels && (dt || v.refresh() || dt) + r.labels[I] / r.duration() * Lt || 0;
    }, v.getTrailing = function(I) {
      var Y = mt.indexOf(v), R = v.direction > 0 ? mt.slice(0, Y).reverse() : mt.slice(Y + 1);
      return (ai(I) ? R.filter(function(W) {
        return W.vars.preventOverlaps === I;
      }) : R).filter(function(W) {
        return v.direction > 0 ? W.end <= dt : W.start >= ft;
      });
    }, v.update = function(I, Y, R) {
      if (!(P && !R && !I)) {
        var W = je === !0 ? Jt : v.scroll(), tt = I ? 0 : (W - dt) / Lt, X = tt < 0 ? 0 : tt > 1 ? 1 : tt || 0, ut = v.progress, bt, Et, gt, ht, Pt, ct, me, Vt;
        if (Y && (Yt = Rt, Rt = P ? It() : W, T && (De = _i, _i = r && !q ? r.totalProgress() : X)), _ && l && !ze && !io && Pi && (!X && dt < W + (W - Yt) / (Ne() - es) * _ ? X = 1e-4 : X === 1 && ft > W + (W - Yt) / (Ne() - es) * _ && (X = 0.9999)), X !== ut && v.enabled) {
          if (bt = v.isActive = !!X && X < 1, Et = !!ut && ut < 1, ct = bt !== Et, Pt = ct || !!X != !!ut, v.direction = X > ut ? 1 : -1, v.progress = X, Pt && !ze && (gt = X && !ut ? 0 : X === 1 ? 1 : ut === 1 ? 2 : 3, q && (ht = !ct && U[gt + 1] !== "none" && U[gt + 1] || U[gt], Vt = r && (ht === "complete" || ht === "reset" || ht in r))), D && (ct || Vt) && (Vt || d || !r) && (Be(D) ? D(v) : v.getTrailing(D).forEach(function(Ki) {
            return Ki.endAnimation();
          })), q || (at && !ze && !io ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", X, r._tTime / r._tDur) : (at.vars.totalProgress = X, at.invalidate().restart())) : r && r.totalProgress(X, !!(ze && (Ut || I)))), l) {
            if (I && g && (Wt.style[g + N.os2] = Ni), !et)
              le(rs(Oe + Me * X));
            else if (Pt) {
              if (me = !I && X > ut && ft + 1 > W && W + 1 >= Wi($, N), x)
                if (!I && (bt || me)) {
                  var _e = rr(l, !0), ye = W - dt;
                  iu(l, kt, _e.top + (N === xe ? ye : 0) + ve, _e.left + (N === xe ? 0 : ye) + ve);
                } else
                  iu(l, Wt);
              kn(bt || me ? ae : Ue), Je && X < 1 && bt || le(Oe + (X === 1 && !me ? Me : 0));
            }
          }
          T && !pt.tween && !ze && !io && Te.restart(!0), a && (ct || k && X && (X < 1 || !Sa)) && Ns(a.targets).forEach(function(Ki) {
            return Ki.classList[bt || k ? "add" : "remove"](a.className);
          }), s && !q && !I && s(v), Pt && !ze ? (q && (Vt && (ht === "complete" ? r.pause().totalProgress(1) : ht === "reset" ? r.restart(!0).pause() : ht === "restart" ? r.restart(!0) : r[ht]()), s && s(v)), (ct || !Sa) && (u && ct && Ea(v, u), V[gt] && Ea(v, V[gt]), k && (X === 1 ? v.kill(!1, 1) : V[gt] = 0), ct || (gt = X === 1 ? 1 : 3, V[gt] && Ea(v, V[gt]))), O && !bt && Math.abs(v.getVelocity()) > (ns(O) ? O : 2500) && (Wn(v.callbackAnimation), at ? at.progress(1) : Wn(r, ht === "reverse" ? 1 : !X, 1))) : q && s && !ze && s(v);
        }
        if (ge) {
          var ce = P ? W / P.duration() * (P._caScrollDist || 0) : W;
          $i(ce + (A._isFlipped ? 1 : 0)), ge(ce);
        }
        j && j(-W / P.duration() * (P._caScrollDist || 0));
      }
    }, v.enable = function(I, Y) {
      v.enabled || (v.enabled = !0, Ce($, "resize", ss), Z || Ce($, "scroll", hn), J && Ce(o, "refreshInit", J), I !== !1 && (v.progress = wt = 0, Rt = Yt = st = It()), Y !== !1 && v.refresh());
    }, v.getTween = function(I) {
      return I && pt ? pt.tween : at;
    }, v.setPositions = function(I, Y, R, W) {
      if (P) {
        var tt = P.scrollTrigger, X = P.duration(), ut = tt.end - tt.start;
        I = tt.start + ut * I / X, Y = tt.start + ut * Y / X;
      }
      v.refresh(!1, !1, {
        start: Xc(I, R && !!v._startClamp),
        end: Xc(Y, R && !!v._endClamp)
      }, W), v.update();
    }, v.adjustPinSpacing = function(I) {
      if (qt && I) {
        var Y = qt.indexOf(N.d) + 1;
        qt[Y] = parseFloat(qt[Y]) + I + ve, qt[1] = parseFloat(qt[1]) + I + ve, kn(qt);
      }
    }, v.disable = function(I, Y) {
      if (v.enabled && (I !== !1 && v.revert(!0, !0), v.enabled = v.isActive = !1, Y || at && at.pause(), Jt = 0, jt && (jt.uncache = 1), J && Ee(o, "refreshInit", J), Te && (Te.pause(), pt.tween && pt.tween.kill() && (pt.tween = 0)), !Z)) {
        for (var R = mt.length; R--; )
          if (mt[R].scroller === $ && mt[R] !== v)
            return;
        Ee($, "resize", ss), Z || Ee($, "scroll", hn);
      }
    }, v.kill = function(I, Y) {
      v.disable(I, Y), at && !Y && at.kill(), c && delete ll[c];
      var R = mt.indexOf(v);
      R >= 0 && mt.splice(R, 1), R === Ke && xo > 0 && Ke--, R = 0, mt.forEach(function(W) {
        return W.scroller === v.scroller && (R = 1);
      }), R || je || (v.scroll.rec = 0), r && (r.scrollTrigger = null, I && r.revert({
        kill: !1
      }), Y || r.kill()), lt && [lt, Se, A, zt].forEach(function(W) {
        return W.parentNode && W.parentNode.removeChild(W);
      }), xs === v && (xs = 0), l && (jt && (jt.uncache = 1), R = 0, mt.forEach(function(W) {
        return W.pin === l && R++;
      }), R || (jt.spacer = 0)), i.onKill && i.onKill(v);
    }, mt.push(v), v.enable(!1, !1), y && y(v), r && r.add && !Lt) {
      var F = v.update;
      v.update = function() {
        v.update = F, yt.cache++, dt || ft || v.refresh();
      }, K.delayedCall(0.01, v.update), Lt = 0.01, dt = ft = 0;
    } else
      v.refresh();
    l && ng();
  }, o.register = function(i) {
    return pn || (K = i || Qh(), jh() && window.document && o.enable(), pn = is), pn;
  }, o.defaults = function(i) {
    if (i)
      for (var r in i)
        oo[r] = i[r];
    return oo;
  }, o.disable = function(i, r) {
    is = 0, mt.forEach(function(s) {
      return s[r ? "kill" : "disable"](i);
    }), Ee(_t, "wheel", hn), Ee(Ft, "scroll", hn), clearInterval(eo), Ee(Ft, "touchcancel", Bi), Ee(kt, "touchstart", Bi), no(Ee, Ft, "pointerdown,touchstart,mousedown", Gc), no(Ee, Ft, "pointerup,touchend,mouseup", Kc), Ro.kill(), ro(Ee);
    for (var n = 0; n < yt.length; n += 3)
      so(Ee, yt[n], yt[n + 1]), so(Ee, yt[n], yt[n + 2]);
  }, o.enable = function() {
    if (_t = window, Ft = document, ci = Ft.documentElement, kt = Ft.body, K && (Ns = K.utils.toArray, _s = K.utils.clamp, ol = K.core.context || Bi, xa = K.core.suppressOverwrites || Bi, Wl = _t.history.scrollRestoration || "auto", cl = _t.pageYOffset || 0, K.core.globals("ScrollTrigger", o), kt)) {
      is = 1, On = document.createElement("div"), On.style.height = "100vh", On.style.position = "absolute", od(), Qp(), oe.register(K), o.isTouch = oe.isTouch, fr = oe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), sl = oe.isTouch === 1, Ce(_t, "wheel", hn), Ul = [_t, Ft, ci, kt], K.matchMedia ? (o.matchMedia = function(u) {
        var h = K.matchMedia(), d;
        for (d in u)
          h.add(d, u[d]);
        return h;
      }, K.addEventListener("matchMediaInit", function() {
        return Ql();
      }), K.addEventListener("matchMediaRevert", function() {
        return nd();
      }), K.addEventListener("matchMedia", function() {
        Br(0, 1), tn("matchMedia");
      }), K.matchMedia().add("(orientation: portrait)", function() {
        return Ca(), Ca;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Ca(), Ce(Ft, "scroll", hn);
      var i = kt.hasAttribute("style"), r = kt.style, n = r.borderTopStyle, s = K.core.Animation.prototype, a, c;
      for (s.revert || Object.defineProperty(s, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), r.borderTopStyle = "solid", a = rr(kt), xe.m = Math.round(a.top + xe.sc()) || 0, Ze.m = Math.round(a.left + Ze.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), i || (kt.setAttribute("style", ""), kt.removeAttribute("style")), eo = setInterval(Zc, 250), K.delayedCall(0.5, function() {
        return io = 0;
      }), Ce(Ft, "touchcancel", Bi), Ce(kt, "touchstart", Bi), no(Ce, Ft, "pointerdown,touchstart,mousedown", Gc), no(Ce, Ft, "pointerup,touchend,mouseup", Kc), nl = K.utils.checkPrefix("transform"), So.push(nl), pn = Ne(), Ro = K.delayedCall(0.2, Br).pause(), gn = [Ft, "visibilitychange", function() {
        var u = _t.innerWidth, h = _t.innerHeight;
        Ft.hidden ? (Uc = u, Wc = h) : (Uc !== u || Wc !== h) && ss();
      }, Ft, "DOMContentLoaded", Br, _t, "load", Br, _t, "resize", ss], ro(Ce), mt.forEach(function(u) {
        return u.enable(0, 1);
      }), c = 0; c < yt.length; c += 3)
        so(Ee, yt[c], yt[c + 1]), so(Ee, yt[c], yt[c + 2]);
    }
  }, o.config = function(i) {
    "limitCallbacks" in i && (Sa = !!i.limitCallbacks);
    var r = i.syncInterval;
    r && clearInterval(eo) || (eo = r) && setInterval(Zc, r), "ignoreMobileResize" in i && (sl = o.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (ro(Ee) || ro(Ce, i.autoRefreshEvents || "none"), Xh = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, o.scrollerProxy = function(i, r) {
    var n = ti(i), s = yt.indexOf(n), a = Zr(n);
    ~s && yt.splice(s, a ? 6 : 2), r && (a ? Xi.unshift(_t, r, kt, r, ci, r) : Xi.unshift(n, r));
  }, o.clearMatchMedia = function(i) {
    mt.forEach(function(r) {
      return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0);
    });
  }, o.isInViewport = function(i, r, n) {
    var s = (ai(i) ? ti(i) : i).getBoundingClientRect(), a = s[n ? Xr : Gr] * r || 0;
    return n ? s.right - a > 0 && s.left + a < _t.innerWidth : s.bottom - a > 0 && s.top + a < _t.innerHeight;
  }, o.positionInViewport = function(i, r, n) {
    ai(i) && (i = ti(i));
    var s = i.getBoundingClientRect(), a = s[n ? Xr : Gr], c = r == null ? a / 2 : r in $o ? $o[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return n ? (s.left + c) / _t.innerWidth : (s.top + c) / _t.innerHeight;
  }, o.killAll = function(i) {
    if (mt.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), i !== !0) {
      var r = Jr.killAll || [];
      Jr = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, o;
}();
vt.version = "3.13.0";
vt.saveStyles = function(o) {
  return o ? Ns(o).forEach(function(t) {
    if (t && t.style) {
      var e = oi.indexOf(t);
      e >= 0 && oi.splice(e, 5), oi.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), K.core.getCache(t), ol());
    }
  }) : oi;
};
vt.revert = function(o, t) {
  return Ql(!o, t);
};
vt.create = function(o, t) {
  return new vt(o, t);
};
vt.refresh = function(o) {
  return o ? ss(!0) : (pn || vt.register()) && Br(!0);
};
vt.update = function(o) {
  return ++yt.cache && lr(o === !0 ? 2 : 0);
};
vt.clearScrollMemory = sd;
vt.maxScroll = function(o, t) {
  return Wi(o, t ? Ze : xe);
};
vt.getScrollFunc = function(o, t) {
  return Ar(ti(o), t ? Ze : xe);
};
vt.getById = function(o) {
  return ll[o];
};
vt.getAll = function() {
  return mt.filter(function(o) {
    return o.vars.id !== "ScrollSmoother";
  });
};
vt.isScrolling = function() {
  return !!Pi;
};
vt.snapDirectional = jl;
vt.addEventListener = function(o, t) {
  var e = Jr[o] || (Jr[o] = []);
  ~e.indexOf(t) || e.push(t);
};
vt.removeEventListener = function(o, t) {
  var e = Jr[o], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
vt.batch = function(o, t) {
  var e = [], i = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, s = function(u, h) {
    var d = [], f = [], l = K.delayedCall(r, function() {
      h(d, f), d = [], f = [];
    }).pause();
    return function(g) {
      d.length || l.restart(!0), d.push(g.trigger), f.push(g), n <= d.length && l.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Be(t[a]) && a !== "onRefreshInit" ? s(a, t[a]) : t[a];
  return Be(n) && (n = n(), Ce(vt, "refresh", function() {
    return n = t.batchMax();
  })), Ns(o).forEach(function(c) {
    var u = {};
    for (a in i)
      u[a] = i[a];
    u.trigger = c, e.push(vt.create(u));
  }), e;
};
var nu = function(t, e, i, r) {
  return e > r ? t(r) : e < 0 && t(0), i > r ? (r - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Aa = function o(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (oe.isTouch ? " pinch-zoom" : "") : "none", t === ci && o(kt, e);
}, uo = {
  auto: 1,
  scroll: 1
}, cg = function(t) {
  var e = t.event, i = t.target, r = t.axis, n = (e.changedTouches ? e.changedTouches[0] : e).target, s = n._gsap || K.core.getCache(n), a = Ne(), c;
  if (!s._isScrollT || a - s._isScrollT > 2e3) {
    for (; n && n !== kt && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(uo[(c = Ti(n)).overflowY] || uo[c.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== i && !Zr(n) && (uo[(c = Ti(n)).overflowY] || uo[c.overflowX]), s._isScrollT = a;
  }
  (s._isScroll || r === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, ld = function(t, e, i, r) {
  return oe.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: r = r && cg,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return i && Ce(Ft, oe.eventTypes[0], ou, !1, !0);
    },
    onDisable: function() {
      return Ee(Ft, oe.eventTypes[0], ou, !0);
    }
  });
}, ug = /(input|label|select|textarea)/i, su, ou = function(t) {
  var e = ug.test(t.target.tagName);
  (e || su) && (t._gsapAllow = !0, su = e);
}, hg = function(t) {
  Nr(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, r = e.momentum, n = e.allowNestedScroll, s = e.onRelease, a, c, u = ti(t.target) || ci, h = K.core.globals().ScrollSmoother, d = h && h.get(), f = fr && (t.content && ti(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), l = Ar(u, xe), g = Ar(u, Ze), p = 1, _ = (oe.isTouch && _t.visualViewport ? _t.visualViewport.scale * _t.visualViewport.width : _t.outerWidth) / _t.innerWidth, S = 0, E = Be(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, k, T, x = ld(u, t.type, !0, n), M = function() {
    return T = !1;
  }, P = Bi, O = Bi, D = function() {
    c = Wi(u, xe), O = _s(fr ? 1 : 0, c), i && (P = _s(0, Wi(u, Ze))), k = Kr;
  }, N = function() {
    f._gsap.y = rs(parseFloat(f._gsap.y) + l.offset) + "px", f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(f._gsap.y) + ", 0, 1)", l.offset = l.cacheID = 0;
  }, q = function() {
    if (T) {
      requestAnimationFrame(M);
      var nt = rs(a.deltaY / 2), ot = O(l.v - nt);
      if (f && ot !== l.v + l.offset) {
        l.offset = ot - l.v;
        var v = rs((parseFloat(f && f._gsap.y) || 0) - l.offset);
        f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + v + ", 0, 1)", f._gsap.y = v + "px", l.cacheID = yt.cache, lr();
      }
      return !0;
    }
    l.offset && N(), T = !0;
  }, $, H, Z, et, V = function() {
    D(), $.isActive() && $.vars.scrollY > c && (l() > c ? $.progress(1) && l(c) : $.resetTo("scrollY", c));
  };
  return f && K.set(f, {
    y: "+=0"
  }), t.ignoreCheck = function(U) {
    return fr && U.type === "touchmove" && q() || p > 1.05 && U.type !== "touchstart" || a.isGesturing || U.touches && U.touches.length > 1;
  }, t.onPress = function() {
    T = !1;
    var U = p;
    p = rs((_t.visualViewport && _t.visualViewport.scale || 1) / _), $.pause(), U !== p && Aa(u, p > 1.01 ? !0 : i ? !1 : "x"), H = g(), Z = l(), D(), k = Kr;
  }, t.onRelease = t.onGestureStart = function(U, nt) {
    if (l.offset && N(), !nt)
      et.restart(!0);
    else {
      yt.cache++;
      var ot = E(), v, J;
      i && (v = g(), J = v + ot * 0.05 * -U.velocityX / 0.227, ot *= nu(g, v, J, Wi(u, Ze)), $.vars.scrollX = P(J)), v = l(), J = v + ot * 0.05 * -U.velocityY / 0.227, ot *= nu(l, v, J, Wi(u, xe)), $.vars.scrollY = O(J), $.invalidate().duration(ot).play(0.01), (fr && $.vars.scrollY >= c || v >= c - 1) && K.to({}, {
        onUpdate: V,
        duration: ot
      });
    }
    s && s(U);
  }, t.onWheel = function() {
    $._ts && $.pause(), Ne() - S > 1e3 && (k = 0, S = Ne());
  }, t.onChange = function(U, nt, ot, v, J) {
    if (Kr !== k && D(), nt && i && g(P(v[2] === nt ? H + (U.startX - U.x) : g() + nt - v[1])), ot) {
      l.offset && N();
      var rt = J[2] === ot, G = rt ? Z + U.startY - U.y : l() + ot - J[1], st = O(G);
      rt && G !== st && (Z += st - G), l(st);
    }
    (ot || nt) && lr();
  }, t.onEnable = function() {
    Aa(u, i ? !1 : "x"), vt.addEventListener("refresh", V), Ce(_t, "resize", V), l.smooth && (l.target.style.scrollBehavior = "auto", l.smooth = g.smooth = !1), x.enable();
  }, t.onDisable = function() {
    Aa(u, !0), Ee(_t, "resize", V), vt.removeEventListener("refresh", V), x.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new oe(t), a.iOS = fr, fr && !l() && l(1), fr && K.ticker.add(Bi), et = a._dc, $ = K.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: ad(l, l(), function() {
        return $.pause();
      })
    },
    onUpdate: lr,
    onComplete: et.vars.onComplete
  }), a;
};
vt.sort = function(o) {
  if (Be(o))
    return mt.sort(o);
  var t = _t.pageYOffset || 0;
  return vt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + _t.innerHeight;
  }), mt.sort(o || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
vt.observe = function(o) {
  return new oe(o);
};
vt.normalizeScroll = function(o) {
  if (typeof o > "u")
    return Ge;
  if (o === !0 && Ge)
    return Ge.enable();
  if (o === !1) {
    Ge && Ge.kill(), Ge = o;
    return;
  }
  var t = o instanceof oe ? o : hg(o);
  return Ge && Ge.target === t.target && Ge.kill(), Zr(t.target) && (Ge = t), t;
};
vt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: il,
  _inputObserver: ld,
  _scrollers: yt,
  _proxies: Xi,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Pi || tn("scrollStart"), Pi = Ne();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return ze;
    }
  }
};
Qh() && K.registerPlugin(vt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Hi, hl, Ss, cd, mn, wn, dl, ud, hd = function() {
  return Hi || typeof window < "u" && (Hi = window.gsap);
}, fl = {}, dg = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, pl = function(t) {
  return ud(t).id;
}, os = function(t) {
  return fl[pl(typeof t == "string" ? Ss(t)[0] : t)];
}, au = function(t) {
  var e = mn, i;
  if (t - dl >= 0.05)
    for (dl = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, fg = {
  deg: 360,
  rad: Math.PI * 2
}, Oa = function() {
  Hi = hd(), Hi && (Ss = Hi.utils.toArray, cd = Hi.utils.getUnit, ud = Hi.core.getCache, wn = Hi.ticker, hl = 1);
}, pg = function(t, e, i, r) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = fg[i || cd(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = wn.time, r && (this._next = r, r._prev = this);
}, Us = /* @__PURE__ */ function() {
  function o(e, i) {
    hl || Oa(), this.target = Ss(e)[0], fl[pl(this.target)] = this, this._props = {}, i && this.add(i);
  }
  o.register = function(i) {
    Hi = i, Oa();
  };
  var t = o.prototype;
  return t.get = function(i, r) {
    var n = this._props[i] || console.warn("Not tracking " + i + " velocity."), s, a, c;
    return s = parseFloat(r ? n.v1 : n.g(n.t, n.p)), a = s - parseFloat(n.v2), c = n.rCap, c && (a = a % c, a !== a % (c / 2) && (a = a < 0 ? a + c : a - c)), dg(a / ((r ? n.t1 : wn.time) - n.t2));
  }, t.getAll = function() {
    var i = {}, r = this._props, n;
    for (n in r)
      i[n] = this.get(n);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, r) {
    i in this._props || (mn || (wn.add(au), dl = wn.time), mn = this._props[i] = new pg(this.target, i, r, mn));
  }, t.remove = function(i) {
    var r = this._props[i], n, s;
    r && (n = r._prev, s = r._next, n && (n._next = s), s ? s._prev = n : mn === r && (wn.remove(au), mn = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var r in this._props)
      this.remove(r);
    i || delete fl[pl(this.target)];
  }, o.track = function(i, r, n) {
    hl || Oa();
    for (var s = [], a = Ss(i), c = r.split(","), u = (n || "").split(","), h = a.length, d, f; h--; ) {
      for (d = os(a[h]) || new o(a[h]), f = c.length; f--; )
        d.add(c[f], u[f] || u[0]);
      s.push(d);
    }
    return s;
  }, o.untrack = function(i, r) {
    var n = (r || "").split(",");
    Ss(i).forEach(function(s) {
      var a = os(s);
      a && (n.length ? n.forEach(function(c) {
        return a.remove(c);
      }) : a.kill(1));
    });
  }, o.isTracking = function(i, r) {
    var n = os(i);
    return n && n.isTracking(r);
  }, o.getVelocity = function(i, r) {
    var n = os(i);
    return !n || !n.isTracking(r) ? console.warn("Not tracking velocity of " + r) : n.get(r);
  }, o;
}();
Us.getByTarget = os;
hd() && Hi.registerPlugin(Us);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var be, dd, lu, fd, gl, Ts, pd, gd, md, Zl, _d, Es, ml, yd, Fo = Us.getByTarget, vd = function() {
  return be || typeof window < "u" && (be = window.gsap) && be.registerPlugin && be;
}, gg = function(t) {
  return typeof t == "string";
}, Fs = function(t) {
  return typeof t == "number";
}, Er = function(t) {
  return typeof t == "object";
}, _l = function(t) {
  return typeof t == "function";
}, mg = 1, wd = Array.isArray, _g = function(t) {
  return t;
}, In = 1e10, cu = 1 / In, bd = 0.05, yg = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, vg = function(t, e, i) {
  for (var r in e)
    !(r in t) && r !== i && (t[r] = e[r]);
  return t;
}, wg = function o(t) {
  var e = {}, i, r;
  for (i in t)
    e[i] = Er(r = t[i]) && !wd(r) ? o(r) : r;
  return e;
}, uu = function(t, e, i, r, n) {
  var s = e.length, a = 0, c = In, u, h, d, f;
  if (Er(t)) {
    for (; s--; ) {
      u = e[s], h = 0;
      for (d in t)
        f = u[d] - t[d], h += f * f;
      h < c && (a = s, c = h);
    }
    if ((n || In) < In && n < Math.sqrt(c))
      return t;
  } else
    for (; s--; )
      u = e[s], h = u - t, h < 0 && (h = -h), h < c && u >= r && u <= i && (a = s, c = h);
  return e[a];
}, xd = function(t, e, i, r, n, s, a) {
  if (t.end === "auto")
    return t;
  var c = t.end, u, h;
  if (i = isNaN(i) ? In : i, r = isNaN(r) ? -1e10 : r, Er(e)) {
    if (u = e.calculated ? e : (_l(c) ? c(e, a) : uu(e, c, i, r, s)) || e, !e.calculated) {
      for (h in u)
        e[h] = u[h];
      e.calculated = !0;
    }
    u = u[n];
  } else
    u = _l(c) ? c(e, a) : wd(c) ? uu(e, c, i, r, s) : parseFloat(c);
  return u > i ? u = i : u < r && (u = r), {
    max: u,
    min: u,
    unitFactor: t.unitFactor
  };
}, Bo = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, Jl = function(t, e) {
  return e * bd * t / Zl;
}, hu = function(t, e, i) {
  return Math.abs((e - t) * Zl / i / bd);
}, Sd = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Td = function(t, e, i, r) {
  if (e.linkedProps) {
    var n = e.linkedProps.split(","), s = {}, a, c, u, h, d, f;
    for (a = 0; a < n.length; a++)
      c = n[a], u = e[c], u && (Fs(u.velocity) ? h = u.velocity : (d = d || Fo(t), h = d && d.isTracking(c) ? d.get(c) : 0), f = Math.abs(h / Bo(u, "resistance", r)), s[c] = parseFloat(i(t, c)) + Jl(h, f));
    return s;
  }
}, bg = function(t, e, i, r, n, s) {
  if (i === void 0 && (i = 10), r === void 0 && (r = 0.2), n === void 0 && (n = 1), gg(t) && (t = fd(t)[0]), !t)
    return 0;
  var a = 0, c = In, u = e.inertia || e, h = md(t).get, d = Bo(u, "resistance", Ts.resistance), f, l, g, p, _, S, E, k, T, x;
  x = Td(t, u, h, d);
  for (f in u)
    Sd[f] || (l = u[f], Er(l) || (k = k || Fo(t), k && k.isTracking(f) ? l = Fs(l) ? {
      velocity: l
    } : {
      velocity: k.get(f)
    } : (p = +l || 0, g = Math.abs(p / d))), Er(l) && (Fs(l.velocity) ? p = l.velocity : (k = k || Fo(t), p = k && k.isTracking(f) ? k.get(f) : 0), g = _d(r, i, Math.abs(p / Bo(l, "resistance", d))), _ = parseFloat(h(t, f)) || 0, S = _ + Jl(p, g), "end" in l && (l = xd(l, x && f in x ? x : S, l.max, l.min, f, u.radius, p), Es === e && (Es = u = wg(e)), u[f] = vg(l, u[f], "end")), "max" in l && S > +l.max + cu ? (T = l.unitFactor || Ts.unitFactors[f] || 1, E = _ > l.max && l.min !== l.max || p * T > -15 && p * T < 45 ? r + (i - r) * 0.1 : hu(_, l.max, p), E + n < c && (c = E + n)) : "min" in l && S < +l.min - cu && (T = l.unitFactor || Ts.unitFactors[f] || 1, E = _ < l.min && l.min !== l.max || p * T > -45 && p * T < 15 ? r + (i - r) * 0.1 : hu(_, l.min, p), E + n < c && (c = E + n)), E > a && (a = E)), g > a && (a = g));
  return a > c && (a = c), a > i ? i : a < r ? r : a;
}, du = function() {
  be = vd(), be && (lu = be.parseEase, fd = be.utils.toArray, pd = be.utils.getUnit, md = be.core.getCache, _d = be.utils.clamp, ml = be.core.getStyleSaver, yd = be.core.reverting || function() {
  }, gl = lu("power3"), Zl = gl(0.05), gd = be.core.PropTween, be.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), Ts = be.config(), be.registerPlugin(Us), dd = 1);
}, Ed = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    be = t, du();
  },
  init: function(t, e, i, r, n) {
    dd || du();
    var s = Fo(t);
    if (e === "auto") {
      if (!s) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = s.getAll();
    }
    this.styles = ml && typeof t.style == "object" && ml(t), this.target = t, this.tween = i, Es = e;
    var a = t._gsap, c = a.get, u = e.duration, h = Er(u), d = e.preventOvershoot || h && u.overshoot === 0, f = Bo(e, "resistance", Ts.resistance), l = Fs(u) ? u : bg(t, e, h && u.max || 10, h && u.min || 0.2, h && "overshoot" in u ? +u.overshoot : d ? 0 : 1), g, p, _, S, E, k, T, x, M;
    e = Es, Es = 0, M = Td(t, e, c, f);
    for (g in e)
      Sd[g] || (p = e[g], _l(p) && (p = p(r, t, n)), Fs(p) ? E = p : Er(p) && !isNaN(p.velocity) ? E = +p.velocity : s && s.isTracking(g) ? E = s.get(g) : console.warn("ERROR: No velocity was defined for " + t + " property: " + g), k = Jl(E, l), x = 0, _ = c(t, g), S = pd(_), _ = parseFloat(_), Er(p) && (T = _ + k, "end" in p && (p = xd(p, M && g in M ? M : T, p.max, p.min, g, e.radius, E)), "max" in p && +p.max < T ? d || p.preventOvershoot ? k = p.max - _ : x = p.max - _ - k : "min" in p && +p.min > T && (d || p.preventOvershoot ? k = p.min - _ : x = p.min - _ - k)), this._props.push(g), this.styles && this.styles.save(g), this._pt = new gd(this._pt, t, g, _, 0, _g, 0, a.set(t, g, this)), this._pt.u = S || 0, this._pt.c1 = k, this._pt.c2 = x);
    return i.duration(l), mg;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = gl(e.tween._time / e.tween._dur), t || !yd())
      for (; i; )
        i.set(i.t, i.p, yg(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(o) {
  return Ed[o] = Us[o];
});
vd() && be.registerPlugin(Ed);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let Vn, dn, yl, xg = () => yl || Eg.register(window.gsap), fu = typeof Intl < "u" ? new Intl.Segmenter() : 0, Ho = (o) => typeof o == "string" ? Ho(document.querySelectorAll(o)) : "length" in o ? Array.from(o) : [o], pu = (o) => Ho(o).filter((t) => t instanceof HTMLElement), vl = [], ka = function() {
}, Sg = /\s+/g, gu = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), mu = { left: 0, top: 0, width: 0, height: 0 }, _u = (o, t) => {
  if (t) {
    let e = new Set(o.join("").match(t) || vl), i = o.length, r, n, s, a;
    if (e.size)
      for (; --i > -1; ) {
        n = o[i];
        for (s of e)
          if (s.startsWith(n) && s.length > n.length) {
            for (r = 0, a = n; s.startsWith(a += o[i + ++r]) && a.length < s.length; )
              ;
            if (r && a.length === s.length) {
              o[i] = s, o.splice(i + 1, r);
              break;
            }
          }
      }
  }
  return o;
}, yu = (o) => window.getComputedStyle(o).display === "inline" && (o.style.display = "inline-block"), fn = (o, t, e) => t.insertBefore(typeof o == "string" ? document.createTextNode(o) : o, e), wl = (o, t, e) => {
  let i = t[o + "sClass"] || "", { tag: r = "div", aria: n = "auto", propIndex: s = !1 } = t, a = o === "line" ? "block" : "inline-block", c = i.indexOf("++") > -1, u = (h) => {
    let d = document.createElement(r), f = e.length + 1;
    return i && (d.className = i + (c ? " " + i + f : "")), s && d.style.setProperty("--" + o, f + ""), n !== "none" && d.setAttribute("aria-hidden", "true"), r !== "span" && (d.style.position = "relative", d.style.display = a), d.textContent = h, e.push(d), d;
  };
  return c && (i = i.replace("++", "")), u.collection = e, u;
}, Tg = (o, t, e, i) => {
  let r = wl("line", e, i), n = window.getComputedStyle(o).textAlign || "left";
  return (s, a) => {
    let c = r("");
    for (c.style.textAlign = n, o.insertBefore(c, t[s]); s < a; s++)
      c.appendChild(t[s]);
    c.normalize();
  };
}, Cd = (o, t, e, i, r, n, s, a, c, u) => {
  var h;
  let d = Array.from(o.childNodes), f = 0, { wordDelimiter: l, reduceWhiteSpace: g = !0, prepareText: p } = t, _ = o.getBoundingClientRect(), S = _, E = !g && window.getComputedStyle(o).whiteSpace.substring(0, 3) === "pre", k = 0, T = e.collection, x, M, P, O, D, N, q, $, H, Z, et, V, U, nt, ot, v, J, rt;
  for (typeof l == "object" ? (P = l.delimiter || l, M = l.replaceWith || "") : M = l === "" ? "" : l || " ", x = M !== " "; f < d.length; f++)
    if (O = d[f], O.nodeType === 3) {
      for (ot = O.textContent || "", g ? ot = ot.replace(Sg, " ") : E && (ot = ot.replace(/\n/g, M + `
`)), p && (ot = p(ot, o)), O.textContent = ot, D = M || P ? ot.split(P || M) : ot.match(a) || vl, J = D[D.length - 1], $ = x ? J.slice(-1) === " " : !J, J || D.pop(), S = _, q = x ? D[0].charAt(0) === " " : !D[0], q && fn(" ", o, O), D[0] || D.shift(), _u(D, c), n && u || (O.textContent = ""), H = 1; H <= D.length; H++)
        if (v = D[H - 1], !g && E && v.charAt(0) === `
` && ((h = O.previousSibling) == null || h.remove(), fn(document.createElement("br"), o, O), v = v.slice(1)), !g && v === "")
          fn(M, o, O);
        else if (v === " ")
          o.insertBefore(document.createTextNode(" "), O);
        else {
          if (x && v.charAt(0) === " " && fn(" ", o, O), k && H === 1 && !q && T.indexOf(k.parentNode) > -1 ? (N = T[T.length - 1], N.appendChild(document.createTextNode(i ? "" : v))) : (N = e(i ? "" : v), fn(N, o, O), k && H === 1 && !q && N.insertBefore(k, N.firstChild)), i)
            for (et = fu ? _u([...fu.segment(v)].map((G) => G.segment), c) : v.match(a) || vl, rt = 0; rt < et.length; rt++)
              N.appendChild(et[rt] === " " ? document.createTextNode(" ") : i(et[rt]));
          if (n && u) {
            if (ot = O.textContent = ot.substring(v.length + 1, ot.length), Z = N.getBoundingClientRect(), Z.top > S.top && Z.left <= S.left) {
              for (V = o.cloneNode(), U = o.childNodes[0]; U && U !== N; )
                nt = U, U = U.nextSibling, V.appendChild(nt);
              o.parentNode.insertBefore(V, o), r && yu(V);
            }
            S = Z;
          }
          (H < D.length || $) && fn(H >= D.length ? " " : x && v.slice(-1) === " " ? " " + M : M, o, O);
        }
      o.removeChild(O), k = 0;
    } else O.nodeType === 1 && (s && s.indexOf(O) > -1 ? (T.indexOf(O.previousSibling) > -1 && T[T.length - 1].appendChild(O), k = O) : (Cd(O, t, e, i, r, n, s, a, c, !0), k = 0), r && yu(O));
};
const Pd = class Ad {
  constructor(t, e) {
    this.isSplit = !1, xg(), this.elements = pu(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
    let i = [], r, n = () => {
      let s = i.length, a;
      for (; s--; ) {
        a = i[s];
        let c = a.element.offsetWidth;
        if (c !== a.width) {
          a.width = c, this._split();
          return;
        }
      }
    };
    this._data = { orig: i, obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
      clearTimeout(r), r = setTimeout(n, 200);
    }) }, ka(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: r = !0, smartWrap: n, onSplit: s, autoSplit: a = !1, specialChars: c, mask: u } = this.vars, h = e.indexOf("lines") > -1, d = e.indexOf("chars") > -1, f = e.indexOf("words") > -1, l = d && !f && !h, g = c && ("push" in c ? new RegExp("(?:" + c.join("|") + ")", "gu") : c), p = g ? new RegExp(g.source + "|" + gu.source, "gu") : gu, _ = !!t.ignore && pu(t.ignore), { orig: S, animTime: E, obs: k } = this._data, T;
    return (d || f || h) && (this.elements.forEach((x, M) => {
      S[M] = {
        element: x,
        html: x.innerHTML,
        ariaL: x.getAttribute("aria-label"),
        ariaH: x.getAttribute("aria-hidden")
      }, i === "auto" ? x.setAttribute("aria-label", (x.textContent || "").trim()) : i === "hidden" && x.setAttribute("aria-hidden", "true");
      let P = [], O = [], D = [], N = d ? wl("char", t, P) : null, q = wl("word", t, O), $, H, Z, et;
      if (Cd(x, t, q, N, l, r && (h || l), _, p, g, !1), h) {
        let V = Ho(x.childNodes), U = Tg(x, V, t, D), nt, ot = [], v = 0, J = V.map((G) => G.nodeType === 1 ? G.getBoundingClientRect() : mu), rt = mu;
        for ($ = 0; $ < V.length; $++)
          nt = V[$], nt.nodeType === 1 && (nt.nodeName === "BR" ? (ot.push(nt), U(v, $ + 1), v = $ + 1, rt = J[v]) : ($ && J[$].top > rt.top && J[$].left <= rt.left && (U(v, $), v = $), rt = J[$]));
        v < $ && U(v, $), ot.forEach((G) => {
          var st;
          return (st = G.parentNode) == null ? void 0 : st.removeChild(G);
        });
      }
      if (!f) {
        for ($ = 0; $ < O.length; $++)
          if (H = O[$], d || !H.nextSibling || H.nextSibling.nodeType !== 3)
            if (n && !h) {
              for (Z = document.createElement("span"), Z.style.whiteSpace = "nowrap"; H.firstChild; )
                Z.appendChild(H.firstChild);
              H.replaceWith(Z);
            } else
              H.replaceWith(...H.childNodes);
          else
            et = H.nextSibling, et && et.nodeType === 3 && (et.textContent = (H.textContent || "") + (et.textContent || ""), H.remove());
        O.length = 0, x.normalize();
      }
      this.lines.push(...D), this.words.push(...O), this.chars.push(...P);
    }), u && this[u] && this.masks.push(...this[u].map((x) => {
      let M = x.cloneNode();
      return x.replaceWith(M), M.appendChild(x), x.className && (M.className = x.className.replace(/(\b\w+\b)/g, "$1-mask")), M.style.overflow = "clip", M;
    }))), this.isSplit = !0, dn && (a ? dn.addEventListener("loadingdone", this._split) : dn.status === "loading" && console.warn("SplitText called before fonts loaded")), (T = s && s(this)) && T.totalTime && (this._data.anim = E ? T.totalTime(E) : T), h && a && this.elements.forEach((x, M) => {
      S[M].width = x.offsetWidth, k && k.observe(x);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: r, obs: n } = this._data;
    return n && n.disconnect(), i.forEach(({ element: s, html: a, ariaL: c, ariaH: u }) => {
      s.innerHTML = a, c ? s.setAttribute("aria-label", c) : s.removeAttribute("aria-label"), u ? s.setAttribute("aria-hidden", u) : s.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, dn == null || dn.removeEventListener("loadingdone", this._split), r && (this._data.animTime = r.totalTime(), r.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Ad(t, e);
  }
  static register(t) {
    Vn = Vn || t || window.gsap, Vn && (Ho = Vn.utils.toArray, ka = Vn.core.context || ka), !yl && window.innerWidth > 0 && (dn = document.fonts, yl = !0);
  }
};
Pd.version = "3.13.0";
let Eg = Pd;
var z = Bt.registerPlugin(qs) || Bt;
z.core.Tween;
var ho = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cg(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var as = { exports: {} };
as.exports;
var vu;
function Pg() {
  return vu || (vu = 1, function(o, t) {
    var e = 200, i = "__lodash_hash_undefined__", r = 800, n = 16, s = 9007199254740991, a = "[object Arguments]", c = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", d = "[object Date]", f = "[object Error]", l = "[object Function]", g = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", S = "[object Null]", E = "[object Object]", k = "[object Proxy]", T = "[object RegExp]", x = "[object Set]", M = "[object String]", P = "[object Undefined]", O = "[object WeakMap]", D = "[object ArrayBuffer]", N = "[object DataView]", q = "[object Float32Array]", $ = "[object Float64Array]", H = "[object Int8Array]", Z = "[object Int16Array]", et = "[object Int32Array]", V = "[object Uint8Array]", U = "[object Uint8ClampedArray]", nt = "[object Uint16Array]", ot = "[object Uint32Array]", v = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, rt = /^(?:0|[1-9]\d*)$/, G = {};
    G[q] = G[$] = G[H] = G[Z] = G[et] = G[V] = G[U] = G[nt] = G[ot] = !0, G[a] = G[c] = G[D] = G[h] = G[N] = G[d] = G[f] = G[l] = G[p] = G[_] = G[E] = G[T] = G[x] = G[M] = G[O] = !1;
    var st = typeof ho == "object" && ho && ho.Object === Object && ho, Ut = typeof self == "object" && self && self.Object === Object && self, wt = st || Ut || Function("return this")(), It = t && !t.nodeType && t, pt = It && !0 && o && !o.nodeType && o, jt = pt && pt.exports === It, ee = jt && st.process, Rt = function() {
      try {
        var m = pt && pt.require && pt.require("util").types;
        return m || ee && ee.binding && ee.binding("util");
      } catch {
      }
    }(), Yt = Rt && Rt.isTypedArray;
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
    function ft(m, w) {
      for (var L = -1, Q = Array(m); ++L < m; )
        Q[L] = w(L);
      return Q;
    }
    function lt(m) {
      return function(w) {
        return m(w);
      };
    }
    function Se(m, w) {
      return m == null ? void 0 : m[w];
    }
    function A(m, w) {
      return function(L) {
        return m(w(L));
      };
    }
    var zt = Array.prototype, qe = Function.prototype, Ae = Object.prototype, Lt = wt["__core-js_shared__"], Dt = qe.toString, ae = Ae.hasOwnProperty, Ue = function() {
      var m = /[^.]+$/.exec(Lt && Lt.keys && Lt.keys.IE_PROTO || "");
      return m ? "Symbol(src)_1." + m : "";
    }(), Wt = Ae.toString, ie = Dt.call(Object), Ct = RegExp(
      "^" + Dt.call(ae).replace(v, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), le = jt ? wt.Buffer : void 0, Oe = wt.Symbol, Me = wt.Uint8Array;
    le && le.allocUnsafe;
    var Ni = A(Object.getPrototypeOf, Object), qt = Object.create, $i = Ae.propertyIsEnumerable, Je = zt.splice, ge = Oe ? Oe.toStringTag : void 0, ke = function() {
      try {
        var m = Jo(Object, "defineProperty");
        return m({}, "", {}), m;
      } catch {
      }
    }(), _i = le ? le.isBuffer : void 0, De = Math.max, at = Date.now, Re = Jo(wt, "Map"), Mt = Jo(Object, "create"), Te = /* @__PURE__ */ function() {
      function m() {
      }
      return function(w) {
        if (!Zi(w))
          return {};
        if (qt)
          return qt(w);
        m.prototype = w;
        var L = new m();
        return m.prototype = void 0, L;
      };
    }();
    function Jt(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var Q = m[w];
        this.set(Q[0], Q[1]);
      }
    }
    function yi() {
      this.__data__ = Mt ? Mt(null) : {}, this.size = 0;
    }
    function j(m) {
      var w = this.has(m) && delete this.__data__[m];
      return this.size -= w ? 1 : 0, w;
    }
    function y(m) {
      var w = this.__data__;
      if (Mt) {
        var L = w[m];
        return L === i ? void 0 : L;
      }
      return ae.call(w, m) ? w[m] : void 0;
    }
    function B(m) {
      var w = this.__data__;
      return Mt ? w[m] !== void 0 : ae.call(w, m);
    }
    function b(m, w) {
      var L = this.__data__;
      return this.size += this.has(m) ? 0 : 1, L[m] = Mt && w === void 0 ? i : w, this;
    }
    Jt.prototype.clear = yi, Jt.prototype.delete = j, Jt.prototype.get = y, Jt.prototype.has = B, Jt.prototype.set = b;
    function C(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var Q = m[w];
        this.set(Q[0], Q[1]);
      }
    }
    function F() {
      this.__data__ = [], this.size = 0;
    }
    function I(m) {
      var w = this.__data__, L = ji(w, m);
      if (L < 0)
        return !1;
      var Q = w.length - 1;
      return L == Q ? w.pop() : Je.call(w, L, 1), --this.size, !0;
    }
    function Y(m) {
      var w = this.__data__, L = ji(w, m);
      return L < 0 ? void 0 : w[L][1];
    }
    function R(m) {
      return ji(this.__data__, m) > -1;
    }
    function W(m, w) {
      var L = this.__data__, Q = ji(L, m);
      return Q < 0 ? (++this.size, L.push([m, w])) : L[Q][1] = w, this;
    }
    C.prototype.clear = F, C.prototype.delete = I, C.prototype.get = Y, C.prototype.has = R, C.prototype.set = W;
    function tt(m) {
      var w = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++w < L; ) {
        var Q = m[w];
        this.set(Q[0], Q[1]);
      }
    }
    function X() {
      this.size = 0, this.__data__ = {
        hash: new Jt(),
        map: new (Re || C)(),
        string: new Jt()
      };
    }
    function ut(m) {
      var w = Xs(this, m).delete(m);
      return this.size -= w ? 1 : 0, w;
    }
    function bt(m) {
      return Xs(this, m).get(m);
    }
    function Et(m) {
      return Xs(this, m).has(m);
    }
    function gt(m, w) {
      var L = Xs(this, m), Q = L.size;
      return L.set(m, w), this.size += L.size == Q ? 0 : 1, this;
    }
    tt.prototype.clear = X, tt.prototype.delete = ut, tt.prototype.get = bt, tt.prototype.has = Et, tt.prototype.set = gt;
    function ht(m) {
      var w = this.__data__ = new C(m);
      this.size = w.size;
    }
    function Pt() {
      this.__data__ = new C(), this.size = 0;
    }
    function ct(m) {
      var w = this.__data__, L = w.delete(m);
      return this.size = w.size, L;
    }
    function me(m) {
      return this.__data__.get(m);
    }
    function Vt(m) {
      return this.__data__.has(m);
    }
    function _e(m, w) {
      var L = this.__data__;
      if (L instanceof C) {
        var Q = L.__data__;
        if (!Re || Q.length < e - 1)
          return Q.push([m, w]), this.size = ++L.size, this;
        L = this.__data__ = new tt(Q);
      }
      return L.set(m, w), this.size = L.size, this;
    }
    ht.prototype.clear = Pt, ht.prototype.delete = ct, ht.prototype.get = me, ht.prototype.has = Vt, ht.prototype.set = _e;
    function ye(m, w) {
      var L = ia(m), Q = !L && ea(m), xt = !L && !Q && ac(m), At = !L && !Q && !xt && cc(m), Xt = L || Q || xt || At, Ot = Xt ? ft(m.length, String) : [], Gt = Ot.length;
      for (var ki in m)
        Xt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (ki == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        xt && (ki == "offset" || ki == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        At && (ki == "buffer" || ki == "byteLength" || ki == "byteOffset") || // Skip index properties.
        sc(ki, Gt)) || Ot.push(ki);
      return Ot;
    }
    function ce(m, w, L) {
      (L !== void 0 && !Gs(m[w], L) || L === void 0 && !(w in m)) && ue(m, w, L);
    }
    function Ki(m, w, L) {
      var Q = m[w];
      (!(ae.call(m, w) && Gs(Q, L)) || L === void 0 && !(w in m)) && ue(m, w, L);
    }
    function ji(m, w) {
      for (var L = m.length; L--; )
        if (Gs(m[L][0], w))
          return L;
      return -1;
    }
    function ue(m, w, L) {
      w == "__proto__" && ke ? ke(m, w, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : m[w] = L;
    }
    var re = Wd();
    function We(m) {
      return m == null ? m === void 0 ? P : S : ge && ge in Object(m) ? Vd(m) : Zd(m);
    }
    function nn(m) {
      return Bn(m) && We(m) == a;
    }
    function Vs(m) {
      if (!Zi(m) || jd(m))
        return !1;
      var w = na(m) ? Ct : J;
      return w.test(rf(m));
    }
    function Ir(m) {
      return Bn(m) && lc(m.length) && !!G[We(m)];
    }
    function vi(m) {
      if (!Zi(m))
        return Qd(m);
      var w = oc(m), L = [];
      for (var Q in m)
        Q == "constructor" && (w || !ae.call(m, Q)) || L.push(Q);
      return L;
    }
    function Qi(m, w, L, Q, xt) {
      m !== w && re(w, function(At, Xt) {
        if (xt || (xt = new ht()), Zi(At))
          sn(m, w, Xt, L, Qi, Q, xt);
        else {
          var Ot = Q ? Q(ta(m, Xt), At, Xt + "", m, w, xt) : void 0;
          Ot === void 0 && (Ot = At), ce(m, Xt, Ot);
        }
      }, uc);
    }
    function sn(m, w, L, Q, xt, At, Xt) {
      var Ot = ta(m, L), Gt = ta(w, L), ki = Xt.get(Gt);
      if (ki) {
        ce(m, L, ki);
        return;
      }
      var si = At ? At(Ot, Gt, L + "", m, w, Xt) : void 0, Hn = si === void 0;
      if (Hn) {
        var sa = ia(Gt), oa = !sa && ac(Gt), dc = !sa && !oa && cc(Gt);
        si = Gt, sa || oa || dc ? ia(Ot) ? si = Ot : nf(Ot) ? si = Yd(Ot) : oa ? (Hn = !1, si = Fd(Gt)) : dc ? (Hn = !1, si = Hd(Gt)) : si = [] : sf(Gt) || ea(Gt) ? (si = Ot, ea(Ot) ? si = of(Ot) : (!Zi(Ot) || na(Ot)) && (si = Xd(Gt))) : Hn = !1;
      }
      Hn && (Xt.set(Gt, si), xt(si, Gt, Q, At, Xt), Xt.delete(Gt)), ce(m, L, si);
    }
    function Oi(m, w) {
      return tf(Jd(m, w, hc), m + "");
    }
    var $d = ke ? function(m, w) {
      return ke(m, "toString", {
        configurable: !0,
        enumerable: !1,
        value: cf(w),
        writable: !0
      });
    } : hc;
    function Fd(m, w) {
      return m.slice();
    }
    function Bd(m) {
      var w = new m.constructor(m.byteLength);
      return new Me(w).set(new Me(m)), w;
    }
    function Hd(m, w) {
      var L = Bd(m.buffer);
      return new m.constructor(L, m.byteOffset, m.length);
    }
    function Yd(m, w) {
      var L = -1, Q = m.length;
      for (w || (w = Array(Q)); ++L < Q; )
        w[L] = m[L];
      return w;
    }
    function qd(m, w, L, Q) {
      var xt = !L;
      L || (L = {});
      for (var At = -1, Xt = w.length; ++At < Xt; ) {
        var Ot = w[At], Gt = void 0;
        Gt === void 0 && (Gt = m[Ot]), xt ? ue(L, Ot, Gt) : Ki(L, Ot, Gt);
      }
      return L;
    }
    function Ud(m) {
      return Oi(function(w, L) {
        var Q = -1, xt = L.length, At = xt > 1 ? L[xt - 1] : void 0, Xt = xt > 2 ? L[2] : void 0;
        for (At = m.length > 3 && typeof At == "function" ? (xt--, At) : void 0, Xt && Gd(L[0], L[1], Xt) && (At = xt < 3 ? void 0 : At, xt = 1), w = Object(w); ++Q < xt; ) {
          var Ot = L[Q];
          Ot && m(w, Ot, Q, At);
        }
        return w;
      });
    }
    function Wd(m) {
      return function(w, L, Q) {
        for (var xt = -1, At = Object(w), Xt = Q(w), Ot = Xt.length; Ot--; ) {
          var Gt = Xt[++xt];
          if (L(At[Gt], Gt, At) === !1)
            break;
        }
        return w;
      };
    }
    function nc(m, w, L, Q, xt, At) {
      return Zi(m) && Zi(w) && (At.set(w, m), Qi(m, w, void 0, nc, At), At.delete(w)), m;
    }
    function Xs(m, w) {
      var L = m.__data__;
      return Kd(w) ? L[typeof w == "string" ? "string" : "hash"] : L.map;
    }
    function Jo(m, w) {
      var L = Se(m, w);
      return Vs(L) ? L : void 0;
    }
    function Vd(m) {
      var w = ae.call(m, ge), L = m[ge];
      try {
        m[ge] = void 0;
        var Q = !0;
      } catch {
      }
      var xt = Wt.call(m);
      return Q && (w ? m[ge] = L : delete m[ge]), xt;
    }
    function Xd(m) {
      return typeof m.constructor == "function" && !oc(m) ? Te(Ni(m)) : {};
    }
    function sc(m, w) {
      var L = typeof m;
      return w = w ?? s, !!w && (L == "number" || L != "symbol" && rt.test(m)) && m > -1 && m % 1 == 0 && m < w;
    }
    function Gd(m, w, L) {
      if (!Zi(L))
        return !1;
      var Q = typeof w;
      return (Q == "number" ? ra(L) && sc(w, L.length) : Q == "string" && w in L) ? Gs(L[w], m) : !1;
    }
    function Kd(m) {
      var w = typeof m;
      return w == "string" || w == "number" || w == "symbol" || w == "boolean" ? m !== "__proto__" : m === null;
    }
    function jd(m) {
      return !!Ue && Ue in m;
    }
    function oc(m) {
      var w = m && m.constructor, L = typeof w == "function" && w.prototype || Ae;
      return m === L;
    }
    function Qd(m) {
      var w = [];
      if (m != null)
        for (var L in Object(m))
          w.push(L);
      return w;
    }
    function Zd(m) {
      return Wt.call(m);
    }
    function Jd(m, w, L) {
      return w = De(w === void 0 ? m.length - 1 : w, 0), function() {
        for (var Q = arguments, xt = -1, At = De(Q.length - w, 0), Xt = Array(At); ++xt < At; )
          Xt[xt] = Q[w + xt];
        xt = -1;
        for (var Ot = Array(w + 1); ++xt < w; )
          Ot[xt] = Q[xt];
        return Ot[w] = L(Xt), dt(m, this, Ot);
      };
    }
    function ta(m, w) {
      if (!(w === "constructor" && typeof m[w] == "function") && w != "__proto__")
        return m[w];
    }
    var tf = ef($d);
    function ef(m) {
      var w = 0, L = 0;
      return function() {
        var Q = at(), xt = n - (Q - L);
        if (L = Q, xt > 0) {
          if (++w >= r)
            return arguments[0];
        } else
          w = 0;
        return m.apply(void 0, arguments);
      };
    }
    function rf(m) {
      if (m != null) {
        try {
          return Dt.call(m);
        } catch {
        }
        try {
          return m + "";
        } catch {
        }
      }
      return "";
    }
    function Gs(m, w) {
      return m === w || m !== m && w !== w;
    }
    var ea = nn(/* @__PURE__ */ function() {
      return arguments;
    }()) ? nn : function(m) {
      return Bn(m) && ae.call(m, "callee") && !$i.call(m, "callee");
    }, ia = Array.isArray;
    function ra(m) {
      return m != null && lc(m.length) && !na(m);
    }
    function nf(m) {
      return Bn(m) && ra(m);
    }
    var ac = _i || uf;
    function na(m) {
      if (!Zi(m))
        return !1;
      var w = We(m);
      return w == l || w == g || w == u || w == k;
    }
    function lc(m) {
      return typeof m == "number" && m > -1 && m % 1 == 0 && m <= s;
    }
    function Zi(m) {
      var w = typeof m;
      return m != null && (w == "object" || w == "function");
    }
    function Bn(m) {
      return m != null && typeof m == "object";
    }
    function sf(m) {
      if (!Bn(m) || We(m) != E)
        return !1;
      var w = Ni(m);
      if (w === null)
        return !0;
      var L = ae.call(w, "constructor") && w.constructor;
      return typeof L == "function" && L instanceof L && Dt.call(L) == ie;
    }
    var cc = Yt ? lt(Yt) : Ir;
    function of(m) {
      return qd(m, uc(m));
    }
    var af = Oi(function(m) {
      return m.push(void 0, nc), dt(lf, void 0, m);
    });
    function uc(m) {
      return ra(m) ? ye(m) : vi(m);
    }
    var lf = Ud(function(m, w, L, Q) {
      Qi(m, w, L, Q);
    });
    function cf(m) {
      return function() {
        return m;
      };
    }
    function hc(m) {
      return m;
    }
    function uf() {
      return !1;
    }
    o.exports = af;
  }(as, as.exports)), as.exports;
}
var Ag = Pg();
const Ht = /* @__PURE__ */ Cg(Ag), Og = 60, Xn = {}, wu = (o, t = Og) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), r = 1e3 / t;
  Xn[o] = Xn[o] || null;
  const n = Xn[o] ? i - Xn[o] : null;
  (n === null || n > r) && (Xn[o] = i - n % r, o(...e));
});
function Bs() {
  if (!window.matchMedia)
    return !1;
  const o = window.matchMedia("(prefers-reduced-motion: reduce)");
  return o ? o.matches : !1;
}
const bl = (o, t, e, i, r, n) => {
  const s = (o + t) / 2;
  if (e <= 0 || t - o < i)
    return s;
  const a = `(${r}:${s}${n})`;
  return window.matchMedia(a).matches ? bl(s, t, e - 1, i, r, n) : bl(o, s, e - 1, i, r, n);
}, kg = (o, t, e, i, r, n) => bl(e, i, r, n, o, t), Ig = () => Math.round(
  kg("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, Lg = (o) => Math.round(window.devicePixelRatio * 100) - o, Mg = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Ia = {
  firefox: Ig,
  chrome: Lg,
  default: Mg
}, bu = {
  calculate: (o, t) => Ia[o] ? Ia[o](t) : Ia.default(t)
}, tc = "APPLICATION:MOBILE_MENU:OPEN", ec = "APPLICATION:MOBILE_MENU:CLOSED", Yo = "APPLICATION_PRELUDIUM", xl = "APPLICATION:INITIALIZED", Hs = "APPLICATION:READY", Ai = "APPLICATION:REVEALED", zi = "APPLICATION:RESIZE", Or = "APPLICATION:SCROLL", Od = "APPLICATION:SCROLL_LOCKED", kd = "APPLICATION:SCROLL_RELEASED", jo = "APPLICATION:FORCED_SCROLL_START", Qo = "APPLICATION:FORCED_SCROLL_END", Zo = "APPLICATION:OUTLINE", Id = "APPLICATION:VISIBILITY_CHANGE", Ld = "APPLICATION:HIDDEN", Md = "APPLICATION:VISIBLE", qo = "BREAKPOINT:CHANGE", ic = "IMAGE:LAZYLOADED", Dd = "IMAGE:REVEALED", Rd = "SECTION:LAZYLOADED", am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: Qo,
  APPLICATION_FORCED_SCROLL_START: jo,
  APPLICATION_HIDDEN: Ld,
  APPLICATION_INITIALIZED: xl,
  APPLICATION_MOBILE_MENU_CLOSED: ec,
  APPLICATION_MOBILE_MENU_OPEN: tc,
  APPLICATION_OUTLINE: Zo,
  APPLICATION_PRELUDIUM: Yo,
  APPLICATION_READY: Hs,
  APPLICATION_RESIZE: zi,
  APPLICATION_REVEALED: Ai,
  APPLICATION_SCROLL: Or,
  APPLICATION_SCROLL_LOCKED: Od,
  APPLICATION_SCROLL_RELEASED: kd,
  APPLICATION_VISIBILITY_CHANGE: Id,
  APPLICATION_VISIBLE: Md,
  BREAKPOINT_CHANGE: qo,
  IMAGE_LAZYLOADED: ic,
  IMAGE_REVEALED: Dd,
  SECTION_LAZYLOADED: Rd
}, Symbol.toStringTag, { value: "Module" })), Dg = {
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
class xu {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = Ht(e, Dg), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Yo, () => {
      this.initialize(!1);
    }), window.addEventListener(Ai, () => {
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
        const s = (a) => {
          if (a.matches) {
            const c = this.currentBreakpoint;
            if (this.setCurrentBreakpoint(), c !== this.currentBreakpoint) {
              const u = new CustomEvent(qo, {
                detail: {
                  leaveBreakpoint: c,
                  enterBreakpoint: this.currentBreakpoint
                }
              });
              window.dispatchEvent(u);
            }
          }
          Object.prototype.hasOwnProperty.call(this.opts.listeners, i) && this.opts.listeners[i](a);
        };
        this.mediaQueries[i].addListener(s);
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
        }, r = new CustomEvent(qo);
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
class Rg {
  constructor(t, e) {
    this.app = t, this.testFns = {
      touch: this.testTouch
    }, this.results = {}, this.testIE11() ? this.testFor("ie11", !0) : this.results.ie11 = !1, this.testIOS() ? this.testFor("ios", !0) : this.results.ios = !1, this.testWebview() ? this.testFor("webview", !0) : this.results.webview = !1;
    const i = this.testBrowsers();
    this.results.browser = i, this.app.browser = i, document.documentElement.setAttribute("data-browser", i);
    const n = Object.keys(e).filter((s) => e[s]);
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
        const e = new window.CustomEvent(Zo);
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
class zg {
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
class Ng {
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
    const i = t.getBoundingClientRect(), r = this.outerHeight(t), n = i.top + r, s = e.getBoundingClientRect(), a = this.outerHeight(e), c = s.top + a;
    return n > s.top ? n - s.top : i.top > c ? i.top - c : 0;
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
    const e = t.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, r = window.innerWidth || document.documentElement.clientWidth, n = e.top <= i && e.top + e.height >= 0, s = e.left <= r && e.left + e.width >= 0;
    return n && s;
  }
  /**
   * Strict viewport check - element must be fully contained within viewport bounds
   * Useful for popovers/tooltips that need to be completely visible
   *
   * @param {*} el
   */
  inViewportStrict(t) {
    const e = t.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, r = window.innerWidth || document.documentElement.clientWidth, n = e.top >= 0 && e.bottom <= i, s = e.left >= 0 && e.right <= r;
    return n && s;
  }
}
const it = new Ng();
z.registerPlugin(rn);
z.defaults({
  ease: "sine.out"
});
window.onpageshow = (o) => {
  const t = window.location.hash;
  if (o.persisted || t) {
    const i = () => {
      console.log("== fixVisibility");
      const r = document.querySelector("#fader");
      r && z.set(r, { autoAlpha: 0, display: "none" });
      const n = document.querySelectorAll("[data-fader]");
      n.length && z.set(n, { autoAlpha: 0 }), z.set(document.body, { clearProps: "opacity" }), document.body.classList.remove("unloaded");
      const s = it.find("header[data-nav]");
      s && z.set(s, { clearProps: "opacity, transform" });
      const a = it.find("main");
      a && z.set(a, { clearProps: "opacity, transform" });
      const c = it.find("footer");
      c && z.set(c, { clearProps: "opacity, transform" });
    };
    o.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const Su = {
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
    fadeIn: (o = () => {
    }) => {
      const t = document.querySelector("#fader");
      if (!t) {
        window.bfTO && clearTimeout(window.bfTO), document.body.classList.remove("unloaded"), o();
        return;
      }
      z.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), z.set(t, { display: "none" }), document.body.classList.remove("unloaded"), o();
        }
      });
    }
  }
};
class lm {
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
    delete t.breakpointConfig, this.opts = Ht(t, Su), this.opts.breakpointConfig = e || Su.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Rg(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new xu(this, this.opts.breakpointConfig) : this.breakpoints = new xu(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new zg(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = Bs(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (z.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(qo, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent(Yo, this), this.initializedEvent = new window.CustomEvent(xl, this), this.readyEvent = new window.CustomEvent(Hs, this), this.revealedEvent = new window.CustomEvent(Ai, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", wu(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", wu(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Yo), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(xl), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(Hs), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), z.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = bu.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (bu.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(Od, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, z.set(document.body, { overflow: "hidden" }), z.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(kd, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, z.set(document.body, { overflow: t }), z.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
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
    const s = new window.CustomEvent(jo);
    this.state.forcedScroll = !0, i && window.dispatchEvent(s), typeof t == "object" ? n = t : n = { y: t, autoKill: !1 }, z.to(window, {
      duration: e,
      scrollTo: n,
      onComplete: () => {
        const a = new window.CustomEvent(Qo);
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Ai));
  }
  _getBaseVW() {
    const t = it.getCSSVar("--font-base-px"), e = parseFloat(t, 10), i = window.innerWidth;
    return `${e / i * 100}vw`;
  }
  setDims() {
    const t = document.querySelector(":root");
    this.size.initialInnerHeight = window.innerHeight, this.size.initialOuterHeight = window.outerHeight, this.size.initialInnerWidth = window.innerWidth, this.size.initialOuterWidth = window.outerWidth, this.size.scrollHeight = document.body.scrollHeight, t.style.setProperty("--vp-initial-inner-h", `${this.size.initialInnerHeight}px`), t.style.setProperty("--vp-initial-outer-h", `${this.size.initialOuterHeight}px`), t.style.setProperty("--vp-initial-inner-w", `${this.size.initialInnerWidth}px`), t.style.setProperty("--vp-initial-outer-w", `${this.size.initialOuterWidth}px`), t.style.setProperty("--ec-zoom", `${this.size.zoom}`), t.style.setProperty("--scroll-h", `${this.size.scrollHeight}px`), this.setvh100Max(), this.setvh100(), this.setFontBaseVw(), this.size.devicePixelRatio = window.devicePixelRatio, this.size.container = it.getCSSVar("--container-padding"), this.size.width = window.innerWidth, this.size.height = window.innerHeight, this.position.top = window.pageYOffset, this.position.left = window.pageXOffset;
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
    const s = new CustomEvent(zi, {
      detail: { widthChanged: e, heightChanged: i }
    });
    window.dispatchEvent(s);
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
    }, i = new CustomEvent(Or, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(Id, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(Ld, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(Md, t), window.dispatchEvent(e));
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
    z.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
    const e = t.querySelector("span"), i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    e.addEventListener("click", () => {
      const n = t.querySelector("b"), s = document.createElement("textarea");
      s.value = `
${n.textContent}
SCREEN >> ${window.screen.width}x${window.screen.height}
WINDOW >> ${i}x${r}

FEATURES >>
${JSON.stringify(this.featureTests.results, void 0, 2)}
      `, document.body.appendChild(s), s.select(), document.execCommand("Copy"), s.remove(), e.innerHTML = "OK!", setTimeout(() => {
        e.innerHTML = "KOPIER";
      }, 1500);
    });
  }
  toggleDebug() {
    const t = z.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          z.set([e, i], { display: "none" });
        });
        break;
      case 1:
        z.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        z.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        it.hasClass(i, "visible") ? (z.set(r, { width: "auto" }), z.to(r, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (z.set(r, { width: 0 }), i.classList.toggle("visible"), z.to(r, {
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
const $g = {
  onAccept: (o) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = z.timeline();
    o.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), o.opts.setCookies(o), e.to(o.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(o.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(o.cc, { display: "none" });
  },
  onRefuse: (o) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1);
    const e = z.timeline();
    o.setCookie("COOKIES_CONSENT_STATUS", 0, t, "/"), e.to(o.cc, { duration: 0.35, y: "120%", ease: "power3.in" }, "0").to(o.inner, { duration: 0.3, opacity: 0, ease: "power3.in" }, "0").set(o.cc, { display: "none" });
  },
  alreadyConsented: (o) => {
  },
  alreadyRefused: (o) => {
  },
  setCookies: (o) => {
  },
  showCC: (o) => {
    if (o.hasCookie("COOKIES_CONSENT_STATUS")) {
      o.getCookie("COOKIES_CONSENT_STATUS") === "1" ? o.opts.alreadyConsented(o) : o.opts.alreadyRefused(o);
      return;
    }
    z.timeline().fromTo(
      o.cc,
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
      o.text,
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
      o.btns,
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
class cm {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, $g), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Ai, () => {
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
  setCookie(t, e, i, r, n, s) {
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
    return document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)}${a}${n ? `; domain=${n}` : ""}${r ? `; path=${r}` : ""}${s ? "; secure" : ""}`, !0;
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
const Fg = {};
class um {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, Fg), this.initialize();
  }
  initialize() {
    const t = document.querySelectorAll("[data-cover-overlay]");
    Array.from(t).forEach((e) => {
      let i;
      const r = e.querySelector(".picture-wrapper"), n = e.querySelector("[data-cover-overlay-button]"), s = e.querySelector("iframe");
      s && s.setAttribute(
        "allow",
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ), e.hasAttribute("data-cover-overlay-vimeo-play") && (window.Vimeo && s ? i = new window.Vimeo.Player(s) : console.error("==> JUPITER// Missing vimeo JS or iframe")), n.addEventListener("click", () => {
        z.timeline().set(s, { opacity: 1 }).to(n, { duration: 0.5, opacity: 0, ease: "sine.in" }).to(r, { duration: 1, opacity: 0, ease: "sine.in" }).set(r, { display: "none" }).call(() => {
          i && i.play();
        });
      });
    });
  }
}
class Bg {
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
    return Object.entries(t).forEach(([r, n]) => {
      const s = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || [], a = !n || s.includes(n);
      i = i.replace(`:${r}`, a ? "" : n);
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
    const r = [];
    i = i.replace(/:(\w+)/g, (h, d) => (r.push(d), "([^/]+)"));
    const n = t.split("/"), s = e.split("/");
    if (s.length <= n.length) {
      let d = n.slice(0, s.length).join("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const f = [];
      d = d.replace(/:(\w+)/g, (p, _) => (f.push(_), "([^/]+)"));
      const l = new RegExp(`^${d}$`), g = e.match(l);
      if (g) {
        const p = {};
        return f.forEach((_, S) => {
          g[S + 1] && (p[_] = decodeURIComponent(g[S + 1]));
        }), p;
      }
    }
    const a = new RegExp(`^${i}$`), c = e.match(a);
    if (!c)
      return {};
    const u = {};
    return r.forEach((h, d) => {
      c[d + 1] && (u[h] = decodeURIComponent(c[d + 1]));
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
      const r = this.dataloader.$paramEls.find((n) => (n.dataset.loaderParamKey || "defaultParam") === e && n.dataset.loaderParam === i);
      r && r.setAttribute("data-loader-param-selected", ""), e === "defaultParam" ? this.dataloader.opts.loaderParam.defaultParam = i : this.dataloader.opts.loaderParam[e] = i;
    });
  }
  /**
   * Clean up event listeners
   */
  destroy() {
    this.popstateHandler && window.removeEventListener("popstate", this.popstateHandler);
  }
}
const Hg = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (o) => {
  }
};
class hm {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = it.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = it.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = it.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = Ht(i, Hg), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = it.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new Bg(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
      e.addEventListener("click", this.onParam.bind(this));
    }), this.$moreBtn = it.find(this.$el, "[data-loader-more]"), !this.$moreBtn && this.id && (this.$moreBtn = it.find(`[data-loader-more-for="${this.id}"]`)), this.$moreBtn && this.$moreBtn.addEventListener("click", this.onMore.bind(this)), this.$filterInput = it.find(this.$el, "[data-loader-filter]"), !this.$filterInput && this.id && (this.$filterInput = it.find(`[data-loader-filter-for="${this.id}"]`)), this.$filterInput && this.$filterInput.addEventListener("input", this.debounce(this.onFilterInput.bind(this)));
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
    this.urlSync && this.urlSync.updateUrl(this.opts.loaderParam), this.fetch();
  }
  fetch(t = !1) {
    const { defaultParam: e, ...i } = this.opts.loaderParam, r = this.opts.filter, n = `${this.baseURL}/${e ? e + "/" : ""}${this.opts.page}?` + new URLSearchParams({ filter: r, ...i });
    fetch(n).then((s) => (this.status = s.headers.get("jpt-dataloader") || "available", this.updateButton(), s.text())).then((s) => {
      t ? this.$canvasEl.innerHTML += s : this.$canvasEl.innerHTML = s, this.opts.onFetch(this), this.complete();
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
const Yg = {
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
  onBeforeOpen: async (o) => {
  },
  onAfterOpen: async (o) => {
  },
  onBeforeClose: async (o) => {
  },
  onAfterClose: async (o) => {
  }
};
class dm {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Ht(e, Yg), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = z.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = it.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
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
      const s = window.getComputedStyle(this.elements.menu);
      let a = parseFloat(s.left) || 0;
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
const qg = {};
class fm {
  constructor(t, e, i = {}, r = document.body) {
    this.app = t, this.container = r, this.opts = Ht(i, qg), this.selector = e, this.initialize(), window.addEventListener(zi, () => {
      z.set("[data-eq-height-elements-adjusted]", {
        clearProps: "minHeight"
      }), this.initialize();
    });
  }
  initialize() {
    const t = it.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const r = [];
      let n = [], s = 0;
      it.all(e, this.selector).forEach((c) => {
        const u = c.getBoundingClientRect();
        if (i === null) {
          s = u.height, n.push(c), i = u.top;
          return;
        }
        i !== u.top ? (console.debug("== pushing actionables", { elements: n, height: s }), r.push({ elements: n, height: s }), n = [], s = u.height) : i === u.top ? u.height > s && (s = u.height) : s = u.height, n.push(c), i = u.top;
      }), n.length && r.push({ elements: n, height: s }), r.length && r.forEach((c) => {
        z.set(c.elements, {
          minHeight: c.height,
          attr: { "data-eq-height-elements-adjusted": !0 }
        });
      });
    });
  }
}
function Ws(o, t = !1) {
  return new Promise((e) => {
    t ? o.hasAttribute("data-ll-loaded") ? e({ img: o, status: "ok" }) : o.addEventListener(ic, () => {
      e({ img: o, status: "ok" });
    }) : o.complete ? e({ img: o, status: "ok" }) : (o.onload = () => {
      e({ img: o, status: "ok" });
    }, o.onerror = () => {
      e({ img: o, status: "error" });
    });
  });
}
function rc(o, t = !1) {
  o && o.nodeType && (o = o.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < o.length; i += 1) {
    const r = o[i];
    e.push(Ws(r, t));
  }
  return Promise.all(e);
}
const Ug = {
  listenForResize: !0
};
class pm {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = Ht(e, Ug), this.initialize(), e.listenForResize && window.addEventListener(zi, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let r = [], n = 0;
      const s = it.all(t, "img");
      rc(s, !1).then(() => {
        s.forEach((a) => {
          const c = a.getBoundingClientRect(), u = this.getImgSizeInfo(a);
          if (e === null) {
            n = u.height, r.push(a), e = c.top;
            return;
          }
          e !== c.top ? (i.push({ elements: r, height: n }), r = [], n = u.height) : e === c.top ? u.height > n && (n = u.height) : n = u.height, r.push(a), e = c.top;
        }), r.length && i.push({ elements: r, height: n }), i.length && i.forEach((a) => {
          z.set(a.elements, { minHeight: a.height });
        });
      });
    });
  }
  initialize() {
    this.canvases = it.all(this.container, "[data-eq-height-images]"), this.run();
  }
  getRenderedSize(t, e, i, r, n, s) {
    const a = r / n, c = e / i;
    return (function() {
      return (t ? a > c : a < c) ? (this.width = e, this.height = e / a) : (this.width = i * a, this.height = i), this.left = (e - this.width) * (s / 100), this.right = this.width + this.left, this;
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
const zd = {
  onPin: (o) => {
    z.to(o.el, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (o) => {
    o._hiding = !0, z.to(o.el, {
      duration: 0.25,
      yPercent: "-100",
      ease: "sine.in",
      autoRound: !0,
      onComplete: () => {
        o._hiding = !1;
      }
    });
  },
  onAltBg: (o) => {
    o.opts.altBgColor && z.to(o.el, {
      duration: 0.2,
      backgroundColor: o.opts.altBgColor
    });
  },
  onNotAltBg: (o) => {
    o.opts.regBgColor && z.to(o.el, {
      duration: 0.4,
      backgroundColor: o.opts.regBgColor
    });
  },
  // eslint-disable-next-line no-unused-vars
  onSmall: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotSmall: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onTop: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotTop: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onBottom: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onNotBottom: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuOpen: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onMobileMenuClose: (o) => {
  },
  // eslint-disable-next-line no-unused-vars
  onIntersect: (o) => {
  },
  onOutline: (o) => {
    o.preventUnpin = !0, o.pin();
  }
}, Wg = {
  el: "header[data-nav]",
  on: Ai,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (o) => {
      z.timeline().set(o.el, { yPercent: -100 }).set(o.lis, { opacity: 0 });
    },
    enter: (o) => {
      z.timeline().to(o.el, {
        duration: 1,
        yPercent: 0,
        delay: o.opts.enterDelay,
        ease: "power3.out",
        autoRound: !0
      }).staggerTo(o.lis, 0.8, { opacity: 1, ease: "sine.in" }, 0.1, "-=1");
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
    ...zd
  }
};
class gm {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Ht(e, Wg), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.opts.intersects && (this.intersectingElements = it.all("[data-intersect]")), window.addEventListener(Zo, () => {
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
      jo,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      Qo,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Ai, () => {
      let t = Or;
      this.mainOpts.rafScroll || (t = "scroll"), window.addEventListener(t, this.redraw.bind(this), {
        capture: !1,
        passive: !0
      });
    }), this.app.registerCallback(
      Hs,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      zi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Ai, () => {
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
    return e = Ht(i, zd, e.default || {}), e;
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
const Vg = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class mm {
  constructor(t, e) {
    this.app = t, this.opts = Ht(e, Vg);
    const i = document.querySelector("main"), r = document.querySelector("[data-footer-reveal]");
    z.set(r, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const n = r.offsetHeight;
    if (z.set(i, { marginBottom: n }), this.opts.shadow) {
      const s = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = s, i.style.webkitBoxShadow = s, i.style.boxShadow = s;
    }
  }
}
const Xg = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class _m {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = Ht(e, Xg), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((n) => this.setupParallaxElement(n)));
      } else
        document.querySelectorAll(this.opts.el).forEach((r) => this.setupParallaxElement(r));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Or, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
  }
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(t) {
    const e = t.hasAttribute("data-parallax-factor") ? parseFloat(t.getAttribute("data-parallax-factor")) : this.opts.factor;
    let i = t.hasAttribute("data-parallax") ? this.opts.fadeContent : t.hasAttribute("data-parallax-fade");
    const r = t.hasAttribute("data-parallax-orientation") ? t.getAttribute("data-parallax-orientation") : this.opts.orientation;
    let n = null, s = null;
    if (t.hasAttribute("data-parallax")) {
      if (n = t.querySelector("[data-parallax-content]"), s = t.querySelector("[data-parallax-figure]"), this.opts.overflow || (t.style.overflow = "hidden"), s) {
        s.style.transform = `scale(${this.opts.scale})`, s.style.willChange = "transform", s.style.transformOrigin = "center";
        const a = window.getComputedStyle(s);
        a.backgroundImage && a.backgroundImage !== "none" && (a.backgroundSize !== "cover" && (s.style.backgroundSize = "cover"), a.backgroundPosition !== "center" && (s.style.backgroundPosition = "center"));
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
      figure: s,
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
    const { element: i, factor: r, fadeContent: n, orientation: s } = t, a = i.getBoundingClientRect(), c = this.app.size.height, u = c / 2, l = (a.top + a.height / 2 - u) / c * r * 100;
    let g = 1;
    if (n) {
      const _ = a.top / c;
      _ <= 0 ? g = Math.max(0, 1 + _ * 1.5) : _ >= 0.7 && (g = Math.max(0, 1 - (_ - 0.7) * 3.33)), g = Math.max(0, Math.min(1, g));
    }
    let p = "";
    switch (s) {
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
      let s = "scale(1.2)";
      const a = r.style.transform;
      if (a) {
        const c = a.match(/scale\([^)]+\)/);
        c && (s = c[0]);
      }
      r.style.transform = `${s} ${e.transform}`;
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
    window.removeEventListener(Or, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: r } = t;
      i && (i.style.transform = "", i.style.willChange = ""), r && (r.style.transform = "", r.style.opacity = "", r.style.willChange = ""), !i && !r && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
z.registerPlugin(qs);
const Gg = {
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
  onTransition: (o) => {
    o.slide("parallax");
  },
  onInitialize: () => {
  },
  onFadeIn: (o, t) => {
    o.slides.length > 1 ? z.to(o.el, {
      duration: 0.25,
      opacity: 1,
      onComplete: () => {
        t();
      }
    }) : z.to(o.el, {
      duration: 0.25,
      opacity: 1
    });
  }
};
class ym {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, Gg), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), z.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      z.set(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? z.set(i, {
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
    this.app.registerCallback(Ai, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Ws(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    Bs() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    const e = z.timeline();
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
        zi,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        zi,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    z.to(this.images, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
z.registerPlugin(qs);
const Kg = {
  el: "[data-hero-video]",
  onFadeIn: (o) => {
    z.to(o.videoDiv, {
      duration: 1,
      autoAlpha: 1
    });
  },
  onFadeInCover: (o) => {
    z.to(o.cover, {
      duration: 0.35,
      autoAlpha: 1
    });
  },
  onFadeOutCover: (o) => {
    z.set(o.cover, {
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
class vm {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = Ht(e, Kg), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), z.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = it.find(this.el, "[data-cover]"), this.cover && z.set(this.cover, { autoAlpha: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), z.set(this.videoDiv, {
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
    this.video.muted = !0, z.set(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && Ws(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(Hs, () => {
      !this.video.playing && !Bs() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (Bs() ? z.set(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
        zi,
        this._resize.bind(this)
      )) : window.removeEventListener(
        zi,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
    z.to(this.video, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
function La(o, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), o.dispatchEvent(e);
}
const jg = {
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
class wm {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, jg), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
      i.forEach((r) => {
        r.type === "attributes" && r.attributeName === "data-ll-srcset-ready" && (this.revealPicture(r.target), this.revealObserver.unobserve(r.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Ai, () => {
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
  initializeResizeObserver() {
    if (!this.opts.updateSizes)
      return;
    this.sizeObserver = new ResizeObserver((i) => {
      i.forEach((r) => {
        var u, h;
        const n = r.target;
        let s = ((h = (u = r.borderBoxSize) == null ? void 0 : u[0]) == null ? void 0 : h.inlineSize) || r.contentRect.width;
        s = Math.round(s), s < this.opts.minSize && (s = this.opts.minSize);
        const a = n.getAttribute("sizes"), c = `${s}px`;
        a !== c && (this.resizePending.set(n, s), this.rafId || (this.rafId = requestAnimationFrame(() => {
          this.flushSizeUpdates();
        })));
      });
    });
    const t = it.all(this.target, '[data-sizes="auto"]');
    new Set(t).forEach((i) => {
      this.sizeObserver.observe(i);
    });
  }
  flushSizeUpdates() {
    this.resizePending.forEach((t, e) => {
      const i = e.getAttribute("sizes"), r = `${Math.round(t)}px`;
      i !== r && (e.setAttribute("sizes", r), e.parentNode && Array.from(it.all(e.parentNode, "source")).forEach((n) => {
        n.getAttribute("sizes") !== r && n.setAttribute("sizes", r);
      }));
    }), this.resizePending.clear(), this.rafId = null;
  }
  initializeSections() {
    const t = document.querySelectorAll("[data-lazyload-section]");
    if (t) {
      const e = (i, r) => {
        const n = it.all(i, "img");
        return new IntersectionObserver((s, a) => {
          s.forEach((c) => {
            (c.isIntersecting || c.intersectionRatio > 0) && (rc(n, !0).then(() => {
              La(i, Rd);
            }), r.forEach((u) => {
              this.loadPicture(u), this.loadObserver.unobserve(u);
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
    for (let s = 0; s < e.length; s += 1) {
      const a = e[s];
      a.hasAttribute("data-ll-ready") || (i = !0), a.hasAttribute("data-srcset") && (a.setAttribute("srcset", a.dataset.srcset), a.setAttribute("data-ll-ready", ""));
    }
    if (!i && e.length > 0)
      return;
    const r = t.querySelector("img"), n = () => {
      r.removeAttribute("data-ll-placeholder"), r.removeAttribute("data-ll-blurred"), r.removeAttribute("data-ll-loading"), r.setAttribute("data-ll-ready", ""), t.setAttribute("data-ll-srcset-ready", "");
    };
    r.addEventListener("load", n, !1), r.setAttribute("data-ll-loading", ""), r.dataset.src && r.setAttribute("src", r.dataset.src), r.dataset.srcset && r.setAttribute("srcset", r.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), r.complete && n(), La(r, ic);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), La(e, Dd));
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
const Qg = {
  /* enable captions */
  captions: !1,
  /* enable index numbers */
  numbers: !1,
  /* set to a selector if you want a specific trigger element to open the box */
  trigger: !1,
  elements: {
    arrowRight: () => {
      const o = document.createElement("span");
      return o.classList.add("arrow-r"), o.appendChild(document.createTextNode("→")), o;
    },
    arrowLeft: () => {
      const o = document.createElement("span");
      return o.classList.add("arrow-l"), o.appendChild(document.createTextNode("←")), o;
    },
    close: () => document.createTextNode("×"),
    dot: () => document.createTextNode("▪")
  },
  onClick: (o, t, e) => {
    e.stopPropagation(), e.preventDefault(), o.pointerDirection === "left" ? o.setImg(t, o.getPrevIdx(t)) : o.setImg(t, o.getNextIdx(t));
  },
  onPointerLeft: () => {
  },
  onPointerRight: () => {
  },
  onCaptionOut: (o, t) => {
    t && o.timelines.caption.to(o.elements.caption, {
      duration: 0.4,
      autoAlpha: 0
    });
  },
  onCaptionIn: (o, t) => {
    t && o.timelines.caption.to(o.elements.caption, {
      duration: 0.4,
      autoAlpha: 1
    });
  },
  onImageOut: (o) => {
    o.timelines.image.to(o.currentImage, {
      duration: 0.5,
      autoAlpha: 0
    });
  },
  onImageIn: (o) => {
    const t = o.firstTransition ? 0.6 : 0.4;
    o.timelines.image.to(o.nextImage, {
      duration: 0.5,
      autoAlpha: 1,
      delay: t
    });
  },
  onNumbers: (o, t) => {
    o.elements.numbers.innerHTML = `${o.currentIndex + 1}/${t.length}`;
  },
  onBeforeOpen: () => {
  },
  onOpen: (o) => {
    o.app.scrollLock(), z.to(o.elements.wrapper, {
      duration: 0.5,
      opacity: 1
    });
  },
  onAfterClose: () => {
  },
  onClose: (o) => {
    o.opts.captions && z.to(o.elements.caption, {
      duration: 0.45,
      opacity: 0
    }), z.to(
      [
        o.elements.imgWrapper,
        o.elements.nextArrow,
        o.elements.prevArrow,
        o.elements.close,
        o.elements.dots
      ],
      {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          z.to(o.elements.wrapper, {
            duration: 0.45,
            opacity: 0,
            onComplete: () => {
              o.app.scrollRelease(), o.destroy();
            }
          });
        }
      }
    );
  }
};
class bm {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, Qg), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: z.timeline({ paused: !0 }),
      image: z.timeline({ paused: !0 })
    }, this.lightboxes.forEach((i) => {
      const r = i.getAttribute("data-lightbox"), n = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), c = i.getAttribute("data-lightbox-section") || "general";
      let u = i;
      this.opts.trigger && (u = it.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, c) || (this.sections[c] = []);
      const h = {
        href: r,
        alt: a,
        srcset: n
      }, d = this.sections[c].push(h) - 1;
      u.addEventListener("click", (f) => {
        f.preventDefault(), this.showBox(c, d);
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
      const s = document.createElement("img");
      z.set(s, { autoAlpha: 0 }), s.classList.add("lightbox-image", "m-lg"), s.setAttribute("data-idx", n), this.elements.imgWrapper.appendChild(s), this.imgs.push(s);
      const a = document.createElement("a");
      a.setAttribute("href", "#"), a.setAttribute("data-idx", n), n === e && (a.classList.add("active"), i = a), a.addEventListener("click", (c) => {
        a.classList.add("active"), i.classList.remove("active"), i = a, c.stopPropagation(), c.preventDefault(), this.setImg(t, n, null);
      }), a.appendChild(this.opts.elements.dot()), this.elements.dots.appendChild(a);
    }), this.elements.content.appendChild(this.elements.close), this.elements.content.appendChild(this.elements.imgWrapper), this.elements.content.appendChild(this.elements.nextArrow), this.elements.content.appendChild(this.elements.prevArrow), this.elements.content.appendChild(this.elements.dots), this.opts.numbers && this.elements.content.appendChild(this.elements.numbers), this.opts.captions && (this.elements.caption = document.createElement("div"), this.elements.caption.classList.add("lightbox-caption"), this.elements.content.appendChild(this.elements.caption)), this.elements.wrapper.appendChild(this.elements.content), document.body.appendChild(this.elements.wrapper), this.setImg(t, e, this.getPrevIdx(t)), this.opts.onOpen(this), this.elements.close.addEventListener("click", (r) => {
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), Ws(this.nextImage).then(() => {
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
z.registerPlugin(rn);
const Zg = {
  triggerEvents: !0,
  scrollDuration: 0.8,
  scrollOffsetNav: !1,
  mobileMenuDelay: 800,
  openExternalInWindow: !0,
  linkQuery: 'a:not([href^="#"]):not([target="_blank"]):not([data-lightbox]):not(.noanim)',
  anchorQuery: 'a[href^="#"]:not(.noanim)',
  onAnchor: (o, t) => {
    if (t.opts.scrollOffsetNav) {
      const e = document.querySelector("header[data-nav]"), i = e ? e.clientHeight : 0;
      o = { y: o, offsetY: i };
    }
    t.app.scrollTo(o, t.opts.scrollDuration, t.opts.triggerEvents);
  },
  onTransition: (o, t) => {
    const e = document.querySelector("main"), i = document.querySelector("header[data-nav]"), r = document.querySelector("footer"), n = document.querySelector("#fader");
    n ? (z.set(n, { display: "block", opacity: 0 }), e && (z.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), z.to(e, { duration: 0.2, opacity: 0 })), i && z.to(i, { duration: 0.2, opacity: 0 }), r && z.to(r, { duration: 0.2, opacity: 0 }), z.to(n, {
      duration: 0.2,
      opacity: 1,
      onComplete: () => {
        window.location = o;
      }
    })) : (e && (z.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), z.to(e, { duration: 0.2, opacity: 0 })), i && z.to(i, { duration: 0.2, opacity: 0 }), r && z.to(r, { duration: 0.2, opacity: 0 }), z.to(e, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        window.location = o;
      }
    }));
  }
};
class xm {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, Zg);
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
        const s = () => {
          const a = n, c = document.querySelector(a);
          if (r.preventDefault(), c) {
            if (this.opts.onAnchor(c, this), c.hasAttribute("data-skip-history") || history.pushState({}, "", n), !this.app.header || c.id === "top" || this.app.header.mainOpts.ignoreForcedScroll || this.app.header.mainOpts.pinOnForcedScrollEnd)
              return;
            setTimeout(() => {
              this.app.header.unpin();
            }, 800);
          }
        };
        e ? setTimeout(s, this.opts.mobileMenuDelay) : s();
      });
    });
  }
  bindLinks(t) {
    const e = document.querySelector(".loading-container");
    Array.from(t).forEach((i) => {
      const r = i.getAttribute("href");
      if (!r || r === "#" || r.startsWith("javascript:"))
        return;
      const n = this.normalizeHostname(document.location.hostname);
      let s, a;
      try {
        a = new URL(r, document.location.href), s = a.hostname;
      } catch (h) {
        console.warn(`Failed to parse URL for href "${r}":`, h), s = "";
      }
      const u = this.normalizeHostname(s) === n;
      this.opts.openExternalInWindow && !u && i.setAttribute("target", "_blank"), i.addEventListener("click", (h) => {
        if (!(h.shiftKey || h.metaKey || h.ctrlKey) && (e && (e.style.display = "none"), u && a)) {
          const d = new URL(window.location.href), f = a.pathname === d.pathname && a.search === d.search;
          if (f && a.hash) {
            h.preventDefault();
            const l = a.hash, g = document.querySelector(l);
            g && (this.opts.onAnchor(g, this), history.pushState({}, "", r));
          } else f && !a.hash && !d.hash ? h.preventDefault() : (h.preventDefault(), this.opts.onTransition(r, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const Jg = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (o) => {
    Bt.to(o, { opacity: 1, ease: "none" });
  }
};
class Sm {
  constructor(t, e, i) {
    this.opts = Ht(i, Jg), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = it.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = it.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = it.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    Bt.set(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.setHeight(), this.fillText();
    const e = this.elements.$holder.offsetWidth, i = it.all(this.elements.$el, "[data-marquee-holder]"), r = e * i.length;
    this.duration = (e + r) / this.opts.speed, Bt.set(this.elements.$marquee, { width: r }), this.initializeTween(), it.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = it.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Bt.set(e, { clearProps: "all" }));
  }
  killTweens() {
    this.timeline && (this.timeline.kill(), this.timeline = null);
  }
  initializeTween() {
    const t = it.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      Bt.set(e, { position: "absolute", left: e.offsetWidth * i });
    }), this.timeline = Bt.timeline({ paused: !0 }), this.timeline.to(t, { xPercent: -100, ease: "none", duration: this.duration }, "standard").repeat(-1), this.timeline.totalProgress(this.opts.startProgress), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    this.playing = !0, Bt.killTweensOf(this.timeline), t ? (this.timeline.play(), Bt.to(this.timeline, {
      timeScale: 1,
      ease: "sine.in",
      duration: 0.8
    })) : (this.timeline.timeScale(1), this.timeline.play());
  }
  pause() {
    this.playing = !1, Bt.to(this.timeline, {
      timeScale: 0.01,
      onComplete: () => {
        this.timeline.pause();
      },
      duration: 0.8
    });
  }
  slowDown() {
    Bt.to(this.timeline, {
      timeScale: 0.5,
      duration: 0.8
    });
  }
  speedUp() {
    Bt.to(this.timeline, {
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
    Bt.set(this.elements.$el, { height: t });
  }
}
const tm = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: (o) => {
    const t = z.timeline();
    o.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), t.fromTo(
      o.bg,
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
      o.logo,
      {
        duration: 0.35,
        opacity: 0,
        ease: "power3.out"
      },
      "-=0.35"
    ).to(
      o.header,
      {
        duration: 0.55,
        backgroundColor: "transparent",
        ease: "power3.out"
      },
      "-=0.35"
    ).call(() => {
      o.nav.style.gridTemplateRows = "auto 1fr";
    }).set(o.nav, { height: window.innerHeight }).set(o.content, { display: "block" }).set(o.logoPath, { fill: o.opts.logoColor }).set(o.logo, { xPercent: 3 }).staggerFromTo(
      o.lis,
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
      o.logo,
      {
        duration: 0.55,
        opacity: 1,
        xPercent: 0,
        ease: "power3.inOut"
      },
      "-=1.2"
    ).call(o._emitMobileMenuOpenEvent);
  },
  closeTween: (o) => {
    document.body.classList.toggle("open-menu"), z.timeline().call(() => {
      o.hamburger.classList.toggle("is-active");
    }).fromTo(
      o.logo,
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
    ).set(o.logoPath, { clearProps: "fill" }).staggerTo(
      o.lis,
      {
        duration: 0.5,
        opacity: 0,
        x: 20,
        ease: "power3.out"
      },
      0.04
    ).set(o.nav, { clearProps: "height" }).to(
      o.bg,
      {
        duration: 0.25,
        x: "100%",
        ease: "sine.in"
      },
      "-=0.3"
    ).call(() => {
      o._emitMobileMenuClosedEvent();
    }).set(o.content, { display: "none" }).call(() => {
      o.nav.style.gridTemplateRows = "auto";
    }).set(o.lis, { clearProps: "opacity" }).to(o.logo, {
      duration: 0.35,
      opacity: 1,
      ease: "power3.in"
    });
  }
};
class Tm {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, tm), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(zi, () => {
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
      tc
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      ec
    );
    window.dispatchEvent(t);
  }
}
z.registerPlugin(qs);
const em = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Ai,
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
class Em {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = Ht(e, em), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), Bs() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
      Array.from(n).forEach((s) => s.removeAttribute(r));
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
      Array.from(r).forEach((n, s) => {
        n.setAttribute("data-moonwalk-idx", s + 1);
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
        onReady: r.onReady,
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
    const e = z.timeline({
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
      z.set(t.children, n);
    }
    if (t.stage.name) {
      const r = e[t.stage.name];
      r ? z.set(t.el, r.transition.from) : console.error(
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
        for (let s = 0; s < r.length; s += 1) {
          const a = r[s];
          if (a.isIntersecting) {
            if (t.stage.name && !t.stage.running) {
              const c = i[t.stage.name], u = {
                ...c.transition.to,
                duration: c.duration
              };
              t.timeline.to(a.target, u, 0), t.stage.firstTween = !0;
            }
            if (t.name) {
              const c = i[t.name];
              c || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), typeof c.alphaTween == "object" ? c.alphaTween.duration = c.alphaTween.duration ? c.alphaTween.duration : c.duration : c.alphaTween === !0 && (c.alphaTween = {
                duration: c.duration,
                ease: "sine.in"
              }), c.startDelay && (c.transition.to = {
                ...c.transition.to,
                delay: c.startDelay
              }), t.timeline.staggerTo(
                t.children,
                c.duration,
                c.transition.to,
                c.interval,
                0
              ), c.alphaTween && t.timeline.staggerTo(
                t.children,
                c.alphaTween.duration,
                {
                  opacity: 1,
                  ease: c.alphaTween.ease,
                  delay: c.startDelay || 0
                },
                c.interval,
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
      i && i.onReady && i.onReady(i.el);
    }
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
        for (let s = 0; s < r.length; s += 1) {
          const a = r[s], c = a.boundingClientRect, u = window.innerHeight, h = window.innerWidth;
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
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right
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
              c.bottom <= 0 ? f.direction = "top" : c.top >= u ? f.direction = "bottom" : c.right <= 0 ? f.direction = "left" : c.left >= h && (f.direction = "right");
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
        for (let s = 0; s < r.length; s += 1) {
          const a = r[s];
          if (a.isIntersecting || a.intersectionRatio > 0) {
            t.running = !0, a.target.dataset.moonwalkId && console.debug("-- intersecting", a.target.dataset.moonwalkId);
            const c = a.target.getAttribute("data-moonwalk"), u = c.length ? i.walks[c] : i.walks.default, { duration: h, transition: d, interval: f, startDelay: l } = u;
            let { alphaTween: g } = u, p = (h - f) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof g == "object" && g !== null ? g.duration = g.duration ? g.duration : h : g === !0 && (g = {
              duration: h,
              ease: "sine.in"
            });
            const _ = d ? this.tweenJS : this.tweenCSS, S = () => {
              _(
                t,
                a.target,
                h,
                f,
                d,
                p,
                g
              );
            }, E = () => {
              l ? z.delayedCall(l, S) : S();
            };
            if (a.target.tagName === "IMG")
              Ws(a.target).then(() => E());
            else if (a.target.hasAttribute("data-placeholder"))
              E();
            else {
              const k = a.target.querySelectorAll("img");
              k.length ? Array.from(k).every(
                (x) => x.hasAttribute("data-ll-placeholder")
              ) ? E() : rc(k).then(() => E()) : E();
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
  tweenJS(t, e, i, r, n, s, a) {
    let c;
    const u = i - s;
    if (it.hasAttribute(e, "data-moonwalked"))
      return;
    if (t.timeline.isActive() && t.timeline.recent()) {
      const d = t.timeline.time(), f = t.timeline.recent().time(), l = t.timeline.recent().endTime();
      f > u ? c = () => t.timeline.time() : d + s * -1 < l ? c = () => `>${s}` : c = () => t.timeline.time();
    } else
      c = () => ">";
    z.set(e, n.from);
    const h = {
      ...n.to,
      duration: i,
      onComplete: () => e.setAttribute("data-moonwalked", "")
    };
    t.timeline.to(e, h, c()), a && t.timeline.to(
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
  tweenCSS(t, e, i, r, n, s) {
    let a;
    const c = i - s * -1;
    if (!it.hasAttribute(e, "data-moonwalked")) {
      if (t.timeline.isActive() && t.timeline.recent()) {
        const u = t.timeline.time(), h = t.timeline.recent().time(), d = t.timeline.recent().endTime();
        h > c ? a = () => t.timeline.time() : u + s * -1 < d ? a = () => `>${s}` : a = () => t.timeline.time();
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
const im = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, Gn = [];
class Cm {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = Ht(i, im), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
    const r = document.querySelector(
      `[data-popover-template=${e.dataset.popoverTarget}]`
    );
    if (!r) {
      console.warn(`Popover template not found for trigger: ${e.dataset.popoverTarget}`);
      return;
    }
    this.popover = document.createElement("div"), this.popover.innerHTML = r.innerHTML, Object.assign(this.popover.style, {
      position: "fixed"
    }), this.popover.classList.add(this.className), r.classList && r.classList.length > 0 && r.classList.forEach((n) => {
      n !== "popover-template" && this.popover.classList.add(n);
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), Gn.includes(this) || Gn.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
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
      width: r,
      height: n
    } = this.trigger.getBoundingClientRect(), { offsetHeight: s, offsetWidth: a } = this.popover, c = this.orderedPositions.indexOf(this.position), u = {
      top: {
        name: "top",
        top: e - s,
        left: i - (a - r) / 2
      },
      right: {
        name: "right",
        top: e - (s - n) / 2,
        left: i + r
      },
      bottom: {
        name: "bottom",
        top: e + n,
        left: i - (a - r) / 2
      },
      left: {
        name: "left",
        top: e - (s - n) / 2,
        left: i - a
      }
    }, h = this.orderedPositions.slice(c).concat(this.orderedPositions.slice(0, c)).map((d) => u[d]).find((d) => (t || (this.popover.style.top = `${d.top}px`, this.popover.style.left = `${d.left}px`), it.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((d) => {
      this.popover.classList.remove(`${this.className}--${d}`);
    }), h ? (t && this.isVisible ? z.to(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? z.to(this.popover, {
      top: Math.max(0, u.bottom.top),
      left: Math.max(0, u.bottom.left),
      duration: this.opts.followSpeed,
      ease: "power2.out"
    }) : t || (this.popover.style.top = `${Math.max(0, u.bottom.top)}px`, this.popover.style.left = `${Math.max(0, u.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = Gn.indexOf(this);
    t !== -1 && Gn.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    Gn.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Or, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(Or, this.boundHandleScroll);
  }
}
const rm = {
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
  tweenIn: (o, t, e) => {
    z.set(e.backdrop, { display: "block" }), z.to(e.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        z.fromTo(
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
  tweenOut: (o) => {
    console.log("default tweenOut");
    const t = o.currentPopup;
    t && z.to(t, {
      duration: 0.3,
      opacity: 0,
      display: "none"
    }), z.to(o.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        o.backdrop.remove();
      }
    });
  }
};
class Pm {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = Ht(i, rm), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
  }
  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    const t = document.querySelectorAll("[data-popup-trigger]"), e = Array.from(t).filter((n) => {
      const s = n.getAttribute("data-popup-trigger");
      if (typeof s == "string") {
        const a = document.querySelector(s);
        return a && a.matches(this.opts.selector);
      }
      return !1;
    }), i = document.querySelectorAll(this.opts.selector), r = [];
    i.forEach((n) => {
      const s = n.querySelectorAll("[data-popup-close]");
      r.push(...s);
    }), e.forEach((n) => {
      const s = n.getAttribute("data-popup-trigger"), a = n.getAttribute("data-popup-key") || this.getKeyFromTarget(s);
      n.addEventListener("click", (c) => {
        this.opts.responsive(this.app) && (c.stopImmediatePropagation(), c.preventDefault(), this.open(n, s, a));
      });
    }), r.forEach((n) => {
      const s = n.closest(this.opts.selector), a = s ? s.getAttribute("data-popup-key") : null;
      n.addEventListener("click", (c) => {
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), z.set(e, { opacity: 0, display: "none", zIndex: 4999 }), e.addEventListener("click", (i) => {
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
const nm = {
  onIntersect: (o, t) => {
  }
};
class Am {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, nm), this.initialize();
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
const sm = {};
class Om {
  constructor(t, e = {}) {
    this.app = t, this.opts = Ht(e, sm), this.initialize();
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
      let s;
      switch (n) {
        case "1/3":
          s = r.clientHeight / 3;
          break;
        case "2/3":
          s = r.clientHeight / 3 * 2;
          break;
        case "1/2":
          s = r.clientHeight / 2;
          break;
        default:
          console.error(
            "==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value"
          );
      }
      this.pull(r, s);
    }
  }
  pull(t, e) {
    z.set(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    z.set(t, { height: e.clientHeight });
  }
}
const Nd = {
  onMainVisible: (o) => {
    z.to(o.el, {
      duration: 3,
      opacity: 1,
      delay: 0.5
    });
  },
  onMainInvisible: (o) => {
    z.to(o.el, {
      duration: 1,
      opacity: 0
    });
  },
  onPin: (o) => {
    z.to(o.auxEl, {
      duration: 0.35,
      yPercent: "0",
      ease: "sine.out",
      autoRound: !0
    });
  },
  onUnpin: (o) => {
    o._hiding = !0, z.to(o.auxEl, {
      duration: 0.25,
      yPercent: "-100",
      ease: "sine.in",
      autoRound: !0,
      onComplete: () => {
        o._hiding = !1;
      }
    });
  },
  onSmall: () => {
  }
}, om = {
  el: "header[data-nav]",
  on: Ai,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (o) => o.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (o) => {
      z.set(o.el, { opacity: 0 });
    },
    enter: (o) => {
      z.timeline().set(o.auxEl, { yPercent: -100 }).set(o.lis, { opacity: 0 }).to(o.auxEl, 1, {
        yPercent: 0,
        delay: o.opts.enterDelay,
        ease: "power3.out",
        autoRound: !0
      }).staggerTo(o.lis, 0.8, { opacity: 1, ease: "sine.in" }, 0.1, "-=1");
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0,
    // how far from the top before we trigger hide
    offsetSmall: 50,
    // how far from the top before we trigger the shrinked padding,
    offsetBg: 200,
    // how far down before changing backgroundcolor
    ...Nd
  }
};
class km {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = Ht(e, om), this.mainOpts.pinOnOutline && window.addEventListener(Zo, () => {
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
      zi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      Or,
      this.update.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScroll && (window.addEventListener(jo, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      Qo,
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
    return e = Ht(i, Nd, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      tc,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      ec,
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
class Im {
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
    this.group && !this.open && this.closeOthersInGroup(), this.toggleState(), this.open ? (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), z.set(this.content, { height: "auto", display: "block" }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex()), z.from(this.content, {
      height: 0,
      ease: "power1.inOut",
      stagger: 0.1,
      onComplete: () => {
        this.content.forEach((t) => t.removeAttribute("data-toggle-hidden")), this.content.forEach((t) => t.setAttribute("data-toggle-visible", "")), this.onOpen && this.onOpen(this, this.getGroupIndex());
      }
    })) : (this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.removeAttribute("data-toggle-trigger-active"), this.onBeforeClose && this.onBeforeClose(this, this.getGroupIndex()), z.to(this.content, {
      duration: 0.25,
      onComplete: () => {
        this.el.classList.toggle("open"), this.content.forEach((t) => t.removeAttribute("data-toggle-visible")), this.content.forEach((t) => t.setAttribute("data-toggle-hidden", "")), this.onClose && this.onClose(this, this.getGroupIndex());
      }
    }), z.to(this.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
  }
  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    !this.group || !this.app.togglers || this.app.togglers.forEach((t) => {
      t === this || t.group !== this.group || t.open && (t.open = !1, t.triggerIcon && t.triggerIcon.classList.remove("active"), t.trigger.removeAttribute("data-toggle-trigger-active"), t.el.classList.remove("open"), z.to(t.content, {
        duration: 0.25,
        onComplete: () => {
          t.content.forEach((e) => e.removeAttribute("data-toggle-visible")), t.content.forEach((e) => e.setAttribute("data-toggle-hidden", "")), t.onClose && t.onClose(t, t.getGroupIndex());
        }
      }), z.to(t.content, { height: 0, ease: "power3.out", stagger: 0.1 }));
    });
  }
  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open ? this.open = !1 : this.open = !0;
  }
}
class Lm {
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
const Mm = (o, t) => {
  const e = document.createElement("script");
  let i = !1;
  const r = document.getElementsByTagName("head")[0];
  e.src = o, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, r.removeChild(e));
  }, e.onload = e.onreadystatechange, r.appendChild(e);
};
export {
  lm as Application,
  xu as Breakpoints,
  qs as CSSPlugin,
  cm as Cookies,
  um as CoverOverlay,
  hm as Dataloader,
  it as Dom,
  Go as Draggable,
  dm as Dropdown,
  fm as EqualHeightElements,
  pm as EqualHeightImages,
  am as Events,
  gm as FixedHeader,
  mm as FooterReveal,
  ym as HeroSlider,
  vm as HeroVideo,
  Ed as InertiaPlugin,
  wm as Lazyload,
  bm as Lightbox,
  xm as Links,
  Sm as Marquee,
  Tm as MobileMenu,
  Em as Moonwalk,
  _m as Parallax,
  Cm as Popover,
  Pm as Popup,
  Am as ScrollSpy,
  rn as ScrollToPlugin,
  vt as ScrollTrigger,
  Eg as SplitText,
  Om as StackedBoxes,
  km as StickyHeader,
  Im as Toggler,
  Lm as Typography,
  Ht as _defaultsDeep,
  z as gsap,
  Ws as imageIsLoaded,
  rc as imagesAreLoaded,
  Mm as loadScript,
  Bs as prefersReducedMotion,
  wu as rafCallback
};
