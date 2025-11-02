function fn(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Kf(s, t) {
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
var wi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, er = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Wu, ze, Qt, nn = 1e8, qe = 1 / nn, Rl = Math.PI * 2, Hm = Rl / 4, Wm = 0, Xf = Math.sqrt, Ym = Math.cos, qm = Math.sin, Me = function(t) {
  return typeof t == "string";
}, ne = function(t) {
  return typeof t == "function";
}, bn = function(t) {
  return typeof t == "number";
}, Yu = function(t) {
  return typeof t > "u";
}, rn = function(t) {
  return typeof t == "object";
}, oi = function(t) {
  return t !== !1;
}, qu = function() {
  return typeof window < "u";
}, No = function(t) {
  return ne(t) || Me(t);
}, Gf = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ue = Array.isArray, zl = /(?:-?\.?\d|\.)+/gi, jf = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, zs = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, rl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Zf = /[+-]=-?[.\d]+/, Qf = /[^,'"\[\]\s]+/gi, Um = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, te, Gi, Fl, Uu, xi = {}, ya = {}, Jf, td = function(t) {
  return (ya = ir(t, xi)) && ci;
}, Ku = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, so = function(t, e) {
  return !e && console.warn(t);
}, ed = function(t, e) {
  return t && (xi[t] = e) && ya && (ya[t] = e) || xi;
}, ro = function() {
  return 0;
}, Km = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, na = {
  suppressEvents: !0,
  kill: !1
}, Xm = {
  suppressEvents: !0
}, Xu = {}, zn = [], Nl = {}, id, pi = {}, ol = {}, ih = 30, sa = [], Gu = "", ju = function(t) {
  var e = t[0], i, n;
  if (rn(e) || ne(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (n = sa.length; n-- && !sa[n].targetTest(e); )
      ;
    i = sa[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new Ad(t[n], i))) || t.splice(n, 1);
  return t;
}, os = function(t) {
  return t._gsap || ju(Ii(t))[0]._gsap;
}, nd = function(t, e, i) {
  return (i = t[e]) && ne(i) ? t[e]() : Yu(i) && t.getAttribute && t.getAttribute(e) || i;
}, ai = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, le = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ye = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Ws = function(t, e) {
  var i = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + n : i === "-" ? t - n : i === "*" ? t * n : t / n;
}, Gm = function(t, e) {
  for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, va = function() {
  var t = zn.length, e = zn.slice(0), i, n;
  for (Nl = {}, zn.length = 0, i = 0; i < t; i++)
    n = e[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Zu = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, sd = function(t, e, i, n) {
  zn.length && !ze && va(), t.render(e, i, !!(ze && e < 0 && Zu(t))), zn.length && !ze && va();
}, rd = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Qf).length < 2 ? e : Me(t) ? t.trim() : t;
}, od = function(t) {
  return t;
}, Ti = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, jm = function(t) {
  return function(e, i) {
    for (var n in i)
      n in e || n === "duration" && t || n === "ease" || (e[n] = i[n]);
  };
}, ir = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, nh = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = rn(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, wa = function(t, e) {
  var i = {}, n;
  for (n in t)
    n in e || (i[n] = t[n]);
  return i;
}, Nr = function(t) {
  var e = t.parent || te, i = t.keyframes ? jm(Ue(t.keyframes)) : Ti;
  if (oi(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Zm = function(t, e) {
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
}, as = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Qm = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, $l = function(t, e, i, n) {
  return t._startAt && (ze ? t._startAt.revert(na) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, Jm = function s(t) {
  return !t || t._ts && s(t.parent);
}, sh = function(t) {
  return t._repeat ? nr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, nr = function(t, e) {
  var i = Math.floor(t = ye(t / e));
  return t && i === t ? i - 1 : i;
}, ba = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Ha = function(t) {
  return t._end = ye(t._start + (t._tDur / Math.abs(t._ts || t._rts || qe) || 0));
}, Wa = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = ye(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Ha(t), i._dirty || as(i, t)), t;
}, ld = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = ba(t.rawTime(), e), (!e._dur || Po(0, e.totalDuration(), i) - e._tTime > qe) && e.render(i, !0)), as(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Qi = function(t, e, i, n) {
  return e.parent && Vn(e), e._start = ye((bn(i) ? i : i || t !== te ? Oi(t, i, e) : t._time) + e._delay), e._end = ye(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ad(t, e, "_first", "_last", t._sort ? "_start" : 0), Bl(e) || (t._recent = e), n || ld(t, e), t._ts < 0 && Wa(t, t._tTime), t;
}, ud = function(t, e) {
  return (xi.ScrollTrigger || Ku("scrollTrigger", e)) && xi.ScrollTrigger.create(e, t);
}, cd = function(t, e, i, n, r) {
  if (Ju(t, e, r), !t._initted)
    return 1;
  if (!i && t._pt && !ze && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && id !== mi.frame)
    return zn.push(t), t._lazy = [r, n], 1;
}, t0 = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Bl = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, e0 = function(t, e, i, n) {
  var r = t.ratio, o = e < 0 || !e && (!t._start && t0(t) && !(!t._initted && Bl(t)) || (t._ts < 0 || t._dp._ts < 0) && !Bl(t)) ? 0 : 1, a = t._rDelay, l = 0, c, h, f;
  if (a && t._repeat && (l = Po(0, t._tDur, e), h = nr(l, a), t._yoyo && h & 1 && (o = 1 - o), h !== nr(t._tTime, a) && (r = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== r || ze || n || t._zTime === qe || !e && t._zTime) {
    if (!t._initted && cd(t, e, n, i, l))
      return;
    for (f = t._zTime, t._zTime = e || (i ? qe : 0), i || (i = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && $l(t, e, i, !0), t._onUpdate && !i && vi(t, "onUpdate"), l && t._repeat && !i && t.parent && vi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Vn(t, 1), !i && !ze && (vi(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, i0 = function(t, e, i) {
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
}, sr = function(t, e, i, n) {
  var r = t._repeat, o = ye(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = r ? r < 0 ? 1e10 : ye(o * (r + 1) + t._rDelay * r) : o, a > 0 && !n && Wa(t, t._tTime = t._tDur * a), t.parent && Ha(t), i || as(t.parent, t), t;
}, rh = function(t) {
  return t instanceof ei ? as(t) : sr(t, t._dur);
}, n0 = {
  _start: 0,
  endTime: ro,
  totalDuration: ro
}, Oi = function s(t, e, i) {
  var n = t.labels, r = t._recent || n0, o = t.duration() >= nn ? r.endTime(!1) : t._dur, a, l, c;
  return Me(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), c = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (a < 0 ? r : i).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), c && i && (l = l / 100 * (Ue(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + l : o + l)) : e == null ? o : +e;
}, $r = function(t, e, i) {
  var n = bn(e[1]), r = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[r], a, l;
  if (n && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = oi(l.vars.inherit) && l.parent;
    o.immediateRender = oi(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[r - 1];
  }
  return new _e(e[0], o, e[r + 1]);
}, Un = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Po = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, He = function(t, e) {
  return !Me(t) || !(e = Um.exec(t)) ? "" : e[1];
}, s0 = function(t, e, i) {
  return Un(i, function(n) {
    return Po(t, e, n);
  });
}, Vl = [].slice, hd = function(t, e) {
  return t && rn(t) && "length" in t && (!e && !t.length || t.length - 1 in t && rn(t[0])) && !t.nodeType && t !== Gi;
}, r0 = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(n) {
    var r;
    return Me(n) && !e || hd(n, 1) ? (r = i).push.apply(r, Ii(n)) : i.push(n);
  }) || i;
}, Ii = function(t, e, i) {
  return Qt && !e && Qt.selector ? Qt.selector(t) : Me(t) && !i && (Fl || !rr()) ? Vl.call((e || Uu).querySelectorAll(t), 0) : Ue(t) ? r0(t, i) : hd(t) ? Vl.call(t, 0) : t ? [t] : [];
}, Hl = function(t) {
  return t = Ii(t)[0] || so("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Ii(e, i.querySelectorAll ? i : i === t ? so("Invalid scope") || Uu.createElement("div") : t);
  };
}, fd = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, dd = function(t) {
  if (ne(t))
    return t;
  var e = rn(t) ? t : {
    each: t
  }, i = ls(e.ease), n = e.from || 0, r = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, c = e.axis, h = n, f = n;
  return Me(n) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (h = n[0], f = n[1]), function(d, u, g) {
    var p = (g || e).length, _ = o[p], w, A, C, T, y, O, P, S, k;
    if (!_) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, nn])[1], !k) {
        for (P = -1e8; P < (P = g[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (_ = o[p] = [], w = l ? Math.min(k, p) * h - 0.5 : n % k, A = k === nn ? 0 : l ? p * f / k - 0.5 : n / k | 0, P = 0, S = nn, O = 0; O < p; O++)
        C = O % k - w, T = A - (O / k | 0), _[O] = y = c ? Math.abs(c === "y" ? T : C) : Xf(C * C + T * T), y > P && (P = y), y < S && (S = y);
      n === "random" && fd(_), _.max = P - S, _.min = S, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : c ? c === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (n === "edges" ? -1 : 1), _.b = p < 0 ? r - p : r, _.u = He(e.amount || e.each) || 0, i = i && p < 0 ? Td(i) : i;
    }
    return p = (_[d] - _.min) / _.max || 0, ye(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, Wl = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var n = ye(Math.round(parseFloat(i) / t) * t * e);
    return (n - n % 1) / e + (bn(i) ? 0 : He(i));
  };
}, pd = function(t, e) {
  var i = Ue(t), n, r;
  return !i && rn(t) && (n = i = t.radius || nn, t.values ? (t = Ii(t.values), (r = !bn(t[0])) && (n *= n)) : t = Wl(t.increment)), Un(e, i ? ne(t) ? function(o) {
    return r = t(o), Math.abs(r - o) <= n ? r : o;
  } : function(o) {
    for (var a = parseFloat(r ? o.x : o), l = parseFloat(r ? o.y : 0), c = nn, h = 0, f = t.length, d, u; f--; )
      r ? (d = t[f].x - a, u = t[f].y - l, d = d * d + u * u) : d = Math.abs(t[f] - a), d < c && (c = d, h = f);
    return h = !n || c <= n ? t[h] : o, r || h === o || bn(o) ? h : h + He(o);
  } : Wl(t));
}, gd = function(t, e, i, n) {
  return Un(Ue(t) ? !e : i === !0 ? !!(i = 0) : !n, function() {
    return Ue(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * n) / n;
  });
}, o0 = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}, a0 = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || He(i));
  };
}, l0 = function(t, e, i) {
  return _d(t, e, 0, 1, i);
}, md = function(t, e, i) {
  return Un(i, function(n) {
    return t[~~e(n)];
  });
}, u0 = function s(t, e, i) {
  var n = e - t;
  return Ue(t) ? md(t, s(0, t.length), e) : Un(i, function(r) {
    return (n + (r - t) % n) % n + t;
  });
}, c0 = function s(t, e, i) {
  var n = e - t, r = n * 2;
  return Ue(t) ? md(t, s(0, t.length - 1), e) : Un(i, function(o) {
    return o = (r + (o - t) % r) % r || 0, t + (o > n ? r - o : o);
  });
}, oo = function(t) {
  for (var e = 0, i = "", n, r, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", r = t.substr(n + 7, o - n - 7).match(a ? Qf : zl), i += t.substr(e, n - e) + gd(a ? r : +r[0], a ? 0 : +r[1], +r[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, _d = function(t, e, i, n, r) {
  var o = e - t, a = n - i;
  return Un(r, function(l) {
    return i + ((l - t) / o * a || 0);
  });
}, h0 = function s(t, e, i, n) {
  var r = isNaN(t + e) ? 0 : function(u) {
    return (1 - u) * t + u * e;
  };
  if (!r) {
    var o = Me(t), a = {}, l, c, h, f, d;
    if (i === !0 && (n = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ue(t) && !Ue(e)) {
      for (h = [], f = t.length, d = f - 2, c = 1; c < f; c++)
        h.push(s(t[c - 1], t[c]));
      f--, r = function(g) {
        g *= f;
        var p = Math.min(d, ~~g);
        return h[p](g - p);
      }, i = e;
    } else n || (t = ir(Ue(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        Qu.call(a, t, l, "get", e[l]);
      r = function(g) {
        return ic(g, a) || (o ? t.p : t);
      };
    }
  }
  return Un(i, r);
}, oh = function(t, e, i) {
  var n = t.labels, r = nn, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!i && a && r > (a = Math.abs(a)) && (l = o, r = a);
  return l;
}, vi = function(t, e, i) {
  var n = t.vars, r = n[e], o = Qt, a = t._ctx, l, c, h;
  if (r)
    return l = n[e + "Params"], c = n.callbackScope || t, i && zn.length && va(), a && (Qt = a), h = l ? r.apply(c, l) : r.call(c), Qt = o, h;
}, Sr = function(t) {
  return Vn(t), t.scrollTrigger && t.scrollTrigger.kill(!!ze), t.progress() < 1 && vi(t, "onInterrupt"), t;
}, Fs, yd = [], vd = function(t) {
  if (t)
    if (t = !t.name && t.default || t, qu() || t.headless) {
      var e = t.name, i = ne(t), n = e && !i && t.init ? function() {
        this._props = [];
      } : t, r = {
        init: ro,
        render: ic,
        add: Qu,
        kill: C0,
        modifier: A0,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: ec,
        aliases: {},
        register: 0
      };
      if (rr(), t !== n) {
        if (pi[e])
          return;
        Ti(n, Ti(wa(t, r), o)), ir(n.prototype, ir(r, wa(t, o))), pi[n.prop = e] = n, t.targetTest && (sa.push(n), Xu[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      ed(e, n), t.register && t.register(ci, n, li);
    } else
      yd.push(t);
}, Ht = 255, Er = {
  aqua: [0, Ht, Ht],
  lime: [0, Ht, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Ht],
  navy: [0, 0, 128],
  white: [Ht, Ht, Ht],
  olive: [128, 128, 0],
  yellow: [Ht, Ht, 0],
  orange: [Ht, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Ht, 0, 0],
  pink: [Ht, 192, 203],
  cyan: [0, Ht, Ht],
  transparent: [Ht, Ht, Ht, 0]
}, al = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Ht + 0.5 | 0;
}, wd = function(t, e, i) {
  var n = t ? bn(t) ? [t >> 16, t >> 8 & Ht, t & Ht] : 0 : Er.black, r, o, a, l, c, h, f, d, u, g;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Er[t])
      n = Er[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (r = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + r + r + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & Ht, n & Ht, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & Ht, t & Ht];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = g = t.match(zl), !e)
        l = +n[0] % 360 / 360, c = +n[1] / 100, h = +n[2] / 100, o = h <= 0.5 ? h * (c + 1) : h + c - h * c, r = h * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = al(l + 1 / 3, r, o), n[1] = al(l, r, o), n[2] = al(l - 1 / 3, r, o);
      else if (~t.indexOf("="))
        return n = t.match(jf), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(zl) || Er.transparent;
    n = n.map(Number);
  }
  return e && !g && (r = n[0] / Ht, o = n[1] / Ht, a = n[2] / Ht, f = Math.max(r, o, a), d = Math.min(r, o, a), h = (f + d) / 2, f === d ? l = c = 0 : (u = f - d, c = h > 0.5 ? u / (2 - f - d) : u / (f + d), l = f === r ? (o - a) / u + (o < a ? 6 : 0) : f === o ? (a - r) / u + 2 : (r - o) / u + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, bd = function(t) {
  var e = [], i = [], n = -1;
  return t.split(Fn).forEach(function(r) {
    var o = r.match(zs) || [];
    e.push.apply(e, o), i.push(n += o.length + 1);
  }), e.c = i, e;
}, ah = function(t, e, i) {
  var n = "", r = (t + n).match(Fn), o = e ? "hsla(" : "rgba(", a = 0, l, c, h, f;
  if (!r)
    return t;
  if (r = r.map(function(d) {
    return (d = wd(d, e, 1)) && o + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = bd(t), l = i.c, l.join(n) !== h.c.join(n)))
    for (c = t.replace(Fn, "1").split(zs), f = c.length - 1; a < f; a++)
      n += c[a] + (~l.indexOf(a) ? r.shift() || o + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!c)
    for (c = t.split(Fn), f = c.length - 1; a < f; a++)
      n += c[a] + r[a];
  return n + c[f];
}, Fn = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Er)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), f0 = /hsl[a]?\(/, xd = function(t) {
  var e = t.join(" "), i;
  if (Fn.lastIndex = 0, Fn.test(e))
    return i = f0.test(e), t[1] = ah(t[1], i), t[0] = ah(t[0], i, bd(t[1])), !0;
}, ao, mi = function() {
  var s = Date.now, t = 500, e = 33, i = s(), n = i, r = 1e3 / 240, o = r, a = [], l, c, h, f, d, u, g = function p(_) {
    var w = s() - n, A = _ === !0, C, T, y, O;
    if ((w > t || w < 0) && (i += w - e), n += w, y = n - i, C = y - o, (C > 0 || A) && (O = ++f.frame, d = y - f.time * 1e3, f.time = y = y / 1e3, o += C + (C >= r ? 4 : r - C), T = 1), A || (l = c(p)), T)
      for (u = 0; u < a.length; u++)
        a[u](y, d, O, _);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(_) {
      return d / (1e3 / (_ || 60));
    },
    wake: function() {
      Jf && (!Fl && qu() && (Gi = Fl = window, Uu = Gi.document || {}, xi.gsap = ci, (Gi.gsapVersions || (Gi.gsapVersions = [])).push(ci.version), td(ya || Gi.GreenSockGlobals || !Gi.gsap && Gi || {}), yd.forEach(vd)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), c = h || function(_) {
        return setTimeout(_, o - f.time * 1e3 + 1 | 0);
      }, ao = 1, g(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), ao = 0, c = ro;
    },
    lagSmoothing: function(_, w) {
      t = _ || 1 / 0, e = Math.min(w || 33, t);
    },
    fps: function(_) {
      r = 1e3 / (_ || 240), o = f.time * 1e3 + r;
    },
    add: function(_, w, A) {
      var C = w ? function(T, y, O, P) {
        _(T, y, O, P), f.remove(C);
      } : _;
      return f.remove(_), a[A ? "unshift" : "push"](C), rr(), C;
    },
    remove: function(_, w) {
      ~(w = a.indexOf(_)) && a.splice(w, 1) && u >= w && u--;
    },
    _listeners: a
  }, f;
}(), rr = function() {
  return !ao && mi.wake();
}, At = {}, d0 = /^[\d.\-M][\d.\-,\s]/, p0 = /["']/g, g0 = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), n = i[0], r = 1, o = i.length, a, l, c; r < o; r++)
    l = i[r], a = r !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), e[n] = isNaN(c) ? c.replace(p0, "").trim() : +c, n = l.substr(a + 1).trim();
  return e;
}, m0 = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
}, _0 = function(t) {
  var e = (t + "").split("("), i = At[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [g0(e[1])] : m0(t).split(",").map(rd)) : At._CE && d0.test(t) ? At._CE("", t) : i;
}, Td = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Sd = function s(t, e) {
  for (var i = t._first, n; i; )
    i instanceof ei ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next;
}, ls = function(t, e) {
  return t && (ne(t) ? t : At[t] || _0(t)) || e;
}, xs = function(t, e, i, n) {
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
  return ai(t, function(a) {
    At[a] = xi[a] = r, At[o = a.toLowerCase()] = i;
    for (var l in r)
      At[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = At[a + "." + l] = r[l];
  }), r;
}, Ed = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ll = function s(t, e, i) {
  var n = e >= 1 ? e : 1, r = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = r / Rl * (Math.asin(1 / n) || 0), a = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * qm((h - o) * r) + 1;
  }, l = t === "out" ? a : t === "in" ? function(c) {
    return 1 - a(1 - c);
  } : Ed(a);
  return r = Rl / r, l.config = function(c, h) {
    return s(t, c, h);
  }, l;
}, ul = function s(t, e) {
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
ai("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  xs(s + ",Power" + (e - 1), t ? function(i) {
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
xs("Elastic", ll("in"), ll("out"), ll());
(function(s, t) {
  var e = 1 / t, i = 2 * e, n = 2.5 * e, r = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  xs("Bounce", function(o) {
    return 1 - r(1 - o);
  }, r);
})(7.5625, 2.75);
xs("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
xs("Circ", function(s) {
  return -(Xf(1 - s * s) - 1);
});
xs("Sine", function(s) {
  return s === 1 ? 1 : -Ym(s * Hm) + 1;
});
xs("Back", ul("in"), ul("out"), ul());
At.SteppedEase = At.steps = xi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, n = t + (e ? 0 : 1), r = e ? 1 : 0, o = 1 - qe;
    return function(a) {
      return ((n * Po(0, o, a) | 0) + r) * i;
    };
  }
};
er.ease = At["quad.out"];
ai("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Gu += s + "," + s + "Params,";
});
var Ad = function(t, e) {
  this.id = Wm++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : nd, this.set = e ? e.getSetter : ec;
}, lo = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, sr(this, +e.duration, 1, 1), this.data = e.data, Qt && (this._ctx = Qt, Qt.data.push(this)), ao || mi.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, sr(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, n) {
    if (rr(), !arguments.length)
      return this._tTime;
    var r = this._dp;
    if (r && r.smoothChildTiming && this._ts) {
      for (Wa(this, i), !r._dp || r.parent || ld(r, this); r && r.parent; )
        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Qi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === qe || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), sd(this, i, n)), this;
  }, t.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + sh(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + sh(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? nr(this._tTime, r) + 1 : 1;
  }, t.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? ba(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(Po(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), Ha(this), Qm(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (rr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== qe && (this._tTime -= qe)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Qi(n, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (oi(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var n = this.parent || this._dp;
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ba(n.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Xm);
    var n = ze;
    return ze = i, Zu(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), ze = n, this;
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
    return this.totalTime(Oi(this, i), oi(n));
  }, t.restart = function(i, n) {
    return this.play().totalTime(i ? -this._delay : 0, oi(n)), this._dur || (this._zTime = -1e-8), this;
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
    return !!(!i || this._ts && this._initted && i.isActive() && (r = i.rawTime(!0)) >= n && r < this.endTime(!0) - qe);
  }, t.eventCallback = function(i, n, r) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[i] = n, r && (o[i + "Params"] = r), i === "onUpdate" && (this._onUpdate = n)) : delete o[i], this) : o[i];
  }, t.then = function(i) {
    var n = this;
    return new Promise(function(r) {
      var o = ne(i) ? i : od, a = function() {
        var c = n.then;
        n.then = null, ne(o) && (o = o(n)) && (o.then || o === n) && (n.then = c), r(o), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    Sr(this);
  }, s;
}();
Ti(lo.prototype, {
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
var ei = /* @__PURE__ */ function(s) {
  Kf(t, s);
  function t(i, n) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = oi(i.sortChildren), te && Qi(i.parent || te, fn(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && ud(fn(r), i.scrollTrigger), r;
  }
  var e = t.prototype;
  return e.to = function(n, r, o) {
    return $r(0, arguments, this), this;
  }, e.from = function(n, r, o) {
    return $r(1, arguments, this), this;
  }, e.fromTo = function(n, r, o, a) {
    return $r(2, arguments, this), this;
  }, e.set = function(n, r, o) {
    return r.duration = 0, r.parent = this, Nr(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new _e(n, r, Oi(this, o), 1), this;
  }, e.call = function(n, r, o) {
    return Qi(this, _e.delayedCall(0, n, r), o);
  }, e.staggerTo = function(n, r, o, a, l, c, h) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = h, o.parent = this, new _e(n, o, Oi(this, l)), this;
  }, e.staggerFrom = function(n, r, o, a, l, c, h) {
    return o.runBackwards = 1, Nr(o).immediateRender = oi(o.immediateRender), this.staggerTo(n, r, o, a, l, c, h);
  }, e.staggerFromTo = function(n, r, o, a, l, c, h, f) {
    return a.startAt = o, Nr(a).immediateRender = oi(a.immediateRender), this.staggerTo(n, r, a, l, c, h, f);
  }, e.render = function(n, r, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, h = n <= 0 ? 0 : ye(n), f = this._zTime < 0 != n < 0 && (this._initted || !c), d, u, g, p, _, w, A, C, T, y, O, P;
    if (this !== te && h > l && n >= 0 && (h = l), h !== this._tTime || o || f) {
      if (a !== this._time && c && (h += this._time - a, n += this._time - a), d = h, T = this._start, C = this._ts, w = !C, f && (c || (a = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (O = this._yoyo, _ = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(_ * 100 + n, r, o);
        if (d = ye(h % _), h === l ? (p = this._repeat, d = c) : (y = ye(h / _), p = ~~y, p && p === y && (d = c, p--), d > c && (d = c)), y = nr(this._tTime, _), !a && this._tTime && y !== p && this._tTime - y * _ - this._dur <= 0 && (y = p), O && p & 1 && (d = c - d, P = 1), p !== y && !this._lock) {
          var S = O && y & 1, k = S === (O && p & 1);
          if (p < y && (S = !S), a = S ? 0 : h % c ? c : h, this._lock = 1, this.render(a || (P ? 0 : ye(p * _)), r, !c)._lock = 0, this._tTime = h, !r && this.parent && vi(this, "onRepeat"), this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, k && (this._lock = 2, a = S ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !P && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          Sd(this, P);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = i0(this, ye(a), ye(d)), A && (h -= d - (d = A._start))), this._tTime = h, this._time = d, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !r && !y && (vi(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && n >= 0)
        for (u = this._first; u; ) {
          if (g = u._next, (u._act || d >= u._start) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (d - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (d - u._start) * u._ts, r, o), d !== this._time || !this._ts && !w) {
              A = 0, g && (h += this._zTime = -1e-8);
              break;
            }
          }
          u = g;
        }
      else {
        u = this._last;
        for (var R = n < 0 ? n : d; u; ) {
          if (g = u._prev, (u._act || R <= u._end) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (R - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (R - u._start) * u._ts, r, o || ze && Zu(u)), d !== this._time || !this._ts && !w) {
              A = 0, g && (h += this._zTime = R ? -1e-8 : qe);
              break;
            }
          }
          u = g;
        }
      }
      if (A && !r && (this.pause(), A.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = T, Ha(this), this.render(n, r, o);
      this._onUpdate && !r && vi(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (T === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (h === l && this._ts > 0 || !h && this._ts < 0) && Vn(this, 1), !r && !(n < 0 && !a) && (h || a || !l) && (vi(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, r) {
    var o = this;
    if (bn(r) || (r = Oi(this, r, n)), !(n instanceof lo)) {
      if (Ue(n))
        return n.forEach(function(a) {
          return o.add(a, r);
        }), this;
      if (Me(n))
        return this.addLabel(n, r);
      if (ne(n))
        n = _e.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? Qi(this, n, r) : this;
  }, e.getChildren = function(n, r, o, a) {
    n === void 0 && (n = !0), r === void 0 && (r = !0), o === void 0 && (o = !0), a === void 0 && (a = -1e8);
    for (var l = [], c = this._first; c; )
      c._start >= a && (c instanceof _e ? r && l.push(c) : (o && l.push(c), n && l.push.apply(l, c.getChildren(!0, r, o)))), c = c._next;
    return l;
  }, e.getById = function(n) {
    for (var r = this.getChildren(1, 1, 1), o = r.length; o--; )
      if (r[o].vars.id === n)
        return r[o];
  }, e.remove = function(n) {
    return Me(n) ? this.removeLabel(n) : ne(n) ? this.killTweensOf(n) : (n.parent === this && Va(this, n), n === this._recent && (this._recent = this._last), as(this));
  }, e.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(mi.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, r) {
    return this.labels[n] = Oi(this, r), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, r, o) {
    var a = _e.delayedCall(0, r || ro, o);
    return a.data = "isPause", this._hasPause = 1, Qi(this, a, Oi(this, n));
  }, e.removePause = function(n) {
    var r = this._first;
    for (n = Oi(this, n); r; )
      r._start === n && r.data === "isPause" && Vn(r), r = r._next;
  }, e.killTweensOf = function(n, r, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      kn !== a[l] && a[l].kill(n, r);
    return this;
  }, e.getTweensOf = function(n, r) {
    for (var o = [], a = Ii(n), l = this._first, c = bn(r), h; l; )
      l instanceof _e ? Gm(l._targets, a) && (c ? (!kn || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && o.push(l) : (h = l.getTweensOf(a, r)).length && o.push.apply(o, h), l = l._next;
    return o;
  }, e.tweenTo = function(n, r) {
    r = r || {};
    var o = this, a = Oi(o, n), l = r, c = l.startAt, h = l.onStart, f = l.onStartParams, d = l.immediateRender, u, g = _e.to(o, Ti({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || qe,
      onStart: function() {
        if (o.pause(), !u) {
          var _ = r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          g._dur !== _ && sr(g, _, 0, 1).render(g._time, !0, !0), u = 1;
        }
        h && h.apply(g, f || []);
      }
    }, r));
    return d ? g.render(0) : g;
  }, e.tweenFromTo = function(n, r, o) {
    return this.tweenTo(r, Ti({
      startAt: {
        time: Oi(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), oh(this, Oi(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), oh(this, Oi(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + qe);
  }, e.shiftChildren = function(n, r, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (r)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return as(this);
  }, e.invalidate = function(n) {
    var r = this._first;
    for (this._lock = 0; r; )
      r.invalidate(n), r = r._next;
    return s.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var r = this._first, o; r; )
      o = r._next, this.remove(r), r = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), as(this);
  }, e.totalDuration = function(n) {
    var r = 0, o = this, a = o._last, l = nn, c, h, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Qi(o, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (r -= h, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > r && a._ts && (r = a._end), a = c;
      sr(o, o === te && o._time > r ? o._time : r, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (te._ts && (sd(te, ba(n, te)), id = mi.frame), mi.frame >= ih) {
      ih += wi.autoSleep || 120;
      var r = te._first;
      if ((!r || !r._ts) && wi.autoSleep && mi._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || mi.sleep();
      }
    }
  }, t;
}(lo);
Ti(ei.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var y0 = function(t, e, i, n, r, o, a) {
  var l = new li(this._pt, t, e, 0, 1, Id, null, r), c = 0, h = 0, f, d, u, g, p, _, w, A;
  for (l.b = i, l.e = n, i += "", n += "", (w = ~n.indexOf("random(")) && (n = oo(n)), o && (A = [i, n], o(A, t, e), i = A[0], n = A[1]), d = i.match(rl) || []; f = rl.exec(n); )
    g = f[0], p = n.substring(c, f.index), u ? u = (u + 1) % 5 : p.substr(-5) === "rgba(" && (u = 1), g !== d[h++] && (_ = parseFloat(d[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: g.charAt(1) === "=" ? Ws(_, g) - _ : parseFloat(g) - _,
      m: u && u < 4 ? Math.round : 0
    }, c = rl.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = a, (Zf.test(n) || w) && (l.e = 0), this._pt = l, l;
}, Qu = function(t, e, i, n, r, o, a, l, c, h) {
  ne(n) && (n = n(r || 0, t, o));
  var f = t[e], d = i !== "get" ? i : ne(f) ? c ? t[e.indexOf("set") || !ne(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : f, u = ne(f) ? c ? T0 : kd : tc, g;
  if (Me(n) && (~n.indexOf("random(") && (n = oo(n)), n.charAt(1) === "=" && (g = Ws(d, n) + (He(d) || 0), (g || g === 0) && (n = g))), !h || d !== n || Yl)
    return !isNaN(d * n) && n !== "" ? (g = new li(this._pt, t, e, +d || 0, n - (d || 0), typeof f == "boolean" ? E0 : Md, 0, u), c && (g.fp = c), a && g.modifier(a, this, t), this._pt = g) : (!f && !(e in t) && Ku(e, n), y0.call(this, t, e, d, n, u, l || wi.stringFilter, c));
}, v0 = function(t, e, i, n, r) {
  if (ne(t) && (t = Br(t, r, e, i, n)), !rn(t) || t.style && t.nodeType || Ue(t) || Gf(t))
    return Me(t) ? Br(t, r, e, i, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Br(t[a], r, e, i, n);
  return o;
}, Cd = function(t, e, i, n, r, o) {
  var a, l, c, h;
  if (pi[t] && (a = new pi[t]()).init(r, a.rawVars ? e[t] : v0(e[t], n, r, o, i), i, n, o) !== !1 && (i._pt = l = new li(i._pt, r, t, 0, 1, a.render, a, 0, a.priority), i !== Fs))
    for (c = i._ptLookup[i._targets.indexOf(r)], h = a._props.length; h--; )
      c[a._props[h]] = l;
  return a;
}, kn, Yl, Ju = function s(t, e, i) {
  var n = t.vars, r = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, c = n.onUpdate, h = n.runBackwards, f = n.yoyoEase, d = n.keyframes, u = n.autoRevert, g = t._dur, p = t._startAt, _ = t._targets, w = t.parent, A = w && w.data === "nested" ? w.vars.targets : _, C = t._overwrite === "auto" && !Wu, T = t.timeline, y, O, P, S, k, R, V, z, B, Q, it, q, H;
  if (T && (!d || !r) && (r = "none"), t._ease = ls(r, er.ease), t._yEase = f ? Td(ls(f === !0 ? r : f, er.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !T && !!n.runBackwards, !T || d && !n.stagger) {
    if (z = _[0] ? os(_[0]).harness : 0, q = z && n[z.prop], y = wa(n, Xu), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !u ? p.render(-1, !0) : p.revert(h && g ? na : Km), p._lazy = 0), o) {
      if (Vn(t._startAt = _e.set(_, Ti({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !p && oi(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return vi(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ze || !a && !u) && t._startAt.revert(na), a && g && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && g && !p) {
      if (e && (a = !1), P = Ti({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && oi(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), q && (P[z.prop] = q), Vn(t._startAt = _e.set(_, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ze ? t._startAt.revert(na) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, qe, qe);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = g && oi(l) || l && !g, O = 0; O < _.length; O++) {
      if (k = _[O], V = k._gsap || ju(_)[O]._gsap, t._ptLookup[O] = Q = {}, Nl[V.id] && zn.length && va(), it = A === _ ? O : A.indexOf(k), z && (B = new z()).init(k, q || y, t, it, A) !== !1 && (t._pt = S = new li(t._pt, k, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(tt) {
        Q[tt] = S;
      }), B.priority && (R = 1)), !z || q)
        for (P in y)
          pi[P] && (B = Cd(P, y, t, it, k, A)) ? B.priority && (R = 1) : Q[P] = S = Qu.call(t, k, P, "get", y[P], it, A, 0, n.stringFilter);
      t._op && t._op[O] && t.kill(k, t._op[O]), C && t._pt && (kn = t, te.killTweensOf(k, Q, t.globalTime(e)), H = !t.parent, kn = 0), t._pt && l && (Nl[V.id] = 1);
    }
    R && Dd(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !H, d && e <= 0 && T.render(nn, !0, !0);
}, w0 = function(t, e, i, n, r, o, a, l) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, u;
  if (!c)
    for (c = t._ptCache[e] = [], d = t._ptLookup, u = t._targets.length; u--; ) {
      if (h = d[u][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Yl = 1, t.vars[e] = "+=0", Ju(t, a), Yl = 0, l ? so(e + " not eligible for reset") : 1;
      c.push(h);
    }
  for (u = c.length; u--; )
    f = c[u], h = f._pt || f, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + o * h.c, h.c = i - h.s, f.e && (f.e = le(i) + He(f.e)), f.b && (f.b = h.s + He(f.b));
}, b0 = function(t, e) {
  var i = t[0] ? os(t[0]).harness : 0, n = i && i.aliases, r, o, a, l;
  if (!n)
    return e;
  r = ir({}, e);
  for (o in n)
    if (o in r)
      for (l = n[o].split(","), a = l.length; a--; )
        r[l[a]] = r[o];
  return r;
}, x0 = function(t, e, i, n) {
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
}, Br = function(t, e, i, n, r) {
  return ne(t) ? t.call(e, i, n, r) : Me(t) && ~t.indexOf("random(") ? oo(t) : t;
}, Pd = Gu + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Od = {};
ai(Pd + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Od[s] = 1;
});
var _e = /* @__PURE__ */ function(s) {
  Kf(t, s);
  function t(i, n, r, o) {
    var a;
    typeof n == "number" && (r.duration = n, n = r, r = null), a = s.call(this, o ? n : Nr(n)) || this;
    var l = a.vars, c = l.duration, h = l.delay, f = l.immediateRender, d = l.stagger, u = l.overwrite, g = l.keyframes, p = l.defaults, _ = l.scrollTrigger, w = l.yoyoEase, A = n.parent || te, C = (Ue(i) || Gf(i) ? bn(i[0]) : "length" in n) ? [i] : Ii(i), T, y, O, P, S, k, R, V;
    if (a._targets = C.length ? ju(C) : so("GSAP target " + i + " not found. https://gsap.com", !wi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = u, g || d || No(c) || No(h)) {
      if (n = a.vars, T = a.timeline = new ei({
        data: "nested",
        defaults: p || {},
        targets: A && A.data === "nested" ? A.vars.targets : C
      }), T.kill(), T.parent = T._dp = fn(a), T._start = 0, d || No(c) || No(h)) {
        if (P = C.length, R = d && dd(d), rn(d))
          for (S in d)
            ~Pd.indexOf(S) && (V || (V = {}), V[S] = d[S]);
        for (y = 0; y < P; y++)
          O = wa(n, Od), O.stagger = 0, w && (O.yoyoEase = w), V && ir(O, V), k = C[y], O.duration = +Br(c, fn(a), y, k, C), O.delay = (+Br(h, fn(a), y, k, C) || 0) - a._delay, !d && P === 1 && O.delay && (a._delay = h = O.delay, a._start += h, O.delay = 0), T.to(k, O, R ? R(y, k, C) : 0), T._ease = At.none;
        T.duration() ? c = h = 0 : a.timeline = 0;
      } else if (g) {
        Nr(Ti(T.vars.defaults, {
          ease: "none"
        })), T._ease = ls(g.ease || n.ease || "none");
        var z = 0, B, Q, it;
        if (Ue(g))
          g.forEach(function(q) {
            return T.to(C, q, ">");
          }), T.duration();
        else {
          O = {};
          for (S in g)
            S === "ease" || S === "easeEach" || x0(S, g[S], O, g.easeEach);
          for (S in O)
            for (B = O[S].sort(function(q, H) {
              return q.t - H.t;
            }), z = 0, y = 0; y < B.length; y++)
              Q = B[y], it = {
                ease: Q.e,
                duration: (Q.t - (y ? B[y - 1].t : 0)) / 100 * c
              }, it[S] = Q.v, T.to(C, it, z), z += it.duration;
          T.duration() < c && T.to({}, {
            duration: c - T.duration()
          });
        }
      }
      c || a.duration(c = T.duration());
    } else
      a.timeline = 0;
    return u === !0 && !Wu && (kn = fn(a), te.killTweensOf(C), kn = 0), Qi(A, fn(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !c && !g && a._start === ye(A._time) && oi(f) && Jm(fn(a)) && A.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), _ && ud(fn(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(n, r, o) {
    var a = this._time, l = this._tDur, c = this._dur, h = n < 0, f = n > l - qe && !h ? l : n < qe ? 0 : n, d, u, g, p, _, w, A, C, T;
    if (!c)
      e0(this, n, r, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, C = this.timeline, this._repeat) {
        if (p = c + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + n, r, o);
        if (d = ye(f % p), f === l ? (g = this._repeat, d = c) : (_ = ye(f / p), g = ~~_, g && g === _ ? (d = c, g--) : d > c && (d = c)), w = this._yoyo && g & 1, w && (T = this._yEase, d = c - d), _ = nr(this._tTime, p), d === a && !o && this._initted && g === _)
          return this._tTime = f, this;
        g !== _ && (C && this._yEase && Sd(C, w), this.vars.repeatRefresh && !w && !this._lock && d !== p && this._initted && (this._lock = o = 1, this.render(ye(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (cd(this, h ? n : d, o, r, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== _))
          return this;
        if (c !== this._dur)
          return this.render(n, r, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (T || this._ease)(d / c), this._from && (this.ratio = A = 1 - A), !a && f && !r && !_ && (vi(this, "onStart"), this._tTime !== f))
        return this;
      for (u = this._pt; u; )
        u.r(A, u.d), u = u._next;
      C && C.render(n < 0 ? n : C._dur * C._ease(d / this._dur), r, o) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && $l(this, n, r, o), vi(this, "onUpdate")), this._repeat && g !== _ && this.vars.onRepeat && !r && this.parent && vi(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && $l(this, n, !0, !0), (n || !c) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Vn(this, 1), !r && !(h && !a) && (f || a || w) && (vi(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, r, o, a, l) {
    ao || mi.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Ju(this, c), h = this._ease(c / this._dur), w0(this, n, r, o, a, h, c, l) ? this.resetTo(n, r, o, a, 1) : (Wa(this, 0), this.parent || ad(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? Sr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!ze), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, kn && kn.vars.overwrite !== !0)._first || Sr(this), this.parent && o !== this.timeline.totalDuration() && sr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Ii(n) : a, c = this._ptLookup, h = this._pt, f, d, u, g, p, _, w;
    if ((!r || r === "all") && Zm(a, l))
      return r === "all" && (this._pt = 0), Sr(this);
    for (f = this._op = this._op || [], r !== "all" && (Me(r) && (p = {}, ai(r, function(A) {
      return p[A] = 1;
    }), r = p), r = b0(a, r)), w = a.length; w--; )
      if (~l.indexOf(a[w])) {
        d = c[w], r === "all" ? (f[w] = r, g = d, u = {}) : (u = f[w] = f[w] || {}, g = r);
        for (p in g)
          _ = d && d[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Va(this, _, "_pt"), delete d[p]), u !== "all" && (u[p] = 1);
      }
    return this._initted && !this._pt && h && Sr(this), this;
  }, t.to = function(n, r) {
    return new t(n, r, arguments[2]);
  }, t.from = function(n, r) {
    return $r(1, arguments);
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
    return $r(2, arguments);
  }, t.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new t(n, r);
  }, t.killTweensOf = function(n, r, o) {
    return te.killTweensOf(n, r, o);
  }, t;
}(lo);
Ti(_e.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ai("staggerTo,staggerFrom,staggerFromTo", function(s) {
  _e[s] = function() {
    var t = new ei(), e = Vl.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var tc = function(t, e, i) {
  return t[e] = i;
}, kd = function(t, e, i) {
  return t[e](i);
}, T0 = function(t, e, i, n) {
  return t[e](n.fp, i);
}, S0 = function(t, e, i) {
  return t.setAttribute(e, i);
}, ec = function(t, e) {
  return ne(t[e]) ? kd : Yu(t[e]) && t.setAttribute ? S0 : tc;
}, Md = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, E0 = function(t, e) {
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
}, ic = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, A0 = function(t, e, i, n) {
  for (var r = this._pt, o; r; )
    o = r._next, r.p === n && r.modifier(t, e, i), r = o;
}, C0 = function(t) {
  for (var e = this._pt, i, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? Va(this, e, "_pt") : e.dep || (i = 1), e = n;
  return !i;
}, P0 = function(t, e, i, n) {
  n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
}, Dd = function(t) {
  for (var e = t._pt, i, n, r, o; e; ) {
    for (i = e._next, n = r; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : r = e, (e._next = n) ? n._prev = e : o = e, e = i;
  }
  t._pt = r;
}, li = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a, l, c, h) {
    this.t = i, this.s = r, this.c = o, this.p = n, this.r = a || Md, this.d = l || this, this.set = c || tc, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = P0, this.m = i, this.mt = r, this.tween = n;
  }, s;
}();
ai(Gu + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return Xu[s] = 1;
});
xi.TweenMax = xi.TweenLite = _e;
xi.TimelineLite = xi.TimelineMax = ei;
te = new ei({
  sortChildren: !1,
  defaults: er,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
wi.stringFilter = xd;
var us = [], ra = {}, O0 = [], lh = 0, k0 = 0, cl = function(t) {
  return (ra[t] || O0).map(function(e) {
    return e();
  });
}, ql = function() {
  var t = Date.now(), e = [];
  t - lh > 2 && (cl("matchMediaInit"), us.forEach(function(i) {
    var n = i.queries, r = i.conditions, o, a, l, c;
    for (a in n)
      o = Gi.matchMedia(n[a]).matches, o && (l = 1), o !== r[a] && (r[a] = o, c = 1);
    c && (i.revert(), l && e.push(i));
  }), cl("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), lh = t, cl("matchMedia"));
}, Ld = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Hl(i), this.data = [], this._r = [], this.isReverted = !1, this.id = k0++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    ne(i) && (r = n, n = i, i = ne);
    var o = this, a = function() {
      var c = Qt, h = o.selector, f;
      return c && c !== o && c.data.push(o), r && (o.selector = Hl(r)), Qt = o, f = n.apply(o, arguments), ne(f) && o._r.push(f), Qt = c, o.selector = h, o.isReverted = !1, f;
    };
    return o.last = a, i === ne ? a(o, function(l) {
      return o.add(null, l);
    }) : i ? o[i] = a : a;
  }, t.ignore = function(i) {
    var n = Qt;
    Qt = null, i(this), Qt = n;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(n) {
      return n instanceof s ? i.push.apply(i, n.getTweens()) : n instanceof _e && !(n.parent && n.parent.data === "nested") && i.push(n);
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
        c = r.data[l], c instanceof ei ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof _e) && c.revert && c.revert(i);
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
}(), M0 = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Qt && Qt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    rn(i) || (i = {
      matches: i
    });
    var o = new Ld(0, r || this.scope), a = o.conditions = {}, l, c, h;
    Qt && !o.selector && (o.selector = Qt.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = i;
    for (c in i)
      c === "all" ? h = 1 : (l = Gi.matchMedia(i[c]), l && (us.indexOf(o) < 0 && us.push(o), (a[c] = l.matches) && (h = 1), l.addListener ? l.addListener(ql) : l.addEventListener("change", ql)));
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
}(), xa = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(n) {
      return vd(n);
    });
  },
  timeline: function(t) {
    return new ei(t);
  },
  getTweensOf: function(t, e) {
    return te.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, n) {
    Me(t) && (t = Ii(t)[0]);
    var r = os(t || {}).get, o = i ? od : rd;
    return i === "native" && (i = ""), t && (e ? o((pi[e] && pi[e].get || r)(t, e, i, n)) : function(a, l, c) {
      return o((pi[a] && pi[a].get || r)(t, a, l, c));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Ii(t), t.length > 1) {
      var n = t.map(function(h) {
        return ci.quickSetter(h, e, i);
      }), r = n.length;
      return function(h) {
        for (var f = r; f--; )
          n[f](h);
      };
    }
    t = t[0] || {};
    var o = pi[e], a = os(t), l = a.harness && (a.harness.aliases || {})[e] || e, c = o ? function(h) {
      var f = new o();
      Fs._pt = 0, f.init(t, i ? h + i : h, Fs, 0, [t]), f.render(1, f), Fs._pt && ic(1, Fs);
    } : a.set(t, l);
    return o ? c : function(h) {
      return c(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var n, r = ci.to(t, Ti((n = {}, n[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), o = function(l, c, h) {
      return r.resetTo(e, l, c, h);
    };
    return o.tween = r, o;
  },
  isTweening: function(t) {
    return te.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = ls(t.ease, er.ease)), nh(er, t || {});
  },
  config: function(t) {
    return nh(wi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, n = t.plugins, r = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !pi[a] && !xi[a] && so(e + " effect requires " + a + " plugin.");
    }), ol[e] = function(a, l, c) {
      return i(Ii(a), Ti(l || {}, r), c);
    }, o && (ei.prototype[e] = function(a, l, c) {
      return this.add(ol[e](a, rn(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    At[t] = ls(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? ls(t, e) : At;
  },
  getById: function(t) {
    return te.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ei(t), n, r;
    for (i.smoothChildTiming = oi(t.smoothChildTiming), te.remove(i), i._dp = 0, i._time = i._tTime = te._time, n = te._first; n; )
      r = n._next, (e || !(!n._dur && n instanceof _e && n.vars.onComplete === n._targets[0])) && Qi(i, n, n._start - n._delay), n = r;
    return Qi(te, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Ld(t, e) : Qt;
  },
  matchMedia: function(t) {
    return new M0(t);
  },
  matchMediaRefresh: function() {
    return us.forEach(function(t) {
      var e = t.conditions, i, n;
      for (n in e)
        e[n] && (e[n] = !1, i = 1);
      i && t.revert();
    }) || ql();
  },
  addEventListener: function(t, e) {
    var i = ra[t] || (ra[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = ra[t], n = i && i.indexOf(e);
    n >= 0 && i.splice(n, 1);
  },
  utils: {
    wrap: u0,
    wrapYoyo: c0,
    distribute: dd,
    random: gd,
    snap: pd,
    normalize: l0,
    getUnit: He,
    clamp: s0,
    splitColor: wd,
    toArray: Ii,
    selector: Hl,
    mapRange: _d,
    pipe: o0,
    unitize: a0,
    interpolate: h0,
    shuffle: fd
  },
  install: td,
  effects: ol,
  ticker: mi,
  updateRoot: ei.updateRoot,
  plugins: pi,
  globalTimeline: te,
  core: {
    PropTween: li,
    globals: ed,
    Tween: _e,
    Timeline: ei,
    Animation: lo,
    getCache: os,
    _removeLinkedListItem: Va,
    reverting: function() {
      return ze;
    },
    context: function(t) {
      return t && Qt && (Qt.data.push(t), t._ctx = Qt), Qt;
    },
    suppressOverwrites: function(t) {
      return Wu = t;
    }
  }
};
ai("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return xa[s] = _e[s];
});
mi.add(ei.updateRoot);
Fs = xa.to({}, {
  duration: 0
});
var I0 = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, D0 = function(t, e) {
  var i = t._targets, n, r, o;
  for (n in e)
    for (r = i.length; r--; )
      o = t._ptLookup[r][n], o && (o = o.d) && (o._pt && (o = I0(o, n)), o && o.modifier && o.modifier(e[n], t, i[r], n));
}, hl = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, o) {
      o._onInit = function(a) {
        var l, c;
        if (Me(r) && (l = {}, ai(r, function(h) {
          return l[h] = 1;
        }), r = l), e) {
          l = {};
          for (c in r)
            l[c] = e(r[c]);
          r = l;
        }
        D0(a, r);
      };
    }
  };
}, ci = xa.registerPlugin({
  name: "attr",
  init: function(t, e, i, n, r) {
    var o, a, l;
    this.tween = i;
    for (o in e)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", e[o], n, r, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      ze ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, hl("roundProps", Wl), hl("modifiers"), hl("snap", pd)) || xa;
_e.version = ei.version = ci.version = "3.13.0";
Jf = 1;
qu() && rr();
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
var uh, Mn, Ys, nc, is, ch, sc, L0 = function() {
  return typeof window < "u";
}, xn = {}, Qn = 180 / Math.PI, qs = Math.PI / 180, Es = Math.atan2, hh = 1e8, rc = /([A-Z])/g, R0 = /(left|right|width|margin|padding|x)/i, z0 = /[\s,\(]\S/, Ji = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ul = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, F0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, N0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, $0 = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Rd = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, zd = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, B0 = function(t, e, i) {
  return t.style[e] = i;
}, V0 = function(t, e, i) {
  return t.style.setProperty(e, i);
}, H0 = function(t, e, i) {
  return t._gsap[e] = i;
}, W0 = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Y0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(r, o);
}, q0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(r, o);
}, ee = "transform", ui = ee + "Origin", U0 = function s(t, e) {
  var i = this, n = this.target, r = n.style, o = n._gsap;
  if (t in xn && r) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ji[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = dn(n, a);
      }) : this.tfm[t] = o.x ? o[t] : dn(n, t), t === ui && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ji.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(ee) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(ui, e, "")), t = ee;
  }
  (r || e) && this.props.push(t, e, r[t]);
}, Fd = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, K0 = function() {
  var t = this.props, e = this.target, i = e.style, n = e._gsap, r, o;
  for (r = 0; r < t.length; r += 3)
    t[r + 1] ? t[r + 1] === 2 ? e[t[r]](t[r + 2]) : e[t[r]] = t[r + 2] : t[r + 2] ? i[t[r]] = t[r + 2] : i.removeProperty(t[r].substr(0, 2) === "--" ? t[r] : t[r].replace(rc, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), r = sc(), (!r || !r.isStart) && !i[ee] && (Fd(i), n.zOrigin && i[ui] && (i[ui] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Nd = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: K0,
    save: U0
  };
  return t._gsap || ci.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, $d, Kl = function(t, e) {
  var i = Mn.createElementNS ? Mn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Mn.createElement(t);
  return i && i.style ? i : Mn.createElement(t);
}, Di = function s(t, e, i) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(rc, "-$1").toLowerCase()) || n.getPropertyValue(e) || !i && s(t, or(e) || e, 1) || "";
}, fh = "O,Moz,ms,Ms,Webkit".split(","), or = function(t, e, i) {
  var n = e || is, r = n.style, o = 5;
  if (t in r && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(fh[o] + t in r); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? fh[o] : "") + t;
}, Xl = function() {
  L0() && window.document && (uh = window, Mn = uh.document, Ys = Mn.documentElement, is = Kl("div") || {
    style: {}
  }, Kl("div"), ee = or(ee), ui = ee + "Origin", is.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", $d = !!or("perspective"), sc = ci.core.reverting, nc = 1);
}, dh = function(t) {
  var e = t.ownerSVGElement, i = Kl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = t.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), Ys.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), Ys.removeChild(i), r;
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
    e in xn && e !== ui && (e = ee), i.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(n === "--" ? e : e.replace(rc, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, In = function(t, e, i, n, r, o) {
  var a = new li(t._pt, e, i, 0, 1, o ? zd : Rd);
  return t._pt = a, a.b = n, a.e = r, t._props.push(i), a;
}, gh = {
  deg: 1,
  rad: 1,
  turn: 1
}, X0 = {
  grid: 1,
  flex: 1
}, Hn = function s(t, e, i, n) {
  var r = parseFloat(i) || 0, o = (i + "").trim().substr((r + "").length) || "px", a = is.style, l = R0.test(e), c = t.tagName.toLowerCase() === "svg", h = (c ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, d = n === "px", u = n === "%", g, p, _, w;
  if (n === o || !r || gh[n] || gh[o])
    return r;
  if (o !== "px" && !d && (r = s(t, e, i, "px")), w = t.getCTM && Vd(t), (u || o === "%") && (xn[e] || ~e.indexOf("adius")))
    return g = w ? t.getBBox()[l ? "width" : "height"] : t[h], le(u ? r / g * f : r / 100 * g);
  if (a[l ? "width" : "height"] = f + (d ? o : n), p = n !== "rem" && ~e.indexOf("adius") || n === "em" && t.appendChild && !c ? t : t.parentNode, w && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Mn || !p.appendChild) && (p = Mn.body), _ = p._gsap, _ && u && _.width && l && _.time === mi.time && !_.uncache)
    return le(r / _.width * f);
  if (u && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = f + n, g = t[h], A ? t.style[e] = A : _s(t, e);
  } else
    (u || o === "%") && !X0[Di(p, "display")] && (a.position = Di(t, "position")), p === t && (a.position = "static"), p.appendChild(is), g = is[h], p.removeChild(is), a.position = "absolute";
  return l && u && (_ = os(p), _.time = mi.time, _.width = p[h]), le(d ? g * r / f : g && r ? f / g * r : 0);
}, dn = function(t, e, i, n) {
  var r;
  return nc || Xl(), e in Ji && e !== "transform" && (e = Ji[e], ~e.indexOf(",") && (e = e.split(",")[0])), xn[e] && e !== "transform" ? (r = co(t, n), r = e !== "transformOrigin" ? r[e] : r.svg ? r.origin : Sa(Di(t, ui)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = Ta[e] && Ta[e](t, e, i) || Di(t, e) || nd(t, e) || (e === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? Hn(t, e, r, i) + i : r;
}, G0 = function(t, e, i, n) {
  if (!i || i === "none") {
    var r = or(e, t, 1), o = r && Di(t, r, 1);
    o && o !== i ? (e = r, i = o) : e === "borderColor" && (i = Di(t, "borderTopColor"));
  }
  var a = new li(this._pt, t.style, e, 0, 1, Id), l = 0, c = 0, h, f, d, u, g, p, _, w, A, C, T, y;
  if (a.b = i, a.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = Di(t, n.substring(4, n.indexOf(")")))), n === "auto" && (p = t.style[e], t.style[e] = n, n = Di(t, e) || n, p ? t.style[e] = p : _s(t, e)), h = [i, n], xd(h), i = h[0], n = h[1], d = i.match(zs) || [], y = n.match(zs) || [], y.length) {
    for (; f = zs.exec(n); )
      _ = f[0], A = n.substring(l, f.index), g ? g = (g + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (g = 1), _ !== (p = d[c++] || "") && (u = parseFloat(p) || 0, T = p.substr((u + "").length), _.charAt(1) === "=" && (_ = Ws(u, _) + T), w = parseFloat(_), C = _.substr((w + "").length), l = zs.lastIndex - C.length, C || (C = C || wi.units[e] || T, l === n.length && (n += C, a.e += C)), T !== C && (u = Hn(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: A || c === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: u,
        c: w - u,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? zd : Rd;
  return Zf.test(n) && (a.e = 0), this._pt = a, a;
}, mh = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, j0 = function(t) {
  var e = t.split(" "), i = e[0], n = e[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (t = i, i = n, n = t), e[0] = mh[i] || i, e[1] = mh[n] || n, e.join(" ");
}, Z0 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, n = i.style, r = e.u, o = i._gsap, a, l, c;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), c = r.length; --c > -1; )
        a = r[c], xn[a] && (l = 1, a = a === "transformOrigin" ? ui : ee), _s(i, a);
    l && (_s(i, ee), o && (o.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", co(i, 1), o.uncache = 1, Fd(n)));
  }
}, Ta = {
  clearProps: function(t, e, i, n, r) {
    if (r.data !== "isFromStart") {
      var o = t._pt = new li(t._pt, e, i, 0, 0, Z0);
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
}, uo = [1, 0, 0, 1, 0, 0], Hd = {}, Wd = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, _h = function(t) {
  var e = Di(t, ee);
  return Wd(e) ? uo : e.substr(7).match(jf).map(le);
}, oc = function(t, e) {
  var i = t._gsap || os(t), n = t.style, r = _h(t), o, a, l, c;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? uo : r) : (r === uo && !t.offsetParent && t !== Ys && !i.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, a = t.nextElementSibling, Ys.appendChild(t)), r = _h(t), l ? n.display = l : _s(t, "display"), c && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : Ys.removeChild(t))), e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, Gl = function(t, e, i, n, r, o) {
  var a = t._gsap, l = r || oc(t, !0), c = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, u = l[0], g = l[1], p = l[2], _ = l[3], w = l[4], A = l[5], C = e.split(" "), T = parseFloat(C[0]) || 0, y = parseFloat(C[1]) || 0, O, P, S, k;
  i ? l !== uo && (P = u * _ - g * p) && (S = T * (_ / P) + y * (-p / P) + (p * A - _ * w) / P, k = T * (-g / P) + y * (u / P) - (u * A - g * w) / P, T = S, y = k) : (O = Bd(t), T = O.x + (~C[0].indexOf("%") ? T / 100 * O.width : T), y = O.y + (~(C[1] || C[0]).indexOf("%") ? y / 100 * O.height : y)), n || n !== !1 && a.smooth ? (w = T - c, A = y - h, a.xOffset = f + (w * u + A * p) - w, a.yOffset = d + (w * g + A * _) - A) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = y, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!i, t.style[ui] = "0px 0px", o && (In(o, a, "xOrigin", c, T), In(o, a, "yOrigin", h, y), In(o, a, "xOffset", f, a.xOffset), In(o, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + y);
}, co = function(t, e) {
  var i = t._gsap || new Ad(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var n = t.style, r = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), c = Di(t, ui) || "0", h, f, d, u, g, p, _, w, A, C, T, y, O, P, S, k, R, V, z, B, Q, it, q, H, tt, ot, b, G, nt, U, rt, Lt;
  return h = f = d = p = _ = w = A = C = T = 0, u = g = 1, i.svg = !!(t.getCTM && Vd(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[ee] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ee] !== "none" ? l[ee] : "")), n.scale = n.rotate = n.translate = "none"), P = oc(t, i.svg), i.svg && (i.uncache ? (tt = t.getBBox(), c = i.xOrigin - tt.x + "px " + (i.yOrigin - tt.y) + "px", H = "") : H = !e && t.getAttribute("data-svg-origin"), Gl(t, H || c, !!H || i.originIsAbsolute, i.smooth !== !1, P)), y = i.xOrigin || 0, O = i.yOrigin || 0, P !== uo && (V = P[0], z = P[1], B = P[2], Q = P[3], h = it = P[4], f = q = P[5], P.length === 6 ? (u = Math.sqrt(V * V + z * z), g = Math.sqrt(Q * Q + B * B), p = V || z ? Es(z, V) * Qn : 0, A = B || Q ? Es(B, Q) * Qn + p : 0, A && (g *= Math.abs(Math.cos(A * qs))), i.svg && (h -= y - (y * V + O * B), f -= O - (y * z + O * Q))) : (Lt = P[6], U = P[7], b = P[8], G = P[9], nt = P[10], rt = P[11], h = P[12], f = P[13], d = P[14], S = Es(Lt, nt), _ = S * Qn, S && (k = Math.cos(-S), R = Math.sin(-S), H = it * k + b * R, tt = q * k + G * R, ot = Lt * k + nt * R, b = it * -R + b * k, G = q * -R + G * k, nt = Lt * -R + nt * k, rt = U * -R + rt * k, it = H, q = tt, Lt = ot), S = Es(-B, nt), w = S * Qn, S && (k = Math.cos(-S), R = Math.sin(-S), H = V * k - b * R, tt = z * k - G * R, ot = B * k - nt * R, rt = Q * R + rt * k, V = H, z = tt, B = ot), S = Es(z, V), p = S * Qn, S && (k = Math.cos(S), R = Math.sin(S), H = V * k + z * R, tt = it * k + q * R, z = z * k - V * R, q = q * k - it * R, V = H, it = tt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, w = 180 - w), u = le(Math.sqrt(V * V + z * z + B * B)), g = le(Math.sqrt(q * q + Lt * Lt)), S = Es(it, q), A = Math.abs(S) > 2e-4 ? S * Qn : 0, T = rt ? 1 / (rt < 0 ? -rt : rt) : 0), i.svg && (H = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Wd(Di(t, ee)), H && t.setAttribute("transform", H))), Math.abs(A) > 90 && Math.abs(A) < 270 && (r ? (u *= -1, A += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, A += A <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = d + o, i.scaleX = le(u), i.scaleY = le(g), i.rotation = le(p) + a, i.rotationX = le(_) + a, i.rotationY = le(w) + a, i.skewX = A + a, i.skewY = C + a, i.transformPerspective = T + o, (i.zOrigin = parseFloat(c.split(" ")[2]) || !e && i.zOrigin || 0) && (n[ui] = Sa(c)), i.xOffset = i.yOffset = 0, i.force3D = wi.force3D, i.renderTransform = i.svg ? J0 : $d ? Yd : Q0, i.uncache = 0, i;
}, Sa = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, fl = function(t, e, i) {
  var n = He(e);
  return le(parseFloat(e) + parseFloat(Hn(t, "x", i + "px", n))) + n;
}, Q0 = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Yd(t, e);
}, Gn = "0deg", mr = "0px", jn = ") ", Yd = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.z, c = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, u = i.skewY, g = i.scaleX, p = i.scaleY, _ = i.transformPerspective, w = i.force3D, A = i.target, C = i.zOrigin, T = "", y = w === "auto" && t && t !== 1 || w === !0;
  if (C && (f !== Gn || h !== Gn)) {
    var O = parseFloat(h) * qs, P = Math.sin(O), S = Math.cos(O), k;
    O = parseFloat(f) * qs, k = Math.cos(O), o = fl(A, o, P * k * -C), a = fl(A, a, -Math.sin(O) * -C), l = fl(A, l, S * k * -C + C);
  }
  _ !== mr && (T += "perspective(" + _ + jn), (n || r) && (T += "translate(" + n + "%, " + r + "%) "), (y || o !== mr || a !== mr || l !== mr) && (T += l !== mr || y ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + jn), c !== Gn && (T += "rotate(" + c + jn), h !== Gn && (T += "rotateY(" + h + jn), f !== Gn && (T += "rotateX(" + f + jn), (d !== Gn || u !== Gn) && (T += "skew(" + d + ", " + u + jn), (g !== 1 || p !== 1) && (T += "scale(" + g + ", " + p + jn), A.style[ee] = T || "translate(0, 0)";
}, J0 = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.rotation, c = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, u = i.target, g = i.xOrigin, p = i.yOrigin, _ = i.xOffset, w = i.yOffset, A = i.forceCSS, C = parseFloat(o), T = parseFloat(a), y, O, P, S, k;
  l = parseFloat(l), c = parseFloat(c), h = parseFloat(h), h && (h = parseFloat(h), c += h, l += h), l || c ? (l *= qs, c *= qs, y = Math.cos(l) * f, O = Math.sin(l) * f, P = Math.sin(l - c) * -d, S = Math.cos(l - c) * d, c && (h *= qs, k = Math.tan(c - h), k = Math.sqrt(1 + k * k), P *= k, S *= k, h && (k = Math.tan(h), k = Math.sqrt(1 + k * k), y *= k, O *= k)), y = le(y), O = le(O), P = le(P), S = le(S)) : (y = f, S = d, O = P = 0), (C && !~(o + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (C = Hn(u, "x", o, "px"), T = Hn(u, "y", a, "px")), (g || p || _ || w) && (C = le(C + g - (g * y + p * P) + _), T = le(T + p - (g * O + p * S) + w)), (n || r) && (k = u.getBBox(), C = le(C + n / 100 * k.width), T = le(T + r / 100 * k.height)), k = "matrix(" + y + "," + O + "," + P + "," + S + "," + C + "," + T + ")", u.setAttribute("transform", k), A && (u.style[ee] = k);
}, t_ = function(t, e, i, n, r) {
  var o = 360, a = Me(r), l = parseFloat(r) * (a && ~r.indexOf("rad") ? Qn : 1), c = l - n, h = n + c + "deg", f, d;
  return a && (f = r.split("_")[1], f === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -360)), f === "cw" && c < 0 ? c = (c + o * hh) % o - ~~(c / o) * o : f === "ccw" && c > 0 && (c = (c - o * hh) % o - ~~(c / o) * o)), t._pt = d = new li(t._pt, e, i, n, c, F0), d.e = h, d.u = "deg", t._props.push(i), d;
}, yh = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, e_ = function(t, e, i) {
  var n = yh({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, c, h, f, d, u, g;
  n.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), o[ee] = e, a = co(i, 1), _s(i, ee), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[ee], o[ee] = e, a = co(i, 1), o[ee] = c);
  for (l in xn)
    c = n[l], h = a[l], c !== h && r.indexOf(l) < 0 && (u = He(c), g = He(h), f = u !== g ? Hn(i, l, c, g) : parseFloat(c), d = parseFloat(h), t._pt = new li(t._pt, a, l, f, d - f, Ul), t._pt.u = g || 0, t._props.push(l));
  yh(a, n);
};
ai("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", n = "Bottom", r = "Left", o = (t < 3 ? [e, i, n, r] : [e + r, e + i, n + i, n + r]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  Ta[t > 1 ? "border" + s : s] = function(a, l, c, h, f) {
    var d, u;
    if (arguments.length < 4)
      return d = o.map(function(g) {
        return dn(a, g, c);
      }), u = d.join(" "), u.split(d[0]).length === 5 ? d[0] : u;
    d = (h + "").split(" "), u = {}, o.forEach(function(g, p) {
      return u[g] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), a.init(l, u, f);
  };
});
var ac = {
  name: "css",
  register: Xl,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, n, r) {
    var o = this._props, a = t.style, l = i.vars.startAt, c, h, f, d, u, g, p, _, w, A, C, T, y, O, P, S;
    nc || Xl(), this.styles = this.styles || Nd(t), S = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(pi[p] && Cd(p, e, i, n, t, r)))) {
        if (u = typeof h, g = Ta[p], u === "function" && (h = h.call(i, n, t, r), u = typeof h), u === "string" && ~h.indexOf("random(") && (h = oo(h)), g)
          g(this, t, p, h, i) && (P = 1);
        else if (p.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Fn.lastIndex = 0, Fn.test(c) || (_ = He(c), w = He(h)), w ? _ !== w && (c = Hn(t, p, c, w) + w) : _ && (h += _), this.add(a, "setProperty", c, h, n, r, 0, 0, p), o.push(p), S.push(p, 0, a[p]);
        else if (u !== "undefined") {
          if (l && p in l ? (c = typeof l[p] == "function" ? l[p].call(i, n, t, r) : l[p], Me(c) && ~c.indexOf("random(") && (c = oo(c)), He(c + "") || c === "auto" || (c += wi.units[p] || He(dn(t, p)) || ""), (c + "").charAt(1) === "=" && (c = dn(t, p))) : c = dn(t, p), d = parseFloat(c), A = u === "string" && h.charAt(1) === "=" && h.substr(0, 2), A && (h = h.substr(2)), f = parseFloat(h), p in Ji && (p === "autoAlpha" && (d === 1 && dn(t, "visibility") === "hidden" && f && (d = 0), S.push("visibility", 0, a.visibility), In(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = Ji[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in xn, C) {
            if (this.styles.save(p), u === "string" && h.substring(0, 6) === "var(--" && (h = Di(t, h.substring(4, h.indexOf(")"))), f = parseFloat(h)), T || (y = t._gsap, y.renderTransform && !e.parseTransform || co(t, e.parseTransform), O = e.smoothOrigin !== !1 && y.smooth, T = this._pt = new li(this._pt, a, ee, 0, 1, y.renderTransform, y, 0, -1), T.dep = 1), p === "scale")
              this._pt = new li(this._pt, y, "scaleY", y.scaleY, (A ? Ws(y.scaleY, A + f) : f) - y.scaleY || 0, Ul), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              S.push(ui, 0, a[ui]), h = j0(h), y.svg ? Gl(t, h, 0, O, 0, this) : (w = parseFloat(h.split(" ")[2]) || 0, w !== y.zOrigin && In(this, y, "zOrigin", y.zOrigin, w), In(this, a, p, Sa(c), Sa(h)));
              continue;
            } else if (p === "svgOrigin") {
              Gl(t, h, 1, O, 0, this);
              continue;
            } else if (p in Hd) {
              t_(this, y, p, d, A ? Ws(d, A + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              In(this, y, "smooth", y.smooth, h);
              continue;
            } else if (p === "force3D") {
              y[p] = h;
              continue;
            } else if (p === "transform") {
              e_(this, h, t);
              continue;
            }
          } else p in a || (p = or(p) || p);
          if (C || (f || f === 0) && (d || d === 0) && !z0.test(h) && p in a)
            _ = (c + "").substr((d + "").length), f || (f = 0), w = He(h) || (p in wi.units ? wi.units[p] : _), _ !== w && (d = Hn(t, p, c, w)), this._pt = new li(this._pt, C ? y : a, p, d, (A ? Ws(d, A + f) : f) - d, !C && (w === "px" || p === "zIndex") && e.autoRound !== !1 ? $0 : Ul), this._pt.u = w || 0, _ !== w && w !== "%" && (this._pt.b = c, this._pt.r = N0);
          else if (p in a)
            G0.call(this, t, p, c, A ? A + h : h);
          else if (p in t)
            this.add(t, p, c || t[p], A ? A + h : h, n, r);
          else if (p !== "parseTransform") {
            Ku(p, h);
            continue;
          }
          C || (p in a ? S.push(p, 0, a[p]) : typeof t[p] == "function" ? S.push(p, 2, t[p]()) : S.push(p, 1, c || t[p])), o.push(p);
        }
      }
    P && Dd(this);
  },
  render: function(t, e) {
    if (e.tween._time || !sc())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: dn,
  aliases: Ji,
  getSetter: function(t, e, i) {
    var n = Ji[e];
    return n && n.indexOf(",") < 0 && (e = n), e in xn && e !== ui && (t._gsap.x || dn(t, "x")) ? i && ch === i ? e === "scale" ? W0 : H0 : (ch = i || {}) && (e === "scale" ? Y0 : q0) : t.style && !Yu(t.style[e]) ? B0 : ~e.indexOf("-") ? V0 : ec(t, e);
  },
  core: {
    _removeProperty: _s,
    _getMatrix: oc
  }
};
ci.utils.checkPrefix = or;
ci.core.getStyleSaver = Nd;
(function(s, t, e, i) {
  var n = ai(s + "," + t + "," + e, function(r) {
    xn[r] = 1;
  });
  ai(t, function(r) {
    wi.units[r] = "deg", Hd[r] = 1;
  }), Ji[n[13]] = s + "," + t, ai(i, function(r) {
    var o = r.split(":");
    Ji[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ai("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  wi.units[s] = "px";
});
ci.registerPlugin(ac);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var mn, cs, lc, Ya, Ar, oa, Ea, Vr, Hi = "transform", jl = Hi + "Origin", qd, Ud = function(t) {
  var e = t.ownerDocument || t;
  for (!(Hi in t.style) && ("msTransform" in t.style) && (Hi = "msTransform", jl = Hi + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (cs = window, Ea = new ys(), e) {
    mn = e, lc = e.documentElement, Ya = e.body, Vr = mn.createElementNS("http://www.w3.org/2000/svg", "g"), Vr.style.transform = "none";
    var i = e.createElement("div"), n = e.createElement("div"), r = e && (e.body || e.firstElementChild);
    r && r.appendChild && (r.appendChild(i), i.appendChild(n), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), qd = n.offsetParent !== i, r.removeChild(i));
  }
  return e;
}, i_ = function(t) {
  for (var e, i; t && t !== Ya; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Kd = [], Xd = [], n_ = function() {
  return cs.pageYOffset || mn.scrollTop || lc.scrollTop || Ya.scrollTop || 0;
}, s_ = function() {
  return cs.pageXOffset || mn.scrollLeft || lc.scrollLeft || Ya.scrollLeft || 0;
}, uc = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, r_ = function s(t) {
  if (cs.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, dl = function s(t, e) {
  if (t.parentNode && (mn || Ud(t))) {
    var i = uc(t), n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", r = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", c = mn.createElementNS ? mn.createElementNS(n.replace(/^https/, "http"), r) : mn.createElement(r);
    return e && (i ? (oa || (oa = s(t)), c.setAttribute("width", 0.01), c.setAttribute("height", 0.01), c.setAttribute("transform", "translate(" + o + "," + a + ")"), oa.appendChild(c)) : (Ar || (Ar = s(t), Ar.style.cssText = l), c.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", Ar.appendChild(c))), c;
  }
  throw "Need document and parent.";
}, o_ = function(t) {
  for (var e = new ys(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, a_ = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Hi], t.style[Hi] = "none", t.appendChild(Vr), e = Vr.getCTM(), t.removeChild(Vr), i ? t.style[Hi] = i : t.style.removeProperty(Hi.replace(/([A-Z])/g, "-$1").toLowerCase())), e || Ea.clone();
}, l_ = function(t, e) {
  var i = uc(t), n = t === i, r = i ? Kd : Xd, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, l, c, h, f, d, u;
  if (t === cs)
    return t;
  if (r.length || r.push(dl(t, 1), dl(t, 2), dl(t, 3)), l = i ? oa : Ar, i)
    n ? (h = a_(t), f = -h.e / h.a, d = -h.f / h.d, c = Ea) : t.getBBox ? (h = t.getBBox(), c = t.transform ? t.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? o_(c) : c.getItem(0).matrix : Ea, f = c.a * h.x + c.c * h.y, d = c.b * h.x + c.d * h.y) : (c = new ys(), f = d = 0), (n ? i : o).appendChild(l), l.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + f) + "," + (c.f + d) + ")");
  else {
    if (f = d = 0, qd)
      for (c = t.offsetParent, h = t; h && (h = h.parentNode) && h !== c && h.parentNode; )
        (cs.getComputedStyle(h)[Hi] + "").length > 4 && (f = h.offsetLeft, d = h.offsetTop, h = 0);
    if (u = cs.getComputedStyle(t), u.position !== "absolute" && u.position !== "fixed")
      for (c = t.offsetParent; o && o !== c; )
        f += o.scrollLeft || 0, d += o.scrollTop || 0, o = o.parentNode;
    h = l.style, h.top = t.offsetTop - d + "px", h.left = t.offsetLeft - f + "px", h[Hi] = u[Hi], h[jl] = u[jl], h.position = u.position === "fixed" ? "fixed" : "absolute", a.appendChild(l);
  }
  return l;
}, pl = function(t, e, i, n, r, o, a) {
  return t.a = e, t.b = i, t.c = n, t.d = r, t.e = o, t.f = a, t;
}, ys = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), pl(this, e, i, n, r, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, n = this.b, r = this.c, o = this.d, a = this.e, l = this.f, c = i * o - n * r || 1e-10;
    return pl(this, o / c, -n / c, -r / c, i / c, (r * l - o * a) / c, -(i * l - n * a) / c);
  }, t.multiply = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, c = this.f, h = i.a, f = i.c, d = i.b, u = i.d, g = i.e, p = i.f;
    return pl(this, h * n + d * o, h * r + d * a, f * n + u * o, f * r + u * a, l + g * n + p * o, c + g * r + p * a);
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
function es(s, t, e, i) {
  if (!s || !s.parentNode || (mn || Ud(s)).documentElement === s)
    return new ys();
  var n = i_(s), r = uc(s), o = r ? Kd : Xd, a = l_(s), l = o[0].getBoundingClientRect(), c = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), f = a.parentNode, d = r_(s), u = new ys((c.left - l.left) / 100, (c.top - l.top) / 100, (h.left - l.left) / 100, (h.top - l.top) / 100, l.left + (d ? 0 : s_()), l.top + (d ? 0 : n_()));
  if (f.removeChild(a), n)
    for (l = n.length; l--; )
      c = n[l], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
  return t ? u.inverse() : u;
}
function vh(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function u_(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var Et, Wt, _i, Yi, _n, gl, pn, Zl, Cr, Dn, Gd, Ql, ho, cc, Pr, $i, Or, aa, jd, Jl, Aa = 0, Zd = function() {
  return typeof window < "u";
}, Qd = function() {
  return Et || Zd() && (Et = window.gsap) && Et.registerPlugin && Et;
}, On = function(t) {
  return typeof t == "function";
}, Hr = function(t) {
  return typeof t == "object";
}, Vi = function(t) {
  return typeof t > "u";
}, la = function() {
  return !1;
}, Wr = "transform", tu = "transformOrigin", Sn = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, _r = Array.isArray, $o = function(t, e) {
  var i = _i.createElementNS ? _i.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : _i.createElement(t);
  return i.style ? i : _i.createElement(t);
}, wh = 180 / Math.PI, As = 1e20, c_ = new ys(), En = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, hs = [], Us = {}, h_ = 0, f_ = /^(?:a|input|textarea|button|select)$/i, bh = 0, Cs = {}, hn = {}, Jd = function(t, e) {
  var i = {}, n;
  for (n in t)
    i[n] = e ? t[n] * e : t[n];
  return i;
}, d_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, xh = function s(t, e) {
  for (var i = t.length, n; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), n = t[i].children, n && n.length && s(n, e);
}, tp = function() {
  return hs.forEach(function(t) {
    return t();
  });
}, p_ = function(t) {
  hs.push(t), hs.length === 1 && Et.ticker.add(tp);
}, Th = function() {
  return !hs.length && Et.ticker.remove(tp);
}, Sh = function(t) {
  for (var e = hs.length; e--; )
    hs[e] === t && hs.splice(e, 1);
  Et.to(Th, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: Th,
    data: "_draggable"
  });
}, g_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Se = function(t, e, i, n) {
  if (t.addEventListener) {
    var r = ho[e];
    n = n || (Gd ? {
      passive: !1
    } : null), t.addEventListener(r || e, i, n), r && e !== r && t.addEventListener(e, i, n);
  }
}, pe = function(t, e, i, n) {
  if (t.removeEventListener) {
    var r = ho[e];
    t.removeEventListener(r || e, i, n), r && e !== r && t.removeEventListener(e, i, n);
  }
}, Ci = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, m_ = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, __ = function s(t) {
  cc = t.touches && Aa < t.touches.length, pe(t.target, "touchend", s);
}, Eh = function(t) {
  cc = t.touches && Aa < t.touches.length, Se(t.target, "touchend", __);
}, Ks = function(t) {
  return Wt.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Xs = function(t) {
  return Wt.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, Ah = function s(t, e) {
  Se(t, "scroll", e), ar(t.parentNode) || s(t.parentNode, e);
}, Ch = function s(t, e) {
  pe(t, "scroll", e), ar(t.parentNode) || s(t.parentNode, e);
}, ar = function(t) {
  return !t || t === Yi || t.nodeType === 9 || t === _i.body || t === Wt || !t.nodeType || !t.parentNode;
}, Ph = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return Math.max(0, ar(t) ? Math.max(Yi[n], _n[n]) - (Wt["inner" + i] || Yi[r] || _n[r]) : t[n] - t[r]);
}, ml = function s(t, e) {
  var i = Ph(t, "x"), n = Ph(t, "y");
  ar(t) ? t = hn : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = n, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, _l = function(t, e, i) {
  var n = t.style;
  n && (Vi(n[e]) && (e = Cr(e, t) || e), i == null ? n.removeProperty && n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n[e] = i);
}, fo = function(t) {
  return Wt.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Zn = {}, Ps = function(t) {
  if (t === Wt)
    return Zn.left = Zn.top = 0, Zn.width = Zn.right = Yi.clientWidth || t.innerWidth || _n.clientWidth || 0, Zn.height = Zn.bottom = (t.innerHeight || 0) - 20 < Yi.clientHeight ? Yi.clientHeight : t.innerHeight || _n.clientHeight || 0, Zn;
  var e = t.ownerDocument || _i, i = Vi(t.pageX) ? !t.nodeType && !Vi(t.left) && !Vi(t.top) ? t : Dn(t)[0].getBoundingClientRect() : {
    left: t.pageX - Xs(e),
    top: t.pageY - Ks(e),
    right: t.pageX - Xs(e) + 1,
    bottom: t.pageY - Ks(e) + 1
  };
  return Vi(i.right) && !Vi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Vi(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, ae = function(t, e, i) {
  var n = t.vars, r = n[i], o = t._listeners[e], a;
  return On(r) && (a = r.apply(n.callbackScope || t, n[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, Oh = function(t, e) {
  var i = Dn(t)[0], n, r, o;
  return !i.nodeType && i !== Wt ? Vi(t.left) ? (r = t.min || t.minX || t.minRotation || 0, n = t.min || t.minY || 0, {
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
  }) : y_(i, e);
}, Pi = {}, y_ = function(t, e) {
  e = Dn(e)[0];
  var i = t.getBBox && t.ownerSVGElement, n = t.ownerDocument || _i, r, o, a, l, c, h, f, d, u, g, p, _, w;
  if (t === Wt)
    a = Ks(n), r = Xs(n), o = r + (n.documentElement.clientWidth || t.innerWidth || n.body.clientWidth || 0), l = a + ((t.innerHeight || 0) - 20 < n.documentElement.clientHeight ? n.documentElement.clientHeight : t.innerHeight || n.body.clientHeight || 0);
  else {
    if (e === Wt || Vi(e))
      return t.getBoundingClientRect();
    r = a = 0, i ? (g = t.getBBox(), p = g.width, _ = g.height) : (t.viewBox && (g = t.viewBox.baseVal) && (r = g.x || 0, a = g.y || 0, p = g.width, _ = g.height), p || (w = fo(t), g = w.boxSizing === "border-box", p = (parseFloat(w.width) || t.clientWidth || 0) + (g ? 0 : parseFloat(w.borderLeftWidth) + parseFloat(w.borderRightWidth)), _ = (parseFloat(w.height) || t.clientHeight || 0) + (g ? 0 : parseFloat(w.borderTopWidth) + parseFloat(w.borderBottomWidth)))), o = p, l = _;
  }
  return t === e ? {
    left: r,
    top: a,
    width: o - r,
    height: l - a
  } : (c = es(e, !0).multiply(es(t)), h = c.apply({
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
}, yl = function(t, e, i, n, r, o) {
  var a = {}, l, c, h;
  if (e)
    if (r !== 1 && e instanceof Array) {
      if (a.end = l = [], h = e.length, Hr(e[0]))
        for (c = 0; c < h; c++)
          l[c] = Jd(e[c], r);
      else
        for (c = 0; c < h; c++)
          l[c] = e[c] * r;
      i += 1.1, n -= 1.1;
    } else On(e) ? a.end = function(f) {
      var d = e.call(t, f), u, g;
      if (r !== 1)
        if (Hr(d)) {
          u = {};
          for (g in d)
            u[g] = d[g] * r;
          d = u;
        } else
          d *= r;
      return d;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (n || n === 0) && (a.min = n), o && (a.velocity = 0), a;
}, v_ = function s(t) {
  var e;
  return !t || !t.getAttribute || t === _n ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (f_.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, Bo = function(t, e) {
  for (var i = t.length, n; i--; )
    n = t[i], n.ondragstart = n.onselectstart = e ? null : la, Et.set(n, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, w_ = function s(t) {
  if (fo(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, ep, eu, b_ = function(t, e) {
  t = Et.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), n = i.style, r = t.firstChild, o = 0, a = 0, l = t.scrollTop, c = t.scrollLeft, h = t.scrollWidth, f = t.scrollHeight, d = 0, u = 0, g = 0, p, _, w, A, C, T;
  ep && e.force3D !== !1 ? (C = "translate3d(", T = "px,0px)") : Wr && (C = "translate(", T = "px)"), this.scrollTop = function(y, O) {
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
      c = t.scrollLeft, Et.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-c), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (a = y - 0.5 | 0, y = 0) : y > u ? (a = y - u | 0, y = u) : a = 0, (a || S) && (this._skip || (n[Wr] = C + -a + "px," + -o + T), a + d >= 0 && (n.paddingRight = a + d + "px")), t.scrollLeft = y | 0, c = t.scrollLeft;
  }, this.top = function(y, O) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var P = t.scrollTop - l, S = o;
    if ((P > 2 || P < -2) && !O) {
      l = t.scrollTop, Et.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-l), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (o = y - 0.5 | 0, y = 0) : y > g ? (o = y - g | 0, y = g) : o = 0, (o || S) && (this._skip || (n[Wr] = C + -a + "px," + -o + T)), t.scrollTop = y | 0, l = t.scrollTop;
  }, this.maxScrollTop = function() {
    return g;
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
    l = t.scrollTop, c = t.scrollLeft, !(O && t.clientHeight === _ && i.offsetHeight === w && h === t.scrollWidth && f === t.scrollHeight && !y) && ((o || a) && (S = this.left(), k = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), P = fo(t), (!O || y) && (n.display = "block", n.width = "auto", n.paddingRight = "0px", d = Math.max(0, t.scrollWidth - t.clientWidth), d && (d += parseFloat(P.paddingLeft) + (eu ? parseFloat(P.paddingRight) : 0))), n.display = "inline-block", n.position = "relative", n.overflow = "visible", n.verticalAlign = "top", n.boxSizing = "content-box", n.width = "100%", n.paddingRight = d + "px", eu && (n.paddingBottom = P.paddingBottom), p = t.clientWidth, _ = t.clientHeight, h = t.scrollWidth, f = t.scrollHeight, u = t.scrollWidth - p, g = t.scrollHeight - _, w = i.offsetHeight, n.display = "block", (S || k) && (this.left(S), this.top(k)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, vl = function(t) {
  if (Zd() && document.body) {
    var e = window && window.navigator;
    Wt = window, _i = document, Yi = _i.documentElement, _n = _i.body, gl = $o("div"), aa = !!window.PointerEvent, pn = $o("div"), pn.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Or = pn.style.cursor === "grab" ? "grab" : "move", Pr = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Ql = "ontouchstart" in Yi && "orientation" in Wt || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), eu = function() {
      var i = $o("div"), n = $o("div"), r = n.style, o = _n, a;
      return r.display = "inline-block", r.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(n), o.appendChild(i), a = n.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), ho = function(i) {
      for (var n = i.split(","), r = ("onpointerdown" in gl ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in gl ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[n[a]] = r[a], o[r[a]] = n[a];
      try {
        Yi.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Gd = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), Se(_i, "touchcancel", la), Se(Wt, "touchmove", la), _n && _n.addEventListener("touchstart", la), Se(_i, "contextmenu", function() {
      for (var i in Us)
        Us[i].isPressed && Us[i].endDrag();
    }), Et = Zl = Qd();
  }
  Et ? ($i = Et.plugins.inertia, jd = Et.core.context || function() {
  }, Cr = Et.utils.checkPrefix, Wr = Cr(Wr), tu = Cr(tu), Dn = Et.utils.toArray, Jl = Et.core.getStyleSaver, ep = !!Cr("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, x_ = /* @__PURE__ */ function() {
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
  u_(t, s);
  function t(e, i) {
    var n;
    n = s.call(this) || this, Zl || vl(1), e = Dn(e)[0], n.styles = Jl && Jl(e, "transform,left,top"), $i || ($i = Et.plugins.inertia), n.vars = i = Jd(i || {}), n.target = e, n.x = n.y = n.rotation = 0, n.dragResistance = parseFloat(i.dragResistance) || 0, n.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, n.lockAxis = i.lockAxis, n.autoScroll = i.autoScroll || 0, n.lockedAxis = null, n.allowEventDefault = !!i.allowEventDefault, Et.getProperty(e, "x");
    var r = (i.type || "x,y").toLowerCase(), o = ~r.indexOf("x") || ~r.indexOf("y"), a = r.indexOf("rotation") !== -1, l = a ? "rotation" : o ? "x" : "left", c = o ? "y" : "top", h = !!(~r.indexOf("x") || ~r.indexOf("left") || r === "scroll"), f = !!(~r.indexOf("y") || ~r.indexOf("top") || r === "scroll"), d = i.minimumMovement || 2, u = vh(n), g = Dn(i.trigger || i.handle || e), p = {}, _ = 0, w = !1, A = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, T = i.autoScrollMarginBottom || 40, y = i.autoScrollMarginLeft || 40, O = i.clickableTest || v_, P = 0, S = e._gsap || Et.core.getCache(e), k = w_(e), R = function(v, $) {
      return parseFloat(S.get(e, v, $));
    }, V = e.ownerDocument || _i, z, B, Q, it, q, H, tt, ot, b, G, nt, U, rt, Lt, mt, Ct, lt, zt, se, Bt, Ut, pt, gt, ut, Ce, I, Vt, Ke, Ie, Ft, $t, ce, Xe, Xt = function(v) {
      return Ci(v), v.stopImmediatePropagation && v.stopImmediatePropagation(), !1;
    }, re = function j(v) {
      if (u.autoScroll && u.isDragging && (w || lt)) {
        var $ = e, E = u.autoScroll * 15, M, N, D, W, F, Y, et, K;
        for (w = !1, hn.scrollTop = Wt.pageYOffset != null ? Wt.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Wt.pageXOffset != null ? Wt.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft, W = u.pointerX - hn.scrollLeft, F = u.pointerY - hn.scrollTop; $ && !N; )
          N = ar($.parentNode), M = N ? hn : $.parentNode, D = N ? {
            bottom: Math.max(Yi.clientHeight, Wt.innerHeight || 0),
            right: Math.max(Yi.clientWidth, Wt.innerWidth || 0),
            left: 0,
            top: 0
          } : M.getBoundingClientRect(), Y = et = 0, f && (K = M._gsMaxScrollY - M.scrollTop, K < 0 ? et = K : F > D.bottom - T && K ? (w = !0, et = Math.min(K, E * (1 - Math.max(0, D.bottom - F) / T) | 0)) : F < D.top + A && M.scrollTop && (w = !0, et = -Math.min(M.scrollTop, E * (1 - Math.max(0, F - D.top) / A) | 0)), et && (M.scrollTop += et)), h && (K = M._gsMaxScrollX - M.scrollLeft, K < 0 ? Y = K : W > D.right - C && K ? (w = !0, Y = Math.min(K, E * (1 - Math.max(0, D.right - W) / C) | 0)) : W < D.left + y && M.scrollLeft && (w = !0, Y = -Math.min(M.scrollLeft, E * (1 - Math.max(0, W - D.left) / y) | 0)), Y && (M.scrollLeft += Y)), N && (Y || et) && (Wt.scrollTo(M.scrollLeft, M.scrollTop), $e(u.pointerX + Y, u.pointerY + et)), $ = M;
      }
      if (lt) {
        var ft = u.x, Tt = u.y;
        a ? (u.deltaX = ft - parseFloat(S.rotation), u.rotation = ft, S.rotation = ft + "deg", S.renderTransform(1, S)) : B ? (f && (u.deltaY = Tt - B.top(), B.top(Tt)), h && (u.deltaX = ft - B.left(), B.left(ft))) : o ? (f && (u.deltaY = Tt - parseFloat(S.y), S.y = Tt + "px"), h && (u.deltaX = ft - parseFloat(S.x), S.x = ft + "px"), S.renderTransform(1, S)) : (f && (u.deltaY = Tt - parseFloat(e.style.top || 0), e.style.top = Tt + "px"), h && (u.deltaX = ft - parseFloat(e.style.left || 0), e.style.left = ft + "px")), ot && !v && !Ke && (Ke = !0, ae(u, "drag", "onDrag") === !1 && (h && (u.x -= u.deltaX), f && (u.y -= u.deltaY), j(!0)), Ke = !1);
      }
      lt = !1;
    }, kt = function(v, $) {
      var E = u.x, M = u.y, N, D;
      e._gsap || (S = Et.core.getCache(e)), S.uncache && Et.getProperty(e, "x"), o ? (u.x = parseFloat(S.x), u.y = parseFloat(S.y)) : a ? u.x = u.rotation = parseFloat(S.rotation) : B ? (u.y = B.top(), u.x = B.left()) : (u.y = parseFloat(e.style.top || (D = fo(e)) && D.top) || 0, u.x = parseFloat(e.style.left || (D || {}).left) || 0), (se || Bt || Ut) && !$ && (u.isDragging || u.isThrowing) && (Ut && (Cs.x = u.x, Cs.y = u.y, N = Ut(Cs), N.x !== u.x && (u.x = N.x, lt = !0), N.y !== u.y && (u.y = N.y, lt = !0)), se && (N = se(u.x), N !== u.x && (u.x = N, a && (u.rotation = N), lt = !0)), Bt && (N = Bt(u.y), N !== u.y && (u.y = N), lt = !0)), lt && re(!0), v || (u.deltaX = u.x - E, u.deltaY = u.y - M, ae(u, "throwupdate", "onThrowUpdate"));
    }, he = function(v, $, E, M) {
      return $ == null && ($ = -1e20), E == null && (E = As), On(v) ? function(N) {
        var D = u.isPressed ? 1 - u.edgeResistance : 1;
        return v.call(u, (N > E ? E + (N - E) * D : N < $ ? $ + (N - $) * D : N) * M) * M;
      } : _r(v) ? function(N) {
        for (var D = v.length, W = 0, F = As, Y, et; --D > -1; )
          Y = v[D], et = Y - N, et < 0 && (et = -et), et < F && Y >= $ && Y <= E && (W = D, F = et);
        return v[W];
      } : isNaN(v) ? function(N) {
        return N;
      } : function() {
        return v * M;
      };
    }, De = function(v, $, E, M, N, D, W) {
      return D = D && D < As ? D * D : As, On(v) ? function(F) {
        var Y = u.isPressed ? 1 - u.edgeResistance : 1, et = F.x, K = F.y, ft, Tt, Pt;
        return F.x = et = et > E ? E + (et - E) * Y : et < $ ? $ + (et - $) * Y : et, F.y = K = K > N ? N + (K - N) * Y : K < M ? M + (K - M) * Y : K, ft = v.call(u, F), ft !== F && (F.x = ft.x, F.y = ft.y), W !== 1 && (F.x *= W, F.y *= W), D < As && (Tt = F.x - et, Pt = F.y - K, Tt * Tt + Pt * Pt > D && (F.x = et, F.y = K)), F;
      } : _r(v) ? function(F) {
        for (var Y = v.length, et = 0, K = As, ft, Tt, Pt, yt; --Y > -1; )
          Pt = v[Y], ft = Pt.x - F.x, Tt = Pt.y - F.y, yt = ft * ft + Tt * Tt, yt < K && (et = Y, K = yt);
        return K <= D ? v[et] : F;
      } : function(F) {
        return F;
      };
    }, Fe = function() {
      var v, $, E, M;
      tt = !1, B ? (B.calibrate(), u.minX = nt = -B.maxScrollLeft(), u.minY = rt = -B.maxScrollTop(), u.maxX = G = u.maxY = U = 0, tt = !0) : i.bounds && (v = Oh(i.bounds, e.parentNode), a ? (u.minX = nt = v.left, u.maxX = G = v.left + v.width, u.minY = rt = u.maxY = U = 0) : !Vi(i.bounds.maxX) || !Vi(i.bounds.maxY) ? (v = i.bounds, u.minX = nt = v.minX, u.minY = rt = v.minY, u.maxX = G = v.maxX, u.maxY = U = v.maxY) : ($ = Oh(e, e.parentNode), u.minX = nt = Math.round(R(l, "px") + v.left - $.left), u.minY = rt = Math.round(R(c, "px") + v.top - $.top), u.maxX = G = Math.round(nt + (v.width - $.width)), u.maxY = U = Math.round(rt + (v.height - $.height))), nt > G && (u.minX = G, u.maxX = G = nt, nt = u.minX), rt > U && (u.minY = U, u.maxY = U = rt, rt = u.minY), a && (u.minRotation = nt, u.maxRotation = G), tt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, M = _r(E) || On(E), a ? (se = he(M ? E : E.rotation, nt, G, 1), Bt = null) : E.points ? Ut = De(M ? E : E.points, nt, G, rt, U, E.radius, B ? -1 : 1) : (h && (se = he(M ? E : E.x || E.left || E.scrollLeft, nt, G, B ? -1 : 1)), f && (Bt = he(M ? E : E.y || E.top || E.scrollTop, rt, U, B ? -1 : 1))));
    }, Ki = function() {
      u.isThrowing = !1, ae(u, "throwcomplete", "onThrowComplete");
    }, Kt = function() {
      u.isThrowing = !1;
    }, Xi = function(v, $) {
      var E, M, N, D;
      v && $i ? (v === !0 && (E = i.snap || i.liveSnap || {}, M = _r(E) || On(E), v = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? v.rotation = yl(u, M ? E : E.rotation, G, nt, 1, $) : (h && (v[l] = yl(u, M ? E : E.points || E.x || E.left, G, nt, B ? -1 : 1, $ || u.lockedAxis === "x")), f && (v[c] = yl(u, M ? E : E.points || E.y || E.top, U, rt, B ? -1 : 1, $ || u.lockedAxis === "y")), (E.points || _r(E) && Hr(E[0])) && (v.linkedProps = l + "," + c, v.radius = E.radius))), u.isThrowing = !0, D = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - u.edgeResistance + 0.2 : i.overshootTolerance, v.duration || (v.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? D === 0 || Hr(v) && v.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: D
      }), u.tween = N = Et.to(B || e, {
        inertia: v,
        data: "_draggable",
        inherit: !1,
        onComplete: Ki,
        onInterrupt: Kt,
        onUpdate: i.fastMode ? ae : kt,
        onUpdateParams: i.fastMode ? [u, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), N.render(1e9, !0, !0), kt(!0, !0), u.endX = u.x, u.endY = u.y, a && (u.endRotation = u.x), N.play(0), kt(!0, !0), B && (B._skip = !1))) : tt && u.applyBounds();
    }, si = function(v) {
      var $ = ut, E;
      ut = es(e.parentNode, !0), v && u.isPressed && !ut.equals($ || new ys()) && (E = $.inverse().apply({
        x: Q,
        y: it
      }), ut.apply(E, E), Q = E.x, it = E.y), ut.equals(c_) && (ut = null);
    }, ve = function() {
      var v = 1 - u.edgeResistance, $ = k ? Xs(V) : 0, E = k ? Ks(V) : 0, M, N, D;
      o && (S.x = R(l, "px") + "px", S.y = R(c, "px") + "px", S.renderTransform()), si(!1), Pi.x = u.pointerX - $, Pi.y = u.pointerY - E, ut && ut.apply(Pi, Pi), Q = Pi.x, it = Pi.y, lt && ($e(u.pointerX, u.pointerY), re(!0)), ce = es(e), B ? (Fe(), H = B.top(), q = B.left()) : (Le() ? (kt(!0, !0), Fe()) : u.applyBounds(), a ? (M = e.ownerSVGElement ? [S.xOrigin - e.getBBox().x, S.yOrigin - e.getBBox().y] : (fo(e)[tu] || "0 0").split(" "), Ct = u.rotationOrigin = es(e).apply({
        x: parseFloat(M[0]) || 0,
        y: parseFloat(M[1]) || 0
      }), kt(!0, !0), N = u.pointerX - Ct.x - $, D = Ct.y - u.pointerY + E, q = u.x, H = u.y = Math.atan2(D, N) * wh) : (H = R(c, "px"), q = R(l, "px"))), tt && v && (q > G ? q = G + (q - G) / v : q < nt && (q = nt - (nt - q) / v), a || (H > U ? H = U + (H - U) / v : H < rt && (H = rt - (rt - H) / v))), u.startX = q = Sn(q), u.startY = H = Sn(H);
    }, Le = function() {
      return u.tween && u.tween.isActive();
    }, Si = function() {
      pn.parentNode && !Le() && !u.isDragging && pn.parentNode.removeChild(pn);
    }, Ne = function(v, $) {
      var E;
      if (!z || u.isPressed || !v || (v.type === "mousedown" || v.type === "pointerdown") && !$ && En() - P < 30 && ho[u.pointerEvent.type]) {
        $t && v && z && Ci(v);
        return;
      }
      if (Ce = Le(), Xe = !1, u.pointerEvent = v, ho[v.type] ? (gt = ~v.type.indexOf("touch") ? v.currentTarget || v.target : V, Se(gt, "touchend", Nt), Se(gt, "touchmove", at), Se(gt, "touchcancel", Nt), Se(V, "touchstart", Eh)) : (gt = null, Se(V, "mousemove", at)), Vt = null, (!aa || !gt) && (Se(V, "mouseup", Nt), v && v.target && Se(v.target, "mouseup", Nt)), pt = O.call(u, v.target) && i.dragClickables === !1 && !$, pt) {
        Se(v.target, "change", Nt), ae(u, "pressInit", "onPressInit"), ae(u, "press", "onPress"), Bo(g, !0), $t = !1;
        return;
      }
      if (I = !gt || h === f || u.vars.allowNativeTouchScrolling === !1 || u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2) ? !1 : h ? "y" : "x", $t = !I && !u.allowEventDefault, $t && (Ci(v), Se(Wt, "touchforcechange", Ci)), v.changedTouches ? (v = Lt = v.changedTouches[0], mt = v.identifier) : v.pointerId ? mt = v.pointerId : Lt = mt = null, Aa++, p_(re), it = u.pointerY = v.pageY, Q = u.pointerX = v.pageX, ae(u, "pressInit", "onPressInit"), (I || u.autoScroll) && ml(e.parentNode), e.parentNode && u.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !pn.parentNode && !e.getBBox && (pn.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(pn)), ve(), u.tween && u.tween.kill(), u.isThrowing = !1, Et.killTweensOf(B || e, p, !0), B && Et.killTweensOf(e, {
        scrollTo: 1
      }, !0), u.tween = u.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), u.isPressed = !0, ot = !!(i.onDrag || u._listeners.drag), b = !!(i.onMove || u._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = g.length; --E > -1; )
          Et.set(g[E], {
            cursor: i.activeCursor || i.cursor || (Or === "grab" ? "grabbing" : Or)
          });
      ae(u, "press", "onPress");
    }, at = function(v) {
      var $ = v, E, M, N, D, W, F;
      if (!z || cc || !u.isPressed || !v) {
        $t && v && z && Ci(v);
        return;
      }
      if (u.pointerEvent = v, E = v.changedTouches, E) {
        if (v = E[0], v !== Lt && v.identifier !== mt) {
          for (D = E.length; --D > -1 && (v = E[D]).identifier !== mt && v.target !== e; )
            ;
          if (D < 0)
            return;
        }
      } else if (v.pointerId && mt && v.pointerId !== mt)
        return;
      if (gt && I && !Vt && (Pi.x = v.pageX - (k ? Xs(V) : 0), Pi.y = v.pageY - (k ? Ks(V) : 0), ut && ut.apply(Pi, Pi), M = Pi.x, N = Pi.y, W = Math.abs(M - Q), F = Math.abs(N - it), (W !== F && (W > d || F > d) || Pr && I === Vt) && (Vt = W > F && h ? "x" : "y", I && Vt !== I && Se(Wt, "touchforcechange", Ci), u.vars.lockAxisOnTouchScroll !== !1 && h && f && (u.lockedAxis = Vt === "x" ? "y" : "x", On(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, $)), Pr && I === Vt))) {
        Nt($);
        return;
      }
      !u.allowEventDefault && (!I || Vt && I !== Vt) && $.cancelable !== !1 ? (Ci($), $t = !0) : $t && ($t = !1), u.autoScroll && (w = !0), $e(v.pageX, v.pageY, b);
    }, $e = function(v, $, E) {
      var M = 1 - u.dragResistance, N = 1 - u.edgeResistance, D = u.pointerX, W = u.pointerY, F = H, Y = u.x, et = u.y, K = u.endX, ft = u.endY, Tt = u.endRotation, Pt = lt, yt, dt, Mt, ct, we, Gt;
      u.pointerX = v, u.pointerY = $, k && (v -= Xs(V), $ -= Ks(V)), a ? (ct = Math.atan2(Ct.y - $, v - Ct.x) * wh, we = u.y - ct, we > 180 ? (H -= 360, u.y = ct) : we < -180 && (H += 360, u.y = ct), u.x !== q || Math.max(Math.abs(Q - v), Math.abs(it - $)) > d ? (u.y = ct, Mt = q + (H - ct) * M) : Mt = q) : (ut && (Gt = v * ut.a + $ * ut.c + ut.e, $ = v * ut.b + $ * ut.d + ut.f, v = Gt), dt = $ - it, yt = v - Q, dt < d && dt > -d && (dt = 0), yt < d && yt > -d && (yt = 0), (u.lockAxis || u.lockedAxis) && (yt || dt) && (Gt = u.lockedAxis, Gt || (u.lockedAxis = Gt = h && Math.abs(yt) > Math.abs(dt) ? "y" : f ? "x" : null, Gt && On(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, u.pointerEvent)), Gt === "y" ? dt = 0 : Gt === "x" && (yt = 0)), Mt = Sn(q + yt * M), ct = Sn(H + dt * M)), (se || Bt || Ut) && (u.x !== Mt || u.y !== ct && !a) && (Ut && (Cs.x = Mt, Cs.y = ct, Gt = Ut(Cs), Mt = Sn(Gt.x), ct = Sn(Gt.y)), se && (Mt = Sn(se(Mt))), Bt && (ct = Sn(Bt(ct)))), tt && (Mt > G ? Mt = G + Math.round((Mt - G) * N) : Mt < nt && (Mt = nt + Math.round((Mt - nt) * N)), a || (ct > U ? ct = Math.round(U + (ct - U) * N) : ct < rt && (ct = Math.round(rt + (ct - rt) * N)))), (u.x !== Mt || u.y !== ct && !a) && (a ? (u.endRotation = u.x = u.endX = Mt, lt = !0) : (f && (u.y = u.endY = ct, lt = !0), h && (u.x = u.endX = Mt, lt = !0)), !E || ae(u, "move", "onMove") !== !1 ? !u.isDragging && u.isPressed && (u.isDragging = Xe = !0, ae(u, "dragstart", "onDragStart")) : (u.pointerX = D, u.pointerY = W, H = F, u.x = Y, u.y = et, u.endX = K, u.endY = ft, u.endRotation = Tt, lt = Pt));
    }, Nt = function j(v, $) {
      if (!z || !u.isPressed || v && mt != null && !$ && (v.pointerId && v.pointerId !== mt && v.target !== e || v.changedTouches && !m_(v.changedTouches, mt))) {
        $t && v && z && Ci(v);
        return;
      }
      u.isPressed = !1;
      var E = v, M = u.isDragging, N = u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2), D = Et.delayedCall(1e-3, Si), W, F, Y, et, K;
      if (gt ? (pe(gt, "touchend", j), pe(gt, "touchmove", at), pe(gt, "touchcancel", j), pe(V, "touchstart", Eh)) : pe(V, "mousemove", at), pe(Wt, "touchforcechange", Ci), (!aa || !gt) && (pe(V, "mouseup", j), v && v.target && pe(v.target, "mouseup", j)), lt = !1, M && (_ = bh = En(), u.isDragging = !1), Sh(re), pt && !N) {
        v && (pe(v.target, "change", j), u.pointerEvent = E), Bo(g, !1), ae(u, "release", "onRelease"), ae(u, "click", "onClick"), pt = !1;
        return;
      }
      for (F = g.length; --F > -1; )
        _l(g[F], "cursor", i.cursor || (i.cursor !== !1 ? Or : null));
      if (Aa--, v) {
        if (W = v.changedTouches, W && (v = W[0], v !== Lt && v.identifier !== mt)) {
          for (F = W.length; --F > -1 && (v = W[F]).identifier !== mt && v.target !== e; )
            ;
          if (F < 0 && !$)
            return;
        }
        u.pointerEvent = E, u.pointerX = v.pageX, u.pointerY = v.pageY;
      }
      return N && E ? (Ci(E), $t = !0, ae(u, "release", "onRelease")) : E && !M ? ($t = !1, Ce && (i.snap || i.bounds) && Xi(i.inertia || i.throwProps), ae(u, "release", "onRelease"), (!Pr || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (ae(u, "click", "onClick"), En() - P < 300 && ae(u, "doubleclick", "onDoubleClick"), et = E.target || e, P = En(), K = function() {
        P !== Ie && u.enabled() && !u.isPressed && !E.defaultPrevented && (et.click ? et.click() : V.createEvent && (Y = V.createEvent("MouseEvents"), Y.initMouseEvent("click", !0, !0, Wt, 1, u.pointerEvent.screenX, u.pointerEvent.screenY, u.pointerX, u.pointerY, !1, !1, !1, !1, 0, null), et.dispatchEvent(Y)));
      }, !Pr && !E.defaultPrevented && Et.delayedCall(0.05, K))) : (Xi(i.inertia || i.throwProps), !u.allowEventDefault && E && (i.dragClickables !== !1 || !O.call(u, E.target)) && M && (!I || Vt && I === Vt) && E.cancelable !== !1 ? ($t = !0, Ci(E)) : $t = !1, ae(u, "release", "onRelease")), Le() && D.duration(u.tween.duration()), M && ae(u, "dragend", "onDragEnd"), !0;
    }, Pe = function(v) {
      if (v && u.isDragging && !B) {
        var $ = v.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, M = $.scrollTop - $._gsScrollY;
        (E || M) && (ut ? (Q -= E * ut.a + M * ut.c, it -= M * ut.d + E * ut.b) : (Q -= E, it -= M), $._gsScrollX += E, $._gsScrollY += M, $e(u.pointerX, u.pointerY));
      }
    }, ie = function(v) {
      var $ = En(), E = $ - P < 100, M = $ - _ < 50, N = E && Ie === P, D = u.pointerEvent && u.pointerEvent.defaultPrevented, W = E && Ft === P, F = v.isTrusted || v.isTrusted == null && E && N;
      if ((N || M && u.vars.suppressClickOnDrag !== !1) && v.stopImmediatePropagation && v.stopImmediatePropagation(), E && !(u.pointerEvent && u.pointerEvent.defaultPrevented) && (!N || F && !W)) {
        F && N && (Ft = P), Ie = P;
        return;
      }
      (u.isPressed || M || E) && (!F || !v.detail || !E || D) && Ci(v), !E && !M && !Xe && (v && v.target && (u.pointerEvent = v), ae(u, "click", "onClick"));
    }, Ei = function(v) {
      return ut ? {
        x: v.x * ut.a + v.y * ut.c + ut.e,
        y: v.x * ut.b + v.y * ut.d + ut.f
      } : {
        x: v.x,
        y: v.y
      };
    };
    return zt = t.get(e), zt && zt.kill(), n.startDrag = function(j, v) {
      var $, E, M, N;
      Ne(j || u.pointerEvent, !0), v && !u.hitTest(j || u.pointerEvent) && ($ = Ps(j || u.pointerEvent), E = Ps(e), M = Ei({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), N = Ei({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), Q -= M.x - N.x, it -= M.y - N.y), u.isDragging || (u.isDragging = Xe = !0, ae(u, "dragstart", "onDragStart"));
    }, n.drag = at, n.endDrag = function(j) {
      return Nt(j || u.pointerEvent, !0);
    }, n.timeSinceDrag = function() {
      return u.isDragging ? 0 : (En() - _) / 1e3;
    }, n.timeSinceClick = function() {
      return (En() - P) / 1e3;
    }, n.hitTest = function(j, v) {
      return t.hitTest(u.target, j, v);
    }, n.getDirection = function(j, v) {
      var $ = j === "velocity" && $i ? j : Hr(j) && !a ? "element" : "start", E, M, N, D, W, F;
      return $ === "element" && (W = Ps(u.target), F = Ps(j)), E = $ === "start" ? u.x - q : $ === "velocity" ? $i.getVelocity(e, l) : W.left + W.width / 2 - (F.left + F.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (v = v || 2, M = $ === "start" ? u.y - H : $ === "velocity" ? $i.getVelocity(e, c) : W.top + W.height / 2 - (F.top + F.height / 2), N = Math.abs(E / M), D = N < 1 / v ? "" : E < 0 ? "left" : "right", N < v && (D !== "" && (D += "-"), D += M < 0 ? "up" : "down"), D);
    }, n.applyBounds = function(j, v) {
      var $, E, M, N, D, W;
      if (j && i.bounds !== j)
        return i.bounds = j, u.update(!0, v);
      if (kt(!0), Fe(), tt && !Le()) {
        if ($ = u.x, E = u.y, $ > G ? $ = G : $ < nt && ($ = nt), E > U ? E = U : E < rt && (E = rt), (u.x !== $ || u.y !== E) && (M = !0, u.x = u.endX = $, a ? u.endRotation = $ : u.y = u.endY = E, lt = !0, re(!0), u.autoScroll && !u.isDragging))
          for (ml(e.parentNode), N = e, hn.scrollTop = Wt.pageYOffset != null ? Wt.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Wt.pageXOffset != null ? Wt.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft; N && !W; )
            W = ar(N.parentNode), D = W ? hn : N.parentNode, f && D.scrollTop > D._gsMaxScrollY && (D.scrollTop = D._gsMaxScrollY), h && D.scrollLeft > D._gsMaxScrollX && (D.scrollLeft = D._gsMaxScrollX), N = D;
        u.isThrowing && (M || u.endX > G || u.endX < nt || u.endY > U || u.endY < rt) && Xi(i.inertia || i.throwProps, M);
      }
      return u;
    }, n.update = function(j, v, $) {
      if (v && u.isPressed) {
        var E = es(e), M = ce.apply({
          x: u.x - q,
          y: u.y - H
        }), N = es(e.parentNode, !0);
        N.apply({
          x: E.e - M.x,
          y: E.f - M.y
        }, M), u.x -= M.x - N.e, u.y -= M.y - N.f, re(!0), ve();
      }
      var D = u.x, W = u.y;
      return si(!v), j ? u.applyBounds() : (lt && $ && re(!0), kt(!0)), v && ($e(u.pointerX, u.pointerY), lt && re(!0)), u.isPressed && !v && (h && Math.abs(D - u.x) > 0.01 || f && Math.abs(W - u.y) > 0.01 && !a) && ve(), u.autoScroll && (ml(e.parentNode, u.isDragging), w = u.isDragging, re(!0), Ch(e, Pe), Ah(e, Pe)), u;
    }, n.enable = function(j) {
      var v = {
        lazy: !0
      }, $, E, M;
      if (i.cursor !== !1 && (v.cursor = i.cursor || Or), Et.utils.checkPrefix("touchCallout") && (v.touchCallout = "none"), j !== "soft") {
        for (xh(g, h === f ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), E = g.length; --E > -1; )
          M = g[E], aa || Se(M, "mousedown", Ne), Se(M, "touchstart", Ne), Se(M, "click", ie, !0), Et.set(M, v), M.getBBox && M.ownerSVGElement && h !== f && Et.set(M.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Se(M, "contextmenu", Xt);
        Bo(g, !1);
      }
      return Ah(e, Pe), z = !0, $i && j !== "soft" && $i.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + h_++, Us[$] = u, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && ve(), i.bounds && u.applyBounds(), u;
    }, n.disable = function(j) {
      for (var v = u.isDragging, $ = g.length, E; --$ > -1; )
        _l(g[$], "cursor", null);
      if (j !== "soft") {
        for (xh(g, null), $ = g.length; --$ > -1; )
          E = g[$], _l(E, "touchCallout", null), pe(E, "mousedown", Ne), pe(E, "touchstart", Ne), pe(E, "click", ie, !0), pe(E, "contextmenu", Xt);
        Bo(g, !0), gt && (pe(gt, "touchcancel", Nt), pe(gt, "touchend", Nt), pe(gt, "touchmove", at)), pe(V, "mouseup", Nt), pe(V, "mousemove", at);
      }
      return Ch(e, Pe), z = !1, $i && j !== "soft" && ($i.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), u.tween && u.tween.kill()), B && B.disable(), Sh(re), u.isDragging = u.isPressed = pt = !1, v && ae(u, "dragend", "onDragEnd"), u;
    }, n.enabled = function(j, v) {
      return arguments.length ? j ? u.enable(v) : u.disable(v) : z;
    }, n.kill = function() {
      return u.isThrowing = !1, u.tween && u.tween.kill(), u.disable(), Et.set(g, {
        clearProps: "userSelect"
      }), delete Us[e._gsDragID], u;
    }, n.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~r.indexOf("scroll") && (B = n.scrollProxy = new b_(e, d_({
      onKill: function() {
        u.isPressed && Nt(null);
      }
    }, i)), e.style.overflowY = f && !Ql ? "auto" : "hidden", e.style.overflowX = h && !Ql ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (h && (p[l] = 1), f && (p[c] = 1)), S.force3D = "force3D" in i ? i.force3D : !0, jd(vh(n)), n.enable(), n;
  }
  return t.register = function(i) {
    Et = i, vl();
  }, t.create = function(i, n) {
    return Zl || vl(!0), Dn(i).map(function(r) {
      return new t(r, n);
    });
  }, t.get = function(i) {
    return Us[(Dn(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (En() - bh) / 1e3;
  }, t.hitTest = function(i, n, r) {
    if (i === n)
      return !1;
    var o = Ps(i), a = Ps(n), l = o.top, c = o.left, h = o.right, f = o.bottom, d = o.width, u = o.height, g = a.left > h || a.right < c || a.top > f || a.bottom < l, p, _, w;
    return g || !r ? !g : (w = (r + "").indexOf("%") !== -1, r = parseFloat(r) || 0, p = {
      left: Math.max(c, a.left),
      top: Math.max(l, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(f, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : w ? (r *= 0.01, _ = p.width * p.height, _ >= d * u * r || _ >= a.width * a.height * r) : p.width > r && p.height > r);
  }, t;
}(x_);
g_(qa.prototype, {
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
Qd() && Et.registerPlugin(qa);
function T_(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function S_(s, t, e) {
  return t && T_(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Re, ua, yi, Ln, Rn, Gs, ip, Jn, Yr, np, yn, Bi, sp, rp = function() {
  return Re || typeof window < "u" && (Re = window.gsap) && Re.registerPlugin && Re;
}, op = 1, Ns = [], bt = [], sn = [], qr = Date.now, iu = function(t, e) {
  return e;
}, E_ = function() {
  var t = Yr.core, e = t.bridge || {}, i = t._scrollers, n = t._proxies;
  i.push.apply(i, bt), n.push.apply(n, sn), bt = i, sn = n, iu = function(o, a) {
    return e[o](a);
  };
}, Nn = function(t, e) {
  return ~sn.indexOf(t) && sn[sn.indexOf(t) + 1][e];
}, Ur = function(t) {
  return !!~np.indexOf(t);
}, Ze = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: n !== !1,
    capture: !!r
  });
}, je = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Vo = "scrollLeft", Ho = "scrollTop", nu = function() {
  return yn && yn.isPressed || bt.cache++;
}, Ca = function(t, e) {
  var i = function n(r) {
    if (r || r === 0) {
      op && (yi.history.scrollRestoration = "manual");
      var o = yn && yn.isPressed;
      r = n.v = Math.round(r) || (yn && yn.iOS ? 1 : 0), t(r), n.cacheID = bt.cache, o && iu("ss", r);
    } else (e || bt.cache !== n.cacheID || iu("ref")) && (n.cacheID = bt.cache, n.v = t());
    return n.v + n.offset;
  };
  return i.offset = 0, t && i;
}, ii = {
  s: Vo,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Ca(function(s) {
    return arguments.length ? yi.scrollTo(s, Ae.sc()) : yi.pageXOffset || Ln[Vo] || Rn[Vo] || Gs[Vo] || 0;
  })
}, Ae = {
  s: Ho,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ii,
  sc: Ca(function(s) {
    return arguments.length ? yi.scrollTo(ii.sc(), s) : yi.pageYOffset || Ln[Ho] || Rn[Ho] || Gs[Ho] || 0;
  })
}, ri = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Re.utils.toArray)(t)[0] || (typeof t == "string" && Re.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, A_ = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Wn = function(t, e) {
  var i = e.s, n = e.sc;
  Ur(t) && (t = Ln.scrollingElement || Rn);
  var r = bt.indexOf(t), o = n === Ae.sc ? 1 : 2;
  !~r && (r = bt.push(t) - 1), bt[r + o] || Ze(t, "scroll", nu);
  var a = bt[r + o], l = a || (bt[r + o] = Ca(Nn(t, i), !0) || (Ur(t) ? n : Ca(function(c) {
    return arguments.length ? t[i] = c : t[i];
  })));
  return l.target = t, a || (l.smooth = Re.getProperty(t, "scrollBehavior") === "smooth"), l;
}, su = function(t, e, i) {
  var n = t, r = t, o = qr(), a = o, l = e || 50, c = Math.max(500, l * 3), h = function(g, p) {
    var _ = qr();
    p || _ - o > l ? (r = n, n = g, a = o, o = _) : i ? n += g : n = r + (g - r) / (_ - a) * (o - a);
  }, f = function() {
    r = n = i ? 0 : n, a = o = 0;
  }, d = function(g) {
    var p = a, _ = r, w = qr();
    return (g || g === 0) && g !== n && h(g), o === a || w - a > c ? 0 : (n + (i ? _ : -_)) / ((i ? w : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: f,
    getVelocity: d
  };
}, yr = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, kh = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, ap = function() {
  Yr = Re.core.globals().ScrollTrigger, Yr && Yr.core && E_();
}, lp = function(t) {
  return Re = t || rp(), !ua && Re && typeof document < "u" && document.body && (yi = window, Ln = document, Rn = Ln.documentElement, Gs = Ln.body, np = [yi, Ln, Rn, Gs], Re.utils.clamp, sp = Re.core.context || function() {
  }, Jn = "onpointerenter" in Gs ? "pointer" : "mouse", ip = ue.isTouch = yi.matchMedia && yi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in yi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Bi = ue.eventTypes = ("ontouchstart" in Rn ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rn ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return op = 0;
  }, 500), ap(), ua = 1), ua;
};
ii.op = Ae;
bt.cache = 0;
var ue = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    ua || lp(Re) || console.warn("Please gsap.registerPlugin(Observer)"), Yr || ap();
    var n = i.tolerance, r = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, c = i.debounce, h = i.preventDefault, f = i.onStop, d = i.onStopDelay, u = i.ignore, g = i.wheelSpeed, p = i.event, _ = i.onDragStart, w = i.onDragEnd, A = i.onDrag, C = i.onPress, T = i.onRelease, y = i.onRight, O = i.onLeft, P = i.onUp, S = i.onDown, k = i.onChangeX, R = i.onChangeY, V = i.onChange, z = i.onToggleX, B = i.onToggleY, Q = i.onHover, it = i.onHoverEnd, q = i.onMove, H = i.ignoreCheck, tt = i.isNormalizer, ot = i.onGestureStart, b = i.onGestureEnd, G = i.onWheel, nt = i.onEnable, U = i.onDisable, rt = i.onClick, Lt = i.scrollSpeed, mt = i.capture, Ct = i.allowClicks, lt = i.lockAxis, zt = i.onLockAxis;
    this.target = a = ri(a) || Rn, this.vars = i, u && (u = Re.utils.toArray(u)), n = n || 1e-9, r = r || 0, g = g || 1, Lt = Lt || 1, o = o || "wheel,touch,pointer", c = c !== !1, l || (l = parseFloat(yi.getComputedStyle(Gs).lineHeight) || 22);
    var se, Bt, Ut, pt, gt, ut, Ce, I = this, Vt = 0, Ke = 0, Ie = i.passive || !h && i.passive !== !1, Ft = Wn(a, ii), $t = Wn(a, Ae), ce = Ft(), Xe = $t(), Xt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Bi[0] === "pointerdown", re = Ur(a), kt = a.ownerDocument || Ln, he = [0, 0, 0], De = [0, 0, 0], Fe = 0, Ki = function() {
      return Fe = qr();
    }, Kt = function(M, N) {
      return (I.event = M) && u && A_(M.target, u) || N && Xt && M.pointerType !== "touch" || H && H(M, N);
    }, Xi = function() {
      I._vx.reset(), I._vy.reset(), Bt.pause(), f && f(I);
    }, si = function() {
      var M = I.deltaX = kh(he), N = I.deltaY = kh(De), D = Math.abs(M) >= n, W = Math.abs(N) >= n;
      V && (D || W) && V(I, M, N, he, De), D && (y && I.deltaX > 0 && y(I), O && I.deltaX < 0 && O(I), k && k(I), z && I.deltaX < 0 != Vt < 0 && z(I), Vt = I.deltaX, he[0] = he[1] = he[2] = 0), W && (S && I.deltaY > 0 && S(I), P && I.deltaY < 0 && P(I), R && R(I), B && I.deltaY < 0 != Ke < 0 && B(I), Ke = I.deltaY, De[0] = De[1] = De[2] = 0), (pt || Ut) && (q && q(I), Ut && (_ && Ut === 1 && _(I), A && A(I), Ut = 0), pt = !1), ut && !(ut = !1) && zt && zt(I), gt && (G(I), gt = !1), se = 0;
    }, ve = function(M, N, D) {
      he[D] += M, De[D] += N, I._vx.update(M), I._vy.update(N), c ? se || (se = requestAnimationFrame(si)) : si();
    }, Le = function(M, N) {
      lt && !Ce && (I.axis = Ce = Math.abs(M) > Math.abs(N) ? "x" : "y", ut = !0), Ce !== "y" && (he[2] += M, I._vx.update(M, !0)), Ce !== "x" && (De[2] += N, I._vy.update(N, !0)), c ? se || (se = requestAnimationFrame(si)) : si();
    }, Si = function(M) {
      if (!Kt(M, 1)) {
        M = yr(M, h);
        var N = M.clientX, D = M.clientY, W = N - I.x, F = D - I.y, Y = I.isDragging;
        I.x = N, I.y = D, (Y || (W || F) && (Math.abs(I.startX - N) >= r || Math.abs(I.startY - D) >= r)) && (Ut = Y ? 2 : 1, Y || (I.isDragging = !0), Le(W, F));
      }
    }, Ne = I.onPress = function(E) {
      Kt(E, 1) || E && E.button || (I.axis = Ce = null, Bt.pause(), I.isPressed = !0, E = yr(E), Vt = Ke = 0, I.startX = I.x = E.clientX, I.startY = I.y = E.clientY, I._vx.reset(), I._vy.reset(), Ze(tt ? a : kt, Bi[1], Si, Ie, !0), I.deltaX = I.deltaY = 0, C && C(I));
    }, at = I.onRelease = function(E) {
      if (!Kt(E, 1)) {
        je(tt ? a : kt, Bi[1], Si, !0);
        var M = !isNaN(I.y - I.startY), N = I.isDragging, D = N && (Math.abs(I.x - I.startX) > 3 || Math.abs(I.y - I.startY) > 3), W = yr(E);
        !D && M && (I._vx.reset(), I._vy.reset(), h && Ct && Re.delayedCall(0.08, function() {
          if (qr() - Fe > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (kt.createEvent) {
              var F = kt.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, yi, 1, W.screenX, W.screenY, W.clientX, W.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(F);
            }
          }
        })), I.isDragging = I.isGesturing = I.isPressed = !1, f && N && !tt && Bt.restart(!0), Ut && si(), w && N && w(I), T && T(I, D);
      }
    }, $e = function(M) {
      return M.touches && M.touches.length > 1 && (I.isGesturing = !0) && ot(M, I.isDragging);
    }, Nt = function() {
      return (I.isGesturing = !1) || b(I);
    }, Pe = function(M) {
      if (!Kt(M)) {
        var N = Ft(), D = $t();
        ve((N - ce) * Lt, (D - Xe) * Lt, 1), ce = N, Xe = D, f && Bt.restart(!0);
      }
    }, ie = function(M) {
      if (!Kt(M)) {
        M = yr(M, h), G && (gt = !0);
        var N = (M.deltaMode === 1 ? l : M.deltaMode === 2 ? yi.innerHeight : 1) * g;
        ve(M.deltaX * N, M.deltaY * N, 0), f && !tt && Bt.restart(!0);
      }
    }, Ei = function(M) {
      if (!Kt(M)) {
        var N = M.clientX, D = M.clientY, W = N - I.x, F = D - I.y;
        I.x = N, I.y = D, pt = !0, f && Bt.restart(!0), (W || F) && Le(W, F);
      }
    }, j = function(M) {
      I.event = M, Q(I);
    }, v = function(M) {
      I.event = M, it(I);
    }, $ = function(M) {
      return Kt(M) || yr(M, h) && rt(I);
    };
    Bt = I._dc = Re.delayedCall(d || 0.25, Xi).pause(), I.deltaX = I.deltaY = 0, I._vx = su(0, 50, !0), I._vy = su(0, 50, !0), I.scrollX = Ft, I.scrollY = $t, I.isDragging = I.isGesturing = I.isPressed = !1, sp(this), I.enable = function(E) {
      return I.isEnabled || (Ze(re ? kt : a, "scroll", nu), o.indexOf("scroll") >= 0 && Ze(re ? kt : a, "scroll", Pe, Ie, mt), o.indexOf("wheel") >= 0 && Ze(a, "wheel", ie, Ie, mt), (o.indexOf("touch") >= 0 && ip || o.indexOf("pointer") >= 0) && (Ze(a, Bi[0], Ne, Ie, mt), Ze(kt, Bi[2], at), Ze(kt, Bi[3], at), Ct && Ze(a, "click", Ki, !0, !0), rt && Ze(a, "click", $), ot && Ze(kt, "gesturestart", $e), b && Ze(kt, "gestureend", Nt), Q && Ze(a, Jn + "enter", j), it && Ze(a, Jn + "leave", v), q && Ze(a, Jn + "move", Ei)), I.isEnabled = !0, I.isDragging = I.isGesturing = I.isPressed = pt = Ut = !1, I._vx.reset(), I._vy.reset(), ce = Ft(), Xe = $t(), E && E.type && Ne(E), nt && nt(I)), I;
    }, I.disable = function() {
      I.isEnabled && (Ns.filter(function(E) {
        return E !== I && Ur(E.target);
      }).length || je(re ? kt : a, "scroll", nu), I.isPressed && (I._vx.reset(), I._vy.reset(), je(tt ? a : kt, Bi[1], Si, !0)), je(re ? kt : a, "scroll", Pe, mt), je(a, "wheel", ie, mt), je(a, Bi[0], Ne, mt), je(kt, Bi[2], at), je(kt, Bi[3], at), je(a, "click", Ki, !0), je(a, "click", $), je(kt, "gesturestart", $e), je(kt, "gestureend", Nt), je(a, Jn + "enter", j), je(a, Jn + "leave", v), je(a, Jn + "move", Ei), I.isEnabled = I.isPressed = I.isDragging = !1, U && U(I));
    }, I.kill = I.revert = function() {
      I.disable();
      var E = Ns.indexOf(I);
      E >= 0 && Ns.splice(E, 1), yn === I && (yn = 0);
    }, Ns.push(I), tt && Ur(a) && (yn = I), I.enable(p);
  }, S_(s, [{
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
ue.register = lp;
ue.getAll = function() {
  return Ns.slice();
};
ue.getById = function(s) {
  return Ns.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
rp() && Re.registerPlugin(ue);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var We, up, vn, tn, $n, cp, js, Wo, hp = function() {
  return typeof window < "u";
}, fp = function() {
  return We || hp() && (We = window.gsap) && We.registerPlugin && We;
}, dp = function(t) {
  return typeof t == "string";
}, Mh = function(t) {
  return typeof t == "function";
}, po = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return t === vn || t === tn || t === $n ? Math.max(tn[n], $n[n]) - (vn["inner" + i] || tn[r] || $n[r]) : t[n] - t["offset" + i];
}, go = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === vn && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = tn[i] != null ? tn : $n), function() {
    return t[i];
  };
}, C_ = function(t, e, i, n) {
  if (Mh(t) && (t = t(e, i, n)), typeof t != "object")
    return dp(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
}, pp = function(t, e) {
  if (t = cp(t)[0], !t || !t.getBoundingClientRect)
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
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : dp(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? po(e, i) - r : Math.min(po(e, i), pp(t, e)[i] - r);
}, ru = function() {
  We = fp(), hp() && We && typeof document < "u" && document.body && (vn = window, $n = document.body, tn = document.documentElement, cp = We.utils.toArray, We.config({
    autoKillThreshold: 7
  }), js = We.config(), up = 1);
}, ur = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    We = t, ru();
  },
  init: function(t, e, i, n, r) {
    up || ru();
    var o = this, a = We.getProperty(t, "scrollSnapType");
    o.isWin = t === vn, o.target = t, o.tween = i, e = C_(e, n, t, r), o.vars = e, o.autoKill = !!("autoKill" in e ? e : js).autoKill, o.getX = go(t, "x"), o.getY = go(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), Wo || (Wo = We.core.globals().ScrollTrigger), We.getProperty(t, "scrollBehavior") === "smooth" && We.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, Ih(e.x, t, "x", o.x, e.offsetX || 0), n, r), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, Ih(e.y, t, "y", o.y, e.offsetY || 0), n, r), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, n = e.target, r = e.tween, o = e.autoKill, a = e.xPrev, l = e.yPrev, c = e.isWin, h = e.snap, f = e.snapInline, d, u, g, p, _; i; )
      i.r(t, i.d), i = i._next;
    d = c || !e.skipX ? e.getX() : a, u = c || !e.skipY ? e.getY() : l, g = u - l, p = d - a, _ = js.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > _ || p < -_) && d < po(n, "x") && (e.skipX = 1), !e.skipY && (g > _ || g < -_) && u < po(n, "y") && (e.skipY = 1), e.skipX && e.skipY && (r.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(r, e.vars.onAutoKillParams || []))), c ? vn.scrollTo(e.skipX ? d : e.x, e.skipY ? u : e.y) : (e.skipY || (n.scrollTop = e.y), e.skipX || (n.scrollLeft = e.x)), h && (t === 1 || t === 0) && (u = n.scrollTop, d = n.scrollLeft, f ? n.style.scrollSnapType = f : n.style.removeProperty("scroll-snap-type"), n.scrollTop = u + 1, n.scrollLeft = d + 1, n.scrollTop = u, n.scrollLeft = d), e.xPrev = e.x, e.yPrev = e.y, Wo && Wo.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
ur.max = po;
ur.getOffset = pp;
ur.buildGetter = go;
ur.config = function(s) {
  js || ru() || (js = We.config());
  for (var t in s)
    js[t] = s[t];
};
fp() && We.registerPlugin(ur);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var X, Ds, wt, Yt, gi, Rt, hc, Pa, mo, Kr, kr, Yo, Be, Ua, ou, Je, Dh, Lh, Ls, gp, wl, mp, Qe, au, _p, yp, An, lu, fc, Zs, dc, Oa, uu, bl, qo = 1, Ve = Date.now, xl = Ve(), Ri = 0, Mr = 0, Rh = function(t, e, i) {
  var n = di(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t;
}, zh = function(t, e) {
  return e && (!di(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, P_ = function s() {
  return Mr && requestAnimationFrame(s);
}, Fh = function() {
  return Ua = 1;
}, Nh = function() {
  return Ua = 0;
}, ji = function(t) {
  return t;
}, Ir = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, vp = function() {
  return typeof window < "u";
}, wp = function() {
  return X || vp() && (X = window.gsap) && X.registerPlugin && X;
}, vs = function(t) {
  return !!~hc.indexOf(t);
}, bp = function(t) {
  return (t === "Height" ? dc : wt["inner" + t]) || gi["client" + t] || Rt["client" + t];
}, xp = function(t) {
  return Nn(t, "getBoundingClientRect") || (vs(t) ? function() {
    return pa.width = wt.innerWidth, pa.height = dc, pa;
  } : function() {
    return gn(t);
  });
}, O_ = function(t, e, i) {
  var n = i.d, r = i.d2, o = i.a;
  return (o = Nn(t, "getBoundingClientRect")) ? function() {
    return o()[n];
  } : function() {
    return (e ? bp(r) : t["client" + r]) || 0;
  };
}, k_ = function(t, e) {
  return !e || ~sn.indexOf(t) ? xp(t) : function() {
    return pa;
  };
}, en = function(t, e) {
  var i = e.s, n = e.d2, r = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + n) && (o = Nn(t, i)) ? o() - xp(t)()[r] : vs(t) ? (gi[i] || Rt[i]) - bp(n) : t[i] - t["offset" + n]);
}, Uo = function(t, e) {
  for (var i = 0; i < Ls.length; i += 3)
    (!e || ~e.indexOf(Ls[i + 1])) && t(Ls[i], Ls[i + 1], Ls[i + 2]);
}, di = function(t) {
  return typeof t == "string";
}, Ye = function(t) {
  return typeof t == "function";
}, Dr = function(t) {
  return typeof t == "number";
}, ts = function(t) {
  return typeof t == "object";
}, vr = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, Tl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, Os = Math.abs, Tp = "left", Sp = "top", pc = "right", gc = "bottom", fs = "width", ds = "height", Xr = "Right", Gr = "Left", jr = "Top", Zr = "Bottom", ge = "padding", ki = "margin", lr = "Width", mc = "Height", Te = "px", Mi = function(t) {
  return wt.getComputedStyle(t);
}, M_ = function(t) {
  var e = Mi(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, $h = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, gn = function(t, e) {
  var i = e && Mi(t)[ou] !== "matrix(1, 0, 0, 1, 0, 0)" && X.to(t, {
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
}, ka = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, Ep = function(t) {
  var e = [], i = t.labels, n = t.duration(), r;
  for (r in i)
    e.push(i[r] / n);
  return e;
}, I_ = function(t) {
  return function(e) {
    return X.utils.snap(Ep(t), e);
  };
}, _c = function(t) {
  var e = X.utils.snap(t), i = Array.isArray(t) && t.slice(0).sort(function(n, r) {
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
}, D_ = function(t) {
  return function(e, i) {
    return _c(Ep(t))(e, i.direction);
  };
}, Ko = function(t, e, i, n) {
  return i.split(",").forEach(function(r) {
    return t(e, r, n);
  });
}, ke = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: !n,
    capture: !!r
  });
}, Oe = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Xo = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Bh = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Go = {
  toggleActions: "play",
  anticipatePin: 0
}, Ma = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, ca = function(t, e) {
  if (di(t)) {
    var i = t.indexOf("="), n = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (n *= e / 100), t = t.substr(0, i - 1)), t = n + (t in Ma ? Ma[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, jo = function(t, e, i, n, r, o, a, l) {
  var c = r.startColor, h = r.endColor, f = r.fontSize, d = r.indent, u = r.fontWeight, g = Yt.createElement("div"), p = vs(i) || Nn(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, w = p ? Rt : i, A = t.indexOf("start") !== -1, C = A ? c : h, T = "border-color:" + C + ";font-size:" + f + ";color:" + C + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((_ || l) && p ? "fixed;" : "absolute;"), (_ || l || !p) && (T += (n === Ae ? pc : gc) + ":" + (o + parseFloat(d)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = A, g.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), g.style.cssText = T, g.innerText = e || e === 0 ? t + "-" + e : t, w.children[0] ? w.insertBefore(g, w.children[0]) : w.appendChild(g), g._offset = g["offset" + n.op.d2], ha(g, 0, n, A), g;
}, ha = function(t, e, i, n) {
  var r = {
    display: "block"
  }, o = i[n ? "os2" : "p2"], a = i[n ? "p2" : "os2"];
  t._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? "1px" : 0, r["border" + o + lr] = 1, r["border" + a + lr] = 0, r[i.p] = e + "px", X.set(t, r);
}, vt = [], cu = {}, _o, Vh = function() {
  return Ve() - Ri > 34 && (_o || (_o = requestAnimationFrame(wn)));
}, ks = function() {
  (!Qe || !Qe.isPressed || Qe.startX > Rt.clientWidth) && (bt.cache++, Qe ? _o || (_o = requestAnimationFrame(wn)) : wn(), Ri || bs("scrollStart"), Ri = Ve());
}, Sl = function() {
  yp = wt.innerWidth, _p = wt.innerHeight;
}, Lr = function(t) {
  bt.cache++, (t === !0 || !Be && !mp && !Yt.fullscreenElement && !Yt.webkitFullscreenElement && (!au || yp !== wt.innerWidth || Math.abs(wt.innerHeight - _p) > wt.innerHeight * 0.25)) && Pa.restart(!0);
}, ws = {}, L_ = [], Ap = function s() {
  return Oe(xt, "scrollEnd", s) || ns(!0);
}, bs = function(t) {
  return ws[t] && ws[t].map(function(e) {
    return e();
  }) || L_;
}, fi = [], Cp = function(t) {
  for (var e = 0; e < fi.length; e += 5)
    (!t || fi[e + 4] && fi[e + 4].query === t) && (fi[e].style.cssText = fi[e + 1], fi[e].getBBox && fi[e].setAttribute("transform", fi[e + 2] || ""), fi[e + 3].uncache = 1);
}, yc = function(t, e) {
  var i;
  for (Je = 0; Je < vt.length; Je++)
    i = vt[Je], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  Oa = !0, e && Cp(e), e || bs("revert");
}, Pp = function(t, e) {
  bt.cache++, (e || !ti) && bt.forEach(function(i) {
    return Ye(i) && i.cacheID++ && (i.rec = 0);
  }), di(t) && (wt.history.scrollRestoration = fc = t);
}, ti, ps = 0, Hh, R_ = function() {
  if (Hh !== ps) {
    var t = Hh = ps;
    requestAnimationFrame(function() {
      return t === ps && ns(!0);
    });
  }
}, Op = function() {
  Rt.appendChild(Zs), dc = !Qe && Zs.offsetHeight || wt.innerHeight, Rt.removeChild(Zs);
}, Wh = function(t) {
  return mo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, ns = function(t, e) {
  if (gi = Yt.documentElement, Rt = Yt.body, hc = [wt, Yt, gi, Rt], Ri && !t && !Oa) {
    ke(xt, "scrollEnd", Ap);
    return;
  }
  Op(), ti = xt.isRefreshing = !0, bt.forEach(function(n) {
    return Ye(n) && ++n.cacheID && (n.rec = n());
  });
  var i = bs("refreshInit");
  gp && xt.sort(), e || yc(), bt.forEach(function(n) {
    Ye(n) && (n.smooth && (n.target.style.scrollBehavior = "auto"), n(0));
  }), vt.slice(0).forEach(function(n) {
    return n.refresh();
  }), Oa = !1, vt.forEach(function(n) {
    if (n._subPinOffset && n.pin) {
      var r = n.vars.horizontal ? "offsetWidth" : "offsetHeight", o = n.pin[r];
      n.revert(!0, 1), n.adjustPinSpacing(n.pin[r] - o), n.refresh();
    }
  }), uu = 1, Wh(!0), vt.forEach(function(n) {
    var r = en(n.scroller, n._dir), o = n.vars.end === "max" || n._endClamp && n.end > r, a = n._startClamp && n.start >= r;
    (o || a) && n.setPositions(a ? r - 1 : n.start, o ? Math.max(a ? r : n.start + 1, r) : n.end, !0);
  }), Wh(!1), uu = 0, i.forEach(function(n) {
    return n && n.render && n.render(-1);
  }), bt.forEach(function(n) {
    Ye(n) && (n.smooth && requestAnimationFrame(function() {
      return n.target.style.scrollBehavior = "smooth";
    }), n.rec && n(n.rec));
  }), Pp(fc, 1), Pa.pause(), ps++, ti = 2, wn(2), vt.forEach(function(n) {
    return Ye(n.vars.onRefresh) && n.vars.onRefresh(n);
  }), ti = xt.isRefreshing = !1, bs("refresh");
}, hu = 0, fa = 1, Qr, wn = function(t) {
  if (t === 2 || !ti && !Oa) {
    xt.isUpdating = !0, Qr && Qr.update(0);
    var e = vt.length, i = Ve(), n = i - xl >= 50, r = e && vt[0].scroll();
    if (fa = hu > r ? -1 : 1, ti || (hu = r), n && (Ri && !Ua && i - Ri > 200 && (Ri = 0, bs("scrollEnd")), kr = xl, xl = i), fa < 0) {
      for (Je = e; Je-- > 0; )
        vt[Je] && vt[Je].update(0, n);
      fa = 1;
    } else
      for (Je = 0; Je < e; Je++)
        vt[Je] && vt[Je].update(0, n);
    xt.isUpdating = !1;
  }
  _o = 0;
}, fu = [Tp, Sp, gc, pc, ki + Zr, ki + Xr, ki + jr, ki + Gr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], da = fu.concat([fs, ds, "boxSizing", "max" + lr, "max" + mc, "position", ki, ge, ge + jr, ge + Xr, ge + Zr, ge + Gr]), z_ = function(t, e, i) {
  Qs(i);
  var n = t._gsap;
  if (n.spacerIsNative)
    Qs(n.spacerState);
  else if (t._gsap.swappedIn) {
    var r = e.parentNode;
    r && (r.insertBefore(t, e), r.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, El = function(t, e, i, n) {
  if (!t._gsap.swappedIn) {
    for (var r = fu.length, o = e.style, a = t.style, l; r--; )
      l = fu[r], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[gc] = a[pc] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[fs] = ka(t, ii) + Te, o[ds] = ka(t, Ae) + Te, o[ge] = a[ki] = a[Sp] = a[Tp] = "0", Qs(n), a[fs] = a["max" + lr] = i[fs], a[ds] = a["max" + mc] = i[ds], a[ge] = i[ge], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, F_ = /([A-Z])/g, Qs = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, n = 0, r, o;
    for ((t.t._gsap || X.core.getCache(t.t)).uncache = 1; n < i; n += 2)
      o = t[n + 1], r = t[n], o ? e[r] = o : e[r] && e.removeProperty(r.replace(F_, "-$1").toLowerCase());
  }
}, Zo = function(t) {
  for (var e = da.length, i = t.style, n = [], r = 0; r < e; r++)
    n.push(da[r], i[da[r]]);
  return n.t = t, n;
}, N_ = function(t, e, i) {
  for (var n = [], r = t.length, o = i ? 8 : 0, a; o < r; o += 2)
    a = t[o], n.push(a, a in e ? e[a] : t[o + 1]);
  return n.t = t.t, n;
}, pa = {
  left: 0,
  top: 0
}, Yh = function(t, e, i, n, r, o, a, l, c, h, f, d, u, g) {
  Ye(t) && (t = t(l)), di(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? ca("0" + t.substr(3), i) : 0));
  var p = u ? u.time() : 0, _, w, A;
  if (u && u.seek(0), isNaN(t) || (t = +t), Dr(t))
    u && (t = X.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, d, t)), a && ha(a, i, n, !0);
  else {
    Ye(e) && (e = e(l));
    var C = (t || "0").split(" "), T, y, O, P;
    A = ri(e, l) || Rt, T = gn(A) || {}, (!T || !T.left && !T.top) && Mi(A).display === "none" && (P = A.style.display, A.style.display = "block", T = gn(A), P ? A.style.display = P : A.style.removeProperty("display")), y = ca(C[0], T[n.d]), O = ca(C[1] || "0", i), t = T[n.p] - c[n.p] - h + y + r - O, a && ha(a, O, n, i - O < 20 || a._isStart && O > 20), i -= i - O;
  }
  if (g && (l[g] = t || -1e-3, t < 0 && (t = 0)), o) {
    var S = t + i, k = o._isStart;
    _ = "scroll" + n.d2, ha(o, S, n, k && S > 20 || !k && (f ? Math.max(Rt[_], gi[_]) : o.parentNode[_]) <= S + 1), f && (c = gn(a), f && (o.style[n.op.p] = c[n.op.p] - n.op.m - o._offset + Te));
  }
  return u && A && (_ = gn(A), u.seek(d), w = gn(A), u._caScrollDist = _[n.p] - w[n.p], t = t / u._caScrollDist * d), u && u.seek(p), u ? t : Math.round(t);
}, $_ = /(webkit|moz|length|cssText|inset)/i, qh = function(t, e, i, n) {
  if (t.parentNode !== e) {
    var r = t.style, o, a;
    if (e === Rt) {
      t._stOrig = r.cssText, a = Mi(t);
      for (o in a)
        !+o && !$_.test(o) && a[o] && typeof r[o] == "string" && o !== "0" && (r[o] = a[o]);
      r.top = i, r.left = n;
    } else
      r.cssText = t._stOrig;
    X.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, kp = function(t, e, i) {
  var n = e, r = n;
  return function(o) {
    var a = Math.round(t());
    return a !== n && a !== r && Math.abs(a - n) > 3 && Math.abs(a - r) > 3 && (o = a, i && i()), r = n, n = Math.round(o), n;
  };
}, Qo = function(t, e, i) {
  var n = {};
  n[e.p] = "+=" + i, X.set(t, n);
}, Uh = function(t, e) {
  var i = Wn(t, e), n = "_scroll" + e.p2, r = function o(a, l, c, h, f) {
    var d = o.tween, u = l.onComplete, g = {};
    c = c || i();
    var p = kp(i, c, function() {
      d.kill(), o.tween = 0;
    });
    return f = h && f || 0, h = h || a - c, d && d.kill(), l[n] = a, l.inherit = !1, l.modifiers = g, g[n] = function() {
      return p(c + h * d.ratio + f * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      bt.cache++, o.tween && wn();
    }, l.onComplete = function() {
      o.tween = 0, u && u.call(d);
    }, d = o.tween = X.to(t, l), d;
  };
  return t[n] = i, i.wheelHandler = function() {
    return r.tween && r.tween.kill() && (r.tween = 0);
  }, ke(t, "wheel", i.wheelHandler), xt.isTouch && ke(t, "touchmove", i.wheelHandler), r;
}, xt = /* @__PURE__ */ function() {
  function s(e, i) {
    Ds || s.register(X) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), lu(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, n) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Mr) {
      this.update = this.refresh = this.kill = ji;
      return;
    }
    i = $h(di(i) || Dr(i) || i.nodeType ? {
      trigger: i
    } : i, Go);
    var r = i, o = r.onUpdate, a = r.toggleClass, l = r.id, c = r.onToggle, h = r.onRefresh, f = r.scrub, d = r.trigger, u = r.pin, g = r.pinSpacing, p = r.invalidateOnRefresh, _ = r.anticipatePin, w = r.onScrubComplete, A = r.onSnapComplete, C = r.once, T = r.snap, y = r.pinReparent, O = r.pinSpacer, P = r.containerAnimation, S = r.fastScrollEnd, k = r.preventOverlaps, R = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? ii : Ae, V = !f && f !== 0, z = ri(i.scroller || wt), B = X.core.getCache(z), Q = vs(z), it = ("pinType" in i ? i.pinType : Nn(z, "pinType") || Q && "fixed") === "fixed", q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], H = V && i.toggleActions.split(" "), tt = "markers" in i ? i.markers : Go.markers, ot = Q ? 0 : parseFloat(Mi(z)["border" + R.p2 + lr]) || 0, b = this, G = i.onRefreshInit && function() {
      return i.onRefreshInit(b);
    }, nt = O_(z, Q, R), U = k_(z, Q), rt = 0, Lt = 0, mt = 0, Ct = Wn(z, R), lt, zt, se, Bt, Ut, pt, gt, ut, Ce, I, Vt, Ke, Ie, Ft, $t, ce, Xe, Xt, re, kt, he, De, Fe, Ki, Kt, Xi, si, ve, Le, Si, Ne, at, $e, Nt, Pe, ie, Ei, j, v;
    if (b._startClamp = b._endClamp = !1, b._dir = R, _ *= 45, b.scroller = z, b.scroll = P ? P.time.bind(P) : Ct, Bt = Ct(), b.vars = i, n = n || i.animation, "refreshPriority" in i && (gp = 1, i.refreshPriority === -9999 && (Qr = b)), B.tweenScroll = B.tweenScroll || {
      top: Uh(z, Ae),
      left: Uh(z, ii)
    }, b.tweenTo = lt = B.tweenScroll[R.p], b.scrubDuration = function(D) {
      $e = Dr(D) && D, $e ? at ? at.duration(D) : at = X.to(n, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: $e,
        paused: !0,
        onComplete: function() {
          return w && w(b);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, n && (n.vars.lazy = !1, n._initted && !b.isReverted || n.vars.immediateRender !== !1 && i.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), b.animation = n.pause(), n.scrollTrigger = b, b.scrubDuration(f), Si = 0, l || (l = n.vars.id)), T && ((!ts(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in Rt.style && X.set(Q ? [Rt, gi] : z, {
      scrollBehavior: "auto"
    }), bt.forEach(function(D) {
      return Ye(D) && D.target === (Q ? Yt.scrollingElement || gi : z) && (D.smooth = !1);
    }), se = Ye(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? I_(n) : T.snapTo === "labelsDirectional" ? D_(n) : T.directional !== !1 ? function(D, W) {
      return _c(T.snapTo)(D, Ve() - Lt < 500 ? 0 : W.direction);
    } : X.utils.snap(T.snapTo), Nt = T.duration || {
      min: 0.1,
      max: 2
    }, Nt = ts(Nt) ? Kr(Nt.min, Nt.max) : Kr(Nt, Nt), Pe = X.delayedCall(T.delay || $e / 2 || 0.1, function() {
      var D = Ct(), W = Ve() - Lt < 500, F = lt.tween;
      if ((W || Math.abs(b.getVelocity()) < 10) && !F && !Ua && rt !== D) {
        var Y = (D - pt) / Ft, et = n && !V ? n.totalProgress() : Y, K = W ? 0 : (et - Ne) / (Ve() - kr) * 1e3 || 0, ft = X.utils.clamp(-Y, 1 - Y, Os(K / 2) * K / 0.185), Tt = Y + (T.inertia === !1 ? 0 : ft), Pt, yt, dt = T, Mt = dt.onStart, ct = dt.onInterrupt, we = dt.onComplete;
        if (Pt = se(Tt, b), Dr(Pt) || (Pt = Tt), yt = Math.max(0, Math.round(pt + Pt * Ft)), D <= gt && D >= pt && yt !== D) {
          if (F && !F._initted && F.data <= Os(yt - D))
            return;
          T.inertia === !1 && (ft = Pt - Y), lt(yt, {
            duration: Nt(Os(Math.max(Os(Tt - et), Os(Pt - et)) * 0.185 / K / 0.05 || 0)),
            ease: T.ease || "power3",
            data: Os(yt - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Pe.restart(!0) && ct && ct(b);
            },
            onComplete: function() {
              b.update(), rt = Ct(), n && !V && (at ? at.resetTo("totalProgress", Pt, n._tTime / n._tDur) : n.progress(Pt)), Si = Ne = n && !V ? n.totalProgress() : b.progress, A && A(b), we && we(b);
            }
          }, D, ft * Ft, yt - D - ft * Ft), Mt && Mt(b, lt.tween);
        }
      } else b.isActive && rt !== D && Pe.restart(!0);
    }).pause()), l && (cu[l] = b), d = b.trigger = ri(d || u !== !0 && u), v = d && d._gsap && d._gsap.stRevert, v && (v = v(b)), u = u === !0 ? d : ri(u), di(a) && (a = {
      targets: d,
      className: a
    }), u && (g === !1 || g === ki || (g = !g && u.parentNode && u.parentNode.style && Mi(u.parentNode).display === "flex" ? !1 : ge), b.pin = u, zt = X.core.getCache(u), zt.spacer ? $t = zt.pinState : (O && (O = ri(O), O && !O.nodeType && (O = O.current || O.nativeElement), zt.spacerIsNative = !!O, O && (zt.spacerState = Zo(O))), zt.spacer = Xt = O || Yt.createElement("div"), Xt.classList.add("pin-spacer"), l && Xt.classList.add("pin-spacer-" + l), zt.pinState = $t = Zo(u)), i.force3D !== !1 && X.set(u, {
      force3D: !0
    }), b.spacer = Xt = zt.spacer, Le = Mi(u), Ki = Le[g + R.os2], kt = X.getProperty(u), he = X.quickSetter(u, R.a, Te), El(u, Xt, Le), Xe = Zo(u)), tt) {
      Ke = ts(tt) ? $h(tt, Bh) : Bh, I = jo("scroller-start", l, z, R, Ke, 0), Vt = jo("scroller-end", l, z, R, Ke, 0, I), re = I["offset" + R.op.d2];
      var $ = ri(Nn(z, "content") || z);
      ut = this.markerStart = jo("start", l, $, R, Ke, re, 0, P), Ce = this.markerEnd = jo("end", l, $, R, Ke, re, 0, P), P && (j = X.quickSetter([ut, Ce], R.a, Te)), !it && !(sn.length && Nn(z, "fixedMarkers") === !0) && (M_(Q ? Rt : z), X.set([I, Vt], {
        force3D: !0
      }), Xi = X.quickSetter(I, R.a, Te), ve = X.quickSetter(Vt, R.a, Te));
    }
    if (P) {
      var E = P.vars.onUpdate, M = P.vars.onUpdateParams;
      P.eventCallback("onUpdate", function() {
        b.update(0, 0, 1), E && E.apply(P, M || []);
      });
    }
    if (b.previous = function() {
      return vt[vt.indexOf(b) - 1];
    }, b.next = function() {
      return vt[vt.indexOf(b) + 1];
    }, b.revert = function(D, W) {
      if (!W)
        return b.kill(!0);
      var F = D !== !1 || !b.enabled, Y = Be;
      F !== b.isReverted && (F && (ie = Math.max(Ct(), b.scroll.rec || 0), mt = b.progress, Ei = n && n.progress()), ut && [ut, Ce, I, Vt].forEach(function(et) {
        return et.style.display = F ? "none" : "block";
      }), F && (Be = b, b.update(F)), u && (!y || !b.isActive) && (F ? z_(u, Xt, $t) : El(u, Xt, Mi(u), Kt)), F || b.update(F), Be = Y, b.isReverted = F);
    }, b.refresh = function(D, W, F, Y) {
      if (!((Be || !b.enabled) && !W)) {
        if (u && D && Ri) {
          ke(s, "scrollEnd", Ap);
          return;
        }
        !ti && G && G(b), Be = b, lt.tween && !F && (lt.tween.kill(), lt.tween = 0), at && at.pause(), p && n && (n.revert({
          kill: !1
        }).invalidate(), n.getChildren && n.getChildren(!0, !0, !1).forEach(function(Fi) {
          return Fi.vars.immediateRender && Fi.render(0, !0, !0);
        })), b.isReverted || b.revert(!0, !0), b._subPinOffset = !1;
        var et = nt(), K = U(), ft = P ? P.duration() : en(z, R), Tt = Ft <= 0.01 || !Ft, Pt = 0, yt = Y || 0, dt = ts(F) ? F.end : i.end, Mt = i.endTrigger || d, ct = ts(F) ? F.start : i.start || (i.start === 0 || !d ? 0 : u ? "0 0" : "0 100%"), we = b.pinnedContainer = i.pinnedContainer && ri(i.pinnedContainer, b), Gt = d && Math.max(0, vt.indexOf(b)) || 0, be = Gt, xe, fe, an, ln, de, oe, Ge, Ts, Ro, Xn, Ai, un, Ss;
        for (tt && ts(F) && (un = X.getProperty(I, R.p), Ss = X.getProperty(Vt, R.p)); be-- > 0; )
          oe = vt[be], oe.end || oe.refresh(0, 1) || (Be = b), Ge = oe.pin, Ge && (Ge === d || Ge === u || Ge === we) && !oe.isReverted && (Xn || (Xn = []), Xn.unshift(oe), oe.revert(!0, !0)), oe !== vt[be] && (Gt--, be--);
        for (Ye(ct) && (ct = ct(b)), ct = Rh(ct, "start", b), pt = Yh(ct, d, et, R, Ct(), ut, I, b, K, ot, it, ft, P, b._startClamp && "_startClamp") || (u ? -1e-3 : 0), Ye(dt) && (dt = dt(b)), di(dt) && !dt.indexOf("+=") && (~dt.indexOf(" ") ? dt = (di(ct) ? ct.split(" ")[0] : "") + dt : (Pt = ca(dt.substr(2), et), dt = di(ct) ? ct : (P ? X.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, pt) : pt) + Pt, Mt = d)), dt = Rh(dt, "end", b), gt = Math.max(pt, Yh(dt || (Mt ? "100% 0" : ft), Mt, et, R, Ct() + Pt, Ce, Vt, b, K, ot, it, ft, P, b._endClamp && "_endClamp")) || -1e-3, Pt = 0, be = Gt; be--; )
          oe = vt[be], Ge = oe.pin, Ge && oe.start - oe._pinPush <= pt && !P && oe.end > 0 && (xe = oe.end - (b._startClamp ? Math.max(0, oe.start) : oe.start), (Ge === d && oe.start - oe._pinPush < pt || Ge === we) && isNaN(ct) && (Pt += xe * (1 - oe.progress)), Ge === u && (yt += xe));
        if (pt += Pt, gt += Pt, b._startClamp && (b._startClamp += Pt), b._endClamp && !ti && (b._endClamp = gt || -1e-3, gt = Math.min(gt, en(z, R))), Ft = gt - pt || (pt -= 0.01) && 1e-3, Tt && (mt = X.utils.clamp(0, 1, X.utils.normalize(pt, gt, ie))), b._pinPush = yt, ut && Pt && (xe = {}, xe[R.a] = "+=" + Pt, we && (xe[R.p] = "-=" + Ct()), X.set([ut, Ce], xe)), u && !(uu && b.end >= en(z, R)))
          xe = Mi(u), ln = R === Ae, an = Ct(), De = parseFloat(kt(R.a)) + yt, !ft && gt > 1 && (Ai = (Q ? Yt.scrollingElement || gi : z).style, Ai = {
            style: Ai,
            value: Ai["overflow" + R.a.toUpperCase()]
          }, Q && Mi(Rt)["overflow" + R.a.toUpperCase()] !== "scroll" && (Ai.style["overflow" + R.a.toUpperCase()] = "scroll")), El(u, Xt, xe), Xe = Zo(u), fe = gn(u, !0), Ts = it && Wn(z, ln ? ii : Ae)(), g ? (Kt = [g + R.os2, Ft + yt + Te], Kt.t = Xt, be = g === ge ? ka(u, R) + Ft + yt : 0, be && (Kt.push(R.d, be + Te), Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = be + Te)), Qs(Kt), we && vt.forEach(function(Fi) {
            Fi.pin === we && Fi.vars.pinSpacing !== !1 && (Fi._subPinOffset = !0);
          }), it && Ct(ie)) : (be = ka(u, R), be && Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = be + Te)), it && (de = {
            top: fe.top + (ln ? an - pt : Ts) + Te,
            left: fe.left + (ln ? Ts : an - pt) + Te,
            boxSizing: "border-box",
            position: "fixed"
          }, de[fs] = de["max" + lr] = Math.ceil(fe.width) + Te, de[ds] = de["max" + mc] = Math.ceil(fe.height) + Te, de[ki] = de[ki + jr] = de[ki + Xr] = de[ki + Zr] = de[ki + Gr] = "0", de[ge] = xe[ge], de[ge + jr] = xe[ge + jr], de[ge + Xr] = xe[ge + Xr], de[ge + Zr] = xe[ge + Zr], de[ge + Gr] = xe[ge + Gr], ce = N_($t, de, y), ti && Ct(0)), n ? (Ro = n._initted, wl(1), n.render(n.duration(), !0, !0), Fe = kt(R.a) - De + Ft + yt, si = Math.abs(Ft - Fe) > 1, it && si && ce.splice(ce.length - 2, 2), n.render(0, !0, !0), Ro || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), wl(0)) : Fe = Ft, Ai && (Ai.value ? Ai.style["overflow" + R.a.toUpperCase()] = Ai.value : Ai.style.removeProperty("overflow-" + R.a));
        else if (d && Ct() && !P)
          for (fe = d.parentNode; fe && fe !== Rt; )
            fe._pinOffset && (pt -= fe._pinOffset, gt -= fe._pinOffset), fe = fe.parentNode;
        Xn && Xn.forEach(function(Fi) {
          return Fi.revert(!1, !0);
        }), b.start = pt, b.end = gt, Bt = Ut = ti ? ie : Ct(), !P && !ti && (Bt < ie && Ct(ie), b.scroll.rec = 0), b.revert(!1, !0), Lt = Ve(), Pe && (rt = -1, Pe.restart(!0)), Be = 0, n && V && (n._initted || Ei) && n.progress() !== Ei && n.progress(Ei || 0, !0).render(n.time(), !0, !0), (Tt || mt !== b.progress || P || p || n && !n._initted) && (n && !V && (n._initted || mt || n.vars.immediateRender !== !1) && n.totalProgress(P && pt < -1e-3 && !mt ? X.utils.normalize(pt, gt, 0) : mt, !0), b.progress = Tt || (Bt - pt) / Ft === mt ? 0 : mt), u && g && (Xt._pinOffset = Math.round(b.progress * Fe)), at && at.invalidate(), isNaN(un) || (un -= X.getProperty(I, R.p), Ss -= X.getProperty(Vt, R.p), Qo(I, R, un), Qo(ut, R, un - (Y || 0)), Qo(Vt, R, Ss), Qo(Ce, R, Ss - (Y || 0))), Tt && !ti && b.update(), h && !ti && !Ie && (Ie = !0, h(b), Ie = !1);
      }
    }, b.getVelocity = function() {
      return (Ct() - Ut) / (Ve() - kr) * 1e3 || 0;
    }, b.endAnimation = function() {
      vr(b.callbackAnimation), n && (at ? at.progress(1) : n.paused() ? V || vr(n, b.direction < 0, 1) : vr(n, n.reversed()));
    }, b.labelToScroll = function(D) {
      return n && n.labels && (pt || b.refresh() || pt) + n.labels[D] / n.duration() * Ft || 0;
    }, b.getTrailing = function(D) {
      var W = vt.indexOf(b), F = b.direction > 0 ? vt.slice(0, W).reverse() : vt.slice(W + 1);
      return (di(D) ? F.filter(function(Y) {
        return Y.vars.preventOverlaps === D;
      }) : F).filter(function(Y) {
        return b.direction > 0 ? Y.end <= pt : Y.start >= gt;
      });
    }, b.update = function(D, W, F) {
      if (!(P && !F && !D)) {
        var Y = ti === !0 ? ie : b.scroll(), et = D ? 0 : (Y - pt) / Ft, K = et < 0 ? 0 : et > 1 ? 1 : et || 0, ft = b.progress, Tt, Pt, yt, dt, Mt, ct, we, Gt;
        if (W && (Ut = Bt, Bt = P ? Ct() : Y, T && (Ne = Si, Si = n && !V ? n.totalProgress() : K)), _ && u && !Be && !qo && Ri && (!K && pt < Y + (Y - Ut) / (Ve() - kr) * _ ? K = 1e-4 : K === 1 && gt > Y + (Y - Ut) / (Ve() - kr) * _ && (K = 0.9999)), K !== ft && b.enabled) {
          if (Tt = b.isActive = !!K && K < 1, Pt = !!ft && ft < 1, ct = Tt !== Pt, Mt = ct || !!K != !!ft, b.direction = K > ft ? 1 : -1, b.progress = K, Mt && !Be && (yt = K && !ft ? 0 : K === 1 ? 1 : ft === 1 ? 2 : 3, V && (dt = !ct && H[yt + 1] !== "none" && H[yt + 1] || H[yt], Gt = n && (dt === "complete" || dt === "reset" || dt in n))), k && (ct || Gt) && (Gt || f || !n) && (Ye(k) ? k(b) : b.getTrailing(k).forEach(function(an) {
            return an.endAnimation();
          })), V || (at && !Be && !qo ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", K, n._tTime / n._tDur) : (at.vars.totalProgress = K, at.invalidate().restart())) : n && n.totalProgress(K, !!(Be && (Lt || D)))), u) {
            if (D && g && (Xt.style[g + R.os2] = Ki), !it)
              he(Ir(De + Fe * K));
            else if (Mt) {
              if (we = !D && K > ft && gt + 1 > Y && Y + 1 >= en(z, R), y)
                if (!D && (Tt || we)) {
                  var be = gn(u, !0), xe = Y - pt;
                  qh(u, Rt, be.top + (R === Ae ? xe : 0) + Te, be.left + (R === Ae ? 0 : xe) + Te);
                } else
                  qh(u, Xt);
              Qs(Tt || we ? ce : Xe), si && K < 1 && Tt || he(De + (K === 1 && !we ? Fe : 0));
            }
          }
          T && !lt.tween && !Be && !qo && Pe.restart(!0), a && (ct || C && K && (K < 1 || !bl)) && mo(a.targets).forEach(function(an) {
            return an.classList[Tt || C ? "add" : "remove"](a.className);
          }), o && !V && !D && o(b), Mt && !Be ? (V && (Gt && (dt === "complete" ? n.pause().totalProgress(1) : dt === "reset" ? n.restart(!0).pause() : dt === "restart" ? n.restart(!0) : n[dt]()), o && o(b)), (ct || !bl) && (c && ct && Tl(b, c), q[yt] && Tl(b, q[yt]), C && (K === 1 ? b.kill(!1, 1) : q[yt] = 0), ct || (yt = K === 1 ? 1 : 3, q[yt] && Tl(b, q[yt]))), S && !Tt && Math.abs(b.getVelocity()) > (Dr(S) ? S : 2500) && (vr(b.callbackAnimation), at ? at.progress(1) : vr(n, dt === "reverse" ? 1 : !K, 1))) : V && o && !Be && o(b);
        }
        if (ve) {
          var fe = P ? Y / P.duration() * (P._caScrollDist || 0) : Y;
          Xi(fe + (I._isFlipped ? 1 : 0)), ve(fe);
        }
        j && j(-Y / P.duration() * (P._caScrollDist || 0));
      }
    }, b.enable = function(D, W) {
      b.enabled || (b.enabled = !0, ke(z, "resize", Lr), Q || ke(z, "scroll", ks), G && ke(s, "refreshInit", G), D !== !1 && (b.progress = mt = 0, Bt = Ut = rt = Ct()), W !== !1 && b.refresh());
    }, b.getTween = function(D) {
      return D && lt ? lt.tween : at;
    }, b.setPositions = function(D, W, F, Y) {
      if (P) {
        var et = P.scrollTrigger, K = P.duration(), ft = et.end - et.start;
        D = et.start + ft * D / K, W = et.start + ft * W / K;
      }
      b.refresh(!1, !1, {
        start: zh(D, F && !!b._startClamp),
        end: zh(W, F && !!b._endClamp)
      }, Y), b.update();
    }, b.adjustPinSpacing = function(D) {
      if (Kt && D) {
        var W = Kt.indexOf(R.d) + 1;
        Kt[W] = parseFloat(Kt[W]) + D + Te, Kt[1] = parseFloat(Kt[1]) + D + Te, Qs(Kt);
      }
    }, b.disable = function(D, W) {
      if (b.enabled && (D !== !1 && b.revert(!0, !0), b.enabled = b.isActive = !1, W || at && at.pause(), ie = 0, zt && (zt.uncache = 1), G && Oe(s, "refreshInit", G), Pe && (Pe.pause(), lt.tween && lt.tween.kill() && (lt.tween = 0)), !Q)) {
        for (var F = vt.length; F--; )
          if (vt[F].scroller === z && vt[F] !== b)
            return;
        Oe(z, "resize", Lr), Q || Oe(z, "scroll", ks);
      }
    }, b.kill = function(D, W) {
      b.disable(D, W), at && !W && at.kill(), l && delete cu[l];
      var F = vt.indexOf(b);
      F >= 0 && vt.splice(F, 1), F === Je && fa > 0 && Je--, F = 0, vt.forEach(function(Y) {
        return Y.scroller === b.scroller && (F = 1);
      }), F || ti || (b.scroll.rec = 0), n && (n.scrollTrigger = null, D && n.revert({
        kill: !1
      }), W || n.kill()), ut && [ut, Ce, I, Vt].forEach(function(Y) {
        return Y.parentNode && Y.parentNode.removeChild(Y);
      }), Qr === b && (Qr = 0), u && (zt && (zt.uncache = 1), F = 0, vt.forEach(function(Y) {
        return Y.pin === u && F++;
      }), F || (zt.spacer = 0)), i.onKill && i.onKill(b);
    }, vt.push(b), b.enable(!1, !1), v && v(b), n && n.add && !Ft) {
      var N = b.update;
      b.update = function() {
        b.update = N, bt.cache++, pt || gt || b.refresh();
      }, X.delayedCall(0.01, b.update), Ft = 0.01, pt = gt = 0;
    } else
      b.refresh();
    u && R_();
  }, s.register = function(i) {
    return Ds || (X = i || wp(), vp() && window.document && s.enable(), Ds = Mr), Ds;
  }, s.defaults = function(i) {
    if (i)
      for (var n in i)
        Go[n] = i[n];
    return Go;
  }, s.disable = function(i, n) {
    Mr = 0, vt.forEach(function(o) {
      return o[n ? "kill" : "disable"](i);
    }), Oe(wt, "wheel", ks), Oe(Yt, "scroll", ks), clearInterval(Yo), Oe(Yt, "touchcancel", ji), Oe(Rt, "touchstart", ji), Ko(Oe, Yt, "pointerdown,touchstart,mousedown", Fh), Ko(Oe, Yt, "pointerup,touchend,mouseup", Nh), Pa.kill(), Uo(Oe);
    for (var r = 0; r < bt.length; r += 3)
      Xo(Oe, bt[r], bt[r + 1]), Xo(Oe, bt[r], bt[r + 2]);
  }, s.enable = function() {
    if (wt = window, Yt = document, gi = Yt.documentElement, Rt = Yt.body, X && (mo = X.utils.toArray, Kr = X.utils.clamp, lu = X.core.context || ji, wl = X.core.suppressOverwrites || ji, fc = wt.history.scrollRestoration || "auto", hu = wt.pageYOffset || 0, X.core.globals("ScrollTrigger", s), Rt)) {
      Mr = 1, Zs = document.createElement("div"), Zs.style.height = "100vh", Zs.style.position = "absolute", Op(), P_(), ue.register(X), s.isTouch = ue.isTouch, An = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), au = ue.isTouch === 1, ke(wt, "wheel", ks), hc = [wt, Yt, gi, Rt], X.matchMedia ? (s.matchMedia = function(c) {
        var h = X.matchMedia(), f;
        for (f in c)
          h.add(f, c[f]);
        return h;
      }, X.addEventListener("matchMediaInit", function() {
        return yc();
      }), X.addEventListener("matchMediaRevert", function() {
        return Cp();
      }), X.addEventListener("matchMedia", function() {
        ns(0, 1), bs("matchMedia");
      }), X.matchMedia().add("(orientation: portrait)", function() {
        return Sl(), Sl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Sl(), ke(Yt, "scroll", ks);
      var i = Rt.hasAttribute("style"), n = Rt.style, r = n.borderTopStyle, o = X.core.Animation.prototype, a, l;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = gn(Rt), Ae.m = Math.round(a.top + Ae.sc()) || 0, ii.m = Math.round(a.left + ii.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), i || (Rt.setAttribute("style", ""), Rt.removeAttribute("style")), Yo = setInterval(Vh, 250), X.delayedCall(0.5, function() {
        return qo = 0;
      }), ke(Yt, "touchcancel", ji), ke(Rt, "touchstart", ji), Ko(ke, Yt, "pointerdown,touchstart,mousedown", Fh), Ko(ke, Yt, "pointerup,touchend,mouseup", Nh), ou = X.utils.checkPrefix("transform"), da.push(ou), Ds = Ve(), Pa = X.delayedCall(0.2, ns).pause(), Ls = [Yt, "visibilitychange", function() {
        var c = wt.innerWidth, h = wt.innerHeight;
        Yt.hidden ? (Dh = c, Lh = h) : (Dh !== c || Lh !== h) && Lr();
      }, Yt, "DOMContentLoaded", ns, wt, "load", ns, wt, "resize", Lr], Uo(ke), vt.forEach(function(c) {
        return c.enable(0, 1);
      }), l = 0; l < bt.length; l += 3)
        Xo(Oe, bt[l], bt[l + 1]), Xo(Oe, bt[l], bt[l + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (bl = !!i.limitCallbacks);
    var n = i.syncInterval;
    n && clearInterval(Yo) || (Yo = n) && setInterval(Vh, n), "ignoreMobileResize" in i && (au = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Uo(Oe) || Uo(ke, i.autoRefreshEvents || "none"), mp = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, n) {
    var r = ri(i), o = bt.indexOf(r), a = vs(r);
    ~o && bt.splice(o, a ? 6 : 2), n && (a ? sn.unshift(wt, n, Rt, n, gi, n) : sn.unshift(r, n));
  }, s.clearMatchMedia = function(i) {
    vt.forEach(function(n) {
      return n._ctx && n._ctx.query === i && n._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, n, r) {
    var o = (di(i) ? ri(i) : i).getBoundingClientRect(), a = o[r ? fs : ds] * n || 0;
    return r ? o.right - a > 0 && o.left + a < wt.innerWidth : o.bottom - a > 0 && o.top + a < wt.innerHeight;
  }, s.positionInViewport = function(i, n, r) {
    di(i) && (i = ri(i));
    var o = i.getBoundingClientRect(), a = o[r ? fs : ds], l = n == null ? a / 2 : n in Ma ? Ma[n] * a : ~n.indexOf("%") ? parseFloat(n) * a / 100 : parseFloat(n) || 0;
    return r ? (o.left + l) / wt.innerWidth : (o.top + l) / wt.innerHeight;
  }, s.killAll = function(i) {
    if (vt.slice(0).forEach(function(r) {
      return r.vars.id !== "ScrollSmoother" && r.kill();
    }), i !== !0) {
      var n = ws.killAll || [];
      ws = {}, n.forEach(function(r) {
        return r();
      });
    }
  }, s;
}();
xt.version = "3.13.0";
xt.saveStyles = function(s) {
  return s ? mo(s).forEach(function(t) {
    if (t && t.style) {
      var e = fi.indexOf(t);
      e >= 0 && fi.splice(e, 5), fi.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), X.core.getCache(t), lu());
    }
  }) : fi;
};
xt.revert = function(s, t) {
  return yc(!s, t);
};
xt.create = function(s, t) {
  return new xt(s, t);
};
xt.refresh = function(s) {
  return s ? Lr(!0) : (Ds || xt.register()) && ns(!0);
};
xt.update = function(s) {
  return ++bt.cache && wn(s === !0 ? 2 : 0);
};
xt.clearScrollMemory = Pp;
xt.maxScroll = function(s, t) {
  return en(s, t ? ii : Ae);
};
xt.getScrollFunc = function(s, t) {
  return Wn(ri(s), t ? ii : Ae);
};
xt.getById = function(s) {
  return cu[s];
};
xt.getAll = function() {
  return vt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
xt.isScrolling = function() {
  return !!Ri;
};
xt.snapDirectional = _c;
xt.addEventListener = function(s, t) {
  var e = ws[s] || (ws[s] = []);
  ~e.indexOf(t) || e.push(t);
};
xt.removeEventListener = function(s, t) {
  var e = ws[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
xt.batch = function(s, t) {
  var e = [], i = {}, n = t.interval || 0.016, r = t.batchMax || 1e9, o = function(c, h) {
    var f = [], d = [], u = X.delayedCall(n, function() {
      h(f, d), f = [], d = [];
    }).pause();
    return function(g) {
      f.length || u.restart(!0), f.push(g.trigger), d.push(g), r <= f.length && u.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && Ye(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return Ye(r) && (r = r(), ke(xt, "refresh", function() {
    return r = t.batchMax();
  })), mo(s).forEach(function(l) {
    var c = {};
    for (a in i)
      c[a] = i[a];
    c.trigger = l, e.push(xt.create(c));
  }), e;
};
var Kh = function(t, e, i, n) {
  return e > n ? t(n) : e < 0 && t(0), i > n ? (n - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Al = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (ue.isTouch ? " pinch-zoom" : "") : "none", t === gi && s(Rt, e);
}, Jo = {
  auto: 1,
  scroll: 1
}, B_ = function(t) {
  var e = t.event, i = t.target, n = t.axis, r = (e.changedTouches ? e.changedTouches[0] : e).target, o = r._gsap || X.core.getCache(r), a = Ve(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; r && r !== Rt && (r.scrollHeight <= r.clientHeight && r.scrollWidth <= r.clientWidth || !(Jo[(l = Mi(r)).overflowY] || Jo[l.overflowX])); )
      r = r.parentNode;
    o._isScroll = r && r !== i && !vs(r) && (Jo[(l = Mi(r)).overflowY] || Jo[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || n === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Mp = function(t, e, i, n) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: n = n && B_,
    onPress: n,
    onDrag: n,
    onScroll: n,
    onEnable: function() {
      return i && ke(Yt, ue.eventTypes[0], Gh, !1, !0);
    },
    onDisable: function() {
      return Oe(Yt, ue.eventTypes[0], Gh, !0);
    }
  });
}, V_ = /(input|label|select|textarea)/i, Xh, Gh = function(t) {
  var e = V_.test(t.target.tagName);
  (e || Xh) && (t._gsapAllow = !0, Xh = e);
}, H_ = function(t) {
  ts(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, n = e.momentum, r = e.allowNestedScroll, o = e.onRelease, a, l, c = ri(t.target) || gi, h = X.core.globals().ScrollSmoother, f = h && h.get(), d = An && (t.content && ri(t.content) || f && t.content !== !1 && !f.smooth() && f.content()), u = Wn(c, Ae), g = Wn(c, ii), p = 1, _ = (ue.isTouch && wt.visualViewport ? wt.visualViewport.scale * wt.visualViewport.width : wt.outerWidth) / wt.innerWidth, w = 0, A = Ye(n) ? function() {
    return n(a);
  } : function() {
    return n || 2.8;
  }, C, T, y = Mp(c, t.type, !0, r), O = function() {
    return T = !1;
  }, P = ji, S = ji, k = function() {
    l = en(c, Ae), S = Kr(An ? 1 : 0, l), i && (P = Kr(0, en(c, ii))), C = ps;
  }, R = function() {
    d._gsap.y = Ir(parseFloat(d._gsap.y) + u.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, V = function() {
    if (T) {
      requestAnimationFrame(O);
      var tt = Ir(a.deltaY / 2), ot = S(u.v - tt);
      if (d && ot !== u.v + u.offset) {
        u.offset = ot - u.v;
        var b = Ir((parseFloat(d && d._gsap.y) || 0) - u.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + b + ", 0, 1)", d._gsap.y = b + "px", u.cacheID = bt.cache, wn();
      }
      return !0;
    }
    u.offset && R(), T = !0;
  }, z, B, Q, it, q = function() {
    k(), z.isActive() && z.vars.scrollY > l && (u() > l ? z.progress(1) && u(l) : z.resetTo("scrollY", l));
  };
  return d && X.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return An && H.type === "touchmove" && V() || p > 1.05 && H.type !== "touchstart" || a.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    T = !1;
    var H = p;
    p = Ir((wt.visualViewport && wt.visualViewport.scale || 1) / _), z.pause(), H !== p && Al(c, p > 1.01 ? !0 : i ? !1 : "x"), B = g(), Q = u(), k(), C = ps;
  }, t.onRelease = t.onGestureStart = function(H, tt) {
    if (u.offset && R(), !tt)
      it.restart(!0);
    else {
      bt.cache++;
      var ot = A(), b, G;
      i && (b = g(), G = b + ot * 0.05 * -H.velocityX / 0.227, ot *= Kh(g, b, G, en(c, ii)), z.vars.scrollX = P(G)), b = u(), G = b + ot * 0.05 * -H.velocityY / 0.227, ot *= Kh(u, b, G, en(c, Ae)), z.vars.scrollY = S(G), z.invalidate().duration(ot).play(0.01), (An && z.vars.scrollY >= l || b >= l - 1) && X.to({}, {
        onUpdate: q,
        duration: ot
      });
    }
    o && o(H);
  }, t.onWheel = function() {
    z._ts && z.pause(), Ve() - w > 1e3 && (C = 0, w = Ve());
  }, t.onChange = function(H, tt, ot, b, G) {
    if (ps !== C && k(), tt && i && g(P(b[2] === tt ? B + (H.startX - H.x) : g() + tt - b[1])), ot) {
      u.offset && R();
      var nt = G[2] === ot, U = nt ? Q + H.startY - H.y : u() + ot - G[1], rt = S(U);
      nt && U !== rt && (Q += rt - U), u(rt);
    }
    (ot || tt) && wn();
  }, t.onEnable = function() {
    Al(c, i ? !1 : "x"), xt.addEventListener("refresh", q), ke(wt, "resize", q), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = g.smooth = !1), y.enable();
  }, t.onDisable = function() {
    Al(c, !0), Oe(wt, "resize", q), xt.removeEventListener("refresh", q), y.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new ue(t), a.iOS = An, An && !u() && u(1), An && X.ticker.add(ji), it = a._dc, z = X.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: kp(u, u(), function() {
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
  return new ue(s);
};
xt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return Qe;
  if (s === !0 && Qe)
    return Qe.enable();
  if (s === !1) {
    Qe && Qe.kill(), Qe = s;
    return;
  }
  var t = s instanceof ue ? s : H_(s);
  return Qe && Qe.target === t.target && Qe.kill(), vs(t.target) && (Qe = t), t;
};
xt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: su,
  _inputObserver: Mp,
  _scrollers: bt,
  _proxies: sn,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Ri || bs("scrollStart"), Ri = Ve();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Be;
    }
  }
};
wp() && X.registerPlugin(xt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Zi, du, Jr, Ip, Rs, $s, pu, Dp, Lp = function() {
  return Zi || typeof window < "u" && (Zi = window.gsap);
}, gu = {}, W_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, mu = function(t) {
  return Dp(t).id;
}, Rr = function(t) {
  return gu[mu(typeof t == "string" ? Jr(t)[0] : t)];
}, jh = function(t) {
  var e = Rs, i;
  if (t - pu >= 0.05)
    for (pu = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, Y_ = {
  deg: 360,
  rad: Math.PI * 2
}, Cl = function() {
  Zi = Lp(), Zi && (Jr = Zi.utils.toArray, Ip = Zi.utils.getUnit, Dp = Zi.core.getCache, $s = Zi.ticker, du = 1);
}, q_ = function(t, e, i, n) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = Y_[i || Ip(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = $s.time, n && (this._next = n, n._prev = this);
}, Oo = /* @__PURE__ */ function() {
  function s(e, i) {
    du || Cl(), this.target = Jr(e)[0], gu[mu(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    Zi = i, Cl();
  };
  var t = s.prototype;
  return t.get = function(i, n) {
    var r = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, l;
    return o = parseFloat(n ? r.v1 : r.g(r.t, r.p)), a = o - parseFloat(r.v2), l = r.rCap, l && (a = a % l, a !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), W_(a / ((n ? r.t1 : $s.time) - r.t2));
  }, t.getAll = function() {
    var i = {}, n = this._props, r;
    for (r in n)
      i[r] = this.get(r);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, n) {
    i in this._props || (Rs || ($s.add(jh), pu = $s.time), Rs = this._props[i] = new q_(this.target, i, n, Rs));
  }, t.remove = function(i) {
    var n = this._props[i], r, o;
    n && (r = n._prev, o = n._next, r && (r._next = o), o ? o._prev = r : Rs === n && ($s.remove(jh), Rs = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var n in this._props)
      this.remove(n);
    i || delete gu[mu(this.target)];
  }, s.track = function(i, n, r) {
    du || Cl();
    for (var o = [], a = Jr(i), l = n.split(","), c = (r || "").split(","), h = a.length, f, d; h--; ) {
      for (f = Rr(a[h]) || new s(a[h]), d = l.length; d--; )
        f.add(l[d], c[d] || c[0]);
      o.push(f);
    }
    return o;
  }, s.untrack = function(i, n) {
    var r = (n || "").split(",");
    Jr(i).forEach(function(o) {
      var a = Rr(o);
      a && (r.length ? r.forEach(function(l) {
        return a.remove(l);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, n) {
    var r = Rr(i);
    return r && r.isTracking(n);
  }, s.getVelocity = function(i, n) {
    var r = Rr(i);
    return !r || !r.isTracking(n) ? console.warn("Not tracking velocity of " + n) : r.get(n);
  }, s;
}();
Oo.getByTarget = Rr;
Lp() && Zi.registerPlugin(Oo);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ee, Rp, Zh, zp, _u, to, Fp, Np, $p, vc, Bp, eo, yu, Vp, Ia = Oo.getByTarget, Hp = function() {
  return Ee || typeof window < "u" && (Ee = window.gsap) && Ee.registerPlugin && Ee;
}, U_ = function(t) {
  return typeof t == "string";
}, yo = function(t) {
  return typeof t == "number";
}, Bn = function(t) {
  return typeof t == "object";
}, vu = function(t) {
  return typeof t == "function";
}, K_ = 1, Wp = Array.isArray, X_ = function(t) {
  return t;
}, Js = 1e10, Qh = 1 / Js, Yp = 0.05, G_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, j_ = function(t, e, i) {
  for (var n in e)
    !(n in t) && n !== i && (t[n] = e[n]);
  return t;
}, Z_ = function s(t) {
  var e = {}, i, n;
  for (i in t)
    e[i] = Bn(n = t[i]) && !Wp(n) ? s(n) : n;
  return e;
}, Jh = function(t, e, i, n, r) {
  var o = e.length, a = 0, l = Js, c, h, f, d;
  if (Bn(t)) {
    for (; o--; ) {
      c = e[o], h = 0;
      for (f in t)
        d = c[f] - t[f], h += d * d;
      h < l && (a = o, l = h);
    }
    if ((r || Js) < Js && r < Math.sqrt(l))
      return t;
  } else
    for (; o--; )
      c = e[o], h = c - t, h < 0 && (h = -h), h < l && c >= n && c <= i && (a = o, l = h);
  return e[a];
}, qp = function(t, e, i, n, r, o, a) {
  if (t.end === "auto")
    return t;
  var l = t.end, c, h;
  if (i = isNaN(i) ? Js : i, n = isNaN(n) ? -1e10 : n, Bn(e)) {
    if (c = e.calculated ? e : (vu(l) ? l(e, a) : Jh(e, l, i, n, o)) || e, !e.calculated) {
      for (h in c)
        e[h] = c[h];
      e.calculated = !0;
    }
    c = c[r];
  } else
    c = vu(l) ? l(e, a) : Wp(l) ? Jh(e, l, i, n, o) : parseFloat(l);
  return c > i ? c = i : c < n && (c = n), {
    max: c,
    min: c,
    unitFactor: t.unitFactor
  };
}, Da = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, wc = function(t, e) {
  return e * Yp * t / vc;
}, tf = function(t, e, i) {
  return Math.abs((e - t) * vc / i / Yp);
}, Up = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Kp = function(t, e, i, n) {
  if (e.linkedProps) {
    var r = e.linkedProps.split(","), o = {}, a, l, c, h, f, d;
    for (a = 0; a < r.length; a++)
      l = r[a], c = e[l], c && (yo(c.velocity) ? h = c.velocity : (f = f || Ia(t), h = f && f.isTracking(l) ? f.get(l) : 0), d = Math.abs(h / Da(c, "resistance", n)), o[l] = parseFloat(i(t, l)) + wc(h, d));
    return o;
  }
}, Q_ = function(t, e, i, n, r, o) {
  if (i === void 0 && (i = 10), n === void 0 && (n = 0.2), r === void 0 && (r = 1), U_(t) && (t = zp(t)[0]), !t)
    return 0;
  var a = 0, l = Js, c = e.inertia || e, h = $p(t).get, f = Da(c, "resistance", to.resistance), d, u, g, p, _, w, A, C, T, y;
  y = Kp(t, c, h, f);
  for (d in c)
    Up[d] || (u = c[d], Bn(u) || (C = C || Ia(t), C && C.isTracking(d) ? u = yo(u) ? {
      velocity: u
    } : {
      velocity: C.get(d)
    } : (p = +u || 0, g = Math.abs(p / f))), Bn(u) && (yo(u.velocity) ? p = u.velocity : (C = C || Ia(t), p = C && C.isTracking(d) ? C.get(d) : 0), g = Bp(n, i, Math.abs(p / Da(u, "resistance", f))), _ = parseFloat(h(t, d)) || 0, w = _ + wc(p, g), "end" in u && (u = qp(u, y && d in y ? y : w, u.max, u.min, d, c.radius, p), eo === e && (eo = c = Z_(e)), c[d] = j_(u, c[d], "end")), "max" in u && w > +u.max + Qh ? (T = u.unitFactor || to.unitFactors[d] || 1, A = _ > u.max && u.min !== u.max || p * T > -15 && p * T < 45 ? n + (i - n) * 0.1 : tf(_, u.max, p), A + r < l && (l = A + r)) : "min" in u && w < +u.min - Qh && (T = u.unitFactor || to.unitFactors[d] || 1, A = _ < u.min && u.min !== u.max || p * T > -45 && p * T < 15 ? n + (i - n) * 0.1 : tf(_, u.min, p), A + r < l && (l = A + r)), A > a && (a = A)), g > a && (a = g));
  return a > l && (a = l), a > i ? i : a < n ? n : a;
}, ef = function() {
  Ee = Hp(), Ee && (Zh = Ee.parseEase, zp = Ee.utils.toArray, Fp = Ee.utils.getUnit, $p = Ee.core.getCache, Bp = Ee.utils.clamp, yu = Ee.core.getStyleSaver, Vp = Ee.core.reverting || function() {
  }, _u = Zh("power3"), vc = _u(0.05), Np = Ee.core.PropTween, Ee.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), to = Ee.config(), Ee.registerPlugin(Oo), Rp = 1);
}, Xp = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Ee = t, ef();
  },
  init: function(t, e, i, n, r) {
    Rp || ef();
    var o = Ia(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = yu && typeof t.style == "object" && yu(t), this.target = t, this.tween = i, eo = e;
    var a = t._gsap, l = a.get, c = e.duration, h = Bn(c), f = e.preventOvershoot || h && c.overshoot === 0, d = Da(e, "resistance", to.resistance), u = yo(c) ? c : Q_(t, e, h && c.max || 10, h && c.min || 0.2, h && "overshoot" in c ? +c.overshoot : f ? 0 : 1), g, p, _, w, A, C, T, y, O;
    e = eo, eo = 0, O = Kp(t, e, l, d);
    for (g in e)
      Up[g] || (p = e[g], vu(p) && (p = p(n, t, r)), yo(p) ? A = p : Bn(p) && !isNaN(p.velocity) ? A = +p.velocity : o && o.isTracking(g) ? A = o.get(g) : console.warn("ERROR: No velocity was defined for " + t + " property: " + g), C = wc(A, u), y = 0, _ = l(t, g), w = Fp(_), _ = parseFloat(_), Bn(p) && (T = _ + C, "end" in p && (p = qp(p, O && g in O ? O : T, p.max, p.min, g, e.radius, A)), "max" in p && +p.max < T ? f || p.preventOvershoot ? C = p.max - _ : y = p.max - _ - C : "min" in p && +p.min > T && (f || p.preventOvershoot ? C = p.min - _ : y = p.min - _ - C)), this._props.push(g), this.styles && this.styles.save(g), this._pt = new Np(this._pt, t, g, _, 0, X_, 0, a.set(t, g, this)), this._pt.u = w || 0, this._pt.c1 = C, this._pt.c2 = y);
    return i.duration(u), K_;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = _u(e.tween._time / e.tween._dur), t || !Vp())
      for (; i; )
        i.set(i.t, i.p, G_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Xp[s] = Oo[s];
});
Hp() && Ee.registerPlugin(Xp);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let wr, Ms, wu, J_ = () => wu || iy.register(window.gsap), nf = typeof Intl < "u" ? new Intl.Segmenter() : 0, La = (s) => typeof s == "string" ? La(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], sf = (s) => La(s).filter((t) => t instanceof HTMLElement), bu = [], Pl = function() {
}, ty = /\s+/g, rf = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), of = { left: 0, top: 0, width: 0, height: 0 }, af = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || bu), i = s.length, n, r, o, a;
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
}, lf = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Is = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), xu = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: n = "div", aria: r = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", l = i.indexOf("++") > -1, c = (h) => {
    let f = document.createElement(n), d = e.length + 1;
    return i && (f.className = i + (l ? " " + i + d : "")), o && f.style.setProperty("--" + s, d + ""), r !== "none" && f.setAttribute("aria-hidden", "true"), n !== "span" && (f.style.position = "relative", f.style.display = a), f.textContent = h, e.push(f), f;
  };
  return l && (i = i.replace("++", "")), c.collection = e, c;
}, ey = (s, t, e, i) => {
  let n = xu("line", e, i), r = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let l = n("");
    for (l.style.textAlign = r, s.insertBefore(l, t[o]); o < a; o++)
      l.appendChild(t[o]);
    l.normalize();
  };
}, Gp = (s, t, e, i, n, r, o, a, l, c) => {
  var h;
  let f = Array.from(s.childNodes), d = 0, { wordDelimiter: u, reduceWhiteSpace: g = !0, prepareText: p } = t, _ = s.getBoundingClientRect(), w = _, A = !g && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, T = e.collection, y, O, P, S, k, R, V, z, B, Q, it, q, H, tt, ot, b, G, nt;
  for (typeof u == "object" ? (P = u.delimiter || u, O = u.replaceWith || "") : O = u === "" ? "" : u || " ", y = O !== " "; d < f.length; d++)
    if (S = f[d], S.nodeType === 3) {
      for (ot = S.textContent || "", g ? ot = ot.replace(ty, " ") : A && (ot = ot.replace(/\n/g, O + `
`)), p && (ot = p(ot, s)), S.textContent = ot, k = O || P ? ot.split(P || O) : ot.match(a) || bu, G = k[k.length - 1], z = y ? G.slice(-1) === " " : !G, G || k.pop(), w = _, V = y ? k[0].charAt(0) === " " : !k[0], V && Is(" ", s, S), k[0] || k.shift(), af(k, l), r && c || (S.textContent = ""), B = 1; B <= k.length; B++)
        if (b = k[B - 1], !g && A && b.charAt(0) === `
` && ((h = S.previousSibling) == null || h.remove(), Is(document.createElement("br"), s, S), b = b.slice(1)), !g && b === "")
          Is(O, s, S);
        else if (b === " ")
          s.insertBefore(document.createTextNode(" "), S);
        else {
          if (y && b.charAt(0) === " " && Is(" ", s, S), C && B === 1 && !V && T.indexOf(C.parentNode) > -1 ? (R = T[T.length - 1], R.appendChild(document.createTextNode(i ? "" : b))) : (R = e(i ? "" : b), Is(R, s, S), C && B === 1 && !V && R.insertBefore(C, R.firstChild)), i)
            for (it = nf ? af([...nf.segment(b)].map((U) => U.segment), l) : b.match(a) || bu, nt = 0; nt < it.length; nt++)
              R.appendChild(it[nt] === " " ? document.createTextNode(" ") : i(it[nt]));
          if (r && c) {
            if (ot = S.textContent = ot.substring(b.length + 1, ot.length), Q = R.getBoundingClientRect(), Q.top > w.top && Q.left <= w.left) {
              for (q = s.cloneNode(), H = s.childNodes[0]; H && H !== R; )
                tt = H, H = H.nextSibling, q.appendChild(tt);
              s.parentNode.insertBefore(q, s), n && lf(q);
            }
            w = Q;
          }
          (B < k.length || z) && Is(B >= k.length ? " " : y && b.slice(-1) === " " ? " " + O : O, s, S);
        }
      s.removeChild(S), C = 0;
    } else S.nodeType === 1 && (o && o.indexOf(S) > -1 ? (T.indexOf(S.previousSibling) > -1 && T[T.length - 1].appendChild(S), C = S) : (Gp(S, t, e, i, n, r, o, a, l, !0), C = 0), n && lf(S));
};
const jp = class Zp {
  constructor(t, e) {
    this.isSplit = !1, J_(), this.elements = sf(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
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
    }) }, Pl(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: n = !0, smartWrap: r, onSplit: o, autoSplit: a = !1, specialChars: l, mask: c } = this.vars, h = e.indexOf("lines") > -1, f = e.indexOf("chars") > -1, d = e.indexOf("words") > -1, u = f && !d && !h, g = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l), p = g ? new RegExp(g.source + "|" + rf.source, "gu") : rf, _ = !!t.ignore && sf(t.ignore), { orig: w, animTime: A, obs: C } = this._data, T;
    return (f || d || h) && (this.elements.forEach((y, O) => {
      w[O] = {
        element: y,
        html: y.innerHTML,
        ariaL: y.getAttribute("aria-label"),
        ariaH: y.getAttribute("aria-hidden")
      }, i === "auto" ? y.setAttribute("aria-label", (y.textContent || "").trim()) : i === "hidden" && y.setAttribute("aria-hidden", "true");
      let P = [], S = [], k = [], R = f ? xu("char", t, P) : null, V = xu("word", t, S), z, B, Q, it;
      if (Gp(y, t, V, R, u, n && (h || u), _, p, g, !1), h) {
        let q = La(y.childNodes), H = ey(y, q, t, k), tt, ot = [], b = 0, G = q.map((U) => U.nodeType === 1 ? U.getBoundingClientRect() : of), nt = of;
        for (z = 0; z < q.length; z++)
          tt = q[z], tt.nodeType === 1 && (tt.nodeName === "BR" ? (ot.push(tt), H(b, z + 1), b = z + 1, nt = G[b]) : (z && G[z].top > nt.top && G[z].left <= nt.left && (H(b, z), b = z), nt = G[z]));
        b < z && H(b, z), ot.forEach((U) => {
          var rt;
          return (rt = U.parentNode) == null ? void 0 : rt.removeChild(U);
        });
      }
      if (!d) {
        for (z = 0; z < S.length; z++)
          if (B = S[z], f || !B.nextSibling || B.nextSibling.nodeType !== 3)
            if (r && !h) {
              for (Q = document.createElement("span"), Q.style.whiteSpace = "nowrap"; B.firstChild; )
                Q.appendChild(B.firstChild);
              B.replaceWith(Q);
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
    }))), this.isSplit = !0, Ms && (a ? Ms.addEventListener("loadingdone", this._split) : Ms.status === "loading" && console.warn("SplitText called before fonts loaded")), (T = o && o(this)) && T.totalTime && (this._data.anim = A ? T.totalTime(A) : T), h && a && this.elements.forEach((y, O) => {
      w[O].width = y.offsetWidth, C && C.observe(y);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: n, obs: r } = this._data;
    return r && r.disconnect(), i.forEach(({ element: o, html: a, ariaL: l, ariaH: c }) => {
      o.innerHTML = a, l ? o.setAttribute("aria-label", l) : o.removeAttribute("aria-label"), c ? o.setAttribute("aria-hidden", c) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, Ms == null || Ms.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Zp(t, e);
  }
  static register(t) {
    wr = wr || t || window.gsap, wr && (La = wr.utils.toArray, Pl = wr.core.context || Pl), !wu && window.innerWidth > 0 && (Ms = document.fonts, wu = !0);
  }
};
jp.version = "3.13.0";
let iy = jp;
var Ot = ci.registerPlugin(ac) || ci;
Ot.core.Tween;
function ny(s, t) {
  s.indexOf(t) === -1 && s.push(t);
}
function Qp(s, t) {
  const e = s.indexOf(t);
  e > -1 && s.splice(e, 1);
}
const Yn = (s, t, e) => e > t ? t : e < s ? s : e;
function Tu(s, t) {
  return t ? `${s}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : s;
}
let ko = () => {
}, on = () => {
};
process.env.NODE_ENV !== "production" && (ko = (s, t, e) => {
  !s && typeof console < "u" && console.warn(Tu(t, e));
}, on = (s, t, e) => {
  if (!s)
    throw new Error(Tu(t, e));
});
const Tn = {}, Jp = (s) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s);
function tg(s) {
  return typeof s == "object" && s !== null;
}
const eg = (s) => /^0[^.\s]+$/u.test(s);
// @__NO_SIDE_EFFECTS__
function bc(s) {
  let t;
  return () => (t === void 0 && (t = s()), t);
}
const Kn = /* @__NO_SIDE_EFFECTS__ */ (s) => s, sy = (s, t) => (e) => t(s(e)), xc = (...s) => s.reduce(sy), Ka = /* @__NO_SIDE_EFFECTS__ */ (s, t, e) => {
  const i = t - s;
  return i === 0 ? 1 : (e - s) / i;
};
class ig {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return ny(this.subscriptions, t), () => Qp(this.subscriptions, t);
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
const qi = /* @__NO_SIDE_EFFECTS__ */ (s) => s * 1e3, Wi = /* @__NO_SIDE_EFFECTS__ */ (s) => s / 1e3;
function Tc(s, t) {
  return t ? s * (1e3 / t) : 0;
}
const uf = /* @__PURE__ */ new Set();
function Sc(s, t, e) {
  s || uf.has(t) || (console.warn(Tu(t, e)), uf.add(t));
}
const ry = (s, t, e) => {
  const i = t - s;
  return ((e - s) % i + i) % i + s;
}, ng = (s, t, e) => (((1 - 3 * e + 3 * t) * s + (3 * e - 6 * t)) * s + 3 * t) * s, oy = 1e-7, ay = 12;
function ly(s, t, e, i, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = ng(o, i, n) - s, r > 0 ? e = o : t = o;
  while (Math.abs(r) > oy && ++a < ay);
  return o;
}
function Mo(s, t, e, i) {
  if (s === t && e === i)
    return Kn;
  const n = (r) => ly(r, 0, 1, s, e);
  return (r) => r === 0 || r === 1 ? r : ng(n(r), t, i);
}
const sg = (s) => (t) => t <= 0.5 ? s(2 * t) / 2 : (2 - s(2 * (1 - t))) / 2, rg = (s) => (t) => 1 - s(1 - t), og = /* @__PURE__ */ Mo(0.33, 1.53, 0.69, 0.99), Ec = /* @__PURE__ */ rg(og), ag = /* @__PURE__ */ sg(Ec), lg = (s) => (s *= 2) < 1 ? 0.5 * Ec(s) : 0.5 * (2 - Math.pow(2, -10 * (s - 1))), Ac = (s) => 1 - Math.sin(Math.acos(s)), uy = rg(Ac), ug = sg(Ac), cy = /* @__PURE__ */ Mo(0.42, 0, 1, 1), hy = /* @__PURE__ */ Mo(0, 0, 0.58, 1), cg = /* @__PURE__ */ Mo(0.42, 0, 0.58, 1), hg = (s) => Array.isArray(s) && typeof s[0] != "number";
function fg(s, t) {
  return hg(s) ? s[ry(0, s.length, t)] : s;
}
const dg = (s) => Array.isArray(s) && typeof s[0] == "number", cf = {
  linear: Kn,
  easeIn: cy,
  easeInOut: cg,
  easeOut: hy,
  circIn: Ac,
  circInOut: ug,
  circOut: uy,
  backIn: Ec,
  backInOut: ag,
  backOut: og,
  anticipate: lg
}, fy = (s) => typeof s == "string", Su = (s) => {
  if (dg(s)) {
    on(s.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, i, n] = s;
    return Mo(t, e, i, n);
  } else if (fy(s))
    return on(cf[s] !== void 0, `Invalid easing type '${s}'`, "invalid-easing-type"), cf[s];
  return s;
}, ta = [
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
function dy(s, t) {
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
      const g = d && n ? e : i;
      return f && o.add(h), g.has(h) || g.add(h), h;
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
const py = 40;
function pg(s, t) {
  let e = !1, i = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = ta.reduce((C, T) => (C[T] = dy(r), C), {}), { setup: a, read: l, resolveKeyframes: c, preUpdate: h, update: f, preRender: d, render: u, postRender: g } = o, p = () => {
    const C = Tn.useManualTiming ? n.timestamp : performance.now();
    e = !1, Tn.useManualTiming || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(C - n.timestamp, py), 1)), n.timestamp = C, n.isProcessing = !0, a.process(n), l.process(n), c.process(n), h.process(n), f.process(n), d.process(n), u.process(n), g.process(n), n.isProcessing = !1, e && t && (i = !1, s(p));
  }, _ = () => {
    e = !0, i = !0, n.isProcessing || s(p);
  };
  return { schedule: ta.reduce((C, T) => {
    const y = o[T];
    return C[T] = (O, P = !1, S = !1) => (e || _(), y.schedule(O, P, S)), C;
  }, {}), cancel: (C) => {
    for (let T = 0; T < ta.length; T++)
      o[ta[T]].cancel(C);
  }, state: n, steps: o };
}
const { schedule: bi, cancel: vo, state: wo } = /* @__PURE__ */ pg(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Kn, !0);
let ga;
function gy() {
  ga = void 0;
}
const Li = {
  now: () => (ga === void 0 && Li.set(wo.isProcessing || Tn.useManualTiming ? wo.timestamp : performance.now()), ga),
  set: (s) => {
    ga = s, queueMicrotask(gy);
  }
}, gg = (s) => (t) => typeof t == "string" && t.startsWith(s), mg = /* @__PURE__ */ gg("--"), my = /* @__PURE__ */ gg("var(--"), Cc = (s) => my(s) ? _y.test(s.split("/*")[0].trim()) : !1, _y = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, cr = {
  test: (s) => typeof s == "number",
  parse: parseFloat,
  transform: (s) => s
}, bo = {
  ...cr,
  transform: (s) => Yn(0, 1, s)
}, ea = {
  ...cr,
  default: 1
}, io = (s) => Math.round(s * 1e5) / 1e5, Pc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function yy(s) {
  return s == null;
}
const vy = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Oc = (s, t) => (e) => !!(typeof e == "string" && vy.test(e) && e.startsWith(s) || t && !yy(e) && Object.prototype.hasOwnProperty.call(e, t)), _g = (s, t, e) => (i) => {
  if (typeof i != "string")
    return i;
  const [n, r, o, a] = i.match(Pc);
  return {
    [s]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, wy = (s) => Yn(0, 255, s), Ol = {
  ...cr,
  transform: (s) => Math.round(wy(s))
}, ss = {
  test: /* @__PURE__ */ Oc("rgb", "red"),
  parse: /* @__PURE__ */ _g("red", "green", "blue"),
  transform: ({ red: s, green: t, blue: e, alpha: i = 1 }) => "rgba(" + Ol.transform(s) + ", " + Ol.transform(t) + ", " + Ol.transform(e) + ", " + io(bo.transform(i)) + ")"
};
function by(s) {
  let t = "", e = "", i = "", n = "";
  return s.length > 5 ? (t = s.substring(1, 3), e = s.substring(3, 5), i = s.substring(5, 7), n = s.substring(7, 9)) : (t = s.substring(1, 2), e = s.substring(2, 3), i = s.substring(3, 4), n = s.substring(4, 5), t += t, e += e, i += i, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(i, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const Eu = {
  test: /* @__PURE__ */ Oc("#"),
  parse: by,
  transform: ss.transform
}, Io = /* @__NO_SIDE_EFFECTS__ */ (s) => ({
  test: (t) => typeof t == "string" && t.endsWith(s) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${s}`
}), Cn = /* @__PURE__ */ Io("deg"), tr = /* @__PURE__ */ Io("%"), ht = /* @__PURE__ */ Io("px"), xy = /* @__PURE__ */ Io("vh"), Ty = /* @__PURE__ */ Io("vw"), hf = {
  ...tr,
  parse: (s) => tr.parse(s) / 100,
  transform: (s) => tr.transform(s * 100)
}, Bs = {
  test: /* @__PURE__ */ Oc("hsl", "hue"),
  parse: /* @__PURE__ */ _g("hue", "saturation", "lightness"),
  transform: ({ hue: s, saturation: t, lightness: e, alpha: i = 1 }) => "hsla(" + Math.round(s) + ", " + tr.transform(io(t)) + ", " + tr.transform(io(e)) + ", " + io(bo.transform(i)) + ")"
}, me = {
  test: (s) => ss.test(s) || Eu.test(s) || Bs.test(s),
  parse: (s) => ss.test(s) ? ss.parse(s) : Bs.test(s) ? Bs.parse(s) : Eu.parse(s),
  transform: (s) => typeof s == "string" ? s : s.hasOwnProperty("red") ? ss.transform(s) : Bs.transform(s),
  getAnimatableNone: (s) => {
    const t = me.parse(s);
    return t.alpha = 0, me.transform(t);
  }
}, Sy = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ey(s) {
  var t, e;
  return isNaN(s) && typeof s == "string" && (((t = s.match(Pc)) == null ? void 0 : t.length) || 0) + (((e = s.match(Sy)) == null ? void 0 : e.length) || 0) > 0;
}
const yg = "number", vg = "color", Ay = "var", Cy = "var(", ff = "${}", Py = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function xo(s) {
  const t = s.toString(), e = [], i = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(Py, (l) => (me.test(l) ? (i.color.push(r), n.push(vg), e.push(me.parse(l))) : l.startsWith(Cy) ? (i.var.push(r), n.push(Ay), e.push(l)) : (i.number.push(r), n.push(yg), e.push(parseFloat(l))), ++r, ff)).split(ff);
  return { values: e, split: a, indexes: i, types: n };
}
function wg(s) {
  return xo(s).values;
}
function bg(s) {
  const { split: t, types: e } = xo(s), i = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === yg ? r += io(n[o]) : a === vg ? r += me.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const Oy = (s) => typeof s == "number" ? 0 : me.test(s) ? me.getAnimatableNone(s) : s;
function ky(s) {
  const t = wg(s);
  return bg(s)(t.map(Oy));
}
const hr = {
  test: Ey,
  parse: wg,
  createTransformer: bg,
  getAnimatableNone: ky
};
function kl(s, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? s + (t - s) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? s + (t - s) * (2 / 3 - e) * 6 : s;
}
function My({ hue: s, saturation: t, lightness: e, alpha: i }) {
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
function Ra(s, t) {
  return (e) => e > 0 ? t : s;
}
const Do = (s, t, e) => s + (t - s) * e, Ml = (s, t, e) => {
  const i = s * s, n = e * (t * t - i) + i;
  return n < 0 ? 0 : Math.sqrt(n);
}, Iy = [Eu, ss, Bs], Dy = (s) => Iy.find((t) => t.test(s));
function df(s) {
  const t = Dy(s);
  if (ko(!!t, `'${s}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(s);
  return t === Bs && (e = My(e)), e;
}
const pf = (s, t) => {
  const e = df(s), i = df(t);
  if (!e || !i)
    return Ra(s, t);
  const n = { ...e };
  return (r) => (n.red = Ml(e.red, i.red, r), n.green = Ml(e.green, i.green, r), n.blue = Ml(e.blue, i.blue, r), n.alpha = Do(e.alpha, i.alpha, r), ss.transform(n));
}, Au = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ly(s, t) {
  return Au.has(s) ? (e) => e <= 0 ? s : t : (e) => e >= 1 ? t : s;
}
function Ry(s, t) {
  return (e) => Do(s, t, e);
}
function kc(s) {
  return typeof s == "number" ? Ry : typeof s == "string" ? Cc(s) ? Ra : me.test(s) ? pf : Ny : Array.isArray(s) ? xg : typeof s == "object" ? me.test(s) ? pf : zy : Ra;
}
function xg(s, t) {
  const e = [...s], i = e.length, n = s.map((r, o) => kc(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      e[o] = n[o](r);
    return e;
  };
}
function zy(s, t) {
  const e = { ...s, ...t }, i = {};
  for (const n in e)
    s[n] !== void 0 && t[n] !== void 0 && (i[n] = kc(s[n])(s[n], t[n]));
  return (n) => {
    for (const r in i)
      e[r] = i[r](n);
    return e;
  };
}
function Fy(s, t) {
  const e = [], i = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = s.indexes[r][i[r]], a = s.values[o] ?? 0;
    e[n] = a, i[r]++;
  }
  return e;
}
const Ny = (s, t) => {
  const e = hr.createTransformer(t), i = xo(s), n = xo(t);
  return i.indexes.var.length === n.indexes.var.length && i.indexes.color.length === n.indexes.color.length && i.indexes.number.length >= n.indexes.number.length ? Au.has(s) && !n.values.length || Au.has(t) && !i.values.length ? Ly(s, t) : xc(xg(Fy(i, n), n.values), e) : (ko(!0, `Complex values '${s}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ra(s, t));
};
function Tg(s, t, e) {
  return typeof s == "number" && typeof t == "number" && typeof e == "number" ? Do(s, t, e) : kc(s)(s, t);
}
const $y = (s) => {
  const t = ({ timestamp: e }) => s(e);
  return {
    start: (e = !0) => bi.update(t, e),
    stop: () => vo(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wo.isProcessing ? wo.timestamp : Li.now()
  };
}, Sg = (s, t, e = 10) => {
  let i = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    i += Math.round(s(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, za = 2e4;
function Mc(s) {
  let t = 0;
  const e = 50;
  let i = s.next(t);
  for (; !i.done && t < za; )
    t += e, i = s.next(t);
  return t >= za ? 1 / 0 : t;
}
function Eg(s, t = 100, e) {
  const i = e({ ...s, keyframes: [0, t] }), n = Math.min(Mc(i), za);
  return {
    type: "keyframes",
    ease: (r) => i.next(n * r).value / t,
    duration: /* @__PURE__ */ Wi(n)
  };
}
const By = 5;
function Ag(s, t, e) {
  const i = Math.max(t - By, 0);
  return Tc(e - s(i), t - i);
}
const Jt = {
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
}, gf = 1e-3;
function Vy({ duration: s = Jt.duration, bounce: t = Jt.bounce, velocity: e = Jt.velocity, mass: i = Jt.mass }) {
  let n, r;
  ko(s <= /* @__PURE__ */ qi(Jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = Yn(Jt.minDamping, Jt.maxDamping, o), s = Yn(Jt.minDuration, Jt.maxDuration, /* @__PURE__ */ Wi(s)), o < 1 ? (n = (c) => {
    const h = c * o, f = h * s, d = h - e, u = Cu(c, o), g = Math.exp(-f);
    return gf - d / u * g;
  }, r = (c) => {
    const f = c * o * s, d = f * e + e, u = Math.pow(o, 2) * Math.pow(c, 2) * s, g = Math.exp(-f), p = Cu(Math.pow(c, 2), o);
    return (-n(c) + gf > 0 ? -1 : 1) * ((d - u) * g) / p;
  }) : (n = (c) => {
    const h = Math.exp(-c * s), f = (c - e) * s + 1;
    return -1e-3 + h * f;
  }, r = (c) => {
    const h = Math.exp(-c * s), f = (e - c) * (s * s);
    return h * f;
  });
  const a = 5 / s, l = Wy(n, r, a);
  if (s = /* @__PURE__ */ qi(s), isNaN(l))
    return {
      stiffness: Jt.stiffness,
      damping: Jt.damping,
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
const Hy = 12;
function Wy(s, t, e) {
  let i = e;
  for (let n = 1; n < Hy; n++)
    i = i - s(i) / t(i);
  return i;
}
function Cu(s, t) {
  return s * Math.sqrt(1 - t * t);
}
const Yy = ["duration", "bounce"], qy = ["stiffness", "damping", "mass"];
function mf(s, t) {
  return t.some((e) => s[e] !== void 0);
}
function Uy(s) {
  let t = {
    velocity: Jt.velocity,
    stiffness: Jt.stiffness,
    damping: Jt.damping,
    mass: Jt.mass,
    isResolvedFromDuration: !1,
    ...s
  };
  if (!mf(s, qy) && mf(s, Yy))
    if (s.visualDuration) {
      const e = s.visualDuration, i = 2 * Math.PI / (e * 1.2), n = i * i, r = 2 * Yn(0.05, 1, 1 - (s.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Jt.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = Vy(s);
      t = {
        ...t,
        ...e,
        mass: Jt.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function To(s = Jt.visualDuration, t = Jt.bounce) {
  const e = typeof s != "object" ? {
    visualDuration: s,
    keyframes: [0, 1],
    bounce: t
  } : s;
  let { restSpeed: i, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: h, duration: f, velocity: d, isResolvedFromDuration: u } = Uy({
    ...e,
    velocity: -/* @__PURE__ */ Wi(e.velocity || 0)
  }), g = d || 0, p = c / (2 * Math.sqrt(l * h)), _ = o - r, w = /* @__PURE__ */ Wi(Math.sqrt(l / h)), A = Math.abs(_) < 5;
  i || (i = A ? Jt.restSpeed.granular : Jt.restSpeed.default), n || (n = A ? Jt.restDelta.granular : Jt.restDelta.default);
  let C;
  if (p < 1) {
    const y = Cu(w, p);
    C = (O) => {
      const P = Math.exp(-p * w * O);
      return o - P * ((g + p * w * _) / y * Math.sin(y * O) + _ * Math.cos(y * O));
    };
  } else if (p === 1)
    C = (y) => o - Math.exp(-w * y) * (_ + (g + w * _) * y);
  else {
    const y = w * Math.sqrt(p * p - 1);
    C = (O) => {
      const P = Math.exp(-p * w * O), S = Math.min(y * O, 300);
      return o - P * ((g + p * w * _) * Math.sinh(S) + y * _ * Math.cosh(S)) / y;
    };
  }
  const T = {
    calculatedDuration: u && f || null,
    next: (y) => {
      const O = C(y);
      if (u)
        a.done = y >= f;
      else {
        let P = y === 0 ? g : 0;
        p < 1 && (P = y === 0 ? /* @__PURE__ */ qi(g) : Ag(C, y, O));
        const S = Math.abs(P) <= i, k = Math.abs(o - O) <= n;
        a.done = S && k;
      }
      return a.value = a.done ? o : O, a;
    },
    toString: () => {
      const y = Math.min(Mc(T), za), O = Sg((P) => T.next(y * P).value, y, 30);
      return y + "ms " + O;
    },
    toTransition: () => {
    }
  };
  return T;
}
To.applyToOptions = (s) => {
  const t = Eg(s, 100, To);
  return s.ease = t.ease, s.duration = /* @__PURE__ */ qi(t.duration), s.type = "keyframes", s;
};
function Pu({ keyframes: s, velocity: t = 0, power: e = 0.8, timeConstant: i = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: h }) {
  const f = s[0], d = {
    done: !1,
    value: f
  }, u = (S) => a !== void 0 && S < a || l !== void 0 && S > l, g = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let p = e * t;
  const _ = f + p, w = o === void 0 ? _ : o(_);
  w !== _ && (p = w - f);
  const A = (S) => -p * Math.exp(-S / i), C = (S) => w + A(S), T = (S) => {
    const k = A(S), R = C(S);
    d.done = Math.abs(k) <= c, d.value = d.done ? w : R;
  };
  let y, O;
  const P = (S) => {
    u(d.value) && (y = S, O = To({
      keyframes: [d.value, g(d.value)],
      velocity: Ag(C, S, d.value),
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
function Ky(s, t, e) {
  const i = [], n = e || Tn.mix || Tg, r = s.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(s[o], s[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Kn : t;
      a = xc(l, a);
    }
    i.push(a);
  }
  return i;
}
function Cg(s, t, { clamp: e = !0, ease: i, mixer: n } = {}) {
  const r = s.length;
  if (on(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = s[0] === s[1];
  s[0] > s[r - 1] && (s = [...s].reverse(), t = [...t].reverse());
  const a = Ky(t, i, n), l = a.length, c = (h) => {
    if (o && h < s[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < s.length - 2 && !(h < s[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ Ka(s[f], s[f + 1], h);
    return a[f](d);
  };
  return e ? (h) => c(Yn(s[0], s[r - 1], h)) : c;
}
function Pg(s, t) {
  const e = s[s.length - 1];
  for (let i = 1; i <= t; i++) {
    const n = /* @__PURE__ */ Ka(0, t, i);
    s.push(Do(e, 1, n));
  }
}
function Ic(s) {
  const t = [0];
  return Pg(t, s.length - 1), t;
}
function Xy(s, t) {
  return s.map((e) => e * t);
}
function Gy(s, t) {
  return s.map(() => t || cg).splice(0, s.length - 1);
}
function Vs({ duration: s = 300, keyframes: t, times: e, ease: i = "easeInOut" }) {
  const n = hg(i) ? i.map(Su) : Su(i), r = {
    done: !1,
    value: t[0]
  }, o = Xy(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : Ic(t),
    s
  ), a = Cg(o, t, {
    ease: Array.isArray(n) ? n : Gy(t, n)
  });
  return {
    calculatedDuration: s,
    next: (l) => (r.value = a(l), r.done = l >= s, r)
  };
}
const jy = (s) => s !== null;
function Dc(s, { repeat: t, repeatType: e = "loop" }, i, n = 1) {
  const r = s.filter(jy), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Zy = {
  decay: Pu,
  inertia: Pu,
  tween: Vs,
  keyframes: Vs,
  spring: To
};
function Og(s) {
  typeof s.type == "string" && (s.type = Zy[s.type]);
}
class Lc {
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
const Qy = (s) => s / 100;
class Rc extends Lc {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== Li.now() && this.tick(Li.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (i = this.options).onStop) == null || n.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Og(t);
    const { type: e = Vs, repeat: i = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = e || Vs;
    process.env.NODE_ENV !== "production" && l !== Vs && on(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== Vs && typeof a[0] != "number" && (this.mixKeyframes = xc(Qy, Tg(a[0], a[1])), a = [0, 100]);
    const c = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = Mc(c));
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
    const { delay: c = 0, keyframes: h, repeat: f, repeatType: d, repeatDelay: u, type: g, onUpdate: p, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const w = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? w < 0 : w > n;
    this.currentTime = Math.max(w, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let C = this.currentTime, T = i;
    if (f) {
      const S = Math.min(this.currentTime, n) / a;
      let k = Math.floor(S), R = S % 1;
      !R && S >= 1 && (R = 1), R === 1 && k--, k = Math.min(k, f + 1), !!(k % 2) && (d === "reverse" ? (R = 1 - R, u && (R -= u / a)) : d === "mirror" && (T = o)), C = Yn(0, 1, R) * a;
    }
    const y = A ? { done: !1, value: h[0] } : T.next(C);
    r && (y.value = r(y.value));
    let { done: O } = y;
    !A && l !== null && (O = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const P = this.holdTime === null && (this.state === "finished" || this.state === "running" && O);
    return P && g !== Pu && (y.value = Dc(h, this.options, _, this.speed)), p && p(y.value), P && this.finish(), y;
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
    return /* @__PURE__ */ Wi(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Wi(t);
  }
  get time() {
    return /* @__PURE__ */ Wi(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ qi(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(Li.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ Wi(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = $y, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = e ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Li.now()), this.holdTime = this.currentTime;
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
function Jy(s) {
  for (let t = 1; t < s.length; t++)
    s[t] ?? (s[t] = s[t - 1]);
}
const rs = (s) => s * 180 / Math.PI, Ou = (s) => {
  const t = rs(Math.atan2(s[1], s[0]));
  return ku(t);
}, tv = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (s) => (Math.abs(s[0]) + Math.abs(s[3])) / 2,
  rotate: Ou,
  rotateZ: Ou,
  skewX: (s) => rs(Math.atan(s[1])),
  skewY: (s) => rs(Math.atan(s[2])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[2])) / 2
}, ku = (s) => (s = s % 360, s < 0 && (s += 360), s), _f = Ou, yf = (s) => Math.sqrt(s[0] * s[0] + s[1] * s[1]), vf = (s) => Math.sqrt(s[4] * s[4] + s[5] * s[5]), ev = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: yf,
  scaleY: vf,
  scale: (s) => (yf(s) + vf(s)) / 2,
  rotateX: (s) => ku(rs(Math.atan2(s[6], s[5]))),
  rotateY: (s) => ku(rs(Math.atan2(-s[2], s[0]))),
  rotateZ: _f,
  rotate: _f,
  skewX: (s) => rs(Math.atan(s[4])),
  skewY: (s) => rs(Math.atan(s[1])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[4])) / 2
};
function Mu(s) {
  return s.includes("scale") ? 1 : 0;
}
function Iu(s, t) {
  if (!s || s === "none")
    return Mu(t);
  const e = s.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, n;
  if (e)
    i = ev, n = e;
  else {
    const a = s.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = tv, n = a;
  }
  if (!n)
    return Mu(t);
  const r = i[t], o = n[1].split(",").map(nv);
  return typeof r == "function" ? r(o) : o[r];
}
const iv = (s, t) => {
  const { transform: e = "none" } = getComputedStyle(s);
  return Iu(e, t);
};
function nv(s) {
  return parseFloat(s.trim());
}
const fr = [
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
], dr = new Set(fr), wf = (s) => s === cr || s === ht, sv = /* @__PURE__ */ new Set(["x", "y", "z"]), rv = fr.filter((s) => !sv.has(s));
function ov(s) {
  const t = [];
  return rv.forEach((e) => {
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
  x: (s, { transform: t }) => Iu(t, "x"),
  y: (s, { transform: t }) => Iu(t, "y")
};
gs.translateX = gs.x;
gs.translateY = gs.y;
const ms = /* @__PURE__ */ new Set();
let Du = !1, Lu = !1, Ru = !1;
function kg() {
  if (Lu) {
    const s = Array.from(ms).filter((i) => i.needsMeasurement), t = new Set(s.map((i) => i.element)), e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const n = ov(i);
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
  Lu = !1, Du = !1, ms.forEach((s) => s.complete(Ru)), ms.clear();
}
function Mg() {
  ms.forEach((s) => {
    s.readKeyframes(), s.needsMeasurement && (Lu = !0);
  });
}
function av() {
  Ru = !0, Mg(), kg(), Ru = !1;
}
class zc {
  constructor(t, e, i, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = i, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ms.add(this), Du || (Du = !0, bi.read(Mg), bi.resolveKeyframes(kg))) : (this.readKeyframes(), this.complete());
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
    Jy(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), ms.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ms.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const lv = (s) => s.startsWith("--");
function uv(s, t, e) {
  lv(t) ? s.style.setProperty(t, e) : s.style[t] = e;
}
const Ig = /* @__PURE__ */ bc(() => window.ScrollTimeline !== void 0), cv = {};
function hv(s, t) {
  const e = /* @__PURE__ */ bc(s);
  return () => cv[t] ?? e();
}
const Dg = /* @__PURE__ */ hv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), zr = ([s, t, e, i]) => `cubic-bezier(${s}, ${t}, ${e}, ${i})`, bf = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ zr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ zr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ zr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ zr([0.33, 1.53, 0.69, 0.99])
};
function Lg(s, t) {
  if (s)
    return typeof s == "function" ? Dg() ? Sg(s, t) : "ease-out" : dg(s) ? zr(s) : Array.isArray(s) ? s.map((e) => Lg(e, t) || bf.easeOut) : bf[s];
}
function fv(s, t, e, { delay: i = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, c = void 0) {
  const h = {
    [t]: e
  };
  l && (h.offset = l);
  const f = Lg(a, n);
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
function Fc(s) {
  return typeof s == "function" && "applyToOptions" in s;
}
function dv({ type: s, ...t }) {
  return Fc(s) && Dg() ? s.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class pv extends Lc {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: i, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, on(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = dv(t);
    this.animation = fv(e, i, n, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const h = Dc(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(h) : uv(e, i, h), this.animation.cancel();
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
    return /* @__PURE__ */ Wi(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Wi(t);
  }
  get time() {
    return /* @__PURE__ */ Wi(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ qi(t);
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
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Ig() ? (this.animation.timeline = t, Kn) : e(this);
  }
}
const Rg = {
  anticipate: lg,
  backInOut: ag,
  circInOut: ug
};
function gv(s) {
  return s in Rg;
}
function mv(s) {
  typeof s.ease == "string" && gv(s.ease) && (s.ease = Rg[s.ease]);
}
const xf = 10;
class _v extends pv {
  constructor(t) {
    mv(t), Og(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const a = new Rc({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ qi(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(l - xf).value, a.sample(l).value, xf), a.stop();
  }
}
const Tf = (s, t) => t === "zIndex" ? !1 : !!(typeof s == "number" || Array.isArray(s) || typeof s == "string" && // It's animatable if we have a string
(hr.test(s) || s === "0") && // And it contains numbers and/or colors
!s.startsWith("url("));
function yv(s) {
  const t = s[0];
  if (s.length === 1)
    return !0;
  for (let e = 0; e < s.length; e++)
    if (s[e] !== t)
      return !0;
}
function vv(s, t, e, i) {
  const n = s[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = s[s.length - 1], o = Tf(n, t), a = Tf(r, t);
  return ko(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : yv(s) || (e === "spring" || Fc(e)) && i;
}
function zu(s) {
  s.duration = 0, s.type = "keyframes";
}
const wv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), bv = /* @__PURE__ */ bc(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function xv(s) {
  var h;
  const { motionValue: t, name: e, repeatDelay: i, repeatType: n, damping: r, type: o } = s;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: c } = t.owner.getProps();
  return bv() && e && wv.has(e) && (e !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && n !== "mirror" && r !== 0 && o !== "inertia";
}
const Tv = 40;
class Sv extends Lc {
  constructor({ autoplay: t = !0, delay: e = 0, type: i = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: c, element: h, ...f }) {
    var g;
    super(), this.stop = () => {
      var p, _;
      this._animation && (this._animation.stop(), (p = this.stopTimeline) == null || p.call(this)), (_ = this.keyframeResolver) == null || _.cancel();
    }, this.createdAt = Li.now();
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
    }, u = (h == null ? void 0 : h.KeyframeResolver) || zc;
    this.keyframeResolver = new u(a, (p, _, w) => this.onKeyframesResolved(p, _, d, !w), l, c, h), (g = this.keyframeResolver) == null || g.scheduleResolve();
  }
  onKeyframesResolved(t, e, i, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: c, onUpdate: h } = i;
    this.resolvedAt = Li.now(), vv(t, r, o, a) || ((Tn.instantAnimations || !l) && (h == null || h(Dc(t, i, e))), t[0] = t[t.length - 1], zu(i), i.repeat = 0);
    const d = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > Tv ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...i,
      keyframes: t
    }, u = !c && xv(d) ? new _v({
      ...d,
      element: d.motionValue.owner.current
    }) : new Rc(d);
    u.finished.then(() => this.notifyFinished()).catch(Kn), this.pendingTimeline && (this.stopTimeline = u.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = u;
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), av()), this._animation;
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
class Ev {
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
    return Sf(this.animations, "duration");
  }
  get iterationDuration() {
    return Sf(this.animations, "iterationDuration");
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
function Sf(s, t) {
  let e = 0;
  for (let i = 0; i < s.length; i++) {
    const n = s[i][t];
    n !== null && n > e && (e = n);
  }
  return e;
}
class Av extends Ev {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Cv = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Pv(s) {
  const t = Cv.exec(s);
  if (!t)
    return [,];
  const [, e, i, n] = t;
  return [`--${e ?? i}`, n];
}
const Ov = 4;
function zg(s, t, e = 1) {
  on(e <= Ov, `Max CSS variable fallback depth detected in property "${s}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, n] = Pv(s);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return Jp(o) ? parseFloat(o) : o;
  }
  return Cc(n) ? zg(n, t, e + 1) : n;
}
function Fg(s, t) {
  return (s == null ? void 0 : s[t]) ?? (s == null ? void 0 : s.default) ?? s;
}
const Ng = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...fr
]), kv = {
  test: (s) => s === "auto",
  parse: (s) => s
}, $g = (s) => (t) => t.test(s), Bg = [cr, ht, tr, Cn, Ty, xy, kv], Ef = (s) => Bg.find($g(s));
function Mv(s) {
  return typeof s == "number" ? s === 0 : s !== null ? s === "none" || s === "0" || eg(s) : !0;
}
const Iv = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Dv(s) {
  const [t, e] = s.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return s;
  const [i] = e.match(Pc) || [];
  if (!i)
    return s;
  const n = e.replace(i, "");
  let r = Iv.has(t) ? 1 : 0;
  return i !== e && (r *= 100), t + "(" + r + n + ")";
}
const Lv = /\b([a-z-]*)\(.*?\)/gu, Fu = {
  ...hr,
  getAnimatableNone: (s) => {
    const t = s.match(Lv);
    return t ? t.map(Dv).join(" ") : s;
  }
}, Af = {
  ...cr,
  transform: Math.round
}, Rv = {
  rotate: Cn,
  rotateX: Cn,
  rotateY: Cn,
  rotateZ: Cn,
  scale: ea,
  scaleX: ea,
  scaleY: ea,
  scaleZ: ea,
  skew: Cn,
  skewX: Cn,
  skewY: Cn,
  distance: ht,
  translateX: ht,
  translateY: ht,
  translateZ: ht,
  x: ht,
  y: ht,
  z: ht,
  perspective: ht,
  transformPerspective: ht,
  opacity: bo,
  originX: hf,
  originY: hf,
  originZ: ht
}, Nc = {
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
  ...Rv,
  zIndex: Af,
  // SVG
  fillOpacity: bo,
  strokeOpacity: bo,
  numOctaves: Af
}, zv = {
  ...Nc,
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
  filter: Fu,
  WebkitFilter: Fu
}, Vg = (s) => zv[s];
function Hg(s, t) {
  let e = Vg(s);
  return e !== Fu && (e = hr), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const Fv = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Nv(s, t, e) {
  let i = 0, n;
  for (; i < s.length && !n; ) {
    const r = s[i];
    typeof r == "string" && !Fv.has(r) && xo(r).values.length && (n = s[i]), i++;
  }
  if (n && e)
    for (const r of t)
      s[r] = Hg(e, n);
}
class $v extends zc {
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
      if (typeof c == "string" && (c = c.trim(), Cc(c))) {
        const h = zg(c, e.current);
        h !== void 0 && (t[l] = h), l === t.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Ng.has(i) || t.length !== 2)
      return;
    const [n, r] = t, o = Ef(n), a = Ef(r);
    if (o !== a)
      if (wf(o) && wf(a))
        for (let l = 0; l < t.length; l++) {
          const c = t[l];
          typeof c == "string" && (t[l] = parseFloat(c));
        }
      else gs[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, i = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || Mv(t[n])) && i.push(n);
    i.length && Nv(t, i, e);
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
    i[r] = gs[e](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, c]) => {
      t.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
function Wg(s, t, e) {
  if (s instanceof EventTarget)
    return [s];
  if (typeof s == "string") {
    let i = document;
    const n = (e == null ? void 0 : e[s]) ?? i.querySelectorAll(s);
    return n ? Array.from(n) : [];
  }
  return Array.from(s);
}
const Yg = (s, t) => t && typeof s == "number" ? t.transform(s) : s;
function Bv(s) {
  return tg(s) && "offsetHeight" in s;
}
const Cf = 30, Vv = (s) => !isNaN(parseFloat(s));
class Hv {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const n = Li.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Li.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Vv(this.current));
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
    return process.env.NODE_ENV !== "production" && Sc(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new ig());
    const i = this.events[t].add(e);
    return t === "change" ? () => {
      i(), bi.read(() => {
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
    const t = Li.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Cf)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, Cf);
    return Tc(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function So(s, t) {
  return new Hv(s, t);
}
const { schedule: Wv } = /* @__PURE__ */ pg(queueMicrotask, !1);
function $c(s) {
  return tg(s) && "ownerSVGElement" in s;
}
const ma = /* @__PURE__ */ new WeakMap();
let Pn;
const qg = (s, t, e) => (i, n) => n && n[0] ? n[0][s + "Size"] : $c(i) && "getBBox" in i ? i.getBBox()[t] : i[e], Yv = /* @__PURE__ */ qg("inline", "width", "offsetWidth"), qv = /* @__PURE__ */ qg("block", "height", "offsetHeight");
function Uv({ target: s, borderBoxSize: t }) {
  var e;
  (e = ma.get(s)) == null || e.forEach((i) => {
    i(s, {
      get width() {
        return Yv(s, t);
      },
      get height() {
        return qv(s, t);
      }
    });
  });
}
function Kv(s) {
  s.forEach(Uv);
}
function Xv() {
  typeof ResizeObserver > "u" || (Pn = new ResizeObserver(Kv));
}
function Gv(s, t) {
  Pn || Xv();
  const e = Wg(s);
  return e.forEach((i) => {
    let n = ma.get(i);
    n || (n = /* @__PURE__ */ new Set(), ma.set(i, n)), n.add(t), Pn == null || Pn.observe(i);
  }), () => {
    e.forEach((i) => {
      const n = ma.get(i);
      n == null || n.delete(t), n != null && n.size || Pn == null || Pn.unobserve(i);
    });
  };
}
const _a = /* @__PURE__ */ new Set();
let Hs;
function jv() {
  Hs = () => {
    const s = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    _a.forEach((t) => t(s));
  }, window.addEventListener("resize", Hs);
}
function Zv(s) {
  return _a.add(s), Hs || jv(), () => {
    _a.delete(s), !_a.size && typeof Hs == "function" && (window.removeEventListener("resize", Hs), Hs = void 0);
  };
}
function Qv(s, t) {
  return typeof s == "function" ? Zv(s) : Gv(s, t);
}
function Ug(s, t) {
  let e;
  const i = () => {
    const { currentTime: n } = t, o = (n === null ? 0 : n.value) / 100;
    e !== o && s(o), e = o;
  };
  return bi.preUpdate(i, !0), () => vo(i);
}
function Jv(s) {
  return $c(s) && s.tagName === "svg";
}
function tw(s, t) {
  if (s === "first")
    return 0;
  {
    const e = t - 1;
    return s === "last" ? e : e / 2;
  }
}
function Fa(s = 0.1, { startDelay: t = 0, from: e = 0, ease: i } = {}) {
  return (n, r) => {
    const o = typeof e == "number" ? e : tw(e, r), a = Math.abs(o - n);
    let l = s * a;
    if (i) {
      const c = r * s;
      l = Su(i)(l / c) * c;
    }
    return t + l;
  };
}
const ni = (s) => !!(s && s.getVelocity), ew = [...Bg, me, hr], iw = (s) => ew.find($g(s));
function Bc(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function Kg(s, t, e, i) {
  return typeof s == "string" && Bc(t) ? Wg(s, e, i) : s instanceof NodeList ? Array.from(s) : Array.isArray(s) ? s : [s];
}
function nw(s, t, e) {
  return s * (t + 1);
}
function Pf(s, t, e, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, s + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : i.get(t) ?? s;
}
function sw(s, t, e) {
  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    n.at > t && n.at < e && (Qp(s, n), i--);
  }
}
function rw(s, t, e, i, n, r) {
  sw(s, n, r);
  for (let o = 0; o < t.length; o++)
    s.push({
      value: t[o],
      at: Do(n, r, i[o]),
      easing: fg(e, o)
    });
}
function ow(s, t) {
  for (let e = 0; e < s.length; e++)
    s[e] = s[e] / (t + 1);
}
function aw(s, t) {
  return s.at === t.at ? s.value === null ? 1 : t.value === null ? -1 : 0 : s.at - t.at;
}
const lw = "easeInOut", uw = 20;
function cw(s, { defaultTransition: t = {}, ...e } = {}, i, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let h = 0, f = 0, d = 0;
  for (let u = 0; u < s.length; u++) {
    const g = s[u];
    if (typeof g == "string") {
      c.set(g, f);
      continue;
    } else if (!Array.isArray(g)) {
      c.set(g.name, Pf(f, g.at, h, c));
      continue;
    }
    let [p, _, w = {}] = g;
    w.at !== void 0 && (f = Pf(f, w.at, h, c));
    let A = 0;
    const C = (T, y, O, P = 0, S = 0) => {
      const k = hw(T), { delay: R = 0, times: V = Ic(k), type: z = "keyframes", repeat: B, repeatType: Q, repeatDelay: it = 0, ...q } = y;
      let { ease: H = t.ease || "easeOut", duration: tt } = y;
      const ot = typeof R == "function" ? R(P, S) : R, b = k.length, G = Fc(z) ? z : n == null ? void 0 : n[z || "keyframes"];
      if (b <= 2 && G) {
        let Lt = 100;
        if (b === 2 && pw(k)) {
          const lt = k[1] - k[0];
          Lt = Math.abs(lt);
        }
        const mt = { ...q };
        tt !== void 0 && (mt.duration = /* @__PURE__ */ qi(tt));
        const Ct = Eg(mt, Lt, G);
        H = Ct.ease, tt = Ct.duration;
      }
      tt ?? (tt = r);
      const nt = f + ot;
      V.length === 1 && V[0] === 0 && (V[1] = 1);
      const U = V.length - k.length;
      if (U > 0 && Pg(V, U), k.length === 1 && k.unshift(null), B) {
        on(B < uw, "Repeat count too high, must be less than 20", "repeat-count-high"), tt = nw(tt, B);
        const Lt = [...k], mt = [...V];
        H = Array.isArray(H) ? [...H] : [H];
        const Ct = [...H];
        for (let lt = 0; lt < B; lt++) {
          k.push(...Lt);
          for (let zt = 0; zt < Lt.length; zt++)
            V.push(mt[zt] + (lt + 1)), H.push(zt === 0 ? "linear" : fg(Ct, zt - 1));
        }
        ow(V, B);
      }
      const rt = nt + tt;
      rw(O, k, H, V, nt, rt), A = Math.max(ot + tt, A), d = Math.max(rt, d);
    };
    if (ni(p)) {
      const T = Of(p, a);
      C(_, w, kf("default", T));
    } else {
      const T = Kg(p, _, i, l), y = T.length;
      for (let O = 0; O < y; O++) {
        _ = _, w = w;
        const P = T[O], S = Of(P, a);
        for (const k in _)
          C(_[k], fw(w, k), kf(k, S), O, y);
      }
    }
    h = f, f += A;
  }
  return a.forEach((u, g) => {
    for (const p in u) {
      const _ = u[p];
      _.sort(aw);
      const w = [], A = [], C = [];
      for (let y = 0; y < _.length; y++) {
        const { at: O, value: P, easing: S } = _[y];
        w.push(P), A.push(/* @__PURE__ */ Ka(0, d, O)), C.push(S || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), w.unshift(w[0]), C.unshift(lw)), A[A.length - 1] !== 1 && (A.push(1), w.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const T = o.get(g);
      T.keyframes[p] = w, T.transition[p] = {
        ...t,
        duration: d,
        ease: C,
        times: A,
        ...e
      };
    }
  }), o;
}
function Of(s, t) {
  return !t.has(s) && t.set(s, {}), t.get(s);
}
function kf(s, t) {
  return t[s] || (t[s] = []), t[s];
}
function hw(s) {
  return Array.isArray(s) ? s : [s];
}
function fw(s, t) {
  return s && s[t] ? {
    ...s,
    ...s[t]
  } : { ...s };
}
const dw = (s) => typeof s == "number", pw = (s) => s.every(dw), Eo = /* @__PURE__ */ new WeakMap(), gw = (s) => Array.isArray(s);
function Mf(s) {
  const t = [{}, {}];
  return s == null || s.values.forEach((e, i) => {
    t[0][i] = e.get(), t[1][i] = e.getVelocity();
  }), t;
}
function Xg(s, t, e, i) {
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
function mw(s, t, e) {
  const i = s.getProps();
  return Xg(i, t, i.custom, s);
}
function _w(s, t, e) {
  s.hasValue(t) ? s.getValue(t).set(e) : s.addValue(t, So(e));
}
function yw(s) {
  return gw(s) ? s[s.length - 1] || 0 : s;
}
function vw(s, t) {
  const e = mw(s, t);
  let { transitionEnd: i = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = yw(r[o]);
    _w(s, o, a);
  }
}
function ww(s) {
  return !!(ni(s) && s.add);
}
function bw(s, t) {
  const e = s.getValue("willChange");
  if (ww(e))
    return e.add(t);
  if (!e && Tn.WillChange) {
    const i = new Tn.WillChange("auto");
    s.addValue("willChange", i), i.add(t);
  }
}
const Vc = (s) => s.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), xw = "framerAppearId", Tw = "data-" + Vc(xw);
function Sw(s) {
  return s.props[Tw];
}
const Ew = (s) => s !== null;
function Aw(s, { repeat: t, repeatType: e = "loop" }, i) {
  const n = s.filter(Ew), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const Cw = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Pw = (s) => ({
  type: "spring",
  stiffness: 550,
  damping: s === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Ow = {
  type: "keyframes",
  duration: 0.8
}, kw = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Mw = (s, { keyframes: t }) => t.length > 2 ? Ow : dr.has(s) ? s.startsWith("scale") ? Pw(t[1]) : Cw : kw;
function Iw({ when: s, delay: t, delayChildren: e, staggerChildren: i, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...h }) {
  return !!Object.keys(h).length;
}
const Gg = (s, t, e, i = {}, n, r) => (o) => {
  const a = Fg(i, s) || {}, l = a.delay || i.delay || 0;
  let { elapsed: c = 0 } = i;
  c = c - /* @__PURE__ */ qi(l);
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
  Iw(a) || Object.assign(h, Mw(s, h)), h.duration && (h.duration = /* @__PURE__ */ qi(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ qi(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let f = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (zu(h), h.delay === 0 && (f = !0)), (Tn.instantAnimations || Tn.skipAnimations) && (f = !0, zu(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, f && !r && t.get() !== void 0) {
    const d = Aw(h.keyframes, a);
    if (d !== void 0) {
      bi.update(() => {
        h.onUpdate(d), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Rc(h) : new Sv(h);
};
function Dw({ protectedKeys: s, needsAnimating: t }, e) {
  const i = s.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, i;
}
function Lw(s, t, { delay: e = 0, transitionOverride: i, type: n } = {}) {
  let { transition: r = s.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (r = i);
  const l = [], c = n && s.animationState && s.animationState.getState()[n];
  for (const h in a) {
    const f = s.getValue(h, s.latestValues[h] ?? null), d = a[h];
    if (d === void 0 || c && Dw(c, h))
      continue;
    const u = {
      delay: e,
      ...Fg(r || {}, h)
    }, g = f.get();
    if (g !== void 0 && !f.isAnimating && !Array.isArray(d) && d === g && !u.velocity)
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const w = Sw(s);
      if (w) {
        const A = window.MotionHandoffAnimation(w, h, bi);
        A !== null && (u.startTime = A, p = !0);
      }
    }
    bw(s, h), f.start(Gg(h, f, d, s.shouldReduceMotion && Ng.has(h) ? { type: !1 } : u, s, p));
    const _ = f.animation;
    _ && l.push(_);
  }
  return o && Promise.all(l).then(() => {
    bi.update(() => {
      o && vw(s, o);
    });
  }), l;
}
function Rw({ top: s, left: t, right: e, bottom: i }) {
  return {
    x: { min: t, max: e },
    y: { min: s, max: i }
  };
}
function zw(s, t) {
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
function Fw(s, t) {
  return Rw(zw(s.getBoundingClientRect(), t));
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
}, Nu = {};
for (const s in If)
  Nu[s] = {
    isEnabled: (t) => If[s].some((e) => !!t[e])
  };
const Df = () => ({ min: 0, max: 0 }), Hc = () => ({
  x: Df(),
  y: Df()
}), Nw = typeof window < "u", $u = { current: null }, jg = { current: !1 };
function $w() {
  if (jg.current = !0, !!Nw)
    if (window.matchMedia) {
      const s = window.matchMedia("(prefers-reduced-motion)"), t = () => $u.current = s.matches;
      s.addEventListener("change", t), t();
    } else
      $u.current = !1;
}
function Bw(s) {
  return s !== null && typeof s == "object" && typeof s.start == "function";
}
function Vw(s) {
  return typeof s == "string" || Array.isArray(s);
}
const Hw = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ww = ["initial", ...Hw];
function Zg(s) {
  return Bw(s.animate) || Ww.some((t) => Vw(s[t]));
}
function Yw(s) {
  return !!(Zg(s) || s.variants);
}
function qw(s, t, e) {
  for (const i in t) {
    const n = t[i], r = e[i];
    if (ni(n))
      s.addValue(i, n);
    else if (ni(r))
      s.addValue(i, So(n, { owner: s }));
    else if (r !== n)
      if (s.hasValue(i)) {
        const o = s.getValue(i);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = s.getStaticValue(i);
        s.addValue(i, So(o !== void 0 ? o : n, { owner: s }));
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
class Qg {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = zc, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = Li.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, bi.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = e.initial ? { ...l } : {}, this.renderState = c, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Zg(e), this.isVariantNode = Yw(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const d in f) {
      const u = f[d];
      l[d] !== void 0 && ni(u) && u.set(l[d]);
    }
  }
  mount(t) {
    var e;
    this.current = t, Eo.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, n) => this.bindToMotionValue(n, i)), jg.current || $w(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : $u.current, process.env.NODE_ENV !== "production" && Sc(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), vo(this.notifyUpdate), vo(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
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
    const i = dr.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && bi.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (t in Nu) {
      const e = Nu[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Hc();
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
    this.prevMotionValues = qw(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && e !== void 0 && (i = So(e === null ? void 0 : e, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (Jp(i) || eg(i)) ? i = parseFloat(i) : !iw(i) && hr.test(e) && (i = Hg(t, e)), this.setBaseTarget(t, ni(i) ? i.get() : i)), ni(i) ? i.get() : i;
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
      const o = Xg(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (e && i !== void 0)
      return i;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !ni(n) ? n : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new ig()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    Wv.render(this.render);
  }
}
class Jg extends Qg {
  constructor() {
    super(...arguments), this.KeyframeResolver = $v;
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
    ni(t) && (this.childSubscription = t.on("change", (e) => {
      this.current && (this.current.textContent = `${e}`);
    }));
  }
}
const Uw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Kw = fr.length;
function Xw(s, t, e) {
  let i = "", n = !0;
  for (let r = 0; r < Kw; r++) {
    const o = fr[r], a = s[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || e) {
      const c = Yg(a, Nc[o]);
      if (!l) {
        n = !1;
        const h = Uw[o] || o;
        i += `${h}(${c}) `;
      }
      e && (t[o] = c);
    }
  }
  return i = i.trim(), e ? i = e(t, n ? "" : i) : n && (i = "none"), i;
}
function tm(s, t, e) {
  const { style: i, vars: n, transformOrigin: r } = s;
  let o = !1, a = !1;
  for (const l in t) {
    const c = t[l];
    if (dr.has(l)) {
      o = !0;
      continue;
    } else if (mg(l)) {
      n[l] = c;
      continue;
    } else {
      const h = Yg(c, Nc[l]);
      l.startsWith("origin") ? (a = !0, r[l] = h) : i[l] = h;
    }
  }
  if (t.transform || (o || e ? i.transform = Xw(t, s.transform, e) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: h = 0 } = r;
    i.transformOrigin = `${l} ${c} ${h}`;
  }
}
function em(s, { style: t, vars: e }, i, n) {
  const r = s.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, i);
  for (o in e)
    r.setProperty(o, e[o]);
}
const Gw = {};
function jw(s, { layout: t, layoutId: e }) {
  return dr.has(s) || s.startsWith("origin") || (t || e !== void 0) && (!!Gw[s] || s === "opacity");
}
function im(s, t, e) {
  var r;
  const { style: i } = s, n = {};
  for (const o in i)
    (ni(i[o]) || t.style && ni(t.style[o]) || jw(o, s) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = i[o]);
  return n;
}
function Zw(s) {
  return window.getComputedStyle(s);
}
class Qw extends Jg {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = em;
  }
  readValueFromInstance(t, e) {
    var i;
    if (dr.has(e))
      return (i = this.projection) != null && i.isProjecting ? Mu(e) : iv(t, e);
    {
      const n = Zw(t), r = (mg(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return Fw(t, e);
  }
  build(t, e, i) {
    tm(t, e, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return im(t, e, i);
  }
}
function Jw(s, t) {
  return s in t;
}
class tb extends Qg {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (Jw(e, t)) {
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
    return Hc();
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
const eb = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ib = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function nb(s, t, e = 1, i = 0, n = !0) {
  s.pathLength = 1;
  const r = n ? eb : ib;
  s[r.offset] = ht.transform(-i);
  const o = ht.transform(t), a = ht.transform(e);
  s[r.array] = `${o} ${a}`;
}
function sb(s, {
  attrX: t,
  attrY: e,
  attrScale: i,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, c, h) {
  if (tm(s, a, c), l) {
    s.style.viewBox && (s.attrs.viewBox = s.style.viewBox);
    return;
  }
  s.attrs = s.style, s.style = {};
  const { attrs: f, style: d } = s;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), e !== void 0 && (f.y = e), i !== void 0 && (f.scale = i), n !== void 0 && nb(f, n, r, o, !1);
}
const nm = /* @__PURE__ */ new Set([
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
]), rb = (s) => typeof s == "string" && s.toLowerCase() === "svg";
function ob(s, t, e, i) {
  em(s, t, void 0, i);
  for (const n in t.attrs)
    s.setAttribute(nm.has(n) ? n : Vc(n), t.attrs[n]);
}
function ab(s, t, e) {
  const i = im(s, t, e);
  for (const n in s)
    if (ni(s[n]) || ni(t[n])) {
      const r = fr.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      i[r] = s[n];
    }
  return i;
}
class lb extends Jg {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Hc;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (dr.has(e)) {
      const i = Vg(e);
      return i && i.default || 0;
    }
    return e = nm.has(e) ? e : Vc(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return ab(t, e, i);
  }
  build(t, e, i) {
    sb(t, e, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, e, i, n) {
    ob(t, e, i, n);
  }
  mount(t) {
    this.isSVGTag = rb(t.tagName), super.mount(t);
  }
}
function ub(s) {
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
  }, e = $c(s) && !Jv(s) ? new lb(t) : new Qw(t);
  e.mount(s), Eo.set(s, e);
}
function cb(s) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new tb(t);
  e.mount(s), Eo.set(s, e);
}
function hb(s, t, e) {
  const i = ni(s) ? s : So(s);
  return i.start(Gg("", i, t, e)), i.animation;
}
function fb(s, t) {
  return ni(s) || typeof s == "number" || typeof s == "string" && !Bc(t);
}
function sm(s, t, e, i) {
  const n = [];
  if (fb(s, t))
    n.push(hb(s, Bc(t) && t.default || t, e && (e.default || e)));
  else {
    const r = Kg(s, t, i), o = r.length;
    on(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a];
      on(l !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const c = l instanceof Element ? ub : cb;
      Eo.has(l) || c(l);
      const h = Eo.get(l), f = { ...e };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), n.push(...Lw(h, { ...t, transition: f }, {}));
    }
  }
  return n;
}
function db(s, t, e) {
  const i = [];
  return cw(s, t, e, { spring: To }).forEach(({ keyframes: r, transition: o }, a) => {
    i.push(...sm(a, r, o));
  }), i;
}
function pb(s) {
  return Array.isArray(s) && s.some(Array.isArray);
}
function gb(s) {
  function t(e, i, n) {
    let r = [], o;
    if (pb(e))
      r = db(e, i, s);
    else {
      const { onComplete: l, ...c } = n || {};
      typeof l == "function" && (o = l), r = sm(e, i, c, s);
    }
    const a = new Av(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const J = gb(), mb = 50, Rf = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), _b = () => ({
  time: 0,
  x: Rf(),
  y: Rf()
}), yb = {
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
  const n = e[t], { length: r, position: o } = yb[t], a = n.current, l = e.time;
  n.current = s[`scroll${o}`], n.scrollLength = s[`scroll${r}`] - s[`client${r}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = /* @__PURE__ */ Ka(0, n.scrollLength, n.current);
  const c = i - l;
  n.velocity = c > mb ? 0 : Tc(n.current - a, c);
}
function vb(s, t, e) {
  zf(s, "x", t, e), zf(s, "y", t, e), t.time = e;
}
function wb(s, t) {
  const e = { x: 0, y: 0 };
  let i = s;
  for (; i && i !== t; )
    if (Bv(i))
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
const Bu = {
  start: 0,
  center: 0.5,
  end: 1
};
function Ff(s, t, e = 0) {
  let i = 0;
  if (s in Bu && (s = Bu[s]), typeof s == "string") {
    const n = parseFloat(s);
    s.endsWith("px") ? i = n : s.endsWith("%") ? s = n / 100 : s.endsWith("vw") ? i = n / 100 * document.documentElement.clientWidth : s.endsWith("vh") ? i = n / 100 * document.documentElement.clientHeight : s = n;
  }
  return typeof s == "number" && (i = t * s), e + i;
}
const bb = [0, 0];
function xb(s, t, e, i) {
  let n = Array.isArray(s) ? s : bb, r = 0, o = 0;
  return typeof s == "number" ? n = [s, s] : typeof s == "string" && (s = s.trim(), s.includes(" ") ? n = s.split(" ") : n = [s, Bu[s] ? s : "0"]), r = Ff(n[0], e, i), o = Ff(n[1], t), r - o;
}
const Tb = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, Sb = { x: 0, y: 0 };
function Eb(s) {
  return "getBBox" in s && s.tagName !== "svg" ? s.getBBox() : { width: s.clientWidth, height: s.clientHeight };
}
function Ab(s, t, e) {
  const { offset: i = Tb.All } = e, { target: n = s, axis: r = "y" } = e, o = r === "y" ? "height" : "width", a = n !== s ? wb(n, s) : Sb, l = n === s ? { width: s.scrollWidth, height: s.scrollHeight } : Eb(n), c = {
    width: s.clientWidth,
    height: s.clientHeight
  };
  t[r].offset.length = 0;
  let h = !t[r].interpolate;
  const f = i.length;
  for (let d = 0; d < f; d++) {
    const u = xb(i[d], c[o], l[o], a[r]);
    !h && u !== t[r].interpolatorOffsets[d] && (h = !0), t[r].offset[d] = u;
  }
  h && (t[r].interpolate = Cg(t[r].offset, Ic(i), { clamp: !1 }), t[r].interpolatorOffsets = [...t[r].offset]), t[r].progress = Yn(0, 1, t[r].interpolate(t[r].current));
}
function Cb(s, t = s, e) {
  if (e.x.targetOffset = 0, e.y.targetOffset = 0, t !== s) {
    let i = t;
    for (; i && i !== s; )
      e.x.targetOffset += i.offsetLeft, e.y.targetOffset += i.offsetTop, i = i.offsetParent;
  }
  e.x.targetLength = t === s ? t.scrollWidth : t.clientWidth, e.y.targetLength = t === s ? t.scrollHeight : t.clientHeight, e.x.containerLength = s.clientWidth, e.y.containerLength = s.clientHeight, process.env.NODE_ENV !== "production" && s && t && t !== s && Sc(getComputedStyle(s).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function Pb(s, t, e, i = {}) {
  return {
    measure: (n) => {
      Cb(s, i.target, e), vb(s, e, n), (i.offset || i.target) && Ab(s, e, i);
    },
    notify: () => t(e)
  };
}
const br = /* @__PURE__ */ new WeakMap(), Nf = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), $f = (s) => s === document.scrollingElement ? window : s;
function rm(s, { container: t = document.scrollingElement, ...e } = {}) {
  if (!t)
    return Kn;
  let i = Il.get(t);
  i || (i = /* @__PURE__ */ new Set(), Il.set(t, i));
  const n = _b(), r = Pb(t, s, n, e);
  if (i.add(r), !br.has(t)) {
    const a = () => {
      for (const f of i)
        f.measure(wo.timestamp);
      bi.preUpdate(l);
    }, l = () => {
      for (const f of i)
        f.notify();
    }, c = () => bi.read(a);
    br.set(t, c);
    const h = $f(t);
    window.addEventListener("resize", c, { passive: !0 }), t !== document.documentElement && Nf.set(t, Qv(t, c)), h.addEventListener("scroll", c, { passive: !0 }), c();
  }
  const o = br.get(t);
  return bi.read(o, !1, !0), () => {
    var c;
    vo(o);
    const a = Il.get(t);
    if (!a || (a.delete(r), a.size))
      return;
    const l = br.get(t);
    br.delete(t), l && ($f(t).removeEventListener("scroll", l), (c = Nf.get(t)) == null || c(), window.removeEventListener("resize", l));
  };
}
const Bf = /* @__PURE__ */ new Map();
function Ob(s) {
  const t = { value: 0 }, e = rm((i) => {
    t.value = i[s.axis].progress * 100;
  }, s);
  return { currentTime: t, cancel: e };
}
function om({ source: s, container: t, ...e }) {
  const { axis: i } = e;
  s && (t = s);
  const n = Bf.get(t) ?? /* @__PURE__ */ new Map();
  Bf.set(t, n);
  const r = e.target ?? "self", o = n.get(r) ?? {}, a = i + (e.offset ?? []).join(",");
  return o[a] || (o[a] = !e.target && Ig() ? new ScrollTimeline({ source: t, axis: i }) : Ob({ container: t, ...e })), o[a];
}
function kb(s, t) {
  const e = om(t);
  return s.attachTimeline({
    timeline: t.target ? void 0 : e,
    observe: (i) => (i.pause(), Ug((n) => {
      i.time = i.iterationDuration * n;
    }, e))
  });
}
function Mb(s) {
  return s.length === 2;
}
function Ib(s, t) {
  return Mb(s) ? rm((e) => {
    s(e[t.axis].progress, e);
  }, t) : Ug(s, om(t));
}
function p1(s, { axis: t = "y", container: e = document.scrollingElement, ...i } = {}) {
  if (!e)
    return Kn;
  const n = { axis: t, container: e, ...i };
  return typeof s == "function" ? Ib(s, n) : kb(s, n);
}
var ia = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Db(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Fr = { exports: {} };
Fr.exports;
var Vf;
function Lb() {
  return Vf || (Vf = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", d = "[object Error]", u = "[object Function]", g = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", w = "[object Null]", A = "[object Object]", C = "[object Proxy]", T = "[object RegExp]", y = "[object Set]", O = "[object String]", P = "[object Undefined]", S = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", V = "[object Float32Array]", z = "[object Float64Array]", B = "[object Int8Array]", Q = "[object Int16Array]", it = "[object Int32Array]", q = "[object Uint8Array]", H = "[object Uint8ClampedArray]", tt = "[object Uint16Array]", ot = "[object Uint32Array]", b = /[\\^$.*+?()[\]{}|]/g, G = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, U = {};
    U[V] = U[z] = U[B] = U[Q] = U[it] = U[q] = U[H] = U[tt] = U[ot] = !0, U[a] = U[l] = U[k] = U[h] = U[R] = U[f] = U[d] = U[u] = U[p] = U[_] = U[A] = U[T] = U[y] = U[O] = U[S] = !1;
    var rt = typeof ia == "object" && ia && ia.Object === Object && ia, Lt = typeof self == "object" && self && self.Object === Object && self, mt = rt || Lt || Function("return this")(), Ct = t && !t.nodeType && t, lt = Ct && !0 && s && !s.nodeType && s, zt = lt && lt.exports === Ct, se = zt && rt.process, Bt = function() {
      try {
        var m = lt && lt.require && lt.require("util").types;
        return m || se && se.binding && se.binding("util");
      } catch {
      }
    }(), Ut = Bt && Bt.isTypedArray;
    function pt(m, x, L) {
      switch (L.length) {
        case 0:
          return m.call(x);
        case 1:
          return m.call(x, L[0]);
        case 2:
          return m.call(x, L[0], L[1]);
        case 3:
          return m.call(x, L[0], L[1], L[2]);
      }
      return m.apply(x, L);
    }
    function gt(m, x) {
      for (var L = -1, Z = Array(m); ++L < m; )
        Z[L] = x(L);
      return Z;
    }
    function ut(m) {
      return function(x) {
        return m(x);
      };
    }
    function Ce(m, x) {
      return m == null ? void 0 : m[x];
    }
    function I(m, x) {
      return function(L) {
        return m(x(L));
      };
    }
    var Vt = Array.prototype, Ke = Function.prototype, Ie = Object.prototype, Ft = mt["__core-js_shared__"], $t = Ke.toString, ce = Ie.hasOwnProperty, Xe = function() {
      var m = /[^.]+$/.exec(Ft && Ft.keys && Ft.keys.IE_PROTO || "");
      return m ? "Symbol(src)_1." + m : "";
    }(), Xt = Ie.toString, re = $t.call(Object), kt = RegExp(
      "^" + $t.call(ce).replace(b, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), he = zt ? mt.Buffer : void 0, De = mt.Symbol, Fe = mt.Uint8Array;
    he && he.allocUnsafe;
    var Ki = I(Object.getPrototypeOf, Object), Kt = Object.create, Xi = Ie.propertyIsEnumerable, si = Vt.splice, ve = De ? De.toStringTag : void 0, Le = function() {
      try {
        var m = Za(Object, "defineProperty");
        return m({}, "", {}), m;
      } catch {
      }
    }(), Si = he ? he.isBuffer : void 0, Ne = Math.max, at = Date.now, $e = Za(mt, "Map"), Nt = Za(Object, "create"), Pe = /* @__PURE__ */ function() {
      function m() {
      }
      return function(x) {
        if (!cn(x))
          return {};
        if (Kt)
          return Kt(x);
        m.prototype = x;
        var L = new m();
        return m.prototype = void 0, L;
      };
    }();
    function ie(m) {
      var x = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++x < L; ) {
        var Z = m[x];
        this.set(Z[0], Z[1]);
      }
    }
    function Ei() {
      this.__data__ = Nt ? Nt(null) : {}, this.size = 0;
    }
    function j(m) {
      var x = this.has(m) && delete this.__data__[m];
      return this.size -= x ? 1 : 0, x;
    }
    function v(m) {
      var x = this.__data__;
      if (Nt) {
        var L = x[m];
        return L === i ? void 0 : L;
      }
      return ce.call(x, m) ? x[m] : void 0;
    }
    function $(m) {
      var x = this.__data__;
      return Nt ? x[m] !== void 0 : ce.call(x, m);
    }
    function E(m, x) {
      var L = this.__data__;
      return this.size += this.has(m) ? 0 : 1, L[m] = Nt && x === void 0 ? i : x, this;
    }
    ie.prototype.clear = Ei, ie.prototype.delete = j, ie.prototype.get = v, ie.prototype.has = $, ie.prototype.set = E;
    function M(m) {
      var x = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++x < L; ) {
        var Z = m[x];
        this.set(Z[0], Z[1]);
      }
    }
    function N() {
      this.__data__ = [], this.size = 0;
    }
    function D(m) {
      var x = this.__data__, L = ln(x, m);
      if (L < 0)
        return !1;
      var Z = x.length - 1;
      return L == Z ? x.pop() : si.call(x, L, 1), --this.size, !0;
    }
    function W(m) {
      var x = this.__data__, L = ln(x, m);
      return L < 0 ? void 0 : x[L][1];
    }
    function F(m) {
      return ln(this.__data__, m) > -1;
    }
    function Y(m, x) {
      var L = this.__data__, Z = ln(L, m);
      return Z < 0 ? (++this.size, L.push([m, x])) : L[Z][1] = x, this;
    }
    M.prototype.clear = N, M.prototype.delete = D, M.prototype.get = W, M.prototype.has = F, M.prototype.set = Y;
    function et(m) {
      var x = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++x < L; ) {
        var Z = m[x];
        this.set(Z[0], Z[1]);
      }
    }
    function K() {
      this.size = 0, this.__data__ = {
        hash: new ie(),
        map: new ($e || M)(),
        string: new ie()
      };
    }
    function ft(m) {
      var x = zo(this, m).delete(m);
      return this.size -= x ? 1 : 0, x;
    }
    function Tt(m) {
      return zo(this, m).get(m);
    }
    function Pt(m) {
      return zo(this, m).has(m);
    }
    function yt(m, x) {
      var L = zo(this, m), Z = L.size;
      return L.set(m, x), this.size += L.size == Z ? 0 : 1, this;
    }
    et.prototype.clear = K, et.prototype.delete = ft, et.prototype.get = Tt, et.prototype.has = Pt, et.prototype.set = yt;
    function dt(m) {
      var x = this.__data__ = new M(m);
      this.size = x.size;
    }
    function Mt() {
      this.__data__ = new M(), this.size = 0;
    }
    function ct(m) {
      var x = this.__data__, L = x.delete(m);
      return this.size = x.size, L;
    }
    function we(m) {
      return this.__data__.get(m);
    }
    function Gt(m) {
      return this.__data__.has(m);
    }
    function be(m, x) {
      var L = this.__data__;
      if (L instanceof M) {
        var Z = L.__data__;
        if (!$e || Z.length < e - 1)
          return Z.push([m, x]), this.size = ++L.size, this;
        L = this.__data__ = new et(Z);
      }
      return L.set(m, x), this.size = L.size, this;
    }
    dt.prototype.clear = Mt, dt.prototype.delete = ct, dt.prototype.get = we, dt.prototype.has = Gt, dt.prototype.set = be;
    function xe(m, x) {
      var L = tl(m), Z = !L && Ja(m), St = !L && !Z && jc(m), It = !L && !Z && !St && Qc(m), jt = L || Z || St || It, Dt = jt ? gt(m.length, String) : [], Zt = Dt.length;
      for (var Ni in m)
        jt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ni == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        St && (Ni == "offset" || Ni == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        It && (Ni == "buffer" || Ni == "byteLength" || Ni == "byteOffset") || // Skip index properties.
        Xc(Ni, Zt)) || Dt.push(Ni);
      return Dt;
    }
    function fe(m, x, L) {
      (L !== void 0 && !Fo(m[x], L) || L === void 0 && !(x in m)) && de(m, x, L);
    }
    function an(m, x, L) {
      var Z = m[x];
      (!(ce.call(m, x) && Fo(Z, L)) || L === void 0 && !(x in m)) && de(m, x, L);
    }
    function ln(m, x) {
      for (var L = m.length; L--; )
        if (Fo(m[L][0], x))
          return L;
      return -1;
    }
    function de(m, x, L) {
      x == "__proto__" && Le ? Le(m, x, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : m[x] = L;
    }
    var oe = Tm();
    function Ge(m) {
      return m == null ? m === void 0 ? P : w : ve && ve in Object(m) ? Sm(m) : km(m);
    }
    function Ts(m) {
      return pr(m) && Ge(m) == a;
    }
    function Ro(m) {
      if (!cn(m) || Pm(m))
        return !1;
      var x = il(m) ? kt : G;
      return x.test(Lm(m));
    }
    function Xn(m) {
      return pr(m) && Zc(m.length) && !!U[Ge(m)];
    }
    function Ai(m) {
      if (!cn(m))
        return Om(m);
      var x = Gc(m), L = [];
      for (var Z in m)
        Z == "constructor" && (x || !ce.call(m, Z)) || L.push(Z);
      return L;
    }
    function un(m, x, L, Z, St) {
      m !== x && oe(x, function(It, jt) {
        if (St || (St = new dt()), cn(It))
          Ss(m, x, jt, L, un, Z, St);
        else {
          var Dt = Z ? Z(Qa(m, jt), It, jt + "", m, x, St) : void 0;
          Dt === void 0 && (Dt = It), fe(m, jt, Dt);
        }
      }, Jc);
    }
    function Ss(m, x, L, Z, St, It, jt) {
      var Dt = Qa(m, L), Zt = Qa(x, L), Ni = jt.get(Zt);
      if (Ni) {
        fe(m, L, Ni);
        return;
      }
      var hi = It ? It(Dt, Zt, L + "", m, x, jt) : void 0, gr = hi === void 0;
      if (gr) {
        var nl = tl(Zt), sl = !nl && jc(Zt), eh = !nl && !sl && Qc(Zt);
        hi = Zt, nl || sl || eh ? tl(Dt) ? hi = Dt : Rm(Dt) ? hi = wm(Dt) : sl ? (gr = !1, hi = _m(Zt)) : eh ? (gr = !1, hi = vm(Zt)) : hi = [] : zm(Zt) || Ja(Zt) ? (hi = Dt, Ja(Dt) ? hi = Fm(Dt) : (!cn(Dt) || il(Dt)) && (hi = Em(Zt))) : gr = !1;
      }
      gr && (jt.set(Zt, hi), St(hi, Zt, Z, It, jt), jt.delete(Zt)), fe(m, L, hi);
    }
    function Fi(m, x) {
      return Im(Mm(m, x, th), m + "");
    }
    var mm = Le ? function(m, x) {
      return Le(m, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Bm(x),
        writable: !0
      });
    } : th;
    function _m(m, x) {
      return m.slice();
    }
    function ym(m) {
      var x = new m.constructor(m.byteLength);
      return new Fe(x).set(new Fe(m)), x;
    }
    function vm(m, x) {
      var L = ym(m.buffer);
      return new m.constructor(L, m.byteOffset, m.length);
    }
    function wm(m, x) {
      var L = -1, Z = m.length;
      for (x || (x = Array(Z)); ++L < Z; )
        x[L] = m[L];
      return x;
    }
    function bm(m, x, L, Z) {
      var St = !L;
      L || (L = {});
      for (var It = -1, jt = x.length; ++It < jt; ) {
        var Dt = x[It], Zt = void 0;
        Zt === void 0 && (Zt = m[Dt]), St ? de(L, Dt, Zt) : an(L, Dt, Zt);
      }
      return L;
    }
    function xm(m) {
      return Fi(function(x, L) {
        var Z = -1, St = L.length, It = St > 1 ? L[St - 1] : void 0, jt = St > 2 ? L[2] : void 0;
        for (It = m.length > 3 && typeof It == "function" ? (St--, It) : void 0, jt && Am(L[0], L[1], jt) && (It = St < 3 ? void 0 : It, St = 1), x = Object(x); ++Z < St; ) {
          var Dt = L[Z];
          Dt && m(x, Dt, Z, It);
        }
        return x;
      });
    }
    function Tm(m) {
      return function(x, L, Z) {
        for (var St = -1, It = Object(x), jt = Z(x), Dt = jt.length; Dt--; ) {
          var Zt = jt[++St];
          if (L(It[Zt], Zt, It) === !1)
            break;
        }
        return x;
      };
    }
    function Kc(m, x, L, Z, St, It) {
      return cn(m) && cn(x) && (It.set(x, m), un(m, x, void 0, Kc, It), It.delete(x)), m;
    }
    function zo(m, x) {
      var L = m.__data__;
      return Cm(x) ? L[typeof x == "string" ? "string" : "hash"] : L.map;
    }
    function Za(m, x) {
      var L = Ce(m, x);
      return Ro(L) ? L : void 0;
    }
    function Sm(m) {
      var x = ce.call(m, ve), L = m[ve];
      try {
        m[ve] = void 0;
        var Z = !0;
      } catch {
      }
      var St = Xt.call(m);
      return Z && (x ? m[ve] = L : delete m[ve]), St;
    }
    function Em(m) {
      return typeof m.constructor == "function" && !Gc(m) ? Pe(Ki(m)) : {};
    }
    function Xc(m, x) {
      var L = typeof m;
      return x = x ?? o, !!x && (L == "number" || L != "symbol" && nt.test(m)) && m > -1 && m % 1 == 0 && m < x;
    }
    function Am(m, x, L) {
      if (!cn(L))
        return !1;
      var Z = typeof x;
      return (Z == "number" ? el(L) && Xc(x, L.length) : Z == "string" && x in L) ? Fo(L[x], m) : !1;
    }
    function Cm(m) {
      var x = typeof m;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? m !== "__proto__" : m === null;
    }
    function Pm(m) {
      return !!Xe && Xe in m;
    }
    function Gc(m) {
      var x = m && m.constructor, L = typeof x == "function" && x.prototype || Ie;
      return m === L;
    }
    function Om(m) {
      var x = [];
      if (m != null)
        for (var L in Object(m))
          x.push(L);
      return x;
    }
    function km(m) {
      return Xt.call(m);
    }
    function Mm(m, x, L) {
      return x = Ne(x === void 0 ? m.length - 1 : x, 0), function() {
        for (var Z = arguments, St = -1, It = Ne(Z.length - x, 0), jt = Array(It); ++St < It; )
          jt[St] = Z[x + St];
        St = -1;
        for (var Dt = Array(x + 1); ++St < x; )
          Dt[St] = Z[St];
        return Dt[x] = L(jt), pt(m, this, Dt);
      };
    }
    function Qa(m, x) {
      if (!(x === "constructor" && typeof m[x] == "function") && x != "__proto__")
        return m[x];
    }
    var Im = Dm(mm);
    function Dm(m) {
      var x = 0, L = 0;
      return function() {
        var Z = at(), St = r - (Z - L);
        if (L = Z, St > 0) {
          if (++x >= n)
            return arguments[0];
        } else
          x = 0;
        return m.apply(void 0, arguments);
      };
    }
    function Lm(m) {
      if (m != null) {
        try {
          return $t.call(m);
        } catch {
        }
        try {
          return m + "";
        } catch {
        }
      }
      return "";
    }
    function Fo(m, x) {
      return m === x || m !== m && x !== x;
    }
    var Ja = Ts(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Ts : function(m) {
      return pr(m) && ce.call(m, "callee") && !Xi.call(m, "callee");
    }, tl = Array.isArray;
    function el(m) {
      return m != null && Zc(m.length) && !il(m);
    }
    function Rm(m) {
      return pr(m) && el(m);
    }
    var jc = Si || Vm;
    function il(m) {
      if (!cn(m))
        return !1;
      var x = Ge(m);
      return x == u || x == g || x == c || x == C;
    }
    function Zc(m) {
      return typeof m == "number" && m > -1 && m % 1 == 0 && m <= o;
    }
    function cn(m) {
      var x = typeof m;
      return m != null && (x == "object" || x == "function");
    }
    function pr(m) {
      return m != null && typeof m == "object";
    }
    function zm(m) {
      if (!pr(m) || Ge(m) != A)
        return !1;
      var x = Ki(m);
      if (x === null)
        return !0;
      var L = ce.call(x, "constructor") && x.constructor;
      return typeof L == "function" && L instanceof L && $t.call(L) == re;
    }
    var Qc = Ut ? ut(Ut) : Xn;
    function Fm(m) {
      return bm(m, Jc(m));
    }
    var Nm = Fi(function(m) {
      return m.push(void 0, Kc), pt($m, void 0, m);
    });
    function Jc(m) {
      return el(m) ? xe(m) : Ai(m);
    }
    var $m = xm(function(m, x, L, Z) {
      un(m, x, L, Z);
    });
    function Bm(m) {
      return function() {
        return m;
      };
    }
    function th(m) {
      return m;
    }
    function Vm() {
      return !1;
    }
    s.exports = Nm;
  }(Fr, Fr.exports)), Fr.exports;
}
var Rb = Lb();
const qt = /* @__PURE__ */ Db(Rb), zb = 60, xr = {}, Hf = (s, t = zb) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  xr[s] = xr[s] || null;
  const r = xr[s] ? i - xr[s] : null;
  (r === null || r > n) && (xr[s] = i - r % n, s(...e));
});
function Ao() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const Vu = (s, t, e, i, n, r) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? Vu(o, t, e - 1, i, n, r) : Vu(s, o, e - 1, i, n, r);
}, Fb = (s, t, e, i, n, r) => Vu(e, i, n, r, s, t), Nb = () => Math.round(
  Fb("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, $b = (s) => Math.round(window.devicePixelRatio * 100) - s, Bb = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Dl = {
  firefox: Nb,
  chrome: $b,
  default: Bb
}, Wf = {
  calculate: (s, t) => Dl[s] ? Dl[s](t) : Dl.default(t)
}, Wc = "APPLICATION:MOBILE_MENU:OPEN", Yc = "APPLICATION:MOBILE_MENU:CLOSED", Na = "APPLICATION_PRELUDIUM", Hu = "APPLICATION:INITIALIZED", Co = "APPLICATION:READY", zi = "APPLICATION:REVEALED", Ui = "APPLICATION:RESIZE", qn = "APPLICATION:SCROLL", am = "APPLICATION:SCROLL_LOCKED", lm = "APPLICATION:SCROLL_RELEASED", Xa = "APPLICATION:FORCED_SCROLL_START", Ga = "APPLICATION:FORCED_SCROLL_END", ja = "APPLICATION:OUTLINE", um = "APPLICATION:VISIBILITY_CHANGE", cm = "APPLICATION:HIDDEN", hm = "APPLICATION:VISIBLE", $a = "BREAKPOINT:CHANGE", qc = "IMAGE:LAZYLOADED", fm = "IMAGE:REVEALED", dm = "SECTION:LAZYLOADED", g1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: Ga,
  APPLICATION_FORCED_SCROLL_START: Xa,
  APPLICATION_HIDDEN: cm,
  APPLICATION_INITIALIZED: Hu,
  APPLICATION_MOBILE_MENU_CLOSED: Yc,
  APPLICATION_MOBILE_MENU_OPEN: Wc,
  APPLICATION_OUTLINE: ja,
  APPLICATION_PRELUDIUM: Na,
  APPLICATION_READY: Co,
  APPLICATION_RESIZE: Ui,
  APPLICATION_REVEALED: zi,
  APPLICATION_SCROLL: qn,
  APPLICATION_SCROLL_LOCKED: am,
  APPLICATION_SCROLL_RELEASED: lm,
  APPLICATION_VISIBILITY_CHANGE: um,
  APPLICATION_VISIBLE: hm,
  BREAKPOINT_CHANGE: $a,
  IMAGE_LAZYLOADED: qc,
  IMAGE_REVEALED: fm,
  SECTION_LAZYLOADED: dm
}, Symbol.toStringTag, { value: "Module" })), Vb = {
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
class Yf {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = qt(e, Vb), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Na, () => {
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
              const c = new CustomEvent($a, {
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
        }, n = new CustomEvent($a);
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
class Hb {
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
class Wb {
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
class Yb {
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
const st = new Yb();
Ot.registerPlugin(ur);
Ot.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  const t = window.location.hash;
  if (s.persisted || t) {
    const i = () => {
      console.log("== fixVisibility");
      const n = document.querySelector("#fader");
      n && Ot.set(n, { autoAlpha: 0, display: "none" });
      const r = document.querySelectorAll("[data-fader]");
      r.length && Ot.set(r, { autoAlpha: 0 }), Ot.set(document.body, { clearProps: "opacity" }), document.body.classList.remove("unloaded");
      const o = st.find("header[data-nav]");
      o && Ot.set(o, { clearProps: "opacity, transform" });
      const a = st.find("main");
      a && Ot.set(a, { clearProps: "opacity, transform" });
      const l = st.find("footer");
      l && Ot.set(l, { clearProps: "opacity, transform" });
    };
    s.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const qf = {
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
      Ot.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), Ot.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class m1 {
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
    delete t.breakpointConfig, this.opts = qt(t, qf), this.opts.breakpointConfig = e || qf.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Hb(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Yf(this, this.opts.breakpointConfig) : this.breakpoints = new Yf(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new Wb(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = Ao(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (Ot.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener($a, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent(Na, this), this.initializedEvent = new window.CustomEvent(Hu, this), this.readyEvent = new window.CustomEvent(Co, this), this.revealedEvent = new window.CustomEvent(zi, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
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
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Na), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(Hu), this.ready();
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
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), Ot.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Wf.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Wf.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(am, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, Ot.set(document.body, { overflow: "hidden" }), Ot.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(lm, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, Ot.set(document.body, { overflow: t }), Ot.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
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
    const o = new window.CustomEvent(Xa);
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? r = t : r = { y: t, autoKill: !1 }, Ot.to(window, {
      duration: e,
      scrollTo: r,
      onComplete: () => {
        const a = new window.CustomEvent(Ga);
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(zi));
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
    }, i = new CustomEvent(qn, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(um, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(cm, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(hm, t), window.dispatchEvent(e));
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
    Ot.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
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
    const t = Ot.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          Ot.set([e, i], { display: "none" });
        });
        break;
      case 1:
        Ot.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        Ot.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        st.hasClass(i, "visible") ? (Ot.set(n, { width: "auto" }), Ot.to(n, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (Ot.set(n, { width: 0 }), i.classList.toggle("visible"), Ot.to(n, {
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
function _t(s, t) {
  return J(s, t, { duration: 0 });
}
function no(s, t, e = {}) {
  const i = typeof s == "string" ? document.querySelector(s) : s;
  return t === 0 ? J(i, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      i.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (i.style.visibility = "visible", J(i, { opacity: t }, e));
}
function Ba(s, t = "all") {
  const e = typeof s == "string" ? document.querySelector(s) : s;
  t === "all" ? e.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((n) => {
    e.style.removeProperty(n);
  });
}
class Uf {
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
          delete o.autoAlpha, await no(i, n.autoAlpha, o).finished;
        } else
          await J(i, n, r).finished;
      } else e[0] === "call" && e[1]();
  }
}
const qb = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s);
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, easing: "ease-in", at: 0 }]
    ];
    J(e).finished.then(() => {
      s.cc.style.display = "none";
    });
  },
  onRefuse: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 0, t, "/");
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, easing: "ease-in", at: 0 }]
    ];
    J(e).finished.then(() => {
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
    s.cc.style.display = "block", _t(s.cc, { opacity: 1 }), _t(s.inner, { opacity: 1 });
    const t = [
      [s.cc, { y: ["120%", "0%"] }, { duration: 0.5, easing: "ease-out", at: 1 }],
      [s.text, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.15 }],
      [s.btns, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.5 }]
    ];
    J(t);
  }
};
class _1 {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, qb), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(zi, () => {
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
const Ub = {};
class y1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, Ub), this.initialize();
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
        J([
          [o, { opacity: 1 }, { duration: 0 }],
          [r, { opacity: 0 }, { duration: 0.5, easing: "ease-in" }],
          [n, { opacity: 0 }, { duration: 1, easing: "ease-in" }],
          [n, { display: "none" }, { duration: 0 }]
        ]).finished.then(() => {
          i && i.play();
        });
      });
    });
  }
}
class Kb {
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
      const u = new RegExp(`^${f}$`), g = e.match(u);
      if (g) {
        const p = {};
        return d.forEach((_, w) => {
          g[w + 1] && (p[_] = decodeURIComponent(g[w + 1]));
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
const Xb = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (s) => {
  }
};
class v1 {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = st.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = st.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = st.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = qt(i, Xb), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = st.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new Kb(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
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
const Gb = {
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
class w1 {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, Gb), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = Ot.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = st.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
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
const jb = {};
class b1 {
  constructor(t, e, i = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = qt(i, jb), this.selector = e, this.initialize(), window.addEventListener(Ui, () => {
      Ba("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
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
        _t(l.elements, { minHeight: l.height }), l.elements.forEach((c) => {
          c.setAttribute("data-eq-height-elements-adjusted", "true");
        });
      });
    });
  }
}
function Lo(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(qc, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function Uc(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const n = s[i];
    e.push(Lo(n, t));
  }
  return Promise.all(e);
}
const Zb = {
  listenForResize: !0
};
class x1 {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = qt(e, Zb), this.initialize(), e.listenForResize && window.addEventListener(Ui, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let n = [], r = 0;
      const o = st.all(t, "img");
      Uc(o, !1).then(() => {
        o.forEach((a) => {
          const l = a.getBoundingClientRect(), c = this.getImgSizeInfo(a);
          if (e === null) {
            r = c.height, n.push(a), e = l.top;
            return;
          }
          e !== l.top ? (i.push({ elements: n, height: r }), n = [], r = c.height) : e === l.top ? c.height > r && (r = c.height) : r = c.height, n.push(a), e = l.top;
        }), n.length && i.push({ elements: n, height: r }), i.length && i.forEach((a) => {
          _t(a.elements, { minHeight: a.height });
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
const pm = {
  onPin: (s) => {
    J(s.el, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, J(s.el, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      easing: "ease-in"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onAltBg: (s) => {
    s.opts.altBgColor && J(s.el, {
      backgroundColor: s.opts.altBgColor
    }, {
      duration: 0.2
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && J(s.el, {
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
}, Qb = {
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
      _t(s.el, { yPercent: -100 }), _t(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      J(s.el, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), J(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: Fa(0.1, { startDelay: s.opts.enterDelay }),
        easing: "ease-in"
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
    ...pm
  }
};
class T1 {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, Qb), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.opts.intersects && (this.intersectingElements = st.all("[data-intersect]")), window.addEventListener(ja, () => {
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
      Xa,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      Ga,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(zi, () => {
      let t = qn;
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
    return e = qt(i, pm, e.default || {}), e;
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
const Jb = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class S1 {
  constructor(t, e) {
    this.app = t, this.opts = qt(e, Jb);
    const i = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    _t(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (_t(i, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const t1 = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class E1 {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, t1), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((r) => this.setupParallaxElement(r)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(qn, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
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
    let g = 1;
    if (r) {
      const _ = a.top / l;
      _ <= 0 ? g = Math.max(0, 1 + _ * 1.5) : _ >= 0.7 && (g = Math.max(0, 1 - (_ - 0.7) * 3.33)), g = Math.max(0, Math.min(1, g));
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
    return { transform: p, opacity: g };
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
    window.removeEventListener(qn, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: n } = t;
      i && (i.style.transform = "", i.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !i && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
const e1 = {
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
    const e = J(s.el, { opacity: 1 }, { duration: 0.25 });
    s.slides.length > 1 && e.finished.then(() => {
      t();
    });
  }
};
class A1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, e1), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), _t(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      _t(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? _t(i, {
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
    this.app.registerCallback(zi, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && Lo(e, this.opts.lazyImages).then(() => {
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
          _t(this._currentSlide, {
            opacity: 0,
            scale: 1,
            zIndex: this.opts.zIndex.visible
          }), _t(this._nextSlide, { opacity: 0 });
          const e = [
            // Previous slide zoom (starts at 0s, runs for interval)
            [
              this._previousSlide,
              { scale: this.opts.transition.scale },
              { duration: this.opts.interval, at: 0 }
            ],
            // Current slide fade-in (starts at interval - duration to overlap zoom)
            [
              this._currentSlide,
              { opacity: 1 },
              {
                duration: this.opts.transition.duration,
                easing: [0.45, 0, 0.55, 1],
                // sine.inOut bezier
                at: this.opts.interval - this.opts.transition.duration
              }
            ]
          ];
          J(e).finished.then(() => {
            _t(this._previousSlide, { opacity: 0 }), this._nextSlide.style.zIndex = this.opts.zIndex.visible, this._currentSlide.style.zIndex = this.opts.zIndex.regular, this._previousSlide.style.zIndex = this.opts.zIndex.regular, this.next();
          });
        }
        break;
      case "parallax":
        {
          _t(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            scale: 1,
            width: "100%"
          }), _t(this._previousSlide, { overflow: "hidden" });
          const e = [
            // Previous slide zoom (starts at 0s, runs for interval)
            [
              this._previousSlide,
              { scale: this.opts.transition.scale },
              { duration: this.opts.interval, at: 0 }
            ],
            // Previous slide width collapse (starts at interval)
            [
              this._previousSlide,
              { width: 0 },
              {
                duration: this.opts.transition.duration,
                easing: [0.895, 0.03, 0.685, 0.22],
                // power3.in bezier
                at: this.opts.interval
              }
            ]
          ];
          J(e).finished.then(() => {
            _t(this._nextSlide, { zIndex: this.opts.zIndex.next }), _t(this._currentSlide, {
              zIndex: this.opts.zIndex.visible,
              width: "100%"
            }), _t(this._previousSlide, {
              zIndex: this.opts.zIndex.regular,
              scale: 1,
              width: "100%"
            }), this.next();
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
    this.resizeAnimation && this.resizeAnimation.stop(), this.resizeAnimation = J(
      this.images,
      { width: document.body.clientWidth },
      { duration: 0.15 }
    );
  }
}
const i1 = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    no(s.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (s) => {
    no(s.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (s) => {
    no(s.cover, 0, { duration: 0.35 });
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
class C1 {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = qt(e, i1), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), _t(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = st.find(this.el, "[data-cover]"), this.cover && no(this.cover, 0, { duration: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), _t(this.videoDiv, {
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
    this.video.muted = !0, _t(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && Lo(this.cover).then(() => {
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
      this.playing || (Ao() ? _t(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
    J(this.video, {
      width: document.body.clientWidth
    }, {
      duration: 0.15
    });
  }
}
function Ll(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const n1 = {
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
class P1 {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, n1), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
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
            (l.isIntersecting || l.intersectionRatio > 0) && (Uc(r, !0).then(() => {
              Ll(i, dm);
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
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), Ll(n, qc);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), Ll(e, fm));
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
const s1 = {
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
    s.app.scrollLock(), J(s.elements.wrapper, { opacity: 1 }, { duration: 0.5 });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && J(s.elements.caption, { opacity: 0 }, { duration: 0.45 }), J(
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
      J(s.elements.wrapper, { opacity: 0 }, { duration: 0.45 }).finished.then(() => {
        s.app.scrollRelease(), s.destroy();
      });
    });
  }
};
class O1 {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, s1), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: new Uf(),
      image: new Uf()
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
      _t(o, { opacity: 0 }), o.style.visibility = "hidden", o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), Lo(this.nextImage).then(() => {
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
const r1 = {
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
    r ? (_t(r, { display: "block", opacity: 0 }), e && (J(e, { y: 25 }, { duration: 0.8, easing: "ease-out" }), J(e, { opacity: 0 }, { duration: 0.2 })), i && J(i, { opacity: 0 }, { duration: 0.2 }), n && J(n, { opacity: 0 }, { duration: 0.2 }), J(r, { opacity: 1 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    })) : (e && (J(e, { y: 25 }, { duration: 0.8, easing: "ease-out" }), J(e, { opacity: 0 }, { duration: 0.2 })), i && J(i, { opacity: 0 }, { duration: 0.2 }), n && J(n, { opacity: 0 }, { duration: 0.2 }), J(e, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    }));
  }
};
class k1 {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, r1);
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
            const u = a.hash, g = document.querySelector(u);
            g && (this.opts.onAnchor(g, this), history.pushState({}, "", n));
          } else d && !a.hash && !f.hash ? h.preventDefault() : (h.preventDefault(), this.opts.onTransition(n, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const o1 = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    J(s, { opacity: 1 }, { easing: "linear" });
  }
};
class M1 {
  constructor(t, e, i) {
    this.opts = qt(i, o1), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = st.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = st.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = st.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    _t(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.setHeight(), this.fillText();
    const e = this.elements.$holder.offsetWidth, i = st.all(this.elements.$el, "[data-marquee-holder]"), n = e * i.length;
    this.duration = (e + n) / this.opts.speed, _t(this.elements.$marquee, { width: n }), this.initializeTween(), st.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Ba(e, "all"));
  }
  killTweens() {
    this.timeline && (this.timeline.stop(), this.timeline = null), this.speedAnimation && (this.speedAnimation.stop(), this.speedAnimation = null);
  }
  initializeTween() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      _t(e, { position: "absolute", left: e.offsetWidth * i });
    }), this.timeline = J(
      t,
      { x: "-100%" },
      { duration: this.duration, easing: "linear", repeat: 1 / 0 }
    ), this.timeline.pause(), this.opts.startProgress > 0 && (this.timeline.currentTime = this.opts.startProgress * this.duration), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    if (this.playing = !0, this.speedAnimation && this.speedAnimation.stop(), t) {
      this.timeline.play();
      const e = { speed: this.timeline.speed || 0 };
      this.speedAnimation = J(
        e,
        { speed: 1 },
        {
          duration: 0.8,
          easing: "ease-in",
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
    this.speedAnimation = J(
      t,
      { speed: 0.01 },
      {
        duration: 0.8,
        onUpdate: () => {
          this.timeline.speed = t.speed;
        }
      }
    ).finished.then(() => {
      this.timeline.pause();
    });
  }
  slowDown() {
    this.speedAnimation && this.speedAnimation.stop();
    const t = { speed: this.timeline.speed || 1 };
    this.speedAnimation = J(
      t,
      { speed: 0.5 },
      {
        duration: 0.8,
        onUpdate: () => {
          this.timeline.speed = t.speed;
        }
      }
    );
  }
  speedUp() {
    this.speedAnimation && this.speedAnimation.stop();
    const t = { speed: this.timeline.speed || 0.5 };
    this.speedAnimation = J(
      t,
      { speed: 1 },
      {
        duration: 0.8,
        easing: "ease-in",
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
    _t(this.elements.$el, { height: t });
  }
}
const a1 = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: async (s) => {
    s.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), _t(s.bg, { x: "0%", opacity: 0, height: window.innerHeight });
    const t = [
      [s.bg, { opacity: 1 }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.logo, { opacity: 0 }, { duration: 0.35, easing: "ease-out", at: 0 }],
      [s.header, { backgroundColor: "transparent" }, { duration: 0.55, easing: "ease-out", at: 0 }]
    ];
    await J(t).finished, s.nav.style.gridTemplateRows = "auto 1fr", _t(s.nav, { height: window.innerHeight }), Array.from(s.content).forEach((n) => _t(n, { display: "block" })), Array.from(s.logoPath).forEach((n) => n.setAttribute("fill", s.opts.logoColor)), _t(s.logo, { x: "3%" });
    const e = J(
      s.lis,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 1, easing: "ease-out", delay: Fa(0.05) }
    ), i = J(
      s.logo,
      { opacity: 1, x: ["3%", "0%"] },
      { duration: 0.55, easing: "ease-in-out", at: 0.15 }
    );
    await Promise.all([e.finished, i.finished]), s._emitMobileMenuOpenEvent();
  },
  closeTween: async (s) => {
    document.body.classList.toggle("open-menu"), s.hamburger.classList.toggle("is-active"), await J(s.logo, { opacity: 0, x: "5%" }, { duration: 0.2, easing: "ease-out" }).finished, Array.from(s.logoPath).forEach((e) => e.removeAttribute("fill"));
    const t = J(
      s.lis,
      { opacity: 0, x: 20 },
      { duration: 0.5, easing: "ease-out", delay: Fa(0.04) }
    );
    setTimeout(() => {
      J(s.bg, { x: "100%" }, { duration: 0.25, easing: "ease-in" });
    }, 200), await t.finished, Ba(s.nav, "height"), s._emitMobileMenuClosedEvent(), Array.from(s.content).forEach((e) => _t(e, { display: "none" })), s.nav.style.gridTemplateRows = "auto", Array.from(s.lis).forEach((e) => Ba(e, "opacity")), await J(s.logo, { opacity: 1 }, { duration: 0.35, easing: "ease-in" }).finished;
  }
};
class I1 {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, a1), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
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
      Wc
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      Yc
    );
    window.dispatchEvent(t);
  }
}
Ot.registerPlugin(ac);
const l1 = {
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
class D1 {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = qt(e, l1), i !== document.body && (this.opts.on = () => {
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
    this.parseChildren(t), this.opts.uniqueIds && this.addIds(t), this.opts.addIndexes && this.addIndexes(t);
    const e = Ot.timeline({
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
      Ot.set(t.children, r);
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? Ot.set(t.el, n.transition.from) : console.error(
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
            let { alphaTween: g } = c, p = (h - d) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof g == "object" && g !== null ? g.duration = g.duration ? g.duration : h : g === !0 && (g = {
              duration: h,
              ease: "sine.in"
            });
            const _ = f ? this.tweenJS : this.tweenCSS, w = () => {
              _(
                t,
                a.target,
                h,
                d,
                f,
                p,
                g
              );
            }, A = () => {
              u ? Ot.delayedCall(u, w) : w();
            };
            if (a.target.tagName === "IMG")
              Lo(a.target).then(() => A());
            else if (a.target.hasAttribute("data-placeholder"))
              A();
            else {
              const C = a.target.querySelectorAll("img");
              C.length ? Array.from(C).every(
                (y) => y.hasAttribute("data-ll-placeholder")
              ) ? A() : Uc(C).then(() => A()) : A();
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
    Ot.set(e, r.from);
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
const u1 = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, Tr = [];
class L1 {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = qt(i, u1), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    }), h ? (t && this.isVisible ? J(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? J(this.popover, {
      top: Math.max(0, c.bottom.top),
      left: Math.max(0, c.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, c.bottom.top)}px`, this.popover.style.left = `${Math.max(0, c.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
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
    window.addEventListener(qn, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(qn, this.boundHandleScroll);
  }
}
const c1 = {
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
    e.backdrop.style.display = "block", J(e.backdrop, { opacity: 1 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "block", J(
        t,
        {
          x: [-5, 0],
          opacity: [0, 1]
        },
        { duration: 0.3 }
      );
    });
  },
  tweenOut: (s) => {
    console.log("default tweenOut");
    const t = s.currentPopup;
    t && J(t, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "none";
    }), J(s.backdrop, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      s.backdrop.remove();
    });
  }
};
class R1 {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = qt(i, c1), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), e.style.display = "none", e.style.zIndex = "4999", _t(e, { opacity: 0 }), e.addEventListener("click", (i) => {
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
const h1 = {
  onIntersect: (s, t) => {
  }
};
class z1 {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, h1), this.initialize();
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
const f1 = {};
class F1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, f1), this.initialize();
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
    _t(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    _t(t, { height: e.clientHeight });
  }
}
const gm = {
  onMainVisible: (s) => {
    J(s.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    J(s.el, {
      opacity: 0
    }, {
      duration: 1
    });
  },
  onPin: (s) => {
    J(s.auxEl, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, J(s.auxEl, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      easing: "ease-in"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onSmall: () => {
  }
}, d1 = {
  el: "header[data-nav]",
  on: zi,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      _t(s.el, { opacity: 0 });
    },
    enter: (s) => {
      _t(s.auxEl, { yPercent: -100 }), _t(s.lis, { opacity: 0 }), J(s.auxEl, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), J(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: Fa(0.1, { startDelay: s.opts.enterDelay }),
        easing: "ease-in"
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
    ...gm
  }
};
class N1 {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, d1), this.mainOpts.pinOnOutline && window.addEventListener(ja, () => {
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
      qn,
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
    }), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Xa, () => {
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
    return e = qt(i, gm, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      Wc,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      Yc,
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
class $1 {
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
    if (this.group && !this.open && this.closeOthersInGroup(), this.toggleState(), this.open) {
      this.triggerIcon && this.triggerIcon.classList.toggle("active"), this.trigger.setAttribute("data-toggle-trigger-active", ""), this.content.forEach((i) => {
        i.style.height = "0", i.style.display = "block", i.offsetHeight;
      }), this.el.classList.toggle("open"), this.onBeforeOpen && this.onBeforeOpen(this, this.getGroupIndex());
      const t = [];
      this.content.forEach((i, n) => {
        const r = i.scrollHeight;
        t.push(
          J(i, { height: [0, r + "px"] }, {
            easing: "ease-in-out",
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
          J(i, { height: 0 }, {
            duration: 0.25,
            easing: "ease-out",
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
            J(n, { height: 0 }, {
              duration: 0.25,
              easing: "ease-out",
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
class B1 {
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
const V1 = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  m1 as Application,
  Yf as Breakpoints,
  ac as CSSPlugin,
  _1 as Cookies,
  y1 as CoverOverlay,
  v1 as Dataloader,
  st as Dom,
  qa as Draggable,
  w1 as Dropdown,
  b1 as EqualHeightElements,
  x1 as EqualHeightImages,
  g1 as Events,
  T1 as FixedHeader,
  S1 as FooterReveal,
  A1 as HeroSlider,
  C1 as HeroVideo,
  Xp as InertiaPlugin,
  P1 as Lazyload,
  O1 as Lightbox,
  k1 as Links,
  M1 as Marquee,
  I1 as MobileMenu,
  D1 as Moonwalk,
  E1 as Parallax,
  L1 as Popover,
  R1 as Popup,
  z1 as ScrollSpy,
  ur as ScrollToPlugin,
  xt as ScrollTrigger,
  iy as SplitText,
  F1 as StackedBoxes,
  N1 as StickyHeader,
  $1 as Toggler,
  B1 as Typography,
  qt as _defaultsDeep,
  J as animate,
  Ot as gsap,
  Lo as imageIsLoaded,
  Uc as imagesAreLoaded,
  V1 as loadScript,
  Ao as prefersReducedMotion,
  Hf as rafCallback,
  p1 as scroll,
  Fa as stagger
};
