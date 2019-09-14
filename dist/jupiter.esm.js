/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = (typeof(window) !== "undefined") ? window : (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : undefined || {};

var TweenLite = (function(window) {
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.00000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							/*
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							}
							*/
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = !!vars.immediateRender;
				this.data = vars.data;
				this._reversed = !!vars.reversed;

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "2.1.3";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			if (!_doc) { //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
				_doc = window.document;
			}
			return (!_doc) ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			_blobRound = function(v) {
				return (((v * 1000) | 0) / 1000) + "";
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : _blobRound}; //limiting to 3 decimal places and casting as a string can really help performance when array.join() is called!
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1, stagger:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var l = _lazyTweens.length,
					i, tween;
				_lazyLookup = {};
				for (i = 0; i < l; i++) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add tiny amount to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) ; else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= _tinyNum * 2)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted && l)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				startAt = this._startAt,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (startAt) {
					startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target || {}, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (startAt) {
					startAt.render(-1, true);
					startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}
			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var self = this,
				prevTime = self._time,
				duration = self._duration,
				prevRawPrevTime = self._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - _tinyNum && time >= 0) { //to work around occasional floating point math artifacts.
				self._totalTime = self._time = duration;
				self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
				if (!self._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || self._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (self._initted || !self.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (self._startTime === self._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -_tinyNum) || (prevRawPrevTime === _tinyNum && self.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					self._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < _tinyNum) { //to work around occasional floating point math artifacts, round super small values to 0.
				self._totalTime = self._time = 0;
				self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = self._reversed;
				}
				if (time > -_tinyNum) {
					time = 0;
				} else if (time < 0) {
					self._active = false;
					if (duration === 0) if (self._initted || !self.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && self.data === "isPause")) {
							force = true;
						}
						self._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!self._initted || (self._startAt && self._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				self._totalTime = self._time = time;

				if (self._easeType) {
					var r = time / duration, type = self._easeType, pow = self._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					self.ratio = (type === 1) ? 1 - r : (type === 2) ? r : (time / duration < 0.5) ? r / 2 : 1 - (r / 2);
				} else {
					self.ratio = self._ease.getRatio(time / duration);
				}
			}

			if (self._time === prevTime && !force) {
				return;
			} else if (!self._initted) {
				self._init();
				if (!self._initted || self._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && self._firstPT && ((self.vars.lazy !== false && self._duration) || (self.vars.lazy && !self._duration))) {
					self._time = self._totalTime = prevTime;
					self._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(self);
					self._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (self._time && !isComplete) {
					self.ratio = self._ease.getRatio(self._time / duration);
				} else if (isComplete && self._ease._calcEnd) {
					self.ratio = self._ease.getRatio((self._time === 0) ? 0 : 1);
				}
			}
			if (self._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				self._lazy = false;
			}
			if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
				self._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (self._startAt) {
					if (time >= 0) {
						self._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (self.vars.onStart) if (self._time !== 0 || duration === 0) if (!suppressEvents) {
					self._callback("onStart");
				}
			}
			pt = self._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * self.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * self.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (self._onUpdate) {
				if (time < 0) if (self._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (self._time !== prevTime || isComplete || force) {
					self._callback("onUpdate");
				}
			}
			if (callback) if (!self._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && self._startAt && !self._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					self._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (self._timeline.autoRemoveChildren) {
						self._enabled(false, false);
					}
					self._active = false;
				}
				if (!suppressEvents && self.vars[callback]) {
					self._callback(callback);
				}
				if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					self._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				firstPT = this._firstPT,
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted && firstPT) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			var t = this._time;
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(t, false, this.vars.lazy !== false);
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

		return TweenLite;

})(_gsScope);

var globals = _gsScope.GreenSockGlobals;
var nonGlobals = globals.com.greensock;
var SimpleTimeline = nonGlobals.core.SimpleTimeline;
var Animation = nonGlobals.core.Animation;
var Ease = globals.Ease;
var Linear = globals.Linear;
var Power1 = globals.Power1;
var Power2 = globals.Power2;
var Power3 = globals.Power3;
var Power4 = globals.Power4;
var TweenPlugin = globals.TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function() {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				var self = this,
					v = self.vars,
					val, p;
				self._labels = {};
				self.autoRemoveChildren = !!v.autoRemoveChildren;
				self.smoothChildTiming = !!v.smoothChildTiming;
				self._sortChildren = true;
				self._onUpdate = v.onUpdate;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = self._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					self.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.00000001,
			TweenLiteInternals = TweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i], targets) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_defaultImmediateRender = function(tl, toVars, fromVars, defaultFalse) { //default to immediateRender:true unless otherwise set in toVars, fromVars or if defaultFalse is passed in as true
				var ir = "immediateRender";
				if (!(ir in toVars)) {
					toVars[ir] = !((fromVars && fromVars[ir] === false) || defaultFalse);
				}
				return toVars;
			},
			//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
			_distribute = function(v) {
				if (typeof(v) === "function") {
					return v;
				}
				var vars = (typeof(v) === "object") ? v : {each:v}, //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
					ease = vars.ease,
					from = vars.from || 0,
					base = vars.base || 0,
					cache = {},
					isFromKeyword = isNaN(from),
					axis = vars.axis,
					ratio = {center:0.5, end:1}[from] || 0;
				return function(i, target, a) {
					var l = (a || vars).length,
						distances = cache[l],
						originX, originY, x, y, d, j, max, min, wrap;
					if (!distances) {
						wrap = (vars.grid === "auto") ? 0 : (vars.grid || [Infinity])[0];
						if (!wrap) {
							max = -Infinity;
							while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) { }
							wrap--;
						}
						distances = cache[l] = [];
						originX = isFromKeyword ? (Math.min(wrap, l) * ratio) - 0.5 : from % wrap;
						originY = isFromKeyword ? l * ratio / wrap - 0.5 : (from / wrap) | 0;
						max = 0;
						min = Infinity;
						for (j = 0; j < l; j++) {
							x = (j % wrap) - originX;
							y = originY - ((j / wrap) | 0);
							distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
							if (d > max) {
								max = d;
							}
							if (d < min) {
								min = d;
							}
						}
						distances.max = max - min;
						distances.min = min;
						distances.v = l = vars.amount || (vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap)) || 0;
						distances.b = (l < 0) ? base - l : base;
					}
					l = (distances[i] - distances.min) / distances.max;
					return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
				};
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "2.1.3";
		TimelineLite.distribute = _distribute;
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, _defaultImmediateRender(this, vars)), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
			toVars = _defaultImmediateRender(this, toVars, fromVars);
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				staggerFunc = _distribute(vars.stagger || stagger),
				startAt = vars.startAt,
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //if the targets object is a selector, translate it into an array.
				targets = _slice(targets);
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (startAt) {
					copy.startAt = _copy(startAt);
					if (startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, staggerFunc(i, targets[i], targets));
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, _defaultImmediateRender(this, vars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			return this.staggerTo(targets, duration, _defaultImmediateRender(this, toVars, fromVars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			return this.add( new TweenLite(target, 0, _defaultImmediateRender(this, vars, null, true)), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var self = this,
				curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = self._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						self.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return self._uncache(true);
				} else if (typeof(value) === "string") {
					return self.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(self, value, position);

			if (value._time || (!value._duration && value._initted)) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				curTime = (self.rawTime() - value._startTime) * value._timeScale;
				if (!value._duration || Math.abs(Math.max(0, Math.min(value.totalDuration(), curTime))) - value._totalTime > 0.00001) {
					value.render(curTime, false, false);
				}
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (self._gc || self._time === self._duration) if (!self._paused) if (self._duration < self.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = self;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return self;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var self = this,
				prevTime = self._time,
				totalDur = (!self._dirty) ? self._totalDuration : self.totalDuration(),
				prevStart = self._startTime,
				prevTimeScale = self._timeScale,
				prevPaused = self._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime, pauseTime;
			if (prevTime !== self._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += self._time - prevTime;
			}
			if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
				if (time > prevTime) {
					tween = self._first;
					while (tween && tween._startTime <= time && !pauseTween) {
						if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
							pauseTween = tween;
						}
						tween = tween._next;
					}
				} else {
					tween = self._last;
					while (tween && tween._startTime >= time && !pauseTween) {
						if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
							pauseTween = tween;
						}
						tween = tween._prev;
					}
				}
				if (pauseTween) {
					self._time = self._totalTime = time = pauseTween._startTime;
					pauseTime = self._startTime + (self._reversed ? self._duration - time : time) / self._timeScale;
				}
			}
			if (time >= totalDur - _tinyNum && time >= 0) { //to work around occasional floating point math artifacts.
				self._totalTime = self._time = totalDur;
				if (!self._reversed) if (!self._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (self._duration === 0) if ((time <= 0 && time >= -_tinyNum) || self._rawPrevTime < 0 || self._rawPrevTime === _tinyNum) if (self._rawPrevTime !== time && self._first) {
						internalForce = true;
						if (self._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				self._rawPrevTime = (self._duration || !suppressEvents || time || self._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < _tinyNum) { //to work around occasional floating point math artifacts, round super small values to 0.
				self._totalTime = self._time = 0;
				if (time > -_tinyNum) {
					time = 0;
				}
				if (prevTime !== 0 || (self._duration === 0 && self._rawPrevTime !== _tinyNum && (self._rawPrevTime > 0 || (time < 0 && self._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = self._reversed;
				}
				if (time < 0) {
					self._active = false;
					if (self._timeline.autoRemoveChildren && self._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (self._rawPrevTime >= 0 && self._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					self._rawPrevTime = time;
				} else {
					self._rawPrevTime = (self._duration || !suppressEvents || time || self._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = self._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!self._initted) {
						internalForce = true;
					}
				}

			} else {
				self._totalTime = self._time = self._rawPrevTime = time;
			}
			if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!self._initted) {
				self._initted = true;
			}

			if (!self._active) if (!self._paused && self._time !== prevTime && time > 0) {
				self._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (self.vars.onStart) if (self._time !== 0 || !self._duration) if (!suppressEvents) {
				self._callback("onStart");
			}

			curTime = self._time;
			if (curTime >= prevTime) {
				tween = self._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== self._time || (self._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							self.pause();
							self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = self._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== self._time || (self._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > self._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							self.pause();
							self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (self._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				self._callback("onUpdate");
			}

			if (callback) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (self._time === 0 || totalDur >= self.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (self._timeline.autoRemoveChildren) {
						self._enabled(false, false);
					}
					self._active = false;
				}
				if (!suppressEvents && self.vars[callback]) {
					self._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) ; else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						self = this,
						tween = self._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && self._sortChildren && !tween._paused && !self._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							self._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							self.add(tween, tween._startTime - tween._delay);
							self._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (self._timeline.smoothChildTiming) {
								self._startTime += tween._startTime / self._timeScale;
								self._time -= tween._startTime;
								self._totalTime -= tween._startTime;
								self._rawPrevTime -= tween._startTime;
							}
							self.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					self._duration = self._totalDuration = max;
					self._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (value === false && this._paused) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first;
				while (tween) {
					if (tween._startTime === this._time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);

var TimelineLite = globals.TimelineLite;

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

	_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function() {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_globals = _gsScope._gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "2.1.3";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_valuesExpWithCommas = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_dummyElement = {style:{}},
			_doc = _gsScope.document || {createElement: function() {return _dummyElement;}},
			_createElement = function(type, ns) {
				var e = _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
				return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = (_gsScope.navigator || {}).userAgent || "",
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i+8, 2)) > 3));
				_isSafariLT6 = (_isSafari && (parseFloat(_agent.substr(_agent.indexOf("Version/")+8, 2)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (_gsScope.console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_computedStyleScope = (typeof(window) !== "undefined" ? window : _doc.defaultView || {getComputedStyle:function() {}}),
			_getComputedStyle = function(e) {
				return _computedStyleScope.getComputedStyle(e); //to avoid errors in Microsoft Edge, we need to call getComputedStyle() from a specific scope, typically window.
			},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || (!sfx && p !== "lineHeight")) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (p === "lineHeight" && !sfx) { //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
					cache = _getComputedStyle(t).lineHeight;
					t.style.lineHeight = v;
					pix = parseFloat(_getComputedStyle(t).lineHeight);
					t.style.lineHeight = cache;
				} else if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						if (_getStyle(node, "display").indexOf("flex") !== -1) { //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
							style.position = "absolute";
						}
						cache = node._gsCache;
						time = TweenLite.ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getCTM && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				var isRelative = (typeof(v) === "string" && v.charAt(1) === "=");
				if (typeof(v) === "string" && v.charAt(v.length - 2) === "v") { //convert vw and vh into px-equivalents.
					v = (isRelative ? v.substr(0, 2) : 0) + (window["inner" + ((v.substr(-2) === "vh") ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100));
				}
				return (v == null) ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(a[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = "",
					i, color, temp;
				if (!colors.length) {
					return s;
				}
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + " " + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!TweenLite.defaultStringFilter) {
			TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(delim === "," ? _valuesExp : _valuesExpWithCommas) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return ((pfx && v !== "none") ? v.substr(0, v.indexOf(vals[0])) || pfx : pfx) + vals.join(delim) + sfx; //note: prefix might be different, like for clipPath it could start with inset( or polygon(
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = mpt.r(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = !r ? r : (typeof(r) === "function") ? r : Math.round; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) { //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
						ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					} else {
						ba = ba.join(" ").split(",").join(", ").split(" ");
						ea = ea.join(" ").split(",").join(", ").split(" ");
					}
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i] + "";
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1) ? Math.round : false, true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						temp = ev; //original string value so we can look for any prefix later.
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), Math.round);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px") ? Math.round : false, (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.allowFunc = options.allowFunc;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _globals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = _gsScope.SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement || {},
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !_gsScope.chrome),
					svg, rect, width;
				if (_doc.createElementNS && _docElement.appendChild && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					if (b.x === 0 && b.y === 0 && b.width + b.height === 0) { //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
						b = {x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0, y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0, width:0, height:0};
					}
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					if (determinant) { //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
						x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
						y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
						xOrigin = decoratee.xOrigin = v[0] = x;
						yOrigin = decoratee.yOrigin = v[1] = y;
					}
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_getBBoxHack = function(swapIfPossible) { //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
				var svg = _createElement("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
					oldParent = this.parentNode,
					oldSibling = this.nextSibling,
					oldCSS = this.style.cssText,
					bbox;
				_docElement.appendChild(svg);
				svg.appendChild(this);
				this.style.display = "block";
				if (swapIfPossible) {
					try {
						bbox = this.getBBox();
						this._originalGetBBox = this.getBBox;
						this.getBBox = _getBBoxHack;
					} catch (e) { }
				} else if (this._originalGetBBox) {
					bbox = this._originalGetBBox();
				}
				if (oldSibling) {
					oldParent.insertBefore(this, oldSibling);
				} else {
					oldParent.appendChild(this);
				}
				_docElement.removeChild(svg);
				this.style.cssText = oldCSS;
				return bbox;
			},
			_getBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (error) {
					return _getBBoxHack.call(e, true);
				}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, nextSibling, parent;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (_transformProp && isDefault && !e.offsetParent && e !== _docElement) { //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
					//browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
					n = style.display;
					style.display = "block";
					parent = e.parentNode;
					if (!parent || !e.offsetParent) {
						dec = 1; //flag
						nextSibling = e.nextSibling;
						_docElement.appendChild(e); //we must add it to the DOM in order to get values properly
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else {
						_removeProp(style, "display");
					}
					if (dec) {
						if (nextSibling) {
							parent.insertBefore(e, nextSibling);
						} else if (parent) {
							parent.appendChild(e);
						} else {
							_docElement.removeChild(e);
						}
					}
				}
				if (tm.svg || (e.getCTM && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
						s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
						isDefault = 0;
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getCTM && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, cos, sin;
						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						//note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(angle);
							sin = Math.sin(angle);
							t1 = a11*cos+a21*sin;
							t2 = a12*cos+a22*sin;
							t3 = a13*cos+a23*sin;
							a21 = a21*cos-a11*sin;
							a22 = a22*cos-a12*sin;
							a23 = a23*cos-a13*sin;
							a11 = t1;
							a12 = t2;
							a13 = t3;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						//skewX
						angle = Math.atan2(a12, a22);

						//scales
						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						a11 /= tm.scaleX;
						a12 /= tm.scaleY;
						a21 /= tm.scaleX;
						a22 /= tm.scaleY;
						if (Math.abs(angle) > min) {
							tm.skewX = angle * _RAD2DEG;
							a12 = 0; //unskews
							if (tm.skewType !== "simple") {
								tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
							}

						} else {
							tm.skewX = 0;
						}

						/* //for testing purposes
						var transform = "matrix3d(",
							comma = ",",
							zero = "0";
						a13 /= tm.scaleZ;
						a23 /= tm.scaleZ;
						a31 /= tm.scaleX;
						a32 /= tm.scaleY;
						a33 /= tm.scaleZ;
						transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
						transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
						transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
						transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
						transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
						console.log(transform);
						document.querySelector(".test").style[_transformProp] = transform;
						*/

						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
						if (invX) {
							tm.scaleX *= -1;
							tm.skewX += (tm.rotation <= 0) ? 180 : -180;
							tm.rotation += (tm.rotation <= 0) ? 180 : -180;
						} else {
							tm.scaleY *= -1;
							tm.skewX += (tm.skewX <= 0) ? 180 : -180;
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							TweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							TweenLite.delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf( filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					skewY = t.skewY,
					skewX = t.skewX,
					t1,	a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd;
				if (skewY) { //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
					skewX += skewY;
					angle += skewY;
				}

				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (skewX) {
						angle -= skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((skewX - skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS a[row][column]
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var scaleFunc = (vars.scale && typeof(vars.scale) === "function") ? vars.scale : 0; //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).
			if (scaleFunc) {
				vars.scale = scaleFunc(_index, t);
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
			cssp._transform = m1;
			if ("rotationZ" in v) {
				v.rotation = v.rotationZ;
			}
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				if (orig.indexOf("%") !== -1) { //%-based translations will fail unless we set the width/height to match the original target...
					copy.width = _getStyle(t, "width");
					copy.height = _getStyle(t, "height");
				}
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.skewType === "simple") { //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
					m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
				}
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX);
				m2.skewY = _parseAngle(v.skewY, m1.skewY);
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = (typeof(v.transformOrigin) === "function") ? v.transformOrigin(_index, _target) : v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					if (!orig) {
						orig = (_getStyle(t, p, _cs, false, "50% 50%") + "").split(" ");
						orig = orig[0] + " " + orig[1] + " " + m1.zOrigin + "px";
					}
					orig += "";
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (scaleFunc) {
				vars.scale = scaleFunc;
			}
			return pt;
		}, allowFunc:true, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});
		_registerComplexSpecialProp("clipPath", {defaultValue:"inset(0%)", prefix:true, multi:true, formatter:_getFormatter("inset(0% 0% 0% 0%)", false, true)});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return (v.substr(0,2) === "co") ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			if (t.style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
				t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			}
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target);
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				sp = _specialProps[p]; //SpecialProp lookup.
				if (typeof(es) === "function" && !(sp && sp.allowFunc)) {
					es = es(_index, _target);
				}
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);
				} else if (p.substr(0,2) === "--") { //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
					this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
					continue;
				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = pt.r(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = pt.r(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function") { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
					pt.r = lookup[pt.p];
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(TweenLite.fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

var CSSPlugin = globals.CSSPlugin;

/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

_gsScope._gsDefine("easing.Back", ["easing.Ease"], function() {
		
		var w = (_gsScope.GreenSockGlobals || _gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true), 
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, ExpoScaleEase, RoughEase, _createElastic;
			
		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? (p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p) : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p); //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);
		
		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps, immediateStart) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + (immediateStart ? 0 : 1);
				this._p3 = immediateStart ? 1 : 0;
			}, true);
		p = SteppedEase.prototype = new Ease();	
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return (((this._p2 * p) | 0) + this._p3) * this._p1;
		};
		p.config = SteppedEase.config = function(steps, immediateStart) {
			return new SteppedEase(steps, immediateStart);
		};


		//ExpoScaleEase
		ExpoScaleEase = _class("easing.ExpoScaleEase", function(start, end, ease) {
			this._p1 = Math.log(end / start);
			this._p2 = end - start;
			this._p3 = start;
			this._ease = ease;
		}, true);
		p = ExpoScaleEase.prototype = new Ease();
		p.constructor = ExpoScaleEase;
		p.getRatio = function(p) {
			if (this._ease) {
				p = this._ease.getRatio(p);
			}
			return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
		};
		p.config = ExpoScaleEase.config = function(start, end, ease) {
			return new ExpoScaleEase(start, end, ease);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");
		
		return Back;
		
	}, true);

var Back = globals.Back;
var Elastic = globals.Elastic;
var Bounce = globals.Bounce;
var RoughEase = globals.RoughEase;
var SlowMo = globals.SlowMo;
var SteppedEase = globals.SteppedEase;
var Circ = globals.Circ;
var Expo = globals.Expo;
var Sine = globals.Sine;
var ExpoScaleEase = globals.ExpoScaleEase;

function isElement(el) {
  return el != null && typeof el === 'object' && el.nodeType === 1;
}

function canOverflow(overflow, skipOverflowHiddenElements) {
  if (skipOverflowHiddenElements && overflow === 'hidden') {
    return false;
  }

  return overflow !== 'visible' && overflow !== 'clip';
}

function isScrollable(el, skipOverflowHiddenElements) {
  if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
    var style = getComputedStyle(el, null);
    return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements);
  }

  return false;
}

function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return 0;
  }

  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
  }

  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
  }

  return 0;
}

var compute = (function (target, options) {
  var scrollMode = options.scrollMode,
      block = options.block,
      inline = options.inline,
      boundary = options.boundary,
      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
    return node !== boundary;
  };

  if (!isElement(target)) {
    throw new TypeError('Invalid target');
  }

  var scrollingElement = document.scrollingElement || document.documentElement;
  var frames = [];
  var cursor = target;

  while (isElement(cursor) && checkBoundary(cursor)) {
    cursor = cursor.parentNode;

    if (cursor === scrollingElement) {
      frames.push(cursor);
      break;
    }

    if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
      continue;
    }

    if (isScrollable(cursor, skipOverflowHiddenElements)) {
      frames.push(cursor);
    }
  }

  var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
  var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
  var viewportX = window.scrollX || pageXOffset;
  var viewportY = window.scrollY || pageYOffset;

  var _target$getBoundingCl = target.getBoundingClientRect(),
      targetHeight = _target$getBoundingCl.height,
      targetWidth = _target$getBoundingCl.width,
      targetTop = _target$getBoundingCl.top,
      targetRight = _target$getBoundingCl.right,
      targetBottom = _target$getBoundingCl.bottom,
      targetLeft = _target$getBoundingCl.left;

  var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
  var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
  var computations = [];

  for (var index = 0; index < frames.length; index++) {
    var frame = frames[index];

    var _frame$getBoundingCli = frame.getBoundingClientRect(),
        _height = _frame$getBoundingCli.height,
        _width = _frame$getBoundingCli.width,
        _top = _frame$getBoundingCli.top,
        right = _frame$getBoundingCli.right,
        bottom = _frame$getBoundingCli.bottom,
        _left = _frame$getBoundingCli.left;

    if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= _top && targetBottom <= bottom && targetLeft >= _left && targetRight <= right) {
      return computations;
    }

    var frameStyle = getComputedStyle(frame);
    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
    var blockScroll = 0;
    var inlineScroll = 0;
    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

    if (scrollingElement === frame) {
      if (block === 'start') {
        blockScroll = targetBlock;
      } else if (block === 'end') {
        blockScroll = targetBlock - viewportHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - viewportHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline;
      } else if (inline === 'center') {
        inlineScroll = targetInline - viewportWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - viewportWidth;
      } else {
        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
      }

      blockScroll = Math.max(0, blockScroll + viewportY);
      inlineScroll = Math.max(0, inlineScroll + viewportX);
    } else {
      if (block === 'start') {
        blockScroll = targetBlock - _top - borderTop;
      } else if (block === 'end') {
        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(_top, bottom, _height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - (_top + _height / 2) + scrollbarHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline - _left - borderLeft;
      } else if (inline === 'center') {
        inlineScroll = targetInline - (_left + _width / 2) + scrollbarWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
      } else {
        inlineScroll = alignNearest(_left, right, _width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
      }

      var scrollLeft = frame.scrollLeft,
          scrollTop = frame.scrollTop;
      blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - _height + scrollbarHeight));
      inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - _width + scrollbarWidth));
      targetBlock += scrollTop - blockScroll;
      targetInline += scrollLeft - inlineScroll;
    }

    computations.push({
      el: frame,
      top: blockScroll,
      left: inlineScroll
    });
  }

  return computations;
});

function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var canSmoothScroll = 'scrollBehavior' in document.body.style;
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(targetIsDetached ? [] : compute(target, options));
  }

  if (targetIsDetached) {
    return;
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
}

var memoizedNow;

var now = function now() {
  if (!memoizedNow) {
    memoizedNow = 'performance' in window ? performance.now.bind(performance) : Date.now;
  }

  return memoizedNow();
};

function step(context) {
  var time = now();
  var elapsed = Math.min((time - context.startTime) / context.duration, 1);
  var value = context.ease(elapsed);
  var currentX = context.startX + (context.x - context.startX) * value;
  var currentY = context.startY + (context.y - context.startY) * value;
  context.method(currentX, currentY);

  if (currentX !== context.x || currentY !== context.y) {
    requestAnimationFrame(function () {
      return step(context);
    });
  } else {
    context.cb();
  }
}

function smoothScroll(el, x, y, duration, ease, cb) {
  if (duration === void 0) {
    duration = 600;
  }

  if (ease === void 0) {
    ease = function ease(t) {
      return 1 + --t * t * t * t * t;
    };
  }

  var scrollable;
  var startX;
  var startY;
  var method;
  scrollable = el;
  startX = el.scrollLeft;
  startY = el.scrollTop;

  method = function method(x, y) {
    el.scrollLeft = x;
    el.scrollTop = y;
  };

  step({
    scrollable: scrollable,
    method: method,
    startTime: now(),
    startX: startX,
    startY: startY,
    x: x,
    y: y,
    duration: duration,
    ease: ease,
    cb: cb
  });
}

var shouldSmoothScroll = function shouldSmoothScroll(options) {
  return options && !options.behavior || options.behavior === 'smooth';
};

function scroll(target, options) {
  var overrides = options || {};

  if (shouldSmoothScroll(overrides)) {
    return scrollIntoView(target, {
      block: overrides.block,
      inline: overrides.inline,
      scrollMode: overrides.scrollMode,
      boundary: overrides.boundary,
      behavior: function behavior(actions) {
        return Promise.all(actions.reduce(function (results, _ref) {
          var el = _ref.el,
              left = _ref.left,
              top = _ref.top;
          var startLeft = el.scrollLeft;
          var startTop = el.scrollTop;

          if (startLeft === left && startTop === top) {
            return results;
          }

          return results.concat([new Promise(function (resolve) {
            return smoothScroll(el, left, top, overrides.duration, overrides.ease, function () {
              return resolve({
                el: el,
                left: [startLeft, left],
                top: [startTop, top]
              });
            });
          })]);
        }, []));
      }
    });
  }

  return Promise.resolve(scrollIntoView(target, options));
}

var smoothScrollIntoView = scroll;

/*! Hammer.JS - v2.0.15 - 2019-04-04
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;

if (typeof Object.assign !== 'function') {
  assign = function assign(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }

    return output;
  };
} else {
  assign = Object.assign;
}

var assign$1 = assign;

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = typeof document === "undefined" ? {
  style: {}
} : document.createElement('div');
var TYPE_FUNCTION = 'function';
var round = Math.round,
    abs = Math.abs;
var now$1 = Date.now;

/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var prefix;
  var prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);
  var i = 0;

  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = prefix ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }

    i++;
  }

  return undefined;
}

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {};
} else {
  win = window;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION) {
    return false;
  }

  var touchMap = {};
  var cssSupports = win.CSS && win.CSS.supports;
  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
  });
  return touchMap;
}

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
var SUPPORT_TOUCH = 'ontouchstart' in win;
var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * @private
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}

/**
 * @private
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */

function boolOrFn(val, args) {
  if (typeof val === TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}

/**
 * @private
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
  return str.indexOf(find) > -1;
}

/**
 * @private
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */

function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  } // pan-x OR pan-y


  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  } // manipulation


  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}

/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */

var TouchAction =
/*#__PURE__*/
function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = value.toLowerCase().trim();
  };
  /**
   * @private
   * just re-set the touchAction value
   */


  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  };
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */


  _proto.compute = function compute() {
    var actions = [];
    each(this.manager.recognizers, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  };
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */


  _proto.preventDefaults = function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      // do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  };
  /**
   * @private
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */


  _proto.preventSrc = function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  };

  return TouchAction;
}();

/**
 * @private
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

/**
 * @private
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */

function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;
  var i = 0;

  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}

/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */

function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;

  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now$1(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}

/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */

function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}

/**
 * @private
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */

function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */

function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

function computeDeltaXY(session, input) {
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * @private
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}

/**
 * @private
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */

function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

/**
 * @private
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */

function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */

function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}

/**
* @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */

function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  } // to compute scale and rotation we need to store the multiple touches


  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now$1();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;

  if (hasParent(input.srcEvent.target, target)) {
    target = input.srcEvent.target;
  }

  input.target = target;
}

/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */

function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  } // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'


  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}

/**
 * @private
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
  return str.trim().split(/\s+/g);
}

/**
 * @private
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function addEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.addEventListener(type, handler, false);
  });
}

/**
 * @private
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function removeEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.removeEventListener(type, handler, false);
  });
}

/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || window;
}

/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */

var Input =
/*#__PURE__*/
function () {
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {};
  /**
   * @private
   * bind the events
   */


  _proto.init = function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };
  /**
   * @private
   * unbind the events
   */


  _proto.destroy = function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };

  return Input;
}();

/**
 * @private
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;

    while (i < src.length) {
      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
        // do not use === here, test fails
        return i;
      }

      i++;
    }

    return -1;
  }
}

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (win.MSPointerEvent && !win.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */


var PointerEventInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    var proto = PointerEventInput.prototype;
    proto.evEl = POINTER_ELEMENT_EVENTS;
    proto.evWin = POINTER_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.store = _this.manager.session.pointerEvents = [];
    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) {
      return;
    } // update the event in the store


    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  };

  return PointerEventInput;
}(Input);

/**
 * @private
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}

/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */

function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];

    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }

    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function (a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(TouchInput, _Input);

  function TouchInput() {
    var _this;

    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);

    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return TouchInput;
}(Input);

function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i;
  var targetTouches;
  var changedTouches = toArray(ev.changedTouches);
  var changedTargetTouches = [];
  var target = this.target; // get target touches from touches

  targetTouches = allTouches.filter(function (touch) {
    return hasParent(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    i = 0;

    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  } // filter changed touches to only contain touches that exist in the collected target ids


  i = 0;

  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    } // cleanup removed touches


    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }

    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(MouseInput, _Input);

  function MouseInput() {
    var _this;

    var proto = MouseInput.prototype;
    proto.evEl = MOUSE_ELEMENT_EVENTS;
    proto.evWin = MOUSE_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.pressed = false; // mousedown state

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return MouseInput;
}(Input);

/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function setLastTouch(eventData) {
  var _eventData$changedPoi = eventData.changedPointers,
      touch = _eventData$changedPoi[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    var lts = this.lastTouches;
    this.lastTouches.push(lastTouch);

    var removeLastTouch = function removeLastTouch() {
      var i = lts.indexOf(lastTouch);

      if (i > -1) {
        lts.splice(i, 1);
      }
    };

    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function isSyntheticEvent(eventData) {
  var x = eventData.srcEvent.clientX;
  var y = eventData.srcEvent.clientY;

  for (var i = 0; i < this.lastTouches.length; i++) {
    var t = this.lastTouches[i];
    var dx = Math.abs(x - t.x);
    var dy = Math.abs(y - t.y);

    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
      return true;
    }
  }

  return false;
}

var TouchMouseInput =
/*#__PURE__*/
function () {
  var TouchMouseInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose(TouchMouseInput, _Input);

    function TouchMouseInput(_manager, callback) {
      var _this;

      _this = _Input.call(this, _manager, callback) || this;

      _this.handler = function (manager, inputEvent, inputData) {
        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
          return;
        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


        if (isTouch) {
          recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
          return;
        }

        _this.callback(manager, inputEvent, inputData);
      };

      _this.touch = new TouchInput(_this.manager, _this.handler);
      _this.mouse = new MouseInput(_this.manager, _this.handler);
      _this.primaryTouch = null;
      _this.lastTouches = [];
      return _this;
    }
    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */


    var _proto = TouchMouseInput.prototype;

    /**
     * @private
     * remove the event listeners
     */
    _proto.destroy = function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    };

    return TouchMouseInput;
  }(Input);

  return TouchMouseInput;
}();

/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */

function createInputInstance(manager) {
  var Type; // let inputClass = manager.options.inputClass;

  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}

/**
 * @private
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */

function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
  return _uniqueId++;
}

/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;

  if (manager) {
    return manager.get(otherRecognizer);
  }

  return otherRecognizer;
}

/**
 * @private
 * get a usable string, used as event postfix
 * @param {constant} state
 * @returns {String} state
 */

function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}

/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */

var Recognizer =
/*#__PURE__*/
function () {
  function Recognizer(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = _extends({
      enable: true
    }, options);
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

    this.manager && this.manager.touchAction.update();
    return this;
  };
  /**
   * @private
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  };
  /**
   * @private
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  };
  /**
   * @private
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.requireFailure = function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  };
  /**
   * @private
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);

    if (index > -1) {
      this.requireFail.splice(index, 1);
    }

    return this;
  };
  /**
   * @private
   * has require failures boolean
   * @returns {boolean}
   */


  _proto.hasRequireFailures = function hasRequireFailures() {
    return this.requireFail.length > 0;
  };
  /**
   * @private
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */


  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  };
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */


  _proto.emit = function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  };
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */


  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) {
      return this.emit(input);
    } // it's failing anyway


    this.state = STATE_FAILED;
  };
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */


  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  };
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  };
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */


  _proto.process = function process(inputData) {};
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */


  _proto.getTouchAction = function getTouchAction() {};
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */


  _proto.reset = function reset() {};

  return Recognizer;
}();

var defaults = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: true,

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
   * Default recognizer setup when calling `Hammer()`
   * When creating a new Manager these will be skipped.
   * @type {Array}
   */
  preset: [],

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
};

var STOP = 1;
var FORCED_STOP = 2;
/**
 * @private
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var element = manager.element;

  if (!element.style) {
    return;
  }

  var prop;
  each(manager.options.cssProps, function (value, name) {
    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || "";
    }
  });

  if (!add) {
    manager.oldCssProps = {};
  }
}
/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent("Event");
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}
/**
* @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Manager =
/*#__PURE__*/
function () {
  function Manager(element, options) {
    var _this = this;

    this.options = assign$1({}, defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = _this.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    assign$1(this.options, options); // Options that need a little more setup

    if (options.touchAction) {
      this.touchAction.update();
    }

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  };
  /**
   * @private
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */


  _proto.stop = function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  };
  /**
   * @private
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    var session = this.session;

    if (session.stopped) {
      return;
    } // run the touch-action polyfill


    this.touchAction.preventDefaults(inputData);
    var recognizer;
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      session.curRecognizer = null;
      curRecognizer = null;
    }

    var i = 0;

    while (i < recognizers.length) {
      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.

      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        session.curRecognizer = recognizer;
        curRecognizer = recognizer;
      }

      i++;
    }
  };
  /**
   * @private
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */


  _proto.get = function get(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;

    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizer) {
        return recognizers[i];
      }
    }

    return null;
  };
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */


  _proto.add = function add(recognizer) {
    if (invokeArrayArg(recognizer, "add", this)) {
      return this;
    } // remove existing


    var existing = this.get(recognizer.options.event);

    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  };
  /**
   * @private
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */


  _proto.remove = function remove(recognizer) {
    if (invokeArrayArg(recognizer, "remove", this)) {
      return this;
    }

    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var recognizers = this.recognizers;
      var index = inArray(recognizers, targetRecognizer);

      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }

    return this;
  };
  /**
   * @private
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */


  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  };
  /**
   * @private unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */


  _proto.off = function off(events, handler) {
    if (events === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  };
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */


  _proto.emit = function emit(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    } // no handlers, so skip it all


    var handlers = this.handlers[event] && this.handlers[event].slice();

    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    var i = 0;

    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  };
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */


  _proto.destroy = function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  return Manager;
}();

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */

var SingleTouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(SingleTouchInput, _Input);

  function SingleTouchInput() {
    var _this;

    var proto = SingleTouchInput.prototype;
    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.started = false;
    return _this;
  }

  var _proto = SingleTouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return SingleTouchInput;
}(Input);

function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}

/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */

var AttrRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(AttrRecognizer, _Recognizer);

  function AttrRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _Recognizer.call(this, _extends({
      pointers: 1
    }, options)) || this;
  }
  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */


  var _proto = AttrRecognizer.prototype;

  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  };
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */


  _proto.process = function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return AttrRecognizer;
}(Recognizer);

/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */

var TapRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(TapRecognizer, _Recognizer);

  function TapRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, options)) || this; // previous time and center,
    // used for tap counting

    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this3 = this;

    this._timer = setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return TapRecognizer;
}(Recognizer);

/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */

function directionStr(direction) {
  if (direction === DIRECTION_DOWN) {
    return 'down';
  } else if (direction === DIRECTION_UP) {
    return 'up';
  } else if (direction === DIRECTION_LEFT) {
    return 'left';
  } else if (direction === DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}

/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var PanRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PanRecognizer, _AttrRecognizer);

  function PanRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _AttrRecognizer.call(this, _extends({
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    }, options)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];

    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }

    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }

    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);

    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PanRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var SwipeRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

  function SwipeRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    }, options)) || this;
  }

  var _proto = SwipeRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  };

  _proto.attrTest = function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  };

  _proto.emit = function emit(input) {
    var direction = directionStr(input.offsetDirection);

    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  };

  return SwipeRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */

var PinchRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'pinch',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PinchRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */

var RotateRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

  function RotateRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'rotate',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = RotateRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  };

  return RotateRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */

var PressRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(PressRecognizer, _Recognizer);

  function PressRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, options)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + "up", input);
    } else {
      this._input.timeStamp = now$1();
      this.manager.emit(this.options.event, this._input);
    }
  };

  return PressRecognizer;
}(Recognizer);

/**
 * @private
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
  return function () {
    var e = new Error('get-stack-trace');
    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
    var log = window.console && (window.console.warn || window.console.log);

    if (log) {
      log.call(window.console, deprecationMessage, stack);
    }

    return method.apply(this, arguments);
  };
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */

var extend = deprecate(function (dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;

  while (i < keys.length) {
    if (!merge || merge && dest[keys[i]] === undefined) {
      dest[keys[i]] = src[keys[i]];
    }

    i++;
  }

  return dest;
}, 'extend', 'Use `assign`.');

/**
 * @private
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */

var merge = deprecate(function (dest, src) {
  return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * @private
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */

function inherit(child, base, properties) {
  var baseP = base.prototype;
  var childP;
  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    assign$1(childP, properties);
  }
}

/**
 * @private
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}

/**
 * @private
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */

var Hammer =
/*#__PURE__*/
function () {
  var Hammer =
  /**
    * @private
    * @const {string}
    */
  function Hammer(element, options) {
    if (options === void 0) {
      options = {};
    }

    return new Manager(element, _extends({
      recognizers: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
      [RotateRecognizer, {
        enable: false
      }], [PinchRecognizer, {
        enable: false
      }, ['rotate']], [SwipeRecognizer, {
        direction: DIRECTION_HORIZONTAL
      }], [PanRecognizer, {
        direction: DIRECTION_HORIZONTAL
      }, ['swipe']], [TapRecognizer], [TapRecognizer, {
        event: 'doubletap',
        taps: 2
      }, ['tap']], [PressRecognizer]]
    }, options));
  };

  Hammer.VERSION = "2.0.15";
  Hammer.DIRECTION_ALL = DIRECTION_ALL;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
  Hammer.DIRECTION_UP = DIRECTION_UP;
  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  Hammer.DIRECTION_NONE = DIRECTION_NONE;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.INPUT_START = INPUT_START;
  Hammer.INPUT_MOVE = INPUT_MOVE;
  Hammer.INPUT_END = INPUT_END;
  Hammer.INPUT_CANCEL = INPUT_CANCEL;
  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
  Hammer.STATE_BEGAN = STATE_BEGAN;
  Hammer.STATE_CHANGED = STATE_CHANGED;
  Hammer.STATE_ENDED = STATE_ENDED;
  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
  Hammer.STATE_CANCELLED = STATE_CANCELLED;
  Hammer.STATE_FAILED = STATE_FAILED;
  Hammer.Manager = Manager;
  Hammer.Input = Input;
  Hammer.TouchAction = TouchAction;
  Hammer.TouchInput = TouchInput;
  Hammer.MouseInput = MouseInput;
  Hammer.PointerEventInput = PointerEventInput;
  Hammer.TouchMouseInput = TouchMouseInput;
  Hammer.SingleTouchInput = SingleTouchInput;
  Hammer.Recognizer = Recognizer;
  Hammer.AttrRecognizer = AttrRecognizer;
  Hammer.Tap = TapRecognizer;
  Hammer.Pan = PanRecognizer;
  Hammer.Swipe = SwipeRecognizer;
  Hammer.Pinch = PinchRecognizer;
  Hammer.Rotate = RotateRecognizer;
  Hammer.Press = PressRecognizer;
  Hammer.on = addEventListeners;
  Hammer.off = removeEventListeners;
  Hammer.each = each;
  Hammer.merge = merge;
  Hammer.extend = extend;
  Hammer.bindFn = bindFn;
  Hammer.assign = assign$1;
  Hammer.inherit = inherit;
  Hammer.bindFn = bindFn;
  Hammer.prefixed = prefixed;
  Hammer.toArray = toArray;
  Hammer.inArray = inArray;
  Hammer.uniqueArray = uniqueArray;
  Hammer.splitStr = splitStr;
  Hammer.boolOrFn = boolOrFn;
  Hammer.hasParent = hasParent;
  Hammer.addEventListeners = addEventListeners;
  Hammer.removeEventListeners = removeEventListeners;
  Hammer.defaults = defaults;
  return Hammer;
}();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lodash_defaultsdeep = createCommonjsModule(function (module, exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeMax = Math.max,
    nativeNow = Date.now;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function(args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = defaultsDeep;
});

const DEFAULT_FPS = 60;
const SCOPES = {};

var rafCallback = (callback, fps = DEFAULT_FPS) => (...passedArgs) => requestAnimationFrame(() => {
  const msCurrent = new Date().getTime();
  const fpsInterval = 1000 / fps;

  SCOPES[callback] = SCOPES[callback] || null;

  const msDelta = SCOPES[callback] ? msCurrent - SCOPES[callback] : null;

  if (msDelta === null || msDelta > fpsInterval) {
    SCOPES[callback] = msCurrent - (msDelta % fpsInterval);
    callback(...passedArgs);
  }
});

/**
 * Checks if OS prefers reduced motion
 */
function prefersReducedMotion () {
  if (!window.matchMedia) {
    return false
  }

  const matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (matchMediaObj) {
    return matchMediaObj.matches
  }

  return false
}

const APPLICATION_MOBILE_MENU_OPEN = 'APPLICATION:MOBILE_MENU:OPEN';
const APPLICATION_MOBILE_MENU_CLOSED = 'APPLICATION:MOBILE_MENU:CLOSED';

const APPLICATION_PRELUDIUM = 'APPLICATION_PRELUDIUM';
const APPLICATION_INITIALIZED = 'APPLICATION:INITIALIZED';
const APPLICATION_READY = 'APPLICATION:READY';
const APPLICATION_REVEALED = 'APPLICATION:REVEALED';
const APPLICATION_RESIZE = 'APPLICATION:RESIZE';
const APPLICATION_SCROLL = 'APPLICATION:SCROLL';
const APPLICATION_SCROLL_LOCKED = 'APPLICATION:SCROLL_LOCKED';
const APPLICATION_SCROLL_RELEASED = 'APPLICATION:SCROLL_RELEASED';

const APPLICATION_VISIBILITY_CHANGE = 'APPLICATION:VISIBILITY_CHANGE';
const APPLICATION_HIDDEN = 'APPLICATION:HIDDEN';
const APPLICATION_VISIBLE = 'APPLICATION:VISIBLE';

var index = /*#__PURE__*/Object.freeze({
	APPLICATION_MOBILE_MENU_OPEN: APPLICATION_MOBILE_MENU_OPEN,
	APPLICATION_MOBILE_MENU_CLOSED: APPLICATION_MOBILE_MENU_CLOSED,
	APPLICATION_PRELUDIUM: APPLICATION_PRELUDIUM,
	APPLICATION_INITIALIZED: APPLICATION_INITIALIZED,
	APPLICATION_READY: APPLICATION_READY,
	APPLICATION_REVEALED: APPLICATION_REVEALED,
	APPLICATION_RESIZE: APPLICATION_RESIZE,
	APPLICATION_SCROLL: APPLICATION_SCROLL,
	APPLICATION_SCROLL_LOCKED: APPLICATION_SCROLL_LOCKED,
	APPLICATION_SCROLL_RELEASED: APPLICATION_SCROLL_RELEASED,
	APPLICATION_VISIBILITY_CHANGE: APPLICATION_VISIBILITY_CHANGE,
	APPLICATION_HIDDEN: APPLICATION_HIDDEN,
	APPLICATION_VISIBLE: APPLICATION_VISIBLE
});

const DEFAULT_OPTIONS = {
  runListenerOnInit: false,
  breakpoints: [
    'xs',
    'sm',
    'md',
    'lg'
  ],

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

class Breakpoints {
  constructor (app, opts = {}) {
    this.app = app;
    this.mediaQueries = {};
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS);
    window.addEventListener(APPLICATION_INITIALIZED, this.initialize.bind(this));
  }

  initialize () {
    this.opts.breakpoints.forEach(size => { this.mediaQueries[size] = this._getVal(`--breakpoint-${size}`); });

    const keys = Object.keys(this.mediaQueries);
    keys.forEach(key => {
      let query = '';
      const next = keys[(keys.indexOf(key) + 1) % keys.length];
      if (key === this.opts.breakpoints[0] && this.mediaQueries[key] === '0') {
        query = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[next]) - 1}px)`;
      } else if (next === this.opts.breakpoints[0]) {
        // max size
        query = `(min-width: ${this.mediaQueries[key]})`;
      } else {
        query = `(min-width: ${this.mediaQueries[key]}) and (max-width: ${parseInt(this.mediaQueries[next]) - 1}px)`;
      }

      this.mediaQueries[key] = window.matchMedia(query);

      if (Object.prototype.hasOwnProperty.call(this.opts.listeners, key)) {
        this.mediaQueries[key].addListener(this.opts.listeners[key]);
      }
    });

    if (this.opts.runListenerOnInit) {
      const { key, mq } = this.getCurrentBreakpoint();
      if (Object.prototype.hasOwnProperty.call(this.opts.listeners, key)) {
        this.opts.listeners[key](mq);
      }
    }
  }

  getCurrentBreakpoint () {
    const key = Object
      .keys(this.mediaQueries)
      .find(q => this.mediaQueries[q].matches);

    return { key, mq: this.mediaQueries[key] }
  }

  _getVal (key) {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
  }
}

const DEFAULT_OPTIONS$1 = {
  faderOpts: {
    fadeIn: (callback = () => {}) => {
      const fader = document.querySelector('#fader');

      TweenLite.to(fader, 0.65, {
        opacity: 0,
        ease: Power1.easeInOut,
        delay: 0.35,
        onComplete: () => {
          TweenLite.set(fader, { display: 'none' });
          document.body.classList.remove('unloaded');
          callback();
        }
      });
    }
  }
};

class Application {
  constructor (opts = {}) {
    this.size = {
      width: 0,
      height: 0
    };

    this.position = {
      top: 0,
      left: 0
    };

    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$1);
    this.breakpoints = new Breakpoints(this, this.opts.breakpointConfig);
    this.fader = null;
    this.callbacks = {};
    this.SCROLLBAR_WIDTH = null;
    this.getScrollBarWidth();
    console.log(this.SCROLLBAR_WIDTH);
    this.INITIALIZED = false;

    this.PREFERS_REDUCED_MOTION = prefersReducedMotion();
    if (this.PREFERS_REDUCED_MOTION) {
      // TODO: TweenMax :(
      // TweenLite.globalTimeScale(200)
      document.documentElement.classList.add('prefers-reduced-motion');
    }

    this.beforeInitializedEvent = new window.CustomEvent(APPLICATION_PRELUDIUM, this);
    this.initializedEvent = new window.CustomEvent(APPLICATION_INITIALIZED, this);
    this.readyEvent = new window.CustomEvent(APPLICATION_READY, this);

    /**
     * Grab common events and defer
     */
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    window.addEventListener('orientationchange', this.onResize.bind(this));
    window.addEventListener('scroll', rafCallback(this.onScroll.bind(this)));
    window.addEventListener('resize', rafCallback(this.onResize.bind(this)));

    TweenLite.defaultEase = Sine.easeOut;
  }

  /**
   * Main init. Called from client application on DOMReady.
   */
  initialize () {
    this._emitBeforeInitializedEvent();
    this.executeCallbacks(APPLICATION_PRELUDIUM);
    this.setupGridoverlay();
    this._emitInitializedEvent();
    this.executeCallbacks(APPLICATION_INITIALIZED);
    this.ready();
  }

  /**
  * Application is initialized and ready.
  * Fade in, then execute callbacks
  */
  ready () {
    this.fadeIn();
    this._emitReadyEvent();
    this.executeCallbacks(APPLICATION_READY);
  }

  /**
   * Fade in application, as declared in the `faderOpts`
   */
  fadeIn () {
    this.opts.faderOpts.fadeIn(this._emitRevealedEvent.bind(this));
  }

  /**
   * Register callbacks by `type`
   */
  registerCallback (type, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.callbacks, type)) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(callback);
  }

  /**
   * Execute callbacks by `type`
   */
  executeCallbacks (type) {
    if (!Object.prototype.hasOwnProperty.call(this.callbacks, type)) {
      return
    }
    this.callbacks[type].forEach(cb => cb(this));
  }

  /**
   * Check if document is scrolled
   */
  isScrolled () {
    return (window.pageYOffset
      || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) > 0
  }

  scrollLock () {
    const ev = new window.CustomEvent(APPLICATION_SCROLL_LOCKED, this);
    window.dispatchEvent(ev);
    this.SCROLL_LOCKED = true;
    TweenLite.set(document.body, { overflow: 'hidden' });
    document.addEventListener('touchmove', this.scrollVoid, false);
  }

  scrollRelease () {
    const ev = new window.CustomEvent(APPLICATION_SCROLL_RELEASED, this);
    window.dispatchEvent(ev);
    this.SCROLL_LOCKED = false;
    TweenLite.set(document.body, { clearProps: 'overflow' });
    document.removeEventListener('touchmove', this.scrollVoid, false);
  }

  scrollVoid (e) {
    e.preventDefault();
  }

  getScrollBarWidth () {
    if (!this.SCROLLBAR_WIDTH) {
      // Creating invisible container
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // forcing scrollbar to appear
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
      document.body.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement('div');
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      this.SCROLLBAR_WIDTH = (outer.offsetWidth - inner.offsetWidth);

      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);
    }
  }

  /**
   * Event emitters
   */
  _emitBeforeInitializedEvent () {
    window.dispatchEvent(this.beforeInitializedEvent);
  }

  _emitInitializedEvent () {
    window.dispatchEvent(this.initializedEvent);
    this.INITIALIZED = true;
  }

  _emitReadyEvent () {
    window.dispatchEvent(this.readyEvent);
  }

  _emitRevealedEvent () {
    const ev = new window.CustomEvent(APPLICATION_REVEALED, this);
    window.dispatchEvent(ev);
  }

  /**
   * RAF'ed resize event
   */
  onResize (e) {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    const evt = new CustomEvent(APPLICATION_RESIZE, e);
    window.dispatchEvent(evt);
  }

  /**
  * RAF'ed scroll event
  */
  onScroll (e) {
    if (this.SCROLL_LOCKED) {
      e.preventDefault();
      return
    }

    this.position.top = window.pageYOffset;
    this.position.left = window.pageXOffset;

    const evt = new CustomEvent(APPLICATION_SCROLL, e);
    window.dispatchEvent(evt);
  }

  onVisibilityChange (e) {
    let evt = new CustomEvent(APPLICATION_VISIBILITY_CHANGE, e);
    window.dispatchEvent(evt);

    if (document.visibilityState === 'hidden') {
      evt = new CustomEvent(APPLICATION_HIDDEN, e);
      window.dispatchEvent(evt);
    } else if (document.visibilityState === 'visible') {
      evt = new CustomEvent(APPLICATION_VISIBLE, e);
      window.dispatchEvent(evt);
    }
  }

  /**
   * CTRL-G to show grid overlay
   */
  setupGridoverlay () {
    const gridKeyPressed = e => {
      if (e.keyCode === 71 && e.ctrlKey) {
        const guides = document.querySelector('.__dbg');
        guides.classList.toggle('visible');
      }
    };
    document.onkeydown = gridKeyPressed;
  }
}

const DEFAULT_OPTIONS$2 = {
  onAccept: c => {
    const timeline = new TimelineLite();
    c.setCookie('cookielaw_accepted', 1);

    timeline
      .to(c.cc, 0.35, { y: '100%', ease: Power3.easeIn }, '0')
      .to(c.inner, 0.3, { opacity: 0, ease: Power3.easeIn }, '0')
      .set(c.cc, { display: 'none' });
  },

  showCC: c => {
    const timeline = new TimelineLite();

    timeline
      .fromTo(
        c.cc,
        0.5,
        { y: '100%', display: 'block' },
        { y: '0%', delay: '0.5', ease: Power3.easeOut },
        '0',
      )
      .fromTo(
        c.text,
        0.7,
        { opacity: 0 },
        { opacity: 1, ease: Power3.easeOut },
        '-=0.35',
      )
      .fromTo(
        c.btns,
        0.7,
        { opacity: 0 },
        { opacity: 1, ease: Power3.easeOut },
        '-=0.35',
      );
  }
};

class Cookies {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$2);

    this.cc = document.querySelector('.cookie-container');
    this.inner = document.querySelector('.cookie-container-inner');
    this.text = document.querySelector('.cookie-law-text');
    this.btns = document.querySelector('.cookie-law-buttons');
    this.btn = document.querySelector('.dismiss-cookielaw');

    if (!this.btn) {
      return
    }

    window.addEventListener(APPLICATION_READY, () => { this.opts.showCC(this); });

    this.btn.addEventListener('click', () => {
      this.opts.onAccept(this);
    });
  }

  getCookie (sKey) {
    if (!sKey) {
      return null
    }
    return decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')) || null
  }

  setCookie (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
          break
        case String:
          sExpires = `; expires=${vEnd}`;
          break
        case Date:
          sExpires = `; expires=${vEnd.toUTCString()}`;
          break
        default:
          break
      }
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
    return true
  }

  removeCookie (sKey, sPath, sDomain) {
    if (!this.hasCookie(sKey)) { return false }
    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}`;
    return true
  }

  hasCookie (sKey) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false }
    return (new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`)).test(document.cookie)
  }

  keys () {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/);
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx += 1) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys
  }
}

// import Headroom from 'headroom.js'

const DEFAULT_OPTIONS$3 = {};

class CoverOverlay {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$3);
    this.initialize();
  }

  initialize () {
    const coveredModules = document.querySelectorAll('[data-cover-overlay]');

    Array.from(coveredModules).forEach(v => {
      const overlay = v.querySelector('.picture-wrapper');
      const btn = v.querySelector('[data-cover-overlay-button]');
      const iframe = v.querySelector('iframe');
      let player;

      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

      if (v.hasAttribute('data-cover-overlay-vimeo-play')) {
        if (window.Vimeo) {
          player = new window.Vimeo.Player(iframe);
        } else {
          console.error('==> JUPITER// Missing vimeo JS');
        }
      }

      btn.addEventListener('click', () => {
        const timeline = new TimelineLite();

        timeline
          .set(iframe, { opacity: 1 })
          .to(btn, 0.5, { opacity: 0, ease: Sine.easeIn })
          .to(overlay, 1, { opacity: 0, ease: Sine.easeIn })
          .set(overlay, { display: 'none' })
          .call(() => {
            if (player) {
              player.play();
            }
          });
      });
    });
  }
}

/**
 * A header that stays fixed. Hides when scrolling down and is revealed on scrolling up.
 *
 * You can pass different configs for different sections:
 *
 *  this.header = new FixedHeader(
      document.querySelector('header'),
      {
        default: {
          offset: 60,
          offsetSmall: 1,
          offsetBg: 200,
          regBgColor: 'transparent'
        },

        sections: {
          index: {
            offsetBg: '#content'
          }
        }
      }
    )
 *
 */

const DEFAULT_EVENTS = {
  onPin: h => {
    TweenLite.to(
      h.el,
      0.35,
      {
        yPercent: '0',
        ease: Sine.easeOut,
        autoRound: true
      },
    );
  },

  onUnpin: h => {
    h._hiding = true;
    TweenLite.to(
      h.el,
      0.25,
      {
        yPercent: '-100',
        ease: Sine.easeIn,
        autoRound: true,
        onComplete: () => {
          h._hiding = false;
        }
      },
    );
  },

  onAltBg: h => {
    TweenLite.to(
      h.el,
      0.2,
      {
        backgroundColor: h.opts.altBgColor
      },
    );
  },

  onNotAltBg: h => {
    TweenLite.to(
      h.el,
      0.4,
      {
        backgroundColor: h.opts.regBgColor
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  onSmall: h => {},
  // eslint-disable-next-line no-unused-vars
  onNotSmall: h => {},
  // eslint-disable-next-line no-unused-vars
  onTop: h => {},
  // eslint-disable-next-line no-unused-vars
  onNotTop: h => {},
  // eslint-disable-next-line no-unused-vars
  onBottom: h => {},
  // eslint-disable-next-line no-unused-vars
  onNotBottom: h => {}
};

const DEFAULT_OPTIONS$4 = {
  el: 'header[data-nav]',
  default: {
    canvas: window,
    enter: h => {
      const timeline = new TimelineLite();
      timeline
        .set(h.el, { yPercent: -100 })
        .set(h.lis, { opacity: 0 })
        .to(h.el, 1, {
          yPercent: 0, delay: h.opts.enterDelay, ease: Power3.easeOut, autoRound: true
        })
        .staggerTo(h.lis, 0.8, { opacity: 1, ease: Sine.easeIn }, 0.1, '-=1');
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0, // how far from the top before we trigger hide
    offsetSmall: 50, // how far from the top before we trigger the shrinked padding,
    offsetBg: 200, // how far down before changing backgroundcolor
    regBgColor: 'transparent',
    altBgColor: '#ffffff',
    ...DEFAULT_EVENTS
  }
};

class FixedHeader {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$4);

    if (typeof this.opts.el === 'string') {
      this.el = document.querySelector(this.opts.el);
    } else {
      this.el = this.opts.el;
    }

    if (!this.el) {
      return
    }


    const section = document.body.getAttribute('data-script');
    this.opts = this._getOptionsForSection(section, opts);

    this.lis = this.el.querySelectorAll('li');

    this._firstLoad = true;
    this._pinned = true;
    this._top = false;
    this._bottom = false;
    this._small = false;
    this._altBg = false;
    this._isResizing = false;
    this._hiding = false; // if we're in the process of hiding the bar
    this.lastKnownScrollY = 0;
    this.currentScrollY = 0;
    this.mobileMenuOpen = false;
    this.timer = null;
    this.resetResizeTimer = null;

    this.initialize();
  }

  initialize () {
    // bind to canvas scroll
    this.lastKnownScrollY = this.getScrollY();
    this.currentScrollY = this.lastKnownScrollY;

    if (typeof this.opts.offsetBg === 'string') {
      // get offset of element, with height of header subtracted
      const elm = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = elm.offsetTop;
    }

    window.addEventListener(APPLICATION_RESIZE, this.setResizeTimer.bind(this), false);
    window.addEventListener(APPLICATION_SCROLL, this.update.bind(this), false);
    window.addEventListener(APPLICATION_READY, this.unpinIfScrolled.bind(this));

    this.redraw(true);
    this._bindMobileMenuListeners();
  }

  isScrolled () {
    return (window.pageYOffset
      || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0) > 0
  }

  unpinIfScrolled () {
    if (this.isScrolled()) {
      // page is scrolled on ready -- unpin
      this.unpin();
    }
  }

  setResizeTimer () {
    this._isResizing = true;

    if (this._pinned) {
      // unpin if resizing to prevent visual clutter
      this.unpin();
    }

    if (this.resetResizeTimer) {
      clearTimeout(this.resetResizeTimer);
    }
    this.resetResizeTimer = setTimeout(() => {
      this._isResizing = false;
      clearTimeout(this.resetResizeTimer);
      this.resetResizeTimer = null;
    }, 500);
  }

  update () {
    this.redraw(false);
  }

  checkSize (force) {
    if (this.currentScrollY > this.opts.offsetSmall) {
      if (force) {
        this.small();
      } else if (!this._small) {
        this.small();
      }
    } else if (force) {
      this.notSmall();
    } else if (this._small) {
      this.notSmall();
    }
  }

  checkBg (force) {
    if (this.currentScrollY > this.opts.offsetBg) {
      if (force) {
        this.altBg();
      } else if (!this._altBg && !this._hiding) {
        this.altBg();
      }
    } else if (force) {
      this.notAltBg();
    } else if (this._altBg) {
      this.notAltBg();
    }
  }

  checkTop (force) {
    if (this.currentScrollY <= this.opts.offset) {
      if (force) {
        this.top();
      } else if (!this._top) {
        this.top();
      }
    } else if (force) {
      this.notTop();
    } else if (this._top) {
      this.notTop();
    }
  }

  checkBot (force) {
    if (this.currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
      if (force) {
        this.bottom();
      } else if (!this._bottom) {
        this.bottom();
      }
    } else if (force) {
      this.notBottom();
    } else if (this._bottom) {
      this.notBottom();
    }
  }

  checkPin (force, toleranceExceeded) {
    if (this.shouldUnpin(toleranceExceeded)) {
      if (this.mobileMenuOpen) {
        return
      }
      if (force) {
        this.unpin();
      } else if (this._pinned) {
        this.unpin();
      }
    } else if (this.shouldPin(toleranceExceeded)) {
      if (force) {
        this.pin();
      } else if (!this._pinned) {
        this.pin();
      }
    }
  }

  redraw (force = false, enter = true) {
    if (force && this.opts.enter) {
      this.checkSize(force);
      this.checkBg(force);
      this.checkTop(force);

      if (enter) {
        this.opts.enter(this);
      }

      return
    }

    this.currentScrollY = this.getScrollY();
    const toleranceExceeded = this.toleranceExceeded();

    if (this.isOutOfBounds()) { // Ignore bouncy scrolling in OSX
      return
    }

    this.checkSize(force);
    this.checkBg(force);
    this.checkTop(force);
    this.checkBot(force);
    this.checkPin(force, toleranceExceeded);

    this.lastKnownScrollY = this.currentScrollY;

    this._firstLoad = false;
  }

  notTop () {
    this._top = false;
    this.el.removeAttribute('data-header-top');
    this.el.setAttribute('data-header-not-top', '');
    this.opts.onNotTop(this);
  }

  top () {
    this._top = true;
    this.el.setAttribute('data-header-top', '');
    this.el.removeAttribute('data-header-not-top');
    this.opts.onTop(this);
  }

  notBottom () {
    this._bottom = false;
    this.el.setAttribute('data-header-not-bottom', '');
    this.el.removeAttribute('data-header-bottom');
    this.opts.onNotBottom(this);
  }

  bottom () {
    this._bottom = true;
    this.el.setAttribute('data-header-bottom', '');
    this.el.removeAttribute('data-header-not-bottom');
    this.opts.onBottom(this);
  }

  unpin () {
    this._pinned = false;
    this.el.setAttribute('data-header-unpinned', '');
    this.el.removeAttribute('data-header-pinned');
    this.opts.onUnpin(this);
  }

  pin () {
    this._pinned = true;
    this.el.setAttribute('data-header-pinned', '');
    this.el.removeAttribute('data-header-unpinned');
    this.opts.onPin(this);
  }

  notSmall () {
    this._small = false;
    this.el.setAttribute('data-header-big', '');
    this.el.removeAttribute('data-header-small');
    this.opts.onNotSmall(this);
  }

  small () {
    this._small = true;
    this.el.setAttribute('data-header-small', '');
    this.el.removeAttribute('data-header-big');
    this.opts.onSmall(this);
  }

  notAltBg () {
    this._altBg = false;
    this.el.setAttribute('data-header-reg-bg', '');
    this.el.removeAttribute('data-header-alt-bg');
    this.opts.onNotAltBg(this);
  }

  altBg () {
    this._altBg = true;
    this.el.setAttribute('data-header-alt-bg', '');
    this.el.removeAttribute('data-header-reg-bg');
    this.opts.onAltBg(this);
  }

  shouldUnpin (toleranceExceeded) {
    const scrollingDown = this.currentScrollY > this.lastKnownScrollY;
    const pastOffset = this.currentScrollY >= this.opts.offset;

    return scrollingDown && pastOffset && toleranceExceeded
  }

  shouldPin (toleranceExceeded) {
    if (this._isResizing) {
      return false
    }

    const scrollingUp = this.currentScrollY < this.lastKnownScrollY;
    const pastOffset = this.currentScrollY <= this.opts.offset;

    return (scrollingUp && toleranceExceeded) || pastOffset
  }

  isOutOfBounds () {
    const pastTop = this.currentScrollY < 0;
    const pastBottom = this.currentScrollY
      + this.getScrollerPhysicalHeight()
      > this.getScrollerHeight();

    return pastTop || pastBottom
  }

  getScrollerPhysicalHeight () {
    return (this.opts.canvas === window || this.opts.canvas === document.body)
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(this.opts.canvas)
  }

  getScrollerHeight () {
    return (this.opts.canvas === window || this.opts.canvas === document.body)
      ? this.getDocumentHeight()
      : this.getElementHeight(this.opts.canvas)
  }

  getDocumentHeight () {
    const { body } = document;
    const { documentElement } = document;

    return Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, documentElement.clientHeight,
    )
  }

  getViewportHeight () {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
  }

  getElementHeight (el) {
    return Math.max(
      el.scrollHeight,
      el.offsetHeight,
      el.clientHeight,
    )
  }

  getElementPhysicalHeight (el) {
    return Math.max(
      el.offsetHeight,
      el.clientHeight,
    )
  }

  getScrollY () {
    if (this.opts.canvas.pageYOffset !== undefined) {
      return this.opts.canvas.pageYOffset
    }
    if (this.opts.canvas.scrollTop !== undefined) {
      return this.opts.canvas.scrollTop
    }
    return (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  toleranceExceeded () {
    return Math.abs(this.currentScrollY - this.lastKnownScrollY) >= this.opts.tolerance
  }

  _getOptionsForSection (section, opts) {
    // if section is not a key in opts, return default opts
    if (!Object.prototype.hasOwnProperty.call(opts, 'sections') || !Object.prototype.hasOwnProperty.call(opts, section)) {
      return opts.default
    }

    // merge in default events, in case they're not supplied
    const sectionOpts = opts.sections[section];
    opts = lodash_defaultsdeep(sectionOpts, DEFAULT_EVENTS, opts.default || {});
    return opts
  }

  _bindMobileMenuListeners () {
    window.addEventListener('APPLICATION:MOBILE_MENU:OPEN', this._onMobileMenuOpen.bind(this));
    window.addEventListener('APPLICATION:MOBILE_MENU:CLOSED', this._onMobileMenuClose.bind(this));
  }

  _onMobileMenuOpen () {
    this.mobileMenuOpen = true;
  }

  _onMobileMenuClose () {
    this.mobileMenuOpen = false;
  }
}

const DEFAULT_OPTIONS$5 = {
  shadow: false,
  shadowColor: 'rgba(255, 255, 255, 1)'
};

class FooterReveal {
  constructor (app, opts) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$5);

    const main = document.querySelector('main');
    const footer = document.querySelector('[data-footer-reveal]');
    // fix footer
    TweenLite.set(footer, {
      'z-index': -100,
      position: 'fixed',
      bottom: 0
    });
    const footerHeight = footer.offsetHeight;
    // add height as margin
    TweenLite.set(main, { marginBottom: footerHeight });
    if (this.opts.shadow) {
      const shadowStyle = `0 50px 50px -20px ${this.opts.shadowColor}`;
      main.style.mozBoxShadow = shadowStyle;
      main.style.webkitBoxShadow = shadowStyle;
      main.style.boxShadow = shadowStyle;
    }
  }
}

// Default Settings
const DEFAULT_OPTIONS$6 = {
  el: '[data-parallax]',
  speed: -2,
  center: false,
  wrapper: null,
  relativeToWrapper: false,
  round: true,
  callback () { }
};

class Parallax {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$6);

    this.posY = 0;
    this.screenY = 0;
    this.posX = 0;
    this.screenX = 0;
    this.blocks = [];
    this.pause = true;

    // store the id for later use
    this.loopId = null;

    // Test via a getter in the options object to see if the passive property is accessed
    this.supportsPassive = true;

    // check which transform property to use
    this.transformProp = window.transformProp || (() => {
      const testEl = document.createElement('div');
      if (testEl.style.transform === null) {
        const vendors = ['Webkit', 'Moz', 'ms'];
        for (let i = 0; i < vendors.length; i += 1) {
          if (testEl.style[`${vendors[i]}Transform`] !== undefined) {
            return `${vendors[i]}Transform`
          }
        }
      }
      return 'transform'
    });

    this.el = this.opts.el;

    // check if el is a className or a node
    this.elements = typeof el === 'string' ? document.querySelectorAll(this.el) : [this.el];

    // Now query selector
    if (this.elements.length > 0) {
      this.elems = this.elements;
    } else {
      console.warn('PARALLAX: The elements you\'re trying to select don\'t exist.');
      return
    }

    // Has a wrapper and it exists
    if (this.opts.wrapper) {
      if (!this.opts.wrapper.nodeType) {
        const wrapper = document.querySelector(this.opts.wrapper);

        if (wrapper) {
          this.opts.wrapper = wrapper;
        } else {
          console.warn('PARALLAX: The wrapper you\'re trying to use doesn\'t exist.');
          return
        }
      }
    }

    // Init
    this.init();

    // Allow to recalculate the initial values whenever we want
    this.refresh = this.init;
  }

  // Loop
  updateLoop () {
    if (this.setPosition() && this.pause === false) {
      this.animate();

      // loop again
      this.loopId = window.requestAnimationFrame(this.updateLoop.bind(this));
    } else {
      this.loopId = null;

      // Don't animate until we get a position updating event
      window.addEventListener('resize', this.deferredUpdate.bind(this));
      window.addEventListener('orientationchange', this.deferredUpdate.bind(this));
      window.addEventListener('scroll', this.deferredUpdate.bind(this), this.supportsPassive ? { passive: true } : false);
      window.addEventListener('touchmove', this.deferredUpdate.bind(this), this.supportsPassive ? { passive: true } : false);
    }
  }

  // Get and cache initial position of all elements
  cacheBlocks () {
    for (let i = 0; i < this.elems.length; i += 1) {
      const block = this.createBlock(this.elems[i]);
      this.blocks.push(block);
    }
  }

  init () {
    for (let i = 0; i < this.blocks.length; i += 1) {
      this.elems[i].style.cssText = this.blocks[i].style;
    }

    this.blocks = [];

    this.screenY = window.innerHeight;
    this.screenX = window.innerWidth;

    this.setPosition();
    this.cacheBlocks();

    this.animate();

    // If paused, unpause and set listener for window resizing events
    if (this.pause) {
      window.addEventListener('resize', this.init.bind(this));
      this.pause = false;
      // Start the loop
      this.updateLoop();
    }
  }

  createBlock (el) {
    const dataPercentage = el.getAttribute('data-rellax-percentage');
    const dataSpeed = el.getAttribute('data-rellax-speed');
    const dataZindex = el.getAttribute('data-rellax-zindex') || 0;
    const dataMin = el.getAttribute('data-rellax-min');
    const dataMax = el.getAttribute('data-rellax-max');

    // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
    // ensures elements are positioned based on HTML layout.
    //
    // If the element has the percentage attribute, the posY and posX needs to be
    // the current scroll position's value, so that the elements are still
    // positioned based on HTML layout
    let wrapperPosY = this.opts.wrapper
      ? this.opts.wrapper.scrollTop
      : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
    // If the option relativeToWrapper is true, use the wrappers offset to top,
    // subtracted from the current page scroll.
    if (this.opts.relativeToWrapper) {
      const scrollPosY = (
        window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
      );
      wrapperPosY = scrollPosY - this.opts.wrapper.offsetTop;
    }
    const posY = (dataPercentage || this.opts.center ? wrapperPosY : 0);
    const posX = 0;

    const blockTop = posY + el.getBoundingClientRect().top;
    const blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

    const blockLeft = posX + el.getBoundingClientRect().left;
    const blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

    // apparently parallax equation everyone uses
    let percentageY = dataPercentage
      || (posY - blockTop + this.screenY) / (blockHeight + this.screenY);
    let percentageX = dataPercentage
      || (posX - blockLeft + this.screenX) / (blockWidth + this.screenX);
    if (this.opts.center) { percentageX = 0.5; percentageY = 0.5; }

    // Optional individual block speed as data attr, otherwise global speed
    const speed = dataSpeed || this.opts.speed;

    const bases = this.updatePosition(percentageX, percentageY, speed);

    // ~~Store non-translate3d transforms~~
    // Store inline styles and extract transforms
    const style = el.style.cssText;
    let transform = '';

    // Check if there's an inline styled transform
    const searchResult = /transform\s*:/i.exec(style);
    if (searchResult) {
      // Get the index of the transform
      const { index } = searchResult;

      // Trim the style to the transform point and get the following semi-colon index
      const trimmedStyle = style.slice(index);
      const delimiter = trimmedStyle.indexOf(';');

      // Remove "transform" string and save the attribute
      if (delimiter) {
        transform = ` ${trimmedStyle.slice(11, delimiter).replace(/\s/g, '')}`;
      } else {
        transform = ` ${trimmedStyle.slice(11).replace(/\s/g, '')}`;
      }
    }

    return {
      baseX: bases.x,
      baseY: bases.y,
      top: blockTop,
      left: blockLeft,
      height: blockHeight,
      width: blockWidth,
      speed,
      style,
      transform,
      zindex: dataZindex,
      min: dataMin,
      max: dataMax
    }
  }

  // set scroll position (posY, posX)
  // side effect method is not ideal, but okay for now
  // returns true if the scroll changed, false if nothing happened
  setPosition () {
    const oldY = this.posY;

    this.posY = this.opts.wrapper
      ? this.opts.wrapper.scrollTop
      : (document.documentElement || document.body.parentNode || document.body).scrollTop
        || window.pageYOffset;
    this.posX = this.opts.wrapper
      ? this.opts.wrapper.scrollLeft
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft
        || window.pageXOffset;
    // If option relativeToWrapper is true, use relative wrapper value instead.
    if (this.opts.relativeToWrapper) {
      const scrollPosY = (document.documentElement
        || document.body.parentNode
        || document.body).scrollTop || window.pageYOffset;
      this.posY = scrollPosY - this.opts.wrapper.offsetTop;
    }

    if (oldY !== this.posY) {
      // scroll changed, return true
      return true
    }

    // scroll did not change
    return false
  }

  // Ahh a pure function, gets new transform value
  // based on scrollPosition and speed
  // Allow for decimal pixel values
  updatePosition (percentageX, percentageY, speed) {
    const result = {};
    const valueX = (speed * (100 * (1 - percentageX)));
    const valueY = (speed * (100 * (1 - percentageY)));

    result.x = this.opts.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
    result.y = this.opts.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

    return result
  }

  // Remove event listeners and loop again
  deferredUpdate () {
    window.removeEventListener('resize', this.deferredUpdate.bind(this));
    window.removeEventListener('orientationchange', this.deferredUpdate.bind(this));
    window.removeEventListener('scroll', this.deferredUpdate.bind(this), this.supportsPassive ? { passive: true } : false);
    window.removeEventListener('touchmove', this.deferredUpdate.bind(this), this.supportsPassive ? { passive: true } : false);

    // loop again
    this.loopId = window.requestAnimationFrame(this.updateLoop.bind(this));
  }

  // Transform3d on parallax element
  animate () {
    let positions;
    for (let i = 0; i < this.elems.length; i += 1) {
      const percentageY = (
        (this.posY - this.blocks[i].top + this.screenY)
        / (this.blocks[i].height + this.screenY));
      const percentageX = (
        (this.posX - this.blocks[i].left + this.screenX)
        / (this.blocks[i].width + this.screenX));

      // Subtracting initialize value, so element stays in same spot as HTML
      positions = this.updatePosition(percentageX, percentageY, this.blocks[i].speed);
      let positionY = positions.y - this.blocks[i].baseY;

      // The next two "if" blocks go like this:
      // Check if a limit is defined (first "min", then "max");
      // Check if we need to change the Y or the X
      // (Currently working only if just one of the axes is enabled)
      // Then, check if the new position is inside the allowed limit
      // If so, use new position. If not, set position to limit.

      // Check if a min limit is defined
      if (this.blocks[i].min !== null) {
        positionY = positionY <= this.blocks[i].min ? this.blocks[i].min : positionY;
      }

      // Check if a max limit is defined
      if (this.blocks[i].max !== null) {
        positionY = positionY >= this.blocks[i].max ? this.blocks[i].max : positionY;
      }

      const { zindex } = this.blocks[i];

      // Move that element
      // (Set the new translation and append initial inline transforms.)
      const translate = `${'translate3d(0px,'}${positionY}px,${zindex}px) ${this.blocks[i].transform}`;
      this.elems[i].style[this.transformProp] = translate;
    }
    this.opts.callback(positions);
  }

  destroy () {
    for (let i = 0; i < this.elems.length; i += 1) {
      this.elems[i].style.cssText = this.blocks[i].style;
    }

    // Remove resize event listener if not pause, and pause
    if (!this.pause) {
      window.removeEventListener('resize', this.init);
      this.pause = true;
    }

    // Clear the animation loop to prevent possible memory leak
    window.cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }
}

/**
 *
 * HERO SLIDER
 * ============
 *
 * ## Example
 *
 *    const hs = HeroSlider(sliderEl, opts)
 *
 */

if ('objectFit' in document.documentElement.style === false) {
  document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.forEach.call(document.querySelectorAll('.hero-bg img'), image => {
      (image.runtimeStyle || image.style).background = `url("${image.src}") no-repeat 50%/${image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit')}`;
      image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    });
  });
}

const DEFAULT_OPTIONS$7 = {
  el: '[data-hero-slider]',
  /* time between slides */
  interval: 4.2,
  /* the slide number we start with */
  initialSlideNumber: 0,
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
    type: 'parallax',
    /* how much to scale when 'idle' */
    scale: 1.05
  }
};

class HeroSlider {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$7);

    if (typeof this.opts.el === 'string') {
      this.el = document.querySelector(this.opts.el);
    } else {
      this.el = this.opts.el;
    }

    if (!this.el) {
      return
    }

    this.initialize();
  }

  initialize () {
    this._addResizeHandler();
    // style the container
    TweenLite.set(this.el, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0
    });

    this.slides = this.el.querySelectorAll('[data-hero-slide]');
    this.images = this.el.querySelectorAll('.hero-slide-img');

    this.slideCount = this.slides.length - 1;
    this._currentSlideIdx = this.opts.initialSlideNumber;

    // style the slides
    Array.from(this.slides).forEach(s => {
      TweenLite.set(s, {
        zIndex: this.opts.zIndex.regular,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      });

      const img = s.querySelector('.hero-slide-img');

      if (img) {
        TweenLite.set(img, {
          width: document.body.clientWidth,
          height: '100%',
          top: 0,
          left: 0,
          position: 'absolute'
        });
      } else {
        console.error('==> JUPITER/HEROSLIDER: MISSING .hero-slide-img INSIDE [data-hero-slide]');
      }
    });

    this.slides[0].style.zIndex = this.opts.zIndex.visible;
    if (this.slides[1]) {
      this.slides[1].style.zIndex = this.opts.zIndex.next;
    }

    const fadeIn = () => {
      if (this.slides.length > 1) {
        TweenLite.to(this.el, 0.250, {
          opacity: 1,
          onComplete: () => { this.next(); }
        });
      } else {
        TweenLite.to(this.el, 0.250, {
          opacity: 1
        });
      }
    };

    window.addEventListener(APPLICATION_READY, () => {
      /* Wait for the first image to load, then fade in container element */
      const firstImg = this.slides[this._currentSlideIdx].querySelector('img');

      if (firstImg) {
        if (firstImg.complete) {
          fadeIn();
        } else {
          firstImg.onload = () => {
            fadeIn();
          };
        }
      } else {
        // could be a video?
        const firstVid = this.slides[this._currentSlideIdx].querySelector('video');
        if (firstVid.complete) {
          fadeIn();
        } else {
          firstVid.oncanplay = () => {
            if (prefersReducedMotion()) {
              firstVid.stop();
            } else {
              firstVid.play();
            }

            fadeIn();
          };
        }
      }
    });
  }

  /**
   * Calculate which slide is next, and call the slide function
   */
  next () {
    if (prefersReducedMotion()) {
      return
    }

    if (this._currentSlideIdx === this.slideCount) {
      this._previousSlide = this.slides[this._currentSlideIdx];
      // last slide --> next slide will be 0
      this._currentSlideIdx = 0;
      this._nextSlide = this.slides[this._currentSlideIdx + 1];
    } else {
      this._previousSlide = this.slides[this._currentSlideIdx];
      this._currentSlideIdx = this._currentSlideIdx + 1;
      if (this._currentSlideIdx === this.slideCount) {
        [this._nextSlide] = this.slides;
      } else {
        this._nextSlide = this.slides[this._currentSlideIdx + 1];
      }
    }

    this._currentSlide = this.slides[this._currentSlideIdx];

    this.slide();
  }

  /**
   * Switches between slides
   */
  slide () {
    const timeline = new TimelineLite();

    switch (this.opts.transition.type) {
      case 'fade':
        timeline
          .set(this._currentSlide, {
            opacity: 0,
            scale: 1,
            zIndex: this.opts.zIndex.visible
          })
          .set(this._nextSlide, {
            opacity: 0
          })
          .to(this._previousSlide, this.opts.interval, {
            scale: this.opts.transition.scale
          })
          .to(this._currentSlide, this.opts.transition.duration, {
            opacity: 1,
            delay: this.opts.interval - this.opts.transition.duration,
            force3D: true,
            ease: Sine.easeInOut
          })
          .set(this._previousSlide, {
            opacity: 0
          })
          .call(() => {
            this._nextSlide.style.zIndex = this.opts.zIndex.visible;
            this._currentSlide.style.zIndex = this.opts.zIndex.regular;
            this._previousSlide.style.zIndex = this.opts.zIndex.regular;
            this.next();
          }, null, this);

        break

      case 'parallax':
        timeline
          .set(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            scale: 1.0,
            width: '100%'
          })
          .fromTo(this._previousSlide, this.opts.interval, {
            overflow: 'hidden'
          }, {
            scale: this.opts.transition.scale
          })
          .to(this._previousSlide, this.opts.transition.duration, {
            width: 0,
            ease: Power3.easeIn,
            autoRound: true,
            overwrite: 'preexisting'
          })
          .set(this._nextSlide, {
            zIndex: this.opts.zIndex.next
          })
          .set(this._currentSlide, {
            zIndex: this.opts.zIndex.visible,
            width: '100%'
          })
          .set(this._previousSlide, {
            zIndex: this.opts.zIndex.regular,
            scale: 1.0,
            width: '100%'
          })
          .call(this.next, null, this);

        break

      default:
        console.error('==> JUPITER/HEROSLIDER: Unrecognized `opts.transition.type` option.');
    }
  }

  /**
   * Add a window resize handler that resizes slide widths
   */
  _addResizeHandler () {
    this.observer = new IntersectionObserver(entries => {
      const [{ isIntersecting }] = entries;
      if (isIntersecting) {
        this._resizeSlides();
        window.addEventListener(APPLICATION_RESIZE, this._resizeSlides.bind(this));
      } else {
        window.removeEventListener(APPLICATION_RESIZE, this._resizeSlides.bind(this));
      }
    });

    this.observer.observe(this.el);
  }

  _resizeSlides () {
    TweenLite.to(this.images, 0.150, {
      width: document.body.clientWidth,
      overwrite: 'all'
    });
  }
}

/**
 *
 * HERO VIDEO
 *
 * ## Example
 *
 *    const hs = HeroVideo(opts)
 *
 */

if ('objectFit' in document.documentElement.style === false) {
  document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.forEach.call(document.querySelectorAll('[data-hero-background]'), image => {
      (image.runtimeStyle || image.style).background = `url("${image.src}") no-repeat 50%/${image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit')}`;
      image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    });
  });
}

const DEFAULT_OPTIONS$8 = {
  el: '[data-hero-video]',
  onFadeIn: hero => {
    TweenLite.to(hero.el, 1, {
      opacity: 1
    });
  }
};

class HeroVideo {
  constructor (app, opts = {}) {
    this.app = app;
    this.booting = true;
    this.playing = false;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$8);

    if (typeof this.opts.el === 'string') {
      this.el = document.querySelector(this.opts.el);
    } else {
      this.el = this.opts.el;
    }

    if (!this.el) {
      return
    }

    this.initialize();
  }

  initialize () {
    this._addResizeHandler();
    // style the container
    TweenLite.set(this.el, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0
    });

    this.videoDiv = this.el.querySelector('[data-hero-video-content]');
    this.video = this.videoDiv.querySelector('video');

    this.addObserver();
    this.addEvents();

    TweenLite.set(this.videoDiv, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    });

    if (!this.video) {
      console.error('==> JUPITER/HEROVIDEO: MISSING <video> INSIDE [data-hero-video-content]');
      return
    }
    this.video.muted = true;

    TweenLite.set(this.video, {
      width: document.body.clientWidth,
      height: '100%',
      top: 0,
      left: 0,
      position: 'absolute'
    });

    window.addEventListener(APPLICATION_INITIALIZED, () => {
      /* Wait for the video to load, then fade in container element */
      if (!this.video.playing && !prefersReducedMotion() && this.video.readyState >= 3) {
        this.play();
        this.fadeIn();
        this.booting = false;
      }
    });
  }

  addEvents () {
    this.video.addEventListener('canplay', () => {
      if (!this.playing) {
        if (!prefersReducedMotion()) {
          this.play();
          this.fadeIn();
          this.booting = false;
        } else {
          TweenLite.set(this.el, { opacity: 1 });
        }
      }
    });
  }

  play () {
    this.video.play();
    this.playing = true;
  }

  pause () {
    this.video.pause();
    this.playing = false;
  }

  fadeIn () {
    this.opts.onFadeIn(this);
  }

  addObserver () {
    const observer = new IntersectionObserver(entries => {
      const [{ isIntersecting }] = entries;
      if (isIntersecting) {
        if (!this.booting && !this.playing) {
          this.play();
        } else {
          this.play();
          this.fadeIn();
          this.booting = false;
        }
      } else if (this.playing) {
        this.pause();
      }
    });

    observer.observe(this.el);
  }

  /**
   * Add a window resize handler that resizes video width
   */
  _addResizeHandler () {
    this.observer = new IntersectionObserver(entries => {
      const [{ isIntersecting }] = entries;
      if (isIntersecting) {
        this._resize();
        window.addEventListener(APPLICATION_RESIZE, this._resize.bind(this));
      } else {
        window.removeEventListener(APPLICATION_RESIZE, this._resize.bind(this));
      }
    });

    this.observer.observe(this.el);
  }

  _resize () {
    TweenLite.to(this.video, 0.150, {
      width: document.body.clientWidth,
      overwrite: 'all'
    });
  }
}

const DEFAULT_OPTIONS$9 = {
  intersectionObserverConfig: {
    rootMargin: '350px 0px',
    threshold: 0.0
  },
  useNativeLazyloadIfAvailable: true,
  mode: 'default'
};

class Lazyload {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$9);
    this.initialize();
  }

  initialize () {
    // if we have native lazyload, use it.
    if ('loading' in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      const lazyImages = document.querySelectorAll('[data-ll-image]');
      lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
        this.swapImage(img);
      });

      const lazyPictures = document.querySelectorAll('[data-ll-srcset]');
      lazyPictures.forEach(picture => {
        picture.querySelectorAll('img').forEach(img => {
          img.setAttribute('loading', 'lazy');
        });
        this.swapPicture(picture);
      });
    } else {
      this.imgObserver = new IntersectionObserver(
        this.lazyloadImages.bind(this),
        this.opts.intersectionObserverConfig
      );

      this.lazyImages = document.querySelectorAll('[data-ll-image]');
      this.lazyImages.forEach(img => {
        img.setAttribute('data-ll-blurred', '');
        this.imgObserver.observe(img);
      });

      this.pictureObserver = new IntersectionObserver(
        this.lazyloadPictures.bind(this),
        this.opts.intersectionObserverConfig
      );

      this.lazyPictures = document.querySelectorAll('[data-ll-srcset]');
      this.lazyPictures.forEach(picture => {
        picture.querySelectorAll('img').forEach(img => { img.setAttribute('data-ll-blurred', ''); });
        this.pictureObserver.observe(picture);
      });
    }
  }

  lazyloadImages (elements) {
    elements.forEach(item => {
      if (item.intersectionRatio > 0) {
        const image = item.target;
        this.swapImage(image);
        this.imgObserver.unobserve(image);
      }
    });
  }

  lazyloadPictures (elements) {
    elements.forEach(item => {
      if (item.intersectionRatio > 0) {
        const picture = item.target;
        this.swapPicture(picture);
        this.pictureObserver.unobserve(picture);
      }
    });
  }

  swapImage (image) {
    image.src = image.dataset.src;
    image.setAttribute('data-ll-loaded', '');
  }

  swapPicture (picture) {
    // gather all the source elements in picture
    const sources = picture.querySelectorAll('source');

    for (let s = 0; s < sources.length; s += 1) {
      const source = sources[s];

      if (source.hasAttribute('srcset')) {
        source.setAttribute('srcset', source.dataset.srcset);
        source.setAttribute('data-ll-loaded', '');
      }
    }

    const img = picture.querySelector('img');

    img.addEventListener('load', () => {
      img.removeAttribute('data-ll-placeholder');
      img.removeAttribute('data-ll-blurred');
    }, false);

    img.setAttribute('src', img.dataset.src);
    img.setAttribute('data-ll-loaded', '');

    // safari sometimes caches, so force load
    if (img.complete) {
      img.removeAttribute('data-ll-placeholder');
      img.removeAttribute('data-ll-blurred');
      img.setAttribute('data-ll-loaded', '');
    }
  }
}

function imageIsLoaded (img) {
  return new Promise(resolve => {
    if (img.complete) {
      resolve({ img, status: 'ok' });
    } else {
      img.onload = () => {
        resolve({ img, status: 'ok' });
      };
      img.onerror = () => {
        resolve({ img, status: 'error' });
      };
    }
  })
}

function imagesAreLoaded (imgs) {
  const promises = [];

  for (let i = 0; i < imgs.length; i += 1) {
    const img = imgs[i];
    promises.push(imageIsLoaded(img));
  }

  return Promise.all(promises)
}

TweenLite.defaultEase = Sine.easeOut;

const DEFAULT_OPTIONS$a = {
  captions: false,

  elements: {
    arrowRight: () => {
      const sp1 = document.createElement('span');
      sp1.classList.add('arrow-r');
      sp1.appendChild(document.createTextNode('→'));
      return sp1
    },

    arrowLeft: () => {
      const sp1 = document.createElement('span');
      sp1.classList.add('arrow-l');
      sp1.appendChild(document.createTextNode('←'));
      return sp1
    },

    close: () => document.createTextNode('×'),
    dot: () => document.createTextNode('▪')
  },

  onClose: h => {
    if (h.opts.captions) {
      TweenLite.to(h.caption, 0.45, { opacity: 0 });
    }

    TweenLite.to([h.imgWrapper, h.nextArrow, h.prevArrow, h.close, h.dots], 0.50, {
      opacity: 0,
      onComplete: () => {
        TweenLite.to(h.wrapper, 0.45, {
          opacity: 0,
          onComplete: () => {
            h.wrapper.parentNode.removeChild(h.wrapper);
          }
        });
      }
    });
  }
};

class Lightbox {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$a);

    this.lightboxes = document.querySelectorAll('[data-lightbox]');
    this.fader = document.querySelector('#fader');
    this.imgs = [];
    this.imgAlts = [];
    this.sections = {};
    this.currentIdx = null;

    this.lightboxes.forEach(lightbox => {
      const href = lightbox.getAttribute('data-lightbox');
      const imgInLightbox = lightbox.querySelector('img');
      const alt = imgInLightbox.getAttribute('alt');
      const section = lightbox.getAttribute('data-lightbox-section') || 'general';

      if (!Object.prototype.hasOwnProperty.call(this.sections, section)) {
        this.sections[section] = [];
      }

      const image = {
        href,
        alt
      };

      const idx = this.sections[section].push(image) - 1;

      lightbox.addEventListener('click', e => {
        e.preventDefault();
        this.showBox(section, idx);
      });
    });
  }

  showBox (section, idx) {
    this.fader.style.display = 'block';

    TweenLite.to(this.fader, 0.450, {
      opacity: 1,
      onComplete: () => {
        this.buildBox(section, idx);
      }
    });
  }

  buildBox (section, idx) {
    this.wrapper = document.createElement('div');
    this.content = document.createElement('div');
    this.imgWrapper = document.createElement('div');
    this.img = document.createElement('img');
    this.dots = document.createElement('div');
    this.nextArrow = document.createElement('a');
    this.prevArrow = document.createElement('a');
    this.close = document.createElement('a');

    this.content.setAttribute('data-current-idx', idx);

    this.content.classList.add('lightbox-content');
    this.nextArrow.classList.add('lightbox-next');
    this.prevArrow.classList.add('lightbox-prev');
    this.close.classList.add('lightbox-close');
    this.dots.classList.add('lightbox-dots');
    this.wrapper.classList.add('lightbox-backdrop');
    this.wrapper.setAttribute('data-lightbox-wrapper-section', section);
    this.imgWrapper.classList.add('lightbox-image-wrapper');
    this.img.classList.add('lightbox-image', 'm-lg');

    this.close.appendChild(this.opts.elements.close());
    this.close.href = '#';

    this.nextArrow.appendChild(this.opts.elements.arrowRight());
    this.nextArrow.href = '#';

    this.nextArrow.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      this.setImg(section, this.getNextIdx(section));
    });

    this.prevArrow.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      this.setImg(section, this.getPrevIdx(section));
    });

    this.prevArrow.appendChild(this.opts.elements.arrowLeft());
    this.prevArrow.href = '#';

    // add dot links
    let activeLink;

    this.sections[section].forEach((img, x) => {
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.setAttribute('data-idx', x);

      if (x === idx) {
        a.classList.add('active');
        activeLink = a;
      }

      a.addEventListener('click', e => {
        a.classList.add('active');
        activeLink.classList.remove('active');
        activeLink = a;
        e.stopPropagation();
        e.preventDefault();
        this.setImg(section, x, null);
      });

      a.appendChild(this.opts.elements.dot());
      this.dots.appendChild(a);
    });

    this.imgWrapper.appendChild(this.img);
    this.imgWrapper.appendChild(this.close);
    this.content.appendChild(this.imgWrapper);
    this.content.appendChild(this.nextArrow);
    this.content.appendChild(this.prevArrow);
    this.content.appendChild(this.dots);

    if (this.opts.captions) {
      this.caption = document.createElement('div');
      this.caption.classList.add('lightbox-caption');
      this.content.appendChild(this.caption);
    }

    this.wrapper.appendChild(this.content);
    document.body.appendChild(this.wrapper);

    this.setImg(section, idx, this.getPrevIdx(idx));
    this.attachSwiper(section, this.content, idx);

    const imgs = this.wrapper.querySelectorAll('img');

    imagesAreLoaded(imgs).then(() => {
      TweenLite.to(this.wrapper, 0.5, {
        opacity: 1,
        onComplete: () => {
          this.fader.style.display = 'none';
          this.fader.style.opacity = 0;
        }
      });
    });

    this.close.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      this.opts.onClose(this);
      this.currentIdx = null;
    });
  }

  setImg (section, x) {
    this.currentIdx = x;
    this.content.setAttribute('data-current-idx', x);

    let a = document.querySelector('.lightbox-dots a.active');

    if (a) {
      a.classList.remove('active');
    }

    a = document.querySelector(`.lightbox-dots a[data-idx="${x}"]`);
    a.classList.add('active');

    if (this.caption) {
      TweenLite.to(this.caption, 0.5, {
        opacity: 0,
        onComplete: () => {
          this.caption.innerHTML = this.sections[section][x].alt;
        }
      });
    }

    TweenLite.to(this.img, 0.5, {
      opacity: 0,
      onComplete: () => {
        this.img.src = this.sections[section][x].href;

        TweenLite.to(this.img, 0.5, {
          opacity: 1
        });

        if (this.caption) {
          TweenLite.to(this.caption, 0.5, { opacity: 1 });
        }
      }
    });
  }

  getNextIdx (section) {
    const idx = this.currentIdx;
    if (idx === this.sections[section].length - 1) {
      return 0
    }
    return idx + 1
  }

  getPrevIdx (section) {
    const idx = this.currentIdx;
    if (idx === 0) {
      return this.sections[section].length - 1
    }
    return idx - 1
  }

  attachSwiper (section, el, initialIdx) {
    const hammerManager = new Manager(el);
    const swipeHandler = new SwipeRecognizer();

    this.content.setAttribute('data-current-idx', initialIdx);

    hammerManager.add(swipeHandler);

    hammerManager.on('swipeleft', () => {
      const idx = this.getNextIdx(section);
      this.setImg(section, idx);
    });

    hammerManager.on('swiperight', () => {
      const idx = this.getPrevIdx(section);
      this.setImg(section, idx);
    });
  }
}

const DEFAULT_OPTIONS$b = {
  mobileMenuDelay: 800,
  linkQuery: 'a:not([href^="#"]):not([target="_blank"]):not([data-lightbox]):not(.noanim)',
  anchorQuery: 'a[href^="#"]',

  onTransition: href => {
    const main = document.querySelector('main');
    const fader = document.querySelector('#fader');

    fader.style.display = 'block';
    TweenLite.to(main, 0.8, {
      y: 25,
      ease: Power3.easeOut
    });

    TweenLite.to(fader, 0.2, {
      opacity: 1,
      onComplete: () => {
        window.location = href;
      }
    });
  }
};

class Links {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$b);

    const links = document.querySelectorAll(this.opts.linkQuery);
    const anchors = document.querySelectorAll(this.opts.anchorQuery);

    this.bindAnchors(anchors);
    this.bindLinks(links);
  }

  bindAnchors (anchors) {
    let wait = false;
    Array.from(anchors).forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const href = anchor.getAttribute('href');

        if (document.body.classList.contains('open-menu')) {
          this.app.mobileMenu.toggleMenuClosed();
          wait = true;
        }

        const move = () => {
          const dataID = href;
          const dataTarget = document.querySelector(dataID);
          e.preventDefault();
          if (dataTarget) {
            smoothScrollIntoView(dataTarget, { block: 'start', behavior: 'smooth' });
          }

          if (this.app.header && dataTarget.id !== 'top') {
            setTimeout(() => { this.app.header.unpin(); }, 800);
          }
        };

        if (wait) {
          setTimeout(move, this.opts.mobileMenuDelay);
        } else {
          move();
        }
      });
    });
  }

  bindLinks (links) {
    Array.from(links).forEach(link => {
      link.addEventListener('click', e => {
        const loadingContainer = document.querySelector('.loading-container');
        const href = link.getAttribute('href');
        loadingContainer.style.display = 'none';

        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          return
        }

        if (href.indexOf(document.location.hostname) > -1 || href.startsWith('/')) {
          e.preventDefault();
          this.opts.onTransition(href);
        }
      });
    });
  }
}

const DEFAULT_OPTIONS$c = {
  logoColor: '#000',
  logoPathSelector: 'svg path',
  contentSelector: 'section',
  hamburgerColor: '#000',

  onResize: null,
  openTween: m => {
    const timeline = new TimelineLite();

    m.hamburger.classList.toggle('is-active');
    document.body.classList.toggle('open-menu');

    timeline
      .fromTo(m.bg, 0.35, { x: '0%', opacity: 0, height: window.innerHeight }, { opacity: 1, ease: Sine.easeIn })
      .to(m.logo, 0.35, { opacity: 0, ease: Power3.easeOut }, '-=0.35')
      .to(m.header, 0.55, { backgroundColor: 'transparent', ease: Power3.easeOut }, '-=0.35')
      .call(() => { m.nav.style.gridTemplateRows = 'auto 1fr'; })
      .set(m.nav, { height: window.innerHeight })
      .set(m.content, { display: 'block' })
      .set(m.logoPath, { fill: m.opts.logoColor })
      .set(m.logo, { xPercent: 3 })
      .staggerFromTo(
        m.lis,
        1, {
          opacity: 0, x: 20
        },
        {
          x: 0,
          opacity: 1,
          ease: Power3.easeOut
        }, 0.05,
      )
      .to(m.logo, 0.55, { opacity: 1, xPercent: 0, ease: Power3.ease }, '-=1.2')
      .call(m._emitMobileMenuOpenEvent);
  },

  closeTween: m => {
    document.body.classList.toggle('open-menu');
    const timeline = new TimelineLite();

    timeline
      .call(() => { m.hamburger.classList.toggle('is-active'); })
      .fromTo(
        m.logo,
        0.2, {
          opacity: 1,
          xPercent: 0
        },
        {
          opacity: 0,
          xPercent: 5,
          ease: Power3.easeOut
        },
      )
      .set(m.logoPath, { clearProps: 'fill' })
      .staggerTo(m.lis, 0.5, { opacity: 0, x: 20, ease: Power3.easeOut }, 0.04)
      .set(m.nav, { clearProps: 'height' })
      .to(m.bg, 0.25, { x: '100%', ease: Sine.easeIn }, '-=0.3')
      .call(() => { m._emitMobileMenuClosedEvent(); })
      .set(m.content, { display: 'none' })
      .call(() => { m.nav.style.gridTemplateRows = 'auto'; })
      .set(m.lis, { clearProps: 'opacity' })
      .to(m.logo, 0.35, { opacity: 1, ease: Power3.easeIn });
  }
};

class MobileMenu {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$c);

    this.header = document.querySelector('header');
    this.bg = this.header.querySelector('.mobile-bg');
    this.logo = this.header.querySelector('figure.brand');
    this.logoPath = this.logo ? this.logo.querySelectorAll(this.opts.logoPathSelector) : null;
    this.menuButton = this.header.querySelector('figure.menu-button');
    this.hamburger = this.menuButton ? this.menuButton.querySelector('.hamburger') : null;
    this.hamburgerInner = this.menuButton ? this.menuButton.querySelector('.hamburger-inner') : null;
    this.content = this.header.querySelectorAll(this.opts.contentSelector);
    this.lis = this.header.querySelectorAll('li');
    this.nav = this.header.querySelector('nav');

    this.hamburger.addEventListener('click', () => {
      this.toggleMenu();
    });

    if (this.opts.onResize) {
      window.addEventListener(APPLICATION_RESIZE, this.opts.onResize.bind(this));
    }
  }

  toggleMenu () {
    if (document.body.classList.contains('open-menu')) {
      this.toggleMenuClosed();
    } else {
      this.toggleMenuOpen();
    }
  }

  toggleMenuClosed () {
    // CLOSING MENU
    this.opts.closeTween(this);
  }

  toggleMenuOpen () {
    // OPENING MENU
    this.opts.openTween(this);
  }

  _emitMobileMenuOpenEvent () {
    const mobileMenuOpenEvent = new window.CustomEvent(APPLICATION_MOBILE_MENU_OPEN);
    window.dispatchEvent(mobileMenuOpenEvent);
  }

  _emitMobileMenuClosedEvent () {
    const mobileMenuClosedEvent = new window.CustomEvent(APPLICATION_MOBILE_MENU_CLOSED);
    window.dispatchEvent(mobileMenuClosedEvent);
  }
}

const DEFAULT_OPTIONS$d = {
  /**
   * if your app needs to do some initialization while the
   * application:ready has been fired, you can set this to
   * false. You will then have to call `this.ready()`
   * to start the reveals
   */

  fireOnReady: true,
  clearLazyload: false,

  rootMargin: '-15%',
  threshold: 0,

  walks: {
    default: {
      overlap: '-=0.3',
      duration: 800,
      transition: {
        from: {},
        to: {}
      }
    }
  }
};

class Moonwalk {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$d);

    document.documentElement.classList.add('moonwalk');

    this.sections = this.buildSections();
    this.parseChildren();

    if (this.opts.clearLazyload) {
      this.clearLazyloads();
    }

    if (prefersReducedMotion()) {
      this.removeAllWalks();
    }

    if (this.opts.fireOnReady) {
      window.addEventListener(APPLICATION_READY, this.ready.bind(this));
    }
  }

  removeAllWalks () {
    const key = '[data-moonwalk]';
    const elems = document.querySelectorAll(key);

    Array.from(elems).forEach(el => el.removeAttribute(key));
  }

  buildSections () {
    const sections = document.querySelectorAll('[data-moonwalk-section]');

    return Array.from(sections).map(section => ({
      el: section,
      timeline: new TimelineLite(),
      observer: null,
      elements: []
    }))
  }

  clearLazyloads () {
    const srcsets = document.querySelectorAll('[data-ll-srcset][data-moonwalk]');
    Array.from(srcsets).forEach(srcset => srcset.removeAttribute('data-moonwalk'));
  }

  parseChildren () {
    Object.keys(this.opts.walks).forEach(key => {
      this.findElementsByKey(key);
    }, this);
  }

  findElementsByKey (key) {
    let searchAttr = '';
    let attr = '';
    let val = '';

    if (key === 'default') {
      searchAttr = '[data-moonwalk-children]';
      attr = 'data-moonwalk';
      val = '';
    } else {
      searchAttr = `[data-moonwalk-${key}-children]`;
      attr = 'data-moonwalk';
      val = key;
    }

    const elements = document.querySelectorAll(searchAttr);
    return this.setAttrs(elements, attr, val)
  }

  setAttrs (elements, attr, val) {
    const affectedElements = [];

    Array.prototype.forEach.call(elements, el => {
      const { children } = el;

      Array.prototype.forEach.call(children, c => {
        c.setAttribute(attr, val);
        affectedElements.push(c);
      });
    });

    return affectedElements
  }

  ready () {
    const { opts } = this;

    this.sections.forEach((section, idx) => {
      // if this is the last section, set rootMargin to 0
      let rootMargin;

      if (idx === this.sections.length - 1) {
        rootMargin = '0px';
      } else {
        rootMargin = opts.rootMargin;
      }

      section.observer = new IntersectionObserver(((entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let cfg;
            const walkName = entry.target.getAttribute('data-moonwalk');

            if (!walkName.length) {
              cfg = opts.walks.default;
            } else {
              cfg = opts.walks[walkName];
            }

            const {
              duration, transition, interval
            } = cfg;

            const overlapNumber = duration - interval;
            let overlap = `-=${overlapNumber}`;

            if (!section.timeline.isActive()) {
              overlap = '+=0';
            }

            const tween = () => {
              section.timeline.fromTo(
                entry.target,
                duration,
                transition.from,
                transition.to,
                overlap
              );
            };

            if (entry.target.tagName === 'IMG') {
              // ensure image is loaded before we tween
              imageIsLoaded(entry.target).then(() => tween());
            } else {
              const imagesInEntry = entry.target.querySelectorAll('img');
              if (imagesInEntry.length) {
                // entry has children elements that are images
                imagesAreLoaded(imagesInEntry).then(() => tween());
              } else {
                // regular entry, just tween it
                tween();
              }
            }

            self.unobserve(entry.target);
          }
        });
      }), {
        rootMargin,
        threshold: opts.threshold
      });

      section.elements = section.el.querySelectorAll('[data-moonwalk]');
      section.elements.forEach(box => {
        section.observer.observe(box);
      });
    });
  }
}

const DEFAULT_OPTIONS$e = {
  backdropColor: '#ffffff',

  tweenIn: (el, popup) => {
    TweenLite.set(popup.backdrop, { display: 'block', backgroundColor: popup.opts.backdropColor });
    TweenLite.to(popup.backdrop, 0.3, {
      opacity: 1,
      onComplete: () => {
        TweenLite.fromTo(el, 0.3, {
          yPercent: -50,
          x: -5,
          xPercent: -50,
          opacity: 0,
          display: 'block'
        }, {
          yPercent: -50,
          xPercent: -50,
          x: 0,
          opacity: 1
        });
      }
    });
  },

  tweenOut: popup => {
    const popups = document.querySelectorAll('[data-popup]');
    TweenLite.to(popups, 0.3, { opacity: 0, display: 'none' });
    TweenLite.to(popup.backdrop, 0.3, {
      opacity: 0,
      onComplete: () => {
        TweenLite.set(popup.backdrop, { display: 'none' });
      }
    });
  }
};

class Popup {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$e);
    this.createBackdrop();
  }

  createBackdrop () {
    const backdrop = document.createElement('div');
    backdrop.setAttribute('data-popup-backdrop', '');
    TweenLite.set(backdrop, { opacity: 0, display: 'none', zIndex: 4999 });

    backdrop.addEventListener('click', e => {
      e.stopPropagation();
      this.close();
    });

    document.body.append(backdrop);
    this.backdrop = backdrop;
  }

  open (el) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    if (!el) {
      console.error(`JUPITER/POPUP >>> Element ${el} not found`);
    }

    this.opts.tweenIn(el, this);
  }

  close () {
    this.opts.tweenOut(this);
  }
}

// import Headroom from 'headroom.js'

const DEFAULT_OPTIONS$f = {};

class StackedBoxes {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$f);
    this.initialize();
  }

  initialize () {
    // TODO: ensure images are loaded?
    const boxes = document.querySelectorAll('[data-boxes-stacked]');

    const observer = new IntersectionObserver(entries => {
      const [{ isIntersecting, target }] = entries;
      if (isIntersecting) {
        this.adjustBox(target);
      }
    });

    Array.from(boxes).forEach(box => {
      observer.observe(box);
    });
  }

  adjustBox (box) {
    const sizeTarget = box.querySelector('[data-boxes-stacked-size-target]');
    const sizeSrc = box.querySelector('[data-boxes-stacked-size-src]');

    if (sizeTarget) {
      this.size(sizeTarget, sizeSrc);
    }

    const pull = box.querySelector('[data-boxes-stacked-pull]');

    if (pull) {
      const pullAmount = pull.getAttribute('data-boxes-stacked-pull');
      let pullPx;

      switch (pullAmount) {
        case '1/3':
          pullPx = pull.clientHeight / 3;
          break

        case '2/3':
          pullPx = (pull.clientHeight / 3) * 2;
          break

        case '1/2':
          pullPx = pull.clientHeight / 2;
          break

        default:
          console.error('==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value');
      }
      this.pull(pull, pullPx);
    }
  }

  pull (box, amnt) {
    TweenLite.set(box, { y: amnt * -1, marginBottom: amnt * -1 });
  }

  size (target, src) {
    TweenLite.set(target, { height: src.clientHeight });
  }
}

/**
 * A header that stays fixed. Hides when scrolling down and is revealed on scrolling up.
 *
 * You can pass different configs for different sections:
 *
 *  this.header = new FixedHeader(
      document.querySelector('header'),
      {
        default: {
          offset: 60,
          offsetSmall: 1,
          offsetBg: 200,
          regBgColor: 'transparent'
        },

        sections: {
          index: {
            offsetBg: '#content'
          }
        }
      }
    )
 *
 */

const DEFAULT_EVENTS$1 = {
  onMainVisible: h => {
    TweenLite.to(
      h.el,
      3,
      { opacity: 1, delay: 0.5 },
    );
  },

  onMainInvisible: h => {
    TweenLite.to(
      h.el,
      1,
      { opacity: 0 },
    );
  },

  onPin: h => {
    TweenLite.to(
      h.auxEl,
      0.35,
      {
        yPercent: '0',
        ease: Sine.easeOut,
        autoRound: true
      },
    );
  },

  onUnpin: h => {
    h._hiding = true;
    TweenLite.to(
      h.auxEl,
      0.25,
      {
        yPercent: '-100',
        ease: Sine.easeIn,
        autoRound: true,
        onComplete: () => {
          h._hiding = false;
        }
      },
    );
  }
};

const DEFAULT_OPTIONS$g = {
  el: 'header[data-nav]',

  default: {
    canvas: window,
    enter: h => {
      const timeline = new TimelineLite();
      timeline
        .set(h.auxEl, { yPercent: -100 })
        .set(h.lis, { opacity: 0 })
        .to(h.auxEl, 1, {
          yPercent: 0, delay: h.opts.enterDelay, ease: Power3.easeOut, autoRound: true
        })
        .staggerTo(h.lis, 0.8, { opacity: 1, ease: Sine.easeIn }, 0.1, '-=1');
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0, // how far from the top before we trigger hide
    offsetSmall: 50, // how far from the top before we trigger the shrinked padding,
    offsetBg: 200, // how far down before changing backgroundcolor
    ...DEFAULT_EVENTS$1
  }
};

class StickyHeader {
  constructor (app, opts = {}) {
    this.app = app;
    this.opts = lodash_defaultsdeep(opts, DEFAULT_OPTIONS$g);

    if (typeof this.opts.el === 'string') {
      this.el = document.querySelector(this.opts.el);
    } else {
      this.el = this.opts.el;
    }

    if (!this.el) {
      return
    }


    const section = document.body.getAttribute('data-script');
    this.opts = this._getOptionsForSection(section, opts);

    this.auxEl = this.el.cloneNode(true);
    this.auxEl.setAttribute('data-header-pinned', '');
    this.auxEl.setAttribute('data-auxiliary-nav', '');
    this.auxEl.removeAttribute('data-nav');

    document.body.appendChild(this.auxEl);

    this.small();
    this.unpin();

    this.lis = this.el.querySelectorAll('li');
    this._firstLoad = true;
    this._pinned = true;
    this._top = false;
    this._bottom = false;
    this._small = false;
    this._hiding = false; // if we're in the process of hiding the bar
    this.lastKnownScrollY = 0;
    this.currentScrollY = 0;
    this.mobileMenuOpen = false;
    this.timer = null;

    this.initialize();
  }

  initialize () {
    // bind to canvas scroll
    this.lastKnownScrollY = this.getScrollY();
    this.currentScrollY = this.lastKnownScrollY;

    if (typeof this.opts.offsetBg === 'string') {
      // get offset of element, with height of header subtracted
      const elm = document.querySelector(this.opts.offsetBg);
      this.opts.offsetBg = elm.offsetTop - this.el.offsetHeight;
    }

    this.setupObserver();
    this._bindMobileMenuListeners();
  }

  setupObserver () {
    this.observer = new IntersectionObserver(entries => {
      const [{
        isIntersecting
      }] = entries;

      if (isIntersecting) {
        if (this._navVisible !== true) {
          this.opts.onMainVisible(this);
        }
        this._navVisible = true;
      } else {
        if (this._navVisible === true) {
          this.opts.onMainInvisible(this);
        }
        this._navVisible = false;
      }
    });

    this.observer.observe(this.el);
    window.addEventListener(APPLICATION_SCROLL, this.update.bind(this), false);
  }

  _hideAlt () {
    this.unpin();
  }

  _showAlt () {
    this.pin();
  }

  update () {
    this.redraw(false);
  }

  checkSize (force) {
    if (this.currentScrollY > this.opts.offsetSmall) {
      if (force) {
        this.small();
      } else if (!this._small) {
        this.small();
      }
    } else if (force) {
      this.notSmall();
    } else if (this._small) {
      this.notSmall();
    }
  }

  checkTop (force) {
    if (this.currentScrollY <= this.opts.offset) {
      if (force) {
        this.top();
      } else if (!this._top) {
        this.top();
      }
    } else if (force) {
      this.notTop();
    } else if (this._top) {
      this.notTop();
    }
  }

  checkBot (force) {
    if (this.currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
      if (force) {
        this.bottom();
      } else if (!this._bottom) {
        this.bottom();
      }
    } else if (force) {
      this.notBottom();
    } else if (this._bottom) {
      this.notBottom();
    }
  }

  checkPin (force, toleranceExceeded) {
    if (this._navVisible) {
      if (this._pinned) {
        this.unpin();
        return
      }
    }

    if (this.shouldUnpin(toleranceExceeded)) {
      if (this.mobileMenuOpen) {
        return
      }
      if (this._pinned) {
        this.unpin();
      }
    } else if (this.shouldPin(toleranceExceeded)) {
      if (!this._pinned) {
        this.pin();
      }
    }
  }

  redraw (force = false) {
    this.currentScrollY = this.getScrollY();
    const toleranceExceeded = this.toleranceExceeded();

    if (this.isOutOfBounds()) { // Ignore bouncy scrolling in OSX
      return
    }

    this.checkPin(force, toleranceExceeded);
    this.lastKnownScrollY = this.currentScrollY;
    this._firstLoad = false;
  }

  notTop () {
    this._top = false;
    this.el.removeAttribute('data-header-top');
    this.el.setAttribute('data-header-not-top', '');
    this.opts.onNotTop(this);
  }

  top () {
    this._top = true;
    this.el.setAttribute('data-header-top', '');
    this.el.removeAttribute('data-header-not-top');
    this.opts.onTop(this);
  }

  notBottom () {
    this._bottom = false;
    this.el.setAttribute('data-header-not-bottom', '');
    this.el.removeAttribute('data-header-bottom');
    this.opts.onNotBottom(this);
  }

  bottom () {
    this._bottom = true;
    this.el.setAttribute('data-header-bottom', '');
    this.el.removeAttribute('data-header-not-bottom');
    this.opts.onBottom(this);
  }

  unpin () {
    this._pinned = false;
    this.opts.onUnpin(this);
  }

  pin () {
    this._pinned = true;
    this.opts.onSmall(this);
    this.opts.onPin(this);
  }

  notSmall () {
    this._small = false;
    this.auxEl.setAttribute('data-header-big', '');
    this.auxEl.removeAttribute('data-header-small');
    this.opts.onNotSmall(this);
  }

  small () {
    this._small = true;
    this.auxEl.setAttribute('data-header-small', '');
    this.auxEl.removeAttribute('data-header-big');
    this.opts.onSmall(this);
  }

  shouldUnpin (toleranceExceeded) {
    if (this._navVisible) {
      return true
    }
    const scrollingDown = this.currentScrollY > this.lastKnownScrollY;
    const pastOffset = this.currentScrollY >= this.opts.offset;

    return scrollingDown && pastOffset && toleranceExceeded
  }

  shouldPin (toleranceExceeded) {
    const scrollingUp = this.currentScrollY < this.lastKnownScrollY;
    const pastOffset = this.currentScrollY <= this.opts.offset;
    return (scrollingUp && toleranceExceeded) || pastOffset
  }

  isOutOfBounds () {
    const pastTop = this.currentScrollY < 0;
    const pastBottom = this.currentScrollY
      + this.getScrollerPhysicalHeight()
      > this.getScrollerHeight();

    return pastTop || pastBottom
  }

  getScrollerPhysicalHeight () {
    return (this.opts.canvas === window || this.opts.canvas === document.body)
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(this.opts.canvas)
  }

  getScrollerHeight () {
    return (this.opts.canvas === window || this.opts.canvas === document.body)
      ? this.getDocumentHeight()
      : this.getElementHeight(this.opts.canvas)
  }

  getDocumentHeight () {
    const { body } = document;
    const { documentElement } = document;

    return Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, documentElement.clientHeight,
    )
  }

  getViewportHeight () {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
  }

  getElementHeight (el) {
    return Math.max(
      el.scrollHeight,
      el.offsetHeight,
      el.clientHeight,
    )
  }

  getElementPhysicalHeight (el) {
    return Math.max(
      el.offsetHeight,
      el.clientHeight,
    )
  }

  getScrollY () {
    if (this.opts.canvas.pageYOffset !== undefined) {
      return this.opts.canvas.pageYOffset
    }
    if (this.opts.canvas.scrollTop !== undefined) {
      return this.opts.canvas.scrollTop
    }
    return (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  toleranceExceeded () {
    return Math.abs(this.currentScrollY - this.lastKnownScrollY) >= this.opts.tolerance
  }

  _getOptionsForSection (section, opts) {
    // if section is not a key in opts, return default opts
    if (!Object.prototype.hasOwnProperty.call(opts, 'sections') || !Object.prototype.hasOwnProperty.call(opts.sections, section)) {
      return opts.default
    }

    // merge in default events, in case they're not supplied
    const sectionOpts = opts.sections[section];
    opts = lodash_defaultsdeep(sectionOpts, DEFAULT_EVENTS$1, opts.default || {});
    return opts
  }

  _bindMobileMenuListeners () {
    window.addEventListener(
      APPLICATION_MOBILE_MENU_OPEN,
      this._onMobileMenuOpen.bind(this)
    );
    window.addEventListener(
      APPLICATION_MOBILE_MENU_CLOSED,
      this._onMobileMenuClose.bind(this)
    );
  }

  _onMobileMenuOpen () {
    this.mobileMenuOpen = true;
  }

  _onMobileMenuClose () {
    this.mobileMenuOpen = false;
  }
}

class Typography {
  constructor (parent, settings = {}) {
    const self = this;

    // Set some settings, by merging defaults and passed settings
    self.settings = {
      minWords: 4,
      selector: 'h1,h2,h3,p',
      ignoreClass: 'no-typo-fix',
      ignoreExistingSpaceChars: false,
      ...settings
    };

    // Either load from root or the passed parent element
    if (typeof (parent) === 'undefined') {
      self.elems = [...document.querySelectorAll(self.settings.selector)];
    } else {
      self.elems = [...parent.querySelectorAll(self.settings.selector)];
    }

    this.apply();
  }

  /**
   * Apply formatting to the loaded elements
   * @return void
   */
  apply () {
    const self = this;

    self.elems.map(elem => {
      // Bail out if the ignore class is present on this element
      if (elem.classList.contains(self.settings.ignoreClass)) {
        return false
      }

      // Run the ignore checker nd bail if required
      if (self.shouldElementBeIgnored(elem)) {
        return false
      }

      // The result string will be tacked on to this
      let result = '';

      // Split words/tags into array
      let textItems = elem.innerHTML.trim().replace(/&nbsp;/g, ' ').split(/ (?=[^>]*(?:<|$))/);

      // Check if the text warrants this module
      if (textItems.length < self.settings.minWords) {
        return false
      }

      // Run orphans filter
      textItems = self.preventOrphans(textItems);

      // Join the words back together
      result = textItems.join(' ');

      // Replace whitespace after no break spaces
      result = result.replace(/&nbsp; /g, '&nbsp;');

      // Set the content of the element with our shiny string
      elem.innerHTML = result;

      return true
    });
  }

  /**
   * Apply the orphans filter to the passed text and return it
   * @param {string} textItems
   */
  preventOrphans (textItems) {
    // Find the second to last work
    const targetWord = textItems[(textItems.length - 2)];

    // Stick a no break space to the end of the word and replace the instance in the array
    textItems[(textItems.length - 2)] = `${targetWord}&nbsp;`;

    return textItems
  }

  /**
   * Reset any formatting
   * @return void
   */
  reset () {
    const self = this;

    self.elems.map(elem => {
      // Run the ignore checker nd bail if required
      if (self.shouldElementBeIgnored(elem)) {
        return false
      }

      elem.innerHTML = elem.innerHTML.replace(/&nbsp;/g, ' ');
      return true
    });
  }

  /**
   * Run checks to see if the passed element should be skipped
   *
   * @param {HTMLElement} elem
   * @returns boolean
   */
  shouldElementBeIgnored (elem) {
    const self = this;

    // Check if the element already contains 1 or more &nbsp; characters and the
    // ignore setting is true. If so: bail.
    if ((elem.innerHTML.indexOf('&nbsp;') > -1) && self.settings.ignoreExistingSpaceChars) {
      return true
    }

    return false
  }
}

var loadScript = (url, completeCallback) => {
  const script = document.createElement('script'); let done = false;
  const head = document.getElementsByTagName('head')[0];
  script.src = url;

  script.onreadystatechange = function cb () {
    if (!done
      && (!this.readyState
      || this.readyState === 'loaded'
      || this.readyState === 'complete')) {
      done = true;
      completeCallback();

      // IE memory leak
      script.onload = null;
      script.onreadystatechange = null;

      head.removeChild(script);
    }
  };
  script.onload = script.onreadystatechange;
  head.appendChild(script);
};

export { Application, Back, Breakpoints, CSSPlugin, Cookies, CoverOverlay, index as Events, Expo, FixedHeader, FooterReveal, Hammer, HeroSlider, HeroVideo, Lazyload, Lightbox, Linear, Links, MobileMenu, Moonwalk, Parallax, Popup, Power1, Power2, Power3, Sine, StackedBoxes, StickyHeader, TimelineLite, TweenLite, Typography, imageIsLoaded, imagesAreLoaded, loadScript, prefersReducedMotion, smoothScrollIntoView as scrollIntoView };
