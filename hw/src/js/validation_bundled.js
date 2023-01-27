(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"creditcards-types":2,"creditcards-types/types/mir":14,"creditcards/card":19,"creditcards/cvc":20}],2:[function(require,module,exports){
'use strict'

module.exports = require('./types')

},{"./types":10}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../type":3}],5:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Dankort',
  pattern: /^5019\d{12}$/,
  eagerPattern: /^5019/
})

},{"../type":3}],6:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Diners Club',
  digits: [14, 19],
  pattern: /^3(0[0-5]|[68]\d)\d{11,16}$/,
  eagerPattern: /^3(0|[68])/,
  groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,9})?/
})

},{"../type":3}],7:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Discover',
  pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
  eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
})

},{"../type":3}],8:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Elo',
  pattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])\d{10}$/,
  eagerPattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":3}],9:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Forbrugsforeningen',
  pattern: /^600722\d{10}$/,
  eagerPattern: /^600/
})

},{"../type":3}],10:[function(require,module,exports){
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

},{"./american-express":4,"./dankort":5,"./diners-club":6,"./discover":7,"./elo":8,"./forbrugsforeningen":9,"./jcb":11,"./maestro":12,"./mastercard":13,"./troy":15,"./uatp":16,"./unionpay":17,"./visa":18}],11:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'JCB',
  pattern: /^35\d{14}$/,
  eagerPattern: /^35/
})

},{"../type":3}],12:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Maestro',
  digits: [12, 19],
  pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
  eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":3}],13:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Mastercard',
  pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\d{12}$/,
  eagerPattern: /^(2[3-7]|22[2-9]|5[1-5])/
})

},{"../type":3}],14:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Mir',
  pattern: /^220[0-4]\d{12}$/,
  eagerPattern: /^220[0-4]/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":3}],15:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Troy',
  pattern: /^9792\d{12}$/,
  eagerPattern: /^9792/
})

},{"../type":3}],16:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'UATP',
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(\d{1,4})(\d{1,5})?(\d{1,6})?/
})

},{"../type":3}],17:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'UnionPay',
  pattern: /^62[0-5]\d{13,16}$/,
  eagerPattern: /^62/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
  luhn: false
})

},{"../type":3}],18:[function(require,module,exports){
'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Visa',
  digits: [13, 19],
  pattern: /^4\d{12}(\d{3}|\d{6})?$/,
  eagerPattern: /^4/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":3}],19:[function(require,module,exports){
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

},{"./types":21,"fast-luhn":22}],20:[function(require,module,exports){
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

},{"./types":21}],21:[function(require,module,exports){
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

},{"creditcards-types":2}],22:[function(require,module,exports){
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

},{}]},{},[1]);
