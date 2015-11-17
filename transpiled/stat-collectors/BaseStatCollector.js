'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _execMethod = require('../helpers/execMethod');

var _execMethod2 = _interopRequireDefault(_execMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var BaseStatCollector = (function () {
  function BaseStatCollector() {
    _classCallCheck(this, BaseStatCollector);

    this._collectors = [];
    this._reset = true;
    this._state = {};
    this._ignore = [];
  }

  _createClass(BaseStatCollector, [{
    key: 'addCollector',
    value: function addCollector(collector) {
      var _this = this;

      if (!this._reset) {
        throw new Error('Cannot add a new collector unless you call reset() first');
      }
      if ((typeof collector === 'undefined' ? 'undefined' : _typeof(collector)) === 'object' && typeof collector.name === 'string') {
        (function () {
          var reqIndex = undefined;
          var requirements = collector.requirements;
          if (!Array.isArray(requirements)) {
            requirements = [];
          }
          _this._collectors.forEach(function (currentCollector) {
            if (currentCollector.name === collector.name) {
              throw new Error('A collector with that name has already been added.');
            }
            reqIndex = requirements.indexOf(currentCollector.name);
            if (reqIndex >= 0) {
              requirements.splice(reqIndex, 1);
            }
          });
          if (requirements.length) {
            throw new Error('Did not meet the requirements: ' + requirements);
          }
          _this._collectors.push(collector);
        })();
      }
      this.reset();
    }
  }, {
    key: 'addIgnore',
    value: function addIgnore(name) {
      if (this._ignore.indexOf(name) === -1) {
        this._ignore.push(name);
      }
    }
  }, {
    key: 'get',
    value: function get() {
      var self = this;
      var result = {};
      if (!this._reset) {
        (0, _execMethod2.default)(this, 'onGet');
      }
      Object.keys(this._state).sort().forEach(function (key) {
        if (self._ignore.indexOf(key) === -1) {
          var val = self._state[key];
          if (val) {
            val = JSON.parse(JSON.stringify(val));
          }
          result[key] = val;
        }
      });
      return result;
    }
  }, {
    key: 'update',
    value: function update() {
      var self = this;

      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      values.forEach(function (value) {
        if (Array.isArray(value)) {
          value.forEach(function (v) {
            self.update(v);
          });
        } else {
          var v = parseFloat(value);
          if (Number.isFinite(v)) {
            (0, _execMethod2.default)(self, 'onUpdate', v);
          }
        }
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      var self = this;
      this._state = {};
      this._collectors.forEach(function (collector) {
        self._state[collector.name] = undefined;
      });
      this._reset = true;
    }
  }]);

  return BaseStatCollector;
})();

exports.default = BaseStatCollector;
//# sourceMappingURL=BaseStatCollector.js.map
