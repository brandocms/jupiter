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
var xi = {
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
}, Yc, ze, Qt, nn = 1e8, qe = 1 / nn, Rl = Math.PI * 2, Ym = Rl / 4, Wm = 0, Xf = Math.sqrt, qm = Math.cos, Um = Math.sin, Me = function(t) {
  return typeof t == "string";
}, ne = function(t) {
  return typeof t == "function";
}, bn = function(t) {
  return typeof t == "number";
}, Wc = function(t) {
  return typeof t > "u";
}, rn = function(t) {
  return typeof t == "object";
}, oi = function(t) {
  return t !== !1;
}, qc = function() {
  return typeof window < "u";
}, Bo = function(t) {
  return ne(t) || Me(t);
}, Gf = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ue = Array.isArray, zl = /(?:-?\.?\d|\.)+/gi, jf = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Fs = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, rl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Zf = /[+-]=-?[.\d]+/, Qf = /[^,'"\[\]\s]+/gi, Km = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, te, Gi, Fl, Uc, Ti = {}, wa = {}, Jf, td = function(t) {
  return (wa = sr(t, Ti)) && hi;
}, Kc = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, ao = function(t, e) {
  return !e && console.warn(t);
}, ed = function(t, e) {
  return t && (Ti[t] = e) && wa && (wa[t] = e) || Ti;
}, lo = function() {
  return 0;
}, Xm = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ra = {
  suppressEvents: !0,
  kill: !1
}, Gm = {
  suppressEvents: !0
}, Xc = {}, zn = [], Nl = {}, id, gi = {}, ol = {}, eh = 30, oa = [], Gc = "", jc = function(t) {
  var e = t[0], i, n;
  if (rn(e) || ne(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (n = oa.length; n-- && !oa[n].targetTest(e); )
      ;
    i = oa[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new Ad(t[n], i))) || t.splice(n, 1);
  return t;
}, os = function(t) {
  return t._gsap || jc(Di(t))[0]._gsap;
}, nd = function(t, e, i) {
  return (i = t[e]) && ne(i) ? t[e]() : Wc(i) && t.getAttribute && t.getAttribute(e) || i;
}, ai = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, le = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ye = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Ws = function(t, e) {
  var i = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + n : i === "-" ? t - n : i === "*" ? t * n : t / n;
}, jm = function(t, e) {
  for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, ba = function() {
  var t = zn.length, e = zn.slice(0), i, n;
  for (Nl = {}, zn.length = 0, i = 0; i < t; i++)
    n = e[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Zc = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, sd = function(t, e, i, n) {
  zn.length && !ze && ba(), t.render(e, i, !!(ze && e < 0 && Zc(t))), zn.length && !ze && ba();
}, rd = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Qf).length < 2 ? e : Me(t) ? t.trim() : t;
}, od = function(t) {
  return t;
}, Si = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Zm = function(t) {
  return function(e, i) {
    for (var n in i)
      n in e || n === "duration" && t || n === "ease" || (e[n] = i[n]);
  };
}, sr = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, ih = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = rn(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, xa = function(t, e) {
  var i = {}, n;
  for (n in t)
    n in e || (i[n] = t[n]);
  return i;
}, Vr = function(t) {
  var e = t.parent || te, i = t.keyframes ? Zm(Ue(t.keyframes)) : Si;
  if (oi(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Qm = function(t, e) {
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
}, Jm = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, $l = function(t, e, i, n) {
  return t._startAt && (ze ? t._startAt.revert(ra) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, t0 = function s(t) {
  return !t || t._ts && s(t.parent);
}, nh = function(t) {
  return t._repeat ? rr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, rr = function(t, e) {
  var i = Math.floor(t = ye(t / e));
  return t && i === t ? i - 1 : i;
}, Ta = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Ha = function(t) {
  return t._end = ye(t._start + (t._tDur / Math.abs(t._ts || t._rts || qe) || 0));
}, Ya = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = ye(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Ha(t), i._dirty || as(i, t)), t;
}, ld = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Ta(t.rawTime(), e), (!e._dur || ko(0, e.totalDuration(), i) - e._tTime > qe) && e.render(i, !0)), as(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Qi = function(t, e, i, n) {
  return e.parent && Vn(e), e._start = ye((bn(i) ? i : i || t !== te ? ki(t, i, e) : t._time) + e._delay), e._end = ye(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ad(t, e, "_first", "_last", t._sort ? "_start" : 0), Bl(e) || (t._recent = e), n || ld(t, e), t._ts < 0 && Ya(t, t._tTime), t;
}, cd = function(t, e) {
  return (Ti.ScrollTrigger || Kc("scrollTrigger", e)) && Ti.ScrollTrigger.create(e, t);
}, ud = function(t, e, i, n, r) {
  if (Jc(t, e, r), !t._initted)
    return 1;
  if (!i && t._pt && !ze && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && id !== _i.frame)
    return zn.push(t), t._lazy = [r, n], 1;
}, e0 = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Bl = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, i0 = function(t, e, i, n) {
  var r = t.ratio, o = e < 0 || !e && (!t._start && e0(t) && !(!t._initted && Bl(t)) || (t._ts < 0 || t._dp._ts < 0) && !Bl(t)) ? 0 : 1, a = t._rDelay, l = 0, u, h, f;
  if (a && t._repeat && (l = ko(0, t._tDur, e), h = rr(l, a), t._yoyo && h & 1 && (o = 1 - o), h !== rr(t._tTime, a) && (r = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== r || ze || n || t._zTime === qe || !e && t._zTime) {
    if (!t._initted && ud(t, e, n, i, l))
      return;
    for (f = t._zTime, t._zTime = e || (i ? qe : 0), i || (i = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(o, u.d), u = u._next;
    e < 0 && $l(t, e, i, !0), t._onUpdate && !i && wi(t, "onUpdate"), l && t._repeat && !i && t.parent && wi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Vn(t, 1), !i && !ze && (wi(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, n0 = function(t, e, i) {
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
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = r ? r < 0 ? 1e10 : ye(o * (r + 1) + t._rDelay * r) : o, a > 0 && !n && Ya(t, t._tTime = t._tDur * a), t.parent && Ha(t), i || as(t.parent, t), t;
}, sh = function(t) {
  return t instanceof ei ? as(t) : or(t, t._dur);
}, s0 = {
  _start: 0,
  endTime: lo,
  totalDuration: lo
}, ki = function s(t, e, i) {
  var n = t.labels, r = t._recent || s0, o = t.duration() >= nn ? r.endTime(!1) : t._dur, a, l, u;
  return Me(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? r : i).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && i && (l = l / 100 * (Ue(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + l : o + l)) : e == null ? o : +e;
}, Hr = function(t, e, i) {
  var n = bn(e[1]), r = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[r], a, l;
  if (n && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = oi(l.vars.inherit) && l.parent;
    o.immediateRender = oi(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[r - 1];
  }
  return new _e(e[0], o, e[r + 1]);
}, Un = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, ko = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, He = function(t, e) {
  return !Me(t) || !(e = Km.exec(t)) ? "" : e[1];
}, r0 = function(t, e, i) {
  return Un(i, function(n) {
    return ko(t, e, n);
  });
}, Vl = [].slice, hd = function(t, e) {
  return t && rn(t) && "length" in t && (!e && !t.length || t.length - 1 in t && rn(t[0])) && !t.nodeType && t !== Gi;
}, o0 = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(n) {
    var r;
    return Me(n) && !e || hd(n, 1) ? (r = i).push.apply(r, Di(n)) : i.push(n);
  }) || i;
}, Di = function(t, e, i) {
  return Qt && !e && Qt.selector ? Qt.selector(t) : Me(t) && !i && (Fl || !ar()) ? Vl.call((e || Uc).querySelectorAll(t), 0) : Ue(t) ? o0(t, i) : hd(t) ? Vl.call(t, 0) : t ? [t] : [];
}, Hl = function(t) {
  return t = Di(t)[0] || ao("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Di(e, i.querySelectorAll ? i : i === t ? ao("Invalid scope") || Uc.createElement("div") : t);
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
  }, i = ls(e.ease), n = e.from || 0, r = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, u = e.axis, h = n, f = n;
  return Me(n) ? h = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (h = n[0], f = n[1]), function(d, c, g) {
    var p = (g || e).length, _ = o[p], w, A, C, T, y, P, O, S, k;
    if (!_) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, nn])[1], !k) {
        for (O = -1e8; O < (O = g[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (_ = o[p] = [], w = l ? Math.min(k, p) * h - 0.5 : n % k, A = k === nn ? 0 : l ? p * f / k - 0.5 : n / k | 0, O = 0, S = nn, P = 0; P < p; P++)
        C = P % k - w, T = A - (P / k | 0), _[P] = y = u ? Math.abs(u === "y" ? T : C) : Xf(C * C + T * T), y > O && (O = y), y < S && (S = y);
      n === "random" && fd(_), _.max = O - S, _.min = S, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : u ? u === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (n === "edges" ? -1 : 1), _.b = p < 0 ? r - p : r, _.u = He(e.amount || e.each) || 0, i = i && p < 0 ? Td(i) : i;
    }
    return p = (_[d] - _.min) / _.max || 0, ye(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, Yl = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var n = ye(Math.round(parseFloat(i) / t) * t * e);
    return (n - n % 1) / e + (bn(i) ? 0 : He(i));
  };
}, pd = function(t, e) {
  var i = Ue(t), n, r;
  return !i && rn(t) && (n = i = t.radius || nn, t.values ? (t = Di(t.values), (r = !bn(t[0])) && (n *= n)) : t = Yl(t.increment)), Un(e, i ? ne(t) ? function(o) {
    return r = t(o), Math.abs(r - o) <= n ? r : o;
  } : function(o) {
    for (var a = parseFloat(r ? o.x : o), l = parseFloat(r ? o.y : 0), u = nn, h = 0, f = t.length, d, c; f--; )
      r ? (d = t[f].x - a, c = t[f].y - l, d = d * d + c * c) : d = Math.abs(t[f] - a), d < u && (u = d, h = f);
    return h = !n || u <= n ? t[h] : o, r || h === o || bn(o) ? h : h + He(o);
  } : Yl(t));
}, gd = function(t, e, i, n) {
  return Un(Ue(t) ? !e : i === !0 ? !!(i = 0) : !n, function() {
    return Ue(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * n) / n;
  });
}, a0 = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}, l0 = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || He(i));
  };
}, c0 = function(t, e, i) {
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
}, h0 = function s(t, e, i) {
  var n = e - t, r = n * 2;
  return Ue(t) ? md(t, s(0, t.length - 1), e) : Un(i, function(o) {
    return o = (r + (o - t) % r) % r || 0, t + (o > n ? r - o : o);
  });
}, co = function(t) {
  for (var e = 0, i = "", n, r, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", r = t.substr(n + 7, o - n - 7).match(a ? Qf : zl), i += t.substr(e, n - e) + gd(a ? r : +r[0], a ? 0 : +r[1], +r[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, _d = function(t, e, i, n, r) {
  var o = e - t, a = n - i;
  return Un(r, function(l) {
    return i + ((l - t) / o * a || 0);
  });
}, f0 = function s(t, e, i, n) {
  var r = isNaN(t + e) ? 0 : function(c) {
    return (1 - c) * t + c * e;
  };
  if (!r) {
    var o = Me(t), a = {}, l, u, h, f, d;
    if (i === !0 && (n = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ue(t) && !Ue(e)) {
      for (h = [], f = t.length, d = f - 2, u = 1; u < f; u++)
        h.push(s(t[u - 1], t[u]));
      f--, r = function(g) {
        g *= f;
        var p = Math.min(d, ~~g);
        return h[p](g - p);
      }, i = e;
    } else n || (t = sr(Ue(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        Qc.call(a, t, l, "get", e[l]);
      r = function(g) {
        return iu(g, a) || (o ? t.p : t);
      };
    }
  }
  return Un(i, r);
}, rh = function(t, e, i) {
  var n = t.labels, r = nn, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!i && a && r > (a = Math.abs(a)) && (l = o, r = a);
  return l;
}, wi = function(t, e, i) {
  var n = t.vars, r = n[e], o = Qt, a = t._ctx, l, u, h;
  if (r)
    return l = n[e + "Params"], u = n.callbackScope || t, i && zn.length && ba(), a && (Qt = a), h = l ? r.apply(u, l) : r.call(u), Qt = o, h;
}, Cr = function(t) {
  return Vn(t), t.scrollTrigger && t.scrollTrigger.kill(!!ze), t.progress() < 1 && wi(t, "onInterrupt"), t;
}, Ns, yd = [], vd = function(t) {
  if (t)
    if (t = !t.name && t.default || t, qc() || t.headless) {
      var e = t.name, i = ne(t), n = e && !i && t.init ? function() {
        this._props = [];
      } : t, r = {
        init: lo,
        render: iu,
        add: Qc,
        kill: O0,
        modifier: C0,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: eu,
        aliases: {},
        register: 0
      };
      if (ar(), t !== n) {
        if (gi[e])
          return;
        Si(n, Si(xa(t, r), o)), sr(n.prototype, sr(r, xa(t, o))), gi[n.prop = e] = n, t.targetTest && (oa.push(n), Xc[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      ed(e, n), t.register && t.register(hi, n, li);
    } else
      yd.push(t);
}, Ht = 255, Or = {
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
  var n = t ? bn(t) ? [t >> 16, t >> 8 & Ht, t & Ht] : 0 : Or.black, r, o, a, l, u, h, f, d, c, g;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Or[t])
      n = Or[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (r = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + r + r + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & Ht, n & Ht, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & Ht, t & Ht];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = g = t.match(zl), !e)
        l = +n[0] % 360 / 360, u = +n[1] / 100, h = +n[2] / 100, o = h <= 0.5 ? h * (u + 1) : h + u - h * u, r = h * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = al(l + 1 / 3, r, o), n[1] = al(l, r, o), n[2] = al(l - 1 / 3, r, o);
      else if (~t.indexOf("="))
        return n = t.match(jf), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(zl) || Or.transparent;
    n = n.map(Number);
  }
  return e && !g && (r = n[0] / Ht, o = n[1] / Ht, a = n[2] / Ht, f = Math.max(r, o, a), d = Math.min(r, o, a), h = (f + d) / 2, f === d ? l = u = 0 : (c = f - d, u = h > 0.5 ? c / (2 - f - d) : c / (f + d), l = f === r ? (o - a) / c + (o < a ? 6 : 0) : f === o ? (a - r) / c + 2 : (r - o) / c + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(u * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, bd = function(t) {
  var e = [], i = [], n = -1;
  return t.split(Fn).forEach(function(r) {
    var o = r.match(Fs) || [];
    e.push.apply(e, o), i.push(n += o.length + 1);
  }), e.c = i, e;
}, oh = function(t, e, i) {
  var n = "", r = (t + n).match(Fn), o = e ? "hsla(" : "rgba(", a = 0, l, u, h, f;
  if (!r)
    return t;
  if (r = r.map(function(d) {
    return (d = wd(d, e, 1)) && o + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (h = bd(t), l = i.c, l.join(n) !== h.c.join(n)))
    for (u = t.replace(Fn, "1").split(Fs), f = u.length - 1; a < f; a++)
      n += u[a] + (~l.indexOf(a) ? r.shift() || o + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!u)
    for (u = t.split(Fn), f = u.length - 1; a < f; a++)
      n += u[a] + r[a];
  return n + u[f];
}, Fn = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Or)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), d0 = /hsl[a]?\(/, xd = function(t) {
  var e = t.join(" "), i;
  if (Fn.lastIndex = 0, Fn.test(e))
    return i = d0.test(e), t[1] = oh(t[1], i), t[0] = oh(t[0], i, bd(t[1])), !0;
}, uo, _i = function() {
  var s = Date.now, t = 500, e = 33, i = s(), n = i, r = 1e3 / 240, o = r, a = [], l, u, h, f, d, c, g = function p(_) {
    var w = s() - n, A = _ === !0, C, T, y, P;
    if ((w > t || w < 0) && (i += w - e), n += w, y = n - i, C = y - o, (C > 0 || A) && (P = ++f.frame, d = y - f.time * 1e3, f.time = y = y / 1e3, o += C + (C >= r ? 4 : r - C), T = 1), A || (l = u(p)), T)
      for (c = 0; c < a.length; c++)
        a[c](y, d, P, _);
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
      Jf && (!Fl && qc() && (Gi = Fl = window, Uc = Gi.document || {}, Ti.gsap = hi, (Gi.gsapVersions || (Gi.gsapVersions = [])).push(hi.version), td(wa || Gi.GreenSockGlobals || !Gi.gsap && Gi || {}), yd.forEach(vd)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), u = h || function(_) {
        return setTimeout(_, o - f.time * 1e3 + 1 | 0);
      }, uo = 1, g(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), uo = 0, u = lo;
    },
    lagSmoothing: function(_, w) {
      t = _ || 1 / 0, e = Math.min(w || 33, t);
    },
    fps: function(_) {
      r = 1e3 / (_ || 240), o = f.time * 1e3 + r;
    },
    add: function(_, w, A) {
      var C = w ? function(T, y, P, O) {
        _(T, y, P, O), f.remove(C);
      } : _;
      return f.remove(_), a[A ? "unshift" : "push"](C), ar(), C;
    },
    remove: function(_, w) {
      ~(w = a.indexOf(_)) && a.splice(w, 1) && c >= w && c--;
    },
    _listeners: a
  }, f;
}(), ar = function() {
  return !uo && _i.wake();
}, At = {}, p0 = /^[\d.\-M][\d.\-,\s]/, g0 = /["']/g, m0 = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), n = i[0], r = 1, o = i.length, a, l, u; r < o; r++)
    l = i[r], a = r !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), e[n] = isNaN(u) ? u.replace(g0, "").trim() : +u, n = l.substr(a + 1).trim();
  return e;
}, _0 = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
}, y0 = function(t) {
  var e = (t + "").split("("), i = At[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [m0(e[1])] : _0(t).split(",").map(rd)) : At._CE && p0.test(t) ? At._CE("", t) : i;
}, Td = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Sd = function s(t, e) {
  for (var i = t._first, n; i; )
    i instanceof ei ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next;
}, ls = function(t, e) {
  return t && (ne(t) ? t : At[t] || y0(t)) || e;
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
  return ai(t, function(a) {
    At[a] = Ti[a] = r, At[o = a.toLowerCase()] = i;
    for (var l in r)
      At[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = At[a + "." + l] = r[l];
  }), r;
}, Ed = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ll = function s(t, e, i) {
  var n = e >= 1 ? e : 1, r = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = r / Rl * (Math.asin(1 / n) || 0), a = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * Um((h - o) * r) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Ed(a);
  return r = Rl / r, l.config = function(u, h) {
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
ai("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
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
  return -(Xf(1 - s * s) - 1);
});
Ts("Sine", function(s) {
  return s === 1 ? 1 : -qm(s * Ym) + 1;
});
Ts("Back", cl("in"), cl("out"), cl());
At.SteppedEase = At.steps = Ti.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, n = t + (e ? 0 : 1), r = e ? 1 : 0, o = 1 - qe;
    return function(a) {
      return ((n * ko(0, o, a) | 0) + r) * i;
    };
  }
};
nr.ease = At["quad.out"];
ai("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Gc += s + "," + s + "Params,";
});
var Ad = function(t, e) {
  this.id = Wm++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : nd, this.set = e ? e.getSetter : eu;
}, ho = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, or(this, +e.duration, 1, 1), this.data = e.data, Qt && (this._ctx = Qt, Qt.data.push(this)), uo || _i.wake();
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
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === qe || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), sd(this, i, n)), this;
  }, t.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + nh(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + nh(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? rr(this._tTime, r) + 1 : 1;
  }, t.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? Ta(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(ko(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), Ha(this), Jm(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ar(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== qe && (this._tTime -= qe)))), this) : this._ps;
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
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ta(n.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Gm);
    var n = ze;
    return ze = i, Zc(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), ze = n, this;
  }, t.globalTime = function(i) {
    for (var n = this, r = arguments.length ? i : n.rawTime(); n; )
      r = n._start + r / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : r;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, sh(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = i, sh(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, n) {
    return this.totalTime(ki(this, i), oi(n));
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
        var u = n.then;
        n.then = null, ne(o) && (o = o(n)) && (o.then || o === n) && (n.then = u), r(o), n.then = u;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    Cr(this);
  }, s;
}();
Si(ho.prototype, {
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
    return i === void 0 && (i = {}), r = s.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = oi(i.sortChildren), te && Qi(i.parent || te, fn(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && cd(fn(r), i.scrollTrigger), r;
  }
  var e = t.prototype;
  return e.to = function(n, r, o) {
    return Hr(0, arguments, this), this;
  }, e.from = function(n, r, o) {
    return Hr(1, arguments, this), this;
  }, e.fromTo = function(n, r, o, a) {
    return Hr(2, arguments, this), this;
  }, e.set = function(n, r, o) {
    return r.duration = 0, r.parent = this, Vr(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new _e(n, r, ki(this, o), 1), this;
  }, e.call = function(n, r, o) {
    return Qi(this, _e.delayedCall(0, n, r), o);
  }, e.staggerTo = function(n, r, o, a, l, u, h) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = h, o.parent = this, new _e(n, o, ki(this, l)), this;
  }, e.staggerFrom = function(n, r, o, a, l, u, h) {
    return o.runBackwards = 1, Vr(o).immediateRender = oi(o.immediateRender), this.staggerTo(n, r, o, a, l, u, h);
  }, e.staggerFromTo = function(n, r, o, a, l, u, h, f) {
    return a.startAt = o, Vr(a).immediateRender = oi(a.immediateRender), this.staggerTo(n, r, a, l, u, h, f);
  }, e.render = function(n, r, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, h = n <= 0 ? 0 : ye(n), f = this._zTime < 0 != n < 0 && (this._initted || !u), d, c, g, p, _, w, A, C, T, y, P, O;
    if (this !== te && h > l && n >= 0 && (h = l), h !== this._tTime || o || f) {
      if (a !== this._time && u && (h += this._time - a, n += this._time - a), d = h, T = this._start, C = this._ts, w = !C, f && (u || (a = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (P = this._yoyo, _ = u + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(_ * 100 + n, r, o);
        if (d = ye(h % _), h === l ? (p = this._repeat, d = u) : (y = ye(h / _), p = ~~y, p && p === y && (d = u, p--), d > u && (d = u)), y = rr(this._tTime, _), !a && this._tTime && y !== p && this._tTime - y * _ - this._dur <= 0 && (y = p), P && p & 1 && (d = u - d, O = 1), p !== y && !this._lock) {
          var S = P && y & 1, k = S === (P && p & 1);
          if (p < y && (S = !S), a = S ? 0 : h % u ? u : h, this._lock = 1, this.render(a || (O ? 0 : ye(p * _)), r, !u)._lock = 0, this._tTime = h, !r && this.parent && wi(this, "onRepeat"), this.vars.repeatRefresh && !O && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, k && (this._lock = 2, a = S ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !O && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          Sd(this, O);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = n0(this, ye(a), ye(d)), A && (h -= d - (d = A._start))), this._tTime = h, this._time = d, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !r && !y && (wi(this, "onStart"), this._tTime !== h))
        return this;
      if (d >= a && n >= 0)
        for (c = this._first; c; ) {
          if (g = c._next, (c._act || d >= c._start) && c._ts && A !== c) {
            if (c.parent !== this)
              return this.render(n, r, o);
            if (c.render(c._ts > 0 ? (d - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (d - c._start) * c._ts, r, o), d !== this._time || !this._ts && !w) {
              A = 0, g && (h += this._zTime = -1e-8);
              break;
            }
          }
          c = g;
        }
      else {
        c = this._last;
        for (var R = n < 0 ? n : d; c; ) {
          if (g = c._prev, (c._act || R <= c._end) && c._ts && A !== c) {
            if (c.parent !== this)
              return this.render(n, r, o);
            if (c.render(c._ts > 0 ? (R - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (R - c._start) * c._ts, r, o || ze && Zc(c)), d !== this._time || !this._ts && !w) {
              A = 0, g && (h += this._zTime = R ? -1e-8 : qe);
              break;
            }
          }
          c = g;
        }
      }
      if (A && !r && (this.pause(), A.render(d >= a ? 0 : -1e-8)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = T, Ha(this), this.render(n, r, o);
      this._onUpdate && !r && wi(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (T === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((n || !u) && (h === l && this._ts > 0 || !h && this._ts < 0) && Vn(this, 1), !r && !(n < 0 && !a) && (h || a || !l) && (wi(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, r) {
    var o = this;
    if (bn(r) || (r = ki(this, r, n)), !(n instanceof ho)) {
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
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof _e ? r && l.push(u) : (o && l.push(u), n && l.push.apply(l, u.getChildren(!0, r, o)))), u = u._next;
    return l;
  }, e.getById = function(n) {
    for (var r = this.getChildren(1, 1, 1), o = r.length; o--; )
      if (r[o].vars.id === n)
        return r[o];
  }, e.remove = function(n) {
    return Me(n) ? this.removeLabel(n) : ne(n) ? this.killTweensOf(n) : (n.parent === this && Va(this, n), n === this._recent && (this._recent = this._last), as(this));
  }, e.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(_i.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, r) {
    return this.labels[n] = ki(this, r), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, r, o) {
    var a = _e.delayedCall(0, r || lo, o);
    return a.data = "isPause", this._hasPause = 1, Qi(this, a, ki(this, n));
  }, e.removePause = function(n) {
    var r = this._first;
    for (n = ki(this, n); r; )
      r._start === n && r.data === "isPause" && Vn(r), r = r._next;
  }, e.killTweensOf = function(n, r, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      kn !== a[l] && a[l].kill(n, r);
    return this;
  }, e.getTweensOf = function(n, r) {
    for (var o = [], a = Di(n), l = this._first, u = bn(r), h; l; )
      l instanceof _e ? jm(l._targets, a) && (u ? (!kn || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && o.push(l) : (h = l.getTweensOf(a, r)).length && o.push.apply(o, h), l = l._next;
    return o;
  }, e.tweenTo = function(n, r) {
    r = r || {};
    var o = this, a = ki(o, n), l = r, u = l.startAt, h = l.onStart, f = l.onStartParams, d = l.immediateRender, c, g = _e.to(o, Si({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: r.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || qe,
      onStart: function() {
        if (o.pause(), !c) {
          var _ = r.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          g._dur !== _ && or(g, _, 0, 1).render(g._time, !0, !0), c = 1;
        }
        h && h.apply(g, f || []);
      }
    }, r));
    return d ? g.render(0) : g;
  }, e.tweenFromTo = function(n, r, o) {
    return this.tweenTo(r, Si({
      startAt: {
        time: ki(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), rh(this, ki(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), rh(this, ki(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + qe);
  }, e.shiftChildren = function(n, r, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, u; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (r)
      for (u in l)
        l[u] >= o && (l[u] += n);
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
    var r = 0, o = this, a = o._last, l = nn, u, h, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Qi(o, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (r -= h, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > r && a._ts && (r = a._end), a = u;
      or(o, o === te && o._time > r ? o._time : r, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (te._ts && (sd(te, Ta(n, te)), id = _i.frame), _i.frame >= eh) {
      eh += xi.autoSleep || 120;
      var r = te._first;
      if ((!r || !r._ts) && xi.autoSleep && _i._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || _i.sleep();
      }
    }
  }, t;
}(ho);
Si(ei.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var v0 = function(t, e, i, n, r, o, a) {
  var l = new li(this._pt, t, e, 0, 1, Id, null, r), u = 0, h = 0, f, d, c, g, p, _, w, A;
  for (l.b = i, l.e = n, i += "", n += "", (w = ~n.indexOf("random(")) && (n = co(n)), o && (A = [i, n], o(A, t, e), i = A[0], n = A[1]), d = i.match(rl) || []; f = rl.exec(n); )
    g = f[0], p = n.substring(u, f.index), c ? c = (c + 1) % 5 : p.substr(-5) === "rgba(" && (c = 1), g !== d[h++] && (_ = parseFloat(d[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: g.charAt(1) === "=" ? Ws(_, g) - _ : parseFloat(g) - _,
      m: c && c < 4 ? Math.round : 0
    }, u = rl.lastIndex);
  return l.c = u < n.length ? n.substring(u, n.length) : "", l.fp = a, (Zf.test(n) || w) && (l.e = 0), this._pt = l, l;
}, Qc = function(t, e, i, n, r, o, a, l, u, h) {
  ne(n) && (n = n(r || 0, t, o));
  var f = t[e], d = i !== "get" ? i : ne(f) ? u ? t[e.indexOf("set") || !ne(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : f, c = ne(f) ? u ? S0 : kd : tu, g;
  if (Me(n) && (~n.indexOf("random(") && (n = co(n)), n.charAt(1) === "=" && (g = Ws(d, n) + (He(d) || 0), (g || g === 0) && (n = g))), !h || d !== n || Wl)
    return !isNaN(d * n) && n !== "" ? (g = new li(this._pt, t, e, +d || 0, n - (d || 0), typeof f == "boolean" ? A0 : Md, 0, c), u && (g.fp = u), a && g.modifier(a, this, t), this._pt = g) : (!f && !(e in t) && Kc(e, n), v0.call(this, t, e, d, n, c, l || xi.stringFilter, u));
}, w0 = function(t, e, i, n, r) {
  if (ne(t) && (t = Yr(t, r, e, i, n)), !rn(t) || t.style && t.nodeType || Ue(t) || Gf(t))
    return Me(t) ? Yr(t, r, e, i, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Yr(t[a], r, e, i, n);
  return o;
}, Cd = function(t, e, i, n, r, o) {
  var a, l, u, h;
  if (gi[t] && (a = new gi[t]()).init(r, a.rawVars ? e[t] : w0(e[t], n, r, o, i), i, n, o) !== !1 && (i._pt = l = new li(i._pt, r, t, 0, 1, a.render, a, 0, a.priority), i !== Ns))
    for (u = i._ptLookup[i._targets.indexOf(r)], h = a._props.length; h--; )
      u[a._props[h]] = l;
  return a;
}, kn, Wl, Jc = function s(t, e, i) {
  var n = t.vars, r = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, u = n.onUpdate, h = n.runBackwards, f = n.yoyoEase, d = n.keyframes, c = n.autoRevert, g = t._dur, p = t._startAt, _ = t._targets, w = t.parent, A = w && w.data === "nested" ? w.vars.targets : _, C = t._overwrite === "auto" && !Yc, T = t.timeline, y, P, O, S, k, R, V, z, B, J, it, q, H;
  if (T && (!d || !r) && (r = "none"), t._ease = ls(r, nr.ease), t._yEase = f ? Td(ls(f === !0 ? r : f, nr.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !T && !!n.runBackwards, !T || d && !n.stagger) {
    if (z = _[0] ? os(_[0]).harness : 0, q = z && n[z.prop], y = xa(n, Xc), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !c ? p.render(-1, !0) : p.revert(h && g ? ra : Xm), p._lazy = 0), o) {
      if (Vn(t._startAt = _e.set(_, Si({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !p && oi(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return wi(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ze || !a && !c) && t._startAt.revert(ra), a && g && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && g && !p) {
      if (e && (a = !1), O = Si({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && oi(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), q && (O[z.prop] = q), Vn(t._startAt = _e.set(_, O)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ze ? t._startAt.revert(ra) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, qe, qe);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = g && oi(l) || l && !g, P = 0; P < _.length; P++) {
      if (k = _[P], V = k._gsap || jc(_)[P]._gsap, t._ptLookup[P] = J = {}, Nl[V.id] && zn.length && ba(), it = A === _ ? P : A.indexOf(k), z && (B = new z()).init(k, q || y, t, it, A) !== !1 && (t._pt = S = new li(t._pt, k, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(tt) {
        J[tt] = S;
      }), B.priority && (R = 1)), !z || q)
        for (O in y)
          gi[O] && (B = Cd(O, y, t, it, k, A)) ? B.priority && (R = 1) : J[O] = S = Qc.call(t, k, O, "get", y[O], it, A, 0, n.stringFilter);
      t._op && t._op[P] && t.kill(k, t._op[P]), C && t._pt && (kn = t, te.killTweensOf(k, J, t.globalTime(e)), H = !t.parent, kn = 0), t._pt && l && (Nl[V.id] = 1);
    }
    R && Dd(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !H, d && e <= 0 && T.render(nn, !0, !0);
}, b0 = function(t, e, i, n, r, o, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, f, d, c;
  if (!u)
    for (u = t._ptCache[e] = [], d = t._ptLookup, c = t._targets.length; c--; ) {
      if (h = d[c][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Wl = 1, t.vars[e] = "+=0", Jc(t, a), Wl = 0, l ? ao(e + " not eligible for reset") : 1;
      u.push(h);
    }
  for (c = u.length; c--; )
    f = u[c], h = f._pt || f, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + o * h.c, h.c = i - h.s, f.e && (f.e = le(i) + He(f.e)), f.b && (f.b = h.s + He(f.b));
}, x0 = function(t, e) {
  var i = t[0] ? os(t[0]).harness : 0, n = i && i.aliases, r, o, a, l;
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
  if (Ue(e))
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
}, Yr = function(t, e, i, n, r) {
  return ne(t) ? t.call(e, i, n, r) : Me(t) && ~t.indexOf("random(") ? co(t) : t;
}, Od = Gc + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Pd = {};
ai(Od + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Pd[s] = 1;
});
var _e = /* @__PURE__ */ function(s) {
  Kf(t, s);
  function t(i, n, r, o) {
    var a;
    typeof n == "number" && (r.duration = n, n = r, r = null), a = s.call(this, o ? n : Vr(n)) || this;
    var l = a.vars, u = l.duration, h = l.delay, f = l.immediateRender, d = l.stagger, c = l.overwrite, g = l.keyframes, p = l.defaults, _ = l.scrollTrigger, w = l.yoyoEase, A = n.parent || te, C = (Ue(i) || Gf(i) ? bn(i[0]) : "length" in n) ? [i] : Di(i), T, y, P, O, S, k, R, V;
    if (a._targets = C.length ? jc(C) : ao("GSAP target " + i + " not found. https://gsap.com", !xi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = c, g || d || Bo(u) || Bo(h)) {
      if (n = a.vars, T = a.timeline = new ei({
        data: "nested",
        defaults: p || {},
        targets: A && A.data === "nested" ? A.vars.targets : C
      }), T.kill(), T.parent = T._dp = fn(a), T._start = 0, d || Bo(u) || Bo(h)) {
        if (O = C.length, R = d && dd(d), rn(d))
          for (S in d)
            ~Od.indexOf(S) && (V || (V = {}), V[S] = d[S]);
        for (y = 0; y < O; y++)
          P = xa(n, Pd), P.stagger = 0, w && (P.yoyoEase = w), V && sr(P, V), k = C[y], P.duration = +Yr(u, fn(a), y, k, C), P.delay = (+Yr(h, fn(a), y, k, C) || 0) - a._delay, !d && O === 1 && P.delay && (a._delay = h = P.delay, a._start += h, P.delay = 0), T.to(k, P, R ? R(y, k, C) : 0), T._ease = At.none;
        T.duration() ? u = h = 0 : a.timeline = 0;
      } else if (g) {
        Vr(Si(T.vars.defaults, {
          ease: "none"
        })), T._ease = ls(g.ease || n.ease || "none");
        var z = 0, B, J, it;
        if (Ue(g))
          g.forEach(function(q) {
            return T.to(C, q, ">");
          }), T.duration();
        else {
          P = {};
          for (S in g)
            S === "ease" || S === "easeEach" || T0(S, g[S], P, g.easeEach);
          for (S in P)
            for (B = P[S].sort(function(q, H) {
              return q.t - H.t;
            }), z = 0, y = 0; y < B.length; y++)
              J = B[y], it = {
                ease: J.e,
                duration: (J.t - (y ? B[y - 1].t : 0)) / 100 * u
              }, it[S] = J.v, T.to(C, it, z), z += it.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || a.duration(u = T.duration());
    } else
      a.timeline = 0;
    return c === !0 && !Yc && (kn = fn(a), te.killTweensOf(C), kn = 0), Qi(A, fn(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !u && !g && a._start === ye(A._time) && oi(f) && t0(fn(a)) && A.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), _ && cd(fn(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(n, r, o) {
    var a = this._time, l = this._tDur, u = this._dur, h = n < 0, f = n > l - qe && !h ? l : n < qe ? 0 : n, d, c, g, p, _, w, A, C, T;
    if (!u)
      i0(this, n, r, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (d = f, C = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + n, r, o);
        if (d = ye(f % p), f === l ? (g = this._repeat, d = u) : (_ = ye(f / p), g = ~~_, g && g === _ ? (d = u, g--) : d > u && (d = u)), w = this._yoyo && g & 1, w && (T = this._yEase, d = u - d), _ = rr(this._tTime, p), d === a && !o && this._initted && g === _)
          return this._tTime = f, this;
        g !== _ && (C && this._yEase && Sd(C, w), this.vars.repeatRefresh && !w && !this._lock && d !== p && this._initted && (this._lock = o = 1, this.render(ye(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (ud(this, h ? n : d, o, r, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== _))
          return this;
        if (u !== this._dur)
          return this.render(n, r, o);
      }
      if (this._tTime = f, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (T || this._ease)(d / u), this._from && (this.ratio = A = 1 - A), !a && f && !r && !_ && (wi(this, "onStart"), this._tTime !== f))
        return this;
      for (c = this._pt; c; )
        c.r(A, c.d), c = c._next;
      C && C.render(n < 0 ? n : C._dur * C._ease(d / this._dur), r, o) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && $l(this, n, r, o), wi(this, "onUpdate")), this._repeat && g !== _ && this.vars.onRepeat && !r && this.parent && wi(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (h && !this._onUpdate && $l(this, n, !0, !0), (n || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Vn(this, 1), !r && !(h && !a) && (f || a || w) && (wi(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, r, o, a, l) {
    uo || _i.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Jc(this, u), h = this._ease(u / this._dur), b0(this, n, r, o, a, h, u, l) ? this.resetTo(n, r, o, a, 1) : (Ya(this, 0), this.parent || ad(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? Cr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!ze), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, kn && kn.vars.overwrite !== !0)._first || Cr(this), this.parent && o !== this.timeline.totalDuration() && or(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Di(n) : a, u = this._ptLookup, h = this._pt, f, d, c, g, p, _, w;
    if ((!r || r === "all") && Qm(a, l))
      return r === "all" && (this._pt = 0), Cr(this);
    for (f = this._op = this._op || [], r !== "all" && (Me(r) && (p = {}, ai(r, function(A) {
      return p[A] = 1;
    }), r = p), r = x0(a, r)), w = a.length; w--; )
      if (~l.indexOf(a[w])) {
        d = u[w], r === "all" ? (f[w] = r, g = d, c = {}) : (c = f[w] = f[w] || {}, g = r);
        for (p in g)
          _ = d && d[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Va(this, _, "_pt"), delete d[p]), c !== "all" && (c[p] = 1);
      }
    return this._initted && !this._pt && h && Cr(this), this;
  }, t.to = function(n, r) {
    return new t(n, r, arguments[2]);
  }, t.from = function(n, r) {
    return Hr(1, arguments);
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
    return Hr(2, arguments);
  }, t.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new t(n, r);
  }, t.killTweensOf = function(n, r, o) {
    return te.killTweensOf(n, r, o);
  }, t;
}(ho);
Si(_e.prototype, {
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
var tu = function(t, e, i) {
  return t[e] = i;
}, kd = function(t, e, i) {
  return t[e](i);
}, S0 = function(t, e, i, n) {
  return t[e](n.fp, i);
}, E0 = function(t, e, i) {
  return t.setAttribute(e, i);
}, eu = function(t, e) {
  return ne(t[e]) ? kd : Wc(t[e]) && t.setAttribute ? E0 : tu;
}, Md = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, A0 = function(t, e) {
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
}, iu = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, C0 = function(t, e, i, n) {
  for (var r = this._pt, o; r; )
    o = r._next, r.p === n && r.modifier(t, e, i), r = o;
}, O0 = function(t) {
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
  function s(e, i, n, r, o, a, l, u, h) {
    this.t = i, this.s = r, this.c = o, this.p = n, this.r = a || Md, this.d = l || this, this.set = u || tu, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = P0, this.m = i, this.mt = r, this.tween = n;
  }, s;
}();
ai(Gc + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return Xc[s] = 1;
});
Ti.TweenMax = Ti.TweenLite = _e;
Ti.TimelineLite = Ti.TimelineMax = ei;
te = new ei({
  sortChildren: !1,
  defaults: nr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
xi.stringFilter = xd;
var cs = [], aa = {}, k0 = [], ah = 0, M0 = 0, ul = function(t) {
  return (aa[t] || k0).map(function(e) {
    return e();
  });
}, ql = function() {
  var t = Date.now(), e = [];
  t - ah > 2 && (ul("matchMediaInit"), cs.forEach(function(i) {
    var n = i.queries, r = i.conditions, o, a, l, u;
    for (a in n)
      o = Gi.matchMedia(n[a]).matches, o && (l = 1), o !== r[a] && (r[a] = o, u = 1);
    u && (i.revert(), l && e.push(i));
  }), ul("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), ah = t, ul("matchMedia"));
}, Ld = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Hl(i), this.data = [], this._r = [], this.isReverted = !1, this.id = M0++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    ne(i) && (r = n, n = i, i = ne);
    var o = this, a = function() {
      var u = Qt, h = o.selector, f;
      return u && u !== o && u.data.push(o), r && (o.selector = Hl(r)), Qt = o, f = n.apply(o, arguments), ne(f) && o._r.push(f), Qt = u, o.selector = h, o.isReverted = !1, f;
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
        u = r.data[l], u instanceof ei ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof _e) && u.revert && u.revert(i);
      r._r.forEach(function(h) {
        return h(i, r);
      }), r.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = cs.length; o--; )
        cs[o].id === this.id && cs.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), I0 = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Qt && Qt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    rn(i) || (i = {
      matches: i
    });
    var o = new Ld(0, r || this.scope), a = o.conditions = {}, l, u, h;
    Qt && !o.selector && (o.selector = Qt.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = i;
    for (u in i)
      u === "all" ? h = 1 : (l = Gi.matchMedia(i[u]), l && (cs.indexOf(o) < 0 && cs.push(o), (a[u] = l.matches) && (h = 1), l.addListener ? l.addListener(ql) : l.addEventListener("change", ql)));
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
}(), Sa = {
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
    Me(t) && (t = Di(t)[0]);
    var r = os(t || {}).get, o = i ? od : rd;
    return i === "native" && (i = ""), t && (e ? o((gi[e] && gi[e].get || r)(t, e, i, n)) : function(a, l, u) {
      return o((gi[a] && gi[a].get || r)(t, a, l, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Di(t), t.length > 1) {
      var n = t.map(function(h) {
        return hi.quickSetter(h, e, i);
      }), r = n.length;
      return function(h) {
        for (var f = r; f--; )
          n[f](h);
      };
    }
    t = t[0] || {};
    var o = gi[e], a = os(t), l = a.harness && (a.harness.aliases || {})[e] || e, u = o ? function(h) {
      var f = new o();
      Ns._pt = 0, f.init(t, i ? h + i : h, Ns, 0, [t]), f.render(1, f), Ns._pt && iu(1, Ns);
    } : a.set(t, l);
    return o ? u : function(h) {
      return u(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var n, r = hi.to(t, Si((n = {}, n[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), o = function(l, u, h) {
      return r.resetTo(e, l, u, h);
    };
    return o.tween = r, o;
  },
  isTweening: function(t) {
    return te.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = ls(t.ease, nr.ease)), ih(nr, t || {});
  },
  config: function(t) {
    return ih(xi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, n = t.plugins, r = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !gi[a] && !Ti[a] && ao(e + " effect requires " + a + " plugin.");
    }), ol[e] = function(a, l, u) {
      return i(Di(a), Si(l || {}, r), u);
    }, o && (ei.prototype[e] = function(a, l, u) {
      return this.add(ol[e](a, rn(l) ? l : (u = l) && {}, this), u);
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
    return new I0(t);
  },
  matchMediaRefresh: function() {
    return cs.forEach(function(t) {
      var e = t.conditions, i, n;
      for (n in e)
        e[n] && (e[n] = !1, i = 1);
      i && t.revert();
    }) || ql();
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
    wrap: u0,
    wrapYoyo: h0,
    distribute: dd,
    random: gd,
    snap: pd,
    normalize: c0,
    getUnit: He,
    clamp: r0,
    splitColor: wd,
    toArray: Di,
    selector: Hl,
    mapRange: _d,
    pipe: a0,
    unitize: l0,
    interpolate: f0,
    shuffle: fd
  },
  install: td,
  effects: ol,
  ticker: _i,
  updateRoot: ei.updateRoot,
  plugins: gi,
  globalTimeline: te,
  core: {
    PropTween: li,
    globals: ed,
    Tween: _e,
    Timeline: ei,
    Animation: ho,
    getCache: os,
    _removeLinkedListItem: Va,
    reverting: function() {
      return ze;
    },
    context: function(t) {
      return t && Qt && (Qt.data.push(t), t._ctx = Qt), Qt;
    },
    suppressOverwrites: function(t) {
      return Yc = t;
    }
  }
};
ai("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Sa[s] = _e[s];
});
_i.add(ei.updateRoot);
Ns = Sa.to({}, {
  duration: 0
});
var D0 = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, L0 = function(t, e) {
  var i = t._targets, n, r, o;
  for (n in e)
    for (r = i.length; r--; )
      o = t._ptLookup[r][n], o && (o = o.d) && (o._pt && (o = D0(o, n)), o && o.modifier && o.modifier(e[n], t, i[r], n));
}, hl = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, o) {
      o._onInit = function(a) {
        var l, u;
        if (Me(r) && (l = {}, ai(r, function(h) {
          return l[h] = 1;
        }), r = l), e) {
          l = {};
          for (u in r)
            l[u] = e(r[u]);
          r = l;
        }
        L0(a, r);
      };
    }
  };
}, hi = Sa.registerPlugin({
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
}, hl("roundProps", Yl), hl("modifiers"), hl("snap", pd)) || Sa;
_e.version = ei.version = hi.version = "3.13.0";
Jf = 1;
qc() && ar();
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
var lh, Mn, qs, nu, is, ch, su, R0 = function() {
  return typeof window < "u";
}, xn = {}, Qn = 180 / Math.PI, Us = Math.PI / 180, As = Math.atan2, uh = 1e8, ru = /([A-Z])/g, z0 = /(left|right|width|margin|padding|x)/i, F0 = /[\s,\(]\S/, Ji = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ul = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, N0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, $0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, B0 = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Rd = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, zd = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, V0 = function(t, e, i) {
  return t.style[e] = i;
}, H0 = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Y0 = function(t, e, i) {
  return t._gsap[e] = i;
}, W0 = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, q0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(r, o);
}, U0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(r, o);
}, ee = "transform", ci = ee + "Origin", K0 = function s(t, e) {
  var i = this, n = this.target, r = n.style, o = n._gsap;
  if (t in xn && r) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ji[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = dn(n, a);
      }) : this.tfm[t] = o.x ? o[t] : dn(n, t), t === ci && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ji.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(ee) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(ci, e, "")), t = ee;
  }
  (r || e) && this.props.push(t, e, r[t]);
}, Fd = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, X0 = function() {
  var t = this.props, e = this.target, i = e.style, n = e._gsap, r, o;
  for (r = 0; r < t.length; r += 3)
    t[r + 1] ? t[r + 1] === 2 ? e[t[r]](t[r + 2]) : e[t[r]] = t[r + 2] : t[r + 2] ? i[t[r]] = t[r + 2] : i.removeProperty(t[r].substr(0, 2) === "--" ? t[r] : t[r].replace(ru, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), r = su(), (!r || !r.isStart) && !i[ee] && (Fd(i), n.zOrigin && i[ci] && (i[ci] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Nd = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: X0,
    save: K0
  };
  return t._gsap || hi.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, $d, Kl = function(t, e) {
  var i = Mn.createElementNS ? Mn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Mn.createElement(t);
  return i && i.style ? i : Mn.createElement(t);
}, Li = function s(t, e, i) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(ru, "-$1").toLowerCase()) || n.getPropertyValue(e) || !i && s(t, lr(e) || e, 1) || "";
}, hh = "O,Moz,ms,Ms,Webkit".split(","), lr = function(t, e, i) {
  var n = e || is, r = n.style, o = 5;
  if (t in r && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(hh[o] + t in r); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? hh[o] : "") + t;
}, Xl = function() {
  R0() && window.document && (lh = window, Mn = lh.document, qs = Mn.documentElement, is = Kl("div") || {
    style: {}
  }, Kl("div"), ee = lr(ee), ci = ee + "Origin", is.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", $d = !!lr("perspective"), su = hi.core.reverting, nu = 1);
}, fh = function(t) {
  var e = t.ownerSVGElement, i = Kl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = t.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), qs.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), qs.removeChild(i), r;
}, dh = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Bd = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = fh(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = fh(t)), e && !e.width && !e.x && !e.y ? {
    x: +dh(t, ["x", "cx", "x1"]) || 0,
    y: +dh(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Vd = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Bd(t));
}, _s = function(t, e) {
  if (e) {
    var i = t.style, n;
    e in xn && e !== ci && (e = ee), i.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(n === "--" ? e : e.replace(ru, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, In = function(t, e, i, n, r, o) {
  var a = new li(t._pt, e, i, 0, 1, o ? zd : Rd);
  return t._pt = a, a.b = n, a.e = r, t._props.push(i), a;
}, ph = {
  deg: 1,
  rad: 1,
  turn: 1
}, G0 = {
  grid: 1,
  flex: 1
}, Hn = function s(t, e, i, n) {
  var r = parseFloat(i) || 0, o = (i + "").trim().substr((r + "").length) || "px", a = is.style, l = z0.test(e), u = t.tagName.toLowerCase() === "svg", h = (u ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, d = n === "px", c = n === "%", g, p, _, w;
  if (n === o || !r || ph[n] || ph[o])
    return r;
  if (o !== "px" && !d && (r = s(t, e, i, "px")), w = t.getCTM && Vd(t), (c || o === "%") && (xn[e] || ~e.indexOf("adius")))
    return g = w ? t.getBBox()[l ? "width" : "height"] : t[h], le(c ? r / g * f : r / 100 * g);
  if (a[l ? "width" : "height"] = f + (d ? o : n), p = n !== "rem" && ~e.indexOf("adius") || n === "em" && t.appendChild && !u ? t : t.parentNode, w && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === Mn || !p.appendChild) && (p = Mn.body), _ = p._gsap, _ && c && _.width && l && _.time === _i.time && !_.uncache)
    return le(r / _.width * f);
  if (c && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = f + n, g = t[h], A ? t.style[e] = A : _s(t, e);
  } else
    (c || o === "%") && !G0[Li(p, "display")] && (a.position = Li(t, "position")), p === t && (a.position = "static"), p.appendChild(is), g = is[h], p.removeChild(is), a.position = "absolute";
  return l && c && (_ = os(p), _.time = _i.time, _.width = p[h]), le(d ? g * r / f : g && r ? f / g * r : 0);
}, dn = function(t, e, i, n) {
  var r;
  return nu || Xl(), e in Ji && e !== "transform" && (e = Ji[e], ~e.indexOf(",") && (e = e.split(",")[0])), xn[e] && e !== "transform" ? (r = po(t, n), r = e !== "transformOrigin" ? r[e] : r.svg ? r.origin : Aa(Li(t, ci)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = Ea[e] && Ea[e](t, e, i) || Li(t, e) || nd(t, e) || (e === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? Hn(t, e, r, i) + i : r;
}, j0 = function(t, e, i, n) {
  if (!i || i === "none") {
    var r = lr(e, t, 1), o = r && Li(t, r, 1);
    o && o !== i ? (e = r, i = o) : e === "borderColor" && (i = Li(t, "borderTopColor"));
  }
  var a = new li(this._pt, t.style, e, 0, 1, Id), l = 0, u = 0, h, f, d, c, g, p, _, w, A, C, T, y;
  if (a.b = i, a.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = Li(t, n.substring(4, n.indexOf(")")))), n === "auto" && (p = t.style[e], t.style[e] = n, n = Li(t, e) || n, p ? t.style[e] = p : _s(t, e)), h = [i, n], xd(h), i = h[0], n = h[1], d = i.match(Fs) || [], y = n.match(Fs) || [], y.length) {
    for (; f = Fs.exec(n); )
      _ = f[0], A = n.substring(l, f.index), g ? g = (g + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (g = 1), _ !== (p = d[u++] || "") && (c = parseFloat(p) || 0, T = p.substr((c + "").length), _.charAt(1) === "=" && (_ = Ws(c, _) + T), w = parseFloat(_), C = _.substr((w + "").length), l = Fs.lastIndex - C.length, C || (C = C || xi.units[e] || T, l === n.length && (n += C, a.e += C)), T !== C && (c = Hn(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: A || u === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: c,
        c: w - c,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
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
}, Z0 = function(t) {
  var e = t.split(" "), i = e[0], n = e[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (t = i, i = n, n = t), e[0] = gh[i] || i, e[1] = gh[n] || n, e.join(" ");
}, Q0 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, n = i.style, r = e.u, o = i._gsap, a, l, u;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), u = r.length; --u > -1; )
        a = r[u], xn[a] && (l = 1, a = a === "transformOrigin" ? ci : ee), _s(i, a);
    l && (_s(i, ee), o && (o.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", po(i, 1), o.uncache = 1, Fd(n)));
  }
}, Ea = {
  clearProps: function(t, e, i, n, r) {
    if (r.data !== "isFromStart") {
      var o = t._pt = new li(t._pt, e, i, 0, 0, Q0);
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
}, fo = [1, 0, 0, 1, 0, 0], Hd = {}, Yd = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, mh = function(t) {
  var e = Li(t, ee);
  return Yd(e) ? fo : e.substr(7).match(jf).map(le);
}, ou = function(t, e) {
  var i = t._gsap || os(t), n = t.style, r = mh(t), o, a, l, u;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? fo : r) : (r === fo && !t.offsetParent && t !== qs && !i.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, qs.appendChild(t)), r = mh(t), l ? n.display = l : _s(t, "display"), u && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : qs.removeChild(t))), e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, Gl = function(t, e, i, n, r, o) {
  var a = t._gsap, l = r || ou(t, !0), u = a.xOrigin || 0, h = a.yOrigin || 0, f = a.xOffset || 0, d = a.yOffset || 0, c = l[0], g = l[1], p = l[2], _ = l[3], w = l[4], A = l[5], C = e.split(" "), T = parseFloat(C[0]) || 0, y = parseFloat(C[1]) || 0, P, O, S, k;
  i ? l !== fo && (O = c * _ - g * p) && (S = T * (_ / O) + y * (-p / O) + (p * A - _ * w) / O, k = T * (-g / O) + y * (c / O) - (c * A - g * w) / O, T = S, y = k) : (P = Bd(t), T = P.x + (~C[0].indexOf("%") ? T / 100 * P.width : T), y = P.y + (~(C[1] || C[0]).indexOf("%") ? y / 100 * P.height : y)), n || n !== !1 && a.smooth ? (w = T - u, A = y - h, a.xOffset = f + (w * c + A * p) - w, a.yOffset = d + (w * g + A * _) - A) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = y, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!i, t.style[ci] = "0px 0px", o && (In(o, a, "xOrigin", u, T), In(o, a, "yOrigin", h, y), In(o, a, "xOffset", f, a.xOffset), In(o, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + y);
}, po = function(t, e) {
  var i = t._gsap || new Ad(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var n = t.style, r = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), u = Li(t, ci) || "0", h, f, d, c, g, p, _, w, A, C, T, y, P, O, S, k, R, V, z, B, J, it, q, H, tt, ot, b, j, nt, U, rt, Dt;
  return h = f = d = p = _ = w = A = C = T = 0, c = g = 1, i.svg = !!(t.getCTM && Vd(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[ee] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ee] !== "none" ? l[ee] : "")), n.scale = n.rotate = n.translate = "none"), O = ou(t, i.svg), i.svg && (i.uncache ? (tt = t.getBBox(), u = i.xOrigin - tt.x + "px " + (i.yOrigin - tt.y) + "px", H = "") : H = !e && t.getAttribute("data-svg-origin"), Gl(t, H || u, !!H || i.originIsAbsolute, i.smooth !== !1, O)), y = i.xOrigin || 0, P = i.yOrigin || 0, O !== fo && (V = O[0], z = O[1], B = O[2], J = O[3], h = it = O[4], f = q = O[5], O.length === 6 ? (c = Math.sqrt(V * V + z * z), g = Math.sqrt(J * J + B * B), p = V || z ? As(z, V) * Qn : 0, A = B || J ? As(B, J) * Qn + p : 0, A && (g *= Math.abs(Math.cos(A * Us))), i.svg && (h -= y - (y * V + P * B), f -= P - (y * z + P * J))) : (Dt = O[6], U = O[7], b = O[8], j = O[9], nt = O[10], rt = O[11], h = O[12], f = O[13], d = O[14], S = As(Dt, nt), _ = S * Qn, S && (k = Math.cos(-S), R = Math.sin(-S), H = it * k + b * R, tt = q * k + j * R, ot = Dt * k + nt * R, b = it * -R + b * k, j = q * -R + j * k, nt = Dt * -R + nt * k, rt = U * -R + rt * k, it = H, q = tt, Dt = ot), S = As(-B, nt), w = S * Qn, S && (k = Math.cos(-S), R = Math.sin(-S), H = V * k - b * R, tt = z * k - j * R, ot = B * k - nt * R, rt = J * R + rt * k, V = H, z = tt, B = ot), S = As(z, V), p = S * Qn, S && (k = Math.cos(S), R = Math.sin(S), H = V * k + z * R, tt = it * k + q * R, z = z * k - V * R, q = q * k - it * R, V = H, it = tt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, w = 180 - w), c = le(Math.sqrt(V * V + z * z + B * B)), g = le(Math.sqrt(q * q + Dt * Dt)), S = As(it, q), A = Math.abs(S) > 2e-4 ? S * Qn : 0, T = rt ? 1 / (rt < 0 ? -rt : rt) : 0), i.svg && (H = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Yd(Li(t, ee)), H && t.setAttribute("transform", H))), Math.abs(A) > 90 && Math.abs(A) < 270 && (r ? (c *= -1, A += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, A += A <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = f - ((i.yPercent = f && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = d + o, i.scaleX = le(c), i.scaleY = le(g), i.rotation = le(p) + a, i.rotationX = le(_) + a, i.rotationY = le(w) + a, i.skewX = A + a, i.skewY = C + a, i.transformPerspective = T + o, (i.zOrigin = parseFloat(u.split(" ")[2]) || !e && i.zOrigin || 0) && (n[ci] = Aa(u)), i.xOffset = i.yOffset = 0, i.force3D = xi.force3D, i.renderTransform = i.svg ? t_ : $d ? Wd : J0, i.uncache = 0, i;
}, Aa = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, fl = function(t, e, i) {
  var n = He(e);
  return le(parseFloat(e) + parseFloat(Hn(t, "x", i + "px", n))) + n;
}, J0 = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Wd(t, e);
}, Gn = "0deg", vr = "0px", jn = ") ", Wd = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.z, u = i.rotation, h = i.rotationY, f = i.rotationX, d = i.skewX, c = i.skewY, g = i.scaleX, p = i.scaleY, _ = i.transformPerspective, w = i.force3D, A = i.target, C = i.zOrigin, T = "", y = w === "auto" && t && t !== 1 || w === !0;
  if (C && (f !== Gn || h !== Gn)) {
    var P = parseFloat(h) * Us, O = Math.sin(P), S = Math.cos(P), k;
    P = parseFloat(f) * Us, k = Math.cos(P), o = fl(A, o, O * k * -C), a = fl(A, a, -Math.sin(P) * -C), l = fl(A, l, S * k * -C + C);
  }
  _ !== vr && (T += "perspective(" + _ + jn), (n || r) && (T += "translate(" + n + "%, " + r + "%) "), (y || o !== vr || a !== vr || l !== vr) && (T += l !== vr || y ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + jn), u !== Gn && (T += "rotate(" + u + jn), h !== Gn && (T += "rotateY(" + h + jn), f !== Gn && (T += "rotateX(" + f + jn), (d !== Gn || c !== Gn) && (T += "skew(" + d + ", " + c + jn), (g !== 1 || p !== 1) && (T += "scale(" + g + ", " + p + jn), A.style[ee] = T || "translate(0, 0)";
}, t_ = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.rotation, u = i.skewX, h = i.skewY, f = i.scaleX, d = i.scaleY, c = i.target, g = i.xOrigin, p = i.yOrigin, _ = i.xOffset, w = i.yOffset, A = i.forceCSS, C = parseFloat(o), T = parseFloat(a), y, P, O, S, k;
  l = parseFloat(l), u = parseFloat(u), h = parseFloat(h), h && (h = parseFloat(h), u += h, l += h), l || u ? (l *= Us, u *= Us, y = Math.cos(l) * f, P = Math.sin(l) * f, O = Math.sin(l - u) * -d, S = Math.cos(l - u) * d, u && (h *= Us, k = Math.tan(u - h), k = Math.sqrt(1 + k * k), O *= k, S *= k, h && (k = Math.tan(h), k = Math.sqrt(1 + k * k), y *= k, P *= k)), y = le(y), P = le(P), O = le(O), S = le(S)) : (y = f, S = d, P = O = 0), (C && !~(o + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (C = Hn(c, "x", o, "px"), T = Hn(c, "y", a, "px")), (g || p || _ || w) && (C = le(C + g - (g * y + p * O) + _), T = le(T + p - (g * P + p * S) + w)), (n || r) && (k = c.getBBox(), C = le(C + n / 100 * k.width), T = le(T + r / 100 * k.height)), k = "matrix(" + y + "," + P + "," + O + "," + S + "," + C + "," + T + ")", c.setAttribute("transform", k), A && (c.style[ee] = k);
}, e_ = function(t, e, i, n, r) {
  var o = 360, a = Me(r), l = parseFloat(r) * (a && ~r.indexOf("rad") ? Qn : 1), u = l - n, h = n + u + "deg", f, d;
  return a && (f = r.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -360)), f === "cw" && u < 0 ? u = (u + o * uh) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * uh) % o - ~~(u / o) * o)), t._pt = d = new li(t._pt, e, i, n, u, N0), d.e = h, d.u = "deg", t._props.push(i), d;
}, _h = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, i_ = function(t, e, i) {
  var n = _h({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, u, h, f, d, c, g;
  n.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), o[ee] = e, a = po(i, 1), _s(i, ee), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[ee], o[ee] = e, a = po(i, 1), o[ee] = u);
  for (l in xn)
    u = n[l], h = a[l], u !== h && r.indexOf(l) < 0 && (c = He(u), g = He(h), f = c !== g ? Hn(i, l, u, g) : parseFloat(u), d = parseFloat(h), t._pt = new li(t._pt, a, l, f, d - f, Ul), t._pt.u = g || 0, t._props.push(l));
  _h(a, n);
};
ai("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", n = "Bottom", r = "Left", o = (t < 3 ? [e, i, n, r] : [e + r, e + i, n + i, n + r]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  Ea[t > 1 ? "border" + s : s] = function(a, l, u, h, f) {
    var d, c;
    if (arguments.length < 4)
      return d = o.map(function(g) {
        return dn(a, g, u);
      }), c = d.join(" "), c.split(d[0]).length === 5 ? d[0] : c;
    d = (h + "").split(" "), c = {}, o.forEach(function(g, p) {
      return c[g] = d[p] = d[p] || d[(p - 1) / 2 | 0];
    }), a.init(l, c, f);
  };
});
var qd = {
  name: "css",
  register: Xl,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, n, r) {
    var o = this._props, a = t.style, l = i.vars.startAt, u, h, f, d, c, g, p, _, w, A, C, T, y, P, O, S;
    nu || Xl(), this.styles = this.styles || Nd(t), S = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(gi[p] && Cd(p, e, i, n, t, r)))) {
        if (c = typeof h, g = Ea[p], c === "function" && (h = h.call(i, n, t, r), c = typeof h), c === "string" && ~h.indexOf("random(") && (h = co(h)), g)
          g(this, t, p, h, i) && (O = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Fn.lastIndex = 0, Fn.test(u) || (_ = He(u), w = He(h)), w ? _ !== w && (u = Hn(t, p, u, w) + w) : _ && (h += _), this.add(a, "setProperty", u, h, n, r, 0, 0, p), o.push(p), S.push(p, 0, a[p]);
        else if (c !== "undefined") {
          if (l && p in l ? (u = typeof l[p] == "function" ? l[p].call(i, n, t, r) : l[p], Me(u) && ~u.indexOf("random(") && (u = co(u)), He(u + "") || u === "auto" || (u += xi.units[p] || He(dn(t, p)) || ""), (u + "").charAt(1) === "=" && (u = dn(t, p))) : u = dn(t, p), d = parseFloat(u), A = c === "string" && h.charAt(1) === "=" && h.substr(0, 2), A && (h = h.substr(2)), f = parseFloat(h), p in Ji && (p === "autoAlpha" && (d === 1 && dn(t, "visibility") === "hidden" && f && (d = 0), S.push("visibility", 0, a.visibility), In(this, a, "visibility", d ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), p !== "scale" && p !== "transform" && (p = Ji[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in xn, C) {
            if (this.styles.save(p), c === "string" && h.substring(0, 6) === "var(--" && (h = Li(t, h.substring(4, h.indexOf(")"))), f = parseFloat(h)), T || (y = t._gsap, y.renderTransform && !e.parseTransform || po(t, e.parseTransform), P = e.smoothOrigin !== !1 && y.smooth, T = this._pt = new li(this._pt, a, ee, 0, 1, y.renderTransform, y, 0, -1), T.dep = 1), p === "scale")
              this._pt = new li(this._pt, y, "scaleY", y.scaleY, (A ? Ws(y.scaleY, A + f) : f) - y.scaleY || 0, Ul), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              S.push(ci, 0, a[ci]), h = Z0(h), y.svg ? Gl(t, h, 0, P, 0, this) : (w = parseFloat(h.split(" ")[2]) || 0, w !== y.zOrigin && In(this, y, "zOrigin", y.zOrigin, w), In(this, a, p, Aa(u), Aa(h)));
              continue;
            } else if (p === "svgOrigin") {
              Gl(t, h, 1, P, 0, this);
              continue;
            } else if (p in Hd) {
              e_(this, y, p, d, A ? Ws(d, A + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              In(this, y, "smooth", y.smooth, h);
              continue;
            } else if (p === "force3D") {
              y[p] = h;
              continue;
            } else if (p === "transform") {
              i_(this, h, t);
              continue;
            }
          } else p in a || (p = lr(p) || p);
          if (C || (f || f === 0) && (d || d === 0) && !F0.test(h) && p in a)
            _ = (u + "").substr((d + "").length), f || (f = 0), w = He(h) || (p in xi.units ? xi.units[p] : _), _ !== w && (d = Hn(t, p, u, w)), this._pt = new li(this._pt, C ? y : a, p, d, (A ? Ws(d, A + f) : f) - d, !C && (w === "px" || p === "zIndex") && e.autoRound !== !1 ? B0 : Ul), this._pt.u = w || 0, _ !== w && w !== "%" && (this._pt.b = u, this._pt.r = $0);
          else if (p in a)
            j0.call(this, t, p, u, A ? A + h : h);
          else if (p in t)
            this.add(t, p, u || t[p], A ? A + h : h, n, r);
          else if (p !== "parseTransform") {
            Kc(p, h);
            continue;
          }
          C || (p in a ? S.push(p, 0, a[p]) : typeof t[p] == "function" ? S.push(p, 2, t[p]()) : S.push(p, 1, u || t[p])), o.push(p);
        }
      }
    O && Dd(this);
  },
  render: function(t, e) {
    if (e.tween._time || !su())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: dn,
  aliases: Ji,
  getSetter: function(t, e, i) {
    var n = Ji[e];
    return n && n.indexOf(",") < 0 && (e = n), e in xn && e !== ci && (t._gsap.x || dn(t, "x")) ? i && ch === i ? e === "scale" ? W0 : Y0 : (ch = i || {}) && (e === "scale" ? q0 : U0) : t.style && !Wc(t.style[e]) ? V0 : ~e.indexOf("-") ? H0 : eu(t, e);
  },
  core: {
    _removeProperty: _s,
    _getMatrix: ou
  }
};
hi.utils.checkPrefix = lr;
hi.core.getStyleSaver = Nd;
(function(s, t, e, i) {
  var n = ai(s + "," + t + "," + e, function(r) {
    xn[r] = 1;
  });
  ai(t, function(r) {
    xi.units[r] = "deg", Hd[r] = 1;
  }), Ji[n[13]] = s + "," + t, ai(i, function(r) {
    var o = r.split(":");
    Ji[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ai("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  xi.units[s] = "px";
});
hi.registerPlugin(qd);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var mn, us, au, Wa, Pr, la, Ca, Wr, Yi = "transform", jl = Yi + "Origin", Ud, Kd = function(t) {
  var e = t.ownerDocument || t;
  for (!(Yi in t.style) && ("msTransform" in t.style) && (Yi = "msTransform", jl = Yi + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (us = window, Ca = new ys(), e) {
    mn = e, au = e.documentElement, Wa = e.body, Wr = mn.createElementNS("http://www.w3.org/2000/svg", "g"), Wr.style.transform = "none";
    var i = e.createElement("div"), n = e.createElement("div"), r = e && (e.body || e.firstElementChild);
    r && r.appendChild && (r.appendChild(i), i.appendChild(n), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), Ud = n.offsetParent !== i, r.removeChild(i));
  }
  return e;
}, n_ = function(t) {
  for (var e, i; t && t !== Wa; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Xd = [], Gd = [], s_ = function() {
  return us.pageYOffset || mn.scrollTop || au.scrollTop || Wa.scrollTop || 0;
}, r_ = function() {
  return us.pageXOffset || mn.scrollLeft || au.scrollLeft || Wa.scrollLeft || 0;
}, lu = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, o_ = function s(t) {
  if (us.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, dl = function s(t, e) {
  if (t.parentNode && (mn || Kd(t))) {
    var i = lu(t), n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", r = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", u = mn.createElementNS ? mn.createElementNS(n.replace(/^https/, "http"), r) : mn.createElement(r);
    return e && (i ? (la || (la = s(t)), u.setAttribute("width", 0.01), u.setAttribute("height", 0.01), u.setAttribute("transform", "translate(" + o + "," + a + ")"), la.appendChild(u)) : (Pr || (Pr = s(t), Pr.style.cssText = l), u.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", Pr.appendChild(u))), u;
  }
  throw "Need document and parent.";
}, a_ = function(t) {
  for (var e = new ys(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, l_ = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Yi], t.style[Yi] = "none", t.appendChild(Wr), e = Wr.getCTM(), t.removeChild(Wr), i ? t.style[Yi] = i : t.style.removeProperty(Yi.replace(/([A-Z])/g, "-$1").toLowerCase())), e || Ca.clone();
}, c_ = function(t, e) {
  var i = lu(t), n = t === i, r = i ? Xd : Gd, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, l, u, h, f, d, c;
  if (t === us)
    return t;
  if (r.length || r.push(dl(t, 1), dl(t, 2), dl(t, 3)), l = i ? la : Pr, i)
    n ? (h = l_(t), f = -h.e / h.a, d = -h.f / h.d, u = Ca) : t.getBBox ? (h = t.getBBox(), u = t.transform ? t.transform.baseVal : {}, u = u.numberOfItems ? u.numberOfItems > 1 ? a_(u) : u.getItem(0).matrix : Ca, f = u.a * h.x + u.c * h.y, d = u.b * h.x + u.d * h.y) : (u = new ys(), f = d = 0), (n ? i : o).appendChild(l), l.setAttribute("transform", "matrix(" + u.a + "," + u.b + "," + u.c + "," + u.d + "," + (u.e + f) + "," + (u.f + d) + ")");
  else {
    if (f = d = 0, Ud)
      for (u = t.offsetParent, h = t; h && (h = h.parentNode) && h !== u && h.parentNode; )
        (us.getComputedStyle(h)[Yi] + "").length > 4 && (f = h.offsetLeft, d = h.offsetTop, h = 0);
    if (c = us.getComputedStyle(t), c.position !== "absolute" && c.position !== "fixed")
      for (u = t.offsetParent; o && o !== u; )
        f += o.scrollLeft || 0, d += o.scrollTop || 0, o = o.parentNode;
    h = l.style, h.top = t.offsetTop - d + "px", h.left = t.offsetLeft - f + "px", h[Yi] = c[Yi], h[jl] = c[jl], h.position = c.position === "fixed" ? "fixed" : "absolute", a.appendChild(l);
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
    var i = this.a, n = this.b, r = this.c, o = this.d, a = this.e, l = this.f, u = i * o - n * r || 1e-10;
    return pl(this, o / u, -n / u, -r / u, i / u, (r * l - o * a) / u, -(i * l - n * a) / u);
  }, t.multiply = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, u = this.f, h = i.a, f = i.c, d = i.b, c = i.d, g = i.e, p = i.f;
    return pl(this, h * n + d * o, h * r + d * a, f * n + c * o, f * r + c * a, l + g * n + p * o, u + g * r + p * a);
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
function es(s, t, e, i) {
  if (!s || !s.parentNode || (mn || Kd(s)).documentElement === s)
    return new ys();
  var n = n_(s), r = lu(s), o = r ? Xd : Gd, a = c_(s), l = o[0].getBoundingClientRect(), u = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), f = a.parentNode, d = o_(s), c = new ys((u.left - l.left) / 100, (u.top - l.top) / 100, (h.left - l.left) / 100, (h.top - l.top) / 100, l.left + (d ? 0 : r_()), l.top + (d ? 0 : s_()));
  if (f.removeChild(a), n)
    for (l = n.length; l--; )
      u = n[l], u.scaleX = u.scaleY = 0, u.renderTransform(1, u);
  return t ? c.inverse() : c;
}
function yh(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function u_(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var Et, Yt, yi, qi, _n, gl, pn, Zl, kr, Dn, jd, Ql, go, cu, Mr, Bi, Ir, ca, Zd, Jl, Oa = 0, Qd = function() {
  return typeof window < "u";
}, Jd = function() {
  return Et || Qd() && (Et = window.gsap) && Et.registerPlugin && Et;
}, Pn = function(t) {
  return typeof t == "function";
}, qr = function(t) {
  return typeof t == "object";
}, Hi = function(t) {
  return typeof t > "u";
}, ua = function() {
  return !1;
}, Ur = "transform", tc = "transformOrigin", Sn = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, wr = Array.isArray, Vo = function(t, e) {
  var i = yi.createElementNS ? yi.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : yi.createElement(t);
  return i.style ? i : yi.createElement(t);
}, vh = 180 / Math.PI, Cs = 1e20, h_ = new ys(), En = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, hs = [], Ks = {}, f_ = 0, d_ = /^(?:a|input|textarea|button|select)$/i, wh = 0, Os = {}, hn = {}, tp = function(t, e) {
  var i = {}, n;
  for (n in t)
    i[n] = e ? t[n] * e : t[n];
  return i;
}, p_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, bh = function s(t, e) {
  for (var i = t.length, n; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), n = t[i].children, n && n.length && s(n, e);
}, ep = function() {
  return hs.forEach(function(t) {
    return t();
  });
}, g_ = function(t) {
  hs.push(t), hs.length === 1 && Et.ticker.add(ep);
}, xh = function() {
  return !hs.length && Et.ticker.remove(ep);
}, Th = function(t) {
  for (var e = hs.length; e--; )
    hs[e] === t && hs.splice(e, 1);
  Et.to(xh, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: xh,
    data: "_draggable"
  });
}, m_ = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Se = function(t, e, i, n) {
  if (t.addEventListener) {
    var r = go[e];
    n = n || (jd ? {
      passive: !1
    } : null), t.addEventListener(r || e, i, n), r && e !== r && t.addEventListener(e, i, n);
  }
}, pe = function(t, e, i, n) {
  if (t.removeEventListener) {
    var r = go[e];
    t.removeEventListener(r || e, i, n), r && e !== r && t.removeEventListener(e, i, n);
  }
}, Oi = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, __ = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, y_ = function s(t) {
  cu = t.touches && Oa < t.touches.length, pe(t.target, "touchend", s);
}, Sh = function(t) {
  cu = t.touches && Oa < t.touches.length, Se(t.target, "touchend", y_);
}, Xs = function(t) {
  return Yt.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Gs = function(t) {
  return Yt.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, Eh = function s(t, e) {
  Se(t, "scroll", e), cr(t.parentNode) || s(t.parentNode, e);
}, Ah = function s(t, e) {
  pe(t, "scroll", e), cr(t.parentNode) || s(t.parentNode, e);
}, cr = function(t) {
  return !t || t === qi || t.nodeType === 9 || t === yi.body || t === Yt || !t.nodeType || !t.parentNode;
}, Ch = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return Math.max(0, cr(t) ? Math.max(qi[n], _n[n]) - (Yt["inner" + i] || qi[r] || _n[r]) : t[n] - t[r]);
}, ml = function s(t, e) {
  var i = Ch(t, "x"), n = Ch(t, "y");
  cr(t) ? t = hn : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = n, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, _l = function(t, e, i) {
  var n = t.style;
  n && (Hi(n[e]) && (e = kr(e, t) || e), i == null ? n.removeProperty && n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n[e] = i);
}, mo = function(t) {
  return Yt.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Zn = {}, Ps = function(t) {
  if (t === Yt)
    return Zn.left = Zn.top = 0, Zn.width = Zn.right = qi.clientWidth || t.innerWidth || _n.clientWidth || 0, Zn.height = Zn.bottom = (t.innerHeight || 0) - 20 < qi.clientHeight ? qi.clientHeight : t.innerHeight || _n.clientHeight || 0, Zn;
  var e = t.ownerDocument || yi, i = Hi(t.pageX) ? !t.nodeType && !Hi(t.left) && !Hi(t.top) ? t : Dn(t)[0].getBoundingClientRect() : {
    left: t.pageX - Gs(e),
    top: t.pageY - Xs(e),
    right: t.pageX - Gs(e) + 1,
    bottom: t.pageY - Xs(e) + 1
  };
  return Hi(i.right) && !Hi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Hi(i.width) && (i = {
    width: i.right - i.left,
    height: i.bottom - i.top,
    right: i.right,
    left: i.left,
    bottom: i.bottom,
    top: i.top
  }), i;
}, ae = function(t, e, i) {
  var n = t.vars, r = n[i], o = t._listeners[e], a;
  return Pn(r) && (a = r.apply(n.callbackScope || t, n[i + "Params"] || [t.pointerEvent])), o && t.dispatchEvent(e) === !1 && (a = !1), a;
}, Oh = function(t, e) {
  var i = Dn(t)[0], n, r, o;
  return !i.nodeType && i !== Yt ? Hi(t.left) ? (r = t.min || t.minX || t.minRotation || 0, n = t.min || t.minY || 0, {
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
  }) : v_(i, e);
}, Pi = {}, v_ = function(t, e) {
  e = Dn(e)[0];
  var i = t.getBBox && t.ownerSVGElement, n = t.ownerDocument || yi, r, o, a, l, u, h, f, d, c, g, p, _, w;
  if (t === Yt)
    a = Xs(n), r = Gs(n), o = r + (n.documentElement.clientWidth || t.innerWidth || n.body.clientWidth || 0), l = a + ((t.innerHeight || 0) - 20 < n.documentElement.clientHeight ? n.documentElement.clientHeight : t.innerHeight || n.body.clientHeight || 0);
  else {
    if (e === Yt || Hi(e))
      return t.getBoundingClientRect();
    r = a = 0, i ? (g = t.getBBox(), p = g.width, _ = g.height) : (t.viewBox && (g = t.viewBox.baseVal) && (r = g.x || 0, a = g.y || 0, p = g.width, _ = g.height), p || (w = mo(t), g = w.boxSizing === "border-box", p = (parseFloat(w.width) || t.clientWidth || 0) + (g ? 0 : parseFloat(w.borderLeftWidth) + parseFloat(w.borderRightWidth)), _ = (parseFloat(w.height) || t.clientHeight || 0) + (g ? 0 : parseFloat(w.borderTopWidth) + parseFloat(w.borderBottomWidth)))), o = p, l = _;
  }
  return t === e ? {
    left: r,
    top: a,
    width: o - r,
    height: l - a
  } : (u = es(e, !0).multiply(es(t)), h = u.apply({
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
}, yl = function(t, e, i, n, r, o) {
  var a = {}, l, u, h;
  if (e)
    if (r !== 1 && e instanceof Array) {
      if (a.end = l = [], h = e.length, qr(e[0]))
        for (u = 0; u < h; u++)
          l[u] = tp(e[u], r);
      else
        for (u = 0; u < h; u++)
          l[u] = e[u] * r;
      i += 1.1, n -= 1.1;
    } else Pn(e) ? a.end = function(f) {
      var d = e.call(t, f), c, g;
      if (r !== 1)
        if (qr(d)) {
          c = {};
          for (g in d)
            c[g] = d[g] * r;
          d = c;
        } else
          d *= r;
      return d;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (n || n === 0) && (a.min = n), o && (a.velocity = 0), a;
}, w_ = function s(t) {
  var e;
  return !t || !t.getAttribute || t === _n ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (d_.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, Ho = function(t, e) {
  for (var i = t.length, n; i--; )
    n = t[i], n.ondragstart = n.onselectstart = e ? null : ua, Et.set(n, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, b_ = function s(t) {
  if (mo(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, ip, ec, x_ = function(t, e) {
  t = Et.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), n = i.style, r = t.firstChild, o = 0, a = 0, l = t.scrollTop, u = t.scrollLeft, h = t.scrollWidth, f = t.scrollHeight, d = 0, c = 0, g = 0, p, _, w, A, C, T;
  ip && e.force3D !== !1 ? (C = "translate3d(", T = "px,0px)") : Ur && (C = "translate(", T = "px)"), this.scrollTop = function(y, P) {
    if (!arguments.length)
      return -this.top();
    this.top(-y, P);
  }, this.scrollLeft = function(y, P) {
    if (!arguments.length)
      return -this.left();
    this.left(-y, P);
  }, this.left = function(y, P) {
    if (!arguments.length)
      return -(t.scrollLeft + a);
    var O = t.scrollLeft - u, S = a;
    if ((O > 2 || O < -2) && !P) {
      u = t.scrollLeft, Et.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-u), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (a = y - 0.5 | 0, y = 0) : y > c ? (a = y - c | 0, y = c) : a = 0, (a || S) && (this._skip || (n[Ur] = C + -a + "px," + -o + T), a + d >= 0 && (n.paddingRight = a + d + "px")), t.scrollLeft = y | 0, u = t.scrollLeft;
  }, this.top = function(y, P) {
    if (!arguments.length)
      return -(t.scrollTop + o);
    var O = t.scrollTop - l, S = o;
    if ((O > 2 || O < -2) && !P) {
      l = t.scrollTop, Et.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-l), e.onKill && e.onKill();
      return;
    }
    y = -y, y < 0 ? (o = y - 0.5 | 0, y = 0) : y > g ? (o = y - g | 0, y = g) : o = 0, (o || S) && (this._skip || (n[Ur] = C + -a + "px," + -o + T)), t.scrollTop = y | 0, l = t.scrollTop;
  }, this.maxScrollTop = function() {
    return g;
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
  }, this.calibrate = function(y) {
    var P = t.clientWidth === p, O, S, k;
    l = t.scrollTop, u = t.scrollLeft, !(P && t.clientHeight === _ && i.offsetHeight === w && h === t.scrollWidth && f === t.scrollHeight && !y) && ((o || a) && (S = this.left(), k = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), O = mo(t), (!P || y) && (n.display = "block", n.width = "auto", n.paddingRight = "0px", d = Math.max(0, t.scrollWidth - t.clientWidth), d && (d += parseFloat(O.paddingLeft) + (ec ? parseFloat(O.paddingRight) : 0))), n.display = "inline-block", n.position = "relative", n.overflow = "visible", n.verticalAlign = "top", n.boxSizing = "content-box", n.width = "100%", n.paddingRight = d + "px", ec && (n.paddingBottom = O.paddingBottom), p = t.clientWidth, _ = t.clientHeight, h = t.scrollWidth, f = t.scrollHeight, c = t.scrollWidth - p, g = t.scrollHeight - _, w = i.offsetHeight, n.display = "block", (S || k) && (this.left(S), this.top(k)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, vl = function(t) {
  if (Qd() && document.body) {
    var e = window && window.navigator;
    Yt = window, yi = document, qi = yi.documentElement, _n = yi.body, gl = Vo("div"), ca = !!window.PointerEvent, pn = Vo("div"), pn.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Ir = pn.style.cursor === "grab" ? "grab" : "move", Mr = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Ql = "ontouchstart" in qi && "orientation" in Yt || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), ec = function() {
      var i = Vo("div"), n = Vo("div"), r = n.style, o = _n, a;
      return r.display = "inline-block", r.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(n), o.appendChild(i), a = n.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), go = function(i) {
      for (var n = i.split(","), r = ("onpointerdown" in gl ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in gl ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
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
    }("touchstart,touchmove,touchend,touchcancel"), Se(yi, "touchcancel", ua), Se(Yt, "touchmove", ua), _n && _n.addEventListener("touchstart", ua), Se(yi, "contextmenu", function() {
      for (var i in Ks)
        Ks[i].isPressed && Ks[i].endDrag();
    }), Et = Zl = Jd();
  }
  Et ? (Bi = Et.plugins.inertia, Zd = Et.core.context || function() {
  }, kr = Et.utils.checkPrefix, Ur = kr(Ur), tc = kr(tc), Dn = Et.utils.toArray, Jl = Et.core.getStyleSaver, ip = !!kr("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, T_ = /* @__PURE__ */ function() {
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
    n = s.call(this) || this, Zl || vl(1), e = Dn(e)[0], n.styles = Jl && Jl(e, "transform,left,top"), Bi || (Bi = Et.plugins.inertia), n.vars = i = tp(i || {}), n.target = e, n.x = n.y = n.rotation = 0, n.dragResistance = parseFloat(i.dragResistance) || 0, n.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, n.lockAxis = i.lockAxis, n.autoScroll = i.autoScroll || 0, n.lockedAxis = null, n.allowEventDefault = !!i.allowEventDefault, Et.getProperty(e, "x");
    var r = (i.type || "x,y").toLowerCase(), o = ~r.indexOf("x") || ~r.indexOf("y"), a = r.indexOf("rotation") !== -1, l = a ? "rotation" : o ? "x" : "left", u = o ? "y" : "top", h = !!(~r.indexOf("x") || ~r.indexOf("left") || r === "scroll"), f = !!(~r.indexOf("y") || ~r.indexOf("top") || r === "scroll"), d = i.minimumMovement || 2, c = yh(n), g = Dn(i.trigger || i.handle || e), p = {}, _ = 0, w = !1, A = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, T = i.autoScrollMarginBottom || 40, y = i.autoScrollMarginLeft || 40, P = i.clickableTest || w_, O = 0, S = e._gsap || Et.core.getCache(e), k = b_(e), R = function(v, $) {
      return parseFloat(S.get(e, v, $));
    }, V = e.ownerDocument || yi, z, B, J, it, q, H, tt, ot, b, j, nt, U, rt, Dt, _t, Ct, ct, Rt, se, Bt, Ut, gt, mt, ut, Ce, I, Vt, Ke, Ie, zt, Nt, ue, Xe, Xt = function(v) {
      return Oi(v), v.stopImmediatePropagation && v.stopImmediatePropagation(), !1;
    }, re = function Z(v) {
      if (c.autoScroll && c.isDragging && (w || ct)) {
        var $ = e, E = c.autoScroll * 15, M, N, D, Y, F, W, et, K;
        for (w = !1, hn.scrollTop = Yt.pageYOffset != null ? Yt.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Yt.pageXOffset != null ? Yt.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft, Y = c.pointerX - hn.scrollLeft, F = c.pointerY - hn.scrollTop; $ && !N; )
          N = cr($.parentNode), M = N ? hn : $.parentNode, D = N ? {
            bottom: Math.max(qi.clientHeight, Yt.innerHeight || 0),
            right: Math.max(qi.clientWidth, Yt.innerWidth || 0),
            left: 0,
            top: 0
          } : M.getBoundingClientRect(), W = et = 0, f && (K = M._gsMaxScrollY - M.scrollTop, K < 0 ? et = K : F > D.bottom - T && K ? (w = !0, et = Math.min(K, E * (1 - Math.max(0, D.bottom - F) / T) | 0)) : F < D.top + A && M.scrollTop && (w = !0, et = -Math.min(M.scrollTop, E * (1 - Math.max(0, F - D.top) / A) | 0)), et && (M.scrollTop += et)), h && (K = M._gsMaxScrollX - M.scrollLeft, K < 0 ? W = K : Y > D.right - C && K ? (w = !0, W = Math.min(K, E * (1 - Math.max(0, D.right - Y) / C) | 0)) : Y < D.left + y && M.scrollLeft && (w = !0, W = -Math.min(M.scrollLeft, E * (1 - Math.max(0, Y - D.left) / y) | 0)), W && (M.scrollLeft += W)), N && (W || et) && (Yt.scrollTo(M.scrollLeft, M.scrollTop), $e(c.pointerX + W, c.pointerY + et)), $ = M;
      }
      if (ct) {
        var dt = c.x, Tt = c.y;
        a ? (c.deltaX = dt - parseFloat(S.rotation), c.rotation = dt, S.rotation = dt + "deg", S.renderTransform(1, S)) : B ? (f && (c.deltaY = Tt - B.top(), B.top(Tt)), h && (c.deltaX = dt - B.left(), B.left(dt))) : o ? (f && (c.deltaY = Tt - parseFloat(S.y), S.y = Tt + "px"), h && (c.deltaX = dt - parseFloat(S.x), S.x = dt + "px"), S.renderTransform(1, S)) : (f && (c.deltaY = Tt - parseFloat(e.style.top || 0), e.style.top = Tt + "px"), h && (c.deltaX = dt - parseFloat(e.style.left || 0), e.style.left = dt + "px")), ot && !v && !Ke && (Ke = !0, ae(c, "drag", "onDrag") === !1 && (h && (c.x -= c.deltaX), f && (c.y -= c.deltaY), Z(!0)), Ke = !1);
      }
      ct = !1;
    }, Pt = function(v, $) {
      var E = c.x, M = c.y, N, D;
      e._gsap || (S = Et.core.getCache(e)), S.uncache && Et.getProperty(e, "x"), o ? (c.x = parseFloat(S.x), c.y = parseFloat(S.y)) : a ? c.x = c.rotation = parseFloat(S.rotation) : B ? (c.y = B.top(), c.x = B.left()) : (c.y = parseFloat(e.style.top || (D = mo(e)) && D.top) || 0, c.x = parseFloat(e.style.left || (D || {}).left) || 0), (se || Bt || Ut) && !$ && (c.isDragging || c.isThrowing) && (Ut && (Os.x = c.x, Os.y = c.y, N = Ut(Os), N.x !== c.x && (c.x = N.x, ct = !0), N.y !== c.y && (c.y = N.y, ct = !0)), se && (N = se(c.x), N !== c.x && (c.x = N, a && (c.rotation = N), ct = !0)), Bt && (N = Bt(c.y), N !== c.y && (c.y = N), ct = !0)), ct && re(!0), v || (c.deltaX = c.x - E, c.deltaY = c.y - M, ae(c, "throwupdate", "onThrowUpdate"));
    }, he = function(v, $, E, M) {
      return $ == null && ($ = -1e20), E == null && (E = Cs), Pn(v) ? function(N) {
        var D = c.isPressed ? 1 - c.edgeResistance : 1;
        return v.call(c, (N > E ? E + (N - E) * D : N < $ ? $ + (N - $) * D : N) * M) * M;
      } : wr(v) ? function(N) {
        for (var D = v.length, Y = 0, F = Cs, W, et; --D > -1; )
          W = v[D], et = W - N, et < 0 && (et = -et), et < F && W >= $ && W <= E && (Y = D, F = et);
        return v[Y];
      } : isNaN(v) ? function(N) {
        return N;
      } : function() {
        return v * M;
      };
    }, De = function(v, $, E, M, N, D, Y) {
      return D = D && D < Cs ? D * D : Cs, Pn(v) ? function(F) {
        var W = c.isPressed ? 1 - c.edgeResistance : 1, et = F.x, K = F.y, dt, Tt, Ot;
        return F.x = et = et > E ? E + (et - E) * W : et < $ ? $ + (et - $) * W : et, F.y = K = K > N ? N + (K - N) * W : K < M ? M + (K - M) * W : K, dt = v.call(c, F), dt !== F && (F.x = dt.x, F.y = dt.y), Y !== 1 && (F.x *= Y, F.y *= Y), D < Cs && (Tt = F.x - et, Ot = F.y - K, Tt * Tt + Ot * Ot > D && (F.x = et, F.y = K)), F;
      } : wr(v) ? function(F) {
        for (var W = v.length, et = 0, K = Cs, dt, Tt, Ot, yt; --W > -1; )
          Ot = v[W], dt = Ot.x - F.x, Tt = Ot.y - F.y, yt = dt * dt + Tt * Tt, yt < K && (et = W, K = yt);
        return K <= D ? v[et] : F;
      } : function(F) {
        return F;
      };
    }, Fe = function() {
      var v, $, E, M;
      tt = !1, B ? (B.calibrate(), c.minX = nt = -B.maxScrollLeft(), c.minY = rt = -B.maxScrollTop(), c.maxX = j = c.maxY = U = 0, tt = !0) : i.bounds && (v = Oh(i.bounds, e.parentNode), a ? (c.minX = nt = v.left, c.maxX = j = v.left + v.width, c.minY = rt = c.maxY = U = 0) : !Hi(i.bounds.maxX) || !Hi(i.bounds.maxY) ? (v = i.bounds, c.minX = nt = v.minX, c.minY = rt = v.minY, c.maxX = j = v.maxX, c.maxY = U = v.maxY) : ($ = Oh(e, e.parentNode), c.minX = nt = Math.round(R(l, "px") + v.left - $.left), c.minY = rt = Math.round(R(u, "px") + v.top - $.top), c.maxX = j = Math.round(nt + (v.width - $.width)), c.maxY = U = Math.round(rt + (v.height - $.height))), nt > j && (c.minX = j, c.maxX = j = nt, nt = c.minX), rt > U && (c.minY = U, c.maxY = U = rt, rt = c.minY), a && (c.minRotation = nt, c.maxRotation = j), tt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, M = wr(E) || Pn(E), a ? (se = he(M ? E : E.rotation, nt, j, 1), Bt = null) : E.points ? Ut = De(M ? E : E.points, nt, j, rt, U, E.radius, B ? -1 : 1) : (h && (se = he(M ? E : E.x || E.left || E.scrollLeft, nt, j, B ? -1 : 1)), f && (Bt = he(M ? E : E.y || E.top || E.scrollTop, rt, U, B ? -1 : 1))));
    }, Ki = function() {
      c.isThrowing = !1, ae(c, "throwcomplete", "onThrowComplete");
    }, Kt = function() {
      c.isThrowing = !1;
    }, Xi = function(v, $) {
      var E, M, N, D;
      v && Bi ? (v === !0 && (E = i.snap || i.liveSnap || {}, M = wr(E) || Pn(E), v = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? v.rotation = yl(c, M ? E : E.rotation, j, nt, 1, $) : (h && (v[l] = yl(c, M ? E : E.points || E.x || E.left, j, nt, B ? -1 : 1, $ || c.lockedAxis === "x")), f && (v[u] = yl(c, M ? E : E.points || E.y || E.top, U, rt, B ? -1 : 1, $ || c.lockedAxis === "y")), (E.points || wr(E) && qr(E[0])) && (v.linkedProps = l + "," + u, v.radius = E.radius))), c.isThrowing = !0, D = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - c.edgeResistance + 0.2 : i.overshootTolerance, v.duration || (v.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? D === 0 || qr(v) && v.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: D
      }), c.tween = N = Et.to(B || e, {
        inertia: v,
        data: "_draggable",
        inherit: !1,
        onComplete: Ki,
        onInterrupt: Kt,
        onUpdate: i.fastMode ? ae : Pt,
        onUpdateParams: i.fastMode ? [c, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), N.render(1e9, !0, !0), Pt(!0, !0), c.endX = c.x, c.endY = c.y, a && (c.endRotation = c.x), N.play(0), Pt(!0, !0), B && (B._skip = !1))) : tt && c.applyBounds();
    }, si = function(v) {
      var $ = ut, E;
      ut = es(e.parentNode, !0), v && c.isPressed && !ut.equals($ || new ys()) && (E = $.inverse().apply({
        x: J,
        y: it
      }), ut.apply(E, E), J = E.x, it = E.y), ut.equals(h_) && (ut = null);
    }, ve = function() {
      var v = 1 - c.edgeResistance, $ = k ? Gs(V) : 0, E = k ? Xs(V) : 0, M, N, D;
      o && (S.x = R(l, "px") + "px", S.y = R(u, "px") + "px", S.renderTransform()), si(!1), Pi.x = c.pointerX - $, Pi.y = c.pointerY - E, ut && ut.apply(Pi, Pi), J = Pi.x, it = Pi.y, ct && ($e(c.pointerX, c.pointerY), re(!0)), ue = es(e), B ? (Fe(), H = B.top(), q = B.left()) : (Le() ? (Pt(!0, !0), Fe()) : c.applyBounds(), a ? (M = e.ownerSVGElement ? [S.xOrigin - e.getBBox().x, S.yOrigin - e.getBBox().y] : (mo(e)[tc] || "0 0").split(" "), Ct = c.rotationOrigin = es(e).apply({
        x: parseFloat(M[0]) || 0,
        y: parseFloat(M[1]) || 0
      }), Pt(!0, !0), N = c.pointerX - Ct.x - $, D = Ct.y - c.pointerY + E, q = c.x, H = c.y = Math.atan2(D, N) * vh) : (H = R(u, "px"), q = R(l, "px"))), tt && v && (q > j ? q = j + (q - j) / v : q < nt && (q = nt - (nt - q) / v), a || (H > U ? H = U + (H - U) / v : H < rt && (H = rt - (rt - H) / v))), c.startX = q = Sn(q), c.startY = H = Sn(H);
    }, Le = function() {
      return c.tween && c.tween.isActive();
    }, Ei = function() {
      pn.parentNode && !Le() && !c.isDragging && pn.parentNode.removeChild(pn);
    }, Ne = function(v, $) {
      var E;
      if (!z || c.isPressed || !v || (v.type === "mousedown" || v.type === "pointerdown") && !$ && En() - O < 30 && go[c.pointerEvent.type]) {
        Nt && v && z && Oi(v);
        return;
      }
      if (Ce = Le(), Xe = !1, c.pointerEvent = v, go[v.type] ? (mt = ~v.type.indexOf("touch") ? v.currentTarget || v.target : V, Se(mt, "touchend", Ft), Se(mt, "touchmove", at), Se(mt, "touchcancel", Ft), Se(V, "touchstart", Sh)) : (mt = null, Se(V, "mousemove", at)), Vt = null, (!ca || !mt) && (Se(V, "mouseup", Ft), v && v.target && Se(v.target, "mouseup", Ft)), gt = P.call(c, v.target) && i.dragClickables === !1 && !$, gt) {
        Se(v.target, "change", Ft), ae(c, "pressInit", "onPressInit"), ae(c, "press", "onPress"), Ho(g, !0), Nt = !1;
        return;
      }
      if (I = !mt || h === f || c.vars.allowNativeTouchScrolling === !1 || c.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2) ? !1 : h ? "y" : "x", Nt = !I && !c.allowEventDefault, Nt && (Oi(v), Se(Yt, "touchforcechange", Oi)), v.changedTouches ? (v = Dt = v.changedTouches[0], _t = v.identifier) : v.pointerId ? _t = v.pointerId : Dt = _t = null, Oa++, g_(re), it = c.pointerY = v.pageY, J = c.pointerX = v.pageX, ae(c, "pressInit", "onPressInit"), (I || c.autoScroll) && ml(e.parentNode), e.parentNode && c.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !pn.parentNode && !e.getBBox && (pn.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(pn)), ve(), c.tween && c.tween.kill(), c.isThrowing = !1, Et.killTweensOf(B || e, p, !0), B && Et.killTweensOf(e, {
        scrollTo: 1
      }, !0), c.tween = c.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), c.isPressed = !0, ot = !!(i.onDrag || c._listeners.drag), b = !!(i.onMove || c._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = g.length; --E > -1; )
          Et.set(g[E], {
            cursor: i.activeCursor || i.cursor || (Ir === "grab" ? "grabbing" : Ir)
          });
      ae(c, "press", "onPress");
    }, at = function(v) {
      var $ = v, E, M, N, D, Y, F;
      if (!z || cu || !c.isPressed || !v) {
        Nt && v && z && Oi(v);
        return;
      }
      if (c.pointerEvent = v, E = v.changedTouches, E) {
        if (v = E[0], v !== Dt && v.identifier !== _t) {
          for (D = E.length; --D > -1 && (v = E[D]).identifier !== _t && v.target !== e; )
            ;
          if (D < 0)
            return;
        }
      } else if (v.pointerId && _t && v.pointerId !== _t)
        return;
      if (mt && I && !Vt && (Pi.x = v.pageX - (k ? Gs(V) : 0), Pi.y = v.pageY - (k ? Xs(V) : 0), ut && ut.apply(Pi, Pi), M = Pi.x, N = Pi.y, Y = Math.abs(M - J), F = Math.abs(N - it), (Y !== F && (Y > d || F > d) || Mr && I === Vt) && (Vt = Y > F && h ? "x" : "y", I && Vt !== I && Se(Yt, "touchforcechange", Oi), c.vars.lockAxisOnTouchScroll !== !1 && h && f && (c.lockedAxis = Vt === "x" ? "y" : "x", Pn(c.vars.onLockAxis) && c.vars.onLockAxis.call(c, $)), Mr && I === Vt))) {
        Ft($);
        return;
      }
      !c.allowEventDefault && (!I || Vt && I !== Vt) && $.cancelable !== !1 ? (Oi($), Nt = !0) : Nt && (Nt = !1), c.autoScroll && (w = !0), $e(v.pageX, v.pageY, b);
    }, $e = function(v, $, E) {
      var M = 1 - c.dragResistance, N = 1 - c.edgeResistance, D = c.pointerX, Y = c.pointerY, F = H, W = c.x, et = c.y, K = c.endX, dt = c.endY, Tt = c.endRotation, Ot = ct, yt, pt, kt, ht, we, Gt;
      c.pointerX = v, c.pointerY = $, k && (v -= Gs(V), $ -= Xs(V)), a ? (ht = Math.atan2(Ct.y - $, v - Ct.x) * vh, we = c.y - ht, we > 180 ? (H -= 360, c.y = ht) : we < -180 && (H += 360, c.y = ht), c.x !== q || Math.max(Math.abs(J - v), Math.abs(it - $)) > d ? (c.y = ht, kt = q + (H - ht) * M) : kt = q) : (ut && (Gt = v * ut.a + $ * ut.c + ut.e, $ = v * ut.b + $ * ut.d + ut.f, v = Gt), pt = $ - it, yt = v - J, pt < d && pt > -d && (pt = 0), yt < d && yt > -d && (yt = 0), (c.lockAxis || c.lockedAxis) && (yt || pt) && (Gt = c.lockedAxis, Gt || (c.lockedAxis = Gt = h && Math.abs(yt) > Math.abs(pt) ? "y" : f ? "x" : null, Gt && Pn(c.vars.onLockAxis) && c.vars.onLockAxis.call(c, c.pointerEvent)), Gt === "y" ? pt = 0 : Gt === "x" && (yt = 0)), kt = Sn(q + yt * M), ht = Sn(H + pt * M)), (se || Bt || Ut) && (c.x !== kt || c.y !== ht && !a) && (Ut && (Os.x = kt, Os.y = ht, Gt = Ut(Os), kt = Sn(Gt.x), ht = Sn(Gt.y)), se && (kt = Sn(se(kt))), Bt && (ht = Sn(Bt(ht)))), tt && (kt > j ? kt = j + Math.round((kt - j) * N) : kt < nt && (kt = nt + Math.round((kt - nt) * N)), a || (ht > U ? ht = Math.round(U + (ht - U) * N) : ht < rt && (ht = Math.round(rt + (ht - rt) * N)))), (c.x !== kt || c.y !== ht && !a) && (a ? (c.endRotation = c.x = c.endX = kt, ct = !0) : (f && (c.y = c.endY = ht, ct = !0), h && (c.x = c.endX = kt, ct = !0)), !E || ae(c, "move", "onMove") !== !1 ? !c.isDragging && c.isPressed && (c.isDragging = Xe = !0, ae(c, "dragstart", "onDragStart")) : (c.pointerX = D, c.pointerY = Y, H = F, c.x = W, c.y = et, c.endX = K, c.endY = dt, c.endRotation = Tt, ct = Ot));
    }, Ft = function Z(v, $) {
      if (!z || !c.isPressed || v && _t != null && !$ && (v.pointerId && v.pointerId !== _t && v.target !== e || v.changedTouches && !__(v.changedTouches, _t))) {
        Nt && v && z && Oi(v);
        return;
      }
      c.isPressed = !1;
      var E = v, M = c.isDragging, N = c.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2), D = Et.delayedCall(1e-3, Ei), Y, F, W, et, K;
      if (mt ? (pe(mt, "touchend", Z), pe(mt, "touchmove", at), pe(mt, "touchcancel", Z), pe(V, "touchstart", Sh)) : pe(V, "mousemove", at), pe(Yt, "touchforcechange", Oi), (!ca || !mt) && (pe(V, "mouseup", Z), v && v.target && pe(v.target, "mouseup", Z)), ct = !1, M && (_ = wh = En(), c.isDragging = !1), Th(re), gt && !N) {
        v && (pe(v.target, "change", Z), c.pointerEvent = E), Ho(g, !1), ae(c, "release", "onRelease"), ae(c, "click", "onClick"), gt = !1;
        return;
      }
      for (F = g.length; --F > -1; )
        _l(g[F], "cursor", i.cursor || (i.cursor !== !1 ? Ir : null));
      if (Oa--, v) {
        if (Y = v.changedTouches, Y && (v = Y[0], v !== Dt && v.identifier !== _t)) {
          for (F = Y.length; --F > -1 && (v = Y[F]).identifier !== _t && v.target !== e; )
            ;
          if (F < 0 && !$)
            return;
        }
        c.pointerEvent = E, c.pointerX = v.pageX, c.pointerY = v.pageY;
      }
      return N && E ? (Oi(E), Nt = !0, ae(c, "release", "onRelease")) : E && !M ? (Nt = !1, Ce && (i.snap || i.bounds) && Xi(i.inertia || i.throwProps), ae(c, "release", "onRelease"), (!Mr || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (ae(c, "click", "onClick"), En() - O < 300 && ae(c, "doubleclick", "onDoubleClick"), et = E.target || e, O = En(), K = function() {
        O !== Ie && c.enabled() && !c.isPressed && !E.defaultPrevented && (et.click ? et.click() : V.createEvent && (W = V.createEvent("MouseEvents"), W.initMouseEvent("click", !0, !0, Yt, 1, c.pointerEvent.screenX, c.pointerEvent.screenY, c.pointerX, c.pointerY, !1, !1, !1, !1, 0, null), et.dispatchEvent(W)));
      }, !Mr && !E.defaultPrevented && Et.delayedCall(0.05, K))) : (Xi(i.inertia || i.throwProps), !c.allowEventDefault && E && (i.dragClickables !== !1 || !P.call(c, E.target)) && M && (!I || Vt && I === Vt) && E.cancelable !== !1 ? (Nt = !0, Oi(E)) : Nt = !1, ae(c, "release", "onRelease")), Le() && D.duration(c.tween.duration()), M && ae(c, "dragend", "onDragEnd"), !0;
    }, Oe = function(v) {
      if (v && c.isDragging && !B) {
        var $ = v.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, M = $.scrollTop - $._gsScrollY;
        (E || M) && (ut ? (J -= E * ut.a + M * ut.c, it -= M * ut.d + E * ut.b) : (J -= E, it -= M), $._gsScrollX += E, $._gsScrollY += M, $e(c.pointerX, c.pointerY));
      }
    }, ie = function(v) {
      var $ = En(), E = $ - O < 100, M = $ - _ < 50, N = E && Ie === O, D = c.pointerEvent && c.pointerEvent.defaultPrevented, Y = E && zt === O, F = v.isTrusted || v.isTrusted == null && E && N;
      if ((N || M && c.vars.suppressClickOnDrag !== !1) && v.stopImmediatePropagation && v.stopImmediatePropagation(), E && !(c.pointerEvent && c.pointerEvent.defaultPrevented) && (!N || F && !Y)) {
        F && N && (zt = O), Ie = O;
        return;
      }
      (c.isPressed || M || E) && (!F || !v.detail || !E || D) && Oi(v), !E && !M && !Xe && (v && v.target && (c.pointerEvent = v), ae(c, "click", "onClick"));
    }, Ai = function(v) {
      return ut ? {
        x: v.x * ut.a + v.y * ut.c + ut.e,
        y: v.x * ut.b + v.y * ut.d + ut.f
      } : {
        x: v.x,
        y: v.y
      };
    };
    return Rt = t.get(e), Rt && Rt.kill(), n.startDrag = function(Z, v) {
      var $, E, M, N;
      Ne(Z || c.pointerEvent, !0), v && !c.hitTest(Z || c.pointerEvent) && ($ = Ps(Z || c.pointerEvent), E = Ps(e), M = Ai({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), N = Ai({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), J -= M.x - N.x, it -= M.y - N.y), c.isDragging || (c.isDragging = Xe = !0, ae(c, "dragstart", "onDragStart"));
    }, n.drag = at, n.endDrag = function(Z) {
      return Ft(Z || c.pointerEvent, !0);
    }, n.timeSinceDrag = function() {
      return c.isDragging ? 0 : (En() - _) / 1e3;
    }, n.timeSinceClick = function() {
      return (En() - O) / 1e3;
    }, n.hitTest = function(Z, v) {
      return t.hitTest(c.target, Z, v);
    }, n.getDirection = function(Z, v) {
      var $ = Z === "velocity" && Bi ? Z : qr(Z) && !a ? "element" : "start", E, M, N, D, Y, F;
      return $ === "element" && (Y = Ps(c.target), F = Ps(Z)), E = $ === "start" ? c.x - q : $ === "velocity" ? Bi.getVelocity(e, l) : Y.left + Y.width / 2 - (F.left + F.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (v = v || 2, M = $ === "start" ? c.y - H : $ === "velocity" ? Bi.getVelocity(e, u) : Y.top + Y.height / 2 - (F.top + F.height / 2), N = Math.abs(E / M), D = N < 1 / v ? "" : E < 0 ? "left" : "right", N < v && (D !== "" && (D += "-"), D += M < 0 ? "up" : "down"), D);
    }, n.applyBounds = function(Z, v) {
      var $, E, M, N, D, Y;
      if (Z && i.bounds !== Z)
        return i.bounds = Z, c.update(!0, v);
      if (Pt(!0), Fe(), tt && !Le()) {
        if ($ = c.x, E = c.y, $ > j ? $ = j : $ < nt && ($ = nt), E > U ? E = U : E < rt && (E = rt), (c.x !== $ || c.y !== E) && (M = !0, c.x = c.endX = $, a ? c.endRotation = $ : c.y = c.endY = E, ct = !0, re(!0), c.autoScroll && !c.isDragging))
          for (ml(e.parentNode), N = e, hn.scrollTop = Yt.pageYOffset != null ? Yt.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, hn.scrollLeft = Yt.pageXOffset != null ? Yt.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft; N && !Y; )
            Y = cr(N.parentNode), D = Y ? hn : N.parentNode, f && D.scrollTop > D._gsMaxScrollY && (D.scrollTop = D._gsMaxScrollY), h && D.scrollLeft > D._gsMaxScrollX && (D.scrollLeft = D._gsMaxScrollX), N = D;
        c.isThrowing && (M || c.endX > j || c.endX < nt || c.endY > U || c.endY < rt) && Xi(i.inertia || i.throwProps, M);
      }
      return c;
    }, n.update = function(Z, v, $) {
      if (v && c.isPressed) {
        var E = es(e), M = ue.apply({
          x: c.x - q,
          y: c.y - H
        }), N = es(e.parentNode, !0);
        N.apply({
          x: E.e - M.x,
          y: E.f - M.y
        }, M), c.x -= M.x - N.e, c.y -= M.y - N.f, re(!0), ve();
      }
      var D = c.x, Y = c.y;
      return si(!v), Z ? c.applyBounds() : (ct && $ && re(!0), Pt(!0)), v && ($e(c.pointerX, c.pointerY), ct && re(!0)), c.isPressed && !v && (h && Math.abs(D - c.x) > 0.01 || f && Math.abs(Y - c.y) > 0.01 && !a) && ve(), c.autoScroll && (ml(e.parentNode, c.isDragging), w = c.isDragging, re(!0), Ah(e, Oe), Eh(e, Oe)), c;
    }, n.enable = function(Z) {
      var v = {
        lazy: !0
      }, $, E, M;
      if (i.cursor !== !1 && (v.cursor = i.cursor || Ir), Et.utils.checkPrefix("touchCallout") && (v.touchCallout = "none"), Z !== "soft") {
        for (bh(g, h === f ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), E = g.length; --E > -1; )
          M = g[E], ca || Se(M, "mousedown", Ne), Se(M, "touchstart", Ne), Se(M, "click", ie, !0), Et.set(M, v), M.getBBox && M.ownerSVGElement && h !== f && Et.set(M.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Se(M, "contextmenu", Xt);
        Ho(g, !1);
      }
      return Eh(e, Oe), z = !0, Bi && Z !== "soft" && Bi.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + f_++, Ks[$] = c, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && ve(), i.bounds && c.applyBounds(), c;
    }, n.disable = function(Z) {
      for (var v = c.isDragging, $ = g.length, E; --$ > -1; )
        _l(g[$], "cursor", null);
      if (Z !== "soft") {
        for (bh(g, null), $ = g.length; --$ > -1; )
          E = g[$], _l(E, "touchCallout", null), pe(E, "mousedown", Ne), pe(E, "touchstart", Ne), pe(E, "click", ie, !0), pe(E, "contextmenu", Xt);
        Ho(g, !0), mt && (pe(mt, "touchcancel", Ft), pe(mt, "touchend", Ft), pe(mt, "touchmove", at)), pe(V, "mouseup", Ft), pe(V, "mousemove", at);
      }
      return Ah(e, Oe), z = !1, Bi && Z !== "soft" && (Bi.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), c.tween && c.tween.kill()), B && B.disable(), Th(re), c.isDragging = c.isPressed = gt = !1, v && ae(c, "dragend", "onDragEnd"), c;
    }, n.enabled = function(Z, v) {
      return arguments.length ? Z ? c.enable(v) : c.disable(v) : z;
    }, n.kill = function() {
      return c.isThrowing = !1, c.tween && c.tween.kill(), c.disable(), Et.set(g, {
        clearProps: "userSelect"
      }), delete Ks[e._gsDragID], c;
    }, n.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~r.indexOf("scroll") && (B = n.scrollProxy = new x_(e, p_({
      onKill: function() {
        c.isPressed && Ft(null);
      }
    }, i)), e.style.overflowY = f && !Ql ? "auto" : "hidden", e.style.overflowX = h && !Ql ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (h && (p[l] = 1), f && (p[u] = 1)), S.force3D = "force3D" in i ? i.force3D : !0, Zd(yh(n)), n.enable(), n;
  }
  return t.register = function(i) {
    Et = i, vl();
  }, t.create = function(i, n) {
    return Zl || vl(!0), Dn(i).map(function(r) {
      return new t(r, n);
    });
  }, t.get = function(i) {
    return Ks[(Dn(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (En() - wh) / 1e3;
  }, t.hitTest = function(i, n, r) {
    if (i === n)
      return !1;
    var o = Ps(i), a = Ps(n), l = o.top, u = o.left, h = o.right, f = o.bottom, d = o.width, c = o.height, g = a.left > h || a.right < u || a.top > f || a.bottom < l, p, _, w;
    return g || !r ? !g : (w = (r + "").indexOf("%") !== -1, r = parseFloat(r) || 0, p = {
      left: Math.max(u, a.left),
      top: Math.max(l, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(f, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : w ? (r *= 0.01, _ = p.width * p.height, _ >= d * c * r || _ >= a.width * a.height * r) : p.width > r && p.height > r);
  }, t;
}(T_);
m_(qa.prototype, {
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
function S_(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function E_(s, t, e) {
  return t && S_(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Re, ha, vi, Ln, Rn, js, np, Jn, Kr, sp, yn, Vi, rp, op = function() {
  return Re || typeof window < "u" && (Re = window.gsap) && Re.registerPlugin && Re;
}, ap = 1, $s = [], bt = [], sn = [], Xr = Date.now, ic = function(t, e) {
  return e;
}, A_ = function() {
  var t = Kr.core, e = t.bridge || {}, i = t._scrollers, n = t._proxies;
  i.push.apply(i, bt), n.push.apply(n, sn), bt = i, sn = n, ic = function(o, a) {
    return e[o](a);
  };
}, Nn = function(t, e) {
  return ~sn.indexOf(t) && sn[sn.indexOf(t) + 1][e];
}, Gr = function(t) {
  return !!~sp.indexOf(t);
}, Ze = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: n !== !1,
    capture: !!r
  });
}, je = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Yo = "scrollLeft", Wo = "scrollTop", nc = function() {
  return yn && yn.isPressed || bt.cache++;
}, Pa = function(t, e) {
  var i = function n(r) {
    if (r || r === 0) {
      ap && (vi.history.scrollRestoration = "manual");
      var o = yn && yn.isPressed;
      r = n.v = Math.round(r) || (yn && yn.iOS ? 1 : 0), t(r), n.cacheID = bt.cache, o && ic("ss", r);
    } else (e || bt.cache !== n.cacheID || ic("ref")) && (n.cacheID = bt.cache, n.v = t());
    return n.v + n.offset;
  };
  return i.offset = 0, t && i;
}, ii = {
  s: Yo,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Pa(function(s) {
    return arguments.length ? vi.scrollTo(s, Ae.sc()) : vi.pageXOffset || Ln[Yo] || Rn[Yo] || js[Yo] || 0;
  })
}, Ae = {
  s: Wo,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ii,
  sc: Pa(function(s) {
    return arguments.length ? vi.scrollTo(ii.sc(), s) : vi.pageYOffset || Ln[Wo] || Rn[Wo] || js[Wo] || 0;
  })
}, ri = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Re.utils.toArray)(t)[0] || (typeof t == "string" && Re.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, C_ = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Yn = function(t, e) {
  var i = e.s, n = e.sc;
  Gr(t) && (t = Ln.scrollingElement || Rn);
  var r = bt.indexOf(t), o = n === Ae.sc ? 1 : 2;
  !~r && (r = bt.push(t) - 1), bt[r + o] || Ze(t, "scroll", nc);
  var a = bt[r + o], l = a || (bt[r + o] = Pa(Nn(t, i), !0) || (Gr(t) ? n : Pa(function(u) {
    return arguments.length ? t[i] = u : t[i];
  })));
  return l.target = t, a || (l.smooth = Re.getProperty(t, "scrollBehavior") === "smooth"), l;
}, sc = function(t, e, i) {
  var n = t, r = t, o = Xr(), a = o, l = e || 50, u = Math.max(500, l * 3), h = function(g, p) {
    var _ = Xr();
    p || _ - o > l ? (r = n, n = g, a = o, o = _) : i ? n += g : n = r + (g - r) / (_ - a) * (o - a);
  }, f = function() {
    r = n = i ? 0 : n, a = o = 0;
  }, d = function(g) {
    var p = a, _ = r, w = Xr();
    return (g || g === 0) && g !== n && h(g), o === a || w - a > u ? 0 : (n + (i ? _ : -_)) / ((i ? w : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: f,
    getVelocity: d
  };
}, br = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Ph = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, lp = function() {
  Kr = Re.core.globals().ScrollTrigger, Kr && Kr.core && A_();
}, cp = function(t) {
  return Re = t || op(), !ha && Re && typeof document < "u" && document.body && (vi = window, Ln = document, Rn = Ln.documentElement, js = Ln.body, sp = [vi, Ln, Rn, js], Re.utils.clamp, rp = Re.core.context || function() {
  }, Jn = "onpointerenter" in js ? "pointer" : "mouse", np = ce.isTouch = vi.matchMedia && vi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in vi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Vi = ce.eventTypes = ("ontouchstart" in Rn ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rn ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return ap = 0;
  }, 500), lp(), ha = 1), ha;
};
ii.op = Ae;
bt.cache = 0;
var ce = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    ha || cp(Re) || console.warn("Please gsap.registerPlugin(Observer)"), Kr || lp();
    var n = i.tolerance, r = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, u = i.debounce, h = i.preventDefault, f = i.onStop, d = i.onStopDelay, c = i.ignore, g = i.wheelSpeed, p = i.event, _ = i.onDragStart, w = i.onDragEnd, A = i.onDrag, C = i.onPress, T = i.onRelease, y = i.onRight, P = i.onLeft, O = i.onUp, S = i.onDown, k = i.onChangeX, R = i.onChangeY, V = i.onChange, z = i.onToggleX, B = i.onToggleY, J = i.onHover, it = i.onHoverEnd, q = i.onMove, H = i.ignoreCheck, tt = i.isNormalizer, ot = i.onGestureStart, b = i.onGestureEnd, j = i.onWheel, nt = i.onEnable, U = i.onDisable, rt = i.onClick, Dt = i.scrollSpeed, _t = i.capture, Ct = i.allowClicks, ct = i.lockAxis, Rt = i.onLockAxis;
    this.target = a = ri(a) || Rn, this.vars = i, c && (c = Re.utils.toArray(c)), n = n || 1e-9, r = r || 0, g = g || 1, Dt = Dt || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(vi.getComputedStyle(js).lineHeight) || 22);
    var se, Bt, Ut, gt, mt, ut, Ce, I = this, Vt = 0, Ke = 0, Ie = i.passive || !h && i.passive !== !1, zt = Yn(a, ii), Nt = Yn(a, Ae), ue = zt(), Xe = Nt(), Xt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Vi[0] === "pointerdown", re = Gr(a), Pt = a.ownerDocument || Ln, he = [0, 0, 0], De = [0, 0, 0], Fe = 0, Ki = function() {
      return Fe = Xr();
    }, Kt = function(M, N) {
      return (I.event = M) && c && C_(M.target, c) || N && Xt && M.pointerType !== "touch" || H && H(M, N);
    }, Xi = function() {
      I._vx.reset(), I._vy.reset(), Bt.pause(), f && f(I);
    }, si = function() {
      var M = I.deltaX = Ph(he), N = I.deltaY = Ph(De), D = Math.abs(M) >= n, Y = Math.abs(N) >= n;
      V && (D || Y) && V(I, M, N, he, De), D && (y && I.deltaX > 0 && y(I), P && I.deltaX < 0 && P(I), k && k(I), z && I.deltaX < 0 != Vt < 0 && z(I), Vt = I.deltaX, he[0] = he[1] = he[2] = 0), Y && (S && I.deltaY > 0 && S(I), O && I.deltaY < 0 && O(I), R && R(I), B && I.deltaY < 0 != Ke < 0 && B(I), Ke = I.deltaY, De[0] = De[1] = De[2] = 0), (gt || Ut) && (q && q(I), Ut && (_ && Ut === 1 && _(I), A && A(I), Ut = 0), gt = !1), ut && !(ut = !1) && Rt && Rt(I), mt && (j(I), mt = !1), se = 0;
    }, ve = function(M, N, D) {
      he[D] += M, De[D] += N, I._vx.update(M), I._vy.update(N), u ? se || (se = requestAnimationFrame(si)) : si();
    }, Le = function(M, N) {
      ct && !Ce && (I.axis = Ce = Math.abs(M) > Math.abs(N) ? "x" : "y", ut = !0), Ce !== "y" && (he[2] += M, I._vx.update(M, !0)), Ce !== "x" && (De[2] += N, I._vy.update(N, !0)), u ? se || (se = requestAnimationFrame(si)) : si();
    }, Ei = function(M) {
      if (!Kt(M, 1)) {
        M = br(M, h);
        var N = M.clientX, D = M.clientY, Y = N - I.x, F = D - I.y, W = I.isDragging;
        I.x = N, I.y = D, (W || (Y || F) && (Math.abs(I.startX - N) >= r || Math.abs(I.startY - D) >= r)) && (Ut = W ? 2 : 1, W || (I.isDragging = !0), Le(Y, F));
      }
    }, Ne = I.onPress = function(E) {
      Kt(E, 1) || E && E.button || (I.axis = Ce = null, Bt.pause(), I.isPressed = !0, E = br(E), Vt = Ke = 0, I.startX = I.x = E.clientX, I.startY = I.y = E.clientY, I._vx.reset(), I._vy.reset(), Ze(tt ? a : Pt, Vi[1], Ei, Ie, !0), I.deltaX = I.deltaY = 0, C && C(I));
    }, at = I.onRelease = function(E) {
      if (!Kt(E, 1)) {
        je(tt ? a : Pt, Vi[1], Ei, !0);
        var M = !isNaN(I.y - I.startY), N = I.isDragging, D = N && (Math.abs(I.x - I.startX) > 3 || Math.abs(I.y - I.startY) > 3), Y = br(E);
        !D && M && (I._vx.reset(), I._vy.reset(), h && Ct && Re.delayedCall(0.08, function() {
          if (Xr() - Fe > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (Pt.createEvent) {
              var F = Pt.createEvent("MouseEvents");
              F.initMouseEvent("click", !0, !0, vi, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(F);
            }
          }
        })), I.isDragging = I.isGesturing = I.isPressed = !1, f && N && !tt && Bt.restart(!0), Ut && si(), w && N && w(I), T && T(I, D);
      }
    }, $e = function(M) {
      return M.touches && M.touches.length > 1 && (I.isGesturing = !0) && ot(M, I.isDragging);
    }, Ft = function() {
      return (I.isGesturing = !1) || b(I);
    }, Oe = function(M) {
      if (!Kt(M)) {
        var N = zt(), D = Nt();
        ve((N - ue) * Dt, (D - Xe) * Dt, 1), ue = N, Xe = D, f && Bt.restart(!0);
      }
    }, ie = function(M) {
      if (!Kt(M)) {
        M = br(M, h), j && (mt = !0);
        var N = (M.deltaMode === 1 ? l : M.deltaMode === 2 ? vi.innerHeight : 1) * g;
        ve(M.deltaX * N, M.deltaY * N, 0), f && !tt && Bt.restart(!0);
      }
    }, Ai = function(M) {
      if (!Kt(M)) {
        var N = M.clientX, D = M.clientY, Y = N - I.x, F = D - I.y;
        I.x = N, I.y = D, gt = !0, f && Bt.restart(!0), (Y || F) && Le(Y, F);
      }
    }, Z = function(M) {
      I.event = M, J(I);
    }, v = function(M) {
      I.event = M, it(I);
    }, $ = function(M) {
      return Kt(M) || br(M, h) && rt(I);
    };
    Bt = I._dc = Re.delayedCall(d || 0.25, Xi).pause(), I.deltaX = I.deltaY = 0, I._vx = sc(0, 50, !0), I._vy = sc(0, 50, !0), I.scrollX = zt, I.scrollY = Nt, I.isDragging = I.isGesturing = I.isPressed = !1, rp(this), I.enable = function(E) {
      return I.isEnabled || (Ze(re ? Pt : a, "scroll", nc), o.indexOf("scroll") >= 0 && Ze(re ? Pt : a, "scroll", Oe, Ie, _t), o.indexOf("wheel") >= 0 && Ze(a, "wheel", ie, Ie, _t), (o.indexOf("touch") >= 0 && np || o.indexOf("pointer") >= 0) && (Ze(a, Vi[0], Ne, Ie, _t), Ze(Pt, Vi[2], at), Ze(Pt, Vi[3], at), Ct && Ze(a, "click", Ki, !0, !0), rt && Ze(a, "click", $), ot && Ze(Pt, "gesturestart", $e), b && Ze(Pt, "gestureend", Ft), J && Ze(a, Jn + "enter", Z), it && Ze(a, Jn + "leave", v), q && Ze(a, Jn + "move", Ai)), I.isEnabled = !0, I.isDragging = I.isGesturing = I.isPressed = gt = Ut = !1, I._vx.reset(), I._vy.reset(), ue = zt(), Xe = Nt(), E && E.type && Ne(E), nt && nt(I)), I;
    }, I.disable = function() {
      I.isEnabled && ($s.filter(function(E) {
        return E !== I && Gr(E.target);
      }).length || je(re ? Pt : a, "scroll", nc), I.isPressed && (I._vx.reset(), I._vy.reset(), je(tt ? a : Pt, Vi[1], Ei, !0)), je(re ? Pt : a, "scroll", Oe, _t), je(a, "wheel", ie, _t), je(a, Vi[0], Ne, _t), je(Pt, Vi[2], at), je(Pt, Vi[3], at), je(a, "click", Ki, !0), je(a, "click", $), je(Pt, "gesturestart", $e), je(Pt, "gestureend", Ft), je(a, Jn + "enter", Z), je(a, Jn + "leave", v), je(a, Jn + "move", Ai), I.isEnabled = I.isPressed = I.isDragging = !1, U && U(I));
    }, I.kill = I.revert = function() {
      I.disable();
      var E = $s.indexOf(I);
      E >= 0 && $s.splice(E, 1), yn === I && (yn = 0);
    }, $s.push(I), tt && Gr(a) && (yn = I), I.enable(p);
  }, E_(s, [{
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
ce.version = "3.13.0";
ce.create = function(s) {
  return new ce(s);
};
ce.register = cp;
ce.getAll = function() {
  return $s.slice();
};
ce.getById = function(s) {
  return $s.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
op() && Re.registerPlugin(ce);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ye, up, vn, tn, $n, hp, Zs, qo, fp = function() {
  return typeof window < "u";
}, dp = function() {
  return Ye || fp() && (Ye = window.gsap) && Ye.registerPlugin && Ye;
}, pp = function(t) {
  return typeof t == "string";
}, kh = function(t) {
  return typeof t == "function";
}, _o = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return t === vn || t === tn || t === $n ? Math.max(tn[n], $n[n]) - (vn["inner" + i] || tn[r] || $n[r]) : t[n] - t["offset" + i];
}, yo = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === vn && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = tn[i] != null ? tn : $n), function() {
    return t[i];
  };
}, O_ = function(t, e, i, n) {
  if (kh(t) && (t = t(e, i, n)), typeof t != "object")
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
    r[o] = o !== "onAutoKill" && kh(t[o]) ? t[o](e, i, n) : t[o];
  return r;
}, gp = function(t, e) {
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
  return !n && e && (o.x += yo(e, "x")(), o.y += yo(e, "y")()), o;
}, Mh = function(t, e, i, n, r) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : pp(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? _o(e, i) - r : Math.min(_o(e, i), gp(t, e)[i] - r);
}, rc = function() {
  Ye = dp(), fp() && Ye && typeof document < "u" && document.body && (vn = window, $n = document.body, tn = document.documentElement, hp = Ye.utils.toArray, Ye.config({
    autoKillThreshold: 7
  }), Zs = Ye.config(), up = 1);
}, fr = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    Ye = t, rc();
  },
  init: function(t, e, i, n, r) {
    up || rc();
    var o = this, a = Ye.getProperty(t, "scrollSnapType");
    o.isWin = t === vn, o.target = t, o.tween = i, e = O_(e, n, t, r), o.vars = e, o.autoKill = !!("autoKill" in e ? e : Zs).autoKill, o.getX = yo(t, "x"), o.getY = yo(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), qo || (qo = Ye.core.globals().ScrollTrigger), Ye.getProperty(t, "scrollBehavior") === "smooth" && Ye.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, Mh(e.x, t, "x", o.x, e.offsetX || 0), n, r), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, Mh(e.y, t, "y", o.y, e.offsetY || 0), n, r), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, n = e.target, r = e.tween, o = e.autoKill, a = e.xPrev, l = e.yPrev, u = e.isWin, h = e.snap, f = e.snapInline, d, c, g, p, _; i; )
      i.r(t, i.d), i = i._next;
    d = u || !e.skipX ? e.getX() : a, c = u || !e.skipY ? e.getY() : l, g = c - l, p = d - a, _ = Zs.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > _ || p < -_) && d < _o(n, "x") && (e.skipX = 1), !e.skipY && (g > _ || g < -_) && c < _o(n, "y") && (e.skipY = 1), e.skipX && e.skipY && (r.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(r, e.vars.onAutoKillParams || []))), u ? vn.scrollTo(e.skipX ? d : e.x, e.skipY ? c : e.y) : (e.skipY || (n.scrollTop = e.y), e.skipX || (n.scrollLeft = e.x)), h && (t === 1 || t === 0) && (c = n.scrollTop, d = n.scrollLeft, f ? n.style.scrollSnapType = f : n.style.removeProperty("scroll-snap-type"), n.scrollTop = c + 1, n.scrollLeft = d + 1, n.scrollTop = c, n.scrollLeft = d), e.xPrev = e.x, e.yPrev = e.y, qo && qo.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
fr.max = _o;
fr.getOffset = gp;
fr.buildGetter = yo;
fr.config = function(s) {
  Zs || rc() || (Zs = Ye.config());
  for (var t in s)
    Zs[t] = s[t];
};
dp() && Ye.registerPlugin(fr);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var G, Ls, wt, Wt, mi, Lt, uu, ka, vo, jr, Dr, Uo, Be, Ua, oc, Je, Ih, Dh, Rs, mp, wl, _p, Qe, ac, yp, vp, An, lc, hu, Qs, fu, Ma, cc, bl, Ko = 1, Ve = Date.now, xl = Ve(), Ri = 0, Lr = 0, Lh = function(t, e, i) {
  var n = pi(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t;
}, Rh = function(t, e) {
  return e && (!pi(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, P_ = function s() {
  return Lr && requestAnimationFrame(s);
}, zh = function() {
  return Ua = 1;
}, Fh = function() {
  return Ua = 0;
}, ji = function(t) {
  return t;
}, Rr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, wp = function() {
  return typeof window < "u";
}, bp = function() {
  return G || wp() && (G = window.gsap) && G.registerPlugin && G;
}, vs = function(t) {
  return !!~uu.indexOf(t);
}, xp = function(t) {
  return (t === "Height" ? fu : wt["inner" + t]) || mi["client" + t] || Lt["client" + t];
}, Tp = function(t) {
  return Nn(t, "getBoundingClientRect") || (vs(t) ? function() {
    return ma.width = wt.innerWidth, ma.height = fu, ma;
  } : function() {
    return gn(t);
  });
}, k_ = function(t, e, i) {
  var n = i.d, r = i.d2, o = i.a;
  return (o = Nn(t, "getBoundingClientRect")) ? function() {
    return o()[n];
  } : function() {
    return (e ? xp(r) : t["client" + r]) || 0;
  };
}, M_ = function(t, e) {
  return !e || ~sn.indexOf(t) ? Tp(t) : function() {
    return ma;
  };
}, en = function(t, e) {
  var i = e.s, n = e.d2, r = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + n) && (o = Nn(t, i)) ? o() - Tp(t)()[r] : vs(t) ? (mi[i] || Lt[i]) - xp(n) : t[i] - t["offset" + n]);
}, Xo = function(t, e) {
  for (var i = 0; i < Rs.length; i += 3)
    (!e || ~e.indexOf(Rs[i + 1])) && t(Rs[i], Rs[i + 1], Rs[i + 2]);
}, pi = function(t) {
  return typeof t == "string";
}, We = function(t) {
  return typeof t == "function";
}, zr = function(t) {
  return typeof t == "number";
}, ts = function(t) {
  return typeof t == "object";
}, xr = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, Tl = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, ks = Math.abs, Sp = "left", Ep = "top", du = "right", pu = "bottom", fs = "width", ds = "height", Zr = "Right", Qr = "Left", Jr = "Top", to = "Bottom", ge = "padding", Mi = "margin", ur = "Width", gu = "Height", Te = "px", Ii = function(t) {
  return wt.getComputedStyle(t);
}, I_ = function(t) {
  var e = Ii(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, Nh = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, gn = function(t, e) {
  var i = e && Ii(t)[oc] !== "matrix(1, 0, 0, 1, 0, 0)" && G.to(t, {
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
}, D_ = function(t) {
  return function(e) {
    return G.utils.snap(Ap(t), e);
  };
}, mu = function(t) {
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
}, L_ = function(t) {
  return function(e, i) {
    return mu(Ap(t))(e, i.direction);
  };
}, Go = function(t, e, i, n) {
  return i.split(",").forEach(function(r) {
    return t(e, r, n);
  });
}, ke = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: !n,
    capture: !!r
  });
}, Pe = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, jo = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, $h = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Zo = {
  toggleActions: "play",
  anticipatePin: 0
}, Da = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, fa = function(t, e) {
  if (pi(t)) {
    var i = t.indexOf("="), n = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (n *= e / 100), t = t.substr(0, i - 1)), t = n + (t in Da ? Da[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, Qo = function(t, e, i, n, r, o, a, l) {
  var u = r.startColor, h = r.endColor, f = r.fontSize, d = r.indent, c = r.fontWeight, g = Wt.createElement("div"), p = vs(i) || Nn(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, w = p ? Lt : i, A = t.indexOf("start") !== -1, C = A ? u : h, T = "border-color:" + C + ";font-size:" + f + ";color:" + C + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((_ || l) && p ? "fixed;" : "absolute;"), (_ || l || !p) && (T += (n === Ae ? du : pu) + ":" + (o + parseFloat(d)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = A, g.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), g.style.cssText = T, g.innerText = e || e === 0 ? t + "-" + e : t, w.children[0] ? w.insertBefore(g, w.children[0]) : w.appendChild(g), g._offset = g["offset" + n.op.d2], da(g, 0, n, A), g;
}, da = function(t, e, i, n) {
  var r = {
    display: "block"
  }, o = i[n ? "os2" : "p2"], a = i[n ? "p2" : "os2"];
  t._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? "1px" : 0, r["border" + o + ur] = 1, r["border" + a + ur] = 0, r[i.p] = e + "px", G.set(t, r);
}, vt = [], uc = {}, wo, Bh = function() {
  return Ve() - Ri > 34 && (wo || (wo = requestAnimationFrame(wn)));
}, Ms = function() {
  (!Qe || !Qe.isPressed || Qe.startX > Lt.clientWidth) && (bt.cache++, Qe ? wo || (wo = requestAnimationFrame(wn)) : wn(), Ri || bs("scrollStart"), Ri = Ve());
}, Sl = function() {
  vp = wt.innerWidth, yp = wt.innerHeight;
}, Fr = function(t) {
  bt.cache++, (t === !0 || !Be && !_p && !Wt.fullscreenElement && !Wt.webkitFullscreenElement && (!ac || vp !== wt.innerWidth || Math.abs(wt.innerHeight - yp) > wt.innerHeight * 0.25)) && ka.restart(!0);
}, ws = {}, R_ = [], Cp = function s() {
  return Pe(xt, "scrollEnd", s) || ns(!0);
}, bs = function(t) {
  return ws[t] && ws[t].map(function(e) {
    return e();
  }) || R_;
}, di = [], Op = function(t) {
  for (var e = 0; e < di.length; e += 5)
    (!t || di[e + 4] && di[e + 4].query === t) && (di[e].style.cssText = di[e + 1], di[e].getBBox && di[e].setAttribute("transform", di[e + 2] || ""), di[e + 3].uncache = 1);
}, _u = function(t, e) {
  var i;
  for (Je = 0; Je < vt.length; Je++)
    i = vt[Je], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  Ma = !0, e && Op(e), e || bs("revert");
}, Pp = function(t, e) {
  bt.cache++, (e || !ti) && bt.forEach(function(i) {
    return We(i) && i.cacheID++ && (i.rec = 0);
  }), pi(t) && (wt.history.scrollRestoration = hu = t);
}, ti, ps = 0, Vh, z_ = function() {
  if (Vh !== ps) {
    var t = Vh = ps;
    requestAnimationFrame(function() {
      return t === ps && ns(!0);
    });
  }
}, kp = function() {
  Lt.appendChild(Qs), fu = !Qe && Qs.offsetHeight || wt.innerHeight, Lt.removeChild(Qs);
}, Hh = function(t) {
  return vo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, ns = function(t, e) {
  if (mi = Wt.documentElement, Lt = Wt.body, uu = [wt, Wt, mi, Lt], Ri && !t && !Ma) {
    ke(xt, "scrollEnd", Cp);
    return;
  }
  kp(), ti = xt.isRefreshing = !0, bt.forEach(function(n) {
    return We(n) && ++n.cacheID && (n.rec = n());
  });
  var i = bs("refreshInit");
  mp && xt.sort(), e || _u(), bt.forEach(function(n) {
    We(n) && (n.smooth && (n.target.style.scrollBehavior = "auto"), n(0));
  }), vt.slice(0).forEach(function(n) {
    return n.refresh();
  }), Ma = !1, vt.forEach(function(n) {
    if (n._subPinOffset && n.pin) {
      var r = n.vars.horizontal ? "offsetWidth" : "offsetHeight", o = n.pin[r];
      n.revert(!0, 1), n.adjustPinSpacing(n.pin[r] - o), n.refresh();
    }
  }), cc = 1, Hh(!0), vt.forEach(function(n) {
    var r = en(n.scroller, n._dir), o = n.vars.end === "max" || n._endClamp && n.end > r, a = n._startClamp && n.start >= r;
    (o || a) && n.setPositions(a ? r - 1 : n.start, o ? Math.max(a ? r : n.start + 1, r) : n.end, !0);
  }), Hh(!1), cc = 0, i.forEach(function(n) {
    return n && n.render && n.render(-1);
  }), bt.forEach(function(n) {
    We(n) && (n.smooth && requestAnimationFrame(function() {
      return n.target.style.scrollBehavior = "smooth";
    }), n.rec && n(n.rec));
  }), Pp(hu, 1), ka.pause(), ps++, ti = 2, wn(2), vt.forEach(function(n) {
    return We(n.vars.onRefresh) && n.vars.onRefresh(n);
  }), ti = xt.isRefreshing = !1, bs("refresh");
}, hc = 0, pa = 1, eo, wn = function(t) {
  if (t === 2 || !ti && !Ma) {
    xt.isUpdating = !0, eo && eo.update(0);
    var e = vt.length, i = Ve(), n = i - xl >= 50, r = e && vt[0].scroll();
    if (pa = hc > r ? -1 : 1, ti || (hc = r), n && (Ri && !Ua && i - Ri > 200 && (Ri = 0, bs("scrollEnd")), Dr = xl, xl = i), pa < 0) {
      for (Je = e; Je-- > 0; )
        vt[Je] && vt[Je].update(0, n);
      pa = 1;
    } else
      for (Je = 0; Je < e; Je++)
        vt[Je] && vt[Je].update(0, n);
    xt.isUpdating = !1;
  }
  wo = 0;
}, fc = [Sp, Ep, pu, du, Mi + to, Mi + Zr, Mi + Jr, Mi + Qr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], ga = fc.concat([fs, ds, "boxSizing", "max" + ur, "max" + gu, "position", Mi, ge, ge + Jr, ge + Zr, ge + to, ge + Qr]), F_ = function(t, e, i) {
  Js(i);
  var n = t._gsap;
  if (n.spacerIsNative)
    Js(n.spacerState);
  else if (t._gsap.swappedIn) {
    var r = e.parentNode;
    r && (r.insertBefore(t, e), r.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, El = function(t, e, i, n) {
  if (!t._gsap.swappedIn) {
    for (var r = fc.length, o = e.style, a = t.style, l; r--; )
      l = fc[r], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[pu] = a[du] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[fs] = Ia(t, ii) + Te, o[ds] = Ia(t, Ae) + Te, o[ge] = a[Mi] = a[Ep] = a[Sp] = "0", Js(n), a[fs] = a["max" + ur] = i[fs], a[ds] = a["max" + gu] = i[ds], a[ge] = i[ge], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, N_ = /([A-Z])/g, Js = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, n = 0, r, o;
    for ((t.t._gsap || G.core.getCache(t.t)).uncache = 1; n < i; n += 2)
      o = t[n + 1], r = t[n], o ? e[r] = o : e[r] && e.removeProperty(r.replace(N_, "-$1").toLowerCase());
  }
}, Jo = function(t) {
  for (var e = ga.length, i = t.style, n = [], r = 0; r < e; r++)
    n.push(ga[r], i[ga[r]]);
  return n.t = t, n;
}, $_ = function(t, e, i) {
  for (var n = [], r = t.length, o = i ? 8 : 0, a; o < r; o += 2)
    a = t[o], n.push(a, a in e ? e[a] : t[o + 1]);
  return n.t = t.t, n;
}, ma = {
  left: 0,
  top: 0
}, Yh = function(t, e, i, n, r, o, a, l, u, h, f, d, c, g) {
  We(t) && (t = t(l)), pi(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? fa("0" + t.substr(3), i) : 0));
  var p = c ? c.time() : 0, _, w, A;
  if (c && c.seek(0), isNaN(t) || (t = +t), zr(t))
    c && (t = G.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, t)), a && da(a, i, n, !0);
  else {
    We(e) && (e = e(l));
    var C = (t || "0").split(" "), T, y, P, O;
    A = ri(e, l) || Lt, T = gn(A) || {}, (!T || !T.left && !T.top) && Ii(A).display === "none" && (O = A.style.display, A.style.display = "block", T = gn(A), O ? A.style.display = O : A.style.removeProperty("display")), y = fa(C[0], T[n.d]), P = fa(C[1] || "0", i), t = T[n.p] - u[n.p] - h + y + r - P, a && da(a, P, n, i - P < 20 || a._isStart && P > 20), i -= i - P;
  }
  if (g && (l[g] = t || -1e-3, t < 0 && (t = 0)), o) {
    var S = t + i, k = o._isStart;
    _ = "scroll" + n.d2, da(o, S, n, k && S > 20 || !k && (f ? Math.max(Lt[_], mi[_]) : o.parentNode[_]) <= S + 1), f && (u = gn(a), f && (o.style[n.op.p] = u[n.op.p] - n.op.m - o._offset + Te));
  }
  return c && A && (_ = gn(A), c.seek(d), w = gn(A), c._caScrollDist = _[n.p] - w[n.p], t = t / c._caScrollDist * d), c && c.seek(p), c ? t : Math.round(t);
}, B_ = /(webkit|moz|length|cssText|inset)/i, Wh = function(t, e, i, n) {
  if (t.parentNode !== e) {
    var r = t.style, o, a;
    if (e === Lt) {
      t._stOrig = r.cssText, a = Ii(t);
      for (o in a)
        !+o && !B_.test(o) && a[o] && typeof r[o] == "string" && o !== "0" && (r[o] = a[o]);
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
}, ta = function(t, e, i) {
  var n = {};
  n[e.p] = "+=" + i, G.set(t, n);
}, qh = function(t, e) {
  var i = Yn(t, e), n = "_scroll" + e.p2, r = function o(a, l, u, h, f) {
    var d = o.tween, c = l.onComplete, g = {};
    u = u || i();
    var p = Mp(i, u, function() {
      d.kill(), o.tween = 0;
    });
    return f = h && f || 0, h = h || a - u, d && d.kill(), l[n] = a, l.inherit = !1, l.modifiers = g, g[n] = function() {
      return p(u + h * d.ratio + f * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      bt.cache++, o.tween && wn();
    }, l.onComplete = function() {
      o.tween = 0, c && c.call(d);
    }, d = o.tween = G.to(t, l), d;
  };
  return t[n] = i, i.wheelHandler = function() {
    return r.tween && r.tween.kill() && (r.tween = 0);
  }, ke(t, "wheel", i.wheelHandler), xt.isTouch && ke(t, "touchmove", i.wheelHandler), r;
}, xt = /* @__PURE__ */ function() {
  function s(e, i) {
    Ls || s.register(G) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), lc(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, n) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Lr) {
      this.update = this.refresh = this.kill = ji;
      return;
    }
    i = Nh(pi(i) || zr(i) || i.nodeType ? {
      trigger: i
    } : i, Zo);
    var r = i, o = r.onUpdate, a = r.toggleClass, l = r.id, u = r.onToggle, h = r.onRefresh, f = r.scrub, d = r.trigger, c = r.pin, g = r.pinSpacing, p = r.invalidateOnRefresh, _ = r.anticipatePin, w = r.onScrubComplete, A = r.onSnapComplete, C = r.once, T = r.snap, y = r.pinReparent, P = r.pinSpacer, O = r.containerAnimation, S = r.fastScrollEnd, k = r.preventOverlaps, R = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? ii : Ae, V = !f && f !== 0, z = ri(i.scroller || wt), B = G.core.getCache(z), J = vs(z), it = ("pinType" in i ? i.pinType : Nn(z, "pinType") || J && "fixed") === "fixed", q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], H = V && i.toggleActions.split(" "), tt = "markers" in i ? i.markers : Zo.markers, ot = J ? 0 : parseFloat(Ii(z)["border" + R.p2 + ur]) || 0, b = this, j = i.onRefreshInit && function() {
      return i.onRefreshInit(b);
    }, nt = k_(z, J, R), U = M_(z, J), rt = 0, Dt = 0, _t = 0, Ct = Yn(z, R), ct, Rt, se, Bt, Ut, gt, mt, ut, Ce, I, Vt, Ke, Ie, zt, Nt, ue, Xe, Xt, re, Pt, he, De, Fe, Ki, Kt, Xi, si, ve, Le, Ei, Ne, at, $e, Ft, Oe, ie, Ai, Z, v;
    if (b._startClamp = b._endClamp = !1, b._dir = R, _ *= 45, b.scroller = z, b.scroll = O ? O.time.bind(O) : Ct, Bt = Ct(), b.vars = i, n = n || i.animation, "refreshPriority" in i && (mp = 1, i.refreshPriority === -9999 && (eo = b)), B.tweenScroll = B.tweenScroll || {
      top: qh(z, Ae),
      left: qh(z, ii)
    }, b.tweenTo = ct = B.tweenScroll[R.p], b.scrubDuration = function(D) {
      $e = zr(D) && D, $e ? at ? at.duration(D) : at = G.to(n, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: $e,
        paused: !0,
        onComplete: function() {
          return w && w(b);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, n && (n.vars.lazy = !1, n._initted && !b.isReverted || n.vars.immediateRender !== !1 && i.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), b.animation = n.pause(), n.scrollTrigger = b, b.scrubDuration(f), Ei = 0, l || (l = n.vars.id)), T && ((!ts(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in Lt.style && G.set(J ? [Lt, mi] : z, {
      scrollBehavior: "auto"
    }), bt.forEach(function(D) {
      return We(D) && D.target === (J ? Wt.scrollingElement || mi : z) && (D.smooth = !1);
    }), se = We(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? D_(n) : T.snapTo === "labelsDirectional" ? L_(n) : T.directional !== !1 ? function(D, Y) {
      return mu(T.snapTo)(D, Ve() - Dt < 500 ? 0 : Y.direction);
    } : G.utils.snap(T.snapTo), Ft = T.duration || {
      min: 0.1,
      max: 2
    }, Ft = ts(Ft) ? jr(Ft.min, Ft.max) : jr(Ft, Ft), Oe = G.delayedCall(T.delay || $e / 2 || 0.1, function() {
      var D = Ct(), Y = Ve() - Dt < 500, F = ct.tween;
      if ((Y || Math.abs(b.getVelocity()) < 10) && !F && !Ua && rt !== D) {
        var W = (D - gt) / zt, et = n && !V ? n.totalProgress() : W, K = Y ? 0 : (et - Ne) / (Ve() - Dr) * 1e3 || 0, dt = G.utils.clamp(-W, 1 - W, ks(K / 2) * K / 0.185), Tt = W + (T.inertia === !1 ? 0 : dt), Ot, yt, pt = T, kt = pt.onStart, ht = pt.onInterrupt, we = pt.onComplete;
        if (Ot = se(Tt, b), zr(Ot) || (Ot = Tt), yt = Math.max(0, Math.round(gt + Ot * zt)), D <= mt && D >= gt && yt !== D) {
          if (F && !F._initted && F.data <= ks(yt - D))
            return;
          T.inertia === !1 && (dt = Ot - W), ct(yt, {
            duration: Ft(ks(Math.max(ks(Tt - et), ks(Ot - et)) * 0.185 / K / 0.05 || 0)),
            ease: T.ease || "power3",
            data: ks(yt - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Oe.restart(!0) && ht && ht(b);
            },
            onComplete: function() {
              b.update(), rt = Ct(), n && !V && (at ? at.resetTo("totalProgress", Ot, n._tTime / n._tDur) : n.progress(Ot)), Ei = Ne = n && !V ? n.totalProgress() : b.progress, A && A(b), we && we(b);
            }
          }, D, dt * zt, yt - D - dt * zt), kt && kt(b, ct.tween);
        }
      } else b.isActive && rt !== D && Oe.restart(!0);
    }).pause()), l && (uc[l] = b), d = b.trigger = ri(d || c !== !0 && c), v = d && d._gsap && d._gsap.stRevert, v && (v = v(b)), c = c === !0 ? d : ri(c), pi(a) && (a = {
      targets: d,
      className: a
    }), c && (g === !1 || g === Mi || (g = !g && c.parentNode && c.parentNode.style && Ii(c.parentNode).display === "flex" ? !1 : ge), b.pin = c, Rt = G.core.getCache(c), Rt.spacer ? Nt = Rt.pinState : (P && (P = ri(P), P && !P.nodeType && (P = P.current || P.nativeElement), Rt.spacerIsNative = !!P, P && (Rt.spacerState = Jo(P))), Rt.spacer = Xt = P || Wt.createElement("div"), Xt.classList.add("pin-spacer"), l && Xt.classList.add("pin-spacer-" + l), Rt.pinState = Nt = Jo(c)), i.force3D !== !1 && G.set(c, {
      force3D: !0
    }), b.spacer = Xt = Rt.spacer, Le = Ii(c), Ki = Le[g + R.os2], Pt = G.getProperty(c), he = G.quickSetter(c, R.a, Te), El(c, Xt, Le), Xe = Jo(c)), tt) {
      Ke = ts(tt) ? Nh(tt, $h) : $h, I = Qo("scroller-start", l, z, R, Ke, 0), Vt = Qo("scroller-end", l, z, R, Ke, 0, I), re = I["offset" + R.op.d2];
      var $ = ri(Nn(z, "content") || z);
      ut = this.markerStart = Qo("start", l, $, R, Ke, re, 0, O), Ce = this.markerEnd = Qo("end", l, $, R, Ke, re, 0, O), O && (Z = G.quickSetter([ut, Ce], R.a, Te)), !it && !(sn.length && Nn(z, "fixedMarkers") === !0) && (I_(J ? Lt : z), G.set([I, Vt], {
        force3D: !0
      }), Xi = G.quickSetter(I, R.a, Te), ve = G.quickSetter(Vt, R.a, Te));
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
      var F = D !== !1 || !b.enabled, W = Be;
      F !== b.isReverted && (F && (ie = Math.max(Ct(), b.scroll.rec || 0), _t = b.progress, Ai = n && n.progress()), ut && [ut, Ce, I, Vt].forEach(function(et) {
        return et.style.display = F ? "none" : "block";
      }), F && (Be = b, b.update(F)), c && (!y || !b.isActive) && (F ? F_(c, Xt, Nt) : El(c, Xt, Ii(c), Kt)), F || b.update(F), Be = W, b.isReverted = F);
    }, b.refresh = function(D, Y, F, W) {
      if (!((Be || !b.enabled) && !Y)) {
        if (c && D && Ri) {
          ke(s, "scrollEnd", Cp);
          return;
        }
        !ti && j && j(b), Be = b, ct.tween && !F && (ct.tween.kill(), ct.tween = 0), at && at.pause(), p && n && (n.revert({
          kill: !1
        }).invalidate(), n.getChildren && n.getChildren(!0, !0, !1).forEach(function(Ni) {
          return Ni.vars.immediateRender && Ni.render(0, !0, !0);
        })), b.isReverted || b.revert(!0, !0), b._subPinOffset = !1;
        var et = nt(), K = U(), dt = O ? O.duration() : en(z, R), Tt = zt <= 0.01 || !zt, Ot = 0, yt = W || 0, pt = ts(F) ? F.end : i.end, kt = i.endTrigger || d, ht = ts(F) ? F.start : i.start || (i.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"), we = b.pinnedContainer = i.pinnedContainer && ri(i.pinnedContainer, b), Gt = d && Math.max(0, vt.indexOf(b)) || 0, be = Gt, xe, fe, an, ln, de, oe, Ge, Ss, Fo, Xn, Ci, cn, Es;
        for (tt && ts(F) && (cn = G.getProperty(I, R.p), Es = G.getProperty(Vt, R.p)); be-- > 0; )
          oe = vt[be], oe.end || oe.refresh(0, 1) || (Be = b), Ge = oe.pin, Ge && (Ge === d || Ge === c || Ge === we) && !oe.isReverted && (Xn || (Xn = []), Xn.unshift(oe), oe.revert(!0, !0)), oe !== vt[be] && (Gt--, be--);
        for (We(ht) && (ht = ht(b)), ht = Lh(ht, "start", b), gt = Yh(ht, d, et, R, Ct(), ut, I, b, K, ot, it, dt, O, b._startClamp && "_startClamp") || (c ? -1e-3 : 0), We(pt) && (pt = pt(b)), pi(pt) && !pt.indexOf("+=") && (~pt.indexOf(" ") ? pt = (pi(ht) ? ht.split(" ")[0] : "") + pt : (Ot = fa(pt.substr(2), et), pt = pi(ht) ? ht : (O ? G.utils.mapRange(0, O.duration(), O.scrollTrigger.start, O.scrollTrigger.end, gt) : gt) + Ot, kt = d)), pt = Lh(pt, "end", b), mt = Math.max(gt, Yh(pt || (kt ? "100% 0" : dt), kt, et, R, Ct() + Ot, Ce, Vt, b, K, ot, it, dt, O, b._endClamp && "_endClamp")) || -1e-3, Ot = 0, be = Gt; be--; )
          oe = vt[be], Ge = oe.pin, Ge && oe.start - oe._pinPush <= gt && !O && oe.end > 0 && (xe = oe.end - (b._startClamp ? Math.max(0, oe.start) : oe.start), (Ge === d && oe.start - oe._pinPush < gt || Ge === we) && isNaN(ht) && (Ot += xe * (1 - oe.progress)), Ge === c && (yt += xe));
        if (gt += Ot, mt += Ot, b._startClamp && (b._startClamp += Ot), b._endClamp && !ti && (b._endClamp = mt || -1e-3, mt = Math.min(mt, en(z, R))), zt = mt - gt || (gt -= 0.01) && 1e-3, Tt && (_t = G.utils.clamp(0, 1, G.utils.normalize(gt, mt, ie))), b._pinPush = yt, ut && Ot && (xe = {}, xe[R.a] = "+=" + Ot, we && (xe[R.p] = "-=" + Ct()), G.set([ut, Ce], xe)), c && !(cc && b.end >= en(z, R)))
          xe = Ii(c), ln = R === Ae, an = Ct(), De = parseFloat(Pt(R.a)) + yt, !dt && mt > 1 && (Ci = (J ? Wt.scrollingElement || mi : z).style, Ci = {
            style: Ci,
            value: Ci["overflow" + R.a.toUpperCase()]
          }, J && Ii(Lt)["overflow" + R.a.toUpperCase()] !== "scroll" && (Ci.style["overflow" + R.a.toUpperCase()] = "scroll")), El(c, Xt, xe), Xe = Jo(c), fe = gn(c, !0), Ss = it && Yn(z, ln ? ii : Ae)(), g ? (Kt = [g + R.os2, zt + yt + Te], Kt.t = Xt, be = g === ge ? Ia(c, R) + zt + yt : 0, be && (Kt.push(R.d, be + Te), Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = be + Te)), Js(Kt), we && vt.forEach(function(Ni) {
            Ni.pin === we && Ni.vars.pinSpacing !== !1 && (Ni._subPinOffset = !0);
          }), it && Ct(ie)) : (be = Ia(c, R), be && Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = be + Te)), it && (de = {
            top: fe.top + (ln ? an - gt : Ss) + Te,
            left: fe.left + (ln ? Ss : an - gt) + Te,
            boxSizing: "border-box",
            position: "fixed"
          }, de[fs] = de["max" + ur] = Math.ceil(fe.width) + Te, de[ds] = de["max" + gu] = Math.ceil(fe.height) + Te, de[Mi] = de[Mi + Jr] = de[Mi + Zr] = de[Mi + to] = de[Mi + Qr] = "0", de[ge] = xe[ge], de[ge + Jr] = xe[ge + Jr], de[ge + Zr] = xe[ge + Zr], de[ge + to] = xe[ge + to], de[ge + Qr] = xe[ge + Qr], ue = $_(Nt, de, y), ti && Ct(0)), n ? (Fo = n._initted, wl(1), n.render(n.duration(), !0, !0), Fe = Pt(R.a) - De + zt + yt, si = Math.abs(zt - Fe) > 1, it && si && ue.splice(ue.length - 2, 2), n.render(0, !0, !0), Fo || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), wl(0)) : Fe = zt, Ci && (Ci.value ? Ci.style["overflow" + R.a.toUpperCase()] = Ci.value : Ci.style.removeProperty("overflow-" + R.a));
        else if (d && Ct() && !O)
          for (fe = d.parentNode; fe && fe !== Lt; )
            fe._pinOffset && (gt -= fe._pinOffset, mt -= fe._pinOffset), fe = fe.parentNode;
        Xn && Xn.forEach(function(Ni) {
          return Ni.revert(!1, !0);
        }), b.start = gt, b.end = mt, Bt = Ut = ti ? ie : Ct(), !O && !ti && (Bt < ie && Ct(ie), b.scroll.rec = 0), b.revert(!1, !0), Dt = Ve(), Oe && (rt = -1, Oe.restart(!0)), Be = 0, n && V && (n._initted || Ai) && n.progress() !== Ai && n.progress(Ai || 0, !0).render(n.time(), !0, !0), (Tt || _t !== b.progress || O || p || n && !n._initted) && (n && !V && (n._initted || _t || n.vars.immediateRender !== !1) && n.totalProgress(O && gt < -1e-3 && !_t ? G.utils.normalize(gt, mt, 0) : _t, !0), b.progress = Tt || (Bt - gt) / zt === _t ? 0 : _t), c && g && (Xt._pinOffset = Math.round(b.progress * Fe)), at && at.invalidate(), isNaN(cn) || (cn -= G.getProperty(I, R.p), Es -= G.getProperty(Vt, R.p), ta(I, R, cn), ta(ut, R, cn - (W || 0)), ta(Vt, R, Es), ta(Ce, R, Es - (W || 0))), Tt && !ti && b.update(), h && !ti && !Ie && (Ie = !0, h(b), Ie = !1);
      }
    }, b.getVelocity = function() {
      return (Ct() - Ut) / (Ve() - Dr) * 1e3 || 0;
    }, b.endAnimation = function() {
      xr(b.callbackAnimation), n && (at ? at.progress(1) : n.paused() ? V || xr(n, b.direction < 0, 1) : xr(n, n.reversed()));
    }, b.labelToScroll = function(D) {
      return n && n.labels && (gt || b.refresh() || gt) + n.labels[D] / n.duration() * zt || 0;
    }, b.getTrailing = function(D) {
      var Y = vt.indexOf(b), F = b.direction > 0 ? vt.slice(0, Y).reverse() : vt.slice(Y + 1);
      return (pi(D) ? F.filter(function(W) {
        return W.vars.preventOverlaps === D;
      }) : F).filter(function(W) {
        return b.direction > 0 ? W.end <= gt : W.start >= mt;
      });
    }, b.update = function(D, Y, F) {
      if (!(O && !F && !D)) {
        var W = ti === !0 ? ie : b.scroll(), et = D ? 0 : (W - gt) / zt, K = et < 0 ? 0 : et > 1 ? 1 : et || 0, dt = b.progress, Tt, Ot, yt, pt, kt, ht, we, Gt;
        if (Y && (Ut = Bt, Bt = O ? Ct() : W, T && (Ne = Ei, Ei = n && !V ? n.totalProgress() : K)), _ && c && !Be && !Ko && Ri && (!K && gt < W + (W - Ut) / (Ve() - Dr) * _ ? K = 1e-4 : K === 1 && mt > W + (W - Ut) / (Ve() - Dr) * _ && (K = 0.9999)), K !== dt && b.enabled) {
          if (Tt = b.isActive = !!K && K < 1, Ot = !!dt && dt < 1, ht = Tt !== Ot, kt = ht || !!K != !!dt, b.direction = K > dt ? 1 : -1, b.progress = K, kt && !Be && (yt = K && !dt ? 0 : K === 1 ? 1 : dt === 1 ? 2 : 3, V && (pt = !ht && H[yt + 1] !== "none" && H[yt + 1] || H[yt], Gt = n && (pt === "complete" || pt === "reset" || pt in n))), k && (ht || Gt) && (Gt || f || !n) && (We(k) ? k(b) : b.getTrailing(k).forEach(function(an) {
            return an.endAnimation();
          })), V || (at && !Be && !Ko ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", K, n._tTime / n._tDur) : (at.vars.totalProgress = K, at.invalidate().restart())) : n && n.totalProgress(K, !!(Be && (Dt || D)))), c) {
            if (D && g && (Xt.style[g + R.os2] = Ki), !it)
              he(Rr(De + Fe * K));
            else if (kt) {
              if (we = !D && K > dt && mt + 1 > W && W + 1 >= en(z, R), y)
                if (!D && (Tt || we)) {
                  var be = gn(c, !0), xe = W - gt;
                  Wh(c, Lt, be.top + (R === Ae ? xe : 0) + Te, be.left + (R === Ae ? 0 : xe) + Te);
                } else
                  Wh(c, Xt);
              Js(Tt || we ? ue : Xe), si && K < 1 && Tt || he(De + (K === 1 && !we ? Fe : 0));
            }
          }
          T && !ct.tween && !Be && !Ko && Oe.restart(!0), a && (ht || C && K && (K < 1 || !bl)) && vo(a.targets).forEach(function(an) {
            return an.classList[Tt || C ? "add" : "remove"](a.className);
          }), o && !V && !D && o(b), kt && !Be ? (V && (Gt && (pt === "complete" ? n.pause().totalProgress(1) : pt === "reset" ? n.restart(!0).pause() : pt === "restart" ? n.restart(!0) : n[pt]()), o && o(b)), (ht || !bl) && (u && ht && Tl(b, u), q[yt] && Tl(b, q[yt]), C && (K === 1 ? b.kill(!1, 1) : q[yt] = 0), ht || (yt = K === 1 ? 1 : 3, q[yt] && Tl(b, q[yt]))), S && !Tt && Math.abs(b.getVelocity()) > (zr(S) ? S : 2500) && (xr(b.callbackAnimation), at ? at.progress(1) : xr(n, pt === "reverse" ? 1 : !K, 1))) : V && o && !Be && o(b);
        }
        if (ve) {
          var fe = O ? W / O.duration() * (O._caScrollDist || 0) : W;
          Xi(fe + (I._isFlipped ? 1 : 0)), ve(fe);
        }
        Z && Z(-W / O.duration() * (O._caScrollDist || 0));
      }
    }, b.enable = function(D, Y) {
      b.enabled || (b.enabled = !0, ke(z, "resize", Fr), J || ke(z, "scroll", Ms), j && ke(s, "refreshInit", j), D !== !1 && (b.progress = _t = 0, Bt = Ut = rt = Ct()), Y !== !1 && b.refresh());
    }, b.getTween = function(D) {
      return D && ct ? ct.tween : at;
    }, b.setPositions = function(D, Y, F, W) {
      if (O) {
        var et = O.scrollTrigger, K = O.duration(), dt = et.end - et.start;
        D = et.start + dt * D / K, Y = et.start + dt * Y / K;
      }
      b.refresh(!1, !1, {
        start: Rh(D, F && !!b._startClamp),
        end: Rh(Y, F && !!b._endClamp)
      }, W), b.update();
    }, b.adjustPinSpacing = function(D) {
      if (Kt && D) {
        var Y = Kt.indexOf(R.d) + 1;
        Kt[Y] = parseFloat(Kt[Y]) + D + Te, Kt[1] = parseFloat(Kt[1]) + D + Te, Js(Kt);
      }
    }, b.disable = function(D, Y) {
      if (b.enabled && (D !== !1 && b.revert(!0, !0), b.enabled = b.isActive = !1, Y || at && at.pause(), ie = 0, Rt && (Rt.uncache = 1), j && Pe(s, "refreshInit", j), Oe && (Oe.pause(), ct.tween && ct.tween.kill() && (ct.tween = 0)), !J)) {
        for (var F = vt.length; F--; )
          if (vt[F].scroller === z && vt[F] !== b)
            return;
        Pe(z, "resize", Fr), J || Pe(z, "scroll", Ms);
      }
    }, b.kill = function(D, Y) {
      b.disable(D, Y), at && !Y && at.kill(), l && delete uc[l];
      var F = vt.indexOf(b);
      F >= 0 && vt.splice(F, 1), F === Je && pa > 0 && Je--, F = 0, vt.forEach(function(W) {
        return W.scroller === b.scroller && (F = 1);
      }), F || ti || (b.scroll.rec = 0), n && (n.scrollTrigger = null, D && n.revert({
        kill: !1
      }), Y || n.kill()), ut && [ut, Ce, I, Vt].forEach(function(W) {
        return W.parentNode && W.parentNode.removeChild(W);
      }), eo === b && (eo = 0), c && (Rt && (Rt.uncache = 1), F = 0, vt.forEach(function(W) {
        return W.pin === c && F++;
      }), F || (Rt.spacer = 0)), i.onKill && i.onKill(b);
    }, vt.push(b), b.enable(!1, !1), v && v(b), n && n.add && !zt) {
      var N = b.update;
      b.update = function() {
        b.update = N, bt.cache++, gt || mt || b.refresh();
      }, G.delayedCall(0.01, b.update), zt = 0.01, gt = mt = 0;
    } else
      b.refresh();
    c && z_();
  }, s.register = function(i) {
    return Ls || (G = i || bp(), wp() && window.document && s.enable(), Ls = Lr), Ls;
  }, s.defaults = function(i) {
    if (i)
      for (var n in i)
        Zo[n] = i[n];
    return Zo;
  }, s.disable = function(i, n) {
    Lr = 0, vt.forEach(function(o) {
      return o[n ? "kill" : "disable"](i);
    }), Pe(wt, "wheel", Ms), Pe(Wt, "scroll", Ms), clearInterval(Uo), Pe(Wt, "touchcancel", ji), Pe(Lt, "touchstart", ji), Go(Pe, Wt, "pointerdown,touchstart,mousedown", zh), Go(Pe, Wt, "pointerup,touchend,mouseup", Fh), ka.kill(), Xo(Pe);
    for (var r = 0; r < bt.length; r += 3)
      jo(Pe, bt[r], bt[r + 1]), jo(Pe, bt[r], bt[r + 2]);
  }, s.enable = function() {
    if (wt = window, Wt = document, mi = Wt.documentElement, Lt = Wt.body, G && (vo = G.utils.toArray, jr = G.utils.clamp, lc = G.core.context || ji, wl = G.core.suppressOverwrites || ji, hu = wt.history.scrollRestoration || "auto", hc = wt.pageYOffset || 0, G.core.globals("ScrollTrigger", s), Lt)) {
      Lr = 1, Qs = document.createElement("div"), Qs.style.height = "100vh", Qs.style.position = "absolute", kp(), P_(), ce.register(G), s.isTouch = ce.isTouch, An = ce.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), ac = ce.isTouch === 1, ke(wt, "wheel", Ms), uu = [wt, Wt, mi, Lt], G.matchMedia ? (s.matchMedia = function(u) {
        var h = G.matchMedia(), f;
        for (f in u)
          h.add(f, u[f]);
        return h;
      }, G.addEventListener("matchMediaInit", function() {
        return _u();
      }), G.addEventListener("matchMediaRevert", function() {
        return Op();
      }), G.addEventListener("matchMedia", function() {
        ns(0, 1), bs("matchMedia");
      }), G.matchMedia().add("(orientation: portrait)", function() {
        return Sl(), Sl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Sl(), ke(Wt, "scroll", Ms);
      var i = Lt.hasAttribute("style"), n = Lt.style, r = n.borderTopStyle, o = G.core.Animation.prototype, a, l;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = gn(Lt), Ae.m = Math.round(a.top + Ae.sc()) || 0, ii.m = Math.round(a.left + ii.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), i || (Lt.setAttribute("style", ""), Lt.removeAttribute("style")), Uo = setInterval(Bh, 250), G.delayedCall(0.5, function() {
        return Ko = 0;
      }), ke(Wt, "touchcancel", ji), ke(Lt, "touchstart", ji), Go(ke, Wt, "pointerdown,touchstart,mousedown", zh), Go(ke, Wt, "pointerup,touchend,mouseup", Fh), oc = G.utils.checkPrefix("transform"), ga.push(oc), Ls = Ve(), ka = G.delayedCall(0.2, ns).pause(), Rs = [Wt, "visibilitychange", function() {
        var u = wt.innerWidth, h = wt.innerHeight;
        Wt.hidden ? (Ih = u, Dh = h) : (Ih !== u || Dh !== h) && Fr();
      }, Wt, "DOMContentLoaded", ns, wt, "load", ns, wt, "resize", Fr], Xo(ke), vt.forEach(function(u) {
        return u.enable(0, 1);
      }), l = 0; l < bt.length; l += 3)
        jo(Pe, bt[l], bt[l + 1]), jo(Pe, bt[l], bt[l + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (bl = !!i.limitCallbacks);
    var n = i.syncInterval;
    n && clearInterval(Uo) || (Uo = n) && setInterval(Bh, n), "ignoreMobileResize" in i && (ac = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Xo(Pe) || Xo(ke, i.autoRefreshEvents || "none"), _p = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, n) {
    var r = ri(i), o = bt.indexOf(r), a = vs(r);
    ~o && bt.splice(o, a ? 6 : 2), n && (a ? sn.unshift(wt, n, Lt, n, mi, n) : sn.unshift(r, n));
  }, s.clearMatchMedia = function(i) {
    vt.forEach(function(n) {
      return n._ctx && n._ctx.query === i && n._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, n, r) {
    var o = (pi(i) ? ri(i) : i).getBoundingClientRect(), a = o[r ? fs : ds] * n || 0;
    return r ? o.right - a > 0 && o.left + a < wt.innerWidth : o.bottom - a > 0 && o.top + a < wt.innerHeight;
  }, s.positionInViewport = function(i, n, r) {
    pi(i) && (i = ri(i));
    var o = i.getBoundingClientRect(), a = o[r ? fs : ds], l = n == null ? a / 2 : n in Da ? Da[n] * a : ~n.indexOf("%") ? parseFloat(n) * a / 100 : parseFloat(n) || 0;
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
  return s ? vo(s).forEach(function(t) {
    if (t && t.style) {
      var e = di.indexOf(t);
      e >= 0 && di.splice(e, 5), di.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), G.core.getCache(t), lc());
    }
  }) : di;
};
xt.revert = function(s, t) {
  return _u(!s, t);
};
xt.create = function(s, t) {
  return new xt(s, t);
};
xt.refresh = function(s) {
  return s ? Fr(!0) : (Ls || xt.register()) && ns(!0);
};
xt.update = function(s) {
  return ++bt.cache && wn(s === !0 ? 2 : 0);
};
xt.clearScrollMemory = Pp;
xt.maxScroll = function(s, t) {
  return en(s, t ? ii : Ae);
};
xt.getScrollFunc = function(s, t) {
  return Yn(ri(s), t ? ii : Ae);
};
xt.getById = function(s) {
  return uc[s];
};
xt.getAll = function() {
  return vt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
xt.isScrolling = function() {
  return !!Ri;
};
xt.snapDirectional = mu;
xt.addEventListener = function(s, t) {
  var e = ws[s] || (ws[s] = []);
  ~e.indexOf(t) || e.push(t);
};
xt.removeEventListener = function(s, t) {
  var e = ws[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
xt.batch = function(s, t) {
  var e = [], i = {}, n = t.interval || 0.016, r = t.batchMax || 1e9, o = function(u, h) {
    var f = [], d = [], c = G.delayedCall(n, function() {
      h(f, d), f = [], d = [];
    }).pause();
    return function(g) {
      f.length || c.restart(!0), f.push(g.trigger), d.push(g), r <= f.length && c.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && We(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return We(r) && (r = r(), ke(xt, "refresh", function() {
    return r = t.batchMax();
  })), vo(s).forEach(function(l) {
    var u = {};
    for (a in i)
      u[a] = i[a];
    u.trigger = l, e.push(xt.create(u));
  }), e;
};
var Uh = function(t, e, i, n) {
  return e > n ? t(n) : e < 0 && t(0), i > n ? (n - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, Al = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (ce.isTouch ? " pinch-zoom" : "") : "none", t === mi && s(Lt, e);
}, ea = {
  auto: 1,
  scroll: 1
}, V_ = function(t) {
  var e = t.event, i = t.target, n = t.axis, r = (e.changedTouches ? e.changedTouches[0] : e).target, o = r._gsap || G.core.getCache(r), a = Ve(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; r && r !== Lt && (r.scrollHeight <= r.clientHeight && r.scrollWidth <= r.clientWidth || !(ea[(l = Ii(r)).overflowY] || ea[l.overflowX])); )
      r = r.parentNode;
    o._isScroll = r && r !== i && !vs(r) && (ea[(l = Ii(r)).overflowY] || ea[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || n === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, Ip = function(t, e, i, n) {
  return ce.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: n = n && V_,
    onPress: n,
    onDrag: n,
    onScroll: n,
    onEnable: function() {
      return i && ke(Wt, ce.eventTypes[0], Xh, !1, !0);
    },
    onDisable: function() {
      return Pe(Wt, ce.eventTypes[0], Xh, !0);
    }
  });
}, H_ = /(input|label|select|textarea)/i, Kh, Xh = function(t) {
  var e = H_.test(t.target.tagName);
  (e || Kh) && (t._gsapAllow = !0, Kh = e);
}, Y_ = function(t) {
  ts(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, n = e.momentum, r = e.allowNestedScroll, o = e.onRelease, a, l, u = ri(t.target) || mi, h = G.core.globals().ScrollSmoother, f = h && h.get(), d = An && (t.content && ri(t.content) || f && t.content !== !1 && !f.smooth() && f.content()), c = Yn(u, Ae), g = Yn(u, ii), p = 1, _ = (ce.isTouch && wt.visualViewport ? wt.visualViewport.scale * wt.visualViewport.width : wt.outerWidth) / wt.innerWidth, w = 0, A = We(n) ? function() {
    return n(a);
  } : function() {
    return n || 2.8;
  }, C, T, y = Ip(u, t.type, !0, r), P = function() {
    return T = !1;
  }, O = ji, S = ji, k = function() {
    l = en(u, Ae), S = jr(An ? 1 : 0, l), i && (O = jr(0, en(u, ii))), C = ps;
  }, R = function() {
    d._gsap.y = Rr(parseFloat(d._gsap.y) + c.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, V = function() {
    if (T) {
      requestAnimationFrame(P);
      var tt = Rr(a.deltaY / 2), ot = S(c.v - tt);
      if (d && ot !== c.v + c.offset) {
        c.offset = ot - c.v;
        var b = Rr((parseFloat(d && d._gsap.y) || 0) - c.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + b + ", 0, 1)", d._gsap.y = b + "px", c.cacheID = bt.cache, wn();
      }
      return !0;
    }
    c.offset && R(), T = !0;
  }, z, B, J, it, q = function() {
    k(), z.isActive() && z.vars.scrollY > l && (c() > l ? z.progress(1) && c(l) : z.resetTo("scrollY", l));
  };
  return d && G.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return An && H.type === "touchmove" && V() || p > 1.05 && H.type !== "touchstart" || a.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    T = !1;
    var H = p;
    p = Rr((wt.visualViewport && wt.visualViewport.scale || 1) / _), z.pause(), H !== p && Al(u, p > 1.01 ? !0 : i ? !1 : "x"), B = g(), J = c(), k(), C = ps;
  }, t.onRelease = t.onGestureStart = function(H, tt) {
    if (c.offset && R(), !tt)
      it.restart(!0);
    else {
      bt.cache++;
      var ot = A(), b, j;
      i && (b = g(), j = b + ot * 0.05 * -H.velocityX / 0.227, ot *= Uh(g, b, j, en(u, ii)), z.vars.scrollX = O(j)), b = c(), j = b + ot * 0.05 * -H.velocityY / 0.227, ot *= Uh(c, b, j, en(u, Ae)), z.vars.scrollY = S(j), z.invalidate().duration(ot).play(0.01), (An && z.vars.scrollY >= l || b >= l - 1) && G.to({}, {
        onUpdate: q,
        duration: ot
      });
    }
    o && o(H);
  }, t.onWheel = function() {
    z._ts && z.pause(), Ve() - w > 1e3 && (C = 0, w = Ve());
  }, t.onChange = function(H, tt, ot, b, j) {
    if (ps !== C && k(), tt && i && g(O(b[2] === tt ? B + (H.startX - H.x) : g() + tt - b[1])), ot) {
      c.offset && R();
      var nt = j[2] === ot, U = nt ? J + H.startY - H.y : c() + ot - j[1], rt = S(U);
      nt && U !== rt && (J += rt - U), c(rt);
    }
    (ot || tt) && wn();
  }, t.onEnable = function() {
    Al(u, i ? !1 : "x"), xt.addEventListener("refresh", q), ke(wt, "resize", q), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = g.smooth = !1), y.enable();
  }, t.onDisable = function() {
    Al(u, !0), Pe(wt, "resize", q), xt.removeEventListener("refresh", q), y.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new ce(t), a.iOS = An, An && !c() && c(1), An && G.ticker.add(ji), it = a._dc, z = G.to(a, {
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
  if (We(s))
    return vt.sort(s);
  var t = wt.pageYOffset || 0;
  return xt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + wt.innerHeight;
  }), vt.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
xt.observe = function(s) {
  return new ce(s);
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
  var t = s instanceof ce ? s : Y_(s);
  return Qe && Qe.target === t.target && Qe.kill(), vs(t.target) && (Qe = t), t;
};
xt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: sc,
  _inputObserver: Ip,
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
bp() && G.registerPlugin(xt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Zi, dc, io, Dp, zs, Bs, pc, Lp, Rp = function() {
  return Zi || typeof window < "u" && (Zi = window.gsap);
}, gc = {}, W_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, mc = function(t) {
  return Lp(t).id;
}, Nr = function(t) {
  return gc[mc(typeof t == "string" ? io(t)[0] : t)];
}, Gh = function(t) {
  var e = zs, i;
  if (t - pc >= 0.05)
    for (pc = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, q_ = {
  deg: 360,
  rad: Math.PI * 2
}, Cl = function() {
  Zi = Rp(), Zi && (io = Zi.utils.toArray, Dp = Zi.utils.getUnit, Lp = Zi.core.getCache, Bs = Zi.ticker, dc = 1);
}, U_ = function(t, e, i, n) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = q_[i || Dp(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = Bs.time, n && (this._next = n, n._prev = this);
}, Mo = /* @__PURE__ */ function() {
  function s(e, i) {
    dc || Cl(), this.target = io(e)[0], gc[mc(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    Zi = i, Cl();
  };
  var t = s.prototype;
  return t.get = function(i, n) {
    var r = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, l;
    return o = parseFloat(n ? r.v1 : r.g(r.t, r.p)), a = o - parseFloat(r.v2), l = r.rCap, l && (a = a % l, a !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), W_(a / ((n ? r.t1 : Bs.time) - r.t2));
  }, t.getAll = function() {
    var i = {}, n = this._props, r;
    for (r in n)
      i[r] = this.get(r);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, n) {
    i in this._props || (zs || (Bs.add(Gh), pc = Bs.time), zs = this._props[i] = new U_(this.target, i, n, zs));
  }, t.remove = function(i) {
    var n = this._props[i], r, o;
    n && (r = n._prev, o = n._next, r && (r._next = o), o ? o._prev = r : zs === n && (Bs.remove(Gh), zs = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var n in this._props)
      this.remove(n);
    i || delete gc[mc(this.target)];
  }, s.track = function(i, n, r) {
    dc || Cl();
    for (var o = [], a = io(i), l = n.split(","), u = (r || "").split(","), h = a.length, f, d; h--; ) {
      for (f = Nr(a[h]) || new s(a[h]), d = l.length; d--; )
        f.add(l[d], u[d] || u[0]);
      o.push(f);
    }
    return o;
  }, s.untrack = function(i, n) {
    var r = (n || "").split(",");
    io(i).forEach(function(o) {
      var a = Nr(o);
      a && (r.length ? r.forEach(function(l) {
        return a.remove(l);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, n) {
    var r = Nr(i);
    return r && r.isTracking(n);
  }, s.getVelocity = function(i, n) {
    var r = Nr(i);
    return !r || !r.isTracking(n) ? console.warn("Not tracking velocity of " + n) : r.get(n);
  }, s;
}();
Mo.getByTarget = Nr;
Rp() && Zi.registerPlugin(Mo);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ee, zp, jh, Fp, _c, no, Np, $p, Bp, yu, Vp, so, yc, Hp, La = Mo.getByTarget, Yp = function() {
  return Ee || typeof window < "u" && (Ee = window.gsap) && Ee.registerPlugin && Ee;
}, K_ = function(t) {
  return typeof t == "string";
}, bo = function(t) {
  return typeof t == "number";
}, Bn = function(t) {
  return typeof t == "object";
}, vc = function(t) {
  return typeof t == "function";
}, X_ = 1, Wp = Array.isArray, G_ = function(t) {
  return t;
}, tr = 1e10, Zh = 1 / tr, qp = 0.05, j_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, Z_ = function(t, e, i) {
  for (var n in e)
    !(n in t) && n !== i && (t[n] = e[n]);
  return t;
}, Q_ = function s(t) {
  var e = {}, i, n;
  for (i in t)
    e[i] = Bn(n = t[i]) && !Wp(n) ? s(n) : n;
  return e;
}, Qh = function(t, e, i, n, r) {
  var o = e.length, a = 0, l = tr, u, h, f, d;
  if (Bn(t)) {
    for (; o--; ) {
      u = e[o], h = 0;
      for (f in t)
        d = u[f] - t[f], h += d * d;
      h < l && (a = o, l = h);
    }
    if ((r || tr) < tr && r < Math.sqrt(l))
      return t;
  } else
    for (; o--; )
      u = e[o], h = u - t, h < 0 && (h = -h), h < l && u >= n && u <= i && (a = o, l = h);
  return e[a];
}, Up = function(t, e, i, n, r, o, a) {
  if (t.end === "auto")
    return t;
  var l = t.end, u, h;
  if (i = isNaN(i) ? tr : i, n = isNaN(n) ? -1e10 : n, Bn(e)) {
    if (u = e.calculated ? e : (vc(l) ? l(e, a) : Qh(e, l, i, n, o)) || e, !e.calculated) {
      for (h in u)
        e[h] = u[h];
      e.calculated = !0;
    }
    u = u[r];
  } else
    u = vc(l) ? l(e, a) : Wp(l) ? Qh(e, l, i, n, o) : parseFloat(l);
  return u > i ? u = i : u < n && (u = n), {
    max: u,
    min: u,
    unitFactor: t.unitFactor
  };
}, Ra = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, vu = function(t, e) {
  return e * qp * t / yu;
}, Jh = function(t, e, i) {
  return Math.abs((e - t) * yu / i / qp);
}, Kp = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Xp = function(t, e, i, n) {
  if (e.linkedProps) {
    var r = e.linkedProps.split(","), o = {}, a, l, u, h, f, d;
    for (a = 0; a < r.length; a++)
      l = r[a], u = e[l], u && (bo(u.velocity) ? h = u.velocity : (f = f || La(t), h = f && f.isTracking(l) ? f.get(l) : 0), d = Math.abs(h / Ra(u, "resistance", n)), o[l] = parseFloat(i(t, l)) + vu(h, d));
    return o;
  }
}, J_ = function(t, e, i, n, r, o) {
  if (i === void 0 && (i = 10), n === void 0 && (n = 0.2), r === void 0 && (r = 1), K_(t) && (t = Fp(t)[0]), !t)
    return 0;
  var a = 0, l = tr, u = e.inertia || e, h = Bp(t).get, f = Ra(u, "resistance", no.resistance), d, c, g, p, _, w, A, C, T, y;
  y = Xp(t, u, h, f);
  for (d in u)
    Kp[d] || (c = u[d], Bn(c) || (C = C || La(t), C && C.isTracking(d) ? c = bo(c) ? {
      velocity: c
    } : {
      velocity: C.get(d)
    } : (p = +c || 0, g = Math.abs(p / f))), Bn(c) && (bo(c.velocity) ? p = c.velocity : (C = C || La(t), p = C && C.isTracking(d) ? C.get(d) : 0), g = Vp(n, i, Math.abs(p / Ra(c, "resistance", f))), _ = parseFloat(h(t, d)) || 0, w = _ + vu(p, g), "end" in c && (c = Up(c, y && d in y ? y : w, c.max, c.min, d, u.radius, p), so === e && (so = u = Q_(e)), u[d] = Z_(c, u[d], "end")), "max" in c && w > +c.max + Zh ? (T = c.unitFactor || no.unitFactors[d] || 1, A = _ > c.max && c.min !== c.max || p * T > -15 && p * T < 45 ? n + (i - n) * 0.1 : Jh(_, c.max, p), A + r < l && (l = A + r)) : "min" in c && w < +c.min - Zh && (T = c.unitFactor || no.unitFactors[d] || 1, A = _ < c.min && c.min !== c.max || p * T > -45 && p * T < 15 ? n + (i - n) * 0.1 : Jh(_, c.min, p), A + r < l && (l = A + r)), A > a && (a = A)), g > a && (a = g));
  return a > l && (a = l), a > i ? i : a < n ? n : a;
}, tf = function() {
  Ee = Yp(), Ee && (jh = Ee.parseEase, Fp = Ee.utils.toArray, Np = Ee.utils.getUnit, Bp = Ee.core.getCache, Vp = Ee.utils.clamp, yc = Ee.core.getStyleSaver, Hp = Ee.core.reverting || function() {
  }, _c = jh("power3"), yu = _c(0.05), $p = Ee.core.PropTween, Ee.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), no = Ee.config(), Ee.registerPlugin(Mo), zp = 1);
}, Gp = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Ee = t, tf();
  },
  init: function(t, e, i, n, r) {
    zp || tf();
    var o = La(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = yc && typeof t.style == "object" && yc(t), this.target = t, this.tween = i, so = e;
    var a = t._gsap, l = a.get, u = e.duration, h = Bn(u), f = e.preventOvershoot || h && u.overshoot === 0, d = Ra(e, "resistance", no.resistance), c = bo(u) ? u : J_(t, e, h && u.max || 10, h && u.min || 0.2, h && "overshoot" in u ? +u.overshoot : f ? 0 : 1), g, p, _, w, A, C, T, y, P;
    e = so, so = 0, P = Xp(t, e, l, d);
    for (g in e)
      Kp[g] || (p = e[g], vc(p) && (p = p(n, t, r)), bo(p) ? A = p : Bn(p) && !isNaN(p.velocity) ? A = +p.velocity : o && o.isTracking(g) ? A = o.get(g) : console.warn("ERROR: No velocity was defined for " + t + " property: " + g), C = vu(A, c), y = 0, _ = l(t, g), w = Np(_), _ = parseFloat(_), Bn(p) && (T = _ + C, "end" in p && (p = Up(p, P && g in P ? P : T, p.max, p.min, g, e.radius, A)), "max" in p && +p.max < T ? f || p.preventOvershoot ? C = p.max - _ : y = p.max - _ - C : "min" in p && +p.min > T && (f || p.preventOvershoot ? C = p.min - _ : y = p.min - _ - C)), this._props.push(g), this.styles && this.styles.save(g), this._pt = new $p(this._pt, t, g, _, 0, G_, 0, a.set(t, g, this)), this._pt.u = w || 0, this._pt.c1 = C, this._pt.c2 = y);
    return i.duration(c), X_;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = _c(e.tween._time / e.tween._dur), t || !Hp())
      for (; i; )
        i.set(i.t, i.p, j_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Gp[s] = Mo[s];
});
Yp() && Ee.registerPlugin(Gp);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let Tr, Is, wc, ty = () => wc || ny.register(window.gsap), ef = typeof Intl < "u" ? new Intl.Segmenter() : 0, za = (s) => typeof s == "string" ? za(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], nf = (s) => za(s).filter((t) => t instanceof HTMLElement), bc = [], Ol = function() {
}, ey = /\s+/g, sf = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), rf = { left: 0, top: 0, width: 0, height: 0 }, of = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || bc), i = s.length, n, r, o, a;
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
}, af = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Ds = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), xc = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: n = "div", aria: r = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", l = i.indexOf("++") > -1, u = (h) => {
    let f = document.createElement(n), d = e.length + 1;
    return i && (f.className = i + (l ? " " + i + d : "")), o && f.style.setProperty("--" + s, d + ""), r !== "none" && f.setAttribute("aria-hidden", "true"), n !== "span" && (f.style.position = "relative", f.style.display = a), f.textContent = h, e.push(f), f;
  };
  return l && (i = i.replace("++", "")), u.collection = e, u;
}, iy = (s, t, e, i) => {
  let n = xc("line", e, i), r = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let l = n("");
    for (l.style.textAlign = r, s.insertBefore(l, t[o]); o < a; o++)
      l.appendChild(t[o]);
    l.normalize();
  };
}, jp = (s, t, e, i, n, r, o, a, l, u) => {
  var h;
  let f = Array.from(s.childNodes), d = 0, { wordDelimiter: c, reduceWhiteSpace: g = !0, prepareText: p } = t, _ = s.getBoundingClientRect(), w = _, A = !g && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, T = e.collection, y, P, O, S, k, R, V, z, B, J, it, q, H, tt, ot, b, j, nt;
  for (typeof c == "object" ? (O = c.delimiter || c, P = c.replaceWith || "") : P = c === "" ? "" : c || " ", y = P !== " "; d < f.length; d++)
    if (S = f[d], S.nodeType === 3) {
      for (ot = S.textContent || "", g ? ot = ot.replace(ey, " ") : A && (ot = ot.replace(/\n/g, P + `
`)), p && (ot = p(ot, s)), S.textContent = ot, k = P || O ? ot.split(O || P) : ot.match(a) || bc, j = k[k.length - 1], z = y ? j.slice(-1) === " " : !j, j || k.pop(), w = _, V = y ? k[0].charAt(0) === " " : !k[0], V && Ds(" ", s, S), k[0] || k.shift(), of(k, l), r && u || (S.textContent = ""), B = 1; B <= k.length; B++)
        if (b = k[B - 1], !g && A && b.charAt(0) === `
` && ((h = S.previousSibling) == null || h.remove(), Ds(document.createElement("br"), s, S), b = b.slice(1)), !g && b === "")
          Ds(P, s, S);
        else if (b === " ")
          s.insertBefore(document.createTextNode(" "), S);
        else {
          if (y && b.charAt(0) === " " && Ds(" ", s, S), C && B === 1 && !V && T.indexOf(C.parentNode) > -1 ? (R = T[T.length - 1], R.appendChild(document.createTextNode(i ? "" : b))) : (R = e(i ? "" : b), Ds(R, s, S), C && B === 1 && !V && R.insertBefore(C, R.firstChild)), i)
            for (it = ef ? of([...ef.segment(b)].map((U) => U.segment), l) : b.match(a) || bc, nt = 0; nt < it.length; nt++)
              R.appendChild(it[nt] === " " ? document.createTextNode(" ") : i(it[nt]));
          if (r && u) {
            if (ot = S.textContent = ot.substring(b.length + 1, ot.length), J = R.getBoundingClientRect(), J.top > w.top && J.left <= w.left) {
              for (q = s.cloneNode(), H = s.childNodes[0]; H && H !== R; )
                tt = H, H = H.nextSibling, q.appendChild(tt);
              s.parentNode.insertBefore(q, s), n && af(q);
            }
            w = J;
          }
          (B < k.length || z) && Ds(B >= k.length ? " " : y && b.slice(-1) === " " ? " " + P : P, s, S);
        }
      s.removeChild(S), C = 0;
    } else S.nodeType === 1 && (o && o.indexOf(S) > -1 ? (T.indexOf(S.previousSibling) > -1 && T[T.length - 1].appendChild(S), C = S) : (jp(S, t, e, i, n, r, o, a, l, !0), C = 0), n && af(S));
};
const Zp = class Qp {
  constructor(t, e) {
    this.isSplit = !1, ty(), this.elements = nf(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
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
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: n = !0, smartWrap: r, onSplit: o, autoSplit: a = !1, specialChars: l, mask: u } = this.vars, h = e.indexOf("lines") > -1, f = e.indexOf("chars") > -1, d = e.indexOf("words") > -1, c = f && !d && !h, g = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l), p = g ? new RegExp(g.source + "|" + sf.source, "gu") : sf, _ = !!t.ignore && nf(t.ignore), { orig: w, animTime: A, obs: C } = this._data, T;
    return (f || d || h) && (this.elements.forEach((y, P) => {
      w[P] = {
        element: y,
        html: y.innerHTML,
        ariaL: y.getAttribute("aria-label"),
        ariaH: y.getAttribute("aria-hidden")
      }, i === "auto" ? y.setAttribute("aria-label", (y.textContent || "").trim()) : i === "hidden" && y.setAttribute("aria-hidden", "true");
      let O = [], S = [], k = [], R = f ? xc("char", t, O) : null, V = xc("word", t, S), z, B, J, it;
      if (jp(y, t, V, R, c, n && (h || c), _, p, g, !1), h) {
        let q = za(y.childNodes), H = iy(y, q, t, k), tt, ot = [], b = 0, j = q.map((U) => U.nodeType === 1 ? U.getBoundingClientRect() : rf), nt = rf;
        for (z = 0; z < q.length; z++)
          tt = q[z], tt.nodeType === 1 && (tt.nodeName === "BR" ? (ot.push(tt), H(b, z + 1), b = z + 1, nt = j[b]) : (z && j[z].top > nt.top && j[z].left <= nt.left && (H(b, z), b = z), nt = j[z]));
        b < z && H(b, z), ot.forEach((U) => {
          var rt;
          return (rt = U.parentNode) == null ? void 0 : rt.removeChild(U);
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
      this.lines.push(...k), this.words.push(...S), this.chars.push(...O);
    }), u && this[u] && this.masks.push(...this[u].map((y) => {
      let P = y.cloneNode();
      return y.replaceWith(P), P.appendChild(y), y.className && (P.className = y.className.replace(/(\b\w+\b)/g, "$1-mask")), P.style.overflow = "clip", P;
    }))), this.isSplit = !0, Is && (a ? Is.addEventListener("loadingdone", this._split) : Is.status === "loading" && console.warn("SplitText called before fonts loaded")), (T = o && o(this)) && T.totalTime && (this._data.anim = A ? T.totalTime(A) : T), h && a && this.elements.forEach((y, P) => {
      w[P].width = y.offsetWidth, C && C.observe(y);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: n, obs: r } = this._data;
    return r && r.disconnect(), i.forEach(({ element: o, html: a, ariaL: l, ariaH: u }) => {
      o.innerHTML = a, l ? o.setAttribute("aria-label", l) : o.removeAttribute("aria-label"), u ? o.setAttribute("aria-hidden", u) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, Is == null || Is.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Qp(t, e);
  }
  static register(t) {
    Tr = Tr || t || window.gsap, Tr && (za = Tr.utils.toArray, Ol = Tr.core.context || Ol), !wc && window.innerWidth > 0 && (Is = document.fonts, wc = !0);
  }
};
Zp.version = "3.13.0";
let ny = Zp;
var $t = hi.registerPlugin(qd) || hi;
$t.core.Tween;
function sy(s, t) {
  s.indexOf(t) === -1 && s.push(t);
}
function Jp(s, t) {
  const e = s.indexOf(t);
  e > -1 && s.splice(e, 1);
}
const Wn = (s, t, e) => e > t ? t : e < s ? s : e;
function Tc(s, t) {
  return t ? `${s}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : s;
}
let Io = () => {
}, on = () => {
};
process.env.NODE_ENV !== "production" && (Io = (s, t, e) => {
  !s && typeof console < "u" && console.warn(Tc(t, e));
}, on = (s, t, e) => {
  if (!s)
    throw new Error(Tc(t, e));
});
const Tn = {}, tg = (s) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s);
function eg(s) {
  return typeof s == "object" && s !== null;
}
const ig = (s) => /^0[^.\s]+$/u.test(s);
// @__NO_SIDE_EFFECTS__
function wu(s) {
  let t;
  return () => (t === void 0 && (t = s()), t);
}
const Kn = /* @__NO_SIDE_EFFECTS__ */ (s) => s, ry = (s, t) => (e) => t(s(e)), bu = (...s) => s.reduce(ry), Ka = /* @__NO_SIDE_EFFECTS__ */ (s, t, e) => {
  const i = t - s;
  return i === 0 ? 1 : (e - s) / i;
};
class ng {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return sy(this.subscriptions, t), () => Jp(this.subscriptions, t);
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
const zi = /* @__NO_SIDE_EFFECTS__ */ (s) => s * 1e3, Wi = /* @__NO_SIDE_EFFECTS__ */ (s) => s / 1e3;
function xu(s, t) {
  return t ? s * (1e3 / t) : 0;
}
const lf = /* @__PURE__ */ new Set();
function Tu(s, t, e) {
  s || lf.has(t) || (console.warn(Tc(t, e)), lf.add(t));
}
const oy = (s, t, e) => {
  const i = t - s;
  return ((e - s) % i + i) % i + s;
}, sg = (s, t, e) => (((1 - 3 * e + 3 * t) * s + (3 * e - 6 * t)) * s + 3 * t) * s, ay = 1e-7, ly = 12;
function cy(s, t, e, i, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = sg(o, i, n) - s, r > 0 ? e = o : t = o;
  while (Math.abs(r) > ay && ++a < ly);
  return o;
}
function Do(s, t, e, i) {
  if (s === t && e === i)
    return Kn;
  const n = (r) => cy(r, 0, 1, s, e);
  return (r) => r === 0 || r === 1 ? r : sg(n(r), t, i);
}
const rg = (s) => (t) => t <= 0.5 ? s(2 * t) / 2 : (2 - s(2 * (1 - t))) / 2, og = (s) => (t) => 1 - s(1 - t), ag = /* @__PURE__ */ Do(0.33, 1.53, 0.69, 0.99), Su = /* @__PURE__ */ og(ag), lg = /* @__PURE__ */ rg(Su), cg = (s) => (s *= 2) < 1 ? 0.5 * Su(s) : 0.5 * (2 - Math.pow(2, -10 * (s - 1))), Eu = (s) => 1 - Math.sin(Math.acos(s)), uy = og(Eu), ug = rg(Eu), hy = /* @__PURE__ */ Do(0.42, 0, 1, 1), fy = /* @__PURE__ */ Do(0, 0, 0.58, 1), hg = /* @__PURE__ */ Do(0.42, 0, 0.58, 1), fg = (s) => Array.isArray(s) && typeof s[0] != "number";
function dg(s, t) {
  return fg(s) ? s[oy(0, s.length, t)] : s;
}
const pg = (s) => Array.isArray(s) && typeof s[0] == "number", cf = {
  linear: Kn,
  easeIn: hy,
  easeInOut: hg,
  easeOut: fy,
  circIn: Eu,
  circInOut: ug,
  circOut: uy,
  backIn: Su,
  backInOut: lg,
  backOut: ag,
  anticipate: cg
}, dy = (s) => typeof s == "string", Sc = (s) => {
  if (pg(s)) {
    on(s.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, i, n] = s;
    return Do(t, e, i, n);
  } else if (dy(s))
    return on(cf[s] !== void 0, `Invalid easing type '${s}'`, "invalid-easing-type"), cf[s];
  return s;
}, ia = [
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
function py(s, t) {
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
      n = !0, [e, i] = [i, e], e.forEach(l), e.clear(), n = !1, r && (r = !1, u.process(h));
    }
  };
  return u;
}
const gy = 40;
function gg(s, t) {
  let e = !1, i = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = ia.reduce((C, T) => (C[T] = py(r), C), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: h, update: f, preRender: d, render: c, postRender: g } = o, p = () => {
    const C = Tn.useManualTiming ? n.timestamp : performance.now();
    e = !1, Tn.useManualTiming || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(C - n.timestamp, gy), 1)), n.timestamp = C, n.isProcessing = !0, a.process(n), l.process(n), u.process(n), h.process(n), f.process(n), d.process(n), c.process(n), g.process(n), n.isProcessing = !1, e && t && (i = !1, s(p));
  }, _ = () => {
    e = !0, i = !0, n.isProcessing || s(p);
  };
  return { schedule: ia.reduce((C, T) => {
    const y = o[T];
    return C[T] = (P, O = !1, S = !1) => (e || _(), y.schedule(P, O, S)), C;
  }, {}), cancel: (C) => {
    for (let T = 0; T < ia.length; T++)
      o[ia[T]].cancel(C);
  }, state: n, steps: o };
}
const { schedule: ui, cancel: xs, state: xo } = /* @__PURE__ */ gg(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Kn, !0);
let _a;
function my() {
  _a = void 0;
}
const bi = {
  now: () => (_a === void 0 && bi.set(xo.isProcessing || Tn.useManualTiming ? xo.timestamp : performance.now()), _a),
  set: (s) => {
    _a = s, queueMicrotask(my);
  }
}, mg = (s) => (t) => typeof t == "string" && t.startsWith(s), _g = /* @__PURE__ */ mg("--"), _y = /* @__PURE__ */ mg("var(--"), Au = (s) => _y(s) ? yy.test(s.split("/*")[0].trim()) : !1, yy = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, dr = {
  test: (s) => typeof s == "number",
  parse: parseFloat,
  transform: (s) => s
}, To = {
  ...dr,
  transform: (s) => Wn(0, 1, s)
}, na = {
  ...dr,
  default: 1
}, ro = (s) => Math.round(s * 1e5) / 1e5, Cu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function vy(s) {
  return s == null;
}
const wy = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ou = (s, t) => (e) => !!(typeof e == "string" && wy.test(e) && e.startsWith(s) || t && !vy(e) && Object.prototype.hasOwnProperty.call(e, t)), yg = (s, t, e) => (i) => {
  if (typeof i != "string")
    return i;
  const [n, r, o, a] = i.match(Cu);
  return {
    [s]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, by = (s) => Wn(0, 255, s), Pl = {
  ...dr,
  transform: (s) => Math.round(by(s))
}, ss = {
  test: /* @__PURE__ */ Ou("rgb", "red"),
  parse: /* @__PURE__ */ yg("red", "green", "blue"),
  transform: ({ red: s, green: t, blue: e, alpha: i = 1 }) => "rgba(" + Pl.transform(s) + ", " + Pl.transform(t) + ", " + Pl.transform(e) + ", " + ro(To.transform(i)) + ")"
};
function xy(s) {
  let t = "", e = "", i = "", n = "";
  return s.length > 5 ? (t = s.substring(1, 3), e = s.substring(3, 5), i = s.substring(5, 7), n = s.substring(7, 9)) : (t = s.substring(1, 2), e = s.substring(2, 3), i = s.substring(3, 4), n = s.substring(4, 5), t += t, e += e, i += i, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(i, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const Ec = {
  test: /* @__PURE__ */ Ou("#"),
  parse: xy,
  transform: ss.transform
}, Lo = /* @__NO_SIDE_EFFECTS__ */ (s) => ({
  test: (t) => typeof t == "string" && t.endsWith(s) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${s}`
}), Cn = /* @__PURE__ */ Lo("deg"), er = /* @__PURE__ */ Lo("%"), ft = /* @__PURE__ */ Lo("px"), Ty = /* @__PURE__ */ Lo("vh"), Sy = /* @__PURE__ */ Lo("vw"), uf = {
  ...er,
  parse: (s) => er.parse(s) / 100,
  transform: (s) => er.transform(s * 100)
}, Vs = {
  test: /* @__PURE__ */ Ou("hsl", "hue"),
  parse: /* @__PURE__ */ yg("hue", "saturation", "lightness"),
  transform: ({ hue: s, saturation: t, lightness: e, alpha: i = 1 }) => "hsla(" + Math.round(s) + ", " + er.transform(ro(t)) + ", " + er.transform(ro(e)) + ", " + ro(To.transform(i)) + ")"
}, me = {
  test: (s) => ss.test(s) || Ec.test(s) || Vs.test(s),
  parse: (s) => ss.test(s) ? ss.parse(s) : Vs.test(s) ? Vs.parse(s) : Ec.parse(s),
  transform: (s) => typeof s == "string" ? s : s.hasOwnProperty("red") ? ss.transform(s) : Vs.transform(s),
  getAnimatableNone: (s) => {
    const t = me.parse(s);
    return t.alpha = 0, me.transform(t);
  }
}, Ey = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ay(s) {
  var t, e;
  return isNaN(s) && typeof s == "string" && (((t = s.match(Cu)) == null ? void 0 : t.length) || 0) + (((e = s.match(Ey)) == null ? void 0 : e.length) || 0) > 0;
}
const vg = "number", wg = "color", Cy = "var", Oy = "var(", hf = "${}", Py = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function So(s) {
  const t = s.toString(), e = [], i = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(Py, (l) => (me.test(l) ? (i.color.push(r), n.push(wg), e.push(me.parse(l))) : l.startsWith(Oy) ? (i.var.push(r), n.push(Cy), e.push(l)) : (i.number.push(r), n.push(vg), e.push(parseFloat(l))), ++r, hf)).split(hf);
  return { values: e, split: a, indexes: i, types: n };
}
function bg(s) {
  return So(s).values;
}
function xg(s) {
  const { split: t, types: e } = So(s), i = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === vg ? r += ro(n[o]) : a === wg ? r += me.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const ky = (s) => typeof s == "number" ? 0 : me.test(s) ? me.getAnimatableNone(s) : s;
function My(s) {
  const t = bg(s);
  return xg(s)(t.map(ky));
}
const pr = {
  test: Ay,
  parse: bg,
  createTransformer: xg,
  getAnimatableNone: My
};
function kl(s, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? s + (t - s) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? s + (t - s) * (2 / 3 - e) * 6 : s;
}
function Iy({ hue: s, saturation: t, lightness: e, alpha: i }) {
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
const Ro = (s, t, e) => s + (t - s) * e, Ml = (s, t, e) => {
  const i = s * s, n = e * (t * t - i) + i;
  return n < 0 ? 0 : Math.sqrt(n);
}, Dy = [Ec, ss, Vs], Ly = (s) => Dy.find((t) => t.test(s));
function ff(s) {
  const t = Ly(s);
  if (Io(!!t, `'${s}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(s);
  return t === Vs && (e = Iy(e)), e;
}
const df = (s, t) => {
  const e = ff(s), i = ff(t);
  if (!e || !i)
    return Fa(s, t);
  const n = { ...e };
  return (r) => (n.red = Ml(e.red, i.red, r), n.green = Ml(e.green, i.green, r), n.blue = Ml(e.blue, i.blue, r), n.alpha = Ro(e.alpha, i.alpha, r), ss.transform(n));
}, Ac = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ry(s, t) {
  return Ac.has(s) ? (e) => e <= 0 ? s : t : (e) => e >= 1 ? t : s;
}
function zy(s, t) {
  return (e) => Ro(s, t, e);
}
function Pu(s) {
  return typeof s == "number" ? zy : typeof s == "string" ? Au(s) ? Fa : me.test(s) ? df : $y : Array.isArray(s) ? Tg : typeof s == "object" ? me.test(s) ? df : Fy : Fa;
}
function Tg(s, t) {
  const e = [...s], i = e.length, n = s.map((r, o) => Pu(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      e[o] = n[o](r);
    return e;
  };
}
function Fy(s, t) {
  const e = { ...s, ...t }, i = {};
  for (const n in e)
    s[n] !== void 0 && t[n] !== void 0 && (i[n] = Pu(s[n])(s[n], t[n]));
  return (n) => {
    for (const r in i)
      e[r] = i[r](n);
    return e;
  };
}
function Ny(s, t) {
  const e = [], i = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = s.indexes[r][i[r]], a = s.values[o] ?? 0;
    e[n] = a, i[r]++;
  }
  return e;
}
const $y = (s, t) => {
  const e = pr.createTransformer(t), i = So(s), n = So(t);
  return i.indexes.var.length === n.indexes.var.length && i.indexes.color.length === n.indexes.color.length && i.indexes.number.length >= n.indexes.number.length ? Ac.has(s) && !n.values.length || Ac.has(t) && !i.values.length ? Ry(s, t) : bu(Tg(Ny(i, n), n.values), e) : (Io(!0, `Complex values '${s}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Fa(s, t));
};
function Sg(s, t, e) {
  return typeof s == "number" && typeof t == "number" && typeof e == "number" ? Ro(s, t, e) : Pu(s)(s, t);
}
const By = (s) => {
  const t = ({ timestamp: e }) => s(e);
  return {
    start: (e = !0) => ui.update(t, e),
    stop: () => xs(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => xo.isProcessing ? xo.timestamp : bi.now()
  };
}, Eg = (s, t, e = 10) => {
  let i = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    i += Math.round(s(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Na = 2e4;
function ku(s) {
  let t = 0;
  const e = 50;
  let i = s.next(t);
  for (; !i.done && t < Na; )
    t += e, i = s.next(t);
  return t >= Na ? 1 / 0 : t;
}
function Ag(s, t = 100, e) {
  const i = e({ ...s, keyframes: [0, t] }), n = Math.min(ku(i), Na);
  return {
    type: "keyframes",
    ease: (r) => i.next(n * r).value / t,
    duration: /* @__PURE__ */ Wi(n)
  };
}
const Vy = 5;
function Cg(s, t, e) {
  const i = Math.max(t - Vy, 0);
  return xu(e - s(i), t - i);
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
}, pf = 1e-3;
function Hy({ duration: s = Jt.duration, bounce: t = Jt.bounce, velocity: e = Jt.velocity, mass: i = Jt.mass }) {
  let n, r;
  Io(s <= /* @__PURE__ */ zi(Jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = Wn(Jt.minDamping, Jt.maxDamping, o), s = Wn(Jt.minDuration, Jt.maxDuration, /* @__PURE__ */ Wi(s)), o < 1 ? (n = (u) => {
    const h = u * o, f = h * s, d = h - e, c = Cc(u, o), g = Math.exp(-f);
    return pf - d / c * g;
  }, r = (u) => {
    const f = u * o * s, d = f * e + e, c = Math.pow(o, 2) * Math.pow(u, 2) * s, g = Math.exp(-f), p = Cc(Math.pow(u, 2), o);
    return (-n(u) + pf > 0 ? -1 : 1) * ((d - c) * g) / p;
  }) : (n = (u) => {
    const h = Math.exp(-u * s), f = (u - e) * s + 1;
    return -1e-3 + h * f;
  }, r = (u) => {
    const h = Math.exp(-u * s), f = (e - u) * (s * s);
    return h * f;
  });
  const a = 5 / s, l = Wy(n, r, a);
  if (s = /* @__PURE__ */ zi(s), isNaN(l))
    return {
      stiffness: Jt.stiffness,
      damping: Jt.damping,
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
const Yy = 12;
function Wy(s, t, e) {
  let i = e;
  for (let n = 1; n < Yy; n++)
    i = i - s(i) / t(i);
  return i;
}
function Cc(s, t) {
  return s * Math.sqrt(1 - t * t);
}
const qy = ["duration", "bounce"], Uy = ["stiffness", "damping", "mass"];
function gf(s, t) {
  return t.some((e) => s[e] !== void 0);
}
function Ky(s) {
  let t = {
    velocity: Jt.velocity,
    stiffness: Jt.stiffness,
    damping: Jt.damping,
    mass: Jt.mass,
    isResolvedFromDuration: !1,
    ...s
  };
  if (!gf(s, Uy) && gf(s, qy))
    if (s.visualDuration) {
      const e = s.visualDuration, i = 2 * Math.PI / (e * 1.2), n = i * i, r = 2 * Wn(0.05, 1, 1 - (s.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Jt.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = Hy(s);
      t = {
        ...t,
        ...e,
        mass: Jt.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function Eo(s = Jt.visualDuration, t = Jt.bounce) {
  const e = typeof s != "object" ? {
    visualDuration: s,
    keyframes: [0, 1],
    bounce: t
  } : s;
  let { restSpeed: i, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: h, duration: f, velocity: d, isResolvedFromDuration: c } = Ky({
    ...e,
    velocity: -/* @__PURE__ */ Wi(e.velocity || 0)
  }), g = d || 0, p = u / (2 * Math.sqrt(l * h)), _ = o - r, w = /* @__PURE__ */ Wi(Math.sqrt(l / h)), A = Math.abs(_) < 5;
  i || (i = A ? Jt.restSpeed.granular : Jt.restSpeed.default), n || (n = A ? Jt.restDelta.granular : Jt.restDelta.default);
  let C;
  if (p < 1) {
    const y = Cc(w, p);
    C = (P) => {
      const O = Math.exp(-p * w * P);
      return o - O * ((g + p * w * _) / y * Math.sin(y * P) + _ * Math.cos(y * P));
    };
  } else if (p === 1)
    C = (y) => o - Math.exp(-w * y) * (_ + (g + w * _) * y);
  else {
    const y = w * Math.sqrt(p * p - 1);
    C = (P) => {
      const O = Math.exp(-p * w * P), S = Math.min(y * P, 300);
      return o - O * ((g + p * w * _) * Math.sinh(S) + y * _ * Math.cosh(S)) / y;
    };
  }
  const T = {
    calculatedDuration: c && f || null,
    next: (y) => {
      const P = C(y);
      if (c)
        a.done = y >= f;
      else {
        let O = y === 0 ? g : 0;
        p < 1 && (O = y === 0 ? /* @__PURE__ */ zi(g) : Cg(C, y, P));
        const S = Math.abs(O) <= i, k = Math.abs(o - P) <= n;
        a.done = S && k;
      }
      return a.value = a.done ? o : P, a;
    },
    toString: () => {
      const y = Math.min(ku(T), Na), P = Eg((O) => T.next(y * O).value, y, 30);
      return y + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return T;
}
Eo.applyToOptions = (s) => {
  const t = Ag(s, 100, Eo);
  return s.ease = t.ease, s.duration = /* @__PURE__ */ zi(t.duration), s.type = "keyframes", s;
};
function Oc({ keyframes: s, velocity: t = 0, power: e = 0.8, timeConstant: i = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: h }) {
  const f = s[0], d = {
    done: !1,
    value: f
  }, c = (S) => a !== void 0 && S < a || l !== void 0 && S > l, g = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let p = e * t;
  const _ = f + p, w = o === void 0 ? _ : o(_);
  w !== _ && (p = w - f);
  const A = (S) => -p * Math.exp(-S / i), C = (S) => w + A(S), T = (S) => {
    const k = A(S), R = C(S);
    d.done = Math.abs(k) <= u, d.value = d.done ? w : R;
  };
  let y, P;
  const O = (S) => {
    c(d.value) && (y = S, P = Eo({
      keyframes: [d.value, g(d.value)],
      velocity: Cg(C, S, d.value),
      // TODO: This should be passing * 1000
      damping: n,
      stiffness: r,
      restDelta: u,
      restSpeed: h
    }));
  };
  return O(0), {
    calculatedDuration: null,
    next: (S) => {
      let k = !1;
      return !P && y === void 0 && (k = !0, T(S), O(S)), y !== void 0 && S >= y ? P.next(S - y) : (!k && T(S), d);
    }
  };
}
function Xy(s, t, e) {
  const i = [], n = e || Tn.mix || Sg, r = s.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(s[o], s[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Kn : t;
      a = bu(l, a);
    }
    i.push(a);
  }
  return i;
}
function Og(s, t, { clamp: e = !0, ease: i, mixer: n } = {}) {
  const r = s.length;
  if (on(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = s[0] === s[1];
  s[0] > s[r - 1] && (s = [...s].reverse(), t = [...t].reverse());
  const a = Xy(t, i, n), l = a.length, u = (h) => {
    if (o && h < s[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < s.length - 2 && !(h < s[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ Ka(s[f], s[f + 1], h);
    return a[f](d);
  };
  return e ? (h) => u(Wn(s[0], s[r - 1], h)) : u;
}
function Pg(s, t) {
  const e = s[s.length - 1];
  for (let i = 1; i <= t; i++) {
    const n = /* @__PURE__ */ Ka(0, t, i);
    s.push(Ro(e, 1, n));
  }
}
function Mu(s) {
  const t = [0];
  return Pg(t, s.length - 1), t;
}
function Gy(s, t) {
  return s.map((e) => e * t);
}
function jy(s, t) {
  return s.map(() => t || hg).splice(0, s.length - 1);
}
function Hs({ duration: s = 300, keyframes: t, times: e, ease: i = "easeInOut" }) {
  const n = fg(i) ? i.map(Sc) : Sc(i), r = {
    done: !1,
    value: t[0]
  }, o = Gy(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : Mu(t),
    s
  ), a = Og(o, t, {
    ease: Array.isArray(n) ? n : jy(t, n)
  });
  return {
    calculatedDuration: s,
    next: (l) => (r.value = a(l), r.done = l >= s, r)
  };
}
const Zy = (s) => s !== null;
function Iu(s, { repeat: t, repeatType: e = "loop" }, i, n = 1) {
  const r = s.filter(Zy), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Qy = {
  decay: Oc,
  inertia: Oc,
  tween: Hs,
  keyframes: Hs,
  spring: Eo
};
function kg(s) {
  typeof s.type == "string" && (s.type = Qy[s.type]);
}
class Du {
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
const Jy = (s) => s / 100;
class Lu extends Du {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== bi.now() && this.tick(bi.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (i = this.options).onStop) == null || n.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    kg(t);
    const { type: e = Hs, repeat: i = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = e || Hs;
    process.env.NODE_ENV !== "production" && l !== Hs && on(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== Hs && typeof a[0] != "number" && (this.mixKeyframes = bu(Jy, Sg(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = ku(u));
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
    const { delay: u = 0, keyframes: h, repeat: f, repeatType: d, repeatDelay: c, type: g, onUpdate: p, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const w = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? w < 0 : w > n;
    this.currentTime = Math.max(w, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let C = this.currentTime, T = i;
    if (f) {
      const S = Math.min(this.currentTime, n) / a;
      let k = Math.floor(S), R = S % 1;
      !R && S >= 1 && (R = 1), R === 1 && k--, k = Math.min(k, f + 1), !!(k % 2) && (d === "reverse" ? (R = 1 - R, c && (R -= c / a)) : d === "mirror" && (T = o)), C = Wn(0, 1, R) * a;
    }
    const y = A ? { done: !1, value: h[0] } : T.next(C);
    r && (y.value = r(y.value));
    let { done: P } = y;
    !A && l !== null && (P = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const O = this.holdTime === null && (this.state === "finished" || this.state === "running" && P);
    return O && g !== Oc && (y.value = Iu(h, this.options, _, this.speed)), p && p(y.value), O && this.finish(), y;
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
    t = /* @__PURE__ */ zi(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(bi.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ Wi(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = By, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = e ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(bi.now()), this.holdTime = this.currentTime;
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
function tv(s) {
  for (let t = 1; t < s.length; t++)
    s[t] ?? (s[t] = s[t - 1]);
}
const rs = (s) => s * 180 / Math.PI, Pc = (s) => {
  const t = rs(Math.atan2(s[1], s[0]));
  return kc(t);
}, ev = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (s) => (Math.abs(s[0]) + Math.abs(s[3])) / 2,
  rotate: Pc,
  rotateZ: Pc,
  skewX: (s) => rs(Math.atan(s[1])),
  skewY: (s) => rs(Math.atan(s[2])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[2])) / 2
}, kc = (s) => (s = s % 360, s < 0 && (s += 360), s), mf = Pc, _f = (s) => Math.sqrt(s[0] * s[0] + s[1] * s[1]), yf = (s) => Math.sqrt(s[4] * s[4] + s[5] * s[5]), iv = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: _f,
  scaleY: yf,
  scale: (s) => (_f(s) + yf(s)) / 2,
  rotateX: (s) => kc(rs(Math.atan2(s[6], s[5]))),
  rotateY: (s) => kc(rs(Math.atan2(-s[2], s[0]))),
  rotateZ: mf,
  rotate: mf,
  skewX: (s) => rs(Math.atan(s[4])),
  skewY: (s) => rs(Math.atan(s[1])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[4])) / 2
};
function Mc(s) {
  return s.includes("scale") ? 1 : 0;
}
function Ic(s, t) {
  if (!s || s === "none")
    return Mc(t);
  const e = s.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, n;
  if (e)
    i = iv, n = e;
  else {
    const a = s.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = ev, n = a;
  }
  if (!n)
    return Mc(t);
  const r = i[t], o = n[1].split(",").map(sv);
  return typeof r == "function" ? r(o) : o[r];
}
const nv = (s, t) => {
  const { transform: e = "none" } = getComputedStyle(s);
  return Ic(e, t);
};
function sv(s) {
  return parseFloat(s.trim());
}
const gr = [
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
], mr = new Set(gr), vf = (s) => s === dr || s === ft, rv = /* @__PURE__ */ new Set(["x", "y", "z"]), ov = gr.filter((s) => !rv.has(s));
function av(s) {
  const t = [];
  return ov.forEach((e) => {
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
  x: (s, { transform: t }) => Ic(t, "x"),
  y: (s, { transform: t }) => Ic(t, "y")
};
gs.translateX = gs.x;
gs.translateY = gs.y;
const ms = /* @__PURE__ */ new Set();
let Dc = !1, Lc = !1, Rc = !1;
function Mg() {
  if (Lc) {
    const s = Array.from(ms).filter((i) => i.needsMeasurement), t = new Set(s.map((i) => i.element)), e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const n = av(i);
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
  Lc = !1, Dc = !1, ms.forEach((s) => s.complete(Rc)), ms.clear();
}
function Ig() {
  ms.forEach((s) => {
    s.readKeyframes(), s.needsMeasurement && (Lc = !0);
  });
}
function lv() {
  Rc = !0, Ig(), Mg(), Rc = !1;
}
class Ru {
  constructor(t, e, i, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = i, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ms.add(this), Dc || (Dc = !0, ui.read(Ig), ui.resolveKeyframes(Mg))) : (this.readKeyframes(), this.complete());
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
    tv(t);
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
const cv = (s) => s.startsWith("--");
function uv(s, t, e) {
  cv(t) ? s.style.setProperty(t, e) : s.style[t] = e;
}
const Dg = /* @__PURE__ */ wu(() => window.ScrollTimeline !== void 0), hv = {};
function fv(s, t) {
  const e = /* @__PURE__ */ wu(s);
  return () => hv[t] ?? e();
}
const Lg = /* @__PURE__ */ fv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), $r = ([s, t, e, i]) => `cubic-bezier(${s}, ${t}, ${e}, ${i})`, wf = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ $r([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ $r([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ $r([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ $r([0.33, 1.53, 0.69, 0.99])
};
function Rg(s, t) {
  if (s)
    return typeof s == "function" ? Lg() ? Eg(s, t) : "ease-out" : pg(s) ? $r(s) : Array.isArray(s) ? s.map((e) => Rg(e, t) || wf.easeOut) : wf[s];
}
function dv(s, t, e, { delay: i = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const h = {
    [t]: e
  };
  l && (h.offset = l);
  const f = Rg(a, n);
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
function zu(s) {
  return typeof s == "function" && "applyToOptions" in s;
}
function pv({ type: s, ...t }) {
  return zu(s) && Lg() ? s.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class gv extends Du {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: i, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, on(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = pv(t);
    this.animation = dv(e, i, n, u, r), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const h = Iu(n, this.options, a, this.speed);
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
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ zi(t);
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
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Dg() ? (this.animation.timeline = t, Kn) : e(this);
  }
}
const zg = {
  anticipate: cg,
  backInOut: lg,
  circInOut: ug
};
function mv(s) {
  return s in zg;
}
function _v(s) {
  typeof s.ease == "string" && mv(s.ease) && (s.ease = zg[s.ease]);
}
const bf = 10;
class yv extends gv {
  constructor(t) {
    _v(t), kg(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const a = new Lu({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ zi(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(l - bf).value, a.sample(l).value, bf), a.stop();
  }
}
const xf = (s, t) => t === "zIndex" ? !1 : !!(typeof s == "number" || Array.isArray(s) || typeof s == "string" && // It's animatable if we have a string
(pr.test(s) || s === "0") && // And it contains numbers and/or colors
!s.startsWith("url("));
function vv(s) {
  const t = s[0];
  if (s.length === 1)
    return !0;
  for (let e = 0; e < s.length; e++)
    if (s[e] !== t)
      return !0;
}
function wv(s, t, e, i) {
  const n = s[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = s[s.length - 1], o = xf(n, t), a = xf(r, t);
  return Io(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : vv(s) || (e === "spring" || zu(e)) && i;
}
function zc(s) {
  s.duration = 0, s.type = "keyframes";
}
const bv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), xv = /* @__PURE__ */ wu(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Tv(s) {
  var h;
  const { motionValue: t, name: e, repeatDelay: i, repeatType: n, damping: r, type: o } = s;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return xv() && e && bv.has(e) && (e !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && n !== "mirror" && r !== 0 && o !== "inertia";
}
const Sv = 40;
class Ev extends Du {
  constructor({ autoplay: t = !0, delay: e = 0, type: i = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: h, ...f }) {
    var g;
    super(), this.stop = () => {
      var p, _;
      this._animation && (this._animation.stop(), (p = this.stopTimeline) == null || p.call(this)), (_ = this.keyframeResolver) == null || _.cancel();
    }, this.createdAt = bi.now();
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
    }, c = (h == null ? void 0 : h.KeyframeResolver) || Ru;
    this.keyframeResolver = new c(a, (p, _, w) => this.onKeyframesResolved(p, _, d, !w), l, u, h), (g = this.keyframeResolver) == null || g.scheduleResolve();
  }
  onKeyframesResolved(t, e, i, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: h } = i;
    this.resolvedAt = bi.now(), wv(t, r, o, a) || ((Tn.instantAnimations || !l) && (h == null || h(Iu(t, i, e))), t[0] = t[t.length - 1], zc(i), i.repeat = 0);
    const d = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > Sv ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...i,
      keyframes: t
    }, c = !u && Tv(d) ? new yv({
      ...d,
      element: d.motionValue.owner.current
    }) : new Lu(d);
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), lv()), this._animation;
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
class Av {
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
class Cv extends Av {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Ov = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Pv(s) {
  const t = Ov.exec(s);
  if (!t)
    return [,];
  const [, e, i, n] = t;
  return [`--${e ?? i}`, n];
}
const kv = 4;
function Fg(s, t, e = 1) {
  on(e <= kv, `Max CSS variable fallback depth detected in property "${s}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, n] = Pv(s);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return tg(o) ? parseFloat(o) : o;
  }
  return Au(n) ? Fg(n, t, e + 1) : n;
}
function Ng(s, t) {
  return (s == null ? void 0 : s[t]) ?? (s == null ? void 0 : s.default) ?? s;
}
const $g = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...gr
]), Mv = {
  test: (s) => s === "auto",
  parse: (s) => s
}, Bg = (s) => (t) => t.test(s), Vg = [dr, ft, er, Cn, Sy, Ty, Mv], Sf = (s) => Vg.find(Bg(s));
function Iv(s) {
  return typeof s == "number" ? s === 0 : s !== null ? s === "none" || s === "0" || ig(s) : !0;
}
const Dv = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Lv(s) {
  const [t, e] = s.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return s;
  const [i] = e.match(Cu) || [];
  if (!i)
    return s;
  const n = e.replace(i, "");
  let r = Dv.has(t) ? 1 : 0;
  return i !== e && (r *= 100), t + "(" + r + n + ")";
}
const Rv = /\b([a-z-]*)\(.*?\)/gu, Fc = {
  ...pr,
  getAnimatableNone: (s) => {
    const t = s.match(Rv);
    return t ? t.map(Lv).join(" ") : s;
  }
}, Ef = {
  ...dr,
  transform: Math.round
}, zv = {
  rotate: Cn,
  rotateX: Cn,
  rotateY: Cn,
  rotateZ: Cn,
  scale: na,
  scaleX: na,
  scaleY: na,
  scaleZ: na,
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
  opacity: To,
  originX: uf,
  originY: uf,
  originZ: ft
}, Fu = {
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
  ...zv,
  zIndex: Ef,
  // SVG
  fillOpacity: To,
  strokeOpacity: To,
  numOctaves: Ef
}, Fv = {
  ...Fu,
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
  filter: Fc,
  WebkitFilter: Fc
}, Hg = (s) => Fv[s];
function Yg(s, t) {
  let e = Hg(s);
  return e !== Fc && (e = pr), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const Nv = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $v(s, t, e) {
  let i = 0, n;
  for (; i < s.length && !n; ) {
    const r = s[i];
    typeof r == "string" && !Nv.has(r) && So(r).values.length && (n = s[i]), i++;
  }
  if (n && e)
    for (const r of t)
      s[r] = Yg(e, n);
}
class Bv extends Ru {
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
      if (typeof u == "string" && (u = u.trim(), Au(u))) {
        const h = Fg(u, e.current);
        h !== void 0 && (t[l] = h), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !$g.has(i) || t.length !== 2)
      return;
    const [n, r] = t, o = Sf(n), a = Sf(r);
    if (o !== a)
      if (vf(o) && vf(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else gs[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, i = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || Iv(t[n])) && i.push(n);
    i.length && $v(t, i, e);
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
const qg = (s, t) => t && typeof s == "number" ? t.transform(s) : s;
function Vv(s) {
  return eg(s) && "offsetHeight" in s;
}
const Af = 30, Hv = (s) => !isNaN(parseFloat(s));
class Yv {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const n = bi.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = bi.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Hv(this.current));
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
    this.events[t] || (this.events[t] = new ng());
    const i = this.events[t].add(e);
    return t === "change" ? () => {
      i(), ui.read(() => {
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
    const t = bi.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Af)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, Af);
    return xu(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function Ao(s, t) {
  return new Yv(s, t);
}
const { schedule: Wv } = /* @__PURE__ */ gg(queueMicrotask, !1);
function Nu(s) {
  return eg(s) && "ownerSVGElement" in s;
}
const ya = /* @__PURE__ */ new WeakMap();
let On;
const Ug = (s, t, e) => (i, n) => n && n[0] ? n[0][s + "Size"] : Nu(i) && "getBBox" in i ? i.getBBox()[t] : i[e], qv = /* @__PURE__ */ Ug("inline", "width", "offsetWidth"), Uv = /* @__PURE__ */ Ug("block", "height", "offsetHeight");
function Kv({ target: s, borderBoxSize: t }) {
  var e;
  (e = ya.get(s)) == null || e.forEach((i) => {
    i(s, {
      get width() {
        return qv(s, t);
      },
      get height() {
        return Uv(s, t);
      }
    });
  });
}
function Xv(s) {
  s.forEach(Kv);
}
function Gv() {
  typeof ResizeObserver > "u" || (On = new ResizeObserver(Xv));
}
function jv(s, t) {
  On || Gv();
  const e = Wg(s);
  return e.forEach((i) => {
    let n = ya.get(i);
    n || (n = /* @__PURE__ */ new Set(), ya.set(i, n)), n.add(t), On == null || On.observe(i);
  }), () => {
    e.forEach((i) => {
      const n = ya.get(i);
      n == null || n.delete(t), n != null && n.size || On == null || On.unobserve(i);
    });
  };
}
const va = /* @__PURE__ */ new Set();
let Ys;
function Zv() {
  Ys = () => {
    const s = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    va.forEach((t) => t(s));
  }, window.addEventListener("resize", Ys);
}
function Qv(s) {
  return va.add(s), Ys || Zv(), () => {
    va.delete(s), !va.size && typeof Ys == "function" && (window.removeEventListener("resize", Ys), Ys = void 0);
  };
}
function Jv(s, t) {
  return typeof s == "function" ? Qv(s) : jv(s, t);
}
function Kg(s, t) {
  let e;
  const i = () => {
    const { currentTime: n } = t, o = (n === null ? 0 : n.value) / 100;
    e !== o && s(o), e = o;
  };
  return ui.preUpdate(i, !0), () => xs(i);
}
function tw(s) {
  return Nu(s) && s.tagName === "svg";
}
function ew(s, t) {
  if (s === "first")
    return 0;
  {
    const e = t - 1;
    return s === "last" ? e : e / 2;
  }
}
function hr(s = 0.1, { startDelay: t = 0, from: e = 0, ease: i } = {}) {
  return (n, r) => {
    const o = typeof e == "number" ? e : ew(e, r), a = Math.abs(o - n);
    let l = s * a;
    if (i) {
      const u = r * s;
      l = Sc(i)(l / u) * u;
    }
    return t + l;
  };
}
const ni = (s) => !!(s && s.getVelocity), iw = [...Vg, me, pr], nw = (s) => iw.find(Bg(s));
function $u(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function Xg(s, t, e, i) {
  return typeof s == "string" && $u(t) ? Wg(s, e, i) : s instanceof NodeList ? Array.from(s) : Array.isArray(s) ? s : [s];
}
function sw(s, t, e) {
  return s * (t + 1);
}
function Cf(s, t, e, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, s + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : i.get(t) ?? s;
}
function rw(s, t, e) {
  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    n.at > t && n.at < e && (Jp(s, n), i--);
  }
}
function ow(s, t, e, i, n, r) {
  rw(s, n, r);
  for (let o = 0; o < t.length; o++)
    s.push({
      value: t[o],
      at: Ro(n, r, i[o]),
      easing: dg(e, o)
    });
}
function aw(s, t) {
  for (let e = 0; e < s.length; e++)
    s[e] = s[e] / (t + 1);
}
function lw(s, t) {
  return s.at === t.at ? s.value === null ? 1 : t.value === null ? -1 : 0 : s.at - t.at;
}
const cw = "easeInOut", uw = 20;
function hw(s, { defaultTransition: t = {}, ...e } = {}, i, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let h = 0, f = 0, d = 0;
  for (let c = 0; c < s.length; c++) {
    const g = s[c];
    if (typeof g == "string") {
      u.set(g, f);
      continue;
    } else if (!Array.isArray(g)) {
      u.set(g.name, Cf(f, g.at, h, u));
      continue;
    }
    let [p, _, w = {}] = g;
    w.at !== void 0 && (f = Cf(f, w.at, h, u));
    let A = 0;
    const C = (T, y, P, O = 0, S = 0) => {
      const k = fw(T), { delay: R = 0, times: V = Mu(k), type: z = "keyframes", repeat: B, repeatType: J, repeatDelay: it = 0, ...q } = y;
      let { ease: H = t.ease || "easeOut", duration: tt } = y;
      const ot = typeof R == "function" ? R(O, S) : R, b = k.length, j = zu(z) ? z : n == null ? void 0 : n[z || "keyframes"];
      if (b <= 2 && j) {
        let Dt = 100;
        if (b === 2 && gw(k)) {
          const ct = k[1] - k[0];
          Dt = Math.abs(ct);
        }
        const _t = { ...q };
        tt !== void 0 && (_t.duration = /* @__PURE__ */ zi(tt));
        const Ct = Ag(_t, Dt, j);
        H = Ct.ease, tt = Ct.duration;
      }
      tt ?? (tt = r);
      const nt = f + ot;
      V.length === 1 && V[0] === 0 && (V[1] = 1);
      const U = V.length - k.length;
      if (U > 0 && Pg(V, U), k.length === 1 && k.unshift(null), B) {
        on(B < uw, "Repeat count too high, must be less than 20", "repeat-count-high"), tt = sw(tt, B);
        const Dt = [...k], _t = [...V];
        H = Array.isArray(H) ? [...H] : [H];
        const Ct = [...H];
        for (let ct = 0; ct < B; ct++) {
          k.push(...Dt);
          for (let Rt = 0; Rt < Dt.length; Rt++)
            V.push(_t[Rt] + (ct + 1)), H.push(Rt === 0 ? "linear" : dg(Ct, Rt - 1));
        }
        aw(V, B);
      }
      const rt = nt + tt;
      ow(P, k, H, V, nt, rt), A = Math.max(ot + tt, A), d = Math.max(rt, d);
    };
    if (ni(p)) {
      const T = Of(p, a);
      C(_, w, Pf("default", T));
    } else {
      const T = Xg(p, _, i, l), y = T.length;
      for (let P = 0; P < y; P++) {
        _ = _, w = w;
        const O = T[P], S = Of(O, a);
        for (const k in _)
          C(_[k], dw(w, k), Pf(k, S), P, y);
      }
    }
    h = f, f += A;
  }
  return a.forEach((c, g) => {
    for (const p in c) {
      const _ = c[p];
      _.sort(lw);
      const w = [], A = [], C = [];
      for (let y = 0; y < _.length; y++) {
        const { at: P, value: O, easing: S } = _[y];
        w.push(O), A.push(/* @__PURE__ */ Ka(0, d, P)), C.push(S || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), w.unshift(w[0]), C.unshift(cw)), A[A.length - 1] !== 1 && (A.push(1), w.push(null)), o.has(g) || o.set(g, {
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
function Pf(s, t) {
  return t[s] || (t[s] = []), t[s];
}
function fw(s) {
  return Array.isArray(s) ? s : [s];
}
function dw(s, t) {
  return s && s[t] ? {
    ...s,
    ...s[t]
  } : { ...s };
}
const pw = (s) => typeof s == "number", gw = (s) => s.every(pw), Co = /* @__PURE__ */ new WeakMap(), mw = (s) => Array.isArray(s);
function kf(s) {
  const t = [{}, {}];
  return s == null || s.values.forEach((e, i) => {
    t[0][i] = e.get(), t[1][i] = e.getVelocity();
  }), t;
}
function Gg(s, t, e, i) {
  if (typeof t == "function") {
    const [n, r] = kf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  if (typeof t == "string" && (t = s.variants && s.variants[t]), typeof t == "function") {
    const [n, r] = kf(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  return t;
}
function _w(s, t, e) {
  const i = s.getProps();
  return Gg(i, t, i.custom, s);
}
function yw(s, t, e) {
  s.hasValue(t) ? s.getValue(t).set(e) : s.addValue(t, Ao(e));
}
function vw(s) {
  return mw(s) ? s[s.length - 1] || 0 : s;
}
function ww(s, t) {
  const e = _w(s, t);
  let { transitionEnd: i = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = vw(r[o]);
    yw(s, o, a);
  }
}
function bw(s) {
  return !!(ni(s) && s.add);
}
function xw(s, t) {
  const e = s.getValue("willChange");
  if (bw(e))
    return e.add(t);
  if (!e && Tn.WillChange) {
    const i = new Tn.WillChange("auto");
    s.addValue("willChange", i), i.add(t);
  }
}
const Bu = (s) => s.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Tw = "framerAppearId", Sw = "data-" + Bu(Tw);
function Ew(s) {
  return s.props[Sw];
}
const Aw = (s) => s !== null;
function Cw(s, { repeat: t, repeatType: e = "loop" }, i) {
  const n = s.filter(Aw), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const Ow = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Pw = (s) => ({
  type: "spring",
  stiffness: 550,
  damping: s === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), kw = {
  type: "keyframes",
  duration: 0.8
}, Mw = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Iw = (s, { keyframes: t }) => t.length > 2 ? kw : mr.has(s) ? s.startsWith("scale") ? Pw(t[1]) : Ow : Mw;
function Dw({ when: s, delay: t, delayChildren: e, staggerChildren: i, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...h }) {
  return !!Object.keys(h).length;
}
const jg = (s, t, e, i = {}, n, r) => (o) => {
  const a = Ng(i, s) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ zi(l);
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
  Dw(a) || Object.assign(h, Iw(s, h)), h.duration && (h.duration = /* @__PURE__ */ zi(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ zi(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let f = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (zc(h), h.delay === 0 && (f = !0)), (Tn.instantAnimations || Tn.skipAnimations) && (f = !0, zc(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, f && !r && t.get() !== void 0) {
    const d = Cw(h.keyframes, a);
    if (d !== void 0) {
      ui.update(() => {
        h.onUpdate(d), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Lu(h) : new Ev(h);
};
function Lw({ protectedKeys: s, needsAnimating: t }, e) {
  const i = s.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, i;
}
function Rw(s, t, { delay: e = 0, transitionOverride: i, type: n } = {}) {
  let { transition: r = s.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (r = i);
  const l = [], u = n && s.animationState && s.animationState.getState()[n];
  for (const h in a) {
    const f = s.getValue(h, s.latestValues[h] ?? null), d = a[h];
    if (d === void 0 || u && Lw(u, h))
      continue;
    const c = {
      delay: e,
      ...Ng(r || {}, h)
    }, g = f.get();
    if (g !== void 0 && !f.isAnimating && !Array.isArray(d) && d === g && !c.velocity)
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const w = Ew(s);
      if (w) {
        const A = window.MotionHandoffAnimation(w, h, ui);
        A !== null && (c.startTime = A, p = !0);
      }
    }
    xw(s, h), f.start(jg(h, f, d, s.shouldReduceMotion && $g.has(h) ? { type: !1 } : c, s, p));
    const _ = f.animation;
    _ && l.push(_);
  }
  return o && Promise.all(l).then(() => {
    ui.update(() => {
      o && ww(s, o);
    });
  }), l;
}
function zw({ top: s, left: t, right: e, bottom: i }) {
  return {
    x: { min: t, max: e },
    y: { min: s, max: i }
  };
}
function Fw(s, t) {
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
function Nw(s, t) {
  return zw(Fw(s.getBoundingClientRect(), t));
}
const Mf = {
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
}, Nc = {};
for (const s in Mf)
  Nc[s] = {
    isEnabled: (t) => Mf[s].some((e) => !!t[e])
  };
const If = () => ({ min: 0, max: 0 }), Vu = () => ({
  x: If(),
  y: If()
}), $w = typeof window < "u", $c = { current: null }, Zg = { current: !1 };
function Bw() {
  if (Zg.current = !0, !!$w)
    if (window.matchMedia) {
      const s = window.matchMedia("(prefers-reduced-motion)"), t = () => $c.current = s.matches;
      s.addEventListener("change", t), t();
    } else
      $c.current = !1;
}
function Vw(s) {
  return s !== null && typeof s == "object" && typeof s.start == "function";
}
function Hw(s) {
  return typeof s == "string" || Array.isArray(s);
}
const Yw = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ww = ["initial", ...Yw];
function Qg(s) {
  return Vw(s.animate) || Ww.some((t) => Hw(s[t]));
}
function qw(s) {
  return !!(Qg(s) || s.variants);
}
function Uw(s, t, e) {
  for (const i in t) {
    const n = t[i], r = e[i];
    if (ni(n))
      s.addValue(i, n);
    else if (ni(r))
      s.addValue(i, Ao(n, { owner: s }));
    else if (r !== n)
      if (s.hasValue(i)) {
        const o = s.getValue(i);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = s.getStaticValue(i);
        s.addValue(i, Ao(o !== void 0 ? o : n, { owner: s }));
      }
  }
  for (const i in e)
    t[i] === void 0 && s.removeValue(i);
  return t;
}
const Df = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Jg {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Ru, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = bi.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, ui.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = e.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Qg(e), this.isVariantNode = qw(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const d in f) {
      const c = f[d];
      l[d] !== void 0 && ni(c) && c.set(l[d]);
    }
  }
  mount(t) {
    var e;
    this.current = t, Co.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, n) => this.bindToMotionValue(n, i)), Zg.current || Bw(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : $c.current, process.env.NODE_ENV !== "production" && Tu(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), xs(this.notifyUpdate), xs(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
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
    const i = mr.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && ui.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (t in Nc) {
      const e = Nc[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Vu();
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
    for (let i = 0; i < Df.length; i++) {
      const n = Df[i];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const r = "on" + n, o = t[r];
      o && (this.propEventSubscriptions[n] = this.on(n, o));
    }
    this.prevMotionValues = Uw(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && e !== void 0 && (i = Ao(e === null ? void 0 : e, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (tg(i) || ig(i)) ? i = parseFloat(i) : !nw(i) && pr.test(e) && (i = Yg(t, e)), this.setBaseTarget(t, ni(i) ? i.get() : i)), ni(i) ? i.get() : i;
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
      const o = Gg(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (e && i !== void 0)
      return i;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !ni(n) ? n : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new ng()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    Wv.render(this.render);
  }
}
class tm extends Jg {
  constructor() {
    super(...arguments), this.KeyframeResolver = Bv;
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
const Kw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Xw = gr.length;
function Gw(s, t, e) {
  let i = "", n = !0;
  for (let r = 0; r < Xw; r++) {
    const o = gr[r], a = s[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || e) {
      const u = qg(a, Fu[o]);
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
function em(s, t, e) {
  const { style: i, vars: n, transformOrigin: r } = s;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (mr.has(l)) {
      o = !0;
      continue;
    } else if (_g(l)) {
      n[l] = u;
      continue;
    } else {
      const h = qg(u, Fu[l]);
      l.startsWith("origin") ? (a = !0, r[l] = h) : i[l] = h;
    }
  }
  if (t.transform || (o || e ? i.transform = Gw(t, s.transform, e) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: h = 0 } = r;
    i.transformOrigin = `${l} ${u} ${h}`;
  }
}
function im(s, { style: t, vars: e }, i, n) {
  const r = s.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, i);
  for (o in e)
    r.setProperty(o, e[o]);
}
const jw = {};
function Zw(s, { layout: t, layoutId: e }) {
  return mr.has(s) || s.startsWith("origin") || (t || e !== void 0) && (!!jw[s] || s === "opacity");
}
function nm(s, t, e) {
  var r;
  const { style: i } = s, n = {};
  for (const o in i)
    (ni(i[o]) || t.style && ni(t.style[o]) || Zw(o, s) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = i[o]);
  return n;
}
function Qw(s) {
  return window.getComputedStyle(s);
}
class Jw extends tm {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = im;
  }
  readValueFromInstance(t, e) {
    var i;
    if (mr.has(e))
      return (i = this.projection) != null && i.isProjecting ? Mc(e) : nv(t, e);
    {
      const n = Qw(t), r = (_g(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return Nw(t, e);
  }
  build(t, e, i) {
    em(t, e, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return nm(t, e, i);
  }
}
function tb(s, t) {
  return s in t;
}
class eb extends Jg {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (tb(e, t)) {
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
    return Vu();
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
const ib = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, nb = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function sb(s, t, e = 1, i = 0, n = !0) {
  s.pathLength = 1;
  const r = n ? ib : nb;
  s[r.offset] = ft.transform(-i);
  const o = ft.transform(t), a = ft.transform(e);
  s[r.array] = `${o} ${a}`;
}
function rb(s, {
  attrX: t,
  attrY: e,
  attrScale: i,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, h) {
  if (em(s, a, u), l) {
    s.style.viewBox && (s.attrs.viewBox = s.style.viewBox);
    return;
  }
  s.attrs = s.style, s.style = {};
  const { attrs: f, style: d } = s;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), e !== void 0 && (f.y = e), i !== void 0 && (f.scale = i), n !== void 0 && sb(f, n, r, o, !1);
}
const sm = /* @__PURE__ */ new Set([
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
]), ob = (s) => typeof s == "string" && s.toLowerCase() === "svg";
function ab(s, t, e, i) {
  im(s, t, void 0, i);
  for (const n in t.attrs)
    s.setAttribute(sm.has(n) ? n : Bu(n), t.attrs[n]);
}
function lb(s, t, e) {
  const i = nm(s, t, e);
  for (const n in s)
    if (ni(s[n]) || ni(t[n])) {
      const r = gr.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      i[r] = s[n];
    }
  return i;
}
class cb extends tm {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Vu;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (mr.has(e)) {
      const i = Hg(e);
      return i && i.default || 0;
    }
    return e = sm.has(e) ? e : Bu(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return lb(t, e, i);
  }
  build(t, e, i) {
    rb(t, e, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, e, i, n) {
    ab(t, e, i, n);
  }
  mount(t) {
    this.isSVGTag = ob(t.tagName), super.mount(t);
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
  }, e = Nu(s) && !tw(s) ? new cb(t) : new Jw(t);
  e.mount(s), Co.set(s, e);
}
function hb(s) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new eb(t);
  e.mount(s), Co.set(s, e);
}
function fb(s, t, e) {
  const i = ni(s) ? s : Ao(s);
  return i.start(jg("", i, t, e)), i.animation;
}
function db(s, t) {
  return ni(s) || typeof s == "number" || typeof s == "string" && !$u(t);
}
function rm(s, t, e, i) {
  const n = [];
  if (db(s, t))
    n.push(fb(s, $u(t) && t.default || t, e && (e.default || e)));
  else {
    const r = Xg(s, t, i), o = r.length;
    on(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a];
      on(l !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const u = l instanceof Element ? ub : hb;
      Co.has(l) || u(l);
      const h = Co.get(l), f = { ...e };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), n.push(...Rw(h, { ...t, transition: f }, {}));
    }
  }
  return n;
}
function pb(s, t, e) {
  const i = [];
  return hw(s, t, e, { spring: Eo }).forEach(({ keyframes: r, transition: o }, a) => {
    i.push(...rm(a, r, o));
  }), i;
}
function gb(s) {
  return Array.isArray(s) && s.some(Array.isArray);
}
function mb(s) {
  function t(e, i, n) {
    let r = [], o;
    if (gb(e))
      r = pb(e, i, s);
    else {
      const { onComplete: l, ...u } = n || {};
      typeof l == "function" && (o = l), r = rm(e, i, u, s);
    }
    const a = new Cv(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const X = mb(), _b = 50, Lf = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
}), yb = () => ({
  time: 0,
  x: Lf(),
  y: Lf()
}), vb = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function Rf(s, t, e, i) {
  const n = e[t], { length: r, position: o } = vb[t], a = n.current, l = e.time;
  n.current = s[`scroll${o}`], n.scrollLength = s[`scroll${r}`] - s[`client${r}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = /* @__PURE__ */ Ka(0, n.scrollLength, n.current);
  const u = i - l;
  n.velocity = u > _b ? 0 : xu(n.current - a, u);
}
function wb(s, t, e) {
  Rf(s, "x", t, e), Rf(s, "y", t, e), t.time = e;
}
function bb(s, t) {
  const e = { x: 0, y: 0 };
  let i = s;
  for (; i && i !== t; )
    if (Vv(i))
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
const Bc = {
  start: 0,
  center: 0.5,
  end: 1
};
function zf(s, t, e = 0) {
  let i = 0;
  if (s in Bc && (s = Bc[s]), typeof s == "string") {
    const n = parseFloat(s);
    s.endsWith("px") ? i = n : s.endsWith("%") ? s = n / 100 : s.endsWith("vw") ? i = n / 100 * document.documentElement.clientWidth : s.endsWith("vh") ? i = n / 100 * document.documentElement.clientHeight : s = n;
  }
  return typeof s == "number" && (i = t * s), e + i;
}
const xb = [0, 0];
function Tb(s, t, e, i) {
  let n = Array.isArray(s) ? s : xb, r = 0, o = 0;
  return typeof s == "number" ? n = [s, s] : typeof s == "string" && (s = s.trim(), s.includes(" ") ? n = s.split(" ") : n = [s, Bc[s] ? s : "0"]), r = zf(n[0], e, i), o = zf(n[1], t), r - o;
}
const Sb = {
  All: [
    [0, 0],
    [1, 1]
  ]
}, Eb = { x: 0, y: 0 };
function Ab(s) {
  return "getBBox" in s && s.tagName !== "svg" ? s.getBBox() : { width: s.clientWidth, height: s.clientHeight };
}
function Cb(s, t, e) {
  const { offset: i = Sb.All } = e, { target: n = s, axis: r = "y" } = e, o = r === "y" ? "height" : "width", a = n !== s ? bb(n, s) : Eb, l = n === s ? { width: s.scrollWidth, height: s.scrollHeight } : Ab(n), u = {
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
  h && (t[r].interpolate = Og(t[r].offset, Mu(i), { clamp: !1 }), t[r].interpolatorOffsets = [...t[r].offset]), t[r].progress = Wn(0, 1, t[r].interpolate(t[r].current));
}
function Ob(s, t = s, e) {
  if (e.x.targetOffset = 0, e.y.targetOffset = 0, t !== s) {
    let i = t;
    for (; i && i !== s; )
      e.x.targetOffset += i.offsetLeft, e.y.targetOffset += i.offsetTop, i = i.offsetParent;
  }
  e.x.targetLength = t === s ? t.scrollWidth : t.clientWidth, e.y.targetLength = t === s ? t.scrollHeight : t.clientHeight, e.x.containerLength = s.clientWidth, e.y.containerLength = s.clientHeight, process.env.NODE_ENV !== "production" && s && t && t !== s && Tu(getComputedStyle(s).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function Pb(s, t, e, i = {}) {
  return {
    measure: (n) => {
      Ob(s, i.target, e), wb(s, e, n), (i.offset || i.target) && Cb(s, e, i);
    },
    notify: () => t(e)
  };
}
const Sr = /* @__PURE__ */ new WeakMap(), Ff = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), Nf = (s) => s === document.scrollingElement ? window : s;
function om(s, { container: t = document.scrollingElement, ...e } = {}) {
  if (!t)
    return Kn;
  let i = Il.get(t);
  i || (i = /* @__PURE__ */ new Set(), Il.set(t, i));
  const n = yb(), r = Pb(t, s, n, e);
  if (i.add(r), !Sr.has(t)) {
    const a = () => {
      for (const f of i)
        f.measure(xo.timestamp);
      ui.preUpdate(l);
    }, l = () => {
      for (const f of i)
        f.notify();
    }, u = () => ui.read(a);
    Sr.set(t, u);
    const h = Nf(t);
    window.addEventListener("resize", u, { passive: !0 }), t !== document.documentElement && Ff.set(t, Jv(t, u)), h.addEventListener("scroll", u, { passive: !0 }), u();
  }
  const o = Sr.get(t);
  return ui.read(o, !1, !0), () => {
    var u;
    xs(o);
    const a = Il.get(t);
    if (!a || (a.delete(r), a.size))
      return;
    const l = Sr.get(t);
    Sr.delete(t), l && (Nf(t).removeEventListener("scroll", l), (u = Ff.get(t)) == null || u(), window.removeEventListener("resize", l));
  };
}
const $f = /* @__PURE__ */ new Map();
function kb(s) {
  const t = { value: 0 }, e = om((i) => {
    t.value = i[s.axis].progress * 100;
  }, s);
  return { currentTime: t, cancel: e };
}
function am({ source: s, container: t, ...e }) {
  const { axis: i } = e;
  s && (t = s);
  const n = $f.get(t) ?? /* @__PURE__ */ new Map();
  $f.set(t, n);
  const r = e.target ?? "self", o = n.get(r) ?? {}, a = i + (e.offset ?? []).join(",");
  return o[a] || (o[a] = !e.target && Dg() ? new ScrollTimeline({ source: t, axis: i }) : kb({ container: t, ...e })), o[a];
}
function Mb(s, t) {
  const e = am(t);
  return s.attachTimeline({
    timeline: t.target ? void 0 : e,
    observe: (i) => (i.pause(), Kg((n) => {
      i.time = i.iterationDuration * n;
    }, e))
  });
}
function Ib(s) {
  return s.length === 2;
}
function Db(s, t) {
  return Ib(s) ? om((e) => {
    s(e[t.axis].progress, e);
  }, t) : Kg(s, am(t));
}
function _1(s, { axis: t = "y", container: e = document.scrollingElement, ...i } = {}) {
  if (!e)
    return Kn;
  const n = { axis: t, container: e, ...i };
  return typeof s == "function" ? Db(s, n) : Mb(s, n);
}
function Lb(s, t) {
  const e = bi.now(), i = ({ timestamp: n }) => {
    const r = n - e;
    r >= t && (xs(i), s(r - t));
  };
  return ui.setup(i, !0), () => xs(i);
}
function Rb(s, t) {
  return Lb(s, /* @__PURE__ */ zi(t));
}
var sa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zb(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Br = { exports: {} };
Br.exports;
var Bf;
function Fb() {
  return Bf || (Bf = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", u = "[object AsyncFunction]", h = "[object Boolean]", f = "[object Date]", d = "[object Error]", c = "[object Function]", g = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", w = "[object Null]", A = "[object Object]", C = "[object Proxy]", T = "[object RegExp]", y = "[object Set]", P = "[object String]", O = "[object Undefined]", S = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", V = "[object Float32Array]", z = "[object Float64Array]", B = "[object Int8Array]", J = "[object Int16Array]", it = "[object Int32Array]", q = "[object Uint8Array]", H = "[object Uint8ClampedArray]", tt = "[object Uint16Array]", ot = "[object Uint32Array]", b = /[\\^$.*+?()[\]{}|]/g, j = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, U = {};
    U[V] = U[z] = U[B] = U[J] = U[it] = U[q] = U[H] = U[tt] = U[ot] = !0, U[a] = U[l] = U[k] = U[h] = U[R] = U[f] = U[d] = U[c] = U[p] = U[_] = U[A] = U[T] = U[y] = U[P] = U[S] = !1;
    var rt = typeof sa == "object" && sa && sa.Object === Object && sa, Dt = typeof self == "object" && self && self.Object === Object && self, _t = rt || Dt || Function("return this")(), Ct = t && !t.nodeType && t, ct = Ct && !0 && s && !s.nodeType && s, Rt = ct && ct.exports === Ct, se = Rt && rt.process, Bt = function() {
      try {
        var m = ct && ct.require && ct.require("util").types;
        return m || se && se.binding && se.binding("util");
      } catch {
      }
    }(), Ut = Bt && Bt.isTypedArray;
    function gt(m, x, L) {
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
    function mt(m, x) {
      for (var L = -1, Q = Array(m); ++L < m; )
        Q[L] = x(L);
      return Q;
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
    var Vt = Array.prototype, Ke = Function.prototype, Ie = Object.prototype, zt = _t["__core-js_shared__"], Nt = Ke.toString, ue = Ie.hasOwnProperty, Xe = function() {
      var m = /[^.]+$/.exec(zt && zt.keys && zt.keys.IE_PROTO || "");
      return m ? "Symbol(src)_1." + m : "";
    }(), Xt = Ie.toString, re = Nt.call(Object), Pt = RegExp(
      "^" + Nt.call(ue).replace(b, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), he = Rt ? _t.Buffer : void 0, De = _t.Symbol, Fe = _t.Uint8Array;
    he && he.allocUnsafe;
    var Ki = I(Object.getPrototypeOf, Object), Kt = Object.create, Xi = Ie.propertyIsEnumerable, si = Vt.splice, ve = De ? De.toStringTag : void 0, Le = function() {
      try {
        var m = Za(Object, "defineProperty");
        return m({}, "", {}), m;
      } catch {
      }
    }(), Ei = he ? he.isBuffer : void 0, Ne = Math.max, at = Date.now, $e = Za(_t, "Map"), Ft = Za(Object, "create"), Oe = /* @__PURE__ */ function() {
      function m() {
      }
      return function(x) {
        if (!un(x))
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
        var Q = m[x];
        this.set(Q[0], Q[1]);
      }
    }
    function Ai() {
      this.__data__ = Ft ? Ft(null) : {}, this.size = 0;
    }
    function Z(m) {
      var x = this.has(m) && delete this.__data__[m];
      return this.size -= x ? 1 : 0, x;
    }
    function v(m) {
      var x = this.__data__;
      if (Ft) {
        var L = x[m];
        return L === i ? void 0 : L;
      }
      return ue.call(x, m) ? x[m] : void 0;
    }
    function $(m) {
      var x = this.__data__;
      return Ft ? x[m] !== void 0 : ue.call(x, m);
    }
    function E(m, x) {
      var L = this.__data__;
      return this.size += this.has(m) ? 0 : 1, L[m] = Ft && x === void 0 ? i : x, this;
    }
    ie.prototype.clear = Ai, ie.prototype.delete = Z, ie.prototype.get = v, ie.prototype.has = $, ie.prototype.set = E;
    function M(m) {
      var x = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++x < L; ) {
        var Q = m[x];
        this.set(Q[0], Q[1]);
      }
    }
    function N() {
      this.__data__ = [], this.size = 0;
    }
    function D(m) {
      var x = this.__data__, L = ln(x, m);
      if (L < 0)
        return !1;
      var Q = x.length - 1;
      return L == Q ? x.pop() : si.call(x, L, 1), --this.size, !0;
    }
    function Y(m) {
      var x = this.__data__, L = ln(x, m);
      return L < 0 ? void 0 : x[L][1];
    }
    function F(m) {
      return ln(this.__data__, m) > -1;
    }
    function W(m, x) {
      var L = this.__data__, Q = ln(L, m);
      return Q < 0 ? (++this.size, L.push([m, x])) : L[Q][1] = x, this;
    }
    M.prototype.clear = N, M.prototype.delete = D, M.prototype.get = Y, M.prototype.has = F, M.prototype.set = W;
    function et(m) {
      var x = -1, L = m == null ? 0 : m.length;
      for (this.clear(); ++x < L; ) {
        var Q = m[x];
        this.set(Q[0], Q[1]);
      }
    }
    function K() {
      this.size = 0, this.__data__ = {
        hash: new ie(),
        map: new ($e || M)(),
        string: new ie()
      };
    }
    function dt(m) {
      var x = No(this, m).delete(m);
      return this.size -= x ? 1 : 0, x;
    }
    function Tt(m) {
      return No(this, m).get(m);
    }
    function Ot(m) {
      return No(this, m).has(m);
    }
    function yt(m, x) {
      var L = No(this, m), Q = L.size;
      return L.set(m, x), this.size += L.size == Q ? 0 : 1, this;
    }
    et.prototype.clear = K, et.prototype.delete = dt, et.prototype.get = Tt, et.prototype.has = Ot, et.prototype.set = yt;
    function pt(m) {
      var x = this.__data__ = new M(m);
      this.size = x.size;
    }
    function kt() {
      this.__data__ = new M(), this.size = 0;
    }
    function ht(m) {
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
        var Q = L.__data__;
        if (!$e || Q.length < e - 1)
          return Q.push([m, x]), this.size = ++L.size, this;
        L = this.__data__ = new et(Q);
      }
      return L.set(m, x), this.size = L.size, this;
    }
    pt.prototype.clear = kt, pt.prototype.delete = ht, pt.prototype.get = we, pt.prototype.has = Gt, pt.prototype.set = be;
    function xe(m, x) {
      var L = tl(m), Q = !L && Ja(m), St = !L && !Q && Gu(m), Mt = !L && !Q && !St && Zu(m), jt = L || Q || St || Mt, It = jt ? mt(m.length, String) : [], Zt = It.length;
      for (var $i in m)
        jt && // Safari 9 has enumerable `arguments.length` in strict mode.
        ($i == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        St && ($i == "offset" || $i == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Mt && ($i == "buffer" || $i == "byteLength" || $i == "byteOffset") || // Skip index properties.
        Ku($i, Zt)) || It.push($i);
      return It;
    }
    function fe(m, x, L) {
      (L !== void 0 && !$o(m[x], L) || L === void 0 && !(x in m)) && de(m, x, L);
    }
    function an(m, x, L) {
      var Q = m[x];
      (!(ue.call(m, x) && $o(Q, L)) || L === void 0 && !(x in m)) && de(m, x, L);
    }
    function ln(m, x) {
      for (var L = m.length; L--; )
        if ($o(m[L][0], x))
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
    var oe = Sm();
    function Ge(m) {
      return m == null ? m === void 0 ? O : w : ve && ve in Object(m) ? Em(m) : Mm(m);
    }
    function Ss(m) {
      return _r(m) && Ge(m) == a;
    }
    function Fo(m) {
      if (!un(m) || Pm(m))
        return !1;
      var x = il(m) ? Pt : j;
      return x.test(Rm(m));
    }
    function Xn(m) {
      return _r(m) && ju(m.length) && !!U[Ge(m)];
    }
    function Ci(m) {
      if (!un(m))
        return km(m);
      var x = Xu(m), L = [];
      for (var Q in m)
        Q == "constructor" && (x || !ue.call(m, Q)) || L.push(Q);
      return L;
    }
    function cn(m, x, L, Q, St) {
      m !== x && oe(x, function(Mt, jt) {
        if (St || (St = new pt()), un(Mt))
          Es(m, x, jt, L, cn, Q, St);
        else {
          var It = Q ? Q(Qa(m, jt), Mt, jt + "", m, x, St) : void 0;
          It === void 0 && (It = Mt), fe(m, jt, It);
        }
      }, Qu);
    }
    function Es(m, x, L, Q, St, Mt, jt) {
      var It = Qa(m, L), Zt = Qa(x, L), $i = jt.get(Zt);
      if ($i) {
        fe(m, L, $i);
        return;
      }
      var fi = Mt ? Mt(It, Zt, L + "", m, x, jt) : void 0, yr = fi === void 0;
      if (yr) {
        var nl = tl(Zt), sl = !nl && Gu(Zt), th = !nl && !sl && Zu(Zt);
        fi = Zt, nl || sl || th ? tl(It) ? fi = It : zm(It) ? fi = bm(It) : sl ? (yr = !1, fi = ym(Zt)) : th ? (yr = !1, fi = wm(Zt)) : fi = [] : Fm(Zt) || Ja(Zt) ? (fi = It, Ja(It) ? fi = Nm(It) : (!un(It) || il(It)) && (fi = Am(Zt))) : yr = !1;
      }
      yr && (jt.set(Zt, fi), St(fi, Zt, Q, Mt, jt), jt.delete(Zt)), fe(m, L, fi);
    }
    function Ni(m, x) {
      return Dm(Im(m, x, Ju), m + "");
    }
    var _m = Le ? function(m, x) {
      return Le(m, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Vm(x),
        writable: !0
      });
    } : Ju;
    function ym(m, x) {
      return m.slice();
    }
    function vm(m) {
      var x = new m.constructor(m.byteLength);
      return new Fe(x).set(new Fe(m)), x;
    }
    function wm(m, x) {
      var L = vm(m.buffer);
      return new m.constructor(L, m.byteOffset, m.length);
    }
    function bm(m, x) {
      var L = -1, Q = m.length;
      for (x || (x = Array(Q)); ++L < Q; )
        x[L] = m[L];
      return x;
    }
    function xm(m, x, L, Q) {
      var St = !L;
      L || (L = {});
      for (var Mt = -1, jt = x.length; ++Mt < jt; ) {
        var It = x[Mt], Zt = void 0;
        Zt === void 0 && (Zt = m[It]), St ? de(L, It, Zt) : an(L, It, Zt);
      }
      return L;
    }
    function Tm(m) {
      return Ni(function(x, L) {
        var Q = -1, St = L.length, Mt = St > 1 ? L[St - 1] : void 0, jt = St > 2 ? L[2] : void 0;
        for (Mt = m.length > 3 && typeof Mt == "function" ? (St--, Mt) : void 0, jt && Cm(L[0], L[1], jt) && (Mt = St < 3 ? void 0 : Mt, St = 1), x = Object(x); ++Q < St; ) {
          var It = L[Q];
          It && m(x, It, Q, Mt);
        }
        return x;
      });
    }
    function Sm(m) {
      return function(x, L, Q) {
        for (var St = -1, Mt = Object(x), jt = Q(x), It = jt.length; It--; ) {
          var Zt = jt[++St];
          if (L(Mt[Zt], Zt, Mt) === !1)
            break;
        }
        return x;
      };
    }
    function Uu(m, x, L, Q, St, Mt) {
      return un(m) && un(x) && (Mt.set(x, m), cn(m, x, void 0, Uu, Mt), Mt.delete(x)), m;
    }
    function No(m, x) {
      var L = m.__data__;
      return Om(x) ? L[typeof x == "string" ? "string" : "hash"] : L.map;
    }
    function Za(m, x) {
      var L = Ce(m, x);
      return Fo(L) ? L : void 0;
    }
    function Em(m) {
      var x = ue.call(m, ve), L = m[ve];
      try {
        m[ve] = void 0;
        var Q = !0;
      } catch {
      }
      var St = Xt.call(m);
      return Q && (x ? m[ve] = L : delete m[ve]), St;
    }
    function Am(m) {
      return typeof m.constructor == "function" && !Xu(m) ? Oe(Ki(m)) : {};
    }
    function Ku(m, x) {
      var L = typeof m;
      return x = x ?? o, !!x && (L == "number" || L != "symbol" && nt.test(m)) && m > -1 && m % 1 == 0 && m < x;
    }
    function Cm(m, x, L) {
      if (!un(L))
        return !1;
      var Q = typeof x;
      return (Q == "number" ? el(L) && Ku(x, L.length) : Q == "string" && x in L) ? $o(L[x], m) : !1;
    }
    function Om(m) {
      var x = typeof m;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? m !== "__proto__" : m === null;
    }
    function Pm(m) {
      return !!Xe && Xe in m;
    }
    function Xu(m) {
      var x = m && m.constructor, L = typeof x == "function" && x.prototype || Ie;
      return m === L;
    }
    function km(m) {
      var x = [];
      if (m != null)
        for (var L in Object(m))
          x.push(L);
      return x;
    }
    function Mm(m) {
      return Xt.call(m);
    }
    function Im(m, x, L) {
      return x = Ne(x === void 0 ? m.length - 1 : x, 0), function() {
        for (var Q = arguments, St = -1, Mt = Ne(Q.length - x, 0), jt = Array(Mt); ++St < Mt; )
          jt[St] = Q[x + St];
        St = -1;
        for (var It = Array(x + 1); ++St < x; )
          It[St] = Q[St];
        return It[x] = L(jt), gt(m, this, It);
      };
    }
    function Qa(m, x) {
      if (!(x === "constructor" && typeof m[x] == "function") && x != "__proto__")
        return m[x];
    }
    var Dm = Lm(_m);
    function Lm(m) {
      var x = 0, L = 0;
      return function() {
        var Q = at(), St = r - (Q - L);
        if (L = Q, St > 0) {
          if (++x >= n)
            return arguments[0];
        } else
          x = 0;
        return m.apply(void 0, arguments);
      };
    }
    function Rm(m) {
      if (m != null) {
        try {
          return Nt.call(m);
        } catch {
        }
        try {
          return m + "";
        } catch {
        }
      }
      return "";
    }
    function $o(m, x) {
      return m === x || m !== m && x !== x;
    }
    var Ja = Ss(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Ss : function(m) {
      return _r(m) && ue.call(m, "callee") && !Xi.call(m, "callee");
    }, tl = Array.isArray;
    function el(m) {
      return m != null && ju(m.length) && !il(m);
    }
    function zm(m) {
      return _r(m) && el(m);
    }
    var Gu = Ei || Hm;
    function il(m) {
      if (!un(m))
        return !1;
      var x = Ge(m);
      return x == c || x == g || x == u || x == C;
    }
    function ju(m) {
      return typeof m == "number" && m > -1 && m % 1 == 0 && m <= o;
    }
    function un(m) {
      var x = typeof m;
      return m != null && (x == "object" || x == "function");
    }
    function _r(m) {
      return m != null && typeof m == "object";
    }
    function Fm(m) {
      if (!_r(m) || Ge(m) != A)
        return !1;
      var x = Ki(m);
      if (x === null)
        return !0;
      var L = ue.call(x, "constructor") && x.constructor;
      return typeof L == "function" && L instanceof L && Nt.call(L) == re;
    }
    var Zu = Ut ? ut(Ut) : Xn;
    function Nm(m) {
      return xm(m, Qu(m));
    }
    var $m = Ni(function(m) {
      return m.push(void 0, Uu), gt(Bm, void 0, m);
    });
    function Qu(m) {
      return el(m) ? xe(m) : Ci(m);
    }
    var Bm = Tm(function(m, x, L, Q) {
      cn(m, x, L, Q);
    });
    function Vm(m) {
      return function() {
        return m;
      };
    }
    function Ju(m) {
      return m;
    }
    function Hm() {
      return !1;
    }
    s.exports = $m;
  }(Br, Br.exports)), Br.exports;
}
var Nb = Fb();
const qt = /* @__PURE__ */ zb(Nb), $b = 60, Er = {}, Vf = (s, t = $b) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  Er[s] = Er[s] || null;
  const r = Er[s] ? i - Er[s] : null;
  (r === null || r > n) && (Er[s] = i - r % n, s(...e));
});
function Oo() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const Vc = (s, t, e, i, n, r) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? Vc(o, t, e - 1, i, n, r) : Vc(s, o, e - 1, i, n, r);
}, Bb = (s, t, e, i, n, r) => Vc(e, i, n, r, s, t), Vb = () => Math.round(
  Bb("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, Hb = (s) => Math.round(window.devicePixelRatio * 100) - s, Yb = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, Dl = {
  firefox: Vb,
  chrome: Hb,
  default: Yb
}, Hf = {
  calculate: (s, t) => Dl[s] ? Dl[s](t) : Dl.default(t)
}, Hu = "APPLICATION:MOBILE_MENU:OPEN", Yu = "APPLICATION:MOBILE_MENU:CLOSED", $a = "APPLICATION_PRELUDIUM", Hc = "APPLICATION:INITIALIZED", Po = "APPLICATION:READY", Fi = "APPLICATION:REVEALED", Ui = "APPLICATION:RESIZE", qn = "APPLICATION:SCROLL", lm = "APPLICATION:SCROLL_LOCKED", cm = "APPLICATION:SCROLL_RELEASED", Xa = "APPLICATION:FORCED_SCROLL_START", Ga = "APPLICATION:FORCED_SCROLL_END", ja = "APPLICATION:OUTLINE", um = "APPLICATION:VISIBILITY_CHANGE", hm = "APPLICATION:HIDDEN", fm = "APPLICATION:VISIBLE", Ba = "BREAKPOINT:CHANGE", Wu = "IMAGE:LAZYLOADED", dm = "IMAGE:REVEALED", pm = "SECTION:LAZYLOADED", y1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: Ga,
  APPLICATION_FORCED_SCROLL_START: Xa,
  APPLICATION_HIDDEN: hm,
  APPLICATION_INITIALIZED: Hc,
  APPLICATION_MOBILE_MENU_CLOSED: Yu,
  APPLICATION_MOBILE_MENU_OPEN: Hu,
  APPLICATION_OUTLINE: ja,
  APPLICATION_PRELUDIUM: $a,
  APPLICATION_READY: Po,
  APPLICATION_RESIZE: Ui,
  APPLICATION_REVEALED: Fi,
  APPLICATION_SCROLL: qn,
  APPLICATION_SCROLL_LOCKED: lm,
  APPLICATION_SCROLL_RELEASED: cm,
  APPLICATION_VISIBILITY_CHANGE: um,
  APPLICATION_VISIBLE: fm,
  BREAKPOINT_CHANGE: Ba,
  IMAGE_LAZYLOADED: Wu,
  IMAGE_REVEALED: dm,
  SECTION_LAZYLOADED: pm
}, Symbol.toStringTag, { value: "Module" })), Wb = {
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
    this.app = t, this.mediaQueries = {}, this.opts = qt(e, Wb), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener($a, () => {
      this.initialize(!1);
    }), window.addEventListener(Fi, () => {
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
class qb {
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
class Ub {
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
const st = new Kb();
$t.registerPlugin(fr);
$t.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  const t = window.location.hash;
  if (s.persisted || t) {
    const i = () => {
      console.log("== fixVisibility");
      const n = document.querySelector("#fader");
      n && $t.set(n, { autoAlpha: 0, display: "none" });
      const r = document.querySelectorAll("[data-fader]");
      r.length && $t.set(r, { autoAlpha: 0 }), $t.set(document.body, { clearProps: "opacity" }), document.body.classList.remove("unloaded");
      const o = st.find("header[data-nav]");
      o && $t.set(o, { clearProps: "opacity, transform" });
      const a = st.find("main");
      a && $t.set(a, { clearProps: "opacity, transform" });
      const l = st.find("footer");
      l && $t.set(l, { clearProps: "opacity, transform" });
    };
    s.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const Wf = {
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
      $t.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), $t.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class v1 {
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
    delete t.breakpointConfig, this.opts = qt(t, Wf), this.opts.breakpointConfig = e || Wf.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new qb(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Yf(this, this.opts.breakpointConfig) : this.breakpoints = new Yf(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new Ub(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = Oo(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && ($t.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(Ba, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent($a, this), this.initializedEvent = new window.CustomEvent(Hc, this), this.readyEvent = new window.CustomEvent(Po, this), this.revealedEvent = new window.CustomEvent(Fi, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", Vf(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", Vf(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks($a), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(Hc), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(Po), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), $t.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Hf.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Hf.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(lm, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, $t.set(document.body, { overflow: "hidden" }), $t.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(cm, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, $t.set(document.body, { overflow: t }), $t.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
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
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? r = t : r = { y: t, autoKill: !1 }, $t.to(window, {
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Fi));
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
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(hm, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(fm, t), window.dispatchEvent(e));
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
    $t.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
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
    const t = $t.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          $t.set([e, i], { display: "none" });
        });
        break;
      case 1:
        $t.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        $t.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        st.hasClass(i, "visible") ? ($t.set(n, { width: "auto" }), $t.to(n, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : ($t.set(n, { width: 0 }), i.classList.toggle("visible"), $t.to(n, {
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
function lt(s, t) {
  return X(s, t, { duration: 0 });
}
function oo(s, t, e = {}) {
  const i = typeof s == "string" ? document.querySelector(s) : s;
  return t === 0 ? X(i, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      i.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (i.style.visibility = "visible", X(i, { opacity: t }, e));
}
function ir(s, t = "all") {
  const e = typeof s == "string" ? document.querySelector(s) : s;
  t === "all" ? e.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((n) => {
    e.style.removeProperty(n);
  });
}
function qf(s, t) {
  return new Promise((e) => {
    Rb(() => {
      t(), e();
    }, s);
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
          delete o.autoAlpha, await oo(i, n.autoAlpha, o).finished;
        } else
          await X(i, n, r).finished;
      } else e[0] === "call" && e[1]();
  }
}
const Xb = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s);
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, easing: "ease-in", at: 0 }]
    ];
    X(e).finished.then(() => {
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
    X(e).finished.then(() => {
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
    s.cc.style.display = "block", lt(s.cc, { opacity: 1 }), lt(s.inner, { opacity: 1 });
    const t = [
      [s.cc, { y: ["120%", "0%"] }, { duration: 0.5, easing: "ease-out", at: 1 }],
      [s.text, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.15 }],
      [s.btns, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.5 }]
    ];
    X(t);
  }
};
class w1 {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, Xb), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Fi, () => {
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
const Gb = {};
class b1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, Gb), this.initialize();
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
        X([
          [r, { opacity: 0 }, { duration: 0.5, easing: "ease-in", at: 0 }],
          [n, { opacity: 0 }, { duration: 1, easing: "ease-in", at: 0 }],
          [o, { opacity: 1 }, { duration: 0.5, easing: "ease-out", at: 0.5 }],
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
class jb {
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
      const c = new RegExp(`^${f}$`), g = e.match(c);
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
const Zb = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (s) => {
  }
};
class x1 {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = st.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = st.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = st.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = qt(i, Zb), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = st.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new jb(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
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
const Qb = {
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
    if (this.app = t, this.opts = qt(e, Qb), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = $t.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = st.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
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
const Jb = {};
class S1 {
  constructor(t, e, i = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = qt(i, Jb), this.selector = e, this.initialize(), window.addEventListener(Ui, () => {
      ir("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
    });
  }
  initialize() {
    const t = st.all(this.container, "[data-eq-height-elements]");
    Array.from(t).forEach((e) => {
      let i = null;
      const n = [];
      let r = [], o = 0;
      st.all(e, this.selector).forEach((l) => {
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
function zo(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(Wu, () => {
      e({ img: s, status: "ok" });
    }) : s.complete ? e({ img: s, status: "ok" }) : (s.onload = () => {
      e({ img: s, status: "ok" });
    }, s.onerror = () => {
      e({ img: s, status: "error" });
    });
  });
}
function qu(s, t = !1) {
  s && s.nodeType && (s = s.querySelectorAll("img"));
  const e = [];
  for (let i = 0; i < s.length; i += 1) {
    const n = s[i];
    e.push(zo(n, t));
  }
  return Promise.all(e);
}
const t1 = {
  listenForResize: !0
};
class E1 {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = qt(e, t1), this.initialize(), e.listenForResize && window.addEventListener(Ui, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let n = [], r = 0;
      const o = st.all(t, "img");
      o.length !== 0 && qu(o, !1).then(() => {
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
const gm = {
  onPin: (s) => {
    X(s.el, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, X(s.el, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      easing: "ease-in"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onAltBg: (s) => {
    s.opts.altBgColor && X(s.el, {
      backgroundColor: s.opts.altBgColor
    }, {
      duration: 0.2
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && X(s.el, {
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
}, e1 = {
  el: "header[data-nav]",
  on: Fi,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      lt(s.el, { yPercent: -100 }), lt(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      X(s.el, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), X(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: hr(0.1, { startDelay: s.opts.enterDelay }),
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
    ...gm
  }
};
class A1 {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, e1), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
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
    ), this.app.registerCallback(Fi, () => {
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
      Po,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      Ui,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Fi, () => {
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
    return e = qt(i, gm, e.default || {}), e;
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
const i1 = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class C1 {
  constructor(t, e) {
    this.app = t, this.opts = qt(e, i1);
    const i = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    lt(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (lt(i, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const n1 = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class O1 {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, n1), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
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
    const { element: i, factor: n, fadeContent: r, orientation: o } = t, a = i.getBoundingClientRect(), l = this.app.size.height, u = l / 2, c = (a.top + a.height / 2 - u) / l * n * 100;
    let g = 1;
    if (r) {
      const _ = a.top / l;
      _ <= 0 ? g = Math.max(0, 1 + _ * 1.5) : _ >= 0.7 && (g = Math.max(0, 1 - (_ - 0.7) * 3.33)), g = Math.max(0, Math.min(1, g));
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
const s1 = {
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
    X(s.el, { opacity: 1 }, { duration: 0.25 }), e && s.slides.length > 1 && X(
      e,
      { scale: [1, s.opts.transition.scale] },
      { type: "tween", duration: s.opts.interval, ease: "linear" }
    ).finished.then(t);
  }
};
class P1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, s1), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), lt(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e, i) => {
      lt(e, {
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
      n ? lt(n, {
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
    this.app.registerCallback(Fi, () => {
      const e = this.slides[this._currentSlideIdx].querySelector("img");
      e && zo(e, this.opts.lazyImages).then(() => {
        this.opts.onFadeIn(this, t);
      });
    });
  }
  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    Oo() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    switch (t) {
      case "fade":
        {
          lt(this._currentSlide, {
            opacity: 0,
            zIndex: this.opts.zIndex.visible
          }), lt(this._nextSlide, { opacity: 0 });
          const e = this._previousSlide.querySelector(".hero-slide-img"), i = this._currentSlide.querySelector(".hero-slide-img");
          lt(i, { scale: 1 });
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
          X(a).finished.then(() => {
            lt(this._previousSlide, { opacity: 0 }), lt(this._currentSlide, { opacity: 1 }), lt(e, { scale: 1 }), this._nextSlide.style.zIndex = this.opts.zIndex.visible, this._currentSlide.style.zIndex = this.opts.zIndex.regular, this._previousSlide.style.zIndex = this.opts.zIndex.regular, this.next();
          });
        }
        break;
      case "parallax":
        {
          lt(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            width: "100%",
            opacity: 1
            // Make sure it's visible underneath
          }), lt(this._previousSlide, { overflow: "hidden" });
          const e = this._previousSlide.querySelector(".hero-slide-img"), i = this._currentSlide.querySelector(".hero-slide-img");
          lt(i, { scale: 1 });
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
          X(a).finished.then(() => {
            lt(this._nextSlide, { zIndex: this.opts.zIndex.next, opacity: 1 }), lt(this._currentSlide, {
              zIndex: this.opts.zIndex.visible,
              width: "100%",
              opacity: 1
            }), lt(this._previousSlide, {
              zIndex: this.opts.zIndex.regular,
              width: "100%",
              opacity: 0
              // Hide previous slide
            }), lt(e, { scale: 1 }), this.next();
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
    this.resizeAnimation && this.resizeAnimation.stop(), this.resizeAnimation = X(
      this.images,
      { width: document.body.clientWidth },
      { duration: 0.15 }
    );
  }
}
const r1 = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    oo(s.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (s) => {
    oo(s.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (s) => {
    oo(s.cover, 0, { duration: 0.35 });
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
class k1 {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = qt(e, r1), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), lt(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = st.find(this.el, "[data-cover]"), this.cover && oo(this.cover, 0, { duration: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), lt(this.videoDiv, {
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
    this.video.muted = !0, lt(this.video, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0
    }), this.cover && zo(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(Po, () => {
      !this.video.playing && !Oo() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (Oo() ? lt(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
function Ll(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const o1 = {
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
class M1 {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, o1), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
      i.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Fi, () => {
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
            (l.isIntersecting || l.intersectionRatio > 0) && (qu(r, !0).then(() => {
              Ll(i, pm);
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
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), Ll(n, Wu);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), Ll(e, dm));
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
const a1 = {
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
    s.app.scrollLock(), X(s.elements.wrapper, { opacity: 1 }, { duration: 0.5 });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && X(s.elements.caption, { opacity: 0 }, { duration: 0.45 }), X(
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
      X(s.elements.wrapper, { opacity: 0 }, { duration: 0.45 }).finished.then(() => {
        s.app.scrollRelease(), s.destroy();
      });
    });
  }
};
class I1 {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, a1), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: new Uf(),
      image: new Uf()
    }, this.lightboxes.forEach((i) => {
      const n = i.getAttribute("data-lightbox"), r = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), l = i.getAttribute("data-lightbox-section") || "general";
      let u = i;
      this.opts.trigger && (u = st.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, l) || (this.sections[l] = []);
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
      lt(o, { opacity: 0 }), o.style.visibility = "hidden", o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
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
    }), this.elements.caption && this.opts.onCaptionIn(this, i), zo(this.nextImage).then(() => {
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
const l1 = {
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
    r ? (lt(r, { display: "block", opacity: 0 }), e && (X(e, { y: 25 }, { duration: 0.8, easing: "ease-out" }), X(e, { opacity: 0 }, { duration: 0.2 })), i && X(i, { opacity: 0 }, { duration: 0.2 }), n && X(n, { opacity: 0 }, { duration: 0.2 }), X(r, { opacity: 1 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    })) : (e && (X(e, { y: 25 }, { duration: 0.8, easing: "ease-out" }), X(e, { opacity: 0 }, { duration: 0.2 })), i && X(i, { opacity: 0 }, { duration: 0.2 }), n && X(n, { opacity: 0 }, { duration: 0.2 }), X(e, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
      window.location = s;
    }));
  }
};
class D1 {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, l1);
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
            const c = a.hash, g = document.querySelector(c);
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
const c1 = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: !0,
  paddingLeft: 0,
  //DEPRECATED
  startProgress: 0,
  spacer: "<span>&nbsp;&mdash;&nbsp;</span>",
  onReveal: (s) => {
    X(s, { opacity: 1 }, { easing: "linear" });
  }
};
class L1 {
  constructor(t, e, i) {
    this.opts = qt(i, c1), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = st.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = st.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = st.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
  }
  initialize() {
    lt(this.elements.$marquee, { opacity: 0 }), window.addEventListener("APPLICATION:RESIZE", this.updateMarquee.bind(this)), window.addEventListener("APPLICATION:REVEALED", this.revealMarquee.bind(this)), this.updateMarquee(), this.setupObserver(), this.opts.slowDownOnHover && (this.elements.$el.addEventListener("mouseenter", this.slowDown.bind(this)), this.elements.$el.addEventListener("mouseleave", this.speedUp.bind(this)));
  }
  revealMarquee(t) {
    this.updateMarquee(), this.opts.onReveal(this.elements.$marquee);
  }
  updateMarquee(t) {
    if (t && !t.detail.widthChanged)
      return;
    this.killTweens(), this.clearHolders(), this.fillText(), this.setHeight();
    const e = this.elements.$holder.offsetWidth, i = st.all(this.elements.$el, "[data-marquee-holder]"), n = e * i.length;
    this.duration = Math.min(
      (e + n) / this.opts.speed,
      40
    ), lt(this.elements.$marquee, { width: n }), this.initializeTween(), st.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => ir(e, "all"));
  }
  killTweens() {
    this.timeline && (this.timeline.stop(), this.timeline = null), this.speedAnimation && (this.speedAnimation.stop(), this.speedAnimation = null);
  }
  initializeTween() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e, i) => {
      lt(e, {
        position: "absolute",
        left: e.offsetWidth * i,
        transform: "translateZ(0)",
        willChange: "transform"
      });
    }), this.timeline = X(
      t,
      { transform: ["translateX(0) translateZ(0)", "translateX(-100%) translateZ(0)"] },
      { duration: this.duration, easing: "linear", repeat: 1 / 0 }
    ), this.timeline.pause(), this.opts.startProgress > 0 && (this.timeline.currentTime = this.opts.startProgress * this.duration), window.timeline = this.timeline, window.marquee = this;
  }
  play(t = !1) {
    if (this.playing = !0, this.speedAnimation && this.speedAnimation.stop(), t) {
      this.timeline.play();
      const e = { speed: this.timeline.speed || 0 };
      this.speedAnimation = X(
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
    this.speedAnimation = X(
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
    this.speedAnimation = X(
      t,
      { speed: 0.5 },
      {
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1],
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
    this.speedAnimation = X(
      t,
      { speed: 1 },
      {
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1],
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
    ir(this.elements.$el, "height"), ir(this.elements.$marquee, "height"), this.elements.$marquee.innerHTML = "", this.elements.$marquee.appendChild(this.elements.$holder), this.elements.$holder.innerHTML = "", this.elements.$holder.appendChild(this.elements.$item), this.measuredHeight = this.elements.$item.offsetHeight;
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
    const t = this.measuredHeight + this.opts.extraHeight;
    lt(this.elements.$el, { height: t }), lt(this.elements.$marquee, { height: t });
  }
}
const u1 = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: async (s) => {
    s.hamburger.classList.toggle("is-active"), document.body.classList.toggle("open-menu"), lt(s.bg, { x: "0%", opacity: 0, height: window.innerHeight });
    const t = [
      [s.bg, { opacity: 1 }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.logo, { opacity: 0 }, { duration: 0.35, easing: "ease-out", at: 0 }],
      [s.header, { backgroundColor: "transparent" }, { duration: 0.55, easing: "ease-out", at: 0 }]
    ];
    await X(t).finished, s.nav.style.gridTemplateRows = "auto 1fr", lt(s.nav, { height: window.innerHeight }), Array.from(s.content).forEach((n) => lt(n, { display: "block" })), Array.from(s.logoPath).forEach((n) => n.setAttribute("fill", s.opts.logoColor)), lt(s.logo, { x: "3%" });
    const e = X(
      s.lis,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 1, easing: "ease-out", delay: hr(0.05) }
    ), i = X(
      s.logo,
      { opacity: 1, x: ["3%", "0%"] },
      { duration: 0.55, easing: "ease-in-out", at: 0.15 }
    );
    await Promise.all([e.finished, i.finished]), s._emitMobileMenuOpenEvent();
  },
  closeTween: async (s) => {
    document.body.classList.toggle("open-menu"), s.hamburger.classList.toggle("is-active"), await X(s.logo, { opacity: 0, x: "5%" }, { duration: 0.2, easing: "ease-out" }).finished, Array.from(s.logoPath).forEach((e) => e.removeAttribute("fill"));
    const t = X(
      s.lis,
      { opacity: 0, x: 20 },
      { duration: 0.5, easing: "ease-out", delay: hr(0.04) }
    );
    setTimeout(() => {
      X(s.bg, { x: "100%" }, { duration: 0.25, easing: "ease-in" });
    }, 200), await t.finished, ir(s.nav, "height"), s._emitMobileMenuClosedEvent(), Array.from(s.content).forEach((e) => lt(e, { display: "none" })), s.nav.style.gridTemplateRows = "auto", Array.from(s.lis).forEach((e) => ir(e, "opacity")), await X(s.logo, { opacity: 1 }, { duration: 0.35, easing: "ease-in" }).finished;
  }
};
class R1 {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, u1), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
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
      Hu
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      Yu
    );
    window.dispatchEvent(t);
  }
}
const h1 = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Fi,
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
class z1 {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = qt(e, h1), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), Oo() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
      lt(t.children, r);
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? lt(t.el, n.transition.from) : console.error(
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
              X(a.target, l.transition.to, {
                duration: l.duration
              }), t.stage.firstTween = !0;
            }
            if (t.name) {
              const l = i[t.name];
              l || console.error(
                `==> JUPITER: Walk [${t.name}] not found in config`
              ), typeof l.alphaTween == "object" ? l.alphaTween.duration = l.alphaTween.duration ? l.alphaTween.duration : l.duration : l.alphaTween === !0 && (l.alphaTween = {
                duration: l.duration,
                ease: "ease-in"
              });
              const u = {
                duration: l.duration,
                delay: hr(l.interval, {
                  startDelay: l.startDelay || 0
                })
              };
              X(t.children, l.transition.to, u), l.alphaTween && X(
                t.children,
                { opacity: 1 },
                {
                  duration: l.alphaTween.duration,
                  easing: l.alphaTween.ease,
                  delay: hr(l.interval, {
                    startDelay: l.startDelay || 0
                  })
                }
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
    const r = (performance.now() - t.animation.lastStartTime) / 1e3, o = t.animation.lastDelay + t.animation.lastDuration - i;
    return Math.max(0, o - r);
  }
  /**
   * Update the animation state after adding an animation.
   *
   * @param {*} section - The section object
   * @param {*} delay - The delay that was used
   * @param {*} duration - The duration of the animation
   */
  updateAnimationState(t, e, i) {
    t.animation.lastDelay = e, t.animation.lastDuration = i, t.animation.lastStartTime = performance.now();
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
            t.running = !0, a.target.dataset.moonwalkId && console.debug("-- intersecting", a.target.dataset.moonwalkId);
            const l = a.target.getAttribute("data-moonwalk"), u = l.length ? i.walks[l] : i.walks.default, { duration: h, transition: f, interval: d, startDelay: c } = u;
            let { alphaTween: g } = u, p = (h - d) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof g == "object" && g !== null ? g.duration = g.duration ? g.duration : h : g === !0 && (g = {
              duration: h,
              ease: "sine.in"
            });
            const _ = () => {
              f ? this.tweenJS(
                t,
                a.target,
                h,
                d,
                f,
                p,
                g
              ) : this.tweenCSS(
                t,
                a.target,
                h,
                d,
                f,
                p
              );
            }, w = () => {
              c ? qf(c, _) : _();
            };
            if (a.target.tagName === "IMG")
              zo(a.target).then(() => w());
            else if (a.target.hasAttribute("data-placeholder"))
              w();
            else {
              const A = a.target.querySelectorAll("img");
              A.length ? Array.from(A).every(
                (T) => T.hasAttribute("data-ll-placeholder")
              ) ? w() : qu(A).then(() => w()) : w();
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
    if (st.hasAttribute(e, "data-moonwalked"))
      return;
    const l = this.calculateDelay(t, i, o);
    lt(e, r.from);
    const { ease: u, ...h } = r.to, d = X(e, h, {
      duration: i,
      delay: l,
      easing: u || "ease-out"
    });
    d && d.finished ? d.finished.then(() => {
      e.setAttribute("data-moonwalked", "");
    }).catch(() => {
      e.setAttribute("data-moonwalked", "");
    }) : e.setAttribute("data-moonwalked", ""), a && X(e, { opacity: 1 }, {
      duration: a.duration,
      easing: a.ease || "ease-in",
      delay: l + (a.delay || 0)
    }), this.updateAnimationState(t, l, i);
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
    if (st.hasAttribute(e, "data-moonwalked"))
      return;
    const a = this.calculateDelay(
      t,
      i,
      o
    );
    qf(a, () => {
      e.classList.add("moonwalked"), e.setAttribute("data-moonwalked", "");
    }), this.updateAnimationState(t, a, i);
  }
}
const f1 = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, Ar = [];
class F1 {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = qt(i, f1), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), Ar.includes(this) || Ar.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
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
    }, h = this.orderedPositions.slice(l).concat(this.orderedPositions.slice(0, l)).map((f) => u[f]).find((f) => (t || (this.popover.style.top = `${f.top}px`, this.popover.style.left = `${f.left}px`), st.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((f) => {
      this.popover.classList.remove(`${this.className}--${f}`);
    }), h ? (t && this.isVisible ? X(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? X(this.popover, {
      top: Math.max(0, u.bottom.top),
      left: Math.max(0, u.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, u.bottom.top)}px`, this.popover.style.left = `${Math.max(0, u.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = Ar.indexOf(this);
    t !== -1 && Ar.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    Ar.forEach((e) => {
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
const d1 = {
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
    e.backdrop.style.display = "block", X(e.backdrop, { opacity: 1 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "block", X(
        t,
        {
          transform: [
            "translate(calc(-50% - 5px), -50%)",
            "translate(-50%, -50%)"
          ],
          opacity: [0, 1]
        },
        { duration: 0.3, easing: [0.4, 0, 0.2, 1] }
      );
    });
  },
  tweenOut: (s) => {
    console.log("default tweenOut");
    const t = s.currentPopup;
    t && X(t, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "none";
    }), X(s.backdrop, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      s.backdrop.remove();
    });
  }
};
class N1 {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = qt(i, d1), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), e.style.display = "none", e.style.zIndex = "4999", lt(e, { opacity: 0 }), e.addEventListener("click", (i) => {
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
const p1 = {
  onIntersect: (s, t) => {
  }
};
class $1 {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, p1), this.initialize();
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
const g1 = {};
class B1 {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, g1), this.initialize();
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
    lt(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    lt(t, { height: e.clientHeight });
  }
}
const mm = {
  onMainVisible: (s) => {
    X(s.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    X(s.el, {
      opacity: 0
    }, {
      duration: 1
    });
  },
  onPin: (s) => {
    X(s.auxEl, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, X(s.auxEl, {
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
}, m1 = {
  el: "header[data-nav]",
  on: Fi,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      lt(s.el, { opacity: 0 });
    },
    enter: (s) => {
      lt(s.auxEl, { yPercent: -100 }), lt(s.lis, { opacity: 0 }), X(s.auxEl, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), X(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: hr(0.1, { startDelay: s.opts.enterDelay }),
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
    ...mm
  }
};
class V1 {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, m1), this.mainOpts.pinOnOutline && window.addEventListener(ja, () => {
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
    return e = qt(i, mm, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      Hu,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      Yu,
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
class H1 {
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
          X(i, { height: [0, r + "px"] }, {
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
          X(i, { height: 0 }, {
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
            X(n, { height: 0 }, {
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
class Y1 {
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
const W1 = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  v1 as Application,
  Yf as Breakpoints,
  qd as CSSPlugin,
  w1 as Cookies,
  b1 as CoverOverlay,
  x1 as Dataloader,
  st as Dom,
  qa as Draggable,
  T1 as Dropdown,
  S1 as EqualHeightElements,
  E1 as EqualHeightImages,
  y1 as Events,
  A1 as FixedHeader,
  C1 as FooterReveal,
  P1 as HeroSlider,
  k1 as HeroVideo,
  Gp as InertiaPlugin,
  M1 as Lazyload,
  I1 as Lightbox,
  D1 as Links,
  L1 as Marquee,
  R1 as MobileMenu,
  z1 as Moonwalk,
  O1 as Parallax,
  F1 as Popover,
  N1 as Popup,
  $1 as ScrollSpy,
  fr as ScrollToPlugin,
  xt as ScrollTrigger,
  ny as SplitText,
  B1 as StackedBoxes,
  V1 as StickyHeader,
  H1 as Toggler,
  Y1 as Typography,
  qt as _defaultsDeep,
  X as animate,
  $t as gsap,
  zo as imageIsLoaded,
  qu as imagesAreLoaded,
  W1 as loadScript,
  Oo as prefersReducedMotion,
  Vf as rafCallback,
  _1 as scroll,
  hr as stagger
};
