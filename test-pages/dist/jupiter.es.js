function hn(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Ad(s, t) {
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
}, Js = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Lu, Fe, Qt, en = 1e8, qe = 1 / en, Al = Math.PI * 2, vg = Al / 4, bg = 0, Cd = Math.sqrt, wg = Math.cos, xg = Math.sin, Me = function(t) {
  return typeof t == "string";
}, ne = function(t) {
  return typeof t == "function";
}, bn = function(t) {
  return typeof t == "number";
}, Ru = function(t) {
  return typeof t > "u";
}, sn = function(t) {
  return typeof t == "object";
}, ai = function(t) {
  return t !== !1;
}, Fu = function() {
  return typeof window < "u";
}, Io = function(t) {
  return ne(t) || Me(t);
}, Pd = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ke = Array.isArray, Cl = /(?:-?\.?\d|\.)+/gi, Od = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Rs = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Za = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, kd = /[+-]=-?[.\d]+/, Md = /[^,'"\[\]\s]+/gi, Tg = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, te, Xi, Pl, zu, wi = {}, ha = {}, Id, Dd = function(t) {
  return (ha = tr(t, wi)) && Wt;
}, Nu = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, to = function(t, e) {
  return !e && console.warn(t);
}, Ld = function(t, e) {
  return t && (wi[t] = e) && ha && (ha[t] = e) || wi;
}, eo = function() {
  return 0;
}, Sg = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Zo = {
  suppressEvents: !0,
  kill: !1
}, Eg = {
  suppressEvents: !0
}, $u = {}, Rn = [], Ol = {}, Rd, pi = {}, Qa = {}, Yc = 30, Qo = [], Bu = "", Vu = function(t) {
  var e = t[0], i, n;
  if (sn(e) || ne(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (n = Qo.length; n-- && !Qo[n].targetTest(e); )
      ;
    i = Qo[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new of(t[n], i))) || t.splice(n, 1);
  return t;
}, ns = function(t) {
  return t._gsap || Vu(Mi(t))[0]._gsap;
}, Fd = function(t, e, i) {
  return (i = t[e]) && ne(i) ? t[e]() : Ru(i) && t.getAttribute && t.getAttribute(e) || i;
}, li = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, le = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ye = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Vs = function(t, e) {
  var i = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + n : i === "-" ? t - n : i === "*" ? t * n : t / n;
}, Ag = function(t, e) {
  for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; )
    ;
  return n < i;
}, da = function() {
  var t = Rn.length, e = Rn.slice(0), i, n;
  for (Ol = {}, Rn.length = 0, i = 0; i < t; i++)
    n = e[i], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Hu = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, zd = function(t, e, i, n) {
  Rn.length && !Fe && da(), t.render(e, i, !!(Fe && e < 0 && Hu(t))), Rn.length && !Fe && da();
}, Nd = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Md).length < 2 ? e : Me(t) ? t.trim() : t;
}, $d = function(t) {
  return t;
}, xi = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Cg = function(t) {
  return function(e, i) {
    for (var n in i)
      n in e || n === "duration" && t || n === "ease" || (e[n] = i[n]);
  };
}, tr = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Wc = function s(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = sn(e[i]) ? s(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, fa = function(t, e) {
  var i = {}, n;
  for (n in t)
    n in e || (i[n] = t[n]);
  return i;
}, Rr = function(t) {
  var e = t.parent || te, i = t.keyframes ? Cg(Ke(t.keyframes)) : xi;
  if (ai(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Pg = function(t, e) {
  for (var i = t.length, n = i === e.length; n && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Bd = function(t, e, i, n, r) {
  var o = t[n], a;
  if (r)
    for (a = e[r]; o && o[r] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e;
}, Da = function(t, e, i, n) {
  i === void 0 && (i = "_first"), n === void 0 && (n = "_last");
  var r = e._prev, o = e._next;
  r ? r._next = o : t[i] === e && (t[i] = o), o ? o._prev = r : t[n] === e && (t[n] = r), e._next = e._prev = e.parent = null;
}, Bn = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, ss = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Og = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, kl = function(t, e, i, n) {
  return t._startAt && (Fe ? t._startAt.revert(Zo) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, kg = function s(t) {
  return !t || t._ts && s(t.parent);
}, qc = function(t) {
  return t._repeat ? er(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, er = function(t, e) {
  var i = Math.floor(t = ye(t / e));
  return t && i === t ? i - 1 : i;
}, pa = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, La = function(t) {
  return t._end = ye(t._start + (t._tDur / Math.abs(t._ts || t._rts || qe) || 0));
}, Ra = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = ye(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), La(t), i._dirty || ss(i, t)), t;
}, Vd = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = pa(t.rawTime(), e), (!e._dur || xo(0, e.totalDuration(), i) - e._tTime > qe) && e.render(i, !0)), ss(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -1e-8;
  }
}, Zi = function(t, e, i, n) {
  return e.parent && Bn(e), e._start = ye((bn(i) ? i : i || t !== te ? Pi(t, i, e) : t._time) + e._delay), e._end = ye(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Bd(t, e, "_first", "_last", t._sort ? "_start" : 0), Ml(e) || (t._recent = e), n || Vd(t, e), t._ts < 0 && Ra(t, t._tTime), t;
}, Hd = function(t, e) {
  return (wi.ScrollTrigger || Nu("scrollTrigger", e)) && wi.ScrollTrigger.create(e, t);
}, Yd = function(t, e, i, n, r) {
  if (Wu(t, e, r), !t._initted)
    return 1;
  if (!i && t._pt && !Fe && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Rd !== gi.frame)
    return Rn.push(t), t._lazy = [r, n], 1;
}, Mg = function s(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || s(e));
}, Ml = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Ig = function(t, e, i, n) {
  var r = t.ratio, o = e < 0 || !e && (!t._start && Mg(t) && !(!t._initted && Ml(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ml(t)) ? 0 : 1, a = t._rDelay, l = 0, c, h, d;
  if (a && t._repeat && (l = xo(0, t._tDur, e), h = er(l, a), t._yoyo && h & 1 && (o = 1 - o), h !== er(t._tTime, a) && (r = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== r || Fe || n || t._zTime === qe || !e && t._zTime) {
    if (!t._initted && Yd(t, e, n, i, l))
      return;
    for (d = t._zTime, t._zTime = e || (i ? qe : 0), i || (i = e && !d), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && kl(t, e, i, !0), t._onUpdate && !i && vi(t, "onUpdate"), l && t._repeat && !i && t.parent && vi(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Bn(t, 1), !i && !Fe && (vi(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Dg = function(t, e, i) {
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
}, ir = function(t, e, i, n) {
  var r = t._repeat, o = ye(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = r ? r < 0 ? 1e10 : ye(o * (r + 1) + t._rDelay * r) : o, a > 0 && !n && Ra(t, t._tTime = t._tDur * a), t.parent && La(t), i || ss(t.parent, t), t;
}, Uc = function(t) {
  return t instanceof ii ? ss(t) : ir(t, t._dur);
}, Lg = {
  _start: 0,
  endTime: eo,
  totalDuration: eo
}, Pi = function s(t, e, i) {
  var n = t.labels, r = t._recent || Lg, o = t.duration() >= en ? r.endTime(!1) : t._dur, a, l, c;
  return Me(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), c = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? r._start : r.endTime(r._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (a < 0 ? r : i).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), c && i && (l = l / 100 * (Ke(i) ? i[0] : i).totalDuration()), a > 1 ? s(t, e.substr(0, a - 1), i) + l : o + l)) : e == null ? o : +e;
}, Fr = function(t, e, i) {
  var n = bn(e[1]), r = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[r], a, l;
  if (n && (o.duration = e[1]), o.parent = i, t) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = ai(l.vars.inherit) && l.parent;
    o.immediateRender = ai(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[r - 1];
  }
  return new _e(e[0], o, e[r + 1]);
}, Wn = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, xo = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, He = function(t, e) {
  return !Me(t) || !(e = Tg.exec(t)) ? "" : e[1];
}, Rg = function(t, e, i) {
  return Wn(i, function(n) {
    return xo(t, e, n);
  });
}, Il = [].slice, Wd = function(t, e) {
  return t && sn(t) && "length" in t && (!e && !t.length || t.length - 1 in t && sn(t[0])) && !t.nodeType && t !== Xi;
}, Fg = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(n) {
    var r;
    return Me(n) && !e || Wd(n, 1) ? (r = i).push.apply(r, Mi(n)) : i.push(n);
  }) || i;
}, Mi = function(t, e, i) {
  return Qt && !e && Qt.selector ? Qt.selector(t) : Me(t) && !i && (Pl || !nr()) ? Il.call((e || zu).querySelectorAll(t), 0) : Ke(t) ? Fg(t, i) : Wd(t) ? Il.call(t, 0) : t ? [t] : [];
}, Dl = function(t) {
  return t = Mi(t)[0] || to("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return Mi(e, i.querySelectorAll ? i : i === t ? to("Invalid scope") || zu.createElement("div") : t);
  };
}, qd = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Ud = function(t) {
  if (ne(t))
    return t;
  var e = sn(t) ? t : {
    each: t
  }, i = rs(e.ease), n = e.from || 0, r = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, c = e.axis, h = n, d = n;
  return Me(n) ? h = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (h = n[0], d = n[1]), function(f, u, m) {
    var p = (m || e).length, _ = o[p], b, A, C, T, y, O, P, S, k;
    if (!_) {
      if (k = e.grid === "auto" ? 0 : (e.grid || [1, en])[1], !k) {
        for (P = -1e8; P < (P = m[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (_ = o[p] = [], b = l ? Math.min(k, p) * h - 0.5 : n % k, A = k === en ? 0 : l ? p * d / k - 0.5 : n / k | 0, P = 0, S = en, O = 0; O < p; O++)
        C = O % k - b, T = A - (O / k | 0), _[O] = y = c ? Math.abs(c === "y" ? T : C) : Cd(C * C + T * T), y > P && (P = y), y < S && (S = y);
      n === "random" && qd(_), _.max = P - S, _.min = S, _.v = p = (parseFloat(e.amount) || parseFloat(e.each) * (k > p ? p - 1 : c ? c === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (n === "edges" ? -1 : 1), _.b = p < 0 ? r - p : r, _.u = He(e.amount || e.each) || 0, i = i && p < 0 ? nf(i) : i;
    }
    return p = (_[f] - _.min) / _.max || 0, ye(_.b + (i ? i(p) : p) * _.v) + _.u;
  };
}, Ll = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var n = ye(Math.round(parseFloat(i) / t) * t * e);
    return (n - n % 1) / e + (bn(i) ? 0 : He(i));
  };
}, Kd = function(t, e) {
  var i = Ke(t), n, r;
  return !i && sn(t) && (n = i = t.radius || en, t.values ? (t = Mi(t.values), (r = !bn(t[0])) && (n *= n)) : t = Ll(t.increment)), Wn(e, i ? ne(t) ? function(o) {
    return r = t(o), Math.abs(r - o) <= n ? r : o;
  } : function(o) {
    for (var a = parseFloat(r ? o.x : o), l = parseFloat(r ? o.y : 0), c = en, h = 0, d = t.length, f, u; d--; )
      r ? (f = t[d].x - a, u = t[d].y - l, f = f * f + u * u) : f = Math.abs(t[d] - a), f < c && (c = f, h = d);
    return h = !n || c <= n ? t[h] : o, r || h === o || bn(o) ? h : h + He(o);
  } : Ll(t));
}, Xd = function(t, e, i, n) {
  return Wn(Ke(t) ? !e : i === !0 ? !!(i = 0) : !n, function() {
    return Ke(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * n) / n;
  });
}, zg = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}, Ng = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || He(i));
  };
}, $g = function(t, e, i) {
  return jd(t, e, 0, 1, i);
}, Gd = function(t, e, i) {
  return Wn(i, function(n) {
    return t[~~e(n)];
  });
}, Bg = function s(t, e, i) {
  var n = e - t;
  return Ke(t) ? Gd(t, s(0, t.length), e) : Wn(i, function(r) {
    return (n + (r - t) % n) % n + t;
  });
}, Vg = function s(t, e, i) {
  var n = e - t, r = n * 2;
  return Ke(t) ? Gd(t, s(0, t.length - 1), e) : Wn(i, function(o) {
    return o = (r + (o - t) % r) % r || 0, t + (o > n ? r - o : o);
  });
}, io = function(t) {
  for (var e = 0, i = "", n, r, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", r = t.substr(n + 7, o - n - 7).match(a ? Md : Cl), i += t.substr(e, n - e) + Xd(a ? r : +r[0], a ? 0 : +r[1], +r[2] || 1e-5), e = o + 1;
  return i + t.substr(e, t.length - e);
}, jd = function(t, e, i, n, r) {
  var o = e - t, a = n - i;
  return Wn(r, function(l) {
    return i + ((l - t) / o * a || 0);
  });
}, Hg = function s(t, e, i, n) {
  var r = isNaN(t + e) ? 0 : function(u) {
    return (1 - u) * t + u * e;
  };
  if (!r) {
    var o = Me(t), a = {}, l, c, h, d, f;
    if (i === !0 && (n = 1) && (i = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (Ke(t) && !Ke(e)) {
      for (h = [], d = t.length, f = d - 2, c = 1; c < d; c++)
        h.push(s(t[c - 1], t[c]));
      d--, r = function(m) {
        m *= d;
        var p = Math.min(f, ~~m);
        return h[p](m - p);
      }, i = e;
    } else n || (t = tr(Ke(t) ? [] : {}, t));
    if (!h) {
      for (l in e)
        Yu.call(a, t, l, "get", e[l]);
      r = function(m) {
        return Ku(m, a) || (o ? t.p : t);
      };
    }
  }
  return Wn(i, r);
}, Kc = function(t, e, i) {
  var n = t.labels, r = en, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!i && a && r > (a = Math.abs(a)) && (l = o, r = a);
  return l;
}, vi = function(t, e, i) {
  var n = t.vars, r = n[e], o = Qt, a = t._ctx, l, c, h;
  if (r)
    return l = n[e + "Params"], c = n.callbackScope || t, i && Rn.length && da(), a && (Qt = a), h = l ? r.apply(c, l) : r.call(c), Qt = o, h;
}, wr = function(t) {
  return Bn(t), t.scrollTrigger && t.scrollTrigger.kill(!!Fe), t.progress() < 1 && vi(t, "onInterrupt"), t;
}, Fs, Zd = [], Qd = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Fu() || t.headless) {
      var e = t.name, i = ne(t), n = e && !i && t.init ? function() {
        this._props = [];
      } : t, r = {
        init: eo,
        render: Ku,
        add: Yu,
        kill: s0,
        modifier: n0,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Uu,
        aliases: {},
        register: 0
      };
      if (nr(), t !== n) {
        if (pi[e])
          return;
        xi(n, xi(fa(t, r), o)), tr(n.prototype, tr(r, fa(t, o))), pi[n.prop = e] = n, t.targetTest && (Qo.push(n), $u[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Ld(e, n), t.register && t.register(Wt, n, ui);
    } else
      Zd.push(t);
}, Vt = 255, xr = {
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
}, Ja = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Vt + 0.5 | 0;
}, Jd = function(t, e, i) {
  var n = t ? bn(t) ? [t >> 16, t >> 8 & Vt, t & Vt] : 0 : xr.black, r, o, a, l, c, h, d, f, u, m;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), xr[t])
      n = xr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (r = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + r + r + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & Vt, n & Vt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & Vt, t & Vt];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = m = t.match(Cl), !e)
        l = +n[0] % 360 / 360, c = +n[1] / 100, h = +n[2] / 100, o = h <= 0.5 ? h * (c + 1) : h + c - h * c, r = h * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = Ja(l + 1 / 3, r, o), n[1] = Ja(l, r, o), n[2] = Ja(l - 1 / 3, r, o);
      else if (~t.indexOf("="))
        return n = t.match(Od), i && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(Cl) || xr.transparent;
    n = n.map(Number);
  }
  return e && !m && (r = n[0] / Vt, o = n[1] / Vt, a = n[2] / Vt, d = Math.max(r, o, a), f = Math.min(r, o, a), h = (d + f) / 2, d === f ? l = c = 0 : (u = d - f, c = h > 0.5 ? u / (2 - d - f) : u / (d + f), l = d === r ? (o - a) / u + (o < a ? 6 : 0) : d === o ? (a - r) / u + 2 : (r - o) / u + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(h * 100 + 0.5)), i && n.length < 4 && (n[3] = 1), n;
}, tf = function(t) {
  var e = [], i = [], n = -1;
  return t.split(Fn).forEach(function(r) {
    var o = r.match(Rs) || [];
    e.push.apply(e, o), i.push(n += o.length + 1);
  }), e.c = i, e;
}, Xc = function(t, e, i) {
  var n = "", r = (t + n).match(Fn), o = e ? "hsla(" : "rgba(", a = 0, l, c, h, d;
  if (!r)
    return t;
  if (r = r.map(function(f) {
    return (f = Jd(f, e, 1)) && o + (e ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), i && (h = tf(t), l = i.c, l.join(n) !== h.c.join(n)))
    for (c = t.replace(Fn, "1").split(Rs), d = c.length - 1; a < d; a++)
      n += c[a] + (~l.indexOf(a) ? r.shift() || o + "0,0,0,0)" : (h.length ? h : r.length ? r : i).shift());
  if (!c)
    for (c = t.split(Fn), d = c.length - 1; a < d; a++)
      n += c[a] + r[a];
  return n + c[d];
}, Fn = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in xr)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
}(), Yg = /hsl[a]?\(/, ef = function(t) {
  var e = t.join(" "), i;
  if (Fn.lastIndex = 0, Fn.test(e))
    return i = Yg.test(e), t[1] = Xc(t[1], i), t[0] = Xc(t[0], i, tf(t[1])), !0;
}, no, gi = function() {
  var s = Date.now, t = 500, e = 33, i = s(), n = i, r = 1e3 / 240, o = r, a = [], l, c, h, d, f, u, m = function p(_) {
    var b = s() - n, A = _ === !0, C, T, y, O;
    if ((b > t || b < 0) && (i += b - e), n += b, y = n - i, C = y - o, (C > 0 || A) && (O = ++d.frame, f = y - d.time * 1e3, d.time = y = y / 1e3, o += C + (C >= r ? 4 : r - C), T = 1), A || (l = c(p)), T)
      for (u = 0; u < a.length; u++)
        a[u](y, f, O, _);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(_) {
      return f / (1e3 / (_ || 60));
    },
    wake: function() {
      Id && (!Pl && Fu() && (Xi = Pl = window, zu = Xi.document || {}, wi.gsap = Wt, (Xi.gsapVersions || (Xi.gsapVersions = [])).push(Wt.version), Dd(ha || Xi.GreenSockGlobals || !Xi.gsap && Xi || {}), Zd.forEach(Qd)), h = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && d.sleep(), c = h || function(_) {
        return setTimeout(_, o - d.time * 1e3 + 1 | 0);
      }, no = 1, m(2));
    },
    sleep: function() {
      (h ? cancelAnimationFrame : clearTimeout)(l), no = 0, c = eo;
    },
    lagSmoothing: function(_, b) {
      t = _ || 1 / 0, e = Math.min(b || 33, t);
    },
    fps: function(_) {
      r = 1e3 / (_ || 240), o = d.time * 1e3 + r;
    },
    add: function(_, b, A) {
      var C = b ? function(T, y, O, P) {
        _(T, y, O, P), d.remove(C);
      } : _;
      return d.remove(_), a[A ? "unshift" : "push"](C), nr(), C;
    },
    remove: function(_, b) {
      ~(b = a.indexOf(_)) && a.splice(b, 1) && u >= b && u--;
    },
    _listeners: a
  }, d;
}(), nr = function() {
  return !no && gi.wake();
}, Et = {}, Wg = /^[\d.\-M][\d.\-,\s]/, qg = /["']/g, Ug = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), n = i[0], r = 1, o = i.length, a, l, c; r < o; r++)
    l = i[r], a = r !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), e[n] = isNaN(c) ? c.replace(qg, "").trim() : +c, n = l.substr(a + 1).trim();
  return e;
}, Kg = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < i ? t.indexOf(")", i + 1) : i);
}, Xg = function(t) {
  var e = (t + "").split("("), i = Et[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [Ug(e[1])] : Kg(t).split(",").map(Nd)) : Et._CE && Wg.test(t) ? Et._CE("", t) : i;
}, nf = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, sf = function s(t, e) {
  for (var i = t._first, n; i; )
    i instanceof ii ? s(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? s(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next;
}, rs = function(t, e) {
  return t && (ne(t) ? t : Et[t] || Xg(t)) || e;
}, bs = function(t, e, i, n) {
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
  return li(t, function(a) {
    Et[a] = wi[a] = r, Et[o = a.toLowerCase()] = i;
    for (var l in r)
      Et[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = Et[a + "." + l] = r[l];
  }), r;
}, rf = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, tl = function s(t, e, i) {
  var n = e >= 1 ? e : 1, r = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = r / Al * (Math.asin(1 / n) || 0), a = function(h) {
    return h === 1 ? 1 : n * Math.pow(2, -10 * h) * xg((h - o) * r) + 1;
  }, l = t === "out" ? a : t === "in" ? function(c) {
    return 1 - a(1 - c);
  } : rf(a);
  return r = Al / r, l.config = function(c, h) {
    return s(t, c, h);
  }, l;
}, el = function s(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, n = t === "out" ? i : t === "in" ? function(r) {
    return 1 - i(1 - r);
  } : rf(i);
  return n.config = function(r) {
    return s(t, r);
  }, n;
};
li("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var e = t < 5 ? t + 1 : t;
  bs(s + ",Power" + (e - 1), t ? function(i) {
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
bs("Elastic", tl("in"), tl("out"), tl());
(function(s, t) {
  var e = 1 / t, i = 2 * e, n = 2.5 * e, r = function(a) {
    return a < e ? s * a * a : a < i ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  bs("Bounce", function(o) {
    return 1 - r(1 - o);
  }, r);
})(7.5625, 2.75);
bs("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
bs("Circ", function(s) {
  return -(Cd(1 - s * s) - 1);
});
bs("Sine", function(s) {
  return s === 1 ? 1 : -wg(s * vg) + 1;
});
bs("Back", el("in"), el("out"), el());
Et.SteppedEase = Et.steps = wi.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, n = t + (e ? 0 : 1), r = e ? 1 : 0, o = 1 - qe;
    return function(a) {
      return ((n * xo(0, o, a) | 0) + r) * i;
    };
  }
};
Js.ease = Et["quad.out"];
li("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Bu += s + "," + s + "Params,";
});
var of = function(t, e) {
  this.id = bg++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Fd, this.set = e ? e.getSetter : Uu;
}, so = /* @__PURE__ */ function() {
  function s(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, ir(this, +e.duration, 1, 1), this.data = e.data, Qt && (this._ctx = Qt, Qt.data.push(this)), no || gi.wake();
  }
  var t = s.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, ir(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, n) {
    if (nr(), !arguments.length)
      return this._tTime;
    var r = this._dp;
    if (r && r.smoothChildTiming && this._ts) {
      for (Ra(this, i), !r._dp || r.parent || Vd(r, this); r && r.parent; )
        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Zi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !n || this._initted && Math.abs(this._zTime) === qe || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), zd(this, i, n)), this;
  }, t.time = function(i, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + qc(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(i, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + qc(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, n) {
    var r = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * r, n) : this._repeat ? er(this._tTime, r) + 1 : 1;
  }, t.timeScale = function(i, n) {
    if (!arguments.length)
      return this._rts === -1e-8 ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var r = this.parent && this._ts ? pa(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -1e-8 ? 0 : this._rts, this.totalTime(xo(-Math.abs(this._delay), this.totalDuration(), r), n !== !1), La(this), Og(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (nr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== qe && (this._tTime -= qe)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Zi(n, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (ai(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var n = this.parent || this._dp;
    return n ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? pa(n.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Eg);
    var n = Fe;
    return Fe = i, Hu(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Fe = n, this;
  }, t.globalTime = function(i) {
    for (var n = this, r = arguments.length ? i : n.rawTime(); n; )
      r = n._start + r / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : r;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Uc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = i, Uc(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, n) {
    return this.totalTime(Pi(this, i), ai(n));
  }, t.restart = function(i, n) {
    return this.play().totalTime(i ? -this._delay : 0, ai(n)), this._dur || (this._zTime = -1e-8), this;
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
      var o = ne(i) ? i : $d, a = function() {
        var c = n.then;
        n.then = null, ne(o) && (o = o(n)) && (o.then || o === n) && (n.then = c), r(o), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    wr(this);
  }, s;
}();
xi(so.prototype, {
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
var ii = /* @__PURE__ */ function(s) {
  Ad(t, s);
  function t(i, n) {
    var r;
    return i === void 0 && (i = {}), r = s.call(this, i) || this, r.labels = {}, r.smoothChildTiming = !!i.smoothChildTiming, r.autoRemoveChildren = !!i.autoRemoveChildren, r._sort = ai(i.sortChildren), te && Zi(i.parent || te, hn(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), i.scrollTrigger && Hd(hn(r), i.scrollTrigger), r;
  }
  var e = t.prototype;
  return e.to = function(n, r, o) {
    return Fr(0, arguments, this), this;
  }, e.from = function(n, r, o) {
    return Fr(1, arguments, this), this;
  }, e.fromTo = function(n, r, o, a) {
    return Fr(2, arguments, this), this;
  }, e.set = function(n, r, o) {
    return r.duration = 0, r.parent = this, Rr(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new _e(n, r, Pi(this, o), 1), this;
  }, e.call = function(n, r, o) {
    return Zi(this, _e.delayedCall(0, n, r), o);
  }, e.staggerTo = function(n, r, o, a, l, c, h) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = h, o.parent = this, new _e(n, o, Pi(this, l)), this;
  }, e.staggerFrom = function(n, r, o, a, l, c, h) {
    return o.runBackwards = 1, Rr(o).immediateRender = ai(o.immediateRender), this.staggerTo(n, r, o, a, l, c, h);
  }, e.staggerFromTo = function(n, r, o, a, l, c, h, d) {
    return a.startAt = o, Rr(a).immediateRender = ai(a.immediateRender), this.staggerTo(n, r, a, l, c, h, d);
  }, e.render = function(n, r, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, h = n <= 0 ? 0 : ye(n), d = this._zTime < 0 != n < 0 && (this._initted || !c), f, u, m, p, _, b, A, C, T, y, O, P;
    if (this !== te && h > l && n >= 0 && (h = l), h !== this._tTime || o || d) {
      if (a !== this._time && c && (h += this._time - a, n += this._time - a), f = h, T = this._start, C = this._ts, b = !C, d && (c || (a = this._zTime), (n || !r) && (this._zTime = n)), this._repeat) {
        if (O = this._yoyo, _ = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(_ * 100 + n, r, o);
        if (f = ye(h % _), h === l ? (p = this._repeat, f = c) : (y = ye(h / _), p = ~~y, p && p === y && (f = c, p--), f > c && (f = c)), y = er(this._tTime, _), !a && this._tTime && y !== p && this._tTime - y * _ - this._dur <= 0 && (y = p), O && p & 1 && (f = c - f, P = 1), p !== y && !this._lock) {
          var S = O && y & 1, k = S === (O && p & 1);
          if (p < y && (S = !S), a = S ? 0 : h % c ? c : h, this._lock = 1, this.render(a || (P ? 0 : ye(p * _)), r, !c)._lock = 0, this._tTime = h, !r && this.parent && vi(this, "onRepeat"), this.vars.repeatRefresh && !P && (this.invalidate()._lock = 1), a && a !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, k && (this._lock = 2, a = S ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !P && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          sf(this, P);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = Dg(this, ye(a), ye(f)), A && (h -= f - (f = A._start))), this._tTime = h, this._time = f, this._act = !C, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !r && !y && (vi(this, "onStart"), this._tTime !== h))
        return this;
      if (f >= a && n >= 0)
        for (u = this._first; u; ) {
          if (m = u._next, (u._act || f >= u._start) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (f - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (f - u._start) * u._ts, r, o), f !== this._time || !this._ts && !b) {
              A = 0, m && (h += this._zTime = -1e-8);
              break;
            }
          }
          u = m;
        }
      else {
        u = this._last;
        for (var R = n < 0 ? n : f; u; ) {
          if (m = u._prev, (u._act || R <= u._end) && u._ts && A !== u) {
            if (u.parent !== this)
              return this.render(n, r, o);
            if (u.render(u._ts > 0 ? (R - u._start) * u._ts : (u._dirty ? u.totalDuration() : u._tDur) + (R - u._start) * u._ts, r, o || Fe && Hu(u)), f !== this._time || !this._ts && !b) {
              A = 0, m && (h += this._zTime = R ? -1e-8 : qe);
              break;
            }
          }
          u = m;
        }
      }
      if (A && !r && (this.pause(), A.render(f >= a ? 0 : -1e-8)._zTime = f >= a ? 1 : -1, this._ts))
        return this._start = T, La(this), this.render(n, r, o);
      this._onUpdate && !r && vi(this, "onUpdate", !0), (h === l && this._tTime >= this.totalDuration() || !h && a) && (T === this._start || Math.abs(C) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (h === l && this._ts > 0 || !h && this._ts < 0) && Bn(this, 1), !r && !(n < 0 && !a) && (h || a || !l) && (vi(this, h === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, r) {
    var o = this;
    if (bn(r) || (r = Pi(this, r, n)), !(n instanceof so)) {
      if (Ke(n))
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
    return this !== n ? Zi(this, n, r) : this;
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
    return Me(n) ? this.removeLabel(n) : ne(n) ? this.killTweensOf(n) : (n.parent === this && Da(this, n), n === this._recent && (this._recent = this._last), ss(this));
  }, e.totalTime = function(n, r) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ye(gi.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, r), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, r) {
    return this.labels[n] = Pi(this, r), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, r, o) {
    var a = _e.delayedCall(0, r || eo, o);
    return a.data = "isPause", this._hasPause = 1, Zi(this, a, Pi(this, n));
  }, e.removePause = function(n) {
    var r = this._first;
    for (n = Pi(this, n); r; )
      r._start === n && r.data === "isPause" && Bn(r), r = r._next;
  }, e.killTweensOf = function(n, r, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      On !== a[l] && a[l].kill(n, r);
    return this;
  }, e.getTweensOf = function(n, r) {
    for (var o = [], a = Mi(n), l = this._first, c = bn(r), h; l; )
      l instanceof _e ? Ag(l._targets, a) && (c ? (!On || l._initted && l._ts) && l.globalTime(0) <= r && l.globalTime(l.totalDuration()) > r : !r || l.isActive()) && o.push(l) : (h = l.getTweensOf(a, r)).length && o.push.apply(o, h), l = l._next;
    return o;
  }, e.tweenTo = function(n, r) {
    r = r || {};
    var o = this, a = Pi(o, n), l = r, c = l.startAt, h = l.onStart, d = l.onStartParams, f = l.immediateRender, u, m = _e.to(o, xi({
      ease: r.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || qe,
      onStart: function() {
        if (o.pause(), !u) {
          var _ = r.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          m._dur !== _ && ir(m, _, 0, 1).render(m._time, !0, !0), u = 1;
        }
        h && h.apply(m, d || []);
      }
    }, r));
    return f ? m.render(0) : m;
  }, e.tweenFromTo = function(n, r, o) {
    return this.tweenTo(r, xi({
      startAt: {
        time: Pi(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), Kc(this, Pi(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), Kc(this, Pi(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + qe);
  }, e.shiftChildren = function(n, r, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (r)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return ss(this);
  }, e.invalidate = function(n) {
    var r = this._first;
    for (this._lock = 0; r; )
      r.invalidate(n), r = r._next;
    return s.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var r = this._first, o; r; )
      o = r._next, this.remove(r), r = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), ss(this);
  }, e.totalDuration = function(n) {
    var r = 0, o = this, a = o._last, l = en, c, h, d;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (d = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), h = a._start, h > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Zi(o, a, h - a._delay, 1)._lock = 0) : l = h, h < 0 && a._ts && (r -= h, (!d && !o._dp || d && d.smoothChildTiming) && (o._start += h / o._ts, o._time -= h, o._tTime -= h), o.shiftChildren(-h, !1, -1 / 0), l = 0), a._end > r && a._ts && (r = a._end), a = c;
      ir(o, o === te && o._time > r ? o._time : r, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (te._ts && (zd(te, pa(n, te)), Rd = gi.frame), gi.frame >= Yc) {
      Yc += bi.autoSleep || 120;
      var r = te._first;
      if ((!r || !r._ts) && bi.autoSleep && gi._listeners.length < 2) {
        for (; r && !r._ts; )
          r = r._next;
        r || gi.sleep();
      }
    }
  }, t;
}(so);
xi(ii.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Gg = function(t, e, i, n, r, o, a) {
  var l = new ui(this._pt, t, e, 0, 1, df, null, r), c = 0, h = 0, d, f, u, m, p, _, b, A;
  for (l.b = i, l.e = n, i += "", n += "", (b = ~n.indexOf("random(")) && (n = io(n)), o && (A = [i, n], o(A, t, e), i = A[0], n = A[1]), f = i.match(Za) || []; d = Za.exec(n); )
    m = d[0], p = n.substring(c, d.index), u ? u = (u + 1) % 5 : p.substr(-5) === "rgba(" && (u = 1), m !== f[h++] && (_ = parseFloat(f[h - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || h === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: m.charAt(1) === "=" ? Vs(_, m) - _ : parseFloat(m) - _,
      m: u && u < 4 ? Math.round : 0
    }, c = Za.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = a, (kd.test(n) || b) && (l.e = 0), this._pt = l, l;
}, Yu = function(t, e, i, n, r, o, a, l, c, h) {
  ne(n) && (n = n(r || 0, t, o));
  var d = t[e], f = i !== "get" ? i : ne(d) ? c ? t[e.indexOf("set") || !ne(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : d, u = ne(d) ? c ? t0 : cf : qu, m;
  if (Me(n) && (~n.indexOf("random(") && (n = io(n)), n.charAt(1) === "=" && (m = Vs(f, n) + (He(f) || 0), (m || m === 0) && (n = m))), !h || f !== n || Rl)
    return !isNaN(f * n) && n !== "" ? (m = new ui(this._pt, t, e, +f || 0, n - (f || 0), typeof d == "boolean" ? i0 : hf, 0, u), c && (m.fp = c), a && m.modifier(a, this, t), this._pt = m) : (!d && !(e in t) && Nu(e, n), Gg.call(this, t, e, f, n, u, l || bi.stringFilter, c));
}, jg = function(t, e, i, n, r) {
  if (ne(t) && (t = zr(t, r, e, i, n)), !sn(t) || t.style && t.nodeType || Ke(t) || Pd(t))
    return Me(t) ? zr(t, r, e, i, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = zr(t[a], r, e, i, n);
  return o;
}, af = function(t, e, i, n, r, o) {
  var a, l, c, h;
  if (pi[t] && (a = new pi[t]()).init(r, a.rawVars ? e[t] : jg(e[t], n, r, o, i), i, n, o) !== !1 && (i._pt = l = new ui(i._pt, r, t, 0, 1, a.render, a, 0, a.priority), i !== Fs))
    for (c = i._ptLookup[i._targets.indexOf(r)], h = a._props.length; h--; )
      c[a._props[h]] = l;
  return a;
}, On, Rl, Wu = function s(t, e, i) {
  var n = t.vars, r = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, c = n.onUpdate, h = n.runBackwards, d = n.yoyoEase, f = n.keyframes, u = n.autoRevert, m = t._dur, p = t._startAt, _ = t._targets, b = t.parent, A = b && b.data === "nested" ? b.vars.targets : _, C = t._overwrite === "auto" && !Lu, T = t.timeline, y, O, P, S, k, R, V, F, B, J, it, q, H;
  if (T && (!f || !r) && (r = "none"), t._ease = rs(r, Js.ease), t._yEase = d ? nf(rs(d === !0 ? r : d, Js.ease)) : 0, d && t._yoyo && !t._repeat && (d = t._yEase, t._yEase = t._ease, t._ease = d), t._from = !T && !!n.runBackwards, !T || f && !n.stagger) {
    if (F = _[0] ? ns(_[0]).harness : 0, q = F && n[F.prop], y = fa(n, $u), p && (p._zTime < 0 && p.progress(1), e < 0 && h && a && !u ? p.render(-1, !0) : p.revert(h && m ? Zo : Sg), p._lazy = 0), o) {
      if (Bn(t._startAt = _e.set(_, xi({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && ai(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return vi(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Fe || !a && !u) && t._startAt.revert(Zo), a && m && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (h && m && !p) {
      if (e && (a = !1), P = xi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ai(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), q && (P[F.prop] = q), Bn(t._startAt = _e.set(_, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (Fe ? t._startAt.revert(Zo) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        s(t._startAt, qe, qe);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = m && ai(l) || l && !m, O = 0; O < _.length; O++) {
      if (k = _[O], V = k._gsap || Vu(_)[O]._gsap, t._ptLookup[O] = J = {}, Ol[V.id] && Rn.length && da(), it = A === _ ? O : A.indexOf(k), F && (B = new F()).init(k, q || y, t, it, A) !== !1 && (t._pt = S = new ui(t._pt, k, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(tt) {
        J[tt] = S;
      }), B.priority && (R = 1)), !F || q)
        for (P in y)
          pi[P] && (B = af(P, y, t, it, k, A)) ? B.priority && (R = 1) : J[P] = S = Yu.call(t, k, P, "get", y[P], it, A, 0, n.stringFilter);
      t._op && t._op[O] && t.kill(k, t._op[O]), C && t._pt && (On = t, te.killTweensOf(k, J, t.globalTime(e)), H = !t.parent, On = 0), t._pt && l && (Ol[V.id] = 1);
    }
    R && ff(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !H, f && e <= 0 && T.render(en, !0, !0);
}, Zg = function(t, e, i, n, r, o, a, l) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], h, d, f, u;
  if (!c)
    for (c = t._ptCache[e] = [], f = t._ptLookup, u = t._targets.length; u--; ) {
      if (h = f[u][e], h && h.d && h.d._pt)
        for (h = h.d._pt; h && h.p !== e && h.fp !== e; )
          h = h._next;
      if (!h)
        return Rl = 1, t.vars[e] = "+=0", Wu(t, a), Rl = 0, l ? to(e + " not eligible for reset") : 1;
      c.push(h);
    }
  for (u = c.length; u--; )
    d = c[u], h = d._pt || d, h.s = (n || n === 0) && !r ? n : h.s + (n || 0) + o * h.c, h.c = i - h.s, d.e && (d.e = le(i) + He(d.e)), d.b && (d.b = h.s + He(d.b));
}, Qg = function(t, e) {
  var i = t[0] ? ns(t[0]).harness : 0, n = i && i.aliases, r, o, a, l;
  if (!n)
    return e;
  r = tr({}, e);
  for (o in n)
    if (o in r)
      for (l = n[o].split(","), a = l.length; a--; )
        r[l[a]] = r[o];
  return r;
}, Jg = function(t, e, i, n) {
  var r = e.ease || n || "power1.inOut", o, a;
  if (Ke(e))
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
}, zr = function(t, e, i, n, r) {
  return ne(t) ? t.call(e, i, n, r) : Me(t) && ~t.indexOf("random(") ? io(t) : t;
}, lf = Bu + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", uf = {};
li(lf + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return uf[s] = 1;
});
var _e = /* @__PURE__ */ function(s) {
  Ad(t, s);
  function t(i, n, r, o) {
    var a;
    typeof n == "number" && (r.duration = n, n = r, r = null), a = s.call(this, o ? n : Rr(n)) || this;
    var l = a.vars, c = l.duration, h = l.delay, d = l.immediateRender, f = l.stagger, u = l.overwrite, m = l.keyframes, p = l.defaults, _ = l.scrollTrigger, b = l.yoyoEase, A = n.parent || te, C = (Ke(i) || Pd(i) ? bn(i[0]) : "length" in n) ? [i] : Mi(i), T, y, O, P, S, k, R, V;
    if (a._targets = C.length ? Vu(C) : to("GSAP target " + i + " not found. https://gsap.com", !bi.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = u, m || f || Io(c) || Io(h)) {
      if (n = a.vars, T = a.timeline = new ii({
        data: "nested",
        defaults: p || {},
        targets: A && A.data === "nested" ? A.vars.targets : C
      }), T.kill(), T.parent = T._dp = hn(a), T._start = 0, f || Io(c) || Io(h)) {
        if (P = C.length, R = f && Ud(f), sn(f))
          for (S in f)
            ~lf.indexOf(S) && (V || (V = {}), V[S] = f[S]);
        for (y = 0; y < P; y++)
          O = fa(n, uf), O.stagger = 0, b && (O.yoyoEase = b), V && tr(O, V), k = C[y], O.duration = +zr(c, hn(a), y, k, C), O.delay = (+zr(h, hn(a), y, k, C) || 0) - a._delay, !f && P === 1 && O.delay && (a._delay = h = O.delay, a._start += h, O.delay = 0), T.to(k, O, R ? R(y, k, C) : 0), T._ease = Et.none;
        T.duration() ? c = h = 0 : a.timeline = 0;
      } else if (m) {
        Rr(xi(T.vars.defaults, {
          ease: "none"
        })), T._ease = rs(m.ease || n.ease || "none");
        var F = 0, B, J, it;
        if (Ke(m))
          m.forEach(function(q) {
            return T.to(C, q, ">");
          }), T.duration();
        else {
          O = {};
          for (S in m)
            S === "ease" || S === "easeEach" || Jg(S, m[S], O, m.easeEach);
          for (S in O)
            for (B = O[S].sort(function(q, H) {
              return q.t - H.t;
            }), F = 0, y = 0; y < B.length; y++)
              J = B[y], it = {
                ease: J.e,
                duration: (J.t - (y ? B[y - 1].t : 0)) / 100 * c
              }, it[S] = J.v, T.to(C, it, F), F += it.duration;
          T.duration() < c && T.to({}, {
            duration: c - T.duration()
          });
        }
      }
      c || a.duration(c = T.duration());
    } else
      a.timeline = 0;
    return u === !0 && !Lu && (On = hn(a), te.killTweensOf(C), On = 0), Zi(A, hn(a), r), n.reversed && a.reverse(), n.paused && a.paused(!0), (d || !c && !m && a._start === ye(A._time) && ai(d) && kg(hn(a)) && A.data !== "nested") && (a._tTime = -1e-8, a.render(Math.max(0, -h) || 0)), _ && Hd(hn(a), _), a;
  }
  var e = t.prototype;
  return e.render = function(n, r, o) {
    var a = this._time, l = this._tDur, c = this._dur, h = n < 0, d = n > l - qe && !h ? l : n < qe ? 0 : n, f, u, m, p, _, b, A, C, T;
    if (!c)
      Ig(this, n, r, o);
    else if (d !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
      if (f = d, C = this.timeline, this._repeat) {
        if (p = c + this._rDelay, this._repeat < -1 && h)
          return this.totalTime(p * 100 + n, r, o);
        if (f = ye(d % p), d === l ? (m = this._repeat, f = c) : (_ = ye(d / p), m = ~~_, m && m === _ ? (f = c, m--) : f > c && (f = c)), b = this._yoyo && m & 1, b && (T = this._yEase, f = c - f), _ = er(this._tTime, p), f === a && !o && this._initted && m === _)
          return this._tTime = d, this;
        m !== _ && (C && this._yEase && sf(C, b), this.vars.repeatRefresh && !b && !this._lock && f !== p && this._initted && (this._lock = o = 1, this.render(ye(p * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Yd(this, h ? n : f, o, r, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && m !== _))
          return this;
        if (c !== this._dur)
          return this.render(n, r, o);
      }
      if (this._tTime = d, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (T || this._ease)(f / c), this._from && (this.ratio = A = 1 - A), !a && d && !r && !_ && (vi(this, "onStart"), this._tTime !== d))
        return this;
      for (u = this._pt; u; )
        u.r(A, u.d), u = u._next;
      C && C.render(n < 0 ? n : C._dur * C._ease(f / this._dur), r, o) || this._startAt && (this._zTime = n), this._onUpdate && !r && (h && kl(this, n, r, o), vi(this, "onUpdate")), this._repeat && m !== _ && this.vars.onRepeat && !r && this.parent && vi(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (h && !this._onUpdate && kl(this, n, !0, !0), (n || !c) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Bn(this, 1), !r && !(h && !a) && (d || a || b) && (vi(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, r, o, a, l) {
    no || gi.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
    return this._initted || Wu(this, c), h = this._ease(c / this._dur), Zg(this, n, r, o, a, h, c, l) ? this.resetTo(n, r, o, a, 1) : (Ra(this, 0), this.parent || Bd(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, r) {
    if (r === void 0 && (r = "all"), !n && (!r || r === "all"))
      return this._lazy = this._pt = 0, this.parent ? wr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Fe), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, r, On && On.vars.overwrite !== !0)._first || wr(this), this.parent && o !== this.timeline.totalDuration() && ir(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Mi(n) : a, c = this._ptLookup, h = this._pt, d, f, u, m, p, _, b;
    if ((!r || r === "all") && Pg(a, l))
      return r === "all" && (this._pt = 0), wr(this);
    for (d = this._op = this._op || [], r !== "all" && (Me(r) && (p = {}, li(r, function(A) {
      return p[A] = 1;
    }), r = p), r = Qg(a, r)), b = a.length; b--; )
      if (~l.indexOf(a[b])) {
        f = c[b], r === "all" ? (d[b] = r, m = f, u = {}) : (u = d[b] = d[b] || {}, m = r);
        for (p in m)
          _ = f && f[p], _ && ((!("kill" in _.d) || _.d.kill(p) === !0) && Da(this, _, "_pt"), delete f[p]), u !== "all" && (u[p] = 1);
      }
    return this._initted && !this._pt && h && wr(this), this;
  }, t.to = function(n, r) {
    return new t(n, r, arguments[2]);
  }, t.from = function(n, r) {
    return Fr(1, arguments);
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
    return Fr(2, arguments);
  }, t.set = function(n, r) {
    return r.duration = 0, r.repeatDelay || (r.repeat = 0), new t(n, r);
  }, t.killTweensOf = function(n, r, o) {
    return te.killTweensOf(n, r, o);
  }, t;
}(so);
xi(_e.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
li("staggerTo,staggerFrom,staggerFromTo", function(s) {
  _e[s] = function() {
    var t = new ii(), e = Il.call(arguments, 0);
    return e.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, e);
  };
});
var qu = function(t, e, i) {
  return t[e] = i;
}, cf = function(t, e, i) {
  return t[e](i);
}, t0 = function(t, e, i, n) {
  return t[e](n.fp, i);
}, e0 = function(t, e, i) {
  return t.setAttribute(e, i);
}, Uu = function(t, e) {
  return ne(t[e]) ? cf : Ru(t[e]) && t.setAttribute ? e0 : qu;
}, hf = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, i0 = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, df = function(t, e) {
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
}, Ku = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, n0 = function(t, e, i, n) {
  for (var r = this._pt, o; r; )
    o = r._next, r.p === n && r.modifier(t, e, i), r = o;
}, s0 = function(t) {
  for (var e = this._pt, i, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? Da(this, e, "_pt") : e.dep || (i = 1), e = n;
  return !i;
}, r0 = function(t, e, i, n) {
  n.mSet(t, e, n.m.call(n.tween, i, n.mt), n);
}, ff = function(t) {
  for (var e = t._pt, i, n, r, o; e; ) {
    for (i = e._next, n = r; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : r = e, (e._next = n) ? n._prev = e : o = e, e = i;
  }
  t._pt = r;
}, ui = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a, l, c, h) {
    this.t = i, this.s = r, this.c = o, this.p = n, this.r = a || hf, this.d = l || this, this.set = c || qu, this.pr = h || 0, this._next = e, e && (e._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(i, n, r) {
    this.mSet = this.mSet || this.set, this.set = r0, this.m = i, this.mt = r, this.tween = n;
  }, s;
}();
li(Bu + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return $u[s] = 1;
});
wi.TweenMax = wi.TweenLite = _e;
wi.TimelineLite = wi.TimelineMax = ii;
te = new ii({
  sortChildren: !1,
  defaults: Js,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
bi.stringFilter = ef;
var os = [], Jo = {}, o0 = [], Gc = 0, a0 = 0, il = function(t) {
  return (Jo[t] || o0).map(function(e) {
    return e();
  });
}, Fl = function() {
  var t = Date.now(), e = [];
  t - Gc > 2 && (il("matchMediaInit"), os.forEach(function(i) {
    var n = i.queries, r = i.conditions, o, a, l, c;
    for (a in n)
      o = Xi.matchMedia(n[a]).matches, o && (l = 1), o !== r[a] && (r[a] = o, c = 1);
    c && (i.revert(), l && e.push(i));
  }), il("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(n) {
      return i.add(null, n);
    });
  }), Gc = t, il("matchMedia"));
}, pf = /* @__PURE__ */ function() {
  function s(e, i) {
    this.selector = i && Dl(i), this.data = [], this._r = [], this.isReverted = !1, this.id = a0++, e && this.add(e);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    ne(i) && (r = n, n = i, i = ne);
    var o = this, a = function() {
      var c = Qt, h = o.selector, d;
      return c && c !== o && c.data.push(o), r && (o.selector = Dl(r)), Qt = o, d = n.apply(o, arguments), ne(d) && o._r.push(d), Qt = c, o.selector = h, o.isReverted = !1, d;
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
      }).sort(function(h, d) {
        return d.g - h.g || -1 / 0;
      }).forEach(function(h) {
        return h.t.revert(i);
      }), l = r.data.length; l--; )
        c = r.data[l], c instanceof ii ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof _e) && c.revert && c.revert(i);
      r._r.forEach(function(h) {
        return h(i, r);
      }), r.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = os.length; o--; )
        os[o].id === this.id && os.splice(o, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, s;
}(), l0 = /* @__PURE__ */ function() {
  function s(e) {
    this.contexts = [], this.scope = e, Qt && Qt.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(i, n, r) {
    sn(i) || (i = {
      matches: i
    });
    var o = new pf(0, r || this.scope), a = o.conditions = {}, l, c, h;
    Qt && !o.selector && (o.selector = Qt.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = i;
    for (c in i)
      c === "all" ? h = 1 : (l = Xi.matchMedia(i[c]), l && (os.indexOf(o) < 0 && os.push(o), (a[c] = l.matches) && (h = 1), l.addListener ? l.addListener(Fl) : l.addEventListener("change", Fl)));
    return h && n(o, function(d) {
      return o.add(null, d);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(n) {
      return n.kill(i, !0);
    });
  }, s;
}(), ma = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(n) {
      return Qd(n);
    });
  },
  timeline: function(t) {
    return new ii(t);
  },
  getTweensOf: function(t, e) {
    return te.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, n) {
    Me(t) && (t = Mi(t)[0]);
    var r = ns(t || {}).get, o = i ? $d : Nd;
    return i === "native" && (i = ""), t && (e ? o((pi[e] && pi[e].get || r)(t, e, i, n)) : function(a, l, c) {
      return o((pi[a] && pi[a].get || r)(t, a, l, c));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = Mi(t), t.length > 1) {
      var n = t.map(function(h) {
        return Wt.quickSetter(h, e, i);
      }), r = n.length;
      return function(h) {
        for (var d = r; d--; )
          n[d](h);
      };
    }
    t = t[0] || {};
    var o = pi[e], a = ns(t), l = a.harness && (a.harness.aliases || {})[e] || e, c = o ? function(h) {
      var d = new o();
      Fs._pt = 0, d.init(t, i ? h + i : h, Fs, 0, [t]), d.render(1, d), Fs._pt && Ku(1, Fs);
    } : a.set(t, l);
    return o ? c : function(h) {
      return c(t, l, i ? h + i : h, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var n, r = Wt.to(t, xi((n = {}, n[e] = "+=0.1", n.paused = !0, n.stagger = 0, n), i || {})), o = function(l, c, h) {
      return r.resetTo(e, l, c, h);
    };
    return o.tween = r, o;
  },
  isTweening: function(t) {
    return te.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = rs(t.ease, Js.ease)), Wc(Js, t || {});
  },
  config: function(t) {
    return Wc(bi, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, n = t.plugins, r = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !pi[a] && !wi[a] && to(e + " effect requires " + a + " plugin.");
    }), Qa[e] = function(a, l, c) {
      return i(Mi(a), xi(l || {}, r), c);
    }, o && (ii.prototype[e] = function(a, l, c) {
      return this.add(Qa[e](a, sn(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    Et[t] = rs(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? rs(t, e) : Et;
  },
  getById: function(t) {
    return te.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new ii(t), n, r;
    for (i.smoothChildTiming = ai(t.smoothChildTiming), te.remove(i), i._dp = 0, i._time = i._tTime = te._time, n = te._first; n; )
      r = n._next, (e || !(!n._dur && n instanceof _e && n.vars.onComplete === n._targets[0])) && Zi(i, n, n._start - n._delay), n = r;
    return Zi(te, i, 0), i;
  },
  context: function(t, e) {
    return t ? new pf(t, e) : Qt;
  },
  matchMedia: function(t) {
    return new l0(t);
  },
  matchMediaRefresh: function() {
    return os.forEach(function(t) {
      var e = t.conditions, i, n;
      for (n in e)
        e[n] && (e[n] = !1, i = 1);
      i && t.revert();
    }) || Fl();
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
    wrap: Bg,
    wrapYoyo: Vg,
    distribute: Ud,
    random: Xd,
    snap: Kd,
    normalize: $g,
    getUnit: He,
    clamp: Rg,
    splitColor: Jd,
    toArray: Mi,
    selector: Dl,
    mapRange: jd,
    pipe: zg,
    unitize: Ng,
    interpolate: Hg,
    shuffle: qd
  },
  install: Dd,
  effects: Qa,
  ticker: gi,
  updateRoot: ii.updateRoot,
  plugins: pi,
  globalTimeline: te,
  core: {
    PropTween: ui,
    globals: Ld,
    Tween: _e,
    Timeline: ii,
    Animation: so,
    getCache: ns,
    _removeLinkedListItem: Da,
    reverting: function() {
      return Fe;
    },
    context: function(t) {
      return t && Qt && (Qt.data.push(t), t._ctx = Qt), Qt;
    },
    suppressOverwrites: function(t) {
      return Lu = t;
    }
  }
};
li("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return ma[s] = _e[s];
});
gi.add(ii.updateRoot);
Fs = ma.to({}, {
  duration: 0
});
var u0 = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, c0 = function(t, e) {
  var i = t._targets, n, r, o;
  for (n in e)
    for (r = i.length; r--; )
      o = t._ptLookup[r][n], o && (o = o.d) && (o._pt && (o = u0(o, n)), o && o.modifier && o.modifier(e[n], t, i[r], n));
}, nl = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, r, o) {
      o._onInit = function(a) {
        var l, c;
        if (Me(r) && (l = {}, li(r, function(h) {
          return l[h] = 1;
        }), r = l), e) {
          l = {};
          for (c in r)
            l[c] = e(r[c]);
          r = l;
        }
        c0(a, r);
      };
    }
  };
}, Wt = ma.registerPlugin({
  name: "attr",
  init: function(t, e, i, n, r) {
    var o, a, l;
    this.tween = i;
    for (o in e)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", e[o], n, r, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      Fe ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, nl("roundProps", Ll), nl("modifiers"), nl("snap", Kd)) || ma;
_e.version = ii.version = Wt.version = "3.13.0";
Id = 1;
Fu() && nr();
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
var jc, kn, Hs, Xu, Jn, Zc, Gu, h0 = function() {
  return typeof window < "u";
}, wn = {}, Gn = 180 / Math.PI, Ys = Math.PI / 180, Ss = Math.atan2, Qc = 1e8, ju = /([A-Z])/g, d0 = /(left|right|width|margin|padding|x)/i, f0 = /[\s,\(]\S/, Qi = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, zl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, p0 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, m0 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, g0 = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, mf = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, gf = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, _0 = function(t, e, i) {
  return t.style[e] = i;
}, y0 = function(t, e, i) {
  return t.style.setProperty(e, i);
}, v0 = function(t, e, i) {
  return t._gsap[e] = i;
}, b0 = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, w0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(r, o);
}, x0 = function(t, e, i, n, r) {
  var o = t._gsap;
  o[e] = i, o.renderTransform(r, o);
}, ee = "transform", ci = ee + "Origin", T0 = function s(t, e) {
  var i = this, n = this.target, r = n.style, o = n._gsap;
  if (t in wn && r) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Qi[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = dn(n, a);
      }) : this.tfm[t] = o.x ? o[t] : dn(n, t), t === ci && (this.tfm.zOrigin = o.zOrigin);
    else
      return Qi.transform.split(",").forEach(function(a) {
        return s.call(i, a, e);
      });
    if (this.props.indexOf(ee) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(ci, e, "")), t = ee;
  }
  (r || e) && this.props.push(t, e, r[t]);
}, _f = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, S0 = function() {
  var t = this.props, e = this.target, i = e.style, n = e._gsap, r, o;
  for (r = 0; r < t.length; r += 3)
    t[r + 1] ? t[r + 1] === 2 ? e[t[r]](t[r + 2]) : e[t[r]] = t[r + 2] : t[r + 2] ? i[t[r]] = t[r + 2] : i.removeProperty(t[r].substr(0, 2) === "--" ? t[r] : t[r].replace(ju, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), r = Gu(), (!r || !r.isStart) && !i[ee] && (_f(i), n.zOrigin && i[ci] && (i[ci] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, yf = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: S0,
    save: T0
  };
  return t._gsap || Wt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(n) {
    return i.save(n);
  }), i;
}, vf, Nl = function(t, e) {
  var i = kn.createElementNS ? kn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : kn.createElement(t);
  return i && i.style ? i : kn.createElement(t);
}, Ii = function s(t, e, i) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(ju, "-$1").toLowerCase()) || n.getPropertyValue(e) || !i && s(t, sr(e) || e, 1) || "";
}, Jc = "O,Moz,ms,Ms,Webkit".split(","), sr = function(t, e, i) {
  var n = e || Jn, r = n.style, o = 5;
  if (t in r && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(Jc[o] + t in r); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Jc[o] : "") + t;
}, $l = function() {
  h0() && window.document && (jc = window, kn = jc.document, Hs = kn.documentElement, Jn = Nl("div") || {
    style: {}
  }, Nl("div"), ee = sr(ee), ci = ee + "Origin", Jn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", vf = !!sr("perspective"), Gu = Wt.core.reverting, Xu = 1);
}, th = function(t) {
  var e = t.ownerSVGElement, i = Nl("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = t.cloneNode(!0), r;
  n.style.display = "block", i.appendChild(n), Hs.appendChild(i);
  try {
    r = n.getBBox();
  } catch {
  }
  return i.removeChild(n), Hs.removeChild(i), r;
}, eh = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, bf = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = th(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = th(t)), e && !e.width && !e.x && !e.y ? {
    x: +eh(t, ["x", "cx", "x1"]) || 0,
    y: +eh(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, wf = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && bf(t));
}, ps = function(t, e) {
  if (e) {
    var i = t.style, n;
    e in wn && e !== ci && (e = ee), i.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(n === "--" ? e : e.replace(ju, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, Mn = function(t, e, i, n, r, o) {
  var a = new ui(t._pt, e, i, 0, 1, o ? gf : mf);
  return t._pt = a, a.b = n, a.e = r, t._props.push(i), a;
}, ih = {
  deg: 1,
  rad: 1,
  turn: 1
}, E0 = {
  grid: 1,
  flex: 1
}, Vn = function s(t, e, i, n) {
  var r = parseFloat(i) || 0, o = (i + "").trim().substr((r + "").length) || "px", a = Jn.style, l = d0.test(e), c = t.tagName.toLowerCase() === "svg", h = (c ? "client" : "offset") + (l ? "Width" : "Height"), d = 100, f = n === "px", u = n === "%", m, p, _, b;
  if (n === o || !r || ih[n] || ih[o])
    return r;
  if (o !== "px" && !f && (r = s(t, e, i, "px")), b = t.getCTM && wf(t), (u || o === "%") && (wn[e] || ~e.indexOf("adius")))
    return m = b ? t.getBBox()[l ? "width" : "height"] : t[h], le(u ? r / m * d : r / 100 * m);
  if (a[l ? "width" : "height"] = d + (f ? o : n), p = n !== "rem" && ~e.indexOf("adius") || n === "em" && t.appendChild && !c ? t : t.parentNode, b && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === kn || !p.appendChild) && (p = kn.body), _ = p._gsap, _ && u && _.width && l && _.time === gi.time && !_.uncache)
    return le(r / _.width * d);
  if (u && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = d + n, m = t[h], A ? t.style[e] = A : ps(t, e);
  } else
    (u || o === "%") && !E0[Ii(p, "display")] && (a.position = Ii(t, "position")), p === t && (a.position = "static"), p.appendChild(Jn), m = Jn[h], p.removeChild(Jn), a.position = "absolute";
  return l && u && (_ = ns(p), _.time = gi.time, _.width = p[h]), le(f ? m * r / d : m && r ? d / m * r : 0);
}, dn = function(t, e, i, n) {
  var r;
  return Xu || $l(), e in Qi && e !== "transform" && (e = Qi[e], ~e.indexOf(",") && (e = e.split(",")[0])), wn[e] && e !== "transform" ? (r = oo(t, n), r = e !== "transformOrigin" ? r[e] : r.svg ? r.origin : _a(Ii(t, ci)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || r === "auto" || n || ~(r + "").indexOf("calc(")) && (r = ga[e] && ga[e](t, e, i) || Ii(t, e) || Fd(t, e) || (e === "opacity" ? 1 : 0))), i && !~(r + "").trim().indexOf(" ") ? Vn(t, e, r, i) + i : r;
}, A0 = function(t, e, i, n) {
  if (!i || i === "none") {
    var r = sr(e, t, 1), o = r && Ii(t, r, 1);
    o && o !== i ? (e = r, i = o) : e === "borderColor" && (i = Ii(t, "borderTopColor"));
  }
  var a = new ui(this._pt, t.style, e, 0, 1, df), l = 0, c = 0, h, d, f, u, m, p, _, b, A, C, T, y;
  if (a.b = i, a.e = n, i += "", n += "", n.substring(0, 6) === "var(--" && (n = Ii(t, n.substring(4, n.indexOf(")")))), n === "auto" && (p = t.style[e], t.style[e] = n, n = Ii(t, e) || n, p ? t.style[e] = p : ps(t, e)), h = [i, n], ef(h), i = h[0], n = h[1], f = i.match(Rs) || [], y = n.match(Rs) || [], y.length) {
    for (; d = Rs.exec(n); )
      _ = d[0], A = n.substring(l, d.index), m ? m = (m + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (m = 1), _ !== (p = f[c++] || "") && (u = parseFloat(p) || 0, T = p.substr((u + "").length), _.charAt(1) === "=" && (_ = Vs(u, _) + T), b = parseFloat(_), C = _.substr((b + "").length), l = Rs.lastIndex - C.length, C || (C = C || bi.units[e] || T, l === n.length && (n += C, a.e += C)), T !== C && (u = Vn(t, e, p, C) || 0), a._pt = {
        _next: a._pt,
        p: A || c === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: u,
        c: b - u,
        m: m && m < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? gf : mf;
  return kd.test(n) && (a.e = 0), this._pt = a, a;
}, nh = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, C0 = function(t) {
  var e = t.split(" "), i = e[0], n = e[1] || "50%";
  return (i === "top" || i === "bottom" || n === "left" || n === "right") && (t = i, i = n, n = t), e[0] = nh[i] || i, e[1] = nh[n] || n, e.join(" ");
}, P0 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, n = i.style, r = e.u, o = i._gsap, a, l, c;
    if (r === "all" || r === !0)
      n.cssText = "", l = 1;
    else
      for (r = r.split(","), c = r.length; --c > -1; )
        a = r[c], wn[a] && (l = 1, a = a === "transformOrigin" ? ci : ee), ps(i, a);
    l && (ps(i, ee), o && (o.svg && i.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", oo(i, 1), o.uncache = 1, _f(n)));
  }
}, ga = {
  clearProps: function(t, e, i, n, r) {
    if (r.data !== "isFromStart") {
      var o = t._pt = new ui(t._pt, e, i, 0, 0, P0);
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
}, ro = [1, 0, 0, 1, 0, 0], xf = {}, Tf = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, sh = function(t) {
  var e = Ii(t, ee);
  return Tf(e) ? ro : e.substr(7).match(Od).map(le);
}, Zu = function(t, e) {
  var i = t._gsap || ns(t), n = t.style, r = sh(t), o, a, l, c;
  return i.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, r = [l.a, l.b, l.c, l.d, l.e, l.f], r.join(",") === "1,0,0,1,0,0" ? ro : r) : (r === ro && !t.offsetParent && t !== Hs && !i.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, a = t.nextElementSibling, Hs.appendChild(t)), r = sh(t), l ? n.display = l : ps(t, "display"), c && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : Hs.removeChild(t))), e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
}, Bl = function(t, e, i, n, r, o) {
  var a = t._gsap, l = r || Zu(t, !0), c = a.xOrigin || 0, h = a.yOrigin || 0, d = a.xOffset || 0, f = a.yOffset || 0, u = l[0], m = l[1], p = l[2], _ = l[3], b = l[4], A = l[5], C = e.split(" "), T = parseFloat(C[0]) || 0, y = parseFloat(C[1]) || 0, O, P, S, k;
  i ? l !== ro && (P = u * _ - m * p) && (S = T * (_ / P) + y * (-p / P) + (p * A - _ * b) / P, k = T * (-m / P) + y * (u / P) - (u * A - m * b) / P, T = S, y = k) : (O = bf(t), T = O.x + (~C[0].indexOf("%") ? T / 100 * O.width : T), y = O.y + (~(C[1] || C[0]).indexOf("%") ? y / 100 * O.height : y)), n || n !== !1 && a.smooth ? (b = T - c, A = y - h, a.xOffset = d + (b * u + A * p) - b, a.yOffset = f + (b * m + A * _) - A) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = y, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!i, t.style[ci] = "0px 0px", o && (Mn(o, a, "xOrigin", c, T), Mn(o, a, "yOrigin", h, y), Mn(o, a, "xOffset", d, a.xOffset), Mn(o, a, "yOffset", f, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + y);
}, oo = function(t, e) {
  var i = t._gsap || new of(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var n = t.style, r = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), c = Ii(t, ci) || "0", h, d, f, u, m, p, _, b, A, C, T, y, O, P, S, k, R, V, F, B, J, it, q, H, tt, ot, w, G, nt, U, rt, It;
  return h = d = f = p = _ = b = A = C = T = 0, u = m = 1, i.svg = !!(t.getCTM && wf(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[ee] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ee] !== "none" ? l[ee] : "")), n.scale = n.rotate = n.translate = "none"), P = Zu(t, i.svg), i.svg && (i.uncache ? (tt = t.getBBox(), c = i.xOrigin - tt.x + "px " + (i.yOrigin - tt.y) + "px", H = "") : H = !e && t.getAttribute("data-svg-origin"), Bl(t, H || c, !!H || i.originIsAbsolute, i.smooth !== !1, P)), y = i.xOrigin || 0, O = i.yOrigin || 0, P !== ro && (V = P[0], F = P[1], B = P[2], J = P[3], h = it = P[4], d = q = P[5], P.length === 6 ? (u = Math.sqrt(V * V + F * F), m = Math.sqrt(J * J + B * B), p = V || F ? Ss(F, V) * Gn : 0, A = B || J ? Ss(B, J) * Gn + p : 0, A && (m *= Math.abs(Math.cos(A * Ys))), i.svg && (h -= y - (y * V + O * B), d -= O - (y * F + O * J))) : (It = P[6], U = P[7], w = P[8], G = P[9], nt = P[10], rt = P[11], h = P[12], d = P[13], f = P[14], S = Ss(It, nt), _ = S * Gn, S && (k = Math.cos(-S), R = Math.sin(-S), H = it * k + w * R, tt = q * k + G * R, ot = It * k + nt * R, w = it * -R + w * k, G = q * -R + G * k, nt = It * -R + nt * k, rt = U * -R + rt * k, it = H, q = tt, It = ot), S = Ss(-B, nt), b = S * Gn, S && (k = Math.cos(-S), R = Math.sin(-S), H = V * k - w * R, tt = F * k - G * R, ot = B * k - nt * R, rt = J * R + rt * k, V = H, F = tt, B = ot), S = Ss(F, V), p = S * Gn, S && (k = Math.cos(S), R = Math.sin(S), H = V * k + F * R, tt = it * k + q * R, F = F * k - V * R, q = q * k - it * R, V = H, it = tt), _ && Math.abs(_) + Math.abs(p) > 359.9 && (_ = p = 0, b = 180 - b), u = le(Math.sqrt(V * V + F * F + B * B)), m = le(Math.sqrt(q * q + It * It)), S = Ss(it, q), A = Math.abs(S) > 2e-4 ? S * Gn : 0, T = rt ? 1 / (rt < 0 ? -rt : rt) : 0), i.svg && (H = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Tf(Ii(t, ee)), H && t.setAttribute("transform", H))), Math.abs(A) > 90 && Math.abs(A) < 270 && (r ? (u *= -1, A += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (m *= -1, A += A <= 0 ? 180 : -180)), e = e || i.uncache, i.x = h - ((i.xPercent = h && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + o, i.y = d - ((i.yPercent = d && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + o, i.z = f + o, i.scaleX = le(u), i.scaleY = le(m), i.rotation = le(p) + a, i.rotationX = le(_) + a, i.rotationY = le(b) + a, i.skewX = A + a, i.skewY = C + a, i.transformPerspective = T + o, (i.zOrigin = parseFloat(c.split(" ")[2]) || !e && i.zOrigin || 0) && (n[ci] = _a(c)), i.xOffset = i.yOffset = 0, i.force3D = bi.force3D, i.renderTransform = i.svg ? k0 : vf ? Sf : O0, i.uncache = 0, i;
}, _a = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, sl = function(t, e, i) {
  var n = He(e);
  return le(parseFloat(e) + parseFloat(Vn(t, "x", i + "px", n))) + n;
}, O0 = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Sf(t, e);
}, Un = "0deg", pr = "0px", Kn = ") ", Sf = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.z, c = i.rotation, h = i.rotationY, d = i.rotationX, f = i.skewX, u = i.skewY, m = i.scaleX, p = i.scaleY, _ = i.transformPerspective, b = i.force3D, A = i.target, C = i.zOrigin, T = "", y = b === "auto" && t && t !== 1 || b === !0;
  if (C && (d !== Un || h !== Un)) {
    var O = parseFloat(h) * Ys, P = Math.sin(O), S = Math.cos(O), k;
    O = parseFloat(d) * Ys, k = Math.cos(O), o = sl(A, o, P * k * -C), a = sl(A, a, -Math.sin(O) * -C), l = sl(A, l, S * k * -C + C);
  }
  _ !== pr && (T += "perspective(" + _ + Kn), (n || r) && (T += "translate(" + n + "%, " + r + "%) "), (y || o !== pr || a !== pr || l !== pr) && (T += l !== pr || y ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Kn), c !== Un && (T += "rotate(" + c + Kn), h !== Un && (T += "rotateY(" + h + Kn), d !== Un && (T += "rotateX(" + d + Kn), (f !== Un || u !== Un) && (T += "skew(" + f + ", " + u + Kn), (m !== 1 || p !== 1) && (T += "scale(" + m + ", " + p + Kn), A.style[ee] = T || "translate(0, 0)";
}, k0 = function(t, e) {
  var i = e || this, n = i.xPercent, r = i.yPercent, o = i.x, a = i.y, l = i.rotation, c = i.skewX, h = i.skewY, d = i.scaleX, f = i.scaleY, u = i.target, m = i.xOrigin, p = i.yOrigin, _ = i.xOffset, b = i.yOffset, A = i.forceCSS, C = parseFloat(o), T = parseFloat(a), y, O, P, S, k;
  l = parseFloat(l), c = parseFloat(c), h = parseFloat(h), h && (h = parseFloat(h), c += h, l += h), l || c ? (l *= Ys, c *= Ys, y = Math.cos(l) * d, O = Math.sin(l) * d, P = Math.sin(l - c) * -f, S = Math.cos(l - c) * f, c && (h *= Ys, k = Math.tan(c - h), k = Math.sqrt(1 + k * k), P *= k, S *= k, h && (k = Math.tan(h), k = Math.sqrt(1 + k * k), y *= k, O *= k)), y = le(y), O = le(O), P = le(P), S = le(S)) : (y = d, S = f, O = P = 0), (C && !~(o + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (C = Vn(u, "x", o, "px"), T = Vn(u, "y", a, "px")), (m || p || _ || b) && (C = le(C + m - (m * y + p * P) + _), T = le(T + p - (m * O + p * S) + b)), (n || r) && (k = u.getBBox(), C = le(C + n / 100 * k.width), T = le(T + r / 100 * k.height)), k = "matrix(" + y + "," + O + "," + P + "," + S + "," + C + "," + T + ")", u.setAttribute("transform", k), A && (u.style[ee] = k);
}, M0 = function(t, e, i, n, r) {
  var o = 360, a = Me(r), l = parseFloat(r) * (a && ~r.indexOf("rad") ? Gn : 1), c = l - n, h = n + c + "deg", d, f;
  return a && (d = r.split("_")[1], d === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -360)), d === "cw" && c < 0 ? c = (c + o * Qc) % o - ~~(c / o) * o : d === "ccw" && c > 0 && (c = (c - o * Qc) % o - ~~(c / o) * o)), t._pt = f = new ui(t._pt, e, i, n, c, p0), f.e = h, f.u = "deg", t._props.push(i), f;
}, rh = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, I0 = function(t, e, i) {
  var n = rh({}, i._gsap), r = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, c, h, d, f, u, m;
  n.svg ? (c = i.getAttribute("transform"), i.setAttribute("transform", ""), o[ee] = e, a = oo(i, 1), ps(i, ee), i.setAttribute("transform", c)) : (c = getComputedStyle(i)[ee], o[ee] = e, a = oo(i, 1), o[ee] = c);
  for (l in wn)
    c = n[l], h = a[l], c !== h && r.indexOf(l) < 0 && (u = He(c), m = He(h), d = u !== m ? Vn(i, l, c, m) : parseFloat(c), f = parseFloat(h), t._pt = new ui(t._pt, a, l, d, f - d, zl), t._pt.u = m || 0, t._props.push(l));
  rh(a, n);
};
li("padding,margin,Width,Radius", function(s, t) {
  var e = "Top", i = "Right", n = "Bottom", r = "Left", o = (t < 3 ? [e, i, n, r] : [e + r, e + i, n + i, n + r]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  ga[t > 1 ? "border" + s : s] = function(a, l, c, h, d) {
    var f, u;
    if (arguments.length < 4)
      return f = o.map(function(m) {
        return dn(a, m, c);
      }), u = f.join(" "), u.split(f[0]).length === 5 ? f[0] : u;
    f = (h + "").split(" "), u = {}, o.forEach(function(m, p) {
      return u[m] = f[p] = f[p] || f[(p - 1) / 2 | 0];
    }), a.init(l, u, d);
  };
});
var Fa = {
  name: "css",
  register: $l,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, n, r) {
    var o = this._props, a = t.style, l = i.vars.startAt, c, h, d, f, u, m, p, _, b, A, C, T, y, O, P, S;
    Xu || $l(), this.styles = this.styles || yf(t), S = this.styles.props, this.tween = i;
    for (p in e)
      if (p !== "autoRound" && (h = e[p], !(pi[p] && af(p, e, i, n, t, r)))) {
        if (u = typeof h, m = ga[p], u === "function" && (h = h.call(i, n, t, r), u = typeof h), u === "string" && ~h.indexOf("random(") && (h = io(h)), m)
          m(this, t, p, h, i) && (P = 1);
        else if (p.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(p) + "").trim(), h += "", Fn.lastIndex = 0, Fn.test(c) || (_ = He(c), b = He(h)), b ? _ !== b && (c = Vn(t, p, c, b) + b) : _ && (h += _), this.add(a, "setProperty", c, h, n, r, 0, 0, p), o.push(p), S.push(p, 0, a[p]);
        else if (u !== "undefined") {
          if (l && p in l ? (c = typeof l[p] == "function" ? l[p].call(i, n, t, r) : l[p], Me(c) && ~c.indexOf("random(") && (c = io(c)), He(c + "") || c === "auto" || (c += bi.units[p] || He(dn(t, p)) || ""), (c + "").charAt(1) === "=" && (c = dn(t, p))) : c = dn(t, p), f = parseFloat(c), A = u === "string" && h.charAt(1) === "=" && h.substr(0, 2), A && (h = h.substr(2)), d = parseFloat(h), p in Qi && (p === "autoAlpha" && (f === 1 && dn(t, "visibility") === "hidden" && d && (f = 0), S.push("visibility", 0, a.visibility), Mn(this, a, "visibility", f ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = Qi[p], ~p.indexOf(",") && (p = p.split(",")[0]))), C = p in wn, C) {
            if (this.styles.save(p), u === "string" && h.substring(0, 6) === "var(--" && (h = Ii(t, h.substring(4, h.indexOf(")"))), d = parseFloat(h)), T || (y = t._gsap, y.renderTransform && !e.parseTransform || oo(t, e.parseTransform), O = e.smoothOrigin !== !1 && y.smooth, T = this._pt = new ui(this._pt, a, ee, 0, 1, y.renderTransform, y, 0, -1), T.dep = 1), p === "scale")
              this._pt = new ui(this._pt, y, "scaleY", y.scaleY, (A ? Vs(y.scaleY, A + d) : d) - y.scaleY || 0, zl), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              S.push(ci, 0, a[ci]), h = C0(h), y.svg ? Bl(t, h, 0, O, 0, this) : (b = parseFloat(h.split(" ")[2]) || 0, b !== y.zOrigin && Mn(this, y, "zOrigin", y.zOrigin, b), Mn(this, a, p, _a(c), _a(h)));
              continue;
            } else if (p === "svgOrigin") {
              Bl(t, h, 1, O, 0, this);
              continue;
            } else if (p in xf) {
              M0(this, y, p, f, A ? Vs(f, A + h) : h);
              continue;
            } else if (p === "smoothOrigin") {
              Mn(this, y, "smooth", y.smooth, h);
              continue;
            } else if (p === "force3D") {
              y[p] = h;
              continue;
            } else if (p === "transform") {
              I0(this, h, t);
              continue;
            }
          } else p in a || (p = sr(p) || p);
          if (C || (d || d === 0) && (f || f === 0) && !f0.test(h) && p in a)
            _ = (c + "").substr((f + "").length), d || (d = 0), b = He(h) || (p in bi.units ? bi.units[p] : _), _ !== b && (f = Vn(t, p, c, b)), this._pt = new ui(this._pt, C ? y : a, p, f, (A ? Vs(f, A + d) : d) - f, !C && (b === "px" || p === "zIndex") && e.autoRound !== !1 ? g0 : zl), this._pt.u = b || 0, _ !== b && b !== "%" && (this._pt.b = c, this._pt.r = m0);
          else if (p in a)
            A0.call(this, t, p, c, A ? A + h : h);
          else if (p in t)
            this.add(t, p, c || t[p], A ? A + h : h, n, r);
          else if (p !== "parseTransform") {
            Nu(p, h);
            continue;
          }
          C || (p in a ? S.push(p, 0, a[p]) : typeof t[p] == "function" ? S.push(p, 2, t[p]()) : S.push(p, 1, c || t[p])), o.push(p);
        }
      }
    P && ff(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Gu())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: dn,
  aliases: Qi,
  getSetter: function(t, e, i) {
    var n = Qi[e];
    return n && n.indexOf(",") < 0 && (e = n), e in wn && e !== ci && (t._gsap.x || dn(t, "x")) ? i && Zc === i ? e === "scale" ? b0 : v0 : (Zc = i || {}) && (e === "scale" ? w0 : x0) : t.style && !Ru(t.style[e]) ? _0 : ~e.indexOf("-") ? y0 : Uu(t, e);
  },
  core: {
    _removeProperty: ps,
    _getMatrix: Zu
  }
};
Wt.utils.checkPrefix = sr;
Wt.core.getStyleSaver = yf;
(function(s, t, e, i) {
  var n = li(s + "," + t + "," + e, function(r) {
    wn[r] = 1;
  });
  li(t, function(r) {
    bi.units[r] = "deg", xf[r] = 1;
  }), Qi[n[13]] = s + "," + t, li(i, function(r) {
    var o = r.split(":");
    Qi[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
li("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  bi.units[s] = "px";
});
Wt.registerPlugin(Fa);
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var mn, as, Qu, za, Tr, ta, ya, Nr, Vi = "transform", Vl = Vi + "Origin", Ef, Af = function(t) {
  var e = t.ownerDocument || t;
  for (!(Vi in t.style) && ("msTransform" in t.style) && (Vi = "msTransform", Vl = Vi + "Origin"); e.parentNode && (e = e.parentNode); )
    ;
  if (as = window, ya = new ms(), e) {
    mn = e, Qu = e.documentElement, za = e.body, Nr = mn.createElementNS("http://www.w3.org/2000/svg", "g"), Nr.style.transform = "none";
    var i = e.createElement("div"), n = e.createElement("div"), r = e && (e.body || e.firstElementChild);
    r && r.appendChild && (r.appendChild(i), i.appendChild(n), i.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), Ef = n.offsetParent !== i, r.removeChild(i));
  }
  return e;
}, D0 = function(t) {
  for (var e, i; t && t !== za; )
    i = t._gsap, i && i.uncache && i.get(t, "x"), i && !i.scaleX && !i.scaleY && i.renderTransform && (i.scaleX = i.scaleY = 1e-4, i.renderTransform(1, i), e ? e.push(i) : e = [i]), t = t.parentNode;
  return e;
}, Cf = [], Pf = [], L0 = function() {
  return as.pageYOffset || mn.scrollTop || Qu.scrollTop || za.scrollTop || 0;
}, R0 = function() {
  return as.pageXOffset || mn.scrollLeft || Qu.scrollLeft || za.scrollLeft || 0;
}, Ju = function(t) {
  return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
}, F0 = function s(t) {
  if (as.getComputedStyle(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, rl = function s(t, e) {
  if (t.parentNode && (mn || Af(t))) {
    var i = Ju(t), n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", r = i ? e ? "rect" : "g" : "div", o = e !== 2 ? 0 : 100, a = e === 3 ? 100 : 0, l = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", c = mn.createElementNS ? mn.createElementNS(n.replace(/^https/, "http"), r) : mn.createElement(r);
    return e && (i ? (ta || (ta = s(t)), c.setAttribute("width", 0.01), c.setAttribute("height", 0.01), c.setAttribute("transform", "translate(" + o + "," + a + ")"), ta.appendChild(c)) : (Tr || (Tr = s(t), Tr.style.cssText = l), c.style.cssText = l + "width:0.1px;height:0.1px;top:" + a + "px;left:" + o + "px", Tr.appendChild(c))), c;
  }
  throw "Need document and parent.";
}, z0 = function(t) {
  for (var e = new ms(), i = 0; i < t.numberOfItems; i++)
    e.multiply(t.getItem(i).matrix);
  return e;
}, N0 = function(t) {
  var e = t.getCTM(), i;
  return e || (i = t.style[Vi], t.style[Vi] = "none", t.appendChild(Nr), e = Nr.getCTM(), t.removeChild(Nr), i ? t.style[Vi] = i : t.style.removeProperty(Vi.replace(/([A-Z])/g, "-$1").toLowerCase())), e || ya.clone();
}, $0 = function(t, e) {
  var i = Ju(t), n = t === i, r = i ? Cf : Pf, o = t.parentNode, a = o && !i && o.shadowRoot && o.shadowRoot.appendChild ? o.shadowRoot : o, l, c, h, d, f, u;
  if (t === as)
    return t;
  if (r.length || r.push(rl(t, 1), rl(t, 2), rl(t, 3)), l = i ? ta : Tr, i)
    n ? (h = N0(t), d = -h.e / h.a, f = -h.f / h.d, c = ya) : t.getBBox ? (h = t.getBBox(), c = t.transform ? t.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? z0(c) : c.getItem(0).matrix : ya, d = c.a * h.x + c.c * h.y, f = c.b * h.x + c.d * h.y) : (c = new ms(), d = f = 0), (n ? i : o).appendChild(l), l.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + d) + "," + (c.f + f) + ")");
  else {
    if (d = f = 0, Ef)
      for (c = t.offsetParent, h = t; h && (h = h.parentNode) && h !== c && h.parentNode; )
        (as.getComputedStyle(h)[Vi] + "").length > 4 && (d = h.offsetLeft, f = h.offsetTop, h = 0);
    if (u = as.getComputedStyle(t), u.position !== "absolute" && u.position !== "fixed")
      for (c = t.offsetParent; o && o !== c; )
        d += o.scrollLeft || 0, f += o.scrollTop || 0, o = o.parentNode;
    h = l.style, h.top = t.offsetTop - f + "px", h.left = t.offsetLeft - d + "px", h[Vi] = u[Vi], h[Vl] = u[Vl], h.position = u.position === "fixed" ? "fixed" : "absolute", a.appendChild(l);
  }
  return l;
}, ol = function(t, e, i, n, r, o, a) {
  return t.a = e, t.b = i, t.c = n, t.d = r, t.e = o, t.f = a, t;
}, ms = /* @__PURE__ */ function() {
  function s(e, i, n, r, o, a) {
    e === void 0 && (e = 1), i === void 0 && (i = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), o === void 0 && (o = 0), a === void 0 && (a = 0), ol(this, e, i, n, r, o, a);
  }
  var t = s.prototype;
  return t.inverse = function() {
    var i = this.a, n = this.b, r = this.c, o = this.d, a = this.e, l = this.f, c = i * o - n * r || 1e-10;
    return ol(this, o / c, -n / c, -r / c, i / c, (r * l - o * a) / c, -(i * l - n * a) / c);
  }, t.multiply = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, c = this.f, h = i.a, d = i.c, f = i.b, u = i.d, m = i.e, p = i.f;
    return ol(this, h * n + f * o, h * r + f * a, d * n + u * o, d * r + u * a, l + m * n + p * o, c + m * r + p * a);
  }, t.clone = function() {
    return new s(this.a, this.b, this.c, this.d, this.e, this.f);
  }, t.equals = function(i) {
    var n = this.a, r = this.b, o = this.c, a = this.d, l = this.e, c = this.f;
    return n === i.a && r === i.b && o === i.c && a === i.d && l === i.e && c === i.f;
  }, t.apply = function(i, n) {
    n === void 0 && (n = {});
    var r = i.x, o = i.y, a = this.a, l = this.b, c = this.c, h = this.d, d = this.e, f = this.f;
    return n.x = r * a + o * c + d || 0, n.y = r * l + o * h + f || 0, n;
  }, s;
}();
function Qn(s, t, e, i) {
  if (!s || !s.parentNode || (mn || Af(s)).documentElement === s)
    return new ms();
  var n = D0(s), r = Ju(s), o = r ? Cf : Pf, a = $0(s), l = o[0].getBoundingClientRect(), c = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(), d = a.parentNode, f = F0(s), u = new ms((c.left - l.left) / 100, (c.top - l.top) / 100, (h.left - l.left) / 100, (h.top - l.top) / 100, l.left + (f ? 0 : R0()), l.top + (f ? 0 : L0()));
  if (d.removeChild(a), n)
    for (l = n.length; l--; )
      c = n[l], c.scaleX = c.scaleY = 0, c.renderTransform(1, c);
  return t ? u.inverse() : u;
}
function oh(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function B0(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var St, Ht, _i, Yi, gn, al, fn, Hl, Sr, In, Of, Yl, ao, tc, Er, Ni, Ar, ea, kf, Wl, va = 0, Mf = function() {
  return typeof window < "u";
}, If = function() {
  return St || Mf() && (St = window.gsap) && St.registerPlugin && St;
}, Pn = function(t) {
  return typeof t == "function";
}, $r = function(t) {
  return typeof t == "object";
}, Bi = function(t) {
  return typeof t > "u";
}, ia = function() {
  return !1;
}, Br = "transform", ql = "transformOrigin", Sn = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, mr = Array.isArray, Do = function(t, e) {
  var i = _i.createElementNS ? _i.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), t) : _i.createElement(t);
  return i.style ? i : _i.createElement(t);
}, ah = 180 / Math.PI, Es = 1e20, V0 = new ms(), En = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, ls = [], Ws = {}, H0 = 0, Y0 = /^(?:a|input|textarea|button|select)$/i, lh = 0, As = {}, cn = {}, Df = function(t, e) {
  var i = {}, n;
  for (n in t)
    i[n] = e ? t[n] * e : t[n];
  return i;
}, W0 = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, uh = function s(t, e) {
  for (var i = t.length, n; i--; )
    e ? t[i].style.touchAction = e : t[i].style.removeProperty("touch-action"), n = t[i].children, n && n.length && s(n, e);
}, Lf = function() {
  return ls.forEach(function(t) {
    return t();
  });
}, q0 = function(t) {
  ls.push(t), ls.length === 1 && St.ticker.add(Lf);
}, ch = function() {
  return !ls.length && St.ticker.remove(Lf);
}, hh = function(t) {
  for (var e = ls.length; e--; )
    ls[e] === t && ls.splice(e, 1);
  St.to(ch, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: ch,
    data: "_draggable"
  });
}, U0 = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Se = function(t, e, i, n) {
  if (t.addEventListener) {
    var r = ao[e];
    n = n || (Of ? {
      passive: !1
    } : null), t.addEventListener(r || e, i, n), r && e !== r && t.addEventListener(e, i, n);
  }
}, pe = function(t, e, i, n) {
  if (t.removeEventListener) {
    var r = ao[e];
    t.removeEventListener(r || e, i, n), r && e !== r && t.removeEventListener(e, i, n);
  }
}, Ai = function(t) {
  t.preventDefault && t.preventDefault(), t.preventManipulation && t.preventManipulation();
}, K0 = function(t, e) {
  for (var i = t.length; i--; )
    if (t[i].identifier === e)
      return !0;
}, X0 = function s(t) {
  tc = t.touches && va < t.touches.length, pe(t.target, "touchend", s);
}, dh = function(t) {
  tc = t.touches && va < t.touches.length, Se(t.target, "touchend", X0);
}, qs = function(t) {
  return Ht.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
}, Us = function(t) {
  return Ht.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
}, fh = function s(t, e) {
  Se(t, "scroll", e), rr(t.parentNode) || s(t.parentNode, e);
}, ph = function s(t, e) {
  pe(t, "scroll", e), rr(t.parentNode) || s(t.parentNode, e);
}, rr = function(t) {
  return !t || t === Yi || t.nodeType === 9 || t === _i.body || t === Ht || !t.nodeType || !t.parentNode;
}, mh = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return Math.max(0, rr(t) ? Math.max(Yi[n], gn[n]) - (Ht["inner" + i] || Yi[r] || gn[r]) : t[n] - t[r]);
}, ll = function s(t, e) {
  var i = mh(t, "x"), n = mh(t, "y");
  rr(t) ? t = cn : s(t.parentNode, e), t._gsMaxScrollX = i, t._gsMaxScrollY = n, e || (t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0);
}, ul = function(t, e, i) {
  var n = t.style;
  n && (Bi(n[e]) && (e = Sr(e, t) || e), i == null ? n.removeProperty && n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n[e] = i);
}, lo = function(t) {
  return Ht.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
}, Xn = {}, Cs = function(t) {
  if (t === Ht)
    return Xn.left = Xn.top = 0, Xn.width = Xn.right = Yi.clientWidth || t.innerWidth || gn.clientWidth || 0, Xn.height = Xn.bottom = (t.innerHeight || 0) - 20 < Yi.clientHeight ? Yi.clientHeight : t.innerHeight || gn.clientHeight || 0, Xn;
  var e = t.ownerDocument || _i, i = Bi(t.pageX) ? !t.nodeType && !Bi(t.left) && !Bi(t.top) ? t : In(t)[0].getBoundingClientRect() : {
    left: t.pageX - Us(e),
    top: t.pageY - qs(e),
    right: t.pageX - Us(e) + 1,
    bottom: t.pageY - qs(e) + 1
  };
  return Bi(i.right) && !Bi(i.width) ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : Bi(i.width) && (i = {
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
}, gh = function(t, e) {
  var i = In(t)[0], n, r, o;
  return !i.nodeType && i !== Ht ? Bi(t.left) ? (r = t.min || t.minX || t.minRotation || 0, n = t.min || t.minY || 0, {
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
  }) : G0(i, e);
}, Ci = {}, G0 = function(t, e) {
  e = In(e)[0];
  var i = t.getBBox && t.ownerSVGElement, n = t.ownerDocument || _i, r, o, a, l, c, h, d, f, u, m, p, _, b;
  if (t === Ht)
    a = qs(n), r = Us(n), o = r + (n.documentElement.clientWidth || t.innerWidth || n.body.clientWidth || 0), l = a + ((t.innerHeight || 0) - 20 < n.documentElement.clientHeight ? n.documentElement.clientHeight : t.innerHeight || n.body.clientHeight || 0);
  else {
    if (e === Ht || Bi(e))
      return t.getBoundingClientRect();
    r = a = 0, i ? (m = t.getBBox(), p = m.width, _ = m.height) : (t.viewBox && (m = t.viewBox.baseVal) && (r = m.x || 0, a = m.y || 0, p = m.width, _ = m.height), p || (b = lo(t), m = b.boxSizing === "border-box", p = (parseFloat(b.width) || t.clientWidth || 0) + (m ? 0 : parseFloat(b.borderLeftWidth) + parseFloat(b.borderRightWidth)), _ = (parseFloat(b.height) || t.clientHeight || 0) + (m ? 0 : parseFloat(b.borderTopWidth) + parseFloat(b.borderBottomWidth)))), o = p, l = _;
  }
  return t === e ? {
    left: r,
    top: a,
    width: o - r,
    height: l - a
  } : (c = Qn(e, !0).multiply(Qn(t)), h = c.apply({
    x: r,
    y: a
  }), d = c.apply({
    x: o,
    y: a
  }), f = c.apply({
    x: o,
    y: l
  }), u = c.apply({
    x: r,
    y: l
  }), r = Math.min(h.x, d.x, f.x, u.x), a = Math.min(h.y, d.y, f.y, u.y), {
    left: r,
    top: a,
    width: Math.max(h.x, d.x, f.x, u.x) - r,
    height: Math.max(h.y, d.y, f.y, u.y) - a
  });
}, cl = function(t, e, i, n, r, o) {
  var a = {}, l, c, h;
  if (e)
    if (r !== 1 && e instanceof Array) {
      if (a.end = l = [], h = e.length, $r(e[0]))
        for (c = 0; c < h; c++)
          l[c] = Df(e[c], r);
      else
        for (c = 0; c < h; c++)
          l[c] = e[c] * r;
      i += 1.1, n -= 1.1;
    } else Pn(e) ? a.end = function(d) {
      var f = e.call(t, d), u, m;
      if (r !== 1)
        if ($r(f)) {
          u = {};
          for (m in f)
            u[m] = f[m] * r;
          f = u;
        } else
          f *= r;
      return f;
    } : a.end = e;
  return (i || i === 0) && (a.max = i), (n || n === 0) && (a.min = n), o && (a.velocity = 0), a;
}, j0 = function s(t) {
  var e;
  return !t || !t.getAttribute || t === gn ? !1 : (e = t.getAttribute("data-clickable")) === "true" || e !== "false" && (Y0.test(t.nodeName + "") || t.getAttribute("contentEditable") === "true") ? !0 : s(t.parentNode);
}, Lo = function(t, e) {
  for (var i = t.length, n; i--; )
    n = t[i], n.ondragstart = n.onselectstart = e ? null : ia, St.set(n, {
      lazy: !0,
      userSelect: e ? "text" : "none"
    });
}, Z0 = function s(t) {
  if (lo(t).position === "fixed")
    return !0;
  if (t = t.parentNode, t && t.nodeType === 1)
    return s(t);
}, Rf, Ul, Q0 = function(t, e) {
  t = St.utils.toArray(t)[0], e = e || {};
  var i = document.createElement("div"), n = i.style, r = t.firstChild, o = 0, a = 0, l = t.scrollTop, c = t.scrollLeft, h = t.scrollWidth, d = t.scrollHeight, f = 0, u = 0, m = 0, p, _, b, A, C, T;
  Rf && e.force3D !== !1 ? (C = "translate3d(", T = "px,0px)") : Br && (C = "translate(", T = "px)"), this.scrollTop = function(y, O) {
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
    y = -y, y < 0 ? (a = y - 0.5 | 0, y = 0) : y > u ? (a = y - u | 0, y = u) : a = 0, (a || S) && (this._skip || (n[Br] = C + -a + "px," + -o + T), a + f >= 0 && (n.paddingRight = a + f + "px")), t.scrollLeft = y | 0, c = t.scrollLeft;
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
    y = -y, y < 0 ? (o = y - 0.5 | 0, y = 0) : y > m ? (o = y - m | 0, y = m) : o = 0, (o || S) && (this._skip || (n[Br] = C + -a + "px," + -o + T)), t.scrollTop = y | 0, l = t.scrollTop;
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
    l = t.scrollTop, c = t.scrollLeft, !(O && t.clientHeight === _ && i.offsetHeight === b && h === t.scrollWidth && d === t.scrollHeight && !y) && ((o || a) && (S = this.left(), k = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), P = lo(t), (!O || y) && (n.display = "block", n.width = "auto", n.paddingRight = "0px", f = Math.max(0, t.scrollWidth - t.clientWidth), f && (f += parseFloat(P.paddingLeft) + (Ul ? parseFloat(P.paddingRight) : 0))), n.display = "inline-block", n.position = "relative", n.overflow = "visible", n.verticalAlign = "top", n.boxSizing = "content-box", n.width = "100%", n.paddingRight = f + "px", Ul && (n.paddingBottom = P.paddingBottom), p = t.clientWidth, _ = t.clientHeight, h = t.scrollWidth, d = t.scrollHeight, u = t.scrollWidth - p, m = t.scrollHeight - _, b = i.offsetHeight, n.display = "block", (S || k) && (this.left(S), this.top(k)));
  }, this.content = i, this.element = t, this._skip = !1, this.enable();
}, hl = function(t) {
  if (Mf() && document.body) {
    var e = window && window.navigator;
    Ht = window, _i = document, Yi = _i.documentElement, gn = _i.body, al = Do("div"), ea = !!window.PointerEvent, fn = Do("div"), fn.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", Ar = fn.style.cursor === "grab" ? "grab" : "move", Er = e && e.userAgent.toLowerCase().indexOf("android") !== -1, Yl = "ontouchstart" in Yi && "orientation" in Ht || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0), Ul = function() {
      var i = Do("div"), n = Do("div"), r = n.style, o = gn, a;
      return r.display = "inline-block", r.position = "relative", i.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", i.appendChild(n), o.appendChild(i), a = n.offsetHeight + 18 > i.scrollHeight, o.removeChild(i), a;
    }(), ao = function(i) {
      for (var n = i.split(","), r = ("onpointerdown" in al ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in al ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : i).split(","), o = {}, a = 4; --a > -1; )
        o[n[a]] = r[a], o[r[a]] = n[a];
      try {
        Yi.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Of = 1;
          }
        }));
      } catch {
      }
      return o;
    }("touchstart,touchmove,touchend,touchcancel"), Se(_i, "touchcancel", ia), Se(Ht, "touchmove", ia), gn && gn.addEventListener("touchstart", ia), Se(_i, "contextmenu", function() {
      for (var i in Ws)
        Ws[i].isPressed && Ws[i].endDrag();
    }), St = Hl = If();
  }
  St ? (Ni = St.plugins.inertia, kf = St.core.context || function() {
  }, Sr = St.utils.checkPrefix, Br = Sr(Br), ql = Sr(ql), In = St.utils.toArray, Wl = St.core.getStyleSaver, Rf = !!Sr("perspective")) : t && console.warn("Please gsap.registerPlugin(Draggable)");
}, J0 = /* @__PURE__ */ function() {
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
}(), Na = /* @__PURE__ */ function(s) {
  B0(t, s);
  function t(e, i) {
    var n;
    n = s.call(this) || this, Hl || hl(1), e = In(e)[0], n.styles = Wl && Wl(e, "transform,left,top"), Ni || (Ni = St.plugins.inertia), n.vars = i = Df(i || {}), n.target = e, n.x = n.y = n.rotation = 0, n.dragResistance = parseFloat(i.dragResistance) || 0, n.edgeResistance = isNaN(i.edgeResistance) ? 1 : parseFloat(i.edgeResistance) || 0, n.lockAxis = i.lockAxis, n.autoScroll = i.autoScroll || 0, n.lockedAxis = null, n.allowEventDefault = !!i.allowEventDefault, St.getProperty(e, "x");
    var r = (i.type || "x,y").toLowerCase(), o = ~r.indexOf("x") || ~r.indexOf("y"), a = r.indexOf("rotation") !== -1, l = a ? "rotation" : o ? "x" : "left", c = o ? "y" : "top", h = !!(~r.indexOf("x") || ~r.indexOf("left") || r === "scroll"), d = !!(~r.indexOf("y") || ~r.indexOf("top") || r === "scroll"), f = i.minimumMovement || 2, u = oh(n), m = In(i.trigger || i.handle || e), p = {}, _ = 0, b = !1, A = i.autoScrollMarginTop || 40, C = i.autoScrollMarginRight || 40, T = i.autoScrollMarginBottom || 40, y = i.autoScrollMarginLeft || 40, O = i.clickableTest || j0, P = 0, S = e._gsap || St.core.getCache(e), k = Z0(e), R = function(v, $) {
      return parseFloat(S.get(e, v, $));
    }, V = e.ownerDocument || _i, F, B, J, it, q, H, tt, ot, w, G, nt, U, rt, It, gt, At, lt, Lt, se, $t, Ut, pt, mt, ut, Ce, I, Bt, Xe, Ie, Rt, Nt, ce, Ge, Xt = function(v) {
      return Ai(v), v.stopImmediatePropagation && v.stopImmediatePropagation(), !1;
    }, re = function j(v) {
      if (u.autoScroll && u.isDragging && (b || lt)) {
        var $ = e, E = u.autoScroll * 15, M, N, D, Y, z, W, et, K;
        for (b = !1, cn.scrollTop = Ht.pageYOffset != null ? Ht.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, cn.scrollLeft = Ht.pageXOffset != null ? Ht.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft, Y = u.pointerX - cn.scrollLeft, z = u.pointerY - cn.scrollTop; $ && !N; )
          N = rr($.parentNode), M = N ? cn : $.parentNode, D = N ? {
            bottom: Math.max(Yi.clientHeight, Ht.innerHeight || 0),
            right: Math.max(Yi.clientWidth, Ht.innerWidth || 0),
            left: 0,
            top: 0
          } : M.getBoundingClientRect(), W = et = 0, d && (K = M._gsMaxScrollY - M.scrollTop, K < 0 ? et = K : z > D.bottom - T && K ? (b = !0, et = Math.min(K, E * (1 - Math.max(0, D.bottom - z) / T) | 0)) : z < D.top + A && M.scrollTop && (b = !0, et = -Math.min(M.scrollTop, E * (1 - Math.max(0, z - D.top) / A) | 0)), et && (M.scrollTop += et)), h && (K = M._gsMaxScrollX - M.scrollLeft, K < 0 ? W = K : Y > D.right - C && K ? (b = !0, W = Math.min(K, E * (1 - Math.max(0, D.right - Y) / C) | 0)) : Y < D.left + y && M.scrollLeft && (b = !0, W = -Math.min(M.scrollLeft, E * (1 - Math.max(0, Y - D.left) / y) | 0)), W && (M.scrollLeft += W)), N && (W || et) && (Ht.scrollTo(M.scrollLeft, M.scrollTop), $e(u.pointerX + W, u.pointerY + et)), $ = M;
      }
      if (lt) {
        var dt = u.x, xt = u.y;
        a ? (u.deltaX = dt - parseFloat(S.rotation), u.rotation = dt, S.rotation = dt + "deg", S.renderTransform(1, S)) : B ? (d && (u.deltaY = xt - B.top(), B.top(xt)), h && (u.deltaX = dt - B.left(), B.left(dt))) : o ? (d && (u.deltaY = xt - parseFloat(S.y), S.y = xt + "px"), h && (u.deltaX = dt - parseFloat(S.x), S.x = dt + "px"), S.renderTransform(1, S)) : (d && (u.deltaY = xt - parseFloat(e.style.top || 0), e.style.top = xt + "px"), h && (u.deltaX = dt - parseFloat(e.style.left || 0), e.style.left = dt + "px")), ot && !v && !Xe && (Xe = !0, ae(u, "drag", "onDrag") === !1 && (h && (u.x -= u.deltaX), d && (u.y -= u.deltaY), j(!0)), Xe = !1);
      }
      lt = !1;
    }, Pt = function(v, $) {
      var E = u.x, M = u.y, N, D;
      e._gsap || (S = St.core.getCache(e)), S.uncache && St.getProperty(e, "x"), o ? (u.x = parseFloat(S.x), u.y = parseFloat(S.y)) : a ? u.x = u.rotation = parseFloat(S.rotation) : B ? (u.y = B.top(), u.x = B.left()) : (u.y = parseFloat(e.style.top || (D = lo(e)) && D.top) || 0, u.x = parseFloat(e.style.left || (D || {}).left) || 0), (se || $t || Ut) && !$ && (u.isDragging || u.isThrowing) && (Ut && (As.x = u.x, As.y = u.y, N = Ut(As), N.x !== u.x && (u.x = N.x, lt = !0), N.y !== u.y && (u.y = N.y, lt = !0)), se && (N = se(u.x), N !== u.x && (u.x = N, a && (u.rotation = N), lt = !0)), $t && (N = $t(u.y), N !== u.y && (u.y = N), lt = !0)), lt && re(!0), v || (u.deltaX = u.x - E, u.deltaY = u.y - M, ae(u, "throwupdate", "onThrowUpdate"));
    }, he = function(v, $, E, M) {
      return $ == null && ($ = -1e20), E == null && (E = Es), Pn(v) ? function(N) {
        var D = u.isPressed ? 1 - u.edgeResistance : 1;
        return v.call(u, (N > E ? E + (N - E) * D : N < $ ? $ + (N - $) * D : N) * M) * M;
      } : mr(v) ? function(N) {
        for (var D = v.length, Y = 0, z = Es, W, et; --D > -1; )
          W = v[D], et = W - N, et < 0 && (et = -et), et < z && W >= $ && W <= E && (Y = D, z = et);
        return v[Y];
      } : isNaN(v) ? function(N) {
        return N;
      } : function() {
        return v * M;
      };
    }, De = function(v, $, E, M, N, D, Y) {
      return D = D && D < Es ? D * D : Es, Pn(v) ? function(z) {
        var W = u.isPressed ? 1 - u.edgeResistance : 1, et = z.x, K = z.y, dt, xt, Ct;
        return z.x = et = et > E ? E + (et - E) * W : et < $ ? $ + (et - $) * W : et, z.y = K = K > N ? N + (K - N) * W : K < M ? M + (K - M) * W : K, dt = v.call(u, z), dt !== z && (z.x = dt.x, z.y = dt.y), Y !== 1 && (z.x *= Y, z.y *= Y), D < Es && (xt = z.x - et, Ct = z.y - K, xt * xt + Ct * Ct > D && (z.x = et, z.y = K)), z;
      } : mr(v) ? function(z) {
        for (var W = v.length, et = 0, K = Es, dt, xt, Ct, _t; --W > -1; )
          Ct = v[W], dt = Ct.x - z.x, xt = Ct.y - z.y, _t = dt * dt + xt * xt, _t < K && (et = W, K = _t);
        return K <= D ? v[et] : z;
      } : function(z) {
        return z;
      };
    }, ze = function() {
      var v, $, E, M;
      tt = !1, B ? (B.calibrate(), u.minX = nt = -B.maxScrollLeft(), u.minY = rt = -B.maxScrollTop(), u.maxX = G = u.maxY = U = 0, tt = !0) : i.bounds && (v = gh(i.bounds, e.parentNode), a ? (u.minX = nt = v.left, u.maxX = G = v.left + v.width, u.minY = rt = u.maxY = U = 0) : !Bi(i.bounds.maxX) || !Bi(i.bounds.maxY) ? (v = i.bounds, u.minX = nt = v.minX, u.minY = rt = v.minY, u.maxX = G = v.maxX, u.maxY = U = v.maxY) : ($ = gh(e, e.parentNode), u.minX = nt = Math.round(R(l, "px") + v.left - $.left), u.minY = rt = Math.round(R(c, "px") + v.top - $.top), u.maxX = G = Math.round(nt + (v.width - $.width)), u.maxY = U = Math.round(rt + (v.height - $.height))), nt > G && (u.minX = G, u.maxX = G = nt, nt = u.minX), rt > U && (u.minY = U, u.maxY = U = rt, rt = u.minY), a && (u.minRotation = nt, u.maxRotation = G), tt = !0), i.liveSnap && (E = i.liveSnap === !0 ? i.snap || {} : i.liveSnap, M = mr(E) || Pn(E), a ? (se = he(M ? E : E.rotation, nt, G, 1), $t = null) : E.points ? Ut = De(M ? E : E.points, nt, G, rt, U, E.radius, B ? -1 : 1) : (h && (se = he(M ? E : E.x || E.left || E.scrollLeft, nt, G, B ? -1 : 1)), d && ($t = he(M ? E : E.y || E.top || E.scrollTop, rt, U, B ? -1 : 1))));
    }, Ui = function() {
      u.isThrowing = !1, ae(u, "throwcomplete", "onThrowComplete");
    }, Kt = function() {
      u.isThrowing = !1;
    }, Ki = function(v, $) {
      var E, M, N, D;
      v && Ni ? (v === !0 && (E = i.snap || i.liveSnap || {}, M = mr(E) || Pn(E), v = {
        resistance: (i.throwResistance || i.resistance || 1e3) / (a ? 10 : 1)
      }, a ? v.rotation = cl(u, M ? E : E.rotation, G, nt, 1, $) : (h && (v[l] = cl(u, M ? E : E.points || E.x || E.left, G, nt, B ? -1 : 1, $ || u.lockedAxis === "x")), d && (v[c] = cl(u, M ? E : E.points || E.y || E.top, U, rt, B ? -1 : 1, $ || u.lockedAxis === "y")), (E.points || mr(E) && $r(E[0])) && (v.linkedProps = l + "," + c, v.radius = E.radius))), u.isThrowing = !0, D = isNaN(i.overshootTolerance) ? i.edgeResistance === 1 ? 0 : 1 - u.edgeResistance + 0.2 : i.overshootTolerance, v.duration || (v.duration = {
        max: Math.max(i.minDuration || 0, "maxDuration" in i ? i.maxDuration : 2),
        min: isNaN(i.minDuration) ? D === 0 || $r(v) && v.resistance > 1e3 ? 0 : 0.5 : i.minDuration,
        overshoot: D
      }), u.tween = N = St.to(B || e, {
        inertia: v,
        data: "_draggable",
        inherit: !1,
        onComplete: Ui,
        onInterrupt: Kt,
        onUpdate: i.fastMode ? ae : Pt,
        onUpdateParams: i.fastMode ? [u, "onthrowupdate", "onThrowUpdate"] : E && E.radius ? [!1, !0] : []
      }), i.fastMode || (B && (B._skip = !0), N.render(1e9, !0, !0), Pt(!0, !0), u.endX = u.x, u.endY = u.y, a && (u.endRotation = u.x), N.play(0), Pt(!0, !0), B && (B._skip = !1))) : tt && u.applyBounds();
    }, ri = function(v) {
      var $ = ut, E;
      ut = Qn(e.parentNode, !0), v && u.isPressed && !ut.equals($ || new ms()) && (E = $.inverse().apply({
        x: J,
        y: it
      }), ut.apply(E, E), J = E.x, it = E.y), ut.equals(V0) && (ut = null);
    }, ve = function() {
      var v = 1 - u.edgeResistance, $ = k ? Us(V) : 0, E = k ? qs(V) : 0, M, N, D;
      o && (S.x = R(l, "px") + "px", S.y = R(c, "px") + "px", S.renderTransform()), ri(!1), Ci.x = u.pointerX - $, Ci.y = u.pointerY - E, ut && ut.apply(Ci, Ci), J = Ci.x, it = Ci.y, lt && ($e(u.pointerX, u.pointerY), re(!0)), ce = Qn(e), B ? (ze(), H = B.top(), q = B.left()) : (Le() ? (Pt(!0, !0), ze()) : u.applyBounds(), a ? (M = e.ownerSVGElement ? [S.xOrigin - e.getBBox().x, S.yOrigin - e.getBBox().y] : (lo(e)[ql] || "0 0").split(" "), At = u.rotationOrigin = Qn(e).apply({
        x: parseFloat(M[0]) || 0,
        y: parseFloat(M[1]) || 0
      }), Pt(!0, !0), N = u.pointerX - At.x - $, D = At.y - u.pointerY + E, q = u.x, H = u.y = Math.atan2(D, N) * ah) : (H = R(c, "px"), q = R(l, "px"))), tt && v && (q > G ? q = G + (q - G) / v : q < nt && (q = nt - (nt - q) / v), a || (H > U ? H = U + (H - U) / v : H < rt && (H = rt - (rt - H) / v))), u.startX = q = Sn(q), u.startY = H = Sn(H);
    }, Le = function() {
      return u.tween && u.tween.isActive();
    }, Ti = function() {
      fn.parentNode && !Le() && !u.isDragging && fn.parentNode.removeChild(fn);
    }, Ne = function(v, $) {
      var E;
      if (!F || u.isPressed || !v || (v.type === "mousedown" || v.type === "pointerdown") && !$ && En() - P < 30 && ao[u.pointerEvent.type]) {
        Nt && v && F && Ai(v);
        return;
      }
      if (Ce = Le(), Ge = !1, u.pointerEvent = v, ao[v.type] ? (mt = ~v.type.indexOf("touch") ? v.currentTarget || v.target : V, Se(mt, "touchend", Ft), Se(mt, "touchmove", at), Se(mt, "touchcancel", Ft), Se(V, "touchstart", dh)) : (mt = null, Se(V, "mousemove", at)), Bt = null, (!ea || !mt) && (Se(V, "mouseup", Ft), v && v.target && Se(v.target, "mouseup", Ft)), pt = O.call(u, v.target) && i.dragClickables === !1 && !$, pt) {
        Se(v.target, "change", Ft), ae(u, "pressInit", "onPressInit"), ae(u, "press", "onPress"), Lo(m, !0), Nt = !1;
        return;
      }
      if (I = !mt || h === d || u.vars.allowNativeTouchScrolling === !1 || u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2) ? !1 : h ? "y" : "x", Nt = !I && !u.allowEventDefault, Nt && (Ai(v), Se(Ht, "touchforcechange", Ai)), v.changedTouches ? (v = It = v.changedTouches[0], gt = v.identifier) : v.pointerId ? gt = v.pointerId : It = gt = null, va++, q0(re), it = u.pointerY = v.pageY, J = u.pointerX = v.pageX, ae(u, "pressInit", "onPressInit"), (I || u.autoScroll) && ll(e.parentNode), e.parentNode && u.autoScroll && !B && !a && e.parentNode._gsMaxScrollX && !fn.parentNode && !e.getBBox && (fn.style.width = e.parentNode.scrollWidth + "px", e.parentNode.appendChild(fn)), ve(), u.tween && u.tween.kill(), u.isThrowing = !1, St.killTweensOf(B || e, p, !0), B && St.killTweensOf(e, {
        scrollTo: 1
      }, !0), u.tween = u.lockedAxis = null, (i.zIndexBoost || !a && !B && i.zIndexBoost !== !1) && (e.style.zIndex = t.zIndex++), u.isPressed = !0, ot = !!(i.onDrag || u._listeners.drag), w = !!(i.onMove || u._listeners.move), i.cursor !== !1 || i.activeCursor)
        for (E = m.length; --E > -1; )
          St.set(m[E], {
            cursor: i.activeCursor || i.cursor || (Ar === "grab" ? "grabbing" : Ar)
          });
      ae(u, "press", "onPress");
    }, at = function(v) {
      var $ = v, E, M, N, D, Y, z;
      if (!F || tc || !u.isPressed || !v) {
        Nt && v && F && Ai(v);
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
      if (mt && I && !Bt && (Ci.x = v.pageX - (k ? Us(V) : 0), Ci.y = v.pageY - (k ? qs(V) : 0), ut && ut.apply(Ci, Ci), M = Ci.x, N = Ci.y, Y = Math.abs(M - J), z = Math.abs(N - it), (Y !== z && (Y > f || z > f) || Er && I === Bt) && (Bt = Y > z && h ? "x" : "y", I && Bt !== I && Se(Ht, "touchforcechange", Ai), u.vars.lockAxisOnTouchScroll !== !1 && h && d && (u.lockedAxis = Bt === "x" ? "y" : "x", Pn(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, $)), Er && I === Bt))) {
        Ft($);
        return;
      }
      !u.allowEventDefault && (!I || Bt && I !== Bt) && $.cancelable !== !1 ? (Ai($), Nt = !0) : Nt && (Nt = !1), u.autoScroll && (b = !0), $e(v.pageX, v.pageY, w);
    }, $e = function(v, $, E) {
      var M = 1 - u.dragResistance, N = 1 - u.edgeResistance, D = u.pointerX, Y = u.pointerY, z = H, W = u.x, et = u.y, K = u.endX, dt = u.endY, xt = u.endRotation, Ct = lt, _t, ft, Ot, ct, be, Gt;
      u.pointerX = v, u.pointerY = $, k && (v -= Us(V), $ -= qs(V)), a ? (ct = Math.atan2(At.y - $, v - At.x) * ah, be = u.y - ct, be > 180 ? (H -= 360, u.y = ct) : be < -180 && (H += 360, u.y = ct), u.x !== q || Math.max(Math.abs(J - v), Math.abs(it - $)) > f ? (u.y = ct, Ot = q + (H - ct) * M) : Ot = q) : (ut && (Gt = v * ut.a + $ * ut.c + ut.e, $ = v * ut.b + $ * ut.d + ut.f, v = Gt), ft = $ - it, _t = v - J, ft < f && ft > -f && (ft = 0), _t < f && _t > -f && (_t = 0), (u.lockAxis || u.lockedAxis) && (_t || ft) && (Gt = u.lockedAxis, Gt || (u.lockedAxis = Gt = h && Math.abs(_t) > Math.abs(ft) ? "y" : d ? "x" : null, Gt && Pn(u.vars.onLockAxis) && u.vars.onLockAxis.call(u, u.pointerEvent)), Gt === "y" ? ft = 0 : Gt === "x" && (_t = 0)), Ot = Sn(q + _t * M), ct = Sn(H + ft * M)), (se || $t || Ut) && (u.x !== Ot || u.y !== ct && !a) && (Ut && (As.x = Ot, As.y = ct, Gt = Ut(As), Ot = Sn(Gt.x), ct = Sn(Gt.y)), se && (Ot = Sn(se(Ot))), $t && (ct = Sn($t(ct)))), tt && (Ot > G ? Ot = G + Math.round((Ot - G) * N) : Ot < nt && (Ot = nt + Math.round((Ot - nt) * N)), a || (ct > U ? ct = Math.round(U + (ct - U) * N) : ct < rt && (ct = Math.round(rt + (ct - rt) * N)))), (u.x !== Ot || u.y !== ct && !a) && (a ? (u.endRotation = u.x = u.endX = Ot, lt = !0) : (d && (u.y = u.endY = ct, lt = !0), h && (u.x = u.endX = Ot, lt = !0)), !E || ae(u, "move", "onMove") !== !1 ? !u.isDragging && u.isPressed && (u.isDragging = Ge = !0, ae(u, "dragstart", "onDragStart")) : (u.pointerX = D, u.pointerY = Y, H = z, u.x = W, u.y = et, u.endX = K, u.endY = dt, u.endRotation = xt, lt = Ct));
    }, Ft = function j(v, $) {
      if (!F || !u.isPressed || v && gt != null && !$ && (v.pointerId && v.pointerId !== gt && v.target !== e || v.changedTouches && !K0(v.changedTouches, gt))) {
        Nt && v && F && Ai(v);
        return;
      }
      u.isPressed = !1;
      var E = v, M = u.isDragging, N = u.vars.allowContextMenu && v && (v.ctrlKey || v.which > 2), D = St.delayedCall(1e-3, Ti), Y, z, W, et, K;
      if (mt ? (pe(mt, "touchend", j), pe(mt, "touchmove", at), pe(mt, "touchcancel", j), pe(V, "touchstart", dh)) : pe(V, "mousemove", at), pe(Ht, "touchforcechange", Ai), (!ea || !mt) && (pe(V, "mouseup", j), v && v.target && pe(v.target, "mouseup", j)), lt = !1, M && (_ = lh = En(), u.isDragging = !1), hh(re), pt && !N) {
        v && (pe(v.target, "change", j), u.pointerEvent = E), Lo(m, !1), ae(u, "release", "onRelease"), ae(u, "click", "onClick"), pt = !1;
        return;
      }
      for (z = m.length; --z > -1; )
        ul(m[z], "cursor", i.cursor || (i.cursor !== !1 ? Ar : null));
      if (va--, v) {
        if (Y = v.changedTouches, Y && (v = Y[0], v !== It && v.identifier !== gt)) {
          for (z = Y.length; --z > -1 && (v = Y[z]).identifier !== gt && v.target !== e; )
            ;
          if (z < 0 && !$)
            return;
        }
        u.pointerEvent = E, u.pointerX = v.pageX, u.pointerY = v.pageY;
      }
      return N && E ? (Ai(E), Nt = !0, ae(u, "release", "onRelease")) : E && !M ? (Nt = !1, Ce && (i.snap || i.bounds) && Ki(i.inertia || i.throwProps), ae(u, "release", "onRelease"), (!Er || E.type !== "touchmove") && E.type.indexOf("cancel") === -1 && (ae(u, "click", "onClick"), En() - P < 300 && ae(u, "doubleclick", "onDoubleClick"), et = E.target || e, P = En(), K = function() {
        P !== Ie && u.enabled() && !u.isPressed && !E.defaultPrevented && (et.click ? et.click() : V.createEvent && (W = V.createEvent("MouseEvents"), W.initMouseEvent("click", !0, !0, Ht, 1, u.pointerEvent.screenX, u.pointerEvent.screenY, u.pointerX, u.pointerY, !1, !1, !1, !1, 0, null), et.dispatchEvent(W)));
      }, !Er && !E.defaultPrevented && St.delayedCall(0.05, K))) : (Ki(i.inertia || i.throwProps), !u.allowEventDefault && E && (i.dragClickables !== !1 || !O.call(u, E.target)) && M && (!I || Bt && I === Bt) && E.cancelable !== !1 ? (Nt = !0, Ai(E)) : Nt = !1, ae(u, "release", "onRelease")), Le() && D.duration(u.tween.duration()), M && ae(u, "dragend", "onDragEnd"), !0;
    }, Pe = function(v) {
      if (v && u.isDragging && !B) {
        var $ = v.target || e.parentNode, E = $.scrollLeft - $._gsScrollX, M = $.scrollTop - $._gsScrollY;
        (E || M) && (ut ? (J -= E * ut.a + M * ut.c, it -= M * ut.d + E * ut.b) : (J -= E, it -= M), $._gsScrollX += E, $._gsScrollY += M, $e(u.pointerX, u.pointerY));
      }
    }, ie = function(v) {
      var $ = En(), E = $ - P < 100, M = $ - _ < 50, N = E && Ie === P, D = u.pointerEvent && u.pointerEvent.defaultPrevented, Y = E && Rt === P, z = v.isTrusted || v.isTrusted == null && E && N;
      if ((N || M && u.vars.suppressClickOnDrag !== !1) && v.stopImmediatePropagation && v.stopImmediatePropagation(), E && !(u.pointerEvent && u.pointerEvent.defaultPrevented) && (!N || z && !Y)) {
        z && N && (Rt = P), Ie = P;
        return;
      }
      (u.isPressed || M || E) && (!z || !v.detail || !E || D) && Ai(v), !E && !M && !Ge && (v && v.target && (u.pointerEvent = v), ae(u, "click", "onClick"));
    }, Si = function(v) {
      return ut ? {
        x: v.x * ut.a + v.y * ut.c + ut.e,
        y: v.x * ut.b + v.y * ut.d + ut.f
      } : {
        x: v.x,
        y: v.y
      };
    };
    return Lt = t.get(e), Lt && Lt.kill(), n.startDrag = function(j, v) {
      var $, E, M, N;
      Ne(j || u.pointerEvent, !0), v && !u.hitTest(j || u.pointerEvent) && ($ = Cs(j || u.pointerEvent), E = Cs(e), M = Si({
        x: $.left + $.width / 2,
        y: $.top + $.height / 2
      }), N = Si({
        x: E.left + E.width / 2,
        y: E.top + E.height / 2
      }), J -= M.x - N.x, it -= M.y - N.y), u.isDragging || (u.isDragging = Ge = !0, ae(u, "dragstart", "onDragStart"));
    }, n.drag = at, n.endDrag = function(j) {
      return Ft(j || u.pointerEvent, !0);
    }, n.timeSinceDrag = function() {
      return u.isDragging ? 0 : (En() - _) / 1e3;
    }, n.timeSinceClick = function() {
      return (En() - P) / 1e3;
    }, n.hitTest = function(j, v) {
      return t.hitTest(u.target, j, v);
    }, n.getDirection = function(j, v) {
      var $ = j === "velocity" && Ni ? j : $r(j) && !a ? "element" : "start", E, M, N, D, Y, z;
      return $ === "element" && (Y = Cs(u.target), z = Cs(j)), E = $ === "start" ? u.x - q : $ === "velocity" ? Ni.getVelocity(e, l) : Y.left + Y.width / 2 - (z.left + z.width / 2), a ? E < 0 ? "counter-clockwise" : "clockwise" : (v = v || 2, M = $ === "start" ? u.y - H : $ === "velocity" ? Ni.getVelocity(e, c) : Y.top + Y.height / 2 - (z.top + z.height / 2), N = Math.abs(E / M), D = N < 1 / v ? "" : E < 0 ? "left" : "right", N < v && (D !== "" && (D += "-"), D += M < 0 ? "up" : "down"), D);
    }, n.applyBounds = function(j, v) {
      var $, E, M, N, D, Y;
      if (j && i.bounds !== j)
        return i.bounds = j, u.update(!0, v);
      if (Pt(!0), ze(), tt && !Le()) {
        if ($ = u.x, E = u.y, $ > G ? $ = G : $ < nt && ($ = nt), E > U ? E = U : E < rt && (E = rt), (u.x !== $ || u.y !== E) && (M = !0, u.x = u.endX = $, a ? u.endRotation = $ : u.y = u.endY = E, lt = !0, re(!0), u.autoScroll && !u.isDragging))
          for (ll(e.parentNode), N = e, cn.scrollTop = Ht.pageYOffset != null ? Ht.pageYOffset : V.documentElement.scrollTop != null ? V.documentElement.scrollTop : V.body.scrollTop, cn.scrollLeft = Ht.pageXOffset != null ? Ht.pageXOffset : V.documentElement.scrollLeft != null ? V.documentElement.scrollLeft : V.body.scrollLeft; N && !Y; )
            Y = rr(N.parentNode), D = Y ? cn : N.parentNode, d && D.scrollTop > D._gsMaxScrollY && (D.scrollTop = D._gsMaxScrollY), h && D.scrollLeft > D._gsMaxScrollX && (D.scrollLeft = D._gsMaxScrollX), N = D;
        u.isThrowing && (M || u.endX > G || u.endX < nt || u.endY > U || u.endY < rt) && Ki(i.inertia || i.throwProps, M);
      }
      return u;
    }, n.update = function(j, v, $) {
      if (v && u.isPressed) {
        var E = Qn(e), M = ce.apply({
          x: u.x - q,
          y: u.y - H
        }), N = Qn(e.parentNode, !0);
        N.apply({
          x: E.e - M.x,
          y: E.f - M.y
        }, M), u.x -= M.x - N.e, u.y -= M.y - N.f, re(!0), ve();
      }
      var D = u.x, Y = u.y;
      return ri(!v), j ? u.applyBounds() : (lt && $ && re(!0), Pt(!0)), v && ($e(u.pointerX, u.pointerY), lt && re(!0)), u.isPressed && !v && (h && Math.abs(D - u.x) > 0.01 || d && Math.abs(Y - u.y) > 0.01 && !a) && ve(), u.autoScroll && (ll(e.parentNode, u.isDragging), b = u.isDragging, re(!0), ph(e, Pe), fh(e, Pe)), u;
    }, n.enable = function(j) {
      var v = {
        lazy: !0
      }, $, E, M;
      if (i.cursor !== !1 && (v.cursor = i.cursor || Ar), St.utils.checkPrefix("touchCallout") && (v.touchCallout = "none"), j !== "soft") {
        for (uh(m, h === d ? "none" : i.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), E = m.length; --E > -1; )
          M = m[E], ea || Se(M, "mousedown", Ne), Se(M, "touchstart", Ne), Se(M, "click", ie, !0), St.set(M, v), M.getBBox && M.ownerSVGElement && h !== d && St.set(M.ownerSVGElement, {
            touchAction: i.allowNativeTouchScrolling || i.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), i.allowContextMenu || Se(M, "contextmenu", Xt);
        Lo(m, !1);
      }
      return fh(e, Pe), F = !0, Ni && j !== "soft" && Ni.track(B || e, o ? "x,y" : a ? "rotation" : "top,left"), e._gsDragID = $ = e._gsDragID || "d" + H0++, Ws[$] = u, B && (B.enable(), B.element._gsDragID = $), (i.bounds || a) && ve(), i.bounds && u.applyBounds(), u;
    }, n.disable = function(j) {
      for (var v = u.isDragging, $ = m.length, E; --$ > -1; )
        ul(m[$], "cursor", null);
      if (j !== "soft") {
        for (uh(m, null), $ = m.length; --$ > -1; )
          E = m[$], ul(E, "touchCallout", null), pe(E, "mousedown", Ne), pe(E, "touchstart", Ne), pe(E, "click", ie, !0), pe(E, "contextmenu", Xt);
        Lo(m, !0), mt && (pe(mt, "touchcancel", Ft), pe(mt, "touchend", Ft), pe(mt, "touchmove", at)), pe(V, "mouseup", Ft), pe(V, "mousemove", at);
      }
      return ph(e, Pe), F = !1, Ni && j !== "soft" && (Ni.untrack(B || e, o ? "x,y" : a ? "rotation" : "top,left"), u.tween && u.tween.kill()), B && B.disable(), hh(re), u.isDragging = u.isPressed = pt = !1, v && ae(u, "dragend", "onDragEnd"), u;
    }, n.enabled = function(j, v) {
      return arguments.length ? j ? u.enable(v) : u.disable(v) : F;
    }, n.kill = function() {
      return u.isThrowing = !1, u.tween && u.tween.kill(), u.disable(), St.set(m, {
        clearProps: "userSelect"
      }), delete Ws[e._gsDragID], u;
    }, n.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~r.indexOf("scroll") && (B = n.scrollProxy = new Q0(e, W0({
      onKill: function() {
        u.isPressed && Ft(null);
      }
    }, i)), e.style.overflowY = d && !Yl ? "auto" : "hidden", e.style.overflowX = h && !Yl ? "auto" : "hidden", e = B.content), a ? p.rotation = 1 : (h && (p[l] = 1), d && (p[c] = 1)), S.force3D = "force3D" in i ? i.force3D : !0, kf(oh(n)), n.enable(), n;
  }
  return t.register = function(i) {
    St = i, hl();
  }, t.create = function(i, n) {
    return Hl || hl(!0), In(i).map(function(r) {
      return new t(r, n);
    });
  }, t.get = function(i) {
    return Ws[(In(i)[0] || {})._gsDragID];
  }, t.timeSinceDrag = function() {
    return (En() - lh) / 1e3;
  }, t.hitTest = function(i, n, r) {
    if (i === n)
      return !1;
    var o = Cs(i), a = Cs(n), l = o.top, c = o.left, h = o.right, d = o.bottom, f = o.width, u = o.height, m = a.left > h || a.right < c || a.top > d || a.bottom < l, p, _, b;
    return m || !r ? !m : (b = (r + "").indexOf("%") !== -1, r = parseFloat(r) || 0, p = {
      left: Math.max(c, a.left),
      top: Math.max(l, a.top)
    }, p.width = Math.min(h, a.right) - p.left, p.height = Math.min(d, a.bottom) - p.top, p.width < 0 || p.height < 0 ? !1 : b ? (r *= 0.01, _ = p.width * p.height, _ >= f * u * r || _ >= a.width * a.height * r) : p.width > r && p.height > r);
  }, t;
}(J0);
U0(Na.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
Na.zIndex = 1e3;
Na.version = "3.13.0";
If() && St.registerPlugin(Na);
function t_(s, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, i.key, i);
  }
}
function e_(s, t, e) {
  return t && t_(s.prototype, t), s;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Re, na, yi, Dn, Ln, Ks, Ff, jn, Vr, zf, _n, $i, Nf, $f = function() {
  return Re || typeof window < "u" && (Re = window.gsap) && Re.registerPlugin && Re;
}, Bf = 1, zs = [], bt = [], nn = [], Hr = Date.now, Kl = function(t, e) {
  return e;
}, i_ = function() {
  var t = Vr.core, e = t.bridge || {}, i = t._scrollers, n = t._proxies;
  i.push.apply(i, bt), n.push.apply(n, nn), bt = i, nn = n, Kl = function(o, a) {
    return e[o](a);
  };
}, zn = function(t, e) {
  return ~nn.indexOf(t) && nn[nn.indexOf(t) + 1][e];
}, Yr = function(t) {
  return !!~zf.indexOf(t);
}, Qe = function(t, e, i, n, r) {
  return t.addEventListener(e, i, {
    passive: n !== !1,
    capture: !!r
  });
}, Ze = function(t, e, i, n) {
  return t.removeEventListener(e, i, !!n);
}, Ro = "scrollLeft", Fo = "scrollTop", Xl = function() {
  return _n && _n.isPressed || bt.cache++;
}, ba = function(t, e) {
  var i = function n(r) {
    if (r || r === 0) {
      Bf && (yi.history.scrollRestoration = "manual");
      var o = _n && _n.isPressed;
      r = n.v = Math.round(r) || (_n && _n.iOS ? 1 : 0), t(r), n.cacheID = bt.cache, o && Kl("ss", r);
    } else (e || bt.cache !== n.cacheID || Kl("ref")) && (n.cacheID = bt.cache, n.v = t());
    return n.v + n.offset;
  };
  return i.offset = 0, t && i;
}, ni = {
  s: Ro,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: ba(function(s) {
    return arguments.length ? yi.scrollTo(s, Ae.sc()) : yi.pageXOffset || Dn[Ro] || Ln[Ro] || Ks[Ro] || 0;
  })
}, Ae = {
  s: Fo,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ni,
  sc: ba(function(s) {
    return arguments.length ? yi.scrollTo(ni.sc(), s) : yi.pageYOffset || Dn[Fo] || Ln[Fo] || Ks[Fo] || 0;
  })
}, oi = function(t, e) {
  return (e && e._ctx && e._ctx.selector || Re.utils.toArray)(t)[0] || (typeof t == "string" && Re.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, n_ = function(t, e) {
  for (var i = e.length; i--; )
    if (e[i] === t || e[i].contains(t))
      return !0;
  return !1;
}, Hn = function(t, e) {
  var i = e.s, n = e.sc;
  Yr(t) && (t = Dn.scrollingElement || Ln);
  var r = bt.indexOf(t), o = n === Ae.sc ? 1 : 2;
  !~r && (r = bt.push(t) - 1), bt[r + o] || Qe(t, "scroll", Xl);
  var a = bt[r + o], l = a || (bt[r + o] = ba(zn(t, i), !0) || (Yr(t) ? n : ba(function(c) {
    return arguments.length ? t[i] = c : t[i];
  })));
  return l.target = t, a || (l.smooth = Re.getProperty(t, "scrollBehavior") === "smooth"), l;
}, Gl = function(t, e, i) {
  var n = t, r = t, o = Hr(), a = o, l = e || 50, c = Math.max(500, l * 3), h = function(m, p) {
    var _ = Hr();
    p || _ - o > l ? (r = n, n = m, a = o, o = _) : i ? n += m : n = r + (m - r) / (_ - a) * (o - a);
  }, d = function() {
    r = n = i ? 0 : n, a = o = 0;
  }, f = function(m) {
    var p = a, _ = r, b = Hr();
    return (m || m === 0) && m !== n && h(m), o === a || b - a > c ? 0 : (n + (i ? _ : -_)) / ((i ? b : o) - p) * 1e3;
  };
  return {
    update: h,
    reset: d,
    getVelocity: f
  };
}, gr = function(t, e) {
  return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, _h = function(t) {
  var e = Math.max.apply(Math, t), i = Math.min.apply(Math, t);
  return Math.abs(e) >= Math.abs(i) ? e : i;
}, Vf = function() {
  Vr = Re.core.globals().ScrollTrigger, Vr && Vr.core && i_();
}, Hf = function(t) {
  return Re = t || $f(), !na && Re && typeof document < "u" && document.body && (yi = window, Dn = document, Ln = Dn.documentElement, Ks = Dn.body, zf = [yi, Dn, Ln, Ks], Re.utils.clamp, Nf = Re.core.context || function() {
  }, jn = "onpointerenter" in Ks ? "pointer" : "mouse", Ff = ue.isTouch = yi.matchMedia && yi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in yi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, $i = ue.eventTypes = ("ontouchstart" in Ln ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ln ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Bf = 0;
  }, 500), Vf(), na = 1), na;
};
ni.op = Ae;
bt.cache = 0;
var ue = /* @__PURE__ */ function() {
  function s(e) {
    this.init(e);
  }
  var t = s.prototype;
  return t.init = function(i) {
    na || Hf(Re) || console.warn("Please gsap.registerPlugin(Observer)"), Vr || Vf();
    var n = i.tolerance, r = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, c = i.debounce, h = i.preventDefault, d = i.onStop, f = i.onStopDelay, u = i.ignore, m = i.wheelSpeed, p = i.event, _ = i.onDragStart, b = i.onDragEnd, A = i.onDrag, C = i.onPress, T = i.onRelease, y = i.onRight, O = i.onLeft, P = i.onUp, S = i.onDown, k = i.onChangeX, R = i.onChangeY, V = i.onChange, F = i.onToggleX, B = i.onToggleY, J = i.onHover, it = i.onHoverEnd, q = i.onMove, H = i.ignoreCheck, tt = i.isNormalizer, ot = i.onGestureStart, w = i.onGestureEnd, G = i.onWheel, nt = i.onEnable, U = i.onDisable, rt = i.onClick, It = i.scrollSpeed, gt = i.capture, At = i.allowClicks, lt = i.lockAxis, Lt = i.onLockAxis;
    this.target = a = oi(a) || Ln, this.vars = i, u && (u = Re.utils.toArray(u)), n = n || 1e-9, r = r || 0, m = m || 1, It = It || 1, o = o || "wheel,touch,pointer", c = c !== !1, l || (l = parseFloat(yi.getComputedStyle(Ks).lineHeight) || 22);
    var se, $t, Ut, pt, mt, ut, Ce, I = this, Bt = 0, Xe = 0, Ie = i.passive || !h && i.passive !== !1, Rt = Hn(a, ni), Nt = Hn(a, Ae), ce = Rt(), Ge = Nt(), Xt = ~o.indexOf("touch") && !~o.indexOf("pointer") && $i[0] === "pointerdown", re = Yr(a), Pt = a.ownerDocument || Dn, he = [0, 0, 0], De = [0, 0, 0], ze = 0, Ui = function() {
      return ze = Hr();
    }, Kt = function(M, N) {
      return (I.event = M) && u && n_(M.target, u) || N && Xt && M.pointerType !== "touch" || H && H(M, N);
    }, Ki = function() {
      I._vx.reset(), I._vy.reset(), $t.pause(), d && d(I);
    }, ri = function() {
      var M = I.deltaX = _h(he), N = I.deltaY = _h(De), D = Math.abs(M) >= n, Y = Math.abs(N) >= n;
      V && (D || Y) && V(I, M, N, he, De), D && (y && I.deltaX > 0 && y(I), O && I.deltaX < 0 && O(I), k && k(I), F && I.deltaX < 0 != Bt < 0 && F(I), Bt = I.deltaX, he[0] = he[1] = he[2] = 0), Y && (S && I.deltaY > 0 && S(I), P && I.deltaY < 0 && P(I), R && R(I), B && I.deltaY < 0 != Xe < 0 && B(I), Xe = I.deltaY, De[0] = De[1] = De[2] = 0), (pt || Ut) && (q && q(I), Ut && (_ && Ut === 1 && _(I), A && A(I), Ut = 0), pt = !1), ut && !(ut = !1) && Lt && Lt(I), mt && (G(I), mt = !1), se = 0;
    }, ve = function(M, N, D) {
      he[D] += M, De[D] += N, I._vx.update(M), I._vy.update(N), c ? se || (se = requestAnimationFrame(ri)) : ri();
    }, Le = function(M, N) {
      lt && !Ce && (I.axis = Ce = Math.abs(M) > Math.abs(N) ? "x" : "y", ut = !0), Ce !== "y" && (he[2] += M, I._vx.update(M, !0)), Ce !== "x" && (De[2] += N, I._vy.update(N, !0)), c ? se || (se = requestAnimationFrame(ri)) : ri();
    }, Ti = function(M) {
      if (!Kt(M, 1)) {
        M = gr(M, h);
        var N = M.clientX, D = M.clientY, Y = N - I.x, z = D - I.y, W = I.isDragging;
        I.x = N, I.y = D, (W || (Y || z) && (Math.abs(I.startX - N) >= r || Math.abs(I.startY - D) >= r)) && (Ut = W ? 2 : 1, W || (I.isDragging = !0), Le(Y, z));
      }
    }, Ne = I.onPress = function(E) {
      Kt(E, 1) || E && E.button || (I.axis = Ce = null, $t.pause(), I.isPressed = !0, E = gr(E), Bt = Xe = 0, I.startX = I.x = E.clientX, I.startY = I.y = E.clientY, I._vx.reset(), I._vy.reset(), Qe(tt ? a : Pt, $i[1], Ti, Ie, !0), I.deltaX = I.deltaY = 0, C && C(I));
    }, at = I.onRelease = function(E) {
      if (!Kt(E, 1)) {
        Ze(tt ? a : Pt, $i[1], Ti, !0);
        var M = !isNaN(I.y - I.startY), N = I.isDragging, D = N && (Math.abs(I.x - I.startX) > 3 || Math.abs(I.y - I.startY) > 3), Y = gr(E);
        !D && M && (I._vx.reset(), I._vy.reset(), h && At && Re.delayedCall(0.08, function() {
          if (Hr() - ze > 300 && !E.defaultPrevented) {
            if (E.target.click)
              E.target.click();
            else if (Pt.createEvent) {
              var z = Pt.createEvent("MouseEvents");
              z.initMouseEvent("click", !0, !0, yi, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), E.target.dispatchEvent(z);
            }
          }
        })), I.isDragging = I.isGesturing = I.isPressed = !1, d && N && !tt && $t.restart(!0), Ut && ri(), b && N && b(I), T && T(I, D);
      }
    }, $e = function(M) {
      return M.touches && M.touches.length > 1 && (I.isGesturing = !0) && ot(M, I.isDragging);
    }, Ft = function() {
      return (I.isGesturing = !1) || w(I);
    }, Pe = function(M) {
      if (!Kt(M)) {
        var N = Rt(), D = Nt();
        ve((N - ce) * It, (D - Ge) * It, 1), ce = N, Ge = D, d && $t.restart(!0);
      }
    }, ie = function(M) {
      if (!Kt(M)) {
        M = gr(M, h), G && (mt = !0);
        var N = (M.deltaMode === 1 ? l : M.deltaMode === 2 ? yi.innerHeight : 1) * m;
        ve(M.deltaX * N, M.deltaY * N, 0), d && !tt && $t.restart(!0);
      }
    }, Si = function(M) {
      if (!Kt(M)) {
        var N = M.clientX, D = M.clientY, Y = N - I.x, z = D - I.y;
        I.x = N, I.y = D, pt = !0, d && $t.restart(!0), (Y || z) && Le(Y, z);
      }
    }, j = function(M) {
      I.event = M, J(I);
    }, v = function(M) {
      I.event = M, it(I);
    }, $ = function(M) {
      return Kt(M) || gr(M, h) && rt(I);
    };
    $t = I._dc = Re.delayedCall(f || 0.25, Ki).pause(), I.deltaX = I.deltaY = 0, I._vx = Gl(0, 50, !0), I._vy = Gl(0, 50, !0), I.scrollX = Rt, I.scrollY = Nt, I.isDragging = I.isGesturing = I.isPressed = !1, Nf(this), I.enable = function(E) {
      return I.isEnabled || (Qe(re ? Pt : a, "scroll", Xl), o.indexOf("scroll") >= 0 && Qe(re ? Pt : a, "scroll", Pe, Ie, gt), o.indexOf("wheel") >= 0 && Qe(a, "wheel", ie, Ie, gt), (o.indexOf("touch") >= 0 && Ff || o.indexOf("pointer") >= 0) && (Qe(a, $i[0], Ne, Ie, gt), Qe(Pt, $i[2], at), Qe(Pt, $i[3], at), At && Qe(a, "click", Ui, !0, !0), rt && Qe(a, "click", $), ot && Qe(Pt, "gesturestart", $e), w && Qe(Pt, "gestureend", Ft), J && Qe(a, jn + "enter", j), it && Qe(a, jn + "leave", v), q && Qe(a, jn + "move", Si)), I.isEnabled = !0, I.isDragging = I.isGesturing = I.isPressed = pt = Ut = !1, I._vx.reset(), I._vy.reset(), ce = Rt(), Ge = Nt(), E && E.type && Ne(E), nt && nt(I)), I;
    }, I.disable = function() {
      I.isEnabled && (zs.filter(function(E) {
        return E !== I && Yr(E.target);
      }).length || Ze(re ? Pt : a, "scroll", Xl), I.isPressed && (I._vx.reset(), I._vy.reset(), Ze(tt ? a : Pt, $i[1], Ti, !0)), Ze(re ? Pt : a, "scroll", Pe, gt), Ze(a, "wheel", ie, gt), Ze(a, $i[0], Ne, gt), Ze(Pt, $i[2], at), Ze(Pt, $i[3], at), Ze(a, "click", Ui, !0), Ze(a, "click", $), Ze(Pt, "gesturestart", $e), Ze(Pt, "gestureend", Ft), Ze(a, jn + "enter", j), Ze(a, jn + "leave", v), Ze(a, jn + "move", Si), I.isEnabled = I.isPressed = I.isDragging = !1, U && U(I));
    }, I.kill = I.revert = function() {
      I.disable();
      var E = zs.indexOf(I);
      E >= 0 && zs.splice(E, 1), _n === I && (_n = 0);
    }, zs.push(I), tt && Yr(a) && (_n = I), I.enable(p);
  }, e_(s, [{
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
ue.register = Hf;
ue.getAll = function() {
  return zs.slice();
};
ue.getById = function(s) {
  return zs.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
$f() && Re.registerPlugin(ue);
/*!
 * ScrollToPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ye, Yf, yn, Ji, Nn, Wf, Xs, zo, qf = function() {
  return typeof window < "u";
}, Uf = function() {
  return Ye || qf() && (Ye = window.gsap) && Ye.registerPlugin && Ye;
}, Kf = function(t) {
  return typeof t == "string";
}, yh = function(t) {
  return typeof t == "function";
}, uo = function(t, e) {
  var i = e === "x" ? "Width" : "Height", n = "scroll" + i, r = "client" + i;
  return t === yn || t === Ji || t === Nn ? Math.max(Ji[n], Nn[n]) - (yn["inner" + i] || Ji[r] || Nn[r]) : t[n] - t["offset" + i];
}, co = function(t, e) {
  var i = "scroll" + (e === "x" ? "Left" : "Top");
  return t === yn && (t.pageXOffset != null ? i = "page" + e.toUpperCase() + "Offset" : t = Ji[i] != null ? Ji : Nn), function() {
    return t[i];
  };
}, s_ = function(t, e, i, n) {
  if (yh(t) && (t = t(e, i, n)), typeof t != "object")
    return Kf(t) && t !== "max" && t.charAt(1) !== "=" ? {
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
    r[o] = o !== "onAutoKill" && yh(t[o]) ? t[o](e, i, n) : t[o];
  return r;
}, Xf = function(t, e) {
  if (t = Wf(t)[0], !t || !t.getBoundingClientRect)
    return console.warn("scrollTo target doesn't exist. Using 0") || {
      x: 0,
      y: 0
    };
  var i = t.getBoundingClientRect(), n = !e || e === yn || e === Nn, r = n ? {
    top: Ji.clientTop - (yn.pageYOffset || Ji.scrollTop || Nn.scrollTop || 0),
    left: Ji.clientLeft - (yn.pageXOffset || Ji.scrollLeft || Nn.scrollLeft || 0)
  } : e.getBoundingClientRect(), o = {
    x: i.left - r.left,
    y: i.top - r.top
  };
  return !n && e && (o.x += co(e, "x")(), o.y += co(e, "y")()), o;
}, vh = function(t, e, i, n, r) {
  return !isNaN(t) && typeof t != "object" ? parseFloat(t) - r : Kf(t) && t.charAt(1) === "=" ? parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + n - r : t === "max" ? uo(e, i) - r : Math.min(uo(e, i), Xf(t, e)[i] - r);
}, jl = function() {
  Ye = Uf(), qf() && Ye && typeof document < "u" && document.body && (yn = window, Nn = document.body, Ji = document.documentElement, Wf = Ye.utils.toArray, Ye.config({
    autoKillThreshold: 7
  }), Xs = Ye.config(), Yf = 1);
}, ws = {
  version: "3.13.0",
  name: "scrollTo",
  rawVars: 1,
  register: function(t) {
    Ye = t, jl();
  },
  init: function(t, e, i, n, r) {
    Yf || jl();
    var o = this, a = Ye.getProperty(t, "scrollSnapType");
    o.isWin = t === yn, o.target = t, o.tween = i, e = s_(e, n, t, r), o.vars = e, o.autoKill = !!("autoKill" in e ? e : Xs).autoKill, o.getX = co(t, "x"), o.getY = co(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), zo || (zo = Ye.core.globals().ScrollTrigger), Ye.getProperty(t, "scrollBehavior") === "smooth" && Ye.set(t, {
      scrollBehavior: "auto"
    }), a && a !== "none" && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), e.x != null ? (o.add(o, "x", o.x, vh(e.x, t, "x", o.x, e.offsetX || 0), n, r), o._props.push("scrollTo_x")) : o.skipX = 1, e.y != null ? (o.add(o, "y", o.y, vh(e.y, t, "y", o.y, e.offsetY || 0), n, r), o._props.push("scrollTo_y")) : o.skipY = 1;
  },
  render: function(t, e) {
    for (var i = e._pt, n = e.target, r = e.tween, o = e.autoKill, a = e.xPrev, l = e.yPrev, c = e.isWin, h = e.snap, d = e.snapInline, f, u, m, p, _; i; )
      i.r(t, i.d), i = i._next;
    f = c || !e.skipX ? e.getX() : a, u = c || !e.skipY ? e.getY() : l, m = u - l, p = f - a, _ = Xs.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), o && (!e.skipX && (p > _ || p < -_) && f < uo(n, "x") && (e.skipX = 1), !e.skipY && (m > _ || m < -_) && u < uo(n, "y") && (e.skipY = 1), e.skipX && e.skipY && (r.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(r, e.vars.onAutoKillParams || []))), c ? yn.scrollTo(e.skipX ? f : e.x, e.skipY ? u : e.y) : (e.skipY || (n.scrollTop = e.y), e.skipX || (n.scrollLeft = e.x)), h && (t === 1 || t === 0) && (u = n.scrollTop, f = n.scrollLeft, d ? n.style.scrollSnapType = d : n.style.removeProperty("scroll-snap-type"), n.scrollTop = u + 1, n.scrollLeft = f + 1, n.scrollTop = u, n.scrollLeft = f), e.xPrev = e.x, e.yPrev = e.y, zo && zo.update();
  },
  kill: function(t) {
    var e = t === "scrollTo", i = this._props.indexOf(t);
    return (e || t === "scrollTo_x") && (this.skipX = 1), (e || t === "scrollTo_y") && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length;
  }
};
ws.max = uo;
ws.getOffset = Xf;
ws.buildGetter = co;
ws.config = function(s) {
  Xs || jl() || (Xs = Ye.config());
  for (var t in s)
    Xs[t] = s[t];
};
Uf() && Ye.registerPlugin(ws);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var X, Is, vt, Yt, mi, Dt, ec, wa, ho, Wr, Cr, No, Be, $a, Zl, ti, bh, wh, Ds, Gf, dl, jf, Je, Ql, Zf, Qf, An, Jl, ic, Gs, nc, xa, tu, fl, $o = 1, Ve = Date.now, pl = Ve(), Li = 0, Pr = 0, xh = function(t, e, i) {
  var n = fi(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return i["_" + e + "Clamp"] = n, n ? t.substr(6, t.length - 7) : t;
}, Th = function(t, e) {
  return e && (!fi(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, r_ = function s() {
  return Pr && requestAnimationFrame(s);
}, Sh = function() {
  return $a = 1;
}, Eh = function() {
  return $a = 0;
}, Gi = function(t) {
  return t;
}, Or = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Jf = function() {
  return typeof window < "u";
}, tp = function() {
  return X || Jf() && (X = window.gsap) && X.registerPlugin && X;
}, gs = function(t) {
  return !!~ec.indexOf(t);
}, ep = function(t) {
  return (t === "Height" ? nc : vt["inner" + t]) || mi["client" + t] || Dt["client" + t];
}, ip = function(t) {
  return zn(t, "getBoundingClientRect") || (gs(t) ? function() {
    return la.width = vt.innerWidth, la.height = nc, la;
  } : function() {
    return pn(t);
  });
}, o_ = function(t, e, i) {
  var n = i.d, r = i.d2, o = i.a;
  return (o = zn(t, "getBoundingClientRect")) ? function() {
    return o()[n];
  } : function() {
    return (e ? ep(r) : t["client" + r]) || 0;
  };
}, a_ = function(t, e) {
  return !e || ~nn.indexOf(t) ? ip(t) : function() {
    return la;
  };
}, tn = function(t, e) {
  var i = e.s, n = e.d2, r = e.d, o = e.a;
  return Math.max(0, (i = "scroll" + n) && (o = zn(t, i)) ? o() - ip(t)()[r] : gs(t) ? (mi[i] || Dt[i]) - ep(n) : t[i] - t["offset" + n]);
}, Bo = function(t, e) {
  for (var i = 0; i < Ds.length; i += 3)
    (!e || ~e.indexOf(Ds[i + 1])) && t(Ds[i], Ds[i + 1], Ds[i + 2]);
}, fi = function(t) {
  return typeof t == "string";
}, We = function(t) {
  return typeof t == "function";
}, kr = function(t) {
  return typeof t == "number";
}, Zn = function(t) {
  return typeof t == "object";
}, _r = function(t, e, i) {
  return t && t.progress(e ? 0 : 1) && i && t.pause();
}, ml = function(t, e) {
  if (t.enabled) {
    var i = t._ctx ? t._ctx.add(function() {
      return e(t);
    }) : e(t);
    i && i.totalTime && (t.callbackAnimation = i);
  }
}, Ps = Math.abs, np = "left", sp = "top", sc = "right", rc = "bottom", us = "width", cs = "height", qr = "Right", Ur = "Left", Kr = "Top", Xr = "Bottom", me = "padding", Oi = "margin", or = "Width", oc = "Height", Te = "px", ki = function(t) {
  return vt.getComputedStyle(t);
}, l_ = function(t) {
  var e = ki(t).position;
  t.style.position = e === "absolute" || e === "fixed" ? e : "relative";
}, Ah = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, pn = function(t, e) {
  var i = e && ki(t)[Zl] !== "matrix(1, 0, 0, 1, 0, 0)" && X.to(t, {
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
}, Ta = function(t, e) {
  var i = e.d2;
  return t["offset" + i] || t["client" + i] || 0;
}, rp = function(t) {
  var e = [], i = t.labels, n = t.duration(), r;
  for (r in i)
    e.push(i[r] / n);
  return e;
}, u_ = function(t) {
  return function(e) {
    return X.utils.snap(rp(t), e);
  };
}, ac = function(t) {
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
}, c_ = function(t) {
  return function(e, i) {
    return ac(rp(t))(e, i.direction);
  };
}, Vo = function(t, e, i, n) {
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
}, Ho = function(t, e, i) {
  i = i && i.wheelHandler, i && (t(e, "wheel", i), t(e, "touchmove", i));
}, Ch = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Yo = {
  toggleActions: "play",
  anticipatePin: 0
}, Sa = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, sa = function(t, e) {
  if (fi(t)) {
    var i = t.indexOf("="), n = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
    ~i && (t.indexOf("%") > i && (n *= e / 100), t = t.substr(0, i - 1)), t = n + (t in Sa ? Sa[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
  }
  return t;
}, Wo = function(t, e, i, n, r, o, a, l) {
  var c = r.startColor, h = r.endColor, d = r.fontSize, f = r.indent, u = r.fontWeight, m = Yt.createElement("div"), p = gs(i) || zn(i, "pinType") === "fixed", _ = t.indexOf("scroller") !== -1, b = p ? Dt : i, A = t.indexOf("start") !== -1, C = A ? c : h, T = "border-color:" + C + ";font-size:" + d + ";color:" + C + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((_ || l) && p ? "fixed;" : "absolute;"), (_ || l || !p) && (T += (n === Ae ? sc : rc) + ":" + (o + parseFloat(f)) + "px;"), a && (T += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), m._isStart = A, m.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), m.style.cssText = T, m.innerText = e || e === 0 ? t + "-" + e : t, b.children[0] ? b.insertBefore(m, b.children[0]) : b.appendChild(m), m._offset = m["offset" + n.op.d2], ra(m, 0, n, A), m;
}, ra = function(t, e, i, n) {
  var r = {
    display: "block"
  }, o = i[n ? "os2" : "p2"], a = i[n ? "p2" : "os2"];
  t._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? "1px" : 0, r["border" + o + or] = 1, r["border" + a + or] = 0, r[i.p] = e + "px", X.set(t, r);
}, yt = [], eu = {}, fo, Ph = function() {
  return Ve() - Li > 34 && (fo || (fo = requestAnimationFrame(vn)));
}, Os = function() {
  (!Je || !Je.isPressed || Je.startX > Dt.clientWidth) && (bt.cache++, Je ? fo || (fo = requestAnimationFrame(vn)) : vn(), Li || ys("scrollStart"), Li = Ve());
}, gl = function() {
  Qf = vt.innerWidth, Zf = vt.innerHeight;
}, Mr = function(t) {
  bt.cache++, (t === !0 || !Be && !jf && !Yt.fullscreenElement && !Yt.webkitFullscreenElement && (!Ql || Qf !== vt.innerWidth || Math.abs(vt.innerHeight - Zf) > vt.innerHeight * 0.25)) && wa.restart(!0);
}, _s = {}, h_ = [], op = function s() {
  return Oe(wt, "scrollEnd", s) || ts(!0);
}, ys = function(t) {
  return _s[t] && _s[t].map(function(e) {
    return e();
  }) || h_;
}, di = [], ap = function(t) {
  for (var e = 0; e < di.length; e += 5)
    (!t || di[e + 4] && di[e + 4].query === t) && (di[e].style.cssText = di[e + 1], di[e].getBBox && di[e].setAttribute("transform", di[e + 2] || ""), di[e + 3].uncache = 1);
}, lc = function(t, e) {
  var i;
  for (ti = 0; ti < yt.length; ti++)
    i = yt[ti], i && (!e || i._ctx === e) && (t ? i.kill(1) : i.revert(!0, !0));
  xa = !0, e && ap(e), e || ys("revert");
}, lp = function(t, e) {
  bt.cache++, (e || !ei) && bt.forEach(function(i) {
    return We(i) && i.cacheID++ && (i.rec = 0);
  }), fi(t) && (vt.history.scrollRestoration = ic = t);
}, ei, hs = 0, Oh, d_ = function() {
  if (Oh !== hs) {
    var t = Oh = hs;
    requestAnimationFrame(function() {
      return t === hs && ts(!0);
    });
  }
}, up = function() {
  Dt.appendChild(Gs), nc = !Je && Gs.offsetHeight || vt.innerHeight, Dt.removeChild(Gs);
}, kh = function(t) {
  return ho(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e) {
    return e.style.display = t ? "none" : "block";
  });
}, ts = function(t, e) {
  if (mi = Yt.documentElement, Dt = Yt.body, ec = [vt, Yt, mi, Dt], Li && !t && !xa) {
    ke(wt, "scrollEnd", op);
    return;
  }
  up(), ei = wt.isRefreshing = !0, bt.forEach(function(n) {
    return We(n) && ++n.cacheID && (n.rec = n());
  });
  var i = ys("refreshInit");
  Gf && wt.sort(), e || lc(), bt.forEach(function(n) {
    We(n) && (n.smooth && (n.target.style.scrollBehavior = "auto"), n(0));
  }), yt.slice(0).forEach(function(n) {
    return n.refresh();
  }), xa = !1, yt.forEach(function(n) {
    if (n._subPinOffset && n.pin) {
      var r = n.vars.horizontal ? "offsetWidth" : "offsetHeight", o = n.pin[r];
      n.revert(!0, 1), n.adjustPinSpacing(n.pin[r] - o), n.refresh();
    }
  }), tu = 1, kh(!0), yt.forEach(function(n) {
    var r = tn(n.scroller, n._dir), o = n.vars.end === "max" || n._endClamp && n.end > r, a = n._startClamp && n.start >= r;
    (o || a) && n.setPositions(a ? r - 1 : n.start, o ? Math.max(a ? r : n.start + 1, r) : n.end, !0);
  }), kh(!1), tu = 0, i.forEach(function(n) {
    return n && n.render && n.render(-1);
  }), bt.forEach(function(n) {
    We(n) && (n.smooth && requestAnimationFrame(function() {
      return n.target.style.scrollBehavior = "smooth";
    }), n.rec && n(n.rec));
  }), lp(ic, 1), wa.pause(), hs++, ei = 2, vn(2), yt.forEach(function(n) {
    return We(n.vars.onRefresh) && n.vars.onRefresh(n);
  }), ei = wt.isRefreshing = !1, ys("refresh");
}, iu = 0, oa = 1, Gr, vn = function(t) {
  if (t === 2 || !ei && !xa) {
    wt.isUpdating = !0, Gr && Gr.update(0);
    var e = yt.length, i = Ve(), n = i - pl >= 50, r = e && yt[0].scroll();
    if (oa = iu > r ? -1 : 1, ei || (iu = r), n && (Li && !$a && i - Li > 200 && (Li = 0, ys("scrollEnd")), Cr = pl, pl = i), oa < 0) {
      for (ti = e; ti-- > 0; )
        yt[ti] && yt[ti].update(0, n);
      oa = 1;
    } else
      for (ti = 0; ti < e; ti++)
        yt[ti] && yt[ti].update(0, n);
    wt.isUpdating = !1;
  }
  fo = 0;
}, nu = [np, sp, rc, sc, Oi + Xr, Oi + qr, Oi + Kr, Oi + Ur, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], aa = nu.concat([us, cs, "boxSizing", "max" + or, "max" + oc, "position", Oi, me, me + Kr, me + qr, me + Xr, me + Ur]), f_ = function(t, e, i) {
  js(i);
  var n = t._gsap;
  if (n.spacerIsNative)
    js(n.spacerState);
  else if (t._gsap.swappedIn) {
    var r = e.parentNode;
    r && (r.insertBefore(t, e), r.removeChild(e));
  }
  t._gsap.swappedIn = !1;
}, _l = function(t, e, i, n) {
  if (!t._gsap.swappedIn) {
    for (var r = nu.length, o = e.style, a = t.style, l; r--; )
      l = nu[r], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[rc] = a[sc] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[us] = Ta(t, ni) + Te, o[cs] = Ta(t, Ae) + Te, o[me] = a[Oi] = a[sp] = a[np] = "0", js(n), a[us] = a["max" + or] = i[us], a[cs] = a["max" + oc] = i[cs], a[me] = i[me], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, p_ = /([A-Z])/g, js = function(t) {
  if (t) {
    var e = t.t.style, i = t.length, n = 0, r, o;
    for ((t.t._gsap || X.core.getCache(t.t)).uncache = 1; n < i; n += 2)
      o = t[n + 1], r = t[n], o ? e[r] = o : e[r] && e.removeProperty(r.replace(p_, "-$1").toLowerCase());
  }
}, qo = function(t) {
  for (var e = aa.length, i = t.style, n = [], r = 0; r < e; r++)
    n.push(aa[r], i[aa[r]]);
  return n.t = t, n;
}, m_ = function(t, e, i) {
  for (var n = [], r = t.length, o = i ? 8 : 0, a; o < r; o += 2)
    a = t[o], n.push(a, a in e ? e[a] : t[o + 1]);
  return n.t = t.t, n;
}, la = {
  left: 0,
  top: 0
}, Mh = function(t, e, i, n, r, o, a, l, c, h, d, f, u, m) {
  We(t) && (t = t(l)), fi(t) && t.substr(0, 3) === "max" && (t = f + (t.charAt(4) === "=" ? sa("0" + t.substr(3), i) : 0));
  var p = u ? u.time() : 0, _, b, A;
  if (u && u.seek(0), isNaN(t) || (t = +t), kr(t))
    u && (t = X.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, f, t)), a && ra(a, i, n, !0);
  else {
    We(e) && (e = e(l));
    var C = (t || "0").split(" "), T, y, O, P;
    A = oi(e, l) || Dt, T = pn(A) || {}, (!T || !T.left && !T.top) && ki(A).display === "none" && (P = A.style.display, A.style.display = "block", T = pn(A), P ? A.style.display = P : A.style.removeProperty("display")), y = sa(C[0], T[n.d]), O = sa(C[1] || "0", i), t = T[n.p] - c[n.p] - h + y + r - O, a && ra(a, O, n, i - O < 20 || a._isStart && O > 20), i -= i - O;
  }
  if (m && (l[m] = t || -1e-3, t < 0 && (t = 0)), o) {
    var S = t + i, k = o._isStart;
    _ = "scroll" + n.d2, ra(o, S, n, k && S > 20 || !k && (d ? Math.max(Dt[_], mi[_]) : o.parentNode[_]) <= S + 1), d && (c = pn(a), d && (o.style[n.op.p] = c[n.op.p] - n.op.m - o._offset + Te));
  }
  return u && A && (_ = pn(A), u.seek(f), b = pn(A), u._caScrollDist = _[n.p] - b[n.p], t = t / u._caScrollDist * f), u && u.seek(p), u ? t : Math.round(t);
}, g_ = /(webkit|moz|length|cssText|inset)/i, Ih = function(t, e, i, n) {
  if (t.parentNode !== e) {
    var r = t.style, o, a;
    if (e === Dt) {
      t._stOrig = r.cssText, a = ki(t);
      for (o in a)
        !+o && !g_.test(o) && a[o] && typeof r[o] == "string" && o !== "0" && (r[o] = a[o]);
      r.top = i, r.left = n;
    } else
      r.cssText = t._stOrig;
    X.core.getCache(t).uncache = 1, e.appendChild(t);
  }
}, cp = function(t, e, i) {
  var n = e, r = n;
  return function(o) {
    var a = Math.round(t());
    return a !== n && a !== r && Math.abs(a - n) > 3 && Math.abs(a - r) > 3 && (o = a, i && i()), r = n, n = Math.round(o), n;
  };
}, Uo = function(t, e, i) {
  var n = {};
  n[e.p] = "+=" + i, X.set(t, n);
}, Dh = function(t, e) {
  var i = Hn(t, e), n = "_scroll" + e.p2, r = function o(a, l, c, h, d) {
    var f = o.tween, u = l.onComplete, m = {};
    c = c || i();
    var p = cp(i, c, function() {
      f.kill(), o.tween = 0;
    });
    return d = h && d || 0, h = h || a - c, f && f.kill(), l[n] = a, l.inherit = !1, l.modifiers = m, m[n] = function() {
      return p(c + h * f.ratio + d * f.ratio * f.ratio);
    }, l.onUpdate = function() {
      bt.cache++, o.tween && vn();
    }, l.onComplete = function() {
      o.tween = 0, u && u.call(f);
    }, f = o.tween = X.to(t, l), f;
  };
  return t[n] = i, i.wheelHandler = function() {
    return r.tween && r.tween.kill() && (r.tween = 0);
  }, ke(t, "wheel", i.wheelHandler), wt.isTouch && ke(t, "touchmove", i.wheelHandler), r;
}, wt = /* @__PURE__ */ function() {
  function s(e, i) {
    Is || s.register(X) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Jl(this), this.init(e, i);
  }
  var t = s.prototype;
  return t.init = function(i, n) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Pr) {
      this.update = this.refresh = this.kill = Gi;
      return;
    }
    i = Ah(fi(i) || kr(i) || i.nodeType ? {
      trigger: i
    } : i, Yo);
    var r = i, o = r.onUpdate, a = r.toggleClass, l = r.id, c = r.onToggle, h = r.onRefresh, d = r.scrub, f = r.trigger, u = r.pin, m = r.pinSpacing, p = r.invalidateOnRefresh, _ = r.anticipatePin, b = r.onScrubComplete, A = r.onSnapComplete, C = r.once, T = r.snap, y = r.pinReparent, O = r.pinSpacer, P = r.containerAnimation, S = r.fastScrollEnd, k = r.preventOverlaps, R = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? ni : Ae, V = !d && d !== 0, F = oi(i.scroller || vt), B = X.core.getCache(F), J = gs(F), it = ("pinType" in i ? i.pinType : zn(F, "pinType") || J && "fixed") === "fixed", q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], H = V && i.toggleActions.split(" "), tt = "markers" in i ? i.markers : Yo.markers, ot = J ? 0 : parseFloat(ki(F)["border" + R.p2 + or]) || 0, w = this, G = i.onRefreshInit && function() {
      return i.onRefreshInit(w);
    }, nt = o_(F, J, R), U = a_(F, J), rt = 0, It = 0, gt = 0, At = Hn(F, R), lt, Lt, se, $t, Ut, pt, mt, ut, Ce, I, Bt, Xe, Ie, Rt, Nt, ce, Ge, Xt, re, Pt, he, De, ze, Ui, Kt, Ki, ri, ve, Le, Ti, Ne, at, $e, Ft, Pe, ie, Si, j, v;
    if (w._startClamp = w._endClamp = !1, w._dir = R, _ *= 45, w.scroller = F, w.scroll = P ? P.time.bind(P) : At, $t = At(), w.vars = i, n = n || i.animation, "refreshPriority" in i && (Gf = 1, i.refreshPriority === -9999 && (Gr = w)), B.tweenScroll = B.tweenScroll || {
      top: Dh(F, Ae),
      left: Dh(F, ni)
    }, w.tweenTo = lt = B.tweenScroll[R.p], w.scrubDuration = function(D) {
      $e = kr(D) && D, $e ? at ? at.duration(D) : at = X.to(n, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: $e,
        paused: !0,
        onComplete: function() {
          return b && b(w);
        }
      }) : (at && at.progress(1).kill(), at = 0);
    }, n && (n.vars.lazy = !1, n._initted && !w.isReverted || n.vars.immediateRender !== !1 && i.immediateRender !== !1 && n.duration() && n.render(0, !0, !0), w.animation = n.pause(), n.scrollTrigger = w, w.scrubDuration(d), Ti = 0, l || (l = n.vars.id)), T && ((!Zn(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in Dt.style && X.set(J ? [Dt, mi] : F, {
      scrollBehavior: "auto"
    }), bt.forEach(function(D) {
      return We(D) && D.target === (J ? Yt.scrollingElement || mi : F) && (D.smooth = !1);
    }), se = We(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? u_(n) : T.snapTo === "labelsDirectional" ? c_(n) : T.directional !== !1 ? function(D, Y) {
      return ac(T.snapTo)(D, Ve() - It < 500 ? 0 : Y.direction);
    } : X.utils.snap(T.snapTo), Ft = T.duration || {
      min: 0.1,
      max: 2
    }, Ft = Zn(Ft) ? Wr(Ft.min, Ft.max) : Wr(Ft, Ft), Pe = X.delayedCall(T.delay || $e / 2 || 0.1, function() {
      var D = At(), Y = Ve() - It < 500, z = lt.tween;
      if ((Y || Math.abs(w.getVelocity()) < 10) && !z && !$a && rt !== D) {
        var W = (D - pt) / Rt, et = n && !V ? n.totalProgress() : W, K = Y ? 0 : (et - Ne) / (Ve() - Cr) * 1e3 || 0, dt = X.utils.clamp(-W, 1 - W, Ps(K / 2) * K / 0.185), xt = W + (T.inertia === !1 ? 0 : dt), Ct, _t, ft = T, Ot = ft.onStart, ct = ft.onInterrupt, be = ft.onComplete;
        if (Ct = se(xt, w), kr(Ct) || (Ct = xt), _t = Math.max(0, Math.round(pt + Ct * Rt)), D <= mt && D >= pt && _t !== D) {
          if (z && !z._initted && z.data <= Ps(_t - D))
            return;
          T.inertia === !1 && (dt = Ct - W), lt(_t, {
            duration: Ft(Ps(Math.max(Ps(xt - et), Ps(Ct - et)) * 0.185 / K / 0.05 || 0)),
            ease: T.ease || "power3",
            data: Ps(_t - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Pe.restart(!0) && ct && ct(w);
            },
            onComplete: function() {
              w.update(), rt = At(), n && !V && (at ? at.resetTo("totalProgress", Ct, n._tTime / n._tDur) : n.progress(Ct)), Ti = Ne = n && !V ? n.totalProgress() : w.progress, A && A(w), be && be(w);
            }
          }, D, dt * Rt, _t - D - dt * Rt), Ot && Ot(w, lt.tween);
        }
      } else w.isActive && rt !== D && Pe.restart(!0);
    }).pause()), l && (eu[l] = w), f = w.trigger = oi(f || u !== !0 && u), v = f && f._gsap && f._gsap.stRevert, v && (v = v(w)), u = u === !0 ? f : oi(u), fi(a) && (a = {
      targets: f,
      className: a
    }), u && (m === !1 || m === Oi || (m = !m && u.parentNode && u.parentNode.style && ki(u.parentNode).display === "flex" ? !1 : me), w.pin = u, Lt = X.core.getCache(u), Lt.spacer ? Nt = Lt.pinState : (O && (O = oi(O), O && !O.nodeType && (O = O.current || O.nativeElement), Lt.spacerIsNative = !!O, O && (Lt.spacerState = qo(O))), Lt.spacer = Xt = O || Yt.createElement("div"), Xt.classList.add("pin-spacer"), l && Xt.classList.add("pin-spacer-" + l), Lt.pinState = Nt = qo(u)), i.force3D !== !1 && X.set(u, {
      force3D: !0
    }), w.spacer = Xt = Lt.spacer, Le = ki(u), Ui = Le[m + R.os2], Pt = X.getProperty(u), he = X.quickSetter(u, R.a, Te), _l(u, Xt, Le), Ge = qo(u)), tt) {
      Xe = Zn(tt) ? Ah(tt, Ch) : Ch, I = Wo("scroller-start", l, F, R, Xe, 0), Bt = Wo("scroller-end", l, F, R, Xe, 0, I), re = I["offset" + R.op.d2];
      var $ = oi(zn(F, "content") || F);
      ut = this.markerStart = Wo("start", l, $, R, Xe, re, 0, P), Ce = this.markerEnd = Wo("end", l, $, R, Xe, re, 0, P), P && (j = X.quickSetter([ut, Ce], R.a, Te)), !it && !(nn.length && zn(F, "fixedMarkers") === !0) && (l_(J ? Dt : F), X.set([I, Bt], {
        force3D: !0
      }), Ki = X.quickSetter(I, R.a, Te), ve = X.quickSetter(Bt, R.a, Te));
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
    }, w.revert = function(D, Y) {
      if (!Y)
        return w.kill(!0);
      var z = D !== !1 || !w.enabled, W = Be;
      z !== w.isReverted && (z && (ie = Math.max(At(), w.scroll.rec || 0), gt = w.progress, Si = n && n.progress()), ut && [ut, Ce, I, Bt].forEach(function(et) {
        return et.style.display = z ? "none" : "block";
      }), z && (Be = w, w.update(z)), u && (!y || !w.isActive) && (z ? f_(u, Xt, Nt) : _l(u, Xt, ki(u), Kt)), z || w.update(z), Be = W, w.isReverted = z);
    }, w.refresh = function(D, Y, z, W) {
      if (!((Be || !w.enabled) && !Y)) {
        if (u && D && Li) {
          ke(s, "scrollEnd", op);
          return;
        }
        !ei && G && G(w), Be = w, lt.tween && !z && (lt.tween.kill(), lt.tween = 0), at && at.pause(), p && n && (n.revert({
          kill: !1
        }).invalidate(), n.getChildren && n.getChildren(!0, !0, !1).forEach(function(Fi) {
          return Fi.vars.immediateRender && Fi.render(0, !0, !0);
        })), w.isReverted || w.revert(!0, !0), w._subPinOffset = !1;
        var et = nt(), K = U(), dt = P ? P.duration() : tn(F, R), xt = Rt <= 0.01 || !Rt, Ct = 0, _t = W || 0, ft = Zn(z) ? z.end : i.end, Ot = i.endTrigger || f, ct = Zn(z) ? z.start : i.start || (i.start === 0 || !f ? 0 : u ? "0 0" : "0 100%"), be = w.pinnedContainer = i.pinnedContainer && oi(i.pinnedContainer, w), Gt = f && Math.max(0, yt.indexOf(w)) || 0, we = Gt, xe, de, on, an, fe, oe, je, xs, Oo, qn, Ei, ln, Ts;
        for (tt && Zn(z) && (ln = X.getProperty(I, R.p), Ts = X.getProperty(Bt, R.p)); we-- > 0; )
          oe = yt[we], oe.end || oe.refresh(0, 1) || (Be = w), je = oe.pin, je && (je === f || je === u || je === be) && !oe.isReverted && (qn || (qn = []), qn.unshift(oe), oe.revert(!0, !0)), oe !== yt[we] && (Gt--, we--);
        for (We(ct) && (ct = ct(w)), ct = xh(ct, "start", w), pt = Mh(ct, f, et, R, At(), ut, I, w, K, ot, it, dt, P, w._startClamp && "_startClamp") || (u ? -1e-3 : 0), We(ft) && (ft = ft(w)), fi(ft) && !ft.indexOf("+=") && (~ft.indexOf(" ") ? ft = (fi(ct) ? ct.split(" ")[0] : "") + ft : (Ct = sa(ft.substr(2), et), ft = fi(ct) ? ct : (P ? X.utils.mapRange(0, P.duration(), P.scrollTrigger.start, P.scrollTrigger.end, pt) : pt) + Ct, Ot = f)), ft = xh(ft, "end", w), mt = Math.max(pt, Mh(ft || (Ot ? "100% 0" : dt), Ot, et, R, At() + Ct, Ce, Bt, w, K, ot, it, dt, P, w._endClamp && "_endClamp")) || -1e-3, Ct = 0, we = Gt; we--; )
          oe = yt[we], je = oe.pin, je && oe.start - oe._pinPush <= pt && !P && oe.end > 0 && (xe = oe.end - (w._startClamp ? Math.max(0, oe.start) : oe.start), (je === f && oe.start - oe._pinPush < pt || je === be) && isNaN(ct) && (Ct += xe * (1 - oe.progress)), je === u && (_t += xe));
        if (pt += Ct, mt += Ct, w._startClamp && (w._startClamp += Ct), w._endClamp && !ei && (w._endClamp = mt || -1e-3, mt = Math.min(mt, tn(F, R))), Rt = mt - pt || (pt -= 0.01) && 1e-3, xt && (gt = X.utils.clamp(0, 1, X.utils.normalize(pt, mt, ie))), w._pinPush = _t, ut && Ct && (xe = {}, xe[R.a] = "+=" + Ct, be && (xe[R.p] = "-=" + At()), X.set([ut, Ce], xe)), u && !(tu && w.end >= tn(F, R)))
          xe = ki(u), an = R === Ae, on = At(), De = parseFloat(Pt(R.a)) + _t, !dt && mt > 1 && (Ei = (J ? Yt.scrollingElement || mi : F).style, Ei = {
            style: Ei,
            value: Ei["overflow" + R.a.toUpperCase()]
          }, J && ki(Dt)["overflow" + R.a.toUpperCase()] !== "scroll" && (Ei.style["overflow" + R.a.toUpperCase()] = "scroll")), _l(u, Xt, xe), Ge = qo(u), de = pn(u, !0), xs = it && Hn(F, an ? ni : Ae)(), m ? (Kt = [m + R.os2, Rt + _t + Te], Kt.t = Xt, we = m === me ? Ta(u, R) + Rt + _t : 0, we && (Kt.push(R.d, we + Te), Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = we + Te)), js(Kt), be && yt.forEach(function(Fi) {
            Fi.pin === be && Fi.vars.pinSpacing !== !1 && (Fi._subPinOffset = !0);
          }), it && At(ie)) : (we = Ta(u, R), we && Xt.style.flexBasis !== "auto" && (Xt.style.flexBasis = we + Te)), it && (fe = {
            top: de.top + (an ? on - pt : xs) + Te,
            left: de.left + (an ? xs : on - pt) + Te,
            boxSizing: "border-box",
            position: "fixed"
          }, fe[us] = fe["max" + or] = Math.ceil(de.width) + Te, fe[cs] = fe["max" + oc] = Math.ceil(de.height) + Te, fe[Oi] = fe[Oi + Kr] = fe[Oi + qr] = fe[Oi + Xr] = fe[Oi + Ur] = "0", fe[me] = xe[me], fe[me + Kr] = xe[me + Kr], fe[me + qr] = xe[me + qr], fe[me + Xr] = xe[me + Xr], fe[me + Ur] = xe[me + Ur], ce = m_(Nt, fe, y), ei && At(0)), n ? (Oo = n._initted, dl(1), n.render(n.duration(), !0, !0), ze = Pt(R.a) - De + Rt + _t, ri = Math.abs(Rt - ze) > 1, it && ri && ce.splice(ce.length - 2, 2), n.render(0, !0, !0), Oo || n.invalidate(!0), n.parent || n.totalTime(n.totalTime()), dl(0)) : ze = Rt, Ei && (Ei.value ? Ei.style["overflow" + R.a.toUpperCase()] = Ei.value : Ei.style.removeProperty("overflow-" + R.a));
        else if (f && At() && !P)
          for (de = f.parentNode; de && de !== Dt; )
            de._pinOffset && (pt -= de._pinOffset, mt -= de._pinOffset), de = de.parentNode;
        qn && qn.forEach(function(Fi) {
          return Fi.revert(!1, !0);
        }), w.start = pt, w.end = mt, $t = Ut = ei ? ie : At(), !P && !ei && ($t < ie && At(ie), w.scroll.rec = 0), w.revert(!1, !0), It = Ve(), Pe && (rt = -1, Pe.restart(!0)), Be = 0, n && V && (n._initted || Si) && n.progress() !== Si && n.progress(Si || 0, !0).render(n.time(), !0, !0), (xt || gt !== w.progress || P || p || n && !n._initted) && (n && !V && (n._initted || gt || n.vars.immediateRender !== !1) && n.totalProgress(P && pt < -1e-3 && !gt ? X.utils.normalize(pt, mt, 0) : gt, !0), w.progress = xt || ($t - pt) / Rt === gt ? 0 : gt), u && m && (Xt._pinOffset = Math.round(w.progress * ze)), at && at.invalidate(), isNaN(ln) || (ln -= X.getProperty(I, R.p), Ts -= X.getProperty(Bt, R.p), Uo(I, R, ln), Uo(ut, R, ln - (W || 0)), Uo(Bt, R, Ts), Uo(Ce, R, Ts - (W || 0))), xt && !ei && w.update(), h && !ei && !Ie && (Ie = !0, h(w), Ie = !1);
      }
    }, w.getVelocity = function() {
      return (At() - Ut) / (Ve() - Cr) * 1e3 || 0;
    }, w.endAnimation = function() {
      _r(w.callbackAnimation), n && (at ? at.progress(1) : n.paused() ? V || _r(n, w.direction < 0, 1) : _r(n, n.reversed()));
    }, w.labelToScroll = function(D) {
      return n && n.labels && (pt || w.refresh() || pt) + n.labels[D] / n.duration() * Rt || 0;
    }, w.getTrailing = function(D) {
      var Y = yt.indexOf(w), z = w.direction > 0 ? yt.slice(0, Y).reverse() : yt.slice(Y + 1);
      return (fi(D) ? z.filter(function(W) {
        return W.vars.preventOverlaps === D;
      }) : z).filter(function(W) {
        return w.direction > 0 ? W.end <= pt : W.start >= mt;
      });
    }, w.update = function(D, Y, z) {
      if (!(P && !z && !D)) {
        var W = ei === !0 ? ie : w.scroll(), et = D ? 0 : (W - pt) / Rt, K = et < 0 ? 0 : et > 1 ? 1 : et || 0, dt = w.progress, xt, Ct, _t, ft, Ot, ct, be, Gt;
        if (Y && (Ut = $t, $t = P ? At() : W, T && (Ne = Ti, Ti = n && !V ? n.totalProgress() : K)), _ && u && !Be && !$o && Li && (!K && pt < W + (W - Ut) / (Ve() - Cr) * _ ? K = 1e-4 : K === 1 && mt > W + (W - Ut) / (Ve() - Cr) * _ && (K = 0.9999)), K !== dt && w.enabled) {
          if (xt = w.isActive = !!K && K < 1, Ct = !!dt && dt < 1, ct = xt !== Ct, Ot = ct || !!K != !!dt, w.direction = K > dt ? 1 : -1, w.progress = K, Ot && !Be && (_t = K && !dt ? 0 : K === 1 ? 1 : dt === 1 ? 2 : 3, V && (ft = !ct && H[_t + 1] !== "none" && H[_t + 1] || H[_t], Gt = n && (ft === "complete" || ft === "reset" || ft in n))), k && (ct || Gt) && (Gt || d || !n) && (We(k) ? k(w) : w.getTrailing(k).forEach(function(on) {
            return on.endAnimation();
          })), V || (at && !Be && !$o ? (at._dp._time - at._start !== at._time && at.render(at._dp._time - at._start), at.resetTo ? at.resetTo("totalProgress", K, n._tTime / n._tDur) : (at.vars.totalProgress = K, at.invalidate().restart())) : n && n.totalProgress(K, !!(Be && (It || D)))), u) {
            if (D && m && (Xt.style[m + R.os2] = Ui), !it)
              he(Or(De + ze * K));
            else if (Ot) {
              if (be = !D && K > dt && mt + 1 > W && W + 1 >= tn(F, R), y)
                if (!D && (xt || be)) {
                  var we = pn(u, !0), xe = W - pt;
                  Ih(u, Dt, we.top + (R === Ae ? xe : 0) + Te, we.left + (R === Ae ? 0 : xe) + Te);
                } else
                  Ih(u, Xt);
              js(xt || be ? ce : Ge), ri && K < 1 && xt || he(De + (K === 1 && !be ? ze : 0));
            }
          }
          T && !lt.tween && !Be && !$o && Pe.restart(!0), a && (ct || C && K && (K < 1 || !fl)) && ho(a.targets).forEach(function(on) {
            return on.classList[xt || C ? "add" : "remove"](a.className);
          }), o && !V && !D && o(w), Ot && !Be ? (V && (Gt && (ft === "complete" ? n.pause().totalProgress(1) : ft === "reset" ? n.restart(!0).pause() : ft === "restart" ? n.restart(!0) : n[ft]()), o && o(w)), (ct || !fl) && (c && ct && ml(w, c), q[_t] && ml(w, q[_t]), C && (K === 1 ? w.kill(!1, 1) : q[_t] = 0), ct || (_t = K === 1 ? 1 : 3, q[_t] && ml(w, q[_t]))), S && !xt && Math.abs(w.getVelocity()) > (kr(S) ? S : 2500) && (_r(w.callbackAnimation), at ? at.progress(1) : _r(n, ft === "reverse" ? 1 : !K, 1))) : V && o && !Be && o(w);
        }
        if (ve) {
          var de = P ? W / P.duration() * (P._caScrollDist || 0) : W;
          Ki(de + (I._isFlipped ? 1 : 0)), ve(de);
        }
        j && j(-W / P.duration() * (P._caScrollDist || 0));
      }
    }, w.enable = function(D, Y) {
      w.enabled || (w.enabled = !0, ke(F, "resize", Mr), J || ke(F, "scroll", Os), G && ke(s, "refreshInit", G), D !== !1 && (w.progress = gt = 0, $t = Ut = rt = At()), Y !== !1 && w.refresh());
    }, w.getTween = function(D) {
      return D && lt ? lt.tween : at;
    }, w.setPositions = function(D, Y, z, W) {
      if (P) {
        var et = P.scrollTrigger, K = P.duration(), dt = et.end - et.start;
        D = et.start + dt * D / K, Y = et.start + dt * Y / K;
      }
      w.refresh(!1, !1, {
        start: Th(D, z && !!w._startClamp),
        end: Th(Y, z && !!w._endClamp)
      }, W), w.update();
    }, w.adjustPinSpacing = function(D) {
      if (Kt && D) {
        var Y = Kt.indexOf(R.d) + 1;
        Kt[Y] = parseFloat(Kt[Y]) + D + Te, Kt[1] = parseFloat(Kt[1]) + D + Te, js(Kt);
      }
    }, w.disable = function(D, Y) {
      if (w.enabled && (D !== !1 && w.revert(!0, !0), w.enabled = w.isActive = !1, Y || at && at.pause(), ie = 0, Lt && (Lt.uncache = 1), G && Oe(s, "refreshInit", G), Pe && (Pe.pause(), lt.tween && lt.tween.kill() && (lt.tween = 0)), !J)) {
        for (var z = yt.length; z--; )
          if (yt[z].scroller === F && yt[z] !== w)
            return;
        Oe(F, "resize", Mr), J || Oe(F, "scroll", Os);
      }
    }, w.kill = function(D, Y) {
      w.disable(D, Y), at && !Y && at.kill(), l && delete eu[l];
      var z = yt.indexOf(w);
      z >= 0 && yt.splice(z, 1), z === ti && oa > 0 && ti--, z = 0, yt.forEach(function(W) {
        return W.scroller === w.scroller && (z = 1);
      }), z || ei || (w.scroll.rec = 0), n && (n.scrollTrigger = null, D && n.revert({
        kill: !1
      }), Y || n.kill()), ut && [ut, Ce, I, Bt].forEach(function(W) {
        return W.parentNode && W.parentNode.removeChild(W);
      }), Gr === w && (Gr = 0), u && (Lt && (Lt.uncache = 1), z = 0, yt.forEach(function(W) {
        return W.pin === u && z++;
      }), z || (Lt.spacer = 0)), i.onKill && i.onKill(w);
    }, yt.push(w), w.enable(!1, !1), v && v(w), n && n.add && !Rt) {
      var N = w.update;
      w.update = function() {
        w.update = N, bt.cache++, pt || mt || w.refresh();
      }, X.delayedCall(0.01, w.update), Rt = 0.01, pt = mt = 0;
    } else
      w.refresh();
    u && d_();
  }, s.register = function(i) {
    return Is || (X = i || tp(), Jf() && window.document && s.enable(), Is = Pr), Is;
  }, s.defaults = function(i) {
    if (i)
      for (var n in i)
        Yo[n] = i[n];
    return Yo;
  }, s.disable = function(i, n) {
    Pr = 0, yt.forEach(function(o) {
      return o[n ? "kill" : "disable"](i);
    }), Oe(vt, "wheel", Os), Oe(Yt, "scroll", Os), clearInterval(No), Oe(Yt, "touchcancel", Gi), Oe(Dt, "touchstart", Gi), Vo(Oe, Yt, "pointerdown,touchstart,mousedown", Sh), Vo(Oe, Yt, "pointerup,touchend,mouseup", Eh), wa.kill(), Bo(Oe);
    for (var r = 0; r < bt.length; r += 3)
      Ho(Oe, bt[r], bt[r + 1]), Ho(Oe, bt[r], bt[r + 2]);
  }, s.enable = function() {
    if (vt = window, Yt = document, mi = Yt.documentElement, Dt = Yt.body, X && (ho = X.utils.toArray, Wr = X.utils.clamp, Jl = X.core.context || Gi, dl = X.core.suppressOverwrites || Gi, ic = vt.history.scrollRestoration || "auto", iu = vt.pageYOffset || 0, X.core.globals("ScrollTrigger", s), Dt)) {
      Pr = 1, Gs = document.createElement("div"), Gs.style.height = "100vh", Gs.style.position = "absolute", up(), r_(), ue.register(X), s.isTouch = ue.isTouch, An = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ql = ue.isTouch === 1, ke(vt, "wheel", Os), ec = [vt, Yt, mi, Dt], X.matchMedia ? (s.matchMedia = function(c) {
        var h = X.matchMedia(), d;
        for (d in c)
          h.add(d, c[d]);
        return h;
      }, X.addEventListener("matchMediaInit", function() {
        return lc();
      }), X.addEventListener("matchMediaRevert", function() {
        return ap();
      }), X.addEventListener("matchMedia", function() {
        ts(0, 1), ys("matchMedia");
      }), X.matchMedia().add("(orientation: portrait)", function() {
        return gl(), gl;
      })) : console.warn("Requires GSAP 3.11.0 or later"), gl(), ke(Yt, "scroll", Os);
      var i = Dt.hasAttribute("style"), n = Dt.style, r = n.borderTopStyle, o = X.core.Animation.prototype, a, l;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = pn(Dt), Ae.m = Math.round(a.top + Ae.sc()) || 0, ni.m = Math.round(a.left + ni.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), i || (Dt.setAttribute("style", ""), Dt.removeAttribute("style")), No = setInterval(Ph, 250), X.delayedCall(0.5, function() {
        return $o = 0;
      }), ke(Yt, "touchcancel", Gi), ke(Dt, "touchstart", Gi), Vo(ke, Yt, "pointerdown,touchstart,mousedown", Sh), Vo(ke, Yt, "pointerup,touchend,mouseup", Eh), Zl = X.utils.checkPrefix("transform"), aa.push(Zl), Is = Ve(), wa = X.delayedCall(0.2, ts).pause(), Ds = [Yt, "visibilitychange", function() {
        var c = vt.innerWidth, h = vt.innerHeight;
        Yt.hidden ? (bh = c, wh = h) : (bh !== c || wh !== h) && Mr();
      }, Yt, "DOMContentLoaded", ts, vt, "load", ts, vt, "resize", Mr], Bo(ke), yt.forEach(function(c) {
        return c.enable(0, 1);
      }), l = 0; l < bt.length; l += 3)
        Ho(Oe, bt[l], bt[l + 1]), Ho(Oe, bt[l], bt[l + 2]);
    }
  }, s.config = function(i) {
    "limitCallbacks" in i && (fl = !!i.limitCallbacks);
    var n = i.syncInterval;
    n && clearInterval(No) || (No = n) && setInterval(Ph, n), "ignoreMobileResize" in i && (Ql = s.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (Bo(Oe) || Bo(ke, i.autoRefreshEvents || "none"), jf = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(i, n) {
    var r = oi(i), o = bt.indexOf(r), a = gs(r);
    ~o && bt.splice(o, a ? 6 : 2), n && (a ? nn.unshift(vt, n, Dt, n, mi, n) : nn.unshift(r, n));
  }, s.clearMatchMedia = function(i) {
    yt.forEach(function(n) {
      return n._ctx && n._ctx.query === i && n._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(i, n, r) {
    var o = (fi(i) ? oi(i) : i).getBoundingClientRect(), a = o[r ? us : cs] * n || 0;
    return r ? o.right - a > 0 && o.left + a < vt.innerWidth : o.bottom - a > 0 && o.top + a < vt.innerHeight;
  }, s.positionInViewport = function(i, n, r) {
    fi(i) && (i = oi(i));
    var o = i.getBoundingClientRect(), a = o[r ? us : cs], l = n == null ? a / 2 : n in Sa ? Sa[n] * a : ~n.indexOf("%") ? parseFloat(n) * a / 100 : parseFloat(n) || 0;
    return r ? (o.left + l) / vt.innerWidth : (o.top + l) / vt.innerHeight;
  }, s.killAll = function(i) {
    if (yt.slice(0).forEach(function(r) {
      return r.vars.id !== "ScrollSmoother" && r.kill();
    }), i !== !0) {
      var n = _s.killAll || [];
      _s = {}, n.forEach(function(r) {
        return r();
      });
    }
  }, s;
}();
wt.version = "3.13.0";
wt.saveStyles = function(s) {
  return s ? ho(s).forEach(function(t) {
    if (t && t.style) {
      var e = di.indexOf(t);
      e >= 0 && di.splice(e, 5), di.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), X.core.getCache(t), Jl());
    }
  }) : di;
};
wt.revert = function(s, t) {
  return lc(!s, t);
};
wt.create = function(s, t) {
  return new wt(s, t);
};
wt.refresh = function(s) {
  return s ? Mr(!0) : (Is || wt.register()) && ts(!0);
};
wt.update = function(s) {
  return ++bt.cache && vn(s === !0 ? 2 : 0);
};
wt.clearScrollMemory = lp;
wt.maxScroll = function(s, t) {
  return tn(s, t ? ni : Ae);
};
wt.getScrollFunc = function(s, t) {
  return Hn(oi(s), t ? ni : Ae);
};
wt.getById = function(s) {
  return eu[s];
};
wt.getAll = function() {
  return yt.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
wt.isScrolling = function() {
  return !!Li;
};
wt.snapDirectional = ac;
wt.addEventListener = function(s, t) {
  var e = _s[s] || (_s[s] = []);
  ~e.indexOf(t) || e.push(t);
};
wt.removeEventListener = function(s, t) {
  var e = _s[s], i = e && e.indexOf(t);
  i >= 0 && e.splice(i, 1);
};
wt.batch = function(s, t) {
  var e = [], i = {}, n = t.interval || 0.016, r = t.batchMax || 1e9, o = function(c, h) {
    var d = [], f = [], u = X.delayedCall(n, function() {
      h(d, f), d = [], f = [];
    }).pause();
    return function(m) {
      d.length || u.restart(!0), d.push(m.trigger), f.push(m), r <= d.length && u.progress(1);
    };
  }, a;
  for (a in t)
    i[a] = a.substr(0, 2) === "on" && We(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return We(r) && (r = r(), ke(wt, "refresh", function() {
    return r = t.batchMax();
  })), ho(s).forEach(function(l) {
    var c = {};
    for (a in i)
      c[a] = i[a];
    c.trigger = l, e.push(wt.create(c));
  }), e;
};
var Lh = function(t, e, i, n) {
  return e > n ? t(n) : e < 0 && t(0), i > n ? (n - e) / (i - e) : i < 0 ? e / (e - i) : 1;
}, yl = function s(t, e) {
  e === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = e === !0 ? "auto" : e ? "pan-" + e + (ue.isTouch ? " pinch-zoom" : "") : "none", t === mi && s(Dt, e);
}, Ko = {
  auto: 1,
  scroll: 1
}, __ = function(t) {
  var e = t.event, i = t.target, n = t.axis, r = (e.changedTouches ? e.changedTouches[0] : e).target, o = r._gsap || X.core.getCache(r), a = Ve(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; r && r !== Dt && (r.scrollHeight <= r.clientHeight && r.scrollWidth <= r.clientWidth || !(Ko[(l = ki(r)).overflowY] || Ko[l.overflowX])); )
      r = r.parentNode;
    o._isScroll = r && r !== i && !gs(r) && (Ko[(l = ki(r)).overflowY] || Ko[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || n === "x") && (e.stopPropagation(), e._gsapAllow = !0);
}, hp = function(t, e, i, n) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: e,
    onWheel: n = n && __,
    onPress: n,
    onDrag: n,
    onScroll: n,
    onEnable: function() {
      return i && ke(Yt, ue.eventTypes[0], Fh, !1, !0);
    },
    onDisable: function() {
      return Oe(Yt, ue.eventTypes[0], Fh, !0);
    }
  });
}, y_ = /(input|label|select|textarea)/i, Rh, Fh = function(t) {
  var e = y_.test(t.target.tagName);
  (e || Rh) && (t._gsapAllow = !0, Rh = e);
}, v_ = function(t) {
  Zn(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var e = t, i = e.normalizeScrollX, n = e.momentum, r = e.allowNestedScroll, o = e.onRelease, a, l, c = oi(t.target) || mi, h = X.core.globals().ScrollSmoother, d = h && h.get(), f = An && (t.content && oi(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), u = Hn(c, Ae), m = Hn(c, ni), p = 1, _ = (ue.isTouch && vt.visualViewport ? vt.visualViewport.scale * vt.visualViewport.width : vt.outerWidth) / vt.innerWidth, b = 0, A = We(n) ? function() {
    return n(a);
  } : function() {
    return n || 2.8;
  }, C, T, y = hp(c, t.type, !0, r), O = function() {
    return T = !1;
  }, P = Gi, S = Gi, k = function() {
    l = tn(c, Ae), S = Wr(An ? 1 : 0, l), i && (P = Wr(0, tn(c, ni))), C = hs;
  }, R = function() {
    f._gsap.y = Or(parseFloat(f._gsap.y) + u.offset) + "px", f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(f._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, V = function() {
    if (T) {
      requestAnimationFrame(O);
      var tt = Or(a.deltaY / 2), ot = S(u.v - tt);
      if (f && ot !== u.v + u.offset) {
        u.offset = ot - u.v;
        var w = Or((parseFloat(f && f._gsap.y) || 0) - u.offset);
        f.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + w + ", 0, 1)", f._gsap.y = w + "px", u.cacheID = bt.cache, vn();
      }
      return !0;
    }
    u.offset && R(), T = !0;
  }, F, B, J, it, q = function() {
    k(), F.isActive() && F.vars.scrollY > l && (u() > l ? F.progress(1) && u(l) : F.resetTo("scrollY", l));
  };
  return f && X.set(f, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return An && H.type === "touchmove" && V() || p > 1.05 && H.type !== "touchstart" || a.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    T = !1;
    var H = p;
    p = Or((vt.visualViewport && vt.visualViewport.scale || 1) / _), F.pause(), H !== p && yl(c, p > 1.01 ? !0 : i ? !1 : "x"), B = m(), J = u(), k(), C = hs;
  }, t.onRelease = t.onGestureStart = function(H, tt) {
    if (u.offset && R(), !tt)
      it.restart(!0);
    else {
      bt.cache++;
      var ot = A(), w, G;
      i && (w = m(), G = w + ot * 0.05 * -H.velocityX / 0.227, ot *= Lh(m, w, G, tn(c, ni)), F.vars.scrollX = P(G)), w = u(), G = w + ot * 0.05 * -H.velocityY / 0.227, ot *= Lh(u, w, G, tn(c, Ae)), F.vars.scrollY = S(G), F.invalidate().duration(ot).play(0.01), (An && F.vars.scrollY >= l || w >= l - 1) && X.to({}, {
        onUpdate: q,
        duration: ot
      });
    }
    o && o(H);
  }, t.onWheel = function() {
    F._ts && F.pause(), Ve() - b > 1e3 && (C = 0, b = Ve());
  }, t.onChange = function(H, tt, ot, w, G) {
    if (hs !== C && k(), tt && i && m(P(w[2] === tt ? B + (H.startX - H.x) : m() + tt - w[1])), ot) {
      u.offset && R();
      var nt = G[2] === ot, U = nt ? J + H.startY - H.y : u() + ot - G[1], rt = S(U);
      nt && U !== rt && (J += rt - U), u(rt);
    }
    (ot || tt) && vn();
  }, t.onEnable = function() {
    yl(c, i ? !1 : "x"), wt.addEventListener("refresh", q), ke(vt, "resize", q), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = m.smooth = !1), y.enable();
  }, t.onDisable = function() {
    yl(c, !0), Oe(vt, "resize", q), wt.removeEventListener("refresh", q), y.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new ue(t), a.iOS = An, An && !u() && u(1), An && X.ticker.add(Gi), it = a._dc, F = X.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: cp(u, u(), function() {
        return F.pause();
      })
    },
    onUpdate: vn,
    onComplete: it.vars.onComplete
  }), a;
};
wt.sort = function(s) {
  if (We(s))
    return yt.sort(s);
  var t = vt.pageYOffset || 0;
  return wt.getAll().forEach(function(e) {
    return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + vt.innerHeight;
  }), yt.sort(s || function(e, i) {
    return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6);
  });
};
wt.observe = function(s) {
  return new ue(s);
};
wt.normalizeScroll = function(s) {
  if (typeof s > "u")
    return Je;
  if (s === !0 && Je)
    return Je.enable();
  if (s === !1) {
    Je && Je.kill(), Je = s;
    return;
  }
  var t = s instanceof ue ? s : v_(s);
  return Je && Je.target === t.target && Je.kill(), gs(t.target) && (Je = t), t;
};
wt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Gl,
  _inputObserver: hp,
  _scrollers: bt,
  _proxies: nn,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Li || ys("scrollStart"), Li = Ve();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Be;
    }
  }
};
tp() && X.registerPlugin(wt);
/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ji, su, jr, dp, Ls, Ns, ru, fp, pp = function() {
  return ji || typeof window < "u" && (ji = window.gsap);
}, ou = {}, b_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, au = function(t) {
  return fp(t).id;
}, Ir = function(t) {
  return ou[au(typeof t == "string" ? jr(t)[0] : t)];
}, zh = function(t) {
  var e = Ls, i;
  if (t - ru >= 0.05)
    for (ru = t; e; )
      i = e.g(e.t, e.p), (i !== e.v1 || t - e.t1 > 0.2) && (e.v2 = e.v1, e.v1 = i, e.t2 = e.t1, e.t1 = t), e = e._next;
}, w_ = {
  deg: 360,
  rad: Math.PI * 2
}, vl = function() {
  ji = pp(), ji && (jr = ji.utils.toArray, dp = ji.utils.getUnit, fp = ji.core.getCache, Ns = ji.ticker, su = 1);
}, x_ = function(t, e, i, n) {
  this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = w_[i || dp(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = Ns.time, n && (this._next = n, n._prev = this);
}, To = /* @__PURE__ */ function() {
  function s(e, i) {
    su || vl(), this.target = jr(e)[0], ou[au(this.target)] = this, this._props = {}, i && this.add(i);
  }
  s.register = function(i) {
    ji = i, vl();
  };
  var t = s.prototype;
  return t.get = function(i, n) {
    var r = this._props[i] || console.warn("Not tracking " + i + " velocity."), o, a, l;
    return o = parseFloat(n ? r.v1 : r.g(r.t, r.p)), a = o - parseFloat(r.v2), l = r.rCap, l && (a = a % l, a !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), b_(a / ((n ? r.t1 : Ns.time) - r.t2));
  }, t.getAll = function() {
    var i = {}, n = this._props, r;
    for (r in n)
      i[r] = this.get(r);
    return i;
  }, t.isTracking = function(i) {
    return i in this._props;
  }, t.add = function(i, n) {
    i in this._props || (Ls || (Ns.add(zh), ru = Ns.time), Ls = this._props[i] = new x_(this.target, i, n, Ls));
  }, t.remove = function(i) {
    var n = this._props[i], r, o;
    n && (r = n._prev, o = n._next, r && (r._next = o), o ? o._prev = r : Ls === n && (Ns.remove(zh), Ls = 0), delete this._props[i]);
  }, t.kill = function(i) {
    for (var n in this._props)
      this.remove(n);
    i || delete ou[au(this.target)];
  }, s.track = function(i, n, r) {
    su || vl();
    for (var o = [], a = jr(i), l = n.split(","), c = (r || "").split(","), h = a.length, d, f; h--; ) {
      for (d = Ir(a[h]) || new s(a[h]), f = l.length; f--; )
        d.add(l[f], c[f] || c[0]);
      o.push(d);
    }
    return o;
  }, s.untrack = function(i, n) {
    var r = (n || "").split(",");
    jr(i).forEach(function(o) {
      var a = Ir(o);
      a && (r.length ? r.forEach(function(l) {
        return a.remove(l);
      }) : a.kill(1));
    });
  }, s.isTracking = function(i, n) {
    var r = Ir(i);
    return r && r.isTracking(n);
  }, s.getVelocity = function(i, n) {
    var r = Ir(i);
    return !r || !r.isTracking(n) ? console.warn("Not tracking velocity of " + n) : r.get(n);
  }, s;
}();
To.getByTarget = Ir;
pp() && ji.registerPlugin(To);
/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ee, mp, Nh, gp, lu, Zr, _p, yp, vp, uc, bp, Qr, uu, wp, Ea = To.getByTarget, xp = function() {
  return Ee || typeof window < "u" && (Ee = window.gsap) && Ee.registerPlugin && Ee;
}, T_ = function(t) {
  return typeof t == "string";
}, po = function(t) {
  return typeof t == "number";
}, $n = function(t) {
  return typeof t == "object";
}, cu = function(t) {
  return typeof t == "function";
}, S_ = 1, Tp = Array.isArray, E_ = function(t) {
  return t;
}, Zs = 1e10, $h = 1 / Zs, Sp = 0.05, A_ = function(t) {
  return Math.round(t * 1e4) / 1e4;
}, C_ = function(t, e, i) {
  for (var n in e)
    !(n in t) && n !== i && (t[n] = e[n]);
  return t;
}, P_ = function s(t) {
  var e = {}, i, n;
  for (i in t)
    e[i] = $n(n = t[i]) && !Tp(n) ? s(n) : n;
  return e;
}, Bh = function(t, e, i, n, r) {
  var o = e.length, a = 0, l = Zs, c, h, d, f;
  if ($n(t)) {
    for (; o--; ) {
      c = e[o], h = 0;
      for (d in t)
        f = c[d] - t[d], h += f * f;
      h < l && (a = o, l = h);
    }
    if ((r || Zs) < Zs && r < Math.sqrt(l))
      return t;
  } else
    for (; o--; )
      c = e[o], h = c - t, h < 0 && (h = -h), h < l && c >= n && c <= i && (a = o, l = h);
  return e[a];
}, Ep = function(t, e, i, n, r, o, a) {
  if (t.end === "auto")
    return t;
  var l = t.end, c, h;
  if (i = isNaN(i) ? Zs : i, n = isNaN(n) ? -1e10 : n, $n(e)) {
    if (c = e.calculated ? e : (cu(l) ? l(e, a) : Bh(e, l, i, n, o)) || e, !e.calculated) {
      for (h in c)
        e[h] = c[h];
      e.calculated = !0;
    }
    c = c[r];
  } else
    c = cu(l) ? l(e, a) : Tp(l) ? Bh(e, l, i, n, o) : parseFloat(l);
  return c > i ? c = i : c < n && (c = n), {
    max: c,
    min: c,
    unitFactor: t.unitFactor
  };
}, Aa = function(t, e, i) {
  return isNaN(t[e]) ? i : +t[e];
}, cc = function(t, e) {
  return e * Sp * t / uc;
}, Vh = function(t, e, i) {
  return Math.abs((e - t) * uc / i / Sp);
}, Ap = {
  resistance: 1,
  checkpoint: 1,
  preventOvershoot: 1,
  linkedProps: 1,
  radius: 1,
  duration: 1
}, Cp = function(t, e, i, n) {
  if (e.linkedProps) {
    var r = e.linkedProps.split(","), o = {}, a, l, c, h, d, f;
    for (a = 0; a < r.length; a++)
      l = r[a], c = e[l], c && (po(c.velocity) ? h = c.velocity : (d = d || Ea(t), h = d && d.isTracking(l) ? d.get(l) : 0), f = Math.abs(h / Aa(c, "resistance", n)), o[l] = parseFloat(i(t, l)) + cc(h, f));
    return o;
  }
}, O_ = function(t, e, i, n, r, o) {
  if (i === void 0 && (i = 10), n === void 0 && (n = 0.2), r === void 0 && (r = 1), T_(t) && (t = gp(t)[0]), !t)
    return 0;
  var a = 0, l = Zs, c = e.inertia || e, h = vp(t).get, d = Aa(c, "resistance", Zr.resistance), f, u, m, p, _, b, A, C, T, y;
  y = Cp(t, c, h, d);
  for (f in c)
    Ap[f] || (u = c[f], $n(u) || (C = C || Ea(t), C && C.isTracking(f) ? u = po(u) ? {
      velocity: u
    } : {
      velocity: C.get(f)
    } : (p = +u || 0, m = Math.abs(p / d))), $n(u) && (po(u.velocity) ? p = u.velocity : (C = C || Ea(t), p = C && C.isTracking(f) ? C.get(f) : 0), m = bp(n, i, Math.abs(p / Aa(u, "resistance", d))), _ = parseFloat(h(t, f)) || 0, b = _ + cc(p, m), "end" in u && (u = Ep(u, y && f in y ? y : b, u.max, u.min, f, c.radius, p), Qr === e && (Qr = c = P_(e)), c[f] = C_(u, c[f], "end")), "max" in u && b > +u.max + $h ? (T = u.unitFactor || Zr.unitFactors[f] || 1, A = _ > u.max && u.min !== u.max || p * T > -15 && p * T < 45 ? n + (i - n) * 0.1 : Vh(_, u.max, p), A + r < l && (l = A + r)) : "min" in u && b < +u.min - $h && (T = u.unitFactor || Zr.unitFactors[f] || 1, A = _ < u.min && u.min !== u.max || p * T > -45 && p * T < 15 ? n + (i - n) * 0.1 : Vh(_, u.min, p), A + r < l && (l = A + r)), A > a && (a = A)), m > a && (a = m));
  return a > l && (a = l), a > i ? i : a < n ? n : a;
}, Hh = function() {
  Ee = xp(), Ee && (Nh = Ee.parseEase, gp = Ee.utils.toArray, _p = Ee.utils.getUnit, vp = Ee.core.getCache, bp = Ee.utils.clamp, uu = Ee.core.getStyleSaver, wp = Ee.core.reverting || function() {
  }, lu = Nh("power3"), uc = lu(0.05), yp = Ee.core.PropTween, Ee.config({
    resistance: 100,
    unitFactors: {
      time: 1e3,
      totalTime: 1e3,
      progress: 1e3,
      totalProgress: 1e3
    }
  }), Zr = Ee.config(), Ee.registerPlugin(To), mp = 1);
}, Pp = {
  version: "3.13.0",
  name: "inertia",
  register: function(t) {
    Ee = t, Hh();
  },
  init: function(t, e, i, n, r) {
    mp || Hh();
    var o = Ea(t);
    if (e === "auto") {
      if (!o) {
        console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
        return;
      }
      e = o.getAll();
    }
    this.styles = uu && typeof t.style == "object" && uu(t), this.target = t, this.tween = i, Qr = e;
    var a = t._gsap, l = a.get, c = e.duration, h = $n(c), d = e.preventOvershoot || h && c.overshoot === 0, f = Aa(e, "resistance", Zr.resistance), u = po(c) ? c : O_(t, e, h && c.max || 10, h && c.min || 0.2, h && "overshoot" in c ? +c.overshoot : d ? 0 : 1), m, p, _, b, A, C, T, y, O;
    e = Qr, Qr = 0, O = Cp(t, e, l, f);
    for (m in e)
      Ap[m] || (p = e[m], cu(p) && (p = p(n, t, r)), po(p) ? A = p : $n(p) && !isNaN(p.velocity) ? A = +p.velocity : o && o.isTracking(m) ? A = o.get(m) : console.warn("ERROR: No velocity was defined for " + t + " property: " + m), C = cc(A, u), y = 0, _ = l(t, m), b = _p(_), _ = parseFloat(_), $n(p) && (T = _ + C, "end" in p && (p = Ep(p, O && m in O ? O : T, p.max, p.min, m, e.radius, A)), "max" in p && +p.max < T ? d || p.preventOvershoot ? C = p.max - _ : y = p.max - _ - C : "min" in p && +p.min > T && (d || p.preventOvershoot ? C = p.min - _ : y = p.min - _ - C)), this._props.push(m), this.styles && this.styles.save(m), this._pt = new yp(this._pt, t, m, _, 0, E_, 0, a.set(t, m, this)), this._pt.u = b || 0, this._pt.c1 = C, this._pt.c2 = y);
    return i.duration(u), S_;
  },
  render: function(t, e) {
    var i = e._pt;
    if (t = lu(e.tween._time / e.tween._dur), t || !wp())
      for (; i; )
        i.set(i.t, i.p, A_(i.s + i.c1 * t + i.c2 * t * t) + i.u, i.d, t), i = i._next;
    else
      e.styles.revert();
  }
};
"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s) {
  return Pp[s] = To[s];
});
xp() && Ee.registerPlugin(Pp);
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
let yr, ks, hu, k_ = () => hu || D_.register(window.gsap), Yh = typeof Intl < "u" ? new Intl.Segmenter() : 0, Ca = (s) => typeof s == "string" ? Ca(document.querySelectorAll(s)) : "length" in s ? Array.from(s) : [s], Wh = (s) => Ca(s).filter((t) => t instanceof HTMLElement), du = [], bl = function() {
}, M_ = /\s+/g, qh = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Uh = { left: 0, top: 0, width: 0, height: 0 }, Kh = (s, t) => {
  if (t) {
    let e = new Set(s.join("").match(t) || du), i = s.length, n, r, o, a;
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
}, Xh = (s) => window.getComputedStyle(s).display === "inline" && (s.style.display = "inline-block"), Ms = (s, t, e) => t.insertBefore(typeof s == "string" ? document.createTextNode(s) : s, e), fu = (s, t, e) => {
  let i = t[s + "sClass"] || "", { tag: n = "div", aria: r = "auto", propIndex: o = !1 } = t, a = s === "line" ? "block" : "inline-block", l = i.indexOf("++") > -1, c = (h) => {
    let d = document.createElement(n), f = e.length + 1;
    return i && (d.className = i + (l ? " " + i + f : "")), o && d.style.setProperty("--" + s, f + ""), r !== "none" && d.setAttribute("aria-hidden", "true"), n !== "span" && (d.style.position = "relative", d.style.display = a), d.textContent = h, e.push(d), d;
  };
  return l && (i = i.replace("++", "")), c.collection = e, c;
}, I_ = (s, t, e, i) => {
  let n = fu("line", e, i), r = window.getComputedStyle(s).textAlign || "left";
  return (o, a) => {
    let l = n("");
    for (l.style.textAlign = r, s.insertBefore(l, t[o]); o < a; o++)
      l.appendChild(t[o]);
    l.normalize();
  };
}, Op = (s, t, e, i, n, r, o, a, l, c) => {
  var h;
  let d = Array.from(s.childNodes), f = 0, { wordDelimiter: u, reduceWhiteSpace: m = !0, prepareText: p } = t, _ = s.getBoundingClientRect(), b = _, A = !m && window.getComputedStyle(s).whiteSpace.substring(0, 3) === "pre", C = 0, T = e.collection, y, O, P, S, k, R, V, F, B, J, it, q, H, tt, ot, w, G, nt;
  for (typeof u == "object" ? (P = u.delimiter || u, O = u.replaceWith || "") : O = u === "" ? "" : u || " ", y = O !== " "; f < d.length; f++)
    if (S = d[f], S.nodeType === 3) {
      for (ot = S.textContent || "", m ? ot = ot.replace(M_, " ") : A && (ot = ot.replace(/\n/g, O + `
`)), p && (ot = p(ot, s)), S.textContent = ot, k = O || P ? ot.split(P || O) : ot.match(a) || du, G = k[k.length - 1], F = y ? G.slice(-1) === " " : !G, G || k.pop(), b = _, V = y ? k[0].charAt(0) === " " : !k[0], V && Ms(" ", s, S), k[0] || k.shift(), Kh(k, l), r && c || (S.textContent = ""), B = 1; B <= k.length; B++)
        if (w = k[B - 1], !m && A && w.charAt(0) === `
` && ((h = S.previousSibling) == null || h.remove(), Ms(document.createElement("br"), s, S), w = w.slice(1)), !m && w === "")
          Ms(O, s, S);
        else if (w === " ")
          s.insertBefore(document.createTextNode(" "), S);
        else {
          if (y && w.charAt(0) === " " && Ms(" ", s, S), C && B === 1 && !V && T.indexOf(C.parentNode) > -1 ? (R = T[T.length - 1], R.appendChild(document.createTextNode(i ? "" : w))) : (R = e(i ? "" : w), Ms(R, s, S), C && B === 1 && !V && R.insertBefore(C, R.firstChild)), i)
            for (it = Yh ? Kh([...Yh.segment(w)].map((U) => U.segment), l) : w.match(a) || du, nt = 0; nt < it.length; nt++)
              R.appendChild(it[nt] === " " ? document.createTextNode(" ") : i(it[nt]));
          if (r && c) {
            if (ot = S.textContent = ot.substring(w.length + 1, ot.length), J = R.getBoundingClientRect(), J.top > b.top && J.left <= b.left) {
              for (q = s.cloneNode(), H = s.childNodes[0]; H && H !== R; )
                tt = H, H = H.nextSibling, q.appendChild(tt);
              s.parentNode.insertBefore(q, s), n && Xh(q);
            }
            b = J;
          }
          (B < k.length || F) && Ms(B >= k.length ? " " : y && w.slice(-1) === " " ? " " + O : O, s, S);
        }
      s.removeChild(S), C = 0;
    } else S.nodeType === 1 && (o && o.indexOf(S) > -1 ? (T.indexOf(S.previousSibling) > -1 && T[T.length - 1].appendChild(S), C = S) : (Op(S, t, e, i, n, r, o, a, l, !0), C = 0), n && Xh(S));
};
const kp = class Mp {
  constructor(t, e) {
    this.isSplit = !1, k_(), this.elements = Wh(t), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = e, this._split = () => this.isSplit && this.split(this.vars);
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
    }) }, bl(this), this.split(e);
  }
  split(t) {
    this.isSplit && this.revert(), this.vars = t = t || this.vars || {};
    let { type: e = "chars,words,lines", aria: i = "auto", deepSlice: n = !0, smartWrap: r, onSplit: o, autoSplit: a = !1, specialChars: l, mask: c } = this.vars, h = e.indexOf("lines") > -1, d = e.indexOf("chars") > -1, f = e.indexOf("words") > -1, u = d && !f && !h, m = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l), p = m ? new RegExp(m.source + "|" + qh.source, "gu") : qh, _ = !!t.ignore && Wh(t.ignore), { orig: b, animTime: A, obs: C } = this._data, T;
    return (d || f || h) && (this.elements.forEach((y, O) => {
      b[O] = {
        element: y,
        html: y.innerHTML,
        ariaL: y.getAttribute("aria-label"),
        ariaH: y.getAttribute("aria-hidden")
      }, i === "auto" ? y.setAttribute("aria-label", (y.textContent || "").trim()) : i === "hidden" && y.setAttribute("aria-hidden", "true");
      let P = [], S = [], k = [], R = d ? fu("char", t, P) : null, V = fu("word", t, S), F, B, J, it;
      if (Op(y, t, V, R, u, n && (h || u), _, p, m, !1), h) {
        let q = Ca(y.childNodes), H = I_(y, q, t, k), tt, ot = [], w = 0, G = q.map((U) => U.nodeType === 1 ? U.getBoundingClientRect() : Uh), nt = Uh;
        for (F = 0; F < q.length; F++)
          tt = q[F], tt.nodeType === 1 && (tt.nodeName === "BR" ? (ot.push(tt), H(w, F + 1), w = F + 1, nt = G[w]) : (F && G[F].top > nt.top && G[F].left <= nt.left && (H(w, F), w = F), nt = G[F]));
        w < F && H(w, F), ot.forEach((U) => {
          var rt;
          return (rt = U.parentNode) == null ? void 0 : rt.removeChild(U);
        });
      }
      if (!f) {
        for (F = 0; F < S.length; F++)
          if (B = S[F], d || !B.nextSibling || B.nextSibling.nodeType !== 3)
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
    }))), this.isSplit = !0, ks && (a ? ks.addEventListener("loadingdone", this._split) : ks.status === "loading" && console.warn("SplitText called before fonts loaded")), (T = o && o(this)) && T.totalTime && (this._data.anim = A ? T.totalTime(A) : T), h && a && this.elements.forEach((y, O) => {
      b[O].width = y.offsetWidth, C && C.observe(y);
    }), this;
  }
  revert() {
    var t, e;
    let { orig: i, anim: n, obs: r } = this._data;
    return r && r.disconnect(), i.forEach(({ element: o, html: a, ariaL: l, ariaH: c }) => {
      o.innerHTML = a, l ? o.setAttribute("aria-label", l) : o.removeAttribute("aria-label"), c ? o.setAttribute("aria-hidden", c) : o.removeAttribute("aria-hidden");
    }), this.chars.length = this.words.length = this.lines.length = i.length = this.masks.length = 0, this.isSplit = !1, ks == null || ks.removeEventListener("loadingdone", this._split), n && (this._data.animTime = n.totalTime(), n.revert()), (e = (t = this.vars).onRevert) == null || e.call(t, this), this;
  }
  static create(t, e) {
    return new Mp(t, e);
  }
  static register(t) {
    yr = yr || t || window.gsap, yr && (Ca = yr.utils.toArray, bl = yr.core.context || bl), !hu && window.innerWidth > 0 && (ks = document.fonts, hu = !0);
  }
};
kp.version = "3.13.0";
let D_ = kp;
var Q = Wt.registerPlugin(Fa) || Wt;
Q.core.Tween;
var Xo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function L_(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Dr = { exports: {} };
Dr.exports;
var Gh;
function R_() {
  return Gh || (Gh = 1, function(s, t) {
    var e = 200, i = "__lodash_hash_undefined__", n = 800, r = 16, o = 9007199254740991, a = "[object Arguments]", l = "[object Array]", c = "[object AsyncFunction]", h = "[object Boolean]", d = "[object Date]", f = "[object Error]", u = "[object Function]", m = "[object GeneratorFunction]", p = "[object Map]", _ = "[object Number]", b = "[object Null]", A = "[object Object]", C = "[object Proxy]", T = "[object RegExp]", y = "[object Set]", O = "[object String]", P = "[object Undefined]", S = "[object WeakMap]", k = "[object ArrayBuffer]", R = "[object DataView]", V = "[object Float32Array]", F = "[object Float64Array]", B = "[object Int8Array]", J = "[object Int16Array]", it = "[object Int32Array]", q = "[object Uint8Array]", H = "[object Uint8ClampedArray]", tt = "[object Uint16Array]", ot = "[object Uint32Array]", w = /[\\^$.*+?()[\]{}|]/g, G = /^\[object .+?Constructor\]$/, nt = /^(?:0|[1-9]\d*)$/, U = {};
    U[V] = U[F] = U[B] = U[J] = U[it] = U[q] = U[H] = U[tt] = U[ot] = !0, U[a] = U[l] = U[k] = U[h] = U[R] = U[d] = U[f] = U[u] = U[p] = U[_] = U[A] = U[T] = U[y] = U[O] = U[S] = !1;
    var rt = typeof Xo == "object" && Xo && Xo.Object === Object && Xo, It = typeof self == "object" && self && self.Object === Object && self, gt = rt || It || Function("return this")(), At = t && !t.nodeType && t, lt = At && !0 && s && !s.nodeType && s, Lt = lt && lt.exports === At, se = Lt && rt.process, $t = function() {
      try {
        var g = lt && lt.require && lt.require("util").types;
        return g || se && se.binding && se.binding("util");
      } catch {
      }
    }(), Ut = $t && $t.isTypedArray;
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
      for (var L = -1, Z = Array(g); ++L < g; )
        Z[L] = x(L);
      return Z;
    }
    function ut(g) {
      return function(x) {
        return g(x);
      };
    }
    function Ce(g, x) {
      return g == null ? void 0 : g[x];
    }
    function I(g, x) {
      return function(L) {
        return g(x(L));
      };
    }
    var Bt = Array.prototype, Xe = Function.prototype, Ie = Object.prototype, Rt = gt["__core-js_shared__"], Nt = Xe.toString, ce = Ie.hasOwnProperty, Ge = function() {
      var g = /[^.]+$/.exec(Rt && Rt.keys && Rt.keys.IE_PROTO || "");
      return g ? "Symbol(src)_1." + g : "";
    }(), Xt = Ie.toString, re = Nt.call(Object), Pt = RegExp(
      "^" + Nt.call(ce).replace(w, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), he = Lt ? gt.Buffer : void 0, De = gt.Symbol, ze = gt.Uint8Array;
    he && he.allocUnsafe;
    var Ui = I(Object.getPrototypeOf, Object), Kt = Object.create, Ki = Ie.propertyIsEnumerable, ri = Bt.splice, ve = De ? De.toStringTag : void 0, Le = function() {
      try {
        var g = Ya(Object, "defineProperty");
        return g({}, "", {}), g;
      } catch {
      }
    }(), Ti = he ? he.isBuffer : void 0, Ne = Math.max, at = Date.now, $e = Ya(gt, "Map"), Ft = Ya(Object, "create"), Pe = /* @__PURE__ */ function() {
      function g() {
      }
      return function(x) {
        if (!un(x))
          return {};
        if (Kt)
          return Kt(x);
        g.prototype = x;
        var L = new g();
        return g.prototype = void 0, L;
      };
    }();
    function ie(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Z = g[x];
        this.set(Z[0], Z[1]);
      }
    }
    function Si() {
      this.__data__ = Ft ? Ft(null) : {}, this.size = 0;
    }
    function j(g) {
      var x = this.has(g) && delete this.__data__[g];
      return this.size -= x ? 1 : 0, x;
    }
    function v(g) {
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
    ie.prototype.clear = Si, ie.prototype.delete = j, ie.prototype.get = v, ie.prototype.has = $, ie.prototype.set = E;
    function M(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Z = g[x];
        this.set(Z[0], Z[1]);
      }
    }
    function N() {
      this.__data__ = [], this.size = 0;
    }
    function D(g) {
      var x = this.__data__, L = an(x, g);
      if (L < 0)
        return !1;
      var Z = x.length - 1;
      return L == Z ? x.pop() : ri.call(x, L, 1), --this.size, !0;
    }
    function Y(g) {
      var x = this.__data__, L = an(x, g);
      return L < 0 ? void 0 : x[L][1];
    }
    function z(g) {
      return an(this.__data__, g) > -1;
    }
    function W(g, x) {
      var L = this.__data__, Z = an(L, g);
      return Z < 0 ? (++this.size, L.push([g, x])) : L[Z][1] = x, this;
    }
    M.prototype.clear = N, M.prototype.delete = D, M.prototype.get = Y, M.prototype.has = z, M.prototype.set = W;
    function et(g) {
      var x = -1, L = g == null ? 0 : g.length;
      for (this.clear(); ++x < L; ) {
        var Z = g[x];
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
    function dt(g) {
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
      var L = ko(this, g), Z = L.size;
      return L.set(g, x), this.size += L.size == Z ? 0 : 1, this;
    }
    et.prototype.clear = K, et.prototype.delete = dt, et.prototype.get = xt, et.prototype.has = Ct, et.prototype.set = _t;
    function ft(g) {
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
    function be(g) {
      return this.__data__.get(g);
    }
    function Gt(g) {
      return this.__data__.has(g);
    }
    function we(g, x) {
      var L = this.__data__;
      if (L instanceof M) {
        var Z = L.__data__;
        if (!$e || Z.length < e - 1)
          return Z.push([g, x]), this.size = ++L.size, this;
        L = this.__data__ = new et(Z);
      }
      return L.set(g, x), this.size = L.size, this;
    }
    ft.prototype.clear = Ot, ft.prototype.delete = ct, ft.prototype.get = be, ft.prototype.has = Gt, ft.prototype.set = we;
    function xe(g, x) {
      var L = Ua(g), Z = !L && qa(g), Tt = !L && !Z && zc(g), kt = !L && !Z && !Tt && $c(g), jt = L || Z || Tt || kt, Mt = jt ? mt(g.length, String) : [], Zt = Mt.length;
      for (var zi in g)
        jt && // Safari 9 has enumerable `arguments.length` in strict mode.
        (zi == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Tt && (zi == "offset" || zi == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        kt && (zi == "buffer" || zi == "byteLength" || zi == "byteOffset") || // Skip index properties.
        Rc(zi, Zt)) || Mt.push(zi);
      return Mt;
    }
    function de(g, x, L) {
      (L !== void 0 && !Mo(g[x], L) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function on(g, x, L) {
      var Z = g[x];
      (!(ce.call(g, x) && Mo(Z, L)) || L === void 0 && !(x in g)) && fe(g, x, L);
    }
    function an(g, x) {
      for (var L = g.length; L--; )
        if (Mo(g[L][0], x))
          return L;
      return -1;
    }
    function fe(g, x, L) {
      x == "__proto__" && Le ? Le(g, x, {
        configurable: !0,
        enumerable: !0,
        value: L,
        writable: !0
      }) : g[x] = L;
    }
    var oe = tg();
    function je(g) {
      return g == null ? g === void 0 ? P : b : ve && ve in Object(g) ? eg(g) : ag(g);
    }
    function xs(g) {
      return dr(g) && je(g) == a;
    }
    function Oo(g) {
      if (!un(g) || rg(g))
        return !1;
      var x = Xa(g) ? Pt : G;
      return x.test(hg(g));
    }
    function qn(g) {
      return dr(g) && Nc(g.length) && !!U[je(g)];
    }
    function Ei(g) {
      if (!un(g))
        return og(g);
      var x = Fc(g), L = [];
      for (var Z in g)
        Z == "constructor" && (x || !ce.call(g, Z)) || L.push(Z);
      return L;
    }
    function ln(g, x, L, Z, Tt) {
      g !== x && oe(x, function(kt, jt) {
        if (Tt || (Tt = new ft()), un(kt))
          Ts(g, x, jt, L, ln, Z, Tt);
        else {
          var Mt = Z ? Z(Wa(g, jt), kt, jt + "", g, x, Tt) : void 0;
          Mt === void 0 && (Mt = kt), de(g, jt, Mt);
        }
      }, Bc);
    }
    function Ts(g, x, L, Z, Tt, kt, jt) {
      var Mt = Wa(g, L), Zt = Wa(x, L), zi = jt.get(Zt);
      if (zi) {
        de(g, L, zi);
        return;
      }
      var hi = kt ? kt(Mt, Zt, L + "", g, x, jt) : void 0, fr = hi === void 0;
      if (fr) {
        var Ga = Ua(Zt), ja = !Ga && zc(Zt), Hc = !Ga && !ja && $c(Zt);
        hi = Zt, Ga || ja || Hc ? Ua(Mt) ? hi = Mt : dg(Mt) ? hi = Zm(Mt) : ja ? (fr = !1, hi = Xm(Zt)) : Hc ? (fr = !1, hi = jm(Zt)) : hi = [] : fg(Zt) || qa(Zt) ? (hi = Mt, qa(Mt) ? hi = pg(Mt) : (!un(Mt) || Xa(Mt)) && (hi = ig(Zt))) : fr = !1;
      }
      fr && (jt.set(Zt, hi), Tt(hi, Zt, Z, kt, jt), jt.delete(Zt)), de(g, L, hi);
    }
    function Fi(g, x) {
      return ug(lg(g, x, Vc), g + "");
    }
    var Km = Le ? function(g, x) {
      return Le(g, "toString", {
        configurable: !0,
        enumerable: !1,
        value: _g(x),
        writable: !0
      });
    } : Vc;
    function Xm(g, x) {
      return g.slice();
    }
    function Gm(g) {
      var x = new g.constructor(g.byteLength);
      return new ze(x).set(new ze(g)), x;
    }
    function jm(g, x) {
      var L = Gm(g.buffer);
      return new g.constructor(L, g.byteOffset, g.length);
    }
    function Zm(g, x) {
      var L = -1, Z = g.length;
      for (x || (x = Array(Z)); ++L < Z; )
        x[L] = g[L];
      return x;
    }
    function Qm(g, x, L, Z) {
      var Tt = !L;
      L || (L = {});
      for (var kt = -1, jt = x.length; ++kt < jt; ) {
        var Mt = x[kt], Zt = void 0;
        Zt === void 0 && (Zt = g[Mt]), Tt ? fe(L, Mt, Zt) : on(L, Mt, Zt);
      }
      return L;
    }
    function Jm(g) {
      return Fi(function(x, L) {
        var Z = -1, Tt = L.length, kt = Tt > 1 ? L[Tt - 1] : void 0, jt = Tt > 2 ? L[2] : void 0;
        for (kt = g.length > 3 && typeof kt == "function" ? (Tt--, kt) : void 0, jt && ng(L[0], L[1], jt) && (kt = Tt < 3 ? void 0 : kt, Tt = 1), x = Object(x); ++Z < Tt; ) {
          var Mt = L[Z];
          Mt && g(x, Mt, Z, kt);
        }
        return x;
      });
    }
    function tg(g) {
      return function(x, L, Z) {
        for (var Tt = -1, kt = Object(x), jt = Z(x), Mt = jt.length; Mt--; ) {
          var Zt = jt[++Tt];
          if (L(kt[Zt], Zt, kt) === !1)
            break;
        }
        return x;
      };
    }
    function Lc(g, x, L, Z, Tt, kt) {
      return un(g) && un(x) && (kt.set(x, g), ln(g, x, void 0, Lc, kt), kt.delete(x)), g;
    }
    function ko(g, x) {
      var L = g.__data__;
      return sg(x) ? L[typeof x == "string" ? "string" : "hash"] : L.map;
    }
    function Ya(g, x) {
      var L = Ce(g, x);
      return Oo(L) ? L : void 0;
    }
    function eg(g) {
      var x = ce.call(g, ve), L = g[ve];
      try {
        g[ve] = void 0;
        var Z = !0;
      } catch {
      }
      var Tt = Xt.call(g);
      return Z && (x ? g[ve] = L : delete g[ve]), Tt;
    }
    function ig(g) {
      return typeof g.constructor == "function" && !Fc(g) ? Pe(Ui(g)) : {};
    }
    function Rc(g, x) {
      var L = typeof g;
      return x = x ?? o, !!x && (L == "number" || L != "symbol" && nt.test(g)) && g > -1 && g % 1 == 0 && g < x;
    }
    function ng(g, x, L) {
      if (!un(L))
        return !1;
      var Z = typeof x;
      return (Z == "number" ? Ka(L) && Rc(x, L.length) : Z == "string" && x in L) ? Mo(L[x], g) : !1;
    }
    function sg(g) {
      var x = typeof g;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? g !== "__proto__" : g === null;
    }
    function rg(g) {
      return !!Ge && Ge in g;
    }
    function Fc(g) {
      var x = g && g.constructor, L = typeof x == "function" && x.prototype || Ie;
      return g === L;
    }
    function og(g) {
      var x = [];
      if (g != null)
        for (var L in Object(g))
          x.push(L);
      return x;
    }
    function ag(g) {
      return Xt.call(g);
    }
    function lg(g, x, L) {
      return x = Ne(x === void 0 ? g.length - 1 : x, 0), function() {
        for (var Z = arguments, Tt = -1, kt = Ne(Z.length - x, 0), jt = Array(kt); ++Tt < kt; )
          jt[Tt] = Z[x + Tt];
        Tt = -1;
        for (var Mt = Array(x + 1); ++Tt < x; )
          Mt[Tt] = Z[Tt];
        return Mt[x] = L(jt), pt(g, this, Mt);
      };
    }
    function Wa(g, x) {
      if (!(x === "constructor" && typeof g[x] == "function") && x != "__proto__")
        return g[x];
    }
    var ug = cg(Km);
    function cg(g) {
      var x = 0, L = 0;
      return function() {
        var Z = at(), Tt = r - (Z - L);
        if (L = Z, Tt > 0) {
          if (++x >= n)
            return arguments[0];
        } else
          x = 0;
        return g.apply(void 0, arguments);
      };
    }
    function hg(g) {
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
    function Mo(g, x) {
      return g === x || g !== g && x !== x;
    }
    var qa = xs(/* @__PURE__ */ function() {
      return arguments;
    }()) ? xs : function(g) {
      return dr(g) && ce.call(g, "callee") && !Ki.call(g, "callee");
    }, Ua = Array.isArray;
    function Ka(g) {
      return g != null && Nc(g.length) && !Xa(g);
    }
    function dg(g) {
      return dr(g) && Ka(g);
    }
    var zc = Ti || yg;
    function Xa(g) {
      if (!un(g))
        return !1;
      var x = je(g);
      return x == u || x == m || x == c || x == C;
    }
    function Nc(g) {
      return typeof g == "number" && g > -1 && g % 1 == 0 && g <= o;
    }
    function un(g) {
      var x = typeof g;
      return g != null && (x == "object" || x == "function");
    }
    function dr(g) {
      return g != null && typeof g == "object";
    }
    function fg(g) {
      if (!dr(g) || je(g) != A)
        return !1;
      var x = Ui(g);
      if (x === null)
        return !0;
      var L = ce.call(x, "constructor") && x.constructor;
      return typeof L == "function" && L instanceof L && Nt.call(L) == re;
    }
    var $c = Ut ? ut(Ut) : qn;
    function pg(g) {
      return Qm(g, Bc(g));
    }
    var mg = Fi(function(g) {
      return g.push(void 0, Lc), pt(gg, void 0, g);
    });
    function Bc(g) {
      return Ka(g) ? xe(g) : Ei(g);
    }
    var gg = Jm(function(g, x, L, Z) {
      ln(g, x, L, Z);
    });
    function _g(g) {
      return function() {
        return g;
      };
    }
    function Vc(g) {
      return g;
    }
    function yg() {
      return !1;
    }
    s.exports = mg;
  }(Dr, Dr.exports)), Dr.exports;
}
var F_ = R_();
const qt = /* @__PURE__ */ L_(F_), z_ = 60, vr = {}, jh = (s, t = z_) => (...e) => requestAnimationFrame(() => {
  const i = (/* @__PURE__ */ new Date()).getTime(), n = 1e3 / t;
  vr[s] = vr[s] || null;
  const r = vr[s] ? i - vr[s] : null;
  (r === null || r > n) && (vr[s] = i - r % n, s(...e));
});
function mo() {
  if (!window.matchMedia)
    return !1;
  const s = window.matchMedia("(prefers-reduced-motion: reduce)");
  return s ? s.matches : !1;
}
const pu = (s, t, e, i, n, r) => {
  const o = (s + t) / 2;
  if (e <= 0 || t - s < i)
    return o;
  const a = `(${n}:${o}${r})`;
  return window.matchMedia(a).matches ? pu(o, t, e - 1, i, n, r) : pu(s, o, e - 1, i, n, r);
}, N_ = (s, t, e, i, n, r) => pu(e, i, n, r, s, t), $_ = () => Math.round(
  N_("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4) * 10
) / 10, B_ = (s) => Math.round(window.devicePixelRatio * 100) - s, V_ = () => Math.round(window.outerWidth / window.innerWidth * 10) / 10, wl = {
  firefox: $_,
  chrome: B_,
  default: V_
}, Zh = {
  calculate: (s, t) => wl[s] ? wl[s](t) : wl.default(t)
}, hc = "APPLICATION:MOBILE_MENU:OPEN", dc = "APPLICATION:MOBILE_MENU:CLOSED", Pa = "APPLICATION_PRELUDIUM", mu = "APPLICATION:INITIALIZED", go = "APPLICATION:READY", Ri = "APPLICATION:REVEALED", qi = "APPLICATION:RESIZE", Yn = "APPLICATION:SCROLL", Ip = "APPLICATION:SCROLL_LOCKED", Dp = "APPLICATION:SCROLL_RELEASED", Ba = "APPLICATION:FORCED_SCROLL_START", Va = "APPLICATION:FORCED_SCROLL_END", Ha = "APPLICATION:OUTLINE", Lp = "APPLICATION:VISIBILITY_CHANGE", Rp = "APPLICATION:HIDDEN", Fp = "APPLICATION:VISIBLE", Oa = "BREAKPOINT:CHANGE", fc = "IMAGE:LAZYLOADED", zp = "IMAGE:REVEALED", Np = "SECTION:LAZYLOADED", Tw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APPLICATION_FORCED_SCROLL_END: Va,
  APPLICATION_FORCED_SCROLL_START: Ba,
  APPLICATION_HIDDEN: Rp,
  APPLICATION_INITIALIZED: mu,
  APPLICATION_MOBILE_MENU_CLOSED: dc,
  APPLICATION_MOBILE_MENU_OPEN: hc,
  APPLICATION_OUTLINE: Ha,
  APPLICATION_PRELUDIUM: Pa,
  APPLICATION_READY: go,
  APPLICATION_RESIZE: qi,
  APPLICATION_REVEALED: Ri,
  APPLICATION_SCROLL: Yn,
  APPLICATION_SCROLL_LOCKED: Ip,
  APPLICATION_SCROLL_RELEASED: Dp,
  APPLICATION_VISIBILITY_CHANGE: Lp,
  APPLICATION_VISIBLE: Fp,
  BREAKPOINT_CHANGE: Oa,
  IMAGE_LAZYLOADED: fc,
  IMAGE_REVEALED: zp,
  SECTION_LAZYLOADED: Np
}, Symbol.toStringTag, { value: "Module" })), H_ = {
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
class Qh {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(t, e = {}) {
    this.app = t, this.mediaQueries = {}, this.opts = qt(e, H_), this.currentBreakpoint = null, this.initialized = !1, window.addEventListener(Pa, () => {
      this.initialize(!1);
    }), window.addEventListener(Ri, () => {
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
              const c = new CustomEvent(Oa, {
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
        }, n = new CustomEvent(Oa);
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
class Y_ {
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
        const e = new window.CustomEvent(Ha);
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
class W_ {
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
class q_ {
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
const st = new q_();
Q.registerPlugin(ws);
Q.defaults({
  ease: "sine.out"
});
window.onpageshow = (s) => {
  const t = window.location.hash;
  if (s.persisted || t) {
    const i = () => {
      console.log("== fixVisibility");
      const n = document.querySelector("#fader");
      n && Q.set(n, { autoAlpha: 0, display: "none" });
      const r = document.querySelectorAll("[data-fader]");
      r.length && Q.set(r, { autoAlpha: 0 }), Q.set(document.body, { clearProps: "opacity" }), document.body.classList.remove("unloaded");
      const o = st.find("header[data-nav]");
      o && Q.set(o, { clearProps: "opacity, transform" });
      const a = st.find("main");
      a && Q.set(a, { clearProps: "opacity, transform" });
      const l = st.find("footer");
      l && Q.set(l, { clearProps: "opacity, transform" });
    };
    s.persisted ? i() : t && (setTimeout(i, 100), setTimeout(i, 500));
  }
};
const Jh = {
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
      Q.to(t, {
        opacity: 0,
        ease: "power1.inOut",
        delay: 0,
        duration: 0.65,
        onComplete: () => {
          window.bfTO && clearTimeout(window.bfTO), Q.set(t, { display: "none" }), document.body.classList.remove("unloaded"), s();
        }
      });
    }
  }
};
class Sw {
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
    delete t.breakpointConfig, this.opts = qt(t, Jh), this.opts.breakpointConfig = e || Jh.breakpointConfig, this.focusableSelectors = this.opts.focusableSelectors, this.featureTests = new Y_(this, this.opts.featureTests), typeof this.opts.breakpointConfig == "object" ? this.breakpoints = new Qh(this, this.opts.breakpointConfig) : this.breakpoints = new Qh(this, this.opts.breakpointConfig(this)), this.hacks(), this.getZoom(), this.setDims(), this.fontLoader = new W_(this), this.fader = null, this.callbacks = {}, this.SCROLL_LOCKED = !1, this.SCROLLBAR_WIDTH = null, this.getScrollBarWidth(), this.INITIALIZED = !1, this.PREFERS_REDUCED_MOTION = mo(), this.PREFERS_REDUCED_MOTION && this.opts.respectReducedMotion && (Q.globalTimeline.timeScale(200), document.documentElement.classList.add("prefers-reduced-motion")), window.addEventListener(Oa, this.onBreakpointChanged.bind(this)), this.beforeInitializedEvent = new window.CustomEvent(Pa, this), this.initializedEvent = new window.CustomEvent(mu, this), this.readyEvent = new window.CustomEvent(go, this), this.revealedEvent = new window.CustomEvent(Ri, this), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this)), window.addEventListener("orientationchange", this.onResize.bind(this), {
      capture: !1,
      passive: !0
    }), t.bindScroll && window.addEventListener("scroll", jh(this.onScroll.bind(this)), {
      capture: !1,
      passive: !0
    }), t.bindResize && window.addEventListener("resize", jh(this.onResize.bind(this)), {
      capture: !1,
      passive: !0
    });
  }
  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize() {
    this._emitBeforeInitializedEvent(), this.setSection(), this.executeCallbacks(Pa), this.setupDebug(), this._emitInitializedEvent(), this.executeCallbacks(mu), this.ready();
  }
  /**
   * Application is initialized and ready.
   * Fade in, then execute callbacks
   */
  ready() {
    this.fontLoader.loadFonts(this.opts.fonts).then(() => {
      this._emitReadyEvent(), this.executeCallbacks(go), this.fadeIn();
    });
  }
  getZoom() {
    switch (this.browser) {
      case "chrome":
        this._lastDevicePixelRatio = Math.round(window.devicePixelRatio * 100), this._initialZoom = 1;
        break;
      case "safari":
        this._zoomSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._zoomSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._zoomSVG.setAttribute("version", "1.1"), Q.set(this._zoomSVG, { display: "none" }), document.body.appendChild(this._zoomSVG), this._initialZoom = this._zoomSVG.currentScale;
        break;
      default:
        this._initialZoom = Zh.calculate(this.browser);
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
        [1, -1].indexOf(e) === -1 ? t && (this.size.zoom = 1 + (Zh.calculate(this.browser) - this._initialZoom), this.size.zoom === 0 && (this.size.zoom = 1)) : this._initialZoom = Math.min(Math.max(this._initialZoom - e, 1), 2);
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
    const e = this.getCurrentScrollBarWidth(), i = new window.CustomEvent(Ip, this);
    this._scrollPaddedElements = [document.body, ...t], window.dispatchEvent(i), this.SCROLL_LOCKED = !0, Q.set(document.body, { overflow: "hidden" }), Q.set(this._scrollPaddedElements, {
      paddingRight: e
    }), document.addEventListener("touchmove", this.scrollVoid, !1);
  }
  scrollRelease(t = "scroll") {
    if (!this.SCROLL_LOCKED)
      return;
    const e = new window.CustomEvent(Dp, this);
    window.dispatchEvent(e), this.SCROLL_LOCKED = !1, Q.set(document.body, { overflow: t }), Q.set(this._scrollPaddedElements, { clearProps: "paddingRight" }), document.removeEventListener("touchmove", this.scrollVoid, !1);
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
    const o = new window.CustomEvent(Ba);
    this.state.forcedScroll = !0, i && window.dispatchEvent(o), typeof t == "object" ? r = t : r = { y: t, autoKill: !1 }, Q.to(window, {
      duration: e,
      scrollTo: r,
      onComplete: () => {
        const a = new window.CustomEvent(Va);
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
    document.body.hasAttribute("data-app-revealed") || (this.state.revealed = !0, document.body.dataset.appRevealed = !0, window.dispatchEvent(this.revealedEvent), this.executeCallbacks(Ri));
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
    const o = new CustomEvent(qi, {
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
    }, i = new CustomEvent(Yn, { detail: e });
    window.dispatchEvent(i);
  }
  onVisibilityChange(t) {
    let e = new CustomEvent(Lp, t);
    window.dispatchEvent(e), document.visibilityState === "hidden" ? (e = new CustomEvent(Rp, t), window.dispatchEvent(e)) : document.visibilityState === "visible" && (e = new CustomEvent(Fp, t), window.dispatchEvent(e));
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
    Q.set(t, { display: "none" }), t.innerHTML = `<b>&rarr; ${this.userAgent}</b> >> <span>KOPIER</span>`;
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
    const t = Q.timeline(), e = this.debugOverlay.querySelector(".breakpoint"), i = this.debugOverlay.querySelector(".user-agent");
    switch (this.debugType >= 2 ? this.debugType = 0 : this.debugType += 1, this.debugType) {
      case 0:
        t.to([e, i], { duration: 0.3, autoAlpha: 0 }).to([e, i], { duration: 0.7, width: 0 }).call(() => {
          Q.set([e, i], { display: "none" });
        });
        break;
      case 1:
        Q.set(e, { width: "auto", display: "block" }), t.from(e, { duration: 0.7, width: 0 }).to(e, {
          duration: 0.3,
          autoAlpha: 1
        });
        break;
      case 2:
        Q.set(i, { width: "auto", display: "block" }), t.from(i, { duration: 0.7, width: 0 }).to(i, {
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
        st.hasClass(i, "visible") ? (Q.set(n, { width: "auto" }), Q.to(n, {
          duration: 0.35,
          width: 0,
          stagger: 0.02,
          ease: "sine.inOut",
          onComplete: () => {
            i.classList.toggle("visible");
          }
        })) : (Q.set(n, { width: 0 }), i.classList.toggle("visible"), Q.to(n, {
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
function U_(s, t) {
  s.indexOf(t) === -1 && s.push(t);
}
function $p(s, t) {
  const e = s.indexOf(t);
  e > -1 && s.splice(e, 1);
}
const vs = (s, t, e) => e > t ? t : e < s ? s : e;
function gu(s, t) {
  return t ? `${s}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : s;
}
let So = () => {
}, rn = () => {
};
process.env.NODE_ENV !== "production" && (So = (s, t, e) => {
  !s && typeof console < "u" && console.warn(gu(t, e));
}, rn = (s, t, e) => {
  if (!s)
    throw new Error(gu(t, e));
});
const xn = {}, Bp = (s) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s);
function K_(s) {
  return typeof s == "object" && s !== null;
}
const Vp = (s) => /^0[^.\s]+$/u.test(s);
// @__NO_SIDE_EFFECTS__
function pc(s) {
  let t;
  return () => (t === void 0 && (t = s()), t);
}
const ar = /* @__NO_SIDE_EFFECTS__ */ (s) => s, X_ = (s, t) => (e) => t(s(e)), mc = (...s) => s.reduce(X_), gc = /* @__NO_SIDE_EFFECTS__ */ (s, t, e) => {
  const i = t - s;
  return i === 0 ? 1 : (e - s) / i;
};
class Hp {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return U_(this.subscriptions, t), () => $p(this.subscriptions, t);
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
const Wi = /* @__NO_SIDE_EFFECTS__ */ (s) => s * 1e3, Hi = /* @__NO_SIDE_EFFECTS__ */ (s) => s / 1e3;
function Yp(s, t) {
  return t ? s * (1e3 / t) : 0;
}
const td = /* @__PURE__ */ new Set();
function Wp(s, t, e) {
  s || td.has(t) || (console.warn(gu(t, e)), td.add(t));
}
const G_ = (s, t, e) => {
  const i = t - s;
  return ((e - s) % i + i) % i + s;
}, qp = (s, t, e) => (((1 - 3 * e + 3 * t) * s + (3 * e - 6 * t)) * s + 3 * t) * s, j_ = 1e-7, Z_ = 12;
function Q_(s, t, e, i, n) {
  let r, o, a = 0;
  do
    o = t + (e - t) / 2, r = qp(o, i, n) - s, r > 0 ? e = o : t = o;
  while (Math.abs(r) > j_ && ++a < Z_);
  return o;
}
function Eo(s, t, e, i) {
  if (s === t && e === i)
    return ar;
  const n = (r) => Q_(r, 0, 1, s, e);
  return (r) => r === 0 || r === 1 ? r : qp(n(r), t, i);
}
const Up = (s) => (t) => t <= 0.5 ? s(2 * t) / 2 : (2 - s(2 * (1 - t))) / 2, Kp = (s) => (t) => 1 - s(1 - t), Xp = /* @__PURE__ */ Eo(0.33, 1.53, 0.69, 0.99), _c = /* @__PURE__ */ Kp(Xp), Gp = /* @__PURE__ */ Up(_c), jp = (s) => (s *= 2) < 1 ? 0.5 * _c(s) : 0.5 * (2 - Math.pow(2, -10 * (s - 1))), yc = (s) => 1 - Math.sin(Math.acos(s)), J_ = Kp(yc), Zp = Up(yc), ty = /* @__PURE__ */ Eo(0.42, 0, 1, 1), ey = /* @__PURE__ */ Eo(0, 0, 0.58, 1), Qp = /* @__PURE__ */ Eo(0.42, 0, 0.58, 1), Jp = (s) => Array.isArray(s) && typeof s[0] != "number";
function tm(s, t) {
  return Jp(s) ? s[G_(0, s.length, t)] : s;
}
const em = (s) => Array.isArray(s) && typeof s[0] == "number", ed = {
  linear: ar,
  easeIn: ty,
  easeInOut: Qp,
  easeOut: ey,
  circIn: yc,
  circInOut: Zp,
  circOut: J_,
  backIn: _c,
  backInOut: Gp,
  backOut: Xp,
  anticipate: jp
}, iy = (s) => typeof s == "string", _u = (s) => {
  if (em(s)) {
    rn(s.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, e, i, n] = s;
    return Eo(t, e, i, n);
  } else if (iy(s))
    return rn(ed[s] !== void 0, `Invalid easing type '${s}'`, "invalid-easing-type"), ed[s];
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
function ny(s, t) {
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
    schedule: (h, d = !1, f = !1) => {
      const m = f && n ? e : i;
      return d && o.add(h), m.has(h) || m.add(h), h;
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
const sy = 40;
function im(s, t) {
  let e = !1, i = !0;
  const n = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => e = !0, o = Go.reduce((C, T) => (C[T] = ny(r), C), {}), { setup: a, read: l, resolveKeyframes: c, preUpdate: h, update: d, preRender: f, render: u, postRender: m } = o, p = () => {
    const C = xn.useManualTiming ? n.timestamp : performance.now();
    e = !1, xn.useManualTiming || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(C - n.timestamp, sy), 1)), n.timestamp = C, n.isProcessing = !0, a.process(n), l.process(n), c.process(n), h.process(n), d.process(n), f.process(n), u.process(n), m.process(n), n.isProcessing = !1, e && t && (i = !1, s(p));
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
const { schedule: Tn, cancel: yu, state: ka } = /* @__PURE__ */ im(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ar, !0);
let ua;
function ry() {
  ua = void 0;
}
const Di = {
  now: () => (ua === void 0 && Di.set(ka.isProcessing || xn.useManualTiming ? ka.timestamp : performance.now()), ua),
  set: (s) => {
    ua = s, queueMicrotask(ry);
  }
}, nm = (s) => (t) => typeof t == "string" && t.startsWith(s), sm = /* @__PURE__ */ nm("--"), oy = /* @__PURE__ */ nm("var(--"), vc = (s) => oy(s) ? ay.test(s.split("/*")[0].trim()) : !1, ay = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, lr = {
  test: (s) => typeof s == "number",
  parse: parseFloat,
  transform: (s) => s
}, _o = {
  ...lr,
  transform: (s) => vs(0, 1, s)
}, jo = {
  ...lr,
  default: 1
}, Jr = (s) => Math.round(s * 1e5) / 1e5, bc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ly(s) {
  return s == null;
}
const uy = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, wc = (s, t) => (e) => !!(typeof e == "string" && uy.test(e) && e.startsWith(s) || t && !ly(e) && Object.prototype.hasOwnProperty.call(e, t)), rm = (s, t, e) => (i) => {
  if (typeof i != "string")
    return i;
  const [n, r, o, a] = i.match(bc);
  return {
    [s]: parseFloat(n),
    [t]: parseFloat(r),
    [e]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, cy = (s) => vs(0, 255, s), xl = {
  ...lr,
  transform: (s) => Math.round(cy(s))
}, es = {
  test: /* @__PURE__ */ wc("rgb", "red"),
  parse: /* @__PURE__ */ rm("red", "green", "blue"),
  transform: ({ red: s, green: t, blue: e, alpha: i = 1 }) => "rgba(" + xl.transform(s) + ", " + xl.transform(t) + ", " + xl.transform(e) + ", " + Jr(_o.transform(i)) + ")"
};
function hy(s) {
  let t = "", e = "", i = "", n = "";
  return s.length > 5 ? (t = s.substring(1, 3), e = s.substring(3, 5), i = s.substring(5, 7), n = s.substring(7, 9)) : (t = s.substring(1, 2), e = s.substring(2, 3), i = s.substring(3, 4), n = s.substring(4, 5), t += t, e += e, i += i, n += n), {
    red: parseInt(t, 16),
    green: parseInt(e, 16),
    blue: parseInt(i, 16),
    alpha: n ? parseInt(n, 16) / 255 : 1
  };
}
const vu = {
  test: /* @__PURE__ */ wc("#"),
  parse: hy,
  transform: es.transform
}, Ao = /* @__NO_SIDE_EFFECTS__ */ (s) => ({
  test: (t) => typeof t == "string" && t.endsWith(s) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${s}`
}), Cn = /* @__PURE__ */ Ao("deg"), Qs = /* @__PURE__ */ Ao("%"), ht = /* @__PURE__ */ Ao("px"), dy = /* @__PURE__ */ Ao("vh"), fy = /* @__PURE__ */ Ao("vw"), id = {
  ...Qs,
  parse: (s) => Qs.parse(s) / 100,
  transform: (s) => Qs.transform(s * 100)
}, $s = {
  test: /* @__PURE__ */ wc("hsl", "hue"),
  parse: /* @__PURE__ */ rm("hue", "saturation", "lightness"),
  transform: ({ hue: s, saturation: t, lightness: e, alpha: i = 1 }) => "hsla(" + Math.round(s) + ", " + Qs.transform(Jr(t)) + ", " + Qs.transform(Jr(e)) + ", " + Jr(_o.transform(i)) + ")"
}, ge = {
  test: (s) => es.test(s) || vu.test(s) || $s.test(s),
  parse: (s) => es.test(s) ? es.parse(s) : $s.test(s) ? $s.parse(s) : vu.parse(s),
  transform: (s) => typeof s == "string" ? s : s.hasOwnProperty("red") ? es.transform(s) : $s.transform(s),
  getAnimatableNone: (s) => {
    const t = ge.parse(s);
    return t.alpha = 0, ge.transform(t);
  }
}, py = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function my(s) {
  var t, e;
  return isNaN(s) && typeof s == "string" && (((t = s.match(bc)) == null ? void 0 : t.length) || 0) + (((e = s.match(py)) == null ? void 0 : e.length) || 0) > 0;
}
const om = "number", am = "color", gy = "var", _y = "var(", nd = "${}", yy = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function yo(s) {
  const t = s.toString(), e = [], i = {
    color: [],
    number: [],
    var: []
  }, n = [];
  let r = 0;
  const a = t.replace(yy, (l) => (ge.test(l) ? (i.color.push(r), n.push(am), e.push(ge.parse(l))) : l.startsWith(_y) ? (i.var.push(r), n.push(gy), e.push(l)) : (i.number.push(r), n.push(om), e.push(parseFloat(l))), ++r, nd)).split(nd);
  return { values: e, split: a, indexes: i, types: n };
}
function lm(s) {
  return yo(s).values;
}
function um(s) {
  const { split: t, types: e } = yo(s), i = t.length;
  return (n) => {
    let r = "";
    for (let o = 0; o < i; o++)
      if (r += t[o], n[o] !== void 0) {
        const a = e[o];
        a === om ? r += Jr(n[o]) : a === am ? r += ge.transform(n[o]) : r += n[o];
      }
    return r;
  };
}
const vy = (s) => typeof s == "number" ? 0 : ge.test(s) ? ge.getAnimatableNone(s) : s;
function by(s) {
  const t = lm(s);
  return um(s)(t.map(vy));
}
const ur = {
  test: my,
  parse: lm,
  createTransformer: um,
  getAnimatableNone: by
};
function Tl(s, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? s + (t - s) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? s + (t - s) * (2 / 3 - e) * 6 : s;
}
function wy({ hue: s, saturation: t, lightness: e, alpha: i }) {
  s /= 360, t /= 100, e /= 100;
  let n = 0, r = 0, o = 0;
  if (!t)
    n = r = o = e;
  else {
    const a = e < 0.5 ? e * (1 + t) : e + t - e * t, l = 2 * e - a;
    n = Tl(l, a, s + 1 / 3), r = Tl(l, a, s), o = Tl(l, a, s - 1 / 3);
  }
  return {
    red: Math.round(n * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function Ma(s, t) {
  return (e) => e > 0 ? t : s;
}
const Co = (s, t, e) => s + (t - s) * e, Sl = (s, t, e) => {
  const i = s * s, n = e * (t * t - i) + i;
  return n < 0 ? 0 : Math.sqrt(n);
}, xy = [vu, es, $s], Ty = (s) => xy.find((t) => t.test(s));
function sd(s) {
  const t = Ty(s);
  if (So(!!t, `'${s}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let e = t.parse(s);
  return t === $s && (e = wy(e)), e;
}
const rd = (s, t) => {
  const e = sd(s), i = sd(t);
  if (!e || !i)
    return Ma(s, t);
  const n = { ...e };
  return (r) => (n.red = Sl(e.red, i.red, r), n.green = Sl(e.green, i.green, r), n.blue = Sl(e.blue, i.blue, r), n.alpha = Co(e.alpha, i.alpha, r), es.transform(n));
}, bu = /* @__PURE__ */ new Set(["none", "hidden"]);
function Sy(s, t) {
  return bu.has(s) ? (e) => e <= 0 ? s : t : (e) => e >= 1 ? t : s;
}
function Ey(s, t) {
  return (e) => Co(s, t, e);
}
function xc(s) {
  return typeof s == "number" ? Ey : typeof s == "string" ? vc(s) ? Ma : ge.test(s) ? rd : Py : Array.isArray(s) ? cm : typeof s == "object" ? ge.test(s) ? rd : Ay : Ma;
}
function cm(s, t) {
  const e = [...s], i = e.length, n = s.map((r, o) => xc(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      e[o] = n[o](r);
    return e;
  };
}
function Ay(s, t) {
  const e = { ...s, ...t }, i = {};
  for (const n in e)
    s[n] !== void 0 && t[n] !== void 0 && (i[n] = xc(s[n])(s[n], t[n]));
  return (n) => {
    for (const r in i)
      e[r] = i[r](n);
    return e;
  };
}
function Cy(s, t) {
  const e = [], i = { color: 0, var: 0, number: 0 };
  for (let n = 0; n < t.values.length; n++) {
    const r = t.types[n], o = s.indexes[r][i[r]], a = s.values[o] ?? 0;
    e[n] = a, i[r]++;
  }
  return e;
}
const Py = (s, t) => {
  const e = ur.createTransformer(t), i = yo(s), n = yo(t);
  return i.indexes.var.length === n.indexes.var.length && i.indexes.color.length === n.indexes.color.length && i.indexes.number.length >= n.indexes.number.length ? bu.has(s) && !n.values.length || bu.has(t) && !i.values.length ? Sy(s, t) : mc(cm(Cy(i, n), n.values), e) : (So(!0, `Complex values '${s}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ma(s, t));
};
function hm(s, t, e) {
  return typeof s == "number" && typeof t == "number" && typeof e == "number" ? Co(s, t, e) : xc(s)(s, t);
}
const Oy = (s) => {
  const t = ({ timestamp: e }) => s(e);
  return {
    start: (e = !0) => Tn.update(t, e),
    stop: () => yu(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => ka.isProcessing ? ka.timestamp : Di.now()
  };
}, dm = (s, t, e = 10) => {
  let i = "";
  const n = Math.max(Math.round(t / e), 2);
  for (let r = 0; r < n; r++)
    i += Math.round(s(r / (n - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Ia = 2e4;
function Tc(s) {
  let t = 0;
  const e = 50;
  let i = s.next(t);
  for (; !i.done && t < Ia; )
    t += e, i = s.next(t);
  return t >= Ia ? 1 / 0 : t;
}
function fm(s, t = 100, e) {
  const i = e({ ...s, keyframes: [0, t] }), n = Math.min(Tc(i), Ia);
  return {
    type: "keyframes",
    ease: (r) => i.next(n * r).value / t,
    duration: /* @__PURE__ */ Hi(n)
  };
}
const ky = 5;
function pm(s, t, e) {
  const i = Math.max(t - ky, 0);
  return Yp(e - s(i), t - i);
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
}, od = 1e-3;
function My({ duration: s = Jt.duration, bounce: t = Jt.bounce, velocity: e = Jt.velocity, mass: i = Jt.mass }) {
  let n, r;
  So(s <= /* @__PURE__ */ Wi(Jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = vs(Jt.minDamping, Jt.maxDamping, o), s = vs(Jt.minDuration, Jt.maxDuration, /* @__PURE__ */ Hi(s)), o < 1 ? (n = (c) => {
    const h = c * o, d = h * s, f = h - e, u = wu(c, o), m = Math.exp(-d);
    return od - f / u * m;
  }, r = (c) => {
    const d = c * o * s, f = d * e + e, u = Math.pow(o, 2) * Math.pow(c, 2) * s, m = Math.exp(-d), p = wu(Math.pow(c, 2), o);
    return (-n(c) + od > 0 ? -1 : 1) * ((f - u) * m) / p;
  }) : (n = (c) => {
    const h = Math.exp(-c * s), d = (c - e) * s + 1;
    return -1e-3 + h * d;
  }, r = (c) => {
    const h = Math.exp(-c * s), d = (e - c) * (s * s);
    return h * d;
  });
  const a = 5 / s, l = Dy(n, r, a);
  if (s = /* @__PURE__ */ Wi(s), isNaN(l))
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
const Iy = 12;
function Dy(s, t, e) {
  let i = e;
  for (let n = 1; n < Iy; n++)
    i = i - s(i) / t(i);
  return i;
}
function wu(s, t) {
  return s * Math.sqrt(1 - t * t);
}
const Ly = ["duration", "bounce"], Ry = ["stiffness", "damping", "mass"];
function ad(s, t) {
  return t.some((e) => s[e] !== void 0);
}
function Fy(s) {
  let t = {
    velocity: Jt.velocity,
    stiffness: Jt.stiffness,
    damping: Jt.damping,
    mass: Jt.mass,
    isResolvedFromDuration: !1,
    ...s
  };
  if (!ad(s, Ry) && ad(s, Ly))
    if (s.visualDuration) {
      const e = s.visualDuration, i = 2 * Math.PI / (e * 1.2), n = i * i, r = 2 * vs(0.05, 1, 1 - (s.bounce || 0)) * Math.sqrt(n);
      t = {
        ...t,
        mass: Jt.mass,
        stiffness: n,
        damping: r
      };
    } else {
      const e = My(s);
      t = {
        ...t,
        ...e,
        mass: Jt.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function vo(s = Jt.visualDuration, t = Jt.bounce) {
  const e = typeof s != "object" ? {
    visualDuration: s,
    keyframes: [0, 1],
    bounce: t
  } : s;
  let { restSpeed: i, restDelta: n } = e;
  const r = e.keyframes[0], o = e.keyframes[e.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: h, duration: d, velocity: f, isResolvedFromDuration: u } = Fy({
    ...e,
    velocity: -/* @__PURE__ */ Hi(e.velocity || 0)
  }), m = f || 0, p = c / (2 * Math.sqrt(l * h)), _ = o - r, b = /* @__PURE__ */ Hi(Math.sqrt(l / h)), A = Math.abs(_) < 5;
  i || (i = A ? Jt.restSpeed.granular : Jt.restSpeed.default), n || (n = A ? Jt.restDelta.granular : Jt.restDelta.default);
  let C;
  if (p < 1) {
    const y = wu(b, p);
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
    calculatedDuration: u && d || null,
    next: (y) => {
      const O = C(y);
      if (u)
        a.done = y >= d;
      else {
        let P = y === 0 ? m : 0;
        p < 1 && (P = y === 0 ? /* @__PURE__ */ Wi(m) : pm(C, y, O));
        const S = Math.abs(P) <= i, k = Math.abs(o - O) <= n;
        a.done = S && k;
      }
      return a.value = a.done ? o : O, a;
    },
    toString: () => {
      const y = Math.min(Tc(T), Ia), O = dm((P) => T.next(y * P).value, y, 30);
      return y + "ms " + O;
    },
    toTransition: () => {
    }
  };
  return T;
}
vo.applyToOptions = (s) => {
  const t = fm(s, 100, vo);
  return s.ease = t.ease, s.duration = /* @__PURE__ */ Wi(t.duration), s.type = "keyframes", s;
};
function xu({ keyframes: s, velocity: t = 0, power: e = 0.8, timeConstant: i = 325, bounceDamping: n = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: h }) {
  const d = s[0], f = {
    done: !1,
    value: d
  }, u = (S) => a !== void 0 && S < a || l !== void 0 && S > l, m = (S) => a === void 0 ? l : l === void 0 || Math.abs(a - S) < Math.abs(l - S) ? a : l;
  let p = e * t;
  const _ = d + p, b = o === void 0 ? _ : o(_);
  b !== _ && (p = b - d);
  const A = (S) => -p * Math.exp(-S / i), C = (S) => b + A(S), T = (S) => {
    const k = A(S), R = C(S);
    f.done = Math.abs(k) <= c, f.value = f.done ? b : R;
  };
  let y, O;
  const P = (S) => {
    u(f.value) && (y = S, O = vo({
      keyframes: [f.value, m(f.value)],
      velocity: pm(C, S, f.value),
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
      return !O && y === void 0 && (k = !0, T(S), P(S)), y !== void 0 && S >= y ? O.next(S - y) : (!k && T(S), f);
    }
  };
}
function zy(s, t, e) {
  const i = [], n = e || xn.mix || hm, r = s.length - 1;
  for (let o = 0; o < r; o++) {
    let a = n(s[o], s[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || ar : t;
      a = mc(l, a);
    }
    i.push(a);
  }
  return i;
}
function Ny(s, t, { clamp: e = !0, ease: i, mixer: n } = {}) {
  const r = s.length;
  if (rn(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = s[0] === s[1];
  s[0] > s[r - 1] && (s = [...s].reverse(), t = [...t].reverse());
  const a = zy(t, i, n), l = a.length, c = (h) => {
    if (o && h < s[0])
      return t[0];
    let d = 0;
    if (l > 1)
      for (; d < s.length - 2 && !(h < s[d + 1]); d++)
        ;
    const f = /* @__PURE__ */ gc(s[d], s[d + 1], h);
    return a[d](f);
  };
  return e ? (h) => c(vs(s[0], s[r - 1], h)) : c;
}
function mm(s, t) {
  const e = s[s.length - 1];
  for (let i = 1; i <= t; i++) {
    const n = /* @__PURE__ */ gc(0, t, i);
    s.push(Co(e, 1, n));
  }
}
function gm(s) {
  const t = [0];
  return mm(t, s.length - 1), t;
}
function $y(s, t) {
  return s.map((e) => e * t);
}
function By(s, t) {
  return s.map(() => t || Qp).splice(0, s.length - 1);
}
function Bs({ duration: s = 300, keyframes: t, times: e, ease: i = "easeInOut" }) {
  const n = Jp(i) ? i.map(_u) : _u(i), r = {
    done: !1,
    value: t[0]
  }, o = $y(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    e && e.length === t.length ? e : gm(t),
    s
  ), a = Ny(o, t, {
    ease: Array.isArray(n) ? n : By(t, n)
  });
  return {
    calculatedDuration: s,
    next: (l) => (r.value = a(l), r.done = l >= s, r)
  };
}
const Vy = (s) => s !== null;
function Sc(s, { repeat: t, repeatType: e = "loop" }, i, n = 1) {
  const r = s.filter(Vy), a = n < 0 || t && e !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Hy = {
  decay: xu,
  inertia: xu,
  tween: Bs,
  keyframes: Bs,
  spring: vo
};
function _m(s) {
  typeof s.type == "string" && (s.type = Hy[s.type]);
}
class Ec {
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
const Yy = (s) => s / 100;
class Ac extends Ec {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var i, n;
      const { motionValue: e } = this.options;
      e && e.updatedAt !== Di.now() && this.tick(Di.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (n = (i = this.options).onStop) == null || n.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    _m(t);
    const { type: e = Bs, repeat: i = 0, repeatDelay: n = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = e || Bs;
    process.env.NODE_ENV !== "production" && l !== Bs && rn(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== Bs && typeof a[0] != "number" && (this.mixKeyframes = mc(Yy, hm(a[0], a[1])), a = [0, 100]);
    const c = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = Tc(c));
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
    const { delay: c = 0, keyframes: h, repeat: d, repeatType: f, repeatDelay: u, type: m, onUpdate: p, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
    const b = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? b < 0 : b > n;
    this.currentTime = Math.max(b, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = n);
    let C = this.currentTime, T = i;
    if (d) {
      const S = Math.min(this.currentTime, n) / a;
      let k = Math.floor(S), R = S % 1;
      !R && S >= 1 && (R = 1), R === 1 && k--, k = Math.min(k, d + 1), !!(k % 2) && (f === "reverse" ? (R = 1 - R, u && (R -= u / a)) : f === "mirror" && (T = o)), C = vs(0, 1, R) * a;
    }
    const y = A ? { done: !1, value: h[0] } : T.next(C);
    r && (y.value = r(y.value));
    let { done: O } = y;
    !A && l !== null && (O = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
    const P = this.holdTime === null && (this.state === "finished" || this.state === "running" && O);
    return P && m !== xu && (y.value = Sc(h, this.options, _, this.speed)), p && p(y.value), P && this.finish(), y;
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
    return /* @__PURE__ */ Hi(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Hi(t);
  }
  get time() {
    return /* @__PURE__ */ Hi(this.currentTime);
  }
  set time(t) {
    var e;
    t = /* @__PURE__ */ Wi(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (e = this.driver) == null || e.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(Di.now());
    const e = this.playbackSpeed !== t;
    this.playbackSpeed = t, e && (this.time = /* @__PURE__ */ Hi(this.currentTime));
  }
  play() {
    var n, r;
    if (this.isStopped)
      return;
    const { driver: t = Oy, startTime: e } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (n = this.options).onPlay) == null || r.call(n);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = e ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Di.now()), this.holdTime = this.currentTime;
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
function Wy(s) {
  for (let t = 1; t < s.length; t++)
    s[t] ?? (s[t] = s[t - 1]);
}
const is = (s) => s * 180 / Math.PI, Tu = (s) => {
  const t = is(Math.atan2(s[1], s[0]));
  return Su(t);
}, qy = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (s) => (Math.abs(s[0]) + Math.abs(s[3])) / 2,
  rotate: Tu,
  rotateZ: Tu,
  skewX: (s) => is(Math.atan(s[1])),
  skewY: (s) => is(Math.atan(s[2])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[2])) / 2
}, Su = (s) => (s = s % 360, s < 0 && (s += 360), s), ld = Tu, ud = (s) => Math.sqrt(s[0] * s[0] + s[1] * s[1]), cd = (s) => Math.sqrt(s[4] * s[4] + s[5] * s[5]), Uy = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ud,
  scaleY: cd,
  scale: (s) => (ud(s) + cd(s)) / 2,
  rotateX: (s) => Su(is(Math.atan2(s[6], s[5]))),
  rotateY: (s) => Su(is(Math.atan2(-s[2], s[0]))),
  rotateZ: ld,
  rotate: ld,
  skewX: (s) => is(Math.atan(s[4])),
  skewY: (s) => is(Math.atan(s[1])),
  skew: (s) => (Math.abs(s[1]) + Math.abs(s[4])) / 2
};
function Eu(s) {
  return s.includes("scale") ? 1 : 0;
}
function Au(s, t) {
  if (!s || s === "none")
    return Eu(t);
  const e = s.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, n;
  if (e)
    i = Uy, n = e;
  else {
    const a = s.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = qy, n = a;
  }
  if (!n)
    return Eu(t);
  const r = i[t], o = n[1].split(",").map(Xy);
  return typeof r == "function" ? r(o) : o[r];
}
const Ky = (s, t) => {
  const { transform: e = "none" } = getComputedStyle(s);
  return Au(e, t);
};
function Xy(s) {
  return parseFloat(s.trim());
}
const cr = [
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
], hr = new Set(cr), hd = (s) => s === lr || s === ht, Gy = /* @__PURE__ */ new Set(["x", "y", "z"]), jy = cr.filter((s) => !Gy.has(s));
function Zy(s) {
  const t = [];
  return jy.forEach((e) => {
    const i = s.getValue(e);
    i !== void 0 && (t.push([e, i.get()]), i.set(e.startsWith("scale") ? 1 : 0));
  }), t;
}
const ds = {
  // Dimensions
  width: ({ x: s }, { paddingLeft: t = "0", paddingRight: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  height: ({ y: s }, { paddingTop: t = "0", paddingBottom: e = "0" }) => s.max - s.min - parseFloat(t) - parseFloat(e),
  top: (s, { top: t }) => parseFloat(t),
  left: (s, { left: t }) => parseFloat(t),
  bottom: ({ y: s }, { top: t }) => parseFloat(t) + (s.max - s.min),
  right: ({ x: s }, { left: t }) => parseFloat(t) + (s.max - s.min),
  // Transform
  x: (s, { transform: t }) => Au(t, "x"),
  y: (s, { transform: t }) => Au(t, "y")
};
ds.translateX = ds.x;
ds.translateY = ds.y;
const fs = /* @__PURE__ */ new Set();
let Cu = !1, Pu = !1, Ou = !1;
function ym() {
  if (Pu) {
    const s = Array.from(fs).filter((i) => i.needsMeasurement), t = new Set(s.map((i) => i.element)), e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const n = Zy(i);
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
  Pu = !1, Cu = !1, fs.forEach((s) => s.complete(Ou)), fs.clear();
}
function vm() {
  fs.forEach((s) => {
    s.readKeyframes(), s.needsMeasurement && (Pu = !0);
  });
}
function Qy() {
  Ou = !0, vm(), ym(), Ou = !1;
}
class Cc {
  constructor(t, e, i, n, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = i, this.motionValue = n, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (fs.add(this), Cu || (Cu = !0, Tn.read(vm), Tn.resolveKeyframes(ym))) : (this.readKeyframes(), this.complete());
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
    Wy(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), fs.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (fs.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Jy = (s) => s.startsWith("--");
function tv(s, t, e) {
  Jy(t) ? s.style.setProperty(t, e) : s.style[t] = e;
}
const ev = /* @__PURE__ */ pc(() => window.ScrollTimeline !== void 0), iv = {};
function nv(s, t) {
  const e = /* @__PURE__ */ pc(s);
  return () => iv[t] ?? e();
}
const bm = /* @__PURE__ */ nv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Lr = ([s, t, e, i]) => `cubic-bezier(${s}, ${t}, ${e}, ${i})`, dd = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Lr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Lr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Lr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Lr([0.33, 1.53, 0.69, 0.99])
};
function wm(s, t) {
  if (s)
    return typeof s == "function" ? bm() ? dm(s, t) : "ease-out" : em(s) ? Lr(s) : Array.isArray(s) ? s.map((e) => wm(e, t) || dd.easeOut) : dd[s];
}
function sv(s, t, e, { delay: i = 0, duration: n = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, c = void 0) {
  const h = {
    [t]: e
  };
  l && (h.offset = l);
  const d = wm(a, n);
  Array.isArray(d) && (h.easing = d);
  const f = {
    delay: i,
    duration: n,
    easing: Array.isArray(d) ? "linear" : d,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return c && (f.pseudoElement = c), s.animate(h, f);
}
function Pc(s) {
  return typeof s == "function" && "applyToOptions" in s;
}
function rv({ type: s, ...t }) {
  return Pc(s) && bm() ? s.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class ov extends Ec {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: e, name: i, keyframes: n, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, rn(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = rv(t);
    this.animation = sv(e, i, n, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const h = Sc(n, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(h) : tv(e, i, h), this.animation.cancel();
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
    return /* @__PURE__ */ Hi(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Hi(t);
  }
  get time() {
    return /* @__PURE__ */ Hi(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Wi(t);
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
    return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && ev() ? (this.animation.timeline = t, ar) : e(this);
  }
}
const xm = {
  anticipate: jp,
  backInOut: Gp,
  circInOut: Zp
};
function av(s) {
  return s in xm;
}
function lv(s) {
  typeof s.ease == "string" && av(s.ease) && (s.ease = xm[s.ease]);
}
const fd = 10;
class uv extends ov {
  constructor(t) {
    lv(t), _m(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
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
    const a = new Ac({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ Wi(this.finishedTime ?? this.time);
    e.setWithVelocity(a.sample(l - fd).value, a.sample(l).value, fd), a.stop();
  }
}
const pd = (s, t) => t === "zIndex" ? !1 : !!(typeof s == "number" || Array.isArray(s) || typeof s == "string" && // It's animatable if we have a string
(ur.test(s) || s === "0") && // And it contains numbers and/or colors
!s.startsWith("url("));
function cv(s) {
  const t = s[0];
  if (s.length === 1)
    return !0;
  for (let e = 0; e < s.length; e++)
    if (s[e] !== t)
      return !0;
}
function hv(s, t, e, i) {
  const n = s[0];
  if (n === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = s[s.length - 1], o = pd(n, t), a = pd(r, t);
  return So(o === a, `You are trying to animate ${t} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : cv(s) || (e === "spring" || Pc(e)) && i;
}
function ku(s) {
  s.duration = 0, s.type = "keyframes";
}
const dv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), fv = /* @__PURE__ */ pc(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function pv(s) {
  var h;
  const { motionValue: t, name: e, repeatDelay: i, repeatType: n, damping: r, type: o } = s;
  if (!(((h = t == null ? void 0 : t.owner) == null ? void 0 : h.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: c } = t.owner.getProps();
  return fv() && e && dv.has(e) && (e !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && n !== "mirror" && r !== 0 && o !== "inertia";
}
const mv = 40;
class gv extends Ec {
  constructor({ autoplay: t = !0, delay: e = 0, type: i = "keyframes", repeat: n = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: c, element: h, ...d }) {
    var m;
    super(), this.stop = () => {
      var p, _;
      this._animation && (this._animation.stop(), (p = this.stopTimeline) == null || p.call(this)), (_ = this.keyframeResolver) == null || _.cancel();
    }, this.createdAt = Di.now();
    const f = {
      autoplay: t,
      delay: e,
      type: i,
      repeat: n,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: c,
      element: h,
      ...d
    }, u = (h == null ? void 0 : h.KeyframeResolver) || Cc;
    this.keyframeResolver = new u(a, (p, _, b) => this.onKeyframesResolved(p, _, f, !b), l, c, h), (m = this.keyframeResolver) == null || m.scheduleResolve();
  }
  onKeyframesResolved(t, e, i, n) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: c, onUpdate: h } = i;
    this.resolvedAt = Di.now(), hv(t, r, o, a) || ((xn.instantAnimations || !l) && (h == null || h(Sc(t, i, e))), t[0] = t[t.length - 1], ku(i), i.repeat = 0);
    const f = {
      startTime: n ? this.resolvedAt ? this.resolvedAt - this.createdAt > mv ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: e,
      ...i,
      keyframes: t
    }, u = !c && pv(f) ? new uv({
      ...f,
      element: f.motionValue.owner.current
    }) : new Ac(f);
    u.finished.then(() => this.notifyFinished()).catch(ar), this.pendingTimeline && (this.stopTimeline = u.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = u;
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
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), Qy()), this._animation;
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
class _v {
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
    return md(this.animations, "duration");
  }
  get iterationDuration() {
    return md(this.animations, "iterationDuration");
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
function md(s, t) {
  let e = 0;
  for (let i = 0; i < s.length; i++) {
    const n = s[i][t];
    n !== null && n > e && (e = n);
  }
  return e;
}
class yv extends _v {
  then(t, e) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const vv = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function bv(s) {
  const t = vv.exec(s);
  if (!t)
    return [,];
  const [, e, i, n] = t;
  return [`--${e ?? i}`, n];
}
const wv = 4;
function Tm(s, t, e = 1) {
  rn(e <= wv, `Max CSS variable fallback depth detected in property "${s}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, n] = bv(s);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return Bp(o) ? parseFloat(o) : o;
  }
  return vc(n) ? Tm(n, t, e + 1) : n;
}
function Sm(s, t) {
  return (s == null ? void 0 : s[t]) ?? (s == null ? void 0 : s.default) ?? s;
}
const Em = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...cr
]), xv = {
  test: (s) => s === "auto",
  parse: (s) => s
}, Am = (s) => (t) => t.test(s), Cm = [lr, ht, Qs, Cn, fy, dy, xv], gd = (s) => Cm.find(Am(s));
function Tv(s) {
  return typeof s == "number" ? s === 0 : s !== null ? s === "none" || s === "0" || Vp(s) : !0;
}
const Sv = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Ev(s) {
  const [t, e] = s.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return s;
  const [i] = e.match(bc) || [];
  if (!i)
    return s;
  const n = e.replace(i, "");
  let r = Sv.has(t) ? 1 : 0;
  return i !== e && (r *= 100), t + "(" + r + n + ")";
}
const Av = /\b([a-z-]*)\(.*?\)/gu, Mu = {
  ...ur,
  getAnimatableNone: (s) => {
    const t = s.match(Av);
    return t ? t.map(Ev).join(" ") : s;
  }
}, _d = {
  ...lr,
  transform: Math.round
}, Cv = {
  rotate: Cn,
  rotateX: Cn,
  rotateY: Cn,
  rotateZ: Cn,
  scale: jo,
  scaleX: jo,
  scaleY: jo,
  scaleZ: jo,
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
  opacity: _o,
  originX: id,
  originY: id,
  originZ: ht
}, Oc = {
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
  ...Cv,
  zIndex: _d,
  // SVG
  fillOpacity: _o,
  strokeOpacity: _o,
  numOctaves: _d
}, Pv = {
  ...Oc,
  // Color props
  color: ge,
  backgroundColor: ge,
  outlineColor: ge,
  fill: ge,
  stroke: ge,
  // Border props
  borderColor: ge,
  borderTopColor: ge,
  borderRightColor: ge,
  borderBottomColor: ge,
  borderLeftColor: ge,
  filter: Mu,
  WebkitFilter: Mu
}, Pm = (s) => Pv[s];
function Om(s, t) {
  let e = Pm(s);
  return e !== Mu && (e = ur), e.getAnimatableNone ? e.getAnimatableNone(t) : void 0;
}
const Ov = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function kv(s, t, e) {
  let i = 0, n;
  for (; i < s.length && !n; ) {
    const r = s[i];
    typeof r == "string" && !Ov.has(r) && yo(r).values.length && (n = s[i]), i++;
  }
  if (n && e)
    for (const r of t)
      s[r] = Om(e, n);
}
class Mv extends Cc {
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
      if (typeof c == "string" && (c = c.trim(), vc(c))) {
        const h = Tm(c, e.current);
        h !== void 0 && (t[l] = h), l === t.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Em.has(i) || t.length !== 2)
      return;
    const [n, r] = t, o = gd(n), a = gd(r);
    if (o !== a)
      if (hd(o) && hd(a))
        for (let l = 0; l < t.length; l++) {
          const c = t[l];
          typeof c == "string" && (t[l] = parseFloat(c));
        }
      else ds[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: e } = this, i = [];
    for (let n = 0; n < t.length; n++)
      (t[n] === null || Tv(t[n])) && i.push(n);
    i.length && kv(t, i, e);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: e, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ds[i](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
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
    i[r] = ds[e](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, c]) => {
      t.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
function Iv(s, t, e) {
  if (s instanceof EventTarget)
    return [s];
  if (typeof s == "string") {
    let i = document;
    const n = (e == null ? void 0 : e[s]) ?? i.querySelectorAll(s);
    return n ? Array.from(n) : [];
  }
  return Array.from(s);
}
const km = (s, t) => t && typeof s == "number" ? t.transform(s) : s, yd = 30, Dv = (s) => !isNaN(parseFloat(s));
class Lv {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, e = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const n = Di.now();
      if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Di.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Dv(this.current));
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
    return process.env.NODE_ENV !== "production" && Wp(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new Hp());
    const i = this.events[t].add(e);
    return t === "change" ? () => {
      i(), Tn.read(() => {
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
    const t = Di.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > yd)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, yd);
    return Yp(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
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
function bo(s, t) {
  return new Lv(s, t);
}
const { schedule: Rv } = /* @__PURE__ */ im(queueMicrotask, !1);
function Mm(s) {
  return K_(s) && "ownerSVGElement" in s;
}
function Fv(s) {
  return Mm(s) && s.tagName === "svg";
}
function zv(s, t) {
  if (s === "first")
    return 0;
  {
    const e = t - 1;
    return s === "last" ? e : e / 2;
  }
}
function Im(s = 0.1, { startDelay: t = 0, from: e = 0, ease: i } = {}) {
  return (n, r) => {
    const o = typeof e == "number" ? e : zv(e, r), a = Math.abs(o - n);
    let l = s * a;
    if (i) {
      const c = r * s;
      l = _u(i)(l / c) * c;
    }
    return t + l;
  };
}
const si = (s) => !!(s && s.getVelocity), Nv = [...Cm, ge, ur], $v = (s) => Nv.find(Am(s));
function kc(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function Dm(s, t, e, i) {
  return typeof s == "string" && kc(t) ? Iv(s, e, i) : s instanceof NodeList ? Array.from(s) : Array.isArray(s) ? s : [s];
}
function Bv(s, t, e) {
  return s * (t + 1);
}
function vd(s, t, e, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, s + parseFloat(t)) : t === "<" ? e : t.startsWith("<") ? Math.max(0, e + parseFloat(t.slice(1))) : i.get(t) ?? s;
}
function Vv(s, t, e) {
  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    n.at > t && n.at < e && ($p(s, n), i--);
  }
}
function Hv(s, t, e, i, n, r) {
  Vv(s, n, r);
  for (let o = 0; o < t.length; o++)
    s.push({
      value: t[o],
      at: Co(n, r, i[o]),
      easing: tm(e, o)
    });
}
function Yv(s, t) {
  for (let e = 0; e < s.length; e++)
    s[e] = s[e] / (t + 1);
}
function Wv(s, t) {
  return s.at === t.at ? s.value === null ? 1 : t.value === null ? -1 : 0 : s.at - t.at;
}
const qv = "easeInOut", Uv = 20;
function Kv(s, { defaultTransition: t = {}, ...e } = {}, i, n) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let h = 0, d = 0, f = 0;
  for (let u = 0; u < s.length; u++) {
    const m = s[u];
    if (typeof m == "string") {
      c.set(m, d);
      continue;
    } else if (!Array.isArray(m)) {
      c.set(m.name, vd(d, m.at, h, c));
      continue;
    }
    let [p, _, b = {}] = m;
    b.at !== void 0 && (d = vd(d, b.at, h, c));
    let A = 0;
    const C = (T, y, O, P = 0, S = 0) => {
      const k = Xv(T), { delay: R = 0, times: V = gm(k), type: F = "keyframes", repeat: B, repeatType: J, repeatDelay: it = 0, ...q } = y;
      let { ease: H = t.ease || "easeOut", duration: tt } = y;
      const ot = typeof R == "function" ? R(P, S) : R, w = k.length, G = Pc(F) ? F : n == null ? void 0 : n[F || "keyframes"];
      if (w <= 2 && G) {
        let It = 100;
        if (w === 2 && Zv(k)) {
          const lt = k[1] - k[0];
          It = Math.abs(lt);
        }
        const gt = { ...q };
        tt !== void 0 && (gt.duration = /* @__PURE__ */ Wi(tt));
        const At = fm(gt, It, G);
        H = At.ease, tt = At.duration;
      }
      tt ?? (tt = r);
      const nt = d + ot;
      V.length === 1 && V[0] === 0 && (V[1] = 1);
      const U = V.length - k.length;
      if (U > 0 && mm(V, U), k.length === 1 && k.unshift(null), B) {
        rn(B < Uv, "Repeat count too high, must be less than 20", "repeat-count-high"), tt = Bv(tt, B);
        const It = [...k], gt = [...V];
        H = Array.isArray(H) ? [...H] : [H];
        const At = [...H];
        for (let lt = 0; lt < B; lt++) {
          k.push(...It);
          for (let Lt = 0; Lt < It.length; Lt++)
            V.push(gt[Lt] + (lt + 1)), H.push(Lt === 0 ? "linear" : tm(At, Lt - 1));
        }
        Yv(V, B);
      }
      const rt = nt + tt;
      Hv(O, k, H, V, nt, rt), A = Math.max(ot + tt, A), f = Math.max(rt, f);
    };
    if (si(p)) {
      const T = bd(p, a);
      C(_, b, wd("default", T));
    } else {
      const T = Dm(p, _, i, l), y = T.length;
      for (let O = 0; O < y; O++) {
        _ = _, b = b;
        const P = T[O], S = bd(P, a);
        for (const k in _)
          C(_[k], Gv(b, k), wd(k, S), O, y);
      }
    }
    h = d, d += A;
  }
  return a.forEach((u, m) => {
    for (const p in u) {
      const _ = u[p];
      _.sort(Wv);
      const b = [], A = [], C = [];
      for (let y = 0; y < _.length; y++) {
        const { at: O, value: P, easing: S } = _[y];
        b.push(P), A.push(/* @__PURE__ */ gc(0, f, O)), C.push(S || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), b.unshift(b[0]), C.unshift(qv)), A[A.length - 1] !== 1 && (A.push(1), b.push(null)), o.has(m) || o.set(m, {
        keyframes: {},
        transition: {}
      });
      const T = o.get(m);
      T.keyframes[p] = b, T.transition[p] = {
        ...t,
        duration: f,
        ease: C,
        times: A,
        ...e
      };
    }
  }), o;
}
function bd(s, t) {
  return !t.has(s) && t.set(s, {}), t.get(s);
}
function wd(s, t) {
  return t[s] || (t[s] = []), t[s];
}
function Xv(s) {
  return Array.isArray(s) ? s : [s];
}
function Gv(s, t) {
  return s && s[t] ? {
    ...s,
    ...s[t]
  } : { ...s };
}
const jv = (s) => typeof s == "number", Zv = (s) => s.every(jv), wo = /* @__PURE__ */ new WeakMap(), Qv = (s) => Array.isArray(s);
function xd(s) {
  const t = [{}, {}];
  return s == null || s.values.forEach((e, i) => {
    t[0][i] = e.get(), t[1][i] = e.getVelocity();
  }), t;
}
function Lm(s, t, e, i) {
  if (typeof t == "function") {
    const [n, r] = xd(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  if (typeof t == "string" && (t = s.variants && s.variants[t]), typeof t == "function") {
    const [n, r] = xd(i);
    t = t(e !== void 0 ? e : s.custom, n, r);
  }
  return t;
}
function Jv(s, t, e) {
  const i = s.getProps();
  return Lm(i, t, i.custom, s);
}
function tb(s, t, e) {
  s.hasValue(t) ? s.getValue(t).set(e) : s.addValue(t, bo(e));
}
function eb(s) {
  return Qv(s) ? s[s.length - 1] || 0 : s;
}
function ib(s, t) {
  const e = Jv(s, t);
  let { transitionEnd: i = {}, transition: n = {}, ...r } = e || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = eb(r[o]);
    tb(s, o, a);
  }
}
function nb(s) {
  return !!(si(s) && s.add);
}
function sb(s, t) {
  const e = s.getValue("willChange");
  if (nb(e))
    return e.add(t);
  if (!e && xn.WillChange) {
    const i = new xn.WillChange("auto");
    s.addValue("willChange", i), i.add(t);
  }
}
const Mc = (s) => s.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), rb = "framerAppearId", ob = "data-" + Mc(rb);
function ab(s) {
  return s.props[ob];
}
const lb = (s) => s !== null;
function ub(s, { repeat: t, repeatType: e = "loop" }, i) {
  const n = s.filter(lb), r = t && e !== "loop" && t % 2 === 1 ? 0 : n.length - 1;
  return n[r];
}
const cb = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, hb = (s) => ({
  type: "spring",
  stiffness: 550,
  damping: s === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), db = {
  type: "keyframes",
  duration: 0.8
}, fb = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, pb = (s, { keyframes: t }) => t.length > 2 ? db : hr.has(s) ? s.startsWith("scale") ? hb(t[1]) : cb : fb;
function mb({ when: s, delay: t, delayChildren: e, staggerChildren: i, staggerDirection: n, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...h }) {
  return !!Object.keys(h).length;
}
const Rm = (s, t, e, i = {}, n, r) => (o) => {
  const a = Sm(i, s) || {}, l = a.delay || i.delay || 0;
  let { elapsed: c = 0 } = i;
  c = c - /* @__PURE__ */ Wi(l);
  const h = {
    keyframes: Array.isArray(e) ? e : [null, e],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (f) => {
      t.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: s,
    motionValue: t,
    element: r ? void 0 : n
  };
  mb(a) || Object.assign(h, pb(s, h)), h.duration && (h.duration = /* @__PURE__ */ Wi(h.duration)), h.repeatDelay && (h.repeatDelay = /* @__PURE__ */ Wi(h.repeatDelay)), h.from !== void 0 && (h.keyframes[0] = h.from);
  let d = !1;
  if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (ku(h), h.delay === 0 && (d = !0)), (xn.instantAnimations || xn.skipAnimations) && (d = !0, ku(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, d && !r && t.get() !== void 0) {
    const f = ub(h.keyframes, a);
    if (f !== void 0) {
      Tn.update(() => {
        h.onUpdate(f), h.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ac(h) : new gv(h);
};
function gb({ protectedKeys: s, needsAnimating: t }, e) {
  const i = s.hasOwnProperty(e) && t[e] !== !0;
  return t[e] = !1, i;
}
function _b(s, t, { delay: e = 0, transitionOverride: i, type: n } = {}) {
  let { transition: r = s.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (r = i);
  const l = [], c = n && s.animationState && s.animationState.getState()[n];
  for (const h in a) {
    const d = s.getValue(h, s.latestValues[h] ?? null), f = a[h];
    if (f === void 0 || c && gb(c, h))
      continue;
    const u = {
      delay: e,
      ...Sm(r || {}, h)
    }, m = d.get();
    if (m !== void 0 && !d.isAnimating && !Array.isArray(f) && f === m && !u.velocity)
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const b = ab(s);
      if (b) {
        const A = window.MotionHandoffAnimation(b, h, Tn);
        A !== null && (u.startTime = A, p = !0);
      }
    }
    sb(s, h), d.start(Rm(h, d, f, s.shouldReduceMotion && Em.has(h) ? { type: !1 } : u, s, p));
    const _ = d.animation;
    _ && l.push(_);
  }
  return o && Promise.all(l).then(() => {
    Tn.update(() => {
      o && ib(s, o);
    });
  }), l;
}
function yb({ top: s, left: t, right: e, bottom: i }) {
  return {
    x: { min: t, max: e },
    y: { min: s, max: i }
  };
}
function vb(s, t) {
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
function bb(s, t) {
  return yb(vb(s.getBoundingClientRect(), t));
}
const Td = {
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
}, Iu = {};
for (const s in Td)
  Iu[s] = {
    isEnabled: (t) => Td[s].some((e) => !!t[e])
  };
const Sd = () => ({ min: 0, max: 0 }), Ic = () => ({
  x: Sd(),
  y: Sd()
}), wb = typeof window < "u", Du = { current: null }, Fm = { current: !1 };
function xb() {
  if (Fm.current = !0, !!wb)
    if (window.matchMedia) {
      const s = window.matchMedia("(prefers-reduced-motion)"), t = () => Du.current = s.matches;
      s.addEventListener("change", t), t();
    } else
      Du.current = !1;
}
function Tb(s) {
  return s !== null && typeof s == "object" && typeof s.start == "function";
}
function Sb(s) {
  return typeof s == "string" || Array.isArray(s);
}
const Eb = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ab = ["initial", ...Eb];
function zm(s) {
  return Tb(s.animate) || Ab.some((t) => Sb(s[t]));
}
function Cb(s) {
  return !!(zm(s) || s.variants);
}
function Pb(s, t, e) {
  for (const i in t) {
    const n = t[i], r = e[i];
    if (si(n))
      s.addValue(i, n);
    else if (si(r))
      s.addValue(i, bo(n, { owner: s }));
    else if (r !== n)
      if (s.hasValue(i)) {
        const o = s.getValue(i);
        o.liveStyle === !0 ? o.jump(n) : o.hasAnimated || o.set(n);
      } else {
        const o = s.getStaticValue(i);
        s.addValue(i, bo(o !== void 0 ? o : n, { owner: s }));
      }
  }
  for (const i in e)
    t[i] === void 0 && s.removeValue(i);
  return t;
}
const Ed = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Nm {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Cc, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = Di.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, Tn.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = e.initial ? { ...l } : {}, this.renderState = c, this.parent = t, this.props = e, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = n, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = zm(e), this.isVariantNode = Cb(e), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...d } = this.scrapeMotionValuesFromProps(e, {}, this);
    for (const f in d) {
      const u = d[f];
      l[f] !== void 0 && si(u) && u.set(l[f]);
    }
  }
  mount(t) {
    var e;
    this.current = t, wo.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, n) => this.bindToMotionValue(n, i)), Fm.current || xb(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Du.current, process.env.NODE_ENV !== "production" && Wp(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (e = this.parent) == null || e.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), yu(this.notifyUpdate), yu(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
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
    const i = hr.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const n = e.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && Tn.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (t in Iu) {
      const e = Iu[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ic();
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
    for (let i = 0; i < Ed.length; i++) {
      const n = Ed[i];
      this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
      const r = "on" + n, o = t[r];
      o && (this.propEventSubscriptions[n] = this.on(n, o));
    }
    this.prevMotionValues = Pb(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && e !== void 0 && (i = bo(e === null ? void 0 : e, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, e) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (Bp(i) || Vp(i)) ? i = parseFloat(i) : !$v(i) && ur.test(e) && (i = Om(t, e)), this.setBaseTarget(t, si(i) ? i.get() : i)), si(i) ? i.get() : i;
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
      const o = Lm(this.props, e, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (e && i !== void 0)
      return i;
    const n = this.getBaseTargetFromProps(this.props, t);
    return n !== void 0 && !si(n) ? n : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, e) {
    return this.events[t] || (this.events[t] = new Hp()), this.events[t].add(e);
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e);
  }
  scheduleRenderMicrotask() {
    Rv.render(this.render);
  }
}
class $m extends Nm {
  constructor() {
    super(...arguments), this.KeyframeResolver = Mv;
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
    si(t) && (this.childSubscription = t.on("change", (e) => {
      this.current && (this.current.textContent = `${e}`);
    }));
  }
}
const Ob = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, kb = cr.length;
function Mb(s, t, e) {
  let i = "", n = !0;
  for (let r = 0; r < kb; r++) {
    const o = cr[r], a = s[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || e) {
      const c = km(a, Oc[o]);
      if (!l) {
        n = !1;
        const h = Ob[o] || o;
        i += `${h}(${c}) `;
      }
      e && (t[o] = c);
    }
  }
  return i = i.trim(), e ? i = e(t, n ? "" : i) : n && (i = "none"), i;
}
function Bm(s, t, e) {
  const { style: i, vars: n, transformOrigin: r } = s;
  let o = !1, a = !1;
  for (const l in t) {
    const c = t[l];
    if (hr.has(l)) {
      o = !0;
      continue;
    } else if (sm(l)) {
      n[l] = c;
      continue;
    } else {
      const h = km(c, Oc[l]);
      l.startsWith("origin") ? (a = !0, r[l] = h) : i[l] = h;
    }
  }
  if (t.transform || (o || e ? i.transform = Mb(t, s.transform, e) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: h = 0 } = r;
    i.transformOrigin = `${l} ${c} ${h}`;
  }
}
function Vm(s, { style: t, vars: e }, i, n) {
  const r = s.style;
  let o;
  for (o in t)
    r[o] = t[o];
  n == null || n.applyProjectionStyles(r, i);
  for (o in e)
    r.setProperty(o, e[o]);
}
const Ib = {};
function Db(s, { layout: t, layoutId: e }) {
  return hr.has(s) || s.startsWith("origin") || (t || e !== void 0) && (!!Ib[s] || s === "opacity");
}
function Hm(s, t, e) {
  var r;
  const { style: i } = s, n = {};
  for (const o in i)
    (si(i[o]) || t.style && si(t.style[o]) || Db(o, s) || ((r = e == null ? void 0 : e.getValue(o)) == null ? void 0 : r.liveStyle) !== void 0) && (n[o] = i[o]);
  return n;
}
function Lb(s) {
  return window.getComputedStyle(s);
}
class Rb extends $m {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Vm;
  }
  readValueFromInstance(t, e) {
    var i;
    if (hr.has(e))
      return (i = this.projection) != null && i.isProjecting ? Eu(e) : Ky(t, e);
    {
      const n = Lb(t), r = (sm(e) ? n.getPropertyValue(e) : n[e]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return bb(t, e);
  }
  build(t, e, i) {
    Bm(t, e, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return Hm(t, e, i);
  }
}
function Fb(s, t) {
  return s in t;
}
class zb extends Nm {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, e) {
    if (Fb(e, t)) {
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
    return Ic();
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
const Nb = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, $b = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Bb(s, t, e = 1, i = 0, n = !0) {
  s.pathLength = 1;
  const r = n ? Nb : $b;
  s[r.offset] = ht.transform(-i);
  const o = ht.transform(t), a = ht.transform(e);
  s[r.array] = `${o} ${a}`;
}
function Vb(s, {
  attrX: t,
  attrY: e,
  attrScale: i,
  pathLength: n,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, c, h) {
  if (Bm(s, a, c), l) {
    s.style.viewBox && (s.attrs.viewBox = s.style.viewBox);
    return;
  }
  s.attrs = s.style, s.style = {};
  const { attrs: d, style: f } = s;
  d.transform && (f.transform = d.transform, delete d.transform), (f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = (h == null ? void 0 : h.transformBox) ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), e !== void 0 && (d.y = e), i !== void 0 && (d.scale = i), n !== void 0 && Bb(d, n, r, o, !1);
}
const Ym = /* @__PURE__ */ new Set([
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
]), Hb = (s) => typeof s == "string" && s.toLowerCase() === "svg";
function Yb(s, t, e, i) {
  Vm(s, t, void 0, i);
  for (const n in t.attrs)
    s.setAttribute(Ym.has(n) ? n : Mc(n), t.attrs[n]);
}
function Wb(s, t, e) {
  const i = Hm(s, t, e);
  for (const n in s)
    if (si(s[n]) || si(t[n])) {
      const r = cr.indexOf(n) !== -1 ? "attr" + n.charAt(0).toUpperCase() + n.substring(1) : n;
      i[r] = s[n];
    }
  return i;
}
class qb extends $m {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ic;
  }
  getBaseTargetFromProps(t, e) {
    return t[e];
  }
  readValueFromInstance(t, e) {
    if (hr.has(e)) {
      const i = Pm(e);
      return i && i.default || 0;
    }
    return e = Ym.has(e) ? e : Mc(e), t.getAttribute(e);
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return Wb(t, e, i);
  }
  build(t, e, i) {
    Vb(t, e, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, e, i, n) {
    Yb(t, e, i, n);
  }
  mount(t) {
    this.isSVGTag = Hb(t.tagName), super.mount(t);
  }
}
function Ub(s) {
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
  }, e = Mm(s) && !Fv(s) ? new qb(t) : new Rb(t);
  e.mount(s), wo.set(s, e);
}
function Kb(s) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, e = new zb(t);
  e.mount(s), wo.set(s, e);
}
function Xb(s, t, e) {
  const i = si(s) ? s : bo(s);
  return i.start(Rm("", i, t, e)), i.animation;
}
function Gb(s, t) {
  return si(s) || typeof s == "number" || typeof s == "string" && !kc(t);
}
function Wm(s, t, e, i) {
  const n = [];
  if (Gb(s, t))
    n.push(Xb(s, kc(t) && t.default || t, e && (e.default || e)));
  else {
    const r = Dm(s, t, i), o = r.length;
    rn(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a];
      rn(l !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const c = l instanceof Element ? Ub : Kb;
      wo.has(l) || c(l);
      const h = wo.get(l), d = { ...e };
      "delay" in d && typeof d.delay == "function" && (d.delay = d.delay(a, o)), n.push(..._b(h, { ...t, transition: d }, {}));
    }
  }
  return n;
}
function jb(s, t, e) {
  const i = [];
  return Kv(s, t, e, { spring: vo }).forEach(({ keyframes: r, transition: o }, a) => {
    i.push(...Wm(a, r, o));
  }), i;
}
function Zb(s) {
  return Array.isArray(s) && s.some(Array.isArray);
}
function Qb(s) {
  function t(e, i, n) {
    let r = [], o;
    if (Zb(e))
      r = jb(e, i, s);
    else {
      const { onComplete: l, ...c } = n || {};
      typeof l == "function" && (o = l), r = Wm(e, i, c, s);
    }
    const a = new yv(r);
    return o && a.finished.then(o), a;
  }
  return t;
}
const zt = Qb();
function Ue(s, t) {
  return zt(s, t, { duration: 0 });
}
function ca(s, t, e = {}) {
  const i = typeof s == "string" ? document.querySelector(s) : s;
  return t === 0 ? zt(i, { opacity: 0 }, {
    ...e,
    onComplete: () => {
      var n;
      i.style.visibility = "hidden", (n = e.onComplete) == null || n.call(e);
    }
  }) : (i.style.visibility = "visible", zt(i, { opacity: t }, e));
}
function Jb(s, t = "all") {
  const e = document.querySelector(s);
  t === "all" ? e.removeAttribute("style") : (Array.isArray(t) ? t : [t]).forEach((n) => {
    e.style.removeProperty(n);
  });
}
const tw = {
  onAccept: (s) => {
    const t = /* @__PURE__ */ new Date();
    t.setFullYear(t.getFullYear() + 1), s.setCookie("COOKIES_CONSENT_STATUS", 1, t, "/"), s.opts.setCookies(s);
    const e = [
      [s.cc, { y: "120%" }, { duration: 0.35, easing: "ease-in", at: 0 }],
      [s.inner, { opacity: 0 }, { duration: 0.3, easing: "ease-in", at: 0 }]
    ];
    zt(e).finished.then(() => {
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
    zt(e).finished.then(() => {
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
    s.cc.style.display = "block";
    const t = [
      [s.cc, { y: ["120%", "0%"] }, { duration: 0.5, easing: "ease-out", at: 1 }],
      [s.text, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.15 }],
      [s.btns, { opacity: [0, 1] }, { duration: 0.7, easing: "ease-out", at: 1.5 }]
    ];
    zt(t);
  }
};
class Ew {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, tw), this.cc = document.querySelector(".cookie-container"), this.inner = document.querySelector(".cookie-container-inner"), this.text = document.querySelector(".cookie-law-text"), this.btns = document.querySelector(".cookie-law-buttons"), this.btn = document.querySelector(".dismiss-cookielaw"), this.btnRefuse = document.querySelector(".refuse-cookielaw"), this.btn && (this.app.registerCallback(Ri, () => {
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
const ew = {};
class Aw {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, ew), this.initialize();
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
        zt([
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
class iw {
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
    i = i.replace(/:(\w+)/g, (h, d) => (n.push(d), "([^/]+)"));
    const r = t.split("/"), o = e.split("/");
    if (o.length <= r.length) {
      let d = r.slice(0, o.length).join("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const f = [];
      d = d.replace(/:(\w+)/g, (p, _) => (f.push(_), "([^/]+)"));
      const u = new RegExp(`^${d}$`), m = e.match(u);
      if (m) {
        const p = {};
        return f.forEach((_, b) => {
          m[b + 1] && (p[_] = decodeURIComponent(m[b + 1]));
        }), p;
      }
    }
    const a = new RegExp(`^${i}$`), l = e.match(a);
    if (!l)
      return {};
    const c = {};
    return n.forEach((h, d) => {
      l[d + 1] && (c[h] = decodeURIComponent(l[d + 1]));
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
const nw = {
  page: 0,
  loaderParam: {},
  filter: "",
  urlSync: null,
  onFetch: (s) => {
  }
};
class Cw {
  constructor(t, e, i = {}) {
    if (this.status = "available", this.app = t, this.$el = e, this.id = e.dataset.loaderId, e.hasAttribute("data-loader-canvas-target") ? this.$canvasEl = st.find(e.getAttribute("data-loader-canvas-target")) : this.$canvasEl = st.find(e, "[data-loader-canvas]"), !this.$canvasEl && this.id && (this.$canvasEl = st.find(`[data-loader-canvas-for="${this.id}"]`)), !this.$canvasEl)
      throw new Error("No canvas element found.");
    this.opts = qt(i, nw), this.initialize();
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
    this.baseURL = this.$el.dataset.loader, this.$paramEls = st.all(this.$el, "[data-loader-param]"), (t = this.opts.urlSync) != null && t[this.id] && (this.urlSync = new iw(this, this.opts.urlSync[this.id])), this.setInitialParams(), this.$paramEls.forEach((e) => {
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
const sw = {
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
class Pw {
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, sw), this.elements = {}, this.open = !1, this.element = e.el, this.timeline = Q.timeline({ paused: !0, reversed: !0 }), this.elements.trigger = st.find(this.element, this.opts.selectors.trigger), this.elements.trigger.hasAttribute("data-dropdown-target")) {
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
const rw = {};
class Ow {
  constructor(t, e, i = {}, n = document.body) {
    this.app = t, this.container = n, this.opts = qt(i, rw), this.selector = e, this.initialize(), window.addEventListener(qi, () => {
      Jb("[data-eq-height-elements-adjusted]", "minHeight"), this.initialize();
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
        Ue(l.elements, { minHeight: l.height }), l.elements.forEach((c) => {
          c.setAttribute("data-eq-height-elements-adjusted", "true");
        });
      });
    });
  }
}
function Po(s, t = !1) {
  return new Promise((e) => {
    t ? s.hasAttribute("data-ll-loaded") ? e({ img: s, status: "ok" }) : s.addEventListener(fc, () => {
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
    const n = s[i];
    e.push(Po(n, t));
  }
  return Promise.all(e);
}
const ow = {
  listenForResize: !0
};
class kw {
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.container = i, this.opts = qt(e, ow), this.initialize(), e.listenForResize && window.addEventListener(qi, () => {
      this.initialize();
    });
  }
  run() {
    Array.from(this.canvases).forEach((t) => {
      let e = null;
      const i = [];
      let n = [], r = 0;
      const o = st.all(t, "img");
      Dc(o, !1).then(() => {
        o.forEach((a) => {
          const l = a.getBoundingClientRect(), c = this.getImgSizeInfo(a);
          if (e === null) {
            r = c.height, n.push(a), e = l.top;
            return;
          }
          e !== l.top ? (i.push({ elements: n, height: r }), n = [], r = c.height) : e === l.top ? c.height > r && (r = c.height) : r = c.height, n.push(a), e = l.top;
        }), n.length && i.push({ elements: n, height: r }), i.length && i.forEach((a) => {
          Ue(a.elements, { minHeight: a.height });
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
const qm = {
  onPin: (s) => {
    zt(s.el, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, zt(s.el, {
      yPercent: "-100"
    }, {
      duration: 0.25,
      easing: "ease-in"
    }).finished.then(() => {
      s._hiding = !1;
    });
  },
  onAltBg: (s) => {
    s.opts.altBgColor && zt(s.el, {
      backgroundColor: s.opts.altBgColor
    }, {
      duration: 0.2
    });
  },
  onNotAltBg: (s) => {
    s.opts.regBgColor && zt(s.el, {
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
}, aw = {
  el: "header[data-nav]",
  on: Ri,
  unpinOnForcedScrollStart: !0,
  pinOnForcedScrollEnd: !0,
  ignoreForcedScroll: !1,
  rafScroll: !0,
  default: {
    unPinOnResize: !0,
    canvas: window,
    intersects: null,
    beforeEnter: (s) => {
      Ue(s.el, { yPercent: -100 }), Ue(s.lis, { opacity: 0 });
    },
    enter: (s) => {
      zt(s.el, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), zt(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: Im(0.1, { startDelay: s.opts.enterDelay }),
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
    ...qm
  }
};
class Mw {
  /**
   * Create a new FixedHeader instance
   * @param {Object} app - Application instance
   * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, aw), typeof this.mainOpts.el == "string" ? this.el = document.querySelector(this.mainOpts.el) : this.el = this.mainOpts.el, !this.el)
      return;
    const i = document.body.getAttribute("data-script");
    this.opts = this._getOptionsForSection(i, e), this.lis = this.el.querySelectorAll("li"), this.preventPin = !1, this.preventUnpin = !1, this._firstLoad = !0, this._pinned = !0, this._top = !1, this._bottom = !1, this._small = !1, this._altBg = !1, this._isResizing = !1, this._hiding = !1, this.lastKnownScrollY = 0, this.lastKnownScrollHeight = 0, this.currentScrollHeight = 0, this.currentScrollY = 0, this.mobileMenuOpen = !1, this.timer = null, this.resetResizeTimer = null, this.scrollSettleTimeout = null, this.opts.intersects && (this.intersectingElements = st.all("[data-intersect]")), window.addEventListener(Ha, () => {
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
      Ba,
      this.unpin.bind(this),
      !1
    ), this.mainOpts.pinOnForcedScrollEnd && window.addEventListener(
      Va,
      this.pin.bind(this),
      !1
    ), this.app.registerCallback(Ri, () => {
      let t = Yn;
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
      go,
      this.unpinIfScrolled.bind(this)
    ), this.preflight(), window.addEventListener(this.mainOpts.on, this.enter.bind(this)), this._bindMobileMenuListeners(), this.opts.unPinOnResize && !this.app.featureTests.results.ios && window.addEventListener(
      qi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  preflight() {
    this.opts.enter || (this.checkSize(!0), this.checkBg(!0), this.checkTop(!0)), this.app.registerCallback(Ri, () => {
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
    return e = qt(i, qm, e.default || {}), e;
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
const lw = {
  shadow: !1,
  shadowColor: "rgba(255, 255, 255, 1)"
};
class Iw {
  constructor(t, e) {
    this.app = t, this.opts = qt(e, lw);
    const i = document.querySelector("main"), n = document.querySelector("[data-footer-reveal]");
    Ue(n, {
      "z-index": -100,
      position: "fixed",
      bottom: 0
    });
    const r = n.offsetHeight;
    if (Ue(i, { marginBottom: r }), this.opts.shadow) {
      const o = `0 50px 50px -20px ${this.opts.shadowColor}`;
      i.style.mozBoxShadow = o, i.style.webkitBoxShadow = o, i.style.boxShadow = o;
    }
  }
}
const uw = {
  el: "[data-parallax]",
  factor: 1.3,
  fadeContent: !0,
  scale: 1.2,
  delay: 0.1,
  orientation: "up",
  overflow: !1
};
class Dw {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(t, e = {}) {
    if (this.app = t, this.opts = qt(e, uw), this.elements = {}, this.parallaxElements = [], typeof this.opts.el == "string")
      if (this.opts.el.includes("[data-parallax-parent]")) {
        const i = document.querySelector(this.opts.el);
        i && (this.elements.parent = i, i.querySelectorAll("[data-parallax-factor]").forEach((r) => this.setupParallaxElement(r)));
      } else
        document.querySelectorAll(this.opts.el).forEach((n) => this.setupParallaxElement(n));
    else this.opts.el instanceof HTMLElement && this.setupParallaxElement(this.opts.el);
    this.onScroll = this.onScroll.bind(this), window.addEventListener(Yn, this.onScroll), window.addEventListener("resize", this.onScroll), this.onScroll();
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
    window.removeEventListener(Yn, this.onScroll), window.removeEventListener("resize", this.onScroll), this.parallaxElements.forEach((t) => {
      const { element: e, figure: i, content: n } = t;
      i && (i.style.transform = "", i.style.willChange = ""), n && (n.style.transform = "", n.style.opacity = "", n.style.willChange = ""), !i && !n && (e.style.transform = "", e.style.opacity = "", e.style.willChange = ""), e.style.overflow = "";
    }), this.parallaxElements = [];
  }
}
Q.registerPlugin(Fa);
const cw = {
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
    s.slides.length > 1 ? Q.to(s.el, {
      duration: 0.25,
      opacity: 1,
      onComplete: () => {
        t();
      }
    }) : Q.to(s.el, {
      duration: 0.25,
      opacity: 1
    });
  }
};
class Lw {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, cw), typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), Q.set(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.slides = this.el.querySelectorAll("[data-hero-slide]"), this.images = this.el.querySelectorAll(".hero-slide-img"), this.slideCount = this.slides.length - 1, this._currentSlideIdx = this.opts.initialSlideNumber, Array.from(this.slides).forEach((e) => {
      Q.set(e, {
        zIndex: this.opts.zIndex.regular,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      });
      const i = e.querySelector(".hero-slide-img");
      i ? Q.set(i, {
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
    this.app.registerCallback(Ri, () => {
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
    mo() && this.app.opts.respectReducedMotion || (this._currentSlideIdx === this.slideCount ? (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx = 0, this._nextSlide = this.slides[this._currentSlideIdx + 1]) : (this._previousSlide = this.slides[this._currentSlideIdx], this._currentSlideIdx += 1, this._currentSlideIdx === this.slideCount ? [this._nextSlide] = this.slides : this._nextSlide = this.slides[this._currentSlideIdx + 1]), this._currentSlide = this.slides[this._currentSlideIdx], this.opts.onTransition(this));
  }
  /**
   * Switches between slides
   */
  slide(t) {
    const e = Q.timeline();
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
        qi,
        this._resizeSlides.bind(this)
      )) : window.removeEventListener(
        qi,
        this._resizeSlides.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resizeSlides() {
    Q.to(this.images, {
      duration: 0.15,
      width: document.body.clientWidth,
      overwrite: "all"
    });
  }
}
const hw = {
  el: "[data-hero-video]",
  onFadeIn: (s) => {
    ca(s.videoDiv, 1, { duration: 1 });
  },
  onFadeInCover: (s) => {
    ca(s.cover, 1, { duration: 0.35 });
  },
  onFadeOutCover: (s) => {
    ca(s.cover, 0, { duration: 0.35 });
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
class Rw {
  /**
   * Create a new HeroVideo instance
   * @param {Object} app - Application instance
   * @param {HeroVideoOptions} [opts={}] - HeroVideo options
   */
  constructor(t, e = {}) {
    this.app = t, this.booting = !0, this.playing = !1, this.forcePaused = !1, this.opts = qt(e, hw), this.elements = {}, typeof this.opts.el == "string" ? this.el = document.querySelector(this.opts.el) : this.el = this.opts.el, this.el && this.initialize();
  }
  initialize() {
    this._addResizeHandler(), Ue(this.el, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }), this.cover = st.find(this.el, "[data-cover]"), this.cover && ca(this.cover, 0, { duration: 0 });
    const t = document.querySelector(this.opts.pauseParent), e = document.createRange().createContextualFragment(`
      <button data-hero-video-pause></button>
    `);
    if (t && (t.append(e), this.elements.pause = t.querySelector("[data-hero-video-pause]"), this.elements.pause.innerHTML = this.opts.elements.pause()), this.videoDiv = this.el.querySelector("[data-hero-video-content]"), this.video = this.videoDiv.querySelector("video"), this.addObserver(), this.addEvents(), this.setSrc(), Ue(this.videoDiv, {
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
    this.video.muted = !0, Ue(this.video, {
      width: document.body.clientWidth,
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute"
    }), this.cover && Po(this.cover).then(() => {
      this.fadeInCover();
    }), window.addEventListener(go, () => {
      !this.video.playing && !mo() && this.video.readyState >= 3 && (this.play(), this.fadeIn(), this.booting = !1), this.app.featureTests.results.ie11 && window.objectFitPolyfill && window.objectFitPolyfill();
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
      this.playing || (mo() ? Ue(this.videoDiv, { opacity: 1 }) : (this.opts.onPlayReady(this), this.play(), this.fadeIn(), this.booting = !1));
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
        qi,
        this._resize.bind(this)
      )) : window.removeEventListener(
        qi,
        this._resize.bind(this)
      );
    }), this.observer.observe(this.el);
  }
  _resize() {
    zt(this.video, {
      width: document.body.clientWidth
    }, {
      duration: 0.15
    });
  }
}
function El(s, t) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(t, !1, !1, {}), s.dispatchEvent(e);
}
const dw = {
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
class Fw {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, dw), this.target = this.opts.target || document.body, this.resizePending = /* @__PURE__ */ new Map(), this.rafId = null, this.srcsetReadyObserver = new MutationObserver((i) => {
      i.forEach((n) => {
        n.type === "attributes" && n.attributeName === "data-ll-srcset-ready" && (this.revealPicture(n.target), this.revealObserver.unobserve(n.target));
      });
    }), this.initialize(), this.opts.registerCallback && (this.app.state.revealed ? this.watch() : this.app.registerCallback(Ri, () => {
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
            (l.isIntersecting || l.intersectionRatio > 0) && (Dc(r, !0).then(() => {
              El(i, Np);
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
    n.addEventListener("load", r, !1), n.setAttribute("data-ll-loading", ""), n.dataset.src && n.setAttribute("src", n.dataset.src), n.dataset.srcset && n.setAttribute("srcset", n.dataset.srcset), this.app.featureTests.results.ie11 && window.picturefill && window.picturefill({ reevaluate: !0 }), n.complete && r(), El(n, fc);
  }
  /* reveal by just setting `data-ll-loaded` */
  revealPicture(t) {
    const e = t.querySelector("img");
    e.hasAttribute("data-ll-loaded") || (e.setAttribute("data-ll-loaded", ""), El(e, zp));
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
const fw = {
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
    s.app.scrollLock(), Q.to(s.elements.wrapper, {
      duration: 0.5,
      opacity: 1
    });
  },
  onAfterClose: () => {
  },
  onClose: (s) => {
    s.opts.captions && Q.to(s.elements.caption, {
      duration: 0.45,
      opacity: 0
    }), Q.to(
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
          Q.to(s.elements.wrapper, {
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
class zw {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, fw), this.lightboxes = document.querySelectorAll("[data-lightbox]"), this.elements = {}, this.imgAlts = [], this.imgs = [], this.sections = {}, this.currentIndex = null, this.firstTransition = !0, this.previousCaption = null, this.timelines = {
      caption: Q.timeline({ paused: !0 }),
      image: Q.timeline({ paused: !0 })
    }, this.lightboxes.forEach((i) => {
      const n = i.getAttribute("data-lightbox"), r = i.getAttribute("data-srcset"), a = i.querySelector("img").getAttribute("alt"), l = i.getAttribute("data-lightbox-section") || "general";
      let c = i;
      this.opts.trigger && (c = st.find(i, this.opts.trigger) || i), Object.prototype.hasOwnProperty.call(this.sections, l) || (this.sections[l] = []);
      const h = {
        href: n,
        alt: a,
        srcset: r
      }, d = this.sections[l].push(h) - 1;
      c.addEventListener("click", (f) => {
        f.preventDefault(), this.showBox(l, d);
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
      Q.set(o, { autoAlpha: 0 }), o.classList.add("lightbox-image", "m-lg"), o.setAttribute("data-idx", r), this.elements.imgWrapper.appendChild(o), this.imgs.push(o);
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
Q.registerPlugin(ws);
const pw = {
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
    r ? (Q.set(r, { display: "block", opacity: 0 }), e && (Q.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), Q.to(e, { duration: 0.2, opacity: 0 })), i && Q.to(i, { duration: 0.2, opacity: 0 }), n && Q.to(n, { duration: 0.2, opacity: 0 }), Q.to(r, {
      duration: 0.2,
      opacity: 1,
      onComplete: () => {
        window.location = s;
      }
    })) : (e && (Q.to(e, {
      duration: 0.8,
      y: 25,
      ease: "power3.out"
    }), Q.to(e, { duration: 0.2, opacity: 0 })), i && Q.to(i, { duration: 0.2, opacity: 0 }), n && Q.to(n, { duration: 0.2, opacity: 0 }), Q.to(e, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        window.location = s;
      }
    }));
  }
};
class Nw {
  /**
   * Create a new Links instance
   * @param {Object} app - Application instance
   * @param {LinksOptions} [opts={}] - Links options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, pw);
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
          const d = new URL(window.location.href), f = a.pathname === d.pathname && a.search === d.search;
          if (f && a.hash) {
            h.preventDefault();
            const u = a.hash, m = document.querySelector(u);
            m && (this.opts.onAnchor(m, this), history.pushState({}, "", n));
          } else f && !a.hash && !d.hash ? h.preventDefault() : (h.preventDefault(), this.opts.onTransition(n, this.app));
        }
      });
    });
  }
  normalizeHostname(t) {
    return t.replace(/^www\./, "");
  }
}
const mw = {
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
class $w {
  constructor(t, e, i) {
    this.opts = qt(i, mw), this.app = t, this.elements = {}, this.elements.$el = e, this.elements.$marquee = st.find(this.elements.$el, "[data-marquee]"), this.elements.$holder = st.find(this.elements.$el, "[data-marquee-holder]"), this.elements.$item = st.find(this.elements.$el, "[data-marquee-item]"), this.timeline = null, this.observer = null, this.initialize();
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
    const e = this.elements.$holder.offsetWidth, i = st.all(this.elements.$el, "[data-marquee-holder]"), n = e * i.length;
    this.duration = (e + n) / this.opts.speed, Wt.set(this.elements.$marquee, { width: n }), this.initializeTween(), st.inViewport(this.elements.$el) && this.play();
  }
  clearHolders() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
    Array.from(t).forEach((e) => Wt.set(e, { clearProps: "all" }));
  }
  killTweens() {
    this.timeline && (this.timeline.kill(), this.timeline = null);
  }
  initializeTween() {
    const t = st.all(this.elements.$el, "[data-marquee-holder]");
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
    Wt.set(this.elements.$el, { height: t });
  }
}
const gw = {
  logoColor: "#000",
  logoPathSelector: "svg path",
  contentSelector: "section",
  liSelector: "li",
  hamburgerColor: "#000",
  onResize: null,
  openTween: (s) => {
    const t = Q.timeline();
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
    document.body.classList.toggle("open-menu"), Q.timeline().call(() => {
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
class Bw {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, gw), this.open = !1, this.header = document.querySelector("header"), this.bg = this.header.querySelector(".mobile-bg"), this.logo = this.header.querySelector("figure.brand"), this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null, this.menuButton = this.header.querySelector("figure.menu-button"), this.hamburger = this.menuButton ? this.menuButton.querySelector(".hamburger") : null, this.hamburgerInner = this.menuButton ? this.menuButton.querySelector(".hamburger-inner") : null, this.content = this.header.querySelectorAll(this.opts.contentSelector), this.lis = this.header.querySelectorAll(this.opts.liSelector), this.nav = this.header.querySelector("nav"), this.hamburger && this.hamburger.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), this.toggleMenu();
    }), this.opts.onResize && window.addEventListener(qi, () => {
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
      hc
    );
    window.dispatchEvent(t);
  }
  _emitMobileMenuClosedEvent() {
    const t = new window.CustomEvent(
      dc
    );
    window.dispatchEvent(t);
  }
}
Q.registerPlugin(Fa);
const _w = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */
  on: Ri,
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
class Vw {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(t, e = {}, i = document.body) {
    this.app = t, this.opts = qt(e, _w), i !== document.body && (this.opts.on = () => {
    }), this.initialize(i);
  }
  initialize(t = document.body) {
    this.opts.clearNestedSections && t.querySelectorAll("[data-moonwalk-section] [data-moonwalk-section]").forEach((e) => e.removeAttribute("data-moonwalk-section")), this.opts.clearNestedWalks && t.querySelectorAll("[data-moonwalk] [data-moonwalk]").forEach((e) => e.removeAttribute("data-moonwalk")), this.opts.warnRunWithSection && t.querySelectorAll("[data-moonwalk-run][data-moonwalk-section]").forEach(
      (e) => console.warn(
        "Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.",
        e
      )
    ), this.opts.clearMoonwalkOnAnchors && window.location.hash && this.walkToThisPoint(window.location.hash), this.addClass(), this.sections = this.initializeSections(t), this.runs = this.initializeRuns(t), this.opts.clearLazyload && this.clearLazyloads(t), mo() && this.app.opts.respectReducedMotion && this.removeAllWalks(t), this.opts.on && window.addEventListener(this.opts.on, this.onReady.bind(this));
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
    const e = Q.timeline({
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
      Q.set(t.children, r);
    }
    if (t.stage.name) {
      const n = e[t.stage.name];
      n ? Q.set(t.el, n.transition.from) : console.error(
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
              top: l.top,
              bottom: l.bottom,
              left: l.left,
              right: l.right
            });
            const f = a.target.hasAttribute(
              "data-moonwalk-run-triggered"
            );
            t.callback(a.target, f, d), a.target.setAttribute("data-moonwalk-run-triggered", ""), !t.onExit && !t.repeated && r.unobserve(a.target);
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
              l.bottom <= 0 ? f.direction = "top" : l.top >= c ? f.direction = "bottom" : l.right <= 0 ? f.direction = "left" : l.left >= h && (f.direction = "right");
            t.onExit(a.target, d, f), t.repeated || r.unobserve(a.target);
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
            const l = a.target.getAttribute("data-moonwalk"), c = l.length ? i.walks[l] : i.walks.default, { duration: h, transition: d, interval: f, startDelay: u } = c;
            let { alphaTween: m } = c, p = (h - f) * -1;
            t.stage.firstTween && (p = 0, t.stage.firstTween = !1), typeof m == "object" && m !== null ? m.duration = m.duration ? m.duration : h : m === !0 && (m = {
              duration: h,
              ease: "sine.in"
            });
            const _ = d ? this.tweenJS : this.tweenCSS, b = () => {
              _(
                t,
                a.target,
                h,
                f,
                d,
                p,
                m
              );
            }, A = () => {
              u ? Q.delayedCall(u, b) : b();
            };
            if (a.target.tagName === "IMG")
              Po(a.target).then(() => A());
            else if (a.target.hasAttribute("data-placeholder"))
              A();
            else {
              const C = a.target.querySelectorAll("img");
              C.length ? Array.from(C).every(
                (y) => y.hasAttribute("data-ll-placeholder")
              ) ? A() : Dc(C).then(() => A()) : A();
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
      const d = t.timeline.time(), f = t.timeline.recent().time(), u = t.timeline.recent().endTime();
      f > c ? l = () => t.timeline.time() : d + o * -1 < u ? l = () => `>${o}` : l = () => t.timeline.time();
    } else
      l = () => ">";
    Q.set(e, r.from);
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
        const c = t.timeline.time(), h = t.timeline.recent().time(), d = t.timeline.recent().endTime();
        h > l ? a = () => t.timeline.time() : c + o * -1 < d ? a = () => `>${o}` : a = () => t.timeline.time();
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
const yw = {
  clickToggle: !1,
  allowMultiple: !1,
  followTrigger: !1,
  followSpeed: 0.3,
  onShow: null
}, br = [];
class Hw {
  constructor(t, e, i = {}) {
    this.app = t, this.opts = qt(i, yw), this.trigger = e, this.position = this.trigger.getAttribute("data-popover-position") || "top", this.className = "popover", this.orderedPositions = ["top", "right", "bottom", "left"], this.currentPosition = this.position;
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
    this.opts.allowMultiple || this.closeAllExcept(this), document.body.appendChild(this.popover), br.includes(this) || br.push(this), this.updatePosition(!1), this.opts.clickToggle && this.addDocumentClickHandler(), this.opts.followTrigger && requestAnimationFrame(() => {
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
    }, h = this.orderedPositions.slice(l).concat(this.orderedPositions.slice(0, l)).map((d) => c[d]).find((d) => (t || (this.popover.style.top = `${d.top}px`, this.popover.style.left = `${d.left}px`), st.inViewportStrict(this.popover)));
    this.orderedPositions.forEach((d) => {
      this.popover.classList.remove(`${this.className}--${d}`);
    }), h ? (t && this.isVisible ? zt(this.popover, {
      top: Math.max(0, h.top),
      left: Math.max(0, h.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, h.top)}px`, this.popover.style.left = `${Math.max(0, h.left)}px`), this.popover.classList.add(`${this.className}--${h.name}`), this.currentPosition = h.name) : (t && this.isVisible ? zt(this.popover, {
      top: Math.max(0, c.bottom.top),
      left: Math.max(0, c.bottom.left)
    }, {
      duration: this.opts.followSpeed,
      easing: "ease-out"
    }) : t || (this.popover.style.top = `${Math.max(0, c.bottom.top)}px`, this.popover.style.left = `${Math.max(0, c.bottom.left)}px`), this.popover.classList.add(`${this.className}--bottom`), this.currentPosition = "bottom");
  }
  hide() {
    this.popover.remove();
    const t = br.indexOf(this);
    t !== -1 && br.splice(t, 1), this.opts.clickToggle && this.removeDocumentClickHandler(), this.opts.followTrigger && this.removeScrollListener();
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
    br.forEach((e) => {
      e !== t && e.hide();
    });
  }
  // Handle scroll events to update popover position
  handleScroll() {
    this.isVisible && this.updatePosition(!0);
  }
  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Yn, this.boundHandleScroll);
  }
  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(Yn, this.boundHandleScroll);
  }
}
const vw = {
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
    e.backdrop.style.display = "block", zt(e.backdrop, { opacity: 1 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "block", zt(
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
    t && zt(t, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      t.style.display = "none";
    }), zt(s.backdrop, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
      s.backdrop.remove();
    });
  }
};
class Yw {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(t, e = "[data-popup]", i = {}) {
    this.app = t, this.opts = qt(i, vw), this.opts.selector = e, this.backdrop = null, this.currentPopup = null, this.popupKey = null, this.bindTriggers();
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
    return e.setAttribute("data-popup-backdrop", ""), t && e.setAttribute("data-popup-key", t), e.style.display = "none", e.style.zIndex = "4999", Ue(e, { opacity: 0 }), e.addEventListener("click", (i) => {
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
const bw = {
  onIntersect: (s, t) => {
  }
};
class Ww {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, bw), this.initialize();
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
const ww = {};
class qw {
  constructor(t, e = {}) {
    this.app = t, this.opts = qt(e, ww), this.initialize();
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
    Ue(t, { y: e * -1, marginBottom: e * -1 });
  }
  size(t, e) {
    Ue(t, { height: e.clientHeight });
  }
}
const Um = {
  onMainVisible: (s) => {
    zt(s.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    });
  },
  onMainInvisible: (s) => {
    zt(s.el, {
      opacity: 0
    }, {
      duration: 1
    });
  },
  onPin: (s) => {
    zt(s.auxEl, {
      yPercent: "0"
    }, {
      duration: 0.35,
      easing: "ease-out"
    });
  },
  onUnpin: (s) => {
    s._hiding = !0, zt(s.auxEl, {
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
}, xw = {
  el: "header[data-nav]",
  on: Ri,
  pinOnOutline: !1,
  pinOnForcedScroll: !0,
  unPinOnResize: !1,
  default: {
    onClone: (s) => s.el.cloneNode(!0),
    canvas: window,
    beforeEnter: (s) => {
      Ue(s.el, { opacity: 0 });
    },
    enter: (s) => {
      Ue(s.auxEl, { yPercent: -100 }), Ue(s.lis, { opacity: 0 }), zt(s.auxEl, {
        yPercent: 0
      }, {
        duration: 1,
        delay: s.opts.enterDelay,
        easing: "ease-out"
      }), zt(s.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: Im(0.1, { startDelay: s.opts.enterDelay }),
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
    ...Um
  }
};
class Uw {
  constructor(t, e = {}) {
    if (this.app = t, this.mainOpts = qt(e, xw), this.mainOpts.pinOnOutline && window.addEventListener(Ha, () => {
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
      qi,
      this.setResizeTimer.bind(this),
      !1
    ), this.opts.beforeEnter(this);
  }
  setupObserver() {
    this.observer = new IntersectionObserver((t) => {
      const [{ isIntersecting: e }] = t;
      e ? (this._navVisible !== !0 && (this.opts.onMainVisible(this), this.firstReveal && (this.firstReveal = !1)), this._navVisible = !0) : (this._navVisible === !0 && this.opts.onMainInvisible(this), this._navVisible = !1);
    }), window.addEventListener(
      Yn,
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
    }), this.mainOpts.pinOnForcedScroll && (window.addEventListener(Ba, () => {
      this.preventUnpin = !1, this.unpin(), this.preventPin = !0;
    }), window.addEventListener(
      Va,
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
    return e = qt(i, Um, e.default || {}), e;
  }
  _bindMobileMenuListeners() {
    window.addEventListener(
      hc,
      this._onMobileMenuOpen.bind(this)
    ), window.addEventListener(
      dc,
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
class Kw {
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
          zt(i, { height: [0, r + "px"] }, {
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
          zt(i, { height: 0 }, {
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
            zt(n, { height: 0 }, {
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
class Xw {
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
const Gw = (s, t) => {
  const e = document.createElement("script");
  let i = !1;
  const n = document.getElementsByTagName("head")[0];
  e.src = s, e.onreadystatechange = function() {
    !i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (i = !0, t(), e.onload = null, e.onreadystatechange = null, n.removeChild(e));
  }, e.onload = e.onreadystatechange, n.appendChild(e);
};
export {
  Sw as Application,
  Qh as Breakpoints,
  Fa as CSSPlugin,
  Ew as Cookies,
  Aw as CoverOverlay,
  Cw as Dataloader,
  st as Dom,
  Na as Draggable,
  Pw as Dropdown,
  Ow as EqualHeightElements,
  kw as EqualHeightImages,
  Tw as Events,
  Mw as FixedHeader,
  Iw as FooterReveal,
  Lw as HeroSlider,
  Rw as HeroVideo,
  Pp as InertiaPlugin,
  Fw as Lazyload,
  zw as Lightbox,
  Nw as Links,
  $w as Marquee,
  Bw as MobileMenu,
  Vw as Moonwalk,
  Dw as Parallax,
  Hw as Popover,
  Yw as Popup,
  Ww as ScrollSpy,
  ws as ScrollToPlugin,
  wt as ScrollTrigger,
  D_ as SplitText,
  qw as StackedBoxes,
  Uw as StickyHeader,
  Kw as Toggler,
  Xw as Typography,
  qt as _defaultsDeep,
  Q as gsap,
  Po as imageIsLoaded,
  Dc as imagesAreLoaded,
  Gw as loadScript,
  mo as prefersReducedMotion,
  jh as rafCallback
};
