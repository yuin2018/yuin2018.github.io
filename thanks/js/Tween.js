this.TWEEN = this.TWEEN || {},
TWEEN.extend = function(t, e) {
	"use strict";

	function i() {
		this.constructor = t
	}
	return i.prototype = e.prototype, t.prototype = new i
},
this.TWEEN = this.TWEEN || {},
TWEEN.promote = function(t, e) {
	"use strict";
	var i = t.prototype,
		o = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
	if (o) {
		i[(e += "_") + "constructor"] = o.constructor;
		for (var n in o) i.hasOwnProperty(n) && "function" == typeof o[n] && (i[e + n] = o[n])
	}
	return t
},
 this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t(t, e, i) {
		this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !! e, this.cancelable = !! i, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
	}
	var e = t.prototype;
	e.preventDefault = function() {
		this.defaultPrevented = this.cancelable && !0
	}, e.stopPropagation = function() {
		this.propagationStopped = !0
	}, e.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = !0
	}, e.remove = function() {
		this.removed = !0
	}, e.clone = function() {
		return new t(this.type, this.bubbles, this.cancelable)
	}, e.set = function(t) {
		for (var e in t) this[e] = t[e];
		return this
	}, e.toString = function() {
		return "[Event (type=" + this.type + ")]"
	}, TWEEN.Event = t
}(),
this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t() {
		this._listeners = null, this._captureListeners = null
	}
	var e = t.prototype;
	t.initialize = function(t) {
		t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
	}, e.addEventListener = function(t, e, i) {
		var o;
		o = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
		var n = o[t];
		return n && this.removeEventListener(t, e, i), n = o[t], n ? n.push(e) : o[t] = [e], e
	}, e.on = function(t, e, i, o, n, r) {
		return e.handleEvent && (i = i || e, e = e.handleEvent), i = i || this, this.addEventListener(t, function(t) {
			e.call(i, t, n), o && t.remove()
		}, r)
	}, e.removeEventListener = function(t, e, i) {
		var o = i ? this._captureListeners : this._listeners;
		if (o) {
			var n = o[t];
			if (n) for (var r = 0, s = n.length; r < s; r++) if (n[r] == e) {
				1 == s ? delete o[t] : n.splice(r, 1);
				break
			}
		}
	}, e.off = e.removeEventListener, e.removeAllEventListeners = function(t) {
		t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
	}, e.dispatchEvent = function(t, e, i) {
		if ("string" == typeof t) {
			var o = this._listeners;
			if (!(e || o && o[t])) return !0;
			t = new TWEEN.Event(t, e, i)
		} else t.target && t.clone && (t = t.clone());
		try {
			t.target = this
		} catch (t) {}
		if (t.bubbles && this.parent) {
			for (var n = this, r = [n]; n.parent;) r.push(n = n.parent);
			var s, a = r.length;
			for (s = a - 1; s >= 0 && !t.propagationStopped; s--) r[s]._dispatchEvent(t, 1 + (0 == s));
			for (s = 1; s < a && !t.propagationStopped; s++) r[s]._dispatchEvent(t, 3)
		} else this._dispatchEvent(t, 2);
		return !t.defaultPrevented
	}, e.hasEventListener = function(t) {
		var e = this._listeners,
			i = this._captureListeners;
		return !!(e && e[t] || i && i[t])
	}, e.willTrigger = function(t) {
		for (var e = this; e;) {
			if (e.hasEventListener(t)) return !0;
			e = e.parent
		}
		return !1
	}, e.toString = function() {
		return "[EventDispatcher]"
	}, e._dispatchEvent = function(t, e) {
		var i, o = 1 == e ? this._captureListeners : this._listeners;
		if (t && o) {
			var n = o[t.type];
			if (!n || !(i = n.length)) return;
			try {
				t.currentTarget = this
			} catch (t) {}
			try {
				t.eventPhase = e
			} catch (t) {}
			t.removed = !1, n = n.slice();
			for (var r = 0; r < i && !t.immediatePropagationStopped; r++) {
				var s = n[r];
				s.handleEvent ? s.handleEvent(t) : s(t), t.removed && (this.off(t.type, s, 1 == e), t.removed = !1)
			}
		}
	}, TWEEN.EventDispatcher = t
}(),
this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t() {
		throw "Ticker cannot be instantiated."
	}
	t.RAF_SYNCHED = "synched", t.RAF = "raf", t.TIMEOUT = "timeout", t.useRAF = !1, t.timingMode = null, t.maxDelta = 0, t.paused = !1, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, TWEEN.EventDispatcher.initialize(t), t._addEventListener = t.addEventListener, t.addEventListener = function() {
		return !t._inited && t.init(), t._addEventListener.apply(t, arguments)
	}, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTicks = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._timerId = null, t._raf = !0, t.setInterval = function(e) {
		t._interval = e, t._inited && t._setupTick()
	}, t.getInterval = function() {
		return t._interval
	}, t.setFPS = function(e) {
		t.setInterval(1e3 / e)
	}, t.getFPS = function() {
		return 1e3 / t._interval
	};
	try {
		Object.defineProperties(t, {
			interval: {
				get: t.getInterval,
				set: t.setInterval
			},
			framerate: {
				get: t.getFPS,
				set: t.setFPS
			}
		})
	} catch (t) {
		console.log(t)
	}
	t.init = function() {
		t._inited || (t._inited = !0, t._times = [], t._tickTimes = [], t._startTime = t._getTime(), t._times.push(t._lastTime = 0), t.interval = t._interval)
	}, t.reset = function() {
		if (t._raf) {
			var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			e && e(t._timerId)
		} else clearTimeout(t._timerId);
		t.removeAllEventListeners("tick"), t._timerId = t._times = t._tickTimes = null, t._startTime = t._lastTime = t._ticks = 0, t._inited = !1
	}, t.getMeasuredTickTime = function(e) {
		var i = 0,
			o = t._tickTimes;
		if (!o || o.length < 1) return -1;
		e = Math.min(o.length, e || 0 | t.getFPS());
		for (var n = 0; n < e; n++) i += o[n];
		return i / e
	}, t.getMeasuredFPS = function(e) {
		var i = t._times;
		return !i || i.length < 2 ? -1 : (e = Math.min(i.length - 1, e || 0 | t.getFPS()), 1e3 / ((i[0] - i[e]) / e))
	}, t.setPaused = function(e) {
		t.paused = e
	}, t.getPaused = function() {
		return t.paused
	}, t.getTime = function(e) {
		return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1
	}, t.getEventTime = function(e) {
		return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1
	}, t.getTicks = function(e) {
		return t._ticks - (e ? t._pausedTicks : 0)
	}, t._handleSynch = function() {
		t._timerId = null, t._setupTick(), t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick()
	}, t._handleRAF = function() {
		t._timerId = null, t._setupTick(), t._tick()
	}, t._handleTimeout = function() {
		t._timerId = null, t._setupTick(), t._tick()
	}, t._setupTick = function() {
		if (null == t._timerId) {
			var e = t.timingMode || t.useRAF && t.RAF_SYNCHED;
			if (e == t.RAF_SYNCHED || e == t.RAF) {
				var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
				if (i) return t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch), void(t._raf = !0)
			}
			t._raf = !1, t._timerId = setTimeout(t._handleTimeout, t._interval)
		}
	}, t._tick = function() {
		var e = t.paused,
			i = t._getTime(),
			o = i - t._lastTime;
		if (t._lastTime = i, t._ticks++, e && (t._pausedTicks++, t._pausedTime += o), t.hasEventListener("tick")) {
			var n = new TWEEN.Event("tick"),
				r = t.maxDelta;
			n.delta = r && o > r ? r : o, n.paused = e, n.time = i, n.runTime = i - t._pausedTime, t.dispatchEvent(n)
		}
		for (t._tickTimes.unshift(t._getTime() - i); t._tickTimes.length > 100;) t._tickTimes.pop();
		for (t._times.unshift(i); t._times.length > 100;) t._times.pop()
	};
	var e = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
	t._getTime = function() {
		return (e && e.call(performance) || (new Date).getTime()) - t._startTime
	}, TWEEN.Ticker = t
}(),
this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t(e, i, o) {
		this.ignoreGlobalPause = !1, this.loop = !1, this.duration = 0, this.pluginData = o || {}, this.target = e, this.position = null, this.passive = !1, this._paused = !1, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], this._prevPosition = 0, this._stepPosition = 0, this._prevPos = -1, this._target = e, this._useTicks = !1, this._inited = !1, this._registered = !1, i && (this._useTicks = i.useTicks, this.ignoreGlobalPause = i.ignoreGlobalPause, this.loop = i.loop, i.onChange && this.addEventListener("change", i.onChange), i.override && t.removeTweens(e)), i && i.paused ? this._paused = !0 : TWEEN.Tween._register(this, !0), i && null != i.position && this.setPosition(i.position, t.NONE)
	}
	var e = TWEEN.extend(t, TWEEN.EventDispatcher);
	t.NONE = 0, t.LOOP = 1, t.REVERSE = 2, t.IGNORE = {}, t._tweens = [], t._plugins = {}, t.get = function(e, i, o, n) {
		return n && t.removeTweens(e), new t(e, i, o)
	}, t.tick = function(e, i) {
		for (var o = t._tweens.slice(), n = o.length - 1; n >= 0; n--) {
			var r = o[n];
			i && !r.ignoreGlobalPause || r._paused || r.tick(r._useTicks ? 1 : e)
		}
	}, t.handleEvent = function(t) {
		"tick" == t.type && this.tick(t.delta, t.paused)
	}, t.removeTweens = function(e) {
		if (e.tweenjs_count) {
			for (var i = t._tweens, o = i.length - 1; o >= 0; o--) {
				var n = i[o];
				n._target == e && (n._paused = !0, i.splice(o, 1))
			}
			e.tweenjs_count = 0
		}
	}, t.removeAllTweens = function() {
		for (var e = t._tweens, i = 0, o = e.length; i < o; i++) {
			var n = e[i];
			n._paused = !0, n.target && (n.target.tweenjs_count = 0)
		}
		e.length = 0
	}, t.hasActiveTweens = function(e) {
		return e ? null != e.tweenjs_count && !! e.tweenjs_count : t._tweens && !! t._tweens.length
	}, t.installPlugin = function(e, i) {
		var o = e.priority;
		null == o && (e.priority = o = 0);
		for (var n = 0, r = i.length, s = t._plugins; n < r; n++) {
			var a = i[n];
			if (s[a]) {
				for (var c = s[a], h = 0, l = c.length; h < l && !(o < c[h].priority); h++);
				s[a].splice(h, 0, e)
			} else s[a] = [e]
		}
	}, t._register = function(e, i) {
		var o = e._target,
			n = t._tweens;
		if (i && !e._registered) o && (o.tweenjs_count = o.tweenjs_count ? o.tweenjs_count + 1 : 1), n.push(e), !t._inited && TWEEN.Ticker && (TWEEN.Ticker.addEventListener("tick", t), t._inited = !0);
		else if (!i && e._registered) {
			o && o.tweenjs_count--;
			for (var r = n.length; r--;) if (n[r] == e) {
				n.splice(r, 1);
				break
			}
		}
		e._registered = i
	}, e.wait = function(t, e) {
		if (null == t || t <= 0="" 0)="" return="" this;="" var="" i="this._cloneProps(this._curQueueProps);" this._addstep({="" d:="" t,="" p0:="" i,="" e:="" this._linearease,="" p1:="" v:="" e="" })="" },="" e.to="function(t," e,="" i)="" {="" (isnan(e)="" ||="" <="" &&="" (e="0)," 0,="" this._cloneprops(this._curqueueprops),="" this._cloneprops(this._appendqueueprops(t))="" e.call="function(t," this._addaction({="" f:="" p:="" [this],="" o:="" this._target="" e.set="function(t," e)="" this._set,="" this,="" [t,="" this._target]="" e.play="function(t)" t="" (t="this)," this.call(t,="" t.setpaused,="" [!1])="" e.pause="function(t)" [!0])="" e.start="function()" this.setpaused(!1)="" e.stop="function()" this.setpaused(!0)="" e.isplay="function()" !this._paused="" e.setposition="function(t," null="=" o="!1;" if="" (i="">= this.duration && (this.loop ? i %= this.duration : (i = this.duration, o = !0)), i == this._prevPos) return o;
		var n = this._prevPos;
		if (this.position = this._prevPos = i, this._prevPosition = t, this._target) if (o) this._updateTargetProps(null, 1);
		else if (this._steps.length > 0) {
			for (var r = 0, s = this._steps.length; r < s && !(this._steps[r].t > i); r++);
			var a = this._steps[r - 1];
			this._updateTargetProps(a, (this._stepPosition = i - a.t) / a.d)
		}
		return 0 != e && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : 1 == e && i < n ? (n != this.duration && this._runActions(n, this.duration), this._runActions(0, i, !0)) : this._runActions(n, i)), o && this.setPaused(!0), this.dispatchEvent("change"), o
	}, e.tick = function(t) {
		this._paused || this.setPosition(this._prevPosition + t)
	}, e.setPaused = function(e) {
		return this._paused === !! e ? this : (this._paused = !! e, t._register(this, !e), this)
	}, e.w = e.wait, e.t = e.to, e.c = e.call, e.s = e.set, e.toString = function() {
		return "[Tween]"
	}, e.clone = function() {
		throw "Tween can not be cloned."
	}, e._updateTargetProps = function(e, i) {
		var o, n, r, s, a, c;
		if (e || 1 != i) {
			if (this.passive = !! e.v, this.passive) return;
			e.e && (i = e.e(i, 0, 1, 1)), o = e.p0, n = e.p1
		} else this.passive = !1, o = n = this._curQueueProps;
		for (var h in this._initQueueProps) {
			null == (s = o[h]) && (o[h] = s = this._initQueueProps[h]), null == (a = n[h]) && (n[h] = a = s), r = s == a || 0 == i || 1 == i || "number" != typeof s ? 1 == i ? a : s : s + (a - s) * i;
			var l = !1;
			if (c = t._plugins[h]) for (var u = 0, p = c.length; u < p; u++) {
				var d = c[u].tween(this, h, r, o, n, i, !! e && o == n, !e);
				d == t.IGNORE ? l = !0 : r = d
			}
			l || (this._target[h] = r)
		}
	}, e._runActions = function(t, e, i) {
		var o = t,
			n = e,
			r = -1,
			s = this._actions.length,
			a = 1;
		for (t > e && (o = e, n = t, r = s, s = a = -1);
		(r += a) != s;) {
			var c = this._actions[r],
				h = c.t;
			(h == n || h > o && h < n || i && h == t) && c.f.apply(c.o, c.p)
		}
	}, e._appendQueueProps = function(e) {
		var i, o, n, r, s;
		for (var a in e) if (void 0 === this._initQueueProps[a]) {
			if (o = this._target[a], i = t._plugins[a]) for (n = 0, r = i.length; n < r; n++) o = i[n].init(this, a, o);
			this._initQueueProps[a] = this._curQueueProps[a] = void 0 === o ? null : o
		} else o = this._curQueueProps[a];
		for (var a in e) {
			if (o = this._curQueueProps[a], i = t._plugins[a]) for (s = s || {}, n = 0, r = i.length; n < r; n++) i[n].step && i[n].step(this, a, o, e[a], s);
			this._curQueueProps[a] = e[a]
		}
		return s && this._appendQueueProps(s), this._curQueueProps
	}, e._cloneProps = function(t) {
		var e = {};
		for (var i in t) e[i] = t[i];
		return e
	}, e._addStep = function(t) {
		return t.d > 0 && (this._steps.push(t), t.t = this.duration, this.duration += t.d), this
	}, e._addAction = function(t) {
		return t.t = this.duration, this._actions.push(t), this
	}, e._set = function(t, e) {
		for (var i in t) e[i] = t[i]
	}, TWEEN.Tween = TWEEN.promote(t, "EventDispatcher")
}(), this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t(t, e, i) {
		this.EventDispatcher_constructor(), this.ignoreGlobalPause = !1, this.duration = 0, this.loop = !1, this.position = null, this._paused = !1, this._tweens = [], this._labels = null, this._labelList = null, this._prevPosition = 0, this._prevPos = -1, this._useTicks = !1, this._registered = !1, i && (this._useTicks = i.useTicks, this.loop = i.loop, this.ignoreGlobalPause = i.ignoreGlobalPause, i.onChange && this.addEventListener("change", i.onChange)), t && this.addTween.apply(this, t), this.setLabels(e), i && i.paused ? this._paused = !0 : TWEEN.Tween._register(this, !0), i && null != i.position && this.setPosition(i.position, TWEEN.Tween.NONE)
	}
	var e = TWEEN.extend(t, TWEEN.EventDispatcher);
	e.addTween = function(t) {
		var e = arguments.length;
		if (e > 1) {
			for (var i = 0; i < e; i++) this.addTween(arguments[i]);
			return arguments[0]
		}
		return 0 == e ? null : (this.removeTween(t), this._tweens.push(t), t.setPaused(!0), t._paused = !1, t._useTicks = this._useTicks, t.duration > this.duration && (this.duration = t.duration), this._prevPos >= 0 && t.setPosition(this._prevPos, TWEEN.Tween.NONE), t)
	}, e.removeTween = function(t) {
		var e = arguments.length;
		if (e > 1) {
			for (var i = !0, o = 0; o < e; o++) i = i && this.removeTween(arguments[o]);
			return i
		}
		if (0 == e) return !1;
		for (var n = this._tweens, o = n.length; o--;) if (n[o] == t) return n.splice(o, 1), t.duration >= this.duration && this.updateDuration(), !0;
		return !1
	}, e.addLabel = function(t, e) {
		this._labels[t] = e;
		var i = this._labelList;
		if (i) {
			for (var o = 0, n = i.length; o < n && !(e < i[o].position); o++);
			i.splice(o, 0, {
				label: t,
				position: e
			})
		}
	}, e.setLabels = function(t) {
		this._labels = t || {}
	}, e.getLabels = function() {
		var t = this._labelList;
		if (!t) {
			t = this._labelList = [];
			var e = this._labels;
			for (var i in e) t.push({
				label: i,
				position: e[i]
			});
			t.sort(function(t, e) {
				return t.position - e.position
			})
		}
		return t
	}, e.getCurrentLabel = function() {
		var t = this.getLabels(),
			e = this.position,
			i = t.length;
		if (i) {
			for (var o = 0; o < i && !(e < t[o].position); o++);
			return 0 == o ? null : t[o - 1].label
		}
		return null
	}, e.gotoAndPlay = function(t) {
		this.setPaused(!1), this._goto(t)
	}, e.gotoAndStop = function(t) {
		this.setPaused(!0), this._goto(t)
	}, e.setPosition = function(t, e) {
		var i = this._calcPosition(t),
			o = !this.loop && t >= this.duration;
		if (i == this._prevPos) return o;
		this._prevPosition = t, this.position = this._prevPos = i;
		for (var n = 0, r = this._tweens.length; n < r; n++) if (this._tweens[n].setPosition(i, e), i != this._prevPos) return !1;
		return o && this.setPaused(!0), this.dispatchEvent("change"), o
	}, e.setPaused = function(t) {
		this._paused = !! t, TWEEN.Tween._register(this, !t)
	}, e.updateDuration = function() {
		this.duration = 0;
		for (var t = 0, e = this._tweens.length; t < e; t++) {
			var i = this._tweens[t];
			i.duration > this.duration && (this.duration = i.duration)
		}
	}, e.tick = function(t) {
		this.setPosition(this._prevPosition + t)
	}, e.resolve = function(t) {
		var e = Number(t);
		return isNaN(e) && (e = this._labels[t]), e
	}, e.toString = function() {
		return "[Timeline]"
	}, e.clone = function() {
		throw "Timeline can not be cloned."
	}, e._goto = function(t) {
		var e = this.resolve(t);
		null != e && this.setPosition(e)
	}, e._calcPosition = function(t) {
		return t < 0 ? 0 : t < this.duration ? t : this.loop ? t % this.duration : this.duration
	}, TWEEN.Timeline = TWEEN.promote(t, "EventDispatcher")
}(), this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t() {
		throw "Ease cannot be instantiated."
	}
	t.linear = function(t) {
		return t
	}, t.none = t.linear, t.get = function(t) {
		return t < -1 && (t = -1), t > 1 && (t = 1), function(e) {
			return 0 == t ? e : t < 0 ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
		}
	}, t.getPowIn = function(t) {
		return function(e) {
			return Math.pow(e, t)
		}
	}, t.getPowOut = function(t) {
		return function(e) {
			return 1 - Math.pow(1 - e, t)
		}
	}, t.getPowInOut = function(t) {
		return function(e) {
			return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t))
		}
	}, t.quadIn = t.getPowIn(2), t.quadOut = t.getPowOut(2), t.quadInOut = t.getPowInOut(2), t.cubicIn = t.getPowIn(3), t.cubicOut = t.getPowOut(3), t.cubicInOut = t.getPowInOut(3), t.quartIn = t.getPowIn(4), t.quartOut = t.getPowOut(4), t.quartInOut = t.getPowInOut(4), t.quintIn = t.getPowIn(5), t.quintOut = t.getPowOut(5), t.quintInOut = t.getPowInOut(5), t.sineIn = function(t) {
		return 1 - Math.cos(t * Math.PI / 2)
	}, t.sineOut = function(t) {
		return Math.sin(t * Math.PI / 2)
	}, t.sineInOut = function(t) {
		return -.5 * (Math.cos(Math.PI * t) - 1)
	}, t.getBackIn = function(t) {
		return function(e) {
			return e * e * ((t + 1) * e - t)
		}
	}, t.backIn = t.getBackIn(1.7), t.getBackOut = function(t) {
		return function(e) {
			return --e * e * ((t + 1) * e + t) + 1
		}
	}, t.backOut = t.getBackOut(1.7), t.getBackInOut = function(t) {
		return t *= 1.525, function(e) {
			return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
		}
	}, t.backInOut = t.getBackInOut(1.7), t.circIn = function(t) {
		return -(Math.sqrt(1 - t * t) - 1)
	}, t.circOut = function(t) {
		return Math.sqrt(1 - --t * t)
	}, t.circInOut = function(t) {
		return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
	}, t.bounceIn = function(e) {
		return 1 - t.bounceOut(1 - e)
	}, t.bounceOut = function(t) {
		return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
	}, t.bounceInOut = function(e) {
		return e < .5 ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5
	}, t.getElasticIn = function(t, e) {
		var i = 2 * Math.PI;
		return function(o) {
			if (0 == o || 1 == o) return o;
			var n = e / i * Math.asin(1 / t);
			return -(t * Math.pow(2, 10 * (o -= 1))) * Math.sin((o - n) * i / e)
		}
	}, t.elasticIn = t.getElasticIn(1, .3), t.getElasticOut = function(t, e) {
		var i = 2 * Math.PI;
		return function(o) {
			if (0 == o || 1 == o) return o;
			var n = e / i * Math.asin(1 / t);
			return t * Math.pow(2, -10 * o) * Math.sin((o - n) * i / e) + 1
		}
	}, t.elasticOut = t.getElasticOut(1, .3), t.getElasticInOut = function(t, e) {
		var i = 2 * Math.PI;
		return function(o) {
			var n = e / i * Math.asin(1 / t);
			return (o *= 2) < 1 ? t * Math.pow(2, 10 * (o -= 1)) * Math.sin((o - n) * i / e) * -.5 : t * Math.pow(2, -10 * (o -= 1)) * Math.sin((o - n) * i / e) * .5 + 1
		}
	}, t.elasticInOut = t.getElasticInOut(1, .3 * 1.5), TWEEN.Ease = t
}(), this.TWEEN = this.TWEEN || {}, function() {
	"use strict";

	function t() {
		throw "MotionGuidePlugin cannot be instantiated."
	}
	t.priority = 0, t._rotOffS, t._rotOffE, t._rotNormS, t._rotNormE, t.install = function() {
		return TWEEN.Tween.installPlugin(t, ["guide", "x", "y", "rotation"]), TWEEN.Tween.IGNORE
	}, t.init = function(t, e, i) {
		var o = t.target;
		return o.hasOwnProperty("x") || (o.x = 0), o.hasOwnProperty("y") || (o.y = 0), o.hasOwnProperty("rotation") || (o.rotation = 0), "rotation" == e && (t.__needsRot = !0), "guide" == e ? null : i
	}, t.step = function(e, i, o, n, r) {
		if ("rotation" == i && (e.__rotGlobalS = o, e.__rotGlobalE = n, t.testRotData(e, r)), "guide" != i) return n;
		var s, a = n;
		a.hasOwnProperty("path") || (a.path = []);
		var c = a.path;
		if (a.hasOwnProperty("end") || (a.end = 1), a.hasOwnProperty("start") || (a.start = o && o.hasOwnProperty("end") && o.path === c ? o.end : 0), a.hasOwnProperty("_segments") && a._length) return n;
		var h = c.length;
		if (!(h >= 6 && (h - 2) % 4 == 0)) throw "invalid 'path' data, please see documentation for valid paths";
		a._segments = [], a._length = 0;
		for (var l = 2; l < h; l += 4) {
			for (var u, p, d = c[l - 2], f = c[l - 1], v = c[l + 0], m = c[l + 1], g = c[l + 2], y = c[l + 3], b = d, E = f, w = 0, A = [], P = 1; P <= 0="==" 2="" 10;="" p++)="" {="" var="" s="P" 10,="" x="1" -="" s;="" u="x" *="" d="" +="" v="" g,="" p="x" f="" m="" y,="" w="" =="" b)="" (s="p" e)="" s))="" 1],="" b="u," e="p" }="" a._segments.push(w),="" a._segments.push(a),="" a._length="" a.orient="!0;" _="{};" return="" t.calc(a,="" a.start,="" _),="" e.__rotpaths="Number(_.rotation.toFixed(5))," a.end,="" e.__rotpathe="Number(_.rotation.toFixed(5))," r),="" ?="" (e.__guidedata="a," t.testrotdata(e,="" n)="" :="" n="" },="" t.testrotdata="function(t," if="" (void="" t.__rotglobals="" ||="" void="" t.__rotglobale)="" (t.__needsrot)="" return;="" !="=" t._curqueueprops.rotation="" e.rotation="t.target.rotation" t.__guidedata)="" i="t.__guideData," o="t.__rotGlobalE" t.__rotglobals,="" t.__rotpaths,="" r="o" n;="" ("auto"="=" i.orient)=""> 180 ? r -= 360 : r < -180 && (r += 360);
			else if ("cw" == i.orient) {
				for (; r < 0;) r += 360;
				0 == r && o > 0 && 180 != o && (r += 360)
			} else if ("ccw" == i.orient) {
				for (r = o - (n > 180 ? 360 - n : n); r > 0;) r -= 360;
				0 == r && o < 0 && -180 != o && (r -= 360)
			}
			i.rotDelta = r, i.rotOffS = t.__rotGlobalS - t.__rotPathS, t.__rotGlobalS = t.__rotGlobalE = t.__guideData = t.__needsRot = void 0
		}
	}, t.tween = function(e, i, o, n, r, s, a, c) {
		var h = r.guide;
		if (void 0 == h || h === n.guide) return o;
		if (h.lastRatio != s) {
			var l = (h.end - h.start) * (a ? h.end : s) + h.start;
			switch (t.calc(h, l, e.target), h.orient) {
			case "cw":
			case "ccw":
			case "auto":
				e.target.rotation += h.rotOffS + h.rotDelta * s;
				break;
			case "fixed":
			default:
				e.target.rotation += h.rotOffS
			}
			h.lastRatio = s
		}
		return "rotation" != i || h.orient && "false" != h.orient ? e.target[i] : o
	}, t.calc = function(t, e, i) {
		if (void 0 == t._segments) throw "Missing critical pre-calculated information, please file a bug";
		void 0 == i && (i = {
			x: 0,
			y: 0,
			rotation: 0
		});
		for (var o = t._segments, n = t.path, r = t._length * e, s = o.length - 2, a = 0; r > o[a] && a < s;) r -= o[a], a += 2;
		var c = o[a + 1],
			h = 0;
		for (s = c.length - 1; r > c[h] && h < s;) r -= c[h], h++;
		var l = h / ++s + r / (s * c[h]);
		a = 2 * a + 2;
		var u = 1 - l;
		return i.x = u * u * n[a - 2] + 2 * u * l * n[a + 0] + l * l * n[a + 2], i.y = u * u * n[a - 1] + 2 * u * l * n[a + 1] + l * l * n[a + 3], t.orient && (i.rotation = 57.2957795 * Math.atan2((n[a + 1] - n[a - 1]) * u + (n[a + 3] - n[a + 1]) * l, (n[a + 0] - n[a - 2]) * u + (n[a + 2] - n[a + 0]) * l)), i
	}, TWEEN.MotionGuidePlugin = t
}(), 
this.TWEEN = this.TWEEN || {}, function() {
	"use strict";
	var t = TWEEN.TweenJS = TWEEN.TweenJS || {};
	t.version = "NEXT", t.buildDate = "Wed, 25 Nov 2015 19:32:49 GMT"
}()</=></=>