import * as t from "@popperjs/core";
const e = new Map();
const s = {
  set(t, s, n) {
    e.has(t) || e.set(t, new Map());
    const i = e.get(t);
    i.has(s) || i.size === 0
      ? i.set(s, n)
      : console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`,
        );
  },
  get(t, s) {
    return (e.has(t) && e.get(t).get(s)) || null;
  },
  remove(t, s) {
    if (!e.has(t)) return;
    const n = e.get(t);
    n.delete(s);
    n.size === 0 && e.delete(t);
  },
};
const n = 1e6;
const i = 1e3;
const o = "transitionend";
/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */ const parseSelector = (t) => {
  t &&
    window.CSS &&
    window.CSS.escape &&
    (t = t.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`));
  return t;
};
const toType = (t) =>
  t === null || t === void 0
    ? `${t}`
    : Object.prototype.toString
        .call(t)
        .match(/\s([a-z]+)/i)[1]
        .toLowerCase();
const getUID = (t) => {
  do {
    t += Math.floor(Math.random() * n);
  } while (document.getElementById(t));
  return t;
};
const getTransitionDurationFromElement = (t) => {
  if (!t) return 0;
  let { transitionDuration: e, transitionDelay: s } =
    window.getComputedStyle(t);
  const n = Number.parseFloat(e);
  const o = Number.parseFloat(s);
  if (!n && !o) return 0;
  e = e.split(",")[0];
  s = s.split(",")[0];
  return (Number.parseFloat(e) + Number.parseFloat(s)) * i;
};
const triggerTransitionEnd = (t) => {
  t.dispatchEvent(new Event(o));
};
const isElement = (t) => {
  if (!t || typeof t !== "object") return false;
  typeof t.jquery !== "undefined" && (t = t[0]);
  return typeof t.nodeType !== "undefined";
};
const getElement = (t) =>
  isElement(t)
    ? t.jquery
      ? t[0]
      : t
    : typeof t === "string" && t.length > 0
      ? document.querySelector(parseSelector(t))
      : null;
const isVisible = (t) => {
  if (!isElement(t) || t.getClientRects().length === 0) return false;
  const e = getComputedStyle(t).getPropertyValue("visibility") === "visible";
  const s = t.closest("details:not([open])");
  if (!s) return e;
  if (s !== t) {
    const e = t.closest("summary");
    if (e && e.parentNode !== s) return false;
    if (e === null) return false;
  }
  return e;
};
const isDisabled = (t) =>
  !t ||
  t.nodeType !== Node.ELEMENT_NODE ||
  !!t.classList.contains("disabled") ||
  (typeof t.disabled !== "undefined"
    ? t.disabled
    : t.hasAttribute("disabled") && t.getAttribute("disabled") !== "false");
const findShadowRoot = (t) => {
  if (!document.documentElement.attachShadow) return null;
  if (typeof t.getRootNode === "function") {
    const e = t.getRootNode();
    return e instanceof ShadowRoot ? e : null;
  }
  return t instanceof ShadowRoot
    ? t
    : t.parentNode
      ? findShadowRoot(t.parentNode)
      : null;
};
const noop = () => {};
/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */ const reflow = (t) => {
  t.offsetHeight;
};
const getjQuery = () =>
  window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
    ? window.jQuery
    : null;
const r = [];
const onDOMContentLoaded = (t) => {
  if (document.readyState === "loading") {
    r.length ||
      document.addEventListener("DOMContentLoaded", () => {
        for (const t of r) t();
      });
    r.push(t);
  } else t();
};
const isRTL = () => document.documentElement.dir === "rtl";
const defineJQueryPlugin = (t) => {
  onDOMContentLoaded(() => {
    const e = getjQuery();
    if (e) {
      const s = t.NAME;
      const n = e.fn[s];
      e.fn[s] = t.jQueryInterface;
      e.fn[s].Constructor = t;
      e.fn[s].noConflict = () => {
        e.fn[s] = n;
        return t.jQueryInterface;
      };
    }
  });
};
const execute = (t, e = [], s = t) => (typeof t === "function" ? t(...e) : s);
const executeAfterTransition = (t, e, s = true) => {
  if (!s) {
    execute(t);
    return;
  }
  const n = 5;
  const i = getTransitionDurationFromElement(e) + n;
  let r = false;
  const handler = ({ target: s }) => {
    if (s === e) {
      r = true;
      e.removeEventListener(o, handler);
      execute(t);
    }
  };
  e.addEventListener(o, handler);
  setTimeout(() => {
    r || triggerTransitionEnd(e);
  }, i);
};
/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */ const getNextActiveElement = (t, e, s, n) => {
  const i = t.length;
  let o = t.indexOf(e);
  if (o === -1) return !s && n ? t[i - 1] : t[0];
  o += s ? 1 : -1;
  n && (o = (o + i) % i);
  return t[Math.max(0, Math.min(o, i - 1))];
};
const a = /[^.]*(?=\..*)\.|.*/;
const c = /\..*/;
const l = /::\d+$/;
const h = {};
let u = 1;
const d = { mouseenter: "mouseover", mouseleave: "mouseout" };
const f = new Set([
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll",
]);
function makeEventUid(t, e) {
  return (e && `${e}::${u++}`) || t.uidEvent || u++;
}
function getElementEvents(t) {
  const e = makeEventUid(t);
  t.uidEvent = e;
  h[e] = h[e] || {};
  return h[e];
}
function bootstrapHandler(t, e) {
  return function handler(s) {
    hydrateObj(s, { delegateTarget: t });
    handler.oneOff && _.off(t, s.type, e);
    return e.apply(t, [s]);
  };
}
function bootstrapDelegationHandler(t, e, s) {
  return function handler(n) {
    const i = t.querySelectorAll(e);
    for (let { target: o } = n; o && o !== this; o = o.parentNode)
      for (const r of i)
        if (r === o) {
          hydrateObj(n, { delegateTarget: o });
          handler.oneOff && _.off(t, n.type, e, s);
          return s.apply(o, [n]);
        }
  };
}
function findHandler(t, e, s = null) {
  return Object.values(t).find(
    (t) => t.callable === e && t.delegationSelector === s,
  );
}
function normalizeParameters(t, e, s) {
  const n = typeof e === "string";
  const i = n ? s : e || s;
  let o = getTypeEvent(t);
  f.has(o) || (o = t);
  return [n, i, o];
}
function addHandler(t, e, s, n, i) {
  if (typeof e !== "string" || !t) return;
  let [o, r, c] = normalizeParameters(e, s, n);
  if (e in d) {
    const wrapFunction = (t) =>
      function (e) {
        if (
          !e.relatedTarget ||
          (e.relatedTarget !== e.delegateTarget &&
            !e.delegateTarget.contains(e.relatedTarget))
        )
          return t.call(this, e);
      };
    r = wrapFunction(r);
  }
  const l = getElementEvents(t);
  const h = l[c] || (l[c] = {});
  const u = findHandler(h, r, o ? s : null);
  if (u) {
    u.oneOff = u.oneOff && i;
    return;
  }
  const f = makeEventUid(r, e.replace(a, ""));
  const _ = o ? bootstrapDelegationHandler(t, s, r) : bootstrapHandler(t, r);
  _.delegationSelector = o ? s : null;
  _.callable = r;
  _.oneOff = i;
  _.uidEvent = f;
  h[f] = _;
  t.addEventListener(c, _, o);
}
function removeHandler(t, e, s, n, i) {
  const o = findHandler(e[s], n, i);
  if (o) {
    t.removeEventListener(s, o, Boolean(i));
    delete e[s][o.uidEvent];
  }
}
function removeNamespacedHandlers(t, e, s, n) {
  const i = e[s] || {};
  for (const [o, r] of Object.entries(i))
    o.includes(n) && removeHandler(t, e, s, r.callable, r.delegationSelector);
}
function getTypeEvent(t) {
  t = t.replace(c, "");
  return d[t] || t;
}
const _ = {
  on(t, e, s, n) {
    addHandler(t, e, s, n, false);
  },
  one(t, e, s, n) {
    addHandler(t, e, s, n, true);
  },
  off(t, e, s, n) {
    if (typeof e !== "string" || !t) return;
    const [i, o, r] = normalizeParameters(e, s, n);
    const a = r !== e;
    const c = getElementEvents(t);
    const h = c[r] || {};
    const u = e.startsWith(".");
    if (typeof o === "undefined") {
      if (u)
        for (const s of Object.keys(c))
          removeNamespacedHandlers(t, c, s, e.slice(1));
      for (const [s, n] of Object.entries(h)) {
        const i = s.replace(l, "");
        (a && !e.includes(i)) ||
          removeHandler(t, c, r, n.callable, n.delegationSelector);
      }
    } else {
      if (!Object.keys(h).length) return;
      removeHandler(t, c, r, o, i ? s : null);
    }
  },
  trigger(t, e, s) {
    if (typeof e !== "string" || !t) return null;
    const n = getjQuery();
    const i = getTypeEvent(e);
    const o = e !== i;
    let r = null;
    let a = true;
    let c = true;
    let l = false;
    if (o && n) {
      r = n.Event(e, s);
      n(t).trigger(r);
      a = !r.isPropagationStopped();
      c = !r.isImmediatePropagationStopped();
      l = r.isDefaultPrevented();
    }
    const h = hydrateObj(new Event(e, { bubbles: a, cancelable: true }), s);
    l && h.preventDefault();
    c && t.dispatchEvent(h);
    h.defaultPrevented && r && r.preventDefault();
    return h;
  },
};
function hydrateObj(t, e = {}) {
  for (const [s, n] of Object.entries(e))
    try {
      t[s] = n;
    } catch (e) {
      Object.defineProperty(t, s, {
        configurable: true,
        get() {
          return n;
        },
      });
    }
  return t;
}
function normalizeData(t) {
  if (t === "true") return true;
  if (t === "false") return false;
  if (t === Number(t).toString()) return Number(t);
  if (t === "" || t === "null") return null;
  if (typeof t !== "string") return t;
  try {
    return JSON.parse(decodeURIComponent(t));
  } catch (e) {
    return t;
  }
}
function normalizeDataKey(t) {
  return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const g = {
  setDataAttribute(t, e, s) {
    t.setAttribute(`data-bs-${normalizeDataKey(e)}`, s);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-bs-${normalizeDataKey(e)}`);
  },
  getDataAttributes(t) {
    if (!t) return {};
    const e = {};
    const s = Object.keys(t.dataset).filter(
      (t) => t.startsWith("bs") && !t.startsWith("bsConfig"),
    );
    for (const n of s) {
      let s = n.replace(/^bs/, "");
      s = s.charAt(0).toLowerCase() + s.slice(1, s.length);
      e[s] = normalizeData(t.dataset[n]);
    }
    return e;
  },
  getDataAttribute(t, e) {
    return normalizeData(t.getAttribute(`data-bs-${normalizeDataKey(e)}`));
  },
};
class Config {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!',
    );
  }
  _getConfig(t) {
    t = this._mergeConfigObj(t);
    t = this._configAfterMerge(t);
    this._typeCheckConfig(t);
    return t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, e) {
    const s = isElement(e) ? g.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...(typeof s === "object" ? s : {}),
      ...(isElement(e) ? g.getDataAttributes(e) : {}),
      ...(typeof t === "object" ? t : {}),
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [s, n] of Object.entries(e)) {
      const e = t[s];
      const i = isElement(e) ? "element" : toType(e);
      if (!new RegExp(n).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${i}" but expected type "${n}".`,
        );
    }
  }
}
const p = "5.3.3";
class BaseComponent extends Config {
  constructor(t, e) {
    super();
    t = getElement(t);
    if (t) {
      this._element = t;
      this._config = this._getConfig(e);
      s.set(this._element, this.constructor.DATA_KEY, this);
    }
  }
  dispose() {
    s.remove(this._element, this.constructor.DATA_KEY);
    _.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, e, s = true) {
    executeAfterTransition(t, e, s);
  }
  _getConfig(t) {
    t = this._mergeConfigObj(t, this._element);
    t = this._configAfterMerge(t);
    this._typeCheckConfig(t);
    return t;
  }
  static getInstance(t) {
    return s.get(getElement(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e === "object" ? e : null);
  }
  static get VERSION() {
    return p;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const getSelector = (t) => {
  let e = t.getAttribute("data-bs-target");
  if (!e || e === "#") {
    let s = t.getAttribute("href");
    if (!s || (!s.includes("#") && !s.startsWith("."))) return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`);
    e = s && s !== "#" ? s.trim() : null;
  }
  return e
    ? e
        .split(",")
        .map((t) => parseSelector(t))
        .join(",")
    : null;
};
const m = {
  find(t, e = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(e, t));
  },
  findOne(t, e = document.documentElement) {
    return Element.prototype.querySelector.call(e, t);
  },
  children(t, e) {
    return [].concat(...t.children).filter((t) => t.matches(e));
  },
  parents(t, e) {
    const s = [];
    let n = t.parentNode.closest(e);
    while (n) {
      s.push(n);
      n = n.parentNode.closest(e);
    }
    return s;
  },
  prev(t, e) {
    let s = t.previousElementSibling;
    while (s) {
      if (s.matches(e)) return [s];
      s = s.previousElementSibling;
    }
    return [];
  },
  next(t, e) {
    let s = t.nextElementSibling;
    while (s) {
      if (s.matches(e)) return [s];
      s = s.nextElementSibling;
    }
    return [];
  },
  focusableChildren(t) {
    const e = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]',
    ]
      .map((t) => `${t}:not([tabindex^="-"])`)
      .join(",");
    return this.find(e, t).filter((t) => !isDisabled(t) && isVisible(t));
  },
  getSelectorFromElement(t) {
    const e = getSelector(t);
    return e && m.findOne(e) ? e : null;
  },
  getElementFromSelector(t) {
    const e = getSelector(t);
    return e ? m.findOne(e) : null;
  },
  getMultipleElementsFromSelector(t) {
    const e = getSelector(t);
    return e ? m.find(e) : [];
  },
};
const enableDismissTrigger = (t, e = "hide") => {
  const s = `click.dismiss${t.EVENT_KEY}`;
  const n = t.NAME;
  _.on(document, s, `[data-bs-dismiss="${n}"]`, function (s) {
    ["A", "AREA"].includes(this.tagName) && s.preventDefault();
    if (isDisabled(this)) return;
    const i = m.getElementFromSelector(this) || this.closest(`.${n}`);
    const o = t.getOrCreateInstance(i);
    o[e]();
  });
};
const b = "alert";
const v = "bs.alert";
const y = `.${v}`;
const w = `close${y}`;
const E = `closed${y}`;
const A = "fade";
const C = "show";
class Alert extends BaseComponent {
  static get NAME() {
    return b;
  }
  close() {
    const t = _.trigger(this._element, w);
    if (t.defaultPrevented) return;
    this._element.classList.remove(C);
    const e = this._element.classList.contains(A);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  _destroyElement() {
    this._element.remove();
    _.trigger(this._element, E);
    this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Alert.getOrCreateInstance(this);
      if (typeof t === "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
enableDismissTrigger(Alert, "close");
defineJQueryPlugin(Alert);
const T = "button";
const k = "bs.button";
const $ = `.${k}`;
const S = ".data-api";
const O = "active";
const L = '[data-bs-toggle="button"]';
const D = `click${$}${S}`;
class Button extends BaseComponent {
  static get NAME() {
    return T;
  }
  toggle() {
    this._element.setAttribute(
      "aria-pressed",
      this._element.classList.toggle(O),
    );
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Button.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
_.on(document, D, L, (t) => {
  t.preventDefault();
  const e = t.target.closest(L);
  const s = Button.getOrCreateInstance(e);
  s.toggle();
});
defineJQueryPlugin(Button);
const I = "swipe";
const N = ".bs.swipe";
const P = `touchstart${N}`;
const M = `touchmove${N}`;
const x = `touchend${N}`;
const j = `pointerdown${N}`;
const F = `pointerup${N}`;
const H = "touch";
const B = "pen";
const z = "pointer-event";
const q = 40;
const W = { endCallback: null, leftCallback: null, rightCallback: null };
const R = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)",
};
class Swipe extends Config {
  constructor(t, e) {
    super();
    this._element = t;
    if (t && Swipe.isSupported()) {
      this._config = this._getConfig(e);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }
  }
  static get Default() {
    return W;
  }
  static get DefaultType() {
    return R;
  }
  static get NAME() {
    return I;
  }
  dispose() {
    _.off(this._element, N);
  }
  _start(t) {
    this._supportPointerEvents
      ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
      : (this._deltaX = t.touches[0].clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) &&
      (this._deltaX = t.clientX - this._deltaX);
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(t) {
    this._deltaX =
      t.touches && t.touches.length > 1
        ? 0
        : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= q) return;
    const e = t / this._deltaX;
    this._deltaX = 0;
    e &&
      execute(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      _.on(this._element, j, (t) => this._start(t));
      _.on(this._element, F, (t) => this._end(t));
      this._element.classList.add(z);
    } else {
      _.on(this._element, P, (t) => this._start(t));
      _.on(this._element, M, (t) => this._move(t));
      _.on(this._element, x, (t) => this._end(t));
    }
  }
  _eventIsPointerPenTouch(t) {
    return (
      this._supportPointerEvents && (t.pointerType === B || t.pointerType === H)
    );
  }
  static isSupported() {
    return (
      "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    );
  }
}
const K = "carousel";
const V = "bs.carousel";
const Q = `.${V}`;
const U = ".data-api";
const X = "ArrowLeft";
const Y = "ArrowRight";
const G = 500;
const J = "next";
const Z = "prev";
const tt = "left";
const et = "right";
const st = `slide${Q}`;
const nt = `slid${Q}`;
const it = `keydown${Q}`;
const ot = `mouseenter${Q}`;
const rt = `mouseleave${Q}`;
const at = `dragstart${Q}`;
const ct = `load${Q}${U}`;
const lt = `click${Q}${U}`;
const ht = "carousel";
const ut = "active";
const dt = "slide";
const ft = "carousel-item-end";
const _t = "carousel-item-start";
const gt = "carousel-item-next";
const pt = "carousel-item-prev";
const mt = ".active";
const bt = ".carousel-item";
const vt = mt + bt;
const yt = ".carousel-item img";
const wt = ".carousel-indicators";
const Et = "[data-bs-slide], [data-bs-slide-to]";
const At = '[data-bs-ride="carousel"]';
const Ct = { [X]: et, [Y]: tt };
const Tt = {
  interval: 5e3,
  keyboard: true,
  pause: "hover",
  ride: false,
  touch: true,
  wrap: true,
};
const kt = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean",
};
class Carousel extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = m.findOne(wt, this._element);
    this._addEventListeners();
    this._config.ride === ht && this.cycle();
  }
  static get Default() {
    return Tt;
  }
  static get DefaultType() {
    return kt;
  }
  static get NAME() {
    return K;
  }
  next() {
    this._slide(J);
  }
  nextWhenVisible() {
    !document.hidden && isVisible(this._element) && this.next();
  }
  prev() {
    this._slide(Z);
  }
  pause() {
    this._isSliding && triggerTransitionEnd(this._element);
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(
      () => this.nextWhenVisible(),
      this._config.interval,
    );
  }
  _maybeEnableCycle() {
    this._config.ride &&
      (this._isSliding
        ? _.one(this._element, nt, () => this.cycle())
        : this.cycle());
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0) return;
    if (this._isSliding) {
      _.one(this._element, nt, () => this.to(t));
      return;
    }
    const s = this._getItemIndex(this._getActive());
    if (s === t) return;
    const n = t > s ? J : Z;
    this._slide(n, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose();
    super.dispose();
  }
  _configAfterMerge(t) {
    t.defaultInterval = t.interval;
    return t;
  }
  _addEventListeners() {
    this._config.keyboard && _.on(this._element, it, (t) => this._keydown(t));
    if (this._config.pause === "hover") {
      _.on(this._element, ot, () => this.pause());
      _.on(this._element, rt, () => this._maybeEnableCycle());
    }
    this._config.touch && Swipe.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const t of m.find(yt, this._element))
      _.on(t, at, (t) => t.preventDefault());
    const endCallBack = () => {
      if (this._config.pause === "hover") {
        this.pause();
        this.touchTimeout && clearTimeout(this.touchTimeout);
        this.touchTimeout = setTimeout(
          () => this._maybeEnableCycle(),
          G + this._config.interval,
        );
      }
    };
    const t = {
      leftCallback: () => this._slide(this._directionToOrder(tt)),
      rightCallback: () => this._slide(this._directionToOrder(et)),
      endCallback: endCallBack,
    };
    this._swipeHelper = new Swipe(this._element, t);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const e = Ct[t.key];
    if (e) {
      t.preventDefault();
      this._slide(this._directionToOrder(e));
    }
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const e = m.findOne(mt, this._indicatorsElement);
    e.classList.remove(ut);
    e.removeAttribute("aria-current");
    const s = m.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    if (s) {
      s.classList.add(ut);
      s.setAttribute("aria-current", "true");
    }
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding) return;
    const s = this._getActive();
    const n = t === J;
    const i =
      e || getNextActiveElement(this._getItems(), s, n, this._config.wrap);
    if (i === s) return;
    const o = this._getItemIndex(i);
    const triggerEvent = (e) =>
      _.trigger(this._element, e, {
        relatedTarget: i,
        direction: this._orderToDirection(t),
        from: this._getItemIndex(s),
        to: o,
      });
    const r = triggerEvent(st);
    if (r.defaultPrevented) return;
    if (!s || !i) return;
    const a = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(o);
    this._activeElement = i;
    const c = n ? _t : ft;
    const l = n ? gt : pt;
    i.classList.add(l);
    reflow(i);
    s.classList.add(c);
    i.classList.add(c);
    const completeCallBack = () => {
      i.classList.remove(c, l);
      i.classList.add(ut);
      s.classList.remove(ut, l, c);
      this._isSliding = false;
      triggerEvent(nt);
    };
    this._queueCallback(completeCallBack, s, this._isAnimated());
    a && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(dt);
  }
  _getActive() {
    return m.findOne(vt, this._element);
  }
  _getItems() {
    return m.find(bt, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(t) {
    return isRTL() ? (t === tt ? Z : J) : t === tt ? J : Z;
  }
  _orderToDirection(t) {
    return isRTL() ? (t === Z ? tt : et) : t === Z ? et : tt;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Carousel.getOrCreateInstance(this, t);
      if (typeof t !== "number") {
        if (typeof t === "string") {
          if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      } else e.to(t);
    });
  }
}
_.on(document, lt, Et, function (t) {
  const e = m.getElementFromSelector(this);
  if (!e || !e.classList.contains(ht)) return;
  t.preventDefault();
  const s = Carousel.getOrCreateInstance(e);
  const n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n);
    s._maybeEnableCycle();
  } else if (g.getDataAttribute(this, "slide") !== "next") {
    s.prev();
    s._maybeEnableCycle();
  } else {
    s.next();
    s._maybeEnableCycle();
  }
});
_.on(window, ct, () => {
  const t = m.find(At);
  for (const e of t) Carousel.getOrCreateInstance(e);
});
defineJQueryPlugin(Carousel);
const $t = "collapse";
const St = "bs.collapse";
const Ot = `.${St}`;
const Lt = ".data-api";
const Dt = `show${Ot}`;
const It = `shown${Ot}`;
const Nt = `hide${Ot}`;
const Pt = `hidden${Ot}`;
const Mt = `click${Ot}${Lt}`;
const xt = "show";
const jt = "collapse";
const Ft = "collapsing";
const Ht = "collapsed";
const Bt = `:scope .${jt} .${jt}`;
const zt = "collapse-horizontal";
const qt = "width";
const Wt = "height";
const Rt = ".collapse.show, .collapse.collapsing";
const Kt = '[data-bs-toggle="collapse"]';
const Vt = { parent: null, toggle: true };
const Qt = { parent: "(null|element)", toggle: "boolean" };
class Collapse extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._isTransitioning = false;
    this._triggerArray = [];
    const s = m.find(Kt);
    for (const t of s) {
      const e = m.getSelectorFromElement(t);
      const s = m.find(e).filter((t) => t === this._element);
      e !== null && s.length && this._triggerArray.push(t);
    }
    this._initializeChildren();
    this._config.parent ||
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    this._config.toggle && this.toggle();
  }
  static get Default() {
    return Vt;
  }
  static get DefaultType() {
    return Qt;
  }
  static get NAME() {
    return $t;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    this._config.parent &&
      (t = this._getFirstLevelChildren(Rt)
        .filter((t) => t !== this._element)
        .map((t) => Collapse.getOrCreateInstance(t, { toggle: false })));
    if (t.length && t[0]._isTransitioning) return;
    const e = _.trigger(this._element, Dt);
    if (e.defaultPrevented) return;
    for (const e of t) e.hide();
    const s = this._getDimension();
    this._element.classList.remove(jt);
    this._element.classList.add(Ft);
    this._element.style[s] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(Ft);
      this._element.classList.add(jt, xt);
      this._element.style[s] = "";
      _.trigger(this._element, It);
    };
    const n = s[0].toUpperCase() + s.slice(1);
    const i = `scroll${n}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[s] = `${this._element[i]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) return;
    const t = _.trigger(this._element, Nt);
    if (t.defaultPrevented) return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`;
    reflow(this._element);
    this._element.classList.add(Ft);
    this._element.classList.remove(jt, xt);
    for (const t of this._triggerArray) {
      const e = m.getElementFromSelector(t);
      e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], false);
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(Ft);
      this._element.classList.add(jt);
      _.trigger(this._element, Pt);
    };
    this._element.style[e] = "";
    this._queueCallback(complete, this._element, true);
  }
  _isShown(t = this._element) {
    return t.classList.contains(xt);
  }
  _configAfterMerge(t) {
    t.toggle = Boolean(t.toggle);
    t.parent = getElement(t.parent);
    return t;
  }
  _getDimension() {
    return this._element.classList.contains(zt) ? qt : Wt;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(Kt);
    for (const e of t) {
      const t = m.getElementFromSelector(e);
      t && this._addAriaAndCollapsedClass([e], this._isShown(t));
    }
  }
  _getFirstLevelChildren(t) {
    const e = m.find(Bt, this._config.parent);
    return m.find(t, this._config.parent).filter((t) => !e.includes(t));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const s of t) {
        s.classList.toggle(Ht, !e);
        s.setAttribute("aria-expanded", e);
      }
  }
  static jQueryInterface(t) {
    const e = {};
    typeof t === "string" && /show|hide/.test(t) && (e.toggle = false);
    return this.each(function () {
      const s = Collapse.getOrCreateInstance(this, e);
      if (typeof t === "string") {
        if (typeof s[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
_.on(document, Mt, Kt, function (t) {
  (t.target.tagName === "A" ||
    (t.delegateTarget && t.delegateTarget.tagName === "A")) &&
    t.preventDefault();
  for (const t of m.getMultipleElementsFromSelector(this))
    Collapse.getOrCreateInstance(t, { toggle: false }).toggle();
});
defineJQueryPlugin(Collapse);
const Ut = "dropdown";
const Xt = "bs.dropdown";
const Yt = `.${Xt}`;
const Gt = ".data-api";
const Jt = "Escape";
const Zt = "Tab";
const te = "ArrowUp";
const ee = "ArrowDown";
const se = 2;
const ne = `hide${Yt}`;
const ie = `hidden${Yt}`;
const oe = `show${Yt}`;
const re = `shown${Yt}`;
const ae = `click${Yt}${Gt}`;
const ce = `keydown${Yt}${Gt}`;
const le = `keyup${Yt}${Gt}`;
const he = "show";
const ue = "dropup";
const de = "dropend";
const fe = "dropstart";
const _e = "dropup-center";
const ge = "dropdown-center";
const pe = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
const me = `${pe}.${he}`;
const be = ".dropdown-menu";
const ve = ".navbar";
const ye = ".navbar-nav";
const we = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const Ee = isRTL() ? "top-end" : "top-start";
const Ae = isRTL() ? "top-start" : "top-end";
const Ce = isRTL() ? "bottom-end" : "bottom-start";
const Te = isRTL() ? "bottom-start" : "bottom-end";
const ke = isRTL() ? "left-start" : "right-start";
const $e = isRTL() ? "right-start" : "left-start";
const Se = "top";
const Oe = "bottom";
const Le = {
  autoClose: true,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle",
};
const De = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)",
};
class Dropdown extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._popper = null;
    this._parent = this._element.parentNode;
    this._menu =
      m.next(this._element, be)[0] ||
      m.prev(this._element, be)[0] ||
      m.findOne(be, this._parent);
    this._inNavbar = this._detectNavbar();
  }
  static get Default() {
    return Le;
  }
  static get DefaultType() {
    return De;
  }
  static get NAME() {
    return Ut;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) return;
    const t = { relatedTarget: this._element };
    const e = _.trigger(this._element, oe, t);
    if (!e.defaultPrevented) {
      this._createPopper();
      if (
        "ontouchstart" in document.documentElement &&
        !this._parent.closest(ye)
      )
        for (const t of [].concat(...document.body.children))
          _.on(t, "mouseover", noop);
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(he);
      this._element.classList.add(he);
      _.trigger(this._element, re, t);
    }
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) return;
    const t = { relatedTarget: this._element };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy();
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    this._popper && this._popper.update();
  }
  _completeHide(t) {
    const e = _.trigger(this._element, ne, t);
    if (!e.defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const t of [].concat(...document.body.children))
          _.off(t, "mouseover", noop);
      this._popper && this._popper.destroy();
      this._menu.classList.remove(he);
      this._element.classList.remove(he);
      this._element.setAttribute("aria-expanded", "false");
      g.removeDataAttribute(this._menu, "popper");
      _.trigger(this._element, ie, t);
    }
  }
  _getConfig(t) {
    t = super._getConfig(t);
    if (
      typeof t.reference === "object" &&
      !isElement(t.reference) &&
      typeof t.reference.getBoundingClientRect !== "function"
    )
      throw new TypeError(
        `${Ut.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
      );
    return t;
  }
  _createPopper() {
    if (typeof t === "undefined")
      throw new TypeError(
        "Bootstrap's dropdowns require Popper (https://popper.js.org)",
      );
    let e = this._element;
    this._config.reference === "parent"
      ? (e = this._parent)
      : isElement(this._config.reference)
        ? (e = getElement(this._config.reference))
        : typeof this._config.reference === "object" &&
          (e = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = t.createPopper(e, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(he);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(de)) return ke;
    if (t.classList.contains(fe)) return $e;
    if (t.classList.contains(_e)) return Se;
    if (t.classList.contains(ge)) return Oe;
    const e =
      getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() ===
      "end";
    return t.classList.contains(ue) ? (e ? Ae : Ee) : e ? Te : Ce;
  }
  _detectNavbar() {
    return this._element.closest(ve) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t === "string"
      ? t.split(",").map((t) => Number.parseInt(t, 10))
      : typeof t === "function"
        ? (e) => t(e, this._element)
        : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        { name: "offset", options: { offset: this._getOffset() } },
      ],
    };
    if (this._inNavbar || this._config.display === "static") {
      g.setDataAttribute(this._menu, "popper", "static");
      t.modifiers = [{ name: "applyStyles", enabled: false }];
    }
    return { ...t, ...execute(this._config.popperConfig, [t]) };
  }
  _selectMenuItem({ key: t, target: e }) {
    const s = m.find(we, this._menu).filter((t) => isVisible(t));
    s.length && getNextActiveElement(s, e, t === ee, !s.includes(e)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Dropdown.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (typeof e[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === se || (t.type === "keyup" && t.key !== Zt)) return;
    const e = m.find(me);
    for (const s of e) {
      const e = Dropdown.getInstance(s);
      if (!e || e._config.autoClose === false) continue;
      const n = t.composedPath();
      const i = n.includes(e._menu);
      if (
        n.includes(e._element) ||
        (e._config.autoClose === "inside" && !i) ||
        (e._config.autoClose === "outside" && i)
      )
        continue;
      if (
        e._menu.contains(t.target) &&
        ((t.type === "keyup" && t.key === Zt) ||
          /input|select|option|textarea|form/i.test(t.target.tagName))
      )
        continue;
      const o = { relatedTarget: e._element };
      t.type === "click" && (o.clickEvent = t);
      e._completeHide(o);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName);
    const s = t.key === Jt;
    const n = [te, ee].includes(t.key);
    if (!n && !s) return;
    if (e && !s) return;
    t.preventDefault();
    const i = this.matches(pe)
      ? this
      : m.prev(this, pe)[0] ||
        m.next(this, pe)[0] ||
        m.findOne(pe, t.delegateTarget.parentNode);
    const o = Dropdown.getOrCreateInstance(i);
    if (n) {
      t.stopPropagation();
      o.show();
      o._selectMenuItem(t);
    } else if (o._isShown()) {
      t.stopPropagation();
      o.hide();
      i.focus();
    }
  }
}
_.on(document, ce, pe, Dropdown.dataApiKeydownHandler);
_.on(document, ce, be, Dropdown.dataApiKeydownHandler);
_.on(document, ae, Dropdown.clearMenus);
_.on(document, le, Dropdown.clearMenus);
_.on(document, ae, pe, function (t) {
  t.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown);
const Ie = "backdrop";
const Ne = "fade";
const Pe = "show";
const Me = `mousedown.bs.${Ie}`;
const xe = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  rootElement: "body",
};
const je = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)",
};
class Backdrop extends Config {
  constructor(t) {
    super();
    this._config = this._getConfig(t);
    this._isAppended = false;
    this._element = null;
  }
  static get Default() {
    return xe;
  }
  static get DefaultType() {
    return je;
  }
  static get NAME() {
    return Ie;
  }
  show(t) {
    if (!this._config.isVisible) {
      execute(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && reflow(e);
    e.classList.add(Pe);
    this._emulateAnimation(() => {
      execute(t);
    });
  }
  hide(t) {
    if (this._config.isVisible) {
      this._getElement().classList.remove(Pe);
      this._emulateAnimation(() => {
        this.dispose();
        execute(t);
      });
    } else execute(t);
  }
  dispose() {
    if (this._isAppended) {
      _.off(this._element, Me);
      this._element.remove();
      this._isAppended = false;
    }
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className;
      this._config.isAnimated && t.classList.add(Ne);
      this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    t.rootElement = getElement(t.rootElement);
    return t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t);
    _.on(t, Me, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(t) {
    executeAfterTransition(t, this._getElement(), this._config.isAnimated);
  }
}
const Fe = "focustrap";
const He = "bs.focustrap";
const Be = `.${He}`;
const ze = `focusin${Be}`;
const qe = `keydown.tab${Be}`;
const We = "Tab";
const Re = "forward";
const Ke = "backward";
const Ve = { autofocus: true, trapElement: null };
const Qe = { autofocus: "boolean", trapElement: "element" };
class FocusTrap extends Config {
  constructor(t) {
    super();
    this._config = this._getConfig(t);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  static get Default() {
    return Ve;
  }
  static get DefaultType() {
    return Qe;
  }
  static get NAME() {
    return Fe;
  }
  activate() {
    if (!this._isActive) {
      this._config.autofocus && this._config.trapElement.focus();
      _.off(document, Be);
      _.on(document, ze, (t) => this._handleFocusin(t));
      _.on(document, qe, (t) => this._handleKeydown(t));
      this._isActive = true;
    }
  }
  deactivate() {
    if (this._isActive) {
      this._isActive = false;
      _.off(document, Be);
    }
  }
  _handleFocusin(t) {
    const { trapElement: e } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target)) return;
    const s = m.focusableChildren(e);
    s.length === 0
      ? e.focus()
      : this._lastTabNavDirection === Ke
        ? s[s.length - 1].focus()
        : s[0].focus();
  }
  _handleKeydown(t) {
    t.key === We && (this._lastTabNavDirection = t.shiftKey ? Ke : Re);
  }
}
const Ue = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
const Xe = ".sticky-top";
const Ye = "padding-right";
const Ge = "margin-right";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(this._element, Ye, (e) => e + t);
    this._setElementAttributes(Ue, Ye, (e) => e + t);
    this._setElementAttributes(Xe, Ge, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, Ye);
    this._resetElementAttributes(Ue, Ye);
    this._resetElementAttributes(Xe, Ge);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, e, s) {
    const n = this.getWidth();
    const manipulationCallBack = (t) => {
      if (t !== this._element && window.innerWidth > t.clientWidth + n) return;
      this._saveInitialAttribute(t, e);
      const i = window.getComputedStyle(t).getPropertyValue(e);
      t.style.setProperty(e, `${s(Number.parseFloat(i))}px`);
    };
    this._applyManipulationCallback(t, manipulationCallBack);
  }
  _saveInitialAttribute(t, e) {
    const s = t.style.getPropertyValue(e);
    s && g.setDataAttribute(t, e, s);
  }
  _resetElementAttributes(t, e) {
    const manipulationCallBack = (t) => {
      const s = g.getDataAttribute(t, e);
      if (s !== null) {
        g.removeDataAttribute(t, e);
        t.style.setProperty(e, s);
      } else t.style.removeProperty(e);
    };
    this._applyManipulationCallback(t, manipulationCallBack);
  }
  _applyManipulationCallback(t, e) {
    if (isElement(t)) e(t);
    else for (const s of m.find(t, this._element)) e(s);
  }
}
const Je = "modal";
const Ze = "bs.modal";
const ts = `.${Ze}`;
const es = ".data-api";
const ss = "Escape";
const ns = `hide${ts}`;
const is = `hidePrevented${ts}`;
const os = `hidden${ts}`;
const rs = `show${ts}`;
const as = `shown${ts}`;
const cs = `resize${ts}`;
const ls = `click.dismiss${ts}`;
const hs = `mousedown.dismiss${ts}`;
const us = `keydown.dismiss${ts}`;
const ds = `click${ts}${es}`;
const fs = "modal-open";
const _s = "fade";
const gs = "show";
const ps = "modal-static";
const ms = ".modal.show";
const bs = ".modal-dialog";
const vs = ".modal-body";
const ys = '[data-bs-toggle="modal"]';
const ws = { backdrop: true, focus: true, keyboard: true };
const Es = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean",
};
class Modal extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._dialog = m.findOne(bs, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }
  static get Default() {
    return ws;
  }
  static get DefaultType() {
    return Es;
  }
  static get NAME() {
    return Je;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || this._isTransitioning) return;
    const e = _.trigger(this._element, rs, { relatedTarget: t });
    if (!e.defaultPrevented) {
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(fs);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(t));
    }
  }
  hide() {
    if (!this._isShown || this._isTransitioning) return;
    const t = _.trigger(this._element, ns);
    if (!t.defaultPrevented) {
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(gs);
      this._queueCallback(
        () => this._hideModal(),
        this._element,
        this._isAnimated(),
      );
    }
  }
  dispose() {
    _.off(window, ts);
    _.off(this._dialog, ts);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({ trapElement: this._element });
  }
  _showElement(t) {
    document.body.contains(this._element) ||
      document.body.append(this._element);
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    const e = m.findOne(vs, this._dialog);
    e && (e.scrollTop = 0);
    reflow(this._element);
    this._element.classList.add(gs);
    const transitionComplete = () => {
      this._config.focus && this._focustrap.activate();
      this._isTransitioning = false;
      _.trigger(this._element, as, { relatedTarget: t });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    _.on(this._element, us, (t) => {
      t.key === ss &&
        (this._config.keyboard
          ? this.hide()
          : this._triggerBackdropTransition());
    });
    _.on(window, cs, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    });
    _.on(this._element, hs, (t) => {
      _.one(this._element, ls, (e) => {
        this._element === t.target &&
          this._element === e.target &&
          (this._config.backdrop !== "static"
            ? this._config.backdrop && this.hide()
            : this._triggerBackdropTransition());
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(fs);
      this._resetAdjustments();
      this._scrollBar.reset();
      _.trigger(this._element, os);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(_s);
  }
  _triggerBackdropTransition() {
    const t = _.trigger(this._element, is);
    if (t.defaultPrevented) return;
    const e =
      this._element.scrollHeight > document.documentElement.clientHeight;
    const s = this._element.style.overflowY;
    if (s !== "hidden" && !this._element.classList.contains(ps)) {
      e || (this._element.style.overflowY = "hidden");
      this._element.classList.add(ps);
      this._queueCallback(() => {
        this._element.classList.remove(ps);
        this._queueCallback(() => {
          this._element.style.overflowY = s;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }
  }
  _adjustDialog() {
    const t =
      this._element.scrollHeight > document.documentElement.clientHeight;
    const e = this._scrollBar.getWidth();
    const s = e > 0;
    if (s && !t) {
      const t = isRTL() ? "paddingLeft" : "paddingRight";
      this._element.style[t] = `${e}px`;
    }
    if (!s && t) {
      const t = isRTL() ? "paddingRight" : "paddingLeft";
      this._element.style[t] = `${e}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  static jQueryInterface(t, e) {
    return this.each(function () {
      const s = Modal.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (typeof s[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        s[t](e);
      }
    });
  }
}
_.on(document, ds, ys, function (t) {
  const e = m.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && t.preventDefault();
  _.one(e, rs, (t) => {
    t.defaultPrevented ||
      _.one(e, os, () => {
        isVisible(this) && this.focus();
      });
  });
  const s = m.findOne(ms);
  s && Modal.getInstance(s).hide();
  const n = Modal.getOrCreateInstance(e);
  n.toggle(this);
});
enableDismissTrigger(Modal);
defineJQueryPlugin(Modal);
const As = "offcanvas";
const Cs = "bs.offcanvas";
const Ts = `.${Cs}`;
const ks = ".data-api";
const $s = `load${Ts}${ks}`;
const Ss = "Escape";
const Os = "show";
const Ls = "showing";
const Ds = "hiding";
const Is = "offcanvas-backdrop";
const Ns = ".offcanvas.show";
const Ps = `show${Ts}`;
const Ms = `shown${Ts}`;
const xs = `hide${Ts}`;
const js = `hidePrevented${Ts}`;
const Fs = `hidden${Ts}`;
const Hs = `resize${Ts}`;
const Bs = `click${Ts}${ks}`;
const zs = `keydown.dismiss${Ts}`;
const qs = '[data-bs-toggle="offcanvas"]';
const Ws = { backdrop: true, keyboard: true, scroll: false };
const Rs = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean",
};
class Offcanvas extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  static get Default() {
    return Ws;
  }
  static get DefaultType() {
    return Rs;
  }
  static get NAME() {
    return As;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown) return;
    const e = _.trigger(this._element, Ps, { relatedTarget: t });
    if (e.defaultPrevented) return;
    this._isShown = true;
    this._backdrop.show();
    this._config.scroll || new ScrollBarHelper().hide();
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(Ls);
    const completeCallBack = () => {
      (this._config.scroll && !this._config.backdrop) ||
        this._focustrap.activate();
      this._element.classList.add(Os);
      this._element.classList.remove(Ls);
      _.trigger(this._element, Ms, { relatedTarget: t });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) return;
    const t = _.trigger(this._element, xs);
    if (t.defaultPrevented) return;
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(Ds);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(Os, Ds);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._config.scroll || new ScrollBarHelper().reset();
      _.trigger(this._element, Fs);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  _initializeBackDrop() {
    const clickCallback = () => {
      this._config.backdrop !== "static"
        ? this.hide()
        : _.trigger(this._element, js);
    };
    const t = Boolean(this._config.backdrop);
    return new Backdrop({
      className: Is,
      isVisible: t,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: t ? clickCallback : null,
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({ trapElement: this._element });
  }
  _addEventListeners() {
    _.on(this._element, zs, (t) => {
      t.key === Ss &&
        (this._config.keyboard ? this.hide() : _.trigger(this._element, js));
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Offcanvas.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
_.on(document, Bs, qs, function (t) {
  const e = m.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && t.preventDefault();
  if (isDisabled(this)) return;
  _.one(e, Fs, () => {
    isVisible(this) && this.focus();
  });
  const s = m.findOne(Ns);
  s && s !== e && Offcanvas.getInstance(s).hide();
  const n = Offcanvas.getOrCreateInstance(e);
  n.toggle(this);
});
_.on(window, $s, () => {
  for (const t of m.find(Ns)) Offcanvas.getOrCreateInstance(t).show();
});
_.on(window, Hs, () => {
  for (const t of m.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(t).position !== "fixed" &&
      Offcanvas.getOrCreateInstance(t).hide();
});
enableDismissTrigger(Offcanvas);
defineJQueryPlugin(Offcanvas);
const Ks = /^aria-[\w-]*$/i;
const Vs = {
  "*": ["class", "dir", "id", "lang", "role", Ks],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: [],
};
const Qs = new Set([
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href",
]);
const Us = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
const allowedAttribute = (t, e) => {
  const s = t.nodeName.toLowerCase();
  return e.includes(s)
    ? !Qs.has(s) || Boolean(Us.test(t.nodeValue))
    : e.filter((t) => t instanceof RegExp).some((t) => t.test(s));
};
function sanitizeHtml(t, e, s) {
  if (!t.length) return t;
  if (s && typeof s === "function") return s(t);
  const n = new window.DOMParser();
  const i = n.parseFromString(t, "text/html");
  const o = [].concat(...i.body.querySelectorAll("*"));
  for (const t of o) {
    const s = t.nodeName.toLowerCase();
    if (!Object.keys(e).includes(s)) {
      t.remove();
      continue;
    }
    const n = [].concat(...t.attributes);
    const i = [].concat(e["*"] || [], e[s] || []);
    for (const e of n) allowedAttribute(e, i) || t.removeAttribute(e.nodeName);
  }
  return i.body.innerHTML;
}
const Xs = "TemplateFactory";
const Ys = {
  allowList: Vs,
  content: {},
  extraClass: "",
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: "<div></div>",
};
const Gs = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string",
};
const Js = {
  entry: "(string|element|function|null)",
  selector: "(string|element)",
};
class TemplateFactory extends Config {
  constructor(t) {
    super();
    this._config = this._getConfig(t);
  }
  static get Default() {
    return Ys;
  }
  static get DefaultType() {
    return Gs;
  }
  static get NAME() {
    return Xs;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    this._checkContent(t);
    this._config.content = { ...this._config.content, ...t };
    return this;
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [e, s] of Object.entries(this._config.content))
      this._setContent(t, s, e);
    const e = t.children[0];
    const s = this._resolvePossibleFunction(this._config.extraClass);
    s && e.classList.add(...s.split(" "));
    return e;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t);
    this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, s] of Object.entries(t))
      super._typeCheckConfig({ selector: e, entry: s }, Js);
  }
  _setContent(t, e, s) {
    const n = m.findOne(s, t);
    if (n) {
      e = this._resolvePossibleFunction(e);
      e
        ? isElement(e)
          ? this._putElementInTemplate(getElement(e), n)
          : this._config.html
            ? (n.innerHTML = this._maybeSanitize(e))
            : (n.textContent = e)
        : n.remove();
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize
      ? sanitizeHtml(t, this._config.allowList, this._config.sanitizeFn)
      : t;
  }
  _resolvePossibleFunction(t) {
    return execute(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      e.innerHTML = "";
      e.append(t);
    } else e.textContent = t.textContent;
  }
}
const Zs = "tooltip";
const tn = new Set(["sanitize", "allowList", "sanitizeFn"]);
const en = "fade";
const sn = "modal";
const nn = "show";
const on = ".tooltip-inner";
const rn = `.${sn}`;
const an = "hide.bs.modal";
const cn = "hover";
const ln = "focus";
const hn = "click";
const un = "manual";
const dn = "hide";
const fn = "hidden";
const _n = "show";
const gn = "shown";
const pn = "inserted";
const mn = "click";
const bn = "focusin";
const vn = "focusout";
const yn = "mouseenter";
const wn = "mouseleave";
const En = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left",
};
const An = {
  allowList: Vs,
  animation: true,
  boundary: "clippingParents",
  container: false,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: false,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template:
    '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus",
};
const Cn = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
};
class Tooltip extends BaseComponent {
  constructor(e, s) {
    if (typeof t === "undefined")
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)",
      );
    super(e, s);
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;
    this.tip = null;
    this._setListeners();
    this._config.selector || this._fixTitle();
  }
  static get Default() {
    return An;
  }
  static get DefaultType() {
    return Cn;
  }
  static get NAME() {
    return Zs;
  }
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      this._activeTrigger.click = !this._activeTrigger.click;
      this._isShown() ? this._leave() : this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout);
    _.off(this._element.closest(rn), an, this._hideModalHandler);
    this._element.getAttribute("data-bs-original-title") &&
      this._element.setAttribute(
        "title",
        this._element.getAttribute("data-bs-original-title"),
      );
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = _.trigger(this._element, this.constructor.eventName(_n));
    const e = findShadowRoot(this._element);
    const s = (e || this._element.ownerDocument.documentElement).contains(
      this._element,
    );
    if (t.defaultPrevented || !s) return;
    this._disposePopper();
    const n = this._getTipElement();
    this._element.setAttribute("aria-describedby", n.getAttribute("id"));
    const { container: i } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      i.append(n);
      _.trigger(this._element, this.constructor.eventName(pn));
    }
    this._popper = this._createPopper(n);
    n.classList.add(nn);
    if ("ontouchstart" in document.documentElement)
      for (const t of [].concat(...document.body.children))
        _.on(t, "mouseover", noop);
    const complete = () => {
      _.trigger(this._element, this.constructor.eventName(gn));
      this._isHovered === false && this._leave();
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) return;
    const t = _.trigger(this._element, this.constructor.eventName(dn));
    if (t.defaultPrevented) return;
    const e = this._getTipElement();
    e.classList.remove(nn);
    if ("ontouchstart" in document.documentElement)
      for (const t of [].concat(...document.body.children))
        _.off(t, "mouseover", noop);
    this._activeTrigger[hn] = false;
    this._activeTrigger[ln] = false;
    this._activeTrigger[cn] = false;
    this._isHovered = null;
    const complete = () => {
      if (!this._isWithActiveTrigger()) {
        this._isHovered || this._disposePopper();
        this._element.removeAttribute("aria-describedby");
        _.trigger(this._element, this.constructor.eventName(fn));
      }
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    this.tip ||
      (this.tip = this._createTipElement(
        this._newContent || this._getContentForTemplate(),
      ));
    return this.tip;
  }
  _createTipElement(t) {
    const e = this._getTemplateFactory(t).toHtml();
    if (!e) return null;
    e.classList.remove(en, nn);
    e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const s = getUID(this.constructor.NAME).toString();
    e.setAttribute("id", s);
    this._isAnimated() && e.classList.add(en);
    return e;
  }
  setContent(t) {
    this._newContent = t;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(t) {
    this._templateFactory
      ? this._templateFactory.changeContent(t)
      : (this._templateFactory = new TemplateFactory({
          ...this._config,
          content: t,
          extraClass: this._resolvePossibleFunction(this._config.customClass),
        }));
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return { [on]: this._getTitle() };
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute("data-bs-original-title")
    );
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(
      t.delegateTarget,
      this._getDelegateConfig(),
    );
  }
  _isAnimated() {
    return (
      this._config.animation || (this.tip && this.tip.classList.contains(en))
    );
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(nn);
  }
  _createPopper(e) {
    const s = execute(this._config.placement, [this, e, this._element]);
    const n = En[s.toUpperCase()];
    return t.createPopper(this._element, e, this._getPopperConfig(n));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t === "string"
      ? t.split(",").map((t) => Number.parseInt(t, 10))
      : typeof t === "function"
        ? (e) => t(e, this._element)
        : t;
  }
  _resolvePossibleFunction(t) {
    return execute(t, [this._element]);
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
      modifiers: [
        {
          name: "flip",
          options: { fallbackPlacements: this._config.fallbackPlacements },
        },
        { name: "offset", options: { offset: this._getOffset() } },
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        {
          name: "arrow",
          options: { element: `.${this.constructor.NAME}-arrow` },
        },
        {
          name: "preSetPlacement",
          enabled: true,
          phase: "beforeMain",
          fn: (t) => {
            this._getTipElement().setAttribute(
              "data-popper-placement",
              t.state.placement,
            );
          },
        },
      ],
    };
    return { ...e, ...execute(this._config.popperConfig, [e]) };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        _.on(
          this._element,
          this.constructor.eventName(mn),
          this._config.selector,
          (t) => {
            const e = this._initializeOnDelegatedTarget(t);
            e.toggle();
          },
        );
      else if (e !== un) {
        const t =
          e === cn
            ? this.constructor.eventName(yn)
            : this.constructor.eventName(bn);
        const s =
          e === cn
            ? this.constructor.eventName(wn)
            : this.constructor.eventName(vn);
        _.on(this._element, t, this._config.selector, (t) => {
          const e = this._initializeOnDelegatedTarget(t);
          e._activeTrigger[t.type === "focusin" ? ln : cn] = true;
          e._enter();
        });
        _.on(this._element, s, this._config.selector, (t) => {
          const e = this._initializeOnDelegatedTarget(t);
          e._activeTrigger[t.type === "focusout" ? ln : cn] =
            e._element.contains(t.relatedTarget);
          e._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    };
    _.on(this._element.closest(rn), an, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    if (t) {
      this._element.getAttribute("aria-label") ||
        this._element.textContent.trim() ||
        this._element.setAttribute("aria-label", t);
      this._element.setAttribute("data-bs-original-title", t);
      this._element.removeAttribute("title");
    }
  }
  _enter() {
    if (this._isShown() || this._isHovered) this._isHovered = true;
    else {
      this._isHovered = true;
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
    }
  }
  _leave() {
    if (!this._isWithActiveTrigger()) {
      this._isHovered = false;
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide);
    }
  }
  _setTimeout(t, e) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(t, e);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(t) {
    const e = g.getDataAttributes(this._element);
    for (const t of Object.keys(e)) tn.has(t) && delete e[t];
    t = { ...e, ...(typeof t === "object" && t ? t : {}) };
    t = this._mergeConfigObj(t);
    t = this._configAfterMerge(t);
    this._typeCheckConfig(t);
    return t;
  }
  _configAfterMerge(t) {
    t.container =
      t.container === false ? document.body : getElement(t.container);
    typeof t.delay === "number" && (t.delay = { show: t.delay, hide: t.delay });
    typeof t.title === "number" && (t.title = t.title.toString());
    typeof t.content === "number" && (t.content = t.content.toString());
    return t;
  }
  _getDelegateConfig() {
    const t = {};
    for (const [e, s] of Object.entries(this._config))
      this.constructor.Default[e] !== s && (t[e] = s);
    t.selector = false;
    t.trigger = "manual";
    return t;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Tooltip.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (typeof e[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
defineJQueryPlugin(Tooltip);
const Tn = "popover";
const kn = ".popover-header";
const $n = ".popover-body";
const Sn = {
  ...Tooltip.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template:
    '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click",
};
const On = {
  ...Tooltip.DefaultType,
  content: "(null|string|element|function)",
};
class Popover extends Tooltip {
  static get Default() {
    return Sn;
  }
  static get DefaultType() {
    return On;
  }
  static get NAME() {
    return Tn;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return { [kn]: this._getTitle(), [$n]: this._getContent() };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Popover.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (typeof e[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
defineJQueryPlugin(Popover);
const Ln = "scrollspy";
const Dn = "bs.scrollspy";
const In = `.${Dn}`;
const Nn = ".data-api";
const Pn = `activate${In}`;
const Mn = `click${In}`;
const xn = `load${In}${Nn}`;
const jn = "dropdown-item";
const Fn = "active";
const Hn = '[data-bs-spy="scroll"]';
const Bn = "[href]";
const zn = ".nav, .list-group";
const qn = ".nav-link";
const Wn = ".nav-item";
const Rn = ".list-group-item";
const Kn = `${qn}, ${Wn} > ${qn}, ${Rn}`;
const Vn = ".dropdown";
const Qn = ".dropdown-toggle";
const Un = {
  offset: null,
  rootMargin: "0px 0px -25%",
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1],
};
const Xn = {
  offset: "(number|null)",
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array",
};
class ScrollSpy extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._rootElement =
      getComputedStyle(this._element).overflowY === "visible"
        ? null
        : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 };
    this.refresh();
  }
  static get Default() {
    return Un;
  }
  static get DefaultType() {
    return Xn;
  }
  static get NAME() {
    return Ln;
  }
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    this._observer
      ? this._observer.disconnect()
      : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }
  _configAfterMerge(t) {
    t.target = getElement(t.target) || document.body;
    t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin;
    typeof t.threshold === "string" &&
      (t.threshold = t.threshold.split(",").map((t) => Number.parseFloat(t)));
    return t;
  }
  _maybeEnableSmoothScroll() {
    if (this._config.smoothScroll) {
      _.off(this._config.target, Mn);
      _.on(this._config.target, Mn, Bn, (t) => {
        const e = this._observableSections.get(t.target.hash);
        if (e) {
          t.preventDefault();
          const s = this._rootElement || window;
          const n = e.offsetTop - this._element.offsetTop;
          if (s.scrollTo) {
            s.scrollTo({ top: n, behavior: "smooth" });
            return;
          }
          s.scrollTop = n;
        }
      });
    }
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((t) => this._observerCallback(t), t);
  }
  _observerCallback(t) {
    const targetElement = (t) => this._targetLinks.get(`#${t.target.id}`);
    const activate = (t) => {
      this._previousScrollData.visibleEntryTop = t.target.offsetTop;
      this._process(targetElement(t));
    };
    const e = (this._rootElement || document.documentElement).scrollTop;
    const s = e >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = e;
    for (const n of t) {
      if (!n.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(n));
        continue;
      }
      const t = n.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (s && t) {
        activate(n);
        if (!e) return;
      } else s || t || activate(n);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = new Map();
    this._observableSections = new Map();
    const t = m.find(Bn, this._config.target);
    for (const e of t) {
      if (!e.hash || isDisabled(e)) continue;
      const t = m.findOne(decodeURI(e.hash), this._element);
      if (isVisible(t)) {
        this._targetLinks.set(decodeURI(e.hash), e);
        this._observableSections.set(e.hash, t);
      }
    }
  }
  _process(t) {
    if (this._activeTarget !== t) {
      this._clearActiveClass(this._config.target);
      this._activeTarget = t;
      t.classList.add(Fn);
      this._activateParents(t);
      _.trigger(this._element, Pn, { relatedTarget: t });
    }
  }
  _activateParents(t) {
    if (t.classList.contains(jn))
      m.findOne(Qn, t.closest(Vn)).classList.add(Fn);
    else
      for (const e of m.parents(t, zn))
        for (const t of m.prev(e, Kn)) t.classList.add(Fn);
  }
  _clearActiveClass(t) {
    t.classList.remove(Fn);
    const e = m.find(`${Bn}.${Fn}`, t);
    for (const t of e) t.classList.remove(Fn);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = ScrollSpy.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
_.on(window, xn, () => {
  for (const t of m.find(Hn)) ScrollSpy.getOrCreateInstance(t);
});
defineJQueryPlugin(ScrollSpy);
const Yn = "tab";
const Gn = "bs.tab";
const Jn = `.${Gn}`;
const Zn = `hide${Jn}`;
const ti = `hidden${Jn}`;
const ei = `show${Jn}`;
const si = `shown${Jn}`;
const ni = `click${Jn}`;
const ii = `keydown${Jn}`;
const oi = `load${Jn}`;
const ri = "ArrowLeft";
const ai = "ArrowRight";
const ci = "ArrowUp";
const li = "ArrowDown";
const hi = "Home";
const ui = "End";
const di = "active";
const fi = "fade";
const _i = "show";
const gi = "dropdown";
const pi = ".dropdown-toggle";
const mi = ".dropdown-menu";
const bi = `:not(${pi})`;
const vi = '.list-group, .nav, [role="tablist"]';
const yi = ".nav-item, .list-group-item";
const wi = `.nav-link${bi}, .list-group-item${bi}, [role="tab"]${bi}`;
const Ei =
  '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const Ai = `${wi}, ${Ei}`;
const Ci = `.${di}[data-bs-toggle="tab"], .${di}[data-bs-toggle="pill"], .${di}[data-bs-toggle="list"]`;
class Tab extends BaseComponent {
  constructor(t) {
    super(t);
    this._parent = this._element.closest(vi);
    if (this._parent) {
      this._setInitialAttributes(this._parent, this._getChildren());
      _.on(this._element, ii, (t) => this._keydown(t));
    }
  }
  static get NAME() {
    return Yn;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const e = this._getActiveElem();
    const s = e ? _.trigger(e, Zn, { relatedTarget: t }) : null;
    const n = _.trigger(t, ei, { relatedTarget: e });
    if (!(n.defaultPrevented || (s && s.defaultPrevented))) {
      this._deactivate(e, t);
      this._activate(t, e);
    }
  }
  _activate(t, e) {
    if (!t) return;
    t.classList.add(di);
    this._activate(m.getElementFromSelector(t));
    const complete = () => {
      if (t.getAttribute("role") === "tab") {
        t.removeAttribute("tabindex");
        t.setAttribute("aria-selected", true);
        this._toggleDropDown(t, true);
        _.trigger(t, si, { relatedTarget: e });
      } else t.classList.add(_i);
    };
    this._queueCallback(complete, t, t.classList.contains(fi));
  }
  _deactivate(t, e) {
    if (!t) return;
    t.classList.remove(di);
    t.blur();
    this._deactivate(m.getElementFromSelector(t));
    const complete = () => {
      if (t.getAttribute("role") === "tab") {
        t.setAttribute("aria-selected", false);
        t.setAttribute("tabindex", "-1");
        this._toggleDropDown(t, false);
        _.trigger(t, ti, { relatedTarget: e });
      } else t.classList.remove(_i);
    };
    this._queueCallback(complete, t, t.classList.contains(fi));
  }
  _keydown(t) {
    if (![ri, ai, ci, li, hi, ui].includes(t.key)) return;
    t.stopPropagation();
    t.preventDefault();
    const e = this._getChildren().filter((t) => !isDisabled(t));
    let s;
    if ([hi, ui].includes(t.key)) s = e[t.key === hi ? 0 : e.length - 1];
    else {
      const n = [ai, li].includes(t.key);
      s = getNextActiveElement(e, t.target, n, true);
    }
    if (s) {
      s.focus({ preventScroll: true });
      Tab.getOrCreateInstance(s).show();
    }
  }
  _getChildren() {
    return m.find(Ai, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const t of e) this._setInitialAttributesOnChild(t);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t);
    const s = this._getOuterElement(t);
    t.setAttribute("aria-selected", e);
    s !== t && this._setAttributeIfNotExists(s, "role", "presentation");
    e || t.setAttribute("tabindex", "-1");
    this._setAttributeIfNotExists(t, "role", "tab");
    this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = m.getElementFromSelector(t);
    if (e) {
      this._setAttributeIfNotExists(e, "role", "tabpanel");
      t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`);
    }
  }
  _toggleDropDown(t, e) {
    const s = this._getOuterElement(t);
    if (!s.classList.contains(gi)) return;
    const toggle = (t, n) => {
      const i = m.findOne(t, s);
      i && i.classList.toggle(n, e);
    };
    toggle(pi, di);
    toggle(mi, _i);
    s.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, s) {
    t.hasAttribute(e) || t.setAttribute(e, s);
  }
  _elemIsActive(t) {
    return t.classList.contains(di);
  }
  _getInnerElement(t) {
    return t.matches(Ai) ? t : m.findOne(Ai, t);
  }
  _getOuterElement(t) {
    return t.closest(yi) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Tab.getOrCreateInstance(this);
      if (typeof t === "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
_.on(document, ni, Ei, function (t) {
  ["A", "AREA"].includes(this.tagName) && t.preventDefault();
  isDisabled(this) || Tab.getOrCreateInstance(this).show();
});
_.on(window, oi, () => {
  for (const t of m.find(Ci)) Tab.getOrCreateInstance(t);
});
defineJQueryPlugin(Tab);
const Ti = "toast";
const ki = "bs.toast";
const $i = `.${ki}`;
const Si = `mouseover${$i}`;
const Oi = `mouseout${$i}`;
const Li = `focusin${$i}`;
const Di = `focusout${$i}`;
const Ii = `hide${$i}`;
const Ni = `hidden${$i}`;
const Pi = `show${$i}`;
const Mi = `shown${$i}`;
const xi = "fade";
const ji = "hide";
const Fi = "show";
const Hi = "showing";
const Bi = { animation: "boolean", autohide: "boolean", delay: "number" };
const zi = { animation: true, autohide: true, delay: 5e3 };
class Toast extends BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  static get Default() {
    return zi;
  }
  static get DefaultType() {
    return Bi;
  }
  static get NAME() {
    return Ti;
  }
  show() {
    const t = _.trigger(this._element, Pi);
    if (t.defaultPrevented) return;
    this._clearTimeout();
    this._config.animation && this._element.classList.add(xi);
    const complete = () => {
      this._element.classList.remove(Hi);
      _.trigger(this._element, Mi);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(ji);
    reflow(this._element);
    this._element.classList.add(Fi, Hi);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) return;
    const t = _.trigger(this._element, Ii);
    if (t.defaultPrevented) return;
    const complete = () => {
      this._element.classList.add(ji);
      this._element.classList.remove(Hi, Fi);
      _.trigger(this._element, Ni);
    };
    this._element.classList.add(Hi);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    this.isShown() && this._element.classList.remove(Fi);
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Fi);
  }
  _maybeScheduleHide() {
    this._config.autohide &&
      (this._hasMouseInteraction ||
        this._hasKeyboardInteraction ||
        (this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay)));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout":
        this._hasMouseInteraction = e;
        break;
      case "focusin":
      case "focusout":
        this._hasKeyboardInteraction = e;
        break;
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const s = t.relatedTarget;
    this._element === s ||
      this._element.contains(s) ||
      this._maybeScheduleHide();
  }
  _setListeners() {
    _.on(this._element, Si, (t) => this._onInteraction(t, true));
    _.on(this._element, Oi, (t) => this._onInteraction(t, false));
    _.on(this._element, Li, (t) => this._onInteraction(t, true));
    _.on(this._element, Di, (t) => this._onInteraction(t, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const e = Toast.getOrCreateInstance(this, t);
      if (typeof t === "string") {
        if (typeof e[t] === "undefined")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
enableDismissTrigger(Toast);
defineJQueryPlugin(Toast);
export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
};
