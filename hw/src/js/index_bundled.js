(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redom = require("redom");
var _Form = _interopRequireDefault(require("./Form.js"));
var _validation = require("../validation.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import {el, svg, mount, setAttr, unmount, setChildren} from "https://redom.js.org/redom.es.min.js";

class CardForm extends _Form.default {
  constructor(payment = 100500) {
    super();
    this.payment = payment;
    this.isValid = false;
    this.number = 0;
    this.date = '';
    this.cvv = 0;
    this.name = '';
    this.email = '';
    this.cardType = '';
    // console.log(validateCVC)
  }

  get number() {
    return this._number;
  }
  set number(value) {
    this._number = value;
  }
  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get email() {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }
  get cvv() {
    return this._cvv;
  }
  set cvv(value) {
    // if (validateCVC(value)) {
    //   this._cvv = value
    // } else {
    //  throw new TypeError('Неверный CVV')
    // }
  }
  renderForm() {
    if (this.rootElement) return this.rootElement;
    this.rootElement = super.renderForm();
    this.inputCardNumber = (0, _redom.el)('input.form-control', {
      placeholder: '0000 0000 0000 0000',
      type: 'text'
    });
    this.inputDate = (0, _redom.el)('input.form-control', {
      type: 'text',
      placeholder: '07/26'
    });
    this.inputCVV = (0, _redom.el)('input.form-control', {
      type: 'password',
      placeholder: '000'
    });
    this.inputName = (0, _redom.el)('input.form-control', {
      type: 'text',
      placeholder: 'Kevin Durant'
    });
    this.inputEmail = (0, _redom.el)('input.form-control', {
      type: 'text',
      placeholder: 'example@mail.bag'
    });
    this.inputCVV.addEventListener('blur', () => {
      // this._cvv = this.inputCVV.value.trim();
      console.log((0, _validation.validateCVC)(this.inputCVV.value.trim()));
    });
    (0, _redom.setAttr)(this.submitBtn, {
      className: 'btn btn-primary w-100'
    });
    this.submitBtn.textContent = `К оплате ${this.payment} руб.`;
    (0, _redom.setChildren)(this.rootElement, [(0, _redom.el)('.row', (0, _redom.el)('.col-12', (0, _redom.el)('.d-flex flex-column px-md-5 px-4 mb-4', (0, _redom.el)('label', 'Credit Card', (0, _redom.el)('.inputWithIcon', [this.inputCardNumber, (0, _redom.el)('span.card-type')])))), (0, _redom.el)('.col-md-6', (0, _redom.el)('.d-flex flex-column ps-md-5 px-md-0 px-4 mb-4', (0, _redom.el)('label', 'Expiration Date', (0, _redom.el)('.inputWithIcon', [this.inputDate, (0, _redom.el)('span.fas fa-calendar-alt')])))), (0, _redom.el)('.col-md-6', (0, _redom.el)('.d-flex flex-column pe-md-5 px-md-0 px-4 mb-4', (0, _redom.el)('label', 'Code CVV', (0, _redom.el)('.inputWithIcon', [this.inputCVV, (0, _redom.el)('span.fas fa-calendar-alt')])))), (0, _redom.el)('.col-12', (0, _redom.el)('.d-flex flex-column px-md-5 px-4 mb-4', (0, _redom.el)('label', 'Name', (0, _redom.el)('.inputWithIcon', [this.inputName, (0, _redom.el)('span.fas fa-calendar-alt')])))), (0, _redom.el)('.col-12', (0, _redom.el)('.d-flex flex-column px-md-5 px-4 mb-4', (0, _redom.el)('label', 'e-mail', (0, _redom.el)('.inputWithIcon', [this.inputEmail, (0, _redom.el)('span.fas fa-calendar-alt')])))), (0, _redom.el)('.col-12 px-md-5 px-4 mt-3', this.submitBtn))]);
    return this.rootElement;
  }
}
exports.default = CardForm;

},{"../validation.js":5,"./Form.js":2,"redom":27}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redom = require("redom");
// import {el, mount} from "https://redom.js.org/redom.es.min.js";

class Form {
  constructor() {}
  renderForm() {
    if (this.rootElement) return this.rootElement;
    const rootForm = (0, _redom.el)('form', '', {
      action: '#'
    });
    const submitBtn = (0, _redom.el)('button.btn', 'Отправить');
    (0, _redom.mount)(rootForm, submitBtn);
    rootForm.addEventListener('submit', e => e.preventDefault());
    this.rootElement = rootForm;
    this.submitBtn = submitBtn;
    return rootForm;
  }
}
exports.default = Form;

},{"redom":27}],3:[function(require,module,exports){
"use strict";

var _redom = require("redom");
var _CardForm = _interopRequireDefault(require("./Classes/CardForm.js"));
var _render = require("./render.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import {el, mount} from "https://redom.js.org/redom.es.min.js";

const {
  form,
  page
} = (0, _render.createPage)();
(0, _redom.mount)(document.getElementById('app'), page);

},{"./Classes/CardForm.js":1,"./render.js":4,"redom":27}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPage = createPage;
var _redom = require("redom");
var _CardForm = _interopRequireDefault(require("./Classes/CardForm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import {el, svg, mount, setAttr, unmount, setChildren} from "https://redom.js.org/redom.es.min.js";

function createPage() {
  const form = new _CardForm.default(300);
  const page = (0, _redom.el)('.container bg-light d-md-flex align-items-center', (0, _redom.el)('.card box2 shadow-sm', form.renderForm()));
  return {
    form,
    page
  };
}

},{"./Classes/CardForm.js":1,"redom":27}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = formatNumber;
exports.validateCVC = validateCVC;
const Card = require('creditcards/card');
const cvc = require('creditcards/cvc');
const types = require('creditcards-types');
const mir = require('creditcards-types/types/mir');
const card = Card([mir, ...types]);
const myCvc = cvc([mir, ...types]);
function formatNumber(number) {
  return card.format(number);
}
function validateCVC(cvcNumber) {
  return myCvc.isValid(cvcNumber);
}
console.log(card);
console.log(card.isValid('4242424242424242'));
console.log(card.type('2202203506624024'));

},{"creditcards-types":6,"creditcards-types/types/mir":18,"creditcards/card":23,"creditcards/cvc":24}],6:[function(require,module,exports){
'use strict'

module.exports = require('./types')

},{"./types":14}],7:[function(require,module,exports){
'use strict'

module.exports = CardType

function CardType (data) {
  if (!(this instanceof CardType)) return new CardType(data)
  Object.assign(this, data)
}

CardType.prototype.digits = 16
CardType.prototype.cvcLength = 3
CardType.prototype.luhn = true
CardType.prototype.groupPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/

CardType.prototype.group = function (number) {
  return (number.match(this.groupPattern) || [])
    .slice(1)
    .filter(Boolean)
}

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number)
}

},{}],8:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'American Express',
  digits: 15,
  pattern: /^3[47]\d{13}$/,
  eagerPattern: /^3[47]/,
  groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  cvcLength: 4
})

},{"../type":7}],9:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Dankort',
  pattern: /^5019\d{12}$/,
  eagerPattern: /^5019/
})

},{"../type":7}],10:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Diners Club',
  digits: [14, 19],
  pattern: /^3(0[0-5]|[68]\d)\d{11,16}$/,
  eagerPattern: /^3(0|[68])/,
  groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,9})?/
})

},{"../type":7}],11:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Discover',
  pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
  eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
})

},{"../type":7}],12:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Elo',
  pattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])\d{10}$/,
  eagerPattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":7}],13:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Forbrugsforeningen',
  pattern: /^600722\d{10}$/,
  eagerPattern: /^600/
})

},{"../type":7}],14:[function(require,module,exports){
'use strict'

module.exports = [
  require('./visa'),
  require('./maestro'),
  require('./forbrugsforeningen'),
  require('./dankort'),
  require('./mastercard'),
  require('./american-express'),
  require('./diners-club'),
  require('./discover'),
  require('./jcb'),
  require('./unionpay'),
  require('./troy'),
  require('./elo'),
  require('./uatp')
]

},{"./american-express":8,"./dankort":9,"./diners-club":10,"./discover":11,"./elo":12,"./forbrugsforeningen":13,"./jcb":15,"./maestro":16,"./mastercard":17,"./troy":19,"./uatp":20,"./unionpay":21,"./visa":22}],15:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'JCB',
  pattern: /^35\d{14}$/,
  eagerPattern: /^35/
})

},{"../type":7}],16:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Maestro',
  digits: [12, 19],
  pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
  eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":7}],17:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Mastercard',
  pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\d{12}$/,
  eagerPattern: /^(2[3-7]|22[2-9]|5[1-5])/
})

},{"../type":7}],18:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Mir',
  pattern: /^220[0-4]\d{12}$/,
  eagerPattern: /^220[0-4]/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":7}],19:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Troy',
  pattern: /^9792\d{12}$/,
  eagerPattern: /^9792/
})

},{"../type":7}],20:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'UATP',
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(\d{1,4})(\d{1,5})?(\d{1,6})?/
})

},{"../type":7}],21:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'UnionPay',
  pattern: /^62[0-5]\d{13,16}$/,
  eagerPattern: /^62/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
  luhn: false
})

},{"../type":7}],22:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Visa',
  digits: [13, 19],
  pattern: /^4\d{12}(\d{3}|\d{6})?$/,
  eagerPattern: /^4/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":7}],23:[function(require,module,exports){
'use strict'

const luhn = require('fast-luhn')
const Types = require('./types')

module.exports = Card

function Card (data) {
  const types = Types(data)

  return {
    types: data,
    parse: parseCard,
    format: formatCard,
    type: cardType,
    luhn: luhn,
    isValid: isCardValid
  }

  function parseCard (number) {
    if (typeof number !== 'string') return ''
    return number.replace(/[^\d]/g, '')
  }

  function formatCard (number, separator) {
    const type = getType(number, true)
    if (!type) return number
    return type.group(number).join(separator || ' ')
  }

  function cardType (number, eager) {
    const type = getType(number, eager)
    return type ? type.name : undefined
  }

  function isCardValid (number, type) {
    if (type) {
      type = types.get(type)
    } else {
      type = getType(number)
    }
    if (!type) return false
    return (!type.luhn || luhn(number)) && type.test(number)
  }

  function getType (number, eager) {
    return types.find(function (type) {
      return type.test(number, eager)
    })
  }
}

},{"./types":25,"fast-luhn":26}],24:[function(require,module,exports){
'use strict'

const Types = require('./types')
const cvcRegex = /^\d{3,4}$/

module.exports = Cvc

function Cvc (data) {
  const types = Types(data)

  return {
    isValid: cvcIsValid
  }

  function cvcIsValid (cvc, type) {
    if (typeof cvc !== 'string') return false
    if (!cvcRegex.test(cvc)) return false

    if (!type) {
      return types.some(function (type) {
        return type.cvcLength === cvc.length
      })
    }

    return types.get(type).cvcLength === cvc.length
  }
}

},{"./types":25}],25:[function(require,module,exports){
'use strict'

const defaults = require('creditcards-types')

module.exports = CardTypes
module.exports.defaults = defaults

function CardTypes (types) {
  const map = types.reduce(function (acc, type) {
    acc[type.name] = type
    return acc
  }, {})

  return {
    find: types.find.bind(types),
    some: types.some.bind(types),
    get: get
  }

  function get (name) {
    const type = map[name]

    if (!type) {
      throw new Error('No type found for name: ' + name)
    }

    return type
  }
}

},{"creditcards-types":6}],26:[function(require,module,exports){
'use strict'

module.exports = (function (array) {
  return function luhn (number) {
    if (typeof number !== 'string') throw new TypeError('Expected string input')
    if (!number) return false
    let length = number.length
    let bit = 1
    let sum = 0
    let value

    while (length) {
      value = parseInt(number.charAt(--length), 10)
      bit ^= 1
      sum += bit ? array[value] : value
    }

    return sum % 10 === 0
  }
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]))

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = exports.el = exports.Router = exports.Place = exports.ListPool = exports.List = void 0;
exports.html = html;
exports.list = list;
exports.listPool = listPool;
exports.mount = mount;
exports.place = place;
exports.router = router;
exports.s = void 0;
exports.setAttr = setAttr;
exports.setChildren = setChildren;
exports.setData = setData;
exports.setStyle = setStyle;
exports.setXlink = setXlink;
exports.svg = svg;
exports.text = text;
exports.unmount = unmount;
function createElement(query, ns) {
  var ref = parse(query);
  var tag = ref.tag;
  var id = ref.id;
  var className = ref.className;
  var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
  if (id) {
    element.id = id;
  }
  if (className) {
    if (ns) {
      element.setAttribute('class', className);
    } else {
      element.className = className;
    }
  }
  return element;
}
function parse(query) {
  var chunks = query.split(/([.#])/);
  var className = '';
  var id = '';
  for (var i = 1; i < chunks.length; i += 2) {
    switch (chunks[i]) {
      case '.':
        className += " " + chunks[i + 1];
        break;
      case '#':
        id = chunks[i + 1];
    }
  }
  return {
    className: className.trim(),
    tag: chunks[0] || 'div',
    id: id
  };
}
function unmount(parent, child) {
  var parentEl = getEl(parent);
  var childEl = getEl(child);
  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }
  if (childEl.parentNode) {
    doUnmount(child, childEl, parentEl);
    parentEl.removeChild(childEl);
  }
  return child;
}
function doUnmount(child, childEl, parentEl) {
  var hooks = childEl.__redom_lifecycle;
  if (hooksAreEmpty(hooks)) {
    childEl.__redom_lifecycle = {};
    return;
  }
  var traverse = parentEl;
  if (childEl.__redom_mounted) {
    trigger(childEl, 'onunmount');
  }
  while (traverse) {
    var parentHooks = traverse.__redom_lifecycle || {};
    for (var hook in hooks) {
      if (parentHooks[hook]) {
        parentHooks[hook] -= hooks[hook];
      }
    }
    if (hooksAreEmpty(parentHooks)) {
      traverse.__redom_lifecycle = null;
    }
    traverse = traverse.parentNode;
  }
}
function hooksAreEmpty(hooks) {
  if (hooks == null) {
    return true;
  }
  for (var key in hooks) {
    if (hooks[key]) {
      return false;
    }
  }
  return true;
}

/* global Node, ShadowRoot */

var hookNames = ['onmount', 'onremount', 'onunmount'];
var shadowRootAvailable = typeof window !== 'undefined' && 'ShadowRoot' in window;
function mount(parent, child, before, replace) {
  var parentEl = getEl(parent);
  var childEl = getEl(child);
  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }
  if (child !== childEl) {
    childEl.__redom_view = child;
  }
  var wasMounted = childEl.__redom_mounted;
  var oldParent = childEl.parentNode;
  if (wasMounted && oldParent !== parentEl) {
    doUnmount(child, childEl, oldParent);
  }
  if (before != null) {
    if (replace) {
      var beforeEl = getEl(before);
      if (beforeEl.__redom_mounted) {
        trigger(beforeEl, 'onunmount');
      }
      parentEl.replaceChild(childEl, beforeEl);
    } else {
      parentEl.insertBefore(childEl, getEl(before));
    }
  } else {
    parentEl.appendChild(childEl);
  }
  doMount(child, childEl, parentEl, oldParent);
  return child;
}
function trigger(el, eventName) {
  if (eventName === 'onmount' || eventName === 'onremount') {
    el.__redom_mounted = true;
  } else if (eventName === 'onunmount') {
    el.__redom_mounted = false;
  }
  var hooks = el.__redom_lifecycle;
  if (!hooks) {
    return;
  }
  var view = el.__redom_view;
  var hookCount = 0;
  view && view[eventName] && view[eventName]();
  for (var hook in hooks) {
    if (hook) {
      hookCount++;
    }
  }
  if (hookCount) {
    var traverse = el.firstChild;
    while (traverse) {
      var next = traverse.nextSibling;
      trigger(traverse, eventName);
      traverse = next;
    }
  }
}
function doMount(child, childEl, parentEl, oldParent) {
  var hooks = childEl.__redom_lifecycle || (childEl.__redom_lifecycle = {});
  var remount = parentEl === oldParent;
  var hooksFound = false;
  for (var i = 0, list = hookNames; i < list.length; i += 1) {
    var hookName = list[i];
    if (!remount) {
      // if already mounted, skip this phase
      if (child !== childEl) {
        // only Views can have lifecycle events
        if (hookName in child) {
          hooks[hookName] = (hooks[hookName] || 0) + 1;
        }
      }
    }
    if (hooks[hookName]) {
      hooksFound = true;
    }
  }
  if (!hooksFound) {
    childEl.__redom_lifecycle = {};
    return;
  }
  var traverse = parentEl;
  var triggered = false;
  if (remount || traverse && traverse.__redom_mounted) {
    trigger(childEl, remount ? 'onremount' : 'onmount');
    triggered = true;
  }
  while (traverse) {
    var parent = traverse.parentNode;
    var parentHooks = traverse.__redom_lifecycle || (traverse.__redom_lifecycle = {});
    for (var hook in hooks) {
      parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];
    }
    if (triggered) {
      break;
    } else {
      if (traverse.nodeType === Node.DOCUMENT_NODE || shadowRootAvailable && traverse instanceof ShadowRoot || parent && parent.__redom_mounted) {
        trigger(traverse, remount ? 'onremount' : 'onmount');
        triggered = true;
      }
      traverse = parent;
    }
  }
}
function setStyle(view, arg1, arg2) {
  var el = getEl(view);
  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setStyleValue(el, key, arg1[key]);
    }
  } else {
    setStyleValue(el, arg1, arg2);
  }
}
function setStyleValue(el, key, value) {
  el.style[key] = value == null ? '' : value;
}

/* global SVGElement */

var xlinkns = 'http://www.w3.org/1999/xlink';
function setAttr(view, arg1, arg2) {
  setAttrInternal(view, arg1, arg2);
}
function setAttrInternal(view, arg1, arg2, initial) {
  var el = getEl(view);
  var isObj = typeof arg1 === 'object';
  if (isObj) {
    for (var key in arg1) {
      setAttrInternal(el, key, arg1[key], initial);
    }
  } else {
    var isSVG = el instanceof SVGElement;
    var isFunc = typeof arg2 === 'function';
    if (arg1 === 'style' && typeof arg2 === 'object') {
      setStyle(el, arg2);
    } else if (isSVG && isFunc) {
      el[arg1] = arg2;
    } else if (arg1 === 'dataset') {
      setData(el, arg2);
    } else if (!isSVG && (arg1 in el || isFunc) && arg1 !== 'list') {
      el[arg1] = arg2;
    } else {
      if (isSVG && arg1 === 'xlink') {
        setXlink(el, arg2);
        return;
      }
      if (initial && arg1 === 'class') {
        arg2 = el.className + ' ' + arg2;
      }
      if (arg2 == null) {
        el.removeAttribute(arg1);
      } else {
        el.setAttribute(arg1, arg2);
      }
    }
  }
}
function setXlink(el, arg1, arg2) {
  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setXlink(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.setAttributeNS(xlinkns, arg1, arg2);
    } else {
      el.removeAttributeNS(xlinkns, arg1, arg2);
    }
  }
}
function setData(el, arg1, arg2) {
  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setData(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.dataset[arg1] = arg2;
    } else {
      delete el.dataset[arg1];
    }
  }
}
function text(str) {
  return document.createTextNode(str != null ? str : '');
}
function parseArgumentsInternal(element, args, initial) {
  for (var i = 0, list = args; i < list.length; i += 1) {
    var arg = list[i];
    if (arg !== 0 && !arg) {
      continue;
    }
    var type = typeof arg;
    if (type === 'function') {
      arg(element);
    } else if (type === 'string' || type === 'number') {
      element.appendChild(text(arg));
    } else if (isNode(getEl(arg))) {
      mount(element, arg);
    } else if (arg.length) {
      parseArgumentsInternal(element, arg, initial);
    } else if (type === 'object') {
      setAttrInternal(element, arg, null, initial);
    }
  }
}
function ensureEl(parent) {
  return typeof parent === 'string' ? html(parent) : getEl(parent);
}
function getEl(parent) {
  return parent.nodeType && parent || !parent.el && parent || getEl(parent.el);
}
function isNode(arg) {
  return arg && arg.nodeType;
}
function html(query) {
  var args = [],
    len = arguments.length - 1;
  while (len-- > 0) args[len] = arguments[len + 1];
  var element;
  var type = typeof query;
  if (type === 'string') {
    element = createElement(query);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
  } else {
    throw new Error('At least one argument required');
  }
  parseArgumentsInternal(getEl(element), args, true);
  return element;
}
var el = html;
exports.el = el;
var h = html;
exports.h = h;
html.extend = function extendHtml() {
  var args = [],
    len = arguments.length;
  while (len--) args[len] = arguments[len];
  return html.bind.apply(html, [this].concat(args));
};
function setChildren(parent) {
  var children = [],
    len = arguments.length - 1;
  while (len-- > 0) children[len] = arguments[len + 1];
  var parentEl = getEl(parent);
  var current = traverse(parent, children, parentEl.firstChild);
  while (current) {
    var next = current.nextSibling;
    unmount(parent, current);
    current = next;
  }
}
function traverse(parent, children, _current) {
  var current = _current;
  var childEls = Array(children.length);
  for (var i = 0; i < children.length; i++) {
    childEls[i] = children[i] && getEl(children[i]);
  }
  for (var i$1 = 0; i$1 < children.length; i$1++) {
    var child = children[i$1];
    if (!child) {
      continue;
    }
    var childEl = childEls[i$1];
    if (childEl === current) {
      current = current.nextSibling;
      continue;
    }
    if (isNode(childEl)) {
      var next = current && current.nextSibling;
      var exists = child.__redom_index != null;
      var replace = exists && next === childEls[i$1 + 1];
      mount(parent, child, current, replace);
      if (replace) {
        current = next;
      }
      continue;
    }
    if (child.length != null) {
      current = traverse(parent, child, current);
    }
  }
  return current;
}
function listPool(View, key, initData) {
  return new ListPool(View, key, initData);
}
var ListPool = function ListPool(View, key, initData) {
  this.View = View;
  this.initData = initData;
  this.oldLookup = {};
  this.lookup = {};
  this.oldViews = [];
  this.views = [];
  if (key != null) {
    this.key = typeof key === 'function' ? key : propKey(key);
  }
};
exports.ListPool = ListPool;
ListPool.prototype.update = function update(data, context) {
  var ref = this;
  var View = ref.View;
  var key = ref.key;
  var initData = ref.initData;
  var keySet = key != null;
  var oldLookup = this.lookup;
  var newLookup = {};
  var newViews = Array(data.length);
  var oldViews = this.views;
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var view = void 0;
    if (keySet) {
      var id = key(item);
      view = oldLookup[id] || new View(initData, item, i, data);
      newLookup[id] = view;
      view.__redom_id = id;
    } else {
      view = oldViews[i] || new View(initData, item, i, data);
    }
    view.update && view.update(item, i, data, context);
    var el = getEl(view.el);
    el.__redom_view = view;
    newViews[i] = view;
  }
  this.oldViews = oldViews;
  this.views = newViews;
  this.oldLookup = oldLookup;
  this.lookup = newLookup;
};
function propKey(key) {
  return function (item) {
    return item[key];
  };
}
function list(parent, View, key, initData) {
  return new List(parent, View, key, initData);
}
var List = function List(parent, View, key, initData) {
  this.View = View;
  this.initData = initData;
  this.views = [];
  this.pool = new ListPool(View, key, initData);
  this.el = ensureEl(parent);
  this.keySet = key != null;
};
exports.List = List;
List.prototype.update = function update(data, context) {
  if (data === void 0) data = [];
  var ref = this;
  var keySet = ref.keySet;
  var oldViews = this.views;
  this.pool.update(data, context);
  var ref$1 = this.pool;
  var views = ref$1.views;
  var lookup = ref$1.lookup;
  if (keySet) {
    for (var i = 0; i < oldViews.length; i++) {
      var oldView = oldViews[i];
      var id = oldView.__redom_id;
      if (lookup[id] == null) {
        oldView.__redom_index = null;
        unmount(this, oldView);
      }
    }
  }
  for (var i$1 = 0; i$1 < views.length; i$1++) {
    var view = views[i$1];
    view.__redom_index = i$1;
  }
  setChildren(this, views);
  if (keySet) {
    this.lookup = lookup;
  }
  this.views = views;
};
List.extend = function extendList(parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData);
};
list.extend = List.extend;

/* global Node */

function place(View, initData) {
  return new Place(View, initData);
}
var Place = function Place(View, initData) {
  this.el = text('');
  this.visible = false;
  this.view = null;
  this._placeholder = this.el;
  if (View instanceof Node) {
    this._el = View;
  } else if (View.el instanceof Node) {
    this._el = View;
    this.view = View;
  } else {
    this._View = View;
  }
  this._initData = initData;
};
exports.Place = Place;
Place.prototype.update = function update(visible, data) {
  var placeholder = this._placeholder;
  var parentNode = this.el.parentNode;
  if (visible) {
    if (!this.visible) {
      if (this._el) {
        mount(parentNode, this._el, placeholder);
        unmount(parentNode, placeholder);
        this.el = getEl(this._el);
        this.visible = visible;
      } else {
        var View = this._View;
        var view = new View(this._initData);
        this.el = getEl(view);
        this.view = view;
        mount(parentNode, view, placeholder);
        unmount(parentNode, placeholder);
      }
    }
    this.view && this.view.update && this.view.update(data);
  } else {
    if (this.visible) {
      if (this._el) {
        mount(parentNode, placeholder, this._el);
        unmount(parentNode, this._el);
        this.el = placeholder;
        this.visible = visible;
        return;
      }
      mount(parentNode, placeholder, this.view);
      unmount(parentNode, this.view);
      this.el = placeholder;
      this.view = null;
    }
  }
  this.visible = visible;
};

/* global Node */

function router(parent, Views, initData) {
  return new Router(parent, Views, initData);
}
var Router = function Router(parent, Views, initData) {
  this.el = ensureEl(parent);
  this.Views = Views;
  this.initData = initData;
};
exports.Router = Router;
Router.prototype.update = function update(route, data) {
  if (route !== this.route) {
    var Views = this.Views;
    var View = Views[route];
    this.route = route;
    if (View && (View instanceof Node || View.el instanceof Node)) {
      this.view = View;
    } else {
      this.view = View && new View(this.initData, data);
    }
    setChildren(this.el, [this.view]);
  }
  this.view && this.view.update && this.view.update(data, route);
};
var ns = 'http://www.w3.org/2000/svg';
function svg(query) {
  var args = [],
    len = arguments.length - 1;
  while (len-- > 0) args[len] = arguments[len + 1];
  var element;
  var type = typeof query;
  if (type === 'string') {
    element = createElement(query, ns);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
  } else {
    throw new Error('At least one argument required');
  }
  parseArgumentsInternal(getEl(element), args, true);
  return element;
}
var s = svg;
exports.s = s;
svg.extend = function extendSvg() {
  var args = [],
    len = arguments.length;
  while (len--) args[len] = arguments[len];
  return svg.bind.apply(svg, [this].concat(args));
};
svg.ns = ns;

},{}]},{},[3]);
